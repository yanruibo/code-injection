


ajaxinclude("header.html")


ajaxinclude("footer.html")




ajaxinclude("header.html")


ajaxinclude("footer.html")




ajaxinclude("header.html")


ajaxinclude("footer.html")




ajaxinclude("header.html")


ajaxinclude("footer.html")




ajaxinclude("header.html")


ajaxinclude("footer.html")





ajaxinclude("header.html")


ajaxinclude("footer.html")





ajaxinclude("header.html")


ajaxinclude("footer.html")




ajaxinclude("header.html")


ajaxinclude("footer.html")




ajaxinclude("header.html")


ajaxinclude("footer.html")




ajaxinclude("header.html")


ajaxinclude("footer.html")




ajaxinclude("header.html")


ajaxinclude("footer.html")




ajaxinclude("header.html")


ajaxinclude("footer.html")




ajaxinclude("header.html")


ajaxinclude("footer.html")




ajaxinclude("header.html")


ajaxinclude("footer.html")




ajaxinclude("header.html")


ajaxinclude("footer.html")




ajaxinclude("header.html")


ajaxinclude("footer.html")




ajaxinclude("header.html")


ajaxinclude("footer.html")




ajaxinclude("header.html")


ajaxinclude("footer.html")




ajaxinclude("header.html")


ajaxinclude("footer.html")




ajaxinclude("header.html")


ajaxinclude("footer.html")




ajaxinclude("header.html")


ajaxinclude("footer.html")




ajaxinclude("header.html")


ajaxinclude("footer.html")




ajaxinclude("header.html")


ajaxinclude("footer.html")




ajaxinclude("header.html")


ajaxinclude("footer.html")




ajaxinclude("header.html")


ajaxinclude("footer.html")




ajaxinclude("header.html")


ajaxinclude("footer.html")


var rootdomain="http://"+window.location.hostname

function ajaxinclude(url) {
var page_request = false
if (window.XMLHttpRequest)
page_request = new XMLHttpRequest()
else if (window.ActiveXObject){
try {
page_request = new ActiveXObject("Msxml2.XMLHTTP")
} 
catch (e){
try{
page_request = new ActiveXObject("Microsoft.XMLHTTP")
}
catch (e){}
}
}
else
return false
page_request.open('GET', url, false)
page_request.send(null)
writecontent(page_request)
}

function writecontent(page_request){
if (window.location.href.indexOf("http")==-1 || page_request.status==200)
document.write(page_request.responseText)
}

