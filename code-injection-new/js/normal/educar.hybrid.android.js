
function IAUPlugin() { 
} 

IAUPlugin.prototype.compareEngineVersion = function(win, fail) {
	return cordova.exec(win, fail, "InAppUpdatePlugin", "compareEngineVersion", []); 
};

IAUPlugin.prototype.compareAppVersion = function(win, fail) {
	return cordova.exec(win, fail, "InAppUpdatePlugin", "compareAppVersion", []); 
};

cordova.addConstructor(function() { 
	if (!window.plugins) {
		window.plugins = {};
	}
	if (!window.plugins.iau) {
		window.plugins.iau = new IAUPlugin();
	}
});





function InAppUpdatePlugin() { 
} 

InAppUpdatePlugin.prototype.InAppProgress = null;
InAppUpdatePlugin.prototype.updatePolicy = {};
InAppUpdatePlugin.prototype.updatePolicy.refreshUpdatePolicy = null;
InAppUpdatePlugin.prototype.updatePolicy.engineUpdatePolicy = null;
InAppUpdatePlugin.prototype.updatePolicy.applicationUpdatePolicy = null;
InAppUpdatePlugin.prototype.updatePolicy.securityPolicy = null;
InAppUpdatePlugin.prototype.updatePolicy.customResourcePolicy = null;
InAppUpdatePlugin.prototype.firstLaunch = false;
InAppUpdatePlugin.prototype.engineStatus = false;
InAppUpdatePlugin.prototype.applicationStatus = false;
InAppUpdatePlugin.prototype.backupStatus = false;

InAppUpdatePlugin.prototype.init = function(win, fail) { 
	 return cordova.exec(win, fail, "InAppUpdatePlugin", "init", []); 
};

InAppUpdatePlugin.prototype.ping = function(win, fail) {
	return cordova.exec(win, fail, "InAppUpdatePlugin", "ping", []); 
};

InAppUpdatePlugin.prototype.copyResource = function(win, fail) { 
	 return cordova.exec(win, fail, "InAppUpdatePlugin", "copyResource", []); 
};

InAppUpdatePlugin.prototype.checkEngineUpdate = function(win, fail) {
	return cordova.exec(win, fail, "InAppUpdatePlugin", "checkEngineUpdate", []); 
};

InAppUpdatePlugin.prototype.getEngineUpdate = function(win, fail) {
	return cordova.exec(win, fail, "InAppUpdatePlugin", "getEngineUpdate", []); 
};

InAppUpdatePlugin.prototype.getEngineRecovery = function(win, fail) {
	return cordova.exec(win, fail, "InAppUpdatePlugin", "getEngineRecovery", []); 
};

InAppUpdatePlugin.prototype.doBackup = function(win, fail) {
	return cordova.exec(win, fail, "InAppUpdatePlugin", "doBackup", []); 
};

InAppUpdatePlugin.prototype.doRestore = function(win, fail) {
	return cordova.exec(win, fail, "InAppUpdatePlugin", "doRestore", []); 
};

InAppUpdatePlugin.prototype.checkAppUpdate = function(win, fail) {
	return cordova.exec(win, fail, "InAppUpdatePlugin", "checkAppUpdate", []); 
};

InAppUpdatePlugin.prototype.getAppUpdate = function(win, fail) { 
	return cordova.exec(win, fail, "InAppUpdatePlugin", "getAppUpdate", []); 
};

InAppUpdatePlugin.prototype.getAppRecovery = function(win, fail) {
	return cordova.exec(win, fail, "InAppUpdatePlugin", "getAppRecovery", []); 
};

InAppUpdatePlugin.prototype.getSecurityCheck = function(win, fail) {
	return cordova.exec(win, fail, "InAppUpdatePlugin", "getSecurityCheck", []); 
};

InAppUpdatePlugin.prototype.getRefreshUpdate = function(win, fail) { 
	return cordova.exec(win, fail, "InAppUpdatePlugin", "checkRefreshUpdate", []); 
};

InAppUpdatePlugin.prototype.getCustomResource = function(win, fail) { 
	return cordova.exec(win, fail, "InAppUpdatePlugin", "getCustomResource", []); 
}; 

InAppUpdatePlugin.prototype.showProgress = function(progressBox) {
    if (this.InAppProgress) {
        this.InAppProgress.spin(document.getElementById(progressBox));
    } else {
        var InAppProgressOpts = {
            lines : 10,
            length : 8,
            width : 4,
            radius : 10,
            color : '#000',
            speed : 1,
            trail : 56,
            shadow : true
        };
        var spinnerBox;
        if (!progressBox) {
            spinnerBox = "progressBox";
        } else {
            spinnerBox = progressBox;
        }
        this.InAppProgress = new Spinner(InAppProgressOpts).spin(document.getElementById(spinnerBox));
    }
};

InAppUpdatePlugin.prototype.hideProgress = function() {
    this.InAppProgress.stop();
};

InAppUpdatePlugin.prototype.launch = function() {
    return cordova.exec(null, null, "InAppUpdatePlugin","launch",[]);
};

InAppUpdatePlugin.prototype.getRefreshUpdatePolicy = function() {
    return this.updatePolicy.refreshUpdatePolicy;
};

InAppUpdatePlugin.prototype.getApplicationUpdatePolicy = function() {
    return this.updatePolicy.applicationUpdatePolicy;
};

InAppUpdatePlugin.prototype.getEngineUpdatePolicy = function() {
	return this.updatePolicy.engineUpdatePolicy;    
};

InAppUpdatePlugin.prototype.getSecurityPolicy = function() {
	return this.updatePolicy.securityPolicy;    
};

InAppUpdatePlugin.prototype.customResourcePolicy = function() {
	return this.updatePolicy.customResourcePolicy;    
};

InAppUpdatePlugin.prototype.isFirstLaunch = function() {
    return this.firstLaunch;    
};

InAppUpdatePlugin.prototype.clean = function() {
    return cordova.exec(null, null, "InAppUpdatePlugin", "clean",[]);
};

InAppUpdatePlugin.prototype.setStatusFunction = function(name) {
	return cordova.exec(null, null, "InAppUpdatePlugin", "setStatusFunction", [name]);   
};

InAppUpdatePlugin.prototype.setProgressFunction = function(name) {
	return cordova.exec(null, null, "InAppUpdatePlugin", "setProgressFunction", [name]);   
};
  
var debug_mode = 0;
var error_mode = 0;

document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady() {
    window.plugins.inappupdate.showProgress("progressBox");
    window.plugins.inappupdate.init(onInitSuccess, onFail);
    window.plugins.inappupdate.setStatusFunction("setStatus");
    window.plugins.inappupdate.setProgressFunction("setProgress");
}  

function onInitSuccess() {
	window.plugins.inappupdate.copyResource(checkBackup, onFail);
}	

function checkBackup() {
	console.log("Backup / recovery process");
	if (!window.plugins.inappupdate.applicationStatus || !window.plugins.inappupdate.engineStatus) {
		if (window.plugins.inappupdate.backupStatus) {
			window.plugins.inappupdate.doRestore(checkEngineUpdate, onFail);
		} else {
			checkEngineUpdate();
		}
	} else {
		checkEngineUpdate();
	}
}

function checkApplicationUpdate() {
    console.log("checkApplicationUpdate");
    if (window.plugins.inappupdate.getApplicationUpdatePolicy()) {
        onApplicationUpdate();
    } else {
        checkRefreshUpdate();
    }
}

function checkRefreshUpdate() {
    console.log("checkRefreshUpdate");
    if (window.plugins.inappupdate.getRefreshUpdatePolicy()) {
        onRefreshUpdate();
    } else {
    	checkCustomResource();
    }
}

function checkCustomResource() {
	console.log("checkCustomResource");
	if (window.plugins.inappupdate.customResourcePolicy()) {
		onCustomResource();
	} else {
		onSecurityCheck();
	}
}

function launch() {
	window.plugins.inappupdate.hideProgress();
	var progressdiv = document.getElementById("progressMessage");
	progressdiv.innerHTML= "";
	window.plugins.inappupdate.launch();
}

function onLaunch(url) {
	location.replace(url);
}

function onSecurityCheck() {
	console.log("onSecurityCheck");
	try {
		if (window.plugins.inappupdate.getSecurityPolicy()) {
			window.plugins.inappupdate.getSecurityCheck(launch, onFail);
		} else {
			launch();
		}
	}catch(e) {
		alert(e.message);
	}
}

function onCustomResource() {
	console.log("onCustomResource");
	window.plugins.inappupdate.getCustomResource(onSecurityCheck, onFail);
}

function onRefreshUpdate() {
	console.log("onRefreshUpdate");
	window.plugins.inappupdate.getRefreshUpdate(onCustomResource, onFail);
}

function onEngineUpdate() {
	console.log("onEngineUpdate");
	window.plugins.inappupdate.getEngineUpdate(checkApplicationUpdate, onFail);
}

function onEngineRecovery() {
	console.log("onEngineRecovery");
	window.plugins.inappupdate.getEngineRecovery(checkApplicationUpdate, onFail);
}        

function onApplicationUpdate() {
	console.log("onApplicationUpdate");
	window.plugins.inappupdate.getAppUpdate(checkRefreshUpdate, onFail);
}

function onApplicationRecovery() {
	console.log("onApplicationRecovery");
	window.plugins.inappupdate.getAppRecovery(checkRefreshUpdate, onFail);
}

function checkEngineUpdate() {
	if(window.plugins.inappupdate.getEngineUpdatePolicy()) {
		if(!window.plugins.inappupdate.engineStatus) {
			onEngineRecovery();
		} else {
			onEngineUpdate();
		}			
	} else {
		checkApplicationUpdate();
	}
}

function onFail(errormsg) {
	setStatus(errormsg);
	window.plugins.inappupdate.hideProgress();
    
//	error_switch();
	error_on(); // 수동으로 설정
}

function setStatus(msg) {
//	alert(msg);
	var logdiv = document.getElementById("progressStatus");
	logdiv.innerHTML = msg;
}

function setProgress(progressInfo) {
    var progressdiv = document.getElementById("progressMessage");
    var filename = progressInfo.name;
    if (filename.length > 15) {
        filename = filename.substr(0,12) + "...";
    }
    if (progressInfo.progress >= 0.999) {
        progressdiv.innerHTML = "";
    } else {
    	if (progressInfo.progress > 0 ) {
            var progressdata = Math.round(progressInfo.progress * 100);
            var progressmessage = progressInfo.message;
            progressdiv.innerHTML = filename + " " + progressdata  + "% " + progressmessage;
    	} else {
    		progressdiv.innerHTML = filename + " " + progressInfo.message;
    	}
    }
}

function debug_switch() {
	if(debug_mode == 0) {
		debug_mode = 1;
		document.getElementById("debugfunctions").style.display = "block";                
	} else {
		debug_mode = 0;
		document.getElementById("debugfunctions").style.display = "none"; 
	}
}

// 현재는 사용하지 않음. switch형태로 왔다갔다 하다 보니 홀수개의 에러가 동시에 들어왔을 때 메시지가 안보일 수 있음
// 디버깅 용도를 위해 코드는 남겨놓음
function error_switch() {
	if(error_mode == 0) {
		error_mode = 1;
		document.getElementById("errorfunctions").style.display = "block";                
	} else {
		error_mode = 0;
		document.getElementById("errorfunctions").style.display = "none"; 
	}
}

function error_on() {
    error_mode = 1;
    document.getElementById("errorfunctions").style.display="block";
}

function getMacAddress() {
	window.plugins.misc.getMacAddress(setStatus,onFail);
}

cordova.addConstructor(function() {
	if (!window.plugins) {
		window.plugins = {};
	}
	if (!window.plugins.inappupdate) {
		window.plugins.inappupdate = new InAppUpdatePlugin();
	}
});


function Educar() { 
} 

Educar.prototype.testPlugin1 = function(win, fail) {
	return cordova.exec(win, fail, "Educar", "testPlugin1", []);
};

Educar.prototype.testPlugin2 = function(win, fail) {
	return cordova.exec(win, fail, "Educar", "testPlugin2", []);
};
cordova.addConstructor(function() {
	if (!window.plugins) {
		window.plugins = {};
	}
	if (!window.plugins.educar) {
		window.plugins.educar = new Educar();
	}
});

function importJS (filename){
	var head= document.getElementsByTagName('head')[0];
	var script= document.createElement('script');
	script.type= 'text/javascript';
	script.src= filename;
	head.appendChild(script);
}

function MiscPlugin() { 
} 

MiscPlugin.prototype.photoMMS = function(win, fail, img, number, msg) {
	return cordova.exec(win, fail, "Misc", "photoMMS", [img, number, msg]); 
};

MiscPlugin.prototype.getMacAddress = function(win, fail) {
	return cordova.exec(win, fail, "Misc", "getMacAddress", []); 
};

MiscPlugin.prototype.getAppId = function(win, fail) {
	return cordova.exec(win, fail, "Misc", "getAppId", []); 
};

MiscPlugin.prototype.getVersion = function(win, fail) {
	return cordova.exec(win, fail, "Misc", "getVersion", []); 
};

MiscPlugin.prototype.exit = function(fail) {
	return cordova.exec(null, fail, "Misc", "exit", []); 
};

MiscPlugin.prototype.callApp = function(win, fail, packageName, arg) {
	return cordova.exec(win, fail, "Misc", "callApp", [packageName, arg]); 
};

MiscPlugin.prototype.getAppData = function(win, fail, contentName) {
	return cordova.exec(win, fail, "Misc", "getAppData", [contentName]); 
};

MiscPlugin.prototype.setLanguage = function(win, fail, lang) {
	return cordova.exec(win, fail, "Misc", "setLanguage", [lang]); 
};

MiscPlugin.prototype.getLanguage = function(win, fail) {
	return cordova.exec(win, fail, "Misc", "getLanguage", []); 
};

cordova.addConstructor(function() { 
	if (!window.plugins) {
		window.plugins = {};
	}
	if (!window.plugins.misc) {
		window.plugins.misc = new MiscPlugin();
	}
});
