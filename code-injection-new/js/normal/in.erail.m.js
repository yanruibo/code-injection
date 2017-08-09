







        var IsNative = 1;










var StationsData="ALER,Aler,ALW,Alwal H,AMQ,Ammuguda H,ATC,Arts College,BMT,Begampet,BTNR,Bharatnagar,BG,Bhongir,BN,Bibinagar Jn,BMO,Bolarum,BOZ,Bolarum Bazar,BRBD,Borabanda,BDVL,Budvel,CVB,Cavalry Barracks,CDNR,Chandanagar,CHZ,Charlapalli,DBV,Dabilpur H,DQR,Dabirpura H,DYE,Dayanand Nagar H,FM,Falaknuma,FNB,Fatehnagar Bridge,GT,Ghatkesar,GWV,Gowdavalli H,GDPL,Gundla Pochampalli,HFZ,Hafizpeta,HTCY,Hitec City,HPG,Huppuguda H,HYB,Hyderabad Decan,JOO,Jamai Osmania,JET,James Street,ZN,Jangaon,KCG,Kacheguda,KQD,Khairatabad,KUCH,Kuchavaram H,LKPL,Lakdi Ka Pul,LGDH,Lallaguda Gate H,LPI,Lingampalli,MXT,Malakpet,MJF,Malkajgiri,MOB,Manoharabad,MED,Medchal,NSVP,N P A Shivarampalli,NCHS,Nature Cure Hospital,NLRD,Necklace Road,PBP,Pembarti,RAG,Raigir,RKO,Ramakistapuram Gate H,SFX,Safilguda H,SJVP,Sanjivaih Park,SC,Secunderabad Jn,STPD,Sitafal Mandi,UR,Umdanagar,VAR,Vidyanagar,WP,Wangapalli,YKA,Yakutpura";var sStationsData=StationsData.split(',');var StationsList=new Array(54);for(var s=0,i=0;s<sStationsData.length;s+=2,i++)StationsList[i]=new Array(sStationsData[s],sStationsData[s+1]);

﻿var L = 0
var m1 = "Click here to sort on "
var m2 = "यहाँ क्लिक करें "
var m3 = " द्वारा क्रम से देखने के लिए"
var m4 = "Click here to filter "
var m5 = " on the top"
var m6 = " को चलने वाली ट्रेन क्रम से देखने के लिए"
var m7 = " श्रेणी द्वारा ट्रेन क्रम से देखने के लिए"

var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec")
var m_namesL = new Array("जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितम्बर", "अक्टूबर", "नवम्बर", "दिसम्बर")
var m_namesL2 = new Array("जन", "फ़र", "मार्च", "अप्रै", "मई", "जून", "जुला", "अग", "सित", "अक्टू", "नव", "दिस")
var d_names = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday")
var d_namesL = new Array("रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार")
var d_namesh = new Array("Su", "Mo", "Tu", "We", "Th", "Fr", "Sa")
var d_nameshL = new Array("रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि")
var d_names2 = new Array("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")
var d_names2L = new Array("सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार", "रविवार")
var d_names2S = new Array("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun")
var d_names2SL = new Array("सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि", "रवि")
var n_Classes = new Array("", "1A", "2A", "3A", "CC", "FC", "SL", "2S", "3E", "2H")
var n_ClassesName = new Array("", "First AC", "2 Tier AC", "3 Tier AC", "Chair Car", "First Class", "Sleeper", "2nd Sitting", "3 Tier Economy", "2H")

function IRBlockMessage(Type)
{
    var s = "<br/><center>"
    if (L == 0)
    {
        s += "<br/>To view live PNR status & seat availability you may install following browser plugins.";
        s += "<table class='DataTable2 DataTableHeader' cellpadding='0' cellspacing='1' style='text-align:center;width:90%'>";
        s += "<tr>";
        s += "<td>Browser";
        s += "<td>Download Plugin";
        s += "<td>Latest Version";
        s += "<td>How to Install";
        s += "<td>Download browser";
        s += "<td>Supported Browser Version";
        s += "<tr>";
        s += "<td>Chrome";
        s += "<td><a href='https://chrome.google.com/webstore/detail/aopfgjfeiimeioiajeknfidlljpoebgc'>Click here</a> ";
        s += "<td>2.7";
        s += "<td><a href='rail/help/ChromeHowtoInstall.pdf'>Click here</a>";
        s += "<td><a href='https://www.google.com/chrome/?hl=en&brand=chmo'>Click here</a> ";
        s += "<td>14 and above";
        s += "<tr>";
        s += "<td>Firefox ";
        s += "<td><a href='http://erail.in/extension/firefox/erail-plugin-for-firefox-2-5.xpi'>Click here</a>";
        s += "<td>2.5";
        s += "<td><a href='rail/help/FirefoxHowtoInstall.pdf'>Click here</a>";
        s += "<td><a href='http://www.mozilla.org/en-US/firefox/new/'>Click here</a>";
        s += "<td>8 and above";
        s += "</table>";
        s += "<br/>After installation refresh the web page again";

    }
    else
    {
        s += "भारतीय रेल वेबसाइट में हाल ही में परिवर्तन के कारण, उपलब्धता की जानकारी और पी.एन.आर. स्थिति प्रतिबंधित किया गया है.";
        s += "<br/>पी.एन.आर. स्थिति और सीट उपलब्धता आप ब्राउज़र प्लगिन  द्वारा पा सकते हैं";
        s += "<br/><br/>क्रोम (Chrome) - <a href='http://erail.in/extension/chrome/chrome.crx'>इन्स्टाल करने के लिए यहाँ क्लिक करें</a>";
        s += "<br/>फ़ायरफ़ॉक्स (Firefox) - <a href='http://erail.in/extension/firefox/erail-plugin-for-firefox-2-5.xpi'>इन्स्टाल करने के लिए यहाँ क्लिक करें</a>";
        s += "<br/><br/>स्थापना के बाद वेबपेज फिर से रिफ्रेश करें";
    }

    return s+"</center>";
}

function TrainSearchHelp()
{
    var s = "<br/><table cellspacing='1' cellpadding='2' style='margin:auto;' class='HelpInfo'>"
s+="<tr><td colspan='3' style='text-align:center'>" + (!L ? "How to search Trains" : "ट्रेन कैसे खोजें")
s+="<tr><td>1<td>" + (!L ? "Choose Station - To search by station Name<td>step 1" : "स्टेशन चुनें- स्टेशन के नाम के द्वारा खोज करने के लिए<td>चरण 1")
s+="<tr><td>2<td>" + (!L ? "Choose Train- To search by Train Name or Train Number<td>step 8" : "ट्रेन चुनें - ट्रेन नाम या ट्रेन संख्या के द्वारा खोज करने के लिए<td>चरण 8")
s+="<tr><td>3<td>" + (!L ? "Type From and To station in the box<td>step 2" : "से और तक स्टेशन बॉक्स में टाइप करें<td>चरण 2")
s+="<tr><td>4<td>" + (!L ? "Click on \"Show Trains\" to get the train list between given stations<td>step 3" : "स्टेशन के बीच ट्रेन देखने के लिए \"ट्रेन खोजें\" पर क्लिक करें<td>चरण 3")
s+="<tr><td>5<td>" + (!L ? "Click on \"Return trains\" to get the Train list of Return Journey<td>step 3" : "वापसी की ट्रेन देखने के लिए \"वापसी ट्रेन\" पर क्लिक करें<td>चरण 3")
s+="<tr><td>6<td>" + (!L ? "Choose date of Journey for seat Availability<td>step 4" : "यात्रा की सीट उपलब्धता के लिए तिथि चुनें<td>चरण 4")
s+="<tr><td>7<td>" + (!L ? "Choose quota for seat Availability<td>step 5" : "सीट उपलब्धता के लिए कोटा चुनें<td>चरण 5")
s+="<tr><td colspan='3'>" + T[62][L]
s+="</table>"
return s;
}

function HelpInfo(M)
{
M = M == undefined ? M = "" : "<br/>" + M;
var t = "<tr><td>";
var s = "<table class='HelpInfo' style='margin:auto;' cellspacing='1px' cellpadding='2px'><caption>" + M + "</caption<tr><th>" + (!L ? "Click On" : "क्लिक करें") + "<th>" + (!L ? "For" : "के लिए")
s+=t + (!L ? "Train Number<td>Fare & Route" : "गाड़ी संख्या<td>किराया और मार्ग")
//s+=t + (!L ? "Dep. Time<td>Running Status at Source Station - select date at step 3" : "प्रस्थान समय<td>स्रोत स्टेशन पर स्थिति रनिंग  - चरण 3 पर दिनांक का चयन करें")
//s+=t + (!L ? "Arr. Time<td>Running Status at Destination Station - select date at step 3" : "आगमन समय<td>गंतव्य स्टेशन पर स्थिति रनिंग - चरण 3 पर दिनांक का चयन करें")
s += t + (!L ? "Travel Time<td>To get route in map & roll mouse over to view Avg speed and Distance Km" : "यात्रा समय<td>नक्शे पर मार्ग")
s+=t + (!L ? "R<td>View run days of the train on calendar" : "R<td>कैलेंडर पर ट्रेन के चलने के दिन देखें ")
s += t + (!L ? "Av<td>Availability of selected class - select date of travel at step 3 & Roll Mouse over to view GN and Tatkal Fare" : "Av<td>चयनित वर्ग की उपलब्धता - चरण 3 पर यात्रा की तारीख का चयन करें")
s+=t + (!L ? "Header<td>Sorting" : "हैडर<td>क्रम से देखने के लिए")
//s+=t + (!L ? "<a class='AdminNote'>&nbsp;i&nbsp;</a><td>Special Note" : "<a class='AdminNote'>&nbsp;i&nbsp;</a><td>विशेष नोट")
s+="<tr><td colspan='2'>" + (!L ? "<b>Roll mouse over any text / Data  to get help and many more features</b>" : "किसी भी शब्द / डाटा पर माउस ले जाएँ  अधिक मदद और सुविधाओं की जानकारी के लिए")
s+="</table>"
return s
}

var T = [
["<b>Main Stations</b>", "<b>मुख्य स्टेशन</b>"], //0
["Main Stations", "मुख्य स्टेशन"], //1
["<b>All Stations</b>", "<b>सभी स्टेशन</b>"], //2
["All Stations", "सभी स्टेशन"], //3
["Train", "ट्रेन"], //4
["Train Name", "ट्रेन का नाम"], //5
["From", "से"], //6
["To", "तक"], //7
["Dep.", "प्रस्थान"], //8
["Arr.", "आगमन"], //9
["Travel", "यात्रा"], //10
[m1 + "Train Number", m2 + "ट्रेन नंबर" + m3], //11
[m1 + "Train Name", m2 + "ट्रेन नाम" + m3], //12
["Pantry", "पैंट्री"], //13
[m1 + "From Station", m2 + "से स्टेशन" + m3], //14
[m1 + "Departure time at the From station", m2 + "प्रस्थान समय" + m3], //15
[m1 + "To Station", m2 + "तक स्टेशन" + m3], //16
[m1 + "Arrival Time at the To Station", m2 + "आगमन समय" + m3], //17
[m1 + "Travel Time of the train", m2 + "पूरी यात्रा के समय" + m3], //18
[m1 + "daily trains" + m5, m2 + "सभी दिन चलने ट्रेन" + m3], //19
[m1 + "Monday" + m5, m2 + "सोमवार" + m6], //20
[m1 + "Tuesday" + m5, m2 + "मंगलवार" + m6], //21
[m1 + "Wednesday" + m5, m2 + "बुधवार" + m6], //22
[m1 + "Thursday" + m5, m2 + "बृहस्पतिवार" + m6], //23
[m1 + "Friday" + m5, m2 + "शुक्रवार" + m6], //24
[m1 + "Saturday" + m5, m2 + "शनिवार" + m6], //25
[m1 + "Sunday" + m5, m2 + "रविवार" + m6], //26
[m1 + "AC 1-tier sleeper" + m5, m2 + "प्रथम वातानुकूलित" + m7], //27
[m1 + "AC 2-tier sleeper" + m5, m2 + "द्वितीय वातानुकूलित" + m7], //28
[m1 + "AC 3-tier sleeper" + m5, m2 + "तृतीय वातानुकूलित" + m7], //29
[m1 + "AC Chair Car" + m5, m2 + "वातानुकूलित कुर्सीयान" + m7], //30
[m1 + "First Class" + m5, m2 + "प्रथम श्रेणी" + m7], //31
[m1 + "Sleeper Class" + m5, m2 + "शयनयान" + m7], //32
[m1 + "Second Sitting" + m5, m2 + "द्वितीय श्रेणी" + m7], //33
[m1 + "3 AC Economy" + m5, m2 + "तृतीय वातानुकूलित इकोनोमी" + m7], //34
['SNo', "क्रम"], //35
['Serial Number', "क्रम"], //36
['Code', "कोड"], //37
['Stn Name', "स्टेशन नाम"], //38
['Arr.', "आगमन"], //39
['Dep.', "प्रस्थान"], //40
['Halt', "हाल्ट"], //41
['PF', "पीएफ"], //42
['Dist.', "दूरी"], //43
['Day', "दिन"], //44
['Remark', "टिप्पणी"], //45
['Station Code', "स्टेशन कोड"], //46
['Station Name', "स्टेशन नाम"], //47
['Arrival Time', "आगमन समय"], //48
['Departure Time', "प्रस्थान समय"], //49
['Halt Time ( in minutes )', "हाल्ट समय (मिनट में)"], //50
["title3='Select Return date for availability'", "title3='सीट उपलब्धता जांच करने के लिए, वापसी की तारीख का चयन करने के लिए यहाँ क्लिक करें'"], //51
["Please Wait, getting trains list ...", "कृपया प्रतीक्षा करें, गाड़ियों की सूची आ रही है..."], //52
["Running status of ", "रनिंग स्थिति "], //53
["Click to view availability of ", "सीट उपलब्धता देखने के लिए यहाँ क्लिक करें "], //54
["Advanced Filters", "एडवांस फ़िल्टर"], //55
["Print trains list", "ट्रेनों की सूची प्रिंट"], //56
["Direct Link", "डायरेक्ट लिंक"], //57
["Click here to print the search list", "खोज सूची को प्रिंट करने के लिए यहाँ क्लिक करें"], //58
[" travel agents", " ट्रैवल एजेंट"], //59
[" travel agents details coming soon", " ट्रैवल एजेंटों के विवरण जल्द ही आ रहे हैं"], //60
["<center>If you are a travel agent ", "<center>अगर आप एक ट्रैवल एजेंट हैं "], //61
["For better experience, View in Full Window Mode. Press <span style='color: #FF0000'>F11</span> Key. To return, press F11 again.", "बेहतर अनुभव के लिए, पूर्ण विंडो मोड में देखने के लिए<span style='color: #FF0000'> F11 </span> दबाएँ लौटने के लिए, F11 फिर से दबाएँ"], //62
["Fare is an indicative amount, click on the amount link to get an exact fare", "किराया सांकेतिक राशि है, सटीक किराया देखने के लिए  राशि लिंक पर क्लिक करें"], //63
["Click here to view trains between ", ""], //64
["", " के बीच ट्रेन देखने के लिए यहाँ क्लिक करें"], //65
[" and ", " से "], //66
["title3='Select Departure date for availability'", "title3='सीट उपलब्धता जांच करने के लिए, प्रस्थान की तारीख का चयन करने के लिए यहाँ क्लिक करें'"], //67
[" ( Train Ends At This Station )", " ( यह ट्रेन का आखरी स्टेशन है )"], //68
[" (First Station)", " (पहेला स्टेशन)"], //69
["Click on train number to View fare and schedule", "ट्रेन संख्या पर क्लिक करें किराया और समय देखने"], //70
[" days", " दिन"], //71
["Distance - ", "दूरी -"], //72
[" kms, Average Speed - ", " कि.मी., औसत गति -"], //73 
[" km/hr, Click here to view train on map", " कि.मी. प्रति घंटे, नक्शे पर ट्रेन देखने के लिए क्लिक करें"], //74
["Train runs from ", "ट्रेन चलती है "], //75
[" on ", " से "], //76
["search  ", "खोजें  "], //77
["  trains", "  ट्रेन"], //78
["Select tatkal stations combination, if above Quota selection is Tatkal", "अगर ऊपर कोटा चयन तत्काल है तब यहाँ से तत्काल स्टेशनों संयोजन चयन करें"], //79
[" Adult", " वयस्क"], //80
[" Child", " बच्चे"], //81
[" Senior Male", " वरिष्ठ पुरुष"], //82
[" Senior Female", " वरिष्ठ महिला"], //83
["No direct trains found, Please use a transit station for your search", "कोई सीधी ट्रेन नहीं है, अपनी खोज के लिए ट्रांजिट स्टेशन का प्रयोग करें"], //84
["View one of shortest route", "सबसे छोटा मार्ग देखने के लिए यहाँ क्लिक करें"], //85
["Suggestion Shown On The Right Side - Search History", "खोज इतिहास में एक सुझाव सही पक्ष पर दिखाया गया है"], //86
["5 to 11 years", "5-11 साल"], //87
["Male 60 years and Above", "60 साल या अधिक के पुरुष"], //88
["Female 58 years and Above", "58 साल या अधिक की महिला"], //89
["General Fare", "सामान्य किराया"], //90
["View Running Days", "कैलेंडर में ट्रेन के चलने के दिन देखें"], //91
[" - View arrival & departure of trains", " - गाड़ियों के आगमन व प्रस्थान देखें"], //92
[" to ", " से "], //93
["Highlighted days show run days of the selected train", "विशेष रंग से दिखाए गए दिन पर गाड़ी चलती है"], //94
["Close Calendar", "कैलेंडर बंद"], //95
["Advance Reservation Period=", "अग्रिम आरक्षण="], //96
["Click here for Trade Enquiry", "व्यापार संबंधी पूछताछ के लिए यहां क्लिक करें"], //97
["<a href='http://hindi.erail.in' title3='हिंदी में वेबसाइट को देखने के लिए यहाँ क्लिक करें'>हिन्दी</a>", "<a href='http://erail.in' title3='अंग्रेजी में वेबसाइट को देखने के लिए यहाँ क्लिक करें'>English</a>"], //98
["Tatkal Fare", "ततकाल किराया"], //99
["Departure Day", "प्रस्थान दिन"], //100
["Arrival Day", "आगमन दिन"], //101
["Class", "श्रेणी"], //102
["Zone", "ज़ोन"], //103
["Div.", "डिवीजन"], //104
["Departure Station", "प्रस्थान स्टेशन"], //105
["Arrival Station", "आगमन  स्टेशन"], //106
["Type", "प्रकार"], //107
["Show Trains", "ट्रेन खोजें"], //108
["Return Trains", "वापसी ट्रेन"], //109
["Use this link to send to your friends for direct search of trains", "गाड़ियों को सीधे खोजने के लिए अपने दोस्तों को इस लिंक को भेजें"], //110
["Clear Filters", "सब फ़िल्टर हटायें"], //111
["Please enter 10 digit PNR number", "कृपया 10 अंक पीएनआर संख्या दर्ज करें"], //112
["Print", "प्रिंट"], //113
["After Search of train", "ट्रेन खोज के बाद"], //114
[" from ", "  "], //115
[" on ", "  "], //116
["Click here to get current status of PNR", "पी.एन.आर. की वर्तमान स्थिति को पाने के लिए यहाँ क्लिक करें"], //117
["Get PNR Status", "पी.एन.आर. स्थिति"], //118
["Type PNR No", "पी.एन.आर. भरें"], //119
["Show Train Detail", "ट्रेन दिखाएँ"], //120
["Click to get the Full Train Route", "ट्रेन का पूर्ण मार्ग के लिए पर क्लिक करें"], //121
["Train not found", "ट्रेन नहीं मिली"], //122
["For All type of Concessions Fare<br/>&nbsp;Click on Train Number and then <br/>&nbsp;Click on Fare of Class", "सभी प्रकार के रियायती किराये के लिए<br/>&nbsp;गाड़ी संख्या पर क्लिक करें और<br/>&nbsp;तब क्लास के किराये पर क्लिक करें"], //123
["", "द्वारा स्टेशन का कोड या नाम टाइप करें"], //124
["Via Station", "वाया स्टेशन"], //125
["Please select a Via station", "कृपया वाया स्टेशन का चयन करें"], //126
["From and Via Station cannot be same", "प्रस्थान और वाया स्टेशन एक जैसे नहीं हो सकते हैं"], //127
["Via and To Station cannot be same", "वाया और आगमन स्टेशन एक जैसे नहीं हो सकते हैं"], //128
["From and To Station cannot be same", "प्रस्थान और आगमन स्टेशन एक जैसे नहीं हो सकते हैं"], //129
["To view wait time of next train, click on any train number<br/>Wait time calculated based on date selected at Step 4<br/>After changing the date click on train number again",
 "अगली ट्रेन का प्रतीक्षा समय देखने के लिए ट्रेन संख्या पर क्लिक करें<br/>प्रतीक्षा समय चरण 4 में चयनित तिथि पर आधारित है<br/>तारीख बदलने के बाद ट्रेन संख्या पर फिर से क्लिक करें"], //130
["Click here to apply advance filters to the search list", "खोज सूची पर अडवांस फ़िल्टर लगाने के लिए यहाँ क्लिक करें"], //131
["Wait", "प्रतीक्षा"], //132 
["Click on a Via station to view trains", "ट्रेन देखने के लिए वाया स्टेशन पर क्लिक करें"], //133
["Total", "कुल"], //134
["Total Journey Time", "कुल यात्रा का समय"], //135
["Select any train in the above list and then<br/>move mouse over wait time to view in detail", "उपरोक्त सूची में किसी भी गाड़ी का चयन करें और फिर<br/>विस्तार में देखने के प्रतीक्षा समय पर माउस ले जाएँ"], //136
["Please select a train from the list to check the running status.", "कृपया सूची में से एक ट्रेन का चयन करें, वर्तमान स्थिति की जाँच करने के लिए"], //137
["Click here to view tatkal opening date", "तत्काल बुकिंग खुलने की तारीख देखने के लिए यहाँ क्लिक करें"], //138
["Click here to view train list", "ट्रेन सूची देखने के लिए यहाँ क्लिक करें"], //139
["Tatkal Dates", "तत्काल तारीख"], //140
["Train List", "ट्रेन सूची"], //141
["Platform", "प्लैटफ़ार्म"], //142
[", Click to change station", ", क्लिक करें - स्टेशन बदलें"], //143
["", ""], //144
["", ""], //145
["", ""], //146


["",""]
];




﻿/// <reference path="../jquery.mobile/jquery-1.7.2.min.js" />

/// <reference path="../../js/eRail3_TrainList.js" />
/// <reference path="erail_mobile.js" />
/// <reference path="../../js4/router.js" />


var OneDay = 86400000,
Direction = 1,
DateFromTo = null,
DateToFrom = null,
mQuota = "GN",
TrainsObj = null, // search trains list
TrainsObjAD = null, // arrival  departure trains
CacheFlag = true,
STrain = null,
n_Classes = new Array("1A", "2A", "3A", "CC", "FC", "SL", "2S", "3E", "2H"),
d_name = new Array("M", "T", "W", "T", "F", "S", "S");
Mnths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
IST_Time = new Date(),

CMD_HOME = 1,
CMD_TRAINS = 11,
CMD_TRAINSRESULT = 12,
CMD_FARE = 21,
CMD_AVAILABILITY = 31,
CMD_ARRIVAL = 41,
CMD_ARRIVALRESULT = 42,
CMD_DEPARTURE = 51,
CMD_DEPARTURERESULT = 52,
CMD_RUNSTATUS = 61,
CMD_ROUTE = 71,
CMD_TRAINSEARCH = 81,
CMD_TRAINOPTIONS = 91,
CMD_SEATMAP = 101,
CMD_REFUND = 4,

StartAnchor = false,
Class1 = "",
Class2 = "",
RefreshTrainList = true;

var M = new Mobile();

function Mobile()
{
    this.CurrentCommand = 1;
    this.StationFrom = new Station("New Delhi", "NDLS");
    this.StationTo = new Station("Mumbai", "BCT");
    this.TrainNo = "";//selected train no
    this.TrainID = 0;//selected train id
    this.TrainName = "";//selected train name
    this.TrainFrom = null; //selected train from
    this.TrainTo = null;//selected train to
    this.TrainClasses = null;//selected train to
    this.TrainRunDays = null;//selected train to
    this.Class = "SL";
    this.ClassText = "SL";
    this.Quota = "GN";
    this.mDate = null;
    this.mDay = "";
    this.mMonth = "";
    this.mYear = "";
    this.PNR = "";
    this.Direction = 0;
    this.FareAge = "30",
	this.FareConcession = "ZZ",
	this.FareAgeText = "",
	this.FareConcessionText = "",
	this.SortedOn = T_Departure;
    this.FilterClass = "";
    this.FilterDay = "";
    this.SelectedDate = new Date();
    this.FavoriteTrainList = null;
    this.FavoritePNR = null;
    this.FavoriteStations = null;
    this.FilteredTrainList = new Array();
    this.SelectedStation = null;
}

Mobile.prototype.ClearFilter = function ()
{
    this.SortedOn = T_Departure;
    this.FilterClass = "";
    this.FilterDay = "";
    $("#selectSortedOn").val(T_Departure).selectmenu("refresh");
    $("#selectFilterClass").val("").selectmenu("refresh");
    $("#selectFilterDay").val("").selectmenu("refresh");
    RefreshTrainList = true;
    BindLabel();
    this.Save();
}

Mobile.prototype.Save = function ()
{
    for (var propertyName in this)
    {
        if (this[propertyName] != null)
        {
            if ((typeof (this[propertyName])).toString() != "function")
            {
                SaveInLocalStorage(propertyName, JSON.stringify(this[propertyName]));
            }
        }
    }
}

Mobile.prototype.Load = function ()
{
    try
    {
        for (var propertyName in this)
        {
            var data = LoadFromLocalStorage(propertyName);

            if (data != "undefined" && data != "null" && data != null && data != undefined)
            {
                if ((typeof (this[propertyName])).toString() != "function")
                    this[propertyName] = JSON.parse(data);
            }
        }
    }
    catch (e)
    {
        ClearLocalStoreage();
    }
}

function Station(StnName, StnCode)
{
    this.StnName = StnName;
    this.StnCode = StnCode;
}

$(document).bind("mobileinit", function ()
{
    $.support.cors = true;

    $.mobile.buttonMarkup.hoverDelay = 100;

    $.mobile.allowCrossDomainPages = true;
    $.mobile.ajaxEnabled = true;

    $.mobile.defaultPageTransition = "none";

    $.mobile.page.prototype.options.addBackBtn = true;
    $.mobile.page.prototype.options.backBtnTheme = "e";
    $.mobile.page.prototype.options.headerTheme = "b";
    $.mobile.page.prototype.options.footerTheme = "d";

    $.mobile.loader.prototype.options.text = "loading";
    $.mobile.loader.prototype.options.textVisible = false;
    $.mobile.loader.prototype.options.theme = "a";
    $.mobile.loader.prototype.options.html = "";

});

function AddToFavorite(obj)
{
    if (M.FavoriteTrainList == null)
        M.FavoriteTrainList = new Array();

    if (STrain)
    {
        var FoundIndex = -1;
        $(M.FavoriteTrainList).each(function (index)
        {
            if (this[T_TrainID] == STrain[T_TrainID])
                FoundIndex = index;

        });

        if (FoundIndex == -1)
        {
            M.FavoriteTrainList.push(STrain);
            $(obj).html("- Remove");
        }
        else
        {
            M.FavoriteTrainList.splice(FoundIndex, 1);
            $(obj).html("+ Add");
        }
    }
    M.Save();
}

function IsInFavorite(TrainID)
{
    if (M.FavoriteTrainList)
    {
        for (var i = 0; i < M.FavoriteTrainList.length; i++)
        {
            if (M.FavoriteTrainList[i][T_TrainID] == TrainID)
                return i;
        }
    }

    return -1;
}

function RunCommand(ID)
{
    if (ID)
    {
        M.CurrentCommand = ID;
        M.Save();
    }

    switch (M.CurrentCommand)
    {
        case CMD_TRAINS:
        case CMD_ARRIVAL:
        case CMD_DEPARTURE:
            $.mobile.changePage("#Stations");
            break;

        case CMD_TRAINSEARCH: $.mobile.changePage("#TrainSearch"); break;
        case CMD_RUNSTATUS: $.mobile.changePage("#RunStatus"); break;
        case CMD_TRAINSRESULT: $.mobile.changePage("#TrainsResult"); break;
        case CMD_REFUND: $.mobile.changePage("#Refund"); break;

        case CMD_FARE:
        case CMD_AVAILABILITY: $.mobile.changePage("#Availability"); break;

        case CMD_ARRIVALRESULT: $.mobile.changePage("#Arrival"); break;
        case CMD_DEPARTURERESULT: $.mobile.changePage("#Departure"); break;
        case CMD_ROUTE: $.mobile.changePage("#Route"); break;
        case CMD_TRAINOPTIONS: $.mobile.changePage("#TrainOptions"); break;
        case CMD_SEATMAP: $.mobile.changePage("#SeatMap"); break;
    }
    return false;
}

$(function ()
{
    FastClick.attach(document.body);
    $("select").selectmenu({ style: 'dropdown' });
});

function ShowPopup(ID)
{
    $(ID).trigger("create");
    $(ID).popup();
    $(ID).popup('open');
    return false;
}


$(document).bind('pageinit', function (event, data)
{
    $.mobile.defaultPageTransition = "none";

    if (event.target.id != "Search")
        M.Load();

});

$(document).bind('pagechange', function (event, data)
{
    //console.log("IsNative=", IsNative);
    BaseURL = IsNative ? "http://erail.in/" : "/";

    var toPageId = data.toPage.attr("id");

    switch (toPageId)
    {
        case "Home": ShowFavoriteList(); break;
        case "Stations": ShowStationsPage(); break;
        case "TrainsResult": GetTrains(); break;

        case "Fare":
        case "Availability":
            ShowAvailabilityForm(); break;

        case "RunStatus": TrainRunningStatusForm(); break;
        case "Route": ShowRoute(M.TrainID, ShowRouteList); break;
        case "Arrival": GetArrival(); break;
        case "Departure": GetDeparture(); break;
        case "Search": ShowStationSearchPage(); break;
        case "StationMap": Reset(); break;
        case "TrainsFilter": ShowFilter(); break;
        case "TrainOptions": ShowTrainOptions(); break;
        case "PNR": ShowPNRPage(); break;
    }

    BindLabel();
});

function ShowSeatMap(Class)
{
    $.mobile.changePage("#SeatMapDisplay");
    $("#SeatMapContent").load("SeatMap" + Class + ".html").trigger("create");
}

function ShowStationsPage()
{
    $("#btnFrom").html("Fr: " + M.StationFrom.StnCode + "-" + M.StationFrom.StnName).button("refresh");
    $("#btnTo").html("To: " + M.StationTo.StnCode + "-" + M.StationTo.StnName).button("refresh");
}

function ShowPNRPage()
{
    $("#txtPNR").val(M.PNR);
    var list = "<ul data-role='listview'>";

    $(M.FavoritePNR).each(function ()
    {
        list += "<li data-icon='false'><a href='#' onclick='GetPNR(\"" + this.PNR + "\")'>" + this.PNR + (this.From != "" ? "<br/>" + this.From + "-" + this.To : "") + "</a><a href='#' data-icon='delete' onclick='AddToPNRHistory(\"" + this.PNR + "\",1);ShowPNRPage();'></a></li>";
    });
    list += "</ul>";

    $("#divPNRStatus").html(list).trigger("create");
}

function ShowStationSearchPage()
{
    if (M.SelectedStation == null)
    {
        $.mobile.changePage("#Home");
        return;
    }

    $("#txtSearch").val('');

    var list = "<ul data-role='listview'>";
    $(M.FavoriteStations).each(function ()
    {
        list += "<li data-icon='false'><a href='#' onclick='UpdateStation(\"" + this.Name + "\",\"" + this.Code + "\")'>" + this.Name + "<p class='ui-li-aside'>" + this.Code + "</p></a><a href='#' data-icon='delete' onclick='AddStationToFavoriteList(0,\"" + this.Code + "\",1);ShowStationSearchPage();'></a></li>";
    });
    list += "</ul>";

    $("#divSearchResult").html(list).trigger("create");
}

function ShowFilter()
{
    $("#selectSortedOn").val(M.SortedOn);
    $("#selectFilterClass").val(M.FilterClass);
    $("#selectFilterDay").val(M.FilterDay);
}

function ResetFavorite()
{
    ClearLocalStoreage();
    var M = new Mobile();
    ShowFavoriteList();
    $("#divFavorite").html("");
    alert('Done');
}

function ShowTrainOptions()
{
    var i = IsInFavorite(M.TrainID);
    $("#aAddToFavorite").html(i == -1 ? "+ Add" : "- Remove");

    $("#TrainOptionsHeader").html(M.TrainNo);
    $("#divTrainInfo").html(M.TrainName);
}

function CopyTrainInfo(T)
{
    if (T)
    {
        M.TrainNo = T[T_No];
        M.TrainID = T[T_TrainID];
        M.TrainName = T[T_Name];
        M.TrainClasses = T[T_Classes];
        M.TrainRunDays = T[T_RunDays];
        M.TrainFrom = new Station(T[T_StnFromName], T[T_StnFrom]);
        M.TrainTo = new Station(T[T_StnToName], T[T_StnTo]);
    }
}

function ShowAvailabilityForm(select)
{
    $("#divAvailabilityResult").html("");

    if (select)
    {
        var Index = $(select)[0].selectedIndex;
        STrain = M.FilteredTrainList[Index];
        CopyTrainInfo(STrain);
    }

    //Train List
    $("#selectAvailTrain").html("");
    $(M.FilteredTrainList).each(function (index)
    {
        $('<option/>').val(this[T_No]).html(this[T_No] + "-" + toTitleCase(this[T_Name])).appendTo('#selectAvailTrain');
        if (M.TrainID == this[T_TrainID])
        {
            $("#selectAvailTrain")[0].selectedIndex = index;
            STrain = M.FilteredTrainList[index];
            CopyTrainInfo(STrain);
        }
    });


    ShowRoute(M.TrainID, function ()
    {
        var str1 = "", str2 = "";
        for (var i = 1; i < RouteObj.Route.length; i++)
        {
            Fn = RouteObj.Route[i];
            str1 += "<option value='" + Fn[TR_StnCode] + "' " + (STrain[T_StnFrom] == Fn[TR_StnCode] ? "selected='selected'" : "") + ">" + Fn[TR_StnName];
            str2 += "<option value='" + Fn[TR_StnCode] + "' " + (STrain[T_StnTo] == Fn[TR_StnCode] ? "selected='selected'" : "") + ">" + Fn[TR_StnName];
        }

        $("#selectAvailFrom").html(str1);
        $("#selectAvailTo").html(str2);
        UpdateAvailInfo();
    });
}

function ShiftDays(RunDays, RunDayDiff)
{
    var n = RunDays.length;
    if (RunDayDiff > 0)
    {
        for (var i = 0; i < RunDayDiff; i++)
            RunDays = RunDays[n - 1] + RunDays.substring(0, n - 1);
    }
    else if (RunDayDiff < 0)
    {
        for (var i = 0; i < Math.abs(RunDayDiff) ; i++)
            RunDays = RunDays.substring(1) + RunDays[0];
    }

    return RunDays;
}

function UpdateAvailInfo()
{
    $('#selectAvlDate').parent().show();
    $("#selectAvlQuota").parent().show();

    if (M.CurrentCommand == CMD_AVAILABILITY)
    {
        var Day = 1;
        var stnFrom = $("#selectAvailFrom").val();
        for (var i = 1; i < RouteObj.Route.length; i++)
        {
            Fn = RouteObj.Route[i];

            if (Fn[TR_StnCode] == stnFrom)
            {
                Day = parseInt(Fn[TR_Day]);
                break;
            }
        }

        
        M.TrainRunDays = ShiftDays(STrain[T_RunDays], -parseInt(STrain[T_RunningDayFromStn]) + 1); // shift from the  "From" station to first station , when selecting train between stations STrain[T_RunningDayFromStn] is the selected from station and not the first station , when directly searching for the train  STrain[T_RunningDayFromStn] will be the first station "1"
        //console.log(STrain[T_RunDays], M.TrainRunDays);
        M.TrainRunDays = ShiftDays(M.TrainRunDays, Day - 1); // shift from the first to the selected station
        //console.log(STrain[T_RunDays], M.TrainRunDays);

        var dt = new Date();
        var Once = true;

        var LastDate = $('#selectAvlDate').val();
        $('#selectAvlDate').html("");
        for (var i = 0; i <= 122; i++)
        {
            dt = GetNextRunDate2(dt, M.TrainRunDays)
            if (Once)
            {
                M.SelectedDate = dt;
                Once = false;
            }
            $('<option/>').val(dt.toString("dd-MMM-yy")).html(dt.toString("dd-MMM dddd")).appendTo('#selectAvlDate');
            dt.setTime(dt.getTime() + OneDay);
        }

        if (LastDate)
            $('#selectAvlDate').val(LastDate);

        $("#AvailabilityHead").html("Availability");
    }
    else
    {
        $('#selectAvlDate').parent().hide();
        $("#selectAvlQuota").parent().hide();
        $("#AvailabilityHead").html("Fare");
    }

    M.TrainFrom.StnCode = $("#selectAvailFrom").val();
    M.TrainTo.StnCode = $("#selectAvailTo").val();

    M.Quota = $("#selectAvlQuota").val();
    M.TrainNo = $("#selectAvailTrain").val();
    M.Quota = $("#selectAvlQuota").val();
    M.Connec = $("#selectAvlQuota").val();
    M.SelectedDate = Date.parse($("#selectAvlDate").val());

    if (M.SelectedDate)
    {
        M.mDay = M.SelectedDate.getDate();
        M.mMonth = M.SelectedDate.getMonth() + 1;
        M.mYear = M.SelectedDate.getYear();
    }
    M.Save();

    BindLabel();
    GetAvailabilty();

}

//function postData(myurl, myreferer, mydata, mysuccess, myerror)
//{
//    if (IsIOS == 1)
//    {
//        $.ajax({
//            type: 'post',
//            url: myurl,
//            cache: false,
//            headers: {
//                referer: myreferer
//            },
//            error: myerror,
//            data: mydata,
//            success: mysuccess
//        });
//    }
//    else if (IsNative == 1)
//    {
//        var httpReq = new plugin.HttpRequest();
//        httpReq.post({
//            type: "post",
//            url: myurl,
//            header: {
//                referer: myreferer
//            },
//            params: mydata
//        },
//            function (err, data)
//            {
//                if (err == null)
//                    mysuccess(data);
//                else
//                    myerror(err);
//            }
//        );

//    }
//    else
//    {
//        $.ajax({
//            type: 'post',
//            url: myurl,
//            cache: false,
//            error: myerror,
//            data: mydata,
//            success: mysuccess
//        });
//    }
//}

function GetAvailabilty()
{
    TrainNo = M.TrainNo;
    QFilter["from"] = M.TrainFrom.StnCode;
    QFilter["to"] = M.TrainTo.StnCode;
    QFilter["rundate"] = $("#selectAvlDate").val();
    QFilter["quota"] = M.Quota;
    CurrentFromStn = [];
    CurrentFromStn[5] = M.TrainRunDays;
    TrainClasses = STrain[T_Classes];

    $("#divPassengerOption").html("");

    if (M.CurrentCommand == CMD_AVAILABILITY)
        ShowSeatsTable("#divAvailabilityResult");
    else
    {
        var str = "<table class='table BorderNone TDPadding-xss' ><tr>";

        QFilter["adult"] = "1";
        for (var i = 0; i < 4; i++)
        {
            var fltr = i == 1 ? "child" : i == 2 ? "sfemale" : i == 3 ? "smale" : "adult";
            var img = i == 1 ? "child" : i == 2 ? "senior-female" : i == 3 ? "senior-male" : "male";
            if (QFilter[fltr] == undefined)
                QFilter[fltr] = "0";

            str += "<td><button class='btn btn-deafult' data-count='" + QFilter[fltr]
                + "' id='Passenger" + i + "' onclick='return ShowPassengerSelection(" + i + ");'><img class='PassengerImage' src='icons/" + img
                + ".png' /><span id='Passenger" + i + "badge' class='badge'>" + parseInt(QFilter[fltr]) + "</span></button></td>";
        }

        str += "<tr><td colspan='4'><div id='divPassengerSelection'></div></table>";
        $("#divPassengerOption").html(str);

        ShowFareTable("#divAvailabilityResult");
    }

    //ShowWait(true);
    //$("#divAvailabilityResult").html("Loading...");

    //if (M.CurrentCommand == CMD_AVAILABILITY)
    //{

    //    postData(
    //        "http://www.indianrail.gov.in/cgi_bin/inet_accavl_cgi.cgi",
    //        "http://www.indianrail.gov.in",
    //        {
    //            lccp_trnno: M.TrainNo,
    //            lccp_day: M.mDay,
    //            lccp_month: M.mMonth,
    //            lccp_srccode: M.TrainFrom.StnCode,
    //            lccp_dstncode: M.TrainTo.StnCode,
    //            lccp_class1: M.Class,
    //            lccp_quota: M.Quota,
    //            lccp_classopt: "ZZ",
    //            lccp_class2: "ZZ",
    //            lccp_class3: "ZZ",
    //            lccp_class4: "ZZ",
    //            lccp_class5: "ZZ",
    //            lccp_class6: "ZZ",
    //            lccp_class7: "ZZ"
    //        },
    //        function (data)
    //        {
    //            data = data.replace(/<TH ALIGN = Center/gi, "<td").replace(/TH>/gi, "td>");
    //            var data2 = "";

    //            $("h2", $(data)).each(function (index)
    //            {
    //                data2 += "<br/>" + $(this).html();
    //            });

    //            $("h3", $(data)).each(function ()
    //            {
    //                data2 += "<br/>" + $(this).html();
    //            });

    //            $("table", $(data)).each(function (index)
    //            {
    //                //if ($('td:first', this).text() == "Train Number") data2 = GetCleanTable(this, "Date (DD-MM-YYYY)", "Date").replace("Destination", "Dest.") + "<br/>";
    //                if ($('td:first', this).text() == "S.No.") data2 = GetCleanTable(this, "Date (DD-MM-YYYY)", "Date");
    //            });

    //            if (data2.length == 0)
    //                data2 = "Please retry again."

    //            $("#divAvailabilityResult").html(data2);
    //            $("#divAvailabilityResult table").css({ "width": "100%", "text-shadow": "none" });
    //            ShowWait(false);
    //            Beautify();
    //        }
    //        , function (err)
    //        {
    //            $("#divAvailabilityResult").html("Server did not respond, please try again");
    //            ShowWait(false);
    //        }
    //    );
    //}
    //else//fare
    //{
    //    postData(
    //        "http://www.indianrail.gov.in/cgi_bin/inet_frenq_cgi.cgi",
    //        "http://www.indianrail.gov.in",
    //        {
    //            lccp_trnno: M.TrainNo,
    //            lccp_day: M.mDay,
    //            lccp_month: M.mMonth,
    //            lccp_srccode: M.TrainFrom.StnCode,
    //            lccp_dstncode: M.TrainTo.StnCode,
    //            lccp_classopt: M.Class,
    //            lccp_age: M.FareAge,
    //            lccp_conc: M.FareConcession,
    //            lccp_enrtcode: "NONE",
    //            lccp_viacode: "NONE",
    //            lccp_frclass1: "ZZ",
    //            lccp_frclass2: "ZZ",
    //            lccp_frclass3: "ZZ",
    //            lccp_frclass4: "ZZ",
    //            lccp_frclass5: "ZZ",
    //            lccp_frclass6: "ZZ",
    //            lccp_frclass7: "ZZ",
    //            lccp_disp_avl_flg: "1"
    //        },
    //        function (data)
    //        {
    //            var data2 = "";
    //            $("h2", $(data)).each(function (index)
    //            {
    //                data2 += "<br/>" + $(this).html();
    //            });

    //            $("table", $(data)).each(function (index)
    //            {

    //                if ($('td:first', this).text() == "Train Number") data2 = GetCleanTable(this, "Date (DD-MM-YYYY)", "Date").replace("Destination", "Dest.") + "<br/>";
    //                if ($('td:first', this).text() == "Train Type") data2 += GetCleanTable(this);
    //                if ($('td:first', this).text() == "Fare/Charges") data2 += GetCleanTable(this);

    //            });

    //            $("#divAvailabilityResult").html(data2);
    //            //$("#divAvailabilityResult table").css("width", "100%");

    //            ShowWait(false);
    //        },
    //        function (e)
    //        {
    //            $("#divAvailabilityResult").html("Server did not respond, please try again");
    //            ShowWait(false);
    //        }
    //    );
    //}
}

function BindLabel()
{
    $("select[data-label]").each(
        function ()
        {
            UpdateLabel(this)
        }
        );

    $("select[data-label]").bind('change',
	function ()
	{
	    UpdateLabel(this);
	});
}

function UpdateLabel(obj)
{
    var lbl = $(obj).data("label");

    $("option", obj).each(function ()
    {
        if ($(this).text() != undefined)
            $(this).text($(this).text().replace(lbl, ""));
    });

    var txt = $("option:selected", obj).text();
    $("option:selected", obj).text(lbl + txt);
    try
    {
        $(obj).selectmenu("refresh", true);
    } catch (e) { }
}


function Beautify()
{

    $("tr", $("#divAvailabilityResult")).each(function ()
    {
        $("td", this).each(function (index)
        {
            if (index == 0)
                $(this).remove();

            var txt = $(this).text(), bgClr = "";

            if (txt.indexOf("NOT AVAILABLE") > -1) bgClr = "DDDDFF";
            else if (txt.indexOf("RAC") > -1) bgClr = "FFFF77";
            else if (txt.indexOf("WL") > -1) bgClr = "FFC0CB";
            else if (txt.indexOf("AVAILABLE") > -1) bgClr = "AAFFAA";

            if (bgClr != "")
            {
                $(this).css("background-color", "#" + bgClr);
                var dt = $("td:eq(1)", $(this).parent()).text().split('-');
            }

        });

        //if (index == 2)
        //{
        //    Class1 = $.trim($("td:eq(2)", this).text().replace(" ", "").replace("Class-", ""));

        //    if ($("td:eq(3)", this))
        //        Class2 = $.trim($("td:eq(3)", this).text().replace(" ", "").replace("Class-", ""));
        //}

    });
}

function GetArrival()
{
    ShowWait(true);
    $.ajax({
        cache: CacheFlag, url: BaseURL + "Data.aspx?Action=ARRDEPART&Data1=" + M.StationTo.StnCode + "&Password=2012&Language=" + L, success:
		function (Data)
		{
		    Data = Data.replace(/ Stn/g, "");
		    TrainsObjAD = new TrainListAD(Data, "divArrival", 1, 0, "A");
		    TrainsObjAD.ExtraSorts(T_Arrival, 4); //sort on arrival time 
		    ShowWait(false);
		}
    });
}

function GetDeparture()
{
    ShowWait(true);
    $.ajax({
        cache: CacheFlag, url: BaseURL + "Data.aspx?Action=ARRDEPART&Data1=" + StnFrom.StnCode + "&Password=2012&Language=" + L, success:
		function (Data)
		{
		    Data = Data.replace(/ Stn/g, "");
		    TrainsObjAD = new TrainListAD(Data, "divDeparture", 1, 0, "D");
		    TrainsObjAD.ExtraSorts(T_Departure, 5); //sort on departure time 
		    ShowWait(false);
		}
    });
}

function GetDateSelection()
{
    var s = "<select id='selectDateType' onchange='OnDateTypeSelection()'>";
    s += "<option value='0'>Any Day</option>";
    s += "<option value='1'>Specific Day</option>";
    s += "<option value='2'>Next 4hrs</option>";
    s += "<option value='3'>Next 8hrs</option>";
    s += "<option value='4'>Today</option>";
    s += "</select>";
    return s;
}

function GetTrains()
{
    if (!RefreshTrainList)
        return;

    ShowWait(true);

    var URL = BaseURL + "rail/getTrains.aspx?Station_From=" + (M.Direction ? M.StationTo.StnCode : M.StationFrom.StnCode) + "&Station_To=" + (M.Direction ? M.StationFrom.StnCode : M.StationTo.StnCode);

    $("#divTrainsList").html("Loading...");
    $.ajax({
        cache: true, url: URL, success:
		function (Data)
		{
		    ShowWait(false);
		    TrainsObj = new TrainList(Data, "", "TrainsObj", 1);
		    ShowTrainsList();
		}

    });
}

function ShowRoute(TrainID, CallBack)
{
    ShowWait(true);

    $.ajax({
        cache: CacheFlag, url: BaseURL + "Data.aspx?Action=TRAINROUTE&Password=2012&Data1=" + TrainID + "&Language=" + L, success:
				function (Data)
				{
				    Data = Data.replace(/ Stn/g, "");
				    RouteObj = new RouteList(Data, "", 1);
				    CallBack();
				    ShowWait(false);
				}

    });
}

function ShowWait(flag)
{
    $.mobile.loading(flag ? "show" : "hide");
}

function IsFilterApplicable(arr)
{
    var AllOne = true, AllZero = true;

    $(arr).each(function ()
    {
        if (parseInt(this) == 1) AllZero = false;
        if (parseInt(this) == 0) AllOne = false;
    });

    return !(AllZero || AllOne);
}

function SelectTrain(TrainID, TrainNo, TrainName, TrainClasses, TrainRunDays, StnFrom, StnFromName, StnTo, StnToName)
{
    STrain = null;
    $(M.FilteredTrainList).each(function ()
    {
        if (this[T_TrainID] == TrainID)
        {
            STrain = this;
        }
    });

    if (!STrain)
    {
        var T = new Array();
        T[T_TrainID] = TrainID;
        T[T_No] = TrainNo;
        T[T_Name] = TrainName;
        T[T_Classes] = TrainClasses;
        T[T_RunDays] = TrainRunDays;
        T[T_StnFrom] = StnFrom;
        T[T_StnTo] = StnTo;
        T[T_StnFromName] = StnFromName;
        T[T_StnToName] = StnToName;
        STrain = T;
        M.FilteredTrainList.push(T);
    }
    CopyTrainInfo(STrain);
    M.Save();
    RunCommand(CMD_TRAINOPTIONS);

}

function FormatSortedOn(arr, Index)
{
    return Index == M.SortedOn ? "<span style='background-color:Gold'>" + arr[Index] + "</span>" : arr[Index];
}

function ShowTrainList2(Arr, DivID)
{
    M.FilteredTrainList.length = 0;
    var S = "<table class='trainslist' style='width:100%'>"
    $(Arr).each(function ()
    {
        if (this.length < 50)
            return;


        S += "<tr onclick='SelectTrain(" + this[T_TrainID] + ")' ><td colspan='9'>" + this[T_Name] + (this[T_Pantry] == "1" ? "*" : "") + ", " + this[T_No] + ", " + this[T_Travel] + "hr";

        S += "<tr onclick='SelectTrain(" + this[T_TrainID] + ")'>";
        for (var j = 0; j < 7; j++)
        {
            if (this[T_RunDays].charAt(j) == 1)
            {
                S += "<td runday='1'>" + d_name[j] + "</td>";
            }
            else
            {
                S += "<td>" + d_name[j] + "</td>";
            }
        }

        S += "<td>" + this[T_StnFrom] + "<td>" + this[T_Departure];
        S += "<tr onclick='SelectTrain(" + this[T_TrainID] + ")'>";

        for (var j = 0; j < 7; j++)
        {

            if (this[T_Classes].charAt(j) == 1)
            {
                S += "<td classavl='1'>" + n_Classes[j] + "</td>";
            }
            else
            {
                S += "<td>" + n_Classes[j] + "</td>";
            }
        }

        S += "<td>" + this[T_StnTo] + "<td>" + this[T_Arrival]; // + "-" + Fn[T_Travel]

        M.FilteredTrainList.push(this);

    });

    S += "</table>";//<br/><span style='font-size:.8em'>Ver : 1.0.5 Beta<br>We are continuously updating the application with new features, use Reset to re initialize the application</span>";

    $(DivID).html(S);
    $(DivID).trigger("create");

}

function GetTrainNameColor(TrainType)
{
    var clr = "000000";
    switch (TrainType)
    {
        case "SHATABDI": clr = "006AD5"; break
        case "RAJDHANI": clr = "FF480B"; break
        case "RAIL_MOTOR": clr = "008000"; break
        case "SUPERFAST": clr = "D56A00"; break
        case "MAIL_EXPRESS": clr = "8B4513"; break
        case "COMPOSITE": clr = "556B2F"; break
    }
    return clr
}

function ShowFavoriteList()
{
    ShowTrainList2(M.FavoriteTrainList, "#divFavorite");
}

function ShowTrainsList()
{
    RefreshTrainList = false;

    SortTableQ(M.SortedOn, 0, TrainsObj.Trains, 1);

    M.FilteredTrainList.length = 0;

    var str = "<table class='trainslist' style='width:100%'>"
    var NoTrainFound = "<tr><td>No train found<td></td>";
    for (var i = 1; i < TrainsObj.Trains.length; i++)
    {
        var Fn = TrainsObj.Trains[i];
        var icon = IsInFavorite(Fn[T_TrainID]) != -1 ? "star" : "false";

        var clr = GetTrainNameColor(Fn[T_TrainType]);
        var S = "<tr onclick='SelectTrain(" + Fn[T_TrainID] + ")' ><td colspan='9'><span style='color:#" + clr + "'>" + FormatSortedOn(Fn, T_Name) + "</span>" + " " + FormatSortedOn(Fn, T_No) + ", " + FormatSortedOn(Fn, T_Travel) + "hr " + (Fn[T_Pantry] == "1" ? "<span style='color:red'>P</span>" : "");

        var FilterClass = M.FilterClass == "";
        var FilterDay = M.FilterDay == "";

        S += "<tr onclick='SelectTrain(" + Fn[T_TrainID] + ")'>";
        for (var j = 0; j < 7; j++)
        {
            if (Fn[T_RunDays].charAt(j) == 1)
            {
                var clr = "runday='1' ";
                if (M.FilterDay == j.toString())
                {
                    FilterDay = true;
                    clr += "daysfilter='1'";
                }

                S += "<td " + clr + ">" + d_name[j] + "</td>";
            }
            else
            {
                S += "<td>" + d_name[j] + "</td>";
            }
        }

        S += "<td>" + Fn[T_StnFrom] + "<td>" + FormatSortedOn(Fn, T_Departure) + "</td></tr>";

        S += "<tr onclick='SelectTrain(" + Fn[T_TrainID] + ")'>";
        for (var j = 0; j < 7; j++)
        {
            if (Fn[T_Classes].charAt(j) == 1)
            {
                var clr = "classavl='1' ";

                if (M.FilterClass == j.toString())
                {
                    FilterClass = true;
                    clr += "classfilter='1'";
                }

                S += "<td " + clr + ">" + n_Classes[j] + "</td>";
            }
            else
            {
                S += "<td>" + n_Classes[j] + "</td>";
            }
        }

        S += "<td>" + Fn[T_StnTo] + "<td>" + FormatSortedOn(Fn, T_Arrival) + "</td></tr>";

        //if (FilterClass && FilterDay)
        {
            str += S;
            NoTrainFound = "";
            M.FilteredTrainList.push(Fn);
        }
    }

    str += NoTrainFound

    if (NoTrainFound == "")
    {
        str += "</table><table style='width:100%;font-size: .79em;font-shadow:none;text-align:center;border-collapse:collapse;'><td style='background-color:gold'>Sorted on";
        str += "<td style='background-color:DeepSkyBlue'>Class Filter";
        str += "<td style='background-color:LightGreen'>Day Filter";
        str += "<tr><td colspan='3'>Select train for Seat Availability, Route, Running Status & Fare</table>";
    }


    $("#divTrainsList").html(str);
    $("#divTrainsList").trigger("create");
}

jQuery.fn.outerHTML = function (s)
{
    return s ? this.before(s).remove() : jQuery("<p>").append(this.eq(0).clone()).html();
};

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady()
{
    // Add event listener to the back button
    //document.addEventListener("backbutton", backButtonHandler, false);

    setTimeout(function ()
    {
        navigator.splashscreen.hide();
    }, 10);
}

function exitFromApp()
{
    navigator.device.exitApp();
}

function ParseRunStatus(data)
{
    var obj = JSON.parse(data);
    if (obj.TrainNumber != undefined)
    {
        return "<table style='width:100%'>"
        + "<tr><td style='width:40%''>Train<td><b>" + obj.TrainNumber + "-" + obj.TrainName + "</b>"
        + "<tr><td>Journey Station<td><b>" + obj.JourneyStationName + "-" + obj.JourneyStation + "</b>"
        + "<tr><td>Journey Date<td><b>" + obj.JourneyDate + "</b>"
        + "<tr><td>Sch. Arrival<td><b>" + obj.SchArr + "</b>"
        + "<tr><td>" + (obj.ArrFlag == "0" ? "Exp." : "Act.") + " Arrival<td><b>" + obj.ActArr + "</b>"
        + "<tr><td>Delay Arrival<td><b style='color:" + (obj.DelayArr.indexOf("Delayed") > -1 ? "red" : "green") + "'>" + obj.DelayArr + "</b>"
        + "<tr><td>Sch. Departure<td><b>" + obj.SchDep + "</b>"
        + "<tr><td>" + (obj.DepFlag == "0" ? "Exp." : "Act.") + " Departure<td><b>" + obj.ActDep + "</b>"
        + "<tr><td>Delay Departure<td><b style='color:" + (obj.DelayDep.indexOf("Delayed") > -1 ? "red" : "green") + "'>" + obj.DelayDep + "</b>"
        + "<tr><td>Exp. Platform<td><b>" + obj.Platform + "</b>"
        + "<tr><td>Last Update<td><b>" + obj.LastUpdate + "</b>"
        + "<tr><td>Updated On<td><b>" + obj.LastUpdateTime + "</b>"
        + "<tr><td>Source<td><b>" + obj.SourceName + "-" + obj.Source + "</b>"
        + "<tr><td>Destination<td><b>" + obj.DestinationName + "-" + obj.Destination + "</b>"
        + "</table>";
    }

    return "Error reading data";
}

function GetTrainRunningStatusForm(jDateType)
    //function GetTrainRunningStatusForm()
{
    //ShowWait(true);

    //var stn = $("#selectRunStatusFrom").val();
    ////var dt = new Date($("#selectRSDate").val());

    //$("#RunStatusResult").html("Loading...");

    //$.ajax({
    //    cache: CacheFlag,
    //    url: "http://enquiry.indianrail.gov.in/crisntes/MoAppAServc?action=TrainRunningMob&subAction=ShowRunJson&trainNo=" + M.TrainNo + "&jStation=" + stn + "&jDateType=" + jDateType,
    //    success:
    //        function (data)
    //        {
    //            ShowWait(false);
    //            $("#RunStatusResult").html(ParseRunStatus(data));
    //        }
    //    , error: function (e)
    //    {
    //        ShowWait(false);

    //        if (e.status == 200 && e.statusText == "OK")
    //        {
    //            $("#RunStatusResult").html(ParseRunStatus(e.responseText));
    //        }
    //        else
    //        {
    //            $("#RunStatusResult").html("Server did not respond, please try again");
    //        }
    //    }

    //});


    //postData("http://enquiry.indianrail.gov.in/crisntes/MoAppAServc?action=TrainRunningMob&subAction=ShowRunJson&trainNo=" + M.TrainNo + "&jStation=" + stn + "&jDateType=" + jDateType,
    //        "http://enquiry.indianrail.gov.in",
    //        {},
    //		function (data)
    //		{
    //		    alert(data);
    //		    ShowWait(false);
    //		    $("#RunStatusResult").html($("#ntestableRun", $(data)).outerHTML());
    //		},
    //        function (e)
    //        {
    //            $("#RunStatusResult").html("Server did not respond, please try again");
    //            ShowWait(false);
    //        }
    //        );

}

function ShowRunDates()
{
    var Lines = HistorData;

    var Stn = $("#selectRunStatusFrom").val();
    if (Stn == undefined)
        Stn = M.TrainTo.StnCode;

    var SelectedIndex = -1;
    var str = "<select id='selectRunStatusFrom' data-icon='false' onchange='ShowRunDates()' >"
    $(Lines).each(function (index)
    {
        if (this == "")
            return;

        var F = this.split('^');
        var T = F[0].split(':');

        if (Stn == T[0])
            SelectedIndex = index;
        str += "<option value='" + T[0] + "' " + (Stn == T[0] ? "selected='selected'" : "") + " >" + T[1] + "(" + T[0] + ")</option>";
    });

    str += "</select>";

    //str += "<input data-theme='b' type='button' value='Today' onclick='GetTrainRunningStatusForm(\"TD\")' />";
    //str += "<input data-theme='b' type='button' value='Yesterday' onclick='GetTrainRunningStatusForm(\"YS\")' />";
    //str += "<input data-theme='b' type='button' value='Tomorrow' onclick='GetTrainRunningStatusForm(\"TM\")' />";

    $("#divRSStations").html(str);
    $("#divRSStations").trigger("create");
    $("#RunStatusResult").html("");

    ShowWait(false);
    BindLabel();

    TrainNo = M.TrainNo;
    QFilter["from"] = $("#selectRunStatusFrom").val();
    ShowLiveTable();


}

var HistorData = null;
function TrainRunningStatusForm()
{
    $("#divRSTrainInfo").html(M.TrainNo + "-" + M.TrainName);
    //var Key = "0_" + M.TrainNo + "_" + RunDate.toString("dd-MMM-yy") + "_" + $("#selectRunStatusFrom").val();//QFilter["from"]
    //GetRunData("","#divRSTrainInfo");
    //ShowWait(true);

    $.ajax({
        cache: CacheFlag, url: BaseURL + "Data.aspx?Action=TRAIN_RUN_STATUS3&Data1=" + M.TrainID + "&Language=" + L, success:
            function (Data)
            {
                HistorData = Data.split('~')
                ShowRunDates();
            }

    });
}

//function formatted_delayTime(delay_mins)
//{
//    if (delay_mins == "" || delay_mins == 0)
//        return "";

//    if (delay_mins < 0)
//        return " (" + Math.abs(delay_mins) + " m early)";

//    var d = delay_mins + ' m';

//    if (delay_mins >= 60)
//        d = Math.floor(delay_mins / 60) + ' h' + ((delay_mins % 60) ? (' ' + (delay_mins % 60) + ' m') : '');

//    return " (" + d + " late )";
//}

function FormatDate(d)
{
    if (!d)
        return "";
    var H = d.getHours();
    if (H < 10) H = "0" + H;
    var M = d.getMinutes();
    if (M < 10) M = "0" + M;

    var D = d.getDate();
    if (D < 10) D = "0" + D;

    var Mn = d.getMonth() + 1;
    if (Mn < 10) Mn = "0" + Mn;

    return H + ":" + M + ", " + D; // + "-" + Mn;
}

function FormatDate2(d)
{
    if (!d)
        return "";
    var H = d.getHours();
    if (H < 10) H = "0" + H;
    var M = d.getMinutes();
    if (M < 10) M = "0" + M;

    return H + ":" + M;
}

function FormatDelay(mili)
{
    var min = Math.round(mili / 60000);
    var txt = "";
    if (min > 0)
        txt = (min < 10 ? "0" : "") + min;
    else if (min < 0)
        txt = (min > -10 ? "0" : "") + min.toString().replace("-", "");

    return "<span class='" + (min > 0 ? "Red" : "Green") + "'>" + txt + "</span>";
}

function ShowRouteList()
{
    var str = "<table style='width:100%;border-collapse:collapse;font-size:.8em'><tr><td colspan='7'>" + M.TrainName + " - " + M.TrainNo;

    for (var i = 1; i < RouteObj.Route.length; i++)
    {
        Fn = RouteObj.Route[i];
        var trstyle = "style='background-color:" + (i % 2 == 1 ? "#e0e0e0'" : "white'");

        str += "<tr " + trstyle + "><td rowspan='2'>" + i + "<td colspan='3'>" + Fn[TR_StnName];

        var H = Fn[TR_Halt] != "" ? Fn[TR_Halt] + "m" : "";

        str += "<td>" + Fn[TR_Arrival] + "<td>A"
		+ "<tr " + trstyle + "><td>" + Fn[TR_StnCode] + "<td>" + H + "<td>" + (Fn[TR_Distance] != 0 ? Fn[TR_Distance] + "km" : "")
		+ "<td>" + Fn[TR_Departure] + "<td>D";

    }

    $("#divTrainRoute").html(str);
    ShowWait(false);

}

function ShowStationSearch(stn)
{
    M.SelectedStation = stn;
    $.mobile.changePage("#Search");
}

function BuildStnSearchResult()
{
    var ret, arr, len = StationsList.length, ctr = 0;
    ret = { suggestions: [], data: [] };

    var tempStn = new Array(); //match any part of the string
    var tempStnFirstMatch = new Array(); //match the starting of the string
    len = StationsList.length;
    var q = $("#txtSearch").val().toUpperCase();

    var qL = q.toLowerCase();
    var MaxSearch = 15;

    for (var i = 0; i < len; i++)
    {
        //station code exact match
        if (q == StationsList[i][0])
        {
            ret.suggestions.push(L == 1 ? StationsList[i][2] : StationsList[i][1]); // 1-English , 2-Other Language L==1> other language has been selected
            ret.data.push(StationsList[i][0]);
            if (tempStnFirstMatch.length >= MaxSearch)
                break;
        }
        else if (tempStnFirstMatch.length < MaxSearch)
        {
            // station name match
            var str = StationsList[i][1].toLowerCase();
            var Index = str.indexOf(qL);
            if (Index > -1)
            {
                if (Index == 0)
                    tempStnFirstMatch.push(StationsList[i]);
                else
                    tempStn.push(StationsList[i]);
            }
        }
    }

    for (i = 0; i < tempStnFirstMatch.length; i++)
    {
        ret.suggestions.push(L == 1 ? tempStnFirstMatch[i][2] : tempStnFirstMatch[i][1]);
        ret.data.push(tempStnFirstMatch[i][0]);
        if (ret.data.length > MaxSearch)
            break;
    }

    for (i = 0; i < tempStn.length; i++)
    {
        if (ret.data.length > MaxSearch)
            break;
        ret.suggestions.push(L == 1 ? tempStn[i][2] : tempStn[i][1]);
        ret.data.push(tempStn[i][0]);
    }

    var str = "<br/><ul data-role='listview'>";
    for (i = 0; i < ret.suggestions.length; i++)
    {
        str += "<li data-icon='false'><a href='#' onclick='UpdateStation(\"" + ret.suggestions[i] + "\",\"" + ret.data[i] + "\")'>" + ret.suggestions[i] + "<p class='ui-li-aside'>" + ret.data[i] + "</p></a></li>";
    }

    $("#divSearchResult").html(str + "</ul><br/>");
    $("#divSearchResult").trigger("create");

    return ret;

}

function StationSearch(obj)
{
    setTimeout("BuildStnSearchResult()", 10);
}

function UpdateStation(StnName, StnCode)
{
    AddStationToFavoriteList(StnName, StnCode);
    M.SelectedStation.StnName = StnName;
    M.SelectedStation.StnCode = StnCode;
    RunCommand(CMD_TRAINS);
}

function AddStationToFavoriteList(StnName, StnCode, Remove)
{
    if (M.FavoriteStations == null)
        M.FavoriteStations = new Array();

    var Found = -1;
    for (var i = 0; i < M.FavoriteStations.length; i++)
    {
        if (M.FavoriteStations[i].Code == StnCode)
        {
            Found = i;
            break;
        }
    }

    if (Found == -1)
        M.FavoriteStations.push({ Code: StnCode, Name: StnName });

    if (Remove)
        M.FavoriteStations.splice(Found, 1);
}

function AddToPNRHistory(PNR, Remove)
{
    var Found = -1;
    if (M.FavoritePNR == null)
        M.FavoritePNR = new Array();

    for (var i = 0; i < M.FavoritePNR.length; i++)
    {
        if (M.FavoritePNR[i].PNR == PNR)
        {
            Found = i;
            break;
        }
    }

    if (Found == -1)
    {
        M.FavoritePNR.push({ PNR: PNR, From: "", To: "", Date: "", Train: "" });
    }

    if (Remove)
    {
        M.FavoritePNR.splice(Found, 1);
    }
}
var PNRpostURL = "";

function GetPNR(PNR)
{
    if (!PNR)
        PNR = $("#txtPNR").val();
    else
        $("#txtPNR").val(PNR);

    if (PNR.length < 10)
    {
        $("#divPNRStatus").html("Please enter 10 digit PNR");
        return;
    }

    if (PNR.length > 10)
        PNR = PNR.substring(0, 10);

    M.PNR = PNR;

    AddToPNRHistory(PNR);

    M.Save();
    //ShowWait(true);
    //$("#divPNRStatus").html("Loading Status for " + M.PNR);
    QFilter["pnr"] = M.PNR;
    GetPNRStatus2();

    //$.ajax({
    //    type: 'GET',
    //    url: "http://www.indianrail.gov.in/pnr_Enq.html",
    //    cache: false,
    //    async: true,
    //    success: function (data, status)
    //    {
    //        var n = data.indexOf("action=");
    //        if (n > 0)
    //        {
    //            var URL = data.substring(n + 8);
    //            n = URL.indexOf(".cgi");
    //            PNRpostURL = URL.substring(0, n) + ".cgi";
    //            if (PNRpostURL.length > 0)
    //            {
    //                postData(PNRpostURL
    //                    , "http://www.indianrail.gov.in",
    //                    { lccp_pnrno1: M.PNR, lccp_cap_val: 67239, lccp_capinp_val: 67239 }
    //                    ,
    //                    function (data)
    //                    {

    //                        var data2 = "<div>PNR status not available currently, please try again later.";
    //                        var stnFrom = "", stnTo = "", TravelDate = "", TravelTrain = "";
    //                        $("table", $(data)).each(function (index)
    //                        {
    //                            if ($('td:first', this).text() == "Journey Details")
    //                            {
    //                                //var lbl = ["Train", "Name", "Date", "From", "To", "Upto", "Brdg", "Class"];
    //                                stnFrom = $('tr:eq(2) td:eq(3)', this).text();
    //                                stnTo = $('tr:eq(2) td:eq(4)', this).text();
    //                                TravelDate = $('tr:eq(2) td:eq(2)', this).text();
    //                                TravelTrain = $('tr:eq(2) td:eq(0)', this).text().replace("*", "-");

    //                                data2 = "<div style='font-size:.8em'>" + $('tr:eq(2) td:eq(1)', this).text() + TravelTrain + "<br/>" + stnFrom + " to " + stnTo + " on " + TravelDate;

    //                            }
    //                            if ($('td:first', this).text() == "S. No.") data2 += GetCleanTable(this, "Passenger ", "");
    //                        });

    //                        $("#divPNRStatus").html(data2 + "</div>").trigger("create");

    //                        $(M.FavoritePNR).each(function ()
    //                        {
    //                            if (this.PNR == M.PNR)
    //                            {
    //                                this.From = stnFrom;
    //                                this.To = stnTo;
    //                                this.Train = TravelTrain;
    //                                this.Date = TravelDate;
    //                            }
    //                        });

    //                        ShowWait(false);
    //                    },
    //                    function (e)
    //                    {
    //                        $("#divPNRStatus").html("Time out, please try again");
    //                        ShowWait(false);
    //                    });
    //            }

    //        }

    //        ShowWait(false);
    //    },
    //    error: function (xhr, textStatus, errorThrown)
    //    {
    //        $("#divPNRStatus").html("Time out, please try again");
    //        ShowWait(false);
    //    }
    //});

}

function GetCleanTable(obj, replacetxt, replacewith)
{
    var str = "<table style='text-align:center;border-spacing:1px;width:100%'>";
    $("tr", $(obj)).each(function (index)
    {
        str += "<tr>";
        $("td", $(this)).each(function (index)
        {
            var i = $(this).attr('colspan');
            var spn = i != undefined ? "colspan='" + i + "'" : "";
            var s = $(this).text();
            if (replacetxt != undefined)
                s = s.replace(replacetxt, replacewith);
            str += "<td " + spn + ">" + s + "</td>";
        });
        str += "</tr>";
    });

    str += "</table>";
    return str;
}

function GetIndiaTime()
{
    return new Date();
}

function RefundCalculate()
{
    var passengers = $("#ddPassengers").val();
    var TicketAmount = 500; //Cmn.ToInt(txtTicketAmount.Text);

    var str = "<table style='width:100%;text-align:center' cellpadding='0' cellspacing='1'><tr style='background:#d0d0d0'><th> If canceled before<th>Time Remaining<th>Charge<th>Refund";

    var dtJourneyDate = new Date(SelectedDate);
    dtJourneyDate.add({ hours: $("#ddTrainTime").val() });

    var Charge = 0;

    switch ($("#ddClasses").val())
    {
        case "1A":
            Charge = 70; break;
        case "2A":
        case "3A":
        case "FC":
        case "CC":
        case "3E":
            Charge = 60; break;
        case "SL":
            Charge = 40; break;
        case "2S":
            Charge = 20; break;
        case "GN":
            Charge = 10; break;
    }

    if ($("#ddTicketStatus").val() != 0)// not confirmed
        Charge = 20;

    if ($("#ddCancellatioReason").val() != 0)
        Charge = 0;

    var Charge24hourBefore = Charge * passengers;
    var LastTime = new Date(dtJourneyDate);
    //TimeSpan TimeRemain;
    var tdImg = "<td>"; //<img align='baseline' src='../images/rupee.gif'>";
    if ($("#ddTicketType").val() == "0")
    {
        if (TicketAmount == 0)
        {
            //lblExtraInfo.Text = "Please enter ticket amount / टिकट राशि दर्ज करें";
            //txtTicketAmount.Focus();
            //return;
        }


        if ($("#ddTicketStatus").val() == "0" && $("#ddCancellatioReason").val() == "0")
        {
            // 24 hours before
            LastTime = new Date(dtJourneyDate).add({ hours: -24 });

            if (LastTime > GetIndiaTime())
            {
                //

                str += "<tr><td>" + LastTime.toString("dd-MMM-yy");
                //TimeRemain = LastTime.Subtract(Cmn.GetIndiaTime());
                //str +="<td>" + TimeRemain.getdate + " day " + TimeRemain.Hours.ToString("0") + " hrs";
                str += tdImg + Charge24hourBefore + tdImg + (TicketAmount - Charge24hourBefore);
            }

            // 4 hours before
            LastTime = new Date(dtJourneyDate).add({ hours: -4 });
            str += "<tr><td>" + LastTime.toString("dd-MMM-yy");
            TimeRemain = LastTime - GetIndiaTime();
            //str +="<td>" + TimeRemain.Days.ToString("0") + " day " + TimeRemain.Hours.ToString("0") + " hrs";
            var Amount25Percent = parseInt(TicketAmount * 0.25);
            var Charge4hourBefore = Amount25Percent < Charge24hourBefore ? Charge24hourBefore : Amount25Percent;
            str += tdImg + Charge4hourBefore + tdImg + (TicketAmount - Charge4hourBefore);
        }

        var OfficeOpenTime = new Date(SelectedDate);
        OfficeOpenTime.setHours(12); //  new DateTime(OfficeOpenTime.Year, OfficeOpenTime.Month, OfficeOpenTime.Day, 12, 0, 0);

        var IsNightTrain = false;
        if (dtJourneyDate.getHours() >= 21 || dtJourneyDate.getHours() <= 6)
        {
            if (dtJourneyDate.getHours() >= 21)
                OfficeOpenTime.add({ days: 1 });

            IsNightTrain = true;
            lblExtraInfo = "Train departs after 9pm and before 6am, and if the reservation office opens at 8am";
        }

        var Amount50Percent = parseInt(TicketAmount * 0.50);
        var Charge4hourAfter = Amount50Percent < Charge24hourBefore ? Charge24hourBefore : Amount50Percent;
        if ($("#ddTicketStatus").val() != "0") Charge4hourAfter = Charge24hourBefore;
        switch ($("#ddTravelDistance").val())
        {

            case "0": LastTime = dtJourneyDate.add({ hours: 3 }); break; //after 4 hours and before 3 hours after departure and travel distance 200km
            case "1": LastTime = dtJourneyDate.add({ hours: 6 }); break; //after 4 hours and before 6 hours after departure and travel distance 200-500km
            case "2": LastTime = dtJourneyDate.add({ hours: 12 }); break; //after 4 hours and before 12 hours after departure and travel distance 500km beyond
        }

        if (IsNightTrain)
            LastTime = OfficeOpenTime > LastTime ? OfficeOpenTime : LastTime;

        str += "<tr><td>" + LastTime.toString("dd-MMM-yy h");
        TimeRemain = LastTime - GetIndiaTime();
        //str +="<td>" + TimeRemain.Days.ToString("0") + " day " + TimeRemain.Hours.ToString("0") + " hrs";
        str += tdImg + Charge4hourAfter + tdImg + (TicketAmount - Charge4hourAfter);
    }
    else
    {
        // 24 hours before
        LastTime = dtJourneyDate.add({ hours: -24 });

        if ($("#ddTicketStatus").val() == "0") //Confirmed
            str += "<tr><td><td><td><td>No Refund";
        else
            str += "<tr><td><td><td><td>General RAC / Wait List Rules Apply";
    }

    str += "</table>";

    $("#RefundResult").html(str);
}

function SaveInLocalStorage(Key, val)
{
    if (typeof (localStorage) != 'undefined')
    {
        window.localStorage.removeItem(Key);
        window.localStorage.setItem(Key, val);
        return true;
    }
    else
    {
        alert("Your browser does not support local storage, please upgrade to latest browser");
        return false;
    }
}

function LoadFromLocalStorage(Key, DefaultValue)
{
    var valoutput;
    if (typeof (window.localStorage) != 'undefined')
    {
        valoutput = window.localStorage.getItem(Key);
    }
    else
    {
        throw "window.localStorage, not defined";
    }
    //console.log(Key + "-" + valoutput);

    if (DefaultValue && !valoutput)
        return DefaultValue;
    else
        return valoutput;
}

function RemoveFromLocalStorage(Key)
{
    window.localStorage.removeItem(Key);
}

function ClearLocalStoreage()
{
    if (typeof (window.localStorage) != 'undefined')
    {
        window.localStorage.clear();
    }
    else
    {
        throw "window.localStorage, not defined";
    }
}

function SearchTrain()
{
    M.FilteredTrainList.length = 0;
    var query = $("#txtTrainSearch").val();
    if (query.length < 2)
    {
        $("#divTrainSearchResult").html("Please enter min. 2 charcters");
        return;
    }

    ShowWait(true);
    var URL = BaseURL + "Data.aspx?Action=TRAINSEARCH&Password=2012&Data1=" + $("#txtTrainSearch").val();
    
    $.ajax({
        cache: true, url: URL, success:
		function (Data)
		{
		    ShowWait(false);
		    var trainSearch = new TrainList(Data, "", "", 1);
		    trainSearch.ExtraSorts(T_Name, 1); //sort on name

		    //console.log(trainSearch.Trains);
		    ShowTrainList2(trainSearch.Trains, "#divTrainSearchResult");
		}
    });
}

var reEscape = new RegExp('(\\' + ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'].join('|\\') + ')', 'g');

function fnFormatResult(value, query)
{
    try
    {
        var pattern = '(' + query.replace(reEscape, '\\$1') + ')';
        return value.replace(new RegExp(pattern, 'gi'), '<span>$1<\/span>');
    }
    catch (e)
    {
        return value;
    }
};

var StationsData="AIRL,Airoli,ABH,Ambarnath,ABY,Ambivli,ADH,Andheri,ASO,Asangaon,ATG,Atgaon,BUD,Badlapur,BA,Bandra Jn,BEPR,Belapur C B D,BND,Bhandup,BYR,Bhayandar,BIRD,Bhivandi Road,BVS,Bhivpuri Road,BOR,Boisar,BVI,Borivali,BY,Byculla,CYR,Charni Road,CMBR,Chembur,CHG,Chinchpokli,CHF,Chunabhatti,CCG,Churchgate,CTGN,Cotton Green,CRD,Currey Road,DR,Dadar Cr,DDR,Dadar Wr,DRD,Dahanu Road,DIC,Dahisar,DTVL,Dativli Cabin,DIVA,Diva Jn,DKRD,Dockyard Road,DLV,Dolavi,DI,Dombivli,EPR,Elphinstone Road,GNSL,Ghansoli,GC,Ghat Kopar,GMN,Goregaon,GV,Govandi,GTR,Grant Road,GTBN,Guru Teghbahadurnagar,JOS,Jogeshwari,JCNR,Juchandra,JNJ,Juinagar,KLMC,Kalamboli,KLVA,Kalva,KYN,Kalyan Jn,KARD,Kaman Road,KILE,Kandivli,KJMG,Kanjur Marg,KJT,Karjat,KSRA,Kasara,KLY,Kelavi,KLV,Kelve Road,KDV,Khadavli,KNDS,Khandeshwar,KHAR,Khar Road,KHBV,Kharbav,KE,Khardi,KHAG,Kharghar,KHPI,Khopoli,KCE,Kings Circle,KOPR,Kopar,KPHN,Kopar Khairna,CLA,Kurla Jn,PL,Lower Parel,LWJ,Lowjee,MX,Mahalakshmi,MM,Mahim Jn,MDD,Malad,MNKD,Mankhurd,MANR,Mansarovar,MEL,Marine Lines,MSD,Masjid,MTN,Matunga,MRU,Matunga Road,MIRA,Mira Road,MLND,Mulund,BCT,Mumbai Central,CSTM,Mumbai CST,MBQ,Mumbra,NHU,Nahur,NIG,Naigaon,NSP,Nalla Sopara,NVRD,Navade Road,NRL,Neral,NEU,Nerul,NIIJ,Nilaje,PDI,Palasdari,PLG,Palghar,PNVL,Panvel,PR,Parel,RABE,Rabale,RRD,Reay Road,SNRD,Sandhurst Road,SNCR,Sanpada,STC,Santa Cruz,SAH,Saphale,SWDV,Sea Wood Darave,SVE,Sewri,SHAD,Shahad,SHLU,Shelu,SIN,Sion,TPND,Taloja Panchnand,THK,Thakurli,TNA,Thane,TKNG,Tilak Nagar,TLA,Titavala,TUH,Turbhe,ULNR,Ulhasnagar,UOI,Umroli,VDLR,Vadala Road,VTN,Vaitarna,VGI,Vangani,VGN,Vangaon,BSR,Vasai Road,VSH,Vashi,VSD,Vasind,VVH,Vidyavihar,VK,Vikhroli,VLP,Ville Parle,VR,Virar,VLDI,Vithalwadi";var sStationsData=StationsData.split(',');var StationsList=new Array(121);for(var s=0,i=0;s<sStationsData.length;s+=2,i++)StationsList[i]=new Array(sStationsData[s],sStationsData[s+1]);

var StationsData="";var sStationsData=StationsData.split(',');var StationsList=new Array(0);for(var s=0,i=0;s<sStationsData.length;s+=2,i++)StationsList[i]=new Array(sStationsData[s],sStationsData[s+1]);

var StationsData="ABB,Abada,AHA,Abhaipur,AVP,Abhanpur Jn,AYU,Abhayapuri Assam,AJUG,Abjuganj,ABS,Abohar,ABR,Abu Road,ABW,Abutara H,ACH,Achal Ganj,ULD,Achalda,ELP,Achalpur,ACK,Acharapakkam,ACND,Acharya Narendra Dev Nagar,ACG,Achegaon,AH,Achhnera Jn,ACU,Achuara H,ALPD,Adalpahari,ADX,Adapur,ADE,Adari Road,AKI,Adarki,ANDI,Adarsh Nagar Delhi,AHO,Adarshnagar,ADD,Adas Road,ADVI,Adavali,AEX,Adderi H,AAR,Adesar,ABZ,Adgaon Buzurg,ADTL,Adhartal,ACN,Adhichchanur,ADQ,Adhikari,AHZ,Adhinpur,AKNR,Adhyatmik Nagar H,ADST,Adi Saptagram,ADHL,Adihalli,ADB,Adilabad,ADF,Adina,AI,Adipur,ADTP,Adityapur,AYM,Adiyakkamungalam,AD,Adoni,ADRA,Adra Jn,AJM,Adraj Moti,ADT,Aduturai,AGM,Agaram Sibbandi,AGP,Agarpara,AGTL,Agartala,AGAS,Agas,AGD,Agasod,AGTR,Agauthar H,AWP,Aghwanpur,AGMN,Agomoni,AGY,Agori Khas,AGC,Agra Cantt,AGA,Agra City,AF,Agra Fort,AGAE,Agradwip,AGDL,Agran Dhulgaon,AUL,Agsauli,AGT,Agthori,AHLR,Ahalyapur F,AHQ,Ahera,AHD,Aherwadi H,AHM,Ahimanpur,AHN,Ahiran H,AHU,Ahirauli H,AHJU,Ahju,ANG,Ahmadnagar,AMP,Ahmadpur Jn,AHH,Ahmed Garh,ADI,Ahmedabad Jn,ADIJ,Ahmedabad Mg,ARW,Ahraura Road,AIG,Aigawan,AILM,Ailam H,AIRL,Airoli,ASH,Aishbagh,ASSH,Aishbagh Mg,AIT,Ait Jn,ATMO,Aithal,AYN,Aiyanapuram,AJR,Ajaibpur,AJK,Ajakollu,ANI,Ajanti,AZA,Ajara,AIA,Ajarka,AJ,Ajgain,AJH,Ajhai,AHL,Ajharail,AJIT,Ajit,AJTM,Ajit Gill Matta H,AJL,Ajitwal,AJP,Ajjampur,AII,Ajmer Jn,AJNI,Ajni,AJN,Ajnod,AKIP,Akaipur H,AKOR,Akalkot Road,AKT,Akaltara,AKE,Akanapet,AKZ,Akashi P H,AMY,Akathumuri H,AKJ,Akbar Ganj,AKN,Akbarnagar,ABP,Akbarpur Jn,ALNP,Akela Hanspur H,AKVD,Akividu,AKAT,Akkampet,API,Akkaraipatti,AKK,Akkihebbalu,AKY,Akkunti,AKD,Akodia,AK,Akola Jn,AKR,Akolner,AKW,Akona,AKOT,Akot,AKRA,Akra,AYRN,Akshaywat Rai Nagar,AKRD,Akurdi,ALAI,Alai,ALK,Alakkudi,ALAL,Alal,AMG,Alam Nagar,ALM,Alamanda,AMV,Alambagh Lucknow,ALMR,Alampur,ALPR,Alampur Road,LWR,Alanavar Jn,ALN,Alandi,ALP,Alapakam,AWL,Alawal Pur,AIH,Alawalpur Idrispur,APRH,Alehpur Halt,ALER,Aler,AWH,Alewahi,ALJ,Aliganj,ALJN,Aligarh Jn,AIR,Alindra Road,APD,Alipur Duar,APDC,Alipur Duar Court,APDJ,Alipur Duar Jn,ALB,Aliyawada,ALY,Allahabad City,ALD,Allahabad Jn,ALLP,Alleppey,AXR,Alluru Road,LMT,Almatti,ALMW,Almaw H,ALNI,Alniya,ATM,Altagram,AUB,Aluabari Road,AWY,Aluva (Alwaye),ALW,Alwal H,AWR,Alwar Jn,AWT,Alwar Tirunagari,AGZ,Amagura,AN,Amalner,AMLP,Amalpur,AML,Amalsad,X108,Aman Lodge,AMW,Aman Vadi,ASJP,Amar Saheed Jagdeo Prasad H,AVC,Amaravathi Colony,AMVA,Amaraviia,ARD,Amarda Road,AGR,Amargarh,AGL,Amargol,APJ,Amarpur Jorasi,APA,Amarpura,AMPR,Amarpura Rathan,AXA,Amarsar,ARNB,Amarun,AMS,Amausi,AADR,AmbAndaura,AGB,Ambagaon,UMB,Ambala Cantt Jn,UBC,Ambala City,AMPA,Ambalapuzha,ABLE,Ambale,APP,Ambapendarpur H,ABX,Ambari,ABFC,Ambari Falakata,ABH,Ambarnath,ASD,Ambasamudram,ABSA,Ambassa,ABU,Ambattur,ABI,Ambaturai,AAP,Ambiapur,AABH,Ambika Bhawani Halt,ABKA,Ambika Kalna,AMBR,Ambika Rohina H,ABKP,Ambikapur,ABE,Ambikeshwar,ABY,Ambivli,ABD,Ambli Road,UMN,Ambliyasan,AMB,Ambodala,AB,Ambur,UDR,Amdara,AMDI,Amdi,AME,Amethi,AGN,Amgaon,AGI,Amguri,ARH,Amhera H,AMD,Amila H,AMIN,Amin,AMGA,Amjonga,AMLA,Amla Jn,AMX,Amla Khurd H,AAL,Amlai,ALE,Amletha,AMLI,Amli,AMLO,Amlo,ALS,Amlori Sarsar,ANB,Ammanabrolu,AMPL,Ammapali,AMT,Ammapet,AMSA,Ammasandra,AMQ,Ammuguda H,ANQ,Amnapur,AMO,Amolwa,AONI,Amoni,AMI,Amravati,AE,Amreli,AEP,Amreli Para,AMC,Amritapura,ASR,Amritsar Jn,AVL,Amritvel,AMRO,Amroha,AMZ,Amta,AKP,Anakapalle,ANKI,Anakhi,ANND,Anand Jn,ANDN,Anand Nagar Jn,ANVR,Anand Vihar H,ANVT,Anand Vihar Term,ANF,Anandapuram H,ANP,Anandatandavapuram,ANSB,Anandpur Sahib,ANU,Anangur,ATP,Anantapur,ANE,Anantarajupet,ANT,Anantnag,AEH,Anantpaith,APT,Anaparti,ANR,Anara,ANAS,Anas,ANW,Anaval,AVN,Anavardikhanpettai,ACL,Ancheli,ANCR,Anchuri P H,UDL,Andal Jn,AND,Andampallam,APE,Andanapettai,ADH,Andheri,ADL,Andul,AEK,Anekal Road,ANGR,Angadgeri H,AGCI,Angadi,AAM,Angadipuram,AGE,Angai H,AKU,Angalakuduru,AFK,Angamali,AAG,Angar,ARG,Angar Ghat,ANJE,Angarpathra H,AGV,Angua P H,ANGL,Angul,ANJ,Anjangaon,ANO,Anjani,AJE,Anjar,AJI,Anji Shahabad,ANK,Ankai,ALV,Anklav,AKV,Ankleshwar Jn,AKVU,Ankleshwar Udyognagar,ANKL,Ankola,ANH,Ankorah Akorha,AKS,Ankuspur,ANNR,Annanur,ANV,Annavaram,ANC,Annechakanahalli H,NGR,Annigeri,ANPR,Anpara,ATH,Antah,ARI,Antri,ANTU,Antu,AUBR,Anugrah Narayan Road,APG,Anupganj,APH,Anupgarh,APB,Anuppambattu,APR,Anuppur Jn,AO,Aonla,APL,Appikatla,APTA,Apta,APRD,Apurva Ph,ARA,AraJn,ABGT,Arabagatta H,ARAG,Arag,AJJ,Arakkonam,ARK,Araku,ARGP,Aralaguppe H,AAY,Aralvaymoli,AMBG,Arambag,AKM,Arambakam,ARN,Arand,ANMD,Arang Mahanadi,AG,Aranghata,AON,Araon,ARR,Arariya,ARQ,Arariya Court,ARU,Arasalu H,ARL,Araul Makanpur,AVRD,Aravali Road,AVLI,Aravalli,AVK,Aravankadu,ARX,Areli H,ARPL,Arepalli H,AOR,Argora P H,ARGL,Argul Ph,ARGD,Arigada,ALU,Ariyalur,AS,Arjansar,ARNH,Arjunahalli H,AJU,Arjuni,ARKA,Arkha H,AEJ,Arnej,ARE,Arnetha,ARV,Arni Road,ARNA,Arniya,AROR,Aroor,ASI,Arseni,ASK,Arsikere Jn,AKAH,Artalakatta,ATC,Arts College,ANY,Arumuganeri,ARNG,Arun Nagar H,APK,Aruppukkottai,ARVI,Arvi,AFR,Asafpur,JOB,Asalpur Jobner,ASAN,Asan,ASB,Asanboni,ASO,Asangaon,ASN,Asansol Jn,AST,Asaoti,AAS,Asaranada,ASM,Asarma,ASV,Asarva Jn,ASE,Asaudah,AQG,Ashapura Gomat,ASKN,Ashok Nagar,AP,Ashokapuram,ASKR,Ashoknagar Road,AHI,Ashti,ASAF,Asifabad Road,AGQ,Asirgarh Road,ANA,Aslana,ASL,Aslaoda,ASLU,Aslu,AT,Asnoti,AXK,Asokhar,ASP,Aspari,ASAR,Asra Halt,ASTG,Astegaon,ABO,Asthal Bohar,AV,Asvali,AWM,Aswapuram,ATA,Ata,AMA,Atamanda,ATT,Atari Jn,AA,Ataria,ATE,Atarra,AEL,Ateli,ATG,Atgaon,ATL,Athmal Gola,ASCE,Athsarai,ATDA,Atladara,ARP,Atrampur,AUR,Atrauli Road,ATRR,Atraura H,ATRU,Atru,ATS,Attabira,ATR,Attar,AL,Attili,AIPP,Attipattu Pudu Nagar H,AIP,Attippattu,ATU,Attur,ATUL,Atul,ATKS,Atwa Kursath,ATW,Atwa Muthia H,AJRE,Aujuri,AED,Aulenda,AUNG,Aung,ANGM,Aungaridham H,OND,Aunlajori Jn,ARJ,Aunrihar Jn,ANAH,Aunta H,AUI,Aurahi F,AUN,Aurang Nagar,AWB,Aurangabad,OSA,Ausa Road,AVS,Auvaneeswarem,AUWA,Auwa,AVD,Avadi,AVT,Avatihalli H,AVH,Avidha,AWG,Awa Garh,ATPA,Awantipura,AWPR,Awapur F,AWS,Awasani,ATNR,Awatarnagar F,AYD,Ayandur,AY,Ayodhya,APN,Ayodhyapattanam,AYR,Ayyalur,AZP,Ayyampet,AMH,Azamgarh,AZR,Azamnagar Road,AZK,Azhwarkurichi,AZ,Azimganj,ACLE,Azimganj City,BEML,B E M L Nagar H,BAD,Baad,BBKR,Baba Bakala Raiya,BBLK,Baba Lakshman Das Puri H,BBJ,Babaganj,BBDE,Babarpur,BTP,Babatpur,BAHN,Babhabgaon H,BNGY,Babhanjyotiya H,BV,Babhnan,BBV,Babhulgaon,BAB,Babina,BBD,Bablad,BBA,Babrala,BBO,Babugarh,BUPH,Babupeth,BBPR,Babupur H,BCHR,Bachar,BCHL,Bacheli,BCPR,Bachharpur Halt,BCN,Bachhrawn,BCA,Bachwara Jn,BDBA,Badabandha,BDKT,Badakhandiaita,BDPA,Badalpur P H,BDM,Badami,BMPR,Badampahar,BPY,Badampudi,BDGP,Badanaguppe H,BDPG,Badapadagaon Ph,BDWS,Badarwas,BEM,Badaun,BUS,Badausa,BWZ,Baddowal,BDXX,Bade Arapur,BDHA,Badhada,BDBG,Badhai Balamgarh H,BDHL,Badhal,BHK,Badhari Kalan,BDZ,Badkulla,BHB,Badla Ghat,BUD,Badlapur,BHD,Badli,BUDM,Badmal,BDU,Badnapur,BD,Badnera Jn,BDDR,Badodar,BNZ,Badshahnagar,BSE,Badshahpur,BLPR,Badulipar,BWS,Badwasi,BGDI,Bagadia Ph,BUG,Bagaha,BCJ,Bagaha Bishnupur,BGHI,Bagahai Road,BGA,Bagalia,BGK,Bagalkot,BGRR,Bagarpur H,BGBR,Bagbahra,BEH,Bagdihi,BGPA,Bageshapura,BGWD,Bagewadi H,BBR,Bagh Bazar,BGJT,Bagha Jatin F,BGH,Baghauli,BORA,Baghdogra,BBE,Baghi Bardiha,BFX,Baghi Ghauspur,BHMA,Baghmara H,BGRA,Baghnapara,BHKH,Baghoikusa,BJQ,Baghora,BPM,Baghpat Road,BGPL,Baghuapal,BGF,Bagila,BMA,Bagmar,BZN,Bagnan,BGTA,Bagra Tawa,BRQ,Bagrakot,BQN,Bagri Nagar,BGX,Bagri Sajjanpur,BFG,Bagthar,BGL,Bagula,BGMR,Bagumra,BAGD,Bagwada H,BWB,Bagwali,BSS,Bahadur Singh Wala,BGZ,Bahadurgarh,BPD,Bahadurpur Bengal,BHDH,Bahadurpur UP,BYQ,Bahai H,BDO,Bahalda Road,BNBR,Bahanaga Bazar,BARU,Baharu F,BFE,Bahawal Basi,BFV,Bahelia Buzurg H,BHI,Baheri,BRWH,Baherwa H,BIP,Bahilpurwa,BAHW,Bahir Khanda,BHKA,Bahira Kalibari,BHGH,Bahirgachhi H,BHPA,Bahirpuya H,BJ,Bahjoi,BWX,Bahman Diwana,BVW,Bahmniwala,BHCL,Bahora Chandil,BRK,Bahraich,BHM,Bahram,BURA,Bahuara(Halt),BBPM,Baiabhadrapuram H,BBAE,Baidyabati,BDME,Baidyanathdham,BGUA,Baiguda,BIZ,Baihata,BATL,Baihatola,BJMR,Baijnath Mandir,BJPL,Baijnath Paprola,BYP,Baijnathpur,VDNP,Baijnathpur Andoli H,BKTH,Baikunth,BRH,Baikunthpur Road,BRHT,Bailey Road H,BOI,Bainchi,BCGM,Bainchigram,BIH,Bairagarh,BGU,Bairagnia,BRIH,Bairi Halt,BSWA,Baiswara,BALR,Baitalpur,BTV,Baitarni Road,BYPL,Baiyyappanahalli,BAJE,Bajakare H,BLA,Bajalta,BJKN,Bajekan,BJT,Bajpatti,BJG,Bajranggarh,BRGP,Bajrangpura,BJUD,Bajud,BJW,Bajva,BKNA,Bakaina H,BAKL,Bakal,BQE,Bakanian Bhaunri,BKKI,Bakarkudi,BKPR,Bakaspur,BKWA,Bakayanwala,BQQ,Bakhleta,BKTS,Bakhoti Khas H,VKD,Bakhrabad,BKHR,Bakhri,BKSA,Bakhsha,BKP,Bakhtiyarpur Jn,BKKS,Bakkas,BK,Bakra Road,BKRL,Bakrol,BKT,Bakshi Ka Talab,BKTL,Baktal,BQT,Baktarnagar,BKLE,Bakudi,BKLA,Bakulha,BLRD,Bala Road,BGAE,Balagarh,BTC,Balaghat Jn,BLHR,Balahapur H,BLM,Balamau Jn,BABR,Balanagar,BLGR,Balangir,BNRD,Balangir Road,BLPE,Balapalle,BRAM,Balaramapuram,BLAE,Balarambati,BLRG,Balasiring,BLS,Balasore,BLDK,Balauda Takun,BLW,Balawali,BALE,Bale,BGV,Balegundi Halt,BAHI,Balenahalli,BLR,Balganur,BGNA,Balgona,BPQ,Balharshah,BAE,Baliakheri,BCK,Balichak,BKS,Balikotia,BTZ,Balimara,BVU,Balipara,BVH,Ballabgarh,BQZ,Ballalpore H,BLDL,Balle Da Pir Larath,BLKR,Ballekere H,BLLI,Balli,BUI,Ballia,BAPR,Ballupur F,BLY,Bally,BLYG,Bally Ghat,BLYH,Bally H,BLN,Ballygunge Jn,BXA,Balod,BLT,Balotra Jn,BPRH,Balpur,BBL,Balrai,BLP,Balrampur,BLSD,Balsamand,BALU,Balugaon,BLGT,Balurghat,WAB,Balwa,BAWA,Balwara,BMG,Bamangacchi,BMGR,Bamangram,BXT,Bamanhat,BMHR,Bamanheri,BMNI,Bamani,BMNL,Bamanwali,BMW,Bamhani,BIV,Bamhni Banjur,BMU,Bamhrauli,BMLL,Bamla,BMI,Bamnia,BMZ,Bamour Gaon,BMB,Bamra,BMSN,Bamsin,BMGN,Bamunigaon,BAMR,Bamur,BNK,Bana Shankari H,BNHR,Banabihari Gwalipur Ph,BYN,Banahi,BPF,Banapura,BNO,Banar,BNQ,Banarhat,BNS,Banas,BSN,Banasandra,BNLW,Banasthali Niwai,BAND,Banaswadi,BVR,Banavar,BNSA,Banbasa,BNCR,Banchari,BAHP,Band Hamirpur,BNDA,Banda Jn,BNU,Bandakpur,BDW,Bandanwara,BAAR,Bandar Ph,BDPL,Bandarupalli,BDC,Bandel Jn,BR,Bandh Baretha,BNTH,Bandhnath,BNF,Bandhua,BDKN,Bandhua Kalan,BKI,Bandikui Jn,BA,Bandra Jn,BDTS,Bandra Terminus,BSW,Baneswar,BXB,Banga,BGAN,Bangain,BJY,Bangalbaree,BNC,Bangalore Cant,SBC,Bangalore City Jn,BNCE,Bangalore East,BNJ,Bangaon Jn,BWT,Bangarapet Jn,BGAR,Bangari,BGMU,Bangarmau,BNLS,Bangi Nihal Singh,BGY,Bangriposi,BOD,Bangrod,BNGM,Bangurgram,BGKA,Bangurkela,BANI,Bani,BAHL,Banihal,BSDA,Baniya Sanda Dhora,BAKA,Banka,BKG,Banka Ghat,BCF,Bankapasi F,BTK,Bankata,BNKJ,Bankeganj,BKH,Bankhedi,BNKA,Bankimnagar H,BKNM,Bankra Nayabaz,BQA,Bankura,BNKI,Banmankhi Jn,BAO,Banmore,BNA,Banni Koppa,BMPT,Banni Mahammanpatti H,BANO,Bano,BASA,Banosa,BPS,Banpas,BPN,Banpur,BSDR,Bansadhara Ph,BCD,Bansdih Road,BSAE,Bansh Baria,BSBR,Banshlai Bridge,BYE,Bansi Bohera,BIQ,Bansi Paharpur,BNSL,Bansinala H,BSQP,Bansipur,BZS,Bansjora,BSKO,Banskho,BSPX,Banspani,BNB,Banstola Ph,BGG,Banta Raghunathgarh,BLL,Bantanahal,BNTL,Bantawala,BTRA,Banthra,BWC,Banwali,BOTI,Baori Thikria,BAF,Bap,BPP,Bapatla,BMKI,Bapudham Motihari,BAR,Bar,BRLF,Bar Longfer,BBAR,Bara,BBK,Bara Banki Jn,BAGL,Bara Gopal,BGD,Bara Gudha,BPJ,Bara Hapjan,BJMD,Bara Jamada,BRM,Barabambo,BBI,Barabani,BBHT,Barabar H,BFF,Barabhati,BBM,Barabhum,BCQ,Barachak,BRDV,Baradev,BUA,Baradwar,BNM,Baragaon,BHLE,Barahat H,BRHU,Barahu,BJLP,Barai Jalalpur,BRGM,Baraigram Jn,BAPN,Baraipura H,BQW,Barakalan,BRR,Barakar,BARL,Baral,BAA,Barala,BRMT,Baramati,BRML,Baramulla,BAZ,Baran,BARN,Baranagar Road,BRAG,Barang,BRPS,Barapalasi,RAA,Barara,BRRZ,Barara Buzurg,BT,Barasat Jn,BUJ,Barauni F,BJU,Barauni Jn,BTU,Baraut,BMHT,Baraw More,BRLA,Barayala Chaurasi,BBTR,Barbatpur,BBDA,Barbenda,BBN,Barbil,BCRD,Barchhi Road,BRDB,Barda,BWN,BarddhamanJn,BDHT,Bardi,BIY,Bardoli,BC,Bareilly City,BE,Bareilly Jn,BJD,Barejadi Nandej,BQM,Barelipar,BRZ,Bareta,BET,Bareth,BAC,Bargachia,BGLI,Bargalia,BRGJ,Bargaon Gujar,BRG,Bargarh,BRGA,Bargarh Road,BRGW,Bargawan,BUQ,Bargi,BARH,Barh,BHJ,Barhaj Bazar,BRN,Barhan Jn,BHAD,Barhapur H,BAKT,Barhara Kothi F,BAGJ,Barharaganj,BHW,Barharwa Jn,BRYA,Barhiya,BNY,Barhni,BARI,Bari,BBMN,Bari Brahman,BI,Bari Sadri,BUP,Bariarpur,BPO,Baripada Ph,BRPM,Baripur Mandala,BPRA,Baripura,BRTG,Barithengarh Ph,BRW,Bariwala,BADK,Barka H,BRKA,Barka Kana,BKA,Barkhera,BICI,Barkichanpi,BRKP,Barkipona,BSYA,Barkisalaiya,BKJ,Barkur,BLAX,Barlai,BLNG,Barlanga,BRMA,Barmasia,BME,Barmer,BNG,Barnagar,BNN,Barnala,BOF,Barog,BRPL,Barpali,BXP,Barpathar,BPRD,Barpeta Road,BZB,Barra Bazar,BP,Barrackpore,BJR,Barrajpur,BYS,Barsali,BSY,Barsathi,BSQ,Barsi Takli,BTW,Barsi Town,BOE,Barsoi Jn,BZO,Barsola,BXF,Barsuan,BRTA,Bartara H,BBGN,Barua Bamungaon,BRCK,Barua Chak,BRNR,Barua Nagar,BRUD,Barud,BRPA,Barui Para,BRP,Baruipur Jn,BUE,Baruna,BNDI,Barundani,BAV,Baruva,BRSA,Barwa Kalan H,BWR,Barwa Sagar,BRWD,Barwadih Jn,BWW,Barwaha,BXC,Barwala,BRL,Barwala Road,BYHA,Barya Ram,BRHL,Baryal Himachal,BZY,Basai,BDXT,Basai Dhankot,BSPL,Basampalle,BSTP,Basantapur,BSX,Basar,BSRX,Basavana Bagevadi Road,BSI,Basbari,BED,Baseri,BZE,Baseria,BTG,Basharatganj,BSKR,Basi Kiratpur,BBQ,Basin Bridge Jn,BSHT,Basirhat,BSCP,Baskatwa B H,BMF,Basmat,BANE,Basni,BAI,Bassi,BSSL,Bassi Berisal,BSPN,Bassi Pathanan,BTS,Basta,BST,Basti,BTRO,Bastoi H,BSCK,Basuchak H,BDBP,Basudebpur H,BDUA,Basudeopur Chandail H,BSGN,Basugaon,BSKH,Basukinath,BSD,Basuldanga,BYSA,Basulya Sutahata,BU,Baswa,BTDR,Batadrawa Road,BAT,Batala Jn,BATM,Batala Sugar Mills,BTSI,Batasi,BSLE,Bataspur,BTKB,Bathna Krittibas H,BTF,Bathnaha,BHBR,Bathua Bazar Halt,BTM,Battulapuram H,BTVA,Batuva Ph,BUDR,Baudpur,BVA,Bauria Jn,VLA,Bavla,BWL,Bawal,BWK,Bawani Khera,BAOL,Bawli H,BAYD,Bayad,BYO,Bayaluvaddigeri,BXN,Bayana Jn,BUT,Baytu,BVM,Bayyavaram,BZLE,Bazarsau,BZJT,Bazida Jatan,BPZ,Bazpur,BEAS,Beas Jn,BER,Beawar,BEE,Bebejia,BHWA,Bechhiwara,BHRJ,Bechraji,BVV,Bedetti,BEDM,Bedham,BMT,Begampet,BPAE,Begampur,BGWI,Begdewadi,BGS,Begu Sarai,BKDR,Begunkodar,BHHZ,Behta Hazipur,BEG,Behtagokal,BHLA,Behula,BJN,Bejnal,BFR,Bekal Fort,BELA,Bela,BTX,Bela Tal,BLGA,Belagula,BLK,Belakoba,BPA,Belampalli,BZL,Belanagar,BLNK,Belanki,BAP,Belapur,BEPR,Belapur C B D,BLSR,Belaser,BEX,Belboni Ph,BLDA,Belda,BEB,Beldanga,BQY,Belerhat,BIG,Belgahna,BGM,Belgaum,BLH,Belgharia,BYL,Belha,BGRD,Beliaghata Road,BZC,Beliator Ph,BELD,Belkhera,BMKD,Bellamkonda,BYC,Bellary Cantt,BAY,Bellary Jn,BMAE,Belmuri,BPH,Belpahar,BXM,Belrayan,BLRE,Belsiri,BLSN,Belsonda,BLTR,Belthara Road,BEQ,Belur,BRMH,Belur Math,BWD,Belvandi,BENL,Benal H,BPE,Benapur,BFQ,Bendi,BEJ,Beniganj,BNPT,Benipatti Pirapur,BPGR,Benipurgram H,BS,Benisar,BEHI,Bennehalli,BNOD,Benoda,BBDB,Benoy Badal Dinesh Bag,BEHR,Beohari,BRNA,Berawanya,BCH,Berchha,BPC,Berhampore Court,BRDT,Beria Daulat H,BRMO,Bermo,BERO,Bero,BROR,Berore Halt,BUGM,Berugram,BSRL,Besroli,BMH,Betamcherla,BEW,Betavad,BTPG,Betberia Ghola H,BYXA,Betgara,BTPD,Bethampudi,BTY,Bethuadahari,BTQ,Betnoti Ph,BTGH,Bettadnagenhalli H,TLS,Bettahalsoor H,BTH,Bettiah,BZU,Betul,BTRB,Betur Ph,BNL,Bevinahalu,BWBN,Bewar Bhojan,BAH,Bhabhar,BFT,Bhabta,BBU,Bhabua Road,BCOB,Bhachau,BBC,Bhachhbar,BVB,Bhad Bhada Ghat,BDIN,Bhadaiyan,BDN,Bhadan,BUU,Bhadanpur,BWH,Bhadaura,BBAI,Bhadbhunja,BADR,Bhader,BDI,Bhadli,BOY,Bhadohi,BDCR,Bhadrachalam Road,BHC,Bhadrakh,BDRN,Bhadran,BDVT,Bhadravati,BHR,Bhadreshwar,BHDR,Bhadri,BBY,Bhadroli H,BDKE,Bhadsivni,BUTA,Bhadutala,BDWA,Bhadwabara,VAA,Bhaga Jn,BGP,Bhagalpur,BGKT,Bhagat Ki Kothi,BGR,Bhagdara,BAGA,Bhagega,BHGP,Bhagirathpur H,BSGR,Bhagsar,BGTN,Bhagtanwala,BQG,Bhagwangola,BNR,Bhagwanpur,BGDS,Bhagwanpur Desua,BGPR,Bhagwanpura,BNSR,Bhagwansar,BALI,Bhaili,BZK,Bhaini Khurd,BSA,Bhainsa,BASN,Bhainswan,BNKH,Bhairanayakanahalli H,BOG,Bhairongarh,BIF,Bhaironpur,BHTH,Bhairopatti H,BJRA,Bhajera,BKPT,Bhakarapeta,BHKL,Bhakrauli,BKNG,Bhaktinagar,BAJ,Bhalej,BHLK,Bhalki,BLJA,Bhalojala H,BFM,Bhalui,BKRD,Bhaluka Road,BLMR,Bhalukmara,BUL,Bhalulata,BLMK,Bhalumaska,BLNI,Bhalwani,BAK,Bhan Kari,BNP,Bhanapur,VNN,Bhanaur,BHA,Bhandai,BUX,Bhandak,BRD,Bhandara Road,BHME,Bhandaridan,BFZ,Bhandartikuri,BNWD,Bhandewadi H,BHU,Bhandu Motidau,BND,Bhandup,BMVR,Bhaner Minawada,BNGL,Bhangala,VZR,Bhanjpur,BNQL,Bhankala H,BKD,Bhankoda,BQH,Bhanohad Punjab,BHNS,Bhansi,BNVD,Bhanvad,BHTK,Bhanwar Tonk,BRKB,Bharat Khand,BTKP,Bharat Kup,BARJ,Bharatgarh,BTKD,Bharatkund,BTNR,Bharatnagar,BTE,BharatpurJn,BWRA,Bharatwada,BRMR,Bharmar,BHRL,Bharoli,BSDL,Bharsendi,BRTL,Bharthali,BNT,Bharthana,BH,Bharuch Jn,BZ,Bharur H,BSZ,Bharwa Sumerpur,BRE,Bharwari,BSLA,Bhasila,BMM,Bhaskarapara,BANL,Bhatangli,BYT,Bhatapara,BTRH,Bhatar H,BHTS,Bhatasa H,BHTL,Bhatel,BOV,Bhatgaon,BHAL,Bhatiel,BTIC,Bhatinda Cantt,BTI,Bhatinda Jn,BTSD,Bhatisuda,BHTA,Bhatiya,BTJL,Bhatkal,BTT,Bhatni Jn,BHG,Bhaton Ki Gali,BHTR,Bhatpar Rani,BHAT,Bhatpura,BATS,Bhatsar,BTTN,Bhattian,BQU,Bhattiprolu,BHT,Bhattu,BPU,Bhaupur,BVP,Bhavanagar Para,BVNR,Bhavani Nagar,BVC,Bhavnagar Terminus,BWM,Bhawani Mandi,BWIP,Bhawanipatna,BWPB,Bhawanipur Bihar,BWP,Bhawanipur Kalan,BCW,Bhawi,BYR,Bhayandar,BHY,Bhayavadar,BHNA,Bhayna H,BDH,Bhedia,BXL,Bheduasol,BIPR,Bheempura,BEP,Bheerpur,BHJA,Bheja,BSWD,Bhemswadi,BRGT,Bheraghat,BFY,Bhesana,BILA,Bheslana,BHET,Bhestan,VTG,Bhetaguri,BETI,Bhetasi,BGVN,Bhigvan,BKC,Bhikamkor,BKF,Bhikhna Thori,BKU,Bhiknur,BLD,Bhilad,BIA,Bhilai,BPHB,Bhilai Power House,BQR,Bhilainagar,BVQ,Bhilavadi,BLDI,Bhildi Jn,BHGN,Bhilgaon,BILP,Bhilupur,BHL,Bhilwara,BMD,Bhimadolu,BIML,Bhimal,BMC,Bhimalgondi,BMN,Bhimana,BMQ,Bhimarlai,BMSB,Bhimasar,BVRM,Bhimavaram Jn,BVRT,Bhimavararn Town,BMGA,Bhimgara Jn,BMKJ,Bhimkhoj,BNH,Bhimnath,BMRN,Bhimrana,BZM,Bhimsen,BIX,Bhind,BNNR,Bhindar,BWA,Bhinwaliya,BIK,Bhira Kheri,BRI,Bhiringi,BHSA,Bhisa H,BTO,Bhitaura,BYH,Bhiti,BHTN,Bhitoni,BIRD,Bhivandi Road,BVS,Bhivpuri Road,BNWC,Bhiwani City,BNW,Bhiwani Jn,BWV,Bhiwapur,BDMJ,Bhodwal Majri,BOP,Bhogpur,BPRS,Bhogpur Sirwal,BHOJ,Bhoj Padra,BPR,Bhojipura Jn,BOJ,Bhojo,BHAS,Bhojras,BJE,Bhojudih Jn,BOKR,Bhokar,BOKE,Bhoke,BLME,Bholidih,BHV,Bhoma,BHNE,Bhone,BGQ,Bhongaon,BG,Bhongir,BON,Bhonra,BPL,Bhopal Jn,BPKA,Bhopalka,BFPA,Bhopatpur,BFJ,Bhoras Budrukh,BRTK,Bhortex,BCB,Bhowra Bh,BHAN,Bhoyani,BHUA,Bhua,BBS,Bhubaneswar,BCU,Bhuchchu,BUDA,Bhuda,BDHP,Bhudpur,BPK,Bhugaon,BHUJ,Bhuj,BHLP,Bhulanpur F,BHN,Bhuli,BLO,Bhulon,BEF,Bhupadeopur,BSJ,Bhupalsagar Karera,VPO,Bhupia Mau,BUGN,Bhurjiha Baragaon H,BHKD,Bhurkunda,BSDP,Bhusandpur,BSL,Bhusaval Jn,BUBR,Bhutakiya Bhimasar,BTSR,Bhuteshwar,BHRH,Bhuyar,BBLA,Bhyabla,BNAA,Bibhuti Bhushan H,BN,Bibinagar Jn,BIC,Bichia,BCP,Bichpuri,BID,Bidadi,BDNP,Bidanpur,BIDR,Bidar,BNXR,Bidhannagar Road,BDYR,Bidyadabri,BDYP,Bidyadharpur F,BIGA,Bigga,BGRM,Biggabas Ramsara,BQP,Bighapur,BRU,Bihairoganj,BEHS,Bihar Sharif,BHGJ,Bihariganj,BEHT,Bihat H,BEA,Bihiya,BTA,Bihta,BJNR,Bijainagar,BJPR,Bijaipur Road,BJP,Bijapur,BJI,Bijauli,BJV,Bijauria,VST,Bijaysota,BJBA,Bijbiara,BJF,Bijni,BJO,Bijnor,BIJR,Bijoor,BJK,Bijora,BJA,Bijrotha,BJIH,Bijuli H,BJRI,Bijuri,BWSN,Bijwasan,BKN,Bikaner Jn,BVL,Bikkavolu,BKNO,Biknaph,XBKJ,Bikramganj,BMR,Bikrampur,BKSL,Bikramshila,BARA,Bilara,BSP,Bilaspur Jn,BLQR,Bilaspur Road,BILD,Bildi,BLWR,Bileshwar,BZG,Bilga,BLG,Bilhar Ghat,BLU,Bilhaur,BIM,Bilimora Jn,BILK,Bilkha,BXLL,Billi,BFP,Bilochpura Agra,BLPU,Bilpur,BWI,Bilwai,BUF,Bimalgarh Jn,BNBA,Biman Bandar,BMBE,Bimbari H,BINA,Bina Jn,VNK,Binaiki,BNAR,Binaur,BUR,Bindaura,BDYK,Bindayaka,BKO,Bindki Road,BDBS,Bindubasini,BKTB,Bindukuri,BNJL,Binjhol,BNV,Binnaguri,BIR,Bir,BIRA,Bira,BDWL,Biradhwal,BRBL,Birahalli H,BAMA,Birambad,BRMD,Biramdih,BMK,Birang Khera,BRPT,Birapatti,BIRP,Birarajpur,BRRI,Birari,BBT,Birati,BIRL,Biraul,BRBS,Birbans,BLNR,Birlanagar,BRMP,Birmitrapur,BIJ,Birnagar,BEO,Birohe,BRLY,Biroliya,BIB,Birpur,BRST,Birpurusothampur,BSMH,Birshamunda Halt,BSBP,Birshibpur,BRS,Birsinghpur,BRA,Birsola,RRB,Birur Jn,BSUR,Bisalpur,BIWK,Bisalwas Kalan,BSM,Bisanattam,BRKH,Bisapur Kalan,BHNP,Bishanpur Halt,BSPH,Bishanpur Haryana,BRPK,Bisharpara Kodaliya,BISH,Bishengarh,BEU,Bisheshwarganj,BTJ,Bishnath Ganj,VSU,Bishnupur,BSPR,Bishrampur,VSPR,Bisnupriya H,BZR,Bisra,BMCK,Bissamcuttack,BUB,Bissau,BGSF,Bisugirsharif,BIS,Biswa Bridge,BVN,Biswan,BTHL,Bithauli F,BTTR,Bitragunta,BTRI,Bitroi,BW,Biwai,BRRG,Biyavra Rajgarh,BHBV,Block Hut B,BOBS,Bobas,VBL,Bobbili Jn,BCHN,Bochasan Jn,BBW,Bodarwar,BDVR,Boddavara,BDE,Bodeli,BDHN,Bodhan,BHBK,Bodhani Bujrug,BDWD,Bodwad,BVO,Bogolu,BGO,Bogri Road,BHLI,Bohali,BNE,Bohani,BONA,Boinda,BOR,Boisar,BJWS,Bojawas,BXJ,Bokajan,BKSC,Bokaro Steel City,BKRO,Bokaro Thermal,BOKO,Boko,BLX,Bolai,BMO,Bolarum,BOZ,Bolarum Bazar,BLC,Bolda,BLND,Bolinna Doaba,BHP,Bolpur Shantiniketan,BLSA,Bolsa,BLWD,Bolwad,BOM,Bomadra,BOMN,Bommagundanakere,BUM,Bommasamudram H,BQI,Bommidi,BKL,Bonakalu,BNDM,Bondamunda Jn,BNGN,Bongaigaon,BDAG,Bonidanga,BXO,Boparai H,BRBD,Borabanda,BRKY,Boraki H,BOW,Borawar,BXY,Bordhai,BIO,Bordi,BRRD,Bordi Road,BDT,Bordubi Road,BGN,Borgaon,BFD,Borhat,BRB,Boribial,BRND,Boridand Jn,BII,Boridra,BVI,Borivali,BOK,Borkhedi,BOT,Boroti,BGHU,Borraguhalu,BO,Borsad,BTL,Bortalao,BRVR,Borvihir,BTD,Botad Jn,BWCN,Bowaichandi Ph,BXHT,Boxirhat,BRJ,Brace Bridge,BJL,Brahmajan,BMGM,Brahmanagudem H,BRMI,Brahmani Ph,BMPL,Brahmanpalli,BAM,Brahmapur,BRJN,Brajarajnagar,BMP,Bramhapuri,BRSQ,Brar Square,BKRH,Brij Kishor H,BINR,Brij Nagar,BMJ,Brijmanganj,BDPR,Brindabanpur Ph,BXQ,Brundamal,BUBT,Buda Bharthara H,BAL,Budalur,BDY,Buddireddipatti,BDGM,Budgam,BGB,Budge Budge,BKDE,Budha Khera,BPKH,Budha Pushkar Halt,BDPK,Budhapank,BCYN,Budhdevchak Yadav Nagar,BDHY,Budhi,BLZ,Budhlada,BDMA,Budhma,BDSW,Budhsinghwala,BNI,Budni,BDQ,Budora,BDVL,Budvel,BEY,Bugganapalle Cement Nagar,BUGY,Bugia,BUGL,Buglanwali,BSC,Bulandshahr,BBCE,Bulbulchandi,BHX,Bulluana,BUDI,Bundi,BEK,Bundki,BNDP,Buniyadpur,BWO,Buramara,BRGL,Burgula H,BAU,Burhanpur,BUH,Burhar,BPW,Burhpura,BUW,Burhwal Jn,BJMA,Burj Mohar,BRMX,Burmi H,BURN,Burnpur,BTR,Butari,BWF,Butewala,BTBR,Buti Bori,BXR,Buxar,BYD,Byadgi,BDRL,Byadrahalli,BFW,Byatrayanahalli,BY,Byculla,BYY,Byree,KOP,C Sahumaharaj T Kolhapur,CM,Campierganj,CNO,Cancona,CDBH,Candrabanda H,CS,Cannanore South,CG,Canning,CSM,Cansaulim,CQS,Capper Quarry,CRX,Carron,CLR,Castle Rock,CV,Cauvery,CVB,Cavalry Barracks,CHB,Chabua,CBK,Chachaura Binaganj,CHCR,Chacher,CHAF,Chaf H,CU,Chagallu,CBSA,Chaibasa,CHAH,Chailaha H,CNPR,Chainpur,CW,Chainwa,CJW,Chajawa,CJL,Chajli,CKLA,Chak Banwala,CKA,Chak Pakhewala,CRWL,Chak Rakhwal,CSR,Chak Sikandar,CKH,Chakand,CKP,Chakaradharpur,CHBT,Chakarbhatha,CPL,Chakarlapalli,CKK,Chakarpur H,CDH,Chakdaha,CKDL,Chakdayala,CHK,Chakeri,CAA,Chakia,BTPH,Chakia Thermal H,CFG,Chakiting,CKLT,Chakkali Lai H,CKRD,Chakmakrand,CKYD,Chakra Road H,CAJ,Chakraj Mal,CKOD,Chakrod,CKSR,Chaksafaura H,CKS,Chaksu,CKU,Chakulia,CKX,Chakur,CKI,Chalakudi,CLC,Chalala,CMZ,Chalama,CLI,Chalgeri,CSN,Chalisgaon Jn,CKW,Chalkhowa,CHKE,Challakere,CLPE,Challavaripalle,CLD,Chalsa Jn,CHM,Chalthan,CMX,Chamagram,CMK,Chamak,CJR,Chamaraj,CMNR,Chamarajanagar,CMJ,Chamarajapuram,CMDG,Chamardighi,CPH,Champa Jn,CHT,Champahati,CJQ,Champajharan,CPN,Champaner Road Jn,CQR,Champapukur,EC09,Champapur H,CHU,Champion,CMR,Chamrola,CHRU,Chamrua,CAMU,Chamua F,CMMG,Chamunda Marg,CNKP,Chanakyapuri,CSMA,Chanasma Jn,CHC,Chanchal H,CCL,Chanchelav,CBX,Chand Bhan,CHBN,Chand Khira Bagan,CIC,Chand Pipar Halt,CAF,Chanda Fort,CNDN,Chandan,CGR,Chandan Nagar,CDNR,Chandanagar,CTPE,Chandanattop,CNPI,Chandanpahari,CDAE,Chandanpur,CNR,Chandar Goa,CNBI,Chandari,CDMR,Chandauli Majhwar,CNX,Chandauna H,CH,Chandausi Jn,CNL,Chandawal,CNJ,Chander Nagar H,CDRA,Chandera H,CNA,Chanderiya,CNDM,Chandi Mandir,CHD,Chandia Road,CDG,Chandigarh,CNI,Chandil Jn,CPE,Chandiposhi,CDS,Chandisar,CDK,Chandkheda Road,CLDY,Chandlodiya,CDI,Chandni Chandni Chauk Cba,CDD,Chandod,CNK,Chandok,CDP,Chandpara,CPS,Chandpur Siau H,CNRF,Chandra,CGI,Chandragiri,CGKR,Chandragiri Koppal H,CDGR,Chandrakona Road,CD,Chandrapur Maharashtra,CRP,Chandrapura Jn,CDSL,Chandresal,CXA,Chandsara H,CND,Chandur,CNDB,Chandur Bazar,CHTI,Chaneti,CGY,Changanaseri,CGLA,Changotola,CGS,Changsari,CHNN,Channani,CPT,Channapatna,CSDR,Channasandra,CX,Chanol,CAI,Chanpatia,CPK,Chaparmukh Jn,CPQ,Chaprakata,CHWT,Chaprawat H,CARD,Charadu,CGF,Charali,CJS,Charamula Kusumi,CRW,Charaud,CBT,Charbatia,CBG,Charbhuja Road,CRN,Charegaon,CWN,Charewan H,CRC,Charkhari Road,CKKD,Charkheda Khurd,CRK,Charkhera,CKD,Charkhi Dadri,CHZ,Charlapalli,CHAR,Charmal,CYR,Charni Road,CRQ,Charpokhari H,CHV,Charvattur,CAS,Chas Road Ph,CHJ,Chata,CTHT,Chatar,CATD,Chataud,CTR,Chatra,CHPT,Chatrapatti,CAP,Chatrapur,CAPC,Chatrapur Court Ph,CAT,Chattar Hat,CBH,Chaube,CBR,Chaubepur,CHBS,Chaubisi,CDB,Chaudhuribandh,CAZ,Chauhani,CHOK,Chauk,CHH,Chaukhandi,CKM,Chauki Man,CMU,Chaumahla,CNH,Chaunrah,CTZ,Chauntra Bhaterh,CUE,Chaupale,CUX,Chaura Bh,CAO,Chauradano,CRKR,Chaurakheri,CHBR,Chaure Bazar,CC,Chauri Chaura,CSA,Chausa,CROA,Chautara,CVD,Chavadipalayam,CVJ,Chavaj,CHLK,Chavalkhede,CHA,Chawapail,CGON,Chaygaon,CEL,Chebrol,CDBN,Chedhabanni H,CEM,Cheekategalapalem,CEME,Chegro,CGTA,Chegunta,CMC,Chemancheri,CMBR,Chembur,CGL,Chengalpattu Jn,CNGR,Chengannur,CGA,Chengel,MSB,Chennai Beach Jn,MAS,Chennai Central,MSC,Chennai Chetpat,MS,Chennai Egmore,MSF,Chennai Fort,MPK,Chennai Park,MPKT,Chennai Park Town,MCPK,Chepauk,CHPD,Cheppadu,SMD,Cheranmahadevi,CYN,Cheriyanad,CQA,Cherukara,CKV,Cherukuvada,CVV,Cheruvumadhavaram,CTQ,Chetar,CTND,Chettinad,CII,Chettiyarpatti,CAG,Chhabra Gugor,CHDX,Chhada,CHLR,Chhalesar,CHNR,Chhan Arorian,CDRL,Chhandrauli,CAER,Chhanera,CASA,Chhansara,CHHU,Chhanua,CHP,Chhapi,CAPA,Chhapra,CPR,Chhapra Jn,CI,Chhapra Kachehri,CIF,Chhapra Kachehri,CE,Chharodi,CHRA,Chharra,CATA,Chhata Aschaura H,CTJ,Chhataini,CJN,Chhatna,CTS,Chhatriput,CYI,Chhayapuri,CIA,Chheharta,COI,Chheoki,CGO,Chhidgaon,CHN,Chhina,CWA,Chhindwara Jn,CTW,Chhintanwala,CPDR,Chhipadohar,CTMP,Chhit Makhanpur,CAM,Chhota Ambona,COD,Chhota Gudha,CTD,Chhota Udepur,CKMI,Chhotaki Masaudhi H,CTKT,Chhoti Khatu,COO,Chhoti Odai,CCP,Chhuchhapura Jn,CLF,Chhulha,CNF,Chianki,CCK,Chichaki,CCO,Chicholi,CCBG,Chicholibuzurg H,CCD,Chichonda,CDM,Chidambaram,CCA,Chigicherla,CEU,Chiheru,CTH,Chikalthan,CIK,Chikasana,CBP,Chikballapur,BAW,Chikbanavar,CKHS,Chikhli,CIO,Chikhli Road,JRU,Chikjajur Jn,CMGR,Chikkamagalur,CKVD,Chikkandawadi H,CKNI,Chikni Road,CKR,Chikodi Road,CK,Chiksugur,CLU,Chilakalpudi,CIL,Chilbila Jn,CIH,Chilhia,CLDR,Chilikdara,CLKA,Chilka,CHR,Chilkahar,CLO,Chilo,CLVR,Chiluvur,CLW,Chilwariya,CMW,Chimalpahad,CMDP,Chimidipaili,CNC,Chinchli,CPD,Chinchpada,CHG,Chinchpokli,CCH,Chinchvad,CGV,Chingavanam,CNHL,Chink Hill,CJM,Chinna Ganjam,CHSM,Chinna Salem,CBU,Chinnababusamudram,CGHD,Chinnadagudihundi H,CIV,Chinnaravuru,CCI,Chinnekuntapalli,CPLE,Chinpai,MCPT,Chintadaripet,CKN,Chintakani,CMY,Chintamani,CLE,Chintapalli,CTPR,Chintaparru H,CHI,Chiplun,CPP,Chipurupalli,CYZ,Chipyana Buzurg,CHIB,Chirai,CID,Chiraidongri,CPBH,Chirailla Pauthu,CQL,Chirakkal H,CLX,Chirala,CRY,Chirayinkil,CGN,Chirgaon,CHRM,Chirmiri,CBN,Chit Baragaon,CTHR,Chitahra,CTL,Chital,CIT,Chitali,CTF,Chitgidda,CHIT,Chithari Halt,CHJC,Chitoda,CTA,Chitradurg,CKTD,Chitrakutdham Karwi,CTTP,Chitrapur H,CTT,Chitrasani,CTRD,Chitrawad,COE,Chitrod,CHTT,Chitta Halt,CT,Chittapur,CRJ,Chittaranjan,COR,Chittaurgarh,CTRE,Chitteri,CTO,Chittoor,CTYL,Chityala,CDL,Chodiala,CKE,Choki Sorath,CHL,Chola,CGH,Cholang,COM,Chomun Samod,CWI,Chondi,CJA,Chongajan,CPU,Chopan,CRL,Choral,CRND,Choranda Jn,CRE,Chorghat Piparia,CHRG,Chorgi H,CVR,Chorwad Road,CHUA,Chourari,CKB,Chouth Ka Barwara,CWR,Chouvara,CKG,Chowka Ghat,CWLE,Chowrigacha,CMP,Chromepet,CLKN,Chuchela Kalan H,CNS,Chuchura,CDA,Chuda,CRU,Chudawa,CWDA,Chuhriwala Dhanna,CHF,Chunabhatti,CAR,Chunar Jn,CBZ,Churaibari,CRG,Churaman Nagri,CHTL,Churaru Takarla,CCG,Churchgate,CRV,Chureb,CUK,Churk,CUR,Churu,CMA,Cinnamara,CBJ,Clutterbuckganj,CBE,Coimbatore Jn,CBF,Coimbatore North Jn,CLJ,Colonelganj,COB,Cooch Behar,ONR,Coonoor,CPHT,Coopers Halt,COL,Coromandel,CSZ,Cossimbazar,CTGN,Cotton Green,CUPJ,Cuddalore Port Jn,HX,Cuddapah,CBM,Cumbum,CRD,Currey Road,CTC,Cuttack,DAVC,D A V College Jalalabad,DAVJ,D A V College Jalandhar,DBR,Dabhaura,DBO,Dabhoda,DB,Dabhoi Jn,DBV,Dabilpur H,DQR,Dabirpura H,DBKA,Dabka H,DBLA,Dabla,DBI,Dabli Rathan,DBM,Dabolim H,DBF,Dabpal,DBA,Dabra,DUB,Dabtara,DR,Dadar Cr,DDR,Dadar Wr,DHM,Dadhal Inam,DPH,Dadhapara,DDV,Dadhddevi,DPX,Dadpur B H,DER,Dadri,DRHI,Dagar Khedi,DAO,Daghora,DAP,Dagmagpur,DGS,Dagori,DAU,Dagru,DRD,Dahanu Road,DHPD,Dahapara Dham,DKBJ,Dahar Ka Balaji,DAE,Dahegaon,DHF,Dahej,DGX,Dahgaon,DZB,Dahina Zainabad,DAC,Dahinsara Jn,DIC,Dahisar,DHD,Dahod,DWA,Dailwara,DHAE,Dainhat,DKNT,Dakaniya Talav,DAKE,Dakhineswar,DK,Dakor,DBT,Dakshin Barasat,DKDP,Dakshin Durgapur H,DKB,Dakshinbari,DCP,Dal Chapra F,DL,Daladi,DLF,Dalan,DLD,Dalauda,DVM,Dalbhumgarh,DLDE,Daldali,DLQ,Dalelnagar,DLO,Dalgaon,DLSR,Dalhousi Road,DAL,Daliganj Jn,DLX,Dalimgaon,DLK,Dalkolha,DRZ,Dalli Rajhara,DMW,Dalmau Jn,DLC,Dalmera,DPT,Dalpat Singhpur,DLP,Dalpatpur,DNU,Dalsanur,DSS,Dalsingh Sarai,DTO,Daltonganj,DDM,Dam Dim,DCU,Damalcheruvu,DMNJ,Damanjodi,DMYA,Damay,DME,Damnagar,DMA,Damodar Jn,DMO,Damoh,DRGU,Damrughutu,DNR,Danapur,DPL,Danauli Phulwaria,DNRA,Dandhera,DNDL,Dandimal Ph,DNQ,Dandkhora,DGB,Dandu Gopalapurarn H,DND,Dandupur,DNEA,Danea,DNGI,Dangari,DNW,Dangarwa,DGD,Dangidhar,DPS,Dangoaposi,DTX,Dangtal,DSPT,Danishpet,DNWH,Daniyawan Bazar H,DHWN,Daniyawan F,DKDE,Dankaur,DKAE,Dankuni,DANE,Danre,DNI,Dansi Ph,DNT,Dantan,DWZ,Dantewara,DTF,Dantia,DTRA,Dantra,DAR,Danwar,DAPD,Dapodi,DHPR,Dapper,DPSR,Dapsaura,DARA,Dara,DRGJ,Daraganj,DSM,Darasuram,DRV,Darauli,DZP,Darazpur,DBG,Darbhanga Jn,DKS,Darekasa,DDMT,Darimeta,DJ,Darjeeling,DJRZ,Darjeeling,DPC,Darliput,DAJ,Daroji,DTL,Darritola,DRG,Darshannagar,DWM,Darwha Moti Bagh Jn,DYD,Daryabad,DRO,Daryaoganj,DYP,Daryapur,DST,Dasampatti,DSME,Dasara,DRTP,Dasharathpur,DSNR,Dashnagar,DS,Dasna,DZA,Dasua,DTQ,Datarda Kalan,DTW,Datewas,DAA,Datia,DTVL,Dativli Cabin,DTK,Dattapukur,DAQ,Daud Khan,DDP,Daudpur,DLB,Daulatabad,DLPH,Daulatpur H,DULP,Daulatpur Haryana,DLA,Daulta,DOC,Daun Kalan,DD,Daund Jn,DNJ,Daundaj,DOZ,Daurai,DRLA,Daurala,DMH,Dauram Madhepura,DO,Dausa,DSNI,Dausni,DVG,Davangere,DOW,Davol,DBSI,Daya Basti,DYE,Dayanand Nagar H,DEB,Debagram,DRB,Debari,DBP,Debipur,DBLI,Debrabandhauli H,DDGJ,Deedar Ganj,DEEG,Deeg,DEPI,Deenapatti,DPNR,Deepnagar H,DNA,Degana Jn,DDN,Dehradun,DOS,Dehri On Son,DEHR,Dehu Road,DKGN,Dekargaon,DKR,Dekpura H,DEG,Delang,DAZ,Delhi Azadpur,DEC,Delhi Cantt,DLPI,Delhi Indrapuri H,DLI,Delhi Jn,DKZ,Delhi Kishanganj,DEE,Delhi S Rohilla,DSJ,Delhi Safdar Jang,DSA,Delhi Shahdara Jn,DVA,Delvada,DEMU,Demu,DEL,Denduluru,DGPP,Dengli Pimpalgaon,DORD,Deo Road,DBD,Deoband,DFR,Deogan Road,DGHR,Deoghar,DJHR,Deojhar,DEO,Deokali,DNH,Deonagar,DRGM,Deoragram,DRBR,Deoraha Baba Road H,DELO,Deorakot,DRN,Deoranian,DOE,Deori,DEOS,Deoria Sadar,DOTL,Deotala,DEP,Depalsar,DPUR,Depur Ph,DBNK,Derababa Nanak,DGNH,Dergaon H,DRL,Derol,DRWN,Derowan P H,DSX,Desang,DES,Desari,DSPN,Deshapran P H,DSO,Deshnoke,DUR,Desur,DSL,Deswal,DET,Det,DHLI,Dethli,DTJ,Detroj,D,Deula,DTE,Deulti,DKO,Devakottai Road,DAV,Devalgaon Avchar H,DHL,Devanahalli,DKN,Devangonthi,VNR,Devanur,DPE,Devarapalli,DEV,Devarayi,DAD,Devargudda,DKC,Devarkadre,DBEC,Devbaloda Charoda,DVGM,Devgam,DOHM,Devgarh Madariya,DVH,Devi,DVL,Devlali,DPZ,Devpura,DRPH,Devri P H,DVN,Devthana H,DEWA,Dewa,DEW,Dewalgaon,DWT,Dewan Hat,DWG,Dewanganj,DWX,Dewas,DABN,Dhaban,DBN,Dhablan,DHNA,Dhachna,DHRY,Dhaipukhuri,DAKA,Dhaka,DOT,Dhakia Tiwari H,DHK,Dhakuria F,DQL,Dhalaibi,DLGN,Dhalgaon,DMGN,Dhamalgaon,DMN,Dhamangaon,DHT,Dhamara Ghat,DDX,Dhamdhamia,DNE,Dhamni H,DAM,Dhamora,DPR,Dhampur,DTN,Dhamtan Sahib,DTR,Dhamtari,DMU,Dhamua,DXK,Dhana Kherli H,DZL,Dhana Ladanpur,DKW,Dhanakwada,DNK,Dhanakya,DIR,Dhanapur,DN,Dhanari,DNRE,Dhanauri,DHN,Dhanbad Jn,DDL,Dhandari Kalan,DCK,Dhandhuka,DQN,Dhanera,DAN,Dhaneta,DAG,Dhang,DGF,Dhangaria Ph,DCX,Dhaniachha,DNHL,Dhaniakhali H,DNM,Dhanmandal,DNL,Dhanoli Ph,DHNR,Dhanora Deccan,DNZ,Dhanori,DNPR,Dhanpura,DIM,Dhansimla Ph,DSR,Dhansiri,DNX,Dhansu,DNUA,Dhansura,DAVM,Dhanuvachapuram,DPDP,Dhapdhapi,DPW,Dhapewara,DHQ,Dharakhoh,DMPR,Dharampur H,DMP,Dharampur Himachal,DML,Dharamtul,DXG,Dharangaon,DRS,Dhareshwar,DRW,Dharewada,DRH,Dharhara,DARI,Dhari,DHW,Dhariwal,DAB,Dharmabad,DMD,Dharmadam H,DMR,Dharmanagar,DPJ,Dharmapuri,DMM,Dharmavaram Jn,DRQ,Dharminiya H,DKI,Dharmkundi,DHR,Dharnaoda,DHY,Dharodi,DIH,Dharuadihi,DRR,Dharur,DWR,Dharwad,DAS,Dhasa Jn,DTAE,Dhatrigram,DLMH,Dhaulimuhan,DHO,Dhaulpur,DWLE,Dhauni H,DUA,Dhaura,DUM,Dhaurmau Jaghina,DUO,Dhaursalar H,DHS,Dhavalas,DHA,Dheena,DKJR,Dhekiajuli Road,DWD,Dhekvad,DNKL,Dhenkanal,DGW,Dhigawara,DIW,Dhilwan,DHND,Dhinda,DNHK,Dhindhora Hukmikheda,DDK,Dhindsa,DIU,Dhing,DBZ,Dhing Bazar,DHJ,Dhinoj,DHRR,Dhirera,DHRJ,Dhirganj,DPP,Dhirpur,DHKR,Dhoda Kheri,DOD,Dhodhar,DOH,Dhodra Mohar,DKY,Dhoki,DLJ,Dhola Jn,DHMZ,Dhola Majra,DLZ,Dholbaza,DOL,Dholi,DIBL,Dholi Bhal,DOLK,Dholikuva,DPK,Dholipal,DOK,Dholka,DHOA,Dholpur (Ng),DDD,Dhondha Dih,DNDI,Dhondi,DHNE,Dhone Jn,DJI,Dhoraji,DHG,Dhrangandhra,DKRA,Dhuankheri,DBB,Dhubri,DHU,Dhubulia,DBQ,Dhulabari,DHI,Dhule,DGT,Dhulghat,DGLE,Dhulian Ganga,DKT,Dhulkot,DPRA,Dhupdhara,DQG,Dhupguri,DHRN,Dhurana,DJS,Dhurant Jwas H,DUI,Dhuri Jn,DRSN,Dhurwasin H,DTV,Dhutra,DV,Dhuva,DWL,Dhuwala,DH,Diamond Harbour,DEA,Diara,DIB,Dibai,DBNR,Dibnapur H,DBRG,Dibrugarh,DBRT,Dibrugarh Town,DHP,Dichpalli,DJD,Didarganj Road,DIA,Didwana,DGU,Digaru,DBY,Digboi,DGHA,Digha F S,DGHT,Digha H,DGHL,Dighal,DGY,Dighori Buzurg,DWDI,Dighwa Dubauli,DGA,Dighwara,DTG,Dignagar,DXD,Digod,DXR,Digsar,DMT,Diguvametta,DKM,Dikom,DIL,Dilawarnagar,DLN,Dildarnagar Jn,DVJ,Dillidewanganj,DMK,Dilmili,DLW,Dilwa,DMV,Dimapur,DNN,Dinanagar,DG,Dindigul Jn,DING,Ding,DWI,Dingwai,DHH,Dinhata,DCH,Dinhata College Halt,DKGS,Dinkar Gram Simaria,DPU,Diphu,DIP,Dipore,DISA,Disa,DIVA,Diva Jn,DINR,Divine Nagar,DTP,Divitapalli H,DWV,Diwan Khavati,DWNA,Diwana,DTRD,Diyatra,DYW,Diyawan H,DEOR,Diyodar,DYU,Diyuri H,DBS,Dobbspet H,DHE,Dobhi H,DKRD,Dockyard Road,DBU,Dodballapur,DBL,Dodbele,DPI,Doddampatti,DODH,Dodh,DJL,Dodjala H,DOX,Dohna,DIT,Dohrighat,DXU,Dohru,DKLU,Doikallu,DWO,Doiwala,DOKM,Dokra H,DKUR,Dokur,DKWA,Dokwa,DJKR,Dolajika Khera,DLV,Dolavi,DI,Dombivli,DMG,Domingarh,DJR,Domjur,DMJR,Domjur Road,DKD,Donakonda,DDE,Dondaicha,DGN,Dongargaon,DGG,Dongargarh,DGBZ,Dongri Buzurg,DNV,Donkinavalasa,DOA,Doraha,DVR,Doravarichattram,DOY,Dornahalli,DKJ,Dornakal Jn,DPD,Dosapadu,DSD,Dosvada,DKSA,Draksharama,DUAN,Duan,DUBH,Dubaha,DBW,Dubia,DUJ,Dubrajpur,DUE,Dudahi,DUD,Dudhani,DDNA,Dudhaunda H,DYK,Dudhia Khurd,DXN,Dudhinagar,DDNI,Dudhnoi,DKX,Dudhwakhara,DUK,Dudia,DDW,Dudwa,DDY,Dudwindi,DUN,Duganpur,DDGA,Dugda Ph,DGQ,Dugdol,DIG,Duggirala,DXH,Duhai,DOKY,Dukheri,DUQ,Dukhnawaran H,DLPT,Dulakhapatna Ph,DRA,Dulariya,DJG,Duliajan,DLR,Dullahapur,DUT,Dum Duma Town,DMRX,Dumari H,DY,Dumariya,DMZ,Dumdangi,DDC,Dumdum Cantonment,DDJ,Dumdum Jn,DMF,Dumetra,DUMK,Dumka,DUMR,Dumra,DURE,Dumraon,DMBR,Dumri Bihar,DRI,Dumri Juara,DKU,Dumri Khurd,DMLE,Dumurdaha,DMRT,Dumuriput,DOR,Dundara,DDCE,Dundi,DGJ,Dungar Jn,DNGD,Dungarda,DNRP,Dungarpur,DGI,Dungri,DJX,Dungripali,DUU,Dupadu,DDA,Duraundha Jn,DURG,Durg,DZK,Durgachak,DZKT,Durgachak Town,DGDG,Durgada Gate H,DGNR,Durganagar F,DGR,Durgapur,DPA,Durgapura,DURP,Durgapuri,DGO,Durgauti,DUSI,Dusi,DSK,Duskheda,BARD,Duvri Kalan,DVD,Duvvada,DWP,Dwarapudi,DWK,Dwarka,DWJ,Dwarkaganj,EVA,Edavai,EDD,Edduladoddi,EDG,Eden Garden,EGT,Egattur,EKM,Ekambarakuppam,EKR,Ekangar Sarai F,EKC,Ekchari,EKL,Ekdil,EKI,Eklakhi,EKMA,Ekma,EKH,Eksari,EL,Elamanur,ETR,Elattur,ELR,Elavur,ELM,Elimala,YLM,Ellamanchiii,EPR,Elphinstone Road,EE,Eluru,ENR,Ennore,ERS,Eranakulam Jn,ERL,Eraniel,ERC,Erich Road,EDU,Eriodu,ERN,Ernakulam Town,ED,Erode Jn,YP,Errupalem,ETAH,Etah,ETK,Etakkot,ETW,Etawah,ETUE,Etmadpur,ETP,Ettapur Road,ETMD,Ettimadai,ETM,Ettumanur,EKN,Ezhukone,EZP,Ezhupunna,FD,Faizabad Jn,FYZ,Faizullapur,FKB,Fakharbad,FAP,Fakharpur H,FKM,Fakiragram Jn,FLK,Falakata,FM,Falaknuma,FLM,Falimari,FA,Falna,FSR,Faqarsar,FAR,Farah,FHT,Farah Town,FRH,Farhantnagar,FRD,Farhedi H,FDB,Faridabad,FDN,Faridabad New Town,FRDH,Faridaha,FDK,Faridkot,FBD,Farrukhabad Jn,FN,Farukhnagar,FSP,Fateh Singhpura,FSW,Fateh Singhwala,FTD,Fatehabad Chandrawati Ganj Jn,FGR,Fatehgarh,FGCN,Fatehgarh Churian,FGH,Fatehgarh Haryana,FGSB,Fatehgarh Sahib,FAN,Fatehnagar,FNB,Fatehnagar Bridge,FTP,Fatehpur,FTC,Fatehpur Chaurasi,FPS,Fatehpur Shekhawati,FTS,Fatehpur Sikri,FUT,Fatuha,FTH,Fatuhi,FZL,Fazalpur,FKA,Fazilka Jn,FK,Ferok,PHS,Ferozeshah,FZD,Firozabad,FZR,Firozpur Cantt Jn,FZP,Firozpur City Jn,FBG,Forbesganj Jn,FLR,Fuleswar,FNO,Fungo H,FKG,Furkating Jn,FTG,Fursatganj,GRCP,G Ramachandrapur Ph,GCH,Gachhipura,GHLE,Gadadharpur,GDG,Gadag Jn,GAR,Gadarwara,GKD,Gadhakda,GDW,Gadhwala,GNR,Gadiganuru,GDD,Gadra Road,GWD,Gadwal,GGY,Gagariya,GLTA,Gahlota,GMR,Gahmar,GNZ,Gahndran H,GHB,Gahri Bhagi,GAO,Gaigaon,GAE,Gaipura,GIL,Gaisal,GPI,Gajapatinagararn,GAJB,Gajara Bahara,GJJ,Gajjelakonda,GJN,Gajner,GJL,Gajraula Jn,GJS,Gajsinghpur,GAJU,Gaju H,GLE,Gajulagudem,GJW,Gajuwala H,GAA,Galan,GAGA,Galgalia,GLI,Galsi,GUD,Galudih,GRFB,Gambhir Br,GRF,Gambhiri Road,GMH,Gamharia,GUR,Ganagapur Road,GNPT,Ganapatpura,GNU,Ganaur,GNV,Gandevi,GIMB,Gandhidham Jn,GG,Gandhigram,GNC,Gandhinagar Capital,GADJ,Gandhinagar Jaipur,GHPU,Gandhipuram Halt,GNST,Gandhismriti,GAJ,Ganeshganj,GADM,Ganga Dham,GDRA,Gangadhara,GNGD,Gangadharpur,GGAR,Gangadhra,GANG,Gangaganj,GAG,Gangaghat,GDN,Gangaikondan,GJ,Gangajhari,GNH,Gangakher,GNNA,Gangania,GGC,Gangapur City,GRMP,Gangarampur,GGR,Gangarar,GGLE,Gangatikuri,GNGT,Gangatola,GNGL,Gangauli H,GVMH,Gangavaram,GPY,Gangayapalle,GNN,Gangineni,GNW,Gangiwara,GGP,Gangnapur F,GRP,Gangpur,GNRL,Gangraul H,GJUT,Gangsar Jaitu,GVA,Ganguwada,GWP,Gangwa Pur H,GIF,Gani Dham H,BAQ,Ganj Basoda,GWA,Ganj Dundwara,GAQ,Ganj Kwaja,GJMB,Ganj Muradabad,GAM,Ganjam,GALE,Gankar,GKT,Gankhera,GWM,Gannavaram,GBA,Garbeta,GRBH,Garea Bihar,GBN,Garh Banali,GEB,Garh Baruari,GRB,Garh Dhrubbeswar,GARA,Garha,GQN,Garhani,GHX,Garhara,GHH,Garhi Harsaru Jn,GRMR,Garhi Manikpur,GIS,Garhi Sandra,GRM,Garhmau,GMS,Garhmuktesar,GGB,Garhmuktesar Bridge,GNK,Garhnokha,GRPA,Garhpura,GSR,Garhshankar,GHQ,Garhwa,GIA,Garia F,GFAE,Garifa,GVI,Garividi,GUG,Garjaipur,GRAK,Garkha F,GLA,Garla,GDE,Garladinne,GM,Garmadi,GSB,Garna Sahib,GBHA,Garobigha H,GRU,Garopara,GOH,Garot,GPH,Garpos,GRHX,Garra,GSDH,Garsanda,GHD,Garwa Road Jn,GKPI,Gate Karepalli,GTW,Gatora,GRJ,Gatra,GAI,Gauchhari,GDGN,Gaudgaon,GNTR,Gauntra,GAUR,Gaur,GZM,Gaur Malda,GRX,Gaura,GQD,Gaurdaha H,GB,Gauri Bazar,GSRM,Gauri Shri Ram H,GBD,Gauribidanur,GNG,Gauriganj,GUP,Gauripur,GMU,Gauriyamau,GWS,Gaushala F,GTST,Gautam Sthan,GATD,Gautamdhara,GPX,Gautampura Road,MLNR,Gawada Malosan,GAH,Gawnaha,GAYA,Gaya Jn,GBE,Gayabari,GZO,Gazole,GZL,Gazulapalli,GEDE,Gede,GEK,Gegal Akhri,GXG,Geong H,GER,Geratpur,GTKD,Gerita Kolvada,GTJT,Getor Jagatpura,GAD,Gevra Road,GELA,Ghadela,GHG,Ghagghar,GHT,Ghaghara Ghat,GHGL,Ghagwal,GKX,Ghal Kalan,GNP,Ghanapur,GANL,Ghanauli,GNSL,Ghansoli,GHNH,Ghantakhal Nidhipur,GRA,Gharaunda,GANI,Gharni,GYL,Gharyala,GHSR,Ghasara H,GSO,Ghaso,GC,Ghat Kopar,GTU,Ghat Nandur,GPC,Ghat Pindrai,GAL,Ghatala,GTM,Ghatampur,GEA,Ghatera,GHAI,Ghatigaon,GKB,Ghatkavarana,GT,Ghatkesar,GPB,Ghatprabha,GTS,Ghatsila,GTWD,Ghatwad,GSGJ,Ghausganj,GZB,Ghaziabad Jn,GCT,Ghazipur City,GZT,Ghazipur Ghat F,GLD,Ghelda,GHE,Ghevra,GILA,Ghiala,GGA,Ghoga,GGH,Ghogardiha,GIBP,Ghogi Bariarpur,GOE,Ghograpar,GDX,Ghoksadanga,GVD,Gholwad,GNS,Ghonsor,GDYA,Ghoradongri,GGTA,Ghoraghata,GGV,Ghoraras Ghona H,GRH,Ghorasahan,GRWD,Ghorawadi,GOG,Ghorghat,GHRI,Ghori H,GRMA,Ghormara,GHN,Ghorparan,GPR,Ghorpuri,GWH,Ghoshawar,GSI,Ghosi,GOPA,Ghosipura,GOS,Ghosrana,GSD,Ghosunda,GO,Ghoti,GDKP,Ghudankhapa,GH,Ghughuli,GHUM,Ghum,GUS,Ghumasan,GUNS,Ghunas H,GGT,Ghunghuti,GAHT,Ghusia Halt,GTI,Ghutai,GOF,Ghutiari Sharif,GTK,Ghutku,GZS,Giani Zail Singh Sandhwan,GIZ,Gidam,GOD,Gidarpindi,GID,Giddalur,GDB,Giddarbaha,GHR,Gidhaur,GII,Gidhni,GDH,Gidnahali,GILL,Gill,GIN,Ginigera,GEG,Gir Gadhara,GRHM,Gir Hadmatiya,GIW,Girdharpur,GMDN,Giri Maidan,GRD,Giridih,GW,Girwar,GADH,Goaldih,GLPT,Goalpara Town,GBG,Gobardanga,GBRI,Gobarwahi,GOX,Gobindpur Dugauli H,GBRA,Gobra,GCN,Gocharan,GDQ,Godamgura,GSL,Godapeasal,GVN,Godavari,GBQ,Godbhaga,GDHA,Godha,GS,Godhaneswar,GNQ,Godhani,GDA,Godhra Jn,GPE,Gogi Pothia,GOA,Gohad Road H Mp,GHNA,Gohana,GRV,Gohlwar Varpal,GPZ,Gohpur,GOL,Goilkera,GWSB,Goindwal Sahib H,GJR,Gojhariya,GKK,Gokak Road,GKG,Gokalgarh,GOK,Gokarna Road,GKA,Gokhula,XGN,Gokulnagar H,GNJP,Gokulnagar Joypore,GKL,Gokulpur,GK,Gola Gokarannath,GRE,Gola Road,GLBA,Golabai Ph,GLGT,Golaghat,GKJ,Golakganj Jn,GLNA,Golana,GTA,Golanthra,GTY,Golapatti,GJH,Goldinganj,GOLE,Gole,GHA,Golehwala,GHL,Golhalli,GLY,Gollapalli H,GLP,Gollaprolu,GMGM,Gomangalam,GTT,Gomta,GTNR,Gomtinagar F,GMI,Gond Umri,GNAN,Gonda (Mg),GD,Gonda Jn,GDK,Gonda Kachahri,GDL,Gondal,G,Gondia Jn,GNVR,Gondwana Visapur,GNA,Goneana Bhai Jagta,GNL,Gongle,GDBR,Goonda Bihar,GY,Gooty Jn,GOP,Gop Jam,GOPG,Gopalganj,GN,Gopalnagar F,GBK,Gopalpur Balikuda,GOR,Gopinathpur Ph,GRKN,Gorakhnath,GKC,Gorakhpur Cantt,GKP,Gorakhpur Jn,GGO,Goram Ghat,GPJ,Gorapur,GRL,Goraul,GRY,Goraya,GMN,Goregaon,GNO,Goregaon Road H,GVR,Goreswar,GRJA,Gorinja,GIO,Goriyan,GRR,Gorphar,GUMI,Gorumahisani,GOGH,Gosai Gaon Hat,GSGB,Gosaingram,GSPR,Gosalpur,GGJ,Goshainganj,GOT,Got H,GOTN,Gotan,GTE,Gothaj,GTX,Gothangam,GTLM,Gotlam,GTRA,Gotra,GTD,Gourinathdham,GV,Govandi,GDO,Goverdhan,GVH,Govindgarh,GGKR,Govindgarh Khokhar,GND,Govindgarh Malikpur,GVMR,Govindi Marwar,GOVR,Govindnagar,GVDP,Govindpur Ph,GBX,Govindpur Road,GOY,Govindpuri,GWV,Gowdavalli H,GKHT,Gram Kharika H,GMDP,Gramdadpur,GMMG,Grammasagram,GTR,Grant Road,GWYR,Greenways Road,GUA,Gua,GSA,Guagachha,GBB,Gubbi,GRMT,Gud Market,GDPT,Gudaparti,GDI,Gudgeri,GA,Gudha,GMA,Gudimetta H,GPDE,Gudipudi,GDV,Gudivada Jn,GYM,Gudiyattam,GVL,Gudlavalleru,GDM,Gudma,GDU,Gudru,GDP,Gudupalli,GDR,Gudur Jn,GI,Guduvancheri,GLKN,Gugalwa Kirtan H,GDY,Guindy,GSQ,Guir Sarang Ph,GJD,Gujhandi,GLBN,Gujran Balwa H,GLG,Gulabganj,GBP,Gulabpura,GLH,Gulaothi,GPU,Gulapalyamu,GUB,Gularbhoj,GR,Gulbarga,GUH,Guldhar,GED,Guledagudda Road,GULR,Guler,GGD,Gullaguda,GLU,Gullipadu,GLMA,Gulma,GLV,Gulvanchi,GZH,Gulzarbagh,GUMA,Guma,GMDA,Gumada,GME,Gumandev,GMAN,Gumani,GUZ,Gumanihat,GMG,Gumgaon,GMIA,Gumia,GMM,Gumman,GPD,Gummidipundi,GTQ,Gumtali,GTF,Gumthal,GMTO,Gumto,GUNA,Guna,GDZ,Gundardehi,GDPL,Gundla Pochampalli,GKM,Gundlakamma,GUU,Gundratimadugu,GVB,Guneru Bamori,GUJ,Gunja,GEOR,Gunjaria,GNJ,Gunji,GTL,Guntakal Jn,GUK,Guntakoduru,GNT,Guntur Jn,GNPR,Gunupur,GPAE,Guptipara,GMD,Guramkhedi,GRAE,Gurap,GRRU,Guraru,GSP,Gurdaspur,GGN,Gurgaon,GRKA,Gurha Kemla,GUX,Gurhi,GRI,Guriya,GQL,Gurla,GRRG,Gurli Ramgarhwa H,GMX,Gurmura,GRN,Gurnay,GAP,Gurpa,GRO,Gurra,GHJ,Gursahaiganj,GRZ,Gurthuri,GHS,Guru Harsahai,GTBN,Guru Teghbahadurnagar,GRBL,Gurudabilli,GURN,Gurudas Nagar,GJTA,Gurudijhatia,GZA,Gurujala,GSW,Gurusar Sehnewala,GUV,Guruvayur,GKH,Guskara,GHY,Guwahati,GRG,Guwarighat,GWL,Gwalior Jn,GWO,Gwalior Ng,GYN,Gyanpur Road,NZM,H Nizamuddin,NED,H Sahib Nanded,HWX,Habaipur,HHT,Habanghatta,HPUR,Habaspur,HBJ,Habibganj,HBE,Habibpur,HBW,Habibwala,HB,Habra,HLB,Hadala Bhal,HDP,Hadapsar,HDD,Haddinagundu,HDGR,Hadgon Road,HYA,Hadiaya,HRM,Hadmadiya,HM,Hadmatiya Jn,HBF,Hadobhangi Ph,HYL,Hadyal,HFZ,Hafizpeta,HZR,Hafizpur,HGI,Hagari,HYT,Haiaghat,HBN,Haibargaon,HDN,Haidarnagar,HGH,Haidergarh,HIH,Hajigarh,HJP,Hajipur Jn,HKP,Hakimpur,HLKT,Halakatta,HBU,Halbarga,HLDR,Haldaur,HLP,Haldharpur F,HLDD,Haldi Road,HLZ,Haldia,HDB,Haldibari,HIP,Haldipada,HOD,Haldiya Bihar H,HDW,Haldwani,HLR,Halishahar,HLV,Haliyuru H,HLKH,Hallikhed,HLD,Haludpukur,HVD,Halvad,HMRR,Hamarapur,HOJ,Hamiltonganj,HMR,Hamira,HAM,Hamiratti Ph,HMG,Hamirgarh,HAR,Hamirpur Road,HPA,Hampapura,HME,Hamre,HVM,Hamsavaram,HNK,Hanakere,HNPA,Handapa,HDK,Handia Khas,HNR,Hansara,HSDA,Hansdiha,HNS,Hansi,HNU,Hanspura,HNH,Hanumanahali H,HNMN,Hanumancircle,HMH,Hanumangarh Jn,HWT,Hanwant,HAPA,Hapa,HPRD,Hapa Road,HPU,Hapur Jn,HGL,Harangul,HKH,Haranyakheri,HRN,Harauni,HCP,Harchandpur,HD,Harda,HDE,Hardas Bigha,HDT,Hardattpur F,HRI,Hardoi,HDWL,Hardorawal,HDU,Hardua,HGJ,Harduaganj,HA,Hargaon,HHP,Harhar Fatehpur,HCNR,Harichandanpur,HDS,Haridaspur,HW,Haridwar Jn,HRR,Harihar,HIR,Harinagar,HPL,Haripal,HAD,Harippadu,HP,Haripur,HPGM,Haripurgram Ph,HSK,Harishanker Road,HCR,Harishchandrapur,HCM,Harishchandrapuram Ph,HDC,Harishdadpur Ph,HRSR,Harishnagar H,HRSN,Harisinga,HKL,Harkia Khal,RLP,Harlapur,HMY,Harmuti,HNHL,Harnahalli H,HRT,Harnaut,HRPG,Harpalganj,HPP,Harpalpur,HR,Harpalu,HPHI,Harpanhallli,HRNG,Harpur Nag,HRV,Harrad,HRW,Harrawala,HRB,Harri,HNN,Harsana Kalan,HRDR,Harsar Dehri,HSI,Harsauli,HSY,Harsinghpur Goba,HRH,Harthala,HRO,Harua Road,HRBR,Harubera,HAA,Harwada,HNB,Hasanabad Jn,HSB,Hasanbazar H,HSP,Hasanparti Road,HPO,Hasanpur Road,HSA,Hasimara,HAS,Hassan,HAQ,Hastavaramu,HN,Hathbandh,HTZ,Hathidah Jn,HTZU,Hathidah Jn Upper,HTGR,Hathigadh,HTC,Hathras City,HRS,Hathras Jn,HRF,Hathras Qilah,HTJ,Hathras Road,HTW,Hathua,HAT,Hathuran,HATI,Hati,HTE,Hatia,HATB,Hatibari,HTK,Hatkanagale,HTN,Hatnapur,HPLE,Hatpuraini H,HPLB,Hatpurani,HTT,Hatta Road,HTD,Hatundi,HWR,Hatwar,HAUR,Haur,HVR,Haveri,HZD,Hazaribagh Road,HNZM,Hazrat Nizamudin,HZN,Hazratnagar H,HBLN,Hbl Nagar,HEB,Hebbal,HBS,Hebsur,HLE,Heelalige,HEI,Heggere H,HHG,Hehegara H,HJL,Hejjala,HK,Helak,HML,Helem,HMP,Hempur,HNDR,Hendegir,HER,Her,HEN,Heria P H,HNSL,Hesalong Fs,HET,Hetampur,HIJ,Hijli,HRSB,Hillar Shahabad Halt,HIL,Hilsa Block,HEM,Himayatnagar Deccan,HGR,Himgir,HMI,Himmatana,HMT,Himmatnagar,HMQ,Himmatpura,HNM,Hinauta Ramban,HIND,Hind,HMZ,Hind Motor,HAN,Hindaun City,HND,Hindol Road,HC,Hindu College,HMK,Hindumalkote,HUP,Hindupur,HGT,Hinganghat,HNL,Hingoli Deccan,HPKA,Hinotia Pipalkhera,HRNR,Hira Nagar,HKG,Hirakud,HNG,Hirangaon,HPR,Hirapur,HRG,Hirdagarh,HDM,Hirdamali,HHL,Hirehalli,HQR,Hirenanduru,HLW,Hirnawali,HDA,Hirnoda,HRE,Hirodih,HSR,Hisar Jn,HIS,Hisua,HSL,Hisvahal,HTCY,Hitec City,HTNL,Hitnal H,HIVR,Hiwarkhed,HKR,Hiwarkhed H,HDL,Hodal,HGA,Hogla H,HJI,Hojai,HOL,Hol,HLK,Holalkere,HUK,Holambi Kalan,HLAR,Hole Alur,HLN,Hole Narsipur,HBL,Hombal,HOH,Honaganahalli H,HVL,Honnavalli Road,HNA,Honnavar,HGY,Hooghly,HYG,Hooghly Ghat,HAH,Hosa Agrahara,HSD,Hosadurga Road,HBD,Hoshangabad,HSX,Hoshiarpur,HPT,Hospet Jn,HSRA,Hosur,HT,Hotar,HG,Hotgi,HBG,Howbagh Jabalpur,HWH,Howrah Jn,HHR,Hridaypur,UBL,Hubli Jn,HJLI,Hugrajuli,LKT,Hulkoti,HMA,Humma,HMBD,Humnabad,HUN,Hunsenahalli,HHD,Hunsihadgil,HPG,Huppuguda H,HMPR,Hurmujpur H,HSQ,Husainpur,HYB,Hyderabad Decan,IB,Ib,IMR,Ibrahimpur H,ICL,Ichauli,ICG,Ichchangadu,IPM,Ichchapuram,IP,Ichhapur,IDJ,Idalhond H,IPL,Idapalli,IDAR,Idar,IDH,Idgah,IGP,Igatpuri,IKD,Ikdori,IKK,Ikkar H,IKR,Iklehra,IK,Ikran,ILO,Illoo,IMLI,Imli,EC32,Imlibigha H,IHP,Inchhapuri,IDL,Indalvai,INP,Indapur H,IAA,Indara Jn,INS,Indas Ph,IDM,Indemau,IDR,Indi Road,INDB,Indore Jn,INDM,Indore Jn,INDR,Indra Nagar,IBL,Indrabil,IDG,Indragarh Sumerganj Mandi,IDP,Indupalli,IGTA,Ingohta,IGRL,Ingorala,IGR,Ingur,INJ,Innanje,INK,Intekanne,ITE,Intiyathok,IPPM,Ipurupalem H,IQG,Iqbal Gadh,IQB,Iqbalpur,IDGJ,Iradatganj,EGU,Iranagallu,IRP,Iravipuram,IRN,Irgaon P H,IGL,Iringal H,IJK,Irinjalakuda,IGU,Irugur,EN,Isand,ISA,Isarda,ISH,Isarwara,INCI,Ishan Chandi Halt,IDS,Ishardaspur,ESV,Isivi,IPR,Islampur,ISM,Ismaila Haryana,IMGE,Ismailpur,IRA,Israna H,ET,Itarsi Jn,IJ,Itaunja,AAH,Itehar,IKI,Itikyala,ITKY,Itky,ITA,Itola,ITR,Itwari,ITRN,Itwari Jn(Ng),IZN,Izzatnagar Jn,JBP,Jabalpur,JBPN,Jabalpur Jn,JBX,Jabri,JBU,Jabugam,JDP,Jadabpur,JADR,Jadar,JCL,Jadcharla,JBS,Jadoli Ka Bas,JRKT,Jadrama Kunti,JFG,Jafarganj,JO,Jagabor,JGDL,Jagadal,JUD,Jagadhri,JUDW,Jagadhri Workshop,JGD,Jagadishpur,JGE,Jagannath Temple Gate,JNP,Jagannathapur,JTB,Jagatbela,JDB,Jagdalpur,JDL,Jagdevwala,JDPR,Jagdishpur,JDPT,Jagdishpur,JGJ,Jagesharganj,JBK,Jaggambhotla Krishnapuram,JID,Jagi Road,LPJL,Jagityal Lingampet,JGWL,Jagjvan H,JNX,Jagnathji Road,JGN,Jagraon,JDN,Jagudan,JHDC,Jahanabad Couirt F,JBR,Jahangirabad Raj,JKH,Jahanikhera H,JJT,Jai Jai Wanti,JPML,Jai Prakash Mahuli H,JYM,Jai Samand Road,JCU,Jaicholi,JJJ,Jaijon Doaba,JNT,Jaintipura,JP,Jaipur Jn,JRMG,Jairamnagar,JAIS,Jais,JSM,Jaisalmer,JSD,Jaisingder,JTI,Jaithari,JTU,Jaitipur,JES,Jaitsar,JTW,Jaitwar,JJA,Jajan Patti,JJ,Jajau,JWL,Jajiwal,JJKR,Jajpur Keonjhar Road,JAK,Jakanur H,JHL,Jakhal Jn,JKB,Jakhalabandha,JKN,Jakhanian,JKPR,Jakhapura,JHA,Jakhaura,JHN,Jakhim,JLN,Jakhlaun,JKHI,Jakhod Khera,JKA,Jakhvada,JKO,Jakkalacheruvu,JK,Jakolari,JPR,Jakpur,JKS,Jaksi,JKL,Jalal Khali,JBD,Jalalabad,JLL,Jalalganj,JAG,Jalalgarh,JGP,Jalalpur,JPD,Jalalpur Dhai,JPP,Jalalpur Panwara F,JLI,Jalalsi P H,JM,Jalamb Jn,JRC,Jalandhar Cant,JUC,Jalandhar City,JSC,Jalesar City,JLS,Jalesar Road,JER,Jaleswar,JL,Jalgaon Jn,JIL,Jalila Road,JNRI,Jalindri,JA,Jaliya,JALD,Jaliya Devani,JLM,Jaliya Math,J,Jalna,JOR,Jalor,JPG,Jalpaiguri,JPE,Jalpaiguri Road,JLQ,Jalpur H,JAC,Jalsu,JACN,Jalsu Nanak,JDH,Jam Jodhpur,WTJ,Jam Wanthali,JAMA,Jama,JBO,Jamadoba P H,JOO,Jamai Osmania,JMP,Jamalpur Jn,JPS,Jamalpur Shaikhan,JMV,Jambara,JMBL,Jambhali H,JBB,Jambur,JMB,Jambusar Jn,JBSR,Jambusar Road,JMD,Jamdha,JET,James Street,JMG,Jamga,JGZ,Jamgaon,JMI,Jamguri,JMKT,Jamikunta,JMIR,Jamira H,JMQ,Jamirghata,JAT,Jammu Tawi,JAM,Jamnagar,JMNR,Jamner,JMS,Jamsar,JME,Jamsher Khas,JMT,Jamtara,JPV,Jamtara Paraswara,JMN,Jamuawan H,JMU,Jamui,JMK,Jamunamukh,JMX,Jamuni,JNN,Jamuniatand H,JNNA,Jamuniatanr Halt,JVL,Jamwala,JOX,Janai Road,JNKR,Janakinagar,JNR,Janakpur Road,JNL,Jandiala,JDK,Jandoke,JAQ,Jandrapeta H,ZN,Jangaon,JNH,Janghai Jn,JGG,Jangiganj,JRLE,Jangipur Road,JNE,Janiyana,JKM,Jankampet Jn,JKDP,Jankideipur Ph,GJT,Jannaghatta Halt,JOA,Janwal,JAO,Jaora,JPL,Japla,JRA,Jaraikela,JSV,Jarandeshwar,JAN,Jarangdih,JRPD,Jarapada,JRT,Jarati,JDW,Jarauda Nara,JUA,Jarauna,JRJ,Jargaon,JARI,Jari,JRLI,Jaroli,JLD,Jarwal Road,JSA,Jasai,JSI,Jasali,JSPR,Jashapar,JSS,Jasia H,JSME,Jasidih Jn,JDA,Jasoda,JSR,Jasra,JSL,Jassowal H,JSH,Jaswantgarh,JGR,Jaswantnagar,JSKA,Jataula Jori Sampka,JTDM,Jatdumri H,JTRD,Jath Road,JTR,Jatkanhar,JTS,Jatusana,JW,Jatwara,JRAE,Jaugram,JUK,Jaulka H,JKR,Jaulkhera,JOP,Jaunpur City,JNU,Jaunpur Jn,JVA,Javale,JWO,Jawad Road,JWNR,Jawaharnagar,JWK,Jawaharpur Kamsan H,JWB,Jawai Bandh,JMKR,Jawalamukhi Road,JAL,Jawali,JWLS,Jawanwala Shahr,JNM,Jayanagar Majilpur H,JSP,Jayasingpur,JYG,Jaynagar,JHD,Jehanabad,JJR,Jejuri,JKT,Jekot,JNZ,Jenal,JEN,Jenapur,JERD,Jenapur Road Ph,JONR,Jeonara,JEP,Jeonathpur,JRK,Jeruwa Khera,JSOR,Jessore Road,JLR,Jetalsar Jn,JTV,Jetalvad,JCH,Jetha Chandan,JDDA,Jetha H,JTY,Jethi,JTIN,Jethian,JHK,Jethuke,JTP,Jetpur,JEUR,Jeur,JYP,Jeypore,JBW,Jhabelwali,JPI,Jhadupudi,JGI,Jhagadiya Jn,JAJ,Jhajha,JHJ,Jhajjar,JLWC,Jhalawar City,JHW,Jhalawar Road,JAA,Jhalida,JHH,Jhalra H,JLBR,Jhaluarbar,JLW,Jhalwara,JLT,Jhamat H,JHBN,Jhamatpur Baharan,JJP,Jhanjharpur Jn,JSRD,Jhankada Sarala Road Ph,JHS,Jhansi Jn,JPH,Jhantipahari,JPQ,Jhapandanga,JTL,Jhapater Dhal,JKP,Jharekapur,JGM,Jhargram,JRL,Jharli,JRQ,Jharokhas,JDI,Jharradih,JSG,Jharsuguda Jn,JSGR,Jharsuguda Road,JWS,Jharwasa,JAU,Jhaua,JHWR,Jhawar H,JLHI,Jhilahi,JLY,Jhilimili,JLLO,Jhilo,JHMR,Jhimri,JHG,Jhingura,JJK,Jhinjhak,JNK,Jhinkpani,JHIR,Jhir,JTK,Jhitkia,JTH,Jhok Tahal Singh,JUL,Jhulasan,JUP,Jhunpa,JI,Jhusi,JJG,Jiaganj,JVT,Jibanti H,JIA,Jigna,JGKS,Jigni Khas H,JMPT,Jimidipeta,JCY,Jind City,JIND,Jind Jn,JNTR,Jinti Road,JIR,Jira Road,ZRDE,Jiradei,JIT,Jirat,JRNA,Jirinia,JRO,Jiron,JXN,Jirona H,JRWN,Jirwan H,JKZ,Jita Kheri,JITE,Jite,JWN,Jiwa Arain,JDR,Jiwdhara,JPM,Jiyapuram H,GNB,Jnana Bharati,JOBA,Joba,JOK,Jodhka,JU,Jodhpur Jn,JOL,Jogal,JBN,Jogbani,JGNR,Jogendra Nagar,JOS,Jogeshwari,JGBR,Jogeswar Bihar,JOM,Jogi Magra,JGA,Jogiara,JGF,Jogidih,JPZ,Jogighopa,JDNX,Joginder Nagar,JGW,Jogiwala,JON,Johna,JJW,Jojwa,JTJ,Jolarpettai Jn,JPO,Jora Alapur,JRS,Jora Vasan,JOQ,Jorai,JRW,Joramow,JRZ,Joranda Road,JVN,Joravarnagar,JTTN,Jorhat Town,JRKN,Jorkian,JTN,Jotana,JOC,Joychandi Pahar,JUBS,Jubbasahani,JCNR,Juchandra,JRR,Jugaur,JGJN,Jugijan,JRG,Jugpura P H,JOH,Juharpura,JHP,Juhjarpur,JNJ,Juinagar,JUJA,Jujomura,JKE,Jukehi,JNA,Julana,JLG,Julgaon Decean Halt,JLF,Julmi,JRV,Juna Rajuvadiya,JND,Junagadh Jn,JNRD,Junagarh Road,JAR,Junair H,JHT,Juneta,JBG,Jung Bahadurganj,JCN,Junichavand,JNO,Junnor Deo,JUNX,Junona H,JRX,Juriagaon,JRTR,Jurtara H,JTO,Jutogh,JUR,Juturu,JWP,Jwalapur,KBPR,Kabakaputtur,KBR,Kabrai,KCHV,Kachchanavilai,KCG,Kacheguda,KHRA,Kachera,KWN,Kachewani,KCU,Kachhla,KCO,Kachhla Bridge H,KWH,Kachhwa Road,KAU,Kachna,KHNR,Kachnara,KCNR,Kachnara Road,KOX,Kachujor,KDX,Kadabari Hat,KVU,Kadakavur,KDO,Kadakola,KN,Kadalundi,KBT,Kadambattur,KDU,Kadambur,KDRA,Kadampura H,KDYA,Kadarpur,KVDU,Kadavakuduru,KDNL,Kadayanallur,KDTN,Kadethan,KADI,Kadi,KDQ,Kadipur,KDPS,Kadipur Sani H,KRY,Kadiri,KYM,Kadiyam,KLM,Kadlimatti H,DRU,Kadur,KDTY,Kaduturutty,KFPR,Kafurpur,KEY,Kagankarai,CLG,Kahalgaon,KAGR,Kahangarh H,KRAI,Kaher,KH,Kahilia,KCY,Kaichar,KKAE,Kaikala,KKLR,Kaikalur,KKRM,Kaikoram,KYT,Kailahat,KQS,Kailaras,KLPM,Kailasapuram,KALI,Kaili,KIV,Kailsa,KMA,Kaima,KAKN,Kaimarakalan,KMJ,Kaimganj,KPXR,Kaipadar Road,KAI,Kairla,KCZ,Kairon,KLE,Kaithal,KTCH,Kaithalkuchi,KYSD,Kaiyal Sedhavi,KYB,Kaiyar Ph,KJ,Kajgaon,KJTW,Kajgaon Terhwan H,KJME,Kajoragram,KJH,Kajra,KYF,Kajrat Nawadih,KFT,Kajri,KAPE,Kakapora,KKHT,Kakarghatti,KWDP,Kakdwip,COA,Kakinada Port,CCT,Kakinada Town,KKGM,Kakiriguma,KKLU,Kaklur,KKJ,Kakori,KARH,Kakraha Rest House,KKRL,Kakrala H,KQE,Kala Akhar,KMB,Kala Amba,KKL,Kala Bakra,KDHI,Kaladehi,KKQ,Kalaikunda,KKD,Kalakund,KMH,Kalamalla,KLMR,Kalamasseri,KMRD,Kalamb Road,KLBA,Kalambha,KLMC,Kalamboli,KLMG,Kalamboli Goods Shed,KLAD,Kalanad H,KLNK,Kalanaur Kalan,KLGN,Kalangani,KNZ,Kalanour,KNL,Kalanwali,KPP,Kalapipal,KALS,Kalasa H,KCM,Kalasamudram,KAVR,Kalavoor,KIY,Kalayat,KCF,Kalchini,KLDI,Kaldhari,KM,Kalem,KCP,Kalgupur,KGIH,Kalgurki H,KAH,Kalhar,KSH,Kali Sindh,KAP,Kalianpur,KLJI,Kalijai Ph,KLKR,Kalikapur F,KCI,Kalikiri,KLNT,Kalinagar,KLNP,Kalinarayanpur Jn,KPK,Kalipahari,KISN,Kalisen Ph,KLWD,Kalitalavdi,KAJ,Kaliyaganj,KLK,Kalka,KKGT,Kalkalighat,KLGM,Kallagam,KKPM,Kallakkudi Palanganatham,KAL,Kallal,KUL,Kallayi,KIC,Kallidai Kurichi,KGD,Kalligudi,KLYH,Kallur Yedahalli H,KLU,Kalluru,KSWR,Kalmeshwar,KLTR,Kalmitar,KLL,Kalol,KFC,Kalpattichatram,KPI,Kalpi,KVS,Kalsur H,KAO,Kalubathan,KAV,Kalumna,KLG,Kalunga,KAPG,Kalupara Ghat,KLVA,Kalva,KLWN,Kalwan H,KXE,Kalyan Chak,KYN,Kalyan Jn,KLYG,Kalyani Ghoshpara,KYI,Kalyani Jn,KLYS,Kalyani Silpanchal,KLYM,Kalyani Simanta,KYNT,Kalyankot,KYP,Kalyanpur,KPRD,Kalyanpur Road,KYQ,Kamakhya Jn,KAMG,Kamakhyaguri,KMP,Kamalapur,KKM,Kamalapuram,KLJ,Kamalganj,KMNR,Kamalnagar,KLPG,Kamalpur,KAMP,Kamalpur H,KMPH,Kamalpur Halt,KMLR,Kamalur,KARD,Kaman Road,KXL,Kamarbandha Ali,KMC,Kamareddi,KMGH,Kamarganj,KQU,Kamarkundu,KQLS,Kamarkundu (Lower),KSM,Kamasamudram,KMAH,Kamathe,KBI,Kambarganvi,KMLI,Kamli,KMRA,Kamnara,KXF,Kampil Road,KP,Kamptee,KWM,Kampur,KKET,Kamrup Khetri,KMST,Kamshet,KAMA,Kamta Halt,KML,Kamtaul,KNAD,Kanad,KNBR,Kanaibazar,KNKT,Kanakot,KKU,Kanakpura,KNLE,Kanale H,KNLS,Kanalus,KNLP,Kanamalopalle,KNRN,Kanaroan,KASR,Kanas Road,KNSR,Kanasar,KUT,Kanauta,KNC,Kanchanpur Road,KNS,Kanchausi,CJ,Kanchipuram,CJE,Kanchipuram East,KPA,Kanchrapara,KDZ,Kandaghat,KDMD,Kandambakkam,KNDR,Kandari,KDRP,Kandarpur,KDLR,Kandel Road,KDHN,Kandharan H,KQL,Kandhla,KILE,Kandivli,KND,Kandra,KNDI,Kandrori,KAWL,Kandwal,KGKD,Kang Khurd,KGX,Kanginhal,KGRA,Kangra,KGMR,Kangra Mandir,KNDG,Kanhadgaon,KNHP,Kanhaipur,KNHN,Kanhan Jn,KZE,Kanhangad,KNRG,Kanhargoan Naka,KNHE,Kanhe,KNGN,Kanhegaon,KWB,Kanhiwara,KANJ,Kanij,KNM,Kanimahuli P H,KNNK,Kanina Khas,KNYR,Kaniuru H,KNB,Kaniyambadi,KXP,Kaniyapuram,KBRV,Kanjari Boriyavi,KJKD,Kanjikode,KPTM,Kanjiramittam,KXB,Kanjiya,KJMG,Kanjur Marg,KKAH,Kankaha,KHE,Kankather,KKW,Kankavli,KKA,Kanki,KNR,Kankinara,KMZA,Kankra Mirzanagar,KDL,Kankroli,KMM,Kannamangalam,KPQ,Kannapuram,KJN,Kannauj,KJNC,Kannauj City F,CAPE,Kanniyakumari,KNJJ,Kannjara H,CAN,Kannur (Cannanore),KANO,Kanoh,KFN,Kanor,CPA,Kanpur Anwarganj,CPB,Kanpur Bridge Rb,CNB,Kanpur Central Jn,KXN,Kansbahal,KANS,Kansiya Nes,KSQ,Kanspur Gugauli,QSR,Kansrao,KIZ,Kansudhi,KBJ,Kantabanji,KTD,Kantadih,KPL,Kantakapalle,KTKS,Kantakosh H,KNT,Kanth,KTLR,Kanthalia Road H,KATI,Kanthi F S,KTI,Kanti,KIW,Kanwalpura,KAWT,Kanwat,KAOT,Kaotha,KVNJ,Kapadvanj,KPLD,Kapali Road Ph,KPNA,Kapan H,KVC,Kaparpura,KIN,Kapasan,KIS,Kapilas Road,KFI,Kappil,KPZ,Kapren,KEH,Kapsethi,CPJ,Kaptanganj Jn,KPDH,Kapurdha,KXH,Kapurthala,KTNI,Kapustalni,KRBO,Karaboh,KDHA,Karachha,KRD,Karad,CRR,Karagola Road,KHDH,Karahdih H,KKRH,Karahiya H,KIK,Karaikal,KKDI,Karaikkudi Jn,KARK,Karaikkurichchi,KRLR,Karaila Road Jn,KAY,Karaimadai,KHV,Karainthi,KJG,Karajgi,KKB,Karak Bel,KRKD,Karakad,KVLS,Karakavalasa,KEB,Karambeli,KMS,Karamnasa,KRYR,Karamsad,KRMA,Karamtolla,KRJA,Karanja,KRJT,Karanja Town,KFD,Karanjadi,KNJI,Karanjali H,KAJG,Karanjgaon,KPO,Karanpura,KPTO,Karanpurato,KRAP,Karapa,KFY,Karapgaon,KRQ,Karari,KSGL,Karasangal,KWO,Karauta,KRV,Karavadi,KBN,Karbigwan,KCN,Karchana,KYW,Karchhue H,RDI,Kardi,KBGH,Karea Kadambagachi,KY,Kareli,KEG,Karengi,KRA,Karepalli Jn,KRPR,Karepur H,KRGN,Kargaon Halt,KGB,Kargi Road,KYX,Karhiya Bhiadeli,KGW,Kariganuru,KYY,Kariha H,KXJ,Karimganj Jn,KRMR,Karimnagar,KMDR,Karimuddinpur,KRS,Karisath,KJRM,Karjanagram,KJRA,Karjara,KRJR,Karjara,KJT,Karjat,KRJD,Karjoda,KRTA,Karkatta,KKI,Karkeli,KRKN,Karkend Bh,KEK,Karkheli,KRMB,Karmabad,KMV,Karmad,KMHT,Karmahat,KRMI,Karmali,CRLM,Karmelram,KAR,Karna,KNSN,Karna Subarna,KUN,Karnal,KRNN,Karnauti H,KRON,Karona H,KOA,Karonda,KJZ,Karonji,KRTR,Karota Patri H,KPGM,Karpoorigram,KRRA,Karra,KSDE,Karsindhu H,KRE,Kartarpur,KKNH,Karukhirharnagar H,KUC,Karukkutty,KPY,Karunagapalli,KGZ,Karunguzhi,KYR,Karuppatti,KPPR,Karuppur,KRR,Karur,KVLR,Karuvalli,KVTA,Karuvatta H,KWD,Karwandiya,KAWR,Karwar,KSRA,Kasara,KGQ,Kasaragod,KSWD,Kasarwadi,KUB,Kasba,KBSN,Kasbe Sukene,KEE,Kaseetar,KSJF,Kasganj,KJC,Kasganj City,KSJ,Kasganj Jn,KEI,Kashi,KSC,Kashi Chak,KSBI,Kashiabari,KHGR,Kashinagar H,KNGR,Kashinagar Ph,KPV,Kashipur Jn,KSUA,Kashipura,KSPR,Kashipura Sarar,KSTH,Kashti,KSK,Kasimkota,KCJ,Kasimpur H,KSTA,Kastha,KKMB,Kastla Kasmabad H,KTBR,Kasturba Nagar,KSR,Kasturi H,KASU,Kasu,KBU,Kasu Begu,KXX,Kata Road,KTHE,Katahri,KTDD,Kataiya Dandi H,KTLP,Katalpur H,KGE,Katangi,KTKD,Katangi Khurd,KZW,Katar Singh Wala,KTRH,Katareah,KTP,Katepurna,KGF,Katghar,KKT,Kath Kuiyan,KTJI,Kathajori Ph,KTNA,Kathana,KTRR,Kathara Road,KGM,Kathgodam,KAVM,Kathivakkam,KTLA,Kathkola,KTAL,Kathlal,KEJ,Kathleeghat,KTHL,Kathola H,KTHU,Kathua,KNG,Kathunangal,KTWS,Kathuwas,KIR,Katihar Jn,KFK,Katka,KTE,Katni Jn,KMZ,Katni Murwara,KTES,Katni South Cabin,KTCE,Katoghan,KATL,Katol,KTO,Katora,KTRD,Katosan Road,KPD,Katpadi Jn,KFH,Katphal,KEA,Katra Up,KTH,Katrasgarh,CTM,Kattangulatur,KTTR,Kattur,KTDA,Katuda,KWF,Katwa,KWAE,Katwa Jn,KQQ,Kaukuntla,KLI,Kauli,KLSX,Kaulseri,KUF,Kaurah,KAA,Kaurara,JKI,Kauria Jungle H,KVE,Kavalande H,KVZ,Kavali,KVN,Kavanur,KVP,Kavaraippettai,KVA,Kavas,KVK,Kavathe Mahankal,KVM,Kavutaram,KWGN,Kawargaon,KZY,Kayalpattinam,QMRS,Kayamsar,KYJ,KayankulamJn,KAYR,Kayar,KTGM,Kayasthagram,KV,Kayavarohan,KAYI,Kaydi Halt,KZK,Kazhakuttam,KM26,Kazipara,KZPE,Kazipara Halt,KZJ,Kazipet Jn,KZJT,Kazipet Town,KCKI,Kechki,KDG,Kedgaon,KRUR,Keeranur,KKG,Kekatumar,KEV,Kela Devi,KMLM,Kelamangalam,KEP,Kelanpur,KLY,Kelavi,KLOD,Kelod,KLV,Kelve Road,KEZ,Kelzar,KEM,Kem,KEMP,Kempalsad H,KEMR,Kemri H,KCLA,Kenchanalu H,KNPS,Kendposi,KNPR,Kendrapara Road,KDRI,Kendri,KED,Kenduapada,KDJR,Kendujhargarh,KDKN,Kendukana,KGI,Kengeri,KLZ,Keolari,KCT,Kerakat H,KPJG,Kerejanga,KDM,Kesamudram,KXZ,Kesariya Road,KSVM,Kesavaram H,KSBP,Keshabpur,KVJ,Keshavganj,KSD,Keshod,KOLI,Kesholi,KPTN,Keshorai Patan,KSHR,Keshwari Bh,KSNG,Kesinga,KSLA,Kesla,KES,Kesri,KESR,Kesri Singhpur,KHLL,Ketohalli H,KDY,Kettandapatti,KXT,Ketti,KTGA,Keutguda,KVO,Kevdi Road,KR,Kevedi,KBKN,Khabra Kalan,KUH,Khachrod,KZA,Khada,KDPA,Khadapa,KDT,Khadarpet,KDV,Khadavli,KK,Khadki,KDBR,Khadki Bazar H,KDSB,Khadur Sahib H,KGA,Khaga,KGG,Khagaria Jn,KGLE,Khagraghat Road,KIQ,Khai Phemeki,KHA,Khaigaon,KB,Khairabad Avadh,KADH,Khairadih H,KYH,Khairah,KHRY,Khairahi,KID,Khairar Jn,KQD,Khairatabad,KYBR,Khairatiya Bandh Road H,KHR,Khairee,KRRI,Khairranji,KRH,Khairthal,KJI,Khajauli,KHJ,Khajraha,KURJ,Khajuraho,KJA,Khajurhat,KAW,Khajuri,KJW,Khajwana,KKK,Khakhraiya,KKR,Khakhrala Road,KLRE,Khalari,KHPL,Khaliapali,KLD,Khalilabad,KIP,Khalilpur,KSF,Khalispur,KIT,Khallikot,KTJ,Khaltipur,KMNN,Khamanon,KMAE,Khamargachhi,KMBL,Khambhaliya,CBY,Khambhat,KVH,Khambhel,KBK,Khambli Ghat,KMN,Khamgaon,KMKD,Khamkhed,KMT,Khammam,KAN,Khana Jn,KNP,Khanapur,KAD,Khandala,KBH,Khandbara,KNDL,Khandel,KHDI,Khanderi,KNDS,Khandeshwar,KYO,Khandikar,KNDP,Khandip,KZI,Khandrawali H,KNW,Khandwa Jn,KHJA,Khanja H,KNN,Khanna,KHBJ,Khanna Banjari,KNF,Khanodih,KHNP,Khanpur,KNAR,Khanpur Ahir,KHF,Khantapara,KHN,Khanyan,KRI,Khapri,KPKD,Khaprikheda,KHAR,Khar Road,KRXA,Khara,KRKM,Khara Kameri,KGP,Kharagpur Jn,KRHT,Kharahat,KHRK,Kharak,KARR,Kharar,KRZ,Kharawar,KHBV,Kharbav,KDH,Khardaha,KE,Khardi,KHRS,Khareshwar Road,KHAG,Kharghar,KIA,Khari Amarpura,KJLU,Khari Jhalu,KXG,Kharia Khangarh,KRPA,Khariapipra H,KAPP,Khariapipra Halt,KRAR,Khariar Road,KHQ,Kharik,KQY,Kharikatia,KARO,Khario P H,KHRI,Kharkhari,KXK,Kharkhauda,KPB,Kharpokhra,KRSA,Kharsaliya,KHS,Kharsia,EC31,Kharuara H,KRW,Kharwa,KRCD,Kharwa Chanda,KSA,Khasa,KHAT,Khat,KAT,Khatauli,KHTG,Khatgaon,KHMA,Khatima,KWP,Khatipura,KHHJ,Khatkar Kalan Jhandaji,KATB,Khatkura P H,KHTU,Khatu,KHED,Khed,KDBM,Khed Brahma,KHTX,Khed Temple,KQW,Kheduli,KEX,Khekra,KEMK,Khem Karan,KSO,Khemasuli Ph,KLH,Khemli,KHKN,Khera Kalan,KHSN,Khera Sandhan H,KRU,Kheralu,KSW,Kheri Salwa,KL,Kherli,KHW,Kheroda,KOY,Kherol,KW,Khervadi,KS,Kheta Sarai,KSHT,Khetia,KIRP,Khidirpur,KJV,Khijadiya Jn,KZQ,Khimel,KHAI,Khirai,KUX,Khirasdoh Jn,KITN,Khiri Town,KIE,Khiria Khurd H,KKN,Khirkiya,KHD,Khodiyar,KHDB,Khodiyar,KDMR,Khodiyar Mandir,KOI,Khodri,KSIH,Khodseoni,KHOH,Khoh,KBY,Khoirabari,KJP,Khojeepura,KWJ,Khojewala,KGS,Khongsara,KCR,Khonker,KHPI,Khopoli,KHC,Khorana,KRND,Khorason Road,KORI,Khori,KHKT,Khotkhoti,KOWN,Khowang,KBGN,Khubgaon,KDJ,Khudaganj,KZX,Khudda Korala,KRBP,Khudiram Bose Pusa,KHDP,Khudlapur F,KUKA,Khui Khera,KURN,Khukrana H,KDRD,Khuldil Road,KJL,Khumgaon Burti,KUTI,Khumtai,KDF,Khundaur,KKNA,Khunkhuna,KRT,Khurahat,KYE,Khurai,KUR,Khurda Road Jn,KUPR,Khurdpur,KHU,Khurhand,KWE,Khurial,KJY,Khurja City,KRJ,Khurja Jn,KVD,Khurmabad Road,KAMR,Khurrampur H,KSNR,Khushal Nagar F,KOO,Khusropur,KSBG,Khusta Burzurg,KTHA,Khutaha,KHTN,Khutauna,KTT,Khutbav,KTZ,Khutuwansa,KHH,Kichha,KYG,Kidiyanagar,KKRD,Kikakui Road,KKY,Kila Kadaiyam,QRP,Kila Raipur,KZH,Kila Zafargarh,KLWL,Kilanwali Punjab,KLQ,Kilikollur,KII,Kille,KIM,Kim,KIU,Kinana,KCE,Kings Circle,KQV,Kinkhed,KNVT,Kinwat,KRDL,Kirandul,KLB,Kiraoli,KRTH,Kiratgarh,KART,Kiratpur Sahib,KER,Kiriharapur,KOV,Kirloskarvadi,KMMD,Kirmiti Mendha,KRC,Kiroda,KDTR,Kirodimalnagar,KRTN,Kirtinagar H,KMNP,Kishan Manpura,KNE,Kishanganj,KSG,Kishangarh,KGBS,Kishangarh Balawas,KSP,Kishanpur,KONY,Kisoni,KSTE,Kistamsettipalli,KITA,Kita,KXM,Kitham,KIUL,Kiul Jn,KWI,Kivarli,KIB,Kizha Ambur,KYZ,Kizha Puliyur,KVL,Kizhvelur,KFX,Kochewahi,KCVL,Kochuveli,KAG,Kodaganur,KQN,Kodaikkanal Road,MKK,Kodambakkam,KJJ,Kodavaluru,KQR,Koderma,KQRT,Koderma Town,KODI,Kodi,KDGH,Kodigehalli H,KDBA,Kodimbala H,KODR,Kodinar,KMD,Kodumudi,KODN,Kodumunda H,KOU,Koduru,KWR,Koelwar,KFU,Kohand H,KRSW,Kohar Singh Wala,KDK,Kohdad,KOHR,Kohir Deccan,KOHL,Kohli,KEPR,Koiripur,KOKA,Koka,KXD,Kokalda,KKPR,Kokpara,KOJ,Kokrajhar,KOL,Kolad,KIG,Kolaghat,KLGR,Kolaigaon,KLX,Kolakalur H,KAQ,Kolanukonda H,KQZ,Kolar,KLRS,Kolaras,KLS,Kolatur,KLYT,Kolayat,KFF,Kolde,KLHD,Kolhadi,KOAA,Kolkata,QLN,Kollam Jn (Quilon),CLN,Kollidam,KKTA,Kollikhutaha H,KOLR,Kolnur,KVGM,Kolvagram,KLVR,Kolvihir,KMK,Komakhan,KMQA,Komali,KMX,Komatipalli,KONA,Kona Ph,KGVE,Konagavalli H,KRNU,Konanur H,KNH,Konch,KQA,Kondagunta,KI,Kondapalli,KDP,Kondapuram,KDGL,Kondrapole H,KOG,Konnagar,KONN,Konnur H,KPS,Kopa Samhota,KPJ,Kopaganj H,KPLE,Kopai,KOPR,Kopar,KPHN,Kopar Khairna,KPG,Kopargaon,KFA,Koparia,KPLR,Koparlahar,KBL,Koppal,KDE,Koradacheri,KRDH,Koradih,KRHA,Korahia,KRIH,Korai,KRNH,Koranahalli H,KRPU,Koraput Jn,KURO,Korari,KRAN,Koratti Angadi,KOTR,Korattur,KRBA,Korba,KRG,Koregaon,KOK,Korukkupet,KUK,Korukonda,KSE,Kosad,KSAI,Kosadi,KSAE,Kosai,KSB,Kosamba Jn,KO,Kosgi,KSV,Kosi Kalan,KVQ,Kosiara,KSI,Kosli,KOZ,Kosma,KTF,Kot Fateh,KKP,Kot Kapura Jn,KOTA,Kota Jn,KBM,Kotabommali,KTKA,Kotakadra H,KEN,Kotala H,KLP,Kotalpukur,KTOA,Kotana,KPRR,Kotapar Road,KRL,Kotarlia,KTW,Kotdwara,KGH,Kotegangur Halt,KTGO,Kotgaon H,KTGD,Kotha Gangad,KTPK,Kotha Pakki H,KLNA,Kothana H,KPHI,Kothapalli,KTR,Kothar,KTHD,Kothari Road,RKY,Kothariya,KOTI,Koti,KQK,Kotikulam,KPLH,Kotipalli,KOLA,Kotla,KTGN,Kotla Gujran,KTKH,Kotlakheri,KTKL,Kotli Kalan H,KTMA,Kotma,KTSH,Kotmi Sonar H,KTRA,Kotra,KSX,Kotshila,KPLL,Kotta Pandillapalli H,KTCR,Kottacheruvu,KTYR,Kottaiyur,KYOP,Kottapalli H,KKZ,Kottarakara,KTV,Kottavalasa,KTYM,Kottayam,KOTT,Kottur H,KTPM,Kotturpuram,KTY,Kotturu,CVP,Kovilpatti,KOVH,Kovvada,KVR,Kovvuru,KYV,Koyilvenni,CLT,Kozhikode (Calicut),KSN,Krishna,KBSH,Krishna Ballabh Sahay,KCC,Krishna Canal Jn,KCV,Krishna Chandrapur,KRNI,Krishnai,KEF,Krishnammakona,KRXM,Krishnamohan H,KNJ,Krishnanagar City Jn,KRP,Krishnapur,KPU,Krishnapuram,KRNR,Krishnarajanagar,KJM,Krishnarajapuram,KJS,Krishnarajasagara,KRSL,Krishnashila,KADR,Ksaiyadra,KZS,Kuakhera H,KXA,Kuanriya,KRMD,Kuarmunda,KBP,Kuberpur,KUCE,Kuchai,KMNC,Kuchaman City,KUCH,Kuchavaram H,QXR,Kuchesar Road,KCA,Kuchman,KUD,Kudachi,KUDL,Kudal,KSAR,Kudala Sangama Road H,KON,Kudalnagar,KDN,Kudatini,KDGI,Kudgi H,KXO,Kudikadu,KUDN,Kudni,KTQ,Kudra,KDSD,Kudsad,KUHI,Kuhi,KUU,Kuhuri,KKRV,Kukarvada,KEMA,Kukma H,KFP,Kukurakhapa,KUI,Kulali,KIJ,Kuldiha,QLM,Kulem,KGY,Kulgachia,KULH,Kulha H,KUA,Kulharia,KU,Kulikarai,KLT,Kulitalai,KZT,Kulitthurai,KZTW,Kulitturai West,KLAR,Kulpahar,KLW,Kulpi F,KASH,Kultham Abdulla Shah H,ULT,Kulti,KZC,Kulukkallur,KLA,Kulwa,KMGE,Kumahu,KMSD,Kumar Sadra,KRMG,Kumaramangalam,KFQ,Kumaranallur,KPM,Kumarapuram,KUMB,Kumarbagh,KMME,Kumardubi,KMRJ,Kumarganj,KUGT,Kumarghat,KMTI,Kumarhatti Dagshai,KRMP,Kumaripur Halt,KMU,Kumbakonam,KUMM,Kumbalam,KWMD,Kumbhawas Mundhalia Dabri H,KHRJ,Kumbhraj,KMQ,Kumbla,KDPR,Kumedpur,KMND,Kumendi,KMI,Kumhari,KMEZ,Kumharmarenga,KBQ,Kumrabad Rohini,KADL,Kumradol,KMRL,Kumrui Ph,KMSI,Kumsi H,KT,Kumta,KTKR,Kumtha Khurd,KUND,Kund,KHNM,Kunda Harnamganj,KDLG,Kundalgarh,KVG,Kundanganj,KUDA,Kundapura,KUV,Kundara,KFV,Kundara East,KD,Kundarkhi,KDER,Kunder H,KNO,Kundgol,KDHL,Kundhela,KDI,Kundli,KDUH,Kunduru,KWC,Kundwa Chainpur,KNRT,Kuneru,KKV,Kunkavav Jn,KZU,Kunki B H,KNNT,Kunnathur,KJU,Kuntighat,KNRI,Kunuri,KUW,Kunwar,KUP,Kup,KGL,Kupgal,KPN,Kuppam,KBA,Kurabalakota,KORL,Kural,KRLI,Kurali,KUM,Kuram,KRGA,Kuranga,KKS,Kurasti Kalan,KRO,Kurawan,KBE,Kurbhar,KWV,Kurduwadi,KUQ,Kuretha,KQT,Kurgunta,KHI,Kurhani,KIF,Kuri,KXR,Kuria,KCD,Kurichedu,KFE,Kurikad,KJPD,Kurinjipadi,KRKR,Kurkura,CLA,Kurla Jn,KRLS,Kurlasi,KRNT,Kurnool Town,KRYA,Kurraiya,KUE,Kursela,KGN,Kurseong,KRX,Kurud,KKDE,Kurukshetra Jn,KZB,Kurumbur,KXI,Kurumurthi,KRPP,Kuruppantara,KURV,Kurva,KIKA,Kurwai Kothora,KLSP,Kushalpura,KTA,Kushtala,KSY,Kusiargaon,KCB,Kuslamb,KHM,Kusmhi,KSU,Kustaur,KUG,Kusugall,KVX,Kusumbhi,KSMB,Kusumha Bihar H,KYS,Kusumkasa,KDS,Kusunda Jn,KWW,Kuswa H,KOQ,Kuthur H,KTM,Kutralam,KKTI,Kuttakudi,KTU,Kuttippuram,KUTL,Kuwanthal,KPCM,Kuwarchintawanpur H,KRKP,Kyarkop,KTK,Kyatanakeri Road H,KIAT,Kyatsandra,LBN,Laban,LAV,Labha,LBTL,Labutala H,LAC,Lachhipura,LNH,Lachhmangarh Sikar,LMN,Lachhmanpur,LIR,Lachmipur H,LHN,Lachyan,LDX,Ladda,LDVD,Laddivadi,LDW,Ladhowal,LDK,Ladhuka,LDD,Ladkhed,LAU,Ladnun,LR,Ladpura,LGCE,Lagargawan,LHB,Lahabon,LT,Lahavit,LSI,Laheria Sarai,LH,Lahing,LHLL,Lahli,LHL,Lahoal,LMM,Lailakh Mamalkha,LB,Lain Bazar,LPNR,Lajpat Nagar,LKZ,Lakadiya,LKPL,Lakdi Ka Pul,LKF,Lake Garden F,LKBL,Lakhabawal,LEK,Lakhakera,LMC,Lakhamanchi,LNW,Lakhanwada,LAA,Lakhapat,LKE,Lakheri,LKW,Lakhewali,LMP,Lakhimpur,LKY,Lakhmapur,LKN,Lakhminia,LKNA,Lakhna,LAK,Lakho,LCK,Lakhochak H,LAE,Lakholi,LKNR,Lakhpat Nagar,LPU,Lakhpuri,LTR,Lakhtar,LKKD,Lakkadkot,LDY,Lakkiti,LKD,Lakodra,LRJ,Laksar Jn,LXD,Lakshannath Road,LMNR,Lakshmibai Nagar,LIJ,Lakshmiganj,LKPR,Lakshmikantapur,LKSH,Lakshminarayanapuram H,LKX,Lakshmipur,LKB,Lakshmipur Bhorang,LKMR,Lakshmipur Road,LXA,Lakwa,LLKN,Lal Kalan,LP,Lalapet,LUA,Lalauri Khera,LLD,Lalawadi,LBZ,Lalbagh,LCAE,Lalbagh Court Road,LLJ,Lalganj,LBT,Lalgarh Bihar H,LGH,Lalgarh Jn,LGL,Lalgola,LGO,Lalgopalganj,LLI,Lalgudi,LLPR,Lalit Lachmipur,LAR,Lalitpur,LKU,Lalkua Jn,LGDH,Lallaguda Gate H,LLR,Lalpur,LPJ,Lalpur Jam,LRU,Lalpur Umri,LLU,Lalru,LNA,Lamana,LBA,Lambhua,LMA,Lambiya,LKG,Lamsakhang,LTA,Lamta,LDR,Landaura,LNP,Langarpeth,LCT,Langcholiet,LNJ,Langhnaj,LJR,Lanjigarh Road,LKA,Lanka,LKDU,Lankalakoderu H,LPN,Laopani,LPG,Lapanga,LRD,Lar Road,LRB,Larabad Bh,LS,Lasalgaon,LSE,Laseri,LSN,Lasina,LSR,Lasur,LBO,Latabor,LTHR,Lateher,LTMD,Latemda,LAT,Lathi,LTD,Lathidad,LTK,Lathikata,LTI,Latteri,LUR,Latur,LTRR,Latur Road,LKQ,Laukaha Bazar,LAUL,Laul,LSGS,Lavan Satyagrah Smarak P H,LSG,Lawa Sardargarh,LYD,Layabad,LDM,Ledarmer,LEDO,Ledo,LGN,Lehgaon,LER,Lehra F,LHA,Lehra Gaga,LHM,Lehra Muhabbat,LLGM,Lelligumma,LEB,Lemuabad H,LDA,Lidora Khurd,MLHS,Light House,LRI,Lihuri Ph,LPR,Lilapur Road,LMO,Liliya Mota,LLH,Liluah,LMU,Limarua,LMB,Limbara,LM,Limbdi,LBG,Limbgaon,LBD,Limbodra,LMK,Limkheda,LCH,Linch,LING,Ling,LIG,Linga,LIN,Lingamguntla,LPI,Lingampalli,LMD,Linganenidoddi,LGTR,Lingaraj Temple Road Ph,LGRE,Lingiri,LNT,Lingti,LDE,Lodhikhera,LOM,Lodhma,LDCY,Lodi Colony,LDP,Lodipur Bishenpur H,LRA,Lodra,LOHA,Loha,LHNA,Lohanda H,LAP,Lohapur,LAD,Lohardaga Bs,LPW,Loharpurwa H,LHU,Loharu Jn,LHW,Loharwara,LOG,Lohgara,LNK,Lohian Khas Jn,LNO,Lohna Road,LHD,Lohogad,LOT,Lohta,LSX,Loisingha,LVR,Lok Vidyapith Nagar H,LKMN,Lokmanya Nagar,LTT,Lokmanyatilak T,LOK,Loknath,LCR,Lokur,LOL,Loliem,LO,Loliya,LNN,Lonand,LNL,Lonavla,LD,Londa Jn,LPTA,Longpatia,LONI,Loni,LOA,Lorha,LW,Lorwada,LAN,Lotana,LPH,Lotapahar,LTV,Lotarva,LHBK,Lothal Bhurkhi,LOGH,Lotte Gollahalli H,LOV,Lovedale,PL,Lower Parel,LWJ,Lowjee,LKR,Luckeesarai Jn,LC,Lucknow City,LKO,Lucknow Jn,LJN,Lucknow Ne,LDH,Ludhiana Jn,LWS,Lukwasa,LMG,Lumding Jn,LUNI,Luni Jn,LNR,Luni Richha,LDU,Lunidhar,LKS,Lunkaransar,LXR,Lunsariya,LNS,Lunsu H,LUSA,Lusa,LSD,Lusadiya,LAL,Lushala,LKK,Lyalpur Khalsa College Jalandhar H,MABN,Maban,MABB,Mabbi H,MZY,Machapur Bh,MCV,Macharya,MCVM,Machavaram H,MCLA,Macherla,MSL,Machhalandapur,MKRD,Machhkunda Road,MHRI,Machhrauli,MTM,Machilipatnam,MCY,Machriawan H,MML,Madan Mahal,MPL,Madanapalle Road,MDPJ,Madanapur H,MNC,Madankata H,MPJ,Madanpur,MD,Madar,MDJN,Madar Jn,MFX,Madaraha,MDT,Madarihat,MKR,Maddikera,MAD,Maddur,MAO,Madgaon,MA,Madha,MDBP,Madhabpur H,MDHA,Madhada,MDVR,Madhavnagar,MDRR,Madhavnagar Road,MID,Madhi,MDR,Madhira,MAH,Madhoganj,MDPB,Madhopur Punjab,MBS,Madhosingh,MDUN,Madhranagar,MDSE,Madhu Sudanpur,MBI,Madhubani,MDKD,Madhukunda,MDP,Madhupur Jn,MMG,Madhyamgram,MPN,Madhyampur,MCL,Madimangalam,MLDE,Madlauda,MPD,Madpur,MDKI,Madukarai,MES,Madurai East,MDU,Madurai Jn,MMK,Madurantakam,MADR,Madure H,MWRN,Madwarani,MAEL,Mael,MWF,Magardaha,MGRD,Magardoh,MGRR,Magarpur,MGW,Magarwara,MHH,Maghar,MGSJ,Magnesite Jn,MUG,Magra,MGT,Magra Hat,DC,Magudanchavadi,MCZ,Mahabuang,MBNR,Mahabubnagar,MHBT,Mahabubnagar Town H,MMH,Mahadanapuram,MDVK,Mahadeokhedi,MHBG,Mahadeva Buzurg H,MXW,Mahadevasal Ph,MHDP,Mahadevpura,MHDB,Mahadia Ph,MHDA,Mahadiya,MHJ,Mahajan,MX,Mahalakshmi,MFM,Mahalam,MMV,Mahali Marup,MMC,Mahamandir,MHN,Mahanadi,MANG,Mahanagar,MBC,Mahananda Bridge,MGWD,Mahangarwal Doaba,MWR,Mahansar,MGZ,Maharajganj,MWP,Maharani Pachchim,MSMD,Mahasamund,MVKR,Mahawan Khor H,MABD,Mahbubabad,MAHE,Mahe,MYJ,Maheji,MHD,Mahemadavad Kheda Road,MHRG,Mahendragarh,MHLN,Mahendralalnagar,MHRN,Mahendranath H,MDVE,Mahendravadi,MSH,Mahesana Jn,MSK,Mahesh Khunt,MHLT,Mahesh Leta H,MMD,Maheshamunda,MVV,Maheshi,MHSA,Maheshpur Halt,MSSD,Maheshri Sandhuan,MHHR,Mahesra H,MGWN,Mahgawan H,MEP,Mahidpur Road,MIKD,Mahikhand Halt,MM,Mahim Jn,MHMB,Mahimba H,MPLE,Mahipal H,MPLR,Mahipal Road,MSDL,Mahisadal,MGO,Mahisgaon,MWZ,Mahishadahari,MHPR,Mahiyarpur,MKZ,Mahkepar Road,MMB,Mahmudabad Avadh,MBA,Mahoba,MAHO,Maholi UP,MHO,Mahpur,MHRL,Mahrail,MFH,Mahrauli,MWUE,Mahrawal,MFQ,Mahroi,MHBZ,Mahtha Bazar H,MMLN,Mahuamilan,MXY,Mahuariya,MUUA,Mahuawa Khurd H,MHUA,Mahudha,MUGA,Mahugarha,MZB,Mahuli,MH,Mahuri H,MUGN,Mahutgaon,MHV,Mahuva Jn,MWW,Mahwa,MHL,Mahwal,IAM,Mai H,MYR,Maihar,MIR,Maijapur,MINJ,Maikalganj,MTL,Mailam,MLN,Mailani Jn,MWY,Mailaram,MNQ,Mainpuri,MPUE,Mainpuri Kacheri H,MBO,Mairabari,MW,Mairwa,MASK,Maisar Khana,MTO,Maitha,MVRD,Maivadi Road,MJBT,Majbat,MJT,Majerhat,MZQ,Majgaon Assarn,MNHL,Majhairan Himachal,MJHL,Majhaula H,MZHL,Majhauli,MIJ,Majhdia,MAJ,Majhergram,MJG,Majhgawan,MJGP,Majhgawanphatak,MJHR,Majhiari,MJZ,Majhola Pakariya,MJL,Majhowalia,MJTA,Majitha,MPNH,Majnupur Nawada H,MJO,Majorda,MJRI,Majri Jn,MJNL,Majri Nangal,MJH,Maju PH,MAYA,Makakhad,MKL,Makalidurg,MU,Makansar,MDC,Makardaha,MPR,Makarpura,MKWI,Makarwadi Halt,MDE,Makhdumpur Gaya,MKHI,Makhi,MXH,Makhu,MKJ,Makkajipalli,MNR,Makkhanpur,MKN,Makrana Jn,MKLI,Makrauli,MKRA,Makrera,MKRN,Makronia,MKC,Maksi,MKDI,Makudi,MJN,Makum Jn,MALA,Mala,MDD,Malad,MDDG,Maladgaon,MFZ,Malahar,MVA,Malakavemala,MKH,Malakhera,MXT,Malakpet,MLNH,Malancha,MLAR,Malanpur,MAAR,Malar,MLZ,Malarna,MLS,Malasa,MLT,Malatipatpur,MPE,Malatipur,MVL,Malavli,MLFC,Malda Court,MLDT,Malda Town,MGVK,Malegaon,MET,Malerkotla,MEQ,Malethu Kanak,MLG,Malhargarh,ML,Malhour,MVG,Maligura,MLD,Malihabad,MHTR,Malihati Talibpur Road,MKPT,Malikpeth,MAK,Malikpur,MLKP,Malikpur H,MLPR,Malipur,MLYA,Maliya H,MLHA,Maliya Hatina,MALB,Maliya Miyana Jn,MJF,Malkajgiri,MKU,Malkapur,MALK,Malkapur Road,MLK,Malkapuram,MLQ,Malkera Jn,MQR,Malkhaid Road,MLR,Malkhed,MAKR,Malkhedi,MLC,Malkisar,MWX,Mallanwala Khas,MLW,Mallanwan,MLGT,Mallapa Gate H,MLP,Mallapur,MLV,Mallarpur,MLSA,Mallasandra,MLMG,Mallemadugu,MWM,Malleswaram,NPML,Mallial Nukapalli,MKRH,Mallickpurhat,MVW,Mallividu,MYL,Malliyala,MY,Malliyam,MALR,Mallur,MOT,Malout,MLSU,Malsailu,MLSR,Malsar,MQS,Malsian Shahkot,MTDI,Maltekdi,MLM,Malthan,MLKA,Maluka,MXP,Malupota,MLO,Malur,MWH,Malwan,MBW,Malwara,MOM,Maman,MRM,Mamanduru,MBM,Mambalam,MMP,Mambalappattu,MMPR,Mamdapur Halt,MANA,Mana,SB04,Mana P H,MVF,Manabar,MKG,Manak Nagar,MNSR,Manaksar,MNM,Manamadurai Jn,MNZ,Manani,MNP,Mananpur,MOW,Mananwala,MPA,Manaparai,MRE,Manauri,MAF,Manavur,MCS,Mancheswar,MCLE,Manchili,MCI,Manchiryal,MNF,Manda Road,MGF,Mandagere,MDL,Mandal,MLGH,Mandalgarh,MDG,Mandalghat,MMZ,Mandamari,MDPD,Mandapadu H,MMM,Mandapam,MC,Mandapam Camp,MDLE,Mandar Hill,MDVB,Mandar Vidyapith H,MMS,Mandasa Road,MDVL,Mandavalli,MNDY,Mandaveli,MWC,Mandawali Chander Vihar H,MURD,Mandawar Mahwa Road,MYE,Mandhali,MDA,Mandhana Jn,MDH,Mandhar,ADR,Mandi Adampur,MABA,Mandi Bamora,MBY,Mandi Dabwali,MNDR,Mandi Dhanaura,MDDP,Mandi Dip,GVG,Mandi Gobind Garh,MNDH,Mandir Hasaud,MFR,Mandla Fort,MDB,Mandor,MDPA,Mandpiya,MXK,Mandrak,MDS,Mandsor,MUV,Manduadih,MNDA,Mandura,MAND,Mandurai,MWA,Mandwa,MYA,Mandya,MDGR,Manendragarh,MANE,Maneswar,MAM,Mangal Mahudi,MAG,Mangalagiri,MPT,Mangalampeta,MLI,Mangaliyawas,MAQ,Mangalore Central,MAJN,Mangalore Jn,MNX,Manganallur,MNI,Mangaon,MUM,Mangapatnam,MGPI,Mangarapatti Halt,MGLI,Mangli H,MGG,Mangliya Gaon,MGLP,Mangolpuri,MAZ,Mangra,MGRL,Mangrolia,MACR,Manguli Choudwar Ph,MXJ,Mangurjan,MHU,Manheru,MANI,Mani H,MNMU,Mani Mau,MIA,Mania,MGI,Manigachi,MGLE,Manigram,MHI,Manihari,MCF,Manik Chauri,MNKN,Manikalan H,MAGH,Manikgarh Jn,MKP,Manikpur Jn,MIK,Manikui,MAN,Maninagar,MIM,Maniram,MIYN,Maniyan,MJBK,Manjari Budruk,MCJ,Manjattidal,MJS,Manjeshwar,MJV,Manjhagarh,MJM,Manjhauli Gram H,MHT,Manjhi F,MNJR,Manjhlepur,MJPB,Manjhra Purab,MZW,Manjhwe H,MZZ,Manjuri Road,MUR,Mankapur Jn,MNAE,Mankar,MNY,Mankarai,MKB,Mankatha,MNKD,Mankhurd,MANK,Manki,MUU,Mankundu,MMR,Manmad Jn,MNUR,Mannanur,MQ,Mannargudi,MOB,Manoharabad,MNJ,Manoharganj,MOU,Manoharpur,MOA,Manopad,MPO,Manpur Jn,MPG,Manpur Nagaria,MSZ,Mansa,MANR,Mansarovar,MNS,Manshahi,MNE,Mansi Jn,MSP,Mansurpur,MMPL,Mantapampalle,MVH,Mantatti,MALM,Manthralayam Road,MANU,Manu,MBL,Manubolu,MUGR,Manuguru,MANW,Manwa H,MNWL,Manwal,MKBH,Manwala Kot Bakhtu,MVO,Manwath Road,MQN,Manyamkonda,MZGI,Manzoorgarhi,MADA,Maonda,MRDG,Maradanga,MHA,Marahra,MMNK,Maraimalai Nagar Kamarajar,MZV,Maralahalli,MJY,Maramjhiri,MRPL,Marampalli,MZU,Marandahalli,MAKM,Mararikulam,MXA,Marauda,MRG,Margherita,MEW,Marhaura,MAY,Mariahu,MAV,Mariammankovil,MXN,Mariani Jn,MRC,Marichethal,MKM,Marikuppam,MEL,Marine Lines,MIU,Maripat,MRYA,Mariyana,MRJD,Marjadwa,MKDN,Markadhana,MQQ,Markahandi Udadon,MRK,Markapur Road,MKO,Markona,MKD,Markundi,MRL,Maroli,MRF,Marpalli,MIPM,Marripalem Ph,MRV,Marsul,MR,Martur,MUQ,Marudur,MBGA,Marwar Bagra,MBSK,Marwar Balia,MBNL,Marwar Bhinmal,MBT,Marwar Bithri,MCPE,Marwar Chhapari,MJ,Marwar Jn,MKHR,Marwar Khara,KOF,Marwar Kori,MWT,Marwar Lohawat,MMY,Marwar Mathaniya,MDW,Marwar Mundwa,MRWS,Marwar Ranawas,MSQ,Marwar Ratanpura,MWJ,Marwasgram,ME,Masaipet,MUO,Masangaon,MSE,Masani,MSWA,Masaniwala,MSS,Masarahalli,MDCR,Masaudhi Court H,MST,Masit,MSD,Masjid,MSW,Maskanwa,MSDH,Masnadih,MSOD,Masodha,MXD,Masor Road,MHC,Masrakh,MSAE,Massagram,MSDN,Masudan,MSR,Masur,MTV,Matalkunta,MTAP,Matania Anantpur,MRQ,Matari,MZX,Matatila,MTH,Mataundh,MT,Matera,MTA,Mathela,MAE,Matheran,MTBG,Mathia Barghat H,MTIP,Mathnashipur,MADM,Mathradam Halt,MTUR,Mathur,MRT,Mathura Cant,MTJ,Mathura Jn,MUW,Mathurapur,MPRD,Mathurapur Road,MTRA,Matigara,MTB,Matlabpur,MTU,Matmari,MTND,Mattagajapur,MTN,Matunga,MRU,Matunga Road,MEM,Mau Aimma,MAU,Mau Jn,MRPR,Mau Ranipur,MZH,Mauhari,MLY,Maula Ali,MAUR,Maur,MRGM,Maurigram,MAA,Maval,MVPM,Maveliaplaiyam,MVLK,Mavelikara,MVC,Mavinkere,MVJ,Mavli Jn,MYK,Mayakonda,MYU,Mayanoor,MAYP,Mayapur,MAYR,Mayar,MV,Mayiladuturai Jn,MYPR,Maynapur,MYHT,Mayurhat H,MYY,Mayyanad,MZMA,Mazhom,MGME,Mccluskieganj,MCA,Mecheda,MCRD,Mecheri Road,MPU,Medapadu,MED,Medchal,MDRA,Medra,MENP,Meenapur,MUT,Meerut Cant,MTC,Meerut City Jn,MGN,Meghnagar,MGRP,Meghrajpura,MNO,Mehnar Road,MAI,Mehsi,MHUL,Mehuwala,MJA,Meja Road,MKY,Mekkudi,MEKM,Melakkonnakkulam,MP,Melappalaiyam,MLTR,Melattur Kerala,MEH,Melattur Tn,MLMR,Melmaruvathur,MLYR,Melnariyappanur,MBU,Melpattambakkam,MPI,Melpatti,MYM,Memari,MEU,Mendu H,MPLY,Meppuliyur,MQX,Meralgram,MRDL,Meramandali,MEC,Merta City,MTD,Merta Road Jn,MTFA,Mertala Phaleya H,MEE,Methai F,METR,Methi Tikur,MER,Metpanjra,MTP,Mettupalaiyam,MTE,Mettur,MTDM,Mettur Dam,MYX,Metyal Sahar Ph,MWE,Mewa Nawada,MZA,Mezenga,MWD,Mhasavad,MSDG,Mhasoba Dongargaon,MHOW,Mhow,MIAN,Miagram H,MNPR,Mianpur,MDN,Midnapore,MIW,Mighauna H,MIN,Mihinpurwa,MIH,Mihrawan,MIL,Milak,MQG,Milangarh,MIAL,Milavali H,MVN,Milavittan,MN,Minambakkam,MNL,Minchnal,MWG,Mindala,MNHA,Mindha,MJR,Minjur,MPLI,Minnampalli,MIRA,Mira Road,MRJ,Miraj Jn,MK,Miranpur Katra,MCQ,Mirchadhorhi,MIQ,Mirhakur,MQL,Mirkhal,MRTL,Mirthal,MRGA,Mirylaguda,MRZA,Mirza,MZC,Mirza Cheuki,MZL,Mirzapalli,MZP,Mirzapur,MBV,Mirzapur Bachhau,MBE,Mirzapur Bankipur,MSMI,Misamari,MFL,Mishrauli,MSTH,Misrikh Tirath,MSO,Misrod,MTI,Mitawali,MTWN,Mitewani Ph,MITA,Mitha,MTHP,Mithapur,MYG,Miyagam Karjan Jn,MYGL,Miyagam Karjan Jn,MINA,Miyana,MNKB,Miyon Ka Bara,MBH,Mobha Road,MDSA,Modasa,MG,Modelgram,MDNR,Modinagar,MLB,Modnimb,MDPR,Modpur,MON,Modran,MDKU,Modukuru H,MOGA,Moga,MXZ,Mohadara,MHAD,Mohadi Pragane Laling,MMDP,Mohamadpur,MQE,Mohammadkhera,MNGR,Mohan Nagar,MOJ,Mohana,MLJ,Mohanlalganj,MHUR,Mohanpur,MOPR,Mohanpura H,MONR,Mohanur,MPML,Mohapanimal,MJP,Moharajpur,MHF,Mohari,MXS,Mohasa,MBP,Mohibullapur,MMDL,Mohini Mandal,MOP,Mohitnagar,MOG,Mohiuddinnagar,MUZ,Mohiuddinpur,MHKT,Mohkhuti,MO,Mohol,MHPE,Mohope,MOY,Mohri,MHQ,Mohuda,MKSR,Mokalsar,MKA,Mokama Jn,MAKH,Mokhampura,MVP,Mokhasa Kalavapudi,MXL,Mokholi,MGV,Molagavalli,MOMU,Molakalmuru,MIO,Molisar,MFC,Monabari,MOF,Mondh,MONJ,Monglajhora,BYNR,Mookambika Road,MOR,Mor,MROA,Mora,MB,Moradabad Jn,MORA,Moraiya,MKX,Morak,MOX,Moran,MRHT,Moranhat,MAP,Morappur,MVI,Morbi,MWK,Mordad Tanda,MRDD,Mordar,MRA,Morena,MGAE,Morgram,MOI,Mori Bera,MRND,Morinda,MRSH,Morshi,MXO,Morthala,MRN,Morwani,MSU,Mosur,MOTA,Mota,MQZ,Mota Jadra,MNGV,Mota Miya Mangrol,MTSK,Mota Surka,MWQ,Motari H,MTJR,Moterjhar,MOTH,Moth,MKRL,Moti Koral,MOTC,Motichur,MOTG,Motiganj,MCO,Motihari Court F,MTJL,Motijheel,MTR,Motipur,MTPC,Motipura Chauki,MTMI,Motumari Jn,OTR,Moturu,MOBD,Moubund,MWAD,Mowad,MZM,Muazzampur Narain Jn,MDXR,Mudaria,MDLL,Muddalinganahalli H,MOO,Muddanuru,MGB,Mudigubba,MUE,Mudkhed Jn,MDLA,Mudlana,MFJ,Muftiganj H,MGD,Mugad,MUY,Mugaiyur,MGL,Mugalolli H,MGC,Mugat,MGS,Mughal Sarai Jn,MMU,Mugma,MMA,Muhammadabad,MDJ,Muhammadganj,MHP,Muhammadpur,MPF,Muirpur Road,MJE,Mujnai,MEX,Mukerian,MKSP,Mukhasa Parur,MKT,Mukhtiara Balwara,MUKE,Mukkali H,MKPR,Muktapur,MKTP,Mukteswarpuri Ph,MKS,Muktsar,MKDD,Mukunda Wadi H,MCN,Mukundarayapuram,MFA,Mukuria,MME,Mul Marora,MCU,Mulacalacheruvu,MGK,Mulagunnathukavu,MNTT,Mulanturtti,MAR,Mulanur,MLKH,Mulewal Khaihra,MOL,Muli Road,MULK,Mulki,MLX,Mullanpur,MUC,Mullurcarai,MTY,Multai,MLND,Mulund,MVD,Mulvad,BCT,Mumbai Central,CSTM,Mumbai CST,MBQ,Mumbra,MBF,Munabao,MGPA,Munda Gopal Ashram H,MND,Munderwa,MPH,Mundha Pandey,MVE,Mundhewadi,MNU,Mundikota,MYP,Mundiyampakkam,MQC,Mundka H,MGKM,Mungaiakami,MNV,Mungaoli,MNPT,Mungilipattu,MNGD,Muniguda,MRB,Munirabad,MQO,Munroturuttu,MNH,Munsirhat P H,MUK,Munumaka,MDF,Muradi,MUD,Muradnagar,MRDP,Muradpur H,MGM,Muragachha,MRHA,Murahara,MRTA,Muraitha H,MRR,Murarai,MPY,Murarpur H,MRDW,Murdeshwar,MMVR,Murga Mahadev Road,MUHI,Murhari H,MSRP,Murhesi Rampur,MURI,Muri,MRBL,Muribahal,MUP,Muripar,MRLI,Murli H,MRIJ,Murliganj,MSN,Mursan,MSDR,Murshadpur,MBB,Murshidabad,MZR,Murtajapur Jn,MZRT,Murtajapur Town,MPLM,Murthipalayam,MRTY,Murti H,MUH,Murtiha,MRX,Murud,MQU,Murukkampuzha,MFKA,Musafirkhana,MSHW,Musharwa H,MUA,Musra,MBD,Mustabada,MFB,Mustafabad,MSV,Mustara,MPC,Muthampatti H,MTGE,Muthani,MTNL,Muttarasanallur,MOZ,Muzaffarnagar,MFP,Muzaffarpur Jn,MYS,Mysore Jn,NSVP,N P A Shivarampalli,NPK,N Panakudi,NBRN,Naba Raynagar H,NDAE,Nabadwip Dham,NBAE,Nabagram,NBKH,Nabagrarn Kankurhati,NBA,Nabha,NBG,Nabinagar Road,NIU,Nabipur,NCN,Nachinda P H,NADA,Nada,NAU,Nadapuram Road,NDU,Nadaul,NBI,Nadbai,ND,Nadiad Jn,NPU,Nadiapur,NDKD,Nadikude Jn,NDW,Nadwan,NGL,Nagal,NPL,Nagalpalle,NVC,Nagalwancha,NHY,Naganahalli,NGS,Nagansur,NGAN,Nagaon,NGT,Nagappattinam,NGE,Nagar,NGD,Nagardevla,NAG,Nagargali,NG,Nagari,NRS,Nagaria Sadat,NGF,Nagarnabi,NSL,Nagarsol,NUQ,Nagaruntari,NRR,Nagarur,NWA,Nagarwara,NGM,Nagasamudram,NGO,Nagaur,NVF,Nagavangala,NAB,Nagbhir Jn,NABN,Nagbhir Junction,NAD,Nagda Jn,NCJ,Nagercoil Jn,NJT,Nagercoil Town,NGHW,Nageshwadi H,NGG,Nagina,NRDP,Nagireddipalli,NJA,Nagjua F S,NGLT,Nagla Tula,NCR,Nagore Tn,NGTN,Nagothane,NGPB,Nagpur(Se),MIB,Nagpur (Moti Bagh),NGP,Nagpur Jn,NPRD,Nagpur Road Ph,NGDM,Nagradham Ph,NKB,Nagrakata,NGI,Nagri,NGRT,Nagrota,NGRS,Nagrota Suriyan,NXR,Nagsar H,NHK,Naharkatiya,NHLN,Naharlagun,NHU,Nahur,NIG,Naigaon,NH,Naihati Jn,NARD,Naika Road H,NKI,Naikheri,NIT,Naikot F,NIA,Naila,NLN,Nailalung,NM,Naimisharanya,NYN,Naini Jn,NIR,Nainpur Jn,NBD,Najibabad Jn,NCH,Nakachari,JEA,Nakaha Jungle,NKDO,Nakkanadoddi,NRO,Nakodar Jn,NAK,Naksalbari,NKX,Nakthisemra,NAL,Nal H,NLD,Nalanda,NLV,Nalbari,NLDA,Nalgonda,NHT,Nalhati Jn,NKL,Nalikul,NLKT,Nalkata,NSP,Nalla Sopara,NCU,Nallacheruvu,NCE,Nallacheruvu East,NLPD,Nallapadu,NLL,Nalli,BVZ,Naloi Barwa H,NALR,Nalpur,NW,Nalwar,NMKL,Namakkal,NMN,Namanasamudram,NBR,Namburu,NMKA,Namkhana,NKM,Namkom,NLI,Namli,NAM,Namrup,NMT,Namtiali,NANA,Nana,NTW,Nanajangud Town,NNKR,Nanaksar,NNX,Nanauta,NLA,Nancherla,NDGJ,Nandaigajan P H,NDIM,Nandaigram Halt,NRE,Nandalur,NNNL,Nandani Lagunia,NDPR,Nandapur,NDR,Nandesari,NDJ,Nandganj,NGN,Nandgaon,NAN,Nandgaon Road,NDKR,Nandhakumar Ph,NDY,Nandi H,NAND,Nandikur,NPKM,Nandiyampakkam,NDK,Nandkhas,NDLH,Nandlalee H,NHM,Nandol Dahegam,NDBT,Nandpur Bhatauli,NDE,Nandre,NN,Nandura,NDB,Nandurbar,NDL,Nandyal,NLDM,Nangal Dam,NDRT,Nangal Degrota,NNU,Nangal Mundi,NLQ,Nangal Pathani,NAI,Nangi,NNO,Nangloi,NNN,Nanguneri,NNM,Nannilam,NNP,Nanpara Jn,NWN,Nanwan H,NJN,Naojan,NPS,Napasar,NTN,Nar Town,NARA,Nara H,NRK,Naraikkinar,NRI,Naraina,NRVR,Naraina Vihar,NQR,Naraj Marthapur,NNGE,Narangi,NRGR,Naranjipur,NANR,Naranpur,NBU,Narasambudhi H,NS,Narasapur,NSPH,Narasapurapupeta,NRT,Narasaraopet,NRSP,Narasimhapur Ph,NPT,Narasinganpet,NASP,Narasingapalli,NPMR,Narayan Pakuria Murail,NGJA,Narayanappavalasa H,NRYP,Narayanapuram,NYA,Narayangarh,NNR,Narayanpur,NRPA,Narayanpur Anant,NRPM,Narayanpur Murli H,NNW,Narayanpur Tatwara,NDN,Nardana,NUR,Narela,NRPR,Narendrapur H,NRUR,Nareshwar Road,NRGO,Narganjo H,NRN,Narhan,NOI,Nariaoli,NKK,Narikkudi,NRJ,Narimogaru,NPX,Narindarpura,NRV,Nariyar H,NKBR,Narkatia Bazar H,NRKG,Narkatiaganj,NKE,Narkatiaganj Jn,NRKR,Narkher,NRKP,Narkopi F S,NNL,Narnaul,NRD,Naroda,NU,Narsinghpur,NRP,Narsipatnam Road,NSX,Narsipuram H,NTM,Narthamalai,NHX,Narthar H,NRW,Narwana Jn,NSF,Nasibpur,NK,Nasik Road,NSD,Nasirabad,NAS,Nasrala,NES,Natesar,NTT,Nathapettai,NDT,Nathdwara,NGY,Nathganj,NAT,Nathnagar,NKH,Nathukheri,NTZ,Nathwana,NCHS,Nature Cure Hospital,NNA,Naugachia,NGW,Nauganwan,NUH,Naugarh,NLH,Naultha,NWP,Naupada Jn,NTV,Nautanwa,NBM,Navabpalem,NVRD,Navade Road,NUD,Navagadh,NVLN,Navalgaon,NVD,Navalgund Road,NVU,Navalur,NWU,Navapur,NVT,Navipet,NVS,Navsari,NAC,Nawa City,NGB,Nawabganj Gonda H,NWD,Nawadah,NWDH,Nawadih,NXN,Nawagaon,NWSI,Nawal Sahi H,NAWN,Nawan,NAW,Nawandgi,NPD,Nawapara Road,NSS,Nawashahr Doaba Jn,NVG,Nawegaon,GZN,Naya Ghaziabad,NYK,Naya Kharadia,NWC,Naya Nagar,NNGL,Naya Nangal H,NBT,Nayabhagirathipur Ph,NYO,Nayagaon,NYG,Nayagarh,NAKD,Nayak Dih H,NYH,Nayandahalli,NYT,Nayatola,NI,Naydongri,NYP,Nayudupeta,NZG,Nazarbag,NZT,Nazareth,NZR,Nazira,NAZJ,Nazirganj,NLRD,Necklace Road,NGX,Negun H,NKD,Nekonda,NKPU,Nekpur,NMGA,Nelamangala,NYI,Nellayi,NPM,Nellikuppam,NML,Nellimarla,NLR,Nellore,NLS,Nellore South H,NEMA,Nema H,NMLU,Nemakallu,NEM,Nemam,NEC,Nemilicherry H,NEP,Nenpur,NEI,Neoli,NEO,Neora,NPR,Nepalganj Road,NPNR,Nepanagar,NERH,Ner H,NRL,Neral,NRF,Neralakatte H,NRG,Nergundi Jn,NERI,Neri,NEU,Nerul,NTWL,Netawal,NTA,Netra,NACC,New Alipore,NOQ,New Alipurduar,NAVI,New Amravati,NBPH,New Balarampur H,NBS,New Baneswar,NBE,New Barrackpur,NBQ,New Bongaigaon Jn,NCB,New Cooch Behar,NDLS,New Delhi,NQH,New Domohani,NFK,New FarakkaJn,NGMP,New Garh Madhupur,NGRI,New Garia,NGTG,New Gitaldaha,NGMN,New Gumandev,NGNT,New Guntur,NJPS,New Jalpaiguri,NJP,New Jalpaiguri Jn,NKJ,New Katni Jn,MPUR,New Madanpur,NMZ,New Mal Jn,NMX,New Maynaguri,NMM,New Misamari,NMDA,New Morinda,NNWH,New Nawadih,NRSD,New Runnisaidpur Halt,NTSK,New Tinsukia Jn,NYM,Neyamatpur H,NEA,Neykkarappatti,NVL,Neyveli,NYY,Neyyattinkara,NBP,Nibhapur,NBUE,Nibkarori,NPJE,Nichitpur,NDD,Nidadavolu Jn,NXH,Nidaghatta,NMJ,Nidamangalam,NDM,Nidamanuru,NDNI,Nidhani P H,NIDI,Nidi,NDZ,Nidigallu,NDO,Nidubrolu,NID,Nidur,NDV,Nidvanda,NTU,Nigatpur F,NIQ,Nigaura,NHN,Nigohan,NOH,Nigohi,NHH,Nihalgarh,NHF,Nihasta H,NJB,Nijbari,NSI,Nikursini,NIIJ,Nilaje,NKW,Nilakantheswar,NLBR,Nilambazar,NIL,Nilambur Road,NLE,Nileshwar,NGRD,Nilgiri Road,NLKR,Nilokheri,NMK,Nim Ka Thana,NMH,Nimach,NKR,Nimar Kheri,NBH,Nimbahera,NBL,Nimbal,NB,Nimbhora,NMDR,Nimdanri,NIM,Nimdih,NMG,Nimiaghat,NIN,Nimkana,NMF,Nimo H,NMD,Nimoda,NMP,Nimpura,NMGT,Nimshirgaon Tamdalge,NILE,Nimtita,NDH,Nindhar Benar,NGA,Ningala,NPW,Nipani Vadgaon,NPI,Nipania,NR,Niphad,NIRA,Nira,NKP,Nirakarpur,NMA,Nirmali,NCPM,Nischindapur Market H,NSA,Nishangara,NCP,Nishchindapur,NSU,Nisoi,NTR,Nittur,NEW,Nivari,NIV,Nivasar,NWR,Niwar,NWB,Niwas Road,NLSF,Niyalish Para,NZP,Niyazipur H,NOL,Niyol,NZB,Nizamabad,NIP,Nizampur,NBX,Nizbarganj,NCA,Nizchatia,NRX,Noadar Dhal,NOMD,Noamundi,NWMS,Noapara Mahishasar,NOB,Nobanda Ph,NGWN,Noganwan,NHB,Nohbachhamadi,NOK,Nokha,NKRA,Nokhra,NOLI,Noli,NNPR,Nonapar F,NON,Nonar Halt,NNE,Nonera,NRLR,Norla Road,NBGH,Nowbagh,NRZB,Nowrozabad,GMO,Nsc Bose J Gomo,NMBR,Nuagaon Mayurbhanj Road,NDPU,Nudurupadu H,NUJ,Nujella,NLNR,Nulenuru H,NMGY,Numaligarh,NBK,Nungambakkam,NRA,Nunkhar,NUB,Nurabad,NRM,Nurmahal,NRNR,Nurnagar H,NUPR,Nurpur Road,NPH,Nurpura H,NTG,Nusratabad Kharkhari H,NZD,Nuzvid,NKN,Nyolikalan,NRY,Nyoriya Husenpur,OTN,Oating,ODG,Obaidulla Ganj,OBM,Obalapuram,OBR,Obradam,OBVP,Obulavaripalli,OCR,Ochira,OD,Od,ODC,Oddanchattram,ORH,Oddarahalli,OEA,Odela,ODHA,Odha,OCH,Odhaniya Chacha,ODUR,Odur,OEL,Oel,OHAN,Ohan Cabin,OKHA,Okha,OKD,Okha Madhi,OKA,Okhla,OLA,Olakur,OLP,Olapur,OMLF,Old Malda,OSH,Old Sachdeva H,OLR,Ollur,OML,Omalur,OM,Omkareshwar Road,ODM,Ondagrarm,OGL,Ongole,OPN,Onnupuram H,VNM,Ontimitta,ODB,Oodlabari,OMB,Oombermali,OGM,Oorgaum,OTD,Ootward,ORAI,Orai,ORC,Orchha,ORDI,Ordi,OREH,Ore H,ORGA,Orga,ORKI,Orki H,ORR,Orr,ORW,Orwara,OSN,Osiyan,OSRA,Osra,OTK,Ottakovil,OTP,Ottappalam,OV,Ottivakkam,PAI,Pabai,PQY,Pabli Khas,PBJM,Pabnawajas Mahindar H,PCMK,Pachar Malikpura,PNWN,Pachawan,PCKM,Pachchakuppam,PCGN,Pachegaon,PCH,Pachhapur,PC,Pachora Jn,PFR,Pachora Road,PCK,Pachrukhi,PDH,Padadhari,PTM,Padalam,PDF,Padampur,PDPH,Padapahar,PDGN,Padhegaon,PAQ,Padiya Nagla H,PDQ,Padla,PI,Padli,PDPK,Padmapukur,PDNR,Padnur H,PDRA,Padra,POU,Padrauna,PNJ,Padriganj,PDP,Padse,PFU,Padua,PDD,Padubidri,PGU,Padugupadu,PGA,Pagara,PGL,Pagdhal,PGDI,Pagidirai,PCX,Pagla Chandi,PHE,Pahaleja,PRE,Pahara,PRGA,Paharjagangaur H,PRP,Paharpur,PHU,Pahur,PMI,Paimar,PPE,Paintepur F,PJA,Pajian,PAK,Pakala Jn,PKRD,Pakaria Road,PKNA,Pakhna,PKX,Pakhrauli,PKK,Pakki,PK,Pakni,PKC,Pakra,PKR,Pakur,PAAL,Pala,PCLI,Palachauri,PALM,Palaiyam I,PGT,Palakkad ( Palghat Jn),PCV,Palakkodu,PKO,Palakollu,PM,Palam,PLMX,Palampur Himachal,PAE,Palana,PLNI,Palani,PNU,Palanpur Jn,PLPM,Palappuram,PUE,Palari,PSA,Palasa,PDI,Palasdari,PLSG,Palasingi,PAL,Palasner,PAPM,Palat Potaram,PZA,Palavantangal,PCO,Palayankottai,PYV,Palayasivaram,PLD,Paldhi,PLJ,Palej,PLG,Palghar,PGTN,Palghat Town,PLHW,Palhawas,PMY,Pali Marwar,PLA,Palia,PLK,Palia Kalan,PBV,Paliba,PLGH,Paligarh H,PIT,Palitana,PRAE,Palla Road,PV,Pallavaram,PLVA,Pallevada,POA,Pallikona,PUM,Pallippuram,PYD,Palliyadi,PXR,Palpara,PLSN,Palsana,PCP,Palsap,PLV,Palsi,PLAE,Palsit,PSO,Palsora Makrawan,PTF,Palta,PALR,Palur,PWL,Palwal,PMN,Paman,PBKS,Pambakovil Shandy,PBM,Pamban Jn,PMD,Pamidi,PMPE,Pampora,PAN,Panagarh,PNGI,Panangudi,PAM,Panapakam,PNB,Panbari,PCN,Panch Piplia,PHRH,Panch Rukhi,PNCB,Panchberia H,PGC,Panchgachia,PHC,Panchot,PPDA,Panchpatia Deoria Halt,PCR,Panchra,PNVT,Panchratna,PCT,Panchtalavda Road,PAW,Pandabeswar,PDV,Pandaravadai,PDW,Pandaul,PANP,Pandavapura,PETA,Pandetola,PVR,Pandharpur,PAR,Pandhurna,PNDP,Pandillapalli,PYM,Pandiyapuram,PMO,Pandoli,PNDR,Pandori,PRSL,Pandrasali,PPDE,Pandu Pindara H,PASR,Panduranga Swamy Road,PGP,Pandurangapuram,PLM,Paneli Moti,PNV,Panevadi,PNF,Pangaon,PNSD,Pangarshinde H,PJR,Pangri,PNHI,Panhai,PJB,Paniajob,PNRA,Paniara H,PNHR,Panihar,PHI,Panikhaiti,PNP,Panipat Jn,PASG,Panisagar,PNT,Panitola,PNYA,Paniyahawa,PJK,Panj Kosi,PJGM,Panjgam,PJN,Panjhan,PJP,Panjipara,PJLE,Panjwara Road,PNK,Panki,PH,Panoh,PAO,Panoli,PNPL,Panpali Ph,PNPN,Panpana Ph,PPO,Panposh,PRT,Panruti,PN,Pansar,PKU,Panskura,PTHL,Pantihal,PBW,Pantnagar,PNVL,Panvel,PNM,Panyam,PML,Papanasam,PPEA,Paparera,PPY,Papatapalli,PKL,Papinayakanahalli,PPNS,Pappinisseri,PPKD,Paprakund,PRDP,Paradeep,PDG,Paradgaon H,PRDL,Paradol,PSK,Paradsinga,PRY,Paraiya,PAJ,Paraj,PRKH,Parakanhatti H,PARH,Parakheda,PMK,Paramakkudi,PATR,Paramjeever Tarajeever,PO,Parangippettai,PWU,Paranur,PMH,Parao Mahna,PS,Paras,PUX,Parasia,PNME,Parasnath,PASA,Parassala,PRN,Parauna,PVU,Paravur,PRB,Parbati,PBB,Parbatonia,PBN,Parbhani Jn,PHQ,Pardhade,PAD,Pardi,PR,Parel,PRWD,Parewadi,PRGT,Pargothan,PQU,Parhana Mau,PIH,Parhihara,PQN,Pariawan Kalakankar Road,PIC,Paricha,PTSC,Paricha Thermal,PRKA,Parikha,PRKL,Parikkal,PSL,Parisal,PJY,Parjani H,PJPI,Parjapati,PQS,Park Circus,PRK,Parkham,PLH,Parlakimidi,PLL,Parli Kerala,PRLI,Parli Vaijnath,PRU,Parlu,PMS,Parmalkasa,PMQ,Parmanand,PMU,Parmanandpur F,PRAR,Paror,PGI,Parpanangadi,PRZ,Parsa,PRBZ,Parsa Bazar,PKRH,Parsa Kerwan Halt,PKRA,Parsa Khera,PRSN,Parsa Nagar H,PATI,Parsa Tiwari,PSB,Parsabad,PSZ,Parsauni,PSN,Parsendi,PRF,Parsipur,PSV,Parsneu,PSD,Parsoda,PSLI,Parsoli,PPB,Partabpura,PBH,Partapgarh Jn,PRTP,Partapur,PTU,Partur,PVP,Parvatipuram,PVPT,Parvatipuram Town,PVZ,Parvezpur,PRWA,Parwakhurd H,PSLP,Pasalapudi,PSDA,Pasivedala,PSR,Pasraha,PVL,Pasupatikovil,PAS,Pasur,PATA,Pata,PLU,Patakottacheruvu,PTP,Patal Pani,PATM,Patam,PTN,Patan,PTS,Patansaongi,PSX,Patansaongi Town,PHM,Patapatnam,PTRE,Patara,PAA,Patas,PSJ,Patasahi,PTRD,Pataudi Road,PU,Patchur,PATL,Patel H,PTNR,Patel Nagar,PEE,Paterhi,PHX,Pathakpur,PTKC,Pathankot Cantt,PTK,Pathankot Jn,PEH,Pathardih Jn,PHA,Patharia,PTKD,Patharkandi,PKB,Patharkhola,PTLI,Pathauli,PARD,Pathrad H,PTRL,Pathrala,PRI,Pathri,PTRT,Pathrot,PBL,Pathshala,PTAB,Patia Ph,PTA,Patiala,PTE,Patiala Cant,PTI,Patiali,PTLD,Patiladaha,PTKR,Patipukur,PTYR,Patiyara,PT,Patli,PTG,Patna Ghat,PNBE,Patna Jn,PNC,Patna Saheb,PTHD,Patohan,PTH,Patranga,PSF,Patrasayer Ph,PTRU,Patratu,PTZ,Patsul,PAB,Pattabiram,PRES,Pattabiram E Depot,PTB,Pattambi,PTTN,Pattan,PVM,Pattaravakkam,PAX,Patti,PTRJ,Patti Rajpura H,PKQ,Pattikkad H,PTAE,Patuli,PUW,Patuwas Mehrana,PTWA,Patwara,PUF,Pauta H,PUWA,Pauwara H,PAVI,Pavi,PCM,Pavurchutram,PWBN,Pawai Brohmasthan H,PWXP,Pawani Kumarpur H,PQE,Pawapuri Road H,POE,Pawapuri Road Halt,PDR,Payagpur,PAZ,Payangadi,PYI,Payli,PDX,Payradanga,PAY,Payyanur,PYOL,Payyoli,PDKN,Pedakakani H,PAV,Pedana,PYA,Pedapariya,PAVP,Pedda Avatapalle,PBD,Pedda Brahmadevam H,PDNA,Peddadinne H,PKPU,Peddakurapadu,PPZ,Peddampet,PDKM,Peddanayakkanpalaiyam,PDPL,Peddapalli,PDSN,Peddasana,PVD,Peddavadlapudi,PED,Peepardahi,PKBS,Peeplee Ka Bas,PHWR,Pehowa Road,PBP,Pembarti,PEN,Pen,PEC,Pencharthal,PDL,Pendekallu,PND,Pendra Road,PDT,Pendurti,PGG,Penganga,PAGM,Pennada Agraharam,PNDM,Pennadam,PNTR,Pennathur H,PKD,Penukonda,PUMU,Penumarru H,POKL,Peokol H,PJ,Peppeganj,PEM,Peralam Jn,PER,Perambur,PCW,Perambur Carriage Works,PEW,Perambur Loco Works,PEI,Perani,PEU,Perashahannur,PRCA,Perecherla H,PG,Pergaon,PRND,Perinad,PRNT,Periyanagathunai,PKM,Periyanaikanpalaiyam,PERN,Pernem,PMM,Persehra Mal H,PGN,Perugamani,PY,Perundurai,PRGL,Perungalalattur,PRGD,Perungudi,PGZ,Perunguzhi,PTD,Petlad Jn,PEA,Pettai,PLI,Pettaivaytalai,PYX,Peyanapalli H,PGW,Phagwara Jn,PLCJ,PhalodiJn,PUD,Phanda,PFM,Phaphamau Jn,PHD,Phaphund,PD,Pharadahan H,PHY,Phariha,PEP,Phephna Jn,PES,Phesar,PHR,Phillaur Jn,PPM,Phirangipuram,FLD,Phulad,PUY,Phulaguri,FL,Phulera Jn,FLU,Phulia,PLP,Phulpur,PWS,Phulwari Sharif,PLWR,Phulwaria,PLJE,Phulwartanr,FSG,Phursungi,PUS,Phusro,PLF,Piali,PBA,Piardoba,BXS,Pichchandar Kovil,PCQ,Pichkurir Dhal,PGRL,Piduguralla,PIJ,Pij,PLMD,Pilamedu,PIL,Piler,PGK,Pili Bangan,PBE,Pilibhit Jn,PIGT,Pilighat,PKY,Pilkhani,PKW,Pilkhua,PDZ,Piloda,PIO,Pilol,PKDE,Pilu Khera,PWR,Pilwai Road,PMGN,Pimpalgaon,PMKT,Pimpalkuti,PKE,Pimpar Khed,PPLC,Pimpla Chaure H,PMP,Pimpri,PRGR,Pinargaria,PDS,Pindarsi H,PQL,Pindial,PQH,Pindkepar,PDRD,Pindra Road,PDE,Pindrai,PLW,Pingleswar,PIZ,Pingli,PNGR,Pingora,POR,Pipalda Road,PLS,Pipalsana,PPCK,Pipalwali Chowki,PCY,Pipar City,PPR,Pipar Road Jn,PPI,Pipariya,PPU,Piparpur,POF,Piparsand,PQA,Pipla,PPF,Piplaj,PLE,Piplee,PPLI,Pipli,PKZ,Pipli Pakhi Kalan,PIP,Piplia,PPS,Pipliya Road,PPD,Piplod Jn,PPG,Piploda Bagla,PPA,Pipra,PPDI,Pipradih,PPRH,Piprahan,PPC,Pipraich,PIA,Pipraigaon,PFL,Piprala,PPH,Pipridih,PPTN,Pipritnan,PJH,Pir Jhalar,PUO,Pir Umrod,PVRD,Piravam Road,PIRO,Piro,PPT,Pirpainti,PRTL,Pirtala,PLT,Pirthala Lalauda,PHV,Pirthiganj,PRM,Pirumadara H,PW,Pirwa,PIS,Piska F S,PMR,Pitambarpur,PAP,Pithapuram,PJPR,Pjp Road Halt,PLY,Plassey,PCZ,Pocharam,PTJ,Podanur Jn,PUDR,Podur,POHE,Pohe,PKNS,Pokami Narsimha,POK,Pokaran,PHN,Pokhrayan,PKF,Pokla,POX,Pola Pathar,PEL,Polireddipalem,POY,Pollachi Jn,PRL,Polur,PDY,Pondicherry,PDGL,Pondugula,PDU,Ponduru,GOC,Ponmalai Golden Rock,PON,Ponneri,POI,Ponpadi,PDO,Poodoor H,PPJ,Pophlaj,PORA,Pora,PBZ,Porabazar,PRDG,Poradanga H,PBR,Porbandar,PRNR,Porjanpur,PST,Posoita,PFT,Potahi,POTI,Potheri,POT,Pothia,PTKP,Potkapalli,POO,Potlapadu H,POZ,Potul,PRKD,Powarkheda,PRH,Powerpet,PCC,Prachi Road Jn,PKA,Pradhan Khunta,PGMD,Pragati Maidan,PQD,Pranpur Road,PRJ,Prantij,PNE,Prantik,PRSP,Prasadpur H,PSPY,Prasannayanapalli,PTPR,Pratabpur H,PRBG,Pratap Bagh,PRTN,Pratap Nagar,PYG,Prayag Ghat,PRG,Prayag Jn,PMPR,Prempur,PPGT,Princepghat,PRNG,Pritam Nagar,PRUR,Prithwirajpur,PRPM,Pt Ram Prasad Bismil,PDGP,Pudgam Ganeshpura,PUDI,Pudi,PUC,Puduchatiram,PCTM,Puduchatram,PUK,Pudukad,PDKT,Pudukkotai,PGR,Pugalur,PRV,Pukkiravari,PLO,Pulgaon Jn,PCL,Pulicherla,PLMG,Puliyamangalam,PUA,Pulla,PMB,Pullambadi,PMT,Pullampet,PCHT,Punaichak H,PUU,Punalur,PHK,Punarakh,PNW,Pundag,PUN,Pundi,PQZ,Pundibari,PDA,Pundooah,PUNE,Pune Jn,PUG,Punggudi,PQT,Puniyavant,PNQ,Punkunnam,PNPR,Punnapra,PPN,Punpun,PNUG,Punpun Ghat H,PNSA,Punsia H,PB,Puntamba,POM,Punthottam,EC28,Pura H,PNI,Puraini,PDPR,Purandarpur H,PUQ,Puranigudam,PP,Puranpur,PSAE,Purbasthali,PURI,Puri,PAU,Purna Jn,PRNA,Purnea Jn,PRR,Purulia Jn,PRKE,Purwa Khera,PSE,Pusauli,PUHT,Pushkar Terminus,PPTR,Pushpattur,PUSA,Pusla,PTT,Putalapattu,PCU,Putlacheruvu,PTLR,Putlur H,PUT,Puttur,PVN,Puvanur,QDN,Qadian,KPKI,Qasimpur Kheri,QG,Quazigund,QLD,Quilandi,QTP,Qutabpur,RBHT,R Block H,RABE,Rabale,RCG,Rachagunneri,RDV,Radha Balampur,RQP,Radha Kishorepur,RDF,Radhagaon,RDU,Radhamohanpur,RDHP,Radhanpur,RDP,Radhikapur,RBL,Rae Bareli Jn,RFJ,Rafiganj,RFR,Rafinagar F,RF,Rafleshwar,RGU,Ragaul,RGPM,Raghavapuram,RGG,Raghogarh,RGV,Raghopur,RGLI,Raghouli,RBN,Raghubans Nagar F,RCTC,Raghunath Pur,RGX,Raghunathbari,RGNH,Raghunathgarh,RGP,Raghunathpalli,RPR,Raghunathpur,RRS,Raghuraj Singh,RAHA,Raha,RHMA,Rahama,RTWS,Rahatwas,RNBT,Rahenbhata,RBD,Rahimabad,RMP,Rahimatpur,RMNR,Rahmat Nagar,RRE,Rahui Road,RRI,Rahuri,RKB,Rai Ka Bagh Palace,MTPR,Rai Maihatpur,RSNR,Rai Singh Nagar,RAI,Raibha,RBJ,Raibojha,RC,Raichur,RGQ,Raigadh Road,RGJ,Raiganj,RIG,Raigarh,RAG,Raigir,RCF,Rail Coach Factory Kapurthala,RLR,Raila Road,RLE,Railey English H,RNGR,Rainagar Ph,RPHR,Raipur Haryana,R,Raipur Jn,RAIR,Rairakhol,RRP,Rairangpur,RSJ,Raiserjagir,RSI,Raisi,RWL,Raiwala Jn,RJN,Raj Nandgaon,RJD,Raj Pardi,RVK,Raja Bhat Khawa,RJK,Raja Ka Sahaspur Jn,RKM,Raja Ki Mandi,RTB,Raja Talab,RJB,Rajabera,RAGM,Rajagambiram,RGA,Rajagoda,RJY,Rajahmundry,RJR,Rajaldesar,RJLK,Rajalukah,RNN,Rajankunti,RJPM,Rajapalaiyam,RPV,Rajapatti,RJAP,Rajapur H,RAJP,Rajapur Road,RJGR,Rajath Garh,RJI,Rajawari,RBH,Rajbandh,RCD,Rajchandrapur,RJQ,Rajendra Nagar Indore,RJO,Rajendra Pul,RJW,Rajevadi,GP,Rajgangpur,RHG,Rajgarh,RG,Rajghat Narora,RGT,Rajghat Ph,RGD,Rajgir,RJG,Rajgram,RHR,Rajhura,RIM,Rajim,RVN,Rajiv Nagar H,RJS,Rajiyasar,RKSN,Rajkharsawan Jn,RKZ,Rajkiawas,RJT,Rajkot Jn,RUG,Rajlu Garhi H,RJL,Rajmahal,RJMP,Rajmalpur Road H,RM,Rajmane,RJA,Rajnagar,RJAK,Rajnagar K H,ROL,Rajoli,ROS,Rajosi,RAJ,Rajpipla,RPJ,Rajpura Jn,RJC,Rajsitapur,RJU,Rajula City,RLA,Rajula Jn,RHE,Rakha Mines,RHI,Rakhi,RKJE,Rakhitpur,RKH,Rakhiyal,RLT,Ralapet,RMC,Ram Chaura Road,RD,Ram Dayalu Nagar,RCP,Rama Chandrapuram,RBCS,Ramachandrapuram,RGI,Ramagiri,RDM,Ramagundam,RAMR,Ramaipur H,RKO,Ramakistapuram Gate H,RMO,Ramakona,RMN,Raman,RMGM,Ramanagaram,RMD,Ramanathapuram,RMNP,Ramannapeta,RLX,Ramanujampalli H,RAM,Ramapuram,RRJ,Ramarajupalli,RMV,Ramavarappadu,RBA,Rambha,RBZ,Rambhaddarpur,RPWN,Rambhawan H,RCRA,Ramchaura H,RDS,Ramdas,RDRA,Ramdevra,RSWN,Rameshwar Nagar H,RMM,Rameswaram,RGB,Ramganga,RGJN,Ramganga Jn,RMGJ,Ramganj,RMA,Ramganj Mandi,RAH,Ramgarh,RMT,Ramgarh Cantt,RSWT,Ramgarh Shekhawati,RGH,Ramgarhwa F,RMBG,Ramghat H,RSMN,Ramgovindsingh Mahuli H,RKI,Ramkanali Jn,RKL,Ramkola,RAK,Ramkot,RMF,Ramna,RMR,Ramnagar,RMRB,Ramnagar Bengal PH,RMJK,RamnagarJ K,RTR,Ramnathpur,RMPH,Rampahari,RA,Ramparda,RMU,Rampur,RMPB,Rampur Bazar,RDUM,Rampur Dumra,RMPR,Rampur H,RPH,Rampur Hat,RPMN,Rampur Maniharan,RMB,Rampura Beri,PUL,Rampura Phul,RAMP,Rampuri,RMJ,Ramrajatala,RSG,Ramsagar,RXN,Ramsan,RMX,Ramsar,RMSR,Ramsinghpur,RTK,Ramtek,RAMA,Ramva,RNBD,Rana Bordi,RHA,Ranaghat Jn,RNL,Ranala,RPZ,Ranapratapnagar,RWO,Ranavav,RNC,Ranchi,RRME,Ranchi Road,RLD,Randala,RDJ,Randheja,RNGG,Rangaliting,RXR,Rangapahar,RNI,Rangapani,RPAN,Rangapara North,RXRX,Rangaphar Crossing,RGM,Rangapuram,RRGA,Rangareddiguda,RNY,Rangiya Jn,RGJI,Rangjuli,RMH,Rangmahal,RTG,Rangtong,RANI,Rani,RNR,Ranibennur,RNG,Raniganj,RKR,Ranikund Rarah,RQJ,Raninagar Jalpaiguri,RNX,Ranipatra,RNRD,Ranipur Road,RNTL,Ranital,RNV,Raniwara,RNJD,Ranjangaon Road,RNE,Ranjani,RW,Rankuva,RNO,Ranoli,RNIS,Ranolishishu,RUR,Ranpur,RNB,Ranpura,RTJ,Rantej,RNT,Ranthambhor,RPP,Ranu Pipri,RUJ,Ranuj Jn,RCJ,Ranyal Jasmiya,RTI,Raoti,RPRL,Raparla H,RES,Rasauli,RSYI,Rasayani,RDK,Rashidpura Khori,RASP,Rasipuram,RSM,Rasmara,RSR,Rasra,RYS,Rasuiya,RUB,Rasulabad,RSLR,Rasulpur,RPGU,Rasulpur Gogumau,RTU,Ratan Sarai,RTGH,Ratanagarh Jn,RTGN,Ratangaon,RKK,Ratangarh Kanakwal,RPUR,Ratanpur,RTP,Ratanpura,RCR,Ratar Chhattar,RDDE,Rathdhana,RKN,Rati Ka Nagla,RIKA,Ratikheda,RTM,Ratlam Jn,RN,Ratnagiri,RUT,Ratnal,RNU,Ratnapur,RTZ,Ratona,RKG,Rattoke Gurdwara H,RAU,Rau,RUL,Rauli,RWA,Rautara,RZN,Rauzagaon,RPK,Ravalpalli Kalan,RVS,Ravanasamudram,RV,Raver,RVD,Ravikampadu,RVKH,Ravindrakhani,RDT,Ravtha Road,RWJ,Rawanjna Dungar,RJ,Rawatganj F,RPO,Rawatpur,RXL,Raxaul Jn,RAY,Ray,RAYA,Raya,RDG,Rayadurg,RGDA,Rayagada,RY,Rayaka,RYC,Rayakkottai,RLO,Rayalcheruvu,RYP,Rayanapadu,RRU,Rayaru,RYT,Rayatpura,RBG,Raybag,RZJ,Razaganj,RJP,Razampeta,RMTR,Re Mount Road,RRD,Reay Road,RECH,Rechni Road,REM,Reddigudem,RDY,Reddipalayam,RPL,Reddipalle,RLL,Regadipalli,REG,Regupalem,RJPB,Rejendranagar Terminal,REJ,Rejinagar,RLG,Relangi,REN,Ren,RGL,Rengali,RENH,Renhat,RU,Renigunta Jn,RCA,Rentachintala H,RET,Rentiya,RNQ,Renukut,RNW,Renwal,ROI,Reoti,RBK,Reoti Bahora Khera,RAL,Repalle,RLW,Repalliwada,RTN,Retang,RAKL,Rethorakalan,RVG,Revelganj Ghat H,REWA,Rewa,RE,Rewari Jn,RRL,Rewral,RBR,Ribada,RR,Richha Road,RCGT,Richughuta,RIGA,Riga,RDD,Rikhabdev Road,RGS,Ringas Jn,RSA,Risama,RKSH,Rishikesh,RIKD,Rishikund,RIS,Rishra,RS,Risia,REI,Rithi,RBGJ,Robertsganj,ROB,Robertson,ROHA,Roha,ROHN,Rohad Nagar,RLK,Rohal Khurd,RNA,Rohana Kalan,RT,Rohat,RHW,Rohira Ghallughara H,RHOT,Rohna Town,ROK,Rohtak Jn,RLS,Romana Albel Singh,RML,Rompalle Ph,RXM,Rooma,RPAR,Roop Nagar,RK,Roorkee,RORA,Rora,RRW,Roranwala,RMW,Roshan Mau H,RHN,Roshanpur,RGO,Rotegaon,ROU,Rourkela,RMZ,Routhpuram Ph,RWH,Rowriah,RWTB,Rowta Bagan,RPM,Royapuram,ROZA,Roza Jn,RDN,Rudain,RDL,Rudauli,RUPC,Rudrapur City,RKD,Rukadi,RKX,Rukhi H,RMY,Rukmapur,RUI,Rukni,RDE,Rundhi,RNJ,Runija,RNH,Runkhera,RNKA,Runkuta,RUSD,Runnisaid Pur,RPI,Rupaheli,RPY,Rupai,RUP,Rupaigaon,RUM,Rupamau,RPD,Rupaund,RBS,Rupbas,RNPR,Rupnarayanpur,RPRD,Rupra Road,ROP,Rupsa Jn,RURA,Rura,RRAL,Rure Asal H,ROA,Rusera Ghat,RTA,Ruthiyai,SKAP,S K Para,SBL,Sabalgarh,SBI,Sabarmati Jn,SBT,Sabarmati Jn,SZZ,Sabira,SR,Sabli Road,SBO,Sabour,SCH,Sachin,SCY,Sachiwalaya H,SNA,Sadanapura,DSB,Sadar Bazar,SSPR,Sadashibapur,SSPD,Sadashivapet Road,SDT,Sadat,SSZ,Sadda Singhwala,SHL,Sadhli,SDY,Sadhoo Garh,XSAD,Sadipur H,SDE,Sadisopur,SDLP,Sadulpur Jn,SDS,Sadulshahar,SDUA,Sadura,SGJ,Safdarganj,SFH,Safedabad,SFDE,Safidon,SFX,Safilguda H,SFPR,Safipur,SFR,Safrai,SGDP,Sagadapata,SAO,Sagaoni,SRF,Sagar Jambagaru,STE,Sagarakatte,SDI,Sagardighi,SVI,Sagarpali,SGL,Sagauli Jn,SAGM,Sagma T,SXA,Sagphata,SDG,Sahadai Buzurg,SHJP,Sahajipur H,SRE,Saharanpur Jn,SHC,Saharsa Jn,SHKY,Saharsa Kacheri H,SHJ,Sahaspur Road Ph,SHSK,Sahasrakund,STW,Sahatwar,SWRT,Sahawar Town,SHBA,Sahebtala H,SICY,Saheed Ishwar Chowdhary H,SSNS,Saheed Suraj Narayan Singh H,SAHL,Saheli,SALI,Saheli,SAHR,Saheri H,SBB,Sahibabad,SBG,SahibganjJn,SKJ,Sahibpur Kamal,SASN,Sahibzada Ajitsingh Nagar(Mohali),SMTG,Sahid Matangini,SAHP,Sahijpur,SWA,Sahjanwa,SAJH,Sahjha H,SHWL,Sahuwala,SDC,Saidabad,SWX,Saidanwala,SP,Saidapet,SADP,Saidapur,SYK,Saidkhanpur,SPJB,Saidpur Jalalabad,SYJ,Saidraja,SFNR,Saifee Nagar H,SQJ,Saila Khurd,SNSI,Sainagar Shirdi,SFC,Saintala,SNT,Sainthia Jn,STH,Saithal H,SYH,Saiyedpur Bhitri,SYWN,Saiyid Sarawan,SJF,Sajanvav Road,SJRR,Sajerpar,SJV,Sajhauli H,SJM,Sajuma,SLD,Sakaldiha,SHYP,Sakharayapatna,SIL,Sakhi Gopal,SKF,Sakhoti Tanda,SKR,Sakhpur,SK,Sakhun,SKLR,Sakleshpur,SKI,Sakri Jn,SLJ,Sakrigali,SKGH,Saktesgarh,SKT,Sakti,SKG,Saktigarh,SABD,Salabad,SLBN,Salai Banwa,SYA,Salaia,SLKX,Salakati,SMT,Salamatpur,SLS,Salanpur,SALE,Salar,SRKR,Salar Khurd,SLRP,Salarpur,SLNA,Salauna,SZ,Salawas,SXX,Salbari,SLB,Salboni,SQQ,Salegaon,SKS,Salekasa,SA,Salem Jn,SAMT,Salem Market,SXT,Salem Town,SPRN,Salempur Halt,SRU,Salempur Jn,SLJR,Salgajhari,SLHA,Salhana,SCKR,Salichauka Road,SMBH,Salimpur Bihar,SMM,Saliyamangalam,SLKR,Salka Road,SAF,Salkhapur,SRI,Salmari,SLR,Salogra,SLQ,Salona Assam,SLP,Salpa,SYL,Salpura,SALR,Salur,SAL,Salwa,SMGR,Samaguri,SIOB,Samakhiali Jn,SMK,Samalkha,SLO,Samalkot Jn,SLY,Samalpatti,SMF,Samar Gopalpur,SQE,Samarala H,SPJ,Samastipur Jn,SMSR,Samaswara,SER,Samayanallur,SMBX,Samba,SHTS,Sambahal Hatim Sarai,SBP,Sambalpur,SBPY,Sambalpur City,SBPD,Sambalpur Road,SBR,Sambhar Lake,SMU,Sambhu,SXB,Sambre,SMR,SamdariJn,SHW,Samhon,SMLA,Samlaya Jn,SMLT,Samloti,SMC,Samnapur,SAZ,Samni Jn,SPGR,Sampige Road,SPZ,Sampla,SMRL,Samrala,SRK,Samrau,SM,Samsi,SMAE,Samudragarh,SMDM,Samudram,SMTA,Samuktala Road,SNL,Sanahwal,SAU,Sanand,SNF,Sanatnagar,SWD,Sanawad,SCI,Sanchi,SNDY,Sandai H,SLKN,Sandal Kalan,SLV,Sandalpur,SDHR,Sandhanidhar,SNRD,Sandhurst Road,SAN,Sandila,SNX,Saneh Road,SJL,Sangamjagarlamudi,SNGN,Sanganer,SNGR,Sangannapur,SGRR,Sangar,SGRA,Sangariya,SGF,Sangat,SLI,Sangli,SGR,Sangmeshwar,SGLA,Sangola,SNU,Sangrampur,SBS,Sangrana Sahib,SAG,Sangrur,SWQ,Sangwi,SANH,Sanha H,SNHT,Sanhati H,SAC,Sanichara,SNAD,Saniyad,SNJL,Sanjali,SJN,Sanjan,SJER,Sanjarpur H,SJJ,Sanjha H,SJVP,Sanjivaih Park,SJGM,Sanjoy Gram,SJDA,Sanjuja Da Areyal H,SANK,Sank,SNKR,Sanka,SNKG,Sankara Gummanur H,SNKL,Sankarankovil,SGE,Sankaridrug,SNQ,Sankarpur,SKVL,Sankaval,SNHR,Sankhai,SAK,Sankheda Bahadurpur,SXP,Sankopara H,SNKX,Sankra H,SEL,Sankrail,SFE,Sanodiya,SOA,Sanosra,SNCR,Sanpada,SNRR,Sansarpur,SNRL,Sansartali,SAT,Sant Road,STC,Santa Cruz,SNTD,Santaldih,SNLR,Santalpur,SAB,Santamagulur,SSP,Santoshpur F,SRC,Santragachi Jn,SNVR,Sanvatsar,SVM,Sanvordem Chuch,SVO,Sanvrad,SNRA,Sanwara H,SONR,Saoner,SZH,Saonga,SGC,Saongi,SOF,Saota,SPX,Sapatgram,SAPE,Sape Wamne H,SPK,Sapekhati,SAH,Saphale,SDH,Saradhana,SGRD,Saragaon Road H,SRBA,Saragbundia,SRGP,Saragipali,SAHA,Sarahula H,SAI,Sarai,SBJ,Sarai Banjara,SB,Sarai Bhopat,SYC,Sarai Chandi,SPGL,Sarai Gopal,SVZ,Sarai Harkhu,SJGH,Sarai Jagdish H,SQN,Sarai Kansrai,RKS,Sarai Rani,SGAM,Saraigram,SMZ,Saraimir,SFW,Sarangpur,SAPR,Sarangpur Road,SRWN,Saraswati Nagar H,SYU,Sarayan,SRGR,Saraygarh,SBRA,Sarbahara,SDPH,Sardar Patel H,SDPR,Sardar Patel Road,SRZ,Sardargarh,SDGM,Sardargram,SANR,Sardarnagar F,SUA,Sardiha,SSR,Sareri,SGV,Sargachhi,SUJ,Sarju,SKX,Sarkara,SEJ,Sarkhej,SIQ,Sarkoni,SLRA,Sarla Jn,SMND,Sarmatanr,SRM,Sarna,SRNT,Sarnath,SRB,Sarobag,SOJ,Sarojini Nagar,SRL,Sarola,SZB,Sarona,SZA,Sarotra Road,SPSR,Sarpeswar Ph,SSW,Sarsawa,SPY,Sarsonpuri,SRSO,Sarsoo,SZR,Sarupathar,SRPR,Sarupsar Jn,SVD,Sarwari,SLU,Sasalu,SSU,Sasamusa,SASG,Sasan Gir,SSM,Sasaram,SNS,Sasni,SSN,Sason,STKT,Sasthankotta,SSV,Sasvad Road,STDR,Satadhar,SATR,Satar H,STR,Satara,SZF,Satbahini,STBB,Satberia H,SNIE,Sath Naraini,STJT,Sathajagat,SAHI,Sathi,SAA,Sathiaon,SWF,Sathin Road,SSPH,Satish Samanta P H,SUT,Satlana,STA,Satna,STNL,Satnali,SNB,Satnaur Badesron,STZ,Satraon F,STD,Satrod,SSNR,Satsangnagar,SAP,Sattenapalle,SQD,Sattirakkudi,STUR,Satulur,SCO,Satuna,SRT,Satur,STVA,Satyavada,SGO,Saugor,SNH,Saunshi,SASR,Sausar,SYM,Savalyapuram,SVNR,Savanur,SVX,Savarda,SVKD,Savarkundla,SAV,Savda,SVB,Savni,SWM,Sawai Madhopur Jn,SVG,Sawalgi,SWV,Sawantwadi Road,SAY,Sayama,SYN,Sayan,SWDV,Sea Wood Darave,SDAH,Sealdah,SC,Secunderabad Jn,SDPT,Sedarampattu,SEW,Sehal H,SRBZ,Sehara Bazar Ph,SEH,Sehore,SW,Sehramau,SEQ,Sekha,SLX,Selenghat,SLOR,Seloo Road,SELU,Selu,SYF,Semai,SMO,Semapur,SES,Semari,SRKI,Semerkhedi,SRA,Semra,SRMN,Semraon,SEN,Senapura,SCE,Senchoa Jn,SEU,Sendra,SNDI,Sendurai,SCT,Sengottai,SGLM,Sengulam,SPAM,Senji Panambakkam,SEO,Seohara,SONH,Seonan H,SEY,Seoni,SHE,Seoraphuli Jn,SEPN,Sepon,SEM,Seram,SXR,Serndanur,SEX,Seroni Road,SF,Settigunta,SET,Settihalli,SVL,Sevaliya,SVUR,Sevur,SVR,Sevvapet Road,SWNR,Sewa Nagar,SEGM,Sewagram,SWPR,Sewapuri,SWAR,Sewar,SVE,Sewri,SDNR,Seydunganallur,SHDR,Shadhoragaon,SHNR,Shadnagar,SDB,Shahabad,SHDM,Shahabad Markanda,SMDP,Shahabad Muhammadpur H,SHAD,Shahad,SWW,Shahanagar Timarua,SBK,Shahbaz Kuli,SZN,Shahbaznagar,SDL,Shahdol,SHG,Shahganj Jn,SG,Shahgarh,SSC,Shahi,SPN,Shahjahanpur Jn,SZP,Shahjahanpur Jn,SXK,Shahjahanpur Kutchery H,SPP,Shahpur Patoree,SAR,Shahzad Nagar,STSN,Shaitansinghanagar,SFY,Shajapur,SKNR,Shakarnagar,SKTN,Shaktinagar,SSB,Shakur Basti,SHM,Shalimar,SCQ,Sham Chaurasi,SMKR,Sham Kauria F,SMP,Shambhupara,SGZ,Shamgarh,SJS,Shamlaji Road,SMQL,Shamli,SPHL,Shampurhalli H,SSD,Shamsabad,SNPH,Shankapur H,SQK,Shankar,SRJ,Shankargarh,SKP,Shankarpalli,SKBR,Shankarpur Bhadaura,SKLP,Shankerpur H,SHKL,Shankrul Ph,STB,Shantipur,SHH,Shapur,SHRM,Sharma H,SSRH,Shasan H,SSRD,Shasan Road F,SED,Shedbal,SEG,Shegaon,SHK,Sheikhpura,SKW,Sheikhupur,SLGH,Shelgaon,SHLU,Shelu,SEI,Shendri,SDRN,Shendurni,SNE,Shenoli,SAS,Sheodaspura Padampura,SPDR,Sheoprasad Nagar H,SOE,Sheopur Kalan,SHNX,Sheosinghpura,SHER,Sher H,SNZ,Sherganj H,SGA,Shergarh,SEPR,Sherpur,SRTL,Shertallai,SBW,Shewbabudih,SHBL,Shiblun H,SKY,Shikara,SKB,Shikohabad Jn,SLHI,Shilhauri Halt,SMLG,Shimiliguda,SML,Shimla,SME,Shimoga H,SMET,Shimoga Town,SHIV,Shindawane,SIRL,Shirala,SIW,Shiravde,SHMI,Shiroor,SSI,Shirsai,SS,Shirsoli,SHF,Shirud,SHEO,Shisho H,SSG,Shiu Sagar Road,SOP,Shiupur,CSB,Shivaji Bridge,SVJR,Shivaji Nagar,SIA,Shivalakha,SLPM,Shivalingapuram,SHV,Shivani,SHNG,Shivnagar,SVRP,Shivnarayanpur,SVW,Shivni Shivapur,SVT,Shivpura,SVPI,Shivpuri,SPHT,Shivpuri H,SWC,Shivrampur,SWT,Shiwala Tehu H,SGS,Shoghi,SOT,Shohratgarh,SHLK,Sholaka,SDN,Sholavandan,SHU,Sholinghur,SRR,Shoranur Jn,SBGA,Shravanabelagola,SBLJ,Shri Balaji,SGNR,Shri Ganganagar,SHGN,Shri Ghasi Nagar,SIM,Shri Hamirgadh,SKPA,Shri Kalyanpura,SRW,Shri Karanpur,SKJS,Shri Krishna Janam Asthan,NGZ,Shri Kshetra Nagjhari,SMPR,Shri Madhopur,SMBJ,Shri Mahabirji,SMNN,Shri Makri Nath Nagar,SVDK,Shri Mata Vaishno Devi Katra,SRMR,Shri Rampuram,SSNH,Shri Sharda Nagar,SBLT,Shribhadriya Lathi,SRID,Shridham,SGND,Shrigonda Road,SIZ,Shrikhanda,SRDW,Shrimad Dwarikapuri H,SPS,Shripat Shrikhanda,SAGR,Shrirajnagar,SRP,Shrirampur,S,Shrirangapattana,SUP,Shrungavarapukota,SPPR,Shudnipur,SJP,Shujalpur,SJT,Shujatpur,SHX,Shukarullahpur H,SMCK,Shyam Chak,SCPR,Shyamacharanpur Ph,SNR,Shyamnagar,SMPA,Shyampura,SHMR,Shyamsundar Ph,SHBC,Sibaichandi,SRTN,Sibsagar Town,SIE,Siddampalli,SID,Siddhapur,SDHA,Sidhari H,SD,Sidhauli,SQW,Sidhwalia,SWG,Sidhwan,IDT,Sidlagatta,SXD,Siduli,SGDM,Sigadam,SQS,Sigsigi,SIPR,Sihapar H,SIHO,Siho,SOJN,Sihor Gujarat,SHR,Sihora Road,SJA,Sijua,SKQ,Sikandarpur,SKA,Sikandra Rao,SIKR,Sikar Jn,SKRI,Sikaria H,SKIP,Sikaripara,SKPI,Sikarpai,SFK,Sikir,SKK,Sikkal,SKPR,Sikkarpur H,SKSO,Sikosa,SKU,Sikroda,SIKD,Sikroda Kwanri,SKDM,Sikroda Mina,STF,Sikta,SXE,Sila Kheri,ILA,Silaiman,SZY,Silak Jhori,SILO,Silao,SILR,Silari,SLT,Silaut,SLWR,Silawar,SHTT,Silghat Town,SGUD,Siliguri,SGUJ,Siliguri Jn,SGUT,Siliguri Town,SLTH,Sillakkudi,SLF,Silli,SPRA,Sillipur,SLH,Silyari,SLGR,Simaluguri Jn,SAE,Simaria,SMTL,Simariatal,SAKA,Simariya Kajanwada,SMBL,Simbhooli,SCM,Simhachalam,SCMN,Simhachalam North,SLG,Simlagarh,SMDR,Simodara,SMH,Simraha,SBV,Simri Bakhtiyarpur,STL,Simultala,SMX,Simurali,SYE,Sindewahi,SDZ,Sindhar,SDD,Sindhawadar,SNDD,Sindhudurg,SNI,Sindi,SNK,Sindkheda,SDBH,Sindri B H,SNMY,Sindri Marshalling Yard,SNDT,Sindri Town,SFZ,Sinduria Kachari,SYW,Sindurwa,SHI,Singanallur,SKL,Singaperumalkoil,SPRD,Singapuram Road,SGRM,Singaram,SKM,Singarayakonda,SNPR,Singarpur,SQB,Singhabad,SGRP,Singhirampur H,SIPA,Singhpokharia,SNGP,Singhpur,SPDM,Singhpurdumra,SNCA,Singra,SGRL,Singrauli,SGYW,Singriyawan H,SIU,Singur,SGW,Singwal,SYQ,Sinhan,SINI,Sini Jn,SINR,Sinor,SIN,Sion,SPYA,Sipaya H,SGBA,Sir Gurudass Banerjee H,SRJN,Sirajnagar H,SRY,Sirari,SRAS,Siras,SRO,Sirathu,SIRD,Sird,SIRA,Sirhi Itara,SIR,Sirhind Jn,SRPM,Siripuram,SRJM,Sirjam,SY,Sirkazhi,SIF,Sirli,SRMT,Sirmuttra,SCP,Sirnapalli H,SOH,Sirohi Road,SYO,Siroliya,SKZR,Sirpur Kaghaznagar,SRUR,Sirpur Town,SIY,Sirri,SSA,Sirsa,SRSL,Sirsala,SSL,Sirsaul,SRMP,Sirsi Mukhdumpur,SSF,Sirsuphal,SRVT,Siruvattur,SSGR,Sisai Gulab Rai H,SSKA,Sisarka,SISN,Sisauna,SVHE,Sisvinhalli H,SBZ,Siswa Bazar,STBJ,Sitabanji,STPD,Sitafal Mandi,STNR,Sitalnagar,STLR,Sitalpur,STLB,Sitalpur Bengal,SMI,Sitamarhi,STPT,Sitampet H,SNM,Sitanagarm,SCC,Sitapur Cantt,SPC,Sitapur City Jn,STP,Sitapur Jn,STRK,Sitapur Kuthcery Hal,SPRM,Sitapuram Ph,STN,Sitarampur,SEV,Sithalavai,STLI,Sithouli,SII,Sitimani,SURI,Siuri,SZV,Sivadi,SVGA,Sivaganga,SVKS,Sivakasi,SPV,Sivapur,SIVN,Sivnar H,SVQ,Sivok,SVN,Sivungaon,SWDE,Siwaha,SWE,Siwaith,SV,Siwan Jn,SVC,Siwan Kacheri F,SWNI,Siwani,SBD,Sleemanabad Road,SXF,Sobhapur,SEP,Sodepur,SGAC,Sogaria Cabin,SOGR,Sogora,SGP,Sohagpur,SOHL,Sohal,SAWN,Sohansra,SOW,Sohsarai,SLW,Sohwal,SOD,Sojat Road,SJTR,Sojitra,SGM,Solagampatti,SOL,Solan,SUR,Solapur Jn,SLZ,Solari,SDVL,Soldevanahalli H,SLM,Somalapuram,SMKT,Soman Katti,SKPT,Somanayakkanpatti,SNO,Somanur,SOS,Somesar,SMWA,Someshwara,SDV,Somidevipalle,SOM,Somna,SMNH,Somnath,SPT,Sompeta,SOQ,Sompur Road,SOAE,Somra Bazar,SMNE,Somtane,SMTN,Somthan,SEB,Son Nagar Jn,SNAP,Sona Arjunpur,SSCR,Sonachara,SAD,Sonada,SVH,Sonadanga,SOR,Sonagir,SYZ,Sonai,SI,Sonaili,SXN,Sonakhan,SONA,Sonamukhi Ph,SZE,Sonardih,SPR,Sonarpur Jn,SNSN,Sonasan,SBM,Sonbarsa Kacheri,SNV,Sondad,SXC,Sondalia,SCN,Sondha Road,SND,Sondimra,SNN,Sonegaon,SPB,Sonekhpur H,SGD,Songadh,SONI,Soni,SNYN,Soniana,SIC,Sonik,SNP,Sonipat,SNRP,Sonipur Rupal H,SNKB,Sonkhamb,SEE,Sonpur Jn,SNSL,Sonshelu,SQL,Sontalai,SNTH,Sonthaliya,SWR,Sonua,SWO,Sonwara,SONW,Sonwarsa H,SRTE,Soorothee,SXZM,Sopore,SORI,Sorai,SBE,Sorbhog,SORO,Soro,SRNK,Soron Shukar Kshetra,SRTA,Sorta,SPQ,Sorupeta,SOLA,Sovabazar Ahiritola,SRVN,Sravanur H,SBBJ,Sri Bala Bramareshwara Jogulamba,SDGH,Sri Dungargarah,SJDR,Sri Jhadeswar Ph,KHT,Sri Kalahasti,SKN,Sri Krishna Nagar,SSPN,Sri Sathya Sai Prasanti Nilayam,SVPM,Sri Venkateswarapalem,SBNR,Sri Vijainagar,CHE,Srikakulam Road,SINA,Srinagar,SNAR,Srinagar,SHAN,Srinivasa Nagar H,SVS,Srinivasapura,SRPU,Sripur H,SRNR,Sriramnagar,SRPB,Srirampur Assam,SRGM,Srirangam,SVV,Srivaikuntam,SVPR,Srivilliputtur,SGKM,Srungavruksham,STM,St Thomas Mount,SPF,Stuartpuram,SXQ,Suaheri H,SBNM,Subarnamrigi H,SFG,Subedarganj,SUBR,Subhagpur,SBGR,Subhas Gram,SBHR,Subrahmanya Road,SZM,Subzi Mandi,SHN,Suchan Kotli,SUCH,Suchindram,SCPD,Suchipind H,SDMD,Sudamdih,SUD,Sudhani,SDRA,Sudhrana,SUX,Sudiyur,SDF,Sudsar,SUI,Sui,SSIA,Suisa,SJPA,Sujalpur P H,SUJH,Sujangarh,SJNP,Sujanpur,SJPM,Sujatapuram H,SPLE,Sujnipara,SUJR,Sujra,SKHK,Sukhasan Kothi H,SCV,Sukhchain,SUW,Sukhi Sewaniyan,SKEN,Sukhshena H,SKND,Sukinda Road,SKLI,Sukli,SN,Sukna,SOY,Sukri Mangela,SUKU,Suku,SUL,Suladhal,SLHP,Sulah Himachal Pradesh,SBH,Sulebhavi,SUH,Sulehalli,SLGE,Sulerjavalge,SGRE,Sulgare,SULH,Sulhani,SPE,Sullurupeta,STBD,Sultanabad,SGG,Sultanganj,SLN,Sultanpur Jn,STKW,Sultanpur Kaliawas,SQR,Sultanpur Lodi,SUU,Sulur Road,SMV,Sumaoli,SUMR,Sumer,SUDV,Summadevi,SHZ,Summer Hill,SUM,Summit,SMRR,Sumreri,SFM,Sunam,SPL,Sundaraperumal Koil,SNBD,Sunderabad,SUDR,Sunderpur Halt,SDAM,Sundhia Mau,SDLK,Sundlak,SFA,Sunehra,SNKE,Sunehti Kharkhari H,SUNM,Sunmai H,SOU,Supaul,SPD,Supedi,SZK,Sur Khand Ka Khera,SRX,Sura Nussi,SIP,Suraimanpur,SUIA,Suraincha H,SRJK,Surajkunda,SJQ,Surajpur Road,SDM,Surareddipalem,SSGJ,Surasaraighat Jhara,ST,Surat,SOG,Suratgarh Jn,SL,Surathkal,SURP,Suratpura Jn,SRVX,Suravali H,SURL,Sureli,SUNR,Surendranagar,SRGT,Surendranagar Gate,SRRG,Surer Goth,SGBJ,Surgaon Banjari,SAW,Suriawan,SJKL,Surjakamal,SJPR,Surjyapur F,SLRD,Surla Road,SPO,Surpura,SSKL,Suskal,SWS,Suwansa,SVA,Suwasra,SDLE,Swadinpur,SNC,Swami Narayan Chhapia,SWI,Swamimalai,SRPJ,Swarupganj,TADA,Tada,TPY,Tadakalpudi,TAA,Tadala Pusapalli,TAE,Tadali,TDD,Tadepalligudem,TU,Tadipatri,TDK,Taduku,TVL,Tadwal,TID,Tagdi,THP,Taherpur,TSF,Tahsil Fatehpur,TBR,Taiabpur,TNJR,Taj Nagar,TJP,Tajpur,TJD,Tajpur Dehma,TKR,Takari,TKHE,Takarkheda,TZH,Takazhi,TKHA,Takha,TKRU,Takhrau H,TKF,Taki Road,TQA,Takia,TKP,Takipur,TKPH,Takipur Halt,TKO,Takkolam,TKI,Takli,TKLB,Takli Bhansali,TKMY,Taklimiya,TSL,Taksal,TAKU,Taku,TALA,Tala,TABU,Talaburu,TVS,Talaivasal,TAY,Talaiyuthu,TLKH,Talakhajuri,THKU,Talaku,TAV,Talala Jn,TLMG,Talamadugu,TMC,Talamanchi,TLNR,Talanallur,TLO,Talandu,TLL,Talap,TLRA,Talara,TLZ,Talavli,TBT,Talbahat,TLHR,Talcher,TLHD,Talcher Road,TLC,Talchhapar,TLX,Taldi,TGN,Talegaon,TLE,Talgoria,TLGP,Talguppa,THJ,Talheri Bazurg,TLMR,Taliamura,TIT,Talit,TLJ,Taljhari,TALL,Tall Jn,TSS,Talli Saida Sahu,TMD,Talmadla,TLN,Talni,TOD,Talod,TUD,Talodhi Road,TPND,Taloja Panchnand,TLPH,Talpur,TLV,Talvadya,TWB,Talwandi,TMP,Tamaraipadi,TBM,Tambaram,TBMS,Tambaram Sanatorium,TOI,Tamkuhi Road,TMZ,Tamluk,TAO,Tamna,TMA,Tamuria,TKU,Tanakallu,TPU,Tanakpur,TDO,Tanda Urmar,TNI,Tandarai,TXM,Tandavapura H,TDU,Tandur,TDW,Tandwal,TGM,Tangarmunda Bh,TGRL,Tangiriapal,TNL,Tangla,TRA,Tangra,TGB,Tangrabasuli B S,TNR,Tanguturu,TKN,Tankuppa,TPO,Tantpur,TNKU,Tanuku,TA,Tanur,TAPA,Tapa,TAP,Tapang,TOP,Tapasi,TNNH,Tapaswinarayan Nagar H,TPN,Tapona,TKUR,Tappa Khajuria H,TPZ,Tapri Jn,TRBE,Tarabari,TVI,Taradevi,TNX,Tarak Nagar H,TAK,Tarakeswar,TRMN,Taramani,TAN,Tarana Road,TRAH,Taranga Hill,TRN,Taraon,TRR,Taraori,TPF,Tarapith Road,TRP,Tarapur Jn,TRWT,Taravata,TBL,Tarchhera Baraoliran,TEA,Taregna,TAZ,Targaon,TRJ,Tariasujan,TRG,Tarighat,TGU,Tarigoppula,TKE,Tarikere,TLU,Tarlupadu,TTO,Tarn Taran,TRF,Taropa,TKLN,Tarra Kalan,TRSR,Tarsai,TRS,Tarsarai,TR,Tarur,TATA,Tatanagar Jn,TSAH,Tatasigua,TATI,Tati,TBH,Tatibahar,TAC,Taticherla,TIS,Tatisilwai,TIP,Tattapparai,TVG,Tavargatti,TEO,Teegaon,TGA,Teghra,TKA,Teharka,THA,Tehta,TJH,Tejgadh,TNPR,Tejnarayanpur DK,TJW,Tejpurwa H,TKVR,Tek Newas,TKBG,Teka Bigha H,TEK,Tekkali Ph,TQR,Tektar F,TOU,Telaprolu,TELI,Teli,TELY,Telia,TBD,Telibandha P.H.,TLGI,Teligi,TELO,Telo,TETA,Telta,TMB,Temburu,TEP,Tempa,TEL,Tenali Jn,TNRI,Teneri H,TGQ,Tenganmada,TSI,Tenkasi Jn,TNRU,Tenneru H,TNJE,Tentulia,TYAE,Tenya,TBU,Terban H,TERH,Terha H,TTLA,Tetelia,TTU,Tettu,TET,Tetulmari,TYK,Thabalke,THY,Thadi,TER,Thair,THM,Thaiyat Hamira,TKTB,Thakurbari,TKG,Thakurganj,TKC,Thakurkuchi,THK,Thakurli,TKNR,Thakurnagar,TKH,Thakurtola P H,TKW,Thakurvadi,TUG,Thalangai,TLY,Thalassery (Tellicherry),THEA,Thalera,TLWA,Thalwara,TMGN,Thamla Mogana,THAN,Than Jn,THBN,Thana Bhawan,TBTN,Thana Bhawan Town H,THB,Thana Bihpur Jn,THDR,Thandla Road,TNA,Thane,TNDE,Thanesar City,TGDE,Thangundi,TJ,Thanjavur,THS,Thansit,TNW,Thaparnagar,THR,Thara,TB,Tharbitia,TAR,Tharsa,THW,Tharwai,TAS,Thasra,THMR,Thathana Mithri,TTQ,Thathankulam,THE,Thawe Jn,TQL,Theh Qalandar,TGE,Thekeraguri,THV,Therubali,TPPI,Thipparthi,MTMY,Thirumayilai,TNU,Thirunettur,TUY,Thiruthuraiyur,TVR,Thiruvarur Jn,THVM,Thivim,TOK,Thokur,TDV,Thondebhavi,TNGR,Thonganur,TCR,Thrisur,THUR,Thuria,TWV,Thuwavi,TIHU,Tihu,TIK,Tik,TKMG,Tikamgarh,TKLE,Tikani H,TKYR,Tikaria,TKRP,Tikauli Rawatpur,TKWD,Tikekarwadi,TPKR,Tikiapara,TKPL,Tikirapal P H,TKRI,Tikiri,TKT,Tikkotti,TKRA,Tikra P H,TRE,Tikri H,TQN,Tikunia,TIA,Tilaiya,TKJ,Tilak Bridge,TKNG,Tilak Nagar,TIU,Tilaru,TLT,Tilati,TLNH,Tilaunchi,TBB,Tilbhita,TBX,Tilbhum,TLD,Tilda,TDLE,Tildanga,TLH,Tilhar,TL,Tiloniya,TIL,Tilrath,TWL,Tilwara,TBN,Timarni,TBA,Timba Road,TBV,Timbarva,TIC,Timmachipuram,TIM,Timmanacherla,TMX,Timmapur,TMPM,Timmapuram H,TMT,Timtala,TMH,Tin Mile Hat,TGT,Tinai Ghat,TNUE,Tindauli,TDH,Tindharia,TMV,Tindivanam,TII,Tingrai,TH,Tinich,TNH,Tinkheda,TNT,Tinnapatti,TPH,Tinpahar Jn,TPV,Tinpheria H,TSK,Tinsukia Jn,TPK,Tipkai,TPG,Tipling,THPR,Tippapur,TTR,Tiptur,TUL,Tiraldih,TRDI,Tirodi,TRO,Tirora,TCNR,Tiruchanur,TP,Tiruchchirapalli Fort,TPJ,Tiruchchirappalli Jn,TPE,Tiruchchirappalli Palakarai,TPTN,Tiruchchirappalli Town,TCH,Tiruchchuli,TCN,Tiruchendur,TRK,Tirukkovilur,TMLP,Tirumalpur,TMQ,Tirumangalam,TMU,Tirumathikkunnam,TYM,Tirumayam,TMVL,Tirumullaivayil,TRM,Tirunagesvaram,TEN,Tirunelveli,TYT,Tirunelveli Town,TI,Tiruninravur,TUA,Tirunnavaya,TDN,Tiruparankundram,TPTY,Tirupati,TPW,Tirupati West H,TPT,Tirupattur,TPC,Tiruppachetti,TDPR,Tiruppadirippuliyur,TUP,Tiruppur,TVN,Tiruppuvanam,TIR,Tirur,TLM,Tirusulam,TTL,Tiruttangal,TRT,Tiruttani,THL,Tiruvalam,TO,Tiruvalangadu,TRVL,Tiruvalla,MTCN,Tiruvallikeni,TRL,Tiruvallur,TYMR,Tiruvanmiyur,TNM,Tiruvannamalai,TVNL,Tiruvennainallur Road,TRB,Tiruverumbur,TDR,Tiruvidaimarudur,TRVZ,Tiruvizha,TVT,Tiruvottiyur,TISI,Tisi,TSA,Tisua,TTB,Titabar,TGH,Titagarh,TLA,Titavala,TIG,Titlagarh,TT,Titte,TOR,Titur,TTW,Titwa,TIW,Tivari,TDP,Todarpur,TDPM,Todiyappulam,TUN,Tohana,TPQ,Tokapal,TKS,Tokisud,TKOT,Tokkuttu,THN,Tolahunse,TOS,Tolasampatti,TLG,Tollyganj,TRZ,Tolra,TMKA,Tomka,TNGM,Tondala Gopavaram,TOM,Tondamanpatti,TNP,Tondiarpet,TPP,Toppur,TNGL,Toranagallu Jn,TRAN,Torang,TORI,Tori,TORA,Torniya,TWI,Totewahi,TPM,Totiyapalaiyam,THX,Tovalai,TZD,Tozhuppedu,SGPA,Tp No. 6/3 (Sugapahari Halt),SAPT,Tp No. 7/11 (Sugapahari Halt),TEG,Tribediganj,TBAE,Tribeni,TKQ,Trikarpur,TLMD,Trilochan Mahadeo,TRPL,Tripal,TRTR,Tripunitura,TVC,Trivandrum Central,TVP,Trivandrum Pettah,TKND,Trivikaramdeo Nagar H,TKBN,Tsakibanda,TSR,Tsunduru,TFGN,Tufanganj,TKD,Tugalakabad,TGL,Tuggali,TPNI,Tuiyapani,TTZ,Tukaithad,THO,Tulin,TGP,Tuljapur,TLAM,Tulsi Ashrarn,TLGR,Tulsi Nagar H,TY,Tulukapati,TMPY,Tumboli,TK,Tumkur,TMLU,Tummalacheruvu,TAT,Tummanamgutta,TMR,Tumsar Road,TMS,Tumsar Town,TDL,Tundla Jn,TNO,Tundu,TUNG,Tung,TNGI,Tungi H,TUNI,Tuni,TUX,Tunia,TKB,Tupkadih,TUVR,Turavur,TUH,Turbhe,TRKR,Turekala Road,TJM,Turinjapuram,TKPY,Turkapalli,TUR,Turki,TZR,Turki Road,TTI,Turtipar F,TN,Tuticorin,TME,Tutimelur,TUV,Tuvvur,TUWA,Tuwa,TWG,Twining Ganj,TXD,Tyada,TCL,Tyakal,UBN,Ubarni,UCA,Uchana,UCP,Uchippuli,UAM,Udagamandalam,UDZ,Udaipur City,UDPR,Udaipura,ULG,Udalguri,UKR,Udalkachhar,UDKN,Udaypur Khurd H,URP,Udayrampur H,UDGR,Udgir,UHP,Udhampur,UDN,Udhna Jn,UMS,Udramsar,UDT,Udumalaippettai,UD,Udupi,UVD,Udvada,UWNR,Udwant Nagar H,UDK,Udyankheri,UGN,Ugaon,UGR,Ugar Khurd,UGP,Ugarpur,UGNA,Ugna,URPR,Ugrasenpur,UGU,Ugu,UGWE,Ugwe,UJ,Ujalvav,UJH,Ujhani,UJP,Ujiarpur,UJN,Ujjain Jn,USD,Ukai Songadh,UKH,Ukhali,UKA,Ukhra,UKLR,Ukilerhat H,UKN,Uklana,UKC,Ukshi,UPD,Ulavapadu,ULNR,Ulhasnagar,UKD,Ulindakonda,ULL,Ullal,ULN,Ulna Bhari,ULB,Ulubaria,ULU,Ulundurpet,UML,Umalla,UTA,Umar Tali,UM,Umardeshi,UBR,Umargam Road,UMR,Umaria,UIH,Umaria Isra,UMPD,Umarpada,UR,Umdanagar,UMED,Umed,UMNR,Umeshnagar,UMRA,Umra,ULA,Umra Nala,UMM,Umram,URR,Umred,UMH,Umreth,UMRI,Umri,UOI,Umroli,UNA,Una Gujrat,UHL,Una Himachal,UNI,Unai And Vansada Road,UNLA,Unaula,UVSN,Unawa Vasan,UCR,Unchahar Jn,UCH,Unchaulia,UND,Unchdih,UHR,Unchhera,UCB,Unchi Bassi,UDM,Undasa Madhawapu,UNDI,Undi,VGT,Unguturu,UNL,Unhel,URL,Unjalur,UJA,Unjha,UNK,Unkal,ON,Unnao Jn,URD,Untari Road,URML,Uparmal,UPI,Uplai,UA,Upleta,OPL,Uppal,UAA,Uppala,UPW,Uppalavai,UPL,Uppalur,UGD,Uppugunduru,UPM,Urappakkam,UREN,Uren,URGA,Urga,URK,Urkura,ULM,Urlam,URMA,Urma,URI,Uruli,USL,Usalapur,USK,Usiakhas H,UB,Uska Bazar,UMD,Usmanabad,UPR,Usmanpur,USRA,Usra,UTL,Utarlai,UTD,Utarsanda,UTR,Utraitia Jn,URN,Utran,UTP,Utri Pura,UKV,Uttamarkovil,UMG,Uttangal Mangalam,UTN,Uttar Radha Nagar H,UKE,Uttarkathani,UPA,Uttarpara,UKL,Uttukuli,VPH,Vachaspatinagar,VRJ,Vadaj,BDJ,Vadakara (Badagara),VAL,Vadal,VDLR,Vadala Road,VAE,Vadali,VLTR,Vadali Luter Road,VLU,Vadalur,VDM,Vadamadura,VDKS,Vadanamkurushshi,VDN,Vadgaon,WDN,Vadgaon Nila,VAN,Vadhvana,VDP,Vadippatti,VDV,Vadiya Devli,VMD,Vadlamannadu H,VDG,Vadnagar,VXD,Vadod,BRC,Vadodara Jn,VTL,Vadtal Swaminarayan,VD,Vagdiya,VGL,Vaghli,VU,Vaghpura,VBW,Vaibhavwadi Road,VARD,Vaikam Road,VTN,Vaitarna,VDL,Vaithisvarankoil,VPJ,Vaiyampatti,VH,Vakada,WKA,Vakav,VLDR,Valadar,VLDE,Valadi,VTV,Valantaravai,VAPM,Valapattinam,VGE,Valappadi Gate,VLT,Valathoor,VRA,Valavanur,WLH,Valha,VV,Valivade,VLYN,Vallabh Vidhya Nagar,VBN,Vallabhnagar,VMP,Vallampadugai,VPZ,Vallapuzha,VTK,Vallattolnagar,VLG,Valligonda,VLI,Valliukunnu,VLV,Vallivedu,VLY,Valliyur,VKNR,Valmikinagar Road,BL,Valsad,WLA,Valtoha,VBR,Vambori,MEJ,Vanchi Maniyachchi Jn,VDR,Vandalur,VNGL,Vangal,VGI,Vangani,VRN,Vanganur,VGN,Vangaon,VNRD,Vani Road,BNBH,Vanivihar Ph,VN,Vaniyambadi,VNB,Vaniyambalam,VNJ,Vanjipalaiyam,VKL,Vankal,VAPI,Vapi,VRDP,Varadapur,VRX,Varahi,VKP,Varakalpattu,BCY,Varanasi City,BSB,Varanasi Jn,VNA,Varangaon,VRE,Varediya,VTDI,Varetha,VAK,Varkala,VRKD,Varkhedi,VRM,Varnama,VTJ,Vartej,VADR,Varud,VVA,Varvala,VDA,Vasad Jn,VAS,Vasai Dabhla,BSR,Vasai Road,VSG,Vasco Da Gama,VSH,Vashi,VSD,Vasind,VASO,Vaso,VTP,Vastrapur,VAT,Vatlur,VTA,Vatva,VKG,Vavadi Khurd,WWA,Vavaniya,VVD,Vavdi,VVV,Vavera,VLD,Vayalpad,VAY,Vayalur,VZPH,Vazeer Pur,VDE,Vedayapalem,VDH,Vedchha,VEER,Veer,VJK,Vejalka,VJA,Vejandla,VLCY,Velachery,VLC,Velachha,VGH,Velangi,VDI,Veldurti,VELI,Veli H,VXM,Velippalaiyam,VLE,Vellacheruvu,VLNK,Vellankanni,VEL,Vellanur,VEK,Vellarakkad,VLL,Vellayil,VEI,Velliyanai,VLR,Vellore Cantt,VT,Vellore Town,VER,Vellur H,VPU,Velpuru,VEM,Vempalli,VML,Vemulapadu,VMU,Vemuru,VDD,Vendodu,VND,Vendra H,VKT,Venkatachalam,VKI,Venkatagiri,VTE,Venkatagirikote H,VPL,Venkatampalle,VKZ,Venkatanarasimharajuvaripeta,VKR,Venkatnagar,VKM,Venketesapuram,VNP,Venora,VPG,Ventrapragada,VGA,Vepagunta,VEU,Veppampattu,VRL,Veraval,VKA,Verka Jn,VEN,Verna,VTM,Vetapalem,BHS,Vidisha,VWA,Viduraswatha,VAR,Vidyanagar,VPDA,Vidyapatidham,VDS,Vidyasagar,VVH,Vidyavihar,VJF,Vijapur,VZ,Vijayamangalam,VJR,Vijayanagar,BZA,Vijayawada Jn,VJP,Vijaypur,VJPJ,Vijaypur Jammu,VJD,Vijpadi Road,VKB,Vikarabad Jn,VKH,Vikhran Road,VK,Vikhroli,VMA,Vikramgarh Alot,VRG,Vikramnagar,VVN,Vikravandi,VL,Vilad,VID,Vilavade,VYK,Vilayat Kalan Road,VLN,Vilegaon,VLP,Ville Parle,VI,Villianur,VLK,Villivakkam,VB,Villiyambakkam,VM,Villupuram Jn,BNKM,Vinaekma Halt,BDL,Vindhyachal,VINH,Vinhere,VGM,Vinnamangalam,VKN,Vinukonda,VQD,Viramdad,VG,Viramgam Jn,VRLR,Viranialur,VRPD,Virapandy Road,VP,Virapur,VR,Virar,VRQ,Virarakkiyam,VRV,Viravada,VRVL,Viravalli H,VVR,Viravanallur,VVM,Viravasaram,VRH,Virbhadra H,VJ,Virinchipuram,VCN,Virochannagar,VOL,Virol,VRR,Virpur,VPT,Virudunagar Jn,VUL,Virul,VSKP,Visakhapatnam,VPR,Visapur,VSW,Visavadar,VNUP,Vishnupuram,VRB,Vishrambag,VS,Vishvamitri Jn,VNE,Vishwanath Charali,VNG,Visnagar,VLDI,Vithalwadi,VVB,Vivek Vihar,VVKP,Vivekanandpuri,VZM,Vizianagaram Jn,VOC,Voc Nagar,VONB,Vondh,VRI,Vriddhachalam Jn,VRT,Vriddhachalam Town,VRBD,Vrindaban Road,BDB,Vrindavan,VYA,Vyara,VYN,Vyasanagar,VJM,Vyasarpadi Jeeva,WKI,Wadakancheri,WDG,Wadegaon,WC,Wadhwan City,WADI,Wadi Jn,WDR,Wadiaram,WADO,Wadoda,WSA,Wadsa,WDS,Wadsinge,WDLN,Wadwal Nagnath H,WGI,Waghai,WGA,Waghoda,WG,Wagholi,WAIR,Wair,WJ,Walajabad,WJR,Walajah Road,WRA,Walayar,WLGN,Walgaon,WND,Wan Road,WW,Wanabar H,WDL,Wandal,WDJ,Wander Jatana,WNG,Wanegaon H,WP,Wangapalli,WANI,Wani,WKRC,Wankaner City,WKR,Wankaner Jn,WPR,Wanparti Road,WSJ,Wansjaliya Jn,WL,Warangal,WRI,Warasoni,WR,Wardha Jn,OYR,Waria,WRGN,Warigaon Newada H,WRS,Warisaliganj,WGJ,Warisganj H,WRR,Warora,WOC,Warud Orange City,WRD,Warudkhed,WST,Washermanpet,WHM,Washim,WSB,Washimbe,WSD,Wasud,WTR,Wathar,WZJ,Wazerganj,WEL,Wellington,WENA,Wena,WH,West Hill,WFD,Whitefield,VHGN,Wihirgaon,WCN,Wimco Nagar,WIRR,Wirur,WRC,Wrs H,WDM,Wyndhamganj,YADA,Yadavalli,YG,Yadgir,YDLP,Yadlapur,YDD,Yadudih,YGM,Yadugram Bh,YDV,Yadvendranagar H,YKA,Yakutpura,YLG,Yalvigi,JAB,Yamuna Bridge,JSB,Yamuna South Bank,YAG,Yaqutganj H,YGA,Yaragoppa H,YAL,Yataluru,YTL,Yavatmal,YVP,Yawarpura,YDM,Yedamangala H,YDP,Yedapalli,YSI,Yedshi,YNK,Yelahanka Jn,YGL,Yelgur,Y,Yeliyur,YLK,Yellakaru,YNG,Yenugonda,YL,Yeola,YS,Yermaras,YPD,Yerpedu,YGD,Yerragudipad,YA,Yerraguntla,YPR,Yesvantpur Jn,YAD,Yeulkhed,YT,Yevat,YEAM,Yogendra Dham H,YFP,Yusufpur,ZBD,Zafarabad Jn,ZB,Zahirabad,ZNA,Zamania,ZPI,Zampani H,ZPL,Zangalapalle,ZKV,Zankhvav,ZARP,Zarap,ZW,Zawar,ZP,Zerpur Pali,ZNP,Zindpura H,ZPR,Zorawarpura,Stn Code,Town,SSPN,Puttaparthi,KRNT,Srisailam,JTTN,Kaziranga,GAYA,Bodhgaya,VRL,Daman,VRL,Diu,VAPI,Silvassa,GIMB,Kandla,BHUJ,Kutch,VRL,Sasan gir,DLSR,Dalhousie,PTK,Dharamshala,SML,Kullu,SML,Manali,JAT,Amarnath,JAT,Kashmir,JAT,Vaishno Devi,MYS,Coorg,HPT,Hampi,SMET,Jog Falls,TVC,Kovalam,ALLP,Kumarakom,ERS,Munnar,CNGR,Sabarimala,KTYM,Thekkady/Periyar,PPI,Pachmarhi,AWB,Ajanta & Ellora,BCT,Elephanta Caves,PNVL,Navi-Mumbai,SNSI,Shirdi,BBS,Konark,ABR,Mount Abu,AWR,Sariska,NJP,Gangtok,RMM,Dhanushkodi,DG,Kodaikanal,MAS,Mahabalipuram,UAM,Ooty,SA,Yercaud,HW,Badrinath,RMR,Corbett,DDN,Gangotri,HW,Kedarnath,DDN,Mussoorie,KGM,Nainital,DDN,Yamunotri,CG,Sunderbans,GHY,Assam,MAO,Goa,DMV,Nagaland,ERS,Kerala,NJP,Sikkim,JUD,Yamunanagar";var sStationsData=StationsData.split(',');var StationsList=new Array(8432);for(var s=0,i=0;s<sStationsData.length;s+=2,i++)StationsList[i]=new Array(sStationsData[s],sStationsData[s+1]);

var StationsData="ABB,Abada,ADST,Adi Saptagram,AGP,Agarpara,AGAE,Agradwip,AKIP,Akaipur H,AKRA,Akra,ARNB,Amarun,ABKA,Ambika Kalna,AMZ,Amta,ADL,Andul,AMBG,Arambag,AG,Aranghata,ASKR,Ashoknagar Road,BDZ,Badkulla,BBR,Bagh Bazar,BGJT,Bagha Jatin F,BGRA,Baghnapara,BGF,Bagila,BZN,Bagnan,BGL,Bagula,BARU,Baharu F,BAHW,Bahir Khanda,BHKA,Bahira Kalibari,BHGH,Bahirgachhi H,BHPA,Bahirpuya H,BBAE,Baidyabati,BOI,Bainchi,BCGM,Bainchigram,BGAE,Balagarh,BLAE,Balarambati,BGNA,Balgona,BCK,Balichak,BLY,Bally,BLYG,Bally Ghat,BLYH,Bally H,BLN,Ballygunge Jn,BMG,Bamangacchi,BAAR,Bandar Ph,BDC,Bandel Jn,BNJ,Bangaon Jn,BNKA,Bankimnagar H,BKNM,Bankra Nayabaz,BPN,Banpur,BSAE,Bansh Baria,BARN,Baranagar Road,BT,Barasat Jn,BRDB,Barda,BWN,BarddhamanJn,BAC,Bargachia,BZB,Barra Bazar,BP,Barrackpore,BRPA,Barui Para,BRP,Baruipur Jn,BSHT,Basirhat,BSD,Basuldanga,BYSA,Basulya Sutahata,BTKB,Bathna Krittibas H,BVA,Bauria Jn,BPAE,Begampur,BHLA,Behula,BZL,Belanagar,BQY,Belerhat,BLH,Belgharia,BGRD,Beliaghata Road,BMAE,Belmuri,BEQ,Belur,BRMH,Belur Math,BBDB,Benoy Badal Dinesh Bag,BTPG,Betberia Ghola H,BHR,Bhadreshwar,BFZ,Bhandartikuri,BSLA,Bhasila,BTRH,Bhatar H,BHNA,Bhayna H,BOP,Bhogpur,BBLA,Bhyabla,BNAA,Bibhuti Bhushan H,BNXR,Bidhannagar Road,BDYP,Bidyadharpur F,BNBA,Biman Bandar,BIRA,Bira,BBT,Birati,BIJ,Birnagar,BSBP,Birshibpur,BRPK,Bisharpara Kodaliya,VSPR,Bisnupriya H,BRJ,Brace Bridge,BGB,Budge Budge,CG,Canning,CDH,Chakdaha,CMDG,Chamardighi,CHT,Champahati,CQR,Champapukur,CHC,Chanchal H,CGR,Chandan Nagar,CDAE,Chandanpur,CDP,Chandpara,CGA,Chengel,CNS,Chuchura,CPHT,Coopers Halt,DHAE,Dainhat,DAKE,Dakhineswar,DBT,Dakshin Barasat,DKDP,Dakshin Durgapur H,DKB,Dakshinbari,DKAE,Dankuni,DNI,Dansi Ph,DSNR,Dashnagar,DTK,Dattapukur,DBP,Debipur,D,Deula,DTE,Deulti,DHK,Dhakuria F,DMU,Dhamua,DNHL,Dhaniakhali H,DPDP,Dhapdhapi,DTAE,Dhatrigram,DH,Diamond Harbour,DEA,Diara,DTG,Dignagar,DJR,Domjur,DMJR,Domjur Road,DUAN,Duan,DDC,Dumdum Cantonment,DDJ,Dumdum Jn,DMLE,Dumurdaha,DZK,Durgachak,DZKT,Durgachak Town,DGNR,Durganagar F,EDG,Eden Garden,FLR,Fuleswar,GGP,Gangnapur F,GRP,Gangpur,GIA,Garia F,GFAE,Garifa,GQD,Gaurdaha H,GEDE,Gede,GGTA,Ghoraghata,GGV,Ghoraras Ghona H,GOF,Ghutiari Sharif,GMDN,Giri Maidan,GBG,Gobardanga,GBRA,Gobra,GCN,Gocharan,GKL,Gokulpur,GN,Gopalnagar F,GUMA,Guma,GPAE,Guptipara,GRAE,Gurap,GURN,Gurudas Nagar,HBE,Habibpur,HB,Habra,HIH,Hajigarh,HLZ,Haldia,HLR,Halishahar,HPL,Haripal,HDC,Harishdadpur Ph,HRSR,Harishnagar H,HRO,Harua Road,HNB,Hasanabad Jn,HAUR,Haur,HMZ,Hind Motor,HGA,Hogla H,HGY,Hooghly,HYG,Hooghly Ghat,HT,Hotar,HWH,Howrah Jn,HHR,Hridaypur,IP,Ichhapur,JDP,Jadabpur,JGDL,Jagadal,JPR,Jakpur,JKL,Jalal Khali,JLI,Jalalsi P H,JOX,Janai Road,JRAE,Jaugram,JNM,Jayanagar Majilpur H,JSOR,Jessore Road,JLBR,Jhaluarbar,JPQ,Jhapandanga,JIT,Jirat,KKAE,Kaikala,KWDP,Kakdwip,KLKR,Kalikapur F,KLNT,Kalinagar,KLNP,Kalinarayanpur Jn,KLYG,Kalyani Ghoshpara,KYI,Kalyani Jn,KLYS,Kalyani Silpanchal,KLYM,Kalyani Simanta,KYP,Kalyanpur,KQU,Kamarkundu,KQLS,Kamarkundu (Lower),KMRA,Kamnara,KPA,Kanchrapara,KNR,Kankinara,KMZA,Kankra Mirzanagar,KNJI,Karanjali H,KBGH,Karea Kadambagachi,KJRM,Karjanagram,KJRA,Karjara,KHGR,Kashinagar H,KWAE,Katwa Jn,KM26,Kazipara,KSBP,Keshabpur,KMAE,Khamargachhi,KHN,Khanyan,KGP,Kharagpur Jn,KDH,Khardaha,KSHT,Khetia,KIRP,Khidirpur,KHAI,Khirai,KIG,Kolaghat,KOAA,Kolkata,KONA,Kona Ph,KOG,Konnagar,KRXM,Krishnamohan H,KNJ,Krishnanagar City Jn,KGY,Kulgachia,KLW,Kulpi F,KJU,Kuntighat,LBTL,Labutala H,LKF,Lake Garden F,LKPR,Lakshmikantapur,LKX,Lakshmipur,LLH,Liluah,LOK,Loknath,MSL,Machhalandapur,MPJ,Madanpur,MDBP,Madhabpur H,MDSE,Madhu Sudanpur,MMG,Madhyamgram,MPN,Madhyampur,MPD,Madpur,MUG,Magra,MGT,Magra Hat,MHLN,Mahendralalnagar,MSDL,Mahisadal,MJT,Majerhat,MIJ,Majhdia,MAJ,Majhergram,MJH,Maju PH,MDC,Makardaha,MPE,Malatipur,MAK,Malikpur,MLYA,Maliya H,MUU,Mankundu,MSAE,Massagram,MTAP,Matania Anantpur,MPRD,Mathurapur Road,MRGM,Maurigram,MAYP,Mayapur,MYHT,Mayurhat H,MCA,Mecheda,MYM,Memari,MTFA,Mertala Phaleya H,MDN,Midnapore,MBE,Mirzapur Bankipur,MNH,Munsirhat P H,NBRN,Naba Raynagar H,NDAE,Nabadwip Dham,NBAE,Nabagram,NH,Naihati Jn,NKL,Nalikul,NALR,Nalpur,NMKA,Namkhana,NDGJ,Nandaigajan P H,NDIM,Nandaigram Halt,NAI,Nangi,NPMR,Narayan Pakuria Murail,NRPR,Narendrapur H,NSF,Nasibpur,NTA,Netra,NACC,New Alipore,NBE,New Barrackpur,NGRI,New Garia,NMDR,Nimdanri,NMF,Nimo H,NCPM,Nischindapur Market H,NCP,Nishchindapur,PDPK,Padmapukur,PRAE,Palla Road,PXR,Palpara,PLAE,Palsit,PTF,Palta,PNCB,Panchberia H,PKU,Panskura,PTHL,Pantihal,PQS,Park Circus,PTKR,Patipukur,PTAE,Patuli,PDX,Payradanga,FLU,Phulia,PLF,Piali,PBZ,Porabazar,PPGT,Princepghat,PDA,Pundooah,PSAE,Purbasthali,RDU,Radhamohanpur,RGX,Raghunathbari,RGA,Rajagoda,RCD,Rajchandrapur,RMJ,Ramrajatala,RHA,Ranaghat Jn,RSLR,Rasulpur,RMTR,Re Mount Road,RIS,Rishra,SHBA,Sahebtala H,SMTG,Sahid Matangini,SKG,Saktigarh,SMAE,Samudragarh,SNU,Sangrampur,SNHT,Sanhati H,SEL,Sankrail,SSP,Santoshpur F,SRC,Santragachi Jn,STBB,Satberia H,SSPH,Satish Samanta P H,SDAH,Sealdah,SHE,Seoraphuli Jn,SHM,Shalimar,STB,Shantipur,SSRD,Shasan Road F,SRP,Shrirampur,SMCK,Shyam Chak,SNR,Shyamnagar,SHBC,Sibaichandi,SLG,Simlagarh,SMX,Simurali,SIU,Singur,SGBA,Sir Gurudass Banerjee H,SEP,Sodepur,SOAE,Somra Bazar,SPR,Sonarpur Jn,SXC,Sondalia,SOLA,Sovabazar Ahiritola,SBGR,Subhas Gram,SJPR,Surjyapur F,THP,Taherpur,TKF,Taki Road,TKPH,Takipur Halt,TALA,Tala,TLO,Talandu,TLX,Taldi,TLPH,Talpur,TMZ,Tamluk,TNX,Tarak Nagar H,TAK,Tarakeswar,TKNR,Thakurnagar,TPKR,Tikiapara,TGH,Titagarh,TLG,Tollyganj,TBAE,Tribeni,URP,Udayrampur H,UKLR,Ukilerhat H,ULB,Ulubaria,UTN,Uttar Radha Nagar H,UPA,Uttarpara";var sStationsData=StationsData.split(',');var StationsList=new Array(358);for(var s=0,i=0;s<sStationsData.length;s+=2,i++)StationsList[i]=new Array(sStationsData[s],sStationsData[s+1]);

var StationsData="ABU,Ambattur,AVN,Anavardikhanpettai,ANNR,Annanur,APB,Anuppambattu,AJJ,Arakkonam,AKM,Arambakam,AIPP,Attipattu Pudu Nagar H,AIP,Attippattu,AVD,Avadi,BBQ,Basin Bridge Jn,CGL,Chengalpattu Jn,MSB,Chennai Beach Jn,MAS,Chennai Central,MSC,Chennai Chetpat,MS,Chennai Egmore,MSF,Chennai Fort,MPK,Chennai Park,MPKT,Chennai Park Town,MCPK,Chepauk,MCPT,Chintadaripet,CTRE,Chitteri,CMP,Chromepet,EGT,Egattur,ELR,Elavur,ENR,Ennore,GWYR,Greenways Road,GI,Guduvancheri,GDY,Guindy,GPD,Gummidipundi,HC,Hindu College,INDR,Indra Nagar,KBT,Kadambattur,CJ,Kanchipuram,CJE,Kanchipuram East,KTBR,Kasturba Nagar,KAVM,Kathivakkam,KPD,Katpadi Jn,CTM,Kattangulatur,KVP,Kavaraippettai,MKK,Kodambakkam,KOTR,Korattur,KOK,Korukkupet,KTPM,Kotturpuram,MLHS,Light House,MBM,Mambalam,MAF,Manavur,MNDY,Mandaveli,MMNK,Maraimalai Nagar Kamarajar,MN,Minambakkam,MJR,Minjur,MSU,Mosur,MCN,Mukundarayapuram,NPKM,Nandiyampakkam,NTT,Nathapettai,NEC,Nemilicherry H,NBK,Nungambakkam,PZA,Palavantangal,PYV,Palayasivaram,PV,Pallavaram,PALR,Palur,PWU,Paranur,PAB,Pattabiram,PRES,Pattabiram E Depot,PVM,Pattaravakkam,PER,Perambur,PCW,Perambur Carriage Works,PEW,Perambur Loco Works,PRGL,Perungalalattur,PRGD,Perungudi,PON,Ponneri,POTI,Potheri,PLMG,Puliyamangalam,PTLR,Putlur H,RDY,Reddipalayam,RPM,Royapuram,SP,Saidapet,SPAM,Senji Panambakkam,SVR,Sevvapet Road,SHU,Sholinghur,SKL,Singaperumalkoil,STM,St Thomas Mount,SPE,Sullurupeta,TADA,Tada,TBM,Tambaram,TBMS,Tambaram Sanatorium,TRMN,Taramani,TUG,Thalangai,MTMY,Thirumayilai,TMLP,Tirumalpur,TMVL,Tirumullaivayil,TI,Tiruninravur,TLM,Tirusulam,TRT,Tiruttani,THL,Tiruvalam,TO,Tiruvalangadu,MTCN,Tiruvallikeni,TRL,Tiruvallur,TYMR,Tiruvanmiyur,TVT,Tiruvottiyur,TNP,Tondiarpet,UPM,Urappakkam,VDR,Vandalur,VLCY,Velachery,VLR,Vellore Cantt,VEU,Veppampattu,VLK,Villivakkam,VB,Villiyambakkam,VOC,Voc Nagar,VJM,Vyasarpadi Jeeva,WJ,Walajabad,WJR,Walajah Road,WST,Washermanpet,WCN,Wimco Nagar";var sStationsData=StationsData.split(',');var StationsList=new Array(113);for(var s=0,i=0;s<sStationsData.length;s+=2,i++)StationsList[i]=new Array(sStationsData[s],sStationsData[s+1]);

﻿var Zoom = 1,
CanvasX = 0,
CanvasY = 0,
CanvasMaxX = 0,
CanvasMaxY = 0,
ViewAngleDeg = 0,
MapMinX = 180,
MapMaxX = 0,
MapMinY = 180,
MapMaxY = 0,
OffSetX = 0,
OffSetY = 0,
Command = 0,
SelectedStationMap = 'GZB';

var fixgeometry = function ()
{
    /* Some orientation changes leave the scroll position at something
    * that isn't 0,0. This is annoying for user experience. */
    scroll(0, 0);

    /* Calculate the geometry that our content area should take */
    var header = $(".header:visible");
    var footer = $(".footer:visible");
    var content = $(".content:visible");
    var viewport_height = $(window).height();

    var content_height = viewport_height - header.outerHeight() - footer.outerHeight();

    /* Trim margin/border/padding height */
    content_height -= (content.outerHeight() - content.height());
    content.height(content_height);
}; /* fixgeometry */


$(document).ready(function ()
{
    $(window).bind("orientationchange resize pageshow", fixgeometry);
//    Reset();
});

var C_PanLeft = 1,
    C_PanRight = 2,
    C_PanUp = 3,
    C_PanDown = 4,
    C_ZoomIn = 5,
    C_ZoomOut = 6,
    C_RotateLeft = 7,
    C_RotateRight = 8;


var TimerID = 0;

function Timer(ID)
{

    if (ID!=undefined)
        Command = ID;

    switch (Command)
    {
        case C_PanLeft: CanvasX += CanvasMaxX*.01; break;
        case C_PanRight: CanvasX -= CanvasMaxX * .01; break;
        case C_PanUp: CanvasY += CanvasMaxY * .01; break;
        case C_PanDown: CanvasY -= CanvasMaxY * .01; break;
        case C_ZoomIn: Zoom += .1; break;
        case C_ZoomOut: Zoom -= .1; if (Zoom < .2) Zoom = .2; break;
        case C_RotateLeft: ViewAngleDeg += 1; break;
        case C_RotateRight: ViewAngleDeg -= 1; break;
        default:
            return;
    }
    
    DrawStationMap();
    setTimeout("Timer()", 10);
}

function Reset(StnCode)
{
    if (StnCode)
        SelectedStationMap = StnCode;
    else
        SelectedStationMap = "GZB";

    Zoom = 1;
    CanvasX = CanvasY = Command= ViewAngleDeg =0 ;
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    var winhigh = $.mobile.getScreenHeight();
    var headhigh = $('#StationMapHead').outerHeight();
    var foothigh = $('#StationMapFoot').outerHeight();

    $("#canvas").width(window.innerWidth)
    $("#canvas").height(winhigh - headhigh - foothigh - foothigh);

    context.canvas.width = $("#canvas").width();
    context.canvas.height = $("#canvas").height();
    CanvasMaxX = context.canvas.width;
    CanvasMaxY = context.canvas.height;

    OffSetX = CanvasMaxX * .5;
    OffSetY = CanvasMaxY * .5

    $("#PlaceList").css("top", $('#divStationMapContent').offset().top);

    DrawStationMap();
}

function Placemark(Name, Description, Points, Style, IsPoly)
{
    this.Name = Name;
    this.Description = Description;
    this.Points = Points;
    this.Style = Style;
    this.IsPoly = IsPoly;
}

function PlacemarkStyle(ID, Color, Width, Polyclr, PolyFill, PolyOutline)
{
    this.ID = ID;
    var aa = Color.substr(0, 2);
    var bb = Color.substr(2, 2);
    var gg = Color.substr(4, 2);
    var rr = Color.substr(6, 2);

    this.LineOpacity = parseInt(aa, 16) / 256;
    this.LineClr = "#" + rr + gg + bb;
    this.Width = Width;

    aa = Polyclr.substr(0, 2);
    bb = Polyclr.substr(2, 2);
    gg = Polyclr.substr(4, 2);
    rr = Polyclr.substr(6, 2);


    this.PolyOpacity = parseInt(aa, 16) / 256;
    this.Polyclr = "#" + rr + gg + bb;
    this.PolyFill = PolyFill;
    this.PolyOutline = PolyOutline;
}

var PlacemarkList = new Array();
var PlacemarkStyleList = new Array();

function GetVal(obj, id)
{
    return $($(obj).find(id)[0]).text()
}

function DrawStationMap()
{
    if (PlacemarkList.length == 0)
    {

        $.ajax({ cache: true, url: (IsNative ? "http://erail.in/m/" : "") + "KML/" + SelectedStationMap + ".txt", dataType: "xml", success: function (xml)
        {


            $(xml).find('Style').each(function ()
            {
                var ID = $(this).attr("id");
                var clr = "";
                var width = 1;
                $(this).find('LineStyle').each(function ()
                {
                    clr = GetVal(this, "color");
                    width = GetVal(this, "width");
                });

                var Polyclr = "";
                var PolyFill = 1;
                var PolyOutline = "";

                $(this).find('PolyStyle').each(function ()
                {
                    Polyclr = GetVal(this, "color");
                    PolyFill = GetVal(this, "fill");
                    PolyOutline = GetVal(this, "outline");
                });

                PlacemarkStyleList.push(new PlacemarkStyle(ID, clr, width, Polyclr, PolyFill, PolyOutline));

            });


            $(xml).find('Placemark').each(function ()
            {
                var name = GetVal(this, "name");
                var description = GetVal(this, "description");
                var styleUrl = GetVal(this, "styleUrl");
                var Style = null;
                var IsPoly = 0;

                $(PlacemarkStyleList).each(function (index)
                {
                    if ("#" + this.ID == styleUrl)
                        Style = this;
                })

                var pathArray = [];

                $(this).find('Polygon').each(function ()
                {
                    IsPoly = 1;
                });

                $(this).find('coordinates').each(function ()
                {
                    var coords = $(this).text();
                    var coordsArray = [];
                    coordsArray = coords.split(/[\s,]+/); //split by comma and space

                    for (var i = 1; i < coordsArray.length - 1; i += 3)
                    {
                        var X = coordsArray[i];
                        var Y = coordsArray[i + 1];

                        if (MapMinX > X) MapMinX = X;
                        if (MapMaxX < X) MapMaxX = X;

                        if (MapMinY > Y) MapMinY = Y;
                        if (MapMaxY < Y) MapMaxY = Y;

                        pathArray.push([X, Y]);
                    }

                });

                PlacemarkList.push(new Placemark(name, description, pathArray, Style, IsPoly));

            });

            console.log(PlacemarkList);

            var str = "<select id='selectPlacement' data-native-menu='false' data-overlay-theme='e'>";
            $(PlacemarkList).each(function (index)
            {
                $(this.Points).each(function (index)
                {
                    this[0] = GetValueX(MapMinX, MapMaxX, CanvasMaxX, this[0]);
                    this[1] = GetValueY(MapMinY, MapMaxY, CanvasMaxY, this[1]);
                });
                str += "<option " + (index==0?"selected='true'":"") + " >" + this.Name;

            });

            $("#PlaceList").html(str + "</select>");
            $('#PlaceList').trigger("create");

            DrawMap();

        }
        });
    }
    else
        DrawMap();
}

function DrawMap()
{
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.lineWidth = 1 / Zoom;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    context.translate(CanvasX + OffSetX, CanvasY + OffSetY);
    context.scale(Zoom, Zoom);
    context.rotate(ViewAngleDeg * Math.PI / 180);


    $(PlacemarkList).each(function ()
    {
        context.beginPath();
        $(this.Points).each(function (index)
        {
            if (index == 0)
                context.moveTo(this[0] - OffSetX, this[1] - OffSetY);
            else
                context.lineTo(this[0] - OffSetX, this[1] - OffSetY);
        });

        if (this.IsPoly == 1)
        {
            context.closePath();
            if (this.Style)
            {
                context.fillStyle = this.Style.Polyclr;
                context.globalAlpha = this.Style.PolyOpacity;
            }

            context.fill();
        }
        else
        {
            context.strokeStyle = this.Style.LineClr;
            context.globalAlpha = this.Style.LineOpacity;
        }

        context.stroke()
    });


}

function GetValueX(FromMin, FromMax, ToMax, Value)
{
    return ToMax * (Value - FromMin) / (FromMax - FromMin);
}

function GetValueY(FromMin, FromMax, ToMax, Value)
{
    return ToMax - (ToMax * (Value - FromMin) / (FromMax - FromMin));
};
