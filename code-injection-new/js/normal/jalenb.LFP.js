






            (function() {
                var jasmineEnv = jasmine.getEnv();
                jasmineEnv.updateInterval = 1000;

                var htmlReporter = new jasmine.HtmlReporter();

                jasmineEnv.addReporter(htmlReporter);

                jasmineEnv.specFilter = function(spec) {
                    return htmlReporter.specFilter(spec);
                };

                var currentWindowOnload = window.onload;

                window.onload = function() {
                    if (currentWindowOnload) {
                        currentWindowOnload();
                    }
                    execJasmine();
                };

                function execJasmine() {
                    jasmineEnv.execute();
                }
            })();
        


var swt = 0
var dsets
var sdt
var delm
var sddm = false
var jdi = false
var mv = null
var autoTurnArray = []
var s_filter = ""
var html = ""
var si = 0
var inv
var sdownloadnum = 0
function load()
{
window.onerror = function(e,x,l){
alert("[Cordova] Script Error: "+e+" (Target: "+x+") on line "+l)
}
if (isNaN(parseInt(window.localStorage.getItem("fsize"))))
{
window.localStorage.setItem("fsize","20")
}
else
{
}
if (window.localStorage.getItem("courier"))
{
}
else
{
window.localStorage.setItem("courier","0")
}
if (window.localStorage.getItem("showedfloattap"))
{
}
else
{
alert("You can tap the top blue toolbar to go to the last setlist you loaded.")
window.localStorage.setItem("showedfloattap","1")
}
if (window.localStorage.getItem("installedac")=="" || window.localStorage.getItem("installedac")==null || window.localStorage.getItem("installedac")==undefined)
{
window.localStorage.setItem("installedac","yes")
install()
}
else
{
}
window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(fs){
fs.root.getDirectory("Lyrics Flipper Mobile App Sync OS Info",{create:false,exclusive:false},function(d){
document.getElementById("welcome").style.display="none"
document.getElementById("menu").style.display=""
d.getFile("ruser.txt",null,function(fe){
fe.file(function(ffe){
var ffr = new FileReader()
ffr.onloadend = function(evt){
document.getElementById("floatybar").innerHTML="Lyrics Flipper+ - "+evt.target.result
document.getElementById("usernameinput").value=evt.target.result
if (window.localStorage.getItem("downloadlyrics") && window.localStorage.getItem("downloadlyrics")!="Code: NO")
{
var lta = window.localStorage.getItem("downloadlyrics")
window.localStorage.setItem("downloadlyrics","Code: NO")
/*window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(lddfs){
lddfs.getDirectory("Lyrics Flipper Mobile App Songs",{create:false,exclusive:false},function(ldd){
ldd.getFile(lta+".txt",{create:true,exclusive:false},function(ltdf){
ldd.LTLyrics(ltdf,lta)
},function(e){
ldd.getFile(lta+".txt",{create:false,exclusive:false},function(ltdf){
LTLyrics(ltdf,lta)
},doNothing)
})
},doNothing)
},doNothing)
*/
document.getElementById("menu").style.display="none"
LTLyrics(lta)
}
else
{
}
}
ffr.readAsText(ffe)
},doNothing)
},function(){
document.getElementById("welcome").style.display=""
document.getElementById("menu").style.display="none"
})
},doNothing)
},doNothing)
document.getElementById("lyrics").style.fontSize=window.localStorage.getItem("fsize")+"px"
if (window.localStorage.getItem("courier")=="1")
{
document.getElementById("lyrics").style.fontFamily="Courier"
document.getElementById("lyrics").style.fontWeight="600"
}
else
{
}
if (navigator.onLine)
{
}
else
{
document.getElementById("logoutarea").style.display="none"
}
}
function website()
{
return "http://lyricsflipperplus.com/";
}
function install()
{
window.requestFileSystem(LocalFileSystem.PERSISTENT,0,installNow,doNothing)
}
function installNow(fs)
{
installFs=fs
    installFs.root.getDirectory("Lyrics Flipper Mobile App Songs",{create:true,exclusive:false},function(forgetThis){
	installFs.root.getDirectory("Lyrics Flipper Mobile App Sync OS Info",{create:true,exclusive:false},doNothing,doNothing)
	},doNothing)
}
function doNothing()
{
}
function findMusic(fs)
{
fs.root.getDirectory("Lyrics Flipper Mobile App Songs",{create:false,exclusive:false},musicReader,doNothing)
}
function musicReader(mre)
{
var donetrue = false
var mr = mre.createReader()
    mr.readEntries(function(r){
	var tmf = r
var tmfi
var r = []
var objno
for (tmfi=0;tmfi<tmf.length;tmfi++)
{
r[tmfi]=tmf[tmfi].name
}
r.sort()
for (tmfi=0;tmfi<r.length;tmfi++)
{
objno=new Object()
objno.name=r[tmfi]
r[tmfi]=objno
}
	SPMusicFiles(r,mre.fullPath,0)},doNothing)
}
function SPMusicFiles(mf,mfp,inv)
{
var donetrue = false
var didnotedit = true
var sn
for (var i=0;i<mf.length;i++)
{
if (inv==i || i>inv)
{
}
else
{
continue
}
if ((mf[i].name).indexOf(".mp3")>-1==true)
{
sn=(mf[i].name).split("").reverse().join("").substring(4).split("").reverse().join("")
if ((sn).toLowerCase().indexOf((s_filter).toLowerCase())>-1==false || s_filter=="")
{
if (usedTheMP3(sn))
{
continue
}
else
{
useTheMP3(sn)
html=html+"<div id='s"+(si).toString()+"' style='font-size: 36px; width: 100%; white-space: nowrap;' onclick='pedalDeactivated("+si+")'>"+sn+"</div>"
si++
}
}
else
{
}
}
else
{
    if ((mf[i].name).indexOf(".txt")>-1==true)
    {
        if ((mf[i].name).indexOf(".autoturn")>-1==true)
        {
        }
        else
        {
            sn=(mf[i].name).split("").reverse().join("").substring(4).split("").reverse().join("")
            window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(tfs){tfs.root.getDirectory("Lyrics Flipper Mobile App Songs",{create:false,exclusive:false},function(td){td.getFile(sn+".mp3",{create:false,exclusive:false},function(){SPMusicFiles(mf,mfp,i+1)},function(){
                                             if ((sn).toLowerCase().indexOf((s_filter).toLowerCase())>-1==false || s_filter=="")
                                             {
                                             html+="<div id='s"+(si).toString()+"' style='font-size: 36px; width: 100%; white-space: nowrap;' onclick='pedalDeactivated("+si+")'>"+sn+"</div>"
                                             si++
                                             }
                                             else
                                             {
                                             }
                                             SPMusicFiles(mf,mfp,i+1)
                                             })},doNothing)},doNothing)
            break
        }
    }
}
}
if (i==mf.length)
{
donetrue=true
}
else
{
}
if (donetrue)
{
document.body.addEventListener("keydown",function(evt){
if (evt.keyCode==32 || evt.keyCode==49 || evt.keyCode==50)
{
upArrowCode()
}
else if (evt.keyCode==13 || evt.keyCode==51 || evt.keyCode==52)
{
downArrowCode()
}
else
{
}
},false)
document.getElementById("menu").style.display="none"
document.getElementById("splayback").style.display=""
document.getElementById("splaybackh").innerHTML=html
document.getElementById("floatybar").style.display="none"
document.getElementById("scount").innerHTML=(si).toString()
document.getElementById("cursong").innerHTML="0"
document.getElementById("s0").style.backgroundColor="red"
document.getElementById("splaybackopadaptor").style.display=""
document.getElementById("splaybackop").style.display=""
    window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(fs){
                             fs.root.getDirectory("Lyrics Flipper Mobile App Songs",{create:true,exclusive:false},function(d){
                                                  d.getFile(document.getElementById("s0").innerHTML+".txt.autoturn",null,function(f){
												  document.getElementById("s0").style.backgroundColor="lime"
                                                                   },doNothing)
                                                            },doNothing)
													    },doNothing)
/*
if (spv.split("t").length==2)
{
var spvi = parseInt(spv.substring(3))
    for (var spvii=0;spvii<spvi;spvii++)
    {
        upArrowCode()
    }
}
else
{
}
if (spv.split("s055").length==2)
{
setEX((spv.split("s055")[1]).replace(/z0514/g,"t").replace(/z0515/g,"a").replace(/z0516/g,"s"))
}
else
{
}
if (spv.split("a").length==2 && spv.split("s055").length<2)
{
    for (var ai=0;ai<parseInt(spv.split("a")[1]);ai++)
    {
        upArrowCode()
    }
    ulr=true
    pedalDeactivated(parseInt(spv.split("a")[1]))
}
else
{
}
*/
}
else
{
}
}
function upArrowCode()
{
if (document.getElementById("playing").innerHTML=="1")
    {
	if (document.getElementById("lyrics").innerHTML==document.getElementById("s"+document.getElementById("cursong").innerHTML).innerHTML)
	{
	}
	else
	{
        if ((document.getElementById("ldata").value).split("`")[parseInt(parseInt(document.getElementById("lpg").innerHTML)+parseInt(1))])
        {
            document.getElementById("lpg").innerHTML=(parseInt(parseInt(document.getElementById("lpg").innerHTML)+parseInt(1))).toString()
            document.getElementById("lyrics").innerHTML=(document.getElementById("ldata").value).split("`")[parseInt(document.getElementById("lpg").innerHTML)]
        }
        else
        {
            
        }
    }
	setATArray.push((floatAutoTurnConf).toString())
	}
    else
    {
if (document.getElementById("s"+(parseInt(parseInt(document.getElementById("cursong").innerHTML)+parseInt(1))).toString()))
{
document.getElementById("s"+(parseInt(parseInt(document.getElementById("cursong").innerHTML))).toString()).style.whiteSpace="nowrap"
document.getElementById("s"+(parseInt(parseInt(document.getElementById("cursong").innerHTML))).toString()).style.backgroundColor=""
document.getElementById("cursong").innerHTML=(parseInt(parseInt(document.getElementById("cursong").innerHTML)+parseInt(1))).toString()
document.getElementById("s"+(parseInt(parseInt(document.getElementById("cursong").innerHTML))).toString()).style.backgroundColor="red"
    window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(fs){
                             fs.root.getDirectory("Lyrics Flipper Mobile App Songs",{create:true,exclusive:false},function(d){
                                                  d.getFile(document.getElementById("s"+(parseInt(parseInt(document.getElementById("cursong").innerHTML))).toString()).innerHTML+".txt.autoturn",null,function(f){
                                                            f.file(function(ff){
                                                                   if (ff.size==0)
                                                                   {
                                                                   }
                                                                   else
                                                                   {
                                                                   document.getElementById("s"+(parseInt(parseInt(document.getElementById("cursong").innerHTML))).toString()).style.backgroundColor="lime"
                                                                   }
                                                                   },doNothing)
                                                            },doNothing)
                                                  },doNothing)
                             },doNothing)
    document.getElementById("s"+(parseInt(parseInt(document.getElementById("cursong").innerHTML))).toString()).style.whiteSpace=""
var viableHeight = parseInt(window.innerHeight)-parseInt(20)
viableHeight=viableHeight/43
viableHeight=Math.floor(viableHeight)
viableHeight=viableHeight*43
var viableY = parseInt(43)*parseInt(parseInt(document.getElementById("cursong").innerHTML)+parseInt(1))
var viablePos = viableY-viableHeight
if (viablePos>0)
{
window.scrollTo(0,viablePos)
}
else
{
window.scrollTo(0,0)
}
}
else
{
document.getElementById("s"+(parseInt(parseInt(document.getElementById("cursong").innerHTML))).toString()).style.backgroundColor=""
document.getElementById("cursong").innerHTML="0"
document.getElementById("s"+(parseInt(parseInt(document.getElementById("cursong").innerHTML))).toString()).style.backgroundColor="red"
window.scrollTo(0,0)
    window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(fs){
                             fs.root.getDirectory("Lyrics Flipper Mobile App Songs",{create:true,exclusive:false},function(d){
                                                  d.getFile(document.getElementById("s"+(parseInt(parseInt(document.getElementById("cursong").innerHTML))).toString()).innerHTML+".txt.autoturn",null,function(f){
                                                            f.file(function(ff){
                                                                   if (ff.size==0)
                                                                   {
                                                                   }
                                                                   else
                                                                   {
                                                                   document.getElementById("s"+(parseInt(parseInt(document.getElementById("cursong").innerHTML))).toString()).style.backgroundColor="lime"
                                                                   }
                                                                   },doNothing)
                                                            },doNothing)
                                                  },doNothing)
                             },doNothing)
}
    }
}
function downArrowCode()
{
    var a
    window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(fs){
                             fs.root.getDirectory("Lyrics Flipper Mobile App Songs",{create:false,exclusive:false},function(f){
                                                  if (document.getElementById("playing").innerHTML=="0")
                                                  {
                                                  document.getElementById("playing").innerHTML="1"
                                                  var msrc = f.fullPath+"/"+document.getElementById("s"+document.getElementById("cursong").innerHTML).innerHTML+".mp3"
                                                  document.getElementById("lyrics").innerHTML=document.getElementById("s"+document.getElementById("cursong").innerHTML).innerHTML
                                                  document.getElementById("lyrics").style.display=""
												  document.getElementById("turntouchpage").style.display=""
                                                  document.getElementById("lpscroll").innerHTML=(document.body.scrollTop).toString()
                                                  var viableHeight = parseInt(window.innerHeight)-parseInt(20)
viableHeight=viableHeight/43
viableHeight=Math.floor(viableHeight)
viableHeight=viableHeight*43
var viableY = parseInt(43)*parseInt(parseInt(document.getElementById("cursong").innerHTML)+parseInt(1))
var viablePos = viableY-viableHeight
/*if (viablePos>0)
{
window.scrollTo(0,viablePos)
}
else
{
window.scrollTo(0,0)
}*/
                                                  msrc=encodeURI(msrc)
                                                  getLyrics(msrc)
                                                  window.resolveLocalFileSystemURI(msrc,function(fe3){
                                                                                   //document.getElementById("splaybacks").innerHTML="<audio autoplay=\"autoplay\"><source src=\""+msrc+"\" type=\"audio/mpeg\"></audio>"
																				   mv = new Media("Lyrics Flipper Mobile App Songs/"+document.getElementById("s"+document.getElementById("cursong").innerHTML).innerHTML+".mp3",doNothing,doNothing,doNothing)
																				   mv.play()
																				   document.getElementById("mvprog").style.display=""
																				   mvprog = window.setInterval(function(gcp){
																				   mv.getCurrentPosition(function(gcp){
																				   if (parseInt(100/mv.getDuration()*gcp)>97)
																				   {
																				   document.getElementById("mvprogprogress").style.backgroundColor="red"
																				   }
																				   else
																				   {
																				   }
																				   document.getElementById("mvprogprogress").style.width=(parseInt(100/mv.getDuration()*gcp)).toString()+"%"
																				   },doNothing)
																				   },1000)
                                                                                   },doNothing)
                                                  
                                                  }
                                                  else
                                                  {
                                                  window.scrollTo(0,parseInt(document.getElementById("lpscroll").innerHTML))
                                                  document.getElementById("lpscroll").innerHTML=""
                                                  document.getElementById("lyrics").style.display="none"
												  document.getElementById("turntouchpage").style.display="none"
                                                  document.getElementById("lyrics").innerHTML=""
                                                  document.getElementById("playing").innerHTML="0"
                                                  if (mv)
												  {
												  window.clearInterval(mvprog)
												  mv.stop()
												  mv=null
												  document.getElementById("mvprogprogress").style.backgroundColor="lime"
												  document.getElementById("mvprogprogress").style.width="0%"
												  document.getElementById("mvprog").style.display="none"
												  }
												  else
												  {
												  }
												  if (settingAutoTurns)
												  {
												  window.clearInterval(atst)
												  var atresult = ""
												  for (var sa=0;sa<setATArray.length;sa++)
												  {
												  atresult+=setATArray[sa]+","
												  }
												  atresult = atresult.substring(0,atresult.length-1)
												  floatAutoTurnConf = 0
												  setATArray = []
												  f.getFile(document.getElementById("s"+document.getElementById("cursong").innerHTML).innerHTML+".txt.autoturn",{create:false,exclusive:false},function(af){postSaveAT(af,atresult,document.getElementById("s"+document.getElementById("cursong").innerHTML).innerHTML)},function(e){
												  f.getFile(document.getElementById("s"+document.getElementById("cursong").innerHTML).innerHTML+".txt.autoturn",{create:true,exclusive:false},function(af){postSaveAT(af,atresult,document.getElementById("s"+document.getElementById("cursong").innerHTML).innerHTML)},doNothing)
												  })
												  }
												  else
												  {
                                                  for (a=0;a<autoTurnArray.length;a++)
                                                  {
                                                  clearTimeout(autoTurnArray[a])
                                                  }
                                                  autoTurnArray = []
                                                  }
												  }
                                                  },doNothing)
                             },doNothing)
}
function getLyrics(u)
{
document.getElementById("lyrics").style.width=(window.innerWidth).toString()+"px"
document.getElementById("lyrics").style.height=(window.innerHeight).toString()+"px"
document.getElementById("lyrics").style.top=(document.body.scrollTop).toString()+"px"
var p = u
u=u.split("").reverse().join("")
u=u.substring(4)
u=u.split("").reverse().join("")
u+=".txt"
    window.resolveLocalFileSystemURI(u,function(e){
                                     e.file(function(rfe){
                                                                             var r = new FileReader()
                                                                             r.onloadend = function(evt){
																			 var j = evt.target.result
																			 var nj = ""
																			 for (var ji=0;ji<j.length;ji++)
																			 {
																			 if (j.charCodeAt(ji)==65533)
																			 {
																			 nj+=" "
																			 }
																			 else
																			 {
																			 nj+=j.charAt(ji)
																			 }
																			 }
																			 j=nj
																			 nj=undefined
                                                                             document.getElementById("lyrics").innerHTML=(((j).split("`")[0]).replace(/&amp;/g,"&")).replace(/&lt;br&gt;/g,"<br>")
                                                                             document.getElementById("ldata").value=(((j)).replace(/&amp;/g,"&")).replace(/&lt;br&gt;/g,"<br>")
                                                                             document.getElementById("lpg").innerHTML="0"
                                                                             }
                                                                             r.readAsText(rfe)
                                                                             },doNothing)
																			 if (settingAutoTurns==false)
																			 {
                                     window.resolveLocalFileSystemURI(u+".autoturn",function(e){
                                                                      e.file(function(rfe){
                                                                             var r = new FileReader()
                                                                             r.onloadend = function(evt){
                                                                             parseAutoTurnData(evt.target.result)
                                                                             }
                                                                             r.readAsText(rfe)
                                                                             },doNothing)
                                                                      },doNothing)
																	  }
																	  else
																	  {
																	  atst = window.setInterval(function(){
																	  floatAutoTurnConf = floatAutoTurnConf + 0.25
																	  },250)
																	  }
                                     },doNothing)
}
function getAutoTurn(fpa,sa)
{
    var sas = sa
    sas=sas.split("").reverse().join("")
    sas=sas.substring(4)
    sas=sas.split("").reverse().join("")
    sas+=".txt.autoturn"
    window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(fs){
                             fs.root.getDirectory("Lyrics Flipper Mobile App Songs",{create:false,exclusive:false},function(d){
                             var aiframe = document.createElement("iframe")
                             aiframe.src=website()+"get-song-autoturn-data.php?name="+document.getElementById("usernameinput").value+"&song="+encodeURIComponent(sa)
                             aiframe.style.display="none"
                             document.body.appendChild(aiframe)
                             aiframe.contentWindow.addEventListener("load",function(){
                                                                    d.getFile(sas,{create:true},function(f){
                                                                              f.createWriter(function(w){
                                                                                             w.onwriteend = function(){
                                                                                             songDownloadDone(fpa)
                                                                                             }
                                                                                             if (aiframe.contentWindow.document.getElementById("atdata").value=="")
                                                                                             {
                                                                                             songDownloadDone(fpa)
                                                                                             }
                                                                                             else
                                                                                             {
                                                                                             w.write(aiframe.contentWindow.document.getElementById("atdata").value)
                                                                                             }
                                                                                             },doNothing)
                                                                              },doNothing)
                                                                    },false)
                                                  },doNothing)
                             },null)
}
function parseAutoTurnData(atdata)
{
var i
var atds
if (atdata=="")
{
}
else
{
atds=atdata.split(",")
    for (i=0;i<atds.length;i++)
    {
        autoTurnArray.push(setTimeout("upArrowCode()",parseFloat(parseFloat(atds[i])*parseFloat(1000))))
    }
}
}
function opButtonPressed()
{
//document.getElementById("splaybackop").style.position="fixed"
//document.getElementById("splaybackop").style.top="0px"
setTimeout('document.getElementById("splaybackop").style.webkitAnimation="showOp 1s"',100)
}
function showOpDone()
{
if (jdi)
{
document.getElementById("splaybackop").style.webkitAnimation=""
jdi=false
}
else
{
jdi=true
//document.getElementById("splaybackop").style.position="absolute"
//document.body.onscroll=null
window.scrollTo(0,0)
document.getElementById("splaybackop").style.width="100%"
document.getElementById("splaybackop").style.height="100%"
document.getElementById("splaybackop").style.backgroundColor="white"
document.getElementById("splaybackop").setAttribute("ontouchstart","")
document.getElementById("splaybackop").setAttribute("ontouchend","")
document.getElementById("splaybackop").setAttribute("onwebkitanimationend","")
document.getElementById("splaybackopopphone").style.display=""
}
}
function searchSP(q)
{
var s = q.toLowerCase()
var n = -1
for (var i=0;i<parseInt(document.getElementById("scount").innerHTML);i++)
{
if (((document.getElementById("s"+(i).toString()).innerHTML).charAt(0)).toLowerCase()==s)
{
n=i
break
}
else
{
}
}
if (n==-1)
{
}
else
{
document.getElementById("s"+document.getElementById("cursong").innerHTML).style.backgroundColor=""
document.getElementById("cursong").innerHTML="0"
for (var i2=0;i2<n;i2++)
{
upArrowCode()
}
}
document.getElementById("splaybackoph").innerHTML='<div id="splaybackop" onwebkitanimationend="showOpDone()" style="position: absolute; top: 0px; right: 0px; width: 100px; height: 100px; background: transparent; z-index: 104;" ontouchstart="this.style.backgroundColor=\'blue\'" onclick="opButtonPressed()">\r\n<div id="splaybackopopphone" style="display: none;">\r\n<table style="background-color: threedface;" border="1"><tr><td onclick=\'searchSP(this.innerHTML)\' style=\'font-size: 48px;\'>A</td><td onclick=\'searchSP(this.innerHTML)\' style=\'font-size: 48px;\'>B</td><td onclick=\'searchSP(this.innerHTML)\' style=\'font-size: 48px;\'>C</td><td onclick=\'searchSP(this.innerHTML)\' style=\'font-size: 48px;\'>D</td><td onclick=\'searchSP(this.innerHTML)\' style=\'font-size: 48px;\'>E</td><td onclick=\'searchSP(this.innerHTML)\' style=\'font-size: 48px;\'>Z</td></tr><tr><td onclick=\'searchSP(this.innerHTML)\' style=\'font-size: 48px;\'>F</td><td onclick=\'searchSP(this.innerHTML)\' style=\'font-size: 48px;\'>G</td><td onclick=\'searchSP(this.innerHTML)\' style=\'font-size: 48px;\'>H</td><td onclick=\'searchSP(this.innerHTML)\' style=\'font-size: 48px;\'>I</td><td onclick=\'searchSP(this.innerHTML)\' style=\'font-size: 48px;\'>J</td><td style=\'font-size: 48px;\'>&#160;</td></tr><tr><td onclick=\'searchSP(this.innerHTML)\' style=\'font-size: 48px;\'>K</td><td onclick=\'searchSP(this.innerHTML)\' style=\'font-size: 48px;\'>L</td><td onclick=\'searchSP(this.innerHTML)\' style=\'font-size: 48px;\'>M</td><td onclick=\'searchSP(this.innerHTML)\' style=\'font-size: 48px;\'>N</td><td onclick=\'searchSP(this.innerHTML)\' style=\'font-size: 48px;\'>O</td><td style=\'font-size: 48px;\'>&#160;</td></tr><tr><td onclick=\'searchSP(this.innerHTML)\' style=\'font-size: 48px;\'>P</td><td onclick=\'searchSP(this.innerHTML)\' style=\'font-size: 48px;\'>Q</td><td onclick=\'searchSP(this.innerHTML)\' style=\'font-size: 48px;\'>R</td><td onclick=\'searchSP(this.innerHTML)\' style=\'font-size: 48px;\'>S</td><td onclick=\'searchSP(this.innerHTML)\' style=\'font-size: 48px;\'>T</td><td style=\'font-size: 48px;\'>&#160;</td></tr><tr><td onclick=\'searchSP(this.innerHTML)\' style=\'font-size: 48px;\'>U</td><td onclick=\'searchSP(this.innerHTML)\' style=\'font-size: 48px;\'>V</td><td onclick=\'searchSP(this.innerHTML)\' style=\'font-size: 48px;\'>W</td><td onclick=\'searchSP(this.innerHTML)\' style=\'font-size: 48px;\'>X</td><td onclick=\'searchSP(this.innerHTML)\' style=\'font-size: 48px;\'>Y</td><td style=\'font-size: 48px;\'>&#160;</td></tr></table>\r\n</div>\r\n</div>'
}
function pedalDeactivated(sth)
{
    document.getElementById("lyrics").onclick = function(){
        downArrowCode()
    }
if (document.getElementById("s"+sth).style.backgroundColor!="")
{
sddm=true
downArrowCode()
/*    window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(fs){
                             fs.root.getDirectory("Lyrics Flipper Mobile App Songs",{create:false,exclusive:false},function(d){
                                                  var rlfsuri = encodeURI("file://"+d.fullPath+"/"+document.getElementById("s"+sth).innerHTML+".mp3")
                                                  window.resolveLocalFileSystemURI(rlfsuri,function(){downArrowCode()},function(){if (ulr){if (culr){ulr=false}else{}downArrowCode()}else{window.localStorage.setItem("sfilter",s_filter);window.localStorage.setItem("splayback","goa"+(sth).toString());setTimeout('window.location=website()+"App/Configuration/?action=open#phonegap=external"',500)}})
                                                  },doNothing)
                             },doNothing)*/
}
else
{
if (!sddm)
{
sddm=true
/*var ddm = document.createElement("div")
ddm.style.position="absolute"
ddm.style.top=(screen.height-50).toString()+"px"
ddm.style.left=(screen.width/2-250)+"px"
ddm.style.width="500px"
ddm.style.textAlign="center"
ddm.style.zIndex="8021"
ddm.style.backgroundColor="black"
ddm.style.fontSize="40px"
ddm.style.color="white"
ddm.innerHTML="Finger Mode"
var cssAnimation = document.createElement('style')
cssAnimation.type = 'text/css'
var rules = document.createTextNode('@-webkit-keyframes notiAnimate\r\n{\r\nfrom { opacity: 0; }\r\nto { opacity: 1; }\r\n}')
cssAnimation.appendChild(rules)
document.body.appendChild(ddm)
alert(ddm.outerHTML)
ddm.style.webkitAnimation="notiAnimate 0.5s"
    setTimeout(function(){
               ddm.style.display="none"
               },1000)
document.getElementsByTagName("head")[0].appendChild(cssAnimation)
*/
}
else
{
}
document.getElementById("splaybackopadaptor").style.display="none"
document.getElementById("splaybackop").style.display="none"
document.getElementById("s"+document.getElementById("cursong").innerHTML).style.backgroundColor=""
document.getElementById("s"+document.getElementById("cursong").innerHTML).style.whiteSpace="nowrap"
document.getElementById("cursong").innerHTML=(sth).toString()
document.getElementById("s"+document.getElementById("cursong").innerHTML).style.backgroundColor="red"
document.getElementById("s"+document.getElementById("cursong").innerHTML).style.whiteSpace=""
    window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(fs){
                             fs.root.getDirectory("Lyrics Flipper Mobile App Songs",{create:true,exclusive:false},function(d){
                                                  d.getFile(document.getElementById("s"+document.getElementById("cursong").innerHTML).innerHTML+".txt.autoturn",null,function(f){
                                                            f.file(function(ff){
                                                                   if (ff.size==0)
                                                                   {
                                                                   }
                                                                   else
                                                                   {
                                                                   document.getElementById("s"+document.getElementById("cursong").innerHTML).style.backgroundColor="lime"
                                                                   }
                                                                   },doNothing)
                                                            },doNothing)
                                                  },doNothing)
                             },doNothing)
}
}
function executeSetlist()
{
document.getElementById("menu").style.display="none"
document.getElementById("exesetlist").style.display=""
    window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(fs){
                             fs.root.getDirectory("Lyrics Flipper Mobile App Songs",{create:false,exclusive:false},function(d){
                                                  var r = d.createReader()
                                                  r.readEntries(function(e){
												  var tmf = e
var tmfi
var e = []
var objno
for (tmfi=0;tmfi<tmf.length;tmfi++)
{
e[tmfi]=tmf[tmfi].name
}
e.sort()
for (tmfi=0;tmfi<e.length;tmfi++)
{
objno=new Object()
objno.name=e[tmfi]
e[tmfi]=objno
}
                                                                for (var sli=0;sli<e.length;sli++)
                                                                {
                                                                if (e[sli].name.indexOf(".setlist")>-1==true)
                                                                {
                                                                var stn = e[sli].name
                                                                stn=stn.split("").reverse().join("")
                                                                stn=stn.substring(8)
                                                                stn=stn.split("").reverse().join("")
                                                                document.getElementById("exesetlist").innerHTML+="<div style='font-size: 25px;' onclick='setEX(this.innerHTML)'>"+stn+"</div>"
                                                                }
                                                                else
                                                                {
                                                                }
                                                                }
                                                                },doNothing)
                                                  },doNothing)
                             },doNothing)
}
function setEX(s)
{
window.localStorage.setItem("lastset",encodeURIComponent(s))
document.getElementById("floatybar").style.display="none"
document.getElementById("exesetlist").style.display="none"
    window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(fs){
                             fs.root.getDirectory("Lyrics Flipper Mobile App Songs",{create:true,exclusive:false},function(d){
                                                  d.getFile(s+".setlist",null,function(e){
                                                            e.file(function(f){
                                                                   var fr = new FileReader()
                                                                   fr.onloadend = function(evt){
                                                                   var trs = (evt.target.result).split("|")
                                                                   var htmlc = ""
                                                                   for (var tri=0;tri<trs.length;tri++)
                                                                   {
                                                                   htmlc+="<div id='s"+(tri).toString()+"' style='font-size: 36px; width: 100%; white-space: nowrap;' onclick='pedalDeactivated("+(tri).toString()+")'>"+trs[tri]+"</div>"
                                                                   }
                                                                   document.getElementById("splaybackh").innerHTML=htmlc
                                                                   document.getElementById("scount").innerHTML=(tri).toString()
                                                                   document.getElementById("cursong").innerHTML="0"
                                                                   document.getElementById("s0").style.backgroundColor="red"
																   document.getElementById("splaybackopadaptor").style.display=""
																   document.getElementById("splaybackop").style.display=""
																   document.body.addEventListener("keydown",function(evt){
if (evt.keyCode==32 || evt.keyCode==49 || evt.keyCode==50)
{
upArrowCode()
}
else if (evt.keyCode==13 || evt.keyCode==51 || evt.keyCode==52)
{
downArrowCode()
}
else
{
}
},false)
                                                                   checkSetAT()
                                                                   }
                                                                   fr.readAsText(f)
                                                                   },doNothing)
                                                            },function(){
                                                            document.getElementById("ces_edit").style.display="none"
                                                            CES()
                                                            })
                                                  },doNothing)
                             },doNothing)
}
function checkSetAT()
{
    window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(fs){
                             fs.root.getDirectory("Lyrics Flipper Mobile App Songs",{create:true,exclusive:false},function(d){
                                                  d.getFile(document.getElementById("s0").innerHTML+".txt.autoturn",null,function(f){
                                                            f.file(function(ff){
                                                                   if (ff.size==0)
                                                                   {
                                                                   }
                                                                   else
                                                                   {
                                                                   document.getElementById("s0").style.backgroundColor="lime"
                                                                   }
                                                                   },doNothing)
                                                            },doNothing)
                                                  },doNothing)
                             },doNothing)
}
    window.onerror = function(e,u,l){
        console.log("[Cordova.webView.compiledHTML.JavaScript.ERROR.Description] = "+e+" on line "+(l).toString())
    }
function changeFSize()
{
var fsize = prompt("Please enter the font size:",window.localStorage.getItem("fsize"))
window.localStorage.setItem("fsize",fsize)
window.location.reload()
}
function prepareDownloadSongs()
{
window.requestFileSystem(LocalFileSystem.PERSISTENT,0,downloadSongs,null)
}
function downloadSongs(fs)
{
fs.root.getDirectory("Lyrics Flipper Mobile App Songs",{create:false,exclusive:false},startMediaDownload,doNothing)
}
function startMediaDownload(fe)
{
feo=fe
var listSongFiles = document.createElement("iframe")
listSongFiles.style.display="none"
listSongFiles.src=website()+"forid-list-songs.php?name="+document.getElementById("usernameinput").value
document.body.appendChild(listSongFiles)
listSongFiles.contentWindow.addEventListener("load",function(){
lsfdata = listSongFiles.contentWindow.document.getElementById("songlist").value.split("|")
document.getElementById("menu").style.display="none"
document.getElementById("downloading").style.display=""
downloadSongFiles(lsfdata,fe.fullPath)
})
}
function downloadSongFiles(d,fep)
{
alert("ok")
nextSongDownload(d[sdownloadnum],fep,feo)
}
function nextSongDownload(s,fp,feo)
{
alert("X")
    window.resolveLocalFileSystemURI("file://"+fp+"/"+s,function(e){
                                     e.file(function(fe){
                                            var ossd = document.createElement("iframe")
                                            ossd.style.display="none"
                                            ossd.src=website()+"get-song-bytes.php?name="+document.getElementById("usernameinput").value+"&song="+s
                                            document.body.appendChild(ossd)
                                            ossd.contentWindow.addEventListener("load",function(){
                                            var size = parseInt(ossd.contentWindow.document.getElementById("songbytes").value)
                                            if (fe.size==size)
                                                                                {
                                                                                var liframe = document.createElement("iframe")
                                                                                liframe.style.display="none"
                                                                                liframe.src=website()+"song-has-lyrics.php?name="+document.getElementById("usernameinput").value+"&song="+encodeURIComponent(s)
                                                                                document.body.appendChild(liframe)
                                                                                liframe.contentWindow.addEventListener("load",function(){
                                                                                                                       if (liframe.contentWindow.document.getElementById("has_lyrics").value=="1")
                                                                                                                       {
                                                                                                                       //var lft = new FileTransfer()
                                                                                                                       var ss = s
                                                                                                                       ss=ss.split("").reverse().join("")
                                                                                                                       ss=ss.substring(4)
                                                                                                                       ss=ss.split("").reverse().join("")
                                                                                                                       ss+=".txt"
                                                                                                                       var lft = document.createElement("iframe")
																													   lft.style.display="none"
																													   lft.src=website()+"get-song-base64.php?name="+document.getElementById("usernameinput").value+"&song="+encodeURIComponent(s)
																													   lft.contentWindow.addEventListener("load",function(){
                                                                                                                                    feo.getFile(s,{create:true,exclusive:false},function(){
																																	e.createWriter(function(w){
																																	w.onwriteend = function(){
																																	getAutoTurn(fp,s)
																																	}
																																	w.write(window.atob(lft.contentWindow.document.getElementById("base64").value))
																																	},doNothing)
																																	},function(e){alert(e.code)})
                                                                                                                                    },false)
                                                                                                                       }
                                                                                                                       else
                                                                                                                       {
                                                                                                                       getAutoTurn(fp,s)
                                                                                                                       }
                                                                                                                       
                                                                                                                       },false)
                                                                                }
                                                                                
                                                                                else
                                                                                {
                                                                                //var ft = new FileTransfer()
																				var ss = s
                                                                                                                       ss=ss.split("").reverse().join("")
                                                                                                                       ss=ss.substring(4)
                                                                                                                       ss=ss.split("").reverse().join("")
                                                                                                                       ss+=".mp3"
                                                                                                                       var ft = document.createElement("iframe")
																													   ft.style.display="none"
																													   ft.src=website()+"get-song-base64.php?name="+document.getElementById("usernameinput").value+"&song="+encodeURIComponent(s)
																													   ft.contentWindow.addEventListener("load",function(){
                                                                                                                                    feo.getFile(s,{create:true,exclusive:false},function(){
																																	e.createWriter(function(w){
																																	w.onwriteend = function(){
                                                                                            var liframe = document.createElement("iframe")
                                                                                            liframe.style.display="none"
                                                                                            liframe.src=website()+"song-has-lyrics.php?name="+document.getElementById("usernameinput").value+"&song="+encodeURIComponent(s)
                                                                                            document.body.appendChild(liframe)
                                                                                            liframe.contentWindow.addEventListener("load",function(){
                                                                                                                                   if (liframe.contentWindow.document.getElementById("has_lyrics").value=="1")
                                                                                                                       {
                                                                                                                       //var lft = new FileTransfer()
                                                                                                                       var ss = s
                                                                                                                       ss=ss.split("").reverse().join("")
                                                                                                                       ss=ss.substring(4)
                                                                                                                       ss=ss.split("").reverse().join("")
                                                                                                                       ss+=".txt"
                                                                                                                       var lft = document.createElement("iframe")
																													   lft.style.display="none"
																													   lft.src=website()+"get-song-base64.php?name="+document.getElementById("usernameinput").value+"&song="+encodeURIComponent(s)
																													   lft.contentWindow.addEventListener("load",function(){
                                                                                                                                    feo.getFile(s,{create:true,exclusive:false},function(){
																																	e.createWriter(function(w){
																																	w.onwriteend = function(){
																																	getAutoTurn(fp,s)
																																	}
																																	w.write(window.atob(lft.contentWindow.document.getElementById("base64").value))
																																	},doNothing)
																																	},function(e){alert(e.code)})
                                                                                                                                    },false)
                                                                                                                       }
                                                                                                                       else
                                                                                                                       {
                                                                                                                       getAutoTurn(fp,s)
                                                                                                                       }
																													   },false)
                                                                                                                                   
                                                                                                                                   
                                                                                                                                   
                                                                                                                                   }
																																	w.write((ft.contentWindow.document.getElementById("base64").value))
																																	},doNothing)
																																	},doNothing)
																																	},false)
																																	
																																	
                                                                                                                                    //},false)
                                                                                //}
                                                                                //}
                                            //},false)
                                            
                                            
											
											}
											},false)
                                     },function(e){
									 //var ft = new FileTransfer()
																				var ss = s
                                                                                                                       ss=ss.split("").reverse().join("")
                                                                                                                       ss=ss.substring(4)
                                                                                                                       ss=ss.split("").reverse().join("")
                                                                                                                       ss+=".mp3"
                                                                                                                       var ft = document.createElement("iframe")
																													   ft.style.display="none"
																													   ft.src=website()+"get-song-base64.php?name="+document.getElementById("usernameinput").value+"&song="+encodeURIComponent(s)
																													   ft.contentWindow.addEventListener("load",function(){
                                                                                                                                    feo.getFile(s,{create:true,exclusive:false},function(){
																																	e.createWriter(function(w){
																																	w.onwriteend = function(){
                                                                                            var liframe = document.createElement("iframe")
                                                                                            liframe.style.display="none"
                                                                                            liframe.src=website()+"song-has-lyrics.php?name="+document.getElementById("usernameinput").value+"&song="+encodeURIComponent(s)
                                                                                            document.body.appendChild(liframe)
                                                                                            liframe.contentWindow.addEventListener("load",function(){
                                                                                                                                   if (liframe.contentWindow.document.getElementById("has_lyrics").value=="1")
                                                                                                                       {
                                                                                                                       //var lft = new FileTransfer()
                                                                                                                       var ss = s
                                                                                                                       ss=ss.split("").reverse().join("")
                                                                                                                       ss=ss.substring(4)
                                                                                                                       ss=ss.split("").reverse().join("")
                                                                                                                       ss+=".txt"
                                                                                                                       var lft = document.createElement("iframe")
																													   lft.style.display="none"
																													   lft.src=website()+"get-song-base64.php?name="+document.getElementById("usernameinput").value+"&song="+encodeURIComponent(s)
																													   lft.contentWindow.addEventListener("load",function(){
                                                                                                                                    feo.getFile(s,{create:true,exclusive:false},function(){
																																	e.createWriter(function(w){
																																	w.onwriteend = function(){
																																	getAutoTurn(fp,s)
																																	}
																																	w.write(window.atob(lft.contentWindow.document.getElementById("base64").value))
																																	},doNothing)
																																	},function(e){alert(e.code)})
                                                                                                                                    },false)
                                                                                                                       }
                                                                                                                       else
                                                                                                                       {
                                                                                                                       getAutoTurn(fp,s)
                                                                                                                       }
																													   },false)
                                                                                                                                   
                                                                                                                                   
                                                                                                                                   
                                                                                                                                   }
																																	w.write(window.atob(ft.contentWindow.document.getElementById("base64").value))
																																	},doNothing)
																																	},doNothing)
																																	},false)
																																	
																																	
                                                                                                                                    //},false)
                                                                                //}
                                                                                //}
                                            //},false)
                                            
                                            
											
                                     })})
}
function songDownloadDone(ifp)
{
sdownloadnum++
if (lsfdata[sdownloadnum])
{
document.getElementById("downgeninfo").innerHTML="Current Song: "+lsfdata[sdownloadnum]
document.getElementById("proginner").style.width=(Math.round(parseFloat(parseFloat(100)/parseFloat(lsfdata.length)*parseFloat(parseFloat(sdownloadnum)+parseFloat(1))))).toString()+"%"
nextSongDownload(lsfdata[sdownloadnum],ifp)
}
else
{
checkSetlistDownload()
}
}
function checkSetlistDownload()
{
    window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(fs){
                             fs.root.getDirectory("Lyrics Flipper Mobile App Songs",{create:false,exclusive:false},function(d){
                                                  lookForSetlists(d.fullPath)
                                                  },doNothing)
                             },doNothing)
}
function lookForSetlists(p)
{
    document.getElementById("downgeninfo").innerHTML="Looking For Setlists..."
    document.getElementById("proginner").style.width="0%"
    var setiframe = document.createElement("iframe")
    setiframe.src=website()+"forid-enum-setlists.php?name="+document.getElementById("usernameinput").value
    setiframe.style.display="none"
    document.body.appendChild(setiframe)
    setiframe.contentWindow.addEventListener("load",function(){
                                             dsets=(setiframe.contentWindow.document.getElementById("sets").value).split("|")
                                             downloadSetlists(p)
                                             },false)
}
function downloadSetlists(fp)
{
nextSetDownload(0,fp)
}
function nextSetDownload(n,sfp)
{
document.getElementById("downgeninfo").innerHTML=dsets[n]+".setlist"
document.getElementById("proginner").style.width=(Math.round(100/(dsets.length-1)*n)).toString()+"%"
                                                                                                                       var sft = document.createElement("iframe")
																													   sft.style.display="none"
																													   sft.src=website()+"forid-set-down-gen.php?name="+document.getElementById("usernameinput").value+"&set="+encodeURIComponent(dsets[n])+".txt"
																													   sft.contentWindow.addEventListener("load",function(){
                                                                                                                                    feo.getFile(dsets[n]+".setlist",{create:true,exclusive:false},function(){
																																	e.createWriter(function(w){
																																	w.onwriteend = function(){
																																	setDownloadDone(n,sfp)
																																	}
																																	w.write(sft.contentWindow.document.getElementById("base64").value)
																																	},doNothing)
																																	},function(e){alert(e.code)})
                                                                                                                                    },false)
}
function setDownloadDone(z,sfpv)
{
if (dsets[(z+1)])
{
nextSetDownload((z+1),sfpv)
}
else
{
window.location.reload()
}
}
function useTheMP3(mpn)
{
usedMP.push(mpn)
}
function usedTheMP3(mpn)
{
var mpni
var mpretval = false
if (usedMP.length==0)
{
return false
}
else
{
for (mpni=0;mpni<usedMP.length;mpni++)
{
if (usedMP[mpni]==mpn)
{
mpretval=true
}
else
{
}
}
return mpretval
}
}
function CESet()
{
document.getElementById("splaybackop").style.display="none"
document.getElementById("splaybackopadaptor").style.display="none"
document.getElementById("ces_edit").style.display=""
document.getElementById("menu").style.display="none"
    window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(fs){
                             fs.root.getDirectory("Lyrics Flipper Mobile App Songs",{create:false,exclusive:false},function(d){
                                                  var r = d.createReader()
                                                  r.readEntries(function(e){
												  var tmf = e
var tmfi
var e = []
var objno
for (tmfi=0;tmfi<tmf.length;tmfi++)
{
e[tmfi]=tmf[tmfi].name
}
e.sort()
for (tmfi=0;tmfi<e.length;tmfi++)
{
objno=new Object()
objno.name=e[tmfi]
e[tmfi]=objno
}
                                                                for (var sli=0;sli<e.length;sli++)
                                                                {
                                                                if (e[sli].name.indexOf(".setlist")>-1==true)
                                                                {
                                                                var stn = e[sli].name
                                                                stn=stn.split("").reverse().join("")
                                                                stn=stn.substring(8)
                                                                stn=stn.split("").reverse().join("")
                                                                document.getElementById("ces_edit").innerHTML+="<div style='font-size: 25px;' onclick='editSetItem(this.innerHTML)'>"+stn+"</div>"
                                                                }
                                                                else
                                                                {
                                                                }
                                                                }
                                                                },doNothing)
                                                  },doNothing)
                             },doNothing)
}
function editSetItem(si)
{
    if (si=="" || si==null || si==undefined)
    {return}
    else
    {
    }
    document.getElementById("ces_file").innerHTML=si
    window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(fs){
                             fs.root.getDirectory("Lyrics Flipper Mobile App Songs",{create:true,exclusive:false},function(d){
							 var r = d.createReader()
							 r.readEntries(function(g){
							 var tmf = g
var tmfi
var g = []
var objno
for (tmfi=0;tmfi<tmf.length;tmfi++)
{
g[tmfi]=tmf[tmfi].name
}
g.sort()
for (tmfi=0;tmfi<g.length;tmfi++)
{
objno=new Object()
objno.name=g[tmfi]
g[tmfi]=objno
}
							 var p
							 for (p=0;p<g.length;p++)
							 {
							 if (g[p].name.indexOf(".setlist")>-1==true || g[p].name.indexOf(".autoturn")>-1==true)
							 {
							 continue
							 }
							 else
							 {
							 }
							 var o = g[p].name
							 o=o.split("").reverse().join("")
							 o=o.substring(4)
							 o=o.split("").reverse().join("")
							 if (g[p].name.indexOf(".mp3")>-1==true)
							 {
							 document.getElementById("media").innerHTML+="<div id='song"+(p).toString()+"' style='color: black; cursor: pointer;' onclick='addSong("+(p).toString()+")'>"+o+"</div>"
							 document.getElementById("sscount").innerHTML=(parseInt(document.getElementById("sscount").innerHTML)+parseInt(1)).toString()
							 }
							 else if (g[p].name.indexOf(".txt")>-1==true)
							 {
							 d.getFile(o+".mp3",{create:false,exclusive:false},function(){},function(){
							 document.getElementById("media").innerHTML+="<div id='song"+(p).toString()+"' style='color: black; cursor: pointer;' onclick='addSong("+(p).toString()+")'>"+o+"</div>"
							 document.getElementById("sscount").innerHTML=(parseInt(document.getElementById("sscount").innerHTML)+parseInt(1)).toString()
							 })
							 }
							 else
							 {
							 }
							 }
							 //alert("done")
							 listSetITMS()
							 },doNothing)
                                                  },doNothing)
                             },doNothing)
}
function CES()
{
document.getElementById("menu").style.display="none"
document.getElementById("ces_zone").style.display=""
document.getElementById("floatybar").innerHTML="Setlist Editor"
    window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(fs){
                             fs.root.getDirectory("Lyrics Flipper Mobile App Songs",{create:false,exclusive:false},function(d){
                                                  var dr = d.createReader()
                                                  dr.readEntries(function(e){
                                                                 var sarr = []
                                                                 var barr = []
                                                                 for (var fi=0;fi<e.length;fi++)
                                                                 {
                                                                 if (e[fi].name.indexOf(".mp3")>-1==true)
                                                                 {
                                                                 barr.push(e[fi].name)
                                                                 }
                                                                 else if (e[fi].name.indexOf(".txt")>-1==true && e[fi].name.indexOf(".autoturn")>-1==false)
                                                                 {
                                                                 barr.push(e[fi].name)
                                                                 }
                                                                 else
                                                                 {
                                                                 }
                                                                 }
                                                                 for (var i=0;i<barr.length;i++)
                                                                 {
                                                                 if (barr[i].indexOf(".mp3")>-1==true)
                                                                 {
                                                                 sarr.push(barr[i])
                                                                 }
                                                                 else if (barr[i].indexOf(".txt")>-1==true && barr.join("|").indexOf(deMP3ize(barr[i])+".mp3")>-1==false)
                                                                 {
                                                                 sarr.push(barr[i])
                                                                 }
                                                                 else
                                                                 {
                                                                 }
                                                                 }
                                                                 listSetITMS()
                                                                 },doNothing)
                                                  },doNothing)
                             },doNothing)
}
function listSetITMS()
{
document.getElementById("ces_edit").style.display="none"
document.getElementById("ces_zone").style.display=""
document.getElementById("floatybar").innerHTML="Setlist Editor"
document.getElementById("scount").innerHTML="0"
window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(fs){
fs.root.getDirectory("Lyrics Flipper Mobile App Songs",{create:false,exclusive:false},function(d){
d.getFile(document.getElementById("ces_file").innerHTML+".setlist",{create:false,exclusive:false},function(f){
setexal=false
f.file(function(j){
var sr = new FileReader()
sr.onloadend = function(evt){
var ji
for (ji=0;ji<((evt.target.result).split("|")).length;ji++)
{
document.getElementById("setmedia").innerHTML+="<div id='es"+(ji).toString()+"' style='color: black;'><div id='ans"+(ji).toString()+"' style='display: inline;'>"+(ji+1).toString()+"</div><div id='ns"+(ji).toString()+"' style='display: inline;'>&#160;&#160;&#160;</div><div id='s"+(ji).toString()+"' style='display: inline;'>"+((evt.target.result).split("|"))[ji]+"</div></div>"
document.getElementById("scount").innerHTML=(parseInt(document.getElementById("scount").innerHTML)+parseInt(1)).toString()
}
}
sr.readAsText(j)
},doNothing)
},function(w){setexal=true})
},doNothing)
},doNothing)
}
function addSong(sn)
{
var html
html="<div id='es"+document.getElementById("scount").innerHTML+"' style='color: black;'><div id='ans"+document.getElementById("scount").innerHTML+"' style='display: inline;'>"+(parseInt(document.getElementById("scount").innerHTML)+parseInt(1)).toString()+"</div><div id='ns"+document.getElementById("scount").innerHTML+"' style='display: inline;'>&#160;&#160;&#160;</div>"
html+="<div id='s"+document.getElementById("scount").innerHTML+"' style='display: inline;'>"+document.getElementById("song"+sn).innerHTML+"</div></div>"
document.getElementById("setmedia").innerHTML+=html
document.getElementById("scount").innerHTML=parseInt(document.getElementById("scount").innerHTML)+parseInt(1)
}
function deleteSong()
{
var songsAfter
var strDelete
if (document.getElementById("scount").innerHTML=="0")
{
alert("There are no songs in your setlist.")
return
}
else
{
}
strDelete = prompt("Type the number of the item in the setlist that you want to delete.\n"+function(){
if (document.getElementById("scount").innerHTML=="1")
{
return "There is 1 item in your setlist."
}
else
{
return "There are "+document.getElementById("scount").innerHTML+" items in your setlist."
}
}())
if (strDelete==null)
{
return
}
else
{
}
strDelete = parseInt(strDelete)-parseInt(1)
if (document.getElementById("es"+strDelete))
{
}
else
{
alert("The number you entered is out of range.")
return
}
songsAfter=parseInt(strDelete)+parseInt(1)
while (true)
{
if (document.getElementById("es"+songsAfter))
{
document.getElementById("ans"+songsAfter).innerHTML=parseInt(document.getElementById("ans"+songsAfter).innerHTML)-parseInt(1)
document.getElementById("es"+songsAfter).id="es"+(parseInt(songsAfter)-parseInt(1))
document.getElementById("ans"+songsAfter).id="ans"+(parseInt(songsAfter)-parseInt(1))
document.getElementById("ns"+songsAfter).id="ns"+(parseInt(songsAfter)-parseInt(1))
document.getElementById("s"+songsAfter).id="s"+(parseInt(songsAfter)-parseInt(1))
songsAfter++
}
else
{
break
}
}
document.getElementById("setmedia").removeChild(document.getElementById("es"+strDelete))
document.getElementById("scount").innerHTML=parseInt(document.getElementById("scount").innerHTML)-parseInt(1)
}
function swapSong()
{
var swap1 = prompt("Enter the number of the item you want to swap.\n"+function(){
if (document.getElementById("scount").innerHTML=="1")
{
return "There is 1 item in your setlist."
}
else
{
return "There are "+document.getElementById("scount").innerHTML+" items in your setlist."
}
}())
if (swap1==null)
{
return
}
else
{
}
var swap2 = prompt("Enter the number of the item you want to swap Item "+swap1+" with.")
if (swap2==null)
{
return
}
else
{
}
var swap1html
var swap2html
swap1=parseInt(swap1)-parseInt(1)
swap2=parseInt(swap2)-parseInt(1)
if (document.getElementById("es"+swap1) && document.getElementById("es"+swap2))
{
swap1html = document.getElementById("s"+swap1).innerHTML
swap2html = document.getElementById("s"+swap2).innerHTML
document.getElementById("s"+swap1).innerHTML=swap2html
document.getElementById("s"+swap2).innerHTML=swap1html
}
else
{
alert("The numbers you entered are out of range.")
}
}
function moveItem()
{
var i
var songArray = []
var move1 = prompt("Enter the number of the item you want to move.\n"+function(){
if (document.getElementById("scount").innerHTML=="1")
{
return "There is 1 item in your setlist."
}
else
{
return "There are "+document.getElementById("scount").innerHTML+" items in your setlist."
}
}())
if (move1==null)
{
return
}
else
{
}
var move2 = prompt("Enter the location you want to move "+move1+" to.")
if (move2==null)
{
return
}
else
{
}
move1=parseInt(move1)-parseInt(1)
move2=parseInt(move2)-parseInt(1)
if (document.getElementById("es"+move1) && document.getElementById("es"+move2))
{
}
else
{
alert("The numbers you entered are out of range.")
return
}
if (move1==move2)
{
return
}
else
{
}
for (i=0;i<parseInt(document.getElementById("scount").innerHTML);i++)
{
songArray.push(document.getElementById("s"+i).innerHTML)
}
songArray=moveArray(songArray,move1,move2)
for (i=0;i<songArray.length;i++)
{
document.getElementById("s"+i).innerHTML=songArray[i]
}
}
function moveArray(arr,old_index,new_index)
{
if (new_index>=arr.length)
{
var k = new_index - arr.length
while ((k--) + 1)
{
arr.push(undefined)
}
}
arr.splice(new_index,0,arr.splice(old_index, 1)[0])
return arr
}
function searchFocus()
{
if (document.getElementById("searchbox").value=="Filter Out")
{
document.getElementById("searchbox").value=""
document.getElementById("searchbox").style.color=""
}
else
{
}
}
function searchBlur()
{
if (document.getElementById("searchbox").value=="")
{
document.getElementById("searchbox").value="Filter Out"
document.getElementById("searchbox").style.color="gray"
}
else
{
}
}
function addAll()
{
var s
for (s=0;s<parseInt(document.getElementById("sscount").innerHTML);s++)
{
if (document.getElementById("media").childNodes[s]==null)
{
continue
}
else
{
}
if (document.getElementById("media").childNodes[s].style.display=="none")
{
}
else
{
eval(document.getElementById("media").childNodes[s].getAttribute("onclick"))
}
}
}
function searchSongs()
{
var ss, q, t = false
/*for (ss=0;ss<parseInt(document.getElementById("sscount").innerHTML);ss++)
{
if (t==true)
{
t=false
ss=ss-1
continue
}
else
{
}
q=document.getElementById("song"+(ss).toString())
if (q==null)
{
t=true
continue
}
else
{
}
if (q.innerHTML.indexOf(document.getElementById("searchbox").value)>-1==true)
{
q.style.display="none"
}
else
{
q.style.display=""
}
if (document.getElementById("searchbox").value=="")
{
q.style.display=""
}
else
{
}
}*/
for (ss=0;ss<parseInt((document.getElementById("media").childNodes).length);ss++)
{
q=document.getElementById("media").childNodes[ss]
if (q.innerHTML==undefined)
{
alert(q.outerHTML)
}
else
{
}
if (q.innerHTML.indexOf(document.getElementById("searchbox").value)>-1==true)
{
q.style.display="none"
}
else
{
q.style.display=""
}
if (document.getElementById("searchbox").value=="")
{
q.style.display=""
}
else
{
}
}
}
function saveSet()
{
var setcont = ""
var sci
for (sci=0;sci<parseInt(document.getElementById("scount").innerHTML);sci++)
{
if (setcont=="")
{
setcont=document.getElementById("s"+(sci).toString()).innerHTML
}
else
{
setcont+="|"+document.getElementById("s"+(sci).toString()).innerHTML
}
}
window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(fs){
fs.root.getDirectory("Lyrics Flipper Mobile App Songs",{create:false,exclusive:false},function(f){
f.getFile(document.getElementById("ces_file").innerHTML+".setlist",{create:setexal,exclusive:false},function(fe){
fe.createWriter(function(sw){
sw.onwriteend = function(){
if (navigator.onLine)
{
document.getElementById("foross_name").value=document.getElementById("usernameinput").value
document.getElementById("foross_file").value="setlists/"+document.getElementById("ces_file").innerHTML+".txt"
document.getElementById("foross_uploadcont").value=setcont
document.getElementById("foross_submit").submit()
document.getElementById("foross_submitframe").onload=function(){
document.getElementById("foross_release_text_name").value=document.getElementById("usernameinput").value
document.getElementById("foross_submitframe").onload=function(){
window.location.reload()
}
document.getElementById("foross_release_text").submit()
}
document.getElementById("foross_submit").submit()
}
else
{
window.location.reload()
}
}
sw.write(setcont)
},doNothing)
},doNothing)
},doNothing)
},doNothing)
}
function songPKG()
{
var w = window.open("http://lyricsflipperplus.com/forad-d-pkg-start.php?name="+encodeURIComponent(document.getElementById("usernameinput").value),"_system","")
}
function login()
{
document.getElementById("welcome").style.display="none"
var iframe = document.createElement("iframe")
iframe.src=website()+"forid-ae.php?name="+encodeURIComponent(document.getElementById("username").value)
iframe.style.display="none"
document.body.appendChild(iframe)
iframe.contentWindow.addEventListener("load",function(){
if (iframe.contentWindow.document.body.innerHTML.indexOf("yes")>-1==true)
{
var iframe2 = document.createElement("iframe")
iframe2.src=website()+"Online%20Service/"+document.getElementById("username").value+"/password.txt"
iframe2.style.display="none"
document.body.appendChild(iframe2)
iframe2.contentWindow.addEventListener("load",function(){
if (iframe2.contentWindow.document.getElementsByTagName("pre")[0].innerHTML==document.getElementById("pass").value)
{
window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(fs){
fs.root.getDirectory("Lyrics Flipper Mobile App Sync OS Info",{create:false,exclusive:false},function(d){
d.getFile("ruser.txt",{create:true,exclusive:false},function(fe){
fe.createWriter(function(fw){
fw.onwriteend = function(){
window.location.reload()
}
fw.write(document.getElementById("username").value)
},doNothing)
},doNothing)
},doNothing)
},doNothing)
}
else
{
showIncorrectAccount()
}
},false)
}
else if (iframe.contentWindow.document.body.innerHTML.indexOf("no")>-1==true)
{
showIncorrectAccount()
}
else
{
showIncorrectAccount()
}
},false)
}
function showIncorrectAccount()
{
document.getElementById("floatybar").innerHTML="User Error"
document.getElementById("incorrectaccount").style.display=""
}
function logOut()
{
//alert("remove")
window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(fs){
//alert("filesystem")
fs.root.getDirectory("Lyrics Flipper Mobile App Sync OS Info",{create:false,exclusive:false},function(d){
//alert("Dir")
d.getFile("ruser.txt",{create:false,exclusive:false},function(fe){
//alert("lets remove it!")
fe.remove(function(){
window.location.reload()
},doNothing)
},doNothing)
},doNothing)
},doNothing)
}
function toggleCourier()
{
if (window.localStorage.getItem("courier")=="1")
{
window.localStorage.setItem("courier","0")
alert("Courier is now off.\nTap the button again to turn it back on.")
}
else
{
window.localStorage.setItem("courier","1")
alert("Courier is now on.\nTap the button again to turn it back off.")
}
}
function MAM()
{
var iframe = document.createElement("iframe")
iframe.src="http://lyricsflipperplus.com/Online%20Service/"+encodeURIComponent(document.getElementById("usernameinput").value)+"/password.txt"
iframe.style.display="none"
iframe.onload = function(){
p=iframe.contentWindow.document.getElementsByTagName("pre")[0].innerHTML
var w = window.open("http://lyricsflipperplus.com/manageos.php?name="+encodeURIComponent(document.getElementById("usernameinput").value)+"&password="+encodeURIComponent(p)+"&hjss=1","_system","")
}
document.body.appendChild(iframe)
}
function startFetchData()
{
document.getElementById("menu").style.display="none"
document.getElementById("downloadwaiter").style.display=""
window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(dfs){
dfs.root.getDirectory("Lyrics Flipper Mobile App Songs",{create:false,exclusive:false},function(dlf){
DFileSys = dfs
DLFolder = dlf
var xh = new XMLHttpRequest()
xh.onreadystatechange = function(){
if (xh.readyState==4 && xh.status==200)
{
dml = xh.responseXML
parseFetchedData()
}
else
{
}
}
xh.open("GET",website()+"get-song-xml.php?name="+document.getElementById("usernameinput").value,true)
xh.send()
},doNothing)
},doNothing)
}
function parseFetchedData()
{
files = dml.getElementsByTagName("file")
for (fi=0;fi<files.length;fi++)
{
if (fi==curDN)
{
}
else
{
continue
}
try
{
cp=files[fi].attributes.path.value
/*if (files[fi].attributes.type.value=="song")
{
}
else if (files[fi].attributes.type.value=="lyrics")
{
}
else if (files[fi].attributes.type.value=="AutoTurn")
{
}
else if (files[fi].attributes.type.value=="setlist")
{
}
else
{
}*/
dp=website()+"forid-mobile-to-server-path.php?name="+document.getElementById("usernameinput").value+"&path="+encodeURIComponent(cp)
document.getElementById("curdfile").innerHTML=cp
var dt = new XMLHttpRequest()
dt.onreadystatechange = function(){
if (dt.readyState==4 && dt.status==200)
{
if (dt.responseType=="arraybuffer")
{
var ua = new Uint8Array(dt.response), ual, uas = []
ual=ua.length
while (ual--)
{
uas[ual]=String.fromCharCode(ua[ual])
}
fdtw=uas.join("")
}
else
{
fdtw=dt.responseText
}
DLFolder.getFile(cp,{create:true,exclusive:false},writeFetchedFile,function(e){
DLFolder.getFile(cp,{create:false,exclusive:false},writeFetchedFile,doNothing)
})
}
else
{
}
}
dt.open("GET",dp,true)
if (files[fi].attributes.type.value=="song")
{
dt.responseType="arraybuffer"
}
else
{
}
dt.send()
curDN++
return
}
catch(err)
{
alert("An error has occured: "+err)
curDN++
continue
}
curDN++
}
window.location.reload()
}
function writeFetchedFile(fe)
{
alert("at least wff")
fe.createWriter(function(fw){
alert("writer")
fw.onwriteend = function(){
alert("written")
document.getElementById("waitdproggreen").style.width=(100/files.length*(fi+1)).toString()+"%"
parseFetchedData()
}
fw.write(fdtw)
},doNothing)
}
function loadLastSet()
{
if (document.getElementById("menu").style.display=="none")
{
}
else
{
if (window.localStorage.getItem("lastset"))
{
}
else
{
alert("You haven't loaded any setlists.\nPlease load at least one setlist before using the last setlist feature.")
return
}
document.getElementById("menu").style.display="none"
document.getElementById("floatybar").innerHTML="Loading Last Setlist..."
setEX(decodeURIComponent(window.localStorage.getItem("lastset")))
}
}
function showMAMOptions()
{
document.getElementById("menu").style.display="none"
document.getElementById("MAMOptions").style.display=""
document.getElementById("floatybar").innerHTML="What would you like to do?"
}
function renameFile()
{
document.getElementById("floatybar").innerHTML="File Manager"
document.getElementById("MAMOptions").style.display="none"
document.getElementById("renameHolder-contained").style.display=""
window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(rfs){
rfs.root.getDirectory("Lyrics Flipper Mobile App Songs",{create:false,exclusive:false},function(rf){
var rfr = rf.createReader()
rfr.readEntries(function(rfe){
var tmf = rfe
var tmfi
var rfe = []
var objno
for (tmfi=0;tmfi<tmf.length;tmfi++)
{
rfe[tmfi]=tmf[tmfi].name
}
rfe.sort()
for (tmfi=0;tmfi<rfe.length;tmfi++)
{
objno=new Object()
objno.name=rfe[tmfi]
rfe[tmfi]=objno
}
var rfei
var renameHTML = "<table border='0'><tbody><tr><th style='font-size: 30px;'>Type</th><th style='font-size: 30px;'>File</th></tr>"
var rt
var an
for (rfei=0;rfei<rfe.length;rfei++)
{
if ((rfe[rfei].name).indexOf(".mp3")>-1==true)
{
rt="Music"
an=(rfe[rfei].name).substring(0,(rfe[rfei].name).length-4)
}
else if ((rfe[rfei].name).indexOf(".txt")>-1==true)
{
if ((rfe[rfei].name).indexOf(".txt.autoturn")>-1==true)
{
rt="AutoTurn"
an=(rfe[rfei].name).substring(0,(rfe[rfei].name).length-13)
}
else
{
rt="Lyrics"
an=(rfe[rfei].name).substring(0,(rfe[rfei].name).length-4)
}
}
else if ((rfe[rfei].name).indexOf(".setlist")>-1==true)
{
rt="Setlist"
an=(rfe[rfei].name).substring(0,(rfe[rfei].name).length-8)
}
else
{
}
renameHTML+="<tr onclick="+'"'+"actionSong('"+rt+"','"+(an).replace(/\'/g,"\\'")+"')"+'"'+"><td style='font-size: 30px;'>"+rt+"</td><td style='font-size: 30px; text-align: center;'>"+an+"</td></tr>"
}
renameHTML+="</tbody></table>"
document.getElementById("renameHolder").innerHTML=renameHTML
},doNothing)
},doNothing)
},doNothing)
}
function renameSong(rt,an)
{
var rext
var newname = prompt("New name for "+rt+" "+an+":",an)
if (newname)
{
if (rt=="Music")
{
rext=".mp3"
}
else if (rt=="Lyrics")
{
rext=".txt"
}
else if (rt=="AutoTurn")
{
rext=".txt.autoturn"
}
else if (rt=="Setlist")
{
rext=".setlist"
}
window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(rs){
rs.root.getDirectory("Lyrics Flipper Mobile App Songs",{create:false,exclusive:false},function(rd){
rd.getFile(an+rext,{create:false,exclusive:false},function(rgf){
rgf.moveTo(rd,newname+rext,function(){
document.getElementById("renameHolder-contained").style.display="none"
renameFile()
},doNothing)
},doNothing)
},doNothing)
},doNothing)
}
else
{
document.getElementById("renameHolder-contained").style.display="none"
renameFile()
}
}
function actionSong(rt,an)
{
if (rt=="Music")
{
var modif = ""
}
else
{
var modif = ",Modify It"
}
navigator.notification.confirm(rt+" "+an,function(ncr){
if (ncr==1)
{
renameSong(rt,an)
}
else if (ncr==2)
{
removeSong(rt,an)
}
else if (ncr==3)
{
if (rt=="AutoTurn")
{
modifyAutoTurn(an,rt)
}
else if (rt=="Setlist")
{
document.getElementById("renameHolder-contained").style.display="none"
editSetItem(an)
document.body.scrollTop = 0
}
else if (rt=="Lyrics")
{
newLyrics(an)
document.body.scrollTop = 0
}
else
{
}
}
else
{
}
},"What would you like to do to","Rename It,Delete It"+modif)
}
function removeSong(rt,an)
{
var rext
if (confirm("Press OK to confirm the deletion of "+rt+" "+an+"."))
{
if (rt=="Music")
{
rext=".mp3"
}
else if (rt=="Lyrics")
{
rext=".txt"
}
else if (rt=="AutoTurn")
{
rext=".txt.autoturn"
}
else if (rt=="Setlist")
{
rext=".setlist"
}
window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(rs){
rs.root.getDirectory("Lyrics Flipper Mobile App Songs",{create:false,exclusive:false},function(rd){
rd.getFile(an+rext,{create:false,exclusive:false},function(rgf){
rgf.remove(function(){
document.getElementById("renameHolder-contained").style.display="none"
renameFile()
},doNothing)
},doNothing)
},doNothing)
},doNothing)
}
else
{
document.getElementById("renameHolder-contained").style.display="none"
renameFile()
}
}
function modifyAutoTurn(an,rt)
{
window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(rs){
rs.root.getDirectory("Lyrics Flipper Mobile App Songs",{create:false,exclusive:false},function(rd){
rd.getFile(an+".txt.autoturn",{create:false,exclusive:false},function(rgf){
rgf.file(function(gf){
var gr = new FileReader()
gr.onloadend = function(evt){
var cat = prompt("Set AutoTurn "+an+" to:",evt.target.result)
if (cat)
{
gcat = cat
rgf.createWriter(function(grw){
grw.onwriteend = function(){
if (navigator.onLine)
{
var xh = new XMLHttpRequest()
xh.onreadystatechange = function(){
if (xh.readyState==4 && xh.status==200)
{
}
else
{
}
}
xh.open("GET","http://lyricsflipperplus.com/forid-autoturn-change.php?name="+document.getElementById("usernameinput").value+"&file="+encodeURIComponent(an+".txt")+"&cont="+encodeURIComponent(gcat),true)
xh.send()
}
else
{
}
}
grw.write(gcat)
},doNothing)
}
else
{
}
}
gr.readAsText(gf)
},doNothing)
},doNothing)
},doNothing)
},doNothing)
}
function postSaveAT(af,atresult,sname)
{
af.createWriter(function(saw){
												  saw.onwriteend = function(){
												  if (navigator.onLine)
{
var xh = new XMLHttpRequest()
xh.onreadystatechange = function(){
if (xh.readyState==4 && xh.status==200)
{
alert("The AutoTurn configuration was successfully saved.\nIt has also been uploaded to your Online Service account.")
window.location.reload()
}
else
{
}
}
xh.open("GET","http://lyricsflipperplus.com/forid-autoturn-change.php?name="+document.getElementById("usernameinput").value+"&file="+encodeURIComponent(sname+".txt")+"&cont="+encodeURIComponent(atresult),true)
xh.send()
}
else
{
alert("The AutoTurn configuration was successfully saved.")
window.location.reload()
}
												  }
												  saw.write(atresult)
												  })
}
function newLyrics(ln)
{
plc=true
pln=ln
if (ln)
{
document.getElementById("renameHolder-contained").style.display="none"
document.getElementById("lyrics-editor").style.display=""
document.getElementById("floatybar").innerHTML="Lyrics Editor"
if (savedLyrics)
{
var pureLyrics = savedLyrics
pureLyrics=pureLyrics.replace(new RegExp("&#160;","g")," ")
pureLyrics=pureLyrics.replace(new RegExp("<br>","g"),"")
pureLyrics=pureLyrics.replace(new RegExp("&amp;","g"),"&")
pureLyrics=pureLyrics.replace(new RegExp("&lt;","g"),"<")
pureLyrics=pureLyrics.replace(new RegExp("&gt;","g"),">")
document.getElementById("lyrics-editor-lyrics").value=pureLyrics
savedLyrics=undefined
}
else
{
window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(lfs){
lfs.root.getDirectory("Lyrics Flipper Mobile App Songs",{create:false,exclusive:false},function(lf){
lf.getFile(ln+".txt",{create:false,exclusive:false},function(lfe){
lfe.file(function(lff){
var lfr = new FileReader()
lfr.onloadend = function(evt){
var pureLyrics = evt.target.result
pureLyrics=pureLyrics.replace(new RegExp("&#160;","g")," ")
pureLyrics=pureLyrics.replace(new RegExp("<br>","g"),"")
pureLyrics=pureLyrics.replace(new RegExp("&amp;","g"),"&")
pureLyrics=pureLyrics.replace(new RegExp("&lt;","g"),"<")
pureLyrics=pureLyrics.replace(new RegExp("&gt;","g"),">")
document.getElementById("lyrics-editor-lyrics").value=pureLyrics
plc=false
}
lfr.readAsText(lff)
},doNothing)
},doNothing)
},doNothing)
},doNothing)
}
}
else
{
}
}
function launchOSLE()
{
var xh = new XMLHttpRequest()
xh.onreadystatechange = function(){
if (xh.readyState==4 && xh.status==200)
{
/*
var iframe = document.createElement("iframe")
iframe.id="lyrics-editor-iframe"
iframe.src="http://lyricsflipperplus.com/forid-ledit.php?name="+document.getElementById("usernameinput").value+"&password="+encodeURIComponent(xh.responseText)+"&file="+encodeURIComponent(pln+".txt")+"&using-android-app=1&hjss=1"
iframe.style.width="100%"
iframe.style.height="100%"
iframe.style.top="0px"
iframe.style.left="0px"
iframe.style.position="absolute"
document.body.appendChild(iframe)
OSLyrics=document.getElementById("lyrics-editor-iframe")
losto = window.setInterval(function(){
if (OSLyrics.contentWindow.document.getElementById("app-communicator-ready-to-save"))
{
if (OSLyrics.contentWindow.document.getElementById("app-communicator-ready-to-save").value==1)
{
doneLyrics(OSLyrics.contentWindow.document.getElementById("lyrics").value)
}
else
{
}
}
else
{
}
},250)
*/
window.localStorage.setItem("downloadlyrics",pln)
alert("After pressing the \"Save\" button in the online editor (which you press when you are done importing and editing the lyrics), you will be taken back to the Lyrics Flipper+ Lyrics Editor, with the lyrics that you imported.\nFrom there, just press \"Save\" to save the lyrics to the device.")
window.open("http://lyricsflipperplus.com/forid-ledit.php?name="+document.getElementById("usernameinput").value+"&password="+encodeURIComponent(xh.responseText)+"&file="+encodeURIComponent(pln+".txt")+"&using-android-app=1&hjss=1","_system","")
}
else
{
}
}
xh.open("GET","http://lyricsflipperplus.com/Online%20Service/"+document.getElementById("usernameinput").value+"/password.txt",true)
xh.send()
}
function doneLyrics(lyrics)
{
if (OSLyrics)
{
window.clearInterval(losto)
OSLyrics.parentNode.removeChild(OSLyrics)
}
else
{
}
var codeLyrics = lyrics
codeLyrics=codeLyrics.replace(/&/g,"&amp;")
codeLyrics=codeLyrics.replace(/</g,"&lt;")
codeLyrics=codeLyrics.replace(/>/g,"&gt;")
codeLyrics=codeLyrics.replace(/ /g,"&#160;")
codeLyrics=codeLyrics.replace(/\n\r?/g,"\n<br>")
window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(slfs){
slfs.root.getDirectory("Lyrics Flipper Mobile App Songs",{create:false,exclusive:false},function(slfd){
slfd.getFile(pln+".txt",{create:plc,exclusive:false},function(slf){
slf.createWriter(function(slw){
slw.onwriteend = function(){
if (navigator.onLine)
{
document.getElementById("nobodycaresiframe").onload = function(){
window.location.reload()
}
document.getElementById("lsfname").value=document.getElementById("usernameinput").value
document.getElementById("lsffile").value=pln+".txt"
document.getElementById("submitlyrics").value=codeLyrics
document.getElementById("lsubform").submit()
}
else
{
window.location.reload()
}
}
slw.write(codeLyrics)
},doNothing)
},doNothing)
},doNothing)
},doNothing)
}
function searchInFocus()
{
if (document.getElementById("searchinbox").value=="Filter In")
{
document.getElementById("searchinbox").value=""
document.getElementById("searchinbox").style.color=""
}
else
{
}
}
function searchInBlur()
{
if (document.getElementById("searchinbox").value=="")
{
document.getElementById("searchinbox").value="Filter In"
document.getElementById("searchinbox").style.color="gray"
}
else
{
}
}
function searchInSongs()
{
var ss, q, t = false
/*for (ss=0;ss<parseInt(document.getElementById("sscount").innerHTML);ss++)
{
if (t==true)
{
t=false
ss=ss-1
continue
}
else
{
}
q=document.getElementById("song"+(ss).toString())
if (q==null)
{
t=true
continue
}
else
{
}
if (q.innerHTML.indexOf(document.getElementById("searchbox").value)>-1==true)
{
q.style.display="none"
}
else
{
q.style.display=""
}
if (document.getElementById("searchbox").value=="")
{
q.style.display=""
}
else
{
}
}*/
for (ss=0;ss<parseInt((document.getElementById("media").childNodes).length);ss++)
{
q=document.getElementById("media").childNodes[ss]
if (q.innerHTML==undefined)
{
alert(q.outerHTML)
}
else
{
}
if (q.innerHTML.indexOf(document.getElementById("searchinbox").value)>-1==true)
{
q.style.display=""
}
else
{
q.style.display="none"
}
if (document.getElementById("searchinbox").value=="")
{
q.style.display=""
}
else
{
}
}
}
function LTLyrics(lta)
{
var xh = new XMLHttpRequest()
xh.onreadystatechange = function(){
if (xh.readyState==4 && xh.status==200)
{
savedLyrics=xh.responseText
newLyrics(lta)
}
else
{
}
}
xh.open("GET","http://lyricsflipperplus.com/Online%20Service/"+document.getElementById("usernameinput").value+"/"+encodeURIComponent(lta)+".txt",true)
xh.send()
}



var feo, sdownloadnum = 0, usedMP = [], setexal = false, mvProg, mv, installFs, DFileSys, DLFolder, dml, curDN = 0, cp, files, fdtw, fi, gcat, settingAutoTurns = false, floatAutoTurnConf = 0, setATArray = [], atst, OSLyrics, pln, losto, plc, savedLyrics


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
describe('app', function() {
    describe('initialize', function() {
        it('should bind deviceready', function() {
            runs(function() {
                spyOn(app, 'onDeviceReady');
                app.initialize();
                helper.trigger(window.document, 'deviceready');
            });

            waitsFor(function() {
                return (app.onDeviceReady.calls.length > 0);
            }, 'onDeviceReady should be called once', 500);

            runs(function() {
                expect(app.onDeviceReady).toHaveBeenCalled();
            });
        });
    });

    describe('onDeviceReady', function() {
        it('should report that it fired', function() {
            spyOn(app, 'receivedEvent');
            app.onDeviceReady();
            expect(app.receivedEvent).toHaveBeenCalledWith('deviceready');
        });
    });

    describe('receivedEvent', function() {
        beforeEach(function() {
            var el = document.getElementById('stage');
            el.innerHTML = ['<div id="deviceready">',
                            '    <p class="event listening">Listening</p>',
                            '    <p class="event received">Received</p>',
                            '</div>'].join('\n');
        });

        it('should hide the listening element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .listening', 'display');
            expect(displayStyle).toEqual('none');
        });

        it('should show the received element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .received', 'display');
            expect(displayStyle).toEqual('block');
        });
    });
});


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
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

