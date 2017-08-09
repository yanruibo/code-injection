
var version="1.0";
var sql;
var action="showPackages";
var gpackages;
var addscroll,detailScroll;
var start=0;
var connected=0;
var next;


//Connection
function checkConnection(){
	var networkState = navigator.network.connection.type;
	var a = (networkState != Connection.NONE);
	if(a){connected=1;}
	else{connected=0;}
}


// Add View
function showAddView(){
	hideBottomBar();
	$("#AddView").animate({
		    left: '0'
	}, 300, function() {
		    // Animation complete.
		    		    
				addscroll = new iScroll('addScroll',{
				    onBeforeScrollStart: function (e) {
				        var target = e.target;
				        while (target.nodeType != 1) target = target.parentNode;
				
				        if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
				        e.preventDefault();
				    }
				});		    
	});
}

function hideAddView(){
	showBottomBar();
	$("#AddView").animate({
		    left: '100%'
	}, 300, function() {
		    // Animation complete.
		    addscroll.destroy();
		    addscroll = null;
	});
}

function addPackage(){

	console.log("Add Package");
	
	var name=$('#nameInput').val();
	var code=$('#codeInput').val();
	var company=$('#selectCompaniesValue').val();	
	var unix = Math.round(+new Date()/1000);

	if(name!="" && code!="" && company!=""){
		sql="INSERT INTO Event (timeStamp,name,code,company) VALUES('"+unix+"','"+name+"','"+code+"','"+company+"')";
		
		console.log(sql);
		
		action="insertPackage";
		db.transaction(queryDB, errorCB);
	
		hideAddView();
	}
	else{
	    alert("Musíte vyplniť všetky polia !");	
	}
	
}


// Select functions
function showCompanies(ids){

	window.KeyBoard.hideKeyBoard();
	
	$("#UIOverlay").show();
	$("#selectCompanies").show();	
	$("#UIOverlay").click(
		function(){ hideCompanies(); }
	);
	
}
function hideCompanies(){
	$("#UIOverlay").hide();
	$("#selectCompanies").hide();
	$("#UIOverlay").unbind("click");
}
function pickCompany(ids,company){
	hideCompanies();
	
	$('#option'+$('#selectCompaniesValue').val()).removeClass('selectOptionSelected');
	$('#option'+ids).addClass('selectOptionSelected');
	
	$('#companyInput').val(company);
	$('#selectCompaniesValue').val(ids);

	
}



// Bottom Bar
function hideBottomBar(){
	$("#bottomBar").animate({
		    bottom: '-50px'
	}, 300, function() {
		    // Animation complete.
//			$("#bottomBar").hide();	    
	});
}

function showBottomBar(){
//	$("#bottomBar").show();	    
	$("#bottomBar").animate({
		    bottom: '0px'
	}, 300, function() {
		    // Animation complete.
	});
}

function reloadData(){
	

		sql="SELECT * from Event";
		action="showPackages";
    db.transaction(queryDB, errorCB, successCB);
    
    last_update=window.localStorage.getItem("last_update");
    if(last_update!=null){last_update="posledná aktualizácia "+last_update;}
    else{last_update="-";}
    
    $("#updateText").html(last_update);

}	

//*******************************
//         Swipe Delete
//*******************************

function	initSwipeDelete() {



	console.log("init swipe");
	// attach the plugin to an element
	$('#swipeMe li').swipeDelete({
		btnTheme: 'e',
		btnLabel: 'Vymazať',
		btnClass: 'aSwipeButton'
	});
	
}

function removePackage(ids){
	$("#package_"+ids).animate({
		    height: '0px'
	}, 300, function() {
		    // Animation complete.
		   deletePackage(ids);
		  $("#package_"+ids).remove();
	});
}

function deletePackage(ids){

    	tpackage=findPackageObject(ids);
    	
    	console.log(ids+"-"+tpackage.code);
    
			sql="DELETE from Event WHERE code='"+tpackage.code+"'";
			action="deletePackage";
	    db.transaction(queryDB, errorCB, successCB);
	    
	    console.log(sql);
}

//*******************************
//          Open Package
//*******************************
function openPackage(ids){


//  tpackage=gpackages.rows.item(ids);
	
	//Init data
	result="";
	

	result+="<ul>";

	tpackage=findPackageObject(ids);

	$("#detailTitle").html(tpackage.name);

	//Title
	result+="<li><h2>"+tpackage.name+"</h2></li>";

	//Code
	result+="<li><h2>"+tpackage.code+"</h2></li>";
	
	//Items
	result+=showDetailItems(ids);

	result+="</ul>";

	
	//Show result
	$("#detailItems").html(result);
	
	detailScroll = new iScroll('detailItems');
	
	showDetailView();
	
}

// Add View
function showDetailView(){
	hideBottomBar();
	$("#DetailView").animate({
		    left: '0'
	}, 300, function() {
		    // Animation complete.
	});
}

function hideDetailView(){
	showBottomBar();
	$("#DetailView").animate({
		    left: '100%'
	}, 300, function() {
		    // Animation complete.
		    detailScroll.destroy();
		    detailScroll = null;
	});
}

function showDetailItems(ids){


	tpackage=findPackageObject(ids);
	console.log(tpackage.all_data);
	events=tpackage.all_data;
	
	
	result="";
	events=events.split(";");
	for(i in events){
		event=events[i].split("|");
		
		//Create Event
		result+="<li class=\"package"+tpackage.company+" packageDetail\">";
		result+="<div>"+event[0]+"</div>";
		result+="<div><strong>"+event[1]+"</strong></div>";
		result+="</li>";
		
		//Add Arrow
		if(i<events.length-1){
			result+="<li class=\"packageDetailArrow\">&nbsp;</li>";
		}
		
	}
	
	result+="<li><br><br><br><br></li>";

	return result;	
}

//*******************************
//         Refresh Data
//*******************************
var packeti=0;
function refreshData(){

	checkConnection();

	packeti=0;
	var len = gpackages.rows.length;
	if(len>0 && connected==1){
		showActivity();
	
		getPackage();
	}
	
}
function getPackage(){
	
	tpackage=findPackageObject(packeti);
	
	if(typeof(tpackage.code)!=null){
	//	var link="http://192.168.11.5/igeek.eu/_connector/eu.igeek.zasielky.php?id="+tpackage.code+"&company="+tpackage.company+"&os=android&version="+version;
		var link="http://www.igeek.eu/_connector/eu.igeek.zasielky.php?id="+tpackage.code+"&company="+tpackage.company+"&os=android&version="+version;
		
		console.log(link);
		
		$.get(link,
	   function(data){
	   		if(data.last){
		   		last=data.last.split("|");
		   		last_date=last[0];
		   		last_text=last[1];
		   		events=data.events;
		   		action="refreshPackage";
		   		sql="UPDATE Event SET last_date='"+last_date+"',last_text='"+last_text+"',all_data='"+events+"'  WHERE code='"+tpackage.code+"'";
		
		   		console.log(sql);
		
			    db.transaction(queryDB, errorCB, successCB);	    
		    }
		    
	   }, "json");
	
	}
}



//*******************************
//           Database
//*******************************

function populateDB(tx) {
//     tx.executeSql('DROP TABLE IF EXISTS DEMO');
		 action="createDatabase";
     tx.executeSql('CREATE TABLE IF NOT EXISTS Event (all_data, code,company,last_date,last_text,name,timeStamp,total_days)', [], querySuccess, errorCB);
}

function errorCB(err) {
//    alert("Error processing SQL: "+err.code);
}

function successCB() {
	 console.log("Transaction success");

  //db.transaction(queryDB, errorCB);

}

// Query the database
//
function queryDB(tx) {
    tx.executeSql(sql, [], querySuccess, errorCB);
}

// Query the success callback
//
function querySuccess(tx, results) {
	if(action=="createDatabase"){
//		console.log("Create Database OK");	
		reloadData();	
	}
	if(action=="insertPackage"){
//		console.log("Insert OK");			
    reloadData();
	}
	
	if(action=="showPackages"){
		gpackages=new Object;
		gpackages=results;
    var len = gpackages.rows.length;

//    console.log("DEMO table: " + len + " rows found.");
    var result="";
    for (var i=0; i<len; i++){
    		
//        console.log("Row = " + i + " Name = " + results.rows.item(i).name + " Code =  " + results.rows.item(i).code + " Company =  " + results.rows.item(i).company);
		//Default Values
    company=gpackages.rows.item(i).company;
    if(company==null){company="SP";}
    last_date=gpackages.rows.item(i).last_date;
    if(last_date==null){last_date="";}
    last_text=gpackages.rows.item(i).last_text;
    if(last_text==null){last_text="";}
        
        
				result+="<li data-swipeurl=\""+i+"\" id=\"package_"+i+"\"><div class=\"package package"+company+"\" onclick=\"javascript:openPackage('"+i+"')\"><div class=\"packageTitle\">"+gpackages.rows.item(i).name+"</div><div class=\"packageInfo\">"+last_date+"<br>"+last_text+"</div></div></li>";

    }
    $("#swipeMe").html(result);
    initSwipeDelete();
    
    if(start!=1){
			start=1;
			refreshData();
		}

    
	}
	
	if(action=="deletePackage"){
		reloadData();
	}
	
	if(action=="refreshPackage"){
		
			var len = gpackages.rows.length;
			if(packeti<len-1){
				packeti++;
				getPackage();
			}
			else{
				hideActivity();
				reloadData();
				
				//Date
				var fullDate=new Date();
				month=fullDate.getMonth()+1;
				currentDate=fullDate.getDate()+"."+month+"."+fullDate.getFullYear()+" "+fullDate.getHours()+":"+fullDate.getMinutes();
				window.localStorage.setItem("last_update", currentDate);
				$("#updateText").html("posledná aktualizácia "+window.localStorage.getItem("last_update"));
				
			}

	}

}

function findPackageObject(ids){
	
	var tpackage;
	
	console.log(gpackages);
	
	find=0;
	
	if(typeof(gpackages)!=undefined){
		var len = gpackages.rows.length;
	  for (var i=0; i<len; i++){  
			if(ids==i){
				tpackage=gpackages.rows.item(i);
				find=1;
				break;		
			} 
		} 			
	}
	
	if(find!=1){
		tpackage=new Object;
		tpackage.all_data="|Nie sú k dispozícii žiadne údaje o zásielke.";
		
//		console.log("not find");
		
	}


	return tpackage;
}

function showActivity(){
	$("#bottomActionWindow").animate({
		    bottom: '0px'
	}, 300, function() {
		    // Animation complete.
//			$("#bottomBar").hide();	    
	});
}
function hideActivity(){
	$("#bottomActionWindow").animate({
		    bottom: '-50px'
	}, 300, function() {
		    // Animation complete.
//			$("#bottomBar").hide();	    
	});
}










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
        







	
	    // Wait for Cordova to load
	    document.addEventListener("deviceready", onDeviceReady, false);
	    
	    document.addEventListener("resume", refreshData, false);
	    
	    //Cordvoa is Ready
	    var db;
	    function onDeviceReady() {
	    	checkConnection();
	    
       	db = window.openDatabase("zasielky", "1.0", "Zasielky DB", 1000000);
        db.transaction(populateDB, errorCB, successCB);
        
      }
            
			var myScroll;
			function loaded() {
				myScroll = new iScroll('wrapper');
				initSwipeDelete();
			}
						
			document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
			
			document.addEventListener('DOMContentLoaded', loaded, false);
            
            

	    

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

