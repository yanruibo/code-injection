


            // Set virtual screen width size to 640 pixels (横幅640pxに設定)
            monaca.viewport({width: 640});
        


	  $("*").live("touchstart", function() {
      $(this).addClass("active");
    }).live("touchend", function() {
      $(this).removeClass("active");
    });
    document.addEventListener('touchmove', function(ev) {
  ev.preventDefault();
}, false);










	/**/








    //

