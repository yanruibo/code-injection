




var scanCode = function() {
    window.plugins.barcodeScanner.scan(
        function(result) {
        alert("Scanned Code: " + result.text 
                + ". Format: " + result.format
                + ". Cancelled: " + result.cancelled);
    }, function(error) {
        alert("Scan failed: " + error);
    });
}

var encodeText = function() {
    window.plugins.barcodeScanner.encode(
            BarcodeScanner.Encode.TEXT_TYPE,
            "http://www.mobiledevelopersolutions.com", 
            function(success) {
                alert("Encode success: " + success);
            }, function(fail) {
                alert("Encoding failed: " + fail);
            });
}

var encodeEmail = function() {
    window.plugins.barcodeScanner.encode(
        BarcodeScanner.Encode.EMAIL_TYPE,
        "a.name@gmail.com", function(success) {
            alert("Encode success: " + success);
        }, function(fail) {
            alert("Encoding failed: " + fail);
        });
}

var encodePhone = function() {
    window.plugins.barcodeScanner.encode(
        BarcodeScanner.Encode.PHONE_TYPE,
        "555-227-5283", function(success) {
            alert("Encode success: " + success);
        }, function(fail) {
            alert("Encoding failed: " + fail);
        });
}

var encodeSMS = function() {
    window.plugins.barcodeScanner.encode(
        BarcodeScanner.Encode.SMS_TYPE,
        "An important message for someone.", function(success) {
            alert("Encode success: " + success);
        }, function(fail) {
            alert("Encoding failed: " + fail);
        });
}






            //var sServer = "http://127.0.0.1:8888/ChopMe/source";
            //var sServer = "http://192.168.0.112:8888/ChopMe/source";
            
            var sServer = "http://idb.com.my/ChopMe";
            
            var bLogin = false;
            var sUserID ="";
            var aChopMeData;
            var sReadData =""; //global var to store the data to write into the file system.
            var sWriteData ="" //global var to store the data read from the file system.
            var bAutoLogin = false;
            var sRedeemData ="" //global var to store the redeemdata that will be sent to server when user
                                //request redeem.
            var bNeedToRefreshMychopH = false; //global var to indicate whether need to refresh the mychoph after redeem the voucher
            
            
            //----------------- New Member Sign Up -----------------------------
            $("#btnSignUp").die();
            
            $("#btnSignUp").live('tap', function(event){
                                 onSignUp();
                                 })
            
            function onSignUp(){
                $.mobile.changePage( sServer + '/control/control.php?id=signup', {transition: 'pop', role: 'dialog'}); 
            }
            
           
            
            $('#SignUp').live('tap', function(){
                              $.mobile.pageLoading();
                              $.ajax({
                                     type: "POST",
                                     dataType: 'json',
                                     url:  sServer + "/API/execAPI.php?oid=API_MbrRegistration",
                                     cache: false,
                                     data: $('#signupform').serialize(),
                                     success: function(data, textStatus, XMLHttpRequest){
                                     if (data.status == 1){      
                                     $.mobile.changePage('#main');
                                     $("#messageboxHeader").html("ChopMe!");
                                     $("#messageboxTitle").html("Congratulations!");
                                     $("#messageboxContent").html("You have Successfully Registered as Our ChopMe Member!!")
                                     $("#messageboxButton1").html("OK");
                                     $("#messageboxButton1").show();
                                     $("#messageboxButton2").hide(); 
                                     $.mobile.changePage('#messagebox', {transition: 'pop', role: 'dialog'});                            
                                     
                                     } else {
                                     navigator.notification.alert(data.error);
                                     }
                                     },
                                     error: function(XMLHttpRequest, textStatus, errorThrown){
                                     $.mobile.pageLoading(true);
                                     navigator.notification.alert(errorThrown);
                                     }
                                     });
                              });
            
            
            //------------------------------------------------------------------
            
            /*$('#btnFaceBookSignUp').live('tap', function(){
                                         onFaceBookSignUp();
                                         })
            
            
            function onFaceBookSignUp(){
                $.mobile.changePage('http://yougapi.com/products/facebook_connect/demo.php', {transition: 'pop', role: 'dialog'}); 
            }
            */
            
            //----------------- Member Login Here ------------------------------
            
            function onSuccessLogin(data)
            {
                
                if (data.status == 'OK'){
                    bLogin = true;
                    sUserID = data.aaData[0];
                    $.mobile.changePage('#mychoph', {transition: 'slide', role: 'page'});
                    
                    
                    if (bAutoLogin){
                        //save the serialize data into the file system.
                        sWriteData = "1|" + $("#loginform").serialize();
                    }else{ sWriteData = ""}
                    
                    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSWrite, failWrite);
                    
                     $("#btnmychop").trigger('tap');                    
                }
                else{
                    $("#messageboxHeader").html("ChopMe!");
                    $("#messageboxTitle").html("Sign In");
                    $("#messageboxContent").html("Not a valid user!  Please try again.")
                    $("#messageboxButton1").html("OK");
                    $("#messageboxButton1").show();
                    $("#messageboxButton2").hide();
                    $.mobile.changePage('#messagebox', {transition: 'pop', role: 'dialog'}); 
                }
                
                //-----------------message box example--------------------------
                //$("#messageboxHeader").html("ChopMe!");
                //$("#messageboxTitle").html("this is a test message box");
                //$("#messageboxContent").html("ChopMe is now available!!!!!")
                //$("#messageboxButton1").html("Continue");
                //$.mobile.changePage('#messagebox', {transition: 'pop', role: 'dialog'}); 
                // <a href="#messagebox" data-rel="dialog" data-transition="pop">Open dialog</a>
                //--------------------------------------------------------------
                
            }
            
            
            function onErrorLogin(data, status)
            {
                // handle an error
                navigator.notification.alert(data);
            }        
            
            //------------------------------------------------------------------
            
            
            //--------------Member logout --------------------------------------
            $("#btnLogout").live('tap', function(){
            
                                 sWriteData    ="";
                                 window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSWrite, failWrite);
                                 
            })
            
            //------------------------------------------------------------------
            
            
            //--------------Member change password -------------------------------------------
            $("#btnSubmitChgPassword").live('tap', function(event){
                                            //		if($('#current_password').val() == ''){
                                            //		    return false;
                                            //		}
                                            if($('#new_password').val()!= $('#confirm_password').val()){
                                            navigator.notification.alert("Please enter same password.")
                                            return false;
                                            }
                                            //		$("#changePassword").html("");
                                            $.mobile.pageLoading();
                                            $.ajax({
                                                   type: "POST",
                                                   dataType: 'json',
                                                   url:  sServer + "/API/execAPI.php?oid=API_chgpassword",
                                                   cache: false,
                                                   data: "ID=" + sUserID + '&' + $("#changePassword").serialize(),
                                                   success: function(data, textStatus, XMLHttpRequest){
                                                   if (data.status == "OK"){
                                                   $.mobile.pageLoading(true);
                                                   $("#messageboxHeader").html("ChopMe!");
                                                   $("#messageboxTitle").html("Your Password Has Changed!!");
                                                   $("#messageboxContent").html("")
                                                   $("#messageboxButton1").html("OK");
                                                   $("#messageboxButton1").show();
                                                   $("#messageboxButton2").hide(); 
                                                   $.mobile.changePage('#messagebox', {transition: 'pop', role: 'dialog'}); 
                                                   }else{
                                                   if(sUserID == ''){
                                                   $.mobile.pageLoading(true);
                                                   navigator.notification.alert(data.error);
                                                   $.mobile.changePage('#default', {transition: 'slide', role: 'page'});
                                                   }else{
                                                   $.mobile.pageLoading(true);
                                                   navigator.notification.alert(data.error);
                                                   }
                                                   }
                                                   },
                                                   error: function(XMLHttpRequest, textStatus, errorThrown){
                                                   $.mobile.pageLoading(true);
                                                   navigator.notification.alert(errorThrown);
                                                   }
                                                   });
                                            })
            
            
            //-------------------------------------------------------------------------------------
            
            //--------------List All Chops -------------------------------------
            $("#btnmychop").live('tap', function(){
                                 $("#ulChops").html("");
                                 $.mobile.pageLoading();
                                 $.ajax({
                                        type: "POST",
                                        dataType: 'json',
                                        url:  sServer + "/API/execAPI.php?oid=API_getchops",
                                        cache: false,
                                        data: "UUIDJYUIIPZMND12mm333dADbBE="+ sUserID,
                                        success: function(data, textStatus, XMLHttpRequest){
                                        $.mobile.pageLoading(true);
                                        aChopMeData = data;
                                        DisplayAllChops(data);
                                        },
                                        error: function(XMLHttpRequest, textStatus, errorThrown){
                                        $.mobile.pageLoading(true);
                                        navigator.notification.alert(errorThrown);
                                        }
                                        });
                                 })
            
            
            function DisplayAllChops(data){
                var sLi="";
                var sDescription ="a";
                var sVenue ="b";
                var sCount ="c";
                
                var nCount = 0;
                nCount = data.aaData.length;
                
                $("#ulChops").html("");
                
                for(i=0; i<nCount; i++){
                    sDescription = data.aaData[i]["i1"];
                    sVenue = data.aaData[i]["i3"];
                    sCount = data.aaData[i]["i2"];
                    
                    sLi = "<li data-theme=\"c\" class=\"ui-btn ui-btn-icon-right ui-li ui-btn-down-c ui-btn-up-c\">" + 
                    "<div class=\"ui-btn-inner ui-li\">" + 
                    "<div class=\"ui-btn-text\">" + 
                    "<a id=\"" + i.toString() + "\" href=\"#\" class=\"ui-link-inherit chopmeheader \">" + 
                    "<h3 class=\"ui-li-heading\">" + sDescription + "</h3>" + 
                    "<p class=\"ui-li-desc\">" + sVenue + "</p>" + 
                    "</a>" + 
                    "</div>" + 
                    "<span class=\"ui-icon ui-icon-arrow-r\"></span>" + 
                    "<span class=\"ui-li-aside2 ui-li-desc\">" + sCount + "</span>" + 
                    "</div>" +
                    "</li>";
                    
                    $("#ulChops").append(sLi);
                }
                 
                $.mobile.changePage('#mychoph', {transition: 'slide', role: 'page'});
            }
            
            //------------------------------------------------------------------
            
            
            //--------------------- scan QR Code -------------------------------
            $("#btnScanQRCode").live('tap', function(){
                                     
                                     CallCamera();
                                     
                                     })
            
            
            function CallCamera(){
                //scan qrcode here
                //SubmitQRCode('01234cHoPmE56789XYZaB');   
                $.mobile.pageLoading();
                window.plugins.barcodeScanner.scan(function(result) {
                                                   $.mobile.pageLoading(true);
                                                   SubmitQRCode(result.text);
                                                   }, function(error) {
                                                   //navigator.notification.alert(error);
                                                   $.mobile.pageLoading(true);
                                                   }
                                                   
                                                   );
            }
            
            
            function SubmitQRCode(sQRCode){
                
                if (sQRCode.length <20){
                    //not a valid chopme qr code
                    $("#messageboxHeader").html("ChopMe!");
                    $("#messageboxTitle").html("Scanning");
                    $("#messageboxContent").html("This is not a valid ChopMe QR Code!")
                    $("#messageboxButton1").html("OK");
                    $("#messageboxButton1").show();
                    $("#messageboxButton2").hide();
                    $.mobile.changePage('#messagebox', {transition: 'pop', role: 'dialog'}); 
                    
                }else if (sQRCode.substr(5, 6) == "cHoPmE"){
                    //this is a valid chopme qr code
                    $("#messageboxHeader").html("ChopMe!");
                    $("#messageboxTitle").html("");
                    $("#messageboxContent").html("ChopMe QR code detected!  Please wait......");
                    
                    $("#messageboxButton1").hide();
                    $("#messageboxButton2").hide();
                    $.mobile.changePage('#messagebox', {transition: 'pop', role: 'dialog'}); 
                    $.mobile.pageLoading();
                    
                    $.ajax({
                           type: "POST",
                           dataType: 'json',
                           url:  sServer + "/API/execAPI.php?oid=API_sendQRCode",
                           cache: false,
                           data: "UUIDJYUIIPZMND12mm333dADbBE=" + sUserID + 
                           "&4787777x2djiPUYTRFGHJIOSASDF78976=" + sQRCode,
                           success: function(data, textStatus, XMLHttpRequest){
                           //close the dialog box here and getchops again
                           $.mobile.pageLoading(true);
                           if (data.status == 0){
                           
                           $("#messageboxHeader").html("ChopMe!");
                           $("#messageboxTitle").html("");
                           $("#messageboxContent").html("This QR code is not valid!");
                           $("#messageboxButton1").html("OK");
                           $("#messageboxButton1").show();
                           $("#messageboxButton2").hide();
                           }else if(data.status == 1){
                           $('.ui-dialog').dialog('close');
                          
                           
                           $("#btnmychop").trigger('tap');
                           
                           }
                           },
                           error: function(XMLHttpRequest, textStatus, errorThrown){
                           $.mobile.pageLoading(true);
                           navigator.notification.alert(errorThrown);
                           }
                           });
                    
                    
                }else{
                    //not a valid chopme qr code
                    $("#messageboxHeader").html("ChopMe!");
                    $("#messageboxTitle").html("Scanning");
                    $("#messageboxContent").html("This is not a valid ChopMe QR Code!")
                    $("#messageboxButton1").html("OK");
                    $("#messageboxButton1").show();
                    $("#messageboxButton2").hide();
                    $.mobile.changePage('#messagebox', {transition: 'pop', role: 'dialog'}); 
                    
                }
            }
            //------------------------------------------------------------------
            
            
            //------------- chop tapped ----------------------------------------
            $(".chopmeheader").live('tap', function(){
                                    var nIndex = $(this).attr('id');
                                    var sRedeem ="";
                                    var bAllowRedeem = false;
                                    bNeedToRefreshMychopH = false;
                                    
                                    //alert(aChopMeData.aaData[nIndex]["i2"]);
                                    
                                    
                                    if (aChopMeData.aaData[nIndex]["i2"] == "FULL"){
                                    //sRedeem = "<a href=\"#\" id=\"" + aChopMeData.aaData[nIndex]["i6"] + "\"  class=\"redeem\" ///data-role=\"button\" data-theme=\"a\">Redeem</a>";
                                    sRedeemData = aChopMeData.aaData[nIndex]["i6"];
                                    bAllowRedeem = true;
                                    }                                                     
                                    var nTotalIn =0;
                                    var nCurrentIn =0;
                                    var sChopImage ="";
                                    var sDealsInfo ="";
                                    
                                    
                                    sDealsInfo =  "<div class=\"Notepad\"><h2>" + aChopMeData.aaData[nIndex]["i1"] + 
                                    "</h2><p>" + aChopMeData.aaData[nIndex]["i3"] + "</p>" +
                                    "<p>" + aChopMeData.aaData[nIndex]["i7"] +  "</p></div>"
                                    
                                    
                                    
                                    nTotalIn = aChopMeData.aaData[nIndex]["TotalIn"];
                                    nCurrentIn = aChopMeData.aaData[nIndex]["CurrentIn"];
                                    
                                    sChopImage = "<div id=\"notepadgraphic\" class=\"Notepad\"><ul class=\"ImageGalleryList\">";
                                    
                                    for (i=1; i<=nTotalIn; i++){
                                    sChopImage += "<img src=\"";
                                    if (nCurrentIn >= i){
                                    sChopImage += "images/chop.png\"/>";
                                    }else{
                                    sChopImage += "images/nochop.png\"/>";
                                    }
                                    
                                    }
                                    sChopImage += "</ul></div>";
                                    
                                    
                                    if(bAllowRedeem){
                
                                    $("#divchopdetailsredeem").html();
                                    $("#divchopdetailsredeem").html(sDealsInfo + sChopImage);
                                    
                                    $.mobile.changePage('#mychopdredeem', {transition: 'slide', role: 'page'}); 
                                    $("#mychopdredeemfooter").show();

                                    $("#cardinforeddem").html( aChopMeData.aaData[nIndex]["i3"]);
                                    }else{                
                                    $("#divchopdetails").html();
                                    $("#divchopdetails").html(sDealsInfo + sChopImage);
                                    
                                    $.mobile.changePage('#mychopd', {transition: 'slide', role: 'page'}); 
                                    $("#cardinfo").html( aChopMeData.aaData[nIndex]["i3"]);
                                    }          
                                    })
            //------------------------------------------------------------------
            
            
            //------------ redeem tapped ---------------------------------------
            $("#btnRedeem").live('tap',function(){
                              //alert($(this).attr("id"));
                              CallCameraRedeem(sRedeemData);
                              })
            
            
            function CallCameraRedeem(sExtraInfo){
                //scan qrcode here
                //Redeem(sRedeemID);
                //alert(sRedeemID);
                $.mobile.pageLoading();
                window.plugins.barcodeScanner.scan(function(result) {
                                                   $.mobile.pageLoading(true)
                                                   Redeem(result.text, sExtraInfo);
                                                   }, function(error) {
                                                   //navigator.notification.alert(error)
                                                   $.mobile.pageLoading(true)
                                                   }
                                                   
                                                   );
                
                
            }
            
            function Redeem(sRedeemID, sExtraInfo){
                $.mobile.pageLoading();
                
                $.ajax({
                       type: "POST",
                       dataType: 'json',
                       url:  sServer + "/API/execAPI.php?oid=API_redeem",
                       cache: false,
                       data: "akkdjiiiii883778488492998887jdjhs2=" +  sUserID + "^|" + sRedeemID + "&xZxQeii987CDGdkj32=" + sExtraInfo,
                       success: function(data, textStatus, XMLHttpRequest){
                       $.mobile.pageLoading(true);
                       if (data.status == 1){
                       //$("#messageboxHeader").html("ChopMe!");
                       //$("#messageboxTitle").html("");
                       //$("#messageboxContent").html("Redeem Successful!")
                       //$("#messageboxButton1").html("OK");
                       //$("#messageboxButton1").show();
                       //$("#messageboxButton2").hide();
                       //$.mobile.changePage('#messagebox', {transition: 'pop', role: 'dialog'}); 
                       // insert the score.png
                       $("#notepadgraphic").html();
                       var sScore ="";
                       sScore= "<img src=\"images/score.png\"/>";
                       
                       $("#notepadgraphic").html(sScore);
                       $("#mychopdredeemfooter").hide();
                        bNeedToRefreshMychopH = true;            
                       }else{
                       
                       $("#messageboxHeader").html("ChopMe!");
                       $("#messageboxTitle").html("");
                       $("#messageboxContent").html("Redeem Error!  " + data.error.toString());
                       $("#messageboxButton1").html("OK");
                       $("#messageboxButton1").show();
                       $("#messageboxButton2").hide();
                       $.mobile.changePage('#messagebox', {transition: 'pop', role: 'dialog'}); 
                       bNeedToRefreshMychopH = true;
                       }
                       
                       },
                       
                       error: function(XMLHttpRequest, textStatus, errorThrown){
                       $.mobile.pageLoading(true);
                       navigator.notification.alert(errorThrown);
                       }
                       });
                
                
            }
            
            $("#btnDone").live('tap',function(){
                               if (bNeedToRefreshMychopH){
                               $("#btnmychop").trigger('tap')};
                               bNeedToRefreshMychopH = false;
                               
                               
            })
            
            //------------------------------------------------------------------
            
            
            //-------------view the redeemed lis--------------------------------
            $("#btnredeemed").live('tap',function(){
                                   $("#ulRedeemed").html("");
                                   $.mobile.pageLoading();
                                   
                                   $.ajax({
                                          type: "POST",
                                          dataType: 'json',
                                          url:  sServer + "/API/execAPI.php?oid=API_getredeem",
                                          cache: false,
                                          data: "UUIDJYUIIPZMND12mm333dADbBE="+ sUserID,
                                          success: function(data, textStatus, XMLHttpRequest){
                                          $.mobile.pageLoading(true);
                                          DisplayRedeemChops(data);
                                          },
                                          error: function(XMLHttpRequest, textStatus, errorThrown){
                                          $.mobile.pageLoading(true);
                                          navigator.notification.alert(errorThrown);
                                          }
                                          });
                                   
                                   })
            
            
            function DisplayRedeemChops(data){
                var sLi="";
                var sDescription ="";
                var sRedeemDate ="";
                
                var nCount = 0;
                nCount = data.aaData.length;
                
                $("#ulRedeemed").html("");
                
                for(i=0; i<nCount; i++){
                    sDescription = data.aaData[i]["i1"];
                    sRedeemDate = data.aaData[i]["i2"];
                    
                    sLi = "<li data-theme=\"c\" class=\"ui-btn ui-btn-icon-right ui-li ui-btn-down-c ui-btn-up-c\">" + 
                    "<div class=\"ui-btn-inner ui-li\">" + 
                    "<div class=\"ui-btn-text\">" + 
                    "<a href=\"#\" class=\"ui-link-inherit chopmeheader \">" + 
                    "<h3 class=\"ui-li-heading\">" + sDescription + "</h3>" + 
                    "<p class=\"ui-li-desc\">" + sRedeemDate + "</p>" + 
                    "</a>" + 
                    "</div>" + 
                    "</div>" +
                    "</li>";
                    
                    $("#ulRedeemed").append(sLi);
                }
            }
            
            
            //------------------------------------------------------------------
            
            function onLoad() {
                document.addEventListener("deviceready", onDeviceReady, false);
            }
            
            // PhoneGap is ready
            //
            function onDeviceReady() {
                //sWriteData="kong xi fa cai";
                //window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSWrite, fail);
                //window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
                
                //check here i auto login is enable
                //auto login|login form data
                //1|kblim@idb.com.my|kblim
                                
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail)
            }
            
            function ChopMeInitialize(){
            
                
                $.mobile.pageLoading();
                
                if (sReadData.length > 0) {
                    //perform autologin here
                    var mySplitResult = sReadData.split("|");    
                    if (mySplitResult[0] == "1"){
                        
                        //do autologin here
                        
                        $.ajax({
                               type: "POST",
                               dataType: 'json',
                               url:  sServer + "/API/execAPI.php?oid=API_login",
                               cache: false,
                               data: mySplitResult[1],
                               success: function(data, textStatus, XMLHttpRequest){
                               $.mobile.pageLoading(true);
                               bLogin = true;
                               sUserID = data.aaData[0];
                               $.mobile.changePage('#mychoph', {transition: 'slide', role: 'page'});
                                $("#btnmychop").trigger('tap');
                               
                               },
                               error: function(XMLHttpRequest, textStatus, errorThrown){
                               $.mobile.pageLoading(true);
                               navigator.notification.alert("Not able to connect server.  Please try again!");
                               }
                               });
                        
                        
                        
                    }
                }
                //$.mobile.pageLoading(true);
                
            }
            
            //----------------- read file system ------------------------------------------
            function gotFS(fileSystem) {
                fileSystem.root.getFile("readme.txt", {create: true}, gotFileEntry, fail);
            }
            
            function gotFileEntry(fileEntry) {
                fileEntry.file(gotFile, fail);
            }
            
            function gotFile(file){
                //readDataUrl(file);
                readAsText(file);
            }
            
            function readDataUrl(file) {
                var reader = new FileReader();
                reader.onloadend = function(evt) {
                    //console.log("Read as data URL");
                    //console.log(evt.target.result);
                };
                reader.readAsDataURL(file);
            }
            
            function readAsText(file) {
                var reader = new FileReader();
                reader.onloadend = function(evt) {
                    //console.log("Read as text");
                    //console.log(evt.target.result);
                    //navigator.notification.alert(evt.target.result);
                    sReadData = evt.target.result;
                    ChopMeInitialize();
                };
                reader.readAsText(file);
            }
            
            function fail(evt) {
                //console.log(evt.target.error.code);
                navigator.notification.alert(evt.target.error.code);
            }
            //----------------------------------------------------------------------------------
            
            
            //------------ writing file system ------------------------------------
            function gotFSWrite(fileSystem){
                fileSystem.root.getFile("readme.txt", {create: true}, gotFileEntryWrite, failWrite);
            }
            
            function gotFileEntryWrite(fileEntry){
                fileEntry.createWriter(gotFileWrite, failWrite);
            }
            
            function gotFileWrite(writer){
                writer.onwrite = function(evt) {
                    //console.log("write success");
                };
                writer.write(sWriteData);
                writer.abort();
                
            }
            
            var failWrite = function(evt) {
                //console.log(error.code);
                navigator.notification.alert(evt.target.error.code);
                
            };
            
            
            
            //---------------------------------------------------------------------
            
            
            
            $(document).ready(function() {
                              document.addEventListener("deviceready", onDeviceReady, false);
                              
                              $.mobile.pageLoading();
                              
                              $("#submit").click(function(){
                                                 //alert($("#autologin").val());
                                                 if ($("#autologin").attr('checked') == 'checked'){
                                                 bAutoLogin = true;
                                                 }else{
                                                 bAutoLogin = false;
                                                 };
                                                 
                                                 var formData = $("#loginform").serialize();
                                                 
                                                 $.ajax({
                                                        type: "POST",
                                                        dataType: 'json',
                                                        url:  sServer + "/API/execAPI.php?oid=API_login",
                                                        cache: false,
                                                        data: formData,
                                                        success: function(data, textStatus, XMLHttpRequest){
                                                        $.mobile.pageLoading(true);
                                                        onSuccessLogin(data);
                                                        },
                                                        error: function(XMLHttpRequest, textStatus, errorThrown){
                                                        $.mobile.pageLoading(true);
                                                        navigator.notification.alert(errorThrown);
                                                        }
                                                        });
                                                 
                                                 return false;
                                                 });
                              
                              
                              
                              
                              
                              
                              //----------------- DB function is here ------------------------
                              
                              function populateDB(tx) {
                              tx.executeSql('DROP TABLE IF EXISTS DEMO');
                              tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
                              tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
                              tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
                              }
                              
                              function errorCB(err) {
                              navigator.notification.alert("Error processing SQL: "+err);
                              }
                              
                              function successCB() {
                              navigator.notification.alert("success!");
                              }
                              
                              //var db = window.openDatabase("test", "1.0", "Test DB", 1000000);
                              //db.transaction(populateDB, errorCB, successCB);
                              //
                              //--------------------------------------------------------------
                              
                              });    
            
            

            <!--$(document).bind("mobileinit", function() {
                             $.support.touchOverflow = true;
                             
                             $.mobile.touchOverflowEnabled = true;
                             $.mobile.fixedToolbars.setTouchToggleEnabled(true);
            -->
        






            //var sServer = "http://172.20.10.3:8888/ChopMe/source";
            //var sServer = "http://192.168.0.115:8888/ChopMe/source";
            
            //var sServer = "http://idb.com.my/ChopMe";
            var sServer = "http://www.funpunch.me/login";
            var sFacebookConnect = "";
            var bLogin = false;
            var sUserID ="";
            var aChopMeData;
            var sReadData =""; //global var to store the data to write into the file system.
            var sWriteData ="" //global var to store the data read from the file system.
            var bAutoLogin = false;
            var sRedeemData ="" //global var to store the redeemdata that will be sent to server when user
            //request redeem.
            var bNeedToRefreshMychopH = false; //global var to indicate whether need to refresh the mychoph after redeem the voucher
            
            var msQRCode2Punch =""; //global var to store the qr code that need to send to server for punch
            var msSubmitAuth =""; //global var to store the security code or geolocation
            var msGeoLa1 ="";  //global var to store the geolocation Latitud and Longitud
            var msGeoLo1 ="";
            var msGeoLa2 ="";
            var msGeoLo2 =""
            
            //------------------ About -----------------------------------------
            $("#btnAbout").die();
            $("#btnAbout").live('tap', function(event){
                                $.mobile.changePage( sServer + '/control/control.php?id=about', {transition: 'pop', role: 'dialog'});                  
                                });
            
            
            $("#messageboxButton1").live('tap', function(event){
                                         if (bNeedToRefreshMychopH) {
                                         bNeedToRefreshMychopH = false;
                                         $("#btnmychop").trigger('tap');}
                                         })
            //------------------------------------------------------------------
            
            
            
            //----------------- Secret Code Handling ----------------------------
            
            $("#btnSecretCodeOK").live('tap', function(event){
                                       //alert('test');
                                       msSubmitAuth = $("#txtSecretCode").val();
                                       
                                       //submit the QRcode together with the secret code
                                       SubmitQRCode2(msQRCode2Punch);
                                       })
            
            $("#btnSecretCodeCancel").live('tap', function(event){
                                           $("#btnmychop").trigger('tap');
                                           
                                           })
            //------------------------------------------------------------------
            
            
            //--------------- Geolocation Handling -----------------------------
            
            $("#messageboxGeolocationErrorRetry").live('tap',function(event){
                                                       SecurityGeoLocation();
                                                       })
            //------------------------------------------------------------------
            
            
            //----------------- New Member Sign Up -----------------------------
            $("#btnSignUp").die();
            
            $("#btnSignUp").live('tap', function(event){
                                 onSignUp();
                                 })
            
            function onSignUp(){
                $.mobile.changePage( sServer + '/control/control.php?id=signup', {transition: 'pop', role: 'dialog'}); 
            }
            
            $('#SignUp').live('tap', function(){
                              
                              $.mobile.pageLoading();
                              $.ajax({
                                     type: "POST",
                                     dataType: 'json',
                                     url:  sServer + "/API/execAPI.php?oid=API_MbrRegistration",
                                     cache: false,
                                     //timeout:10000,
                                     data: $('#signupform').serialize(),
                                     success: function(data, textStatus, XMLHttpRequest){
                                     if (data.status == 1){      
                                     $.mobile.changePage('#main');
                                     $("#messageboxHeader").html("FunPunch!");
                                     $("#messageboxTitle").html("Congratulations!");
                                     $("#messageboxContent").html("You have Successfully Registered as Our FunPunch Member!!")
                                     $("#messageboxButton1").html("OK");
                                     $("#messageboxButton1").show();
                                     $("#messageboxButton2").hide(); 
                                     $.mobile.changePage('#messagebox', {transition: 'pop', role: 'dialog'});                            
                                     
                                     } else {
                                     navigator.notification.alert(data.error);
                                     }
                                     },
                                     error: function(XMLHttpRequest, textStatus, errorThrown){
                                     $.mobile.pageLoading(true);
                                     navigator.notification.alert(errorThrown);
                                     }
                                     });
                              });
            
            
            //------------------------------------------------------------------
            
            
            //----------------- Member Login Here ------------------------------
            function updateFacebookConnectLink(){
                //update the facebook connect url
                sFacebookConnect = "https://m.facebook.com/dialog/oauth/?scope=offline_access,publish_stream&client_id= 273096159429416&diplay=touch&state=" + sUserID + "&redirect_uri=http://www.funpunch.me/login/FB/FBConnect.php";
                $("#btnFaceBookSignUp").attr("href", sFacebookConnect);
            }
            
            
            function onSuccessLogin(data)
            {
                
                if (data.status == 'OK'){
                    bLogin = true;
                    sUserID = data.aaData[0];
                    $("#current_Email").val($("#email").val());
                    
                    $.mobile.changePage('#mychoph', {transition: 'slide', role: 'page'});
                    
                    
                    if (bAutoLogin){
                        //save the serialize data into the file system.
                        sWriteData = "1|" + $("#loginform").serialize() + "|" + $("#email").val();
                    }else{ sWriteData = ""}
                    
                    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSWrite, failWrite);
                    
                    updateFacebookConnectLink();
                    
                    $("#btnmychop").trigger('tap');                    
                }
                else{
                    $("#messageboxHeader").html("FunPunch!");
                    $("#messageboxTitle").html("Sign In");
                    $("#messageboxContent").html("Not a valid user!  Please try again.")
                    $("#messageboxButton1").html("OK");
                    $("#messageboxButton1").show();
                    $("#messageboxButton2").hide();
                    $.mobile.changePage('#messagebox', {transition: 'pop', role: 'dialog'}); 
                }
                
                //-----------------message box example--------------------------
                //$("#messageboxHeader").html("ChopMe!");
                //$("#messageboxTitle").html("this is a test message box");
                //$("#messageboxContent").html("ChopMe is now available!!!!!")
                //$("#messageboxButton1").html("Continue");
                //$.mobile.changePage('#messagebox', {transition: 'pop', role: 'dialog'}); 
                // <a href="#messagebox" data-rel="dialog" data-transition="pop">Open dialog</a>
                //--------------------------------------------------------------
                
            }
            
            
            function onErrorLogin(data, status)
            {
                // handle an error
                navigator.notification.alert(data);
            }        
            
            //------------------------------------------------------------------
            
            
            //--------------Member logout --------------------------------------
            $("#btnLogout").live('tap', function(){
                                 
                                 sWriteData    ="";
                                 window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSWrite, failWrite);
                                 
                                 })
            
            //------------------------------------------------------------------
            
            
            //--------------Member change password -------------------------------------------
            $("#btnSubmitChgPassword").live('tap', function(event){
                                            //		if($('#current_password').val() == ''){
                                            //		    return false;
                                            //		}
                                            if($('#new_password').val()!= $('#confirm_password').val()){
                                            navigator.notification.alert("Please enter same password.")
                                            return false;
                                            }
                                            //		$("#changePassword").html("");
                                            $.mobile.pageLoading();
                                            $.ajax({
                                                   type: "POST",
                                                   dataType: 'json',
                                                   url:  sServer + "/API/execAPI.php?oid=API_chgpassword",
                                                   cache: false,
                                                   //timeout:10000,
                                                   data: "ID=" + sUserID + '&' + $("#changePassword").serialize(),
                                                   success: function(data, textStatus, XMLHttpRequest){
                                                   if (data.status == "OK"){
                                                   $.mobile.pageLoading(true);
                                                   $("#messageboxHeader").html("FunPunch!");
                                                   $("#messageboxTitle").html("Your Password Has Changed!!");
                                                   $("#messageboxContent").html("")
                                                   $("#messageboxButton1").html("OK");
                                                   $("#messageboxButton1").show();
                                                   $("#messageboxButton2").hide(); 
                                                   $.mobile.changePage('#messagebox', {transition: 'pop', role: 'dialog'}); 
                                                   }else{
                                                   if(sUserID == ''){
                                                   $.mobile.pageLoading(true);
                                                   navigator.notification.alert(data.error);
                                                   $.mobile.changePage('#default', {transition: 'slide', role: 'page'});
                                                   }else{
                                                   $.mobile.pageLoading(true);
                                                   navigator.notification.alert(data.error);
                                                   }
                                                   }
                                                   },
                                                   error: function(XMLHttpRequest, textStatus, errorThrown){
                                                   $.mobile.pageLoading(true);
                                                   navigator.notification.alert(errorThrown);
                                                   }
                                                   });
                                            })
            
            
            //-------------------------------------------------------------------------------------
            
            //--------------List All Chops -------------------------------------
            $("#btnmychop").live('tap', function(){
                                 $("#ulChops").html("");
                                 $.mobile.pageLoading();
                                 $.ajax({
                                        type: "POST",
                                        dataType: 'json',
                                        url:  sServer + "/API/execAPI.php?oid=API_getchops",
                                        cache: false,
                                        //timeout:10000,
                                        data: "UUIDJYUIIPZMND12mm333dADbBE="+ sUserID,
                                        success: function(data, textStatus, XMLHttpRequest){
                                        $.mobile.pageLoading(true);
                                        aChopMeData = data;
                                        DisplayAllChops(data);
                                        },
                                        error: function(XMLHttpRequest, textStatus, errorThrown){
                                        $.mobile.pageLoading(true);
                                        navigator.notification.alert(errorThrown);
                                        }
                                        });
                                 })
            
            
            function DisplayAllChops(data){
                var sLi="";
                var sDescription ="a";
                var sVenue ="b";
                var sCount ="c";
                
                var nCount = 0;
                nCount = data.aaData.length;
                
                $("#ulChops").html("");
                
                for(i=0; i<nCount; i++){
                    sDescription = data.aaData[i]["i1"];
                    sVenue = data.aaData[i]["i3"];
                    sCount = data.aaData[i]["i2"];
                    
                    sLi = "<li data-theme=\"c\" class=\"ui-btn ui-btn-icon-right ui-li ui-btn-down-c ui-btn-up-c\">" + 
                    "<div class=\"ui-btn-inner ui-li\">" + 
                    "<div class=\"ui-btn-text\">" + 
                    "<a id=\"" + i.toString() + "\" href=\"#\" class=\"ui-link-inherit chopmeheader \">" + 
                    "<h3 class=\"ui-li-heading\">" + sDescription + "</h3>" + 
                    "<p class=\"ui-li-desc\">" + sVenue + "</p>" + 
                    "</a>" + 
                    "</div>" + 
                    "<span class=\"ui-icon ui-icon-arrow-r\"></span>" + 
                    "<span class=\"ui-li-aside2 ui-li-desc\">" + sCount + "</span>" + 
                    "</div>" +
                    "</li>";
                    
                    $("#ulChops").append(sLi);
                }
                
                $.mobile.changePage('#mychoph', {transition: 'slide', role: 'page'});
            }
            
            //------------------------------------------------------------------
            
            
            //--------------------- scan QR Code -------------------------------
            $("#btnScanQRCode").live('tap', function(){
                                     
                                     CallCamera();
                                     
                                     })
            
            

    
            function CallCamera(){
                //scan qrcode here
                //SubmitQRCode('01234cHoPmE56789XYZaB');   
                $.mobile.pageLoading();
                window.plugins.barcodeScanner.scan(function(result) {
                    $.mobile.pageLoading(true);
                    SubmitQRCode(result.text);
                    }, function(error) {
                    //navigator.notification.alert(error);
                    $.mobile.pageLoading(true);
                    }
                    
                    );
                
            }
            
            
            function SubmitQRCode(sQRCode){
                
                if (sQRCode.length <20){
                    //not a valid chopme qr code
                    $("#messageboxHeader").html("FunPunch!");
                    $("#messageboxTitle").html("Scanning");
                    $("#messageboxContent").html("This is not a valid FunPunch QR Code!")
                    $("#messageboxButton1").html("OK");
                    $("#messageboxButton1").show();
                    $("#messageboxButton2").hide();
                    $.mobile.changePage('#messagebox', {transition: 'pop', role: 'dialog'}); 
                    
                }else if (sQRCode.substr(5, 6) == "cHoPmE"){
                    //this is a valid chopme qr code
                    $("#messageboxHeader").html("FunPunch!");
                    $("#messageboxTitle").html("");
                    $("#messageboxContent").html("FunPunch QR code detected!  Please wait......");
                    
                    $("#messageboxButton1").hide();
                    $("#messageboxButton2").hide();
                    $.mobile.changePage('#messagebox', {transition: 'pop', role: 'dialog'}); 
                    $.mobile.pageLoading();
                    
                    $.ajax({
                           type: "POST",
                           dataType: 'json',
                           url:  sServer + "/API/execAPI.php?oid=API_sendQRCode",
                           cache: false,
                           //timeout:10000,
                           data: "UUIDJYUIIPZMND12mm333dADbBE=" + sUserID + 
                           "&4787777x2djiPUYTRFGHJIOSASDF78976=" + sQRCode,
                           success: function(data, textStatus, XMLHttpRequest){
                           //close the dialog box here and getchops again
                           $.mobile.pageLoading(true);
                           if (data.status == 0){
                           SubmitQRCodeError();
                           
                           }else if(data.status == 1){
                           //no security password or geolocation is needed for authentication
                           $.mobile.pageLoading(true);
                           SubmitQRCodeSuccess(data);
                           bNeedToRefreshMychopH = true;
                           
                           
                           }else if (data.status == 2){
                           //security password needed
                           msQRCode2Punch = sQRCode;
                           SecurityPassword();
                           
                           }else if (data.status == 3){
                           //geolocation needed
                           msQRCode2Punch = sQRCode;
                           SecurityGeoLocation();
                           }
                           },
                           error: function(XMLHttpRequest, textStatus, errorThrown){
                           $.mobile.pageLoading(true);
                           navigator.notification.alert(errorThrown);
                           }
                           });
                    
                    
                }else{
                    //not a valid chopme qr code
                    $("#messageboxHeader").html("FunPunch!");
                    $("#messageboxTitle").html("Scanning");
                    $("#messageboxContent").html("This is not a valid FunPunch QR Code!")
                    $("#messageboxButton1").html("OK");
                    $("#messageboxButton1").show();
                    $("#messageboxButton2").hide();
                    $.mobile.changePage('#messagebox', {transition: 'pop', role: 'dialog'}); 
                    
                }
            }
            
            
            
            function SubmitQRCode2(sQRCode){
                $.mobile.pageLoading();
                
                $.ajax({
                       type: "POST",
                       dataType: 'json',
                       url:  sServer + "/API/execAPI.php?oid=API_sendQRCode",
                       cache: false,
                       //timeout:10000,
                       data: "UUIDJYUIIPZMND12mm333dADbBE=" + sUserID + 
                       "&4787777x2djiPUYTRFGHJIOSASDF78976=" + sQRCode +
                       "&N3iiZZdck09918109765891nAcebEe8899=" + msSubmitAuth,
                       success: function(data, textStatus, XMLHttpRequest){
                       //close the dialog box here and getchops again
                       $.mobile.pageLoading(true);
                       if (data.status == 0){
                    	   $.mobile.changePage('#mychoph', {transition: 'slide', role: 'page'});
                    	   navigator.notification.alert("Error Or Invalid Secret Code/ Geolocation!");
                       
                       
                       }else if(data.status == 1){
                       
                       $.mobile.pageLoading(true);
                       SubmitQRCodeSuccess(data);
                       bNeedToRefreshMychopH = true;
                       msSubmitAuth = ""; //reset this var
                       }
                       },
                       error: function(XMLHttpRequest, textStatus, errorThrown){
                       $.mobile.pageLoading(true);
                       navigator.notification.alert(errorThrown);
                       }
                       });
            }
            
            
            function SubmitQRCodeError(){ 
                $("#messageboxHeader").html("FunPunch!");
                $("#messageboxTitle").html("");
                $("#messageboxContent").html("This QR code is not valid!");
                $("#messageboxButton1").html("OK");
                $("#messageboxButton1").show();
                $("#messageboxButton2").hide();
            }
            
            function SubmitQRCodeSuccess(data){
                $("#messageboxHeader").html("FunPunch!");
                $("#messageboxTitle").html("");
                $("#messageboxContent").html("Congratulation!  <br>You've Been Punch!<br> " + data.venue + " " + data.desc + ": " + data.score);
                $("#messageboxButton1").html("OK Thanks!");
                $("#messageboxButton1").show();
                $("#messageboxButton2").hide();
                $.mobile.changePage('#messagebox', {transition: 'pop', role: 'dialog'}); 
            }
            
            
            //------------------------------------------------------------------
            
            
            //------------- chop tapped ----------------------------------------
            $(".chopmeheader").live('tap', function(){
                                    var nIndex = $(this).attr('id');
                                    var sRedeem ="";
                                    var bAllowRedeem = false;
                                    bNeedToRefreshMychopH = false;
                                    
                                    //alert(aChopMeData.aaData[nIndex]["i2"]);
                                    
                                    
                                    if (aChopMeData.aaData[nIndex]["i2"] == "FULL"){
                                    //sRedeem = "<a href=\"#\" id=\"" + aChopMeData.aaData[nIndex]["i6"] + "\"  class=\"redeem\" ///data-role=\"button\" data-theme=\"a\">Redeem</a>";
                                    sRedeemData = aChopMeData.aaData[nIndex]["i6"];
                                    bAllowRedeem = true;
                                    }                                                     
                                    var nTotalIn =0;
                                    var nCurrentIn =0;
                                    var sChopImage ="";
                                    var sDealsInfo ="";
                                    
                                    
                                    sDealsInfo =  "<div class=\"Notepad\"><h2>" + aChopMeData.aaData[nIndex]["i1"] + 
                                    "</h2><p>" + aChopMeData.aaData[nIndex]["i3"] + "</p>" +
                                    "<p>" + aChopMeData.aaData[nIndex]["i7"] +  "</p></div>"
                                    
                                    
                                    
                                    nTotalIn = aChopMeData.aaData[nIndex]["TotalIn"];
                                    nCurrentIn = aChopMeData.aaData[nIndex]["CurrentIn"];
                                    
                                    sChopImage = "<div id=\"notepadgraphic2\" class=\"Notepad\"><ul class=\"ImageGalleryList\">";
                                    
                                    for (i=1; i<=nTotalIn; i++){
                                    sChopImage += "<img src=\"";
                                    if (nCurrentIn >= i){
                                    sChopImage += "images/chop.png\"/>";
                                    }else{
                                    sChopImage += "images/nochop.png\"/>";
                                    }
                                    
                                    }
                                    sChopImage += "</ul></div>";
                                    
                                    
                                    if(bAllowRedeem){
                                    
                                    $("#divchopdetailsredeem").html();
                                    $("#divchopdetailsredeem").html(sDealsInfo + sChopImage);
                                    
                                    $.mobile.changePage('#mychopdredeem', {transition: 'slide', role: 'page'}); 
                                    $("#mychopdredeemfooter").show();

                                    
                                    $("#cardinforeddem").html( aChopMeData.aaData[nIndex]["i3"]);
                                    
                                    }else{           
        
                                    $("#divchopdetails").html();
                                    $("#divchopdetails").html(sDealsInfo + sChopImage);
                                    
                                    $.mobile.changePage('#mychopd', {transition: 'slide', role: 'page'});
                                    $("#cardinfo").html( aChopMeData.aaData[nIndex]["i3"]);
                                    }          
                                    })
            //------------------------------------------------------------------
            
            
            //------------ redeem tapped ---------------------------------------
            $("#btnRedeem").live('tap',function(){
                                 //alert($(this).attr("id"));
                                 CallCameraRedeem(sRedeemData);
                                 })
            
            
 
            function CallCameraRedeem(sExtraInfo){
                //scan qrcode here
                
                //SecurityPassword();
                //exit();
                
                $.mobile.pageLoading()
                window.plugins.barcodeScanner.scan(function(result) {
                    $.mobile.pageLoading(true)
                    Redeem(result.text, sExtraInfo);
                    }, function(error) {
                    //navigator.notification.alert(error)
                    $.mobile.pageLoading(true)
                    }
                    
                    );
            }
            
            
            function Redeem(sRedeemID, sExtraInfo){
                $.mobile.pageLoading();
                
                $.ajax({
                       type: "POST",
                       dataType: 'json',
                       url:  sServer + "/API/execAPI.php?oid=API_redeem",
                       cache: false,
                       //timeout:10000,
                       data: "akkdjiiiii883778488492998887jdjhs2=" +  sUserID + "^|" + sRedeemID + "&xZxQeii987CDGdkj32=" + sExtraInfo,
                       success: function(data, textStatus, XMLHttpRequest){
                       $.mobile.pageLoading(true);
                       
                       if (data.status == 1){
                       
                       $("#notepadgraphic2").html();
                       var sScore ="";
                       //sScore= "<img src=\"images/score.png\"/>";
                       sScore ="<RD>Redeemed <br>At: " + data.batchno + "</RD>";
                       $("#notepadgraphic2").html(sScore);
                       $("#mychopdredeemfooter").hide();
     
                       bNeedToRefreshMychopH = true;            
                       }else{
                       
                       $("#messageboxHeader").html("FunPunch!");
                       $("#messageboxTitle").html("");
                       $("#messageboxContent").html("Redeem Error!  " + data.error.toString());
                       $("#messageboxButton1").html("OK");
                       $("#messageboxButton1").show();
                       $("#messageboxButton2").hide();
                       $.mobile.changePage('#messagebox', {transition: 'pop', role: 'dialog'}); 
                       bNeedToRefreshMychopH = true;
                       }
                       
                       },
                       
                       error: function(XMLHttpRequest, textStatus, errorThrown){
                       $.mobile.pageLoading(true);
                       navigator.notification.alert(errorThrown);
                       }
                       });
                
                
            }
            
            function SecurityPassword(){
                $("#txtSecretCode").val("");
                $.mobile.changePage('#messageSecurity', {transition: 'flip', role: 'dialog'});
                
            }
            
            function SecurityGeoLocation(){
                $.mobile.pageLoading();
                navigator.geolocation.getCurrentPosition(onGeoLocationSuccess, onGeoLocationError);
            }
            
            
            function onGeoLocationSuccess(position){
                $.mobile.pageLoading(true);
                //navigator.notification.alert(position.coords.latitude +  ' ' + position.coords.longitude);
                //navigator.geolocation.stop();
                msSubmitAuth = position.coords.latitude + "|" + position.coords.longitude;
                //navigator.notification.alert(msSubmitAuth);
                SubmitQRCode2(msQRCode2Punch);
            }
            
            function onGeoLocationError(error){
                $.mobile.pageLoading(true);
                //navigator.notification.alert(error.message);
                //navigator.geolocation.stop();
                
                $.mobile.changePage('#messageGeolocationError', {transition: 'pop', role: 'dialog'});
                
            }
            
            
            $("#btnDone").live('tap',function(){
                               if (bNeedToRefreshMychopH){
                               $("#btnmychop").trigger('tap')};
                               bNeedToRefreshMychopH = false;
                               
                               
                               })
            
            //------------------------------------------------------------------
            
            
            //-------------view the redeemed lis--------------------------------
            $("#btnredeemed").live('tap',function(){
                                   $("#ulRedeemed").html("");
                                   $.mobile.pageLoading();
                                   
                                   $.ajax({
                                          type: "POST",
                                          dataType: 'json',
                                          url:  sServer + "/API/execAPI.php?oid=API_getredeem",
                                          cache: false,
                                          //timeout:10000,
                                          data: "UUIDJYUIIPZMND12mm333dADbBE="+ sUserID,
                                          success: function(data, textStatus, XMLHttpRequest){
                                          $.mobile.pageLoading(true);
                                          DisplayRedeemChops(data);
                                          },
                                          error: function(XMLHttpRequest, textStatus, errorThrown){
                                          $.mobile.pageLoading(true);
                                          navigator.notification.alert(errorThrown);
                                          }
                                          });
                                   
                                   })
            
            
            function DisplayRedeemChops(data){
                var sLi="";
                var sDescription ="";
                var sRedeemDate ="";
                
                var nCount = 0;
                nCount = data.aaData.length;
                
                $("#ulRedeemed").html("");
                
                for(i=0; i<nCount; i++){
                    sDescription = data.aaData[i]["i1"];
                    sRedeemDate = data.aaData[i]["i2"];
                    
                    sLi = "<li data-theme=\"c\" class=\"ui-btn ui-btn-icon-right ui-li ui-btn-down-c ui-btn-up-c\">" + 
                    "<div class=\"ui-btn-inner ui-li\">" + 
                    "<div class=\"ui-btn-text\">" + 
                    "<a href=\"#\" class=\"ui-link-inherit chopmeheader \">" + 
                    "<h3 class=\"ui-li-heading\">" + sDescription + "</h3>" + 
                    "<p class=\"ui-li-desc\">" + sRedeemDate + "</p>" + 
                    "</a>" + 
                    "</div>" + 
                    "</div>" +
                    "</li>";
                    
                    $("#ulRedeemed").append(sLi);
                }
            }
            
            
            //------------------------------------------------------------------
            
            function onLoad() {
                document.addEventListener("deviceready", onDeviceReady, false);
            }
            
            // PhoneGap is ready
            //
            function onDeviceReady() {
                //sWriteData="kong xi fa cai";
                //window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSWrite, fail);
                //window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
                
                //check here i auto login is enable
                //auto login|login form data
                //1|kblim@idb.com.my|kblim
                
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail)
            }
            
            function ChopMeInitialize(){
                //loader();
                
                if (sReadData.length > 0) {
                    //perform autologin here
                    var mySplitResult = sReadData.split("|");    
                    if (mySplitResult[0] == "1"){
                        
                        //do autologin here
                        $.mobile.pageLoading();
                        
                        $.ajax({
                               type: "POST",
                               dataType: 'json',
                               url:  sServer + "/API/execAPI.php?oid=API_login",
                               cache: false,
                               //timeout:10000,
                               data: mySplitResult[1],
                               success: function(data, textStatus, XMLHttpRequest){
                               $.mobile.pageLoading(true);
                               if (data.status == 'OK'){
                               bLogin = true;
                               sUserID = data.aaData[0];
                               $("#current_Email").val(mySplitResult[2]);
                               
                               $.mobile.changePage('#mychoph', {transition: 'slide', role: 'page'});
                               updateFacebookConnectLink();
                               $("#btnmychop").trigger('tap');
                               
                               }else{
                               navigator.notification.alert("Not able to auto login!.  Please Login Again.");
                               $.mobile.changePage('#signin', {transition: 'slide', role: 'page'});
                               }},
                               error: function(XMLHttpRequest, textStatus, errorThrown){
                               $.mobile.pageLoading(true);
                               navigator.notification.alert("Not able to connect server.  Please try again!");
                               }
                               });
                        
                    }
                }
                //$.mobile.pageLoading(true);
                
            }
            
            //----------------- read file system ------------------------------------------
            function gotFS(fileSystem) {
                fileSystem.root.getFile("readme.txt", {create: true}, gotFileEntry, fail);
            }
            
            function gotFileEntry(fileEntry) {
                fileEntry.file(gotFile, fail);
            }
            
            function gotFile(file){
                //readDataUrl(file);
                readAsText(file);
            }
            
            function readDataUrl(file) {
                var reader = new FileReader();
                reader.onloadend = function(evt) {
                    //console.log("Read as data URL");
                    //console.log(evt.target.result);
                };
                reader.readAsDataURL(file);
            }
            
            function readAsText(file) {
                var reader = new FileReader();
                reader.onloadend = function(evt) {
                    //console.log("Read as text");
                    //console.log(evt.target.result);
                    //navigator.notification.alert(evt.target.result);
                    sReadData = evt.target.result;
                    ChopMeInitialize();
                };
                reader.readAsText(file);
            }
            
            function fail(evt) {
                //console.log(evt.target.error.code);
                navigator.notification.alert(evt.target.error.code);
            }
            //----------------------------------------------------------------------------------
            
            
            //------------ writing file system ------------------------------------
            function gotFSWrite(fileSystem){
                fileSystem.root.getFile("readme.txt", {create: true}, gotFileEntryWrite, failWrite);
            }
            
            function gotFileEntryWrite(fileEntry){
                fileEntry.createWriter(gotFileWrite, failWrite);
            }
            
            function gotFileWrite(writer){
                writer.onwrite = function(evt) {
                    //console.log("write success");
                };
                writer.write(sWriteData);
                writer.abort();
                
            }
            
            var failWrite = function(evt) {
                //console.log(error.code);
                navigator.notification.alert(evt.target.error.code);
                
            };
            
            
            
            //---------------------------------------------------------------------
            
            
            
            //----------- google map ----------------------------------------------
            function loader() {
                var state = document.readyState;
                if (state == 'loaded' || state == 'complete') {
                    run();
                } else {
                    if (navigator.userAgent.indexOf('Browzr') > -1) {
                        setTimeout(run, 250);
                    } else {
                        document.addEventListener('deviceready',run,false);
                    }
                }
            }
            
            function run() {
                var win = function(position) {                         
                    // Grab coordinates object from the Position object passed into success callback.
                    var coords = position.coords;
                    // Call for static google maps data - make sure you use your own Google Maps API key!
                    var url = "http://maps.google.com/maps/api/staticmap?center=" + coords.latitude + "," + coords.longitude + "&zoom=13&size=320x480&maptype=roadmap&key=MyGoogleMapsAPIKey&sensor=true";
                    document.getElementById('map').setAttribute('src',url);
                };
                var fail = function(e) {
                    alert('Can\'t retrieve position.\nError: ' + e);
                };
                navigator.geolocation.getCurrentPosition(win, fail);
            } 
            
            //---------------------------------------------------------------------
            
            $(document).ready(function() {
                              document.addEventListener("deviceready", onDeviceReady, false);
                              
                              $.mobile.pageLoading();
                              
                              $("#submit").click(function(){
                                                 //alert($("#autologin").val());
                                                 $.mobile.pageLoading();
                                                 if ($("#autologin").attr('checked') == 'checked'){
                                                 bAutoLogin = true;
                                                 }else{
                                                 bAutoLogin = false;
                                                 };
                                                 
                                                 var formData = $("#loginform").serialize();
                                                 
                                                 $.ajax({
                                                        type: "POST",
                                                        dataType: 'json',
                                                        url:  sServer + "/API/execAPI.php?oid=API_login",
                                                        cache: false,
                                                        //timeout:100000,
                                                        data: formData,
                                                        success: function(data, textStatus, XMLHttpRequest){
                                                        $.mobile.pageLoading(true);
                                                        
                                                        onSuccessLogin(data);
                                                        },
                                                        error: function(XMLHttpRequest, textStatus, errorThrown){
                                                        $.mobile.pageLoading(true);
                                                        
                                                        navigator.notification.alert(textStatus);
                                                        }
                                                        });
                                                 
                                                 return false;
                                                 });
                              
                              
                              
                              
                              
                              
                              //----------------- DB function is here ------------------------
                              
                              function populateDB(tx) {
                              tx.executeSql('DROP TABLE IF EXISTS DEMO');
                              tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
                              tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
                              tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
                              }
                              
                              function errorCB(err) {
                              navigator.notification.alert("Error processing SQL: "+err);
                              }
                              
                              function successCB() {
                              navigator.notification.alert("success!");
                              }
                              
                              //var db = window.openDatabase("test", "1.0", "Test DB", 1000000);
                              //db.transaction(populateDB, errorCB, successCB);
                              //
                              //--------------------------------------------------------------
                              
                              });    
            
            

            $(document).bind("mobileinit", function() {
                             $.support.touchOverflow = false;
                             
                             $.mobile.touchOverflowEnabled = false;
                             $.mobile.fixedToolbars.setTouchToggleEnabled(false);
                             })
            
            
