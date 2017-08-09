


	//1.load
	function onLoad(){
		document.addEventListener("deviceready", onDeviceReady, true);
		
	}
	function onDeviceReady(){
		navigator.notification.alert("PhoneGap is working~!!");
	}
	//2. vibrate
	function onVibrateBtn(){
		navigator.notification.vibrate(1000);
	}

