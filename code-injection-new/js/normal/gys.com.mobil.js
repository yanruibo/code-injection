

                
                
				
				 $('#masaustu').bind('pageshow', function(event, ui){
                
                    init();
                    
                       var customer = localStorage.getItem("customer");
                       
                 
                
                                    var customername = getcustomerName((eval(customer)-1),1);
                                    
                                   
                                    
                                    document.getElementById('head5').textContent = customername;
                    
                }).bind('pageinit', function(event, ui){
                
     
                    
                });
                
				
                

                
                
                
                function init(){
                
                
                    //$.mobile.loadingMessage = "Masaüstü Güncelleniyor...";
                    //$.mobile.showPageLoadingMsg();
                $.mobile.showPageLoadingMsg("a", "Masaüstü Güncelleniyor...",true);
                    
                    var id = localStorage.getItem("id");
                    ajaxCall(id);
                    
                    
                }
                
                function ajaxCall(id){
                
                    var customer = localStorage.getItem("customer");
                
                    var urlparam = getcustomerUrl((eval(customer)-1),1);
                                       
                                      
                    var url =urlparam + "Servisler/UserService.asmx/GetIpotekTalepleri" ;

                  
                
                    gysmobilservis("POST", url, "{userid:'" + id + "'}", "application/json; charset=utf-8", masaustuSucceed, "json", masaustuFailed);
                    
                    
                    
                }
                
                
                function DeviceReady(){
                    var db = window.openDatabase("Database", "1.0", "GYS Mobile", 200000);
                    db.transaction(populateDB, errorCB, successCB);
                }
                
                // Transaction error callback    //    
                function errorCB(err){
                    console.log("Error processing SQL: " + err.code);
                }
                
                // Transaction success callback    //  
                function successCB(){
                
                    var db = window.openDatabase("Database", "1.0", "GYS Mobile", 200000);
                    db.transaction(queryDB, errorCB);
                    
                }
                
                function populateDB(tx){
                
                    var str = document.getElementById('result').value;
                    
             
                    
                    parser = new DOMParser();
                    xmlDoc = parser.parseFromString(str, "text/xml");
                    
                    x = xmlDoc.getElementsByTagName("Talep");
                    
                    
                    
                    tx.executeSql('DROP TABLE IF EXISTS GYS');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS GYS (id unique, StringTalepid, DurumAciklama, MusteriAdiSoyadi,IpotekDosyaID,SubeAdi,HukukBuroAdi,IpotekTuru,DovizCinsi,IpotekTutari,Vekaletname,Ceptel,Mercii,ilgiliavukat,TemerrutFaizOrani,KrediFaizOrani,AksiyonNo)');
                    
                    
                    
                    for (i = 0; i < x.length; i++) {
                    
                    	try
                    	  {
                    	
                    		  //litview level 0
                            var StringTalepid = xmlDoc.getElementsByTagName("StringTalepid")[i].childNodes[0].nodeValue;
                            var DurumAciklama = xmlDoc.getElementsByTagName("DurumAciklama")[i].childNodes[0].nodeValue;
                            var MusteriAdiSoyadi = xmlDoc.getElementsByTagName("MusteriAdiSoyadi")[i].childNodes[0].nodeValue;
                            
                            // detail
                            var IpotekDosyaID = xmlDoc.getElementsByTagName("IpotekDosyaID")[i].childNodes[0].nodeValue;
                            var SubeAdi = xmlDoc.getElementsByTagName("SubeAdi")[i].childNodes[0].nodeValue;
                            var HukukBuroAdi = xmlDoc.getElementsByTagName("HukukBuroAdi")[i].childNodes[0].nodeValue;
                            var IpotekTuru = xmlDoc.getElementsByTagName("IpotekTuru")[i].childNodes[0].nodeValue;
                            var DovizCinsi = xmlDoc.getElementsByTagName("DovizCinsi")[i].childNodes[0].nodeValue;
                            var IpotekTutari = xmlDoc.getElementsByTagName("IpotekTutari")[i].childNodes[0].nodeValue;
                             var Vekaletname = xmlDoc.getElementsByTagName("Vekaletname")[i].childNodes[0].nodeValue;
    						 var Ceptel = xmlDoc.getElementsByTagName("Ceptel")[i].childNodes[0].nodeValue;
    						 var Mercii = xmlDoc.getElementsByTagName("Mercii")[i].childNodes[0].nodeValue;
    						 var ilgiliavukat = xmlDoc.getElementsByTagName("ilgiliavukat")[i].childNodes[0].nodeValue;
    						 var TemerrutFaizOrani = xmlDoc.getElementsByTagName("TemerrutFaizOrani")[i].childNodes[0].nodeValue;
    						 var KrediFaizOrani = xmlDoc.getElementsByTagName("KrediFaizOrani")[i].childNodes[0].nodeValue;
    						 var AksiyonNo = xmlDoc.getElementsByTagName("aksiyonNo")[i].childNodes[0].nodeValue;
                    	  }
                    	catch(err)
                    	  {
                    	 // txt="There was an error on this page.\n\n";
                    	  //txt+="Error description: " + err.message + "\n\n";
                    	 // txt+="Click OK to continue.\n\n";
                    	 // alert(txt);
                    	  }	
                      
                        
                        tx.executeSql("INSERT INTO GYS (id, StringTalepid, DurumAciklama, MusteriAdiSoyadi,IpotekDosyaID,SubeAdi,HukukBuroAdi,IpotekTuru,DovizCinsi,IpotekTutari,Vekaletname,Ceptel,Mercii,ilgiliavukat,TemerrutFaizOrani,KrediFaizOrani,AksiyonNo) VALUES (\' " + (i + 1) + "\',\' " + StringTalepid + "\' ,\' " + DurumAciklama + "\', \'" + MusteriAdiSoyadi + "\',\' " + IpotekDosyaID + "\' ,\' " + SubeAdi + "\',\' " + HukukBuroAdi + "\' ,\' " + IpotekTuru + "\',\' " + DovizCinsi + "\' ,\' " + IpotekTutari + "\' ,\' " + Vekaletname + "\',\' " + Ceptel + "\',\' " + Mercii + "\',\' " + ilgiliavukat + "\',\' " + TemerrutFaizOrani + "\',\' " + KrediFaizOrani + "\',\' " + AksiyonNo + "\')");
                        
                        
                    }
                    
                }
                
                // Query the database    //   
                function queryDB(tx){
                    tx.executeSql('SELECT * FROM GYS', [], querySuccess, errorCB);
                }
                
                // Query the success callback    //  
                function querySuccess(tx, results){
                    var len = results.rows.length;
                    
                    $('#listview').empty();
                    
                    
                    
                    var str = "";
                    for (var i = 0; i < len; i++) {
                    
                    
                    
                    
                        var str = str + '<li data-theme=\"c\" ><a href=\"#\"' +
                        ' onClick="javascript:sendpage(' +
                        results.rows.item(i).IpotekDosyaID +
                        ');' +
                        '\" data-rel=\"dialog\" ><h1 class=\"ui-li-heading-masaustu\">' +
                        results.rows.item(i).MusteriAdiSoyadi +
                        '</h1><p class=\"ui-li-desc-masaustu\"><strong>Talep No:' +
                        results.rows.item(i).StringTalepid +
                        '</strong></p><p class=\"ui-li-desc-masaustu\">' +
                        results.rows.item(i).DurumAciklama +
                        '</p></a>' +
                        '<span class="ui-li-count">Dosya No:' +
                        results.rows.item(i).IpotekDosyaID +
                        '</span>' +
                        '</li>'
                        
                    }
                    
                    $('#listview').append(str).listview('refresh');
                    
                    $.mobile.hidePageLoadingMsg();
                    
                    
                }
                
                
                function sendpage(ido){
                  //navigator.notification.vibrate(100);
                    $.mobile.loadingMessage = "Yükleniyor...";
                    $.mobile.showPageLoadingMsg();
                    localStorage.setItem("ido", ido);
                    var url = "detay.html"
                    //window.location = url;
                  
                    
                    $.mobile.changePage(url);
                    
                }
            


             function detayback() {
                 
                 $.mobile.loadingMessage = "Yükleniyor..." ;
                 $.mobile.showPageLoadingMsg();
                 
                 var url = "detay.html"
                
                 
                 $.mobile.changePage(url);
                 
             }
             
             
             
             function set() {
                 
                    var text = $.trim($("#textarea-1").val());
              
                   if (text == ""){$('#textarea-1').removeClass('inptbanka').addClass('inptbankavalid');}
                 else{
                     
                     settext(text);
                 
                 }
                 
          
                 
                
                 
             }
             
             function settext(text) {
                 
                 var customer = localStorage.getItem("customer");
                 var urlparam = getcustomerUrl((eval(customer)-1),1);
                 var url =urlparam + "Servisler/UploadService.asmx/AksiyonIsleMusteriGorusmesi" ;
                 var ido =localStorage.getItem("ido");
                 var id = localStorage.getItem("id");
                 
                 
                 var datastr = '{ipotekdosyaid:"'+ido+'",text:\"' + text + '\",Kullaniciid:\"' + id + '\"}'
                 
                 
                 
                 gysmobilservis("POST", url, datastr, "application/json; charset=utf-8", textSucceed, "json", updFailed);
                 
                 
                 
             }
             
             function textSucceed(response){
                 
                 var txtcontrol = eval('(' + response.d + ')');
                 
             
                 
                 
                 if (txtcontrol > 0) {
                    
                     
                     setAksiyon(837);
                  
                     
                     
                 }else{
                  
                 }
                 
                 
             }
         
             
             $('#textarea-1').keyup(function(e){
                                 //do something like
                                 if($(this).val() != '')
                                 {
                                 $('#textarea-1').removeClass('inptbankavalid').addClass('inptbanka');
                                 }
                                 });
             


         
         
         
         
         $('#tr').die();
         $('#tr').live( 'pageinit',function(event){
                                       	   
        	 if (!checkInput()) {
        		  var msj = "Cihazınız tarih formatına uyumlu değildir.Bu aşamayı web ortamından ilerletebilirsiniz.";      		    
        		   Msjbox(msj, "GYS Mobile", "Tamam", alertCallback); 
        		    detayback2();
        		}      	                                                                  
                                });
                  
     	
         function checkInput() {
        	    var ver = device.version;
        	
        	    return eval(ver.substring(0,1)) <= 4 ;
        	}
         
             function detayback2() {
                 
                 $.mobile.loadingMessage = "Yükleniyor..." ;
                 $.mobile.showPageLoadingMsg();
                 
                 var url = "detay.html"
                
                 
                 $.mobile.changePage(url);
                 
             }
             
             
             
             function set2() {
                 
             var date = $.trim($("#datetime-l").val());
             var hour = $.trim($("#datetime-l1").val());
             var date1 = $.trim($("#datetime-l2").val());
       
                 if (date == ""){
                	 $("#datetime-l").removeClass('inptbanka').addClass('inptbankavalid');
                	 
                 
                 }else if(hour == ""){
                	 
                	 $("#datetime-l1").removeClass('inptbanka').addClass('inptbankavalid');
                 }
                 else{
                   
         
                	 

                     settext2(date,hour);
                     
                 }
                
                 
             }
             
             function settext2(date,hour) {
                 
            	 
            	
            	 
                 var customer = localStorage.getItem("customer");
                 var urlparam = getcustomerUrl((eval(customer)-1),1);
                 var url =urlparam + "Servisler/UploadService.asmx/AksiyonIsleTapuRandevuforAndroid" ;
                 var ido =localStorage.getItem("ido");
                 var id = localStorage.getItem("id");
               
             
                 var datastr = '{ipotekdosyaid:"'+ido+'",date:\"' + date + '\",hour:\"' + hour + '\",Kullaniciid:\"' + id + '\"}'
                
    
                 gysmobilservis("POST", url, datastr, "application/json; charset=utf-8", textSucceed2, "json", updFailed);
                 
                 
                 
             }
             
             function textSucceed2(response){
                 
                 var txtcontrol = eval('(' + response.d + ')');
                 
              
                 
                 
                 if (txtcontrol > 0) {
                    
                     
                     setAksiyon(842);
                    
                     
                     
                 }else{
                 
                 }
                 
                 
             }
         
             
             
             $("#datetime-l").click(function(e){
                                    //do something like
                                     
                                
                                    $("#datetime-l").removeClass('inptbankavalid').addClass('inptbanka');
                                    
                                    });
             
             
             $("#datetime-l1").click(function(e){
                 //do something like
                  
             
                 $("#datetime-l1").removeClass('inptbankavalid').addClass('inptbanka');
                 
                 });
   
             


     $.mobile.selectmenu.prototype.options.nativeMenu = false;
  
    $('#selectaks').bind('change',function() {
                         
                         
                         var value = this.value;
                         var text = $(this).find(":selected").text();
                         localStorage.setItem("aksno",value);
                       
                         if (value == "409"|| value == "411"||value == "417"||value == "805"){
                         
                         
                        
                          setAksiyon(value);
                         //senddoc();
                         
                      
                         
                         
                         }
                         else{
                         
                         if (value > 0){
                         
                        
                         
                         if (value == 837){
                         
                       
                         
                         $.mobile.changePage("aks1.html",{
                                           transition : 'flip'
                         
                                         });
                         
                         }
                         else if (value == 842){
                         
                         $.mobile.changePage("aks2.html",{
                                             transition : 'flip'
                                             
                                             });
                         
                         }
                         else if (value == 847){
                         
                         $.mobile.changePage("aks3.html",{
                                             transition : 'flip'
                                             
                                             });
                         
                         }
                     
                         else{
                         
                         
                          
                          
                          navigator.notification.confirm(text + " işlemi yapılacaktır.Emin misiniz?", aksConfirm, 'GYS Mobile', 'Evet,Hayır');
							
							function aksConfirm(button){

                            if (button == 1) {

	                                  setAksiyon(value);
                                               }
                                               else {
                                            	   myselect=$('#selectaks');
                                                   myselect[0].selectedIndex = 0;
                                                   myselect.selectmenu('refresh');
                                                       }


                                                              }
                          
                         
                         }
                         
                    
                       
                        
                         }
                         }
                         });
    
    
	  
	  		 $('#detay').bind('pageshow', function(event, ui){
                
                            
		       // localStorage.setItem("firstdocid",0);
        	    //localStorage.setItem("seconddocid",0);
		       //var customer = localStorage.getItem("customer");
                
                                    //var customername = getcustomerName((eval(customer)-1),1);
                                    
                                   // document.getElementById('head1').textContent = customername;
			    //var ido =localStorage.getItem("ido");
                //detay();
                //getaksiyonlist();
                    
                }).bind('pageinit', function(event, ui){
                
     
                    
                });
    
    $('#detay').die();
    $('#detay').live( 'pageinit',function(event){
                     
                     //alert("live detay");
                        $.mobile.hidePageLoadingMsg();  
                       localStorage.setItem("firstdocid",0);
                       localStorage.setItem("seconddocid",0);
                       var customer = localStorage.getItem("customer");
                       
                       var customername = getcustomerName((eval(customer)-1),1);
                       
                       document.getElementById('head1').textContent = customername;
                       var ido =localStorage.getItem("ido");
                       detay();
                       
                     
                       
                       if (customername == "HALKBANK" || customername == "DEMO"){
                           $("#capturebtn").hide();
                           $("#info").hide();
                           $('#slctmenu').show();
                           getaksiyonlist();
                       }
                       else{
                       
                       $("#capturebtn").show();
                       $('#slctmenu').hide();
                      
                       }
                       
                   
                           });
             
	
    function detayCall(id){
        
        var customer = localStorage.getItem("customer");
        
        var urlparam = getcustomerUrl((eval(customer)-1),1);
        
        
        
        //var url =urlparam + "Servisler/UserService.asmx/GetIpotekTalepleriSessionMod" ;
        
        var url =urlparam + "Servisler/UserService.asmx/GetIpotekTalepleri" ;
        
        
        var session= Math.floor(Math.random() * 1000) + 1;
        
        
        //var datastr = '{session:"'+session+'",userid:\"' + id + '\"}'
        
        var datastr = '{userid:\"' + id + '\"}';
        
        
        
        
        gysmobilservis("POST", url, datastr, "application/json; charset=utf-8", detaySucceed, "json", masaustuFailed);
        
    }
    
      
    
    function setAksiyon(tableid) {
        
        $.mobile.loadingMessage = "Güncelleniyor..." ;
        $.mobile.showPageLoadingMsg();
        
        var customer = localStorage.getItem("customer");
        var urlparam = getcustomerUrl((eval(customer)-1),1);
        var url =urlparam + "Servisler/UploadService.asmx/AksiyonIsleServis" ;
        var ido =localStorage.getItem("ido");
         var id = localStorage.getItem("id");
        
       
          var datastr = '{ipotekdosyaid:"'+ido+'",tableid:\"' + tableid + '\",Kullaniciid:\"' + id + '\"}'
        
     
        
        gysmobilservis("POST", url, datastr, "application/json; charset=utf-8", updSucceed, "json", updFailed);
        
        
        
    }
    
    
    function getAksiyonYetki() {
        
        var customer = localStorage.getItem("customer");
        var urlparam = getcustomerUrl((eval(customer)-1),1);
        var url =urlparam + "Servisler/UploadService.asmx/AksiyonYetki" ;
        var ido =localStorage.getItem("ido");
        var id = localStorage.getItem("id");
        
        
        var datastr = '{ipotekdosyaid:"'+ido+'",Kullaniciid:\"' + id + '\"}'
        
           $.mobile.hidePageLoadingMsg();
        
        gysmobilservis("POST", url, datastr, "application/json; charset=utf-8", yetkiSucceed, "json", yetkiFailed);
        
        
        
    }
    
    function refreshdetayback() {
        
      //  $.mobile.loadingMessage = "Yükleniyor..." ;
        //$.mobile.showPageLoadingMsg();
        
        var url = "detay.html"
        
        
        $.mobile.changePage(url);
        
    }
    
    function yetkiSucceed(response){
        
        var yetkicontrol = eval('(' + response.d + ')');
        
      
      
        
        if (yetkicontrol > 0) {
         
            getaksiyonlist();
            var id = localStorage.getItem("id");
            detayCall(id);
            
            
            var aksno = localStorage.getItem("aksno");
            
     
        if (aksno == "409"|| aksno == "411"||aksno == "417"||aksno == "805"){
                  senddoc();
              }
            else
            {
                 refreshdetayback();
            }
            
            
            
           
          
        
        }else{
            
          
            send();
        }
    
        
    }
    
    
    
    
    
    function updSucceed(response){
      
        var obj = jQuery.parseJSON(response.d);
       
        $.each( obj, function() {
               
            
              
             // alert(this['returnCode']);
               
               if (this['returnCode']== "0")
               {
               getAksiyonYetki();
               
               }
               else{
               
               Msjbox("Başka bir kullanıcı işlem yapmıştır...", "GYS Mobile", "Tamam");
               send();
               
               }
            
               });
    
      
      
        
    }
	
    
    
    
    
function getaksiyonlist() {
   
    var customer = localStorage.getItem("customer");
    var urlparam = getcustomerUrl((eval(customer)-1),1);
    var url =urlparam + "Servisler/UploadService.asmx/GetAksiyonlistServis" ;
      var ido =localStorage.getItem("ido"); 
    
    var datastr = '{ipotekdosyaid:\"' + ido + '\"}';
    
    
    
    
       gysmobilservis("POST", url, datastr, "application/json; charset=utf-8", aksSucceed, "json", aksFailed);
    
     
    
}
	
    function aksSucceed(response){
        
        var obj = jQuery.parseJSON(response.d);
         $('#selectaks').empty();
        var str="<option style=\"color:red;\"  value=\"0\">Aksiyon Seçiniz...</option>";
        $.each( obj, function() {
            
               
               str = str +  '<option   value=\"'+this['Tableid']+'\">' + this['AksiyonLink'] + '</option>';
               
             
               
               });
        
       
        
         $('#selectaks').append(str);
        myselect=$('#selectaks');
        myselect[0].selectedIndex = 0;
        myselect.selectmenu('refresh');
        detay();  
    }
	

      function errorCB(err) {        console.log("Error processing SQL: "+err.code);    }
    
     function detay() {
      
  var db = window.openDatabase("Database", "1.0", "GYS Mobile", 200000);
  db.transaction(queryDB, errorCB);
  
      }
    
       function queryDB(tx) {
       
        var ido =localStorage.getItem("ido");
                  
       tx.executeSql("SELECT * FROM GYS", [], querySuccess, errorCB);   
        } 
       
        function querySuccess(tx, results) {   
      
         	     var customer = localStorage.getItem("customer");
                
                 var customername = getcustomerName((eval(customer)-1),1);
               
   var len = results.rows.length;        
 
   $('#listviewdetay').empty();
 
  
  var ido =localStorage.getItem("ido");     
  var str ="";
  
  var aksiyonNo = 0;

  for (var i=0; i<len; i++){            


       var t =results.rows.item(i).IpotekDosyaID;
	  
		                    
             if(eval(t)==eval(ido)){
        
          var m =results.rows.item(i).MusteriAdiSoyadi;
          localStorage.setItem("unvan",m);     
		  localStorage.setItem("IpotekDosyaID",t);
		  
		  
		  
		  
		     aksiyonNo = results.rows.item(i).AksiyonNo;
		     
		

		         
         var str = str + '<li data-role="list-divider">TALEP DETAYI</li>'
               + '<li data-theme=\"e\"><table class=\"tablecolor\"><tr><th>'
                  + 'Vekaletname'
                  + '<th/><td>'
                  +  results.rows.item(i).Vekaletname
                  + '<td/></tr></table></li>'
                   + '<li><table class=\"table\"><tr><th>'
                  + 'Talep No'
                  + '<th/><td>'
                  +  results.rows.item(i).StringTalepid
                  + '<td/></tr></table></li>'
                   + '<li><table class=\"table\"><tr><th>'
                  + 'Müşteri Unvanı'
                  + '<th/><td>'
                  +  results.rows.item(i).MusteriAdiSoyadi
                  + '<td/></tr></table></li>'
				  	    + '<li><table class=\"table\"><tr><th>'
                  + 'Müşteri Cep Tel'
                  + '<th/><td>'
                  + '<a href="tel:0' + results.rows.item(i).Ceptel + '">' + results.rows.item(i).Ceptel + '</a>'
                  + '<td/></tr></table></li>'
                   + '<li><table class=\"table\"><tr><th>'
                  + 'İpotek Dosya No'
                  + '<th/><td>'
                  +  results.rows.item(i).IpotekDosyaID
                  + '<td/></tr></table></li>'
                    + '<li><table class=\"table\"><tr><th>'
                  + 'Durum'
                  + '<th/><td>'
                  +  results.rows.item(i).DurumAciklama
                  + '<td/></tr></table></li>'
                   + '<li><table class=\"table\"><tr><th>'
                  + 'Şube Adı'
                  + '<th/><td>'
                  +  results.rows.item(i).SubeAdi
                  + '<td/></tr></table></li>'
                   + '<li><table class=\"table\"><tr><th>'
                  + 'Hukuk Bürosu'
                  + '<th/><td>'
                  +  results.rows.item(i).HukukBuroAdi
                  + '<td/></tr></table></li>'
                   + '<li><table class=\"table\"><tr><th>'
                  + 'İpotek Türü'
                  + '<th/><td>'
                  +  results.rows.item(i).IpotekTuru
                  + '<td/></tr></table></li>'
                    + '<li><table class=\"table\"><tr><th>'
                  + 'İpotek Tutarı'
                  + '<th/><td>'
                  +  results.rows.item(i).IpotekTutari
                  + '<td/></tr></table></li>'
                   + '<li><table class=\"table\"><tr><th>'
                  + 'Döviz Cinsi'
                  + '<th/><td>'
                  +  results.rows.item(i).DovizCinsi
                  + '<td/></tr></table></li>'
                 + '<li><table class=\"table\"><tr><th>'
                 + 'Tapu Sicil Müd.'
                 + '<th/><td>'
                 +  results.rows.item(i).Mercii
                 + '<td/></tr></table></li>'
                 + '<li><table class=\"table\"><tr><th>'
                 + 'ilgilenen Avukat'
                 + '<th/><td>'
                 +  results.rows.item(i).ilgiliavukat
                 + '<td/></tr></table></li>'
                   + '<li><table class=\"table\"><tr><th>'
                  + 'Banka'
                  + '<th/><td>'
                  +  customername
                  + '<td/></tr></table></li>'
                 + '<li><table class=\"table\"><tr><th>'
                 + 'Temerrüt Faiz Oranı(%)'
                 + '<th/><td>'
                 +  results.rows.item(i).TemerrutFaizOrani
                 + '<td/></tr></table></li>'
                 + '<li><table class=\"table\"><tr><th>'
                 + 'Akdi Faiz Oranı(%)'
                 + '<th/><td>'
                 +  results.rows.item(i).KrediFaizOrani
                 + '<td/></tr></table></li>' ; 
                 
                 if (aksiyonNo == 2010 || aksiyonNo == 2016 || aksiyonNo == 2017 ||aksiyonNo == 2018 ||aksiyonNo == 2023 ||aksiyonNo == 2024 )
		    	 {		    	 
		    	    
		    	 var str = str + '<li><a href="aksupd1.html"><table class=\"tablecolor\"><tr><th>Müşteri Görüşmesi</a><th/></tr></table></li>';
		    	   		    	 
		    	 }
		     
		     if (aksiyonNo == 2010 || aksiyonNo == 2016 || aksiyonNo == 2017 ||aksiyonNo == 2018 || aksiyonNo == 2024 )
	    	 {		    	 
	    	    
	    	 var str = str + '<li><a href="aksupd2.html"><table class=\"tablecolor\"><tr><th>Tapu Randevu Tarihi</a><th/></tr></table></li>';		    	 
	    	 }
		     
		     if (aksiyonNo == 2010 || aksiyonNo == 2016 || aksiyonNo == 2017 ||aksiyonNo == 2018 )
	    	 {		    	 
	    	    
	    	 var str = str + '<li><a href="aksupd3.html"><table class=\"tablecolor\"><tr><th>Bloke Çek</a><th/></tr></table></li>';		    	 
	    	 }
                 
                 
                 
             }
            
                             
            }  
             $('#listviewdetay').append(str); 
             $('#listviewdetay').listview('refresh');
    }
    
     function send() { 
        
             $.mobile.loadingMessage = "Yükleniyor..." ;
    		 $.mobile.showPageLoadingMsg();
            
             var url = "LoginService.html"
           
             
          
             $.mobile.changePage(url);  
  
      }   
      
       function senddoc() { 
        
    		 $.mobile.loadingMessage = "Yükleniyor..." ;
    		 $.mobile.showPageLoadingMsg();
            
             var url = "capture.html"
             
          
              $.mobile.changePage(url);  
  
      }     
    
    
    function DetayReady(){
        
   
        var db = window.openDatabase("Database", "1.0", "GYS Mobile", 200000);
        db.transaction(populateDB1, errorCB1, successCB1);
    }
    
    // Transaction error callback    //
    function errorCB1(err){
        console.log("Error processing SQL: " + err.code);
    }
    
    // Transaction success callback    //
    function successCB1(){
        
        var db = window.openDatabase("Database", "1.0", "GYS Mobile", 200000);
        db.transaction(queryDB, errorCB);
        
    }
    
    function populateDB1(tx){
        
        var str = document.getElementById('result').value;
        
        
        
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(str, "text/xml");
        
        x = xmlDoc.getElementsByTagName("Talep");
        
        
        
        tx.executeSql('DROP TABLE IF EXISTS GYS');
        tx.executeSql('CREATE TABLE IF NOT EXISTS GYS (id unique, StringTalepid, DurumAciklama, MusteriAdiSoyadi,IpotekDosyaID,SubeAdi,HukukBuroAdi,IpotekTuru,DovizCinsi,IpotekTutari,Vekaletname,Ceptel,Mercii,ilgiliavukat,TemerrutFaizOrani,KrediFaizOrani,AksiyonNo)');
        
        
        
        for (i = 0; i < x.length; i++) {
            
            try
            {
                
                
                //litview level 0
                var StringTalepid = xmlDoc.getElementsByTagName("StringTalepid")[i].childNodes[0].nodeValue;
                var DurumAciklama = xmlDoc.getElementsByTagName("DurumAciklama")[i].childNodes[0].nodeValue;
                var MusteriAdiSoyadi = xmlDoc.getElementsByTagName("MusteriAdiSoyadi")[i].childNodes[0].nodeValue;
                
                // detail
                var IpotekDosyaID = xmlDoc.getElementsByTagName("IpotekDosyaID")[i].childNodes[0].nodeValue;
                var SubeAdi = xmlDoc.getElementsByTagName("SubeAdi")[i].childNodes[0].nodeValue;
                var HukukBuroAdi = xmlDoc.getElementsByTagName("HukukBuroAdi")[i].childNodes[0].nodeValue;
                var IpotekTuru = xmlDoc.getElementsByTagName("IpotekTuru")[i].childNodes[0].nodeValue;
                var DovizCinsi = xmlDoc.getElementsByTagName("DovizCinsi")[i].childNodes[0].nodeValue;
                var IpotekTutari = xmlDoc.getElementsByTagName("IpotekTutari")[i].childNodes[0].nodeValue;
                var Vekaletname = xmlDoc.getElementsByTagName("Vekaletname")[i].childNodes[0].nodeValue;
                var Ceptel = xmlDoc.getElementsByTagName("Ceptel")[i].childNodes[0].nodeValue;
                
                var Mercii = xmlDoc.getElementsByTagName("Mercii")[i].childNodes[0].nodeValue;
                var ilgiliavukat = xmlDoc.getElementsByTagName("ilgiliavukat")[i].childNodes[0].nodeValue;
                var TemerrutFaizOrani = xmlDoc.getElementsByTagName("TemerrutFaizOrani")[i].childNodes[0].nodeValue;
                var KrediFaizOrani = xmlDoc.getElementsByTagName("KrediFaizOrani")[i].childNodes[0].nodeValue;
                var AksiyonNo = xmlDoc.getElementsByTagName("aksiyonNo")[i].childNodes[0].nodeValue;
                
                
                
            }
            catch(err)
            {
                txt="There was an error on this page.\n\n";
                txt+="Error description: " + err.message + "\n\n";
                txt+="Click OK to continue.\n\n";
                alert(txt);
            }
            
            
            
            
            
            
            tx.executeSql("INSERT INTO GYS (id, StringTalepid, DurumAciklama, MusteriAdiSoyadi,IpotekDosyaID,SubeAdi,HukukBuroAdi,IpotekTuru,DovizCinsi,IpotekTutari,Vekaletname,Ceptel,Mercii,ilgiliavukat,TemerrutFaizOrani,KrediFaizOrani,AksiyonNo) VALUES (\' " + (i + 1) + "\',\' " + StringTalepid + "\' ,\' " + DurumAciklama + "\', \'" + MusteriAdiSoyadi + "\',\' " + IpotekDosyaID + "\' ,\' " + SubeAdi + "\',\' " + HukukBuroAdi + "\' ,\' " + IpotekTuru + "\',\' " + DovizCinsi + "\' ,\' " + IpotekTutari + "\' ,\' " + Vekaletname + "\',\' " + Ceptel + "\',\' " + Mercii + "\',\' " + ilgiliavukat + "\',\' " + TemerrutFaizOrani + "\',\' " + KrediFaizOrani + "\',\' " + AksiyonNo + "\')");
            
            
        }
        
    }
    
    // Query the database    //
    function queryDB1(tx){
      
        detay();
    }
    
    















            
            
            // Wait for PhoneGap to load
            //
            document.addEventListener("deviceready", onDeviceReady, false);
            document.addEventListener("online", onOnline, false);
          
            // PhoneGap is ready
            //
            
            document.addEventListener("offline", onOffline, false);
            
            function onOffline(){
                alert('Telefon Durumu offline,Lütfen bağlantı ayarlarınızı kontrol ediniz...');
                delete onOffline;
            }
            
            function onDeviceReady(){
            
            
                var str = '<li><table class=\"table\"><tr><th>Uygulama<th/><td> GYS Mobile (v 4.1)<td/></tr></table></li>' +
                '<li><table class=\"table\"><tr><th>Cihaz Adı<th/><td> ' +
                device.name +
                '<td/></tr></table></li>' +
                '<li><table class=\"table\"><tr><th>UI Versiyon<th/><td> ' +
                device.cordova +
                '<td/></tr></table></li>' +
                '<li><table class=\"table\"><tr><th>Platform<th/><td> ' +
                device.platform +
                '<td/></tr></table></li>' +
                '<li><table class=\"table\"><tr><th>Cihaz Versiyon<th/><td> ' +
                device.version +
                '<td/></tr></table></li>'
                
                $('#list').append(str);
                $('#list').listview('refresh');
                
                checkConnection();
				delete onDeviceReady;
                
            }
            
            function checkConnection(){
                var networkState = navigator.network.connection.type;
                
                var states = {};
                states[Connection.UNKNOWN] = 'Unknown connection';
                states[Connection.ETHERNET] = 'Ethernet connection';
                states[Connection.WIFI] = 'WiFi connection';
                states[Connection.CELL_2G] = 'Cell 2G connection';
                states[Connection.CELL_3G] = 'Cell 3G connection';
                states[Connection.CELL_4G] = 'Cell 4G connection';
                states[Connection.NONE] = 'No network connection';
                
                //alert('Connection type: ' + states[networkState]);
			
				delete checkConnection;
            }
            
            
                                                                               
            
            
            function onOnline(){
                //alert('online');
				
				
				
				
            }
            
            
            function loginservice(){
               // navigator.notification.vibrate(100);
                $.mobile.loadingMessage = "Bilgiler kontrol ediliyor...";
                $.mobile.showPageLoadingMsg("a","Bilgiler kontrol ediliyor...",true);

                
                
                var email = $.trim($("#email").val());
                var password = $.trim($("#password").val());
                
                if (email == "" || password == "") {
                    $.mobile.hidePageLoadingMsg();
               
               if (password == ""){$('#password').removeClass('inptbanka').addClass('inptbankavalid');}
                   if (email == ""){$('#email').removeClass('inptbanka').addClass('inptbankavalid');}   
                    //Msjbox('Kullanıcı veya şifre boş olamaz...', 'GYS Mobile', 'Tamam');
                    
                }
                else {
                   var customer = localStorage.getItem("customer");
           
                   var urlparam = getcustomerUrl((eval(customer)-1),1);
                                       
                                      
                   var url =urlparam + "Servisler/UserService.asmx/LoginControl" ;
                
                
                    gysmobilservis("POST", url, "{Username:'" + email + "',Password:'" + password + "'}", "application/json; charset=utf-8", loginSucceed, "json", loginFailed);
                    
                }
                delete loginservice;
            }
        

            
   
        
        
            $('input[type=radio]').change(function(){
            
                if (this.checked) {
                    var customer = $(this).val();
                    
                
                    localStorage.setItem("customer", customer);
               
                    //navigator.notification.vibrate(100);
                    
                    
                    
                    
                    $("#loginform").hide();
                    $("#loginform").show("slow");
                    
                    
                    
                    
                }
                
                
            });
            
            $('input[type=text]').change(function(){
                $('#email').removeClass('inptbankavalid').addClass('inptbanka');
            });
            
            $('input[type=password]').change(function(){
                $('#password').removeClass('inptbankavalid').addClass('inptbanka');
            });
        


         
         
         
         $('#aksupd2').die();
         $('#aksupd2').live( 'pageinit',function(event){
                            
        	 
        	 if (!checkInput()) {
     		  var msj = "Cihazınız tarih formatına uyumlu değildir.Web ortamından güncelleme yapabilirsiniz.";
     		    
     		   Msjbox(msj, "GYS Mobile", "Tamam", alertCallback);  
     		    
     		   detaybackTR();
     		}  else{
     			
     			getdate();
     			
     		}   
        	                                                  
                                });
         
         
         function checkInput() {
     	    var ver = device.version;
     	
     	    return eval(ver.substring(0,1)) <= 4 ;
     	}
         
         
             function detaybackTR() {
                 
                 $.mobile.loadingMessage = "Yükleniyor..." ;
                 $.mobile.showPageLoadingMsg();
                 
                 var url = "detay.html"
                
                 
                 $.mobile.changePage(url);
                 
             }
             
                          
             function setTR() {
                 
            	  var date = $.trim($("#datetime-l").val());
            	  var hour = $.trim($("#datetime-l1").val());
                  
                  
                  if (date == ""){$("#datetime-l").removeClass('inptbanka').addClass('inptbankavalid');}
             else if(hour == ""){
            	 
            	 $("#datetime-l1").removeClass('inptbanka').addClass('inptbankavalid');
             }
                  else{
                    
                
                	  
                	  setdate(date,hour);
               
                                 
                  }
                                                                        
             }
             
             
    function getdate() {
                 
                 var customer = localStorage.getItem("customer");
                 var urlparam = getcustomerUrl((eval(customer)-1),1);
                 var url =urlparam + "Servisler/UploadService.asmx/getTapuRandevu" ;
                 var ido =localStorage.getItem("ido");
                 var id = localStorage.getItem("id");
                 
                 
                 var datastr = '{ipotekdosyaid:"'+ ido +'", Kullaniciid:\"' + id + '\"}'
                 
                 
                 
                 gysmobilservis("POST", url, datastr, "application/json; charset=utf-8", getdateSucceed, "json", updFailed);
                 
                 
                 
             }
    
    
    function getdateSucceed(response){
        
        var obj = jQuery.parseJSON(response.d);
        
        $.each( obj, function() {
               
        
        	
        	
        	var date =this['result']; 
        	
        
        	var msj = "Önceki Randevu Tarihi: " + date.toString() ;
        	                                                                 
                   Msjbox(msj, "GYS Mobile", "Tamam", alertCallback)    
                              
               }); 
        
    
              
    }
             
             
      function setdate(date,hour) {
        
        var customer = localStorage.getItem("customer");
        var urlparam = getcustomerUrl((eval(customer)-1),1);
        var url =urlparam + "Servisler/UploadService.asmx/AksiyonIsleTapuRandevuUpdateforAndroid" ;
        var ido =localStorage.getItem("ido");
        var id = localStorage.getItem("id");
        
        
        var datastr = '{ipotekdosyaid:"'+ido+'",date:\"' + date + '\",hour:\"' + hour + '\",Kullaniciid:\"' + id + '\"}'
              
        gysmobilservis("POST", url, datastr, "application/json; charset=utf-8", setdateSucceed, "json", updFailed);
        
        
        
    }
             
          function setdateSucceed(response){
                 
                 var txtcontrol = eval('(' + response.d + ')');
                 
              
                 
                 
                 if (txtcontrol > 0) {
                    
                     
                
                	  Msjbox("Güncellenmiştir...", "GYS Mobile", "Tamam", alertCallback);    
                     
                     detaybackTR();   
                     
                     
                 }else{
                 
                 }
                 
                 
             }
         
             
             
             $("#datetime-l").click(function(e){
                                    //do something like
                                     
                                
                                    $("#datetime-l").removeClass('inptbankavalid').addClass('inptbanka');
                                    
                                    });
             
             
             $("#datetime-l1").click(function(e){
                 //do something like
                  
             
                 $("#datetime-l1").removeClass('inptbankavalid').addClass('inptbanka');
                 
                 });
             
             


                            
                            
                       
                   			
				 $('#capture').bind('pageshow', function(event, ui){
                
                                localStorage.setItem("takephoto", 0);
                                localStorage.setItem("pdfcreaters", 0);
                                localStorage.setItem("pdfcreateib", 0);
                                localStorage.setItem("pdfcreatevk", 0);
                                localStorage.setItem("pdfcreateyt", 0);
                                localStorage.setItem("captureaction", 0);
                                
                                
                                var tipcontrol = $("#imgview").children().length;
                                
                                if (tipcontrol == 0) {
                                
                                    $("#tip").show();
                                }
                                else {
                                    $("#tip").hide();
                                }
                                
                                
                                var customer = localStorage.getItem("customer");
                                
                                var customername = getcustomerName((eval(customer) - 1), 1);
                                
                                document.getElementById('head6').textContent = customername;
                                
                                
                                $('ol').children('li').on('click', function(){
                                    var selected_index = $(this).index();
                                    //alert('Selected Index = ' + selected_index);
                                });
                                
                                
                                var pictureSource; // picture source
                                var destinationType; // sets the format of returned value 
                                $('.ui-icon', '#my-collaspible').addClass('ui-icon-plus');
                                $('.ui-icon', '#my-collaspible').removeClass('ui-icon-minus');
                                
                                
                                $('#my-collaspible').bind('expand', function(){
                                
                                    $('.ui-icon', '#my-collaspible').addClass('ui-icon-plus');
                                    $('.ui-icon', '#my-collaspible').removeClass('ui-icon-minus');
                                    slider(1);
                                }).bind('collapse', function(){
                                
                                
                                    $('div.ui-collapsible-content', '#my-collaspible').removeClass('ui-collapsible-content-collapsed');
                                    $('.ui-icon', '#my-collaspible').addClass('ui-icon-plus');
                                    $('.ui-icon', '#my-collaspible').removeClass('ui-icon-minus');
                                    
                                    slider(2);
                                });
                                
                                onDeviceReady();
                                successCBX();
                    
                }).bind('pageinit', function(event, ui){
                
     
                    
                });
                            
                            
             
                            
                            
                            
                            
                            function onDeviceReady(){
                                pictureSource = navigator.camera.PictureSourceType;
                                destinationType = navigator.camera.DestinationType;
                                
                            }
                            
                            
                            
                            function onBackKeyDown(){
                            
                            
                                var captureaction = localStorage.getItem("captureaction");
                                
                                
                                
                                
                                if (captureaction == 1) {
                                    document.removeEventListener("backbutton", onBackKeyDown, false);
                                    localStorage.setItem("captureaction", 0);
                                    localStorage.setItem("takephoto", 0);
                                    successCBX();
                                }
                                
                                
                                
                                
                            }
                            
                            function menu(){
                                var type = $("#select3").val();
                                var myselect = $("#select3");
                                myselect[0].selectedIndex = 0;
                                myselect.selectmenu('refresh');
                                localStorage.setItem("takephoto", 0);
                                if (type == 1) {
                                
                                
                                
                                    localStorage.setItem("doctype", 2701);
                                    $.mobile.changePage("pdfizle.html");
                                }
                                
                                if (type == 2) {
                                    localStorage.setItem("doctype", 2705);
                                    $.mobile.changePage("pdfizle.html");
                                }
                                if (type == 3) {
                                    gonder();
                                    
                                    
                                }
                                
                            }
                            
                            function sec(type){
                            
                                localStorage.setItem("takephoto", 0);
                                if (type == 1) {
                                
                                    var ib = localStorage.getItem("CntrlIB")
                                    var rs = localStorage.getItem("CntrlRS")
                                     var vk = localStorage.getItem("CntrlVK")
                                  var yt = localStorage.getItem("CntrlYT")
                                 var myselect = $("#selectdoc");
                                    
                                    var n = $('input[type=checkbox]:checked').length
                                    
                                    if (n == 0) {
                                    
                                    
                                        Msjbox('Lütfen belge ekleyiniz...', 'GYS Mobile', 'Tamam');
                                        
                                        return;
                                    }
                                    
                                    
                                    
                                    
                                    
                                    //var doctype = $("#slider").val();
                       
                                	
                                	   var doctype = $("#selectdoc").val();
                                      // var myselect = $("#selectdoc");
                                      // myselect[0].selectedIndex = 0;
                                     //  myselect.selectmenu('refresh');
                                	
                                      if (doctype == 0) {
                                           
                                           
                                          Msjbox('Lütfen belge seçiniz...', 'GYS Mobile', 'Tamam');
                                           
                                           return;
                                       }
                                    
                                    
                                    if (doctype == 1) {
                                    
                                        if (ib != "1") {
                                        
                                        
                                            Msjbox('Lütfen en az 1 adet İpotek Belgesi ekleyiniz...', 'GYS Mobile', 'Tamam');
                                            
                                            return;
                                        }
                                        
                                        localStorage.setItem("doctype", 2705);
										viewservice(2705);
										 
	                                       myselect[0].selectedIndex = 0;
	                                       myselect.selectmenu('refresh');
                                        //$.mobile.changePage("pdfizle.html");
										
                                    }
                                    else 
                                        if (doctype == 2) {
                                        
                                            if (rs != "1") {
                                            
                                            
                                                Msjbox('Lütfen en az 1 adet Resmi Senet ekleyiniz...', 'GYS Mobile', 'Tamam');
                                                
                                                return;
                                            }
                                            
                                            localStorage.setItem("doctype", 2701);
											viewservice(2701);
											  myselect[0].selectedIndex = 0;
		                                       myselect.selectmenu('refresh');
                                            //$.mobile.changePage("pdfizle.html");
                                        }
                                        else 
                                            if (doctype == 3) {
                                            
                                                if (vk != "1") {
                                                
                                                
                                                    Msjbox('Lütfen en az 1 adet Vekaletname ekleyiniz...', 'GYS Mobile', 'Tamam');
                                                    
                                                    return;
                                                }
                                                
                                                localStorage.setItem("doctype", 2703);
    											viewservice(2703);
    											  myselect[0].selectedIndex = 0;
    		                                       myselect.selectmenu('refresh');
                                                //$.mobile.changePage("pdfizle.html");
                                            }
                                            else 
                                                if (doctype == 4) {
                                                
                                                    if (yt != "1") {
                                                    
                                                    
                                                        Msjbox('Lütfen en az 1 adet Yeni Tapu ekleyiniz...', 'GYS Mobile', 'Tamam');
                                                        
                                                        return;
                                                    }
                                                    
                                                    localStorage.setItem("doctype", 2869);
        											viewservice(2869);
        											  myselect[0].selectedIndex = 0;
        		                                       myselect.selectmenu('refresh');
                                                    //$.mobile.changePage("pdfizle.html");
                                                }
                                    
                                }
                                
                                if (type == 2) {
                               
									
								
									
									
									
                                }
                                if (type == 3) {
									
									 navigator.notification.confirm("Talebiniz UZ MERKEZ'e gönderilecektir.Emin misiniz?", uzConfirm, 'GYS Mobile', 'Evet,Hayır');
									
									function uzConfirm(button){

    if (button == 1) {
		
         gondersingle();
    }
    else {
    }
    
   
}
									
									
                                  ;
                                    
                                }
                                
                            }
                            
                        
                            
                            
                           function slider(t1){
									//alert(t1);
                                var cntrl = localStorage.getItem("capturecontrol");
								
								   if (cntrl != t1) {
								   	//var type = $("#slider").val();
								   	
							
									
									
									   var type = $("#selectdoc").val();
                                      // var myselect = $("#selectdoc");
                                     //  myselect[0].selectedIndex = 0;
                                      // myselect.selectmenu('refresh');
                                	
                                      if (type == 0) {
                                           
                                           
                                           Msjbox('Lütfen belge seçiniz...', 'GYS Mobile', 'Tamam');
                                           
                                           return;
                                      }
                                    
									
								   	
								   	if (type == 1) {
								   		localStorage.setItem("type",2705);
								   		localStorage.setItem("takephoto", 1);
								   		localStorage.setItem("captureaction", 1);
								   		localStorage.setItem("capturecontrol", t1);
										$("#nav").hide();
								   		capturePhoto(pictureSource.PHOTOLIBRARY);
								   	}
								   	
								   	if (type == 2) {
								   		localStorage.setItem("type",2701);
								   		localStorage.setItem("takephoto", 1);
								   		localStorage.setItem("captureaction", 1);
								   		localStorage.setItem("capturecontrol", t1);
										$("#nav").hide();
								   		capturePhoto(pictureSource.PHOTOLIBRARY);
								   		
								   	}
								   	
								   	if (type == 3) {
								   		localStorage.setItem("type",2703);
								   		localStorage.setItem("takephoto", 1);
								   		localStorage.setItem("captureaction", 1);
								   		localStorage.setItem("capturecontrol", t1);
										$("#nav").hide();
								   		capturePhoto(pictureSource.PHOTOLIBRARY);
								   		
								   	}
								   	
								   	if (type == 4) {
								   		localStorage.setItem("type",2869);
								   		localStorage.setItem("takephoto", 1);
								   		localStorage.setItem("captureaction", 1);
								   		localStorage.setItem("capturecontrol", t1);
										$("#nav").hide();
								   		capturePhoto(pictureSource.PHOTOLIBRARY);
								   		
								   	}
								   	
								   	
								   }
                                }
                                
                            
                            
                            
                            
                            
                            
                            function getPhoto(source){
                            
                                // navigator.camera.getPicture(picSuccess, picFail, {
                                //quality: 25,
                                // allowEdit: true,
                                // destinationType: destinationType.FILE_URI,
                                // sourceType: source                                
                                //  });
                                
                                
                                
                                // window.plugins.gyscam.takePicture(picSuccess, picFail, {
                                // quality: 25,
                                // allowEdit: true,
                                // sourceType: source,                                  
                                // destinationType: Camera.DestinationType.FILE_URI
                                
                                //  });
                                
                                
                                Msjbox('Galeriden Al şuan aktif değildir...', 'GYS Mobile', 'Tamam');
                                
                                
                                
                            }
                            
                            
                            
                            function capturePhoto(source){
                            
                                //document.addEventListener("backbutton", onBackKeyDown, false); 
                                
                                navigator.camera.getPicture(picSuccess, picFail, {
                                    quality: 40,
                                    allowEdit: true,
                                    sourceType: Camera.PictureSourceType.CAMERA,
                                    destinationType: Camera.DestinationType.FILE_URI,
                                    targetWidth: 2048,
                                    targetHeight: 1232,
									saveToPhotoAlbum: true
                                });
                                
                                
                                // window.plugins.gyscam.takePicture(picSuccess, picFail, {
                                // quality: 100,
                                /// allowEdit: true,
                                // sourceType: Camera.PictureSourceType.CAMERA,
                                //  destinationType: Camera.DestinationType.FILE_URI,
                                //     encodingType: Camera.EncodingType.JPEG,
                                //  targetWidth: 800,
                                //  targetHeight: 600
                                // });
                            
                            
                            }
                            
                            
                            function photoSave(imageURI){
                                // this relies on knowledge of photo file URI - you might want to make this more robust :-) 
                                var imgFileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
                                var imgPath = "tmp/" + imgFileName;
                                console.log(imgFileName);
                                
                                window.resolveLocalFileSystemURI(imageURI, resOnSuccess, picFail);
                                function resOnSuccess(fileEntry){
                                    localStorage.setItem("oldimgpath", fileEntry.fullPath);
                                   // alert(fileEntry.fullPath);
                                }
                                
                                
                                var gotFileEntry = function(fileEntry){
                                    console.log("got image file entry: " + fileEntry.fullPath);
                                    
                                    var gotFileSystem = function(fileSystem){
                                    
                                    
                                    
                                    
                                        function onGetDirectorySuccess(dir){
                                        
                                        
                                        
                                            var ipotekDosyaid = localStorage.getItem("IpotekDosyaID");
                                            var unvan = localStorage.getItem("unvan");
                                            
                                            
                                            unvan = unvan.replace(" ", "");
                                            
                                            ipotekDosyaid = ipotekDosyaid.replace(" ", "");
                                            
                                            var d = new Date();
                                            var n = d.getMilliseconds();
                                            
                                            var imagefilename = unvan + "-" + ipotekDosyaid + "-" + n + ".jpg";
                                            
                                            
                                            
                                            fileEntry.moveTo(dir, imagefilename, success, fail);
                                        };
                                        
                                        var entry = fileSystem.root;
                                        entry.getDirectory('gys', {
                                            create: true,
                                            exclusive: false
                                        }, onGetDirectorySuccess, onGetDirectoryFail);
                                        
                                    };
                                    
                                    // get file system to copy or move image file to 
                                    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFileSystem, fsFail);
                                };
                                window.resolveLocalFileSystemURI(imageURI, gotFileEntry, fsFail);
                                
                            }
                            
                            function onGetDirectoryFail(error){
                                console.log("Error creating directory " + error.code);
                                
                            }
                            
                            
                            function copiedFile(fileEntry){
                                console.log("copied file: " + fileEntry.fullPath);
                            }
                            
                            function success(entry){
                                console.log("New Path: " + entry.fullPath);
                                var uri = entry.toURI();
                                
                                localStorage.setItem("imgURI", uri);
                                localStorage.setItem("imgpath", entry.fullPath);
                                
                                window.plugins.cropper.crop(entry.fullPath, "gys", entry.name, "yes");
                                DbReady();
                            }
                            
                            function fail(error){
                                alert(error.code);
                            }
                            
                            // file system fail 
                            function fsFail(error){
                                console.log("failed with error code: " + error.code);
                            }
                            
                            // camera fail 
                            function onFail(message){
                                alert('Failed because: ' + message);
                            }
                            
                            
                            
                            function picSuccess(imageURI){
                            
                               // alert('image device location:' +imageURI);
                                localStorage.setItem("imgURI", imageURI);
                                
                                
                                window.resolveLocalFileSystemURI(imageURI, resOnSuccess, picFail);
                                
                                
                                function resOnSuccess(fileEntry){
                                
                                    localStorage.setItem("imgpath", fileEntry.fullPath);
                                   //alert('full path :' +fileEntry.fullPath);
                                    
                                    
                                    
                                    DbReadycapture();
                                }
                                
                                
                                
                            }
                            
                            
                            
                            function picFail(e){
									$("#nav").show();
                                //navigator.notification.alert("Sorry, we failed...");
                            }
                            
                            function DbReady(){
                            
                                var db = window.openDatabase("Database", "1.0", "GYS Mobile", 200000);
                                db.transaction(populateDB, errorCB, successCBX);
                            }
                            
                            function DbReadycapture(){
                            
                                var db = window.openDatabase("Database", "1.0", "GYS Mobile", 200000);
                                db.transaction(populateDB, errorCB, successCBX1);
                            }
                            
                            
                            function populateDB(tx){
                            
                                var imgURI = localStorage.getItem("imgURI");
                                var imgpath = localStorage.getItem("imgpath");
                                var type = localStorage.getItem("type");
                                var ipotekDosyaid = localStorage.getItem("IpotekDosyaID");
                                var theme = 'd';
                                var sortid = 0;
                                
                                
                                //tx.executeSql('DROP TABLE IF EXISTS IMG');
                                
                                tx.executeSql('CREATE TABLE IF NOT EXISTS IMG (id INTEGER PRIMARY KEY AUTOINCREMENT, imgURI TEXT, imgpath TEXT, theme TEXT ,ipotekDosyaid INTEGER, sortid INTEGER, type INTEGER)');
                                
                                
                                tx.executeSql("INSERT INTO IMG (imgURI,imgpath,theme,ipotekDosyaid,sortid,type) VALUES (\' " + imgURI + "\',\' " + imgpath + "\',\' " + theme + "\',\' " + ipotekDosyaid + "\',\' " + sortid + "\',\' " + type + "\')");
                                
                                
                                
                            }
                            
                            
                            function successCB(){
                            
                            
                                var type = localStorage.getItem("takephoto");
                                
                                if (type == 1) {
                                
                                    capturePhoto(pictureSource.PHOTOLIBRARY);
                                }
                                
                                if (type == 0) {
                                
                                    //getPhoto(pictureSource.PHOTOLIBRARY);
                                
                                }
                                
                                
                                
                            }
                            
                            function successCBX1(){
                            
                            
                            
                            
                                var db = window.openDatabase("Database", "1.0", "GYS Mobile", 200000);
                                db.transaction(upd, errorCB);
                                
                                
                                
                                
                                
                                function upd(tx){
                                
                                    var imgpath = localStorage.getItem("imgpath");
                                    
                                    tx.executeSql("SELECT * FROM IMG ORDER BY id DESC", [], querySuccess2, errorCB);
                                    
                                    
                                }
                                
                                
                                
                                function querySuccess2(tx, results){
                                
                                    var row = results.rows.item(0);
                                    
                                    var rowid = row['id'];
                                    //alert('image id:' + rowid);
                                    uploadPhotosingle(rowid);
                                    
                                    
                                }
                                
                                
                                
                                
                            }
                            
                            
                            
                            function successCBX(){
                            
                                var db = window.openDatabase("Database", "1.0", "GYS Mobile", 200000);
                                db.transaction(queryDB, errorCB);
                                
                            }
                            
                            
                            function errorCB(err){
                            
                                //alert("Error processing SQL: "+err.code);
                            
                            }
                            
                            
                            function queryDB(tx){
                            
                                tx.executeSql('SELECT * FROM IMG ORDER BY sortid ASC', [], querySuccess, errorCB);
                                
                                
                            }
                            
                       
                            
                            function AutoImageResizing(src, fixedSize, id){
                                var width = src.width;
                                var height = src.height;
                                var ratio = width / height;
                                if (width > fixedSize) {
                                    src.width = fixedSize
                                    
                                }
                                if (height > fixedSize) {
                                    var sizedwidth = fixedSize / ratio;
                                    var sizedheight = fixedSize / ratio;
                                    if (height > width) {
                                        if (height >
                                        sizedwidth) {
                                            src.height = fixedSize
                                        }
                                        if (sizedwidth >
                                        fixedSize) {
                                            src.width = src.width * ratio;
                                        }
                                        else {
                                            src.height = src.height * ratio;
                                        }
                                    }
                                    else {
                                        src.width = fixedSize
                                    }
                                }
                                
                                
                                
                                
                            }
							
							
							    
                            function geturl(URI){
                            
							var docid = URI.substr(URI.lastIndexOf('/') + 1);
							
							//alert(docid);
							
							
					        //window.plugins.childBrowser.showWebPage(URI, { showLocationBar: true });
							
                            window.plugins.pdfViewer.showPdf("sdcard/DCIM/Camera/" + docid, "2");
							
                            }
                            
                            function querySuccess(tx, result){
                                var ipotekDosyaid = localStorage.getItem("IpotekDosyaID");
                                var unvan = localStorage.getItem("unvan");
                                $('#imgview').empty();
                                localStorage.setItem("CntrlIB", "0");
                                localStorage.setItem("CntrlRS", "0");
                                localStorage.setItem("CntrlVK", "0");
                                localStorage.setItem("CntrlYT", "0");
                                
                                var doctype = "";
                                
                                $.each(result.rows, function(index){
                                
                                    var row = result.rows.item(index);
                                    var li = '<li data-role="fieldcontain">';
                                    
                                    //var rowid=row['sortid'];
                                    //alert(rowid);
                                    
                                    if (eval(row['ipotekDosyaid']) == eval(ipotekDosyaid)) {
                                    
                                        //doctype = (row['type'] == 2705) ? "İpotek Belgesi" : "Resmi Senet";
                                        //(row['type'] == 2705) ? localStorage.setItem("CntrlIB", "1") : localStorage.setItem("CntrlRS", "1");
                                                                                
                                        var n= row['type'];
                                
                               
                                   
                                 
                                        
                                        if(eval(row['type'])== eval(2705))
                                        	{ 
                                        	doctype="İpotek belgesi";
                                         	 localStorage.setItem("CntrlIB", "1");
                                         	 }
                                        else if(eval(row['type'])== eval(2701))
                                        	{doctype="Resmi Senet";
                                          	 localStorage.setItem("CntrlRS", "1");}
                                        else if(eval(row['type'])== eval(2703))
                                        	{doctype="Vekaletname";
                                          	 localStorage.setItem("CntrlVK", "1");}
                                        else if(eval(row['type'])== eval(2869))
                                        	{
                                        	doctype="Yeni Tapu";
                                          	 localStorage.setItem("CntrlYT", "1");
                                        	
                                        	}
                                        
                                
                                        
                                        li = (row['theme'] == 'e') ? '<li data-theme="' + row['theme'] + '" data-role="fieldcontain" >' : '<li data-role="fieldcontain" >';
                                        
                                        
                                        
                                     var str1 = li //+'<table><tr><td><input type="checkbox" id="checkbox-'+ index + '" name="checkbox-'+ index + '" class="custom" value="'+ row['id'] + '" />' 
                                                 +
                                                '<a href=\"\"   onClick="javascript:geturl(\'' +
                                                row['imgpath'] +
                                                '\');"  >' +
                                                //'<img id="img-' +
                                                //row['id'] +
                                                //'"  src="'+
                                                //row['imgURI'] +
                                                //'"  onload="AutoImageResizing(this,100)"></img>' +
											
                                                '<h3>' +
                                                //doctype +
                                        
												  '</h3><p class=\"ui-li-desc-masaustu\">' +
                                                unvan +
                                                '-' +
                                                doctype +
                                                '</p>' +
                                                //doctype +
                                                '</p></a>' +
                                                '<a href="#" onClick="javascript:delChecked(' +
                                                row['id'] +
                                                ');"></a>' +
                                                '<span style=\"visibility: hidden\" class="ui-li-count" ><input type="checkbox" style=\"visibility: hidden\" checked="checked" id="checkbox-' +
                                                index +
                                                '" name="checkbox-' +
                                                index +
                                                '" class="custom" value="' +
                                                row['id'] +
                                                '" /> <input name="' +
                                                row['id'] +
                                                '"  type="number" min="0" value="' +
                                                row['sortid'] +
                                                '"  style="width:20px;"  />  </span>' +
                                                '</li>';
                                                
                                                
                                                
                                                
                                                
                                                $('#imgview').append(str1);
                                                
                                         
                                            
                                        }
                                        
                                    });
                                
                                $('#imgview').listview('refresh');
                                
                                
                                
                                
                                
                                $('input[type=number]').each(function(){
                                
                                    this.addEventListener("change", function(e){
                                    
                                        var value = $(this).val();
                                        var id = $(this).attr("name");
                                        
                                        //alert(value);
                                        //alert(id);
                                        
                                        upSuccessimgdb(id, value);
                                        
                                        
                                        
                                    }, false);
                                    
                                    
                                });
                                
                                
                                //$('#pdf').append('<span class="ui-li-count">İpotek Dosya No:' + ipotekDosyaid + '</span>');
                                //$('#menulist').listview('refresh');
                                
                                // var type = localStorage.getItem("type");
                                //if (type == 2701) {
                                //	var takephoto = localStorage.getItem("takephoto");
                                
                                //	if (takephoto == 1) {
                                
                                //	navigator.notification.confirm('Resim Çek işlemine devam edilsin mi?', onConfirm, 'GYS Mobile', 'Evet,Hayır');
                                //capturePhoto(pictureSource.SAVEDPHOTOALBUM);
                                //}
                                // }
                                
                                var count = $("#imgview").children().length;
                                
                                
                                
                                
                                if (count == 0) {
                                
                                    $("#tip").show();
                                }
                                else {
                                    $("#tip").hide();
                                }
                                
                                
                                var type = localStorage.getItem("takephoto");
                                var captureaction = localStorage.getItem("captureaction");
                                
                                
                                
                                if (captureaction == 1) {
                                    if (type == 1) {
                                    
                                        //capturePhoto(pictureSource.PHOTOLIBRARY);
                                    }
                                    
                                    if (type == 0) {
                                    
                                        //getPhoto(pictureSource.PHOTOLIBRARY);
                                    
                                    }
                                    
                                }
                                
                                
                            }
                            
                            
                            function upSuccessimgdb(id, value){
                            
                                var db = window.openDatabase("Database", "1.0", "GYS Mobile", 200000);
                                db.transaction(updateDB, errorCB);
                                function updateDB(tx){
                                
                                    tx.executeSql("UPDATE IMG SET sortid=" + value + " WHERE id=?", [id], upSuccessimg, errorCB);
                                    
                                }
                                
                            }
                            
                            
                            function upSuccessimg(tx, result){
                            
                                successCBX();
                                
                            }
                            
                            
                            function onConfirm(button){
                            
                                if (button == 1) {
                                    capturePhoto(pictureSource.SAVEDPHOTOALBUM);
                                }
                                else {
                                    localStorage.setItem("takephoto", 0);
                                }
                                
                            }
                            
                            function check(controlid){
                            
                            
                            
                                //var checked=$("#checkbox-" + controlid).attr("checked");
                                
                                var checked = $("#checkbox-" + controlid).is(':checked')
                                
                                
                                
                                
                                if (checked) {
                                    $("#checkbox-" + controlid).attr("checked", false);
                                }
                                else {
                                    $("#checkbox-" + controlid).attr("checked", true);
                                }
                                
                                
                                
                            }
                            
                            
                            
                            function delChecked(controlid){
                            
                                localStorage.setItem("captureaction", 0);
                                localStorage.setItem("takephoto", 0);
                                //var value =$("#checkbox-" + controlid).val();
                                var value = controlid;
                                
                                deleteimg(controlid);
                                
                                var db = window.openDatabase("Database", "1.0", "GYS Mobile", 200000);
                                db.transaction(delDB, errorCB);
                                
                                
                                function delDB(tx){
                                
                                    tx.executeSql('DELETE FROM IMG WHERE id=?', [value], delSuccess, errorCB);
                                    
                                }
                                
                                
                            }
                            
                            
                            function uploadPhotosingle(pictureid){
                            
                                successCBX();
                                var imageURI = localStorage.getItem("imgURI");
                                var type = localStorage.getItem("type");
                                
                                var options = new FileUploadOptions();
                                options.chunkedMode = false;
                                options.fileKey = "file";
                                options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
                                options.mimeType = "image/jpeg";
                                
                                
                                
                                var params = new Object();
                                params.IpotekDosyaId = localStorage.getItem("IpotekDosyaID");
                                params.UserId = localStorage.getItem("id");
                                params.type = type;
                                params.name = "Mobile" + pictureid;
                                options.params = params;
                                
                                
                              var ft = new FileTransfer();
                                
                                
                                var customer = localStorage.getItem("customer");
								
								
								   	if (customer==2)
							{
								  var urlparam = getcustomerUrl((eval(4) - 1), 1);
								}
								else{
									
							var urlparam = getcustomerUrl((eval(customer) - 1), 1);
								}
								
                            
                                //var urlparam = getcustomerUrl((eval(customer) - 1), 1);
                           							
							
                                var url = urlparam + "EkspertizRaporu/MobileUpload.aspx";
								
                            
								//alert('Upload starting...');
                                
                                ft.upload(imageURI, url, winsingle, fail, options);
                                
						                     

                                
                            }
                            
                            function winsingle(r){
                            
                            //alert('winsingle starting :');
                                if (r.responseCode == 200) {
                                	//alert('Upload result :' + r.responseCode);
                                    navigator.notification.beep(1);
                                     $("#nav").show();
                                   // alert('Upload finish');
                                    
                                }
                                else {
									
									//alert('Upload result :' + r.responseCode);
									
                                 $("#nav").show();
                                }
                                
                                
                            }
                            
                            
                            
                            function uploadPhoto(imageURI, type, kolonid){
                                var options = new FileUploadOptions();
                                options.chunkedMode = false;
                                options.fileKey = "file";
                                options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
                                options.mimeType = "image/jpeg";
                                
                                
                                
                                var params = new Object();
                                params.IpotekDosyaId = localStorage.getItem("IpotekDosyaID");
                                params.UserId = localStorage.getItem("id");
                                params.type = type;
                                params.name = "GYS Mobile";
                                options.params = params;
                                
                                
                                var ft = new FileTransfer();
                                
                                localStorage.setItem("kolonid", kolonid);
                                var customer = localStorage.getItem("customer");
								
							
								
                                var urlparam = getcustomerUrl((eval(customer) - 1), 1);
                                
                                
                                var url = urlparam + "EkspertizRaporu/MobileUpload.aspx";
                                
                           
                                ft.upload(imageURI, url, win, fail, options);
                                
                                
                                
								
								
								
								
                                
                                
                            }
                            
                            function win(r){
                                //alert("Code = " + r.responseCode);
                                
                                
                                var count = localStorage.getItem("count");
                                var kolonid = localStorage.getItem("kolonid");
                                
                                if (r.responseCode == 200) {
                                    count = count - 1;
                                    
                                    
                                    
                                    
                                    (count == 0) ? pdfcreate() : localStorage.setItem("count", count);
                                    
                                    
                                    
                                    
                                    var db = window.openDatabase("Database", "1.0", "GYS Mobile", 200000);
                                    db.transaction(updateDB, errorCB);
                                    function updateDB(tx){
                                    
                                        tx.executeSql("UPDATE IMG SET theme='e' WHERE id=?", [kolonid], upSuccess, errorCB);
                                        
                                    }
                                    
                                    
                                }
                                else {
                                    $.mobile.hidePageLoadingMsg();
                                }
                                
                                
                            }
                            
                            
                            function pdfcreate(){
                            
                                $.mobile.hidePageLoadingMsg();
                                pdfservice();
                                
                            }
                            
                            function upSuccess(tx, result){
                            
                            
                                countChecked();
                                
                            }
                            
                            
                            function fail(error){
                                //alert("An error has occurred: Code = " + error.code);
                            }
                            
                            
                            
                            function countChecked(){
                                var n = $("input:checked").length;
                                
                                
                                
                                
                                $('input[type=checkbox]').each(function(){
                                    if (this.checked) {
                                        var value = $(this).val();
                                        var db = window.openDatabase("Database", "1.0", "GYS Mobile", 200000);
                                        db.transaction(delDB, errorCB);
                                        function delDB(tx){
                                        
                                            tx.executeSql('DELETE FROM IMG WHERE id=?', [value], delSuccess, errorCB);
                                            
                                        }
                                        
                                        
                                    }
                                    
                                    
                                });
                                
                                
                            }
                            
                            
                            function delSuccess(tx, result){
                            
                            
                                successCBX();
                                
                            }
                            
                            
                            
                            
                            function gondersingle(){
                            
                            
                                //var indx = $("#imgview").children().length;
                                var ib = localStorage.getItem("CntrlIB")
                                var rs = localStorage.getItem("CntrlRS")
                                 //var vk = localStorage.getItem("CntrlVK")
                                  //var yt = localStorage.getItem("CntrlYT")
                                
                                
                                //var n = $("input:checked").length;                                   
                                var n = $('input[type=checkbox]:checked').length
                                
                                if (n == 0) {
                                
                                
                                    Msjbox('Lütfen belge ekleyiniz...', 'GYS Mobile', 'Tamam');
                                    
                                    return;
                                }
                                
                                if (ib != "1") {
                                
                                
                                    Msjbox('Lütfen en az 1 adet İpotek Belgesi ekleyiniz...', 'GYS Mobile', 'Tamam');
                                    
                                    return;
                                }
                                
                                if (rs != "1") {
                                
                                
                                    Msjbox('Lütfen en az 1 adet Resmi Senet ekleyiniz...', 'GYS Mobile', 'Tamam');
                                    
                                    return;
                                }
                                
                                
                                
                                
                                pdfservice();
                                countChecked();
                                
                                
                                
                            }
                            
                            
                            function gonder(){
                            
                            
                                var indx = $("#imgview").children().length;
                                var ib = localStorage.getItem("CntrlIB")
                                var rs = localStorage.getItem("CntrlRS")
                                 //var vk = localStorage.getItem("CntrlVK")
                                  //var yt = localStorage.getItem("CntrlYT")
                                
                                //alert(ib);
                                //alert(rs);
                                //var n = $("input:checked").length;
                                
                                var n = $('input[type=checkbox]:checked').length
                                
                                if (n == 0) {
                                
                                
                                    Msjbox('Lütfen en az 1 adet RS ve IB ekleyiniz...', 'GYS Mobile', 'Tamam');
                                    
                                    return;
                                }
                                
                                if (ib != "1") {
                                
                                
                                    Msjbox('Lütfen en az 1 adet İpotek Belgesi ekleyiniz...', 'GYS Mobile', 'Tamam');
                                    
                                    return;
                                }
                                
                                if (rs != "1") {
                                
                                
                                    Msjbox('Lütfen en az 1 adet Resmi Senet ekleyiniz...', 'GYS Mobile', 'Tamam');
                                    
                                    return;
                                }
                                
                                if (indx == 1) {
                                
                                
                                    Msjbox('test', 'GYS Mobile', 'Tamam');
                                    
                                    return;
                                }
                                
                                
                                var count = 0;
                                
                                
                                
                                localStorage.setItem("count", n);
                                
                                $('input[type=checkbox]').each(function(){
                                    if (this.checked) {
                                        control = 1;
                                        //$.mobile.loadingMessage = "Bağlantı kuruluyor...";
                                        //$.mobile.showPageLoadingMsg();
                                        $.mobile.showPageLoadingMsg("a", "Bağlantı kuruluyor...", true);
                                        
                                        var value = $(this).val();
                                        var ipotekDosyaid = localStorage.getItem("IpotekDosyaID");
                                        var db = window.openDatabase("Database", "1.0", "GYS Mobile", 200000);
                                        db.transaction(delDB, errorCB);
                                        function delDB(tx){
                                            //count=count+1;
                                            //localStorage.setItem("count",count);
                                            
                                            tx.executeSql('SELECT * FROM IMG WHERE id=?', [value], selectSuccess, errorCB);
                                            
                                        }
                                        
                                    }
                                    
                                    
                                });
                                
                                
                                
                                
                                
                            }
                            
                            
                            function selectSuccess(tx, result){
                            
                            
                            
                            
                                $.each(result.rows, function(index){
                                
                                    var row = result.rows.item(index);
                                    var id = row['id'];
                                    var imgpath = row['imgURI'];
                                    var type = row['type'];
                                    
                                    
                                    
                                    
                                    var img = document.getElementById('img-' + id);
                                    var imageURI = img.src;
                                    
                                    
                                    uploadPhoto(imageURI, type, id);
                                });
                                
                                
                                
                            }
                            
                            
                            function dondur(){
                            
                            
                                $('input[type=checkbox]').each(function(){
                                    if (this.checked) {
                                        var value = $(this).val();
                                        
                                        var db = window.openDatabase("Database", "1.0", "GYS Mobile", 200000);
                                        db.transaction(delDB, errorCB);
                                        function delDB(tx){
                                        
                                            tx.executeSql('SELECT * FROM IMG WHERE id=?', [value], dondurSuccess, errorCB);
                                            
                                        }
                                        
                                    }
                                    
                                    
                                });
                                
                            }
                            
                            
                            function change(){
                                var url = "test.html"
                                
                                
                                $.mobile.changePage(url);
                                
                            }
                            
                            function dondurSuccess(tx, result){
                            
                                $.each(result.rows, function(index){
                                
                                
                                
                                    var row = result.rows.item(index);
                                    var id = row['id'];
                                    var imgpath = row['imgURI'];
                                    var type = row['type'];
                                    
                                    
                                    var img = document.getElementById('img-' + id);
                                    
                                    
                                    
                                    
                                });
                                
                                
                                
                            }
                            
                            
                            function pdfservice(){
                            
                                var IpotekDosyaId = localStorage.getItem("IpotekDosyaID");
                                var UserId = localStorage.getItem("id");
                                var datastr = "{ipotekdosyaid:'" + IpotekDosyaId + "',kullaniciid:'" + UserId + "'}"
                                
                                
                                
                                //$.mobile.loadingMessage = "Belgeler Gönderiliyor...";
                                //$.mobile.showPageLoadingMsg();
                                $.mobile.showPageLoadingMsg("a", "Belgeler Gönderiliyor...", true);
                                
                                
                                
                                var customer = localStorage.getItem("customer");
                                
                                var urlparam = getcustomerUrl((eval(customer) - 1), 1);
                                
                                
                                var url = urlparam + "Servisler/UploadService.asmx/CreateDocumentByIpotekdosyaId";
                                
                                $.ajax({
                                    type: "POST",
                                    url: url,
                                    data: datastr,
									cache: false,
                                    contentType: "application/json; charset=utf-8",
                                    success: pdfCallSucceed,
                                    dataType: "json",
                                    failure: pdfCallFailed
                                    ,beforeSend:function(xhr){xhr.setRequestHeader("Cache-Control","no-cache");xhr.setRequestHeader("pragma","no-cache");}
                                });
                                
                                
                            }
							
							
							     
                            function viewservice(type){
                            
							
							
							
                                var IpotekDosyaId = localStorage.getItem("IpotekDosyaID");
                                var UserId = localStorage.getItem("id");
                                var datastr = "{ipotekdosyaid:'" + IpotekDosyaId + "',kullaniciid:'" + UserId + "',DocType:'" + type + "'}"
                                
                           
                                
                                //$.mobile.loadingMessage = "Belgeler Gönderiliyor...";
                                //$.mobile.showPageLoadingMsg();
                                $.mobile.showPageLoadingMsg("a", "Önizleme hazırlanıyor...", true);
                                
                                
                                
                                var customer = localStorage.getItem("customer");
								
						
                                
                                var urlparam = getcustomerUrl((eval(customer) - 1), 1);
                                
                              
								
                                var url = urlparam + "Servisler/UploadService.asmx/CreateDocumentByview";
								
					
								
								
								
							
                                
                                $.ajax({
                                    type: "POST",
                                    url: url,
                                    data: datastr,
									cache: false,
                                    contentType: "application/json; charset=utf-8",
                                    success: pdfviewSucceed,
                                    dataType: "json",
                                    failure: pdfCallFailed
                                    ,beforeSend:function(xhr){xhr.setRequestHeader("Cache-Control","no-cache");xhr.setRequestHeader("pragma","no-cache");}
                                });
                                
                                
                            }
							
							
							 function pdfviewSucceed(response){
                            
                                
                                var docname = response.d;
                                
                               
                                 $.mobile.hidePageLoadingMsg();
                                
                                if (docname.length > 0) {
                                
                                
                                    var firstindex = docname.indexOf('_');
                                    var lastindex = docname.indexOf('.pdf');
                             
                                    
                                    var firstdocid = docname.substring(firstindex + 1, lastindex);
                                   
                                    
                                    localStorage.setItem("pdfid", firstdocid);
                                      
									  
									var customer = localStorage.getItem("customer");                                   
                                    var urlparam = getcustomerUrl((eval(customer) - 1), 1);                                                                        
                                    var url = urlparam + "xPages/pdfdosyaIndir.aspx?commTip=dosin&Docid=";                                                                                                 
                                    var url = url + firstdocid
                                   
								    var unvan = localStorage.getItem("unvan");
                                
                         
                                    var viewname = "gys.pdf";
                                    var path = "GysMobile/" + $.trim(unvan) + "/" ;
                      
								 
									 
							       window.plugins.downloader.downloadFile(url,path,viewname,"true",winpdfview,failpdf); 	
								   
								   function winpdfview(){
							 	
								 							
								      $.mobile.hidePageLoadingMsg();
                                      window.plugins.pdfViewer.showPdf("sdcard/" + path + viewname, "1");
								
							        }
															  									  									                                                                                                                                                                                                  
                                }
                                                                                                                    
                            }
							
							
                            
                            
                            function deleteimg(controlid){
                            
                                var IpotekDosyaId = localStorage.getItem("IpotekDosyaID");
                                var UserId = localStorage.getItem("id");
                                var datastr = "{ipotekdosyaid:'" + IpotekDosyaId + "',kullaniciid:'" + UserId + "',Resimid:'" + controlid + "'}"
                                
                                
                                
                                
                                $.mobile.showPageLoadingMsg("a", "Resim siliniyor...", true);
                                
                                
                                
                                var customer = localStorage.getItem("customer");
                                
                                var urlparam = getcustomerUrl((eval(customer) - 1), 1);
                                
                                
                                var url = urlparam + "Servisler/UploadService.asmx/DeleteDocumentByIpotekDosyaId";
                                
                                $.ajax({
                                    type: "POST",
                                    url: url,
                                    data: datastr,
									cache: false,
                                    contentType: "application/json; charset=utf-8",
                                    success: deleteCallSucceed,
                                    dataType: "json",
                                    failure: pdfCallFailed
                                    ,beforeSend:function(xhr){xhr.setRequestHeader("Cache-Control","no-cache");xhr.setRequestHeader("pragma","no-cache");}
                                });
                                
                                
                            }
                            
                            
                            function deleteCallSucceed(response){
                            
                                $.mobile.hidePageLoadingMsg();
                                
                                
                            }
                            
                            function pdfCallSucceed(response){
                            
                            
                                var docname = response.d;
                                
                               //alert(docname);
                                
                                $.mobile.hidePageLoadingMsg();
                                
                                if (docname.length > 0) {
                                
                                	
                                	var strs = docname.split("-")
                                	
                                	var doc ="";
                                	
                                    localStorage.setItem("2701", "");
                                    localStorage.setItem("2703", "");
                                    localStorage.setItem("2705", "");
                                    localStorage.setItem("2869", "");
                       
                                	
                                	for ( var int = 0; int < strs.length; int++) {
                                		
                                	    if (strs[int].substring(0,4) == "2701")
                                			{
                                		    doc = strs[int].substring(strs[int].indexOf('_') + 1, strs[int].indexOf('.pdf'));
                                			localStorage.setItem("2701", doc);
                                			                  			                                			
                                			}
                                		if (strs[int].substring(0,4) == "2703")
                            			{
                            		    doc = strs[int].substring(strs[int].indexOf('_') + 1, strs[int].indexOf('.pdf'));
                            			localStorage.setItem("2703", doc);
                            			                  			                                			
                            			}
                                		if (strs[int].substring(0,4) == "2705")
                            			{
                            		    doc = strs[int].substring(strs[int].indexOf('_') + 1, strs[int].indexOf('.pdf'));
                            			localStorage.setItem("2705", doc);
                            			                  			                                			
                            			}
                                		if (strs[int].substring(0,4) == "2869")
                            			{
                            		    doc = strs[int].substring(strs[int].indexOf('_') + 1, strs[int].indexOf('.pdf'));
                            			localStorage.setItem("2869", doc);
                            			                  			                                			
                            			}
										
									}			
                            
                                    
                                
                                  
                                    localStorage.setItem("pdfcreaters", 1);
                                    localStorage.setItem("pdfcreateib", 1);
                                    localStorage.setItem("pdfcreatevk", 1);
                                    localStorage.setItem("pdfcreateyt", 1);
                                    
                                    Msjbox('Belgeler Gönderildi...', 'GYS Mobile', 'Tamam', alertpdfCallback);
                                    
                                    
                                    
                                    
                                }
                                else {
                                
                                    var tip = localStorage.getItem("pdftype");
                                    var docid = localStorage.getItem(tip);
                                    
                                    if (docid > 0) {
                                    
                                    
                                    }
                                    else {
                                        localStorage.setItem("pdfcreaters", 1);
                                        localStorage.setItem("pdfcreateib", 1);
                                        Msjbox('Belge hazırlamak için,en az 1 resim gönderiniz...', 'GYS Mobile', 'Tamam');
                                    }
                                    
                                    
                                    
                                    
                                    
                                    
                                }
                                
                                
                            }
                            
                            function pdfCallFailed(error){
                            
                            alert("basarızsız...")
                                return false;
                                
                            }
                            
                            function send(){
                            
                            
                            
                                var url = "LoginService.html"
                                
                                $.mobile.changePage(url);
                                
                                
                            }
                            
                            
                            
                            
                            function pdf(tip){
                            
                                $.mobile.loadingMessage = "Belgeler indiriliyor....";
                                $.mobile.showPageLoadingMsg();
                                
                                
                                var flagrs = localStorage.getItem("pdfcreaters");
                                var flagib = localStorage.getItem("pdfcreateib");
                                var flagvk = localStorage.getItem("pdfcreatevk");
                                var flagyt = localStorage.getItem("pdfcreateyt");
                                var create = 0;
                                var docid = localStorage.getItem(tip);
                                var unvan = localStorage.getItem("unvan");
                                
                                if (tip == "2701") {
                                
                                    var docid = localStorage.getItem("2701");
                                    var docname = "rs.pdf";
                                    var path = "GysMobile/" + $.trim(unvan) + "/" ;
                                    var flagrs = 0;
                                    create = localStorage.getItem("pdfcreaters");
                                }
                                
                                if (tip == "2705") {
                                
                                    var docname = "ib.pdf";
                                    var docid = localStorage.getItem("2705");
                                    var path = "GysMobile/" + $.trim(unvan) + "/" ;
                                    var flagib = 0;
                                    create = localStorage.getItem("pdfcreateib");
                                }
                                
                                if (tip == "2703") {
                                    
                                    var docname = "vk.pdf";
                                    var docid = localStorage.getItem("2703");
                                    var path = "GysMobile/" + $.trim(unvan) + "/" ;
                                    var flagib = 0;
                                    create = localStorage.getItem("pdfcreatevk");
                                }
                                
                                if (tip == "2869") {
                                    
                                    var docname = "yt.pdf";
                                    var docid = localStorage.getItem("2869");
                                    var path = "GysMobile/" + $.trim(unvan) + "/" ;
                                    var flagib = 0;
                                    create = localStorage.getItem("pdfcreateyt");
                                }
                                
                                
                                
                                if (create == 1) {
                                
                                    var customer = localStorage.getItem("customer");
                                    
                                    var urlparam = getcustomerUrl((eval(customer) - 1), 1);
                                    
                                    
                                    var url = urlparam + "xPages/pdfdosyaIndir.aspx?commTip=dosin&Docid=";
                                    
                                
                             
                                    var url = url + docid
                                   
                              
                                    
                                    if (docid.length > 0)
                                    	{
                                    	
                                    	 window.plugins.downloader.downloadFile(url,path,docname,"true",winpdf,failpdf);
                                    	
                                    	}
                                    else{
                                    	
                                    	alert("Bu doküman tipi üretilmemiştir...");
                                    }
                                    
							      
									
									
									function winpdf(){
							 	
								 
									 
									  localStorage.setItem("pdfcreaters", flagrs);
                                      localStorage.setItem("pdfcreateib", flagib);
								      $.mobile.hidePageLoadingMsg();
                                      window.plugins.pdfViewer.showPdf("sdcard/" + path + docname,"1");
								
							 }
									
								
                                    
                            
                                    
                                }
                                else {
                                    $.mobile.hidePageLoadingMsg();
                                    
                                    if (docid.lenght > 0)
                                	{
                                	
                                    window.plugins.pdfViewer.showPdf("sdcard/" + path + docname,"1");
                                	
                                	}
                                else{
                                	
                                	alert("Bu doküman tipi üretilmemiştir...");
                                }
                                    
                                   
                                }
                                
                                
                            }
                            
                            
							
							 
							    function failpdf(){
									
									alert("pdf hata aldı");
									
									$.mobile.hidePageLoadingMsg();
							 }
							 
                            
                            function getpdf(path){ 
                            
                                pdf(path);
                                
                            }
                            
                            
                            function pdflistcreate(){
                                var ipotekDosyaid = localStorage.getItem("IpotekDosyaID");
                                var unvan = localStorage.getItem("unvan");
                                var path = "2705"
                                var path1 = "2701"
                                	 var path3 = "2703"
                                		 var path4 = "2869"
                                $('#imgview2').empty();
                                $("#tip").hide();
                                
                                var doctype = "";
                                
                                
                                
                                var li = '<li data-role="fieldcontain">';
                                
                                var pdfstr = li +
                                '<a href=\"#\"  onClick="javascript:getpdf(\'' +
                                path1 +
                                '\');"   >' +
                                '<img  id="img-' +
                                1 +
                                '"  src="img/pdf_icon.png"></img>' +
                                '<h3 class=\"ui-li-heading-masaustu\">Resmi Senet</h3><p class=\"ui-li-desc-masaustu\">' +
                                unvan +
                                '-' +
                                ipotekDosyaid +
                                '</p></a>' +
                                '</li>' +
                                li +
                                '<a href=\"#\"  onClick="javascript:getpdf(\'' +
                                path +
                                '\');"   >' +
                                '<img  id="img-' +
                                1 +
                                '"  src="img/pdf_icon.png"></img>' +
                                '<h3 class=\"ui-li-heading-masaustu\">İpotek Belgesi</h3><p class=\"ui-li-desc-masaustu\">' +
                                unvan +
                                '-' +
                                ipotekDosyaid +
                                '</p></a>' +
                                '</li>'
                                + li +
                                '<a href=\"#\"  onClick="javascript:getpdf(\'' +
                                path3 +
                                '\');"   >' +
                                '<img  id="img-' +
                                1 +
                                '"  src="img/pdf_icon.png"></img>' +
                                '<h3 class=\"ui-li-heading-masaustu\">Vekaletname</h3><p class=\"ui-li-desc-masaustu\">' +
                                unvan +
                                '-' +
                                ipotekDosyaid +
                                '</p></a>' +
                                '</li>' +
                                 li +
                                '<a href=\"#\"  onClick="javascript:getpdf(\'' +
                                path4 +
                                '\');"   >' +
                                '<img  id="img-' +
                                1 +
                                '"  src="img/pdf_icon.png"></img>' +
                                '<h3 class=\"ui-li-heading-masaustu\">Yeni Tapu Belgesi</h3><p class=\"ui-li-desc-masaustu\">' +
                                unvan +
                                '-' +
                                ipotekDosyaid +
                                '</p></a>' +
                                '</li>';
                                
                                
                                
                                
                                $('#imgview2').append('<li data-role="list-divider">BELGELER</li>' + pdfstr);
                                
                                
                                $('#imgview2').listview('refresh');
                                $("#my-collaspible").hide();
                                $("#nav").hide();
                                $("#tip").hide();
                                $("#blockquote").show();
                                
                            }
                            
                            
                            function alertpdfCallback(){
                            
                                pdflistcreate();
                                
                            }
                        


             function detayback3() {
                 
                 $.mobile.loadingMessage = "Yükleniyor..." ;
                 $.mobile.showPageLoadingMsg();
                 
                 var url = "detay.html"
                
                 
                 $.mobile.changePage(url);
                 
             }
             
             
             
             function set3() {
                 
                    var text = $.trim($("#textarea-1").val());
              
                   if (text == ""){$('#textarea-1').removeClass('inptbanka').addClass('inptbankavalid');}
                 else{
                     
                     settext3(text);
                 
                 }
                 
          
                 
                
                 
             }
             
             function settext3(text) {
                 
                 var customer = localStorage.getItem("customer");
                 var urlparam = getcustomerUrl((eval(customer)-1),1);
                 var url =urlparam + "Servisler/UploadService.asmx/AksiyonIsleBlokeCek" ;
                 var ido =localStorage.getItem("ido");
                 var id = localStorage.getItem("id");
                 
                 
                 var datastr = '{ipotekdosyaid:"'+ido+'",text:\"' + text + '\",Kullaniciid:\"' + id + '\"}'
                 
                 
                 
                 gysmobilservis("POST", url, datastr, "application/json; charset=utf-8", textSucceed3, "json", updFailed);
                 
                 
                 
             }
             
             function textSucceed3(response){
                 
                 var txtcontrol = eval('(' + response.d + ')');
            
                 
                 
                 if (txtcontrol > 0) {
                    
                     
                     setAksiyon(847);
                    
                     
                     
                 }else{
                  
                 }
                 
                 
             }
         
             
             $('#textarea-1').keyup(function(e){
                                 //do something like
                                 if($(this).val() != '')
                                 {
                                 $('#textarea-1').removeClass('inptbankavalid').addClass('inptbanka');
                                 }
                                 });
             


         
         
         
         $('#aksupd1').die();
         $('#aksupd1').live( 'pageinit',function(event){
                                                                      
                          gettextMG();
                        
                                });
         
         
         
             function detaybackMGUpd() {
                 
                 $.mobile.loadingMessage = "Yükleniyor..." ;
                 $.mobile.showPageLoadingMsg();
                 
                 var url = "detay.html"
                
                 
                 $.mobile.changePage(url);
                 
             }
             
                          
             function setMG() {
                 
                    var text = $.trim($("#textarea-1").val());
              
                   if (text == ""){$('#textarea-1').removeClass('inptbanka').addClass('inptbankavalid');}
                 else{
                     
                	
                	 settextMG(text);
                 
                 }
                                                                        
             }
             
             
    function gettextMG() {
                 
                 var customer = localStorage.getItem("customer");
                 var urlparam = getcustomerUrl((eval(customer)-1),1);
                 var url =urlparam + "Servisler/UploadService.asmx/getMusteriGorusmesi" ;
                 var ido =localStorage.getItem("ido");
                 var id = localStorage.getItem("id");
                 
                 
                 var datastr = '{ipotekdosyaid:"'+ ido +'", Kullaniciid:\"' + id + '\"}'
                 
                 
                 
                 gysmobilservis("POST", url, datastr, "application/json; charset=utf-8", gettextMGSucceed, "json", updFailed);
                 
                 
                 
             }
    
    
    function gettextMGSucceed(response){
        
        var obj = jQuery.parseJSON(response.d);
        
        $.each( obj, function() {
               
            
              
                
                   
                   $('#textarea-1').val(this['result'])
            
               }); 
        
    
              
    }
             
             
             function settextMG(text) {
                 
                 var customer = localStorage.getItem("customer");
                 var urlparam = getcustomerUrl((eval(customer)-1),1);
                 var url =urlparam + "Servisler/UploadService.asmx/AksiyonIsleMusteriGorusmesiUpdate" ;
                 var ido =localStorage.getItem("ido");
                 var id = localStorage.getItem("id");
                 
                 
                 var datastr = '{ipotekdosyaid:"'+ido+'",text:\"' + text + '\",Kullaniciid:\"' + id + '\"}'
                 
                 
                 
                 gysmobilservis("POST", url, datastr, "application/json; charset=utf-8", settextMGSuccess, "json", updFailed);
                 
                 
                 
             }
             
             function settextMGSuccess(response){
                 
                 var txtcontrol = eval('(' + response.d + ')');
                 
             
                 
                 
                 if (txtcontrol > 0) {
                    
                     
               	  Msjbox("Güncellenmiştir...", "GYS Mobile", "Tamam", alertCallback);    
                  
                   detaybackMGUpd();  
                     
                 }else{
                  
                 }
                 
                 
             }
         
             
             $('#textarea-1').keyup(function(e){
                                 //do something like
                                 if($(this).val() != '')
                                 {
                                 $('#textarea-1').removeClass('inptbankavalid').addClass('inptbanka');
                                 }
                                 });
             


         
         
         
         $('#aksupd3').die();
         $('#aksupd3').live( 'pageinit',function(event){
                                                                      
                          gettextBC();
                        
                                });
         
         
         
             function detaybackBC() {
                 
                 $.mobile.loadingMessage = "Yükleniyor..." ;
                 $.mobile.showPageLoadingMsg();
                 
                 var url = "detay.html"
                
                 
                 $.mobile.changePage(url);
                 
             }
             
                          
             function setBC() {
                 
                    var text = $.trim($("#textarea-1").val());
              
                   if (text == ""){$('#textarea-1').removeClass('inptbanka').addClass('inptbankavalid');}
                 else{
                     
                	
                     settextBC(text);
                 
                 }
                                                                        
             }
             
             
    function gettextBC() {
                 
                 var customer = localStorage.getItem("customer");
                 var urlparam = getcustomerUrl((eval(customer)-1),1);
                 var url =urlparam + "Servisler/UploadService.asmx/getBlokeCek" ;
                 var ido =localStorage.getItem("ido");
                 var id = localStorage.getItem("id");
                 
                 
                 var datastr = '{ipotekdosyaid:"'+ ido +'", Kullaniciid:\"' + id + '\"}'
                 
                 
                 
                 gysmobilservis("POST", url, datastr, "application/json; charset=utf-8", gettextBCSucceed, "json", updFailed);
                 
                 
                 
             }
    
    
    function gettextBCSucceed(response){
        
        var obj = jQuery.parseJSON(response.d);
        
        $.each( obj, function() {
               
            
              
                
                   
                   $('#textarea-1').val(this['result'])
            
               }); 
        
    
              
    }
             
             
             function settextBC(text) {
                 
                 var customer = localStorage.getItem("customer");
                 var urlparam = getcustomerUrl((eval(customer)-1),1);
                 var url =urlparam + "Servisler/UploadService.asmx/AksiyonIsleBlokeCekUpdate" ;
                 var ido =localStorage.getItem("ido");
                 var id = localStorage.getItem("id");
                 
                 
                 var datastr = '{ipotekdosyaid:"'+ido+'",text:\"' + text + '\",Kullaniciid:\"' + id + '\"}'
                 
                 
                 
                 gysmobilservis("POST", url, datastr, "application/json; charset=utf-8", settextBCSucceed, "json", updFailed);
                 
                 
                 
             }
             
             function settextBCSucceed(response){
                 
                 var txtcontrol = eval('(' + response.d + ')');
                 
             
                 
                 
                 if (txtcontrol > 0) {
                    
                     
               	  Msjbox("Güncellenmiştir...", "GYS Mobile", "Tamam", alertCallback);    
                  
                   detaybackBC();  
                     
                 }else{
                  
                 }
                 
                 
             }
         
             
             $('#textarea-1').keyup(function(e){
                                 //do something like
                                 if($(this).val() != '')
                                 {
                                 $('#textarea-1').removeClass('inptbankavalid').addClass('inptbanka');
                                 }
                                 });
             
