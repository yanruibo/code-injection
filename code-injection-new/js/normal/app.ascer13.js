

        var $ = document; // shortcut
        var head  = $.getElementsByTagName('head')[0];
        var link  = $.createElement('link');
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        
        if(navigator.userAgent.match(/iPhone/i)){
            link.href = 'css/ascer_iphone.css';
        }else if(navigator.userAgent.match(/iPad/i)) {
            link.href = 'css/ascer.css';
        }else{
            link.href = 'css/ascer_iphone.css';        
        }
        
        link.media = 'screen, projection';
        head.appendChild(link);
        
        var link2  = $.createElement('link');
        link2.rel  = 'stylesheet';
        link2.type = 'text/css';        

        link2.href = 'css/photoswipe_iphone.css';        
        
        head.appendChild(link2);
		
        









    
        var supportsOrientationChange = "onorientationchange" in window,
        orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
        
        window.addEventListener(orientationEvent, function() {
                                var alphabetic= $('#leftCompany');	
                                var height = $(alphabetic).height();
                                if(height > 0){
                                    $('#company_information').css('height',height);
                                }
                                }, false); 
    
       
        var params = String(window.location.search);
        
        var aux1 = new Array();        
        var aux2 = new Array();
        
        //si hay parametros
        
        if (params.length > 0){        
            //eliminamos el primer caracter '?'
            params = params.substr(1);
            
            //insertamos en un array las parejas nombre=valor            
            aux1 = params.split("&");              
            
            
            //separo el nombre del valor                
            aux2 = aux1[0].split("=");
            

            aux2= aux2[1].split('-');
            
            var origen = aux2[1];
        }
    
    $(document).ready(function() {
                      setTimeout(function(){
                                 if(navigator.userAgent.match(/iPhone/i)){
                                 $("#toEmail").attr("cols",20);
                                 $("#fromEmail").attr("cols",20);
                                 
                                 }else if(navigator.userAgent.match(/iPad/i)) {
                                 $("#toEmail").attr("cols",25);
                                 $("#fromEmail").attr("cols",25);
                                 }else{
                                 $("#toEmail").attr("cols",20);
                                 $("#fromEmail").attr("cols",20);
                                 }
                                 
                                 
                                 },100);
                      var isMobile = {
                      Android: function() {
                      return navigator.userAgent.match(/Android/i);
                      }
                      };
                      if(isMobile.Android()){
                      
                      }
                      else{
                      $('img').retina();
                      }
                      });
        




    if (params.length > 0){        
        
        getCompanyById(aux2[0]);
    }


    
    var alphabetic= $('#leftCompany');	
    var height = $(alphabetic).height();
        
    if(height > 0){
            $('#company_information').css('height',height);
    }
     



        var $ = document; // shortcut
        var head  = $.getElementsByTagName('head')[0];
        var link  = $.createElement('link');
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        
        if(navigator.userAgent.match(/iPhone/i)){
            link.href = 'css/ascer_iphone.css';
            
        }else if(navigator.userAgent.match(/iPad/i)) {
            link.href = 'css/ascer.css';
        }else{
            link.href = 'css/ascer_iphone.css';        
        }
        
        link.media = 'screen, projection';
        head.appendChild(link);
        








        var supportsOrientationChange = "onorientationchange" in window,
        orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
        
        window.addEventListener(orientationEvent, function() {
                                var alphabetic= $('#leftAbout');	
                                var height = $(alphabetic).height();
                                $('#about_information').css('height',height);
                                }, false);  
    
    
        function loadImages(){
            
            $('#img1').append('<img src="css/images/iphone/about-img-1.png" class="floatRight" />');
            $('#img_1').append('<img src="css/images/iphone/about-img-1.png" class="floatRight" />');
            $('#center_img_about').append('<img src="css/images/iphone/about-img-3.png" />');
            $('#img2').append('<img src="css/images/iphone/about-img-2.png" class="floatRight" /> ');
             var isMobile = {
                      Android: function() {
                      return navigator.userAgent.match(/Android/i);
                      }
                      };
                      if(isMobile.Android()){
                      	 $('#logo_1').append('<a href="http://www.spaintiles.info/default.aspx?&lang=en-GB"><img src="css/images/about-tos-logo.png" /></a>');
						$('#logo_2').append('<a href="http://www.ascer.es/homeinstitucional/default.aspx?lang=en-GB"><img src="css/images/about-ascer-logo.png" /></a>');
						$('#logo_3').append('<a href="http://www.icex.es"><img src="css/images/about-icex-logo.png" /></a>');
						$('#logo_4').append('<a href="http://europa.eu/index_en.htm"><img src="css/images/about-union-logo.png" /></a>');
						$('#logo_5').append('<a href="http://www.aseban.com"><img src="css/images/about-spanbath-logo.png" /></a>');
                      }else
					  {
					  $('#logo_1').append('<a onClick="openOtherWeb(1);" href="#"><img src="css/images/about-tos-logo.png" /></a>');
					  $('#logo_2').append('<a onClick="openOtherWeb(2);" href="#"><img src="css/images/about-ascer-logo.png" /></a>');
					  $('#logo_3').append('<a onClick="openOtherWeb(3);" href="#"><img src="css/images/about-icex-logo.png")" href="#" /></a>');
					  $('#logo_4').append('<a onClick="openOtherWeb(4);" href="#"><img src="css/images/about-union-logo.png")" href="#" /></a>');
					  $('#logo_5').append('<a onClick="openOtherWeb(5);" href="#"><img src="css/images/about-spanbath-logo.png")" href="" /></a>');
					  }
            

    }
   
    
    //$('#left_text_about img').retina();
    $(document).ready(function() {
//                      myScroll = new iScroll('wrapper');
                      loadImages();
                      setTimeout(function(){
                                 if(navigator.userAgent.match(/iPhone/i)){
                                 $(".foriphone").css("display","block");
                                 $(".foripad").css("display","none");
                                 
                                 }else if(navigator.userAgent.match(/iPad/i)) {
                                 $(".foripad").css("display","block");
                                  $(".foriphone").css("display","none");

                                 }else{
                                 $(".foriphone").css("display","block");
                                 $(".foripad").css("display","none");
                                 }
                                 
                                 
                                 },100);
                      
                      
                      var isMobile = {
                      Android: function() {
                      return navigator.userAgent.match(/Android/i);
                      }
                      };
                      if(isMobile.Android()){
                      
                      }
                      else{
                        $('img').retina();
                      }
    });


    
     var alphabetic= $('#leftAbout');	
     var height = $(alphabetic).height();
     $('#about_information').css('height',height);
     



    var $ = document; // shortcut
    var head  = $.getElementsByTagName('head')[0];
    var link  = $.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    
    if(navigator.userAgent.match(/iPhone/i)){
    	//alert('ENTRA IPHONE')
        link.href = 'css/ascer_iphone.css';
    }else if(navigator.userAgent.match(/iPad/i)) {
        link.href = 'css/ascer.css';
    }else{
        link.href = 'css/ascer_iphone.css';        
    }
   
    link.media = 'screen, projection';
    head.appendChild(link);
    

	






    
    var shortName = 'ascer'; 
            var version = '1.0'; 
            var displayName = 'ASCER Database'; 
            var maxSize = 2000000; // in bytes 
			var tempcompanies=[];
			
        var supportsOrientationChange = "onorientationchange" in window,
        orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
        
        window.addEventListener(orientationEvent, function() {
                                var alphabetic= $('#leftAlphabetic');	
                                var height = $(alphabetic).height();
                                $('.slider-content').css('height',height);
                                }, false); 
								
								 document.addEventListener("deviceready", onDeviceReady, false);
								 
								function onDeviceReady()
								{
										
										
            mydb = openDatabase(shortName, version, displayName, maxSize);
            
            
				window.setTimeout(function(){
					 mydb.transaction(
                                 function(transaction) {
                                 
                                 var sql = "CREATE TABLE IF NOT EXISTS companies(company_id integer PRIMARY KEY, full_name VARCHAR,short_name VARCHAR,initial VARCHAR,address_spain VARCHAR,code_spain VARCHAR,city_spain VARCHAR,state_spain VARCHAR,country_spain VARCHAR,telephone_spain VARCHAR,email_spain VARCHAR,fax_spain VARCHAR,website VARCHAR,hall VARCHAR,stand VARCHAR,coord_x VARCHAR,coord_y VARCHAR,manager VARCHAR,company_italy VARCHAR,person_italy VARCHAR,products VARCHAR, VARCHAR,id_photo_1 VARCHAR,id_photo_2 VARCHAR,id_photo_3 VARCHAR,logo_id VARCHAR,address_italy VARCHAR,city_italy VARCHAR,state_italy VARCHAR,country_italy VARCHAR,telephone_italy VARCHAR,email_italy VARCHAR,postal_code_italy VARCHAR,company_type VARCHAR,latitude VARCHAR,longitude VARCHAR,favorited NUMERIC,latitude_italy VARCHAR,longitude_italy VARCHAR) ";  
                                 
                                 transaction.executeSql(sql);
                                 },errorCB, successCB1);
								 
					},1000)
					
								}
								
								function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}

function successCB1() {
   console.log("DB creation success!");
	//initDB();
	
	if(localStorage.insertedData==undefined || localStorage.insertedData==null || localStorage.insertedData==""){
					
					
					localStorage.setItem("insertedData",1);
					
					
										
													 
				
							 $.getJSON("companies.json",function(data){
          
								  // alert(data.length);
								  for (var i=0; i<data.length; i++) {
								  var row = data[i];
								  tempcompanies[i]= row;
								  
								  }			
											// alert(tempcompanies[i].company_id);
											
											insQuery="INSERT INTO companies (company_id, full_name,short_name,initial,address_spain,code_spain,city_spain,state_spain,country_spain,telephone_spain,email_spain,fax_spain,website,hall,stand,coord_x,coord_y,manager,company_italy,person_italy,products,id_photo_1,id_photo_2,id_photo_3,logo_id,address_italy,city_italy,state_italy,country_italy,telephone_italy,email_italy,postal_code_italy,company_type,latitude,longitude,favorited,latitude_italy,longitude_italy) VALUES (";
											var result="";
						mydb = openDatabase(shortName, version, displayName, maxSize);					 
						mydb.transaction(
							function(transaction) {
														 	  
								for (var i=0; i<tempcompanies.length; i++) {
									if(tempcompanies[i].favorited=="")
										tempcompanies[i].favorited="0";
									
									if(tempcompanies[i].coord_x=="")
										tempcompanies[i].coord_x="0"
									
									if(tempcompanies[i].coord_y=="")
										tempcompanies[i].coord_y="0";
									
									var curr_lat=tempcompanies[i].latitude;
									var curr_long=tempcompanies[i].longitude;
									
												 result=parseInt(tempcompanies[i].company_id)+",'"+tempcompanies[i].full_name+"', '"+tempcompanies[i].short_name+"', '"+tempcompanies[i].initial+"', '"+tempcompanies[i].address_spain+"', '"+tempcompanies[i].code_spain+"', '"+tempcompanies[i].city_spain+"', '"+tempcompanies[i].state_spain+"', '"+tempcompanies[i].country_spain+"', '"+tempcompanies[i].telephone_spain+"', '"+tempcompanies[i].email_spain+"', '"+tempcompanies[i].fax_spain+"', '"+tempcompanies[i].website+"', "+tempcompanies[i].hall+", '"+tempcompanies[i].stand+"', "+tempcompanies[i].coord_x+", "+tempcompanies[i].coord_y+", '"+tempcompanies[i].manager+"', '"+tempcompanies[i].company_italy+"', '"+tempcompanies[i].person_italy+"','"+tempcompanies[i].products+"','"+tempcompanies[i].id_photo_1+"', '"+tempcompanies[i].id_photo_2+"', '"+tempcompanies[i].id_photo_3+"', '"+tempcompanies[i].logo_id+"', '"+tempcompanies[i].address_italy+"', '"+tempcompanies[i].city_italy+"', '"+tempcompanies[i].state_italy+"', '"+tempcompanies[i].country_italy+"', '"+tempcompanies[i].telephone_italy+"', '"+tempcompanies[i].email_italy+"', '"+tempcompanies[i].postal_code_italy+"', "+tempcompanies[i].company_type+", '"+curr_lat.replace(",",".")+"', '"+curr_long.replace(",",".")+"', "+tempcompanies[i].favorited+", '"+tempcompanies[i].latitude_italy+"', '"+tempcompanies[i].longitude_italy;
											 
											
											sqlQuery=insQuery+result+"')";
											
											console.log(sqlQuery);
																													
											transaction.executeSql(sqlQuery);
											
											}//end of for loop
										}, errorHandler,succesInsert);//mydb
													
														
									
												 
						});//End of getjson				
					
					}else{
					initDB();
					}
}
	
	
	function succesInsert(){
	
	console.log("insert success");
	initDB();
	}
    
    
    
    $(document).ready(function() {
                     
                      var isMobile = {
                      Android: function() {
                      return navigator.userAgent.match(/Android/i);
                      }
                      };
                      if(isMobile.Android()){
                      
                      }
                      else{
                      $('img').retina();
                      }
                      });




        var $ = document; // shortcut
        var head  = $.getElementsByTagName('head')[0];
        var link  = $.createElement('link');
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        
        if(navigator.userAgent.match(/iPhone/i)){
            link.href = 'css/ascer_iphone.css';
        }else if(navigator.userAgent.match(/iPad/i)) {
            link.href = 'css/ascer.css';
        }else{
            link.href = 'css/ascer_iphone.css';        
        }
        
        link.media = 'screen, projection';
        head.appendChild(link);






        var supportsOrientationChange = "onorientationchange" in window,
        orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
        
        window.addEventListener(orientationEvent, function() {
                                var alphabetic= $('#leftMap');	
                                var height = $(alphabetic).height();
                                $('#mapContainer').css('height',height);
                                }, false);  
    
        var item= 'generalMapItem';
        var params = String(window.location.search);
    
        var aux1 = new Array();        
        var aux2 = new Array();
    
        //si hay parametros
    
        if (params.length > 0){        
            //eliminamos el primer caracter '?'
            params = params.substr(1);
        
            //insertamos en un array las parejas nombre=valor            
            aux1 = params.split("&");
        
            //separo el nombre del valor                
            aux2 = aux1[0].split("=");
            
            item=aux2[1]+'';  
        }  
        
        
       function load(){
            initDB(); 
            gotoMap(item);
            touchScroll('mapContainer')
        }
    
    
    $(document).ready(function() {
                      load();
                      var isMobile = {
                      Android: function() {
                      return navigator.userAgent.match(/Android/i);
                      }
                      };
                      if(isMobile.Android()){
                      
                      }
                      else{
                      $('img').retina();
                      }
                      });

    

        



        var $ = document; // shortcut
        var head  = $.getElementsByTagName('head')[0];
        var link  = $.createElement('link');
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        
        if(navigator.userAgent.match(/iPhone/i)){
            link.href = 'css/ascer_iphone.css';
        }else if(navigator.userAgent.match(/iPad/i)) {
            link.href = 'css/ascer.css';
        }else{
            link.href = 'css/ascer_iphone.css';        
        }
        
        link.media = 'screen, projection';
        head.appendChild(link);

        








        var supportsOrientationChange = "onorientationchange" in window,
        orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
        
        window.addEventListener(orientationEvent, function() {
                                var alphabetic= $('#leftFavourites');	
                                var height = $(alphabetic).height();
                                $('.slider-content').css('height',height);
                                }, false);  
   
    
   
    
    
    
    $(document).ready(function() {
                        getFavourites();
                      
                                            
                      var isMobile = {
                      Android: function() {
                      return navigator.userAgent.match(/Android/i);
                      }
                      };
                      if(isMobile.Android()){
                      
                      }
                      else{
                      $('img').retina();
                      }
                      });



// JavaScript Document
var filter_selected= '#subitem1';
var companyType=1;

var companies = [];
var tempcompanies = [];
var favoritedCompanies = [];
var favoritedHalls= [];


localStorage.favoritedCompaniesCount = 0;
var favorited_company_id;


var db;
var shortName = 'cersaie';
var version = '1.0';
var displayName = 'Cersaie';
var maxSize = 1000000; //  bytes



$.getJSON("companies.json",function(data){
          
          // alert(data.length);
          for (var i=0; i<data.length; i++) {
          var row = data[i];
          tempcompanies[i]= row;
          
          }
          
          })




function openDb(){

	db = openDatabase(shortName, version, displayName, maxSize);
	db.transaction(populateDB, errorCB, successCB);
}


//Function to populate Data
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function populateDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS favorited(favoriteid INTEGER NOT NULL PRIMARY KEY,companyid INTEGER)');
//    tx.executeSql('INSERT INTO favorited(favoriteid,companyid) VALUES (0,1)');
//    tx.executeSql('INSERT INTO favorited(favoriteid,companyid) VALUES (1,1)');
//    tx.executeSql('INSERT INTO favorited(favoriteid,companyid) VALUES (2,1)');
    
    
    //Function call to get Default Speechpad
	db = openDatabase(shortName, version, displayName, maxSize);
    db.transaction(getFavorties, errorCB);
}

function getFavorties(tx1){
    tx1.executeSql('SELECT * from favorited', [], querySuccess1, errorCB);
}

function querySuccess1(tx, results){
    //alert(results.rows.length);
    
    
    for( var i =0; i < results.rows.length; i++){
        var row = results.rows.item(i);
        favoritedCompanies.push(row);
    }
    localStorage.favoritedCompaniesCount = results.rows.length;
    
    init();

}

function insertCompanyIntoFavorites(){
    db = openDatabase(shortName, version, displayName, maxSize);
    db.transaction(insertCompanyHandler, errorCB);
}

function insertCompanyHandler(tx){
    tx.executeSql('INSERT INTO favorited(favoriteid,companyid) VALUES ('+localStorage.favoritedCompaniesCount+','+favorited_company_id+')', [], insertCompanySuccess, errorCB);
}

function insertCompanySuccess(){
//    db = openDatabase(shortName, version, displayName, maxSize);
//    db.transaction(getFavourites, errorCB);
    getFavourites();
}





function removeCompanyFromFavorites(){
    db = openDatabase(shortName, version, displayName, maxSize);
    db.transaction(removeCompanyHandler, errorCB);
}

function removeCompanyHandler(tx){
    tx.executeSql('DELETE FROM favorited where companyid ='+favorited_company_id+'', [], removeCompanySuccess, errorCB);
}

function removeCompanySuccess(){
//    db = openDatabase(shortName, version, displayName, maxSize);
//    db.transaction(getFavourites, errorCB);
    getFavourites();
}




getFavourites= function() {

    
//    try {
//        db.transaction(
//                         function(transaction) {
//                         
//                         var sql = "SELECT * from favorited";
//                         
//                         transaction.executeSql(sql, [], companiesFavouritesDataHandler, errorHandler);
//                         });
//        
//    } catch(e) {
//        alert(e.message);
//    }

    db = openDatabase(shortName, version, displayName, maxSize);
    db.transaction(getFavortiesCall, errorCB);
    
};

function getFavortiesCall(transaction){

     transaction.executeSql('SELECT * from favorited', [], companiesFavouritesDataHandler, errorCB);

}

function companiesFavouritesDataHandler(tx, results) {

   
    setTimeout(function() {
               companies = [];
               favoritedHalls = [];
               
               for (var i=0; i<results.rows.length; i++) {
               var row = results.rows.item(i);
               
               for(var k =0; k < tempcompanies.length; k++){
               
                if(row['companyid'] == tempcompanies[k].company_id){
                    companies.push(tempcompanies[k]);
                    var hallid = tempcompanies[k].hall;
                    favoritedHalls.push(hallid);
                //alert("itha"+favoritedHalls);
                    localStorage.setItem("favoriteHallKey",JSON.stringify(favoritedHalls));
                }
               }
               
               }
               
               if(favoritepage == true){
                    $('#slider').sliderNavFavourites();
               }
               
    }, 1000);
    
    
}

$("#shareemail").live("click",function(){
   
                      alert("open div");
                      
});



$.fn.sliderNavFavourites = function(options) {
    
    $('.slider-content').css('left',0);
    
    $('.slider-content ul').empty();
    
	var defaults = {height: null, arrows: true};
    var opts = $.extend(defaults, options);
    var o = $.meta ? $.extend({}, opts, $$.data()) : opts;
    var slider = $(this);
    
    $(slider).addClass('slider');
    
    var left= $('#leftFavourites');
    var height = $(left).height();
	$('.slider-content', slider).css('height',height);
    
    var content = '';
    content+='<li id="favourites"><div>';
    var finUL=false;
    if(companies.lenght > 0){
        content+='<ul>';
        finUL= true;
    }
    
    while(companies.length>0){
        var classFavorited="favorited-favourites";
        var functionVar= "favorited("+companies[0].company_id+");";
        
        
        var type_comp= 'Others';
        if(companies[0].company_type == '1'){
            type_comp= 'Ceramic tiles';
        }else if(companies[0].company_type == '2'){
            type_comp= 'Sanitaryware';
        }
        
        content +='<li>'+
        '<div class="row">'+
        '<a href="#" onclick="gotoCompanyFromFavouriteList('+companies[0].company_id+')"><div class="identity">'+
        '<div class="rowtitle">'+companies[0].short_name+'</div>'+
        '<div class="rowsubtitle">'+type_comp+'</div>'+
        '</div></a> '+
        
        '<div class="arrow arrow-iphone"></div> '+
        
        '<div class="situation">'+
        '<div class="hall"> Hall '+companies[0].hall+'</div>'+
        '<div class="stand"> Stand '+companies[0].stand+'</div>'+
        '</div>'+
        '<a href="#" onClick="'+functionVar+'; getFavourites()">'+
        '<div id="star_'+companies[0].company_id+'" class="'+classFavorited+'"></div>'+
        '</a>'+
        '</div>'+
        '</li>';
        companies.splice(0, 1);
    }
    
    if(finUL){
        content+= '</ul>';
    }
    
    content+='</li>';
    
    $('.slider-content ul', slider).append(content);
    
    
};




function successCB() {
//    alert("success");
}
function errorCB(tx, err) {
   //alert("Error processing SQL: "+err);
}



jQuery.fn.sort = function() {
    return this.pushStack( [].sort.apply( this, arguments ), []);
};

 function sortLastName(a,b){
     if (a.l_name == b.l_name){
       return 0;
     }
     return a.l_name> b.l_name ? 1 : -1;  
 };  
  function sortLastNameDesc(a,b){  
     return sortLastName(a,b) * -1;  
 };
 

function init()
{

$.getJSON("companies.json",function(data){
				// Handle the results 
			companies = []; 
			
     // alert(data.length); 
     for (var i=0; i<data.length; i++) {
        var row = data[i]; 
		//alert("in");
        companies[i]= row;
        tempcompanies[i]= row;
          
    }
	 
   $('#slider').sliderNav();
	  
 })
    
   // openDb();
    
}







changeFilter = function(element){
    var current_filer='#'+element;
    if(filter_selected != current_filer){
        $(filter_selected).removeClass('subitem-hover');
        filter_selected=current_filer;
        $(filter_selected).addClass('subitem-hover');
    }
    
    search();
};



search= function() {
    
    var key = $('.search-key').val();
    
    if(key == ''){
        $('#leftAlphabetic').css('display','block');
        if(navigator.userAgent.match(/iPhone/i)){
            $('.slider-content').css('left','30px');
        }else if(navigator.userAgent.match(/iPad/i)) {
            $('.slider-content').css('left','50px');
        }else{
           $('.slider-content').css('left','30px');        
        }
        
        
    }else{
        $('#leftAlphabetic').css('display','none');
        $('.slider-content').css('left','0px');
    }

    findByName(key);
};


$("#subitem1").live("click",function(){
companies=[];
companyType="";
$.getJSON("companies.json",function(data){
				// Handle the results 
				
     // alert(data.length); 
     for (var i=0; i<data.length; i++) { 
        var row = data[i]; 
		companies[i]= row;
     }
	
    // alert(companies.length);      
   $('#slider').sliderNav();
	  
 });
									 
});


$("#subitem2").live("click",function(){
companies=[];
companyType=1;
$.getJSON("companies.json",function(data){
				// Handle the results 
				
     // alert(data.length); 
     for (var i=0; i<data.length; i++) { 
        var row = data[i]; 
		//alert("in"+data[i].company_type);
		if(data[i].company_type=="1")
		{
			
        	companies.push(data[i]);
		}
     }
	
    // alert(companies.length);      
   $('#slider').sliderNav();
	  
 });
									 
});



$("#subitem3").live("click",function(){
companies=[];
companyType=2;
$.getJSON("companies.json",function(data){
				// Handle the results 
				
     // alert(data.length); 
     for (var i=0; i<data.length; i++) { 
        var row = data[i]; 
		//alert("in"+data[i].company_type);
		if(data[i].company_type=="2")
		{
			
        	companies.push(data[i]);
		}
     }
	
     //alert(companies.length);      
   $('#slider').sliderNav();
	  
 });
									 
});



$("#subitem4").live("click",function(){
companies=[];
companyType=3;
$.getJSON("companies.json",function(data){
				// Handle the results 
				
     // alert(data.length); 
     for (var i=0; i<data.length; i++) { 
        var row = data[i]; 
		//alert("in"+data[i].company_type);
		if(data[i].company_type=="3")
		{
			
        	companies.push(data[i]);
		}
     }
	
    //alert(companies.length);      
   $('#slider').sliderNav();
	  
 });
									 
});


function findByName(key){
	key=key.toLowerCase();
	companies=[];

$.getJSON("companies.json",function(data){
				// Handle the results 
				
     // alert(data.length); 
     for (var i=0; i<data.length; i++) { 
        var row = data[i]; 
		//alert("in"+data[i].company_type);
		var chkval=data[i].short_name.toLowerCase();
		if(data[i].company_type==companyType && chkval.indexOf(key)!=-1)
		{
			
        	companies.push(data[i]);
		}
     }
	
    //alert(companies.length);      
   $('#slider').sliderNav();
	  
 });

	
}


function gotoCompanyFromList(company_id){
    window.location.href = "company.html?id="+company_id+"-index";
}

gotoCompanyFromFavouriteList = function(company_id){
    
    window.location.href = "company.html?id="+company_id+"-favourite_list";
    
}

$.fn.sliderNav = function(options) {    
    
    $('#leftAlphabetic').empty();
    $('.slider-content ul').empty();
    
        
	var defaults = {items: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"], height: null, arrows: true};
	var opts = $.extend(defaults, options); 
    var o = $.meta ? $.extend({}, opts, $$.data()) : opts; 
    var slider = $(this); 
    var alphabetic= $('#leftAlphabetic');	
    $(slider).addClass('slider');
    

    
    var content = '';
	for(var i in o.items){
        $(alphabetic).append('<a alt="#'+o.items[i]+'"><div class="letter submenu-font submenu-font-left">'+o.items[i]+'</div></a>');             
        
        content+='<li id="'+o.items[i]+'"><div><a name="'+o.items[i]+'" class="title">'+o.items[i]+'</a></div>';
        var finUL=false;
		//alert(companies);
        if(companies.length > 0){
            content+='<ul>';
            finUL= true;
        }
        //alert(companies.length)

        
        while(companies.length>0){
			//alert(companies[0].initial+"\n"+companies.length);
			
            if(companies[0].initial.startsWith(o.items[i])){ 
                var classFavorited="no-favorited";
                var functionVar= "favorited("+companies[0].company_id+")";
                
//                if(companies[0].favorited==1){
//                    classFavorited="favorited";
//                }

                
                for ( var k = 0; k < favoritedCompanies.length ; k++){
                    var row = favoritedCompanies[k];

                    if(row['companyid'] == companies[0].company_id){
                        classFavorited="favorited";
                    }
                }
                
                
                var type_comp= 'Others';
                if(companies[0].company_type == '1'){
                    type_comp= 'Ceramic tiles';
                }else if(companies[0].company_type == '2'){
                    type_comp= 'Sanitaryware';
                }
                
                content +='<li>'+
                                '<div class="row">'+                
                                    '<a href="#" onclick="gotoCompanyFromList('+companies[0].company_id+')"><div class="identity">'+
                                        '<div class="rowtitle">'+companies[0].short_name+'</div>'+
                                        '<div class="rowsubtitle">'+type_comp+'</div>'+
                                    '</div></a> '+ 
                
                                    '<div class="arrow"></div> '+
                
                                    '<div class="situation">'+
                                        '<div class="hall"> Hall '+companies[0].hall+'</div>'+
                                        '<div class="stand"> Stand '+companies[0].stand+'</div>'+
                                    '</div>'+
                                    '<a href="#" onClick="'+functionVar+'">'+
                                        '<div id="star_'+companies[0].company_id+'" class="'+classFavorited+'"></div>'+
                                    '</a>'+
                                '</div>'+
                        '</li>';
                companies.splice(0, 1);
            }else{
                break;
            }
        }
        
        if(finUL){
            content+= '</ul>';
        }  
        
        content+='</li>';   
    }

    $('.slider-content ul', slider).append(content);
    
    $('.slider-content li:first', slider).addClass('selected');
    
    var key = $('.search-key').val();
    
    if(key == ''){
    var height = $(alphabetic).height();
	if(o.height) height = o.height;
	$('.slider-content', slider).css('height',height);
	
	$('a', alphabetic).mouseover(function(event){
                                 var target = $(this).attr('alt');
                                 var cOffset = $('.slider-content', slider).offset().top;
                                 var tOffset = $('.slider-content '+target, slider).offset().top;
                                 var height = $(alphabetic).height(); 
                                 if(o.height) height = o.height;
                                 var pScroll = (tOffset - cOffset) - height/8;
                                 $('.slider-content li', slider).removeClass('selected');
                                 $(target).addClass('selected');
                                 $('.slider-content', slider).stop().animate({scrollTop: '+=' + pScroll + 'px'});
                                 });
    }
    
};


getCompanyById= function(id_company) {


$.getJSON("companies.json",function(data){
				// Handle the results 
				
     // alert(data.length); 
     for (var i=0; i<data.length; i++) { 
        var row = data[i]; 
		//alert("in"+data[i].company_type);
		//var chkval=data[i].short_name.toLowerCase();
		if(data[i].company_id==id_company)
		{
			
        	//companies.push(data[i]);
			loadCompany(data[i]);
		}
     }
									});
	 
};

loadCompany = function(company_selected){
        
alert(company_selected.logo_id);
    if(origen == 'map'){
        $('#mainMenu').append('<a id="buttonBack" href="'+origen+'.html?hall='+company_selected.hall+'">BACK</a>');
    }else{
        $('#mainMenu').append('<a id="buttonBack" href="'+origen+'.html">BACK</a>');
    }
    $('#mainMenu').append('<div id="ascerLogo"></div>');
   
    
    var contenedor = '#first_left';
    
    
    $('#first_left').append('<div id="location_content"></div>');
    
    $('#location_content').append('<div id="icon-map"></div>');
    $('#location_content').append('<a href="#" onclick="goToMapFromExterna('+company_selected.hall+')"><div id="hall_title"> Hall '+company_selected.hall+',</div></a>');
    $('#location_content').append('<div id="stand_title"> Stand '+company_selected.stand+'</div>');
    
    
    $(contenedor).append('<div id="logo_company"><img src="css/images/logo/'+company_selected.logo_id.toUpperCase()+'"/></div>'); 
    var classFavorited="no-favorited-company";
    var functionVar= "favorited("+company_selected.company_id+")";
    
//    if(company_selected.favorited==1){
//        classFavorited="favorited-company";
//    }
    
    for ( var k = 0; k < favoritedCompanies.length ; k++){
        var row = favoritedCompanies[k];
        
        if(row['companyid'] == company_selected.company_id){
            classFavorited="favorited";
        }
    }

  
    $(contenedor).append('<div id="star_container"><a href="#" onClick="'+functionVar+'"><div id="star_'+company_selected.company_id+'" class="'+classFavorited+'"></div></a></div>');
    
    $('#mainMenu').append('<div id="secondaryMenu"><div id="subitem_company" class="subitem-hover"></div></div>');    
    $('#subitem_company').append('<div class="textSubmenu_company submenu-font-company"> '+company_selected.short_name+' </div>');
    
    var contenido_novelties= company_selected.novelties;    
    var contenido_products= company_selected.products;    
    
    if(contenido_novelties != null && contenido_novelties != ''){
        $('#first_left').append('<div id="novelties_title" class="section_title">Novelties</div>');
        $('#first_left').append('<div id="description_content">'+contenido_novelties+'</div>');
    }
    $('#first_left').append('<div id="manager_title" class="section_title2">Stand Manager</div>');
    $('#first_left').append('<div id="manager_name">'+company_selected.mr_ms+' '+company_selected.manager+'</div>');
    
   
    if(contenido_products != null && contenido_products != ''){
        $('#first_left').append('<div id="products_title" class="section_title3">Products</div>');
        $('#first_left').append('<div id="description_content">'+contenido_products+'</div>');
    }
      
    
    $(contenedor).append('<div id="separator"></div>');
    $(contenedor).append('<div id="picture_container" class="center"></div>');    
    

    var url_full = 'css/images/iphone/full/iphone-';
    var url_thumb = 'css/images/iphone/thumb/iphone-';
     
    
    var photo_1 = company_selected.id_photo_1;
    var url_full_1='';
    var url_thumb_1='';
    if(photo_1 != null && photo_1 != ''){
        var name_photo_1 = photo_1.replace('.jpg', '');
        url_full_1= url_full+name_photo_1+'.jpg';
        url_thumb_1 = url_thumb+name_photo_1+'_th.jpg';
    }
    
    var photo_2 = company_selected.id_photo_2;
    var url_full_2='';
    var url_thumb_2='';
    if(photo_2 != null && photo_2 != ''){
        var name_photo_2 = photo_2.replace('.jpg', '');
        url_full_2= url_full+name_photo_2+'.jpg';
        url_thumb_2 = url_thumb+name_photo_2+'_th.jpg';
    }
    
    var photo_3 = company_selected.id_photo_3;
    var url_full_3='';
    var url_thumb_3='';
    if(photo_3 != null && photo_3 != ''){
        var name_photo_3 = photo_3.replace('.jpg', '');
        url_full_3= url_full+name_photo_3+'.jpg';
        url_thumb_3 = url_thumb+name_photo_3+'_th.jpg';
    } 
    
    var total=0;
    var content= '<ul id="frontpage-slider" class="aviaslider"><div id="enlarge"></div>';
    
    if(url_full_1 != ''){ 
        total++;
        content += '<li><a href="'+url_full_1+'"><img src="'+url_thumb_1+'" alt="'+company_selected.collection_photo_1+'-'+company_selected.format_photo_1+'-'+company_selected.colors_photo_1+'" class="size_iphone" /></a></li>';
    }
    
    if(url_full_2 != ''){
        total++;
        content += '<li><a href="'+url_full_2+'"><img src="'+url_thumb_2+'" alt="'+company_selected.collection_photo_2+'-'+company_selected.format_photo_2+'-'+company_selected.colors_photo_2+'" class="size_iphone" /></a></li>';
    }
    if(url_full_3 != ''){
        total++;
        content += '<li><a href="'+url_full_3+'"><img src="'+url_thumb_3+'" alt="'+company_selected.collection_photo_3+'-'+company_selected.format_photo_3+'-'+company_selected.colors_photo_3+'" class="size_iphone" /></a></li>';
    }
    
    
    if(total < 3){
        if(total == 1){
            content += '<li><a href="'+url_full_1+'"><img src="'+url_thumb_1+'" alt="'+company_selected.collection_photo_1+'-'+company_selected.format_photo_1+'-'+company_selected.colors_photo_1+'" class="size_iphone" /></a></li>';
            content += '<li><a href="'+url_full_1+'"><img src="'+url_thumb_1+'" alt="'+company_selected.collection_photo_1+'-'+company_selected.format_photo_1+'-'+company_selected.colors_photo_1+'" class="size_iphone" /></a></li>';
        }else if(total == 2){
            content += '<li><a href="'+url_full_1+'"><img src="'+url_thumb_1+'" alt="'+company_selected.collection_photo_1+'-'+company_selected.format_photo_1+'-'+company_selected.colors_photo_1+'" class="size_iphone" /></a></li>';
            content += '<li><a href="'+url_full_2+'"><img src="'+url_thumb_2+'" alt="'+company_selected.collection_photo_2+'-'+company_selected.format_photo_2+'-'+company_selected.colors_photo_2+'" class="size_iphone" /></a></li>';
        }
    }
    
    content +='</ul>';    
    
    
    $('#picture_container').append(content); 
    
         /*
         $('#content').append('<script type="text/javascript" src="js/slider/jquery.js"></script>');
         $('#content').append('<script src="js/slider/jquery.prettyPhoto.js" type="text/javascript"></script>');	
                         
         $('#content').append('<script type="text/javascript" src="js/slider/jquery.aviaSlider.min.js"></script>');
         $('#content').append('<script type="text/javascript" src="js/slider/custom.min.js"></script>');
         */
    
         $('#content').append('<script type="text/javascript" src="libs/klass.min.js"></script>');
         $('#content').append('<script type="text/javascript" src="js/code.photoswipe-3.0.5.min.js"></script>');
	
         $('#content').append('<script type="text/javascript" src="js/script_function.js"></script>');
    
    
    
    $('#second_part_company').append('<div id="title_company"><div id="subitem_company_information" class="subitem-hover"><div class="textSubmenu_company submenu-font-company"> CONTACT </div></div></div>');
    $('#second_part_company').append('<div id="second_content"><div id="second_left"></div><div id="second_right"></div></div>');
    
       
    $('#second_left').append('<div id="title_location">MAIN OFFICE</div>');
    $('#second_left').append('<div id="name_company">'+company_selected.full_name+'</div>');
    $('#second_left').append('<div id="text_address">'+company_selected.address_spain+'</div>');
    $('#second_left').append('<div id="text_cpostal">'+company_selected.code_spain+'</div>');
    $('#second_left').append('<div id="text_city">'+company_selected.city_spain+' ('+company_selected.country_spain+')</div>');
    
    if(company_selected.telephone_spain != null && company_selected.telephone_spain != '--'){
    $('#second_left').append('<div id="first_row" class="contact_row"><div class="image_contact_phone"></div><div class="title_contact">Phone:</div><a href="tel:'+company_selected.telephone_spain+'" class="link_contact">'+company_selected.telephone_spain+'</a></div>');
    }
    if(company_selected.fax_spain!= null && company_selected.fax_spain!= '--'){
    $('#second_left').append('<div class="contact_row"><div class="image_contact_fax"></div><div class="title_contact">Fax:</div><a href="tel:'+company_selected.fax_spain+'" class="link_contact">'+company_selected.fax_spain+'</a></div>'); 
    }
    if(company_selected.fax_spain != null && company_selected.fax_spain != '--'){
    $('#second_left').append('<div class="contact_row"><div class="image_contact_mail"></div><div class="title_contact">Email:</div><a href="mailto:'+company_selected.email_spain+'" class="link_contact">'+company_selected.email_spain+'</a></div>');
    }
    if(company_selected.website != null && company_selected.website != '--'){
    $('#second_left').append('<div class="contact_row"><div class="image_contact_web"></div><div class="title_contact">Web:</div><a href="'+company_selected.website+'" class="link_contact">'+company_selected.website+'</a></div>');    
    }
    if(company_selected.latitude != null && company_selected.longitude != null){
    var url_google = "http://maps.google.com/maps?ll="+company_selected.latitude+","+company_selected.longitude+"&z=15";
    
    $('#second_left').append('<div id="last_row" class="contact_row"><div class="image_contact_google"></div><a href="'+url_google+'" class="link_contact">Get directions in Google Maps</a></div>  ');
    }
    
    
    if(company_selected.company_italy != null && company_selected.company_italy != '' &&  company_selected.company_italy != '--'){  
        
        $('#second_right').append('<div id="title_location">CONTACT IN ITALY</div>');
        $('#second_right').append('<div id="name_company">'+company_selected.company_italy+'</div>');
        $('#second_right').append('<div id="text_address">'+company_selected.address_italy+'</div>');
        $('#second_right').append('<div id="text_cpostal">'+company_selected.postal_code_italy+'</div>');
        $('#second_right').append('<div id="text_city">'+company_selected.city_italy+' ('+company_selected.country_italy+')</div>');
    
        if(company_selected.telephone_italy != null && company_selected.telephone_italy != '--'){
        $('#second_right').append('<div id="first_row" class="contact_row"><div class="image_contact_phone"></div><div class="title_contact">Phone:</div><a href="tel:'+company_selected.telephone_italy+'" class="link_contact">'+company_selected.telephone_italy+'</a></div>');    
        }
        if(company_selected.email_italy != null && company_selected.email_italy != '--'){
        $('#second_right').append('<div class="contact_row"><div class="image_contact_mail"></div><div class="title_contact">Email:</div><a href="mailto:'+company_selected.email_italy+'" class="link_contact">'+company_selected.email_italy+'</a></div>');    
        }
        if(company_selected.website != null && company_selected.website != '--'){
        $('#second_right').append('<div class="contact_row"><div class="image_contact_web"></div><div class="title_contact">Web:</div><a href="'+company_selected.website+'" class="link_contact">'+company_selected.website+'</a></div>');    
        }        


    }
};


String.prototype.startsWith = function(str) 
{return (this.match("^"+str)==str)};


//Function to set company as favorite
favorited= function(id_company) {
    var current_class= document.getElementById("star_"+id_company).className;
    //alert(current_class);
    
    var flag;
    
    if(current_class == "favorited"){
        Change_Class("star_"+id_company, "no-favorited");
        flag = 1;
    }else if(current_class == "favorited-company"){
        Change_Class("star_"+id_company, "no-favorited-company");
        flag = 1;
    }else if(current_class == "favorited-favourites"){
        Change_Class("star_"+id_company, "no-favorited-favourites");
        flag = 1;
    }else if(current_class == "no-favorited-company"){
        Change_Class("star_"+id_company, "favorited-company");
        flag = 0;
    }else{
        Change_Class("star_"+id_company, "favorited");
        flag = 0;
    }
    
    
    favorited_company_id = id_company;
    if(flag == 0){
        insertCompanyIntoFavorites();
    }
    else{
        removeCompanyFromFavorites();
    }
          
}
Change_Class = function (My_Element, My_Class) {
    
    setTimeout(function(){
               document.getElementById(My_Element).setAttribute("class", My_Class);
           
               },1000);
    };




function isTouchDevice(){
	/* Added Android 3.0 honeycomb detection because touchscroll.js breaks
		the built in div scrolling of android 3.0 mobile safari browser */
	if((navigator.userAgent.match(/android 3/i)) ||
		(navigator.userAgent.match(/honeycomb/i)))
		return false;
	try{
		document.createEvent("TouchEvent");
		return true;
	}catch(e){
		return false;
	}
}

function touchScroll(id){
	if(isTouchDevice()){ //if touch events exist...
		var el=document.getElementById(id);
		var scrollStartPosY=0;
		var scrollStartPosX=0;

		document.getElementById(id).addEventListener("touchstart", function(event) {
			scrollStartPosY=this.scrollTop+event.touches[0].pageY;
			scrollStartPosX=this.scrollLeft+event.touches[0].pageX;
			//event.preventDefault(); // Keep this remarked so you can click on buttons and links in the div
		},false);

		document.getElementById(id).addEventListener("touchmove", function(event) {
			// These if statements allow the full page to scroll (not just the div) if they are
			// at the top of the div scroll or the bottom of the div scroll
			// The -5 and +5 below are in case they are trying to scroll the page sideways
			// but their finger moves a few pixels down or up.  The event.preventDefault() function
			// will not be called in that case so that the whole page can scroll.
			if ((this.scrollTop < this.scrollHeight-this.offsetHeight &&
				this.scrollTop+event.touches[0].pageY < scrollStartPosY-5) ||
				(this.scrollTop != 0 && this.scrollTop+event.touches[0].pageY > scrollStartPosY+5))
					event.preventDefault();	
			if ((this.scrollLeft < this.scrollWidth-this.offsetWidth &&
				this.scrollLeft+event.touches[0].pageX < scrollStartPosX-5) ||
				(this.scrollLeft != 0 && this.scrollLeft+event.touches[0].pageX > scrollStartPosX+5))
					event.preventDefault();	
			this.scrollTop=scrollStartPosY-event.touches[0].pageY;
			this.scrollLeft=scrollStartPosX-event.touches[0].pageX;
		},false);
	}
}

function touchScrollVertical(id){
	if(isTouchDevice()){ //if touch events exist...
		var el=document.getElementById(id);
		var scrollStartPosY=0;

		document.getElementById(id).addEventListener("touchstart", function(event) {
			scrollStartPosY=this.scrollTop+event.touches[0].pageY;
			//event.preventDefault(); // Keep this remarked so you can click on buttons and links in the div
		},false);

		document.getElementById(id).addEventListener("touchmove", function(event) {
			// These if statements allow the full page to scroll (not just the div) if they are
			// at the top of the div scroll or the bottom of the div scroll
			// The -5 and +5 below are in case they are trying to scroll the page sideways
			// but their finger moves a few pixels down or up.  The event.preventDefault() function
			// will not be called in that case so that the whole page can scroll.
			if ((this.scrollTop < this.scrollHeight-this.offsetHeight &&
				this.scrollTop+event.touches[0].pageY < scrollStartPosY-5) ||
				(this.scrollTop != 0 && this.scrollTop+event.touches[0].pageY > scrollStartPosY+5))
					event.preventDefault();	

			this.scrollTop=scrollStartPosY-event.touches[0].pageY;
		},false);
	}
}

var keyStr = "ABCDEFGHIJKLMNOP" +
"QRSTUVWXYZabcdef" +
"ghijklmnopqrstuv" +
"wxyz0123456789+/" +
"=";

function encode64(input) {
    input = escape(input);
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;
    
    do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        
        output = output +
        keyStr.charAt(enc1) +
        keyStr.charAt(enc2) +
        keyStr.charAt(enc3) +
        keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);
    
    return output;
}

function decode64(input) {
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;
    
    // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
    var base64test = /[^A-Za-z0-9\+\/\=]/g;
    if (base64test.exec(input)) {
        alert("There were invalid base64 characters in the input text.\n" +
              "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
              "Expect errors in decoding.");
    }
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    
    do {
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));
        
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        
        output = output + String.fromCharCode(chr1);
        
        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }
        
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
        
    } while (i < input.length);
    
    return unescape(output);
}

(function (cordova) {

	var SocialMessage = function () {

	};

	function getAllActivityTypes() {
		return ["PostToFacebook", "PostToTwitter", "PostToWeibo", "Message",
			"Mail", "Print", "CopyToPasteboard", "AssignToContact", "SaveToCameraRoll"];
	}

	SocialMessage.prototype.send = function (message, activityTypes) {
		if (device.version < 6) {
			emailShareFallback(message);
			return;
		}
		if (typeof (activityTypes) === "undefined" || activityTypes === null) {
			activityTypes = getAllActivityTypes();
		}
		var options = {
			"message": message,
			"activityTypes": activityTypes.join(",")
		};
		cordova.exec(null, null, "SocialMessage", "send", [options]);
	};
	
	function emailShareFallback(message) {
		var options = {
			"message": message,
		};
		cordova.exec(null, null, "SocialMessage", "sendEmailFallback", [options]);
	}

	if (!window.plugins) {
		window.plugins = {};
	}

	window.plugins.socialmessage = new SocialMessage();

}(window.cordova || window.Cordova || window.PhoneGap));

// window.plugins.emailComposer

function EmailComposer() {
this.resultCallback = null; // Function
}

EmailComposer.ComposeResultType = {
    Cancelled:0,
    Saved:1,
    Sent:2,
    Failed:3,
    NotSent:4
}



// showEmailComposer : all args optional

EmailComposer.prototype.showEmailComposer = function(subject,body,toRecipients,ccRecipients,bccRecipients,bIsHTML,attachments) {
console.log("****************************AVVIATO");
var args = {};
if(toRecipients)
args.toRecipients = toRecipients;
if(ccRecipients)
args.ccRecipients = ccRecipients;
if(bccRecipients)
args.bccRecipients = bccRecipients;
if(subject)
args.subject = subject;
if(body)
args.body = body;
if(bIsHTML)
args.bIsHTML = bIsHTML;
    if(attachments)
        args.attachments = attachments;

cordova.exec(null, null, "EmailComposer", "showEmailComposer", [args]);
}

EmailComposer.prototype.showEmailComposerWithCallback = function(callback, subject, body, toRecipients, ccRecipients, bccRecipients, isHTML, attachments) {
this.resultCallback = callback;
this.showEmailComposer.apply(this,[subject,body,toRecipients,ccRecipients,bccRecipients,isHTML,attachments]);
}

EmailComposer.prototype._didFinishWithResult = function(res) {

    var message;
    
    if(res == 0){  //Cancelled
        message = "Email cancelled";
    }
    else if(res == 1){  //Saved
        message = "Email saved to drafts";
    }
    else if(res == 2){ // Sent
        message = "Email Sent";
    }
    else if(res == 3){  //Failed
        message = "Email failed to send";
    }
    else if(res == 4){ // Not Sent
        message = "Email not sent";
    }
    
//    alert(message);
    navigator.notification.alert(message);
    
    
    
this.resultCallback(res);
}

cordova.addConstructor(function() {
console.log("****************************");
if(!window.plugins)
{
window.plugins = {};
}

// shim to work in 1.5 and 1.6
if (!window.Cordova) {
window.Cordova = cordova;
};

window.plugins.emailComposer = new EmailComposer();
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
 
  var shortName = 'ascer'; 
            var version = '1.0'; 
            var displayName = 'ASCER Database'; 
            var maxSize = 2000000; // in bytes 
			var tempcompanies=[];
			
			
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
         mydb = openDatabase(shortName, version, displayName, maxSize);
            
            
				window.setTimeout(function(){
					 mydb.transaction(
                                 function(transaction) {
                                 
                                 var sql = "CREATE TABLE IF NOT EXISTS companies(company_id integer PRIMARY KEY, full_name VARCHAR,short_name VARCHAR,initial VARCHAR,address_spain VARCHAR,code_spain VARCHAR,city_spain VARCHAR,state_spain VARCHAR,country_spain VARCHAR,telephone_spain VARCHAR,email_spain VARCHAR,fax_spain VARCHAR,website VARCHAR,hall VARCHAR,stand VARCHAR,coord_x VARCHAR,coord_y VARCHAR,mr_ms VARCHAR,manager VARCHAR,company_italy VARCHAR,person_italy VARCHAR,products VARCHAR,novelties VARCHAR,collection_photo_1 VARCHAR,format_photo_1 VARCHAR,serie_photo_1 VARCHAR,colors_photo_1 VARCHAR,id_photo_1 VARCHAR,collection_photo_2 VARCHAR,format_photo_2 VARCHAR,serie_photo_2 VARCHAR,colors_photo_2 VARCHAR,id_photo_2 VARCHAR,collection_photo_3 VARCHAR,format_photo_3 VARCHAR,serie_photo_3 VARCHAR,colors_photo_3 VARCHAR,id_photo_3 VARCHAR,logo_id VARCHAR,address_italy VARCHAR,city_italy VARCHAR,state_italy VARCHAR,country_italy VARCHAR,telephone_italy VARCHAR,email_italy VARCHAR,postal_code_italy VARCHAR,company_type VARCHAR,latitude VARCHAR,longitude VARCHAR,favorited NUMERIC) ";  
                                 
                                 transaction.executeSql(sql);
                                 },errorCB, successCB1);
								 
					},1000);
		
    }
};


function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}

function successCB1() {
   console.log("DB creation success!");
	//initDB();
	
	if(localStorage.insertedData==undefined || localStorage.insertedData==null || localStorage.insertedData==""){
					
					
					localStorage.setItem("insertedData",1);
					
					
										
													 
				
							 $.getJSON("companies.json",function(data){
          
								  // alert(data.length);
								  for (var i=0; i<data.length; i++) {
								  var row = data[i];
								  tempcompanies[i]= row;
								  
								  }			
											// alert(tempcompanies[i].company_id);
											insQuery="INSERT INTO companies (company_id, full_name,short_name,initial,address_spain,code_spain,city_spain,state_spain,country_spain,telephone_spain,email_spain,fax_spain,website,hall,stand,coord_x,coord_y,mr_ms,manager,company_italy,person_italy,products,novelties,collection_photo_1,format_photo_1,serie_photo_1,colors_photo_1,id_photo_1,collection_photo_2,format_photo_2,serie_photo_2,colors_photo_2,id_photo_2,collection_photo_3,format_photo_3,serie_photo_3,colors_photo_3,id_photo_3,logo_id,address_italy,city_italy,state_italy,country_italy,telephone_italy,email_italy,postal_code_italy,company_type,latitude,longitude,favorited) VALUES (";
											var result="";
						mydb = openDatabase(shortName, version, displayName, maxSize);					 
						mydb.transaction(
							function(transaction) {
														 	  
								for (var i=0; i<tempcompanies.length; i++) {
												 result=tempcompanies[i].company_id+",'"+tempcompanies[i].full_name+"', '"+tempcompanies[i].short_name+"', '"+tempcompanies[i].initial+"', '"+tempcompanies[i].address_spain+"', '"+tempcompanies[i].code_spain+"', '"+tempcompanies[i].city_spain+"', '"+tempcompanies[i].state_spain+"', '"+tempcompanies[i].country_spain+"', '"+tempcompanies[i].telephone_spain+"', '"+tempcompanies[i].email_spain+"', '"+tempcompanies[i].fax_spain+"', '"+tempcompanies[i].website+"', "+tempcompanies[i].hall+", '"+tempcompanies[i].stand+"', "+tempcompanies[i].coord_x+", "+tempcompanies[i].coord_y+", '"+tempcompanies[i].mr_ms+"', '"+tempcompanies[i].manager+"', '"+tempcompanies[i].company_italy+"', '"+tempcompanies[i].person_italy+"','"+tempcompanies[i].products+"', '"+tempcompanies[i].novelties+"', '"+tempcompanies[i].collection_photo_1+"', '"+tempcompanies[i].format_photo_1+"', '"+tempcompanies[i].serie_photo_1+"', '"+tempcompanies[i].colors_photo_1+"', '"+tempcompanies[i].id_photo_1+"', '"+tempcompanies[i].collection_photo_2+"', '"+tempcompanies[i].format_photo_2+"', '"+tempcompanies[i].serie_photo_2+"', '"+tempcompanies[i].colors_photo_2+"', '"+tempcompanies[i].id_photo_2+"', '"+tempcompanies[i].collection_photo_3+"', '"+tempcompanies[i].format_photo_3+"', '"+tempcompanies[i].serie_photo_3+"', '"+tempcompanies[i].colors_photo_3+"', '"+tempcompanies[i].id_photo_3+"', '"+tempcompanies[i].logo_id+"', '"+tempcompanies[i].address_italy+"', '"+tempcompanies[i].city_italy+"', '"+tempcompanies[i].state_italy+"', '"+tempcompanies[i].country_italy+"', '"+tempcompanies[i].telephone_italy+"', '"+tempcompanies[i].email_italy+"', '"+tempcompanies[i].postal_code_italy+"', "+tempcompanies[i].company_type+", "+tempcompanies[i].latitude+", "+tempcompanies[i].longitude+", "+tempcompanies[i].favorited;
											 
											
											sqlQuery=insQuery+result+")";
																// console.log(sqlQuery);
																													
											transaction.executeSql(sqlQuery);
											
											}//end of for loop
										}, errorHandler,succesInsert);//mydb
													
														
									
												 
						});//End of getjson				
					
					}else{
					initDB();
					}
}
	
	
	function succesInsert(){
	
	console.log("insert success");
	initDB();
	}					
	
	



/******************************  MODEL *******************************************/
var filter_selected= '#subitem1';
var filter_map_selected='generalMapItem';
var mydb=false;
var companies = []; 
var companyInfoJson="";

var arrangeFavorite="initial";
var orderFlag="ASC";
var webURL="";
var googlemapURL="";
var ref ="";
var scrollPoint=0;

var hallArr=[14,15,16,18,19,20,21,22,25,26,30,33,34,36,44,45]
var currentMapId=0;
var valid = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
var entries;
var chkValid=0;

var messageToShare;
var imageURLToShare;



// initialise the database
initDB = function() {
    try { 
        if (!window.openDatabase) { 
            alert('not supported'); 
        } else { 
            var shortName = 'ascer'; 
            var version = '1.0'; 
            var displayName = 'ASCER Database'; 
            var maxSize = 200000; // in bytes 
            mydb = openDatabase(shortName, version, displayName, maxSize);
            
            try {
				
				//document.addEventListener("backbutton", backbuttonPressFunction, false);


				
                mydb.transaction(
                                 function(transaction) {
                                 
                                 var sql = "UPDATE companies SET stand = 'C35' " +
                                 "WHERE company_id = 14838";  
                                 
                                 transaction.executeSql(sql, null, null, errorHandler);
                                 });
				
				
				mydb.transaction(
                                 function(transaction) {
                                 
                                 var sql = "UPDATE companies SET stand = 'E19-F20',coord_x = '490',coord_y='280' " +
                                 "WHERE company_id = 16799";  
                                 
                                 transaction.executeSql(sql, null, null, errorHandler);
                                 });
				
                
            } catch(e) {
                alert(e.message);
            }    
            
			filter_selected=localStorage.getItem("filter_selected");
			if(filter_selected==null || filter_selected=="undefined" || filter_selected=="")
			{ 
				$("#subitem1 a").css("color","#fff");
				$(filter_selected).addClass('subitem-hover');
				filter_selected= '#subitem1';
			}
			else{
				//alert(filter_selected.replace("#",""));
				 
				changeFilter(filter_selected.replace("#",""));
				}
			
			if(localStorage.getItem("lastScroll")!=undefined)
			{
				var scrollPoint1=parseInt(localStorage.getItem("lastScroll"))-300;
				$('.slider-content').stop().animate({scrollTop: '+=' + scrollPoint1 + 'px'});
			}
			
            findByName("");
        }
    } catch(e) { 
        // Error handling code goes here. 
        if (e == INVALID_STATE_ERR) { 
            // Version number mismatch. 
            alert("Invalid database version."); 
        } else { 
            alert("Unknown error "+e+"."); 
        } 
        return; 
    } 
};

// db error handler - prevents the rest of the transaction going ahead on failure
errorHandler = function (transaction, error) { 
    // returns true to rollback the transaction
    return true;  
} 

// null db data handler
nullDataHandler = function (transaction, results) { } 


function alertDismissed() {
    // hacer algo
}


backbuttonPressFunction=function(){
	
	window.location.href="index.html";
	
};

// callback function to retrieve the data from the prefs table
companiesDataHandler=function(transaction, results) {
    
    // Handle the results 
    companies = [];  
    // alert(results.rows.length);  
	setTimeout(function(){
						
						 for (var i=0; i<results.rows.length; i++) { 
        var row = results.rows.item(i); 
        companies[i]= row;
    } 
	
   
           
    $('#slider').sliderNav();
	
	},100);
    
}

// callback function to retrieve the data from the prefs table
companiesFavouritesDataHandler=function(transaction, results) {
    
    // Handle the results 
    
    companies = [];  
    
    //alert(results.rows.length);
    setTimeout(function(){
						
						for (var i=0; i<results.rows.length; i++) { 
        var row = results.rows.item(i); 
        companies[i]= row;
    } 
    
    $('#slider').sliderNavFavourites();
	
						},1000)
    
    
}

companySelectedDataHandler=function(transaction, results) {
        
    var row = results.rows.item(0); 
   
    loadCompany(row);       
}

// callback function to retrieve the data from the prefs table
hallDataHandler=function(transaction, results) {
    
    // Handle the results 
    
    companies = [];  
    
    //alert(results.rows.length);
    
    for (var i=0; i<results.rows.length; i++) { 
        var row = results.rows.item(i); 
        companies[i]= row;
        
        var generalMap= $('#pavilion'+row.hall+'Map');
		//alert(row.favorited);
		//*********************************************************************************//
		var pos_x=row.coord_x;
		var pos_y=row.coord_y;        
		
		if(row.hall == 26){
			pos_y= (parseInt(row.coord_y)*1)+(i*-38); // RESTO 235 para el pabellon 14, ver si la resta lo hace igual
			pos_x = row.coord_x * 1.01; //RESTO 30 para el pabellon 14, ver si la resta lo hace igual
			pos_y += 20;
		}else if(row.hall == 25){
			//IMPORTANTE REVISAR SI ESTO FUNCIONA EN TODOS LOS CASOS
			pos_y= (parseInt(row.coord_y)*2)+(i*-36); // RESTO 235 para el pabellon 14, ver si la resta lo hace igual
			pos_x = row.coord_x;//RESTO 30 para el pabellon 14, ver si la resta lo hace igual
			pos_x=pos_x*1.01
			pos_y -= 40;
		}else{
		//IMPORTANTE REVISAR SI ESTO FUNCIONA EN TODOS LOS CASOS
			pos_y= parseInt(row.coord_y)+(i*-36); // RESTO 235 para el pabellon 14, ver si la resta lo hace igual
			pos_x = row.coord_x; //RESTO 30 para el pabellon 14, ver si la resta lo hace igual
		}
		
		pos_y -= 25;
		pos_x -= 20;

		/*if(row.hall == 14){
			pos_y -= 205;
			pos_x -= 10;

		}*/
        //*********************************************************************************//
        
        $(generalMap).append('<div style = "left: '+pos_x+'px; position: relative; top: '+pos_y+'px; width: 37px; height: 36px;"><a href="#" onclick="gotoCompanyFromMap('+row.company_id+')"><div class="hotpot"></div></a><div id="stand_name">'+row.short_name+'</div></div>');

		if(row.favorited==1)
		{
			$(".hotpot").html("<img src='star-big.png' style='padding:7px 0px 0px 8px;width:20px;height:20px' />");
		}
    } 
    
}


// load the currently selected icons
findByName= function(key) {
    try {
        mydb.transaction(
                         function(transaction) {
                         
                         var sql = "SELECT * " +
                         "FROM companies " +
                         "WHERE short_name LIKE ? " +
                         "ORDER BY initial ASC";
                         
                         if(filter_selected == '#subitem2'){
                            sql = "SELECT * " +
                            "FROM companies " + 
                            "WHERE short_name LIKE ? AND company_type=1 " +
                            "ORDER BY initial ASC";
                         }else if(filter_selected == '#subitem3'){
                            sql = "SELECT * " +
                            "FROM companies " +
                            "WHERE short_name LIKE ? AND company_type=2 " +
                            "ORDER BY initial ASC";
                         }else if(filter_selected == '#subitem4'){
                            sql = "SELECT * " +
                            "FROM companies " +
                            "WHERE short_name LIKE ? AND company_type=3 " +
                            "ORDER BY initial ASC";
                         }
                         
						// console.log("query-----------"+sql);
						 
                         transaction.executeSql(sql, ['%' + key + '%'], companiesDataHandler, errorHandler);
                         });
        
    } catch(e) {
        alert(e.message);
    }    
};

getFavourites= function() {
    
    initDB();
    
    try {
        mydb.transaction(
                         function(transaction) {
                         
                         var sql = "SELECT * " +
                         "FROM companies " +
                         "WHERE favorited = 1 " +
                         "ORDER BY "+arrangeFavorite+" "+orderFlag+"";                         
                         
                         transaction.executeSql(sql, [], companiesFavouritesDataHandler, errorHandler);
                         });
        
    } catch(e) {
        alert(e.message);
    }    
};

getCompanyById= function(id_company) {
    
    initDB();
        
    try {
        mydb.transaction(
                         function(transaction) {
                         
                         var sql = "SELECT * " +
                         "FROM companies " +
                         "WHERE company_id = "+id_company;     
                         
                         transaction.executeSql(sql, [], companySelectedDataHandler, errorHandler);
                         });
        
    } catch(e) {
        alert(e.message);
    }    
};

findByHall= function(hall) {
    //alert(hall);
    try {
        mydb.transaction(
                         function(transaction) {
                         
                         var sql = "SELECT * " +
                         "FROM companies " +
                         "WHERE hall = "+hall;
                         
                         transaction.executeSql(sql, [], hallDataHandler, errorHandler);
                         });
        
    } catch(e) {
        alert(e.message);
    }    
};

/*! If a deletion resulted in a change in the list of files, redraw the "Choose a file" pane. */
function UpdateResults(transaction, results)
{
    if (results.rowsAffected) {
    }
}


favorited= function(id_company) {
    
    var current_class= document.getElementById("star_"+id_company).className; 
    
    var sql = "UPDATE companies SET favorited = 1 " +
    "WHERE company_id = "+id_company;

    
    if(current_class == "favorited"){
        Change_Class("star_"+id_company, "no-favorited");  
        sql = "UPDATE companies SET favorited = 0 " +
        "WHERE company_id = "+id_company;
    }else if(current_class == "favorited-company"){
        Change_Class("star_"+id_company, "no-favorited-company");  
        sql = "UPDATE companies SET favorited = 0 " +
        "WHERE company_id = "+id_company;
    }else if(current_class == "favorited-favourites"){
        Change_Class("star_"+id_company, "no-favorited-favourites");  
        sql = "UPDATE companies SET favorited = 0 " +
        "WHERE company_id = "+id_company;
    }else if(current_class == "no-favorited-company"){
        Change_Class("star_"+id_company, "favorited-company");  
    }else{
        Change_Class("star_"+id_company, "favorited");   
    }    
    
    try {
        mydb.transaction(
                         function(transaction) {   
                         
                         transaction.executeSql(sql, [], UpdateResults, errorHandler);
                         });
        
    } catch(e) {
        alert(e.message);
    }  

    

};


$("#buttonList").live("click",function(){
									  // alert("click");
									  setTimeout(function(){
														  
														  findByName("");
														  
														  },100)
		 
});


$(".hallItem .textSubmenu a").live("click",function(){
                                   $("#secondaryMenuMap .textSubmenu a").removeClass("curr_hall");
                                   //alert($(this).css("color"))
                                   $(this).addClass("curr_hall");
                                   });


search= function() {
    
    var key = $('.search-key').val();
    
    if(key == ''){
        $('#leftAlphabetic').css('display','block');
        if(navigator.userAgent.match(/iPhone/i)){
            $('.slider-content').css('left','30px');
        }else if(navigator.userAgent.match(/iPad/i)) {
            $('.slider-content').css('left','50px');
        }else{
           $('.slider-content').css('left','30px');        
        }
        
        
    }else{
        $('#leftAlphabetic').css('display','none');
        $('.slider-content').css('left','0px');
    }

    findByName(key);
};

changeFilter = function(element){
    var current_filer='#'+element;
	
	//$("[id*='subitem']").css("color","#4f5560");
	//alert(current_filer);
	
    if(current_filer == "#subitem1"){
        $("#subitem1 a").css("color","#fff");
        $("#subitem2 a").css("color","#4f5560");
        $("#subitem3 a").css("color","#4f5560");
        $("#subitem4 a").css("color","#4f5560");
    }else{
        $("#subitem1 a").css("color","#4f5560");
        $("#subitem2 a").css("color","#4f5560");
        $("#subitem3 a").css("color","#4f5560");
        $("#subitem4 a").css("color","#4f5560");
        $(""+current_filer+" a").css("color","#fff");
    }
    
    if(filter_selected != current_filer){
        $(filter_selected).removeClass('subitem-hover');
        filter_selected=current_filer;
        $(filter_selected).addClass('subitem-hover');
    }
    
	localStorage.setItem("filter_selected",filter_selected);
    search();
};


gotoCompanyFromList = function(company_id){
//alert("in"+scrollPoint);
localStorage.setItem("lastScroll",scrollPoint);

    window.location.href = "company.html?id="+company_id+"-index";
    
}

gotoCompanyFromFavouriteList = function(company_id){
	
    window.location.href = "company.html?id="+company_id+"-favourite_list";
    
}

gotoCompanyFromMap = function(company_id){
    
    window.location.href = "company.html?id="+company_id+"-map";
    
}


goToMapFromExterna = function(element){
            
    window.location.href = "map.html?id="+element; 
    
};



gotoMap = function(element) {
	
    $("#secondaryMenuMap .textSubmenu a").removeClass("curr_hall");
    //alert($(this).css("color"))
    $("#"+element+" div a").addClass("curr_hall");
    
    var current_filer='#'+element;
    if(filter_map_selected != current_filer){
            
        $(filter_map_selected).removeClass('subitem-hover');
        $(filter_map_selected).removeClass('subitem-hover-bajo');
        var class_name= 'subitem-hover';
            switch(parseInt(element)){
                
                case 29:
                case 30:
                case 33:
                case 34:
                case 35:
                case 36:
                case 44:
                case 45:
                    class_name = 'subitem-hover-bajo'
                break;                
            }            
        
        
        filter_map_selected=current_filer;
        $(filter_map_selected).addClass(class_name);

        var mapContainer= $('#mapContainer');
        $(mapContainer).empty();
    
        if(element == "generalMapItem"){
            $(mapContainer).append('<div id="mapHeader" >Hall General</div>');
        }
        else{
            $(mapContainer).append('<div id="mapHeader" >Hall '+element+'</div>');
        }

        
        var leftMap= $('#leftMap');	
        var height = $(leftMap).height();
        $('#mapContainer').css('height',height);


        if(element == "generalMapItem"){
            loadGeneralMap();
        }else{
            
            var entryExit= "";
            
            
            if(element==14)
            {
                entryExit="<div style='position:absolute;left: 672px;top: 391px;'><a  href='#' onclick='gotoMap(16)' class='' style='padding:8px 21px'></a></div><div style='position:absolute;left: 128px;top: 544px;'><a  href='#' onclick='gotoMap(15)' class='' style='padding:8px 21px'></a></div><div style='position:absolute;left: 446px;top: 527px;'><a  href='#' onclick='gotoMap(19)' class='' style='padding:8px 21px'></a></div>"
            }else if(element==15)
            {
                entryExit="<div style='position:absolute;left: 624px;top: 430px;'><a  href='#' onclick='gotoMap(18)' class='' style='padding:8px 21px'></a></div><div style='position:absolute;left: 88px;top: 536px;'><a  href='#' onclick='gotoMap(14)' class='' style='padding:8px 21px'></a></div><div style='position:absolute;left: 396px;top: 527px;'><a  href='#' onclick='gotoMap(20)' class='' style='padding:8px 21px'></a></div>"
            }else if(element==16)
            {
                entryExit="<div style='position:absolute;left: 662px;top: 60px;'><a  href='#' onclick='gotoMap(44)' class='' style='padding:8px 21px'></a></div><div style='position:absolute;left: 414px;top: 819px;'><a  href='#' onclick='gotoMap(14)' class='' style='padding:8px 21px'></a></div><div style='position:absolute;left: 503px;top: 354px;'><a  href='#' onclick='gotoMap(18)' class='' style='padding:8px 21px'></a></div>"
            }else if(element==18)
            {
                entryExit="<div style='position:absolute;left: 530px;top: 79px;'><a  href='#' onclick='gotoMap(15)' class='' style='padding:8px 21px'></a></div><div style='position:absolute;left: 280px;top: 810px;'><a  href='#' onclick='gotoMap(16)' class='' style='padding:8px 21px'></a></div>"
            }else if(element==19)
            {
                entryExit="<div style='position:absolute;left: 432px;top: 223px;'><a  href='#' onclick='gotoMap(20)' class='' style='padding:8px 21px'></a></div><div style='position:absolute;left: 128px;top: 540px;'><a  href='#' onclick='gotoMap(22)' class='' style='padding:8px 21px'></a></div>"
            }else if(element==20)
            {
                entryExit="<div style='position:absolute;left: 405px;top: 195px;'><a  href='#' onclick='gotoMap(19)' class='' style='padding:8px 21px'></a></div>"
            }else if(element==21)
            {
                entryExit="<div style='position:absolute;left: 258px;top: 161px;'><a  href='#' onclick='gotoMap(16)' class='' style='padding:8px 21px'></a></div><div style='position:absolute;left: 258px;top: 380px;'><a  href='#' onclick='gotoMap(22)' class='' style='padding:8px 21px'></a></div>"
            }else if(element==22)
            {
                entryExit="<div style='position:absolute;left: 249px;top: 739px;'><a  href='#' onclick='gotoMap(21)' class='' style='padding:8px 21px'></a></div><div style='position:absolute;left: 249px;top: 975px;'><a  href='#' onclick='gotoMap(16)' class='' style='padding:8px 21px'></a></div>"
            }else if(element==25)
            {
                entryExit="<div style='position:absolute;left: 104px;top: 620px;'><a  href='#' onclick='gotoMap(26)' class='' style='padding:8px 21px'></a></div>"
            }else if(element==26)
            {
                entryExit="<div style='position:absolute;left: 278px;top: 662px;'><a  href='#' onclick='gotoMap(25)' class='' style='padding:8px 21px'></a></div>"
            }
            else if(element==33)
            {
                entryExit="<div style='position:absolute;left:415px;top: 356px;'><a  href='#' onclick='gotoMap(34)' class='' style='padding:8px 21px'></a></div>"
            }
            else if(element==34)
            {
                entryExit="<div style='position:absolute;left:415px;top: 356px;'><a  href='#' onclick='gotoMap(33)' class='' style='padding:8px 21px'></a></div>"
            }else if(element==36)
            {
                entryExit="<div style='position:absolute;left:604px;top: 576px;'><a  href='#' onclick='gotoMap(25)' class='' style='padding:8px 21px'></a></div><div style='position:absolute;left:624px;top: 576px;'><a  href='#' onclick='gotoMap(26)' class='' style='padding:8px 21px'></a></div>"
            }else if(element==44)
            {
                entryExit="<div style='position:absolute;left:634px;top: 139px;'><a  href='#' onclick='gotoMap(21)' class='' style='padding:8px 21px'></a></div><div style='position:absolute;left:329px;top: 159px;'><a  href='#' onclick='gotoMap(26)' class='' style='padding:8px 21px'></a></div><div style='position:absolute;left:633px;top: 713px;'><a  href='#' onclick='gotoMap(21)' class='' style='padding:8px 21px'></a></div>"
            }else if(element==45)
            {
                entryExit="<div style='position:absolute;left:436px;top: 919px;'><a  href='#' onclick='gotoMap(26)' class='' style='padding:8px 21px'></a></div>"
            }else
            {
                entryExit="";
            }
            
            
            $(mapContainer).append('<div id="pavilion'+element+'Map" class="">'+entryExit+'</div>');
                  
			if(element==14)
			{
//				$("#prev").hide();
//				$("#next").show();
			}
			if(element==45)
			{
//				$("#next").hide();
//				$("#prev").show();
			}
			if(element<45 && element>14)
			{
//				$("#prev").show();
//				$("#next").show();
            }
			
			currentMapId=hallArr.indexOf(element);
			
            findByHall(element);
			
        }
    }
};


Change_Class = function (My_Element, My_Class) { 
    document.getElementById(My_Element).setAttribute("class", My_Class); 
};

loadGeneralMap= function() {
    
    var mapContainer= $('#mapContainer');
    //$(mapContainer).append('<div id="mapHeader" >General Hall</div>');
    
    
    $(mapContainer).append('<div id="generalMap" class=""></div>');
    
    
    
    
//    var generalMap= $('#generalMap');
//    $(generalMap).append('<div id="hall15Container"><a href="#" onclick="gotoMap(15)"  onmouseout="Change_Class(\'hall15\',\'hotpot\')"><div id="hall15" class="hotpot"></div></a></div>');
//    $(generalMap).append('<div id="hall20Container"><a href="#" onclick="gotoMap(20)" onmouseout="Change_Class(\'hall20\',\'hotpot\')"><div id="hall20" class="hotpot"></div></a></div>');
//    $(generalMap).append('<div id="hall14Container"><a href="#" onclick="gotoMap(14)"  onmouseout="Change_Class(\'hall14\',\'hotpot\')"><div id="hall14" class="hotpot"></div></a></div>');
//	$(generalMap).append('<div id="hall16Container"><a href="#" onclick="gotoMap(16)"  onmouseout="Change_Class(\'hall16\',\'hotpot\')"><div id="hall16" class="hotpot"></div></a></div>');
//    $(generalMap).append('<div id="hall18Container"><a href="#" onclick="gotoMap(18)"  onmouseout="Change_Class(\'hall18\',\'hotpot\')"><div id="hall18" class="hotpot"></div></a></div>');
//	
//    $(generalMap).append('<div id="hall19Container"><a href="#" onclick="gotoMap(19)"  onmouseout="Change_Class(\'hall19\',\'hotpot\')"><div id="hall19" class="hotpot"></div></a></div>');
//    $(generalMap).append('<div id="hall21Container"><a href="#" onclick="gotoMap(21)"  onmouseout="Change_Class(\'hall21\',\'hotpot\')"><div id="hall21" class="hotpot"></div></a></div>');
//    $(generalMap).append('<div id="hall22Container"><a href="#" onclick="gotoMap(22)"  onmouseout="Change_Class(\'hall22\',\'hotpot\')"><div id="hall22" class="hotpot"></div></a></div>');
//    $(generalMap).append('<div id="hall25Container"><a href="#" onclick="gotoMap(25)" onmouseout="Change_Class(\'hall25\',\'hotpot\')"><div id="hall25" class="hotpot"></div></a></div>');
//    $(generalMap).append('<div id="hall26Container"><a href="#" onclick="gotoMap(26)" onmouseout="Change_Class(\'hall26\',\'hotpot\')"><div id="hall26" class="hotpot"></div></a></div>');
//    $(generalMap).append('<div id="hall34Container"><a href="#" onclick="gotoMap(34)" onmouseout="Change_Class(\'hall34\',\'hotpot\')"><div id="hall34" class="hotpot"></div></a></div>');
//    $(generalMap).append('<div id="hall36Container"><a href="#" onclick="gotoMap(36)"  onmouseout="Change_Class(\'hall36\',\'hotpot\')"><div id="hall36" class="hotpot"></div></a></div>');
//    $(generalMap).append('<div id="hall44Container"><a href="#" onclick="gotoMap(44)"  onmouseout="Change_Class(\'hall44\',\'hotpot\')"><div id="hall44" class="hotpot"></div></a></div>');
//    $(generalMap).append('<div id="hall45Container"><a href="#" onclick="gotoMap(45)"  onmouseout="Change_Class(\'hall45\',\'hotpot\')"><div id="hall45" class="hotpot"></div></a></div>');
//    $(generalMap).append('<div id="hall30Container"><a href="#" onclick="gotoMap(30)"  onmouseout="Change_Class(\'hall30\',\'hotpot\')"><div id="hall30" class="hotpot"></div></a></div>');
//    $(generalMap).append('<div id="hall33Container"><a href="#" onclick="gotoMap(33)"  onmouseout="Change_Class(\'hall33\',\'hotpot\')"><div id="hall33" class="hotpot"></div></a></div>');

    var generalMap= $('#generalMap');
    $(generalMap).append('<div id="hall15Container"><a href="#" onclick="gotoMap(15);Change_Class(\'hall15\',\'hotpot\');"><div id="hall15" class="hotpot"></div></a></div>');
    $(generalMap).append('<div id="hall20Container"><a href="#" onclick="gotoMap(20);Change_Class(\'hall20\',\'hotpot\');"><div id="hall20" class="hotpot"></div></a></div>');
    $(generalMap).append('<div id="hall14Container"><a href="#" onclick="gotoMap(14);Change_Class(\'hall14\',\'hotpot\');"><div id="hall14" class="hotpot"></div></a></div>');
	$(generalMap).append('<div id="hall16Container"><a href="#" onclick="gotoMap(16);Change_Class(\'hall16\',\'hotpot\');"><div id="hall16" class="hotpot"></div></a></div>');
    $(generalMap).append('<div id="hall18Container"><a href="#" onclick="gotoMap(18);Change_Class(\'hall18\',\'hotpot\');"><div id="hall18" class="hotpot"></div></a></div>');
	
    $(generalMap).append('<div id="hall19Container"><a href="#" onclick="gotoMap(19);Change_Class(\'hall19\',\'hotpot\');"><div id="hall19" class="hotpot"></div></a></div>');
    $(generalMap).append('<div id="hall21Container"><a href="#" onclick="gotoMap(21);Change_Class(\'hall21\',\'hotpot\');"><div id="hall21" class="hotpot"></div></a></div>');
    $(generalMap).append('<div id="hall22Container"><a href="#" onclick="gotoMap(22);Change_Class(\'hall22\',\'hotpot\');"><div id="hall22" class="hotpot"></div></a></div>');
    $(generalMap).append('<div id="hall25Container"><a href="#" onclick="gotoMap(25);Change_Class(\'hall25\',\'hotpot\');"><div id="hall25" class="hotpot"></div></a></div>');
    $(generalMap).append('<div id="hall26Container"><a href="#" onclick="gotoMap(26);Change_Class(\'hall26\',\'hotpot\');"><div id="hall26" class="hotpot"></div></a></div>');
    $(generalMap).append('<div id="hall34Container"><a href="#" onclick="gotoMap(34);Change_Class(\'hall34\',\'hotpot\');"><div id="hall34" class="hotpot"></div></a></div>');
    $(generalMap).append('<div id="hall36Container"><a href="#" onclick="gotoMap(36);Change_Class(\'hall36\',\'hotpot\');"><div id="hall36" class="hotpot"></div></a></div>');
    $(generalMap).append('<div id="hall44Container"><a href="#" onclick="gotoMap(44);Change_Class(\'hall44\',\'hotpot\');"><div id="hall44" class="hotpot"></div></a></div>');
    $(generalMap).append('<div id="hall45Container"><a href="#" onclick="gotoMap(45);Change_Class(\'hall45\',\'hotpot\');"><div id="hall45" class="hotpot"></div></a></div>');
    $(generalMap).append('<div id="hall30Container"><a href="#" onclick="gotoMap(30);Change_Class(\'hall30\',\'hotpot\');"><div id="hall30" class="hotpot"></div></a></div>');
    $(generalMap).append('<div id="hall33Container"><a href="#" onclick="gotoMap(33);Change_Class(\'hall33\',\'hotpot\');"><div id="hall33" class="hotpot"></div></a></div>');



			mydb.transaction(
					 function(transaction)
					 {
						var sql="SELECT hall FROM companies where favorited=1" ;
						
						transaction.executeSql(sql, [], listFavoriteSuccess, errorHandler);
					 }
					 );

};

listFavoriteSuccess=function(tx, results) {
   // console.log("Returned rows = " + results.rows.length);
    // this will be true since it was a select statement and so rowsAffected was 0
    if (!results.rowsAffected) {
        console.log('No rows affected!');
        return false;
    }
   
   setTimeout(function(){
					   
   for (var i=0; i<results.rows.length; i++) { 
		var row = results.rows.item(i); 
		//console.log("----"+row.hall);
		//companies[i]= row;
		$("#hall"+row.hall).html("<img src='star-big.png' style='padding:7px 0px 0px 8px;width:20px;height:20px' />");
	} 
   
   },1000);   
   
};


listEmailFavoriteSuccess=function(tx, results) {
    //alert("share");
    // console.log("Returned rows = " + results.rows.length);
    // this will be true since it was a select statement and so rowsAffected was 0
    if (!results.rowsAffected) {
        console.log('No rows affected!');
        return false;
    }
    var content="[";
    var data="";
    setTimeout(function(){
               
               for (var i=0; i<results.rows.length; i++) {
               var row = results.rows.item(i);
               //console.log("----"+row.hall);
               //companies[i]= row;
               var type_comp= 'Others';
               if(row.company_type == '1'){
               type_comp= 'Ceramic tiles';
               }else if(row.company_type == '2'){
               type_comp= 'Sanitaryware';
               }
               
               data=data+'{"Header":"'+row.short_name+'","Type":"'+type_comp+'","Hall":"'+row.hall+'","Stand":"'+row.stand+'"}';
               if(i!=results.rows.length-1)
               {
               data=data+",";
               }
               
               }
               content=content+data+"]";
               
               entry=$("#toEmail").val();
			   entry1=$("#fromEmail").val();
			   
            
			  
			   var url ="http://indecortech.com/developpradeep/cersaie/sendEmail.php?Flag=2&ToEmail="+entry+"&FromEmail="+entry1+"&EmailBody="+content;
               
        
               $.getJSON(url,function(data){
                         //alert(data.Message);		
                         alert("Favorite list sent successfully.");	
						 $('#emailForm').bPopup().close();
						 $("#toEmail").val("");
						 $("#fromEmail").val("");
                         });
               
               
               },1000);
    
    
    
    
};


$("#share").live("click",function(){	
	
	$('#emailForm').bPopup();					 

});


$("#sendfavorite").live("click",function(){
	
	entry=$("#toEmail").val();
	entry1=$("#fromEmail").val();
		
	if(chkemail(entry) && chkemail(entry1))
	{
		
		mydb.transaction(
					 function(transaction)
					 {
						var sql="SELECT * FROM companies where favorited=1" ;
						
						transaction.executeSql(sql, [], listEmailFavoriteSuccess, errorHandler);
					 }
					 );
		
	}
	else
	{
		alert("Please check all the email entries!!!");
	}
	
	
});

$("#sendButton").live("click",function(){
	
	entry=$("#toEmail").val();
	entry1=$("#fromEmail").val();
	
	if(chkemail(entry) && chkemail(entry1))
	{
				
		var url ="http://indecortech.com/developpradeep/cersaie/sendEmail.php?Flag=1&ToEmail="+entry+"&FromEmail="+entry1+"&EmailBody="+companyInfoJson;
                      
                      
                      
		//alert(url)
                      console.log(url);
		$.getJSON(url,function(data){
			 //+data.Message
			 alert("Data sheet sent successfully.");
			 $('#emailForm').bPopup().close();
			 $("#toEmail").val("");
						 $("#fromEmail").val("");
		 });
		
	}
	else
	{
		alert("Please check all the email entries!!!");
	}
	
	
});


$("#sendbyemail").live("click",function(){
		$('#emailForm').bPopup();                   
                       
});

$("#cancel").live("click",function(){
	$('#emailForm').bPopup().close();
});


$("#byName").live("click",function(){
	  // alert("in name");
	  $('.slider-content ul').empty();
	  if(orderFlag=="ASC")
		{
			orderFlag="DESC";
		}else
		{
			orderFlag="ASC";
		}
		
	   arrangeFavorite="short_name";
	   getFavourites(); 	
});

$("#byHall").live("click",function(){
		//alert("in hall");
		$('.slider-content ul').empty();
		if(orderFlag=="ASC")
		{
			orderFlag="DESC";
		}else
		{
			orderFlag="ASC";
		}
		arrangeFavorite="hall";
		
	   getFavourites(); 	
});




openWeb=function(){
	//alert(webURL);
	window.open(webURL,'_blank','location=yes');
    //alert("done");
    
};
//openOtherWeb


openOtherWeb=function(url){
    if(url == 1){
        webURL = "http://www.spaintiles.info/default.aspx?&lang=en-GB";
        openWeb();
    }
    else if(url == 2){
        webURL = "http://www.ascer.es/homeinstitucional/default.aspx?lang=en-GB";
        openWeb();
    }
    else if(url == 3){
        webURL = "http://www.icex.es";
        openWeb();
    }
    else if(url == 4){
        webURL = "http://europa.eu/index_en.htm";
        openWeb();
    }
    else if(url == 5){
        webURL = "http://www.aseban.com";
        openWeb();
    }
    else if(url == 6){
        webURL = "http://www.ceraspana.es";
        openWeb();
    }
    else if(url == 7){
        webURL = "http://www.spaintiles.info";
        openWeb();
    }
    
    
//    alert(url);
//    
//    //url = "http://www.google.com";
//	window.open(url,'_blank','location=yes');
};

//function openOtherWeb(logoWebURL){
//    window.open(logoWebURL,'_blank','location=yes');
//}



openGoogleLink=function(){
//	alert("in"+googlemapURL);
	window.open(googlemapURL, '_blank', 'location=yes');
}
	
	
loadCompany = function(company_selected){
    
   // console.log(company_selected.logo_id.replace(" ",""));
  var hall="",stand="",short_name="",contenido_novelties="",contenido_products="",manager="", url_google="";
    
    
    
    
    //alert(company_selected.logo_id.replace(" ",""));
    if(origen == 'map'){
        $('#mainMenu').append('<a id="buttonBack" href="'+origen+'.html?hall='+company_selected.hall+'">BACK</a>');
    }else{
        $('#mainMenu').append('<a id="buttonBack" href="'+origen+'.html">BACK</a>');
    }
    $('#mainMenu').append('<div id="ascerLogo"></div>');
   
    
    var contenedor = '#first_left';
    var classFavorited="no-favorited-company";
    var functionVar= "favorited("+company_selected.company_id+")";
    
    if(company_selected.favorited==1){
        classFavorited="favorited-company";
    }
    
    //$('#company_information').append('<div id="location_content"></div>');
	
    
    $('#location_content').append('<div id="icon-map"></div>');
    $('#location_content').append('<a href="#" onclick="goToMapFromExterna('+company_selected.hall+')"><div id="hall_title"> Hall '+company_selected.hall+'</div></a>');
    $('#location_content').append('<div id="stand_title" > Stand '+company_selected.stand+'</div><div id="star_container"><a href="#" onClick="'+functionVar+'"><div id="star_'+company_selected.company_id+'" class="'+classFavorited+'"></div></a></div><div id="logo_company"><img src="css/images/logo/'+company_selected.logo_id+'"/></div>');
    
    //$(contenedor).append('<div id="logo_company"><img src="css/images/logo/'+company_selected.logo_id.replace(" ","").toUpperCase()+'"/></div>');  
    
  
    //$(contenedor).append('<div id="star_container"><a href="#" onClick="'+functionVar+'"><div id="star_'+company_selected.company_id+'" class="'+classFavorited+'"></div></a></div>');
    
    hall=company_selected.hall;
    stand=company_selected.stand;
    logo_id=company_selected.logo_id;
    
    $('#mainMenu').append('<div id="secondaryMenu"><div id="subitem_company" class="subitem-hover"></div></div>');    
    $('#subitem_company').append('<div class="textSubmenu_company submenu-font-company"> '+company_selected.short_name+' </div>');
 
    
    short_name=company_selected.short_name;
    
    //var contenido_novelties= company_selected.novelties;    
    var contenido_products= company_selected.products;    
    
    if(contenido_novelties != null && contenido_novelties != ''){
        $('#first_left').append('<div id="novelties_title" class="section_title">Novelties</div>');
        //$('#first_left').append('<div id="description_content">'+contenido_novelties+'</div>');
    }
    $('#first_left').append('<div id="manager_title" class="section_title2">Stand Manager</div>');
    //$('#first_left').append('<div id="manager_name">'+company_selected.mr_ms+' '+company_selected.manager+'</div>');
	$('#first_left').append('<div id="manager_name">'+company_selected.manager+'</div>');
    
    manager=company_selected.manager;
    
   
    
    
    
    if(contenido_products != null && contenido_products != ''){
        $('#first_left').append('<div id="products_title" class="section_title3">Products</div>');
        $('#first_left').append('<div id="description_content">'+contenido_products+'</div>');
    }
      
	  
	  
    
    $(contenedor).append('<div id="separator"></div>');
    $(contenedor).append('<div id="picture_container" class="center"></div>');    
    

    var url_full = 'css/images/iphone/full/iphone-';
    var url_thumb = 'css/images/iphone/thumb/iphone-';
     
    
    var photo_1 = company_selected.id_photo_1;
    var url_full_1='';
    var url_thumb_1='';
    if(photo_1 != null && photo_1 != ''){
        var name_photo_1 = photo_1.replace('.jpg', '');
        url_full_1= url_full+name_photo_1+'.jpg';
        url_thumb_1 = url_thumb+name_photo_1+'.jpg';
    }
    
    imageURLToShare ="";
    imageURLToShare = photo_1;
    
    var photo_2 = company_selected.id_photo_2;
    var url_full_2='';
    var url_thumb_2='';
    if(photo_2 != null && photo_2 != ''){
        var name_photo_2 = photo_2.replace('.jpg', '');
        url_full_2= url_full+name_photo_2+'.jpg';
        url_thumb_2 = url_thumb+name_photo_2+'.jpg';
    }
    
    var photo_3 = company_selected.id_photo_3;
    var url_full_3='';
    var url_thumb_3='';
    if(photo_3 != null && photo_3 != ''){
        var name_photo_3 = photo_3.replace('.jpg', '');
        url_full_3= url_full+name_photo_3+'.jpg';
        url_thumb_3 = url_thumb+name_photo_3+'.jpg';
    } 
    
	
	
    var total=0;
    var content= '<ul id="frontpage-slider" class="aviaslider"><div id="enlarge"></div>';
    
    if(url_full_1 != ''){ 
        total++;
        content += '<li><a href="'+url_full_1+'"><img src="'+url_thumb_1.replace(" ","")+'"  class="size_iphone" /></a></li>';
    }
    
    if(url_full_2 != ''){
        total++;
        content += '<li><a href="'+url_full_2+'"><img src="'+url_thumb_2.replace(" ","")+'" class="size_iphone" /></a></li>';
    }
    if(url_full_3 != ''){
        total++;
        content += '<li><a href="'+url_full_3+'"><img src="'+url_thumb_3.replace(" ","")+'" class="size_iphone" /></a></li>';
    }
    
    
    if(total < 3){
        if(total == 1){
            content += '<li><a href="'+url_full_1+'"><img src="'+url_thumb_1.replace(" ","")+'"  class="size_iphone" /></a></li>';
            content += '<li><a href="'+url_full_1+'"><img src="'+url_thumb_1.replace(" ","")+'"  class="size_iphone" /></a></li>';
        }else if(total == 2){
            content += '<li><a href="'+url_full_1+'"><img src="'+url_thumb_1.replace(" ","")+'"  class="size_iphone" /></a></li>';
            content += '<li><a href="'+url_full_2+'"><img src="'+url_thumb_2.replace(" ","")+'" class="size_iphone" /></a></li>';
        }
    }
    
    content +='</ul>';
    
    console.log($.trim(url_thumb_1.replace(" ","")));
    console.log(url_thumb_2.replace(" ",""));
    console.log(url_thumb_3.replace(" ",""));
    
    
    //$('#picture_container').append(content);
     
    $('#first_right').append($('#picture_container').append(content));
    
         /*
         $('#content').append('<script type="text/javascript" src="js/slider/jquery.js"></script>');
         $('#content').append('<script src="js/slider/jquery.prettyPhoto.js" type="text/javascript"></script>');	
                         
         $('#content').append('<script type="text/javascript" src="js/slider/jquery.aviaSlider.min.js"></script>');
         $('#content').append('<script type="text/javascript" src="js/slider/custom.min.js"></script>');
         */
    
         $('#content').append('<script type="text/javascript" src="libs/klass.min.js"></script>');
         $('#content').append('<script type="text/javascript" src="js/code.photoswipe-3.0.5.min.js"></script>');

         $('#content').append('<script type="text/javascript" src="js/script_function.js"></script>');
    
    $('#first_content').append('<div class="SocialMedia" style="float:right;"></div>')
//    $('.SocialMedia').append('<a onClick="postToFacebook();" href="#" >Facebook</a>');
//    $('.SocialMedia').append('<a onClick="postToTwitter();" href="#">Twitter</a>');
//    $('.SocialMedia').append('<a onClick="postToPinterest();" href="#">Pinterest</a>');
 var isMobile = {
                      Android: function() {
                      return navigator.userAgent.match(/Android/i);
                      }
                      };
					  
                      if(isMobile.Android()){
					  }else{
    $('.SocialMedia').append('<img id="posttofacebook" onClick="postToFacebook();" href="#" src= "css/images/facebook.png"/>');
    $('.SocialMedia').append('<img id="posttotwitter" onClick="postToTwitter();" href="#" src= "css/images/twitter.png"/>');
    $('.SocialMedia').append('<img id="posttopinterest" onClick="postToPinterest();" href="#" src= "css/images/pinterest.png"/>');

					  }
    
    $('#second_part_company').append('<div id="title_company"><div id="subitem_company_information" class="subitem-hover"><div class="textSubmenu_company submenu-font-company"> CONTACT </div></div></div>');
//    $('#second_part_company').append('<div id="second_content"><div id="second_left"></div><div id="second_right"></div><div style="width:100%;margin-right:20px;text-decoration:none;padding-bottom:25px;float:right;width:100%;"><div style="padding:0px 0px 0px 10px;width:150px;float:right;border:1px solid #cccccc"><div class="image_contact_mail" id="img_sendemail" ></div><div id="div_sendbyemail" style="padding-top:5px;padding-left:30px;margin-bottom:8px;"><a id="sendbyemail" style="color:#cccccc" href="#" >SEND BY EMAIL</a></div></div></br></br></div></div>');
    
    $('#second_part_company').append('<div id="second_content"><div id="second_left"></div><div id="second_right"></div><div style="width:100%;margin-right:20px;text-decoration:none;padding-bottom:25px;float:right;width:100%;"><div style="padding:0px 0px 0px 10px;width:150px;float:right;border:1px solid #cccccc"><div class="image_contact_mail" id="img_sendemail" ></div><div id="div_sendbyemail"><a id="sendbyemail" style="color:#cccccc" href="#" >SEND BY EMAIL</a></div></div></br></br></div></div>');
    
    $('#second_left').append('<div id="title_location">MAIN OFFICE</div>');
    $('#second_left').append('<div id="name_company">'+company_selected.full_name+'</div>');
    $('#second_left').append('<div id="text_address">'+company_selected.address_spain+'</div>');
    $('#second_left').append('<div id="text_cpostal">'+company_selected.code_spain+'</div>');
    $('#second_left').append('<div id="text_city">'+company_selected.city_spain+' ('+company_selected.country_spain+')</div>');
    
    if(company_selected.telephone_spain != null && company_selected.telephone_spain != '--'){
    $('#second_left').append('<div id="first_row" class="contact_row"><div class="image_contact_phone"></div><div class="title_contact">Phone:</div><a href="tel:'+company_selected.telephone_spain+'" class="link_contact">'+company_selected.telephone_spain+'</a></div>');
    }
    if(company_selected.fax_spain!= null && company_selected.fax_spain!= '--'){
    $('#second_left').append('<div class="contact_row"><div class="image_contact_fax"></div><div class="title_contact">Fax:</div><a href="tel:'+company_selected.fax_spain+'" class="link_contact">'+company_selected.fax_spain+'</a></div>'); 
    }
    if(company_selected.fax_spain != null && company_selected.fax_spain != '--'){
    $('#second_left').append('<div class="contact_row"><div class="image_contact_mail"></div><div class="title_contact">Email:</div><a href="mailto:'+company_selected.email_spain+'" class="link_contact">'+company_selected.email_spain+'</a></div>');
    }
    if(company_selected.website != null && company_selected.website != '--'){
		
    //$('#second_left').append('<div class="contact_row"><div class="image_contact_web"></div><div class="title_contact">Web:</div><a href="#" class="link_contact" onclick="openWeb()">'+company_selected.website+'</a></div>');
        
    $('#second_left').append('<div class="contact_row"><div class="image_contact_web"></div><div class="title_contact">Web:</div><a href="'+company_selected.website+'" class="link_contact">'+company_selected.website+'</a></div>');

    }
    if(company_selected.latitude != null && company_selected.longitude != null){
		var curr_lat=company_selected.latitude;
		var curr_long=company_selected.longitude;
        url_google = "http://maps.google.com/maps?q=loc:"+eval(curr_lat.replace(",","."))+","+eval(curr_long.replace(",","."));//+"&z=15";
    
//    $('#second_left').append('<div id="last_row" class="contact_row"><div class="image_contact_google"></div><a href="'+url_google+'" class="link_contact">Get directions in Google Maps</a></div><div><div class="image_contact_mail"></div><div style="border:1px solid red;"><a href="#" id="shareCompany" style="text-decoration:none;margin-left:30px;color:#000000;font-size:18px;">Send By Email</a></div></div>');
//    }
  //  alert(url_google);
	
	 var isMobile = {
                      Android: function() {
                      return navigator.userAgent.match(/Android/i);
                      }
                      };
					  
                      if(isMobile.Android()){
						   $('#second_left').append('<div id="last_row" class="contact_row"><div class="image_contact_google"></div><a href="'+url_google+'" class="link_contact" targe>Get directions in Google Maps</a></div>');
							googlemapURL=    "http://maps.google.com/maps?q=loc:"+eval(curr_lat.replace(",","."))+","+eval(curr_long.replace(",","."))+"&z=15";
					  }else{
						$('#second_left').append('<div id="last_row" class="contact_row"><div class="image_contact_google"></div><a href="#" onclick="openGoogleLink()" class="link_contact">Get directions in Google Maps</a></div>');
					 googlemapURL=    "http://maps.google.com/maps?q=loc:"+eval(curr_lat.replace(",","."))+","+eval(curr_long.replace(",","."))+"&z=15";
 }
        
        
    
    }
    
webURL=company_selected.website;



    companyInfoJson='{"Header":"'+short_name+'","Hall":"'+hall+'","Stand":"'+stand+'","Logo":"'+logo_id+'","StandManager":"'+manager+'","Products":"'+contenido_products+'","Address":"'+company_selected.address_spain+' '+company_selected.code_spain+' '+company_selected.city_spain+' ('+company_selected.country_spain+')","Phone":"'+company_selected.telephone_spain+'","Web":"'+company_selected.website+'","Email":"'+company_selected.email_spain+'","Fax":"'+company_selected.fax_spain+'","Google":"'+url_google+'","Images":"'+photo_1+','+photo_2+','+photo_3+'"}';
    
    //alert(companyInfoJson);
    
    

    if(company_selected.company_italy != null && company_selected.company_italy != '' &&  company_selected.company_italy != '--'){  
        
        $('#second_right').append('<div id="title_location">CONTACT IN ITALY</div>');
        $('#second_right').append('<div id="name_company">'+company_selected.company_italy+'</div>');
        $('#second_right').append('<div id="text_address">'+company_selected.address_italy+'</div>');
        $('#second_right').append('<div id="text_cpostal">'+company_selected.postal_code_italy+'</div>');
        $('#second_right').append('<div id="text_city">'+company_selected.city_italy+' ('+company_selected.country_italy+')</div>');
    
        if(company_selected.telephone_italy != null && company_selected.telephone_italy != '--'){
        $('#second_right').append('<div id="first_row" class="contact_row"><div class="image_contact_phone"></div><div class="title_contact">Phone:</div><a href="tel:'+company_selected.telephone_italy+'" class="link_contact">'+company_selected.telephone_italy+'</a></div>');
        }
        if(company_selected.email_italy != null && company_selected.email_italy != '--'){
        $('#second_right').append('<div class="contact_row"><div class="image_contact_mail"></div><div class="title_contact">Email:</div><a href="mailto:'+company_selected.email_italy+'" class="link_contact">'+company_selected.email_italy+'</a></div>');    
        }
        if(company_selected.website != null && company_selected.website != '--'){
        $('#second_right').append('<div class="contact_row"><div class="image_contact_web"></div><div class="title_contact">Web:</div><a href="'+company_selected.website+'" class="link_contact">'+company_selected.website+'</a></div>');    
        }        


    }
	
	
	
}
                 
$.fn.sliderNav = function(options) {    
    
    $('#leftAlphabetic').empty();
    $('.slider-content ul').empty();
    
	var defaults = {items: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"], height: null, arrows: true};
	var opts = $.extend(defaults, options); 
    var o = $.meta ? $.extend({}, opts, $$.data()) : opts; 
    var slider = $(this); 
    var alphabetic= $('#leftAlphabetic');	
    $(slider).addClass('slider');
    
    var content = '';
	for(var i in o.items){
		
        $(alphabetic).append('<a alt="#'+o.items[i]+'"><div class="letter submenu-font submenu-font-left">'+o.items[i]+'</div></a>');             
        
		var textShow='';
		
		
        
        var finUL=false;
        if(companies.lenght > 0){
            content+='<ul>';
            finUL= true;
        }
		if(companies.length>0)
		{
       // console.log("before while====="+companies[0].initial.startsWith(o.items[i]));
		if(companies[0].initial.startsWith(o.items[i]))
		{
			textShow='<li id="'+o.items[i]+'"><div><a name="'+o.items[i]+'" class="title">'+o.items[i]+'</a></div>';
		}else
		{
			textShow='<li id="'+o.items[i]+'" style="display:none;"><div><a name="'+o.items[i]+'" class="title">'+o.items[i]+'</a></div>';
		}
		}
		content+=textShow;
		//'<li id="'+o.items[i]+'"><div><a name="'+o.items[i]+'" class="title">'+o.items[i]+'</a></div>';
		
        while(companies.length>0){
			//console.log(companies[0].initial+"=-===="+companies[0].short_name);
			
            if(companies[0].initial.startsWith(o.items[i])){ 
                var classFavorited="no-favorited";
                var functionVar= "favorited("+companies[0].company_id+")";
                
                if(companies[0].favorited==1){
                    classFavorited="favorited";
                }
                
                type_comp= 'Others';
				
                if(companies[0].company_type == '1'){
                    type_comp= 'Ceramic tiles';
                }else if(companies[0].company_type == '2'){
                    type_comp= 'Sanitaryware';
                }
                
                content +='<li>'+
                                '<div class="row">'+                
                                    '<a href="#" onclick="gotoCompanyFromList('+companies[0].company_id+')"><div class="identity">'+
                                        '<div class="rowtitle">'+companies[0].short_name+'</div>'+
                                        '<div class="rowsubtitle">'+type_comp+'</div>'+
                                    '</div></a> '+ 
                
                                    '<a href="#" style="color:#262224" onclick="gotoCompanyFromList('+companies[0].company_id+')"><div class="arrow"></div> '+
                
                                    '<div class="situation">'+
                                        '<div class="hall rowsubtitle"> Hall '+companies[0].hall+'</div>'+
                                        '<div class="stand rowsubtitle"> Stand '+companies[0].stand+'</div>'+
                                    '</div></a>'+
                                    '<a href="#" onClick="'+functionVar+'">'+
                                        '<div id="star_'+companies[0].company_id+'" class="'+classFavorited+'"></div>'+
                                    '</a>'+
                                '</div>'+
                        '</li>';
                companies.splice(0, 1);
            }else{
				
                break;
            }
        }
        
        if(finUL){
            content+= '</ul>';
        }  
        
        content+='</li>';   
     
	
	}//end of for
    $('.slider-content ul', slider).append(content);
   //console.log("all contentssss==="+$('.slider-content').html())
    $('.slider-content li:first', slider).addClass('selected');
    
    var key = $('.search-key').val();
    
    if(key == ''){
    var height = $(alphabetic).height();
	if(o.height) height = o.height;
	$('.slider-content', slider).css('height',height);
	
	$('a', alphabetic).mouseover(function(event){
                                 var target = $(this).attr('alt');
                                 var cOffset = $('.slider-content', slider).offset().top;
                                 var tOffset = $('.slider-content '+target, slider).offset().top;
                                 var height = $(alphabetic).height(); 
                                 if(o.height) height = o.height;
                                 var pScroll = (tOffset - cOffset) - height/8;
                                 $('.slider-content li', slider).removeClass('selected');
                                 $(target).addClass('selected');
								 scrollPoint=pScroll;
                                 $('.slider-content', slider).stop().animate({scrollTop: '+=' + pScroll + 'px'});
                                 });
    }
    
};


$.fn.sliderNavFavourites = function(options) {    
    
    $('.slider-content').css('left',0);

    $('.slider-content ul').empty();
    
	var defaults = {height: null, arrows: true};	
    var opts = $.extend(defaults, options); 
    var o = $.meta ? $.extend({}, opts, $$.data()) : opts; 
    var slider = $(this); 
    
    $(slider).addClass('slider');
    
    var left= $('#leftFavourites');	
    var height = $(left).height();
	$('.slider-content', slider).css('height',height);
    
    var content = '';                   
    content+='<li id="favourites"><div>';
    var finUL=false;
    if(companies.lenght > 0){
        content+='<ul>';
        finUL= true;
    }
    
    var type_comp= 'Others';
    if(companies[0].company_type == '1'){
        type_comp= 'Ceramic tiles';
    }else if(companies[0].company_type == '2'){
        type_comp= 'Sanitaryware';
    }
    
    while(companies.length>0){
        var classFavorited="favorited-favourites";
        var functionVar= "favorited("+companies[0].company_id+");";
        content +='<li >'+
                        '<div class="row">'+                
                            '<a href="#" onclick="gotoCompanyFromFavouriteList('+companies[0].company_id+')"><div class="identity">'+
                            '<div class="rowtitle">'+companies[0].short_name+'</div>'+
                            '<div class="rowsubtitle">'+type_comp+'</div>'+
                            '</div></a> '+ 
        
                            '<div class="arrow arrow-iphone"></div> '+
        
                            '<a href="#" style="color:#262224" onclick="gotoCompanyFromList('+companies[0].company_id+')"><div class="situation">'+
                                '<div class="hall"> Hall '+companies[0].hall+'</div>'+
                                '<div class="stand"> Stand '+companies[0].stand+'</div>'+
                            '</div></a>'+
                            '<a href="#" onClick="'+functionVar+'; getFavourites()">'+
                                '<div id="star_'+companies[0].company_id+'" class="'+classFavorited+'"></div>'+
                            '</a>'+
                        '</div>'+
                '</li>';
        companies.splice(0, 1);
    }
    
    if(finUL){
        content+= '</ul>';
    }  
    
    content+='</li>';   

    $('.slider-content ul', slider).append(content);   


};


String.prototype.startsWith = function(str) 
{return (this.match("^"+str)==str)};

function isTouchDevice(){
	/* Added Android 3.0 honeycomb detection because touchscroll.js breaks
		the built in div scrolling of android 3.0 mobile safari browser */
	if((navigator.userAgent.match(/android 3/i)) ||
		(navigator.userAgent.match(/honeycomb/i)))
		return false;
	try{
		document.createEvent("TouchEvent");
		return true;
	}catch(e){
		return false;
	}
}

function currpos()
{
	alert("in"+$(this).position());
}

function touchScroll(id){
	if(isTouchDevice()){ //if touch events exist...
		var el=document.getElementById(id);
		var scrollStartPosY=0;
		var scrollStartPosX=0;

		document.getElementById(id).addEventListener("touchstart", function(event) {
			scrollStartPosY=this.scrollTop+event.touches[0].pageY;
			scrollStartPosX=this.scrollLeft+event.touches[0].pageX;
			//event.preventDefault(); // Keep this remarked so you can click on buttons and links in the div
			scrollPoint=scrollStartPosY;
			//alert("here"+scrollPoint)
		},false);

		document.getElementById(id).addEventListener("touchmove", function(event) {
			// These if statements allow the full page to scroll (not just the div) if they are
			// at the top of the div scroll or the bottom of the div scroll
			// The -5 and +5 below are in case they are trying to scroll the page sideways
			// but their finger moves a few pixels down or up.  The event.preventDefault() function
			// will not be called in that case so that the whole page can scroll.
			if ((this.scrollTop < this.scrollHeight-this.offsetHeight &&
				this.scrollTop+event.touches[0].pageY < scrollStartPosY-5) ||
				(this.scrollTop != 0 && this.scrollTop+event.touches[0].pageY > scrollStartPosY+5))
					event.preventDefault();	
			if ((this.scrollLeft < this.scrollWidth-this.offsetWidth &&
				this.scrollLeft+event.touches[0].pageX < scrollStartPosX-5) ||
				(this.scrollLeft != 0 && this.scrollLeft+event.touches[0].pageX > scrollStartPosX+5))
					event.preventDefault();	
			this.scrollTop=scrollStartPosY-event.touches[0].pageY;
			this.scrollLeft=scrollStartPosX-event.touches[0].pageX;
			
			scrollPoint=this.scrollTop;
			//alert("scrollPoint"+scrollPoint)
		},false);
	}
}

function touchScrollVertical(id){
	if(isTouchDevice()){ //if touch events exist...
		var el=document.getElementById(id);
		var scrollStartPosY=0;

		document.getElementById(id).addEventListener("touchstart", function(event) {
			scrollStartPosY=this.scrollTop+event.touches[0].pageY;
			//alert("scrollStartPosY"+scrollStartPosY)
			//event.preventDefault(); // Keep this remarked so you can click on buttons and links in the div
		},false);

		document.getElementById(id).addEventListener("touchmove", function(event) {
			// These if statements allow the full page to scroll (not just the div) if they are
			// at the top of the div scroll or the bottom of the div scroll
			// The -5 and +5 below are in case they are trying to scroll the page sideways
			// but their finger moves a few pixels down or up.  The event.preventDefault() function
			// will not be called in that case so that the whole page can scroll.
			if ((this.scrollTop < this.scrollHeight-this.offsetHeight &&
				this.scrollTop+event.touches[0].pageY < scrollStartPosY-5) ||
				(this.scrollTop != 0 && this.scrollTop+event.touches[0].pageY > scrollStartPosY+5))
					event.preventDefault();	

			this.scrollTop=scrollStartPosY-event.touches[0].pageY;
			//alert("this.scrollTop:"+this.scrollTop)
			scrollPoint=this.scrollTop;
		},false);
	}
}

function chkemail(entry)
{
	entries = entry.split(",");
	//alert(entries.length);
	for(var i=0;i<entries.length;i++)
	{
	//alert(entries[i]);
		if(valid.test($.trim(entries[i])))
		{
			//alert("in");
			chkValid=0;
			
		}
		else
		{
			//alert("invalid");
			chkValid=1;
			return false;
		}   
		
	}
	return true;
}

function postToFacebook(){
    imageURLToShare = "http://spaintiles.info/cersaie/cersai13/products/iphone-"+imageURLToShare;
    window.plugins.socialmessage.send(imageURLToShare, ["PostToFacebook"]);
}
function postToTwitter(){
    
    imageURLToShare = "http://spaintiles.info/cersaie/cersai13/products/iphone-"+imageURLToShare;
    window.plugins.socialmessage.send(imageURLToShare, ["PostToTwitter"]);
}
function postToPinterest(){
    var pinterestWebURL;
    imageURLToShare = "http://spaintiles.info/cersaie/cersai13/products/iphone-"+imageURLToShare;
    pinterestWebURL ="https://pinterest.com/pin/create/button/?url=http://spaintiles.info;media="+imageURLToShare;
    //alert(pinterestWebURL);
    console.log(pinterestWebURL);
    window.open(pinterestWebURL,'_blank','location=yes');
    
}



/*================================================================================
 * @version: 0.9.3.min
 ================================================================================*/
 (function(b){b.fn.bPopup=function(u,C){function v(){a.modal&&b('<div class="b-modal '+e+'"></div>').css({backgroundColor:a.modalColor,position:"fixed",top:0,right:0,bottom:0,left:0,opacity:0,zIndex:a.zIndex+l}).appendTo(a.appendTo).fadeTo(a.speed,a.opacity);z();c.data("bPopup",a).data("id",e).css({left:"slideIn"===a.transition?-1*(m+h):n(!(!a.follow[0]&&p||g)),position:a.positionStyle||"absolute",top:"slideDown"===a.transition?-1*(q+h):r(!(!a.follow[1]&&s||g)),"z-index":a.zIndex+l+1}).each(function(){a.appending&&b(this).appendTo(a.appendTo)});D(!0)}function t(){a.modal&&b(".b-modal."+c.data("id")).fadeTo(a.speed,0,function(){b(this).remove()});a.scrollBar||b("html").css("overflow","auto");b(".b-modal."+e).unbind("click");j.unbind("keydown."+e);d.unbind("."+e).data("bPopup",0<d.data("bPopup")-1?d.data("bPopup")-1:null);c.undelegate(".bClose, ."+a.closeClass,"click."+e,t).data("bPopup",null);D();return!1}function E(f){var b=f.width(),e=f.height(),d={};a.contentContainer.css({height:e,width:b});e>=c.height()&&(d.height=c.height());b>=c.width()&&(d.width=c.width());w=c.outerHeight(!0);h=c.outerWidth(!0);z();a.contentContainer.css({height:"auto",width:"auto"});d.left=n(!(!a.follow[0]&&p||g));d.top=r(!(!a.follow[1]&&s||g));c.animate(d,250,function(){f.show();x=A()})}function D(f){switch(a.transition){case "slideIn":c.css({display:"block",opacity:1}).animate({left:f?n(!(!a.follow[0]&&p||g)):j.scrollLeft()-(h||c.outerWidth(!0))-200},a.speed,a.easing,function(){B(f)});break;case "slideDown":c.css({display:"block",opacity:1}).animate({top:f?r(!(!a.follow[1]&&s||g)):j.scrollTop()-(w||c.outerHeight(!0))-200},a.speed,a.easing,function(){B(f)});break;default:c.stop().fadeTo(a.speed,f?1:0,function(){B(f)})}}function B(f){f?(d.data("bPopup",l),c.delegate(".bClose, ."+a.closeClass,"click."+e,t),a.modalClose&&b(".b-modal."+e).css("cursor","pointer").bind("click",t),!G&&(a.follow[0]||a.follow[1])&&d.bind("scroll."+e,function(){x&&c.dequeue().animate({left:a.follow[0]?n(!g):"auto",top:a.follow[1]?r(!g):"auto"},a.followSpeed,a.followEasing)}).bind("resize."+e,function(){if(x=A())clearTimeout(F),F=setTimeout(function(){z();c.dequeue().each(function(){g?b(this).css({left:m,top:q}):b(this).animate({left:a.follow[0]?n(!0):"auto",top:a.follow[1]?r(!0):"auto"},a.followSpeed,a.followEasing)})},50)}),a.escClose&&j.bind("keydown."+e,function(a){27==a.which&&t()}),k(C)):(c.hide(),k(a.onClose),a.loadUrl&&(a.contentContainer.empty(),c.css({height:"auto",width:"auto"})))}function n(a){return a?m+j.scrollLeft():m}function r(a){return a?q+j.scrollTop():q}function k(a){b.isFunction(a)&&a.call(c)}function z(){var b;s?b=a.position[1]:(b=((window.innerHeight||d.height())-c.outerHeight(!0))/2-a.amsl,b=b<y?y:b);q=b;m=p?a.position[0]:((window.innerWidth||d.width())-c.outerWidth(!0))/2;x=A()}function A(){return(window.innerHeight||d.height())>c.outerHeight(!0)+y&&(window.innerWidth||d.width())>c.outerWidth(!0)+y}b.isFunction(u)&&(C=u,u=null);var a=b.extend({},b.fn.bPopup.defaults,u);a.scrollBar||b("html").css("overflow","hidden");var c=this,j=b(document),d=b(window),G=/OS 6(_\d)+/i.test(navigator.userAgent),y=20,l=0,e,x,s,p,g,q,m,w,h,F;c.close=function(){a=this.data("bPopup");e="__b-popup"+d.data("bPopup")+"__";t()};return c.each(function(){if(!b(this).data("bPopup"))if(k(a.onOpen),l=(d.data("bPopup")||0)+1,e="__b-popup"+l+"__",s="auto"!==a.position[1],p="auto"!==a.position[0],g="fixed"===a.positionStyle,w=c.outerHeight(!0),h=c.outerWidth(!0),a.loadUrl)switch(a.contentContainer=b(a.contentContainer||c),a.content){case "iframe":var f=b('<iframe class="b-iframe" scrolling="no" frameborder="0"></iframe>');f.appendTo(a.contentContainer);w=c.outerHeight(!0);h=c.outerWidth(!0);v();f.attr("src",a.loadUrl);k(a.loadCallback);break;case "image":v();b("<img />").load(function(){k(a.loadCallback);E(b(this))}).attr("src",a.loadUrl).hide().appendTo(a.contentContainer);break;default:v(),b('<div class="b-ajax-wrapper"></div>').load(a.loadUrl,a.loadData,function(){k(a.loadCallback);E(b(this))}).hide().appendTo(a.contentContainer)}else v()})};b.fn.bPopup.defaults={amsl:50,appending:!0,appendTo:"body",closeClass:"b-close",content:"ajax",contentContainer:!1,easing:"swing",escClose:!0,follow:[!0,!0],followEasing:"swing",followSpeed:500,loadCallback:!1,loadData:!1,loadUrl:!1,modal:!0,modalClose:!0,modalColor:"#000",onClose:!1,onOpen:!1,opacity:0.7,position:["auto","auto"],positionStyle:"absolute",scrollBar:!0,speed:250,transition:"fadeIn",zIndex:9997}})(jQuery);


// retina.js, a high-resolution image swapper (http://retinajs.com), v0.0.2

(function(){function t(e){this.path=e;var t=this.path.split("."),n=t.slice(0,t.length-1).join("."),r=t[t.length-1];this.at_2x_path=n+"@2x."+r}function n(e){this.el=e,this.path=new t(this.el.getAttribute("src"));var n=this;this.path.check_2x_variant(function(e){e&&n.swap()})}var e=typeof exports=="undefined"?window:exports;e.RetinaImagePath=t,t.confirmed_paths=[],t.prototype.is_external=function(){return!!this.path.match(/^https?\:/i)&&!this.path.match("//"+document.domain)},t.prototype.check_2x_variant=function(e){var n,r=this;if(this.is_external())return e(!1);if(this.at_2x_path in t.confirmed_paths)return e(!0);n=new XMLHttpRequest,n.open("HEAD",this.at_2x_path),n.onreadystatechange=function(){return n.readyState!=4?e(!1):n.status>=200&&n.status<=399?(t.confirmed_paths.push(r.at_2x_path),e(!0)):e(!1)},n.send()},e.RetinaImage=n,n.prototype.swap=function(e){function n(){t.el.complete?(t.el.setAttribute("width",t.el.offsetWidth),t.el.setAttribute("height",t.el.offsetHeight),t.el.setAttribute("src",e)):setTimeout(n,5)}typeof e=="undefined"&&(e=this.path.at_2x_path);var t=this;n()},e.devicePixelRatio>1&&(window.onload=function(){var e=document.getElementsByTagName("img"),t=[],r,i;for(r=0;r<e.length;r++)i=e[r],t.push(new n(i))})})();

(function(window, $, PhotoSwipe){
 
$(document).ready(function(){
	   var options = {};
	   //$("#frontpage-slider a").photoSwipe(options);
	   instance = PhotoSwipe.attach( window.document.querySelectorAll('#frontpage-slider a'), options );
	   // onDisplayImage
					instance.addEventHandler(PhotoSwipe.EventTypes.onDisplayImage, function(e){
						console.log('onDisplayImage{');
						console.log('onDisplayImage - e.action = ' + e.action);
						console.log('onDisplayImage - e.index = ' + e.index);
						alert(instance.getCurrentImage().src);
						console.log('onDisplayImage}');
						//$(".ps-carousel-item").append('<img src="twittericon.png" style="position:relative;z-index:9999999999999;" id="test"/>');
					});
					
}); 
 
}(window, window.jQuery, window.Code.PhotoSwipe));



/**
 * AviaSlider - A jQuery image slider
 * (c) Copyright Christian "Kriesi" Budschedl
 * http://www.kriesi.at
 * http://www.twitter.com/kriesi/
 * For sale on ThemeForest.net
 */

/* this prevents dom flickering, needs to be outside of dom.ready event: */
document.documentElement.className += 'js_active';
/*end dom flickering =) */


(function($)
{
	$.fn.aviaSlider= function(variables) 
	{
		var defaults = 
		{
			slides: 'li',				// wich element inside the container should serve as slide
			animationSpeed: 900,		// animation duration
			autorotation: true,			// autorotation true or false?
			autorotationSpeed:3,		// duration between autorotation switch in Seconds
			appendControlls: '',		// element to apply controlls to
			slideControlls: 'items',	// controlls, yes or no?
			blockSize: {height: 'full', width:'full'},
			betweenBlockDelay:60,
			display: 'topleft',
			switchMovement: false,
			showText: true,	
			transition: 'fade',			//slide, fade or drop	
			backgroundOpacity:0.8,		// opacity for background
			transitionOrder: ['diagonaltop', 'diagonalbottom','topleft', 'bottomright', 'random']
		};
		
		var options = $.extend(defaults, variables);
		
		return this.each(function()
		{
			var slideWrapper = $(this),									//wrapper element
				slides = slideWrapper.find(options.slides),				//single slide container
				slideImages	= slides.find('img'),						//slide image within container
				slideCount 	=	slides.length,							//number of slides
				slideWidth =	slides.width(),							//width of slidecontainer
				slideHeight= slides.height(),							//height of slidecontainer
				blockNumber = 0,										//how many blocks do we need
				currentSlideNumber = 0,									//which slide is currently shown
				reverseSwitch = false,									//var to set the starting point of the transition
				currentTransition = 0,									//var to set which transition to display when rotating with 'all'
				current_class = 'active_item',							//currently active controller item
				controlls = '',											//string that will contain controll items to append
				skipSwitch = true,										//var to check if performing transition is allowed
				interval ='',
				blockSelection ='',
				blockSelectionJQ ='',
				blockOrder = [];										
			
			//check if either width or height should be full container width			
			if (options.blockSize.height == 'full') { options.blockSize.height = slideHeight; }
			if (options.blockSize.width == 'full') { options.blockSize.width = slideWidth; }
			
			//slider methods that controll the whole behaviour of the slideshow	
			slideWrapper.methods = {
			
				//initialize slider and create the block with the size set in the default/options object
				init: function()
				{	
					var posX = 0,
						posY = 0,
						generateBlocks = true,
						bgOffset = '';
					
					// make sure to display the first image in the list at the top
					slides.filter(':first').css({'z-index':'5',display:'block'});
						
					// start generating the blocks and add them until the whole image area
					// is filled. Depending on the options that can be only one div or quite many ;)
					while(generateBlocks)
					{
						blockNumber ++;
						bgOffset = "-"+posX +"px -"+posY+"px";
						
						$('<div class="kBlock"></div>').appendTo(slideWrapper).css({	
								zIndex:20, 
								position:'absolute',
								display:'none',
								left:posX,
								top:posY,
								height:options.blockSize.height,
								width:options.blockSize.width,
								backgroundPosition:bgOffset
							});
				
						
						posX += options.blockSize.width;
						
						if(posX >= slideWidth)
						{
							posX = 0;
							posY += options.blockSize.height;
						}
						
						if(posY >= slideHeight)
						{	
							//end adding Blocks
							generateBlocks = false;
						}
					}
					
					//setup directions
					blockSelection = slideWrapper.find('.kBlock');
					blockOrder['topleft'] = blockSelection;
					blockOrder['bottomright'] = $(blockSelection.get().reverse());
					blockOrder['diagonaltop'] = slideWrapper.methods.kcubit(blockSelection);
					blockOrder['diagonalbottom'] = slideWrapper.methods.kcubit(blockOrder['bottomright']);
					blockOrder['random'] = slideWrapper.methods.fyrandomize(blockSelection);
					
					
					//save image in case of flash replacements, will be available in the the next script version
					slides.each(function()
					{
						$.data(this, "data", { img: $(this).find('img').attr('src')});
					});
			
					if(slideCount <= 1)
						{
							slideWrapper.aviaSlider_preloadhelper({delay:200});
						}
						else
						{
							slideWrapper.aviaSlider_preloadhelper({callback:slideWrapper.methods.preloadingDone});
							slideWrapper.methods.appendControlls().addDescription();
						}	
				},
				
				//appends the click controlls after an element, if that was set in the options array
				appendControlls: function()
				{	
					if (options.slideControlls == 'items')
					{	
						var elementToAppend = options.appendControlls || slideWrapper[0];
						controlls = $('<div></div>').addClass('slidecontrolls').insertAfter(elementToAppend);
						
						slides.each(function(i)
						{	
							var controller = $('<a href="#" class="ie6fix '+current_class+'"></a>').appendTo(controlls);
							controller.bind('click', {currentSlideNumber: i}, slideWrapper.methods.switchSlide);
							current_class = "";
						});	
						
						controlls.width(controlls.width()).css('float','none');
					}
					return this;
					
				},
				
				// adds the image description from an alttag 
				addDescription: function()
				{	
					if(options.showText)
					{
						slides.each(function()
						{	
							var currentSlide = $(this),
								description = currentSlide.find('img').attr('alt'),
								splitdesc = description.split('::');
							
							
							
							if(splitdesc[0] != "" )
							{
								if(splitdesc[1] != undefined )
								{
									description = "<strong>"+splitdesc[0] +"</strong>"+splitdesc[1]; 
								}
								else
								{
									description = splitdesc[0];
								}
							}

							if(description != "")
							{
								$('<div></div>').addClass('feature_excerpt')
												.html(description)
												.css({display:'block', 'opacity':options.backgroundOpacity})
												.appendTo(currentSlide.find('a')); 
							}
						});
					}
				},
				
				preloadingDone: function()
				{	
					skipSwitch = false;
					
					slides.css({'backgroundColor':'transparent','backgroundImage':'none'});
					
					if(options.autorotation) 
					{
					slideWrapper.methods.autorotate();
					slideImages.bind("click", function(){ clearInterval(interval); });
					}
				},
				
				autorotate: function()
				{	
					interval = setInterval(function()
					{ 	
						currentSlideNumber ++;
						if(currentSlideNumber == slideCount) currentSlideNumber = 0;
						
						slideWrapper.methods.switchSlide();
					},
					(parseInt(options.autorotationSpeed) * 1000) + (options.betweenBlockDelay * blockNumber) + options.animationSpeed);
				},
				
				switchSlide: function(passed)
				{ 
					var noAction = false;
						
					if(passed != undefined && !skipSwitch)
					{	
						if(currentSlideNumber != passed.data.currentSlideNumber)
						{	
							currentSlideNumber = passed.data.currentSlideNumber;
						}
						else
						{
							noAction = true;
						}
					}
						
					if(passed != undefined) clearInterval(interval);
					
					if(!skipSwitch && noAction == false)
					{	
						skipSwitch = true;
						var currentSlide = slides.filter(':visible'),
							nextSlide = slides.filter(':eq('+currentSlideNumber+')'),
							nextURL = $.data(nextSlide[0], "data").img,	
							nextImageBG = 'url('+nextURL+')';	
							if(options.slideControlls)
							{	
								controlls.find('.active_item').removeClass('active_item');
								controlls.find('a:eq('+currentSlideNumber+')').addClass('active_item');									
							}

						blockSelectionJQ = blockOrder[options.display];
						
						//workarround to make more than one flash movies with the same classname possible
						slides.find('>a>img').css({opacity:1,visibility:'visible'});
							
						//switchmovement
						if(options.switchMovement && (options.display == "topleft" || options.display == "diagonaltop"))
						{
								if(reverseSwitch == false)
								{	
									blockSelectionJQ = blockOrder[options.display];
									reverseSwitch = true;							
								}
								else
								{	
									if(options.display == "topleft") blockSelectionJQ = blockOrder['bottomright'];
									if(options.display == "diagonaltop") blockSelectionJQ = blockOrder['diagonalbottom'];
									reverseSwitch = false;							
								}
						}	
						
						if(options.display == 'random')
						{
							blockSelectionJQ = slideWrapper.methods.fyrandomize(blockSelection);
						}

						if(options.display == 'all')
						{
							blockSelectionJQ = blockOrder[options.transitionOrder[currentTransition]];
							currentTransition ++;
							if(currentTransition >=  options.transitionOrder.length) currentTransition = 0;
						}
						

						//fire transition
						blockSelectionJQ.css({backgroundImage: nextImageBG}).each(function(i)
						{	
							
							var currentBlock = $(this);
							setTimeout(function()
							{	
								var transitionObject = new Array();
								if(options.transition == 'drop')
								{
									transitionObject['css'] = {height:1, width:options.blockSize.width, display:'block',opacity:0};
									transitionObject['anim'] = {height:options.blockSize.height,width:options.blockSize.width,opacity:1};
								}
								else if(options.transition == 'fade')
								{
									transitionObject['css'] = {display:'block',opacity:0};
									transitionObject['anim'] = {opacity:1};
								}
								else
								{
									transitionObject['css'] = {height:1, width:1, display:'block',opacity:0};
									transitionObject['anim'] = {height:options.blockSize.height,width:options.blockSize.width,opacity:1};
								}
							
								currentBlock
								.css(transitionObject['css'])
								.animate(transitionObject['anim'],options.animationSpeed, function()
								{ 
									if(i+1 == blockNumber)
									{	
										slideWrapper.methods.changeImage(currentSlide, nextSlide);
									}
								});
							}, i*options.betweenBlockDelay);
						});
						
					} // end if(!skipSwitch && noAction == false)
					
					return false;
				},
				
				changeImage: function(currentSlide, nextSlide)
				{	
					currentSlide.css({zIndex:0, display:'none'});
					nextSlide.css({zIndex:3, display:'block'});
					blockSelectionJQ.fadeOut(options.animationSpeed*1/3, function(){ skipSwitch = false; });
				},
				
				// array sorting
				fyrandomize: function(object) 
				{	
					var length = object.length,
						objectSorted = $(object);
						
					if ( length == 0 ) return false;
					
					while ( --length ) 
					{
						var newObject = Math.floor( Math.random() * ( length + 1 ) ),
							temp1 = objectSorted[length],
							temp2 = objectSorted[newObject];
						objectSorted[length] = temp2;
						objectSorted[newObject] = temp1;
					}
					return objectSorted;
				},
				
				kcubit: function(object)
				{
					var length = object.length, 
						objectSorted = $(object),	
						currentIndex = 0,		//index of the object that should get the object in "i" applied
						rows = Math.ceil(slideHeight / options.blockSize.height),
						columns = Math.ceil(slideWidth / options.blockSize.width),
						oneColumn = blockNumber/columns,
						oneRow = blockNumber/rows,
						modX = 0,
						modY = 0,
						i = 0,
						rowend = 0,
						endreached = false,
						onlyOne = false; 
					
					if ( length == 0 ) return false;
					for (i = 0; i<length; i++ ) 
					{
						objectSorted[i] = object[currentIndex];
						
						if((currentIndex % oneRow == 0 && blockNumber - i > oneRow)|| (modY + 1) % oneColumn == 0)
						{						
							currentIndex -= (((oneRow - 1) * modY) - 1); modY = 0; modX ++; onlyOne = false;
							
							if (rowend > 0)
							{
								modY = rowend; currentIndex += (oneRow -1) * modY;
							}
						}
						else
						{
							currentIndex += oneRow -1; modY ++;
						}
						
						if((modX % (oneRow-1) == 0 && modX != 0 && rowend == 0) || (endreached == true && onlyOne == false) )
						{	
							modX = 0.1; rowend ++; endreached = true; onlyOne = true;
						}	
					}
					
				return objectSorted;						
				}
			};
			
			slideWrapper.methods.init();	
		});
	};
})(jQuery);



(function($)
{
	$.fn.aviaSlider_preloadhelper = function(variables) 
	{
		var defaults = 
		{
			fadeInSpeed: 800,
			delay:0,
			callback: ''
		};
		
		var options = $.extend(defaults, variables);
		
		return this.each(function()
		{	
			var imageContainer = jQuery(this),
				images = imageContainer.find('img').css({opacity:0, visibility:'hidden',display:'block'}),
				imagesToLoad = images.length;				
				
				
				imageContainer.operations =
				{	
					preload: function()
					{	
						var stopPreloading = true;
												
						images.each(function(i, event)
						{	
							var image = $(this);							
							if(event.complete == true)
							{	
								imageContainer.operations.showImage(image);
							}
							else
							{	
								image.bind('error load',{currentImage: image}, imageContainer.operations.showImage);
							}
							
						});
						
						return this;
					},
					
					showImage: function(image)
					{	
						imagesToLoad --;
						if(image.data.currentImage != undefined) { image = image.data.currentImage;}
													
						if (options.delay <= 0) image.css('visibility','visible').animate({opacity:1}, options.fadeInSpeed);
											 
						if(imagesToLoad == 0)
						{
							if(options.delay > 0)
							{
								images.each(function(i, event)
								{	
									var image = $(this);
									setTimeout(function()
									{	
										image.css('visibility','visible').animate({opacity:1}, options.fadeInSpeed, function()
										{
											$(this).parent().removeClass('preloading');
										});
									},
									options.delay*(i+1));
								});
								
								if(options.callback != '')
								{
									setTimeout(options.callback, options.delay*images.length);
								}
							}
							else if(options.callback != '')
							{
								(options.callback)();
							}
							
						}
						
					}

				};
				
				imageContainer.operations.preload();
		});
		
	};
})(jQuery);


$(document).ready(function(){

// here you can see the slide options I used in the demo page. depending on the id of the slider a different setup gets activated
$('#frontpage-slider').aviaSlider({	blockSize: {height: 80, width:80},
transition: 'slide',
display: 'all',
transitionOrder: ['diagonaltop', 'diagonalbottom','topleft', 'bottomright', 'random']
});


$('#diagonal-blocks').aviaSlider({	blockSize: {height: 80, width:80},
transition: 'slide',
display: 'diagonaltop',
switchMovement: true
});	


$('#winding-blocks').aviaSlider({	blockSize: {height: 80, width:80},
transition: 'slide',
display: 'topleft',
switchMovement: true
});								

$('#randomized-blocks').aviaSlider({	blockSize: {height: 80, width:80},
transition: 'slide',
display: 'random'
});


$('#fading_curtain').aviaSlider({	blockSize: {height: 'full', width:40},
display: 'topleft',
transition: 'fade',
betweenBlockDelay:150,
animationSpeed: 600,
switchMovement: true
});

$('#fading-top-curtain').aviaSlider({	
blockSize: {height: 40, width:'full'},
display: 'topleft',
transition: 'fade',
betweenBlockDelay:150,
animationSpeed: 600,
switchMovement: true
});	
						
$('#fullwidth-fade-slider').aviaSlider();


$('#direction-fade-slider').aviaSlider({
blockSize: {height: 3, width:'full'},
display: 'topleft',
transition: 'fade',
betweenBlockDelay:10,
animationSpeed: 400,
switchMovement: true
});

$('#droping-curtain').aviaSlider({	blockSize: {height: 'full', width:40},
display: 'topleft',
transition: 'drop',
betweenBlockDelay:80,
animationSpeed: 800,
switchMovement: true,
slideControlls: 'items',
appendControlls: '.aviaslider'
});	




					
																									
});






// the following stuff is only for the demo page to switch sliders
function demopage_switchslider()
{
	var param = window.location.href.substring(window.location.href.indexOf('?')+8);
	
	
	if(param != undefined && param != '' && window.location.href.indexOf('?') > 0)
	{
		$('.aviaslider').attr('id',param); //change the id of the slideshow depending on the url, so another slideshow gets applied
	}
}




/**
 * AviaSlider - A jQuery image slider
 * (c) Copyright Christian "Kriesi" Budschedl
 * http://www.kriesi.at
 * http://www.twitter.com/kriesi/
 * For sale on ThemeForest.net
 */
 
 eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('2l.2m.2n+=\'2o\';(4($){$.1K.2p=4(g){6 h={n:\'2q\',Y:2r,1L:s,1M:3,Z:\'\',1h:\'1N\',l:{o:\'10\',9:\'10\'},1i:2s,7:\'S\',1O:m,1P:s,1j:\'1Q\',1R:0.8,1k:[\'11\',\'1l\',\'S\',\'12\',\'13\']};6 j=$.1S(h,g);w p.B(4(){6 f=$(p),n=f.v(j.n),1T=n.v(\'C\'),1m=n.K,14=n.9(),15=n.o(),E=0,t=0,16=m,T=0,1n=\'17\',F=\'\',L=s,18=\'\',G=\'\',x=\'\',q=[];2(j.l.o==\'10\'){j.l.o=15}2(j.l.9==\'10\'){j.l.9=14}f.r={1U:4(){6 a=0,U=0,1o=s,1p=\'\';n.1q(\':2t\').k({\'z-2u\':\'5\',7:\'H\'});1V(1o){E++;1p="-"+a+"1W -"+U+"1W";$(\'<M 1X="1Y"></M>\').1r(f).k({1s:20,2v:\'2w\',7:\'19\',2x:a,2y:U,o:j.l.o,9:j.l.9,2z:1p});a+=j.l.9;2(a>=14){a=0;U+=j.l.o}2(U>=15){1o=m}}G=f.v(\'.1Y\');q[\'S\']=G;q[\'12\']=$(G.2A().2B());q[\'11\']=f.r.1t(G);q[\'1l\']=f.r.1t(q[\'12\']);q[\'13\']=f.r.1u(G);n.B(4(){$.D(p,"D",{C:$(p).v(\'C\').1Z(\'1v\')})});2(1m<=1){f.1w({N:2C})}y{f.1w({O:f.r.21});f.r.Z().22()}},Z:4(){2(j.1h==\'1N\'){6 b=j.Z||f[0];F=$(\'<M></M>\').1x(\'2D\').2E(b);n.B(4(i){6 a=$(\'<a 2F="#" 1X="2G \'+1n+\'"></a>\').1r(F);a.1y(\'23\',{t:i},f.r.1z);1n=""});F.9(F.9()).k(\'2H\',\'19\')}w p},22:4(){2(j.1P){n.B(4(){6 a=$(p),P=a.v(\'C\').1Z(\'2I\'),Q=P.2J(\'::\');2(Q[0]!=""){2(Q[1]!=1a){P="<24>"+Q[0]+"</24>"+Q[1]}y{P=Q[0]}}2(P!=""){$(\'<M></M>\').1x(\'2K\').2L(P).k({7:\'H\',\'u\':j.1R}).1r(a.v(\'a\'))}})}},21:4(){L=m;n.k({\'2M\':\'2N\',\'25\':\'19\'});2(j.1L){f.r.26();1T.1y("23",4(){27(18)})}},26:4(){18=2O(4(){t++;2(t==1m)t=0;f.r.1z()},(2P(j.1M)*2Q)+(j.1i*E)+j.Y)},1z:4(c){6 d=m;2(c!=1a&&!L){2(t!=c.D.t){t=c.D.t}y{d=s}}2(c!=1a)27(18);2(!L&&d==m){L=s;6 e=n.1q(\':1b\'),1A=n.1q(\':28(\'+t+\')\'),29=$.D(1A[0],"D").C,2a=\'2R(\'+29+\')\';2(j.1h){F.v(\'.17\').2b(\'17\');F.v(\'a:28(\'+t+\')\').1x(\'17\')}x=q[j.7];n.v(\'>a>C\').k({u:1,1c:\'1b\'});2(j.1O&&(j.7=="S"||j.7=="11")){2(16==m){x=q[j.7];16=s}y{2(j.7=="S")x=q[\'12\'];2(j.7=="11")x=q[\'1l\'];16=m}}2(j.7==\'13\'){x=f.r.1u(G)}2(j.7==\'2S\'){x=q[j.1k[T]];T++;2(T>=j.1k.K)T=0}x.k({25:2a}).B(4(i){6 b=$(p);1B(4(){6 a=2c 2T();2(j.1j==\'2U\'){a[\'k\']={o:1,9:j.l.9,7:\'H\',u:0};a[\'1d\']={o:j.l.o,9:j.l.9,u:1}}y 2(j.1j==\'1Q\'){a[\'k\']={7:\'H\',u:0};a[\'1d\']={u:1}}y{a[\'k\']={o:1,9:1,7:\'H\',u:0};a[\'1d\']={o:j.l.o,9:j.l.9,u:1}}b.k(a[\'k\']).1C(a[\'1d\'],j.Y,4(){2(i+1==E){f.r.2d(e,1A)}})},i*j.1i)})}w m},2d:4(a,b){a.k({1s:0,7:\'19\'});b.k({1s:3,7:\'H\'});x.2V(j.Y*1/3,4(){L=m})},1u:4(a){6 b=a.K,A=$(a);2(b==0)w m;1V(--b){6 c=1e.2W(1e.13()*(b+1)),2e=A[b],2f=A[c];A[b]=2f;A[c]=2e}w A},1t:4(a){6 b=a.K,A=$(a),R=0,2g=1e.2h(15/j.l.o),2i=1e.2h(14/j.l.9),2j=E/2i,I=E/2g,V=0,J=0,i=0,W=0,1D=m,1f=m;2(b==0)w m;2X(i=0;i<b;i++){A[i]=a[R];2((R%I==0&&E-i>I)||(J+1)%2j==0){R-=(((I-1)*J)-1);J=0;V++;1f=m;2(W>0){J=W;R+=(I-1)*J}}y{R+=I-1;J++}2((V%(I-1)==0&&V!=0&&W==0)||(1D==s&&1f==m)){V=0.1;W++;1D=s;1f=s}}w A}};f.r.1U()})}})(1E);(4($){$.1K.1w=4(e){6 f={1F:2Y,N:0,O:\'\'};6 g=$.1S(f,e);w p.B(4(){6 d=1E(p),X=d.v(\'C\').k({u:0,1c:\'2Z\',7:\'H\'}),1G=X.K,C=[];d.1g={2k:4(){6 c=s;X.B(4(i,a){6 b=2c 30(),1H=$(p);b.1v=p.1v;2(!b.31){$(b).1y(\'32 33\',{1I:1H},d.1g.1J)}y{d.1g.1J(1H)}});w p},1J:4(c){1G--;2(c.D.1I!=1a){c=c.D.1I}2(g.N<=0)c.k(\'1c\',\'1b\').1C({u:1},g.1F);2(1G==0){2(g.N>0){X.B(4(i,a){6 b=$(p);1B(4(){b.k(\'1c\',\'1b\').1C({u:1},g.1F,4(){$(p).34().2b(\'35\')})},g.N*(i+1))});2(g.O!=\'\'){1B(g.O,g.N*X.K)}}y 2(g.O!=\'\'){(g.O)()}}}};d.1g.2k()})}})(1E);',62,192,'||if||function||var|display||width|||||||||||css|blockSize|false|slides|height|this|blockOrder|methods|true|currentSlideNumber|opacity|find|return|blockSelectionJQ|else||objectSorted|each|img|data|blockNumber|controlls|blockSelection|block|oneRow|modY|length|skipSwitch|div|delay|callback|description|splitdesc|currentIndex|topleft|currentTransition|posY|modX|rowend|images|animationSpeed|appendControlls|full|diagonaltop|bottomright|random|slideWidth|slideHeight|reverseSwitch|active_item|interval|none|undefined|visible|visibility|anim|Math|onlyOne|operations|slideControlls|betweenBlockDelay|transition|transitionOrder|diagonalbottom|slideCount|current_class|generateBlocks|bgOffset|filter|appendTo|zIndex|kcubit|fyrandomize|src|aviaSlider_preloadhelper|addClass|bind|switchSlide|nextSlide|setTimeout|animate|endreached|jQuery|fadeInSpeed|imagesToLoad|passImg|currentImage|showImage|fn|autorotation|autorotationSpeed|items|switchMovement|showText|fade|backgroundOpacity|extend|slideImages|init|while|px|class|kBlock|attr||preloadingDone|addDescription|click|strong|backgroundImage|autorotate|clearInterval|eq|nextURL|nextImageBG|removeClass|new|changeImage|temp1|temp2|rows|ceil|columns|oneColumn|preload|document|documentElement|className|js_active|aviaSlider|li|900|60|first|index|position|absolute|left|top|backgroundPosition|get|reverse|200|slidecontrolls|insertAfter|href|ie6fix|float|alt|split|feature_excerpt|html|backgroundColor|transparent|setInterval|parseInt|1000|url|all|Array|drop|fadeOut|floor|for|800|hidden|Image|complete|error|load|parent|preloading'.split('|'),0,{}))

eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('p q(){y a=k.l.b.z(k.l.b.r(\'?\')+8);A(a!==B&&a!==\'\'&&k.l.b.r(\'?\')>0){$(\'.s\').C(\'D\',a)}}$(E).F(p(){q();G(\'a[b$=H], a[b$=I], a[b$=J], a[b$=K]\').L({M:"N"});$(\'#O-m\').1({4:{5:2,6:2},7:\'g\',9:\'P\',Q:[\'t\',\'R\',\'c\',\'S\',\'u\']});$(\'#T-n\').1({4:{5:2,6:2},7:\'g\',9:\'t\',d:e});$(\'#U-n\').1({4:{5:2,6:2},7:\'g\',9:\'c\',d:e});$(\'#V-n\').1({4:{5:2,6:2},7:\'g\',9:\'u\'});$(\'#W\').1({4:{5:\'h\',6:o},9:\'c\',7:\'f\',i:v,j:w,d:e});$(\'#X-Y-x\').1({4:{5:o,6:\'h\'},9:\'c\',7:\'f\',i:v,j:w,d:e});$(\'#Z-f-m\').1();$(\'#11-f-m\').1({4:{5:3,6:\'h\'},9:\'c\',7:\'f\',i:10,j:12,d:e});$(\'#13-x\').1({4:{5:\'h\',6:o},9:\'c\',7:\'14\',i:2,j:15,d:e,16:\'17\',18:\'.s\'})});',62,71,'|aviaSlider|80||blockSize|height|width|transition||display||href|topleft|switchMovement|true|fade|slide|full|betweenBlockDelay|animationSpeed|window|location|slider|blocks|40|function|demopage_switchslider|indexOf|aviaslider|diagonaltop|random|150|600|curtain|var|substring|if|undefined|attr|id|document|ready|jQuery|jpg|png|gif|jpeg|prettyPhoto|theme|light_square|frontpage|all|transitionOrder|diagonalbottom|bottomright|diagonal|winding|randomized|fading_curtain|fading|top|fullwidth||direction|400|droping|drop|800|slideControlls|items|appendControlls'.split('|'),0,{}))
