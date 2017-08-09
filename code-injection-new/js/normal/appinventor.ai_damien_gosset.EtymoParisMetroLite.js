




$(document).ready(function() {
	// disable ajax nav
	$.mobile.ajaxLinksEnabled = false;	
});
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

 	 
		$(document).ready(function() {
			var json_toload = '';
			var line 	= getUrlVars()["Ligne"];
			var theme 	= getUrlVars()["Theme"];
			var tag 	= getUrlVars()["tag"];		
			var id 		= getUrlVars()["Station"];				
			if (line) {
				json_toload = 'data/ligne_'+line+'.json';
			}
			else if (theme) {
				json_toload = 'data/theme_'+theme+'.json';
			}
			else if (tag) {
				json_toload = 'data/'+tag+'.json';
			}		
			$.getJSON(json_toload, function(data) {
			   var station 	= data[id].St;
			   var history 	= data[id].Hi;
			   var date 	= data[id].Da;
			   var city 	= data[id].Ci;
			   var country 	= data[id].Co;
			   var adresseGmaps = 'métro '+station+', '+city+', '+country;
			   var localisation = city+', '+country;
			   var urlGmaps='http://maps.google.fr/maps?q='+adresseGmaps+'&hl=fr&ie=UTF8&z=18'
			   var category = data[id].Ca;
			   if (data[id].Li){
			   		$.each(data[id].Li, function(rowIndex, row){						
						var idIcon = '#iconLine'+rowIndex;
						$(idIcon).attr('src','images/icone_ligne_'+row+'.png');
						var linkIcon = '#linkLine'+rowIndex;
						if (row=='03b' || row=='07b' || row=='10' || row=='11' || row=='14') $(linkIcon).attr('href','pages-listviews/ligne'+row+'.html');
						else {
							$(linkIcon).attr({
									'href' :'upgrade.html',
									'data-rel' : 'dialog',
									'data-transition' : 'slidedown'
							});							
						}
					});
			   }			  
			  //$('#back').attr('href','ligne'+line+'.html'); 
			   
			   $('#stationName').html(station);
			   $('#stationHistory').html(history);
			   $('#stationDate').html(date);
			   $('#stationLocalisation').html(localisation);
			   $('#buttonMap').attr('href',urlGmaps);
			   $('#share').attr('href','mailto:?subject=Station '+ station +' - EtymoParisMetro&body='+history+' - Envoyé depuis l\'application EtymoParisMetro');
			   $('#stationCategory').html(category);
			   
			});	
			
		});			
		
			
		






 $(document).ready(function() {
  // disable ajax nav
  $.mobile.ajaxLinksEnabled = false;
 });





 $(document).ready(function() {
  // disable ajax nav
  $.mobile.ajaxLinksEnabled = false;
 });





 $(document).ready(function() {
  // disable ajax nav
  //$.mobile.ajaxLinksEnabled = false;
  
  $('#close').click(function(){
	  $('.ui-dialog').dialog('close');
  })
  
 });





	$(document).ready(function() {
		$("#pageLigne14").hide(); //on cache le contenu
		$("body").append('<div id="wait"><h1>Chargement des stations...</h1></div>')
		// disable ajax nav
		$.mobile.ajaxLinksEnabled = false;
	});
	$(window).load(function(){
		$("#wait").fadeOut();
		$("#pageLigne14").fadeIn();
	});

			   		
			$.getJSON('../data/ligne_14.json', function(data) {
			   $.each(data, function(entryIndex, entry){
					$('<li data-icon="false"><a href="../station.html?Ligne=14&Station=' + entryIndex + '" data-ajax="false"><h3>' + entry['St'] + '</h3><p>' + entry['Ci'] + ', ' + entry['Co'] + '</p></a></li>').appendTo($('#ligne14'));
			  }); 
			  $('#ligne14').listview('refresh');
			});			
			//$.mobile.page('refresh');
        




	$(document).ready(function() {
		$("#pageLigne06").hide(); //on cache le contenu
		$("body").append('<div id="wait"><h1>Chargement des stations...</h1></div>')
		// disable ajax nav
		$.mobile.ajaxLinksEnabled = false;
	});
	$(window).load(function(){
		$("#wait").fadeOut();
		$("#pageLigne06").fadeIn();
	});

			   		
			$.getJSON('../data/ligne_06.json', function(data) {
			   $.each(data, function(entryIndex, entry){
					$('<li data-icon="false"><a href="../station.html?Ligne=06&Station=' + entryIndex + '" data-ajax="false"><h3>' + entry['St'] + '</h3><p>' + entry['Ci'] + ', ' + entry['Co'] + '</p></a></li>').appendTo($('#ligne06'));
			  }); 
			  $('#ligne06').listview('refresh');
			});			
			//$.mobile.page('refresh');
        




	$(document).ready(function() {
		$("#pageLigne01").hide(); //on cache le contenu
		$("body").append('<div id="wait"><h1>Chargement des stations...</h1></div>')
		// disable ajax nav
		$.mobile.ajaxLinksEnabled = false;
	});
	$(window).load(function(){
		$("#wait").fadeOut();
		$("#pageLigne01").fadeIn();
	});

			   		
			$.getJSON('../data/ligne_01.json', function(data) {
			   $.each(data, function(entryIndex, entry){
					$('<li data-icon="false"><a href="../station.html?Ligne=01&Station=' + entryIndex + '" data-ajax="false"><h3>' + entry['St'] + '</h3><p>' + entry['Ci'] + ', ' + entry['Co'] + '</p></a></li>').appendTo($('#ligne01'));
			  }); 
			  $('#ligne01').listview('refresh');
			});			
			//$.mobile.page('refresh');
        




	$(document).ready(function() {
		$("#pageLigneEdifice").hide(); //on cache le contenu
		$("body").append('<div id="wait"><h1>Chargement des stations...</h1></div>')
		// disable ajax nav
		$.mobile.ajaxLinksEnabled = false;
	});
	$(window).load(function(){
		$("#wait").fadeOut();
		$("#pageLigneEdifice").fadeIn();
	});

			   		
			$.getJSON('../data/theme_Edifice.json', function(data) {
			   $.each(data, function(entryIndex, entry){
					$('<li data-icon="false"><a href="../station.html?Theme=Edifice&Station=' + entryIndex + '" data-ajax="false"><h3>' + entry['St'] + '</h3><p>' + entry['Ci'] + ', ' + entry['Co'] + '</p></a></li>').appendTo($('#ligneEdifice'));
			  }); 
			  $('#ligneEdifice').listview('refresh');
			});			
			//$.mobile.page('refresh');
        




	$(document).ready(function() {
		$("#pageLigne12").hide(); //on cache le contenu
		$("body").append('<div id="wait"><h1>Chargement des stations...</h1></div>')
		// disable ajax nav
		$.mobile.ajaxLinksEnabled = false;
	});
	$(window).load(function(){
		$("#wait").fadeOut();
		$("#pageLigne12").fadeIn();
	});

			   		
			$.getJSON('../data/ligne_12.json', function(data) {
			   $.each(data, function(entryIndex, entry){
					$('<li data-icon="false"><a href="../station.html?Ligne=12&Station=' + entryIndex + '" data-ajax="false"><h3>' + entry['St'] + '</h3><p>' + entry['Ci'] + ', ' + entry['Co'] + '</p></a></li>').appendTo($('#ligne12'));
			  }); 
			  $('#ligne12').listview('refresh');
			});			
			//$.mobile.page('refresh');
        




	$(document).ready(function() {
		$("#pageLigne04").hide(); //on cache le contenu
		$("body").append('<div id="wait"><h1>Chargement des stations...</h1></div>')
		// disable ajax nav
		$.mobile.ajaxLinksEnabled = false;
	});
	$(window).load(function(){
		$("#wait").fadeOut();
		$("#pageLigne04").fadeIn();
	});

			   		
			$.getJSON('../data/ligne_04.json', function(data) {
			   $.each(data, function(entryIndex, entry){
					$('<li data-icon="false"><a href="../station.html?Ligne=04&Station=' + entryIndex + '" data-ajax="false"><h3>' + entry['St'] + '</h3><p>' + entry['Ci'] + ', ' + entry['Co'] + '</p></a></li>').appendTo($('#ligne04'));
			  }); 
			  $('#ligne04').listview('refresh');
			});			
			//$.mobile.page('refresh');
        




	$(document).ready(function() {
		$("#pageLigneAll").hide(); //on cache le contenu
		$("body").append('<div id="wait"><h1>Chargement des stations...</h1></div>')
		// disable ajax nav
		$.mobile.ajaxLinksEnabled = false;
	});
	$(window).load(function(){
		$("#wait").fadeOut();
		$("#pageLigneAll").fadeIn();
	});

			   		
			//$.getJSON('../data/All.json', function(data) {
			$.getJSON('../data/All_Lines.json', function(data) {
			   $.each(data, function(entryIndex, entry){
					//$('<li data-icon="false"><a href="../station.html?tag=All&Station=' + entryIndex + '" data-ajax="false"><h3>' + entry['Station'] + '</h3><p>' + entry['City'] + ', ' + entry['Country'] + '</p></a></li>').appendTo($('#ligneAll'));
				   $('<li data-icon="false"><a href="../station.html?tag=All&Station=' + entryIndex + '" data-ajax="false"><h3>' + entry['St'] + '</h3><p>' + entry['Ci'] + ', ' + entry['Co'] + '</p></a></li>').appendTo($('#ligneAll'));
			  }); 
			  $('#ligneAll').listview('refresh');
			});			
			//$.mobile.page('refresh');
        




	$(document).ready(function() {
		$("#pageLigne08").hide(); //on cache le contenu
		$("body").append('<div id="wait"><h1>Chargement des stations...</h1></div>')
		// disable ajax nav
		$.mobile.ajaxLinksEnabled = false;
	});
	$(window).load(function(){
		$("#wait").fadeOut();
		$("#pageLigne08").fadeIn();
	});

			   		
			$.getJSON('../data/ligne_08.json', function(data) {
			   $.each(data, function(entryIndex, entry){
					$('<li data-icon="false"><a href="../station.html?Ligne=08&Station=' + entryIndex + '" data-ajax="false"><h3>' + entry['St'] + '</h3><p>' + entry['Ci'] + ', ' + entry['Co'] + '</p></a></li>').appendTo($('#ligne08'));
			  }); 
			  $('#ligne08').listview('refresh');
			});			
			//$.mobile.page('refresh');
        




	$(document).ready(function() {
		$("#pageLigne10").hide(); //on cache le contenu
		$("body").append('<div id="wait"><h1>Chargement des stations...</h1></div>')
		// disable ajax nav
		$.mobile.ajaxLinksEnabled = false;
	});
	$(window).load(function(){
		$("#wait").fadeOut();
		$("#pageLigne10").fadeIn();
	});

			   		
			$.getJSON('../data/ligne_10.json', function(data) {
			   $.each(data, function(entryIndex, entry){
					$('<li data-icon="false"><a href="../station.html?Ligne=10&Station=' + entryIndex + '" data-ajax="false"><h3>' + entry['St'] + '</h3><p>' + entry['Ci'] + ', ' + entry['Co'] + '</p></a></li>').appendTo($('#ligne10'));
			  }); 
			  $('#ligne10').listview('refresh');
			});			
			//$.mobile.page('refresh');
        




	$(document).ready(function() {
		$("#pageLigne07b").hide(); //on cache le contenu
		$("body").append('<div id="wait"><h1>Chargement des stations...</h1></div>')
		// disable ajax nav
		$.mobile.ajaxLinksEnabled = false;
	});
	$(window).load(function(){
		$("#wait").fadeOut();
		$("#pageLigne07b").fadeIn();
	});

			   		
			$.getJSON('../data/ligne_07b.json', function(data) {
			   $.each(data, function(entryIndex, entry){
					$('<li data-icon="false"><a href="../station.html?Ligne=07b&Station=' + entryIndex + '" data-ajax="false"><h3>' + entry['St'] + '</h3><p>' + entry['Ci'] + ', ' + entry['Co'] + '</p></a></li>').appendTo($('#ligne07b'));
			  }); 
			  $('#ligne07b').listview('refresh');
			});			
			//$.mobile.page('refresh');
        




	$(document).ready(function() {
		$("#pageLigneBataille").hide(); //on cache le contenu
		$("body").append('<div id="wait"><h1>Chargement des stations...</h1></div>')
		// disable ajax nav
		$.mobile.ajaxLinksEnabled = false;
	});
	$(window).load(function(){
		$("#wait").fadeOut();
		$("#pageLigneBataille").fadeIn();
	});

			   		
			$.getJSON('../data/theme_Bataille.json', function(data) {
			   $.each(data, function(entryIndex, entry){
					$('<li data-icon="false"><a href="../station.html?Theme=Bataille&Station=' + entryIndex + '" data-ajax="false"><h3>' + entry['St'] + '</h3><p>' + entry['Ci'] + ', ' + entry['Co'] + '</p></a></li>').appendTo($('#ligneBataille'));
			  }); 
			  $('#ligneBataille').listview('refresh');
			});			
			//$.mobile.page('refresh');
        




	$(document).ready(function() {
		$("#pageLigne09").hide(); //on cache le contenu
		$("body").append('<div id="wait"><h1>Chargement des stations...</h1></div>')
		// disable ajax nav
		$.mobile.ajaxLinksEnabled = false;
	});
	$(window).load(function(){
		$("#wait").fadeOut();
		$("#pageLigne09").fadeIn();
	});

			   		
			$.getJSON('../data/ligne_09.json', function(data) {
			   $.each(data, function(entryIndex, entry){
					$('<li data-icon="false"><a href="../station.html?Ligne=09&Station=' + entryIndex + '" data-ajax="false"><h3>' + entry['St'] + '</h3><p>' + entry['Ci'] + ', ' + entry['Co'] + '</p></a></li>').appendTo($('#ligne09'));
			  }); 
			  $('#ligne09').listview('refresh');
			});			
			//$.mobile.page('refresh');
        




	$(document).ready(function() {
		$("#pageLignePersonnalite").hide(); //on cache le contenu
		$("body").append('<div id="wait"><h1>Chargement des stations...</h1></div>')
		// disable ajax nav
		$.mobile.ajaxLinksEnabled = false;
	});
	$(window).load(function(){
		$("#wait").fadeOut();
		$("#pageLignePersonnalite").fadeIn();
	});

			   		
			$.getJSON('../data/theme_Personnalite.json', function(data) {
			   $.each(data, function(entryIndex, entry){
					$('<li data-icon="false"><a href="../station.html?Theme=Personnalite&Station=' + entryIndex + '" data-ajax="false"><h3>' + entry['St'] + '</h3><p>' + entry['Ci'] + ', ' + entry['Co'] + '</p></a></li>').appendTo($('#lignePersonnalite'));
			  }); 
			  $('#lignePersonnalite').listview('refresh');
			});			
			//$.mobile.page('refresh');
        




	$(document).ready(function() {
		$("#pageLigne03b").hide(); //on cache le contenu
		$("body").append('<div id="wait"><h1>Chargement des stations...</h1></div>')
		// disable ajax nav
		$.mobile.ajaxLinksEnabled = false;
	});
	$(window).load(function(){
		$("#wait").fadeOut();
		$("#pageLigne03b").fadeIn();
	});

			   		
			$.getJSON('../data/ligne_03b.json', function(data) {
			   $.each(data, function(entryIndex, entry){
					$('<li data-icon="false"><a href="../station.html?Ligne=03b&Station=' + entryIndex + '" data-ajax="false"><h3>' + entry['St'] + '</h3><p>' + entry['Ci'] + ', ' + entry['Co'] + '</p></a></li>').appendTo($('#ligne03b'));
			  }); 
			  $('#ligne03b').listview('refresh');
			});			
			//$.mobile.page('refresh');
        




	$(document).ready(function() {
		$("#pageLigne03").hide(); //on cache le contenu
		$("body").append('<div id="wait"><h1>Chargement des stations...</h1></div>')
		// disable ajax nav
		$.mobile.ajaxLinksEnabled = false;
	});
	$(window).load(function(){
		$("#wait").fadeOut();
		$("#pageLigne03").fadeIn();
	});

			   		
			$.getJSON('../data/ligne_03.json', function(data) {
			   $.each(data, function(entryIndex, entry){
					$('<li data-icon="false"><a href="../station.html?Ligne=03&Station=' + entryIndex + '" data-ajax="false"><h3>' + entry['St'] + '</h3><p>' + entry['Ci'] + ', ' + entry['Co'] + '</p></a></li>').appendTo($('#ligne03'));
			  }); 
			  $('#ligne03').listview('refresh');
			});			
			//$.mobile.page('refresh');
        




	$(document).ready(function() {
		$("#pageLigne05").hide(); //on cache le contenu
		$("body").append('<div id="wait"><h1>Chargement des stations...</h1></div>')
		// disable ajax nav
		$.mobile.ajaxLinksEnabled = false;
	});
	$(window).load(function(){
		$("#wait").fadeOut();
		$("#pageLigne05").fadeIn();
	});

			   		
			$.getJSON('../data/ligne_05.json', function(data) {
			   $.each(data, function(entryIndex, entry){
					$('<li data-icon="false"><a href="../station.html?Ligne=05&Station=' + entryIndex + '" data-ajax="false"><h3>' + entry['St'] + '</h3><p>' + entry['Ci'] + ', ' + entry['Co'] + '</p></a></li>').appendTo($('#ligne05'));
			  }); 
			  $('#ligne05').listview('refresh');
			});			
			//$.mobile.page('refresh');
        




	$(document).ready(function() {
		$("#pageLigne07").hide(); //on cache le contenu
		$("body").append('<div id="wait"><h1>Chargement des stations...</h1></div>')
		// disable ajax nav
		$.mobile.ajaxLinksEnabled = false;
	});
	$(window).load(function(){
		$("#wait").fadeOut();
		$("#pageLigne07").fadeIn();
	});

			   		
			$.getJSON('../data/ligne_07.json', function(data) {
			   $.each(data, function(entryIndex, entry){
					$('<li data-icon="false"><a href="../station.html?Ligne=07&Station=' + entryIndex + '" data-ajax="false"><h3>' + entry['St'] + '</h3><p>' + entry['Ci'] + ', ' + entry['Co'] + '</p></a></li>').appendTo($('#ligne07'));
			  }); 
			  $('#ligne07').listview('refresh');
			});			
			//$.mobile.page('refresh');
        




	$(document).ready(function() {
		$("#pageLigneDivers").hide(); //on cache le contenu
		$("body").append('<div id="wait"><h1>Chargement des stations...</h1></div>')
		// disable ajax nav
		$.mobile.ajaxLinksEnabled = false;
	});
	$(window).load(function(){
		$("#wait").fadeOut();
		$("#pageLigneDivers").fadeIn();
	});

			   		
			$.getJSON('../data/theme_Divers.json', function(data) {
			   $.each(data, function(entryIndex, entry){
					$('<li data-icon="false"><a href="../station.html?Theme=Divers&Station=' + entryIndex + '" data-ajax="false"><h3>' + entry['St'] + '</h3><p>' + entry['Ci'] + ', ' + entry['Co'] + '</p></a></li>').appendTo($('#ligneDivers'));
			  }); 
			  $('#ligneDivers').listview('refresh');
			});			
			//$.mobile.page('refresh');
        




	$(document).ready(function() {
		$("#pageLigne02").hide(); //on cache le contenu
		$("body").append('<div id="wait"><h1>Chargement des stations...</h1></div>')
		// disable ajax nav
		$.mobile.ajaxLinksEnabled = false;
	});
	$(window).load(function(){
		$("#wait").fadeOut();
		$("#pageLigne02").fadeIn();
	});

			   		
			$.getJSON('../data/ligne_02.json', function(data) {
			   $.each(data, function(entryIndex, entry){
					$('<li data-icon="false"><a href="../station.html?Ligne=02&Station=' + entryIndex + '" data-ajax="false"><h3>' + entry['St'] + '</h3><p>' + entry['Ci'] + ', ' + entry['Co'] + '</p></a></li>').appendTo($('#ligne02'));
			  }); 
			  $('#ligne02').listview('refresh');
			});			
			//$.mobile.page('refresh');
        




	$(document).ready(function() {
		$("#pageLigne11").hide(); //on cache le contenu
		$("body").append('<div id="wait"><h1>Chargement des stations...</h1></div>')
		// disable ajax nav
		$.mobile.ajaxLinksEnabled = false;
	});
	$(window).load(function(){
		$("#wait").fadeOut();
		$("#pageLigne11").fadeIn();
	});

			   		
			$.getJSON('../data/ligne_11.json', function(data) {
			   $.each(data, function(entryIndex, entry){
					$('<li data-icon="false"><a href="../station.html?Ligne=11&Station=' + entryIndex + '" data-ajax="false"><h3>' + entry['St'] + '</h3><p>' + entry['Ci'] + ', ' + entry['Co'] + '</p></a></li>').appendTo($('#ligne11'));
			  }); 
			  $('#ligne11').listview('refresh');
			});			
			//$.mobile.page('refresh');
        




	$(document).ready(function() {
		$("#pageLigneLieu").hide(); //on cache le contenu
		$("body").append('<div id="wait"><h1>Chargement des stations...</h1></div>')
		// disable ajax nav
		$.mobile.ajaxLinksEnabled = false;
	});
	$(window).load(function(){
		$("#wait").fadeOut();
		$("#pageLigneLieu").fadeIn();
	});

			   		
			$.getJSON('../data/theme_Lieu.json', function(data) {
			   $.each(data, function(entryIndex, entry){
					$('<li data-icon="false"><a href="../station.html?Theme=Lieu&Station=' + entryIndex + '" data-ajax="false"><h3>' + entry['St'] + '</h3><p>' + entry['Ci'] + ', ' + entry['Co'] + '</p></a></li>').appendTo($('#ligneLieu'));
			  }); 
			  $('#ligneLieu').listview('refresh');
			});			
			//$.mobile.page('refresh');
        




	$(document).ready(function() {
		$("#pageLigne13").hide(); //on cache le contenu
		$("body").append('<div id="wait"><h1>Chargement des stations...</h1></div>')
		// disable ajax nav
		$.mobile.ajaxLinksEnabled = false;
	});
	$(window).load(function(){
		$("#wait").fadeOut();
		$("#pageLigne13").fadeIn();
	});

			   		
			$.getJSON('../data/ligne_13.json', function(data) {
			   $.each(data, function(entryIndex, entry){
					$('<li data-icon="false"><a href="../station.html?Ligne=13&Station=' + entryIndex + '" data-ajax="false"><h3>' + entry['St'] + '</h3><p>' + entry['Ci'] + ', ' + entry['Co'] + '</p></a></li>').appendTo($('#ligne13'));
			  }); 
			  $('#ligne13').listview('refresh');
			});			
			//$.mobile.page('refresh');
        

