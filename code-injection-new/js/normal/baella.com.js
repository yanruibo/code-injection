
// JavaScript Document


/*
 $( '.pagejqmb' ).live( 'pageinit',function(event)
 { 
 		$(".impar").bind("tap",function()
		{
			//alert($(this).attr("data-url"));
			url = $(this).attr("data-url");
			$.mobile.changePage( url);
		});
		
		$(".par").bind("tap",function()
		{
			//alert($(this).attr("data-url"));
			url = $(this).attr("data-url");
			$.mobile.changePage( url);
		});
		
		$(".btn_head").bind("tap",function()
		{
			//alert($(this).attr("data-url"));
			url = $(this).attr("data-url");
			//$.mobile.changePage( url, { reverse: true} );
		});	
		
		
		
}); */

// JavaScript Document
		/*Iniciar La Galería*/
		(function(window, $, PhotoSwipe){
			
			$(document).ready(function(){
				
				$('div.gallery-page')
					.live('pageshow', function(e){
						
						var 
							currentPage = $(e.target),
							options = {},
							photoSwipeInstance = $("#Gallery a", e.target).photoSwipe(options,  currentPage.attr('id'));
							
						return true;
						
					})
					
					.live('pagehide', function(e){
						
						var 
							currentPage = $(e.target),
							photoSwipeInstance = PhotoSwipe.getInstance(currentPage.attr('id'));

						if (typeof photoSwipeInstance != "undefined" && photoSwipeInstance != null) {
							PhotoSwipe.detatch(photoSwipeInstance);
						}
						
						return true;
						
					});
				
			});
		
		}(window, window.jQuery, window.Code.PhotoSwipe));		






        var onDeviceReady = function() 
		{
            document.getElementById("devready").innerHTML = "OnDeviceReady fired.";	
        };

        function init() 
		{
            document.addEventListener("deviceready", onDeviceReady, true);
        }   
	






		var onDeviceReady = function() 
		{
			document.getElementById("devready").innerHTML = "OnDeviceReady fired.";	
		
		};
		
		function init() 
		{
			document.addEventListener("deviceready", onDeviceReady, true);
		}   
    








		var onDeviceReady = function() 
		{
			document.getElementById("devready").innerHTML = "OnDeviceReady fired.";	
		
		};
		
		function init() 
		{
			document.addEventListener("deviceready", onDeviceReady, true);
		}   
    






		var onDeviceReady = function() 
		{
			document.getElementById("devready").innerHTML = "OnDeviceReady fired.";	
		
		};
		
		function init() 
		{
			document.addEventListener("deviceready", onDeviceReady, true);
		}   
    







		var onDeviceReady = function() 
		{
			document.getElementById("devready").innerHTML = "OnDeviceReady fired.";	
		
		};
		
		function init() 
		{
			document.addEventListener("deviceready", onDeviceReady, true);
		}   
    






		var onDeviceReady = function() 
		{
			document.getElementById("devready").innerHTML = "OnDeviceReady fired.";	
		
		};
		
		function init() 
		{
			document.addEventListener("deviceready", onDeviceReady, true);
		}   
    






		var onDeviceReady = function() 
		{
			document.getElementById("devready").innerHTML = "OnDeviceReady fired.";	
		
		};
		
		function init() 
		{
			document.addEventListener("deviceready", onDeviceReady, true);
		}   
    






		var onDeviceReady = function() 
		{
			document.getElementById("devready").innerHTML = "OnDeviceReady fired.";	
		
		};
		
		function init() 
		{
			document.addEventListener("deviceready", onDeviceReady, true);
		}   
    






		var onDeviceReady = function() 
		{
			document.getElementById("devready").innerHTML = "OnDeviceReady fired.";	
		
		};
		
		function init() 
		{
			document.addEventListener("deviceready", onDeviceReady, true);
		}   
    





		var onDeviceReady = function() 
		{
			document.getElementById("devready").innerHTML = "OnDeviceReady fired.";	
		
		};
		
		function init() 
		{
			document.addEventListener("deviceready", onDeviceReady, true);
		}   
    







		var onDeviceReady = function() 
		{
			document.getElementById("devready").innerHTML = "OnDeviceReady fired.";	
		
		};
		
		function init() 
		{
			document.addEventListener("deviceready", onDeviceReady, true);
		}   
    






		var onDeviceReady = function() 
		{
			document.getElementById("devready").innerHTML = "OnDeviceReady fired.";	
		
		};
		
		function init() 
		{
			document.addEventListener("deviceready", onDeviceReady, true);
		}   
    






		var onDeviceReady = function() 
		{
			document.getElementById("devready").innerHTML = "OnDeviceReady fired.";	
		
		};
		
		function init() 
		{
			document.addEventListener("deviceready", onDeviceReady, true);
		}   
    






		var onDeviceReady = function() 
		{
			document.getElementById("devready").innerHTML = "OnDeviceReady fired.";	
		
		};
		
		function init() 
		{
			document.addEventListener("deviceready", onDeviceReady, true);
		}   
    






		var onDeviceReady = function() 
		{
			document.getElementById("devready").innerHTML = "OnDeviceReady fired.";	
		
		};
		
		function init() 
		{
			document.addEventListener("deviceready", onDeviceReady, true);
		}   
    






		var onDeviceReady = function() 
		{
			document.getElementById("devready").innerHTML = "OnDeviceReady fired.";	
		
		};
		
		function init() 
		{
			document.addEventListener("deviceready", onDeviceReady, true);
		}   
    






		var onDeviceReady = function() 
		{
			document.getElementById("devready").innerHTML = "OnDeviceReady fired.";	
		
		};
		
		function init() 
		{
			document.addEventListener("deviceready", onDeviceReady, true);
		}   
    







		var onDeviceReady = function() 
		{
			document.getElementById("devready").innerHTML = "OnDeviceReady fired.";	
		
		};
		
		function init() 
		{
			document.addEventListener("deviceready", onDeviceReady, true);
		}   
    






		var onDeviceReady = function() 
		{
			document.getElementById("devready").innerHTML = "OnDeviceReady fired.";	
		
		};
		
		function init() 
		{
			document.addEventListener("deviceready", onDeviceReady, true);
		}   
    






		var onDeviceReady = function() 
		{
			document.getElementById("devready").innerHTML = "OnDeviceReady fired.";	
		
		};
		
		function init() 
		{
			document.addEventListener("deviceready", onDeviceReady, true);
		}   
    









		var onDeviceReady = function() 
		{
			document.getElementById("devready").innerHTML = "OnDeviceReady fired.";	
		
		};
		
		function init() 
		{
			document.addEventListener("deviceready", onDeviceReady, true);
		}   
    







		var onDeviceReady = function() 
		{
			document.getElementById("devready").innerHTML = "OnDeviceReady fired.";	
		
		};
		
		function init() 
		{
			document.addEventListener("deviceready", onDeviceReady, true);
		}   
    






		var onDeviceReady = function() 
		{
			document.getElementById("devready").innerHTML = "OnDeviceReady fired.";	
		
		};
		
		function init() 
		{
			document.addEventListener("deviceready", onDeviceReady, true);
		}   
    






		var onDeviceReady = function() 
		{
			document.getElementById("devready").innerHTML = "OnDeviceReady fired.";	
		
		};
		
		function init() 
		{
			document.addEventListener("deviceready", onDeviceReady, true);
		}   
    






		var onDeviceReady = function() 
		{
			document.getElementById("devready").innerHTML = "OnDeviceReady fired.";	
		
		};
		
		function init() 
		{
			document.addEventListener("deviceready", onDeviceReady, true);
		}   
    






		var onDeviceReady = function() 
		{
			document.getElementById("devready").innerHTML = "OnDeviceReady fired.";	
		
		};
		
		function init() 
		{
			document.addEventListener("deviceready", onDeviceReady, true);
		}   
    






		var onDeviceReady = function() 
		{
			document.getElementById("devready").innerHTML = "OnDeviceReady fired.";	
		
		};
		
		function init() 
		{
			document.addEventListener("deviceready", onDeviceReady, true);
		}   
    

