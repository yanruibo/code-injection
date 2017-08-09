





$(document).ready(function() {	
	//Json goes here
  $.getJSON('http://www.bloemetjebestellen.mobi/script/output-valentijn.php', function(data) {
	  var items = [];
	  
	  var aantal = 0;
	  	
	  $.each(data, function(key, val) {
	  
	  if(val['tax_class_id'] == 11){var btwperc = 1.06}
	  if(val['tax_class_id'] == 12){var btwperc = 1.21}
	  
		var have = $('#uitput1').html();  	
		var prijstemp = val['price'] * btwperc;
		var prijstemp2 = Math.round(prijstemp*100)/100;
		var prijs = prijstemp2.toFixed(2);
	    $('#uitput1').html(			
			"<a href=\"groter.html?id="+val['product_id']+"\"><article><img src=\"http://www.qualityflorist.nl/image/cache/data/import/"+val['product_id']+"-138x138.jpg\" alt=\""+val['model']+"\"/><h1>"+val['model']+"</h1><h2>&#8364;"+prijs+"</h2></article></a></div>"+have+"<div class=\"menu_spacer\">"		
		);
		
		aantal++;
				
	  });		  
	});	
	
});

	  $('.ajaxloader').hide(); 	  		











$(document).ready(function() {	
	//Json goes here
  $.getJSON('http://www.bloemetjebestellen.mobi/script/output-knuffels.php', function(data) {
	  var items = [];
	  
	  var aantal = 0;
	  	
	  $.each(data, function(key, val) {
	  
	  if(val['tax_class_id'] == 11){var btwperc = 1.06}
	  if(val['tax_class_id'] == 12){var btwperc = 1.21}
	  
		var have = $('#uitput1').html();  	
		var prijstemp = val['price'] * btwperc;
		var prijstemp2 = Math.round(prijstemp*100)/100;
		var prijs = prijstemp2.toFixed(2);
	    $('#uitput1').html(			
			"<a href=\"groter.html?id="+val['product_id']+"\"><article><img src=\"http://www.qualityflorist.nl/image/cache/data/import/"+val['product_id']+"-138x138.jpg\" alt=\""+val['model']+"\"/><h1>"+val['model']+"</h1><h2>&#8364;"+prijs+"</h2></article></a></div>"+have+"<div class=\"menu_spacer\">"		
		);
		
		aantal++;
				
	  });		  
	});	
	
});

	  $('.ajaxloader').hide(); 	  		







$(document).ready(function() {	
	//Json goes here
  $.getJSON('http://www.bloemetjebestellen.mobi/script/output-moederdag.php', function(data) {
	  var items = [];
	  
	  var aantal = 0;
	  	
	  $.each(data, function(key, val) {
	  
	  if(val['tax_class_id'] == 11){var btwperc = 1.06}
	  if(val['tax_class_id'] == 12){var btwperc = 1.21}
	  
		var have = $('#uitput1').html();  	
		var prijstemp = val['price'] * btwperc;
		var prijstemp2 = Math.round(prijstemp*100)/100;
		var prijs = prijstemp2.toFixed(2);
	    $('#uitput1').html(			
			"<a href=\"groter.html?id="+val['product_id']+"\"><article><img src=\"http://www.qualityflorist.nl/image/cache/data/import/"+val['product_id']+"-138x138.jpg\" alt=\""+val['model']+"\"/><h1>"+val['model']+"</h1><h2>&#8364;"+prijs+"</h2></article></a></div>"+have+"<div class=\"menu_spacer\">"		
		);
		
		aantal++;
				
	  });		  
	});	
	
});

	  $('.ajaxloader').hide(); 	  		











$(document).ready(function() {	
	//Json goes here
  $.getJSON('http://www.bloemetjebestellen.mobi/script/output-vaderdag.php', function(data) {
	  var items = [];
	  
	  var aantal = 0;
	  	
	  $.each(data, function(key, val) {
	  
	  if(val['tax_class_id'] == 11){var btwperc = 1.06}
	  if(val['tax_class_id'] == 12){var btwperc = 1.21}
	  
		var have = $('#uitput1').html();  	
		var prijstemp = val['price'] * btwperc;
		var prijstemp2 = Math.round(prijstemp*100)/100;
		var prijs = prijstemp2.toFixed(2);
	    $('#uitput1').html(			
			"<a href=\"groter.html?id="+val['product_id']+"\"><article><img src=\"http://www.qualityflorist.nl/image/cache/data/import/"+val['product_id']+"-138x138.jpg\" alt=\""+val['model']+"\"/><h1>"+val['model']+"</h1><h2>&#8364;"+prijs+"</h2></article></a></div>"+have+"<div class=\"menu_spacer\">"		
		);
		
		aantal++;
				
	  });		  
	});	
	
});

	  $('.ajaxloader').hide(); 	  		







$(document).ready(function() {	
	//Json goes here
  $.getJSON('http://www.bloemetjebestellen.mobi/script/output-beterschap.php', function(data) {
	  var items = [];
	  
	  var aantal = 0;
	  	
	  $.each(data, function(key, val) {
	  
	  if(val['tax_class_id'] == 11){var btwperc = 1.06}
	  if(val['tax_class_id'] == 12){var btwperc = 1.21}
	  
		var have = $('#uitput1').html();  	
		var prijstemp = val['price'] * btwperc;
		var prijstemp2 = Math.round(prijstemp*100)/100;
		var prijs = prijstemp2.toFixed(2);
	    $('#uitput1').html(			
			"<a href=\"groter.html?id="+val['product_id']+"\"><article><img src=\"http://www.qualityflorist.nl/image/cache/data/import/"+val['product_id']+"-138x138.jpg\" alt=\""+val['model']+"\"/><h1>"+val['model']+"</h1><h2>&#8364;"+prijs+"</h2></article></a></div>"+have+"<div class=\"menu_spacer\">"		
		);
		
		aantal++;
				
	  });		  
	});	
	
});

	  $('.ajaxloader').hide(); 	  		







$(document).ready(function() {	
	//Json goes here
  $.getJSON('http://www.bloemetjebestellen.mobi/script/output-kerst.php', function(data) {
	  var items = [];
	  
	  var aantal = 0;
	  	
	  $.each(data, function(key, val) {
	  
	  if(val['tax_class_id'] == 11){var btwperc = 1.06}
	  if(val['tax_class_id'] == 12){var btwperc = 1.21}
	  
		var have = $('#uitput1').html();  	
		var prijstemp = val['price'] * btwperc;
		var prijstemp2 = Math.round(prijstemp*100)/100;
		var prijs = prijstemp2.toFixed(2);
	    $('#uitput1').html(			
			"<a href=\"groter.html?id="+val['product_id']+"\"><article><img src=\"http://www.qualityflorist.nl/image/cache/data/import/"+val['product_id']+"-138x138.jpg\" alt=\""+val['model']+"\"/><h1>"+val['model']+"</h1><h2>&#8364;"+prijs+"</h2></article></a></div>"+have+"<div class=\"menu_spacer\">"		
		);
		
		aantal++;
				
	  });		  
	});	
	
});

	  $('.ajaxloader').hide(); 	  		






function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

var getid = gup('id');

if(getid == "")
{
	window.location = 'index.html';
}



$(document).ready(function() {	
	
	//Json goes here
  $.getJSON('http://www.bloemetjebestellen.mobi/script/rouwlint-check.php?id='+getid+'', function(data) {
	  var items = [];
	  	
	  $.each(data, function(key, val) {	  
		  if(val['product_id'] != 0){$('#rouwlint').show();}		
	  });
	});

  //Json goes here
  $.getJSON('http://www.bloemetjebestellen.mobi/script/groter-prijs-2.php?id='+getid+'', function(data) {
	  var items = [];
	
	  $.each(data, function(key, val) {
		var have = $('#output').html();  
		
		if(val['prijs2'] == "0.00"){var prijs2 = 0.00;}
		else
		{
			var prijs2temp = val['prijs2'] * 1.06;
			var prijs2 = Math.round(prijs2temp*100)/100;			
		}	
		
			//Json goes here
		  $.getJSON('http://www.bloemetjebestellen.mobi/script/groter-prijs-3.php?id='+getid+'', function(data) {
			  var items = [];
			
			  $.each(data, function(key, val) {
				var have = $('#output').html();  
				
				if(val['prijs3'] == "0.00"){var prijs3 = 0.00;}
				else
				{
					var prijs3temp = val['prijs3'] * 1.06;
					var prijs3 = Math.round(prijs3temp*100)/100;
				}
			
				//Json goes here
				  $.getJSON('http://www.bloemetjebestellen.mobi/script/groter-beschrijving.php?id='+getid+'', function(data) {
					  var items = [];
					
					  $.each(data, function(key, val) {
						var have = $('#output').html();  	
						$('#beschrijving').html(val['description']).text();
						
						  //Json goes here
						  $.getJSON('http://www.bloemetjebestellen.mobi/script/groter.php?id='+getid+'', function(data) {
							  var items = [];
							
							  $.each(data, function(key, val) {							  
							  
							  if(val['tax_class_id'] == 11){var btwperc = 1.06}
	  						  if(val['tax_class_id'] == 12){var btwperc = 1.21}
							  
								var have = $('#output').html();  
								var prijstemp = val['price'] * btwperc;
								var prijstemp2 = Math.round(prijstemp*100)/100;
								var prijs = prijstemp2.toFixed(2);							
								
								$('#output').html(
							
								"<h1 class=\"links_align\">"+val['model']+"</h1><a class=\"btn_terug\" href=\"index.html\">Terug</a><a class=\"btn_info\" href=\"info.html\">Info</a>"+have+""
								
								);
								
								if(prijs2 != "0.00"){var prijs2rekentemp = prijstemp2 + prijs2; var prijs2reken = prijs2rekentemp.toFixed(2);}
								if(prijs3 != "0.00"){var prijs3rekentemp = prijstemp2 + prijs3; var prijs3reken = prijs3rekentemp.toFixed(2);}
								
								if(prijs2 == "0.00" && prijs3 == "0.00"){var eenprijsmaar = 1;}else{var eenprijsmaar = 0;}
								
								if(eenprijsmaar == 0)
								{
									$('#output-xtra').html(							
										"<div class=\"prijzen\"><img src=\"http://www.qualityflorist.nl/image/cache/data/import/"+val['product_id']+"-500x500.jpg\" alt=\""+val['model']+"\"/><div class=\"prijs\"><a href=\"details.html?p="+prijs+"&id="+getid+"&prijskeuze=1\" id=\"linkjeprijs1\"><div class=\"links\"><p>Normaal</p></div><div class=\"rechts\"><p>&#8364;"+prijs+"</p></div></a><a href=\"details.html?p="+prijs2reken+"&id="+getid+"&prijskeuze=2\" id=\"linkjeprijs2\"><div class=\"links\"><p>Groot</p></div><div class=\"rechts\"><p id=\"prijs2\">&#8364;"+prijs2reken+"</p></div></a><a href=\"details.html?p="+prijs3reken+"&id="+getid+"&prijskeuze=3\" id=\"linkjeprijs3\"><div class=\"links\"><p>Super</p></div><div class=\"rechts\"><p>&#8364;"+prijs3reken+"</p></div></a></div></div>"+have+""								
									);
								}
								if(eenprijsmaar == 1)
								{
									$('#output-xtra').html(							
										"<div class=\"prijzen\"><img src=\"http://www.qualityflorist.nl/image/cache/data/import/"+val['product_id']+"-500x500.jpg\" alt=\""+val['model']+"\"/><div class=\"prijs\" style=\"height: 45px;\"><a href=\"details.html?p="+prijs+"&id="+getid+"\" id=\"linkjeprijs1\"><div class=\"links\"><p>Bestellen</p></div><div class=\"rechts\"><p>&#8364;"+prijs+"</p></div></a></div>"+have+""								
									);																
								}										
								
								$('.ajaxloader').hide();
										
							  });
							});
										
					  });
					});
			
			  });
			});	
						
	  });
	});
		
		
$('#rouwlintcheck').click(function() {	
	if($('#rouwlintcheck').is(':checked'))
	{
		var rouwgekozen = "rouwgekozen=1";
		$('#linkjeprijs1').attr('href', function() {
    		return this.href + '&' + rouwgekozen;
		});
		$('#linkjeprijs2').attr('href', function() {
    		return this.href + '&' + rouwgekozen;
		});
		$('#linkjeprijs3').attr('href', function() {
    		return this.href + '&' + rouwgekozen;
		});
	}
	else
	{
		var rouwgekozen = "rouwgekozen=0";
		$('#linkjeprijs1').attr('href', function() {
    		return this.href + '&' + rouwgekozen;
		});
		$('#linkjeprijs2').attr('href', function() {
    		return this.href + '&' + rouwgekozen;
		});
		$('#linkjeprijs3').attr('href', function() {
    		return this.href + '&' + rouwgekozen;
		});
	}
});

});











$(document).ready(function() {	
	//Json goes here
  $.getJSON('http://www.bloemetjebestellen.mobi/script/output-secretaressedag.php', function(data) {
	  var items = [];
	  
	  var aantal = 0;
	  	
	  $.each(data, function(key, val) {
	  
	  if(val['tax_class_id'] == 11){var btwperc = 1.06}
	  if(val['tax_class_id'] == 12){var btwperc = 1.21}
	  
		var have = $('#uitput1').html();  	
		var prijstemp = val['price'] * btwperc;
		var prijstemp2 = Math.round(prijstemp*100)/100;
		var prijs = prijstemp2.toFixed(2);
	    $('#uitput1').html(			
			"<a href=\"groter.html?id="+val['product_id']+"\"><article><img src=\"http://www.qualityflorist.nl/image/cache/data/import/"+val['product_id']+"-138x138.jpg\" alt=\""+val['model']+"\"/><h1>"+val['model']+"</h1><h2>&#8364;"+prijs+"</h2></article></a></div>"+have+"<div class=\"menu_spacer\">"		
		);
		
		aantal++;
				
	  });		  
	});	
	
});

	  $('.ajaxloader').hide(); 	  		






$("#output1").click(function() {	  
	  $('#uitput2').hide();	  $('#uitput3').hide();	  $('#uitput1').show();	  
});
$("#output2").click(function() { 	  	  
	  $('#uitput1').hide();	  $('#uitput3').hide();	  $('#uitput2').show();	  
});
$("#output3").click(function() {	  
	  $('#uitput1').hide();	  $('#uitput2').hide();	  $('#uitput3').show();	  
});

$(document).ready(function() {	
	//Json goes here
  $.getJSON('http://www.bloemetjebestellen.mobi/script/output1.php', function(data) {
	  var items = [];
	  
	  var aantal = 0;
	  	
	  $.each(data, function(key, val) {
	  
	  if(val['tax_class_id'] == 11){var btwperc = 1.06}
	  if(val['tax_class_id'] == 12){var btwperc = 1.21}
	  
		var have = $('#uitput1').html();  	
		var prijstemp = val['price'] * btwperc;
		var prijstemp2 = Math.round(prijstemp*100)/100;
		var prijs = prijstemp2.toFixed(2);
	    $('#uitput1').html(			
			"<a href=\"groter.html?id="+val['product_id']+"\"><article><img src=\"http://www.qualityflorist.nl/image/cache/data/import/"+val['product_id']+"-138x138.jpg\" alt=\""+val['model']+"\"/><h1>"+val['model']+"</h1><h2>&#8364;"+prijs+"</h2></article></a></div>"+have+"<div class=\"menu_spacer\">"		
		);
		
		aantal++;
				
	  });		  
	});
	
	//Json goes here
  $.getJSON('http://www.bloemetjebestellen.mobi/script/output2.php', function(data) {
	  var items = [];
	
	  $.each(data, function(key, val) {
	  
	  if(val['tax_class_id'] == 11){var btwperc = 1.06}
	  if(val['tax_class_id'] == 12){var btwperc = 1.21}
	  
		var have = $('#uitput2').html();  	
		var prijstemp = val['price'] * btwperc;
		var prijstemp2 = Math.round(prijstemp*100)/100;
		var prijs = prijstemp2.toFixed(2);
	    $('#uitput2').html(
			"<a href=\"groter.html?id="+val['product_id']+"\"><article><img src=\"http://www.qualityflorist.nl/image/cache/data/import/"+val['product_id']+"-138x138.jpg\" alt=\""+val['model']+"\"/><h1>"+val['model']+"</h1><h2>&#8364;"+prijs+"</h2></article></a>"+have+"<div class=\"menu_spacer\"></div>"		
		);
		
	  });
	});		
	
	//Json goes here
  $.getJSON('http://www.bloemetjebestellen.mobi/script/extra-gelegenheden.php', function(data) {
	  var items = [];
	
	  $.each(data, function(key, val) {
	  
		if(val['category_id'] == "90" && val['status'] == "1"){$('#kerst').show();} 
		if(val['category_id'] == "91" && val['status'] == "1"){$('#valentijn').show();} 
		if(val['category_id'] == "92" && val['status'] == "1"){$('#secretaressedag').show();} 
		if(val['category_id'] == "93" && val['status'] == "1"){$('#moederdag').show();} 
		if(val['category_id'] == "94" && val['status'] == "1"){$('#vaderdag').show();} 
		
	  });
	});		
	
});

		document.addEventListener("deviceready", onDeviceReady, false);
		
		function onDeviceReady() {
		    navigator.splashscreen.hide();
		}	

	  $('.ajaxloader').hide(); 	  		







$(document).ready(function() {	
	//Json goes here
  $.getJSON('http://www.bloemetjebestellen.mobi/script/output-geboorte.php', function(data) {
	  var items = [];
	  
	  var aantal = 0;
	  	
	  $.each(data, function(key, val) {
	  
	  if(val['tax_class_id'] == 11){var btwperc = 1.06}
	  if(val['tax_class_id'] == 12){var btwperc = 1.21}
	  
		var have = $('#uitput1').html();  	
		var prijstemp = val['price'] * btwperc;
		var prijstemp2 = Math.round(prijstemp*100)/100;
		var prijs = prijstemp2.toFixed(2);
	    $('#uitput1').html(			
			"<a href=\"groter.html?id="+val['product_id']+"\"><article><img src=\"http://www.qualityflorist.nl/image/cache/data/import/"+val['product_id']+"-138x138.jpg\" alt=\""+val['model']+"\"/><h1>"+val['model']+"</h1><h2>&#8364;"+prijs+"</h2></article></a></div>"+have+"<div class=\"menu_spacer\">"		
		);
		
		aantal++;
				
	  });		  
	});	
	
});

	  $('.ajaxloader').hide(); 	  		







$(document).ready(function() {	
	//Json goes here
  $.getJSON('http://www.bloemetjebestellen.mobi/script/output-felicitatie.php', function(data) {
	  var items = [];
	  
	  var aantal = 0;
	  	
	  $.each(data, function(key, val) {
	  
	  if(val['tax_class_id'] == 11){var btwperc = 1.06}
	  if(val['tax_class_id'] == 12){var btwperc = 1.21}
	  
		var have = $('#uitput1').html();  	
		var prijstemp = val['price'] * btwperc;
		var prijstemp2 = Math.round(prijstemp*100)/100;
		var prijs = prijstemp2.toFixed(2);
	    $('#uitput1').html(			
			"<a href=\"groter.html?id="+val['product_id']+"\"><article><img src=\"http://www.qualityflorist.nl/image/cache/data/import/"+val['product_id']+"-138x138.jpg\" alt=\""+val['model']+"\"/><h1>"+val['model']+"</h1><h2>&#8364;"+prijs+"</h2></article></a></div>"+have+"<div class=\"menu_spacer\">"		
		);
		
		aantal++;
				
	  });		  
	});	
	
});

	  $('.ajaxloader').hide(); 	  		






$("#output1").click(function() {	  
	  $('#uitput2').hide();	  $('#uitput3').hide();	  $('#uitput1').show();	  
});
$("#output2").click(function() { 	  	  
	  $('#uitput1').hide();	  $('#uitput3').hide();	  $('#uitput2').show();	  
});
$("#output3").click(function() {	  
	  $('#uitput1').hide();	  $('#uitput2').hide();	  $('#uitput3').show();	  
});

$(document).ready(function() {	
	
	//Json goes here
  $.getJSON('http://www.bloemetjebestellen.mobi/script/extra-gelegenheden.php', function(data) {
	  var items = [];
	
	  $.each(data, function(key, val) {
	  
		if(val['category_id'] == "90" && val['status'] == "1"){$('#kerst').show();} 
		if(val['category_id'] == "91" && val['status'] == "1"){$('#valentijn').show();} 
		if(val['category_id'] == "92" && val['status'] == "1"){$('#secretaressedag').show();} 
		if(val['category_id'] == "93" && val['status'] == "1"){$('#moederdag').show();} 
		if(val['category_id'] == "94" && val['status'] == "1"){$('#vaderdag').show();} 
		
	  });
	});		
	
});

	  $('.ajaxloader').hide(); 	  		














function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

var getid = gup('id');
var rouwgekozen = gup('rouwgekozen');
var prijskeuze = gup('prijskeuze');
if(rouwgekozen == 1){var getprice = parseFloat(gup('p')) + 15;}
else{var getprice = parseFloat(gup('p'));}

if(prijskeuze == 1){var devaasprijs = 10;}
if(prijskeuze == 2){var devaasprijs = 14;}
if(prijskeuze == 3){var devaasprijs = 18;}
if(prijskeuze != 1 && prijskeuze != 2 && prijskeuze != 3 && rouwgekozen != 1){devaasprijs = 0;}

var ogoneprice = getprice * 100;
var uniek = Math.floor(Math.random()*1000001);
var passprase = "Mysecretsig1875!?";
var sha = ""+uniek+""+ogoneprice+"EURbloemengiftsSAL"+passprase+"";
var sha1convert = SHA1(sha);

if(getid == "" || getprice == "")
{
	window.location = 'index.html';
}

var terugknop = "<a class=\"btn_terug\" href=\"groter.html?id="+getid+"\">Terug</a>";



$(document).ready(function() {

if(rouwgekozen == 1)
{
	$('#kaarttekstblock').html("<h1>Tekst rouwlint</h1><textarea name=\"kaarttekst\" placeholder=\"Tekst rouwlint (maximaal 50 tekens)\" id=\"kaarttekst\"></textarea>");
	$('#kaarttekst').limit('50');
}
else
{
	$('#kaarttekstblock').html("<h1>Kaarttekst</h1><textarea name=\"kaarttekst\" placeholder=\"Kaarttekst (maximaal 200 tekens)\" id=\"kaarttekst\"></textarea>");
	$('#kaarttekst').limit('200');
}

	//Json goes here
  $.getJSON('http://www.bloemetjebestellen.mobi/script/groter-categorie.php?id='+getid+'', function(data) {
	  var items = [];
	  	
	  $.each(data, function(key, val) {	  
		  if(val['category_id'] == 59){$('#vaaskiezen').show();}	

		  if(prijskeuze == 1){$('#vaasprijs').html(devaasprijs);}
		  if(prijskeuze == 2){$('#vaasprijs').html(devaasprijs);}
		  if(prijskeuze == 3){$('#vaasprijs').html(devaasprijs);}

		  $('#vaaskiezencheck').click(function() {	
			if($('#vaaskiezencheck').is(':checked'))
			{
				getprice = getprice + devaasprijs;
				$('#vaasprijz').show();
				$('#vaasprijz').html(" + &euro;"+devaasprijs+" (vaas)");
			}
			else
			{
				getprice = parseFloat(gup('p'));
				$('#vaasprijz').hide();
			}
		});
	  });
	});   

$('#AMOUNT').val(ogoneprice);
$('#uniek').val(uniek);
$('#ORDERID').val(uniek);
$('#SHASign').val(sha1convert);
	
$('#akkoordknop').click(function() {
	$('#iscrollwrapper').show();	
	$('#algemenevoorwaarden').show();
});

$('#afterpaycheck').click(function() {
	if($('#afterpaycheck').is(":checked")){$('#afterpaydiv').show();}
	else{$('#afterpaydiv').hide();}
});

$('#i').change(function() {
	
var d = new Date();
var curr_date = d.getDate();
var curr_hour = d.getHours()
var month=new Array();
 month[0]="01";
 month[1]="02";
 month[2]="03";
 month[3]="04";
 month[4]="05";
 month[5]="06";
 month[6]="07";
 month[7]="08";
 month[8]="09";
 month[9]="10";
 month[10]="11";
 month[11]="12";
 var curr_month = month[d.getMonth()]; 
    var curr_year = d.getFullYear();
    var datumvandaag = curr_date + "-" + curr_month + "-" + curr_year;
	
	if($('#i').val() == datumvandaag && curr_hour > 12)
	{
		$('#datumerror').show();
		$('#submit').hide();

		var getprice = getprice + devaasprijs;
		var ogoneprice = getprice * 100;
		var passprase = "Mysecretsig1875!?";
		var sha = ""+uniek+""+ogoneprice+"EURbloemengiftsSAL"+passprase+"";
		var sha1convert = SHA1(sha);
	}
	else
	{
		$('#datumerror').hide();
		$('#submit').show();

		var getprice = parseFloat(gup('p'));
		var ogoneprice = getprice * 100;
		var passprase = "Mysecretsig1875!?";
		var sha = ""+uniek+""+ogoneprice+"EURbloemengiftsSAL"+passprase+"";
		var sha1convert = SHA1(sha);
	}
	
});

$('#submit').click(function() {	

	if($('#i').val() == ""){$('#datumerror').show();	var foutgevonden = "1"}	else {$('#datumerror').hide();}
	if($('#naam').val() == ""){$('#naamerror').show();	var foutgevonden = "1"}	else {$('#naamerror').hide();}
	if($('#adres').val() == ""){$('#adreserror').show();	var foutgevonden = "1"}	else {$('#adreserror').hide();}
	if($('#postcode').val() == ""){$('#postcodeerror').show();	var foutgevonden = "1"}	else {$('#postcodeerror').hide();}
	if($('#plaats').val() == ""){$('#plaatserror').show();	var foutgevonden = "1"}	else {$('#plaatserror').hide();}
	
	if($('#klantnaam').val() == ""){$('#klantnaamerror').show();	var foutgevonden = "1"}	else {$('#klantnaamerror').hide();}
	if($('#klantmail').val() == ""){$('#klantmailerror').show();	var foutgevonden = "1"}	else {$('#klantmailerror').hide();}
	if($('#klanttelefoon').val() == ""){$('#klanttelefoonerror').show();	var foutgevonden = "1"}	else {$('#klanttelefoonerror').hide();}	
	
	if($('#voorwaarden').is(':checked'))
	{
		$('#voorwaardenerror').hide();
	}
	else
	{
		$('#voorwaardenerror').show();
		var foutgevonden = "1"
	}
	
	if(foutgevonden != 1)
	{	

		$('#vaaskiezen').hide();

		var bezorgdatum = escape($('#i').val());
		var naam = decodeURI(escape($('#naam').val()));
		var adres = decodeURI(escape($('#adres').val()));
		var postcode = decodeURI(escape($('#postcode').val()));
		var plaats = decodeURI(escape($('#plaats').val()));
		var kaarttekst = decodeURI(escape($('#kaarttekst').val()));
		var klantnaam = decodeURI(escape($('#klantnaam').val()));
		var klantmail = decodeURI(escape($('#klantmail').val()));
		var klanttelefoon = decodeURI(escape($('#klanttelefoon').val()));
		var id = escape(getid);
		var prijs = escape(getprice);
		var uniek = escape($('#uniek').val());
		var model = escape($('#model').val());

		var klantvoornaam = decodeURI(escape($('#klantvoornaam').val()));
		var klantachternaam = decodeURI(escape($('#klantachternaam').val()));
		var klantstraatnaam = decodeURI(escape($('#klantstraatnaam').val()));
		var klanthuisnummer = decodeURI(escape($('#klanthuisnummer').val()));
		var klantpostcode = decodeURI(escape($('#klantpostcode').val()));
		var klantplaats = decodeURI(escape($('#klantplaats').val()));
		var geslacht = $('#geslacht').val();

		var geboortedatumdag = $('#geboortedatumdag').val();
		var geboortedatummaand = $('#geboortedatummaand').val();
		var geboortedatumjaar = $('#geboortedatumjaar').val(); 

			var telefoontype = "Android App";

		$.getJSON('http://www.bloemetjebestellen.mobi/script/kortingcheck.php?email='+escape(klantmail)+'', function(data) {
		  var items = [];
		
		  $.each(data, function(key, val) {
		  
		  if(val['emailgevonden'] == 1){var emailgevonden = 1;}
		  if(val['emailgevonden'] == 0){var emailgevonden = 0;}

		  $('#textvelden').hide();
		  $('#betalen').show();

		  if(emailgevonden == 0){prijs = prijs * 0.85;}else{prijs = prijs;}

		  $('#prijz').text(prijs);
		  var ogoneprice = Math.round(prijs*100);
		  $('#AMOUNT').val(ogoneprice);

		  var passprase = "Mysecretsig1875!?";
		  var sha = ""+uniek+""+ogoneprice+"EURbloemengiftsSAL"+passprase+"";
		  var sha1convert = SHA1(sha);

		  var afterpayprijs = prijs / 1.06;

		  $('#SHASign').val(sha1convert);
		  $('#CIVILITY').val(geslacht);
		  $('#CN').val(klantnaam);
		  $('#ECOM_BILLTO_POSTAL_NAME_FIRST').val(klantvoornaam);
		  $('#ECOM_BILLTO_POSTAL_NAME_LAST').val(klantachternaam);
		  $('#ECOM_BILLTO_POSTAL_STREET_NUMBER').val(klanthuisnummer);
		  $('#EMAIL').val(klantmail);
		  $('#OWNERZIP').val(klantpostcode);
		  $('#OWNERADDRESS').val(klantstraatnaam);
		  $('#OWNERTOWN').val(klantplaats);
		  $('#OWNERTELNO').val(klanttelefoon);
		  $('#ECOM_SHIPTO_POSTAL_NAME_FIRST').val(klantvoornaam);
		  $('#ECOM_SHIPTO_POSTAL_NAME_LAST').val(klantachternaam);
		  $('#ECOM_SHIPTO_POSTAL_CITY').val(klantplaats);
		  $('#ECOM_SHIPTO_POSTAL_POSTALCODE').val(klantpostcode);
		  $('#ECOM_SHIPTO_POSTAL_STREET_LINE1').val(klantstraatnaam);
		  $('#ECOM_SHIPTO_POSTAL_STREET_NUMBER').val(klanthuisnummer);
		  $('#ITEMID1').val(id);
		  $('#ITEMPRICE1').val(afterpayprijs);
		  $('#ECOM_SHIPTO_DOB').val(""+geboortedatumdag+"/"+geboortedatummaand+"/"+geboortedatumjaar+"");

		  $.getJSON('http://www.bloemetjebestellen.mobi/script/betalen.php?naam='+naam+'&adres='+adres+'&postcode='+postcode+'&plaats='+plaats+'&id='+id+'&prijs='+prijs+'&klantnaam='+klantnaam+'&klantmail='+klantmail+'&klanttelefoon='+klanttelefoon+'&uniek='+uniek+'&bezorgdatum='+bezorgdatum+'&telefoontype='+telefoontype+'&kaarttekst='+kaarttekst);	
			
		  });
		});				
		
	}
	
});

$('#betalen').click(function() {	
	$('.ajaxloader').show();
});

 //Json goes here
  $.getJSON('http://www.bloemetjebestellen.mobi/script/groter.php?id='+getid+'', function(data) {
	  var items = [];
	
	  $.each(data, function(key, val) {
	  
	  	if(val['tax_class_id'] == 11){var btwperc = 1.06}
			if(val['tax_class_id'] == 12){var btwperc = 1.21}
			
		var have = $('#output').html();  								
		var prijstemp = val['price'] * btwperc;
		var prijs = Math.round(prijstemp*100)/100;	
		
		if(rouwgekozen == 1)
		{
			$('#output').html(							
				"<img src=\"http://www.qualityflorist.nl/image/cache/data/import/"+val['product_id']+"-138x138.jpg\" alt=\""+val['model']+"\"/><h1>"+val['model']+"</h1><h2 id=\"prijz\">&#8364;"+getprice+"<span id=\"vaasprijz\" style=\"display: none;\"></span></h2><p>Bedrag is inclusief bezorgkosten, BTW en een rouwlint t.w.v. 15 euro.</p>"+have+""								
			);
		}
		else
		{
			$('#output').html(							
				"<img src=\"http://www.qualityflorist.nl/image/cache/data/import/"+val['product_id']+"-138x138.jpg\" alt=\""+val['model']+"\"/><h1>"+val['model']+"</h1><h2 id=\"prijz\">&#8364;"+getprice+"<span id=\"vaasprijz\" style=\"display: none;\"></span></h2><p>Bedrag is inclusief bezorgkosten en BTW.</p>"+have+""								
			);
		}
				
	  });
	});			
	
});


$(function(){

var vandaag = new Date();

if(vandaag.getHours() > 12)
{
	var morgen = new Date(vandaag.getTime() + (24 * 60 * 60 * 1000));
}
else
{
	var morgen = vandaag;
}

    $('#i').scroller({
        preset: 'date',
        invalid: { daysOfWeek: [0] },
        theme: 'android-ics light',
        display: 'modal',
        mode: 'scroller',
        dateOrder: 'D dd M y',
		dateFormat: 'dd-mm-yyyy',
		minDate: morgen
    });    

    $('#show').click(function(){
    	$('.ajaxloader').show();
        $('#i').scroller('show'); 
        $('.ajaxloader').hide();
        return false;
    });
    $('#clear').click(function () {
        $('#i').val('');
        return false;
    });

});


document.write(terugknop);

var myScroll = new iScroll('iscrollwrapper', {snap:true});







$(document).ready(function() {	
	//Json goes here
  $.getJSON('http://www.bloemetjebestellen.mobi/script/output-rouw.php', function(data) {
	  var items = [];
	  
	  var aantal = 0;
	  	
	  $.each(data, function(key, val) {
	  
	  if(val['tax_class_id'] == 11){var btwperc = 1.06}
	  if(val['tax_class_id'] == 12){var btwperc = 1.21}
	  
		var have = $('#uitput1').html();  	
		var prijstemp = val['price'] * btwperc;
		var prijstemp2 = Math.round(prijstemp*100)/100;
		var prijs = prijstemp2.toFixed(2);
	    $('#uitput1').html(			
			"<a href=\"groter.html?id="+val['product_id']+"\"><article><img src=\"http://www.qualityflorist.nl/image/cache/data/import/"+val['product_id']+"-138x138.jpg\" alt=\""+val['model']+"\"/><h1>"+val['model']+"</h1><h2>&#8364;"+prijs+"</h2></article></a></div>"+have+"<div class=\"menu_spacer\">"		
		);
		
		aantal++;
				
	  });		  
	});	
	
});

	  $('.ajaxloader').hide(); 	  		


function SHA1 (msg) {
 
	function rotate_left(n,s) {
		var t4 = ( n<<s ) | (n>>>(32-s));
		return t4;
	};
 
	function lsb_hex(val) {
		var str="";
		var i;
		var vh;
		var vl;
 
		for( i=0; i<=6; i+=2 ) {
			vh = (val>>>(i*4+4))&0x0f;
			vl = (val>>>(i*4))&0x0f;
			str += vh.toString(16) + vl.toString(16);
		}
		return str;
	};
 
	function cvt_hex(val) {
		var str="";
		var i;
		var v;
 
		for( i=7; i>=0; i-- ) {
			v = (val>>>(i*4))&0x0f;
			str += v.toString(16);
		}
		return str;
	};
 
 
	function Utf8Encode(string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	};
 
	var blockstart;
	var i, j;
	var W = new Array(80);
	var H0 = 0x67452301;
	var H1 = 0xEFCDAB89;
	var H2 = 0x98BADCFE;
	var H3 = 0x10325476;
	var H4 = 0xC3D2E1F0;
	var A, B, C, D, E;
	var temp;
 
	msg = Utf8Encode(msg);
 
	var msg_len = msg.length;
 
	var word_array = new Array();
	for( i=0; i<msg_len-3; i+=4 ) {
		j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
		msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
		word_array.push( j );
	}
 
	switch( msg_len % 4 ) {
		case 0:
			i = 0x080000000;
		break;
		case 1:
			i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
		break;
 
		case 2:
			i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
		break;
 
		case 3:
			i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8	| 0x80;
		break;
	}
 
	word_array.push( i );
 
	while( (word_array.length % 16) != 14 ) word_array.push( 0 );
 
	word_array.push( msg_len>>>29 );
	word_array.push( (msg_len<<3)&0x0ffffffff );
 
 
	for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
 
		for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
		for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
 
		A = H0;
		B = H1;
		C = H2;
		D = H3;
		E = H4;
 
		for( i= 0; i<=19; i++ ) {
			temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}
 
		for( i=20; i<=39; i++ ) {
			temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}
 
		for( i=40; i<=59; i++ ) {
			temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}
 
		for( i=60; i<=79; i++ ) {
			temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}
 
		H0 = (H0 + A) & 0x0ffffffff;
		H1 = (H1 + B) & 0x0ffffffff;
		H2 = (H2 + C) & 0x0ffffffff;
		H3 = (H3 + D) & 0x0ffffffff;
		H4 = (H4 + E) & 0x0ffffffff;
 
	}
 
	var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
 
	return temp.toLowerCase();
 
}

(function(d){function s(a,b){function i(){var a=document.body,b=document.documentElement;return Math.max(a.scrollHeight,a.offsetHeight,b.clientHeight,b.scrollHeight,b.offsetHeight)}function t(a){k=d("li.dw-v",a).eq(0).index();c=d("li.dw-v",a).eq(-1).index();e=f.height;r=h}function l(a){var b=f.headerText;return b?"function"==typeof b?b.call(A,a):b.replace(/{value}/i,a):""}function m(){h.temp=I&&null!==h.val&&h.val!=a.val()||null===h.values?f.parseValue(a.val()?a.val():"",h):h.values.slice(0);h.setValue(!0)}
function z(a,b,t,c,e){f.validate.call(A,v,t);d(".dww ul",v).each(function(c){var f=d(this),l=d('li[data-val="'+h.temp[c]+'"]',f),f=l.index(),i=l,l=f;if(!i.hasClass("dw-v")){for(var g=i,p=0,j=0;g.prev().length&&!g.hasClass("dw-v");)g=g.prev(),p++;for(;i.next().length&&!i.hasClass("dw-v");)i=i.next(),j++;(j<p&&j&&1==!e||!p||!g.hasClass("dw-v")||1==e)&&i.hasClass("dw-v")?l+=j:(i=g,l-=p);h.temp[c]=i.attr("data-val")}g=c==t||void 0===t;if(f!=l||g)h.scroll(d(this),l,g?a:0.2,b,c)});h.change(c)}function s(){var a=
0,b=0,c=d(window).width(),t=d(window).height(),l=d(window).scrollTop(),f=d(".dwo",v),e=d(".dw",v),h,g;d(".dwc",v).each(function(){h=d(this).outerWidth(!0);a+=h;b=h>b?h:b});h=a>c?b:a;e.width(h);h=e.outerWidth();g=e.outerHeight();e.css({left:(c-h)/2,top:l+(t-g)/2});f.height(0).height(i())}function C(a){var b=+a.data("pos")+1;n(a,b>c?k:b,1)}function F(a){var b=+a.data("pos")-1;n(a,b<k?c:b,2)}var h=this,A=a,a=d(A),L,f=d.extend({},D),N,v,M={},O={},I=a.is("input"),J=!1;h.enable=function(){f.disabled=!1;
I&&a.prop("disabled",!1)};h.disable=function(){f.disabled=!0;I&&a.prop("disabled",!0)};h.scroll=function(a,b,d,c,t){var l=(N-b)*f.height;a.attr("style",(d?H+"-transition:all "+d.toFixed(1)+"s ease-out;":"")+(E?H+"-transform:translate3d(0,"+l+"px,0);":"top:"+l+"px;"));if(d&&void 0!==c){var e=0;clearInterval(M[t]);M[t]=setInterval(function(){e+=0.1;a.data("pos",Math.round((b-c)*Math.sin(e/d*(Math.PI/2))+c));e>=d&&(clearInterval(M[t]),a.data("pos",b))},100);clearTimeout(O[t]);O[t]=setTimeout(function(){"mixed"==
f.mode&&!a.hasClass("dwa")&&a.closest(".dwwl").find(".dwwb").fadeIn("fast")},1E3*d)}else a.data("pos",b)};h.setValue=function(b,d,c){var t=f.formatResult(h.temp);h.val=t;h.values=h.temp.slice(0);J&&b&&z(c);d&&I&&a.val(t).trigger("change")};h.validate=function(a,b,d,c){z(a,b,d,!0,c)};h.change=function(a){var b=f.formatResult(h.temp);"inline"==f.display?h.setValue(!1,a):d(".dwv",v).html("Datum vandaag: "+l(b));a&&f.onChange.call(A,b,h)};h.hide=function(){if(!1===f.onClose.call(A,h.val,h))return!1;d(".dwtd").prop("disabled",
!1).removeClass("dwtd");a.blur();v&&v.remove();J=!1;d(window).unbind(".dw")};h.show=function(){if(f.disabled||J)return!1;var b=f.height,c=f.rows*b;m();for(var e='<div class="'+f.theme+'">'+("inline"==f.display?'<div class="dw dwbg dwi"><div class="dwwr">':'<div class="dwo"></div><div class="dw dwbg"><div class="dwwr">'+(f.headerText?'<div class="dwv"></div>':"")),l=0;l<f.wheels.length;l++){var e=e+('<div class="dwc'+("scroller"!=f.mode?" dwpm":" dwsc")+(f.showLabel?"":" dwhl")+'"><div class="dwwc dwrc"><table cellpadding="0" cellspacing="0"><tr>'),
i;for(i in f.wheels[l]){var e=e+('<td><div class="dwwl dwrc">'+("scroller"!=f.mode?'<div class="dwwb dwwbp" style="height:'+b+"px;line-height:"+b+'px;"><span>+</span></div><div class="dwwb dwwbm" style="height:'+b+"px;line-height:"+b+'px;"><span>&ndash;</span></div>':"")+'<div class="dwl">'+i+'</div><div class="dww dwrc" style="height:'+c+"px;min-width:"+f.width+'px;"><ul>'),j;for(j in f.wheels[l][i])e+='<li class="dw-v" data-val="'+j+'" style="height:'+b+"px;line-height:"+b+'px;">'+f.wheels[l][i][j]+
"</li>";e+='</ul><div class="dwwo"></div></div><div class="dwwol"></div></div></td>'}e+="</tr></table></div></div>"}e+=("inline"!=f.display?'<div class="dwbc"><span class="dwbw dwb-s"><a href="#" class="dwb">'+f.setText+'</a></span><span class="dwbw dwb-c"><a href="#" class="dwb">'+f.cancelText+"</a></span></div>":'<div class="dwcc"></div>')+"</div></div></div>";v=d(e);z();"inline"!=f.display?v.appendTo("body"):a.is("div")?a.html(v):v.insertAfter(a);J=!0;L.init(v,h);"inline"!=f.display&&(d(".dwb-s a",
v).click(function(){h.setValue(!1,!0);h.hide();f.onSelect.call(A,h.val,h);return!1}),d(".dwb-c a",v).click(function(){h.hide();f.onCancel.call(A,h.val,h);return!1}),d("input,select").each(function(){d(this).prop("disabled")||d(this).addClass("dwtd")}),d("input,select").prop("disabled",!0),s(),d(window).bind("resize.dw",s));v.delegate(".dwwl","DOMMouseScroll mousewheel",function(a){if(!f.readonly){a.preventDefault();var a=a.originalEvent,a=a.wheelDelta?a.wheelDelta/120:a.detail?-a.detail/3:0,b=d("ul",
this),c=+b.data("pos"),c=Math.round(c-a);t(b);n(b,c,a<0?1:2)}}).delegate(".dwb, .dwwb",G,function(){d(this).addClass("dwb-a")}).delegate(".dwwb",G,function(a){if(!f.readonly){a.preventDefault();a.stopPropagation();var b=d(this).closest(".dwwl").find("ul"),c=d(this).hasClass("dwwbp")?C:F;t(b);clearInterval(g);g=setInterval(function(){c(b)},f.delay);c(b)}}).delegate(".dwwl",G,function(a){if(!p&&f.mode!="clickpick"&&!f.readonly){a.preventDefault();p=true;w=d("ul",this).addClass("dwa");f.mode=="mixed"&&
d(".dwwb",this).fadeOut("fast");y=+w.data("pos");t(w);u=q(a);P=new Date;x=u;h.scroll(w,y)}});f.onShow.call(A,v,h)};h.init=function(c){L=d.extend({defaults:{},init:o},d.scroller.themes[c.theme?c.theme:f.theme]);d.extend(f,L.defaults,b,c);h.settings=f;N=Math.floor(f.rows/2);var t=d.scroller.presets[f.preset];a.unbind(".dw");t&&(t=t.call(A,h),d.extend(f,t,b,c),d.extend(B,t.methods));void 0!==a.data("dwro")&&(A.readOnly=j(a.data("dwro")));J&&h.hide();"inline"==f.display?h.show():(m(),I&&f.showOnFocus&&
(a.data("dwro",A.readOnly),A.readOnly=!0,a.bind("focus.dw",h.show)))};h.values=null;h.val=null;h.temp=null;h.init(b)}function F(a){for(var b in a)if(void 0!==z[a[b]])return!0;return!1}function q(a){return C?a.originalEvent?a.originalEvent.changedTouches[0].pageY:a.changedTouches[0].pageY:a.pageY}function j(a){return!0===a||"true"==a}function n(a,b,e,t,l){var i=a.closest(".dwwr").find("ul").index(a),b=b>c?c:b,b=b<k?k:b,a=d("li",a).eq(b);r.temp[i]=a.attr("data-val");r.validate(t?b==l?0.1:Math.abs(0.1*
(b-l)):0,l,i,e)}var m={},g,o=function(){},e,k,c,r,i=(new Date).getTime(),p=!1,w=null,u,x,P,y,z=document.createElement("modernizr").style,E=F(["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"])&&"webkitPerspective"in document.documentElement.style,H=function(){var a=["Webkit","Moz","O","ms"],b;for(b in a)if(F([a[b]+"Transform"]))return"-"+a[b].toLowerCase();return""}(),C="ontouchstart"in window,G=C?"touchstart":"mousedown",K=C?"touchend":"mouseup",D={width:70,
height:40,rows:3,delay:300,disabled:!1,readonly:!1,showOnFocus:!0,showLabel:!0,wheels:[],theme:"",headerText:"{value}",display:"modal",mode:"scroller",preset:"",setText:"Kies",cancelText:"Annuleer",onShow:o,onClose:o,onSelect:o,onCancel:o,onChange:o,formatResult:function(a){for(var b="",c=0;c<a.length;c++)b+=(0<c?" ":"")+a[c];return b},parseValue:function(a,b){for(var c=b.settings.wheels,a=a.split(" "),d=[],e=0,i=0;i<c.length;i++)for(var g in c[i]){if(void 0!==c[i][g][a[e]])d.push(a[e]);else for(var j in c[i][g]){d.push(j);
break}e++}return d},validate:o},B={init:function(a){void 0===a&&(a={});return this.each(function(){this.id||(i+=1,this.id="scoller"+i);m[this.id]=new s(this,a)})},enable:function(){return this.each(function(){var a=m[this.id];a&&a.enable()})},disable:function(){return this.each(function(){var a=m[this.id];a&&a.disable()})},isDisabled:function(){var a=m[this[0].id];if(a)return a.settings.disabled},option:function(a,b){return this.each(function(){var c=m[this.id];if(c){var d={};"object"===typeof a?
d=a:d[a]=b;c.init(d)}})},setValue:function(a,b,c){return this.each(function(){var d=m[this.id];d&&(d.temp=a,d.setValue(!0,b,c))})},getInst:function(){return m[this[0].id]},getValue:function(){var a=m[this[0].id];if(a)return a.values},show:function(){var a=m[this[0].id];if(a)return a.show()},hide:function(){return this.each(function(){var a=m[this.id];a&&a.hide()})},destroy:function(){return this.each(function(){var a=m[this.id];a&&(a.hide(),d(this).unbind(".dw"),delete m[this.id],d(this).is("input")&&
(this.readOnly=j(d(this).data("dwro"))))})}};d(document).bind(C?"touchmove":"mousemove",function(a){p&&(a.preventDefault(),x=q(a),a=y+(u-x)/e,a=a>c+1?c+1:a,a=a<k-1?k-1:a,r.scroll(w,a))});d(document).bind(K,function(a){if(p){a.preventDefault();w.removeClass("dwa");var b=new Date-P,a=y+(u-x)/e,a=a>c+1?c+1:a,a=a<k-1?k-1:a;300>b?(b=(x-u)/b,b=b*b/0.0012,0>x-u&&(b=-b)):b=x-u;n(w,Math.round(y-b/e),0,!0,Math.round(a));p=!1;w=null}clearInterval(g);d(".dwb-a").removeClass("dwb-a")});d.fn.scroller=function(a){if(B[a])return B[a].apply(this,
Array.prototype.slice.call(arguments,1));if("object"===typeof a||!a)return B.init.apply(this,arguments);d.error("Unknown method")};d.scroller={setDefaults:function(a){d.extend(D,a)},presets:{},themes:{}}})(jQuery);(function(d){var s={defaults:{dateOrder:"ddMyy",mode:"mixed",rows:5,width:70,showLabel:!1}};d.scroller.themes["android-ics"]=s;d.scroller.themes["android-ics light"]=s})(jQuery);(function(d){var s=new Date,F={dateFormat:"dd/mm/yy",dateOrder:"ddmmy",timeWheels:"hhiiA",timeFormat:"hh:ii A",startYear:s.getFullYear()-100,endYear:s.getFullYear()+1,monthNames:"Januari,Februari,Maart,April,Mei,Juni,Juli,Augustus,September,Oktober,November,December".split(","),monthNamesShort:"Jan,Feb,Maa,Apr,Mei,Jun,Jul,Aug,Sep,Okt,Nov,Dec".split(","),dayNames:"Zondag,Maandag,Dinsdag,Woensdag,Donderdag,Vrijdag,Zaterdag".split(","),dayNamesShort:"Zon,Maa,Din,Woe,Don,Vri,Zat".split(","),shortYearCutoff:"+10",
monthText:"Maand",dayText:"Dag",yearText:"Jaar",hourText:"Hours",minuteText:"Minutes",secText:"Seconds",ampmText:"&nbsp;",stepHour:1,stepMinute:1,stepSecond:1,separator:" "},s=function(q){function j(a,b,c){return void 0!==i[b]?+a[i[b]]:void 0!==c?c:H[p[b]]?H[p[b]]():p[b](H)}function n(a,b){return Math.floor(a/b)*b}function m(a){var b=j(a,"h",0);return new Date(j(a,"y"),j(a,"m"),j(a,"d"),j(a,"ap")?b+12:b,j(a,"i",0),j(a,"s",0))}var g=d(this),o={},e;if(g.is("input")){switch(g.attr("type")){case "date":e=
"yy-mm-dd";break;case "datetime":e="yy-mm-ddTHH:ii:ssZ";break;case "datetime-local":e="yy-mm-ddTHH:ii:ss";break;case "month":e="yy-mm";o.dateOrder="mmyy";break;case "time":e="HH:ii:ss"}var k=g.attr("min"),g=g.attr("max");k&&(o.minDate=d.scroller.parseDate(e,k));g&&(o.maxDate=d.scroller.parseDate(e,g))}var c=d.extend({},F,o,q.settings),g=0,o=[],r=[],i={},p={y:"getFullYear",m:"getMonth",d:"getDate",h:function(a){a=a.getHours();a=z&&12<=a?a-12:a;return n(a,C)},i:function(a){return n(a.getMinutes(),G)},
s:function(a){return n(a.getSeconds(),K)},ap:function(a){return y&&11<a.getHours()?1:0}},w=c.preset,u=c.dateOrder,x=c.timeWheels,s=u.match(/D/),y=x.match(/a/i),z=x.match(/h/),E="datetime"==w?c.dateFormat+c.separator+c.timeFormat:"time"==w?c.timeFormat:c.dateFormat,H=new Date,C=c.stepHour,G=c.stepMinute,K=c.stepSecond,D=c.minDate,B=c.maxDate;e=e?e:E;if(w.match(/date/i)){d.each(["y","m","d"],function(a,b){a=u.search(RegExp(b,"i"));-1<a&&r.push({o:a,v:b})});r.sort(function(a,b){return a.o>b.o?1:-1});
d.each(r,function(a,b){i[b.v]=a});for(var k={},a=0;3>a;a++)if(a==i.y){g++;k[c.yearText]={};for(var b=D?D.getFullYear():c.startYear,Q=B?B.getFullYear():c.endYear;b<=Q;b++)k[c.yearText][b]=u.match(/yy/i)?b:(b+"").substr(0,4)}else if(a==i.m){g++;k[c.monthText]={};for(b=0;12>b;b++)k[c.monthText][b]=u.match(/MM/)?c.monthNames[b]:u.match(/M/)?c.monthNamesShort[b]:u.match(/mm/)&&9>b?"0"+(b+1):b+1}else if(a==i.d){g++;k[c.dayText]={};for(b=1;32>b;b++)k[c.dayText][b]=u.match(/dd/i)&&10>b?"0"+b:b}o.push(k)}if(w.match(/time/i)){r=
[];d.each(["h","i","s"],function(a,b){a=x.search(RegExp(b,"i"));-1<a&&r.push({o:a,v:b})});r.sort(function(a,b){return a.o>b.o?1:-1});d.each(r,function(a,b){i[b.v]=a});k={};for(a=0;3>a;a++)if(a==i.h){i.h=g++;k[c.hourText]={};for(b=0;b<(z?12:24);b+=C)k[c.hourText][b]=z&&0==b?12:x.match(/hh/i)&&10>b?"0"+b:b}else if(a==i.i){i.i=g++;k[c.minuteText]={};for(b=0;60>b;b+=G)k[c.minuteText][b]=x.match(/ii/)&&10>b?"0"+b:b}else if(a==i.s){i.s=g++;k[c.secText]={};for(b=0;60>b;b+=K)k[c.secText][b]=x.match(/ss/)&&
10>b?"0"+b:b}y&&(i.ap=g++,g=x.match(/A/),k[c.ampmText]={"0":g?"AM":"am",1:g?"PM":"pm"});o.push(k)}q.setDate=function(a,b,c){for(var d in i)this.temp[i[d]]=a[p[d]]?a[p[d]]():p[d](a);this.setValue(!0,b,c)};q.getDate=function(a){return m(a)};return{wheels:o,headerText:function(){return d.scroller.formatDate(E,m(q.temp),c)},formatResult:function(a){return d.scroller.formatDate(e,m(a),c)},parseValue:function(a){var b=new Date,g=[];try{b=d.scroller.parseDate(e,a,c)}catch(j){}for(var k in i)g[i[k]]=b[p[k]]?
b[p[k]]():p[k](b);return g},validate:function(a,b){var e=q.temp,g={m:0,d:1,h:0,i:0,s:0,ap:0},k={m:11,d:31,h:n(z?11:23,C),i:n(59,G),s:n(59,K),ap:1},m=!0,o=!0;d.each(D||B?"y,m,d,ap,h,i,s".split(","):b==i.y||b==i.m||void 0===b?["d"]:[],function(b,l){if(void 0!==i[l]){var z=g[l],f=k[l],n=31,v=j(e,l),q=d("ul",a).eq(i[l]),w,r;"d"==l&&(w=j(e,"y"),r=j(e,"m"),f=n=32-(new Date(w,r,32)).getDate(),s&&d("li",q).each(function(){var a=d(this),b=a.data("val"),e=(new Date(w,r,b)).getDay();a.html(u.replace(/[my]/gi,
"").replace(/dd/,10>b?"0"+b:b).replace(/d/,b).replace(/DD/,c.dayNames[e]).replace(/D/,c.dayNamesShort[e]))}));m&&D&&(z=D[p[l]]?D[p[l]]():p[l](D));o&&B&&(f=B[p[l]]?B[p[l]]():p[l](B));if("y"!=l){var x=d('li[data-val="'+z+'"]',q).index(),y=d('li[data-val="'+f+'"]',q).index();d("li",q).removeClass("dw-v").slice(x,y+1).addClass("dw-v");"d"==l&&d("li",q).removeClass("dw-h").slice(n).addClass("dw-h");v<z&&(v=z);v>f&&(v=f)}m&&(m=v==z);o&&(o=v==f);if(c.invalid&&"d"==l){var E=[];c.invalid.dates&&d.each(c.invalid.dates,
function(a,b){b.getFullYear()==w&&b.getMonth()==r&&E.push(b.getDate()-1)});if(c.invalid.daysOfWeek){var C=(new Date(w,r,1)).getDay();d.each(c.invalid.daysOfWeek,function(a,b){for(var c=b-C;c<n;c=c+7)c>=0&&E.push(c)})}c.invalid.daysOfMonth&&d.each(c.invalid.daysOfMonth,function(a,b){b=(b+"").split("/");b[1]?b[0]-1==r&&E.push(b[1]-1):E.push(b[0]-1)});d.each(E,function(a,b){d("li",q).eq(b).removeClass("dw-v")})}}})},methods:{getDate:function(a){var b=d(this).scroller("getInst");if(b)return b.getDate(a?
b.temp:b.values)},setDate:function(a,b,c){void 0==b&&(b=!1);return this.each(function(){var e=d(this).scroller("getInst");e&&e.setDate(a,b,c)})}}}};d.scroller.presets.date=s;d.scroller.presets.datetime=s;d.scroller.presets.time=s;d.scroller.formatDate=function(q,j,n){if(!j)return null;for(var n=d.extend({},F,n),m=function(d){for(var e=0;c+1<q.length&&q.charAt(c+1)==d;)e++,c++;return e},g=function(c,d,e){d=""+d;if(m(c))for(;d.length<e;)d="0"+d;return d},o=function(c,d,e,g){return m(c)?g[d]:e[d]},e=
"",k=!1,c=0;c<q.length;c++)if(k)"'"==q.charAt(c)&&!m("'")?k=!1:e+=q.charAt(c);else switch(q.charAt(c)){case "d":e+=g("d",j.getDate(),2);break;case "D":e+=o("D",j.getDay(),n.dayNamesShort,n.dayNames);break;case "o":e+=g("o",(j.getTime()-(new Date(j.getFullYear(),0,0)).getTime())/864E5,3);break;case "m":e+=g("m",j.getMonth()+1,2);break;case "M":e+=o("M",j.getMonth(),n.monthNamesShort,n.monthNames);break;case "y":e+=m("y")?j.getFullYear():(10>j.getYear()%100?"0":"")+j.getYear()%100;break;case "h":var r=
j.getHours(),e=e+g("h",12<r?r-12:0==r?12:r,2);break;case "H":e+=g("H",j.getHours(),2);break;case "i":e+=g("i",j.getMinutes(),2);break;case "s":e+=g("s",j.getSeconds(),2);break;case "a":e+=11<j.getHours()?"pm":"am";break;case "A":e+=11<j.getHours()?"PM":"AM";break;case "'":m("'")?e+="'":k=!0;break;default:e+=q.charAt(c)}return e};d.scroller.parseDate=function(q,j,n){var m=new Date;if(!q||!j)return m;for(var j="object"==typeof j?j.toString():j+"",g=d.extend({},F,n),n=m.getFullYear(),o=m.getMonth()+
1,e=m.getDate(),k=-1,c=m.getHours(),m=m.getMinutes(),r=0,i=-1,p=!1,w=function(c){(c=y+1<q.length&&q.charAt(y+1)==c)&&y++;return c},u=function(c){w(c);c=j.substr(s).match(RegExp("^\\d{1,"+("@"==c?14:"!"==c?20:"y"==c?4:"o"==c?3:2)+"}"));if(!c)return 0;s+=c[0].length;return parseInt(c[0],10)},x=function(c,d,e){c=w(c)?e:d;for(d=0;d<c.length;d++)if(j.substr(s,c[d].length).toLowerCase()==c[d].toLowerCase())return s+=c[d].length,d+1;return 0},s=0,y=0;y<q.length;y++)if(p)"'"==q.charAt(y)&&!w("'")?p=!1:s++;
else switch(q.charAt(y)){case "d":e=u("d");break;case "D":x("D",g.dayNamesShort,g.dayNames);break;case "o":k=u("o");break;case "m":o=u("m");break;case "M":o=x("M",g.monthNamesShort,g.monthNames);break;case "y":n=u("y");break;case "H":c=u("H");break;case "h":c=u("h");break;case "i":m=u("i");break;case "s":r=u("s");break;case "a":i=x("a",["am","pm"],["am","pm"])-1;break;case "A":i=x("A",["am","pm"],["am","pm"])-1;break;case "'":w("'")?s++:p=!0;break;default:s++}100>n&&(n+=(new Date).getFullYear()-(new Date).getFullYear()%
100+(n<=g.shortYearCutoff?0:-100));if(-1<k){o=1;e=k;do{g=32-(new Date(n,o-1,32)).getDate();if(e<=g)break;o++;e-=g}while(1)}c=new Date(n,o-1,e,-1==i?c:i&&12>c?c+12:!i&&12==c?0:c,m,r);if(c.getFullYear()!=n||c.getMonth()+1!=o||c.getDate()!=e)throw"Invalid date";return c}})(jQuery);


(function($){ 
     $.fn.extend({  
         limit: function(limit,element) {
			
			var interval, f;
			var self = $(this);
					
			$(this).focus(function(){
				interval = window.setInterval(substring,100);
			});
			
			$(this).blur(function(){
				clearInterval(interval);
				substring();
			});
			
			substringFunction = "function substring(){ var val = $(self).val();var length = val.length;if(length > limit){$(self).val($(self).val().substring(0,limit));}";
			if(typeof element != 'undefined')
				substringFunction += "if($(element).html() != limit-length){$(element).html((limit-length<=0)?'0':limit-length);}"
				
			substringFunction += "}";
			
			eval(substringFunction);
			
			
			
			substring();
			
        } 
    }); 
})(jQuery);

$(window).ready(function() {

  $("#huisnummer,#postcode").blur(function() {
	  
	  if($("#postcode").val() != "" && $("#huisnummer").val() != "")
	  {
		$("#ajaxloader1").show(); 	  
			  
	    $.ajax({
		  data: {
			p: $("#postcode").val(),
			h: $("#huisnummer").val()
		  },
		  dataType: 'json',
		  url: 'http://www.bloemetjebestellen.mobi/script/adres-ophalen.php',
		  success: function(res) {
			$("#adres").val(res.address);
			$("#plaats").val(res.city);	
			
			if($("#huisnummer").val() != "" && $("#postcode").val() != ""){
				$("#opdrachtgeverfield").show('fast');
			}		
			if($('#particulierkeuzeont').is(':checked')){$('#bedrijfsnaam').hide('fast'); $('#naam').focus();}
			if($('#bedrijfkeuzeont').is(':checked')){$('#bedrijfsnaam').show('fast'); $('#bedrijfsnaam').focus();}	
						
			$("#ajaxloader1").hide(); 
			$("#adresdiv").show('fast');
			$("#errorpostcode").hide('fast')			
		  },
		  error: function() {
			$("#ajaxloader1").hide(); 
			$("#adresdiv").show('fast');   
			$("#errorpostcode").html("De postcode kon niet gecontroleerd worden, vul de gegevens verder aan");
			$("#errorpostcode").show('fast');
			$("#postcodehuisnummer").hide();
		  }
		});
		
		$("#postcodevergetentekst").hide();
		$("#postcodewetentekst").hide();
	  }	  		
  });
});

$(document).ready(function(){
	
	
	$('ul li:nth-child(1) a').toggleClass("active");
  
   $('ul li a').click(function(){
   	$('.sluiten').hide();
   	$('.active').toggleClass('active');
   	$(this).toggleClass("active");
   	
   	
   	var dinges = $(this).attr('title');
   	$("#" + dinges).show();
   }
  
    
    
    
 
    
	

 );
   
});


$(window).ready(function() {

  $("#klanthuisnummer,#klantpostcode").blur(function() {
	  
	  if($("#klantpostcode").val() != "" && $("#klanthuisnummer").val() != "")
	  {
		$("#ajaxloader1").show(); 	  
			  
	    $.ajax({
		  data: {
			p: $("#klantpostcode").val(),
			h: $("#klanthuisnummer").val()
		  },
		  dataType: 'json',
		  url: 'http://www.bloemetjebestellen.mobi/script/adres-ophalen2.php',
		  success: function(res) {
			$("#klantstraatnaam").val(res.address);
			$("#klantplaats").val(res.city);	
			
			if($("#klanthuisnummer").val() != "" && $("#klantpostcode").val() != ""){
				$("#opdrachtgeverfield").show('fast');
			}		
			if($('#particulierkeuzeont').is(':checked')){$('#bedrijfsnaam').hide('fast'); $('#naam').focus();}
			if($('#bedrijfkeuzeont').is(':checked')){$('#bedrijfsnaam').show('fast'); $('#bedrijfsnaam').focus();}	
						
			$("#ajaxloader1").hide(); 
			$("#adresdiv").show('fast');
			$("#errorpostcode").hide('fast')			
		  },
		  error: function() {
			$("#ajaxloader1").hide(); 
			$("#adresdiv").show('fast');   
			$("#errorpostcode").html("De postcode kon niet gecontroleerd worden, vul de gegevens verder aan");
			$("#errorpostcode").show('fast');
			$("#postcodehuisnummer").hide();
		  }
		});
		
		$("#postcodevergetentekst").hide();
		$("#postcodewetentekst").hide();
	  }	  		
  });
});
