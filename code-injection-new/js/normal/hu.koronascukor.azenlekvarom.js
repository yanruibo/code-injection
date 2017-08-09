
// JavaScript Document
var RES = "images/320x480/";
var OLDAL = 0;
var PREVOLDAL = 0;

var objIndexStart = new Array ();
	var objNum = new Array ( 7 , 1 , 1 , 1 , 1 , 1, 1 , 1 , 1  );
	var hatter = new Array ("fooldal","naptar","eper","malna","barack","szilva","afonya","vegyes", "recept" ); 
	var video  = new Array (
		"","",
		"DcsG74d8ny0",
		"hFhrQdTpJkg",
		"",
		"Rau7MnL4UCs",
		"7KuXHqRPpZE",
		"5uadDho4_pQ",
		"",""					
	);
	
	var gomb = new Array ( "naptar","eper","malna","barack","szilva","afonya","vegyes", "naptar_vissza",  "eper_vissza",  "malna_vissza",  "barack_vissza",  "szilva_vissza",  "afonya_vissza",  "vegyes_vissza", "recept1","recept2","recept3","recept4","recept5","recept_vissza" );
	var x       = new Array (  0, 53,  4,  4, 53, 53,  4,  10,   0,  0,  0,  0,  0,  0,   0,           0,    0,    0,    0,    0      );  
	var y       = new Array ( 83, 46, 28, 46, 64, 28, 64,  92,  12, 12, 12, 12, 12, 12,  90,          26, 40.5,   55, 69.5,   84      ); 
	var w       = new Array (100, 45, 48, 48, 45, 45, 48,  33, 100,100,100,100,100,100,  33,         100,  100,  100, 100,   100      ); 
	var h       = new Array ( 17, 18, 18, 18, 18, 18, 18,   8,  14, 14, 14, 14, 14, 14,  10,        14.5, 14.5, 14.5, 14.5, 14.5      );
	var onclick = new Array (  1,  2,  3,  4,  5,  6,  7,   0,   0,  0,  0,  0,  0,  0,  -1,           8,    8,    8,    8,    8      );
	var effekt  = new Array (  2,  1,  1,  1,  1,  1,  1,  -2,  -1, -1, -1, -1, -1, -1,  -1,           1,    1,    1,    1,    1      );


function Init()
{						
	var start=0;
	for (var idx=0;idx<objNum.length;idx++)
	{
		objIndexStart[idx] = start;
		start += objNum[idx];
	}
	var OLDALAK = document.getElementById("Oldalak");	
	for (var oldal=0; oldal<objNum.length; oldal++)
	{	
		//<img id="Hatter0" style="width:100%;height:100%;top:0px;left:0px;position:absolute;" src=""/>	
		var D = document.createElement("div");
		D.setAttribute("id","Oldal_"+hatter[oldal]);
		var Display = (oldal==0)?"display:block;":"display:none;";
		D.setAttribute("style","width:100%;height:100%;top:0px;left:0px;position:absolute;"+Display);
			var I = document.createElement("img");
			I.setAttribute("id","Hatter_"+hatter[oldal]);
			I.setAttribute("style","width:100%;height:100%;top:0px;left:0px;position:absolute;");
			I.setAttribute("src",RES+hatter[oldal]+".jpg");
		D.appendChild(I);
			var G;
			for (var o=0;o<objNum[oldal];o++)
			{
				G = document.createElement("div");
				G.setAttribute("id","Gomb_"+gomb[parseInt(objIndexStart[oldal]+o)]);
				G.setAttribute("class","gomb");
				G.setAttribute("style","position:absolute; left:"+x[parseInt(objIndexStart[oldal]+o)]+"%; top:"+y[parseInt(objIndexStart[oldal]+o)]+"%; width:"+w[parseInt(objIndexStart[oldal]+o)]+"%; height:"+h[parseInt(objIndexStart[oldal]+o)]+"%; ");
				G.setAttribute("onclick","Oldal("+onclick[parseInt(objIndexStart[oldal]+o)]+","+effekt[parseInt(objIndexStart[oldal]+o)]+");");
				D.appendChild(G);
			}
			if (oldal>=2 && oldal<=7)
			{
				var base = parseInt(objIndexStart[parseInt(objNum.length-1)]);   
				for (var o=1;o<=5;o++)
				{
					var RG = parseInt(base+o);
					var G = document.createElement("div");
					G.setAttribute("id","Recept_"+gomb[RG]);
					G.setAttribute("class","gomb");
					G.setAttribute("style","position:absolute; left:"+x[RG]+"%; top:"+y[RG]+"%; width:"+w[RG]+"%; height:"+h[RG]+"%;");
					G.setAttribute("onclick","Oldal("+onclick[RG]+","+effekt[RG]+","+o+");");
					D.appendChild(G);
				}	
			}
		OLDALAK.appendChild(D);	
	
	}
	var RECCIM = document.createElement("div");
	RECCIM.setAttribute("id","ReceptCim");
	document.getElementById("Oldal_recept").appendChild(RECCIM);
	var F = document.createElement("img");
	F.setAttribute("id","Recept_fejlec");
	document.getElementById("Oldal_recept").appendChild(F);
	var RECTXT = document.createElement("div");
	RECTXT.setAttribute("id","ReceptTxt");
	document.getElementById("Oldal_recept").appendChild(RECTXT);
	
	var OV = document.getElementById("Oldal_video");
	OV.style.width = window.innerWidth+"px";   // elforgatott landscape mód
	OV.style.height = window.innerHeight+"px";
}


var ujOldal;
var EFFEKT;
var S;

function Oldal(NR,EFF,REC)
{
	if (NR==-1) { NR=PREVOLDAL; }
	var VID = 0;
	if (NR==8)   // recept oldal
	{
		VID = Recept(OLDAL,REC); 
	}
	if (VID==null) { return; }  // üres recept
	for (var oldal=0; oldal<=objNum.length; oldal++)
	{	
		if ( oldal==NR)   
		{
			if (VID==0)
			{ 
				ujOldal = document.getElementById("Oldal_"+hatter[oldal]);
			}
			else
			{
				ujOldal = document.getElementById("Oldal_video");	
			}
			EFFEKT = EFF;
			switch (EFF)
			{
				case 1 :	ujOldal.style.left="100%"; 
					break;
				case -1:	ujOldal.style.left="-100%"; 
					break;
				case 2 : 	ujOldal.style.top="100%";
					break;
				case -2:	ujOldal.style.top="-100%";
					break;
				case 3 :	
					break;
				case -3:	
					break;					
			}
			
			ujOldal.style.display="block";  							// új oldal bekapcs
			ujOldal.style.zIndex=1;
		}
		else if (oldal==OLDAL)		// régi oldal
		{
			for (var o=0;o<objNum[oldal];o++)
				{
					document.getElementById("Gomb_"+gomb[parseInt(objIndexStart[oldal]+o)]).style.display="none";   // régi oldal gombok kikapcs
				}
		}
	}
	
	if (VID>0)  // video oldal
	{
		var V = document.getElementById('Video');
		
		V.innerHTML = '<iframe width="100%" height="100%" src="http://www.youtube.com/embed/'+video[OLDAL]+'?rel=0&vq=large&autoplay=1&autohide=1&html5=1" frameborder="0"></iframe>';
		var VV=document.getElementById("Video_vissza");
		VV.setAttribute("onclick","javascript: document.getElementById('Video').innerHTML='';Oldal(-1,-1);this.style.display='none';");
		document.getElementById("Oldal_video").style.display="block";
		NR=-1;
	}
	pos=0;
	if (EFF!=0)
	{
		S = setInterval("Effekt("+NR+","+EFF+")",25);
	}
	else
	{
		ShowUjGomb(NR);	
	}
	
}

var pos=0;
function Effekt(PAGE,EFF,VID)
{
	pos += 5;	
	if (pos>100)
	{
		clearInterval(S);
		S=0;
		pos=0;
		if (PAGE!=-1)
	    { ShowUjGomb(PAGE);document.getElementById("Oldal_video").style.display="none";}
		else
		{ document.getElementById("Video_vissza").style.display="block"; PREVOLDAL=OLDAL;
	OLDAL=PAGE;}   // video oldal
		return;	
	}
	switch (EFF)
	{
		case 1 :	ujOldal.style.left=parseInt(100-pos)+"%";
			break;
		case -1:	ujOldal.style.left=parseInt(-100+pos)+"%"; 
			break;
		case 2 : 	ujOldal.style.top=parseInt(100-pos)+"%";
			break;
		case -2:	ujOldal.style.top=parseInt(-100+pos)+"%";
			break;
		case 3 :	
			break;
		case -3:	
			break; 	
	}
	//alert(pos);
}

function ShowUjGomb(PAGE)
{
	for (var oldal=0; oldal<=objNum.length; oldal++)
	{	
		if (oldal==OLDAL )
		{
			document.getElementById("Oldal_"+hatter[oldal]).style.display="none";  // régi kikapcs
		}
		else if (oldal==PAGE)
		{	
			for (var o=0;o<objNum[oldal];o++)
				{
					document.getElementById("Gomb_"+gomb[parseInt(objIndexStart[oldal]+o)]).style.display="block";  // új oldal gombok bekapcs
					ujOldal.style.zIndex=0;
				}
		}
	}
	
	PREVOLDAL=OLDAL;
	OLDAL=PAGE;
}

function Recept(OLDAL,NR)
{
	var ID = OLDAL.toString() + NR.toString();
	var TXT="";
	var T = document.getElementById(ID);
	if (!T) { if (OLDAL!=4) { return OLDAL;} return null; }     // [szám] = video, null = üres recept
	else
	{
		var H = T.innerHTML.split("Hozzávalók:<br>");
		var B = H[1].split("Elkészítés:<br>");
		var RC = document.getElementById("ReceptCim")
		RC.innerHTML = H[0].substring(0,parseInt(H[0].length-4));
		RC.style.fontSize=T.getAttribute("size");
		TXT += "<h2>Hozzávalók:</h2>";
		TXT += "<div class='hozzavalok'>"+B[0]+"</div>";
		TXT += "<br><h2>Elkészítés:</h2>";
		TXT += "<div class='leiras'>"+B[1]+"</div>";
		document.getElementById("ReceptTxt").innerHTML = TXT;
		document.getElementById("Recept_fejlec").setAttribute("src",RES+"recept"+T.getAttribute("src")+".jpg");
		//alert("images/recept"+T.getAttribute("src")+".jpg");
	}
	return 0;    // nem video
}






        function onBodyLoad()
        {       
            document.addEventListener("deviceready", onDeviceReady, false);
			Init(); 
        }

        function onDeviceReady()
        {
  			navigator.splashscreen.hide();
			         
		//setTimeout('document.getElementById("Hatter").setAttribute("src","nyito_hatter.jpg");',3000);
        }

        


