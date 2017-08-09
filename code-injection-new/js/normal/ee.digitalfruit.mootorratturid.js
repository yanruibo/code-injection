



function trackPageView()
{
	window.plugins.analytics.start(
		function(){
			console.log("Start: success");
			window.plugins.analytics.trackPageView(
				"Mootorratturid app launcher",
				 function(){
					window.plugins.analytics.stop(
						function(){
							console.log("Stop: success");
						},
						function(){
							console.log("Stop: failure");
						}
					);
				 },
				 function(){
					console.log("Track: failure");
				 }
			);
		},
		function(){
			console.log("Start: failure");
			window.plugins.analytics.trackPageView(
				"Mootorratturid app launcher",
				 function(){
							console.log("Track: success");
				},
				 function(){
					console.log("Track: failure");
				 }
			);
		}
    );
}
document.addEventListener("deviceready", trackPageView, false);

