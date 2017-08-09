





window.localStorage["form"]         = "menu";

window.localStorage["odrkey"] 		= "";
window.localStorage["workdate"] 	= "";
window.localStorage["partcode"] 	= "";
window.localStorage["partname"] 	= "";
window.localStorage["partspec"] 	= "";
window.localStorage["workqty"] 		= "";
window.localStorage["statusname"] 	= "";
window.localStorage["status"] 		= "";
window.localStorage["worderno"] 	= "";
window.localStorage["wipseq"] 		= "";
window.localStorage["lotno"] 		= ""; 
window.localStorage["histno"] 		= "";
window.localStorage["workers"] 		= "";

window.localStorage["autogoodqty"] 	= "0";
window.localStorage["goodqty"] 		= "0";
window.localStorage["badqty"] 		= "0"; 
window.localStorage["quarter"]		= "";
window.localStorage["quartercd"]	= "";

window.localStorage["mcd"]			= "";
window.localStorage["mname"]		= "";

window.localStorage["pagename"] = "MenuSearch.html";

document.addEventListener("deviceready", onDeviceReady, false);
 
function onDeviceReady() {	 
    BackButton();
}; 

function BackButton(){
   document.addEventListener("backbutton", onBackButton, true);  
};
 

function onBackButton(){
	fn_Menu();
};

function fn_confirmCallback_Exit(button){
		if(button == 2)
			navigator.app.exitApp();
} ;

function fn_alertCallback(){};	

 
function fn_MoveWork(){
	location.replace("Machine.html");
};

function fn_MoveSearch(){
	//location.replace("SMenu.html")
	//location.replace("SmsSend.html")
	location.replace("./MchMonitering.html");
};

function fn_Workhistory(){
	//location.replace("Craim.html");
	//location.replace("imageTest.html");
	location.replace("./WorkhistoryView.html");
};

function fn_Orders(){
	//location.replace("./config.html");
	location.replace("./OrdersView.html");
};

function fn_Wips(){
	location.replace("./Wips.html");
};

function fn_Menu(){
	location.replace("./Menu.html");
};

function fn_PalnMachine(){
	location.replace("./PlanMachine.html");
}
function fn_PalnAmount(){
	location.replace("./PlanAmount.html");
}
    function fn_Manual() {
        	location.replace("./help/MenuSearchManual.html");
    };






    var m_empid, m_quarter, m_quartercd, m_histno;
    /*Array List 객체 선언*/
    var List = new aryList();
    
    m_empid = window.localStorage["empid"];
    
    //m_empid = 'ADMIN';
	window.localStorage["form"] = "machine";
 	//window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
	var m_dbpath = window.localStorage.getItem("dbpath"); 
	
	
	window.localStorage["odrkey"] 		= "";
	window.localStorage["workdate"] 	= "";
	window.localStorage["partcode"] 	= "";
	window.localStorage["partname"] 	= "";
	window.localStorage["partspec"] 	= "";
	window.localStorage["workqty"] 		= "";
	window.localStorage["statusname"] 	= "";
	window.localStorage["status"] 		= "";
	window.localStorage["worderno"] 	= "";
	window.localStorage["wipseq"] 		= "";
	window.localStorage["lotno"] 		= ""; 
	window.localStorage["histno"] 		= "";
	window.localStorage["workers"] 		= "";

	window.localStorage["autogoodqty"] 	= "0";
	window.localStorage["goodqty"] 		= "0";
	window.localStorage["badqty"] 		= "0"; 
	window.localStorage["quarter"]		= "";
	window.localStorage["quartercd"]	= "";
	window.localStorage["mcd"]			= "";
	window.localStorage["mname"]		= "";
	
	

    document.addEventListener("deviceready", onStart, false);
    function onStart() {   
    	document.addEventListener("backbutton", onBackButton, true);	
    	};

    	function onBackButton(){
    		navigator.notification.confirm("작업진행화면으로 이동하시겠습니까?"
    				  , fn_confirmCallback_Exit
    				  , "이동"
    				  , "아니오,예");
    	};

    	function fn_confirmCallback_Exit(button){
    			if(button == 2)
    				navigator.app.exitApp();
    	} ;


    	function fn_alertCallback(){};	    	
    

    window.onload = function(){ 
   	 fn_GetMachineData();
   };

    //Array List 객체 정의
    function aryList() {
        this.aryData = [];
    };
    function aryData(mcd, mname, mtimecd, mtimename, mhistno) {
        this.mcd = mcd;
        this.mname = mname;
        this.mtimecd = mtimecd;
        this.mtimename = mtimename;
        this.mhistno = mhistno;
    };

    /*설비를 조회하여 리스트에 뿌린다.  */
    //////////////////////////////데이터 조회////////////////////////
    function fn_GetMachineData() {
        var json_param = '';
        if(m_empid == '')
            m_empid = window.localStorage.getItem("empid");
        
        $(document).ready(function() {  
            json_param = '{"empid":' + "\"" + m_empid + "\"" + '}';

            $.ajax({
                url: m_dbpath + "PorductReturnToJson.aspx/machinelist",
                contentType: "Application/json; charset=utf-8",
                dataType: "json",
                data: json_param,
                type: "POST",
                success: function(data) {
                    fn_SetMachineList(data.d); 
                    return;
                },
                error: function(data) { 
                	//alert('네트워크 상에 문제가 발생되었습니다.'); 
                	navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
                	}
            });
        });
    };

    function fn_SetMachineList(dt) {
        var strTemp;
        //입고예정서 dtl 정보 셋팅
        $("#listview li").remove();
        for (var row in dt.mydt) {
            var li = document.createElement("li");
            $("#listview").append(li);

            /*ArrayList를 이용한 데이터 보관(배열 객체)  */
            List.aryData.push(new aryData( dt.mydt[row]["MACHINEID"]
                                         , dt.mydt[row]["MACHINENAME"]
							             , dt.mydt[row]["TIMECD"]
							             , dt.mydt[row]["TIMENAME"]
            							 , dt.mydt[row]["HISTNO"]
            					));

            strTemp = "<a  onClick=fn_SelectData('" + dt.mydt[row]["MACHINEID"] + "')"
				+ " data-ajax='false'>"
				+ dt.mydt[row]["MACHINEID"]
				+ "  " + dt.mydt[row]["MACHINENAME"]
				+ "</a>";

            /*
            "<a  onClick=fn_SelectData('aaa','aaa') data-ajax='false'>101  A동 조립 (A7-8)</a>"		
            "<a  onClick=fn_SelectData('101','A동 조립 (A7-8)') data-ajax='false'>101  A동 조립 (A7-8)</a>"	
            */ 
            //list에 링크 유동적으로 추가
            $(li).append(strTemp);
            $("#listview").listview("refresh");
        }
        
        
        
    };

    /*설비를 선택한 경우  */
    function fn_SelectData(mcd) {
        var mname = '';

        for (var i = 0; i < List.aryData.length; i++) {
            if (mcd == List.aryData[i].mcd) {;
                mname = List.aryData[i].mname;
                m_quarter = List.aryData[i].mtimename;
                m_quartercd = List.aryData[i].mtimecd;
                m_histno    = List.aryData[i].mhistno;
                break;
           }
        }         

        window.localStorage["mcd"] 			= mcd;
        window.localStorage["mname"] 		= mname;
        window.localStorage["quarter"] 		= m_quarter;
        window.localStorage["quartercd"] 	= m_quartercd;
        window.localStorage["histno"] 		= m_histno;
        
        
    	window.localStorage["odrkey"] 		= "";
    	window.localStorage["workdate"] 	= "";
    	window.localStorage["partcode"] 	= "";
    	window.localStorage["partname"] 	= "";
    	window.localStorage["partspec"] 	= "";
    	window.localStorage["workqty"] 		= "";
    	window.localStorage["statusname"] 	= "";
    	window.localStorage["status"] 		= "";
    	window.localStorage["worderno"] 	= "";
    	window.localStorage["wipseq"] 		= "";
    	window.localStorage["lotno"] 		= ""; 
    	window.localStorage["workers"] 		= "";

    	window.localStorage["autogoodqty"] 	= "0";
    	window.localStorage["goodqty"] 		= "0";
    	window.localStorage["badqty"] 		= "0"; 
        
    	if(m_histno == "")
    	{
           	location.replace("./Orders.html");
           	return;
    	}
        fn_Back();
    };

 
    /*뒤로 버튼을 누르면 이전페이지로 되돌아 간다.  */
    function fn_Back() {        
        //if(m_histno == "")
        //	location.replace("./Orders.html");
        //else
        	location.replace("./Main.html");
    };
   









	google.load("visualization", "1", {packages:["corechart"]}); 
	
    var m_empid, 	m_mcd, 		m_center;	//조회주건	
    var m_workqty, 	m_sdate,   	m_odrkey,	m_partcode, 	m_partname, m_partspec;; 
    var m_workers, 	m_status, 	m_statusname;
    var m_worderno, m_wipseq,   m_form;
    /*Array List 객체 선언*/
   // var List = new aryList();
    
   m_empid 	= window.localStorage["empid"];
    /*m_mcd 		= window.localStorage["mcd"];
    m_mname 	= window.localStorage["mname"];
    m_statusname = window.localStorage["statusname"];
    m_form = window.localStorage["form"] ;
    m_center    = window.localStorage["center"];
    window.localStorage["actiongbn"]="";*/
    
   //m_empid = 'ADMIN';
   // m_cd = 'A01';
   //alert (m_empid);
   
 	//window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
    //var m_dbpath = window.localStorage.getItem("dbpath"); 
	
		
	var m_dbpath = 'http://121.78.112.176:222/POP/';
	var m_screenWidth = screen.availWidth ;
	var m_radioflag;

    document.addEventListener("deviceready", onStart, false);
    function onStart() {   
			
			document.addEventListener("backbutton", onBackButton, true);
			var Data=device.version.split(".");
			//alert(Data[0] + "-" + Data[1] + "-" + Data[2]);
			if(parseInt(Data[0]) > 3)
			{
				//alert("가능합니다");
			}
			else
			{
				var element = document.getElementById('chart_div1');        
				element.innerHTML = "Android 3.0이상에서는 지원하는 화면입니다.";
			}	

		$(document).ready(function()
		{	
			var Data='{"strEmpid":' +"\"" +m_empid+"\""+ '}';
			$.ajax({
			url: m_dbpath + "PlanMachine.aspx/js_machine",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:Data,
			type:"POST",
			success:function(data)
			{
				$(makeOption(data.d.mydt));
			},
			error:function(data) {
				//alert('접속오류');
				navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
				}
			});
		});
    };
	
	
	window.onload = function()
	{
		m_radioflag = $("#radio1").val();
	   	$("input[type='radio']").bind( "change", function(event, ui) {
				//alert($(this).val());
				m_radioflag = $(this).val();
		});
	}

	//옵션 컨트롤
	function makeOption(dt)
	{
		for (var row in dt)
		{
			option = document.createElement( "option" );
			option.value = dt[row]["MACHINEID"];
			option.innerText = dt[row]["MACHINENAME"];
			$("#com").append(option);

		}
		
	   $("#com")[0].selectedIndex = 0;
	   $("#com").selectmenu("refresh");
	  // $('#com').submit();
	};

	function fn_Search()
	{
		  json_param = '{"strEmpid":' + "\"" + m_empid + "\"," 
            	       //+ "strWorkdate:" + "\"" + $("#sdate").val().replace("-","").replace("-","") + "\"," 
					   + "strFlag:" + "\"" + m_radioflag + "\"," 
            	       + "strMachine:" + "\"" + $("#com").val() + "\"" + '}';

            $.ajax({
                url: m_dbpath + "PlanMachine.aspx/js_Select",
                contentType: "Application/json; charset=utf-8",
                dataType: "json",
                data: json_param,
                type: "POST",
                success: function(data) {
					$(DrawLine(data.d.mydt));
                },
                error: function(data) {
                	//alert('네트워크 상에 문제가 발생되었습니다.');
                	navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
                	}
            });
	};

	
		function DrawLine(dt)
		{
			var data = new google.visualization.DataTable();
			data.addColumn('string', '설비');
			data.addColumn('number', '실적율(%)');

			/*data.addRows(3);
			data.setValue(0, 0, '2004');
			data.setValue(0, 1, 1000);
			data.setValue(1, 0, '2005');
			data.setValue(1, 1, 1000);
			data.setValue(2, 0, '2006');
			data.setValue(2, 1, 1000);*/
			
			data.addRows(dt.length);
			for (i = 0; i < dt.length; i++)
			{
				data.setValue(i, 0, dt[i]["MACHINEID"]);
				data.setValue(i, 1, dt[i]["GOAVG"]);
			}
			// Options
			var options = {
					is3D:true,
					vAxis: {title: '실적율(%)',titleTextStyle:{color: 'black', fontName: '돋움체', fontSize: '12'}},
					hAxis: {title: '설비',titleTextStyle:{color: 'black', fontName: '돋움체', fontSize: '12'}},
					legend:{position: 'none',textStyle: {color: 'blue', fontSize: 16}},
					backgroundColor:{fill:'white'}
                  };

			//var chart1 = new google.visualization.LineChart(document.getElementById('chart_div1'));
			var chart1 = new google.visualization.ColumnChart(document.getElementById('chart_div1'));
			// Draw
			chart1.draw(data, options);
		}

    function onBackButton(){
    	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
    			  , fn_confirmCallback_Exit
    			  , "이동"
    			  , "아니오,예");
    };

    function fn_confirmCallback_Exit(button){
    		if(button == 2)
    			fn_Back();
    			//navigator.app.exitApp();
    } ;

    function fn_alertCallback(){};	


    /*뒤로 버튼을 누르면 이전페이지로 되돌아 간다.  */
    function fn_Back() {
        	location.replace("./MenuSearch.html");
    };
    






	   // PhoneGap ready 상태가 되었는지 판단
	   var isPhoneGapReady = false; 
	
		var loginJson 			= ""; //로그인 관련  json  값
		var configWriteFlag 	= false; //config 등록여부
		var fileLogin 			= false; //file 로그인 여부 
		var db;
		var saveflag;
		
		var m_id, m_pass, m_name, m_mcd, m_mname, m_empid;
		m_mcd 	= '';
		m_mname = '';
		m_id 	= '';
		m_pass 	= '';
		m_name 	= '';
		m_empid	= '';
		
		window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
		var m_dbpath = window.localStorage.getItem("dbpath"); 
		
		window.onload = function(){  
			document.getElementById('footer').style.display="none";
			//fn_Network();
		};
		
		//alert(m_id + "," + m_pass + "," + m_empid + "," + m_name + "," + m_mcd + "," + m_mname );
		document.addEventListener("deviceready",onDeviceReady,false);
 
		function onDeviceReady()
		{		
			//navigator.notification.alert("PhoneGap is working");
			isPhoneGapReady = true;
			
			BackButton();
			checkFileSystem();
			
			
		};
		
		function BackButton(){
			document.addEventListener("backbutton", onBackButton, true);
		};
		function onBackButton(){
			onBackKeyDown();
			navigator.notification.confirm("프로그램을 종료하시겠습니까?"
					  , fn_confirmCallback_Exit
					  , "종료"
					  , "아니오,예");
		};
		
		function fn_confirmCallback_Exit(button){
				if(button == 2)
					navigator.app.exitApp();
		} ;
		

			
		
		function fn_Network(){
			var networkState;
			 if (isPhoneGapReady){
				 try{
					networkState = navigator.network.connection.type;
				 }
				 catch(err){
					 //alert(err);
				 }
				
				if(networkState == 'unknown' || networkState== 'undefined' || typeof(networkState) == 'undefined')
				{
					$("#NetStatus")[0].innerHTML = "폰겝 connect 인식오류";
					return;
				}
				if(networkState != Connection.NONE)
				{
					navigator.notification.alert("무선네트워크가 연결되어 있지 않습니다.",alertCallback, "","확인");
					navigator.app.exitApp();	
				}			
				else if(networkState != Connection.WIFI )
				{
					$("#NetStatus")[0].innerHTML ="WIFI 연결";
				}			
				else if(networkState != Connection.CELL_3G )
				{
					$("#NetStatus")[0].innerHTML  = "3G 연결";  
				}			
				else if(networkState != Connection.CELL_4G )
				{
					$("#NetStatus")[0].innerHTML ="4G 연결";    
				}
				else{
					$("#NetStatus")[0].innerHTML ="정상연결";     
				}
			 }
			
		};
	 
		/////////////////////////////////////////////////////////////////////////////
		
		function checkFileSystem()
		{
			window.requestFileSystem(LocalFileSystem.PERSISTENT,0,gotFS,fail);
		}
		function gotFS(fileSystem)
		{
			/* 디렉토리 uri 확인
			var uri = fileSystem.root.toURI();
			alert(uri);*/
			
			/* 디렉토리 내부 항목 확인
			rootDir = fileSystem.root;
			var rootR = fileSystem.root.createReader();
			rootR.readEntries(gotFileEntry,fail);*/
			
			//폴더부터 검사
			rootDir = fileSystem.root;
			fileSystem.root.getDirectory("GSmartSPOP",{create:true},gotDirEntry,fail);
		}
		
		function gotDirEntry(dirEntry)
		{
			dirEntry.getFile("myConfig.txt",{create:true},gotFileEntry,fail);			
		}
		
		function gotFileEntry(fileEntry)
		{
			//파일 객체에서 파일을 가져옴
			//config 등록이냐 로그인 중이냐
			if(!configWriteFlag)
			{
				fileEntry.file(readFile,fail);
			}
			else
			{
				fileEntry.createWriter(writeFile,fail);
			}
		};
		
		function readFile(file)
		{
			var reader = new FileReader();
			reader.onloadend = function(evt)
			{
				var readJson = evt.target.result;
				loginJson = readJson;
				
				if(loginJson == "")
				{
					//alert('로그인 진행바랍니다.');
					return;
				}
				else
				{	
					//자동 로그인시에라도 데이터는 뿌려준다.
					m_id = readJson.split(",")[0].split(":")[1].split('"').join('');
					m_pass = readJson.split(",")[1].split(":")[1].split('"').join('').replace('}','');
					$("#txt_User").val(m_id);
					$("#txt_Pass").val(m_pass);
					
					window.localStorage["id"] = m_id;
					window.localStorage["pass"] = m_pass;
					window.localStorage["name"] = m_name;
					window.localStorage["empid"] = m_empid;
					window.localStorage["mcd"] = m_mcd;
					window.localStorage["mname"] = m_mname;
					
					fileLogin = true;
					login();
				}
			}
			reader.readAsText(file);
		};
		
		function writeFile(file)
		{
			//file 생성시 exclusive를 설정하지 않으면 새로 갱신한다.
			var fileTxt = '{"user":' + "\""+ $("#txt_User").val() + "\"," + "\"" +"pass"+"\""+":" + "\""+ $("#txt_Pass").val() + "\"" +'}';
			/*file.onwrite = function(evt)
			{
				console.log(evt.target.result);
				alert(evt.target.result);
			}*/
			file.write(fileTxt);
			navigator.notification.beep(1);
			//$.mobile.changePage($(document.location.href="./Main.html"), {transition:"slide", reverse:false, changeHash:true} );
			$.mobile.changePage($(document.location.href="./Menu.html"), {transition:"slide", reverse:false, changeHash:true} );
		}
		function fail(error)
		{
			alert(error.code);
		};
		
		
		/*로그인  */
		function fn_login()
		{
			var networkState ;
			//var networkState = navigator.network.connection.type;
		 	try{
				networkState = navigator.network.connection.type;
			 }
			 catch(err){
				 alert(err);
		 	}
			
			if(networkState != Connection.NONE)
			{
				//if(!fileLogin)
				//{
					if($("#txt_User").val() == "" || $("#txt_User").val() == "")
					{
						//alert('아이디 및 비밀번호 입력오류');
						navigator.notification.alert("사용자 ID와 비밀번호를 확인하세요.", fn_alertCallback, "알림","확인");
						return;
					}
				//}
				SetLoginCheck();
			}
			else
			{
				//alert("현재 네트워크 연결상태가 바르지 않습니다");
				navigator.notification.alert("현재 네트워크 연결상태가 바르지 않습니다.", fn_alertCallback, "알림","확인");
				return;
			}
			
		}
		
		function SetLoginCheck()
		{
			$(document).ready(function()
			{	
				//alert($("#txt_User").val()  + "," + $("#txt_Pass").val());
				//if(!fileLogin) 
				//{	
					loginJson='{"user":' + "\""+ $("#txt_User").val() + "\"," + "pass:" + "\""+ $("#txt_Pass").val() + "\"" +'}';
				//}
				//else
				//{
					
				//}
				
					//데이터베이스 접속 문자열 가져오기(서버의 데이터베이스 설정 부분)-> 가져와 로컬스토리지에 저장하낟.
				    //맥어드레스 저장하도록 변경 필요.
					$.ajax({
					url: m_dbpath + "PorductReturnToJson.aspx/login",
					contentType:"Application/json; charset=utf-8",
					dataType:"json",
					data:loginJson,
					type:"POST",
					success:function(data)
					{
						var result = data.d.mydt[0]["RESULT"];
						

						if(result == "Y")
						{		
							m_name = data.d.mydt[0]["USERNAME"];
							m_empid = data.d.mydt[0]["EMPNO"];
							m_id = $("#txt_User").val();
							m_pass = $("#txt_Pass").val();
							/*if(!fileLogin)
							{
								navigator.notification.confirm('자동 로그인 설정을 하시겟습니까? 설정 이후엔 입력없이 바로 접속 가능합니다.'
																,SetAutoLogin,
																'자동 로그인 설정',
																'미설정,설정');	
							}*/
		     
							if (saveflag == 1)
							{
								SetAutoLogin();
							}
							else
							{								
								window.localStorage["id"] = m_id;
								window.localStorage["pass"] = m_pass;
								window.localStorage["name"] = m_name;
								window.localStorage["empid"] = m_empid;
								window.localStorage["mcd"] = m_mcd;
								window.localStorage["mname"] = m_mname ;
								
								window.sessionStorage["id"] = m_id;
								navigator.notification.beep(1);
								//location.replace("./Main.html");
								$.mobile.changePage($(document.location.href="./Menu.html"), {transition:"slide", reverse:false, changeHash:true} );
								//$.mobile.changePage($(document.location.href="./Main.html"), {transition:"slide", reverse:false, changeHash:true} );
							}
						}
						else
						{
							//alert(data.d.mydt[0]["RESULT"]);
							navigator.notification.alert("로그인 정보를 확인하세요.", fn_alertCallback, "알림","확인");
							fileLogin = false;
							return;
						}
					},
					error:function(data) {
						//alert('네트워크 상에 문제가 발생되었습니다.');
						navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.", fn_alertCallback, "알림","확인");
						fileLogin=false;
						}
				});
			});
		}
		
		function SetAutoLogin()
		{	
			configWriteFlag = true;
			checkFileSystem();
		}
		
		/*프로그램 종료  */
		function fn_Exit()
		{ 	
			navigator.notification.confirm("프로그램을 종료하시겠습니까?"
					  , fn_confirmCallback_Exit
					  , "종료"
					  , "아니오,예");		    
		}
		
		function check()
		{     
		   if( $('#idsave').is(':checked'))
		   {    
				saveflag=1;
		   }
		   else
		   {	
				saveflag=0;   
		   }
		}		
	

function fn_MoveConfig(){
	//location.replace("./config.html");
	$.mobile.changePage($(document.location.href="./config.html"), {transition:"slide", reverse:false, changeHash:true} );
};

function fn_alertCallback(){};	
	







document.addEventListener("deviceready", onDeviceReady, false);
 
function onDeviceReady() {	 
    BackButton();
}; 

function BackButton(){
   document.addEventListener("backbutton", onBackButton, true);  
};
 

function onBackButton(){
	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
			  , fn_confirmCallback_Exit
			  , "알림"
			  , "아니오,예");
};

function fn_confirmCallback_Exit(button){
		if(button == 2)
			fn_Back();
} ;

function fn_alertCallback(){};	

function fn_Back() {
		location.replace("./Menu.html");
};







	var CenterId=new Array();
	var CenterName=new Array();
	var configWriteFlag = 0;
	
	document.addEventListener("deviceready",onStart,false);
	
	function onStart()
	{	
		fn_BackButton();
		$(document).ready(function()
		{	
			var Data='{"start":' +"\"" +'1'+"\""+ '}';
			$.ajax({
			url:"http://121.78.112.176:222/POP/Config.aspx/place",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:Data,
			type:"POST",
			success:function(data)
			{
				$(makeOption(data.d.mydt));
				checkFileSystem();
			},
			error:function(data) {alert('접속오류'); }
			});
			
		});
		//checkFileSystem();		
		
	}
	
	function fn_BackButton(){
		document.addEventListener("backbutton", fn_Back , true);
	}
	/*
	$(document).ready(function()
			{	
				var Data='{"start":' +"\"" +'1'+"\""+ '}';
				$.ajax({
				url:"http://121.78.112.176:222/POP/Config.aspx/place",
				contentType:"Application/json; charset=utf-8",
				dataType:"json",
				data:Data,
				type:"POST",
				success:function(data)
				{
					$(makeOption(data.d.mydt));
					checkFileSystem();
				},
				error:function(data) {alert('접속오류'); }
				});
				
			});
	*/
	window.onload = function()
	{
		
	};
	
		//옵션 컨트롤
	function makeOption(dt)
	{
		for(var h=0; h<2; h++)
		{
			var option = document.createElement( "option" );
			var option1 = document.createElement( "option" );
			var option2 = document.createElement( "option" );
			var option3 = document.createElement( "option" );
			option.value = h+"";
			option1.value = h+"";
			option2.value = h+"";
			option3.value = h+"";
			if(h==0)
			{
				option.innerText = "단일실적";
				option1.innerText = "실적저장";
				option2.innerText = "자동입력(현재시간)";
				option3.innerText = "수동 투입";
			}
			else
			{
				option.innerText = "쿼터실적"
				option1.innerText = "종료 후 자동재시작";
				option2.innerText = "수동입력";
				option3.innerText = "전 작업자 투입(자동)";
			}
			$("#result").append(option);
			$("#start").append(option1);
			$("#time").append(option2);
			$("#worker").append(option3);
		}
		
		for (var row in dt)
		{
			option = document.createElement( "option" );
			option.value = dt[row]["CENTERID"];
			option.innerText = dt[row]["CENTERNAME"];
			$("#center").append(option);
		}
		
		$("#result")[0].selectedIndex =  -1;
		$("#center")[0].selectedIndex = -1;
		$("#start")[0].selectedIndex = -1;	
		$("#time")[0].selectedIndex = -1;	
		$("#worker")[0].selectedIndex = -1;	

		$("#result").selectmenu("refresh");
		$("#center").selectmenu("refresh");
		$("#start").selectmenu("refresh");
		$("#time").selectmenu("refresh");
		$("#worker").selectmenu("refresh");		
		
		
	};
	
	function save()
	{	
		
		window.localStorage["center"] 			= $("#center").val();
		window.localStorage["workflag"] 		= $("#result").val();
		window.localStorage["workresultstart"] 	= $("#start").val();
		window.localStorage["manualtime"] 		= $("#time").val();
		window.localStorage["autoworkerretuip"] = $("#worker").val();
		configWriteFlag = "1";
		//navigator.notification.alert("저장 시작.",fn_alertCallback, "","확인");
		checkFileSystem();
		
	};

	//document.addEventListener("deviceready",onStart,false);
	function checkFileSystem()
	{
		//alert("checkFileSystem");
		 
		 window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
		//window.requestFileSystem(type, size, successCallback, opt_errorCallback) 
		// alert("checkFileSystem1");
	};

	function gotFS(fileSystem)
	{		//폴더부터 검사
			alert("gotFS");
			rootDir = fileSystem.root;
			fileSystem.root.getDirectory("GSmartSPOP",{create:true},gotDirEntry,fail);
	}

	function gotDirEntry(dirEntry)
	{
		//alert("gotDirEntry");
		dirEntry.getFile("setting.txt",{create:true},gotFileEntry,fail);			
	};

	function gotFileEntry(fileEntry)
	{
		if(configWriteFlag==0)
		{			
			fileEntry.file(readFile,fail);
			configWriteFlag=1;		
		}
		else
		{ 
			navigator.notification.alert("저장 진행.",fn_alertCallback, "","확인");
			fileEntry.createWriter(writeFile,fail);
		}
	};

	function fail(error)
	{
		alert(error.code);
	};

	function writeFile(file)
	{
		if(configWriteFlag>=1)
		{
			//alert("저장이 완료되었습니다.");	
			navigator.notification.alert("저장이 완료되었습니다.",fn_alertCallback, "","확인");
		}
		//file 생성시 exclusive를 설정하지 않으면 새로 갱신한다.
		var fileTxt =$("#center").val()+','+ $("#result").val()+','+$("#start").val()+','+$("#time").val()+','+$("#worker").val() 
 		//alert(fileTxt);
		file.write(fileTxt);
				
		//navigator.notification.alert("저장이 완료되었습니다.1",fn_alertCallback, "","확인1");
	};

	function readFile(file)
	{
		var reader = new FileReader();
		reader.onloadend = function(evt)
		{
			var getread = evt.target.result;
			read = getread;
			
			if(read == null)
			{
				//alert('로그인 진행바랍니다.');
				return;
			}
			else
			{	
				show();
			}
		}
		reader.readAsText(file);
	};

	function show()
	{
		var Data=read.split(",");
		$("#center").val(Data[0]);
		$("#result").val(Data[1]);
		$("#start").val(Data[2]);
		$("#time").val(Data[3]);
		$("#worker").val(Data[4]);

		$("#center").selectmenu('refresh');
		$("#result").selectmenu('refresh');
		$("#start").selectmenu('refresh');
		$("#time").selectmenu('refresh');
		$("#worker").selectmenu('refresh');
	};
	
function fn_Back(){
	location.replace("./Login.html");
};
function fn_alertCallback(){};	
	















		jQuery.extend(jQuery.mobile.datebox.prototype.options, {
			useNewStyle: true
		});	
	
    var m_empid, 	m_mcd, 		m_center;	//조회주건	
    var m_workqty, 	m_sdate,   	m_odrkey,	m_partcode, 	m_partname, m_partspec;; 
    var m_workers, 	m_status, 	m_statusname;
    var m_worderno, m_wipseq,   m_form;
    /*Array List 객체 선언*/
   // var List = new aryList();
    var m_workFlag	= window.localStorage.getItem("workflag");//생산실적 입력방법
	window.localStorage["pagename"] = "OrdersView.html"; 
   m_empid 	= window.localStorage["empid"];
    /*m_mcd 		= window.localStorage["mcd"];
    m_mname 	= window.localStorage["mname"];
    m_statusname = window.localStorage["statusname"];
    m_form = window.localStorage["form"] ;
    m_center    = window.localStorage["center"];
    window.localStorage["actiongbn"]="";*/
    
   //m_empid = 'ADMIN';
   // m_cd = 'A01';
   //alert (m_empid);
   
 	window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
    var m_dbpath = window.localStorage.getItem("dbpath"); 
	
	var m_screenWidth = screen.availWidth ;	
	//var m_dbpath = 'http://121.78.112.176:222/T_POP/';

    document.addEventListener("deviceready", onStart, false);
    function onStart() {       
    	document.addEventListener("backbutton", onBackButton, true);

		$(document).ready(function()
		{	
			fn_Timeset();
			var Data='{"strEmpid":' +"\"" +m_empid+"\""+ '}';
			$.ajax({
			url: m_dbpath + "OrdersView.aspx/js_machine",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:Data,
			type:"POST",
			success:function(data)
			{
				$(makeOption(data.d.mydt));
			},
			error:function(data) {
				//alert('접속오류');
				navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
				}
			});
		});
    };

	
	window.onload = function()
	{
	    /*var tolito = TolitoProgressBar('progressbar100')
                    .setOuterTheme('b')
                    .setInnerTheme('e')
                    .isMini(true)
                    .setMax(100)
                    .showCounter(true)
                    .build();
			 $("#progressbar100").progressbar({ value: 90 });
			    var tolito = TolitoProgressBar('prigressbarid')
                    .setOuterTheme('b')
                    .setInnerTheme('e')
                    .isMini(true)
                    .setMax(100)
                    .showCounter(true)
                    .build();
			 $("#prigressbarid").progressbar({ value: '90' });*/ 
	}

    function fn_Timeset()
	{
		//2134010  a03 20130403132122 01
		var now = new Date(); 
		var mm = (now.getMonth()+1)+"";
		var dd = now.getDate();
		if(parseInt(mm) < 10)
		{
			mm= "0" + mm;
		}
		else
		{
			mm =mm;
		}
		if(parseInt(dd) < 10)
		{
			dd= "0" + dd;
		}
		else
		{
			dd = dd;
		}
		$('#sdate').trigger('datebox', {'method':'set', 'value':(now.getFullYear()+'-'+mm+'-'+dd)});
	};

	//옵션 컨트롤
	function makeOption(dt)
	{
		for (var row in dt)
		{
			option = document.createElement( "option" );
			option.value = dt[row]["MACHINEID"];
			option.innerText = dt[row]["MACHINENAME"];
			$("#com").append(option);

		}
		
	   $("#com")[0].selectedIndex = 0;
	   $("#com").selectmenu("refresh");
	  // $('#com').submit();
	};

	function fn_Search()
	{
		  json_param = '{"strEmpid":' + "\"" + m_empid + "\"," 
            	       + "strWorkdate:" + "\"" + $("#sdate").val().replace("-","").replace("-","") + "\"," 
            	       + "strMachine:" + "\"" + $("#com").val() + "\"" + '}';

            $.ajax({
                url: m_dbpath + "OrdersView.aspx/js_Select",
                contentType: "Application/json; charset=utf-8",
                dataType: "json",
                data: json_param,
                type: "POST",
                success: function(data) {
                    fn_List(data.d.mydt); 
                },
                error: function(data) {
                	//alert('네트워크 상에 문제가 발생되었습니다.');
                	navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
                	}
            });
	};

	function fn_List(dt)
	{
		 var strTemp, icnt, progressbarid, strSpace, strSpace1;
        icnt = 0;
        
        $("#listview li").remove();
		 for (var row in dt) {
			progressbarid = "progressbar"+row;
            var li = document.createElement("li");
            $("#listview").append(li);
            icnt = icnt + 1

			strSpace = "&nbsp;&nbsp;";
            strSpace1 = "&nbsp;&nbsp;";
            iLoop = 10 - dt[row]["GOODQTY"].length;
            for(var i=0; i <= iLoop; i++){
            	strSpace = strSpace + "&nbsp;";
            }
            
            iLoop = 10 - dt[row]["BADQTY"].length;
            for(var i=0; i <= iLoop; i++){
            	strSpace1 = strSpace1 + "&nbsp;";
            }

			//alert( dt[row]["WORDERNO"] + dt[row]["CENTERNAME"] );
			if(m_screenWidth>330)
			{
				strTemp =  "<a style='padding: 0px 5px 5px 0px;'>"
						  +" <h3>지시번호 : "
						  +  dt[row]["WORDERNO"] +"</h3>"
						  +" <p>설  비  명 &nbsp : " + dt[row]["MACHINENAME"] +"</p>"
						  +" <p>품  목  명 &nbsp : " + dt[row]["PARTNAME"] +"</p>"
						  +" <p>지시수량 : " + dt[row]["WORKQTY"] + strSpace
						  + " 양품량 : " +  dt[row]["GOODQTY"] + strSpace1
						  + " 불량량 : " + dt[row]["BADQTY"] +"</p>"
						  +" <p> <dib>  진척율 </div></p>"
						  +" <p><div id='" + progressbarid + "'></div></p>"
						  +" </a>";	
				/*strTemp = "<table width='100%' cellspacing='0' cellpadding='0' class='party_tbl_new'>"
				        + "<tr>"
				        + "<td height='40' align='left' width='20%'>지시번호</td>"
						+ */
			}
			else
			{
				strTemp =  "<a>"
						  +" <h3>지시번호 : "
						  +  dt[row]["WORDERNO"] +"</h3>"
						  +" <p>설  비  명 &nbsp : " + dt[row]["MACHINENAME"] +"</p>"
						  +" <p>품  목  명 &nbsp : " + dt[row]["PARTNAME"] +"</p>"
						  +" <p>지시수량 : " + dt[row]["WORKQTY"] +"</p>"
						  +" <p>양  품  량 &nbsp : " +  dt[row]["GOODQTY"] + "</p>"
						  +" <p>불  량  량 &nbsp : " + dt[row]["BADQTY"] +"</p>"
						  +" <p> <dib>  진척율 </div></p>"
						  +" <p><div id='" + progressbarid + "'></div></p>"
						  +" </a>";
			}
//	<div id="progressbar1"></div>
			//alert(parseInt(dt[0]["PER"]));
            //list에 링크 유동적으로 추가
            $(li).append(strTemp);
			var tolito = TolitoProgressBar(progressbarid)
			.setOuterTheme('b')
			.setInnerTheme('e')
			.isMini(true)
			.setMax(100)
			.showCounter(true)
			.build();
			 $('#'+progressbarid).progressbar({ value: parseInt(dt[row]["PER"]) });
            $("#listview").listview("refresh");
        }
        
        //alert(icnt);
        if(icnt == 0) 
        	navigator.notification.alert("조회결과가 없습니다.",fn_alertCallback, "알림","확인");
	};





    function onBackButton(){
    	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
    			  , fn_confirmCallback_Exit
    			  , "이동"
    			  , "아니오,예");
    };

    function fn_confirmCallback_Exit(button){
    		if(button == 2)
    			fn_Back();
    			//navigator.app.exitApp();
    } ;

    function fn_alertCallback(){};	


    /*뒤로 버튼을 누르면 이전페이지로 되돌아 간다.  */
    function fn_Back() {
        	location.replace("./MenuSearch.html");
    };

    function fn_Manual() {
        	location.replace("./help/OrdersViewManual.html");
    };

	function fn_Tuto()
	{
		if(m_workFlag == "0" || m_workFlag == "" || m_workFlag==null)
		{//단일실적
			location.replace("./help/WorkResult01Tuto.html");
		}
		else if(m_workFlag == "1")
		{//쿼터실적
			location.replace("./help/WorkResult02Tuto.html");
		}
	};










<!--
var PLUGIN_LANG=0;
//var INITMODE = "Player";
var VIEW_SIZE = getViewSize();
var PROTOCOL_TYPE=getProtocol();
var INITMODE = "none";
var CAPTEXT = "Live View";
var STATUSBAR = 1;
var TOOLBAR = 1;
var CONTEXTMENU = 0;
var AUTOSTART=1;
var TOOLBARCONF = "stream+rec+mic+zoom+time";
var CheckMac = (navigator.platform.toLowerCase().indexOf("mac") < 0) ? false : true;

GetDeviceInfo_A('view','General.Network.RTSP.Enabled&group=General.Network.RTP.R0.Multicast');
var RTSPEnabled = GetQueryVariable('General.Network.RTSP.Enabled');
var TypeIndex = getCookies("TypeIdx");

if(TypeIndex == null)
{
  if(getOs().indexOf("IE") >= 0)
  {
    TypeIndex = "ocx";
  }else{
    if(CheckMac)
    {
      TypeIndex = "quicktime";
    }else{
      TypeIndex = "vlc";
    }
  }
}

GetDeviceInfo_A('view','Image');
switch(getVideoFmt())
{
    default:
      case '1':
        CHANNEL = 1;
        break;
    case '2':
        if(RTSPEnabled == "1")
        {
          CHANNEL = 1;
          setVideoFmt(1);
        }else{
          CHANNEL = 2;
        }
        break;
}

if(CheckMac && TypeIndex != "jpg")
{
  TypeIndex = "quicktime";
}

function mouseOver(index)
{
  if(index=="Liveview_Play" || index=="Liveview_Sound" ||
     index=="Liveview_Talk" || index=="Liveview_Record")
  {
    EID(index).src = eval("'./style/image/vlc/btn_Liveview_"+EID(index).title+"_h.png'");
  }else{
    EID(index).src = eval("'./style/image/vlc/btn_"+index+"_h.png'");
  }
}

function mouseOut(index)
{
  if(index=="Liveview_Play" || index=="Liveview_Sound" ||
     index=="Liveview_Talk" || index=="Liveview_Record")
  {
    EID(index).src = eval("'./style/image/vlc/btn_Liveview_"+EID(index).title+"_e.png'");
  }else{
    EID(index).src = eval("'./style/image/vlc/btn_"+index+"_e.png'");
  }
}

function mouseDown(index)
{
  if(index=="Liveview_Play" || index=="Liveview_Sound" ||
     index=="Liveview_Talk" || index=="Liveview_Record")
  {
    EID(index).src = eval("'./style/image/vlc/btn_Liveview_"+EID(index).title+"_p.png'");
  }else{
    EID(index).src = eval("'./style/image/vlc/btn_"+index+"_p.png'");
  }
}

function mouseUp(index)
{
  switch(index)
  {
    case 'Play':
      EID("Liveview_Play").title = "Pause";
      mouseOver("Liveview_Play");
      break;
    case 'Pause':
      EID("Liveview_Play").title = "Play";
      mouseOver("Liveview_Play");
      break;
    case 'Stop':
      mouseOver("Liveview_Stop");
      EID("Liveview_Play").title = "Play";
      mouseOut("Liveview_Play");
      break;
    case 'Sound':
      EID("Liveview_Sound").title = "SoundMute";
      mouseOver("Liveview_Sound");
      break;
    case 'SoundMute':
      EID("Liveview_Sound").title = "Sound";
      mouseOver("Liveview_Sound");
      break;
    case 'Talk':
      EID("Liveview_Talk").title = "TalkMute";
      break;
    case 'TalkMute':
      EID("Liveview_Talk").title = "Talk";
      break;
    default:
  }
}

function changeVolume(value)
{
    if(value != 0 && EID("Liveview_Sound").title != "Sound")
    {
      EID("Liveview_Sound").title = "Sound";
      VLC_DoAct("Sound");
      mouseOut("Liveview_Sound");

    }
    A_SLIDERS[0].f_setValue(value);
    VLC_DoUpdateVolume(value);
}

var VLC_Version = PluginDetect.getVersion("vlc");
var VLC_Polling_Timer = null;

function onLoad()
{
  if( TypeIndex == "vlc" && navigator.platform.toLowerCase().indexOf("mac") < 0 )
  {
    if(VLC_Version != null)
    {
      EShow("vlc_control","");
      var i=0;
      while(EID("statusBor"+i))
      {
        EID("statusBor"+i).style.borderRight = "1px solid #000";
        i++;
      }
      EShow("table1","");
      EShow("table2","none");
      VLC_Polling_Timer = setTimeout("CheckVlcPlaying()",5000);
    }else{
      EShow("table1","none");
      EShow("table2","");
    }
  }else{
    EShow("table1","");
    EShow("table2","none");
    if( TypeIndex == "ocx")
    {
      AxMediaControl.Play(1);          
    } 
  }
}

function CheckVlcPlaying()
{
  if(VLC_Polling_Timer != null)
  {
    clearTimeout(VLC_Polling_Timer);
  }


  var vlc = getVLC("vlc");
  if( vlc )
  {
    if(VLC_Pause_Flag == false && EID("Liveview_Play").title == "Pause")
    {
      if(!vlc.playlist.isPlaying)
      {
        window.location.reload(true);
      }
    }
  }

  VLC_Polling_Timer = setTimeout("CheckVlcPlaying()",5000);
}

function onUnload()
{
  if(TypeIndex == "ocx")
  {
    onAxobjUnload();
  }else if(TypeIndex == "vlc"){
    if(VLC_Version != null)
    {
      VLC_DoStop();
    }
  }
}

//-->


  <!--
  GetDeviceInfo_A('view','Image');

  var Codec;
  if(CHANNEL == 3) CHANNEL = 1;
  switch(CHANNEL)
  {
    default:
    case 1:
      Codec = "MPEG4";
      break;
    case 2:
      Codec = "MJPEG";
      break;
  }

  var VideoPath;
  if(Codec == "MPEG4")
  {
    VideoPath = "video.mp4";
  }else if(Codec == "MJPEG"){
    VideoPath = "video.mjpg";
  }

  if(CheckMac)  
  {
    if(TypeIndex == "quicktime")
    {
      var normalSize = VIEW_SIZE;

      if(normalSize == null)
      {
          normalSize = "Medium";
          setViewSize(normalSize);
      }

      if(normalSize == "Medium")
      {
          normalSize = "320x240";
      }else if(normalSize == "Large"){
          normalSize = "640x480";
      }

      if(normalSize.indexOf("x")>=0)
      {
        resolutionW=normalSize.slice(0,normalSize.indexOf("x"));
        resolutionH=normalSize.slice(normalSize.indexOf("x")+1,normalSize.length);
      }

      document.open();
            document.write("<embed SCALE=\"ToFit\" width=\"" + resolutionW + "\" height=\"" + resolutionH + "\"" +
                           " type=\"video/quicktime\" qtsrc=\"rtsp://" + location.hostname + "/" + VideoPath + "\"" +
                           " qtsrcdontusebrowser src=\"quicktime.mov\" autoplay=\"true\" controller=\"true\"\>");
      document.close();

      }else{
        CHANNEL = 3;
        Viewer();
      }
    }else{
      if(TypeIndex != "vlc")
      {
        if(TypeIndex == "jpg")
        {
          CHANNEL = 3;
        }
        Viewer();
      }else{
        if(VLC_Version != null)
        {
          VLC_Viewer(VideoPath);
        }
      }
    }  
    //-->
      

        if(navigator.appName.toLowerCase().indexOf("microsoft internet explorer") >= 0)
        {
          if(msg=="video lost")
          {
            window.top.leftFrame.location.reload();
            window.top.mainFrame.location.reload();
      }
      else if(msg=="full connect")
          {
            alert(loadLangString("L_Warn_FullConnection",false));
      }
      else if(msg=="mic occupy")
          {
            alert(loadLangString("L_MicOccupy",false));
      }
      }
        
    
          <!--
              var A_TPL1h = {
                    'b_vertical' : false,'b_watch': true,'n_controlWidth': 105,'n_controlHeight': 10,
                    'n_sliderWidth': 5,'n_sliderHeight': 12,'n_pathLeft' : 0,'n_pathTop' : 1,'n_pathLength' : 100,
                    's_imgControl': 'style/image/blueh_bg.gif','s_imgSlider': 'style/image/blueh_sl.gif','s_imgAlt': '','n_zIndex': 1
                }
                var A_INIT1h = {
                    's_form' : 0,'s_name': 'sliderValue1h','n_minValue' : 0,'n_maxValue' : 100,'n_value' : 30,'n_step' : 1
                }
                new slider(A_INIT1h, A_TPL1h, changeVolume);
            //-->
            

<!--
StyleCustomize("main");
//-->









	//window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
	var m_dbpath = window.localStorage.getItem("dbpath"); 
	
	m_workFlag	= window.localStorage.getItem("workflag");//생산실적 입력방법
	window.localStorage["pagename"] 	= "Worker.html";

	var BadCode=new Array();
	var BadName=new Array();
	var m_SettimeManualInput = "1";
	var partname = window.localStorage.getItem("partname");
	//var workhistoryno = "201107201020002";
	var workhistoryno = window.localStorage.getItem("histno");
	//var machineid = "A04";
	var machineid =	 window.localStorage.getItem("mcd");
	var SaveFlag= "0";
	var CaptinId="";
	window.localStorage["actiongbn"]="";
	
	   document.addEventListener("deviceready", onDeviceReady, false);
	   function onDeviceReady() {	
		   
		    BackButton();
		};
		 

		function BackButton(){
		   document.addEventListener("backbutton", onBackButton, true);
		};
		
		function onBackButton(){
			navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
					  , fn_confirmCallback_Exit
					  , "이동"
					  , "아니오,예");
		};
		 
		function fn_confirmCallback_Exit(button){
			if(button == 2)
				location.replace("./Main.html");
				//navigator.app.exitApp();
	} ;
	
    function fn_alertCallback(){};	
		
	window.onload = function()
	{
		$(document).ready(function()
		{	
			if(m_SettimeManualInput == "0")
			{
				document.getElementById('time').style.display="none";
			}
			$("#part")[0].innerHTML = partname ;
			$("#machine")[0].innerHTML = machineid ;
			Grid();
		});
		
		document.addEventListener("hidekeyboard", onHide, false);
        document.addEventListener("showkeyboard", onShow, false);

	}
	
	function onHide() 
    {
        $("#footer").show();
    };

    function onShow() 
    {
        $("#footer").hide();
    };
	
	

	function Grid()
	{
		var jsonData='{"workhistoryno":' +"\"" +workhistoryno+"\""+ '}';
			$.ajax({
			url: m_dbpath + "Worker.aspx/worker",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{
				$(makeControl(data.d.mydt));
			},
			error:function(data) {
				//alert('접속오류');
				navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
				}
			});
	}

	//제큐 그리드 만들기
	function makeControl(dt)
	{//alert('d.');
			jQuery("#list4").jqGrid({
			datatype: "local",
			colNames:['순번','작업자','작업자번호'],
			
			colModel:[
				{name:'SORTKEY',index:'SORTKEY',width:50,align:"center",hidden:true},
				{name:'EMPNAME',index:'EMPNAME',width:80,align:"center"},
				{name:'EMPID',index:'EMPID',width:120,align:"center"},
				/*{name: 'WEMPID', width:80, align: 'left', editable: true, edittype: 'select',
				  formatter: function (cellvalue, options, rowObject, action)
				  {
					if (cellvalue == 'YES') 
					{
					  return '<select id="gg"><option value="YES" selected="selected">YES</option>' +
									 '<option value="NO">NO</option></select>';
					} 
					else 
					{
					  return '<select id ="gg"><option value="YES">YES</option>' +
							   '<option value="NO" selected="selected">NO</option></select>';
					}
				  }
				}*/
			],

			//multiselect: true,
			//viewrecords: true,
			multiselect: true,
			height: "100%",
			autowidth : true,
			//rowNum: 100000,

			//caption: "작업자 관리"
			onSelectRow: function(EMPID)
			{ 
				Setting();
			}

			});  

			var Data = new Array();
			for(row in dt)
			{
				Data[row]={SORTKEY:dt[row]["SORTKEY"],EMPNAME:dt[row]["EMPNAME"],EMPID:dt[row]["EMPID"],WEMPID:dt[row]["WEMPID"]};
				if(dt[row]["EMPID"] == dt[row]["CAPTIN"])
				{
					CaptinId = dt[row]["CAPTIN"];
				}
			}
			
			var mydata = [Data];
			for(var i=0;i<=mydata.length;i++)
			{
				jQuery("#list4").jqGrid('addRowData',i+1,mydata[i]);
			}
			var grid = $("#list4");
			grid.jqGrid('resetSelection');
			var ids = grid.getDataIDs();

			for (var i=0, il=ids.length; i < il; i++)
			{
				if(dt.length <= i)
					return;
				
				if(dt[i]["SORTKEY"]=="0")
				grid.jqGrid('setSelection',ids[i], true);
			}
			//$(document).delegate('#list4 .jqgrow td input', 'click', function () { alert('aaa'); });
	}

	function Setting()
	{
		//alert(CaptinId);
		$('#com')[0].options.length = 0;
		var id = $("#list4").getGridParam('selarrrow');
        var ids = $("#list4").jqGrid('getDataIDs');

		//var id = jQuery("#list4").jqGrid('getGridParam','selrow');
		//var ret = jQuery("#list4").jqGrid('getRowData',id);
		for (var i = 0; i < ids.length; i++) 
		{
            var check = false;
            $.each(id, function (index, value)
			{
                if (value == ids[i])
                    check = true;
            });

            if (check)
			{
                var rowdata = $("#list4").getRowData(ids[i]);
				option = document.createElement( "option" );
				option.value = rowdata.EMPID;
				option.innerText = rowdata.EMPNAME;
				$("#com").append(option);
			}

		}	

		//$("#com")[0].selectedIndex =  -1;
		if(CaptinId == "")
		{
			$("#com")[0].selectedIndex =  -1;
		}
		else
		{
			$("#com").val(CaptinId);
		}
		
		$("#com").selectmenu("refresh");
	};

	function SaveCheck()
	{
		if($('#com')[0].options.length > 0)
		{
			if($("#com")[0].selectedIndex ==  -1)
			{
				navigator.notification.alert("대표작업자를 선택하세요.",fn_alertCallback, "알림","확인");
			}
			/*else if ($("#alba_cnt").val() != "" && typeof $("#alba_cnt").val() != "undefined") 
			{
				var pattern = /^[+-]?\d+(\.\d+)?$/;
				if (!pattern.test($("#alba_cnt").val())) 
				{
					navigator.notification.alert("알바생 수는 숫자만 입력할수 있습니다.",fn_alertCallback, "알림","확인");
				}
			}*/
			else
			{
				Save();
			}
		}
		else
		{
			Save();
		}
	}
		
	function Save()
	{	
        var id = $("#list4").getGridParam('selarrrow');
        var ids = $("#list4").jqGrid('getDataIDs');
        var dat = "";
		var Rdat = "";
        var count = 0;
		var aaa="";
        for (var i = 0; i < ids.length; i++) 
		{
            var check = false;
            $.each(id, function (index, value)
			{
                if (value == ids[i])
                    check = true;
            });
 
            if (check) {
                var rowdata = $("#list4").getRowData(ids[i]);
				/*if($(rowdata.WEMPID == "YES"))
				{
					aaa=rowdata.EMPNAME;
				}*/
                dat += rowdata.EMPID + ',';
                count++;
            }
		}
		Rdat=dat.substr(0,dat.length-1);
		//alert(aaa);

		var jsonData = '{"workhistoryno":' + "\""+ workhistoryno 
				+ "\"," +"\""+ "rdat"+"\":" + "\""+ Rdat 
				+ "\"," +"\""+ "albacnt"+"\":" + "\""+ $("#alba_cnt").val() 
				+ "\"," + "captin:" + "\""+ $("#com").val() + "\""
				+'}'

			$.ajax({
			url: m_dbpath + "Worker.aspx/saveworker",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{
				if(data.d.mydt[0]["RESULT"] == "Y")
				{
					//alert('저장되었습니다.');
					navigator.notification.alert("저장되었습니다.",fn_alertCallback, "알림","확인");
					jQuery("#list4").jqGrid('clearGridData');
					Grid();
					$("#alba_cnt").val(0);
				}
				else
				{
					//alert('저장에 실패하였습니다.');
					navigator.notification.alert("저장에 실패하였습니다11111.",fn_alertCallback, "알림","확인");
				}
			},			
			error:function(data) {
				//alert('저장에 실패하였습니다.');
				navigator.notification.alert("저장에 실패하였습니다.",fn_alertCallback, "알림","확인");
				}
			});
	}

/*초성 조회  */	
function fn_Search(){
	var jsonData= '{"strWorkhistoryno":' + "\""+ workhistoryno 
	+ "\"," +"\""+ "strHan"+"\":" + "\""+ $("#s_data").val()   + "\""
	+'}';
	 
	$.ajax({
	url: m_dbpath + "Worker.aspx/js_hangle",
	contentType:"Application/json; charset=utf-8",
	dataType:"json",
	data:jsonData,
	type:"POST",
	success:function(data)
	{
		jQuery("#list4").jqGrid('clearGridData');
		$(makeControl(data.d.mydt));
	},
	error:function(data) {
		alert('접속오류');
		navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
		}
	});
}
	
    /*뒤로 버튼을 누르면 이전페이지로 되돌아 간다.  */
    function fn_Back() {
        location.replace("./Main.html");
    };

    function fn_Manual() {
        location.replace("./help/WorkerManual.html");
    };

	function fn_Tuto()
	{
		if(m_workFlag == "0" || m_workFlag == "" || m_workFlag==null)
		{//단일실적
			location.replace("./help/WorkResult01Tuto.html");
		}
		else if(m_workFlag == "1")
		{//쿼터실적
			location.replace("./help/WorkResult02Tuto.html");
		}
	}







//0) 컨트롤별 변수 선언하기
var data1,data2,data3, data4, data5, data6, data7, data8, data9, data10, data11, histno;

var db;	
var sql = "";

var m_name, m_id,m_pass, m_empid, m_mcd, m_mname, m_workers;
var m_odrkey, m_workdate, m_partcode, m_partname, m_partspec, m_workqty;
var m_statusname, m_status, m_worderno, m_wipseq;

var m_center;			//작업공정
var m_workFlag;			//생산실적 입력방법
var m_workResultStart;	//실적 저장시 자동 재시작 구분
var m_autoWorkerReTuip;	//자동시작 시 이전작업자 자동 투입
var m_setimeManualInput; //작업의 시작/종료 시 시간의 수동입력


/*폰겝 사용가능하도록 이벤트 처리  */

function onStart()
{
}


window.onload = function(){ 
	document.addEventListener("deviceready",onStart,false);
	fn_Init();
};
		
function fn_Init(){ 		
	
	// data1 = document.getElementById("div_content").document.getElementById("d_data0").document.getElementById("data0").document.getElementById("tddata1");
	// alert(data1.innerHTML);

	 //alert($("#tddata1")[0].innerHTML); 	 
	//=> 위 두가지 유형이 동일한 값 가져옴.
	//alert($("#tddata1")[0].innerHTML);
	
		
	m_name    	= window.localStorage.getItem("name");
	m_id   		= window.localStorage.getItem("id");
	m_pass   	= window.localStorage.getItem("pass");	
	m_empid   	= window.localStorage.getItem("empid");
	
	m_mcd       = window.localStorage.getItem("mcd");
	m_mname     = window.localStorage.getItem("mname");
	
	m_center	= window.localStorage.getItem("center");//작업공정
	m_workFlag	= window.localStorage.getItem("workflag");//생산실적 입력방법
	m_workResultStart	= window.localStorage.getItem("workresultstart");//실적 저장시 자동 재시작 구분
	m_autoWorkerReTuip	= window.localStorage.getItem("autoworkerretuip");//자동시작 시 이전작업자 자동 투입
	m_setimeManualInput = window.localStorage.getItem("settimemanualinput");
	m_center = '100';
	/*0: 	단일실적 입력 (실적 입력화면에서 실적내역을 조회하여 보여준다.)
	  1:	쿼터별 실적 입력(입력되는 실적을 입력한다.)	  */
	m_workFlag = '0';
	/*0:실적 저장만 진행, 1:실적 저장 시 자동 작업 종료 및 재시작)  */
	m_workResultStart = '0';
	/*0:실적 저장 시 작업자 미투입(자동), 1:실적 저장 시 자동 작업 종료 및 재시작 의 경우 기존 작업자 자동 투입  */ 
	m_autoWorkerReTuip = '0';
	/*0: 작업 시작/종료시 자동 종료, 1:작업 시작/종료 시 수동입력 종료  */
	m_setimeManualInput = '0';
 	
	m_odrkey = window.localStorage.getItem("odrkey");
	m_workdate = window.localStorage.getItem("workdate");
	m_partcode = window.localStorage.getItem("partcode");
	m_partname = window.localStorage.getItem("partname");
	m_partspec = window.localStorage.getItem("partspec");
	m_workqty = window.localStorage.getItem("workqty");
	m_statusname = window.localStorage.getItem("statusname");
	m_status = window.localStorage.getItem("status");
	m_worderno = window.localStorage.getItem("worderno");
	m_wipseq = window.localStorage.getItem("wipseq"); 
	
	data1 = $("#tddata1")[0]; //설비명	
	data2 = $("#tddata2")[0]; //품목코드
	data3 = $("#tddata3")[0]; //품목명
	data4 = $("#tddata4")[0]; //규격
	data5 = $("#tddata5")[0]; //지시량
	data6 = $("#tddata6")[0]; //시작시간
	data7 = $("#tddata7")[0]; //작업자
	data8 = $("#tddata8")[0]; //상태
	
	data9 = $("#tddata9")[0]; //생산량
	data10 = $("#tddata10")[0]; //양품량
	data11 = $("#tddata11")[0]; //불량량
	
	fn_CtlInit();
};

function fn_CtlInit()
{
	//1) 컨트롤 초기화
	if(m_mcd == '' || m_mcd == 'undefined'){
		data1.innerHTML = "";
		data2.innerHTML = "";
		data3.innerHTML = "";
		data4.innerHTML = "";
		data5.innerHTML = "";
		data6.innerHTML = "";
		data7.innerHTML = "";
		data8.innerHTML = "";
		
		data9.innerHTML = "0";
		data10.innerHTML = "0";
		data11.innerHTML = "0"; 
	}
	else{		
		data1.innerHTML = m_mname;
		data2.innerHTML = m_partcode;
		data3.innerHTML = m_partname;
		data4.innerHTML = m_partspec;
		data5.innerHTML = m_workqty;
		data6.innerHTML = "";
		data7.innerHTML = m_workers;
		data8.innerHTML = m_statusname;
		
		data9.innerHTML = "0";
		data10.innerHTML = "0";
		data11.innerHTML = "0"; 
		}
};
  
//////////////////////////////작업시작////////////////////////
function fn_WorkStartStop(){
	var btn_Job = document.getElementId("btn_job");
	if(data3.innerHTML == '' || data3.innerHTML == 'undefined')
		{
			alert("작업지시를 선택하세요.");
			return;
		}
	
	if(data8.innerHTML == '' || data8.innerHTML == '대기' || data8.innerHTML == '등록'|| data8.innerHTML == 'undefined'){
		//작업시작
		if(m_setimeManualInput == '1'){
			location.replace("./WorkStartStopTime.html")
			return
		}
		
		navigator.notification.confirm('작업을 시작하시겠습니까?'
				,fn_Start,
				'작업시작',
				'예,아니오');
	}
	else{
		//작업종료
		if(m_setimeManualInput == '1'){
			location.replace("./StartStopTime.html")
			return
		}
		navigator.notification.confirm('작업을 종료하시겠습니까?'
				,fn_End,
				'작업종료',
				'예,아니오');
	}
	
	//데이터 기록 및 상태 변경
	location.replace("./StartStopResult.html"); 
};
/*작업 종료 */
function fn_End(){
		
};

/*작업 시작  */
function fn_Start(){
	json_param ='{"machine":' + "\""+ m_mcd + "\"," + "worderno:" + "\""+ m_worderno + "\"," + "wipseq:" + "\""+ m_wipseq + "\"" +'}';
	$.ajax({
	url:"http://121.78.112.176:222/POP/PorductReturnToJson.aspx/workstart",
	contentType:"Application/json; charset=utf-8",
	dataType:"json",
	data:json_param,
	type:"POST",
	success:function(data)
	{
		fn_Back();
		return;
		 
	},
	error:function(data) {alert('네트워크 상에 문제가 발생되었습니다.');		
	}
	});
 }

 
function fn_Back(){
	location.replace("./Main.html");
};








//0) 컨트롤별 변수 선언하기
var data1,data2,data3, data4, data5, data6, data7, data8, data9, data10, data11, tdqty;

var db;	
var sql = "";

var m_name, m_id,m_pass, m_empid, m_mcd, m_mname, m_workers;
var m_odrkey, m_workdate, m_partcode, m_partname, m_partspec, m_workqty;
var m_statusname, m_status, m_worderno, m_wipseq, m_lotno, m_histno;
var m_autogoodqty, m_goodqty, m_badqty, m_inputqty;

var m_center;			//작업공정
var m_workFlag;			//생산실적 입력방법
var m_workResultStart;	//실적 저장시 자동 재시작 구분
var m_autoWorkerReTuip;	//자동시작 시 이전작업자 자동 투입
var m_setimeManualInput; //작업의 시작/종료 시 시간의 수동입력


window.localStorage["pagename"] 	= "WorkResult01.html";

/*폰겝 사용가능하도록 이벤트 처리  */
//document.addEventListener("deviceready",onStart,false);

function onStart()
{
	document.addEventListener("backbutton", onBackButton, true);	
}

function onBackButton(){
	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
			  , fn_confirmCallback_Exit
			  , "이동"
			  , "아니오,예");
};

function fn_confirmCallback_Exit(button){
		if(button == 2)
			location.replace("./Main.html");
} ;


function fn_alertCallback(){};	

window.onload = function(){ 
	document.addEventListener("deviceready",onStart,false);
	
	document.addEventListener("hidekeyboard", onHide, false);
    document.addEventListener("showkeyboard", onShow, false);
	fn_Init();
};

function onHide() 
{
    $("#footer").show();
};

function onShow() 
{
    $("#footer").hide();
};
		
function fn_Init(){ 		
	m_name    	= window.localStorage.getItem("name");
	m_id   		= window.localStorage.getItem("id");
	m_pass   	= window.localStorage.getItem("pass");	
	m_empid   	= window.localStorage.getItem("empid");
	
	m_mcd       = window.localStorage.getItem("mcd");
	m_mname     = window.localStorage.getItem("mname");
	
	m_center	= window.localStorage.getItem("center");//작업공정
	m_workFlag	= window.localStorage.getItem("workflag");//생산실적 입력방법
	m_workResultStart	= window.localStorage.getItem("workresultstart");//실적 저장시 자동 재시작 구분
	m_autoWorkerReTuip	= window.localStorage.getItem("autoworkerretuip");//자동시작 시 이전작업자 자동 투입
	
	m_center = '100';
	/*0: 	단일실적 입력 (실적 입력화면에서 실적내역을 조회하여 보여준다.)
	  1:	쿼터별 실적 입력(입력되는 실적을 입력한다.)	  */
	m_workFlag = '0';
	/*0:실적 저장만 진행, 1:실적 저장 시 자동 작업 종료 및 재시작)  */
	m_workResultStart = '0';
	/*0:실적 저장 시 작업자 미투입(자동), 1:실적 저장 시 자동 작업 종료 및 재시작 의 경우 기존 작업자 자동 투입  */ 
	m_autoWorkerReTuip = '0';
	/*0: 작업 시작/종료시 자동 종료, 1:작업 시작/종료 시 수동입력 종료  */
	m_setimeManualInput = '0';
 	
	m_odrkey = window.localStorage.getItem("odrkey");
	m_workdate = window.localStorage.getItem("workdate");
	m_partcode = window.localStorage.getItem("partcode");
	m_partname = window.localStorage.getItem("partname");
	m_partspec = window.localStorage.getItem("partspec");
	m_workqty = window.localStorage.getItem("workqty");
	m_statusname = window.localStorage.getItem("statusname");
	m_status = window.localStorage.getItem("status");
	m_worderno = window.localStorage.getItem("worderno");
	m_wipseq = window.localStorage.getItem("wipseq"); 
	
	m_lotno = window.localStorage.getItem("lotno");
	m_histno = window.localStorage.getItem("histno");
	m_workers = window.localStorage.getItem("workers");
	m_autogoodqty = window.localStorage.getItem("autogoodqty");
	m_goodqty = window.localStorage.getItem("goodqty");
	m_badqty = window.localStorage.getItem("badqty");
	
	data1 = $("#tddata1")[0]; //설비명	
	data2 = $("#tddata2")[0]; //품목코드
	data3 = $("#tddata3")[0]; //품목명
	data4 = $("#tddata4")[0]; //규격
	data5 = $("#tddata5")[0]; //지시량
	data6 = $("#tddata6")[0]; //시작시간
	data7 = $("#tddata7")[0]; //작업자
	data8 = $("#tddata8")[0]; //상태
	
	data9 = $("#tddata9")[0]; //생산량
	data10 = $("#tddata10")[0]; //양품량
	data11 = $("#tddata11")[0]; //불량량
	
	tdqty  = $("#txt_qty")[0]; //생산량
	
	data1.innerHTML = m_mname
	data2.innerHTML = m_partcode;
	data3.innerHTML = m_partname;
	data4.innerHTML = m_partspec;
	data5.innerHTML = m_workqty;
	data6.innerHTML = m_workdate;
	data7.innerHTML = m_workers;
	data8.innerHTML = m_statusname;				
	data9.innerHTML = m_autogoodqty + " EA";
	data10.innerHTML = m_goodqty + " EA";
	data11.innerHTML = m_badqty + " EA";	
//	tdqty.innerHTML = m_goodqty
	
	
};

function fn_Save(){
	var json_param = '';
	var qty = tdqty.value;
	 
	if(qty == "" || qty == "undefined" || qty == "0" ){
			//alert("생산수량을 0이상 입력하세요.");
			navigator.notification.alert("생산수량을 0이상 입력하세요.",fn_alertCallback, "알림","확인");
			return;
		}
	
	    
    $(document).ready(function() {   
        json_param = '{"strHistNo":' + "\"" + m_histno + "\"," 
        	       + "strLotNo:" + "\"" + m_lotno + "\"," 
        	       + "strQty:" + "\"" + qty + "\"" + '}';

        $.ajax({
            url: "http://121.78.112.176:222/POP/PorductReturnToJson.aspx/js_SWorkResult",
            contentType: "Application/json; charset=utf-8",
            dataType: "json",
            data: json_param,
            type: "POST",
            success: function(data) {
            	fn_seccess(data.d); 
                return;
            },
            error: function(data) { 
            	//alert('네트워크 상에 문제가 발생되었습니다.');
            	navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
            	}
        });
    });
};

function fn_seccess(dt){
	//var txtMdf = document.frm1.name1.value.split(" ");
	 for (var row in dt.mydt) {
		 if(dt.mydt[row]["RESULTSTATUS"] == "OK"){
			 //fn_Back();
			 navigator.notification.alert("저장을 완료하였습니다.",fn_alertCallback, "알림","확인");
			 return;
		 }
		 
		 if(dt.mydt[row]["RESULTSTATUS"] == "FALSE"){
			// alert("저장을 실패하였습니다.");
			navigator.notification.alert("저장을 실패하였습니다.",fn_alertCallback, "알림","확인");
			 return;
		 }
	 }
	 return;
};

	/*뒤로 버튼을 누르면 이전페이지로 되돌아 간다.  */
	function fn_Back(){
		location.replace("./Main.html")
	};

    function fn_Manual() {
        	location.replace("./help/WorkResult01Manual.html");
    };

	function fn_Tuto()
	{
		if(m_workFlag == "0" || m_workFlag == "" || m_workFlag==null)
		{//단일실적
			location.replace("./help/WorkResult01Tuto.html");
		}
		else if(m_workFlag == "1")
		{//쿼터실적
			location.replace("./help/WorkResult02Tuto.html");
		}
	}















	jQuery.extend(jQuery.mobile.datebox.prototype.options, {
		useModal: true,
		useNewStyle: true,
		usePlaceholder: true
	});
	
	
	//window.localStorage["dbpath"] = 'http://121.78.112.176:222/T_POP/';
	var m_dbpath = window.localStorage.getItem("dbpath"); 

	var m_worderno    	= window.localStorage.getItem("worderno");
	var m_wipseq      	= window.localStorage.getItem("wipseq"); 
	var m_partname    	= window.localStorage.getItem("partname");
	var m_histno 		= window.localStorage.getItem("histno");
	var m_mcd         	= window.localStorage.getItem("mcd");
	var m_mname         = window.localStorage.getItem("mname");
	var m_lotno       	= window.localStorage.getItem("lotno");
	var m_histno      	= window.localStorage.getItem("histno");
	var m_id   			= window.localStorage.getItem("id");
	var m_autoWorkerReTuip	= window.localStorage.getItem("autoworkerretuip");//자동시작 시 이전작업자 자동 투입
	var m_quarter		= window.localStorage.getItem("quarter");
	var m_quartercd		= window.localStorage.getItem("quartercd");
	var m_goodqty   	= window.localStorage.getItem("goodqty");
	var m_empid   		= window.localStorage.getItem("empid");
	var m_selhistno = '';
 	var m_SelLotno = '';
	
	var m_hisno2 = window.localStorage.getItem("histno"); //저장된거 하나도 없을때 가져갈 처음 히스토리넘버

	var	m_workFlag	= window.localStorage.getItem("workflag");//생산실적 입력방법
	window.localStorage["pagename"] 	= "WorkResult02.html";

 	//생산실적 부분에 메인의 실적번오 전송
 	
	
	//m_quartercd = "A";
	//m_histno = '20130409A030001';
	//m_SelLotno = '20130409A030001';
	//m_worderno = '201206010017';
	//m_wipseq = '1';
	//m_mcd = 'A03';
	
	m_selhistno = m_histno;
	m_SelLotno = m_lotno;
	var m_SelQuatercd	= m_quartercd;
	
    var timeflag = "0";
	var dtflag = "0"
	var Totalqty = 0;
	var SaveFlag = "0";
	var m_autoWorkerReTuip = "0";
	var dt_Table;
	var hisflag = 0;
	/* var curdate;
	var curtime
	var datenow;
	
	datenow = new Date();
    curdate = getDateStrFromDateObject(datenow);
	curtime = getTimeStrFromDateObject(datenow);
 */
	//QUTER_RESULT 의 인자, strMachine, strWorderNo, strWipSeq
	
	
	document.addEventListener("deviceready", onStart, false);
    function onStart() {   
    	document.addEventListener("backbutton", onBackButton, true);	
    	};

    	function onBackButton(){
			if(hisflag > 0 && SaveFlag == "0")
			{
				navigator.notification.alert("실적이 있는 쿼터를 선택하세요",fn_alertCallback, "알림","확인");
			}
			else
			{
				navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
						  , fn_confirmCallback_Exit
						  , "이동"
						  , "아니오,예");
			}
    	};

    	function fn_confirmCallback_Exit(button){
    			if(button == 2)
				{
					if(hisflag > 0 )//실적이없으면 처음 번호 가지고감 저장했다 다지우고 넘어갈때 문제 때문에
					{
						window.localStorage["quartercd"]="";
						//window.localStorage["histno"] = m_hisno2;
					}
					window.localStorage["codename"]=$("#quter").text();
					location.replace("./Main.html");
				}
    	} ;


    	function fn_alertCallback(){};	
	
	
	/*화면 창 크기에 비례해서 그리드 넓이 조정  */
  $(window).resize(function(){
	  	//그리드 옵션 : autowidth:true
        $("list4").setGridWidth($(this).width() * .100);   
    });
    
	window.onload = function()
	{
		//$("#part").val(partname);
		/* 옵션처리(쿼터)  */
		
		$(document).ready(function()
		{	
			jQuery("#list4").jqGrid('clearGridData');
			Grid();	
		});
		
		$("#part")[0].innerHTML = m_partname;  
	    $("#mchname")[0].innerHTML = m_mname;
	    //$("#quaterinfo")[0].innerHTML = m_quarter;
	    $("#goodqty")[0].innerHTML = m_goodqty + ' EA';
		//alert(m_quarter);
		if(m_quarter=="null")
		{
			$("#quter")[0].innerHTML = "";
			$("#quaterinfo")[0].innerHTML = "";
		}
		else
		{
			$("#quter")[0].innerHTML = m_quarter ;
			$("#quaterinfo")[0].innerHTML = m_quarter ; 
		}
	    
	    document.addEventListener("hidekeyboard", onHide, false);
        document.addEventListener("showkeyboard", onShow, false);
	};
	
	function onHide() 
    {
        $("#footer").show();
    };

    function onShow() 
    {
        $("#footer").hide();
    };

	/*그리드 데이터를 조회한다.  */
	function Grid()
	{
		
		var jsonData='{"stMachine":' + "\""+ m_mcd 
					  + "\"," +"\""+ "strWorderNo"+"\":" + "\""+ m_worderno 
					  + "\"," + "strWipSeq:" + "\""+ m_wipseq + "\""
					+'}';
			$.ajax({
			url: m_dbpath + "PorductReturnToJson.aspx/js_QWorkResultSearch",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{
				dt_Table = data.d.mydt;
				$(makeControl(data.d.mydt));				
			},
			error:function(data) {
				dt_Table = null;
				//alert('접속오류');	
				navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
				}
			});
	};
	
	/*그리드의 특정 쿼터를 선택한다.  */
	function fn_Setting(){ 
		/*1. 작업중인 쿼터정보를 기준으로 그리드의 쿼터 리스트를 선택되도록 한다.  */		
		if(dt_Table == null)
			return;
		
		for(row in dt_Table)
			{
				//seq 값을 찾는다.
				if(dt_Table[row]["RESULTGBN"] == m_quartercd){
						//row 선택						
						//jQuery("#list4").setSelection(row, true);
						jQuery('#list4').jqGrid('setSelection', row , true); 
						jQuery("#list4").focus();
						return;
					}
			}
	};
	 

	//제큐 그리드 만들기
	function makeControl(dt)
	{
		var tgoodqty = 0;	//양품량
			Totalqty = 0;
	
			hisflag=0;
			jQuery("#list4").jqGrid({
			datatype: "local",
			colNames:['쿼터','양품량','히스토리','쿼터코드','양품량H','LOTNO','CNT'],
			colModel:[
				{name:'CODENAME',	index:'CODENAME', 	sorttype:"int",		width:50,	align:"center"},
				{name:'DISP_GOODQTY',	index:'DISP_GOODQTY',  	align : 'right',	width:55},
				{name:'WORKHISTORYNO',	index:'WORKHISTORYNO',	hidden:true},
				{name:'RESULTGBN',	index:'RESULTGBN',	hidden:true},
				{name:'GOODQTY',	index:'GOODQTY',	hidden:true},
				{name:'LOTNO',		index:'LOTNO',		hidden:true},
				{name:'CNT',		index:'CNT',		hidden:true}
			],			
			autowidth : true,
			editable :  false,
			sortable:   false,
			height: "100%",
			// 이 부분이 가장 중요 ( 설정해주지 않으면 데이터 순서를 읽지 못함 )
			//jsonReader : { repeatitems: false },
			loadComplete: function(data){
				//dt_Table = dt;
				fn_Setting();
			},
			onSelectRow: function(SEQ)
			{ 
				Setting();
			}
			}).navGrid('#list4',{add:false,del:false,edit:false,position:'right'});
			
			var Data = new Array();
			for(row in dt)
			{
				Data[row]={ CODENAME:dt[row]["CODENAME"]
						  , DISP_GOODQTY:dt[row]["DISP_GOODQTY"]
						  , WORKHISTORYNO:dt[row]["WORKHISTORYNO"]
				          , RESULTGBN:dt[row]["RESULTGBN"]
				          , GOODQTY:dt[row]["GOODQTY"]
						  , LOTNO:dt[row]["LOTNO"]
						  , CNT:dt[row]["CNT"]};
				
				Totalqty +=dt[row]["GOODQTY"];
				
				//alert(m_quartercd);
				
				if(m_quartercd == [row]["RESULTGBN"]){					
					m_goodqty = dt[row]["GOODQTY"];
					$("#goodqty")[0].innerHTML = m_goodqty + ' EA' ;
				}
				
				if(dt[row]["CNT"] == 0){
					window.localStorage["histno"] 		= '';
					window.localStorage["quartercd"]	= '';
					window.localStorage["lotno"]        = '';
					$("#quter")[0].innerHTML = '' ;
					$("#quterinfo")[0].innerHTML = '' ;
				}
				if(dt[row]["WORKHISTORYNO"] != "")
				{
					hisflag=hisflag+1;
				}
			}
			$("#total")[0].innerHTML = Totalqty  +' EA' ;			 
			
			var mydata = [Data];
			for(var i=0;i<=mydata.length;i++)
			{
				jQuery("#list4").jqGrid('addRowData',i+1,mydata[i]);
			}
			

			/* $(window).resize(function(){
				$("list4").setGridWidth($(this).width() * .100);
		    }); */
			
			
	};

	function Setting()
	{
		var id = jQuery("#list4").jqGrid('getGridParam','selrow');
		var ret = jQuery("#list4").jqGrid('getRowData',id);
		
		$("#qty").val(ret.GOODQTY);
		$("#quter")[0].innerHTML = ret.CODENAME.substr(1) ; 
		m_selhistno = ret.WORKHISTORYNO;
		m_SelQuatercd = ret.RESULTGBN;
		m_SelLotno = ret.LOTNO;
		
		if(ret.WORKHISTORYNO != "")
		{
			window.localStorage["histno"] 		= m_selhistno;
			window.localStorage["lotno"]        = m_SelLotno;
			SaveFlag = "1";
		}
		else
		{
			SaveFlag = "0";
		}
		
		window.localStorage["quartercd"]	= m_SelQuatercd;
		//작업지시번호, 지시번호
	};


	function Save()
	{		 
			var jsonData='{"strHistNo":' + "\""+ m_selhistno 
						  + "\"," +"\""+ "strLotNo"+"\":" + "\""+  m_SelLotno
						  + "\"," +"\""+ "strQty"+"\":" + "\""+ $("#qty").val()
						  + "\"," +"\""+ "strTime"+"\":" + "\""+  ""
						  + "\"," +"\""+ "strMachine"+"\":" + "\""+ m_mcd 
						  + "\"," +"\""+ "strWorderNo"+"\":" + "\""+ m_worderno
						  + "\"," +"\""+ "strWipSeq"+"\":" + "\""+ m_wipseq
						  + "\"," +"\""+ "strSeDtFlag"+"\":" + "\""+ dtflag  
						  + "\"," +"\""+ "strAutoTuipFlag"+"\":" + "\""+ m_autoWorkerReTuip   
						  + "\"," +"\""+ "strQuterCd"+"\":" + "\""+  m_SelQuatercd
						  + "\"," +"\""+ "strMainHistNo"+"\":" + "\""+  m_histno
						  + "\"," + "strEmpId:" + "\""+ m_empid + "\""
						  +'}';
			$.ajax({
			url: m_dbpath + "PorductReturnToJson.aspx/js_QWorkResult",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{ 
					fn_seccess(data.d); 
					//navigator.notification.alert("저장되었습니다.",fn_alertCallback, "알림","확인");
					jQuery("#list4").jqGrid('clearGridData');
					Grid();		
					fn_Setting();
					$("#qty").val(0);
					$("#quter")[0].innerHTML = "";
			},
			error:function(data) {
				navigator.notification.alert("저장에 실패하였습니다.",fn_alertCallback, "알림","확인");
				}
			});
			
	};

	function fn_seccess(dt){
		//var txtMdf = document.frm1.name1.value.split(" ");
		 for (var row in dt.mydt) {
			 if(dt.mydt[row]["RESULTSTATUS"] == "OK"){
				 //fn_Back();
				 navigator.notification.alert("저장을 완료하였습니다.",fn_alertCallback, "알림","확인");
				 return;
			 }
			 
			 if(dt.mydt[row]["RESULTSTATUS"] == "FALSE"){
				// alert("저장을 실패하였습니다.");
				navigator.notification.alert("저장을 실패하였습니다.",fn_alertCallback, "알림","확인");
				 return;
			 }
		 }
		 return;
	};
	
	function fn_Delete()
	{
		if(SaveFlag == "0")
		{
			navigator.notification.alert("실적이 있는 쿼터를 선택하세요",fn_alertCallback, "알림","확인");
		}
		else
		{
			navigator.notification.confirm("삭제 하시겠습니까?"
			  , Delete
			  , "삭제"
			  , "아니오,예");
		}
	}

	function Delete(button)
	{
		if(button == 2)
		{
			var Lastflag;
			if(hisflag == 1)
			{
				Lastflag="1";
			}
			else
			{
				Lastflag="0";
			}

			var jsonData='{"strHistNo":' + "\""+ m_selhistno 
						  + "\"," +"\""+ "strLotNo"+"\":" + "\""+  m_SelLotno
						  + "\"," +"\""+ "strMachine"+"\":" + "\""+  m_mcd
						  + "\"," +"\""+ "strLasgflag"+"\":" + "\""+  Lastflag
						  + "\"," +"\""+ "strWorderNo"+"\":" + "\""+ m_worderno
						  + "\"," + "strWipSeq:" + "\""+ m_wipseq + "\""
						  +'}';
			$.ajax({
			url: m_dbpath + "PorductReturnToJson.aspx/js_QWorkResultDel",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{
					navigator.notification.alert("삭제되었습니다.",fn_alertCallback, "알림","확인");
					jQuery("#list4").jqGrid('clearGridData');
					Grid();		
					fn_Setting();
					$("#qty").val(0);
					$("#quter")[0].innerHTML = "";
			},
			error:function(data) { 
				navigator.notification.alert("삭제를 실패하였습니다.",fn_alertCallback, "알림","확인");
				}
			});
		}
			
	};
	 /*뒤로 버튼을 누르면 이전페이지로 되돌아 간다.  */
    function fn_Back() {
		if(hisflag > 0 && SaveFlag == "0")
		{
			navigator.notification.alert("실적이 있는 쿼터를 선택하세요",fn_alertCallback, "알림","확인");
		}
		else
		{
			if(hisflag==0)//실적이없으면 처음 번호 가지고감 저장했다 다지우고 넘어갈때 문제 때문에
			{
				window.localStorage["quartercd"]="";
				//window.localStorage["histno"] = m_hisno2;
			}
			window.localStorage["codename"]=$("#quter").text();
  			location.replace("./Main.html");
		}
    };
 
    function fn_Manual() {
        	location.replace("./help/WorkResult02Manual.html");
    };

	function fn_Tuto()
	{
		if(m_workFlag == "0" || m_workFlag == "" || m_workFlag==null)
		{//단일실적
			location.replace("./help/WorkResult01Tuto.html");
		}
		else if(m_workFlag == "1")
		{//쿼터실적
			location.replace("./help/WorkResult02Tuto.html");
		}
	}















			jQuery.extend(jQuery.mobile.datebox.prototype.options, {
			useModal: true,
			useNewStyle: true,
			usePlaceholder: true,
		});		
			
	window.localStorage["actiongbn"]="";	
	//window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
	var m_dbpath = window.localStorage.getItem("dbpath"); 
			
	var BadCode=new Array();
	var BadName=new Array();
	var partname = window.localStorage.getItem("partname");
	var mname = window.localStorage.getItem("mname");
	//var workhistoryno = "20111004A040001";
	//var machineid = "A04";
	var machineid =  window.localStorage.getItem("mcd");
	var workhistoryno = window.localStorage.getItem("histno");

	var m_workFlag	= window.localStorage.getItem("workflag");//생산실적 입력방법

	window.localStorage["pagename"] 	= "StopResult.html";

	var StopSeq = "0";;
	var SaveFlag="0";
	var totalUse = 0;
	var Syear;
	var Eyear;
	
	var curdate;
	var curtime
	var datenow;
	
	datenow = new Date();
    curdate = getDateStrFromDateObject(datenow);
	curtime = getTimeStrFromDateObject(datenow);

    document.addEventListener("deviceready", onStart, false);
    function onStart() {   
    	document.addEventListener("backbutton", onBackButton, true);	
    	};
    
	

        function onBackButton(){
        	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
        			  , fn_confirmCallback_Exit
        			  , "이동"
        			  , "아니오,예");
        };

        function fn_confirmCallback_Exit(button){
        		if(button == 2)
        			fn_Back();
        } ;

        function fn_alertCallback(){};	

        /*로딩 시작  */
        function fn_ShowLoading(){
		    	$.mobile.showPageLoadingMsg( "a", "Loading...", false );
        	    //$.mobile.showPageLoadingMsg();
			};
		/*로딩 종료  */	
		function fn_HideLoading(){
				$.mobile.hidePageLoadingMsg(); 
			};
		           	
    	
	window.onload = function()
	{
		fn_ShowLoading();
		$(document).ready(function()
		{	
			Grid();
			var Data='{"start":' +"\"" +'1'+"\""+ '}';
			$.ajax({
			url: m_dbpath + "StopResult.aspx/init",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:Data,
			type:"POST",
			success:function(data)
			{
				$(makeOption(data.d.mydt));
			},
			error:function(data) {
				//alert('접속오류');
				navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
				}
			});
			
			$("#part")[0].innerHTML = partname;
			$("#mchname")[0].innerHTML = mname;
			
			
		});
		
		//var now = new Date();
		//alert(now.getFullYear());
		$('#sdate').trigger('datebox', {'method':'set', 'value':curdate});
		$('#stime').trigger('datebox', {'method':'set', 'value':curtime});
		$('#edate').trigger('datebox', {'method':'set', 'value':curdate});
		$('#etime').trigger('datebox', {'method':'set', 'value':curtime});

		fn_HideLoading();
		
		document.addEventListener("hidekeyboard", onHide, false);
	    document.addEventListener("showkeyboard", onShow, false);
	}
	
	function onHide() 
    {
        $("#footer").show();
    };

    function onShow() 
    {
        $("#footer").hide();
    };

	function Grid()
	{
		var jsonData='{"workhistoryno":' +"\"" +workhistoryno+"\""+ '}';
			$.ajax({
			url: m_dbpath + "StopResult.aspx/Stopresult",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{
				$(makeControl(data.d.mydt));
			},
			error:function(data) {
				//alert('접속오류');
				navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
				}
			});
	}

	//옵션 컨트롤
	function makeOption(dt)
	{
		for (var row in dt)
		{
			//stringmem=dt[row]["MEMSHTNAME"];
			BadCode[row]=dt[row]["STOPCODE"];
			BadName[row]=dt[row]["STOPNAME"];
			option = document.createElement( "option" );
			option.value = BadCode[row];
			option.innerText = BadName[row];
			$("#com").append(option);

		}
		
	   $("#com")[0].selectedIndex =  -1;
	   $("#com").selectmenu("refresh");
	  // $('#com').submit();
	}

	//제큐 그리드 만들기
	function makeControl(dt)
	{//alert('d.');
			
			jQuery("#list4").jqGrid({
			datatype: "local",
			colNames:['순번','사유', '시작시간', '종료시간','발생시간','스탑코드','시작년도','끝년도'],
			colModel:[
				{name:'STOPSEQ',index:'STOPSEQ', sorttype:"int",width:30,align:"center"},
				{name:'STOPNAME',index:'STOPNAME',width:65},
				{name:'STARTTIME',index:'STARTTIME',  align : 'center',width:60},
				{name:'ENDTIME',index:'ENDTIME',  align : 'center',width:60},
				{name:'USETIME',index:'USETIME',  align : 'center',width:40},
				{name:'STOPCODE',index:'STOPCODE',hidden:true},
				{name:'SYEAR',index:'SYEAR',hidden:true},
				{name:'EYEAR',index:'EYEAR',hidden:true}
			],
			//multiselect: true,
			//viewrecords: true,
			autowidth : true,
			height: "100%",
			onSelectRow: function(SEQ)
			{ 
				Setting();
			}//,
			//caption: "비가동실적관리"

			}).navGrid('#list4',{add:false,del:false,edit:false,position:'right'}); 

			var Data = new Array();
			for(row in dt)
			{
				Data[row]={STOPSEQ:dt[row]["STOPSEQ"],STOPNAME:dt[row]["STOPNAME"],STARTTIME:dt[row]["STARTTIME"],ENDTIME:dt[row]["ENDTIME"],
				USETIME:dt[row]["USETIME"],STOPCODE:dt[row]["STOPCODE"],SYEAR:dt[row]["SYEAR"],EYEAR:dt[row]["EYEAR"]};
				totalUse +=dt[row]["USETIME"];
			}
			$("#totalUse")[0].innerHTML = totalUse + ' 분';
			totalUse=0;
			var mydata = [Data];
			for(var i=0;i<=mydata.length;i++)
			{
				jQuery("#list4").jqGrid('addRowData',i+1,mydata[i]);
			}
			
			//jQuery("#list4").hideCol("BADCODE");

	}

	function Setting()
	{
		$("#stats")[0].innerHTML="수정";
		SaveFlag="1";
		var id = jQuery("#list4").jqGrid('getGridParam','selrow');
		var ret = jQuery("#list4").jqGrid('getRowData',id);
		var Stime = ret.STARTTIME.split(" ");
		var Etime = ret.ENDTIME.split(" ");
		$('#sdate').trigger('datebox', {'method':'set', 'value':(ret.SYEAR + '-' + Stime[0])});
		$('#stime').trigger('datebox', {'method':'set', 'value':Stime[1]});
		$('#edate').trigger('datebox', {'method':'set', 'value':(ret.SYEAR + '-' + Etime[0])});
		$('#etime').trigger('datebox', {'method':'set', 'value':Etime[1]});
		StopSeq = ret.STOPSEQ;
		Syear = ret.SYEAR;
		Eyear = ret.EYEAR;
		//alert($("#sdate").val());
		//alert($("#stime").val());
		//$("#bad").val((ret.QTY.replace(/\s+/, '')));
		$("#com").val(ret.STOPCODE); 
		$("#com").selectmenu('refresh');
	}

	function Delete()
	{		
		//alert("h=> " + workhistoryno + ", s=> " + StopSeq);		
		if(workhistoryno == "" || StopSeq == "" || StopSeq == 'undefined' || StopSeq == "0")
			return;
		
		navigator.notification.confirm("삭제하시겠습니까?"
				  , fn_Delete
				  , "삭제"
				  , "아니오,예");
	}
	
	function fn_Delete(button)
	{ 
		if(button == 2)
		{
			var jsonData = '{"workhistoryno":' + "\""+ workhistoryno 
							+ "\"," +"\""+ "stopseq"+"\":" + "\""+ StopSeq 
							+ "\"," + "stopcode:" + "\""+ $("#com").val() + "\""
							+'}'
			$.ajax({
			url: m_dbpath + "StopResult.aspx/delete",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{
				//alert('삭제되었습니다.');
				navigator.notification.alert("삭제되었습니다.",fn_alertCallback, "알림","확인");
				jQuery("#list4").jqGrid('clearGridData');
				Grid();
				New();
			},
			error:function(data) {
				//alert('삭제에 실패하였습니다.');
				navigator.notification.alert("삭제를 실패하였습니다.",fn_alertCallback, "알림","확인");
				}
			});
			
		}
		else
		{
			 return;
		}
		//jQuery("#list4").jqGrid('clearGridData');
	}

	function Save()
	{
			var stime;
			var etime;
			 
			if($("#com").val() == null){
				navigator.notification.alert("비가동사유를 선택하세요.",fn_alertCallback, "알림","확인");
				return;		
			}
				
			
			//if(SaveFlag==1)
			//{
			//	stime = Syear + "-" + $("#sdate").val() + " " + $("#stime").val();
			//	etime = Eyear + "-" + $("#edate").val() + " " + $("#etime").val();
			//}
			//else
			//{
				//var now = new Date();
				//stime = now.getFullYear()+"-" + $("#sdate").val() + " " + $("#stime").val();
				//etime = now.getFullYear()+"-" + $("#edate").val() + " " + $("#etime").val();
				
				stime = $("#sdate").val() + " " + $("#stime").val();
				etime = $("#edate").val() + " " + $("#etime").val();
			//}
			
			if(compareIsPastDay(stime,etime) <= 0){
				navigator.notification.alert("시작시간 및 종료시간을 확인하세요.",fn_alertCallback, "알림","확인");
				return;
				}

			var jsonData='{"workhistoryno":' + "\""+ workhistoryno 
						  + "\"," +"\""+ "stopseq"+"\":" + "\""+ StopSeq 
						  + "\"," +"\""+ "stopcode"+"\":" + "\""+ $("#com").val()
						  + "\"," +"\""+ "machineid"+"\":" + "\""+  machineid
						  + "\"," +"\""+ "stime"+"\":" + "\""+  stime
						  + "\"," +"\""+ "etime"+"\":" + "\""+  etime
						  + "\"," + "saveflag:" + "\""+ SaveFlag + "\""
						+'}'

			$.ajax({
			url: m_dbpath + "StopResult.aspx/update",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{
				if(data.d.mydt[0]["RESULT"] == "Y")
				{
					//alert('저장되었습니다.');
					navigator.notification.alert("저장되었습니다.",fn_alertCallback, "알림","확인");
					jQuery("#list4").jqGrid('clearGridData');
					Grid();
					New();
				}
				else
				{
					//alert('시간이 알맞지 않습니다.');
					navigator.notification.alert("입력시간을 확인하세요.",fn_alertCallback, "알림","확인");
				}
			},
			error:function(data) {
				//alert('저장에 실패하였습니다.');
				navigator.notification.alert("저장에 실패하였습니다.",fn_alertCallback, "알림","확인");
				}
			});
	}

	function New()
	{
		SaveFlag="0";
		StopSeq="";
		jQuery("#list4").resetSelection();
		$("#com")[0].selectedIndex =  -1;
		$("#com").selectmenu("refresh");
		$("#stats")[0].innerHTML="신규";
		$('#sdate').trigger('datebox', {'method':'set', 'value':curdate});
		$('#stime').trigger('datebox', {'method':'set', 'value':curtime});
		$('#edate').trigger('datebox', {'method':'set', 'value':curdate});
		$('#etime').trigger('datebox', {'method':'set', 'value':curtime});
	}
	
	 /*뒤로 버튼을 누르면 이전페이지로 되돌아 간다.  */
    function fn_Back() {
  		location.replace("./Main.html");
    };
     function fn_Manual() {
        location.replace("./help/StopResultManual.html");
    };
	
	function fn_Tuto()
	{
		if(m_workFlag == "0" || m_workFlag == "" || m_workFlag==null)
		{//단일실적
			location.replace("./help/WorkResult01Tuto.html");
		}
		else if(m_workFlag == "1")
		{//쿼터실적
			location.replace("./help/WorkResult02Tuto.html");
		}
	};
















	jQuery.extend(jQuery.mobile.datebox.prototype.options, {
		useModal: true,
		useNewStyle: true,
		usePlaceholder: true
	});
	
	
	//window.localStorage["dbpath"] = 'http://121.78.112.176:222/T_POP/';
	var m_dbpath = window.localStorage.getItem("dbpath"); 

	var m_worderno    	= window.localStorage.getItem("worderno");
	var m_wipseq      	= window.localStorage.getItem("wipseq"); 
	var m_partname    	= window.localStorage.getItem("partname");
	var m_histno 		= window.localStorage.getItem("histno");
	var m_mcd         	= window.localStorage.getItem("mcd");
	var m_mname         = window.localStorage.getItem("mname");
	var m_lotno       	= window.localStorage.getItem("lotno");
	var m_histno      	= window.localStorage.getItem("histno");
	var m_id   			= window.localStorage.getItem("id");
	var m_autoWorkerReTuip	= window.localStorage.getItem("autoworkerretuip");//자동시작 시 이전작업자 자동 투입
	var m_quarter		= window.localStorage.getItem("quarter");
	var m_quartercd		= window.localStorage.getItem("quartercd");
	var m_goodqty   	= window.localStorage.getItem("goodqty");
	var m_empid   		= window.localStorage.getItem("empid");
	var m_selhistno = '';
 	var m_SelLotno = '';

	
	var	m_workFlag	= window.localStorage.getItem("workflag");//생산실적 입력방법
	window.localStorage["pagename"] 	= "WorkResult02.html";
 	
 	//생산실적 부분에 메인의 실적번오 전송
 	
	
	//m_quartercd = "A";
	//m_histno = '20130409A030001';
	//m_SelLotno = '20130409A030001';
	//m_worderno = '201206010017';
	//m_wipseq = '1';
	//m_mcd = 'A03';
	
	m_selhistno = m_histno;
	m_SelLotno = m_lotno;
	var m_SelQuatercd	= m_quartercd;
	
    var timeflag = "0";
	var dtflag = "0"
	var Totalqty = 0;
	var SaveFlag = "0";
	var m_autoWorkerReTuip = "0";
	var dt_Table;
	var hisflag = 0;
	/* var curdate;
	var curtime
	var datenow;
	
	datenow = new Date();
    curdate = getDateStrFromDateObject(datenow);
	curtime = getTimeStrFromDateObject(datenow);
 */
	//QUTER_RESULT 의 인자, strMachine, strWorderNo, strWipSeq
	
	
	document.addEventListener("deviceready", onStart, false);
    function onStart() {   
    	document.addEventListener("backbutton", onBackButton, true);	
    	};

    	function onBackButton(){
			if(hisflag > 0 && m_selhistno =="")
			{
				navigator.notification.alert("실적이 있는 쿼터를 선택하세요",fn_alertCallback, "알림","확인");
			}
			else
			{
				navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
						  , fn_confirmCallback_Exit
						  , "이동"
						  , "아니오,예");
			}
    	};

    	function fn_confirmCallback_Exit(button){
    			if(button == 2)
					if( hisflag==0)
					{
						window.localStorage["actiongbn"] = "order";
					}
    				location.replace("./Main.html");
    	} ;


    	function fn_alertCallback(){};	
	
	
	/*화면 창 크기에 비례해서 그리드 넓이 조정  */
  $(window).resize(function(){
	  	//그리드 옵션 : autowidth:true
        $("list4").setGridWidth($(this).width() * .100);   
    });
    
	window.onload = function()
	{
		
		//$("#part").val(partname);
		/* 옵션처리(쿼터)  */
		$(document).ready(function()
		{	
			jQuery("#list4").jqGrid('clearGridData');
			Grid();	
		});
		
		$("#part")[0].innerHTML = m_partname;
	    $("#mchname")[0].innerHTML = m_mname;
	    //$("#quaterinfo")[0].innerHTML = m_quarter;
	    $("#goodqty")[0].innerHTML = m_goodqty + ' EA';
		alert(m_quarter);
		if(m_quarter==null)
		{
			$("#quter")[0].innerHTML = "";
			$("#quaterinfo")[0].innerHTML = "";
		}
		else
		{
			$("#quter")[0].innerHTML = m_quarter ;
			$("#quaterinfo")[0].innerHTML = m_quarter ; 
		}
	    
	    document.addEventListener("hidekeyboard", onHide, false);
        document.addEventListener("showkeyboard", onShow, false);
	};
	
	function onHide() 
    {
        $("#footer").show();
    };

    function onShow() 
    {
        $("#footer").hide();
    };

	/*그리드 데이터를 조회한다.  */
	function Grid()
	{
		
		var jsonData='{"stMachine":' + "\""+ m_mcd 
					  + "\"," +"\""+ "strWorderNo"+"\":" + "\""+ m_worderno 
					  + "\"," + "strWipSeq:" + "\""+ m_wipseq + "\""
					+'}';
			$.ajax({
			url: m_dbpath + "PorductReturnToJson.aspx/js_QWorkResultSearch",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{
				dt_Table = data.d.mydt;
				$(makeControl(data.d.mydt));				
			},
			error:function(data) {
				dt_Table = null;
				//alert('접속오류');	
				navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
				}
			});
	};
	
	/*그리드의 특정 쿼터를 선택한다.  */
	function fn_Setting(){ 
		/*1. 작업중인 쿼터정보를 기준으로 그리드의 쿼터 리스트를 선택되도록 한다.  */		
		if(dt_Table == null)
			return;
		
		for(row in dt_Table)
			{
				//seq 값을 찾는다.
				if(dt_Table[row]["RESULTGBN"] == m_quartercd){
						//row 선택						
						//jQuery("#list4").setSelection(row, true);
						jQuery('#list4').jqGrid('setSelection', row , true); 
						jQuery("#list4").focus();
						return;
					}
			}
	};
	 

	//제큐 그리드 만들기
	function makeControl(dt)
	{ 
		var tgoodqty = 0;	//양품량
			Totalqty = 0;
	
			hisflag=0;
			jQuery("#list4").jqGrid({
			datatype: "local",
			colNames:['쿼터','양품량','히스토리','쿼터코드','양품량H','LOTNO','CNT'],
			colModel:[
				{name:'CODENAME',	index:'CODENAME', 	sorttype:"int",		width:50,	align:"center"},
				{name:'DISP_GOODQTY',	index:'DISP_GOODQTY',  	align : 'right',	width:55},
				{name:'WORKHISTORYNO',	index:'WORKHISTORYNO',	hidden:true},
				{name:'RESULTGBN',	index:'RESULTGBN',	hidden:true},
				{name:'GOODQTY',	index:'GOODQTY',	hidden:true},
				{name:'LOTNO',		index:'LOTNO',		hidden:true},
				{name:'CNT',		index:'CNT',		hidden:true}
			],			
			autowidth : true,
			editable :  false,
			sortable:   false,
			height: "100%",
			// 이 부분이 가장 중요 ( 설정해주지 않으면 데이터 순서를 읽지 못함 )
			//jsonReader : { repeatitems: false },
			loadComplete: function(data){
				//dt_Table = dt;
				fn_Setting();
			},
			onSelectRow: function(SEQ)
			{ 
				Setting();
			}
			}).navGrid('#list4',{add:false,del:false,edit:false,position:'right'});
			
			var Data = new Array();
			for(row in dt)
			{
				Data[row]={ CODENAME:dt[row]["CODENAME"]
						  , DISP_GOODQTY:dt[row]["DISP_GOODQTY"]
						  , WORKHISTORYNO:dt[row]["WORKHISTORYNO"]
				          , RESULTGBN:dt[row]["RESULTGBN"]
				          , GOODQTY:dt[row]["GOODQTY"]
						  , LOTNO:dt[row]["LOTNO"]
						  , CNT:dt[row]["CNT"]};
				
				Totalqty +=dt[row]["GOODQTY"];
				
				//alert(m_quartercd);
				
				if(m_quartercd == [row]["RESULTGBN"]){					
					m_goodqty = dt[row]["GOODQTY"];
					$("#goodqty")[0].innerHTML = m_goodqty + ' EA' ;
				}
				
				if(dt[row]["CNT"] == 0){
					window.localStorage["histno"] 		= '';
					window.localStorage["quartercd"]	= '';
					window.localStorage["lotno"]        = '';
					$("#quter")[0].innerHTML = '' ;
					$("#quterinfo")[0].innerHTML = '' ;
				}
				if(dt[row]["WORKHISTORYNO"] != "")
				{
					hisflag=hisflag+1;
				}
			}
			$("#total")[0].innerHTML = Totalqty  +' EA' ;			 
			
			var mydata = [Data];
			for(var i=0;i<=mydata.length;i++)
			{
				jQuery("#list4").jqGrid('addRowData',i+1,mydata[i]);
			}
			

			/* $(window).resize(function(){
				$("list4").setGridWidth($(this).width() * .100);
		    }); */
			
			
	};

	function Setting()
	{
		var id = jQuery("#list4").jqGrid('getGridParam','selrow');
		var ret = jQuery("#list4").jqGrid('getRowData',id);
		
		$("#qty").val(ret.GOODQTY);
		$("#quter")[0].innerHTML = ret.CODENAME ;
		m_selhistno = ret.WORKHISTORYNO;
		m_SelQuatercd = ret.RESULTGBN;
		m_SelLotno = ret.LOTNO;
		
		window.localStorage["histno"] 		= m_selhistno;
		window.localStorage["quartercd"]	= m_SelQuatercd;
		window.localStorage["lotno"]        = m_SelLotno;
		
		//작업지시번호, 지시번호
	};


	function Save()
	{		 
			var jsonData='{"strHistNo":' + "\""+ m_selhistno 
						  + "\"," +"\""+ "strLotNo"+"\":" + "\""+  m_SelLotno
						  + "\"," +"\""+ "strQty"+"\":" + "\""+ $("#qty").val()
						  + "\"," +"\""+ "strTime"+"\":" + "\""+  ""
						  + "\"," +"\""+ "strMachine"+"\":" + "\""+ m_mcd 
						  + "\"," +"\""+ "strWorderNo"+"\":" + "\""+ m_worderno
						  + "\"," +"\""+ "strWipSeq"+"\":" + "\""+ m_wipseq
						  + "\"," +"\""+ "strSeDtFlag"+"\":" + "\""+ dtflag  
						  + "\"," +"\""+ "strAutoTuipFlag"+"\":" + "\""+ m_autoWorkerReTuip   
						  + "\"," +"\""+ "strQuterCd"+"\":" + "\""+  m_SelQuatercd
						  + "\"," +"\""+ "strMainHistNo"+"\":" + "\""+  m_histno
						  + "\"," + "strEmpId:" + "\""+ m_empid + "\""
						  +'}';
			$.ajax({
			url: m_dbpath + "PorductReturnToJson.aspx/js_QWorkResult",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{ 
					fn_seccess(data.d); 
					//navigator.notification.alert("저장되었습니다.",fn_alertCallback, "알림","확인");
					jQuery("#list4").jqGrid('clearGridData');
					Grid();		
					fn_Setting();
					$("#qty").val(0);
			},
			error:function(data) {
				navigator.notification.alert("저장에 실패하였습니다.",fn_alertCallback, "알림","확인");
				}
			});
			
	};

	function fn_seccess(dt){
		//var txtMdf = document.frm1.name1.value.split(" ");
		 for (var row in dt.mydt) {
			 if(dt.mydt[row]["RESULTSTATUS"] == "OK"){
				 //fn_Back();
				 navigator.notification.alert("저장을 완료하였습니다.",fn_alertCallback, "알림","확인");
				 return;
			 }
			 
			 if(dt.mydt[row]["RESULTSTATUS"] == "FALSE"){
				// alert("저장을 실패하였습니다.");
				navigator.notification.alert("저장을 실패하였습니다.",fn_alertCallback, "알림","확인");
				 return;
			 }
		 }
		 return;
	};

	function Delete()
	{		 
			var jsonData='{"strHistNo":' + "\""+ m_selhistno 
						  + "\"," +"\""+ "strLotNo"+"\":" + "\""+  m_SelLotno
						  + "\"," +"\""+ "strMachine"+"\":" + "\""+  m_mcd
						  + "\"," +"\""+ "strWorderNo"+"\":" + "\""+ m_worderno
						  + "\"," + "strWipSeq:" + "\""+ m_wipseq + "\""
						  +'}';
			$.ajax({
			url: m_dbpath + "PorductReturnToJson.aspx/js_QWorkResultDel",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{
					navigator.notification.alert("삭제되었습니다.",fn_alertCallback, "알림","확인");
					jQuery("#list4").jqGrid('clearGridData');
					Grid();		
					fn_Setting();
					$("#qty").val(0);					
			},
			error:function(data) { 
				navigator.notification.alert("삭제를 실패하였습니다.",fn_alertCallback, "알림","확인");
				}
			});
			
	};
	 /*뒤로 버튼을 누르면 이전페이지로 되돌아 간다.  */
    function fn_Back() {
		if(hisflag > 0 && m_selhistno =="")
		{
			navigator.notification.alert("실적이 있는 쿼터를 선택하세요",fn_alertCallback, "알림","확인");
		}
		else
		{
			if( hisflag==0)
			{
				window.localStorage["actiongbn"] = "order";
			}
  			location.replace("./Main.html");
		}
    };
 
    function fn_Manual() {
        	location.replace("./help/WorkResult02Manual.html");
    };

	function fn_Tuto()
	{
		if(m_workFlag == "0" || m_workFlag == "" || m_workFlag==null)
		{//단일실적
			location.replace("./help/WorkResult01Tuto.html");
		}
		else if(m_workFlag == "1")
		{//쿼터실적
			location.replace("./help/WorkResult02Tuto.html");
		}
	}







//0) 컨트롤별 변수 선언하기

var data1,data2,data3, data4, data5, data6, data7, data8, data9, data10, data11,data12, data13;

var db;	
var sql = "";
var actiongbn = "";

var m_name, m_id,m_pass, m_empid, m_mcd, m_mname, m_workers;
var m_odrkey, m_workdate, m_partcode, m_partname, m_partspec, m_workqty;
var m_statusname, m_status, m_worderno, m_wipseq, m_lotno, m_histno, m_quarter, m_quartercd;
var m_autogoodqty, m_goodqty, m_badqty;

var m_center;			//작업공정
var m_workFlag;			//생산실적 입력방법
var m_workResultStart;	//실적 저장시 자동 재시작 구분
var m_autoWorkerReTuip;	//자동시작 시 이전작업자 자동 투입
var m_setimeManualInput; //작업의 시작/종료 시 시간의 수동입력
  
//window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
var m_dbpath = window.localStorage.getItem("dbpath"); 
//-----------------------------------------------------------------------------------------
window.localStorage["form"] = "main"; 
PhoneGap_init();

function PhoneGap_init() {   
        document.addEventListener("deviceready", onDeviceReady, false);
};
 
function onDeviceReady() {	 
    BackButton();
}; 

function BackButton(){
   document.addEventListener("backbutton", onBackButton, true);  
};  

 
/*프로그램 종료  */
function fn_Exit()
{ 	
	navigator.notification.confirm("프로그램을 종료하시겠습니까?"
			  , fn_confirmCallback_Exit
			  , "종료"
			  , "아니오,예");		    
};

function onBackButton(){
	navigator.notification.confirm("프로그램을 종료하시겠습니까?"
			  , fn_confirmCallback_Exit
			  , "종료"
			  , "아니오,예");
};

function fn_confirmCallback_Exit(button){
		if(button == 2)
			navigator.app.exitApp();
} ;

function fn_alertCallback(){};	

 
//-----------------------------------------------------------------------------------------
window.onload = function(){ 	
	fn_Init();	
	//fn_ListViewTitle();

};
		
function fn_Init(){ 		
	
	// data1 = document.getElementById("div_content").document.getElementById("d_data0").document.getElementById("data0").document.getElementById("tddata1");
	// alert(data1.innerHTML);

	 //alert($("#tddata1")[0].innerHTML); 	 
	//=> 위 두가지 유형이 동일한 값 가져옴.
	//alert($("#tddata1")[0].innerHTML);
		
	m_name    	= window.localStorage.getItem("name");
	m_id   		= window.localStorage.getItem("id");
	m_pass   	= window.localStorage.getItem("pass");	
	m_empid   	= window.localStorage.getItem("empid");
	
	m_mcd       = window.localStorage.getItem("mcd");
	m_mname     = window.localStorage.getItem("mname");
	actiongbn   = window.localStorage.getItem("actiongbn");
	
	m_center	= window.localStorage.getItem("center");//작업공정
	m_workFlag	= window.localStorage.getItem("workflag");//생산실적 입력방법
	m_workResultStart	= window.localStorage.getItem("workresultstart");//실적 저장시 자동 재시작 구분
	m_autoWorkerReTuip	= window.localStorage.getItem("autoworkerretuip");//자동시작 시 이전작업자 자동 투입
	
	m_center = '100';
	/*0: 	단일실적 입력 (실적 입력화면에서 실적내역을 조회하여 보여준다.)
	  1:	쿼터별 실적 입력(입력되는 실적을 입력한다.)	  */
	m_workFlag = '0';
	/*0:실적 저장만 진행, 1:실적 저장 시 자동 작업 종료 및 재시작)  */
	m_workResultStart = '0';
	/*0:실적 저장 시 작업자 미투입(자동), 1:실적 저장 시 자동 작업 종료 및 재시작 의 경우 기존 작업자 자동 투입  */ 
	m_autoWorkerReTuip = '0';
	/*0: 작업 시작/종료시 자동 종료, 1:작업 시작/종료 시 수동입력 종료  */
	m_setimeManualInput = '0';
 	
	m_odrkey = window.localStorage.getItem("odrkey");
	m_workdate = window.localStorage.getItem("workdate");
	m_partcode = window.localStorage.getItem("partcode");
	m_partname = window.localStorage.getItem("partname");
	m_partspec = window.localStorage.getItem("partspec");
	m_workqty = window.localStorage.getItem("workqty");
	m_statusname = window.localStorage.getItem("statusname");
	m_status = window.localStorage.getItem("status");
	m_worderno = window.localStorage.getItem("worderno");
	m_wipseq = window.localStorage.getItem("wipseq"); 
	
	m_lotno = window.localStorage.getItem("lotno");
	m_histno = window.localStorage.getItem("histno");
	m_workers = window.localStorage.getItem("workers");
	m_autogoodqty = window.localStorage.getItem("autogoodqty");
	m_goodqty = window.localStorage.getItem("goodqty");
	m_badqty = window.localStorage.getItem("badqty");
	m_quarter = window.localStorage.getItem("quarter");
	m_quartercd = window.localStorage.getItem("quartercd");

	
	data1 = $("#tddata1")[0]; //설비명	
	data2 = $("#tddata2")[0]; //품목코드
	data3 = $("#tddata3")[0]; //품목명
	data4 = $("#tddata4")[0]; //규격
	data5 = $("#tddata5")[0]; //지시량
	data6 = $("#tddata6")[0]; //시작시간
	data7 = $("#tddata7")[0]; //작업자
	data8 = $("#tddata8")[0]; //상태
	
	data9 = $("#tddata9")[0]; //생산량
	data10 = $("#tddata10")[0]; //양품량
	data11 = $("#tddata11")[0]; //불량량
	data12 = $("#tddata12")[0]; //지시번호
	data13 = $("#tddata13")[0]; //quarter
	
	//1) 컨트롤 초기화
	fn_CtlInit();
	//alert(m_id + "," + m_pass + "," + m_empid + "," + m_name + "," + m_mcd + "," + m_mname );
 	
	if(actiongbn != "order"){
		//2) 데이터 조회
		fn_GetWorkData();	
	}
};

function fn_CtlInit()
{
	//1) 컨트롤 초기화
	if(m_mcd == '' || m_mcd == 'undefined'){
		data1.innerHTML = "";
		data2.innerHTML = "";
		data3.innerHTML = "";
		data4.innerHTML = "";
		data5.innerHTML = "";
		data6.innerHTML = "";
		data7.innerHTML = "";
		data8.innerHTML = "";
		
		data9.innerHTML = "0";
		data10.innerHTML = "0";
		data11.innerHTML = "0"; 
		data12.innerHTML = "";		
		data13.innerHTML = "";
	}
	else{		
		data1.innerHTML = m_mname;
		data2.innerHTML = m_partcode;
		data3.innerHTML = m_partname;
		data4.innerHTML = m_partspec;
		data5.innerHTML = m_workqty;
		data6.innerHTML = m_workdate;
		data7.innerHTML = m_workers;
		data8.innerHTML = m_statusname;
		
		data9.innerHTML = m_autogoodqty;
		data10.innerHTML = m_goodqty;
		data11.innerHTML = m_badqty; 
		data12.innerHTML = m_worderno;
		data13.innerHTML = m_quarter;
		}
};

function fn_AllClear(){
	//data1.innerHTML = "";
	data2.innerHTML = "";
	data3.innerHTML = "";
	data4.innerHTML = "";
	data5.innerHTML = "";
	data6.innerHTML = "";
	data7.innerHTML = "";
	data8.innerHTML = "";
	
	data9.innerHTML = "0";
	data10.innerHTML = "0";
	data11.innerHTML = "0"; 
	data12.innerHTML = "";
	data13.innerHTML = "";
	
	window.localStorage["odrkey"] 		= "";
	window.localStorage["workdate"] 	= "";
	window.localStorage["partcode"] 	= "";
	window.localStorage["partname"] 	= "";
	window.localStorage["partspec"] 	= "";
	window.localStorage["workqty"] 		= "";
	window.localStorage["statusname"] 	= "";
	window.localStorage["status"] 		= "";
	window.localStorage["worderno"] 	= "";
	window.localStorage["wipseq"] 		= "";
	window.localStorage["lotno"] 		= ""; 
	window.localStorage["histno"] 		= "";
	window.localStorage["workers"] 		= "";

	window.localStorage["autogoodqty"] 	= "0";
	window.localStorage["goodqty"] 		= "0";
	window.localStorage["badqty"] 		= "0"; 
	window.localStorage["quarter"]		= "";
	window.localStorage["quartercd"]		= "";
	$("#img_status")[0].src='./images/led_Gray48.png';
	
	//$("#btn_job1")[0].innerHTML = "작업시작";
	 
	m_lotno = "";
	m_histno = "";
	m_workers = "";	 
	m_odrkey = "";
	m_workdate = ""; 
	m_partcode = "";
	m_partname = "";
	m_partspec = "";
	m_workqty = ""
	m_statusname = "";
	m_status = "";
	m_worderno = "";
	m_wipseq = ""; 
	m_autogoodqty = "0";
	m_goodqty = "0";
	m_badqty = "0";
	m_quarter = "";
	m_quartercd = "";
	
};
    
/*프로그램 종료  */
/* function fn_Exit(){
			navigator.notification.confirm('프로그램을 종료하시겠습니까?'
					,fn_Quit,
					'종료',
					'예,아니오');			    
		};
function fn_Quit(){
	 navigator.app.exitApp();	
} */
//////////////////////////////설비 선택////////////////////////
function fn_Machine(){
	window.localStorage["actiongbn"] = "machine";
	 //$.mobile.changePage($(document.location.href="./Machine.html"), {transition:"slide", reverse:false, changeHash:false} );
	/* $.mobile.changePage("./Machine.html",{
				transition:"slide",
				reverse: false,
				changeHash: true
				} 
			); */
	
	//$.mobile.changePage($(document.location.href="./Machine.html"), {transition:"slide",reverse:false, changeHash:true} );
	location.replace("./Machine.html");			
};

//////////////////////////////작업지시 선택////////////////////////
function fn_Worders(){
	if(m_mcd == '' || m_mcd == 'undefined')
		{
			//alert("설비를 선택하세요.");
			navigator.notification.alert("설비를 선택하세요.",fn_alertCallback, "알림","확인");
			return;
		}	
	window.localStorage["actiongbn"] = "order";	
	location.replace("./Orders.html"); 
};

//////////////////////////////작업시작////////////////////////
function fn_WorkStartStop(){
	//var btn_Job = document.getElementId("btn_job");
	if(data3.innerHTML == '' || data3.innerHTML == 'undefined')
		{
			//alert("작업지시를 선택하세요.");
			navigator.notification.alert("작업지시를 선택하세요.",fn_alertCallback, "알림","확인");
			return;
		}
	
	window.localStorage["actiongbn"] = "startstop";
	
	if(data8.innerHTML == '' || data8.innerHTML == '대기' || data8.innerHTML == '등록'|| data8.innerHTML == 'undefined'){
		//작업시작
		if(m_setimeManualInput == '1'){
			location.replace("./StartStopTime.html");
			return;
		}
		
		//if (confirm("작업을시작하시겠습니까?") == false)
		//	return ;			
		//else		 
		//	fn_Start(m_mcd, m_worderno, m_wipseq, m_setimeManualInput, "");
		
		navigator.notification.confirm("작업을시작하시겠습니까?"
				  , fn_Callback_Start
				  , "작업시작"
				  , "아니오,예");
	}
	else{
		//작업종료
		if(m_setimeManualInput == '1'){
			location.replace("./StartStopTime.html");
			return;
		}
		
		//if (confirm("작업을 종료하시겠습니까?") == false)
		//		return ;			
		//else
		//	fn_End(m_mcd, m_worderno, m_wipseq, m_setimeManualInput, "",m_histno, m_lotno); 
		
		navigator.notification.confirm("작업을 종료하시겠습니까?"
				  , fn_Callback_End
				  , "작업종료"
				  , "아니오,예");
	}
	
	//데이터 기록 및 상태 변경
	//location.replace("./StartStopResult.html"); 
};

function fn_Callback_Start(button){
	if(button == 2)
		fn_Start(m_mcd, m_worderno, m_wipseq, m_setimeManualInput, "");
};

function fn_Callback_End(button){
	if(button == 2)
		fn_End(m_mcd, m_worderno, m_wipseq, m_setimeManualInput, "",m_histno, m_lotno); 
};
/*작업 종료 */
function fn_End(mcd, worderno, wipseq, sedtflag, setime, histno, lotno){
	json_param ='{"strMachine":' + "\""+ mcd 		+ "\"," 
		        + "strWorderNo:" + "\""+ worderno 	+ "\","
		        + "strWipSeq:"   + "\""+ wipseq 	+ "\"," 
		        + "strSeDtFlag:" + "\""+ sedtflag 	+ "\","
		        + "strSe_time:"  + "\""+ setime 	+ "\"," 
		        + "strHistno:"   + "\""+ histno 	+ "\"," 
		        + "strLotno:"    + "\""+ lotno 		+ "\"" +'}';
	$.ajax({
	url: m_dbpath + "PorductReturnToJson.aspx/js_WorkEnd",
	contentType:"Application/json; charset=utf-8",
	dataType:"json",
	data:json_param,
	type:"POST",
	success:function(data)
		{
		    if(data.d.mydt[0]["FLAG"] == 'OK') 
				fn_AllClear();
		    else{
		    	//alert("작업을 종료하지 못했습니다.");
		    	navigator.notification.alert("작업을 종료하지 못했습니다.",fn_alertCallback, "알림","확인");
		    }
			return;		 
		},
	error:function(data) {
			//alert('네트워크 상에 문제가 발생되었습니다.');
			navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
		}
	}); 	
};

/*작업 시작  */
function fn_Start(mcd,worderno,wipseq,sedtflag,setime){
	json_param ='{"strMachine":' + "\""+ mcd 		+ "\"," 
		        + "strWorderNo:" + "\""+ worderno 	+ "\","
		        + "strWipSeq:" 	 + "\""+ wipseq 	+ "\"," 
		        + "strSeDtFlag:" + "\""+ sedtflag 	+ "\"," 
		        + "strSe_time:"  + "\""+ setime	 	+ "\"" +'}';
	$.ajax({
	url: m_dbpath + "PorductReturnToJson.aspx/js_workstart",
	contentType:"Application/json; charset=utf-8",
	dataType:"json",
	data:json_param,
	type:"POST",
	success:function(data)
	{
		fn_SetData(data);
		
		return;		 
	},
	error:function(data) {
		//alert('네트워크 상에 문제가 발생되었습니다.');
		navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
		fn_CtlInit();
	}
	}); 
};


//////////////////////////////작업자 투입////////////////////////
function fn_Worker(){
	if(m_histno == '' || m_histno == 'undefined')
	{
		//alert("작업을 시작하세요.");
		navigator.notification.alert("작업을 시작하세요.",fn_alertCallback, "알림","확인");
		return;
	}
	
	//작업자 투입화면 이동
	/* $.mobile.changePage("./Worker.html",{
		transition:"slide",
		reverse: false,
		changeHash: true
		} 
	); */
	window.localStorage["actiongbn"] = "worker";
	location.replace("./Worker.html"); 
}
//////////////////////////////생산실적 등록////////////////////////
function fn_WorkResult(){
	if(m_histno == '' || m_histno == 'undefined')
	{
		//alert("작업을 시작하세요.");
		navigator.notification.alert("작업을 시작하세요.",fn_alertCallback, "알림","확인");
		return;
	}
	window.localStorage["actiongbn"] = "workresult";
	//작업실적 입력화면으로 이동
	if(m_workFlag == "0"){//단일실적
		location.replace("./WorkResult01.html");
	}
	else if(m_workFlag == "1"){//쿼터실적
		location.replace("./WorkResult02.html");
	}
};
//////////////////////////////불량실적 등록////////////////////////
function fn_BadResult(){
	if(m_histno == '' || m_histno == 'undefined')
	{
		//alert("작업을 시작하세요.");
		navigator.notification.alert("작업을 시작하세요.",fn_alertCallback, "알림","확인");
		return;
	}
	
	//불량실적 등록화면 이동
	/* $.mobile.changePage("./BadResult.html",{
		transition:"slide",
		reverse: false,
		changeHash: true
		} 
	); */
	window.localStorage["actiongbn"] ="badresult"; 
	location.replace("./BadResult.html"); 
};
 
//////////////////////////////비가동 실적 등록////////////////////////
function fn_StopResult(){
	if(m_histno == '' || m_histno == 'undefined')
	{
		//alert("작업을 시작하세요.");
		navigator.notification.alert("작업을 시작하세요.",fn_alertCallback, "알림","확인");
		return;
	}
	
	// 비가동실적 등록화면 이동
	/* $.mobile.changePage("./StopResult.html",{
		transition:"slide",
		reverse: false,
		changeHash: true
		} 
	); */
	window.localStorage["actiongbn"] ="stopresult"; 
	location.replace("./StopResult.html"); 
};

//////////////////////////////데이터 조회////////////////////////
function fn_GetWorkData()
{			//var btn_Job = document.getElementById("btn_job");	 	
			var json_param = '';	
			
			if(m_mcd =='undefined' || m_mcd == 'null')
				m_mcd='';
			
			if(m_empid == 'undefined')
				m_empid = window.localStorage.getItem("empid");
			 if(m_mcd == '')
				{
				  //alert("설비를 선택하세요.");
				  //navigator.notification.alert("설비를 선택하세요.",alertCallback, "알림","확인");
				  return;
				} 
		$(document).ready(function()
		{	 
			
			json_param ='{"machine":' 	+ "\"" + m_mcd 		+ "\"," 
			            + "empid:" 	    + "\"" + m_empid 	+ "\","				
				        + "histno:" 	+ "\"" + m_histno 	+ "\"" +'}';
			$.ajax({
			url: m_dbpath + "PorductReturnToJson.aspx/workinfo",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:json_param,
			type:"POST",
			success:function(data)
			{						
				$(fn_SetData(data.d.mydt));
				return;				 
			},
			error:function(data) {
				//alert('네트워크 상에 문제가 발생되었습니다.');
				navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
				fn_CtlInit();
			}
			});
		});	 
};

/*데이터 변수보관, 화면셋팅, 메모리변수에 보관  */
function fn_SetData(dt){
	fn_AllClear();
	
	  for (var row in dt) {	
			m_histno 		=  dt[0]["WORKHISTORYNO"];
			m_lotno			=  dt[0]["LOTNO"];
			m_partcode 		=  dt[0]["PARTCODE"];
			m_partname		=  dt[0]["PARTNAME"];
			m_partspec		=  dt[0]["SPEC"];
			m_workqty		=  dt[0]["WORKQTY"];
			m_workdate		=  dt[0]["SDATE"];
			m_workers		=  dt[0]["WORKERS"];
			m_status		=  dt[0]["WORK_STATUS"];
			m_statusname	=  dt[0]["STATUS"];
			m_autogoodqty	=  dt[0]["AUTOGOODQTY"];
			m_goodqty		=  dt[0]["GOODQTY"];
			m_badqty		=  dt[0]["BADQTY"];		
			m_worderno      =  dt[0]["WORDERNO"];
			m_wipseq		=  dt[0]["WIPSEQ"];
			m_quarter		=  dt[0]["TIMENAME"];
			m_quartercd		=  dt[0]["WTIMEID"];
			
			data1.innerHTML = m_mname
			data2.innerHTML = m_partcode;
			data3.innerHTML = m_partname;
			data4.innerHTML = m_partspec;
			data5.innerHTML = m_workqty;
			data6.innerHTML = m_workdate;
			data7.innerHTML = m_workers;
			data8.innerHTML = m_statusname;				
			data9.innerHTML = m_autogoodqty;
			data10.innerHTML = m_goodqty;
			data11.innerHTML = m_badqty;
			data12.innerHTML = m_worderno
		 	data13.innerHTML = m_quarter
			
			window.localStorage["histno"] 		= m_histno;
			window.localStorage["lotno"] 		= m_lotno; 
			window.localStorage["partcode"]		= m_partcode;
			window.localStorage["partname"] 	= m_partname;
			window.localStorage["partspec"] 	= m_partspec;
			window.localStorage["workqty"] 		= m_workqty;
			window.localStorage["workdate"] 	= m_workdate;				
			window.localStorage["workers"] 		= m_workers;
			window.localStorage["status"] 		= m_status;
			window.localStorage["statusname"] 	= m_statusname;
			window.localStorage["autogoodqty"] 	= m_autogoodqty;
			window.localStorage["goodqty"] 		= m_goodqty;
			window.localStorage["badqty"] 		= m_badqty;	
			window.localStorage["worderno"]     = m_worderno;
			window.localStorage["wipseq"]		= m_wipseq
			
			window.localStorage["quarter"]		= m_quarter
			window.localStorage["quartercd"]	= m_quartercd
			
			$("#img_status")[0].src='./images/led_Green48.png';
	  };
}
 
		















		jQuery.extend(jQuery.mobile.datebox.prototype.options, {
			useNewStyle: true
		});	
	
    var m_empid, 	m_mcd, 		m_center;	//조회주건	
    var m_workqty, 	m_sdate,   	m_odrkey,	m_partcode, 	m_partname, m_partspec;; 
    var m_workers, 	m_status, 	m_statusname;
    var m_worderno, m_wipseq,   m_form;
    /*Array List 객체 선언*/
   // var List = new aryList();
    
   m_empid 	= window.localStorage["empid"];
    /*m_mcd 		= window.localStorage["mcd"];
    m_mname 	= window.localStorage["mname"];
    m_statusname = window.localStorage["statusname"];
    m_form = window.localStorage["form"] ;
    m_center    = window.localStorage["center"];
    window.localStorage["actiongbn"]="";*/
    
   //m_empid = 'ADMIN';
   // m_cd = 'A01';
   //alert (m_empid);
   
 	window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
    var m_dbpath = window.localStorage.getItem("dbpath"); 
	
	var m_workFlag	= window.localStorage.getItem("workflag");//생산실적 입력방법
	window.localStorage["pagename"] = "WorkhistoryView.html";
		
	//var m_dbpath = 'http://121.78.112.176:222/T_POP/';
	var m_screenWidth = screen.availWidth ;
	var m_radioflag;

    document.addEventListener("deviceready", onStart, false);
    function onStart() {       
    	document.addEventListener("backbutton", onBackButton, true);

		$(document).ready(function()
		{	
			fn_Timeset();
			var Data='{"strEmpid":' +"\"" +m_empid+"\""+ '}';
			$.ajax({
			url: m_dbpath + "WorkhistoryView.aspx/js_machine",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:Data,
			type:"POST",
			success:function(data)
			{
				$(makeOption(data.d.mydt));
			},
			error:function(data) {
				//alert('접속오류');
				navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
				}
			});
		});
    };
	
	
	window.onload = function()
	{
		m_radioflag = $("#radio1").val();
	   	$("input[type='radio']").bind( "change", function(event, ui) {
				//alert($(this).val());
				m_radioflag = $(this).val();
		});
	}

    function fn_Timeset()
	{
		//2134010  a03 20130403132122 01
		var now = new Date(); 
		var mm = (now.getMonth()+1)+"";
		var dd = now.getDate();
		if(parseInt(mm) < 10)
		{
			mm= "0" + mm;
		}
		else
		{
			mm =mm;
		}
		if(parseInt(dd) < 10)
		{
			dd= "0" + dd;
		}
		else
		{
			dd = dd;
		}
		$('#sdate').trigger('datebox', {'method':'set', 'value':(now.getFullYear()+'-'+mm+'-'+dd)});
	};

	//옵션 컨트롤
	function makeOption(dt)
	{
		for (var row in dt)
		{
			option = document.createElement( "option" );
			option.value = dt[row]["MACHINEID"];
			option.innerText = dt[row]["MACHINENAME"];
			$("#com").append(option);

		}
		
	   $("#com")[0].selectedIndex = 0;
	   $("#com").selectmenu("refresh");
	  // $('#com').submit();
	};

	function fn_Search()
	{
		  json_param = '{"strEmpid":' + "\"" + m_empid + "\"," 
            	       + "strWorkdate:" + "\"" + $("#sdate").val().replace("-","").replace("-","") + "\"," 
					   + "strflag:" + "\"" + m_radioflag + "\"," 
            	       + "strMachine:" + "\"" + $("#com").val() + "\"" + '}';

            $.ajax({
                url: m_dbpath + "WorkhistoryView.aspx/js_Select",
                contentType: "Application/json; charset=utf-8",
                dataType: "json",
                data: json_param,
                type: "POST",
                success: function(data) {
                    fn_List(data.d.mydt); 
                },
                error: function(data) {
                	//alert('네트워크 상에 문제가 발생되었습니다.');
                	navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
                	}
            });
	};

	function fn_List(dt)
	{
		 var strTemp, icnt, strSpace, strSpace1;
        icnt = 0;
        
        $("#listview li").remove();
		 for (var row in dt) {
            var li = document.createElement("li");
            $("#listview").append(li);
            icnt = icnt + 1
			//alert( dt[row]["WORDERNO"] + dt[row]["CENTERNAME"] );
			strSpace = "&nbsp;&nbsp;";
            strSpace1 = "&nbsp;&nbsp;";
            iLoop = 10 - dt[row]["GOODQTY"].length;
            for(var i=0; i <= iLoop; i++){
            	strSpace = strSpace + "&nbsp;";
            }
            
            iLoop = 10 - dt[row]["BADQTY"].length;
            for(var i=0; i <= iLoop; i++){
            	strSpace1 = strSpace1 + "&nbsp;";
            }

			if(m_screenWidth>330)
			{
				strTemp =  "<a  style='padding: 0px 0px 0px 15px;'  data-theme='e'>"
						  +" <h3>지시번호 : "
						  +  dt[row]["WORDERNO"] +" ("+ dt[row]["CENTERNAME"] +")" +"</h3>"
						  +" <p class='li_clm'>설 비 명 &nbsp : " + dt[row]["MACHINENAME"] +"</p>"
						  +" <p class='li_clm'>품 목 명 &nbsp : " + dt[row]["PARTNAME"] +"</p>"
						  +" <p class='li_clm'>작업시간 : " + dt[row]["SDATE"] + "~" + dt[row]["EDATE"] + "</p>"
						  +" <p class='li_clm'>지시수량 : " + dt[row]["WORKQTY"] + strSpace 
						  + " 양품량 : " +  dt[row]["GOODQTY"] + strSpace1 
						  + " 불량량 : " + dt[row]["BADQTY"] +"</p>"
						  +" <p class='li_clm'>작업상태 : " + dt[row]["WSTATUS"] +"</p>"
						  +" </a>";
			}
			else
			{
				strTemp =  "<a>"
						  +" <h3>지시번호 : "
						  +  dt[row]["WORDERNO"] +" ("+ dt[row]["CENTERNAME"] +")" +"</h3>"
						  +" <p class='li_clm'>설 비 명 &nbsp : " + dt[row]["MACHINENAME"] +"</p>"
						  +" <p class='li_clm'>품 목 명 &nbsp : " + dt[row]["PARTNAME"] +"</p>"
						  +" <p class='li_clm'>작업시간 : " + dt[row]["SDATE"] + "~" + dt[row]["EDATE"] + "</p>"
						  +" <p class='li_clm'>지시수량 : " + dt[row]["WORKQTY"] +"</p>"
						  +" <p class='li_clm'>양품량 : " +  dt[row]["GOODQTY"] + strSpace1 
						  +" 불량량 : " + dt[row]["BADQTY"] +"</p>"
						  +" <p class='li_clm'>작업상태 : " + dt[row]["WSTATUS"] +"</p>"
						  +" </a>";

			}
			
            //list에 링크 유동적으로 추가
			if(dt[row]["WSTATUS"] == "완료")
			{
				li.setAttribute("data-theme","a");
			}
			else if(dt[row]["WSTATUS"] == "대기")
			{
				//li.setAttribute("data-theme","b");
			}
			else if(dt[row]["WSTATUS"] == "진행중")
			{
				li.setAttribute("data-theme","e");
			}
			else
			{
				li.setAttribute("data-theme","c");
			}
            $(li).append(strTemp);
            $("#listview").listview("refresh");

        }
        
        //alert(icnt);
        if(icnt == 0) 
        	navigator.notification.alert("조회결과가 없습니다.",fn_alertCallback, "알림","확인");
	};

	



    function onBackButton(){
    	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
    			  , fn_confirmCallback_Exit
    			  , "이동"
    			  , "아니오,예");
    };

    function fn_confirmCallback_Exit(button){
    		if(button == 2)
    			fn_Back();
    			//navigator.app.exitApp();
    } ;

    function fn_alertCallback(){};	


    /*뒤로 버튼을 누르면 이전페이지로 되돌아 간다.  */
    function fn_Back() {
        	location.replace("./MenuSearch.html");
    };

    function fn_Manual() {
        	location.replace("./help/WorkhistoryViewManual.html");
    };

	function fn_Tuto()
	{
		if(m_workFlag == "0" || m_workFlag == "" || m_workFlag==null)
		{//단일실적
			location.replace("./help/WorkResult01Tuto.html");
		}
		else if(m_workFlag == "1")
		{//쿼터실적
			location.replace("./help/WorkResult02Tuto.html");
		}
	};
    














			jQuery.extend(jQuery.mobile.datebox.prototype.options, {
			useNewStyle: true
		});				
	window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
	var m_dbpath = window.localStorage.getItem("dbpath"); 

	var machineid =  ""
	var workhistoryno = "";
	var mname = "";

	var partname = window.localStorage.getItem("partname");		
	var m_workFlag	= window.localStorage.getItem("workflag");//생산실적 입력방법
	window.localStorage["pagename"] = "CraimMachine.html";

	var m_id   		= window.localStorage.getItem("empid");
	//var workhistoryno = "20111004A040001";
	//var machineid = "A04";
	//var m_id = "ADMIN";
	
	var cdtl = new Array();
	var Crno = "" ;
	var SaveFlag="0";

	var pictureSource;
	var destinationType;
	var imageURI;
	var picid ;
	var picturecnt = 0;
	var viewflag = 0;


	var curdate;
	var curtime
	var datenow;
	
	datenow = new Date();
    curdate = getDateStrFromDateObject(datenow);
	curtime = getTimeStrFromDateObject(datenow);

    document.addEventListener("deviceready", onStart, false);
    function onStart() {   
    	document.addEventListener("backbutton", onBackButton, true);
		pictureSource = navigator.camera.PitureSourceType;
		destinationType = navigator.camera.DestinationType;
    	};
    

        function onBackButton(){
			
			if(viewflag==0)
			{
        		navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
        				  , fn_confirmCallback_Exit
        				  , "이동"
        				  , "아니오,예");
			}
			if(viewflag==2)
			{
				//jQuery('#dialog').dialog().dialog('close');
				jQuery('#dialog').dialog().dialog('close');
				//$('#dialog').close(); 
				viewflag=0;
				Cancle();
			}
			if(viewflag==1)
			{	
				viewflag=0;
				jQuery('#dialog1').dialog().dialog('close');			
			}
        };

        function fn_confirmCallback_Exit(button){
        		if(button == 2)
        			fn_Back();
        } ;

        function fn_alertCallback(){};	

        /*로딩 시작  */
        function fn_ShowLoading(){
		    	$.mobile.showPageLoadingMsg( "a", "Loading...", false );
        	    //$.mobile.showPageLoadingMsg();
			};
		/*로딩 종료  */	
		function fn_HideLoading(){
				$.mobile.hidePageLoadingMsg(); 
			};
		           	
    	
	window.onload = function()
	{
		//$("#img0")[0].innerHTML = "asdf";
		//fn_ShowLoading();
		$(document).ready(function()
		{
		   var Data='{"strEmpid":' +"\"" +m_id+"\""+ '}';
			$.ajax({
			url: m_dbpath + "CraimMachine.aspx/js_machine",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:Data,
			type:"POST",
			success:function(data)
			{
				$(makeMachine(data.d.mydt));
			},
			error:function(data) {
				//alert('접속오류');
				navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
				}
			});

			Init("start");

			 $('#com').change(function()
			 {
				 $("#detail")[0].innerHTML = cdtl[$("#com")[0].selectedIndex];
			 });
			 $('#machine').change(function()
			 {
				 machineid = $("#machine").val();
				 mname = $("#machine").text;
				 Setpicid();
				 Grid();
			 });				 
		});
		
		$('#sdate').trigger('datebox', {'method':'set', 'value':curdate});
		$('#stime').trigger('datebox', {'method':'set', 'value':curtime});

		fn_HideLoading();
	}
	
	//옵션 컨트롤
	function makeMachine(dt)
	{
		for (var row in dt)
		{
			option = document.createElement( "option" );
			option.value = dt[row]["MACHINEID"];
			option.innerText = dt[row]["MACHINENAME"];
			$("#machine").append(option);

		}
		
	   $("#machine")[0].selectedIndex = 0;
	   $("#machine").selectmenu("refresh");
	  // $('#com').submit();
	};

	function Init(flag)
	{
			var Data= '{"ID":' + "\""+ m_id + "\"," + "flag:" + "\""+ flag + "\"" +'}'
			$.ajax({
			url:m_dbpath + "CraimMachine.aspx/init",
			//"http://121.78.112.176:222/T_POP/Craim.aspx/init",
			//m_dbpath + "Craim.aspx/init",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:Data,
			type:"POST",
			success:function(data)
			{
				$(makeOption(data.d.mydt));
			},
			error:function(data) {
				//alert('접속오류');
				navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
				}
			});
	}

	function Setpicid()
	{
		//2134010  a03 20130403132122 01
		var now = new Date(); 
		var mm = (now.getMonth()+1)+"";
		var h=now.getHours()+"";
		var m=now.getMinutes()+"";
		var s=now.getSeconds()+""; 
		if(parseInt(mm) < 10)
		{
			mm= "0" + mm;
		}
		else
		{
			mm =mm;
		}
		if(parseInt(h) < 10)
		{
			h= "0" + h;
		}
		else
		{
			h =h;
		}
		if(parseInt(m) < 10)
		{
			m= "0" + m;
		}
		else
		{
			m =m;
		}
		if(parseInt(s) < 10)
		{
			s= "0" + s;
		}
		else
		{
			s =s;
		}

		picid = now.getFullYear() + "" + mm + "" + now.getDate() + "" + h+ "" + m + "" + s + machineid + m_id;
	}

	function Grid()
	{
		jQuery("#list4").jqGrid('clearGridData');
		var jsonData= '{"workhistoryno":' + "\""+ workhistoryno 
						+ "\"," +"\""+ "machineid"+"\":" + "\""+ machineid 
						+ "\"," + "id:" + "\""+ m_id + "\""
						+'}'
		
			$.ajax({
			url:m_dbpath+"CraimMachine.aspx/js_craimresult",
				//"http://121.78.112.176:222/T_POP/Craim.aspx/js_craimresult",
			//m_dbpath + "Craim.aspx/craimresult",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{
				$(makeControl(data.d.mydt));
			},
			error:function(data) {
				//alert('접속오류111');
				navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
				}
			});
	}

	//옵션 컨트롤
	function makeOption(dt)
	{
		$('#com')[0].options.length = 0;
		for (var row in dt)
		{
			//stringmem=dt[row]["MEMSHTNAME"];
			option = document.createElement( "option" );
			option.value = dt[row]["CRAIMCODE"];
			option.innerText = dt[row]["CRAIMNAME"];
			cdtl[row] = dt[row]["CRAIMDETAIL"]
			$("#com").append(option);

		}
		
	   $("#com")[0].selectedIndex =  -1;
	   $("#com").selectmenu("refresh");
	  // $('#com').submit();
	}

	//제큐 그리드 만들기
	function makeControl(dt)
	{//alert('d.');
			
			jQuery("#list4").jqGrid({
			datatype: "local",
			colNames:['사고번호','사유','발생일시','클레임코드','상세','메모','설비'],
			colModel:[
				{name:'CLEAIMNO',index:'CLEAIMNO', sorttype:"int",width:45,align:"center"},
				{name:'CRAIMNAME',index:'CRAIMNAME',width:65},
				{name:'IDT',index:'IDT',  align : 'center',width:60},
				{name:'CRAIMCODE',index:'CRAIMCODE',hidden:true},
				{name:'CRAIMDETAIL',index:'CRAIMDETAIL',hidden:true},
				{name:'MEMO',index:'MEMO',hidden:true},
				{name:'MACHINENAME',index:'MACHINENAME',hidden:true}
			],
			//multiselect: true,
			//viewrecords: true,
			autowidth : true,
			height: "100%",
			onSelectRow: function(CLEAIMNO)
			{ 
				Setting();
			}//,
			//caption: "비가동실적관리"

			}).navGrid('#list4',{add:false,del:false,edit:false,position:'right'}); 

			var Data = new Array();
			for(row in dt)
			{
				Data[row]={CLEAIMNO:dt[row]["CLEAIMNO"],CRAIMNAME:dt[row]["CRAIMNAME"],IDT:dt[row]["IDT"],
				CRAIMCODE:dt[row]["CRAIMCODE"],CRAIMDETAIL:dt[row]["CRAIMDETAIL"],MEMO:dt[row]["MEMO"],MACHINENAME:dt[row]["MACHINENAME"]};
			}

			var mydata = [Data];
			for(var i=0;i<=mydata.length;i++)
			{
				jQuery("#list4").jqGrid('addRowData',i+1,mydata[i]);
			}
			//jQuery("#list4").hideCol("BADCODE");
	}

	function Setting()
	{
		$("#stats")[0].innerHTML="수정";
		SaveFlag="1";
		var id = jQuery("#list4").jqGrid('getGridParam','selrow');
		var ret = jQuery("#list4").jqGrid('getRowData',id);
		var IDT = ret.IDT.split(" ");
		$('#sdate').trigger('datebox', {'method':'set', 'value':(IDT[0])});
		$('#stime').trigger('datebox', {'method':'set', 'value':IDT[1]});
		$('#test').val(ret.CRAIMDETAIL);
		//alert($("#sdate").val());
		//alert($("#stime").val());
		//$("#bad").val((ret.QTY.replace(/\s+/, '')));
		$("#com").val(ret.CRAIMCODE); 
		$("#com").selectmenu('refresh');
		$("#detail")[0].innerHTML = ret.CRAIMDETAIL;
		$("#machinename")[0].innerHTML = ret.MACHINENAME;
		$("#memo").val(ret.MEMO);
		Crno = ret.CLEAIMNO
		
		var i;
		for(i = 0; i<4; i++)
		{
			var tdid = "#img" + i;
			//$(tdid)[0].innerHTML = "";
			//$(tdid).attr('src',"http://121.78.112.176:222/POP/html/images/image2_gray.png");
			$(tdid).attr('src',m_dbpath + "html/images/image2_gray.png");
		}
		Setimg();
	}

	function Delete()
	{		
		//alert("h=> " + workhistoryno + ", s=> " + StopSeq);		
		if(machineid == "" || Crno == "" || Crno == 'undefined' || Crno == "0")
			return;
		
		navigator.notification.confirm("삭제하시겠습니까?"
				  , fn_Delete
				  , "삭제"
				  , "아니오,예");
	}
	
	function fn_Delete(button)
	{ 
		if(button == 2)
		{
			var jsonData = '{"machineid":' + "\""+ machineid 
							+ "\"," +"\""+ "Crno"+"\":" + "\""+ Crno 
							+ "\"," + "craimcode:" + "\""+ $("#com").val() + "\""
							+'}'
			$.ajax({
			url:m_dbpath + "CraimMachine.aspx/js_delete",
			//"http://121.78.112.176:222/T_POP/Craim.aspx/js_delete",
			//m_dbpath + "StopResult.aspx/delete",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{
				//alert('삭제되었습니다.');
				navigator.notification.alert("삭제되었습니다.",fn_alertCallback, "알림","확인");
				jQuery("#list4").jqGrid('clearGridData');
				Grid();
				New();
			},
			error:function(data) {
				//alert('삭제에 실패하였습니다.');
				navigator.notification.alert("삭제를 실패하였습니다.",fn_alertCallback, "알림","확인");
				}
			});
			
		}
		else
		{
			 return;
		}
		//jQuery("#list4").jqGrid('clearGridData');
	}

	function Save()
	{
			var stime;
			var etime;
			
			if( $("#machine").val() == null ||  $("#machine").val() == ""){
				navigator.notification.alert("설비를 선택하세요",fn_alertCallback, "알림","확인");
				return;
			} 
			if($("#com").val() == null){
				navigator.notification.alert("사고사유를 선택하세요.",fn_alertCallback, "알림","확인");
				return;		
			}
								
			stime = $("#sdate").val() + " " + $("#stime").val();
			

			var jsonData='{"workhistoryno":' + "\""+ workhistoryno 
						  + "\"," +"\""+ "Crno"+"\":" + "\""+ Crno 
						  + "\"," +"\""+ "craimcode"+"\":" + "\""+ $("#com").val()
						  + "\"," +"\""+ "machineid"+"\":" + "\""+  machineid
						  + "\"," +"\""+ "stime"+"\":" + "\""+  stime
						  + "\"," +"\""+ "id"+"\":" + "\""+  m_id
						  + "\"," +"\""+ "memo"+"\":" + "\""+ $("#memo").val()
						  + "\"," + "saveflag:" + "\""+ SaveFlag + "\""
						  +'}'

			$.ajax({
			url: m_dbpath + "CraimMachine.aspx/js_update",
			//"http://121.78.112.176:222/T_POP/Craim.aspx/js_update",
			//m_dbpath + "StopResult.aspx/update",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{
				//if(data.d.mydt[0]["RESULT"] != "N")
				//{
					//alert('저장되었습니다.');
					navigator.notification.alert("저장되었습니다.",fn_alertCallback, "알림","확인");
					if(SaveFlag != "1")
					{
						Crno = data.d.mydt[0]["RESULT"];
					}
					picSave();
					jQuery("#list4").jqGrid('clearGridData');
					Grid();
				//}
			},
			error:function(data) {
				//alert('저장에 실패하였습니다.');
				navigator.notification.alert("저장에 실패하였습니다.",fn_alertCallback, "알림","확인");
				}
			});
	}

	function New()
	{		
		var i;
		for(i = 0; i<4; i++)
		{
			var tdid = "#img" + i;
			//$(tdid)[0].innerHTML = "";
			//$(tdid).attr('src',"http://121.78.112.176:222/POP/html/images/image2_gray.png");
			$(tdid).attr('src', m_dbpath + "html/images/image2_gray.png");
			

		}
		
		Init("start"); //데릭토리 사진 삭제를 위해

		picturecnt=0;

		SaveFlag="0";
		Crno="";
		jQuery("#list4").resetSelection();
		$("#com")[0].selectedIndex =  -1;
		$("#machine")[0].selectedIndex =  0;
		$("#machine").selectmenu("refresh");
		$("#com").selectmenu("refresh");
		$("#stats")[0].innerHTML="신규";
		$("#detail")[0].innerHTML = "";
		$("#machinename")[0].innerHTML = "";
		$('#sdate').trigger('datebox', {'method':'set', 'value':curdate});
		$('#stime').trigger('datebox', {'method':'set', 'value':curtime});
		$("#memo").val("");
		jQuery("#list4").jqGrid('clearGridData');
	}
	
	 /*뒤로 버튼을 누르면 이전페이지로 되돌아 간다.  */
    function fn_Back() {
			location.replace("./Menu.html");
    };
   
		function onPhotoURISuccess(imageURI)
		{
			var large = document.getElementById('largeImage');
			large.style.display = 'block';
			large.src = imageURI;
		};
		
		function getPhoto(source)
		{
			//포토앨범에서 가져오기
			navigator.camera.getPicture(onPhotoURISuccess,null,{quality:50,destinationType:destinationType.FILE_URI,sourceType:source});
		};
		function getCapture(source)
		{
			//사진찍어 바로 보여주기
			navigator.camera.getPicture(onPhotoURISuccess,null,{quality:50,destinationType:destinationType.FILE_URI,pictureSource:source,targetWidth:500,targetHeight:500,correctOrientation:true});
		};

				//사진 업로드
		function SaveAction()
		{
			imageURI = document.getElementById('largeImage').src
			var options = new FileUploadOptions(); 
			options.fileKey="file"; 
			options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1); 
			options.mimeType="image/jpeg"; 
			
			var params = new Object(); 
			params.value1 = picid+"0.jpg"; 
			params.value2 = m_id; 
			
			options.params = params; 

				var ft = new FileTransfer(); 
				//"http://121.78.112.176:222/POP/Craim.aspx/delete",POP\PhoneImages
			if(picturecnt>3)
			{
				navigator.notification.alert("4장이상은 저장되지 않습니다.",fn_alertCallback, "알림","확인");
			}
			else
			{
				ft.upload(imageURI, m_dbpath + "imageTransfer.aspx",onSucc , onFail, options);
				//ft.upload(imageURI, "http://121.78.112.176:222/T_POP/imageTransfer.aspx",onSucc , onFail, options);
			}
		};
		function onSucc()
		{
			//alert('사진 업로드 성공');
				navigator.notification.alert("사진을 업로드 하였습니다.",fn_alertCallback, "알림","확인");
				++picturecnt;
			
		};
		function onFail(message)
		{
			alert('사진 업로드 실패' + ' ' + message);
			
		};
		
		//DB에 있는 사진 갯수 셋팅
		function Setimg()
		{
			/*var imgid1 = m_id + "0.jpg"
			var imgid2 = m_id + "1.jpg"
			var imgid3 = m_id + "2.jpg"
			var imgid4 = m_id + "3.jpg"
			$('#img1').attr('src',"http://121.78.112.176:222/POP/PhoneImages/ADMIN/"+ imgid1);
			$('#img2').attr('src',"http://121.78.112.176:222/POP/PhoneImages/ADMIN/"+ imgid2);
			$('#img3').attr('src',"http://121.78.112.176:222/POP/PhoneImages/ADMIN/"+ imgid3);
			$('#img4').attr('src',"http://121.78.112.176:222/POP/PhoneImages/ADMIN/"+ imgid4);*/
			var jsonData='{"Crno":' + "\""+ Crno 
						  + "\"," +"\""+ "id"+"\":" + "\""+ m_id 
						  + "\"," + "pid:" + "\""+ picid + "\""
						  +'}'


			$.ajax({
			url: m_dbpath + "CraimMachine.aspx/js_picSelect",
			//"http://121.78.112.176:222/T_POP/Craim.aspx/js_picSelect",
			//m_dbpath + "StopResult.aspx/update",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{
				setpicCnt(data.d.mydt);
			},
			error:function(data) {
				//alert('저장에 실패하였습니다.');
				navigator.notification.alert("사진 조회에 실패하였습니다.",fn_alertCallback, "알림","확인");
				}
			});

		};
		
		function setpicCnt(dt)
		{
			picturecnt = 0;
			var i;
			for(i = 0; i<4; i++)
			{
				var tdid = "#img" + i;
				//$(tdid)[0].innerHTML = "";
				//$(tdid).attr('src',"http://121.78.112.176:222/POP/html/images/image2_gray.png");
				$(tdid).attr('src',m_dbpath + "html/images/image2_gray.png");
				
			}
			for(var row in dt)
			{
				var tdid = "#img" + row;
				//$(tdid)[0].innerHTML = "★";
				$(tdid).attr('src',m_dbpath + "html/images/image.png");
				++picturecnt;
			}
		};

		//사진 저장
		function picSave()
		{
			var jsonData='{"Crno":' + "\""+ Crno 
						  + "\"," +"\""+ "id"+"\":" + "\""+ m_id 
						  + "\"," + "pid:" + "\""+ picid + "\""
						  +'}'

			$.ajax({
			url: m_dbpath + "CraimMachine.aspx/js_picsave",
			//"http://121.78.112.176:222/T_POP/Craim.aspx/js_picsave",
			//m_dbpath + "StopResult.aspx/update",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{
				New();

			},
			error:function(data) {
				//alert('저장에 실패하였습니다.');
				navigator.notification.alert("저장에 실패하였습니다.",fn_alertCallback, "알림","확인");
				}
			});
	
		};
		
		//팝업 닫기 버튼 누를때 서버에 있는 사진 갯수 셋팅
		function Cancle()
		{
			/*for(i=0;i<picturecnt;i++)
			{
				var tdid = "#img" + i;
				$(tdid)[0].innerHTML = "★";
			}*/
			var cnt;
				var jsonData='{"Crno":' + "\""+ Crno 
				  + "\"," +"\""+ "id"+"\":" + "\""+ m_id 
				  + "\"," + "pid:" + "\""+ picid + "\""
				  +'}'

				$.ajax({
				url: m_dbpath + "CraimMachine.aspx/js_piccnt",
				//"http://121.78.112.176:222/T_POP/Craim.aspx/js_piccnt",
				//m_dbpath + "StopResult.aspx/update",
				contentType:"Application/json; charset=utf-8",
				dataType:"json",
				data:jsonData,
				type:"POST",
				success:function(data)
				{
					cnt = data.d.mydt[0]["RESULT"];
					for(i=0;i<cnt;i++)
					{
						//$('#img0').attr('src',"http://121.78.112.176:222/POP/html/images/appearance.png");
						//$('#img1').attr('src',"http://121.78.112.176:222/POP/html/images/image.png");
						var tdid = "#img" + i;
						//$(tdid)[0].innerHTML = "★";
						$(tdid).attr('src',"http://121.78.112.176:222/POP/html/images/image.png");
					}
				},
				error:function(data) {
					//alert('저장에 실패하였습니다.');
					navigator.notification.alert("네트워크 상태가 올바르지 않습니다.",fn_alertCallback, "알림","확인");
					}
				});
		};

	 
		function Picdel()
		{
			if(document.getElementById("img0").src == m_dbpath + "html/images/image2_gray.png")
			{
				navigator.notification.alert("사진이 없습니다.",fn_alertCallback, "알림","확인");
				return;
			}
			else
			{
				navigator.notification.confirm("첨부사진은 순차적으로 삭제 됩니다. 사진을 삭제하시겠습니까?"
				, fn_Picdel
				, "삭제"
				, "아니오,예");
			 }
		};
		
		//사진삭제하기
		function fn_Picdel(button)
		{
			if(button == 2)
			{
				var jsonData='{"Crno":' + "\""+ Crno 
							  + "\"," +"\""+ "id"+"\":" + "\""+ m_id 
							  + "\"," +"\""+ "pcnt"+"\":" + "\""+ picturecnt 
							  + "\"," + "pid:" + "\""+ picid + "\""
							  +'}'

				$.ajax({
				url: m_dbpath + "CraimMachine.aspx/js_picdel",
				//m_dbpath + "StopResult.aspx/update",
				contentType:"Application/json; charset=utf-8",
				dataType:"json",
				data:jsonData,
				type:"POST",
				success:function(data)
				{
					navigator.notification.alert("사진이 삭제되었습니다.",fn_alertCallback, "알림","확인");
					Setimg();
				},
				error:function(data) {
					//alert('저장에 실패하였습니다.');
					navigator.notification.alert("저장에 실패하였습니다.",fn_alertCallback, "알림","확인");
					}
				});
			}
	
		};
	
		function Picset(num)
		{
			var img = "img" + num;
			var imgid1 = picid + num +".jpg"
			var noca = new Date();
			if(document.getElementById(img).src == "http://121.78.112.176:222/POP/html/images/image2_gray.png")
			{
				navigator.notification.alert("이미지를 등록해주세요.",fn_alertCallback, "알림","확인");
			}
			else
			{
				$('#view').attr('src',m_dbpath+"PhoneImages/" + m_id + "/"+ imgid1+"?dummy=" + noca);
				
				//$('#view').attr('src',"http://121.78.112.176:222/POP/PhoneImages/ADMIN/"+ imgid1+"?dummy=" + noca);
				viewflag = 1;
				$.mobile.changePage('#dialog1', 'dialog', true, true);
			}
			// $.mobile.changePage('#dialog1', {transition: 'popup', role: 'dialog'});  
			//$('#view').attr('src',"http://121.78.112.176:222/POP/PhoneImages/ADMIN/20130426143002A04ADMIN0.jpg");
			//$.mobile.changePage('#dialog1', 'dialog', true, true);
			//$.mobile.changePage('#dialog1', 'dialog', true, true);
		
		};
		
		function view()
		{
			viewflag=0;
			//$("#dialog").show();
		};
		
		function viewcamera()
		{
			viewflag=2;
			//$("#dialog").show();
		};


		function fn_Manual() {
				location.replace("./help/CraimMachineManual.html");
		};

		function fn_Tuto()
		{
			if(m_workFlag == "0" || m_workFlag == "" || m_workFlag==null)
			{//단일실적
				location.replace("./help/WorkResult01Tuto.html");
			}
			else if(m_workFlag == "1")
			{//쿼터실적
				location.replace("./help/WorkResult02Tuto.html");
			}
		};








//0) 컨트롤별 변수 선언하기

var data1,data2,data3, data4, data5, data6, data7, data8, data9, data10, data11,data12;

var db;	
var sql = "";
var actiongbn = "";

var m_name, m_id,m_pass, m_empid, m_mcd, m_mname, m_workers;
var m_odrkey, m_workdate, m_partcode, m_partname, m_partspec, m_workqty;
var m_statusname, m_status, m_worderno, m_wipseq, m_lotno, m_histno;
var m_autogoodqty, m_goodqty, m_badqty;

var m_center;			//작업공정
var m_workFlag;			//생산실적 입력방법
var m_workResultStart;	//실적 저장시 자동 재시작 구분
var m_autoWorkerReTuip;	//자동시작 시 이전작업자 자동 투입
var m_setimeManualInput; //작업의 시작/종료 시 시간의 수동입력
  

PhoneGap_init();

function PhoneGap_init() {   
        document.addEventListener("deviceready", onDeviceReady, false);
   
};
 
function onDeviceReady() {	
 
    BackButton();
};
 

function BackButton(){
   document.addEventListener("backbutton", onBackButton, true);
};
 

//alert 콜백 함수
function fn_alertCallback(){};

/*프로그램 종료  */
function fn_Exit()
{ 	
	navigator.notification.confirm("프로그램을 종료하시겠습니까?"
			  , fn_confirmCallback_Exit
			  , "종료"
			  , "아니오,예");		    
};

function onBackButton(){
	navigator.notification.confirm("프로그램을 종료하시겠습니까?"
			  , fn_confirmCallback_Exit
			  , "종료"
			  , "아니오,예");
};

function fn_confirmCallback_Exit(button){
		if(button == 2)
			navigator.app.exitApp();
} ;
 
window.onload = function(){ 	
	fn_Init();	
	//fn_ListViewTitle();

};
		
function fn_Init(){ 		
	
	// data1 = document.getElementById("div_content").document.getElementById("d_data0").document.getElementById("data0").document.getElementById("tddata1");
	// alert(data1.innerHTML);

	 //alert($("#tddata1")[0].innerHTML); 	 
	//=> 위 두가지 유형이 동일한 값 가져옴.
	//alert($("#tddata1")[0].innerHTML);
		
	m_name    	= window.localStorage.getItem("name");
	m_id   		= window.localStorage.getItem("id");
	m_pass   	= window.localStorage.getItem("pass");	
	m_empid   	= window.localStorage.getItem("empid");
	
	m_mcd       = window.localStorage.getItem("mcd");
	m_mname     = window.localStorage.getItem("mname");
	actiongbn   = window.localStorage.getItem("actiongbn");
	
	m_center	= window.localStorage.getItem("center");//작업공정
	m_workFlag	= window.localStorage.getItem("workflag");//생산실적 입력방법
	m_workResultStart	= window.localStorage.getItem("workresultstart");//실적 저장시 자동 재시작 구분
	m_autoWorkerReTuip	= window.localStorage.getItem("autoworkerretuip");//자동시작 시 이전작업자 자동 투입
	
	m_center = '100';
	/*0: 	단일실적 입력 (실적 입력화면에서 실적내역을 조회하여 보여준다.)
	  1:	쿼터별 실적 입력(입력되는 실적을 입력한다.)	  */
	m_workFlag = '0';
	/*0:실적 저장만 진행, 1:실적 저장 시 자동 작업 종료 및 재시작)  */
	m_workResultStart = '0';
	/*0:실적 저장 시 작업자 미투입(자동), 1:실적 저장 시 자동 작업 종료 및 재시작 의 경우 기존 작업자 자동 투입  */ 
	m_autoWorkerReTuip = '0';
	/*0: 작업 시작/종료시 자동 종료, 1:작업 시작/종료 시 수동입력 종료  */
	m_setimeManualInput = '0';
 	
	m_odrkey = window.localStorage.getItem("odrkey");
	m_workdate = window.localStorage.getItem("workdate");
	m_partcode = window.localStorage.getItem("partcode");
	m_partname = window.localStorage.getItem("partname");
	m_partspec = window.localStorage.getItem("partspec");
	m_workqty = window.localStorage.getItem("workqty");
	m_statusname = window.localStorage.getItem("statusname");
	m_status = window.localStorage.getItem("status");
	m_worderno = window.localStorage.getItem("worderno");
	m_wipseq = window.localStorage.getItem("wipseq"); 
	
	m_lotno = window.localStorage.getItem("lotno");
	m_histno = window.localStorage.getItem("histno");
	m_workers = window.localStorage.getItem("workers");
	m_autogoodqty = window.localStorage.getItem("autogoodqty");
	m_goodqty = window.localStorage.getItem("goodqty");
	m_badqty = window.localStorage.getItem("badqty");

	
	data1 = $("#tddata1")[0]; //설비명	
	data2 = $("#tddata2")[0]; //품목코드
	data3 = $("#tddata3")[0]; //품목명
	data4 = $("#tddata4")[0]; //규격
	data5 = $("#tddata5")[0]; //지시량
	data6 = $("#tddata6")[0]; //시작시간
	data7 = $("#tddata7")[0]; //작업자
	data8 = $("#tddata8")[0]; //상태
	
	data9 = $("#tddata9")[0]; //생산량
	data10 = $("#tddata10")[0]; //양품량
	data11 = $("#tddata11")[0]; //불량량
	data12 = $("#tddata12")[0]; //지시번호
	
	//1) 컨트롤 초기화
	fn_CtlInit();
	//alert(m_id + "," + m_pass + "," + m_empid + "," + m_name + "," + m_mcd + "," + m_mname );
 	
	if(actiongbn != "order"){
		//2) 데이터 조회
		fn_GetWorkData();	
	}
	
	
	
};

function fn_CtlInit()
{
	//1) 컨트롤 초기화
	if(m_mcd == '' || m_mcd == 'undefined'){
		data1.innerHTML = "";
		data2.innerHTML = "";
		data3.innerHTML = "";
		data4.innerHTML = "";
		data5.innerHTML = "";
		data6.innerHTML = "";
		data7.innerHTML = "";
		data8.innerHTML = "";
		
		data9.innerHTML = "0";
		data10.innerHTML = "0";
		data11.innerHTML = "0"; 
		data12.innerHTML = "";
	}
	else{		
		data1.innerHTML = m_mname;
		data2.innerHTML = m_partcode;
		data3.innerHTML = m_partname;
		data4.innerHTML = m_partspec;
		data5.innerHTML = m_workqty;
		data6.innerHTML = m_workdate;
		data7.innerHTML = m_workers;
		data8.innerHTML = m_statusname;
		
		data9.innerHTML = m_autogoodqty;
		data10.innerHTML = m_goodqty;
		data11.innerHTML = m_badqty; 
		data12.innerHTML = m_worderno;
		}
};

function fn_AllClear(){
	//data1.innerHTML = "";
	data2.innerHTML = "";
	data3.innerHTML = "";
	data4.innerHTML = "";
	data5.innerHTML = "";
	data6.innerHTML = "";
	data7.innerHTML = "";
	data8.innerHTML = "";
	
	data9.innerHTML = "0";
	data10.innerHTML = "0";
	data11.innerHTML = "0"; 
	data12.innerHTML = "";
	
	window.localStorage["odrkey"] 		= "";
	window.localStorage["workdate"] 	= "";
	window.localStorage["partcode"] 	= "";
	window.localStorage["partname"] 	= "";
	window.localStorage["partspec"] 	= "";
	window.localStorage["workqty"] 		= "";
	window.localStorage["statusname"] 	= "";
	window.localStorage["status"] 		= "";
	window.localStorage["worderno"] 	= "";
	window.localStorage["wipseq"] 		= "";
	window.localStorage["lotno"] 		= ""; 
	window.localStorage["histno"] 		= "";
	window.localStorage["workers"] 		= "";

	window.localStorage["autogoodqty"] 	= "0";
	window.localStorage["goodqty"] 		= "0";
	window.localStorage["badqty"] 		= "0"; 
	 
	m_lotno = "";
	m_histno = "";
	m_workers = "";	 
	m_odrkey = "";
	m_workdate = ""; 
	m_partcode = "";
	m_partname = "";
	m_partspec = "";
	m_workqty = ""
	m_statusname = "";
	m_status = "";
	m_worderno = "";
	m_wipseq = ""; 
	m_autogoodqty = "0";
	m_goodqty = "0";
	m_badqty = "0";
	
};
    
/*프로그램 종료  */
/* function fn_Exit(){
			navigator.notification.confirm('프로그램을 종료하시겠습니까?'
					,fn_Quit,
					'종료',
					'예,아니오');			    
		};
function fn_Quit(){
	 navigator.app.exitApp();	
} */
//////////////////////////////설비 선택////////////////////////
function fn_Machine(){
	window.localStorage["actiongbn"] = "machine";
	 //$.mobile.changePage($(document.location.href="./Machine.html"), {transition:"slide", reverse:false, changeHash:false} );
	/* $.mobile.changePage("./Machine.html",{
				transition:"slide",
				reverse: false,
				changeHash: true
				} 
			); */
	
	//$.mobile.changePage($(document.location.href="./Machine.html"), {transition:"slide",reverse:false, changeHash:true} );
	location.replace("./Machine.html");			
};

//////////////////////////////작업지시 선택////////////////////////
function fn_Worders(){
	if(m_mcd == '' || m_mcd == 'undefined')
		{
			//alert("설비를 선택하세요.");
			return;
		}
	
	window.localStorage["actiongbn"] = "order";
	
	/* $.mobile.changePage("./Orders.html",{
		transition:"slide",
		reverse: false,
		changeHash: true
		} 
	); */
	
	location.replace("./Orders.html"); 
};

//////////////////////////////작업시작////////////////////////
function fn_WorkStartStop(){
	//var btn_Job = document.getElementId("btn_job");
	if(data3.innerHTML == '' || data3.innerHTML == 'undefined')
		{
			alert("작업지시를 선택하세요.");
			return;
		}
	
	window.localStorage["actiongbn"] = "startstop";
	
	if(data8.innerHTML == '' || data8.innerHTML == '대기' || data8.innerHTML == '등록'|| data8.innerHTML == 'undefined'){
		//작업시작
		if(m_setimeManualInput == '1'){
			location.replace("./StartStopTime.html");
			return;
		}
		
		if (confirm("작업을시작하시겠습니까?") == false)
			return ;			
		else		 
			fn_Start(m_mcd, m_worderno, m_wipseq, m_setimeManualInput, "");
	}
	else{
		//작업종료
		if(m_setimeManualInput == '1'){
			location.replace("./StartStopTime.html");
			return;
		}
		
		if (confirm("작업을 종료하시겠습니까?") == false)
				return ;			
		else
			fn_End(m_mcd, m_worderno, m_wipseq, m_setimeManualInput, "",m_histno, m_lotno); 
		
		/* navigator.notification.confirm('작업을 종료하시겠습니까?'
				,fn_End(m_mcd, m_worderno, m_wipseq, m_setimeManualInput, "",m_histno, m_lotno),
				'작업종료',
				'예,아니오'); */
	}
	
	//데이터 기록 및 상태 변경
	//location.replace("./StartStopResult.html"); 
};
/*작업 종료 */
function fn_End(mcd, worderno, wipseq, sedtflag, setime, histno, lotno){
	json_param ='{"strMachine":' + "\""+ mcd 		+ "\"," 
		        + "strWorderNo:" + "\""+ worderno 	+ "\","
		        + "strWipSeq:"   + "\""+ wipseq 	+ "\"," 
		        + "strSeDtFlag:" + "\""+ sedtflag 	+ "\","
		        + "strSe_time:"  + "\""+ setime 	+ "\"," 
		        + "strHistno:"   + "\""+ histno 	+ "\"," 
		        + "strLotno:"    + "\""+ lotno 		+ "\"" +'}';
	$.ajax({
	url:"http://121.78.112.176:222/POP/PorductReturnToJson.aspx/js_WorkEnd",
	contentType:"Application/json; charset=utf-8",
	dataType:"json",
	data:json_param,
	type:"POST",
	success:function(data)
		{
		    if(data.d.mydt[0]["FLAG"] == 'OK') 
				fn_AllClear();
		    else{
		    	alert("작업을 종료하지 못했습니다.");
		    }
			return;		 
		},
	error:function(data) {
			alert('네트워크 상에 문제가 발생되었습니다.');		
		}
	}); 	
};

/*작업 시작  */
function fn_Start(mcd,worderno,wipseq,sedtflag,setime){
	json_param ='{"strMachine":' + "\""+ mcd 		+ "\"," 
		        + "strWorderNo:" + "\""+ worderno 	+ "\","
		        + "strWipSeq:" 	 + "\""+ wipseq 	+ "\"," 
		        + "strSeDtFlag:" + "\""+ sedtflag 	+ "\"," 
		        + "strSe_time:"  + "\""+ setime	 	+ "\"" +'}';
	$.ajax({
	url:"http://121.78.112.176:222/POP/PorductReturnToJson.aspx/js_workstart",
	contentType:"Application/json; charset=utf-8",
	dataType:"json",
	data:json_param,
	type:"POST",
	success:function(data)
	{
		fn_SetData(data);
		
		return;		 
	},
	error:function(data) {alert('네트워크 상에 문제가 발생되었습니다.');
		fn_CtlInit();
	}
	}); 
};


//////////////////////////////작업자 투입////////////////////////
function fn_Worker(){
	if(m_histno == '' || m_histno == 'undefined')
	{
		alert("작업을 시작하세요.");
		return;
	}
	
	//작업자 투입화면 이동
	/* $.mobile.changePage("./Worker.html",{
		transition:"slide",
		reverse: false,
		changeHash: true
		} 
	); */
	window.localStorage["actiongbn"] = "worker";
	location.replace("./Worker.html"); 
}
//////////////////////////////생산실적 등록////////////////////////
function fn_WorkResult(){
	if(m_histno == '' || m_histno == 'undefined')
	{
		alert("작업을 시작하세요.");
		return;
	}
	window.localStorage["actiongbn"] = "workresult";
	//작업실적 입력화면으로 이동
	if(m_workFlag == "0"){//단일실적
		location.replace("./WorkResult01.html");
	}
	else if(m_workFlag == "1"){//쿼터실적
		location.replace("./WorkResult02.html");
	}
};
//////////////////////////////불량실적 등록////////////////////////
function fn_BadResult(){
	if(m_histno == '' || m_histno == 'undefined')
	{
		alert("작업을 시작하세요.");
		return;
	}
	
	//불량실적 등록화면 이동
	/* $.mobile.changePage("./BadResult.html",{
		transition:"slide",
		reverse: false,
		changeHash: true
		} 
	); */
	window.localStorage["actiongbn"] ="badresult"; 
	location.replace("./BadResult.html"); 
};
 
//////////////////////////////비가동 실적 등록////////////////////////
function fn_StopResult(){
	if(m_histno == '' || m_histno == 'undefined')
	{
		alert("작업을 시작하세요.");
		return;
	}
	
	// 비가동실적 등록화면 이동
	/* $.mobile.changePage("./StopResult.html",{
		transition:"slide",
		reverse: false,
		changeHash: true
		} 
	); */
	window.localStorage["actiongbn"] ="stopresult"; 
	location.replace("./StopResult.html"); 
};

//////////////////////////////데이터 조회////////////////////////
function fn_GetWorkData()
{			//var btn_Job = document.getElementById("btn_job");	 	
			var json_param = '';	
			
			if(m_mcd =='undefined' || m_mcd == 'null')
				m_mcd='';
			
			if(m_empid == 'undefined')
				m_empid = window.localStorage.getItem("empid");
			 if(m_mcd == '')
				{
				   alert("설비를 선택하세요.");
				  return;
				} 
		$(document).ready(function()
		{	 
			
			json_param ='{"machine":' 	+ "\"" + m_mcd 		+ "\"," 
			            + "empid:" 	    + "\"" + m_empid 	+ "\","				
				        + "histno:" 	+ "\"" + m_histno 	+ "\"" +'}';
			$.ajax({
			url:"http://121.78.112.176:222/POP/PorductReturnToJson.aspx/workinfo",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:json_param,
			type:"POST",
			success:function(data)
			{						
				 
				$(fn_SetData(data.d.mydt));
				/* if(data8.innerHTML == '' || data8.innerHTML == '대기' || data8.innerHTML == '등록'|| data8.innerHTML == 'undefined'){
					btn_Job.innerHTML = "작업시작";
				}
				else{
					btn_Job.innerHTML = "작업종료";
				} */
				
				return;				 
			},
			error:function(data) {alert('네트워크 상에 문제가 발생되었습니다.');
				fn_CtlInit();
			}
			});
		});	 
};

/*데이터 변수보관, 화면셋팅, 메모리변수에 보관  */
function fn_SetData(dt){
	fn_AllClear();
	
	  for (var row in dt) {	
			m_histno 		=  dt[0]["WORKHISTORYNO"];
			m_lotno			=  dt[0]["LOTNO"];
			m_partcode 		=  dt[0]["PARTCODE"];
			m_partname		=  dt[0]["PARTNAME"];
			m_partspec		=  dt[0]["SPEC"];
			m_workqty		=  dt[0]["WORKQTY"];
			m_workdate		=  dt[0]["SDATE"];
			m_workers		=  dt[0]["WORKERS"];
			m_status		=  dt[0]["WORK_STATUS"];
			m_statusname	=  dt[0]["STATUS"];
			m_autogoodqty	=  dt[0]["AUTOGOODQTY"];
			m_goodqty		=  dt[0]["GOODQTY"];
			m_badqty		=  dt[0]["BADQTY"];		
			m_worderno      =  dt[0]["WORDERNO"];
			m_wipseq		=  dt[0]["WIPSEQ"];
			
			data1.innerHTML = m_mname
			data2.innerHTML = m_partcode;
			data3.innerHTML = m_partname;
			data4.innerHTML = m_partspec;
			data5.innerHTML = m_workqty;
			data6.innerHTML = m_workdate;
			data7.innerHTML = m_workers;
			data8.innerHTML = m_statusname;				
			data9.innerHTML = m_autogoodqty;
			data10.innerHTML = m_goodqty;
			data11.innerHTML = m_badqty;
			data12.innerHTML = m_worderno
			
			window.localStorage["histno"] 		= m_histno;
			window.localStorage["lotno"] 		= m_lotno; 
			window.localStorage["partcode"]		= m_partcode;
			window.localStorage["partname"] 	= m_partname;
			window.localStorage["partspec"] 	= m_partspec;
			window.localStorage["workqty"] 		= m_workqty;
			window.localStorage["workdate"] 	= m_workdate;				
			window.localStorage["workers"] 		= m_workers;
			window.localStorage["status"] 		= m_status;
			window.localStorage["statusname"] 	= m_statusname;
			window.localStorage["autogoodqty"] 	= m_autogoodqty;
			window.localStorage["goodqty"] 		= m_goodqty;
			window.localStorage["badqty"] 		= m_badqty;	
			window.localStorage["worderno"]     = m_worderno;
			window.localStorage["wipseq"]		= m_wipseq
	  };
}
 
		








window.localStorage["form"]         = "menu";

window.localStorage["odrkey"] 		= "";
window.localStorage["workdate"] 	= "";
window.localStorage["partcode"] 	= "";
window.localStorage["partname"] 	= "";
window.localStorage["partspec"] 	= "";
window.localStorage["workqty"] 		= "";
window.localStorage["statusname"] 	= "";
window.localStorage["status"] 		= "";
window.localStorage["worderno"] 	= "";
window.localStorage["wipseq"] 		= "";
window.localStorage["lotno"] 		= ""; 
window.localStorage["histno"] 		= "";
window.localStorage["workers"] 		= "";

window.localStorage["autogoodqty"] 	= "0";
window.localStorage["goodqty"] 		= "0";
window.localStorage["badqty"] 		= "0"; 
window.localStorage["quarter"]		= "";
window.localStorage["quartercd"]	= "";

window.localStorage["mcd"]			= "";
window.localStorage["mname"]		= "";

window.localStorage["pagename"] = "Menu.html";

document.addEventListener("deviceready", onDeviceReady, false);
 
function onDeviceReady() {	 
    BackButton();
	checkFileSystem();
}; 

function BackButton(){
   document.addEventListener("backbutton", onBackButton, true);  
};
 
function checkFileSystem()
{
	//alert("checkFileSystem");
	 
	 window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
	//window.requestFileSystem(type, size, successCallback, opt_errorCallback) 
	// alert("checkFileSystem1");
};

function gotFS(fileSystem)
{		//폴더부터 검사
		//alert("gotFS");
		rootDir = fileSystem.root;
		fileSystem.root.getDirectory("GSmartSPOP",{create:true},gotDirEntry,fail);
}

function gotDirEntry(dirEntry)
{
	//alert("gotDirEntry");
	dirEntry.getFile("setting.txt",{create:true},gotFileEntry,fail);			
};

function gotFileEntry(fileEntry)
{		
	fileEntry.file(readFile,fail);	
};

function fail(error)
{
	alert(error.code);
};


function readFile(file)
{
	var reader = new FileReader();
	reader.onloadend = function(evt)
	{
		var getread = evt.target.result;
		read = getread;
		
		if(read == null)
		{
			//alert('로그인 진행바랍니다.');
			return;
		}
		else
		{	
			show();
		}
	}
	reader.readAsText(file);
};

function show()
{
	var Data=read.split(",");
	
	if(Data[0]!=null)
	{
		window.localStorage["center"] = Data[0];
	}

	if(Data[1]!=null)
	{
//		$("#result").val(Data[1]);
		window.localStorage["workflag"] = Data[1];
	}

};




/*프로그램 종료  */
function fn_Exit()
{ 	
	navigator.notification.confirm("프로그램을 종료하시겠습니까?"
			  , fn_confirmCallback_Exit
			  , "종료"
			  , "아니오,예");		    
};

function onBackButton(){
	navigator.notification.confirm("프로그램을 종료하시겠습니까?"
			  , fn_confirmCallback_Exit
			  , "종료"
			  , "아니오,예");
};

function fn_confirmCallback_Exit(button){
		if(button == 2)
			navigator.app.exitApp();
} ;

function fn_alertCallback(){};	

 
function fn_MoveWork(){
	location.replace("Machine.html");
};

function fn_MoveSearch(){
	//location.replace("SMenu.html")
	//location.replace("SmsSend.html")
	location.replace("./MenuSearch.html");
};

function fn_MoveCraim(){
	location.replace("CraimMachine.html");
	//location.replace("imageTest.html");
};

function fn_MoveConfig(){
	//location.replace("./config.html");
	$.mobile.changePage($(document.location.href="./config.html"), {transition:"slide", reverse:false, changeHash:true} );
};

function fn_Manual() {
		location.replace("./help/MenuManual.html");
};

function fn_Info() {
		location.replace("./Info.html");
};









	//window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
	var m_dbpath = window.localStorage.getItem("dbpath"); 
	
	var BadCode=new Array();
	var BadName=new Array();
	var m_SettimeManualInput = "1";
	var partname = window.localStorage.getItem("partname");
	//var workhistoryno = "201107201020002";
	var workhistoryno = window.localStorage.getItem("histno");
	//var machineid = "A04";
	var machineid =	 window.localStorage.getItem("mcd");
	var SaveFlag= "0";
	
	   document.addEventListener("deviceready", onDeviceReady, false);
	   function onDeviceReady() {	
		   
		    BackButton();
		};
		 

		function BackButton(){
		   document.addEventListener("backbutton", onBackButton, true);
		};
		
		function onBackButton(){
			navigator.notification.confirm("프로그램을 종료하시겠습니까?"
					  , fn_confirmCallback_Exit
					  , "종료"
					  , "아니오,예");
		};
		 
		function fn_confirmCallback_Exit(button){
			if(button == 2)
				navigator.app.exitApp();
	} ;
	
    function fn_alertCallback(){};	
		
	window.onload = function()
	{
		$(document).ready(function()
		{	
			if(m_SettimeManualInput == "0")
			{
				document.getElementById('time').style.display="none";
			}
			$("#part")[0].innerHTML = partname ;
			$("#machine")[0].innerHTML = machineid ;
			Grid();
		});

	}
	
	

	function Grid()
	{
		var jsonData='{"workhistoryno":' +"\"" +workhistoryno+"\""+ '}';
			$.ajax({
			url: m_dbpath + "Worker.aspx/worker",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{
				$(makeControl(data.d.mydt));
			},
			error:function(data) {
				//alert('접속오류');
				navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
				}
			});
	}

	//제큐 그리드 만들기
	function makeControl(dt)
	{//alert('d.');
			jQuery("#list4").jqGrid({
			datatype: "local",
			colNames:['순번','작업자','작업자번호'],
			
			colModel:[
				{name:'SORTKEY',index:'SORTKEY',width:50,align:"center",hidden:true},
				{name:'EMPNAME',index:'EMPNAME',width:80,align:"center"},
				{name:'EMPID',index:'EMPID',width:120,align:"center"},
				/*{name: 'WEMPID', width:80, align: 'left', editable: true, edittype: 'select',
				  formatter: function (cellvalue, options, rowObject, action)
				  {
					if (cellvalue == 'YES') 
					{
					  return '<select id="gg"><option value="YES" selected="selected">YES</option>' +
									 '<option value="NO">NO</option></select>';
					} 
					else 
					{
					  return '<select id ="gg"><option value="YES">YES</option>' +
							   '<option value="NO" selected="selected">NO</option></select>';
					}
				  }
				}*/
			],

			//multiselect: true,
			//viewrecords: true,
			multiselect: true,
			height: "100%",
			autowidth : true//,
			//rowNum: 100000,

			//caption: "작업자 관리"


			});  

			var Data = new Array();
			for(row in dt)
			{
				Data[row]={SORTKEY:dt[row]["SORTKEY"],EMPNAME:dt[row]["EMPNAME"],EMPID:dt[row]["EMPID"],WEMPID:dt[row]["WEMPID"]};
			}
			
			var mydata = [Data];
			for(var i=0;i<=mydata.length;i++)
			{
				jQuery("#list4").jqGrid('addRowData',i+1,mydata[i]);
			}
			var grid = $("#list4");
			grid.jqGrid('resetSelection');
			var ids = grid.getDataIDs();

			for (var i=0, il=ids.length; i < il; i++)
			{
				if(dt.length <= i)
					return;
				
				if(dt[i]["SORTKEY"]=="0")
				grid.jqGrid('setSelection',ids[i], true);
			}
			//$(document).delegate('#list4 .jqgrow td input', 'click', function () { alert('aaa'); });
	}

	function Save()
	{	
        var id = $("#list4").getGridParam('selarrrow');
        var ids = $("#list4").jqGrid('getDataIDs');
        var dat = "";
		var Rdat = "";
        var count = 0;
		var aaa="";
        for (var i = 0; i < ids.length; i++) 
		{
            var check = false;
            $.each(id, function (index, value)
			{
                if (value == ids[i])
                    check = true;
            });
 
            if (check) {
                var rowdata = $("#list4").getRowData(ids[i]);
				/*if($(rowdata.WEMPID == "YES"))
				{
					aaa=rowdata.EMPNAME;
				}*/
                dat += rowdata.EMPID + ',';
                count++;
            }
		}
		Rdat=dat.substr(0,dat.length-1);
		//alert(aaa);

		var jsonData='{"workhistoryno":' + "\""+ workhistoryno 
					  + "\"," + "rdat:" + "\""+ Rdat + "\""
					  +'}';
			$.ajax({
			url: m_dbpath + "Worker.aspx/saveworker",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{
				if(data.d.mydt[0]["RESULT"] == "Y")
				{
					//alert('저장되었습니다.');
					navigator.notification.alert("저장되었습니다.",fn_alertCallback, "알림","확인");
					jQuery("#list4").jqGrid('clearGridData');
					Grid();
				}
				else
				{
					//alert('저장에 실패하였습니다.');
					navigator.notification.alert("저장에 실패하였습니다.",fn_alertCallback, "알림","확인");
				}
			},			
			error:function(data) {
				//alert('저장에 실패하였습니다.');
				navigator.notification.alert("저장에 실패하였습니다.",fn_alertCallback, "알림","확인");
				}
			});
	}

/*초성 조회  */	
function fn_Search(){
	var jsonData= '{"strWorkhistoryno":' + "\""+ workhistoryno 
	+ "\"," +"\""+ "strHan"+"\":" + "\""+ $("#s_data").val()   + "\""
	+'}';
	 
	$.ajax({
	url: m_dbpath + "Worker.aspx/js_hangle",
	contentType:"Application/json; charset=utf-8",
	dataType:"json",
	data:jsonData,
	type:"POST",
	success:function(data)
	{
		jQuery("#list4").jqGrid('clearGridData');
		$(makeControl(data.d.mydt));
	},
	error:function(data) {
		alert('접속오류');
		navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
		}
	});
}
	
    /*뒤로 버튼을 누르면 이전페이지로 되돌아 간다.  */
    function fn_Back() {
        location.replace("./Main.html");
    };














			jQuery.extend(jQuery.mobile.datebox.prototype.options, {
			useModal: true,
			useNewStyle: true,
			usePlaceholder: true,
		});		
			
	window.localStorage["actiongbn"]="";	
	//window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
	var m_dbpath = window.localStorage.getItem("dbpath"); 
			
	var BadCode=new Array();
	var BadName=new Array();
	var partname = window.localStorage.getItem("partname");
	var mname = window.localStorage.getItem("mname");
	//var workhistoryno = "20111004A040001";
	//var machineid = "A04";
	var machineid =  window.localStorage.getItem("mcd");
	var workhistoryno = window.localStorage.getItem("histno");
	var StopSeq = "0";;
	var SaveFlag="0";
	var totalUse = 0;
	var Syear;
	var Eyear;
	
	var curdate;
	var curtime
	var datenow;
	
	datenow = new Date();
    curdate = getDateStrFromDateObject(datenow);
	curtime = getTimeStrFromDateObject(datenow);

    document.addEventListener("deviceready", onStart, false);
    function onStart() {   
    	document.addEventListener("backbutton", onBackButton, true);	
    	};
    
	

        function onBackButton(){
        	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
        			  , fn_confirmCallback_Exit
        			  , "이동"
        			  , "아니오,예");
        };

        function fn_confirmCallback_Exit(button){
        		if(button == 2)
        			fn_Back();
        } ;

        function fn_alertCallback(){};	

        /*로딩 시작  */
        function fn_ShowLoading(){
		    	$.mobile.showPageLoadingMsg( "a", "Loading...", false );
        	    //$.mobile.showPageLoadingMsg();
			};
		/*로딩 종료  */	
		function fn_HideLoading(){
				$.mobile.hidePageLoadingMsg(); 
			};
		           	
    	
	window.onload = function()
	{
		fn_ShowLoading();
		$(document).ready(function()
		{	
			Grid();
			var Data='{"start":' +"\"" +'1'+"\""+ '}';
			$.ajax({
			url: m_dbpath + "StopResult.aspx/init",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:Data,
			type:"POST",
			success:function(data)
			{
				$(makeOption(data.d.mydt));
			},
			error:function(data) {
				//alert('접속오류');
				navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
				}
			});
			
			$("#part")[0].innerHTML = partname;
			$("#mchname")[0].innerHTML = mname;
			
			
		});
		
		//var now = new Date();
		//alert(now.getFullYear());
		$('#sdate').trigger('datebox', {'method':'set', 'value':curdate});
		$('#stime').trigger('datebox', {'method':'set', 'value':curtime});
		$('#edate').trigger('datebox', {'method':'set', 'value':curdate});
		$('#etime').trigger('datebox', {'method':'set', 'value':curtime});

		fn_HideLoading();
	}

	function Grid()
	{
		var jsonData='{"workhistoryno":' +"\"" +workhistoryno+"\""+ '}';
			$.ajax({
			url: m_dbpath + "StopResult.aspx/Stopresult",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{
				$(makeControl(data.d.mydt));
			},
			error:function(data) {
				//alert('접속오류');
				navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
				}
			});
	}

	//옵션 컨트롤
	function makeOption(dt)
	{
		for (var row in dt)
		{
			//stringmem=dt[row]["MEMSHTNAME"];
			BadCode[row]=dt[row]["STOPCODE"];
			BadName[row]=dt[row]["STOPNAME"];
			option = document.createElement( "option" );
			option.value = BadCode[row];
			option.innerText = BadName[row];
			$("#com").append(option);

		}
		
	   $("#com")[0].selectedIndex =  -1;
	   $("#com").selectmenu("refresh");
	  // $('#com').submit();
	}

	//제큐 그리드 만들기
	function makeControl(dt)
	{//alert('d.');
			
			jQuery("#list4").jqGrid({
			datatype: "local",
			colNames:['순번','사유', '시작시간', '종료시간','발생시간','스탑코드','시작년도','끝년도'],
			colModel:[
				{name:'STOPSEQ',index:'STOPSEQ', sorttype:"int",width:30,align:"center"},
				{name:'STOPNAME',index:'STOPNAME',width:65},
				{name:'STARTTIME',index:'STARTTIME',  align : 'center',width:60},
				{name:'ENDTIME',index:'ENDTIME',  align : 'center',width:60},
				{name:'USETIME',index:'USETIME',  align : 'center',width:40},
				{name:'STOPCODE',index:'STOPCODE',hidden:true},
				{name:'SYEAR',index:'SYEAR',hidden:true},
				{name:'EYEAR',index:'EYEAR',hidden:true}
			],
			//multiselect: true,
			//viewrecords: true,
			autowidth : true,
			height: "100%",
			onSelectRow: function(SEQ)
			{ 
				Setting();
			}//,
			//caption: "비가동실적관리"

			}).navGrid('#list4',{add:false,del:false,edit:false,position:'right'}); 

			var Data = new Array();
			for(row in dt)
			{
				Data[row]={STOPSEQ:dt[row]["STOPSEQ"],STOPNAME:dt[row]["STOPNAME"],STARTTIME:dt[row]["STARTTIME"],ENDTIME:dt[row]["ENDTIME"],
				USETIME:dt[row]["USETIME"],STOPCODE:dt[row]["STOPCODE"],SYEAR:dt[row]["SYEAR"],EYEAR:dt[row]["EYEAR"]};
				totalUse +=dt[row]["USETIME"];
			}
			$("#totalUse")[0].innerHTML = totalUse + ' 분';
			totalUse=0;
			var mydata = [Data];
			for(var i=0;i<=mydata.length;i++)
			{
				jQuery("#list4").jqGrid('addRowData',i+1,mydata[i]);
			}
			
			//jQuery("#list4").hideCol("BADCODE");

	}

	function Setting()
	{
		$("#stats")[0].innerHTML="수정";
		SaveFlag="1";
		var id = jQuery("#list4").jqGrid('getGridParam','selrow');
		var ret = jQuery("#list4").jqGrid('getRowData',id);
		var Stime = ret.STARTTIME.split(" ");
		var Etime = ret.ENDTIME.split(" ");
		$('#sdate').trigger('datebox', {'method':'set', 'value':(ret.SYEAR + '-' + Stime[0])});
		$('#stime').trigger('datebox', {'method':'set', 'value':Stime[1]});
		$('#edate').trigger('datebox', {'method':'set', 'value':(ret.SYEAR + '-' + Etime[0])});
		$('#etime').trigger('datebox', {'method':'set', 'value':Etime[1]});
		StopSeq = ret.STOPSEQ;
		Syear = ret.SYEAR;
		Eyear = ret.EYEAR;
		//alert($("#sdate").val());
		//alert($("#stime").val());
		//$("#bad").val((ret.QTY.replace(/\s+/, '')));
		$("#com").val(ret.STOPCODE); 
		$("#com").selectmenu('refresh');
	}

	function Delete()
	{		
		//alert("h=> " + workhistoryno + ", s=> " + StopSeq);		
		if(workhistoryno == "" || StopSeq == "" || StopSeq == 'undefined' || StopSeq == "0")
			return;
		
		navigator.notification.confirm("삭제하시겠습니까?"
				  , fn_Delete
				  , "삭제"
				  , "아니오,예");
	}
	
	function fn_Delete(button)
	{ 
		if(button == 2)
		{
			var jsonData = '{"workhistoryno":' + "\""+ workhistoryno 
							+ "\"," +"\""+ "stopseq"+"\":" + "\""+ StopSeq 
							+ "\"," + "stopcode:" + "\""+ $("#com").val() + "\""
							+'}'
			$.ajax({
			url: m_dbpath + "StopResult.aspx/delete",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{
				//alert('삭제되었습니다.');
				navigator.notification.alert("삭제되었습니다.",fn_alertCallback, "알림","확인");
				jQuery("#list4").jqGrid('clearGridData');
				Grid();
				New();
			},
			error:function(data) {
				//alert('삭제에 실패하였습니다.');
				navigator.notification.alert("삭제를 실패하였습니다.",fn_alertCallback, "알림","확인");
				}
			});
			
		}
		else
		{
			 return;
		}
		//jQuery("#list4").jqGrid('clearGridData');
	}

	function Save()
	{
			var stime;
			var etime;
			 
			if($("#com").val() == null){
				navigator.notification.alert("비가동사유를 선택하세요.",fn_alertCallback, "알림","확인");
				return;		
			}
				
			
			//if(SaveFlag==1)
			//{
			//	stime = Syear + "-" + $("#sdate").val() + " " + $("#stime").val();
			//	etime = Eyear + "-" + $("#edate").val() + " " + $("#etime").val();
			//}
			//else
			//{
				//var now = new Date();
				//stime = now.getFullYear()+"-" + $("#sdate").val() + " " + $("#stime").val();
				//etime = now.getFullYear()+"-" + $("#edate").val() + " " + $("#etime").val();
				
				stime = $("#sdate").val() + " " + $("#stime").val();
				etime = $("#edate").val() + " " + $("#etime").val();
			//}
			
			if(compareIsPastDay(stime,etime) <= 0){
				navigator.notification.alert("시작시간 및 종료시간을 확인하세요.",fn_alertCallback, "알림","확인");
				return;
				}

			var jsonData='{"workhistoryno":' + "\""+ workhistoryno 
						  + "\"," +"\""+ "stopseq"+"\":" + "\""+ StopSeq 
						  + "\"," +"\""+ "stopcode"+"\":" + "\""+ $("#com").val()
						  + "\"," +"\""+ "machineid"+"\":" + "\""+  machineid
						  + "\"," +"\""+ "stime"+"\":" + "\""+  stime
						  + "\"," +"\""+ "etime"+"\":" + "\""+  etime
						  + "\"," + "saveflag:" + "\""+ SaveFlag + "\""
						+'}'

			$.ajax({
			url: m_dbpath + "StopResult.aspx/update",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{
				if(data.d.mydt[0]["RESULT"] == "Y")
				{
					//alert('저장되었습니다.');
					navigator.notification.alert("저장되었습니다.",fn_alertCallback, "알림","확인");
					jQuery("#list4").jqGrid('clearGridData');
					Grid();
					New();
				}
				else
				{
					//alert('시간이 알맞지 않습니다.');
					navigator.notification.alert("입력시간을 확인하세요.",fn_alertCallback, "알림","확인");
				}
			},
			error:function(data) {
				//alert('저장에 실패하였습니다.');
				navigator.notification.alert("저장에 실패하였습니다.",fn_alertCallback, "알림","확인");
				}
			});
	}

	function New()
	{
		SaveFlag="0";
		StopSeq="";
		jQuery("#list4").resetSelection();
		$("#com")[0].selectedIndex =  -1;
		$("#com").selectmenu("refresh");
		$("#stats")[0].innerHTML="신규";
		$('#sdate').trigger('datebox', {'method':'set', 'value':curdate});
		$('#stime').trigger('datebox', {'method':'set', 'value':curtime});
		$('#edate').trigger('datebox', {'method':'set', 'value':curdate});
		$('#etime').trigger('datebox', {'method':'set', 'value':curtime});
	}
	
	 /*뒤로 버튼을 누르면 이전페이지로 되돌아 간다.  */
    function fn_Back() {
  		location.replace("./Main.html");
    };
   















	google.load("visualization", "1", {packages:["corechart"]}); 
	
    var m_empid, 	m_mcd, 		m_center;	//조회주건	
    var m_workqty, 	m_sdate,   	m_odrkey,	m_partcode, 	m_partname, m_partspec;; 
    var m_workers, 	m_status, 	m_statusname;
    var m_worderno, m_wipseq,   m_form;
    /*Array List 객체 선언*/
   // var List = new aryList();
    var m_workFlag	= window.localStorage.getItem("workflag");//생산실적 입력방법
	window.localStorage["pagename"] = "PlanMachine.html";
   m_empid 	= window.localStorage["empid"];
    /*m_mcd 		= window.localStorage["mcd"];
    m_mname 	= window.localStorage["mname"];
    m_statusname = window.localStorage["statusname"];
    m_form = window.localStorage["form"] ;
    m_center    = window.localStorage["center"];
    window.localStorage["actiongbn"]="";*/
    
   //m_empid = 'ADMIN';
   // m_cd = 'A01';
   //alert (m_empid);
   
 	//window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
    //var m_dbpath = window.localStorage.getItem("dbpath"); 
	
		
	var m_dbpath = 'http://121.78.112.176:222/POP/';
	var m_screenHeight = screen.height ;
	//screen.availHeight ;
	var m_radioflag;

    document.addEventListener("deviceready", onStart, false);
    function onStart() 
	{   
			document.addEventListener("backbutton", onBackButton, true);
			var Data=device.version.split(".");
			//alert(Data[0] + "-" + Data[1] + "-" + Data[2]);
			if(parseInt(Data[0])> 3)
			{
				//document.getElementById('see_chart').style.display="none";
				$('#chart_div1').css({'height':(($(document).height())-270)+'px'});
				m_radioflag = $("#radio1").val();
				fn_Search();
				$("input[name='radio']").bind( "change", function(event, ui) {

						$('#radio5').attr("checked",false).checkboxradio("refresh");
						$('#radio6').attr("checked",false).checkboxradio("refresh");
						$('#radio7').attr("checked",false).checkboxradio("refresh");

						m_radioflag = $(this).val();
						fn_Search();
				});
				$("input[name='radio1']").bind( "change", function(event, ui) {

						$('#radio1').attr("checked",false).checkboxradio("refresh");
						$('#radio2').attr("checked",false).checkboxradio("refresh");
						$('#radio3').attr("checked",false).checkboxradio("refresh");
						$('#radio4').attr("checked",false).checkboxradio("refresh");
						m_radioflag = $(this).val();
						fn_Search();
				});
			}
			else
			{
				var addTable = document.getElementById("addTable");

				var str = ""
				str = "<table style='background-color:white;' width='100%' height='200px;' id ='see_chart'><tr><td width='10%'> 100 </td><td width='90%'><div><hr></div></td></tr><tr><td width='10%'> 80 </td><td			 width='90%'><div><hr></div></td></tr><tr><td width='10%'> 60 </td><td width='90%' align='center'><div>Android 3.0이상에서 지원하는 화면입니다.</div></td></tr><tr><td width='10%'> 40 </td><td width='90%'><div><hr></div></td>						</tr><tr><td width='10%'> 20 </td><td width='90%'><div><hr></div></td></tr><tr><td width='100%' align='center' colspan='2'>설비</td></tr></table>"		
				// 추가할 폼(에 들어갈 HTML)

				var addedDiv = document.createElement("div"); // 폼 생성
				addedDiv.innerHTML  = str; // 폼 Div안에 HTML삽입
				addTable.appendChild(addedDiv); // 삽입할 DIV에 생성한 폼 삽입
			}	
    };
	
	
	window.onload = function()
	{

	}


	function fn_Search()
	{
		  json_param = '{"strEmpid":' + "\"" + m_empid + "\"," 
            	       //+ "strWorkdate:" + "\"" + $("#sdate").val().replace("-","").replace("-","") + "\"," 
					   + "strFlag:" + "\"" + m_radioflag + "\"," 
            	       + "strMachine:" + "\"" + "" + "\"" + '}';

            $.ajax({
                url: m_dbpath + "PlanMachine.aspx/js_Select",
                contentType: "Application/json; charset=utf-8",
                dataType: "json",
                data: json_param,
                type: "POST",
                success: function(data) {
					$(DrawLine(data.d.mydt));
                },
                error: function(data) {
                	//alert('네트워크 상에 문제가 발생되었습니다.');
                	navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
                	}
            });
	};

	
		function DrawLine(dt)
		{
			var data = new google.visualization.DataTable();
			data.addColumn('string', '설비');
			data.addColumn('number', '실적율(%)');

			/*data.addRows(3);
			data.setValue(0, 0, '2004');
			data.setValue(0, 1, 1000);
			data.setValue(1, 0, '2005');
			data.setValue(1, 1, 1000);
			data.setValue(2, 0, '2006');
			data.setValue(2, 1, 1000);*/
			
			data.addRows(dt.length);
			for (i = 0; i < dt.length; i++)
			{
				data.setValue(i, 0, dt[i]["MACHINEID"]);
				data.setValue(i, 1, dt[i]["GOAVG"]);
			}
			// Options
			var options = {
					is3D:true,
					vAxis: {title: '실적율(%)',titleTextStyle:{color: 'black', fontName: '돋움체', fontSize: '12'}},
					hAxis: {title: '설비',titleTextStyle:{color: 'black', fontName: '돋움체', fontSize: '12'}},
					legend:{position: 'none',textStyle: {color: 'blue', fontSize: 16}},
					backgroundColor:{fill:'white'},
					bar: {groupWidth: 20},
					isStacked: true,
					zoom: 14
					//colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6']

                  };


			//var chart1 = new google.visualization.LineChart(document.getElementById('chart_div1'));
			var chart1 = new google.visualization.ColumnChart(document.getElementById('chart_div1'));
			// Draw
			chart1.draw(data, options);
		}

    function onBackButton(){
    	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
    			  , fn_confirmCallback_Exit
    			  , "이동"
    			  , "아니오,예");
    };

    function fn_confirmCallback_Exit(button){
    		if(button == 2)
    			fn_Back();
    			//navigator.app.exitApp();
    } ;

    function fn_alertCallback(){};	


    /*뒤로 버튼을 누르면 이전페이지로 되돌아 간다.  */
    function fn_Back() {
        	location.replace("./MenuSearch.html");
    };
 
    function fn_Manual() {
        	location.replace("./help/PlanMachineManual.html");
    };	

	function fn_Tuto()
	{
		if(m_workFlag == "0" || m_workFlag == "" || m_workFlag==null)
		{//단일실적
			location.replace("./help/WorkResult01Tuto.html");
		}
		else if(m_workFlag == "1")
		{//쿼터실적
			location.replace("./help/WorkResult02Tuto.html");
		}
	};



    // Wait for Cordova to load    //    
	document.addEventListener("deviceready", onDeviceReady, false);    // Cordova is ready    //    
	function onDeviceReady() {       
		alert("ŔĚžßČŁ");
		var element = document.getElementById('deviceProperties');        
		element.innerHTML = 'Device Name: '     + device.name     + '<br />' +                            
							'Device Cordova: '  + device.cordova + '<br />' +                            
							'Device Platform: ' + device.platform + '<br />' +                            
							'Device UUID: '     + device.uuid     + '<br />' +                            
							'Device Version: '  + device.version  + '<br />';   
		var Data=device.version.split(".");
		alert(Data[0] + "-" + Data[1] + "-" + Data[2]);
//			if(device.version
			if(parseInt(Data[0]) > 3)
			{
				alert("?????????????");
			}
			else
			{
				alert("??");
			}
		}   








   
          $(document).ready(function () {


              $(window).resize(function (t) {
                  var top = ($(window).height() - $('.jqmWindow').height()) / 2;
            
                  if (top < 0) { top = 0; }
                  $('.jqmWindow').css('left', ($(window).width() - $('.jqmWindow').width()) / 2 + 'px').css('top', top + 'px');
              });
              $('.jqmWindow').css('left', ($(window).width() - $('.jqmWindow').width()) / 2 + 'px');

              // alert('here');
              //$('#dStr').html(new Date().format("fullDate"));
              var cd = new Date();

              /*Defaults*/
              $('#dStr').html(dateFormat(cd, "fullDate"));
              $('#mon').val(dateFormat(cd, "mmm"));
              $('#day').val(dateFormat(cd, "dd"));
              $('#year').val(dateFormat(cd, "yyyy"));
              //$('#year').val(cd.getFullYear());

              /*Mods*/
              $('#pyear').tap(function () {
                  cd.setYear(cd.getFullYear() + 1);
                  // $('#year').val(cd.getFullYear());
                  updateF();
                  //$('#year').focus();
                  return false;
              });
              $('#pmon').tap(function () {
                  cd.setMonth(cd.getMonth() + 1);
                  updateF();
                  return false;
              });
              $('#pday').tap(function () {
                  cd.setDate(cd.getDate() + 1);
                  updateF();
                  return false;
              });
              $('#myear').tap(function () {
                  cd.setYear(cd.getFullYear() - 1);
                  updateF();
                  // $('#year').focus();
                  return false;
              });
              $('#mmon').tap(function () {
                  cd.setMonth(cd.getMonth() - 1);
                  updateF();
                  return false;
              });
              $('#mday').tap(function () {
                  cd.setDate(cd.getDate() - 1);
                  updateF();
                  return false;
              });

              /*Functions*/
              function updateF() {
                  $('#year').val(dateFormat(cd, "yyyy"));
                  $('#mon').val(dateFormat(cd, "mmm"));
                  $('#day').val(dateFormat(cd, "dd"));
                  $('#dStr').html(dateFormat(cd, "fullDate"));
                  $('#setfoc').focus();
                  return false;
              }
              $('#dialog').jqm({ modal: true });

              $('#show_date,#final').tap(function () {

                  //$('#divpd').dialog('open');
                  $('#dialog').jqmShow();
                  $('#setfoc').focus();
                  return false;
              });

              $('#close').tap(function () {

                  $('#dialog').jqmHide();
                  return false;
              });
              $('#set').tap(function () {

                  $('#final').val(dateFormat(cd, "mm/dd/yyyy"));
                  $('#dialog').jqmHide();
                  return false;
              });
          });
    

	/*뒤로 버튼을 누르면 이전페이지로 되돌아 간다.  */
	function fn_Back(){
		history.back();
	};



    function loadImages(sources, callback) {
        var images = {};
        var loadedImages = 0;
        var numImages = 0;
        // get num of sources
        for(var src in sources) {
          numImages++;
        }
        for(var src in sources) {
          images[src] = new Image();
          images[src].onload = function() {
            if(++loadedImages >= numImages) {
              callback(images);
            }
          };
          images[src].src = sources[src];
        }
      }
      var canvas = document.getElementById('myCanvas');
      var context = canvas.getContext('2d');

      var sources = {
        darthVader: '../PhoneImages/ADMIN/20130430142617system0.jpg' 
      };

      loadImages(sources, function(images) {
        context.drawImage(images.darthVader, 100, 30, 200, 137); 
      });

    













			jQuery.extend(jQuery.mobile.datebox.prototype.options, {
			useNewStyle: true
		});		
			
		
	///window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
	//var m_dbpath = window.localStorage.getItem("dbpath"); 
			
	//var machineid =  window.localStorage.getItem("mcd");
	//var workhistoryno = window.localStorage.getItem("histno");
	//var m_id   		= window.localStorage.getItem("id");
	//var partname = window.localStorage.getItem("partname");
	//var mname = window.localStorage.getItem("mname");

	var workhistoryno = "20111004A040001";
	var machineid = "A04";
	var m_id = "ADMIN";
	
	var Crno = "" ;
	var SaveFlag="0";

	var pictureSource;
	var destinationType;
	var imageURI;
	var picid ;
	var picturecnt = 0;
	var viewflag = 0;


	var curdate;
	var curtime
	var datenow;
	
	datenow = new Date();
    curdate = getDateStrFromDateObject(datenow);
	curtime = getTimeStrFromDateObject(datenow);

    document.addEventListener("deviceready", onStart, false);
    function onStart() {   
    	document.addEventListener("backbutton", onBackButton, true);
		pictureSource = navigator.camera.PitureSourceType;
		destinationType = navigator.camera.DestinationType;
    	};
    

        function onBackButton(){
			
			if(viewflag==0)
			{
        		navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
        				  , fn_confirmCallback_Exit
        				  , "이동"
        				  , "아니오,예");
			}
			if(viewflag==2)
			{
				//jQuery('#dialog').dialog().dialog('close');
				jQuery('#dialog').dialog().dialog('close');
				//$('#dialog').close(); 
				viewflag=0;
				Cancle();
			}
			if(viewflag==1)
			{	
				viewflag=0;
				jQuery('#dialog1').dialog().dialog('close');
				$('#view').attr('src',"");
			}
        };

        function fn_confirmCallback_Exit(button){
        		if(button == 2)
        			fn_Back();
        } ;

        function fn_alertCallback(){};	

        /*로딩 시작  */
        function fn_ShowLoading(){
		    	$.mobile.showPageLoadingMsg( "a", "Loading...", false );
        	    //$.mobile.showPageLoadingMsg();
			};
		/*로딩 종료  */	
		function fn_HideLoading(){
				$.mobile.hidePageLoadingMsg(); 
			};
		           	
    	
	window.onload = function()
	{
		//$("#img0")[0].innerHTML = "asdf";
		//fn_ShowLoading();
		$(document).ready(function()
		{	
			Setpicid();
			Init("start");
			Grid();
			//$("#part")[0].innerHTML = partname;
			//$("#mchname")[0].innerHTML = mname;
			
			
		});
		
		$('#sdate').trigger('datebox', {'method':'set', 'value':curdate});
		$('#stime').trigger('datebox', {'method':'set', 'value':curtime});

		fn_HideLoading();
	}
	
	function Init(flag)
	{
			var Data= '{"ID":' + "\""+ m_id + "\"," + "flag:" + "\""+ flag + "\"" +'}'
			$.ajax({
			url:"http://121.78.112.176:222/T_POP/Craim.aspx/init",
			//m_dbpath + "Craim.aspx/init",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:Data,
			type:"POST",
			success:function(data)
			{
				$(makeOption(data.d.mydt));
			},
			error:function(data) {
				//alert('접속오류');
				navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
				}
			});
	}

	function Setpicid()
	{
		//2134010  a03 20130403132122 01
		var now = new Date(); 
		var mm = (now.getMonth()+1)+"";
		var h=now.getHours()+"";
		var m=now.getMinutes()+"";
		var s=now.getSeconds()+""; 
		if(parseInt(mm) < 10)
		{
			mm= "0" + mm;
		}
		else
		{
			mm =mm;
		}
		if(parseInt(h) < 10)
		{
			h= "0" + h;
		}
		else
		{
			h =h;
		}
		if(parseInt(m) < 10)
		{
			m= "0" + m;
		}
		else
		{
			m =m;
		}
		if(parseInt(s) < 10)
		{
			s= "0" + s;
		}
		else
		{
			s =s;
		}

		picid = now.getFullYear() + "" + mm + "" + now.getDate() + "" + h+ "" + m + "" + s + machineid + m_id;
	}

	function Grid()
	{
		var jsonData= '{"workhistoryno":' + "\""+ workhistoryno 
						+ "\"," +"\""+ "machineid"+"\":" + "\""+ machineid 
						+ "\"," + "id:" + "\""+ m_id + "\""
						+'}'
		
			$.ajax({
			url:"http://121.78.112.176:222/T_POP/Craim.aspx/js_craimresult",
			//m_dbpath + "Craim.aspx/craimresult",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{
				$(makeControl(data.d.mydt));
			},
			error:function(data) {
				//alert('접속오류111');
				navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
				}
			});
	}

	//옵션 컨트롤
	function makeOption(dt)
	{
		$('#com')[0].options.length = 0;
		for (var row in dt)
		{
			//stringmem=dt[row]["MEMSHTNAME"];
			option = document.createElement( "option" );
			option.value = dt[row]["CRAIMCODE"];
			option.innerText = dt[row]["CRAIMNAME"];;
			$("#com").append(option);

		}
		
	   $("#com")[0].selectedIndex =  -1;
	   $("#com").selectmenu("refresh");
	  // $('#com').submit();
	}

	//제큐 그리드 만들기
	function makeControl(dt)
	{//alert('d.');
			
			jQuery("#list4").jqGrid({
			datatype: "local",
			colNames:['사고번호','사유','발생일시','클레임코드','상세','메모'],
			colModel:[
				{name:'CLEAIMNO',index:'CLEAIMNO', sorttype:"int",width:45,align:"center"},
				{name:'CRAIMNAME',index:'CRAIMNAME',width:65},
				{name:'IDT',index:'IDT',  align : 'center',width:60},
				{name:'CRAIMCODE',index:'CRAIMCODE',hidden:true},
				{name:'CRAIMDETAIL',index:'CRAIMDETAIL',hidden:true},
				{name:'MEMO',index:'MEMO',hidden:true}
			],
			//multiselect: true,
			//viewrecords: true,
			autowidth : true,
			height: "100%",
			onSelectRow: function(CLEAIMNO)
			{ 
				Setting();
			}//,
			//caption: "비가동실적관리"

			}).navGrid('#list4',{add:false,del:false,edit:false,position:'right'}); 

			var Data = new Array();
			for(row in dt)
			{
				Data[row]={CLEAIMNO:dt[row]["CLEAIMNO"],CRAIMNAME:dt[row]["CRAIMNAME"],IDT:dt[row]["IDT"],
				CRAIMCODE:dt[row]["CRAIMCODE"],CRAIMDETAIL:dt[row]["CRAIMDETAIL"],MEMO:dt[row]["MEMO"]};
			}

			var mydata = [Data];
			for(var i=0;i<=mydata.length;i++)
			{
				jQuery("#list4").jqGrid('addRowData',i+1,mydata[i]);
			}
			//jQuery("#list4").hideCol("BADCODE");
	}

	function Setting()
	{
		$("#stats")[0].innerHTML="수정";
		SaveFlag="1";
		var id = jQuery("#list4").jqGrid('getGridParam','selrow');
		var ret = jQuery("#list4").jqGrid('getRowData',id);
		var IDT = ret.IDT.split(" ");
		$('#sdate').trigger('datebox', {'method':'set', 'value':(IDT[0])});
		$('#stime').trigger('datebox', {'method':'set', 'value':IDT[1]});
		$('#test').val(ret.CRAIMDETAIL);
		//alert($("#sdate").val());
		//alert($("#stime").val());
		//$("#bad").val((ret.QTY.replace(/\s+/, '')));
		$("#com").val(ret.CRAIMCODE); 
		$("#com").selectmenu('refresh');
		$("#detail")[0].innerHTML = ret.CRAIMDETAIL;
		$("#memo").val(ret.MEMO);
		Crno = ret.CLEAIMNO
		
		var i;
		for(i = 0; i<4; i++)
		{
			var tdid = "#img" + i;
			//$(tdid)[0].innerHTML = "";
			$(tdid).attr('src',"http://121.78.112.176:222/POP/html/images/image2_gray.png");
		}
		Setimg();
	}

	function Delete()
	{		
		//alert("h=> " + workhistoryno + ", s=> " + StopSeq);		
		if(machineid == "" || Crno == "" || Crno == 'undefined' || Crno == "0")
			return;
		
		navigator.notification.confirm("삭제하시겠습니까?"
				  , fn_Delete
				  , "삭제"
				  , "아니오,예");
	}
	
	function fn_Delete(button)
	{ 
		if(button == 2)
		{
			var jsonData = '{"machineid":' + "\""+ machineid 
							+ "\"," +"\""+ "Crno"+"\":" + "\""+ Crno 
							+ "\"," + "craimcode:" + "\""+ $("#com").val() + "\""
							+'}'
			$.ajax({
			url: "http://121.78.112.176:222/T_POP/Craim.aspx/js_delete",
			//m_dbpath + "StopResult.aspx/delete",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{
				//alert('삭제되었습니다.');
				navigator.notification.alert("삭제되었습니다.",fn_alertCallback, "알림","확인");
				jQuery("#list4").jqGrid('clearGridData');
				Grid();
				New();
			},
			error:function(data) {
				//alert('삭제에 실패하였습니다.');
				navigator.notification.alert("삭제를 실패하였습니다.",fn_alertCallback, "알림","확인");
				}
			});
			
		}
		else
		{
			 return;
		}
		//jQuery("#list4").jqGrid('clearGridData');
	}

	function Save()
	{
			var stime;
			var etime;
			 
			if($("#com").val() == null){
				navigator.notification.alert("사고사유를 선택하세요.",fn_alertCallback, "알림","확인");
				return;		
			}
								
			stime = $("#sdate").val() + " " + $("#stime").val();
			

			var jsonData='{"workhistoryno":' + "\""+ workhistoryno 
						  + "\"," +"\""+ "Crno"+"\":" + "\""+ Crno 
						  + "\"," +"\""+ "craimcode"+"\":" + "\""+ $("#com").val()
						  + "\"," +"\""+ "machineid"+"\":" + "\""+  machineid
						  + "\"," +"\""+ "stime"+"\":" + "\""+  stime
						  + "\"," +"\""+ "id"+"\":" + "\""+  m_id
						  + "\"," +"\""+ "memo"+"\":" + "\""+ $("#memo").val()
						  + "\"," + "saveflag:" + "\""+ SaveFlag + "\""
						  +'}'

			$.ajax({
			url: "http://121.78.112.176:222/T_POP/Craim.aspx/js_update",
			//m_dbpath + "StopResult.aspx/update",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{
				//if(data.d.mydt[0]["RESULT"] != "N")
				//{
					//alert('저장되었습니다.');
					navigator.notification.alert("저장되었습니다.",fn_alertCallback, "알림","확인");
					if(SaveFlag != "1")
					{
						Crno = data.d.mydt[0]["RESULT"];
					}
					picSave();
					jQuery("#list4").jqGrid('clearGridData');
					Grid();
				//}
			},
			error:function(data) {
				//alert('저장에 실패하였습니다.');
				navigator.notification.alert("저장에 실패하였습니다.",fn_alertCallback, "알림","확인");
				}
			});
	}

	function New()
	{		
		var i;
		for(i = 0; i<4; i++)
		{
			var tdid = "#img" + i;
			//$(tdid)[0].innerHTML = "";
			$(tdid).attr('src',"http://121.78.112.176:222/POP/html/images/image2_gray.png");

		}
		
		Init("start"); //데릭토리 사진 삭제를 위해

		picturecnt=0;

		SaveFlag="0";
		Crno="";
		jQuery("#list4").resetSelection();
		$("#com")[0].selectedIndex =  -1;
		$("#com").selectmenu("refresh");
		$("#stats")[0].innerHTML="신규";
		$("#detail")[0].innerHTML = "";
		$('#sdate').trigger('datebox', {'method':'set', 'value':curdate});
		$('#stime').trigger('datebox', {'method':'set', 'value':curtime});
		//$("#memo").val() ="";
	}
	
	 /*뒤로 버튼을 누르면 이전페이지로 되돌아 간다.  */
    function fn_Back() {
  		location.replace("./Main.html");
    };
   
		function onPhotoURISuccess(imageURI)
		{
			var large = document.getElementById('largeImage');
			large.style.display = 'block';
			large.src = imageURI;
		};
		
		function getPhoto(source)
		{
			//포토앨범에서 가져오기
			navigator.camera.getPicture(onPhotoURISuccess,null,{quality:50,destinationType:destinationType.FILE_URI,sourceType:source});
		};
		function getCapture(source)
		{
			//사진찍어 바로 보여주기
			navigator.camera.getPicture(onPhotoURISuccess,null,{quality:50,destinationType:destinationType.FILE_URI,pictureSource:source,targetWidth:500,targetHeight:500,correctOrientation:true});
		};

				//사진 업로드
		function SaveAction()
		{
			imageURI = document.getElementById('largeImage').src
			var options = new FileUploadOptions(); 
			options.fileKey="file"; 
			options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1); 
			options.mimeType="image/jpeg"; 
			
			var params = new Object(); 
			params.value1 = picid+picturecnt+".jpg"; 
			params.value2 = m_id; 
			
			options.params = params; 

				var ft = new FileTransfer(); 
				//"http://121.78.112.176:222/POP/Craim.aspx/delete",POP\PhoneImages
				ft.upload(imageURI, "http://121.78.112.176:222/T_POP/imageTransfer.aspx",onSucc , onFail, options);
		};
		function onSucc()
		{
			//alert('사진 업로드 성공');
			++picturecnt;
			if(picturecnt>4)
			{		
				navigator.notification.alert("4장이후의 사진 업로드는 무시됩니다.",fn_alertCallback, "알림","확인");	
			}
			else
			{
				navigator.notification.alert("사진을 업로드 하였습니다.",fn_alertCallback, "알림","확인");
				alert(picturecnt);
			}
		};
		function onFail(message)
		{
			alert('사진 업로드 실패' + ' ' + message);
			
		};
		
		//DB에 있는 사진 갯수 셋팅
		function Setimg()
		{
			/*var imgid1 = m_id + "0.jpg"
			var imgid2 = m_id + "1.jpg"
			var imgid3 = m_id + "2.jpg"
			var imgid4 = m_id + "3.jpg"
			$('#img1').attr('src',"http://121.78.112.176:222/POP/PhoneImages/ADMIN/"+ imgid1);
			$('#img2').attr('src',"http://121.78.112.176:222/POP/PhoneImages/ADMIN/"+ imgid2);
			$('#img3').attr('src',"http://121.78.112.176:222/POP/PhoneImages/ADMIN/"+ imgid3);
			$('#img4').attr('src',"http://121.78.112.176:222/POP/PhoneImages/ADMIN/"+ imgid4);*/
			var jsonData='{"Crno":' + "\""+ Crno 
						  + "\"," +"\""+ "id"+"\":" + "\""+ m_id 
						  + "\"," + "pid:" + "\""+ picid + "\""
						  +'}'


			$.ajax({
			url: "http://121.78.112.176:222/T_POP/Craim.aspx/js_picDbcnt",
			//m_dbpath + "StopResult.aspx/update",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{
				setpicCnt(data.d.mydt);
			},
			error:function(data) {
				//alert('저장에 실패하였습니다.');
				navigator.notification.alert("사진 조회에 실패하였습니다2222.",fn_alertCallback, "알림","확인");
				}
			});

		};
		
		function setpicCnt(dt)
		{
			var i;
			picturecnt = 0;
			for(i = 0; i<4; i++)
			{
				var tdid = "#img" + i;
				//$(tdid)[0].innerHTML = "";
				$(tdid).attr('src',"http://121.78.112.176:222/POP/html/images/image2_gray.png");
			}
			for(var row in dt)
			{
				var tdid = "#img" + row;
				//$(tdid)[0].innerHTML = "★";
				$(tdid).attr('src',"http://121.78.112.176:222/POP/html/images/image.png");
				
				picturecnt++;
			}
			
		};

		//사진 저장
		function picSave()
		{
			var jsonData='{"Crno":' + "\""+ Crno 
						  + "\"," +"\""+ "id"+"\":" + "\""+ m_id 
						  + "\"," + "pid:" + "\""+ picid + "\""
						  +'}'

			$.ajax({
			url: "http://121.78.112.176:222/T_POP/Craim.aspx/js_picsave",
			//m_dbpath + "StopResult.aspx/update",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{
				New();
			},
			error:function(data) {
				//alert('저장에 실패하였습니다.');
				navigator.notification.alert("저장에 실패하였습니다.",fn_alertCallback, "알림","확인");
				}
			});
	
		};
		
		//팝업 닫기 버튼 누를때 서버에 있는 사진 갯수 셋팅
		function Cancle()
		{
			/*for(i=0;i<picturecnt;i++)
			{
				var tdid = "#img" + i;
				$(tdid)[0].innerHTML = "★";
			}*/
			    var cnt;
				var jsonData='{"Crno":' + "\""+ Crno 
				  + "\"," +"\""+ "id"+"\":" + "\""+ m_id 
				  + "\"," + "pid:" + "\""+ picid + "\""
				  +'}'

				$.ajax({
				url: "http://121.78.112.176:222/T_POP/Craim.aspx/js_piccnt",
				//m_dbpath + "StopResult.aspx/update",
				contentType:"Application/json; charset=utf-8",
				dataType:"json",
				data:jsonData,
				type:"POST",
				success:function(data)
				{
					cnt = data.d.mydt[0]["RESULT"];
					for(i=0;i<cnt;i++)
					{
						//$('#img0').attr('src',"http://121.78.112.176:222/POP/html/images/appearance.png");
						//$('#img1').attr('src',"http://121.78.112.176:222/POP/html/images/image.png");
						var tdid = "#img" + i;
						//$(tdid)[0].innerHTML = "★";
						$(tdid).attr('src',"http://121.78.112.176:222/POP/html/images/image.png");
					}
				},
				error:function(data) {
					//alert('저장에 실패하였습니다.');
					navigator.notification.alert("네트워크 상태가 올바르지 않습니다.",fn_alertCallback, "알림","확인");
					}
				});
		};

	 
		function Picdel()
		{
			if(document.getElementById("img0").src == "http://121.78.112.176:222/POP/html/images/image2_gray.png")
			{
				navigator.notification.alert("사진이 없습니다.",fn_alertCallback, "알림","확인");
				return;
			}
			else
			{
				navigator.notification.confirm("첨부사진은 순차적으로 삭제 됩니다. 사진을 삭제하시겠습니까?"
				, fn_Picdel
				, "삭제"
				, "아니오,예");
			 }
		};
		
		//사진삭제하기
		function fn_Picdel(button)
		{
			if(button == 2)
			{
				var jsonData='{"Crno":' + "\""+ Crno 
							  + "\"," +"\""+ "id"+"\":" + "\""+ m_id 
							  + "\"," + "pid:" + "\""+ picid + "\""
							  +'}'

				$.ajax({
				url: "http://121.78.112.176:222/T_POP/Craim.aspx/js_picdel",
				//m_dbpath + "StopResult.aspx/update",
				contentType:"Application/json; charset=utf-8",
				dataType:"json",
				data:jsonData,
				type:"POST",
				success:function(data)
				{
					navigator.notification.alert("사진이 삭제되었습니다.",fn_alertCallback, "알림","확인");
					Setimg();
					picturecnt--;
				},
				error:function(data) {
					//alert('저장에 실패하였습니다.');
					navigator.notification.alert("저장에 실패하였습니다.",fn_alertCallback, "알림","확인");
					}
				});
			}
	
		};

		
		function Picset(num)
		{
			var img = "img" + num;
			var imgid1 = picid + num +".jpg"
			
			if(document.getElementById(img).src == "http://121.78.112.176:222/POP/html/images/image2_gray.png")
			{
				navigator.notification.alert("이미지를 등록해주세요.",fn_alertCallback, "알림","확인");
			}
			else
			{
				var jsonData='{"Crno":' + "\""+ Crno 
							  + "\"," +"\""+ "id"+"\":" + "\""+ m_id 
							  + "\"," + "seq:" + "\""+ num 
							  + "\"," + "pid:" + "\""+ picid + "\""
							  +'}'

						$.ajax({
						url: "http://121.78.112.176:222/T_POP/Craim.aspx/js_picSelect",
						//m_dbpath + "StopResult.aspx/update",
						contentType:"Application/json; charset=utf-8",
						dataType:"json",
						data:jsonData,
						type:"POST",
						success:function(data)
						{
							alert(data);
							alert(imgid1);
							viewflag = 1;
							$.mobile.changePage('#dialog1', 'dialog', true, true);
							$('#view').attr('src',"http://121.78.112.176:222/POP/PhoneImages/ADMIN/"+ imgid1);
							//$('#view').attr('src',"http://121.78.112.176:222/POP/PhoneImages/ADMIN/20130429154808A04ADMIN1.jpg");
						},
						error:function(data) {
							//alert('저장에 실패하였습니다.');
							navigator.notification.alert("사진조회에 실패하였습니다.",fn_alertCallback, "알림","확인");
							}
						});			
			}

			// $.mobile.changePage('#dialog1', {transition: 'popup', role: 'dialog'});  
			//$('#view').attr('src',"http://121.78.112.176:222/POP/PhoneImages/ADMIN/20130426143002A04ADMIN0.jpg");
			//$.mobile.changePage('#dialog1', 'dialog', true, true);
			//$.mobile.changePage('#dialog1', 'dialog', true, true);
		
		};
		
		function view()
		{
			viewflag=0;
			$('#view').attr('src',"");
			//$("#dialog").show();
		};
		
		function viewcamera()
		{
			viewflag=2;
			//$("#dialog").show();
		};








	var CenterId=new Array();
	var CenterName=new Array();
	var configWriteFlag = 0;
	
	//window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
	var m_dbpath = window.localStorage.getItem("dbpath"); 
	var m_beforform = window.localStorage.getItem("form");
	var m_workFlag	= window.localStorage.getItem("workflag");//생산실적 입력방법
	window.localStorage["pagename"] = "config.html";

	document.addEventListener("deviceready",onStart,false);
	
	function onStart()
	{	
		fn_BackButton();
		$(document).ready(function()
		{	
			var Data='{"start":' +"\"" +'1'+"\""+ '}';
			$.ajax({
			url: m_dbpath + "Config.aspx/place",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:Data,
			type:"POST",
			success:function(data)
			{
				$(makeOption(data.d.mydt));
				checkFileSystem();
			},
			error:function(data) {navigator.notification.alert("접속오류.",fn_alertCallback, "오류","확인"); }
			});
			
		});
		//checkFileSystem();		
		
	};
	
	function fn_BackButton(){
		document.addEventListener("backbutton", fn_Back , true);
	};
	
	function fn_Back(){
		if(m_beforform == "Login")
			location.replace("./Login.html");
		else
			location.replace("./Menu.html");
	};
	function fn_alertCallback(){};		
	
	
	 
	window.onload = function()
	{

	};
	
		//옵션 컨트롤
	function makeOption(dt)
	{
		for(var h=0; h<2; h++)
		{
			var option = document.createElement( "option" );
			var option3 = document.createElement( "option" );
			option.value = h+"";
			option3.value = h+"";
			if(h==0)
			{
				option.innerText = "단일실적";
				option3.innerText = "수동 투입";
			}
			else
			{
				option.innerText = "쿼터실적";
				option3.innerText = "전 작업자 투입(자동)";
			}
			$("#result").append(option);
			$("#worker").append(option3);
		}
		
		for (var row in dt)
		{
			option = document.createElement( "option" );
			option.value = dt[row]["CENTERID"];
			option.innerText = dt[row]["CENTERNAME"];
			$("#center").append(option);
		}
		
		$("#result")[0].selectedIndex =  -1;
		$("#center")[0].selectedIndex = -1;
		$("#worker")[0].selectedIndex = -1;	

		$("#result").selectmenu('refresh', true);
		$("#center").selectmenu('refresh', true);
		$("#worker").selectmenu('refresh', true);
	};
	
	function save()
	{	
		
		window.localStorage["center"] 			= $("#center").val();
		window.localStorage["workflag"] 		= $("#result").val();
		window.localStorage["workresultstart"] 	= "";
		window.localStorage["manualtime"] 		= "";
		window.localStorage["autoworkerretuip"] = $("#worker").val();
		configWriteFlag = "1";
		//navigator.notification.alert("저장 시작.",fn_alertCallback, "","확인");
		checkFileSystem();
		
	};

	//document.addEventListener("deviceready",onStart,false);
	function checkFileSystem()
	{
		//alert("checkFileSystem");
		 
		 window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
		//window.requestFileSystem(type, size, successCallback, opt_errorCallback) 
		// alert("checkFileSystem1");
	};

	function gotFS(fileSystem)
	{		//폴더부터 검사
			//alert("gotFS");
			rootDir = fileSystem.root;
			fileSystem.root.getDirectory("GSmartSPOP",{create:true},gotDirEntry,fail);
	}

	function gotDirEntry(dirEntry)
	{
		//alert("gotDirEntry");
		dirEntry.getFile("setting.txt",{create:true},gotFileEntry,fail);			
	};

	function gotFileEntry(fileEntry)
	{
		if(configWriteFlag==0)
		{			
			fileEntry.file(readFile,fail);
			configWriteFlag=1;		
		}
		else
		{ 
			//navigator.notification.alert("저장 진행.",fn_alertCallback, "저장","확인");
			fileEntry.createWriter(writeFile,fail);
		}
	};

	function fail(error)
	{
		alert(error.code);
	};

	function writeFile(file)
	{
		if(configWriteFlag>=1)
		{
			//alert("저장이 완료되었습니다.");	
			navigator.notification.alert("저장이 완료되었습니다.",fn_alertCallback,"저장","확인");
		}
		//file 생성시 exclusive를 설정하지 않으면 새로 갱신한다.
		var fileTxt =$("#center").val()+','+ $("#result").val()+','+"0"+','+ "0" +','+$("#worker").val() 
 		//alert(fileTxt);
		file.write(fileTxt);
				
		//navigator.notification.alert("저장이 완료되었습니다.1",fn_alertCallback, "","확인1");
	};

	function readFile(file)
	{
		var reader = new FileReader();
		reader.onloadend = function(evt)
		{
			var getread = evt.target.result;
			read = getread;
			
			if(read == null)
			{
				//alert('로그인 진행바랍니다.');
				return;
			}
			else
			{	
				show();
			}
		}
		reader.readAsText(file);
	};

	function show()
	{
		var Data=read.split(",");
		if(Data[0]!=null)
		{
			$("#center").val(Data[0]);
		}
		if(Data[1]!=null)
		{
			$("#result").val(Data[1]);
		}
		if(Data[2]!=null)
		{
			//$("#start").val(Data[2]);
		}
		if(Data[3]!=null)
		{
			//$("#time").val(Data[3]);
		}
		if(Data[4]!=null)
		{
			$("#worker").val(Data[4]);
		}
		$("#center").selectmenu('refresh', true);
		$("#result").selectmenu('refresh', true);
		//$("#start").selectmenu('refresh', true);
		//$("#time").selectmenu('refresh', true);
		$("#worker").selectmenu('refresh', true);
	};


    function fn_Manual() {
        	location.replace("./help/ConfigManual.html");
    };

	function fn_Tuto()
	{
		if(m_workFlag == "0" || m_workFlag == "" || m_workFlag==null)
		{//단일실적
			location.replace("./help/WorkResult01Tuto.html");
		}
		else if(m_workFlag == "1")
		{//쿼터실적
			location.replace("./help/WorkResult02Tuto.html");
		}
	};



    // Wait for Cordova to load    //     document.addEventListener("deviceready", onDeviceReady, false);    // Cordova is loaded and it is now safe to make calls Cordova methods    //    function onDeviceReady() {        checkConnection();    }    function checkConnection() {        var networkState = navigator.network.connection.type;        var states = {};        states[Connection.UNKNOWN]  = 'Unknown connection';        states[Connection.ETHERNET] = 'Ethernet connection';        states[Connection.WIFI]     = 'WiFi connection';        states[Connection.CELL_2G]  = 'Cell 2G connection';        states[Connection.CELL_3G]  = 'Cell 3G connection';        states[Connection.CELL_4G]  = 'Cell 4G connection';        states[Connection.NONE]     = 'No network connection';        alert('Connection type: ' + states[networkState]);    }    






//0) 컨트롤별 변수 선언하기

var data1,data2,data3, data4, data5, data6, data7, data8, data9, data10, data11,data12;

var db;	
var sql = "";
var actiongbn = "";

var m_name, m_id,m_pass, m_empid, m_mcd, m_mname, m_workers;
var m_odrkey, m_workdate, m_partcode, m_partname, m_partspec, m_workqty;
var m_statusname, m_status, m_worderno, m_wipseq, m_lotno, m_histno;
var m_autogoodqty, m_goodqty, m_badqty;

var m_center;			//작업공정
var m_workFlag;			//생산실적 입력방법
var m_workResultStart;	//실적 저장시 자동 재시작 구분
var m_autoWorkerReTuip;	//자동시작 시 이전작업자 자동 투입
var m_setimeManualInput; //작업의 시작/종료 시 시간의 수동입력
  

PhoneGap_init();

function PhoneGap_init() {   
        document.addEventListener("deviceready", onDeviceReady, false);
   
};
 
function onDeviceReady() {	
 
    BackButton();
};
 

function BackButton(){
   document.addEventListener("backbutton", onBackButton, true);
};
 

//alert 콜백 함수
function fn_alertCallback(){};

/*프로그램 종료  */
function fn_Exit()
{ 	
	navigator.notification.confirm("프로그램을 종료하시겠습니까?"
			  , fn_confirmCallback_Exit
			  , "종료"
			  , "아니오,예");		    
};

function onBackButton(){
	navigator.notification.confirm("프로그램을 종료하시겠습니까?"
			  , fn_confirmCallback_Exit
			  , "종료"
			  , "아니오,예");
};

function fn_confirmCallback_Exit(button){
		if(button == 2)
			navigator.app.exitApp();
} ;
 
window.onload = function(){ 	
	fn_Init();	
	//fn_ListViewTitle();

};
		
function fn_Init(){ 		
	
	// data1 = document.getElementById("div_content").document.getElementById("d_data0").document.getElementById("data0").document.getElementById("tddata1");
	// alert(data1.innerHTML);

	 //alert($("#tddata1")[0].innerHTML); 	 
	//=> 위 두가지 유형이 동일한 값 가져옴.
	//alert($("#tddata1")[0].innerHTML);
		
	m_name    	= window.localStorage.getItem("name");
	m_id   		= window.localStorage.getItem("id");
	m_pass   	= window.localStorage.getItem("pass");	
	m_empid   	= window.localStorage.getItem("empid");
	
	m_mcd       = window.localStorage.getItem("mcd");
	m_mname     = window.localStorage.getItem("mname");
	actiongbn   = window.localStorage.getItem("actiongbn");
	
	m_center	= window.localStorage.getItem("center");//작업공정
	m_workFlag	= window.localStorage.getItem("workflag");//생산실적 입력방법
	m_workResultStart	= window.localStorage.getItem("workresultstart");//실적 저장시 자동 재시작 구분
	m_autoWorkerReTuip	= window.localStorage.getItem("autoworkerretuip");//자동시작 시 이전작업자 자동 투입
	
	m_center = '100';
	/*0: 	단일실적 입력 (실적 입력화면에서 실적내역을 조회하여 보여준다.)
	  1:	쿼터별 실적 입력(입력되는 실적을 입력한다.)	  */
	m_workFlag = '0';
	/*0:실적 저장만 진행, 1:실적 저장 시 자동 작업 종료 및 재시작)  */
	m_workResultStart = '0';
	/*0:실적 저장 시 작업자 미투입(자동), 1:실적 저장 시 자동 작업 종료 및 재시작 의 경우 기존 작업자 자동 투입  */ 
	m_autoWorkerReTuip = '0';
	/*0: 작업 시작/종료시 자동 종료, 1:작업 시작/종료 시 수동입력 종료  */
	m_setimeManualInput = '0';
 	
	m_odrkey = window.localStorage.getItem("odrkey");
	m_workdate = window.localStorage.getItem("workdate");
	m_partcode = window.localStorage.getItem("partcode");
	m_partname = window.localStorage.getItem("partname");
	m_partspec = window.localStorage.getItem("partspec");
	m_workqty = window.localStorage.getItem("workqty");
	m_statusname = window.localStorage.getItem("statusname");
	m_status = window.localStorage.getItem("status");
	m_worderno = window.localStorage.getItem("worderno");
	m_wipseq = window.localStorage.getItem("wipseq"); 
	
	m_lotno = window.localStorage.getItem("lotno");
	m_histno = window.localStorage.getItem("histno");
	m_workers = window.localStorage.getItem("workers");
	m_autogoodqty = window.localStorage.getItem("autogoodqty");
	m_goodqty = window.localStorage.getItem("goodqty");
	m_badqty = window.localStorage.getItem("badqty");

	
	data1 = $("#tddata1")[0]; //설비명	
	data2 = $("#tddata2")[0]; //품목코드
	data3 = $("#tddata3")[0]; //품목명
	data4 = $("#tddata4")[0]; //규격
	data5 = $("#tddata5")[0]; //지시량
	data6 = $("#tddata6")[0]; //시작시간
	data7 = $("#tddata7")[0]; //작업자
	data8 = $("#tddata8")[0]; //상태
	
	data9 = $("#tddata9")[0]; //생산량
	data10 = $("#tddata10")[0]; //양품량
	data11 = $("#tddata11")[0]; //불량량
	data12 = $("#tddata12")[0]; //지시번호
	
	//1) 컨트롤 초기화
	fn_CtlInit();
	//alert(m_id + "," + m_pass + "," + m_empid + "," + m_name + "," + m_mcd + "," + m_mname );
 	
	if(actiongbn != "order"){
		//2) 데이터 조회
		fn_GetWorkData();	
	}
	
	
	
};

function fn_CtlInit()
{
	//1) 컨트롤 초기화
	if(m_mcd == '' || m_mcd == 'undefined'){
		data1.innerHTML = "";
		data2.innerHTML = "";
		data3.innerHTML = "";
		data4.innerHTML = "";
		data5.innerHTML = "";
		data6.innerHTML = "";
		data7.innerHTML = "";
		data8.innerHTML = "";
		
		data9.innerHTML = "0";
		data10.innerHTML = "0";
		data11.innerHTML = "0"; 
		data12.innerHTML = "";
	}
	else{		
		data1.innerHTML = m_mname;
		data2.innerHTML = m_partcode;
		data3.innerHTML = m_partname;
		data4.innerHTML = m_partspec;
		data5.innerHTML = m_workqty;
		data6.innerHTML = m_workdate;
		data7.innerHTML = m_workers;
		data8.innerHTML = m_statusname;
		
		data9.innerHTML = m_autogoodqty;
		data10.innerHTML = m_goodqty;
		data11.innerHTML = m_badqty; 
		data12.innerHTML = m_worderno;
		}
};

function fn_AllClear(){
	//data1.innerHTML = "";
	data2.innerHTML = "";
	data3.innerHTML = "";
	data4.innerHTML = "";
	data5.innerHTML = "";
	data6.innerHTML = "";
	data7.innerHTML = "";
	data8.innerHTML = "";
	
	data9.innerHTML = "0";
	data10.innerHTML = "0";
	data11.innerHTML = "0"; 
	data12.innerHTML = "";
	
	window.localStorage["odrkey"] 		= "";
	window.localStorage["workdate"] 	= "";
	window.localStorage["partcode"] 	= "";
	window.localStorage["partname"] 	= "";
	window.localStorage["partspec"] 	= "";
	window.localStorage["workqty"] 		= "";
	window.localStorage["statusname"] 	= "";
	window.localStorage["status"] 		= "";
	window.localStorage["worderno"] 	= "";
	window.localStorage["wipseq"] 		= "";
	window.localStorage["lotno"] 		= ""; 
	window.localStorage["histno"] 		= "";
	window.localStorage["workers"] 		= "";

	window.localStorage["autogoodqty"] 	= "0";
	window.localStorage["goodqty"] 		= "0";
	window.localStorage["badqty"] 		= "0"; 
	 
	m_lotno = "";
	m_histno = "";
	m_workers = "";	 
	m_odrkey = "";
	m_workdate = ""; 
	m_partcode = "";
	m_partname = "";
	m_partspec = "";
	m_workqty = ""
	m_statusname = "";
	m_status = "";
	m_worderno = "";
	m_wipseq = ""; 
	m_autogoodqty = "0";
	m_goodqty = "0";
	m_badqty = "0";
	
};
    
/*프로그램 종료  */
/* function fn_Exit(){
			navigator.notification.confirm('프로그램을 종료하시겠습니까?'
					,fn_Quit,
					'종료',
					'예,아니오');			    
		};
function fn_Quit(){
	 navigator.app.exitApp();	
} */
//////////////////////////////설비 선택////////////////////////
function fn_Machine(){
	window.localStorage["actiongbn"] = "machine";
	 //$.mobile.changePage($(document.location.href="./Machine.html"), {transition:"slide", reverse:false, changeHash:false} );
	/* $.mobile.changePage("./Machine.html",{
				transition:"slide",
				reverse: false,
				changeHash: true
				} 
			); */
	
	//$.mobile.changePage($(document.location.href="./Machine.html"), {transition:"slide",reverse:false, changeHash:true} );
	location.replace("./Machine.html");			
};

//////////////////////////////작업지시 선택////////////////////////
function fn_Worders(){
	if(m_mcd == '' || m_mcd == 'undefined')
		{
			//alert("설비를 선택하세요.");
			return;
		}
	
	window.localStorage["actiongbn"] = "order";
	
	/* $.mobile.changePage("./Orders.html",{
		transition:"slide",
		reverse: false,
		changeHash: true
		} 
	); */
	
	location.replace("./Orders.html"); 
};

//////////////////////////////작업시작////////////////////////
function fn_WorkStartStop(){
	//var btn_Job = document.getElementId("btn_job");
	if(data3.innerHTML == '' || data3.innerHTML == 'undefined')
		{
			alert("작업지시를 선택하세요.");
			return;
		}
	
	window.localStorage["actiongbn"] = "startstop";
	
	if(data8.innerHTML == '' || data8.innerHTML == '대기' || data8.innerHTML == '등록'|| data8.innerHTML == 'undefined'){
		//작업시작
		if(m_setimeManualInput == '1'){
			location.replace("./StartStopTime.html");
			return;
		}
		
		if (confirm("작업을시작하시겠습니까?") == false)
			return ;			
		else		 
			fn_Start(m_mcd, m_worderno, m_wipseq, m_setimeManualInput, "");
	}
	else{
		//작업종료
		if(m_setimeManualInput == '1'){
			location.replace("./StartStopTime.html");
			return;
		}
		
		if (confirm("작업을 종료하시겠습니까?") == false)
				return ;			
		else
			fn_End(m_mcd, m_worderno, m_wipseq, m_setimeManualInput, "",m_histno, m_lotno); 
		
		/* navigator.notification.confirm('작업을 종료하시겠습니까?'
				,fn_End(m_mcd, m_worderno, m_wipseq, m_setimeManualInput, "",m_histno, m_lotno),
				'작업종료',
				'예,아니오'); */
	}
	
	//데이터 기록 및 상태 변경
	//location.replace("./StartStopResult.html"); 
};
/*작업 종료 */
function fn_End(mcd, worderno, wipseq, sedtflag, setime, histno, lotno){
	json_param ='{"strMachine":' + "\""+ mcd 		+ "\"," 
		        + "strWorderNo:" + "\""+ worderno 	+ "\","
		        + "strWipSeq:"   + "\""+ wipseq 	+ "\"," 
		        + "strSeDtFlag:" + "\""+ sedtflag 	+ "\","
		        + "strSe_time:"  + "\""+ setime 	+ "\"," 
		        + "strHistno:"   + "\""+ histno 	+ "\"," 
		        + "strLotno:"    + "\""+ lotno 		+ "\"" +'}';
	$.ajax({
	url:"http://121.78.112.176:222/POP/PorductReturnToJson.aspx/js_WorkEnd",
	contentType:"Application/json; charset=utf-8",
	dataType:"json",
	data:json_param,
	type:"POST",
	success:function(data)
		{
		    if(data.d.mydt[0]["FLAG"] == 'OK') 
				fn_AllClear();
		    else{
		    	alert("작업을 종료하지 못했습니다.");
		    }
			return;		 
		},
	error:function(data) {
			alert('네트워크 상에 문제가 발생되었습니다.');		
		}
	}); 	
};

/*작업 시작  */
function fn_Start(mcd,worderno,wipseq,sedtflag,setime){
	json_param ='{"strMachine":' + "\""+ mcd 		+ "\"," 
		        + "strWorderNo:" + "\""+ worderno 	+ "\","
		        + "strWipSeq:" 	 + "\""+ wipseq 	+ "\"," 
		        + "strSeDtFlag:" + "\""+ sedtflag 	+ "\"," 
		        + "strSe_time:"  + "\""+ setime	 	+ "\"" +'}';
	$.ajax({
	url:"http://121.78.112.176:222/POP/PorductReturnToJson.aspx/js_workstart",
	contentType:"Application/json; charset=utf-8",
	dataType:"json",
	data:json_param,
	type:"POST",
	success:function(data)
	{
		fn_SetData(data);
		
		return;		 
	},
	error:function(data) {alert('네트워크 상에 문제가 발생되었습니다.');
		fn_CtlInit();
	}
	}); 
};


//////////////////////////////작업자 투입////////////////////////
function fn_Worker(){
	if(m_histno == '' || m_histno == 'undefined')
	{
		alert("작업을 시작하세요.");
		return;
	}
	
	//작업자 투입화면 이동
	/* $.mobile.changePage("./Worker.html",{
		transition:"slide",
		reverse: false,
		changeHash: true
		} 
	); */
	window.localStorage["actiongbn"] = "worker";
	location.replace("./Worker.html"); 
}
//////////////////////////////생산실적 등록////////////////////////
function fn_WorkResult(){
	if(m_histno == '' || m_histno == 'undefined')
	{
		alert("작업을 시작하세요.");
		return;
	}
	window.localStorage["actiongbn"] = "workresult";
	//작업실적 입력화면으로 이동
	if(m_workFlag == "0"){//단일실적
		location.replace("./WorkResult01.html");
	}
	else if(m_workFlag == "1"){//쿼터실적
		location.replace("./WorkResult02.html");
	}
};
//////////////////////////////불량실적 등록////////////////////////
function fn_BadResult(){
	if(m_histno == '' || m_histno == 'undefined')
	{
		alert("작업을 시작하세요.");
		return;
	}
	
	//불량실적 등록화면 이동
	/* $.mobile.changePage("./BadResult.html",{
		transition:"slide",
		reverse: false,
		changeHash: true
		} 
	); */
	window.localStorage["actiongbn"] ="badresult"; 
	location.replace("./BadResult.html"); 
};
 
//////////////////////////////비가동 실적 등록////////////////////////
function fn_StopResult(){
	if(m_histno == '' || m_histno == 'undefined')
	{
		alert("작업을 시작하세요.");
		return;
	}
	
	// 비가동실적 등록화면 이동
	/* $.mobile.changePage("./StopResult.html",{
		transition:"slide",
		reverse: false,
		changeHash: true
		} 
	); */
	window.localStorage["actiongbn"] ="stopresult"; 
	location.replace("./StopResult.html"); 
};

//////////////////////////////데이터 조회////////////////////////
function fn_GetWorkData()
{			//var btn_Job = document.getElementById("btn_job");	 	
			var json_param = '';	
			
			if(m_mcd =='undefined' || m_mcd == 'null')
				m_mcd='';
			
			if(m_empid == 'undefined')
				m_empid = window.localStorage.getItem("empid");
			 if(m_mcd == '')
				{
				   alert("설비를 선택하세요.");
				  return;
				} 
		$(document).ready(function()
		{	 
			
			json_param ='{"machine":' 	+ "\"" + m_mcd 		+ "\"," 
			            + "empid:" 	    + "\"" + m_empid 	+ "\","				
				        + "histno:" 	+ "\"" + m_histno 	+ "\"" +'}';
			$.ajax({
			url:"http://121.78.112.176:222/POP/PorductReturnToJson.aspx/workinfo",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:json_param,
			type:"POST",
			success:function(data)
			{						
				 
				$(fn_SetData(data.d.mydt));
				/* if(data8.innerHTML == '' || data8.innerHTML == '대기' || data8.innerHTML == '등록'|| data8.innerHTML == 'undefined'){
					btn_Job.innerHTML = "작업시작";
				}
				else{
					btn_Job.innerHTML = "작업종료";
				} */
				
				return;				 
			},
			error:function(data) {alert('네트워크 상에 문제가 발생되었습니다.');
				fn_CtlInit();
			}
			});
		});	 
};

/*데이터 변수보관, 화면셋팅, 메모리변수에 보관  */
function fn_SetData(dt){
	fn_AllClear();
	
	  for (var row in dt) {	
			m_histno 		=  dt[0]["WORKHISTORYNO"];
			m_lotno			=  dt[0]["LOTNO"];
			m_partcode 		=  dt[0]["PARTCODE"];
			m_partname		=  dt[0]["PARTNAME"];
			m_partspec		=  dt[0]["SPEC"];
			m_workqty		=  dt[0]["WORKQTY"];
			m_workdate		=  dt[0]["SDATE"];
			m_workers		=  dt[0]["WORKERS"];
			m_status		=  dt[0]["WORK_STATUS"];
			m_statusname	=  dt[0]["STATUS"];
			m_autogoodqty	=  dt[0]["AUTOGOODQTY"];
			m_goodqty		=  dt[0]["GOODQTY"];
			m_badqty		=  dt[0]["BADQTY"];		
			m_worderno      =  dt[0]["WORDERNO"];
			m_wipseq		=  dt[0]["WIPSEQ"];
			
			data1.innerHTML = m_mname
			data2.innerHTML = m_partcode;
			data3.innerHTML = m_partname;
			data4.innerHTML = m_partspec;
			data5.innerHTML = m_workqty;
			data6.innerHTML = m_workdate;
			data7.innerHTML = m_workers;
			data8.innerHTML = m_statusname;				
			data9.innerHTML = m_autogoodqty;
			data10.innerHTML = m_goodqty;
			data11.innerHTML = m_badqty;
			data12.innerHTML = m_worderno
			
			window.localStorage["histno"] 		= m_histno;
			window.localStorage["lotno"] 		= m_lotno; 
			window.localStorage["partcode"]		= m_partcode;
			window.localStorage["partname"] 	= m_partname;
			window.localStorage["partspec"] 	= m_partspec;
			window.localStorage["workqty"] 		= m_workqty;
			window.localStorage["workdate"] 	= m_workdate;				
			window.localStorage["workers"] 		= m_workers;
			window.localStorage["status"] 		= m_status;
			window.localStorage["statusname"] 	= m_statusname;
			window.localStorage["autogoodqty"] 	= m_autogoodqty;
			window.localStorage["goodqty"] 		= m_goodqty;
			window.localStorage["badqty"] 		= m_badqty;	
			window.localStorage["worderno"]     = m_worderno;
			window.localStorage["wipseq"]		= m_wipseq
	  };
}

/* function fn_ListViewTitle(){
	var strTemp;
	var	arry = new Array("지시번호","설 비 명","품목코드","품 목 명","규  격","지 시 량","시작시간","작 업 자","상  태");
	 $("#listview1 li").remove();
     for (var i=0; i<=8; i++) {
         var li = document.createElement("li");
         $("#listview1").append(li); 
         strTemp = "<a  href='#' data-ajax='false'>" + arry[i]	+ "</a>";

     //list에 링크 유동적으로 추가
     	$(li).append(strTemp); 
         $("#listview1").listview("refresh");
     }
     
     var	arry1 = new Array("","","","","","","","","");
	 $("#listview2 li").remove();
     for (var i=0; i<=8; i++) {
         var li = document.createElement("li");
         $("#listview2").append(li); 
         strTemp = "<a  href='#'  data-ajax='false'>" + arry[i]	+ "</a>";

     //list에 링크 유동적으로 추가
     	$(li).append(strTemp); 
         $("#listview2").listview("refresh");
     }
};

function fn_ListViewData(){ 
	
}; */
		







    var m_empid, 	m_mcd, 		m_center;	//조회주건	
    var m_workqty, 	m_sdate,   	m_odrkey,	m_partcode, 	m_partname, m_partspec;; 
    var m_workers, 	m_status, 	m_statusname;
    var m_worderno, m_wipseq,   m_form;
    /*Array List 객체 선언*/
    var List = new aryList();
    
    m_empid 	= window.localStorage["empid"];
    m_mcd 		= window.localStorage["mcd"];
    m_mname 	= window.localStorage["mname"];
    m_statusname = window.localStorage["statusname"];
    m_form = window.localStorage["form"] ;
    m_center    = window.localStorage["center"];

	m_workFlag	= window.localStorage.getItem("workflag");//생산실적 입력방법

	window.localStorage["pagename"] 	= "Orders.html";

    window.localStorage["actiongbn"]="";
    
   // m_empid = 'ADMIN';
   // m_cd = 'A01';
   //alert (m_empid);
   
 	//window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
	var m_dbpath = window.localStorage.getItem("dbpath"); 
		

    document.addEventListener("deviceready", onStart, false);
    function onStart() {       
    	document.addEventListener("backbutton", onBackButton, true);	
    };
    

    function onBackButton(){
    	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
    			  , fn_confirmCallback_Exit
    			  , "이동"
    			  , "아니오,예");
    };

    function fn_confirmCallback_Exit(button){
    		if(button == 2)
    			fn_Back();
    			//navigator.app.exitApp();
    } ;

    function fn_alertCallback(){};	

    
    
    
    window.onload = function(){ 
   	 fn_GetOrdersData();
   	 
   	var mname = $("#mchname")[0] ;
   	mname.innerHTML = m_mname;

   };

    //Array List 객체 정의
    function aryList() {
        this.aryData = [];
    };
    function aryData(odrkey, workdate, partcode, partname,partspec, workqty, statusflag, status, worderno, wipseq) {
        this.odrkey 	= odrkey;
        this.workdate 	= workdate;
        this.partcode 	= partcode;
        this.partname 	= partname;
        this.partspec	= partspec;
        this.workqty 	= workqty;
        this.statusflag = statusflag;  	//상태코드
        this.status 	= status;		//상태명
        this.worderno 	= worderno;
        this.wipseq 	= wipseq;
    };

    /*설비를 조회하여 리스트에 뿌린다.  */
    //////////////////////////////데이터 조회////////////////////////
    function fn_GetOrdersData() {
        var json_param = '';
        if(m_empid == '')
            m_empid = window.localStorage.getItem("empid");
        
        $(document).ready(function() {  
        	//json_param ='{"machine":' + "\""+ m_mcd + "\"," + "empid:" + "\""+ m_empid + "\"" +'}';
            //json_param = '{"empid":' + "\"" + m_empid + "\"" + '}';
            json_param = '{"strEmpid":' + "\"" + m_empid + "\"," 
            	       + "strCenter:" + "\"" + m_center + "\"," 
            	       + "strMachine:" + "\"" + m_mcd + "\"" + '}';

            $.ajax({
                url: m_dbpath + "PorductReturnToJson.aspx/js_GetWorders",
                contentType: "Application/json; charset=utf-8",
                dataType: "json",
                data: json_param,
                type: "POST",
                success: function(data) {
                    fn_SetOrdersList(data.d); 
                    return;
                },
                error: function(data) {
                	//alert('네트워크 상에 문제가 발생되었습니다.');
                	navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
                	}
            });
        });
    };

    function fn_SetOrdersList(dt) {
        var strTemp, icnt;
        icnt = 0;
        
        //입고예정서 dtl 정보 셋팅
        $("#listview li").remove();
        for (var row in dt.mydt) {
            var li = document.createElement("li");
            $("#listview").append(li);
            icnt = icnt + 1
            /*ArrayList를 이용한 데이터 보관(배열 객체)  */
            //odrkey, workdate, partcode, partname, partspec,  workqty, statusflag, status, worderno, wipseq
            List.aryData.push(new aryData(dt.mydt[row]["ODR_KEY"]
                                         ,dt.mydt[row]["WORKDATE"]
							             ,dt.mydt[row]["PARTCODE"]
							             ,dt.mydt[row]["PARTNAME"]
							             ,dt.mydt[row]["PARTSPEC"]
							             ,dt.mydt[row]["WORKQTY"]
							             ,dt.mydt[row]["STATUSFLAG"]
							             ,dt.mydt[row]["STATUS"]
							             ,dt.mydt[row]["WORDERNO"]
							             ,dt.mydt[row]["WIPSEQ"]
                              ));
 
            
            strTemp = "<a  onClick=fn_SelectData('" + dt.mydt[row]["ODR_KEY"] + "')"
				+ " data-ajax='false'>"
				+ " <h3>지시번호 : "
					+ dt.mydt[row]["WORDERNO"] +"</h3>"
					+" <p class='li_clm'><strong>품목코드 : "+ dt.mydt[row]["PARTCODE"] +"</strong></p>"
					+" <p class='li_clm'>품 목 명 : " + dt.mydt[row]["PARTNAME"] +"</p>"
					+" <p class='li_clm'>품목규격 : " + dt.mydt[row]["PARTSPEC"] +"</p>"
					+" <p class='li_clm'>지시수량 : " + dt.mydt[row]["WORKQTY"] +" EA </p>"
					+" </a>";

            //list에 링크 유동적으로 추가
            $(li).append(strTemp);
            $("#listview").listview("refresh");
        }
        
        //alert(icnt);
        if(icnt == 0) 
        	$("#msg")[0].innerHTML = "조회된 작업지시가 없습니다.";
    };

    /*지시를 선택한 경우  */
    function fn_SelectData(odrkey) {        
        if(m_statusname == '작업중'){
        	//alert('새로운 작업을 선택할 수 없습니다(선택된 설비 작업중).');
        	navigator.notification.alert("새로운 작업을 선택할 수 없습니다(선택된 설비 작업중).",fn_alertCallback, "알림","확인");
        	return;
        }
        
        m_worderno = "";
        m_wipseq = "";
        window.localStorage["odrkey"] 		= "";
        window.localStorage["workdate"] 	= "";
        window.localStorage["partcode"] 	= "";
        window.localStorage["partname"] 	= "";
        window.localStorage["partspec"] 	= "";
        window.localStorage["workqty"] 		= "";
        window.localStorage["statusname"] 	= "";
        window.localStorage["status"] 		= "";
        window.localStorage["worderno"] 	= "";
        window.localStorage["wipseq"] 		= "";
        window.localStorage["lotno"] 		= ""; 
        window.localStorage["histno"] 		= "";
        window.localStorage["workers"] 		= "";

        window.localStorage["autogoodqty"] 	= "0";
        window.localStorage["goodqty"] 		= "0";
        window.localStorage["badqty"] 		= "0"; 
        window.localStorage["quarter"]		= "";
        window.localStorage["quartercd"]	= "";

        for (var i = 0; i < List.aryData.length; i++) {
            if (odrkey == List.aryData[i].odrkey) {                                
                m_odrkey =  List.aryData[i].odrkey;
                m_workdate =  List.aryData[i].workdate;
                m_partcode =  List.aryData[i].partcode;
                m_partspec =  List.aryData[i].partspec;
                m_partname =  List.aryData[i].partname;
                m_workqty =  List.aryData[i].workqty;
                m_statusname =  List.aryData[i].status; //상태명
                m_status =  List.aryData[i].statusflag;	//상태코드
                m_worderno =  List.aryData[i].worderno;
                m_wipseq =  List.aryData[i].wipseq;
                break;
           }
        }         

        window.localStorage["odrkey"] 		= m_odrkey;
        window.localStorage["workdate"] 	= "";//작업시작시간
        window.localStorage["partcode"] 	= m_partcode;
        window.localStorage["partspec"] 	= m_partspec;
        window.localStorage["partname"] 	= m_partname;
        window.localStorage["workqty"] 		= m_workqty;
        window.localStorage["statusname"] 	= m_statusname;
        window.localStorage["status"] 		= m_status;
        window.localStorage["worderno"] 	= m_worderno;
        window.localStorage["wipseq"] 		= m_wipseq;
        
        window.localStorage["actiongbn"]="order";
        
        fn_Back();
    };

 
    /*뒤로 버튼을 누르면 이전페이지로 되돌아 간다.  */
    function fn_Back() {
        //history.back();
        //$.mobile.changePage($(document.location.href = "./Main.html"), { transition: "slide", reverse: false, changeHash: true });
        if(m_worderno == "")
        	location.replace("./Machine.html");
        else
        	location.replace("./Main.html");
    };

    function fn_Manual() {
        	location.replace("./help/OrdersManual.html");
    };

	function fn_Tuto()
	{
		if(m_workFlag == "0" || m_workFlag == "" || m_workFlag==null)
		{//단일실적
			location.replace("./help/WorkResult01Tuto.html");
		}
		else if(m_workFlag == "1")
		{//쿼터실적
			location.replace("./help/WorkResult02Tuto.html");
		}
	}    






    var m_empid, 	m_mcd, 		m_center, m_screenWidth;	
    var m_viewFlag = 'S';
    /*Array List 객체 선언*/
    var List = new aryList();
    
    m_empid 	= window.localStorage["empid"];
    m_form = window.localStorage["form"] ;
    m_center    = window.localStorage["center"];
    
    m_center="";
    m_empid = "";
    
    window.localStorage["pagename"] = "MchMonitering.html";
    //alert("screen width =>" + screen.availWidth );
    m_screenWidth = screen.availWidth ;
 	window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
	var m_dbpath = window.localStorage.getItem("dbpath"); 
		

    document.addEventListener("deviceready", onStart, false);
    function onStart() {       
    	document.addEventListener("backbutton", onBackButton, true);	
    };
    

    function onBackButton(){
    	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
    			  , fn_confirmCallback_Exit
    			  , "이동"
    			  , "아니오,예");
    };

    function fn_confirmCallback_Exit(button){
    		if(button == 2)
    			location.replace("./MenuSearch.html"); 
    } ;

    function fn_alertCallback(){};	
    
    window.onload = function(){ 
    	fn_GetMoniteringData();
   };

    //Array List 객체 정의
    function aryList() {
        this.aryData = [];
    };
    function aryData(odrkey, 	workdate, 	partcode,	partname,
    				 partspec, 	workqty, 	statusflag, status, 
    				 worderno, 	wipseq,		machinecd,	machinename,
    				 goodqty,	badqty) {
        this.odrkey 	= odrkey;
        this.workdate 	= workdate;
        this.partcode 	= partcode;
        this.partname 	= partname;
        this.partspec	= partspec;
        this.workqty 	= workqty;
        this.statusflag = statusflag;  	//상태코드
        this.status 	= status;		//상태명
        this.worderno 	= worderno;
        this.wipseq 	= wipseq;
        this.machinecd 	= machinecd;
        this.machinename 	= machinename;
        this.goodqty 	= goodqty;
        this.badqty 	= badqty;
    };

    /*설비를 조회하여 리스트에 뿌린다.  */
    //////////////////////////////데이터 조회////////////////////////
    function fn_GetMoniteringData() {
        var json_param = ''; 
        	
        
            json_param = '{"strEmpid":' + "\"" + m_empid + "\","  
            	       + "strCenter:" + "\"" + m_center + "\"" + '}';
            	       
            $.ajax({
                url: m_dbpath + "PorductReturnToJson.aspx/js_GetMchMonitoring",
                contentType: "Application/json; charset=utf-8",
                dataType: "json",
                data: json_param,
                type: "POST",
                success: function(data) {
                	$(fn_SetMonitering(data.d));
                },
                error: function(data) {
                	alert('네트워크 상에 문제가 발생되었습니다.');
                	//navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
                	}
            });        
    };

    function fn_SetMonitering(dt) {
        var strTemp, icnt;
        var strLedName;
        var strSpace="";
        var strSpace1="";
        var iLoop = 0;
        
        //입고예정서 dtl 정보 셋팅
        $("#listview li").remove();
        for (var row in dt.mydt) {
            var li = document.createElement("li");
            $("#listview").append(li);

            /*ArrayList를 이용한 데이터 보관(배열 객체)  */
            //odrkey, workdate, partcode, partname, partspec,  workqty, statusflag, status, worderno, wipseq
            List.aryData.push(new aryData(dt.mydt[row]["ODR_KEY"]
                                         ,dt.mydt[row]["WORKDATE"]
							             ,dt.mydt[row]["PARTCODE"]
							             ,dt.mydt[row]["PARTNAME"]
							             ,dt.mydt[row]["PARTSPEC"]
							             ,dt.mydt[row]["WORKQTY"]
							             ,dt.mydt[row]["STATUSFLAG"]
							             ,dt.mydt[row]["STATUS"]
							             ,dt.mydt[row]["WORDERNO"]
							             ,dt.mydt[row]["WIPSEQ"]
							             ,dt.mydt[row]["MACHINECD"]
							             ,dt.mydt[row]["MACHINENAME"]
							             ,dt.mydt[row]["GOODQTY"]
							             ,dt.mydt[row]["BADQTY"]
                              ));
 
            switch(dt.mydt[row]["STATUSFLAG"]){
            case "0": {strLedName = "./images/led_Gray48.png"; break;}	//대기
            case "1": {strLedName = "./images/led_Green48.png"; break;}	//가동
            case "2": {strLedName = "./images/led_Red48.png"; break;}	//비가동
            case "3": {strLedName = "./images/led_Gray48.png"; break;}	//긴급
            }
            
            strSpace = "&nbsp;&nbsp;";
            strSpace1 = "&nbsp;&nbsp;";
            iLoop = 10 - dt.mydt[row]["GOODQTY"].length;
            for(var i=0; i <= iLoop; i++){
            	strSpace = strSpace + "&nbsp;";
            }
            
            iLoop = 10 - dt.mydt[row]["BADQTY"].length;
            for(var i=0; i <= iLoop; i++){
            	strSpace1 = strSpace1 + "&nbsp;";
            }
            
            if(m_viewFlag == 'S'){
	            if(m_screenWidth > 330){
	            strTemp = "<a href='#' style='padding: 0px 0px 0px 55px;'>"
	                    + "<img  style='padding: 7px 0px 0px 0px;' src= '" + strLedName + "'/>"
	                    + "<strong>설비명  : "
				        + dt.mydt[row]["MACHINENAME"] +"</strong>"
						+" <p style='margin-top:5px;'>품 목  명 : "+ dt.mydt[row]["PARTNAME"] +"</p>"
						+" <p>지시수량 : " + dt.mydt[row]["WORKQTY"] +" EA " + strSpace 
						+ "양품량 : " + dt.mydt[row]["GOODQTY"] + " EA " + strSpace1 
						+ "불량량 : " + dt.mydt[row]["BADQTY"] + " EA </p>"
						+" </a>";
	            }
	            else{
	            	strTemp = "<a href='#' style='padding: 0px 0px 0px 55px;'>"
	                    + "<img  style='padding: 10px 0px 0px 0px;' src= '" + strLedName + "'/>"
	                    + " <strong>설비명  : "
				        + dt.mydt[row]["MACHINENAME"] +"</strong>"
						+ " <p style='margin-top:5px;'>품 목  명 : " + dt.mydt[row]["PARTNAME"] +"</p>"
						+ " <p>지시수량 : " + dt.mydt[row]["WORKQTY"]  +" EA </p>" 
						+ " <p>양 품  량 : " + dt.mydt[row]["GOODQTY"]  + " EA " + strSpace1 
						+ "불량량 : "     + dt.mydt[row]["BADQTY"] + " EA </p>"
						+ " </a>";
	 
	            }
            }
            else{
            	 if(m_screenWidth > 330){
     	            strTemp = "<a href='#' style='padding: 0px 0px 0px 55px;'>"
     	                    + "<img  style='padding: 30px 0px 0px 0px;' src= '" + strLedName + "'/>"
     	                    + " <h3>설비명  : "
     				        + dt.mydt[row]["MACHINENAME"] +"</h3>"
     					    + " <p>지시번호 : "
     						+ dt.mydt[row]["WORDERNO"] +"</p>"
     						+" <p>품목코드 : "+ dt.mydt[row]["PARTCODE"] +"</p>"
     						+" <p>품 목  명 : " + dt.mydt[row]["PARTNAME"] +"</p>"
     						+" <p>품목규격 : " + dt.mydt[row]["PARTSPEC"] +"</p>"
     						+" <p>지시수량 : " + dt.mydt[row]["WORKQTY"] +" EA " + strSpace 
     						+ "양품량 : " + dt.mydt[row]["GOODQTY"] + " EA " + strSpace1 
     						+ "불량량 : " + dt.mydt[row]["BADQTY"] + " EA </p>"
     						+" </a>";
     	            }
     	            else{
     	            	strTemp = "<a href='#' style='padding: 0px 0px 0px 55px;'>"
     	                    + "<img  style='padding: 35px 0px 0px 0px;' src= '" + strLedName + "'/>"
     	                    + " <h3>설비명  : "
     				        + dt.mydt[row]["MACHINENAME"] +"</h3>"
     					    + " <p>지시번호 : "
     						+ dt.mydt[row]["WORDERNO"] +"</p>"
     						+ " <p>품목코드 : " + dt.mydt[row]["PARTCODE"] +"</p>"
     						+ " <p>품 목  명 : " + dt.mydt[row]["PARTNAME"] +"</p>"
     						+ " <p>품목규격 : " + dt.mydt[row]["PARTSPEC"] +"</p>"
     						+ " <p>지시수량 : " + dt.mydt[row]["WORKQTY"]  +" EA </p>" 
     						+ " <p>양 품  량 : " + dt.mydt[row]["GOODQTY"]  + " EA " + strSpace1 
     						+ "불량량 : "     + dt.mydt[row]["BADQTY"] + " EA </p>"
     						+ " </a>";
     	 
     	            }	
           	}
            	

            //list에 링크 유동적으로 추가
            $(li).append(strTemp);
            $("#listview").listview("refresh");
        } 
    };
 
 
    /*뒤로 버튼을 누르면 이전페이지로 되돌아 간다.  */
    function fn_Back() {  
      location.replace("./MenuSearch.html");
    };
    
    /*뒤로 버튼을 누르면 이전페이지로 되돌아 간다.  */
    function fn_Menu() {  
      location.replace("./MenuSearch.html");
    };    

    function fn_Manual() {  
      location.replace("./help/MchMoniteringManual.html");
    };    
    
	
    function fn_Detail(){
    	m_viewFlag = "D";
    	fn_GetMoniteringData();
    };
    
    function fn_Simple(){
    	m_viewFlag = "S";
    	fn_GetMoniteringData();
    };
    












	google.load("visualization", "1", {packages:["corechart"]}); 
	
    var m_empid, 	m_mcd, 		m_center;	//조회주건	
    var m_workqty, 	m_sdate,   	m_odrkey,	m_partcode, 	m_partname, m_partspec;; 
    var m_workers, 	m_status, 	m_statusname;
    var m_worderno, m_wipseq,   m_form;
    /*Array List 객체 선언*/
   // var List = new aryList();
    var m_workFlag	= window.localStorage.getItem("workflag");//생산실적 입력방법
	window.localStorage["pagename"] = "PalnAmount.html";

   m_empid 	= window.localStorage["empid"];
    /*m_mcd 		= window.localStorage["mcd"];
    m_mname 	= window.localStorage["mname"];
    m_statusname = window.localStorage["statusname"];
    m_form = window.localStorage["form"] ;
    m_center    = window.localStorage["center"];
    window.localStorage["actiongbn"]="";*/
    
   //m_empid = 'ADMIN';
   // m_cd = 'A01';
   //alert (m_empid);
   
 	//window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
    //var m_dbpath = window.localStorage.getItem("dbpath"); 
	
		
	var m_dbpath = 'http://121.78.112.176:222/POP/';
	var m_screenWidth = screen.availWidth ;

    document.addEventListener("deviceready", onStart, false);
    function onStart() {       
    	document.addEventListener("backbutton", onBackButton, true);
		var Data=device.version.split(".");
		//alert(Data[0] + "-" + Data[1] + "-" + Data[2]);
		if(parseInt(Data[0]) > 3)
		{
			//alert("가능합니다");
			$('#chart_div').css({'height':(($(document).height())-320)+'px'});
		}
		else
		{
			var addTable = document.getElementById("addTable");

			var str = ""
			str = "<table style='background-color:white;' width='100%' height='200px;' id ='see_chart'><tr><td width='10%'> 100 </td><td width='90%'><div><hr></div></td></tr><tr><td width='10%'> 80 </td><td			 width='90%'><div><hr></div></td></tr><tr><td width='10%'> 60 </td><td width='90%' align='center'><div>Android 3.0이상에서 지원하는 화면입니다.</div></td></tr><tr><td width='10%'> 40 </td><td width='90%'><div><hr></div></td>						</tr><tr><td width='10%'> 20 </td><td width='90%'><div><hr></div></td></tr><tr><td width='100%' align='center' colspan='2'>설비</td></tr></table>"		
			// 추가할 폼(에 들어갈 HTML)

			var addedDiv = document.createElement("div"); // 폼 생성
			addedDiv.innerHTML  = str; // 폼 Div안에 HTML삽입
			addTable.appendChild(addedDiv); // 삽입할 DIV에 생성한 폼 삽입
		}	

		$(document).ready(function()
		{	
			var Data='{"strEmpid":' +"\"" +m_empid+"\""+ '}';
			$.ajax({
			url: m_dbpath + "PlanAmount.aspx/js_machine",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:Data,
			type:"POST",
			success:function(data)
			{
				$(makeOption(data.d.mydt));
			},
			error:function(data) {
				//alert('접속오류');
				navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
				}
			});
		});

		$("input[id='radio4']").bind( "change", function(event, ui) {
			 document.getElementById("radio11").disabled = true;
			$('#radio11').attr("checked",false).checkboxradio("refresh");

		});

		$("input[id='radio1']").bind( "change", function(event, ui) {
			 if(document.getElementById("radio11").disabled == true)
			 {
				 document.getElementById("radio11").disabled = false;
				 $('#radio11').checkboxradio("refresh");
				 /*if(!$('input:radio[name=radio1]:checked').val()) 
				 {
					$('#radio11').attr("checked",true).checkboxradio("refresh");
				 }
				 else
				 {
					$('#radio11').attr("checked",false).checkboxradio("refresh");
				}*/
			 }

		});

		$("input[id='radio2']").bind( "change", function(event, ui) {
			 if(document.getElementById("radio11").disabled == true)
			 {
				 document.getElementById("radio11").disabled = false;
				 $('#radio11').checkboxradio("refresh");
				 /*if($('input[name=radio1]:checked').val()==undefined)
				 {
					$('#radio11').attr("checked",true).checkboxradio("refresh");
				 }
				 else
				 {
					$('#radio11').attr("checked",false).checkboxradio("refresh");
				}*/
			 }

		});

		$("input[id='radio3']").bind( "change", function(event, ui) {
			 if(document.getElementById("radio11").disabled == true)
			 {
				 document.getElementById("radio11").disabled = false;
				 $('#radio11').checkboxradio("refresh");
				 /*if($('input[name=radio1]:checked').val()==undefined)
				 {
					$('#radio11').attr("checked",true).checkboxradio("refresh");
				 }
				 else
				 {
					$('#radio11').attr("checked",false).checkboxradio("refresh");
				}*/
			 }

		});

    };
	

	//옵션 컨트롤
	function makeOption(dt)
	{
		for (var row in dt)
		{
			option = document.createElement( "option" );
			option.value = dt[row]["MACHINEID"];
			option.innerText = dt[row]["MACHINENAME"];
			$("#com").append(option);

		}
		
	   $("#com")[0].selectedIndex = 0;
	   $("#com").selectmenu("refresh");
	  // $('#com').submit();
	};

	function fn_Search()
	{
		var radio_val = $('input[name=radio]:checked').val();
		//alert('Radio Value: '+radio_val);
		var radio_val1 = $('input[name=radio1]:checked').val();
		//alert('Radio Value: '+radio_val1);
		if(radio_val1 == undefined)
		{
			navigator.notification.alert("조회조건을 선택해 주세요.",fn_alertCallback, "알림","확인");
		}
		else
		{
		  json_param = '{"strEmpid":' + "\"" + m_empid + "\"," 
            	       + "strMachine:" + "\"" + $("#com").val() + "\"," 
					   + "strFlag:" + "\"" + radio_val + "\"," 
            	       + "strFlag1:" + "\"" + radio_val1 + "\"" + '}';

            $.ajax({
                url: m_dbpath + "PlanAmount.aspx/js_Select",
                contentType: "Application/json; charset=utf-8",
                dataType: "json",
                data: json_param,
                type: "POST",
                success: function(data) {
					$(DrawLine(data.d.mydt));
                },
                error: function(data) {
                	//alert('네트워크 상에 문제가 발생되었습니다.');
                	navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
                	}
            });
		}
	};

	
		function DrawLine(dt)
		{
			if(dt.length==0)
			{
				navigator.notification.alert("데이터가 없습니다.",fn_alertCallback, "알림","확인");
			}
			var data = new google.visualization.DataTable();
			data.addColumn('string', '날짜');
			data.addColumn('number', '가동율(%)');
			data.addColumn('number', '달성율(%)');
			data.addColumn('number', '회수율(%)');

			data.addRows(dt.length);
			for (i = 0; i < dt.length; i++)
			{
				data.setValue(i, 0, dt[i]["WORKDATE"]);
				data.setValue(i, 1, dt[i]["GADONGRUL"]);
				data.setValue(i, 2, dt[i]["DALSUNGRUL"]);
				data.setValue(i, 3, dt[i]["HYUSURUL"]);
			}

			// Options
			var options = {
					seriesType: "bars" ,
					legend: {  position: 'top'  }
			};
			var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));       
			chart.draw(data, options);  

		}

    function onBackButton(){
    	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
    			  , fn_confirmCallback_Exit
    			  , "이동"
    			  , "아니오,예");
    };

    function fn_confirmCallback_Exit(button){
    		if(button == 2)
    			fn_Back();
    			//navigator.app.exitApp();
    } ;

    function fn_alertCallback(){};	


    /*뒤로 버튼을 누르면 이전페이지로 되돌아 간다.  */
    function fn_Back() {
        	location.replace("./MenuSearch.html");
    };

    function fn_Manual() {
        	location.replace("./help/PlanAmountManual.html");
    };

	function fn_Tuto()
	{
		if(m_workFlag == "0" || m_workFlag == "" || m_workFlag==null)
		{//단일실적
			location.replace("./help/WorkResult01Tuto.html");
		}
		else if(m_workFlag == "1")
		{//쿼터실적
			location.replace("./help/WorkResult02Tuto.html");
		}
	};    







//0) 컨트롤별 변수 선언하기

var data1,data2,data3, data4, data5, data6, data7, data8, data9, data10, data11,data12, data13;

var db;	
var sql = "";
var actiongbn = "";

var m_name, m_id,m_pass, m_empid, m_mcd, m_mname, m_workers;
var m_odrkey, m_workdate, m_partcode, m_partname, m_partspec, m_workqty;
var m_statusname, m_status, m_worderno, m_wipseq, m_lotno, m_histno, m_quarter, m_quartercd;
var m_autogoodqty, m_goodqty, m_badqty;

var m_codename;

var m_center;			//작업공정
var m_workFlag;			//생산실적 입력방법
//var m_workResultStart;	//실적 저장시 자동 재시작 구분
var m_autoWorkerReTuip;	//자동시작 시 이전작업자 자동 투입
//var m_setimeManualInput; //작업의 시작/종료 시 시간의 수동입력
  
//window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
var m_dbpath = window.localStorage.getItem("dbpath"); 
//-----------------------------------------------------------------------------------------
window.localStorage["form"] = "main"; 
window.localStorage["pagename"] = "Main.html";
PhoneGap_init();

function PhoneGap_init() {   
        document.addEventListener("deviceready", onDeviceReady, false);
};
 
function onDeviceReady() {	 
    BackButton();
}; 

function BackButton(){
   document.addEventListener("backbutton", onBackButton, true);  
};  

 
/*프로그램 종료  */
function fn_Exit()
{ 	
	navigator.notification.confirm("프로그램을 종료하시겠습니까?"
			  , fn_confirmCallback_Exit
			  , "종료"
			  , "아니오,예");		    
};

function onBackButton(){
	navigator.notification.confirm("메뉴화면으로 이동하시겠습니까?"
			  , fn_confirmCallback_Move
			  , "이동"
			  , "아니오,예");
};

function fn_confirmCallback_Exit(button){
		if(button == 2)
			navigator.app.exitApp();
} ;

function fn_confirmCallback_Move(button){
	if(button == 2)
		location.replace("./Menu.html");
};

function fn_alertCallback(){};	

 
//-----------------------------------------------------------------------------------------
window.onload = function(){ 	
	fn_Init();	
	//fn_ListViewTitle();

};
		
function fn_Init(){ 		
	
	// data1 = document.getElementById("div_content").document.getElementById("d_data0").document.getElementById("data0").document.getElementById("tddata1");
	// alert(data1.innerHTML);

	 //alert($("#tddata1")[0].innerHTML); 	 
	//=> 위 두가지 유형이 동일한 값 가져옴.
	//alert($("#tddata1")[0].innerHTML);
	
		
	m_name    	= window.localStorage.getItem("name");
	m_id   		= window.localStorage.getItem("id");
	m_pass   	= window.localStorage.getItem("pass");	
	m_empid   	= window.localStorage.getItem("empid");
	
	m_mcd       = window.localStorage.getItem("mcd");
	m_mname     = window.localStorage.getItem("mname");
	actiongbn   = window.localStorage.getItem("actiongbn");
	
	m_center	= window.localStorage.getItem("center");//작업공정
	m_workFlag	= window.localStorage.getItem("workflag");//생산실적 입력방법
	//m_workResultStart	= window.localStorage.getItem("workresultstart");//실적 저장시 자동 재시작 구분
	m_autoWorkerReTuip	= window.localStorage.getItem("autoworkerretuip");//자동시작 시 이전작업자 자동 투입
	
	/*0: 	단일실적 입력 (실적 입력화면에서 실적내역을 조회하여 보여준다.)
	  1:	쿼터별 실적 입력(입력되는 실적을 입력한다.)	  */
	//m_workFlag = '0';
	/*0:실적 저장만 진행, 1:실적 저장 시 자동 작업 종료 및 재시작)  */
	//m_workResultStart = '0';
	/*0:실적 저장 시 작업자 미투입(자동), 1:실적 저장 시 자동 작업 종료 및 재시작 의 경우 기존 작업자 자동 투입  */ 
	//m_autoWorkerReTuip = '0';
	/*0: 작업 시작/종료시 자동 종료, 1:작업 시작/종료 시 수동입력 종료  */
	//m_setimeManualInput = '0';
 	
	m_odrkey = window.localStorage.getItem("odrkey");
	m_workdate = window.localStorage.getItem("workdate");
	m_partcode = window.localStorage.getItem("partcode");
	m_partname = window.localStorage.getItem("partname");
	m_partspec = window.localStorage.getItem("partspec");
	m_workqty = window.localStorage.getItem("workqty");
	m_statusname = window.localStorage.getItem("statusname");
	m_status = window.localStorage.getItem("status");
	m_worderno = window.localStorage.getItem("worderno");
	m_wipseq = window.localStorage.getItem("wipseq"); 
	
	m_lotno = window.localStorage.getItem("lotno");
	m_histno = window.localStorage.getItem("histno");
	m_workers = window.localStorage.getItem("workers");
	m_autogoodqty = window.localStorage.getItem("autogoodqty");
	m_goodqty = window.localStorage.getItem("goodqty");
	m_badqty = window.localStorage.getItem("badqty");
	m_quarter = window.localStorage.getItem("quarter");
	m_quartercd = window.localStorage.getItem("quartercd");

	m_codename = window.localStorage.getItem("codename");
	
	data1 = $("#tddata1")[0]; //설비명	
	data2 = $("#tddata2")[0]; //품목코드
	data3 = $("#tddata3")[0]; //품목명
	data4 = $("#tddata4")[0]; //규격
	data5 = $("#tddata5")[0]; //지시량
	data6 = $("#tddata6")[0]; //시작시간
	data7 = $("#tddata7")[0]; //작업자
	data8 = $("#tddata8")[0]; //상태
	
	data9 = $("#tddata9")[0]; //생산량
	data10 = $("#tddata10")[0]; //양품량
	data11 = $("#tddata11")[0]; //불량량
	data12 = $("#tddata12")[0]; //지시번호
	data13 = $("#tddata13")[0]; //quarter
	
	//1) 컨트롤 초기화
	fn_CtlInit();
	//alert(m_id + "," + m_pass + "," + m_empid + "," + m_name + "," + m_mcd + "," + m_mname );
 	
	//alert(actiongbn);
	
	if(actiongbn != "order"){
		
		//2) 데이터 조회
		fn_GetWorkData();	
		window.localStorage["actiongbn"] 		= "";
	}
};

function fn_CtlInit()
{
	//1) 컨트롤 초기화
	if(m_mcd == '' || m_mcd == 'undefined'){
		data1.innerHTML = "";
		data2.innerHTML = "";
		data3.innerHTML = "";
		data4.innerHTML = "";
		data5.innerHTML = "";
		data6.innerHTML = "";
		data7.innerHTML = "";
		data8.innerHTML = "";
		
		data9.innerHTML = "0";
		data10.innerHTML = "0";
		data11.innerHTML = "0"; 
		data12.innerHTML = "";		
		data13.innerHTML = "";
	}
	else{	
	
		if(m_quarter == "null")
		{
			m_quarter = "";
		}

		if(m_workers == "null")
		{
			m_workers = "";
		}
		m_quarter
		data1.innerHTML = m_mname;
		data2.innerHTML = m_partcode;
		data3.innerHTML = m_partname;
		data4.innerHTML = m_partspec;
		data5.innerHTML = m_workqty;
		data6.innerHTML = m_workdate;
		data7.innerHTML = m_workers;
		data8.innerHTML = m_statusname;
		
		data9.innerHTML = m_autogoodqty;
		data10.innerHTML = m_goodqty;
		data11.innerHTML = m_badqty; 
		data12.innerHTML = m_worderno;
			if(m_quarter == "")
			{
				data13.innerHTML = m_codename;
			}
			else
			{
				data13.innerHTML = m_quarter;
			}
		}
};

function fn_AllClear(){
	//data1.innerHTML = "";
	data2.innerHTML = "";
	data3.innerHTML = "";
	data4.innerHTML = "";
	data5.innerHTML = "";
	data6.innerHTML = "";
	data7.innerHTML = "";
	data8.innerHTML = "";
	
	data9.innerHTML = "0";
	data10.innerHTML = "0";
	data11.innerHTML = "0"; 
	data12.innerHTML = "";
	data13.innerHTML = "";
	
	window.localStorage["odrkey"] 		= "";
	window.localStorage["workdate"] 	= "";
	window.localStorage["partcode"] 	= "";
	window.localStorage["partname"] 	= "";
	window.localStorage["partspec"] 	= "";
	window.localStorage["workqty"] 		= "";
	window.localStorage["statusname"] 	= "";
	window.localStorage["status"] 		= "";
	window.localStorage["worderno"] 	= "";
	window.localStorage["wipseq"] 		= "";
	window.localStorage["lotno"] 		= ""; 
	window.localStorage["histno"] 		= "";
	window.localStorage["workers"] 		= "";

	window.localStorage["autogoodqty"] 	= "0";
	window.localStorage["goodqty"] 		= "0";
	window.localStorage["badqty"] 		= "0"; 
	window.localStorage["quarter"]		= "";
	window.localStorage["quartercd"]		= "";
	$("#img_status")[0].src='./images/led_Gray48.png';
	
	//$("#btn_job1")[0].innerHTML = "작업시작";
	 
	m_lotno = "";
	m_histno = "";
	m_workers = "";	 
	m_odrkey = "";
	m_workdate = ""; 
	m_partcode = "";
	m_partname = "";
	m_partspec = "";
	m_workqty = ""
	m_statusname = "";
	m_status = "";
	m_worderno = "";
	m_wipseq = ""; 
	m_autogoodqty = "0";
	m_goodqty = "0";
	m_badqty = "0";
	m_quarter = "";
	m_quartercd = "";
	
};
    
 
//////////////////////////////설비 선택////////////////////////
function fn_Machine(){
	window.localStorage["actiongbn"] = "machine";
	window.localStorage["form"] = "main";
	 //$.mobile.changePage($(document.location.href="./Machine.html"), {transition:"slide", reverse:false, changeHash:false} );
	/* $.mobile.changePage("./Machine.html",{
				transition:"slide",
				reverse: false,
				changeHash: true
				} 
			); */
	
	//$.mobile.changePage($(document.location.href="./Machine.html"), {transition:"slide",reverse:false, changeHash:true} );
	location.replace("./Machine.html");			
};

//////////////////////////////작업지시 선택////////////////////////
function fn_Worders(){
	if(m_mcd == '' || m_mcd == 'undefined')
		{
			//alert("설비를 선택하세요.");
			navigator.notification.alert("설비를 선택하세요.",fn_alertCallback, "알림","확인");
			return;
		}	
	window.localStorage["actiongbn"] = "order";	
	location.replace("./Orders.html"); 
};

//////////////////////////////작업시작////////////////////////
function fn_WorkStartStop(){
	//var btn_Job = document.getElementId("btn_job");
	if(data3.innerHTML == '' || data3.innerHTML == 'undefined')
		{
			//alert("작업지시를 선택하세요.");
			navigator.notification.alert("작업지시를 선택하세요.",fn_alertCallback, "알림","확인");
			return;
		}
	
	window.localStorage["actiongbn"] = "startstop";
	
	if(data8.innerHTML == '' || data8.innerHTML == '대기' || data8.innerHTML == '등록'|| data8.innerHTML == 'undefined'){
		//작업시작
		//if(m_setimeManualInput == '1'){
		//	location.replace("./StartStopTime.html");
		//	return;
		//}
		
		//if (confirm("작업을시작하시겠습니까?") == false)
		//	return ;			
		//else		 
		//	fn_Start(m_mcd, m_worderno, m_wipseq, m_setimeManualInput, "");
		
		navigator.notification.confirm("작업을시작하시겠습니까?"
				  , fn_Callback_Start
				  , "작업시작"
				  , "아니오,예");
	}
	else{
		//작업종료
		//if(m_setimeManualInput == '1'){
		//	location.replace("./StartStopTime.html");
		//	return;
		//}
		
		//if (confirm("작업을 종료하시겠습니까?") == false)
		//		return ;			
		//else
		//	fn_End(m_mcd, m_worderno, m_wipseq, m_setimeManualInput, "",m_histno, m_lotno); 
		
		navigator.notification.confirm("작업을 종료하시겠습니까?"
				  , fn_Callback_End
				  , "작업종료"
				  , "아니오,예");
	}
	
	//데이터 기록 및 상태 변경
	//location.replace("./StartStopResult.html"); 
};

function fn_Callback_Start(button){
	if(button == 2)
		fn_Start(m_mcd, m_worderno, m_wipseq, "0", "");
};

function fn_Callback_End(button){
	if(button == 2)
		fn_End(m_mcd, m_worderno, m_wipseq, "0", "",m_histno, m_lotno); 
};
/*작업 종료 */
function fn_End(mcd, worderno, wipseq, sedtflag, setime, histno, lotno){
	json_param ='{"strMachine":' + "\""+ mcd 		+ "\"," 
		        + "strWorderNo:" + "\""+ worderno 	+ "\","
		        + "strWipSeq:"   + "\""+ wipseq 	+ "\"," 
		        + "strSeDtFlag:" + "\""+ sedtflag 	+ "\","
		        + "strSe_time:"  + "\""+ setime 	+ "\"," 
		        + "strHistno:"   + "\""+ histno 	+ "\"," 
		        + "strLotno:"    + "\""+ lotno 		+ "\"" +'}';
	//alert(json_param);		        
	$.ajax({
	url: m_dbpath + "PorductReturnToJson.aspx/js_WorkEnd",
	contentType:"Application/json; charset=utf-8",
	dataType:"json",
	data:json_param,
	type:"POST",
	success:function(data)
		{
			//alert('성공');
		    if(data.d.mydt[0]["FLAG"] == 'OK') 
				fn_AllClear();
		    else{
		    	//alert("작업을 종료하지 못했습니다.");
		    	navigator.notification.alert("작업을 종료하지 못했습니다.",fn_alertCallback, "알림","확인");
		    }
			return;		 
		},
	error:function(data) {
			//alert('네트워크 상에 문제가 발생되었습니다.');
			navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
		}
	}); 	
};

/*작업 시작  */
function fn_Start(mcd,worderno,wipseq,sedtflag,setime){
	json_param ='{"strMachine":' + "\""+ mcd 		+ "\"," 
		        + "strWorderNo:" + "\""+ worderno 	+ "\","
		        + "strWipSeq:" 	 + "\""+ wipseq 	+ "\","
		        + "strResultFlag:" 	 + "\""+ m_workFlag 	+ "\"," 
		        + "strSeDtFlag:" + "\""+ sedtflag 	+ "\"," 
		        + "strSe_time:"  + "\""+ setime	 	+ "\"" +'}';
	//alert(json_param);	        
	$.ajax({
	url: m_dbpath + "PorductReturnToJson.aspx/js_workstart",
	contentType:"Application/json; charset=utf-8",
	dataType:"json",
	data:json_param,
	type:"POST",
	success:function(data)
	{
		window.localStorage["codename"] 	= "";
		//alert("성공0");
		fn_SetData(data.d.mydt);
		//alert("성공1");
		return;		 
	},
	error:function(data) {
		//alert('네트워크 상에 문제가 발생되었습니다.');
		navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
		fn_CtlInit();
	}
	}); 
};


//////////////////////////////작업자 투입////////////////////////
function fn_Worker(){
	if(m_histno == '' || m_histno == 'undefined')
	{
		//alert("작업을 시작하세요.");
		navigator.notification.alert("작업을 시작하세요.",fn_alertCallback, "알림","확인");
		return;
	}
	
	//작업자 투입화면 이동
	/* $.mobile.changePage("./Worker.html",{
		transition:"slide",
		reverse: false,
		changeHash: true
		} 
	); */
	window.localStorage["actiongbn"] = "worker";
	location.replace("./Worker.html"); 
}
//////////////////////////////생산실적 등록////////////////////////
function fn_WorkResult(){
	if(m_histno == '' || m_histno == 'undefined')
	{
		//alert("작업을 시작하세요.");
		navigator.notification.alert("작업을 시작하세요.",fn_alertCallback, "알림","확인");
		return;
	}
	
	
	window.localStorage["actiongbn"] = "workresult";
	//작업실적 입력화면으로 이동
	if(m_workFlag == "0" || m_workFlag == "" || m_workFlag==null){//단일실적
		location.replace("./WorkResult01.html");
	}
	else if(m_workFlag == "1"){//쿼터실적
		location.replace("./WorkResult02.html");
	}
};
//////////////////////////////불량실적 등록////////////////////////
function fn_BadResult(){
	if(m_histno == '' || m_histno == 'undefined')
	{
		//alert("작업을 시작하세요.");
		navigator.notification.alert("작업을 시작하세요.",fn_alertCallback, "알림","확인");
		return;
	}
	
	//불량실적 등록화면 이동
	/* $.mobile.changePage("./BadResult.html",{
		transition:"slide",
		reverse: false,
		changeHash: true
		} 
	); */
	window.localStorage["actiongbn"] ="badresult"; 
	location.replace("./BadResult.html"); 
};
 
//////////////////////////////비가동 실적 등록////////////////////////
function fn_StopResult(){
	if(m_histno == '' || m_histno == 'undefined')
	{
		//alert("작업을 시작하세요.");
		navigator.notification.alert("작업을 시작하세요.",fn_alertCallback, "알림","확인");
		return;
	}
	
	// 비가동실적 등록화면 이동
	/* $.mobile.changePage("./StopResult.html",{
		transition:"slide",
		reverse: false,
		changeHash: true
		} 
	); */
	window.localStorage["actiongbn"] ="stopresult"; 
	location.replace("./StopResult.html"); 
};

//////////////////////////////데이터 조회////////////////////////
function fn_GetWorkData()
{			//var btn_Job = document.getElementById("btn_job");	 	
			var json_param = '';	
			
			if(m_mcd =='undefined' || m_mcd == 'null')
				m_mcd='';
			
			if(m_empid == 'undefined')
				m_empid = window.localStorage.getItem("empid");
			 if(m_mcd == '')
				{
				  //alert("설비를 선택하세요.");
				  //navigator.notification.alert("설비를 선택하세요.",alertCallback, "알림","확인");
				  return;
				} 
		$(document).ready(function()
		{	 
			json_param ='{"machine":' 	+ "\"" + m_mcd 		+ "\"," 
			            + "empid:" 	    + "\"" + m_empid 	+ "\","
			            + "quatercd:" 	    + "\"" + m_quartercd 	+ "\","	
						+ "strResultFlag:" 	 + "\""+ m_workFlag 	+ "\","	
				        + "histno:" 	+ "\"" + m_histno 	+ "\"" +'}';
			$.ajax({
			url: m_dbpath + "PorductReturnToJson.aspx/workinfo",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:json_param,
			type:"POST",
			success:function(data)
			{	
				$(fn_SetData(data.d.mydt));
				return;				 
			},
			error:function(data) {
				//alert('네트워크 상에 문제가 발생되었습니다.');
				navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
				fn_CtlInit();
			}
			});
		});	 
};

/*데이터 변수보관, 화면셋팅, 메모리변수에 보관  */
function fn_SetData(dt){
		fn_AllClear();
		
		//alert("표시");
	  for (var row in dt) {	
		  	//alert(dt[0]["WORKHISTORYNO"]);
		  	
			m_histno 		=  dt[0]["WORKHISTORYNO"];
			m_lotno			=  dt[0]["LOTNO"];
			m_partcode 		=  dt[0]["PARTCODE"];
			m_partname		=  dt[0]["PARTNAME"];
			m_partspec		=  dt[0]["SPEC"];
			m_workqty		=  dt[0]["WORKQTY"];
			m_workdate		=  dt[0]["SDATE"];
			m_workers		=  dt[0]["WORKERS"];
			m_status		=  dt[0]["WORK_STATUS"];
			m_statusname	=  dt[0]["STATUS"];
			m_autogoodqty	=  dt[0]["AUTOGOODQTY"];
			m_goodqty		=  dt[0]["GOODQTY"];
			m_badqty		=  dt[0]["BADQTY"];		
			m_worderno      =  dt[0]["WORDERNO"];
			m_wipseq		=  dt[0]["WIPSEQ"];
			m_quarter		=  dt[0]["TIMENAME"];
			m_quartercd		=  dt[0]["WTIMEID"];
			

			data1.innerHTML = m_mname
			data2.innerHTML = m_partcode;
			data3.innerHTML = m_partname;
			data4.innerHTML = m_partspec;
			data5.innerHTML = m_workqty;
			data6.innerHTML = m_workdate;
			data7.innerHTML = m_workers;
			data8.innerHTML = m_statusname;				
			data9.innerHTML = m_autogoodqty;
			data10.innerHTML = m_goodqty;
			data11.innerHTML = m_badqty;
			data12.innerHTML = m_worderno;
		 	if(m_quarter == "null" || m_quarter == "" || m_quarter == null)
			{
				data13.innerHTML = m_codename;
			}
			else
			{
				data13.innerHTML = m_quarter;
			}
			
			window.localStorage["histno"] 		= m_histno;
			window.localStorage["lotno"] 		= m_lotno; 
			window.localStorage["partcode"]		= m_partcode;
			window.localStorage["partname"] 	= m_partname;
			window.localStorage["partspec"] 	= m_partspec;
			window.localStorage["workqty"] 		= m_workqty;
			window.localStorage["workdate"] 	= m_workdate;				
			window.localStorage["workers"] 		= m_workers;
			window.localStorage["status"] 		= m_status;
			window.localStorage["statusname"] 	= m_statusname;
			window.localStorage["autogoodqty"] 	= m_autogoodqty;
			window.localStorage["goodqty"] 		= m_goodqty;
			window.localStorage["badqty"] 		= m_badqty;	
			window.localStorage["worderno"]     = m_worderno;
			window.localStorage["wipseq"]		= m_wipseq
			
			window.localStorage["quarter"]		= m_quarter
			window.localStorage["quartercd"]	= m_quartercd
			
			$("#img_status")[0].src='./images/led_Green48.png';
	  };
}
 
 function fn_Craim(){
	location.replace("./Craim.html"); 
 };
 
function fn_Manual() {
		location.replace("./help/MainManual.html");
};		

function fn_Tuto()
{
	if(m_workFlag == "0" || m_workFlag == "" || m_workFlag==null)
	{//단일실적
		location.replace("./help/WorkResult01Tuto.html");
	}
	else if(m_workFlag == "1")
	{//쿼터실적
		location.replace("./help/WorkResult02Tuto.html");
	}
};







              
        function onDeviceReady () {
			$('#send').bind('click', function () {
				alert('Phone: ' + $('#phone').val() + ' Message: ' + $('#message').val());
				window.plugins.sms.send($('#phone').val(), 
                    $('#message').val(), 
                    function () { 
					   alert('Message sent successfully');	
				    },
    				function (e) {
    					alert('Message Failed:' + e);
    				}
				);
			});    			        	
        }
        document.addEventListener("deviceready", onDeviceReady, false);
        













			jQuery.extend(jQuery.mobile.datebox.prototype.options, {
			useNewStyle: true
		});				
	window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
	var m_dbpath = window.localStorage.getItem("dbpath"); 

	var machineid =  window.localStorage.getItem("mcd");
	var workhistoryno = window.localStorage.getItem("histno");
	var partname = window.localStorage.getItem("partname");		

	var m_id  = window.localStorage.getItem("empid");
	var mname = window.localStorage.getItem("mname");
	var m_workFlag	= window.localStorage.getItem("workflag");//생산실적 입력방법
		
	window.localStorage["pagename"] 	= "Machine.html";
	//var workhistoryno = "20111004A040001";
	//var machineid = "A04";
	//var m_id = "ADMIN";
	
	var cdtl = new Array();
	var Crno = "" ;
	var SaveFlag="0";

	var pictureSource;
	var destinationType;
	var imageURI;
	var picid ;
	var picturecnt = 0;
	var viewflag = 0;


	var curdate;
	var curtime
	var datenow;
	
	datenow = new Date();
    curdate = getDateStrFromDateObject(datenow);
	curtime = getTimeStrFromDateObject(datenow);

    document.addEventListener("deviceready", onStart, false);

    function onStart() {   
    	document.addEventListener("backbutton", onBackButton, true);
		pictureSource = navigator.camera.PitureSourceType;
		destinationType = navigator.camera.DestinationType;
    	};
    

        function onBackButton(){
			
			if(viewflag==0)
			{
        		navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
        				  , fn_confirmCallback_Exit
        				  , "이동"
        				  , "아니오,예");
			}
			if(viewflag==2)
			{
				//jQuery('#dialog').dialog().dialog('close');
				jQuery('#dialog').dialog().dialog('close');
				//$('#dialog').close(); 
				viewflag=0;
				Cancle();
			}
			if(viewflag==1)
			{	
				viewflag=0;
				jQuery('#dialog1').dialog().dialog('close');			
			}
        };

        function fn_confirmCallback_Exit(button){
        		if(button == 2)
        			fn_Back();
        } ;

        function fn_alertCallback(){};	

        /*로딩 시작  */
        function fn_ShowLoading(){
		    	$.mobile.showPageLoadingMsg( "a", "Loading...", false );
        	    //$.mobile.showPageLoadingMsg();
			};
		/*로딩 종료  */	
		function fn_HideLoading(){
				$.mobile.hidePageLoadingMsg(); 
			};
		           	
    	
	window.onload = function()
	{
		//$("#img0")[0].innerHTML = "asdf";
		//fn_ShowLoading();
		$(document).ready(function()
		{	
			Setpicid();
			Init("start");
			Grid();
			$("#part")[0].innerHTML = partname;
			$("#mchname")[0].innerHTML = mname;
			 $('#com').change(function()
			 {
				 $("#detail")[0].innerHTML = cdtl[$("#com")[0].selectedIndex];
			 });			
		});
		
		$('#sdate').trigger('datebox', {'method':'set', 'value':curdate});
		$('#stime').trigger('datebox', {'method':'set', 'value':curtime});

		fn_HideLoading();
	}
	
	function Init(flag)
	{
			var Data= '{"ID":' + "\""+ m_id + "\"," + "flag:" + "\""+ flag + "\"" +'}'
			$.ajax({
			url:m_dbpath + "Craim.aspx/init",
			//"http://121.78.112.176:222/T_POP/Craim.aspx/init",
			//m_dbpath + "Craim.aspx/init",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:Data,
			type:"POST",
			success:function(data)
			{
				$(makeOption(data.d.mydt));
			},
			error:function(data) {
				//alert('접속오류');
				navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
				}
			});
	}

	function Setpicid()
	{
		//2134010  a03 20130403132122 01
		var now = new Date(); 
		var mm = (now.getMonth()+1)+"";
		var h=now.getHours()+"";
		var m=now.getMinutes()+"";
		var s=now.getSeconds()+""; 
		if(parseInt(mm) < 10)
		{
			mm= "0" + mm;
		}
		else
		{
			mm =mm;
		}
		if(parseInt(h) < 10)
		{
			h= "0" + h;
		}
		else
		{
			h =h;
		}
		if(parseInt(m) < 10)
		{
			m= "0" + m;
		}
		else
		{
			m =m;
		}
		if(parseInt(s) < 10)
		{
			s= "0" + s;
		}
		else
		{
			s =s;
		}

		picid = now.getFullYear() + "" + mm + "" + now.getDate() + "" + h+ "" + m + "" + s + machineid + m_id;
	}

	function Grid()
	{
		var jsonData= '{"workhistoryno":' + "\""+ workhistoryno 
						+ "\"," +"\""+ "machineid"+"\":" + "\""+ machineid 
						+ "\"," + "id:" + "\""+ m_id + "\""
						+'}'
		
			$.ajax({
			url:m_dbpath+"Craim.aspx/js_craimresult",
				//"http://121.78.112.176:222/T_POP/Craim.aspx/js_craimresult",
			//m_dbpath + "Craim.aspx/craimresult",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{
				$(makeControl(data.d.mydt));
			},
			error:function(data) {
				//alert('접속오류111');
				navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
				}
			});
	}

	//옵션 컨트롤
	function makeOption(dt)
	{
		$('#com')[0].options.length = 0;
		for (var row in dt)
		{
			//stringmem=dt[row]["MEMSHTNAME"];
			option = document.createElement( "option" );
			option.value = dt[row]["CRAIMCODE"];
			option.innerText = dt[row]["CRAIMNAME"];
			cdtl[row] = dt[row]["CRAIMDETAIL"]
			$("#com").append(option);

		}
		
	   $("#com")[0].selectedIndex =  -1;
	   $("#com").selectmenu("refresh");
	  // $('#com').submit();
	}

	//제큐 그리드 만들기
	function makeControl(dt)
	{//alert('d.');
			
			jQuery("#list4").jqGrid({
			datatype: "local",
			colNames:['사고번호','사유','발생일시','클레임코드','상세','메모'],
			colModel:[
				{name:'CLEAIMNO',index:'CLEAIMNO', sorttype:"int",width:45,align:"center"},
				{name:'CRAIMNAME',index:'CRAIMNAME',width:65},
				{name:'IDT',index:'IDT',  align : 'center',width:60},
				{name:'CRAIMCODE',index:'CRAIMCODE',hidden:true},
				{name:'CRAIMDETAIL',index:'CRAIMDETAIL',hidden:true},
				{name:'MEMO',index:'MEMO',hidden:true}
			],
			//multiselect: true,
			//viewrecords: true,
			autowidth : true,
			height: "100%",
			onSelectRow: function(CLEAIMNO)
			{ 
				Setting();
			}//,
			//caption: "비가동실적관리"

			}).navGrid('#list4',{add:false,del:false,edit:false,position:'right'}); 

			var Data = new Array();
			for(row in dt)
			{
				Data[row]={CLEAIMNO:dt[row]["CLEAIMNO"],CRAIMNAME:dt[row]["CRAIMNAME"],IDT:dt[row]["IDT"],
				CRAIMCODE:dt[row]["CRAIMCODE"],CRAIMDETAIL:dt[row]["CRAIMDETAIL"],MEMO:dt[row]["MEMO"]};
			}

			var mydata = [Data];
			for(var i=0;i<=mydata.length;i++)
			{
				jQuery("#list4").jqGrid('addRowData',i+1,mydata[i]);
			}
			//jQuery("#list4").hideCol("BADCODE");
	}

	function Setting()
	{
		$("#stats")[0].innerHTML="수정";
		SaveFlag="1";
		var id = jQuery("#list4").jqGrid('getGridParam','selrow');
		var ret = jQuery("#list4").jqGrid('getRowData',id);
		var IDT = ret.IDT.split(" ");
		$('#sdate').trigger('datebox', {'method':'set', 'value':(IDT[0])});
		$('#stime').trigger('datebox', {'method':'set', 'value':IDT[1]});
		$('#test').val(ret.CRAIMDETAIL);
		//alert($("#sdate").val());
		//alert($("#stime").val());
		//$("#bad").val((ret.QTY.replace(/\s+/, '')));
		$("#com").val(ret.CRAIMCODE); 
		$("#com").selectmenu('refresh');
		$("#detail")[0].innerHTML = ret.CRAIMDETAIL;
		$("#memo").val(ret.MEMO);
		Crno = ret.CLEAIMNO
		
		var i;
		for(i = 0; i<4; i++)
		{
			var tdid = "#img" + i;
			//$(tdid)[0].innerHTML = "";
			//$(tdid).attr('src',"http://121.78.112.176:222/POP/html/images/image2_gray.png");
			$(tdid).attr('src',m_dbpath + "html/images/image2_gray.png");
		}
		Setimg();
	}

	function Delete()
	{		
		//alert("h=> " + workhistoryno + ", s=> " + StopSeq);		
		if(machineid == "" || Crno == "" || Crno == 'undefined' || Crno == "0")
			return;
		
		navigator.notification.confirm("삭제하시겠습니까?"
				  , fn_Delete
				  , "삭제"
				  , "아니오,예");
	}
	
	function fn_Delete(button)
	{ 
		if(button == 2)
		{
			var jsonData = '{"machineid":' + "\""+ machineid 
							+ "\"," +"\""+ "Crno"+"\":" + "\""+ Crno 
							+ "\"," + "craimcode:" + "\""+ $("#com").val() + "\""
							+'}'
			$.ajax({
			url:m_dbpath + "Craim.aspx/js_delete",
			//"http://121.78.112.176:222/T_POP/Craim.aspx/js_delete",
			//m_dbpath + "StopResult.aspx/delete",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{
				//alert('삭제되었습니다.');
				navigator.notification.alert("삭제되었습니다.",fn_alertCallback, "알림","확인");
				jQuery("#list4").jqGrid('clearGridData');
				Grid();
				New();
			},
			error:function(data) {
				//alert('삭제에 실패하였습니다.');
				navigator.notification.alert("삭제를 실패하였습니다.",fn_alertCallback, "알림","확인");
				}
			});
			
		}
		else
		{
			 return;
		}
		//jQuery("#list4").jqGrid('clearGridData');
	}

	function Save()
	{
			var stime;
			var etime;
			 
			if($("#com").val() == null){
				navigator.notification.alert("사고사유를 선택하세요.",fn_alertCallback, "알림","확인");
				return;		
			}
								
			stime = $("#sdate").val() + " " + $("#stime").val();
			

			var jsonData='{"workhistoryno":' + "\""+ workhistoryno 
						  + "\"," +"\""+ "Crno"+"\":" + "\""+ Crno 
						  + "\"," +"\""+ "craimcode"+"\":" + "\""+ $("#com").val()
						  + "\"," +"\""+ "machineid"+"\":" + "\""+  machineid
						  + "\"," +"\""+ "stime"+"\":" + "\""+  stime
						  + "\"," +"\""+ "id"+"\":" + "\""+  m_id
						  + "\"," +"\""+ "memo"+"\":" + "\""+ $("#memo").val()
						  + "\"," + "saveflag:" + "\""+ SaveFlag + "\""
						  +'}'

			$.ajax({
			url: m_dbpath + "Craim.aspx/js_update",
			//"http://121.78.112.176:222/T_POP/Craim.aspx/js_update",
			//m_dbpath + "StopResult.aspx/update",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{
				//if(data.d.mydt[0]["RESULT"] != "N")
				//{
					//alert('저장되었습니다.');
					navigator.notification.alert("저장되었습니다.",fn_alertCallback, "알림","확인");
					if(SaveFlag != "1")
					{
						Crno = data.d.mydt[0]["RESULT"];
					}
					picSave();
					jQuery("#list4").jqGrid('clearGridData');
					Grid();
				//}
			},
			error:function(data) {
				//alert('저장에 실패하였습니다.');
				navigator.notification.alert("저장에 실패하였습니다.",fn_alertCallback, "알림","확인");
				}
			});
	}

	function New()
	{		
		var i;
		for(i = 0; i<4; i++)
		{
			var tdid = "#img" + i;
			//$(tdid)[0].innerHTML = "";
			//$(tdid).attr('src',"http://121.78.112.176:222/POP/html/images/image2_gray.png");
			$(tdid).attr('src', m_dbpath + "html/images/image2_gray.png");
			

		}
		
		Init("start"); //데릭토리 사진 삭제를 위해

		picturecnt=0;

		SaveFlag="0";
		Crno="";
		jQuery("#list4").resetSelection();
		$("#com")[0].selectedIndex =  -1;
		$("#com").selectmenu("refresh");
		$("#stats")[0].innerHTML="신규";
		$("#detail")[0].innerHTML = "";
		$('#sdate').trigger('datebox', {'method':'set', 'value':curdate});
		$('#stime').trigger('datebox', {'method':'set', 'value':curtime});
		//$("#memo").val() ="";
	}
	
	 /*뒤로 버튼을 누르면 이전페이지로 되돌아 간다.  */
    function fn_Back() {
			location.replace("./Main.html");
    };
   
		function onPhotoURISuccess(imageURI)
		{
			var large = document.getElementById('largeImage');
			large.style.display = 'block';
			large.src = imageURI;
		};
		
		function getPhoto(source)
		{
			//포토앨범에서 가져오기
			navigator.camera.getPicture(onPhotoURISuccess,null,{quality:50,destinationType:destinationType.FILE_URI,sourceType:source});
		};
		function getCapture(source)
		{
			//사진찍어 바로 보여주기
			navigator.camera.getPicture(onPhotoURISuccess,null,{quality:50,destinationType:destinationType.FILE_URI,pictureSource:source,targetWidth:500,targetHeight:500,correctOrientation:true});
		};

				//사진 업로드
		function SaveAction()
		{
			imageURI = document.getElementById('largeImage').src
			var options = new FileUploadOptions(); 
			options.fileKey="file"; 
			options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1); 
			options.mimeType="image/jpeg"; 
			
			var params = new Object(); 
			params.value1 = picid+"0.jpg"; 
			params.value2 = m_id; 
			
			options.params = params; 

				var ft = new FileTransfer(); 
				//"http://121.78.112.176:222/POP/Craim.aspx/delete",POP\PhoneImages
			if(picturecnt>3)
			{
				navigator.notification.alert("4장이상은 저장되지 않습니다.",fn_alertCallback, "알림","확인");
			}
			else
			{
				ft.upload(imageURI, m_dbpath + "imageTransfer.aspx",onSucc , onFail, options);
				//ft.upload(imageURI, "http://121.78.112.176:222/T_POP/imageTransfer.aspx",onSucc , onFail, options);
			}
		};
		function onSucc()
		{
			//alert('사진 업로드 성공');
				navigator.notification.alert("사진을 업로드 하였습니다.",fn_alertCallback, "알림","확인");
				++picturecnt;
			
		};
		function onFail(message)
		{
			alert('사진 업로드 실패' + ' ' + message);
			
		};
		
		//DB에 있는 사진 갯수 셋팅
		function Setimg()
		{
			/*var imgid1 = m_id + "0.jpg"
			var imgid2 = m_id + "1.jpg"
			var imgid3 = m_id + "2.jpg"
			var imgid4 = m_id + "3.jpg"
			$('#img1').attr('src',"http://121.78.112.176:222/POP/PhoneImages/ADMIN/"+ imgid1);
			$('#img2').attr('src',"http://121.78.112.176:222/POP/PhoneImages/ADMIN/"+ imgid2);
			$('#img3').attr('src',"http://121.78.112.176:222/POP/PhoneImages/ADMIN/"+ imgid3);
			$('#img4').attr('src',"http://121.78.112.176:222/POP/PhoneImages/ADMIN/"+ imgid4);*/
			var jsonData='{"Crno":' + "\""+ Crno 
						  + "\"," +"\""+ "id"+"\":" + "\""+ m_id 
						  + "\"," + "pid:" + "\""+ picid + "\""
						  +'}'


			$.ajax({
			url: m_dbpath + "Craim.aspx/js_picSelect",
			//"http://121.78.112.176:222/T_POP/Craim.aspx/js_picSelect",
			//m_dbpath + "StopResult.aspx/update",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{
				setpicCnt(data.d.mydt);
			},
			error:function(data) {
				//alert('저장에 실패하였습니다.');
				navigator.notification.alert("사진 조회에 실패하였습니다2222.",fn_alertCallback, "알림","확인");
				}
			});

		};
		
		function setpicCnt(dt)
		{
			picturecnt = 0;
			var i;
			for(i = 0; i<4; i++)
			{
				var tdid = "#img" + i;
				//$(tdid)[0].innerHTML = "";
				//$(tdid).attr('src',"http://121.78.112.176:222/POP/html/images/image2_gray.png");
				$(tdid).attr('src',m_dbpath + "html/images/image2_gray.png");
				
			}
			for(var row in dt)
			{
				var tdid = "#img" + row;
				//$(tdid)[0].innerHTML = "★";
				$(tdid).attr('src',m_dbpath + "html/images/image.png");
				++picturecnt;
			}
		};

		//사진 저장
		function picSave()
		{
			var jsonData='{"Crno":' + "\""+ Crno 
						  + "\"," +"\""+ "id"+"\":" + "\""+ m_id 
						  + "\"," + "pid:" + "\""+ picid + "\""
						  +'}'

			$.ajax({
			url: m_dbpath + "Craim.aspx/js_picsave",
			//"http://121.78.112.176:222/T_POP/Craim.aspx/js_picsave",
			//m_dbpath + "StopResult.aspx/update",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{
				New();
			},
			error:function(data) {
				//alert('저장에 실패하였습니다.');
				navigator.notification.alert("저장에 실패하였습니다.",fn_alertCallback, "알림","확인");
				}
			});
	
		};
		
		//팝업 닫기 버튼 누를때 서버에 있는 사진 갯수 셋팅
		function Cancle()
		{
			/*for(i=0;i<picturecnt;i++)
			{
				var tdid = "#img" + i;
				$(tdid)[0].innerHTML = "★";
			}*/
			var cnt;
				var jsonData='{"Crno":' + "\""+ Crno 
				  + "\"," +"\""+ "id"+"\":" + "\""+ m_id 
				  + "\"," + "pid:" + "\""+ picid + "\""
				  +'}'

				$.ajax({
				url: m_dbpath + "Craim.aspx/js_piccnt",
				//"http://121.78.112.176:222/T_POP/Craim.aspx/js_piccnt",
				//m_dbpath + "StopResult.aspx/update",
				contentType:"Application/json; charset=utf-8",
				dataType:"json",
				data:jsonData,
				type:"POST",
				success:function(data)
				{
					cnt = data.d.mydt[0]["RESULT"];
					for(i=0;i<cnt;i++)
					{
						//$('#img0').attr('src',"http://121.78.112.176:222/POP/html/images/appearance.png");
						//$('#img1').attr('src',"http://121.78.112.176:222/POP/html/images/image.png");
						var tdid = "#img" + i;
						//$(tdid)[0].innerHTML = "★";
						$(tdid).attr('src',"http://121.78.112.176:222/POP/html/images/image.png");
					}
				},
				error:function(data) {
					//alert('저장에 실패하였습니다.');
					navigator.notification.alert("네트워크 상태가 올바르지 않습니다.",fn_alertCallback, "알림","확인");
					}
				});
		};

	 
		function Picdel()
		{
			if(document.getElementById("img0").src == m_dbpath + "html/images/image2_gray.png")
			{
				navigator.notification.alert("사진이 없습니다.",fn_alertCallback, "알림","확인");
				return;
			}
			else
			{
				navigator.notification.confirm("첨부사진은 순차적으로 삭제 됩니다. 사진을 삭제하시겠습니까?"
				, fn_Picdel
				, "삭제"
				, "아니오,예");
			 }
		};
		
		//사진삭제하기
		function fn_Picdel(button)
		{
			if(button == 2)
			{
				var jsonData='{"Crno":' + "\""+ Crno 
							  + "\"," +"\""+ "id"+"\":" + "\""+ m_id 
							  + "\"," +"\""+ "pcnt"+"\":" + "\""+ picturecnt 
							  + "\"," + "pid:" + "\""+ picid + "\""
							  +'}'

				$.ajax({
				url: "http://121.78.112.176:222/T_POP/Craim.aspx/js_picdel",
				//m_dbpath + "StopResult.aspx/update",
				contentType:"Application/json; charset=utf-8",
				dataType:"json",
				data:jsonData,
				type:"POST",
				success:function(data)
				{
					navigator.notification.alert("사진이 삭제되었습니다.",fn_alertCallback, "알림","확인");
					Setimg();
				},
				error:function(data) {
					//alert('저장에 실패하였습니다.');
					navigator.notification.alert("저장에 실패하였습니다.",fn_alertCallback, "알림","확인");
					}
				});
			}
	
		};
	
		function Picset(num)
		{
			var img = "img" + num;
			var imgid1 = picid + num +".jpg"
			var noca = new Date();
			if(document.getElementById(img).src == "http://121.78.112.176:222/POP/html/images/image2_gray.png")
			{
				navigator.notification.alert("이미지를 등록해주세요.",fn_alertCallback, "알림","확인");
			}
			else
			{
				$('#view').attr('src',m_dbpath+"PhoneImages/" + m_id + "/"+ imgid1+"?dummy=" + noca);
				
				//$('#view').attr('src',"http://121.78.112.176:222/POP/PhoneImages/ADMIN/"+ imgid1+"?dummy=" + noca);
				viewflag = 1;
				$.mobile.changePage('#dialog1', 'dialog', true, true);
			}
			// $.mobile.changePage('#dialog1', {transition: 'popup', role: 'dialog'});  
			//$('#view').attr('src',"http://121.78.112.176:222/POP/PhoneImages/ADMIN/20130426143002A04ADMIN0.jpg");
			//$.mobile.changePage('#dialog1', 'dialog', true, true);
			//$.mobile.changePage('#dialog1', 'dialog', true, true);
		
		};
		
		function view()
		{
			viewflag=0;
			//$("#dialog").show();
		};
		
		function viewcamera()
		{
			viewflag=2;
			//$("#dialog").show();
		};

    function fn_Manual() {
        	location.replace("./help/CraimManual.html");
    };

	function fn_Tuto()
	{
		if(m_workFlag == "0" || m_workFlag == "" || m_workFlag==null)
		{//단일실적
			location.replace("./help/WorkResult01Tuto.html");
		}
		else if(m_workFlag == "1")
		{//쿼터실적
			location.replace("./help/WorkResult02Tuto.html");
		}
	};









//0) 컨트롤별 변수 선언하기

var data1,data2,data3, data4, data5, data6, data7, data8, data9, data10, data11,data12;

var db;	
var sql = "";
var actiongbn = "";

var m_name, m_id,m_pass, m_empid, m_mcd, m_mname, m_workers;
var m_odrkey, m_workdate, m_partcode, m_partname, m_partspec, m_workqty;
var m_statusname, m_status, m_worderno, m_wipseq, m_lotno, m_histno;
var m_autogoodqty, m_goodqty, m_badqty;

var m_center;			//작업공정
var m_workFlag;			//생산실적 입력방법
var m_workResultStart;	//실적 저장시 자동 재시작 구분
var m_autoWorkerReTuip;	//자동시작 시 이전작업자 자동 투입
var m_setimeManualInput; //작업의 시작/종료 시 시간의 수동입력
  

PhoneGap_init();	
/* 
$(document).bind("pageload", function(event, data) {
    init(data.url);
});
 */

//alert 콜백 함수
function fn_alertCallback(){};

/*프로그램 종료  */
function fn_Exit()
{ 	
	navigator.notification.confirm("프로그램을 종료하시겠습니까?"
			  , fn_confirmCallback_Exit
			  , "종료"
			  , "아니오,예");		    
};

function onBackButton(){
	onBackKeyDown();
	navigator.notification.confirm("프로그램을 종료하시겠습니까?"
			  , fn_confirmCallback_Exit
			  , "종료"
			  , "아니오,예");
};

function fn_confirmCallback_Exit(button){
		if(button == 2)
			navigator.app.exitApp();
} ;
 
window.onload = function(){ 	
	fn_Init();
	
	try{
	alert(getMyPhoneNumber());
	}
	catch(err)
	{
		alert(err);
	}
};
		
function fn_Init(){ 		
	
	// data1 = document.getElementById("div_content").document.getElementById("d_data0").document.getElementById("data0").document.getElementById("tddata1");
	// alert(data1.innerHTML);

	 //alert($("#tddata1")[0].innerHTML); 	 
	//=> 위 두가지 유형이 동일한 값 가져옴.
	//alert($("#tddata1")[0].innerHTML);
		
	m_name    	= window.localStorage.getItem("name");
	m_id   		= window.localStorage.getItem("id");
	m_pass   	= window.localStorage.getItem("pass");	
	m_empid   	= window.localStorage.getItem("empid");
	
	m_mcd       = window.localStorage.getItem("mcd");
	m_mname     = window.localStorage.getItem("mname");
	actiongbn   = window.localStorage.getItem("actiongbn");
	
	m_center	= window.localStorage.getItem("center");//작업공정
	m_workFlag	= window.localStorage.getItem("workflag");//생산실적 입력방법
	m_workResultStart	= window.localStorage.getItem("workresultstart");//실적 저장시 자동 재시작 구분
	m_autoWorkerReTuip	= window.localStorage.getItem("autoworkerretuip");//자동시작 시 이전작업자 자동 투입
	
	m_center = '100';
	/*0: 	단일실적 입력 (실적 입력화면에서 실적내역을 조회하여 보여준다.)
	  1:	쿼터별 실적 입력(입력되는 실적을 입력한다.)	  */
	m_workFlag = '0';
	/*0:실적 저장만 진행, 1:실적 저장 시 자동 작업 종료 및 재시작)  */
	m_workResultStart = '0';
	/*0:실적 저장 시 작업자 미투입(자동), 1:실적 저장 시 자동 작업 종료 및 재시작 의 경우 기존 작업자 자동 투입  */ 
	m_autoWorkerReTuip = '0';
	/*0: 작업 시작/종료시 자동 종료, 1:작업 시작/종료 시 수동입력 종료  */
	m_setimeManualInput = '0';
 	
	m_odrkey = window.localStorage.getItem("odrkey");
	m_workdate = window.localStorage.getItem("workdate");
	m_partcode = window.localStorage.getItem("partcode");
	m_partname = window.localStorage.getItem("partname");
	m_partspec = window.localStorage.getItem("partspec");
	m_workqty = window.localStorage.getItem("workqty");
	m_statusname = window.localStorage.getItem("statusname");
	m_status = window.localStorage.getItem("status");
	m_worderno = window.localStorage.getItem("worderno");
	m_wipseq = window.localStorage.getItem("wipseq"); 
	
	m_lotno = window.localStorage.getItem("lotno");
	m_histno = window.localStorage.getItem("histno");
	m_workers = window.localStorage.getItem("workers");
	m_autogoodqty = window.localStorage.getItem("autogoodqty");
	m_goodqty = window.localStorage.getItem("goodqty");
	m_badqty = window.localStorage.getItem("badqty");

	
	data1 = $("#tddata1")[0]; //설비명	
	data2 = $("#tddata2")[0]; //품목코드
	data3 = $("#tddata3")[0]; //품목명
	data4 = $("#tddata4")[0]; //규격
	data5 = $("#tddata5")[0]; //지시량
	data6 = $("#tddata6")[0]; //시작시간
	data7 = $("#tddata7")[0]; //작업자
	data8 = $("#tddata8")[0]; //상태
	
	data9 = $("#tddata9")[0]; //생산량
	data10 = $("#tddata10")[0]; //양품량
	data11 = $("#tddata11")[0]; //불량량
	data12 = $("#tddata12")[0]; //지시번호
	
	//1) 컨트롤 초기화
	fn_CtlInit();
	//alert(m_id + "," + m_pass + "," + m_empid + "," + m_name + "," + m_mcd + "," + m_mname );
 	
	if(actiongbn != "order"){
		//2) 데이터 조회
		fn_GetWorkData();	
	}
	
	
	
};

function fn_CtlInit()
{
	//1) 컨트롤 초기화
	if(m_mcd == '' || m_mcd == 'undefined'){
		data1.innerHTML = "";
		data2.innerHTML = "";
		data3.innerHTML = "";
		data4.innerHTML = "";
		data5.innerHTML = "";
		data6.innerHTML = "";
		data7.innerHTML = "";
		data8.innerHTML = "";
		
		data9.innerHTML = "0";
		data10.innerHTML = "0";
		data11.innerHTML = "0"; 
		data12.innerHTML = "";
	}
	else{		
		data1.innerHTML = m_mname;
		data2.innerHTML = m_partcode;
		data3.innerHTML = m_partname;
		data4.innerHTML = m_partspec;
		data5.innerHTML = m_workqty;
		data6.innerHTML = m_workdate;
		data7.innerHTML = m_workers;
		data8.innerHTML = m_statusname;
		
		data9.innerHTML = m_autogoodqty;
		data10.innerHTML = m_goodqty;
		data11.innerHTML = m_badqty; 
		data12.innerHTML = m_worderno;
		}
};

function fn_AllClear(){
	//data1.innerHTML = "";
	data2.innerHTML = "";
	data3.innerHTML = "";
	data4.innerHTML = "";
	data5.innerHTML = "";
	data6.innerHTML = "";
	data7.innerHTML = "";
	data8.innerHTML = "";
	
	data9.innerHTML = "0";
	data10.innerHTML = "0";
	data11.innerHTML = "0"; 
	data12.innerHTML = "";
	
	window.localStorage["odrkey"] 		= "";
	window.localStorage["workdate"] 	= "";
	window.localStorage["partcode"] 	= "";
	window.localStorage["partname"] 	= "";
	window.localStorage["partspec"] 	= "";
	window.localStorage["workqty"] 		= "";
	window.localStorage["statusname"] 	= "";
	window.localStorage["status"] 		= "";
	window.localStorage["worderno"] 	= "";
	window.localStorage["wipseq"] 		= "";
	window.localStorage["lotno"] 		= ""; 
	window.localStorage["histno"] 		= "";
	window.localStorage["workers"] 		= "";

	window.localStorage["autogoodqty"] 	= "0";
	window.localStorage["goodqty"] 		= "0";
	window.localStorage["badqty"] 		= "0"; 
	 
	m_lotno = "";
	m_histno = "";
	m_workers = "";	 
	m_odrkey = "";
	m_workdate = ""; 
	m_partcode = "";
	m_partname = "";
	m_partspec = "";
	m_workqty = ""
	m_statusname = "";
	m_status = "";
	m_worderno = "";
	m_wipseq = ""; 
	m_autogoodqty = "0";
	m_goodqty = "0";
	m_badqty = "0";
	
};
    
/*프로그램 종료  */
/* function fn_Exit(){
			navigator.notification.confirm('프로그램을 종료하시겠습니까?'
					,fn_Quit,
					'종료',
					'예,아니오');			    
		};
function fn_Quit(){
	 navigator.app.exitApp();	
} */
//////////////////////////////설비 선택////////////////////////
function fn_Machine(){
	window.localStorage["actiongbn"] = "machine";
	 //$.mobile.changePage($(document.location.href="./Machine.html"), {transition:"slide", reverse:false, changeHash:false} );
	/* $.mobile.changePage("./Machine.html",{
				transition:"slide",
				reverse: false,
				changeHash: true
				} 
			); */
	
	//$.mobile.changePage($(document.location.href="./Machine.html"), {transition:"slide",reverse:false, changeHash:true} );
	location.replace("./Machine.html");			
};

//////////////////////////////작업지시 선택////////////////////////
function fn_Worders(){
	if(m_mcd == '' || m_mcd == 'undefined')
		{
			//alert("설비를 선택하세요.");
			return;
		}
	
	window.localStorage["actiongbn"] = "order";
	
	/* $.mobile.changePage("./Orders.html",{
		transition:"slide",
		reverse: false,
		changeHash: true
		} 
	); */
	
	location.replace("./Orders.html"); 
};

//////////////////////////////작업시작////////////////////////
function fn_WorkStartStop(){
	//var btn_Job = document.getElementId("btn_job");
	if(data3.innerHTML == '' || data3.innerHTML == 'undefined')
		{
			alert("작업지시를 선택하세요.");
			return;
		}
	
	window.localStorage["actiongbn"] = "startstop";
	
	if(data8.innerHTML == '' || data8.innerHTML == '대기' || data8.innerHTML == '등록'|| data8.innerHTML == 'undefined'){
		//작업시작
		if(m_setimeManualInput == '1'){
			location.replace("./StartStopTime.html");
			return;
		}
		
		if (confirm("작업을시작하시겠습니까?") == false)
			return ;			
		else		 
			fn_Start(m_mcd, m_worderno, m_wipseq, m_setimeManualInput, "");
	}
	else{
		//작업종료
		if(m_setimeManualInput == '1'){
			location.replace("./StartStopTime.html");
			return;
		}
		
		if (confirm("작업을 종료하시겠습니까?") == false)
				return ;			
		else
			fn_End(m_mcd, m_worderno, m_wipseq, m_setimeManualInput, "",m_histno, m_lotno); 
		
		/* navigator.notification.confirm('작업을 종료하시겠습니까?'
				,fn_End(m_mcd, m_worderno, m_wipseq, m_setimeManualInput, "",m_histno, m_lotno),
				'작업종료',
				'예,아니오'); */
	}
	
	//데이터 기록 및 상태 변경
	//location.replace("./StartStopResult.html"); 
};
/*작업 종료 */
function fn_End(mcd, worderno, wipseq, sedtflag, setime, histno, lotno){
	json_param ='{"strMachine":' + "\""+ mcd 		+ "\"," 
		        + "strWorderNo:" + "\""+ worderno 	+ "\","
		        + "strWipSeq:"   + "\""+ wipseq 	+ "\"," 
		        + "strSeDtFlag:" + "\""+ sedtflag 	+ "\","
		        + "strSe_time:"  + "\""+ setime 	+ "\"," 
		        + "strHistno:"   + "\""+ histno 	+ "\"," 
		        + "strLotno:"    + "\""+ lotno 		+ "\"" +'}';
	$.ajax({
	url:"http://121.78.112.176:222/POP/PorductReturnToJson.aspx/js_WorkEnd",
	contentType:"Application/json; charset=utf-8",
	dataType:"json",
	data:json_param,
	type:"POST",
	success:function(data)
		{
		    if(data.d.mydt[0]["FLAG"] == 'OK') 
				fn_AllClear();
		    else{
		    	alert("작업을 종료하지 못했습니다.");
		    }
			return;		 
		},
	error:function(data) {
			alert('네트워크 상에 문제가 발생되었습니다.');		
		}
	}); 	
};

/*작업 시작  */
function fn_Start(mcd,worderno,wipseq,sedtflag,setime){
	json_param ='{"strMachine":' + "\""+ mcd 		+ "\"," 
		        + "strWorderNo:" + "\""+ worderno 	+ "\","
		        + "strWipSeq:" 	 + "\""+ wipseq 	+ "\"," 
		        + "strSeDtFlag:" + "\""+ sedtflag 	+ "\"," 
		        + "strSe_time:"  + "\""+ setime	 	+ "\"" +'}';
	$.ajax({
	url:"http://121.78.112.176:222/POP/PorductReturnToJson.aspx/js_workstart",
	contentType:"Application/json; charset=utf-8",
	dataType:"json",
	data:json_param,
	type:"POST",
	success:function(data)
	{
		fn_SetData(data);
		
		return;		 
	},
	error:function(data) {alert('네트워크 상에 문제가 발생되었습니다.');
		fn_CtlInit();
	}
	}); 
};


//////////////////////////////작업자 투입////////////////////////
function fn_Worker(){
	if(m_histno == '' || m_histno == 'undefined')
	{
		alert("작업을 시작하세요.");
		return;
	}
	
	//작업자 투입화면 이동
	/* $.mobile.changePage("./Worker.html",{
		transition:"slide",
		reverse: false,
		changeHash: true
		} 
	); */
	window.localStorage["actiongbn"] = "worker";
	location.replace("./Worker.html"); 
}
//////////////////////////////생산실적 등록////////////////////////
function fn_WorkResult(){
	if(m_histno == '' || m_histno == 'undefined')
	{
		alert("작업을 시작하세요.");
		return;
	}
	window.localStorage["actiongbn"] = "workresult";
	//작업실적 입력화면으로 이동
	if(m_workFlag == "0"){//단일실적
		location.replace("./WorkResult01.html");
	}
	else if(m_workFlag == "1"){//쿼터실적
		location.replace("./WorkResult02.html");
	}
};
//////////////////////////////불량실적 등록////////////////////////
function fn_BadResult(){
	if(m_histno == '' || m_histno == 'undefined')
	{
		alert("작업을 시작하세요.");
		return;
	}
	
	//불량실적 등록화면 이동
	/* $.mobile.changePage("./BadResult.html",{
		transition:"slide",
		reverse: false,
		changeHash: true
		} 
	); */
	window.localStorage["actiongbn"] ="badresult"; 
	location.replace("./BadResult.html"); 
};
 
//////////////////////////////비가동 실적 등록////////////////////////
function fn_StopResult(){
	if(m_histno == '' || m_histno == 'undefined')
	{
		alert("작업을 시작하세요.");
		return;
	}
	
	// 비가동실적 등록화면 이동
	/* $.mobile.changePage("./StopResult.html",{
		transition:"slide",
		reverse: false,
		changeHash: true
		} 
	); */
	window.localStorage["actiongbn"] ="stopresult"; 
	location.replace("./StopResult.html"); 
};

//////////////////////////////데이터 조회////////////////////////
function fn_GetWorkData()
{			//var btn_Job = document.getElementById("btn_job");	 	
			var json_param = '';	
			
			if(m_mcd =='undefined' || m_mcd == 'null')
				m_mcd='';
			
			if(m_empid == 'undefined')
				m_empid = window.localStorage.getItem("empid");
			 if(m_mcd == '')
				{
				   alert("설비를 선택하세요.");
				  return;
				} 
		$(document).ready(function()
		{	 
			
			json_param ='{"machine":' 	+ "\"" + m_mcd 		+ "\"," 
			            + "empid:" 	    + "\"" + m_empid 	+ "\","				
				        + "histno:" 	+ "\"" + m_histno 	+ "\"" +'}';
			$.ajax({
			url:"http://121.78.112.176:222/POP/PorductReturnToJson.aspx/workinfo",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:json_param,
			type:"POST",
			success:function(data)
			{						
				 
				$(fn_SetData(data.d.mydt));
				/* if(data8.innerHTML == '' || data8.innerHTML == '대기' || data8.innerHTML == '등록'|| data8.innerHTML == 'undefined'){
					btn_Job.innerHTML = "작업시작";
				}
				else{
					btn_Job.innerHTML = "작업종료";
				} */
				
				return;				 
			},
			error:function(data) {alert('네트워크 상에 문제가 발생되었습니다.');
				fn_CtlInit();
			}
			});
		});	 
};

/*데이터 변수보관, 화면셋팅, 메모리변수에 보관  */
function fn_SetData(dt){
	fn_AllClear();
	
	  for (var row in dt) {	
			m_histno 		=  dt[0]["WORKHISTORYNO"];
			m_lotno			=  dt[0]["LOTNO"];
			m_partcode 		=  dt[0]["PARTCODE"];
			m_partname		=  dt[0]["PARTNAME"];
			m_partspec		=  dt[0]["SPEC"];
			m_workqty		=  dt[0]["WORKQTY"];
			m_workdate		=  dt[0]["SDATE"];
			m_workers		=  dt[0]["WORKERS"];
			m_status		=  dt[0]["WORK_STATUS"];
			m_statusname	=  dt[0]["STATUS"];
			m_autogoodqty	=  dt[0]["AUTOGOODQTY"];
			m_goodqty		=  dt[0]["GOODQTY"];
			m_badqty		=  dt[0]["BADQTY"];		
			m_worderno      =  dt[0]["WORDERNO"];
			m_wipseq		=  dt[0]["WIPSEQ"];
			
			data1.innerHTML = m_mname
			data2.innerHTML = m_partcode;
			data3.innerHTML = m_partname;
			data4.innerHTML = m_partspec;
			data5.innerHTML = m_workqty;
			data6.innerHTML = m_workdate;
			data7.innerHTML = m_workers;
			data8.innerHTML = m_statusname;				
			data9.innerHTML = m_autogoodqty;
			data10.innerHTML = m_goodqty;
			data11.innerHTML = m_badqty;
			data12.innerHTML = m_worderno
			
			window.localStorage["histno"] 		= m_histno;
			window.localStorage["lotno"] 		= m_lotno; 
			window.localStorage["partcode"]		= m_partcode;
			window.localStorage["partname"] 	= m_partname;
			window.localStorage["partspec"] 	= m_partspec;
			window.localStorage["workqty"] 		= m_workqty;
			window.localStorage["workdate"] 	= m_workdate;				
			window.localStorage["workers"] 		= m_workers;
			window.localStorage["status"] 		= m_status;
			window.localStorage["statusname"] 	= m_statusname;
			window.localStorage["autogoodqty"] 	= m_autogoodqty;
			window.localStorage["goodqty"] 		= m_goodqty;
			window.localStorage["badqty"] 		= m_badqty;	
			window.localStorage["worderno"]     = m_worderno;
			window.localStorage["wipseq"]		= m_wipseq
	  };
}
		










	//window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
	var m_dbpath = window.localStorage.getItem("dbpath"); 
	var BadCode=new Array();
	var BadName=new Array();
	var partname = window.localStorage.getItem("partname");
	var mname = window.localStorage.getItem("mname");
	//var workhistoryno = "20110823A040001";
	var workhistoryno = window.localStorage.getItem("histno");
	var BadSeq;
	var SaveFlag="0";
	var totalbad = 0;
	
    var m_workFlag	= window.localStorage.getItem("workflag");//생산실적 입력방법
	window.localStorage["pagename"] 	= "BadResult.html";
	window.localStorage["actiongbn"]="";
	

    document.addEventListener("deviceready", onStart, false);
    function onStart() {   
    	document.addEventListener("backbutton", onBackButton, true);	
    	};
    
	

        function onBackButton(){
        	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
        			  , fn_confirmCallback_Exit
        			  , "이동"
        			  , "아니오,예");
        };

        function fn_confirmCallback_Exit(button){
        		if(button == 2)
        			fn_Back();
        } ;

        function fn_alertCallback(){};	

            	
	
	window.onload = function()
	{
		$(document).ready(function()
		{	
			Grid();
			var Data='{"start":' +"\"" +'1'+"\""+ '}';
			$.ajax({
			url: m_dbpath + "BadResult.aspx/init",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:Data,
			type:"POST",
			success:function(data)
			{
				$(makeOption(data.d.mydt));
			},
			error:function(data) {
				//alert('접속오류');
				navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
				}
			});
			
			$("#part")[0].innerHTML = partname;
			$("#mchname")[0].innerHTML = mname;
			
		});
		
		document.addEventListener("hidekeyboard", onHide, false);
        document.addEventListener("showkeyboard", onShow, false);

	};
	
	function onHide() 
    {
        $("#footer").show();
    };

    function onShow() 
    {
        $("#footer").hide();
    };

	function Grid()
	{
		var jsonData='{"workhistoryno":' +"\"" +workhistoryno+"\""+ '}';
			$.ajax({
			url: m_dbpath + "BadResult.aspx/badresult",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{
				$(makeControl(data.d.mydt));
			},
			error:function(data) {
				//alert('접속오류');
				navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
				}
			});
	};

	//옵션 컨트롤
	function makeOption(dt)
	{
		for (var row in dt)
		{
			//stringmem=dt[row]["MEMSHTNAME"];
			BadCode[row]=dt[row]["BADCODE"];
			BadName[row]=dt[row]["BADNAME"];
			option = document.createElement( "option" );
			option.value = BadCode[row];
			option.innerText = BadName[row];
			$("#com").append(option);

		}
		
	   $("#com")[0].selectedIndex =  -1;
	   $("#com").selectmenu("refresh");
	  // $('#com').submit();
	};

	//제큐 그리드 만들기
	function makeControl(dt)
	{//alert('d.');
			jQuery("#list4").jqGrid({
			datatype: "local",
			colNames:['순번','불량사유', '불량수량', '불량코드'],
			colModel:[
				{name:'SEQ',index:'SEQ', sorttype:"int",width:50,align:"center"},
				{name:'BADNAME',index:'BADNAME',width:100},
				{name:'QTY',index:'QTY',  align : 'center',width:55},	
				{name:'BADCODE',index:'BADCODE',hidden:true}
			],
			//multiselect: true,
			//viewrecords: true,
			autowidth : true,
			height: "200%",
			onSelectRow: function(SEQ)
			{ 
				Setting();
			}//,
			//caption: "불량실적관리"

			}).navGrid('#list4',{add:false,del:false,edit:false,position:'right'}); 
			var Data = new Array();
			for(row in dt)
			{
				Data[row]={SEQ:dt[row]["SEQ"],BADNAME:dt[row]["BADNAME"],QTY:dt[row]["QTY"],BADCODE:dt[row]["BADCODE"]};
				totalbad +=dt[row]["QTY"];
			}
			
			$("#totalbad")[0].innerHTML =  totalbad + " EA";
			totalbad=0;
			var mydata = [Data];
			for(var i=0;i<=mydata.length;i++)
			{
				jQuery("#list4").jqGrid('addRowData',i+1,mydata[i]);
			}

			//jQuery("#list4").hideCol("BADCODE");

	};

	function Setting()
	{
		$("#stats")[0].innerHTML="수정";
		SaveFlag="1";
		var id = jQuery("#list4").jqGrid('getGridParam','selrow');
		var ret = jQuery("#list4").jqGrid('getRowData',id);
		BadSeq = ret.SEQ;
		$("#bad").val((ret.QTY.replace(/\s+/, '')));
		$("#com").val(ret.BADCODE); 
		$("#com").selectmenu('refresh');
	};

	function Delete()
	{
		//alert(workhistoryno);
		//alert("h=> " + workhistoryno + ", s=> " + StopSeq);		
		if(workhistoryno == "" || BadSeq == "" || BadSeq == 'undefined' || BadSeq == "0")
		//alert(StopSeq);
			return;
		navigator.notification.confirm("삭제하시겠습니까?"
				  , fn_Delete
				  , "삭제"
				  , "아니오,예");
	};
	
	function fn_Delete(button)
	{ 
		if(button == 2)
		{
			var jsonData= '{"workhistoryno":' + "\""+ workhistoryno 
							+ "\"," +"\""+ "badseq"+"\":" + "\""+ BadSeq 
							+ "\"," + "badcode:" + "\""+  $("#com").val() + "\""
							+'}'
			//'{"workhistoryno":' + "\""+ workhistoryno + "\"," + "badcode:" + "\""+ $("#com").val() + "\"" +'}';
			$.ajax({
			url: m_dbpath + "BadResult.aspx/delete",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{
				//alert('삭제되었습니다.');
				navigator.notification.alert("삭제되었습니다.",fn_alertCallback, "알림","확인");
				jQuery("#list4").jqGrid('clearGridData');
				Grid();
				New();
			},
			error:function(data) {
				//alert('삭제에 실패하였습니다.');
				navigator.notification.alert("삭제에 실패하였습니다.",fn_alertCallback, "알림","확인");
				}
			});
			
		}
		else
		{
			 return;
		}
	
		//jQuery("#list4").jqGrid('clearGridData');
	};

	function Save()
	{
		if($("#com").val() == null){
			navigator.notification.alert("불량사유를 선택하세요.",fn_alertCallback, "알림","확인");
			return;
		}
		
		if( $("#bad").val() == null ||  $("#bad").val() == "" ||  $("#bad").val() == "0"){
			navigator.notification.alert("불량량을 입력하세요.",fn_alertCallback, "알림","확인");
			return;
		}
		
			var jsonData='{"workhistoryno":' + "\""+ workhistoryno 
						  + "\"," +"\""+ "badseq"+"\":" + "\""+ BadSeq 
						  + "\"," +"\""+ "badcode"+"\":" + "\""+ $("#com").val()
						  + "\"," +"\""+ "badqty"+"\":" + "\""+  $("#bad").val() 
						  + "\"," + "saveflag:" + "\""+ SaveFlag + "\""
						+'}'
			//'{"workhistoryno":' + "\""+ workhistoryno + "\"," + "badcode:" + "\""+ $("#com").val() + "\"" +'}';
			$.ajax({
			url: m_dbpath + "BadResult.aspx/update",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{
				if(data.d.mydt[0]["RESULT"] == "Y")
				{
					//alert('저장되었습니다.');
					navigator.notification.alert("저장되었습니다.",fn_alertCallback, "알림","확인");
					jQuery("#list4").jqGrid('clearGridData');
					Grid();
					New();
				}
				else
				{
					//alert('같은 불량코드가 있습니다.');
					navigator.notification.alert("저장을 실패하였습니다.",fn_alertCallback, "알림","확인");
				}
			},
			error:function(data) {
				//alert('저장에 실패하였습니다.');
				navigator.notification.alert("저장을 실패하였습니다.",fn_alertCallback, "알림","확인");
				}
			});
	};

	function New()
	{
		SaveFlag="0";
		BadSeq="";
		jQuery("#list4").resetSelection();
		$("#com")[0].selectedIndex =  -1;
		$("#com").selectmenu("refresh");
		$("#bad").val("");
		$("#stats")[0].innerHTML="신규";
	};
	
	 /*뒤로 버튼을 누르면 이전페이지로 되돌아 간다.  */
    function fn_Back() {
  		location.replace("./Main.html");
    };

    function fn_Manual() {
        	location.replace("./help/BadResultManual.html");
    };

	function fn_Tuto()
	{
		if(m_workFlag == "0" || m_workFlag == "" || m_workFlag==null)
		{//단일실적
			location.replace("./help/WorkResult01Tuto.html");
		}
		else if(m_workFlag == "1")
		{//쿼터실적
			location.replace("./help/WorkResult02Tuto.html");
		}
	};







    var m_empid, m_quarter, m_quartercd, m_histno, m_beforForm;
    /*Array List 객체 선언*/
    var List = new aryList();
    
    m_beforForm = window.localStorage.getItem("form")
    m_empid = window.localStorage.getItem("empid");
    m_histno = window.localStorage.getItem("histno");
    m_workFlag	= window.localStorage.getItem("workflag");//생산실적 입력방법

    //m_empid = 'ADMIN';
	window.localStorage["form"] = "machine";
	window.localStorage["pagename"] 	= "Machine.html";
	window.localStorage["codename"] 	= "";
 	//window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
	var m_dbpath = window.localStorage.getItem("dbpath"); 
	window.localStorage["actiongbn"]="";
	
    document.addEventListener("deviceready", onStart, false);
    function onStart() {   
    	document.addEventListener("backbutton", onBackButton, true);	
    	};

    	function onBackButton(){
    		navigator.notification.confirm("메뉴화면으로 이동하시겠습니까?"
    				  , fn_confirmCallback_Exit
    				  , "이동"
    				  , "아니오,예");
    	};

    	function fn_confirmCallback_Exit(button){
    			if(button == 2)    				
    				fn_Back();
    	} ;


    	function fn_alertCallback(){};	    	
    

    window.onload = function(){ 
   	 fn_GetMachineData();
   };

    //Array List 객체 정의
    function aryList() {
        this.aryData = [];
    };
    function aryData(mcd, mname, mtimecd, mtimename, mhistno) {
        this.mcd = mcd;
        this.mname = mname;
        this.mtimecd = mtimecd;
        this.mtimename = mtimename;
        this.mhistno = mhistno;
    };

    /*설비를 조회하여 리스트에 뿌린다.  */
    //////////////////////////////데이터 조회////////////////////////
    function fn_GetMachineData() {
        var json_param = '';
        if(m_empid == '')
            m_empid = window.localStorage.getItem("empid");
        
        $(document).ready(function() {  
            json_param = '{"empid":' + "\"" + m_empid + "\"" + '}';

            $.ajax({
                url: m_dbpath + "PorductReturnToJson.aspx/machinelist",
                contentType: "Application/json; charset=utf-8",
                dataType: "json",
                data: json_param,
                type: "POST",
                success: function(data) {
                    fn_SetMachineList(data.d); 
                    return;
                },
                error: function(data) { 
                	//alert('네트워크 상에 문제가 발생되었습니다.'); 
                	navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
                	}
            });
        });
    };

    function fn_SetMachineList(dt) {
        var strTemp;
        //입고예정서 dtl 정보 셋팅
        $("#listview li").remove();
        for (var row in dt.mydt) {
            var li = document.createElement("li");
            $("#listview").append(li);

            /*ArrayList를 이용한 데이터 보관(배열 객체)  */
			if(m_workFlag == "1")
			{
				List.aryData.push(new aryData( dt.mydt[row]["MACHINEID"]
											 , dt.mydt[row]["MACHINENAME"]
											 , dt.mydt[row]["CID"]
											 , dt.mydt[row]["CODENAME"]
											 , dt.mydt[row]["HISTNO"]
									));
			}
			else
			{
				List.aryData.push(new aryData( dt.mydt[row]["MACHINEID"]
											 , dt.mydt[row]["MACHINENAME"]
											 , dt.mydt[row]["TIMECD"]
											 , dt.mydt[row]["TIMENAME"]
											 , dt.mydt[row]["HISTNO"]
									));
			 }

            strTemp = "<a  onClick=fn_SelectData('" + dt.mydt[row]["MACHINEID"] + "')"
				+ " data-ajax='false'>"
				+ dt.mydt[row]["MACHINEID"]
				+ "  " + dt.mydt[row]["MACHINENAME"]
				+ "</a>";

            /*
            "<a  onClick=fn_SelectData('aaa','aaa') data-ajax='false'>101  A동 조립 (A7-8)</a>"		
            "<a  onClick=fn_SelectData('101','A동 조립 (A7-8)') data-ajax='false'>101  A동 조립 (A7-8)</a>"	
            */ 
            //list에 링크 유동적으로 추가
            $(li).append(strTemp);
            $("#listview").listview("refresh");
        }
        
        
        
    };

    /*설비를 선택한 경우  */
    function fn_SelectData(mcd) {
        var mname = '';

        for (var i = 0; i < List.aryData.length; i++) {
            if (mcd == List.aryData[i].mcd) {;
                mname = List.aryData[i].mname;
                m_quarter = List.aryData[i].mtimename;
                m_quartercd = List.aryData[i].mtimecd;
                m_histno    = List.aryData[i].mhistno;
                m_beforForm = "";
                
                break;
           }
        }         
		
        window.localStorage["mcd"] 			= mcd;
        window.localStorage["mname"] 		= mname;
        window.localStorage["quarter"] 		= m_quarter;
        window.localStorage["quartercd"] 	= m_quartercd;
        window.localStorage["histno"] 		= m_histno;
        
        
    	window.localStorage["odrkey"] 		= "";
    	window.localStorage["workdate"] 	= "";
    	window.localStorage["partcode"] 	= "";
    	window.localStorage["partname"] 	= "";
    	window.localStorage["partspec"] 	= "";
    	window.localStorage["workqty"] 		= "";
    	window.localStorage["statusname"] 	= "";
    	window.localStorage["status"] 		= "";
    	window.localStorage["worderno"] 	= "";
    	window.localStorage["wipseq"] 		= "";
    	window.localStorage["lotno"] 		= ""; 
    	window.localStorage["workers"] 		= "";

    	window.localStorage["autogoodqty"] 	= "0";
    	window.localStorage["goodqty"] 		= "0";
    	window.localStorage["badqty"] 		= "0"; 
        
    	if(m_histno == "")
    	{
           	location.replace("./Orders.html");
           	return;
    	}
        fn_Back();
    };

 
    /*뒤로 버튼을 누르면 이전페이지로 되돌아 간다.  */
    function fn_Back() {
    	if(m_beforForm == 'menu')
       		location.replace("./Menu.html");
    	else
    		location.replace("./Main.html");
    };
    
    function fn_Work(){
		
    	location.replace("./Main.html");
    };
    
    function fn_Menu(){
    	location.replace("./Menu.html");	
    };

	function fn_MachinManual(){
		location.replace("./help/MachineManual.html");
	}
   
	function fn_Tuto()
	{
		if(m_workFlag == "0" || m_workFlag == "" || m_workFlag==null)
		{//단일실적
			location.replace("./help/WorkResult01Tuto.html");
		}
		else if(m_workFlag == "1")
		{//쿼터실적
			location.replace("./help/WorkResult02Tuto.html");
		}
	}

















		jQuery.extend(jQuery.mobile.datebox.prototype.options, {
			useNewStyle: true
		});	
	
    var m_empid, 	m_mcd, 		m_center;	//조회주건	
    var m_workqty, 	m_sdate,   	m_odrkey,	m_partcode, 	m_partname, m_partspec;; 
    var m_workers, 	m_status, 	m_statusname;
    var m_worderno, m_wipseq,   m_form;
    /*Array List 객체 선언*/
   // var List = new aryList();
    
   m_empid 	= window.localStorage["empid"];
    /*m_mcd 		= window.localStorage["mcd"];
    m_mname 	= window.localStorage["mname"];
    m_statusname = window.localStorage["statusname"];
    m_form = window.localStorage["form"] ;
    m_center    = window.localStorage["center"];
    window.localStorage["actiongbn"]="";*/
    
   //m_empid = 'ADMIN';
   // m_cd = 'A01';
   //alert (m_empid);
   
 	window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
    var m_dbpath = window.localStorage.getItem("dbpath"); 
	var m_workFlag	= window.localStorage.getItem("workflag");//생산실적 입력방법
	window.localStorage["pagename"] = "Wips.html";
	var m_screenWidth = screen.availWidth ;	
	//var m_dbpath = 'http://121.78.112.176:222/T_POP/';

    document.addEventListener("deviceready", onStart, false);
    function onStart() {       
    	document.addEventListener("backbutton", onBackButton, true);

		$(document).ready(function()
		{	
			fn_Timeset();
			var Data='{"strEmpid":' +"\"" +m_empid+"\""+ '}';
			$.ajax({
			url: m_dbpath + "Wips.aspx/js_machine",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:Data,
			type:"POST",
			success:function(data)
			{
				$(makeOption(data.d.mydt));
			},
			error:function(data) {
				//alert('접속오류');
				navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
				}
			});
		});
    };

	
	window.onload = function()
	{
	    /*var tolito = TolitoProgressBar('progressbar100')
                    .setOuterTheme('b')
                    .setInnerTheme('e')
                    .isMini(true)
                    .setMax(100)
                    .showCounter(true)
                    .build();
			 $("#progressbar100").progressbar({ value: 90 });
			    var tolito = TolitoProgressBar('prigressbarid')
                    .setOuterTheme('b')
                    .setInnerTheme('e')
                    .isMini(true)
                    .setMax(100)
                    .showCounter(true)
                    .build();
			 $("#prigressbarid").progressbar({ value: '90' });*/ 
	}

    function fn_Timeset()
	{
		//2134010  a03 20130403132122 01
		var now = new Date(); 
		var mm = (now.getMonth()+1)+"";
		var dd = now.getDate();
		if(parseInt(mm) < 10)
		{
			mm= "0" + mm;
		}
		else
		{
			mm =mm;
		}
		if(parseInt(dd) < 10)
		{
			dd= "0" + dd;
		}
		else
		{
			dd = dd;
		}
		$('#sdate').trigger('datebox', {'method':'set', 'value':(now.getFullYear()+'-'+mm+'-'+dd)});
	};

	//옵션 컨트롤
	function makeOption(dt)
	{
		for (var row in dt)
		{
			option = document.createElement( "option" );
			option.value = dt[row]["MACHINEID"];
			option.innerText = dt[row]["MACHINENAME"];
			$("#com").append(option);

		}
		
	   $("#com")[0].selectedIndex = 0;
	   $("#com").selectmenu("refresh");
	  // $('#com').submit();
	};

	function fn_Search()
	{
		  json_param = '{"strEmpid":' + "\"" + m_empid + "\"," 
            	       + "strWorkdate:" + "\"" + $("#sdate").val().replace("-","").replace("-","") + "\"," 
            	       + "strMachine:" + "\"" + $("#com").val() + "\"" + '}';

            $.ajax({
                url: m_dbpath + "Wips.aspx/js_Select",
                contentType: "Application/json; charset=utf-8",
                dataType: "json",
                data: json_param,
                type: "POST",
                success: function(data) {
                    fn_List(data.d.mydt); 
                },
                error: function(data) {
                	//alert('네트워크 상에 문제가 발생되었습니다.');
                	navigator.notification.alert("네트워크 상에 문제가 발생되었습니다.",fn_alertCallback, "알림","확인");
                	}
            });
	};

	function fn_List(dt)
	{
		 var strTemp, icnt, progressbarid, strSpace, strSpace1;
        icnt = 0;
        
        $("#listview li").remove();
		 for (var row in dt) {
			progressbarid = "progressbar"+row;
            var li = document.createElement("li");
            $("#listview").append(li);
            icnt = icnt + 1

			strSpace = "&nbsp;&nbsp;";
            strSpace1 = "&nbsp;&nbsp;";
            iLoop = 10 - dt[row]["GOODQTY"].length;
            for(var i=0; i <= iLoop; i++){
            	strSpace = strSpace + "&nbsp;";
            }
            
            iLoop = 10 - dt[row]["BADQTY"].length;
            for(var i=0; i <= iLoop; i++){
            	strSpace1 = strSpace1 + "&nbsp;";
            }

			//alert( dt[row]["WORDERNO"] + dt[row]["CENTERNAME"] );
			if(m_screenWidth>330)
			{
				strTemp =  "<a style='padding: 0px 5px 5px 0px;'>"
						  +" <h3>지시번호 : "
						  +  dt[row]["WORDERNO"] +" ("+ dt[row]["CENTERNAME"] +")" +"</h3>"
						  +" <p>설  비  명 &nbsp : " + dt[row]["MACHINENAME"] +"</p>"
						  +" <p>품  목  명 &nbsp : " + dt[row]["PARTNAME"] +"</p>"
						  +" <p>지시수량 : " + dt[row]["WORKQTY"] + strSpace
						  + " 양품량 : " +  dt[row]["GOODQTY"] + strSpace1
						  + " 불량량 : " + dt[row]["BADQTY"] +"</p>"
						  +" <p> <dib>  진척율 </div></p>"
						  +" <p><div id='" + progressbarid + "'></div></p>"
						  +" </a>";	
				/*strTemp = "<table width='100%' cellspacing='0' cellpadding='0' class='party_tbl_new'>"
				        + "<tr>"
				        + "<td height='40' align='left' width='20%'>지시번호</td>"
						+ */
			}
			else
			{
				strTemp =  "<a>"
						  +" <h3>지시번호 : "
						  +  dt[row]["WORDERNO"] +" ("+ dt[row]["CENTERNAME"] +")" +"</h3>"
						  +" <p>설  비  명 &nbsp : " + dt[row]["MACHINENAME"] +"</p>"
						  +" <p>품  목  명 &nbsp : " + dt[row]["PARTNAME"] +"</p>"
						  +" <p>지시수량 : " + dt[row]["WORKQTY"] +"</p>"
						  +" <p>양  품  량 &nbsp : " +  dt[row]["GOODQTY"] + "</p>"
						  +" <p>불  량  량 &nbsp : " + dt[row]["BADQTY"] +"</p>"
						  +" <p> <dib>  진척율 </div></p>"
						  +" <p><div id='" + progressbarid + "'></div></p>"
						  +" </a>";
			}
//	<div id="progressbar1"></div>
			//alert(parseInt(dt[0]["PER"]));
            //list에 링크 유동적으로 추가
            $(li).append(strTemp);
			var tolito = TolitoProgressBar(progressbarid)
			.setOuterTheme('b')
			.setInnerTheme('e')
			.isMini(true)
			.setMax(100)
			.showCounter(true)
			.build();
			 $('#'+progressbarid).progressbar({ value: parseInt(dt[row]["PER"]) });
            $("#listview").listview("refresh");
        }
        
        //alert(icnt);
        if(icnt == 0) 
        	navigator.notification.alert("조회결과가 없습니다.",fn_alertCallback, "알림","확인");
	};





    function onBackButton(){
    	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
    			  , fn_confirmCallback_Exit
    			  , "이동"
    			  , "아니오,예");
    };

    function fn_confirmCallback_Exit(button){
    		if(button == 2)
    			fn_Back();
    			//navigator.app.exitApp();
    } ;

    function fn_alertCallback(){};	


    /*뒤로 버튼을 누르면 이전페이지로 되돌아 간다.  */
    function fn_Back() {
        	location.replace("./MenuSearch.html");
    };

    function fn_Manual() {
        	location.replace("./help/WipsManual.html");
    };

	function fn_Tuto()
	{
		if(m_workFlag == "0" || m_workFlag == "" || m_workFlag==null)
		{//단일실적
			location.replace("./help/WorkResult01Tuto.html");
		}
		else if(m_workFlag == "1")
		{//쿼터실적
			location.replace("./help/WorkResult02Tuto.html");
		}
	};



//This file should be used if you want to debug and develop
function jqGridInclude()
{
    var pathtojsfiles = "js/"; // need to be ajusted
    // set include to false if you do not want some modules to be included
    var modules = [
        { include: true, incfile:'i18n/grid.locale-en.js'}, // jqGrid translation
        { include: true, incfile:'grid.base.js'}, // jqGrid base
        { include: true, incfile:'grid.common.js'}, // jqGrid common for editing
        { include: true, incfile:'grid.formedit.js'}, // jqGrid Form editing
        { include: true, incfile:'grid.inlinedit.js'}, // jqGrid inline editing
        { include: true, incfile:'grid.celledit.js'}, // jqGrid cell editing
        { include: true, incfile:'grid.subgrid.js'}, //jqGrid subgrid
        { include: true, incfile:'grid.treegrid.js'}, //jqGrid treegrid
	{ include: true, incfile:'grid.grouping.js'}, //jqGrid grouping
        { include: true, incfile:'grid.custom.js'}, //jqGrid custom 
        { include: true, incfile:'grid.tbltogrid.js'}, //jqGrid table to grid 
        { include: true, incfile:'grid.import.js'}, //jqGrid import
        { include: true, incfile:'jquery.fmatter.js'}, //jqGrid formater
        { include: true, incfile:'JsonXml.js'}, //xmljson utils
        { include: true, incfile:'grid.jqueryui.js'}, //jQuery UI utils
        { include: true, incfile:'grid.filter.js'} // filter Plugin
    ];
    var filename;
    for(var i=0;i<modules.length; i++)
    {
        if(modules[i].include === true) {
        	filename = pathtojsfiles+modules[i].incfile;
			if(jQuery.browser.safari) {
				jQuery.ajax({url:filename,dataType:'script', async:false, cache: true});
			} else {
				if (jQuery.browser.msie) {
					document.write('<script charset="utf-8" type="text/javascript" src="'+filename+'"></script>');
				} else {
					IncludeJavaScript(filename);
				}
			}
		}
    }
	function IncludeJavaScript(jsFile)
    {
        var oHead = document.getElementsByTagName('head')[0];
        var oScript = document.createElement('script');
        oScript.setAttribute('type', 'text/javascript');
        oScript.setAttribute('language', 'javascript');
        oScript.setAttribute('src', jsFile);
        oHead.appendChild(oScript);
    }
}
jqGridInclude();


/*
 Transform a table to a jqGrid.
 Peter Romianowski <peter.romianowski@optivo.de> 
 If the first column of the table contains checkboxes or
 radiobuttons then the jqGrid is made selectable.
*/
// Addition - selector can be a class or id
function tableToGrid(selector, options) {
jQuery(selector).each(function() {
	if(this.grid) {return;} //Adedd from Tony Tomov
	// This is a small "hack" to make the width of the jqGrid 100%
	jQuery(this).width("99%");
	var w = jQuery(this).width();

	// Text whether we have single or multi select
	var inputCheckbox = jQuery('tr td:first-child input[type=checkbox]:first', jQuery(this));
	var inputRadio = jQuery('tr td:first-child input[type=radio]:first', jQuery(this));
	var selectMultiple = inputCheckbox.length > 0;
	var selectSingle = !selectMultiple && inputRadio.length > 0;
	var selectable = selectMultiple || selectSingle;
	//var inputName = inputCheckbox.attr("name") || inputRadio.attr("name");

	// Build up the columnModel and the data
	var colModel = [];
	var colNames = [];
	jQuery('th', jQuery(this)).each(function() {
		if (colModel.length === 0 && selectable) {
			colModel.push({
				name: '__selection__',
				index: '__selection__',
				width: 0,
				hidden: true
			});
			colNames.push('__selection__');
		} else {
			colModel.push({
				name: jQuery(this).attr("id") || jQuery.trim(jQuery.jgrid.stripHtml(jQuery(this).html())).split(' ').join('_'),
				index: jQuery(this).attr("id") || jQuery.trim(jQuery.jgrid.stripHtml(jQuery(this).html())).split(' ').join('_'),
				width: jQuery(this).width() || 150
			});
			colNames.push(jQuery(this).html());
		}
	});
	var data = [];
	var rowIds = [];
	var rowChecked = [];
	jQuery('tbody > tr', jQuery(this)).each(function() {
		var row = {};
		var rowPos = 0;
		jQuery('td', jQuery(this)).each(function() {
			if (rowPos === 0 && selectable) {
				var input = jQuery('input', jQuery(this));
				var rowId = input.attr("value");
				rowIds.push(rowId || data.length);
				if (input.is(":checked")) {
					rowChecked.push(rowId);
				}
				row[colModel[rowPos].name] = input.attr("value");
			} else {
				row[colModel[rowPos].name] = jQuery(this).html();
			}
			rowPos++;
		});
		if(rowPos >0) { data.push(row); }
	});

	// Clear the original HTML table
	jQuery(this).empty();

	// Mark it as jqGrid
	jQuery(this).addClass("scroll");

	jQuery(this).jqGrid(jQuery.extend({
		datatype: "local",
		width: w,
		colNames: colNames,
		colModel: colModel,
		multiselect: selectMultiple
		//inputName: inputName,
		//inputValueCol: imputName != null ? "__selection__" : null
	}, options || {}));

	// Add data
	var a;
	for (a = 0; a < data.length; a++) {
		var id = null;
		if (rowIds.length > 0) {
			id = rowIds[a];
			if (id && id.replace) {
				// We have to do this since the value of a checkbox
				// or radio button can be anything 
				id = encodeURIComponent(id).replace(/[.\-%]/g, "_");
			}
		}
		if (id === null) {
			id = a + 1;
		}
		jQuery(this).jqGrid("addRowData",id, data[a]);
	}

	// Set the selection
	for (a = 0; a < rowChecked.length; a++) {
		jQuery(this).jqGrid("setSelection",rowChecked[a]);
	}
});
};


/*jshint eqeqeq:false, eqnull:true */
/*global jQuery */
// Grouping module
(function($){
"use strict";
$.extend($.jgrid,{
	template : function(format){ //jqgformat
		var args = $.makeArray(arguments).slice(1), j, al = args.length;
		if(format==null) { format = ""; }
		return format.replace(/\{([\w\-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g, function(m,i){
			if(!isNaN(parseInt(i,10))) {
				return args[parseInt(i,10)];
			}
			for(j=0; j < al;j++) {
				if($.isArray(args[j])) {
					var nmarr = args[ j ],
					k = nmarr.length;
					while(k--) {
						if(i===nmarr[k].nm) {
							return nmarr[k].v;
						}
					}
				}
			}
		});
	}
});
$.jgrid.extend({
	groupingSetup : function () {
		return this.each(function (){
			var $t = this, i, j, cml, cm = $t.p.colModel, grp = $t.p.groupingView;
			if(grp !== null && ( (typeof grp === 'object') || $.isFunction(grp) ) ) {
				if(!grp.groupField.length) {
					$t.p.grouping = false;
				} else {
					if (grp.visibiltyOnNextGrouping === undefined) {
						grp.visibiltyOnNextGrouping = [];
					}

					grp.lastvalues=[];
					grp.groups =[];
					grp.counters =[];
					for(i=0;i<grp.groupField.length;i++) {
						if(!grp.groupOrder[i]) {
							grp.groupOrder[i] = 'asc';
						}
						if(!grp.groupText[i]) {
							grp.groupText[i] = '{0}';
						}
						if( typeof grp.groupColumnShow[i] !== 'boolean') {
							grp.groupColumnShow[i] = true;
						}
						if( typeof grp.groupSummary[i] !== 'boolean') {
							grp.groupSummary[i] = false;
						}
						if(grp.groupColumnShow[i] === true) {
							grp.visibiltyOnNextGrouping[i] = true;
							$($t).jqGrid('showCol',grp.groupField[i]);
						} else {
							grp.visibiltyOnNextGrouping[i] = $("#"+$.jgrid.jqID($t.p.id+"_"+grp.groupField[i])).is(":visible");
							$($t).jqGrid('hideCol',grp.groupField[i]);
						}
					}
					grp.summary =[];
					for(j=0, cml = cm.length; j < cml; j++) {
						if(cm[j].summaryType) {
							grp.summary.push({nm:cm[j].name,st:cm[j].summaryType, v: '', sr: cm[j].summaryRound, srt: cm[j].summaryRoundType || 'round'});
						}
					}
				}
			} else {
				$t.p.grouping = false;
			}
		});
	},
	groupingPrepare : function (rData, gdata, record, irow) {
		this.each(function(){
			var grp = this.p.groupingView, $t= this, i,
			grlen = grp.groupField.length, 
			fieldName,
			v,
			displayName,
			displayValue,
			changed = 0;
			for(i=0;i<grlen;i++) {
				fieldName = grp.groupField[i];
				displayName = grp.displayField[i];
				v = record[fieldName];
				displayValue = displayName == null ? null : record[displayName];

				if( displayValue == null ) {
					displayValue = v;
				}
				if( v !== undefined ) {
					if(irow === 0 ) {
						// First record always starts a new group
						grp.groups.push({idx:i,dataIndex:fieldName,value:v, displayValue: displayValue, startRow: irow, cnt:1, summary : [] } );
						grp.lastvalues[i] = v;
						grp.counters[i] = {cnt:1, pos:grp.groups.length-1, summary: $.extend(true,[],grp.summary)};
						$.each(grp.counters[i].summary,function() {
							if ($.isFunction(this.st)) {
								this.v = this.st.call($t, this.v, this.nm, record);
							} else {
								this.v = $($t).jqGrid('groupingCalculations.handler',this.st, this.v, this.nm, this.sr, this.srt, record);
							}
						});
						grp.groups[grp.counters[i].pos].summary = grp.counters[i].summary;
					} else {
						if( typeof v !== "object" && grp.lastvalues[i] !== v ) {
							// This record is not in same group as previous one
							grp.groups.push({idx:i,dataIndex:fieldName,value:v, displayValue: displayValue, startRow: irow, cnt:1, summary : [] } );
							grp.lastvalues[i] = v;
							changed = 1;
							grp.counters[i] = {cnt:1, pos:grp.groups.length-1, summary: $.extend(true,[],grp.summary)};
							$.each(grp.counters[i].summary,function() {
								if ($.isFunction(this.st)) {
									this.v = this.st.call($t, this.v, this.nm, record);
								} else {
									this.v = $($t).jqGrid('groupingCalculations.handler',this.st, this.v, this.nm, this.sr, this.srt, record);
								}
							});
							grp.groups[grp.counters[i].pos].summary = grp.counters[i].summary;
						} else {
							if (changed === 1) {
								// This group has changed because an earlier group changed.
								grp.groups.push({idx:i,dataIndex:fieldName,value:v, displayValue: displayValue, startRow: irow, cnt:1, summary : [] } );
								grp.lastvalues[i] = v;
								grp.counters[i] = {cnt:1, pos:grp.groups.length-1, summary: $.extend(true,[],grp.summary)};
								$.each(grp.counters[i].summary,function() {
									if ($.isFunction(this.st)) {
										this.v = this.st.call($t, this.v, this.nm, record);
									} else {
										this.v = $($t).jqGrid('groupingCalculations.handler',this.st, this.v, this.nm, this.sr, this.srt, record);
									}
								});
								grp.groups[grp.counters[i].pos].summary = grp.counters[i].summary;
							} else {
								grp.counters[i].cnt += 1;
								grp.groups[grp.counters[i].pos].cnt = grp.counters[i].cnt;
								$.each(grp.counters[i].summary,function() {
									if ($.isFunction(this.st)) {
										this.v = this.st.call($t, this.v, this.nm, record);
									} else {
										this.v = $($t).jqGrid('groupingCalculations.handler',this.st, this.v, this.nm, this.sr, this.srt, record);
									}
								});
								grp.groups[grp.counters[i].pos].summary = grp.counters[i].summary;
							}
						}
					}
				}
			}
			gdata.push( rData );
		});
		return gdata;
	},
	groupingToggle : function(hid){
		this.each(function(){
			var $t = this,
			grp = $t.p.groupingView,
			strpos = hid.split('_'),
			//uid = hid.substring(0,strpos+1),
			num = parseInt(strpos[strpos.length-2], 10);
			strpos.splice(strpos.length-2,2);
			var uid = strpos.join("_"),
			minus = grp.minusicon,
			plus = grp.plusicon,
			tar = $("#"+$.jgrid.jqID(hid)),
			r = tar.length ? tar[0].nextSibling : null,
			tarspan = $("#"+$.jgrid.jqID(hid)+" span."+"tree-wrap-"+$t.p.direction),
			collapsed = false, tspan;
			if( tarspan.hasClass(minus) ) {
				if(grp.showSummaryOnHide) {
					if(r){
						while(r) {
							if($(r).hasClass('jqfoot') ) {
								var lv = parseInt($(r).attr("jqfootlevel"),10);
								if(  lv <= num) {
									break;
								}
							}
							$(r).hide();
							r = r.nextSibling;
						}
					}
				} else  {
					if(r){
						while(r) {
							if( $(r).hasClass(uid+"_"+String(num) ) || $(r).hasClass(uid+"_"+String(num-1))) { break; }
							$(r).hide();
							r = r.nextSibling;
						}
					}
				}
				tarspan.removeClass(minus).addClass(plus);
				collapsed = true;
			} else {
				if(r){
					while(r) {
						if($(r).hasClass(uid+"_"+String(num)) || $(r).hasClass(uid+"_"+String(num-1)) ) { break; }
						$(r).show();
						tspan = $(r).find("span."+"tree-wrap-"+$t.p.direction);
						if( tspan && $(tspan).hasClass(plus) ) {
							$(tspan).removeClass(plus).addClass(minus);
						}
						r = r.nextSibling;
					}
				}
				tarspan.removeClass(plus).addClass(minus);
			}
			$($t).triggerHandler("jqGridGroupingClickGroup", [hid , collapsed]);
			if( $.isFunction($t.p.onClickGroup)) { $t.p.onClickGroup.call($t, hid , collapsed); }

		});
		return false;
	},
	groupingRender : function (grdata, colspans ) {
		return this.each(function(){
			var $t = this,
			grp = $t.p.groupingView,
			str = "", icon = "", hid, clid, pmrtl = grp.groupCollapse ? grp.plusicon : grp.minusicon, gv, cp=[], len =grp.groupField.length;
			pmrtl += " tree-wrap-"+$t.p.direction; 
			$.each($t.p.colModel, function (i,n){
				var ii;
				for(ii=0;ii<len;ii++) {
					if(grp.groupField[ii] === n.name ) {
						cp[ii] = i;
						break;
					}
				}
			});
			var toEnd = 0;
			function findGroupIdx( ind , offset, grp) {
				var ret = false, i;
				if(offset===0) {
					ret = grp[ind];
				} else {
					var id = grp[ind].idx;
					if(id===0) { 
						ret = grp[ind]; 
					}  else {
						for(i=ind;i >= 0; i--) {
							if(grp[i].idx === id-offset) {
								ret = grp[i];
								break;
							}
						}
					}
				}
				return ret;
			}
			var sumreverse = $.makeArray(grp.groupSummary);
			sumreverse.reverse();
			$.each(grp.groups,function(i,n){
				toEnd++;
				clid = $t.p.id+"ghead_"+n.idx;
				hid = clid+"_"+i;
				icon = "<span style='cursor:pointer;' class='ui-icon "+pmrtl+"' onclick=\"jQuery('#"+$.jgrid.jqID($t.p.id)+"').jqGrid('groupingToggle','"+hid+"');return false;\"></span>";
				try {
					gv = $t.formatter(hid, n.displayValue, cp[n.idx], n.value );
				} catch (egv) {
					gv = n.displayValue;
				}
				str += "<tr id=\""+hid+"\" role=\"row\" class= \"ui-widget-content jqgroup ui-row-"+$t.p.direction+" "+clid+"\"><td style=\"padding-left:"+(n.idx * 12) + "px;"+"\" colspan=\""+colspans+"\">"+icon+$.jgrid.template(grp.groupText[n.idx], gv, n.cnt, n.summary)+"</td></tr>";
				var leaf = len-1 === n.idx; 
				if( leaf ) {
					var gg = grp.groups[i+1], k, kk, ik;
					var end = gg !== undefined ?  grp.groups[i+1].startRow : grdata.length;
					for(kk=n.startRow;kk<end;kk++) {
						str += grdata[kk].join('');
					}
					var jj;
					if (gg !== undefined) {
						for (jj = 0; jj < grp.groupField.length; jj++) {
							if (gg.dataIndex === grp.groupField[jj]) {
								break;
							}
						}
						toEnd = grp.groupField.length - jj;
					}
					for (ik = 0; ik < toEnd; ik++) {
						if(!sumreverse[ik]) { continue; }
						var hhdr = "";
						if(grp.groupCollapse && !grp.showSummaryOnHide) {
							hhdr = " style=\"display:none;\"";
						}
						str += "<tr"+hhdr+" jqfootlevel=\""+(n.idx-ik)+"\" role=\"row\" class=\"ui-widget-content jqfoot ui-row-"+$t.p.direction+"\">";
						var fdata = findGroupIdx(i, ik, grp.groups),
						cm = $t.p.colModel,
						vv, grlen = fdata.cnt;
						for(k=0; k<colspans;k++) {
							var tmpdata = "<td "+$t.formatCol(k,1,'')+">&#160;</td>",
							tplfld = "{0}";
							$.each(fdata.summary,function(){
								if(this.nm === cm[k].name) {
									if(cm[k].summaryTpl)  {
										tplfld = cm[k].summaryTpl;
									}
									if(typeof this.st === 'string' && this.st.toLowerCase() === 'avg') {
										if(this.v && grlen > 0) {
											this.v = (this.v/grlen);
										}
									}
									try {
										vv = $t.formatter('', this.v, k, this);
									} catch (ef) {
										vv = this.v;
									}
									tmpdata= "<td "+$t.formatCol(k,1,'')+">"+$.jgrid.format(tplfld,vv)+ "</td>";
									return false;
								}
							});
							str += tmpdata;
						}
						str += "</tr>";
					}
					toEnd = jj;
				}
			});
			$("#"+$.jgrid.jqID($t.p.id)+" tbody:first").append(str);
			// free up memory
			str = null;
		});
	},
	groupingGroupBy : function (name, options ) {
		return this.each(function(){
			var $t = this;
			if(typeof name === "string") {
				name = [name];
			}
			var grp = $t.p.groupingView;
			$t.p.grouping = true;

			//Set default, in case visibilityOnNextGrouping is undefined 
			if (grp.visibiltyOnNextGrouping === undefined) {
				grp.visibiltyOnNextGrouping = [];
			}
			var i;
			// show previous hidden groups if they are hidden and weren't removed yet
			for(i=0;i<grp.groupField.length;i++) {
				if(!grp.groupColumnShow[i] && grp.visibiltyOnNextGrouping[i]) {
				$($t).jqGrid('showCol',grp.groupField[i]);
				}
			}
			// set visibility status of current group columns on next grouping
			for(i=0;i<name.length;i++) {
				grp.visibiltyOnNextGrouping[i] = $("#"+$.jgrid.jqID($t.p.id)+"_"+$.jgrid.jqID(name[i])).is(":visible");
			}
			$t.p.groupingView = $.extend($t.p.groupingView, options || {});
			grp.groupField = name;
			$($t).trigger("reloadGrid");
		});
	},
	groupingRemove : function (current) {
		return this.each(function(){
			var $t = this;
			if(current === undefined) {
				current = true;
			}
			$t.p.grouping = false;
			if(current===true) {
				var grp = $t.p.groupingView, i;
				// show previous hidden groups if they are hidden and weren't removed yet
				for(i=0;i<grp.groupField.length;i++) {
				if (!grp.groupColumnShow[i] && grp.visibiltyOnNextGrouping[i]) {
						$($t).jqGrid('showCol', grp.groupField);
					}
				}
				$("tr.jqgroup, tr.jqfoot","#"+$.jgrid.jqID($t.p.id)+" tbody:first").remove();
				$("tr.jqgrow:hidden","#"+$.jgrid.jqID($t.p.id)+" tbody:first").show();
			} else {
				$($t).trigger("reloadGrid");
			}
		});
	},
	groupingCalculations : {
		handler: function(fn, v, field, round, roundType, rc) {
			var funcs = {
				sum: function() {
					return parseFloat(v||0) + parseFloat((rc[field]||0));
				},

				min: function() {
					if(v==="") {
						return parseFloat(rc[field]||0);
					}
					return Math.min(parseFloat(v),parseFloat(rc[field]||0));
				},

				max: function() {
					if(v==="") {
						return parseFloat(rc[field]||0);
					}
					return Math.max(parseFloat(v),parseFloat(rc[field]||0));
				},

				count: function() {
					if(v==="") {v=0;}
					if(rc.hasOwnProperty(field)) {
						return v+1;
					}
					return 0;
				},

				avg: function() {
					// the same as sum, but at end we divide it
					// so use sum instead of duplicating the code (?)
					return funcs.sum();
				}
			};

			if(!funcs[fn]) {
				throw ("jqGrid Grouping No such method: " + fn);
			}
			var res = funcs[fn]();

			if (round != null) {
				if (roundType == 'fixed') {
					res = res.toFixed(round);
				} else {
					var mul = Math.pow(10, round);
					res = Math.round(res * mul) / mul;
				}
			}

			return res;
		}	
	}
});
})(jQuery);






	
	var txtid;
	var configWriteFlag =0;

	document.addEventListener("deviceready",star,false);

	function star()
	{ 
		document.addEventListener("backbutton", onBackButton, true); 
		checkFileSystem();
	}

	function checkFileSystem()
	{
		window.requestFileSystem(LocalFileSystem.PERSISTENT,0,gotFS,fail);
	};

	function gotFS(fileSystem)
	{ 
		rootDir = fileSystem.root;
		fileSystem.root.getDirectory("Tab",{create:true},gotDirEntry,fail);
	};
		
	function gotDirEntry(dirEntry)
	{ 
		dirEntry.getFile("page1.txt",{create:true},gotFileEntry,fail);
	};

	function gotFileEntry(fileEntry)
	{
		if(configWriteFlag==0)
		{
			fileEntry.file(readFile,fail);
		}
		else
		{ 
			fileEntry.createWriter(writeFile,fail);
		}
	};

	function readFile(file)
	{
		var reader = new FileReader();
		reader.onloadend = function(evt)
		{
			var data = evt.target.result;
			read = data;
			
			if(read == null)
			{
				return;
			}
			else
			{	
				show();
			}
		}
		reader.readAsText(file);
	};

	function writeFile(file)
	{
		//file 생성시 exclusive를 설정하지 않으면 새로 갱신한다.
		fileTxt = $("#txt1").val()+","+$("#txt2").val()+","+$("#txt3").val()+","+$("#txt4").val()+","+$("#txt5").val()+","+$("#txt6").val()+","+$("#txt7").val()+","+$("#txt8").val();
		file.write(fileTxt);
		navigator.notification.alert("저장되었습니다.",fn_alertCallback, "알림","확인");
	};

	function fail(error)
	{
		alert(error.code);
	};
	function show()
	{
		var enter=read.split(",");
		$("#txt1").val(enter[0]);
		$("#txt2").val(enter[1]);
		$("#txt3").val(enter[2]);
		$("#txt4").val(enter[3]);
		$("#txt5").val(enter[4]);
		$("#txt6").val(enter[5]);
		$("#txt7").val(enter[6]);
		$("#txt8").val(enter[7]);
	};

	function fn_alertCallback(){};
	
	function numset(num)
	{
		var tempval=$(txtid).val();
		if(num==10)
		{
			num = ".";
		}
		tempval = tempval+num;
		$(txtid).val(tempval);
	};

	function idset(num)
	{	
		$(txtid).css("background-color","");
		txtid="#txt"+num;
		$(txtid).css("background-color","white");

	};

	function delnum()
	{
		var value = $(txtid).val();
		$(txtid).val(value.substring(0,value.length-1));
	};
	
	function cr()
	{
		$(txtid).val("");
	};

	function save()
	{
		configWriteFlag=1;
		checkFileSystem();
	};
	
	function Init()
	{
		var i;
		for(i=1; i<9; i++)
		{
			$(("#txt"+i)).val("");
		}
	};

	function Trans()
	{
		navigator.notification.alert("전송되었습니다.",fn_alertCallback, "알림","확인");
	};

	function next()
	{
		$.mobile.changePage($(document.location.href="./Tab2.html"), {transition:"pop", reverse:true, changeHash:true} );
		//location.replace("./Tab2.html");
	};

	function key()
	{
		$.mobile.changePage($(document.location.href="./Tab1_key.html"), {transition:"pop", reverse:true, changeHash:true} );
	}

/*프로그램 종료  */
	function fn_Exit()
	{ 	
		navigator.notification.confirm("프로그램을 종료하시겠습니까?"
				  , fn_confirmCallback_Exit
				  , "종료"
				  , "아니오,예");		    
	};

	function onBackButton(){
		navigator.notification.confirm("프로그램을 종료하시겠습니까?"
				  , fn_confirmCallback_Exit
				  , "종료"
				  , "아니오,예");
	};

	function fn_confirmCallback_Exit(button){
			if(button == 2)
				navigator.app.exitApp();
	} ;







	
	var txtid;
	var configWriteFlag =0;


	document.addEventListener("deviceready",star,false);

	function star()
	{ 
		checkFileSystem();
	}

	function checkFileSystem()
	{
		window.requestFileSystem(LocalFileSystem.PERSISTENT,0,gotFS,fail);
	};

	function gotFS(fileSystem)
	{ 
		rootDir = fileSystem.root;
		fileSystem.root.getDirectory("Tab",{create:true},gotDirEntry,fail);
	};
		
	function gotDirEntry(dirEntry)
	{ 
		dirEntry.getFile("page1.txt",{create:true},gotFileEntry,fail);
	};

	function gotFileEntry(fileEntry)
	{
		if(configWriteFlag==0)
		{
			fileEntry.file(readFile,fail);
		}
		else
		{ 
			fileEntry.createWriter(writeFile,fail);
		}
	};

	function readFile(file)
	{
		var reader = new FileReader();
		reader.onloadend = function(evt)
		{
			var data = evt.target.result;
			read = data;
			
			if(read == null)
			{
				return;
			}
			else
			{	
				show();
			}
		}
		reader.readAsText(file);
	};

	function writeFile(file)
	{
		//file 생성시 exclusive를 설정하지 않으면 새로 갱신한다.
		fileTxt = $("#txt1").val()+","+$("#txt2").val()+","+$("#txt3").val()+","+$("#txt4").val()+","+$("#txt5").val()+","+$("#txt6").val()+","+$("#txt7").val()+","+$("#txt8").val()+","+$("#txt9").val();
		file.write(fileTxt);
		//$.mobile.changePage($(document.location.href="./SelectMachine.html"+"?"+Empno+"?"+username+"?"+memberid), {transition:"pop", reverse:true, changeHash:true} );
	};

	function fail(error)
	{
		alert(error.code);
	};
	function show()
	{
		var enter=read.split(",");
		$("#txt1").val(enter[0]);
		$("#txt2").val(enter[1]);
		$("#txt3").val(enter[2]);
		$("#txt4").val(enter[3]);
		$("#txt5").val(enter[4]);
		$("#txt6").val(enter[5]);
		$("#txt7").val(enter[6]);
		$("#txt8").val(enter[7]);
		$("#txt9").val(enter[8]);
	};
			
	function numset(num)
	{
		var tempval=$(txtid).val();
		tempval = tempval+num;
		$(txtid).val(tempval);
	};

	function idset(num)
	{
		$(txtid).css('background-color','');
		txtid="#txt"+num;
		$(txtid).css('background-color','yellow');
		//alert(txtid);
	};

	function delnum()
	{
		var value = $(txtid).val();
		$(txtid).val(value.substring(0,value.length-1));
	};

	function save()
	{
		configWriteFlag=1;
		checkFileSystem();
	}









	var m_pagename = window.localStorage.getItem("pagename");

	$(function(){
			/*$("div[data-role='page']").live('pageshow', function(event, ui) {					
				var pageid = $.mobile.activePage.attr("id");					
				pagenum = parseInt(pageid.charAt(4));					
				var prevpage = pageid.substring(0,4) + (pagenum-1);					
				var nextpage = pageid.substring(0,4) + (pagenum+1);					// Swipe Right					
			$('#'+pageid).bind('swiperight',function(event){						
				$.mobile.changePage('#'+prevpage,"slide","reverse")					
			});					// Swipe Left					
			$('#'+pageid).bind('swipeleft',function(event){						
				$.mobile.changePage('#'+nextpage,"slide","reverse")				
			});			swiperight	
		});*/
		
			$('#page1').bind('swipeleft',function(event){						
				$.mobile.changePage("#page2","slide","reverse")					
			});					// Swipe Left					
			$('#page2').bind('swiperight',function(event){						
				$.mobile.changePage('#page1',"slide","reverse")				
			});	
	});	
			
		window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
		var m_dbpath = window.localStorage.getItem("dbpath"); 
		//document.addEventListener("deviceready",onDeviceReady,false);
		window.onload = function(){  
			//$('#image').css({'height':(($(document).height())/2)+'px'});
		};
		
		//alert(m_id + "," + m_pass + "," + m_empid + "," + m_name + "," + m_mcd + "," + m_mname );
		
 
	document.addEventListener("deviceready", onStart, false);
    function onStart() {
    	document.addEventListener("backbutton", onBackButton, true);	
    };
    

    function onBackButton(){
    	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
    			  , fn_confirmCallback_Exit
    			  , "이동"
    			  , "아니오,예");
    };

    function fn_confirmCallback_Exit(button){
    		if(button == 2)
    			fn_Back();
    			//navigator.app.exitApp();
    } ;
	
	function fn_Back(){
		//location.replace("../Login.html"); 
		location.replace(("../"+m_pagename));
	};

	function fn_MenuLsit(){
		//location.replace("../Login.html"); 
		$.mobile.changePage($(document.location.href="./MenuList.html"), {transition:"pop", reverse:true, changeHash:true} );
	};

function fn_alertCallback(){};	
	






		var m_pagename = window.localStorage.getItem("pagename");
		window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
		var m_dbpath = window.localStorage.getItem("dbpath"); 
		//document.addEventListener("deviceready",onDeviceReady,false);
		window.onload = function(){  
			//$('#image').css({'height':(($(document).height())/2)+'px'});
		};
		
		//alert(m_id + "," + m_pass + "," + m_empid + "," + m_name + "," + m_mcd + "," + m_mname );
		
 
	document.addEventListener("deviceready", onStart, false);
    function onStart() {
    	document.addEventListener("backbutton", onBackButton, true);	
    };
    

    function onBackButton(){
    	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
    			  , fn_confirmCallback_Exit
    			  , "이동"
    			  , "아니오,예");
    };

    function fn_confirmCallback_Exit(button){
    		if(button == 2)
    			fn_Back();
    			//navigator.app.exitApp();
    } ;
	
	function fn_Back(){
		//location.replace("../Login.html"); 
		location.replace(("../"+m_pagename));
	};

	function fn_MenuLsit(){
		//location.replace("../Login.html"); 
		$.mobile.changePage($(document.location.href="./MenuList.html"), {transition:"pop", reverse:true, changeHash:true} );
	};

function fn_alertCallback(){};	
	






		var m_pagename = window.localStorage.getItem("pagename");
		window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
		var m_dbpath = window.localStorage.getItem("dbpath"); 
		//document.addEventListener("deviceready",onDeviceReady,false);
		window.onload = function(){  
			//$('#image').css({'height':(($(document).height())/2)+'px'});
		};
		
		//alert(m_id + "," + m_pass + "," + m_empid + "," + m_name + "," + m_mcd + "," + m_mname );
		
 
	document.addEventListener("deviceready", onStart, false);
    function onStart() {
    	document.addEventListener("backbutton", onBackButton, true);	
    };
    

    function onBackButton(){
    	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
    			  , fn_confirmCallback_Exit
    			  , "이동"
    			  , "아니오,예");
    };

    function fn_confirmCallback_Exit(button){
    		if(button == 2)
    			fn_Back();
    			//navigator.app.exitApp();
    } ;
	
	function fn_Back(){
		//location.replace("../Login.html"); 
		location.replace(("../"+m_pagename));
	};

	function fn_MenuLsit(){
		//location.replace("../Login.html"); 
		$.mobile.changePage($(document.location.href="./MenuList.html"), {transition:"pop", reverse:true, changeHash:true} );
	};

function fn_alertCallback(){};	
	






		var m_pagename = window.localStorage.getItem("pagename");
		window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
		var m_dbpath = window.localStorage.getItem("dbpath"); 
		//document.addEventListener("deviceready",onDeviceReady,false);
		window.onload = function(){  
			//$('#image').css({'height':(($(document).height())/2)+'px'});
		};
		
		//alert(m_id + "," + m_pass + "," + m_empid + "," + m_name + "," + m_mcd + "," + m_mname );
		
 
	document.addEventListener("deviceready", onStart, false);
    function onStart() {
    	document.addEventListener("backbutton", onBackButton, true);	
    };
    

    function onBackButton(){
    	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
    			  , fn_confirmCallback_Exit
    			  , "이동"
    			  , "아니오,예");
    };

    function fn_confirmCallback_Exit(button){
    		if(button == 2)
    			fn_Back();
    			//navigator.app.exitApp();
    } ;
	
	function fn_Back(){
		//location.replace("../Login.html"); 
		location.replace(("../"+m_pagename));
	};

	function fn_MenuLsit(){
		//location.replace("../Login.html"); 
		$.mobile.changePage($(document.location.href="./MenuList.html"), {transition:"pop", reverse:true, changeHash:true} );
	};

function fn_alertCallback(){};	
	






		var m_pagename = window.localStorage.getItem("pagename");

		window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
		var m_dbpath = window.localStorage.getItem("dbpath"); 
		//document.addEventListener("deviceready",onDeviceReady,false);
		window.onload = function(){  
			//$('#image').css({'height':(($(document).height())/2)+'px'});
		};
		
		//alert(m_id + "," + m_pass + "," + m_empid + "," + m_name + "," + m_mcd + "," + m_mname );
		
 
	document.addEventListener("deviceready", onStart, false);
    function onStart() {
    	document.addEventListener("backbutton", onBackButton, true);	
    };
    

    function onBackButton(){
    	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
    			  , fn_confirmCallback_Exit
    			  , "이동"
    			  , "아니오,예");
    };

    function fn_confirmCallback_Exit(button){
    		if(button == 2)
    			fn_Back();
    			//navigator.app.exitApp();
    } ;
	
	function fn_Back(){
		location.replace(("../"+m_pagename));
		//alert("adsf");
		//$.mobile.changePage($(document.location.href="../Login.html"), {transition:"pop", reverse:true, changeHash:true} );
	};

	function fn_MenuLsit(){
		//location.replace("../Login.html"); 
		$.mobile.changePage($(document.location.href="./MenuList.html"), {transition:"pop", reverse:true, changeHash:true} );
	};
	function fn_alertCallback(){};	
	







var m_pagename = window.localStorage.getItem("pagename")

document.addEventListener("deviceready", onDeviceReady, false);
 
function onDeviceReady() {	 
    BackButton();
}; 

function BackButton(){
   document.addEventListener("backbutton", onBackButton, true);  
};
 

function onBackButton(){
	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
			  , fn_confirmCallback_Exit
			  , "알림"
			  , "아니오,예");
};

function fn_confirmCallback_Exit(button){
		if(button == 2)
			fn_Back();
} ;

function fn_alertCallback(){};	

function fn_Back() {
		location.replace(("../"+m_pagename));
};








		var m_pagename = window.localStorage.getItem("pagename");
		window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
		var m_dbpath = window.localStorage.getItem("dbpath"); 
		//document.addEventListener("deviceready",onDeviceReady,false);
		window.onload = function(){  
			//$('#image').css({'height':(($(document).height())/2)+'px'});
		};
		
		//alert(m_id + "," + m_pass + "," + m_empid + "," + m_name + "," + m_mcd + "," + m_mname );
		
 
	document.addEventListener("deviceready", onStart, false);
    function onStart() {
    	document.addEventListener("backbutton", onBackButton, true);	
    };
    

    function onBackButton(){
    	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
    			  , fn_confirmCallback_Exit
    			  , "이동"
    			  , "아니오,예");
    };

    function fn_confirmCallback_Exit(button){
    		if(button == 2)
    			fn_Back();
    			//navigator.app.exitApp();
    } ;
	
	function fn_Back(){
		//location.replace("../Login.html"); 
		location.replace(("../"+m_pagename));
	};

	function fn_MenuLsit(){
		//location.replace("../Login.html"); 
		$.mobile.changePage($(document.location.href="./MenuList.html"), {transition:"pop", reverse:true, changeHash:true} );
	};

function fn_alertCallback(){};	
	






		var m_pagename = window.localStorage.getItem("pagename");
		window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
		var m_dbpath = window.localStorage.getItem("dbpath"); 
		//document.addEventListener("deviceready",onDeviceReady,false);
		window.onload = function(){  
			//$('#image').css({'height':(($(document).height())/2)+'px'});
		};
		
		//alert(m_id + "," + m_pass + "," + m_empid + "," + m_name + "," + m_mcd + "," + m_mname );
		
 
	document.addEventListener("deviceready", onStart, false);
    function onStart() {
    	document.addEventListener("backbutton", onBackButton, true);	
    };
    

    function onBackButton(){
    	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
    			  , fn_confirmCallback_Exit
    			  , "이동"
    			  , "아니오,예");
    };

    function fn_confirmCallback_Exit(button){
    		if(button == 2)
    			fn_Back();
    			//navigator.app.exitApp();
    } ;
	
	function fn_Back(){
		//location.replace("../Login.html"); 
		location.replace(("../"+m_pagename));
	};

	function fn_MenuLsit(){
		//location.replace("../Login.html"); 
		$.mobile.changePage($(document.location.href="./MenuList.html"), {transition:"pop", reverse:true, changeHash:true} );
	};

function fn_alertCallback(){};	
	






		var m_pagename = window.localStorage.getItem("pagename");
		window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
		var m_dbpath = window.localStorage.getItem("dbpath"); 
		//document.addEventListener("deviceready",onDeviceReady,false);
		window.onload = function(){  
			//$('#image').css({'height':(($(document).height())/2)+'px'});
		};
		
		//alert(m_id + "," + m_pass + "," + m_empid + "," + m_name + "," + m_mcd + "," + m_mname );
		
 
	document.addEventListener("deviceready", onStart, false);
    function onStart() {
    	document.addEventListener("backbutton", onBackButton, true);	
    };
    

    function onBackButton(){
    	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
    			  , fn_confirmCallback_Exit
    			  , "이동"
    			  , "아니오,예");
    };

    function fn_confirmCallback_Exit(button){
    		if(button == 2)
    			fn_Back();
    			//navigator.app.exitApp();
    } ;
	
	function fn_Back(){
		//location.replace("../Login.html"); 
		location.replace(("../"+m_pagename));
	};

	function fn_MenuLsit(){
		//location.replace("../Login.html"); 
		$.mobile.changePage($(document.location.href="./MenuList.html"), {transition:"pop", reverse:true, changeHash:true} );
	};

function fn_alertCallback(){};	
	






		var m_pagename = window.localStorage.getItem("pagename");
		window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
		var m_dbpath = window.localStorage.getItem("dbpath"); 
		//document.addEventListener("deviceready",onDeviceReady,false);
		window.onload = function(){  
			//$('#image').css({'height':(($(document).height())/2)+'px'});
		};
		
		//alert(m_id + "," + m_pass + "," + m_empid + "," + m_name + "," + m_mcd + "," + m_mname );
		
 
	document.addEventListener("deviceready", onStart, false);
    function onStart() {
    	document.addEventListener("backbutton", onBackButton, true);	
    };
    

    function onBackButton(){
    	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
    			  , fn_confirmCallback_Exit
    			  , "이동"
    			  , "아니오,예");
    };

    function fn_confirmCallback_Exit(button){
    		if(button == 2)
    			fn_Back();
    			//navigator.app.exitApp();
    } ;
	
	function fn_Back(){
		//location.replace("../Login.html"); 
		location.replace(("../"+m_pagename));
	};

	function fn_MenuLsit(){
		//location.replace("../Login.html"); 
		$.mobile.changePage($(document.location.href="./MenuList.html"), {transition:"pop", reverse:true, changeHash:true} );
	};

function fn_alertCallback(){};	
	





	$(function(){
			/*$("div[data-role='page']").live('pageshow', function(event, ui) {					
				var pageid = $.mobile.activePage.attr("id");					
				pagenum = parseInt(pageid.charAt(4));					
				var prevpage = pageid.substring(0,4) + (pagenum-1);					
				var nextpage = pageid.substring(0,4) + (pagenum+1);					// Swipe Right					
			$('#'+pageid).bind('swiperight',function(event){						
				$.mobile.changePage('#'+prevpage,"slide","reverse")					
			});					// Swipe Left					
			$('#'+pageid).bind('swipeleft',function(event){						
				$.mobile.changePage('#'+nextpage,"slide","reverse")				
			});			swiperight	
		});*/
		
			$('#page1').bind('swipeleft',function(event){						
				$.mobile.changePage("#page2","slide","reverse")					
			});					// Swipe Left					
			$('#page2').bind('swiperight',function(event){						
				$.mobile.changePage('#page1',"slide","reverse")				
			});	
	});	
			
		window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
		var m_dbpath = window.localStorage.getItem("dbpath"); 
		//document.addEventListener("deviceready",onDeviceReady,false);
		window.onload = function(){  
			//$('#image').css({'height':(($(document).height())/2)+'px'});
		};
		
		//alert(m_id + "," + m_pass + "," + m_empid + "," + m_name + "," + m_mcd + "," + m_mname );
		
 
	document.addEventListener("deviceready", onStart, false);
    function onStart() {
    	document.addEventListener("backbutton", onBackButton, true);	
    };
    

    function onBackButton(){
    	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
    			  , fn_confirmCallback_Exit
    			  , "이동"
    			  , "아니오,예");
    };

    function fn_confirmCallback_Exit(button){
    		if(button == 2)
    			fn_Back();
    			//navigator.app.exitApp();
    } ;
	
	function fn_Back(){
		//location.replace("../Login.html"); 
		$.mobile.changePage($(document.location.href="../StopResult.html"), {transition:"pop", reverse:true, changeHash:true} );
	};

	function fn_MenuLsit(){
		//location.replace("../Login.html"); 
		$.mobile.changePage($(document.location.href="./MenuList.html"), {transition:"pop", reverse:true, changeHash:true} );
	};

function fn_alertCallback(){};	
	






		var m_pagename = window.localStorage.getItem("pagename");
		window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
		var m_dbpath = window.localStorage.getItem("dbpath"); 
		//document.addEventListener("deviceready",onDeviceReady,false);
		window.onload = function(){  
			//$('#image').css({'height':(($(document).height())/2)+'px'});
		};
		
		//alert(m_id + "," + m_pass + "," + m_empid + "," + m_name + "," + m_mcd + "," + m_mname );
		
 
	document.addEventListener("deviceready", onStart, false);
    function onStart() {
    	document.addEventListener("backbutton", onBackButton, true);	
    };
    

    function onBackButton(){
    	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
    			  , fn_confirmCallback_Exit
    			  , "이동"
    			  , "아니오,예");
    };

    function fn_confirmCallback_Exit(button){
    		if(button == 2)
    			fn_Back();
    			//navigator.app.exitApp();
    } ;
	
	function fn_Back(){
		//location.replace("../Login.html"); 
		location.replace(("../"+m_pagename));
	};

	function fn_MenuLsit(){
		//location.replace("../Login.html"); 
		$.mobile.changePage($(document.location.href="./MenuList.html"), {transition:"pop", reverse:true, changeHash:true} );
	};

function fn_alertCallback(){};	
	






		var m_pagename = window.localStorage.getItem("pagename");
		window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
		var m_dbpath = window.localStorage.getItem("dbpath"); 
		//document.addEventListener("deviceready",onDeviceReady,false);
		window.onload = function(){  
			//$('#image').css({'height':(($(document).height())/2)+'px'});
		};
		
		//alert(m_id + "," + m_pass + "," + m_empid + "," + m_name + "," + m_mcd + "," + m_mname );
		
 
	document.addEventListener("deviceready", onStart, false);
    function onStart() {
    	document.addEventListener("backbutton", onBackButton, true);	
    };
    

    function onBackButton(){
    	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
    			  , fn_confirmCallback_Exit
    			  , "이동"
    			  , "아니오,예");
    };

    function fn_confirmCallback_Exit(button){
    		if(button == 2)
    			fn_Back();
    			//navigator.app.exitApp();
    } ;
	
	function fn_Back(){
		//location.replace("../Login.html"); 
		location.replace(("../"+m_pagename));
	};

	function fn_MenuLsit(){
		//location.replace("../Login.html"); 
		$.mobile.changePage($(document.location.href="./MenuList.html"), {transition:"pop", reverse:true, changeHash:true} );
	};

function fn_alertCallback(){};	
	






		var m_pagename = window.localStorage.getItem("pagename");
		window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
		var m_dbpath = window.localStorage.getItem("dbpath"); 
		//document.addEventListener("deviceready",onDeviceReady,false);
		window.onload = function(){  
			//$('#image').css({'height':(($(document).height())/2)+'px'});
		};
		
		//alert(m_id + "," + m_pass + "," + m_empid + "," + m_name + "," + m_mcd + "," + m_mname );
		
 
	document.addEventListener("deviceready", onStart, false);
    function onStart() {
    	document.addEventListener("backbutton", onBackButton, true);	
    };
    

    function onBackButton(){
    	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
    			  , fn_confirmCallback_Exit
    			  , "이동"
    			  , "아니오,예");
    };

    function fn_confirmCallback_Exit(button){
    		if(button == 2)
    			fn_Back();
    			//navigator.app.exitApp();
    } ;
	
	function fn_Back(){
		//location.replace("../Login.html"); 
		location.replace(("../"+m_pagename));
	};

	function fn_MenuLsit(){
		//location.replace("../Login.html"); 
		$.mobile.changePage($(document.location.href="./MenuList.html"), {transition:"pop", reverse:true, changeHash:true} );
	};

function fn_alertCallback(){};	
	






		var m_pagename = window.localStorage.getItem("pagename");
		window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
		var m_dbpath = window.localStorage.getItem("dbpath"); 
		//document.addEventListener("deviceready",onDeviceReady,false);
		window.onload = function(){  
			//$('#image').css({'height':(($(document).height())/2)+'px'});
		};
		
		//alert(m_id + "," + m_pass + "," + m_empid + "," + m_name + "," + m_mcd + "," + m_mname );
		
 
	document.addEventListener("deviceready", onStart, false);
    function onStart() {
    	document.addEventListener("backbutton", onBackButton, true);	
    };
    

    function onBackButton(){
    	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
    			  , fn_confirmCallback_Exit
    			  , "이동"
    			  , "아니오,예");
    };

    function fn_confirmCallback_Exit(button){
    		if(button == 2)
    			fn_Back();
    			//navigator.app.exitApp();
    } ;
	
	function fn_Back(){
		//location.replace("../Login.html"); 
		location.replace(("../"+m_pagename));
	};

	function fn_MenuLsit(){
		//location.replace("../Login.html"); 
		$.mobile.changePage($(document.location.href="./MenuList.html"), {transition:"pop", reverse:true, changeHash:true} );
	};

function fn_alertCallback(){};	
	






		var m_pagename = window.localStorage.getItem("pagename");
		window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
		var m_dbpath = window.localStorage.getItem("dbpath"); 
		var m_workFlag	= window.localStorage.getItem("workflag");//생산실적 입력방법
		var Data;
		//document.addEventListener("deviceready",onDeviceReady,false);
		window.onload = function(){  
			//$('#image').css({'height':(($(document).height())/2)+'px'});
		};
		
		//alert(m_id + "," + m_pass + "," + m_empid + "," + m_name + "," + m_mcd + "," + m_mname );
		
 
	document.addEventListener("deviceready", onStart, false);
    function onStart() {
    	//document.addEventListener("backbutton", onBackButton, true);	
    };
    

    function onBackButton(){
    	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
    			  , fn_confirmCallback_Exit
    			  , "이동"
    			  , "아니오,예");
    };

    function fn_confirmCallback_Exit(button){
    		if(button == 2)
    			fn_Back();
    			//navigator.app.exitApp();
    } ;
	
	function fn_Back(){
		//location.replace("../Login.html"); 
		location.replace(("../"+m_pagename));
	};

    function fn_Manual(Data) {
		if(Data=="./RESULTManual.html")
		{
			if(m_workFlag == "0" || m_workFlag == "" || m_workFlag==null)
			{//단일실적
				location.replace("./WorkResult01Manual.html");
			}
			else if (m_workFlag == "1")//쿼터실적
			{
				location.replace("./WorkResult02Manual.html");
			}
		}
		else
		{
			location.replace(Data);
		}
		//location.replace("./WorkResult02Manual.html");
    };
function fn_alertCallback(){};	
	






	var m_pagename = window.localStorage.getItem("pagename");

	$(function(){
			/*$("div[data-role='page']").live('pageshow', function(event, ui) {					
				var pageid = $.mobile.activePage.attr("id");					
				pagenum = parseInt(pageid.charAt(4));					
				var prevpage = pageid.substring(0,4) + (pagenum-1);					
				var nextpage = pageid.substring(0,4) + (pagenum+1);					// Swipe Right					
			$('#'+pageid).bind('swiperight',function(event){						
				$.mobile.changePage('#'+prevpage,"slide","reverse")					
			});					// Swipe Left					
			$('#'+pageid).bind('swipeleft',function(event){						
				$.mobile.changePage('#'+nextpage,"slide","reverse")				
			});			swiperight	
		});*/
		
			$('#page1').bind('swipeleft',function(event){						
				$.mobile.changePage("#page2","slide","reverse")					
			});					// Swipe Left					
			$('#page2').bind('swiperight',function(event){						
				$.mobile.changePage('#page1',"slide","reverse")				
			});	
	});	
			
		window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
		var m_dbpath = window.localStorage.getItem("dbpath"); 
		//document.addEventListener("deviceready",onDeviceReady,false);
		window.onload = function(){  
			//$('#image').css({'height':(($(document).height())/2)+'px'});
		};
		
		//alert(m_id + "," + m_pass + "," + m_empid + "," + m_name + "," + m_mcd + "," + m_mname );
		
 
	document.addEventListener("deviceready", onStart, false);
    function onStart() {
    	document.addEventListener("backbutton", onBackButton, true);	
    };
    

    function onBackButton(){
    	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
    			  , fn_confirmCallback_Exit
    			  , "이동"
    			  , "아니오,예");
    };

    function fn_confirmCallback_Exit(button){
    		if(button == 2)
    			fn_Back();
    			//navigator.app.exitApp();
    } ;
	
	function fn_Back(){
		//location.replace("../Login.html"); 
		location.replace(("../"+m_pagename));
	};

	function fn_MenuLsit(){
		//location.replace("../Login.html"); 
		$.mobile.changePage($(document.location.href="./MenuList.html"), {transition:"pop", reverse:true, changeHash:true} );
	};

function fn_alertCallback(){};	
	






		var m_pagename = window.localStorage.getItem("pagename");
		window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
		var m_dbpath = window.localStorage.getItem("dbpath"); 
		//document.addEventListener("deviceready",onDeviceReady,false);
		window.onload = function(){  
			//$('#image').css({'height':(($(document).height())/2)+'px'});
		};
		
		//alert(m_id + "," + m_pass + "," + m_empid + "," + m_name + "," + m_mcd + "," + m_mname );
		
 
	document.addEventListener("deviceready", onStart, false);
    function onStart() {
    	document.addEventListener("backbutton", onBackButton, true);	
    };
    

    function onBackButton(){
    	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
    			  , fn_confirmCallback_Exit
    			  , "이동"
    			  , "아니오,예");
    };

    function fn_confirmCallback_Exit(button){
    		if(button == 2)
    			fn_Back();
    			//navigator.app.exitApp();
    } ;
	
	function fn_Back(){
		//location.replace("../Login.html"); 
		location.replace(("../"+m_pagename));
	};

	function fn_MenuLsit(){
		//location.replace("../Login.html"); 
		$.mobile.changePage($(document.location.href="./MenuList.html"), {transition:"pop", reverse:true, changeHash:true} );
	};

function fn_alertCallback(){};	
	






	var m_pagename = window.localStorage.getItem("pagename");

	$(function(){
			/*$("div[data-role='page']").live('pageshow', function(event, ui) {					
				var pageid = $.mobile.activePage.attr("id");					
				pagenum = parseInt(pageid.charAt(4));					
				var prevpage = pageid.substring(0,4) + (pagenum-1);					
				var nextpage = pageid.substring(0,4) + (pagenum+1);					// Swipe Right					
			$('#'+pageid).bind('swiperight',function(event){						
				$.mobile.changePage('#'+prevpage,"slide","reverse")					
			});					// Swipe Left					
			$('#'+pageid).bind('swipeleft',function(event){						
				$.mobile.changePage('#'+nextpage,"slide","reverse")				
			});			swiperight	
		});*/
		
			$('#page1').bind('swipeleft',function(event){						
				$.mobile.changePage("#page2","slide","reverse")					
			});					// Swipe Left					
			$('#page2').bind('swiperight',function(event){						
				$.mobile.changePage('#page1',"slide","reverse")				
			});	
	});	
			
		window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
		var m_dbpath = window.localStorage.getItem("dbpath"); 
		//document.addEventListener("deviceready",onDeviceReady,false);
		window.onload = function(){  
			//$('#image').css({'height':(($(document).height())/2)+'px'});
		};
		
		//alert(m_id + "," + m_pass + "," + m_empid + "," + m_name + "," + m_mcd + "," + m_mname );
		
 
	document.addEventListener("deviceready", onStart, false);
    function onStart() {
    	document.addEventListener("backbutton", onBackButton, true);	
    };
    

    function onBackButton(){
    	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
    			  , fn_confirmCallback_Exit
    			  , "이동"
    			  , "아니오,예");
    };

    function fn_confirmCallback_Exit(button){
    		if(button == 2)
    			fn_Back();
    			//navigator.app.exitApp();
    } ;
	
	function fn_Back(){
		//location.replace("../Login.html"); 
		location.replace(("../"+m_pagename));
	};

	function fn_MenuLsit(){
		//location.replace("../Login.html"); 
		$.mobile.changePage($(document.location.href="./MenuList.html"), {transition:"pop", reverse:true, changeHash:true} );
	};

function fn_alertCallback(){};	
	






	var m_pagename = window.localStorage.getItem("pagename");

	$(function(){
			/*$("div[data-role='page']").live('pageshow', function(event, ui) {					
				var pageid = $.mobile.activePage.attr("id");					
				pagenum = parseInt(pageid.charAt(4));					
				var prevpage = pageid.substring(0,4) + (pagenum-1);					
				var nextpage = pageid.substring(0,4) + (pagenum+1);					// Swipe Right					
			$('#'+pageid).bind('swiperight',function(event){						
				$.mobile.changePage('#'+prevpage,"slide","reverse")					
			});					// Swipe Left					
			$('#'+pageid).bind('swipeleft',function(event){						
				$.mobile.changePage('#'+nextpage,"slide","reverse")				
			});			swiperight	
		});*/
		
			$('#page1').bind('swipeleft',function(event){						
				$.mobile.changePage("#page2","slide","reverse")					
			});					// Swipe Left					
			$('#page2').bind('swiperight',function(event){						
				$.mobile.changePage('#page1',"slide","reverse")				
			});	
	});	
			
		window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
		var m_dbpath = window.localStorage.getItem("dbpath"); 
		//document.addEventListener("deviceready",onDeviceReady,false);
		window.onload = function(){  
			//$('#image').css({'height':(($(document).height())/2)+'px'});
		};
		
		//alert(m_id + "," + m_pass + "," + m_empid + "," + m_name + "," + m_mcd + "," + m_mname );
		
 
	document.addEventListener("deviceready", onStart, false);
    function onStart() {
    	document.addEventListener("backbutton", onBackButton, true);	
    };
    

    function onBackButton(){
    	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
    			  , fn_confirmCallback_Exit
    			  , "이동"
    			  , "아니오,예");
    };

    function fn_confirmCallback_Exit(button){
    		if(button == 2)
    			fn_Back();
    			//navigator.app.exitApp();
    } ;
	
	function fn_Back(){
		//location.replace("../Login.html"); 
		location.replace(("../"+m_pagename));
	};

	function fn_MenuLsit(){
		//location.replace("../Login.html"); 
		$.mobile.changePage($(document.location.href="./MenuList.html"), {transition:"pop", reverse:true, changeHash:true} );
	};

function fn_alertCallback(){};	
	






		var m_pagename = window.localStorage.getItem("pagename");
		window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
		var m_dbpath = window.localStorage.getItem("dbpath"); 
		//document.addEventListener("deviceready",onDeviceReady,false);
		window.onload = function(){  
			//$('#image').css({'height':(($(document).height())/2)+'px'});
		};
		
		//alert(m_id + "," + m_pass + "," + m_empid + "," + m_name + "," + m_mcd + "," + m_mname );
		
 
	document.addEventListener("deviceready", onStart, false);
    function onStart() {
    	document.addEventListener("backbutton", onBackButton, true);	
    };
    

    function onBackButton(){
    	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
    			  , fn_confirmCallback_Exit
    			  , "이동"
    			  , "아니오,예");
    };

    function fn_confirmCallback_Exit(button){
    		if(button == 2)
    			fn_Back();
    			//navigator.app.exitApp();
    } ;
	
	function fn_Back(){
		//location.replace("../Login.html"); 
		location.replace(("../"+m_pagename));
	};

	function fn_MenuLsit(){
		//location.replace("../Login.html"); 
		$.mobile.changePage($(document.location.href="./MenuList.html"), {transition:"pop", reverse:true, changeHash:true} );
	};

function fn_alertCallback(){};	
	






		var m_pagename = window.localStorage.getItem("pagename");
		window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
		var m_dbpath = window.localStorage.getItem("dbpath"); 
		//document.addEventListener("deviceready",onDeviceReady,false);
		window.onload = function(){  
			//$('#image').css({'height':(($(document).height())/2)+'px'});
		};
		
		//alert(m_id + "," + m_pass + "," + m_empid + "," + m_name + "," + m_mcd + "," + m_mname );
		
 
	document.addEventListener("deviceready", onStart, false);
    function onStart() {
    	document.addEventListener("backbutton", onBackButton, true);	
		//TelephonyManager tm = null;
		 
		//tm = (TelephonyManager)this.ctx.getSystemService(Context.TELEPHONY_SERVICE);
		 
		//result = tm.getLine1Number();
		//alert(result);

    };
    

    function onBackButton(){
    	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
    			  , fn_confirmCallback_Exit
    			  , "이동"
    			  , "아니오,예");
    };

    function fn_confirmCallback_Exit(button){
    		if(button == 2)
    			fn_Back();
    			//navigator.app.exitApp();
    } ;
	
	function fn_Back(){
		//location.replace("../Login.html"); 
		location.replace(("../"+m_pagename));
	};

	function fn_MenuLsit(){
		//location.replace("../Login.html"); 
		$.mobile.changePage($(document.location.href="./MenuList.html"), {transition:"pop", reverse:true, changeHash:true} );
	};

function fn_alertCallback(){};	
	






	var m_pagename = window.localStorage.getItem("pagename");

	$(function(){
			/*$("div[data-role='page']").live('pageshow', function(event, ui) {					
				var pageid = $.mobile.activePage.attr("id");					
				pagenum = parseInt(pageid.charAt(4));					
				var prevpage = pageid.substring(0,4) + (pagenum-1);					
				var nextpage = pageid.substring(0,4) + (pagenum+1);					// Swipe Right					
			$('#'+pageid).bind('swiperight',function(event){						
				$.mobile.changePage('#'+prevpage,"slide","reverse")					
			});					// Swipe Left					
			$('#'+pageid).bind('swipeleft',function(event){						
				$.mobile.changePage('#'+nextpage,"slide","reverse")				
			});			swiperight	
		});*/
		
			$('#page1').bind('swipeleft',function(event){						
				$.mobile.changePage("#page2","slide","reverse")					
			});					// Swipe Left					
			$('#page2').bind('swiperight',function(event){						
				$.mobile.changePage('#page1',"slide","reverse")				
			});	
	});	
			
		window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
		var m_dbpath = window.localStorage.getItem("dbpath"); 
		//document.addEventListener("deviceready",onDeviceReady,false);
		window.onload = function(){  
			//$('#image').css({'height':(($(document).height())/2)+'px'});
		};
		
		//alert(m_id + "," + m_pass + "," + m_empid + "," + m_name + "," + m_mcd + "," + m_mname );
		
 
	document.addEventListener("deviceready", onStart, false);
    function onStart() {
    	document.addEventListener("backbutton", onBackButton, true);	
    };
    

    function onBackButton(){
    	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
    			  , fn_confirmCallback_Exit
    			  , "이동"
    			  , "아니오,예");
    };

    function fn_confirmCallback_Exit(button){
    		if(button == 2)
    			fn_Back();
    			//navigator.app.exitApp();
    } ;
	
	function fn_Back(){
		//location.replace("../Login.html"); 
		location.replace(("../"+m_pagename));
	};

	function fn_MenuLsit(){
		//location.replace("../Login.html"); 
		$.mobile.changePage($(document.location.href="./MenuList.html"), {transition:"pop", reverse:true, changeHash:true} );
	};

function fn_alertCallback(){};	
	





    /* onload="view = new Viewport(this.width, this.height)"
	Viewport = function(width, height){
        var theImage = document.getElementById('theImage');
        this.width = width;
        this.height = height;
        this.set = function(){
            var metas = document.getElementsByTagName('meta');
            for(i=0; i<metas.length; i++){
                if(metas[i].name == 'viewport'){
                    metas[i].setAttribute('content','width=' + width + 
                                ', height='+ height + ', user-scalable=yes,  minimum-scale=1.0, maximum-scale=5.0');
                    theImage.style.width = '100%';
                }
            }
        }
        this.set();
    }
    $('body').bind("gesturechange", function(event) {
        view.set();
    });*/



var m_pagename = window.localStorage.getItem("pagename")
var m_screenWidth = screen.width ;

/*$(document).bind("mobileinit", function(){
    // $.mobile.metaViewportContent = "width=device-width, minimum-scale=1.0, maximum-scale=2.0, initial-scale=0.8";
	  
});*/

document.addEventListener("deviceready", onDeviceReady, false);
 
function onDeviceReady() {	 
    BackButton();
	//alert($(document).width() + "221");
	//alert(m_screenWidth);
	//$('#image').css({'width':(($(document).width()))+'px'});
	//$('#image').css({'width':((m_screenWidth))+'px'});
}; 

function BackButton(){
   document.addEventListener("backbutton", onBackButton, true);  
};
 

function onBackButton(){
	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
			  , fn_confirmCallback_Exit
			  , "알림"
			  , "아니오,예");
};

function fn_confirmCallback_Exit(button){
		if(button == 2)
			fn_Back();
} ;

function fn_alertCallback(){};	

function fn_Back() {
		location.replace(("../"+m_pagename));
};








		var m_pagename = window.localStorage.getItem("pagename");
		window.localStorage["dbpath"] = 'http://121.78.112.176:222/POP/';
		var m_dbpath = window.localStorage.getItem("dbpath"); 
		//document.addEventListener("deviceready",onDeviceReady,false);
		window.onload = function(){  
			//$('#image').css({'height':(($(document).height())/2)+'px'});
		};
		
		//alert(m_id + "," + m_pass + "," + m_empid + "," + m_name + "," + m_mcd + "," + m_mname );
		
 
	document.addEventListener("deviceready", onStart, false);
    function onStart() {
    	document.addEventListener("backbutton", onBackButton, true);	
    };
    

    function onBackButton(){
    	navigator.notification.confirm("이전화면으로 이동하시겠습니까?"
    			  , fn_confirmCallback_Exit
    			  , "이동"
    			  , "아니오,예");
    };

    function fn_confirmCallback_Exit(button){
    		if(button == 2)
    			fn_Back();
    			//navigator.app.exitApp();
    } ;
	
	function fn_Back(){
		//location.replace("../Login.html"); 
		location.replace(("../"+m_pagename));
	};

	function fn_MenuLsit(){
		//location.replace("../Login.html"); 
		$.mobile.changePage($(document.location.href="./MenuList.html"), {transition:"pop", reverse:true, changeHash:true} );
	};

function fn_alertCallback(){};	
	







//0) 컨트롤별 변수 선언하기
var data1,data2,data3, data4, data5, data6, data7, data8, data9, data10, data11, histno;
var db;	
var sql = "";
var m_name, m_id,m_pass, m_empid, m_mcd, m_mname;


/*폰겝 사용가능하도록 이벤트 처리  */
document.addEventListener("deviceready",onStart,false);

function onStart()
{
	alert("onStart"); 
	document.addEventListener("backbutton", backKeyDown, true);
	
	fn_Init();
	//fn_Db();
}
	



window.onload = function(){ 
	//alert("onload");
	//fn_Init();
	fn_Db();
};
		
function fn_Init(){ 	
	//document.addEventListener("deviceready",onStart,false);
	
	// data1 = document.getElementById("div_content").document.getElementById("d_data0").document.getElementById("data0").document.getElementById("tddata1");
	// alert(data1.innerHTML);

	 //alert($("#tddata1")[0].innerHTML); 	 
	//=> 위 두가지 유형이 동일한 값 가져옴.
	//alert($("#tddata1")[0].innerHTML);
	data1 = $("#tddata1")[0]; //설비명	
	data2 = $("#tddata2")[0]; //품목코드
	data3 = $("#tddata3")[0]; //품목명
	data4 = $("#tddata4")[0]; //규격
	data5 = $("#tddata5")[0]; //지시량
	data6 = $("#tddata6")[0]; //시작시간
	data7 = $("#tddata7")[0]; //작업자
	data8 = $("#tddata8")[0]; //상태
	
	data9 = $("#tddata9")[0]; //생산량
	data10 = $("#tddata10")[0]; //양품량
	data11 = $("#tddata11")[0]; //불량량
	
	//1) 컨트롤 초기화
	data1.innerHTML = "";
	data2.innerHTML = "";
	data3.innerHTML = "";
	data4.innerHTML = "";
	data5.innerHTML = "";
	data6.innerHTML = "";
	data7.innerHTML = "";
	data8.innerHTML = "";
	
	data9.innerHTML = "0";
	data10.innerHTML = "0";
	data11.innerHTML = "0"; 
	
	alert(window.localStorage.getItem("id"));
	alert(window.sessionStorage.getItem("id")); 
	
	
	
};

function fn_Db(){ 

	//2-1)내부 db 데이터 가져오기 
	OpenDB();

	fn_selectData();
	alert("user =>" + m_id);
	//3) 서버에서 현재 작업진행사항 가져오기
	
	 fn_GetWorkData();
	
/* 	if(m_cd == ''){
			$("#btn_order").enabled = false;
			$("#btn_job").enabled = false;
			$("#btn_worker").enabled = false;
			$("#btn_goodresult").enabled = false;
			$("#btn_badresult").enabled = false;
			$("#btn_stopresult").enabled = false;
		}
	else
		{
			$("#btn_order").enabled = true;
			$("#btn_job").enabled = true;
			$("#btn_worker").enabled = true;
			$("#btn_goodresult").enabled = true;
			$("#btn_badresult").enabled = true;
			$("#btn_stopresult").enabled = true;
		}	 */
	

};




////////////////////////////////////////////////////////////////////	
//데이터베이스 OPEN
function OpenDB(){
			try{ 
				/*데이터베이스를 만들거나 엽니다.  */
				db = window.openDatabase("DB_POP", "1.0", "DB GPOP", 100000);
				alert("DB OK"); 
				navigater.notification.alert("db ok",alertCallback,"데이터베이스 확인","확인");
			} catch(e){
				alert("Failed DB Openning!!");
			}
		}
		
function alertCallback(){};

/*데이터베이스 오류 표시  */
function errorCB(sqlError){
	var msg="[" + sqlError.code + "]" + "\n" + sqlError.message;
	alert("errCB =>" + msg);			
}
/*정상 처리시 메시지 표시  */
function successCB(){
	alert("success!");
}
/////////////////////////////////////////////////////////////////////////////////////////
//SELECT
function fn_selectData(){
	alert("fn_selectData!");
	db.transaction(fn_SelectSQL, errorCB);
}

function fn_SelectSQL(sqlTransaction){
	alert("fn_SelectSQL sqlTransaction!");
	sqlTransaction.executeSql("select * from tb_Login",[],fn_SelectOK,errorCB);
}

function fn_SelectOK(sqlTransaction, sqlResultSet){
	var msg = "rowAffected : " + sqlResultSet.rowAffected
    + "\n# rows.length : " + sqlResultSet.rows.length;
    
    alert(msg);
    
	//row 처리
	var rsl = sqlResultSet.rows;
	for(var i = 0; i < rsl.length; i++)
		{
		//id, pass, name, empid, mcd, mname
			m_name    	= rsl.item(i).name;
			m_id   		= rsl.item(i).id;
			m_pass   	= rsl.item(i).pass;
			m_empid   	= rsl.item(i).empid;
			m_mcd        = rsl.item(i).mcd;
			m_mname      = rsl.item(i).mname;
		}
	 alert("name => " + m_name);
};

/*프로그램 종료  */
function fn_Exit()
{
    if (confirm('프로그램을 종료하시겠습니까?')) {
    	 
        navigator.app.exitApp();		 
    }
}
/*
//////////////////////////////설비 선택////////////////////////
function fn_Machine(){
	
};
//////////////////////////////작업지시 선택////////////////////////
function fn_Worders{
	if(m_cd == '' || m_cd == 'undefined')
		{
			alert("설비를 선택하세요.");
			return;
		}
	
};
//////////////////////////////작업시작////////////////////////
function fn_WorkStartStop(){
	var btn_Job = document.getElementId("btn_job");
	if(data3.innerHTML == '' || data3.innerHTML == 'undefined')
		{
			alert("작업지시를 선택하세요.");
			return;
		}
	
	if(data8.innerHTML == '' || data8.innerHTML == '대기'|| data8.innerHTML == 'undefined'){
		btn_Job.innerHTML = "작업시작";
	}
	else{
		btn_Job.innerHTML = "작업종료";
	}
	
	//데이터 기록 및 상태 변경
	
};
//////////////////////////////작업자 투입////////////////////////
function fn_Worker(){
	if(histno == '' || histno == 'undefined')
	{
		alert("작업을 시작하세요.");
		return;
	}
	
	//작업자 투입화면 이동
}
//////////////////////////////생산실적 등록////////////////////////
function fn_WorkResult(){
	if(histno == '' || histno == 'undefined')
	{
		alert("작업을 시작하세요.");
		return;
	}
	
	//작업실적 입력화면으로 이동
};
//////////////////////////////불량실적 등록////////////////////////
function fn_BadResult(){
	if(histno == '' || histno == 'undefined')
	{
		alert("작업을 시작하세요.");
		return;
	}
	
	//불량실적 등록화면 이동
};
 
//////////////////////////////비가동 실적 등록////////////////////////
function fn_StopResult(){
	if(histno == '' || histno == 'undefined')
	{
		alert("작업을 시작하세요.");
		return;
	}
	
	// 비가동실적 등록화면 이동
};
*/

//////////////////////////////데이터 조회////////////////////////
function fn_GetWorkData()
{				 	
			var json_param = '';	
			
			if(m_cd =='undefined')
				m_cd='';
			
			if(m_empid == 'undefined')
				m_empid = window.localStorage.getItem("id");
			/* if(m_cd == '')
				{
				  alert("설비를 선택하세요.");
				  return;
				} */
		$(document).ready(function()
		{	 
			json_param ='{"machine":' + "\""+ m_cd + "\"," + "empid:" + "\""+ m_empid + "\"" +'}';
		 
			$.ajax({
			url:"http://121.78.112.176:222/POP/PorductReturnToJson.aspx/workinfo",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:json_param,
			type:"POST",
			success:function(data)
			{
				histno =  data.d.mydt[0]["WORKHISTORYNO"];
				data1.innerHTML = m_name
				data2.innerHTML = data.d.mydt[0]["PARTCODE"];
				data3.innerHTML = data.d.mydt[0]["PARTNAME"];
				data4.innerHTML = data.d.mydt[0]["SPEC"];
				data5.innerHTML = data.d.mydt[0]["WORKQTY"];
				data6.innerHTML = data.d.mydt[0]["SDATE"];
				data7.innerHTML = data.d.mydt[0]["WORKERS"];
				data8.innerHTML = data.d.mydt[0]["STATUS"];
				
				data9.innerHTML = data.d.mydt[0]["AUTOGOODQTY"];
				data10.innerHTML = data.d.mydt[0]["GOODQTY"];
				data11.innerHTML = data.d.mydt[0]["BADQTY"];
				 
				window.localStorage["partcode"] = data2.innerHTML;
				window.localStorage["histno"] = histno;
				window.localStorage["partname"] = data3.innerHTML;
					
			 
				alert("조회 완료.");
				return;
				 
			},
			error:function(data) {alert('네트워크 상에 문제가 발생되었습니다.'); }
			});
		 });	 
};
		







	var CenterId=new Array();
	var CenterName=new Array();
	var configWriteFlag = 0;
	
	document.addEventListener("deviceready",onStart,false);
	
	function onStart()
	{	
		fn_BackButton();
		$(document).ready(function()
		{	
			var Data='{"start":' +"\"" +'1'+"\""+ '}';
			$.ajax({
			url:"http://121.78.112.176:222/POP/Config.aspx/place",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:Data,
			type:"POST",
			success:function(data)
			{
				$(makeOption(data.d.mydt));
				checkFileSystem();
			},
			error:function(data) {alert('접속오류'); }
			});
			
		});
		//checkFileSystem();		
		
	}
	
	function fn_BackButton(){
		document.addEventListener("backbutton", fn_Back , true);
	}
	/*
	$(document).ready(function()
			{	
				var Data='{"start":' +"\"" +'1'+"\""+ '}';
				$.ajax({
				url:"http://121.78.112.176:222/POP/Config.aspx/place",
				contentType:"Application/json; charset=utf-8",
				dataType:"json",
				data:Data,
				type:"POST",
				success:function(data)
				{
					$(makeOption(data.d.mydt));
					checkFileSystem();
				},
				error:function(data) {alert('접속오류'); }
				});
				
			});
	*/
	window.onload = function()
	{
		
	};
	
		//옵션 컨트롤
	function makeOption(dt)
	{
		for(var h=0; h<2; h++)
		{
			var option = document.createElement( "option" );
			var option1 = document.createElement( "option" );
			var option2 = document.createElement( "option" );
			var option3 = document.createElement( "option" );
			option.value = h+"";
			option1.value = h+"";
			option2.value = h+"";
			option3.value = h+"";
			if(h==0)
			{
				option.innerText = "단일실적";
				option1.innerText = "실적저장";
				option2.innerText = "자동입력(현재시간)";
				option3.innerText = "수동 투입";
			}
			else
			{
				option.innerText = "쿼터실적"
				option1.innerText = "종료 후 자동재시작";
				option2.innerText = "수동입력";
				option3.innerText = "전 작업자 투입(자동)";
			}
			$("#result").append(option);
			$("#start").append(option1);
			$("#time").append(option2);
			$("#worker").append(option3);
		}
		
		for (var row in dt)
		{
			option = document.createElement( "option" );
			option.value = dt[row]["CENTERID"];
			option.innerText = dt[row]["CENTERNAME"];
			$("#center").append(option);
		}
		
		$("#result")[0].selectedIndex =  -1;
		$("#center")[0].selectedIndex = -1;
		$("#start")[0].selectedIndex = -1;	
		$("#time")[0].selectedIndex = -1;	
		$("#worker")[0].selectedIndex = -1;	

		$("#result").selectmenu("refresh");
		$("#center").selectmenu("refresh");
		$("#start").selectmenu("refresh");
		$("#time").selectmenu("refresh");
		$("#worker").selectmenu("refresh");		
		
		
	};
	
	function save()
	{	
		
		window.localStorage["center"] 			= $("#center").val();
		window.localStorage["workflag"] 		= $("#result").val();
		window.localStorage["workresultstart"] 	= $("#start").val();
		window.localStorage["manualtime"] 		= $("#time").val();
		window.localStorage["autoworkerretuip"] = $("#worker").val();
		configWriteFlag = "1";
		//navigator.notification.alert("저장 시작.",fn_alertCallback, "","확인");
		checkFileSystem();
		
	};

	//document.addEventListener("deviceready",onStart,false);
	function checkFileSystem()
	{
		//alert("checkFileSystem");
		 
		 window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
		//window.requestFileSystem(type, size, successCallback, opt_errorCallback) 
		// alert("checkFileSystem1");
	};

	function gotFS(fileSystem)
	{		//폴더부터 검사
			alert("gotFS");
			rootDir = fileSystem.root;
			fileSystem.root.getDirectory("GSmartSPOP",{create:true},gotDirEntry,fail);
	}

	function gotDirEntry(dirEntry)
	{
		//alert("gotDirEntry");
		dirEntry.getFile("setting.txt",{create:true},gotFileEntry,fail);			
	};

	function gotFileEntry(fileEntry)
	{
		if(configWriteFlag==0)
		{			
			fileEntry.file(readFile,fail);
			configWriteFlag=1;		
		}
		else
		{ 
			navigator.notification.alert("저장 진행.",fn_alertCallback, "","확인");
			fileEntry.createWriter(writeFile,fail);
		}
	};

	function fail(error)
	{
		alert(error.code);
	};

	function writeFile(file)
	{
		if(configWriteFlag>=1)
		{
			//alert("저장이 완료되었습니다.");	
			navigator.notification.alert("저장이 완료되었습니다.",fn_alertCallback, "","확인");
		}
		//file 생성시 exclusive를 설정하지 않으면 새로 갱신한다.
		var fileTxt =$("#center").val()+','+ $("#result").val()+','+$("#start").val()+','+$("#time").val()+','+$("#worker").val() 
 		//alert(fileTxt);
		file.write(fileTxt);
				
		//navigator.notification.alert("저장이 완료되었습니다.1",fn_alertCallback, "","확인1");
	};

	function readFile(file)
	{
		var reader = new FileReader();
		reader.onloadend = function(evt)
		{
			var getread = evt.target.result;
			read = getread;
			
			if(read == null)
			{
				//alert('로그인 진행바랍니다.');
				return;
			}
			else
			{	
				show();
			}
		}
		reader.readAsText(file);
	};

	function show()
	{
		var Data=read.split(",");
		$("#center").val(Data[0]);
		$("#result").val(Data[1]);
		$("#start").val(Data[2]);
		$("#time").val(Data[3]);
		$("#worker").val(Data[4]);

		$("#center").selectmenu('refresh');
		$("#result").selectmenu('refresh');
		$("#start").selectmenu('refresh');
		$("#time").selectmenu('refresh');
		$("#worker").selectmenu('refresh');
	};
	
function fn_Back(){
	location.replace("./Login.html");
};
function fn_alertCallback(){};	
	






//0) 컨트롤별 변수 선언하기

var data1,data2,data3, data4, data5, data6, data7, data8, data9, data10, data11,data12;

var db;	
var sql = "";
var actiongbn = "";

var m_name, m_id,m_pass, m_empid, m_mcd, m_mname, m_workers;
var m_odrkey, m_workdate, m_partcode, m_partname, m_partspec, m_workqty;
var m_statusname, m_status, m_worderno, m_wipseq, m_lotno, m_histno;
var m_autogoodqty, m_goodqty, m_badqty;

var m_center;			//작업공정
var m_workFlag;			//생산실적 입력방법
var m_workResultStart;	//실적 저장시 자동 재시작 구분
var m_autoWorkerReTuip;	//자동시작 시 이전작업자 자동 투입
var m_setimeManualInput; //작업의 시작/종료 시 시간의 수동입력
  

PhoneGap_init();

function PhoneGap_init() {   
        document.addEventListener("deviceready", onDeviceReady, false);
   
};
 
function onDeviceReady() {	
 
    BackButton();
};
 

function BackButton(){
   document.addEventListener("backbutton", onBackButton, true);
};
 

//alert 콜백 함수
function fn_alertCallback(){};

/*프로그램 종료  */
function fn_Exit()
{ 	
	navigator.notification.confirm("프로그램을 종료하시겠습니까?"
			  , fn_confirmCallback_Exit
			  , "종료"
			  , "아니오,예");		    
};

function onBackButton(){
	navigator.notification.confirm("프로그램을 종료하시겠습니까?"
			  , fn_confirmCallback_Exit
			  , "종료"
			  , "아니오,예");
};

function fn_confirmCallback_Exit(button){
		if(button == 2)
			navigator.app.exitApp();
} ;
 
window.onload = function(){ 	
	fn_Init();	
	//fn_ListViewTitle();

};
		
function fn_Init(){ 		
	
	// data1 = document.getElementById("div_content").document.getElementById("d_data0").document.getElementById("data0").document.getElementById("tddata1");
	// alert(data1.innerHTML);

	 //alert($("#tddata1")[0].innerHTML); 	 
	//=> 위 두가지 유형이 동일한 값 가져옴.
	//alert($("#tddata1")[0].innerHTML);
		
	m_name    	= window.localStorage.getItem("name");
	m_id   		= window.localStorage.getItem("id");
	m_pass   	= window.localStorage.getItem("pass");	
	m_empid   	= window.localStorage.getItem("empid");
	
	m_mcd       = window.localStorage.getItem("mcd");
	m_mname     = window.localStorage.getItem("mname");
	actiongbn   = window.localStorage.getItem("actiongbn");
	
	m_center	= window.localStorage.getItem("center");//작업공정
	m_workFlag	= window.localStorage.getItem("workflag");//생산실적 입력방법
	m_workResultStart	= window.localStorage.getItem("workresultstart");//실적 저장시 자동 재시작 구분
	m_autoWorkerReTuip	= window.localStorage.getItem("autoworkerretuip");//자동시작 시 이전작업자 자동 투입
	
	m_center = '100';
	/*0: 	단일실적 입력 (실적 입력화면에서 실적내역을 조회하여 보여준다.)
	  1:	쿼터별 실적 입력(입력되는 실적을 입력한다.)	  */
	m_workFlag = '0';
	/*0:실적 저장만 진행, 1:실적 저장 시 자동 작업 종료 및 재시작)  */
	m_workResultStart = '0';
	/*0:실적 저장 시 작업자 미투입(자동), 1:실적 저장 시 자동 작업 종료 및 재시작 의 경우 기존 작업자 자동 투입  */ 
	m_autoWorkerReTuip = '0';
	/*0: 작업 시작/종료시 자동 종료, 1:작업 시작/종료 시 수동입력 종료  */
	m_setimeManualInput = '0';
 	
	m_odrkey = window.localStorage.getItem("odrkey");
	m_workdate = window.localStorage.getItem("workdate");
	m_partcode = window.localStorage.getItem("partcode");
	m_partname = window.localStorage.getItem("partname");
	m_partspec = window.localStorage.getItem("partspec");
	m_workqty = window.localStorage.getItem("workqty");
	m_statusname = window.localStorage.getItem("statusname");
	m_status = window.localStorage.getItem("status");
	m_worderno = window.localStorage.getItem("worderno");
	m_wipseq = window.localStorage.getItem("wipseq"); 
	
	m_lotno = window.localStorage.getItem("lotno");
	m_histno = window.localStorage.getItem("histno");
	m_workers = window.localStorage.getItem("workers");
	m_autogoodqty = window.localStorage.getItem("autogoodqty");
	m_goodqty = window.localStorage.getItem("goodqty");
	m_badqty = window.localStorage.getItem("badqty");

	
	data1 = $("#tddata1")[0]; //설비명	
	data2 = $("#tddata2")[0]; //품목코드
	data3 = $("#tddata3")[0]; //품목명
	data4 = $("#tddata4")[0]; //규격
	data5 = $("#tddata5")[0]; //지시량
	data6 = $("#tddata6")[0]; //시작시간
	data7 = $("#tddata7")[0]; //작업자
	data8 = $("#tddata8")[0]; //상태
	
	data9 = $("#tddata9")[0]; //생산량
	data10 = $("#tddata10")[0]; //양품량
	data11 = $("#tddata11")[0]; //불량량
	data12 = $("#tddata12")[0]; //지시번호
	
	//1) 컨트롤 초기화
	fn_CtlInit();
	//alert(m_id + "," + m_pass + "," + m_empid + "," + m_name + "," + m_mcd + "," + m_mname );
 	
	if(actiongbn != "order"){
		//2) 데이터 조회
		fn_GetWorkData();	
	}
	
	
	
};

function fn_CtlInit()
{
	//1) 컨트롤 초기화
	if(m_mcd == '' || m_mcd == 'undefined'){
		data1.innerHTML = "";
		data2.innerHTML = "";
		data3.innerHTML = "";
		data4.innerHTML = "";
		data5.innerHTML = "";
		data6.innerHTML = "";
		data7.innerHTML = "";
		data8.innerHTML = "";
		
		data9.innerHTML = "0";
		data10.innerHTML = "0";
		data11.innerHTML = "0"; 
		data12.innerHTML = "";
	}
	else{		
		data1.innerHTML = m_mname;
		data2.innerHTML = m_partcode;
		data3.innerHTML = m_partname;
		data4.innerHTML = m_partspec;
		data5.innerHTML = m_workqty;
		data6.innerHTML = m_workdate;
		data7.innerHTML = m_workers;
		data8.innerHTML = m_statusname;
		
		data9.innerHTML = m_autogoodqty;
		data10.innerHTML = m_goodqty;
		data11.innerHTML = m_badqty; 
		data12.innerHTML = m_worderno;
		}
};

function fn_AllClear(){
	//data1.innerHTML = "";
	data2.innerHTML = "";
	data3.innerHTML = "";
	data4.innerHTML = "";
	data5.innerHTML = "";
	data6.innerHTML = "";
	data7.innerHTML = "";
	data8.innerHTML = "";
	
	data9.innerHTML = "0";
	data10.innerHTML = "0";
	data11.innerHTML = "0"; 
	data12.innerHTML = "";
	
	window.localStorage["odrkey"] 		= "";
	window.localStorage["workdate"] 	= "";
	window.localStorage["partcode"] 	= "";
	window.localStorage["partname"] 	= "";
	window.localStorage["partspec"] 	= "";
	window.localStorage["workqty"] 		= "";
	window.localStorage["statusname"] 	= "";
	window.localStorage["status"] 		= "";
	window.localStorage["worderno"] 	= "";
	window.localStorage["wipseq"] 		= "";
	window.localStorage["lotno"] 		= ""; 
	window.localStorage["histno"] 		= "";
	window.localStorage["workers"] 		= "";

	window.localStorage["autogoodqty"] 	= "0";
	window.localStorage["goodqty"] 		= "0";
	window.localStorage["badqty"] 		= "0"; 
	 
	m_lotno = "";
	m_histno = "";
	m_workers = "";	 
	m_odrkey = "";
	m_workdate = ""; 
	m_partcode = "";
	m_partname = "";
	m_partspec = "";
	m_workqty = ""
	m_statusname = "";
	m_status = "";
	m_worderno = "";
	m_wipseq = ""; 
	m_autogoodqty = "0";
	m_goodqty = "0";
	m_badqty = "0";
	
};
    
/*프로그램 종료  */
/* function fn_Exit(){
			navigator.notification.confirm('프로그램을 종료하시겠습니까?'
					,fn_Quit,
					'종료',
					'예,아니오');			    
		};
function fn_Quit(){
	 navigator.app.exitApp();	
} */
//////////////////////////////설비 선택////////////////////////
function fn_Machine(){
	window.localStorage["actiongbn"] = "machine";
	 //$.mobile.changePage($(document.location.href="./Machine.html"), {transition:"slide", reverse:false, changeHash:false} );
	/* $.mobile.changePage("./Machine.html",{
				transition:"slide",
				reverse: false,
				changeHash: true
				} 
			); */
	
	//$.mobile.changePage($(document.location.href="./Machine.html"), {transition:"slide",reverse:false, changeHash:true} );
	location.replace("./Machine.html");			
};

//////////////////////////////작업지시 선택////////////////////////
function fn_Worders(){
	if(m_mcd == '' || m_mcd == 'undefined')
		{
			//alert("설비를 선택하세요.");
			return;
		}
	
	window.localStorage["actiongbn"] = "order";
	
	/* $.mobile.changePage("./Orders.html",{
		transition:"slide",
		reverse: false,
		changeHash: true
		} 
	); */
	
	location.replace("./Orders.html"); 
};

//////////////////////////////작업시작////////////////////////
function fn_WorkStartStop(){
	//var btn_Job = document.getElementId("btn_job");
	if(data3.innerHTML == '' || data3.innerHTML == 'undefined')
		{
			alert("작업지시를 선택하세요.");
			return;
		}
	
	window.localStorage["actiongbn"] = "startstop";
	
	if(data8.innerHTML == '' || data8.innerHTML == '대기' || data8.innerHTML == '등록'|| data8.innerHTML == 'undefined'){
		//작업시작
		if(m_setimeManualInput == '1'){
			location.replace("./StartStopTime.html");
			return;
		}
		
		if (confirm("작업을시작하시겠습니까?") == false)
			return ;			
		else		 
			fn_Start(m_mcd, m_worderno, m_wipseq, m_setimeManualInput, "");
	}
	else{
		//작업종료
		if(m_setimeManualInput == '1'){
			location.replace("./StartStopTime.html");
			return;
		}
		
		if (confirm("작업을 종료하시겠습니까?") == false)
				return ;			
		else
			fn_End(m_mcd, m_worderno, m_wipseq, m_setimeManualInput, "",m_histno, m_lotno); 
		
		/* navigator.notification.confirm('작업을 종료하시겠습니까?'
				,fn_End(m_mcd, m_worderno, m_wipseq, m_setimeManualInput, "",m_histno, m_lotno),
				'작업종료',
				'예,아니오'); */
	}
	
	//데이터 기록 및 상태 변경
	//location.replace("./StartStopResult.html"); 
};
/*작업 종료 */
function fn_End(mcd, worderno, wipseq, sedtflag, setime, histno, lotno){
	json_param ='{"strMachine":' + "\""+ mcd 		+ "\"," 
		        + "strWorderNo:" + "\""+ worderno 	+ "\","
		        + "strWipSeq:"   + "\""+ wipseq 	+ "\"," 
		        + "strSeDtFlag:" + "\""+ sedtflag 	+ "\","
		        + "strSe_time:"  + "\""+ setime 	+ "\"," 
		        + "strHistno:"   + "\""+ histno 	+ "\"," 
		        + "strLotno:"    + "\""+ lotno 		+ "\"" +'}';
	$.ajax({
	url:"http://121.78.112.176:222/POP/PorductReturnToJson.aspx/js_WorkEnd",
	contentType:"Application/json; charset=utf-8",
	dataType:"json",
	data:json_param,
	type:"POST",
	success:function(data)
		{
		    if(data.d.mydt[0]["FLAG"] == 'OK') 
				fn_AllClear();
		    else{
		    	alert("작업을 종료하지 못했습니다.");
		    }
			return;		 
		},
	error:function(data) {
			alert('네트워크 상에 문제가 발생되었습니다.');		
		}
	}); 	
};

/*작업 시작  */
function fn_Start(mcd,worderno,wipseq,sedtflag,setime){
	json_param ='{"strMachine":' + "\""+ mcd 		+ "\"," 
		        + "strWorderNo:" + "\""+ worderno 	+ "\","
		        + "strWipSeq:" 	 + "\""+ wipseq 	+ "\"," 
		        + "strSeDtFlag:" + "\""+ sedtflag 	+ "\"," 
		        + "strSe_time:"  + "\""+ setime	 	+ "\"" +'}';
	$.ajax({
	url:"http://121.78.112.176:222/POP/PorductReturnToJson.aspx/js_workstart",
	contentType:"Application/json; charset=utf-8",
	dataType:"json",
	data:json_param,
	type:"POST",
	success:function(data)
	{
		fn_SetData(data);
		
		return;		 
	},
	error:function(data) {alert('네트워크 상에 문제가 발생되었습니다.');
		fn_CtlInit();
	}
	}); 
};


//////////////////////////////작업자 투입////////////////////////
function fn_Worker(){
	if(m_histno == '' || m_histno == 'undefined')
	{
		alert("작업을 시작하세요.");
		return;
	}
	
	//작업자 투입화면 이동
	/* $.mobile.changePage("./Worker.html",{
		transition:"slide",
		reverse: false,
		changeHash: true
		} 
	); */
	window.localStorage["actiongbn"] = "worker";
	location.replace("./Worker.html"); 
}
//////////////////////////////생산실적 등록////////////////////////
function fn_WorkResult(){
	if(m_histno == '' || m_histno == 'undefined')
	{
		alert("작업을 시작하세요.");
		return;
	}
	window.localStorage["actiongbn"] = "workresult";
	//작업실적 입력화면으로 이동
	if(m_workFlag == "0"){//단일실적
		location.replace("./WorkResult01.html");
	}
	else if(m_workFlag == "1"){//쿼터실적
		location.replace("./WorkResult02.html");
	}
};
//////////////////////////////불량실적 등록////////////////////////
function fn_BadResult(){
	if(m_histno == '' || m_histno == 'undefined')
	{
		alert("작업을 시작하세요.");
		return;
	}
	
	//불량실적 등록화면 이동
	/* $.mobile.changePage("./BadResult.html",{
		transition:"slide",
		reverse: false,
		changeHash: true
		} 
	); */
	window.localStorage["actiongbn"] ="badresult"; 
	location.replace("./BadResult.html"); 
};
 
//////////////////////////////비가동 실적 등록////////////////////////
function fn_StopResult(){
	if(m_histno == '' || m_histno == 'undefined')
	{
		alert("작업을 시작하세요.");
		return;
	}
	
	// 비가동실적 등록화면 이동
	/* $.mobile.changePage("./StopResult.html",{
		transition:"slide",
		reverse: false,
		changeHash: true
		} 
	); */
	window.localStorage["actiongbn"] ="stopresult"; 
	location.replace("./StopResult.html"); 
};

//////////////////////////////데이터 조회////////////////////////
function fn_GetWorkData()
{			//var btn_Job = document.getElementById("btn_job");	 	
			var json_param = '';	
			
			if(m_mcd =='undefined' || m_mcd == 'null')
				m_mcd='';
			
			if(m_empid == 'undefined')
				m_empid = window.localStorage.getItem("empid");
			 if(m_mcd == '')
				{
				   alert("설비를 선택하세요.");
				  return;
				} 
		$(document).ready(function()
		{	 
			
			json_param ='{"machine":' 	+ "\"" + m_mcd 		+ "\"," 
			            + "empid:" 	    + "\"" + m_empid 	+ "\","				
				        + "histno:" 	+ "\"" + m_histno 	+ "\"" +'}';
			$.ajax({
			url:"http://121.78.112.176:222/POP/PorductReturnToJson.aspx/workinfo",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:json_param,
			type:"POST",
			success:function(data)
			{						
				 
				$(fn_SetData(data.d.mydt));
				/* if(data8.innerHTML == '' || data8.innerHTML == '대기' || data8.innerHTML == '등록'|| data8.innerHTML == 'undefined'){
					btn_Job.innerHTML = "작업시작";
				}
				else{
					btn_Job.innerHTML = "작업종료";
				} */
				
				return;				 
			},
			error:function(data) {alert('네트워크 상에 문제가 발생되었습니다.');
				fn_CtlInit();
			}
			});
		});	 
};

/*데이터 변수보관, 화면셋팅, 메모리변수에 보관  */
function fn_SetData(dt){
	fn_AllClear();
	
	  for (var row in dt) {	
			m_histno 		=  dt[0]["WORKHISTORYNO"];
			m_lotno			=  dt[0]["LOTNO"];
			m_partcode 		=  dt[0]["PARTCODE"];
			m_partname		=  dt[0]["PARTNAME"];
			m_partspec		=  dt[0]["SPEC"];
			m_workqty		=  dt[0]["WORKQTY"];
			m_workdate		=  dt[0]["SDATE"];
			m_workers		=  dt[0]["WORKERS"];
			m_status		=  dt[0]["WORK_STATUS"];
			m_statusname	=  dt[0]["STATUS"];
			m_autogoodqty	=  dt[0]["AUTOGOODQTY"];
			m_goodqty		=  dt[0]["GOODQTY"];
			m_badqty		=  dt[0]["BADQTY"];		
			m_worderno      =  dt[0]["WORDERNO"];
			m_wipseq		=  dt[0]["WIPSEQ"];
			
			data1.innerHTML = m_mname
			data2.innerHTML = m_partcode;
			data3.innerHTML = m_partname;
			data4.innerHTML = m_partspec;
			data5.innerHTML = m_workqty;
			data6.innerHTML = m_workdate;
			data7.innerHTML = m_workers;
			data8.innerHTML = m_statusname;				
			data9.innerHTML = m_autogoodqty;
			data10.innerHTML = m_goodqty;
			data11.innerHTML = m_badqty;
			data12.innerHTML = m_worderno
			
			window.localStorage["histno"] 		= m_histno;
			window.localStorage["lotno"] 		= m_lotno; 
			window.localStorage["partcode"]		= m_partcode;
			window.localStorage["partname"] 	= m_partname;
			window.localStorage["partspec"] 	= m_partspec;
			window.localStorage["workqty"] 		= m_workqty;
			window.localStorage["workdate"] 	= m_workdate;				
			window.localStorage["workers"] 		= m_workers;
			window.localStorage["status"] 		= m_status;
			window.localStorage["statusname"] 	= m_statusname;
			window.localStorage["autogoodqty"] 	= m_autogoodqty;
			window.localStorage["goodqty"] 		= m_goodqty;
			window.localStorage["badqty"] 		= m_badqty;	
			window.localStorage["worderno"]     = m_worderno;
			window.localStorage["wipseq"]		= m_wipseq
	  };
}
 
		







		var loginJson = ""; //로그인 관련  json  값
		var configWriteFlag = false; //config 등록여부
		var fileLogin = false; //file 로그인 여부
		var EMPID; //url에 포함해서 날아갈 unique한 userID
		var db;
		
		
		var m_id, m_pass, m_name, m_machinecd, m_machinename;
		m_machinecd = '';
		m_machinename = '';
		m_id = '';
		m_pass = '';
		m_name = '';
		EMPID='';
		
		alert(window.localStorage.getItem("id"));
		//alert(window.sessionStorage.getItem("id")); 
		
		document.addEventListener("deviceready",onStart,false);
		function onStart()
		{
			checkFileSystem();
			
			//alert("DB START");
			OpenDB();	
			
			/* var user = document.getElementById("txt_User");
			user.value = "데이터베이스"; */
			
		}
		/*데이터베이스  호출  */
		function OpenDB(){
			try{ 
				/*데이터베이스를 만들거나 엽니다.  */
				db = window.openDatabase("DB_POP", "1.0", "DB GPOP", 100000);
				//alert("DB OK");
				createTable();
				//alert("TABLE OK");
			} catch(e){
				alert("Failed DB Openning!!");
			}
		}
		/*테이블 생성 호출  */
		function createTable(){
			db.transaction(executeSQL, errorCB, successCB);
		}
		
		/*쿼리 실행  */
		function executeSQL(sqlTransaction){
			try{
			/* sqlTransaction.executeSql('DROP TABLE IF EXISTS tb_Login');
			sqlTransaction.executeSql('DROP TABLE IF EXISTS tb_Work');
			sqlTransaction.executeSql('DROP TABLE IF EXISTS tb_Badcode');
			sqlTransaction.executeSql('DROP TABLE IF EXISTS tb_Stopcode');
			sqlTransaction.executeSql('DROP TABLE IF EXISTS tb_Machine');  */
				
			sqlTransaction.executeSql('CREATE TABLE IF NOT EXISTS tb_Login (id, pass, name, empid, mcd, mname)');
			sqlTransaction.executeSql('CREATE TABLE IF NOT EXISTS tb_Work (no,mcd, mname, partcode, partname, spec, orderqty, worktime, worker, status, workqty, goodqty, badqty)');
			sqlTransaction.executeSql('CREATE TABLE IF NOT EXISTS tb_Badcode (code, name)');
			sqlTransaction.executeSql('CREATE TABLE IF NOT EXISTS tb_Stopcode (code, name)');
			sqlTransaction.executeSql('CREATE TABLE IF NOT EXISTS tb_Machine (code, name)');
			
			sqlTransaction.executeSql('DELETE FROM tb_Login');
			sqlTransaction.executeSql('DELETE FROM tb_Work');
			sqlTransaction.executeSql('DELETE FROM tb_Badcode');
			sqlTransaction.executeSql('DELETE FROM tb_Stopcode');
			sqlTransaction.executeSql('DELETE FROM tb_Machine');
			} catch (e){
				alert("Failed Table= > " + e);
			}
		}
		
		/*데이터베이스 오류 표시  */
		function errorCB(sqlError){
			var msg="[" + sqlError.code + "]" + "\n" + sqlError.message;
			alert(msg);			
		}
		/*정상 처리시 메시지 표시  */function successCB(){
			alert("success!");
		}
		
		////////////////////////////////////////////////////////////////////////////
		function InsertTable(){
			//alert( m_id + "," + m_pass + "," + m_name + ","  +  empid + "," + m_machinecd + "," +   m_machinename );
			db.transaction(ExecSQLInsert, errorCB, successCB);
		}
		
		function ExecSQLInsert(sqlTransaction){			
			var sql = "";
			sql = "INSERT INTO tb_Login (id, pass, name, empid, mcd, mname) VALUES (?,?,?,?,?,?)";
			sqlTransaction.executeSql(sql, [m_id, m_pass, m_name, EMPID, m_machinecd, m_machinename], insertOK, errorCB);
			//sqlTransaction.executeSql(sql, ["'" + m_id + "'", "'" + m_pass + "'" , "'" + m_name + "'", "'" + EMPID + "'", "'" + m_machinecd + "'", "'" + m_machinename + "'"], insertOK, errorCB);
			
		}
		
		function insertOK(sqlTransaction, sqlResultSet){
			/* var msg = "insertID : " + sqlResultSet.insertId 
			        + "\n# rowAffected : " + sqlResultSet.rowAffected
			        + "\n# rows.length : " + sqlResultSet.rows.length;
			        
			alert(msg);	 */		
			alert("작업자 등록 완료");
		}
		
		/////////////////////////////////////////////////////////////////////////////
		
		function checkFileSystem()
		{
			window.requestFileSystem(LocalFileSystem.PERSISTENT,0,gotFS,fail);
		}
		function gotFS(fileSystem)
		{
			/* 디렉토리 uri 확인
			var uri = fileSystem.root.toURI();
			alert(uri);*/
			
			/* 디렉토리 내부 항목 확인
			rootDir = fileSystem.root;
			var rootR = fileSystem.root.createReader();
			rootR.readEntries(gotFileEntry,fail);*/
			
			//폴더부터 검사
			rootDir = fileSystem.root;
			fileSystem.root.getDirectory("GSmartSPOP",{create:true},gotDirEntry,fail);
		}
		
		function gotDirEntry(dirEntry)
		{
			dirEntry.getFile("myConfig.txt",{create:true},gotFileEntry,fail);			
		}
		
		function gotFileEntry(fileEntry)
		{
			//파일 객체에서 파일을 가져옴
			//config 등록이냐 로그인 중이냐
			if(!configWriteFlag)
			{
				fileEntry.file(readFile,fail);
			}
			else
			{
				fileEntry.createWriter(writeFile,fail);
			}
		};
		
		function readFile(file)
		{
			var reader = new FileReader();
			reader.onloadend = function(evt)
			{
				var readJson = evt.target.result;
				loginJson = readJson;
				
				if(loginJson == "")
				{
					//alert('로그인 진행바랍니다.');
					return;
				}
				else
				{	
					//자동 로그인시에라도 데이터는 뿌려준다.
					var user = readJson.split(",")[0].split(":")[1].split('"').join('');
					var pass = readJson.split(",")[1].split(":")[1].split('"').join('').replace('}','');
					$("#txt_User").val(user);
					$("#txt_Pass").val(pass);
					
					window.localStorage["id"] = user;
					window.localStorage["pass"] = pass;
					window.localStorage["name"] = "";
					window.localStorage["empid"] = "";
					
					window.sessionStorage["id"] = m_id;
					
					fileLogin = true;
					login();
				}
			}
			reader.readAsText(file);
		};
		
		function writeFile(file)
		{
			//file 생성시 exclusive를 설정하지 않으면 새로 갱신한다.
			var fileTxt = '{"user":' + "\""+ $("#txt_User").val() + "\"," + "\"" +"pass"+"\""+":" + "\""+ $("#txt_Pass").val() + "\"" +'}';
			/*file.onwrite = function(evt)
			{
				console.log(evt.target.result);
				alert(evt.target.result);
			}*/
			file.write(fileTxt);
			$.mobile.changePage($(document.location.href="./Main.html"+"?" + EMPID), {transition:"slide", reverse:false, changeHash:true} );
		}
		function fail(error)
		{
			alert(error.code);
		};
		
		
		/*로그인  */
		function fn_login()
		{
			
			var networkState = navigator.network.connection.type;
			
			if(networkState != Connection.NONE)
			{
				if(!fileLogin)
				{
					if($("#txt_User").val() == "" || $("#txt_User").val() == "")
					{
						alert('아이디 및 비밀번호 입력오류');
						return;
					}
				}
				SetLoginCheck();
			}
			else
			{
				alert("현재 네트워크 연결상태가 바르지 않습니다");
				return;
			}
			
		}
		
		function SetLoginCheck()
		{
			$(document).ready(function()
			{	
				if(!fileLogin) 
				{	
					loginJson='{"user":' + "\""+ $("#txt_User").val() + "\"," + "pass:" + "\""+ $("#txt_Pass").val() + "\"" +'}';
				}
				else
				{
					
				}
				
					//데이터베이스 접속 문자열 가져오기(서버의 데이터베이스 설정 부분)-> 가져와 로컬스토리지에 저장하낟.
				    //맥어드레스 저장하도록 변경 필요.
					$.ajax({
					url:"http://121.78.112.176:222/POP/PorductReturnToJson.aspx/login",
					contentType:"Application/json; charset=utf-8",
					dataType:"json",
					data:loginJson,
					type:"POST",
					success:function(data)
					{
						var result = data.d.mydt[0]["RESULT"];
						var username = data.d.mydt[0]["USERNAME"];
						EMPID = data.d.mydt[0]["EMPNO"];						

						if(result == "Y")
						{
							if(!fileLogin)
							{
								navigator.notification.confirm('자동 로그인 설정을 하시겟습니까? 설정 이후엔 입력없이 바로 접속 가능합니다.'
																,SetAutoLogin,
																'자동 로그인 설정',
																'미설정,설정');	
							}
							else
							{
								/*로그인 데이터 db에 저장  */
								m_id = $("#txt_User").val();
								m_pass = $("#txt_Pass").val();
								m_name = username;
								
								InsertTable();
								
								window.localStorage["id"] = m_id;
								window.localStorage["pass"] = m_pass;
								window.localStorage["name"] = m_name;
								window.localStorage["empid"] = EMPID;
								
								window.sessionStorage["id"] = m_id;
								
								$.mobile.changePage($(document.location.href="./Main.html"), {transition:"slide", reverse:false, changeHash:true} );
							}
						}
						else
						{
							alert(data.d.mydt[0]["RESULT"]);
							fileLogin = false;
							return;
						}
					},
					error:function(data) {alert('네트워크 상에 문제가 발생되었습니다.'); fileLogin=false;}
				});
			});
		}
		
		function SetAutoLogin(result)
		{
			if(result == 2)
			{
				configWriteFlag = true;
				checkFileSystem();
			}
			else
			{
				InsertTable();
				
				window.localStorage["id"] = m_id;				
				window.localStorage["pass"] = m_pass;
				window.localStorage["name"] = m_name;
				window.localStorage["empid"] = EMPID;
				
				window.sessionStorage["id"] = m_id;
				
				//$.mobile.changePage($(document.location.href="./Main.html"+"?" + EMPID+ "?" + custid), {transition:"slide", reverse:false, changeHash:true} );
				$.mobile.changePage($(document.location.href="./Main.html"), {transition:"slide", reverse:false, changeHash:true} );
			}
		}
		
		/*프로그램 종료  */
		function fn_Exit()
		{ 	
		    if (confirm('프로그램을 종료하시겠습니까?')) {
		    	 
		        navigator.app.exitApp();		 
		    }
		}
		
 
		
	





		var loginJson = ""; //로그인 관련  json  값
		var configWriteFlag = false; //config 등록여부
		var fileLogin = false; //file 로그인 여부 
		var db;
		
		
		var m_id, m_pass, m_name, m_mcd, m_mname, m_empid;
		m_mcd = '';
		m_mname = '';
		m_id = '';
		m_pass = '';
		m_name = '';
		m_empid='';
		
		//alert(m_id + "," + m_pass + "," + m_empid + "," + m_name + "," + m_mcd + "," + m_mname );
		
		document.addEventListener("deviceready",onStart,false);
		function onStart()
		{
			checkFileSystem();
		}
	 
		/////////////////////////////////////////////////////////////////////////////
		
		function checkFileSystem()
		{
			window.requestFileSystem(LocalFileSystem.PERSISTENT,0,gotFS,fail);
		}
		function gotFS(fileSystem)
		{
			/* 디렉토리 uri 확인
			var uri = fileSystem.root.toURI();
			alert(uri);*/
			
			/* 디렉토리 내부 항목 확인
			rootDir = fileSystem.root;
			var rootR = fileSystem.root.createReader();
			rootR.readEntries(gotFileEntry,fail);*/
			
			//폴더부터 검사
			rootDir = fileSystem.root;
			fileSystem.root.getDirectory("GSmartSPOP",{create:true},gotDirEntry,fail);
		}
		
		function gotDirEntry(dirEntry)
		{
			dirEntry.getFile("myConfig.txt",{create:true},gotFileEntry,fail);			
		}
		
		function gotFileEntry(fileEntry)
		{
			//파일 객체에서 파일을 가져옴
			//config 등록이냐 로그인 중이냐
			if(!configWriteFlag)
			{
				fileEntry.file(readFile,fail);
			}
			else
			{
				fileEntry.createWriter(writeFile,fail);
			}
		};
		
		function readFile(file)
		{
			var reader = new FileReader();
			reader.onloadend = function(evt)
			{
				var readJson = evt.target.result;
				loginJson = readJson;
				
				if(loginJson == "")
				{
					//alert('로그인 진행바랍니다.');
					return;
				}
				else
				{	
					//자동 로그인시에라도 데이터는 뿌려준다.
					m_id = readJson.split(",")[0].split(":")[1].split('"').join('');
					m_pass = readJson.split(",")[1].split(":")[1].split('"').join('').replace('}','');
					$("#txt_User").val(m_id);
					$("#txt_Pass").val(m_pass);
					
					window.localStorage["id"] = m_id;
					window.localStorage["pass"] = m_pass;
					window.localStorage["name"] = m_name;
					window.localStorage["empid"] = m_empid;
					window.localStorage["mcd"] = m_mcd;
					window.localStorage["mname"] = m_mname;
					
					fileLogin = true;
					login();
				}
			}
			reader.readAsText(file);
		};
		
		function writeFile(file)
		{
			//file 생성시 exclusive를 설정하지 않으면 새로 갱신한다.
			var fileTxt = '{"user":' + "\""+ $("#txt_User").val() + "\"," + "\"" +"pass"+"\""+":" + "\""+ $("#txt_Pass").val() + "\"" +'}';
			/*file.onwrite = function(evt)
			{
				console.log(evt.target.result);
				alert(evt.target.result);
			}*/
			file.write(fileTxt);
			navigator.notification.beep(1);
			$.mobile.changePage($(document.location.href="./Main.html"), {transition:"slide", reverse:false, changeHash:true} );
		}
		function fail(error)
		{
			alert(error.code);
		};
		
		
		/*로그인  */
		function fn_login()
		{
			
			var networkState = navigator.network.connection.type;
			
			if(networkState != Connection.NONE)
			{
				if(!fileLogin)
				{
					if($("#txt_User").val() == "" || $("#txt_User").val() == "")
					{
						alert('아이디 및 비밀번호 입력오류');
						return;
					}
				}
				SetLoginCheck();
			}
			else
			{
				alert("현재 네트워크 연결상태가 바르지 않습니다");
				return;
			}
			
		}
		
		function SetLoginCheck()
		{
			$(document).ready(function()
			{	
				if(!fileLogin) 
				{	
					loginJson='{"user":' + "\""+ $("#txt_User").val() + "\"," + "pass:" + "\""+ $("#txt_Pass").val() + "\"" +'}';
				}
				else
				{
					
				}
				
					//데이터베이스 접속 문자열 가져오기(서버의 데이터베이스 설정 부분)-> 가져와 로컬스토리지에 저장하낟.
				    //맥어드레스 저장하도록 변경 필요.
					$.ajax({
					url:"http://121.78.112.176:222/POP/PorductReturnToJson.aspx/login",
					contentType:"Application/json; charset=utf-8",
					dataType:"json",
					data:loginJson,
					type:"POST",
					success:function(data)
					{
						var result = data.d.mydt[0]["RESULT"];
						m_name = data.d.mydt[0]["USERNAME"];
						m_empid = data.d.mydt[0]["EMPNO"];
						m_id = $("#txt_User").val();
						m_pass = $("#txt_Pass").val();

						if(result == "Y")
						{							
							if(!fileLogin)
							{
								navigator.notification.confirm('자동 로그인 설정을 하시겟습니까? 설정 이후엔 입력없이 바로 접속 가능합니다.'
																,SetAutoLogin,
																'자동 로그인 설정',
																'미설정,설정');	
							}
							else
							{								
								window.localStorage["id"] = m_id;
								window.localStorage["pass"] = m_pass;
								window.localStorage["name"] = m_name;
								window.localStorage["empid"] = m_empid;
								window.localStorage["mcd"] = m_mcd;
								window.localStorage["mname"] = m_mname ;
								
								window.sessionStorage["id"] = m_id;
								navigator.notification.beep(1);
								$.mobile.changePage($(document.location.href="./Main.html"), {transition:"slide", reverse:false, changeHash:true} );
							}
						}
						else
						{
							alert(data.d.mydt[0]["RESULT"]);
							fileLogin = false;
							return;
						}
					},
					error:function(data) {alert('네트워크 상에 문제가 발생되었습니다.'); fileLogin=false;}
				});
			});
		}
		
		function SetAutoLogin(result)
		{
			if(result == 2)
			{
				configWriteFlag = true;
				checkFileSystem();
			}
			else
			{
 				window.localStorage["id"] = m_id;
				window.localStorage["pass"] = m_pass;
				window.localStorage["name"] = m_name;
				window.localStorage["empid"] = m_empid;
				window.localStorage["mcd"] = m_mcd;
				window.localStorage["mname"] = m_mname ;
				
				
				window.sessionStorage["id"] = m_id;
				
				//$.mobile.changePage($(document.location.href="./Main.html"+"?" + m_empid+ "?" + custid), {transition:"slide", reverse:false, changeHash:true} );
				navigator.notification.beep(1);
				$.mobile.changePage($(document.location.href="./Main.html"), {transition:"slide", reverse:false, changeHash:true} );
			}
		}
		
		/*프로그램 종료  */
		function fn_Exit()
		{ 	
		    if (confirm('프로그램을 종료하시겠습니까?')) {
		    	 
		        navigator.app.exitApp();		 
		    }
		}
		
 
		
	






//0) 컨트롤별 변수 선언하기

var data1,data2,data3, data4, data5, data6, data7, data8, data9, data10, data11,data12;

var db;	
var sql = "";
var actiongbn = "";

var m_name, m_id,m_pass, m_empid, m_mcd, m_mname, m_workers;
var m_odrkey, m_workdate, m_partcode, m_partname, m_partspec, m_workqty;
var m_statusname, m_status, m_worderno, m_wipseq, m_lotno, m_histno;
var m_autogoodqty, m_goodqty, m_badqty;

var m_center;			//작업공정
var m_workFlag;			//생산실적 입력방법
var m_workResultStart;	//실적 저장시 자동 재시작 구분
var m_autoWorkerReTuip;	//자동시작 시 이전작업자 자동 투입
var m_setimeManualInput; //작업의 시작/종료 시 시간의 수동입력
  

PhoneGap_init();

function PhoneGap_init() {   
        document.addEventListener("deviceready", onDeviceReady, false);
   
};
 
function onDeviceReady() {	
 
    BackButton();
};
 

function BackButton(){
   document.addEventListener("backbutton", onBackButton, true);
};
 

//alert 콜백 함수
function fn_alertCallback(){};

/*프로그램 종료  */
function fn_Exit()
{ 	
	navigator.notification.confirm("프로그램을 종료하시겠습니까?"
			  , fn_confirmCallback_Exit
			  , "종료"
			  , "아니오,예");		    
};

function onBackButton(){
	navigator.notification.confirm("프로그램을 종료하시겠습니까?"
			  , fn_confirmCallback_Exit
			  , "종료"
			  , "아니오,예");
};

function fn_confirmCallback_Exit(button){
		if(button == 2)
			navigator.app.exitApp();
} ;
 
window.onload = function(){ 	
	fn_Init();	
	//fn_ListViewTitle();

};
		
function fn_Init(){ 		
	
	// data1 = document.getElementById("div_content").document.getElementById("d_data0").document.getElementById("data0").document.getElementById("tddata1");
	// alert(data1.innerHTML);

	 //alert($("#tddata1")[0].innerHTML); 	 
	//=> 위 두가지 유형이 동일한 값 가져옴.
	//alert($("#tddata1")[0].innerHTML);
		
	m_name    	= window.localStorage.getItem("name");
	m_id   		= window.localStorage.getItem("id");
	m_pass   	= window.localStorage.getItem("pass");	
	m_empid   	= window.localStorage.getItem("empid");
	
	m_mcd       = window.localStorage.getItem("mcd");
	m_mname     = window.localStorage.getItem("mname");
	actiongbn   = window.localStorage.getItem("actiongbn");
	
	m_center	= window.localStorage.getItem("center");//작업공정
	m_workFlag	= window.localStorage.getItem("workflag");//생산실적 입력방법
	m_workResultStart	= window.localStorage.getItem("workresultstart");//실적 저장시 자동 재시작 구분
	m_autoWorkerReTuip	= window.localStorage.getItem("autoworkerretuip");//자동시작 시 이전작업자 자동 투입
	
	m_center = '100';
	/*0: 	단일실적 입력 (실적 입력화면에서 실적내역을 조회하여 보여준다.)
	  1:	쿼터별 실적 입력(입력되는 실적을 입력한다.)	  */
	m_workFlag = '0';
	/*0:실적 저장만 진행, 1:실적 저장 시 자동 작업 종료 및 재시작)  */
	m_workResultStart = '0';
	/*0:실적 저장 시 작업자 미투입(자동), 1:실적 저장 시 자동 작업 종료 및 재시작 의 경우 기존 작업자 자동 투입  */ 
	m_autoWorkerReTuip = '0';
	/*0: 작업 시작/종료시 자동 종료, 1:작업 시작/종료 시 수동입력 종료  */
	m_setimeManualInput = '0';
 	
	m_odrkey = window.localStorage.getItem("odrkey");
	m_workdate = window.localStorage.getItem("workdate");
	m_partcode = window.localStorage.getItem("partcode");
	m_partname = window.localStorage.getItem("partname");
	m_partspec = window.localStorage.getItem("partspec");
	m_workqty = window.localStorage.getItem("workqty");
	m_statusname = window.localStorage.getItem("statusname");
	m_status = window.localStorage.getItem("status");
	m_worderno = window.localStorage.getItem("worderno");
	m_wipseq = window.localStorage.getItem("wipseq"); 
	
	m_lotno = window.localStorage.getItem("lotno");
	m_histno = window.localStorage.getItem("histno");
	m_workers = window.localStorage.getItem("workers");
	m_autogoodqty = window.localStorage.getItem("autogoodqty");
	m_goodqty = window.localStorage.getItem("goodqty");
	m_badqty = window.localStorage.getItem("badqty");

	
	data1 = $("#tddata1")[0]; //설비명	
	data2 = $("#tddata2")[0]; //품목코드
	data3 = $("#tddata3")[0]; //품목명
	data4 = $("#tddata4")[0]; //규격
	data5 = $("#tddata5")[0]; //지시량
	data6 = $("#tddata6")[0]; //시작시간
	data7 = $("#tddata7")[0]; //작업자
	data8 = $("#tddata8")[0]; //상태
	
	data9 = $("#tddata9")[0]; //생산량
	data10 = $("#tddata10")[0]; //양품량
	data11 = $("#tddata11")[0]; //불량량
	data12 = $("#tddata12")[0]; //지시번호
	
	//1) 컨트롤 초기화
	fn_CtlInit();
	//alert(m_id + "," + m_pass + "," + m_empid + "," + m_name + "," + m_mcd + "," + m_mname );
 	
	if(actiongbn != "order"){
		//2) 데이터 조회
		fn_GetWorkData();	
	}
	
	
	
};

function fn_CtlInit()
{
	//1) 컨트롤 초기화
	if(m_mcd == '' || m_mcd == 'undefined'){
		data1.innerHTML = "";
		data2.innerHTML = "";
		data3.innerHTML = "";
		data4.innerHTML = "";
		data5.innerHTML = "";
		data6.innerHTML = "";
		data7.innerHTML = "";
		data8.innerHTML = "";
		
		data9.innerHTML = "0";
		data10.innerHTML = "0";
		data11.innerHTML = "0"; 
		data12.innerHTML = "";
	}
	else{		
		data1.innerHTML = m_mname;
		data2.innerHTML = m_partcode;
		data3.innerHTML = m_partname;
		data4.innerHTML = m_partspec;
		data5.innerHTML = m_workqty;
		data6.innerHTML = m_workdate;
		data7.innerHTML = m_workers;
		data8.innerHTML = m_statusname;
		
		data9.innerHTML = m_autogoodqty;
		data10.innerHTML = m_goodqty;
		data11.innerHTML = m_badqty; 
		data12.innerHTML = m_worderno;
		}
};

function fn_AllClear(){
	//data1.innerHTML = "";
	data2.innerHTML = "";
	data3.innerHTML = "";
	data4.innerHTML = "";
	data5.innerHTML = "";
	data6.innerHTML = "";
	data7.innerHTML = "";
	data8.innerHTML = "";
	
	data9.innerHTML = "0";
	data10.innerHTML = "0";
	data11.innerHTML = "0"; 
	data12.innerHTML = "";
	
	window.localStorage["odrkey"] 		= "";
	window.localStorage["workdate"] 	= "";
	window.localStorage["partcode"] 	= "";
	window.localStorage["partname"] 	= "";
	window.localStorage["partspec"] 	= "";
	window.localStorage["workqty"] 		= "";
	window.localStorage["statusname"] 	= "";
	window.localStorage["status"] 		= "";
	window.localStorage["worderno"] 	= "";
	window.localStorage["wipseq"] 		= "";
	window.localStorage["lotno"] 		= ""; 
	window.localStorage["histno"] 		= "";
	window.localStorage["workers"] 		= "";

	window.localStorage["autogoodqty"] 	= "0";
	window.localStorage["goodqty"] 		= "0";
	window.localStorage["badqty"] 		= "0"; 
	 
	m_lotno = "";
	m_histno = "";
	m_workers = "";	 
	m_odrkey = "";
	m_workdate = ""; 
	m_partcode = "";
	m_partname = "";
	m_partspec = "";
	m_workqty = ""
	m_statusname = "";
	m_status = "";
	m_worderno = "";
	m_wipseq = ""; 
	m_autogoodqty = "0";
	m_goodqty = "0";
	m_badqty = "0";
	
};
    
/*프로그램 종료  */
/* function fn_Exit(){
			navigator.notification.confirm('프로그램을 종료하시겠습니까?'
					,fn_Quit,
					'종료',
					'예,아니오');			    
		};
function fn_Quit(){
	 navigator.app.exitApp();	
} */
//////////////////////////////설비 선택////////////////////////
function fn_Machine(){
	window.localStorage["actiongbn"] = "machine";
	 //$.mobile.changePage($(document.location.href="./Machine.html"), {transition:"slide", reverse:false, changeHash:false} );
	/* $.mobile.changePage("./Machine.html",{
				transition:"slide",
				reverse: false,
				changeHash: true
				} 
			); */
	
	//$.mobile.changePage($(document.location.href="./Machine.html"), {transition:"slide",reverse:false, changeHash:true} );
	location.replace("./Machine.html");			
};

//////////////////////////////작업지시 선택////////////////////////
function fn_Worders(){
	if(m_mcd == '' || m_mcd == 'undefined')
		{
			//alert("설비를 선택하세요.");
			return;
		}
	
	window.localStorage["actiongbn"] = "order";
	
	/* $.mobile.changePage("./Orders.html",{
		transition:"slide",
		reverse: false,
		changeHash: true
		} 
	); */
	
	location.replace("./Orders.html"); 
};

//////////////////////////////작업시작////////////////////////
function fn_WorkStartStop(){
	//var btn_Job = document.getElementId("btn_job");
	if(data3.innerHTML == '' || data3.innerHTML == 'undefined')
		{
			alert("작업지시를 선택하세요.");
			return;
		}
	
	window.localStorage["actiongbn"] = "startstop";
	
	if(data8.innerHTML == '' || data8.innerHTML == '대기' || data8.innerHTML == '등록'|| data8.innerHTML == 'undefined'){
		//작업시작
		if(m_setimeManualInput == '1'){
			location.replace("./StartStopTime.html");
			return;
		}
		
		if (confirm("작업을시작하시겠습니까?") == false)
			return ;			
		else		 
			fn_Start(m_mcd, m_worderno, m_wipseq, m_setimeManualInput, "");
	}
	else{
		//작업종료
		if(m_setimeManualInput == '1'){
			location.replace("./StartStopTime.html");
			return;
		}
		
		if (confirm("작업을 종료하시겠습니까?") == false)
				return ;			
		else
			fn_End(m_mcd, m_worderno, m_wipseq, m_setimeManualInput, "",m_histno, m_lotno); 
		
		/* navigator.notification.confirm('작업을 종료하시겠습니까?'
				,fn_End(m_mcd, m_worderno, m_wipseq, m_setimeManualInput, "",m_histno, m_lotno),
				'작업종료',
				'예,아니오'); */
	}
	
	//데이터 기록 및 상태 변경
	//location.replace("./StartStopResult.html"); 
};
/*작업 종료 */
function fn_End(mcd, worderno, wipseq, sedtflag, setime, histno, lotno){
	json_param ='{"strMachine":' + "\""+ mcd 		+ "\"," 
		        + "strWorderNo:" + "\""+ worderno 	+ "\","
		        + "strWipSeq:"   + "\""+ wipseq 	+ "\"," 
		        + "strSeDtFlag:" + "\""+ sedtflag 	+ "\","
		        + "strSe_time:"  + "\""+ setime 	+ "\"," 
		        + "strHistno:"   + "\""+ histno 	+ "\"," 
		        + "strLotno:"    + "\""+ lotno 		+ "\"" +'}';
	$.ajax({
	url:"http://121.78.112.176:222/POP/PorductReturnToJson.aspx/js_WorkEnd",
	contentType:"Application/json; charset=utf-8",
	dataType:"json",
	data:json_param,
	type:"POST",
	success:function(data)
		{
		    if(data.d.mydt[0]["FLAG"] == 'OK') 
				fn_AllClear();
		    else{
		    	alert("작업을 종료하지 못했습니다.");
		    }
			return;		 
		},
	error:function(data) {
			alert('네트워크 상에 문제가 발생되었습니다.');		
		}
	}); 	
};

/*작업 시작  */
function fn_Start(mcd,worderno,wipseq,sedtflag,setime){
	json_param ='{"strMachine":' + "\""+ mcd 		+ "\"," 
		        + "strWorderNo:" + "\""+ worderno 	+ "\","
		        + "strWipSeq:" 	 + "\""+ wipseq 	+ "\"," 
		        + "strSeDtFlag:" + "\""+ sedtflag 	+ "\"," 
		        + "strSe_time:"  + "\""+ setime	 	+ "\"" +'}';
	$.ajax({
	url:"http://121.78.112.176:222/POP/PorductReturnToJson.aspx/js_workstart",
	contentType:"Application/json; charset=utf-8",
	dataType:"json",
	data:json_param,
	type:"POST",
	success:function(data)
	{
		fn_SetData(data);
		
		return;		 
	},
	error:function(data) {alert('네트워크 상에 문제가 발생되었습니다.');
		fn_CtlInit();
	}
	}); 
};


//////////////////////////////작업자 투입////////////////////////
function fn_Worker(){
	if(m_histno == '' || m_histno == 'undefined')
	{
		alert("작업을 시작하세요.");
		return;
	}
	
	//작업자 투입화면 이동
	/* $.mobile.changePage("./Worker.html",{
		transition:"slide",
		reverse: false,
		changeHash: true
		} 
	); */
	window.localStorage["actiongbn"] = "worker";
	location.replace("./Worker.html"); 
}
//////////////////////////////생산실적 등록////////////////////////
function fn_WorkResult(){
	if(m_histno == '' || m_histno == 'undefined')
	{
		alert("작업을 시작하세요.");
		return;
	}
	window.localStorage["actiongbn"] = "workresult";
	//작업실적 입력화면으로 이동
	if(m_workFlag == "0"){//단일실적
		location.replace("./WorkResult01.html");
	}
	else if(m_workFlag == "1"){//쿼터실적
		location.replace("./WorkResult02.html");
	}
};
//////////////////////////////불량실적 등록////////////////////////
function fn_BadResult(){
	if(m_histno == '' || m_histno == 'undefined')
	{
		alert("작업을 시작하세요.");
		return;
	}
	
	//불량실적 등록화면 이동
	/* $.mobile.changePage("./BadResult.html",{
		transition:"slide",
		reverse: false,
		changeHash: true
		} 
	); */
	window.localStorage["actiongbn"] ="badresult"; 
	location.replace("./BadResult.html"); 
};
 
//////////////////////////////비가동 실적 등록////////////////////////
function fn_StopResult(){
	if(m_histno == '' || m_histno == 'undefined')
	{
		alert("작업을 시작하세요.");
		return;
	}
	
	// 비가동실적 등록화면 이동
	/* $.mobile.changePage("./StopResult.html",{
		transition:"slide",
		reverse: false,
		changeHash: true
		} 
	); */
	window.localStorage["actiongbn"] ="stopresult"; 
	location.replace("./StopResult.html"); 
};

//////////////////////////////데이터 조회////////////////////////
function fn_GetWorkData()
{			//var btn_Job = document.getElementById("btn_job");	 	
			var json_param = '';	
			
			if(m_mcd =='undefined' || m_mcd == 'null')
				m_mcd='';
			
			if(m_empid == 'undefined')
				m_empid = window.localStorage.getItem("empid");
			 if(m_mcd == '')
				{
				   alert("설비를 선택하세요.");
				  return;
				} 
		$(document).ready(function()
		{	 
			
			json_param ='{"machine":' 	+ "\"" + m_mcd 		+ "\"," 
			            + "empid:" 	    + "\"" + m_empid 	+ "\","				
				        + "histno:" 	+ "\"" + m_histno 	+ "\"" +'}';
			$.ajax({
			url:"http://121.78.112.176:222/POP/PorductReturnToJson.aspx/workinfo",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:json_param,
			type:"POST",
			success:function(data)
			{						
				 
				$(fn_SetData(data.d.mydt));
				/* if(data8.innerHTML == '' || data8.innerHTML == '대기' || data8.innerHTML == '등록'|| data8.innerHTML == 'undefined'){
					btn_Job.innerHTML = "작업시작";
				}
				else{
					btn_Job.innerHTML = "작업종료";
				} */
				
				return;				 
			},
			error:function(data) {alert('네트워크 상에 문제가 발생되었습니다.');
				fn_CtlInit();
			}
			});
		});	 
};

/*데이터 변수보관, 화면셋팅, 메모리변수에 보관  */
function fn_SetData(dt){
	fn_AllClear();
	
	  for (var row in dt) {	
			m_histno 		=  dt[0]["WORKHISTORYNO"];
			m_lotno			=  dt[0]["LOTNO"];
			m_partcode 		=  dt[0]["PARTCODE"];
			m_partname		=  dt[0]["PARTNAME"];
			m_partspec		=  dt[0]["SPEC"];
			m_workqty		=  dt[0]["WORKQTY"];
			m_workdate		=  dt[0]["SDATE"];
			m_workers		=  dt[0]["WORKERS"];
			m_status		=  dt[0]["WORK_STATUS"];
			m_statusname	=  dt[0]["STATUS"];
			m_autogoodqty	=  dt[0]["AUTOGOODQTY"];
			m_goodqty		=  dt[0]["GOODQTY"];
			m_badqty		=  dt[0]["BADQTY"];		
			m_worderno      =  dt[0]["WORDERNO"];
			m_wipseq		=  dt[0]["WIPSEQ"];
			
			data1.innerHTML = m_mname
			data2.innerHTML = m_partcode;
			data3.innerHTML = m_partname;
			data4.innerHTML = m_partspec;
			data5.innerHTML = m_workqty;
			data6.innerHTML = m_workdate;
			data7.innerHTML = m_workers;
			data8.innerHTML = m_statusname;				
			data9.innerHTML = m_autogoodqty;
			data10.innerHTML = m_goodqty;
			data11.innerHTML = m_badqty;
			data12.innerHTML = m_worderno
			
			window.localStorage["histno"] 		= m_histno;
			window.localStorage["lotno"] 		= m_lotno; 
			window.localStorage["partcode"]		= m_partcode;
			window.localStorage["partname"] 	= m_partname;
			window.localStorage["partspec"] 	= m_partspec;
			window.localStorage["workqty"] 		= m_workqty;
			window.localStorage["workdate"] 	= m_workdate;				
			window.localStorage["workers"] 		= m_workers;
			window.localStorage["status"] 		= m_status;
			window.localStorage["statusname"] 	= m_statusname;
			window.localStorage["autogoodqty"] 	= m_autogoodqty;
			window.localStorage["goodqty"] 		= m_goodqty;
			window.localStorage["badqty"] 		= m_badqty;	
			window.localStorage["worderno"]     = m_worderno;
			window.localStorage["wipseq"]		= m_wipseq
	  };
}

/* function fn_ListViewTitle(){
	var strTemp;
	var	arry = new Array("지시번호","설 비 명","품목코드","품 목 명","규  격","지 시 량","시작시간","작 업 자","상  태");
	 $("#listview1 li").remove();
     for (var i=0; i<=8; i++) {
         var li = document.createElement("li");
         $("#listview1").append(li); 
         strTemp = "<a  href='#' data-ajax='false'>" + arry[i]	+ "</a>";

     //list에 링크 유동적으로 추가
     	$(li).append(strTemp); 
         $("#listview1").listview("refresh");
     }
     
     var	arry1 = new Array("","","","","","","","","");
	 $("#listview2 li").remove();
     for (var i=0; i<=8; i++) {
         var li = document.createElement("li");
         $("#listview2").append(li); 
         strTemp = "<a  href='#'  data-ajax='false'>" + arry[i]	+ "</a>";

     //list에 링크 유동적으로 추가
     	$(li).append(strTemp); 
         $("#listview2").listview("refresh");
     }
};

function fn_ListViewData(){ 
	
}; */
		










//0) 컨트롤별 변수 선언하기

var data1,data2,data3, data4, data5, data6, data7, data8, data9, data10, data11,data12;

var db;	
var sql = "";
var actiongbn = "";

var m_name, m_id,m_pass, m_empid, m_mcd, m_mname, m_workers;
var m_odrkey, m_workdate, m_partcode, m_partname, m_partspec, m_workqty;
var m_statusname, m_status, m_worderno, m_wipseq, m_lotno, m_histno;
var m_autogoodqty, m_goodqty, m_badqty;

var m_center;			//작업공정
var m_workFlag;			//생산실적 입력방법
var m_workResultStart;	//실적 저장시 자동 재시작 구분
var m_autoWorkerReTuip;	//자동시작 시 이전작업자 자동 투입
var m_setimeManualInput; //작업의 시작/종료 시 시간의 수동입력
  

PhoneGap_init();	
/* 
$(document).bind("pageload", function(event, data) {
    init(data.url);
});
 */

//alert 콜백 함수
function fn_alertCallback(){};

/*프로그램 종료  */
function fn_Exit()
{ 	
	navigator.notification.confirm("프로그램을 종료하시겠습니까?"
			  , fn_confirmCallback_Exit
			  , "종료"
			  , "아니오,예");		    
};

function onBackButton(){
	onBackKeyDown();
	navigator.notification.confirm("프로그램을 종료하시겠습니까?"
			  , fn_confirmCallback_Exit
			  , "종료"
			  , "아니오,예");
};

function fn_confirmCallback_Exit(button){
		if(button == 2)
			navigator.app.exitApp();
} ;
 
window.onload = function(){ 	
	fn_Init();
	
	try{
	alert(getMyPhoneNumber());
	}
	catch(err)
	{
		alert(err);
	}
};
		
function fn_Init(){ 		
	
	// data1 = document.getElementById("div_content").document.getElementById("d_data0").document.getElementById("data0").document.getElementById("tddata1");
	// alert(data1.innerHTML);

	 //alert($("#tddata1")[0].innerHTML); 	 
	//=> 위 두가지 유형이 동일한 값 가져옴.
	//alert($("#tddata1")[0].innerHTML);
		
	m_name    	= window.localStorage.getItem("name");
	m_id   		= window.localStorage.getItem("id");
	m_pass   	= window.localStorage.getItem("pass");	
	m_empid   	= window.localStorage.getItem("empid");
	
	m_mcd       = window.localStorage.getItem("mcd");
	m_mname     = window.localStorage.getItem("mname");
	actiongbn   = window.localStorage.getItem("actiongbn");
	
	m_center	= window.localStorage.getItem("center");//작업공정
	m_workFlag	= window.localStorage.getItem("workflag");//생산실적 입력방법
	m_workResultStart	= window.localStorage.getItem("workresultstart");//실적 저장시 자동 재시작 구분
	m_autoWorkerReTuip	= window.localStorage.getItem("autoworkerretuip");//자동시작 시 이전작업자 자동 투입
	
	m_center = '100';
	/*0: 	단일실적 입력 (실적 입력화면에서 실적내역을 조회하여 보여준다.)
	  1:	쿼터별 실적 입력(입력되는 실적을 입력한다.)	  */
	m_workFlag = '0';
	/*0:실적 저장만 진행, 1:실적 저장 시 자동 작업 종료 및 재시작)  */
	m_workResultStart = '0';
	/*0:실적 저장 시 작업자 미투입(자동), 1:실적 저장 시 자동 작업 종료 및 재시작 의 경우 기존 작업자 자동 투입  */ 
	m_autoWorkerReTuip = '0';
	/*0: 작업 시작/종료시 자동 종료, 1:작업 시작/종료 시 수동입력 종료  */
	m_setimeManualInput = '0';
 	
	m_odrkey = window.localStorage.getItem("odrkey");
	m_workdate = window.localStorage.getItem("workdate");
	m_partcode = window.localStorage.getItem("partcode");
	m_partname = window.localStorage.getItem("partname");
	m_partspec = window.localStorage.getItem("partspec");
	m_workqty = window.localStorage.getItem("workqty");
	m_statusname = window.localStorage.getItem("statusname");
	m_status = window.localStorage.getItem("status");
	m_worderno = window.localStorage.getItem("worderno");
	m_wipseq = window.localStorage.getItem("wipseq"); 
	
	m_lotno = window.localStorage.getItem("lotno");
	m_histno = window.localStorage.getItem("histno");
	m_workers = window.localStorage.getItem("workers");
	m_autogoodqty = window.localStorage.getItem("autogoodqty");
	m_goodqty = window.localStorage.getItem("goodqty");
	m_badqty = window.localStorage.getItem("badqty");

	
	data1 = $("#tddata1")[0]; //설비명	
	data2 = $("#tddata2")[0]; //품목코드
	data3 = $("#tddata3")[0]; //품목명
	data4 = $("#tddata4")[0]; //규격
	data5 = $("#tddata5")[0]; //지시량
	data6 = $("#tddata6")[0]; //시작시간
	data7 = $("#tddata7")[0]; //작업자
	data8 = $("#tddata8")[0]; //상태
	
	data9 = $("#tddata9")[0]; //생산량
	data10 = $("#tddata10")[0]; //양품량
	data11 = $("#tddata11")[0]; //불량량
	data12 = $("#tddata12")[0]; //지시번호
	
	//1) 컨트롤 초기화
	fn_CtlInit();
	//alert(m_id + "," + m_pass + "," + m_empid + "," + m_name + "," + m_mcd + "," + m_mname );
 	
	if(actiongbn != "order"){
		//2) 데이터 조회
		fn_GetWorkData();	
	}
	
	
	
};

function fn_CtlInit()
{
	//1) 컨트롤 초기화
	if(m_mcd == '' || m_mcd == 'undefined'){
		data1.innerHTML = "";
		data2.innerHTML = "";
		data3.innerHTML = "";
		data4.innerHTML = "";
		data5.innerHTML = "";
		data6.innerHTML = "";
		data7.innerHTML = "";
		data8.innerHTML = "";
		
		data9.innerHTML = "0";
		data10.innerHTML = "0";
		data11.innerHTML = "0"; 
		data12.innerHTML = "";
	}
	else{		
		data1.innerHTML = m_mname;
		data2.innerHTML = m_partcode;
		data3.innerHTML = m_partname;
		data4.innerHTML = m_partspec;
		data5.innerHTML = m_workqty;
		data6.innerHTML = m_workdate;
		data7.innerHTML = m_workers;
		data8.innerHTML = m_statusname;
		
		data9.innerHTML = m_autogoodqty;
		data10.innerHTML = m_goodqty;
		data11.innerHTML = m_badqty; 
		data12.innerHTML = m_worderno;
		}
};

function fn_AllClear(){
	//data1.innerHTML = "";
	data2.innerHTML = "";
	data3.innerHTML = "";
	data4.innerHTML = "";
	data5.innerHTML = "";
	data6.innerHTML = "";
	data7.innerHTML = "";
	data8.innerHTML = "";
	
	data9.innerHTML = "0";
	data10.innerHTML = "0";
	data11.innerHTML = "0"; 
	data12.innerHTML = "";
	
	window.localStorage["odrkey"] 		= "";
	window.localStorage["workdate"] 	= "";
	window.localStorage["partcode"] 	= "";
	window.localStorage["partname"] 	= "";
	window.localStorage["partspec"] 	= "";
	window.localStorage["workqty"] 		= "";
	window.localStorage["statusname"] 	= "";
	window.localStorage["status"] 		= "";
	window.localStorage["worderno"] 	= "";
	window.localStorage["wipseq"] 		= "";
	window.localStorage["lotno"] 		= ""; 
	window.localStorage["histno"] 		= "";
	window.localStorage["workers"] 		= "";

	window.localStorage["autogoodqty"] 	= "0";
	window.localStorage["goodqty"] 		= "0";
	window.localStorage["badqty"] 		= "0"; 
	 
	m_lotno = "";
	m_histno = "";
	m_workers = "";	 
	m_odrkey = "";
	m_workdate = ""; 
	m_partcode = "";
	m_partname = "";
	m_partspec = "";
	m_workqty = ""
	m_statusname = "";
	m_status = "";
	m_worderno = "";
	m_wipseq = ""; 
	m_autogoodqty = "0";
	m_goodqty = "0";
	m_badqty = "0";
	
};
    
/*프로그램 종료  */
/* function fn_Exit(){
			navigator.notification.confirm('프로그램을 종료하시겠습니까?'
					,fn_Quit,
					'종료',
					'예,아니오');			    
		};
function fn_Quit(){
	 navigator.app.exitApp();	
} */
//////////////////////////////설비 선택////////////////////////
function fn_Machine(){
	window.localStorage["actiongbn"] = "machine";
	 //$.mobile.changePage($(document.location.href="./Machine.html"), {transition:"slide", reverse:false, changeHash:false} );
	/* $.mobile.changePage("./Machine.html",{
				transition:"slide",
				reverse: false,
				changeHash: true
				} 
			); */
	
	//$.mobile.changePage($(document.location.href="./Machine.html"), {transition:"slide",reverse:false, changeHash:true} );
	location.replace("./Machine.html");			
};

//////////////////////////////작업지시 선택////////////////////////
function fn_Worders(){
	if(m_mcd == '' || m_mcd == 'undefined')
		{
			//alert("설비를 선택하세요.");
			return;
		}
	
	window.localStorage["actiongbn"] = "order";
	
	/* $.mobile.changePage("./Orders.html",{
		transition:"slide",
		reverse: false,
		changeHash: true
		} 
	); */
	
	location.replace("./Orders.html"); 
};

//////////////////////////////작업시작////////////////////////
function fn_WorkStartStop(){
	//var btn_Job = document.getElementId("btn_job");
	if(data3.innerHTML == '' || data3.innerHTML == 'undefined')
		{
			alert("작업지시를 선택하세요.");
			return;
		}
	
	window.localStorage["actiongbn"] = "startstop";
	
	if(data8.innerHTML == '' || data8.innerHTML == '대기' || data8.innerHTML == '등록'|| data8.innerHTML == 'undefined'){
		//작업시작
		if(m_setimeManualInput == '1'){
			location.replace("./StartStopTime.html");
			return;
		}
		
		if (confirm("작업을시작하시겠습니까?") == false)
			return ;			
		else		 
			fn_Start(m_mcd, m_worderno, m_wipseq, m_setimeManualInput, "");
	}
	else{
		//작업종료
		if(m_setimeManualInput == '1'){
			location.replace("./StartStopTime.html");
			return;
		}
		
		if (confirm("작업을 종료하시겠습니까?") == false)
				return ;			
		else
			fn_End(m_mcd, m_worderno, m_wipseq, m_setimeManualInput, "",m_histno, m_lotno); 
		
		/* navigator.notification.confirm('작업을 종료하시겠습니까?'
				,fn_End(m_mcd, m_worderno, m_wipseq, m_setimeManualInput, "",m_histno, m_lotno),
				'작업종료',
				'예,아니오'); */
	}
	
	//데이터 기록 및 상태 변경
	//location.replace("./StartStopResult.html"); 
};
/*작업 종료 */
function fn_End(mcd, worderno, wipseq, sedtflag, setime, histno, lotno){
	json_param ='{"strMachine":' + "\""+ mcd 		+ "\"," 
		        + "strWorderNo:" + "\""+ worderno 	+ "\","
		        + "strWipSeq:"   + "\""+ wipseq 	+ "\"," 
		        + "strSeDtFlag:" + "\""+ sedtflag 	+ "\","
		        + "strSe_time:"  + "\""+ setime 	+ "\"," 
		        + "strHistno:"   + "\""+ histno 	+ "\"," 
		        + "strLotno:"    + "\""+ lotno 		+ "\"" +'}';
	$.ajax({
	url:"http://121.78.112.176:222/POP/PorductReturnToJson.aspx/js_WorkEnd",
	contentType:"Application/json; charset=utf-8",
	dataType:"json",
	data:json_param,
	type:"POST",
	success:function(data)
		{
		    if(data.d.mydt[0]["FLAG"] == 'OK') 
				fn_AllClear();
		    else{
		    	alert("작업을 종료하지 못했습니다.");
		    }
			return;		 
		},
	error:function(data) {
			alert('네트워크 상에 문제가 발생되었습니다.');		
		}
	}); 	
};

/*작업 시작  */
function fn_Start(mcd,worderno,wipseq,sedtflag,setime){
	json_param ='{"strMachine":' + "\""+ mcd 		+ "\"," 
		        + "strWorderNo:" + "\""+ worderno 	+ "\","
		        + "strWipSeq:" 	 + "\""+ wipseq 	+ "\"," 
		        + "strSeDtFlag:" + "\""+ sedtflag 	+ "\"," 
		        + "strSe_time:"  + "\""+ setime	 	+ "\"" +'}';
	$.ajax({
	url:"http://121.78.112.176:222/POP/PorductReturnToJson.aspx/js_workstart",
	contentType:"Application/json; charset=utf-8",
	dataType:"json",
	data:json_param,
	type:"POST",
	success:function(data)
	{
		fn_SetData(data);
		
		return;		 
	},
	error:function(data) {alert('네트워크 상에 문제가 발생되었습니다.');
		fn_CtlInit();
	}
	}); 
};


//////////////////////////////작업자 투입////////////////////////
function fn_Worker(){
	if(m_histno == '' || m_histno == 'undefined')
	{
		alert("작업을 시작하세요.");
		return;
	}
	
	//작업자 투입화면 이동
	/* $.mobile.changePage("./Worker.html",{
		transition:"slide",
		reverse: false,
		changeHash: true
		} 
	); */
	window.localStorage["actiongbn"] = "worker";
	location.replace("./Worker.html"); 
}
//////////////////////////////생산실적 등록////////////////////////
function fn_WorkResult(){
	if(m_histno == '' || m_histno == 'undefined')
	{
		alert("작업을 시작하세요.");
		return;
	}
	window.localStorage["actiongbn"] = "workresult";
	//작업실적 입력화면으로 이동
	if(m_workFlag == "0"){//단일실적
		location.replace("./WorkResult01.html");
	}
	else if(m_workFlag == "1"){//쿼터실적
		location.replace("./WorkResult02.html");
	}
};
//////////////////////////////불량실적 등록////////////////////////
function fn_BadResult(){
	if(m_histno == '' || m_histno == 'undefined')
	{
		alert("작업을 시작하세요.");
		return;
	}
	
	//불량실적 등록화면 이동
	/* $.mobile.changePage("./BadResult.html",{
		transition:"slide",
		reverse: false,
		changeHash: true
		} 
	); */
	window.localStorage["actiongbn"] ="badresult"; 
	location.replace("./BadResult.html"); 
};
 
//////////////////////////////비가동 실적 등록////////////////////////
function fn_StopResult(){
	if(m_histno == '' || m_histno == 'undefined')
	{
		alert("작업을 시작하세요.");
		return;
	}
	
	// 비가동실적 등록화면 이동
	/* $.mobile.changePage("./StopResult.html",{
		transition:"slide",
		reverse: false,
		changeHash: true
		} 
	); */
	window.localStorage["actiongbn"] ="stopresult"; 
	location.replace("./StopResult.html"); 
};

//////////////////////////////데이터 조회////////////////////////
function fn_GetWorkData()
{			//var btn_Job = document.getElementById("btn_job");	 	
			var json_param = '';	
			
			if(m_mcd =='undefined' || m_mcd == 'null')
				m_mcd='';
			
			if(m_empid == 'undefined')
				m_empid = window.localStorage.getItem("empid");
			 if(m_mcd == '')
				{
				   alert("설비를 선택하세요.");
				  return;
				} 
		$(document).ready(function()
		{	 
			
			json_param ='{"machine":' 	+ "\"" + m_mcd 		+ "\"," 
			            + "empid:" 	    + "\"" + m_empid 	+ "\","				
				        + "histno:" 	+ "\"" + m_histno 	+ "\"" +'}';
			$.ajax({
			url:"http://121.78.112.176:222/POP/PorductReturnToJson.aspx/workinfo",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:json_param,
			type:"POST",
			success:function(data)
			{						
				 
				$(fn_SetData(data.d.mydt));
				/* if(data8.innerHTML == '' || data8.innerHTML == '대기' || data8.innerHTML == '등록'|| data8.innerHTML == 'undefined'){
					btn_Job.innerHTML = "작업시작";
				}
				else{
					btn_Job.innerHTML = "작업종료";
				} */
				
				return;				 
			},
			error:function(data) {alert('네트워크 상에 문제가 발생되었습니다.');
				fn_CtlInit();
			}
			});
		});	 
};

/*데이터 변수보관, 화면셋팅, 메모리변수에 보관  */
function fn_SetData(dt){
	fn_AllClear();
	
	  for (var row in dt) {	
			m_histno 		=  dt[0]["WORKHISTORYNO"];
			m_lotno			=  dt[0]["LOTNO"];
			m_partcode 		=  dt[0]["PARTCODE"];
			m_partname		=  dt[0]["PARTNAME"];
			m_partspec		=  dt[0]["SPEC"];
			m_workqty		=  dt[0]["WORKQTY"];
			m_workdate		=  dt[0]["SDATE"];
			m_workers		=  dt[0]["WORKERS"];
			m_status		=  dt[0]["WORK_STATUS"];
			m_statusname	=  dt[0]["STATUS"];
			m_autogoodqty	=  dt[0]["AUTOGOODQTY"];
			m_goodqty		=  dt[0]["GOODQTY"];
			m_badqty		=  dt[0]["BADQTY"];		
			m_worderno      =  dt[0]["WORDERNO"];
			m_wipseq		=  dt[0]["WIPSEQ"];
			
			data1.innerHTML = m_mname
			data2.innerHTML = m_partcode;
			data3.innerHTML = m_partname;
			data4.innerHTML = m_partspec;
			data5.innerHTML = m_workqty;
			data6.innerHTML = m_workdate;
			data7.innerHTML = m_workers;
			data8.innerHTML = m_statusname;				
			data9.innerHTML = m_autogoodqty;
			data10.innerHTML = m_goodqty;
			data11.innerHTML = m_badqty;
			data12.innerHTML = m_worderno
			
			window.localStorage["histno"] 		= m_histno;
			window.localStorage["lotno"] 		= m_lotno; 
			window.localStorage["partcode"]		= m_partcode;
			window.localStorage["partname"] 	= m_partname;
			window.localStorage["partspec"] 	= m_partspec;
			window.localStorage["workqty"] 		= m_workqty;
			window.localStorage["workdate"] 	= m_workdate;				
			window.localStorage["workers"] 		= m_workers;
			window.localStorage["status"] 		= m_status;
			window.localStorage["statusname"] 	= m_statusname;
			window.localStorage["autogoodqty"] 	= m_autogoodqty;
			window.localStorage["goodqty"] 		= m_goodqty;
			window.localStorage["badqty"] 		= m_badqty;	
			window.localStorage["worderno"]     = m_worderno;
			window.localStorage["wipseq"]		= m_wipseq
	  };
}
		








//0) 컨트롤별 변수 선언하기
var data1,data2,data3, data4, data5, data6, data7, data8, data9, data10, data11, histno;
var db;	
var sql = "";
var m_name, m_id,m_pass, m_empid, m_mcd, m_mname;


/*폰겝 사용가능하도록 이벤트 처리  */
document.addEventListener("deviceready",onStart,false);

function onStart()
{
	alert("onStart"); 
	document.addEventListener("backbutton", backKeyDown, true);
	
	fn_Init(); 
}
	



window.onload = function(){ 
	fn_Init();

};
		
function fn_Init(){ 	
	//document.addEventListener("deviceready",onStart,false);
	
	// data1 = document.getElementById("div_content").document.getElementById("d_data0").document.getElementById("data0").document.getElementById("tddata1");
	// alert(data1.innerHTML);

	 //alert($("#tddata1")[0].innerHTML); 	 
	//=> 위 두가지 유형이 동일한 값 가져옴.
	//alert($("#tddata1")[0].innerHTML);
	data1 = $("#tddata1")[0]; //설비명	
	data2 = $("#tddata2")[0]; //품목코드
	data3 = $("#tddata3")[0]; //품목명
	data4 = $("#tddata4")[0]; //규격
	data5 = $("#tddata5")[0]; //지시량
	data6 = $("#tddata6")[0]; //시작시간
	data7 = $("#tddata7")[0]; //작업자
	data8 = $("#tddata8")[0]; //상태
	
	data9 = $("#tddata9")[0]; //생산량
	data10 = $("#tddata10")[0]; //양품량
	data11 = $("#tddata11")[0]; //불량량
	
	//1) 컨트롤 초기화
	data1.innerHTML = "";
	data2.innerHTML = "";
	data3.innerHTML = "";
	data4.innerHTML = "";
	data5.innerHTML = "";
	data6.innerHTML = "";
	data7.innerHTML = "";
	data8.innerHTML = "";
	
	data9.innerHTML = "0";
	data10.innerHTML = "0";
	data11.innerHTML = "0"; 
	
	
	m_name    	= window.localStorage.getItem("name")
	m_id   		= window.localStorage.getItem("id")
	m_pass   	= window.localStorage.getItem("pass")
	m_empid   	= window.localStorage.getItem("empid")
	m_mcd        = window.localStorage.getItem("mcd")
	m_mname      = window.localStorage.getItem("mname")
	
	alert(m_id);
	alert(m_mcd); 
	
	
	
};
    
/*프로그램 종료  */
function fn_Exit()
{
    if (confirm('프로그램을 종료하시겠습니까?')) {
    	 
        navigator.app.exitApp();		 
    }
}
/*
//////////////////////////////설비 선택////////////////////////
function fn_Machine(){
	
};
//////////////////////////////작업지시 선택////////////////////////
function fn_Worders{
	if(m_cd == '' || m_cd == 'undefined')
		{
			alert("설비를 선택하세요.");
			return;
		}
	
};
//////////////////////////////작업시작////////////////////////
function fn_WorkStartStop(){
	var btn_Job = document.getElementId("btn_job");
	if(data3.innerHTML == '' || data3.innerHTML == 'undefined')
		{
			alert("작업지시를 선택하세요.");
			return;
		}
	
	if(data8.innerHTML == '' || data8.innerHTML == '대기'|| data8.innerHTML == 'undefined'){
		btn_Job.innerHTML = "작업시작";
	}
	else{
		btn_Job.innerHTML = "작업종료";
	}
	
	//데이터 기록 및 상태 변경
	
};
//////////////////////////////작업자 투입////////////////////////
function fn_Worker(){
	if(histno == '' || histno == 'undefined')
	{
		alert("작업을 시작하세요.");
		return;
	}
	
	//작업자 투입화면 이동
}
//////////////////////////////생산실적 등록////////////////////////
function fn_WorkResult(){
	if(histno == '' || histno == 'undefined')
	{
		alert("작업을 시작하세요.");
		return;
	}
	
	//작업실적 입력화면으로 이동
};
//////////////////////////////불량실적 등록////////////////////////
function fn_BadResult(){
	if(histno == '' || histno == 'undefined')
	{
		alert("작업을 시작하세요.");
		return;
	}
	
	//불량실적 등록화면 이동
};
 
//////////////////////////////비가동 실적 등록////////////////////////
function fn_StopResult(){
	if(histno == '' || histno == 'undefined')
	{
		alert("작업을 시작하세요.");
		return;
	}
	
	// 비가동실적 등록화면 이동
};
*/

//////////////////////////////데이터 조회////////////////////////
function fn_GetWorkData()
{				 	
			var json_param = '';	
			
			if(m_cd =='undefined')
				m_cd='';
			
			if(m_empid == 'undefined')
				m_empid = window.localStorage.getItem("id");
			/* if(m_cd == '')
				{
				  alert("설비를 선택하세요.");
				  return;
				} */
		$(document).ready(function()
		{	 
			json_param ='{"machine":' + "\""+ m_cd + "\"," + "empid:" + "\""+ m_empid + "\"" +'}';
		 
			$.ajax({
			url:"http://121.78.112.176:222/POP/PorductReturnToJson.aspx/workinfo",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:json_param,
			type:"POST",
			success:function(data)
			{
				histno =  data.d.mydt[0]["WORKHISTORYNO"];
				data1.innerHTML = m_name
				data2.innerHTML = data.d.mydt[0]["PARTCODE"];
				data3.innerHTML = data.d.mydt[0]["PARTNAME"];
				data4.innerHTML = data.d.mydt[0]["SPEC"];
				data5.innerHTML = data.d.mydt[0]["WORKQTY"];
				data6.innerHTML = data.d.mydt[0]["SDATE"];
				data7.innerHTML = data.d.mydt[0]["WORKERS"];
				data8.innerHTML = data.d.mydt[0]["STATUS"];
				
				data9.innerHTML = data.d.mydt[0]["AUTOGOODQTY"];
				data10.innerHTML = data.d.mydt[0]["GOODQTY"];
				data11.innerHTML = data.d.mydt[0]["BADQTY"];
				 
				window.localStorage["partcode"] = data2.innerHTML;
				window.localStorage["histno"] = histno;
				window.localStorage["partname"] = data3.innerHTML;
					
			 
				alert("조회 완료.");
				return;
				 
			},
			error:function(data) {alert('네트워크 상에 문제가 발생되었습니다.'); }
			});
		 });	 
};
		



/*
 * MacAddress
 * Implements the javascript access to the cordova plugin for retrieving the device mac address. Returns 0 if not running on Android
 * @author Olivier Brand
 */

/**
 * @return the mac address class instance
 */
var MacAddress = function() {
};

/**
 * Returns the mac address of the device. Return a 00:00:00:00:00:00 for
 * emulator based runtime or just PC web
 * 
 * @param successCallback
 *            The callback which will be called when directory listing is
 *            successful
 * @param failureCallback
 *            The callback which will be called when directory listing encouters
 *            an error
 */
MacAddress.prototype.getMacAddress = function(successCallback, failureCallback) {
	return cordova.exec(successCallback, failureCallback, 'MacAddress',
			'getMacAddress', [], false);
};

cordova.addConstructor(function() {
    cordova.addPlugin('macaddress', new MacAddress());
});

var db;	
var sql = "";
var m_name, m_id,m_pass, m_empid, m_machinecd, m_machinename
//????ͺ??̽? OPEN
function OpenDB(){
			try{ 
				/*????ͺ??̽??? ?????? ???ϴ?  */
				db = window.openDatabase("DB_POP", "1.0", "DB GPOP", 100000);
				//alert("DB OK"); 
			} catch(e){
				alert("Failed DB Openning!!");
			}
		}
/*????ͺ??̽? ???? ǥ?? */
function errorCB(sqlError){
	var msg="[" + sqlError.code + "]" + "\n" + sqlError.message;
	alert(msg);			
}
/*????ó?????޽?? ǥ?? */
function successCB(){
	alert("success!");
}
/////////////////////////////////////////////////////////////////////////////////////////
//SELECT
function fn_selectData(){
	db.transaction(fn_SelectSQL, errorCB);
}

function fn_SelectSQL(sqlTransaction){
	sqlTransaction.executeSql("select * from tb_Login",[],fn_SelectOK,errorCB);
}

function fn_SelectOK(sqlTransaction, sqlResultSet){
	var msg = "\n# rowAffected : " + sqlResultSet.rowAffected
    + "\n# rows.length : " + sqlResultSet.rows.length
    
    alert(msg);
	
	//row ó??
	var rsl = sqlResultSet.rows;
	for(var i=0; i<rsl.length; i++)
		{
		//id, pass, name, empid, machinecd, machinename
			m_name    	= rsl.item(i).name;
			m_id   		= rsl.item(i).id;
			m_pass   	= rsl.item(i).pass;
			m_empid   	= rsl.item(i).empid;
			m_machinecd = rsl.item(i).machinecd;
			m_machinename = rsl.item(i).machinename;
		}
}
/////////////////////////////////////////////////////////////////////////////////////////
//????ͺ??̽? ???
/*function InsertTable(){
	db.transaction(ExecSQLInsert, errorCB, successCB);
}

function ExecSQLInsert(sqlTransaction){
	//sql = "INSERT INTO tb_Login (id, pass, name, empid) VALUES (?,?,?,?)";
	sqlTransaction.executeSql(sql, [m_id, m_pass, m_name, EMPID], fn_insertOK, errorCB);
}

//??? ?? Ȯ??
function fn_insertOK(sqlTransaction, sqlResultSet){
			var msg = "# insertID : " + sqlResultSet.insertId 
			        + "\n# rowAffected : " + sqlResultSet.rowAffected
			        + "\n# rows.length : " + sqlResultSet.rows.length
			        
			alert(msg);			
			alert("?۾????? ?Ϸ?);
		}
*/		


function SoftKeyBoard() {}

SoftKeyBoard.prototype.show = function(win, fail) {
    return PhoneGap.exec(
            function (args) { if(win !== undefined) { win(args); } }, 
            function (args) { if(fail !== undefined) { fail(args); } }, 
            "SoftKeyBoard", 
            "show", 
            []);	
};

SoftKeyBoard.prototype.hide = function(win, fail) {
    return PhoneGap.exec(
            function (args) { if(win !== undefined) { win(args); } }, 
            function (args) { if(fail !== undefined) { fail(args); } },
            "SoftKeyBoard", 
            "hide", 
            []);	
};

SoftKeyBoard.prototype.isShowing = function(win, fail) {
    return PhoneGap.exec(
            function (args) { if(win !== undefined) { win(args); } }, 
            function (args) { if(fail !== undefined) { fail(args); } },
            "SoftKeyBoard", 
            "isShowing", 
            []);	
};

PhoneGap.addConstructor(function() {
    PhoneGap.addPlugin('SoftKeyBoard', new SoftKeyBoard());
    PluginManager.addService("SoftKeyBoard","com.zenexity.SoftKeyBoardPlugin.SoftKeyBoard");
});




// ???(,)?? ???????ڸ? ??? 
    function cfNumeric(sOrg) { 
    var nm; 
    sOrg = sOrg.replace(/,/g,""); 
    nm = parseFloat(sOrg).toString(); 
    return (isNaN(nm)?0:nm); 
    } 

  

 // ?ڵ???????? ?ֱ?
 function number_format(num) { 
    num = num.replace(/,/g, "") 
    var num_str = num.toString() 
    var result = '' 
  
      for(var i=0; i<num_str.length; i++) { 
            var tmp = num_str.length-(i+1) 
            if(i%3==0 && i!=0) result = ',' + result 
            result = num_str.charAt(tmp) + result 
      } 
  
        return result 
  } 
 

 /* =================================================================== 
 Function : onlyNumDecimalInput(obj, number, maxDecimal) 
 Return  : 
 Usage    : ???ڿ??Ҽ????? ?Է?????(onKeyDown ?̺?Ʈ) 
=================================================================== */ 
function onlyNumDecimalInput(){ 
 var code = window.event.keyCode; 
  
  if ((code >= 48 && code <= 57) || (code >= 96 && code <= 105) || code == 110 || code == 190 || 
      code == 8 || code == 9 || code == 13 || code == 46){ 
  window.event.returnValue = true; 
  return; 
  } 
  alert("???ڸ? ?Է???????ϴ?"); 
  window.event.returnValue = false; 
}; 

/*input ???ڸ? ?Է¹ޱ?
 * 
<input name="tel2" type="text" size="4" onkeyPress="if ((event.keyCode<48) || (event.keyCode>57)) event.returnValue=false;"style="ime-mode:disabled"> 
*/
 
//input?? ?ڵ??????Ѿ??<input name=txtInput onkeydown="paste()"> 
function paste(){ 
	  if(event.ctrlKey && String.fromCharCode(event.keyCode) == "V"){ 
	    if (window.clipboardData) // IE 
	    { 
	        // get data from clipboard 
	        var txtClipboard = window.clipboardData.getData('Text');        
	        var arr          = txtClipboard.split(" "); 
	        var objText      = document.fm.txtInput; 
	        for(var i=0;i<arr.length && i<objText.length;i++){ 
	          objText[i].value = arr[i]; 
	        } 
	        event.returnValue = false; 
	        event.keyCode = 0; 
	        return false; 
	    } 
	  } 
	}; 

//?ڹٽ?ũ??Ʈ ???ڸ? ?Է??ޱ?????Է??Ұ?) 
function onlyNumberInput() 
{ 
 var code = window.event.keyCode; 

 if ((code > 34 && code < 41) || (code > 47 && code < 58) || (code > 95 && code < 106) || code == 8 || code == 9 || code == 13 || code == 46) 
 { 
  window.event.returnValue = true; 
  return; 
 } 
 window.event.returnValue = false; 
}; 


	
 /*Ư???????Է????, ???ڸ? ?Է????
  * 
  <form onSubmit="return false;"> 
????? Ư???????Է?? ?????ϴ?: (?? !@#$%^&* ??<br> 
<textarea rows=2 cols=20 name=comments onKeypress="if ((event.keyCode > 32 && event.keyCode < 48) || (event.keyCode > 57 && event.keyCode < 65) || (event.keyCode > 90 && event.keyCode < 97)) event.returnValue = false;"></textarea> 
<br> 
<br> 
????? (??????? ?Է?? ?????ϴ?:<br> 
<input type=text name=txtEmail onKeypress="if (event.keyCode==34 || event.keyCode==39) event.returnValue = false;"> 
<br> 
<br> 
????? ???ڸ? ?Է?????մϴ?:<br> 
<input type=text name=txtPostalCode onKeypress="if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;"> 
</form>
  */
















			jQuery.extend(jQuery.mobile.datebox.prototype.options, {
			useModal: true,
			useNewStyle: true,
			usePlaceholder: true,
		});

	var BadCode=new Array();
	var BadName=new Array();
	var partname = window.localStorage.getItem("partname");
	var mname = window.localStorage.getItem("mname");
	//var workhistoryno = "20111004A040001";
	//var machineid = "A04";
	var machineid =  window.localStorage.getItem("mcd");
	var workhistoryno = window.localStorage.getItem("histno");
	var StopSeq;
	var SaveFlag="0";
	var totalUse = 0;
	var Syear;
	var Eyear;
	
	var curdate;
	var curtime
	var datenow;
	
	datenow = new Date();
    curdate = getDateStrFromDateObject(datenow);
	curtime = getTimeStrFromDateObject(datenow);

    document.addEventListener("deviceready", onStart, false);
    function onStart() {   
    	document.addEventListener("backbutton", backKeyDown, true);	
    	};
    
	
	window.onload = function()
	{
		$(document).ready(function()
		{	
			Grid();
			var Data='{"start":' +"\"" +'1'+"\""+ '}';
			$.ajax({
			url:"http://121.78.112.176:222/POP/StopResult.aspx/init",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:Data,
			type:"POST",
			success:function(data)
			{
				$(makeOption(data.d.mydt));
			},
			error:function(data) {alert('접속오류'); }
			});
			
			$("#part").val(partname);
			$("#mname").val(mname);
			
		});
		
		
		$('#sdate').trigger('datebox', {'method':'set', 'value':curdate});
		$('#stime').trigger('datebox', {'method':'set', 'value':curtime});
		$('#edate').trigger('datebox', {'method':'set', 'value':curdate});
		$('#etime').trigger('datebox', {'method':'set', 'value':curtime});

	}

	function Grid()
	{
		var jsonData='{"workhistoryno":' +"\"" +workhistoryno+"\""+ '}';
			$.ajax({
			url:"http://121.78.112.176:222/POP/StopResult.aspx/Stopresult",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{
				$(makeControl(data.d.mydt));
			},
			error:function(data) {alert('접속오류'); }
			});
	}

	//옵션 컨트롤
	function makeOption(dt)
	{
		for (var row in dt)
		{
			//stringmem=dt[row]["MEMSHTNAME"];
			BadCode[row]=dt[row]["STOPCODE"];
			BadName[row]=dt[row]["STOPNAME"];
			option = document.createElement( "option" );
			option.value = BadCode[row];
			option.innerText = BadName[row];
			$("#com").append(option);

		}
		
	   $("#com")[0].selectedIndex =  -1;
	   $("#com").selectmenu("refresh");
	  // $('#com').submit();
	}

	//제큐 그리드 만들기
	function makeControl(dt)
	{//alert('d.');
			
			jQuery("#list4").jqGrid({
			datatype: "local",
			colNames:['순번','사유', '시작시간', '종료시간','발생시간','스탑코드','시작년도','끝년도'],
			colModel:[
				{name:'STOPSEQ',index:'STOPSEQ', sorttype:"int",width:30,align:"center"},
				{name:'STOPNAME',index:'STOPNAME',width:80},
				{name:'STARTTIME',index:'STARTTIME',  align : 'center',width:55},
				{name:'ENDTIME',index:'ENDTIME',  align : 'center',width:55},
				{name:'USETIME',index:'USETIME',  align : 'center',width:35},
				{name:'STOPCODE',index:'STOPCODE',hidden:true},
				{name:'SYEAR',index:'SYEAR',hidden:true},
				{name:'EYEAR',index:'EYEAR',hidden:true}
			],
			//multiselect: true,
			//viewrecords: true,
			autowidth : true,
			height: "100%",
			onSelectRow: function(SEQ)
			{ 
				Setting();
			},
			caption: "비가동실적관리"

			}).navGrid('#list4',{add:false,del:false,edit:false,position:'right'}); 

			var Data = new Array();
			for(row in dt)
			{
				Data[row]={STOPSEQ:dt[row]["STOPSEQ"],STOPNAME:dt[row]["STOPNAME"],STARTTIME:dt[row]["STARTTIME"],ENDTIME:dt[row]["ENDTIME"],
				USETIME:dt[row]["USETIME"],STOPCODE:dt[row]["STOPCODE"],SYEAR:dt[row]["SYEAR"],EYEAR:dt[row]["EYEAR"]};
				totalUse +=dt[row]["USETIME"];
			}
			$("#totalUse").val(totalUse + ' 분');
			totalUse=0;
			var mydata = [Data];
			for(var i=0;i<=mydata.length;i++)
			{
				jQuery("#list4").jqGrid('addRowData',i+1,mydata[i]);
			}
			
			//jQuery("#list4").hideCol("BADCODE");

	}

	function Setting()
	{
		$("#stats")[0].innerHTML="수정";
		SaveFlag="1";
		var id = jQuery("#list4").jqGrid('getGridParam','selrow');
		var ret = jQuery("#list4").jqGrid('getRowData',id);
		var Stime = ret.STARTTIME.split(" ");
		var Etime = ret.ENDTIME.split(" ");
		$('#sdate').trigger('datebox', {'method':'set', 'value':Stime[0]});
		$('#stime').trigger('datebox', {'method':'set', 'value':Stime[1]});
		$('#edate').trigger('datebox', {'method':'set', 'value':Etime[0]});
		$('#etime').trigger('datebox', {'method':'set', 'value':Etime[1]});
		StopSeq = ret.STOPSEQ;
		Syear = ret.SYEAR;
		Eyear = ret.EYEAR;
		//alert($("#sdate").val());
		//alert($("#stime").val());
		//$("#bad").val((ret.QTY.replace(/\s+/, '')));
		$("#com").val(ret.STOPCODE); 
		$("#com").selectmenu('refresh');
	}

	function Delete()
	{
		var isDel = confirm("정말로 삭제하시겠습니까?");
		if(isDel)
		{
			var jsonData = '{"workhistoryno":' + "\""+ workhistoryno 
							+ "\"," +"\""+ "stopseq"+"\":" + "\""+ StopSeq 
							+ "\"," + "stopcode:" + "\""+ $("#com").val() + "\""
							+'}'
			$.ajax({
			url:"http://121.78.112.176:222/POP/StopResult.aspx/delete",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{
				alert('삭제되었습니다.');
				jQuery("#list4").jqGrid('clearGridData');
				Grid();
				New();
			},
			error:function(data) {alert('삭제에 실패하였습니다.'); }
			});
			
		}
		else
		{
			 return;
		}
		//jQuery("#list4").jqGrid('clearGridData');
	}

	function Save()
	{
			var stime;
			var etime;
			if(SaveFlag==1)
			{
				stime = Syear + "-" + $("#sdate").val() + " " + $("#stime").val();
				etime = Eyear + "-" + $("#edate").val() + " " + $("#etime").val();
			}
			else
			{
				var now = new Date();
				stime = now.getFullYear()+"-" + $("#sdate").val() + " " + $("#stime").val();
				etime = now.getFullYear()+"-" + $("#edate").val() + " " + $("#etime").val();
			}

			var jsonData='{"workhistoryno":' + "\""+ workhistoryno 
						  + "\"," +"\""+ "stopseq"+"\":" + "\""+ StopSeq 
						  + "\"," +"\""+ "stopcode"+"\":" + "\""+ $("#com").val()
						  + "\"," +"\""+ "machineid"+"\":" + "\""+  machineid
						  + "\"," +"\""+ "stime"+"\":" + "\""+  stime
						  + "\"," +"\""+ "etime"+"\":" + "\""+  etime
						  + "\"," + "saveflag:" + "\""+ SaveFlag + "\""
						+'}'

			$.ajax({
			url:"http://121.78.112.176:222/POP/StopResult.aspx/update",
			contentType:"Application/json; charset=utf-8",
			dataType:"json",
			data:jsonData,
			type:"POST",
			success:function(data)
			{
				if(data.d.mydt[0]["RESULT"] == "Y")
				{
					alert('저장되었습니다.');
					jQuery("#list4").jqGrid('clearGridData');
					Grid();
					New();
				}
				else
				{
					alert('시간이 알맞지 않습니다.');
				}
			},
			error:function(data) {alert('저장에 실패하였습니다.'); }
			});
	}

	function New()
	{
		SaveFlag="0";
		StopSeq="";
		jQuery("#list4").resetSelection();
		$("#com")[0].selectedIndex =  -1;
		$("#com").selectmenu("refresh");
		$("#stats")[0].innerHTML="신규";
		$('#sdate').trigger('datebox', {'method':'set', 'value':curdate});
		$('#stime').trigger('datebox', {'method':'set', 'value':curtime});
		$('#edate').trigger('datebox', {'method':'set', 'value':curdate});
		$('#etime').trigger('datebox', {'method':'set', 'value':curtime});
	}
	
	 /*뒤로 버튼을 누르면 이전페이지로 되돌아 간다.  */
    function fn_Back() {
  		location.replace("./Main.html");
    };
   


(function($){ 		  
	$.fn.popupWindow = function(instanceSettings){
		
		return this.each(function(){
		
		$(this).click(function(){
		
		$.fn.popupWindow.defaultSettings = {
			centerBrowser:0, // center window over browser window? {1 (YES) or 0 (NO)}. overrides top and left
			centerScreen:0, // center window over entire screen? {1 (YES) or 0 (NO)}. overrides top and left
			height:500, // sets the height in pixels of the window.
			left:0, // left position when the window appears.
			location:0, // determines whether the address bar is displayed {1 (YES) or 0 (NO)}.
			menubar:0, // determines whether the menu bar is displayed {1 (YES) or 0 (NO)}.
			resizable:0, // whether the window can be resized {1 (YES) or 0 (NO)}. Can also be overloaded using resizable.
			scrollbars:0, // determines whether scrollbars appear on the window {1 (YES) or 0 (NO)}.
			status:0, // whether a status line appears at the bottom of the window {1 (YES) or 0 (NO)}.
			width:500, // sets the width in pixels of the window.
			windowName:null, // name of window set from the name attribute of the element that invokes the click
			windowURL:null, // url used for the popup
			top:0, // top position when the window appears.
			toolbar:0 // determines whether a toolbar (includes the forward and back buttons) is displayed {1 (YES) or 0 (NO)}.
		};
		
		settings = $.extend({}, $.fn.popupWindow.defaultSettings, instanceSettings || {});
		
		var windowFeatures =    'height=' + settings.height +
								',width=' + settings.width +
								',toolbar=' + settings.toolbar +
								',scrollbars=' + settings.scrollbars +
								',status=' + settings.status + 
								',resizable=' + settings.resizable +
								',location=' + settings.location +
								',menuBar=' + settings.menubar;

				settings.windowName = this.name || settings.windowName;
				settings.windowURL = this.href || settings.windowURL;
				var centeredY,centeredX;
			
				if(settings.centerBrowser){
						
					if ($.browser.msie) {//hacked together for IE browsers
						centeredY = (window.screenTop - 120) + ((((document.documentElement.clientHeight + 120)/2) - (settings.height/2)));
						centeredX = window.screenLeft + ((((document.body.offsetWidth + 20)/2) - (settings.width/2)));
					}else{
						centeredY = window.screenY + (((window.outerHeight/2) - (settings.height/2)));
						centeredX = window.screenX + (((window.outerWidth/2) - (settings.width/2)));
					}
					window.open(settings.windowURL, settings.windowName, windowFeatures+',left=' + centeredX +',top=' + centeredY).focus();
				}else if(settings.centerScreen){
					centeredY = (screen.height - settings.height)/2;
					centeredX = (screen.width - settings.width)/2;
					window.open(settings.windowURL, settings.windowName, windowFeatures+',left=' + centeredX +',top=' + centeredY).focus();
				}else{
					window.open(settings.windowURL, settings.windowName, windowFeatures+',left=' + settings.left +',top=' + settings.top).focus();	
				}
				return false;
			});
			
		});	
	};
})(jQuery);


$.widget("mobile.progressbar", {
    options: {
        outerTheme: null,
        innerTheme: null,
        mini: false,
        value: 0,
        max: 100,
        counter: true,
        indefinite: false
    },
    min: 0,
    _create: function () {
        var control = this.element,
            parentTheme = $.mobile.getInheritedTheme(control, "c"),
            outerTheme = this.options.outerTheme || parentTheme,
            innerTheme = this.options.indefinite ? "indefinite" : this.options.innerTheme || parentTheme,
            miniClass = this.options.mini ? " ui-tolito-progressbar-mini" : "",
            counter = this.options.counter;
        this.element.addClass(['ui-tolito-progressbar ', " ui-tolito-progressbar-outer-", outerTheme, ' ui-tolito-progressbar-corner-all', miniClass].join(""))
            .attr({
            role: "progressbar",
            "min-value": this.min,
            "max-value": this.options.max,
            "content-value": this._value()
        });
        if (counter) {
            this.labelContent = ($("<div></div>")
                .text(this._value())
                .addClass('ui-tolito-progressbar-label ui-tolito-progressbar-corner-all'))
                .appendTo(this.element);
        }
        this.valueContent = ($("<div></div>")
            .addClass(['ui-tolito-progressbar-bg ', " ui-tolito-progressbar-active-", innerTheme, ' ui-tolito-progressbar-corner-all'].join("")))
            .appendTo(this.element);
        if (!this.options.indefinite) {
            this._refreshValue();
            this.oldValue = this._value();
        }
    },
    _destroy: function () {
        this.element.removeClass()
            .removeAttr("role")
            .removeAttr("min-value")
            .removeAttr("max-value")
            .removeAttr("content-value");
        if ((typeof this.labelContent !== "undefined")) {
            this.labelContent.remove();
        }
        this.valueContent.remove();
    },
    value: function (newValue) {
        if (newValue === undefined) {
            return this._value();
        }
        this._setOption("value", newValue);
        return this;
    },
    _setOption: function (key, value) {
        this.options.value = value;
        if (key === "value") {
            this._refreshValue();
            if (this._value() === this.options.max) {
                this.element.trigger("complete");
            }
        }
    },
    _value: function () {
        var val = this.options.value;
        if (typeof val !== "number") {
            val = 0;
        }
        return Math.min(this.options.max, Math.max(this.min, val));
    },
    _percentage: function () {
        return 100 * this._value() / this.options.max;
    },
    _refreshValue: function () {
        var value = this.value();
        this.oldValue = value;
        this.valueContent.css("width", [this._percentage(), '%'].join(""));
        if ((typeof this.labelContent !== "undefined")) {
            this.labelContent.text([this._percentage(), '%'].join(""))
        }
        this.element.attr("content-value", value);
    }
});

TolitoConstructor = function (elementId) {
    if (elementId === undefined) {
        throw '[Error]: The tolito progress bar element id is undefined';
    }
    this._id = elementId;
    this._defaultOuterTheme = null;
    this._defaultInnerTheme = null;
    this._defaultMax = 100;
    this._defaultStartFrom = 0;
    this._defaultInterval = 100;
    this._isBuilt = false;
    this._mini = false;
    this._isRunning = false;
    this._indefinite = false;
    return this;
}

TolitoProgressBar = function (arg) {
    return new TolitoConstructor(arg);
}

var ERROR_MSG_TOLITO_BUILT = '[Error]: The tolito progress bar is already built.',  
    ERROR_MSG_TOLITO_RUNNING = '[Error]: The tolito progress bar is already running.',
    ERROR_MSG_TOLITO_STOPPED = '[Error]: The tolito progress bar is already stopped.',
    ERROR_MSG_TOLITO_INDEFINITE = '[Error]: The tolito progress bar is indefinite.';

TolitoConstructor.prototype = {
    logOptions: function () {
        ((typeof console === "undefined") ? {
            log: function () {}
        } : console)
            .log(["id: '", this.getId(), "' outerTheme: '", this.getOuterTheme(), "' innerTheme: '", this.getInnerTheme(), "' max: '", this.getMax(), "' mini: '", this.getMini(), "' startFrom: '", this.getStartFrom(), "' interval: '", this.getInterval(), "' showCounter: '", this.getShowCounter(), "'", "' indefinite: '", this.getIndefinite(), "'"].join(""));
        return this;
    },
    getId: function () {
        return this._id;
    },
    setOuterTheme: function (newTheme) {
        if (this._isBuilt) {
            throw ERROR_MSG_TOLITO_BUILT;
        } else {
            this._outerTheme = newTheme;
            return this;
        }
    },
    getOuterTheme: function () {
        return this._outerTheme || this._defaultOuterTheme;
    },
    setInnerTheme: function (newInnerTheme) {
        if (this._isBuilt) {
            throw ERROR_MSG_TOLITO_BUILT;
        } else {
            this._innerTheme = newInnerTheme;
            return this;
        }
    },
    getInnerTheme: function () {
        return this._innerTheme || this._defaultInnerTheme;
    },
    setStartFrom: function (newStartFrom) {
        if (this._isBuilt) {
            throw ERROR_MSG_TOLITO_BUILT;
        } else {
            this._startFrom = newStartFrom;
            return this;
        }
    },
    getStartFrom: function () {
        return this._startFrom || this._defaultStartFrom;
    },
    setMax: function (newMax) {
        if (this._isBuilt) {
            throw ERROR_MSG_TOLITO_BUILT;
        } else {
            this._max = newMax;
            return this;
        }
    },
    getMax: function () {
        return this._max || this._defaultMax;
    },
    isMini: function (newMini) {
        if (this._isBuilt) {
            throw ERROR_MSG_TOLITO_BUILT;
        } else {
            this._mini = newMini;
            return this;
        }
    },
    getMini: function () {
        return this._mini;
    },
    isIndefinite: function (newIndefinite) {
        if (this._isBuilt) {
            throw ERROR_MSG_TOLITO_BUILT;
        } else {
            this._indefinite = newIndefinite;
            return this;
        }
    },
    getIndefinite: function () {
        return this._indefinite;
    },
    showCounter: function (newShowCounter) {
        if (this._isBuilt) {
            throw ERROR_MSG_TOLITO_BUILT;
        } else {
            this._showCounter = newShowCounter;
            return this;
        }
    },
    getShowCounter: function () {
        return this._showCounter;
    },
    setInterval: function (newInterval) {
        if (this._isBuilt) {
            throw ERROR_MSG_TOLITO_BUILT;
        } else {
            this._interval = newInterval;
            return this;
        }
    },
    getInterval: function () {
        return this._interval || this._defaultInterval;
    },
    build: function () {
        if (this._isBuilt) {
            throw ERROR_MSG_TOLITO_BUILT;
        } else {
            $(['#', this.getId()].join(""))
                .progressbar({
                outerTheme: this.getOuterTheme(),
                innerTheme: this.getInnerTheme(),
                value: this.getStartFrom(),
                max: this.getMax(),
                mini: this.getMini(),
                indefinite: this.getIndefinite(),
                counter: this.getShowCounter()
            });
            this._isBuilt = true;
            return this;
        }

    },
    run: function () {
        if (this._isRunning) {
            throw ERROR_MSG_TOLITO_RUNNING;
        } else if (this._indefinite) {
            throw ERROR_MSG_TOLITO_INDEFINITE;
        } else {
            this.fillProgressBar = setInterval((function (inst) {
                return function () {
                    var thisValue = $(['#', inst.getId()].join(""))
                        .progressbar('option', 'value'),
                        counter = !isNaN(thisValue) ? (thisValue + 1) : 1;
                    if (counter > inst.getMax()) {
                        clearInterval(this.fillProgressBar);
                    } else {
                        $(['#', inst.getId()].join(""))
                            .progressbar({
                            value: counter
                        });
                    }
                }
            })(this), this.getInterval());
            this._isRunning = true;
            return this;
        }
    },
    stop: function () {
        if (!this._isRunning) {
            throw ERROR_MSG_TOLITO_STOPPED;
        } else {
            clearInterval(this.fillProgressBar);
            this._isRunning = false;
            return this;
        }
    },
    setValue: function (val) {
        if (this._indefinite) {
            throw ERROR_MSG_TOLITO_INDEFINITE;
        } else {
            $(['#', this.getId()].join(""))
                .progressbar({
	            value: val
	        });
            return this;
        }
    }
};


//constructor
var MyPhoneNumberPlugin = {
	getMyPhoneNumber: function(onSuccess, onError) {
		console.log("at getMyPhoneNumber");
		return PhoneGap.exec(onSuccess, onError, "MyPhoneNumberPlugin", "getMyPhoneNumber", []);
	}
}


// 2007-01-01 ???ڿ?????¥??ü?κ?ȯ
 
function getDateObjectFromDashStr(dateStr){ 
                  var dateinfo = dateStr.split("-"); 
                  return new Date(dateinfo[0] , dateinfo[1] -1 , dateinfo[2]); 
};
 
 
 
//Date ??ü?? 2007-01-01 ??Ĺ??ڿ??κ?ȯ 
function getDateStrFromDateObject(dateObject){ 
                  var str = null; 
                  var month = dateObject.getMonth() +1; 
                  var day = dateObject.getDate();
 
                  if(month <  10) 
                      month = '0' + month; 
                  if(day < 10)
                	  day = '0' + day;
                  str = dateObject.getFullYear() + '-' + month + '-' + day; 
                  //str =  month + '-' + day + '-' + dateObject.getYear();
                  //str =  month + '-' + day;
                 // alert(str);
                  return str; 
};

//Date ??ü?? 2007-01-01 ??Ĺ??ڿ??κ?ȯ 
function getTimeStrFromDateObject(dateObject){ 
                  var str = null; 
                  var hours = dateObject.getHours(); 
                  var minutes = dateObject.getMinutes();
                  var sec = dateObject.getSeconds();
 
                  if(hours <  10) 
                	  hours = '0' + hours; 
                  if(minutes < 10)
                	  minutes = '0' + minutes;
                  if(sec < 10)
                	  sec = '0' + sec;
                  
                  //str = hours + ':' + minutes + ':' + sec;
                  
                  str = hours + ':' + minutes;
                  return str; 
};


//?? ??, ??? Ư?? ?Ʈ?ѿ? ǥ??Ѵ?
function ShowDate(years, months, days, ElementID)
{
    months = ""+months;
    months = (months.length == 1)? "0"+ months : months
    days = ""+days;
    days = (days.length == 1)? "0"+ days : days
    document.getElementById(ElementID).innerText = years +""+ months +""+ days;
};
 
 
 
//?γ?¥???ǱⰣ???edate - sdate  (sdate ????date??ũ?? , ?????1 , ??????)
 
function compareIsPastDay(sdate , edate){ 
                  if(edate - sdate < 0)
                        return -1; 
                  else if(edate - sdate == 0)
                        return 0 ;
                  else
                	   return 1;
 
}    ;            
 
// ??¥???ǰ??date ??ü??? 
function getDateObjectOfPlusDay(targetDate  , plusDayInt){ 
                  var newDate = new Date(); 
                  var processTime = targetDate.getTime() - (parseInt(plusDayInt) * 24 * 60 * 60 * 1000);
                  newDate.setTime(processTime);   
                  return newDate;
 };
 
 
 
 
 
//??¥?˻???nvalidator 
function invalidateSearchDay(sdateStr , edateStr , limitDay){
                  var sdate = getDateObjectFromDashStr(sdateStr); 
                  var edate = getDateObjectFromDashStr(edateStr); 
                  var checkDayResult = compareIsPastDay(sdate , edate); 
                  var before7Day = getDateObjectOfPlusDay(edate , limitDay); 
                  var checkResult = compareIsPastDay(before7Day , sdate);
                  if(checkDayResult  < 0){ 
                          alert('???? ?????̾???ϴ?');
                          return false;
                  }
 
                  if(checkResult < 0){
                         alert(limitDay + ' ??̳??ΰ˻?ϼ???');
                         return false;
                  } 
                  return true;
};

function KeyCheckValue()
{
    if(event.keyCode < 47 || event.keyCode > 58)
    { return false; }
};



// Global variable that will tell us whether PhoneGap is ready
var isPhoneGapReady = false;
 
// Default all phone types to false
var isAndroid = false;
var isBlackberry = false;
var isIphone = false;
var isWindows = false;

// Store the device's uuid
var deviceUUID;
 
// Store the current network status
var isConnected = false;
var isHighSpeed;
var internetInterval;
var currentUrl;
 
function PhoneGap_init(url) {
    if (typeof url != 'string') {
        currentUrl = location.href;
    } else {
        currentUrl = url;
    }
    if (isPhoneGapReady) {
        onDeviceReady();
    } else {
        // Add an event listener for deviceready
        document.addEventListener("deviceready", onDeviceReady, false);
    }
};
 
function onDeviceReady() {
	
 	
    // set to true
    isPhoneGapReady = true;
    deviceUUID = device.uuid;
    
    BackButton();

  // detect the device's platform
    deviceDetection();

  // detect for network access
    networkDetection();

  // execute any events at start up
    executeEvents();

  // execute a callback function
 //   executeCallback();
};

function BackButton(){
	document.addEventListener("backbutton", onBackButton, true);
};
 
function executeEvents() {

    if (isPhoneGapReady) {
        // attach events for online and offline detection
        document.addEventListener("online", onOnline, false);
        document.addEventListener("offline", onOffline, false);

      // set a timer to check the network status
        internetInterval = window.setInterval(function() {
            if (navigator.network.connection.type != Connection.NONE) {
                onOnline();
            } else {
                onOffline();
            }
        }, 5000);
    }
};
 
/*function executeCallback() {
    if (isPhoneGapReady) {
        // get the name of the current html page
        var pages = currentUrl.split("/");
        var currentPage = pages[pages.length - 1].slice(0,
               pages[pages.length - 1].indexOf(".html"));

       // capitalize the first letter and execute the function
       currentPage = currentPage.charAt(0).toUpperCase()
                + currentPage.slice(1);

       if (typeof window['on' + currentPage + 'Load'] == 'function') {
           window['on' + currentPage + 'Load']();
       }
   }
};*/


function deviceDetection() {
   if (isPhoneGapReady) {
       switch (device.platform) {
       case "Android":
           isAndroid = true;
           break;
       case "Blackberry":
           isBlackberry = true;
           break;
       case "iPhone":
           isIphone = true;
           break;
       case "WinCE":
           isWindows = true;
           break;
        }
    }
};
 
function networkDetection() {
    if (isPhoneGapReady) {
        // as long as the connection type is not none,
        // the device should have Internet access
        if (navigator.network.connection.type != Connection.NONE) {
            isConnected = true;
        }


        // determine if this connection is high speed or not
        switch (navigator.network.connection.type) {
        case Connection.UNKNOWN:
        case Connection.CELL_2G:
            isHighSpeed = false;
            break;
        default:
            isHighSpeed = true;
            break;
        }
    }
};
 
function onOnline() {
    isConnected = true;
};
 
function onOffline() {
    isConnected = false;
};
 
 
function getMyPhoneNumber() {
		onSuccess = function(result) {
			return result.phoneNumber;
		}
		onError = function(err) {
			return "ERR1: " + err;
		}
		MyPhoneNumberPlugin.getMyPhoneNumber(onSuccess, onError);
};

//alert ??????
function fn_alertCallback(){};

/*??α׷? ???? */
function fn_Exit()
{ 	
	navigator.notification.confirm("??α׷??? ????Ͻðڽ??ϱ?"
			  , fn_confirmCallback_Exit
			  , "????"
			  , "?ƴϿ?,??");		    
};

function onBackButton(){
	onBackKeyDown();
	navigator.notification.confirm("??α׷??? ????Ͻðڽ??ϱ?"
			  , fn_confirmCallback_Exit
			  , "????"
			  , "?ƴϿ?,??");
};

function fn_confirmCallback_Exit(button){
		if(button == 2)
			navigator.app.exitApp();
} ;





