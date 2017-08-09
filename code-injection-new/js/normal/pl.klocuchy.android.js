





	

	function _log(x){ if (typeof(console)!='undefined') if (console.log) console.log(x); }
	
  //$.mobile.autoInitializePage = false;
  $.mobile.defaultPageTransition = 'none';
  $.mobile.defaultPageTransition = 'none';
  $.mobile.defaultDialogTransition = 'none';
  $.mobile.allowCrossDomainPages = true;
  $.mobile.phonegapNavigationEnabled = true;
	$(document).on("mobileinit", function(){
		$.mobile.loader.prototype.options.text = "ładowanie";
		$.mobile.loader.prototype.options.textVisible = true;
		$.mobile.loader.prototype.options.theme = "a";
		$.mobile.loader.prototype.options.html = "";
	});	

	
  if (typeof(Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function() {
      return this * Math.PI / 180;
    }
  }

	function geo_distance(lat2, lon2, lat1, lon1){
	
    var R = 6371; // km
    
    var dLat = (lat2-lat1).toRad();
    var dLon = (lon2-lon1).toRad();
    var lat1 = lat1.toRad();
    var lat2 = lat2.toRad();

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;

    return Math.round(d*1000)/1000; 
	}
	
	
  
  function refresh_distances(position){
      $('.js-geo-distance').each(function(){
        //_log(position.coords.latitude);
        //_log(geo_distance(parseFloat($(this).data('lat')), parseFloat($(this).data('lng')), position.coords.latitude, position.coords.longitude));
        if (position){
          $(this).html(geo_distance(parseFloat($(this).data('lat')), parseFloat($(this).data('lng')), position.coords.latitude, position.coords.longitude) + ' km (±' + position.coords.accuracy + ' m)'); 
        }else{
          $(this).html('');
        }
      });
  }

  var watchID = null;
  // PhoneGap is ready
  //
  
  function page_refresh(id){
      var el = $('#'+id);
      $.mobile.loading('show');
      $.ajax({
        url:$(el).data('kanurl'),
        //dataType:'html',
        dataType:'jsonp',
        success: function(data){
          //_log(data);
          window.localStorage.setItem(id, data.html);
          $(el).html(window.localStorage.getItem(id));
          //$(document).trigger('create');
        },
        error:function(){
          if (window.localStorage.getItem(id).length){
            $(el).html(window.localStorage.getItem(id));
          }
          //$(document).trigger('create');
        },
        complete:function(){
          $.mobile.loading('hide');
          
        }
      });    
  }
  
  function onDeviceReady() {
    //get_location();
    //setInterval(get_location, 60000);
    
    if (navigator.geolocation){
      var options = { timeout: 10000 };
      watchID = navigator.geolocation.watchPosition(refresh_distances, function(){  refresh_distances(null); }, options);
    }
  
  
  
    $('div[data-kancache=true]').each(function(){
      //_log($(this).data('kanurl'));
      var e = this;
      if (window.localStorage.getItem($(e).attr('id'))!=''){
        $(e).html(window.localStorage.getItem($(e).attr('id')));
      }
      page_refresh($(e).attr('id'));
    });
    
    $(document).bind("pagechange", function(e, ui){
          try { 
            $('.js-externallinks a', e.target).each(function(){
              var url = jQuery.mobile.path.parseUrl($(this).attr('href'));
              if (url.host=="") $(this).attr('href', 'http://zgorzelec.info/' + $(this).attr('href'));
              $(this).unbind('click').bind('click', function(){ window.open($(this).attr('href'), '_system'); return false; });
            });    
          }catch(err){}
          $.mobile.loading('hide');
    });
    
    //$.mobile.initializePage(); 
    //$('body').klocuchy({ url_db:'', url_shop:'' });
    
    //setInterval(refresh_distances, 10000);
  }

  //====================================================================
  
	$(function(){ 
    document.addEventListener("deviceready", onDeviceReady, false);
    $(function(){ onDeviceReady(); }); //NO PHONEGAP
	});

	





function checkConnection() {
    var networkState = navigator.network.connection.type;

    /*
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';

    alert('Connection type: ' + states[networkState]);
    */
    return (Connection.NONE != networkState);
}

	var sw_json = {};
	function _load_data(){
	 $.ajax({
		 url: 'http://android.skywindows.net/android/android.json',
		 type: 'get',
		 dataType:'json',
		 cache: false,
		 success:function(json){
			//console.log('success');
			sw_json = $.extend({}, json);
			//console.log(json);
			for (x in sw_json.android.playlists){
				//console.log(x);
				$('#playlists .js-playlists').append('<li><a href="#playlist">' + x + '</a></li>');
			}
			$('#playlists .js-playlists').listview('refresh');
		 }
		 //,
		 //complete:function(){ console.log('complete'); }
	 });
	};
	
	$(function(){ _load_data(); });
	$(document).bind("pageshow", function(event,ui){
		console.log(event.target)
	});
	
