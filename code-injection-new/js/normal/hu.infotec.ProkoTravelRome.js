






	 	function onOrientationChange(e) {
	 	 	console.log('>>>>>>>> onOrientationChange called');
	 	 	console.log('>>>>>>>> Device screen size: ' + screen.width + 'x' + screen.height);
	 	 	/*initBaseFontSize();*/
            {script_orientation}
        }
        
        function onWindowResized(e) {
	 	 	console.log('>>>>>>>> onWindowResized called');
	 	 	console.log('>>>>>>>> Device screen size: ' + screen.width + 'x' + screen.height);
	 	 	/*initBaseFontSize();*/
            {script_resize}
        }
        
        function onDeviceReady() {
         	console.log('>>>>>>>> onDeviceReady called');
         	console.log('>>>>>>>> Device pixel ratio: ' + window.devicePixelRatio);
         	console.log('>>>>>>>> Device screen size: ' + screen.width + 'x' + screen.height);
         	$(window).resize(onWindowResized);
         	/*initBaseFontSize();*/
            {script_deviceready}
        }

        function onBodyLoad() {
            console.log('>>>>>>>> onBodyLoad called');
            document.addEventListener("deviceready", onDeviceReady, false);
        }
        
        {script}
    
    

function linkMe(id) {
	window.MyPlugin.linkMe(Number(id));
}

function showOnMap(id){
	window.MyPlugin.showOnMap(Number(id));
}

function gpsCoordinate(id) {
	window.MyPlugin.gpsCoordinate(Number(id));
}


function audioHandler(id) {
	window.MyPlugin.audioHandler(Number(id));
}

function getDeviceOrientation() {      		
    if (Math.abs(window.orientation) === 90) {
        // Landscape
        return 1;
    } else {
    	// Portrait
    	return 0;
    }
}


var MyPlugin = {
	linkMe: function(id) {
        console.log('linkMe to id ' + id);
        PhoneGap.exec(function(result) {
                      }, 
                      function(error) { 
                        console.log('linkMe error ' + error + ' with id ' + id);
                      },
                      "Navigation", "linkMe", [id]);
        return false;
    },
    
    navigateCalendar: function(id, day) {
        console.log('navigateCalendar to startdate:' + day);
        PhoneGap.exec(function(result) {
                      }, 
                      function(error) { 
                      console.log('navigateCalendar error ' + error + ' with startdate:' + day);
                      },
                      "Navigation", "navigateCalendar", [id,day]);
        return false;
    },
    
    navigateCalendarDay: function(id, day) {
        console.log('navigateCalendarDay to day:' + day);
        PhoneGap.exec(function(result) {
                      }, 
                      function(error) { 
                      console.log('navigateCalendarDay error ' + error + ' with day:' + day);
                      },
                      "Navigation", "navigateCalendarDay", [id,day]);
        return false;
    },
    
    addremoveMyEvent: function(id, evt_id, list_type) {
        console.log('add/remove event from myevents:' + evt_id);
        PhoneGap.exec(function(result) {
                      }, 
                      function(error) { 
                      console.log('addremoveMyEvent error ' + error + ' with event:' + evt_id);
                      },
                      "Navigation", "addremoveMyEvent", [id,evt_id,list_type]);
        return false;
    },
    
    navigateEventContent: function(evt_id) {
        console.log('navigateEventContent to event:' + evt_id);
        PhoneGap.exec(function(result) {
                      }, 
                      function(error) { 
                      console.log('navigateEventContent error ' + error + ' with event:' + evt_id);
                      },
                      "Navigation", "navigateEventContent", [evt_id]);
        return false;
    },
    
    audioHandler: function(fileid) {
        console.log('audioHandler file:' + fileid);
        PhoneGap.exec(function(result) {
                      },
                      function(error) {
                      console.log('playAudio error ' + error + ' with file:' + fileid);
                      },
                      "Navigation", "audioHandler", [fileid]);
        return false;
    },
    
    gpsCoordinate: function(coord_id){
    console.log('gpsCoordinate coordinate id:' + coord_id);
        PhoneGap.exec(function(result) {
                      },
                      function(error) {
                      console.log('gpsCoordinate error ' + error + ' with file:' + fileid);
                      },
                      "Navigation", "gpsCoordinate", [coord_id]);
        return false;
    }
};
