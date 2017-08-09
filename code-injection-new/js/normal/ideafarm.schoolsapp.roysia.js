


      $(document).on("mobileinit", function(){
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        $.mobile.defaultPageTransition = 'none';
        $.mobile.touchOverflowEnabled = true;
      });
    








      //************************
      // APP WIDE CONSTANTS SET HERE
      //************************
      var drupalUserID = "91";
      var sa_name = "Roysia Middle School"
      var sa_address = "Burns Road, Royston, Hertfordshire SG8 5EQ";
      var twitterUser = '';
      var lastRefresh = 0;
      
      // WP7 LOCAL STORAGE RESET (NOT USED ON OTHER DEVICES)
      function checkWP7ForceRefresh() {
        $.getJSON("http://www.schoolsappadmin.com/application-twitter-username/" + drupalUserID,
        function(data){
          $.each(data.nodes, function(i, item){
            serversRefresh = item.node.refresh;
          });
          var lastForcedRefresh = localStorage.getItem('lastRefresh');
          if (!lastForcedRefresh) {
            localStorage.setItem('lastRefresh', serversRefresh);
          }
          
          if (serversRefresh > lastForcedRefresh) {
            localStorage.clear();
            localStorage.setItem('lastRefresh', serversRefresh);
          }
        });
      }
         
      document.addEventListener("deviceready", onDeviceReady, false);
      
      // If deploying to WP7, uncomment the next line!
      //checkWP7ForceRefresh();
    