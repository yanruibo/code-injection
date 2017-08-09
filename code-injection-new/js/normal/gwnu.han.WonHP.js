



        $(document).bind("mobileinit", function() {
            $.mobile.autoInitializePage = false;
            document.addEventListener("deviceready", function(){
                $.mobile.initializePage();
			}, false);
		});


		function doMove() {
			var dong = document.getElementById("dong");
			var path = dong[dong.selectedIndex].value + ".php";
			$.mobile.changePage(path);
		}