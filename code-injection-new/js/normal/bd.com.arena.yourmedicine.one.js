




 var admob_vars = {
 pubid: 'a14e32998b4f4c7', // publisher id
 bgcolor: '525252', // background color (hex)
 text: 'FFFFFF', // font-color (hex)
 test: false // test mode, set to false to receive live ads
};






var admob_vars = {
 pubid: 'a14e32998b4f4c7', // publisher id
 bgcolor: '525252', // background color (hex)
 text: 'FFFFFF', // font-color (hex)
 test: false // test mode, set to false to receive live ads
};




var admob_vars = {
 pubid: 'a14e32998b4f4c7', // publisher id
 bgcolor: '525252', // background color (hex)
 text: 'FFFFFF', // font-color (hex)
 test: false // test mode, set to false to receive live ads
};




var admob_vars = {
 pubid: 'a14e32998b4f4c7', // publisher id
 bgcolor: '525252', // background color (hex)
 text: 'FFFFFF', // font-color (hex)
 test: false // test mode, set to false to receive live ads
};




var admob_vars = {
 pubid: 'a14e32998b4f4c7', // publisher id
 bgcolor: '525252', // background color (hex)
 text: 'FFFFFF', // font-color (hex)
 test: false // test mode, set to false to receive live ads
};



$(document).ready(function(){
loadPage();
});
function loadPage(url) {
if (url == undefined) {
$('#container').load('index.html #header ul', hijackLinks);
} else {
$('#container').load(url + ' #content', hijackLinks);
}
}
function hijackLinks() {
$('#container a').click(function(e){
e.preventDefault();
loadPage(e.target.href);
});
}


var admob_vars = {
 pubid: 'a14e32998b4f4c7', // publisher id
 bgcolor: '525252', // background color (hex)
 text: 'FFFFFF', // font-color (hex)
 test: false // test mode, set to false to receive live ads
};




var admob_vars = {
 pubid: 'a14e32998b4f4c7', // publisher id
 bgcolor: '525252', // background color (hex)
 text: 'FFFFFF', // font-color (hex)
 test: false // test mode, set to false to receive live ads
};




var admob_vars = {
 pubid: 'a14e32998b4f4c7', // publisher id
 bgcolor: '525252', // background color (hex)
 text: 'FFFFFF', // font-color (hex)
 test: false // test mode, set to false to receive live ads
};




 var admob_vars = {
 pubid: 'a14e32998b4f4c7', // publisher id
 bgcolor: '525252', // background color (hex)
 text: 'FFFFFF', // font-color (hex)
 test: false // test mode, set to false to receive live ads
};




var admob_vars = {
 pubid: 'a14e32998b4f4c7', // publisher id
 bgcolor: '525252', // background color (hex)
 text: 'FFFFFF', // font-color (hex)
 test: false // test mode, set to false to receive live ads
};



navigator.notification.alert(
    "There was an error connecting to the Internet. Would you like to retry?.",
    "No Internet connection",
    "No",
    "Yes",
    {
        onClose: function(buttonIndex) {
            if (buttonIndex == 1)
                retryConnection();
        }
    }
);

function loadHTML(node, url, timeout) {
    if (timeout == undefined)
        timeout = 10000;

    var req = new XMLHttpRequest();
    var timer = setTimeout(function() {
        try {
            req.abort();
        } catch(e) {}
        navigator.notification.loadingStop();
    } );

    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            if (req.status < 300) {
                clearTimeout(timer);

                var html = req.responseText;
                html.replace(/.*<body>/, '');
                html.replace(/<\/body>.*/, '');

                node.innerHTML = html;
            }
            navigator.notification.loadingStop();
            delete req;
            delete node;
        }       
    };          
    req.open('GET', url, true);
    req.send();
}
