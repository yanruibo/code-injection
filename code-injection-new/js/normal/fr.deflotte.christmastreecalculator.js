



			var refreshBodySize = function() {
				$('body').height($(window).height());
			}
			refreshBodySize();
			$(window).resize(function() {refreshBodySize();});
			
			window.setInterval(function() {
				$('#baubles .value').html(Math.round(Math.sqrt(17) / 20 * $('#size').val()));
				$('#star .value').html(Math.round($('#size').val() / 10));
				$('#tinsel .value').html(Math.round(13 * Math.PI / 8 * $('#size').val()));
				$('#light .value').html(Math.round(Math.PI * $('#size').val()));
			}, 500);
			
			document.addEventListener('deviceready', onDeviceReady, false);
			function onDeviceReady() {
				document.addEventListener("backbutton", function() {
					navigator.app.exitApp();
				}, false);
			}
		
