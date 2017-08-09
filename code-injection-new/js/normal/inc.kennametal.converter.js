



























//Adjusts titlebar size
function adjust() {
	$('#titlebar').width($(window).width()*0.5);
	$('#titlebar').height($(window).height()*0.07);
	
	var image_url = $('.ui-page').css('background-image'),
    image;

	image_url = image_url.match(/^url\("?(.+?)"?\)$/);
    image_url = image_url[1];
    image = new Image();
    image.src = image_url;
	
	$('#titlebar').margin({top: image.height*0.25});
	
	
}

$(document).ready(function() {
	
	
	//load search list
	var i=0;
	$.ajax({
		type: 'GET',
		url: 'resources/CrossGeometry.xml',
		dataType: 'xml',
		success: function parseXML(xml){
			$(xml).find('DATA_RECORD').each(function() {
				//adds link of COMPETITOR - PART
				$("#list").append("<li data-corners='false' data-shadow='false' datawrapperels='div' class='ui-btn ui-li ui-btn-up-c'><div class='ui-btn-innner ui-li'><div class='ui-btn-text'><a href='#index.html' id='"+(i++)+"' title='Geometry' class='ui-link-inherit'>"+$(this).find('COMPETITOR_NAME').text()+" - "+$(this).find('COMPETITOR_PRODUCT_ID').text()+"</a></div></div></li>");		
	  });
	  
	  //upon clicking item in list, sends to index and shows results
	  $("#list li").each(function(){
	  var thisId = $(this).find("a").attr("id");
	  $(this).find("a").click(function(){
	  		window.localStorage.clear();
			searchclick = true;
			window.localStorage.setItem("searchclick",searchclick);
			//pass all variables to local variables
			value = $("#"+thisId).text().split(" - ");
			window.localStorage.setItem("company",value[0]);
			window.localStorage.setItem("part",value[1]);
			gradegeo = $("#"+thisId).attr("title");
			window.localStorage.setItem("gradegeo",gradegeo);
			window.location.href = "index.html";
		});
		});
		}
	});
	//same as last, but for Grade
	$.ajax({
		type: 'GET',
		url: 'resources/CrossGrade.xml',
		dataType: 'xml',
		success: function parseXML(xml){
			$(xml).find('DATA_RECORD').each(function() {
				$("#list").append("<li data-corners='false' data-shadow='false' datawrapperels='div' class='ui-btn ui-li ui-btn-up-c'><div class='ui-btn-innner ui-li'><div class='ui-btn-text'><a href='#index.html' id='"+(i++)+"' title='Grade' class='ui-link-inherit'>"+$(this).find('COMPETITOR_NAME').text()+" - "+$(this).find('COMPETITOR_PRODUCT_ID').text()+"</a></div></div></li>");		
	  });
	  $("#list li").each(function(){
		  var thisId = $(this).find("a").attr("id");
		  $(this).find("a").click(function(){
				window.localStorage.clear();
				searchclick = true;
				window.localStorage.setItem("searchclick",searchclick);
				//pass all variables to local variables
				value = $("#"+thisId).text().split(" - ");
				window.localStorage.setItem("company",value[0]);
				window.localStorage.setItem("part",value[1]);
				gradegeo = $("#"+thisId).attr("title");
				window.localStorage.setItem("gradegeo",gradegeo);
				window.location.href = "index.html";
			});
		});
		}
	});
	//sends back to index page
	$("#searchback").click(function(){
		window.location.href = "index.html";
	});
});

//adjusts titlebar size
function adjust() {
	$('#titlebar').width($(window).width()*0.5);
	$('#titlebar').height($(window).height()*0.07);
	
	var image_url = $('.ui-page').css('background-image'),
    image;

	image_url = image_url.match(/^url\("?(.+?)"?\)$/);
    image_url = image_url[1];
    image = new Image();
    image.src = image_url;
	
	$('#titlebar').margin({top: image.height*0.25});
	
	
}
	
$(document).ready(function() {
//remove breaks from page, not sure why, but they are generated in the DOM
$("#gradegeoradio").removeClass("ui-br");
$("#compselparent").removeClass("ui-br");
$("#partselparent").removeClass("ui-br");

//for manufacturer names
manuNames = "";
//grade or geometry selection
gradegeo = "";
//competitor selection
cselected = "";
//part selection
pselected = "";
//for part names
partNames = "";	
//initiaze image directory array
imagedir = [];
z=0;
//gets image directory so that ajax does not need to check for every image
$.ajax({
	type: 'GET',
	url: 'resources/ImageDir.xml',
	dataType: 'xml',
	success: function parseXML(xml){
		$(xml).find('DATA_RECORD').each(function() {
		imagedir[z] = $(this).find('IMAGE_NAME').text();
		z++;
		});
	}
});

	//reads xml and changes compsel according to grade or geometry selection
	$("#geometry, #grade").click(function(){
		if(searchclick == false){gradegeo = $(this).val();}else{gradegeo = gradegeoS}
		//used for numbering selection
		var i=0;
		if (gradegeo == "Geometry"){ 
			$.ajax({
				type: 'GET',
				url: 'resources/CrossGeometry.xml',
				dataType: 'xml',
				success: function parseXML(xml){
					//next 3 lines adds a default "company select" value so that  it doesnt auto-select the first competitor
					$('#compsel').find('option').remove().end();
					$("#compsel").append("<option value='"+(i++)+"'>Select Competitor</option>");
					//changes selected index and display to default value
					document.getElementById("compsel").selectedIndex = 0;
					$("#compselparent div div span span span").text("Select Competitor");
					//find competitors for selection
					$(xml).find('DATA_RECORD').each(function() {
					manuNames = $(this).find('COMPETITOR_NAME').text();
					//replaces item names that have spaces with underscores so that they can be used for tags
					manuId = manuNames.replace(" ","_");
					//ensures no duplicates
					if($("#"+manuId).length==0){
						$("#compsel").append("<option value='"+(i++)+"'id='"+manuId+"'>"+manuNames+"</option>");
					}
				});
				  if(searchclick == true){
					  index = document.getElementById(companyS.replace(" ","_")).getAttribute("value");
					  document.getElementById("compsel").selectedIndex = index;
					  $("#compselparent div div span span span").text(companyS);
					  $("#compsel").change();
				  }				
				}
			});
		}else if (gradegeo == "Grade"){ 
			$.ajax({
				type: 'GET',
				url: 'resources/CrossGrade.xml',
				dataType: 'xml',
				success: function parseXML(xml){
					//same as last, but for Grade
					$('#compsel').find('option').remove().end();
					$("#compsel").append("<option value='"+(i++)+"'>Select Competitor</option>");
					document.getElementById("compsel").selectedIndex = 0;
					$("#compselparent div div span span span").text("Select Competitor");
					$(xml).find('DATA_RECORD').each(function() {
					manuNames = $(this).find('COMPETITOR_NAME').text();
					manuId = manuNames.replace(" ","_");
					if($("#"+manuId).length==0){
						$("#compsel").append("<option value='"+(i++)+"'id='"+manuId+"'>"+manuNames+"</option>");
					}
				});
				  if(searchclick == true){
					  index = document.getElementById(companyS.replace(" ","_")).getAttribute("value");
					  document.getElementById("compsel").selectedIndex = index;
					  $("#compselparent div div span span span").text(companyS);
					  $("#compsel").change();
				  }
				}
			});
		}		
		//clear current parts and add selection
		if(searchclick==false){
			$('#partsel').find('option').remove().end();
			$("#partsel").append("<option value= '0'>Select "+gradegeo+"</option>");
			document.getElementById("partsel").selectedIndex = 0;
			$("#partselparent div div span span span").text("Select "+gradegeo);
		}
		//change hedings for table
		if (gradegeo == "Geometry"){
			$("#iso2").text("Higher");
			$("#iso3").text("Lower");
		}else if (gradegeo == "Grade"){
			$("#iso2").text("Wear Resistance");
			$("#iso3").text("Tougher");
		}
		//show or remove selectors
		$("#info").addClass("ui-hidden-accessible");
		$("#compselparent").removeClass("ui-hidden-accessible");
	
			$("#partselparent").addClass("ui-hidden-accessible");
		
	});

	//changes partsel according to selection in compsel
	$("#compsel").change(function() {
		cselected = $("#compsel option:selected").text();
		//used for numbering selection
		var i=0;
		if (gradegeo == "Geometry"){
			$.ajax({
				type: 'GET',
				url: 'resources/CrossGeometry.xml',
				dataType: 'xml',
				success: function parseXML(xml){
					//next 3 lines adds a default "part select" value so that  it doesnt auto-select the first part
					$("#partsel").find('option').remove().end();
					$("#partsel").append("<option value= '"+(i++)+"'>Select "+gradegeo+"</option>");
					//changes selected index and text to default
					document.getElementById("partsel").selectedIndex = 0;
					$("#partselparent div div span span span").text("Select "+gradegeo);
					//finds all part names for selected company
					$(xml).find('DATA_RECORD').each(function() {
						if($(this).find('COMPETITOR_NAME').text() == cselected){
							partNames = $(this).find('COMPETITOR_PRODUCT_ID').text();
							$("#partsel").append("<option value='"+(i++)+"'id='"+partNames+"'>"+partNames+"</option>");
						}
					});
					if(searchclick == true){
					  index = document.getElementById(partS).getAttribute("value");
					  document.getElementById("partsel").selectedIndex = index;
					  $("#partselparent div div span span span").text(partS);
					  $("#partsel").change();
				  }
				}
			});
		}else if(gradegeo == "Grade"){
			$.ajax({
				type: 'GET',
				url: 'resources/CrossGrade.xml',
				dataType: 'xml',
				success: function parseXML(xml){
					//same as last, but for Grade
					$('#partsel').find('option').remove().end();
					$("#partsel").append("<option value= '"+(i++)+"'>Select "+gradegeo+"</option>");
					document.getElementById("partsel").selectedIndex = 0;
					$("#partselparent div div span span span").text("Select "+gradegeo);
					$(xml).find('DATA_RECORD').each(function() {
						if($(this).find('COMPETITOR_NAME').text() == cselected){
							partNames = $(this).find('COMPETITOR_PRODUCT_ID').text();
							$("#partsel").append("<option value='"+(i++)+"'id='"+partNames+"'>"+partNames+"</option>");
						}
				});
				if(searchclick == true){
					  index = document.getElementById(partS).getAttribute("value");
					  document.getElementById("partsel").selectedIndex = index;
					  $("#partselparent div div span span span").text(partS);
					  $("#partsel").change();
				  }
				}
			});
		}
		
		//to delay so that variable i can catch up and show true
		
			//shows part selector after competitor is chosen
		    $("#partselparent").removeClass("ui-hidden-accessible");
		
		
	});
	
	//initialize values for KMT equivalents to chosen part
	KMT1 = "";
	KMT2 = "";
	KMT3 = "";
	//makes sure table isnt displayed after same selection
	prevpsel="";
	//find part in material and add information to table
	$("#partsel").change(function() {
		for(var i=1;i<=3;i++){
		//clear before rewriting
			$("#p"+i).text("");
			$("#m"+i).text("");
			$("#p"+i).text("");
			$("#k"+i).text("");
			$("#n"+i).text("");
			$("#s"+i).text("");
			$("#h"+i).text("");
		}
		
		pselected = $("#partsel option:selected").text();
		if (gradegeo == "Geometry"){
			$.ajax({
					type: 'GET',
					url: 'resources/CrossGeometry.xml',
					dataType: 'xml',
					success: function parseXML(xml){
						$(xml).find('DATA_RECORD').each(function() {
							//finds Kennametal equivalents to part selected, uses try in case of no data aside form direct cross
							if($(this).find('COMPETITOR_NAME').text() == cselected && $(this).find('COMPETITOR_PRODUCT_ID').text() == pselected){
								try{
									KMT1 = $(this).find('REFERENCE_PRODUCT_ID1').text();
									getMaterial(KMT1,1);
								}catch(err){}
								try{
									KMT2 = $(this).find('REFERENCE_PRODUCT_ID2').text();
									getMaterial(KMT2,2);
								}catch(err){}
								try{
									KMT3 = $(this).find('REFERENCE_PRODUCT_ID3').text();
									getMaterial(KMT3,3);
								}catch(err){}
							}
						});
					}
			});
		}else if (gradegeo == "Grade"){
			$.ajax({
					type: 'GET',
					url: 'resources/CrossGrade.xml',
					dataType: 'xml',
					success: function parseXML(xml){
						$(xml).find('DATA_RECORD').each(function() {
							//same as last, but for Grade
							if($(this).find('COMPETITOR_NAME').text() == cselected && $(this).find('COMPETITOR_PRODUCT_ID').text() == pselected){
								try{
									KMT1 = $(this).find('REFERENCE_PRODUCT_ID1').text();
									getMaterial(KMT1,1);
								}catch(err){}
								try{
									KMT2 = $(this).find('REFERENCE_PRODUCT_ID2').text();
									getMaterial(KMT2,2);
								}catch(err){}
								try{
									KMT3 = $(this).find('REFERENCE_PRODUCT_ID3').text();
									getMaterial(KMT3,3);
								}catch(err){}
							}
						});
					}
			});
		}
		//makes sure table isnt displayed after same selection, displays results
		if($("#compsel option:selected").val()!="0" && ($("#partsel option:selected").val()!="0" && prevpsel!=pselected)){
			//show table after selection
			$("#popupPhoto").text("");
			$("#home").removeClass("ui-page-active");
			$("#results").addClass("ui-page-active");
			//title for results
			$("#resultshead").text(cselected+" - "+pselected);
			}else{
				prevpsel = pselected;
				$('#partsel').find('option').remove().end();
				$("#partsel").append("<option value= '0'>Select "+gradegeo+"</option>");
		}
	});
	
	//link to help page
	$("#helpbutton").click(function(){
		window.location.href = "help.html";
	});
	//link to search page
	$("#searchbutton").click(function(){
		window.location.href = "search.html";
	});
	
//checks if search was clicked
try{
	//grab variables set in search
	if(window.localStorage.getItem("searchclick") == "true"){
		searchclick = true;	
	}else{searchclick = false}
	gradegeoS = window.localStorage.getItem("gradegeo");
	var companyS = window.localStorage.getItem("company");
	var partS = window.localStorage.getItem("part");
	if(gradegeoS == "Geometry"){
		$("#geometry").click();
		$("#geolabel").addClass("ui-btn-hover-c");
		$("#geolabel").addClass("ui-radio-on");
		$("#geolabel").addClass("ui-btn-active");
	}else if(gradegeoS == "Grade"){
		$("#grade").click();
		$("#gradelabel").addClass("ui-btn-hover-c");
		$("#gradelabel").addClass("ui-radio-on");
		$("#gradelabel").addClass("ui-btn-active");
	}
	//clear local variables after being used
	window.localStorage.clear();
}catch(err){alert(err);}
	
});

//shows images upon clicking part in table
function tableSelect(location){
	//remove previous images
	$("#popupPhoto").text("");
	//if image was added or not
	var boolean = false;
	//splits part names
	var part = $("#table"+location).text().split(" ");
	//part[0] always empty
	for(var i=1;i<part.length;i++){																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																													
		//so 11 works
		if(part[i] == "11"){
			part[i]="OO";
		}
		//runs through every name in imagedir to see if image exists
		for(var j=0;j<imagedir.length;j++){
			//check if single image
			if(part[i] == imagedir[j]){
				$("#popupPhoto").append($("<img>", {src: "images/gradegeoImages/"+part[i].toLowerCase()+".png", "class": 'popphoto', alt: part[i] }));
				boolean = true;
				break;
			//checks if double image
			}else if(part[i].concat("1") == imagedir[j]){
				$("#popupPhoto").append($("<img>", {src: 'images/gradegeoImages/'+part[i].toLowerCase()+'1.png', "class": 'popphoto', alt: part[i].concat("1") }));
				$("#popupPhoto").append($("<img>", {src: 'images/gradegeoImages/'+part[i].toLowerCase()+'2.png', "class": 'popphoto', alt: part[i].concat("2") }));
				boolean = true;
				break;
			}
		}
		//if no images, display "No information available"
		if(boolean == false){
			$("#popupPhoto").append($("<div>", {text: 'No information availabe for '+gradegeo+' of '+part[i]}));
		}
	}
	//show images
	$("#popupPhoto").addClass("ui-popup-active");
	
}

//checks if image is part of image directory (imagedir)
function imageExists(part){
	//so 11 works
	if(part == "11"){
			part="OO";
		}
		for(var j=0;j<imagedir.length;j++){
			//checks single image
			if(part == imagedir[j]){
				return true;
			//checks double image
			}else if(part.concat("1") == imagedir[j]){
				return true;
			}
		}	
}

//close Results page
function closeResults(){
	$("#home").addClass("ui-page-active");
	$("#results").removeClass("ui-page-active");
	if(searchclick == true){searchclick = false;}
}

//get materials for KMT products
function getMaterial(KMT,col){
	//initialize possible Kennametal equivalents
	var KMTs = KMT.split(',');
	//iitialize boolean for material used
	var P = false;
	//initialize number of images available for display
	var pcount = 0;
	var M = false;
	var mcount = 0;
	var K = false;
	var kcount = 0;
	var N = false;
	var ncount = 0;
	var S = false;
	var scount = 0;
	var H = false;
	var hcount = 0;
		    
	//inset links for each table slot, &nbsp used for empties
	$("#p"+col).append($("<a>", {href: '#', id: 'tablep'+col,"class": 'ui-link-inherit',click: function() { tableSelect('p'+col); }})).append("&nbsp;");
	$("#p"+col).removeClass("ui-icon-search");
	$("#m"+col).append($("<a>", {href: '#', id: 'tablem'+col,"class": 'ui-link-inherit',click: function() { tableSelect('m'+col); }})).append("&nbsp;");
	$("#m"+col).removeClass("ui-icon-search");
	$("#k"+col).append($("<a>", {href: '#', id: 'tablek'+col,"class": 'ui-link-inherit',click: function() { tableSelect('k'+col); }})).append("&nbsp;");
	$("#k"+col).removeClass("ui-icon-search");
	$("#n"+col).append($("<a>", {href: '#', id: 'tablen'+col,"class": 'ui-link-inherit',click: function() { tableSelect('n'+col); }})).append("&nbsp;");
	$("#n"+col).removeClass("ui-icon-search");
	$("#s"+col).append($("<a>", {href: '#', id: 'tables'+col,"class": 'ui-link-inherit',click: function() { tableSelect('s'+col); }})).append("&nbsp;");
	$("#s"+col).removeClass("ui-icon-search");
	$("#h"+col).append($("<a>", {href: '#', id: 'tableh'+col,"class": 'ui-link-inherit',click: function() { tableSelect('h'+col); }})).append("&nbsp;");
	$("#h"+col).removeClass("ui-icon-search");

	//checks materials for each KMT equivalent and changes value of true/false from string to boolean, also checks if images available
	$.ajax({
			type: 'GET',
			url: 'resources/Material.xml',
			dataType: 'xml',
			success: function parseXML(xml){
				for(var s=0;s<KMTs.length;s++){
					$(xml).find('DATA_RECORD').each(function() {
						if($(this).find('KMT').text() == KMTs[s]){
							if($(this).find('P').text()=="true"){
								P=true;
								if(imageExists(KMTs[s])==true){
									pcount++;
								}
							}if($(this).find('M').text()=="true"){
								M=true;
								if(imageExists(KMTs[s])==true){
									mcount++;
								}
							}if($(this).find('K').text()=="true"){
								K=true;
								if(imageExists(KMTs[s])==true){
									kcount++;
								}
							}if($(this).find('N').text()=="true"){
								N=true;
								if(imageExists(KMTs[s])==true){
									ncount++;
								}
							}if($(this).find('S').text()=="true"){
								S=true;
								if(imageExists(KMTs[s])==true){
									scount++;
								}
							}if($(this).find('H').text()=="true"){
								H=true;
								if(imageExists(KMTs[s])==true){
									hcount++;
								}
							}
							 setMaterial(KMTs[s],P,M,K,N,S,H,col);
						}
					});
					//if number images are equivalent to number of KMT equivalents, then display magnifying glass
					if(pcount<=KMTs.length && pcount>0){$("#p"+col).addClass("ui-icon-search");}
					if(mcount<=KMTs.length && mcount>0){$("#m"+col).addClass("ui-icon-search");}
					if(kcount<=KMTs.length && kcount>0){$("#k"+col).addClass("ui-icon-search");}
					if(ncount<=KMTs.length && ncount>0){$("#n"+col).addClass("ui-icon-search");}
					if(scount<=KMTs.length && scount>0){$("#s"+col).addClass("ui-icon-search");}
					if(hcount<=KMTs.length && hcount>0){$("#h"+col).addClass("ui-icon-search");}
				}
			}
	});
}

//add KMT equivalent to proper material in table
function setMaterial(KMT,P,M,K,N,S,H,col){
	if(P==true){$("#p"+col).children("a").append(" "+KMT);}
	if(M==true){$("#m"+col).children("a").append(" "+KMT);}
	if(K==true){$("#k"+col).children("a").append(" "+KMT);}
	if(N==true){$("#n"+col).children("a").append(" "+KMT);}
	if(S==true){$("#s"+col).children("a").append(" "+KMT);}
	if(H==true){$("#h"+col).children("a").append(" "+KMT);}	
}

//Adjusts image sizes according to page
function adjust() {
	$('#titlebar').width($(window).width()*0.5);
	$('#titlebar').height($(window).height()*0.07);
	
	var image_url = $('.ui-page').css('background-image'),
    image;

	image_url = image_url.match(/^url\("?(.+?)"?\)$/);
    image_url = image_url[1];
    image = new Image();
    image.src = image_url;
	
	$('#titlebar').margin({top: image.height*0.25});
	
	$('#materialtable').width($(window).width()*0.9);
	
	$('#gradehelp').width($(window).width()*0.9);
	
	$('#geohelp').width($(window).width()*0.9);
	
}

$(document).ready(function() {
    $("#countryselparent").removeClass("ui-br");
	//gets CAS data
	$.ajax({
	  type: 'GET',
	  url: 'resources/CAS.xml',
	  dataType: 'xml',
	  success: function parseXML(xml){
		  $(xml).find('DATA_RECORD').each(function() {
			  country = $(this).find('COUNTRY').text();
			  countryId = country.replace(" ","_");
			  $("#countrysel").append("<option value='"+country+"'id='"+countryId+"'>"+country+"</option>");
			  
	  });
	  
	  }
  });
	//upon contry selection, gets CAS contact information
	$("#countrysel").change(function() {
		cselect = $("#countrysel option:selected").text();
			$.ajax({
				type: 'GET',
				url: 'resources/CAS.xml',
				dataType: 'xml',
				success: function parseXML(xml){
					$(xml).find('DATA_RECORD').each(function() {
						if($(this).find('COUNTRY').text() == cselect){
							$("#country1").text(cselect);
							$("#language1").text($(this).find('LANGUAGE').text());
							$("#phonelink").text($(this).find('PHONE').text());
							$("#fax1").text($(this).find('FAX').text());
							$("#emaillink").text($(this).find('E-MAIL').text());
						}
				});
				}
			});
		});
		
	//goes back to index page
	$("#helpback").click(function(){
		window.location.href = "index.html";
	});
	//adds link for phone
	$("#phonelink").click(function(){
		window.location.href = "tel:'"+$("#phonelink").text().replace("*","")+"'";
	});
	//adds link for email
	$("#emaillink").click(function(){
		window.location.href = "mailto:'"+$("#emaillink").text()+"'";
	});
	
	//clear search local variables (search)
	window.localStorage.clear();
});


