



















































































































var SiteID = -1;
//var URL = "http://landmark.dominionsoftware.co.nz/";
var URL = "http://go.iagri.com/";
//var URL = "http://localhost/LandMark/";
var ActivityTypeID = 0;
var Season = 0;
function GetUniversalTimeString(){
    var now = new Date(); 
    //alert(now.toString());
    //alert(now.getDay());
    var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
    //alert(now_utc.toString());
    //alert(now.getUTCDate());
    //alert(now_utc.getFullYear() + '-' + pad(now_utc.getMonth() + 1,2,'0') + '-' + pad(now_utc.getDate(),2,'0')  + ' ' + pad(now_utc.getHours(),2,'0')  + ':' + pad(now_utc.getMinutes(),2,'0')  + ':' + pad(now_utc.getSeconds(),2,'0'));
    return now_utc.getFullYear() + '-' + pad(now_utc.getMonth() + 1,2,'0') + '-' + pad(now_utc.getDate(),2,'0')  + ' ' + pad(now_utc.getHours(),2,'0')  + ':' + pad(now_utc.getMinutes(),2,'0')  + ':' + pad(now_utc.getSeconds(),2,'0');
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

var DateSynced;
var DownloadedEnterprises;
var DownloadedSeasons;
var DownloadedStock;
var DownloadedStockActivities;
var DownloadedPaddocks;

function login(UserName, Password) {
	$.ajax({
		type: "POST",
		contentType: 'application/json',
		dataType: 'json',
		data: '{UserName: "' + UserName + '",Password: "' + Password + '"}',
		url:  URL + "Mobile.asmx/Login",
		timeout: 20000,
		async: false,
		error: function (req, err, ex) {
			alert("An error occured.  Please try again." + err + ex);
			SiteID = -1;
		},
		success: function (data) {
			if (data) {
				SiteID = data.d;
			}
		}    
	});
	return SiteID;
}

function syncData() { 
	setLastSyncDate();
	db.transaction(GetActivityRecords, errorCB, successCB);
}
function GetActivityRecords(tx) {
	tx.executeSql('SELECT * FROM StockActivities where Modified_DT > "' + DateSynced + '" AND SiteID = ' + SiteID , [], GetActivityRecordSuccess, errorCB);
}
function GetActivityRecordSuccess(tx, result) {
	//Get List of Activity records that have changed since the last sync.
	var arr = [];
	$.each(result.rows, function(index) {
		var row = result.rows.item(index);
		var x = new ActivityRecord();
		x.id = row['id'];
		x.SiteID = row['SiteID'];
		x.ActivityTypeID = row['ActivityTypeID'];
		x.GeneratedStatement = row['GeneratedStatement'].replace(/\'/g, "''").replace(/\"/g, '""');
		x.EnterpriseCode = row['EnterpriseCode'];
		x.DT = row['DT'];
		x.Comments = row['Comments'].replace(/\'/g, "''").replace(/\"/g, '""');
		x.AnimalIDList = row['AnimalIDList'];
		x.Season = row['Season'];
		x.TotalCost = row['TotalCost'];
		x.Field1 = row['Field1'];
		x.Field2 = row['Field2'];
		x.Field3 = row['Field3'];
		x.Field4 = row['Field4'];
		x.Field5 = row['Field5'];
		x.Field6 = row['Field6'];
		x.Field7 = row['Field7'];
		x.Field8 = row['Field8'];
		x.Field9 = row['Field9'];
		x.Field10 = row['Field10'];
		x.Field11 = row['Field11'];
		x.Field12 = row['Field12'];
		x.Field13 = row['Field13'];
		x.Active = row['Active'];
		x.Modified_DT = row['Modified_DT'];
		arr.push(x);
	});
	$.ajax({
		type: "POST",
		contentType: 'application/json',
		dataType: 'json',
		data: '{SiteID: ' + SiteID + ', sync:"' + DateSynced + '", ActivityRecords: ' + JSON.stringify(arr) + '}',
		url:  URL + "Mobile.asmx/GetData",
		timeout: 20000,
		error: function (req, err, ex) {
			//alert("An error occured.  Please try again." + err + ex);
		},
		success: function (data) {
			if (data) {
				DownloadedEnterprises = data.d.Enterprises;
				DownloadedSeasons = data.d.Seasons;
				DownloadedStock = data.d.Stock;
				DownloadedStockActivities = data.d.ActivityRecords;
                DownloadedPaddocks = data.d.Paddocks;
				db.transaction(PopulateDownloadedEnterprises, errorCB, successCB);
				db.transaction(PopulateDownloadedSeasons, errorCB, successCB);
				db.transaction(PopulateDownloadedStock, errorCB, successCB);
				db.transaction(PopulateDownloadedActivities, errorCB, successCB);
                db.transaction(PopulateDownloadedPaddocks, errorCB, successCB);
				//set last sync date
				db.transaction(updateLastSyncDate, errorCB, successCB)
			}
		}
	});
}
function PopulateDownloadedActivities(tx) {
	$(DownloadedStockActivities).each(function () {
        var sql = "INSERT OR REPLACE INTO StockActivities(id, SiteID, ActivityTypeID, EnterpriseCode, DT, GeneratedStatement, Comments, Season, TotalCost, Field1, Field2,Field3,Field4,Field5,Field6,Field7,Field8,Field9,Field10,Field11,Field12,Field13, AnimalIDList, Active, Modified_DT) VALUES ('" + this.id + "'," + this.SiteID + ", " + this.ActivityTypeID + ", " + this.EnterpriseCode + ",'" + this.DT + "', '" + this.GeneratedStatement + "', '" + this.Comments + "', " + this.Season + ", '" + this.TotalCost + "', '" + (this.Field1==null ? '' : this.Field1) + "', '" + (this.Field2==null ? '' : this.Field2) + "' , '" + (this.Field3==null ? '' : this.Field3) + "' , '" + (this.Field4==null ? '' : this.Field4) + "' , '" + (this.Field5==null ? '' : this.Field5) + "' , '" + (this.Field6==null ? '' : this.Field6) + "' , '" + (this.Field7==null ? '' : this.Field7) + "' , '" + (this.Field8==null ? '' : this.Field8) + "' , '" + (this.Field9==null ? '' : this.Field9) + "' , '" + (this.Field10==null ? '' : this.Field10) + "' , '" + (this.Field11==null ? '' : this.Field11) + "' , '" + (this.Field12==null ? '' : this.Field12) + "' , '" + (this.Field13==null ? '' : this.Field13) + "' ,'" + this.AnimalIDList + "'," + this.Active + ",'" + this.Modified_DT + "')"
		tx.executeSql(sql);
	});
}
function PopulateDownloadedPaddocks(tx) {
	tx.executeSql('Delete from Paddocks');
	$(DownloadedPaddocks).each(function () {
		tx.executeSql('INSERT INTO Paddocks(ID, PaddockName, Size, Season, SiteID) values (' + this.ID + ', "' + this.PaddockName + '","' + this.Size + '", ' + this.Season + ', ' + this.SiteID + ')');
	});
}

function PopulateDownloadedEnterprises(tx) {
	tx.executeSql('Delete from Enterprises');
	$(DownloadedEnterprises).each(function () {
		tx.executeSql("INSERT INTO Enterprises(EnterpriseID, EnterpriseName, Active) values (" + this.EnterpriseID + ", '" + this.EnterpriseName.replace(/\'/g, "''").replace(/\"/g, '""') + "', " + this.Active + ")");
	});
}
function PopulateDownloadedSeasons(tx) {
	tx.executeSql('Delete from Seasons');
	$(DownloadedSeasons).each(function () {
		tx.executeSql('INSERT INTO Seasons(ID) values (' + this.ID + ')');
	});
}
function PopulateDownloadedStock(tx) {
	tx.executeSql('Delete from Stock');
	$(DownloadedStock).each(function () {
		tx.executeSql('INSERT INTO Stock(ID, Name, Season) values (' + this.ID + ', "' + this.Name + '",' + this.Season + ')');
	});
}
function updateLastSyncDate(tx) {
	tx.executeSql('UPDATE Sync SET LastSyncDate = "' + GetUniversalTimeString() + '" WHERE SiteID = ' + SiteID);
	$.mobile.loading('hide');
}

function ActivityRecord () {
	this.id = '';
	this.SiteID = 0;
	this.ActivityTypeID = 0;
	this.GeneratedStatement = '';
	this.EnterpriseCode = 0;
	this.DT = '';
	this.Comments = '';
	this.AnimalIDList = '';
	this.Season = 0;
	this.TotalCost = '';
	this.Field1 = '';
	this.Field2 = '';
	this.Field3 = '';
	this.Field4 = '';
	this.Field5 = '';
	this.Field6 = '';
	this.Field7 = '';
	this.Field8 = '';
	this.Field9 = '';
	this.Field10 = '';
	this.Field11 = '';
	this.Field12 = '';
	this.Field13 = '';
	this.Active = 0;
	this.Modified_DT = '';
}

/*
ADDING Activities

STEP 1. New HTML page eg: CultivationAction.html and add controls
STEP 2 Add typeID
STEP 3. List of current and Add New button on index.html
STEP 4 Correct links for current items
STEP 5. Navigation for New item
STEP 6. Navigation for current item
STEP 7. Add item to Add New Type list
STEP 8. Set Generated Statement
STEP 9. add Save
*/

$(document).ready(function () {
	//GetUniversalTimeString();
	//Number only fields
	jQuery('.numbersOnly').keyup(function () {
		this.value = this.value.replace(/[^0-9\.]/g, '');
	});
	//Currencies
	jQuery('.currency').keyup(function () {
		this.value = this.value.replace(/[^0-9\.]/g, '');
	});
	//jQuery('.currency').blur(function () { 
	//   this.value = formatCurrency(this.value);
	//});
});

$(document).bind("pagebeforechange", function (e, data) {
	if (typeof data.toPage === "string") {
		//alert(data.toPage);
		var u, $page, pos, posAT, length, page;
		u = $.mobile.path.parseUrl(data.toPage), re = /#Welcome/;
		if (u.hash.search(re) !== -1) {
			showLoading('Loading...');
			$page = $('#Welcome');
			if (SiteID == -1) { //SiteID not found in db - login
				var divLogin = $('#login');
				var intSiteID = login(divLogin.find("#txtUser").val(), divLogin.find("#txtPassword").val());
				if (intSiteID == -1) {
					alert("Login Failed! Please try again.");
				}
				else {
					SiteID = intSiteID;
					//db.transaction(populateDB, errorCB, populateCB);
					syncData();
					setLastSyncDate();
					db.transaction(populateUserSite, errorCB, successCB);
					$.mobile.changePage($page, data.options);
				}
			}
			else {
				navigator.splashscreen.hide();
				$.mobile.changePage($page, data.options);
				$.mobile.loading('hide');
			}
		
			e.preventDefault();
		}
		u = $.mobile.path.parseUrl(data.toPage), re = /#logout/;
		if (u.hash.search(re) !== -1) {
			$page = $('#login');
			db.transaction(function(tx) {
				tx.executeSql("DELETE FROM UserSite");
				tx.executeSql("DELETE FROM Sync");
			}, errorCB, successCB);
			SiteID = -1;
			$.mobile.changePage($page, data.options);
			e.preventDefault();
		}
		u = $.mobile.path.parseUrl(data.toPage), re = /#refresh/;
		if (u.hash.search(re) !== -1) {
			showLoading('Syncing with Server.');
			syncData();
			e.preventDefault();
			$('#btnSync').removeClass("ui-btn-active");
		}
		u = $.mobile.path.parseUrl(data.toPage), re = /^#saveindividualweigh/;
		if (u.hash.search(re) !== -1) {
			$page = $('#save');
			$.mobile.changePage($page, data.options);
			e.preventDefault();
		}
		u = $.mobile.path.parseUrl(data.toPage), re = /^#StockActivities/;
		if (u.hash.search(re) !== -1) {
			$page = $('#StockActivities');
			$.mobile.changePage($page, data.options);
			e.preventDefault();
			db.transaction(populateStockActivities, errorCB, successCB);
		}
		u = $.mobile.path.parseUrl(data.toPage), re = /^#PaddockActivities/;
		if (u.hash.search(re) !== -1) {
			$page = $('#PaddockActivities');
			$.mobile.changePage($page, data.options);
			e.preventDefault();
			db.transaction(populatePaddockActivities, errorCB, successCB);
		}
		u = $.mobile.path.parseUrl(data.toPage), re = /^#SeasonList/;
		if (u.hash.search(re) !== -1) {
			$page = $('#SeasonList');
			$.mobile.changePage($page, data.options);
			e.preventDefault();
			pos = data.toPage.toString().indexOf("AT")
			if (pos != -1) {
				ActivityTypeID = data.toPage.toString().substr(pos + 3, length);
			}
			db.transaction(populateSeasonListSeasons, errorCB, successCB);
		}
		//STEP 6.
		if ((data.toPage.toString().indexOf(".html#") != -1)) {
			if (data.toPage.toString().indexOf("?") > -1) {
				pos = data.toPage.toString().indexOf("ID")
				page = data.toPage.toString().substring(data.toPage.toString().indexOf("#") + 1, data.toPage.toString().indexOf("?"));
				switch (page.toLowerCase()) {
					case "weighing":
					case "dipping":
					case "drenching":
                    case "dockingmarking":
                    case "pregnancyscan":
                    case "stockmovments":
						$.mobile.changePage("./ActivitiesStock/" + page + ".html#" + page, data.options);
						populateStockActivityStart(data.toPage.toString().substr(pos + 3, 36));
						break;
					case "cultivationaction":
					case "cropgrowth":
					case "feedgrowth":
					case "lime":
					case "soiltest":
					case "sowing":
						$.mobile.changePage("./ActivitiesPaddock/" + page + ".html#" + page, data.options);
						populatePaddockActivityStart(data.toPage.toString().substr(pos + 3, 36));
				}
				e.preventDefault();
			}
		}
		//end STEP 6
		//STEP 5.
		if (data.toPage.toString().indexOf("html?AT") != -1) {
			if (data.toPage.toString().indexOf("?") > -1) {
				pos = data.toPage.toString().indexOf("AT")
				page = data.toPage.toString().substring(data.toPage.toString().lastIndexOf("/") + 1, data.toPage.toString().indexOf("?"));
				switch (page.toLowerCase()) {
					case "weighing.html":
					case "dipping.html":
					case "drenching.html":
                    case "dockingmarking.html":
                    case "pregnancyscan.html":
                    case "stockmovments.html":
						length = data.toPage.toString().length - (pos + 3)
						$.mobile.changePage("./ActivitiesStock/" + page, data.options);
						ActivityTypeID = data.toPage.toString().substr(pos + 3, length);
						populateStockActivityStart(-1);
						break;
					case "cultivationaction.html":
					case "cropgrowth.html":
					case "feedgrowth.html":
					case "lime.html":
					case "soiltest.html":
					case "sowing.html":
						length = data.toPage.toString().length - (pos + 3)
						$.mobile.changePage("./ActivitiesPaddock/" + page, data.options);
						ActivityTypeID = data.toPage.toString().substr(pos + 3, length);
						populatePaddockActivityStart(-1);
				}
				e.preventDefault();
			}
		}
		//end STEP 5
		//STEP 9. just make sure your save button comes here, otherwise leave it TOM!
		u = $.mobile.path.parseUrl(data.toPage), re = /^#savestock/;
		if (u.hash.search(re) !== -1) {
			//var $page = $('#save');
			// $.mobile.changePage( $page, data.options );
			SaveWeighData();
			e.preventDefault();
		}
		u = $.mobile.path.parseUrl(data.toPage), re = /^#savepaddock/;
		if (u.hash.search(re) !== -1) {
			//var $page = $('#save');
			// $.mobile.changePage( $page, data.options );
			SavePaddockData();
			e.preventDefault();
		}
		//end STEP 9
		u = $.mobile.path.parseUrl(data.toPage), re = /^#SelectStockActivities/;
		if (u.hash.search(re) !== -1) {
			pos = data.toPage.toString().indexOf("ID")
			if (pos != -1) {
				$.mobile.changePage("#SelectStockActivities", data.options);
				Season = data.toPage.toString().substr(pos + 3, 4);
				//alert(Season);
				e.preventDefault();
			}
		}
		u = $.mobile.path.parseUrl(data.toPage), re = /^#SelectPaddockActivities/;
		if (u.hash.search(re) !== -1) {
			pos = data.toPage.toString().indexOf("ID")
			if (pos != -1) {
				$.mobile.changePage("#SelectPaddockActivities", data.options);
				Season = data.toPage.toString().substr(pos + 3, 4);
				//alert(Season);
				e.preventDefault();
			}
		}
		//$.mobile.loading('hide');
	}
});

$(document).bind("pagebeforechange", function (e, data) {
	if (typeof data.toPage === "string") {
		if ((data.toPage.toString().indexOf("Weighing.html?AT") != -1)) {
			populateStockActivityStart(ActivityID);
		}
	}
});

function formatCurrency(num) {
	num = num.toString().replace(/\$|\,/g, '');
	if (isNaN(num))
		num = "0";
	sign = (num == (num = Math.abs(num)));
	num = Math.floor(num * 100 + 0.50000000001);
	cents = num % 100;
	num = Math.floor(num / 100).toString();
	if (cents < 10)
		cents = "0" + cents;
	for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
		num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
	return (((sign) ? '' : '-') + '$' + num + '.' + cents);
}

function populateUserSite(tx) {
	//Populates Stock Activities Page with StockActivities
	var divLogin = $('#login');
	tx.executeSql("INSERT INTO UserSite (SiteID,UserName,Password) VALUES (" + SiteID + ",'" + divLogin.find("#txtUser").val() + "','" + divLogin.find("#txtPassword").val() + "')");
}

function populateSeasonListSeasons(tx) {
	//Populates Stock Activities Page with StockActivities
	tx.executeSql('SELECT * FROM Seasons order by ID DESC' , [], populateSeasonListSeasonsSuccess, errorCB);
}
function populateSeasonListSeasonsSuccess(tx, result) {
	$('#SeasonListSeasons').empty();
	$.each(result.rows, function(index) {
		var row = result.rows.item(index);
		switch (ActivityTypeID) {
			//STEP 7.
			case "4": //soil test
			case "6": //cultivation
			case "8": //Lime
			case "9": //Sowing
			case "10": //feed growth
			case "51": //crop growth
				$('#SeasonListSeasons').append('<li data-theme="c"><a href="#SelectPaddockActivities?ID=' + row['ID'] + '" data-transition="slide"><b>' + row['ID'] + '</a></li>');
				break;
			case "14": //Dipping
            case "13": //Drenching
            case "19": //DockingMarking
			case "34": //stock
            case "47": //Pregnancy Scan
            case "12":
				$('#SeasonListSeasons').append('<li data-theme="c"><a href="#SelectStockActivities?ID=' + row['ID'] + '" data-transition="slide"><b>' + row['ID'] + '</a></li>');
				break;
			default:
				break;
		}
	});
	$('#SeasonListSeasons').listview('refresh');
}
// JavaScript Document
// Wait for PhoneGap to load
document.addEventListener("deviceready", onDeviceReady, false);

$(document).bind('mobileinit', function() {
	$.mobile.loader.prototype.options.text = "loading";
	$.mobile.loader.prototype.options.textVisible = false;
	$.mobile.loader.prototype.options.theme = "a";
	$.mobile.loader.prototype.options.html = "";
	$.mobile.phonegapNavigationEnabled = true;
});

// PhoneGap is ready
function onDeviceReady() {
	//alert("start");
	document.addEventListener("backbutton", backKeyDown, true);
	document.addEventListener("menubutton", menuKeyDown, true);
	createTables();
	getSiteID();
}

function getSiteID() {
	db.transaction(setSiteID, errorCB, function() {
		if (SiteID != -1) {
			$.mobile.changePage("#Welcome"); //logged in - goto welcome
		}
		else {
			$.mobile.changePage("#login");
		}
	});
}
function setSiteID(tx, result) {
	tx.executeSql('SELECT * FROM UserSite' , [], 
				  function(tx, result) {
					  $.each(result.rows, function(index) {
						  var row = result.rows.item(index);
						  SiteID = row['SiteID'];
					  });
				  }, errorCB);
}
function backKeyDown(e) {
	var page = $.mobile.activePage;
	//alert(page.attr('id'));
	switch (page.attr('id')) {
		case 'start':
			e.preventDefault();
			break;
		case 'Welcome':
			if (confirm("Are you sure you want to exit?")) {
				navigator.app.exitApp();
			}
			else {
				return false;
			}
			break;
		default:
			//alert(page.attr('id'));
			navigator.app.backHistory();
			break;
	}
}
function showLoading(txt) {
	$.mobile.loading('show', {
		text: txt,
		textVisible: true,
		theme: 'b',
		html: ""
	});
}
function menuKeyDown(e) {
	//alert("here");
	e.preventDefault();
	return false;
}
function setLastSyncDate() {
	db.transaction(lastSyncDate, errorCB, successCB);
}
function lastSyncDate(tx) {
	tx.executeSql('SELECT * FROM Sync WHERE SiteID = ' + SiteID , [], findSync, errorCB); 
}
function findSync(tx, result) {
	if (result.rows.length == 1) {
		$.each(result.rows, function(index) {
			var row = result.rows.item(index);
			DateSynced = row['LastSyncDate'];
		});
	}
	else {
		//first time no last sync get all records
		DateSynced = '2012-01-01 10:00';
		tx.executeSql("INSERT INTO Sync (SiteID, LastSyncDate) VALUES (" + SiteID + ", '" + DateSynced + "')");
	}
}
function getLocation() {
	myNewFunction();
}

function myNewFunction() {
	navigator.geolocation.getCurrentPosition(onGeolocationSuccess, onGeolocationError);
}

//=======================Geolocation Operations=======================//
// onGeolocationSuccess Geolocation
function onGeolocationSuccess(position) {
	// Use Google API to get the location data for the current coordinates
	var geocoder = new google.maps.Geocoder();
	var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	geocoder.geocode({ "latLng": latlng }, function (results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if ((results.length > 1) && results[1]) {
				$("#myLocation").html(results[1].formatted_address);
			}
		}
	});

	// Use Google API to get a map of the current location
	// http://maps.googleapis.com/maps/api/staticmap?size=280x300&maptype=hybrid&zoom=16&markers=size:mid%7Ccolor:red%7C42.375022,-71.273729&sensor=true
	var googleApis_map_Url = 'http://maps.googleapis.com/maps/api/staticmap?size=300x300&maptype=hybrid&zoom=16&sensor=true&markers=size:mid%7Ccolor:red%7C' + latlng;
	var mapImg = '<img src="' + googleApis_map_Url + '" />';
	$("#map_canvas").html(mapImg);
}

// onGeolocationError Callback receives a PositionError object
function onGeolocationError(error) {
	$("#myLocation").html("<span class='err'>" + error.message + "</span>");
}

String.prototype.format = String.prototype.formatString = function() {
	var s = this,
	i = arguments.length;

	while (i--) {
		s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
	}
	return s;
};


var db

function createTables() {
	///alert(createGuid());
	//if (db == null) {
		db = window.openDatabase("LM_Mobile", "1.0", "LandMark Mobile App", 200000); //will create database Dummy_DB or open it
	//}
	//create tables
	db.transaction(createDB, errorCB, successCB);
}

function errorCB(err) {
	alert("Error processing SQL: " + err.code);
}
function createDB(tx) {
    //tx.executeSql('DROP TABLE Paddocks');
	tx.executeSql('CREATE TABLE IF NOT EXISTS Sync (SiteID INTEGER PRIMARY KEY, LastSyncDate TEXT)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS UserSite (SiteID INTEGER PRIMARY KEY, UserName TEXT, Password TEXT)'); 
    tx.executeSql('CREATE TABLE IF NOT EXISTS Paddocks (ID INTEGER PRIMARY KEY, PaddockName TEXT, Size TEXT, Season INT, SiteID INT)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS StockActivities (id Text PRIMARY KEY, SiteID INTEGER, ActivityTypeID INTEGER, GeneratedStatement TEXT, EnterpriseCode INTEGER, DT TEXT, Comments TEXT, AnimalIDList Text, Season INTEGER, TotalCost TEXT, Field1 TEXT, Field2 TEXT, Field3 TEXT, Field4 TEXT, Field5 TEXT, Field6 TEXT, Field7 TEXT, Field8 TEXT, Field9 TEXT, Field10 TEXT, Field11 TEXT, Field12 TEXT, Field13 TEXT, Active INT, Modified_DT TEXT)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS Enterprises (EnterpriseID INTEGER PRIMARY KEY, EnterpriseName TEXT, Active INT)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS Seasons (ID INTEGER PRIMARY KEY)'); 
	tx.executeSql('CREATE TABLE IF NOT EXISTS Stock (ID INTEGER PRIMARY KEY, Name TEXT, Season INT)'); 
}

function populateCB() {
	//getSiteID();
	//syncData()
}

function successCB() {
}
function createGuid() {
	//Generates a GUID based off the siteID.  Hopefully this way we wont get any conflicts
	var x = getSitePrefix() + '-xxxx-xxxx-yxxx-xxxxxxxxxxxx';
	return x.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}
function getSitePrefix() {
	var str = "" + SiteID
	var pad = "00000000"
	return pad.substring(0, pad.length - str.length) + str
}

var ActivityID = '';
var dsActivity;

function populateStockActivities(tx) {
	//Populates Stock Activities Page with StockActivities
	tx.executeSql('SELECT * FROM StockActivities where ActivityTypeID in (' + $('#stockActivityTypeID').val() + ') AND Active = 1 AND SiteID = ' + SiteID + ' order by DT Desc LIMIT 30' , [], populateStockActivitiesSuccess, errorCB);
}

function populateStockActivitiesSuccess(tx, result) {
	//STEP 4
    $('#ulStockActivities').empty();
	$.each(result.rows, function(index) {
		var row = result.rows.item(index);
        ActivityTypeID = row['ActivityTypeID']
        switch (ActivityTypeID){
            case 12: //StockMovments
		        $('#ulStockActivities').append('<li data-theme="c"><a href="ActivitiesStock/StockMovments.html#StockMovments?ID=' + row['id'] + '&AT=' + ActivityTypeID + '" data-transition="slide"><b>' + row['DT'].substr(0, 10) + '</b><div class="activityName">Stock Movments</div><br>' + row['GeneratedStatement'] + '</a></li>');
                break;
            case 13: //drenching
		        $('#ulStockActivities').append('<li data-theme="c"><a href="ActivitiesStock/Drenching.html#Drenching?ID=' + row['id'] + '&AT=' + ActivityTypeID + '" data-transition="slide"><b>' + row['DT'].substr(0, 10) + '</b><div class="activityName">Drenching</div><br>' + row['GeneratedStatement'] + '</a></li>');
                break;
            case 14: //dipping
		        $('#ulStockActivities').append('<li data-theme="c"><a href="ActivitiesStock/Dipping.html#Dipping?ID=' + row['id'] + '&AT=' + ActivityTypeID + '" data-transition="slide"><b>' + row['DT'].substr(0, 10) + '</b><div class="activityName">Dipping</div><br>' + row['GeneratedStatement'] + '</a></li>');
                break;
            case 19: //Dockimg marking
		        $('#ulStockActivities').append('<li data-theme="c"><a href="ActivitiesStock/DockingMarking.html#DockingMarking?ID=' + row['id'] + '&AT=' + ActivityTypeID + '" data-transition="slide"><b>' + row['DT'].substr(0, 10) + '</b><div class="activityName">Docking/Marking</div><br>' + row['GeneratedStatement'] + '</a></li>');
                break;
            case 34: //weighing
		        $('#ulStockActivities').append('<li data-theme="c"><a href="ActivitiesStock/Weighing.html#Weighing?ID=' + row['id'] + '&AT=' + ActivityTypeID + '" data-transition="slide"><b>' + row['DT'].substr(0, 10) + '</b><div class="activityName">Weighing</div><br>' + row['GeneratedStatement'] + '</a></li>');
                break;
            case 47: //Pregnancy Scan
		        $('#ulStockActivities').append('<li data-theme="c"><a href="ActivitiesStock/PregnancyScan.html#PregnancyScan?ID=' + row['id'] + '&AT=' + ActivityTypeID + '" data-transition="slide"><b>' + row['DT'].substr(0, 10) + '</b><div class="activityName">Pregnancy Scan</div><br>' + row['GeneratedStatement'] + '</a></li>');
                break;
        }
	});
	$('#ulStockActivities').listview('refresh');
}

function populateStockActivityStart(valActivityID) {
	ActivityID = valActivityID;
	db.transaction(populateStockActivity, errorCB, successCB);
}
function populateStockActivity(tx) {
	var x = ActivityID;
	tx.executeSql('SELECT * FROM StockActivities where id = "' + x.toString() + '"' , [], populateStockActivitySuccess, errorCB);
}
function populateStockActivitySuccess(tx, result) {
	dsActivity = result;
	tx.executeSql('SELECT * FROM Enterprises where Active = 1' , [], loadStockEnterprises, errorCB);
	//tx.executeSql('SELECT * FROM Seasons' , [], loadSeasons, errorCB);
	if (Season == 0) {
		Season = dsActivity.rows.item(0)["Season"];
	}
	tx.executeSql('SELECT * FROM Stock where Season = ' + Season , [], loadStock, errorCB);
	if (ActivityTypeID == 34) {
		LoadWeighingData();
	}       
}
function loadStockEnterprises(tx, result) {
	$('#stockEnterprise').empty();
	$.each(result.rows, function(index) {
		var row = result.rows.item(index);
		$('#stockEnterprise').append('<option value="' + row['EnterpriseID'] + '">' + row['EnterpriseName'] + '</option>');
	});
	$("#stockEnterprise").trigger("change");
}

function loadStock(tx, result) {
	var divWeighing = $("#divWeighing");
    var cboStock = divWeighing.find("#stockIDListSelect");
    
    cboStock.empty();
	$.each(result.rows, function(index) {
		var row = result.rows.item(index);
		cboStock.append('<option value="' + row['ID'] + '">' + row['Name'] + '</option>');
	});
	cboStock.selectmenu("refresh");
    
    //var d = new Date();
    //divWeighing.find("#mydate").val(d.getYear() + "-" + d.getMonth() + "-" + d.getDate());
	
    //once stock loaded - populate page
	$.each(dsActivity.rows, function(index) {
		var row = dsActivity.rows.item(index);
		//populate page
		divWeighing.find("#stockIDListSelect").val(row["AnimalIDList"].split(","));
		divWeighing.find("#stockIDListSelect").selectmenu("refresh");
		divWeighing.find("#stockSeason").val(row["Season"]);
        divWeighing.find("#stockSeason").text(row["Season"]);
		divWeighing.find("#stockDT").val(row["DT"]);
		divWeighing.find("#stockComments").val(row["Comments"]);
		divWeighing.find("#stockEnterprise").val(row["EnterpriseCode"]);
		divWeighing.find("#stockEnterprise").selectmenu("refresh");
		divWeighing.find("#stockCost").val(row["TotalCost"]);
        divWeighing.find("#stockField1").val(row["Field1"]);
		divWeighing.find("#stockField2").val(row["Field2"]);
        divWeighing.find("#stockField3").val(row["Field3"]);
        divWeighing.find("#stockField4").val(row["Field4"]);
        divWeighing.find("#stockField5").val(row["Field5"]);
        divWeighing.find("#stockField6").val(row["Field6"]);
        divWeighing.find("#stockField7").val(row["Field7"]);
        divWeighing.find("#stockField8").val(row["Field8"]);
        divWeighing.find("#stockField9").val(row["Field9"]);
        divWeighing.find("#stockField10").val(row["Field10"]);
        divWeighing.find("#stockField11").val(row["Field11"]);
        divWeighing.find("#stockField12").val(row["Field12"]);
        divWeighing.find("#stockField13").val(row["Field13"]);
	}); 
}

function LoadWeighingData() {
	if (ActivityID == -1) {
		$('#stockSeason').text(Season);
	}
}

function SaveWeighData() {
	var x = $('#stockIDListSelect').val();
	if (x == null) {
		$("#stockAlert").popup('open');
		return;
	}
    if ($('#stockDT').val() == '') {
		$("#stockAlert").popup('open');
		return;
	}
	db.transaction(InsertWeighingActivity, errorCB, InsertWeighingSuccess);
	//
}

function InsertWeighingActivity(tx) {
		var Enterprise = $('#stockEnterprise').val();
	var DT = $('#stockDT').val(); //getDateFromCalendarValue($('#mydate').val());
	var x = $('#stockIDListSelect').val();
	if (x == null) {
		$("#stockAlert").popup('open');
		return;
	}
    if ($('#stockDT').val() == '') {
		$("#stockAlert").popup('open');
		return;
	}
	var Field1 = ($("#stockField1").length > 0 && $("#stockField1").val() != '') ? $("#stockField1").val() : getDefaultFieldValue($("#stockField1")) ;
	var Field2 = ($("#stockField2").length > 0 && $("#stockField2").val() != '') ? $("#stockField2").val() : getDefaultFieldValue($("#stockField2"));
    var Field3 = ($("#stockField3").length > 0 && $("#stockField3").val() != '') ? $("#stockField3").val() : getDefaultFieldValue($("#stockField3"));
    var Field4 = ($("#stockField4").length > 0 && $("#stockField4").val() != '') ? $("#stockField4").val() : getDefaultFieldValue($("#stockField4"));
    var Field5 = ($("#stockField5").length > 0 && $("#stockField5").val() != '') ? $("#stockField5").val() : getDefaultFieldValue($("#stockField5"));
    var Field6 = ($("#stockField6").length > 0 && $("#stockField6").val() != '') ? $("#stockField6").val() : getDefaultFieldValue($("#stockField6"));
    var Field7 = ($("#stockField7").length > 0 && $("#stockField7").val() != '') ? $("#stockField7").val() : getDefaultFieldValue($("#stockField7"));
    var Field8 = ($("#stockField8").length > 0 && $("#stockField8").val() != '') ? $("#stockField8").val() : getDefaultFieldValue($("#stockField8"));
    var Field9 = ($("#stockField9").length > 0 && $("#stockField9").val() != '') ? $("#stockField9").val() : getDefaultFieldValue($("#stockField9"));
    var Field10 = ($("#stockField10").length > 0 && $("#stockField10").val() != '') ? $("#stockField10").val() : getDefaultFieldValue($("#stockField10"));
    var Field11 = ($("#stockField11").length > 0 && $("#stockField11").val() != '') ? $("#stockField11").val() : getDefaultFieldValue($("#stockField11"));
    var Field12 = ($("#stockField12").length > 0 && $("#stockField12").val() != '') ? $("#stockField12").val() : getDefaultFieldValue($("#stockField12"));
    var Field13 = ($("#stockField13").length > 0 && $("#stockField13").val() != '') ? $("#stockField13").val() : getDefaultFieldValue($("#stockField13"));
    
    var Cost = ($("#stockCost").val() != '') ? Cost = $("#stockCost").val() : 0;
	var Comment = $('#stockComments').val().replace(/\'/g, "''").replace(/\"/g, '""');
    //STEP 8.
	var GeneratedComment = "";
    switch (ActivityTypeID){
        case 13: //StockMovments
            GeneratedComment = "Moved |3| |2| into paddock |4|.".formatString(Field1,$('#stockIDListSelect-button .ui-btn-text').text(),Field2);
            break;
        case 13: //drenching
            GeneratedComment = "Drenched {0} with {1} for {2}. Total drenched = {3}.".formatString($('#stockIDListSelect-button .ui-btn-text').text(),Field3,Field2,Field1);
            break;
        case 14: //dipping
            GeneratedComment = "{0} dipped {1} for {2}. Total dipped = {3}.".formatString(Field3, $('#stockIDListSelect-button .ui-btn-text').text(),Field2,Field1);
            break;
        case 19: //cocking marking
            GeneratedComment = "{0} {1} males and {2} females from {3}. Total dams = {4}. Birthing = {5}.".formatString(Field2,Field3,Field4, $('#stockIDListSelect-button .ui-btn-text').text(),Field1,Field6);
            break;
        case 34: //weighing
            GeneratedComment = "{0} weighed {1}".formatString($('#stockIDListSelect-button .ui-btn-text').text(),DT);
            break;
        case 47: //Pregnancy Scan
            GeneratedComment = "{0} was scanned on {1} by {2}. The result was {3}.".formatString($('#stockIDListSelect-button .ui-btn-text').text(),DT,Field2,Field1);
            break;
        default:
            break; 
    }
    $('#stockIDListSelect-button .ui-btn-text').text(GeneratedComment);
    
	if (ActivityID == '-1') {
		tx.executeSql("INSERT INTO StockActivities(id, SiteID, ActivityTypeID,EnterpriseCode,DT,GeneratedStatement,Comments, Season, TotalCost,Field1,Field2,Field3,Field4,Field5,Field6,Field7,Field8,Field9,Field10,Field11,Field12,Field13,AnimalIDList,Active, Modified_DT) VALUES ('" + createGuid() + "', " + SiteID + ", " + ActivityTypeID + ", " + Enterprise + ",'" + DT + "', '" + GeneratedComment + "', '" + Comment + "', " + Season + ", '" + Cost + "', '" + Field1 + "', '" + Field2 + "', '" + Field3 + "', '" + Field4 + "', '" + Field5 + "', '" + Field6 + "', '" + Field7 + "', '" + Field8 + "', '" + Field9 + "', '" + Field10 + "', '" + Field11 + "', '" + Field12 + "', '" + Field13 + "', '" + x + "',1,'" + GetUniversalTimeString() + "')");
	}
	else {
        tx.executeSql("UPDATE StockActivities SET EnterpriseCode = " + Enterprise + ",DT = '" + DT + "',GeneratedStatement = '" + GeneratedComment + "',Comments = '" + Comment + "', Season = " + Season + ", TotalCost =  '" + Cost + "',Field1 = '" + Field1 + "',Field2 = '" + Field2 + "',Field3 = '" + Field3 + "',Field4 = '" + Field4 + "',Field5 = '" + Field5 + "',Field6 = '" + Field6 + "',Field7 = '" + Field7 + "',Field8 = '" + Field8 + "',Field9 = '" + Field9 + "',Field10 = '" + Field10 + "',Field11 = '" + Field11 + "',Field12 = '" + Field12 + "',Field13 = '" + Field13 + "',AnimalIDList = '" + x + "',Active = 1, Modified_DT = '" + GetUniversalTimeString() + "' WHERE id = '" + ActivityID + "'");
	}
}
function InsertWeighingSuccess() {
	var $page = $('#save');
	$.mobile.changePage($page);
	syncData() ;
}
function getDateFromCalendarValue(CalVal) {
	var x = CalVal.split("/");
	return x[2] + '-' + pad(x[0], 2, '0') + '-' + pad(x[1], 2, '0') ;
}
function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

$('#paddockActivityTypeID').live('change', function(e) {
    db.transaction(populatePaddockActivities, errorCB, successCB);
});

function populatePaddockActivities(tx) {
    //Populates Stock Activities Page with StockActivities
	tx.executeSql('SELECT * FROM StockActivities where ActivityTypeID IN (' + $('#paddockActivityTypeID').val() + ') AND Active = 1 AND SiteID = ' + SiteID + ' order by DT Desc LIMIT 30' , [], populatePaddockActivitiesSuccess, errorCB);
}

function populatePaddockActivitiesSuccess(tx, result) {
    //STEP 4
	$('#ulPaddockActivities').empty();
	$.each(result.rows, function(index) {
		var row = result.rows.item(index);
        ActivityTypeID = row['ActivityTypeID']
        switch (ActivityTypeID){
            case 4: //Soil Test
                $('#ulPaddockActivities').append('<li data-theme="c"><a href="ActivitiesPaddock/SoilTest.html#SoiTest?ID=' + row['id'] + '&AT=' + ActivityTypeID + '" data-transition="slide" ><b>' + row['DT'].substr(0, 10) + '</b><div class="activityName">Soil Test</div><br>' + row['GeneratedStatement'] + '</a></li>');
                break;
            case 6: //Cultivation
                $('#ulPaddockActivities').append('<li data-theme="c"><a href="ActivitiesPaddock/CultivationAction.html#CultivationAction?ID=' + row['id'] + '&AT=' + ActivityTypeID + '" data-transition="slide" ><b>' + row['DT'].substr(0, 10) + '</b><div class="activityName">Cultivation</div><br>' + row['GeneratedStatement'] + '</a></li>');
                break;
            case 8: //Lime
                $('#ulPaddockActivities').append('<li data-theme="c"><a href="ActivitiesPaddock/Lime.html#Lime?ID=' + row['id'] + '&AT=' + ActivityTypeID + '" data-transition="slide" ><b>' + row['DT'].substr(0, 10) + '</b><div class="activityName">Lime</div><br>' + row['GeneratedStatement'] + '</a></li>');
                break;
            case 9: //Sowing
                $('#ulPaddockActivities').append('<li data-theme="c"><a href="ActivitiesPaddock/Sowing.html#Sowing?ID=' + row['id'] + '&AT=' + ActivityTypeID + '" data-transition="slide" ><b>' + row['DT'].substr(0, 10) + '</b><div class="activityName">Sowing</div><br>' + row['GeneratedStatement'] + '</a></li>');
                break;
            case 10: //Feed Growth
                $('#ulPaddockActivities').append('<li data-theme="c"><a href="ActivitiesPaddock/FeedGrowth.html#FeedGrowth?ID=' + row['id'] + '&AT=' + ActivityTypeID + '" data-transition="slide" ><b>' + row['DT'].substr(0, 10) + '</b><div class="activityName">Feed Growth</div><br>' + row['GeneratedStatement'] + '</a></li>');
                break;
            case 51: //Crop Growth
                $('#ulPaddockActivities').append('<li data-theme="c"><a href="ActivitiesPaddock/CropGrowth.html#CropGrowth?ID=' + row['id'] + '&AT=' + ActivityTypeID + '" data-transition="slide" ><b>' + row['DT'].substr(0, 10) + '</b><div class="activityName">Crop Growth</div><br>' + row['GeneratedStatement'] + '</a></li>');
	            break;
        }
	});
	$('#ulPaddockActivities').listview('refresh');
}



function populatePaddockActivityStart(valActivityID) {
	ActivityID = valActivityID;
    //alert(ActivityID);
	db.transaction(populatePaddockActivity, errorCB, successCB);
}
function populatePaddockActivity(tx) {
	var x = ActivityID;
	tx.executeSql('SELECT * FROM StockActivities where id = "' + x.toString() + '"' , [], populatePaddockActivitySuccess, errorCB);
}
function populatePaddockActivitySuccess(tx, result) {
	dsActivity = result;
	tx.executeSql('SELECT * FROM Paddocks' , [], loadPaddocks, errorCB);
    tx.executeSql('SELECT * FROM Enterprises where Active = 1' , [], loadPaddockEnterprises, errorCB);

	if (Season == 0) {
		Season = dsActivity.rows.item(0)["Season"];
	}
    $('#paddockSeason').text(Season);
	//tx.executeSql('SELECT * FROM Stock where Season = ' + Season , [], loadStock, errorCB);
	//if (ActivityTypeID == 34) {
	//	LoadWeighingData();
	//}       
}
function loadPaddocks(tx, result) {
	$('#paddockIDListSelect').empty();
	$.each(result.rows, function(index) {
		var row = result.rows.item(index);
		$('#paddockIDListSelect').append('<option value="' + row['ID'] + '">' + row['PaddockName'] + '</option>');
	});
	$("#paddockIDListSelect").trigger("change");
}

function loadPaddockEnterprises(tx, result) {
	var divWeighing = $("#divWeighing");
    
    $('#paddockEnterprise').empty();
	$.each(result.rows, function(index) {
		var row = result.rows.item(index);
		$('#paddockEnterprise').append('<option value="' + row['EnterpriseID'] + '">' + row['EnterpriseName'] + '</option>');
	});
	$("#paddockEnterprise").trigger("change");
    
    $.each(dsActivity.rows, function(index) {
		var row = dsActivity.rows.item(index);
		//populate page
		divWeighing.find("#paddockIDListSelect").val(row["AnimalIDList"].split(","));
		divWeighing.find("#paddockIDListSelect").selectmenu("refresh");
		divWeighing.find("#paddockSeason").val(row["Season"]);
        divWeighing.find("#paddockSeason").text(row["Season"]);
		divWeighing.find("#paddockDT").val(row["DT"]);
		divWeighing.find("#paddockComments").val(row["Comments"]);
		divWeighing.find("#paddockEnterprise").val(row["EnterpriseCode"]);
		divWeighing.find("#paddockEnterprise").selectmenu("refresh");
		divWeighing.find("#paddockCost").val(row["TotalCost"]);
        divWeighing.find("#paddockField1").val(row["Field1"]);
		divWeighing.find("#paddockField2").val(row["Field2"]);
        divWeighing.find("#paddockField3").val(row["Field3"]);
        divWeighing.find("#paddockField4").val(row["Field4"]);
        divWeighing.find("#paddockField5").val(row["Field5"]);
        divWeighing.find("#paddockField6").val(row["Field6"]);
        divWeighing.find("#paddockField7").val(row["Field7"]);
        divWeighing.find("#paddockField8").val(row["Field8"]);
        divWeighing.find("#paddockField9").val(row["Field9"]);
        divWeighing.find("#paddockField10").val(row["Field10"]);
        divWeighing.find("#paddockField11").val(row["Field11"]);
        divWeighing.find("#paddockField12").val(row["Field12"]);
        divWeighing.find("#paddockField13").val(row["Field13"]);
	}); 
}

function SavePaddockData() {
    var x = $('#paddockIDListSelect').val();
	if (x == null) {
		$("#paddockAlert").popup('open');
		return;
	}
    if ($('#paddockDT').val() == '') {
		$("#paddockAlert").popup('open');
		return;
	}
	db.transaction(InsertPaddockActivity, errorCB, InsertPaddockSuccess);
	//
}

function InsertPaddockActivity(tx) {
	var Enterprise = $('#paddockEnterprise').val();
	var DT = $('#paddockDT').val(); //getDateFromCalendarValue($('#mydate').val());
	var x = $('#paddockIDListSelect').val();
	if (x == null) {
		$("#paddockAlert").popup('open');
		return;
	}
    if ($('#paddockDT').val() == '') {
		$("#paddockAlert").popup('open');
		return;
	}
	var Field1 = ($("#paddockField1").length > 0 && $("#paddockField1").val() != '') ? $("#paddockField1").val() : getDefaultFieldValue($("#paddockField1")) ;
	var Field2 = ($("#paddockField2").length > 0 && $("#paddockField2").val() != '') ? $("#paddockField2").val() : getDefaultFieldValue($("#paddockField2"));
    var Field3 = ($("#paddockField3").length > 0 && $("#paddockField3").val() != '') ? $("#paddockField3").val() : getDefaultFieldValue($("#paddockField3"));
    var Field4 = ($("#paddockField4").length > 0 && $("#paddockField4").val() != '') ? $("#paddockField4").val() : getDefaultFieldValue($("#paddockField4"));
    var Field5 = ($("#paddockField5").length > 0 && $("#paddockField5").val() != '') ? $("#paddockField5").val() : getDefaultFieldValue($("#paddockField5"));
    var Field6 = ($("#paddockField6").length > 0 && $("#paddockField6").val() != '') ? $("#paddockField6").val() : getDefaultFieldValue($("#paddockField6"));
    var Field7 = ($("#paddockField7").length > 0 && $("#paddockField7").val() != '') ? $("#paddockField7").val() : getDefaultFieldValue($("#paddockField7"));
    var Field8 = ($("#paddockField8").length > 0 && $("#paddockField8").val() != '') ? $("#paddockField8").val() : getDefaultFieldValue($("#paddockField8"));
    var Field9 = ($("#paddockField9").length > 0 && $("#paddockField9").val() != '') ? $("#paddockField9").val() : getDefaultFieldValue($("#paddockField9"));
    var Field10 = ($("#paddockField10").length > 0 && $("#paddockField10").val() != '') ? $("#paddockField10").val() : getDefaultFieldValue($("#paddockField10"));
    var Field11 = ($("#paddockField11").length > 0 && $("#paddockField11").val() != '') ? $("#paddockField11").val() : getDefaultFieldValue($("#paddockField11"));
    var Field12 = ($("#paddockField12").length > 0 && $("#paddockField12").val() != '') ? $("#paddockField12").val() : getDefaultFieldValue($("#paddockField12"));
    var Field13 = ($("#paddockField13").length > 0 && $("#paddockField13").val() != '') ? $("#paddockField13").val() : getDefaultFieldValue($("#paddockField13"));
    
    var Cost = ($("#paddockCost").val() != '') ?		Cost = $("#paddockCost").val() : 0;
	var Comment = $('#paddockComments').val().replace(/\'/g, "''").replace(/\"/g, '""');
    //STEP 8.
	var GeneratedComment = "";
    switch (ActivityTypeID){
        case "4": //soil test
            GeneratedComment = "Soil test results for {0} paddock. {1}".formatString($('#paddockIDListSelect-button .ui-btn-text').text(),Field3);
            break;
        case "6": //cultivation
            GeneratedComment = "{0} {1} paddock {2} time(s).".formatString($('#paddockIDListSelect-button .ui-btn-text').text(),Field2,Field3);
            break;
        case "8": //Lime
            GeneratedComment = "Applied {0} of Lime to {1} paddock.".formatString(Field2,$('#paddockIDListSelect-button .ui-btn-text').text());
            break;
        case "9": //Sowing
            GeneratedComment = "|4| |6| into |2| paddock.".formatString(Field2,Field4,$('#paddockIDListSelect-button .ui-btn-text').text());
            break;
        case "10": //feed growth
            GeneratedComment = "{0} of feed is available in {1} paddock.".formatString(Field6,$('#paddockIDListSelect-button .ui-btn-text').text());
            break;
        case "51": //crop growth
            GeneratedComment = "{0} of {1}{2} in paddock {3}".formatString(Field2,Field3,Field4,$('#paddockIDListSelect-button .ui-btn-text').text());
            break;
        default:
            break; 
    }
    $('#paddockIDListSelect-button .ui-btn-text').text(GeneratedComment);
    
	if (ActivityID == '-1') {
		tx.executeSql("INSERT INTO StockActivities(id, SiteID, ActivityTypeID,EnterpriseCode,DT,GeneratedStatement,Comments, Season, TotalCost,Field1,Field2,Field3,Field4,Field5,Field6,Field7,Field8,Field9,Field10,Field11,Field12,Field13,AnimalIDList,Active, Modified_DT) VALUES ('" + createGuid() + "', " + SiteID + ", " + ActivityTypeID + ", " + Enterprise + ",'" + DT + "', '" + GeneratedComment + "', '" + Comment + "', " + Season + ", '" + Cost + "', '" + Field1 + "', '" + Field2 + "', '" + Field3 + "', '" + Field4 + "', '" + Field5 + "', '" + Field6 + "', '" + Field7 + "', '" + Field8 + "', '" + Field9 + "', '" + Field10 + "', '" + Field11 + "', '" + Field12 + "', '" + Field13 + "', '" + x + "',1,'" + GetUniversalTimeString() + "')");
	}
	else {
        tx.executeSql("UPDATE StockActivities SET EnterpriseCode = " + Enterprise + ",DT = '" + DT + "',GeneratedStatement = '" + GeneratedComment + "',Comments = '" + Comment + "', Season = " + Season + ", TotalCost =  '" + Cost + "',Field1 = '" + Field1 + "',Field2 = '" + Field2 + "',Field3 = '" + Field3 + "',Field4 = '" + Field4 + "',Field5 = '" + Field5 + "',Field6 = '" + Field6 + "',Field7 = '" + Field7 + "',Field8 = '" + Field8 + "',Field9 = '" + Field9 + "',Field10 = '" + Field10 + "',Field11 = '" + Field11 + "',Field12 = '" + Field12 + "',Field13 = '" + Field13 + "',AnimalIDList = '" + x + "',Active = 1, Modified_DT = '" + GetUniversalTimeString() + "' WHERE id = '" + ActivityID + "'");
	}
}
function InsertPaddockSuccess() {
	var $page = $('#save');
	$.mobile.changePage($page);
	syncData() ;
}

function getDefaultFieldValue(input){
    return (input.attr('type') == "number") ? 0 : "";
}

































































