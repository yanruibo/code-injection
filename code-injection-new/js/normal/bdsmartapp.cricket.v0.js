












//$.ready(function(){
function init() {
    document.addEventListener("deviceready", load, true);
}
function load(){
	$('.lveStText').css('color', 'black');	
	var src="http://cricket.bdsmartapp.com/php/data.json.php";
	$.ajax({
		url: src,dataType: "json",
		data: {request:'live' },
		success: function(data) {
				
			$('#LiveScore').css('background-image', 'url("img/background.jpg")');
			$("#LiveScore").html(data[0].html);
			if (data[0].refreshRate>0){
				var timer = setInterval( function() {
						$.ajax({
							url: src,
							dataType: "json",
							data: {request:'live' },
							success: function(data) {
								$("#LiveScore").html(data[0].html);
								
								if(data[0].refreshRate==0)clearInterval(timer);	
							}
						});
				  }, data[0].refreshRate);
			}
			//else
			//	clearInterval(timer);
		},
		error: function(data) {
			$('#LiveScore').css('background-image', 'url("img/background.jpg")');
			$('#LiveScore').css('color', 'white');		
			$('#LiveScore').css('height', '150px');
			$("#LiveScore").html("Error - Please check your network connection.");}
	});
	$.ajax({
		url: src,dataType: "json",
		data: {request:'player',tt:1 },
		success: function(data) {
			//if(data.news==null) return false;
			//alert(data)
			for(r in data){
				var img='http://cricket.bdsmartapp.com/bdwi/t_image'+data[r].cric_player_id+'.jpg';
				$("#team1").append('<li><a href="'+data[r].cricinfo_url+'"><img height=75px src="'+img+'">'+data[r].player_name+'<p>'+data[r].player_skill+'</p></a></li>');
			}
			$("#team1").listview("refresh");
		},
		error: function(data) {$("#LiveScore").html("Error");}
	});
	$.ajax({
		url: src,dataType: "json",
		data: {request:'player',tt:2 },
		success: function(data) {
			//if(data.news==null) return false;
			//alert(data)
			for(r in data){
				var img='http://cricket.bdsmartapp.com/bdwi/t_image'+data[r].cric_player_id+'.jpg';
				$("#team2").append('<li><a href="'+data[r].cricinfo_url+'"><img height=75px src="'+img+'">'+data[r].player_name+'<p>'+data[r].player_skill+'</p></a></li>');
			}
			$("#team2").listview("refresh");
		},
		error: function(data) {$("#LiveScore").html("Error");}
	});
	$.ajax({
		url: src,dataType: "json",
		data: {request:'result' },
		success: function(data) {
			for(r in data){
				$("#result").append('<li>'+data[r].text+'</li>');
			}
			$("#result").listview("refresh");
		},
		error: function(data) {$("#LiveScore").html("Error");}
	});
}
//);
