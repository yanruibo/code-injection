

	
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
var RETURN_STATE_INFO="return_state_info";var RETURN_FUNCTION_FACEBOOK_SHARE="handleFacebookShare";var TWITTER_TOKENS="twitter_credentials";var SOCIAL_USER_CANCELED="user_canceled";var APP_VERSION="3.4.0.0";var DEV_SERVICEMAP_URL="http://servicemap.mobile.site-services.com/mobile";var QA_SERVICEMAP_URL="http://servicemap.mobile.qasite-services.com/mobile";var PROD_SERVICEMAP_URL="http://servicemap.mobile.conduit-services.com/mobile";var USE_AGENDA_FAVORITES=false;var USE_DATADUMP_SERVICE=false;var DEBUG=1;var PREVENT_DEVICE_DETECT=DEBUG&&!true;var NAVIGATION_PAGE_GUID="00000000-0000-0000-0000-000000000002";var APP_MODE=appMode.normal;var PLATFORM=platformEnum.webApp;var DEVICE=deviceTypeEnum.android;var LAYOUT=layoutFormat.narrow;var FORCE_NO_CACHE=false&&DEBUG;var SERVICEMAP_URL=PROD_SERVICEMAP_URL;var APP_ID=null;var IS_RTL=false;
var DEBUG = 0;
var AMS_VERSION = "1.76.90.759";
var PLATFORM = 1;
var DEVICE_TOKEN = 2;
var APP_ID = "d60a6f99-1a09-4b8d-8a39-fd5273ec7e05";
var APP_MODE = 0;
var SIMULATOR = 0;
var SERVICEMAP_URL = PROD_SERVICEMAP_URL;

var __dataDump ={"images":[],"services":[{"data":{"services":[{"name":"AMS_APP_GET","url":"http:\/\/ams.mobile.conduit-services.com\/{appId}\/{deviceType}?appVersion={appVersion}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_FEEDS_GET","url":"http:\/\/cms.mobile.conduit-services.com\/feed\/{take}\/{skip}\/?url={feedUrl}&params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_TWITTER_USER_GET","url":"http:\/\/cms.mobile.conduit-services.com\/twitter\/user\/{userName}\/{take}\/{skip}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_TWITTER_QUERY_GET","url":"http:\/\/cms.mobile.conduit-services.com\/twitter\/query\/{query}\/{type}\/{take}\/{skip}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_YOUTUBE_GET","url":"http:\/\/cms.mobile.conduit-services.com\/youtube\/{query}\/{type}\/{skip}\/{take}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_PHOTOS_GET","url":"http:\/\/cms.mobile.conduit-services.com\/photos\/{type}\/{userName}\/{take}\/{skip}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_PHOTOS_ALBUMS_GET","url":"http:\/\/cms.mobile.conduit-services.com\/photos\/albums\/{type}\/{username}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_FACEBOOK_USER_GET","url":"http:\/\/cms.mobile.conduit-services.com\/facebook\/user\/{pageName}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_FACEBOOK_DATA_GET","url":"http:\/\/cms.mobile.conduit-services.com\/facebook\/data\/{pageName}\/{take}\/{skip}\/?params={}","reload_interval_sec":7200,"method":"GET"},{"name":"UMS_USER_POST","url":"http:\/\/ums.mobile.conduit-services.com\/login\/user","method":"POST"},{"name":"PROXY_WEBSLICE","url":"http:\/\/proxy.mobile.conduit-services.com\/webslice?url={url}","reload_interval_sec":12092600,"method":"GET"},{"name":"AMS_APPID_GET","url":"http:\/\/ams.mobile.conduit-services.com\/code\/{code}\/{email}\/pwd","reload_interval_sec":7200,"method":"GET"},{"name":"UMS_USAGE_PUT","url":"http:\/\/ums.mobile.conduit-services.com\/usage\/log","reload_interval_sec":7200,"method":"POST"},{"name":"ADS_POST","url":"http:\/\/ads.mobile.conduit-services.com\/{appId}\/{deviceType}","reload_interval_sec":600,"method":"POST"},{"name":"CMS_RAYV_GET","url":"http:\/\/cms.mobile.conduit-services.com\/rayv\/feeds\/{distributer}\/{listType}\/{take}\/{skip}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"MOBILE_SOCIAL_LOGIN","url":"http:\/\/social.mobile.conduit-services.com\/connect\/facebook?appId={appId}&type={deviceType}&ret={returnUrl}","method":"GET"},{"name":"CMS_MEDIA_VIDEO_GET","url":"http:\/\/cms.mobile.conduit-services.com\/media\/video\/{deviceType}\/{take}\/{skip}\/?url={url}&params={params}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_MEDIA_AUDIO_GET","url":"http:\/\/cms.mobile.conduit-services.com\/media\/audio\/{deviceType}\/{take}\/{skip}\/?url={url}&params={params}","reload_interval_sec":7200,"method":"GET"},{"name":"AMS_TRANSLATION_GET","url":"http:\/\/ams.mobile.conduit-services.com\/translate\/{product}\/{culture}\/{deviceType}","reload_interval_sec":1200,"method":"GET"},{"name":"LIVE_ALBUM_PHOTO_POST","url":"http:\/\/livealbum.mobile.conduit-services.com\/Album\/{appId}\/{parentSocialId}\/{socialId}\/{albumId}\/{tagWithUserId}\/","reload_interval_sec":7200,"method":"POST"},{"name":"TWITTER_API_PROXY_POST","url":"http:\/\/apiproxy.conduit-services.com\/twitter\/{tId}?sshkey={sshKey}&hts={hts}&url=http%3a%2f%2fapi.twitter.com%2f1%2fstatuses%2fupdate.json","reload_interval_sec":7200,"method":"POST"},{"name":"SOCIAL_LOGOUT","url":"http:\/\/social.conduit-services.com\/ConduitLogout.aspx","reload_interval_sec":7200,"method":"GET"},{"name":"SIGSERV_HTTP_GET","url":"http:\/\/sub.conduit-push.com","reload_interval_sec":7200,"method":"GET"},{"name":"SIGSERV_HTTP_PUT","url":"http:\/\/pub.conduit-push.com","reload_interval_sec":7200,"method":"PUT"},{"name":"SIGSERV_WEBSOCKET_GET","url":"ws:\/\/ws.conduit-push.com","reload_interval_sec":7200,"method":"GET"},{"name":"MOBILE_TWITTER_LOGIN","url":"http:\/\/social.mobile.conduit-services.com\/twitter\/SignIn?appId={appId}&type={deviceType}&ret={returnUrl}","reload_interval_sec":7200,"method":"GET"},{"name":"LIVE_ALBUM_EULA_GET","url":"http:\/\/conduit.ourtoolbar.com\/eula\/","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_CALENDAR_GET","url":"http:\/\/cms.mobile.conduit-services.com\/calendar\/{type}\/?id={id}&max-results={take}&start-index={skip}&since={since}&until={until}&params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"WIBIYA_SUBSCRIBE_GET","url":"https:\/\/api.wibiya.com\/Handlers\/apps\/subscribe_mobile.php?t={token}&e={email}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_MEDIA_ART_GET","url":"http:\/\/cms.mobile.conduit-services.com\/media\/art\/?url={url}&params={params}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_REVIEW_GET","url":"http:\/\/cms.mobile.conduit-services.com\/reviews\/{type}\/?q={query}&max-results={take}&start-index={skip}&params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"NFL_STATS_GET","url":"http:\/\/pages.mobile.conduit.com\/nfl\/player\/{key}\/{id}?info={level}","reload_interval_sec":7200,"method":"GET"},{"name":"IMAGES_REVIEWS_PROVIDER_GET","url":"http:\/\/images.mobile.conduit-services.com\/icon\/100{type}","reload_interval_sec":7200,"method":"GET"},{"name":"INAPP_USER_TOKENS_GET","url":"http:\/\/inapp.mobile.conduit-services.com\/client\/tokens\/{bucketId}?userId={userId}","method":"GET"},{"name":"INAPP_USER_TRANSACTION_POST","url":"http:\/\/inapp.mobile.conduit-services.com\/client\/transaction","method":"POST"},{"name":"CONTACT_CONTENT_PUT","url":"http:\/\/contact.mobile.conduit-services.com\/contact\/client\/{appId}\/{formId}\/?action={action}&postUrl={postUrl}","reload_interval_sec":1200,"method":"POST"},{"name":"CMS_USERS_GET","url":"http:\/\/cms.mobile.site-services.com\/users\/{userId}\/{provider}\/{relationType}\/{take}\/{skip}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"LIVE_ALBUM_PHOTO_V2_POST","url":"http:\/\/livealbum.mobile.conduit-services.com\/Files\/upload\/?groupId={groupId}&appId={appId}&albumId={albumId}","reload_interval_sec":7200,"method":"POST"},{"name":"CMS_COUPONS_GET","url":"http:\/\/cms.mobile.conduit-services.com\/coupons\/{listId}\/?take={take}&skip={skip}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_CONFERENCE_GET","url":"http:\/\/cms.mobile.conduit-services.com\/agenda\/{type}\/{id}\/{version}\/?ranges={ranges}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_PEOPLE_GET","url":"http:\/\/cms.mobile.conduit-services.com\/agenda\/{type}\/{id}\/{version}\/","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_POLLS_GET","url":"http:\/\/cms.mobile.conduit-services.com\/polls\/{type}\/{pollId}\/","reload_interval_sec":7200,"method":"GET"},{"name":"CONTACT_POLLS_POST","url":"http:\/\/polls.mobile.conduit-services.com\/polls\/result\/","reload_interval_sec":1200,"method":"POST"},{"name":"CMS_CONTENT_ITEMS","url":"http:\/\/cms.mobile.conduit-services.com\/contentItems\/items\/contenthost\/{take}\/{skip}\/?id={id}&params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_CONTENT_COLLECTION","url":"http:\/\/cms.mobile.conduit-services.com\/contentItems\/collection\/contenthost\/{take}\/?id={id}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_CONTENT_ITEMS_SEARCH","url":"http:\/\/cms.mobile.conduit-services.com\/contentItems\/items\/search\/{type}\/{collectionId}\/{take}\/{skip}\/?searchParams={searchParams}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_MENU_GET","url":"http:\/\/cms.mobile.conduit-services.com\/restaurants\/menu\/{provider}\/?query={restid}","reload_interval_sec":7200,"method":"GET"},{"name":"COMMUNITY_SOCIAL_LOGIN_POST","url":"http:\/\/community.mobile.conduit-services.com\/users\/social\/login\/{globalAppId}","reload_interval_sec":7200,"method":"POST"},{"name":"COMMUNITY_SOCIAL_LOGOUT_POST","url":"http:\/\/community.mobile.conduit-services.com\/users\/social\/logout\/{globalAppId}\/{userId}?socialId={socialId}","reload_interval_sec":7200,"method":"POST"},{"name":"CMS_USERS_SEARCH_GET","url":"http:\/\/cms.mobile.conduit-services.com\/users\/{provider}\/{skip}\/{take}\/?globalAppId={globalAppId}&q={search_term}&params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"DISCUSSION_DISCUSSIONS_GET","url":"http:\/\/discussion.mobile.conduit-services.com\/discussions\/{globalAppId}\/{userId}","reload_interval_sec":7200,"method":"GET"},{"name":"DISCUSSION_MESSAGES_GET","url":"http:\/\/discussion.mobile.conduit-services.com\/messages\/{discussionId}\/{skip}\/{take}","reload_interval_sec":7200,"method":"GET"},{"name":"DISCUSSION_MESSAGES_SEND_POST","url":"http:\/\/discussion.mobile.conduit-services.com\/messages\/{globalAppId}\/{fromId}","reload_interval_sec":7200,"method":"POST"}],"reload_interval_sec":86400},"maxAge":86399,"serviceUrl":"http:\/\/servicemap.mobile.conduit-services.com\/mobile"},{"data":{"details":{"appHomeUrl":"http:\/\/candylab69.4yourmobile.com"},"globalAppId":"77d1e7b5-7c23-4e05-be4a-3c90dba666fe","icon":"http:\/\/storage.conduit.com\/Mobile\/77\/23\/77d1e7b5-7c23-4e05-be4a-3c90dba666fe\/Images\/92ae5097-531b-4afd-aac7-e41d5b0d2b96.png","id":"d60a6f99-1a09-4b8d-8a39-fd5273ec7e05","label":"AWE 2013","layout":{"colorTheme":{"background":"#00ffffff","buttons":"#ff000000","navTxt":"#FFFFFFFF","contBtxt":"#ffc2c0c2","contBsubTxt":"#FFB4B4B4","contAbg":"#FF000000","hdrBg":"#ff000000","contAhdlTxt":"#ffffffff","navIcn":"#FFFFFFFF","contCsubTxt":"#FFB4B4B4","contBhdlTxt":"#ffffffff","contCbg":"#ff000000","contAsubTxt":"#FFB4B4B4","contAtxt":"#ffc2c0c2","appBg":"#00ffffff","contBbg":"#FF000000","actBtn":"#ffb0b0b0","navBg":"#ff000000","contCtxt":"#FFFFFFFF","contAbrdr":"#ff000000","lnkTxt":"#ffb0b0b0","hdrTxt":"#FFFFFFFF","contChdlTxt":"#FFFFFFFF","contBbrdr":"#FF000000","deviceType":-1,"headers":"#ffffffff","id":2,"displayName":"Crimson","mainText":"#ffb0b0b0","smallText":"#ffc2c0c2"},"layoutType":3,"meta":{"bgImage":"http:\/\/storage.conduit.com\/Mobile\/77\/23\/77d1e7b5-7c23-4e05-be4a-3c90dba666fe\/Images\/31977876-9a96-4d59-832e-72f1e674125a.jpg","culture":null,"header":{"type":1,"content":"http:\/\/storage.conduit.com\/Mobile\/77\/23\/77d1e7b5-7c23-4e05-be4a-3c90dba666fe\/Images\/45af9429-3af9-44d4-8711-748877d09a57.png"},"isRtl":false,"material":0},"template":{"appGeneral":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"appBg"}]}}}},"loadingSmallIcn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAsubTxt"}]},"isBlack":false,"isSimple":false}}},"footer":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000","shadow":{"isInset":false,"x":"0px","y":"-2px","blur":"3px","color":"#99000000"}}}}},"scrnDiv":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000","shadow":{"isInset":false,"x":"3px","y":"0px","blur":"10px","color":"#99000000"}}}},"brdr":{"type":"border","data":{"default":{"right":{"color":"#FF000000","width":"1px"}}}}},"dialog":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#E5C8C8C8"}}},"btn2":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFe4e4e4","location":0},{"color":"#FF8d8d8d","location":1}]},"clicked":{"type":"solid","color":"#FF8d8d8d"},"disabled":{"type":"solid","color":"#33333333"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FFBFBBB8","width":"1px"},"right":{"color":"#FFBFBBB8","width":"1px"},"left":{"color":"#FFBFBBB8","width":"1px"},"top":{"color":"#FFBFBBB8","width":"1px"}},"clicked":{"bottom":{"color":"#FF757575","width":"1px"},"right":{"color":"#FF757575","width":"1px"},"left":{"color":"#FF757575","width":"1px"},"top":{"color":"#FF757575","width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FF5F5B5A","shadow":{"x":"0","y":"1px","blur":"0","color":"#80FFFFFF"}},"selected":{"color":"#CC000000","shadow":{"x":"0","y":"1px","blur":"0","color":"#80FFFFFF"}},"disabled":{"color":"#CCCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF5F5B5A","isBlack":true,"isSimple":true},"clicked":{"type":"solid","color":"#FF464342","isBlack":true,"isSimple":true},"disabled":{"type":"solid","color":"#CCCCCCCC","isBlack":true,"isSimple":true}}}}},"floatBtn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000"},"clicked":{},"disabled":{}}},"brdr":{"type":"border","data":{}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FFFFFFFF","shadow":{"x":"0px","y":"1px","blur":"2px","color":"#E5000000"}},"selected":{"color":"#ffb0b0b0"},"disabled":{"color":"#CCCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FFFFFFFF","isBlack":false,"isSimple":true}}}},"shareViewIcn":{"type":"icon","data":{"default":{"type":"solid","color":"#FFa29f9e","isBlack":true,"isSimple":true}}},"adBar":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.9]}]}}}},"brdr":{"type":"border","data":{"top":{"color":"#FF2a2a2a","width":"1px"}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBhdlTxt"}]}}}}}},"appHeader":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,1.6,1],[1,0.9,1.25,0.92]]}]},"location":0},{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.9,1.4,1],[1,1,1.13,0.95]]}]},"location":0.25},{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,1,1.1,1],[1,1,1.1,1]]}]},"location":0.49},{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,1,1,1],[1,1,1,1]]}]},"location":0.5},{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,1,0.8,1],[1,1,0.8,0.9]]}]},"location":0.73},{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,1,0.7,1],[1,0.7,0.5,1]]}]},"location":1}],"shadow":{"isInset":false,"x":"0px","y":"1px","blur":"3px","color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,0.3,0.8],[1,0.7,0.2,1]]}]}}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.5,1.05,1],[1,0.7,0.6,0.9]]}]},"width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"hdrTxt"}]}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.9,0.7,0.4],[1,0.9,0.5,0.4]]}]}},"clicked":{"type":"solid","color":"#4C000000","shadow":{"isInset":true,"x":"-1px","y":"1px","blur":"2px","color":"#66000000"}},"selected":{"type":"solid","color":"#4C000000","shadow":{"isInset":true,"x":"-1px","y":"1px","blur":"2px","color":"#66000000"}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrTxt"}]},"isBlack":false,"isSimple":true}}}}},"navBar":{"item":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,0.8,1.3,1],[1,0.9,1.25,0.95]]}]},"location":0},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,0.9,1.2,1],[1,1,1,0.95]]}]},"location":0.18},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,1,1],[1,1,0.7,1]]}]},"location":0.55},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.8,1],[1,1,0.5,1]]}]},"location":0.84},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.7,1],[1,0.6,0.4,1]]}]},"location":1}]},"clicked":{"type":"gradient","orientation":"vertical","color":[{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.5,0.7],[1,0.6,0.5,1]]}]},"location":0},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.5,0.7],[1,1,0.35,1]]}]},"location":0.18},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.4,0.7],[1,1,0.3,1]]}]},"location":0.55},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,0.8,0.2,0.7],[1,1,0.4,1]]}]},"location":0.84},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,0.5,0.1,0.7],[1,0.9,0.5,1]]}]},"location":1}],"shadow":{"isInset":true,"x":"0px","y":"0px","blur":"2px","color":"#FF000000"}},"selected":{"type":"gradient","orientation":"vertical","color":[{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.5,0.7],[1,0.6,0.5,1]]}]},"location":0},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.5,0.7],[1,1,0.35,1]]}]},"location":0.18},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.4,0.7],[1,1,0.3,1]]}]},"location":0.55},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,0.8,0.2,0.7],[1,1,0.4,1]]}]},"location":0.84},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,0.5,0.1,0.7],[1,0.9,0.5,1]]}]},"location":1}],"shadow":{"isInset":true,"x":"0px","y":"0px","blur":"2px","color":"#FF000000"}}}},"bubbleBg":{"type":"background","data":{"default":{},"clicked":{}}},"brdr":{"type":"border","data":{"default":{},"clicked":{}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"navTxt","fn":"hsla","params":[1,1,1,0.8]}]}},"clicked":{"color":{"_replace":[{"param":"navTxt"}]}},"selected":{"color":{"_replace":[{"param":"navTxt"}]}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"navIcn"}]},"isBlack":false,"isSimple":true}}}}},"navGrid":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#33000000"}}},"btn":{"bg":{"type":"background","data":{"default":{},"clicked":{}}},"brdr":{"type":"border","data":{"default":{},"clicked":{}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"navTxt","fn":"hsla","params":[1,1,1,0.8]}]}},"clicked":{"color":{"_replace":[{"param":"navTxt"}]}}}}}},"navList":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#33000000"}}},"item":{"bg":{"type":"background","data":{"default":{},"clicked":{"type":"solid","color":"#40000000"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#4c2a2a2a","width":"1px"}},"clicked":{}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"navTxt"}]}},"clicked":{}}}}},"tabBar":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#8C000000"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FF000000","width":"1px"}}}},"item":{"bg":{"type":"background","data":{"default":{},"clicked":{}}},"bubble":{"bg":{"type":"background","data":{"default":{},"clicked":{"type":"solid","color":"#66000000"},"selected":{"type":"solid","color":"#FF000000"}}},"brdr":{"type":"border","data":{"default":{},"clicked":{},"selected":{}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}},"clicked":{"color":"#FFFFFFFF"},"selected":{"color":"#FFFFFFFF"}}}},"brdr":{"type":"border","data":{"default":{},"clicked":{}}}}},"tab2Bar":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"horizontal","color":[{"color":"#DC000000","location":0},{"color":"#CC2A2A2A","location":0.5},{"color":"#DC000000","location":1}],"shadow":[{"isInset":true,"x":"0px","y":"-1px","blur":"0px","color":{"_replace":[{"param":"lnkTxt"}]}},{"isInset":true,"x":"0px","y":"1px","blur":"0px","color":{"_replace":[{"param":"lnkTxt"}]}},{"isInset":true,"x":"0px","y":"1px","blur":"6px","color":"#E6000000"},{"isInset":true,"x":"0px","y":"-1px","blur":"6px","color":"#E6000000"}]}}},"triangle":{"type":"border","data":{"default":{"top":{"width":"6px","color":{"_replace":[{"param":"contAtxt"}]}},"left":{"width":"8px","color":"#00000000"},"right":{"width":"8px","color":"#00000000"},"bottom":{"width":"6px","color":{"_replace":[{"param":"contAtxt"}]}}}}},"item":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000"},"selected":{"type":"solid","color":"#00000000"}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}},"selected":{"color":{"_replace":[{"param":"contAtxt"}]}}}}}},"contTypeA":{"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAhdlTxt"}]}}}},"hdlTxtBrdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":"#FFCCCCCC"},"bottom":{"width":"1px","color":"#FFCCCCCC"}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAtxt"}]}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAsubTxt"}]}}}},"lnkTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAtxt"}]},"isBlack":false,"isSimple":true}}},"subIcn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAsubTxt"}]},"isBlack":false,"isSimple":false}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAbg"}]}},"clicked":{"type":"solid","color":"#FF000000"},"selected":{"type":"solid","color":"#FF2a2a2a"}}},"subBg":{"type":"background","data":{"default":{"type":"solid","color":"#FF3c3c3c"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contAbrdr"}]},"width":"1px"}},"clicked":{},"selected":{"top":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,0.5,1]}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,0.5,1]}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,0.5,1]}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,0.5,1]}]}}}}},"classicItem":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAbg"}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"contAbg","fn":"hsla","params":[1,1,1,0.88]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"contAbg","fn":"hsla","params":[1,1,1,0.82]}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contAbrdr"}]},"width":"1px"}},"clicked":{},"selected":{"top":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,1.3,1]}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,1.3,1]}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,1.3,1]}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,1.3,1]}]}}}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFe4e4e4","location":0},{"color":"#FF8d8d8d","location":1}],"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"5px","color":"#FF000000"}},"clicked":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFcacaca","location":0},{"color":"#FFf1f1f1","location":1}],"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"2px","color":"#cc000000"}},"disabled":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFe7e7e7","location":0},{"color":"#FFE6E6E6","location":1}]}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FFBFBBB8","width":"1px"},"right":{"color":"#FFBFBBB8","width":"1px"},"left":{"color":"#FFBFBBB8","width":"1px"},"top":{"color":"#FFBFBBB8","width":"1px"}},"clicked":{"bottom":{"color":"#FF757575","width":"1px"},"right":{"color":"#FF757575","width":"1px"},"left":{"color":"#FF757575","width":"1px"},"top":{"color":"#FF757575","width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FF5F5B5A","shadow":{"x":"0","y":"1px","blur":"0","color":"#80FFFFFF"}},"selected":{"color":"#CC000000","shadow":{"x":"0","y":"1px","blur":"0","color":"#80FFFFFF"}},"disabled":{"color":"#ffCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF2a2a2a","isBlack":true,"isSimple":false}}}},"actBtn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"actBtn","fn":"t_hsla","params":[0.5,[1,1,1.3,1],[1,1,0.5,1]]}]}},"disabled":{"type":"solid","color":"#33333333"}}},"brdr":{"type":"border","data":{}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FFFFFFFF"},"selected":{"color":"#FFFFFFFF"},"disabled":{"color":"#ffCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FFFFFFFF","isBlack":false,"isSimple":true}}}},"contentSession":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAhdlTxt","fn":"hsla","params":[1,1,1,0.88]}]}}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg"}]}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg","fn":"hsla","params":[1,1,1,0.69]}]}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg","fn":"hsla","params":[1,1,1,0.49]}]}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000","shadow":[{"isInset":false,"x":"0px","y":"0px","blur":"0px 1px","color":"#66000000"},{"isInset":true,"x":"1px","y":"1px","blur":"0px","color":"#4Dffffff"}]}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF000000","isBlack":true,"isSimple":true}}}}},"contentSession2":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"lnkTxt","fn":"hsla","params":[1,1,1,0.88]}]}}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg"}]}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg","fn":"hsla","params":[1,1,1,0.69]}]}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg","fn":"hsla","params":[1,1,1,0.49]}]}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000","shadow":[{"isInset":false,"x":"1px","y":"1px","blur":"0px","color":"#66ffffff"},{"isInset":true,"x":"1px","y":"1px","blur":"3px","color":"#99000000"}]}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF000000","isBlack":true,"isSimple":true}}}}},"calBoxBrdr1":{"type":"border","data":{"default":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","style":"dotted","color":{"_replace":[{"param":"contBbrdr","fn":"hsla","params":[1,1,1,0.7]}]}}}}},"calBoxBrdr2":{"type":"border","data":{"default":{"top":{"width":"1px","style":"dotted","color":{"_replace":[{"param":"contBbrdr","fn":"hsla","params":[1,1,1,0.7]}]}},"bottom":{"width":"1px","style":"dotted","color":{"_replace":[{"param":"contBbrdr","fn":"hsla","params":[1,1,1,0.7]}]}}}}}},"contTypeB":{"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBhdlTxt"}]}}}},"hdlTxtBrdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":{"_replace":[{"param":"contBhdlTxt","fn":"hsla","params":[1,1,1,0.2]}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBhdlTxt","fn":"hsla","params":[1,1,1,0.2]}]}}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBtxt"}]}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBsubTxt"}]}}}},"lnkTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBtxt"}]},"isBlack":false,"isSimple":true}}},"subIcn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBsubTxt"}]},"isBlack":false,"isSimple":true}}},"hdlIcn":{"type":"server_icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBhdlTxt"}]},"isBlack":false,"isSimple":true}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.88]}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.8]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.8]}]}}}},"subBg":{"type":"background","data":{"default":{"type":"solid","color":"#FF3c3c3c"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}},"clicked":{"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}},"selected":{"top":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}}}},"bubbleItem":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.88]}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.8]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBbg"}]},"shadow":[{"isInset":false,"x":"0px","y":"0px","blur":"1px","color":"#FF2a2a2a"},{"isInset":false,"x":"0px","y":"0px","blur":"2px","color":"#FF2a2a2a"},{"isInset":false,"x":"0px","y":"0px","blur":"2px","color":"#FF2a2a2a"},{"isInset":false,"x":"0px","y":"0px","blur":"2px","color":"#FF2a2a2a"}]}}},"brdr":{"type":"border","data":{}}},"headerItem":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.82]}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.88]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,1]}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}}}}},"trackItem":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.88]}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.82]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBbg"}]}}}},"brdr":{"type":"border","data":{"default":{"top":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}},"clicked":{"top":{"color":{"_replace":[{"param":"hdrBg"}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"hdrBg"}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"hdrBg"}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"hdrBg"}]},"width":"1px"}},"selected":{"top":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}}}}},"fullPage":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.9]}]}}}}},"fullPage2":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.1]}]}}}}},"sep":{"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr","fn":"hsla","params":[1,1,0.6,1]}]}}}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFFFFFFF","location":0},{"color":"#FFE6E6E6","location":1}]},"clicked":{"type":"gradient","orientation":"vertical","color":[{"color":"#ffdddddd","location":0},{"color":"#ffcccccc","location":1}]},"disabled":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFe7e7e7","location":0},{"color":"#FFE6E6E6","location":1}]}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FFBFBBB8","width":"1px"},"right":{"color":"#FFBFBBB8","width":"1px"},"left":{"color":"#FFBFBBB8","width":"1px"},"top":{"color":"#FFBFBBB8","width":"1px"}},"clicked":{"bottom":{"color":"#FF757575","width":"1px"},"right":{"color":"#FF757575","width":"1px"},"left":{"color":"#FF757575","width":"1px"},"top":{"color":"#FF757575","width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FF5F5B5A","shadow":{"x":"0","y":"1px","blur":"0","color":"#80FFFFFF"}},"selected":{},"disabled":{"color":"#CCCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF5F5B5A","isBlack":true,"isSimple":false},"clicked":{"type":"solid","color":"#FF464342","isBlack":true,"isSimple":false},"disabled":{"type":"solid","color":"#CCCCCCCC","isBlack":true,"isSimple":false}}}},"actBtn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"actBtn","fn":"t_hsla","params":[0.5,[1,1,1.3,1],[1,1,0.5,1]]}]}},"disabled":{"type":"solid","color":"#33333333"}}},"brdr":{"type":"border","data":{}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FFFFFFFF"},"selected":{"color":"#FFFFFFFF"},"disabled":{"color":"#ffCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FFFFFFFF","isBlack":false,"isSimple":true}}}}},"contTypeC":{"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contChdlTxt"}]}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contCtxt"}]}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contCsubTxt"}]}}}},"lnkTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contCbg","fn":"t_hsla","params":[0.5,[1,1,0.6,0.9],[1,1,0.3,0.9]]}]}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"actBtn","fn":"t_hsla","params":[0.5,[1,1,1.3,1],[1,1,0.5,1]]}]}},"disabled":{"type":"solid","color":"#33333333"}}},"brdr":{"type":"border","data":{}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FFFFFFFF"},"selected":{"color":"#FFFFFFFF"},"disabled":{"color":"#ffCCCCCC"}}}}},"form":{"element":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFe4e4e4","location":0},{"color":"#FF8d8d8d","location":1}]},"mandatory":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFFFFFFF","location":0},{"color":"#FFFF0000","location":1}]}}},"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":"#FFC1C1C2"},"bottom":{"width":"1px","color":"#FFC1C1C2"},"left":{"width":"1px","color":"#FFC1C1C2"},"right":{"width":"1px","color":"#FFC1C1C2"}},"mandatory":{"top":{"color":"#FFB60021","width":"1px"},"bottom":{"color":"#FFB60021","width":"1px"},"left":{"color":"#FFB60021","width":"1px"},"right":{"color":"#FFB60021","width":"1px"}}}},"txt":{"type":"text","data":{"default":{"color":"#FF111111"},"watermark":{"color":"#FF888888"},"mandWatermark":{"color":"#FFBB0000"}}}},"dropdown":{"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF2a2a2a","isBlack":true,"isSimple":true}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":"#22000000"}}},"brdr":{"type":"border","data":{"default":{"left":{"color":"#FFC1C1C2","width":"1px"},"right":{"color":"#FFC1C1C2","width":"1px"}}}}},"input":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF"},"disabled":{"type":"solid","color":"#FFCCCCCC"},"mandatory":{"type":"solid","color":"#FFFFDDDD"}}},"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":"#FFC1C1C2"},"bottom":{"width":"1px","color":"#FFC1C1C2"},"left":{"width":"1px","color":"#FFC1C1C2"},"right":{"width":"1px","color":"#FFC1C1C2"}},"diabled":{},"mandatory":{"top":{"color":"#FFB60021","width":"1px"},"bottom":{"color":"#FFB60021","width":"1px"},"left":{"color":"#FFB60021","width":"1px"},"right":{"color":"#FFB60021","width":"1px"}}}},"txt":{"type":"text","data":{"default":{"color":"#FF000000"},"watermark":{"color":"#33000000"},"mandWatermark":{"color":"#FFFF0000"}}}},"checkBox":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#7f2a2a2a","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":"#FF000000"}},"selected":{"type":"solid","color":"#7f2a2a2a","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":"#FF000000"}},"mandatory":{"type":"solid","color":"#7f2a2a2a","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":"#FF000000"}}}},"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":"#FF9f9f9f"},"bottom":{"width":"1px","color":"#FF9f9f9f"},"left":{"width":"1px","color":"#FF9f9f9f"},"right":{"width":"1px","color":"#FF9f9f9f"}},"selected":{"top":{"width":"1px","color":"#FF9f9f9f"},"bottom":{"width":"1px","color":"#FF9f9f9f"},"left":{"width":"1px","color":"#FF9f9f9f"},"right":{"width":"1px","color":"#FF9f9f9f"}},"mandatory":{"top":{"color":"#FFB60021","width":"1px"},"bottom":{"color":"#FFB60021","width":"1px"},"left":{"color":"#FFB60021","width":"1px"},"right":{"color":"#FFB60021","width":"1px"}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrTxt"}]},"isBlack":false,"isSimple":true},"selected":{"type":"solid","color":"#FFFFFFFF","isBlack":false,"isSimple":true}}}}},"audioPlayer":{"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"hdrTxt"}]}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"hdrTxt","fn":"hsla","params":[1,1,1,0.8]}]}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrTxt"}]},"isBlack":false,"isSimple":true}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg","fn":"hsla","params":[1,1,0.3,1]}]}}}},"bgMini":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg","fn":"hsla","params":[1,1,0.3,1]}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.5,0.7,0.9],[1,0.7,0.6,0.9]]}]},"width":"1px"}}}},"seekBar":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,1.3,1],[1,0.7,0.7,1]]}]},"shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,0.001,1],[1,0.7,0.001,1]]}]}}}}},"brdr":{"type":"border","data":{"default":{"top":{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,1.1,1],[1,0.7,0.7,1]]}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,1.8,1],[1,0.7,0.7,1]]}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,1.8,1],[1,0.7,0.7,1]]}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,1.1,1],[1,0.7,0.7,1]]}]},"width":"1px"}}}},"seekFill":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrTxt"}]},"shadow":{"isInset":true,"x":"0px","y":"1px","blur":"1px","color":"#ff000000"}}}}}},"liveChat":{"bubbleMe":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.88]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}}}},"triangle":{"type":"border","data":{"default":{"ltrLeft":{"color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.88]}]},"width":"10px"},"bottom":{"color":"#00000000","width":"10px"},"top":{"color":"#00000000","width":"10px"}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBhdlTxt"}]},"shadow":{"x":"1px","y":"1px","blur":"0","color":"#CCFFFFFF"}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBsubTxt"}]},"shadow":{"x":"1px","y":"1px","blur":"1px","color":"#FFFFFFFF"}}}}},"bubbleOther":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAbg"}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}}}},"triangle":{"type":"border","data":{"default":{"ltrRight":{"color":{"_replace":[{"param":"contAbg"}]},"width":"10px"},"bottom":{"color":"#00000000","width":"10px"},"top":{"color":"#00000000","width":"10px"}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAhdlTxt"}]},"shadow":{"x":"1px","y":"1px","blur":"0px","color":"#CCFFFFFF"}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBsubTxt"}]},"shadow":{"x":"1px","y":"1px","blur":"0px","color":"#FFFFFFFF"}}}}}},"facebook":{"txt":{"type":"text","data":{"default":{"color":"#FFced7e7"}}},"bubble":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FF1d1d1d"}}},"brdr":{"type":"border","data":{"default":{"left":{"color":"#FF2a2a2a","width":"1px"},"right":{"color":"#FF2a2a2a","width":"1px"},"bottom":{"color":"#FF2a2a2a","width":"1px"},"top":{"color":"#FF2a2a2a","width":"1px"}}}},"triangle":{"type":"border","data":{"default":{"left":{"color":"#00000000","width":"4px"},"right":{"color":"#00000000","width":"4px"},"bottom":{"color":"#FF1d1d1d","width":"4px"}}}},"triangleBrdr":{"type":"border","data":{"default":{"left":{"color":"#00000000","width":"6px"},"right":{"color":"#00000000","width":"6px"},"bottom":{"color":"#FF2a2a2a","width":"6px"}}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000"},"clicked":{"type":"solid","color":"#FFCED7E7"},"disabled":{"type":"solid","color":"#33333333"}}},"brdr":{"type":"border","data":{"default":{"left":{"color":"#00000000","width":"1px"},"right":{"color":"#00000000","width":"1px"},"bottom":{"color":"#00000000","width":"1px"},"top":{"color":"#00000000","width":"1px"}},"clicked":{"bottom":{"color":"#FF2a2a2a","width":"1px"},"right":{"color":"#FF2a2a2a","width":"1px"},"left":{"color":"#FF2a2a2a","width":"1px"},"top":{"color":"#FF2a2a2a","width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FF42599C"},"selected":{"color":"#FF42599C"},"disabled":{"color":"#CCCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF5F5B5A","isBlack":true,"isSimple":true},"clicked":{"type":"solid","color":"#FF464342","isBlack":true,"isSimple":true},"disabled":{"type":"solid","color":"#CCCCCCCC","isBlack":true,"isSimple":true}}}}},"events":{"calPict":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.78]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"2px","color":"#FF000000"}}}}}},"comment":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF"}}},"panel":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFF0F0F0"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FFCCCCCC","width":"1px"}}}}}},"images":{"image1":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FF000000","width":"1px"},"top":{"color":"#FF000000","width":"1px"},"right":{"color":"#FF000000","width":"1px"},"left":{"color":"#FF000000","width":"1px"}}}}},"image2":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FF000000","width":"1px"},"top":{"color":"#FF000000","width":"1px"},"right":{"color":"#FF000000","width":"1px"},"left":{"color":"#FF000000","width":"1px"}}}}},"imgBtn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#FF000000"}},"clicked":{"type":"solid","color":"#FFFFFFFF"},"selected":{"type":"solid","color":"#FFFFFFFF"}}},"overlayBg":{"type":"background","data":{"default":{"type":"solid","color":"#99000000"},"clicked":{"type":"solid","color":"#00000000"},"selected":{"type":"solid","color":"#00000000"}}},"brdr":{"type":"border","data":{"default":{"left":{"color":"#ffffffff","width":"3px"},"right":{"color":"#ffffffff","width":"3px"},"bottom":{"color":"#ffffffff","width":"3px"},"top":{"color":"#ffffffff","width":"3px"}},"clicked":{"bottom":{"color":"#00000000","width":"0px"},"right":{"color":"#00000000","width":"0px"},"left":{"color":"#00000000","width":"0px"},"top":{"color":"#00000000","width":"0px"}},"selected":{"bottom":{"color":"#00000000","width":"0px"},"right":{"color":"#00000000","width":"0px"},"left":{"color":"#00000000","width":"0px"},"top":{"color":"#00000000","width":"0px"}}}}}}}},"meta":{"bgImage":"http:\/\/storage.conduit.com\/Mobile\/77\/23\/77d1e7b5-7c23-4e05-be4a-3c90dba666fe\/Images\/31977876-9a96-4d59-832e-72f1e674125a.jpg","culture":"en-US","header":{"type":1,"content":"http:\/\/storage.conduit.com\/Mobile\/77\/23\/77d1e7b5-7c23-4e05-be4a-3c90dba666fe\/Images\/45af9429-3af9-44d4-8711-748877d09a57.png"},"isRtl":false,"material":0},"name":"AWE 2013","pages":[{"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/external\/?src=http%3A%2F%2Fstorage.conduit.com%2FMobile%2F77%2F23%2F77d1e7b5-7c23-4e05-be4a-3c90dba666fe%2FImages%2F43e2b3ff-8667-4478-b3f3-3ffbed0c0298.png","id":"1b5e3a19-ef6d-428b-a98d-8f7222951448","label":"Home","meta":{"items":[{"about":"Augmented World Expo (AWE), now in its 4th year, is the world’s largest gathering of technology professionals passionate about solving real world problems in the Augmented World.","description":"AWE 2013 will be held at the Santa Clara Convention Center, on June 4-5, 2013.","imgUrl":"http:\/\/storage.conduit.com\/Mobile\/77\/23\/77d1e7b5-7c23-4e05-be4a-3c90dba666fe\/Images\/0cdace74-c899-4eef-a9eb-01c12a9b7d2b.jpg","genere":null,"list":[{"title":"{$HtmlTextAboutUsItemTitleMission}","icon":"http:\/\/storage.conduit.com\/Images\/Mobile\/controlpanel\/AboutUs\/icons_white\/Mission.png","iconBlack":"http:\/\/storage.conduit.com\/Images\/Mobile\/controlpanel\/AboutUs\/icons_black\/Mission.png","dataType":"text","data":{"text":"To help start-ups, developers, mobile and hardware companies along with organizations within entertainment, media, education, healthcare, government, tourism, gather to focus on evolving the much hyped technology into a productive, sustainable and entertaining new medium. "}},{"title":"{$HtmlTextAboutUsItemTitleAwards}","icon":"http:\/\/storage.conduit.com\/Images\/Mobile\/controlpanel\/AboutUs\/icons_white\/Awards.png","iconBlack":"http:\/\/storage.conduit.com\/Images\/Mobile\/controlpanel\/AboutUs\/icons_black\/Awards.png","dataType":"text","data":{"text":"The Auggies is the industry’s most prestigious award ceremony and will highlight the winners of this year’s best products in various categories. \u000d\u000a\u000d\u000aThe best products nominated will demonstrate their innovations during the evening. Categories and nominated products: to be announced in a few weeks."}},{"title":"{$HtmlTextAboutUsItemTitleCompanyOverview}","icon":"http:\/\/storage.conduit.com\/Images\/Mobile\/controlpanel\/AboutUs\/icons_white\/CompanyOverview.png","iconBlack":"http:\/\/storage.conduit.com\/Images\/Mobile\/controlpanel\/AboutUs\/icons_black\/CompanyOverview.png","dataType":"text","data":{"text":"The Augmented World Expo (AWE), is the largest global event dedicated to advancing augmented reality. The Fourth Annual event will be held at Santa Clara Convention Center, June 4-5, 2013."}}],"buttons":{"webSite":"http:\/\/augmentedworldexpo.com\/","facebook":"http:\/\/www.facebook.com\/augmentedrealityevent","twitter":"https:\/\/twitter.com\/arealityevent","email":"info@augmentedWorldExpo.com"},"name":"The world is the platform"}],"pageLayout":-1,"layout":{"meta":{"bgImage":"http:\/\/storage.conduit.com\/Mobile\/77\/23\/77d1e7b5-7c23-4e05-be4a-3c90dba666fe\/Images\/1c0157a1-ba9d-481b-b2eb-85539f4aa9e4.jpg"}}},"minVersion":"2.0.0.0","type":"5a8368df-6ebd-c0f2-2d82-e173c1f33d40","version":null},{"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/external\/?src=http%3A%2F%2Fstorage.conduit.com%2FMobile%2F77%2F23%2F77d1e7b5-7c23-4e05-be4a-3c90dba666fe%2FImages%2F944f73d1-adaa-4735-b5dd-de7bfd116f04.png","id":"bada3ce6-4d0d-4863-a423-f3909d13f824","label":"Agenda","meta":{"pageLayout":-1,"items":[{"id":"0bac7883-c71d-90cb-ae6f-f0b245634ced","title":"tab1","params":{"id":"ce0f304e-4f75-64a0-62d3-c4ff8bc72aae","type":"custom","version":"{ce0f304e-4f75-64a0-62d3-c4ff8bc72aae}","ranges":[{"endDate":1370476799,"startDate":1370217600}]}}],"layout":null},"minVersion":"2.8.0.0","type":"f61f12d6-df0c-465c-b3ba-70fb8f3894a4","version":null},{"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/external\/?src=http%3A%2F%2Fstorage.conduit.com%2FMobile%2F77%2F23%2F77d1e7b5-7c23-4e05-be4a-3c90dba666fe%2FImages%2Fa37986a7-cc52-45ec-a8c9-2a11b7e53a38.png","id":"0b96c058-60f7-4db6-8816-dbda97c28063","label":"Speakers","meta":{"pageLayout":-1,"items":[{"id":"be510202-60f7-c073-9228-223cc4d5da4d","params":{"type":"custom","id":"ce0f304e-4f75-64a0-62d3-c4ff8bc72aae","version":"{ce0f304e-4f75-64a0-62d3-c4ff8bc72aae}","ranges":{}}}],"layout":null},"minVersion":"2.8.0.0","type":"ff4532d2-9137-8da2-f97f-be8b3ddd08e4","version":null},{"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/external\/?src=http%3A%2F%2Fstorage.conduit.com%2FMobile%2F77%2F23%2F77d1e7b5-7c23-4e05-be4a-3c90dba666fe%2FImages%2F0d9f3ab4-2bb6-4d08-8abd-07eeedd26c72.png","id":"85f63c37-034a-43b2-82a4-445ec8569923","label":"Get Your Tickets","meta":{"pageLayout":-1,"notes":[{"id":"3b3aa2f0-b929-1f0b-61c2-f1f394cfb427","html":"<p style=\"text-align: center;\"><strong><a href=\"http:\/\/augmentedworldexpo.com\/register\/\" target=\"_self\"><img alt=\"''\" height=\"257\" src=\"http:\/\/augmentedworldexpo.com\/wp-content\/uploads\/2013\/04\/2-Day-pass-2.jpg\" width=\"170\" \/><\/a><\/strong><\/p>\u000d\u000a<p><span><br \/><\/span><\/p>"}],"layout":null},"minVersion":"0.0.0.0","type":"27f91d0a-42c0-48fa-90a8-7138641ddecf","version":null},{"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/external\/?src=http%3A%2F%2Fstorage.conduit.com%2FMobile%2F77%2F23%2F77d1e7b5-7c23-4e05-be4a-3c90dba666fe%2FImages%2F1f604f1d-8b99-4da7-8bad-7467c75a8cc4.png","id":"80e015d2-74a5-401c-9c99-0507bdf0c0b8","label":"Calendar","meta":{"pageLayout":-1,"items":[{"title":"Calendar","params":{"id":"p3vh8ve75dltdkdu770luu1q7f8s2j74@import.calendar.google.com","type":2,"extraInfo":{}},"views":[{"title":"{$HtmlTextEventsFutureEvents}","since":"$date","until":"$date+6m","extraInfo":{"order":"asc"}},{"title":"{$HtmlTextEventsPastEvents}","since":"$date-2m","until":"$date","extraInfo":{"order":"desc"}}],"id":"c7da54bf-5aa9-0501-4bd4-36e1ee2dc1fc","feed":"p3vh8ve75dltdkdu770luu1q7f8s2j74@import.calendar.google.com"}],"layout":null},"minVersion":"2.0.0.0","type":"1002937d-8b19-40de-9df5-ba0d1ea2fbb2","version":null},{"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/external\/?src=http%3A%2F%2Fstorage.conduit.com%2FMobile%2F77%2F23%2F77d1e7b5-7c23-4e05-be4a-3c90dba666fe%2FImages%2F01135f2d-8b56-49ef-9249-d5e27f41c79d.png","id":"9d0a68e2-d5dc-42be-94af-a7e15c591e9c","label":"Facebook","meta":{"channels":[{"id":"8e255aac-efd9-40af-b74a-49abbbbc5ec3","user":"augmentedrealityevent","title":"AWE 2013","postsSource":"feed"},{"id":"b1f5e99d-c570-35ce-0b86-4b33b39c5724","user":"candylab","postsSource":"feed","title":"Candy Lab"}],"pageLayout":0,"layout":null},"minVersion":"0.0.0.0","type":"df7d11f3-233c-4d49-8f2a-d1886e07c641","version":null},{"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/external\/?src=http%3A%2F%2Fstorage.conduit.com%2FMobile%2F77%2F23%2F77d1e7b5-7c23-4e05-be4a-3c90dba666fe%2FImages%2Fce99b569-7fd6-4a07-abb3-f1c31be8db71.png","id":"8659d66f-c692-4146-a2b6-0ad715aeb05f","label":"Twitter","meta":{"feeds":[{"id":"9ea7037e-fa73-42e6-a7d9-697c0495a53c","type":"0","userName":"ARealityEvent","params":{},"title":"AWE 2013"},{"id":"5d98ee47-4855-4b32-fa97-2f5d1b2110a6","title":"Candy Lab","type":"0","userName":"Chooseawinner","params":{}}],"pageLayout":0,"layout":null},"minVersion":"0.0.0.0","type":"a77583ef-758f-45f3-9ad1-9704d82a2154","version":null},{"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/external\/?src=http%3A%2F%2Fstorage.conduit.com%2FMobile%2F03%2Ffc%2F03c873e4-21fc-48eb-8792-f76d20f0afcb%2FImages%2F08e3db23-1954-4e0a-88e2-c5ccf3fedfe1.png","id":"4158676d-6dca-46ba-8094-abce40f52a9e","label":"Play Cachetown","meta":{"pageLayout":-1,"items":[{"link":"http:\/\/www.candylab.com\/cachetown\/","openInExternalBrowser":false}],"layout":null},"minVersion":"2.7.0.5","type":"c54d24ef-faf5-45dd-8859-85e3ebe7cecf","version":null},{"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/external\/?src=http%3A%2F%2Fstorage.conduit.com%2FMobile%2F77%2F23%2F77d1e7b5-7c23-4e05-be4a-3c90dba666fe%2FImages%2Fa19abf5f-53ea-47f1-b8c7-bea64bf8610c.png","id":"6f9d8677-d5d6-4e9f-b183-d73dd2c4ebd9","label":"Auggie Awards","meta":{"pageLayout":-1,"notes":[{"id":"e67ccb1e-859d-57fb-d09e-0f042f76ea7f","html":"<p><img alt=\"Auggie Awards | AWE 2013\" height=\"307\" src=\"http:\/\/augmentedworldexpo.com\/wp-content\/uploads\/2013\/04\/Auggie-3-sides-mid.jpg\" style=\"vertical-align: middle;\" width=\"614\" \/><\/p>\u000d\u000a<p style=\"font-family: Helvetica, Arial, sans-serif; outline: none; margin: 0px 0px 12px; padding: 0px; border: 0px; line-height: 19px; vertical-align: baseline; color: #fff; background-color: #000;\"><em style=\"outline: none; margin: 0px; padding: 0px; border: 0px; vertical-align: baseline;\">The Auggie: One of a kind hand made art sculpture by artist&nbsp;<a href=\"http:\/\/pookatak.com\/\" style=\"font-family: inherit; outline: none; margin: 0px; padding: 0px; border: 0px; font-size: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline; text-decoration: none; -webkit-transition: color 0.12s ease-out; transition: color 0.12s ease-out; color: #2b82ae;\">Sigal Arad Inbar<\/a><\/em><\/p>\u000d\u000a<p style=\"font-family: Helvetica, Arial, sans-serif; outline: none; margin: 0px 0px 12px; padding: 0px; border: 0px; line-height: 19px; vertical-align: baseline; color: #fff; background-color: #000;\">AWE 2013 is extending the 4th Auggie Award&trade;&nbsp;Competition with new exciting categories.<\/p>\u000d\u000a<p style=\"font-family: Helvetica, Arial, sans-serif; outline: none; margin: 0px 0px 12px; padding: 0px; border: 0px; line-height: 19px; vertical-align: baseline; color: #333333; background-color: #000;\">Here&rsquo;s the full download on Why, What, Which, When, Where, Who and How&hellip;<\/p>\u000d\u000a<p style=\"font-family: Helvetica, Arial, sans-serif; outline: none; margin: 0px 0px 12px; padding: 0px; border: 0px; line-height: 19px; vertical-align: baseline; color: #fff; background-color: #000;\"><strong style=\"font-family: inherit; outline: none; margin: 0px; padding: 0px; border: 0px; font-size: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;\">Looking forward to your AWEsome submissions by the deadline on May 15th!&nbsp;<\/strong>&nbsp;<\/p>\u000d\u000a<p style=\"font-family: Helvetica, Arial, sans-serif; outline: none; margin: 0px 0px 12px; padding: 0px; border: 0px; line-height: 19px; vertical-align: baseline; color: #fff; background-color: #000;\">Click <a href=\"http:\/\/augmentedworldexpo.com\/auggies\/\" target=\"_self\" title=\"Auggies Webpage \">here<\/a> to learn more!&nbsp;<\/p>"}],"layout":null},"minVersion":"0.0.0.0","type":"27f91d0a-42c0-48fa-90a8-7138641ddecf","version":null},{"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/external\/?src=http%3A%2F%2Fstorage.conduit.com%2FMobile%2F77%2F23%2F77d1e7b5-7c23-4e05-be4a-3c90dba666fe%2FImages%2F78fd3838-fb59-468a-92e4-4068dc70bb48.png","id":"f341b6f1-9bcf-4f4d-b2f2-833855b939e3","label":"Pictures","meta":{"pageLayout":-1,"feeds":[{"id":"7a3ea18f-5f9c-5274-8010-52d891203ed0","type":"livealbum","title":"AWE Social Pics","userName":"c6d18796-899a-4323-9fa8-024f57b5a0bd","params":{"groupId":"03c873e4-21fc-48eb-8792-f76d20f0afcb"}}],"layout":null},"minVersion":"2.8.0.0","type":"26ae8ccc-5464-7979-4fdf-3a13f166ffff","version":null},{"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/external\/?src=http%3A%2F%2Fstorage.conduit.com%2FMobile%2F77%2F23%2F77d1e7b5-7c23-4e05-be4a-3c90dba666fe%2FImages%2F0f0c95b6-6cf6-47a9-8f2e-f6fafe7ca5b2.png","id":"eeff45dd-622d-457b-b486-3520f4a5eef6","label":"Videos","meta":{"pageLayout":-1,"items":[{"title":"Playlist","params":{"type":3,"className":"youtube","icon":"\/Images\/Providers\/Video\/small_icon_3.png","params":{"isOpenSearch":true},"youtube":{"type":"uploads","sort":"published","query":"AugmentedRealityOrg"},"url":"http:\/\/gdata.youtube.com\/feeds\/api\/users\/AugmentedRealityOrg\/uploads\/?v=2&format=5&orderby=published"},"id":"ac18c5ba-fff5-be77-ce1f-e11add4ef891"}],"layout":null},"minVersion":"2.0.0.0","type":"4680c3f3-e767-4ebf-b112-9ba769c3ff2a","version":null},{"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/external\/?src=http%3A%2F%2Fstorage.conduit.com%2FMobile%2F77%2F23%2F77d1e7b5-7c23-4e05-be4a-3c90dba666fe%2FImages%2Ffadbb11a-642f-4454-a8fa-74cea25961f9.png","id":"7cc4e012-f5d0-42ff-b775-23c2c0dc6108","label":"Contact Us","meta":{"pageLayout":0,"items":[{"id":"4bbd3b59-1d25-941b-ca23-5c56520c26ca","address":"39400 Woodward Avenue Suite 101\u000d\u000aBloomfield Hills MI 48304\u000d\u000aUSA","url":"http:\/\/augmentedworldexpo.com","urlTitle":"AWE 2013 will be held at the Santa Clara Convention Center, on June 4-5, 2013","mail":"info@augmentedWorldExpo.com","phone":"(571) 293-2013 ","header":"Contact Us","lat":42.581278,"long":-83.24014}],"layout":null},"minVersion":"1.9.0.0","type":"083e52df-721d-4ca4-efa3-25161d344f40","version":null}],"publisherId":"40c50eba-fd6f-4845-8340-9707103109ab","settings":{"params":[{"key":"ce0f304e-4f75-64a0-62d3-c4ff8bc72aae","val":114}],"ads":{"adBarCycles":null,"bottomBarAdEnabled":null,"bottomBarSwitchInterval":null,"enabled":false,"fullScreenAdDisplayDuration":null,"fullScreenAdEnabled":null,"fullScreenAdTO":null},"brand":{"name":null,"link":null,"showAppLinks":true},"env":3,"fbAccessToken":"AAACeZBZANVcJ0BALWdkZBkVMprgCHf89vvzV3bq47rmnXHXXRnFbOhtwvU0k0tbUcL1aEjCQgZCrZCOhldBPeaBZAymqaZAyZBUZD","overrideServices":[{"key":"CMS_TWITTER_USER_GET","params":{},"version":1},{"key":"CMS_TWITTER_QUERY_GET","params":{},"version":1}]},"social":{"facebook":{"appId":"209845035304"}},"version":"1.76.90.759"},"maxAge":7200,"serviceUrl":"http:\/\/ams.mobile.conduit-services.com\/d60a6f99-1a09-4b8d-8a39-fd5273ec7e05\/2?appVersion={appVersion}"},{"data":{"data":[{"caption":"augmentedworldexpo.com","description":"The Auggie Awards™ have been promoting excellence in Augmented Reality since 2010. It is now extending the 4th Auggie Award™ Competition with new exciting categories. Here’s the full download on Why, What, Which, When, Where, Who and How… Looking forward to your AWEsome submissions by the deadline o...","from":{"id":"250460776516","name":"are","category":"Computers\/technology"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"250460776516_10151401146861517","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQDDAlDWg6FpLuoj&w=154&h=154&url=http%3A%2F%2Faugmentedworldexpo.com%2Fwp-content%2Fuploads%2F2013%2F05%2Fauggie-square-125x125.png","likes":2,"link":"http:\/\/augmentedworldexpo.com\/awe-2013-is-now-accepting-nominations-for-the-auggies-awards\/","message":"AWE 2013 is Now Accepting Nominations for the Auggie Awards™!","name":"Submit Your Nomination Before The Deadline on May 15th","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQDDAlDWg6FpLuoj&w=154&h=154&url=http%3A%2F%2Faugmentedworldexpo.com%2Fwp-content%2Fuploads%2F2013%2F05%2Fauggie-square-125x125.png","shortDesc":"AWE 2013 is Now Accepting Nominations for the Auggie Awards™!","socialId":"Facebook:250460776516_10151401146861517","title":"augmentedworldexpo.com","url":"http:\/\/augmentedworldexpo.com\/awe-2013-is-now-accepting-nominations-for-the-auggies-awards\/"},"time":1367625679,"type":"link"},{"caption":"augmentedworldexpo.com","description":"Augmented World Expo (AWE), now in its 4th year, is the world’s largest gathering of technology professionals passionate about solving real world problems in the Augmented World.","from":{"id":"250460776516","name":"are","category":"Computers\/technology"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"250460776516_10151396427781517","likes":5,"link":"http:\/\/augmentedworldexpo.com\/about\/rfi\/","message":"Sign up to volunteer at Augmented World Expo and be part of the AR AWEsomeness for free! \u000ahttp:\/\/augmentedworldexpo.com\/about\/rfi\/","name":"Request Info - Augmented World Expo","socialInfo":{"imageUrl":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","shortDesc":"Sign up to volunteer at Augmented World Expo and be part of the AR AWEsomeness for free! \u000ahttp:\/\/augmentedworldexpo.com\/about\/rfi\/","socialId":"Facebook:250460776516_10151396427781517","title":"augmentedworldexpo.com","url":"http:\/\/augmentedworldexpo.com\/about\/rfi\/"},"time":1367344447,"type":"link"},{"caption":"augmentedworldexpo.com","description":"Special Augmented World Expo rates have been arranged at the following Santa Clara, CA hotels. When you call, ask for the Augmented World Expo rate. Rates are based on availability and are first come first served.","from":{"id":"250460776516","name":"are","category":"Computers\/technology"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"250460776516_10151390924381517","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQC7ZXgyzAkNnHed&w=154&h=154&url=http%3A%2F%2Faugmentedworldexpo.com%2Fwp-content%2Fuploads%2F2010%2F01%2Favatar-hotel.jpeg","likes":2,"link":"http:\/\/augmentedworldexpo.com\/travel\/","message":"AWE 2013 is just 5 weeks away! Make your travel arrangements before Hotel discount expires on May first. http:\/\/augmentedworldexpo.com\/travel\/","name":"Travel and Hotel - Augmented World Expo","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQC7ZXgyzAkNnHed&w=154&h=154&url=http%3A%2F%2Faugmentedworldexpo.com%2Fwp-content%2Fuploads%2F2010%2F01%2Favatar-hotel.jpeg","shortDesc":"AWE 2013 is just 5 weeks away! Make your travel arrangements before Hotel discount expires on May first. http:\/\/augmentedworldexpo.com\/travel\/","socialId":"Facebook:250460776516_10151390924381517","title":"augmentedworldexpo.com","url":"http:\/\/augmentedworldexpo.com\/travel\/"},"time":1367005537,"type":"link"},{"from":{"id":"250460776516","name":"are","category":"Computers\/technology"},"id":"250460776516_10151390734251517","likes":2,"message":"Free Webinar about the augmented reality market - Opportunities for Augmented Reality: 2013-2022\u000aJoin us for a webinar on May 15, 2013 at 1:00 PM EDT.\u000aRegister now!\u000ahttps:\/\/attendee.gotowebinar.com\/register\/3880677161960719104\u000a\u000aThis Webinar will present some of the key findings from SmarTech’s latest report on the Augmented Reality market: Opportunities for Augmented Reality: 2013-2022. The presentation will cover the five main revenue-generating applications for Augmented Reality and assess the many business models that are emerging in AR. We will also share SmarTech’s latest ten-year forecasts in this space and discuss how we see the AR sector evolving over the next decade.","socialInfo":{"imageUrl":null,"shortDesc":"Free Webinar about the augmented reality market - Opportunities for Augmented Reality: 2013-2022\u000aJoin us for a webinar on May 15, 2013 at 1:00 PM EDT.\u000aRegister now!\u000ahttps:\/\/attendee.gotowebinar.com\/register\/3880677161960719104\u000a\u000aThis Webinar will present some of the key findings from SmarTech’s latest report on the Augmented Reality market: Opportunities for Augmented Reality: 2013-2022. The presentation will cover the five main revenue-generating applications for Augmented Reality and assess the many business models that are emerging in AR. We will also share SmarTech’s latest ten-year forecasts in this space and discuss how we see the AR sector evolving over the next decade.","socialId":"Facebook:250460776516_10151390734251517","title":null,"url":null},"time":1366994780,"type":"status"},{"caption":"augmentedworldexpo.com","description":"Eyal is a senior researcher at Microsoft eXtreme Computing and Microsoft Research He received his M. Sc. and Ph.D. from the Hebrew University of Jerusalem, Israel in the areas of computer vision and computer graphics. He founded a couple of companies in the area of computer graphics, including the d...","from":{"id":"250460776516","name":"are","category":"Computers\/technology"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"250460776516_10151377475166517","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQDOmV_3wVRKpdVu&w=154&h=154&url=http%3A%2F%2Faugmentedworldexpo.com%2Fwp-content%2Fuploads%2F2013%2F04%2FEyal-Ofek-125x125.jpg","likes":2,"link":"http:\/\/augmentedworldexpo.com\/eyal-ofek\/","message":"Eyal Ofek, lead researcher at Microsoft eXtreme Computing joins speaker lineup at AWE 2013!\u000ahttp:\/\/augmentedworldexpo.com\/eyal-ofek\/","name":"Eyal Ofek - Augmented World Expo","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQDOmV_3wVRKpdVu&w=154&h=154&url=http%3A%2F%2Faugmentedworldexpo.com%2Fwp-content%2Fuploads%2F2013%2F04%2FEyal-Ofek-125x125.jpg","shortDesc":"Eyal Ofek, lead researcher at Microsoft eXtreme Computing joins speaker lineup at AWE 2013!\u000ahttp:\/\/augmentedworldexpo.com\/eyal-ofek\/","socialId":"Facebook:250460776516_10151377475166517","title":"augmentedworldexpo.com","url":"http:\/\/augmentedworldexpo.com\/eyal-ofek\/"},"time":1366155870,"type":"link"},{"from":{"id":"250460776516","name":"are","category":"Computers\/technology"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yz\/r\/StEh3RhPvjk.gif","id":"250460776516_10151376949381517","image":"http:\/\/photos-a.xx.fbcdn.net\/hphotos-ash4\/483422_10151376949351517_250014168_s.jpg","likes":4,"link":"http:\/\/www.facebook.com\/photo.php?fbid=10151376949351517&set=a.10150604881366517.384895.250460776516&type=1&relevant_count=1","message":"Palmer Luckey, Founder of Oculus Rift the new cutting edge virtual reality headset for video games, joins AWEsome Eyewear panel at AWE. http:\/\/augmentedworldexpo.com\/ai1ec_event\/ar-eyewear-face-off\/?instance_id=316","socialInfo":{"imageUrl":"http:\/\/photos-a.xx.fbcdn.net\/hphotos-ash4\/483422_10151376949351517_250014168_s.jpg","shortDesc":"Palmer Luckey, Founder of Oculus Rift the new cutting edge virtual reality headset for video games, joins AWEsome Eyewear panel at AWE. http:\/\/augmentedworldexpo.com\/ai1ec_event\/ar-eyewear-face-off\/?instance_id=316","socialId":"Facebook:250460776516_10151376949381517","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=10151376949351517&set=a.10150604881366517.384895.250460776516&type=1&relevant_count=1"},"time":1366125677,"type":"photo"},{"caption":"augmentedworldexpo.com","description":"Led by Google glass explorers & pioneers from GlassAppDevelopers.com, this comprehensive, developer workshop and hackathon will cover Google Glass hardware and the Mirror API and include hands on time with google glass hardware for all participants.    We’ll cover the art, science and business of de...","from":{"id":"250460776516","name":"are","category":"Computers\/technology"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"250460776516_485510201502849","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBkI_y_WQoBjoaW&w=154&h=154&url=http%3A%2F%2Faugmentedworldexpo.com%2Fwp-content%2Fuploads%2F2013%2F04%2FGoogle-glass-125x116.png","likes":16,"link":"http:\/\/augmentedworldexpo.com\/ai1ec_event\/google-glass-workshop-hackathon\/?instance_id=18","message":"Breaking News! Google Glass Workshop added to pre-event tutorial day on Monday, June 3rd! \u000a(for AugmentedReality.org members only)","name":"Google Glass Workshop & Hackathon - Augmented World Expo","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBkI_y_WQoBjoaW&w=154&h=154&url=http%3A%2F%2Faugmentedworldexpo.com%2Fwp-content%2Fuploads%2F2013%2F04%2FGoogle-glass-125x116.png","shortDesc":"Breaking News! Google Glass Workshop added to pre-event tutorial day on Monday, June 3rd! \u000a(for AugmentedReality.org members only)","socialId":"Facebook:250460776516_485510201502849","title":"augmentedworldexpo.com","url":"http:\/\/augmentedworldexpo.com\/ai1ec_event\/google-glass-workshop-hackathon\/?instance_id=18"},"time":1365715756,"type":"link"},{"caption":"augmentedworldexpo.com","description":"Brady Forrest recently took a position at PCH International to enable the hot new sector of Hardware startups to be successful. Previously he was an associate at Khosla Ventures, Shepherd\/Co-Founder at Ignite, and O’reilly media, and has played the role of advisor for over 500 Startups.","from":{"id":"250460776516","name":"are","category":"Computers\/technology"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"250460776516_316519581810076","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQAifPqfHYYKRh5N&w=154&h=154&url=http%3A%2F%2Faugmentedworldexpo.com%2Fwp-content%2Fuploads%2F2013%2F04%2FBrady-Forrest-125x125.jpeg","link":"http:\/\/augmentedworldexpo.com\/brady-forrest\/","message":"Brady Forrest has joined the amazing speaker lineup for AWE 2013!\u000aOne more reason to attend the most augmented show on earth. Last day to get your ticket before the early bird rate expires! http:\/\/augmentedworldexpo.com\/","name":"Brady Forrest - Augmented World Expo","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQAifPqfHYYKRh5N&w=154&h=154&url=http%3A%2F%2Faugmentedworldexpo.com%2Fwp-content%2Fuploads%2F2013%2F04%2FBrady-Forrest-125x125.jpeg","shortDesc":"Brady Forrest has joined the amazing speaker lineup for AWE 2013!\u000aOne more reason to attend the most augmented show on earth. Last day to get your ticket before the early bird rate expires! http:\/\/augmentedworldexpo.com\/","socialId":"Facebook:250460776516_316519581810076","title":"augmentedworldexpo.com","url":"http:\/\/augmentedworldexpo.com\/brady-forrest\/"},"time":1365547609,"type":"link"},{"from":{"id":"250460776516","name":"are","category":"Computers\/technology"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yz\/r\/StEh3RhPvjk.gif","id":"250460776516_10151365500561517","image":"http:\/\/photos-h.ak.fbcdn.net\/hphotos-ak-ash3\/625657_10151365500526517_125673070_s.png","likes":11,"link":"http:\/\/www.facebook.com\/photo.php?fbid=10151365500526517&set=a.10150604881366517.384895.250460776516&type=1&relevant_count=1","message":"with you there...","socialInfo":{"imageUrl":"http:\/\/photos-h.ak.fbcdn.net\/hphotos-ak-ash3\/625657_10151365500526517_125673070_s.png","shortDesc":"with you there...","socialId":"Facebook:250460776516_10151365500561517","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=10151365500526517&set=a.10150604881366517.384895.250460776516&type=1&relevant_count=1"},"time":1365368227,"type":"photo"},{"description":"Keynote speakers at AWE 2013: Steve Mann, Will Wright, Bruce Sterling, Tomi Ahonen, Philip Rosedale, Amber Case Edited by Chris Grayson","from":{"id":"250460776516","name":"are","category":"Computers\/technology"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yj\/r\/v2OnaTyTQZE.gif","id":"250460776516_152957778206383","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQDmdD9PQOkh3pwc&w=130&h=130&url=http%3A%2F%2Fi3.ytimg.com%2Fvi%2FBbQMeG4IdYo%2Fmqdefault.jpg%3Ffeature%3Dog","likes":3,"link":"http:\/\/www.youtube.com\/watch?v=BbQMeG4IdYo","message":"Check out the video teaser for the AWE-inspiring keynote speakers at AWE 2013: Steve Mann, Bruce Sterling, Will Wright, Philip Rosedale, Tomi Ahonen, Amber Case...\u000ahttp:\/\/www.youtube.com\/watch?v=BbQMeG4IdYo","name":"AWE 2013 keynote speakers Promo","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQDmdD9PQOkh3pwc&w=130&h=130&url=http%3A%2F%2Fi3.ytimg.com%2Fvi%2FBbQMeG4IdYo%2Fmqdefault.jpg%3Ffeature%3Dog","shortDesc":"Check out the video teaser for the AWE-inspiring keynote speakers at AWE 2013: Steve Mann, Bruce Sterling, Will Wright, Philip Rosedale, Tomi Ahonen, Amber Case...\u000ahttp:\/\/www.youtube.com\/watch?v=BbQMeG4IdYo","socialId":"Facebook:250460776516_152957778206383","title":"AWE 2013 keynote speakers Promo","url":"http:\/\/www.youtube.com\/watch?v=BbQMeG4IdYo"},"time":1365358075,"type":"video"},{"from":{"id":"250460776516","name":"are","category":"Computers\/technology"},"id":"250460776516_10151363108006517","socialInfo":{"imageUrl":null,"shortDesc":null,"socialId":"Facebook:250460776516_10151363108006517","title":null,"url":null},"time":1365207795,"type":"status"},{"caption":"augmentedworldexpo.com","description":"Augmented World Expo is proud to unveil details about the 2 1\/2 day journey deep into the Augmented World: 4 AWE-inspiring headliners, 35 hours of AWEsome sessions, shock-an-AWE activities, and an Exp... Read More »","from":{"id":"250460776516","name":"are","category":"Computers\/technology"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"250460776516_153324604835424","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQCAlgch2fh9shVT&w=154&h=154&url=http%3A%2F%2Faugmentedworldexpo.com%2Fwp-content%2Fuploads%2F2013%2F03%2F100-speakers-460x460.jpg","likes":44,"link":"http:\/\/augmentedworldexpo.com\/","message":"Intrigued by Google Glass? Come see the largest collection ever of AR Eyewear on display in a single location only at AWE 2013: Epson, Meta, Vuzix, Laster, Six-15, Innovega, Fraunhofer, Optinvent, Recon instruments, and Steve Mann's EyeTap!  \u000ahttp:\/\/augmentedworldexpo.com\/","name":"Augmented World Expo","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQCAlgch2fh9shVT&w=154&h=154&url=http%3A%2F%2Faugmentedworldexpo.com%2Fwp-content%2Fuploads%2F2013%2F03%2F100-speakers-460x460.jpg","shortDesc":"Intrigued by Google Glass? Come see the largest collection ever of AR Eyewear on display in a single location only at AWE 2013: Epson, Meta, Vuzix, Laster, Six-15, Innovega, Fraunhofer, Optinvent, Recon instruments, and Steve Mann's EyeTap!  \u000ahttp:\/\/augmentedworldexpo.com\/","socialId":"Facebook:250460776516_153324604835424","title":"augmentedworldexpo.com","url":"http:\/\/augmentedworldexpo.com\/"},"time":1365246992,"type":"link"},{"caption":"AWE 2013 Speakers","from":{"id":"250460776516","name":"are","category":"Computers\/technology"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yz\/r\/StEh3RhPvjk.gif","id":"250460776516_10151359227881517","image":"http:\/\/photos-h.ak.fbcdn.net\/hphotos-ak-ash3\/39303_10151359227396517_1126378895_s.png","likes":5,"link":"http:\/\/www.facebook.com\/photo.php?fbid=10151359227396517&set=a.10151359216061517.1073741825.250460776516&type=1&relevant_count=2","socialInfo":{"imageUrl":"http:\/\/photos-h.ak.fbcdn.net\/hphotos-ak-ash3\/39303_10151359227396517_1126378895_s.png","shortDesc":null,"socialId":"Facebook:250460776516_10151359227881517","title":"AWE 2013 Speakers","url":"http:\/\/www.facebook.com\/photo.php?fbid=10151359227396517&set=a.10151359216061517.1073741825.250460776516&type=1&relevant_count=2"},"time":1364938770,"type":"photo"},{"caption":"AWE 2013 Speakers","from":{"id":"250460776516","name":"are","category":"Computers\/technology"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yz\/r\/StEh3RhPvjk.gif","id":"250460776516_10151359225366517","image":"http:\/\/photos-e.ak.fbcdn.net\/hphotos-ak-prn1\/408116_10151359216146517_158427811_s.jpg","likes":5,"link":"http:\/\/www.facebook.com\/photo.php?fbid=10151359216146517&set=a.10151359216061517.1073741825.250460776516&type=1&relevant_count=16","socialInfo":{"imageUrl":"http:\/\/photos-e.ak.fbcdn.net\/hphotos-ak-prn1\/408116_10151359216146517_158427811_s.jpg","shortDesc":null,"socialId":"Facebook:250460776516_10151359225366517","title":"AWE 2013 Speakers","url":"http:\/\/www.facebook.com\/photo.php?fbid=10151359216146517&set=a.10151359216061517.1073741825.250460776516&type=1&relevant_count=16"},"time":1364938659,"type":"photo"},{"from":{"id":"250460776516","name":"are","category":"Computers\/technology"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yz\/r\/StEh3RhPvjk.gif","id":"250460776516_10151359194856517","image":"http:\/\/photos-e.ak.fbcdn.net\/hphotos-ak-prn1\/533937_10151359194811517_640811033_s.png","likes":34,"link":"http:\/\/www.facebook.com\/photo.php?fbid=10151359194811517&set=a.10150604881366517.384895.250460776516&type=1&relevant_count=1","message":"AWE 2013: early bird expiring for the greatest augmented reality show on earth.\u000d\u000ahttp:\/\/augmentedworldexpo.com\/early-bird-rate-expires-in-1-week\/","socialInfo":{"imageUrl":"http:\/\/photos-e.ak.fbcdn.net\/hphotos-ak-prn1\/533937_10151359194811517_640811033_s.png","shortDesc":"AWE 2013: early bird expiring for the greatest augmented reality show on earth.\u000d\u000ahttp:\/\/augmentedworldexpo.com\/early-bird-rate-expires-in-1-week\/","socialId":"Facebook:250460776516_10151359194856517","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=10151359194811517&set=a.10150604881366517.384895.250460776516&type=1&relevant_count=1"},"time":1365187750,"type":"photo"},{"caption":"augmentedworldexpo.com","description":"Momentum is rapidly building for Augmented World Expo™ (AWE), the world’s largest expo dedicated to the augmented world. Registration is trending toward 1000+ AR professionals and over 100 leading ...","from":{"id":"250460776516","name":"are","category":"Computers\/technology"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"250460776516_436604286428652","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQD4qhJAtz7dkfhF&w=154&h=154&url=http%3A%2F%2Faugmentedworldexpo.com%2Fwp-content%2Fuploads%2F2013%2F04%2FEarly-Bird.jpg","likes":6,"link":"http:\/\/augmentedworldexpo.com\/early-bird-rate-expires-in-1-week\/","message":"early bird rate expiring in 1 week - get your tickets today!\u000ahttp:\/\/augmentedworldexpo.com\/early-bird-rate-expires-in-1-week\/","name":"Early Bird Rate Expires in 1 Week","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQD4qhJAtz7dkfhF&w=154&h=154&url=http%3A%2F%2Faugmentedworldexpo.com%2Fwp-content%2Fuploads%2F2013%2F04%2FEarly-Bird.jpg","shortDesc":"early bird rate expiring in 1 week - get your tickets today!\u000ahttp:\/\/augmentedworldexpo.com\/early-bird-rate-expires-in-1-week\/","socialId":"Facebook:250460776516_436604286428652","title":"augmentedworldexpo.com","url":"http:\/\/augmentedworldexpo.com\/early-bird-rate-expires-in-1-week\/"},"time":1364930157,"type":"link"},{"caption":"augmentedworldexpo.com","description":"Margaret Martin, Founder and CEO of Merlin, has over 20 years of experience in leading educational and media technology companies to commercial success. Her experience includes 13 years in the Los Angeles, Silicon Valley and Portland, Oregon technology…","from":{"id":"250460776516","name":"are","category":"Computers\/technology"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"250460776516_260313477438559","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBUolxxxFUMt59O&w=154&h=154&url=http%3A%2F%2Faugmentedworldexpo.com%2Fwp-content%2Fuploads%2F2013%2F03%2FAWE-2013-logo-arorg-left.png","link":"http:\/\/augmentedworldexpo.com\/margaret-martin\/?fb_source=pubv1","message":"Margaret Martin","name":"Margaret Martin","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBUolxxxFUMt59O&w=154&h=154&url=http%3A%2F%2Faugmentedworldexpo.com%2Fwp-content%2Fuploads%2F2013%2F03%2FAWE-2013-logo-arorg-left.png","shortDesc":"Margaret Martin","socialId":"Facebook:250460776516_260313477438559","title":"augmentedworldexpo.com","url":"http:\/\/augmentedworldexpo.com\/margaret-martin\/?fb_source=pubv1"},"time":1364865457,"type":"link"},{"caption":"augmentedworldexpo.com","description":"Steve Mann received his PhD degree from MIT in 1997, and is currently a tenured professor at University of Toronto, where he teaches and does research in the Faculty of Applied Science and Engineering as well as the Faculty of … Continue reading →","from":{"id":"250460776516","name":"are","category":"Computers\/technology"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"250460776516_550254934997408","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQCbpE3rkgGh5IFt&w=154&h=154&url=http%3A%2F%2Faugmentedworldexpo.com%2Fwp-content%2Fuploads%2F2013%2F04%2FSteve-Mann.png","likes":3,"link":"http:\/\/augmentedworldexpo.com\/steve-mann\/?fb_source=pubv1","message":"Steve Mann","name":"Steve Mann","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQCbpE3rkgGh5IFt&w=154&h=154&url=http%3A%2F%2Faugmentedworldexpo.com%2Fwp-content%2Fuploads%2F2013%2F04%2FSteve-Mann.png","shortDesc":"Steve Mann","socialId":"Facebook:250460776516_550254934997408","title":"augmentedworldexpo.com","url":"http:\/\/augmentedworldexpo.com\/steve-mann\/?fb_source=pubv1"},"time":1364937672,"type":"link"},{"caption":"augmentedworldexpo.com","from":{"id":"250460776516","name":"are","category":"Computers\/technology"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"250460776516_496997037004660","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBUolxxxFUMt59O&w=154&h=154&url=http%3A%2F%2Faugmentedworldexpo.com%2Fwp-content%2Fuploads%2F2013%2F03%2FAWE-2013-logo-arorg-left.png","link":"http:\/\/augmentedworldexpo.com\/esri\/?fb_source=pubv1","message":"ESRI","name":"ESRI","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBUolxxxFUMt59O&w=154&h=154&url=http%3A%2F%2Faugmentedworldexpo.com%2Fwp-content%2Fuploads%2F2013%2F03%2FAWE-2013-logo-arorg-left.png","shortDesc":"ESRI","socialId":"Facebook:250460776516_496997037004660","title":"augmentedworldexpo.com","url":"http:\/\/augmentedworldexpo.com\/esri\/?fb_source=pubv1"},"time":1364835684,"type":"link"},{"caption":"augmentedworldexpo.com","from":{"id":"250460776516","name":"are","category":"Computers\/technology"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"250460776516_451324164948098","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBUolxxxFUMt59O&w=154&h=154&url=http%3A%2F%2Faugmentedworldexpo.com%2Fwp-content%2Fuploads%2F2013%2F03%2FAWE-2013-logo-arorg-left.png","link":"http:\/\/augmentedworldexpo.com\/twnkls\/?fb_source=pubv1","message":"TWNKLS","name":"TWNKLS","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBUolxxxFUMt59O&w=154&h=154&url=http%3A%2F%2Faugmentedworldexpo.com%2Fwp-content%2Fuploads%2F2013%2F03%2FAWE-2013-logo-arorg-left.png","shortDesc":"TWNKLS","socialId":"Facebook:250460776516_451324164948098","title":"augmentedworldexpo.com","url":"http:\/\/augmentedworldexpo.com\/twnkls\/?fb_source=pubv1"},"time":1364834533,"type":"link"},{"caption":"augmentedworldexpo.com","from":{"id":"250460776516","name":"are","category":"Computers\/technology"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"250460776516_598719110140907","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBUolxxxFUMt59O&w=154&h=154&url=http%3A%2F%2Faugmentedworldexpo.com%2Fwp-content%2Fuploads%2F2013%2F03%2FAWE-2013-logo-arorg-left.png","link":"http:\/\/augmentedworldexpo.com\/sap\/?fb_source=pubv1","message":"SAP","name":"SAP","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBUolxxxFUMt59O&w=154&h=154&url=http%3A%2F%2Faugmentedworldexpo.com%2Fwp-content%2Fuploads%2F2013%2F03%2FAWE-2013-logo-arorg-left.png","shortDesc":"SAP","socialId":"Facebook:250460776516_598719110140907","title":"augmentedworldexpo.com","url":"http:\/\/augmentedworldexpo.com\/sap\/?fb_source=pubv1"},"time":1364833867,"type":"link"},{"caption":"augmentedworldexpo.com","from":{"id":"250460776516","name":"are","category":"Computers\/technology"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"250460776516_115054672022730","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBUolxxxFUMt59O&w=154&h=154&url=http%3A%2F%2Faugmentedworldexpo.com%2Fwp-content%2Fuploads%2F2013%2F03%2FAWE-2013-logo-arorg-left.png","link":"http:\/\/augmentedworldexpo.com\/autodesk\/?fb_source=pubv1","message":"Autodesk","name":"Autodesk","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBUolxxxFUMt59O&w=154&h=154&url=http%3A%2F%2Faugmentedworldexpo.com%2Fwp-content%2Fuploads%2F2013%2F03%2FAWE-2013-logo-arorg-left.png","shortDesc":"Autodesk","socialId":"Facebook:250460776516_115054672022730","title":"augmentedworldexpo.com","url":"http:\/\/augmentedworldexpo.com\/autodesk\/?fb_source=pubv1"},"time":1364833637,"type":"link"},{"caption":"augmentedworldexpo.com","description":"Augmented Reality Event (ARE), is the first global conference dedicated to advancing the business of augmented reality.","from":{"id":"250460776516","name":"are","category":"Computers\/technology"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"250460776516_351065938346407","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQCdDat5zkaJLLCP&w=154&h=154&url=http%3A%2F%2Faugmentedworldexpo.com%2Fwp-content%2Fuploads%2F2013%2F03%2Fphoto.jpg","likes":2,"link":"http:\/\/bit.ly\/WI7nvm","message":"Sneak Peek into AWE-inspiring Agenda at AWE 2013! OMG it's AWEsome!","name":"Augmented World Expo – Sneak Peek to AWE-inspiring Agenda at AWE 2013!","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQCdDat5zkaJLLCP&w=154&h=154&url=http%3A%2F%2Faugmentedworldexpo.com%2Fwp-content%2Fuploads%2F2013%2F03%2Fphoto.jpg","shortDesc":"Sneak Peek into AWE-inspiring Agenda at AWE 2013! OMG it's AWEsome!","socialId":"Facebook:250460776516_351065938346407","title":"augmentedworldexpo.com","url":"http:\/\/bit.ly\/WI7nvm"},"time":1363927972,"type":"link"},{"caption":"augmentedworldexpo.com","description":"Augmented Reality Event (ARE), is the first global conference dedicated to advancing the business of augmented reality.","from":{"id":"250460776516","name":"are","category":"Computers\/technology"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"250460776516_495418340519487","likes":4,"link":"http:\/\/augmentedworldexpo.com\/conference-program\/speakers\/","message":"AWE Speaker list is exploding with amazing talent: now over 100 speakers!\u000ahttp:\/\/augmentedworldexpo.com\/conference-program\/speakers\/","name":"Augmented World Expo – Speakers","socialInfo":{"imageUrl":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","shortDesc":"AWE Speaker list is exploding with amazing talent: now over 100 speakers!\u000ahttp:\/\/augmentedworldexpo.com\/conference-program\/speakers\/","socialId":"Facebook:250460776516_495418340519487","title":"augmentedworldexpo.com","url":"http:\/\/augmentedworldexpo.com\/conference-program\/speakers\/"},"time":1363822827,"type":"link"},{"description":"by Yung Jake","from":{"id":"250460776516","name":"are","category":"Computers\/technology"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yj\/r\/v2OnaTyTQZE.gif","id":"250460776516_552029381494304","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQB_CmG5pz9Md3lb&w=130&h=130&url=http%3A%2F%2Fe.m-bed.de%2Fd%2Fassets%2FSundanceOfficialSelection2013LaurelBlack.png","likes":1,"link":"http:\/\/e.m-bed.de\/d","message":"Yung Jake to perform at AWE 2013!\u000a\u000aBreakout star from Sundance Festival, rap artist Yung Jake is \"Net art incarnate, flowing lyrics about tweet culture, datamoshing, hashtags, augmented reality, and memes as he blows up on Twitter, YouTube, Tumblr, and Instagram in his HTML5 music video, E.m-bed.de\/d.\" This rapper-artist will infiltrate conference screenings, and pop out with his augmented-reality music videos. Experience an In Real Life sighting at the live performance in the grand finale of Augmented World Expo.","name":"e.m-bed.de\/d","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQB_CmG5pz9Md3lb&w=130&h=130&url=http%3A%2F%2Fe.m-bed.de%2Fd%2Fassets%2FSundanceOfficialSelection2013LaurelBlack.png","shortDesc":"Yung Jake to perform at AWE 2013!\u000a\u000aBreakout star from Sundance Festival, rap artist Yung Jake is \"Net art incarnate, flowing lyrics about tweet culture, datamoshing, hashtags, augmented reality, and memes as he blows up on Twitter, YouTube, Tumblr, and Instagram in his HTML5 music video, E.m-bed.de\/d.\" This rapper-artist will infiltrate conference screenings, and pop out with his augmented-reality music videos. Experience an In Real Life sighting at the live performance in the grand finale of Augmented World Expo.","socialId":"Facebook:250460776516_552029381494304","title":"e.m-bed.de\/d","url":"http:\/\/e.m-bed.de\/d"},"time":1363496663,"type":"video"}],"id":"250460776516","likes":1694,"name":"are","picture":null},"maxAge":900,"serviceUrl":"http:\/\/cms.mobile.conduit-services.com\/facebook\/data\/augmentedrealityevent\/25\/0\/?params={}"},{"data":{"data":[{"caption":"www.candylab.com","description":"Candy Lab | 619.356.8563 is a fast-rising, accredited integrated marketing firm headquartered in San Diego, California.","from":{"id":"177786552273926","name":"Candy Lab","category":"Internet\/software"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"177786552273926_545633435489234","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBV4wSck_NSm_a1&w=154&h=154&url=http%3A%2F%2Fwww.candylab.com%2Fimages%2Fgoodie-block3.jpg","link":"http:\/\/www.candylab.com\/","message":"www.candylab.com","name":"Identify A Client | Enguage With Consumers | Convert Online Visitors","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBV4wSck_NSm_a1&w=154&h=154&url=http%3A%2F%2Fwww.candylab.com%2Fimages%2Fgoodie-block3.jpg","shortDesc":"www.candylab.com","socialId":"Facebook:177786552273926_545633435489234","title":"www.candylab.com","url":"http:\/\/www.candylab.com\/"},"time":1366623447,"type":"link"},{"caption":"catchoom.com","description":"David Marimon was named Innovator of the Month by Candy Lab.","from":{"id":"177786552273926","name":"Candy Lab","category":"Internet\/software"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"177786552273926_474438575954675","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQADgW9Px7aRKtwH&w=154&h=154&url=https%3A%2F%2Flh4.googleusercontent.com%2FxhRWDZ8tnAeGlGIe40aS0PizZYwIj1oEE--RETB41hccP1iuZvAq4kZ1UKMIMMnoAjN1RTSCpJ5b72rnAKY18G72Adzz9bCiRV6mLCm9hjhrS8veP5VBtTO5Xw","link":"http:\/\/catchoom.com\/blog\/awards\/dont-stop-us-now-candy-lab-innovator-of-the-month\/","message":"Dont Miss out on this Months Innovator of the Month - David Marimon. Also check out Catchoom!","name":"Catchoom | Don't Stop Us Now: Candy Lab Innovator of the Month","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQADgW9Px7aRKtwH&w=154&h=154&url=https%3A%2F%2Flh4.googleusercontent.com%2FxhRWDZ8tnAeGlGIe40aS0PizZYwIj1oEE--RETB41hccP1iuZvAq4kZ1UKMIMMnoAjN1RTSCpJ5b72rnAKY18G72Adzz9bCiRV6mLCm9hjhrS8veP5VBtTO5Xw","shortDesc":"Dont Miss out on this Months Innovator of the Month - David Marimon. Also check out Catchoom!","socialId":"Facebook:177786552273926_474438575954675","title":"catchoom.com","url":"http:\/\/catchoom.com\/blog\/awards\/dont-stop-us-now-candy-lab-innovator-of-the-month\/"},"time":1365891415,"type":"link"},{"caption":"mashable.com","description":"If Google Glass takes off, it could really change advertising. Here are a few possible scenarios. ","from":{"id":"177786552273926","name":"Candy Lab","category":"Internet\/software"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yq\/r\/SC2ZmEkfI-X.png","id":"177786552273926_456661417723193","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQCnLyLkF0Ki5Uzg&w=154&h=154&url=http%3A%2F%2Frack.3.mshcdn.com%2Fmedia%2FZgkyMDEzLzAxLzIzL2U5L3NlcmdleWJyaW5nLjczNWM1LmpwZwpwCXRodW1iCTEwMHgxMDAjCmUJanBn%2F1e27c2b5%2F9df%2Fsergey-brin-google-glasses.jpg","likes":4,"link":"http:\/\/mashable.com\/2013\/01\/23\/google-glass-advertising\/","message":"Thanks for a fun call Mashable!","name":"How Google Glass Could Change Advertising","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQCnLyLkF0Ki5Uzg&w=154&h=154&url=http%3A%2F%2Frack.3.mshcdn.com%2Fmedia%2FZgkyMDEzLzAxLzIzL2U5L3NlcmdleWJyaW5nLjczNWM1LmpwZwpwCXRodW1iCTEwMHgxMDAjCmUJanBn%2F1e27c2b5%2F9df%2Fsergey-brin-google-glasses.jpg","shortDesc":"Thanks for a fun call Mashable!","socialId":"Facebook:177786552273926_456661417723193","title":"mashable.com","url":"http:\/\/mashable.com\/2013\/01\/23\/google-glass-advertising\/"},"time":1359055445,"type":"link"},{"from":{"id":"177786552273926","name":"Candy Lab","category":"Internet\/software"},"id":"177786552273926_491167387602506","likes":3,"message":"Happy New Year everyone!","socialInfo":{"imageUrl":null,"shortDesc":"Happy New Year everyone!","socialId":"Facebook:177786552273926_491167387602506","title":null,"url":null},"time":1356989324,"type":"status"},{"from":{"id":"177786552273926","name":"Candy Lab","category":"Internet\/software"},"id":"177786552273926_490407034345208","socialInfo":{"imageUrl":null,"shortDesc":null,"socialId":"Facebook:177786552273926_490407034345208","title":null,"url":null},"time":1356849466,"type":"status"},{"from":{"id":"177786552273926","name":"Candy Lab","category":"Internet\/software"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yz\/r\/StEh3RhPvjk.gif","id":"177786552273926_488387694547142","image":"http:\/\/photos-f.ak.fbcdn.net\/hphotos-ak-prn1\/150653_488387667880478_1988065702_s.jpg","link":"http:\/\/www.facebook.com\/photo.php?fbid=488387667880478&set=a.182463041806277.57997.177786552273926&type=1&relevant_count=1","message":"Happy Holidays everyone!","socialInfo":{"imageUrl":"http:\/\/photos-f.ak.fbcdn.net\/hphotos-ak-prn1\/150653_488387667880478_1988065702_s.jpg","shortDesc":"Happy Holidays everyone!","socialId":"Facebook:177786552273926_488387694547142","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=488387667880478&set=a.182463041806277.57997.177786552273926&type=1&relevant_count=1"},"time":1356849466,"type":"photo"},{"caption":"web.utsandiego.com","description":"San Diego start-up CandyLab launches CacheTown in Android Marketplace","from":{"id":"177786552273926","name":"Candy Lab","category":"Internet\/software"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"177786552273926_537166122978599","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBrG57isxxgoTVu&w=154&h=154&url=http%3A%2F%2Fbrightcove01.brightcove.com%2F21%2F15364600001%2F201211%2F341%2F15364600001_1976876176001_vs-50a998462fe1b0e47742a032-767904723001.jpg%3FpubId%3D15364600001","link":"http:\/\/web.utsandiego.com\/news\/2012\/nov\/21\/new-augmented-realty-app-aims-traction-gamers-mark","message":"Andrew Couch, chief executive of CandyLab, thinks the game aspect of CacheTown will help it break through the “gimmickry” of augmented reality technology.\u000a\u000a\u000a\u000a\u000ahttp:\/\/web.utsandiego.com\/news\/2012\/nov\/21\/new-augmented-realty-app-aims-traction-gamers-mark\/\u000a\u000a","name":"New augmented reality app aims for traction with marketers","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBrG57isxxgoTVu&w=154&h=154&url=http%3A%2F%2Fbrightcove01.brightcove.com%2F21%2F15364600001%2F201211%2F341%2F15364600001_1976876176001_vs-50a998462fe1b0e47742a032-767904723001.jpg%3FpubId%3D15364600001","shortDesc":"Andrew Couch, chief executive of CandyLab, thinks the game aspect of CacheTown will help it break through the “gimmickry” of augmented reality technology.\u000a\u000a\u000a\u000a\u000ahttp:\/\/web.utsandiego.com\/news\/2012\/nov\/21\/new-augmented-realty-app-aims-traction-gamers-mark\/\u000a\u000a","socialId":"Facebook:177786552273926_537166122978599","title":"web.utsandiego.com","url":"http:\/\/web.utsandiego.com\/news\/2012\/nov\/21\/new-augmented-realty-app-aims-traction-gamers-mark"},"time":1353622671,"type":"link"},{"description":"CacheTown with location based prizes in augmented reality.","from":{"id":"177786552273926","name":"Candy Lab","category":"Internet\/software"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yj\/r\/v2OnaTyTQZE.gif","id":"177786552273926_335626796536107","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBB0pKRodB1RVkN&w=130&h=130&url=http%3A%2F%2Fi1.ytimg.com%2Fvi%2FdHD6Z2eDZ-E%2Fmqdefault.jpg","link":"https:\/\/www.youtube.com\/watch?v=dHD6Z2eDZ-E","message":"http:\/\/www.examiner.com\/article\/reality-is-the-eye-of-the-beholder","name":"Location Based Augmented Reality, Cachetown :)","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBB0pKRodB1RVkN&w=130&h=130&url=http%3A%2F%2Fi1.ytimg.com%2Fvi%2FdHD6Z2eDZ-E%2Fmqdefault.jpg","shortDesc":"http:\/\/www.examiner.com\/article\/reality-is-the-eye-of-the-beholder","socialId":"Facebook:177786552273926_335626796536107","title":"Location Based Augmented Reality, Cachetown :)","url":"https:\/\/www.youtube.com\/watch?v=dHD6Z2eDZ-E"},"time":1351888495,"type":"video"},{"from":{"id":"177786552273926","name":"Candy Lab","category":"Internet\/software"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yz\/r\/StEh3RhPvjk.gif","id":"177786552273926_465774186808493","image":"http:\/\/photos-g.ak.fbcdn.net\/hphotos-ak-ash3\/521770_465774170141828_1687892721_s.jpg","likes":13,"link":"http:\/\/www.facebook.com\/photo.php?fbid=465774170141828&set=a.182463041806277.57997.177786552273926&type=1&relevant_count=1","message":"Augmented Reality is one of the hottest up and coming trends, Andrew Couch from Candy Lab may have found a way to capitalize on this just prior to the peak. Come hear about this new trend from a local entrepreneur and how he plans to take AR to the next level in the United States. Andrew will be sharing his experience at the San Diego Entrepreneur Summit Nov.13-14 in Downtown San Diego. Register today at www.sdesummit.com\/6-2 - Don't miss out!\u000d\u000a\u000d\u000a\u000d\u000a- Matty Vee","socialInfo":{"imageUrl":"http:\/\/photos-g.ak.fbcdn.net\/hphotos-ak-ash3\/521770_465774170141828_1687892721_s.jpg","shortDesc":"Augmented Reality is one of the hottest up and coming trends, Andrew Couch from Candy Lab may have found a way to capitalize on this just prior to the peak. Come hear about this new trend from a local entrepreneur and how he plans to take AR to the next level in the United States. Andrew will be sharing his experience at the San Diego Entrepreneur Summit Nov.13-14 in Downtown San Diego. Register today at www.sdesummit.com\/6-2 - Don't miss out!\u000d\u000a\u000d\u000a\u000d\u000a- Matty Vee","socialId":"Facebook:177786552273926_465774186808493","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=465774170141828&set=a.182463041806277.57997.177786552273926&type=1&relevant_count=1"},"time":1352074854,"type":"photo"},{"from":{"id":"177786552273926","name":"Candy Lab","category":"Internet\/software"},"id":"177786552273926_465367756849136","socialInfo":{"imageUrl":null,"shortDesc":null,"socialId":"Facebook:177786552273926_465367756849136","title":null,"url":null},"time":1351807717,"type":"status"},{"caption":"www.examiner.com","description":"It was quite a sight in San Jose, California last month as a group of journalists, government officials, and local citizens wandered around an abandoned IBM fac","from":{"id":"177786552273926","name":"Candy Lab","category":"Internet\/software"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"177786552273926_494219093941934","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQD5c7nK2eGeUi4B&w=154&h=154&url=http%3A%2F%2Fcdn2-b.examiner.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fimage_content_width%2Fhash%2F08%2Ff5%2F08f55cf0de5fe099dcd831383f660ebe.jpg","likes":53,"link":"http:\/\/www.examiner.com\/article\/reality-is-the-eye-of-the-beholder","message":"Reality is in the eye of the beholder","name":"Reality is in the eye of the beholder","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQD5c7nK2eGeUi4B&w=154&h=154&url=http%3A%2F%2Fcdn2-b.examiner.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fimage_content_width%2Fhash%2F08%2Ff5%2F08f55cf0de5fe099dcd831383f660ebe.jpg","shortDesc":"Reality is in the eye of the beholder","socialId":"Facebook:177786552273926_494219093941934","title":"www.examiner.com","url":"http:\/\/www.examiner.com\/article\/reality-is-the-eye-of-the-beholder"},"time":1351807716,"type":"link"},{"caption":"www.marketwire.com","description":"SAN DIEGO, CA--(Marketwire - Oct 26, 2012) - Candy Lab has delivered CacheTown through the IDG Network at the prestigious DEMO conference held in Silicon Valley, California. CacheTown demonstrated how hyper geo-location based augmented reality can dramatically reshape how we shop, learn, play and di...","from":{"id":"177786552273926","name":"Candy Lab","category":"Internet\/software"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yq\/r\/SC2ZmEkfI-X.png","id":"177786552273926_120877591402137","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBIFwpF6gD4ksN8&w=154&h=154&url=http%3A%2F%2Fmedia.marketwire.com%2Fattachments%2F201210%2F89162_Cachetownfinalmw.jpg","likes":60,"link":"http:\/\/www.marketwire.com\/press-release\/Location-Location-Location-CacheTown-Delivers-Augmented-Reality-Like-a-Boss-1718384.htm","message":"A practical use of Augmented Reality in the USA.","name":"Location, Location, Location - CacheTown Delivers Augmented Reality Like a Boss","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBIFwpF6gD4ksN8&w=154&h=154&url=http%3A%2F%2Fmedia.marketwire.com%2Fattachments%2F201210%2F89162_Cachetownfinalmw.jpg","shortDesc":"A practical use of Augmented Reality in the USA.","socialId":"Facebook:177786552273926_120877591402137","title":"www.marketwire.com","url":"http:\/\/www.marketwire.com\/press-release\/Location-Location-Location-CacheTown-Delivers-Augmented-Reality-Like-a-Boss-1718384.htm"},"time":1351689049,"type":"link"},{"description":"Wax Tailor \"The Games You Play\" tiré de l'album \"Hope And Sorrow\" Directed by Tenas(http:\/\/www.tenas-graphism.com\/) http:\/\/www.waxtailor.com http:\/\/www.myspa...","from":{"id":"177786552273926","name":"Candy Lab","category":"Internet\/software"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yj\/r\/v2OnaTyTQZE.gif","id":"177786552273926_267072036726287","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQCuZDJgy6o2zomb&w=130&h=130&url=http%3A%2F%2Fi3.ytimg.com%2Fvi%2FV6-pQSWjwqc%2Fmqdefault.jpg","link":"http:\/\/www.youtube.com\/watch?v=V6-pQSWjwqc&feature=relmfu","message":"I think you know the rules of our game.","name":"Wax Tailor \"The Games You Play\"","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQCuZDJgy6o2zomb&w=130&h=130&url=http%3A%2F%2Fi3.ytimg.com%2Fvi%2FV6-pQSWjwqc%2Fmqdefault.jpg","shortDesc":"I think you know the rules of our game.","socialId":"Facebook:177786552273926_267072036726287","title":"Wax Tailor \"The Games You Play\"","url":"http:\/\/www.youtube.com\/watch?v=V6-pQSWjwqc&feature=relmfu"},"time":1343347710,"type":"video"},{"from":{"id":"177786552273926","name":"Candy Lab","category":"Internet\/software"},"id":"177786552273926_415186185200627","likes":1,"message":"Let go the idea and hold on to where it's going.","socialInfo":{"imageUrl":null,"shortDesc":"Let go the idea and hold on to where it's going.","socialId":"Facebook:177786552273926_415186185200627","title":null,"url":null},"time":1341751240,"type":"status"},{"from":{"id":"177786552273926","name":"Candy Lab","category":"Internet\/software"},"id":"177786552273926_415185391867373","socialInfo":{"imageUrl":null,"shortDesc":null,"socialId":"Facebook:177786552273926_415185391867373","title":null,"url":null},"time":1341751052,"type":"status"},{"from":{"id":"177786552273926","name":"Candy Lab","category":"Internet\/software"},"id":"177786552273926_414074358645143","message":"Be awesome.","socialInfo":{"imageUrl":null,"shortDesc":"Be awesome.","socialId":"Facebook:177786552273926_414074358645143","title":null,"url":null},"time":1341778453,"type":"status"},{"from":{"id":"177786552273926","name":"Candy Lab","category":"Internet\/software"},"id":"177786552273926_393215840730995","likes":1,"message":"seize the day.","socialInfo":{"imageUrl":null,"shortDesc":"seize the day.","socialId":"Facebook:177786552273926_393215840730995","title":null,"url":null},"time":1338433003,"type":"status"},{"caption":"mashable.com","description":"Facebook on Tuesday introduced a Timeline option that lets users identify themselves as organ donors.","from":{"id":"177786552273926","name":"Candy Lab","category":"Internet\/software"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"177786552273926_321273431276567","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQD1QAWmKVKjHBgX&w=154&h=154&url=http%3A%2F%2F8.mshcdn.com%2Fwp-content%2Fuploads%2F2012%2F04%2Ffacebook-bullying.jpg","likes":1,"link":"http:\/\/mashable.com\/2012\/05\/01\/facebook-organ-donor\/","message":"More than just a Status.\u000a\u000a\u000ahttp:\/\/mashable.com\/2012\/05\/01\/facebook-organ-donor\/","name":"Facebook Adds Organ Donor Option to Timeline","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQD1QAWmKVKjHBgX&w=154&h=154&url=http%3A%2F%2F8.mshcdn.com%2Fwp-content%2Fuploads%2F2012%2F04%2Ffacebook-bullying.jpg","shortDesc":"More than just a Status.\u000a\u000a\u000ahttp:\/\/mashable.com\/2012\/05\/01\/facebook-organ-donor\/","socialId":"Facebook:177786552273926_321273431276567","title":"mashable.com","url":"http:\/\/mashable.com\/2012\/05\/01\/facebook-organ-donor\/"},"time":1335889683,"type":"link"},{"from":{"id":"177786552273926","name":"Candy Lab","category":"Internet\/software"},"id":"177786552273926_350928104959769","likes":2,"message":"5:06am and finally done with the work day, a few hours of sleep then its back at it. One day, one day we rest and when we do it will be in a chair sitting upright exceeding no more than 30 min of course. \u000a\u000aNight night world.","socialInfo":{"imageUrl":null,"shortDesc":"5:06am and finally done with the work day, a few hours of sleep then its back at it. One day, one day we rest and when we do it will be in a chair sitting upright exceeding no more than 30 min of course. \u000a\u000aNight night world.","socialId":"Facebook:177786552273926_350928104959769","title":null,"url":null},"time":1333282141,"type":"status"},{"description":"www.TEDxLaJolla.org","from":{"id":"177786552273926","name":"Candy Lab","category":"Internet\/software"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"177786552273926_382201418476403","image":"http:\/\/profile.ak.fbcdn.net\/hprofile-ak-ash4\/373028_137543346273552_1801553553_n.jpg","likes":1,"link":"http:\/\/www.facebook.com\/pages\/TedxLaJolla\/137543346273552","message":": Can't wait to attend on May 26th 2012'","name":"TedxLaJolla","socialInfo":{"imageUrl":"http:\/\/profile.ak.fbcdn.net\/hprofile-ak-ash4\/373028_137543346273552_1801553553_n.jpg","shortDesc":": Can't wait to attend on May 26th 2012'","socialId":"Facebook:177786552273926_382201418476403","title":"TedxLaJolla","url":"http:\/\/www.facebook.com\/pages\/TedxLaJolla\/137543346273552"},"time":1334004559,"type":"link"},{"from":{"id":"177786552273926","name":"Candy Lab","category":"Internet\/software"},"id":"177786552273926_241501375902443","socialInfo":{"imageUrl":null,"shortDesc":null,"socialId":"Facebook:177786552273926_241501375902443","title":null,"url":null},"time":1317404194,"type":"status"},{"caption":"www.mashable.com","description":"Warner Bros. is launching a show that will run on Facebook and incorporate info from your profile into scenes.","from":{"id":"177786552273926","name":"Candy Lab","category":"Internet\/software"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"177786552273926_182583761816604","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBI0XjbXaVfZUfS&w=154&h=154&url=http%3A%2F%2F6.mshcdn.com%2Fwp-content%2Fuploads%2F2011%2F09%2FAim-High-Image-Mashable.jpg","likes":1,"link":"http:\/\/www.mashable.com\/2011\/09\/29\/warner-bros-show-facebook\/","message":"Warner Bros will be trying out Transmedia Storytelling by implementing an exclusive \"social series\"on Facebook.  Your photo's and friends may be incorporated into the show.  Would you watch this?  ","name":"Facebook TV Show Stars You & Your Friends","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBI0XjbXaVfZUfS&w=154&h=154&url=http%3A%2F%2F6.mshcdn.com%2Fwp-content%2Fuploads%2F2011%2F09%2FAim-High-Image-Mashable.jpg","shortDesc":"Warner Bros will be trying out Transmedia Storytelling by implementing an exclusive \"social series\"on Facebook.  Your photo's and friends may be incorporated into the show.  Would you watch this?  ","socialId":"Facebook:177786552273926_182583761816604","title":"www.mashable.com","url":"http:\/\/www.mashable.com\/2011\/09\/29\/warner-bros-show-facebook\/"},"time":1317403997,"type":"link"},{"description":"The future has arrived sooner than we thought. The robots have taken over. They listen to dubstep, and they are amazing dancers.","from":{"id":"177786552273926","name":"Candy Lab","category":"Internet\/software"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yj\/r\/v2OnaTyTQZE.gif","id":"177786552273926_197875920284228","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQCshH3-qRr_BCie&w=130&h=130&url=http%3A%2F%2Fmedia1.break.com%2Fdnet%2Fmedia%2F2011%2F9%2F25%2F328e524c-b2be-42ed-8220-bf73ee66684a.jpg","likes":1,"link":"http:\/\/www.break.com\/index\/amazing-dubstep-robot-2160853","message":"Our Viral Video for the day: http:\/\/www.break.com\/index\/amazing-dubstep-robot-2160853\u000a\u000aWe wish we could watch this on repeat.  Incredible!  What do you think?","name":"Amazing Dubstep Robot | Break.com","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQCshH3-qRr_BCie&w=130&h=130&url=http%3A%2F%2Fmedia1.break.com%2Fdnet%2Fmedia%2F2011%2F9%2F25%2F328e524c-b2be-42ed-8220-bf73ee66684a.jpg","shortDesc":"Our Viral Video for the day: http:\/\/www.break.com\/index\/amazing-dubstep-robot-2160853\u000a\u000aWe wish we could watch this on repeat.  Incredible!  What do you think?","socialId":"Facebook:177786552273926_197875920284228","title":"Amazing Dubstep Robot | Break.com","url":"http:\/\/www.break.com\/index\/amazing-dubstep-robot-2160853"},"time":1320211806,"type":"video"},{"caption":"www.sandiegorestaurantweek.com","description":"[DECRIPTION]","from":{"id":"177786552273926","name":"Candy Lab","category":"Internet\/software"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"177786552273926_114606395312936","link":"http:\/\/www.sandiegorestaurantweek.com\/restaurant-list\/","message":"San Diego Restaurant Week got extended through Friday!  Check out the local restaurants that are participating this week here.  Where will you plan to go?\u000a","name":"Restaurant List - San Diego Restaurant Week, San Diego California","socialInfo":{"imageUrl":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","shortDesc":"San Diego Restaurant Week got extended through Friday!  Check out the local restaurants that are participating this week here.  Where will you plan to go?\u000a","socialId":"Facebook:177786552273926_114606395312936","title":"www.sandiegorestaurantweek.com","url":"http:\/\/www.sandiegorestaurantweek.com\/restaurant-list\/"},"time":1317151760,"type":"link"},{"caption":"mashable.com","description":"At the f8 conference in San Francisco, Mark Zuckerberg revealed some of the most profound changes seen on Facebook. Here's a handy guide.","from":{"id":"177786552273926","name":"Candy Lab","category":"Internet\/software"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"177786552273926_118439281595071","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQCC7pA07FJQlsjF&w=154&h=154&url=http%3A%2F%2F7.mshcdn.com%2Fwp-content%2Fuploads%2F2011%2F09%2F314%2Cnew-facebook-3601.jpg","likes":1,"link":"http:\/\/mashable.com\/2011\/09\/22\/facebook-changes-roundup\/","message":"Everything you need to know about the new Facebook changes\u000ahttp:\/\/mashable.com\/2011\/09\/22\/facebook-changes-roundup\/","name":"Facebook Changes Again: Everything You Need To Know","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQCC7pA07FJQlsjF&w=154&h=154&url=http%3A%2F%2F7.mshcdn.com%2Fwp-content%2Fuploads%2F2011%2F09%2F314%2Cnew-facebook-3601.jpg","shortDesc":"Everything you need to know about the new Facebook changes\u000ahttp:\/\/mashable.com\/2011\/09\/22\/facebook-changes-roundup\/","socialId":"Facebook:177786552273926_118439281595071","title":"mashable.com","url":"http:\/\/mashable.com\/2011\/09\/22\/facebook-changes-roundup\/"},"time":1316815688,"type":"link"}],"id":"177786552273926","likes":798,"name":"Candy Lab","picture":null},"maxAge":900,"serviceUrl":"http:\/\/cms.mobile.conduit-services.com\/facebook\/data\/candylab\/25\/0\/?params={}"},{"data":{"icon":"http:\/\/a0.twimg.com\/profile_images\/2997375263\/ff28e5d564c7560eebdc1f90e83fdc1a_normal.png","paging":{"next":"http:\/\/cms.mobile.conduit-services.com\/twitter\/user\/ARealityEvent\/25\/25\/?params=%7b%22MaxId%22%3a%22319467991874011135%22%2c%22includeEntities%22%3afalse%2c%22isOpenSearch%22%3afalse%2c%22listName%22%3anull%7d","nextUrl":"http:\/\/cms.mobile.conduit-services.com\/twitter\/user\/ARealityEvent\/25\/25\/?params=%7b%22MaxId%22%3a%22319467991874011135%22%2c%22includeEntities%22%3afalse%2c%22isOpenSearch%22%3afalse%2c%22listName%22%3anull%7d"},"statuses":[{"description":"[twit=aplusk]@aplusk[\/twit] loved your talk at TechCrunch Disrupt NYC about  glass, sensors, real world notes - it's exactly our focus - would you support us?","entities":null,"id":331128617847386112,"inReplyToScreenName":"aplusk","inReplyToStatusId":null,"inReplyToUserId":"19058681","retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"@aplusk loved your talk at TechCrunch Disrupt NYC about  glass, sensors, real world notes - it's exactly our focus - would you support us?","socialId":"Twitter:331128617847386112","title":"@aplusk loved your talk at TechCrunch Disrupt NYC about  glass, sensors, real world notes - it's exactly our focus - would you support us?","url":null},"source":"<a href=\"http:\/\/www.tweetdeck.com\" rel=\"nofollow\">TweetDeck<\/a>","time":1367782189},{"description":"[trend=AWEX2013]#AWEX2013[\/trend] is now accepting nominations for the Auggie Awards™. Submit before May 15 and compete for $20,000 in prizes [url]http:\/\/t.co\/A641OoDyDr[\/url]","entities":null,"id":330476487318831104,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":1,"socialInfo":{"imageUrl":null,"shortDesc":"#AWEX2013 is now accepting nominations for the Auggie Awards™. Submit before May 15 and compete for $20,000 in prizes http:\/\/t.co\/A641OoDyDr","socialId":"Twitter:330476487318831104","title":"#AWEX2013 is now accepting nominations for the Auggie Awards™. Submit before May 15 and compete for $20,000 in prizes http:\/\/t.co\/A641OoDyDr","url":null},"source":"<a href=\"http:\/\/www.tweetdeck.com\" rel=\"nofollow\">TweetDeck<\/a>","time":1367626709},{"description":"Great article: \"Augmented Reality Will Be Here Sooner Than You Think\" [url]http:\/\/t.co\/gUm3k9n2Oy[\/url] [twit=ElectronicDesgn]@ElectronicDesgn[\/twit] See it happening at [trend=AWEX2013]#AWEX2013[\/trend]","entities":null,"id":329682637109207040,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"Great article: \"Augmented Reality Will Be Here Sooner Than You Think\" http:\/\/t.co\/gUm3k9n2Oy @ElectronicDesgn See it happening at #AWEX2013","socialId":"Twitter:329682637109207040","title":"Great article: \"Augmented Reality Will Be Here Sooner Than You Think\" http:\/\/t.co\/gUm3k9n2Oy @ElectronicDesgn See it happening at #AWEX2013","url":null},"source":"<a href=\"http:\/\/www.tweetdeck.com\" rel=\"nofollow\">TweetDeck<\/a>","time":1367437440},{"description":"Sign up to volunteer at Augmented World Expo [trend=AWEX2013]#AWEX2013[\/trend] and be part of the AR AWEsomeness for free! [url]http:\/\/t.co\/54vIazfjGW[\/url]","entities":null,"id":329290909399269376,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"Sign up to volunteer at Augmented World Expo #AWEX2013 and be part of the AR AWEsomeness for free! http:\/\/t.co\/54vIazfjGW","socialId":"Twitter:329290909399269376","title":"Sign up to volunteer at Augmented World Expo #AWEX2013 and be part of the AR AWEsomeness for free! http:\/\/t.co\/54vIazfjGW","url":null},"source":"<a href=\"http:\/\/www.tweetdeck.com\" rel=\"nofollow\">TweetDeck<\/a>","time":1367344045},{"description":"[trend=AWE2013]#AWE2013[\/trend] Gold Sponsor [twit=Daqri]@Daqri[\/twit]  [twit=Cadillac]@Cadillac[\/twit] campaign for webby now in 1st place. RT and vote for [trend=Webbys]#Webbys[\/trend] [url]http:\/\/t.co\/pLmyosRBxM[\/url]","entities":null,"id":327059860611026944,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":1,"socialInfo":{"imageUrl":null,"shortDesc":"#AWE2013 Gold Sponsor @Daqri  @Cadillac campaign for webby now in 1st place. RT and vote for #Webbys http:\/\/t.co\/pLmyosRBxM","socialId":"Twitter:327059860611026944","title":"#AWE2013 Gold Sponsor @Daqri  @Cadillac campaign for webby now in 1st place. RT and vote for #Webbys http:\/\/t.co\/pLmyosRBxM","url":null},"source":"<a href=\"http:\/\/www.tweetdeck.com\" rel=\"nofollow\">TweetDeck<\/a>","time":1366812121},{"description":"RT [twit=AdDispatch]@AdDispatch[\/twit]: Psyched to be bronze sponsor at [trend=AWE2013]#AWE2013[\/trend].  [url]http:\/\/t.co\/JX5uBIW1XD[\/url] excited to have you on board as well!","entities":null,"id":324532374601875456,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"RT @AdDispatch: Psyched to be bronze sponsor at #AWE2013.  http:\/\/t.co\/JX5uBIW1XD excited to have you on board as well!","socialId":"Twitter:324532374601875456","title":"RT @AdDispatch: Psyched to be bronze sponsor at #AWE2013.  http:\/\/t.co\/JX5uBIW1XD excited to have you on board as well!","url":null},"source":"<a href=\"http:\/\/www.tweetdeck.com\" rel=\"nofollow\">TweetDeck<\/a>","time":1366209522},{"description":"Eyal Ofek, lead researcher at Microsoft eXtreme Computing joins speaker lineup at [trend=AWE2013]#AWE2013[\/trend]!\u000a[url]http:\/\/t.co\/e149QPFQal[\/url]","entities":null,"id":324307455922274304,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"Eyal Ofek, lead researcher at Microsoft eXtreme Computing joins speaker lineup at #AWE2013!\u000ahttp:\/\/t.co\/e149QPFQal","socialId":"Twitter:324307455922274304","title":"Eyal Ofek, lead researcher at Microsoft eXtreme Computing joins speaker lineup at #AWE2013!\u000ahttp:\/\/t.co\/e149QPFQal","url":null},"source":"<a href=\"http:\/\/www.tweetdeck.com\" rel=\"nofollow\">TweetDeck<\/a>","time":1366155897},{"description":"Palmer Luckey, Founder Oculus Rift new virtual reality headset for video games, joins AWEsome Eyewear  at [trend=AWE2013]#AWE2013[\/trend] [url]http:\/\/t.co\/of1uXv7ycx[\/url]","entities":null,"id":324181287407583232,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":2,"socialInfo":{"imageUrl":null,"shortDesc":"Palmer Luckey, Founder Oculus Rift new virtual reality headset for video games, joins AWEsome Eyewear  at #AWE2013 http:\/\/t.co\/of1uXv7ycx","socialId":"Twitter:324181287407583232","title":"Palmer Luckey, Founder Oculus Rift new virtual reality headset for video games, joins AWEsome Eyewear  at #AWE2013 http:\/\/t.co\/of1uXv7ycx","url":null},"source":"<a href=\"http:\/\/www.tweetdeck.com\" rel=\"nofollow\">TweetDeck<\/a>","time":1366125816},{"description":"RT [twit=ARdirt]@ARdirt[\/twit]: Latest AR news roundout out [url]http:\/\/t.co\/Xrld1zDLuB[\/url] [trend=AR]#AR[\/trend] [trend=ARNews]#ARNews[\/trend] [trend=Technology]#Technology[\/trend] [trend=AugmentedReality]#AugmentedReality[\/trend] [trend=TechCrunch]#TechCrunch[\/trend] [trend=Technews]#Technews[\/trend] [trend=AWE2013]#AWE2013[\/trend]","entities":null,"id":324000947799990272,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"RT @ARdirt: Latest AR news roundout out http:\/\/t.co\/Xrld1zDLuB #AR #ARNews #Technology #AugmentedReality #TechCrunch #Technews #AWE2013","socialId":"Twitter:324000947799990272","title":"RT @ARdirt: Latest AR news roundout out http:\/\/t.co\/Xrld1zDLuB #AR #ARNews #Technology #AugmentedReality #TechCrunch #Technews #AWE2013","url":null},"source":"<a href=\"http:\/\/www.tweetdeck.com\" rel=\"nofollow\">TweetDeck<\/a>","time":1366082820},{"description":"[trend=AWE2013]#AWE2013[\/trend] News: Google Glass Workshop &amp; Hackathon added to pre-event tutorial day on Mon June 3!  by The Glass Company [url]http:\/\/t.co\/Hg6oV9WFPp[\/url]","entities":null,"id":322462119037632512,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":3,"socialInfo":{"imageUrl":null,"shortDesc":"#AWE2013 News: Google Glass Workshop &amp; Hackathon added to pre-event tutorial day on Mon June 3!  by The Glass Company http:\/\/t.co\/Hg6oV9WFPp","socialId":"Twitter:322462119037632512","title":"#AWE2013 News: Google Glass Workshop &amp; Hackathon added to pre-event tutorial day on Mon June 3!  by The Glass Company http:\/\/t.co\/Hg6oV9WFPp","url":null},"source":"<a href=\"http:\/\/www.tweetdeck.com\" rel=\"nofollow\">TweetDeck<\/a>","time":1365715934},{"description":"Brady Forrest joins 110 speaker lineup at [trend=AWE2013]#AWE2013[\/trend]. Killer reason to attend the most augmented show on earth [url]http:\/\/t.co\/NgMvh2EtC4[\/url]  [twit=brady]@brady[\/twit]","entities":null,"id":321757489228034049,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"Brady Forrest joins 110 speaker lineup at #AWE2013. Killer reason to attend the most augmented show on earth http:\/\/t.co\/NgMvh2EtC4  @brady","socialId":"Twitter:321757489228034049","title":"Brady Forrest joins 110 speaker lineup at #AWE2013. Killer reason to attend the most augmented show on earth http:\/\/t.co\/NgMvh2EtC4  @brady","url":null},"source":"<a href=\"http:\/\/www.tweetdeck.com\" rel=\"nofollow\">TweetDeck<\/a>","time":1365547938},{"description":"Today is your day to register for [trend=awe2013]#awe2013[\/trend] ....[url]http:\/\/t.co\/zhLzhWyeF5[\/url] final day of early bird savings...[trend=AR]#AR[\/trend]","entities":null,"id":321662662993911810,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":1,"socialInfo":{"imageUrl":null,"shortDesc":"Today is your day to register for #awe2013 ....http:\/\/t.co\/zhLzhWyeF5 final day of early bird savings...#AR","socialId":"Twitter:321662662993911810","title":"Today is your day to register for #awe2013 ....http:\/\/t.co\/zhLzhWyeF5 final day of early bird savings...#AR","url":null},"source":"web","time":1365525329},{"description":"It's a [trend=AR]#AR[\/trend] Monday take a glimpse into AWE-inspiring [trend=AWE2013]#AWE2013[\/trend] keynotes (video)  [url]http:\/\/t.co\/0QYldGVHh7[\/url] &amp; register today!","entities":null,"id":321296188848615424,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"It's a #AR Monday take a glimpse into AWE-inspiring #AWE2013 keynotes (video)  http:\/\/t.co\/0QYldGVHh7 &amp; register today!","socialId":"Twitter:321296188848615424","title":"It's a #AR Monday take a glimpse into AWE-inspiring #AWE2013 keynotes (video)  http:\/\/t.co\/0QYldGVHh7 &amp; register today!","url":null},"source":"web","time":1365437955},{"description":"[trend=awe2013]#awe2013[\/trend] early bird registration closes tomorrow...view our AWEsome speaker list and register today tp save $200...[url]http:\/\/t.co\/lxC1YrmAWt[\/url]","entities":null,"id":321286578808967169,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":2,"socialInfo":{"imageUrl":null,"shortDesc":"#awe2013 early bird registration closes tomorrow...view our AWEsome speaker list and register today tp save $200...http:\/\/t.co\/lxC1YrmAWt","socialId":"Twitter:321286578808967169","title":"#awe2013 early bird registration closes tomorrow...view our AWEsome speaker list and register today tp save $200...http:\/\/t.co\/lxC1YrmAWt","url":null},"source":"web","time":1365435664},{"description":"Take a glimpse into AWE-inspiring keynotes at [trend=AWE2013]#AWE2013[\/trend] (video) [twit=bruces]@bruces[\/twit] [twit=Hydraulist]@Hydraulist[\/twit] [twit=StupidFunWill]@StupidFunWill[\/twit] [twit=philiplinden]@philiplinden[\/twit] [url]http:\/\/t.co\/0QYldGVHh7[\/url]","entities":null,"id":320960176255541248,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":1,"socialInfo":{"imageUrl":null,"shortDesc":"Take a glimpse into AWE-inspiring keynotes at #AWE2013 (video) @bruces @Hydraulist @StupidFunWill @philiplinden http:\/\/t.co\/0QYldGVHh7","socialId":"Twitter:320960176255541248","title":"Take a glimpse into AWE-inspiring keynotes at #AWE2013 (video) @bruces @Hydraulist @StupidFunWill @philiplinden http:\/\/t.co\/0QYldGVHh7","url":null},"source":"<a href=\"http:\/\/www.tweetdeck.com\" rel=\"nofollow\">TweetDeck<\/a>","time":1365357843},{"description":"[trend=awe2013]#awe2013[\/trend] early bird registration ends April 9.  Register today to save and expereince the [trend=AR]#AR[\/trend] event of the year...[url]http:\/\/t.co\/lxC1YrmAWt[\/url]","entities":null,"id":320925705733042176,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"#awe2013 early bird registration ends April 9.  Register today to save and expereince the #AR event of the year...http:\/\/t.co\/lxC1YrmAWt","socialId":"Twitter:320925705733042176","title":"#awe2013 early bird registration ends April 9.  Register today to save and expereince the #AR event of the year...http:\/\/t.co\/lxC1YrmAWt","url":null},"source":"web","time":1365349625},{"description":"See 10 great Eyewear products in 1 spot:Epson,Meta,Vuzix,Laster,Six-15,Innovega,Franhaufer,Optinvent,Recon,Steve Mann [url]http:\/\/t.co\/NgMvh2EtC4[\/url]","entities":null,"id":320319836553084929,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":4,"socialInfo":{"imageUrl":null,"shortDesc":"See 10 great Eyewear products in 1 spot:Epson,Meta,Vuzix,Laster,Six-15,Innovega,Franhaufer,Optinvent,Recon,Steve Mann http:\/\/t.co\/NgMvh2EtC4","socialId":"Twitter:320319836553084929","title":"See 10 great Eyewear products in 1 spot:Epson,Meta,Vuzix,Laster,Six-15,Innovega,Franhaufer,Optinvent,Recon,Steve Mann http:\/\/t.co\/NgMvh2EtC4","url":null},"source":"<a href=\"http:\/\/www.tweetdeck.com\" rel=\"nofollow\">TweetDeck<\/a>","time":1365205174},{"description":"A great weekend activity idea...register for [trend=awe2013]#awe2013[\/trend] and save $200 before the April 9, early bird deadline [url]http:\/\/t.co\/lxC1YrmAWt[\/url]","entities":null,"id":320274862197317632,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"A great weekend activity idea...register for #awe2013 and save $200 before the April 9, early bird deadline http:\/\/t.co\/lxC1YrmAWt","socialId":"Twitter:320274862197317632","title":"A great weekend activity idea...register for #awe2013 and save $200 before the April 9, early bird deadline http:\/\/t.co\/lxC1YrmAWt","url":null},"source":"web","time":1365194452},{"description":"[trend=AR]#AR[\/trend] awesomeness-[trend=awe2013]#awe2013[\/trend] headliners\u000aPhilip Rosedale\u000aSteve Mann\u000aWill Wright\u000aBruce Sterling\u000aRegister by Apr 9 to save [url]http:\/\/t.co\/lxC1YrmAWt[\/url]","entities":null,"id":320196742706520066,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":1,"socialInfo":{"imageUrl":null,"shortDesc":"#AR awesomeness-#awe2013 headliners\u000aPhilip Rosedale\u000aSteve Mann\u000aWill Wright\u000aBruce Sterling\u000aRegister by Apr 9 to save http:\/\/t.co\/lxC1YrmAWt","socialId":"Twitter:320196742706520066","title":"#AR awesomeness-#awe2013 headliners\u000aPhilip Rosedale\u000aSteve Mann\u000aWill Wright\u000aBruce Sterling\u000aRegister by Apr 9 to save http:\/\/t.co\/lxC1YrmAWt","url":null},"source":"web","time":1365175827},{"description":"Just a few days left to catch the early bird savings on [trend=awe2013]#awe2013[\/trend] &amp; network with 1,000+[trend=AR]#AR[\/trend] professionals..[url]http:\/\/t.co\/lxC1YrmAWt[\/url]","entities":null,"id":319961828782383106,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"Just a few days left to catch the early bird savings on #awe2013 &amp; network with 1,000+#AR professionals..http:\/\/t.co\/lxC1YrmAWt","socialId":"Twitter:319961828782383106","title":"Just a few days left to catch the early bird savings on #awe2013 &amp; network with 1,000+#AR professionals..http:\/\/t.co\/lxC1YrmAWt","url":null},"source":"web","time":1365119819},{"description":"Experience 100+ demos of \"Augmented Humans in an Augmented World\" ..register today...[url]http:\/\/t.co\/lxC1YrmAWt[\/url]","entities":null,"id":319550456915443713,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"Experience 100+ demos of \"Augmented Humans in an Augmented World\" ..register today...http:\/\/t.co\/lxC1YrmAWt","socialId":"Twitter:319550456915443713","title":"Experience 100+ demos of \"Augmented Humans in an Augmented World\" ..register today...http:\/\/t.co\/lxC1YrmAWt","url":null},"source":"web","time":1365021740},{"description":"Act fast and get the early bird registration savings for [trend=awe2013]#awe2013[\/trend] ...[url]http:\/\/t.co\/lxC1YrmAWt[\/url]","entities":null,"id":319549173450043392,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"Act fast and get the early bird registration savings for #awe2013 ...http:\/\/t.co\/lxC1YrmAWt","socialId":"Twitter:319549173450043392","title":"Act fast and get the early bird registration savings for #awe2013 ...http:\/\/t.co\/lxC1YrmAWt","url":null},"source":"web","time":1365021434},{"description":"[trend=AWE2013]#AWE2013[\/trend] is a meeting of [trend=AR]#AR[\/trend] minds with 5 awe inspiring keynotes, 35 hours of sessions. Early bird closes April 9...[url]http:\/\/t.co\/lxC1YrmAWt[\/url]","entities":null,"id":319467991874011136,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":1,"socialInfo":{"imageUrl":null,"shortDesc":"#AWE2013 is a meeting of #AR minds with 5 awe inspiring keynotes, 35 hours of sessions. Early bird closes April 9...http:\/\/t.co\/lxC1YrmAWt","socialId":"Twitter:319467991874011136","title":"#AWE2013 is a meeting of #AR minds with 5 awe inspiring keynotes, 35 hours of sessions. Early bird closes April 9...http:\/\/t.co\/lxC1YrmAWt","url":null},"source":"web","time":1365002079}],"totalFollowers":2776,"totalStatuses":579,"user":"awe 2013"},"maxAge":1200,"serviceUrl":"http:\/\/cms.mobile.conduit-services.com\/twitter\/user\/ARealityEvent\/25\/0\/?params=%7B%7D"},{"data":{"icon":"http:\/\/a0.twimg.com\/profile_images\/3606048599\/5bb809eb7c1ec26d10830cec9bc21d6d_normal.jpeg","paging":{"next":"http:\/\/cms.mobile.conduit-services.com\/twitter\/user\/Chooseawinner\/25\/25\/?params=%7b%22MaxId%22%3a%22307942320471408640%22%2c%22includeEntities%22%3afalse%2c%22isOpenSearch%22%3afalse%2c%22listName%22%3anull%7d","nextUrl":"http:\/\/cms.mobile.conduit-services.com\/twitter\/user\/Chooseawinner\/25\/25\/?params=%7b%22MaxId%22%3a%22307942320471408640%22%2c%22includeEntities%22%3afalse%2c%22isOpenSearch%22%3afalse%2c%22listName%22%3anull%7d"},"statuses":[{"description":"I just left a comment in \"Arch Grants Finalist Weekend 2013\" [url]http:\/\/t.co\/fsuTNfTuyN[\/url]","entities":null,"id":331185661476495360,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"I just left a comment in \"Arch Grants Finalist Weekend 2013\" http:\/\/t.co\/fsuTNfTuyN","socialId":"Twitter:331185661476495360","title":"I just left a comment in \"Arch Grants Finalist Weekend 2013\" http:\/\/t.co\/fsuTNfTuyN","url":null},"source":"<a href=\"http:\/\/livefyre.com\" rel=\"nofollow\">Livefyre<\/a>","time":1367795789},{"description":"Legit, everyone in AR on planet Earth is at this thing, [url]http:\/\/t.co\/rVio6wK7Xv[\/url] great work Ori Inbar! [twit=ARealityEvent]@ARealityEvent[\/twit] [url]http:\/\/t.co\/VBJqKyaR6W[\/url]","entities":null,"id":330546486477729792,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"Legit, everyone in AR on planet Earth is at this thing, http:\/\/t.co\/rVio6wK7Xv great work Ori Inbar! @ARealityEvent http:\/\/t.co\/VBJqKyaR6W","socialId":"Twitter:330546486477729792","title":"Legit, everyone in AR on planet Earth is at this thing, http:\/\/t.co\/rVio6wK7Xv great work Ori Inbar! @ARealityEvent http:\/\/t.co\/VBJqKyaR6W","url":null},"source":"web","time":1367643398},{"description":"[twit=Lab_1500]@Lab_1500[\/twit] - thanks for the add :)","entities":null,"id":330158823333560320,"inReplyToScreenName":"Lab_1500","inReplyToStatusId":null,"inReplyToUserId":"882455748","retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"@Lab_1500 - thanks for the add :)","socialId":"Twitter:330158823333560320","title":"@Lab_1500 - thanks for the add :)","url":null},"source":"<a href=\"http:\/\/twitter.com\/download\/iphone\" rel=\"nofollow\">Twitter for iPhone<\/a>","time":1367550972},{"description":"[url]http:\/\/t.co\/njNXZdRR2T[\/url]\u000a[twit=Adweek]@Adweek[\/twit] [twit=VentureBeat]@VentureBeat[\/twit]   [twit=mashable]@mashable[\/twit]   [twit=techli]@techli[\/twit] - Show up, have fun and do your part. [url]http:\/\/t.co\/YdiJZoVDdy[\/url]","entities":null,"id":329485005308960769,"inReplyToScreenName":"Adweek","inReplyToStatusId":null,"inReplyToUserId":"30205586","retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"http:\/\/t.co\/njNXZdRR2T\u000a@Adweek @VentureBeat   @mashable   @techli - Show up, have fun and do your part. http:\/\/t.co\/YdiJZoVDdy","socialId":"Twitter:329485005308960769","title":"http:\/\/t.co\/njNXZdRR2T\u000a@Adweek @VentureBeat   @mashable   @techli - Show up, have fun and do your part. http:\/\/t.co\/YdiJZoVDdy","url":null},"source":"web","time":1367390321},{"description":"[twit=ArchGrants]@ArchGrants[\/twit] [twit=IDCProjects]@IDCProjects[\/twit] [twit=2000F]@2000F[\/twit] and [trend=St]#St[\/trend] Louis, thank you for opening doors for us! That's the power of Arch Grants! [url]http:\/\/t.co\/LgjvYeEPeh[\/url]","entities":null,"id":328691985256968193,"inReplyToScreenName":"ArchGrants","inReplyToStatusId":null,"inReplyToUserId":"462963112","retweetedCount":1,"socialInfo":{"imageUrl":null,"shortDesc":"@ArchGrants @IDCProjects @2000F and #St Louis, thank you for opening doors for us! That's the power of Arch Grants! http:\/\/t.co\/LgjvYeEPeh","socialId":"Twitter:328691985256968193","title":"@ArchGrants @IDCProjects @2000F and #St Louis, thank you for opening doors for us! That's the power of Arch Grants! http:\/\/t.co\/LgjvYeEPeh","url":null},"source":"<a href=\"http:\/\/twitter.com\/download\/iphone\" rel=\"nofollow\">Twitter for iPhone<\/a>","time":1367201250},{"description":"Candy Lab | Cachetown augmented reality: [url]http:\/\/t.co\/euOs7Dc1BJ[\/url] via [twit=YouTube]@YouTube[\/twit]","entities":null,"id":325233513341255680,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"Candy Lab | Cachetown augmented reality: http:\/\/t.co\/euOs7Dc1BJ via @YouTube","socialId":"Twitter:325233513341255680","title":"Candy Lab | Cachetown augmented reality: http:\/\/t.co\/euOs7Dc1BJ via @YouTube","url":null},"source":"<a href=\"http:\/\/www.google.com\/\" rel=\"nofollow\">Google<\/a>","time":1366376686},{"description":"I'm in the session: Retail (test)","entities":null,"id":324004364010274817,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"I'm in the session: Retail (test)","socialId":"Twitter:324004364010274817","title":"I'm in the session: Retail (test)","url":null},"source":"<a href=\"http:\/\/twitter.com\/tweetbutton\" rel=\"nofollow\">Tweet Button<\/a>","time":1366083634},{"description":"[url]https:\/\/t.co\/u4BCcwCvZ4[\/url]","entities":null,"id":321032331081154561,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"https:\/\/t.co\/u4BCcwCvZ4","socialId":"Twitter:321032331081154561","title":"https:\/\/t.co\/u4BCcwCvZ4","url":null},"source":"<a href=\"http:\/\/vine.co\" rel=\"nofollow\">Vine - Make a Scene<\/a>","time":1365375046},{"description":"[twit=jakekohl523]@jakekohl523[\/twit] - Buy lots of Advil and dawn some experimental thoughts. Get ready for a fun ([twit=YouTube]@YouTube[\/twit] [url]http:\/\/t.co\/D9qM0EKrVQ)[\/url]","entities":null,"id":320871422547349504,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"@jakekohl523 - Buy lots of Advil and dawn some experimental thoughts. Get ready for a fun (@YouTube http:\/\/t.co\/D9qM0EKrVQ)","socialId":"Twitter:320871422547349504","title":"@jakekohl523 - Buy lots of Advil and dawn some experimental thoughts. Get ready for a fun (@YouTube http:\/\/t.co\/D9qM0EKrVQ)","url":null},"source":"<a href=\"http:\/\/www.google.com\/\" rel=\"nofollow\">Google<\/a>","time":1365336683},{"description":"If you have any nominations for [trend=MostEligible]#MostEligible[\/trend] people send them our way at [url]http:\/\/t.co\/RYk90r23g0[\/url]","entities":null,"id":318509484647530497,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"If you have any nominations for #MostEligible people send them our way at http:\/\/t.co\/RYk90r23g0","socialId":"Twitter:318509484647530497","title":"If you have any nominations for #MostEligible people send them our way at http:\/\/t.co\/RYk90r23g0","url":null},"source":"<a href=\"http:\/\/twitter.com\/tweetbutton\" rel=\"nofollow\">Tweet Button<\/a>","time":1364773553},{"description":"[trend=snowstorm]#snowstorm[\/trend] [twit=DenverConnect]@DenverConnect[\/twit] thanks for the snowwwww","entities":null,"id":315510792193728513,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"#snowstorm @DenverConnect thanks for the snowwwww","socialId":"Twitter:315510792193728513","title":"#snowstorm @DenverConnect thanks for the snowwwww","url":null},"source":"<a href=\"http:\/\/twitter.com\/download\/iphone\" rel=\"nofollow\">Twitter for iPhone<\/a>","time":1364058609},{"description":"[url]https:\/\/t.co\/iO7MO2YMuY[\/url]","entities":null,"id":315321868993302528,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"https:\/\/t.co\/iO7MO2YMuY","socialId":"Twitter:315321868993302528","title":"https:\/\/t.co\/iO7MO2YMuY","url":null},"source":"<a href=\"http:\/\/vine.co\" rel=\"nofollow\">Vine - Make a Scene<\/a>","time":1364013566},{"description":"No lodging in [trend=Vail]#Vail[\/trend] - now we sleep like creepers in a moving truck until the sun comes up in hopes it melts the ice on the road. [trend=notwinning]#notwinning[\/trend]","entities":null,"id":315024516977917953,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"No lodging in #Vail - now we sleep like creepers in a moving truck until the sun comes up in hopes it melts the ice on the road. #notwinning","socialId":"Twitter:315024516977917953","title":"No lodging in #Vail - now we sleep like creepers in a moving truck until the sun comes up in hopes it melts the ice on the road. #notwinning","url":null},"source":"<a href=\"http:\/\/twitter.com\/download\/iphone\" rel=\"nofollow\">Twitter for iPhone<\/a>","time":1363942672},{"description":"Gaming alternatives to [trend=ppc]#ppc[\/trend] [trend=Adwords]#Adwords[\/trend] campaigns can be found at [trend=Cachetown]#Cachetown[\/trend] - businesses pay for consumers to play! [trend=AugmentedReality]#AugmentedReality[\/trend] [trend=Retail]#Retail[\/trend]","entities":null,"id":314929596975947776,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"Gaming alternatives to #ppc #Adwords campaigns can be found at #Cachetown - businesses pay for consumers to play! #AugmentedReality #Retail","socialId":"Twitter:314929596975947776","title":"Gaming alternatives to #ppc #Adwords campaigns can be found at #Cachetown - businesses pay for consumers to play! #AugmentedReality #Retail","url":null},"source":"<a href=\"http:\/\/twitter.com\/download\/iphone\" rel=\"nofollow\">Twitter for iPhone<\/a>","time":1363920041},{"description":"Thank you [twit=KauffmanFDN]@KauffmanFDN[\/twit] for an awesome interview! For my fellow entrepreneurial [trend=Veterans]#Veterans[\/trend] [twit=veteransunited]@veteransunited[\/twit] check out [trend=AWE2013]#AWE2013[\/trend] [twit=ARealityEvent]@ARealityEvent[\/twit]","entities":null,"id":312492739382087680,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":1,"socialInfo":{"imageUrl":null,"shortDesc":"Thank you @KauffmanFDN for an awesome interview! For my fellow entrepreneurial #Veterans @veteransunited check out #AWE2013 @ARealityEvent","socialId":"Twitter:312492739382087680","title":"Thank you @KauffmanFDN for an awesome interview! For my fellow entrepreneurial #Veterans @veteransunited check out #AWE2013 @ARealityEvent","url":null},"source":"web","time":1363339049},{"description":"Working with the creative team at Candylab makes me laugh so \u000ahard when we figure out ways to make Cachetown more fun. Like tonight :)","entities":null,"id":312111160746979328,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"Working with the creative team at Candylab makes me laugh so \u000ahard when we figure out ways to make Cachetown more fun. Like tonight :)","socialId":"Twitter:312111160746979328","title":"Working with the creative team at Candylab makes me laugh so \u000ahard when we figure out ways to make Cachetown more fun. Like tonight :)","url":null},"source":"<a href=\"http:\/\/twitter.com\/download\/iphone\" rel=\"nofollow\">Twitter for iPhone<\/a>","time":1363248074},{"description":"[url]http:\/\/t.co\/fuXFVmxAvj[\/url]","entities":null,"id":309148202534309888,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"http:\/\/t.co\/fuXFVmxAvj","socialId":"Twitter:309148202534309888","title":"http:\/\/t.co\/fuXFVmxAvj","url":null},"source":"<a href=\"http:\/\/vine.co\" rel=\"nofollow\">Vine - Make a Scene<\/a>","time":1362541649},{"description":"[url]http:\/\/t.co\/DhWgwHnGSe[\/url]","entities":null,"id":309127445972406274,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"http:\/\/t.co\/DhWgwHnGSe","socialId":"Twitter:309127445972406274","title":"http:\/\/t.co\/DhWgwHnGSe","url":null},"source":"<a href=\"http:\/\/vine.co\" rel=\"nofollow\">Vine - Make a Scene<\/a>","time":1362536701},{"description":"[twit=Adweek]@Adweek[\/twit] Thank you for sharing Cachetown with your readers, now were able to share its retail use with Housewares! :) [url]http:\/\/t.co\/iXlSsWw1L4[\/url]","entities":null,"id":308008498686468096,"inReplyToScreenName":"Adweek","inReplyToStatusId":null,"inReplyToUserId":"30205586","retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"@Adweek Thank you for sharing Cachetown with your readers, now were able to share its retail use with Housewares! :) http:\/\/t.co\/iXlSsWw1L4","socialId":"Twitter:308008498686468096","title":"@Adweek Thank you for sharing Cachetown with your readers, now were able to share its retail use with Housewares! :) http:\/\/t.co\/iXlSsWw1L4","url":null},"source":"<a href=\"http:\/\/twitter.com\/download\/iphone\" rel=\"nofollow\">Twitter for iPhone<\/a>","time":1362269923},{"description":"[twit=mashable]@mashable[\/twit] Thank you for sharing Cachetown with your readers. We're able to share its retail use with Housewares now [url]http:\/\/t.co\/mEOd3hcHru[\/url]","entities":null,"id":308007464836673536,"inReplyToScreenName":"mashable","inReplyToStatusId":null,"inReplyToUserId":"972651","retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"@mashable Thank you for sharing Cachetown with your readers. We're able to share its retail use with Housewares now http:\/\/t.co\/mEOd3hcHru","socialId":"Twitter:308007464836673536","title":"@mashable Thank you for sharing Cachetown with your readers. We're able to share its retail use with Housewares now http:\/\/t.co\/mEOd3hcHru","url":null},"source":"<a href=\"http:\/\/twitter.com\/download\/iphone\" rel=\"nofollow\">Twitter for iPhone<\/a>","time":1362269676},{"description":"[twit=chefsarahjayne]@chefsarahjayne[\/twit] - awesome samples today Chef Sarah! [trend=candylab]#candylab[\/trend] [url]http:\/\/t.co\/nnbmNEzzIn[\/url]","entities":null,"id":308005593241747456,"inReplyToScreenName":"chefsarahjayne","inReplyToStatusId":null,"inReplyToUserId":"56802765","retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"@chefsarahjayne - awesome samples today Chef Sarah! #candylab http:\/\/t.co\/nnbmNEzzIn","socialId":"Twitter:308005593241747456","title":"@chefsarahjayne - awesome samples today Chef Sarah! #candylab http:\/\/t.co\/nnbmNEzzIn","url":null},"source":"<a href=\"http:\/\/twitter.com\/download\/iphone\" rel=\"nofollow\">Twitter for iPhone<\/a>","time":1362269230},{"description":"[twit=SchmidtBros]@SchmidtBros[\/twit] - great set up and product guys! Was such a pleasure to eat that awesome food too! :) [url]http:\/\/t.co\/yqBWSOWJKV[\/url]","entities":null,"id":307942320471408641,"inReplyToScreenName":"SchmidtBros","inReplyToStatusId":null,"inReplyToUserId":"327741667","retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"@SchmidtBros - great set up and product guys! Was such a pleasure to eat that awesome food too! :) http:\/\/t.co\/yqBWSOWJKV","socialId":"Twitter:307942320471408641","title":"@SchmidtBros - great set up and product guys! Was such a pleasure to eat that awesome food too! :) http:\/\/t.co\/yqBWSOWJKV","url":null},"source":"<a href=\"http:\/\/twitter.com\/download\/iphone\" rel=\"nofollow\">Twitter for iPhone<\/a>","time":1362254145}],"totalFollowers":9,"totalStatuses":29,"user":"Candy Lab"},"maxAge":1200,"serviceUrl":"http:\/\/cms.mobile.conduit-services.com\/twitter\/user\/Chooseawinner\/25\/0\/?params=%7B%7D"},{"data":{"author":"AugmentedRealityOrg","categories":[],"description":null,"imageUrl":"http:\/\/www.youtube.com\/img\/pic_youtubelogo_123x63.gif","items":[{"author":"AugmentedRealityOrg","categories":["Science & Technology","Tech"],"credits":{"uploader":"augmentedrealityorg"},"description":"Keynote speakers at AWE 2013: Steve Mann, Will Wright, Bruce Sterling, Tomi Ahonen, Philip Rosedale, Amber Case\u000aEdited by Chris Grayson","duration":154,"id":"tag:youtube.com,2008:video:BbQMeG4IdYo","info":{"likes":{"dislikes":0,"likes":2},"rating":{"avg":5,"total":2},"stats":{"favorite":0,"view":119}},"largeThumbnail":"http:\/\/i.ytimg.com\/vi\/BbQMeG4IdYo\/hqdefault.jpg","link":"http:\/\/www.youtube.com\/watch?v=BbQMeG4IdYo&feature=youtube_gdata#noredirect","mediumThumbnail":"http:\/\/i.ytimg.com\/vi\/BbQMeG4IdYo\/3.jpg","smallThumbnail":"http:\/\/i.ytimg.com\/vi\/BbQMeG4IdYo\/default.jpg","socialInfo":{"imageUrl":"http:\/\/i.ytimg.com\/vi\/BbQMeG4IdYo\/default.jpg","shortDesc":"Keynote speakers at AWE 2013: Steve Mann, Will Wright, Bruce Sterling, Tomi Ahonen, Philip Rosedale, Amber Case\u000aEdited by Chris Grayson","socialId":"Videos:tag:youtube.com,2008:video:BbQMeG4IdYo","title":"AWE 2013 keynote speakers teaser","url":"http:\/\/www.youtube.com\/watch?v=BbQMeG4IdYo&feature=youtube_gdata"},"stream":{"mediaType":2,"type":"application\/x-shockwave-flash","url":"http:\/\/www.youtube.com\/v\/BbQMeG4IdYo?version=3&f=user_uploads&app=youtube_gdata"},"textItems":[],"time":1365355569,"title":"AWE 2013 keynote speakers teaser"},{"author":"AugmentedRealityOrg","categories":["People & Blogs","People"],"credits":{"uploader":"augmentedrealityorg"},"description":"Tsutomu Horikawa (Sony Computer \u000aEntertainment)  - Captured Live on Ustream at http:\/\/www.ustream.tv\/channel\/are-production","duration":1293,"id":"tag:youtube.com,2008:video:r68oY9eA9ls","info":{"rating":{"avg":null,"total":null},"stats":{"favorite":0,"view":50}},"largeThumbnail":"http:\/\/i.ytimg.com\/vi\/r68oY9eA9ls\/hqdefault.jpg","link":"http:\/\/www.youtube.com\/watch?v=r68oY9eA9ls&feature=youtube_gdata#noredirect","mediumThumbnail":"http:\/\/i.ytimg.com\/vi\/r68oY9eA9ls\/3.jpg","smallThumbnail":"http:\/\/i.ytimg.com\/vi\/r68oY9eA9ls\/default.jpg","socialInfo":{"imageUrl":"http:\/\/i.ytimg.com\/vi\/r68oY9eA9ls\/default.jpg","shortDesc":"Tsutomu Horikawa (Sony Computer \u000aEntertainment)  - Captured Live on Ustream at http:\/\/www.ustream.tv\/channel\/are-production","socialId":"Videos:tag:youtube.com,2008:video:r68oY9eA9ls","title":"ARE 2012 - AR Game Experiences","url":"http:\/\/www.youtube.com\/watch?v=r68oY9eA9ls&feature=youtube_gdata"},"stream":{"mediaType":2,"type":"application\/x-shockwave-flash","url":"http:\/\/www.youtube.com\/v\/r68oY9eA9ls?version=3&f=user_uploads&app=youtube_gdata"},"textItems":[],"time":1358353031,"title":"ARE 2012 - AR Game Experiences"},{"author":"AugmentedRealityOrg","categories":["People & Blogs","People"],"credits":{"uploader":"augmentedrealityorg"},"description":"Jordan Wollman (Aria) - A tour guide in the \u000apalm of your hand - Captured Live on Ustream at http:\/\/www.ustream.tv\/channel\/are-production","duration":1155,"id":"tag:youtube.com,2008:video:yzJyeFiZ_Uo","info":{"rating":{"avg":null,"total":null},"stats":{"favorite":0,"view":28}},"largeThumbnail":"http:\/\/i.ytimg.com\/vi\/yzJyeFiZ_Uo\/hqdefault.jpg","link":"http:\/\/www.youtube.com\/watch?v=yzJyeFiZ_Uo&feature=youtube_gdata#noredirect","mediumThumbnail":"http:\/\/i.ytimg.com\/vi\/yzJyeFiZ_Uo\/3.jpg","smallThumbnail":"http:\/\/i.ytimg.com\/vi\/yzJyeFiZ_Uo\/default.jpg","socialInfo":{"imageUrl":"http:\/\/i.ytimg.com\/vi\/yzJyeFiZ_Uo\/default.jpg","shortDesc":"Jordan Wollman (Aria) - A tour guide in the \u000apalm of your hand - Captured Live on Ustream at http:\/\/www.ustream.tv\/channel\/are-production","socialId":"Videos:tag:youtube.com,2008:video:yzJyeFiZ_Uo","title":"ARE 2012 - AR For Tourism and Navigation - Jordan Wollman (Aria)","url":"http:\/\/www.youtube.com\/watch?v=yzJyeFiZ_Uo&feature=youtube_gdata"},"stream":{"mediaType":2,"type":"application\/x-shockwave-flash","url":"http:\/\/www.youtube.com\/v\/yzJyeFiZ_Uo?version=3&f=user_uploads&app=youtube_gdata"},"textItems":[],"time":1358352846,"title":"ARE 2012 - AR For Tourism and Navigation - Jordan Wollman (Aria)"},{"author":"AugmentedRealityOrg","categories":["People & Blogs","People"],"credits":{"uploader":"augmentedrealityorg"},"description":"A panel with Amir Baradaran, BC \"Heavy\" Biermann, Jason Wilson, Bruce Sterling \u000a - Captured Live on Ustream at http:\/\/www.ustream.tv\/channel\/are-production","duration":124,"id":"tag:youtube.com,2008:video:pFTSgml5ldM","info":{"rating":{"avg":null,"total":null},"stats":{"favorite":0,"view":17}},"largeThumbnail":"http:\/\/i.ytimg.com\/vi\/pFTSgml5ldM\/hqdefault.jpg","link":"http:\/\/www.youtube.com\/watch?v=pFTSgml5ldM&feature=youtube_gdata#noredirect","mediumThumbnail":"http:\/\/i.ytimg.com\/vi\/pFTSgml5ldM\/3.jpg","smallThumbnail":"http:\/\/i.ytimg.com\/vi\/pFTSgml5ldM\/default.jpg","socialInfo":{"imageUrl":"http:\/\/i.ytimg.com\/vi\/pFTSgml5ldM\/default.jpg","shortDesc":"A panel with Amir Baradaran, BC \"Heavy\" Biermann, Jason Wilson, Bruce Sterling \u000a - Captured Live on Ustream at http:\/\/www.ustream.tv\/channel\/are-production","socialId":"Videos:tag:youtube.com,2008:video:pFTSgml5ldM","title":"ARE 2012 - AR in ART","url":"http:\/\/www.youtube.com\/watch?v=pFTSgml5ldM&feature=youtube_gdata"},"stream":{"mediaType":2,"type":"application\/x-shockwave-flash","url":"http:\/\/www.youtube.com\/v\/pFTSgml5ldM?version=3&f=user_uploads&app=youtube_gdata"},"textItems":[],"time":1358352823,"title":"ARE 2012 - AR in ART"},{"author":"AugmentedRealityOrg","categories":["People & Blogs","People"],"credits":{"uploader":"augmentedrealityorg"},"description":"Business Track Stream\u000aBruno Uzzan - ROI in AR Campaigns - Captured Live on Ustream at http:\/\/www.ustream.tv\/channel\/are-business","duration":1551,"id":"tag:youtube.com,2008:video:dovbT7bTHVA","info":{"rating":{"avg":null,"total":null},"stats":{"favorite":0,"view":32}},"largeThumbnail":"http:\/\/i.ytimg.com\/vi\/dovbT7bTHVA\/hqdefault.jpg","link":"http:\/\/www.youtube.com\/watch?v=dovbT7bTHVA&feature=youtube_gdata#noredirect","mediumThumbnail":"http:\/\/i.ytimg.com\/vi\/dovbT7bTHVA\/3.jpg","smallThumbnail":"http:\/\/i.ytimg.com\/vi\/dovbT7bTHVA\/default.jpg","socialInfo":{"imageUrl":"http:\/\/i.ytimg.com\/vi\/dovbT7bTHVA\/default.jpg","shortDesc":"Business Track Stream\u000aBruno Uzzan - ROI in AR Campaigns - Captured Live on Ustream at http:\/\/www.ustream.tv\/channel\/are-business","socialId":"Videos:tag:youtube.com,2008:video:dovbT7bTHVA","title":"ARE2012 - Bruno Uzzan (CEO, Total Immersion) ROI in AR Campaigns","url":"http:\/\/www.youtube.com\/watch?v=dovbT7bTHVA&feature=youtube_gdata"},"stream":{"mediaType":2,"type":"application\/x-shockwave-flash","url":"http:\/\/www.youtube.com\/v\/dovbT7bTHVA?version=3&f=user_uploads&app=youtube_gdata"},"textItems":[],"time":1358297333,"title":"ARE2012 - Bruno Uzzan (CEO, Total Immersion) ROI in AR Campaigns"},{"author":"AugmentedRealityOrg","categories":["People & Blogs","People"],"credits":{"uploader":"augmentedrealityorg"},"description":"Business Track Stream - Captured Live on Ustream at http:\/\/www.ustream.tv\/channel\/are-business","duration":1178,"id":"tag:youtube.com,2008:video:VV6rwfXjQ4U","info":{"rating":{"avg":null,"total":null},"stats":{"favorite":0,"view":22}},"largeThumbnail":"http:\/\/i.ytimg.com\/vi\/VV6rwfXjQ4U\/sddefault.jpg","link":"http:\/\/www.youtube.com\/watch?v=VV6rwfXjQ4U&feature=youtube_gdata#noredirect","mediumThumbnail":"http:\/\/i.ytimg.com\/vi\/VV6rwfXjQ4U\/3.jpg","smallThumbnail":"http:\/\/i.ytimg.com\/vi\/VV6rwfXjQ4U\/default.jpg","socialInfo":{"imageUrl":"http:\/\/i.ytimg.com\/vi\/VV6rwfXjQ4U\/default.jpg","shortDesc":"Business Track Stream - Captured Live on Ustream at http:\/\/www.ustream.tv\/channel\/are-business","socialId":"Videos:tag:youtube.com,2008:video:VV6rwfXjQ4U","title":"ARE2012 - Ambarish Mitra - Business Track Stream - ARE@2012","url":"http:\/\/www.youtube.com\/watch?v=VV6rwfXjQ4U&feature=youtube_gdata"},"stream":{"mediaType":2,"type":"application\/x-shockwave-flash","url":"http:\/\/www.youtube.com\/v\/VV6rwfXjQ4U?version=3&f=user_uploads&app=youtube_gdata"},"textItems":[],"time":1358297271,"title":"ARE2012 - Ambarish Mitra - Business Track Stream - ARE@2012"},{"author":"AugmentedRealityOrg","categories":["People & Blogs","People"],"credits":{"uploader":"augmentedrealityorg"},"description":"Business Track Stream\u000aRon Haidenger (Vuzix)\u000aStephen Willey (CEO, Innovega)\u000aKayvan Mirza (CEO, Optinvent) \u000a - Captured Live on Ustream at http:\/\/www.ustream.tv\/channel\/are-business","duration":2178,"id":"tag:youtube.com,2008:video:WyEGIyIgQMc","info":{"rating":{"avg":null,"total":null},"stats":{"favorite":0,"view":18}},"largeThumbnail":"http:\/\/i.ytimg.com\/vi\/WyEGIyIgQMc\/sddefault.jpg","link":"http:\/\/www.youtube.com\/watch?v=WyEGIyIgQMc&feature=youtube_gdata#noredirect","mediumThumbnail":"http:\/\/i.ytimg.com\/vi\/WyEGIyIgQMc\/3.jpg","smallThumbnail":"http:\/\/i.ytimg.com\/vi\/WyEGIyIgQMc\/default.jpg","socialInfo":{"imageUrl":"http:\/\/i.ytimg.com\/vi\/WyEGIyIgQMc\/default.jpg","shortDesc":"Business Track Stream\u000aRon Haidenger (Vuzix)\u000aStephen Willey (CEO, Innovega)\u000aKayvan Mirza (CEO, Optinvent) \u000a - Captured Live on Ustream at http:\/\/www.ustream.tv\/channel\/are-business","socialId":"Videos:tag:youtube.com,2008:video:WyEGIyIgQMc","title":"ARE2012 - AR Eyewear - Business Track Stream","url":"http:\/\/www.youtube.com\/watch?v=WyEGIyIgQMc&feature=youtube_gdata"},"stream":{"mediaType":2,"type":"application\/x-shockwave-flash","url":"http:\/\/www.youtube.com\/v\/WyEGIyIgQMc?version=3&f=user_uploads&app=youtube_gdata"},"textItems":[],"time":1358297180,"title":"ARE2012 - AR Eyewear - Business Track Stream"},{"author":"AugmentedRealityOrg","categories":["People & Blogs","People"],"credits":{"uploader":"augmentedrealityorg"},"description":"Business Track Stream - Captured Live on Ustream at http:\/\/www.ustream.tv\/channel\/are-business","duration":1209,"id":"tag:youtube.com,2008:video:LCtLMbTxiOY","info":{"rating":{"avg":null,"total":null},"stats":{"favorite":0,"view":14}},"largeThumbnail":"http:\/\/i.ytimg.com\/vi\/LCtLMbTxiOY\/hqdefault.jpg","link":"http:\/\/www.youtube.com\/watch?v=LCtLMbTxiOY&feature=youtube_gdata#noredirect","mediumThumbnail":"http:\/\/i.ytimg.com\/vi\/LCtLMbTxiOY\/3.jpg","smallThumbnail":"http:\/\/i.ytimg.com\/vi\/LCtLMbTxiOY\/default.jpg","socialInfo":{"imageUrl":"http:\/\/i.ytimg.com\/vi\/LCtLMbTxiOY\/default.jpg","shortDesc":"Business Track Stream - Captured Live on Ustream at http:\/\/www.ustream.tv\/channel\/are-business","socialId":"Videos:tag:youtube.com,2008:video:LCtLMbTxiOY","title":"ARE2012 - Maarten Lens-FitzGerald - Business Track","url":"http:\/\/www.youtube.com\/watch?v=LCtLMbTxiOY&feature=youtube_gdata"},"stream":{"mediaType":2,"type":"application\/x-shockwave-flash","url":"http:\/\/www.youtube.com\/v\/LCtLMbTxiOY?version=3&f=user_uploads&app=youtube_gdata"},"textItems":[],"time":1358297100,"title":"ARE2012 - Maarten Lens-FitzGerald - Business Track"},{"author":"AugmentedRealityOrg","categories":["People & Blogs","People"],"credits":{"uploader":"augmentedrealityorg"},"description":"Business Track Stream - Captured Live on Ustream at http:\/\/www.ustream.tv\/channel\/are-business","duration":900,"id":"tag:youtube.com,2008:video:xvDWq3vclOA","info":{"likes":{"dislikes":1,"likes":0},"rating":{"avg":1,"total":1},"stats":{"favorite":0,"view":14}},"largeThumbnail":"http:\/\/i.ytimg.com\/vi\/xvDWq3vclOA\/hqdefault.jpg","link":"http:\/\/www.youtube.com\/watch?v=xvDWq3vclOA&feature=youtube_gdata#noredirect","mediumThumbnail":"http:\/\/i.ytimg.com\/vi\/xvDWq3vclOA\/3.jpg","smallThumbnail":"http:\/\/i.ytimg.com\/vi\/xvDWq3vclOA\/default.jpg","socialInfo":{"imageUrl":"http:\/\/i.ytimg.com\/vi\/xvDWq3vclOA\/default.jpg","shortDesc":"Business Track Stream - Captured Live on Ustream at http:\/\/www.ustream.tv\/channel\/are-business","socialId":"Videos:tag:youtube.com,2008:video:xvDWq3vclOA","title":"ARE2012 - Matt Szymczyk - Business Track Stream","url":"http:\/\/www.youtube.com\/watch?v=xvDWq3vclOA&feature=youtube_gdata"},"stream":{"mediaType":2,"type":"application\/x-shockwave-flash","url":"http:\/\/www.youtube.com\/v\/xvDWq3vclOA?version=3&f=user_uploads&app=youtube_gdata"},"textItems":[],"time":1358297050,"title":"ARE2012 - Matt Szymczyk - Business Track Stream"},{"author":"AugmentedRealityOrg","categories":["People & Blogs","People"],"credits":{"uploader":"augmentedrealityorg"},"description":"Business Track Stream - Captured Live on Ustream at http:\/\/www.ustream.tv\/channel\/are-business","duration":828,"id":"tag:youtube.com,2008:video:O9yBeb_EwYA","info":{"rating":{"avg":null,"total":null},"stats":{"favorite":0,"view":18}},"largeThumbnail":"http:\/\/i.ytimg.com\/vi\/O9yBeb_EwYA\/hqdefault.jpg","link":"http:\/\/www.youtube.com\/watch?v=O9yBeb_EwYA&feature=youtube_gdata#noredirect","mediumThumbnail":"http:\/\/i.ytimg.com\/vi\/O9yBeb_EwYA\/3.jpg","smallThumbnail":"http:\/\/i.ytimg.com\/vi\/O9yBeb_EwYA\/default.jpg","socialInfo":{"imageUrl":"http:\/\/i.ytimg.com\/vi\/O9yBeb_EwYA\/default.jpg","shortDesc":"Business Track Stream - Captured Live on Ustream at http:\/\/www.ustream.tv\/channel\/are-business","socialId":"Videos:tag:youtube.com,2008:video:O9yBeb_EwYA","title":"ARE2012 - Augmented Reality Eyewear - Business Track Stream","url":"http:\/\/www.youtube.com\/watch?v=O9yBeb_EwYA&feature=youtube_gdata"},"stream":{"mediaType":2,"type":"application\/x-shockwave-flash","url":"http:\/\/www.youtube.com\/v\/O9yBeb_EwYA?version=3&f=user_uploads&app=youtube_gdata"},"textItems":[],"time":1358297042,"title":"ARE2012 - Augmented Reality Eyewear - Business Track Stream"},{"author":"AugmentedRealityOrg","categories":["People & Blogs","People"],"credits":{"uploader":"augmentedrealityorg"},"description":"Christine Perey (Perey Consulting) -                             \u000a3D in AR production and delivery - Captured Live on Ustream at http:\/\/www.ustream.tv\/channel\/are-production","duration":1217,"id":"tag:youtube.com,2008:video:KMoauexaoA4","info":{"rating":{"avg":null,"total":null},"stats":{"favorite":0,"view":8}},"largeThumbnail":"http:\/\/i.ytimg.com\/vi\/KMoauexaoA4\/sddefault.jpg","link":"http:\/\/www.youtube.com\/watch?v=KMoauexaoA4&feature=youtube_gdata#noredirect","mediumThumbnail":"http:\/\/i.ytimg.com\/vi\/KMoauexaoA4\/3.jpg","smallThumbnail":"http:\/\/i.ytimg.com\/vi\/KMoauexaoA4\/default.jpg","socialInfo":{"imageUrl":"http:\/\/i.ytimg.com\/vi\/KMoauexaoA4\/default.jpg","shortDesc":"Christine Perey (Perey Consulting) -                             \u000a3D in AR production and delivery - Captured Live on Ustream at http:\/\/www.ustream.tv\/channel\/are-production","socialId":"Videos:tag:youtube.com,2008:video:KMoauexaoA4","title":"ARE2012 - Unlocking content with AR Moderated by Christine Perey","url":"http:\/\/www.youtube.com\/watch?v=KMoauexaoA4&feature=youtube_gdata"},"stream":{"mediaType":2,"type":"application\/x-shockwave-flash","url":"http:\/\/www.youtube.com\/v\/KMoauexaoA4?version=3&f=user_uploads&app=youtube_gdata"},"textItems":[],"time":1358297034,"title":"ARE2012 - Unlocking content with AR Moderated by Christine Perey"},{"author":"AugmentedRealityOrg","categories":["People & Blogs","People"],"credits":{"uploader":"augmentedrealityorg"},"description":"Kayvan Mirza (CEO, Optinvent) - Business Track Stream - Captured Live on Ustream at http:\/\/www.ustream.tv\/channel\/are-business","duration":641,"id":"tag:youtube.com,2008:video:_tZ4hCFI7cs","info":{"rating":{"avg":null,"total":null},"stats":{"favorite":0,"view":66}},"largeThumbnail":"http:\/\/i.ytimg.com\/vi\/_tZ4hCFI7cs\/hqdefault.jpg","link":"http:\/\/www.youtube.com\/watch?v=_tZ4hCFI7cs&feature=youtube_gdata#noredirect","mediumThumbnail":"http:\/\/i.ytimg.com\/vi\/_tZ4hCFI7cs\/3.jpg","smallThumbnail":"http:\/\/i.ytimg.com\/vi\/_tZ4hCFI7cs\/default.jpg","socialInfo":{"imageUrl":"http:\/\/i.ytimg.com\/vi\/_tZ4hCFI7cs\/default.jpg","shortDesc":"Kayvan Mirza (CEO, Optinvent) - Business Track Stream - Captured Live on Ustream at http:\/\/www.ustream.tv\/channel\/are-business","socialId":"Videos:tag:youtube.com,2008:video:_tZ4hCFI7cs","title":"ARE2012 - Kayvan Mirza (CEO, Optinvent)  - AR Eyewear - Business Track","url":"http:\/\/www.youtube.com\/watch?v=_tZ4hCFI7cs&feature=youtube_gdata"},"stream":{"mediaType":2,"type":"application\/x-shockwave-flash","url":"http:\/\/www.youtube.com\/v\/_tZ4hCFI7cs?version=3&f=user_uploads&app=youtube_gdata"},"textItems":[],"time":1358297029,"title":"ARE2012 - Kayvan Mirza (CEO, Optinvent)  - AR Eyewear - Business Track"},{"author":"AugmentedRealityOrg","categories":["People & Blogs","People"],"credits":{"uploader":"augmentedrealityorg"},"description":"Business Track Stream - Captured Live on Ustream at http:\/\/www.ustream.tv\/channel\/are-business","duration":1096,"id":"tag:youtube.com,2008:video:J1Ak9D85KSU","info":{"rating":{"avg":null,"total":null},"stats":{"favorite":0,"view":11}},"largeThumbnail":"http:\/\/i.ytimg.com\/vi\/J1Ak9D85KSU\/hqdefault.jpg","link":"http:\/\/www.youtube.com\/watch?v=J1Ak9D85KSU&feature=youtube_gdata#noredirect","mediumThumbnail":"http:\/\/i.ytimg.com\/vi\/J1Ak9D85KSU\/3.jpg","smallThumbnail":"http:\/\/i.ytimg.com\/vi\/J1Ak9D85KSU\/default.jpg","socialInfo":{"imageUrl":"http:\/\/i.ytimg.com\/vi\/J1Ak9D85KSU\/default.jpg","shortDesc":"Business Track Stream - Captured Live on Ustream at http:\/\/www.ustream.tv\/channel\/are-business","socialId":"Videos:tag:youtube.com,2008:video:J1Ak9D85KSU","title":"ARE2012 - Scott O'Brien - Business Track Stream","url":"http:\/\/www.youtube.com\/watch?v=J1Ak9D85KSU&feature=youtube_gdata"},"stream":{"mediaType":2,"type":"application\/x-shockwave-flash","url":"http:\/\/www.youtube.com\/v\/J1Ak9D85KSU?version=3&f=user_uploads&app=youtube_gdata"},"textItems":[],"time":1358297007,"title":"ARE2012 - Scott O'Brien - Business Track Stream"},{"author":"AugmentedRealityOrg","categories":["People & Blogs","People"],"credits":{"uploader":"augmentedrealityorg"},"description":"Business Track Stream - Captured Live on Ustream at http:\/\/www.ustream.tv\/channel\/are-business","duration":218,"id":"tag:youtube.com,2008:video:c8cudmwXsh8","info":{"rating":{"avg":null,"total":null},"stats":{"favorite":0,"view":14}},"largeThumbnail":"http:\/\/i.ytimg.com\/vi\/c8cudmwXsh8\/sddefault.jpg","link":"http:\/\/www.youtube.com\/watch?v=c8cudmwXsh8&feature=youtube_gdata#noredirect","mediumThumbnail":"http:\/\/i.ytimg.com\/vi\/c8cudmwXsh8\/3.jpg","smallThumbnail":"http:\/\/i.ytimg.com\/vi\/c8cudmwXsh8\/default.jpg","socialInfo":{"imageUrl":"http:\/\/i.ytimg.com\/vi\/c8cudmwXsh8\/default.jpg","shortDesc":"Business Track Stream - Captured Live on Ustream at http:\/\/www.ustream.tv\/channel\/are-business","socialId":"Videos:tag:youtube.com,2008:video:c8cudmwXsh8","title":"ARE2012 - Ambarish Mitra Q&A- Business Track Stream","url":"http:\/\/www.youtube.com\/watch?v=c8cudmwXsh8&feature=youtube_gdata"},"stream":{"mediaType":2,"type":"application\/x-shockwave-flash","url":"http:\/\/www.youtube.com\/v\/c8cudmwXsh8?version=3&f=user_uploads&app=youtube_gdata"},"textItems":[],"time":1358296930,"title":"ARE2012 - Ambarish Mitra Q&A- Business Track Stream"},{"author":"AugmentedRealityOrg","categories":["People & Blogs","People"],"credits":{"uploader":"augmentedrealityorg"},"description":"Business Track Stream - Captured Live on Ustream at http:\/\/www.ustream.tv\/channel\/are-business","duration":113,"id":"tag:youtube.com,2008:video:vd2dLcjk15E","info":{"rating":{"avg":null,"total":null},"stats":{"favorite":0,"view":5}},"largeThumbnail":"http:\/\/i.ytimg.com\/vi\/vd2dLcjk15E\/hqdefault.jpg","link":"http:\/\/www.youtube.com\/watch?v=vd2dLcjk15E&feature=youtube_gdata#noredirect","mediumThumbnail":"http:\/\/i.ytimg.com\/vi\/vd2dLcjk15E\/3.jpg","smallThumbnail":"http:\/\/i.ytimg.com\/vi\/vd2dLcjk15E\/default.jpg","socialInfo":{"imageUrl":"http:\/\/i.ytimg.com\/vi\/vd2dLcjk15E\/default.jpg","shortDesc":"Business Track Stream - Captured Live on Ustream at http:\/\/www.ustream.tv\/channel\/are-business","socialId":"Videos:tag:youtube.com,2008:video:vd2dLcjk15E","title":"ARE2012 - Andrea Carignano - Business Track Stream","url":"http:\/\/www.youtube.com\/watch?v=vd2dLcjk15E&feature=youtube_gdata"},"stream":{"mediaType":2,"type":"application\/x-shockwave-flash","url":"http:\/\/www.youtube.com\/v\/vd2dLcjk15E?version=3&f=user_uploads&app=youtube_gdata"},"textItems":[],"time":1358296810,"title":"ARE2012 - Andrea Carignano - Business Track Stream"}],"paging":{"next":"http:\/\/cms.mobile.conduit-services.com\/media\/video\/2\/15\/15\/?url=http%3a%2f%2fgdata.youtube.com%2ffeeds%2fapi%2fusers%2fAugmentedRealityOrg%2fuploads%2f%3fv%3d2&params=%7b%22expiration%22%3anull%2c%22isOpenSearch%22%3atrue%2c%22sort%22%3anull%7d","nextUrl":"http:\/\/cms.mobile.conduit-services.com\/media\/video\/2\/15\/15\/?url=http%3a%2f%2fgdata.youtube.com%2ffeeds%2fapi%2fusers%2fAugmentedRealityOrg%2fuploads%2f%3fv%3d2&params=%7b%22expiration%22%3anull%2c%22isOpenSearch%22%3atrue%2c%22sort%22%3anull%7d"},"title":"Uploads by AugmentedRealityOrg","total":57},"maxAge":1800,"serviceUrl":"http:\/\/cms.mobile.conduit-services.com\/media\/video\/2\/15\/0\/?url=http%3A%2F%2Fgdata.youtube.com%2Ffeeds%2Fapi%2Fusers%2FAugmentedRealityOrg%2Fuploads%2F%3Fv%3D2%26format%3D5%26orderby%3Dpublished&params=%7B%22isOpenSearch%22%3A%22true%22%7D"},{"data":{"isRtl":false,"items":{"HtmlTextFormSendButton":"Submit","ToastMessageFormFieldMandatory":"Field {fieldName} cannot remain empty","HtmlTextEventsRsvpButton":"Join","HtmlTextEventsRsvpAttending":"Attending","HtmlTextEventsRsvpMaybe":"Maybe","HtmlTextEventsRsvpDecline":"Decline","HtmlTextEventsAdd2CalStr":"Calendar","HtmlTextAboutUsItemTitleGenre":"Genre","HtmlTextAboutUsItemTitleFounded":"Founded","HtmlTextAboutUsItemTitleMembers":"Members","HtmlTextAboutUsItemTitleHometown":"Hometown","HtmlTextAboutUsItemTitleSpecialties":"Specialties","HtmlTextAboutUsItemTitleCulinaryTeam":"Culinary Team","HtmlTextAboutUsItemTitleGeneralInfo":"General Info","ButtonCancel":"Cancel","ButtonClose":"Close","ButtonOk":"OK","ButtonRetry":"Retry","DialogButtonLiveAlbumChoosePhotoCancel":"Cancel","DialogButtonLiveAlbumChoosePhotoChoose":"Choose photo","DialogButtonLiveAlbumChoosePhotoTake":"Take photo","DialogButtonLiveAlbumPostPhotoCancel":"cancel","DialogButtonLiveAlbumPostPhotoOk":"post","DialogCaptionAddedToFavorites":"Add to favorites","DialogCaptionEmail":"Email","DialogCaptionError":"Error","DialogCaptionFacebook":"Facebook","DialogCaptionFacebookLogin":"Facebook Login","DialogCaptionFacebookLogout":"Facebook logout","DialogCaptionFacebookRequiresPermissions":"Facebook","DialogCaptionFailGetFeeds":"Network error","DialogCaptionLiveAlbumPostPhoto":"Post photo","DialogCaptionLivePersonChatEnded":"Chat ended","DialogCaptionLivePersonNoAvailability":"Not available","DialogCaptionLivePersonTimeOut":"Time out","DialogCaptionNavigate":"Navigate","DialogCaptionPhotosManagerDeviceNotSupported":"Your device does not support the photo gallery view","DialogCaptionPhotosManagerSimulatorNotSupported":"Photo gallery view is not supported in simulator mode","DialogCaptionPurchaseChooseMethod":"Purchase:","DialogCaptionShare":"Share","DialogCaptionShareControlDialog":"Share on","DialogCaptionSubscribeFail":"Error","DialogCaptionSubscribeSuccess":"Success","DialogCaptionTwitter":"Twitter","DialogCaptionTwitterLogin":"Twitter Login","DialogCaptionTwitterLogout":"Twitter Logout","DialogMessageAlbumAddedToFavorites":"Album's tracks added to favorites","DialogMessageAppCodeInvalid":"App code is invalid","DialogMessageAudioNoFeeds":"Your device doesn't support playing this type of audio files","DialogMessageAudioNotSupportedDevice":"Your device doesn't support HTML5 audio","DialogMessageAudioNotSupportedSimulator":"Your browser (of the simulator) doesn't support audio","DialogMessageAudioNoUrl":"There is no audio-source.","DialogMessageAudioTypeNotSupportedDevice":"Your device doesn't support playing this type of audio file","DialogMessageAudioTypeNotSupportedSimulator":"Your browser (of the simulator) doesn't support playing this type of audio file","DialogMessageEmailAddressInvalid":"E-mail address is invalid","DialogMessageFacebookLogoutFail":"Unable to log out of Facebook at the moment. Please try again later.","DialogMessageFacebookRequiresPermissions":"This action requires permissions","DialogMessageFailConnectTwitter":"Failed to connect to Twitter","DialogMessageFailGetAppDisabled":"Sorry, this app has been temporarily disabled due to a content violation.\\n\\nPlease check back in a few days","DialogMessageFailGetAppExperience":"Failed to load application data. You must connect to a Wi-Fi or cellular data network to access this data.","DialogMessageFailGetAppId":"Please check your application code and try again","DialogMessageFailGetAppNormal":"Failed to load application data. You must connect to a Wi-Fi or cellular data network to access this data.","DialogMessageFailGetFeeds":"Failed to load application data. You must connect to a Wi-Fi or cellular data network to access this data.","DialogMessageFailGetServiceMap":"Failed to initialize network communication","DialogMessageFailGetServiceMapWinPhone":"Failed to initialize network communication. Press OK to retry or Cancel to quit","DialogMessageFailLoadPage":"Failed to load page.","DialogMessageFailLoginTwitter":"Failed to log in to Twitter","DialogMessageLeaveWarning":"You are about to leave this app. Press OK to continue.","DialogMessageLinkNotSupportedInSimulator":"This link is not supported in simulation mode","DialogMessageLiveAlbumCameraNotSupported":"Camera is not supported","DialogMessageLiveAlbumCameraNotSupportedSimulator":"Camera is not supported in simulation mode","DialogMessageLiveAlbumPostPhotoFailed":"Post photo failed","DialogMessageLiveAlbumTakePhotoFailed":"Take photo failed ({message})","DialogMessageLivePersonErrorClosing":"Error in closing chat","DialogMessageLivePersonNoAnswer":"There was no answer. Try again later.","DialogMessageLivePersonNoAvailability":"Account is offline","DialogMessageMediaNotSupported":"Audio is not supported by this browser","DialogMessagePurchaseFail":"Purchase failed. Please try again shortly.  If you encounter any additional problems, please feel free to contact us.","DialogMessageShareFailConectFacebook":"Sorry, failed to connect to Facebook service, please try again shortly.","DialogMessageShareFailConectTwitter":"Sorry, failed to connect to Twitter service, please try again shortly.","DialogMessageShareFailPostFacebook":"Sorry, failed to post. Facebook is not responding.","DialogMessageShareFailTweet":"Failed to tweet","DialogMessageShareNotSupportedInSimulator":"Share is not supported in Simulator mode.","DialogMessageSubscribeFailed":"Subscription currently unavailable. Please try again later","DialogMessageSubscribeSubscribeSuccess":"Thank you for subscribing","HtmlTextAddAlbumToFavorites":"Add tracks to your favorites list now","HtmlTextAddTrackToFavorites":"Add track to your favorites list now","HtmlTextAudioAlbum":"Album:","HtmlTextAudioComposer":"Composer:","HtmlTextAudioDetails":"Details","HtmlTextAudioLoading":"Loading...","HtmlTextAudioLyricist":"Lyricist:","HtmlTextAudioLyrics":"Lyrics","HtmlTextAudioSeek":"Seek:","HtmlTextAudioSeeking":"Seeking...","HtmlTextAudioTrackNumber":"Track {number}","HtmlTextAudioVocals":"Vocals","HtmlTextAudioWriters":"Writers","HtmlTextBlogbyAuthor":"by {author}","HtmlTextBlogLoadingPosts":"Loading...","HtmlTextBlogShowMorePosts":"Show more","HtmlTextBlogViewOriginalPost":"view original post","HtmlTextBlogViewOriginalSite":"view original site","HtmlTextCommentDialogButtonCancel":"Cancel","HtmlTextCommentDialogButtonOk":"Post on Facebook","HtmlTextCommentDialogPlaceholder":"Write something...","HtmlTextContactUsAddress":"Address:","HtmlTextContactUsAddressStr":"Address","HtmlTextContactUsCallNowStr":"Call","HtmlTextContactUsCallStr":"Call","HtmlTextContactUsContactUsStr":"Contact us","HtmlTextContactUsEmailStr":"Email","HtmlTextContactUsFax":"Fax:","HtmlTextContactUsFaxNumberStr":"Fax Number","HtmlTextContactUsFaxStr":"Fax","HtmlTextContactUsGetDirections":"Get directions","HtmlTextContactUsLinkStr":"Link","HtmlTextContactUsMail":"Mail:","HtmlTextContactUsMapStr":"Map","HtmlTextContactUsPhone":"Phone:","HtmlTextContactUsPhoneNumberStr":"Phone Number","HtmlTextContactUsShowOnMap":"Show on map","HtmlTextContactUsSignUpStr":"Sign Up","HtmlTextContactUsWeb":"Web:","HtmlTextEventsDayFriday":"Friday","HtmlTextEventsDayMonday":"Monday","HtmlTextEventsDaySaturday":"Saturday","HtmlTextEventsDaySunday":"Sunday","HtmlTextEventsDayThursday":"Thursday","HtmlTextEventsDayTuesday":"Tuesday","HtmlTextEventsDayWednesday":"Wednesday","HtmlTextEventsFutureEvents":"Upcoming Events","HtmlTextEventsLocationStr":"Location","HtmlTextEventsMonthApril":"April","HtmlTextEventsMonthAugust":"August","HtmlTextEventsMonthDecember":"December","HtmlTextEventsMonthFebruary":"February","HtmlTextEventsMonthJanuary":"January","HtmlTextEventsMonthJuly":"July","HtmlTextEventsMonthJune":"June","HtmlTextEventsMonthMarch":"March","HtmlTextEventsMonthMay":"May","HtmlTextEventsMonthNovember":"November","HtmlTextEventsMonthOctober":"October","HtmlTextEventsMonthSeptember":"September","HtmlTextEventsNoEventsStr":"There are currently no events to display.","HtmlTextEventsPastEvents":"Past Events","HtmlTextEventsPhoneNumberStr":"Phone Number","HtmlTextEventsTicketStr":"Ticket","HtmlTextEventsVenueStr":"Venue","HtmlTextFacebookAddCommentButton":"Comment","HtmlTextFacebookLikeComment":"Like","HtmlTextFacebookLikePostButton":"Like","HtmlTextFacebookLikesCount":"{number} likes","HtmlTextFacebookLoadingPosts":"Loading posts...","HtmlTextFacebookPageLikesCount":"like this","HtmlTextFacebookPostCommentsCount":"{number} comments","HtmlTextFacebookPostLikesCount":"{number} people like this","HtmlTextFacebookPostLikesCountIncludeYou":"You and {number} others like this","HtmlTextFacebookPostLikesOnlyYou":"You like this","HtmlTextFacebookReadMore":"Read more","HtmlTextFacebookShowMorePosts":"Show more posts","HtmlTextFacebookUnikeComment":"Unlike","HtmlTextFacebookUnikePostButton":"Unlike","HtmlTextFavoritesBuyButton":"Buy","HtmlTextFavoritesCancelButton":"Cancel","HtmlTextFavoritesDoneButton":"Done","HtmlTextFavoritesEditButton":"Edit","HtmlTextFavoritesNoFavsStr1":"No tracks added.","HtmlTextFavoritesNoFavsStr2":"Add tracks to your favorites list.","HtmlTextLiveAlbumAddComment":"add comment","HtmlTextLiveAlbumByUploader":"by {name}","HtmlTextLiveAlbumErrorLoadingImage":"Unable to load image","HtmlTextLiveAlbumEula":"Terms of Use","HtmlTextLiveAlbumFacebookLogin":"Share photos with your friends on facebook","HtmlTextLiveAlbumFacebookLoginComment":"(requires that you link your facebook account)","HtmlTextLiveAlbumFacebookLoginLiveAlbum":"LiveAlbum","HtmlTextLiveAlbumLoadingAlbum":"Loading...","HtmlTextLiveAlbumLoadingImage":"Loading...","HtmlTextLiveAlbumLoadingShowMore":"Loading...","HtmlTextLiveAlbumNoImages":"BE THE FIRST TO POST A PHOTO","HtmlTextLiveAlbumPhotos":"photos","HtmlTextLiveAlbumShareCheckbox":"Share on Facebook","HtmlTextLiveAlbumShowMore":"Show more","HtmlTextLivePersonEnd":"End","HtmlTextLivePersonInputPlaceholder":"Write a message...","HtmlTextLivePersonSend":"Send","HtmlTextLivePersonStart":"Start","HtmlTextLivePersonStatusAgentTyping":"{agentName} is typing...","HtmlTextLivePersonStatusChatting":"Chatting with {agentName}","HtmlTextLivePersonStatusCheckingAvailability":"Checking availability...","HtmlTextLivePersonStatusCheckingAvailabilityMinorText":"connecting","HtmlTextLivePersonStatusClosingChat":"Closing chat...","HtmlTextLivePersonStatusInit":"To initiate a chat session click:","HtmlTextLivePersonStatusWaitingAgent":"Waiting for an agent...","HtmlTextLivePersonStatusWaitingAgentMinorText":"calling","HtmlTextLoadingPagination":"Loading...","HtmlTextMapLoading":"Loading...","HtmlTextMorePages":"More","HtmlTextPaginationLoadingItems":"Loading...","HtmlTextPaginationRefreshButton":"Refresh","HtmlTextPaginationRefreshItems":"Loading...","HtmlTextPaginationShowMoreItems":"Show more...","HtmlTextPhotosImagesCount":"{number} photos","HtmlTextPhotosNoImages":"Album is empty","HtmlTextPurchaseItemBuy":"Buy","HtmlTextPurchaseItemBuyAlbum":"Buy Album","HtmlTextRadioLoading":"Loading...","HtmlTextRemoveTrackFromFavorites":"Remove track from your favorites list now","HtmlTextReviewsByAuthor":"by {name}","HtmlTextReviewsLoadingProvider":"Loading...","HtmlTextReviewsReadMoreLink":"Read more","HtmlTextReviewsReviewsCount":"{number} reviews on {provider}","HtmlTextRevuReopenToReview":"(reopen app to review your changes)","HtmlTextRevuShakeToReload":"(shake to reload app)","HtmlTextRssReadMore":"Read more","HtmlTextRssShowOnMap":"Show on map","HtmlTextShareAppButtonText":"Share app","HtmlTextShareButtonText":"Share","HtmlTextShareChangeUserName":"Not {name}?","HtmlTextShareFacebookChangeUserButton":"Change user","HtmlTextShareFacebookPostButton":"Post","HtmlTextShareFacebookWriteCommentPlaceholder":"Enter your comment","HtmlTextShareOnFacebook":"Share on Facebook","HtmlTextShareOnTwitter":"Share on Twitter","HtmlTextShareTwitterChangeUserButton":"Change user","HtmlTextShareTwitterLoginButton":"Sign in","HtmlTextShareTwitterLoginCaption":"Sign in","HtmlTextShareTwitterPasswordCaption":"Password","HtmlTextShareTwitterPostButton":"Tweet","HtmlTextShareTwitterUserNameCaption":"User name or e-mail","HtmlTextShareTwitterWriteCommentPlaceholder":"Enter your comment","HtmlTextShowMorePagination":"Show more","HtmlTextShowOnMapButtonStr":"Map","HtmlTextSlicerUnableLoading":"Unable to load site content","HtmlTextSpeakersBioTitle":"Speaker's bio","HtmlTextSubscribeDiscoverString":"Discover us on these sites","HtmlTextSubscribeFacebookButton":"Facebook","HtmlTextSubscribeFollowBlogTitle":"Follow {blogTitle}","HtmlTextSubscribeInsetYourEmail":"your@email.com","HtmlTextSubscribeLinkedInButton":"LinkedIn","HtmlTextSubscribeLoading":"Subscribing...","HtmlTextSubscribeSubscribeButton":"Subscribe","HtmlTextSubscribeSubscribeString":"Subscribe to {blogTitle}","HtmlTextSubscribeTwitterButton":"Twitter","HtmlTextSubscribeUnknownButton":"Unknown","HtmlTextTwitterFollowButton":"Follow","HtmlTextTwitterFollowers":"Followers","HtmlTextTwitterFollowersCount":"{number} followers","HtmlTextTwitterLoadingTweets":"Loading...","HtmlTextTwitterRetweet":"by {retweeterName}","HtmlTextTwitterRetweetDetails":"retweeted by","HtmlTextTwitterShowMoreTweets":"Show more tweets","HtmlTextTwitterStatusesCount":"{number} statuses","HtmlTextTwitterTweets":"Tweets","HtmlTextTwitterUnfollowButton":"Unfollow","HtmlTextVideoByAuthor":"by {author}","HtmlTextViewOriginalPageBtnText":"View Original Version","HtmlTextYoutubeByAuthor":"by {author}","HtmlTextYoutubeLikes":"{likes} Like | {dislikes} Dislike","HtmlTextYoutubeRatings":"{ratings} Ratings | {views} Views","HtmlTextYoutubeViews":"{views} Views","HtmlTextYoutubeViewsCount":"{number} views","IndicatorLiveAlbumPostingImage":"Posting Image...","IndicatorLoading":"Loading...","IndicatorShareLogOut":"Log out...","IndicatorSharePublishing":"Publishing...","IndicatorShareTweeting":"Tweeting...","IndicatorShareTwitterSigningIn":"Signing in ...","PushNotificationTitle":"Notification","SDayAgo":"a day ago","SFacebookShareEmailSubject":"Check out this post from {user}'s Facebook page","SFacebookShareTwitterFrom":"From {user}'s Facebook wall","SHourAgo":"an hour ago","SLivePersonUserName":"me","SMinuteAgo":"a minute ago","SMonthAgo":"a month ago","SNumberDaysAgo":"{number} days ago","SNumberHoursAgo":"{number} hours ago","SNumberMinutesAgo":"{number} minutes ago","SNumberMonthsAgo":"{number} months ago","SNumberSecondsAgo":"{number} seconds ago","SNumberWeeksAgo":"{number} weeks ago","SNumberYearsAgo":"{number} years ago","SRssShareComment":"check out this post from {link}","SRssShareEmailSubject":"Check out this article from {title}","SRssShareTwitterFrom":"from {title}","SSecondAgo":"a second ago","SSecondsAgo":"seconds ago","SShareApp":"Check out the {appName} mobile app I just used!","SShareAppMailBody":"Hey,<br>Check out the {appName} mobile app I just used!","SShareAppMailSubject":"Check out this great new app!","SShareConduitMobile":"Conduit Mobile","SShareEmailLink":"Read more","SShareFromMobile":"Shared from my mobile app","SShareFromMobileWithLink":"Shared from my mobile app {appLink}","SShareMailApplinkHtml":"Shared from my: {htmlLink}","SShareMailApplinkSimple":"Shared from my mobile app: {appLink}","SShareMailPowerByConduitHtml":"Powered by: {htmlLink}","SShareMailPowerByConduitSimple":"Powered by Conduit Mobile: {conduitLink}","SShareMobileApp":"mobile app","SSharePhotoSubject":"Look at this awesome pic!","SSharePhotoText":"Take a look at this awesome pic!","SSharePhotoTitle":"Awesome pic","SShareTweetedFromLink":"Tweeted from {appLink}","STwitterShareEmailSubject":"Check out this tweet from @{name}","SWeekAgo":"a week ago","SYearAgo":"a year ago","SYoutubeShareTitle":"Check out this video - {title}","TitleShareVia":"Share via","ToastMessageAudioInitFail":"Failed to initialize audio player","ToastMessageBlogFailedGetPosts":"failed to get posts","ToastMessageFacebookFailedGetComments":"failed to receive data","ToastMessageLiveAlbumPublishingPhoto":"Image uploaded successfully, stream will be updated shortly","ToastMessagePaginationFailedGetItems":"failed to receive data","ToastMessageSubscribeInsetEmail":"Email address is required","ToastMessageSubscribeInvalidEmail":"Please enter a valid email address","ToastMessageTrackAddedToFavorites":"Track added to favorites","ToastMessageTrackRemovedFromFavorites":"Track removed from favorites","HtmlTextAboutUsItemTitleDescription":"Description","HtmlTextAboutUsItemTitleFoodStyle":"Food Type","HtmlTextAboutUsItemTitleBiography":"Biography","HtmlTextAboutUsItemTitleRecordLabel":"Record Label","HtmlTextAboutUsItemTitleHours":"Hours","HtmlTextAboutUsItemTitleServices":"Services","HtmlTextAboutUsItemTitleAwards":"Awards","HtmlTextAboutUsItemTitleParking":"Parking","HtmlTextAboutUsItemTitleProducts":"Products","HtmlTextAboutUsItemTitleMission":"Mission","HtmlTextAboutUsItemTitleManager":"Manager","HtmlTextAboutUsItemTitleBookingAgent":"Booking Agent","HtmlTextInstagramUserLikePhoto":"Like this","HtmlTextInstagramPhotosCount":"photos","HtmlTextInstagramFollowersCount":"followers","HtmlTextInstagramFollowingCount":"following","DialogMessageFormSendSuccess":"Data sent","DialogMessageFormSendFail":"Failed to send data","HtmlTextAboutUsItemTitleCompanyOverview":"Company Overview","HtmlTextAboutUsItemHoursAlwaysOpen":"Open 24\/7","HtmlTextAboutUsItemHoursNoHours":"No available hours","HtmlTextAboutUsInfoVersion":"Version {versionName}","HtmlTextAboutUsReadMore":"Read more","HtmlTextAboutUsListItemReadMore":"Read more","HtmlTextAboutUsDescriptionTitle":"Description","DialogCaptionConfirm":"Confirm","DialogCaptionSuccess":"Success","DialogMessagePollAreYouSureVote":"Are you sure you want to vote for \"{text}\" ?","DialogMessagePollVoteFail":"Your vote was not received. Please try again later.","DialogMessagePollVoteSuccess":"Your vote has been received.","HtmlTextPollVoteButton":"Vote","HtmlTextLinksDescriptionTitle":"Description","HtmlTextDatePickerDialogButtonOk":"OK","HtmlTextDatePickerDialogButtonCancel":"Cancel","HtmlTextDatePickerDialogButtonClear":"Clear","HtmlTextPageNotSupportedInCp":"This page is not supported in simulator mode.","HtmlTextPageNotSupportedInCp2":"To test it on your device, please install our ReVu app.","HtmlTextInstagramLikes":"Likes","HtmlTextInstagramComments":"Comments","HtmlTextInstagramPrivateUserMainText":"This user does not share information publicly.","HtmlTextInstagramPrivateUserSecondaryText":"You cannot view this page.","HtmlTextLiveAlbumUploadingImage":"Uploading image...","HtmlTextLiveAlbumUploadingFailed":"The image failed to upload.","HtmlTextLiveAlbumUploadedByYou":"You","HtmlTextAgendaSpeakersCount":"{number} speakers:","HtmlTextAgendaOneSpeaker":"Speaker:","HtmlTextAgendaSessionDetails":"Details","HtmlTextAgendaAddToFav":"Add to Favs","HtmlTextAgendaRemoveFromFav":"Remove from Favs","DialogMessageAgendaNoFav":"There are no sessions in your Favorites list.","DialogCaptionAgendaNoFav":"Favorites","DialogMessageEventsRsvpNotSupportedInSimulator":"This action is not supported in simulator mode.","UserMessageTextHello":"Hi there! I’m having a blast at SXSW. You?","ReportsUploadingImage":"Uploading...","ReportsImageUploadingStartedForImageByIndex":"Uploading image {number}","ReportsImageUploadingSucceededForImageByIndex":"Upload for image {number} successful","ReportsImageUploadingFailedForImageByIndex":"Image {number} failed to upload","ReportsImageUploaded":"Uploaded","ReportsImageUploadFailed":"Upload failed","ReportsImageUploadAddPhoto":"Add a photo"}},"maxAge":7200,"serviceUrl":"http:\/\/ams.mobile.conduit-services.com\/translate\/mobile.client\/en-US\/2"}],"timestamp":1367829562};
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

