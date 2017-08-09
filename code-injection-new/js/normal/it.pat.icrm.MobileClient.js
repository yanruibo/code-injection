







			function onBodyLoad() {
				ourLaunched = true;
				document.addEventListener("deviceready", onDeviceReady, false);
				//loadScripts();
			}
			function onDeviceReady() {				
				//app.mainLaunch();
			}
		

var PATConfig;
if (!PATConfig) {
 PATConfig = {};
 PATConfig.$ = {};
}
PATConfig.$.CurrentDeployment = 'PROD';
PATConfig.$.DeploymentConfig = {
 'PROD' : {
  ICRM_BASE_JSON_SERVICE_URL:'http://crm-mob-demo.pat.it/icrmjson/wsc',
  ICRM_BASE_USERNAME:'demo',
  ICRM_BASE_PASSWORD:'demo1234',
  ICRM_DEBUG_ENABLED : false,
  ICRM_DEBUG_VERBOSE_ENABLED : false,
  ICRM_REMOTE_DEBUG_ENABLED : false,
  ICRM_FEATURES : ['STD_ORDERS','HOMEVIEW','EMBEDDED_PLUGINS'],
  ICRM_PAGEDLIST_MAXENTRIES : 200
 }
};
PATConfig.$.BaseDeployment = {
 ICRM_DEBUG_ENABLED : false,
 ICRM_DEBUG_VERBOSE_ENABLED : false,
 ICRM_REMOTE_DEBUG_ENABLED : false,
 ICRM_REMOTE_DEBUG_ENDPOINT : "http://192.168.2.85:8080/LoggingServlet/LoggingServlet",
 ICRM_FEATURES : [],
 ICRM_VERSION : "1.6.0"
};
PATConfig.$.mergeOpts = function(o1, o2) {
 var o = {};
 for (p in o1) {
  o[p] = o1[p];
 }
 for (p in o2) {
  o[p] = o2[p];
 }
 return o;
};
PATConfig.$.CurrentDeployment = PATConfig.$.DeploymentConfig[PATConfig.$.CurrentDeployment];
PATConfig.Deployment = PATConfig.$.mergeOpts(PATConfig.$.BaseDeployment, PATConfig.$.CurrentDeployment);
delete PATConfig.$;
PATConfig.isFeatureEnabled = function(feature) {
 if (PATConfig.Deployment && PATConfig.Deployment.ICRM_FEATURES) {
  var fArr = PATConfig.Deployment.ICRM_FEATURES;
  for (var i = 0; i < fArr.length; i++) {
   if (fArr[i] === feature) {
    return true;
   }
  }
 }
 return false;
};

