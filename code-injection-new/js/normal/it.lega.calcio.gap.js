





var url = "";//"http://service4all.orgfree.com/LegaCalcioJWS/";
var url1 = "http://service4all.netau.net/LegaCalcioJWS/";
var url2 = "http://service4all.3owl.com/LegaCalcioJWS/";
var countUrl = 0; 

var toPageId="";
 $(document).bind( "pagechange", function( e, data ) {
	 toPageId = data.toPage.attr("id");

            if(toPageId=="export"){
            	
            	myVar = setTimeout("myRefresh()", 180000);
            }
            else{
            	
            	if(myVar!=null){
            		clearTimeout(myVar);
            		
            	}
            }
        });
 
 function onLoad() {
     document.addEventListener("deviceready", onDeviceReady, false);
 }


 function onDeviceReady() {
     document.addEventListener("resume", onResume, false);
 }

 function onResume() {
	 
	 if(toPageId=="export") myRefresh();
 }
 
	var myVar = null;
	var isSerieAVar = null;
	var typeVAr = null;
	var url_type = "";
	var url_link = "";
	var urlGLB = "";
	var matchGLB="";
	var goals = 
			new Array();
	
	var pdf = 	new Array();
	function callDetail(isA, type, transition, url, match) {
		
		urlGLB = url;
		matchGLB = match;
		 $("#header_detail").html(match);
		if(pdf[url]){
//			var tmp = pdf[url].split("#");
//			
//			if(tmp.length>1){ 
//				url_type = tmp[1];
				url_link = pdf[url];
//			}else{
//				url_type = "";
//				url_link = "";
//			}
		}
		else{
			url_type = "";
			url_link = "";
		}
		callService(isA, type, transition);
	}
	
	function callService(isA, type, transition) {
   	
   		isSerieAVar = isA;
   	
   		
   		if(type!="Dettaglio")	typeVAr = type;
   	
   		if(type=="Dettaglio") $('#contentDetails').html("<div style='min-height: 100%;'></div>");
   		else{
   			$('#contentResult').html("<div style='min-height: 100%;'></div>");
   			$('#contentResult2').html("<div style='min-height: 100%;'></div>");
   		}
   		if(transition){
   			if(type=="Campionato" || type=="Coppe"){
   			$.mobile.changePage($("#export"), { transition: "none"} );
   			}
   			else{
   			$.mobile.changePage($("#export2"), { transition: "none"} );
   			}
   		}
   	   	if(type=="Programmazione" || type=="Calendario"){
   	   		$("#header_export").html("Calendario");
   	   		$("#header_export2").html("Calendario");
   	   	}
   	   	else if(type=="Coppe"){
   	   		$("#header_export").html("Campionato");
   	   		$("#header_export2").html("Campionato");
   	   	}
   	   	else if(type=="Campionato"){
   	   		$("#header_export").html(""+type);
   	   		$("#header_export2").html(""+type);
   	   	}
   	 	else if(type=="Dettaglio"){}
   	   	else{
   	   		$("#header_export").html(""+type);
   	   		$("#header_export2").html(""+type);
   	   	}
   		$.mobile.showPageLoadingMsg();
   		var urlServlet = null;
   		
   		if(type=="Campionato"){
   			urlServlet = url+"realtimeNew.php";
//   			if(isA) urlServlet = "http://service4all.orgfree.com/LegaCalcioJWS/realtimeNew.php";
//   			else urlServlet = "http://service4all.orgfree.com/LegaCalcioJWS/index.php";
   		}
   		else if(type=="Classifica") urlServlet = url+"classifica.php";
   		else if(type=="Programmazione" || type=="Calendario"){ 
   			urlServlet = url+"progSerieA2.php";
   		//	if(isA) urlServlet = url+"progSerieA2.php";
   		//	else urlServlet = url+"programmazione.php";
   		}
   		else if(type=="Dettaglio"){
   			urlServlet = url+"detailNew.php";
   			$.mobile.changePage($("#detail"), { transition: "none"} );
   			$.mobile.showPageLoadingMsg();
   		}
   		else if(type=="Coppe"){ 
   			if(isA) urlServlet = url+"realtimeChampionsNew.php";
   			else urlServlet =  url+"realtimeUefaNew.php";
   		}

   		
   		var targetDiv = "";
   		
   		$.getJSON(urlServlet+"?callback=?",
   			  {
	   			isSerieA : isA,
	   			url : url_link,
	   			url_type : url_type,
	   		    format: "jsonp"
	   		  }, 
	   		  function(data) {
	   			 
		   			if(data.header.SUCCESS=="OK"){
		   				if(type=="Campionato" || type=="Coppe") fillCampionato(data, targetDiv);
		   				else if(type=="Classifica") fillClassifica(data, targetDiv);
		   				else if(type=="Programmazione"  || type=="Calendario") fillProgrammazione(data, targetDiv);
		   				else if(type=="Dettaglio") fillDettaglio(data, targetDiv);
		   				
	   				}
	   				else{
	   					var htmlError = "<ul data-role='listview' data-inset='true'>";
	   					htmlError += "<li><p><div align='center'><strong>"+data.header.MESSAGE+"</strong></div></p></li></ul>";
	   					if(type=="Dettaglio"){
	   						$('#contentDetails').html(htmlError);
	   						$("#detail").trigger("create");
	   					}else{
		   					$('#contentResult').html(htmlError);
		   					$('#contentResult2').html(htmlError);
		   					$("#export").trigger("create");
	   					}
	   					$.mobile.hidePageLoadingMsg();
	   				}
		   		
	   		  })
	   		  .error(function(data) {
	   			  	

	   			  if(countUrl==0){
	   				  url=url1;
	   			 	  callService(isA, type, transition);
	   			  }
	   			  else if(countUrl==1){
	   				  url=url2;
	   				  callService(isA, type, transition);
	   			  }
	   			  else if(countUrl>1){
	   				if(type=="Dettaglio"){
						$('#contentDetails').html("<div align='center'><strong>Problema di rete! Riprova più tardi!</strong></div>");
						$("#detail").trigger("create");
					}else{
		   			  	$('#contentResult').html("<div align='center'><strong>Problema di rete! Riprova più tardi!</strong></div>");
		   				$('#contentResult2').html("<div align='center'><strong>Problema di rete! Riprova più tardi!</strong></div>");
		   				$("#export").trigger("create");
					}
	   				$.mobile.hidePageLoadingMsg();
	   			  }
	   			countUrl++;
	   			});
   
   		
   		
	}
	
	
	

   	function myRefresh(){
   		callService(isSerieAVar,typeVAr,false);
   	}
   	
	function myRefresh2(){
		callDetail(isSerieAVar, "Dettaglio", false, urlGLB, matchGLB);
   		
   	}
   	
   	function series(isA){
   		//callService(isA,$("#header_export").html(),false);
   		callService(isA,"Campionato",false);
   		
   	}
   	
	function coppe(isChampion){
		callService(isChampion,"Coppe",false);
   	}
	function cl(isA){
   		callService(isA,$("#header_export2").html(),isA);
   		//callService(isA,"Classifica",false);
   		
   	}
   	
    function exit(){
    	navigator.app.exitApp();
    }
    
    function home(){
    	
    	$.mobile.changePage($("#home"), { transition: "none"} );
    }
    
    function scorers(i){
    	//$('#contentResultScorer').html(i);
    	$.mobile.changePage($("#scorer"), { transition: "none"} );
    }
    
   	function fillCampionato(data, targetDiv){
   		var a = "";
   		var html = "";
   		var response = data;
   		if(typeVAr=="Coppe"){
   			html = '<div align="center"><b>' + response.header.SERIE	+ '</b></div>';
   			
   		}
   		else if(!isSerieAVar){
   			html = '<div align="center"><b>Serie B - ' + response.header.GIORNATA	+ '</b></div>';
   		}
   		else{
   			html = '<div align="center"><b>Lega Serie A</b></div>';
   		}
   		
   		var items = response.items;
   	//	if(!isSerieAVar && typeVAr!="Coppe") html += "<ul data-role='listview' data-inset='true' id='mylist'>";
   		var lastDate = "";
   		for (i in items) {
   			var data = items[i];
   			if (lastDate != data["DATA"] && (isSerieAVar || !isSerieAVar || typeVAr=="Coppe")){
   				if(lastDate !="") html += "</ul>";
   				html += "<font size='2'><b><i>"+data["DATA"]+"</i><b></font><br/><ul data-role='listview' data-inset='true' id='mylist'>";
   				lastDate = data["DATA"];
   			}
//   			a = "<table><tr valign='middle' align='left'><strong><td><img width='30px' src='img/squadre/"+unescape($.trim(data["CASA"]).replace("(*)","").toLowerCase()).replace(" ","").replace("&nbsp;","")+".png' /></td><td><span style='margin-left:5px;margin-right:5px;'>"+data["CASA"] 
//   			+ " " + data["RISULTATO"] + " "+ data["OSPITE"] +"</span></td><td><img width='30px' src='img/squadre/"+unescape($.trim(data["OSPITE"]).replace("(*)","").toLowerCase()).replace(" ","").replace("&nbsp;","")+".png' /></td></strong></tr>";
//   			//if( data["REALTIME"]=="true") a+="<tr align='center'><td></td><td><i>realtime</i></td><td></td></tr>";
//   			a += "</table>";
   			
   			

//			a = "<div style='valign:middle;float:left;min-width:30px;width:30px' align='left'>" +
//					"<div style='float:left;'>" +
//						"<img width='30px' src='img/squadre/"+unescape($.trim(data["CASA"]).replace("(*)","").toLowerCase()).replace(" ","").replace("&nbsp;","")+".png' />" +
//					"</div>" +
//					"<div style='valign:middle;margin-left:5px;margin-right:5px;float:left'>"+data["CASA"] +
//					"</div>" +
//				"</div>" +
//				"<div style='valign:middle;float:left;min-width:40px;width:40px' > " + data["RISULTATO"] + "" +
//				"</div>" +
//				"<div style='valign:middle;float:left' >" +
//					"<div style='float:left;'> "+ data["OSPITE"] +"" +
//					"</div>" +
//					"<div style='float:left;valign:middle;;min-width:30px;width:30px'>" +
//						"<img width='30px' src='img/squadre/"+unescape($.trim(data["OSPITE"]).replace("(*)","").toLowerCase()).replace(" ","").replace("&nbsp;","")+".png' />" +
//					"</div>" +
//				"</div>";
			
			a="<font size='2'><div class='match'>"+
				"<div class='first_team' >"+
					"<div class='team_logo'>"+
						"<img width='30px' src='img/squadre/"+unescape($.trim(data["CASA"]).replace("(*)","").toLowerCase()).replace(/ /g,"").replace("&nbsp;","")+".png' />" +
					"</div>"+
					"<div class='team_name'>"+
						data["CASA"] +
					"</div>"+
				"</div>"+
				"<div class='score'>"+
					data["RISULTATO"] +
				"</div>"+
				"<div class='second_team' align='right'>"+
					"<div class='team_logo'>"+
						"<img width='30px' src='img/squadre/"+unescape($.trim(data["OSPITE"]).replace("(*)","").toLowerCase()).replace(/ /g,"").replace("&nbsp;","")+".png' />" +
					"</div>"+
					"<div class='team_name'>"+
						data["OSPITE"]+
					"</div>"+
				
				"</div>"+
			"</div></font>";

			
			//if( data["REALTIME"]=="true") a+="<tr align='center'><td></td><td><i>realtime</i></td><td></td></tr>";
		
   			if( data["REALTIME"]=="true") html+="<li data-theme='e'>";
   			else if ( data["REALTIME"]=="TI") html+="<li data-theme='a'>";
   			else html += "<li>";
   			
   		
   			
   			if(data["PDF"]!="" && data["PDF"]!=null){
   				pdf[i] = data["PDF"]; 
   				
   				html+='<a href="#" onclick="callDetail(isSerieAVar,\''+"Dettaglio"+'\',false,\''+i+'\',\''+data["CASA"] +" - "+ data["OSPITE"]+'\');"  >';
   			}
   			else{
   				html+='<table width="100%"><tr><td>';
   			}
   			if(data["REALTIME"]=="true" ) html+="<div align='center'  ><p ><i>realtime "+data["TIME"]+"</i></p></div>";
   			else if(data["REALTIME"]=="TI" ) html+="<div align='center'  ><p ><i>intervallo</i></p></div>";
   			html += "<div align='center'>"+a+"</div>";
   			
   			if(data["PDF"]!="" && data["PDF"]!=null){html+='</a>';}
   			else{html+='</td></tr></table>';}
   			
   			var scorer = data['SCORER'];
   			if(scorer){
	   			var ospiti = scorer.OSPITI;
	   			var casa = scorer.CASA;
	   			if(ospiti.length>0 || casa.length>0){
		   		//	var tmp1 = "<div align='right' ><strong>"+data["OSPITE"].toUpperCase()+"</strong><br/><br/><i>";
		   		//	var tmp2 = "<div align='left' ><strong>"+data["CASA"].toUpperCase()+"</strong><br><br/><i>";
	   				var tmp1 = "<div align='right' ><i>";
			   		var tmp2 = "<div align='left' ><i>";
		   			for (i in ospiti) tmp1 += ospiti[i]+"<br/>";
		   			for (j in casa) tmp2 += casa[j]+"<br/>";
		   			
		   			tmp1 += "</i></div>";
		   			tmp2 += "</i></div>";
		   			
		   			tmp1 = tmp1.replace("[Red]","<img src='img/Red.png' style='margin-top:3px'/>");
		   			tmp2 = tmp2.replace("[Red]","<img src='img/Red.png' style='margin-top:3px'/>");
		   			
		   			tmp1 = tmp1.replace("(11m)","<img src='img/11m.png' />");
		   			tmp2 = tmp2.replace("(11m)","<img src='img/11m.png' />");
		   			html+="<div><ul data-role='listview' data-inset='true'>";
		   			
		   			if(casa.length>0) html+="<li><p><table style='width:100%'><tr><td valign='top'>"+tmp2+"</td></tr></table></li>";
		   			if(ospiti.length>0) html+="<li><table style='width:100%'><tr><td valign='top'>"+tmp1+"</td></tr></table></li>";
	//	   			goals[i] =  "<ul data-role='listview' data-inset='true'><li><div>"+tmp2+tmp1+"</div></li></ul>";
//		   			html+="<div><ul data-role='listview' data-inset='true'><li><p><table style='width:100%'><tr><td valign='top'>"+tmp2+"</td></tr></table></li><li><table style='width:100%'><tr><td valign='top'>"+tmp1+"</td></tr></table></li></ul></div>";
//		   			html+="<li><p><table style='width:100%'><tr><td valign='top'>"+tmp2+"</td></tr></table></li><li><table style='width:100%'><tr><td valign='top'>"+tmp1+"</td></tr></table></li>";
		   			html+="</ul></div>";
	   			}
   			}
   			
   			
   		}
   		html +=  "</li></ul>";

   		$('#contentResult').html(html);
   		$("#export").trigger("create");
   		$('#mylist').listview('refresh');
		$.mobile.hidePageLoadingMsg();
	

   	}

   	
   


   	function fillClassifica(data, targetDiv){
   		
   		var html = "";
   		var response = data;
   		
   		html = '<div align="center"><b>' + response.header.SERIE
   				+ '</b></div>';
   		html += "<ul data-role='listview' data-inset='true'>";

   		var items = response.items;
   		for (i in items) {
   			var data = items[i];
   			//a = data["SQUADRA"] + " " + data["PUNTI"] + "\n";
   			
   			html += "<li style='height:45px'><p><div align='left' style='float:left'><table><tr valign='middle' align='left'><td><img width='40px' src='img/squadre/"+unescape(data["SQUADRA"].replace("(*)","").toLowerCase()).replace(" ","").replace("&nbsp;","")+".png' /></td><td><div style='margin-left:5px'><b>"+data["SQUADRA"] +"</b></div></td></tr></table></div><div style='float:right' align='right'>"+ data["PUNTI"]+ "</div></p></li>";
   			
   		}
   		
   		html += "</ul>";

   		$('#contentResult2').html(html);
   		$("#export2").trigger("create");
		$.mobile.hidePageLoadingMsg();
   		
   	}	
   	
   	
   	function fillDettaglio(data, targetDiv){
   		
   		var html = "";
   		var response = data;
   		
   		html = '<div align="center"><b>' + response.header.GIORNATA
   				+ '</b></div>';
   		html += "<ul data-role='listview' data-inset='true'>";

   		var items = response.items;
   		for (i in items) {
   			var data = items[i];
   			
   			//data['ICOT1'];
   		//	data['ICOT2'];
   			
   			//a = data["SQUADRA"] + " " + data["PUNTI"] + "\n";
   			
   			html += "<li><div align='center' style='width:100%;height:100%;valign='middle''><table width ='100%'><tr width ='100%' style='height:100%' valign='middle'>" +
   			"<td width='10%'  align='left'>"+data['TIME']+"</td><td>";
   			
   			var score ="";
   			if(data['SCORE']!="") score = "["+data['SCORE']+"]";
   			
   			if(data['ICOT1']=="Y") html += "<img src='img/yellow.png' style='margin-left:5px' />";
   			else if(data['ICOT1']=="R") html += "<img src='img/Red.png' style='margin-left:5px'/>";
   			else if(data['ICOT1']=="G") html += "<img src='img/11m.png' style='margin-left:5px' />";
   			else if(data['ICOT1']=="YR") html += "<img src='img/yellowRed.png' style='margin-left:5px'/>";
   			else if(data['ICOT1']=="P") html += "<span style='margin-left:5px'><b><font size='1'>rig.</font></b></span><img src='img/11m.png' style='margin-left:5px' />";
   			else if(data['ICOT1']=="RN") html += "<span style='margin-left:5px'><b><font size='1'>rig.</font></b></span><img src='img/11n.png' style='margin-left:5px' />";
   			else if(data['ICOT1']=="EX") html += "<img src='img/out.gif' style='margin-left:5px' />";
   			else if(data['ICOT1']=="EN") html += "<img src='img/in.gif' style='margin-left:5px' />";
   			else if(data['ICOT1']=="A") html += "<img src='img/auto.gif' style='margin-left:5px' />";
   			else if(data['ICOT1']=="AS") html += "<span style='margin-left:5px'><b><font size='1'> (assist) </font></b></span>";
   			
   			html+="</td><td width='40%' align='left' style='padding-left:5px'>"+data['T1']+"</td>" +
   					"<td width='10%' align='center' style='min-width:50px'><i>"+score+"</i></td>"+
   			"<td width='40%' align='right'>"+data['T2']+"</td><td>";
  
   			if(data['ICOT2']=="Y") html += "<img src='img/yellow.png' style='margin-left:5px' />";
   			else if(data['ICOT2']=="R") html += "<img src='img/Red.png' style='margin-left:5px'/>";
   			else if(data['ICOT2']=="G") html += "<img src='img/11m.png' style='margin-left:5px' />";
   			else if(data['ICOT2']=="YR") html += "<img src='img/yellowRed.png' style='margin-left:5px'/>";
   			else if(data['ICOT2']=="P") html += "<span style='margin-left:5px'><b><font size='1'>rig.</font></b></span> <img src='img/11m.png' style='margin-left:5px' />";
   			else if(data['ICOT2']=="RN") html += "<span style='margin-left:5px'><b><font size='1'>rig.</font></b></span><img src='img/11n.png' style='margin-left:5px' />";
   			else if(data['ICOT2']=="EX") html += "<img src='img/out.gif' style='margin-left:5px' />";
   			else if(data['ICOT2']=="EN") html += "<img src='img/in.gif' style='margin-left:5px' />";
   			else if(data['ICOT2']=="A") html += "<img src='img/auto.gif' style='margin-left:5px' />";
   			else if(data['ICOT2']=="AS") html += "<span style='margin-left:5px'><b><font size='1'> (assist) </font></b></span>";
   			
   			html+="</td></tr></table></div></li>";
   			
   		}
   		
   		html += "</ul>";

   		$('#contentDetails').html(html);
   		$("#detail").trigger("create");
		$.mobile.hidePageLoadingMsg();
   		
   	}	
   		
   	function fillProgrammazione(data, targetDiv){
   		var a = "";
   		var b = "";
   		var html = "";
   		var response = data;
   		
		html = '<div align="center" style="margin-bottom:20px"><b>' + response.header.SERIE
   				+ '</b></div>';
   		html += "<ul data-role='listview' data-inset='true' data-filter='false' data-filter-placeholder='Search...'>";
   		var isTodayFind = false;
   		var isToExpand = "";
   		var isToScrollTo = "";
   		var imgToChange = "";
   		var programmazione = response.programmazione;
   		for (i in programmazione ) {
   			var data = programmazione[i];
   			tt = 'elem'+i;
   			ttt= '#'+tt;
   			tttt = 'div'+tt;
   			ttttt = tt+"img";
   			
   		/*	if(!isSerieAVar){
   				html += "<li  id='"+tttt+"' data-role='list-divider' >"+ data["giorno"]+"</li><li>" +
					"<div id='"+tt+"' ><ul data-role='listview' data-inset='true' >";
   			}
   			else{*/
   				html += "<li  id='"+tttt+"' data-role='list-divider'  onclick='explode("+tt+")' ><img id='"+ttttt+"' src='img/plus.png' class='ui-li-icon' style='margin-top:-5px'>&nbsp;&nbsp;&nbsp;&nbsp;"+ data["giorno"]+"</li><li>" +
   					"<div id='"+tt+"' style='display:none'><ul data-role='listview' data-inset='true' >";
   		//	}
   			
   			var items = programmazione[i].items;
   			for (j in items) {
   				var subData = items[j];
   				a = subData["SQUADRA"] ;
   				var tmp = a.split(" - ");
   				
   				var sqra = a;
   				a="<td><img width='40px' src='img/squadre/"+unescape($.trim(tmp[0]).replace("(*)","").toLowerCase()).replace(" ","").replace("&nbsp;","")+".png' /></td><td><div style='margin-left:5px;margin-right:5px'><strong>"+
   				$.trim(a)+"</strong></div></td><td><img width='40px' src='img/squadre/"+unescape($.trim(tmp[1]).replace("(*)","").toLowerCase()).replace(" ","").replace("&nbsp;","")+".png' /></td>";
   				
   				var tv = subData.TV;
   		/*		if(!isSerieAVar){
	   				b = "[";
	   				var count = 0;
	   				for (z in tv) {
	   					if(count>0) b+="; ";
	   					b += tv[z];
	   					count++;
	   				}
	   				b += "]";
   				}
   				else {*/
   					
   					if(subData["RISULTATO"]!=""){
   						b = "["+subData["RISULTATO"]+"]";
   					}
   					else b="";
   				//}
   				
   				
   				var oraArray = $.trim(subData["ORA"]).split(" ");
   				var dataArray = oraArray[0].split("/");
   				var myDate=new Date();
   				myDate.setFullYear(dataArray[2],dataArray[1]-1,dataArray[0]);
   				var today = new Date();
   				if(today>myDate && !isTodayFind){
   					
   				}
   				else{
   					if(!isTodayFind ){
	   					isTodayFind = true;
	   					isToExpand = ttt;
	   					isToScrollTo = tttt;
	   					imgToChange = ttttt;
   					}
   				}
   				
   			
   				html += "<li data-filtertext='"+data["giorno"]+$.trim(sqra)+"'><table><tr valign='middle' align='left'>"+ a + "</tr><tr ><td></td><td><p>"+b+"</p></td><td></td></tr></table><p class='ui-li-aside'><i>"+ subData["ORA"]+"</i></p></li>";
   			
   			}
   		html+="</ul></div>";

   	   		
   		}
   		html += "</li></ul>";
   		
   		$('#contentResult2').html(html);
	   	$("#export2").trigger("create");
		$.mobile.hidePageLoadingMsg();
	//	if(isSerieAVar){
			$.mobile.silentScroll($('#'+isToScrollTo).offset().top-150);
			explode(isToExpand);
	//	}
		
   	}
   	
   	function explode(a){
   		
   	var img = "";
   	if( typeof(a)=="string") {img = a+'img';}
   	else {img = '#'+a.id+'img';};
   			if($(a).css('display') == 'none'){
   				$(a).show();
   				$(img).attr("src", 'img/minus.png');
   			}
  			else{ 
  				$(a).hide();
  				$(img).attr("src", 'img/plus.png');
  			}
   			
   		
   		
   	}
   	
