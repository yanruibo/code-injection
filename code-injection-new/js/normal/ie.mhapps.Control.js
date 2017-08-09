




    



























































            (function() {
                var jasmineEnv = jasmine.getEnv();
                jasmineEnv.updateInterval = 1000;

                var htmlReporter = new jasmine.HtmlReporter();

                jasmineEnv.addReporter(htmlReporter);

                jasmineEnv.specFilter = function(spec) {
                    return htmlReporter.specFilter(spec);
                };

                var currentWindowOnload = window.onload;

                window.onload = function() {
                    if (currentWindowOnload) {
                        currentWindowOnload();
                    }
                    execJasmine();
                };

                function execJasmine() {
                    jasmineEnv.execute();
                }
            })();
        


















































         	if (navigator.userAgent.toLowerCase().indexOf('webkit') > -1) {
         		
         	}  else {
         		document.write('<link href="nonwebkit.css" rel="stylesheet" media="screen" type="text/css" />');
         	}


















// JavaScript Document


var iWebkit;

if (!iWebkit) {
	
	iWebkit = window.onload = function () {
			function fullscreen() {
				var a = document.getElementsByTagName("a");
				for (var i = 0; i < a.length;i++) {
					if (a[i].className.match("noeffect")) {
					}
				else {
						a[i].onclick = function () {
							window.location = this.getAttribute("href");
							return false;
						};
					}
				}
			}

			function hideURLbar() {
				window.scrollTo(0, 0.9);
			}
			iWebkit.init = function () {
				fullscreen();
				hideURLbar();
			};
			iWebkit.init();
		};
}

















document.write('<meta content="yes" name="apple-mobile-web-app-capable" />');
document.write('<meta charset="utf-8"/>');
document.write('<meta content="minimum-scale=1.0, width=device-width, maximum-scale=0.6667, user-scalable=no" name="viewport" />');
document.write('<meta name="Description" content="Psychosis & Mental Health Services for the early Detection of psychosis and effective recovery" />');
document.write('<meta name="Keywords" content="psychosis, mental, health, schizophrenia, illness, nutjob, crazy, fruit cake, mad, hearing voices, delusions" />');

document.write('<link href="developer-style-edit.css" rel="stylesheet" media="screen" type="text/css" />');
document.write('<script src="developer-functions.js" type="text/javascript"></script>');
document.write('<script type="text/javascript" src="analytics.js"></script>');
document.write('<LINK REL="SHORTCUT ICON" href="favicon.ico">');
if (navigator.userAgent.toLowerCase().indexOf('webkit') > -1) {
         		
}  else {
	document.write('<link href="nonwebkit.css" rel="stylesheet" media="screen" type="text/css" />');
}









