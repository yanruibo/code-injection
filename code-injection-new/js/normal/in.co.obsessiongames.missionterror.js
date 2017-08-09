




		jQuery(window).resize(function() {
			cr_sizeCanvas(jQuery(window).width(), jQuery(window).height());
		});
		
		document.addEventListener("deviceready", function ()
		{
			window["c2iscordova"] = true;
			
			// Create new runtime using the c2canvas
			cr_createRuntime("c2canvas");
			
			document.addEventListener("pause", function() {
				cr_setSuspended(true);
			}, false);
			
			document.addEventListener("resume", function() {
				cr_setSuspended(false);
			}, false);
			
		}, false);
	
    
