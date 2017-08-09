






	        //hack to add padding to module pages, except index/more
	    	$(document).ready(function() {
	            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			    if(filename != "index.html" && filename != "more.html") {
	    		    $("div.ui-content").each(function() {
                        var dr = $(this).attr("data-role");
                        if(dr == "content") {
                            $(this).addClass("additonal-padding");
	    		        }
                });
	    		}
	        });
	    

	                  $(document).ready(function() {
                          document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
                      });
				
                      function onDeviceReadyChildBrowser() {
                          $("a.open-child-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.openExternal(goUrl);
				              window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share Lynne Drew", null, null, "https://play.google.com/store/apps/details?id=com.a1842967561506235187e4805a.a74054957a");
    			    return false;
                });
            });
    	

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"Lynne Drew", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            

	    $(document).ready(function() {
	        $("div#additional-tab-content a").each(function(index) {
                var goUrl = $(this).attr("href");
					if (/^(f|ht)tps?:\/\//i.test(goUrl)) {
                        $(this).addClass("open-external-browser");
                        $(this).attr("data-gourl",goUrl);
					}
            });
        });
	

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=additionalTab1&appId=1842967561506235187e4805.74054957\"/>");}).fail(function( jqxhr, textStatus, error ) {});







	        //hack to add padding to module pages, except index/more
	    	$(document).ready(function() {
	            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			    if(filename != "index.html" && filename != "more.html") {
	    		    $("div.ui-content").each(function() {
                        var dr = $(this).attr("data-role");
                        if(dr == "content") {
                            $(this).addClass("additonal-padding");
	    		        }
                });
	    		}
	        });
	    

	                  $(document).ready(function() {
                          document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
                      });
				
                      function onDeviceReadyChildBrowser() {
                          $("a.open-child-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.openExternal(goUrl);
				              window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share Lynne Drew", null, null, "https://play.google.com/store/apps/details?id=com.a1842967561506235187e4805a.a74054957a");
    			    return false;
                });
            });
    	

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"Lynne Drew", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=testimonials&appId=1842967561506235187e4805.74054957\"/>");}).fail(function( jqxhr, textStatus, error ) {});







	        //hack to add padding to module pages, except index/more
	    	$(document).ready(function() {
	            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			    if(filename != "index.html" && filename != "more.html") {
	    		    $("div.ui-content").each(function() {
                        var dr = $(this).attr("data-role");
                        if(dr == "content") {
                            $(this).addClass("additonal-padding");
	    		        }
                });
	    		}
	        });
	    

	                  $(document).ready(function() {
                          document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
                      });
				
                      function onDeviceReadyChildBrowser() {
                          $("a.open-child-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.openExternal(goUrl);
				              window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share Lynne Drew", null, null, "https://play.google.com/store/apps/details?id=com.a1842967561506235187e4805a.a74054957a");
    			    return false;
                });
            });
    	

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"Lynne Drew", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=aboutUs&appId=1842967561506235187e4805.74054957\"/>");}).fail(function( jqxhr, textStatus, error ) {});







	        //hack to add padding to module pages, except index/more
	    	$(document).ready(function() {
	            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			    if(filename != "index.html" && filename != "more.html") {
	    		    $("div.ui-content").each(function() {
                        var dr = $(this).attr("data-role");
                        if(dr == "content") {
                            $(this).addClass("additonal-padding");
	    		        }
                });
	    		}
	        });
	    

	                  $(document).ready(function() {
                          document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
                      });
				
                      function onDeviceReadyChildBrowser() {
                          $("a.open-child-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.openExternal(goUrl);
				              window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share Lynne Drew", null, null, "https://play.google.com/store/apps/details?id=com.a1842967561506235187e4805a.a74054957a");
    			    return false;
                });
            });
    	

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"Lynne Drew", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            

		
   	        var scanButton;
        	var resultSpan;
   	        var couponUsedButton;
   	        var db;
   	        var currentCoupon;
   	        var dbCoupon;
   	        var usedLong = 0;
   	        var usedLat = 0;
		
   	  $(document).ready(function() {
   	    scanButton = document.getElementById("scan-button");
        resultSpan = document.getElementById("scan-result");
   	    couponUsedButton = document.getElementById("used-coupon-button");
   	    document.addEventListener("deviceready", onDeviceReadyQRCoupon, false);
   	    $("#scan-button-wrapper").hide();
   	    resultSpan.innerHTML = "<p>Getting coupon info, please wait...</p>";
    });
		
    function onDeviceReadyQRCoupon() {
   	    db = window.sqlitePlugin.openDatabase("qrcoupon.db", "1.0", "QR Coupons", 2000000);
        scanButton.addEventListener("click", clickScan, false);
   	    couponUsedButton.addEventListener("click", couponUsed, false);
   	    navigator.geolocation.getCurrentPosition(setLatLong, setLatLongError);
   	    db.transaction(initQrDb, errorCB, getCurrentCoupons);
    }
		
   	function initQrDb(tx) {
   	                //console.log("INIT QR COUPON DB");
        tx.executeSql("CREATE TABLE IF NOT EXISTS QRCOUPONS (couponHash,url,scanned,scanDate,expires,used,localFile,isCurrent,daysValid)");
    }
		
   	function couponUsed() {
   	    navigator.notification.confirm("Mark Coupon as used?", function(button) {
   	        if(parseInt(button) == 1) {
                db = window.sqlitePlugin.openDatabase("qrcoupon.db", "1.0", "QR Coupons", 2000000);
   	            db.transaction(dbCouponUsed, errorCB);
   	            navigator.geolocation.getCurrentPosition(setLatLong, setLatLongError);
   	        }
        }, "Use Coupon","OK,Cancel")
   	
   	}
		
   	function setLatLongError(error) {
        usedLong = 0;
   	    usedLat = 0;
    }
		
   	function setLatLong(position) {
        usedLat = position.coords.latitude;
        usedLong = position.coords.longitude;
    }
		
   	function dbCouponUsed(tx) {
   	    var sql = "UPDATE QRCOUPONS SET used='1' WHERE couponHash='"+dbCoupon.couponHash+"'";
   	    console.log(sql);
   	    tx.executeSql(sql, [], successCB, errorCB);
   	    var url = "http://skybuilder.net/coupon.php?a=1842967561506235187e4805.74054957&u=1&h="+dbCoupon.couponHash+"&la="+usedLat+"&lo="+usedLong;
   	    $.ajax({
            url: url,
            dataType: 'jsonp',
            success:  function(data) {
   	            console.log(data);
            }
        });
		
   	    resultSpan.innerHTML = "<p>Coupon Used! Thank you.</p>";
   	    $("#scan-button-wrapper").hide();
   	    $("#used-coupon-button-wrapper").hide();
		
   	    getCouponsTimeout=setTimeout(function(){getCurrentCoupons()},5000);
   	}
		
   	function getCurrentCoupons() {
		
   	    resultSpan.innerHTML = "<p>Getting coupon info, please wait...</p>";
		
   	    var url = "http://skybuilder.net/coupon.php?a=1842967561506235187e4805.74054957";
   	                   // console.log(url);
   	    $.ajax({
            url: url,
            dataType: 'jsonp',
            timeout : 9000,
            success:  function(data) {
   	           // console.log(data);
   	            if(data != null) {
		
   	                console.log("RETURN DATA: " + JSON.stringify(data));
		
   	                if(data.hasCoupon.length >= 1) {
   	                    if(parseInt(data.hasCoupon) == 1) {
   	                        currentCoupon = data.coupon;
   	                        db = window.sqlitePlugin.openDatabase("qrcoupon.db", "1.0", "QR Coupons", 2000000);
   	                        db.transaction(getCurrentCouponFromDb, errorCB);
   	                    } else {
   	                        resultSpan.innerHTML = "<p><img src=\"images/coupon-used.png\" style=\"width:90%;display:block;margin-left:auto;margin-right:auto;\"/>Sorry, there are currently no coupons available. Please check back later!</p>";
   	                    }
   	                } else {
   	                    resultSpan.innerHTML = "<p><img src=\"images/coupon-used.png\" style=\"width:90%;display:block;margin-left:auto;margin-right:auto;\"/>Sorry, there are currently no coupons available. Please check back later!</p>";
   	                }
   	            } else {
   	                alert("Could not retrieve latest offers. Please check your Internet connection.");
   	            }
            },
   	        error: function (xhr, ajaxOptions, thrownError) {
                resultSpan.innerHTML = "<p>Sorry, could not get the latest Coupon information. Please try again.</p>";
            }
         });
   	}
		
   	function getCurrentCouponFromDb(tx) {
   	    var sql = "SELECT * FROM QRCOUPONS WHERE couponHash='"+currentCoupon.couponHash+"'";
   	   // console.log(sql);
   	    tx.executeSql(sql, [], hasCouponCheck, errorCB);
   	}
		
   	function hasCouponCheck(tx,results) {
   	    scanButton = document.getElementById("scan-button");
        resultSpan = document.getElementById("scan-result");
		
   	    if(results.rows.length == 0) {
   	                    console.log("NO RECORD FOUND FOR THIS COUPON");
   	        tx.executeSql("UPDATE QRCOUPONS SET isCurrent=0");
   	        tx.executeSql("INSERT INTO QRCOUPONS(couponHash,url,scanned,scanDate,expires,used,localFile,isCurrent,daysValid) VALUES('"+currentCoupon.couponHash+"','','0','0','"+currentCoupon.expires+"','0','','1','"+currentCoupon.daysValid+"')");
   	        $("#scan-button-wrapper").show();
   	        resultSpan.innerHTML = "<p>A new coupon is available. Click the image above to Scan and unlock the coupon!</p>";
   	        dbCoupon = currentCoupon;
   	    } else {
   	        console.log("FOUND COUPON" + results.rows.item(0).couponHash);
   	        dbCoupon = results.rows.item(0);
   	        tx.executeSql("UPDATE QRCOUPONS SET isCurrent=0");
   	        tx.executeSql("UPDATE QRCOUPONS SET isCurrent=1 WHERE couponHash='"+dbCoupon.couponHash+"'");
            console.log("DB COUPON DATA: " + JSON.stringify(dbCoupon));
   	        //check to see if it has been scanned
   	                    console.log("SCANNED: " + dbCoupon.scanned);
		
   	        if(parseInt(dbCoupon.scanned) == 1 && dbCoupon.localFile.length > 0) {
   	            if(parseInt(dbCoupon.used) == 1) {
   	                resultSpan.innerHTML = "<p><img src=\"images/coupon-used.png\" style=\"width:90%;display:block;margin-left:auto;margin-right:auto;\"/>Looks like you've used the current coupon. Please check back for new coupons posted soon!</p>";
   	                return;
   	            }
   	            var timeNow = Math.floor(new Date().getTime() / 1000);
   	            var secondsValid = parseInt(dbCoupon.daysValid) * 24 * 60 * 60;
   	            var validUntil = parseInt(dbCoupon.scanDate) + secondsValid;
   	            if(validUntil > parseInt(dbCoupon.expires)) {
   	                validUntil = parseInt(dbCoupon.expires);
   	            }
   	            console.log(dbCoupon.localFile);
   	            if(validUntil >= timeNow) {
   	                var expiresIn = validUntil - timeNow;
   	                //var expiresInDays = Math.ceil(expiresIn /60/60/24);
   	                //var dispExp;
   	                //if(expiresInDays == 1) {
   	                //    dispExp = secondsToHms(expiresIn);
   	                //} else {
   	                //    dispExp = expiresInDays + " Days";
   	                //}
		
   	                $("#scan-button-wrapper").hide();
   	                resultSpan.innerHTML = "<p>Expires in: <span id='expires-counter'></span><br /><img src='"+dbCoupon.localFile+"'  style='width:99%;display:block;margin-left:auto;margin-right:auto;' />";
   	                $("#used-coupon-button-wrapper").show();
   	                console.log("EXPIRES IN: " + expiresIn);
   	                expiryCountdown(expiresIn);
		
   	                //console.log("<img src='"+dbCoupon.localFile+"'  style="width:95%;" />");
   	            } else {
   	                resultSpan.innerHTML = "<p>Sorry, the Coupon has expired - please scan again</p>";
   	                $("#scan-button-wrapper").show();
   	            }
   	        } else {
   	            $("#scan-button-wrapper").show();
   	                    resultSpan.innerHTML = "<p>A coupon is available. Click the image above to Scan and unlock the coupon!</p>";
   	        }
   	    }
   	}
		
   	function updateDbWithLocalFile(tx) {
   	    var timeNow = Math.floor(new Date().getTime() / 1000);
   	    tx.executeSql("UPDATE QRCOUPONS SET localFile='"+currentCoupon.localFile+"',url='"+currentCoupon.url+"', scanned='1',scanDate='"+timeNow+"' WHERE couponHash='"+currentCoupon.couponHash+"'");
   	}
		
   	function errorCB(error) {
        console.log("QR DB ERROR: "+error);
    }
		
   	function successCB() {}
		
    function clickScan() {
   			cordova.plugins.barcodeScanner.scan(scannerSuccess, scannerFailure);
    }
		
   	function couponScanned() {
   	    var url = "http://skybuilder.net/coupon.php?a=1842967561506235187e4805.74054957&s=1&h="+currentCoupon.couponHash;
   	    $.ajax({
            url: url,
            dataType: 'jsonp',
            success:  function(data) {
   	            console.log(data);
            }
         });
   	}
		
//------------------------------------------------------------------------------
		
function getValidTime() {
		
}
		
//------------------------------------------------------------------------------
		
function secondsToHms(d) {
d = Number(d);
var h = Math.floor(d / 3600);
var m = Math.floor(d % 3600 / 60);
var s = Math.floor(d % 3600 % 60);
return ((h > 0 ? h + ":" : "") + (m > 0 ? (h > 0 && m < 10 ? "0" : "") + m + ":" : "0:") + (s < 10 ? "0" : "") + s);
}
		
//------------------------------------------------------------------------------
function scannerSuccess(result) {
   	scanButton = document.getElementById("scan-button");
    resultSpan = document.getElementById("scan-result");
   	if(result.cancelled == false) {
   	    var returnedText = result.text;
   	    console.log("RET RES: " + returnedText);
   	    var scannedFormat = result.format;
   	    var hashedResult = md5(returnedText);
           
   	    if(hashedResult == dbCoupon.couponHash) {
   	        currentCoupon.url = returnedText;
   	                    console.log("OK, ADD TO PAGE");
		
   	         console.log("HIDE BUTTON");
   	        $("#scan-button-wrapper").hide();
   	        console.log("DOWNLOAD COUPON");
   	        downloadFile(returnedText);
   	        couponScanned();
		
   	        var secondsValid = parseInt(dbCoupon.daysValid) * 24 * 60 * 60;
		
   	        resultSpan.innerHTML = "<p>Expires in: <span id='expires-counter'></span><br />"+replaceURLWithHTML(returnedText);
   	        $("#used-coupon-button-wrapper").show();
   	        console.log("EXPIRES IN: " + secondsValid);
   	        expiryCountdown(secondsValid);
		
   	    } else {
                     console.log("RET HASH: " + hashedResult);
                     console.log("DB HASH: " + dbCoupon.couponHash);
   	        resultSpan.innerHTML = "<p>Sorry, the scan was unsuccessful, or this Coupon has expired/is no longer valid. Please try again</p>";
   	    }
   	}
}
		
//------------------------------------------------------------------------------
function scannerFailure(message) {
    //console.log("scannerFailure: message: " + message)
    resultSpan.innerText = "failed to Scan: " + message;
}
		
function replaceURLWithHTML(text) {
    var expUrl = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    var expImg = /(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*\.(?:jpg|gif|png))(?:\?([^#]*))?(?:#(.*))?/ig;
		
    if(text.match(expUrl)) {
        //is URL format
        if(text.match(expImg)) {
            //is link to image
            return text.replace(expUrl,'<img src="$1" style="width:99%;display:block;margin-left:auto;margin-right:auto;">');
        } else {
            return text.replace(expUrl,'<a href="$1">$1</a>');
        }
    } else {
        return text;
    }
}
		
function expiryCountdown(start){
    var expireSeconds = parseInt(start);
    var end = 0 // change this to stop the counter at a higher value
    var refresh=1000; // Refresh rate in milli seconds
    if(expireSeconds >= end ){
        mytime=setTimeout(function(){displayExpiryCountdown(expireSeconds)},refresh);
    } else {
   	    getCurrentCoupons();
   	}
		
}
		
function displayExpiryCountdown(expireSeconds) {
   	expireSeconds = parseInt(expireSeconds);
    var days = Math.floor(expireSeconds / 86400);
    var hours = Math.floor((expireSeconds - (days * 86400 ))/3600);
    var minutes = Math.floor((expireSeconds - (days * 86400 ) - (hours *3600 ))/60);
    var secs = Math.floor((expireSeconds - (days * 86400 ) - (hours *3600 ) - (minutes*60)));
		
   	if(hours <=9) {
   	    hours = "0" + String(hours);
   	} else {
   	    hours = String(hours);
   	}
		
   	if(minutes <=9) {
   	    minutes = "0" + String(minutes);
   	} else {
   	    minutes = String(minutes);
   	}
		
   	if(secs <=9) {
   	    secs = "0" + String(secs);
   	} else {
   	    secs = String(secs);
   	}
		
   	var countHtml = days + " D, " + hours + ":" + minutes + ":" + secs;
   	      
   	document.getElementById("expires-counter").innerHTML = countHtml;
  
   	expireSeconds = expireSeconds - 1;
		
    tt=expiryCountdown(expireSeconds);
}
		
//------------------------------------------------------------
		
   	function onRequestFileSystemSuccess(fileSystem) {
        var entry=fileSystem.root;
        entry.getDirectory("1842967561506235187e4805.74054957", {create: true, exclusive: false}, onGetDirectorySuccess, onGetDirectoryFail);
}
		
function onGetDirectorySuccess(dir) {
      console.log("Created dir "+dir.name);
}
		
function onGetDirectoryFail(error) {
     console.log("Error creating directory "+error.code);
}
		
   	function downloadFile(url){
		
   	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null);
		
  window.requestFileSystem(
    LocalFileSystem.PERSISTENT, 0,
    function onFileSystemSuccess(fileSystem) {
      fileSystem.root.getFile(
        "1842967561506235187e4805.74054957.html", {create: true, exclusive: false},
        function gotFileEntry(fileEntry) {
          var sPath = fileEntry.fullPath.replace("1842967561506235187e4805.74054957.html","1842967561506235187e4805.74054957/");
   	                    console.log("DUMMY PATH: "+sPath);
          var fileTransfer = new FileTransfer();
          fileEntry.remove();
		
          fileTransfer.download(
            url,
            sPath + dbCoupon.couponHash + ".png",
            function(theFile) {
              console.log("download complete: " + theFile.toURI());
              //showLink(theFile.toURI());
   	          currentCoupon.localFile = theFile.toURI();
   	          db = window.sqlitePlugin.openDatabase("qrcoupon.db", "1.0", "QR Coupons", 2000000);
   	          db.transaction(updateDbWithLocalFile, errorCB);
		
		
            },
            function(error) {
              console.log("download error source " + error.source);
              console.log("download error target " + error.target);
              console.log("upload error code: " + error.code);
            }
          );
        },
        dlFailed);
    },
    dlFailed);
};
   	function dlFailed() {}
		
//----------------------------------------------------------------------------
   	function utf8_encode (argString) {
		
    if (argString === null || typeof argString === "undefined") {
        return "";
    }
		
    var string = (argString + ''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    var utftext = "",
        start, end, stringl = 0;
		
    start = end = 0;
    stringl = string.length;
    for (var n = 0; n < stringl; n++) {
        var c1 = string.charCodeAt(n);
        var enc = null;
		
        if (c1 < 128) {
            end++;
        } else if (c1 > 127 && c1 < 2048) {
            enc = String.fromCharCode((c1 >> 6) | 192) + String.fromCharCode((c1 & 63) | 128);
        } else {
            enc = String.fromCharCode((c1 >> 12) | 224) + String.fromCharCode(((c1 >> 6) & 63) | 128) + String.fromCharCode((c1 & 63) | 128);
        }
        if (enc !== null) {
            if (end > start) {
                utftext += string.slice(start, end);
            }
            utftext += enc;
            start = end = n + 1;
        }
    }
		
    if (end > start) {
        utftext += string.slice(start, stringl);
    }
		
    return utftext;
}
		
    function md5 (str) {
		
    var xl;
		
    var rotateLeft = function (lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    };
		
    var addUnsigned = function (lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    };
		
    var _F = function (x, y, z) {
        return (x & y) | ((~x) & z);
    };
    var _G = function (x, y, z) {
        return (x & z) | (y & (~z));
    };
    var _H = function (x, y, z) {
        return (x ^ y ^ z);
    };
    var _I = function (x, y, z) {
        return (y ^ (x | (~z)));
    };
		
    var _FF = function (a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };
		
    var _GG = function (a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };
		
    var _HH = function (a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };
		
    var _II = function (a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };
		
    var convertToWordArray = function (str) {
        var lWordCount;
        var lMessageLength = str.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = new Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };
		
    var wordToHex = function (lValue) {
        var wordToHexValue = "",
            wordToHexValue_temp = "",
            lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            wordToHexValue_temp = "0" + lByte.toString(16);
            wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2);
        }
        return wordToHexValue;
    };
		
    var x = [],
        k, AA, BB, CC, DD, a, b, c, d, S11 = 7,
        S12 = 12,
        S13 = 17,
        S14 = 22,
        S21 = 5,
        S22 = 9,
        S23 = 14,
        S24 = 20,
        S31 = 4,
        S32 = 11,
        S33 = 16,
        S34 = 23,
        S41 = 6,
        S42 = 10,
        S43 = 15,
        S44 = 21;
		
    str = this.utf8_encode(str);
    x = convertToWordArray(str);
    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;
		
    xl = x.length;
    for (k = 0; k < xl; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = _FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = _FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = _FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = _FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = _FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = _FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = _FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = _FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = _FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = _FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = _FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = _FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = _FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = _FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = _FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = _FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = _GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = _GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = _GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = _GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = _GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = _GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = _GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = _GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = _GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = _GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = _GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = _GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = _GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = _GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = _GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = _GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = _HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = _HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = _HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = _HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = _HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = _HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = _HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = _HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = _HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = _HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = _HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = _HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = _HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = _HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = _HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = _HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = _II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = _II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = _II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = _II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = _II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = _II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = _II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = _II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = _II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = _II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = _II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = _II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = _II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = _II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = _II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = _II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = addUnsigned(a, AA);
        b = addUnsigned(b, BB);
        c = addUnsigned(c, CC);
        d = addUnsigned(d, DD);
    }
		
    var temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
		
    return temp.toLowerCase();
}
		
    

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=qrcoupon&appId=1842967561506235187e4805.74054957\"/>");}).fail(function( jqxhr, textStatus, error ) {});





                
                var redirectUrl = null;
                var ref = null;
                
                function getUrlVars() {
                    var vars = {};
                    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
                                                             vars[key] = value;
                                                             });
                    return vars;
                }
                
                function onBodyLoad()
                {
                    document.addEventListener("deviceready",onDeviceReady,false);
                }

                function onDeviceReady() {
                                        
                    var goUrl = getUrlVars()["goUrl"];
		    var browser = getUrlVars()["browser"];
                    var where = "_blank";
		    goUrl=decodeURIComponent(goUrl);
                    var actualRedirect = 'index.html';
					//alert(goUrl);   
                    if(getUrlVars()['redirectUrl'] != '') {
                        redirectUrl = getUrlVars()['redirectUrl'];
                    }

                    if (browser=='external'){
                        where = "_system";
                    }
                    if(redirectUrl != null) {
                        actualRedirect = redirectUrl;
                    }


                    if (browser=='external'){
                        window.location.href = actualRedirect;
                        window.open(goUrl, where, 'location=yes');
                    } else {
                        var ref = window.open(goUrl, where, 'location=yes');
                        ref.addEventListener('exit', function() { window.location.href = actualRedirect; });
                    }

                }
                







	        //hack to add padding to module pages, except index/more
	    	$(document).ready(function() {
	            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			    if(filename != "index.html" && filename != "more.html") {
	    		    $("div.ui-content").each(function() {
                        var dr = $(this).attr("data-role");
                        if(dr == "content") {
                            $(this).addClass("additonal-padding");
	    		        }
                });
	    		}
	        });
	    

	                  $(document).ready(function() {
                          document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
                      });
				
                      function onDeviceReadyChildBrowser() {
                          $("a.open-child-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.openExternal(goUrl);
				              window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share Lynne Drew", null, null, "https://play.google.com/store/apps/details?id=com.a1842967561506235187e4805a.a74054957a");
    			    return false;
                });
            });
    	

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"Lynne Drew", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            

		
function numbermificate(str) {
    return str.replace(/[^0-9\.]+/g, '');
}
		
function addCommas(nStr)
{
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}
		
function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}
		
function resetCalculator()
{
$('#billAmount').val('');
$('#tipPercent').val('15');
$('#noPeople').val('1');
 $('#tipAmount').val('');
  $('#totalWithTip').val('');
  $('#eachPersonPays').val('');
}
		
		
function calculateTip()
{
  var billAmount = parseFloat(numbermificate($('#billAmount').val()));
  if (isNaN(billAmount)) billAmount = 0.0;
  $('#billAmount').val(addCommas(roundNumber(billAmount,2)));
		
  var tipPercent = parseFloat(numbermificate($('#tipPercent').val()));
  if (isNaN(tipPercent)) tipPercent = 0.0;
  $('#tipPercent').val(tipPercent);
		
  var noPeople = parseInt(numbermificate($('#noPeople').val()));
  if (isNaN(noPeople)) noPeople = 1;
  if (noPeople < 1) noPeople = 1;
  $('#noPeople').val(noPeople);
		
  var tipAmount = 0;
  var totalWithTip = 0;
  var eachPersonPays = 0;
		
  tipAmount = (tipPercent / 100) * billAmount;
  totalWithTip = tipAmount + billAmount;
  eachPersonPays = totalWithTip / noPeople;
		
		
  $('#tipAmount').val(addCommas(roundNumber(tipAmount,2)));
  $('#totalWithTip').val(addCommas(roundNumber(totalWithTip,2)));
  $('#eachPersonPays').val(addCommas(roundNumber(eachPersonPays,2)));
}


                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=billCalculator&appId=1842967561506235187e4805.74054957\"/>");}).fail(function( jqxhr, textStatus, error ) {});







	        //hack to add padding to module pages, except index/more
	    	$(document).ready(function() {
	            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			    if(filename != "index.html" && filename != "more.html") {
	    		    $("div.ui-content").each(function() {
                        var dr = $(this).attr("data-role");
                        if(dr == "content") {
                            $(this).addClass("additonal-padding");
	    		        }
                });
	    		}
	        });
	    

	                  $(document).ready(function() {
                          document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
                      });
				
                      function onDeviceReadyChildBrowser() {
                          $("a.open-child-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.openExternal(goUrl);
				              window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share Lynne Drew", null, null, "https://play.google.com/store/apps/details?id=com.a1842967561506235187e4805a.a74054957a");
    			    return false;
                });
            });
    	

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"Lynne Drew", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            


		
      var geocoder;
	  var distance;
      var bounds = new google.maps.LatLngBounds();
      var destination = 'Mudgeeraba';
	  var distanceLimit= 2;
	  var gotResult=0;
		
function onBodyLoad() {
		
	  		document.addEventListener("deviceready", onDeviceReadyGPS, false);
   
    //if( navigator.userAgent.match(/Android/i) ) {
    //         onDeviceReadyGPS();
    //} else if (typeof navigator.device == "undefined"){
    //        document.addEventListener("deviceready", onDeviceReadyGPS, false);
    //} else {
    //         onDeviceReadyGPS();
    //}
}
		
		
		
function onDeviceReadyGPS() {
//alert('onDeviceReady started');
	  timeMsg();
	 
	  var networkState = navigator.network.connection.type;
	  		//console.log('Network State: ' + networkState);
      if (networkState==Connection.NONE){
          //no point trying to get live html
          navigator.geolocation.getCurrentPosition(middleMan);
	  		//console.log('No network');
      } else {
          var url = 'http://skybuilder.net/gpsCoupon.php?a=1842967561506235187e4805.74054957&v=1.03';
   	    $.ajax({
            url: url,
            dataType: 'jsonp',
        }).always(function(data, textStatus, jqXHR) {
          		if(textStatus == 'success') {
   	                if(parseInt(data.hasSuccess) == 1) {
	  		            $('#onlineSuccessMessage').html(data.successHtml);
	  		        }
	  		        if(parseInt(data.hasFail) == 1) {
	  		             $('#onlineFailMessage').html(data.failHtml);
	  		        }
          		}
            navigator.geolocation.getCurrentPosition(middleMan);
        });
      }
		
}
		
	  function middleMan(position){
	  //alert('middleMan started');
	 calculateDistances(position);
	  }
		
      function calculateDistances(position) {
	  var latitude=position.coords.latitude;
	var longitude=position.coords.longitude;
	//alert('Lat:' + latitude);
	//alert('Lng:' + longitude);
	  var origin = new google.maps.LatLng(latitude, longitude);
	  geocoder = new google.maps.Geocoder();
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: [origin],
            destinations: [destination],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.IMPERIAL,
            avoidHighways: false,
            avoidTolls: false
          }, callback);
		
      }
		
      function callback(response, status) {
	  //alert('1');
          		console.log('STATUS: '+ status);
          		console.log(JSON.stringify(response));
          		$('#radarDiv').hide();
        if (status != google.maps.DistanceMatrixStatus.OK) {
          //alert('Error was: ' + status);
          		 if($('#onlineFailMessage').html() != '') {
          		        $('#onlineFailMessage').show();
          		    } else {
          		        $('#offlineFailMessage').show();
          		    }
        } else {
		//alert('2');
          var origins = response.originAddresses;
          var destinations = response.destinationAddresses;
          var exceptionError = false;
//alert('3');
         for (var i = 0; i < origins.length; i++) {
      
             var results = response.rows[i].elements;
             for (var j = 0; j < results.length; j++) {
             	if(gotResult == 1)
         	 		break;
			    var element = results[j];
          		if(element.status == 'ZERO_RESULTS') {
          	    	if($('#onlineFailMessage').html() != '') {
          		        $('#onlineFailMessage').show();
          		    } else {
          		        $('#offlineFailMessage').show();
          		    }
          		} else {
                    var distance = parseFloat(element.distance.text);
				    //distance = distance / 1609.344; //not needed, google service already set to imperial?
								 //alert('Dist:' + distance + 'limit: ' + distanceLimit);
								 gotResult=1;
				    if (distance<distanceLimit){
					    if($('#onlineSuccessMessage').html() != '') {
          		            $('#onlineSuccessMessage').show();
          		        } else {
          		            $('#offlineSuccessMessage').show();
          		        }
		
				    } else{
				        if($('#onlineFailMessage').html() != '') {
          		            $('#onlineFailMessage').show();
          		        } else {
          		            $('#offlineFailMessage').show();
          		        }
				    }
          		}
            }
          }
        }
      }
		
		
function timeMsg()
{
var t=setTimeout('alertMsg()',20000);
}
function alertMsg()
{
//alert('timeout');
if (gotResult==0){
if($('#onlineFailMessage').html() != '') {
          		        $('#onlineFailMessage').show();
          		    } else {
          		        $('#offlineFailMessage').show();
          		    }
}
}


                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=gpsCoupons&appId=1842967561506235187e4805.74054957\"/>");}).fail(function( jqxhr, textStatus, error ) {});







	        //hack to add padding to module pages, except index/more
	    	$(document).ready(function() {
	            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			    if(filename != "index.html" && filename != "more.html") {
	    		    $("div.ui-content").each(function() {
                        var dr = $(this).attr("data-role");
                        if(dr == "content") {
                            $(this).addClass("additonal-padding");
	    		        }
                });
	    		}
	        });
	    

	                  $(document).ready(function() {
                          document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
                      });
				
                      function onDeviceReadyChildBrowser() {
                          $("a.open-child-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.openExternal(goUrl);
				              window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share Lynne Drew", null, null, "https://play.google.com/store/apps/details?id=com.a1842967561506235187e4805a.a74054957a");
    			    return false;
                });
            });
    	

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"Lynne Drew", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            


          var pictureSource;   // picture source
            var destinationType; // sets the format of returned value
            var destinationTypeData;
            var albumButton;
            var libraryButton;
            var cameraButton;
            var resetButton;
		    var emailComposerObj;
		
            function OnBodyLoadCamera() {
               document.addEventListener("deviceready",onDeviceReadyCamera,false);
                  $("#select-photo-wrapper").show();
            }
		
		
            function onDeviceReadyCamera() {
		
                pictureSource=navigator.camera.PictureSourceType;
                destinationType=navigator.camera.DestinationType;
		
                albumButton = document.getElementById("select-photo-album-button");
                cameraButton = document.getElementById("take-photo-button");
                resetButton = document.getElementById("send-photo-reset");
                destinationTypeData = destinationType.FILE_URI;
		
                $("#send-photo-submit").click(function() {
                    console.log("SEND VIA WEBINTENT");
                    var extras = {};
                    extras[WebIntent.EXTRA_SUBJECT] = "Photo from Lynne Drew";
                    extras[WebIntent.EXTRA_TEXT] = $("textarea#emailPhotoMessage").val();
                    extras[WebIntent.EXTRA_STREAM] = $("#emailPhotoLocation").val();
                    extras[WebIntent.EXTRA_EMAIL] = "lynne@lynnedrew.com";
                    window.plugins.webintent.startActivity({
                       action: WebIntent.ACTION_SEND,
                       type: 'image/jpeg',
                       extras: extras
                    },
                    function() {
                        $("#photo-container").html("");
                        navigator.notification.alert("Thank you!", false, "Thank you", "Close");
                        $("textarea#emailPhotoMessage").val("");
                        $("#emailPhotoLocation").val("");
                        $("#send-photo-submit-container").hide();
                        $("#select-photo-wrapper").show();
                    },
                    function() {
                        $("#photo-container").html("<p><strong>Sorry - failed to send Photo. Please try again.</stong></p>");
                    }
                    );
                    return false;
                });
		                    		
                $("#send-photo-submit-container").hide();
               
                albumButton.addEventListener("click", getFromAlbum, false);
		
                cameraButton.addEventListener("click", takeFromCamera, false);
                resetButton.addEventListener("click", resetForm, false);
            }
		
            function emailComposerCb() {
                    $("#photo-container").html("");
                    $("textarea#emailPhotoMessage").val("");
                    $("#emailPhotoLocation").val("");
                    $("#send-photo-submit-container").hide();
                    $("#select-photo-wrapper").show();
                    navigator.notification.alert("Thank you!", false, "Thank you", "Close");
            }
		
            function resetForm() {
                navigator.notification.confirm("Reset the Form?", function(button) {
   	                if(parseInt(button) == 1) {
                        $("textarea#emailPhotoMessage").val("");
                        $("#emailPhotoLocation").val("");
                        $("#send-photo-submit-container").hide();
                        $("#select-photo-wrapper").show();
		                $("#photo-container").html("");
   	                }
                }, "Reset the Form?","OK,Cancel")
            }
		
            function getFromLibrary() {
               // alert("GET FROM LIBRARY");
                getPhoto(pictureSource.PHOTOLIBRARY);
                return false;
            }
		
            function getFromAlbum() {
                //alert("GET FROM ALBUM");
                getPhoto(pictureSource.SAVEDPHOTOALBUM);
                return false;
            }
		
            function takeFromCamera() {
                console.log("TAKE A PHOTO");
                capturePhoto();
                return false;
            }
              
            function capturePhoto() {
                // Take picture using device camera and retrieve image as a URI
                navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 49, destinationType: destinationTypeData });
            }
          
            function getPhoto(source) {
                // Retrieve image file location from specified source
                //console.log("GET PHOTO FROM " + source);
                navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 49,
                destinationType: destinationTypeData,
                sourceType: source });
            }
		
            function onPhotoURISuccess(imageData) {
		
                var imageURI;
                imageURI = imageData;
                $("#emailPhotoLocation").val(imageURI);
                $("#photo-container").html('<img src="'+imageURI+'" style="width:90%;display:block;margin-left:auto;margin-right:auto;" id="photo-to-send" />');
		
                $("#send-photo-submit-container").show();
                $("#select-photo-wrapper").hide();
            }
		
            function onFail(message) {
                $("#photo-container").html("<p><strong>Sorry - failed to get Photo ("+message+"). Please try again.</stong></p>");
                console.log("GET PHOTO Failed because: " + message);
                $("#select-photo-wrapper").show();
            }
        

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=emailPhoto&appId=1842967561506235187e4805.74054957\"/>");}).fail(function( jqxhr, textStatus, error ) {});







	        //hack to add padding to module pages, except index/more
	    	$(document).ready(function() {
	            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			    if(filename != "index.html" && filename != "more.html") {
	    		    $("div.ui-content").each(function() {
                        var dr = $(this).attr("data-role");
                        if(dr == "content") {
                            $(this).addClass("additonal-padding");
	    		        }
                });
	    		}
	        });
	    

	                  $(document).ready(function() {
                          document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
                      });
				
                      function onDeviceReadyChildBrowser() {
                          $("a.open-child-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.openExternal(goUrl);
				              window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share Lynne Drew", null, null, "https://play.google.com/store/apps/details?id=com.a1842967561506235187e4805a.a74054957a");
    			    return false;
                });
            });
    	

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"Lynne Drew", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            

		
   	        var scanButton;
        	var resultSpan;
		
   	 $(document).ready(function() {
   	    scanButton = document.getElementById("scan-button");
        resultSpan = document.getElementById("scan-result");
   	                document.addEventListener("deviceready", onDeviceReadyBarcodeScanner, false);
    });
		
    // Cordova is loaded and it is now safe to make calls Cordova methods
    //
    function onDeviceReadyBarcodeScanner() {
        // Now safe to use the Cordova API
   	                console.log("BARCODE SCANNER ONDEVICEREADY");
    scanButton.addEventListener("click", clickScan, false);
    }
		
		
		
    function clickScan() {
	    //var scanner = cordova.require("cordova/plugin/BarcodeScanner");
        cordova.plugins.barcodeScanner.scan(scannerSuccess, scannerFailure);
	}
		
		
//------------------------------------------------------------------------------
function scannerSuccess(result) {
   	if(result.cancelled == false) {
   	    $("#touch-to-scan").hide();
   	    $("#post-scan-container").show();
   	    var returnedText = result.text;
   	    var scannedFormat = result.format;
   	    resultSpan.innerHTML = replaceURLWithHTML(returnedText);
		
   	    $("#post-scan").click(function() {
            $("#post-scan-container").hide();
   	        $("#touch-to-scan").show();
   	        resultSpan.innerHTML = "";
   	        return false;
        });
   	}
}
		
//------------------------------------------------------------------------------
function scannerFailure(message) {
    //console.log("scannerFailure: message: " + message)
    resultSpan.innerText = "failed to Scan: " + message;
}
		
function replaceURLWithHTML(text) {
    var expUrl = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    var expImg = /(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*\.(?:jpg|gif|png))(?:\?([^#]*))?(?:#(.*))?/ig;
		
    if(text.match(expUrl)) {
        //is URL format
        if(text.match(expImg)) {
            //is link to image
            return text.replace(expUrl,'<img src="$1">');
        } else { 
            window.open(text, "_blank", "location=yes")
            return text.replace(expUrl,'<a href="$1" class="open-external-browser" data-gourl="$1">$1</a>');
         
        }
    } else {
        return text;
    }
}
		
		
    

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=barcodescanner&appId=1842967561506235187e4805.74054957\"/>");}).fail(function( jqxhr, textStatus, error ) {});







	        //hack to add padding to module pages, except index/more
	    	$(document).ready(function() {
	            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			    if(filename != "index.html" && filename != "more.html") {
	    		    $("div.ui-content").each(function() {
                        var dr = $(this).attr("data-role");
                        if(dr == "content") {
                            $(this).addClass("additonal-padding");
	    		        }
                });
	    		}
	        });
	    

	                  $(document).ready(function() {
                          document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
                      });
				
                      function onDeviceReadyChildBrowser() {
                          $("a.open-child-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.openExternal(goUrl);
				              window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share Lynne Drew", null, null, "https://play.google.com/store/apps/details?id=com.a1842967561506235187e4805a.a74054957a");
    			    return false;
                });
            });
    	

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"Lynne Drew", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            

		$(document).ready(function() {
			$.mobile.loading( "show", {
				text: "Loading, please wait...",
				textVisible: true
			});
		});
		
		
var calURL = "https://www.google.com/calendar/feeds/fe61fd6neu2i9a48u45b5fti90%40group.calendar.google.com/public/full?orderby=starttime&sortorder=descending&max-results=99";
//var calendarXML;
//var items;
		
function pageInit(){
	$.get(calURL,function(data,status){
	    //alert("Data: " + data + "\nStatus: " + status);
			//alert(data);
			parser=new DOMParser();
	  
			var xmlDoc = $.parseXML(data); //parser.parseFromString(data,"text/xml");
			//items = calendarXML.getElementsByTagName("entry");
			$xml = $(xmlDoc);
			$items = $xml.find("entry");
		
			//alert($items.length);
			//$.each($items, parseCalendarXML(index, value));
		
			for (var i = 0; i < $items.length; i++){
				parseCalendarXML(i, $items.get(i));
			}
		
			$.mobile.loading( "hide");
		
			$("#linksList").html(mainList + pastList);
		    $("#linksList").listview("refresh");
			$(".news-item").each(function(pff,pfft){
		    	$(this).removeClass("ui-btn-up-c").addClass("ui-body-c");
		    });
		
	  }, "text");
		
	/*
	var request = new XMLHttpRequest();
	request.open("GET", calURL, true);
	request.onreadystatechange = function(){
	    if (request.readyState == 4) {
	        if (request.status == 200 || request.status == 0) {
	            calendarXML = request.responseXML;
	        }
	    }
	}
	request.send();
	var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(calendarXML,"text/xml");
	*/
}
var title,
	summary,
	content,
	when,
	where,
	link,
	mainList = '';
	pastList = '';
		
function parseCalendarXML(i, v){
	//alert($(v).find("title").text());
	title = $(v).find("title").text();
	summary = $(v).find("summary").text();
	content = $(v).find("content").text();
	when = $(v).find("when").attr("startTime");
	var startDate = new Date(when).toUTCString();
	//where = $(v).find("where).attr("valueString");
	link = $(v).find("link[title='alternate']").attr("href");
	link = link.replace("event?", "mevent?");
		
		
	try{
	if (Date.parse(new Date(when)) > Date.parse(new Date())){
		
		var mainListTemp = '<li style="white-space:normal" class="news-item"><center><h2 style="white-space:normal">' + title + '</h2></center><p style="white-space:normal">When: ' + startDate + '<br/><br/>' +content + '</p><p style="text-align:right">';mainListTemp += '<a rel="external" href="'+link+'" data-gourl="'+ link + '" class="open-external-browser">View Event</a></p></li>';
		mainList = mainListTemp + mainList;
	}
	else{
		var pastListTemp = '<li style="white-space:normal" class="news-item"><center><h2 style="white-space:normal">' + title + '</h2></center><p style="white-space:normal">When: ' + startDate + '<br/><br/>' +content + '</p><p style="text-align:right">';pastListTemp += '<a rel="external" href="'+link+'" data-gourl="'+ link + '" class="open-external-browser">View Event</a></p></li>';
		pastList += pastListTemp;
	}
	}catch(err){
		alert(err);
	}
}


                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=googleCalendar&appId=1842967561506235187e4805.74054957\"/>");}).fail(function( jqxhr, textStatus, error ) {});
pageInit();







	        //hack to add padding to module pages, except index/more
	    	$(document).ready(function() {
	            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			    if(filename != "index.html" && filename != "more.html") {
	    		    $("div.ui-content").each(function() {
                        var dr = $(this).attr("data-role");
                        if(dr == "content") {
                            $(this).addClass("additonal-padding");
	    		        }
                });
	    		}
	        });
	    

	                  $(document).ready(function() {
                          document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
                      });
				
                      function onDeviceReadyChildBrowser() {
                          $("a.open-child-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.openExternal(goUrl);
				              window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share Lynne Drew", null, null, "https://play.google.com/store/apps/details?id=com.a1842967561506235187e4805a.a74054957a");
    			    return false;
                });
            });
    	

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"Lynne Drew", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            

	     $(document).ready(function() {
	        $("div.modLinks a").each(function(index) {
                var goUrl = $(this).attr("href");
					if (/^(f|ht)tps?:\/\//i.test(goUrl)) {
                        $(this).addClass("open-external-browser");
                        $(this).attr("data-gourl",goUrl);
					}
            });
			             $("a.open-external-browser").click(function() {
             //alert("external-browser");
                 var goUrl = $(this).attr("data-gourl");
              //  alert(goUrl);
                 //window.plugins.childBrowser.openExternal(goUrl);
					window.open(goUrl, "_blank", "location=yes")
                 return false;
            // });
             });
		
		
        });
	

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered&appId=1842967561506235187e4805.74054957\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered&appId=1842967561506235187e4805.74054957\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered&appId=1842967561506235187e4805.74054957\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered&appId=1842967561506235187e4805.74054957\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered&appId=1842967561506235187e4805.74054957\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered&appId=1842967561506235187e4805.74054957\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered&appId=1842967561506235187e4805.74054957\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered&appId=1842967561506235187e4805.74054957\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered&appId=1842967561506235187e4805.74054957\"/>");}).fail(function( jqxhr, textStatus, error ) {});







	        //hack to add padding to module pages, except index/more
	    	$(document).ready(function() {
	            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			    if(filename != "index.html" && filename != "more.html") {
	    		    $("div.ui-content").each(function() {
                        var dr = $(this).attr("data-role");
                        if(dr == "content") {
                            $(this).addClass("additonal-padding");
	    		        }
                });
	    		}
	        });
	    

	                  $(document).ready(function() {
                          document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
                      });
				
                      function onDeviceReadyChildBrowser() {
                          $("a.open-child-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.openExternal(goUrl);
				              window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share Lynne Drew", null, null, "https://play.google.com/store/apps/details?id=com.a1842967561506235187e4805a.a74054957a");
    			    return false;
                });
            });
    	

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"Lynne Drew", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            


   	        var rewardObject = false;
   	        var dbRewardObject = false;
            var scanButton;
        	var claimButton;
   	        var scanWaitMessage;
   	        var db;
   	        var rewardContainer;
   	        var rewardProgress;
   	        var noTicks;
   	        var noTicksRequired;
   	        var noSecondsBetweenScans;
   	        var scanCode = "093779400-1394693132788895065321540ce4f5b544915102";
   	        var lastScan;
   	        var carrotLocalFile;
   	        var rewardLocalFile;
   	        var rewardExists = false;
   	                
   	                
   	        $(document).ready(function() {
   	            scanButton = document.getElementById("scan-button");
                claimButton = document.getElementById("claim-reward-ok-button");
   	            scanWaitMessage = document.getElementById("scan-wait");
   	            rewardContainer = document.getElementById("reward");
   	            rewardProgress = document.getElementById("reward-progress");
   	            
   	            $("#scan-wait").click(function(){return false;});
   	            $("#claim-reward-cancel-button").click(function(){$( "#claimDialog" ).dialog( "close" );return false;});
   	            
   	            document.addEventListener("deviceready", onDeviceReadyLoyaltyCard, false);
   	            $("claim-reward-button-wrapper").hide();
   	            $("#reward").show();
   	            $("#scan-button").hide();
   	            $("#scan-wait").hide();
   	            $("#scan-error").hide();
   	            $("#scan-error").html("");
   	            //rewardContainer.innerHTML = "<p>Getting reward info, please wait...</p>";
            });
   	                
   	        function onDeviceReadyLoyaltyCard() {
   	            db = getLoyaltyDb();
   	            db.transaction(initLoyaltyCardDb, errorCB, successCB);
                scanButton.addEventListener("click", clickScan, false);
   	            claimButton.addEventListener("click", claimReward, false);
   	            db = getLoyaltyDb();
   	            db.transaction(
   	                function(transaction) {
                        transaction.executeSql("SELECT * FROM REWARDPROGRESS WHERE isCurrent='1' LIMIT 1", 
   	                        [],
   	                        processGetRewardFromDbResult, errorCB);
                    }
   	            );
            }
   	        
   	                        
   	        function getLoyaltyDb() {
   	           var dbConn = window.sqlitePlugin.openDatabase("loyaltycard.db", "1.0", "Loyalty Card", 2000000);
   	           return dbConn;
   	        }
   	                
   	        function initLoyaltyCardDb(tx) {
                tx.executeSql("CREATE TABLE IF NOT EXISTS REWARDPROGRESS (hash,carrotUrl,carrotLocalFile,rewardUrl,rewardLocalFile,requiredScans,scanWait,noScans,lastScan,isCurrent)");
            }
   	                        
   	        function checkConnection() {
   	        		
   	        		return;
   	        		
                // There is no consistency on the format of reachability
                var networkState = navigator.connection.type;

   	            if(networkState == Connection.NONE) {
   	                $("#noNetworkPopup").popup("open",{y:"50",transition:"slidedown"});
   	                setTimeout(function(){$("#noNetworkPopup").popup("close");},4000);
   	            }
            }


   	                        
   	        function processGetRewardFromDbResult(tx,results) {
   	            if(results.rows.length == 0) {
   	                dbRewardObject = false;
   	            } else {
   	                dbRewardObject = results.rows.item(0);
   	            }
   	            
   	                        
   	            getCurrentRewardFromWeb();
   	            
   	            return true;
   	        }
   	                
   	        function getCurrentRewardFromWeb() {
   	            //rewardContainer.innerHTML = "<p>Getting latest reward, please wait...</p>";
   	            $.mobile.loading( "show", {
                    text: "Getting reward info, please wait...",
                    textVisible: true
                });
   	            $("#reward").show();
                    
                checkConnection();
   	                    
   	            var url = "http://skybuilder.net/reward.php?a=1842967561506235187e4805.74054957";
   	            $.ajax({
                    url: url,
                    dataType: 'jsonp',
                    timeout : 9000,
                    success:  function(data) {
   	                    console.warn(JSON.stringify(data));
   	                    if(data != null) {
   	                            console.warn("HAS DATA"); 	                    
   	                        if(data.hasReward.length >= 1) {
   	                            console.warn("HAS hasReward"); 	    
   	                            if(parseInt(data.hasReward) == 1) {
   	                            console.warn("hasReward == 1"); 	  
   	                                rewardObject = data;
   	                                db = getLoyaltyDb();
   	                                db.transaction(
   	                                    function(transaction) {
                                            transaction.executeSql("SELECT * FROM REWARDPROGRESS WHERE hash='"+rewardObject.hash+"' LIMIT 1", 
   	                                            [],
   	                                            processCheckRewardExists, errorCB);
                                        }
   	                                );
   	                            } else {
   	                                compareResults();
   	                            }
   	                        } else {
   	                            compareResults();
   	                        }
   	                    } else {
   	                        compareResults();
   	                    }
                    },
   	                error: function (xhr, ajaxOptions, thrownError) {
   	                    if(thrownError == "timeout") {
   	                        $("#noNetworkPopup").popup("open",{y:"50",transition:"slidedown"});
   	                        setTimeout(function(){$("#noNetworkPopup").popup("close");},4000);
   	                    }
   	                    console.warn(thrownError);
                        //$("#reward").html("<p>Error getting reward. Please try again later.");
   	                    compareResults();
                    }
                 });
   	        }
   	                            
   	        function processCheckRewardExists(tx,results) {
   	            if(results.rows.length == 0) {
   	                dbRewardObject = false;
   	            } else {
   	                tx.executeSql("UPDATE REWARDPROGRESS SET isCurrent='0'");
   	                tx.executeSql("UPDATE REWARDPROGRESS SET isCurrent='1' WHERE  hash='"+rewardObject.hash+"'");
   	                dbRewardObject = results.rows.item(0);
   	            }
   	                            
   	            compareResults();
   	        }
   	                            
   	        function compareResults() {
   	             $.mobile.loading( "hide");
   	             if(dbRewardObject == false && rewardObject == false) {
   	                 $("#reward").html("<p>No rewards available. Please try again later.");
   	                 return false;
   	             }

   	            if(rewardObject != false) {
   	                 //process the reward
   	                 console.warn("has rewardObject");
   	                 if(dbRewardObject != false) {
   	                     //check DB reward obj
   	                     if(dbRewardObject.hash != rewardObject.hash) {
   	                         console.warn("new record replacing old");
   	                         //new reward. Insert to DB, download image(s), and make current
   	                         db = getLoyaltyDb();
   	                         db.transaction(insertNewReward, errorCB, insertSuccessCB);
   	                         var params = {url:rewardObject.rewardUrl,hash:rewardObject.hash,suffix:"reward"};
   	                         downloadNewReward(params);
   	                         if(rewardObject.carrotImageUrl.length > 0) {
   	                            var params = {url:rewardObject.carrotImageUrl,hash:rewardObject.hash,suffix:"carrot"};
   	                            downloadNewReward(params);
   	                         }
   	                     } else {
   	                         displayReward();
   	                     }
   	                 } else {
   	                     console.warn("new record in blank DB");
   	                     console.warn(JSON.stringify(rewardObject));
   	                     //new reward. Insert to DB, download image(s), and make current
   	                     db = getLoyaltyDb();
   	                     db.transaction(insertNewReward, errorCB, insertSuccessCB);
   	                     var params = {url:rewardObject.rewardUrl,hash:rewardObject.hash,suffix:"reward"};
   	                     downloadNewReward(params);
   	                     if(rewardObject.carrotImageUrl.length > 0) {
   	                        var params = {url:rewardObject.carrotImageUrl,hash:rewardObject.hash,suffix:"carrot"};
   	                        downloadNewReward(params);
   	                     }
   	                 }
   	             } else {
   	                 displayReward();
   	             }
   	             
   	        }
   	                            
   	        function refreshDbRewardObject(tx,results) {
   	            
   	           
   	            if(results.rows.length == 0) {
   	                dbRewardObject = false;
   	            } else {
   	                dbRewardObject = results.rows.item(0);
   	            }
   	                            
   	            displayReward();
   	            return true;
   	        }
   	                            
   	        function insertNewReward(tx) {
   	            tx.executeSql("UPDATE REWARDPROGRESS SET isCurrent='0'");
   	            var sql = "INSERT INTO REWARDPROGRESS(hash,carrotUrl,carrotLocalFile,rewardUrl,rewardLocalFile,requiredScans,scanWait,noScans,lastScan,isCurrent) VALUES('"+rewardObject.hash+"','"+rewardObject.carrotImageUrl+"','','"+rewardObject.rewardUrl+"','','"+rewardObject.noScans+"','"+rewardObject.waitSeconds+"','0','0','1')";
   	            tx.executeSql(sql);
   	        }
   	                            
   	        function displayReward() {
   	            if(dbRewardObject == false) {
   	                $("#reward").html("<p>Error. Please try again later.");
   	            } else {
   	                var carrotUrl;
   	                var rewardUrl;
   	                            
   	                if(dbRewardObject.carrotLocalFile.length > 0) {
   	                    carrotUrl = dbRewardObject.carrotLocalFile;
   	                } else {
   	                    carrotUrl = dbRewardObject.carrotUrl;
   	                }
   	                            
   	                if(dbRewardObject.rewardLocalFile.length > 0) {
   	                    rewardUrl = dbRewardObject.rewardLocalFile;
   	                } else {
   	                    rewardUrl = dbRewardObject.rewardUrl;
   	                }
   	                   	                            
   	                noTicks = parseInt(dbRewardObject.noScans);
   	                lastScan = parseInt(dbRewardObject.lastScan);
   	                noSecondsBetweenScans = parseInt(dbRewardObject.scanWait);
   	                noTicksRequired = parseInt(dbRewardObject.requiredScans);
   	                if(noTicks == noTicksRequired) {
   	                    $("#reward").html("<img src=\""+rewardUrl+"\" style=\"width:95%;display:block;margin-left:auto;margin-right:auto;\" />");
   	                    $("#claim-reward-button-wrapper").show();
   	                    $("#scan-button").hide();
   	                    $("#scan-wait").hide();
   	                } else {
   	                            
   	                    if(carrotUrl.length > 0) {
   	                        $("#reward").html("<img src=\""+carrotUrl+"\" style=\"width:95%;display:block;margin-left:auto;margin-right:auto;\" />");
   	                    } else {
   	                        $("#reward").html("<img src=\""+rewardUrl+"\" style=\"width:95%;display:block;margin-left:auto;margin-right:auto;\" />");
   	                    }
   	                    var nowTime = Math.round(new Date().getTime() / 1000);
   	                    var nextValidScanTime = parseInt(lastScan + noSecondsBetweenScans);
   	                            
   	                    if(nextValidScanTime <= nowTime) {
   	                        $("#scan-button").show();
   	                        $("#scan-wait").hide();
   	                    } else {
   	                        var secondsToNextScan = nextValidScanTime - nowTime;
                            $("#scan-wait-text").text("Please wait...");
   	                        expiryCountdown(secondsToNextScan);
   	                        $("#scan-button").hide();
   	                        $("#scan-wait").show();
   	                    }
   	                    $("#claim-reward-button-wrapper").hide();
   	                }
   	                           
   	                generateTicks();
   	            }
   	        }
   	                            
   	                            
   	               	                                      
   	        function generateTicks() {
   	            $("#reward-progress").html("");
   	            var noTicksInt = parseInt(dbRewardObject.noScans);
   	            noTicksRequired = parseInt(dbRewardObject.requiredScans);
   	            var noToGo = parseInt(noTicksRequired) - noTicksInt;
   	            var blank = '<div style="float:left;"><img src="images/check_box_black.png" style="width:50px;" /></div>';
   	            var ticked = '<div style="float:left;"><img src="images/check_box_checked_black.png" style="width:50px;" /></div>';
   	            if(noTicksInt > 0) {
   	                for(i=1;i<=noTicksInt;i++) {
   	                    $("#reward-progress").append(ticked);
   	                }
   	            }
   	            for(i=1;i<=noToGo;i++) {
   	                $("#reward-progress").append(blank);
   	            }
   	        }
   	               	
   	        function clickScan() {
   	            $("#scan-error").hide();
   	            $("#scan-error").html("");
   			    //var scanner = cordova.require("cordova/plugin/BarcodeScanner");
                cordova.plugins.barcodeScanner.scan(scannerSuccess, scannerFailure);
            }
		
		
   	                            
   	        function claimReward() {
   	            db = getLoyaltyDb();
   	            db.transaction(updateDbWithClaim, errorCB);
   	        }
   	                            
   	        function updateDbWithClaim(tx) {
   	            $( "#claimDialog" ).dialog( "close" );
   	            var nowTime = Math.round(new Date().getTime() / 1000);
   	            noSecondsBetweenScans = parseInt(dbRewardObject.scanWait);
   	            var secondsToNextScan = parseInt(noSecondsBetweenScans);
   	            tx.executeSql("UPDATE REWARDPROGRESS SET noScans='0', lastScan='"+nowTime+"' WHERE hash='"+dbRewardObject.hash+"'");
   	            noTicks = 0;
                $("#scan-wait-text").text("Please wait...");
   	            expiryCountdown(secondsToNextScan);
   	            $("#claim-reward-button-wrapper").hide();
   	            $("#scan-button").hide();
   	            $("#scan-wait").show();
   	           // generateTicks();
   	                            
   	            var url = "http://skybuilder.net/reward.php?a=1842967561506235187e4805.74054957&h="+dbRewardObject.hash+"&c=1";
   	            $.ajax({
                    url: url,
                    dataType: 'jsonp',
                    success:  function(data) { }
                });
   	                            
   	            db = getLoyaltyDb();
   	            db.transaction(
   	                function(transaction) {
                        transaction.executeSql("SELECT * FROM REWARDPROGRESS WHERE isCurrent='1' LIMIT 1", 
   	                        [],
   	                        processGetRewardFromDbResult, errorCB);
                    }
   	            );
   	        }
   	                
   	        function errorCB(transaction, error) {
                console.warn("LC DB ERROR: "+JSON.stringify(error));
   	            return false;
            }
   	                           
   	        function successCB(transaction, results) {
                console.log("LC DB SUCCESS: "+JSON.stringify(results));
   	            return true;
            }
   	                            
   	        function insertSuccessCB(transaction, results) {
                console.log("LC DB INSERT SUCCESS: "+JSON.stringify(results));
   	            db = getLoyaltyDb();
   	            db.transaction(
   	                function(transaction) {
                        transaction.executeSql("SELECT * FROM REWARDPROGRESS WHERE isCurrent='1' LIMIT 1", 
   	                        [],
   	                        refreshDbRewardObject, errorCB);
                    }
   	            );
   	            return true;
            }
   	                            
   	        function updateDbWithLocalRewardFile(tx) {
   	            tx.executeSql("UPDATE REWARDPROGRESS SET rewardLocalFile='"+rewardLocalFile+"' WHERE hash='"+rewardObject.hash+"'");
   	        }
   	                            
   	        function updateDbWithLocalCarrotFile(tx) {
   	            tx.executeSql("UPDATE REWARDPROGRESS SET carrotLocalFile='"+carrotLocalFile+"' WHERE hash='"+rewardObject.hash+"'");
   	        }
   	                   
   	        //------------------------------------------------------------

        	function onRequestFileSystemSuccess(fileSystem) { 
                var entry=fileSystem.root; 
                entry.getDirectory("1842967561506235187e4805.74054957", {create: true, exclusive: false}, onGetDirectorySuccess, onGetDirectoryFail); 
            } 

            function onGetDirectorySuccess(dir) { 
                console.log("Created dir "+dir.name); 
            } 

            function onGetDirectoryFail(error) { 
                console.log("Error creating directory "+error.code); 
            } 
   	                    
   	        function downloadNewReward(params){
   	            console.log("Get " + params.suffix);
   	            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null); 

                window.requestFileSystem(
                    LocalFileSystem.PERSISTENT, 0, 
                    function onFileSystemSuccess(fileSystem) {
                        fileSystem.root.getFile("1842967561506235187e4805.74054957.html",
                            {create: true, exclusive: false}, 
                            function gotFileEntry(fileEntry) {
                                var sPath = fileEntry.fullPath.replace("1842967561506235187e4805.74054957.html","1842967561506235187e4805.74054957/");
   	                            console.warn("DUMMY PATH: "+sPath);
                                var fileTransfer = new FileTransfer();
                                fileEntry.remove();
                                console.warn("params.url: "+params.url);
                                fileTransfer.download(params.url,
                                    sPath + params.hash + "-"+params.suffix+".png",
                                    function(theFile) {
                                        console.log("download complete: " + theFile.toURL());
                                        //showLink(theFile.toURI());
                                        if(params.suffix == "reward") {
   	                                        rewardLocalFile = theFile.toURL();
                                            db = getLoyaltyDb();
   	                                        db.transaction(updateDbWithLocalRewardFile, errorCB,successCB);
                                        }
                                                
                                        if(params.suffix == "carrot") {
   	                                        carrotLocalFile = theFile.toURL();
                                            db = getLoyaltyDb();
   	                                        db.transaction(updateDbWithLocalCarrotFile, errorCB,successCB);
                                        }
                                    },
                                    function(error) {
                                        console.log("download error source " + error.source);
                                        console.log("download error target " + error.target);
                                        console.log("upload error code: " + error.code);
                                    }
                                );
                                            
                            }, 
                        dlFailed);
                    },
                    dlFailed);
                };
   	        
            function dlFailed() {}
   	                    
//----------------------------------------------------------------------------
   	                            
   	        function scannerSuccess(result) {
   	            if(result.cancelled == false) {
   	                if(result.text == scanCode) {
                        db = getLoyaltyDb();
   	                    db.transaction(updateDbWithProgress, errorCB);
   	                } else {
   	                    $("#scan-error").html("<p>Invalid QR Code - please check this is the correct QR Code and try again.</p>");
   	                    $("#scan-error").show();
   	                }
   	            }
   	        }
   	                            
   	        function scannerFailure(message) {
   	            $("#scan-error").html("<p>Sorry! There was an error scanning ("+message+"). Please try again");
   	            $("#scan-error").show();
   	        }
   	                            
   	        function updateDbWithProgress(tx) {
   	            noTicks++;
   	            var nowTime = Math.round(new Date().getTime() / 1000);
                noSecondsBetweenScans = parseInt(dbRewardObject.scanWait);
   	            var secondsToNextScan = parseInt(noSecondsBetweenScans);
   	            tx.executeSql("UPDATE REWARDPROGRESS SET noScans='"+noTicks+"', lastScan='"+nowTime+"' WHERE hash='"+dbRewardObject.hash+"'");
                                       
   	            db = getLoyaltyDb();
   	            db.transaction(
   	                function(transaction) {
                        transaction.executeSql("SELECT * FROM REWARDPROGRESS WHERE isCurrent='1' LIMIT 1", 
   	                        [],
   	                        refreshDbRewardObject, errorCB);
                    }
   	            );
   	        }
   	                            
   	        function expiryCountdown(start){
                var expireSeconds = parseInt(start);
                var end = 0 // change this to stop the counter at a higher value
                var refresh=1000; // Refresh rate in milli seconds
                if(expireSeconds >= end ){
                    mytime=setTimeout(function(){displayExpiryCountdown(expireSeconds)},refresh);
                } else {
   	                $("#scan-button").show();
   	                $("#scan-wait").hide();
   	            }
   	        }
   	                    
   	        function displayExpiryCountdown(expireSeconds) {
   	   	        expireSeconds = parseInt(expireSeconds);
       	        var days = Math.floor(expireSeconds / 86400); 
       	        var hours = Math.floor((expireSeconds - (days * 86400 ))/3600);
       	        var minutes = Math.floor((expireSeconds - (days * 86400 ) - (hours *3600 ))/60);
       	        var secs = Math.floor((expireSeconds - (days * 86400 ) - (hours *3600 ) - (minutes*60)));

   	   	        if(hours <=9) {
   	       	        hours = "0" + String(hours);
   	   	        } else {
   	       	        hours = String(hours);
   	   	        }
   	                    
   	   	        if(minutes <=9) {
   	       	        minutes = "0" + String(minutes);
   	   	        } else {
   	       	        minutes = String(minutes);
   	   	        }
   	                    
   	   	        if(secs <=9) {
   	       	        secs = "0" + String(secs);
   	   	        } else {
   	       	        secs = String(secs);
   	   	        }
   	                            
   	            var countHtml = "Next scan available in ";
   	            
   	            if(days > 0) {
   	                if(days == 1) {
   	                    countHtml += days + " Day, ";
   	                } else {
   	   	                countHtml += days + " Days, ";
   	                }
   	            }
   	            
   	            countHtml  += hours + ":" + minutes + ":" + secs;
   	                  	        
   	   	        $("#scan-wait-text").text(countHtml);
   
   	   	        expireSeconds = expireSeconds - 1;

       	        tt=expiryCountdown(expireSeconds);
   	        }

        

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=loyaltyCard&appId=1842967561506235187e4805.74054957\"/>");}).fail(function( jqxhr, textStatus, error ) {});







	        //hack to add padding to module pages, except index/more
	    	$(document).ready(function() {
	            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			    if(filename != "index.html" && filename != "more.html") {
	    		    $("div.ui-content").each(function() {
                        var dr = $(this).attr("data-role");
                        if(dr == "content") {
                            $(this).addClass("additonal-padding");
	    		        }
                });
	    		}
	        });
	    

	                  $(document).ready(function() {
                          document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
                      });
				
                      function onDeviceReadyChildBrowser() {
                          $("a.open-child-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.openExternal(goUrl);
				              window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share Lynne Drew", null, null, "https://play.google.com/store/apps/details?id=com.a1842967561506235187e4805a.a74054957a");
    			    return false;
                });
            });
    	

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"Lynne Drew", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=openingHours&appId=1842967561506235187e4805.74054957\"/>");}).fail(function( jqxhr, textStatus, error ) {});







	        //hack to add padding to module pages, except index/more
	    	$(document).ready(function() {
	            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			    if(filename != "index.html" && filename != "more.html") {
	    		    $("div.ui-content").each(function() {
                        var dr = $(this).attr("data-role");
                        if(dr == "content") {
                            $(this).addClass("additonal-padding");
	    		        }
                });
	    		}
	        });
	    

	                  $(document).ready(function() {
                          document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
                      });
				
                      function onDeviceReadyChildBrowser() {
                          $("a.open-child-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.openExternal(goUrl);
				              window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share Lynne Drew", null, null, "https://play.google.com/store/apps/details?id=com.a1842967561506235187e4805a.a74054957a");
    			    return false;
                });
            });
    	

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"Lynne Drew", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            

	    	
    $(document).ready(function() {
    document.body.addEventListener('touchmove', function(e) {
                    e.preventDefault();
                }, false);/*
if(screen.height>550){
        $("body").css("background","url(\"index.png\")");
        $("body").css("backgroundSize","100% 100%");
        $(".ui-page").css("background","url(\"index.png\")");
        $(".ui-page").css("backgroundImage","url(\"index.png\")");
        $(".ui-page").css("backgroundSize","100% 100%");
        }
        else{
        $("body").css("background","url(\"index.png\")");
        $("body").css("backgroundSize","100% 100%");
        $(".ui-page").css("background","url(\"index.png\")");
        $(".ui-page").css("backgroundImage","url(\"index.png\")");
        $(".ui-page").css("backgroundSize","100% 100%");
        }*/
    });
    
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=index&appId=1842967561506235187e4805.74054957\"/>");}).fail(function( jqxhr, textStatus, error ) {});







	        //hack to add padding to module pages, except index/more
	    	$(document).ready(function() {
	            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			    if(filename != "index.html" && filename != "more.html") {
	    		    $("div.ui-content").each(function() {
                        var dr = $(this).attr("data-role");
                        if(dr == "content") {
                            $(this).addClass("additonal-padding");
	    		        }
                });
	    		}
	        });
	    

	                  $(document).ready(function() {
                          document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
                      });
				
                      function onDeviceReadyChildBrowser() {
                          $("a.open-child-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.openExternal(goUrl);
				              window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share Lynne Drew", null, null, "https://play.google.com/store/apps/details?id=com.a1842967561506235187e4805a.a74054957a");
    			    return false;
                });
            });
    	

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"Lynne Drew", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            


function find_payment(PR, IN, TE, PE) {
var PAY
try {
	IN = IN / (PE * 100)

	PAY = (PR * IN) / (1 - Math.pow(1 + IN, -(TE * PE)))
	PAY = PAY.toFixed(2)
	if (PAY == "NaN"){
		throw "ErrorNaN"
	}
}
catch(error) {
PAY = "Ooops."
}

document.getElementById("payment").value = PAY

}

function find_principle(PA, IN, TE, PE){
var PR
try {
	IN = IN / (PE * 100)

	PR = PA / IN * (1 - Math.pow(1 + IN, -(TE * PE)))
	PR = PR.toFixed(2)

	if (PR == "NaN"){
			throw "ErrorNaN"
	}
}
catch(error){
	PR = "Ooops."
}

document.getElementById("principle").value = PR

}



                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=mortgageCalculator&appId=1842967561506235187e4805.74054957\"/>");}).fail(function( jqxhr, textStatus, error ) {});







	        //hack to add padding to module pages, except index/more
	    	$(document).ready(function() {
	            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			    if(filename != "index.html" && filename != "more.html") {
	    		    $("div.ui-content").each(function() {
                        var dr = $(this).attr("data-role");
                        if(dr == "content") {
                            $(this).addClass("additonal-padding");
	    		        }
                });
	    		}
	        });
	    

	                  $(document).ready(function() {
                          document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
                      });
				
                      function onDeviceReadyChildBrowser() {
                          $("a.open-child-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.openExternal(goUrl);
				              window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share Lynne Drew", null, null, "https://play.google.com/store/apps/details?id=com.a1842967561506235187e4805a.a74054957a");
    			    return false;
                });
            });
    	

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"Lynne Drew", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            

			var latitude = "";
			var longitude = "";
			var zRssOptions = {
				                       header: false,
                                       moretext: "Read More",
                                       snippet: false,
                                       moreclass: "open-external-browser",
	                              };
					
        $(document).ready(function() {
            $.mobile.loading( "show", {
                text: "Loading, please wait...",
                textVisible: true
            });
			
			
				    if( navigator.userAgent.match(/Android/i) ) {
                        onDeviceReadyLocalEvents();
                    } else if (typeof navigator.device == "undefined"){
                        document.addEventListener("deviceready", onDeviceReadyLocalEvents, false);
                    } else {
                        onDeviceReadyLocalEvents();
                    } 
						
					function onDeviceReadyLocalEvents() {
                        navigator.geolocation.getCurrentPosition(setLatLong);
                    }
						
					function setLatLong(position) {
						latitude=position.coords.latitude;
                        longitude=position.coords.longitude;
						getRss();
					}
				
				
        });
					
				function getRss() {
				    $("#rss-content").rssfeed("http://www.eventbrite.com/directoryxml/?lat=" + latitude + "&lng=" + longitude +"", zRssOptions,
	                               function() {
	                                   $.mobile.loading("hide");
						               resizeRssImages();
	                               }
	                       );	
			    }
			
                

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=localEvents&appId=1842967561506235187e4805.74054957\"/>");}).fail(function( jqxhr, textStatus, error ) {});







	        //hack to add padding to module pages, except index/more
	    	$(document).ready(function() {
	            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			    if(filename != "index.html" && filename != "more.html") {
	    		    $("div.ui-content").each(function() {
                        var dr = $(this).attr("data-role");
                        if(dr == "content") {
                            $(this).addClass("additonal-padding");
	    		        }
                });
	    		}
	        });
	    

	                  $(document).ready(function() {
                          document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
                      });
				
                      function onDeviceReadyChildBrowser() {
                          $("a.open-child-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.openExternal(goUrl);
				              window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share Lynne Drew", null, null, "https://play.google.com/store/apps/details?id=com.a1842967561506235187e4805a.a74054957a");
    			    return false;
                });
            });
    	

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"Lynne Drew", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share Lynne Drew", null, null, "https://play.google.com/store/apps/details?id=com.a1842967561506235187e4805a.a74054957a");
    			    return false;
                });
            });
    	







	        //hack to add padding to module pages, except index/more
	    	$(document).ready(function() {
	            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			    if(filename != "index.html" && filename != "more.html") {
	    		    $("div.ui-content").each(function() {
                        var dr = $(this).attr("data-role");
                        if(dr == "content") {
                            $(this).addClass("additonal-padding");
	    		        }
                });
	    		}
	        });
	    

	                  $(document).ready(function() {
                          document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
                      });
				
                      function onDeviceReadyChildBrowser() {
                          $("a.open-child-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.openExternal(goUrl);
				              window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share Lynne Drew", null, null, "https://play.google.com/store/apps/details?id=com.a1842967561506235187e4805a.a74054957a");
    			    return false;
                });
            });
    	

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"Lynne Drew", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            







	        //hack to add padding to module pages, except index/more
	    	$(document).ready(function() {
	            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			    if(filename != "index.html" && filename != "more.html") {
	    		    $("div.ui-content").each(function() {
                        var dr = $(this).attr("data-role");
                        if(dr == "content") {
                            $(this).addClass("additonal-padding");
	    		        }
                });
	    		}
	        });
	    

	                  $(document).ready(function() {
                          document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
                      });
				
                      function onDeviceReadyChildBrowser() {
                          $("a.open-child-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.openExternal(goUrl);
				              window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share Lynne Drew", null, null, "https://play.google.com/store/apps/details?id=com.a1842967561506235187e4805a.a74054957a");
    			    return false;
                });
            });
    	

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"Lynne Drew", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            

		
//-----------------error messages and default text(for foreign language integration)-----------------//
var errorPoorAcc = "Could not get a reliable location. Please try again.";
var errorUnsupportedFeature = "Sorry, your device does not appear to support this feature.";
var confirmOverwrite = "Are you sure? This will delete any previously saved location.";
var notifyPositionSaved = "Location saved successfully.";
var notifyGettingPos = "Getting your position...";
var allowReducedAccMessage = "Could not get a reliable position. Would you like to allow reduced accuracy?"
var noGPSMessage = "Could not activate GPS. Please check that GPS is enabled on your device."
var disclaimerMessage = "Accuracy may vary and will depend on GPS signal.";
		
var btnTextSaveLocation = "Save Location";
var btnTextFindCar = "Find Your Car";
var btnTextCancel = "Cancel Search";
		
//-------------------------------------creating global variables-------------------------------------//
		
//HTML elements
var windowHeight = null,
	windowWidth = null;
	gpsLoading = null,
	btnSaveLocation = null,
	btnFindCar = null;
		
//position data
var watchId = null,
	compassId = null,
	curLat = null, curLong = null, curAcc = 20000, curHeading = null,
	bearing = 0;
var geoSuccess = null;
var compassMode = false;
var allowReducedAcc = false;
var targetAcc = 30;
var gettingInput = false;
		
//asynchroness calls
var accuracyInterval = null, headingInterval = null;
		
		
//canvas elements
var arrow = null,
	shadow = null,
	ctx = null,
	drawInterval = null;
		
		
		
//-----------------------------------------Initialize data-----------------------------------------//
//$(document).ready(function() {
function initializeData(){
	//$("#btnSave").text("Save Location");
	//$("#btnSearch").text(btnTextFindCar);
	//alert($("#btnSave").text());
	$("#btnSave").click(function(){saveLocation();});
	$("#btnSearch").click(function(){startSearch();});
	$("#btnCancel").click(function(){startSearch();});
		
	$("#divCancel").hide();
	$("#divSearch").hide();
	$("splash_image").show();
		
	//alert("windowH: " + window.innerHeight + ". ScreenH: " + screen.height + "\nwindowW: " + window.innerWidth + " ScreenW: " + screen.width);
		
		
	//setting HTML elements
	windowHeight = window.innerHeight;
	windowWidth = window.innerWidth;
	gpsLoading = document.getElementById("gps_loading");
	btnSaveLocation = document.getElementById("btnSave");
	btnFindCar = document.getElementById("btnSearch");
		
	document.getElementById("perspective").style.height = Math.round(windowHeight * .66);
	gpsLoading.style.height = Math.round(windowHeight * .66);
	gpsLoading.innerHTML = "<img src='images/car_locator_loading.gif' style='position: relative; max-width: " + Math.round(windowWidth / 2) + "px; max-Height: " + Math.round(windowHeight / 2) + "px; width: 50%; vertical-align: middle;'><br />" + notifyGettingPos;
	document.getElementById("canvas").style.width = windowWidth;
	document.getElementById("canvas").style.height = Math.round(windowHeight * .66);
	document.getElementById("compass").width = windowWidth;
	document.getElementById("compass").height = Math.round(windowHeight * .66);
	//$("#canvas").style.height = Math.round(windowHeight * .66);
		
		
		
	if (localStorage.getItem("acc") != null){
		$("#divSearch").show();
	}
		
	if (localStorage.getItem("disclaimer") == null || localStorage.getItem("disclaimer") != 1){
		//alert(disclaimerMessage + ", Car Locator");
		
		document.addEventListener("deviceready", function(){
			navigator.notification.alert(disclaimerMessage, false, "Car Locator", "OK");
			localStorage.setItem("disclaimer", 1);
		}, false);
	}
		
		
	//loadCanvas();
}//);
		
//----------------------------------------GPS Functionality----------------------------------------//
		
//Priming location functions
function activateLocation(){
	var options = {enableHighAccuracy:true, frequency: 500, maximumAge: 500, timeout: 15000};
	watchId = navigator.geolocation.watchPosition(onSuccess, onError, options);
}
		
function deactivateLocation(){
	navigator.geolocation.clearWatch(watchId);
}
		
//GPS Success Callback
function onSuccess(position){
	curLat = position.coords.latitude;
	curLong = position.coords.longitude;
	curAcc = position.coords.accuracy;
	geoSuccess = true;
}
		
//GPS Error Callback
function onError(error){
	geoSuccess = false;
	$("#splash_image").show();
	gpsLoading.style.visibility = "hidden";
	//alert("Error code: " + error.code + "\nMessage: " + error.message);
}
		
//-------------------------------------Compass Functionality-------------------------------------//
function onCompassSuccess(heading){
	//alert(heading.magneticHeading);
	curHeading = heading.magneticHeading;
}
		
function activateCompass(){
	var options = {frequency: 250};
	//navigator.compass.getCurrentHeading(onCompassSuccess, onError);
	compassId = navigator.compass.watchHeading(onCompassSuccess, onError, options);
}
		
function deactivateCompass(){
	navigator.compass.clearWatch(compassId);
}
		
//get heading and update view
function checkHeading(){
	var R = 6371; //radius of Earth in km
	var lat2 = Number(localStorage.lat);
	var lon2 = Number(localStorage.long);
	var lat1 = curLat;
	var lon1 = curLong;
	var dLat = (lat2-lat1) * Math.PI / 180;
	var dLon = (lon2-lon1) * Math.PI / 180;
	lat1 = lat1 * Math.PI / 180;
	lat2 = lat2 * Math.PI / 180;
		
		
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R * c * 1000;
		
	document.getElementById("distance").innerHTML = Math.round(d) + " meters away, +/- " + Math.round(curAcc); //update view
		
	var y = Math.sin(dLon) * Math.cos(lat2);
	var x = Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);
	bearing = (Math.atan2(y, x) / Math.PI * 180) - curHeading;
		
	if (bearing < 0){ //keeping rotation in range
		bearing += 360;
	}
}
		
//-----------------------------------Save the current location-----------------------------------//
function saveLocation(){
	activateLocation();
		
		
		
	$("#divSave").hide();
	$("#divSearch").hide();
	//$("#divCancel").show();
		
	//btnSaveLocation.disabled = true;
	//btnFindCar.disabled = true;
		
	if(localStorage.getItem("acc") != null)
		navigator.notification.confirm(confirmOverwrite, onConfirmSave, "Car Locator", "OK,Cancel");
	else
		onConfirmSave(1);
		
	//var confirmSave = confirm(confirmOverwrite);
		
	function onConfirmSave(button){
			var confirmSave;
			if (button == 1)
				confirmSave = true;
			else
				confirmSave = false;
			if (confirmSave){
				var startTime = (new Date()).getTime();
				gpsLoading.style.visibility = "visible";
				$("#splash_image").hide();
				accuracyInterval = setInterval(function(){checkAccuracy(startTime)}, 600); //allows GPS to zero-in
			}
			else if (!confirmSave){
				deactivateLocation();
				$("#divSave").show();
				$("#divSearch").show();
				$("#divCancel").hide();
		
		
				//btnSaveLocation.disabled = false;
				//btnFindCar.disabled = false;
			}
	}
}
		
//verify accuracy and save
function checkAccuracy(start){
		
	if (geoSuccess == false){
		navigator.notification.alert(noGPSMessage, false, "Car Locator", "OK");
		clearInterval(accuracyInterval);
		$("#splash_image").show();
		gpsLoading.style.visibility = "hidden";
		btnSaveLocation.disabled = false;
		
		$("#divSave").show();
		$("#divCancel").hide();
		
		if (localStorage.getItem("acc") != null){
		
			$("#btnSearch").hide();
			//btnFindCar.disabled = false;
		}
	}
	else if (curAcc < targetAcc){
		allowReducedAcc = false;
		targetAcc = 30;
		clearInterval(accuracyInterval);
		storeLocation();
		$("#splash_image").show();
		gpsLoading.style.visibility = "hidden";
		
		$("#divSave").show();
		$("#divSearch").show();
		$("#divCancel").hide();
		
		//btnSaveLocation.disabled = false;
		//btnFindCar.disabled = false;
		deactivateLocation();
		if (localStorage.getItem("acc") != null){
		
			$("#divSearch").show();
			//btnFindCar.disabled = false;
		}
		//alert(notifyPositionSaved);
		navigator.notification.alert(notifyPositionSaved, false, "Car Locator", "OK");
	}
	else if ((new Date()).getTime() > start + 14000){
		
		if (!allowReducedAcc && !gettingInput){
			//allowReducedAcc = confirm(allowReducedAccMessage);
			gettingInput = true;
			navigator.notification.confirm(allowReducedAccMessage, function(button){
				if (button == 1)
					allowReducedAcc = true;
				else
					allowReducedAcc = false;
		
				if (allowReducedAcc){
					targetAcc = 100;
					var startTime = (new Date()).getTime();
					clearInterval(accuracyInterval);
					accuracyInterval = setInterval(function(){checkAccuracy(startTime)}, 600);
				}
				else if (!allowReducedAcc){
					clearInterval(accuracyInterval);
					deactivateLocation();
		
					$("#divSave").show();
					$("#divCancel").hide();
		
					//btnSaveLocation.disabled = false;
					if (localStorage.getItem("acc") != null){
		
						$("#divSearch").show();
						//btnFindCar.disabled = false;
					}
					$("#splash_image").show();
					gpsLoading.style.visibility = "hidden";
					//alert(errorPoorAcc);
					navigator.notification.alert(errorPoorAcc, false, "Car Locator", "OK");
				}
				gettingInput = false;
			}, "Car Locator", "OK,Cancel");
		}
		else if (allowReducedAcc && !gettingInput){
			allowReducedAcc = false;
			targetAcc = 30;
			clearInterval(accuracyInterval);
			deactivateLocation();
		
			$("#divSave").show();
			$("#divCancel").hide();
		
			//btnSaveLocation.disabled = false;
			if (localStorage.getItem("acc") != null){
		
				$("#divSearch").show();
				//btnFindCar.disabled = false;
			}
			$("#splash_image").show();
			gpsLoading.style.visibility = "hidden";
			//alert(errorPoorAcc);
			navigator.notification.alert(errorPoorAcc, false, "Car Locator", "OK");
		}
	}
}
		
		
//---------------------------------------Drawing functionality---------------------------------------//
function loadCanvas()
{
	// Grab the compass element
	var canvas = document.getElementById("compass");
		
	// Canvas supported?
	if(canvas.getContext("2d"))
	{
		ctx = canvas.getContext("2d");
		
		// Load the arrow image
		shadow = new Image();
		shadow.src = "images/shadow.png";
		arrow = new Image();
  		arrow.src = "images/car_locator_arrow2.png";
 		arrow.onload = imgLoaded;
		
	}
  	else
  	{
  		navigator.notification.alert(errorUnsupportedFeature, false, "Car Locator", "OK");
  	}
		
}
		
function imgLoaded()
{
	// Image loaded event complete.  Start the timer
	drawInterval = setInterval(draw, 250);
}
		
function clearCanvas()
{
	 // clear canvas
	ctx.clearRect(0, 0, document.getElementById("compass").width, document.getElementById("compass").height);
}
		
function draw()
{
		
	var width = document.getElementById("compass").width;
	var height = document.getElementById("compass").height;
	var arrowSize;
		
	if (width > height){
		arrowSize = Math.round(height / 1.5);
	}
	else {
		arrowSize = Math.round(width / 1.5);
	}
	//alert(arrowSize);
		
		
	clearCanvas();
	ctx.drawImage(shadow, Math.round((width / 2) - (arrowSize / 2)), Math.round((height / 2) + (arrowSize / 2)), arrowSize, Math.round(arrowSize / 10));
		
	// Save the current drawing state
	ctx.save();
		
	// Now move across and down half the
	ctx.translate(Math.round(width / 2), Math.round(height / 2));
		
	// Rotate around this point
	ctx.rotate(bearing * (Math.PI / 180));
		
	// Draw the image back and up
	ctx.drawImage(arrow, -(Math.round(arrowSize / 2)), -(Math.round(arrowSize / 2)), arrowSize, arrowSize);
		
	// Restore the previous drawing state
	ctx.restore();
}
		
//----------------------------------------Find Car Functions----------------------------------------//
function startSearch(){
		
	//alert(window.innerHeight);
	if (!compassMode){
		//btnFindCar.innerHTML = btnTextCancel;
		compassMode = true;
		activateLocation();
		activateCompass();
		
  		$("#splash_image").hide();
		
		$("#divSave").hide();
		$("#divSearch").hide();
		$("#divCancel").show();
		
		//btnSaveLocation.disabled = true;
		document.getElementById("canvas").style.visibility = "visible";
		headingInterval = setInterval(function(){checkHeading()}, 300);
		loadCanvas();
		
	}
	else if (compassMode){
		//btnFindCar.innerHTML = btnTextFindCar;
		compassMode = false;
		deactivateLocation();
		clearInterval(headingInterval);
		clearInterval(drawInterval);
		clearCanvas();
		document.getElementById("distance").innerHTML = "";
		
  		$("#splash_image").show();
		
		$("#divSave").show();
		$("#divSearch").show();
		$("#divCancel").hide();
		
		//btnSaveLocation.disabled = false;
		//btnSaveLocation.style.visibility = "visible";
		document.getElementById("canvas").style.visibility = "hidden";
		deactivateCompass();
	}
}
		
//---------------------------------------Storage Functionality---------------------------------------//
//store position data to device
function storeLocation(){
	localStorage.setItem("lat", Number(curLat));
	localStorage.setItem("long", Number(curLong));
	localStorage.setItem("acc", Number(curAcc));
}
		
//read position data from device
function getStorage(){
	deactivateLocation();
	//alert(curLat + ", " + curLong + ", " + curAcc);
		
	//alert("Lat: " + String(localStorage.getItem("lat")) +
	//	"\nLong: " + String(localStorage.getItem("long")) +
	//	"\nAcc: " + String(localStorage.getItem("acc")));
}
		
		
		
		


                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=carLocator&appId=1842967561506235187e4805.74054957\"/>");}).fail(function( jqxhr, textStatus, error ) {});







	        //hack to add padding to module pages, except index/more
	    	$(document).ready(function() {
	            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			    if(filename != "index.html" && filename != "more.html") {
	    		    $("div.ui-content").each(function() {
                        var dr = $(this).attr("data-role");
                        if(dr == "content") {
                            $(this).addClass("additonal-padding");
	    		        }
                });
	    		}
	        });
	    

	                  $(document).ready(function() {
                          document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
                      });
				
                      function onDeviceReadyChildBrowser() {
                          $("a.open-child-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.openExternal(goUrl);
				              window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share Lynne Drew", null, null, "https://play.google.com/store/apps/details?id=com.a1842967561506235187e4805a.a74054957a");
    			    return false;
                });
            });
    	

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"Lynne Drew", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            


		
			    var zRssOptions = {
				                       header: false,
                                       moretext: "Read More",
                                       snippet: false,
                                       ssl: true,
                                       moreclass: "open-external-browser",
	                              };
				
        $(document).ready(function() {
            $.mobile.loading( "show", {
                text: "Loading, please wait...",
                textVisible: true
            });
				
				
				    var location=geoip_city();
					getRss(location);
				
				
        });
		
				function getRss(location) {
				    $("#rss-content").rssfeed("https://news.google.com/news?q=" + location + "&output=rss", zRssOptions,
	                               function() {
	                                   $.mobile.loading("hide");
						               resizeRssImages();
	                               }
	                       );
				}
                

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=localNews&appId=1842967561506235187e4805.74054957\"/>");}).fail(function( jqxhr, textStatus, error ) {});



function resizeRssImages() {
                    //var screenWidth = window.innerWidth;
				   $("img.fit-to-size").each(function (i,e) {
                        $(e).css("max-width","95%");
                    });
                }
		
		function nl2br (str, is_xhtml) {   
                    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';    
                    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
                }
                
                function htmlspecialchars_decode (string, quote_style) {

  var optTemp = 0,
    i = 0,
    noquotes = false;
  if (typeof quote_style === 'undefined') {
    quote_style = 2;
  }
  string = string.toString().replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  var OPTS = {
    'ENT_NOQUOTES': 0,
    'ENT_HTML_QUOTE_SINGLE': 1,
    'ENT_HTML_QUOTE_DOUBLE': 2,
    'ENT_COMPAT': 2,
    'ENT_QUOTES': 3,
    'ENT_IGNORE': 4
  };
  if (quote_style === 0) {
    noquotes = true;
  }
  if (typeof quote_style !== 'number') { // Allow for a single string or an array of string flags
    quote_style = [].concat(quote_style);
    for (i = 0; i < quote_style.length; i++) {
      // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
      if (OPTS[quote_style[i]] === 0) {
        noquotes = true;
      } else if (OPTS[quote_style[i]]) {
        optTemp = optTemp | OPTS[quote_style[i]];
      }
    }
    quote_style = optTemp;
  }
  if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
    string = string.replace(/&#0*39;/g, "'"); // PHP doesn't currently escape if more than one 0, but it should
    // string = string.replace(/&apos;|&#x0*27;/g, "'"); // This would also be useful here, but not a part of PHP
  }
  if (!noquotes) {
    string = string.replace(/&quot;/g, '"');
  }
  // Put this in last place to avoid escape being double-decoded
  string = string.replace(/&amp;/g, '&');

  return string;
}
    function onDeviceReadyCheckNetwork() {
                       var networkState = navigator.network.connection.type;
                       if (networkState===Connection.UNKNOWN){
                           alert ("Warning: it appears that you are not connected to the Internet. The content/offers shown may be out of date.");
                       } else if (networkState===Connection.NONE){
                           alert ("Warning: it appears that you are not connected to the Internet. The content/offers shown may be out of date.");
                       }
                   }
				
	         function strip(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent||tmp.innerText;
}
				

/**
 * Phonegap Web Intent plugin
 * Copyright (c) Boris Smus 2010
 *
 */
var WebIntent = function() { 

};

WebIntent.ACTION_SEND = "android.intent.action.SEND";
WebIntent.ACTION_SENDTO = "android.content.Intent.ACTION_SENDTO";
WebIntent.ACTION_VIEW= "android.intent.action.VIEW";
WebIntent.EXTRA_TEXT = "android.intent.extra.TEXT";
WebIntent.EXTRA_SUBJECT = "android.intent.extra.SUBJECT";
WebIntent.EXTRA_STREAM = "android.intent.extra.STREAM";
WebIntent.EXTRA_EMAIL = "android.intent.extra.EMAIL";

WebIntent.prototype.startActivity = function(params, success, fail) {
	return cordova.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'startActivity', [params]);
};

WebIntent.prototype.hasExtra = function(params, success, fail) {
	return cordova.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'hasExtra', [params]);
};

WebIntent.prototype.getUri = function(success, fail) {
	return cordova.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'getUri', []);
};

WebIntent.prototype.getExtra = function(params, success, fail) {
	return cordova.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'getExtra', [params]);
};


WebIntent.prototype.onNewIntent = function(callback) {
	return cordova.exec(function(args) {
		callback(args);
    }, function(args) {
    }, 'WebIntent', 'onNewIntent', []);
};

WebIntent.prototype.sendBroadcast = function(params, success, fail) {
    return cordova.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'sendBroadcast', [params]);
};

if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.webintent) {
    window.plugins.webintent = new WebIntent();
}


//PhoneGap.addConstructor(function() {
//	PhoneGap.addPlugin('webintent', new WebIntent());
//});




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
    // function, we must explicitly call 'app.receivedEvent(...);'
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



// Generated by CoffeeScript 1.3.3
(function() {
  var Instafeed, root;

  Instafeed = (function() {

    function Instafeed(params, context) {
      var option, value;
      this.options = {
        target: 'instafeed',
        get: 'popular',
        resolution: 'thumbnail',
        sortBy: 'none',
        links: true,
        mock: false,
        useHttp: false
      };
      if (typeof params === 'object') {
        for (option in params) {
          value = params[option];
          this.options[option] = value;
        }
      }
      this.context = context != null ? context : this;
      this.unique = this._genKey();
    }

    Instafeed.prototype.hasNext = function() {
      return typeof this.context.nextUrl === 'string' && this.context.nextUrl.length > 0;
    };

    Instafeed.prototype.next = function() {
      if (!this.hasNext()) {
        return false;
      }
      return this.run(this.context.nextUrl);
    };

    Instafeed.prototype.run = function(url) {
      var header, instanceName, script;
      if (typeof this.options.clientId !== 'string') {
        if (typeof this.options.accessToken !== 'string') {
          throw new Error("Missing clientId or accessToken.");
        }
      }
      if (typeof this.options.accessToken !== 'string') {
        if (typeof this.options.clientId !== 'string') {
          throw new Error("Missing clientId or accessToken.");
        }
      }
      if ((this.options.before != null) && typeof this.options.before === 'function') {
        this.options.before.call(this);
      }
      if (typeof document !== "undefined" && document !== null) {
        script = document.createElement('script');
        script.id = 'instafeed-fetcher';
        script.src = url || this._buildUrl();
        header = document.getElementsByTagName('head');
        header[0].appendChild(script);
        instanceName = "instafeedCache" + this.unique;
        window[instanceName] = new Instafeed(this.options, this);
        window[instanceName].unique = this.unique;
      }
      return true;
    };

    Instafeed.prototype.parse = function(response) {
      var anchor, fragment, header, htmlString, image, imageString, imageUrl, images, img, imgUrl, instanceName, node, reverse, sortSettings, tmpEl, _i, _j, _k, _len, _len1, _len2, _ref;
      if (typeof response !== 'object') {
        if ((this.options.error != null) && typeof this.options.error === 'function') {
          this.options.error.call(this, 'Invalid JSON data');
          return false;
        } else {
          throw new Error('Invalid JSON response');
        }
      }
      if (response.meta.code !== 200) {
        if ((this.options.error != null) && typeof this.options.error === 'function') {
          this.options.error.call(this, response.meta.error_message);
          return false;
        } else {
          throw new Error("Error from Instagram: " + response.meta.error_message);
        }
      }
      if (response.data.length === 0) {
        if ((this.options.error != null) && typeof this.options.error === 'function') {
          this.options.error.call(this, 'No images were returned from Instagram');
          return false;
        } else {
          throw new Error('No images were returned from Instagram');
        }
      }
      if ((this.options.success != null) && typeof this.options.success === 'function') {
        this.options.success.call(this, response);
      }
      this.context.nextUrl = '';
      if (response.pagination != null) {
        this.context.nextUrl = response.pagination.next_url;
      }
      if (this.options.sortBy !== 'none') {
        if (this.options.sortBy === 'random') {
          sortSettings = ['', 'random'];
        } else {
          sortSettings = this.options.sortBy.split('-');
        }
        reverse = sortSettings[0] === 'least' ? true : false;
        switch (sortSettings[1]) {
          case 'random':
            response.data.sort(function() {
              return 0.5 - Math.random();
            });
            break;
          case 'recent':
            response.data = this._sortBy(response.data, 'created_time', reverse);
            break;
          case 'liked':
            response.data = this._sortBy(response.data, 'likes.count', reverse);
            break;
          case 'commented':
            response.data = this._sortBy(response.data, 'comments.count', reverse);
            break;
          default:
            throw new Error("Invalid option for sortBy: '" + this.options.sortBy + "'.");
        }
      }
      if ((typeof document !== "undefined" && document !== null) && this.options.mock === false) {
        images = response.data;
        if (this.options.limit != null) {
          if (images.length > this.options.limit) {
            images = images.slice(0, this.options.limit + 1 || 9e9);
          }
        }
        fragment = document.createDocumentFragment();
        if ((this.options.filter != null) && typeof this.options.filter === 'function') {
          images = this._filter(images, this.options.filter);
        }
        if ((this.options.template != null) && typeof this.options.template === 'string') {
          htmlString = '';
          imageString = '';
          imgUrl = '';
          tmpEl = document.createElement('div');
          for (_i = 0, _len = images.length; _i < _len; _i++) {
            image = images[_i];
            imageUrl = image.images[this.options.resolution].url;
            if (!this.options.useHttp) {
              imageUrl = imageUrl.replace('http://', '//');
            }
            imageString = this._makeTemplate(this.options.template, {
              model: image,
              id: image.id,
              link: image.link,
              image: imageUrl,
              caption: this._getObjectProperty(image, 'caption.text'),
              likes: image.likes.count,
              comments: image.comments.count,
              location: this._getObjectProperty(image, 'location.name')
            });
            htmlString += imageString;
          }
          tmpEl.innerHTML = htmlString;
          _ref = [].slice.call(tmpEl.childNodes);
          for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            node = _ref[_j];
            fragment.appendChild(node);
          }
        } else {
          for (_k = 0, _len2 = images.length; _k < _len2; _k++) {
            image = images[_k];
            img = document.createElement('img');
            imageUrl = image.images[this.options.resolution].url;
            if (!this.options.useHttp) {
              imageUrl = imageUrl.replace('http://', '//');
            }
            img.src = imageUrl;
            if (this.options.links === true) {
              anchor = document.createElement('a');
              anchor.href = image.link;
              anchor.appendChild(img);
              fragment.appendChild(anchor);
            } else {
              fragment.appendChild(img);
            }
          }
        }
        document.getElementById(this.options.target).appendChild(fragment);
        header = document.getElementsByTagName('head')[0];
        header.removeChild(document.getElementById('instafeed-fetcher'));
        instanceName = "instafeedCache" + this.unique;
        window[instanceName] = void 0;
        try {
          delete window[instanceName];
        } catch (e) {

        }
      }
      if ((this.options.after != null) && typeof this.options.after === 'function') {
        this.options.after.call(this);
      }
      return true;
    };

    Instafeed.prototype._buildUrl = function() {
      var base, endpoint, final;
      base = "https://api.instagram.com/v1";
      switch (this.options.get) {
        case "popular":
          endpoint = "media/popular";
          break;
        case "tagged":
          if (typeof this.options.tagName !== 'string') {
            throw new Error("No tag name specified. Use the 'tagName' option.");
          }
          endpoint = "tags/" + this.options.tagName + "/media/recent";
          break;
        case "location":
          if (typeof this.options.locationId !== 'number') {
            throw new Error("No location specified. Use the 'locationId' option.");
          }
          endpoint = "locations/" + this.options.locationId + "/media/recent";
          break;
        case "user":
          if (typeof this.options.userId !== 'number') {
            throw new Error("No user specified. Use the 'userId' option.");
          }
          if (typeof this.options.accessToken !== 'string') {
            throw new Error("No access token. Use the 'accessToken' option.");
          }
          endpoint = "users/" + this.options.userId + "/media/recent";
          break;
        default:
          throw new Error("Invalid option for get: '" + this.options.get + "'.");
      }
      final = "" + base + "/" + endpoint;
      if (this.options.accessToken != null) {
        final += "?access_token=" + this.options.accessToken;
      } else {
        final += "?client_id=" + this.options.clientId;
      }
      if (this.options.limit != null) {
        final += "&count=" + this.options.limit;
      }
      final += "&callback=instafeedCache" + this.unique + ".parse";
      return final;
    };

    Instafeed.prototype._genKey = function() {
      var S4;
      S4 = function() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return "" + (S4()) + (S4()) + (S4()) + (S4());
    };

    Instafeed.prototype._makeTemplate = function(template, data) {
      var output, pattern, varName, varValue, _ref;
      pattern = /(?:\{{2})([\w\[\]\.]+)(?:\}{2})/;
      output = template;
      while (pattern.test(output)) {
        varName = output.match(pattern)[1];
        varValue = (_ref = this._getObjectProperty(data, varName)) != null ? _ref : '';
        output = output.replace(pattern, "" + varValue);
      }
      return output;
    };

    Instafeed.prototype._getObjectProperty = function(object, property) {
      var piece, pieces;
      property = property.replace(/\[(\w+)\]/g, '.$1');
      pieces = property.split('.');
      while (pieces.length) {
        piece = pieces.shift();
        if ((object != null) && piece in object) {
          object = object[piece];
        } else {
          return null;
        }
      }
      return object;
    };

    Instafeed.prototype._sortBy = function(data, property, reverse) {
      var sorter;
      sorter = function(a, b) {
        var valueA, valueB;
        valueA = this._getObjectProperty(a, property);
        valueB = this._getObjectProperty(b, property);
        if (reverse) {
          if (valueA > valueB) {
            return 1;
          } else {
            return -1;
          }
        }
        if (valueA < valueB) {
          return 1;
        } else {
          return -1;
        }
      };
      data.sort(sorter.bind(this));
      return data;
    };

    Instafeed.prototype._filter = function(images, filter) {
      var filteredImages, image, _fn, _i, _len;
      filteredImages = [];
      _fn = function(image) {
        if (filter(image)) {
          return filteredImages.push(image);
        }
      };
      for (_i = 0, _len = images.length; _i < _len; _i++) {
        image = images[_i];
        _fn(image);
      }
      return filteredImages;
    };

    return Instafeed;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : window;

  root.Instafeed = Instafeed;

}).call(this);


