



      $(document).on('pageshow', '#gerbera', function() {
        $('input.cultivation_area').change();
      });
    



        function initialize() {
          var mapcanvas = document.getElementById('map-canvas');
          var lat_lng = new google.maps.LatLng(51.959465, 4.222724);
          var mapOptions = {
            zoom: 15,
            center: lat_lng,
            scrollwheel: false,
            panControl: false,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            overviewMapControl: false
          }
          if (mapcanvas != null) {
            var map = new google.maps.Map(mapcanvas, mapOptions);
             var marker = new google.maps.Marker({
              map: map,
              position: lat_lng,
              title: 'Agrolux'
            });
          }
        }
        setTimeout(initialize, 3000);
        //google.maps.event.addDomListener(window, 'load', initialize);
      



      $(document).on('pageshow', '#tomaat', function() {
        $('input.cultivation_area').change();
      });
    








      $(document).on('pageshow', '#rozen', function() {
        $('input.cultivation_area').change();
      });
    


      $(document).on('pageshow', '#chrysant', function() {
        $('input.cultivation_area').change();
      });
    





      $(document).on('pageshow', '#tomaat', function() {
        $('input.cultivation_area').change();
      });
    



      $(document).on('pageshow', '#mijn', function() {
        $('input.cultivation_area').change();
      });
    


      $(document).on('pageshow', '#rozen', function() {
        $('input.cultivation_area').change();
      });
    


      $(document).on('pageshow', '#gerbera', function() {
        $('input.cultivation_area').change();
      });
    


      $(document).on('pageshow', '#mijn', function() {
        $('input.cultivation_area').change();
      });
    


        function initialize() {
          var mapcanvas = document.getElementById('map-canvas');
          var lat_lng = new google.maps.LatLng(51.959465, 4.222724);
          var mapOptions = {
            zoom: 15,
            center: lat_lng,
            scrollwheel: false,
            panControl: false,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            overviewMapControl: false
          }
          if (mapcanvas != null) {
            var map = new google.maps.Map(mapcanvas, mapOptions);
             var marker = new google.maps.Marker({
              map: map,
              position: lat_lng,
              title: 'Agrolux'
            });
          }
        }
        setTimeout(initialize, 3000);
        //google.maps.event.addDomListener(window, 'load', initialize);
      



      $(document).on('pageshow', '#chrysant', function() {
        $('input.cultivation_area').change();
      });
    



    function initialize() {
      var mapcanvas = document.getElementById('map-canvas');
      var lat_lng = new google.maps.LatLng(51.959465, 4.222724);
      var mapOptions = {
        zoom: 15,
        center: lat_lng,
        scrollwheel: false,
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: false
      }
      if (mapcanvas != null) {
        var map = new google.maps.Map(mapcanvas, mapOptions);
         var marker = new google.maps.Marker({
          map: map,
          position: lat_lng,
          title: 'Agrolux'
        });
      } else { alert('no'); }
    }
    setTimeout(initialize, 1000);
    //google.maps.event.addDomListener(window, 'load', initialize);
    








//$("div[data-role*='page']").live('pageshow', function(event, ui) {
function updateArma600W(par) {
  $("#arma600").html((1010/par).toFixed(2));
}

function updateArma1000W(par) {
  $("#arma1000").html((1790/par).toFixed(2));
}

$(document).on("pageshow", "div[data-role*='page']", function(event, ui) {

  var changeProg = false;

  $("#lux600p").bind("change", function() {
    if (!changeProg) {
      var lux = ($("#lux600").slider().val());
      var par = Math.floor(lux/76);
      changeProg = true;
      $("#par600").val(par).slider('refresh');
      updateArma600W(par);
    } else {
      changeProg = false;
    }
  });

  $("#par600p").change(function() {
    if (!changeProg) {
      var par = ($("#par600").slider().val());
      var lux = Math.floor(par*76);

      changeProg = true;
      $("#lux600").val(lux).slider('refresh');
      updateArma600W(par);
    } else {
      changeProg = false;
    }
  });

  $("#lux1000p").bind("change", function() {
    if (!changeProg) {
      var lux = ($("#lux1000").slider().val());
      var par = Math.floor(lux/76);
      changeProg = true;
      $("#par1000").val(par).slider('refresh');
      updateArma1000W(par);
    } else {
      changeProg = false;
    }
  });

  $("#par1000p").change(function() {
    if (!changeProg) {
      var par = ($("#par1000").slider().val());
      var lux = Math.floor(par*76);

      changeProg = true;
      $("#lux1000").val(lux).slider('refresh');
      updateArma1000W(par);
    } else {
      changeProg = false;
    }
  });
  $(".cultivation_area").change(calculate_cultivation);
  $("#mijn_par").change(calculate_cultivation);
  $("#mijn_hours").change(calculate_cultivation);

  function calculate_cultivation() {
    var c = $(this).attr('data-c');
    var area = $(this).val();
    if (c == 'mijn') {
      area = $("#mijn_area").val();
    }
    var p = $(this).attr('data-par');
    if (p == 0) {
      p = $('#mijn_par').val();
    }
    var w1000 = p / 1790;
    var w600 = p / 1010;

    var n1000 = (area*w1000).toFixed(0);
    var n600 = (area*w600).toFixed(0);
    $('#' + c + 'a1000w').html(n1000);
    $('#' + c + 'a600w').html(n600);

    var v1000 = (n1000 * 1040 / area).toFixed(0);
    var v600 = (n600 * 635 / area).toFixed(0);
    $('#' + c + 'v1000w').html(v1000);
    $('#' + c + 'v600w').html(v600);

    var h = $(this).attr('data-hours');
    if (h == 0) {
      h = $('#mijn_hours').val();
    }
    var t1000 = (h * area * v1000 / 1000000).toFixed(0);
    var t600 = (h * area * v600 / 1000000).toFixed(0);
    $('#' + c + 't1000w').html(t1000);
    $('#' + c + 't600w').html(t600);
  }
});

