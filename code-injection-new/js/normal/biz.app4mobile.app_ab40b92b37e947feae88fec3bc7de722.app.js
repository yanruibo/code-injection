

	
	var ratio = 10;
	var draw;
	
	function now(){
		var d = new Date();
		return d.getTime();
	}
	
	function change(){
		resize(false);
	}
	
	function resize(force){
		
	 	var w = window.innerWidth;
	 	var h = window.innerHeight;
		
	 	if(w == 0 || h == 0) return;
	 	
	 	var r = w / h; 
	 	
		var diff = Math.abs((ratio - r) / r); 
	 	
		var n = now();
		if(diff > 0.1){
			draw = n + 300; 
		}
		
		//console.log("diff:" + diff);
		//console.log("time:" + n + ":" + draw)
		
	 	if(force || n < draw){
		
	 		ratio = r;
	 		
	 		var landscape = w > h;
		 	
			var box = document.getElementById("box");		
		 	box.style.width = w;
		 	box.style.height = h;
			
			var img = document.getElementById("img");	
			
			if(!landscape){
		 		img.style.width = w;
		 		img.style.height = '';
			}else{
				img.style.width = '';
				img.style.height = h;
			}
			
			//console.log("resize:" + w + ":" + h);
		}
	}
	
	
		
 		resize(true);
 		window.onresize = change;
  	

/**
 * This class detect the device (iphone/android...) and the layout (is tablet?)
 * and store the data in the global vars: DEVICE, LAYOUT
 * 
 * @author Matanya
 */
var DeviceDetector = (function(){
    var _isDesktop = false;

    var me = {};

    /**
    * @return {Boolean} is the browser desktop browser (= not mobile nor tablet).
    * @author Matanya
    */
    me.isDesktop = function () {
        return _isDesktop;
    };

    /**
     * @return {deviceTypeEnum} the device (iOS/android/...)
     * @author Matanya
     */
    me.device = function () {
        return DEVICE;
    };

    /**
     * @return {deviceTypeEnum} the layout (narrow(=mobile)/wide(=tablet))
     * @author Matanya
     */
    me.layout = function () {
        return LAYOUT;
    };
    
    // The first regex that exist in the user-agent will determine the device and layout:
    var _userAgentMap = {
        "(ipad)":               { device: deviceTypeEnum.iphone, layout: layoutFormat.wide },
        "(ipod|iphone)":        { device: deviceTypeEnum.iphone ,layout: layoutFormat.narrow },
        "(gt-p1000|mz604|mz606|xoom)":  { device: deviceTypeEnum.android, layout: layoutFormat.wide }, // samsung galaxy/xoom tab
        "(android.+mobile)":    { device: deviceTypeEnum.android ,layout: layoutFormat.narrow }, // android phone
        "(android)":            { device: deviceTypeEnum.android /*,layout: layoutFormat.wide*/ }, // android tablet?
        "(windows phone os|iemobile|zunewp7)":{ device: deviceTypeEnum.winPhone ,layout: layoutFormat.narrow },
        //TODO: check if some of these tablets are android, and if so, move it to the "android tablet" section
        "(SCH-I800|NOOK|silk|kindle|GT-P7510)":            { layout: layoutFormat.wide } // other tablets stuff
     };

    // ** Helper function ** //
    var _allKeys = function (object) {
        var arr = [];
        for (var member in object) {
            if (object.hasOwnProperty(member))
                arr.push(member);
        }
        return arr;
    };
    
    /**
    * detect the device (iphone/android...) and the layout (is tablet?)
    * 
    * @return {dictionary} the device and layout.
    * @author Matanya
    */
    var _detect = function ()
    {
        // Detect device and layout according to the userAgent:
        // NOTE: I think that we don't need "toLowerCase()" because we use "ignore case" in the regex-s:
        var userAgent = (navigator.userAgent||navigator.vendor||window.opera).toLowerCase(); 
        
        //cache the keys array
        var _userAgentsArr = _allKeys(_userAgentMap);

        //creates a regex pattern looking like '(ipad)|(ipod|iphone)|(gt-p1000..."
        var _userAgentsPattern = new RegExp(_userAgentsArr.join('|'), 'i');

        var result = {device: deviceTypeEnum.unknown, layout: layoutFormat.unknown}
        if (_userAgentsPattern.test(userAgent))
        {
            for (var i = 0; i < _userAgentsArr.length; i++) {
                var rgxStr = _userAgentsArr[i];
                var rgx = new RegExp(rgxStr, 'i');
                if (rgx.test(userAgent)) {
                    data = _userAgentMap[rgxStr];
                    if (typeof(data.device) !== 'undefined')
                    {
                        result.device = data.device;
                    }
                    if (typeof(data.layout) !== 'undefined')
                    {
                        result.layout = data.layout;
                    }
                    //TODO: if layout not detected: use screen resolution/width etc.?
                    
                    break;
                }
            };
        };


        // TODO: remove this code and use only the _userAgentMap? there is a problem in this section:
        // userAgent.substr(0, 4)
        
        // try to find if mobile or not (e.g.: for desktop-landing-page)
        if (result.layout === layoutFormat.unknown && window == top)
        {
            // check if mobile
            // from "http://detectmobilebrowsers.com/":
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(userAgent.substr(0, 4)))
            {
                result.layout = layoutFormat.narrow;
            }
            else
            {
                result.layout = layoutFormat.wide;
                _isDesktop = true;
            }
                
        }
        
        return result;
    };
    
    /**
     * update the global vars: DEVICE, LAYOUT
     * 
     * @author Matanya
     */
    
    // Detect device and layout according to the userAgent:
    var data = _detect();

    if (PREVENT_DEVICE_DETECT)
        return;

    DEVICE = data.device || DEVICE;
    LAYOUT = data.layout || LAYOUT;

    return me;
}());

/*global document*/
/*global window*/
/*global console*/
/*global DeviceDetector*/		//assumed to load before
/*global LANDING*/				//injected from ahp EnvironmentInjectionProvider.cs
/*global WEBSITE_OVERRIDE_URL*/ //same as above

window.Redirect = (function () {
	'use strict';
	var me = {};

	var _didRedirect = false;

	var _redirect = function(url) {
		_didRedirect = true;
		window.top.location.href = url;
	};

	var _init = function() {
		if (!DeviceDetector) {
			console.log('redirect : missing DeviceDetector!');
			return;
		}

		//ignore or landing redirects. arrives from SiteScripts, or from mobile landing page.
		if (document.location.href.toLowerCase().indexOf('skiplanding=true') >= 0 || !window.LANDING) {
			return;
		}

		//handle desktop landing redirect
		if (DeviceDetector.isDesktop() && LANDING.urls && LANDING.urls.Desktop) {
			return _redirect(LANDING.urls.Desktop);
		}

		var device = DeviceDetector.device();

		//handle mobile landing redirect
		if (LANDING.urls && LANDING.urls.Mobile && 
			LANDING.devices && (LANDING.devices & device) === device)
		{
			return _redirect(LANDING.urls.Mobile);
		}

		//handle app website url override
		if (WEBSITE_OVERRIDE_URL)
		{
			return _redirect(WEBSITE_OVERRIDE_URL);
		}
	};

	_init();

	me.didRedirect = function () { return _didRedirect; };
	return me;
}());

var platformEnum={simulator:0,nativeApp:1,webApp:2,gadget:3,playground:4};var deviceTypeEnum={unknown:0,iphone:1<<0,android:1<<1,rim:1<<2,winPhone:1<<3,symbian:1<<4,bada:1<<5};var pageTypes={"0":{folder:"apiTest",cssClass:"apiTest",templateViewName:"APITestTemplateView"},"5a8368df-6ebd-c0f2-2d82-e173c1f33d40":{folder:"aboutUs",cssClass:"aboutUs",templateViewName:"AboutUsTemplateView",itemsName:"items"},"f61f12d6-df0c-465c-b3ba-70fb8f3894a4":{folder:"agenda",cssClass:"agenda",templateViewName:"AgendaTemplateView",itemsName:"items"},"30be1358-8b36-4d22-b6d2-50c38f4246c4":{folder:"audio",cssClass:"audio",templateViewName:"AudioTemplateView",wideTemplateViewName:"AudioWideTemplateView",nativeControllerName:"AudioController",itemsName:"items"},"51a61af7-1e90-4d68-88db-b1e69a0cca59":{folder:"blog",cssClass:"blog",templateViewName:"BlogTemplateView",wideTemplateViewName:"BlogWideTemplateView",nativeControllerName:"BlogController",itemsName:"feeds"},"308af5fa-e91b-d7e7-1926-acfea8f266dc":{folder:"notForCp",templateViewName:"NotForCpTemplateView",cssClass:"notForCp"},"083e52df-721d-4ca4-efa3-25161d344f40":{folder:"contactUs",cssClass:"contactUs",itemsName:"items",templateViewName:"ContactUsTemplateView"},"e9773a60-828f-6a16-a1fb-770163905537":{folder:"poll",cssClass:"poll",itemsName:"items",templateViewName:"PollTemplateView"},"0311d37d-6d9f-fc9d-35fd-45b471d2382f":{folder:"quiz",cssClass:"quiz",itemsName:"items",templateViewName:"QuizTemplateView"},"1002937d-8b19-40de-9df5-ba0d1ea2fbb2":{folder:"events",cssClass:"events",templateViewName:"EventsTemplateView",wideTemplateViewName:"EventsWideTemplateView",nativeControllerName:"EventsController",itemsName:"items"},"0053bbba-1ca1-11e0-89a4-af28e0d72085":{folder:"external",cssClass:"external",templateViewName:"ExternalPageTemplateView"},"df7d11f3-233c-4d49-8f2a-d1886e07c641":{folder:"facebook",cssClass:"facebook",templateViewName:"FacebookTemplateView",wideTemplateViewName:"FacebookWideTemplateView",nativeControllerName:"FacebookController",itemsName:"channels"},"fa7071be-8262-3b0d-b439-d2edd1ac35ec":{folder:"favorites",cssClass:"favorites",templateViewName:"FavoritesTemplateView"},"79eec590-f806-f7ac-946b-1fd9c90283ba":{folder:"form",cssClass:"form",templateViewName:"FormTemplateView",itemsName:"items"},"e0adcb11-f7bb-8107-1cd0-77690221f31c":{folder:"instagram",cssClass:"instagram",templateViewName:"InstagramTemplateView",itemsName:"items"},"fc6700a7-a11e-de90-93f8-7357f9f0037f":{folder:"links",templateViewName:"LinksTemplateView",cssClass:"links",itemsName:"items"},"c54d24ef-faf5-45dd-8859-85e3ebe7cecf":{folder:"webModule",templateViewName:"WebModuleTemplateView",cssClass:"webModule",itemsName:"items"},"9eea8149-956c-46f9-8597-167401c63cd7":{folder:"webModule",templateViewName:"WebModuleTemplateView",cssClass:"webModule",itemsName:"items"},"26ae8ccc-5464-7979-4fdf-3a13f166ffff":{folder:"photos",cssClass:"photos",templateViewName:"PhotosTemplateView",nativeControllerName:"PhotosController",itemsName:"feeds"},"a00b52bb-ff49-704f-bdf3-fb0bd0fd4739":{folder:"livePerson",templateViewName:"LivePersonTemplateView",cssClass:"livePerson",itemsName:"tabs"},"ec79d314-f6aa-f396-a651-3f9b3344dd99":{folder:"notForCp",templateViewName:"NotForCpTemplateView",cssClass:"notForCp"},"aca2f190-b22b-920d-f12a-998101ad4b70":{folder:"map",cssClass:"map",templateViewName:"MapTemplateView",nativeControllerName:"MapController",itemsName:"items"},"3b11bcdf-ba5e-4eaa-9059-ea580b3f1681":{folder:"photos",cssClass:"photos",templateViewName:"PhotosTemplateView",itemsName:"feeds"},"7a2641b0-ceb2-48d6-b715-344198c73dd3":{folder:"reviews",cssClass:"reviews",templateViewName:"ReviewsTemplateView",wideTemplateViewName:"ReviewsWideTemplateView"},"0255eb38-1fb5-4b65-abee-b6fdb69c8f07":{folder:"coupons",cssClass:"coupons",templateViewName:"CouponsTemplateView"},"8901e95e-4dc9-411f-835a-0f18a7872122":{folder:"menu",cssClass:"menu",templateViewName:"MenuTemplateView",itemsName:"items"},"ff4532d2-9137-8da2-f97f-be8b3ddd08e4":{folder:"agenda",cssClass:"agenda",templateViewName:"AgendaTemplateView",itemsName:"items"},"27f91d0a-42c0-48fa-90a8-7138641ddecf":{folder:"staticHtml",cssClass:"staticHtml",templateViewName:"StaticHtmlTemplateView"},"c6bb3e68-0ea7-43dc-a358-b40d9b75d224":{folder:"subscribe",cssClass:"subscribe",templateViewName:"SubscribeTemplateView"},"a77583ef-758f-45f3-9ad1-9704d82a2154":{folder:"twitter",cssClass:"twitter",templateViewName:"TwitterTemplateView",wideTemplateViewName:"TwitterWideTemplateView",nativeControllerName:"TwitterController",itemsName:"feeds"},"a95e67d5-4816-11c2-318d-fe64a33e32d2":{folder:"users",cssClass:"users",templateViewName:"UsersTemplateView",nativeControllerName:"UsersController",itemsName:"items"},"4680c3f3-e767-4ebf-b112-9ba769c3ff2a":{folder:"video",cssClass:"video",templateViewName:"VideoTemplateView",wideTemplateViewName:"VideoWideTemplateView",nativeControllerName:"VideoController",itemsName:"items"},"a7bf6078-3f92-4b90-acf2-b122903bc846":{folder:"video",cssClass:"video",templateViewName:"VideoTemplateView",wideTemplateViewName:"VideoWideTemplateView",nativeControllerName:"VideoController",itemsName:"channels"},"6181507a-fdf4-4b90-a270-cbd286603443":{folder:"collections",cssClass:"collections",templateViewName:"CollectionsTemplateView",itemsName:"items"},"38ab2b78-a1ad-42f8-8cb7-9475498c0f30":{folder:"reports",cssClass:"reports",nativeControllerName:"ReportsController",templateViewName:"ReportsTemplateView",itemsName:"items"},"8d7507ff-317e-44b1-9ad3-776ad52d6ee2":{folder:"homepage",cssClass:"homepage",nativeControllerName:"HomepageController",itemsName:"items"},"fe6a4b7d-cf62-172e-8eba-a231dd39eb20":{folder:"myProfile",cssClass:"myProfile",templateViewName:"MyProfileTemplateView",itemsName:"items"},"a8c1cd8e-7e55-828d-3bd2-fb2122472fa3":{folder:"inbox",cssClass:"inbox",templateViewName:"InboxTemplateView",itemsName:"items"},"11111111-1111-1111-1111-111111111111":{folder:"customNative",cssClass:"customNative",templateViewName:"",itemsName:"items"},sharePageType:{cssClass:"share_template_page",templateViewName:"ShareTemplateView",wideTemplateViewName:"ShareTemplateView"}};var appMode={normal:0,experience:1,developers:2};var headerTypes={textHeader:0,imageHeader:1,imageAndTextHeader:2};var navigationLayoutTypes={none:-1,bottomBar:0,topBar:1,list:2,grid:3,sideMenu:4};var adDisplayTypes={text:1,image:2};var layoutFormat={unknown:-1,narrow:0,wide:1};var comTypeEnum={postMessage:0,iframeMessage:1,nativeMessage:2};var protocolTypeEnum={rpc:0,event:1};var socialServices={Facebook:"FACEBOOK",Email:"EMAIL",Twitter:"TWITTER"};var executeTypeEnum={FORCE_NETWORK:0,HIT_AND_RUN:1,HIT_AND_RUN_SILENT:2,HIT_ON_NETWORK_FAIL:3};var responseTypeEnum={NETWORK:0,VALID_CACHE:1,EXPIRED_CACHE:2};var socialServiceReturnType={FACEBOOK:1,TWITTER:2};var ExternalContentTypes={BLOG_POST:1,STATIC_HTML:2};var VideoTypes={GENERAL:"generalVideoType",YOUTUBE:"youtubeVideoType"};var MediaLibraryMergeTypes={Overwrite:0,Override:1,Merge:2};var MediaLibraryIncludeItems={None:0,Playlists:1,Unknown:2,All:3};var PhotoUploadUserTypes={NONE:0,FACEBOOK:1};
var RETURN_STATE_INFO="return_state_info";var RETURN_FUNCTION_FACEBOOK_SHARE="handleFacebookShare";var TWITTER_TOKENS="twitter_credentials";var SOCIAL_USER_CANCELED="user_canceled";var APP_VERSION="3.4.1.1";var DEV_SERVICEMAP_URL="http://servicemap.mobile.site-services.com/mobile";var QA_SERVICEMAP_URL="http://servicemap.mobile.qasite-services.com/mobile";var PROD_SERVICEMAP_URL="http://servicemap.mobile.conduit-services.com/mobile";var USE_AGENDA_FAVORITES=false;var USE_DATADUMP_SERVICE=false;var DEBUG=1;var PREVENT_DEVICE_DETECT=DEBUG&&!true;var NAVIGATION_PAGE_GUID="00000000-0000-0000-0000-000000000002";var APP_MODE=appMode.normal;var PLATFORM=platformEnum.nativeApp;var DEVICE=deviceTypeEnum.android;var LAYOUT=layoutFormat.narrow;var FORCE_NO_CACHE=false&&DEBUG;var SERVICEMAP_URL=PROD_SERVICEMAP_URL;var APP_ID=null;var IS_RTL=false;
var DEBUG = 0;
var AMS_VERSION = "1.2.4.75";
var PLATFORM = 1;
var DEVICE_TOKEN = 2;
var APP_ID = "ab40b92b-37e9-47fe-ae88-fec3bc7de722";
var APP_MODE = 0;
var SIMULATOR = 0;
var SERVICEMAP_URL = PROD_SERVICEMAP_URL;

var __dataDump ={"images":[],"services":[{"data":{"services":[{"name":"AMS_APP_GET","url":"http:\/\/ams.mobile.conduit-services.com\/{appId}\/{deviceType}?appVersion={appVersion}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_FEEDS_GET","url":"http:\/\/cms.mobile.conduit-services.com\/feed\/{take}\/{skip}\/?url={feedUrl}&params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_TWITTER_USER_GET","url":"http:\/\/cms.mobile.conduit-services.com\/twitter\/user\/{userName}\/{take}\/{skip}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_TWITTER_QUERY_GET","url":"http:\/\/cms.mobile.conduit-services.com\/twitter\/query\/{query}\/{type}\/{take}\/{skip}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_YOUTUBE_GET","url":"http:\/\/cms.mobile.conduit-services.com\/youtube\/{query}\/{type}\/{skip}\/{take}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_PHOTOS_GET","url":"http:\/\/cms.mobile.conduit-services.com\/photos\/{type}\/{userName}\/{take}\/{skip}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_PHOTOS_ALBUMS_GET","url":"http:\/\/cms.mobile.conduit-services.com\/photos\/albums\/{type}\/{username}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_FACEBOOK_USER_GET","url":"http:\/\/cms.mobile.conduit-services.com\/facebook\/user\/{pageName}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_FACEBOOK_DATA_GET","url":"http:\/\/cms.mobile.conduit-services.com\/facebook\/data\/{pageName}\/{take}\/{skip}\/?params={}","reload_interval_sec":7200,"method":"GET"},{"name":"UMS_USER_POST","url":"http:\/\/ums.mobile.conduit-services.com\/login\/user","method":"POST"},{"name":"PROXY_WEBSLICE","url":"http:\/\/proxy.mobile.conduit-services.com\/webslice?url={url}","reload_interval_sec":12092600,"method":"GET"},{"name":"AMS_APPID_GET","url":"http:\/\/ams.mobile.conduit-services.com\/code\/{code}\/{email}\/pwd","reload_interval_sec":7200,"method":"GET"},{"name":"UMS_USAGE_PUT","url":"http:\/\/ums.mobile.conduit-services.com\/usage\/log","reload_interval_sec":7200,"method":"POST"},{"name":"ADS_POST","url":"http:\/\/ads.mobile.conduit-services.com\/{appId}\/{deviceType}","reload_interval_sec":600,"method":"POST"},{"name":"CMS_RAYV_GET","url":"http:\/\/cms.mobile.conduit-services.com\/rayv\/feeds\/{distributer}\/{listType}\/{take}\/{skip}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"MOBILE_SOCIAL_LOGIN","url":"http:\/\/social.mobile.conduit-services.com\/connect\/facebook?appId={appId}&type={deviceType}&ret={returnUrl}","method":"GET"},{"name":"CMS_MEDIA_VIDEO_GET","url":"http:\/\/cms.mobile.conduit-services.com\/media\/video\/{deviceType}\/{take}\/{skip}\/?url={url}&params={params}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_MEDIA_AUDIO_GET","url":"http:\/\/cms.mobile.conduit-services.com\/media\/audio\/{deviceType}\/{take}\/{skip}\/?url={url}&params={params}","reload_interval_sec":7200,"method":"GET"},{"name":"AMS_TRANSLATION_GET","url":"http:\/\/ams.mobile.conduit-services.com\/translate\/{product}\/{culture}\/{deviceType}","reload_interval_sec":1200,"method":"GET"},{"name":"LIVE_ALBUM_PHOTO_POST","url":"http:\/\/livealbum.mobile.conduit-services.com\/Album\/{appId}\/{parentSocialId}\/{socialId}\/{albumId}\/{tagWithUserId}\/","reload_interval_sec":7200,"method":"POST"},{"name":"TWITTER_API_PROXY_POST","url":"http:\/\/apiproxy.conduit-services.com\/twitter\/{tId}?sshkey={sshKey}&hts={hts}&url=http%3a%2f%2fapi.twitter.com%2f1%2fstatuses%2fupdate.json","reload_interval_sec":7200,"method":"POST"},{"name":"SOCIAL_LOGOUT","url":"http:\/\/social.conduit-services.com\/ConduitLogout.aspx","reload_interval_sec":7200,"method":"GET"},{"name":"SIGSERV_HTTP_GET","url":"http:\/\/sub.conduit-push.com","reload_interval_sec":7200,"method":"GET"},{"name":"SIGSERV_HTTP_PUT","url":"http:\/\/pub.conduit-push.com","reload_interval_sec":7200,"method":"PUT"},{"name":"SIGSERV_WEBSOCKET_GET","url":"ws:\/\/ws.conduit-push.com","reload_interval_sec":7200,"method":"GET"},{"name":"MOBILE_TWITTER_LOGIN","url":"http:\/\/social.mobile.conduit-services.com\/twitter\/SignIn?appId={appId}&type={deviceType}&ret={returnUrl}","reload_interval_sec":7200,"method":"GET"},{"name":"LIVE_ALBUM_EULA_GET","url":"http:\/\/conduit.ourtoolbar.com\/eula\/","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_CALENDAR_GET","url":"http:\/\/cms.mobile.conduit-services.com\/calendar\/{type}\/?id={id}&max-results={take}&start-index={skip}&since={since}&until={until}&params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"WIBIYA_SUBSCRIBE_GET","url":"https:\/\/api.wibiya.com\/Handlers\/apps\/subscribe_mobile.php?t={token}&e={email}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_MEDIA_ART_GET","url":"http:\/\/cms.mobile.conduit-services.com\/media\/art\/?url={url}&params={params}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_REVIEW_GET","url":"http:\/\/cms.mobile.conduit-services.com\/reviews\/{type}\/?q={query}&max-results={take}&start-index={skip}&params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"NFL_STATS_GET","url":"http:\/\/pages.mobile.conduit.com\/nfl\/player\/{key}\/{id}?info={level}","reload_interval_sec":7200,"method":"GET"},{"name":"IMAGES_REVIEWS_PROVIDER_GET","url":"http:\/\/images.mobile.conduit-services.com\/icon\/100{type}","reload_interval_sec":7200,"method":"GET"},{"name":"INAPP_USER_TOKENS_GET","url":"http:\/\/inapp.mobile.conduit-services.com\/client\/tokens\/{bucketId}?userId={userId}","method":"GET"},{"name":"INAPP_USER_TRANSACTION_POST","url":"http:\/\/inapp.mobile.conduit-services.com\/client\/transaction","method":"POST"},{"name":"CONTACT_CONTENT_PUT","url":"http:\/\/contact.mobile.conduit-services.com\/contact\/client\/{appId}\/{formId}\/?action={action}&postUrl={postUrl}","reload_interval_sec":1200,"method":"POST"},{"name":"CMS_USERS_GET","url":"http:\/\/cms.mobile.site-services.com\/users\/{userId}\/{provider}\/{relationType}\/{take}\/{skip}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"LIVE_ALBUM_PHOTO_V2_POST","url":"http:\/\/livealbum.mobile.conduit-services.com\/Files\/upload\/?groupId={groupId}&appId={appId}&albumId={albumId}","reload_interval_sec":7200,"method":"POST"},{"name":"CMS_COUPONS_GET","url":"http:\/\/cms.mobile.conduit-services.com\/coupons\/{listId}\/?take={take}&skip={skip}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_CONFERENCE_GET","url":"http:\/\/cms.mobile.conduit-services.com\/agenda\/{type}\/{id}\/{version}\/?ranges={ranges}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_PEOPLE_GET","url":"http:\/\/cms.mobile.conduit-services.com\/agenda\/{type}\/{id}\/{version}\/","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_POLLS_GET","url":"http:\/\/cms.mobile.conduit-services.com\/polls\/{type}\/{pollId}\/","reload_interval_sec":7200,"method":"GET"},{"name":"CONTACT_POLLS_POST","url":"http:\/\/polls.mobile.conduit-services.com\/polls\/result\/","reload_interval_sec":1200,"method":"POST"},{"name":"CMS_CONTENT_ITEMS","url":"http:\/\/cms.mobile.conduit-services.com\/contentItems\/items\/contenthost\/{take}\/{skip}\/?id={id}&params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_CONTENT_COLLECTION","url":"http:\/\/cms.mobile.conduit-services.com\/contentItems\/collection\/contenthost\/{take}\/?id={id}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_CONTENT_ITEMS_SEARCH","url":"http:\/\/cms.mobile.conduit-services.com\/contentItems\/items\/search\/{type}\/{collectionId}\/{take}\/{skip}\/?searchParams={searchParams}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_MENU_GET","url":"http:\/\/cms.mobile.conduit-services.com\/restaurants\/menu\/{provider}\/?query={restid}","reload_interval_sec":7200,"method":"GET"},{"name":"COMMUNITY_SOCIAL_LOGIN_POST","url":"http:\/\/community.mobile.conduit-services.com\/users\/social\/login\/{globalAppId}","reload_interval_sec":7200,"method":"POST"},{"name":"COMMUNITY_SOCIAL_LOGOUT_POST","url":"http:\/\/community.mobile.conduit-services.com\/users\/social\/logout\/{globalAppId}\/{userId}?socialId={socialId}","reload_interval_sec":7200,"method":"POST"},{"name":"CMS_USERS_SEARCH_GET","url":"http:\/\/cms.mobile.conduit-services.com\/users\/{provider}\/{skip}\/{take}\/?globalAppId={globalAppId}&q={search_term}&params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"DISCUSSION_DISCUSSIONS_GET","url":"http:\/\/discussion.mobile.conduit-services.com\/discussions\/{globalAppId}\/{userId}","reload_interval_sec":7200,"method":"GET"},{"name":"DISCUSSION_MESSAGES_GET","url":"http:\/\/discussion.mobile.conduit-services.com\/messages\/{discussionId}\/{skip}\/{take}","reload_interval_sec":7200,"method":"GET"},{"name":"DISCUSSION_MESSAGES_SEND_POST","url":"http:\/\/discussion.mobile.conduit-services.com\/messages\/{globalAppId}\/{fromId}","reload_interval_sec":7200,"method":"POST"},{"name":"CONTACT_CONTENT_POST","url":"http:\/\/contact.mobile.conduit-services.com\/contact\/client\/v2\/{globalAppId}\/{formId}\/?version={version}&postUrl={postUrl}","reload_interval_sec":7200,"method":"POST"},{"name":"IMAGE_UPLOADER_POST","url":"http:\/\/imageupload.mobile.conduit-services.com\/files\/upload","reload_interval_sec":7200,"method":"POST"}],"reload_interval_sec":86400},"maxAge":86399,"serviceUrl":"http:\/\/servicemap.mobile.conduit-services.com\/mobile"},{"data":{"details":{"appHomeUrl":"http:\/\/ab40b92b-37e9-47fe-ae88-fec3bc7de722.4yourmobile.com"},"globalAppId":"3167176b-5689-4bf5-9121-e6385deb847b","icon":"http:\/\/storage.conduit.com\/Mobile\/31\/89\/3167176b-5689-4bf5-9121-e6385deb847b\/Images\/5bc4c62c-23e2-4942-8d27-4232a4afc4b4.png","id":"ab40b92b-37e9-47fe-ae88-fec3bc7de722","label":"Gabriel Guimarães","layout":{"colorTheme":{"background":"#992d414a","buttons":"#ff570000","navTxt":"#FFFFFFFF","contBtxt":"#ff444745","contBsubTxt":"#FFB4B4B4","contAbg":"#FFFFFFFF","hdrBg":"#ff570000","contAhdlTxt":"#ff5c0000","navIcn":"#FFFFFFFF","contCsubTxt":"#FFB4B4B4","contBhdlTxt":"#ff5c0000","contCbg":"#ff570000","contAsubTxt":"#FFB4B4B4","contAtxt":"#ff444745","appBg":"#992d414a","contBbg":"#FFFFFFFF","actBtn":"#ff1b525c","navBg":"#ff570000","contCtxt":"#FFFFFFFF","contAbrdr":"#FFDDDDDD","lnkTxt":"#ff1b525c","hdrTxt":"#FFFFFFFF","contChdlTxt":"#FFFFFFFF","contBbrdr":"#FFC1C1C2","deviceType":-1,"headers":"#ff5c0000","id":8,"name":"crimson","displayName":"Crimson","mainText":"#ff1b525c","smallText":"#ff444745"},"layoutType":1,"meta":{"bgImage":"http:\/\/storage.conduit.com\/Mobile\/31\/89\/3167176b-5689-4bf5-9121-e6385deb847b\/Images\/6dbf26a5-cfb5-42e0-bac1-5422b6fc8d83.jpg","culture":null,"header":{"type":1,"content":"http:\/\/storage.conduit.com\/Mobile\/31\/89\/3167176b-5689-4bf5-9121-e6385deb847b\/Images\/d1d54368-c39b-4460-859b-d6518df019a5.png"},"isRtl":false,"material":0},"template":{"appGeneral":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"appBg"}]}}}},"loadingSmallIcn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAsubTxt"}]},"isBlack":false,"isSimple":false}}},"footer":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000","shadow":{"isInset":false,"x":"0px","y":"-2px","blur":"3px","color":"#99000000"}}}}},"scrnDiv":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000","shadow":{"isInset":false,"x":"3px","y":"0px","blur":"10px","color":"#99000000"}}}},"brdr":{"type":"border","data":{"default":{"right":{"color":"#FF000000","width":"1px"}}}}},"dialog":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#CC000000"}}},"btn2":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFe4e4e4","location":0},{"color":"#FF8d8d8d","location":1}]},"clicked":{"type":"solid","color":"#FF8d8d8d"},"disabled":{"type":"solid","color":"#33333333"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FFBFBBB8","width":"1px"},"right":{"color":"#FFBFBBB8","width":"1px"},"left":{"color":"#FFBFBBB8","width":"1px"},"top":{"color":"#FFBFBBB8","width":"1px"}},"clicked":{"bottom":{"color":"#FF757575","width":"1px"},"right":{"color":"#FF757575","width":"1px"},"left":{"color":"#FF757575","width":"1px"},"top":{"color":"#FF757575","width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FF5F5B5A","shadow":{"x":"0","y":"1px","blur":"0","color":"#80FFFFFF"}},"selected":{"color":"#CC000000","shadow":{"x":"0","y":"1px","blur":"0","color":"#80FFFFFF"}},"disabled":{"color":"#CCCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF5F5B5A","isBlack":true,"isSimple":true},"clicked":{"type":"solid","color":"#FF464342","isBlack":true,"isSimple":true},"disabled":{"type":"solid","color":"#CCCCCCCC","isBlack":true,"isSimple":true}}}}},"floatBtn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000"},"clicked":{},"disabled":{}}},"brdr":{"type":"border","data":{}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FFFFFFFF","shadow":{"x":"0px","y":"1px","blur":"2px","color":"#E5000000"}},"selected":{"color":"#ffb0b0b0"},"disabled":{"color":"#CCCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FFFFFFFF","isBlack":false,"isSimple":true}}}},"shareViewIcn":{"type":"icon","data":{"default":{"type":"solid","color":"#FFa29f9e","isBlack":true,"isSimple":true}}},"adBar":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.9]}]}}}},"brdr":{"type":"border","data":{"top":{"color":{"_replace":[{"param":"contBbg"}]},"width":"1px"}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBhdlTxt"}]}}}}},"pullToRef":{"typeA":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAbg"}]},"shadow":{"isInset":true,"x":"-1px","y":"1px","blur":"2px","color":"#54000000"}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAsubTxt"}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contAbrdr"}]},"width":"1px"}}}}},"typeB":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg"}]},"shadow":{"isInset":true,"x":"-1px","y":"1px","blur":"2px","color":"#54000000"}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBsubTxt"}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"subTxt"}]},"isBlack":true,"isSimple":false}}}}},"appHeader":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,1.6,1],[1,0.9,1.25,0.92]]}]},"location":0},{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.9,1.4,1],[1,1,1.13,0.95]]}]},"location":0.25},{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,1,1.1,1],[1,1,1.1,1]]}]},"location":0.49},{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,1,1,1],[1,1,1,1]]}]},"location":0.5},{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,1,0.8,1],[1,1,0.8,0.9]]}]},"location":0.73},{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,1,0.7,1],[1,0.7,0.5,1]]}]},"location":1}],"shadow":{"isInset":false,"x":"0px","y":"1px","blur":"3px","color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,0.3,0.8],[1,0.7,0.2,1]]}]}}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.5,1.05,1],[1,0.7,0.6,0.9]]}]},"width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"hdrTxt"}]}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.9,0.7,0.4],[1,0.9,0.5,0.4]]}]}},"clicked":{"type":"solid","color":"#4C000000","shadow":{"isInset":true,"x":"-1px","y":"1px","blur":"2px","color":"#66000000"}},"selected":{"type":"solid","color":"#4C000000","shadow":{"isInset":true,"x":"-1px","y":"1px","blur":"2px","color":"#66000000"}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrTxt"}]},"isBlack":false,"isSimple":true}}}}},"navBar":{"item":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,0.8,1.3,1],[1,0.9,1.25,0.95]]}]},"location":0},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,0.9,1.2,1],[1,1,1,0.95]]}]},"location":0.18},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,1,1],[1,1,0.7,1]]}]},"location":0.55},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.8,1],[1,1,0.5,1]]}]},"location":0.84},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.7,1],[1,0.6,0.4,1]]}]},"location":1}]},"clicked":{"type":"gradient","orientation":"vertical","color":[{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.5,0.7],[1,0.6,0.5,1]]}]},"location":0},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.5,0.7],[1,1,0.35,1]]}]},"location":0.18},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.4,0.7],[1,1,0.3,1]]}]},"location":0.55},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,0.8,0.2,0.7],[1,1,0.4,1]]}]},"location":0.84},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,0.5,0.1,0.7],[1,0.9,0.5,1]]}]},"location":1}],"shadow":{"isInset":true,"x":"0px","y":"0px","blur":"2px","color":"#FF000000"}},"selected":{"type":"gradient","orientation":"vertical","color":[{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.5,0.7],[1,0.6,0.5,1]]}]},"location":0},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.5,0.7],[1,1,0.35,1]]}]},"location":0.18},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.4,0.7],[1,1,0.3,1]]}]},"location":0.55},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,0.8,0.2,0.7],[1,1,0.4,1]]}]},"location":0.84},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,0.5,0.1,0.7],[1,0.9,0.5,1]]}]},"location":1}],"shadow":{"isInset":true,"x":"0px","y":"0px","blur":"2px","color":"#FF000000"}}}},"bubbleBg":{"type":"background","data":{"default":{},"clicked":{}}},"brdr":{"type":"border","data":{"default":{},"clicked":{}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"navTxt","fn":"hsla","params":[1,1,1,0.8]}]}},"clicked":{"color":{"_replace":[{"param":"navTxt"}]}},"selected":{"color":{"_replace":[{"param":"navTxt"}]}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"navIcn"}]},"isBlack":false,"isSimple":true}}}}},"navGrid":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#33000000"}}},"btn":{"bg":{"type":"background","data":{"default":{},"clicked":{}}},"brdr":{"type":"border","data":{"default":{},"clicked":{}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"navTxt","fn":"hsla","params":[1,1,1,0.8]}]}},"clicked":{"color":{"_replace":[{"param":"navTxt"}]}}}}}},"navList":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#33000000"}}},"item":{"bg":{"type":"background","data":{"default":{},"clicked":{"type":"solid","color":"#40000000"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#4c2a2a2a","width":"1px"}},"clicked":{}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"navTxt"}]}},"clicked":{}}}}},"tabBar":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#E1FFFFFF"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FFC1C1C2","width":"1px"}}}},"item":{"bg":{"type":"background","data":{"default":{},"clicked":{}}},"bubble":{"bg":{"type":"background","data":{"default":{},"clicked":{"type":"solid","color":"#3C000000"},"selected":{"type":"solid","color":"#FFb0b0b1"}}},"brdr":{"type":"border","data":{"default":{},"clicked":{},"selected":{}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]},"shadow":{"x":"0","y":"1px","blur":"0","color":"#FFf6f5f1"}},"clicked":{"color":"#FFFFFFFF","shadow":{"x":"0","y":"1px","blur":"0","color":"#FFa1a09e"}},"selected":{"color":"#FFFFFFFF","shadow":{"x":"0","y":"1px","blur":"1px","color":"#FFa1a09e"}}}}},"brdr":{"type":"border","data":{"default":{},"clicked":{}}}}},"tab2Bar":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"horizontal","color":[{"color":"#DCCDCDCD","location":0},{"color":"#E6FFFFFF","location":0.5},{"color":"#DCCDCDCD","location":1}],"shadow":[{"isInset":true,"x":"0px","y":"-1px","blur":"0px","color":{"_replace":[{"param":"lnkTxt"}]}},{"isInset":true,"x":"0px","y":"1px","blur":"0px","color":{"_replace":[{"param":"lnkTxt"}]}},{"isInset":true,"x":"0px","y":"1px","blur":"10px -2px","color":"#B4000000"},{"isInset":true,"x":"0px","y":"-1px","blur":"10px -2px","color":"#B4000000"}]}}},"triangle":{"type":"border","data":{"default":{"top":{"width":"6px","color":{"_replace":[{"param":"contAtxt"}]}},"left":{"width":"8px","color":"#00000000"},"right":{"width":"8px","color":"#00000000"},"bottom":{"width":"6px","color":{"_replace":[{"param":"contAtxt"}]}}}}},"item":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000"},"selected":{"type":"solid","color":"#00000000"}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}},"selected":{"color":{"_replace":[{"param":"contAtxt"}]}}}}}},"contTypeA":{"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAhdlTxt"}]}}}},"hdlTxtBrdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":"#FFCCCCCC"},"bottom":{"width":"1px","color":"#FFCCCCCC"}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAtxt"}]}},"mandatory":{"color":"#FFBB0000"}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAsubTxt"}]}}}},"lnkTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAtxt"}]},"isBlack":true,"isSimple":false}}},"subIcn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAsubTxt"}]},"isBlack":true,"isSimple":false}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAbg"}]}},"clicked":{"type":"solid","color":"#FFf5f3ef"},"selected":{"type":"solid","color":"#FFf7f7f7"}}},"subBg":{"type":"background","data":{"default":{"type":"solid","color":"#FFeeeeee"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contAbrdr"}]},"width":"1px"}},"clicked":{},"selected":{"top":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,0.5,1]}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,0.5,1]}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,0.5,1]}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,0.5,1]}]}}}}},"classicItem":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAbg"}]}},"clicked":{"type":"solid","color":"#FFf5f3ef"},"selected":{"type":"solid","color":"#FFf7f7f7"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contAbrdr"}]},"width":"1px"}},"clicked":{},"selected":{"top":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,0.5,1]}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,0.5,1]}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,0.5,1]}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,0.5,1]}]}}}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFe4e4e4","location":0},{"color":"#FF8d8d8d","location":1}],"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"5px","color":"#cc000000"}},"clicked":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFcacaca","location":0},{"color":"#FFf1f1f1","location":1}],"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"2px","color":"#00000000"}},"disabled":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFe7e7e7","location":0},{"color":"#FFE6E6E6","location":1}]}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FFBFBBB8","width":"1px"},"right":{"color":"#FFBFBBB8","width":"1px"},"left":{"color":"#FFBFBBB8","width":"1px"},"top":{"color":"#FFBFBBB8","width":"1px"}},"clicked":{"bottom":{"color":"#FF757575","width":"1px"},"right":{"color":"#FF757575","width":"1px"},"left":{"color":"#FF757575","width":"1px"},"top":{"color":"#FF757575","width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FF5F5B5A","shadow":{"x":"0","y":"1px","blur":"0","color":"#80FFFFFF"}},"selected":{"color":"#CC000000","shadow":{"x":"0","y":"1px","blur":"0","color":"#80FFFFFF"}},"disabled":{"color":"#ffCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF2a2a2a","isBlack":true,"isSimple":false}}}},"actBtn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"actBtn","fn":"t_hsla","params":[0.5,[1,1,1.3,1],[1,1,0.5,1]]}]}},"disabled":{"type":"solid","color":"#33333333"}}},"brdr":{"type":"border","data":{}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FFFFFFFF"},"selected":{"color":"#FFFFFFFF"},"disabled":{"color":"#ffCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FFFFFFFF","isBlack":false,"isSimple":true}}}},"contentSession":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAhdlTxt","fn":"hsla","params":[1,1,1,0.88]}]}}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg"}]}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg","fn":"hsla","params":[1,1,1,0.69]}]}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg","fn":"hsla","params":[1,1,1,0.49]}]}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00FFFFFF","shadow":[{"isInset":false,"x":"0px","y":"0px","blur":"0px 1px","color":"#66000000"},{"isInset":true,"x":"1px","y":"1px","blur":"0px","color":"#4Dffffff"}]}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FFFFFFFF","isBlack":false,"isSimple":true}}}}},"contentSession2":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"lnkTxt","fn":"hsla","params":[1,1,1,0.88]}]}}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg"}]}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg","fn":"hsla","params":[1,1,1,0.69]}]}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg","fn":"hsla","params":[1,1,1,0.49]}]}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00FFFFFF","shadow":[{"isInset":false,"x":"1px","y":"1px","blur":"0px","color":"#66ffffff"},{"isInset":true,"x":"1px","y":"1px","blur":"3px","color":"#99000000"}]}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FFFFFFFF","isBlack":false,"isSimple":true}}}}},"calBoxBrdr1":{"type":"border","data":{"default":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","style":"dotted","color":{"_replace":[{"param":"contBbrdr","fn":"hsla","params":[1,1,1,0.7]}]}}}}},"calBoxBrdr2":{"type":"border","data":{"default":{"top":{"width":"1px","style":"dotted","color":{"_replace":[{"param":"contBbrdr","fn":"hsla","params":[1,1,1,0.7]}]}},"bottom":{"width":"1px","style":"dotted","color":{"_replace":[{"param":"contBbrdr","fn":"hsla","params":[1,1,1,0.7]}]}}}}}},"contTypeB":{"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBhdlTxt"}]},"shadow":{"x":"1px","y":"1px","blur":"0","color":"#ccFFFFFF"}}}},"hdlTxtBrdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":{"_replace":[{"param":"contBhdlTxt","fn":"hsla","params":[1,1,1,0.2]}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBhdlTxt","fn":"hsla","params":[1,1,1,0.2]}]}}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBtxt"}]},"shadow":{"x":"1px","y":"1px","blur":"1px","color":"#FFFFFFFF"}},"mandatory":{"color":"#FFBB0000","shadow":{"x":"1px","y":"1px","blur":"1px","color":"#FFFFFFFF"}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBsubTxt"}]},"shadow":{"x":"1px","y":"1px","blur":"1px","color":"#FFFFFFFF"}}}},"lnkTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]},"shadow":{"x":"1px","y":"1px","blur":"1px","color":"#FFf6f5f1"}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBtxt"}]},"isBlack":true,"isSimple":false}}},"subIcn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBsubTxt"}]},"isBlack":true,"isSimple":true}}},"hdlIcn":{"type":"server_icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBhdlTxt"}]},"isBlack":true,"isSimple":true}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.88]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.82]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.82]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}}}},"subBg":{"type":"background","data":{"default":{"type":"solid","color":"#FFe1e1e1"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}},"clicked":{"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}},"selected":{"top":{"color":{"_replace":[{"param":"contBbrdr","fn":"hsla","params":[1,1,0.6,1]}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"contBbrdr","fn":"hsla","params":[1,1,0.6,1]}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"contBbrdr","fn":"hsla","params":[1,1,0.6,1]}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"contBbrdr","fn":"hsla","params":[1,1,0.6,1]}]},"width":"1px"}}}},"bubbleItem":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.88]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.82]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBbg"}]},"shadow":[{"isInset":false,"x":"0px","y":"0px","blur":"1px","color":"#FFFFFFFF"},{"isInset":false,"x":"0px","y":"0px","blur":"2px","color":"#FFFFFFFF"},{"isInset":false,"x":"0px","y":"0px","blur":"2px","color":"#FFFFFFFF"},{"isInset":false,"x":"0px","y":"0px","blur":"2px","color":"#FFFFFFFF"}]}}},"brdr":{"type":"border","data":{}}},"headerItem":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.88]}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.82]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.82]}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}}}}},"trackItem":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.88]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.82]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBbg"}]}}}},"brdr":{"type":"border","data":{"default":{"top":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}},"clicked":{"top":{"color":{"_replace":[{"param":"hdrBg"}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"hdrBg"}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"hdrBg"}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"hdrBg"}]},"width":"1px"}},"selected":{"top":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}}}}},"fullPage":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.68]}]}}}}},"fullPage2":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.1]}]}}}}},"sep":{"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr","fn":"hsla","params":[1,1,0.6,1]}]}}}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFFFFFFF","location":0},{"color":"#FFE6E6E6","location":1}]},"clicked":{"type":"gradient","orientation":"vertical","color":[{"color":"#ffdddddd","location":0},{"color":"#ffcccccc","location":1}]},"disabled":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFe7e7e7","location":0},{"color":"#FFE6E6E6","location":1}]}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FFBFBBB8","width":"1px"},"right":{"color":"#FFBFBBB8","width":"1px"},"left":{"color":"#FFBFBBB8","width":"1px"},"top":{"color":"#FFBFBBB8","width":"1px"}},"clicked":{"bottom":{"color":"#FF757575","width":"1px"},"right":{"color":"#FF757575","width":"1px"},"left":{"color":"#FF757575","width":"1px"},"top":{"color":"#FF757575","width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FF5F5B5A","shadow":{"x":"0","y":"1px","blur":"0","color":"#80FFFFFF"}},"selected":{},"disabled":{"color":"#CCCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF5F5B5A","isBlack":true,"isSimple":false},"clicked":{"type":"solid","color":"#FF464342","isBlack":true,"isSimple":false},"disabled":{"type":"solid","color":"#CCCCCCCC","isBlack":true,"isSimple":false}}}},"actBtn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"actBtn","fn":"t_hsla","params":[0.5,[1,1,1.3,1],[1,1,0.5,1]]}]}},"disabled":{"type":"solid","color":"#33333333"}}},"brdr":{"type":"border","data":{}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FFFFFFFF"},"selected":{"color":"#FFFFFFFF"},"disabled":{"color":"#ffCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FFFFFFFF","isBlack":false,"isSimple":true}}}}},"contTypeC":{"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contChdlTxt"}]}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contCtxt"}]}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contCsubTxt"}]}}}},"lnkTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contCbg","fn":"t_hsla","params":[0.5,[1,1,0.6,0.9],[1,1,0.3,0.9]]}]}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"actBtn","fn":"t_hsla","params":[0.5,[1,1,1.3,1],[1,1,0.5,1]]}]}},"disabled":{"type":"solid","color":"#33333333"}}},"brdr":{"type":"border","data":{}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FFFFFFFF"},"selected":{"color":"#FFFFFFFF"},"disabled":{"color":"#ffCCCCCC"}}}}},"form":{"element":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFe4e4e4","location":0},{"color":"#FF8d8d8d","location":1}]},"mandatory":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFFFFFFF","location":0},{"color":"#FFFF0000","location":1}]}}},"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":"#FFC1C1C2"},"bottom":{"width":"1px","color":"#FFC1C1C2"},"left":{"width":"1px","color":"#FFC1C1C2"},"right":{"width":"1px","color":"#FFC1C1C2"}},"mandatory":{"top":{"color":"#FFB60021","width":"1px"},"bottom":{"color":"#FFB60021","width":"1px"},"left":{"color":"#FFB60021","width":"1px"},"right":{"color":"#FFB60021","width":"1px"}}}},"txt":{"type":"text","data":{"default":{"color":"#FF111111"},"watermark":{"color":"#FF888888"},"mandWatermark":{"color":"#FFBB0000"}}}},"dropdown":{"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF2a2a2a","isBlack":true,"isSimple":true}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":"#22000000"}}},"brdr":{"type":"border","data":{"default":{"left":{"color":"#FFC1C1C2","width":"1px"},"right":{"color":"#FFC1C1C2","width":"1px"}}}}},"input":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF"},"disabled":{"type":"solid","color":"#FFCCCCCC"},"mandatory":{"type":"solid","color":"#FFFFDDDD"}}},"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":"#FFC1C1C2"},"bottom":{"width":"1px","color":"#FFC1C1C2"},"left":{"width":"1px","color":"#FFC1C1C2"},"right":{"width":"1px","color":"#FFC1C1C2"}},"diabled":{},"mandatory":{"top":{"color":"#FFB60021","width":"1px"},"bottom":{"color":"#FFB60021","width":"1px"},"left":{"color":"#FFB60021","width":"1px"},"right":{"color":"#FFB60021","width":"1px"}}}},"txt":{"type":"text","data":{"default":{"color":"#FF000000"},"watermark":{"color":"#33000000"},"mandWatermark":{"color":"#FFFF0000"}}}},"checkBox":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"selected":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"mandatory":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"disabled":{"type":"solid","color":"#54d3d3d3","shadow":{"isInset":false,"x":"0px","y":"1px","blur":"0px","color":"#FFFFFFFF"}}}},"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}}},"selected":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}}},"mandatory":{"top":{"color":"#FFB60021","width":"1px"},"bottom":{"color":"#FFB60021","width":"1px"},"left":{"color":"#FFB60021","width":"1px"},"right":{"color":"#FFB60021","width":"1px"}},"disabled":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#00FFFFFF","isBlack":false,"isSimple":true},"selected":{"type":"solid","color":"#FF2a2a2a","isBlack":true,"isSimple":true}}}},"radioBtn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"selected":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"mandatory":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"disabled":{"type":"solid","color":"#54d3d3d3","shadow":{"isInset":false,"x":"0px","y":"1px","blur":"0px","color":"#FFFFFFFF"}}}},"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}}},"selected":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}}},"mandatory":{"top":{"color":"#FFB60021","width":"1px"},"bottom":{"color":"#FFB60021","width":"1px"},"left":{"color":"#FFB60021","width":"1px"},"right":{"color":"#FFB60021","width":"1px"}},"disabled":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#00FFFFFF","isBlack":false,"isSimple":true},"selected":{"type":"solid","color":"#FF2a2a2a","isBlack":true,"isSimple":true}}}}},"audioPlayer":{"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"hdrTxt"}]}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"hdrTxt","fn":"hsla","params":[1,1,1,0.8]}]}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrTxt"}]},"isBlack":false,"isSimple":true}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg","fn":"hsla","params":[1,1,0.3,1]}]}}}},"bgMini":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg","fn":"hsla","params":[1,1,0.3,1]}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.5,0.7,0.9],[1,0.7,0.6,0.9]]}]},"width":"1px"}}}},"seekBar":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,1.3,1],[1,0.7,0.7,1]]}]},"shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,0.001,1],[1,0.7,0.001,1]]}]}}}}},"brdr":{"type":"border","data":{"default":{"top":{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,1.1,1],[1,0.7,0.7,1]]}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,1.8,1],[1,0.7,0.7,1]]}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,1.8,1],[1,0.7,0.7,1]]}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,1.1,1],[1,0.7,0.7,1]]}]},"width":"1px"}}}},"seekFill":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrTxt"}]},"shadow":{"isInset":true,"x":"0px","y":"1px","blur":"1px","color":"#ff000000"}}}}}},"liveChat":{"bubbleMe":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.88]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}}}},"triangle":{"type":"border","data":{"default":{"ltrLeft":{"color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.88]}]},"width":"10px"},"bottom":{"color":"#00000000","width":"10px"},"top":{"color":"#00000000","width":"10px"}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBhdlTxt"}]},"shadow":{"x":"1px","y":"1px","blur":"0","color":"#CCFFFFFF"}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBsubTxt"}]},"shadow":{"x":"1px","y":"1px","blur":"1px","color":"#FFFFFFFF"}}}}},"bubbleOther":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAbg"}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}}}},"triangle":{"type":"border","data":{"default":{"ltrRight":{"color":{"_replace":[{"param":"contAbg"}]},"width":"10px"},"bottom":{"color":"#00000000","width":"10px"},"top":{"color":"#00000000","width":"10px"}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAhdlTxt"}]},"shadow":{"x":"1px","y":"1px","blur":"0px","color":"#CCFFFFFF"}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBsubTxt"}]},"shadow":{"x":"1px","y":"1px","blur":"0px","color":"#FFFFFFFF"}}}}}},"facebook":{"txt":{"type":"text","data":{"default":{"color":"#FF576b95"}}},"bubble":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFedeff4"}}},"brdr":{"type":"border","data":{"default":{"left":{"color":"#FFced5e4","width":"1px"},"right":{"color":"#FFced5e4","width":"1px"},"bottom":{"color":"#FFced5e4","width":"1px"},"top":{"color":"#FFced5e4","width":"1px"}}}},"triangle":{"type":"border","data":{"default":{"left":{"color":"#00000000","width":"4px"},"right":{"color":"#00000000","width":"4px"},"bottom":{"color":"#FFedeff4","width":"4px"}}}},"triangleBrdr":{"type":"border","data":{"default":{"left":{"color":"#00000000","width":"6px"},"right":{"color":"#00000000","width":"6px"},"bottom":{"color":"#FFced5e4","width":"6px"}}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000"},"clicked":{"type":"solid","color":"#FFFFCCAA"},"disabled":{"type":"solid","color":"#33333333"}}},"brdr":{"type":"border","data":{"default":{"left":{"color":"#00000000","width":"1px"},"right":{"color":"#00000000","width":"1px"},"bottom":{"color":"#00000000","width":"1px"},"top":{"color":"#00000000","width":"1px"}},"clicked":{"bottom":{"color":"#FFFF6611","width":"1px"},"right":{"color":"#FFFF6611","width":"1px"},"left":{"color":"#FFFF6611","width":"1px"},"top":{"color":"#FFFF6611","width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FF576b95"},"selected":{"color":"#FF576b95"},"disabled":{"color":"#CCCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF5F5B5A","isBlack":true,"isSimple":true},"clicked":{"type":"solid","color":"#FF464342","isBlack":true,"isSimple":true},"disabled":{"type":"solid","color":"#CCCCCCCC","isBlack":true,"isSimple":true}}}}},"events":{"calPict":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.78]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"2px","color":"#FF000000"}}}}}},"comment":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF"}}},"panel":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFF0F0F0"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FFCCCCCC","width":"1px"}}}}}},"images":{"image1":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FFC1C1C2","width":"1px"},"top":{"color":"#FFC1C1C2","width":"1px"},"right":{"color":"#FFC1C1C2","width":"1px"},"left":{"color":"#FFC1C1C2","width":"1px"}}}}},"image2":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FF000000","width":"1px"},"top":{"color":"#FF000000","width":"1px"},"right":{"color":"#FF000000","width":"1px"},"left":{"color":"#FF000000","width":"1px"}}}}},"imgBtn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#FF000000"}},"clicked":{"type":"solid","color":"#FFFFFFFF"},"selected":{"type":"solid","color":"#FFFFFFFF"}}},"overlayBg":{"type":"background","data":{"default":{"type":"solid","color":"#99000000"},"clicked":{"type":"solid","color":"#00000000"},"selected":{"type":"solid","color":"#00000000"}}},"brdr":{"type":"border","data":{"default":{"left":{"color":"#ffffffff","width":"3px"},"right":{"color":"#ffffffff","width":"3px"},"bottom":{"color":"#ffffffff","width":"3px"},"top":{"color":"#ffffffff","width":"3px"}},"clicked":{"bottom":{"color":"#00000000","width":"0px"},"right":{"color":"#00000000","width":"0px"},"left":{"color":"#00000000","width":"0px"},"top":{"color":"#00000000","width":"0px"}},"selected":{"bottom":{"color":"#00000000","width":"0px"},"right":{"color":"#00000000","width":"0px"},"left":{"color":"#00000000","width":"0px"},"top":{"color":"#00000000","width":"0px"}}}}}}}},"meta":{"bgImage":"http:\/\/storage.conduit.com\/Mobile\/31\/89\/3167176b-5689-4bf5-9121-e6385deb847b\/Images\/6dbf26a5-cfb5-42e0-bac1-5422b6fc8d83.jpg","culture":"PT-BR","header":{"type":1,"content":"http:\/\/storage.conduit.com\/Mobile\/31\/89\/3167176b-5689-4bf5-9121-e6385deb847b\/Images\/d1d54368-c39b-4460-859b-d6518df019a5.png"},"isRtl":false,"material":0},"name":"Gabriel Guimarães","pages":[{"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/48","id":"8e94dc59-c816-4b86-bce2-dbe5c9044ffb","label":"Sobre","meta":{"items":[{"imgUrl":"http:\/\/storage.conduit.com\/Mobile\/60\/d2\/60da0b7b-21d2-4873-ab02-9747e047938d\/Images\/aec0892d-986c-472e-82a1-7412e0b7426a.png","name":"Gabriel Guimarães","category":"Politician","genere":null,"buttons":{},"list":[],"description":"Mineiro de Governador Valadares, Gabriel Guimarães foi eleito aos 27 anos o deputado federal mais jovem do estado. Formado em Direito no Centro Universitário de Brasília\/DF (UNICEUB) adquiriu relevante experiência profissional, tendo trabalhado no Ministério Público Estadual de Minas Gerais, na Promotoria de Defesa do Patrimônio Público, no Tribunal de Justiça\/MG, na assessoria da Presidência da Câmara Federal, no Instituto Brasileiro de Administração Municipal – seção Minas Gerais- e no escritório Sacha Calmon & Mizabel Derzi. Nessas ocasiões teve oportunidade de conhecer boa parte dos problemas enfrentados pelos municípios, de compreender a complexidade do sistema tributário nacional e a importância de se tornar a justiça mais célere e eficiente.\u000d\u000a \u000d\u000aNo Congresso Nacional, Gabriel sempre esteve atento à atuação parlamentar de seu pai, o ex- deputado e fundador do Partido dos Trabalhadores em Minas Gerais, Virgílio Guimarães, aprendendo como se trabalha em prol dos municípios, do Estado e dos temas de interesse nacional.\u000d\u000a \u000d\u000aIntegrante de duas das mais importantes comissões da Câmara Federal: das Minas e Energia, e de Constituição, Justiça e Cidadania, tem o compromisso de trabalhar em propostas, planos e programas que contemplem o desenvolvimento sustentável do Setor de Mineração, de grande importância para Minas e o Brasil.\u000d\u000a \u000d\u000aRepresentante do Partido dos Trabalhadores na Frente Parlamentar em Defesa da Juventude, Gabriel trabalha para articular, fortalecer e ampliar as políticas públicas para os jovens, estabelecendo canais de diálogo entre poder público e juventude, debatendo idéias e lutando por ações que beneficiem os jovens de todo o país.\u000d\u000a \u000d\u000aEm 2011, nos primeiros meses de mandato, também foi designado Coordenador Geral da Frente Parlamentar em Defesa da Advocacia e da Frente Parlamentar Municipalista.\u000d\u000a \u000d\u000aEm suas primeiras ações como deputado federal, Gabriel reafirma seu compromisso de ser um interlocutor permanente entre os municípios e o governo federal, trabalhando pela Reforma Tributária, pela transformação dos CEFETS em Universidades Técnico Tecnológicas, por políticas públicas para a juventude, pela ampliação dos mecanismos de crédito para a agricultura familiar e o agronegócio, entre outros temas que contribuem para consolidar os avanços sociais dos últimos anos.\u000d\u000a \u000d\u000aCoordenador Geral da Frente Parlamentar em Defesa da Advocacia e MEMBRO da Frente Parlamentar Municipalista"}],"pageLayout":-1,"layout":null},"minVersion":"2.0.0.0","type":"5a8368df-6ebd-c0f2-2d82-e173c1f33d40","version":null},{"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/42","id":"7ed88213-9f6e-4849-8c64-b6a20b3221c7","label":"Fotos","meta":{"feeds":[{"title":"Ministério do Esporte","type":"facebook","userName":"deputadogabrielguimaraespt","params":{"albumId":"556905927665145","albumName":"Ministério do Esporte"}},{"title":"Transposição da Linha Férra do Centro de Juiz de Fora","type":"facebook","userName":"deputadogabrielguimaraespt","params":{"albumId":"556867714335633","albumName":"Transposição da Linha Férra do Centro de Juiz de Fora"}},{"title":"Atividades Ouro Preto e Ouro Branco","type":"facebook","userName":"deputadogabrielguimaraespt","params":{"albumId":"555915764430828","albumName":"Atividades Ouro Preto e Ouro Branco"}},{"title":"Direito do Trabalho","type":"facebook","userName":"deputadogabrielguimaraespt","params":{"albumId":"554154611273610","albumName":"Direito do Trabalho"}}],"pageLayout":9,"layout":null},"minVersion":"0.0.0.0","type":"3b11bcdf-ba5e-4eaa-9059-ea580b3f1681","version":null},{"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/17","id":"ad8ae3a1-40d3-400b-ba1b-0cdea4d5bf1f","label":"Facebook","meta":{"channels":[{"id":"cbbb2a1f-954b-4fdb-a77c-987e28fc282d","user":"deputadogabrielguimaraespt","title":"Gabriel Guimarães"}],"pageLayout":0,"layout":null},"minVersion":"0.0.0.0","type":"df7d11f3-233c-4d49-8f2a-d1886e07c641","version":null},{"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/15","id":"a26a54d9-d06a-4b9b-b0e0-d0fe9bf8c914","label":"Contato","meta":{"items":[{"title":"Gabriel Guimarães","header":"Endereço","phone":"Brasília:  (61) 3215-5821 ","id":"064ca82f-9220-3a92-90b1-c7f66cb978d9","mail":"contato@gabrielguimaraes.com.br","url":"http:\/\/www.gabrielguimaraes.com.br\/","fax":"Belo Horizonte:(31) 2532-1311","text":"Câmara dos Deputados - Anexo IV\u000d\u000aGab. 821 - CEP: 70160-900 - Brasília - DF \u000d\u000a\u000d\u000aRua Ouro Preto, 708, Barro Preto \u000d\u000aCEP: 30170-040 - Belo Horizonte - MG"}],"pageLayout":0,"layout":null},"minVersion":"1.9.0.0","type":"083e52df-721d-4ca4-efa3-25161d344f40","version":null},{"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/61","id":"7985f9e1-b799-4e26-b79a-bfd00cc100b4","label":"Videos","meta":{"pageLayout":-1,"items":[{"title":"Playlist","params":{"type":3,"className":"youtube","icon":"\/Images\/Providers\/Video\/small_icon_3.png","params":{"isOpenSearch":true},"youtube":{"type":"uploads","query":"GabrielPT1311","sort":"published"},"url":"http:\/\/gdata.youtube.com\/feeds\/api\/users\/GabrielPT1311\/uploads\/?v=2&format=5&orderby=published"},"id":"652aebaa-863d-544b-1418-f18728eb0969"}],"layout":{"meta":{"bgImage":"http:\/\/storage.conduit.com\/Mobile\/31\/89\/3167176b-5689-4bf5-9121-e6385deb847b\/Images\/dab48fd1-06fa-4901-8814-9f9904cc7950.jpg"}}},"minVersion":"2.0.0.0","type":"4680c3f3-e767-4ebf-b112-9ba769c3ff2a","version":null}],"publisherId":"24e42e7a-0245-47da-b9bd-bd051d57a669","settings":{"ads":{"adBarCycles":null,"bottomBarAdEnabled":null,"bottomBarSwitchInterval":null,"enabled":false,"fullScreenAdDisplayDuration":null,"fullScreenAdEnabled":null,"fullScreenAdTO":null},"brand":{"name":null,"link":null,"showAppLinks":true},"env":3,"fbAccessToken":"AAACeZBZANVcJ0BALWdkZBkVMprgCHf89vvzV3bq47rmnXHXXRnFbOhtwvU0k0tbUcL1aEjCQgZCrZCOhldBPeaBZAymqaZAyZBUZD","overrideServices":[{"key":"CMS_TWITTER_USER_GET","params":{},"version":1},{"key":"CMS_TWITTER_QUERY_GET","params":{},"version":1}]},"social":{"facebook":{"appId":"209845035304"}},"version":"1.2.4.75"},"maxAge":7200,"serviceUrl":"http:\/\/ams.mobile.conduit-services.com\/ab40b92b-37e9-47fe-ae88-fec3bc7de722\/2?appVersion={appVersion}"},{"data":{"albumName":"Ministério do Esporte","coverPhotoUrl":null,"description":null,"opeanSearch":null,"paging":null,"photos":[{"description":null,"id":"556907134331691","largeImage":"http:\/\/sphotos-d.ak.fbcdn.net\/hphotos-ak-ash3\/885059_556907134331691_453702623_o.jpg","mediumImage":"http:\/\/sphotos-d.ak.fbcdn.net\/hphotos-ak-ash4\/s600x600\/388638_556907134331691_453702623_n.jpg","photoTime":1365085868,"smallImage":"http:\/\/photos-d.ak.fbcdn.net\/hphotos-ak-ash4\/388638_556907134331691_453702623_s.jpg","socialInfo":{"imageUrl":"http:\/\/photos-d.ak.fbcdn.net\/hphotos-ak-ash4\/388638_556907134331691_453702623_s.jpg","shortDesc":null,"socialId":"Facebook556907134331691","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=556907134331691&set=a.556905927665145.1073741844.396162223739517&type=1"},"title":null},{"description":null,"id":"556907024331702","largeImage":"http:\/\/sphotos-g.ak.fbcdn.net\/hphotos-ak-prn1\/893195_556907024331702_1273846008_o.jpg","mediumImage":"http:\/\/sphotos-g.ak.fbcdn.net\/hphotos-ak-prn1\/s600x600\/64885_556907024331702_1273846008_n.jpg","photoTime":1365085851,"smallImage":"http:\/\/photos-g.ak.fbcdn.net\/hphotos-ak-prn1\/64885_556907024331702_1273846008_s.jpg","socialInfo":{"imageUrl":"http:\/\/photos-g.ak.fbcdn.net\/hphotos-ak-prn1\/64885_556907024331702_1273846008_s.jpg","shortDesc":null,"socialId":"Facebook556907024331702","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=556907024331702&set=a.556905927665145.1073741844.396162223739517&type=1"},"title":null},{"description":null,"id":"556906197665118","largeImage":"http:\/\/sphotos-b.xx.fbcdn.net\/hphotos-prn1\/894848_556906197665118_344599217_o.jpg","mediumImage":"http:\/\/sphotos-b.xx.fbcdn.net\/hphotos-frc1\/s600x600\/734534_556906197665118_344599217_n.jpg","photoTime":1365085688,"smallImage":"http:\/\/photos-b.xx.fbcdn.net\/hphotos-frc1\/734534_556906197665118_344599217_s.jpg","socialInfo":{"imageUrl":"http:\/\/photos-b.xx.fbcdn.net\/hphotos-frc1\/734534_556906197665118_344599217_s.jpg","shortDesc":null,"socialId":"Facebook556906197665118","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=556906197665118&set=a.556905927665145.1073741844.396162223739517&type=1"},"title":null},{"description":null,"id":"556906100998461","largeImage":"http:\/\/sphotos-a.xx.fbcdn.net\/hphotos-prn1\/893620_556906100998461_315253793_o.jpg","mediumImage":"http:\/\/sphotos-a.xx.fbcdn.net\/hphotos-prn1\/s600x600\/521734_556906100998461_315253793_n.jpg","photoTime":1365085671,"smallImage":"http:\/\/photos-a.xx.fbcdn.net\/hphotos-prn1\/521734_556906100998461_315253793_s.jpg","socialInfo":{"imageUrl":"http:\/\/photos-a.xx.fbcdn.net\/hphotos-prn1\/521734_556906100998461_315253793_s.jpg","shortDesc":null,"socialId":"Facebook556906100998461","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=556906100998461&set=a.556905927665145.1073741844.396162223739517&type=1"},"title":null},{"description":null,"id":"556905990998472","largeImage":"http:\/\/sphotos-a.ak.fbcdn.net\/hphotos-ak-frc1\/883667_556905990998472_1368572840_o.jpg","mediumImage":"http:\/\/sphotos-a.ak.fbcdn.net\/hphotos-ak-prn1\/s600x600\/579737_556905990998472_1368572840_n.jpg","photoTime":1365085655,"smallImage":"http:\/\/photos-a.ak.fbcdn.net\/hphotos-ak-prn1\/579737_556905990998472_1368572840_s.jpg","socialInfo":{"imageUrl":"http:\/\/photos-a.ak.fbcdn.net\/hphotos-ak-prn1\/579737_556905990998472_1368572840_s.jpg","shortDesc":null,"socialId":"Facebook556905990998472","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=556905990998472&set=a.556905927665145.1073741844.396162223739517&type=1"},"title":null},{"description":null,"id":"556905954331809","largeImage":"http:\/\/sphotos-a.xx.fbcdn.net\/hphotos-prn1\/903568_556905954331809_263600768_o.jpg","mediumImage":"http:\/\/sphotos-a.xx.fbcdn.net\/hphotos-prn1\/s600x600\/47012_556905954331809_263600768_n.jpg","photoTime":1365085650,"smallImage":"http:\/\/photos-a.xx.fbcdn.net\/hphotos-prn1\/47012_556905954331809_263600768_s.jpg","socialInfo":{"imageUrl":"http:\/\/photos-a.xx.fbcdn.net\/hphotos-prn1\/47012_556905954331809_263600768_s.jpg","shortDesc":null,"socialId":"Facebook556905954331809","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=556905954331809&set=a.556905927665145.1073741844.396162223739517&type=1"},"title":null}],"totalPhotos":6},"maxAge":1800,"serviceUrl":"http:\/\/cms.mobile.conduit-services.com\/photos\/facebook\/deputadogabrielguimaraespt\/25\/0\/?params=%7B%22albumId%22%3A%22556905927665145%22%2C%22albumName%22%3A%22Minist%C3%A9rio%20do%20Esporte%22%7D"},{"data":{"albumName":"Transposição da Linha Férra do Centro de Juiz de Fora","coverPhotoUrl":null,"description":null,"opeanSearch":null,"paging":null,"photos":[{"description":null,"id":"556869911002080","largeImage":"http:\/\/sphotos-e.ak.fbcdn.net\/hphotos-ak-prn1\/894994_556869911002080_1614493996_o.jpg","mediumImage":"http:\/\/sphotos-e.ak.fbcdn.net\/hphotos-ak-ash3\/s600x600\/575917_556869911002080_1614493996_n.jpg","photoTime":1365077551,"smallImage":"http:\/\/photos-e.ak.fbcdn.net\/hphotos-ak-ash3\/575917_556869911002080_1614493996_s.jpg","socialInfo":{"imageUrl":"http:\/\/photos-e.ak.fbcdn.net\/hphotos-ak-ash3\/575917_556869911002080_1614493996_s.jpg","shortDesc":"Solicitação para que a obra seja incluída no PAC está sendo analisada","socialId":"Facebook556869911002080","title":"Solicitação para que a obra seja incluída no PAC está sendo analisada","url":"http:\/\/www.facebook.com\/photo.php?fbid=556869911002080&set=a.556867714335633.1073741843.396162223739517&type=1"},"title":"Solicitação para que a obra seja incluída no PAC está sendo analisada"},{"description":null,"id":"556867857668952","largeImage":"http:\/\/sphotos-d.ak.fbcdn.net\/hphotos-ak-frc1\/903212_556867857668952_1784792800_o.jpg","mediumImage":"http:\/\/sphotos-d.ak.fbcdn.net\/hphotos-ak-ash3\/s600x600\/64478_556867857668952_1784792800_n.jpg","photoTime":1365077158,"smallImage":"http:\/\/photos-d.ak.fbcdn.net\/hphotos-ak-ash3\/64478_556867857668952_1784792800_s.jpg","socialInfo":{"imageUrl":"http:\/\/photos-d.ak.fbcdn.net\/hphotos-ak-ash3\/64478_556867857668952_1784792800_s.jpg","shortDesc":"Deputada Margarida, ministro Pimentel, deputado Gabriel, Márcio Mansur, prefeito Bruno Siqueira, prefeito César Emílio e Maurício Muniz","socialId":"Facebook556867857668952","title":"Deputada Margarida, ministro Pimentel, deputado Gabriel, Márcio Mansur, prefeito Bruno Siqueira, prefeito César Emílio e Maurício Muniz","url":"http:\/\/www.facebook.com\/photo.php?fbid=556867857668952&set=a.556867714335633.1073741843.396162223739517&type=1"},"title":"Deputada Margarida, ministro Pimentel, deputado Gabriel, Márcio Mansur, prefeito Bruno Siqueira, prefeito César Emílio e Maurício Muniz"}],"totalPhotos":2},"maxAge":1800,"serviceUrl":"http:\/\/cms.mobile.conduit-services.com\/photos\/facebook\/deputadogabrielguimaraespt\/25\/0\/?params=%7B%22albumId%22%3A%22556867714335633%22%2C%22albumName%22%3A%22Transposi%C3%A7%C3%A3o%20da%20Linha%20F%C3%A9rra%20do%20Centro%20de%20Juiz%20de%20Fora%22%7D"},{"data":{"albumName":"Atividades Ouro Preto e Ouro Branco","coverPhotoUrl":null,"description":null,"opeanSearch":null,"paging":null,"photos":[{"description":null,"id":"555916251097446","largeImage":"http:\/\/sphotos-a.ak.fbcdn.net\/hphotos-ak-ash3\/883256_555916251097446_566287225_o.jpg","mediumImage":"http:\/\/sphotos-a.ak.fbcdn.net\/hphotos-ak-ash3\/s600x600\/58071_555916251097446_566287225_n.jpg","photoTime":1364845963,"smallImage":"http:\/\/photos-a.ak.fbcdn.net\/hphotos-ak-ash3\/58071_555916251097446_566287225_s.jpg","socialInfo":{"imageUrl":"http:\/\/photos-a.ak.fbcdn.net\/hphotos-ak-ash3\/58071_555916251097446_566287225_s.jpg","shortDesc":null,"socialId":"Facebook555916251097446","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=555916251097446&set=a.555915764430828.1073741839.396162223739517&type=1"},"title":null},{"description":null,"id":"555916161097455","largeImage":"http:\/\/sphotos-f.ak.fbcdn.net\/hphotos-ak-frc1\/882954_555916161097455_93660462_o.jpg","mediumImage":"http:\/\/sphotos-f.ak.fbcdn.net\/hphotos-ak-prn1\/s600x600\/150155_555916161097455_93660462_n.jpg","photoTime":1364845947,"smallImage":"http:\/\/photos-f.ak.fbcdn.net\/hphotos-ak-prn1\/150155_555916161097455_93660462_s.jpg","socialInfo":{"imageUrl":"http:\/\/photos-f.ak.fbcdn.net\/hphotos-ak-prn1\/150155_555916161097455_93660462_s.jpg","shortDesc":"Junto aos companheiros Edilberto Silva; Tim Maia; vereador do PT, Neném da Vina; e secretária municipal de Saúde, Marcilene Aparecida, conversamos sobre projetos de melhorias para a Saúde, segurança e a possibilidade de destinar emenda para a construção da segunda Vara de Justiça de Ouro Branco","socialId":"Facebook555916161097455","title":"Junto aos companheiros Edilberto Silva; Tim Maia; vereador do PT, Neném da Vina; e secretária municipal de Saúde, Marcilene Aparecida, conversamos sobre projetos de melhorias para a Saúde, segurança e a possibilidade de destinar emenda para a construção da segunda Vara de Justiça de Ouro Branco","url":"http:\/\/www.facebook.com\/photo.php?fbid=555916161097455&set=a.555915764430828.1073741839.396162223739517&type=1"},"title":"Junto aos companheiros Edilberto Silva; Tim Maia; vereador do PT, Neném da Vina; e secretária municipal de Saúde, Marcilene Aparecida, conversamos sobre projetos de melhorias para a Saúde, segurança e a possibilidade de destinar emenda para a construção da segunda Vara de Justiça de Ouro Branco"},{"description":null,"id":"555916111097460","largeImage":"http:\/\/sphotos-b.xx.fbcdn.net\/hphotos-frc1\/902958_555916111097460_683736388_o.jpg","mediumImage":"http:\/\/sphotos-b.xx.fbcdn.net\/hphotos-ash3\/s600x600\/575797_555916111097460_683736388_n.jpg","photoTime":1364845939,"smallImage":"http:\/\/photos-b.xx.fbcdn.net\/hphotos-ash3\/575797_555916111097460_683736388_s.jpg","socialInfo":{"imageUrl":"http:\/\/photos-b.xx.fbcdn.net\/hphotos-ash3\/575797_555916111097460_683736388_s.jpg","shortDesc":"Em Ouro Branco, reunião com a prefeita Cida Campos, para discutirmos demandas importantes da cidade, como a construção da segunda vara de Justiça.","socialId":"Facebook555916111097460","title":"Em Ouro Branco, reunião com a prefeita Cida Campos, para discutirmos demandas importantes da cidade, como a construção da segunda vara de Justiça.","url":"http:\/\/www.facebook.com\/photo.php?fbid=555916111097460&set=a.555915764430828.1073741839.396162223739517&type=1"},"title":"Em Ouro Branco, reunião com a prefeita Cida Campos, para discutirmos demandas importantes da cidade, como a construção da segunda vara de Justiça."},{"description":null,"id":"555916031097468","largeImage":"http:\/\/sphotos-c.ak.fbcdn.net\/hphotos-ak-ash3\/882931_555916031097468_1405335998_o.jpg","mediumImage":"http:\/\/sphotos-c.ak.fbcdn.net\/hphotos-ak-frc1\/s600x600\/67237_555916031097468_1405335998_n.jpg","photoTime":1364845924,"smallImage":"http:\/\/photos-c.ak.fbcdn.net\/hphotos-ak-frc1\/67237_555916031097468_1405335998_s.jpg","socialInfo":{"imageUrl":"http:\/\/photos-c.ak.fbcdn.net\/hphotos-ak-frc1\/67237_555916031097468_1405335998_s.jpg","shortDesc":"Na entrevista ao grande jornalista Antônio Carlos, falamos sobre o quadro atual do PT na cidade, avanços dos nossos projetos habitacionais na cidade e a conquista, através de emenda parlamentar de minha autoria, da quadra poliesportiva em Cachoeiro do Campo.","socialId":"Facebook555916031097468","title":"Na entrevista ao grande jornalista Antônio Carlos, falamos sobre o quadro atual do PT na cidade, avanços dos nossos projetos habitacionais na cidade e a conquista, através de emenda parlamentar de minha autoria, da quadra poliesportiva em Cachoeiro do Campo.","url":"http:\/\/www.facebook.com\/photo.php?fbid=555916031097468&set=a.555915764430828.1073741839.396162223739517&type=1"},"title":"Na entrevista ao grande jornalista Antônio Carlos, falamos sobre o quadro atual do PT na cidade, avanços dos nossos projetos habitacionais na cidade e a conquista, através de emenda parlamentar de minha autoria, da quadra poliesportiva em Cachoeiro do Campo."},{"description":null,"id":"555915941097477","largeImage":"http:\/\/sphotos-a.ak.fbcdn.net\/hphotos-ak-frc3\/892417_555915941097477_1925696975_o.jpg","mediumImage":"http:\/\/sphotos-a.ak.fbcdn.net\/hphotos-ak-ash3\/s600x600\/536235_555915941097477_1925696975_n.jpg","photoTime":1364845917,"smallImage":"http:\/\/photos-a.ak.fbcdn.net\/hphotos-ak-ash3\/536235_555915941097477_1925696975_s.jpg","socialInfo":{"imageUrl":"http:\/\/photos-a.ak.fbcdn.net\/hphotos-ak-ash3\/536235_555915941097477_1925696975_s.jpg","shortDesc":"Com o prefeito Zé Leandro, tratamos sobre obras importantes na cidade, previstas no PAC Cidades Históricas. Vamos fazer a interlocução com o Governo Federal para a liberação dos recursos","socialId":"Facebook555915941097477","title":"Com o prefeito Zé Leandro, tratamos sobre obras importantes na cidade, previstas no PAC Cidades Históricas. Vamos fazer a interlocução com o Governo Federal para a liberação dos recursos","url":"http:\/\/www.facebook.com\/photo.php?fbid=555915941097477&set=a.555915764430828.1073741839.396162223739517&type=1"},"title":"Com o prefeito Zé Leandro, tratamos sobre obras importantes na cidade, previstas no PAC Cidades Históricas. Vamos fazer a interlocução com o Governo Federal para a liberação dos recursos"},{"description":null,"id":"555915841097487","largeImage":"http:\/\/sphotos-f.ak.fbcdn.net\/hphotos-ak-frc1\/882997_555915841097487_1731021670_o.jpg","mediumImage":"http:\/\/sphotos-f.ak.fbcdn.net\/hphotos-ak-prn1\/s600x600\/625611_555915841097487_1731021670_n.jpg","photoTime":1364845904,"smallImage":"http:\/\/photos-f.ak.fbcdn.net\/hphotos-ak-prn1\/625611_555915841097487_1731021670_s.jpg","socialInfo":{"imageUrl":"http:\/\/photos-f.ak.fbcdn.net\/hphotos-ak-prn1\/625611_555915841097487_1731021670_s.jpg","shortDesc":"Nos comprometemos a ajudar o Abrigo Institucional de Crianças, conhecido como Casa Lar. Hoje, atende 25 crianças e adolescentes em situação de risco social. Na foto, a coordenadora do abrigo, Nancy Ribeiro de Carvalho.","socialId":"Facebook555915841097487","title":"Nos comprometemos a ajudar o Abrigo Institucional de Crianças, conhecido como Casa Lar. Hoje, atende 25 crianças e adolescentes em situação de risco social. Na foto, a coordenadora do abrigo, Nancy Ribeiro de Carvalho.","url":"http:\/\/www.facebook.com\/photo.php?fbid=555915841097487&set=a.555915764430828.1073741839.396162223739517&type=1"},"title":"Nos comprometemos a ajudar o Abrigo Institucional de Crianças, conhecido como Casa Lar. Hoje, atende 25 crianças e adolescentes em situação de risco social. Na foto, a coordenadora do abrigo, Nancy Ribeiro de Carvalho."},{"description":null,"id":"555915787764159","largeImage":"http:\/\/sphotos-b.xx.fbcdn.net\/hphotos-frc3\/892321_555915787764159_1604129235_o.jpg","mediumImage":"http:\/\/sphotos-b.xx.fbcdn.net\/hphotos-ash3\/s600x600\/58879_555915787764159_1604129235_n.jpg","photoTime":1364845897,"smallImage":"http:\/\/photos-b.xx.fbcdn.net\/hphotos-ash3\/58879_555915787764159_1604129235_s.jpg","socialInfo":{"imageUrl":"http:\/\/photos-b.xx.fbcdn.net\/hphotos-ash3\/58879_555915787764159_1604129235_s.jpg","shortDesc":"Visita à sede da Secretaria de Desenvolvimento Social, Habitação e Cidadania de Ouro Preto, com o secretário municipal, companheiro Wanderley Kuruzu.","socialId":"Facebook555915787764159","title":"Visita à sede da Secretaria de Desenvolvimento Social, Habitação e Cidadania de Ouro Preto, com o secretário municipal, companheiro Wanderley Kuruzu.","url":"http:\/\/www.facebook.com\/photo.php?fbid=555915787764159&set=a.555915764430828.1073741839.396162223739517&type=1"},"title":"Visita à sede da Secretaria de Desenvolvimento Social, Habitação e Cidadania de Ouro Preto, com o secretário municipal, companheiro Wanderley Kuruzu."}],"totalPhotos":7},"maxAge":1800,"serviceUrl":"http:\/\/cms.mobile.conduit-services.com\/photos\/facebook\/deputadogabrielguimaraespt\/25\/0\/?params=%7B%22albumId%22%3A%22555915764430828%22%2C%22albumName%22%3A%22Atividades%20Ouro%20Preto%20e%20Ouro%20Branco%22%7D"},{"data":{"albumName":"Direito do Trabalho","coverPhotoUrl":null,"description":null,"opeanSearch":null,"paging":null,"photos":[{"description":null,"id":"554154907940247","largeImage":"http:\/\/sphotos-f.ak.fbcdn.net\/hphotos-ak-ash3\/886669_554154907940247_1332910559_o.jpg","mediumImage":"http:\/\/sphotos-f.ak.fbcdn.net\/hphotos-ak-ash3\/s600x600\/17789_554154907940247_1332910559_n.jpg","photoTime":1364477489,"smallImage":"http:\/\/photos-f.ak.fbcdn.net\/hphotos-ak-ash3\/17789_554154907940247_1332910559_s.jpg","socialInfo":{"imageUrl":"http:\/\/photos-f.ak.fbcdn.net\/hphotos-ak-ash3\/17789_554154907940247_1332910559_s.jpg","shortDesc":null,"socialId":"Facebook554154907940247","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=554154907940247&set=a.554154611273610.1073741838.396162223739517&type=1"},"title":null},{"description":null,"id":"554154861273585","largeImage":"http:\/\/sphotos-h.ak.fbcdn.net\/hphotos-ak-frc1\/901592_554154861273585_1628333767_o.jpg","mediumImage":"http:\/\/sphotos-h.ak.fbcdn.net\/hphotos-ak-ash3\/s600x600\/527607_554154861273585_1628333767_n.jpg","photoTime":1364477481,"smallImage":"http:\/\/photos-h.ak.fbcdn.net\/hphotos-ak-ash3\/527607_554154861273585_1628333767_s.jpg","socialInfo":{"imageUrl":"http:\/\/photos-h.ak.fbcdn.net\/hphotos-ak-ash3\/527607_554154861273585_1628333767_s.jpg","shortDesc":null,"socialId":"Facebook554154861273585","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=554154861273585&set=a.554154611273610.1073741838.396162223739517&type=1"},"title":null},{"description":null,"id":"554154684606936","largeImage":"http:\/\/sphotos-a.xx.fbcdn.net\/hphotos-frc1\/906743_554154684606936_886026365_o.jpg","mediumImage":"http:\/\/sphotos-a.xx.fbcdn.net\/hphotos-ash3\/s600x600\/526651_554154684606936_886026365_n.jpg","photoTime":1364477456,"smallImage":"http:\/\/photos-a.xx.fbcdn.net\/hphotos-ash3\/526651_554154684606936_886026365_s.jpg","socialInfo":{"imageUrl":"http:\/\/photos-a.xx.fbcdn.net\/hphotos-ash3\/526651_554154684606936_886026365_s.jpg","shortDesc":null,"socialId":"Facebook554154684606936","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=554154684606936&set=a.554154611273610.1073741838.396162223739517&type=1"},"title":null}],"totalPhotos":3},"maxAge":1800,"serviceUrl":"http:\/\/cms.mobile.conduit-services.com\/photos\/facebook\/deputadogabrielguimaraespt\/25\/0\/?params=%7B%22albumId%22%3A%22554154611273610%22%2C%22albumName%22%3A%22Direito%20do%20Trabalho%22%7D"},{"data":{"data":[{"caption":"www.pt.org.br","description":"Câmara: Líder do PT acredita num acordo para votação de MP´s nesta terça","from":{"id":"396162223739517","name":"Gabriel Guimarães","category":"Politician"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"396162223739517_579765625379175","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQCiz6UCeJQyS_vG&w=154&h=154&url=http%3A%2F%2Fwww.pt.org.br%2Fbanners%2Fbanner1.jpg","likes":2,"link":"http:\/\/www.pt.org.br\/noticias\/view\/camara_lider_do_pt_acredita_num_acordo_para_votacaeo_de_mps_nesta_terca","message":"Em pauta: A MP 605\/13 trata da redução das tarifas de energia elétrica, e a MP 601\/12 amplia para mais setores da economia a desoneração da folha de pagamento previstas no Plano Brasil Maior de incentivo à indústria nacional.","name":"Câmara: Líder do PT acredita num acordo para votação de MP´s nesta terça","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQCiz6UCeJQyS_vG&w=154&h=154&url=http%3A%2F%2Fwww.pt.org.br%2Fbanners%2Fbanner1.jpg","shortDesc":"Em pauta: A MP 605\/13 trata da redução das tarifas de energia elétrica, e a MP 601\/12 amplia para mais setores da economia a desoneração da folha de pagamento previstas no Plano Brasil Maior de incentivo à indústria nacional.","socialId":"Facebook:396162223739517_579765625379175","title":"www.pt.org.br","url":"http:\/\/www.pt.org.br\/noticias\/view\/camara_lider_do_pt_acredita_num_acordo_para_votacaeo_de_mps_nesta_terca"},"time":1369742082,"type":"link"},{"caption":"www.brasil.gov.br","description":"A Secretaria de Direitos Humanos da Presidência da República  possui uma área específica para tratar o assunto: é a Comissão Nacional para Erradicação do Trabalho Escravo (Conatrae) ","from":{"id":"396162223739517","name":"Gabriel Guimarães","category":"Politician"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"396162223739517_579763332046071","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBxQXjdNNgm01LY&w=154&h=154&url=http%3A%2F%2Fwww.brasil.gov.br%2Fimagens%2Fnoticias%2Fimagens-2010%2Fsetembro%2F14%2Frelatorio-da-onu-diz-que-brasil-precisa-mudar-legislacao-contra-trabalho-escravo%2Fimage_12","likes":4,"link":"http:\/\/www.brasil.gov.br\/noticias\/arquivos\/2013\/05\/27\/brasil-promove-encontros-para-debater-o-combate-ao-trabalho-escravo","message":"A Secretaria de Direitos Humanos da Presidência da República (SDH\/PR) e o Conselho da Justiça Federal (CJF) formalizaram acordo de cooperação técnica visando a difusão de conhecimento e experiências direcionadas à prevenção e ao enfrentamento do trabalho escravo no País.","name":"Brasil promove encontros para debater sobre o combate ao trabalho escravo - Portal Brasil","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBxQXjdNNgm01LY&w=154&h=154&url=http%3A%2F%2Fwww.brasil.gov.br%2Fimagens%2Fnoticias%2Fimagens-2010%2Fsetembro%2F14%2Frelatorio-da-onu-diz-que-brasil-precisa-mudar-legislacao-contra-trabalho-escravo%2Fimage_12","shortDesc":"A Secretaria de Direitos Humanos da Presidência da República (SDH\/PR) e o Conselho da Justiça Federal (CJF) formalizaram acordo de cooperação técnica visando a difusão de conhecimento e experiências direcionadas à prevenção e ao enfrentamento do trabalho escravo no País.","socialId":"Facebook:396162223739517_579763332046071","title":"www.brasil.gov.br","url":"http:\/\/www.brasil.gov.br\/noticias\/arquivos\/2013\/05\/27\/brasil-promove-encontros-para-debater-o-combate-ao-trabalho-escravo"},"time":1369741734,"type":"link"},{"caption":"portal.mec.gov.br","description":"Portal do Ministério da Educação","from":{"id":"396162223739517","name":"Gabriel Guimarães","category":"Politician"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"396162223739517_579762582046146","likes":1,"link":"http:\/\/portal.mec.gov.br\/index.php?option=com_content&view=article&id=18734%3Anumero-de-inscritos-para-o-exame-supera-68-milhoes-ate-as-18h-do-ultimo-dia&catid=212&Itemid=86","message":"O número de candidatos inscritos para o Exame Nacional do Ensino Médio (Enem) chegou a 6.856.006, até as 18h07 desta segunda-feira, 27, último dia de prazo. A média de inscrições tem sido de aproximadamente 700 por minuto, número de acordo com as expectativas para o último dia.","name":"Número de inscritos para o exame supera 6,8 milhões até as 18h do último dia","socialInfo":{"imageUrl":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","shortDesc":"O número de candidatos inscritos para o Exame Nacional do Ensino Médio (Enem) chegou a 6.856.006, até as 18h07 desta segunda-feira, 27, último dia de prazo. A média de inscrições tem sido de aproximadamente 700 por minuto, número de acordo com as expectativas para o último dia.","socialId":"Facebook:396162223739517_579762582046146","title":"portal.mec.gov.br","url":"http:\/\/portal.mec.gov.br\/index.php?option=com_content&view=article&id=18734%3Anumero-de-inscritos-para-o-exame-supera-68-milhoes-ate-as-18h-do-ultimo-dia&catid=212&Itemid=86"},"time":1369741608,"type":"link"},{"caption":"www.portalfederativo.gov.br","description":"Subchefia de Assuntos Federativos Secretaria de Relações Institucionais Presidência da República Praça dos Três Poderes, Palácio do Planalto, Anexo I, 1 andar - sala 205\/A 55 (61) 3411.3521 \/ 3516 \/FAX - 55 (61) 3323.4304","from":{"id":"396162223739517","name":"Gabriel Guimarães","category":"Politician"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"396162223739517_579761958712875","likes":1,"link":"http:\/\/www.portalfederativo.gov.br\/bin\/view\/Inicio\/PartirDeHojeTodosOsMunicipiosDoPaisDevemPublicarReceitasDespesasNaInternet","message":"O prazo para municípios com menos de 50 mil habitantes se adequarem à Lei da Transparência termina nesta segunda-feira (27\/05). A partir de hoje, todas as prefeituras que se enquadram nesta situação (4.958 municípios ou 89% do total) precisam divulgar pela internet todas as despesas e receitas.","name":"A partir de hoje (27\/05) todos os municípios do país devem publicar receitas e despesas na internet","socialInfo":{"imageUrl":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","shortDesc":"O prazo para municípios com menos de 50 mil habitantes se adequarem à Lei da Transparência termina nesta segunda-feira (27\/05). A partir de hoje, todas as prefeituras que se enquadram nesta situação (4.958 municípios ou 89% do total) precisam divulgar pela internet todas as despesas e receitas.","socialId":"Facebook:396162223739517_579761958712875","title":"www.portalfederativo.gov.br","url":"http:\/\/www.portalfederativo.gov.br\/bin\/view\/Inicio\/PartirDeHojeTodosOsMunicipiosDoPaisDevemPublicarReceitasDespesasNaInternet"},"time":1369741509,"type":"link"},{"caption":"www.brasil.gov.br","description":"Antes desta distribuição, os estados já possuíam estoque de 720.280 caixas para adultos e 87.666 para crianças. A prescrição do medicamento é uma das principais recomendações do tratamento de Influenza","from":{"id":"396162223739517","name":"Gabriel Guimarães","category":"Politician"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"396162223739517_579760652046339","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBqG9OG8xA9OdEf&w=154&h=154&url=http%3A%2F%2Fwww.brasil.gov.br%2Fimagens%2Fnoticias%2Fimagens-2013%2Fmaio%2Fo-medicamento-e-oferecido-gratuitamente-na-rede-publica%2Fimage_12","likes":2,"link":"http:\/\/www.brasil.gov.br\/noticias\/arquivos\/2013\/05\/28\/um-milhao-de-caixas-de-tamiflu-serao-disponibilizadas-para-todos-os-estados-do-pais","message":"O Ministério da Saúde anunciou na segunda que está enviando caixas do medicamento Tamiflu para garantir a disponibilidade nos estoques de todo o País. Em 2013 já foram enviados às secretarias estaduais 1.074.180 tratamentos do medicamento e 151.300 caixas de uso pediátrico.","name":"Um milhão de caixas de Tamiflu serão disponibilizadas para todos os estados do País - Portal Brasil","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBqG9OG8xA9OdEf&w=154&h=154&url=http%3A%2F%2Fwww.brasil.gov.br%2Fimagens%2Fnoticias%2Fimagens-2013%2Fmaio%2Fo-medicamento-e-oferecido-gratuitamente-na-rede-publica%2Fimage_12","shortDesc":"O Ministério da Saúde anunciou na segunda que está enviando caixas do medicamento Tamiflu para garantir a disponibilidade nos estoques de todo o País. Em 2013 já foram enviados às secretarias estaduais 1.074.180 tratamentos do medicamento e 151.300 caixas de uso pediátrico.","socialId":"Facebook:396162223739517_579760652046339","title":"www.brasil.gov.br","url":"http:\/\/www.brasil.gov.br\/noticias\/arquivos\/2013\/05\/28\/um-milhao-de-caixas-de-tamiflu-serao-disponibilizadas-para-todos-os-estados-do-pais"},"time":1369741282,"type":"link"},{"from":{"id":"396162223739517","name":"Gabriel Guimarães","category":"Politician"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yz\/r\/StEh3RhPvjk.gif","id":"396162223739517_579759648713106","image":"http:\/\/photos-f.ak.fbcdn.net\/hphotos-ak-frc3\/430155_579759642046440_528527087_s.jpg","likes":4,"link":"http:\/\/www.facebook.com\/photo.php?fbid=579759642046440&set=a.396184027070670.92587.396162223739517&type=1&relevant_count=1","message":"Bom dia para todos!","socialInfo":{"imageUrl":"http:\/\/photos-f.ak.fbcdn.net\/hphotos-ak-frc3\/430155_579759642046440_528527087_s.jpg","shortDesc":"Bom dia para todos!","socialId":"Facebook:396162223739517_579759648713106","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=579759642046440&set=a.396184027070670.92587.396162223739517&type=1&relevant_count=1"},"time":1369741123,"type":"photo"},{"caption":"www.mct.gov.br","description":"De acordo com a copresidente da Força-Tarefa em Inventários Nacionais de Gases de Efeito Estufa do IPCC Thelma Krug, o documento ainda não é público. Ainda de acordo com ela, haverá uma nova rodada de debates em outubro deste ano onde serão anunciados os novos métodos. “Aqui em Manaus os autores con...","from":{"id":"396162223739517","name":"Gabriel Guimarães","category":"Politician"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"396162223739517_579439945411743","likes":2,"link":"http:\/\/www.mct.gov.br\/index.php\/content\/view\/347135\/Cientistas_formatam_metodo_para_medir_emissoes_de_areas_alagadas.html","message":"Cientistas formatam método para medir emissões de áreas alagadas","name":"PORTAL DO MINISTÉRIO DA CIÊNCIA, TECNOLOGIA E INOVAÇÃO","socialInfo":{"imageUrl":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","shortDesc":"Cientistas formatam método para medir emissões de áreas alagadas","socialId":"Facebook:396162223739517_579439945411743","title":"www.mct.gov.br","url":"http:\/\/www.mct.gov.br\/index.php\/content\/view\/347135\/Cientistas_formatam_metodo_para_medir_emissoes_de_areas_alagadas.html"},"time":1369677457,"type":"link"},{"caption":"www.mct.gov.br","description":"Os países envolvidos são: Alemanha, Argentina, Bélgica, Colômbia, Costa Rica, Cuba, França, Itália, México, Portugal, Uruguai e Peru.","from":{"id":"396162223739517","name":"Gabriel Guimarães","category":"Politician"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"396162223739517_579439552078449","likes":3,"link":"http:\/\/www.mct.gov.br\/index.php\/content\/view\/347134\/CNPq_lanca_chamada_para_projetos_conjuntos_com_12_paises.html","message":"O Conselho Nacional de Desenvolvimento Científico e Tecnológico (CNPq\/MCTI) comunica o lançamento da chamada pública n° 17\/2013 Cooperação Internacional – Acordos Bilaterais, que visa apoiar projetos conjuntos com 12 países da Europa, América do Sul e Central e Caribe.","name":"PORTAL DO MINISTÉRIO DA CIÊNCIA, TECNOLOGIA E INOVAÇÃO","socialInfo":{"imageUrl":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","shortDesc":"O Conselho Nacional de Desenvolvimento Científico e Tecnológico (CNPq\/MCTI) comunica o lançamento da chamada pública n° 17\/2013 Cooperação Internacional – Acordos Bilaterais, que visa apoiar projetos conjuntos com 12 países da Europa, América do Sul e Central e Caribe.","socialId":"Facebook:396162223739517_579439552078449","title":"www.mct.gov.br","url":"http:\/\/www.mct.gov.br\/index.php\/content\/view\/347134\/CNPq_lanca_chamada_para_projetos_conjuntos_com_12_paises.html"},"time":1369677379,"type":"link"},{"caption":"portal.mec.gov.br","description":"Portal do Ministério da Educação","from":{"id":"396162223739517","name":"Gabriel Guimarães","category":"Politician"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"396162223739517_579436792078725","likes":6,"link":"http:\/\/portal.mec.gov.br\/index.php?option=com_content&view=article&id=18719%3Amais-educacao-recebe-adesao-de-escolas-so-ate-sexta-feira-31&catid=211&Itemid=86","message":"As escolas públicas pré-selecionadas têm prazo somente até sexta-feira, 31, para aderir ao programa Mais Educação. O cadastramento deve ser feito pela internet. A meta do governo federal é atingir 45 mil escolas este ano e 60 mil em 2014.","name":"Mais Educação recebe adesão de escolas só até sexta-feira, 31","socialInfo":{"imageUrl":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","shortDesc":"As escolas públicas pré-selecionadas têm prazo somente até sexta-feira, 31, para aderir ao programa Mais Educação. O cadastramento deve ser feito pela internet. A meta do governo federal é atingir 45 mil escolas este ano e 60 mil em 2014.","socialId":"Facebook:396162223739517_579436792078725","title":"portal.mec.gov.br","url":"http:\/\/portal.mec.gov.br\/index.php?option=com_content&view=article&id=18719%3Amais-educacao-recebe-adesao-de-escolas-so-ate-sexta-feira-31&catid=211&Itemid=86"},"time":1369676969,"type":"link"},{"caption":"www.brasil.gov.br","description":"Semana Nacional dos Alimentos Orgânicos esclarece aos consumidores o que são produtos orgânicos e quais os benefícios ambientais, sociais e nutricionais que podem trazer","from":{"id":"396162223739517","name":"Gabriel Guimarães","category":"Politician"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"396162223739517_579411795414558","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQDYAnpkOEngiI9A&w=154&h=154&url=http%3A%2F%2Fwww.brasil.gov.br%2Fimagens%2Fnoticias%2Fimagens-2013%2Fmaio%2Fsemana-nacional-de-alimentos-organicos%2Fimage_12","likes":1,"link":"http:\/\/www.brasil.gov.br\/noticias\/arquivos\/2013\/05\/27\/eventos-incentivam-a-producao-de-alimentos-organicos-no-pais","message":"Durante seis dias, várias cidades brasileiras realizarão cursos, seminários, debates e oficinas, além de feiras sobre produtos orgânicos e os seus benefícios ambientais, sociais e nutricionais. Serão 180 eventos programados dentro da Semana Nacional dos Alimentos Orgânicos.","name":"Eventos incentivam a produção de alimentos orgânicos no País - Portal Brasil","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQDYAnpkOEngiI9A&w=154&h=154&url=http%3A%2F%2Fwww.brasil.gov.br%2Fimagens%2Fnoticias%2Fimagens-2013%2Fmaio%2Fsemana-nacional-de-alimentos-organicos%2Fimage_12","shortDesc":"Durante seis dias, várias cidades brasileiras realizarão cursos, seminários, debates e oficinas, além de feiras sobre produtos orgânicos e os seus benefícios ambientais, sociais e nutricionais. Serão 180 eventos programados dentro da Semana Nacional dos Alimentos Orgânicos.","socialId":"Facebook:396162223739517_579411795414558","title":"www.brasil.gov.br","url":"http:\/\/www.brasil.gov.br\/noticias\/arquivos\/2013\/05\/27\/eventos-incentivam-a-producao-de-alimentos-organicos-no-pais"},"time":1369673295,"type":"link"},{"caption":"www.pt.org.br","description":"Governo convoca CUT e demais centrais para discutir PEC das Domésticas e terceirização","from":{"id":"396162223739517","name":"Gabriel Guimarães","category":"Politician"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"396162223739517_579406515415086","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBJJO-AP0qgxBPr&w=154&h=154&url=http%3A%2F%2Fwww.pt.org.br%2Fimages%2Fuploads%2Fvagnerfreitas.jpg","likes":4,"link":"http:\/\/www.pt.org.br\/noticias\/view\/governo_convoca_cut_e_demais_centrais_para_discutir_pec_das_domesticas_e_te","message":"O presidente da CUT, Vagner Freitas, e representantes das demais centrais sindicais se reúnem com o governo federal nestaa segunda-feira (27), às 17h, em Brasília, para discutir especificamente a regulamentação da PEC das Domésticas e terceirização.","name":"Governo convoca CUT e demais centrais para discutir PEC das Domésticas e terceirização","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBJJO-AP0qgxBPr&w=154&h=154&url=http%3A%2F%2Fwww.pt.org.br%2Fimages%2Fuploads%2Fvagnerfreitas.jpg","shortDesc":"O presidente da CUT, Vagner Freitas, e representantes das demais centrais sindicais se reúnem com o governo federal nestaa segunda-feira (27), às 17h, em Brasília, para discutir especificamente a regulamentação da PEC das Domésticas e terceirização.","socialId":"Facebook:396162223739517_579406515415086","title":"www.pt.org.br","url":"http:\/\/www.pt.org.br\/noticias\/view\/governo_convoca_cut_e_demais_centrais_para_discutir_pec_das_domesticas_e_te"},"time":1369672636,"type":"link"},{"from":{"id":"396162223739517","name":"Gabriel Guimarães","category":"Politician"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yz\/r\/StEh3RhPvjk.gif","id":"396162223739517_579361762086228","image":"http:\/\/photos-e.ak.fbcdn.net\/hphotos-ak-ash3\/253380_579361738752897_1631209035_s.jpg","likes":5,"link":"http:\/\/www.facebook.com\/photo.php?fbid=579361738752897&set=a.396184027070670.92587.396162223739517&type=1&relevant_count=1","socialInfo":{"imageUrl":"http:\/\/photos-e.ak.fbcdn.net\/hphotos-ak-ash3\/253380_579361738752897_1631209035_s.jpg","shortDesc":null,"socialId":"Facebook:396162223739517_579361762086228","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=579361738752897&set=a.396184027070670.92587.396162223739517&type=1&relevant_count=1"},"time":1369667757,"type":"photo"},{"from":{"id":"396162223739517","name":"Gabriel Guimarães","category":"Politician"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yz\/r\/StEh3RhPvjk.gif","id":"396162223739517_579350428754028","image":"http:\/\/photos-b.ak.fbcdn.net\/hphotos-ak-ash3\/581251_579350412087363_2099899129_s.jpg","likes":33,"link":"http:\/\/www.facebook.com\/photo.php?fbid=579350412087363&set=a.396184027070670.92587.396162223739517&type=1&relevant_count=1","socialInfo":{"imageUrl":"http:\/\/photos-b.ak.fbcdn.net\/hphotos-ak-ash3\/581251_579350412087363_2099899129_s.jpg","shortDesc":null,"socialId":"Facebook:396162223739517_579350428754028","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=579350412087363&set=a.396184027070670.92587.396162223739517&type=1&relevant_count=1"},"time":1369676183,"type":"photo"},{"caption":"www.brasil.gov.br","description":"Iniciativa sensibilizará os motoristas que viajarão nas estradas para aproveitar o feriado de Corpus Christi, na próxima quinta-feira (30)","from":{"id":"396162223739517","name":"Gabriel Guimarães","category":"Politician"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"396162223739517_579339758755095","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBERrJS3cyZ0zAv&w=154&h=154&url=http%3A%2F%2Fwww.brasil.gov.br%2Fimagens%2Fnoticias%2Fimagens-2013%2Fmaio%2Fcampanha-201cprevencao-de-acidentes-nas-rodovias201d-pretende-alertar-motoristas-sobre-cuidados-na-direcao%2Fimage_12","likes":4,"link":"http:\/\/www.brasil.gov.br\/noticias\/arquivos\/2013\/05\/27\/campanha-incentiva-reducao-de-acidentes-nas-rodovias-brasileiras","message":"A campanha publicitária de trânsito “Prevenção de Acidentes nas Rodovias” foi lançada neste sábado (25), em todo o País. A ação contará com spots nas principais emissoras de rádio e banners em mídias sociais e portais na internet.","name":"Nova campanha incentiva redução de acidentes nas rodovias brasileiras - Portal Brasil","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBERrJS3cyZ0zAv&w=154&h=154&url=http%3A%2F%2Fwww.brasil.gov.br%2Fimagens%2Fnoticias%2Fimagens-2013%2Fmaio%2Fcampanha-201cprevencao-de-acidentes-nas-rodovias201d-pretende-alertar-motoristas-sobre-cuidados-na-direcao%2Fimage_12","shortDesc":"A campanha publicitária de trânsito “Prevenção de Acidentes nas Rodovias” foi lançada neste sábado (25), em todo o País. A ação contará com spots nas principais emissoras de rádio e banners em mídias sociais e portais na internet.","socialId":"Facebook:396162223739517_579339758755095","title":"www.brasil.gov.br","url":"http:\/\/www.brasil.gov.br\/noticias\/arquivos\/2013\/05\/27\/campanha-incentiva-reducao-de-acidentes-nas-rodovias-brasileiras"},"time":1369663990,"type":"link"},{"caption":"www.mct.gov.br","description":"Com as novas unidades, a Rute passará a ter 76 núcleos em operação em todo o Brasil. A iniciativa é considerada a maior do mundo na integração de hospitais universitários e de ensino conectados à infraestrutura avançada da Rede Nacional de Ensino e Pesquisa (RNP). A pesquisa colaborativa e o ensino…","from":{"id":"396162223739517","name":"Gabriel Guimarães","category":"Politician"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"396162223739517_579330918755979","likes":2,"link":"http:\/\/www.mct.gov.br\/index.php\/content\/view\/347101\/Rede_universitaria_de_telemedicina_inaugura_novos_nucleos.html","message":"A Rede Nacional de Ensino e Pesquisa (RNP) inaugura nesta segunda-feira (27) três núcleos da Rede Universitária de Telemedicina (Rute). Os contemplados são o Hospital Municipal Mário Gatti (HMMG), o Hospital Risoleta Tolentino Neves (HRTN), da Universidade Federal de Minas Gerais, e o Hospital Universitário da Grande Dourados (HUGD), da Universidade Federal da Grande Dourados.","name":"PORTAL DO MINISTÉRIO DA CIÊNCIA, TECNOLOGIA E INOVAÇÃO","socialInfo":{"imageUrl":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","shortDesc":"A Rede Nacional de Ensino e Pesquisa (RNP) inaugura nesta segunda-feira (27) três núcleos da Rede Universitária de Telemedicina (Rute). Os contemplados são o Hospital Municipal Mário Gatti (HMMG), o Hospital Risoleta Tolentino Neves (HRTN), da Universidade Federal de Minas Gerais, e o Hospital Universitário da Grande Dourados (HUGD), da Universidade Federal da Grande Dourados.","socialId":"Facebook:396162223739517_579330918755979","title":"www.mct.gov.br","url":"http:\/\/www.mct.gov.br\/index.php\/content\/view\/347101\/Rede_universitaria_de_telemedicina_inaugura_novos_nucleos.html"},"time":1369662868,"type":"link"},{"caption":"www.pt.org.br","description":"Café com a Presidenta: Dilma Rousseff fala sobre os seis estádios que vão sediar os jogos da Copa","from":{"id":"396162223739517","name":"Gabriel Guimarães","category":"Politician"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"396162223739517_579329232089481","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQDyIujUrbvJUYFV&w=154&h=154&url=http%3A%2F%2Fwww.pt.org.br%2Fimages%2Fuploads%2FDilma02.jpg","likes":7,"link":"http:\/\/www.pt.org.br\/noticias\/view\/cafe_com_a_presidenta_dilma_rousseff_fala_sobre_os_seis_estadios_que_vaeo_s","message":"No programa Café com a Presidenta de hoje, Dilma Rousseff falou sobre os seis estádios que vão sediar os jogos da Copa das Confederações e da Copa do Mundo de 2014. A presidenta Dilma viajou pelo país para inaugurar as arenas, que, segundo ela, estão entre as mais modernas do mundo.","name":"Café com a Presidenta: Dilma Rousseff fala sobre os seis estádios que vão sediar os jogos da Copa","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQDyIujUrbvJUYFV&w=154&h=154&url=http%3A%2F%2Fwww.pt.org.br%2Fimages%2Fuploads%2FDilma02.jpg","shortDesc":"No programa Café com a Presidenta de hoje, Dilma Rousseff falou sobre os seis estádios que vão sediar os jogos da Copa das Confederações e da Copa do Mundo de 2014. A presidenta Dilma viajou pelo país para inaugurar as arenas, que, segundo ela, estão entre as mais modernas do mundo.","socialId":"Facebook:396162223739517_579329232089481","title":"www.pt.org.br","url":"http:\/\/www.pt.org.br\/noticias\/view\/cafe_com_a_presidenta_dilma_rousseff_fala_sobre_os_seis_estadios_que_vaeo_s"},"time":1369662621,"type":"link"},{"caption":"www.pt.org.br","description":"Dilma na África: Brasil quer cooperação baseada em vantagens mútuas e valores compartilhados","from":{"id":"396162223739517","name":"Gabriel Guimarães","category":"Politician"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"396162223739517_579290578760013","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQD5D0uMPFQ7AwBX&w=154&h=154&url=http%3A%2F%2Fwww.pt.org.br%2Fbanners%2Fselo-ENF-347x140.png","likes":2,"link":"http:\/\/www.pt.org.br\/noticias\/view\/dilma_na_africa_brasil_quer_cooperacaeo_baseada_em_vantagens_mutuas_e_valor","message":"A presidenta Dilma Rousseff discursou neste sábado (25) em nome da América Latina durante a cerimônia de comemoração pelos 50 anos da União Africana.","name":"Dilma na África: Brasil quer cooperação baseada em vantagens mútuas e valores compartilhados","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQD5D0uMPFQ7AwBX&w=154&h=154&url=http%3A%2F%2Fwww.pt.org.br%2Fbanners%2Fselo-ENF-347x140.png","shortDesc":"A presidenta Dilma Rousseff discursou neste sábado (25) em nome da América Latina durante a cerimônia de comemoração pelos 50 anos da União Africana.","socialId":"Facebook:396162223739517_579290578760013","title":"www.pt.org.br","url":"http:\/\/www.pt.org.br\/noticias\/view\/dilma_na_africa_brasil_quer_cooperacaeo_baseada_em_vantagens_mutuas_e_valor"},"time":1369657508,"type":"link"},{"from":{"id":"396162223739517","name":"Gabriel Guimarães","category":"Politician"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yz\/r\/StEh3RhPvjk.gif","id":"396162223739517_579289245426813","image":"http:\/\/photos-c.ak.fbcdn.net\/hphotos-ak-frc1\/575401_579289215426816_1448547159_s.jpg","likes":44,"link":"http:\/\/www.facebook.com\/photo.php?fbid=579289215426816&set=a.396184027070670.92587.396162223739517&type=1&relevant_count=1","message":"Bom dia e boa semana para todos os amigos!","socialInfo":{"imageUrl":"http:\/\/photos-c.ak.fbcdn.net\/hphotos-ak-frc1\/575401_579289215426816_1448547159_s.jpg","shortDesc":"Bom dia e boa semana para todos os amigos!","socialId":"Facebook:396162223739517_579289245426813","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=579289215426816&set=a.396184027070670.92587.396162223739517&type=1&relevant_count=1"},"time":1369673016,"type":"photo"},{"from":{"id":"396162223739517","name":"Gabriel Guimarães","category":"Politician"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yz\/r\/StEh3RhPvjk.gif","id":"396162223739517_578057948883276","image":"http:\/\/photos-f.ak.fbcdn.net\/hphotos-ak-ash3\/575648_578057925549945_1450924919_s.jpg","likes":68,"link":"http:\/\/www.facebook.com\/photo.php?fbid=578057925549945&set=a.396184027070670.92587.396162223739517&type=1&relevant_count=1","socialInfo":{"imageUrl":"http:\/\/photos-f.ak.fbcdn.net\/hphotos-ak-ash3\/575648_578057925549945_1450924919_s.jpg","shortDesc":null,"socialId":"Facebook:396162223739517_578057948883276","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=578057925549945&set=a.396184027070670.92587.396162223739517&type=1&relevant_count=1"},"time":1369490118,"type":"photo"},{"caption":"portal.mec.gov.br","description":"Portal do Ministério da Educação","from":{"id":"396162223739517","name":"Gabriel Guimarães","category":"Politician"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"396162223739517_578057492216655","likes":10,"link":"http:\/\/portal.mec.gov.br\/index.php?option=com_content&view=article&id=18714%3Agoverno-investe-r-939-milhoes-em-recuperacao-de-hospitais&catid=212&Itemid=86","message":"Hospital das Clínicas da Universidade Federal de Minas Gerais é  um dos contemplados","name":"Governo investe R$ 939 milhões em recuperação de hospitais","socialInfo":{"imageUrl":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","shortDesc":"Hospital das Clínicas da Universidade Federal de Minas Gerais é  um dos contemplados","socialId":"Facebook:396162223739517_578057492216655","title":"portal.mec.gov.br","url":"http:\/\/portal.mec.gov.br\/index.php?option=com_content&view=article&id=18714%3Agoverno-investe-r-939-milhoes-em-recuperacao-de-hospitais&catid=212&Itemid=86"},"time":1369440010,"type":"link"},{"caption":"portal.mec.gov.br","description":"Portal do Ministério da Educação","from":{"id":"396162223739517","name":"Gabriel Guimarães","category":"Politician"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"396162223739517_578056868883384","likes":10,"link":"http:\/\/portal.mec.gov.br\/index.php?option=com_content&view=article&id=18715%3Anumero-de-inscricoes-de-escolas-passa-de-52-mil-nos-tres-primeiros-dias-&catid=211&Itemid=86","message":"Lançado na terça-feira, 21, o programa Mais Cultura nas Escolas já ultrapassou 5,2 mil escolas inscritas, de acordo com dados desta sexta-feira, 24, do Sistema Integrado de Monitoramento, Execução e Controle do Ministério da Educação (Simec). A adesão poderá ser feita até 30 de junho.","name":"Número de inscrições de escolas passa de 5,2 mil nos três primeiros dias","socialInfo":{"imageUrl":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","shortDesc":"Lançado na terça-feira, 21, o programa Mais Cultura nas Escolas já ultrapassou 5,2 mil escolas inscritas, de acordo com dados desta sexta-feira, 24, do Sistema Integrado de Monitoramento, Execução e Controle do Ministério da Educação (Simec). A adesão poderá ser feita até 30 de junho.","socialId":"Facebook:396162223739517_578056868883384","title":"portal.mec.gov.br","url":"http:\/\/portal.mec.gov.br\/index.php?option=com_content&view=article&id=18715%3Anumero-de-inscricoes-de-escolas-passa-de-52-mil-nos-tres-primeiros-dias-&catid=211&Itemid=86"},"time":1369439896,"type":"link"},{"caption":"www2.camara.leg.br","description":"Câmara Notícias","from":{"id":"396162223739517","name":"Gabriel Guimarães","category":"Politician"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"396162223739517_577823508906720","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBNI56pBubPcpj3&w=154&h=154&url=http%3A%2F%2Fwww2.camara.leg.br%2Fcamaranoticias%2Fimagens%2FimgNoticiaUpload1368660949758.jpg","likes":6,"link":"http:\/\/www2.camara.leg.br\/camaranoticias\/noticias\/POLITICA\/442522-CAMARA-RESPONDE-QUASE-28-MIL-PEDIDOS-DE-INFORMACAO-EM-11-MESES.html","message":"A Câmara recebeu, em 11 meses, 27.903 pedidos de informação. Desse total, 99,8% foram atendidos, ou, em números exatos: 27.846. Foram indeferidos 17 e 40 ainda estavam em processo de resposta no último dia de abril.","name":"Câmara responde a quase 28 mil pedidos de informação em 11 meses - Câmara Notícias - Portal da...","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBNI56pBubPcpj3&w=154&h=154&url=http%3A%2F%2Fwww2.camara.leg.br%2Fcamaranoticias%2Fimagens%2FimgNoticiaUpload1368660949758.jpg","shortDesc":"A Câmara recebeu, em 11 meses, 27.903 pedidos de informação. Desse total, 99,8% foram atendidos, ou, em números exatos: 27.846. Foram indeferidos 17 e 40 ainda estavam em processo de resposta no último dia de abril.","socialId":"Facebook:396162223739517_577823508906720","title":"www2.camara.leg.br","url":"http:\/\/www2.camara.leg.br\/camaranoticias\/noticias\/POLITICA\/442522-CAMARA-RESPONDE-QUASE-28-MIL-PEDIDOS-DE-INFORMACAO-EM-11-MESES.html"},"time":1369400363,"type":"link"},{"caption":"portal.mj.gov.br","from":{"id":"396162223739517","name":"Gabriel Guimarães","category":"Politician"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"396162223739517_577820032240401","likes":9,"link":"http:\/\/portal.mj.gov.br\/main.asp?ViewID=%7B5DAEE1FE-D535-4B87-B8CA-13016DCA1CBD%7D&params=itemID%3D%7B549AAD05-6EEB-4FD8-B4AC-5AFAB3293888%7D%3B&UIPartUID=%7B04411A04-62EC-410D-AC93-9F2FA9240471%7D","message":"A Comissão de Anistia do Ministério da Justiça estará hoje em Belo Horizonte para 69ª Caravana, onde serão julgados processos de perseguidos políticos durante a ditadura e homenageados sete mineiros(as) que participaram da luta pela democracia.","name":"Anistia inaugura monumento às vítimas da ditadura e promove reparação","socialInfo":{"imageUrl":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","shortDesc":"A Comissão de Anistia do Ministério da Justiça estará hoje em Belo Horizonte para 69ª Caravana, onde serão julgados processos de perseguidos políticos durante a ditadura e homenageados sete mineiros(as) que participaram da luta pela democracia.","socialId":"Facebook:396162223739517_577820032240401","title":"portal.mj.gov.br","url":"http:\/\/portal.mj.gov.br\/main.asp?ViewID=%7B5DAEE1FE-D535-4B87-B8CA-13016DCA1CBD%7D&params=itemID%3D%7B549AAD05-6EEB-4FD8-B4AC-5AFAB3293888%7D%3B&UIPartUID=%7B04411A04-62EC-410D-AC93-9F2FA9240471%7D"},"time":1369399749,"type":"link"},{"from":{"id":"396162223739517","name":"Gabriel Guimarães","category":"Politician"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yz\/r\/StEh3RhPvjk.gif","id":"396162223739517_577816522240752","image":"http:\/\/photos-b.ak.fbcdn.net\/hphotos-ak-ash3\/946885_577816512240753_842834229_s.jpg","likes":21,"link":"http:\/\/www.facebook.com\/photo.php?fbid=577816512240753&set=a.396184027070670.92587.396162223739517&type=1&relevant_count=1","socialInfo":{"imageUrl":"http:\/\/photos-b.ak.fbcdn.net\/hphotos-ak-ash3\/946885_577816512240753_842834229_s.jpg","shortDesc":null,"socialId":"Facebook:396162223739517_577816522240752","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=577816512240753&set=a.396184027070670.92587.396162223739517&type=1&relevant_count=1"},"time":1369399059,"type":"photo"},{"caption":"www.brasil.gov.br","description":"Programa Atleta na Escola irá democratizar o acesso ao esporte, identificando e incentivando jovens talentos para o esporte","from":{"id":"396162223739517","name":"Gabriel Guimarães","category":"Politician"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"396162223739517_577802952242109","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBsp52XijZxa8AZ&w=154&h=154&url=http%3A%2F%2Fwww.brasil.gov.br%2Fimagens%2Fnoticias%2Fimagens-2013%2Fmaio%2Fatleta-na-escola-1%2Fimage_12","likes":9,"link":"http:\/\/www.brasil.gov.br\/noticias\/arquivos\/2013\/05\/23\/estados-e-municipios-podem-aderir-ao-programa-atleta-na-escola-ate-1o-de-junho","message":"As secretarias estaduais e municipais de educação têm até o dia 1º de junho para aderir ao programa de incentivo ao esporte, Atleta na Escola. A adesão acontece por meio do Sistema Integrado de Monitoramento, Execução e Controle (Simec).","name":"Estados e municípios podem aderir ao programa Atleta na Escola até 1º de junho - Portal Brasil","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBsp52XijZxa8AZ&w=154&h=154&url=http%3A%2F%2Fwww.brasil.gov.br%2Fimagens%2Fnoticias%2Fimagens-2013%2Fmaio%2Fatleta-na-escola-1%2Fimage_12","shortDesc":"As secretarias estaduais e municipais de educação têm até o dia 1º de junho para aderir ao programa de incentivo ao esporte, Atleta na Escola. A adesão acontece por meio do Sistema Integrado de Monitoramento, Execução e Controle (Simec).","socialId":"Facebook:396162223739517_577802952242109","title":"www.brasil.gov.br","url":"http:\/\/www.brasil.gov.br\/noticias\/arquivos\/2013\/05\/23\/estados-e-municipios-podem-aderir-ao-programa-atleta-na-escola-ate-1o-de-junho"},"time":1369397895,"type":"link"}],"id":"396162223739517","likes":8008,"name":"Gabriel Guimarães","picture":null},"maxAge":900,"serviceUrl":"http:\/\/cms.mobile.conduit-services.com\/facebook\/data\/deputadogabrielguimaraespt\/25\/0\/?params={}"},{"data":{"author":"Deputado Gabriel Guimarães","categories":[],"description":null,"imageUrl":"http:\/\/www.youtube.com\/img\/pic_youtubelogo_123x63.gif","items":[{"author":"Deputado Gabriel Guimarães","categories":["News & Politics","News"],"credits":{"uploader":"gabrielpt1311"},"description":null,"duration":45,"id":"tag:youtube.com,2008:video:1iyTGwIIB1o","info":{"rating":{"avg":null,"total":null},"stats":{"favorite":0,"view":10}},"largeThumbnail":"http:\/\/i.ytimg.com\/vi\/1iyTGwIIB1o\/sddefault.jpg","link":"http:\/\/www.youtube.com\/watch?v=1iyTGwIIB1o&feature=youtube_gdata#noredirect","mediumThumbnail":"http:\/\/i.ytimg.com\/vi\/1iyTGwIIB1o\/3.jpg","smallThumbnail":"http:\/\/i.ytimg.com\/vi\/1iyTGwIIB1o\/default.jpg","socialInfo":{"imageUrl":"http:\/\/i.ytimg.com\/vi\/1iyTGwIIB1o\/default.jpg","shortDesc":null,"socialId":"Videos:tag:youtube.com,2008:video:1iyTGwIIB1o","title":"Prefeita Cecília Ferramenta - Ipatinga","url":"http:\/\/www.youtube.com\/watch?v=1iyTGwIIB1o&feature=youtube_gdata"},"stream":{"mediaType":2,"type":"application\/x-shockwave-flash","url":"http:\/\/www.youtube.com\/v\/1iyTGwIIB1o?version=3&f=user_uploads&app=youtube_gdata"},"textItems":[],"time":1360070155,"title":"Prefeita Cecília Ferramenta - Ipatinga"},{"author":"Deputado Gabriel Guimarães","categories":["News & Politics","News"],"credits":{"uploader":"gabrielpt1311"},"description":null,"duration":81,"id":"tag:youtube.com,2008:video:JHyvSpMZLRI","info":{"rating":{"avg":null,"total":null},"stats":{"favorite":0,"view":41}},"largeThumbnail":"http:\/\/i.ytimg.com\/vi\/JHyvSpMZLRI\/sddefault.jpg","link":"http:\/\/www.youtube.com\/watch?v=JHyvSpMZLRI&feature=youtube_gdata#noredirect","mediumThumbnail":"http:\/\/i.ytimg.com\/vi\/JHyvSpMZLRI\/3.jpg","smallThumbnail":"http:\/\/i.ytimg.com\/vi\/JHyvSpMZLRI\/default.jpg","socialInfo":{"imageUrl":"http:\/\/i.ytimg.com\/vi\/JHyvSpMZLRI\/default.jpg","shortDesc":null,"socialId":"Videos:tag:youtube.com,2008:video:JHyvSpMZLRI","title":"Prefeito Pedrinho - Dom Cavati","url":"http:\/\/www.youtube.com\/watch?v=JHyvSpMZLRI&feature=youtube_gdata"},"stream":{"mediaType":2,"type":"application\/x-shockwave-flash","url":"http:\/\/www.youtube.com\/v\/JHyvSpMZLRI?version=3&f=user_uploads&app=youtube_gdata"},"textItems":[],"time":1360067067,"title":"Prefeito Pedrinho - Dom Cavati"},{"author":"Deputado Gabriel Guimarães","categories":["News & Politics","News"],"credits":{"uploader":"gabrielpt1311"},"description":"O prefeito Toninho, de Piranguinho, fala sobre a importância do encontro realizado em Brasília e do apoio do deputado federal Gabriel Guimarães ao seu município e aos demais municípios mineiros.","duration":150,"id":"tag:youtube.com,2008:video:FZndfk9zeek","info":{"rating":{"avg":null,"total":null},"stats":{"favorite":0,"view":31}},"largeThumbnail":"http:\/\/i.ytimg.com\/vi\/FZndfk9zeek\/sddefault.jpg","link":"http:\/\/www.youtube.com\/watch?v=FZndfk9zeek&feature=youtube_gdata#noredirect","mediumThumbnail":"http:\/\/i.ytimg.com\/vi\/FZndfk9zeek\/3.jpg","smallThumbnail":"http:\/\/i.ytimg.com\/vi\/FZndfk9zeek\/default.jpg","socialInfo":{"imageUrl":"http:\/\/i.ytimg.com\/vi\/FZndfk9zeek\/default.jpg","shortDesc":"O prefeito Toninho, de Piranguinho, fala sobre a importância do encontro realizado em Brasília e do apoio do deputado federal Gabriel Guimarães ao seu município e aos demais municípios mineiros.","socialId":"Videos:tag:youtube.com,2008:video:FZndfk9zeek","title":"Encontro Nacional de Prefeitos e Prefeitas - Prefeito Toninho","url":"http:\/\/www.youtube.com\/watch?v=FZndfk9zeek&feature=youtube_gdata"},"stream":{"mediaType":2,"type":"application\/x-shockwave-flash","url":"http:\/\/www.youtube.com\/v\/FZndfk9zeek?version=3&f=user_uploads&app=youtube_gdata"},"textItems":[],"time":1359645266,"title":"Encontro Nacional de Prefeitos e Prefeitas - Prefeito Toninho"},{"author":"Deputado Gabriel Guimarães","categories":["News & Politics","News"],"credits":{"uploader":"gabrielpt1311"},"description":"O prefeito Marquinho, de Carbonita, fala sobre a importância do encontro realizado em Brasília e do apoio do deputado federal Gabriel Guimarães ao seu município.","duration":49,"id":"tag:youtube.com,2008:video:Z14LapD79l8","info":{"rating":{"avg":null,"total":null},"stats":{"favorite":0,"view":174}},"largeThumbnail":"http:\/\/i.ytimg.com\/vi\/Z14LapD79l8\/sddefault.jpg","link":"http:\/\/www.youtube.com\/watch?v=Z14LapD79l8&feature=youtube_gdata#noredirect","mediumThumbnail":"http:\/\/i.ytimg.com\/vi\/Z14LapD79l8\/3.jpg","smallThumbnail":"http:\/\/i.ytimg.com\/vi\/Z14LapD79l8\/default.jpg","socialInfo":{"imageUrl":"http:\/\/i.ytimg.com\/vi\/Z14LapD79l8\/default.jpg","shortDesc":"O prefeito Marquinho, de Carbonita, fala sobre a importância do encontro realizado em Brasília e do apoio do deputado federal Gabriel Guimarães ao seu município.","socialId":"Videos:tag:youtube.com,2008:video:Z14LapD79l8","title":"Encontro Nacional de Prefeitos e Prefeitas - Prefeito Marquinho","url":"http:\/\/www.youtube.com\/watch?v=Z14LapD79l8&feature=youtube_gdata"},"stream":{"mediaType":2,"type":"application\/x-shockwave-flash","url":"http:\/\/www.youtube.com\/v\/Z14LapD79l8?version=3&f=user_uploads&app=youtube_gdata"},"textItems":[],"time":1359641403,"title":"Encontro Nacional de Prefeitos e Prefeitas - Prefeito Marquinho"},{"author":"Deputado Gabriel Guimarães","categories":["News & Politics","News"],"credits":{"uploader":"gabrielpt1311"},"description":"O prefeito João Mauro, de Brazópolis, fala sobre a importância do encontro realizado em Brasília e do apoio do deputado federal Gabriel Guimarães ao seu município.","duration":38,"id":"tag:youtube.com,2008:video:OaL7QjUjd2k","info":{"rating":{"avg":null,"total":null},"stats":{"favorite":0,"view":6}},"largeThumbnail":"http:\/\/i.ytimg.com\/vi\/OaL7QjUjd2k\/sddefault.jpg","link":"http:\/\/www.youtube.com\/watch?v=OaL7QjUjd2k&feature=youtube_gdata#noredirect","mediumThumbnail":"http:\/\/i.ytimg.com\/vi\/OaL7QjUjd2k\/3.jpg","smallThumbnail":"http:\/\/i.ytimg.com\/vi\/OaL7QjUjd2k\/default.jpg","socialInfo":{"imageUrl":"http:\/\/i.ytimg.com\/vi\/OaL7QjUjd2k\/default.jpg","shortDesc":"O prefeito João Mauro, de Brazópolis, fala sobre a importância do encontro realizado em Brasília e do apoio do deputado federal Gabriel Guimarães ao seu município.","socialId":"Videos:tag:youtube.com,2008:video:OaL7QjUjd2k","title":"Encontro Nacional de Prefeitos e Prefeitas - Prefeito João Mauro","url":"http:\/\/www.youtube.com\/watch?v=OaL7QjUjd2k&feature=youtube_gdata"},"stream":{"mediaType":2,"type":"application\/x-shockwave-flash","url":"http:\/\/www.youtube.com\/v\/OaL7QjUjd2k?version=3&f=user_uploads&app=youtube_gdata"},"textItems":[],"time":1359640281,"title":"Encontro Nacional de Prefeitos e Prefeitas - Prefeito João Mauro"},{"author":"Deputado Gabriel Guimarães","categories":["News & Politics","News"],"credits":{"uploader":"gabrielpt1311"},"description":"O prefeito Keisson, de Timóteo, fala sobre a importância do encontro realizado em Brasília e do apoio do deputado federal Gabriel Guimarães ao seu município e aos demais municípios mineiros.","duration":133,"id":"tag:youtube.com,2008:video:nZjVoPx4xqE","info":{"rating":{"avg":null,"total":null},"stats":{"favorite":0,"view":28}},"largeThumbnail":"http:\/\/i.ytimg.com\/vi\/nZjVoPx4xqE\/sddefault.jpg","link":"http:\/\/www.youtube.com\/watch?v=nZjVoPx4xqE&feature=youtube_gdata#noredirect","mediumThumbnail":"http:\/\/i.ytimg.com\/vi\/nZjVoPx4xqE\/3.jpg","smallThumbnail":"http:\/\/i.ytimg.com\/vi\/nZjVoPx4xqE\/default.jpg","socialInfo":{"imageUrl":"http:\/\/i.ytimg.com\/vi\/nZjVoPx4xqE\/default.jpg","shortDesc":"O prefeito Keisson, de Timóteo, fala sobre a importância do encontro realizado em Brasília e do apoio do deputado federal Gabriel Guimarães ao seu município e aos demais municípios mineiros.","socialId":"Videos:tag:youtube.com,2008:video:nZjVoPx4xqE","title":"Encontro Nacional de Prefeitos e Prefeitas - Prefeito Keisson","url":"http:\/\/www.youtube.com\/watch?v=nZjVoPx4xqE&feature=youtube_gdata"},"stream":{"mediaType":2,"type":"application\/x-shockwave-flash","url":"http:\/\/www.youtube.com\/v\/nZjVoPx4xqE?version=3&f=user_uploads&app=youtube_gdata"},"textItems":[],"time":1359638882,"title":"Encontro Nacional de Prefeitos e Prefeitas - Prefeito Keisson"},{"author":"Deputado Gabriel Guimarães","categories":["Comedy"],"credits":{"uploader":"gabrielpt1311"},"description":"Deputado estadual Paulo Guedes fala aos prefeitos e prefeitas em visita ao deputado federal Gabriel Guimarães em Brasília.","duration":88,"id":"tag:youtube.com,2008:video:wdafsygzfQQ","info":{"rating":{"avg":null,"total":null},"stats":{"favorite":0,"view":45}},"largeThumbnail":"http:\/\/i.ytimg.com\/vi\/wdafsygzfQQ\/sddefault.jpg","link":"http:\/\/www.youtube.com\/watch?v=wdafsygzfQQ&feature=youtube_gdata#noredirect","mediumThumbnail":"http:\/\/i.ytimg.com\/vi\/wdafsygzfQQ\/3.jpg","smallThumbnail":"http:\/\/i.ytimg.com\/vi\/wdafsygzfQQ\/default.jpg","socialInfo":{"imageUrl":"http:\/\/i.ytimg.com\/vi\/wdafsygzfQQ\/default.jpg","shortDesc":"Deputado estadual Paulo Guedes fala aos prefeitos e prefeitas em visita ao deputado federal Gabriel Guimarães em Brasília.","socialId":"Videos:tag:youtube.com,2008:video:wdafsygzfQQ","title":"Deputado estadual Paulo Guedes fala aos prefeitos e prefeitas","url":"http:\/\/www.youtube.com\/watch?v=wdafsygzfQQ&feature=youtube_gdata"},"stream":{"mediaType":2,"type":"application\/x-shockwave-flash","url":"http:\/\/www.youtube.com\/v\/wdafsygzfQQ?version=3&f=user_uploads&app=youtube_gdata"},"textItems":[],"time":1359473519,"title":"Deputado estadual Paulo Guedes fala aos prefeitos e prefeitas"},{"author":"Deputado Gabriel Guimarães","categories":["Comedy"],"credits":{"uploader":"gabrielpt1311"},"description":null,"duration":88,"id":"tag:youtube.com,2008:video:EhaT2x2Ger4","info":{"rating":{"avg":null,"total":null},"stats":{"favorite":0,"view":5}},"largeThumbnail":"http:\/\/i.ytimg.com\/vi\/EhaT2x2Ger4\/hqdefault.jpg","link":"http:\/\/www.youtube.com\/watch?v=EhaT2x2Ger4&feature=youtube_gdata#noredirect","mediumThumbnail":"http:\/\/i.ytimg.com\/vi\/EhaT2x2Ger4\/3.jpg","smallThumbnail":"http:\/\/i.ytimg.com\/vi\/EhaT2x2Ger4\/default.jpg","socialInfo":{"imageUrl":"http:\/\/i.ytimg.com\/vi\/EhaT2x2Ger4\/default.jpg","shortDesc":null,"socialId":"Videos:tag:youtube.com,2008:video:EhaT2x2Ger4","title":"Deputado Paulo Guedes fala sobre encontro com prefeitos em","url":"http:\/\/www.youtube.com\/watch?v=EhaT2x2Ger4&feature=youtube_gdata"},"stream":{"mediaType":2,"type":"application\/x-shockwave-flash","url":"http:\/\/www.youtube.com\/v\/EhaT2x2Ger4?version=3&f=user_uploads&app=youtube_gdata"},"textItems":[],"time":1359470940,"title":"Deputado Paulo Guedes fala sobre encontro com prefeitos em"},{"author":"Deputado Gabriel Guimarães","categories":["News & Politics","News"],"credits":{"uploader":"gabrielpt1311"},"description":"O deputado federal Gabriel Guimarães homenageia Contagem na comemoração dos seus 100 anos. Gabriel destaca a administração da prefeita Marília Campos nos últimos 7 anos com o apoio do deputado estadual Durval Ângelo e o compromisso do seu mandato com Contagem.","duration":67,"id":"tag:youtube.com,2008:video:N_iVBBFTOmI","info":{"rating":{"avg":null,"total":null},"stats":{"favorite":0,"view":43}},"largeThumbnail":"http:\/\/i.ytimg.com\/vi\/N_iVBBFTOmI\/sddefault.jpg","link":"http:\/\/www.youtube.com\/watch?v=N_iVBBFTOmI&feature=youtube_gdata#noredirect","mediumThumbnail":"http:\/\/i.ytimg.com\/vi\/N_iVBBFTOmI\/3.jpg","smallThumbnail":"http:\/\/i.ytimg.com\/vi\/N_iVBBFTOmI\/default.jpg","socialInfo":{"imageUrl":"http:\/\/i.ytimg.com\/vi\/N_iVBBFTOmI\/default.jpg","shortDesc":"O deputado federal Gabriel Guimarães homenageia Contagem na comemoração dos seus 100 anos. Gabriel destaca a administração da prefeita Marília Campos nos últimos 7 anos com o apoio do deputado estadual Durval Ângelo e o compromisso do seu mandato com Contagem.","socialId":"Videos:tag:youtube.com,2008:video:N_iVBBFTOmI","title":"Contagem 100 anos!! Muitos motivos para comemorar!!","url":"http:\/\/www.youtube.com\/watch?v=N_iVBBFTOmI&feature=youtube_gdata"},"stream":{"mediaType":2,"type":"application\/x-shockwave-flash","url":"http:\/\/www.youtube.com\/v\/N_iVBBFTOmI?version=3&f=user_uploads&app=youtube_gdata"},"textItems":[],"time":1314707586,"title":"Contagem 100 anos!! Muitos motivos para comemorar!!"},{"author":"Deputado Gabriel Guimarães","categories":["News & Politics","News"],"credits":{"uploader":"gabrielpt1311"},"description":"O deputado federal Gabriel Guimarães participou ao lado da prefeita de Contagem, Marília Campos, da prefeita de Betim, Maria do Carmo Lara, e de integrantes do Movimento Popular Pró-Metrô, de um grande movimento em Brasília reivindicando a inclusão, no PAC da Mobilidade, da modernização e expansão do metrô de BH a Betim e Contagem.  \u000a\u000aGabriel também reforçou o pedido dos cerca de 300 manifestantes que reivindicam a construção do metrô na região metropolitana de BH, uma luta que se arrasta há 30 anos. No momento da manifestação, o deputado Gabriel  Guimarães acionou o secretário de Mobilidade Urbana do Ministério das Cidades, Luis Carlos, que garantiu que o governo vai priorizar esse projeto no PAC da Mobilidade. \u000a\u000aA mobilização política visa incluir as propostas na pauta da ação interministerial entre os ministérios da Cidade e dos Transportes que trata de obras do PAC 2.\u000a\u000a\u000aAo todo estão previstos R$ 2,4 bilhões em recursos do Governo Federal para as obras do metrô na capital, Contagem e Betim, beneficiando diariamente 800 mil pessoas.\u000a\u000aTambém estavam presentes os deputados Eros Biondini, Ademir Camilo, Fred Costa e Elismar Prado.","duration":103,"id":"tag:youtube.com,2008:video:kdW82NuqYC0","info":{"rating":{"avg":null,"total":null},"stats":{"favorite":0,"view":95}},"largeThumbnail":"http:\/\/i.ytimg.com\/vi\/kdW82NuqYC0\/sddefault.jpg","link":"http:\/\/www.youtube.com\/watch?v=kdW82NuqYC0&feature=youtube_gdata#noredirect","mediumThumbnail":"http:\/\/i.ytimg.com\/vi\/kdW82NuqYC0\/3.jpg","smallThumbnail":"http:\/\/i.ytimg.com\/vi\/kdW82NuqYC0\/default.jpg","socialInfo":{"imageUrl":"http:\/\/i.ytimg.com\/vi\/kdW82NuqYC0\/default.jpg","shortDesc":"O deputado federal Gabriel Guimarães participou ao lado da prefeita de Contagem, Marília Campos, da prefeita de Betim, Maria do Carmo Lara, e de integrantes do Movimento Popular Pró-Metrô, de um grande movimento em Brasília reivindicando a inclusão, no PAC da Mobilidade, da modernização e expansão do metrô de BH a Betim e Contagem.  \u000a\u000aGabriel também reforçou o pedido dos cerca de 300 manifestantes que reivindicam a construção do metrô na região metropolitana de BH, uma luta que se arrasta há 30 anos. No momento da manifestação, o deputado Gabriel  Guimarães acionou o secretário de Mobilidade Urbana do Ministério das Cidades, Luis Carlos, que garantiu que o governo vai priorizar esse projeto no PAC da Mobilidade. \u000a\u000aA mobilização política visa incluir as propostas na pauta da ação interministerial entre os ministérios da Cidade e dos Transportes que trata de obras do PAC 2.\u000a\u000a\u000aAo todo estão previstos R$ 2,4 bilhões em recursos do Governo Federal para as obras do metrô na capital, Contagem e Betim, beneficiando diariamente 800 mil pessoas.\u000a\u000aTambém estavam presentes os deputados Eros Biondini, Ademir Camilo, Fred Costa e Elismar Prado.","socialId":"Videos:tag:youtube.com,2008:video:kdW82NuqYC0","title":"Movimento Eu quero Metrô ganha força em Brasília","url":"http:\/\/www.youtube.com\/watch?v=kdW82NuqYC0&feature=youtube_gdata"},"stream":{"mediaType":2,"type":"application\/x-shockwave-flash","url":"http:\/\/www.youtube.com\/v\/kdW82NuqYC0?version=3&f=user_uploads&app=youtube_gdata"},"textItems":[],"time":1314301582,"title":"Movimento Eu quero Metrô ganha força em Brasília"},{"author":"Deputado Gabriel Guimarães","categories":["News & Politics","News"],"credits":{"uploader":"gabrielpt1311"},"description":"Ao abrir o Grande Expediente, na Câmara dos Deputados, no dia 05 de abril, o deputado federal Gabriel Guimarães discorreu sobre um dos mais importantes temas discutidos no país: a Mineração. Gabriel apresentou um discurso consistente sobre a história da mineração, sua importância no surgimento de Minas Gerais e no desenvolvimento do Brasil, as variáveis energéticas e a necessidade de se criar uma nova legislação para o setor mineral. Gabriel falou sobre a mineração nos dias atuais, a criação de um novo marco regulatório e a importância da mudança no sistema mineral para os municípios e estados produtores.","duration":495,"id":"tag:youtube.com,2008:video:Bd64QfawPk8","info":{"rating":{"avg":null,"total":null},"stats":{"favorite":0,"view":67}},"largeThumbnail":"http:\/\/i.ytimg.com\/vi\/Bd64QfawPk8\/sddefault.jpg","link":"http:\/\/www.youtube.com\/watch?v=Bd64QfawPk8&feature=youtube_gdata#noredirect","mediumThumbnail":"http:\/\/i.ytimg.com\/vi\/Bd64QfawPk8\/3.jpg","smallThumbnail":"http:\/\/i.ytimg.com\/vi\/Bd64QfawPk8\/default.jpg","socialInfo":{"imageUrl":"http:\/\/i.ytimg.com\/vi\/Bd64QfawPk8\/default.jpg","shortDesc":"Ao abrir o Grande Expediente, na Câmara dos Deputados, no dia 05 de abril, o deputado federal Gabriel Guimarães discorreu sobre um dos mais importantes temas discutidos no país: a Mineração. Gabriel apresentou um discurso consistente sobre a história da mineração, sua importância no surgimento de Minas Gerais e no desenvolvimento do Brasil, as variáveis energéticas e a necessidade de se criar uma nova legislação para o setor mineral. Gabriel falou sobre a mineração nos dias atuais, a criação de um novo marco regulatório e a importância da mudança no sistema mineral para os municípios e estados produtores.","socialId":"Videos:tag:youtube.com,2008:video:Bd64QfawPk8","title":"A questão mineral: discurso do deputado federal Gabriel Guimarães -- Parte 3","url":"http:\/\/www.youtube.com\/watch?v=Bd64QfawPk8&feature=youtube_gdata"},"stream":{"mediaType":2,"type":"application\/x-shockwave-flash","url":"http:\/\/www.youtube.com\/v\/Bd64QfawPk8?version=3&f=user_uploads&app=youtube_gdata"},"textItems":[],"time":1306014768,"title":"A questão mineral: discurso do deputado federal Gabriel Guimarães -- Parte 3"},{"author":"Deputado Gabriel Guimarães","categories":["News & Politics","News"],"credits":{"uploader":"gabrielpt1311"},"description":"Ao abrir o Grande Expediente, na Câmara dos Deputados, no dia 05 de abril, o deputado federal Gabriel Guimarães discorreu sobre um dos mais importantes temas discutidos no país: a Mineração. Gabriel apresentou um discurso consistente sobre a história da mineração, sua importância no surgimento de Minas Gerais e no desenvolvimento do Brasil, as variáveis energéticas e a necessidade de se criar uma nova legislação para o setor mineral. Gabriel falou sobre a mineração nos dias atuais, a criação de um novo marco regulatório e a importância da mudança no sistema mineral para os municípios e estados produtores.","duration":557,"id":"tag:youtube.com,2008:video:Z7oet9gwN7k","info":{"rating":{"avg":null,"total":null},"stats":{"favorite":0,"view":65}},"largeThumbnail":"http:\/\/i.ytimg.com\/vi\/Z7oet9gwN7k\/sddefault.jpg","link":"http:\/\/www.youtube.com\/watch?v=Z7oet9gwN7k&feature=youtube_gdata#noredirect","mediumThumbnail":"http:\/\/i.ytimg.com\/vi\/Z7oet9gwN7k\/3.jpg","smallThumbnail":"http:\/\/i.ytimg.com\/vi\/Z7oet9gwN7k\/default.jpg","socialInfo":{"imageUrl":"http:\/\/i.ytimg.com\/vi\/Z7oet9gwN7k\/default.jpg","shortDesc":"Ao abrir o Grande Expediente, na Câmara dos Deputados, no dia 05 de abril, o deputado federal Gabriel Guimarães discorreu sobre um dos mais importantes temas discutidos no país: a Mineração. Gabriel apresentou um discurso consistente sobre a história da mineração, sua importância no surgimento de Minas Gerais e no desenvolvimento do Brasil, as variáveis energéticas e a necessidade de se criar uma nova legislação para o setor mineral. Gabriel falou sobre a mineração nos dias atuais, a criação de um novo marco regulatório e a importância da mudança no sistema mineral para os municípios e estados produtores.","socialId":"Videos:tag:youtube.com,2008:video:Z7oet9gwN7k","title":"A questão mineral: discurso do deputado federal Gabriel Guimarães - Parte 2","url":"http:\/\/www.youtube.com\/watch?v=Z7oet9gwN7k&feature=youtube_gdata"},"stream":{"mediaType":2,"type":"application\/x-shockwave-flash","url":"http:\/\/www.youtube.com\/v\/Z7oet9gwN7k?version=3&f=user_uploads&app=youtube_gdata"},"textItems":[],"time":1306009018,"title":"A questão mineral: discurso do deputado federal Gabriel Guimarães - Parte 2"},{"author":"Deputado Gabriel Guimarães","categories":["News & Politics","News"],"credits":{"uploader":"gabrielpt1311"},"description":"Ao abrir o Grande Expediente, na Câmara dos Deputados, no dia 05 de abril, o deputado federal Gabriel Guimarães discorreu sobre um dos mais importantes temas discutidos no país: a Mineração. Gabriel apresentou um discurso consistente sobre a história da mineração, sua importância no surgimento de Minas Gerais e no desenvolvimento do Brasil, as variáveis energéticas e a necessidade de se criar uma nova legislação para o setor mineral. Gabriel falou sobre a mineração nos dias atuais, a criação de um novo marco regulatório e a importância da mudança no sistema mineral para os municípios e estados produtores.","duration":555,"id":"tag:youtube.com,2008:video:8DwIa457x-Q","info":{"likes":{"dislikes":0,"likes":1},"rating":{"avg":5,"total":1},"stats":{"favorite":0,"view":252}},"largeThumbnail":"http:\/\/i.ytimg.com\/vi\/8DwIa457x-Q\/sddefault.jpg","link":"http:\/\/www.youtube.com\/watch?v=8DwIa457x-Q&feature=youtube_gdata#noredirect","mediumThumbnail":"http:\/\/i.ytimg.com\/vi\/8DwIa457x-Q\/3.jpg","smallThumbnail":"http:\/\/i.ytimg.com\/vi\/8DwIa457x-Q\/default.jpg","socialInfo":{"imageUrl":"http:\/\/i.ytimg.com\/vi\/8DwIa457x-Q\/default.jpg","shortDesc":"Ao abrir o Grande Expediente, na Câmara dos Deputados, no dia 05 de abril, o deputado federal Gabriel Guimarães discorreu sobre um dos mais importantes temas discutidos no país: a Mineração. Gabriel apresentou um discurso consistente sobre a história da mineração, sua importância no surgimento de Minas Gerais e no desenvolvimento do Brasil, as variáveis energéticas e a necessidade de se criar uma nova legislação para o setor mineral. Gabriel falou sobre a mineração nos dias atuais, a criação de um novo marco regulatório e a importância da mudança no sistema mineral para os municípios e estados produtores.","socialId":"Videos:tag:youtube.com,2008:video:8DwIa457x-Q","title":"A questão mineral: discurso do deputado federal Gabriel Guimarães - Parte 1","url":"http:\/\/www.youtube.com\/watch?v=8DwIa457x-Q&feature=youtube_gdata"},"stream":{"mediaType":2,"type":"application\/x-shockwave-flash","url":"http:\/\/www.youtube.com\/v\/8DwIa457x-Q?version=3&f=user_uploads&app=youtube_gdata"},"textItems":[],"time":1305975090,"title":"A questão mineral: discurso do deputado federal Gabriel Guimarães - Parte 1"},{"author":"Deputado Gabriel Guimarães","categories":["News & Politics","News"],"credits":{"uploader":"gabrielpt1311"},"description":null,"duration":46,"id":"tag:youtube.com,2008:video:-Ev5UUbp1QQ","info":{"rating":{"avg":null,"total":null},"stats":{"favorite":0,"view":137}},"largeThumbnail":"http:\/\/i.ytimg.com\/vi\/-Ev5UUbp1QQ\/hqdefault.jpg","link":"http:\/\/www.youtube.com\/watch?v=-Ev5UUbp1QQ&feature=youtube_gdata#noredirect","mediumThumbnail":"http:\/\/i.ytimg.com\/vi\/-Ev5UUbp1QQ\/3.jpg","smallThumbnail":"http:\/\/i.ytimg.com\/vi\/-Ev5UUbp1QQ\/default.jpg","socialInfo":{"imageUrl":"http:\/\/i.ytimg.com\/vi\/-Ev5UUbp1QQ\/default.jpg","shortDesc":null,"socialId":"Videos:tag:youtube.com,2008:video:-Ev5UUbp1QQ","title":"Juntos com Gabriel Guimarães 1311","url":"http:\/\/www.youtube.com\/watch?v=-Ev5UUbp1QQ&feature=youtube_gdata"},"stream":{"mediaType":2,"type":"application\/x-shockwave-flash","url":"http:\/\/www.youtube.com\/v\/-Ev5UUbp1QQ?version=3&f=user_uploads&app=youtube_gdata"},"textItems":[],"time":1285699316,"title":"Juntos com Gabriel Guimarães 1311"},{"author":"Deputado Gabriel Guimarães","categories":["News & Politics","News"],"credits":{"uploader":"gabrielpt1311"},"description":"Filho do e-prefeito de Belo Horizonte, Rodrigo de Castro apóia Gabriel Guimarães 1311","duration":18,"id":"tag:youtube.com,2008:video:o4r9obHIijo","info":{"rating":{"avg":null,"total":null},"stats":{"favorite":0,"view":308}},"largeThumbnail":"http:\/\/i.ytimg.com\/vi\/o4r9obHIijo\/hqdefault.jpg","link":"http:\/\/www.youtube.com\/watch?v=o4r9obHIijo&feature=youtube_gdata#noredirect","mediumThumbnail":"http:\/\/i.ytimg.com\/vi\/o4r9obHIijo\/3.jpg","smallThumbnail":"http:\/\/i.ytimg.com\/vi\/o4r9obHIijo\/default.jpg","socialInfo":{"imageUrl":"http:\/\/i.ytimg.com\/vi\/o4r9obHIijo\/default.jpg","shortDesc":"Filho do e-prefeito de Belo Horizonte, Rodrigo de Castro apóia Gabriel Guimarães 1311","socialId":"Videos:tag:youtube.com,2008:video:o4r9obHIijo","title":"Rodrigo de Castro, filho do ex-prefeito de BH, Célio de Castro, apóia Gabriel Guimarães 1311","url":"http:\/\/www.youtube.com\/watch?v=o4r9obHIijo&feature=youtube_gdata"},"stream":{"mediaType":2,"type":"application\/x-shockwave-flash","url":"http:\/\/www.youtube.com\/v\/o4r9obHIijo?version=3&f=user_uploads&app=youtube_gdata"},"textItems":[],"time":1285599629,"title":"Rodrigo de Castro, filho do ex-prefeito de BH, Célio de Castro, apóia Gabriel Guimarães 1311"}],"paging":{"next":"http:\/\/cms.mobile.conduit-services.com\/media\/video\/2\/15\/15\/?url=http%3a%2f%2fgdata.youtube.com%2ffeeds%2fapi%2fusers%2fGabrielPT1311%2fuploads%2f%3fv%3d2&params=%7b%22expiration%22%3anull%2c%22isOpenSearch%22%3atrue%2c%22sort%22%3anull%7d","nextUrl":"http:\/\/cms.mobile.conduit-services.com\/media\/video\/2\/15\/15\/?url=http%3a%2f%2fgdata.youtube.com%2ffeeds%2fapi%2fusers%2fGabrielPT1311%2fuploads%2f%3fv%3d2&params=%7b%22expiration%22%3anull%2c%22isOpenSearch%22%3atrue%2c%22sort%22%3anull%7d"},"title":"Uploads by Deputado Gabriel Guimarães","total":44},"maxAge":1800,"serviceUrl":"http:\/\/cms.mobile.conduit-services.com\/media\/video\/2\/15\/0\/?url=http%3A%2F%2Fgdata.youtube.com%2Ffeeds%2Fapi%2Fusers%2FGabrielPT1311%2Fuploads%2F%3Fv%3D2%26format%3D5%26orderby%3Dpublished&params=%7B%22isOpenSearch%22%3A%22true%22%7D"},{"data":{"isRtl":false,"items":{"HtmlTextFormSendButton":"Enviar","ToastMessageFormFieldMandatory":"O campo {fieldName} não pode ficar em branco","HtmlTextEventsRsvpButton":"Juntar-se","HtmlTextEventsRsvpAttending":"Atendimento","HtmlTextEventsRsvpMaybe":"Talvez","HtmlTextEventsRsvpDecline":"Recusar","HtmlTextEventsAdd2CalStr":"Calendário","HtmlTextAboutUsItemTitleGenre":"Gênero","HtmlTextAboutUsItemTitleFounded":"Fundação","HtmlTextAboutUsItemTitleMembers":"Membros","HtmlTextAboutUsItemTitleHometown":"Cidade natal","HtmlTextAboutUsItemTitleSpecialties":"Especialidades","HtmlTextAboutUsItemTitleCulinaryTeam":"Equipe de cozinha","HtmlTextAboutUsItemTitleGeneralInfo":"Informações gerais","ButtonCancel":"Cancelar","ButtonClose":"Fechar","ButtonOk":"OK","ButtonRetry":"Tentar novamente","DialogButtonLiveAlbumChoosePhotoCancel":"Cancelar","DialogButtonLiveAlbumChoosePhotoChoose":"Selecionar foto","DialogButtonLiveAlbumChoosePhotoTake":"Tirar foto","DialogButtonLiveAlbumPostPhotoCancel":"cancelar","DialogButtonLiveAlbumPostPhotoOk":"publicar","DialogCaptionAddedToFavorites":"Adicionar aos favoritos","DialogCaptionEmail":"E-mail","DialogCaptionError":"Erro","DialogCaptionFacebook":"Facebook","DialogCaptionFacebookLogin":"Login no Facebook","DialogCaptionFacebookLogout":"Logout do Facebook","DialogCaptionFacebookRequiresPermissions":"Facebook","DialogCaptionFailGetFeeds":"Erro na rede","DialogCaptionLiveAlbumPostPhoto":"Publicar foto","DialogCaptionLivePersonChatEnded":"Bate-papo encerrado","DialogCaptionLivePersonNoAvailability":"Indisponível","DialogCaptionLivePersonTimeOut":"Tempo esgotado","DialogCaptionNavigate":"Navegar","DialogCaptionPhotosManagerDeviceNotSupported":"O seu dispositivo não suporta a visualização da galeria de fotos","DialogCaptionPhotosManagerSimulatorNotSupported":"A visualização da galeria de fotos não é suportada no modo simulador","DialogCaptionPurchaseChooseMethod":"Compra:","DialogCaptionShare":"Compartilhar","DialogCaptionShareControlDialog":"Compartilhar em","DialogCaptionSubscribeFail":"Erro","DialogCaptionSubscribeSuccess":"Sucesso","DialogCaptionTwitter":"Twitter","DialogCaptionTwitterLogin":"Login no Twitter","DialogCaptionTwitterLogout":"Sair do Twitter","DialogMessageAlbumAddedToFavorites":"Faixas do álbum adicionadas aos favoritos","DialogMessageAppCodeInvalid":"O código do aplicativo é inválido","DialogMessageAudioNoFeeds":"Seu dispositivo não suporta a reprodução deste tipo de arquivo de áudio","DialogMessageAudioNotSupportedDevice":"Seu dispositivo não suporta áudio HTML5","DialogMessageAudioNotSupportedSimulator":"Seu navegador (do simulador) não suporta áudio","DialogMessageAudioNoUrl":"Nenhuma fonte de áudio.","DialogMessageAudioTypeNotSupportedDevice":"Seu dispositivo não suporta a reprodução deste tipo de arquivo de áudio","DialogMessageAudioTypeNotSupportedSimulator":"Seu navegador (do simulador) não suporta a reprodução deste tipo de arquivo de áudio","DialogMessageEmailAddressInvalid":"O endereço de e-mail é inválido.","DialogMessageFacebookLogoutFail":"Impossível fazer o logout do Facebook no momento. Tente novamente mais tarde.","DialogMessageFacebookRequiresPermissions":"Esta ação requer permissões","DialogMessageFailConnectTwitter":"Falha na conexão ao Twitter","DialogMessageFailGetAppDisabled":"Desculpe, este aplicativo foi desativado temporariamente devido a uma violação de conteúdo.\\n\\nVerifique novamente em alguns dias","DialogMessageFailGetAppExperience":"Falha ao carregar dados do aplicativo. É preciso conectar-se a uma Wi-Fi ou rede de dados de telefonia móvel para acessar estes dados.","DialogMessageFailGetAppId":"Verifique o código do seu aplicativo e tente novamente.","DialogMessageFailGetAppNormal":"Falha ao carregar dados do aplicativo. É preciso conectar-se a uma Wi-Fi ou rede de dados de telefonia móvel para acessar estes dados.","DialogMessageFailGetFeeds":"Falha ao carregar dados do aplicativo. É preciso conectar-se a uma Wi-Fi ou rede de dados de telefonia móvel para acessar estes dados.","DialogMessageFailGetServiceMap":"Falha ao inicializar a comunicação de rede","DialogMessageFailGetServiceMapWinPhone":"Falha ao inicializar a comunicação de rede. Pressione OK para tentar de novo ou Cancelar para sair","DialogMessageFailLoadPage":"Falha ao carregar a página.","DialogMessageFailLoginTwitter":"Falha ao fazer o login no Twitter","DialogMessageLeaveWarning":"Você está prestes a sair deste aplicativo. Pressione OK para continuar.","DialogMessageLinkNotSupportedInSimulator":"Este link não é suportado no modo simulador","DialogMessageLiveAlbumCameraNotSupported":"Câmera não suportada","DialogMessageLiveAlbumCameraNotSupportedSimulator":"Câmera não suportada no modo simulador","DialogMessageLiveAlbumPostPhotoFailed":"Falha ao publicar foto","DialogMessageLiveAlbumTakePhotoFailed":"Falha ao tirar foto ({message})","DialogMessageLivePersonErrorClosing":"Erro ao fechar o bate-papo","DialogMessageLivePersonNoAnswer":"Não houve resposta. Tente novamente mais tarde.","DialogMessageLivePersonNoAvailability":"A conta está off-line","DialogMessageMediaNotSupported":"Áudio não suportado por este navegador","DialogMessagePurchaseFail":"Falha ao realizar compra.Tente novamente em alguns instantes.Se os problemas persistirem, entre em contato conosco.","DialogMessageShareFailConectFacebook":"Falha ao conectar ao serviço do Facebook, tente novamente em breve.","DialogMessageShareFailConectTwitter":"Falha ao conectar ao serviço do Twitter, tente novamente em breve.","DialogMessageShareFailPostFacebook":"Falha ao publicar. O Facebook não está respondendo.","DialogMessageShareFailTweet":"Falha ao twittar","DialogMessageShareNotSupportedInSimulator":"O compartilhamento não é suportado no modo Simulador.","DialogMessageSubscribeFailed":"Assinatura indisponível no momento. Tente de novo mais tarde","DialogMessageSubscribeSubscribeSuccess":"Obrigado por se registrar","HtmlTextAddAlbumToFavorites":"Adicionar faixas a sua lista de favoritos agora","HtmlTextAddTrackToFavorites":"Adicionar faixa a sua lista de favoritos agora","HtmlTextAudioAlbum":"Álbum:","HtmlTextAudioComposer":"Compositor:","HtmlTextAudioDetails":"Detalhes","HtmlTextAudioLoading":"Carregando…","HtmlTextAudioLyricist":"Letrista:","HtmlTextAudioLyrics":"Letra","HtmlTextAudioSeek":"Procurar:","HtmlTextAudioSeeking":"Procurando…","HtmlTextAudioTrackNumber":"Faixa {number}","HtmlTextAudioVocals":"Artista(s)","HtmlTextAudioWriters":"Compositor(es)","HtmlTextBlogbyAuthor":"por {author}","HtmlTextBlogLoadingPosts":"Carregando…","HtmlTextBlogShowMorePosts":"Mostrar mais","HtmlTextBlogViewOriginalPost":"exibir publicação original","HtmlTextBlogViewOriginalSite":"exibir site original","HtmlTextCommentDialogButtonCancel":"Cancelar","HtmlTextCommentDialogButtonOk":"Publicar no Facebook","HtmlTextCommentDialogPlaceholder":"Escreva algo...","HtmlTextContactUsAddress":"Endereço:","HtmlTextContactUsAddressStr":"Endereço","HtmlTextContactUsCallNowStr":"Chamar","HtmlTextContactUsCallStr":"Chamar","HtmlTextContactUsContactUsStr":"Entre em contato","HtmlTextContactUsEmailStr":"E-mail","HtmlTextContactUsFax":"Fax:","HtmlTextContactUsFaxNumberStr":"Número de fax","HtmlTextContactUsFaxStr":"Fax","HtmlTextContactUsGetDirections":"Obter direções","HtmlTextContactUsLinkStr":"Link","HtmlTextContactUsMail":"E-mail:","HtmlTextContactUsMapStr":"Mapa","HtmlTextContactUsPhone":"Telefone:","HtmlTextContactUsPhoneNumberStr":"Número de telefone","HtmlTextContactUsShowOnMap":"Mostre no mapa","HtmlTextContactUsSignUpStr":"Registrar","HtmlTextContactUsWeb":"Web:","HtmlTextEventsDayFriday":"Sexta","HtmlTextEventsDayMonday":"Segunda","HtmlTextEventsDaySaturday":"Sábado","HtmlTextEventsDaySunday":"Domingo","HtmlTextEventsDayThursday":"Quinta","HtmlTextEventsDayTuesday":"Terça","HtmlTextEventsDayWednesday":"Quarta","HtmlTextEventsFutureEvents":"Próximos eventos","HtmlTextEventsLocationStr":"Local","HtmlTextEventsMonthApril":"Abril","HtmlTextEventsMonthAugust":"Agosto","HtmlTextEventsMonthDecember":"Dezembro","HtmlTextEventsMonthFebruary":"Fevereiro","HtmlTextEventsMonthJanuary":"Janeiro","HtmlTextEventsMonthJuly":"Julho","HtmlTextEventsMonthJune":"Junho","HtmlTextEventsMonthMarch":"Março","HtmlTextEventsMonthMay":"Maio","HtmlTextEventsMonthNovember":"Novembro","HtmlTextEventsMonthOctober":"Outubro","HtmlTextEventsMonthSeptember":"Setembro","HtmlTextEventsNoEventsStr":"Não existe nenhum evento a ser exibido.","HtmlTextEventsPastEvents":"Eventos passados","HtmlTextEventsPhoneNumberStr":"Número de telefone","HtmlTextEventsTicketStr":"Entrada","HtmlTextEventsVenueStr":"Local","HtmlTextFacebookAddCommentButton":"Comentar","HtmlTextFacebookLikeComment":"Curtir","HtmlTextFacebookLikePostButton":"Curtir","HtmlTextFacebookLikesCount":"{number} curtiram","HtmlTextFacebookLoadingPosts":"Carregando…","HtmlTextFacebookPageLikesCount":"curtiram isto","HtmlTextFacebookPostCommentsCount":"{number} comentário(s)","HtmlTextFacebookPostLikesCount":"{number} pessoas curtiram isso","HtmlTextFacebookPostLikesCountIncludeYou":"Você e outras {number} pessoas curtiram isso","HtmlTextFacebookPostLikesOnlyYou":"Você curtiu isto","HtmlTextFacebookReadMore":"Leia mais","HtmlTextFacebookShowMorePosts":"Mostrar mais publicações","HtmlTextFacebookUnikeComment":"Curtir (desfazer)","HtmlTextFacebookUnikePostButton":"Curtir (desfazer)","HtmlTextFavoritesBuyButton":"Comprar","HtmlTextFavoritesCancelButton":"Cancelar","HtmlTextFavoritesDoneButton":"Concluído","HtmlTextFavoritesEditButton":"Editar","HtmlTextFavoritesNoFavsStr1":"Nenhuma faixa foi adicionada.","HtmlTextFavoritesNoFavsStr2":"Adicione faixas aos seus favoritos.","HtmlTextLiveAlbumAddComment":"adicionar comentário","HtmlTextLiveAlbumByUploader":"por {name}","HtmlTextLiveAlbumErrorLoadingImage":"Não é possível carregar a imagem","HtmlTextLiveAlbumEula":"Termos de Uso","HtmlTextLiveAlbumFacebookLogin":"Compartilhar fotos com seus amigos do Facebook","HtmlTextLiveAlbumFacebookLoginComment":"(requer que você vincule a sua conta do Facebook)","HtmlTextLiveAlbumFacebookLoginLiveAlbum":"LiveAlbum","HtmlTextLiveAlbumLoadingAlbum":"Carregando...","HtmlTextLiveAlbumLoadingImage":"Carregando...","HtmlTextLiveAlbumLoadingShowMore":"Carregando…","HtmlTextLiveAlbumNoImages":"SEJA O PRIMEIRO A PUBLICAR UMA FOTO","HtmlTextLiveAlbumPhotos":"fotos","HtmlTextLiveAlbumShareCheckbox":"Compartilhar no Facebook","HtmlTextLiveAlbumShowMore":"Mostrar mais","HtmlTextLivePersonEnd":"Encerrar","HtmlTextLivePersonInputPlaceholder":"Escrever uma mensagem...","HtmlTextLivePersonSend":"Enviar","HtmlTextLivePersonStart":"INICIAR","HtmlTextLivePersonStatusAgentTyping":"{agentName} está digitando...","HtmlTextLivePersonStatusChatting":"No bate-papo com {agentName}","HtmlTextLivePersonStatusCheckingAvailability":"Verificando a disponibilidade...","HtmlTextLivePersonStatusCheckingAvailabilityMinorText":"conectando","HtmlTextLivePersonStatusClosingChat":"Fechando o bate-papo...","HtmlTextLivePersonStatusInit":"Para iniciar uma sessão de bate-papo, clique em:","HtmlTextLivePersonStatusWaitingAgent":"Aguardando um agente...","HtmlTextLivePersonStatusWaitingAgentMinorText":"chamando","HtmlTextLoadingPagination":"Carregando...","HtmlTextMapLoading":"Carregando…","HtmlTextMorePages":"Mais","HtmlTextPaginationLoadingItems":"Carregando…","HtmlTextPaginationRefreshButton":"Atualizar","HtmlTextPaginationRefreshItems":"Carregando…","HtmlTextPaginationShowMoreItems":"Mostrar mais...","HtmlTextPhotosImagesCount":"{number} foto(s)","HtmlTextPhotosNoImages":"O álbum está vazio","HtmlTextPurchaseItemBuy":"Comprar","HtmlTextPurchaseItemBuyAlbum":"Comprar álbum","HtmlTextRadioLoading":"Carregando...","HtmlTextRemoveTrackFromFavorites":"Remover faixa da sua lista de favoritos agora","HtmlTextReviewsByAuthor":"por {name}","HtmlTextReviewsLoadingProvider":"Carregando…","HtmlTextReviewsReadMoreLink":"Leia mais","HtmlTextReviewsReviewsCount":"{number} resenha(s) em {provider}","HtmlTextRevuReopenToReview":"(reabra o aplicativo para revisar suas alterações)","HtmlTextRevuShakeToReload":"(balance para recarregar o aplicativo)","HtmlTextRssReadMore":"Leia mais","HtmlTextRssShowOnMap":"Mostre no mapa","HtmlTextShareAppButtonText":"Compartilhar aplicativo","HtmlTextShareButtonText":"Compartilhar","HtmlTextShareChangeUserName":"Não é {name}?","HtmlTextShareFacebookChangeUserButton":"Alterar usuário","HtmlTextShareFacebookPostButton":"Publicar","HtmlTextShareFacebookWriteCommentPlaceholder":"Insira o seu comentário","HtmlTextShareOnFacebook":"Compartilhar no Facebook","HtmlTextShareOnTwitter":"Compartilhar no Twitter","HtmlTextShareTwitterChangeUserButton":"Alterar usuário","HtmlTextShareTwitterLoginButton":"Login","HtmlTextShareTwitterLoginCaption":"Fazer o login","HtmlTextShareTwitterPasswordCaption":"Senha","HtmlTextShareTwitterPostButton":"Tweet","HtmlTextShareTwitterUserNameCaption":"Nome de usuário ou e-mail","HtmlTextShareTwitterWriteCommentPlaceholder":"Insira o seu comentário","HtmlTextShowMorePagination":"Mostrar mais","HtmlTextShowOnMapButtonStr":"Mapa","HtmlTextSlicerUnableLoading":"Impossível carregar o conteúdo do site","HtmlTextSpeakersBioTitle":"Perfil do interlocutor","HtmlTextSubscribeDiscoverString":"Encontre-nos nesses sites","HtmlTextSubscribeFacebookButton":"Facebook","HtmlTextSubscribeFollowBlogTitle":"Seguir {blogTitle}","HtmlTextSubscribeInsetYourEmail":"seu@e-mail.com","HtmlTextSubscribeLinkedInButton":"LinkedIn","HtmlTextSubscribeLoading":"Registrando...","HtmlTextSubscribeSubscribeButton":"Assinar","HtmlTextSubscribeSubscribeString":"Assinar {blogTitle}","HtmlTextSubscribeTwitterButton":"Twitter","HtmlTextSubscribeUnknownButton":"Desconhecido","HtmlTextTwitterFollowButton":"Seguir","HtmlTextTwitterFollowers":"Seguidores","HtmlTextTwitterFollowersCount":"{number} seguidores","HtmlTextTwitterLoadingTweets":"Carregando…","HtmlTextTwitterRetweet":"por {retweeterName}","HtmlTextTwitterRetweetDetails":"retweetado por","HtmlTextTwitterShowMoreTweets":"Mostrar mais tweets","HtmlTextTwitterStatusesCount":"{number} status","HtmlTextTwitterTweets":"Tweets","HtmlTextTwitterUnfollowButton":"Deixar de seguir","HtmlTextVideoByAuthor":"por {author}","HtmlTextViewOriginalPageBtnText":"Exibir versão original","HtmlTextYoutubeByAuthor":"por {author}","HtmlTextYoutubeLikes":"{likes} curtiram | {dislikes} não curtiram","HtmlTextYoutubeRatings":"{ratings} classificações {views} exibições","HtmlTextYoutubeViews":"{views} exibições","HtmlTextYoutubeViewsCount":"{number} exibições","IndicatorLiveAlbumPostingImage":"Publicando imagem...","IndicatorLoading":"Carregando...","IndicatorShareLogOut":"Logoff...","IndicatorSharePublishing":"Publicando...","IndicatorShareTweeting":"Twittando...","IndicatorShareTwitterSigningIn":"Fazendo o login...","PushNotificationTitle":"Notificação","SDayAgo":"1 dia atrás","SFacebookShareEmailSubject":"Confira esta publicação da página do Facebook de {user}.","SFacebookShareTwitterFrom":"Do mural do Facebook de {user}","SHourAgo":"1 hora atrás","SLivePersonUserName":"eu","SMinuteAgo":"1 minuto atrás","SMonthAgo":"1 mês atrás","SNumberDaysAgo":"{number} dias atrás","SNumberHoursAgo":"{number} horas atrás","SNumberMinutesAgo":"{number} minutos atrás","SNumberMonthsAgo":"{number} meses atrás","SNumberSecondsAgo":"{number} segundos atrás","SNumberWeeksAgo":"{number} semanas atrás","SNumberYearsAgo":"{number} anos atrás","SRssShareComment":"confira essa publicação de {link}","SRssShareEmailSubject":"Confira este artigo de {title}","SRssShareTwitterFrom":"de {title}","SSecondAgo":"1 segundo atrás","SSecondsAgo":"segundos atrás","SShareApp":"Confira o aplicativo móvel {appName} que eu acabei de usar!","SShareAppMailBody":"Ei,<br>Confira o aplicativo móvel {appName} que eu acabei de usar!","SShareAppMailSubject":"Confira este excelente novo aplicativo!","SShareConduitMobile":"Conduit Móvel","SShareEmailLink":"Leia mais","SShareFromMobile":"Compartilhado do meu aplicativo móvel","SShareFromMobileWithLink":"Compartilhado do meu aplicativo móvel {appLink}","SShareMailApplinkHtml":"Compartilhado do meu: {htmlLink}","SShareMailApplinkSimple":"Compartilhado do meu aplicativo móvel: {appLink}","SShareMailPowerByConduitHtml":"Oferecido por: {htmlLink}","SShareMailPowerByConduitSimple":"Oferecido por Conduit Móvel: {conduitLink}","SShareMobileApp":"aplicativo móvel","SSharePhotoSubject":"Veja esta foto incrível!","SSharePhotoText":"Dê uma olhada nesta foto incrível!","SSharePhotoTitle":"Foto incrível","SShareTweetedFromLink":"Twittado do {appLink}","STwitterShareEmailSubject":"Confira esse tweet de {name}","SWeekAgo":"1 semana atrás","SYearAgo":"1 ano atrás","SYoutubeShareTitle":"Confira este vídeo - {title}","TitleShareVia":"Compartilhar no","ToastMessageAudioInitFail":"Falha ao iniciar player de áudio","ToastMessageBlogFailedGetPosts":"falha ao obter publicações","ToastMessageFacebookFailedGetComments":"falha ao receber dados","ToastMessageLiveAlbumPublishingPhoto":"Imagem carregada com sucesso, A atividade será atualizada em seguida","ToastMessagePaginationFailedGetItems":"falha ao receber dados","ToastMessageSubscribeInsetEmail":"Endereço de e-mail requerido","ToastMessageSubscribeInvalidEmail":"Insira um endereço de e-mail válido","ToastMessageTrackAddedToFavorites":"Faixa adicionada aos favoritos","ToastMessageTrackRemovedFromFavorites":"Faixa removida dos favoritos","HtmlTextAboutUsItemTitleDescription":"Description","HtmlTextAboutUsItemTitleFoodStyle":"Food Type","HtmlTextAboutUsItemTitleBiography":"Biografia","HtmlTextAboutUsItemTitleRecordLabel":"Gravadora","HtmlTextAboutUsItemTitleHours":"Horas","HtmlTextAboutUsItemTitleServices":"Serviços","HtmlTextAboutUsItemTitleAwards":"Prêmios","HtmlTextAboutUsItemTitleParking":"Estacionamento","HtmlTextAboutUsItemTitleProducts":"Produtos","HtmlTextAboutUsItemTitleMission":"Missão","HtmlTextAboutUsItemTitleManager":"Gerente","HtmlTextAboutUsItemTitleBookingAgent":"Agente de reservas","HtmlTextInstagramUserLikePhoto":"Curtir","HtmlTextInstagramPhotosCount":"fotos","HtmlTextInstagramFollowersCount":"seguidores","HtmlTextInstagramFollowingCount":"seguindo","DialogMessageFormSendSuccess":"Dados enviados","DialogMessageFormSendFail":"Falha ao enviar dados","HtmlTextAboutUsItemTitleCompanyOverview":"Visão geral da empresa","HtmlTextAboutUsItemHoursAlwaysOpen":"Aberto 24h","HtmlTextAboutUsItemHoursNoHours":"Nenhuma hora disponível","HtmlTextAboutUsInfoVersion":"Versão {versionName}","HtmlTextAboutUsReadMore":"Saiba mais","HtmlTextAboutUsListItemReadMore":"Saiba mais","HtmlTextAboutUsDescriptionTitle":"Descrição","DialogCaptionConfirm":"Confirm","DialogCaptionSuccess":"Success","DialogMessagePollAreYouSureVote":"Are you sure you want to vote for \"{text}\" ?","DialogMessagePollVoteFail":"Your vote was not received. Please try again later.","DialogMessagePollVoteSuccess":"Your vote has been received.","HtmlTextPollVoteButton":"Vote","HtmlTextLinksDescriptionTitle":"Description","HtmlTextDatePickerDialogButtonOk":"OK","HtmlTextDatePickerDialogButtonCancel":"Cancel","HtmlTextDatePickerDialogButtonClear":"Clear","HtmlTextPageNotSupportedInCp":"This page is not supported in simulator mode.","HtmlTextPageNotSupportedInCp2":"To test it on your device, please install our ReVu app.","HtmlTextInstagramLikes":"Likes","HtmlTextInstagramComments":"Comments","HtmlTextInstagramPrivateUserMainText":"This user does not share information publicly.","HtmlTextInstagramPrivateUserSecondaryText":"You cannot view this page.","HtmlTextLiveAlbumUploadingImage":"Uploading image...","HtmlTextLiveAlbumUploadingFailed":"The image failed to upload.","HtmlTextLiveAlbumUploadedByYou":"You","HtmlTextAgendaSpeakersCount":"{number} speakers:","HtmlTextAgendaOneSpeaker":"Speaker:","HtmlTextAgendaSessionDetails":"Details","HtmlTextAgendaAddToFav":"Add to Favs","HtmlTextAgendaRemoveFromFav":"Remove from Favs","DialogMessageAgendaNoFav":"There are no sessions in your Favorites list.","DialogCaptionAgendaNoFav":"Favorites","DialogMessageEventsRsvpNotSupportedInSimulator":"This action is not supported in simulator mode.","UserMessageTextHello":"Hi there! I’m having a blast at SXSW. You?","ReportsUploadingImage":"Uploading...","ReportsImageUploadingStartedForImageByIndex":"Uploading image {number}","ReportsImageUploadingSucceededForImageByIndex":"Upload for image {number} successful","ReportsImageUploadingFailedForImageByIndex":"Image {number} failed to upload","ReportsImageUploaded":"Uploaded","ReportsImageUploadFailed":"Upload failed","ReportsImageUploadAddPhoto":"Add a photo"}},"maxAge":7200,"serviceUrl":"http:\/\/ams.mobile.conduit-services.com\/translate\/mobile.client\/PT-BR\/2"}],"timestamp":1369744154};
DEBUG = 0
(new Image()).src = 'app/interface/web/img/ajax-loader.png';
var WebAppPreloader=(function(){var y={};var e=null,k=null,A=null,b=true,j=false,f=null;var p={background_color:"#222222",splash_timeout:5000};var c=function(B,D){var C;return function(){if(C){return}C=setTimeout(function(){C=null;B.apply(this)},D);B.apply(this)}};var i=function(){return(typeof window.orientation!=="undefined")};var g=function(){var D=window.screen.width;var C=window.screen.height;if(C<D){C=window.screen.width;D=window.screen.height}var B=window.devicePixelRatio;if((window.innerWidth*B===window.screen.width)&&(DEVICE===deviceTypeEnum.android)){C=Math.ceil(C/B);D=Math.ceil(D/B)}return[D,C]};var r=function(){var B=g();if(o()!==0){return[B[1],B[0]]}else{return B}};var l=function(){var D=null;if(typeof WebViewportSizeManager!=="undefined"){D=WebViewportSizeManager.getViewportHeight()}var C=window.innerWidth;var B=D?D:window.innerHeight;if(B<C){B=window.innerWidth;C=window.innerHeight}return[C,B]};var z=function(){var B=l();if(o()!==0){return[B[1],B[0]]}else{return B}};var n=function(){if(i()){return window.orientation}var C=window.innerWidth;var B=window.innerHeight;if(B<C){return 90}return 0};var o=function(){if(LAYOUT===layoutFormat.wide){return 90}else{return 0}};var w=function(){return p.background_color};var d=function(){if(typeof PRELOADER_OPTIONS==="undefined"||typeof PRELOADER_OPTIONS.splash==="undefined"||typeof PRELOADER_OPTIONS.splash.img==="undefined"){return null}var P=PRELOADER_OPTIONS.splash.img;var G=window==top?r():z(),I=G[1]/G[0],N=G[1]*G[0]*window.devicePixelRatio*window.devicePixelRatio,C=null,D=999,J=999999999;var H=/^\d+x\d+$/;for(var F in P){if(!P.hasOwnProperty(F)||!H.test(F)){continue}var L=F.split("x");var B=L[0];var O=L[1];var K=(O/B);var M=Math.abs(I-K);if(M<=D){var E=Math.abs(N-B*O);if(M<D||E<J){D=M;J=E;C=P[F]}}}if(!C){return null}return{path:C,timeout:typeof PRELOADER_OPTIONS.splash.timeout!=="undefined"?PRELOADER_OPTIONS.splash.timeout:p.splash_timeout}};var a=function(C){var G=false;b=false;var E=function(){if(G){return}G=true;b=true;clearTimeout(D);u()};var F=function(){clearTimeout(D);setTimeout(function(){b=true;u()},C.timeout)};var D=setTimeout(E,C.image_load_timeout?C.image_load_timeout:6000);var B=(new Image());B.src=C.path;B.onload=F;B.onerror=E};var m=function(){var C=window.innerHeight+"px";var D=window.innerWidth+"px";e.style.height=C;e.style.width=D;if(k!=null){var E=z();var F=(o()-n())%180;var B="rotate("+F+"deg)";k.style.display="block";k.style.left=Math.ceil(window.innerWidth/2-E[0]/2)+"px";k.style.top=Math.ceil(window.innerHeight/2-E[1]/2)+"px";k.style.width=E[0]+"px";k.style.height=E[1]+"px";k.style.transform=B;k.style["-ms-transform"]=B;k.style["-webkit-transform"]=B;k.style["-o-transform"]=B;k.style["-moz-transform"]=B}};var q=function(D,B,C){if(D.addEventListener){D.addEventListener(B,C,false)}else{if(D.attachEvent){D.attachEvent("on"+B,C)}}};var x=function(D,B,C){if(D.addEventListener){D.removeEventListener(B,C,false)}else{if(D.detachEvent){D.detachEvent("on"+B,C)}}};var v=function(C){if(!window.addEventListener){return}q(window,"orientationchange",C);q(window,"scroll",C);q(window,"resize",C);var B=t;t=function(){B(C)}};var t=function(B){if(!window.removeEventListener){return}x(window,"orientationchange",B);x(window,"scroll",B);x(window,"resize",B)};var u=function(){if(!j||!b){return}t();if(e){document.body.removeChild(e);e=null}if(k){document.body.removeChild(k);k=null}$("#app").addClass("visible");if(Scrolling){setTimeout(Scrolling.triggerWrapperResize,100)}if(f){f()}};var s=function(){A=d();e=document.createElement("div");e.className="web_preloader";e.style["background-color"]=w();var C=document.createElement("span");C.className="web_preloader_spinner spin";var B=document.createElement("p");B.className="web_preloader_caption";B.innerHTML="Loading...";e.appendChild(C);e.appendChild(B);if(A!=null){k=document.createElement("div");k.className="web_preloader_splash";k.style["background-image"]="url("+A.path+")";a(A);document.body.appendChild(k)}document.body.appendChild(e)};y.onAppReady=function(B){f=B;j=true;u()};s();var h=c(m,100);v(m);setTimeout(m,0);return y})();
var __resources={"appbase.min.css":{type:"css"},"appbase.min.js":{type:"js"}};


/**
 * Resource loader class - this class is responsible for loading
 * all javascript / css resources.
 * 
 * @author Eran Zinman
 */
var ResourceLoader = (function() 
{
    var me = {};
	
	// Content to be written to document
	var documentWrite = '';

	/**
	 * Load a given resource file, by document.write into the HTML.
	 * 
	 * @param {string} file - Relative path of the resource URL to include
	 * @param {string} type - ('css', 'js') - The type of resource to load
	 * @author Eran Zinman
	 */
	function loadResource(file, type)
	{
		if (type === 'js')
		{
			documentWrite += '<script type="text/javascript" src="' + file + '"></' + 'script>';
		}
		else if (type === 'css')
		{
			documentWrite += '<link type="text/css" rel="stylesheet" href="' + file + '">';
		}	
	}
	
	/**
	 * Check if criteria is met or not
	 * 
	 * @param {Object} criteriaArray - criteria array to check
	 * @return {Boolean} true if criteria is valid, false otherwise
	 * @author Eran Zinman
	 */
	function isCriteriaMet(criteriaArray)
	{
		// If criteria is empty, we are good
		if (criteriaArray.length == 0)
		{
			return true;
		}
		
		// Loop through "yeah" array, and verify it's valid
		for (var i = 0; i < criteriaArray.length; i++)
		{
			// Get current criteria item
			var item = criteriaArray[i];
			
			// Split into item array
			var itemArray = item.split('&');
			
			// Loop through item array
			var isValid = true;
			for (j = 0; j < itemArray.length; j++)
			{
				// Check if this criteria item equals to one of our platforms or device
				var curCriteria = itemArray[j];
				if ((typeof(platformEnum[curCriteria]) !== 'undefined' && platformEnum[curCriteria] != PLATFORM) ||
					(typeof(deviceTypeEnum[curCriteria]) !== 'undefined' && deviceTypeEnum[curCriteria] != DEVICE))
				{
					// This is valid !
					isValid = false;
				}	
			} 
			
			// If current item is valid, return true and break the main loop
			if (isValid)
			{
				return true;
			}
		}
		
		// We are done, none of the criteria items was valid - criteria is not met
		return false;
	}

	/**
	 * Check if the given resource should be loaded or not (according
	 * to the current device and platform)
	 * 
	 * @param {Object} resource - The resource object, containing an optional "yeah" and "nope" arrays
	 * @return {boolean} true if we should load resource, false otherwise
	 * @author Eran Zinman
	 */
	me.isValidResource = function(resource)
	{	
		// A resource is valid iff is "yeah" parameter is valid (or empty),
		// and his "nope" parameter is not valid
		var isYeah = true;
		var isNope = false;		
			        
		// If resource is valid
		if (resource) 
		{	
			// Get "yeah" and "nope" variables
			var yeahCriteria = resource.yeah || [];
			var nopeCriteria = resource.nope || [];
			
			// Get "yeah" and "nope" crteria's
			isYeah = isCriteriaMet(yeahCriteria);
			
			if (nopeCriteria.length > 0) 
			{
				isNope = isCriteriaMet(nopeCriteria);
			}
		}
	    
	    // Check that both device and platform are OK
		var isValid = isYeah && !isNope;
	    return isValid;
	}
	
	function getResourcesToLoad(resources, prefix)
	{
		var resourcesToLoad = [];
		
		// Check if we set the folder prefix
		prefix = prefix || '';
		
		// Loop through resources
		var minifiedResource = null;
		for (minifiedResource in resources)
		{
			// Get resource and it's type
			var resource = resources[minifiedResource];
			var resourceType = resource.type;
			
			// Check if we are in DEBUG / RELEASE modes. Try to fetch
			// this state from the parent (if executed from a page)
			var debugMode = false;
			try 
			{
				if (typeof window.DEBUG !== 'undefined') 
				{
					debugMode = window.DEBUG;
				}
				else if (typeof parent.DEBUG !== 'undefined') 
				{
					debugMode = parent.DEBUG;
				}
			} 
			catch (e) 
			{
				// Prevent exception when unable to access parent
			}
			
			// In release, load minified file
			if (!debugMode)
			{
				// Add prefix
				minifiedResource = prefix + minifiedResource;	
				
				// Add minified resource to array
				resourcesToLoad.push({ file: minifiedResource, type: resourceType });
			}			
			// In debug, load each file individually
			else
			{
				// Did we specify any files to load?
				if (resource.files) 
				{
					// Loop through files to load
					var files = resource.files;
					for (var i = 0; i < files.length; i++) 
					{
						var resourceObj = files[i];
						if (me.isValidResource(resourceObj)) 
						{
							// Add minified resource to array
							var fileResource = prefix + resourceObj['file'];
							resourcesToLoad.push({ file: fileResource, type: resourceType });
						}
					}
				}
			}
		}
		
		return resourcesToLoad;
	}
	
	/**
	 * Loads the given resources array.
	 * 
	 * @param {Object} resources - Resources to load array
	 * @param {string} prefix - URL path prefix to load the resources from
	 * @author Eran Zinman
	 */
	me.loadResources = function(resources, prefix)
	{
		// Get resources to load
		var resourcesToLoad = getResourcesToLoad(resources, prefix);
		
		// Loop through resources
		for (var resourceIndex in resourcesToLoad)
		{
			var resource = resourcesToLoad[resourceIndex];
			loadResource(resource.file, resource.type);	
		}
	};
	
	/**
	 * Will make actual write to HTML, to load all the required
	 * resources
	 * 
	 * @author Eran Zinman
	 */
	me.flush = function()
	{
		// Write document write buffer to document
		document.write(documentWrite);
		
		// Clear document write buffer
		documentWrite = '';
	};
    
	return me;
}());

/**
 * Self executing function which simply loads the resources array
 * 
 * @author Eran Zinman
 */
(function loadAllResources()
{
	if (window.__resources) 
	{
		ResourceLoader.loadResources(window.__resources);
	}
	
	// Document write to HTML
	ResourceLoader.flush();
})();




// old application colors:
window.__overrideColors = 
{
	'color_J': '#77ff00ff',
	'color_A': '#22334455'
}

window.__overrideLayout =
{
            /* ======= */
            /* General */
            /* ======= */
            app_background:
            {
                        "type": "background",
                        "code": "j",
                        "meta":
                        {
                                    "type": "solid",
                                    "color": "#00000000"
                        }
            },
 
 
            /* ================= */
            /* Info bar (header) */
            /* ================= */
            /*
            infobar_background:
            {
            "type": "background",
            "code": "a",
            "meta":{
                        "type": "gradient",
                        "orientation": "vertical",
                        "color":
                                    [
                                                {
                                                              "color": "#CC959595",
                                                              "location": 0.0
                                                },
                                                {
                                                              "color": "#CC636363",
                                                              "location": 0.24
                                                },
                                                {
                                                              "color": "#CC535353",
                                                              "location": 0.5
                                                },
                                                {
                                                              "color": "#CC414141",
                                                              "location": 0.51
                                                },
                                                {
                                                              "color": "#CC2a2a2a",
                                                              "location": 0.72
                                                },
                                                {
                                                              "color": "#CC2d2d2d",
                                                              "location": 0.88
                                                },
                                                {
                                                              "color": "#CC4b4d4d",
                                                              "location": 1
                                                }
                                    ],
                                    "shadow": { "isInset": false, "x": "0px", "y": "1px", "blur": "3px", "color": "#CC000000"}
                        }
            },
            */
           
            infobar_border:
            {
                        "type": "border",
                        "code": "aa",
                        "meta":
                        {
                                    "bottom":
                                    {
                                                "color": "#FF1e1e1e",
                                                "width": "1px"
                                    }
                        }
 
            },
           
           
           
           
            /* ========= */
            /* Content A */
            /* ========= */
 
            item_a_background:
            {
                        "type": "background",
                        "code": "m",
                        "meta":
                        {
                                    "type": "solid",
                                    "color": "#FF2a2a2a"                                                                                                                                                      
                        }
            },
 
            item_a_background_selected:
            {
                        "type": "background",
                        "meta":
                        {
                                    "type": "solid",
                                    "color":"#FF202020"                                          
                        }
            },
                       
            item_a_classic_border:
            {
                        "type": "border",
                        "code": "nc",
                        "meta":
                        {
 
                                    "bottom":
                                    {
                                                "color": "#FF1c1c1c",
                                                "width": "1px"
                                    },
                                    "right":
                                    {
                                                "color": "#00000000",
                                                "width": "0px"
                                    },
                                    "left":
                                    {
                                                "color": "#00000000",
                                                "width": "0px"
                                    },
                                    "top":
                                    {
                                                "color": "#FF353535",
                                                "width": "1px"
                                    }          
                        }
                                   
            },
           
            item_a_classic_border_selected:
            {
                        "type": "border",
                        "meta":
                        {
                        }
            },
           
            item_a_bubble_border:
            {
                        "type": "border",
                        "code": "nb",
                        "meta":
                        {
                        }
            },
           
            item_a_bubble_border_selected:
            {
                        "type": "border",
                        "meta":
                        {
                        }
            },
           
 
            item_a_title:
            {
                        "type": "text",
                        "code": "h",
                        "meta":
                        {
                                    "color": "#FFdedfdf",
                                    "shadow": { "x": "1px", "y": "1px", "blur": "1px", "color": "#96000000"}     
                        }
            },
 
           
            item_a_text:
            {
                        "type": "text",
                        "code": "i",
                        "meta":
                        {
                                    "color": "#FFb2b2b2",
                                    "shadow": { "x": "1px", "y": "1px", "blur": "1px", "color": "#96000000"}     
                        }
            },
           
            item_a_alt_text1:
            {
                        "type": "text",
                        "code": "k",
                        "meta":
                        {
                                    "color": "#FFb4b4b4"
                        }
            },
           
            item_a_link:
            {
                        "type": "text",
                        "code": "e",
                        "meta":
                        {
                            "color": "#FFf24197",
                                    "shadow": { "x": "1px", "y": "1px", "blur": "1px", "color": "#96000000"}
                        }
            },
           
            _item_a_icon:
            {
                        "type": "icon",
                        "code": "m",
                        "meta":{
                                    "type": "solid",
                                    "color": "#FFFFFFFF",
                                    "isBlack": false
                        }
            },
 
            _item_ak_icon:
            {
                        "type": "icon",
                        "code": "mk",
                        "meta":
                        {
                                    "type": "solid",
                                    "color": "#FFB4B4B4",
                                    "isBlack": false
                        }
            },
           
                                               
            /* ================= */
            /* "BUBBLE-MESSAGES" */
            /* ================= */
 
            user_message_background:
            {
                        "type": "background",
                        "code": "userMessage",
                        "meta":
                        {
                                    "type": "solid",
                                    "color": "#FF414141"
                        }
            },
 
            agent_message_background:
            {
                        "type": "background",
                        "code": "agentMessage",
                        "meta":
                        {
                                    "type": "solid",
                                    "color": "#33414141"
                        }
            },
           
           
           
            /* ========= */
            /* Content B */
            /* ========= */
 
           
            item_b_background:
            {
                        "type": "background",
                        "code": "m2",
                        "meta":
                        {
                                    "type": "solid",
                                    "color": "#A01d1d1d",
                                    "shadow": { "isInset": true, "x": "0px", "y": "-1px", "blur": "4px", "color": "#cc000000"}                   
                        }
            },
 
            item_b_background_selected:
            {
                        "type": "background",
                        "meta":
                        {
                                    "type": "solid",
                                    "color": "#33474747",
                                    "shadow": { "isInset": true, "x": "0px", "y": "-1px", "blur": "4px", "color": "#cc000000"}                                                                                
                        }
            },
 
            item_b_bubble_background:
            {
                        "type": "background",
                        "code": "m2bubble",
                        "meta":
                        {
                                    "type": "solid",
                                    "color": "#FF474747",
                                    "shadow": { "isInset": false, "x": "1px", "y": "1px", "blur": "2px", "color": "#cc000000"}                                               
                        }
            },
           
            item_b_bubble_background_selected:
            {
                        "type": "background",
                        "code": "m2bubble",
                        "meta":
                        {
                                    "type": "solid",
                                    "color": "#FF5a5a5a",
                                    "shadow": { "isInset": false, "x": "1px", "y": "1px", "blur": "1px", "color": "#cc000000"}                                           
                        }
            },
           
            item_b_classic_background:
            {
                        "type": "background",
                        "code": "m2classic",
                        "meta":
                        {
                                    "type": "solid",
                                    "color": "#FF474747"
                        }
            },
 
            item_b_classic_background_selected:
            {
                        "type": "background",
                        "meta":
                        {
                                    "type": "solid",
                                    "color": "#FF474747"                                                                                                   
                        }
            },
 
            item_b_rectangle_background:
            {
                        "type": "background",
                        "code": "m2rectangle",
                        "meta":
                        {
                                    "type": "solid",
                                    "color": "#FF474747",    
                                    "shadow": { "isInset": false, "x": "1px", "y": "1px", "blur": "3px", "color": "#cc000000"}                                        
                        }
            },
 
            item_b_rectangle_background_selected:
            {
                        "type": "background",
                        "meta":
                        {
                                    "type": "solid",
                                    "color": "#FF575757",    
                                    "shadow": { "isInset": false, "x": "1px", "y": "1px", "blur": "3px", "color": "#cc000000"}                                                                                                                                       
                        }
            },
 
            item_b_classic_border:
            {
                        "type": "border",
                        "code": "nc2",
                        "meta":
                        {
                                    "bottom":
                                    {
                                                "color": "#FF404040",
                                                "width": "1px"
                                    }                                                                                  
                        }
            },
           
            item_b_classic_border_selected:
            {
                        "type": "border",
                        "meta":
                        {
                                    "bottom":
                                    {
                                                "color": "#FF404040",
                                                "width": "1px"
                                    }
                        }
            },
           
            item_b_rectangle_border:
            {
                        "type": "border",
                        "code": "nr2",
                        "meta":
                        {
                                    "left":
                                    {
                                                "color": "#ff505050",
                                                "width": "1px"
                                    },                                                                                
                                    "right":
                                    {
                                                "color": "#ff505050",
                                                "width": "1px"
                                    },                                                                                
                                    "bottom":
                                    {
                                                "color": "#ff505050",
                                                "width": "1px"
                                    },                                                                                
                                    "top":
                                    {
                                                "color": "#ff505050",
                                                "width": "1px"
                                    }                                                                                  
                        }
            },
 
            item_b_rectangle_border_selected:
            {
                        "type": "border",
                        "meta":
                        {
                                    "left":
                                    {
                                                "color": "#FFC1C1C2",
                                                "width": "1px"
                                    },                                                                                
                                    "right":
                                    {
                                                "color": "#FFC1C1C2",
                                                "width": "1px"
                                    },                                                                                
                                    "bottom":
                                    {
                                                "color": "#FFC1C1C2",
                                                "width": "1px"
                                    },                                                                                
                                    "top":
                                    {
                                                "color": "#FFC1C1C2",
                                                "width": "1px"
                                    }
                        }
            },
           
            item_b_title:
            {
                        "type": "text",
                        "code": "h2",
                        "meta":
                        {
                                    "color": "#FFdedfdf",
                                    "shadow": { "x": "1px", "y": "1px", "blur": "1px", "color": "#96000000"}     
                        }
            },
           
           
            item_b_text:
            {
                        "type": "text",
                        "code": "i2",
                        "meta":
                        {
                                    "color": "#FFb2b2b2",
                                    "shadow": { "x": "1px", "y": "1px", "blur": "1px", "color": "#96000000"}     
                        }
            },
           
            item_b_alt_text1:
            {
                        "type": "text",
                        "code": "k2",
                        "meta":
                        {
                                    "color": "#FF707377"
                        }
            },
           
            item_b_link:
            {
                        "type": "text",
                        "code": "e2",
                        "meta":
                        {
                            "color": "#FFf24197",
                                    "shadow": { "x": "1px", "y": "1px", "blur": "1px", "color": "#96000000"}
                        }
            },
           
            _item_b_icon:
            {
                        "type": "icon",
                        "code": "m2",
                        "meta":
                        {
                                    "type": "solid",
                                    "color": "#FFFFFFFF",
                                    "isBlack": false
                        }
            },
           
 
           
           
            /* ============== */
    /* Inner Tabs bar */
    /* ============== */
           
    tabbar_background:
    {
        "type": "background",
        "meta":
        {
            "type": "solid",
            "color": "#CC303030",
                                    "shadow": { "isInset": false, "x": "0px", "y": "1px", "blur": "8px", "color": "#CC000000"}                                           
        }
    },
 
    tabbar_border:
    {
        "type": "border",
        "meta":
        {
            "bottom":
            {
                "color": "#FF404040",
                "width": "1px"
            }
        }
    },
   
    
    tabbar_item_background:
    {
        "type": "background",
        "meta":
        {
            "type": "solid",
            "color": '#00000000'
        }
    },
   
    tabbar_item_background_selected:
    {
        "type": "background",
        "meta":
        {
            "type": "solid",
            "color": "#331a1a1a",
                                    "shadow": { "isInset": false, "x": "1px", "y": "1px", "blur": "1px", "color": "#BF414141"}                                           
        }
    },
           
 
 
    tabbar_item_background_hover:
    {
        "type": "background",
        "meta":
        {
            "type": "solid",
            "color": "#331a1a1a",
                                    "shadow": { "isInset": false, "x": "1px", "y": "1px", "blur": "1px", "color": "#ff000000"}                                           
        }
    },
           
    tabbar_item_border_selected:
    {
        "type": "border",
        "meta":
        {
                                    "bottom":
                                    {
                                                "color": "#00000000",
                                                "width": "1px"
                                    },
                                    "right":
                                    {
                                                "color": "#00000000",
                                                "width": "1px"
                                    },
                                    "left":
                                    {
                                                "color": "#66000000",
                                                "width": "1px"
                                    },
                                    "top":
                                    {
                                                "color": "#66000000",
                                                "width": "1px"
                                    }                      
        }
    },
   
    tabbar_item_border_hover:
    {
        "type": "border",
        "meta":
        {
                                    "bottom":
                                    {
                                                "color": "#00000000",
                                                "width": "1px"
                                    },
                                    "right":
                                    {
                                                "color": "#00000000",
                                                "width": "1px"
                                    },
                                    "left":
                                    {
                                                "color": "#00000000",
                                                "width": "1px"
                                    },
                                    "top":
                                    {
                                                "color": "#00000000",
                                                "width": "1px"
                                    }          
        }
    },
           
    tabbar_item_title:
    {
        "type": "text",
        "meta":
        {
                            "color": "#FFf24197",
                                    "shadow": { "x": "1px", "y": "1px", "blur": "1px", "color": "#96000000"}
        }
    },
 
    tabbar_item_title_selected:
    {
        "type": "text",
        "meta":
        {
            "color": "#FFdedfdf", 
                                    "shadow": { "x": "1px", "y": "1px", "blur": "1px", "color": "#96000000"}
        }
    },
   
    tabbar_item_title_hover:
    {
        "type": "text",
        "meta":
        {
            "color": "#FFf24197",
                                    "shadow": { "x": "1px", "y": "1px", "blur": "1px", "color": "#96000000"}     
        }
    },
           
            /* ======================= */
            /* Button E (on content B) */
            /* ======================= */
           
            button_eb_background:
            {
                        "type": "background",
                        "meta":
                        {
                                    "type": "solid",
                                    "color": "#FFf24197"                                                          
                        }
    },
            button_eb_background_selected:
            {
                        "type": "background",
                        "meta":
                        {
                                    "type": "solid",
                                    "color": "#FFcd3780"
                        }
            },
 
            button_eb_background_disabled:
            {
                        "type": "background",
                        "meta":
                        {
                                    "type": "solid",
                                    "color": "#33333333"
                        }
            },
               
            button_eb_border:
            {
                        "type": "border",
                        "code": "buttonBorder",
                        "meta":
                        {
                        }
            },
 
            button_eb_border_selected:
            {
                        "type": "border",
                        "code": "buttonBorder",
                        "meta":
                        {
                        }
            },
           
            button_eb_title:
            {
                        "type": "text",
                        "meta":
                        {
                                    "color": "#ff00ff00"
                        }
            },
 
            button_eb_title_selected:
            {
                        "type": "text",
                        "meta":
                        {
                                    "color": "#FFFFFFFF"
                        }
            },
 
            button_eb_title_disabled:
            {
                        "type": "text",
                        "meta":
                        {
                                    "color": "#CCCCCCCC" 
                        }
            },
           
           _button_eb_icon:
            {
                        "type": "icon",
                        "code": "eb",
                        "meta":
                        {                                                                                  
                                    "type": "solid",
                                    "color": "#FF78204b",
                                    "isBlack": true
                        }
            }
 
           
};
 
 

/*jshint browser:true, jquery:true*/
/*global console*/
window.WebViewportSizeManager = (function() {
	var BODY_SCROLL_TOP = false;

	var me = {};
	var _lastResult = null;
	var _isIos = navigator.userAgent.match(/iPhone|iPod/i);

	var _bindEvents = function() {

		if (!window.addEventListener)
			return;

		window.addEventListener("orientationchange", function() {  me.hideUrlBar(); }, false);
		window.addEventListener("resize",			function() { me.hideUrlBar(); }, false);
	};

	/**
	 * this fucking awesome function calculates the proper BODY element height that all children should relate to.
	 * proper is :"takes up the entire viewport, including the space of the address bar"
	 *
	 * it forces window.height to be
	 * (full screen) instead of (fullscreen - address bar)
	 * 
	 * - is only relevant for iphones and ipods. 
	 * - supports retina/nonretina, 
	 * - supports iphone5 tall screen
	 * - supports ios6 safari landscape fullscreen mode
	 */
	me.getViewportHeight = function() {
		var screenHeight, statusbarHeight, bottomUtilBarHeight;
		var result = null;

		if (_isIos) {
			var portrait = ((window.orientation / 90) % 2 === 0);
			var docClientHeight = document.documentElement.clientHeight;
			var urlBarOpen = portrait ? 
					false : 
					(window.innerHeight == document.documentElement.clientHeight && window.innerHeight != window.screen.width);
					
			var fullscreenLandscape = !portrait && (docClientHeight == 320 || docClientHeight == 242 /*fullscreen with native ios6 smartbanner*/); //iphone 5 'fullscreen landscape' mode
			var nativeSmartBannerShown = !portrait && (docClientHeight == 366 || docClientHeight == 130 /*non-fullscreen without native ios6 smartbanner*/);

			//if the url bar was hidden, but then redesplayed by touch the status bar - we have no way to recognize that state and "force" ourselves to a smaller viewport.
			//the best guess is - if we already hid the urlbar once, than if its open - the user must have opened it.
			
			var urlBarHeight =	  (urlBarOpen) ? 60 : 0; /*url bar opened by tapping status bar*/
			statusbarHeight =	   fullscreenLandscape ? 0 : 20;
			bottomUtilBarHeight =   portrait ? 45 : (fullscreenLandscape ? 0 : 35);
			screenHeight =		  portrait ? window.screen.height : window.screen.width;
			result = screenHeight - statusbarHeight - bottomUtilBarHeight - urlBarHeight;

			 // console.log(printStackTrace());
			// console.log(['result', result, 'screenHeight', screenHeight, 'statusbarHeight', statusbarHeight, 
			// 			 'bottomUtilBarHeight', bottomUtilBarHeight, 'urlBarHeight', urlBarHeight, 'document.documentElement.clientHeight', document.documentElement.clientHeight])
		}

		if (result != _lastResult && typeof($) !== 'undefined') {
			$(window).trigger('webapp.viewport.resize');
		}

		return result;
	};

	me.hideUrlBar = function() {
		if (DEVICE == deviceTypeEnum.iphone) {
			_setTargetBodyHeight();

			var win = window;
			var jqmLoaded = typeof($) !== 'undefined' && $.event && $.event.special && $.event.special.scrollstart;

			// prevent scrollstart and scrollstop events
			if (jqmLoaded) $.event.special.scrollstart.enabled = false;

			if (BODY_SCROLL_TOP !== false) {
				win.scrollTo( 0, BODY_SCROLL_TOP === 1 ? 0 : 1 );
			}

			if (jqmLoaded) setTimeout(function() { $.event.special.scrollstart.enabled = true; }, 150);
		}
	};

	// So we don't redefine this function everytime we
	// we call hideUrlBar
	me.getScrollTop = function() {
		var win = window;
		var doc = document;

		return win.pageYOffset || doc.compatMode === 'CSS1Compat' && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
	};

	var _setTargetBodyHeight = function() {
		var targetHeight = me.getViewportHeight();
		//only if we have a good guess to what the body height should be
		if (targetHeight) {
			document.body.style.height =  targetHeight + 'px';
		}
		else {
			document.body.style["min-height"] = window.innerHeight + 'px';
		}
	};

	var _hideUrlBarOnLoad = function() {
		var win = window;
		var doc = win.document;
		var bodycheck;

		// If there's a hash, or addEventListener is undefined, stop here
		if ( win.addEventListener ) {
			// scroll to 1
			window.scrollTo( 0, 1 );
			BODY_SCROLL_TOP = 1;

			// reset to 0 on bodyready, if needed
			bodycheck = setInterval(function() {
				if ( doc.body ) {
					clearInterval( bodycheck );
					BODY_SCROLL_TOP = me.getScrollTop();
					me.hideUrlBar();
				}
			}, 15 );

			win.addEventListener('load', function() {			 
				setTimeout(function() {
					// at load, if user hasn't scrolled more than 20 or so...
					if (me.getScrollTop() < 20) {
						// reset to hide addr bar at onload
						me.hideUrlBar();
					}
				}, 0);
			});
		}
	};
	
	_bindEvents();
	_hideUrlBarOnLoad();
	return me;
}());

var FacebookPostsView_WP = ItemsView_WP.extend(
{
    initialize: function ()
    {
        ItemsView_WP.prototype.initialize.apply(this);
    },

    _onGetItemsSuccess: function (itemsData)
    {
        var modelItems = this.model.get('items');
        var items = modelItems.toJSON();
        var that = this;

        var feedsList = [];

        // Loop through feeds
        _.each(items, function (feedDetails, i)
        {
            var feedType = feedDetails['type'];
            /*
            * The title is the caption and if no exist get the name as title
            * the description is from description if no exist use the message
            */
            if ("link" === feedType ||
                "status" === feedType ||
                "photo" === feedType ||
                "video" === feedType)
            {
                var feedCaption = feedDetails['caption'];
                var feedName = feedDetails['name'];
                var description = (feedDetails['description'] || "") + (feedDetails['message'] || "");
                var image = feedDetails['picture'] || "";
                var time = parseInt(feedDetails['createdTime']) / 1000;
                var timeText = Utils.TimeDate.timeAsText(time);

                var title = feedDetails.fromName || '';
				var commentsNumber = feedDetails.items.commentsCount || 0;

                var feedParams =
			    {
			        'social': that._getShareInfoObject(modelItems.models[i]),
			        'image': image,
					'fromPicture': feedDetails.fromPicture || '',
			        'title': title,
					'commentsNumber': commentsNumber,
			        'timeText': timeText,
			        'url': feedDetails.link,
			        'id': '' + i,
			        'description': description
			    };

                feedsList.push(feedParams);
            }
        });

        var data = { 'layoutType': 'FacebookFeedItemTemplate',
            'layoutNumber': '0',
            'tabIndex': that.model.get('tabIndex'),
            'feedsList': feedsList,
            'likes': Utils.String.desanitize(localization.formatNumber(that.model.get('likesCount'))),
			'category': that.model.get('category'),
            'name': that.model.get('title'),
            'picture': that.model.get('picture')
        };

        ComNative.sendMessage('PageCommand;' + this.model.get('pageId') + ';renderFeeds;' + JSON.stringify(data));
    }
});


var ReviewsTemplateView_WP = TemplateView_WP.extend(
{
	_getTabs: function(meta)
	{
		return meta.items;
	},

    render: function (index)
    {
        var meta = this.model.get('meta');

        var providerModel = new ProviderModel(meta.items[index]);
		providerModel.set({tabIndex:index, pageId: this.model.get('id')});
		var providerView = new ProviderView_WP({model: providerModel});
		providerModel.getItems(executeTypeEnum.HIT_AND_RUN);
    }
});


var ProviderView_WP = ItemsView_WP.extend(
{
    initialize: function ()
    {
        ItemsView_WP.prototype.initialize.apply(this);
    },

    _onGetItemsSuccess: function (itemsData)
    {
        var modelItems = this.model.get('items');
        var items = modelItems.toJSON();
        var that = this;

		var reviewsCount = itemsData.totalItems || 0;
		var formatteReviewsCount = localization.formatNumber(reviewsCount);

		var providerName = itemsData.providerName;
		var reviewsString = _T("HtmlTextReviewsReviewsCount",
		{
			number: formatteReviewsCount,
			provider: providerName 
		});

		itemsData.reviewsText = reviewsString;
		itemsData.title = this.model.get('title');
		itemsData.type = this.model.get('params').type;
		itemsData.imageUrl = this.model.get('image');

		_.each(itemsData.items, function(reviewer, i)
		{
			reviewer.timeAgo = Utils.TimeDate.timeAsText(reviewer.time);
			reviewer.type = itemsData.type;
			reviewer.description = Utils.String.sanitizeText(reviewer.description);
		});

        var data = { 'layoutType': 'ReviewsTemplate',
            'layoutNumber': '0',
            'tabIndex': that.model.get('tabIndex'),
            'item': itemsData
        };

        ComNative.sendMessage('PageCommand;' + this.model.get('pageId') + ';renderFeeds;' + JSON.stringify(data));
    }
});



/**
 * The web-module for native app: use the "navigator.webModule" to show the url
 * NOTE: in native, the link is button - so we never get here for link template 

 */
var WebModuleView = Backbone.View.extend({
	attributes:
	{
		'data-role': 'page',
        'data-buttons': 'home'
	}
	
	,initialize: function ()
	{
		this.$el.bind('pageshow', this._onPageShow.hitch(this));
        this.$el.bind('pagehide', this._onPageHide.hitch(this));
	}
	
	,render: function ()
	{
                                         // NOTE: We need Scrolling.init in case of tabs navigation, and this as 1st
                                         // page: without Scrolling.init noone will set the "min height" of app_pages_container
                                         this.$el.html('<div class="scroll_wrapper"><div class="scroller"></div></div>');
                                         var $scrollWrapper = this.$('.scroll_wrapper');
                                         Scrolling.init($scrollWrapper);

                                         return this;
	}
	
	,_onPageShow: function ()
	{
		if (this.inProccess)
		{
			return;
		}
		this.inProccess = true;
 		if (navigator && navigator.webModule)
		{
			navigator.webModule.openModule(this._commandCb.hitch(this), this.model.get('link'));
		}
	}
    ,_onPageHide: function ()
    {
    	this.inProccess = false;
        if (navigator && navigator.webModule)
        {
            navigator.webModule.hideModule();
        }
    }
	
	,_commandCb: function (cmd) 
	{
        console.log(JSON.stringify(cmd));
		switch(cmd.type) {

			case this.COMMAND_TYPES.ADD_BACK:
				this._addBackButton();
			break;
			case this.COMMAND_TYPES.REMOVE_BACK:
				conduitApi.app.removeBackButton();
			break;
		}
	}

	,_addBackButton: function ()
	{
		function cbHandle()
		{
			navigator.webModule.goBack();
		}
		conduitApi.app.addBackButton(null, null, null, false, cbHandle);
	}
});

WebModuleView.prototype.COMMAND_TYPES = {
	ADD_BACK: 0
	,REMOVE_BACK: 1
};

/**
 * View that shows the messages-list of the chat-page
 * 
 * @author Matanya
 */
ChatListView = Backbone.View.extend(
{
	className: 'chat_list'
	
	,initialize: function () 
	{
		var itemsCollection = this.model.get('items');
		
		if (itemsCollection) 
		{
			itemsCollection.bind('getItemsSuccess', this._onGetItemsSuccess, this);
			itemsCollection.bind('getNextItems', this._renderShowMoreButton, this);
			itemsCollection.bind('getItemsFail', this.onGetDataFail, this);
			itemsCollection.bind('add', this._renderOneItem, this);
			//itemsCollection.bind('singleAdd', this._refreshScroll, this);
			itemsCollection.bind('reset', this._reset, this);
			// bind to the end of file change.
			// We need this for hide the "show more" in case of "invalid" 
			itemsCollection.bind('eof', this._renderShowMoreButton, this);
		}
	}

	,render: function()
	{
		this.$el.html(chatTemplates.chatList());
		this.$itemsList = this.$('.messages_list');

		this._reset();
		this._renderItems();
		this._renderShowMoreButton();

		return this;
	}
	
	/**
     * Reset the items list (clear it).
     * 
     * @author Matanya
     */
    ,_reset: function ()
    {
        this.$itemsList.html('');
    }
	
    /**
     * Render one item.
     * 
     * @param item the item's model.
     * 
     * @author Matanya
     */
    ,_renderOneItem: function (item, collection, options)
    {
        var itemView = this.createItemView(item);

        // if the message is a new message (from me or from another user) - add it at the bottom.
        // else (on refresh or show more) - add it at the top
        if (options && options.isNew)
        {
        	this.$itemsList.append(itemView.render().el);
        }
        else
        {
        	this.$itemsList.prepend(itemView.render().el);
        }
    }

    /**
     * Create an item view with the given model.
     * 
     * @param itemModel - the model of the item to crate the view for.
     * 
     * @return the view of the item.
     *          
     * @author Matanya
     */
    ,createItemView: function (itemModel) {
    	if(itemModel.get('isMe'))
    	{
    		var view = new MyChatMessageView({model: itemModel});
    	}
    	else
    	{
    		var view = new UserChatMessageView({model: itemModel});
    	}
    	
    	return view;
    }
    
	/**
	 * Render all the items in the list one by one.
	 *
	 * @author Matanya
	 */
	,_renderItems: function()
	{
		var itemsCollection = this.model.get('items');
		if (itemsCollection) 
		{
			itemsCollection.each(this._renderOneItem.hitch(this));
		}
	}

	
	,handleRefreshClick: function()
	{
		if (this.model.get('discussionId'))
		{
			this.refreshing = true;
			cqm.showLoading(_T('HtmlTextPaginationRefreshItems'), true);
			this.model.getItems(executeTypeEnum.FORCE_NETWORK);
		}
	}
	
	,handleSilentRefresh: function()
	{
		if (this.model.get('discussionId'))
		{
			if (this.model.isExpiredCache()) 
			{
				this.model.getItems(executeTypeEnum.FORCE_NETWORK);
			}
		}
	}
	
	/**
	 * Handle the items get success.
	 *
	 * @author Yoel Gluschnaider
	 */
	,_onGetItemsSuccess: function(metaData, parseResult, requestId)
	{
		if (this.refreshing) 
		{
			this.refreshing = false;
			cqm.hideLoading();
		}
		this._renderShowMoreButton();
		
		this._refreshScroll();
//
//		var itemsCollection = this.model.get('items');
//
//		if (itemsCollection && _.isEmpty(itemsCollection.models)) {
//			this.onNoResults();
//		}
	}

	/**
	 * refresh the scroll after content changed
	 */
	,_refreshScroll: function()
	{
		this.$myScrollWrapper = this.$myScrollWrapper || Scrolling.getMyScrollerWrapper(this.$el);
		Scrolling.onContentChanged(this.$myScrollWrapper);
	}

	/**
	 * Render the show more button.
	 * @author Yoel Gluschnaider
	 */
	,_renderShowMoreButton: function()
	{
//		var $rootView = this.getRootView();
//		if (!$rootView) 
//		{
//			return;
//		}
//		if (!this.$showMoreButton) 
//		{
//			this.$showMoreButton = $(commonTemplates.showMoreButton(this.options));
//			this.$getMoreButton = this.$showMoreButton.find('.button_text');
//			this.$getMoreLoading = this.$showMoreButton.find('.loading_text');
//			$rootView.append(this.$showMoreButton);
//		}
//		
//		var itemsCollection = this.model.get('items');
//		
//		// if eof or no items collection or during "refresh", don't show the button.
//		if (!itemsCollection || itemsCollection.EOF || itemsCollection.isRefreshLoading) 
//		{
//			this.$showMoreButton.hide();
//		}
//		else 
//		{
//			// show the relevant condition of the button according to the state of the collection.
//			if (itemsCollection.isLoading) 
//			{
//				this.$getMoreButton.hide();
//				this.$getMoreLoading.show();
//				this.$showMoreButton.removeClass('read_more_button');
//			}
//			else 
//			{
//				this.$getMoreLoading.hide();
//				this.$getMoreButton.show();
//				this.$showMoreButton.addClass('read_more_button');
//			}
//			this.$showMoreButton.show();
//		}
	}
	
	
	/**
	 * Handle the failure dialog retry button click.
	 * Retry to get the next posts.
	 */
	,_cbRetry: function()
	{
		this.model.getItems(executeTypeEnum.HIT_AND_RUN);
	}
	
	/**
	 * Handle the failure dialog cancel button click.
	 * Set the EOF to true (avoid showing the "show more" button).
	 */
	,_cbCancel: function()
	{
		this.model.set(
		{
			eof: true
		});
	}
	
	/**
	 * Upon failure, show a toast or a dialog depending if it is the first data chunk or not.
	 * 
	 * NOTE: Descendants can override this function to avoid the dialog, etc.
	 *
	 * @param {executeTypeEnum} executeType - the execute type that was used for the service.
	 * @author Yoel Gluschnaider
	 */
	,onGetDataFail: function(executeType, serviceNotExecuted)
	{
		
		cqm.hideLoading();
		// don't show errors in simulator.
		if (PLATFORM != platformEnum.simulator) 
		{
			// if is the first call to get data, show a dialog box.
			if (executeType === executeTypeEnum.HIT_AND_RUN) 
			{
				var dlgOptions = 
				{
					title: _T('DialogCaptionError'),
					message: this.options.failStr,
					buttons: [
					{
						text: _T('ButtonRetry'),
						cb: this._cbRetry.hitch(this)
					}, 
					{
						text: _T('ButtonCancel'),
						cb: this._cbCancel.hitch(this)
					}]
				};
				conduitApi.UI.showDialogBox(null, null, dlgOptions);
				
			}
			// not the first call (in pagination) show toast.
			else 
			{
				conduitApi.UI.showToastMessage(null, null, this.options.failStr);
				// Cancel the loading
				this._cbCancel();
			}
		}
		// Show toast only if fail after executing the service.
		else 
			if (!serviceNotExecuted) 
			{
				// Show toast message in simulator
				conduitApi.UI.showToastMessage(null, null, this.options.failStr);
				
				// Cancel the loading (remove the loading item)
				this._cbCancel();
			}
	}
	
	/**
	 * Handle click of the show more button.
	 *
	 * @author Yoel Gluschnaider
	 */
	,_onShowMoreTap: function(e)
	{
		e.preventDefault();
		this.model.getItems(executeTypeEnum.HIT_AND_RUN_SILENT);
	}
	
	,onSendMessage: function (msg)
	{
		this.model.sendMessage(null, null, msg);
	}

	
});


/**
 * @author Yoel Gluschnaider
 */
conduitApi.__BCAPI = (function ()
{
	var me = {};
	
	/**
	 * Style change event handler.
	 * @param {Object} eventName - the event name.
	 * @param {Object} data - the event data.
	 */
	function styleChangeEventHandler(eventName, data) 
	{
		comUtils.addCssStyle(data.newStyle);
	}
	
	me.init = function (cbSuccess, cbFail) 
	{
		// initialize this slave.
		comSlave.init(function (slaveId) 
		{
			function innerCbSuccess(supportedObj, styleTheme, platform, pageState) 
			{
				conduitApi.__BCAPI.supportedObj = supportedObj;
				
				// set the style.
				comUtils.addCssStyle(styleTheme);
				
				// register on style change event.
				eventsHandler.registerOnEvent('styleChange', styleChangeEventHandler);
				
				// set the audio driver according to the platform type.
				// We put this here since we cannot start the audio implementation
				// statically cause it depends on the platform we are running on.
				
				//TODO: TEMP!!! until we will support audio nativeApp. 
				if (false && (platform === platformEnum.nativeApp)) // native
				{
					conduitApi.__BCAPI.platform.audio = new NativeAudioDriver(); 
				}
				else // web or simulator.
				{
					conduitApi.__BCAPI.platform.audio = new WebAudioDriver(); 
				}
				
				if (typeof(cbSuccess) == 'function') 
				{
					cbSuccess(pageState);
				}
			}
			rpcSender.invoke('conduitApi.init', innerCbSuccess, cbFail);
		});
	};
	
	return me;
})();

conduitApi.__BCAPI.platform = 
{
	/**
	 * Check if the UI API is supported.
	 * 
	 * @return {boolean} true if it is supported and false otherwise.
	 */
	isSupported: function () 
	{
		return conduitApi.__BCAPI.supportedObj.platform.isSupported;
	},
	
	media:
	{
		isSupported: function () 
		{
			return true;
		},
		
		init: function()
		{
			rpcSender.invoke('conduitApi.platform.media.init');
		},
		
		setTracks: function(cbSuccess, tracks)
		{
			rpcSender.invoke('conduitApi.platform.media.setTracks', cbSuccess, null, tracks);
		},
		
		play: function(index)
		{
			rpcSender.invoke('conduitApi.platform.media.play', null, null, index);
		}
	},
	
	video:
	{
		isSupported: function () 
		{
			return true;
		},
		
		play: function(url, videoType)
		{
			rpcSender.invoke('conduitApi.platform.video.play', null, null, url, videoType);
		}
	},
	
	/**
	 * Acceleromater API.
	 */
	accelerometer: 
	{
		/**
		 * Check if the accelerometer API is supported.
		 * 
		 * @return {boolean} true if it is supported and false otherwise.
		 */
		isSupported: function () 
		{
			return conduitApi.__BCAPI.supportedObj.platform.accelerometer.isSupported;
		},
		
		/**
	     * Get the last acceleration data
		 * 
		 * @param {Object} cbSuccess - callback function that provides the Acceleration information.
		 * 							Signature: function cbSuccess(accelerationData)
		 * @param {Object} cbFail - callback function in case the API callback failed.
		 * 							Signature: function cbFail()
		 * 
		 * @author Yoel Gluschnaider
		 */
		getLastAcceleration: function (cbSuccess, cbFail) 
		{
			rpcSender.invoke('conduitApi.platform.accelerometer.getLastAcceleration', cbSuccess, cbFail);
		},

		 /**
	     * Start acceleration
	     * @param {function} cbSuccess - Function to be called upon success
	     * 		signature: function cbSuccess(accelerationHandler, accelerationData)
	     * 					accelerationHandler - to be used in stopAcceleration.
	     * 					accelerationData - contains:
	     * 							x: Amount of motion on the x-axis. Range [0, 1] (Number)
	     * 							y: Amount of motion on the y-axis. Range [0, 1] (Number)
	     * 							z: Amount of motion on the z-axis. Range [0, 1] (Number)
	     * 							timestamp: Creation timestamp in milliseconds. (DOMTimeStamp)
	     *  
		 * @param {Object} cbFail - callback function in case the API callback failed.
		 * 							Signature: function cbFail()
		 * 
	     * @param {function} options - Options for the acceleration
	     *                  Currently support:
	     *                      frequency - interval of the cbSuccess to be called
		 *
		 * @author Yoel Gluschnaider
	     */
		startAcceleration: function (cbSuccess, cbFail, options) 
		{
			rpcSender.invoke('conduitApi.platform.accelerometer.startAcceleration', cbSuccess, cbFail, options);
		},
		
		/**
	     * Stop the acceleration tracking
	     * @param {function} cbSuccess - Function to be called upon success
	     * 		signature: function cbSuccess()
		 * @param {Object} cbFail - callback function in case the API callback failed.
		 * 							Signature: function cbFail()
	     * @param {object} accelerationHandle - Acceleration object to stop tracking
		 *
		 * @author Yoel Gluschnaider
	     */
		stopAcceleration: function (cbSuccess, cbFail, accelerationHandle) 
		{
			rpcSender.invoke('conduitApi.platform.accelerometer.stopAcceleration', cbSuccess, cbFail, accelerationHandle);
		}
	},

	/**
	 * Camera API.
	 */
	camera: 
	{
		/**
		 * Check if the camera API is supported.
		 * 
		 * @return {boolean} - true if it is supported and false otherwise.
		 */
		isSupported: function () 
		{
			return conduitApi.__BCAPI.supportedObj.platform.camera.isSupported;
		},

		/**
	     * Take a picture
	     * 
	     * @param cbSuccess - Function to be called upon success
	     * 		Signature: function cbSuccess(imageData)
	     * 						The imageData is Base64 encoding of the image data, 
	     * 						or the image file URI, depending on options used.
		 * @param {Object} cbFail - callback function in case the API callback failed.
		 * 							Signature: function cbFail()
	     * @param options - Options for the camera to capture an image
	     *                  Currently support:
	     *                      quality: Quality of saved image. Range is [0, 100].
	     *                      destinationType: Choose the format of the return value. Defined in conduitApi.camera.DestinationType (Number)		     *                      
	     *                      sourceType: Set the source of the picture. Defined in conduitApi.camera.PictureSourceType (Number)
	     *                      allowEdit: Allow simple editing of image before selection. (Boolean)
	     *
		 * @author Yoel Gluschnaider
	     */
		captureImage: function(cbSuccess, cbFail, options) 
		{
			rpcSender.invoke('conduitApi.platform.camera.captureImage', cbSuccess, cbFail, options);
		}
	},

	/**
	 * Device Information API.
	 */
	deviceInfo: 
	{
		/**
		 * Check if the Device Information API is supported.
		 * @return {boolean} true if it is supported and false otherwise.
		 * 
		 * @author Yoel Gluschnaider
		 */
		isSupported: function () 
		{
			return conduitApi.__BCAPI.supportedObj.platform.deviceInfo.isSupported;
		},
		
		/**
		 * Get device information
		 * 
	     * @param {function} cbSuccess - Function to be called upon success
	     * 		signature: function cbSuccess(deviceInfoObj)
	     * 					deviceInfoObj - contains:
	     * 							platform: device's operating system name (e.g. Android)
	     * 							version: operating system version (e.g. 2.1 in case of Android).
	     * 							uuid: device's Universally Unique Identifier
	     * 							language: ISO 639-1 language code (e.g. 'en' for English).
	     *  
		 * @param {Object} cbFail - callback function in case the API callback failed.
		 * 							Signature: function cbFail()
		 * 
		 * @author Yoel Gluschnaider
		 */
		getDeviceInfo : function (cbSuccess, cbFail) 
		{
			rpcSender.invoke('conduitApi.platform.deviceInfo.getDeviceInfo', cbSuccess, cbFail);
		}
	},

	/**
	 * Geo Location API.
	 */
	geo: 
	{
		/**
		 * Check if the Geo Location API is supported.
		 * @return {boolean} true if it is supported and false otherwise.
		 */
		isSupported: function () 
		{
			return conduitApi.__BCAPI.supportedObj.platform.geo.isSupported;
		},
		
		/**
	     * Asynchronously aquires the current position.
		 *
	     * @param cbSuccess - Function to be called upon success
	     * 					  Signature: cbSuccess(position).
	     * 					  Param position contains:
	     * 						coords: A set of geographic coordinates
	     * 							latitude: Latitude in decimal degrees. (Number)
	     * 							longitude: Longitude in decimal degrees. (Number)
	     * 							altitude: Height of the position in meters above the ellipsoid. (Number)
	     * 							accuracy: Accuracy level of the latitude and longitude coordinates in meters. (Number)
	     * 							altitudeAccuracy: Accuracy level of the altitude coordinate in meters. (Number)
	     * 							heading: Direction of travel, specified in degrees counting clockwise relative to the true north. (Number)
	     * 							speed: Current ground speed of the device, specified in meters per second. (Number)
	     * 						timestamp: Creation timestamp for coords in milliseconds. (DOMTimeStamp)
	     * 
		 * @param {Object} cbFail - callback function in case the API callback failed.
		 * 							Signature: function cbFail(error)
		 * 								Error: The error returned by the device - 
		 * 									code: One of the predefined error codes listed below:
		 * 										Error.PERMISSION_DENIED
		 * 										Error.POSITION_UNAVAILABLE
		 * 										Error.TIMEOUT
		 * 									message: Error message describing the details of the error encountered.
	     * @param options - Optional parameters to customize the retrieval of the geolocation.
	     * 					{ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
	     *                  The supported options are:
	     *                      frequency: How often to retrieve the position in milliseconds. This option is not part of the W3C spec and will be removed in the future. maximumAge should be used instead. (Number) (Default: 10000)
	     *                      enableHighAccuracy: Provides a hint that the application would like to receive the best possible results. (Boolean)
	     *                      timeout: The maximum length of time (msec) that is allowed to pass from the call to geolocation.getCurrentPosition or geolocation.watchPosition until the corresponding geolocationSuccess callback is invoked. (Number)
	     *                      maximumAge: Accept a cached position whose age is no greater than the specified time in milliseconds. (Number)
	     *                      
	     *                  Android Quirks
	     *                  The Android 2.x simulators will not return a geolocation result unless the enableHighAccuracy option is set to true.
	     *                  { enableHighAccuracy: true }
		 * 
		 * @author Yoel Gluschnaider
	     */
    	getLocation: function(cbSuccess, cbFail, options) 
		{
			rpcSender.invoke('conduitApi.platform.geo.getLocation', cbSuccess, cbFail, options);
		},
		
		/**
		 * Watches for changes to the device's current position.
	     * @param {function} cbSuccess - Function to be called upon success
	     * 		signature: function cbSuccess(geoHandler, position)
	     * 					geoHandle - to be used in stopGeoLocation.
	     * 					position - contains:
	     * 							coords: A set of geographic coordinates:
	     * 								latitude: Latitude in decimal degrees. (Number)
	     * 								longitude: Longitude in decimal degrees. (Number)
	     * 								altitude: Height of the position in meters above the ellipsoid. (Number)
	     * 								accuracy: Accuracy level of the latitude and longitude coordinates in meters. (Number)
	     *								altitudeAccuracy: Accuracy level of the altitude coordinate in meters. (Number)
	     * 								heading: Direction of travel, specified in degrees counting clockwise relative to the true north. (Number)
	     * 								speed: Current ground speed of the device, specified in meters per second. (Number)
	     * 								
	     * 							timestamp: Creation timestamp for coords in milliseconds. (DOMTimeStamp)  
		 * @param {Object} cbFail - callback function in case the API callback failed.
		 * 							Signature: function cbFail(error)
		 * 								Error: The error returned by the device - 
		 * 									code: One of the predefined error codes listed below:
		 * 										Error.PERMISSION_DENIED
		 * 										Error.POSITION_UNAVAILABLE
		 * 										Error.TIMEOUT
		 * 									message: Error message describing the details of the error encountered.
		 * 
	     * @param options - Optional parameters to customize the retrieval of the geolocation.
	     * 					{ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
	     *                  The supported options are:
	     *                      frequency: How often to retrieve the position in milliseconds. This option is not part of the W3C spec and will be removed in the future. maximumAge should be used instead. (Number) (Default: 10000)
	     *                      enableHighAccuracy: Provides a hint that the application would like to receive the best possible results. (Boolean)
	     *                      timeout: The maximum length of time (msec) that is allowed to pass from the call to geolocation.getCurrentPosition or geolocation.watchPosition until the corresponding geolocationSuccess callback is invoked. (Number)
	     *                      maximumAge: Accept a cached position whose age is no greater than the specified time in milliseconds. (Number)
	     *                      
	     *                  Android Quirks
	     *                  The Android 2.x simulators will not return a geolocation result unless the enableHighAccuracy option is set to true.
	     *                  { enableHighAccuracy: true }
		 */
		startGeoLocation : function (cbSuccess, cbFail, options) 
		{
			rpcSender.invoke('conduitApi.platform.geo.startGeoLocation', cbSuccess, cbFail, options);
		},

		/**
	     * @param {function} cbSuccess - Function to be called upon success
	     * 		signature: function cbSuccess()
		 * @param {Object} cbFail - callback function in case the API callback failed.
		 * 							Signature: function cbFail()
		 * @param {Object} geoHandle - retrieved from the startGeoLocation function
		 */
		stopGeoLocation : function (cbSuccess, cbFail, geoHandle) 
		{
			rpcSender.invoke('conduitApi.platform.geo.stopGeoLocation', cbSuccess, cbFail, geoHandle);
		}
	},

	/**
	 * Network API.
	 */
	network: 
	{
		/**
		 * Check if the Network API is supported.
		 * @return {boolean} true if it is supported and false otherwise.
		 */
		isSupported: function () 
		{
			return conduitApi.__BCAPI.supportedObj.platform.network.isSupported;
		},
		
		/**
	     * Send http request
	     * @param cbSuccess - Function to be called upon success
	     * 			Signature: cbSuccess(data, requestMetaData)
	     * 					data - The data returned from the server, formatted according to the 'dataType' parameter.
	     * 					requestMetaData - same as the requestMetaData parameter.
		 * @param {function} cbFail - callback function in case the API callback failed.
		 * 							Signature: function cbFail(requestMetaData)
	     * @param sMethod - Method of request: GET, PUT. default is GET
	     * @param sUrl - Request URL
	     * @param sParams - Request body (for PUT)
	     * @param bAsync - Make asynchronous request
	     * @param sDataType - Type of response data. default is JSON
	     * @param sUser - User name for authenticated request
	     * @param sPassword - Password for authenticated request
	     * @param requestMetaData - Data to be passed back to callbacks
	     *
		 * @author Yoel Gluschnaider
	     */
		crossDomainHttpRequest: function (cbSuccess, cbFail, sMethod, sUrl, sParams, bAsync, sDataType, sUser, sPassword, requestMetaData) 
		{
			rpcSender.invoke('conduitApi.platform.network.crossDomainHttpRequest', cbSuccess, cbFail, sMethod, sUrl, sParams, bAsync, sDataType, sUser, sPassword, requestMetaData);
		}
	},

	/**
	 * Screen Orientation API.
	 */
	orientation: 
	{
		/**
		 * Check if the Screen Orientation API is supported.
		 * @return {boolean} true if it is supported and false otherwise.
		 */
		isSupported: function () 
		{
			return conduitApi.__BCAPI.supportedObj.platform.orientation.isSupported;
		},
		
		/**
	     * Get the current orientation
	     * @param cbSuccess - Function to be called upon success
	     * 					  Signature: cbSuccess(curOrientation).
	     * 					  Param position contains:
	     * 						curOrientation: signed integer of device orientation 
	     * 										degree from base can be: 0, 90, 180, -90
	     * 
		 * @param {Object} cbFail - callback function in case the API callback failed.
		 * 							Signature: function cbFail()
		 *
		 * @author Yoel Gluschnaider
	     */ 
	    
		getOrientation: function (cbSuccess, cbFail) 
		{
			rpcSender.invoke('conduitApi.platform.orientation.getOrientation', cbSuccess, cbFail);
		},
		
		/**
	     * Lock device on the orientation
	 	 *
	     * @param cbSuccess - Function to be called upon success
	     * 					  Signature: function cbSuccess();
		 * @param {Object} cbFail - callback function in case the API callback failed.
		 * 							Signature: function cbFail()
		 * @param degree - signed integer of device orientation degree from base
		 *				  can be: 0, 90, 180, -90
		 *
		 * @author Yoel Gluschnaider
	     */ 
		lockOrientation: function (cbSuccess, cbFail, degree) 
		{
			rpcSender.invoke('conduitApi.platform.orientation.lockOrientation', cbSuccess, cbFail, degree);
		},
		
		/**
	     * Unlock device on the orientation
	     * @param cbSuccess - Function to be called upon success
	     * 					  Signature: function cbSuccess();
		 * @param {Object} cbFail - callback function in case the API callback failed.
		 * 							Signature: function cbFail()
	 	 *
		 * @author Yoel Gluschnaider
		 */ 
		unlockOrientation: function (cbSuccess, cbFail) 
		{
			rpcSender.invoke('conduitApi.platform.orientation.unlockOrientation', cbSuccess, cbFail);
		},

		/**
	     * Register event handler for orientation changed
		 *
	     * @param cbSuccess - Orientation change event handler
	     * 							Signature: cbOrientationChanged(degrees)
	     * 								degrees: 0, 90, 180 or -90.
		 * @param {Object} cbFail - callback function in case the API callback failed.
		 * 							Signature: function cbFail()
		 *
		 * @author Yoel Gluschnaider
	     */
	    startOrientation: function (cbSuccess, cbFail) 
		{
			rpcSender.invoke('conduitApi.platform.orientation.startOrientation', cbSuccess, cbFail);
		},
		
		/**
	     * Unregister orientation changed event
		 * 
	     * @param cbSuccess - Function to be called upon success
	     * 					  Signature: function cbSuccess();
		 * @param {Object} cbFail - callback function in case the API callback failed.
		 * 							Signature: function cbFail()
		 */
		stopOrientation: function (cbSuccess, cbFail) 
		{
			rpcSender.invoke('conduitApi.platform.orientation.stopOrientation', cbSuccess, cbFail);
		}
	},

	/**
	 * Local Storage API.
	 */
	storage: 
	{
		/**
		 * Check if the accelerometer API is supported.
		 * @return {boolean} true if it is supported and false otherwise.
		 */
		isSupported: function () 
		{
			return conduitApi.__BCAPI.supportedObj.platform.storage.isSupported;
		},

	    /**
	     * Save a value for a key under an identifier
	     * @param {Function} cbSuccess - Function to be called upon success
	     * 					  		Signature: function cbSuccess();
		 * @param {Function} cbFail - callback function in case the API callback failed.
		 * 							Signature: function cbFail()
	     * @param key - Key name
	     * @param value - Value for the key
	     * 
	     * @return true if succeeded and false otherwise.
		 * @author Yoel Gluschnaider
	     */
		setItem: function (cbSuccess, cbFail, key, value, saveGlobal) 
		{
			rpcSender.invoke('conduitApi.platform.storage.setItem', cbSuccess, cbFail, key, value, saveGlobal);
		},
		
	    /**
	     * Get value for a key under an identifier
	     * 
	     * @param key - Key name
	     * @param {Function} cbSuccess - Function to be called upon success
	     * 					  		Signature: function cbSuccess(value);
		 * @param {Function} cbFail - callback function in case the API callback failed.
		 * 							Signature: function cbFail()
	     * @return {object} the value or null if none exists.
	     *
		 * @author Yoel Gluschnaider
	     */
		getItem: function (cbSuccess, cbFail, key, loadGlobal)
		{
			rpcSender.invoke('conduitApi.platform.storage.getItem', cbSuccess, cbFail, key, loadGlobal);
		},
		
	    /**
	     * Remove a key under an identifier
	     * @param {Function} cbSuccess - Function to be called upon success
	     * 					  		Signature: function cbSuccess();
		 * @param {Function} cbFail - callback function in case the API callback failed.
		 * 							Signature: function cbFail()
	     * @param key - Key name
	     * @return true if succeeded and false otherwise.
	     *
		 * @author Yoel Gluschnaider
	     */
		removeItem: function (cbSuccess, cbFail, key, removeGlobal) 
		{
			rpcSender.invoke('conduitApi.platform.storage.removeItem', cbSuccess, cbFail, key, removeGlobal);
		},
		
	    /**
	     * Clear the whole storage for an identifier
	     * @param {Function} cbSuccess - Function to be called upon success
	     * 					  		Signature: function cbSuccess();
		 * @param {Function} cbFail - callback function in case the API callback failed.
		 * 							Signature: function cbFail()
	     * @return true if succeeded and false otherwise.
	     *
		 * @author Yoel Gluschnaider
	     */
		clearStorage: function (cbSuccess, cbFail) 
		{
			rpcSender.invoke('conduitApi.platform.storage.clearStorage', cbSuccess, cbFail);
		}
	},

	/**
	 * Vibration API.
	 */
	vibrate: 
	{
		/**
		 * Check if the Vibration API is supported.
		 * @return {boolean} true if it is supported and false otherwise.
		 */
		isSupported: function () 
		{
			return conduitApi.__BCAPI.supportedObj.platform.vibrate.isSupported;
		},

	    /**
	     * Vibrate device for a specific time
		 *
	     * @param {Function} cbSuccess - Function to be called upon success
	     * 					  		Signature: function cbSuccess();
		 * @param {Function} cbFail - callback function in case the API callback failed.
		 * 							Signature: function cbFail()
		 * @param nTime - Time in miliseconds for the vibration
		 *					nTime range from 0 to 10000. default is 10
	     *
		 * @author Yoel Gluschnaider
	     */
		vibrateForTime: function (cbSuccess, cbFail, nTime) 
		{
			rpcSender.invoke('conduitApi.platform.vibrate.vibrateForTime', cbSuccess, cbFail, nTime);
		}
	}
};
	
conduitApi.__BCAPI.analytics =
{
	/**
	 * Check if the analytics API is supported.
	 * 
	 * @return {boolean} true if it is supported and false otherwise.
	 */
	isSupported: function () 
	{
		return conduitApi.__BCAPI.supportedObj.analytics.isSupported;
	},
	
	/**
	 * 
     * Add event to analytics stack
	 *
     * @param cbSuccess - Function to be called upon success
     * 					  Signature: function cbSuccess();
	 * @param cbFail - callback function in case the API callback failed.
	 *					  Signature: function cbFail()
     * @param type - Type of events from usageEventTypeEnum
     * @param meta - The event's meta data
     * @param sendNow - boolean telling the usages manager to send the events now or not.
     * 
	 * @author Moshe Darzi
	 */
	addEvent: function (cbSuccess, cbFail, type, meta, sendNow) 
	{
		rpcSender.invoke('conduitApi.analytics.addEvent', cbSuccess, cbFail, type, meta, sendNow);
	}
};
	
conduitApi.__BCAPI.log = 
{
	/**
	 * Check if the log API is supported.
	 * 
	 * @return {boolean} true if it is supported and false otherwise.
	 */
	isSupported: function () 
	{
		return conduitApi.__BCAPI.supportedObj.log.isSupported;
	},
	
	/**
	 * Write a log message to the native logger.
	 * Verbosity - Info (if supported).
	 * 
     * @param cbSuccess - Function to be called upon success
     * 					  Signature: function cbSuccess();
	 * @param cbFail - callback function in case the API callback failed.
	 *					  Signature: function cbFail()
	 * @param {Object} message the log message.
	 */
	info: function (cbSuccess, cbFail, message) 
	{
		rpcSender.invoke('conduitApi.log.info', cbSuccess, cbFail, message);
	},
	
	/**
	 * Write a log message to the native logger.
	 * Verbosity - warning (if supported).
     * @param cbSuccess - Function to be called upon success
     * 					  Signature: function cbSuccess();
	 * @param cbFail - callback function in case the API callback failed.
	 *					  Signature: function cbFail()
	 * @param {Object} message the log message.
	 */
	warning: function (cbSuccess, cbFail, message) 
	{
		rpcSender.invoke('conduitApi.log.warning', cbSuccess, cbFail, message);
	},
	
	/**
	 * Write a log message to the native logger.
	 * Verbosity - error (if supported).
     * @param cbSuccess - Function to be called upon success
     * 					  Signature: function cbSuccess();
	 * @param cbFail - callback function in case the API callback failed.
	 *					  Signature: function cbFail()
	 * @param {Object} message the log message.
	 */
	error: function (cbSuccess, cbFail, message) 
	{
		rpcSender.invoke('conduitApi.log.error', cbSuccess, cbFail, message);
	}
};

conduitApi.__BCAPI.app = (function () 
{
	var me = {};
	
	// Handles for url change and link closed events.
	var _urlChnagedEventHandle = null;
	var _linkClosedEventHandle = null;
		
	/**
	 * Check if the app API is supported.
	 * 
	 * @return {boolean} true if it is supported and false otherwise.
	 */
	me.isSupported = function () 
	{
		return conduitApi.__BCAPI.supportedObj.app.isSupported;
	};
	
	/**
	 * Hide info bar.
	 * 
	 * @param cbSuccess - Function to be called upon success
	 * 					  Signature: function cbSuccess();
	 * @param cbFail - callback function in case the API callback failed.
	 *					  Signature: function cbFail()
	 * @return {boolean} true if it is succeeded and false otherwise.
	 * 
	 * @author Moshe Darzi
	 */
	me.hideInfoBar = function (cbSuccess, cbFail) 
	{
		rpcSender.invoke('conduitApi.app.hideInfoBar', cbSuccess, cbFail);
	};
	
	/**
	 * Show info bar.
	 * 
	 * @param cbSuccess - Function to be called upon success
	 * 					  Signature: function cbSuccess();
	 * @param cbFail - callback function in case the API callback failed.
	 *					  Signature: function cbFail()
	 * @return {boolean} true if it is succeeded and false otherwise.
	 * 
	 * @author Moshe Darzi
	 */
	me.showInfoBar = function (cbSuccess, cbFail) 
	{
		rpcSender.invoke('conduitApi.app.showInfoBar', cbSuccess, cbFail);
	};
	
	/**
	 * Toggle visiblity of the info bar.
	 * 
	 * @param cbSuccess - Function to be called upon success
	 * 					  Signature: function cbSuccess();
	 * @param cbFail - callback function in case the API callback failed.
	 *					  Signature: function cbFail()
	 * @return {boolean} true if it is succeeded and false otherwise.
	 * 
	 * @author Moshe Darzi
	 */
	me.toggleInfoBar = function (cbSuccess, cbFail) 
	{
		rpcSender.invoke('conduitApi.app.toggleInfoBar', cbSuccess, cbFail);
	};
	
	/**
	 * Return the visiblity of the info bar.
	 * 
	 * @param cbSuccess - Function to be called upon success
	 * 					  Signature: function cbSuccess(visible);
	 * @param cbFail - callback function in case the API callback failed.
	 *					  Signature: function cbFail()
	 * @return true if visible, false otherwise
	 * 
	 * @author Moshe Darzi
	 */
	me.isInfoBarVisible = function (cbSuccess, cbFail)
	{
		rpcSender.invoke('conduitApi.app.isInfoBarVisible', cbSuccess, cbFail);
	};
	
	/**
	 * Hide navigation bar.
	 * 
	 * @param cbSuccess - Function to be called upon success
	 * 					  Signature: function cbSuccess();
	 * @param cbFail - callback function in case the API callback failed.
	 *					  Signature: function cbFail()
	 * @return {boolean} true if it is succeeded and false otherwise.
	 * 
	 * @author Moshe Darzi
	 */
	me.hideNavigationBar = function (cbSuccess, cbFail) 
	{
		rpcSender.invoke('conduitApi.app.hideNavigationBar', cbSuccess, cbFail);
	};
	
	/**
	 * Show navigation bar.
	 * 
	 * @param cbSuccess - Function to be called upon success
	 * 					  Signature: function cbSuccess();
	 * @param cbFail - callback function in case the API callback failed.
	 *					  Signature: function cbFail()
	 * @return {boolean} true if it is succeeded and false otherwise.
	 * 
	 * @author Moshe Darzi
	 */
	me.showNavigationBar = function (cbSuccess, cbFail) 
	{
		rpcSender.invoke('conduitApi.app.showNavigationBar', cbSuccess, cbFail);
	};
	
	/**
	 * Toggle visiblity of the navigation bar.
	 * 
	 * @param cbSuccess - Function to be called upon success
	 * 					  Signature: function cbSuccess();
	 * @param cbFail - callback function in case the API callback failed.
	 *					  Signature: function cbFail()
	 * @return {boolean} true if it is succeeded and false otherwise.
	 * 
	 * @author Moshe Darzi
	 */
	me.toggleNavigationBar = function (cbSuccess, cbFail) 
	{
		rpcSender.invoke('conduitApi.app.toggleNavigationBar', cbSuccess, cbFail);
	};
	
	/**
	 * Return the visiblity of the navigation bar.
	 * 
	 * @param cbSuccess - Function to be called upon success
	 * 					  Signature: function cbSuccess(visable);
	 * @param cbFail - callback function in case the API callback failed.
	 *					  Signature: function cbFail()
	 * @return true if visible, false otherwise
	 * 
	 * @author Moshe Darzi
	 */
	me.isNavigationBarVisible = function (cbSuccess, cbFail)
	{
		rpcSender.invoke('conduitApi.app.isNavigationBarVisible', cbSuccess, cbFail);
	};
	
	// the buttons call backs map.
	var buttonsCbsMap = {};
	// the handle of the btnClick event.
	var btnClickEventHandle;
	
	// a running index to be used when adding a new menu button.
	var menuBtnID = 0;
	
	/**
	 * callback to be called by the native code when a menu button is pressed.
	 * @param {number} btnId - the id of the button.
	 */
	me.menuBtnPressed = function (btnId) 
	{
		if (buttonsCbsMap[btnId]) 
		{
			buttonsCbsMap[btnId]();
		}
	};
	
	/**
	 * Add button to the info bar.
	 * 
	 * @param cbSuccess - Function to be called upon success
	 * 					  Signature: function cbSuccess(btnHandle);
	 * 						btnHandle - the button's handle for later removal.
	 * @param cbFail - callback function in case the API callback failed.
	 *					  Signature: function cbFail()
	 * @param {Object} buttonImage - the image of the button.
	 * @param {bool} addToRight - true indicates the button will be added to the right side,
	 * 							false will add to the left side
	 * @param {Object} cbButton - the callback of the button.
	 * 
	 * @return {Object} the button's handle for later removal or null if the addition failed.
	 * 
	 * @author Moshe Darzi
	 */
	me.addInfoBarButton = function (cbSuccess, cbFail, buttonImage, addToRight, cbButton) 
	{
		/**
		 * Inner event handler to send the click event to the relevant button.
		 * @param {Object} eventName - in this case 'btnClick'.
		 * @param {Object} data - the data of the click event.
		 */
		function btnClickEventHandler(eventName, data) 
		{
			// sanity check
			if (eventName !== 'btnClick') 
			{
				return;
			}
			if (buttonsCbsMap[''+data.btnId]) 
			{
				buttonsCbsMap[''+data.btnId]();	
			}
		}
		
		/**
		 * Callback when a button was added. saves it in the buttons map.
		 * @param {Object} buttonHandle - the button's handle.
		 */
		function innerCbSucces(buttonHandle) 
		{
			buttonsCbsMap[''+buttonHandle] = cbButton;
			cbSuccess(buttonHandle);
		}
		
		// if first button, register to the event.
		if (!btnClickEventHandle) 
		{
			btnClickEventHandle = eventsHandler.registerOnEvent('btnClick', btnClickEventHandler);
		}
		rpcSender.invoke('conduitApi.app.addInfoBarButton', innerCbSucces, cbFail, buttonImage, addToRight);
	};
	
	/**
	 * Remove button from the info bar.
	 * 
	 * @param cbSuccess - Function to be called upon success
	 * 					  Signature: function cbSuccess();
	 * @param cbFail - callback function in case the API callback failed.
	 *					  Signature: function cbFail()
	 * @param {Object} buttonHandle - the handle of the button.
	 * 
	 * @return {boolean} true if it is succeeded and false otherwise.
	 * 
	 * @author Moshe Darzi
	 */
	me.removeInfoBarButton = function (cbSuccess, cbFail, buttonHandle) 
	{
		delete buttonsCbsMap[''+buttonHandle];
		rpcSender.invoke('conduitApi.app.removeInfoBarButton', cbSuccess, cbFail, buttonHandle);
	};
	
	
	var _backBtnHandle = null;
	
	var _backBtnCb = null;
	
	me.backBtnPressed = function () 
	{
		if (_backBtnCb) 
		{
			_backBtnCb();
		}
		else 
		{
			me.closeApp();
		}
	}
	
	/**
	 * Add back button functionality. If there is no HW back button,
	 * add it to the info bar.
	 * 
     * @param cbSuccess - Function to be called upon success
     * 					  Signature: function cbSuccess();
	 * @param cbFail - callback function in case the API callback failed.
	 *					  Signature: function cbFail()
	 * @param {Object} buttonImage - the image of the back button.
	 * @param {bool} addToRight - true indicates the button will be added to the right side,
	 * 							false will add to the left side
	 * @param {Object} cbButton - the callback of the button.
	 * 
	 * @author Yoel Gluschnaider
	 */
	me.addBackButton = function (cbSuccess, cbFail, buttonImage, addToRight, cbButton) 
	{
		conduitApi.platform.deviceInfo.getDeviceInfo(
			function (deviceInfo)
			{
				if ((deviceInfo.device === deviceTypeEnum.android) && 
					(deviceInfo.platform === platformEnum.nativeApp)) 
				{
					_backBtnCb = cbButton;
					ComNative.addBackButton();
					if (cbSuccess) 
					{
						cbSuccess();
					}
				}
				else 
				{
					function innerCbSuccess(btnHandle) 
					{
						_backBtnHandle = btnHandle;
						if (cbSuccess) 
						{
							cbSuccess();
						}
					}
					me.addInfoBarButton(innerCbSuccess, cbFail, buttonImage, addToRight, cbButton);
				}
	        },
			null
			);
	};
	
	/**
	 * Remove back button functionality and remove it from the info bar
	 * if added..
	 * 
     * @param cbSuccess - Function to be called upon success
     * 					  Signature: function cbSuccess();
	 * @param cbFail - callback function in case the API callback failed.
	 *					  Signature: function cbFail()
	 * @param {Object} buttonHandle - the handle of the button.
	 * 
	 * @return {boolean} true if it is succeeded and false otherwise.
     * 
	 * @author Moshe Darzi
	 */
	me.removeBackButton = function (cbSuccess, cbFail) 
	{
		conduitApi.platform.deviceInfo.getDeviceInfo(
			function (deviceInfo)
			{
				if ((deviceInfo.device === deviceTypeEnum.android) && 
					(deviceInfo.platform === platformEnum.nativeApp)) 
				{
					_backBtnCb = null;
					ComNative.removeBackButton();
					if (cbSuccess) 
					{
						cbSuccess();
					}
				}
				else 
				{
					function innerCbSuccess(btnHandle) 
					{
						_backBtnHandle = null;
						if (cbSuccess) 
						{
							cbSuccess();
						}
					}
					me.removeInfoBarButton(innerCbSuccess, cbFail, _backBtnHandle);
				}
	        },
			null
			);
	};
	
	/**
	 * Remove all buttons from the info bar.
	 * 
	 * @param cbSuccess - Function to be called upon success
	 * 					  Signature: function cbSuccess();
	 * @param cbFail - callback function in case the API callback failed.
	 *					  Signature: function cbFail()
	 * @return {boolean} true if it is succeeded and false otherwise.
	 * 
	 * @author Moshe Darzi
	 */
	me.removeAllInfoBarButtons = function (cbSuccess, cbFail) 
	{
		me.removeBackButton();
		rpcSender.invoke('conduitApi.app.removeAllInfoBarButtons', cbSuccess, cbFail);
	};
	
	/**
	 * 
     * @param cbSuccess - Function to be called upon success
     * 					  Signature: function cbSuccess();
	 * @param cbFail - callback function in case the API callback failed.
	 *					  Signature: function cbFail()
	 * @param {Object} args - contains the url and the title.
	 * 							{
	 * 								url: 'http://www.conduit.com',
	 * 								title: 'Conduit',
	 * 								isModal: true/false,
	 * 								rect: {left:x, top:y, width:w, height:h}
	 * 							}
     * 
     * @return linkHandle on success callback
     * 
	 * @author Moshe Darzi
	 */
	me.openLink = function (cbSuccess, cbFail, args, cbURLHandler, cbLinkClosedHandler) 
	{
		/**
		 * URL changed handler.
		 * @param {Object} eventName should be onURLChanged
		 * @param {Object} eventData - containing the new URL.
		 */
		function innerCbURLHandler(eventName, eventData)
		{
			if (typeof(cbURLHandler) === 'function') 
			{
				cbURLHandler(eventData.url);
			}
		}
		
		/**
		 * Handler for the link close event.
		 * @param {Object} eventName - should be onLinkClosed.
		 * @param {Object} eventData - should be null.
		 */
		function innerCbLinkClosedHandler(eventName, eventData) 
		{
			if (typeof(cbLinkClosedHandler) === 'function') 
			{
				cbLinkClosedHandler();
			}
		}
		
		// register on the event.
		_urlChnagedEventHandle = eventsHandler.registerOnEvent('onURLChanged', innerCbURLHandler);
		_linkClosedEventHandle = eventsHandler.registerOnEvent('onLinkClosed', innerCbLinkClosedHandler);
		
		rpcSender.invoke('conduitApi.app.openLink', cbSuccess, cbFail, args);
	};

	/**
	 * 
     * @param cbSuccess - Function to be called upon success
     * 					  Signature: function cbSuccess();
	 * @param cbFail - callback function in case the API callback failed.
	 *					  Signature: function cbFail()
	 * @param {Object} linkHandle - previously opened link handle
     * 
	 * @author Moshe Darzi
	 */
	me.closeLink = function (cbSuccess, cbFail, linkHandle) 
	{
		// unregister from the event.
		eventsHandler.unregisterFromEvent('onURLChanged', _urlChnagedEventHandle);
		eventsHandler.unregisterFromEvent('onLinkClosed', _linkClosedEventHandle);
		rpcSender.invoke('conduitApi.app.closeLink', cbSuccess, cbFail, linkHandle);
	};
	
	/**
	 * 
     * @param cbSuccess - Function to be called upon success
     * 					  Signature: function cbSuccess();
	 * @param cbFail - callback function in case the API callback failed.
	 *					  Signature: function cbFail()
	 * @param {Object} linkHandle - previously opened link handle
 	 * @param {dictionary} rect - {left:x, top:y, width:w, height:h}
     * 
	 * @author Moshe Darzi
	 */
	me.setLinkRect = function (cbSuccess, cbFail, linkHandle, rect) 
	{
		rpcSender.invoke('conduitApi.app.setLinkRect', cbSuccess, cbFail, linkHandle, rect);
	};

	/**
	 * Closes the application.
	 * 
	 * @param cbSuccess - Function to be called upon success
	 * 					  Signature: function cbSuccess();
	 * @param cbFail - callback function in case the API callback failed.
	 *					  Signature: function cbFail()
	 * @author Moshe Darzi
	 */
	me.closeApp = function (cbSuccess, cbFail) 
	{
		rpcSender.invoke('conduitApi.app.closeApp', cbSuccess, cbFail);
	};
	
	return me;
	
})();

conduitApi.__BCAPI.UI = (function () 
{
	var me = {};

	/**
	 * Check if the UI API is supported.
	 * 
	 * @return {boolean} true if it is supported and false otherwise.
	 */
	me.isSupported = function () 
	{
		return conduitApi.__BCAPI.supportedObj.UI.isSupported;
	};
	
	/**
	 * Show an activity indicator.
	 * 
     * @param cbSuccess - Function to be called upon success
     * 					  Signature: function cbSuccess();
	 * @param cbFail - callback function in case the API callback failed.
	 *					  Signature: function cbFail()
	 * @param {Object} message - the message to be shown in the Activity Indicator.
	 */
	me.startActivityIndicator = function (cbSuccess, cbFail, message)
	{
		rpcSender.invoke('conduitApi.UI.startActivityIndicator', cbSuccess, cbFail, message);
	};
	
	/**
	 * Dismiss the activity indicator.
	 * 
     * @param cbSuccess - Function to be called upon success
     * 					  Signature: function cbSuccess();
	 * @param cbFail - callback function in case the API callback failed.
	 *					  Signature: function cbFail()
	 * @param forceDismiss - Force dismissal of the indicator no matter how many times 'show' was called
	 */
	me.dismissActivityIndicator = function (cbSuccess, cbFail, forceDismiss) 
	{
		rpcSender.invoke('conduitApi.UI.dismissActivityIndicator', cbSuccess, cbFail, forceDismiss);
	};
	
	/**
	 * Show a dialog box.
	 * 
     * @param cbSuccess - Function to be called upon success
     * 					  Signature: function cbSuccess();
	 * @param cbFail - callback function in case the API callback failed.
	 *					  Signature: function cbFail()
	 * @param {Object} The dialog options contains:
	 * 						title: the title of the dialog.
	 * 						message: the message of the dialog.
	 * 						buttons: an array containing Button objects that consist of:
	 * 								text: the text of the button.
	 * 								cb: the callback to run when the button is pressed.
	 */
	me.showDialogBox = function (cbSuccess, cbFail, dialogOptions) 
	{
		// register on the event.
		var eventHandle = eventsHandler.registerOnEvent('dlgBtnClick', dlgBtnClickEventHandler);
		
		// handler of the dialog button click.
		function dlgBtnClickEventHandler(eventName, data) 
		{
			// call the relevant call back if specified.
			if (dialogOptions.buttons[data.btnIndex].cb) 
			{
				dialogOptions.buttons[data.btnIndex].cb();
			}
			// unregister from the event.
			eventsHandler.unregisterFromEvent('dlgBtnClick', eventHandle);
		}
		rpcSender.invoke('conduitApi.UI.showDialogBox', cbSuccess, cbFail, dialogOptions);
	};
	
	return me;
})();

conduitApi.__BCAPI.platform.pushNotification = (function () 
{
	var me = {};
	
	var _pushNotifEventHandle;
	
	/**
	 * Check if the Push Notification API is supported.
	 * @return {boolean} true if it is supported and false otherwise.
	 */
	me.isSupported = function () 
	{
		return conduitApi.__BCAPI.supportedObj.platform.pushNotification.isSupported;
	};

	/**
     * Register component for push notification
     * @param cbSuccess - Function to be called when the user chose to view the notification.
	 * @param {Object} cbFail - callback function in case the API callback failed.
	 * 							Signature: function cbFail()
	 *
	 * @author Yoel Gluschnaider
     */
    me.registerPushNotification = function (cbSuccess, cbFail, cbEventHandler)
	{
		function pushNotificationHandler(eventaName, data) 
		{
			cbEventHandler(data.message);
		}
		_pushNotifEventHandle = eventsHandler.registerOnEvent('pushNotif', pushNotificationHandler);
		rpcSender.invoke('conduitApi.platform.pushNotification.registerPushNotification', cbSuccess, cbFail);
	};
	
	/**
     * Remove registeration for a component
     * @param {Function} cbSuccess - Function to be called upon success
     * 					  		Signature: function cbSuccess();
	 * @param {Function} cbFail - callback function in case the API callback failed.
	 * 							Signature: function cbFail()
	 *
	 * @author Yoel Gluschnaider
     */
    me.unregisterPushNotification = function (cbSuccess, cbFail) 
	{
		eventsHandler.unregisterFromEvent('pushNotif', _pushNotifEventHandle);
		rpcSender.invoke('conduitApi.platform.pushNotification.unregisterPushNotification', cbSuccess, cbFail);
	};
	
	return me;
})();

conduitApi.__BCAPI.platform.gestures = (function () 
{
	var me = {};
	
	var shakeEventHandle;
	
	/**
	 * Check if the Gestures API is supported.
	 * @return {boolean} true if it is supported and false otherwise.
	 */
	me.isSupported = function () 
	{
		return conduitApi.__BCAPI.supportedObj.platform.gestures.isSupported;
	};
	
	/**
     * Register component for shake gesture
	 *
     * @param cbSuccess - Function to be called upon success
     * 					  Signature: function cbSuccess();
	 * @param cbFail - callback function in case the API callback failed.
	 *					  Signature: function cbFail()
     * @param cbEventHandler - Function to be called when the user shake the device
	 *
	 * @author Moshe Darzi
     */
	me.registerShake = function (cbSuccess, cbFail, cbEventHandler) 
	{
		function shakeEventHandler(eventName, data) 
		{
			cbEventHandler();
		}
		shakeEventHandle = eventsHandler.registerOnEvent('shakeEvent', shakeEventHandler);
		
		rpcSender.invoke('conduitApi.platform.gestures.registerShake', cbSuccess, cbFail);
	};
	
	/**
     * Remove registeration for a component
	 *
     * @param cbSuccess - Function to be called upon success
     * 					  Signature: function cbSuccess();
	 * @param cbFail - callback function in case the API callback failed.
	 *					  Signature: function cbFail()
	 * @author Moshe Darzi
     */
	me.unregisterShake = function (cbSuccess, cbFail) 
	{
		eventsHandler.unregisterFromEvent('shakeEvent', shakeEventHandle);
		rpcSender.invoke('conduitApi.platform.gestures.unregisterShake', cbSuccess, cbFail);
	};
	
	return me;
})();

conduitApi.__BCAPI.social = (function () 
{
	var me = {};
	
	/**
	 * Check if the Gestures API is supported.
	 * @return {boolean} true if it is supported and false otherwise.
	 */
	me.isSupported = function () 
	{
		return conduitApi.__BCAPI.supportedObj.social.isSupported;
	};
	
	/**
     * Retrieve the supported services for social sharing
     *
     * @param cbSuccess - callback function for the retrieved services in format:
     * 						cbSuccess(supportedServicesArray)
     * @param cbFail - callback function when failed to retrieve services
     * 
     * @author Moshe Darzi
     */
	me.getSupportedServices = function(shareInfo, cbSuccess, cbFail)
	{
		rpcSender.invoke('conduitApi.social.getSupportedServices', shareInfo, cbSuccess, cbFail);
	}

	/**
	 * Share the info through a service
     * 
     * @param cbSuccess - Function to be called upon success
     * 					  Signature: function cbSuccess();
	 * @param cbFail - callback function in case the API callback failed.
	 *					  Signature: function cbFail()
	 * @param {socialServicesEnum} service - the service to share through.
	 * @param shareInfo - dictionary containing the informat sent to the share object. It can contain:
	 * 						{
	 * 							title: Title for the share,
	 * 							text: Text to share,
	 * 							url: link to share,
	 * 							image: url link to image to display
	 * 							emailSubject: Subject of the email,
	 * 							emailBody: Body content of the email,
	 * 							fbDesc: Description for Facebook,
	 * 							twitterTitle: Title for Twitter,
	 * 							twitterFrom: 'From' text for Twitter,
	 * 							savedState: object of saved state of the caller in case	the app needs
	 * 										to be redirected (like facebook login on webapp)
	 * 						}
	 * @author Moshe Darzi
	 */
	me.share = function(cbSuccess, cbFail, service, shareOptions)
	{
		rpcSender.invoke('conduitApi.social.share', cbSuccess, cbFail, service, shareOptions);
	};

	/**
	 * Get access tokens for a specific service
     * 
     * @param cbSuccess - Function to be called upon success
     * 					  Signature: function cbSuccess();
	 * @param cbFail - callback function in case the API callback failed.
	 *					  Signature: function cbFail()
	 * @param {socialServicesEnum} service - the service to get the access token for. 
	 * 										currently available: facebook, twitter.
	 * @param {Object} options - dictionary that holds the following options:
	 * 							{Boolean} useLoginForm - determines the behavior in case the we do not
	 * 													have access token. If true, open the login form,
	 * 													otherwise, call the cbFail.
	 *
	 * @author Moshe Darzi
	 */
	me.getAccessTokens = function(cbSuccess, cbFail, service, options)
	{
		rpcSender.invoke('conduitApi.social.getAccessTokens', cbSuccess, cbFail, service, options);
	};
	
	/**
	 * Log out from  specific service
     * 
     * @param cbSuccess - Function to be called upon success
     * 					  Signature: function cbSuccess();
	 * @param cbFail - callback function in case the API callback failed.
	 *					  Signature: function cbFail()
	 * @param serviceName - name of the service to get the access token for. currently available:
	 * 							facebook, twitter
	 * @param cbLoggedOut - callback function when user is logged out
	 *					  Signature: function cbLoggedOut()
	 *
	 * @author Moshe Darzi
	 */
	me.logout = function(cbSuccess, cbFail, service)
	{
		rpcSender.invoke('conduitApi.social.logout', cbSuccess, cbFail, service);
	};

	return me;
})();



var TweetListView_WP = ItemsView_WP.extend(
{
    initialize: function ()
    {
        ItemsView_WP.prototype.initialize.apply(this);
    },

    _onGetItemsSuccess: function (itemsData)
    {
        var modelItems = this.model.get('items');
        var items = modelItems.toJSON();
        var that = this;

        // Regex for analyzing twitter user name
        var rgxTweetUserName = new RegExp("\\[twit=(.*?)](.*?)\\[/twit]", "g");

        // Regex for analyzing link
        var rgxTweetLink = new RegExp("\\[url\\](.*?)\\[/url\\]", "g");

        // Regex for trends
        var rgxTweetTrend = new RegExp("\\[trend=(.*?)](.*?)\\[/trend]", "g");

        var feedsList = [];

        // Loop through feeds
        _.each(items, function (feedDetails, i)
        {
            var timeText = Utils.TimeDate.timeAsText(feedDetails['time']);

            var userName = feedDetails['user'].get('userName') || "";

            // Get feed description
            var feedDescription = feedDetails['description'];

			// Sometimes the description is already sanitized so desanitize it first
			var feedRichDescription = Utils.String.desanitize(feedDescription);
			// Transform special characters for SilverLight
			feedRichDescription = Utils.String.sanitizeText(feedRichDescription);

	        // Replace username with Twitter link
            //var replacment = '$1';
	        var replacment = "<Hyperlink Foreground='#FF337CBB' TextDecorations='Underline' TargetName='@$1'>$2</Hyperlink>";
            feedRichDescription = feedRichDescription.replace(rgxTweetUserName, replacment);

			// Replace link with href link		
			replacment = "<Hyperlink Foreground='#FF337CBB' TextDecorations='Underline' TargetName='$1'>$1</Hyperlink>";
            feedRichDescription = feedRichDescription.replace(rgxTweetLink, replacment);

			// Replace for trend hash link
			replacment = "<Hyperlink Foreground='#FF337CBB' TextDecorations='Underline' TargetName='#$1'>#$1</Hyperlink>";
            feedRichDescription = feedRichDescription.replace(rgxTweetTrend, replacment);

	        // Replace username with Twitter link
            replacment = '$1';
            feedDescription = feedDescription.replace(rgxTweetUserName, replacment);

			// Replace link with href link		
            feedDescription = feedDescription.replace(rgxTweetLink, replacment);

			// Replace for trend hash link
            feedDescription = feedDescription.replace(rgxTweetTrend, replacment);

            // Image if icon exist
            var icon = feedDetails['user'].get('imageUrl') || "";

            var shareInfo = that._getShareInfoObject(modelItems.models[i])
            shareInfo.twitterTitle = feedDescription;

            var feedParams =
			{
			    'social': shareInfo,
			    'image': icon,
			    'title': userName,
			    'timeText': timeText,
			    'id': '' + i,
			    'description': feedDescription,
				'feedRichDescription': feedRichDescription,
				'name': feedDetails.user.get('displayName'),
				'user': feedDetails.user.get('userName'),
				'picture': feedDetails.user.get('imageUrl') || null,
				'totalFollowers': localization.formatNumber(feedDetails.user.get('totalFollowers')),
				'totalStatuses': localization.formatNumber(feedDetails.user.get('totalStatuses'))
			};

            feedsList.push(feedParams);
        });

        var data = { 'layoutType': 'TwitterFeedItemTemplate',
            'layoutNumber': '0'+this.model.get('type'),
			'type': ''+this.model.get('type'),
            'tabIndex': that.model.get('tabIndex'),
            'feedsList': feedsList
        };
        var user = this.model.get('user');
        var query = this.model.get('query');
        if (user)
        {
            data['name'] = user.get('displayName');
            data['user'] = user.get('userName');
            data['picture'] = user.get('imageUrl') || null;
            data['totalFollowers'] = localization.formatNumber(user.get('totalFollowers'));
            data['totalStatuses'] = localization.formatNumber(user.get('totalStatuses'));
        }
        else if (query)
        {
            data['name'] = query;
        }

        ComNative.sendMessage('PageCommand;' + this.model.get('pageId') + ';renderFeeds;' + JSON.stringify(data));
    }
});



/**
 * PlayListModel model
 * 
 * @author Moshe Darzi
 */
var PlayListModel = ItemsModel.extend(
{
	defaults:
	{
		id: 'playlist',
		title : 'New playlist',
		media: {},
    	editMode: false
	},
	
	initialize: function()
	{
        ItemsModel.prototype.initialize.apply(this, arguments);
    	this.bind('change:editMode', this.onEditModeChange, this);
	},
	
	getItems: function()
	{
		this.trigger('getItemsSuccess', this);
	},
	
    /**
     * Create the items collection.
     *
     * @author Moshe Darzi
     */
    createItemsCollection: function()
    {
        var items = this.get('media').items;
        if (items && items.length > 0)
        {
			this.set(
			{
				eof : true
			});
        }
		var params =
		{
			url : ''
		};
        return new TracksCollection(items, params);
	},

    onEditModeChange: function(model, editMode)
    {
        _.each(this.get('items').models, function(trackModel, i)
        {
            trackModel.set({editMode:editMode});
            // Reset new index
            trackModel.set({newIndex:i});
        });
    }
});


var PlayListView = ItemsView.extend(
{
    initialize: function () 
    {
        ItemsView.prototype.initialize.apply(this);
    },
    
    /**
     * Create an item view with the given model (override)
     * 
     * @param itemModel - the model of the item to creat the view for.
     * 
     * @return the view of the item.
     *          
     * @author Moshe Darzi
     */
    createItemView: function (itemModel)
    {
        var trackView = new TrackView(
        {
            model: itemModel,
            template: this.options.template
        });
        
        trackView.bind('trackPlay', this.onTrackPlay, this);
        trackView.bind('trackRemove', this.onTrackRemove, this);
        trackView.bind('trackDragStart', this.onTrackDragStart, this, event);
        trackView.bind('trackDrag', this.onTrackDrag, this, event);
        trackView.bind('trackDragEnd', this.onTrackDragEnd, this, event);
		
		return trackView;
    },


    /**
     * Returns the root view. This is needed since some of the derivatives of the ItemsView
     * contain a scroll wrapper and scroller and the root is not this.el but something else. (override)
     * 
     * @return a jQuery object representing the view of the root element.
     *          
     * @author Moshe Darzi
     */
    getRootView: function ()
    {
        return this.$el;
    },
    
    /**
     * Notify to play a track
     *
     * @param trackModel - the model of the track to play
     * 
     * @author Moshe Darzi
     */
    onTrackPlay: function(trackModel)
    {
        // Play the track
    	this.trigger('trackPlay', trackModel);
    },
    
    /**
     * Notify to remove a track
     *
     * @param trackModel - the model of the track to remove
     * 
     * @author Moshe Darzi
     */
    onTrackRemove: function(trackModel)
    {
        // Remove the track
    	this.trigger('trackRemove', trackModel);
    },
    
    /**
     * Return the index of a track in the tracks list
     *
     * @param $track - jQuery object of the track view
     * 
     * @author Moshe Darzi
     */
    _getTrackIndex: function($track)
    {
        var $tracks = this.$el.find('.tracks_list_item');
        var t = $track.offset().top + this.itemMargin;
        var index = Math.floor(t / this.itemHeight) - 1;

        // Apply list limits
        if (index < 0)
        {
            index = 0;
        }
        if (index >= $tracks.length)
        {
            index = $tracks.length - 1;
        }
        return index;
    },

    /**
     * Event handler for track dragging
     *
     * @param trackView - track view being dragged
     * 
     * @author Moshe Darzi
     */
    onTrackDragStart: function(trackView)
    {
        var $this = this.$el;
        var $track = $(trackView.el);
        var $tracks = $this.find('.tracks_list_item');
        // Save for later use
        if (!this.itemHeight)
        {
            var h1 = $tracks.eq(1).offset().top;
            var h0 = $tracks.eq(0).offset().top;
            // The item height is the difference between 2 items
            this.itemHeight = h1 - h0;
            this.itemMargin = parseInt($track.css('margin-Top')) + parseInt($track.css('margin-Bottom'));
        }

        this.trackDragIndex = this._getTrackIndex($track);

        // If track is not the last, move it to be the last so its movement
        // will not affect other tracks and update its Y offset
        var offset = 0;
        if (this.trackDragIndex < $tracks.length - 1)
        {
	        var $parent = $track.parent();
	        $track.detach();
	        $parent.append($track);
	        var top = parseFloat($track.offset().top);
	
	        var $nextTrack = $tracks.eq(this.trackDragIndex+1);
	        $nextTrack.css({'margin-Top':this.itemHeight+this.itemMargin});
	
	        offset = ($tracks.length - this.trackDragIndex) *  this.itemHeight - this.itemMargin;
	        $track.css({'margin-Top':-offset});
	        offset = -offset-this.itemHeight/2;
        }
        $track.attr('offsety', offset);
    },

    /**
     * Event handler for track dragging
     *
     * @param trackView - track view being dragged
     * @param move - object containing the movement coordinates
     * 
     * @author Moshe Darzi
     */
    onTrackDrag: function(trackView, move)
    {
        var $track = $(trackView.el);
        var offsety = parseInt($track.attr('offsety'));
        offsety += move.y;
        // Update position and make sure this track is on top
        $track.css({'margin-Top':offsety, 'z-index':999});
    },

    /**
     * Event handler for ending track drag.
     * Update the track position in view and notify the change with the new indices list
     *
     * @param trackView - track view being dragged
     * 
     * @author Moshe Darzi
     */
    onTrackDragEnd: function(trackView)
    {
    	var $track = $(trackView.el);
    	// This is the new tracks list with the dragged track at the end
    	var $tracks = this.$el.find('.tracks_list_item');
    	
        var newIndex = this._getTrackIndex($track);

        // If the dragged track does not pass over the old track fully, skip to the next one
        if ($tracks.eq(newIndex).offset().top < $track.offset().top)
        {
        	newIndex++;
        }

        // If the new place is not the last, put the track there
        if (newIndex < $tracks.length - 1)
        {
	        var $oldTrack = $tracks.eq(newIndex);
	        $track.detach();
	        // Put the track in new place
	        $track.insertBefore($oldTrack);
        }

        // Clear drag data
        $tracks.css({'margin-Top':'', 'z-index':'', 'position':'', 'top':''});

		if (newIndex !== this.trackDragIndex)
		{
			var list = {};
			var models = this.model.get('items').models;
			var i;
			for (i = 0; i<models.length; i++)
			{
				var model = models[i];
				var index = model.get('newIndex');
				// Track went up
				if (newIndex < this.trackDragIndex && index >= newIndex && index < this.trackDragIndex)
				{
					index++;
					model.set({newIndex:index});
				}
				// Track went down
				else if (newIndex > this.trackDragIndex && index <= newIndex  && index > this.trackDragIndex)
				{
					index--;
					model.set({newIndex:index});
				}
				list[i] = index;
			}
			// The dragged track new index
			trackView.model.set({newIndex:newIndex});
			list[this.trackDragIndex] = newIndex;
			
			this.trigger('tracksListChanged', list);
		}
    }
});

var PhotosTemplateView_WP = TemplateView_WP.extend(
{
    render: function (index)
    {
        var templateMetaData = this.model.get('meta');

        var photosModel = new PhotosModel(templateMetaData.feeds[index]);
        photosModel.set(
        {
            tabIndex: index,
            pageId: this.model.get('id')
        });

        var photosView = new PhotosView_WP(
        {
            model: photosModel
        });
        photosModel.getItems();
    }
});

