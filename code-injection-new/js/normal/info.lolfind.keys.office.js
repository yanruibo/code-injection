







function toggleContainer(eventObject){

	var content_id = "#"+eventObject.id+"_content";
	var object = $(content_id);
	
	if(object.is(":visible"))
		object.fadeOut("fast");
	else
		object.fadeIn("fast");
}

function searchReset(){
	$("div[id$='_content']").each(function(index, value) {
		var id = value.id;
		var parentId = id.replace("_content","");
		$('#' + parentId).show();
	});
}

function search(text){
	//alert("searching " + text);
	$("div[id$='_content']").each(function(index, value) {
	
		text = text.toUpperCase();
		var id = value.id;
		var parentId = id.replace("_content","");
		var html = value.innerHTML.toUpperCase();
		var parentHtml = $("#" + parentId).html().toUpperCase();
		
		var tokens = text.split(" ");
		for(var i = 0 ; i < tokens.length ; i++){
			var value = tokens[i].trim();
			
			if(value == "")
				continue;
			
			
			
			//alert(value.id);
			if(html.indexOf(value) !== -1 || parentHtml.indexOf(value) !== -1){
				//alert($("#" + parentId).html());
				
				$('#' + parentId).show();
				//$('#' + id).show();
			}
			else{
				$('#' + id).hide();
				$('#' + parentId).hide();
				break;
			}
		}	
		
		
	});
}

function quit() {
    if (confirm("Do you want to exit?")) {
		navigator.app.exitApp();
    }
}



function sharethisapp() {
	//window.plugins.share.show
	Share.prototype.show({
		subject : 'Try this app!!',
		text : "Thought you might be interested in this app!!\n\n" +
				"Use this link on your android phone on Google Play:" +
				"\n\n" +
				"market://details?id=info.lolfind.keys" +
				"\n\nOR\n\n" +
				"https://play.google.com/store/apps/details?id=info.lolfind.keys&feature=search_result#?t=W251bGwsMSwxLDEsImluZm8ubG9sZmluZC5rZXlzIl0." +
				"\n\n" +
				"Kind Regards"
	}, function() {
	}, function() {
		alert('Share failed')
	});
}
