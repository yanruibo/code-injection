



        $(document).bind("mobileinit", function() {
            $.mobile.autoInitializePage = false;
            document.addEventListener("deviceready", function(){
                $.mobile.initializePage();
			}, false);
		});
    

