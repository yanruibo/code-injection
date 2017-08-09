



		if (window.location.hash!='') {
			window.location.hash='';
		}
		$(function() {
			$( "body>[data-role='panel']" ).panel();
			// Reseteamos el window location hash al inicio (util en caso de crash)
			/*
			if (window.location.hash!='') {
				jQuery.mobile.navigate('');
			}
			*/
		});
			/*
		$(window).load(function() {
			usig.ComoLlego.setUpLanguage();
			if ($(":mobile-pagecontainer").pagecontainer("getActivePage").attr('id')!='main') {
				$.mobile.navigate('#main');				
			}
		});
			*/			
	


		// $(document).on('pagecreate', usig.ComoLlego.init);

		$('#main' ).live('pagecreate', usig.ComoLlego.init);
	

		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  		ga('create', 'UA-10722425-19', 'auto');
  		ga('set', 'forceSSL', true);
  		ga('require', 'displayfeatures');
  		ga('send', 'pageview');
	




		$(function() {
			try {
				return localStorage.removeItem( 'comollego_lang');
			} catch(e) {};			
			window.location='index.html';
		});
	








    (function() {
      var jasmineEnv = jasmine.getEnv();
      jasmineEnv.updateInterval = 1000;

      var trivialReporter = new jasmine.TrivialReporter();

      jasmineEnv.addReporter(trivialReporter);

      jasmineEnv.specFilter = function(spec) {
        return trivialReporter.specFilter(spec);
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
  


































        var map = L.map('map');

        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Map data &copy; OpenStreetMap contributors'
        }).addTo(map);

        var sidebar = L.control.sidebar('sidebar', {
            closeButton: false,
            position: 'right'
        });
        map.addControl(sidebar);

        setTimeout(function () {
            sidebar.show();
        }, 500);


        var markers = [];

        for (var x = -120; x < 120; x += 20) {
            for (var y = -80; y < 80; y += 10) {
                var marker = L.marker([x, y]).addTo(map);
                marker.options.title = [x, y].join(',');
                markers.push(marker);
            }
        }

        map.on('move', function() {
            // construct an empty list to fill with onscreen markers
            var inBounds = [],
            // get the map bounds - the top-left and bottom-right locations
                bounds = map.getBounds();

            // for each marker, consider whether it is currently visible by comparing
            // with the current map bounds
            for (var i = 0, len = markers.length; i < len; i++) {
                var marker = markers[i];
                if (bounds.contains(marker.getLatLng())) {
                    inBounds.push(marker.options.title);
                }
            }

            // display a list of markers.
            sidebar.setContent(inBounds.join('<br>\n'));
        });

        map.setView([37, -77], 5);
    




        var map = L.map('map');
        map.setView([51.2, 7], 9);

        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Map data &copy; OpenStreetMap contributors'
        }).addTo(map);

        var leftSidebar = L.control.sidebar('sidebar-left', {
            position: 'left'
        });
        map.addControl(leftSidebar);

        var rightSidebar = L.control.sidebar('sidebar-right', {
            position: 'right'
        });
        map.addControl(rightSidebar);

        setTimeout(function () {
            leftSidebar.toggle();
        }, 500);

        setTimeout(function () {
            rightSidebar.toggle();
        }, 2500);

        setInterval(function () {
            leftSidebar.toggle();
        }, 5000);

        setInterval(function () {
            rightSidebar.toggle();
        }, 7000);
    




        var map = L.map('map');
        map.setView([51.2, 7], 9);

        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Map data &copy; OpenStreetMap contributors'
        }).addTo(map);

        var sidebar = L.control.sidebar('sidebar', {
            closeButton: true,
            position: 'left'
        });
        map.addControl(sidebar);

        setTimeout(function () {
            sidebar.show();
        }, 500);

        var marker = L.marker([51.2, 7]).addTo(map).on('click', function () {
            sidebar.toggle();
        });

        map.on('click', function () {
            sidebar.hide();
        })

        sidebar.on('show', function () {
            console.log('Sidebar will be visible.');
        });

        sidebar.on('shown', function () {
            console.log('Sidebar is visible.');
        });

        sidebar.on('hide', function () {
            console.log('Sidebar will be hidden.');
        });

        sidebar.on('hidden', function () {
            console.log('Sidebar is hidden.');
        });

        L.DomEvent.on(sidebar.getCloseButton(), 'click', function () {
            console.log('Close button clicked.');
        });
    
