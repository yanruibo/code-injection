


















					$.mobile.page.prototype.options.domCache = true;
					setTimeout(function(){ OnLoadMuonFlux(); },300);

    



//************************   
var g_db;
var g_shortName       		= 'MuonFlux'; 
var g_version        		= '1.0.0';
var g_version_sqlite_old  	= ''; 
var g_displayName    		= 'MuonFlux'; 
var g_maxSize         		= 20 * 1024 * 1024;
var g_CacheSize         	= 10000;
var g_PageSize         		= 5120;
//************************

function OpenDB()
{

    //g_db = openDatabase(g_shortName, g_version_sqlite, g_displayName, g_maxSize);
   html5sql.openDatabase(g_shortName, g_displayName, g_maxSize);

}

function ExecuteQuery(inQuery,inCallBack,inParameters)
{    
	html5sql.process(inQuery,function(inTx,inResult){
		//if(inQuery.search("INSERT INTO") == -1)
			console.log("executeSql "+ inQuery);
		if(inCallBack)
			inCallBack(true,inQuery,inResult,inParameters);
	}
  ,function(inError,inQuery ){
	  	console.log("executeSql "+ inQuery);
	  	console.error("Error " + inError.message);
	  	if(inCallBack)
	  		inCallBack(false,inQuery,inError,inParameters);
	 });
}

function deleteTable (inTableName){
	ExecuteQuery("DELETE FROM "+inTableName+";",null,null);
	
}


function IniDatabase(){

        OpenDB();
        var query = "SELECT name FROM sqlite_master WHERE type='table' AND name='mf_config'";
	    ExecuteQuery(query,callBackExistDB);	     
	    
}
function callBackExistDB(inTrue,inQuery,inResult){
	
	if(inTrue){
		//alert('callBackExistDB TRUE');
	     var row = inResult.rows;
		 if(row.length>0){
	     	ExecuteQuery("SELECT * from mf_config",CallBack_GestioneIni);
		 }else{
			 //alert('callBackExistDB 00');
			CreateIniTable();
		 }
	}else{
		//alert('callBackExistDB false');
		CreateIniTable();
	}
}
function CallBack_GestioneIni(inTrue,inQuery,inResult,inParameters)
{	
	
	if(inTrue)
	{
		
		var row = inResult.rows;
		var thein = false;
		for(var i= 0; i < row.length; i ++) 
		{
			if(row.item(i).chiave == 'version')
			{
		
				thein = true;
				
				if(row.item(i).valore != g_version)
				{
					g_version_sqlite_old = row.item(i).valore;
					CreateIniTable();
                    return;
				}
			}			
		}
		if(!thein)
			CreateIniTable();
		
   }
}
function DropTable ()
{
	var theDrop = '';
	theDrop += 'DROP TABLE IF EXISTS mf_config;';
	theDrop += 'DROP TABLE IF EXISTS mf_detection;';
	
	ExecuteQuery(theDrop);
}

function CreateIniTable(inCallback)
{	
	var theTxtFile = new XMLHttpRequest();
	theTxtFile.open("GET", "..\\DumpMuonFlux.txt", true);

	DropTable ();
    theTxtFile.onreadystatechange = function() {
      if (theTxtFile.readyState === 4) {  // Makes sure the document is ready to parse.
          if(theTxtFile.status != 404)
          {
        	  console.log('CallMuonFlux1');
        	  CallDumpMuonFlux (theTxtFile.responseText,inCallback);
          }
      }
    };   
    
    theTxtFile.send(null);
}

function CallDumpMuonFlux (responseText,inCallback)
{
	var sql = responseText;
	var Array = sql.split(";");
	
	var theInsert = '';
	for(var i = 0; i < Array.length - 1; i ++)
		  theInsert += Array[i]+';';          
	
	if(g_version_sqlite_old != '')
	{
		  console.log("changeVersion "+g_version_sqlite_old+" -> "+g_version);
		  html5sql.changeVersion (g_version_sqlite_old, g_version, theInsert, function () {ExecuteQuery(theInsert,CallBack_RispostaQueryCreate);});
	}
	//console.log("ExecuteQuery CreateIniTable");
	ExecuteQuery(theInsert,CallBack_RispostaQueryCreate,inCallback);
}
function CallBack_RispostaQueryCreate(inTrue,inQuery,inResult,inParameters)
{
	if(inTrue)
    {
       InsertIniTable(inParameters);                    
    }
	else{
    	 showPopup("Si \u00E8 verificato un errore. Non sar\u00E0 possibile salvare le statistiche",'Info','Ok',null);	
    }
}
function InsertIniTable(inLogin)
{
    
    var theTxtFile = new XMLHttpRequest();
    theTxtFile.open("GET", "..\\InsertMuonFlux.txt", true);
    theTxtFile.onreadystatechange = function() {
      if (theTxtFile.readyState === 4) {  // Makes sure the document is ready to parse.
    	  if(theTxtFile.status != 404)
          {
    		  CallInsertIniTable(theTxtFile.responseText);
          }
      }
      
    };
    
    theTxtFile.send(null);   
}

function CallInsertIniTable (responseText)
{
	var theInsert = '';
    var sql = responseText;
    var Array = sql.split(";");
    for(var i = 0; i < Array.length - 1; i ++)
    	theInsert +=  Array[i]+';';
    ExecuteQuery(theInsert);	
}


function OnLoadHelpIndex(){
	$('#gestione_help').click(function(e){
	
		//$('#contentHelpIndex').html(html);
		$('#popupHelpIndex').show();
        e.stopPropapagation();
        return false;
	});
	$('#gestione_info').click(function(e){
		
		//$('#contentHelpIndex').html(html);
		$('#popupInfoIndex').show();
        e.stopPropapagation();
        return false;
	});
	
	$('#popupHelpIndex-screen').click(function(e){
		$('#popupHelpIndex').hide();
	});
	$('#popupHelpIndex-screen').live('tap',function(e){
		$('#popupHelpIndex').hide();
	});
	$('#popupHelpIndex-screen').live('taphold',function(e){
		$('#popupHelpIndex').hide();
	});
	
	$('#tableHelp').click(function(e){
		$('#popupHelpIndex').hide();
	});
	$('#tableHelp').live('tap',function(e){
		$('#popupHelpIndex').hide();
	});
	$('#tableHelp').live('taphold',function(e){
		$('#popupHelpIndex').hide();
	});
    
	$('#popupInfoIndex-screen').click(function(e){
		$('#popupInfoIndex').hide();
	});
	$('#popupInfoIndex-screen').live('tap',function(e){
		$('#popupInfoIndex').hide();
	});
	$('#popupInfoIndex-screen').live('taphold',function(e){
		$('#popupInfoIndex').hide();
	});
	
	$('#tableInfo').click(function(e){
		$('#popupInfoIndex').hide();
	});
	$('#tableInfo').live('tap',function(e){
		$('#popupInfoIndex').hide();
	});
	$('#tableInfo').live('taphold',function(e){
		$('#popupInfoIndex').hide();
	});
}

var g_GestioneStats = false;

function OnLoadStats(){
	
	if(!g_GestioneStats)
	{
		$('#gestione_home').unbind("click");
		$('#gestione_home').click(function(e){
			$.mobile.changePage( "../index.html", { transition: "none" } );
			setTimeout(OnLoadMuonFlux(),200);
			return false;
		});
		g_GestioneStats = true;
	}
}

function inserisciStat(momentum, angle, surface,height,frequenza){
	var sql = 'insert into mf_detection ("id_detection","startDetection","frequenzaBlink","momentum","angle","surface","height")'+
				'values ("'+g_idDetection+'","'+g_startDate+'","'+frequenza+'","'+momentum+'","'+angle+'","'+surface+'","'+height+'");';
	
	ExecuteQuery(sql);
}

function aggiornaStat(stopDate){
	
	var sql = 'update mf_detection set nBlink ="'+g_nBlink+'", durataDetection ="'+time_between(g_startDate,stopDate)+'", stopDetection ="'+stopDate+'" where id_detection ="'+g_idDetection+'";';
	ExecuteQuery(sql);
}

var g_loadMuonFlux = false;
var g_startDate = '';

var g_start = 0;
var g_timer = 0;
var g_nBlink = 0;
var g_idDetection = '';

var g_nStopDetection = 0;
var errorInfo;
var g_beep=new Media("/android_asset/www/audio/futurebeep2.wav",null,errorInfo);


function OnLoadMuonFlux() {
//		GetPosition ();
	 OnLoadHelpIndex();	
	 
	 creaAreaMuon();
	 
	 if(!g_loadMuonFlux){
		creaAreaMuon();
		g_loadMuonFlux = true;
		$('#gestione_home').unbind("click");
		$("#gestione_home").click(function(e){
			$.mobile.changePage( "index.html", { transition: "slide" } );
		});
		$('#startMuonFlux').unbind("click");
		$("#startMuonFlux").click(function(e){
			$('#confMuon').hide();
			creaAreaMuon();
			$('#timeCounter').text('-1');
			$('#mounCounter').text('0');
			timeCounter();
			$('#time').show();
			$("#startMuonFlux").hide();
			$("#stopMuonFlux").show();
			$("#testMuon").hide();
			inizializzaVariabiliTest();
	        console.log(g_frequenza);
			if(g_frequenza==0){
				
				var muonFlux = calcoloMuonFlux(g_momentum,g_angle,g_height,g_surface);
				g_frequenza = (1/parseFloat(muonFlux))*1000;
			}
			showMuonFlux(g_frequenza);
			aggiornaLog('',g_frequenza);
			inserisciStat(g_momentum, g_angle, g_surface,g_height,g_frequenza);
		});
		$('#stopMuonFlux').unbind("click");
		$("#stopMuonFlux").click(function(e){
			$('#confMuon').show();
			g_nStopDetection++;
			var stopDate = GetDataTimeNow('/',':');
			$('#time').hide();
			$("#startMuonFlux").show();
			$("#stopMuonFlux").hide();
			clearTimeout(g_start);
			clearTimeout(g_timer);
			aggiornaLog(stopDate,'');
			aggiornaStat(stopDate);
			inizializzaVariabiliTest();
			aggiornaMuonCounter();
			$("#testMuon").show();
			
		});
		$('#testMuon').unbind("click");
		$("#testMuon").click(function(e){
			$( "#popupInfoFlux-popup").show();
			$( "#popupInfoFlux-popup").popup();
			$( "#popupInfoFlux-popup").popup( "open" );
			return false;
		});
		$('#confMuon').unbind("click");
		$("#confMuon").click(function(e){
			$.mobile.changePage( "page/conf.html", { transition: "none" } );
			setTimeout(OnLoadConf(),200);
			return false;
			
		});
		$('#statMuon').unbind("click");
		$("#statMuon").click(function(e){
			$.mobile.changePage( "page/stats.html", { transition: "none" } );
			setTimeout(OnLoadStats(),200);
			return false;
		});
		IniDatabase();
	}
}


function beepMuonLoad() {
          //g_beep=new Media("/android_asset/www/audio/muonfluxadr.mp3",null,errorInfo);
	    //g_beep=new Media("/android_asset/www/audio/futurebeep2.wav",null,errorInfo);
    
}
function beepMuonStart() {
       	if(g_beep){
       		  g_beep.play();
       		  }else{
       		  g_beep=new Media("/android_asset/www/audio/futurebeep2.wav",null,errorInfo);
       		  }
    
}
function beepMuonStop() {
     if(g_beep){
    	g_beep.stop();
    	//g_beep.release();
    	}else{
    	g_beep=new Media("/android_asset/www/audio/futurebeep2.wav",null,errorInfo);
    	}
}
function creaAreaMuon(){
	var areaMuon = '';
	for(var i=0;i<10;i++){
		areaMuon += '<tr>';
		for (var a=0;a<10;a++){
			areaMuon += '<td id="areaMuon-'+i+'-'+a+'" class="tdMuon" valore=""></td>';
		}
		areaMuon += '</tr>';
	}
	$('#controlloMuon').html(areaMuon);
}
function aggiornaLog(stopDate){
	if(stopDate==''){
		$('#startDetection').text(g_startDate);
		$('#frequenzaBlink').text((1000/g_frequenza).toFixed(2));
		$('#nBlink').text('');
		$('#momentum').text(g_momentum);
		$('#angle').text(g_angle);
		$('#surface').text(g_surface);
		$('#height').text(g_height);
		$('#durataDetection').text('');
		$('#stopDetection').text('');
	}else{
		$('#nBlink').text(g_nBlink);
		$('#durataDetection').text(time_between(g_startDate,stopDate));
		$('#stopDetection').text(stopDate);
		$('#nMeasurements').text(g_nStopDetection);
	}
}
function showMuonFlux(frequenza){
      g_start = setTimeout(function(e){
		 	renderMuonFlux(g_frequenza);
	 	},g_frequenza);
	 
}
/*
function renderMuonFlux(g_frequenza){
	beepMuonStart();
	$('#muonFlux').show();
	$('#muonFluxOff').hide();
	g_nBlink ++;
	 setTimeout(function(e){
		 	beepMuonStop();
		 	$('#muonFlux').hide();
		 	$('#muonFluxOff').show();
		 	},300);
	 g_start = setTimeout(function(e){renderMuonFlux(g_frequenza);},g_frequenza);
}
*/

function renderMuonFlux(g_frequenza){
 //Calcolo Poissoniana 
  
    var DT=100;// detector sample time 100 ms
    var L = Math.exp(-1.*((1000./g_frequenza))*DT/1000.);
    var k = 0;
    var p = 1.0;
    do {
        p = p * Math.random();
        k++;
    } while (p > L);

    var nmu= k-1;
    
    if(nmu>=1){
	console.log(nmu+ ' || ' + p + ' || ' + L + ' || '+ 1000./g_frequenza);
	//loop n poisson muon
	for(var nu=0;nu<nmu;nu++){ 
	    beepMuonLoad();	
	    beepMuonStart();
	    mostraMuon();
	    g_nBlink ++;
	    aggiornaMuonCounter();
	    setTimeout(function(e){
		beepMuonStop();
		},DT/nmu);
	}
	    renderMuonFlux(g_frequenza);
	}else{
	    g_start = setTimeout(function(e){renderMuonFlux(g_frequenza);},DT);
	}
	
}
function timeCounter(){
	
	$('#timeCounter').text(parseInt($('#timeCounter').text())+1);
	g_timer = setTimeout(function(e){timeCounter();},1000);
}
function aggiornaMuonCounter(){
	$('#muonCounter').text(g_nBlink);
}
function mostraMuon(){
	var x = estraiY();
	var y = estraiX();
	
	for(var i=0;i<10;i++){
		for (var a=0;a<10;a++){
			$('#areaMuon-'+i+'-'+a).text($('#areaMuon-'+i+'-'+a).attr('value'));
			$('#areaMuon-'+i+'-'+a).attr('style','color:#2f6bad !important;padding:0 !important;');
		}
	}
	var nMuonCoord = parseInt(inizializzaInputNumber($('#areaMuon-'+x+'-'+y).attr('value')))+1;
	
	$('#areaMuon-'+x+'-'+y).html('<img src="../img/mu.png"/>');
	$('#areaMuon-'+x+'-'+y).attr('value', nMuonCoord);
	
	//$('#areaMuon-'+x+'-'+y).attr('style','color:rgb(201,58,58)');
	
}

function calcoloMuonFlux(p,Theta,h,area){
	
	
	 /* var p=1; //1-1000 GeV (muon momentum in GeV)
	  var Theta=35;//(0-90) in degree (zenith angle)
	  var h=100;//(0-4000)altitude in meter
	  var area=45;//cm2 area of the smartphone screen (IPhone 5) (could be increased by the user)
	  */
	  //from degree to radiant
	  var theta=Theta/180.*3.14159265;  

	  //Parameter of the differential muon spectrum
	  var p0=0.86;//+/-0.06
	  var p1=0.133;//+/-0.002
	  var p2=-2.521;//+/-0.004
	  var p3= -5.78;//+/-0.03
	  var p4=-2.11;//+/-0.03

	  var y=log10(p);
	  var H_Th0=p1*( y*y*y/2. - 5.*y*y/2 + 3*y) + p2*( -2.*y*y*y/3. + 3*y*y-10.*y/3.+1) + p3*( y*y*y/6.- y*y/2. + y/3.) + p4*( y*y*y/3.- 2*y*y + 11.*y/3. -2.);
	  //Zenith angle dependence
	  var phi_Th0=p0*Math.pow(10.,H_Th0);
	  var phi_ThZ=phi_Th0*Math.cos(theta)*Math.cos(theta);

	  //altitude dependence:
	  var L=4900+750*p;//meter
	  var phi_h=phi_ThZ*Math.exp(h/L);
	 
	  //Area of surface detector in m2 (Example IPhone screen=45 cm2 = 0.0045n2)
	  var surface=area/10000;
	  var dg_flux=phi_h*surface*2.*3.14159265;

	console.log(p + ' || ' + Theta + ' || ' + h + ' || ' + phi_h + ' || ' + parseFloat(dg_flux).toFixed(6));
	return parseFloat(dg_flux).toFixed(12);
	
	
}
function inizializzaVariabiliTest(){
	g_startDate = GetDataTimeNow('/',':');
	g_start = 0;
	g_nBlink = 0;
	g_idDetection = getDataMsForSQLlite(g_startDate);
	console.log("g_idDetection: "+g_idDetection);
}

//*************** PARAMETRI ****************

var g_momentum 	= 1;
var g_angle 	= 0;
var g_surface 	= 60;
var g_height 	= 10;

var g_frequenza = 0;

//*******************************************



var g_GestioneConf = false;

function OnLoadConf(){
	
	if(!g_GestioneConf)
	{
		$('#gestione_home').unbind("click");
		$('#gestione_home').click(function(e){
			$.mobile.changePage( "../index.html", { transition: "none" } );
			setTimeout(OnLoadMuonFlux(),200);
			return false;
		});
		$('#saveConfig').unbind("click");
		$('#saveConfig').click(function(e) {
			var momentum 	= $('#momentumVal').attr('value');
			var angle 		= $('#angleVal').attr('value');
			var surface 	= $('#surfaceVal').attr('value');
			var height 		= $('#heightVal').attr('value');
			
			var muonFlux = calcoloMuonFlux(momentum,angle,height,surface);
			g_frequenza = (1/parseFloat(muonFlux))*1000;
			console.log(g_frequenza);
			if(g_frequenza>60000){
				$('#messagePopup-popupConfirmFrequenza').html('Are you sure to wait more than 1 minute to see a muon?');
				$('#okConfirm').attr('function', 'aggiornaParametri');
				$('#okConfirm').attr('parameters', momentum+'_'+angle+'_'+surface+''+height);
				$( "#popupConfirmFrequenza").popup( "open" );
			}else{
				g_nStopDetection = 0;
				g_momentum 	= momentum;
				g_angle 	= angle;
				g_surface 	= surface;
				g_height 	= height;
				$.mobile.changePage( "../index.html", { transition: "none" } );
			}
		});
		$('#okConfirm').unbind("click");
		  $('#okConfirm').click(
			function(e){
				var method = $('#okConfirm').attr('function');
				window[method]();
			}
		  );
		  $('#annullaConfirm').unbind("click");
		  $('#annullaConfirm').click(
			function(e){
				$( "#popupConfirmFrequenza").popup( "close" );
			}
		  );
		
		
		g_GestioneConf = true;
	}
}
function aggiornaParametri(momentum,angle,surface,height){

	g_momentum 	= momentum;
	g_angle 	= angle;
	g_surface 	= surface;
	g_height 	= height;
	g_nStopDetection = 0;
	$.mobile.changePage( "../index.html", { transition: "none" } );
	setTimeout(function(){
		OnLoadMuonFlux();
	},200);
}



var g_MappaLoad = false;
var g_ElencoUbi = 'SELECT * from ig_esercizio';
var g_zoomMapItem = '';

function OnLoadMappa(){
	if(g_MappaLoad == false)
	{
		
		$('#mappa_home').click(function(e){
			$.mobile.changePage( "../index.html", { transition: "none" } );
			g_gotoScheda = 'MENU';
			return false;
		});
		g_MappaLoad = true;
	}
	loadMappa ('mappa_dettGlobal');	
}

function loadMappa (inDiv){
	
	var theQuery = g_ElencoUbi ;
	//theQuery += " WHERE "+getMapFiltroAv();
	ExecuteQuery(theQuery,CallBack_MappaGlobal,inDiv);
	
}

function CallBack_MappaGlobal(inTrue,inQuery,inResult,inParameters){
	
	if(inTrue)
	{
		var row = inResult.rows;
		
		var theArray = new Array();
		theArray[0] = new Array();
		theArray[0][0] = 'Attuale';
		theArray[0][1] = 'blue';
		theArray[1] = new Array();
		theArray[1][0] = 'Esercizio';
		theArray[1][1] = 'red';
		if(g_zoomMapItem == '')
			theZoom = 15;
		else
			theZoom = 19;

		g_Map = CreateMap(g_AttPos,theZoom,document.getElementById(inParameters),theArray);

		for(var i = 0; i < row.length; i ++)
		{
			var theItem = row.item(i);
			var latlng = new google.maps.LatLng(theItem.latitudine,theItem.longitudine);
			var theAPar = new Array();

			theAPar[0] = theItem.indirizzo;
			theAPar[1] = theItem.codice_aams_esercizio;
			var tooltip = '<a href="#"';
			tooltip += 'onclick="g_GestioneGoto=\''+theItem.codice_aams_esercizio+'\'; $.mobile.changePage(\'gestione.html\',  { transition: \'none\' } ); setTimeout(OnLoadGestione(),200); ">';
        	tooltip += '<div id="tooltip" style="text-decoration: none;">';
            tooltip += '<strong>'+theItem.insegna+'</strong> ('+theItem.codice_aams_esercizio+')</a><br/><div style="color:black;text-shadow:none;">'+theItem.indirizzo+'</div>';
            tooltip += '<div style="color:black;text-shadow:none;">';
            tooltip += '</div></div>';
             tooltip += '</div>';
            
            if(!(isNaN(theItem.latitudine) && isNaN(theItem.longitudine)))
            {    	

	            //Resolved MAX stack error

	            	SetPointOnMapByPos(g_Map,latlng ,'red',theAPar,tooltip,5);  
            }
            
		}
		if(g_AttPos != undefined)
			SetPointOnMapByPos(g_Map,g_AttPos ,'blue',theAPar,undefined,5);
        g_zoomMapItem = '';
        
	}
}


var END_OF_INPUT = -1;

var base64Chars = new Array(
    'A','B','C','D','E','F','G','H',
    'I','J','K','L','M','N','O','P',
    'Q','R','S','T','U','V','W','X',
    'Y','Z','a','b','c','d','e','f',
    'g','h','i','j','k','l','m','n',
    'o','p','q','r','s','t','u','v',
    'w','x','y','z','0','1','2','3',
    '4','5','6','7','8','9','+','/'
);

var reverseBase64Chars = new Array();
for (var i=0; i < base64Chars.length; i++){
    reverseBase64Chars[base64Chars[i]] = i;
}

var base64Str;
var base64Count;
function setBase64Str(str){
    base64Str = str;
    base64Count = 0;
}
function readBase64(){    
    if (!base64Str) return END_OF_INPUT;
    if (base64Count >= base64Str.length) return END_OF_INPUT;
    var c = base64Str.charCodeAt(base64Count) & 0xff;
    base64Count++;
    return c;
}
function encodeBase64(str){
    setBase64Str(str);
    var result = '';
    var inBuffer = new Array(3);
    var lineCount = 0;
    var done = false;
    while (!done && (inBuffer[0] = readBase64()) != END_OF_INPUT){
        inBuffer[1] = readBase64();
        inBuffer[2] = readBase64();
        result += (base64Chars[ inBuffer[0] >> 2 ]);
        if (inBuffer[1] != END_OF_INPUT){
            result += (base64Chars [(( inBuffer[0] << 4 ) & 0x30) | (inBuffer[1] >> 4) ]);
            if (inBuffer[2] != END_OF_INPUT){
                result += (base64Chars [((inBuffer[1] << 2) & 0x3c) | (inBuffer[2] >> 6) ]);
                result += (base64Chars [inBuffer[2] & 0x3F]);
            } else {
                result += (base64Chars [((inBuffer[1] << 2) & 0x3c)]);
                result += ('=');
                done = true;
            }
        } else {
            result += (base64Chars [(( inBuffer[0] << 4 ) & 0x30)]);
            result += ('=');
            result += ('=');
            done = true;
        }
        lineCount += 4;
        if (lineCount >= 76){
            result += ('\n');
            lineCount = 0;
        }
    }
    return result;
}
function readReverseBase64(){   
    if (!base64Str) return END_OF_INPUT;
    while (true){      
        if (base64Count >= base64Str.length) return END_OF_INPUT;
        var nextCharacter = base64Str.charAt(base64Count);
        base64Count++;
        if (reverseBase64Chars[nextCharacter]){
            return reverseBase64Chars[nextCharacter];
        }
        if (nextCharacter == 'A') return 0;
    }
    return END_OF_INPUT;
}

function ntos(n){
    n=n.toString(16);
    if (n.length == 1) n="0"+n;
    n="%"+n;
    return unescape(n);
}

function decode_base64(str){
    setBase64Str(str);
    var result = "";
    var inBuffer = new Array(4);
    var done = false;
    while (!done && (inBuffer[0] = readReverseBase64()) != END_OF_INPUT
        && (inBuffer[1] = readReverseBase64()) != END_OF_INPUT){
        inBuffer[2] = readReverseBase64();
        inBuffer[3] = readReverseBase64();
        result += ntos((((inBuffer[0] << 2) & 0xff)| inBuffer[1] >> 4));
        if (inBuffer[2] != END_OF_INPUT){
            result +=  ntos((((inBuffer[1] << 4) & 0xff)| inBuffer[2] >> 2));
            if (inBuffer[3] != END_OF_INPUT){
                result +=  ntos((((inBuffer[2] << 6)  & 0xff) | inBuffer[3]));
            } else {
                done = true;
            }
        } else {
            done = true;
        }
    }
    return result;
}

﻿var g_Map = null;
var g_MappaCnt = 0;
var g_MappaACnt = 0;
var g_AttPos = 0;


rad = function(x) {return x*Math.PI/180;};

function DistanceKm (p1, p2) {
          if(p1 == 0 || p2 == 0)
            return 0;
		var R = 6371; // earth's mean radius in km
		var dLat  = rad(p2.lat() - p1.lat());
		var dLong = rad(p2.lng() - p1.lng());

		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) * Math.sin(dLong/2) * Math.sin(dLong/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		var d = R * c;

		return d.toFixed(3);
	}
    
    
 function GetDistancebyLatLon (inlat,inlon,inCallBack,inParameters,inPos)
 {
	 var pos = new google.maps.LatLng(inlat,inlon);                                                               
	 inCallBack(DistanceKm(pos,inPos),pos,inPos,inParameters);
 }



function noLocation ()
{
 console.error("Error Position");   
}

function foundLocation (position)
{
	g_AttPos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
}

function GetPosition ()
{
	
	if (!navigator.geolocation)
	{
		alert('Unfortunately, your browser does not support Geo Services');
	}
	else
	{		
	   if(location.hostname == 'localhost')
	       navigator.geolocation.getCurrentPosition(foundLocation, noLocation);
        else       
		   navigator.geolocation.watchPosition(foundLocation, noLocation,{ frequency: 3000 });

	}
}

function GetDistancebyAddres(inIndirizzo,inCallBack, inParameters,inPos)
{
	var geocoder = new google.maps.Geocoder();
	
	if (geocoder) 
	{
         var userLocation = inIndirizzo;
         
		 var geocoder = new google.maps.Geocoder();
		
		        
                geocoder.geocode( {'address': userLocation}, function(inResults, inStatus) {

            			if (inStatus == google.maps.GeocoderStatus.OK) {
							var pos = new google.maps.LatLng(inResults[0].geometry.location.lat(),inResults[0].geometry.location.lng());   
                                                  
							inCallBack(DistanceKm(pos,inPos),pos,inPos,inParameters);                                                          
            			}
						 else if (inStatus == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) { 
						 //alert(inStatus);
						 //GetDistancebyAddres(inIndirizzo,inCallBack, inParameters);
								setTimeout(function(){GetDistancebyAddres(inIndirizzo,inCallBack, inParameters,inPos);}, 1000);
                       } else { 
                            //alert("Geocode was not successful for the following reason: " + inStatus); 
                            inCallBack(null,pos,inPos,inParameters); 
                
                       }
                           
                });
        
    }
   // else
   //     alert('Errore GeoCoder');
    
}

var theBound;
var tableid = 260197;
function CreateMap(inPos,inZoom,inElement,inLeggenda)
{
	theBounds = new google.maps.LatLngBounds();
	 var myOptions = {
			    zoom: inZoom,
			    mapTypeId: google.maps.MapTypeId.ROADMAP
			  };
    var theMap = new google.maps.Map(inElement, myOptions);
    
    if(inLeggenda != undefined)
    {
    
	    // Create the legend and display on the map
	    var legendDiv = document.createElement('DIV');
	    var legend = new Legend(legendDiv, theMap,inLeggenda);
	    legendDiv.index = 1;
	    theMap.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legendDiv);
    }
    return theMap;    
}


function Legend(controlDiv, map,inLeggenda) {
  // Set CSS styles for the DIV containing the control
  // Setting padding to 5 px will offset the control
  // from the edge of the map
  controlDiv.style.padding = '5px';

  // Set CSS for the control border
  var controlUI = document.createElement('DIV');
  controlUI.style.backgroundColor = 'white';
  controlUI.style.borderStyle = 'solid';
  controlUI.style.borderWidth = '1px';
  controlUI.style.borderColor = 'black';
  controlUI.title = 'Legend';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control text
  var controlText = document.createElement('DIV');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '12px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.style.color = 'black';
  controlText.style.position = 'relative';

  // Add the text
  controlText.innerHTML = '<b></b><br />';
  for(var i = 0; i < inLeggenda.length; i ++)
  {
	  if(inLeggenda[i][1] == 'red')
		  controlText.innerHTML += '<img src="http://maps.google.com/mapfiles/ms/micons/red-dot.png" /><div style="position:relative;display:inline;top:-14px;">'+inLeggenda[i][0]+'</div><br />';
	  else if(inLeggenda[i][1] == 'blue')
		  controlText.innerHTML += '<img src="http://maps.google.com/mapfiles/ms/micons/blue-dot.png" /><div style="position:relative;display:inline;top:-14px;">'+inLeggenda[i][0]+'</div><br />';
	  else if(inLeggenda[i][1] == 'green')
		  controlText.innerHTML += '<img src="http://maps.google.com/mapfiles/ms/micons/green-dot.png" /><div style="position:relative;display:inline;top:-14px;">'+inLeggenda[i][0]+'</div><br />';
	  else
		  controlText.innerHTML += '<img src="http://maps.google.com/mapfiles/ms/micons/yellow-dot.png" /><div style="position:relative;display:inline;top:-14px;">'+inLeggenda[i][0]+'</div><br />';
  }
  controlUI.appendChild(controlText);
}

var theCNT = 0;

function SetPointOnMapByPos(inMap,inPos,inColor, inParameters,inTooltip,inZoomItem)
{
    var image       = new google.maps.MarkerImage('http://maps.google.com/mapfiles/ms/icons/'+inColor+'-dot.png');
    if(inTooltip == undefined)
    {
        var theMarker    = new google.maps.Marker({
    									position: inPos,
    									map: inMap,
    									icon: image
    								});
        
        //if(inTooltip != undefined)
        //{
        	theBounds.extend(inPos);
        	inMap.fitBounds(theBounds);
        //}
        
    }
    else
    {
     
       
            var marcador    = new google.maps.Marker({
    									position: inPos,
    									icon: image,
    									map: inMap,
                                        title: inParameters[0].insegna
                                        
    								});
            if(inZoomItem > 0)
            {
            	theBounds.extend(inPos);
            	inMap.fitBounds(theBounds);


            }

            
        if (!infowindow) {
                            
            var infowindow = new google.maps.InfoWindow(
            { 
                content: inTooltip                
                           
            });
                            
            google.maps.event.addListener(marcador, 'click', function() {
                infowindow.open(inMap, marcador);
            });
        }
    }
}


var rad = function(x) {return x*Math.PI/180;}
var google;
var g_AttPos = 0;
var g_Map = null;
var g_MappaCnt = 0;
var g_MappaACnt = 0;

function DistanceKm (p1, p2) {
           if(p1 ==0 || p2 == 0)
            return 0;
		var R = 6371; // earth's mean radius in km
		var dLat  = rad(p2.lat() - p1.lat());
		var dLong = rad(p2.lng() - p1.lng());

		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) * Math.sin(dLong/2) * Math.sin(dLong/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		var d = R * c;

		return d.toFixed(3);
}

function foundLocation (position)
{
	g_AttPos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
}

function noLocation ()
{
 console.error("Error Position");   
}

function GetPosition ()
{
	
	if (!navigator.geolocation)
	{
		alert('Unfortunately, your browser does not support Geo Services');
	}
	else
	{		
	   if(location.hostname == 'localhost')
	       navigator.geolocation.getCurrentPosition(foundLocation, noLocation);
        else       
		   navigator.geolocation.watchPosition(foundLocation, noLocation,{ frequency: 3000 });

	}
}

function GetDistancebyLatLon (inlat,inlon,inCallBack,inParameters,inPos)
{
	var pos = new google.maps.LatLng(inlat,inlon);                                                               
	inCallBack(DistanceKm(pos,inPos),pos,inPos,inParameters);  
   
}


function GetDistancebyAddres(inIndirizzo,inCallBack, inParameters,inPos)
{
	var geocoder = new google.maps.Geocoder();
	
	if (geocoder) 
	{
         var userLocation = inIndirizzo;
         
		 var geocoder = new google.maps.Geocoder();
		
		        
                geocoder.geocode( {'address': userLocation}, function(inResults, inStatus) {
            			if (inStatus == google.maps.GeocoderStatus.OK) {
							var pos = new google.maps.LatLng(inResults[0].geometry.location.lat(),inResults[0].geometry.location.lng());   
                                                  
							inCallBack(DistanceKm(pos,inPos),pos,inPos,inParameters);                                                          
            			}
						 else if (inStatus == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) { 
						 //alert(inStatus);
						 //GetDistancebyAddres(inIndirizzo,inCallBack, inParameters);
								setTimeout(function(){GetDistancebyAddres(inIndirizzo,inCallBack, inParameters,inPos);}, 1000);
                       } else { 
                            //alert("Geocode was not successful for the following reason: " + inStatus); 
                            inCallBack(null,pos,inPos,inParameters); 
                
                       }
                           
                });
        
    }
   // else
   //     alert('Errore GeoCoder');
    
}

function SetPointOnMapByPos(inMap,inPos,inColor, inParameters,inTooltip,inZoomItem)
{
    var image       = new google.maps.MarkerImage('http://maps.google.com/mapfiles/ms/icons/'+inColor+'-dot.png');
    if(inTooltip == undefined)
    {
        var theMarker    = new google.maps.Marker({
    									position: inPos,
    									map: inMap,
    									icon: image
    								});
        
        //if(inTooltip != undefined)
        //{
        	theBounds.extend(inPos);
        	inMap.fitBounds(theBounds);
        //}
        
    }
    else
    {
     
       
            var marcador    = new google.maps.Marker({
    									position: inPos,
    									icon: image,
    									map: inMap,
                                        title: inParameters[0].insegna
                                        
    								});
            if(inZoomItem > 0)
            {
            	theBounds.extend(inPos);
            	inMap.fitBounds(theBounds);


            }

            
        if (!infowindow) {
                            
            var infowindow = new google.maps.InfoWindow(
            { 
                content: inTooltip                
                           
            });
                            
            google.maps.event.addListener(marcador, 'click', function() {
                infowindow.open(inMap, marcador);
            });
        }
    }
}

var theBound;
var tableid = 260197;
function CreateMap(inPos,inZoom,inElement,inLeggenda)
{
	
	theBounds = new google.maps.LatLngBounds();
	 var myOptions = {
			    zoom: inZoom,
			    mapTypeId: google.maps.MapTypeId.ROADMAP
			  };
    var theMap = new google.maps.Map(inElement, myOptions);
    
    if(inLeggenda != undefined)
    {
    
	    // Create the legend and display on the map
	    var legendDiv = document.createElement('DIV');
	    var legend = new Legend(legendDiv, theMap,inLeggenda);
	    legendDiv.index = 1;
	    theMap.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legendDiv);
    }
    return theMap;    
}

function Legend(controlDiv, map,inLeggenda) {
	  // Set CSS styles for the DIV containing the control
	  // Setting padding to 5 px will offset the control
	  // from the edge of the map
	  controlDiv.style.padding = '5px';

	  // Set CSS for the control border
	  var controlUI = document.createElement('DIV');
	  controlUI.style.backgroundColor = 'white';
	  controlUI.style.borderStyle = 'solid';
	  controlUI.style.borderWidth = '1px';
	  controlUI.style.borderColor = 'black';
	  controlUI.title = 'Legend';
	  controlDiv.appendChild(controlUI);

	  // Set CSS for the control text
	  var controlText = document.createElement('DIV');
	  controlText.style.fontFamily = 'Arial,sans-serif';
	  controlText.style.fontSize = '12px';
	  controlText.style.paddingLeft = '4px';
	  controlText.style.paddingRight = '4px';
	  controlText.style.color = 'black';
	  controlText.style.position = 'relative';

	  // Add the text
	  controlText.innerHTML = '<b></b><br />';
	  for(var i = 0; i < inLeggenda.length; i ++)
	  {
		  if(inLeggenda[i][1] == 'red')
			  controlText.innerHTML += '<img src="http://maps.google.com/mapfiles/ms/micons/red-dot.png" /><div style="position:relative;display:inline;top:-14px;">'+inLeggenda[i][0]+'</div><br />';
		  else if(inLeggenda[i][1] == 'blue')
			  controlText.innerHTML += '<img src="http://maps.google.com/mapfiles/ms/micons/blue-dot.png" /><div style="position:relative;display:inline;top:-14px;">'+inLeggenda[i][0]+'</div><br />';
		  else if(inLeggenda[i][1] == 'green')
			  controlText.innerHTML += '<img src="http://maps.google.com/mapfiles/ms/micons/green-dot.png" /><div style="position:relative;display:inline;top:-14px;">'+inLeggenda[i][0]+'</div><br />';
		  else
			  controlText.innerHTML += '<img src="http://maps.google.com/mapfiles/ms/micons/yellow-dot.png" /><div style="position:relative;display:inline;top:-14px;">'+inLeggenda[i][0]+'</div><br />';
	  }
	  controlUI.appendChild(controlText);
	}

 	function CleanLink(e) {
		if (e.preventDefault) //NORMAL			
            e.preventDefault();
		else //IE
			e.returnValue = false;
	 }
 	
	  function GetEvent(e) {	  
	     if (window.event) //IE
	         return event.srcElement;
	     else //FIREFOX
	         return e.target;
	 }
	  function roundNumber(num, dec) {
			var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
			return result;
		}
	  function printObject(o) {
		  var out = '';
		  for (var p in o) {
		    out += p + ': ' + o[p] + '\n';
		  }
		  alert(out);
		}
	  
	  function ClickVibrate (){
		  //alert(location.hostname);
		  if(location.hostname != 'localhost'){
			navigator.notification.vibrate(2);
			//alert(2);
			navigator.notification.beep(2);
		  }
		}
	  
	  function colorToHex(color) {
		    if (color.substr(0, 1) === '#') {
		        return color;
		    }
		    var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
		    
		    var red = parseInt(digits[2]);
		    var green = parseInt(digits[3]);
		    var blue = parseInt(digits[4]);
		    
		    var rgb = blue | (green << 8) | (red << 16);
		    return digits[1] + '#' + rgb.toString(16);
		}
		  
	  
	  function showPopup(inMessage,inTitle,inButton,inCallback){   
	      //if(location.hostname == 'localhost')
	        alert(inMessage);
	      /*else
	      {      
			  //navigator.Notification.alert(
	            Notification.prototype.alert(
	                inMessage,      // message
	                inCallback,     // callback
	                inTitle,        // title
	                inButton         // buttonName
	            );
	      }*/
	   }
	  function sleep(milliseconds) {
		  var start = new Date().getTime();
		  for (var i = 0; i < 1e7; i++) {
		    if ((new Date().getTime() - start) > milliseconds){
		      break;
		    }
		  }
		}

	  function string_prepare(inString) {
		  if(inString == null)
			  inString = '';
		  inString += '';
		  inString = inString.replace('null','');
		  inString = inString.replace(/'/g,"\'");
		  inString = inString.replace(/"/g,"");
		  inString = inString.replace(/;/g,"");
		  return inString;
	  }
	  
	  function popErrorShow (inString){
			//$.mobile.hidePageLoadingMsg();
			$( "#error_popup").html(inString);
			$( "#popupBasic" ).popup( "open" );	 
	  }
	  
	  function in_array(inString, inArray){
		    for(var i = 0; i < inArray.length; i ++)
		    {
		        if (inArray[i] == inString) 
		        	return i;	            
		    }
		    return -1;
		}	 
	  
	  function formatMoney (inNum,euro){
		  	var negativo = false;
		  	var numberStr = parseFloat(inNum).toFixed(2).toString();
		  	if(numberStr.indexOf('-') != -1)
		  	{
		  		numberStr = numberStr.replace('-','');
		  		negativo = true;
		  	}	  	  
			
			var numFormatDec = numberStr.slice(-2); /*decimal 00*/
			numberStr = numberStr.substring(0, numberStr.length-3); /*cut last 3 strings*/
			var numFormat = new Array;
			while (numberStr.length > 3) {
				numFormat.unshift(numberStr.slice(-3));
				numberStr = numberStr.substring(0, numberStr.length-3);
			}
			numFormat.unshift(numberStr);
			var valuta = '';
			if(euro)
				valuta = ' &euro;';
			var theReturn = numFormat.join('.')+','+numFormatDec+valuta; /*format 000.000.000,00 */
			if(negativo)
				theReturn = "-"+theReturn;
			return  theReturn
		}
	  
	 
	 function writelog(inString){
		 console.log(inString);
	 }
	 function writeError(inString){
		 console.error(inString);
	 }
	 function formatDate(date,ora){
		 /*
		  * Formatta la data dal formato YYYY-mm-dd hh:mi:ss
		  * a dd/mm/YYYY hh:mi.ss
		  */
		 var dataOra = '...';
		 var arrDate = date.split('-');
		 if(arrDate.length>1){
			 var arrOra = arrDate[2].split(' ');
			 dataOra = arrOra[0]+'/'+arrDate[1]+'/'+arrDate[0];
			 if(ora)
				 dataOra +=' '+arrOra[1];
		 }
		 return dataOra;
	 }
	 
	 function date_ms(date1){
		 
		 if(date1==null || date1==undefined && date1=='' && date1.length == 0)
         {
        	// writelog("Errore Data: [" + date1 + "]");
        	 return 0;
         }
		 var data1 = new Date();
		 var arrBase = date1.split(' ');
		 var arrDate1 = arrBase[0].split('/');
		 if(arrBase.length > 1) //ADD HOUR TIME
		 {			 
			 var theTime = arrBase[1].split(':');
			 if(theTime.length > 2)
				 data1.setHours(theTime[0],theTime[1],theTime[2],00);
		 }			 
         var anno1   = arrDate1[2];
         var mese1   = arrDate1[1];
         
         
         var day1 = arrDate1[0];
         var arrDays1 = day1.split(' '); 
         var giorno1 = arrDays1[0];
         
         if(mese1 == undefined || mese1.substr == undefined || mese1.length == 0)
         {
        	 //writelog("Errore Data: [" + date1 + "]");
        	 return 0;
         }
         if(mese1.substr(0,1)==0)
             mese1 = mese1.substr(1,1);
         if(giorno1.substr(0,1)==0)
             giorno1 = giorno1.substr(1,1);
         data1.setFullYear(anno1, parseInt(mese1)-1, giorno1);
         return data1.getTime(); 
	 }
	 
	   function daysTime_between(date1, date2) {
	        
           // The number of milliseconds in one day
           var ONE_DAY = 1000 * 60 * 60 * 24;
           var ONE_HOUR = 1000 * 60 * 60;
           
           var arrDate1 = date1.split('/');
           var arrDate2 = date2.split('/');
           var anno1   = arrDate1[0];
           var anno2   = arrDate2[0];
           var mese1   = arrDate1[1];
           var mese2   = arrDate2[1];
           var day1 = arrDate1[2];
           var day2 = arrDate2[2];
           
           var arrDays1 = day1.split(' '); 
           var arrDays2 = day2.split(' ');
           
           var giorno1 = arrDays1[0];
           var giorno2 = arrDays2[0];
           
           var hour1 = arrDays1[1];
           var hour2 = arrDays2[1];
           
           var hms1 = hour1.split(':');
           var hms2 = hour2.split(':');
           
           var ora1 = hms1[0];
           var ora2 = hms2[0];
           
           var minuti1 = hms1[1];
           var minuti2 = hms2[1];
           
           var secondi1 = hms1[2];
           var secondi2 = hms2[2];
           
           
           if(mese1.substr(0,1)==0)
               mese1 = mese1.substr(1,1);
           if(mese2.substr(0,1)==0)
               mese2 = mese2.substr(1,1);
           if(giorno1.substr(0,1)==0)
               giorno1 = giorno1.substr(1,1);
           if(giorno2.substr(0,1)==0)
               giorno2 = giorno2.substr(1,1);
           
           
           var data1 = new Date();
           var data2 = new Date();
           data1.setFullYear(anno1, mese1, giorno1);
           data2.setFullYear(anno2,mese2,giorno2);
           data1.setHours(ora1,minuti1,secondi1);
           data2.setHours(ora2,minuti2,secondi2);
           
           var date1_ms = data1.getTime();
           var date2_ms = data2.getTime();


           // Calculate the difference in milliseconds
           var difference_ms = Math.abs(date1_ms - date2_ms);

           // Convert back to days and return
           return Math.round(difference_ms/ONE_HOUR);
       
       }
	 
	   function days_between(date1, date2) {
	        
           // The number of milliseconds in one day
           var ONE_DAY = 1000 * 60 * 60 * 24;
           
           var arrDate1 = date1.split('/');
           var arrDate2 = date2.split('/');
           var anno1   = arrDate1[2];
           var anno2   = arrDate2[0];
           var mese1   = arrDate1[1];
           var mese2   = arrDate2[1];
           var day1 = arrDate1[0];
           var day2 = arrDate2[2];
           
           var arrDays1 = day1.split(' '); 
           var arrDays2 = day2.split(' ');
           
           var giorno1 = arrDays1[0];
           var giorno2 = arrDays2[0];
           /*
           var hour1 = arrDays1[1];
           var hour2 = arrDays2[1];
           
           var hms1 = hour1.split(':');
           var hms2 = hour2.split(':');
           
           var ora1 = hms1[0];
           var ora2 = hms2[0];
           
           var minuti1 = hms1[1];
           var minuti2 = hms2[1];
           
           var secondi1 = hms1[2];
           var secondi2 = hms2[2];
           */
           if(mese1 == undefined || mese1.substr == undefined || mese1.length == 0)
           {
          	// writelog("Errore Data: [" + date1 + "]");
          	 return 0;
           }
           if(mese2 == undefined || mese2.substr == undefined || mese2.length == 0)
           {
          	 //writelog("Errore Data: [" + date1 + "]");
          	 return 0;
           }
           
           if(mese1.substr(0,1)==0)
               mese1 = mese1.substr(1,1);
           if(mese2.substr(0,1)==0)
               mese2 = mese2.substr(1,1);
           if(giorno1.substr(0,1)==0)
               giorno1 = giorno1.substr(1,1);
           if(giorno2.substr(0,1)==0)
               giorno2 = giorno2.substr(1,1);
           
           
           var data1 = new Date();
           var data2 = new Date();
           data1.setFullYear(anno1, mese1, giorno1);
           data2.setFullYear(anno2,mese2,giorno2);
           //data1.setHours(ora1,minuti1,secondi1);
           //data2.setHours(ora2,minuti2,secondi2);
           
           var date1_ms = data1.getTime();
           var date2_ms = data2.getTime();

           
           // Calculate the difference in milliseconds
           var difference_ms = Math.abs(date1_ms - date2_ms);
           
           // Convert back to days and return
           return Math.round(difference_ms/ONE_DAY);
       
       }
	   
	   function time_between(date1, date2) {
	        
           // The number of milliseconds in one day
           var ONE_DAY = 1000 * 60 * 60 * 24;
           var ONE_HOUR = 1000 * 60 * 60;
           var ONE_MINUTE = 1000 * 60 ;
           var ONE_SECOND = 1000;
           
           var arrDate1 = date1.split('/');
           var arrDate2 = date2.split('/');
           var day1   = arrDate1[0];
           var day2   = arrDate2[0];
           var mese1   = arrDate1[1];
           var mese2   = arrDate2[1];
           var anno1 = arrDate1[2];
           var anno2 = arrDate2[2];
           
           var arrYears1 = anno1.split(' '); 
           var arrYears2 = anno2.split(' ');
           
           var year1 = arrYears1[0];
           var year2 = arrYears2[0];
           
           var hour1 = arrYears1[1];
           var hour2 = arrYears2[1];
           
           var hms1 = hour1.split(':');
           var hms2 = hour2.split(':');
           
           var ora1 = hms1[0];
           var ora2 = hms2[0];
           
           var minuti1 = hms1[1];
           var minuti2 = hms2[1];
           
           var secondi1 = hms1[2];
           var secondi2 = hms2[2];
           
           
           if(mese1.substr(0,1)==0)
               mese1 = mese1.substr(1,1);
           if(mese2.substr(0,1)==0)
               mese2 = mese2.substr(1,1);
           if(day1.substr(0,1)==0)
        	   day1 = day1.substr(1,1);
           if(day2.substr(0,1)==0)
        	   day2 = day2.substr(1,1);
           
           
           var data1 = new Date();
           var data2 = new Date();
           data1.setFullYear(year1, mese1, day1);
           data2.setFullYear(year2,mese2,day2);
           data1.setHours(ora1,minuti1,secondi1);
           data2.setHours(ora2,minuti2,secondi2);
           
           var date1_ms = data1.getTime();
           var date2_ms = data2.getTime();


           // Calculate the difference in milliseconds
           var difference_ms = Math.abs(date2_ms - date1_ms );
           var diff = difference_ms;
           
           // Convert back to days and return
           var hh = parseInt(diff/ONE_HOUR);
           
           if(hh>=0)
        	   diff = difference_ms - (hh*ONE_HOUR);
           
           var mi = parseInt(diff/ONE_MINUTE);
          
           if(mi>=0)
        	   diff = diff-(mi*ONE_MINUTE);

           var ss = Math.round(diff/ONE_SECOND);
           
           return ('0' + Math.round(hh)).slice(-2)+':'+('0' + Math.round(mi)).slice(-2)+':'+('0' + Math.round(ss)).slice(-2);
       
       }
	   
   function getTodayMidnightMs(){
	   var date = new Date();
	   date.setHours(0, 0, 0, 0);
	   return date.getTime();
   }
  function GetDataTimeNow(sepDay,sepHour)
  {
               var dateT = new Date();
              
           dateTime =('0' + dateT.getDate()).slice(-2)
           + sepDay + ('0' + (dateT.getMonth()+1)).slice(-2)
           + sepDay +  dateT.getFullYear()
           + ' ' + ('0' + dateT.getHours()).slice(-2)
           + sepHour + ('0' + dateT.getMinutes()).slice(-2)
           + sepHour + ('0' + dateT.getSeconds()).slice(-2); 
           
           return    dateTime;  
  }

  function GetDataNow(sepDay){
	  var dateT = new Date();
      var date =('0' + dateT.getDate()).slice(-2)
      + sepDay + ('0' + (dateT.getMonth()+1)).slice(-2)
      + sepDay + (dateT.getFullYear());
      return date;
  }
  function getDataForSQLlite(data){
	  var arrData = data.split('/');
	  return arrData[2]+'-'+arrData[1]+'-'+arrData[0]+' 00:00:00';
  }
  function getDataMsForSQLlite(data){
	  var arrBase = data.split(' ');
	  var arrData = arrBase[0].split('/');
	  var arrHour = arrBase[1].split(':');
	  var date = new Date(arrData[0],arrData[1],arrData[2],arrHour[0],arrHour[1],arrHour[2] );
	  return date.getTime();
  }
  function isToday(date){
	  var today = new Date;
	  arrDate = date.split('-');
	  if(today.getFullYear()==arrDate[0])
		  if(('0' + (today.getMonth()+1)).slice(-2)==arrDate[1])
			  if(('0' + today.getDate()).slice(-2)==arrDate[2])
				  return true;
	 return false;
  }
  String.prototype.replaceAll = function(token, newToken, ignoreCase) {
	    var str, i = -1, _token;
	    if((str = this.toString()) && typeof token === "string") {
	        _token = ignoreCase === true? token.toLowerCase() : undefined;
	        while((i = (
	            _token !== undefined? 
	                str.toLowerCase().indexOf(
	                            _token, 
	                            i >= 0? i + newToken.length : 0
	                ) : str.indexOf(
	                            token,
	                            i >= 0? i + newToken.length : 0
	                )
	        )) !== -1 ) {
	            str = str.substring(0, i)
	                    .concat(newToken)
	                    .concat(str.substring(i + token.length));
	        }
	    }
	return str;
	};
	Array.prototype.contains = function(obj) {
	    var i = this.length;
	    while (i--) {
	        if (this[i] == obj) {
	            return true;
	        }
	    }
	    return false;
	};
	function stringPuntini(inStr, inLimitCnt) {
		if (inStr.length > inLimitCnt) 
			inStr = inStr.substring(0, inLimitCnt) + '...';
		return inStr;
	}
		 
	function checkConnection(){
		
		if(navigator.network != undefined && Connection != undefined)
		{
			var networkState = navigator.network.connection.type;
		
		    var states = {};
		    states[Connection.UNKNOWN]  = 'Unknown';
		    states[Connection.ETHERNET] = 'Ethernet';
		    states[Connection.WIFI]     = 'WiFi';
		    states[Connection.CELL_2G]  = 'Cell 2G';
		    states[Connection.CELL_3G]  = 'Cell 3G';
		    states[Connection.CELL_4G]  = 'Cell 4G';
		    states[Connection.NONE]     = 'None';
		
		    return states[networkState];
		}
		else 
			return 'WiFi';
			//return 'None';
	}
	function isGiornoPreu(){
		var date = new Date();
		var giornoCorrente = date.getDate();
		var ultimoGiorno = new Date(date.getYear(),date.getMonth()+1,0);
		
		if(date.getHours() > 10 && (giornoCorrente==15 || giornoCorrente == ultimoGiorno.getDate()))
			return true;
		return false;
	}

	function loadGoogleMap(inMsg){
		if(checkConnection() == 'None' || checkConnection() == 'Unknown'){
			if(inMsg != '')
				alert(inMsg);
			return false;
		}
		if($.isEmptyObject(google)) {
			$.getScript('https://www.google.com/jsapi', function () {
			google.load("maps", "3", {'other_params' : 'sensor=true' });                       
			});
		}
		if($.isEmptyObject(google)) 
			return false;
		return true;
	}
	function numOfDays(dfrom){
		var d = new Date();
		var df = new Date(dfrom);
		var dto = new Date(d.getFullYear(), d.getMonth(), d.getDate());
		var x = Math.floor((dto.getTime() - df.getTime())/(1000*60*60*24));
		return(x+1);
	}

	function convertDate(d){
		try {
		  var a = d.split('/');
		  return new Date(a[2], parseInt(a[1].replace(/^0+/, ''))-1, parseInt(a[0].replace(/^0+/, '')));
		} catch(e){ return new Date(); }
	}
	function formattaNumero(tipo, importo){
       if(String(importo).indexOf('.')== -1) {
            importo = Math.round(importo*100)/100;
       }else {
        var decimale = (String(importo).split('.'))[1];
        decimale = decimale.substr(0,2);
        importo = (String(importo).split('.'))[0]+'.'+decimale;
       }
        var tot = ''+importo;
        
        tot = (tot.indexOf(".")>=0)?tot+"0":tot+".00";
        tot = tot.substr(0,tot.indexOf(".")+3);
        if(tipo=='importo')
            tot=tot.replace(/\./g , ","); // output sempre con virgola
        return tot;
    }
	function inizializzaInputNumber(campo){
		if(campo==undefined||campo==null||campo=='')
			campo = 0;
		if(is_float(campo))
			return Math.round(campo * 100) / 100;
		return campo;
	}
	function is_float( mixed_var ) {  
	    // %        note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes  
	    // %        note 1: it different from the PHP implementation. We can't fix this unfortunately.  
	    // *     example 1: is_float(186.31);  
	    // *     returns 1: true  
	    return parseFloat(mixed_var * 1) != parseInt(mixed_var * 1);  
	}  
	function generaCodiceSalvataggio(){
		var nCaratteri = 4;
		var stringa = "";
		for (var i=0;i<nCaratteri;i++){
			do{
				var N = Math.floor(Math.random()*74)+48;
			}while(!(((N >= 48) && (N <= 57)) || ((N >= 65) && (N <= 90)) || ((N >= 97) && (N <= 122))));
			
			stringa = stringa+String.fromCharCode(N);
		}
		return stringa;
	}
	String.prototype.replaceAll = function( token, newToken, ignoreCase ) {
	    var _token;
	    var str = this + "";
	    var i = -1;

	    if ( typeof token === "string" ) {

	        if ( ignoreCase ) {

	            _token = token.toLowerCase();

	            while( (
	                i = str.toLowerCase().indexOf(
	                    token, i >= 0 ? i + newToken.length : 0
	                ) ) !== -1
	            ) {
	                str = str.substring( 0, i ) +
	                    newToken +
	                    str.substring( i + token.length );
	            }

	        } else {
	            return this.split( token ).join( newToken );
	        }

	    }
	return str;
	};
	
	var g_changePage = false;
	
	function finishLoadPage(){
		g_changePage = false;
	}
	
	function changePage(url,syncronous){
		g_changePage = true;
		if(syncronous)
			setTimeout(function(){
				
				if(!g_changePage)
					$.mobile.changePage( url, { transition: "none" } );
				else
					changePage(url,syncronous);
			}, 500);
		else
			$.mobile.changePage( url, { transition: "none" } );
	}
	function log10 (arg) {
		  // http://kevin.vanzonneveld.net
		  // +   original by: Philip Peterson
		  // +   improved by: Onno Marsman
		  // +   improved by: Tod Gentille
		  // +   improved by: Brett Zamir (http://brett-zamir.me)
		  // *     example 1: log10(10);
		  // *     returns 1: 1
		  // *     example 2: log10(1);
		  // *     returns 2: 0
		  return Math.log(arg) / 2.302585092994046; // Math.LN10
		}
	function estraiX(){
		var num = Math.round(9*Math.random());
		
		return num;
	}
	function estraiY(){
		var num = Math.round(9*Math.random());
		
		return num;
	}


function creaPopup(idPopup, message){
	$( 'div[data-role=popup]' ).popup();
	$( "#"+idPopup ).show();
	$('#messagePopup-'+idPopup).html(message);
	$( "#"+idPopup ).popup( "open" );
	
}

