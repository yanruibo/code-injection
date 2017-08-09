



 
    // Your code goes here.

function search()
{
	$(".tablecontainer tr").show();
	x=$(".tablecontainer tr:not(:contains('" + document.getElementById("searchfor").value + "'))").hide();	
}

$( document ).ready(function() {

/*	$("#searchfor").keyup(function (e) {
	    if (e.keyCode == 13) {
		$("#go").click();
	    }
	});
	
	$( "#go" ).click(function( event ) {
		$(".tablecontainer tr").show();
		x=$(".tablecontainer tr:not(:contains('" + document.getElementById("searchfor").value + "'))").hide();
	});*/
	
	$("#searchfor").focus();
});

	




 
    // Your code goes here.

function search()
{
	$(".tablecontainer tr").show();
	x=$(".tablecontainer tr:not(:contains('" + document.getElementById("searchfor").value + "'))").hide();	
}

$( document ).ready(function() {

/*	$("#searchfor").keyup(function (e) {
	    if (e.keyCode == 13) {
		$("#go").click();
	    }
	});
	
	$( "#go" ).click(function( event ) {
		$(".tablecontainer tr").show();
		x=$(".tablecontainer tr:not(:contains('" + document.getElementById("searchfor").value + "'))").hide();
	});*/
	
	$("#searchfor").focus();
});

	
