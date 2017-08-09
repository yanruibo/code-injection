
// JavaScript Document
/**/


var GET = 'GET';
var XML = 'xml';

var RECEPT_URI = 'http://receptvarazs.hu/mobile/xml/';

/*var RECEPT_URI = 'offline.xml';*/
var homeDiv=$('<ul id="kategorialista"></ul>');
var receptListaDiv=$('<ul id="ul-receptlista"></ul>' );
var receptDiv = $('<ul id="ul-recept"></ul>');

var favDiv =  $('<navfav><a href="#"><div class="favbutton">&nbsp;</div></a></navfav>');
var checkKedvencEredmeny;

var receptListaTitle;

var myScroll;
var myStilusScroll; 

var app_page;
var bottom_page;
var currbg;
var canvasW;
var canvasH;
/*canvasW=screen.width;
canvasH=screen.height;*/
//var menutoptop='120px';
	//	

function showSplash(){ 
	//$("#cim").html('töltés...');

	$('#header').hide();
	$('#splash').show(); 

	hideRolunk();
	hideHelp();
	showMenu();
	hideMenu();
	hideStilus();
	
	var bodybg=$('body');
	var randomnum= 1 + Math.floor(Math.random()*24)
	var sbg='transparent url(images/splash/s' + randomnum + '.jpg) repeat 0 0 fixed';
	

		if (canvasW<320) {
			//menutoptop='85px';
			sbgnyomat='transparent url(images/splash/s0-w240.png)	repeat 0 0 fixed';
			$('#splash').css('background', sbgnyomat);
			$('#splash').css('-webkit-background-size', 'cover');
			var sbg='transparent url(images/splash/s' + randomnum + 'l.jpg) repeat 0 0 fixed';

		} else if (canvasW<480) {
			sbgnyomat='transparent url(images/splash/s0-w320.png)	repeat 0 0 fixed';
			$('#splash').css('background', sbgnyomat);
			$('#splash').css('-webkit-background-size', 'cover');
			var sbg='transparent url(images/splash/s' + randomnum + 'm.jpg) repeat 0 0 fixed';
		}

	/*sbg='transparent url(images/splash/teszt.png) repeat 0 0 fixed';*/

	bodybg.css('background',sbg);
	bodybg.css('-webkit-background-size', '100% 100%'); 
}


function showHome(){ 
	app_page="home";
	$('#splash').hide();
	hideMenu();
	$('home').show();
	$('#header').show();
	$('#home').css('left', '0px')
	$('#receptlista').css('left',canvasW+ 'px')
	$("#cim").html('Mit főzzek ma?');
	myScroll = new iScroll('wrapperhome', { hScrollbar: false, vScrollbar: false });
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

}    	

function showReceptLista(){ 
	app_page="receptlista";
	hideMenu();
	$('#home').css('left', -1*canvasW+ 'px');
	$('#receptlista').css('left',0+ 'px');
	$('#receptoldal').css('left',canvasW+ 'px');
	$("#cim").html(receptListaTitle);
	myScroll.destroy();
	myScroll = null;
	setTimeout(function () {
	myScroll = new iScroll('wrapperreceptlista', { hScrollbar: false, vScrollbar: false });
	}, 300);


}


function showRecept(){
hideMenu();
	app_page="recept";
	//	$('#home').css('left', -1*canvasW+ 'px')
	$('#receptlista').css('left', -1*canvasW+ 'px');
	$('#receptoldal').css('left',0+ 'px');
	$('.roundedimageBig').css('height', canvasW);
	setReceptPanel();
	myScroll.destroy();	
	myScroll = null;
	setTimeout(function () {
	myScroll = new iScroll('wrapperrecept', { hScrollbar: false, vScrollbar: false });
	}, 300);

}

 
function showStilusvalasztas() {
	hideMenu();
	//bottom_page=app_page;
	app_page="stilus";
	
	$('#stilusvalasztas').show();
	/*myStilusScroll.destroy();
	myStilusScroll = null;*/
	myStilusScroll = new iScroll('wrapperstilus', {
		snap: 'li',
		momentum: false,
		hScrollbar: false,
		vScrollbar: false
	 });
	
	}

function hideStilus() {
	$('#stilusvalasztas').hide();
	} 

function showRolunk() {
	//bottom_page=app_page;
	app_page="rolunk";
	hideMenu();
	$('#rolunk').show();
	}
	
function hideRolunk() {
	$('#rolunk').hide();
	}	

function showHelp() {
	//bottom_page=app_page;
	app_page="help";
	hideMenu();

	var helpScroll = new iScroll('wrapperhelp', { hScrollbar: false, vScrollbar: false });
	$('#help').show();
	}
	
function hideHelp()	 {
	$('#help').hide();
	}
	
function showMenu() {
	bottom_page=app_page;
	app_page="menu";
	  var navmenu = $('navmenu');
	 var foot= $('#footer1');  
    if(!navmenu.hasClass('active')) {
		foot.css('display', 'block')
		navmenu.css('top', '0px');
        navmenu.addClass('active');
    } else {
		//foot.css('display', 'none')
       navmenu.removeClass('active');
	  // navmenu.css('top', menutoptop);
       navmenu.css('top', '120px');
    }
}

function hideMenu() {
 var navmenu = $('navmenu');
	 var foot= $('#footer1');
	//foot.css('display', 'none')
     navmenu.removeClass('active');
	// navmenu.css('top', menutoptop );
	 navmenu.css('top', '120px');

setTimeout(function(foot){
	var foot= $('#footer1');
			foot.hide();
		}, 500);
}

//<!-- ----------------------------------------------------------------------------- -->

function getRecepts(varCat,handler){ 	
   $.ajax({type: GET, dataType: XML, url: RECEPT_URI, success: handler});  
   return false;  
} 

//<!-- ------------------------L O A D K A T E G O R I A K ------------------------------------- -->   
function LoadCimek(xml){ 

$('#scrollerhome').html(homeDiv);
var kategorialistaHtml="";
$(xml).find('kategoria').each(function(katid){
	var kateg = $(this).attr('title');
	kategorialistaHtml+='<a href="#" listaid=' + katid +'><li>' + kateg + '</li></a>';	
  });
$('#kategorialista').html(kategorialistaHtml);
   $("#cim").html('Mit főzzek ma?');
	
   $("#kategorialista").delegate("a","click",function(){
	  LoadReceptek($(this).attr('listaid'), xml);
  }); 
	setTimeout(function(){
	setBG(currbg);
	showHome();		
	}, 1000);

mitfozzekma.addBackup( (new XMLSerializer()).serializeToString(xml) );

}   
//<!-- -------------------- L O A D R E C E P T L I S T A ----------------------------- -->
 
function LoadReceptek(listaid, xml){ 
var thisxml= $(xml).find('kategoria')[listaid];
receptListaTitle= $(thisxml).attr('title');

$("#cim").html(receptListaTitle);

$('#scrollerreceptlista').html(receptListaDiv);

 var receptekHtml ='';
		$(thisxml).find('recept').each(function(rid){	
			var recept = $(this).attr('title');
			var receptid = $(this).attr('id');	
			var receptem= '"recept' + receptid + '"';
			var receptimage = $(this).find('image').attr('src');
			receptekHtml += '<a href="#" receptid=' + receptid + ' rid=' + rid + ' listaid=' + listaid +'><li><img class="kiskep" src="' + receptimage + '">' + recept+ '</li></a>';						
		});		
		
receptekHtml +='<li><br/><br/></li>';	

$('#ul-receptlista').html(receptekHtml);

$("#ul-receptlista").delegate("a","click",function(){
	  LoadRecept($(this).attr('listaid'), $(this).attr('rid'), $(this).attr('receptid'), xml);
  });
  
setListaPanel();
setTimeout(showReceptLista, 300);

}

//<!-- ---------------------------- L O A D R E C E P T---------------------------------- -->
function LoadRecept(listaid, rid, receptid, xml){ ;

	var tempxml= $(xml).find('kategoria')[listaid];

	var receptxml= $(tempxml).find('recept')[rid];

// KEDVENC ikon

	$('#receptoldal').append(favDiv);
	mitfozzekma.checkKedvenc(receptid);
	$("navfav").undelegate("a", "click");
	$("navfav").delegate("a","click",function(){
		mitfozzekma.addFav( (new XMLSerializer().serializeToString(receptxml) ), receptid);	 
	});

	if (canvasW<320) {
	$(".favbutton").addClass('low');
	} else {
	$(".favbutton").removeClass('low');
	}

	var receptimage= $(receptxml).find('image').attr('src');
	var thistitle= $(receptxml).attr('title');
	$('#scrollerrecept').html(receptDiv);
	var receptsub= $(receptxml).find('subtitle').text();
	var receptHTML ='';
	receptHTML+= '<image class="roundedimageBig" src="' + receptimage + '"/>' + '<br>' + receptsub;


	$(receptxml).find('hozzavalok').each(function(){
	 	var hozzavaloxml= $(this);
	 
		receptHTML+='<br><span class="hozzavalocim">' + hozzavaloxml.attr('title') + '</span><ul class="hozzavalo">' ;
	
		$(hozzavaloxml).find('hozzavalo').each(function(){	
			var hozzavalo = $(this).text();
			var mennyiseg=$(this).attr('mennyiseg');
			var egyseg=$(this).attr('egyseg');	
			if (mennyiseg==undefined) {mennyiseg=""};
			if (egyseg==undefined) {egyseg=""};
			receptHTML+= '<li>' + mennyiseg +' ' + egyseg +' '+ hozzavalo + '</li>';		
		});	
		
		receptHTML+='</ul>';
	 });			
		


		receptHTML+= '</ul><p class="receptlepes">';
		$(receptxml).find('lepes').each(function(){	
			var lepes = $(this).text();	
			receptHTML+= '<br>' + lepes +  '<br/>';		
		});	

	receptHTML+= '</p><br /><br />';
	$('#ul-recept').html(receptHTML);
	$("#cim").html(thistitle);

	
	setTimeout(showRecept, 300);

};
	
	
function init() {

	canvasW=window.innerWidth;
	canvasH=window.innerHeight;
	/*
	canvasW=screen.width;
	canvasH=screen.height;
	
	alert('innerW: ' + window.innerWidth + '   screenW: ' + screen.width);*/

	$('#home').css('left', canvasW+ 'px');
	$('#home').css('left', -1*canvasW+ 'px');
	$('#receptlista').css('left',canvasW +'px');
	$('#receptoldal').css('left',canvasW +'px');
	$('#page').css('height', canvasH + 'px')
	$('#page').css('width',   canvasW + 'px');	
	$('#footer1').css('display', 'none')
	var kiskepsize=Math.floor((canvasH-36)/6);	
	$('#ul-receptlista li').css('min-height', kiskepsize + 'px');
	$('.kiskep').css('width', kiskepsize + 'px');	
	$('.kiskep').css('height', kiskepsize + 'px');
	showSplash();

// böngészőben teszteléshez //
//	initDB();
//	getRecepts('0',LoadCimek);

document.addEventListener("deviceready", onDeviceReady, false);

}


$(document).ready(function () { 
	
//setTimeout(init, 200);
init();

}); 

//  S T Y L E C S E R E 

//init


var bglist=['bg_kockas.png','bg_almas.png','bg_kert.png','bg_cseresznye.png','bg_epres.png','bg_lime-green.jpg','bg_paradicsom.jpg','bg_zoldsegek.jpg'];

var buttonlist=new Array();
	var button1= "rgba(113,141,55,1)"; 
	var button2= "-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(113,141,55,0.7)), color-stop(100%,rgba(78,96,38,0.8)))";
	var button3= "-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(113,141,55,0.9)), color-stop(100%,rgba(78,96,38,0.98)))";
	var button4= "-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(211,53,26,0.9)), color-stop(100%,rgba(155,26,26,0.99)))";
	var button5= "-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(113,141,55,0.8)), color-stop(100%,rgba(78,96,38,0.98)))";
	/*var button6= "transparent url(images/csikos_zold.jpg) repeat 0 0 fixed";  ez jelly bean alatt rossz*/
	var button6= "-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(113,141,55,0.9)), color-stop(100%,rgba(78,96,38,0.98)))";

	var button7= "-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(113,141,55,0.8)), color-stop(100%,rgba(78,96,38,0.9)))";
	var button8= "-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(113,141,55,0.9)), color-stop(100%,rgba(78,96,38,0.98)))";
	buttonlist.push(button1);
	buttonlist.push(button2);
	buttonlist.push(button3);
	buttonlist.push(button4);
	buttonlist.push(button5);
	buttonlist.push(button6);
	buttonlist.push(button7);
	buttonlist.push(button8);


	var panellist=new Array();
	var panel1= "rgba(113,141,55,1)"; 
	var panel2= "-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(113,141,55,1)), color-stop(100%,rgba(78,96,38,1)))";
	var panel3= "-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(113,141,55,1)), color-stop(100%,rgba(78,96,38,1)))";
	var panel4= "-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(211,53,26,1)), color-stop(100%,rgba(155,26,26,1)))";
	var panel5= "-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(113,141,55,1)), color-stop(100%,rgba(78,96,38,1)))";

	/*var panel6= "transparent url(images/csikos_zold.jpg) repeat 0 0 fixed";*/
	var panel6= "-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(113,141,55,1)), color-stop(100%,rgba(78,96,38,1)))";


	var panel7= "-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(113,141,55,1)), color-stop(100%,rgba(78,96,38,1)))";
	var panel8= "-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(113,141,55,1)), color-stop(100%,rgba(78,96,38,1)))";
	panellist.push(panel1);
	panellist.push(panel2);
	panellist.push(panel3);
	panellist.push(panel4);
	panellist.push(panel5);
	panellist.push(panel6);
	panellist.push(panel7);
	panellist.push(panel8);


	
function setBG (cbg){

	currbg=cbg;
	if(currbg=='null' || currbg==null || currbg==undefined || currbg=='undefined') {currbg=0};
	var bodybg=$('body');	
	var katlistli=$('#kategorialista li');
	var receptlist_li_bg=$('#ul-receptlista li');
	var receptbg=$('#ul-recept');
	var hd= $('#header');
	
	
/*	var bg='transparent url(images/' + bglist[currbg] + ') repeat 0 0 fixed';
	 //ha az első 5 elem tapéta, a többi elem háttérkép!
	if (6<=currbg) { 
		bodybg.css('-webkit-background-size', 'cover');
		if (canvasW<320) {
			var bg='transparent url(images/l/' + bglist[currbg] + ') repeat 0 0 fixed';
		} else if (canvasW<480) {
			var bg='transparent url(images/m/' + bglist[currbg] + ') repeat 0 0 fixed';
		}	
	} else { 
		bodybg.css('-webkit-background-size', 'auto'); 
	}*/

	var bg='transparent url(images/' + bglist[currbg] + ')';
	 //ha az első 5 elem tapéta, a többi elem háttérkép!
	if (6<=currbg) { 
		/*bodybg.css('-webkit-background-size', 'cover');*/
		if (canvasW<320) {
			var bg='transparent url(images/l/' + bglist[currbg] + ')';
		} else if (canvasW<480) {
			var bg='transparent url(images/m/' + bglist[currbg] + ')';
		}	
	} else { 
		bodybg.css('-webkit-background-size', 'auto'); 
	}


	
	bodybg.css('background',bg);	
	hd.css('background',panellist[currbg]);
	katlistli.css('background',buttonlist[currbg]);
	receptlist_li_bg.css('background',panellist[currbg]);
	receptbg.css('background',panellist[currbg]);

	
	hideStilus();
	window.localStorage.setItem('stilus', currbg);	

}

function setListaPanel() {
		var receptlist_li_bg=$('#ul-receptlista li');
		receptlist_li_bg.css('background',panellist[currbg]);
	}

function setReceptPanel() {
		var receptbg=$('#ul-recept');
		receptbg.css('background',panellist[currbg]);
	}










  
var mitfozzekma = {};
mitfozzekma.db = null; 

      function initDB() {	 
        mitfozzekma.open();
		mitfozzekma.createTable();
      }

   
  	mitfozzekma.open = function() {	  
        var dbSize = 10 * 1024 * 1024; // 10MB
        mitfozzekma.db = openDatabase("MitFozzekMa", "1.0", "Mit főzzek ma adatbázis", dbSize);		
      }

     mitfozzekma.createTable = function() {
     var db = mitfozzekma.db;
	db.transaction(function(tx) {	
	tx.executeSql("CREATE TABLE IF NOT EXISTS backup(ID INTEGER PRIMARY KEY ASC, backupXML TEXT, added_on DATETIME)", []);
        },
              mitfozzekma.onSuccess,
              mitfozzekma.onError);
		
	db.transaction(function(tx) {
	tx.executeSql("CREATE TABLE IF NOT EXISTS kedvencek(ID INTEGER PRIMARY KEY ASC, kedvencXML TEXT, kedvencID TEXT, added_on DATETIME)", [],
              mitfozzekma.onSuccess,
              mitfozzekma.onError);
        });	
		
      }
      

      
	   mitfozzekma.addBackup = function(backupText) {
		  // alert("addbackup")
        var db = mitfozzekma.db;
		clearBackup();
        db.transaction(function(tx){		
          var addedOn = new Date(); 
		  tx.executeSql("INSERT INTO backup (backupXML, added_on) VALUES (?,?)",
              [backupText, addedOn],
              mitfozzekma.onSuccess,
              mitfozzekma.onError);
         }); 
      } 

   	  
	  function clearBackup() {
		var db = mitfozzekma.db;
        db.transaction(function(tx) {
        tx.executeSql("DELETE FROM backup"); //mert a truncate nem akar működni
        });
      }	

	  mitfozzekma.loadBAckup = function() { 
        var db = mitfozzekma.db;
        db.transaction(function(tx) {
          tx.executeSql("SELECT * FROM backup", [], loadbackupXML,
              mitfozzekma.onError);
        });
      }
	
	  function loadbackupXML (tx, rs) {
	   xml= $.parseXML( rs.rows.item(0).backupXML );
	   LoadCimek(xml);
      }
	
	    
      mitfozzekma.onError = function(tx, e) {
      //  alert(" error: " + e.message);
      }
      
      mitfozzekma.onSuccess = function(tx, r) {
        //
      }
   
  
 // ------------------------------------------------------------//    
  
	  mitfozzekma.addFav = function(kedvencXML, kedvencID) {
		  
		  var fbutt= $(".favbutton") ;
		  var db = mitfozzekma.db;
		  	  
		  if(!fbutt.hasClass('active')) { //delete

			nemkedvenc();

			//var bg='transparent url(images/icon_heart_plusz.png)';
			//fbutt.css('background', bg);
			//fbutt.addClass('active'); 		
			
			db.transaction(function(tx){
         	  tx.executeSql("DELETE FROM kedvencek WHERE kedvencID=?", [kedvencID],
              mitfozzekma.onSuccess,
              mitfozzekma.onError);
			});
					
			} else { //add
			
			igenkedvenc();
			//var bg='transparent url(images/icon_heart_minusz.png)';
			//fbutt.css('background', bg);  
			// fbutt.removeClass('active'); 
			 
       		 db.transaction(function(tx){
        	  var addedOn = new Date();
		 	  tx.executeSql("INSERT INTO kedvencek (kedvencXML, kedvencID, added_on) VALUES (?,?,?)",
              [kedvencXML, kedvencID, addedOn],
              mitfozzekma.onSuccess,
              mitfozzekma.onError);
			}); 
		}		 
     } 
	   
var deletefavID=null;

function onConfirmDelete(button) {
	
		if (button==1) {
		 mitfozzekma.deleteFavorit(deletefavID);
		} else {/* nothing */}	
    }


	 mitfozzekma.deleteFav = function(kedvencID) {
		 deletefavID=kedvencID
		 mitfozzekma.deleteFavorit(deletefavID);	  
	/*		
		navigator.notification.confirm(
            'Valóban törlöd?',  // message
            onConfirmDelete,      // callback to invoke with index of button pressed
            'Törlés',            // title
            'Igen,Nem'          // buttonLabels
        );	
	*/		
	}
	



	 mitfozzekma.deleteFavorit = function(kedvencID) {
			
			var db = mitfozzekma.db;
			db.transaction(function(tx){
         	 tx.executeSql("DELETE FROM kedvencek WHERE kedvencID=?", [kedvencID.toString()],
              mitfozzekma.getFav,
              mitfozzekma.onError);
			});
      }
	  
		function clearFavs() {
		var db = mitfozzekma.db;
        db.transaction(function(tx) {
        tx.executeSql("DELETE FROM kedvencek"); //mert a truncate nem akar működni
        });
      }
	 

      mitfozzekma.getFav = function() {
		hideMenu();
        var db = mitfozzekma.db;
        db.transaction(function(tx) {
          tx.executeSql("SELECT * FROM kedvencek", [], loadFav,
              mitfozzekma.onError);
        });
      }




mitfozzekma.checkKedvenc=function (receptid){
	
var checkKedvencEredmeny = null;	
      var db = mitfozzekma.db;
	 
        db.transaction(function(tx) {
          tx.executeSql("SELECT * FROM kedvencek WHERE kedvencID=?", [receptid], 
			  function(tx, rs) { 
			  if ( rs.rows.length>0 ) { 
				 igenkedvenc() 
				  } else { 
				nemkedvenc()
				}},
              null);
        });	
}


function nemkedvenc() {
	var fbutt= $(".favbutton") ;
	fbutt.addClass('active'); 
	if (fbutt.hasClass('low'))
	{
		var bg='transparent url(images/icon_heart_plusz_l.png)';
	} else {
		var bg='transparent url(images/icon_heart_plusz.png)';
	}
	fbutt.css('background', bg);
}	

function igenkedvenc() {
	var fbutt= $(".favbutton");
	fbutt.removeClass('active');   
	if (fbutt.hasClass('low'))
	{
		var bg='transparent url(images/icon_heart_minusz_l.png)';
	} else {
		var bg='transparent url(images/icon_heart_minusz.png)';
	}
	fbutt.css('background', bg);
}



   function loadFav(tx, rs) {
        var receptekHtml ='';
       $('#scrollerreceptlista').html(receptListaDiv);
		for (var i=0; i < rs.rows.length; i++) {
			var FavXml=  rs.rows.item(i).kedvencXML ;
            receptekHtml += renderreceptek( FavXml, rs.rows.item(i).kedvencID );
        }

		receptekHtml+='<li><br/><br/></li>';

	$('#ul-receptlista').html(receptekHtml);
	$("#cim").html("Kedvencek");

	$("#ul-receptlista").delegate("a","click",function(){
	  mitfozzekma.LoadFavRecept($(this).attr('receptid'));
	 });   
	setListaPanel();
	showReceptLista();

  }
      
var FavId;

	mitfozzekma.LoadFavRecept= function(receptid){
		  var db = mitfozzekma.db;
		  FavId=receptid;
		db.transaction(function(tx) {
          tx.executeSql("SELECT * FROM kedvencek WHERE kedvencID=?", [receptid], 
			  renderFavRecept,
              null);
        });	
	}




function renderFavRecept(tx, rs) {
	receptxml= $.parseXML( rs.rows.item(0).kedvencXML );
	  

// KEDVENC ikon
$('#receptoldal').append(favDiv);

igenkedvenc();
$("navfav").undelegate("a", "click");
$("navfav").delegate("a","click",function(){
	mitfozzekma.deleteFavorit(FavId);

	/*mitfozzekma.addFav( (new XMLSerializer().serializeToString(receptxml) ), FavId);*/ 
});


var receptimage= $(receptxml).find('image').attr('src');

var thistitle= $(receptxml).find('recept').attr('title');

$('#scrollerrecept').html(receptDiv);
var receptsub= $(receptxml).find('subtitle').text();
var receptHTML ='';
receptHTML+= '<image class="roundedimageBig" src="' + receptimage + '"/>' + '<br>' + receptsub;
 receptHTML+='<span class="hozzavalocim">Hozzávalók:</span><ul class="hozzavalo">'
		$(receptxml).find('hozzavalo').each(function(){	
			var hozzavalo = $(this).text();
			var mennyiseg=$(this).attr('mennyiseg');
			var egyseg=$(this).attr('egyseg');	
			
			if (mennyiseg==undefined) {mennyiseg=""};
			if (egyseg==undefined) {egyseg=""};
			
			receptHTML+= '<li>' + mennyiseg +' ' + egyseg +' '+ hozzavalo + '</li>';		
		});	
		receptHTML+= '</ul><p class="receptlepes">';
		$(receptxml).find('lepes').each(function(){	
			var lepes = $(this).text();	
			receptHTML+= '<br>' + lepes +  '<br/>';		
		});	
		receptHTML+= '</p><br /><br />';
$('#ul-recept').html(receptHTML);
$("#cim").html(thistitle);

$('.roundedimageBig').css('width', canvasW);

showRecept();

}

      function renderreceptek(row, id) {

		  var recept=$(row).attr('title');
		  var receptid=id;
		  var receptimage=$(row).find('img').attr('src');
	
    //   return "<li><img class='kiskep' src="+ $(row).find('img').attr('src') + '>' + $(row).attr('title')  + " [<a href='javascript:void(0);'  onclick='mitfozzekma.deleteFav(" + id +");'>X</a>]</li>";
		
	return  '<a href="#" receptid=' + receptid + '><li><img class="kiskep" src="' + receptimage + '">' + recept + '</li> </a>' + '<div class="receptlistakedvencgomb"><a href="javascript:void(0);"  onclick="mitfozzekma.deleteFav(' + id +');"> <img src="images/icon_heart_minusz.png" /> </a></div>';	


      }
	  
      
      function initDB() {
	/*	  
	 dropTable("receptek")
		dropTable("kedvencek")*/	 
        mitfozzekma.open();
		mitfozzekma.createTable();
      /*
        mitfozzekma.getAllreceptekItems(loadreceptekItems);*/
      }



// Wait for PhoneGap to load
    // 
  //  document.addEventListener("deviceready", onDeviceReady, false);
    // PhoneGap is loaded and it is now safe to make calls PhoneGap methods
    //
    function onDeviceReady() {
		
	/**/
   
	initDB();

	currbg= window.localStorage.getItem('stilus');
	if(currbg=='null' || currbg==null || currbg==undefined || currbg=='undefined') {currbg=0};
	// setBG(currbg); 
	
        checkConnection();
		document.addEventListener("online", onOnline, false);
		document.addEventListener("backbutton", onBackKeyDown, false);
		document.addEventListener("menubutton", onMenuKeyDown, false);
    }
	//  Handle the online event //
function onOnline() {
	//  //
    }	

// Handle the back button //
    function onBackKeyDown() {
	
		switch (app_page) {
		
		case "recept": showReceptLista();	
		break;
		
		case "receptlista": showHome();	
		break;
		
		case "stilus": hideStilus();
		app_page=bottom_page;
		break;		
		
		case "help": hideHelp();
		app_page=bottom_page;
		break;	

		case "rolunk": hideRolunk();
		app_page=bottom_page;
		break;		
		
		case "menu": hideMenu();
		app_page=bottom_page;
		break;			
			
		default:
				
		navigator.notification.confirm(
            'Valóban kilépsz?',  // message
            onConfirm,              // callback to invoke with index of button pressed
            'Kilépés',            // title
            'Igen,Nem'          // buttonLabels
        );	
		
		}
    }
		
function onConfirm(button) {
		if (button==1) {
		navigator.app.exitApp();
		} else {/* nothing */}	
    }


    // Handle the menu button//
function onMenuKeyDown() { showMenu(); }
	

    function checkConnection() {

        var networkState = navigator.network.connection.type;
        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.NONE]     = 'No network connection';
				
		if(states[networkState]==states[Connection.NONE] || states[networkState]=="undefined" || states[networkState]==states[Connection.UNDEFINED] ){
			// NINCS NET //		
       noNetwork(); 
  		  } else {
			// VAN NET		
		getRecepts('0',LoadCimek);
      
   		 }
	
 }		

function noNetwork(){
	mitfozzekma.loadBAckup(loadbackupXML);
	alert('Nincs internetkapcsolat!');
	}

// END PHONEGAP SCRIPTS  
