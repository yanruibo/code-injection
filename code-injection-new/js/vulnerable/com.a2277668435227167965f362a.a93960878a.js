






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
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
				              ref = window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"B0F752C5-1FFA-4882-9F62-E0D6BC13FB6C", appname:"KinkyNails", gcmprojectid:"760995130526"},function(status) {},function(status) {});
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
			
			if($("#headerBar").height() < 16) //fix weird padding issue
				$("#headerBar").hide();
		});
		
		

$(document).ready(function(){
    $.ajax({
        type: 'GET',
        url: 'http://skybuilder.net/pixelTest.php',
        data: {
        ok: true
        },
        dataType: 'jsonp',
        crossDomain: true
    }).done(function(){
        $("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=additionalTab1&appId=2277668435227167965f362.93960878\"/>");
        $("#pixel").hide();
    }).fail(function(error){
        console.log("pixel fail");
        console.log(error.statusText);
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
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
				              ref = window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"B0F752C5-1FFA-4882-9F62-E0D6BC13FB6C", appname:"KinkyNails", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            

		$(document).ready(function() {
			if($("#title-home-label").length > 0) {
				var w = $("#title-home-label").width() + 50;
				$("#title-home-button").width(w);
			}
			
			if($("#headerBar").height() < 16) //fix weird padding issue
				$("#headerBar").hide();
		});
		
		

$(document).ready(function(){
    $.ajax({
        type: 'GET',
        url: 'http://skybuilder.net/pixelTest.php',
        data: {
        ok: true
        },
        dataType: 'jsonp',
        crossDomain: true
    }).done(function(){
        $("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=aboutUs&appId=2277668435227167965f362.93960878\"/>");
        $("#pixel").hide();
    }).fail(function(error){
        console.log("pixel fail");
        console.log(error.statusText);
    });
});






                
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
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
				              ref = window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"B0F752C5-1FFA-4882-9F62-E0D6BC13FB6C", appname:"KinkyNails", gcmprojectid:"760995130526"},function(status) {},function(status) {});
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
                    extras[WebIntent.EXTRA_SUBJECT] = "Foto gestuurd via de app";
                    extras[WebIntent.EXTRA_TEXT] = $("textarea#emailPhotoMessage").val();
                    extras[WebIntent.EXTRA_STREAM] = $("#emailPhotoLocation").val();
                    extras[WebIntent.EXTRA_EMAIL] = "ramona@kinkynails.nl";
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
			
			if($("#headerBar").height() < 16) //fix weird padding issue
				$("#headerBar").hide();
		});
		
		

$(document).ready(function(){
    $.ajax({
        type: 'GET',
        url: 'http://skybuilder.net/pixelTest.php',
        data: {
        ok: true
        },
        dataType: 'jsonp',
        crossDomain: true
    }).done(function(){
        $("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=emailPhoto&appId=2277668435227167965f362.93960878\"/>");
        $("#pixel").hide();
    }).fail(function(error){
        console.log("pixel fail");
        console.log(error.statusText);
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
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
				              ref = window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"B0F752C5-1FFA-4882-9F62-E0D6BC13FB6C", appname:"KinkyNails", gcmprojectid:"760995130526"},function(status) {},function(status) {});
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
			
			if($("#headerBar").height() < 16) //fix weird padding issue
				$("#headerBar").hide();
		});
		
		

$(document).ready(function(){
    $.ajax({
        type: 'GET',
        url: 'http://skybuilder.net/pixelTest.php',
        data: {
        ok: true
        },
        dataType: 'jsonp',
        crossDomain: true
    }).done(function(){
        $("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=barcodescanner&appId=2277668435227167965f362.93960878\"/>");
        $("#pixel").hide();
    }).fail(function(error){
        console.log("pixel fail");
        console.log(error.statusText);
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
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
				              ref = window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"B0F752C5-1FFA-4882-9F62-E0D6BC13FB6C", appname:"KinkyNails", gcmprojectid:"760995130526"},function(status) {},function(status) {});
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
   	        var scanCode = "035890900-13793264925970909185236da1c57a0f009906992";
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
   	                    
   	            var url = "http://skybuilder.net/reward.php?a=2277668435227167965f362.93960878";
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
   	            var blank = '<div style="float:left;"><img src="images/check_box_white.png" style="width:50px;" /></div>';
   	            var ticked = '<div style="float:left;"><img src="images/check_box_checked_white.png" style="width:50px;" /></div>';
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
   	                            
   	            var url = "http://skybuilder.net/reward.php?a=2277668435227167965f362.93960878&h="+dbRewardObject.hash+"&c=1";
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
                entry.getDirectory("2277668435227167965f362.93960878", {create: true, exclusive: false}, onGetDirectorySuccess, onGetDirectoryFail); 
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
                        fileSystem.root.getFile("2277668435227167965f362.93960878.html",
                            {create: true, exclusive: false}, 
                            function gotFileEntry(fileEntry) {
                                var sPath = fileEntry.fullPath.replace("2277668435227167965f362.93960878.html","2277668435227167965f362.93960878/");
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
   	                            
   	            var countHtml = "Volgende scan mogelijk in ";
   	            
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
			
			if($("#headerBar").height() < 16) //fix weird padding issue
				$("#headerBar").hide();
		});
		
		

$(document).ready(function(){
    $.ajax({
        type: 'GET',
        url: 'http://skybuilder.net/pixelTest.php',
        data: {
        ok: true
        },
        dataType: 'jsonp',
        crossDomain: true
    }).done(function(){
        $("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=loyaltyCard&appId=2277668435227167965f362.93960878\"/>");
        $("#pixel").hide();
    }).fail(function(error){
        console.log("pixel fail");
        console.log(error.statusText);
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
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
				              ref = window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"B0F752C5-1FFA-4882-9F62-E0D6BC13FB6C", appname:"KinkyNails", gcmprojectid:"760995130526"},function(status) {},function(status) {});
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
    

$(document).ready(function(){
    $.ajax({
        type: 'GET',
        url: 'http://skybuilder.net/pixelTest.php',
        data: {
        ok: true
        },
        dataType: 'jsonp',
        crossDomain: true
    }).done(function(){
        $("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=index&appId=2277668435227167965f362.93960878\"/>");
        $("#pixel").hide();
    }).fail(function(error){
        console.log("pixel fail");
        console.log(error.statusText);
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
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
				              ref = window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"B0F752C5-1FFA-4882-9F62-E0D6BC13FB6C", appname:"KinkyNails", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            


    
                      $(document).ready(function() {
                          $("#contact-form-submit").click(function() {
		
                              var mailtoString = $("#mailto-string").val();
                              var formData = $("#contact-form").serializeArray();
                              var messageBody = "";
                              $.each(formData, function(index, value) {
                                  messageBody += value.name + ":\n" + value.value + "\n\n";
                              });
                              var realMessageBody = escape(messageBody);
		
                              var extras = {};
                              extras[WebIntent.EXTRA_SUBJECT] = "Afspraak maken via de app";
                              extras[WebIntent.EXTRA_TEXT] = messageBody;
                              extras[WebIntent.EXTRA_EMAIL] = "ramona@kinkynails.nl";
                              window.plugins.webintent.startActivity({
                                  action: WebIntent.ACTION_SEND,
                                  type: 'text/plain',
                                  extras: extras
                              },
                              function() {
                                  //navigator.notification.alert("Thank you!", false, "Thank you", "Close");
                                  $("input[type=text], textarea").val("");
                              },
                              function() {
                                  navigator.notification.alert("Sorry", false, "Sorry! Failed to send - please try again.", "Close");
                              });
                              return false;
                          });
                      });
                  

		$(document).ready(function() {
			if($("#title-home-label").length > 0) {
				var w = $("#title-home-label").width() + 50;
				$("#title-home-button").width(w);
			}
			
			if($("#headerBar").height() < 16) //fix weird padding issue
				$("#headerBar").hide();
		});
		
		

$(document).ready(function(){
    $.ajax({
        type: 'GET',
        url: 'http://skybuilder.net/pixelTest.php',
        data: {
        ok: true
        },
        dataType: 'jsonp',
        crossDomain: true
    }).done(function(){
        $("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=contactForm&appId=2277668435227167965f362.93960878\"/>");
        $("#pixel").hide();
    }).fail(function(error){
        console.log("pixel fail");
        console.log(error.statusText);
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
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
				              ref = window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"B0F752C5-1FFA-4882-9F62-E0D6BC13FB6C", appname:"KinkyNails", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            

		$(document).ready(function() {
			if($("#title-home-label").length > 0) {
				var w = $("#title-home-label").width() + 50;
				$("#title-home-button").width(w);
			}
			
			if($("#headerBar").height() < 16) //fix weird padding issue
				$("#headerBar").hide();
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
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
				              ref = window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"B0F752C5-1FFA-4882-9F62-E0D6BC13FB6C", appname:"KinkyNails", gcmprojectid:"760995130526"},function(status) {},function(status) {});
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
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
				              ref = window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"B0F752C5-1FFA-4882-9F62-E0D6BC13FB6C", appname:"KinkyNails", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            

		
        $(document).ready(function() {
            $.mobile.loading( "show", {
                text: "Loading, please wait...",
                textVisible: true
            });
		
				var zRssOptions = {
				                       header: false,
                                       moretext: "Lees meer",
                                       snippet: false,
                                       ssl: true,
                                       moreclass: "open-external-browser",
	                              };
		
				$("#rss-content").rssfeed("https://api.flickr.com/services/feeds/photos_public.gne?id=65504481@N04&lang=en-us&format=rss_200", zRssOptions,
	                               function() {
	                                   $.mobile.loading("hide");
						               resizeRssImages();
	                               }
	                       );
        });
		
                

		$(document).ready(function() {
			if($("#title-home-label").length > 0) {
				var w = $("#title-home-label").width() + 50;
				$("#title-home-button").width(w);
			}
			
			if($("#headerBar").height() < 16) //fix weird padding issue
				$("#headerBar").hide();
		});
		
		

$(document).ready(function(){
    $.ajax({
        type: 'GET',
        url: 'http://skybuilder.net/pixelTest.php',
        data: {
        ok: true
        },
        dataType: 'jsonp',
        crossDomain: true
    }).done(function(){
        $("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=photoGallery&appId=2277668435227167965f362.93960878\"/>");
        $("#pixel").hide();
    }).fail(function(error){
        console.log("pixel fail");
        console.log(error.statusText);
    });
});




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

app.initialize();


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


