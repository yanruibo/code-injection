





//<link href="jquery.mobile.theme-1.0.min.css" rel="stylesheet" type="text/css"/>



    $(function() {
        $( "input[type=submit], a, button" )
            .button()
            .click(function( event ) {
                event.preventDefault();
            });
    });
	
	$('#page2').live('pageinit', function(event) {
   
	$('#storelist').listview('refresh');
	
});

$('#page5').live('pageinit', function(event) {
 	$('#myreports').listview('refresh');
});
    


var loaded = false; 

function onPhotosLoad() {
	 // only load the camera selector on first load 
	 if (!loaded) { 
	 navigator.camera.getPicture(onPhotoLoadSuccess, onFail, 
	 	{ 
	 	quality: 50, 
		encodingType: Camera.EncodingType.PNG, 
		destinationType: navigator.camera.DestinationType.FILE_URI
		 });
		 
		 loaded = true;
	} 
}

function onPhotoLoadSuccess(photoUri) { 
document.getElementById('photo').src = photoUri; 
} 

function onFail(message) {
	 alert('Failed because: ' + message);
	  }


// JavaScript Document



function getReport(id){
	
	
$.get("http://b2b.bloodhoundapps.com/rest/getreport/?id=" +id, function (data) {
    //var $response = $(data);

var $reportcontent= "<h1>Report Submitted</h1>" +
	


"<ul data-role='listview' icon=''><li>" + data[0].busnessname +
"</li><li>" + data[0].employee +
"</li><li>" + data[0].itemleft +
"</li><li>" + data[0].comments +

"</li><li>Rating=" + data[0].rating + "</li></ul>" +
 "<img style='width:250px; height:250px;' id='rpicture' src='"+ data[0].picture +"' />" + "<br>TimeStamp=" + data[0].createddate ;






	
	var $messageDiv = $('#reportcontent'); // get the reference of the div

$messageDiv.show().html($reportcontent); // show and set the message
//$('#reportcontent').html($response.find('#reportcontent').html()); //form
});
$('#storelist').listview('refresh');
$('#myreports').listview('refresh');
$.mobile.changePage( $("#page4"));
	
	}

function postReport(){
	//get values
	
var $user=$("input#username").val();
var $password=$("input#password").val();
	
	
var busnessname=$("input#busnessname").val();
var employee= $("input#employee").val();
var itemleft=$("input#itemleft").val();
var comments=$("input#comments").val();
var rating=$("input#rating").val();
var picture=$("input#picturedata").val();
var ruser=$("input#ruser").val();
var rgps=$("input#rgps").val();
var rstore= $("input#rstore").val();

var image = document.getElementById('thumb');
$picture = image.src 

$.post("http://b2b.bloodhoundapps.com/rest/newReport/?" + $("form").serialize(), 

{picture: $picture},

/* $.post("http://b2b.bloodhoundapps.com/rest/newReport/",
 { busnessname: busnessname, 
   employee: employee,
   itemleft: itemleft, 
   comments: comments,
   rating: rating,
   picture: picture,
   ruser: ruser,
   rgps: rgps,
   rstore: rstore }, */
	
   function(data) {
 
	if (data===null){
		//error message
		 $.mobile.changePage( $("#page3"));
		 var $messageDiv = $('#reportcontent'); // get the reference of the div
                 $messageDiv.show().html('ReportWritten'); // show and set the message
		
		 }
	
	else{
		//working message
		
		$.mobile.changePage( $("#page4"));
		getReport(data.id);
                
                
                
		// var $messageDiv = $('#errmsg'); // get the reference of the div
		//$messageDiv.show().html('Wrong user/password - try again');
		//	 var $messageDiv = $('#reportcontent'); // get the reference of the div
//$messageDiv.show().html('ReportWritten'); // show and set the message
	
	 }; 
   
});
}
   
function tryLogin(){
   

var user; 
user= $("input#user").val();  
var password;
password= $("input#password").val();  

var dataString;

$.post("http://b2b.bloodhoundapps.com/rest/login/", { user: user, password: password},
   function(data) {
     if (data===null){
		// $.mobile.changePage( $("#page"));
		
           
           var $messageDiv = $('#errmsg'); // get the reference of the div
                $messageDiv.show().html('Wrong user/password - try again'); // show and set the message
		 //window.location.replace("index.html");
		 }
	 else {
            localStorage.username=user;
                 loadStores()	
	
		 };
	 
	
   });
   
  
	}
	
function loadStores(user){
$('#addreport')[0].reset();
           
           
           
          $.get("http://b2b.bloodhoundapps.com/rest/stores/?users=" + localStorage.username,
                function(data){                   
                var items = [];
                var ListHTM=""; 
                    $.each(data, function(i, item) {
                ListHTM = ListHTM +  "<li><a class='ui-link-inherit' onClick=\"newReport('" + item.StoreName + "');\">" + item.StoreName + "</a>" +  " </li>";
		 }); 
   
    
           var $StoreListDiv = $('#storelist'); // get the reference of the div
                $StoreListDiv.show().html(ListHTM); // show and set the message
   
             $('#storelist').listview('refresh');
			$('#myreports').listview('refresh');
                     
       
                  });
           
           $.mobile.changePage($("#page2"));
	
   
}   
       
//	$.get('http://b2b.bloodhoundapps.com/rest/stores/?user=' + localStorage.username, function(data) {
	
	//$('.result').html(data);
	//alert(data);
	
	
//		var items = [];
//var preli = "<div class='ui-btn-inner ui-li' aria-hidden='true'><div class='ui-btn-text'>";

//var postli = "</div><span class='ui-icon ui-icon-arrow-r ui-icon-shadow'></span></div>";
  // $.each(data, function(i, item) {

        
//	items.push(preli + "<li><a class='ui-link-inherit' onClick=\"newReport('" + item.StoreName + "');\">" + item.StoreName + "</a>" + postli +" </li>");
		 
		 
		  
		  

  // });  // close each()

   //$('ul#storelist').append( items.join('') );
//	    $('ul').listview();
//		$('ul').listview('refresh');
//	}
        
		

//$.mobile.changePage( $("#page2"));

//}
		
function loadReports(){

	
	$.getJSON('http://b2b.bloodhoundapps.com/rest/usrreports/?user=' + localStorage.username, function(data) {
	//
	
		var items = [];


   $.each(data, function(i, item) {

        
		  items.push("<li><a onClick=\"getReport('" + item.id + "');\">" + item.busnessname + "</a></li>");
		  

   });  // close each()

$('#myreports').empty()
  $('#myreports').append( items.join('') );
		$('ul').listview();

$('#storelist').listview('refresh');
$('#myreports').listview('refresh');

})
			$.mobile.changePage( $("#page5"));
			
			$('#myreports').listview('refresh');
		
			}
		
	function newReport(store){ruser
		
		getGeolocation("now");

		$.mobile.changePage( $("#page3"));
	
$('input[name=ruser]').val(localStorage.username);
$('input[name=rstore]').val(store);
$('#reportstorename').html(store);
var image = document.getElementById('thumb');
image.src = "";


		
		}
		
function getLocation(){
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(showPosition);
    }
  else{x.innerHTML="Geolocation is not supported by this browser.";}
  }
	



function getPic() {
    
navigator.camera.getPicture(show_pic, fail, { 

quality : 75, destinationType: Camera.DestinationType.DATA_URL,
targetWidth: 250,
  targetHeight: 250

});} 


function show_pic(uri) { 
    
var image = document.getElementById('thumb');
image.src = "data:image/png;base64, "  + uri;

//var picturedata = document.getElementById('picturedata');
//picturedata.value = uri; 
} 




function fail(msg) {
    alert(msg);
}


function getGeolocation(now)
 { // get the user's gps coordinates and display map var
 
  options = { 
  maximumAge: 3000,
   timeout: 5000, 
   enableHighAccuracy: true 
   }; 
   navigator.geolocation.getCurrentPosition(loadMap, geoError, options); 
   
   }
   
   function loadMap(position) { 
   
   
   mygps=position.coords.latitude + "," + position.coords.longitude;
   
  // alert (mygps);
   
   $('input[name=rgps]').val(mygps);
   
   
   }

function geoError(error) { 
alert('GeoLocation Error - Make sure you have your phone setup properly: ' + error.code + '\ n' + 
'message: ' + error.message + '\ n');
 
  $('input[name=gps]').val(error.message);}


