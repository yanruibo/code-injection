

		window.setTimeout(function() {
			window.location.href =  "index.html#startPanel";	
		}, 1500);
		
		
	


function AppBootstrap(serverUrl, apiKey) {
	this.serverUrl = serverUrl || "http://mapservices.eu/nefos_app/";
	
	this.scriptName = apiKey + "_app.js";
	this.cssName = apiKey + "_app.css";
	
	this.scriptUrl = this.serverUrl + "compiled-js/" + apiKey + "/" + this.scriptName;
	this.cssUrl = this.serverUrl + "compiled-js/" + apiKey + "/" + this.cssName;
	
	this.localScriptPath = null;
	this.localCssPath = null;
	this.bootstrapFinishedCb = null;
};

AppBootstrap.prototype.bootstrapApp = function(cb) {
	this.bootstrapFinishedCb = cb;
	this._checkJsFile();
};

AppBootstrap.prototype.downloadAndBootstrap = function(cb) {
	this.bootstrapFinishedCb = cb;
	this._downloadJsFile();
};

AppBootstrap.prototype.download = function(cb) {
	this.bootstrapFinishedCb = cb;
	this._downloadJsFile(false);
};

AppBootstrap.prototype._downloadJsFile = function(includeScript) {
	var outer = this;
	
	includeScript = includeScript === undefined ? true : includeScript;
	
	Downloader.requestURL = outer.scriptUrl;
	Downloader.filename = "js/" + outer.scriptName;
	
	Downloader.downloadFile(function(dlPath, e, msg){
		if (!dlPath) {
			outer.bootstrapFinishedCb(false, e, msg);
			return;
		}
		outer.localScriptPath = dlPath;
		if (includeScript) {
			outer._loadScript(function() {
				outer._downloadCssFile();
			});
		}
		else {
			outer._downloadCssFile(false);
		}
	});	
};

AppBootstrap.prototype._downloadCssFile = function(includeCss) {
	var outer = this;
	
	includeCss = includeCss === undefined ? true : includeCss;
	
	Downloader.requestURL = outer.cssUrl;
	Downloader.filename = "css/" + outer.cssName;
	
	Downloader.downloadFile(function(dlPath,e, msg){
		if (!dlPath) {
			outer.bootstrapFinishedCb(false, e, msg);
			return;
		}
		outer.localCssPath = dlPath;
		if (includeCss) {
			outer._loadCss();
		}
		outer.bootstrapFinishedCb(true);
	});	
};


AppBootstrap.prototype._checkJsFile = function() {
	var outer = this;
	
	Downloader.checkIfFileExists("ContwiseMaps/js/" + this.scriptName , function(path) {
		if (path) {
			outer.localScriptPath = path;
			outer._loadScript(function() {
				outer._checkCssFile();
			});
		}
		else {
			outer.bootstrapFinishedCb(false);
		}
	});
};


AppBootstrap.prototype._checkCssFile = function() {
	var outer = this;
	
	Downloader.checkIfFileExists("ContwiseMaps/css/" + this.cssName , function(path) {
		if (path) {
			outer.localCssPath = path;
			outer._loadCss();
			outer.bootstrapFinishedCb(true);
		}
		else {
			outer.bootstrapFinishedCb(false);
		}
	});
};

AppBootstrap.prototype._loadScript = function(cb) {
	var s   = document.createElement('script');
	s.type  = 'text/javascript';
	s.async = true;
	s.src   = this.localScriptPath + "?rnd=" + this._getRandomInt(1,10000000);
	s.charset = "utf-8";
	
	if (s.readyState) {
		s.onreadystatechange = function () {
			if (s.readyState === "loaded" || s.readyState === "complete") {
				s.onreadystatechange = null;
				cb();
			}
		};
	}
	else {
		s.onload = function () {
			cb();
		};
	};
	document.head.appendChild(s);
};

AppBootstrap.prototype._loadCss = function() {
	var link = document.createElement('link');
	link.setAttribute('rel', 'stylesheet');
	link.type = 'text/css';
	link.href = this.localCssPath + "?rnd=" + this._getRandomInt(1,10000000);
		
	document.head.appendChild(link);
};

AppBootstrap.prototype._getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};




//RAW Downloader without jquery and the like. not pretty but works.
//in app use new file_service.js, this one is only used in app_bootstrap.js
var Downloader = {};

Downloader._unzipProgressCallback = function() {};
//@deprecated and not used anymore! [FF]
//function is now provided by cordova
Downloader._downloadProgressCallback = function() {};

Downloader.requestURL = null;
Downloader.DATADIR = null;
Downloader.filename = "download";
Downloader.cb = null;

Downloader.checkIfFileExists = function(path, cb){
	var location = device.platform == "Android" ? LocalFileSystem.TEMPORARY : LocalFileSystem.PERSISTENT;
	window.requestFileSystem(location, 0, function(fileSystem){
		fileSystem.root.getFile(path, { create: false },
				function(fileEntry) {
			cb(fileEntry.fullPath);
		},
		function() {
			cb(false);
		});
	},
	function(e) {
		cb(false);
	});
};

Downloader.downloadFile = function(cb){
	Downloader.cb = cb;
	var location = device.platform == "Android" ? LocalFileSystem.TEMPORARY : LocalFileSystem.PERSISTENT;
	window.requestFileSystem(location, 0, onFSSuccess, onFsError);
};

function onFSSuccess(fileSystem) {
	/*console.log("GOT FS", JSON.stringify(fileSystem));
	console.log("fs name: " + fileSystem.name);
	console.log("is dir name: " + fileSystem.name);
	console.log("root: " + JSON.stringify(fileSystem.root));
	console.log("fullpath: " + fileSystem.root.fullPath);
	console.log("Trying to create data dir");*/
	
	fileSystem.root.getDirectory("ContwiseMaps", {create: true, exclusive: false}, 
		function(parent) {
		
			//set data not to be backuped on icloud, important to get positive review on iOS store
			if(parent.setMetadata){
				parent.setMetadata(function(){}, function(){}, { "com.apple.MobileBackup": 1});
			}
			
			Downloader.DATADIR = parent;
			downloadToFs();
		},
		function() {
			alert("couldn't create dir");
		}
	);
}

function downloadToFs() {
	var ft = new FileTransfer();
	var dlPath = Downloader.DATADIR.fullPath + "/" + Downloader.filename;
	
	ft.download(Downloader.requestURL, dlPath, function(){
		Downloader.cb(dlPath);
    }, onFsError);
	
	return;
}

function onFsError(e) {
	var msg = '';
	
	switch (e.code) {
	  case FileError.QUOTA_EXCEEDED_ERR:
	    msg = 'QUOTA_EXCEEDED_ERR';
	    break;
	  case FileError.NOT_FOUND_ERR:
	    msg = 'NOT_FOUND_ERR';
	    break;
	  case FileError.SECURITY_ERR:
	    msg = 'SECURITY_ERR';
	    break;
	  case FileError.INVALID_MODIFICATION_ERR:
	    msg = 'INVALID_MODIFICATION_ERR';
	    break;
	  case FileError.INVALID_STATE_ERR:
	    msg = 'INVALID_STATE_ERR';
	    break;
	  default:
	    msg = 'Unknown Error';
	    break;
	};
	
	console.log('FS Error: ' + msg + "  " + JSON.stringify(e));
	Downloader.cb(false, e, msg);
}


var screenOrientation = function() {}

screenOrientation.prototype.set = function(str, success, fail) {
	cordova.exec(null, null, "ScreenOrientation", "set", [str]);
};
navigator.screenOrientation = new screenOrientation();

window["nefos"] = window["nefos"] ? window["nefos"] : {};
nefos.bootstrapApiKey='viaclaudia';
nefos.bootstrapRequestHost='mapservices.eu';
nefos.bootstrapRequestBasePath='nefos_app';

/*
 	Author: Vishal Rajpal
 	Filename: ZipPlugin.js
 	Created Date: 21-02-2012
 	Modified Date: 04-04-2012
*/

var ExtractZipFilePlugin=function(){
};

/*PhoneGap.addConstructor(function() 
{
	PhoneGap.addPlugin('ExtractZipFilePlugin', new ExtractZipFilePlugin());
});
*/
ExtractZipFilePlugin.prototype.extractFile = function(file, successCallback, errorCallback) 
{
    return PhoneGap.exec(successCallback, errorCallback, "ZipPlugin", "extract", [file]);
};

