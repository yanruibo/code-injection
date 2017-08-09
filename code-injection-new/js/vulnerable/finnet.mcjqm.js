





            $('#transferbankpage').on('pageshow', function(e,data){
                if((localStorage.norekk !='') || (localStorage.nomortujuan !='')){
                    $("#destrek").val(localStorage.norekk);
                    $("#destphone").val(localStorage.nomortujuan);
                }
                $("#viewkontak").hide();
            });
            
            //Batasssssssssssssssss get contact
                $("#kontak").click(function(){
                    //$.mobile.changePage("kontakview.html",{ transition: "slide"});
                    onDeviceReady();
                    //$("#viewkontak").show();
                });
                
                function findContactSuccess(contacts){
                            var contact_name;
                            var contact_phone;
                            //alert("aso");
                            for(var i = 0; i < contacts.length; i++){
                                if(contacts[i].name.formatted != null && contacts[i].name.formatted != undefined ) {
                                            contact_name = contacts[i].name.formatted;
                                            contact_name = contact_name.replace(/'/g,"''");
                                            if(contacts[i].phoneNumbers != null && contacts[i].phoneNumbers.length > 0 && contacts[i].phoneNumbers[0].value != null && contacts[i].phoneNumbers[0].value != undefined ) {
                                                //alert( contacts[i].displayName +" | " + contacts[i].phoneNumbers[0].value);
                                                var display_name = contacts[i].displayName;
                                                contact_phone = contacts[i].phoneNumbers[0].value;

                                                $("#fieldList").append($('<li/>', { 'data-role': "list-divider"   //here appending `<li>`
                                                    }).append($('<a/>', { 'href': '#', 'text': display_name+" | "+contact_phone })));  //here appending `<a>` into `<li>`
                                                
                                                //$("#fieldList").append("<li>something" + display_name + "</li>");
                                                $("#fieldList").listview('refresh');
                                            } else {
                                                //alert( "--No Number-" );
                                                contact_phone = "";
                                            }
                                }
                            }
                }


                function findContactError(contactError){
                    alert("Access ke kontak gagal");
                }

                function onDeviceReady(){
                    var options = new ContactFindOptions();
                    options.filter = $("#findContactForm #searchName").val();
                    options.multiple=true;

                    var fields = ["displayName", "name", "phoneNumbers"];
                    navigator.contacts.find(fields, findContactSuccess, findContactError, options);
                }
            //Batassssssssssssssssssssss get contact
            
            
            $(document).ready(function(){
                jQuery.get('kodebank.txt',function(data){
                    var lines = data.split("\n");
                    $.each(lines, function(n, elem){
                        //$('#banklist').append("<option value=''>"+elem+"</option>");
                        var datass = new Array();
                        datass=elem.split(",");
                        $('#banklist').append("<option value='"+datass[0]+"'>"+datass[1]+"</option>");
                    });
                });
            });
            
            $("#subbankmc").click(function(){
                $.mobile.allowCrossDomainPages = true;
                $.support.cors = true;
                $.mobile.showPageLoadingMsg();
                var ph = localStorage.phonenumber;
                var pins = $("#pinss").val();
                var destph = $("#destphone").val();
                var berita = $("#berita").val();
                var norek = $("#destrek").val();
                var kodebank = $("#banklist option:selected").val();
                
                var date= new Date();
                localStorage.nomortujuan= destph;
                localStorage.norekk= norek;
                localStorage.date= date;
                //localStorage.listbank= $("#listbanks option:selected").val();
                //alert(kodebank);
                //alert(norek);
                var amt = $("#amount").val();
                var qurl = "http://klikmc.com/mcjqmjson/bankTransfer.php";
                var datakirim = JSON.stringify({"phone":ph,"pin":pins,"notel_penerima":destph, "berita":berita, "no_rek":norek, "kode_bank":kodebank, "amount":amt});
                var myrequest =  $.ajax({
                    url: qurl,
                    data: datakirim,
                    type: "POST",
                    crossDomain: true,
                    dataType: "text"
                });
                
                myrequest.success(function(resp) {
                    //alert(resp);
						
                    var s = JSON.parse(resp);
                    if(s.rc == "00"){
                        $.mobile.hidePageLoadingMsg();
                        var ph = localStorage.phonenumber;
                        var ssid = localStorage.lssessid;
                        //$.mobile.changePage("konftrbank.html",{ transition: "slide"});
                        $.mobile.changePage("konftrbank.html", {data:{conf:s.konfirm,recipientName:s.recipientName,recipientPhoneNum:s.recipientPhoneNum,kode_bank:s.kode_bank,no_rek:s.no_rek,news:s.news,senderName:s.senderName,senderId:s.senderId,amount:s.amount,refCode:s.refCode,recipientNotif:s.recipientNotif,  pins:pins}},"slide");
                    }
                    else{
                        $.mobile.hidePageLoadingMsg();
                        $.mobile.changePage( "respon.html" ,{data:{msg:s.msg}},"slide");
                    }
                });
            });
        






                $("#oklg").click(function(){
                    localStorage.dg4sms = "";
                    //alert(localStorage.dg4sms);
                    localStorage.phonenumber = "";
                    //alert(localStorage.phonenumber);
                    localStorage.lsrc = "";
                    //alert(localStorage.lsrc);
                    localStorage.lsid = "";
                    //alert(localStorage.lsid);
                    localStorage.lssessid = "";
                    //alert(localStorage.lssessid);
                    $.mobile.changePage( "index.html" );
                });
            





                                        $('#plnpascapage').on('pageshow', function(e,data){
                                            if(localStorage.idpelpasca !=''){
                                                $("#destpel").val(localStorage.idpelpasca);
                                            }
                                        });
                                        
					$('#subplnpasca').click(function() {
						$.mobile.allowCrossDomainPages = true;
						$.support.cors = true;
						$.mobile.showPageLoadingMsg(); 
						var ph = localStorage.phonenumber;
						var dest = $("#destpel").val();
						var ssid = localStorage.lssessid;
						var pins = $("#pinss").val();
						var qurl = "http://klikmc.com/mcjqmjson/pln.php";
						var datakirim = JSON.stringify({"pin":pins,"idpel":dest,"phone":ph,"sessid":ssid});
						var myrequest =  $.ajax({
							url: qurl,
							data: datakirim,
							type: "POST",
							crossDomain: true,
							dataType: "text"
						});
						myrequest.success(function(resp) {
							$.mobile.hidePageLoadingMsg();
							//alert(resp);
                                                        localStorage.idpelpasca=dest;
                                                        
							var s = JSON.parse(resp);
							if(s.rc=="00"){
							localStorage.idpelplnpasca = s.idpel;
							localStorage.billnameplnpasca = s.billname;
							localStorage.amountplnpasca = s.amount;
							localStorage.feeplnpasca = s.feeadm;
							localStorage.totalplnpasca = s.total;
							localStorage.confplnpasca = s.conf;
							$.mobile.changePage("konfplnpasca.html");}
							else{
							//localStorage.msgplnpasca = resp;
							$.mobile.changePage( "respon.html" ,{data:{msg:s.msg}},"slide");
							}
						});
					});
				





					$('#subshadaqah').click(function() {
						$.mobile.allowCrossDomainPages = true;
						$.support.cors = true;
						$.mobile.showPageLoadingMsg(); 
						var ph = localStorage.phonenumber;
						var idlembaga = $("#lembaga option:selected").val();
						var ssid = localStorage.lssessid;
						var pins = $("#pinss").val();
						var denom = $("#nominal option:selected").val();
						var qurl = "http://klikmc.com/mcjqmjson/MCAmal.php";
						var datakirim = JSON.stringify({"phone": ph, "pin" :pins, "opr":"Sedekah", "denom": denom, "notel":idlembaga});
						var myrequest =  $.ajax({
							url: qurl,
							data: datakirim,
							type: "POST",
							crossDomain: true,
							dataType: "text"
						});
						myrequest.success(function(resp) {
							$.mobile.hidePageLoadingMsg();
							//alert(resp);
							var s = JSON.parse(resp);
							 $.mobile.changePage("respon.html", {data:{msg:s.msg}},"slide");
						});
					});
				





					$('#responpage').on('pageshow', function(){
						var param1 = getParameterByName('msg');
						$("#respon").text("");
						$("#respon").text(param1);
						
						//alert(param1);
					});
					
					$('#subgantipinregister').click(function(){
						var date = new Date();
						var m = date.getMonth()+1;
						var d = date.getDate();
						var tgss = date.getFullYear()+''+ (m<10 ? '0' : '') + m + '' +(d<10 ? '0' : '') + d;
						
						var param2 = getParameterByName('sessionid');
						var param3 = getParameterByName('phonex');
						localStorage.phonenumber = param3;
						localStorage.lssessid = param2;
						localStorage.datelogin = tgss;
						$.mobile.changePage( "home.html" ,{transition:"slide"});
					});
					
					function getParameterByName(name) {
                        var match = RegExp('[?&]' + name + '=([^&]*)').exec(document.location);
                        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
                    }
				





				$("#subremmitfc").click(function(){
					$.mobile.allowCrossDomainPages = true;
					$.support.cors = true;
					$.mobile.showPageLoadingMsg();
					var ph = localStorage.phonenumber;
					var pins = $("#pinss").val();
					var destph = $("#destphone").val();
					var institusi = $("#institusi").val();
					var berita = $("#berita").val();
					var destname = $("#destname").val();
					//alert(kodebank);
					//alert(norek);
					var amt = $("#amount").val();
					var qurl = "http://klikmc.com/mcjqmjson/remittance.php";
					var datakirim = JSON.stringify({"phone":ph,"pin":pins,"nama_penerima":destname,"notel_penerima":destph, "berita":berita, "institusi":institusi,"amount":amt});
					var myrequest =  $.ajax({
						url: qurl,
						data: datakirim,
						type: "POST",
						crossDomain: true,
						dataType: "text"
					});
					myrequest.success(function(resp) {
						//alert(resp);
						
						var s = JSON.parse(resp);
						if(s.rc == "00"){
						$.mobile.hidePageLoadingMsg();
						localStorage.reminstitusi = s.institusi;
						//alert(localStorage.reminstitusi);
						localStorage.remdestname = s.recipientName;
						//alert(localStorage.remdestname);
						localStorage.remdestphone = s.recipientPhoneNum;
						localStorage.remnews = s.news;
						localStorage.remsendername = s.senderName;
						localStorage.remsenderid = s.senderId;
						localStorage.remamount = s.amount;
						//alert(	localStorage.remamount);
						localStorage.remrefCODE = s.refCode;
						localStorage.remnotif = s.recipientNotif;
						$.mobile.changePage("konftrrem.html",{ transition: "slide"});
						}
						else{
						$.mobile.hidePageLoadingMsg();
						//alert(resp);
						//localStorage.remmsg = s.msg;
						$.mobile.changePage( "respon.html" ,{data:{msg:s.msg}},"slide");
						}
								
					});
				});
			





                    $("#subceksaldo").click(function(){
                        
                        var pinsaldo = $("#pinsaldo").val();
										
                        $.mobile.showPageLoadingMsg(); 
                        $.mobile.allowCrossDomainPages = true;
                        $.support.cors = true;
										
                        var qurl = "http://www.klikmc.com/mcjqmjson/checksaldo.php";
                        //var dg2 = localStorage.lsid;
                        var ph = localStorage.phonenumber;
                        var ssid = localStorage.lssessid;
                        //var key = dg2+'-'+dg4;
                        var dtkirim = JSON.stringify({"phone":ph,"pin":pinsaldo,"sessid":ssid});
                        //alert(dtkirim);
                        var request =  $.ajax({
                            url: qurl,
                            data: dtkirim,
                            type: "POST",
                            crossDomain: true,
                            dataType: "text",
                        });
                        request.success(function(resp){
                            $.mobile.hidePageLoadingMsg();
                            //alert(resp);
                            //alert(JSON.parse(resp));
													
                            //save
                            var s = JSON.parse(resp);
                            localStorage.msg = s.msg;
													
                            if(s.rc=="00"){
                                //alert(s.msg);
                                $("#pinsaldo").val("");
                                $.mobile.changePage("respon.html", {data:{msg:s.msg}},"slide");
														
                            }
                            else{
                                $("#pinsaldo").val("");
                                $.mobile.changePage("saldoresp.html", {data:{msg:s.msg}},"slide");
                            }
														
													
                        });
										
                    });
                





                            $('#responpage').on('pageshow', function(){
                                var param1 = getParameterByName('resp1');
								var param2 = getParameterByName('resp2');
								var param3 = getParameterByName('resp3');
								var param4 = getParameterByName('resp4');
								var param5 = getParameterByName('resp5');
                                $("#respon").text("");
                                $("#respon").text(param1);
								$("#respon2").text("");
                                $("#respon2").text(param2);
								$("#respon3").text("");
                                $("#respon3").text(param3);
								$("#respon4").text("");
                                $("#respon4").text(param4);
								$("#respon5").text("");
                                $("#respon5").text(param5);
						
                                //alert(param1);
                            });
					
                            function getParameterByName(name) {
                                var match = RegExp('[?&]' + name + '=([^&]*)').exec(document.location);
                                return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
                            }
                        





                        $('#banktransferpage').on('pageshow', function(e,data){
                            //getParameterByName('conf')
                            $("#receivename").val(getParameterByName('recipientName'));
                            $("#receivephone").val(getParameterByName('recipientPhoneNum'));
                            $("#notes2").val(getParameterByName('news'));
                            $("#norek2").val(getParameterByName('no_rek'));
                            $("#bankcode").val(getParameterByName('kode_bank'));
                            $("#sendername").val(getParameterByName('senderName'));
                            $("#senderid").val(getParameterByName('senderId'));
                            $("#amount2").val(getParameterByName('amount'));
                            $("#refcode2").val(getParameterByName('refCode'));
                            $("#refnotif").val(getParameterByName('recipientNotif'));
                            $("#pin111").val(getParameterByName('pins'));
                               
                            
                            
                        });
                        $("#subtrkof").click(function(){
                            $.mobile.allowCrossDomainPages = true;
                            $.support.cors = true;
                            $.mobile.showPageLoadingMsg();
                            
                            var ph = localStorage.phonenumber;
                            var ssid = localStorage.lssessid;
                            var pin = $("#pin111").val();
                            var qurl = "http://klikmc.com/mcjqmjson/bankTransferPros.php";
                            var datakirim = JSON.stringify({pin:pin, phone: ph,sessid:ssid, nama_penerima:$('#receivename').val(), notel_penerima:$('#receivephone').val(), berita:$('#notes2').val(), no_rek:$('#norek2').val(), kode_bank:$('#bankcode').val(), nama_pengirim:$('#sendername').val(), id_pengirim:$('#senderid').val(), amount:$('#amount2').val(), refcode:$('#refcode2').val(), notif:$('#refnotif').val()});
                            var myrequest =  $.ajax({
                                url: qurl,
                                data: datakirim,
                                type: "POST",
                                crossDomain: true,
                                dataType: "text"
                            });
                            myrequest.success(function(resp) {
                                //alert(resp);
                                var s = JSON.parse(resp);
                                //alert(s.msg);
                                //localStorage.msgkonfmc = resp;
                                var date = new Date();
                                localStorage.date11=date;
                                localStorage.nopepenerima = $('#receivephone').val();
                                localStorage.namapenerima = $('#receivename').val();
                                localStorage.noreken = $('#norek2').val();
                                localStorage.namapengirim = $('#sendername').val();
                                localStorage.reffcode = $('#refcode2').val();
                                localStorage.amount = $('#amount2').val();
                                $.mobile.hidePageLoadingMsg();
                                
                                $.mobile.changePage( "respon.html" ,{data:{msg:s.msg}},"slide");
                            });
                        });
                        function getParameterByName(name) {
                            var match = RegExp('[?&]' + name + '=([^&]*)').exec(document.location);
                            return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
                        }
                    





					$(document).ready(function(){
						$("#email").val(localStorage.phonenumber+"@mcmobilecash.com");
					});
					$('#submcpay').click(function(){
						$.mobile.allowCrossDomainPages = true;
						$.support.cors = true;
						$.mobile.showPageLoadingMsg();
                                                
						var ph = localStorage.phonenumber;
						var merchantcode = $("#cdmerchant").val();
						var emailq = $("#email").val();
						var amount = $("#amount").val();
						var ssid = localStorage.lssessid;
						var pins = $("#pinss").val();
						var qurl = "http://klikmc.com/mcjqmjson/voucher.php";
						var datakirim = JSON.stringify({"pin": pins, "kode": merchantcode, "email": emailq, "denom": amount, "sessionid": ssid, "phone":ph});
						//alert(datakirim);
						var myrequest =  $.ajax({
							url: qurl,
							data: datakirim,
							type: "POST",
							crossDomain: true,
							dataType: "text"
						});
						myrequest.success(function(resp) {
							$.mobile.hidePageLoadingMsg();
                                                        localStorage.merchantcode=merchantcode; //simpan merchant kode di localstorage
							//alert(resp);
							var s = JSON.parse(resp);
							if(s.rc=="00"){
							$.mobile.changePage( "respon.html" ,{data:{msg:s.msg}},"slide");
							}
							else{
							$.mobile.changePage( "respon.html" ,{data:{msg:s.msg}},"slide");
							}
						});
					});
				





                            $('#subgantipin').click(function() {
				$.mobile.allowCrossDomainPages = true;
                                    $.support.cors = true;
					$.mobile.showPageLoadingMsg(); 
                                        var ph = localStorage.phonenumber;
                                        var pinbaru = $("#pinbaru").val();
                                        var pinlama = $("#pinlama").val();
                                        var ssid = localStorage.lssessid;
                                        var pinbarukonf = $("#pinbarukonf").val();
                                        var qurl = "http://www.klikmc.com/mcjqmjson/changepin.php";
                                        var datakirim = JSON.stringify({"pinbaru": pinbaru, "pinbaru2": pinbarukonf, "pinlama": pinlama, "sessid": ssid, "phone": ph});
                                            //alert(datakirim);
                                        var myrequest =  $.ajax({
                                            url: qurl,
                                            data: datakirim,
                                            type: "POST",
                                            crossDomain: true,
                                            dataType: "text"
					});
					myrequest.success(function(resp){
						$.mobile.hidePageLoadingMsg();
						//alert(resp);
						var s = JSON.parse(resp);
						if(s.rc=="00"){
                                                    $.mobile.changePage("respon.html" ,{data:{msg:s.msg}},"slide");
						}
						else{
                                                    $.mobile.changePage("respon.html" ,{data:{msg:s.msg}},"slide");
						}
					});
                            });
			





					$('#konfplnpra').on('pageshow', function(){
						var param1 = getParameterByName('msg');
						$("#conf").val(getParameterByName('conf'));
						$("#respon").text("");
						$("#respon").text(param1);
						//alert(param1);
						
						//alert(param1);
					});
					$('#subkonffinpay').click(function() {
						$.mobile.allowCrossDomainPages = true;
						$.support.cors = true;
						$.mobile.showPageLoadingMsg();
						var ph = localStorage.phonenumber;
						var conf = $("#conf").val();
						var pins = $("#pinss").val();
						var ssid = localStorage.lssessid;
						var qurl = "http://klikmc.com/mcjqmjson/confirmplnpra.php";
						var datakirim = JSON.stringify({"pin": pins, "conf": conf,"sessid":ssid,  "phone": ph});
						//alert(datakirim);
						var myrequest =  $.ajax({
							url: qurl,
							data: datakirim,
							type: "POST",
							crossDomain: true,
							dataType: "text"
						});
						myrequest.success(function(resp) {
							$.mobile.hidePageLoadingMsg();
							//alert(resp);
                                                        
							var s = JSON.parse(resp);
							var msgnya = s.msg;
							var lines = msgnya.split(";");
							var param1 = lines[0]+" "+lines[1]+" "+lines[2];
							$.mobile.changePage("respon.html" ,{data:{msg:param1}},"slide");							
						});
					});
					
					function getParameterByName(name) {
                        var match = RegExp('[?&]' + name + '=([^&]*)').exec(document.location);
                        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
                    }
				





				$(document).ready(function(){
					$("#institusion").val(localStorage.reminstitusi);
					$("#destnames").val(localStorage.remdestname);
					$("#destph").val(localStorage.remdestphone);
					$("#news").val(localStorage.remnews);
					$("#senders").val(localStorage.remsendername);
					$("#senderId").val(localStorage.remsenderid);
					$("#amounts").val(localStorage.remamount);
					//$("#destnotif").val(localStorage.remnotif);
					//alert(localStorage.remnotif);
				});
				$("#subtrkofrem").click(function(){
						$.mobile.allowCrossDomainPages = true;
						$.support.cors = true;
						$.mobile.showPageLoadingMsg(); 
						var ph = localStorage.phonenumber;
						//alert(ph);
						var ins = 	$("#institusion").val();
						//alert(ins);
						var destname = $("#destnames").val();
					//	alert(destname);
						var destph = $("#destph").val();
						//alert(destph);
						var news = $("#news").val();
						//alert(news);
						var sendname = $("#senders").val();
						//alert(sendname);
						var sendId = $("#senderId").val();
					//	alert(sendId);
						var amt = $("#amounts").val();
					//	alert(amt);
						var pins = $("#pinsss").val();
					//	alert(pins);
						var code = localStorage.remrefCODE;
					//	alert(code);
						var note = localStorage.remnotif;
					//	alert(note);
						var ssid = localStorage.lssessid;
					//	alert(ssid);
						var qurl = "http://klikmc.com/mcjqmjson/remittancepros.php";
						var datakirim = JSON.stringify({"pin":pins,"phone":ph,"institusi":ins,"nama_penerima":destname,"notel_penerima":destph,"berita":news, "nama_pengirim":sendname,"id_pengirim":sendId,"amount":amt,"refcode":code,"notif":note});
						var myrequest =  $.ajax({
							url: qurl,
							data: datakirim,
							type: "POST",
							crossDomain: true,
							dataType: "text"
						});
						myrequest.success(function(resp) {
							//alert(resp);
							var s = JSON.parse(resp);
							//alert(s.msg);
							//localStorage.msgkonfrem = resp;
							$.mobile.hidePageLoadingMsg();
							$.mobile.changePage( "respon.html" ,{data:{msg:s.msg}},"slide");
						});
				});
			






                        document.addEventListener("deviceready", onDeviceReady, false);
                            function onDeviceReady(){
                                document.addEventListener("backbutton", function(e){
                                    if($.mobile.activePage.is('#home')){
                                        e.preventDefault();
                                        exitAppPopup();
                                    }
                                    /*else {
                                        navigator.app.backHistory();
                                    }*/
                                }, false);
                            }
                        $("#exit").click(function(){
                            exitAppPopup();
                        });
                        function exitAppPopup() {
                            navigator.notification.confirm(
                            'Exit Delima eMoney?'
                            , function(button) {
                                if (button == 2) {
                                    navigator.app.exitApp();
                                }
                            }
                            , 'Exit'
                            , 'No,Yes'
                        );  
                            return false;
                        }
                    






        $('#listkontak').on('pageshow', function(e,data){
            //alert("asolole");
            onDeviceReady();
        });
        
        function findContactSuccess(contacts){
            $.mobile.hidePageLoadingMsg();
            var contact_name;
            var contact_phone;
            //alert(contacts.length);
            for(var i = 0; i < contacts.length; i++){
                if(contacts[i].name.formatted !== null && contacts[i].name.formatted !== undefined ) {
                    contact_name = contacts[i].name.formatted;
                    contact_name = contact_name.replace(/'/g,"''");
                    if(contacts[i].phoneNumbers !== null && contacts[i].phoneNumbers.length > 0 && contacts[i].phoneNumbers[0].value !== null && contacts[i].phoneNumbers[0].value !== undefined ) {
                        //alert( contacts[i].displayName +" | " + contacts[i].phoneNumbers[0].value);
                        var display_name = contacts[i].displayName;
                        contact_phone = contacts[i].phoneNumbers[0].value;
                        
                        $("#fieldList").append($('<li/>', {'data-role': "list-divider"   //here appending `<li>`
                            }).append($('<a/>', { 'href': '#', 'text': s+" | "+contact_phone })));  //here appending `<a>` into `<li>`
                        
                    }else {
                        //alert( "--No Number-" );
                        contact_phone = "";
                    }
                }
            }
        }

        function findContactError(contactError){
            alert("Access ke kontak gagal");
        }

        function onDeviceReady(){
            $.mobile.showPageLoadingMsg();
            var options = new ContactFindOptions();
            options.filter = $("#findContactForm #searchName").val();
            options.multiple=true;

            var fields = ["displayName", "name", "phoneNumbers"];
            //findContactSuccess();
            navigator.contacts.find(fields, findContactSuccess, findContactError, options);
        }

    





                    $('#transfermc').on('pageshow', function(){
                        if ((localStorage.nopelanggantsel != '')) {
                            $("#destphone").val(localStorage.nomorpelmc);
                        }
                        
                        $('#listkontak').css('overflow-y', 'scroll-y'); 
                        onDeviceReady();
                    });
                    
                    //get kontak
                            function findContactSuccess(contacts) {
                                var contact_name;
                                //alert("aso");
                                for (var i = 0; i < contacts.length; i++){
                                    if (contacts[i].name.formatted != null && contacts[i].name.formatted != undefined) {
                                        contact_name = contacts[i].name.formatted;
                                        contact_name = contact_name.replace(/'/g, "''");
                                        if (contacts[i].phoneNumbers != null && contacts[i].phoneNumbers.length > 0 && contacts[i].phoneNumbers[0].value != null && contacts[i].phoneNumbers[0].value != undefined) {
                                            //alert( contacts[i].displayName +" | " + contacts[i].phoneNumbers[0].value);
                                            var display_name = contacts[i].displayName;
                                            var contact_phone = contacts[i].phoneNumbers[0].value;

                                            //var oni = parseInt(contact_phone);

                                            //$("#fieldList").append($('<li/>', { 'data-role': "list-divider",'id':'kontak_klik'+i, 'text': display_name + " | " + contact_phone , 'value':contact_phone}));  //here appending `<a>` into `<li>`
                                            $("#fieldList").append('<li id="'+"kontak_klik"+i+'" value="'+contact_phone+'" onclick="ahay(\''+contact_phone+'\');">'+display_name + " | " + contact_phone+'</li>');   
                                        }
                                    }
                                }

                                $("#fieldList").listview('refresh');
                                //return false;
                                $.mobile.hidePageLoadingMsg();
                            }

                            function ahay(vals){
                                //var pattern = /[0-9a-zA-Z]+/g;
                                var no= vals.replace( new RegExp(/[^0-9]+/g),"");
                                if(no.substring(0,2) == "62"){
                                    no="0"+no.substring(2);
                                }
                                $("#destphone").val(no);
                                $("#listkontak").popup('close');
                            }

                            function findContactError(contactError){
                                alert("Access ke kontak gagal");
                            }

                            function onDeviceReady(){
                                //$.mobile.showPageLoadingMsg();
                                $.mobile.showPageLoadingMsg("b", "Memuat Kontak");
                                //$.mobile.loader.prototype.options.text = "loading";
                                //$("#listkontak").popup('open');
                                var options = new ContactFindOptions();
                                //options.filter = $("#findContactForm ").val();
                                options.multiple = true;

                                var fields = ["displayName", "name", "phoneNumbers"];
                                navigator.contacts.find(fields, findContactSuccess, findContactError, options);
                                
                            }
                            
                            $("#klosepopup").click(function(){
                                $( "#listkontak").popup("close");
                                return false;
                            });
                            
                            $('#listkontak').on({
                                popupbeforeposition: function(){
                                  var maxHeight = $(window).height() - 140;
                                  $('#listkontak').css('max-height', maxHeight + 'px');
                                }
                            });
                            //batas get kontak
                            
                    $('#subtrmc').click(function() {
                        $.mobile.allowCrossDomainPages = true;
                        $.support.cors = true;
                        $.mobile.showPageLoadingMsg();
                        var ph = localStorage.phonenumber;
                        var dest = $("#destphone").val();
                        var ssid = localStorage.lssessid;
                        var berita = $("#berita").val();
                        var pins = $("#pinss").val();
                        var dnm = $("#amountmc").val();
                        //alert("ph: "+ph+", dest: "+dest+", ssid: "+ssid+", berita: "+berita+", pins: "+pins+", amount: "+dnm);
                        /*alert(ph);
                         alert(ssid);
                         alert(pins);
                         alert(opr);
                         alert(dnm);*/
                        //simpan ke localstorage
                        localStorage.nomorpelmc = dest;
                        var qurl = "http://klikmc.com/mcjqmjson/transfermc.php";
                        var datakirim = JSON.stringify({"phone": ph, "notel": dest, "sessid": ssid, "news": berita, "pin": pins, "amount": dnm});
                        //alert("phone"+ph+"notel"+dest+"sessid"+ssid+"news"+berita+"pin"+pins+"amount"+dnm);
                        var myrequest = $.ajax({
                            url: qurl,
                            data: datakirim,
                            type: "POST",
                            crossDomain: true,
                            dataType: "text"
                        });

                        myrequest.success(function(resp) {
                            $.mobile.hidePageLoadingMsg();
                            //alert(resp);
                            var s = JSON.parse(resp);
                            //alert(s.msg);
                            //localStorage.msgtrmc = s.msg;
                            localStorage.pengirimmc = s.pengirim;
                            //alert(localStorage.pengirimmc);
                            localStorage.pengirimmc = s.pengirim;
                            localStorage.tujuanmc = s.tujuan;
                            localStorage.amountmc = s.amount;
                            localStorage.feemc = s.feeadm;
                            localStorage.brtmc = s.berita;
                            localStorage.konfmc = s.conf;
                            if (s.rc == "00") {
                                //alert(resp);
                                $.mobile.changePage("konftrmc.html", {transition: "slide"});
                            }
                            else {

                                //alert(resp);
                                $.mobile.changePage("respon.html", {data: {msg: s.msg}}, "slide");
                            }

                        });

                    });
                






                            //var printPlugin = cordova.require('cordova/plugin/printplugin');
                            
                            $('#responpage').on('pageshow', function(){
                                var param1 = getParameterByName('msg');
                                $("#respon").text("");
                                $("#respon").text(param1);
                                //$("#respon2").text(localStorage.date);
                                //alert(param1);
                                
                                /*if(localStorage.reffcode!=''){
                                    $('#printtrbank').show();
                                }
                                else{
                                    $('#printtrbank').hide();
                                }
                                
                                if(localStorage.nomortujuan2!=''){
                                    $('#printtopuppulsa').show();
                                }
                                else{
                                    $('#printtopuppulsa').hide();
                                }
                                
                                if(localStorage.merchantcode!=''){
                                    $('#printmcpay').show();
                                }
                                else{
                                    $('#printmcpay').hide();
                                }
                                
                                if(localStorage.nopevoucgame!=''){
                                    $('#printvoucgame').show();
                                }
                                else{
                                    $('#printvoucgame').hide();
                                }*/
                            });
                             
                            //print transfer bank
                            /*$('#printtrbank').click(function(){
                                alert("print bank");
                                localStorage.reffcode='';
                            });
                            //print topup pulsa
                            $('#printtopuppulsa').click(function(){
                                alert("print pulsa");
                                localStorage.nomortujuan2='';
                            });
                            
                            $('#printmcpay').click(function(){
                                alert("print mc pay");
                                localStorage.merchantcode='';
                            });
                            
                            $('#printvoucgame').click(function(){
                                alert("print voucher game");
                                localStorage.nopevoucgame='';
                            });*/
                            
                            function getParameterByName(name){
                                var match = RegExp('[?&]' + name + '=([^&]*)').exec(document.location);
                                return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
                            }
                            
                        





                        $('#subregister').click(function() {
                            $.mobile.allowCrossDomainPages = true;
                            $.support.cors = true;
                            $.mobile.showPageLoadingMsg(); 
                            var ph = $("#newphone").val();
                            if(ph.charAt(0)=="0"){
                                ph = ph.replace("0", "62");
                                //alert(ph);
                            }
                            if(ph.charAt(0)=="+"){
                                ph = ph.substr(1);
                                //alert(ph);
                            }
                            var name = $("#newname").val();
                            var city = $("#newcity").val();
                            var ref = $("#newref").val();
                            var idt = $("#newidt").val();
                            var qurl = "http://klikmc.com/mcjqmjson/register.php";
                            var datakirim = JSON.stringify({"phone": ph, "name": name, "city": city, "reference": ref, "ktp": idt, "idx":1});
                            //alert(datakirim);
                            var myrequest =  $.ajax({
                                url: qurl,
                                data: datakirim,
                                type: "POST",
                                crossDomain: true,
                                dataType: "text"
                            });
                            myrequest.success(function(resp) {
                                $.mobile.hidePageLoadingMsg();
                                //alert(resp);
                                var s = JSON.parse(resp);
                                if(s.rc=="00"){
                                    $.mobile.changePage( "gantipinregister.html" ,{data:{
                                            phonex:ph,
                                            msg:s.msg,
                                            oldpin:s.oldpin
                                        }},"slide");
                                }
                                else {
                                    $.mobile.changePage( "responerrreg.html" ,{data:{msg:s.msg}},"slide");
                                }
                            });
                        });
                    





					$('#responregerrpage').on('pageshow', function(){
						var param1 = getParameterByName('msg');
						$("#respon").text("");
						$("#respon").text(param1);
						
						//alert(param1);
					});
					
					function getParameterByName(name) {
                        var match = RegExp('[?&]' + name + '=([^&]*)').exec(document.location);
                        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
                    }
				

function PrintPlugin() {}
PrintPlugin.prototype.print = function(printHTML, success, fail, options) {
    if (typeof printHTML != 'string'){
        console.log("Print function requires an HTML string. Not an object");
        return;
    }
	return (PhoneGap || cordova || Cordova).exec(success, fail, "PrintPlugin", "print", [printHTML, (options&&options.appid||"")]);
};

/*
 * Callback function returns {available: true/false}
 */
PrintPlugin.prototype.isPrintingAvailable = function(callback) {
    return (PhoneGap || cordova || Cordova).exec(callback, null, "PrintPlugin", "scan");
};

(PhoneGap || cordova || Cordova).addPlugin("printPlugin", new PrintPlugin());

  window.print = function() {
		var htmlTag = document.body.parentNode;
		var docHtml = htmlTag.innerHTML;
		var win = window.parent || window;
		var left = win.getWindowWidth() / 2;
		var top = win.getWindowHeight() / 2;
		win.plugins.printPlugin.print("<html>" + docHtml + "</html>", null, null, {'dialogOffset':{'left':left,'top':top}});
	};





                                        $('#tvberbayarpage').on('pageshow', function(){
                                            if((localStorage.nopelanggantv !='')){
                                                $("#destphone").val(localStorage.nopelanggantv);
                                            }
                                        });
                                        
					$('#subtv').click(function() {
						$.mobile.allowCrossDomainPages = true;
						$.support.cors = true;
						$.mobile.showPageLoadingMsg(); 
						var ph = localStorage.phonenumber;
						var dest = $("#destphone").val();
						var ssid = localStorage.lssessid;
						var pins = $("#pinss").val();
						var opr = $("#oprtv option:selected").val();
                                                //
                                                localStorage.nopelanggantv=dest;
						var qurl = "http://klikmc.com/mcjqmjson/payTv.php";
						var datakirim = JSON.stringify({"pin":pins,"idpel":dest,"opr":opr,"phone":ph,"sessid":ssid,"idx":1});
						var myrequest =  $.ajax({
							url: qurl,
							data: datakirim,
							type: "POST",
							crossDomain: true,
							dataType: "text"
						});
						myrequest.success(function(resp) {
							$.mobile.hidePageLoadingMsg();
							//alert(resp);
							var s = JSON.parse(resp);
							if(s.rc=="00"){
								if(s.konfirm=="yes"){
									$.mobile.changePage("konfpaytv.html", {data:{konfirm:s.konfirm,idpel:s.idpel,billname:s.billname,tagihan:s.tagihan,feeadm:s.feeadm,total:s.total,conf:s.conf}},"slide");
								}else{
									$.mobile.changePage("konfpaytv2.html", {data:{msg:s.msg,conf:s.conf}},"slide");
								}
							}
							else{
								$.mobile.changePage( "respon.html" ,{data:{msg:resp}},"slide");
							}
						});
					});
				





                            $("#ceksaldo").click(function(){
                                $.mobile.changePage( "ceksaldo.html" ,{ transition: "slide"});
                            });
                            $("#isisaldo").click(function(){
                                $.mobile.changePage( "isisaldo.html" ,{ transition: "slide"});
                            });
                            $("#history").click(function(){
                                $.mobile.allowCrossDomainPages = true;
                                $.support.cors = true;
                                $.mobile.showPageLoadingMsg(); 
                                var ph = localStorage.phonenumber;
                                //alert(ph);
                                var ssid = localStorage.lssessid;
                                var qurl = "http://klikmc.com/mcjqmjson/history.php";
                                var datakirim = JSON.stringify({"phone":ph, "sessid":ssid});
					  
                                var myrequest =  $.ajax({
                                    url: qurl,
                                    data: datakirim,
                                    type: "POST",
                                    crossDomain: true,
                                    dataType: "text"
                                });
						  
                                myrequest.success(function(resp) {
                                    $.mobile.hidePageLoadingMsg();
                                    //alert(resp);
                                    var s = JSON.parse(resp);
                                    //alert(s.msg);
                                    $.mobile.changePage("history.html", {data:{msg1:s.data1,msg2:s.data2,msg3:s.data3,msg4:s.data4,msg5:s.data5,msg6:s.data6,msg7:s.data7,msg8:s.data8,msg9:s.data9,msg10:s.data10}},"slide");
											
                                });
                                myrequest.error(function(resp) {
                                    alert("History Timeout...");
                                });
                            });
                        





				$(document).ready(function(){
					$("#dari").val(localStorage.pengirimmc);
					$("#ke").val(localStorage.tujuanmc);
					$("#mount").val(localStorage.amountmc);
					$("#fee").val(localStorage.feemc);
					$("#brt").val(localStorage.brtmc);
				});
				$("#subtrkof").click(function(){
						$.mobile.allowCrossDomainPages = true;
						$.support.cors = true;
						$.mobile.showPageLoadingMsg(); 
						var ph = localStorage.phonenumber;
						var ssid = localStorage.lssessid;
						var kof = localStorage.konfmc;
						var pins = $("#pin").val();
						var qurl = "http://klikmc.com/mcjqmjson/confirm.php";
						var datakirim = JSON.stringify({"phone":ph, "sessid":ssid, "pin":pins,"conf":kof});
						var myrequest =  $.ajax({
							url: qurl,
							data: datakirim,
							type: "POST",
							crossDomain: true,
							dataType: "text"
						});
						myrequest.success(function(resp) {
							//alert(resp);
							var s = JSON.parse(resp);
							//alert(s.msg);
							//localStorage.msgkonfmc = resp;
							$.mobile.hidePageLoadingMsg();
							$.mobile.changePage( "respon.html" ,{data:{msg:s.msg}},"slide");
						});
				});
			




            $("#uppulsa").click(function(){
                    $.mobile.changePage("topuppulsa.html",{ transition: "slide"});
            });
            $("#upvoucher").click(function(){
                    $.mobile.changePage("topupvouchergame.html",{ transition: "slide"});
            });
    




					$('#responpage').on('pageshow', function(){
						var param1 = getParameterByName('msg');
						$("#conf").val(getParameterByName('conf'));
						$("#respon").text("");
						$("#respon").text(param1);
						//alert(param1);
						
						//alert(param1);
					});
					$('#subkonffinpay').click(function() {
						$.mobile.allowCrossDomainPages = true;
						$.support.cors = true;
						$.mobile.showPageLoadingMsg(); 
						var ph = localStorage.phonenumber;
						var conf = $("#conf").val();
						var pins = $("#pinss").val();
						var ssid = localStorage.lssessid;
						var qurl = "http://klikmc.com/mcjqmjson/confirm.php";
						var datakirim = JSON.stringify({"pin": pins, "conf": conf,"sessid":ssid,  "phone": ph});
						//alert(datakirim);
						var myrequest =  $.ajax({
							url: qurl,
							data: datakirim,
							type: "POST",
							crossDomain: true,
							dataType: "text"
						});
						myrequest.success(function(resp) {
							$.mobile.hidePageLoadingMsg();
							//alert(resp);
							//$.mobile.changePage( "respon.html" ,{data:{msg:s.msg}},"slide");
							//var s = JSON.parse(resp);
                                                        $.mobile.changePage( "respon.html" ,{data:{msg: resp}},"slide");
						});
					});
					
					function getParameterByName(name) {
                        var match = RegExp('[?&]' + name + '=([^&]*)').exec(document.location);
                        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
                    }
				





					$('#subzakat').click(function() {
						$.mobile.allowCrossDomainPages = true;
						$.support.cors = true;
						$.mobile.showPageLoadingMsg(); 
						var ph = localStorage.phonenumber;
						var idlembaga = $("#lembaga option:selected").val();
						var ssid = localStorage.lssessid;
						var pins = $("#pinss").val();
						var denom = $("#nominal option:selected").val();
						var qurl = "http://klikmc.com/mcjqmjson/MCAmal.php";
						var datakirim = JSON.stringify({"phone": ph, "pin" :pins, "opr":"Zakat", "denom": denom, "notel":idlembaga});
						var myrequest =  $.ajax({
							url: qurl,
							data: datakirim,
							type: "POST",
							crossDomain: true,
							dataType: "text"
						});
						myrequest.success(function(resp) {
							$.mobile.hidePageLoadingMsg();
							//alert(resp);
							var s = JSON.parse(resp);
							 $.mobile.changePage("respon.html", {data:{msg:s.msg}},"slide");
						});
					});
				









                        $('#topuppulsapage').on('pageshow', function(){
                            
                            if ((localStorage.nomortujuan1 != '')) {
                                $("#destphone").val(localStorage.nomortujuan1);
                            }
                            $('#listkontak').css('overflow-y', 'scroll-y'); 
                            onDeviceReady();
                            /*jQuery.get('listoprname.txt',function(data){
                             var lines = data.split("\n");
                             $.each(lines, function(n, elem) {
                             //$('#banklist').append("<option value=''>"+elem+"</option>");
                             var datass = new Array();
                             datass=elem.split(",");
                             $('#oprlist').append("<option value='"+datass[0]+"'>"+datass[0]+"</option>");
                             });
                             }); 
                             //batassssssssssss
                             
                             $.mobile.showPageLoadingMsg();
                             $.mobile.allowCrossDomainPages = true;
                             $.support.cors = true;
                             var qurl = "http://www.klikmc.com/mcjqmjson/reqoperatorpulsa.php";
                             var ph = localStorage.phonenumber;
                             var dtkirim = JSON.stringify({"phone":ph});
                             var request =  $.ajax({
                             url: qurl,
                             data: dtkirim,
                             type: "GET",
                             crossDomain: true,
                             dataType: "text",
                             });
                             request.success(function(resp){
                             $.mobile.hidePageLoadingMsg();
                             $('#oprlist').empty();
                             $('#oprlist').append(resp);
                             });*/
                        });
                        //get kontak
                        function findContactSuccess(contacts) {
                            var contact_name;
                            //alert("aso");
                            for (var i = 0; i < contacts.length; i++) {
                                if (contacts[i].name.formatted != null && contacts[i].name.formatted != undefined) {
                                    contact_name = contacts[i].name.formatted;
                                    contact_name = contact_name.replace(/'/g, "''");
                                    if (contacts[i].phoneNumbers != null && contacts[i].phoneNumbers.length > 0 && contacts[i].phoneNumbers[0].value != null && contacts[i].phoneNumbers[0].value != undefined) {
                                        //alert( contacts[i].displayName +" | " + contacts[i].phoneNumbers[0].value);
                                        var display_name = contacts[i].displayName;
                                        var contact_phone = contacts[i].phoneNumbers[0].value;
                                        
                                        //var oni = parseInt(contact_phone);
                                        
                                        //$("#fieldList").append($('<li/>', { 'data-role': "list-divider",'id':'kontak_klik'+i, 'text': display_name + " | " + contact_phone , 'value':contact_phone}));  //here appending `<a>` into `<li>`
                                        $("#fieldList").append('<li id="'+"kontak_klik"+i+'" value="'+contact_phone+'" onclick="ahay(\''+contact_phone+'\');">'+display_name + " | " + contact_phone+'</li>');   
                                    }
                                }
                            }
                            
                            $("#fieldList").listview('refresh');
                            $.mobile.hidePageLoadingMsg();
                            //return false;
                        }
                         
                        function ahay(vals){
                            //var pattern = /[0-9a-zA-Z]+/g;
                            var no= vals.replace( new RegExp(/[^0-9]+/g),"");
                            if(no.substring(0,2) == "62"){
                                no="0"+no.substring(2);
                            }
                            $("#destphone").val(no);
                            $("#listkontak").popup('close');
                        }
                       
                        function findContactError(contactError) {
                            alert("Access ke kontak gagal");
                        }

                        function onDeviceReady(){
                            //$.mobile.showPageLoadingMsg();
                            $.mobile.showPageLoadingMsg("b", "Memuat Kontak");
                            //$("#listkontak").popup('open');
                            var options = new ContactFindOptions();
                            //options.filter = $("#findContactForm ").val();
                            options.multiple = true;

                            var fields = ["displayName", "name", "phoneNumbers"];
                            navigator.contacts.find(fields, findContactSuccess, findContactError, options);
                            //$.mobile.hidePageLoadingMsg();
                        }
                        
                        $("#klosepopup").click(function(){
                            $( "#listkontak" ).popup("close");
                            return false;
                        });
                        
                        $('#listkontak').on({
                                popupbeforeposition: function(){
                                  var maxHeight = $(window).height() - 140;
                                  $('#listkontak').css('max-height', maxHeight + 'px');
                                }
                            });
                        //batas get kontak
                        
                        $('#oprlist').change(function() {
                            $.mobile.allowCrossDomainPages = true;
                            $.support.cors = true;
                            $.mobile.showPageLoadingMsg();
                            $('#denom').empty();
                            $('#denom').append("<option value=''></option>");

                            var oprlist11 = $("#oprlist option:selected").val();
                            if (oprlist11 == "FLEXI") {
                                jQuery.get('oprdenom/flexi.txt', function(data) {
                                    $.mobile.hidePageLoadingMsg();
                                    var lines = data.split("\n");
                                    $.each(lines, function(n, elem) {
                                        var flexi = new Array();
                                        flexi = elem.split(",");
                                        $('#denom').append("<option value='" + flexi[0] + "'>" + flexi[0] + " / " + flexi[1] + "</option>");
                                    });

                                });
                            }
                            else if (oprlist11 == "ESIA") {
                                jQuery.get('oprdenom/esia.txt', function(data) {
                                    $.mobile.hidePageLoadingMsg();
                                    var lines = data.split("\n");
                                    $.each(lines, function(n, elem) {
                                        var esia = new Array();
                                        esia = elem.split(",");
                                        $('#denom').append("<option value='" + esia[0] + "'>" + esia[0] + " / " + esia[1] + "</option>");
                                    });
                                });
                            }
                            else if (oprlist11 == "IM3") {
                                jQuery.get('oprdenom/im3.txt', function(data) {
                                    $.mobile.hidePageLoadingMsg();
                                    var lines = data.split("\n");
                                    $.each(lines, function(n, elem) {
                                        var im3 = new Array();
                                        im3 = elem.split(",");
                                        $('#denom').append("<option value='" + im3[0] + "'>" + im3[0] + " / " + im3[1] + "</option>");
                                    });
                                });
                            }
                            else if (oprlist11 == "STARONE") {
                                jQuery.get('oprdenom/starone.txt', function(data) {
                                    $.mobile.hidePageLoadingMsg();
                                    var lines = data.split("\n");
                                    $.each(lines, function(n, elem) {
                                        var starone = new Array();
                                        starone = elem.split(",");
                                        $('#denom').append("<option value='" + starone[0] + "'>" + starone[0] + " / " + starone[1] + "</option>");
                                    });
                                });
                            }
                            else if (oprlist11 == "THREE") {
                                jQuery.get('oprdenom/three.txt', function(data) {
                                    $.mobile.hidePageLoadingMsg();
                                    var lines = data.split("\n");
                                    $.each(lines, function(n, elem) {
                                        var three = new Array();
                                        three = elem.split(",");
                                        $('#denom').append("<option value='" + three[0] + "'>" + three[0] + " / " + three[1] + "</option>");
                                    });
                                });
                            }
                            else if (oprlist11 == "AXIS") {
                                jQuery.get('oprdenom/axis.txt', function(data) {
                                    $.mobile.hidePageLoadingMsg();
                                    var lines = data.split("\n");
                                    $.each(lines, function(n, elem) {
                                        var axis = new Array();
                                        axis = elem.split(",");
                                        $('#denom').append("<option value='" + axis[0] + "'>" + axis[0] + " / " + axis[1] + "</option>");
                                    });
                                });
                            }
                            else if (oprlist11 == "XL") {
                                jQuery.get('oprdenom/xl.txt', function(data) {
                                    $.mobile.hidePageLoadingMsg();
                                    var lines = data.split("\n");
                                    $.each(lines, function(n, elem) {
                                        var xl = new Array();
                                        xl = elem.split(",");
                                        $('#denom').append("<option value='" + xl[0] + "'>" + xl[0] + " / " + xl[1] + "</option>");
                                    });
                                });
                            }
                            else if (oprlist11 == "FREN") {
                                jQuery.get('oprdenom/fren.txt', function(data) {
                                    $.mobile.hidePageLoadingMsg();
                                    var lines = data.split("\n");
                                    $.each(lines, function(n, elem) {
                                        var fren = new Array();
                                        fren = elem.split(",");
                                        $('#denom').append("<option value='" + fren[0] + "'>" + fren[0] + " / " + fren[1] + "</option>");
                                    });
                                });
                            }
                            else if (oprlist11 == "HEPI") {
                                jQuery.get('oprdenom/hepi.txt', function(data) {
                                    $.mobile.hidePageLoadingMsg();
                                    var lines = data.split("\n");
                                    $.each(lines, function(n, elem) {
                                        var hepi = new Array();
                                        hepi = elem.split(",");
                                        $('#denom').append("<option value='" + hepi[0] + "'>" + hepi[0] + " / " + hepi[1] + "</option>");
                                    });
                                });
                            }
                            else if (oprlist11 == "IM3") {
                                jQuery.get('oprdenom/im3.txt', function(data) {
                                    $.mobile.hidePageLoadingMsg();
                                    var lines = data.split("\n");
                                    $.each(lines, function(n, elem) {
                                        var im3 = new Array();
                                        im3 = elem.split(",");
                                        $('#denom').append("<option value='" + im3[0] + "'>" + im3[0] + " / " + im3[1] + "</option>");
                                    });
                                });
                            }
                            else if (oprlist11 == "MENTARI") {
                                jQuery.get('oprdenom/mentari.txt', function(data) {
                                    $.mobile.hidePageLoadingMsg();
                                    var lines = data.split("\n");
                                    $.each(lines, function(n, elem) {
                                        var mentari = new Array();
                                        mentari = elem.split(",");
                                        $('#denom').append("<option value='" + mentari[0] + "'>" + mentari[0] + " / " + mentari[1] + "</option>");
                                    });
                                });
                            }
                            else if (oprlist11 == "SMART") {
                                jQuery.get('oprdenom/smart.txt', function(data) {
                                    $.mobile.hidePageLoadingMsg();
                                    var lines = data.split("\n");
                                    $.each(lines, function(n, elem) {
                                        var smart = new Array();
                                        smart = elem.split(",");
                                        $('#denom').append("<option value='" + smart[0] + "'>" + smart[0] + " / " + smart[1] + "</option>");
                                    });
                                });
                            }
                            else if (oprlist11 == "As") {
                                jQuery.get('oprdenom/as.txt', function(data) {
                                    $.mobile.hidePageLoadingMsg();
                                    var lines = data.split("\n");
                                    $.each(lines, function(n, elem) {
                                        var as = new Array();
                                        as = elem.split(",");
                                        $('#denom').append("<option value='" + as[0] + "'>" + as[0] + " / " + as[1] + "</option>");
                                    });
                                });
                            }
                            else if (oprlist11 == "Simpati") {
                                jQuery.get('oprdenom/simpati.txt', function(data) {
                                    $.mobile.hidePageLoadingMsg();
                                    var lines = data.split("\n");
                                    $.each(lines, function(n, elem) {
                                        var simpati = new Array();
                                        simpati = elem.split(",");
                                        $('#denom').append("<option value='" + simpati[0] + "'>" + simpati[0] + " / " + simpati[1] + "</option>");
                                    });
                                });
                            }
                            else {
                                $.mobile.hidePageLoadingMsg();
                                $('#denom').empty();
                                $('#denom').append("<option value=''></option>");
                            }
                        });

                        /*$('#oprlist').change(function(){
                         $.mobile.allowCrossDomainPages = true;
                         $.support.cors = true;
                         $.mobile.showPageLoadingMsg();
                         var qurl = "http://klikmc.com/mcjqmjson/data_pulsa.php";
                         var pdata1 = {data_type: $('#oprlist option:selected').val()};
                         
                         var myrequest =  $.ajax({
                         url: qurl,
                         data: pdata1,
                         type: "POST",
                         crossDomain: true,
                         dataType: "text"
                         });
                         
                         myrequest.success(function(resp) {
                         $.mobile.hidePageLoadingMsg();
                         //alert(resp);
                         
                         $('#denom').empty();
                         $('#denom').append(resp);
                         });
                         });*/
                        $('#subtoppulsa').click(function() {
                            $.mobile.allowCrossDomainPages = true;
                            $.support.cors = true;
                            $.mobile.showPageLoadingMsg();

                            var ph = localStorage.phonenumber;
                            var dest = $("#destphone").val();
                            var ssid = localStorage.lssessid;
                            var pins = $("#pin").val();
                            var opr = $("#oprlist option:selected").val();
                            var dnm = $("#denom option:selected").val();
                            //simpen ke localStorage
                            localStorage.nomortujuan1 = dest;

                            /*alert(ph);
                             alert(ssid);
                             alert(pins);
                             alert(opr);
                             alert(dnm);*/
                            var qurl = "http://klikmc.com/mcjqmjson/pulsapros.php";
                            var datakirim = JSON.stringify({"phone": ph, "notel": dest, "sessid": ssid, "pin": pins, "opr": opr, "denom": dnm});

                            var myrequest = $.ajax({
                                url: qurl,
                                data: datakirim,
                                type: "POST",
                                crossDomain: true,
                                dataType: "text"
                            });

                            myrequest.success(function(resp) {
                                $.mobile.hidePageLoadingMsg();
                                //alert(resp);
                                var s = JSON.parse(resp);
                                localStorage.nomortujuan2 = dest;
                                //alert(s.msg);
                                //localStorage.msgtop = s.msg;
                                $.mobile.changePage("respon.html", {data: {msg: s.msg}}, "slide");
                            });
                        });
                    





                    $(document).ready(function(){
                            var date = new Date();
                            var m = date.getMonth()+1;
                            var d = date.getDate();
                            var tgss = date.getFullYear()+''+ (m<10 ? '0' : '') + m + '' +(d<10 ? '0' : '') + d;
                            if((localStorage.phonenumber ==='' && localStorage.lssessid ==='') || (tgss!=localStorage.datelogin && localStorage.phonenumber !== '' && localStorage.lssessid !== '')) {
                        $.mobile.changePage("index.html");
                    }
                    else {
                        //$.mobile.changePage("home.html");
                        //window.location.href = "file:///android_asset/home.html";
                        window.location.href = "home.html";
                        //window.location.replace("home.html");
                    }
                });
                /*document.addEventListener("deviceready", onDeviceReady, false);
                 function onDeviceReady(){
                 document.addEventListener("backbutton", function(e){
                 if($.mobile.activePage.is('#indexbody')){
                 e.preventDefault();
                 navigator.app.exitApp();
                 }
                 else {
                 navigator.app.backHistory();
                 }
                 }, false);
                 }*/

            





                        $("#finpay").click(function(){
				$.mobile.changePage( "finpay.html" ,{ transition: "slide"});
			});
			$("#telkomgroup").click(function(){
				$.mobile.changePage( "telkomgroup.html" ,{ transition: "slide"});
			});
			$("#telkomsel").click(function(){
				$.mobile.changePage( "telkomsel.html" ,{ transition: "slide"});
			});
			$("#tvberbayar").click(function(){
				$.mobile.changePage( "tvbayar.html" ,{ transition: "slide"});
			});
			$("#pln").click(function(){
				$.mobile.changePage( "pln.html" ,{ transition: "slide"});
			});
		





				$(document).ready(function(){
					$("#opr").val(localStorage.oprgroup);
					$("#notel").val(localStorage.notelgroup);
					$("#destname").val(localStorage.billnamegroup);
					$("#tagihan").val(localStorage.tagihangroup);
					$("#fee").val(localStorage.feegroup);
					$("#total").val(localStorage.totalgroup);
					//$("#amounts").val(localStorage.remamount);
					//$("#destnotif").val(localStorage.remnotif);
					//alert(localStorage.remnotif);
				});
				$("#subkofgroup").click(function(){
						$.mobile.allowCrossDomainPages = true;
						$.support.cors = true;
						$.mobile.showPageLoadingMsg(); 
						var ph = localStorage.phonenumber;
						//alert(ph);
						var pins = $("#pinsss").val();
						//	alert(pins);
						var code = localStorage.confgroup;
						var qurl = "http://klikmc.com/mcjqmjson/telepon.php";
						var datakirim = JSON.stringify({"pin":pins,"phone":ph,"conf":code,"idx":2});
						var myrequest =  $.ajax({
							url: qurl,
							data: datakirim,
							type: "POST",
							crossDomain: true,
							dataType: "text"
						});
						myrequest.success(function(resp) {
							//alert(resp);
							var s = JSON.parse(resp);
							//alert(s.msg);
							//localStorage.msgkonfgroup = resp;
							$.mobile.hidePageLoadingMsg();
							$.mobile.changePage( "respon.html" ,{data:{msg:s.msg}},"slide");
						});
				});
			





					$('#subinfaq').click(function() {
						$.mobile.allowCrossDomainPages = true;
						$.support.cors = true;
						$.mobile.showPageLoadingMsg(); 
						var ph = localStorage.phonenumber;
						var idlembaga = $("#lembaga option:selected").val();
						var ssid = localStorage.lssessid;
						var pins = $("#pinss").val();
						var denom = $("#nominal option:selected").val();
						var qurl = "http://klikmc.com/mcjqmjson/MCAmal.php";
						var datakirim = JSON.stringify({"phone": ph, "pin" :pins, "opr":"Infaq", "denom": denom, "notel":idlembaga});
						var myrequest =  $.ajax({
							url: qurl,
							data: datakirim,
							type: "POST",
							crossDomain: true,
							dataType: "text"
						});
						myrequest.success(function(resp) {
							$.mobile.hidePageLoadingMsg();
							//alert(resp);
							var s = JSON.parse(resp);
							 $.mobile.changePage("respon.html", {data:{msg:s.msg}},"slide");
						});
					});
				





                        $('#paytvconfpage').on('pageshow',function(){
                            $("#idpel").val(getParameterByName('idpel'));
                            $("#billname").val(getParameterByName('billname'));
                            $("#tagihan").val(getParameterByName('tagihan'));
                            $("#feeadm").val(getParameterByName('feeadm'));
                            $("#total1").val(getParameterByName('total'));
                            $("#confyes").val(getParameterByName('conf'));
                        });
                        $("#subkofyes").click(function(){
                            $.mobile.allowCrossDomainPages = true;
                            $.support.cors = true;
                            $.mobile.showPageLoadingMsg(); 
                            var ph = localStorage.phonenumber;
                            var pins = $("#pinss1").val();
                            var code = $("#confyes").val();
                            var qurl = "http://klikmc.com/mcjqmjson/confirm.php";
                            var datakirim = JSON.stringify({"pin":pins,"phone":ph,"conf":code,"idx":2});
                            var myrequest =  $.ajax({
                                url: qurl,
                                data: datakirim,
                                type: "POST",
                                crossDomain: true,
                                dataType: "text"
                            });
                            myrequest.success(function(resp) {
                                var s = JSON.parse(resp);
                                $.mobile.hidePageLoadingMsg();
                                $.mobile.changePage( "respon.html" ,{data:{msg:s.msg}},"slide");
                            });
                        });
                        function getParameterByName(name) {
                            var match = RegExp('[?&]' + name + '=([^&]*)').exec(document.location);
                            return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
                        }
                    





                        $('#transferbankpage').on('pageshow', function(e, data) {
                            //alert("+62 821251 - 987".replace( new RegExp(/[^0-9]+/g),""));
                            $('#listkontak').css('overflow-y', 'scroll-y'); 
                            onDeviceReady();
                            
                            if ((localStorage.norekk != '') || (localStorage.nomortujuan != '')) {
                                $("#destrek").val(localStorage.norekk);
                                $("#destphone").val(localStorage.nomortujuan);
                            }
                            //$("#viewkontak").hide();
                            
                        });

                        //Batasssssssssssssssss get contact

                        function findContactSuccess(contacts) {
                            var contact_name;
                            //alert("aso");
                            for (var i = 0; i < contacts.length; i++) {
                                if (contacts[i].name.formatted != null && contacts[i].name.formatted != undefined) {
                                    contact_name = contacts[i].name.formatted;
                                    contact_name = contact_name.replace(/'/g, "''");
                                    if (contacts[i].phoneNumbers != null && contacts[i].phoneNumbers.length > 0 && contacts[i].phoneNumbers[0].value != null && contacts[i].phoneNumbers[0].value != undefined) {
                                        //alert( contacts[i].displayName +" | " + contacts[i].phoneNumbers[0].value);
                                        var display_name = contacts[i].displayName;
                                        var contact_phone = contacts[i].phoneNumbers[0].value;
                                        
                                        //var oni = parseInt(contact_phone);
                                        
                                        //$("#fieldList").append($('<li/>', { 'data-role': "list-divider",'id':'kontak_klik'+i, 'text': display_name + " | " + contact_phone , 'value':contact_phone}));  //here appending `<a>` into `<li>`
                                        $("#fieldList").append('<li id="'+"kontak_klik"+i+'" value="'+contact_phone+'" onclick="ahay(\''+contact_phone+'\');">'+display_name + " | " + contact_phone+'</li>');   
                                    }
                                }
                            }
                            
                            $("#fieldList").listview('refresh');
                            $.mobile.hidePageLoadingMsg();
                            //return false;
                        }
                         
                        function ahay(vals){
                            //var pattern = /[0-9a-zA-Z]+/g;
                            var no= vals.replace( new RegExp(/[^0-9]+/g),"");
                            if(no.substring(0,2) == "62"){
                                no="0"+no.substring(2);
                            }
                            $("#destphone").val(no);
                            $("#listkontak").popup('close');
                        }
                       
                        function findContactError(contactError) {
                            alert("Access ke kontak gagal");
                        }

                        function onDeviceReady(){
                            //$.mobile.showPageLoadingMsg();
                            $.mobile.showPageLoadingMsg("b", "Memuat Kontak");
                            //$("#listkontak").popup('open');
                            var options = new ContactFindOptions();
                            //options.filter = $("#findContactForm ").val();
                            options.multiple = true;

                            var fields = ["displayName", "name", "phoneNumbers"];
                            navigator.contacts.find(fields, findContactSuccess, findContactError, options);
                            //$.mobile.hidePageLoadingMsg();
                        }
                        
                        $('#listkontak').on({
                                popupbeforeposition: function(){
                                  var maxHeight = $(window).height() - 140;
                                  $('#listkontak').css('max-height', maxHeight + 'px');
                                }
                            });
                        //Batassssssssssssssssssssss get contact


                        $(document).ready(function(){
                            jQuery.get('kodebank.txt', function(data){
                                var lines = data.split("\n");
                                $.each(lines, function(n, elem){
                                    //$('#banklist').append("<option value=''>"+elem+"</option>");
                                    var datass = new Array();
                                    datass = elem.split(",");
                                    $('#banklist').append("<option value='" + datass[0] + "'>" + datass[1] + "</option>");
                                });
                            });
                        });

                        $("#subbankmc").click(function() {
                            $.mobile.allowCrossDomainPages = true;
                            $.support.cors = true;
                            $.mobile.showPageLoadingMsg();
                            var ph = localStorage.phonenumber;
                            var pins = $("#pinss").val();
                            var destph = $("#destphone").val();
                            var berita = $("#berita").val();
                            var norek = $("#destrek").val();
                            var kodebank = $("#banklist option:selected").val();

                            var date = new Date();
                            localStorage.nomortujuan = destph;
                            localStorage.norekk = norek;
                            localStorage.date = date;
                            //localStorage.listbank= $("#listbanks option:selected").val();
                            //alert(kodebank);
                            //alert(norek);
                            var amt = $("#amount").val();
                            var qurl = "http://klikmc.com/mcjqmjson/bankTransfer.php";
                            var datakirim = JSON.stringify({"phone": ph, "pin": pins, "notel_penerima": destph, "berita": berita, "no_rek": norek, "kode_bank": kodebank, "amount": amt});
                            var myrequest = $.ajax({
                                url: qurl,
                                data: datakirim,
                                type: "POST",
                                crossDomain: true,
                                dataType: "text"
                            });

                            myrequest.success(function(resp) {
                                //alert(resp);

                                var s = JSON.parse(resp);
                                if (s.rc == "00") {
                                    $.mobile.hidePageLoadingMsg();
                                    var ph = localStorage.phonenumber;
                                    var ssid = localStorage.lssessid;
                                    //$.mobile.changePage("konftrbank.html",{ transition: "slide"});
                                    $.mobile.changePage("konftrbank.html", {data: {conf: s.konfirm, recipientName: s.recipientName, recipientPhoneNum: s.recipientPhoneNum, kode_bank: s.kode_bank, no_rek: s.no_rek, news: s.news, senderName: s.senderName, senderId: s.senderId, amount: s.amount, refCode: s.refCode, recipientNotif: s.recipientNotif, pins: pins}}, "slide");
                                }
                                else {
                                    $.mobile.hidePageLoadingMsg();
                                    $.mobile.changePage("respon.html", {data: {msg: s.msg}}, "slide");
                                }
                            });
                        });
                        $("#klosepopup").click(function(){
                            $( "#listkontak" ).popup("close");
                            return false;
                        });
                        
                    




                $('#mainpage').on('pageshow', function(){
                    if((localStorage.nomorhape !='')){
			$("#hpnum").val(localStorage.nomorhape);
                    }
                });
                $("#submain").click(function(){
                    $.mobile.allowCrossDomainPages = true;
                    $.support.cors = true;
                    var nohp = $("#hpnum").val();
                    var pins = $("#pin").val();
                    localStorage.nomorhape= $("#hpnum").val();
                    if(pins == "" || nohp == ""){
                        //$.mobile.changePage( "dialogfillmain.html" ,{ transition: "slide"});
                        alert('PIN/NO.Hp Tidak Boleh Kosong');
                        $("#hpnum").val(localStorage.nomorhape);
                        $("#pin").val("");
                    }
                    else{
                        $.mobile.showPageLoadingMsg();
                        
                        if(nohp.charAt(0)=="0"){
                        nohp = nohp.replace("0", "62");
                        //alert(nohp);
                        }
                        if(nohp.charAt(0)=="+"){
                            nohp = nohp.substr(1);
                            //alert(nohp);
                        }
                        var date = new Date();
                        var m = date.getMonth()+1;
                        var d = date.getDate();
                        var dt = date.getFullYear()+''+ (m<10 ? '0' : '') + m + '' +(d<10 ? '0' : '') + d;
                        //alert(dt);
                        var version="1.2.3";
                        var os = "android";
                        var qurl = "https://www.klikmc.com/mcjqmjson/login.php";
                        var myrequest =  $.ajax({
                            url: qurl,
                            data: JSON.stringify({"phone":nohp,"pin":pins,"version":version,"os":os}),
                            type: "POST",
                            crossDomain: true,
                            dataType: "text"
                        });

                        myrequest.success(function(resp){
                            var s = JSON.parse(resp);
                            $.mobile.hidePageLoadingMsg();
                            // alert(s.rc);
                            if(s.rc=="00"){
                                $("#hpnum").val("");
                                $("#pin").val("");
                                $.mobile.hidePageLoadingMsg();
                                localStorage.phonenumber = nohp;
                                //localStorage.lsid = $('#2digit').val()+'-'+$("#4digit").val();
                                localStorage.lssessid = s.sessionid;
                                localStorage.datelogin = dt;
                                window.location.href = "home.html";
                            //$.mobile.changePage("home.html", {data:{keysms:s.idcode,phonex:nohp,sessionid:s.sessionid,datelogin:dt}},"slide");
                            }
                            else if(s.rc=="92"){
                                
                                $.mobile.hidePageLoadingMsg();
                                $.mobile.changePage("respon.html", {data:{msg:s.msg}},"slide");
                            }
                            else {
                                $("#hpnum").val("");
                                $("#pin").val("");
                                var mm ="Phone Number atau PIN salah";
                                $.mobile.hidePageLoadingMsg();
                                $.mobile.changePage("respon.html", {data:{msg:mm}},"slide");
                            }
                        }); 
                    }
                    
                });
							
            





                                        $('#plnprapage').on('pageshow', function(){
                                            if((localStorage.idpel !='')){ //auto isi form id pelanggan
                                                $("#idpel").val(localStorage.idpel);
                                            }
                                        });
                                        
					$('#subplnpra').click(function() {
						$.mobile.allowCrossDomainPages = true;
						$.support.cors = true;
						$.mobile.showPageLoadingMsg(); 
						var ph = localStorage.phonenumber;
						var dest = $("#idpel").val();
                                                //simpan id
                                                localStorage.idpel=dest;
						var ssid = localStorage.lssessid;
						var pins = $("#pinss").val();
						var dnm = $("#denomplnpra option:selected").val();
						var qurl = "http://klikmc.com/mcjqmjson/plnprepaid.php";
						var datakirim = JSON.stringify({"pin":pins,"idpel":dest,"phone":ph,"sessid":ssid,"denom":dnm});
						var myrequest =  $.ajax({
							url: qurl,
							data: datakirim,
							type: "POST",
							crossDomain: true,
							dataType: "text"
						});
						myrequest.success(function(resp) {
							$.mobile.hidePageLoadingMsg();
							//alert(resp);
							var s = JSON.parse(resp);
							if(s.rc=="00"){
								//alert(s.msg);
								var coba = s.msg.replace(/<br>/g ,"\n");
								//alert(coba);
								
								$.mobile.changePage( "konfplnpra.html" ,{data:{msg:coba, conf:s.conf}},"slide");
							}
							else{
							//localStorage.msgplnpra = resp;
							$.mobile.changePage( "respon.html" ,{data:{msg:s.msg}},"slide");
							}
						});
					});
					function getParameterByName(name) {
					var match = RegExp(name + '=([:])').exec(document.location);
					return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
					}
				





                        $('#paytv2confpage').on('pageshow',function(){
							$("#msg0").text("");
                            $("#msg0").text(getParameterByName('msg'));
                            $("#conftv").val(getParameterByName('conf'));
                        });
                        $("#subkofyes2").click(function(){
                            $.mobile.allowCrossDomainPages = true;
                            $.support.cors = true;
                            $.mobile.showPageLoadingMsg(); 
                            var ph = localStorage.phonenumber;
                            var pins = $("#pinss2").val();
                            var code = $("#conftv").val();
                            var qurl = "http://klikmc.com/mcjqmjson/confirm.php";
                            var datakirim = JSON.stringify({"pin":pins,"phone":ph,"conf":code,"idx":2});
                            var myrequest =  $.ajax({
                                url: qurl,
                                data: datakirim,
                                type: "POST",
                                crossDomain: true,
                                dataType: "text"
                            });
                            myrequest.success(function(resp) {
                                var s = JSON.parse(resp);
                                $.mobile.hidePageLoadingMsg();
                                $.mobile.changePage( "respon.html" ,{data:{msg:s.msg}},"slide");
                            });
                        });
                        function getParameterByName(name) {
                            var match = RegExp('[?&]' + name + '=([^&]*)').exec(document.location);
                            return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
                        }
                    





                            $('#telkomselpage').on('pageshow', function() {
                                if ((localStorage.nopelanggantsel != '')) {
                                    $("#destphone").val(localStorage.nopelanggantsel);
                                }
                                
                                $('#listkontak').css('overflow-y', 'scroll-y'); 
                                onDeviceReady();
                            });
                            
                            //get kontak
                            function findContactSuccess(contacts) {
                                var contact_name;
                                //alert("aso");
                                for (var i = 0; i < contacts.length; i++){
                                    if (contacts[i].name.formatted != null && contacts[i].name.formatted != undefined) {
                                        contact_name = contacts[i].name.formatted;
                                        contact_name = contact_name.replace(/'/g, "''");
                                        if (contacts[i].phoneNumbers != null && contacts[i].phoneNumbers.length > 0 && contacts[i].phoneNumbers[0].value != null && contacts[i].phoneNumbers[0].value != undefined) {
                                            //alert( contacts[i].displayName +" | " + contacts[i].phoneNumbers[0].value);
                                            var display_name = contacts[i].displayName;
                                            var contact_phone = contacts[i].phoneNumbers[0].value;

                                            //var oni = parseInt(contact_phone);

                                            //$("#fieldList").append($('<li/>', { 'data-role': "list-divider",'id':'kontak_klik'+i, 'text': display_name + " | " + contact_phone , 'value':contact_phone}));  //here appending `<a>` into `<li>`
                                            $("#fieldList").append('<li id="'+"kontak_klik"+i+'" value="'+contact_phone+'" onclick="ahay(\''+contact_phone+'\');">'+display_name + " | " + contact_phone+'</li>');   
                                        }
                                    }
                                }

                                $("#fieldList").listview('refresh');
                                //return false;
                                $.mobile.hidePageLoadingMsg();
                            }

                            function ahay(vals){
                                //var pattern = /[0-9a-zA-Z]+/g;
                                var no= vals.replace( new RegExp(/[^0-9]+/g),"");
                                if(no.substring(0,2) == "62"){
                                    no="0"+no.substring(2);
                                }
                                $("#destphone").val(no);
                                $("#listkontak").popup('close');
                            }

                            function findContactError(contactError){
                                alert("Access ke kontak gagal");
                            }

                            function onDeviceReady(){
                                //$.mobile.showPageLoadingMsg();
                                $.mobile.showPageLoadingMsg("b", "Memuat Kontak");
                                //$.mobile.loader.prototype.options.text = "loading";
                                //$("#listkontak").popup('open');
                                var options = new ContactFindOptions();
                                //options.filter = $("#findContactForm ").val();
                                options.multiple = true;

                                var fields = ["displayName", "name", "phoneNumbers"];
                                navigator.contacts.find(fields, findContactSuccess, findContactError, options);
                                
                            }
                            
                            $("#klosepopup").click(function(){
                                $( "#listkontak").popup("close");
                                return false;
                            });
                            
                            $('#listkontak').on({
                                popupbeforeposition: function(){
                                  var maxHeight = $(window).height() - 140;
                                  $('#listkontak').css('max-height', maxHeight + 'px');
                                }
                            });
                            
                            //batas get kontak
                            
                            $('#subtelkomsel').click(function() {
                                $.mobile.allowCrossDomainPages = true;
                                $.support.cors = true;
                                $.mobile.showPageLoadingMsg();
                                var ph = localStorage.phonenumber;
                                var dest = $("#destphone").val();
                                var ssid = localStorage.lssessid;
                                var pins = $("#pinss").val();
                                var opr = $("#oprtelkomsel option:selected").val();
                                //simpan
                                localStorage.nopelanggantsel = dest;
                                var qurl = "http://klikmc.com/mcjqmjson/telkomsel.php";
                                var datakirim = JSON.stringify({"pin": pins, "notel": dest, "opr": opr, "phone": ph, "sessid": ssid, "idx": 1});
                                var myrequest = $.ajax({
                                    url: qurl,
                                    data: datakirim,
                                    type: "POST",
                                    crossDomain: true,
                                    dataType: "text"
                                });
                                myrequest.success(function(resp) {
                                    $.mobile.hidePageLoadingMsg();
                                    //alert(resp);
                                    var s = JSON.parse(resp);
                                    if (s.rc == "00") {
                                        //localStorage.oprtelkomsel = s.opr;
                                        //localStorage.noteltelkomsel = s.notel;
                                        //localStorage.billnametelkomsel = s.billname;
                                        //localStorage.tagihantelkomsel = s.tagihan;
                                        //localStorage.feetelkomsel = s.fee;
                                        //localStorage.totaltelkomsel = s.total;
                                        //localStorage.conftelkomsel = s.conf;
                                        //$.mobile.changePage("konftelkomsel.html");
                                        $.mobile.changePage("konftelkomsel.html", {
                                            data: {
                                                opr: s.opr,
                                                notel: s.notel,
                                                billname: s.billname,
                                                tagihan: s.tagihan,
                                                fee: s.fee,
                                                total: s.total,
                                                conf: s.conf
                                            }
                                        }, "slide");
                                    }
                                    else {
                                        //localStorage.msgtelkomsel = resp;
                                        $.mobile.changePage("respon.html", {data: {msg: resp}}, "slide");
                                    }
                                });
                            });

                        





                                        $('#finpaypage').on('pageshow', function(){
                                            if((localStorage.finpays !='')){
                                                $("#cdfinpay").val(localStorage.finpays);
                                            }
                                        });
                                        
					$('#subfinpay').click(function() {
						$.mobile.allowCrossDomainPages = true;
						$.support.cors = true;
						$.mobile.showPageLoadingMsg(); 
						var ph = localStorage.phonenumber;
						var nomor = $("#cdfinpay").val();
						var amount = $("#amount").val();
                                                //
                                                localStorage.finpays=nomor;
                                                
						var ssid = localStorage.lssessid;
						var pins = $("#pinss").val();
						var qurl = "http://klikmc.com/mcjqmjson/finpay.php";
						var datakirim = JSON.stringify({"pin": pins, "nomor": nomor, "sessionid": ssid, "phone": ph});
						//alert(datakirim);
						var myrequest =  $.ajax({
							url: qurl,
							data: datakirim,
							type: "POST",
							crossDomain: true,
							dataType: "text"
						});
						myrequest.success(function(resp) {
							$.mobile.hidePageLoadingMsg();
							//alert(resp);
							var s = JSON.parse(resp);
							if(s.rc=="00"){
								$.mobile.changePage( "konffinpay.html" ,{data:{msg:s.msg, conf:s.conf}},"slide");
							}
							else{
								$.mobile.changePage( "respon.html" ,{data:{msg:s.msg}},"slide");
							}
						});
					});
				





					$('#historypage').on('pageshow', function(){
						var param1 = getParameterByName('msg1');
						var param2 = getParameterByName('msg2');
						var param3 = getParameterByName('msg3');
						var param4 = getParameterByName('msg4');
						var param5 = getParameterByName('msg5');
                                                var param6 = getParameterByName('msg6');
						var param7 = getParameterByName('msg7');
						var param8 = getParameterByName('msg8');
						var param9 = getParameterByName('msg9');
						var param10 = getParameterByName('msg10');
						$('#history1').text(param1);
						$('#history2').text(param2);
						$('#history3').text(param3);
						$('#history4').text(param4);
						$('#history5').text(param5);
                                                $('#history6').text(param6);
						$('#history7').text(param7);
						$('#history8').text(param8);
						$('#history9').text(param9);
						$('#history10').text(param10);
						
						//alert(param1);
					});
					
					function getParameterByName(name) {
                        var match = RegExp('[?&]' + name + '=([^&]*)').exec(document.location);
                        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
                    }
				





					$('#responpage').on('pageshow', function(){
						var param1 = getParameterByName('msg');
						$("#respon").text("");
						$("#respon").text(param1);
						
						//alert(param1);
					});
					
					function getParameterByName(name) {
                        var match = RegExp('[?&]' + name + '=([^&]*)').exec(document.location);
                        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
                    }
				





	
                        var smsInboxPlugin = cordova.require('cordova/plugin/smsinboxplugin');
                        
                        
                            $("#verpagebody").on('pageshow',function() {
                                
                                
                                //$("#versub").a("disable");
                                $('#versub').hide();
                                //$('#versub').attr('data-theme', 'c');
                                var param1 = getParameterByName('keysms');
                                var param2 = getParameterByName('phonex');
                                var param3 = getParameterByName('sessionid');
                                var param4 = getParameterByName('datelogin');
                                //alert(param1+'-'+param2+'-'+param3+'-'+param4);
                                $('#2digit').val(param1);
                                $('#phnumbernya').val(param2);
                                $('#sessionid').val(param3);
                                $('#datelogin').val(param4);
                                
                                //timer
                                var count=30;
                                var counter=setInterval(timer, 1000); //1000 will  run it every 1 second
                                function timer()
                                {
                                    count=count-1;
                                    if ($("#4digit").val()!='')
                                    {
                                        $('#versub').show();
                                        smsInboxPlugin.stopReception();
                                        clearInterval(counter);
                                        $('#timer').replaceWith('<div>Silahkan Tekan Tombol Kirim</div>');
                                        return;
                                    }
                                    if(count <= -1)
                                    {
                                        smsInboxPlugin.stopReception();
                                        $('#versub').show();
                                        clearInterval(counter);
                                        $('#timer').replaceWith('<div>Silahkan Kembali Ke Halaman Login atau input manual kode login</div>');
                                        
                                        
                                        return;
                                    }
                                    document.getElementById("timer").innerHTML=count + " detik,Menunggu Konfirmasi SMS"; // watch for spelling
                                }
				//smsInboxPlugin.stopReception();						
                                smsInboxPlugin.startReception (function(msg){
                                    //alert(msg);
                                    var dg4 = msg.split("-").pop();
                                    //alert(dg4);
                                    $("#4digit").val(dg4);
                                    $("#versub").button("enable");
											
                                }, function() {	
                                    alert("Error while receiving messages");
                                });					
                            });
                            
                            $("#4digit").click(function(){
                                //$("#versub").button("enable");
                                //$('#versub').attr('data-theme', 'a');
                                //alert('Clicked');
                                $('#versub').show();
                                //smsInboxPlugin.stopReception();
                            });
									
                            function getParameterByName(name) {
                                var match = RegExp('[?&]' + name + '=([^&]*)').exec(document.location);
                                return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
                            }
									
                            $("#versub").click(function(){
                                var dg4 = $("#4digit").val();
                                localStorage.dg4sms = dg4;
                                $.mobile.showPageLoadingMsg(); 
                                $.mobile.allowCrossDomainPages = true;
                                $.support.cors = true;
									
                                var qurl = "http://www.klikmc.com/mcjqmjson/smsverify.php";
                                var ph = $('#phnumbernya').val();
                                var ssid = $('#sessionid').val();
                                var key = $('#2digit').val()+'-'+$("#4digit").val();
                                var dtkirim = JSON.stringify({"phone":ph,"sessid":ssid,"keysms":key});
                                //alert(dtkirim);
                                var request =  $.ajax({
                                    url: qurl,
                                    data: dtkirim,
                                    type: "POST",
                                    crossDomain: true,
                                    dataType: "text"
                                });
                                request.success(function(resp){
                                    $.mobile.hidePageLoadingMsg();
                                    if(resp=="00"){
                                        localStorage.phonenumber = $('#phnumbernya').val();
                                        localStorage.lsid = $('#2digit').val()+'-'+$("#4digit").val();
                                        localStorage.lssessid = $('#sessionid').val();
                                        localStorage.datelogin = $('#datelogin').val();
                                        //$.mobile.changePage("home.html",{ transition: "slide"});
                                        //window.location.replace("home.html");
                                        window.location.href = "home.html";
                                        //window.location.href = "file:///android_asset/home.html";
                                    }
                                    else{
                                        $.mobile.changePage("respon.html", {
                                            data:{
                                                msg:resp
                                            }
                                        },"slide");
                                    }
                                });
                            });
							
                        





			$("#Zakat").click(function(){
				$.mobile.changePage( "zakat.html" ,{ transition: "slide"});
			});
			$("#Infaq").click(function(){
				$.mobile.changePage( "infaq.html" ,{ transition: "slide"});
			});
			$("#Shadaqah").click(function(){
				$.mobile.changePage( "shadaqah.html" ,{ transition: "slide"});
			});
			$("#Vote").click(function(){
				$.mobile.changePage( "vote.html" ,{ transition: "slide"});
			});
		





				$("#pasca").click(function(){
					$.mobile.changePage( "plnpasca.html" ,{ transition: "slide"});
				});
				$("#pra").click(function(){
					$.mobile.changePage( "plnpra.html" ,{ transition: "slide"});
				});
			





                            $('#invitekerabat').on('pageshow', function(){
                                $('#listkontak').css('overflow-y', 'scroll-y'); 
                               onDeviceReady();
                            });
                            
                            
                            //get kontak
                            function findContactSuccess(contacts) {
                                var contact_name;
                                //alert("aso");
                                for (var i = 0; i < contacts.length; i++){
                                    if (contacts[i].name.formatted != null && contacts[i].name.formatted != undefined) {
                                        contact_name = contacts[i].name.formatted;
                                        contact_name = contact_name.replace(/'/g, "''");
                                        if (contacts[i].phoneNumbers != null && contacts[i].phoneNumbers.length > 0 && contacts[i].phoneNumbers[0].value != null && contacts[i].phoneNumbers[0].value != undefined) {
                                            //alert( contacts[i].displayName +" | " + contacts[i].phoneNumbers[0].value);
                                            var display_name = contacts[i].displayName;
                                            var contact_phone = contacts[i].phoneNumbers[0].value;

                                            //var oni = parseInt(contact_phone);

                                            //$("#fieldList").append($('<li/>', { 'data-role': "list-divider",'id':'kontak_klik'+i, 'text': display_name + " | " + contact_phone , 'value':contact_phone}));  //here appending `<a>` into `<li>`
                                            $("#fieldList").append('<li id="'+"kontak_klik"+i+'" value="'+contact_phone+'" onclick="ahay(\''+contact_phone+'\');">'+display_name + " | " + contact_phone+'</li>');   
                                        }
                                    }
                                }

                                $("#fieldList").listview('refresh');
                                //return false;
                                $.mobile.hidePageLoadingMsg();
                            }

                            function ahay(vals){
                                //var pattern = /[0-9a-zA-Z]+/g;
                                var no= vals.replace( new RegExp(/[^0-9]+/g),"");
                                if(no.substring(0,2) == "62"){
                                    no="0"+no.substring(2);
                                }
                                $("#destphone").val(no);
                                $("#listkontak").popup('close');
                            }

                            function findContactError(contactError){
                                alert("Access ke kontak gagal");
                            }

                            function onDeviceReady(){
                                //$.mobile.showPageLoadingMsg();
                                $.mobile.showPageLoadingMsg("b", "Memuat Kontak");
                                //$.mobile.loader.prototype.options.text = "loading";
                                //$("#listkontak").popup('open');
                                var options = new ContactFindOptions();
                                //options.filter = $("#findContactForm ").val();
                                options.multiple = true;

                                var fields = ["displayName", "name", "phoneNumbers"];
                                navigator.contacts.find(fields, findContactSuccess, findContactError, options);
                                
                            }
                            
                            $("#klosepopup").click(function(){
                                $( "#listkontak").popup("close");
                                return false;
                            });
                            
                            $('#listkontak').on({
                                popupbeforeposition: function(){
                                  var maxHeight = $(window).height() - 140;
                                  $('#listkontak').css('max-height', maxHeight + 'px');
                                }
                            });
                            //batas get kontak
                            
                            $('#subinvite').click(function(){
                                var m = "Sedang Dalam Maintenance";
                                $.mobile.changePage("respon.html", {data: {msg: m}}, "slide");
                                /*$.mobile.allowCrossDomainPages = true;
                                 $.support.cors = true;
                                 $.mobile.showPageLoadingMsg(); 
                                 var ph = localStorage.phonenumber;
                                 var dest = $("#destpel").val();
                                 var ssid = localStorage.lssessid;
                                 var pins = $("#pinss").val();
                                 var qurl = "http://klikmc.com/mcjqmjson/pln.php";
                                 var datakirim = JSON.stringify({"pin":pins,"idpel":dest,"phone":ph,"sessid":ssid});
                                 var myrequest =  $.ajax({
                                 url: qurl,
                                 data: datakirim,
                                 type: "POST",
                                 crossDomain: true,
                                 dataType: "text"
                                 });
                                 myrequest.success(function(resp) {
                                 $.mobile.hidePageLoadingMsg();
                                 //alert(resp);
                                 var s = JSON.parse(resp);
                                 if(s.rc=="00"){
                                 localStorage.idpelplnpasca = s.idpel;
                                 localStorage.billnameplnpasca = s.billname;
                                 localStorage.amountplnpasca = s.amount;
                                 localStorage.feeplnpasca = s.feeadm;
                                 localStorage.totalplnpasca = s.total;
                                 localStorage.confplnpasca = s.conf;
                                 $.mobile.changePage("konfplnpasca.html");}
                                 else{
                                 localStorage.msgplnpasca = resp;
                                 $.mobile.changePage("dialogplnpasca.html",{ transition: "slide"});
                                 }
                                 });*/
                            });
                        





                        $('#telkomselconfpage').on('pageshow',function(){
                            $("#opr").val(getParameterByName('opr'));
                            $("#notel").val(getParameterByName('notel'));
                            $("#destname").val(getParameterByName('billname'));
                            $("#tagihan").val(getParameterByName('tagihan'));
                            $("#fee").val(getParameterByName('fee'));
                            $("#total").val(getParameterByName('total'));
                            $("#conftel").val(getParameterByName('conf'));
                            //$("#destnotif").val(localStorage.remnotif);
                            //alert(localStorage.remnotif);
                        });
                        $("#subkoftelkomsel").click(function(){
                            $.mobile.allowCrossDomainPages = true;
                            $.support.cors = true;
                            $.mobile.showPageLoadingMsg(); 
                            var ph = localStorage.phonenumber;
                            //alert(ph);
                            var pins = $("#pinsss").val();
                            //	alert(pins);
                            var code = $("#conftel").val();
                            var qurl = "http://klikmc.com/mcjqmjson/telkomsel.php";
                            var datakirim = JSON.stringify({"pin":pins,"phone":ph,"conf":code,"idx":2});
                            var myrequest =  $.ajax({
                                url: qurl,
                                data: datakirim,
                                type: "POST",
                                crossDomain: true,
                                dataType: "text"
                            });
                            myrequest.success(function(resp) {
                                //alert(resp);
                                var s = JSON.parse(resp);
                                //alert(s.msg);
                                //localStorage.msgkonftelkomsel = resp;
                                $.mobile.hidePageLoadingMsg();
                                $.mobile.changePage( "respon.html" ,{data:{msg:s.msg}},"slide");
                            });
                        });
                        function getParameterByName(name) {
                            var match = RegExp('[?&]' + name + '=([^&]*)').exec(document.location);
                            return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
                        }
                    









				$('#topupgamepage').on('pageshow', function(){
                                        if((localStorage.nopevoucgame1 !='')){
                                            $("#destphone").val(localStorage.nopevoucgame1);
                                        }
                                        
					$.mobile.showPageLoadingMsg(); 
					$.mobile.allowCrossDomainPages = true;
					$.support.cors = true;
					var qurl = "http://www.klikmc.com/mcjqmjson/reqvouchergamelist.php";
					var ph = localStorage.phonenumber;
					var dtkirim = JSON.stringify({"phone":ph});
					var request =  $.ajax({
								url: qurl,
								data: dtkirim,
								type: "GET",
								crossDomain: true,
								dataType: "text",
								});
						request.success(function(resp){
							$.mobile.hidePageLoadingMsg();
							$('#dealer').empty();
							$('#dealer').append(resp);
						});
								
				});
				$('#dealer').change(function() {
						$.mobile.allowCrossDomainPages = true;
						$.support.cors = true;
						$.mobile.showPageLoadingMsg(); 
						var qurl = "http://klikmc.com/mcjqmjson/data_game2.php";
						var pdata1 ={data_type: $('#dealer option:selected').val()};
	  
						var myrequest =  $.ajax({
							url: qurl,
							data: pdata1,
							type: "POST",
							crossDomain: true,
							dataType: "text"
						});
		  
						myrequest.success(function(resp) {
							$.mobile.hidePageLoadingMsg();
							//alert(resp);
							
							$('#denom').empty();
							$('#denom').append(resp);
						});
					});
				$('#subtopvoucher').click(function() {
						$.mobile.allowCrossDomainPages = true;
						$.support.cors = true;
						$.mobile.showPageLoadingMsg();
						var ph = localStorage.phonenumber;
						var dest = $("#destphone").val();
						var ssid = localStorage.lssessid;
						var pins = $("#pin").val();
						var opr = $("#oprlist option:selected").val();
						var dnm = $("#denom option:selected").val();
                                                localStorage.nopevoucgame1=dest;
						/*alert(ph);
						alert(ssid);
						alert(pins);
						alert(opr);
						alert(dnm);*/
						var qurl = "http://klikmc.com/mcjqmjson/McGamePros.php";
						var datakirim = JSON.stringify({"phone":ph,"notel":dest,"sessid":ssid,"pin":pins,"opr":opr,"denom":dnm});
	  
						var myrequest =  $.ajax({
							url: qurl,
							data: datakirim,
							type: "POST",
							crossDomain: true,
							dataType: "text"
						});
		  
						myrequest.success(function(resp) {
							$.mobile.hidePageLoadingMsg();
							//alert(resp);
                                                        localStorage.nopevoucgame2=dest; //simpen ke localstorage
							var s = JSON.parse(resp);
							//alert(s.msg);
							//localStorage.msgtop = s.msg;
							$.mobile.changePage( "respon.html" ,{data:{msg:s.msg}},"slide");
							
							});
				});
				
			





                    $("#gantipin").click(function(){
                        $.mobile.changePage( "gantipin.html" ,{ transition: "slide"});
                    });
                    
                





					$('#subvote').click(function() {
						$.mobile.allowCrossDomainPages = true;
						$.support.cors = true;
						$.mobile.showPageLoadingMsg(); 
						var ph = localStorage.phonenumber;
						var votecode = $("#cdvote").val();
						var ssid = localStorage.lssessid;
						var pins = $("#pinss").val();
						var jmlvote = $("#suara").val();
						var qurl = "http://klikmc.com/mcjqmjson/MCAmal.php";
						var datakirim = JSON.stringify({"phone": ph, "pin":pins, "opr":"vote", "denom":jmlvote, notel:votecode});
						var myrequest =  $.ajax({
							url: qurl,
							data: datakirim,
							type: "POST",
							crossDomain: true,
							dataType: "text"
						});
						myrequest.success(function(resp) {
							$.mobile.hidePageLoadingMsg();
							//alert(resp);
							var s = JSON.parse(resp);
							 $.mobile.changePage("respon.html", {data:{msg:s.msg}},"slide");
						});
					});
				




                            function getParameterByName(name) {
                                var match = RegExp('[?&]' + name + '=([^&]*)').exec(document.location);
                                return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
                            }
                            $('#responreg').on('pageshow', function(){
                                //var param1 = getParameterByName('msg');
                                var param2 = getParameterByName('oldpin');
                                //$("#respon").text("");
                                //$("#respon").text(param1);
                                //$("#pinlama").val('');
                                $("#pinlama").val(param2);
						
                                //alert(param1);
                            });
                            $('#subgantipin').click(function() {
                                $.mobile.allowCrossDomainPages = true;
                                $.support.cors = true;
                                $.mobile.showPageLoadingMsg(); 
                                var date = new Date();
                                var m = date.getMonth()+1;
                                var d = date.getDate();
                                var tgss = date.getFullYear()+''+ (m<10 ? '0' : '') + m + '' +(d<10 ? '0' : '') + d;
                                var ph = getParameterByName('phonex');
                                var pinbaru = $("#pinbaru").val();
                                var pinlama = $("#pinlama").val();
                                var pinbarukonf = $("#pinbarukonf").val();
                                var qurl = "http://www.klikmc.com/mcjqmjson/changepin.php";
                                var datakirim = JSON.stringify({"pinbaru": pinbaru, "pinbaru2": pinbarukonf, "pinlama": pinlama, "phone": ph, "idx":2});
                                //alert(datakirim);
                                var myrequest =  $.ajax({
                                    url: qurl,
                                    data: datakirim,
                                    type: "POST",
                                    crossDomain: true,
                                    dataType: "text"
                                });
                                myrequest.success(function(resp) {
                                    $.mobile.hidePageLoadingMsg();
							
                                    var s = JSON.parse(resp);
							
                                    if(s.rc=="00"){
                                        alert(s.msg);
                                        localStorage.phonenumber = ph;
                                        localStorage.lssessid = s.sessid;
                                        localStorage.datelogin = tgss;
                                        $.mobile.changePage( "home.html" ,{transition:"slide"});
                                    }
                                    else{
                                        alert(s.msg+" silahkan mengganti PIN melalui SMS dan login pada menu Login");
                                    }
                                });
                            });
                        





			$("#mcpay").click(function(){
				$.mobile.changePage( "mcpay.html" ,{ transition: "slide"});
			});
			$("#pulsa").click(function(){
				$.mobile.changePage( "topuppulsa.html" ,{ transition: "slide"});
			});
			$("#game").click(function(){
				$.mobile.changePage( "topupvouchergame.html" ,{ transition: "slide"});
			});
                        $("#zis").click(function(){
				$.mobile.changePage( "zisvote.html" ,{ transition: "slide"});
			});
		





                    $(document).ready(function(){
                        $("#idpel").val(localStorage.idpelplnpasca);
                        $("#destname").val(localStorage.billnameplnpasca);
                        $("#tagihan").val(localStorage.amountplnpasca);
                        $("#fee").val(localStorage.feeplnpasca);
                        $("#total").val(localStorage.totalplnpasca);
                        //$("#amounts").val(localStorage.remamount);
                        //$("#destnotif").val(localStorage.remnotif);
                        //alert(localStorage.remnotif);
                    });
                    $("#subkofplnpasca").click(function(){
                        $.mobile.allowCrossDomainPages = true;
                        $.support.cors = true;
                        $.mobile.showPageLoadingMsg(); 
                        var ph = localStorage.phonenumber;
                        //alert(ph);
                        var pins = $("#pinsss").val();
                        //	alert(pins);
                        var code = localStorage.confplnpasca;
                        var qurl = "http://klikmc.com/mcjqmjson/confirm.php";
                        var datakirim = JSON.stringify({"pin":pins,"phone":ph,"conf":code});
                        var myrequest =  $.ajax({
                            url: qurl,
                            data: datakirim,
                            type: "POST",
                            crossDomain: true,
                            dataType: "text"
                        });
                        myrequest.success(function(resp) {
                            //alert(resp);
                            var s = JSON.parse(resp);
                            //alert(s.msg);
                            //localStorage.msgkonfplnpasca = resp;
                            $.mobile.hidePageLoadingMsg();
                            $.mobile.changePage( "respon.html" ,{data:{msg:s.msg}},"slide");
                        });
                    });
                





					$('#subresetpin').click(function() {
						$.mobile.allowCrossDomainPages = true;
						$.support.cors = true;
						$.mobile.showPageLoadingMsg(); 
						var ph = localStorage.phonenumber;
						var ssid = localStorage.lssessid;
						var qurl = "http://www.klikmc.com/mcjqmjson/pinreset.php";
						var datakirim = JSON.stringify({"sessid": ssid, "phone": ph});
						//alert(datakirim);
						var myrequest =  $.ajax({
							url: qurl,
							data: datakirim,
							type: "POST",
							crossDomain: true,
							dataType: "text"
						});
						myrequest.success(function(resp) {
							$.mobile.hidePageLoadingMsg();
							//alert(resp);
							var s = JSON.parse(resp);
							if(s.rc=="00"){
								$.mobile.changePage( "respon.html" ,{data:{msg:s.msg}},"slide");
							}
							else{
								$.mobile.changePage( "respon.html" ,{data:{msg:s.msg}},"slide");
							}
						});
					});
				





                            $('#telkomgrouppage').on('pageshow', function() {
                                if ((localStorage.nopelanggan != '')) {
                                    $("#destphone").val(localStorage.nopelanggan);
                                }
                            });
                            $('#subtelkomgroup').click(function() {
                                $.mobile.allowCrossDomainPages = true;
                                $.support.cors = true;
                                $.mobile.showPageLoadingMsg();
                                var ph = localStorage.phonenumber;
                                var dest = $("#destphone").val();
                                var ssid = localStorage.lssessid;
                                var pins = $("#pinss").val();
                                var opr = $("#oprgroup option:selected").val();
                                //
                                localStorage.nopelanggan = dest;
                                var qurl = "http://klikmc.com/mcjqmjson/telepon.php";
                                var datakirim = JSON.stringify({"pin": pins, "notel": dest, "opr": opr, "phone": ph, "sessid": ssid, "idx": 1});
                                var myrequest = $.ajax({
                                    url: qurl,
                                    data: datakirim,
                                    type: "POST",
                                    crossDomain: true,
                                    dataType: "text"
                                });
                                myrequest.success(function(resp) {
                                    $.mobile.hidePageLoadingMsg();
                                    //alert(resp);
                                    var s = JSON.parse(resp);
                                    if (s.rc == "00") {
                                        localStorage.oprgroup = s.opr;
                                        localStorage.notelgroup = s.notel;
                                        localStorage.billnamegroup = s.billname;
                                        localStorage.tagihangroup = s.tagihan;
                                        localStorage.feegroup = s.fee;
                                        localStorage.totalgroup = s.total;
                                        localStorage.confgroup = s.conf;
                                        $.mobile.changePage("konftelkomgroup.html");
                                    }
                                    else {
                                        //localStorage.msgbygroup = resp;
                                        $.mobile.changePage("respon.html", {data: {msg: resp}}, "slide");
                                    }
                                });
                            });
                        





                            $('#subisisaldo').click(function() {
                                $.mobile.allowCrossDomainPages = true;
                                $.support.cors = true;
                                $.mobile.showPageLoadingMsg(); 
                                var ph = localStorage.phonenumber;
                                var amount = $("#amount").val();
                                var ssid = localStorage.lssessid;
                                var pins = $("#pinss").val();
                                var qurl = "http://klikmc.com/mcjqmjson/reserve.php";
                                var datakirim = JSON.stringify({"pin": pins, "amount": amount, "sessionid": ssid, "phone": ph});
                                //alert(datakirim);
                                var myrequest =  $.ajax({
                                    url: qurl,
                                    data: datakirim,
                                    type: "POST",
                                    crossDomain: true,
                                    dataType: "text"
                                });
                                myrequest.success(function(resp) {
                                    $.mobile.hidePageLoadingMsg();
                                    //alert(resp);
                                    var s = JSON.parse(resp);
                                    if(s.rc=="00"){
                                        $.mobile.changePage("respon.html", {
                                            data:{
                                                msg:s.msg
                                            }
                                        },"slide");
                                    }
                                    else{
                                        $.mobile.changePage("respon.html", {
                                            data:{
                                                msg:s.msg
                                            }
                                        },"slide");
                                    }
                                });
                            });
                        

/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady(){
    document.addEventListener("backbutton", function(e){
        if($.mobile.activePage.is('#home')||$.mobile.activePage.is('#indexbody')){
            e.preventDefault();
            exitAppPopup();
        }
        else {
            //navigator.app.backHistory();
            alert("back to previous page?");
            navigator.app.backHistory();
            //window.history.back();
        }
    }, false);
}

function exitAppPopup() {
    navigator.notification.confirm(
        'Exit Delima eMoney?'
        , function(button) {
            if (button == 2) {
                navigator.app.exitApp();
            } 
        }
        , 'Exit'
        , 'No,Yes'
        );  
    return false;
}
