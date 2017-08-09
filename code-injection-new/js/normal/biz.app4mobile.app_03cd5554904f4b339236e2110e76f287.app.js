

	
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
  	

/*global document*/
/*global window*/
/*global console*/
/*global DeviceDetector*/ //assumed to load before
/*global LANDING*/ //injected from ahp EnvironmentInjectionProvider.cs
/*global WEBSITE_OVERRIDE_URL*/ //same as above

window.Redirect = (function () {
	'use strict';
	var me = {};

	var _didRedirect = false;

	var _redirect = function (url) {
		_didRedirect = true;
		window.top.location.href = url;
	};

	var _init = function () {
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
			LANDING.devices && (LANDING.devices & device) === device) {
			return _redirect(LANDING.urls.Mobile);
		}

		//handle app website url override
		if (WEBSITE_OVERRIDE_URL) {
			return _redirect(WEBSITE_OVERRIDE_URL);
		}
	};

	_init();

	me.didRedirect = function () {
		return _didRedirect;
	};
	return me;
}());

var platformEnum={simulator:0,nativeApp:1,webApp:2,gadget:3,playground:4};var deviceTypeEnum={unknown:0,iphone:1<<0,android:1<<1,rim:1<<2,winPhone:1<<3,symbian:1<<4,bada:1<<5};var deviceVariantEnum={"default":0,amazon:1};var storesEnum={appStore:"AppStore",googlePlay:"GooglePlay",amazon:"Amazon",};var pageTypes={"0":{folder:"apiTest",cssClass:"apiTest",templateViewName:"APITestTemplateView"},"5a8368df-6ebd-c0f2-2d82-e173c1f33d40":{folder:"aboutUs",cssClass:"aboutUs",templateViewName:"AboutUsTemplateView",itemsName:"items"},"f61f12d6-df0c-465c-b3ba-70fb8f3894a4":{folder:"agenda",cssClass:"agenda",templateViewName:"AgendaTemplateView",itemsName:"items"},"30be1358-8b36-4d22-b6d2-50c38f4246c4":{folder:"audio",cssClass:"audio",templateViewName:"AudioTemplateView",wideTemplateViewName:"AudioWideTemplateView",nativeControllerName:"AudioController",itemsName:"items"},"51a61af7-1e90-4d68-88db-b1e69a0cca59":{folder:"blog",cssClass:"blog",templateViewName:"BlogTemplateView",wideTemplateViewName:"BlogWideTemplateView",nativeControllerName:"BlogController",itemsName:"feeds"},"308af5fa-e91b-d7e7-1926-acfea8f266dc":{folder:"notForCp",templateViewName:"NotForCpTemplateView",cssClass:"notForCp"},"083e52df-721d-4ca4-efa3-25161d344f40":{folder:"contactUs",cssClass:"contactUs",itemsName:"items",templateViewName:"ContactUsTemplateView"},"e9773a60-828f-6a16-a1fb-770163905537":{folder:"poll",cssClass:"poll",itemsName:"items",templateViewName:"PollTemplateView"},"0311d37d-6d9f-fc9d-35fd-45b471d2382f":{folder:"quiz",cssClass:"quiz",itemsName:"items",templateViewName:"QuizTemplateView"},"1002937d-8b19-40de-9df5-ba0d1ea2fbb2":{folder:"events",cssClass:"events",templateViewName:"EventsTemplateView",wideTemplateViewName:"EventsWideTemplateView",nativeControllerName:"EventsController",itemsName:"items"},"0053bbba-1ca1-11e0-89a4-af28e0d72085":{folder:"external",cssClass:"external",templateViewName:"ExternalPageTemplateView"},"df7d11f3-233c-4d49-8f2a-d1886e07c641":{folder:"facebook",cssClass:"facebook",templateViewName:"FacebookTemplateView",wideTemplateViewName:"FacebookWideTemplateView",nativeControllerName:"FacebookController",itemsName:"channels"},"fa7071be-8262-3b0d-b439-d2edd1ac35ec":{folder:"favorites",cssClass:"favorites",templateViewName:"FavoritesTemplateView"},"79eec590-f806-f7ac-946b-1fd9c90283ba":{folder:"form",cssClass:"form",templateViewName:"FormTemplateView",itemsName:"items"},"e0adcb11-f7bb-8107-1cd0-77690221f31c":{folder:"instagram",cssClass:"instagram",templateViewName:"InstagramTemplateView",itemsName:"items"},"fc6700a7-a11e-de90-93f8-7357f9f0037f":{folder:"links",templateViewName:"LinksTemplateView",cssClass:"links",itemsName:"items"},"c54d24ef-faf5-45dd-8859-85e3ebe7cecf":{folder:"webModule",templateViewName:"WebModuleTemplateView",cssClass:"webModule",itemsName:"items"},"9eea8149-956c-46f9-8597-167401c63cd7":{folder:"webModule",templateViewName:"WebModuleTemplateView",cssClass:"webModule",itemsName:"items"},"26ae8ccc-5464-7979-4fdf-3a13f166ffff":{folder:"photos",cssClass:"photos",templateViewName:"PhotosTemplateView",nativeControllerName:"PhotosController",itemsName:"feeds"},"a00b52bb-ff49-704f-bdf3-fb0bd0fd4739":{folder:"livePerson",templateViewName:"LivePersonTemplateView",cssClass:"livePerson",itemsName:"tabs"},"9953766f-6b47-4878-8d38-b9cde750fe58":{folder:"loyaltyCards",cssClass:"loyaltyCards",templateViewName:"LoyaltyCardsTemplateView",itemsName:"items"},"ec79d314-f6aa-f396-a651-3f9b3344dd99":{folder:"notForCp",templateViewName:"NotForCpTemplateView",cssClass:"notForCp"},"aca2f190-b22b-920d-f12a-998101ad4b70":{folder:"map",cssClass:"map",templateViewName:"MapTemplateView",nativeControllerName:"MapController",itemsName:"items"},"3b11bcdf-ba5e-4eaa-9059-ea580b3f1681":{folder:"photos",cssClass:"photos",templateViewName:"PhotosTemplateView",itemsName:"feeds"},"7a2641b0-ceb2-48d6-b715-344198c73dd3":{folder:"reviews",cssClass:"reviews",templateViewName:"ReviewsTemplateView",wideTemplateViewName:"ReviewsWideTemplateView"},"0255eb38-1fb5-4b65-abee-b6fdb69c8f07":{folder:"coupons",cssClass:"coupons",templateViewName:"CouponsTemplateView"},"8901e95e-4dc9-411f-835a-0f18a7872122":{folder:"menu",cssClass:"menu",templateViewName:"MenuTemplateView",itemsName:"items"},"ff4532d2-9137-8da2-f97f-be8b3ddd08e4":{folder:"agenda",cssClass:"agenda",templateViewName:"AgendaTemplateView",itemsName:"items"},"27f91d0a-42c0-48fa-90a8-7138641ddecf":{folder:"staticHtml",cssClass:"staticHtml",templateViewName:"StaticHtmlTemplateView"},"c6bb3e68-0ea7-43dc-a358-b40d9b75d224":{folder:"subscribe",cssClass:"subscribe",templateViewName:"SubscribeTemplateView"},"a77583ef-758f-45f3-9ad1-9704d82a2154":{folder:"twitter",cssClass:"twitter",templateViewName:"TwitterTemplateView",wideTemplateViewName:"TwitterWideTemplateView",nativeControllerName:"TwitterController",itemsName:"feeds"},"a95e67d5-4816-11c2-318d-fe64a33e32d2":{folder:"users",cssClass:"users",templateViewName:"UsersTemplateView",nativeControllerName:"UsersController",itemsName:"items"},"4680c3f3-e767-4ebf-b112-9ba769c3ff2a":{folder:"video",cssClass:"video",templateViewName:"VideoTemplateView",wideTemplateViewName:"VideoWideTemplateView",nativeControllerName:"VideoController",itemsName:"items"},"a7bf6078-3f92-4b90-acf2-b122903bc846":{folder:"video",cssClass:"video",templateViewName:"VideoTemplateView",wideTemplateViewName:"VideoWideTemplateView",nativeControllerName:"VideoController",itemsName:"channels"},"6181507a-fdf4-4b90-a270-cbd286603443":{folder:"collections",cssClass:"collections",templateViewName:"CollectionsTemplateView",wideTemplateViewName:"CollectionsWideTemplateView",itemsName:"items"},"38ab2b78-a1ad-42f8-8cb7-9475498c0f30":{folder:"reports",cssClass:"reports",nativeControllerName:"ReportsController",templateViewName:"ReportsTemplateView",itemsName:"items"},"8d7507ff-317e-44b1-9ad3-776ad52d6ee2":{folder:"homepage",cssClass:"homepage",nativeControllerName:"HomepageController",itemsName:"items"},"fe6a4b7d-cf62-172e-8eba-a231dd39eb20":{folder:"myProfile",cssClass:"myProfile",templateViewName:"MyProfileTemplateView",itemsName:"items"},"a8c1cd8e-7e55-828d-3bd2-fb2122472fa3":{folder:"inbox",cssClass:"inbox",templateViewName:"InboxTemplateView",itemsName:"items"},"11111111-1111-1111-1111-111111111111":{folder:"customNative",cssClass:"customNative",templateViewName:"",itemsName:"items"},sharePageType:{cssClass:"share_template_page",templateViewName:"ShareTemplateView",wideTemplateViewName:"ShareTemplateView"}};var appMode={normal:0,experience:1,developers:2};var headerTypes={textHeader:0,imageHeader:1,imageAndTextHeader:2};var navigationLayoutTypes={none:-1,bottomBar:0,topBar:1,list:2,grid:3,sideMenu:4};var adDisplayTypes={text:1,image:2};var layoutFormat={unknown:-1,narrow:0,wide:1};var comTypeEnum={postMessage:0,iframeMessage:1,nativeMessage:2};var protocolTypeEnum={rpc:0,event:1};var socialServices={Facebook:"FACEBOOK",Email:"EMAIL",Twitter:"TWITTER"};var executeTypeEnum={FORCE_NETWORK:0,HIT_AND_RUN:1,HIT_AND_RUN_SILENT:2,HIT_ON_NETWORK_FAIL:3};var responseTypeEnum={NETWORK:0,VALID_CACHE:1,EXPIRED_CACHE:2};var loadingTypeEnum={NORMAL:0,REFRESH:1,SILENT_REFRESH:2,SHOW_MORE:3};var socialServiceReturnType={FACEBOOK:1,TWITTER:2};var ExternalContentTypes={BLOG_POST:1,STATIC_HTML:2};var VideoTypes={GENERAL:"generalVideoType",YOUTUBE:"youtubeVideoType"};var MediaLibraryMergeTypes={Overwrite:0,Override:1,Merge:2};var MediaLibraryIncludeItems={None:0,Playlists:1,Unknown:2,All:3};var PhotoUploadUserTypes={NONE:0,FACEBOOK:1};var FacebookCountStatus={error:"error",deprecatedCount:"dep_count",ok:"ok"};
var RETURN_STATE_INFO="return_state_info";var RETURN_FUNCTION_FACEBOOK_SHARE="handleFacebookShare";var TWITTER_TOKENS="twitter_credentials";var SOCIAL_USER_CANCELED="user_canceled";var APP_VERSION="4.0.0.12";var DEV_SERVICEMAP_URL="http://servicemap.mobile.site-services.com/mobile";var QA_SERVICEMAP_URL="http://servicemap.mobile.qasite-services.com/mobile";var PROD_SERVICEMAP_URL="http://servicemap.mobile.conduit-services.com/mobile";var TEST_LOYALTY=false;var USE_AGENDA_FAVORITES=false;var USE_DATADUMP_SERVICE=false;var DEBUG=1;var PREVENT_DEVICE_DETECT=DEBUG&&false;var NAVIGATION_PAGE_GUID="00000000-0000-0000-0000-000000000002";var APP_MODE=appMode.normal;var PLATFORM=platformEnum.nativeApp;var DEVICE=deviceTypeEnum.android;var DEVICE_VARIANT=deviceVariantEnum["default"];var LAYOUT=layoutFormat.narrow;var FORCE_NO_CACHE=false&&DEBUG;var SERVICEMAP_URL=PROD_SERVICEMAP_URL;var APP_ID=null;var IS_RTL=false;
var DEBUG = 0;
var AMS_VERSION = "1.2.17.136";
var PLATFORM = 1;
var DEVICE_TOKEN = 2;
var APP_ID = "03cd5554-904f-4b33-9236-e2110e76f287";
var APP_MODE = 0;
var SIMULATOR = 0;
var SERVICEMAP_URL = PROD_SERVICEMAP_URL;

var __dataDump={"images":[],"services":[{"data":{"services":[{"name":"AMS_APP_GET","url":"http:\/\/ams.mobile.conduit-services.com\/{appId}\/{deviceType}?appVersion={appVersion}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_FEEDS_GET","url":"http:\/\/cms.mobile.conduit-services.com\/feed\/{take}\/{skip}\/?url={feedUrl}&params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_TWITTER_USER_GET","url":"http:\/\/cms.mobile.conduit-services.com\/twitter\/user\/{userName}\/{take}\/{skip}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_TWITTER_QUERY_GET","url":"http:\/\/cms.mobile.conduit-services.com\/twitter\/query\/{query}\/{type}\/{take}\/{skip}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_YOUTUBE_GET","url":"http:\/\/cms.mobile.conduit-services.com\/youtube\/{query}\/{type}\/{skip}\/{take}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_PHOTOS_GET","url":"http:\/\/cms.mobile.conduit-services.com\/photos\/{type}\/{userName}\/{take}\/{skip}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_PHOTOS_ALBUMS_GET","url":"http:\/\/cms.mobile.conduit-services.com\/photos\/albums\/{type}\/{username}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_FACEBOOK_USER_GET","url":"http:\/\/cms.mobile.conduit-services.com\/facebook\/user\/{pageName}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_FACEBOOK_DATA_GET","url":"http:\/\/cms.mobile.conduit-services.com\/facebook\/data\/{pageName}\/{take}\/{skip}\/?params={}","reload_interval_sec":7200,"method":"GET"},{"name":"UMS_USER_POST","url":"http:\/\/ums.mobile.conduit-services.com\/login\/user","method":"POST"},{"name":"PROXY_WEBSLICE","url":"http:\/\/proxy.mobile.conduit-services.com\/webslice?url={url}","reload_interval_sec":12092600,"method":"GET"},{"name":"AMS_APPID_GET","url":"http:\/\/ams.mobile.conduit-services.com\/code\/{code}\/{email}\/pwd","reload_interval_sec":7200,"method":"GET"},{"name":"UMS_USAGE_PUT","url":"http:\/\/ums.mobile.conduit-services.com\/usage\/log","reload_interval_sec":7200,"method":"POST"},{"name":"ADS_POST","url":"http:\/\/ads.mobile.conduit-services.com\/{appId}\/{deviceType}","reload_interval_sec":600,"method":"POST"},{"name":"CMS_RAYV_GET","url":"http:\/\/cms.mobile.conduit-services.com\/rayv\/feeds\/{distributer}\/{listType}\/{take}\/{skip}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"MOBILE_SOCIAL_LOGIN","url":"http:\/\/social.mobile.conduit-services.com\/connect\/facebook?appId={appId}&type={deviceType}&ret={returnUrl}","method":"GET"},{"name":"CMS_MEDIA_VIDEO_GET","url":"http:\/\/cms.mobile.conduit-services.com\/media\/video\/{deviceType}\/{take}\/{skip}\/?url={url}&params={params}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_MEDIA_AUDIO_GET","url":"http:\/\/cms.mobile.conduit-services.com\/media\/audio\/{deviceType}\/{take}\/{skip}\/?url={url}&params={params}","reload_interval_sec":7200,"method":"GET"},{"name":"AMS_TRANSLATION_GET","url":"http:\/\/ams.mobile.conduit-services.com\/translate\/{product}\/{culture}\/{deviceType}","reload_interval_sec":1200,"method":"GET"},{"name":"LIVE_ALBUM_PHOTO_POST","url":"http:\/\/livealbum.mobile.conduit-services.com\/Album\/{appId}\/{parentSocialId}\/{socialId}\/{albumId}\/{tagWithUserId}\/","reload_interval_sec":7200,"method":"POST"},{"name":"TWITTER_API_PROXY_POST","url":"http:\/\/apiproxy.conduit-services.com\/twitter\/{tId}?sshkey={sshKey}&hts={hts}&url=http%3a%2f%2fapi.twitter.com%2f1%2fstatuses%2fupdate.json","reload_interval_sec":7200,"method":"POST"},{"name":"SOCIAL_LOGOUT","url":"http:\/\/social.conduit-services.com\/ConduitLogout.aspx","reload_interval_sec":7200,"method":"GET"},{"name":"SIGSERV_HTTP_GET","url":"http:\/\/sub.conduit-push.com","reload_interval_sec":7200,"method":"GET"},{"name":"SIGSERV_HTTP_PUT","url":"http:\/\/pub.conduit-push.com","reload_interval_sec":7200,"method":"PUT"},{"name":"SIGSERV_WEBSOCKET_GET","url":"ws:\/\/ws.conduit-push.com","reload_interval_sec":7200,"method":"GET"},{"name":"MOBILE_TWITTER_LOGIN","url":"http:\/\/social.mobile.conduit-services.com\/twitter\/SignIn?appId={appId}&type={deviceType}&ret={returnUrl}","reload_interval_sec":7200,"method":"GET"},{"name":"LIVE_ALBUM_EULA_GET","url":"http:\/\/conduit.ourtoolbar.com\/eula\/","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_CALENDAR_GET","url":"http:\/\/cms.mobile.conduit-services.com\/calendar\/{type}\/?id={id}&max-results={take}&start-index={skip}&since={since}&until={until}&params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"WIBIYA_SUBSCRIBE_GET","url":"https:\/\/api.wibiya.com\/Handlers\/apps\/subscribe_mobile.php?t={token}&e={email}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_MEDIA_ART_GET","url":"http:\/\/cms.mobile.conduit-services.com\/media\/art\/?url={url}&params={params}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_REVIEW_GET","url":"http:\/\/cms.mobile.conduit-services.com\/reviews\/{type}\/?q={query}&max-results={take}&start-index={skip}&params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"NFL_STATS_GET","url":"http:\/\/pages.mobile.conduit.com\/nfl\/player\/{key}\/{id}?info={level}","reload_interval_sec":7200,"method":"GET"},{"name":"IMAGES_REVIEWS_PROVIDER_GET","url":"http:\/\/images.mobile.conduit-services.com\/icon\/100{type}","reload_interval_sec":7200,"method":"GET"},{"name":"INAPP_USER_TOKENS_GET","url":"http:\/\/inapp.mobile.conduit-services.com\/client\/tokens\/{bucketId}?userId={userId}","method":"GET"},{"name":"INAPP_USER_TRANSACTION_POST","url":"http:\/\/inapp.mobile.conduit-services.com\/client\/transaction","method":"POST"},{"name":"CONTACT_CONTENT_PUT","url":"http:\/\/contact.mobile.conduit-services.com\/contact\/client\/{appId}\/{formId}\/?action={action}&postUrl={postUrl}","reload_interval_sec":1200,"method":"POST"},{"name":"CMS_USERS_GET","url":"http:\/\/cms.mobile.site-services.com\/users\/{userId}\/{provider}\/{relationType}\/{take}\/{skip}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"LIVE_ALBUM_PHOTO_V2_POST","url":"http:\/\/livealbum.mobile.conduit-services.com\/Files\/upload\/?groupId={groupId}&appId={appId}&albumId={albumId}","reload_interval_sec":7200,"method":"POST"},{"name":"CMS_CONFERENCE_GET","url":"http:\/\/cms.mobile.conduit-services.com\/agenda\/{type}\/{id}\/{version}\/?ranges={ranges}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_PEOPLE_GET","url":"http:\/\/cms.mobile.conduit-services.com\/agenda\/{type}\/{id}\/{version}\/","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_POLLS_GET","url":"http:\/\/cms.mobile.conduit-services.com\/polls\/{type}\/{pollId}\/","reload_interval_sec":7200,"method":"GET"},{"name":"CONTACT_POLLS_POST","url":"http:\/\/polls.mobile.conduit-services.com\/polls\/result\/","reload_interval_sec":1200,"method":"POST"},{"name":"CMS_CONTENT_ITEMS","url":"http:\/\/cms.mobile.conduit-services.com\/contentItems\/items\/contenthost\/{take}\/{skip}\/?id={id}&params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_CONTENT_COLLECTION","url":"http:\/\/cms.mobile.conduit-services.com\/contentItems\/collection\/contenthost\/{take}\/?id={id}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_CONTENT_ITEMS_SEARCH","url":"http:\/\/cms.mobile.conduit-services.com\/contentItems\/items\/search\/{type}\/{collectionId}\/{take}\/{skip}\/?searchParams={searchParams}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_MENU_GET","url":"http:\/\/cms.mobile.conduit-services.com\/restaurants\/menu\/{provider}\/?query={restid}","reload_interval_sec":7200,"method":"GET"},{"name":"COMMUNITY_SOCIAL_LOGIN_POST","url":"http:\/\/community.mobile.conduit-services.com\/users\/social\/login\/{globalAppId}","reload_interval_sec":7200,"method":"POST"},{"name":"COMMUNITY_SOCIAL_LOGOUT_POST","url":"http:\/\/community.mobile.conduit-services.com\/users\/social\/logout\/{globalAppId}\/{userId}?socialId={socialId}","reload_interval_sec":7200,"method":"POST"},{"name":"CMS_USERS_SEARCH_GET","url":"http:\/\/cms.mobile.conduit-services.com\/users\/{provider}\/{skip}\/{take}\/?globalAppId={globalAppId}&q={search_term}&params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"DISCUSSION_DISCUSSIONS_GET","url":"http:\/\/discussion.mobile.conduit-services.com\/discussions\/{globalAppId}\/{userId}","reload_interval_sec":7200,"method":"GET"},{"name":"DISCUSSION_MESSAGES_GET","url":"http:\/\/discussion.mobile.conduit-services.com\/messages\/{discussionId}\/{skip}\/{take}","reload_interval_sec":7200,"method":"GET"},{"name":"DISCUSSION_MESSAGES_SEND_POST","url":"http:\/\/discussion.mobile.conduit-services.com\/messages\/{globalAppId}\/{fromId}","reload_interval_sec":7200,"method":"POST"},{"name":"CONTACT_CONTENT_POST","url":"http:\/\/contact.mobile.conduit-services.com\/contact\/client\/v2\/{globalAppId}\/{formId}\/?version={version}&postUrl={postUrl}","reload_interval_sec":7200,"method":"POST"},{"name":"IMAGE_UPLOADER_POST","url":"http:\/\/imageupload.mobile.conduit-services.com\/files\/upload","reload_interval_sec":7200,"method":"POST"},{"name":"CMS_COUPONS_GET","url":"http:\/\/cms.mobile.conduit-services.com\/coupons\/{type}\/{listId}\/{take}\/{skip}","reload_interval_sec":7200,"method":"GET"},{"name":"AMS_PUBLISHER_APPS_GET","url":"http:\/\/ams.mobile.conduit-services.com\/publisher\/apps\/{publisherId}","reload_interval_sec":7200,"method":"GET"},{"name":"AMS_APP_STYLE_GET","url":"http:\/\/ams.mobile.conduit-services.com\/appstyletemplate\/{styleTemplateId}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_LOYALTYCARDS_GET","url":"http:\/\/cms.mobile.conduit-services.com\/loyalty\/{type}\/{listId}\/{take}\/{skip}","reload_interval_sec":7200,"method":"GET"},{"name":"CONTENTHOST_LOYALTYCARDS_VALIDATE_POST","url":"https:\/\/contenthost.mobile.conduit-services.com\/loyalty\/validate\/{cardId}","reload_interval_sec":7200,"method":"POST"}],"reload_interval_sec":86400},"maxAge":86399,"serviceUrl":"http:\/\/servicemap.mobile.conduit-services.com\/mobile"},{"data":{"details":{"appHomeUrl":"http:\/\/03cd5554-904f-4b33-9236-e2110e76f287.4yourmobile.com"},"globalAppId":"da3d6046-ec1c-41f8-b479-c2516c6879cf","icon":"http:\/\/storage.conduit.com\/Mobile\/da\/1c\/da3d6046-ec1c-41f8-b479-c2516c6879cf\/Images\/58d36b6c-00d8-46fa-a184-caf7bae720e9.png","id":"03cd5554-904f-4b33-9236-e2110e76f287","label":"HUM Magazine","layout":{"colorTheme":{"background":"#00ffffff","buttons":"#ff2a2a2a","navTxt":"#FFFFFFFF","contBtxt":"#ff585a5a","contBsubTxt":"#FFB4B4B4","contAbg":"#FFFFFFFF","hdrBg":"#ff2a2a2a","contAhdlTxt":"#ff2a2a2a","navIcn":"#FFFFFFFF","contCsubTxt":"#FFB4B4B4","contBhdlTxt":"#ff2a2a2a","contCbg":"#ff2a2a2a","contAsubTxt":"#FFB4B4B4","contAtxt":"#ff585a5a","appBg":"#00ffffff","contBbg":"#FFFFFFFF","actBtn":"#ff750000","navBg":"#ff2a2a2a","contCtxt":"#FFFFFFFF","contAbrdr":"#FFDDDDDD","lnkTxt":"#ff750000","hdrTxt":"#FFFFFFFF","contChdlTxt":"#FFFFFFFF","contBbrdr":"#FFC1C1C2","deviceType":-1,"headers":"#ff2a2a2a","id":9,"name":"mono","displayName":"Mono","mainText":"#ff750000","smallText":"#ff585a5a"},"layoutType":0,"meta":{"bgImage":"http:\/\/storage.conduit.com\/images\/mobile\/controlpanel\/backgrounds\/abstract.png","culture":null,"header":{"type":1,"content":"http:\/\/storage.conduit.com\/Mobile\/da\/1c\/da3d6046-ec1c-41f8-b479-c2516c6879cf\/Images\/f49e8276-1168-424d-8458-b123a9b7d9d2.png"},"isRtl":false,"material":0},"template":{"appGeneral":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"appBg"}]}}}},"loadingSmallIcn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAsubTxt"}]},"isBlack":false,"isSimple":false}}},"footer":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000","shadow":{"isInset":false,"x":"0px","y":"-2px","blur":"3px","color":"#99000000"}}}}},"scrnDiv":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000","shadow":{"isInset":false,"x":"3px","y":"0px","blur":"10px","color":"#99000000"}}}},"brdr":{"type":"border","data":{"default":{"right":{"color":"#FF000000","width":"1px"}}}}},"dialog":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#CC000000"}}},"btn2":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFe4e4e4","location":0},{"color":"#FF8d8d8d","location":1}]},"clicked":{"type":"solid","color":"#FF8d8d8d"},"disabled":{"type":"solid","color":"#33333333"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FFBFBBB8","width":"1px"},"right":{"color":"#FFBFBBB8","width":"1px"},"left":{"color":"#FFBFBBB8","width":"1px"},"top":{"color":"#FFBFBBB8","width":"1px"}},"clicked":{"bottom":{"color":"#FF757575","width":"1px"},"right":{"color":"#FF757575","width":"1px"},"left":{"color":"#FF757575","width":"1px"},"top":{"color":"#FF757575","width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FF5F5B5A","shadow":{"x":"0","y":"1px","blur":"0","color":"#80FFFFFF"}},"selected":{"color":"#CC000000","shadow":{"x":"0","y":"1px","blur":"0","color":"#80FFFFFF"}},"disabled":{"color":"#CCCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF5F5B5A","isBlack":true,"isSimple":true},"clicked":{"type":"solid","color":"#FF464342","isBlack":true,"isSimple":true},"disabled":{"type":"solid","color":"#CCCCCCCC","isBlack":true,"isSimple":true}}}}},"floatBtn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000"},"clicked":{},"disabled":{}}},"brdr":{"type":"border","data":{}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FFFFFFFF","shadow":{"x":"0px","y":"1px","blur":"2px","color":"#E5000000"}},"selected":{"color":"#ffb0b0b0"},"disabled":{"color":"#CCCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FFFFFFFF","isBlack":false,"isSimple":true}}}},"shareViewIcn":{"type":"icon","data":{"default":{"type":"solid","color":"#FFa29f9e","isBlack":true,"isSimple":true}}},"adBar":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.9]}]}}}},"brdr":{"type":"border","data":{"top":{"color":{"_replace":[{"param":"contBbg"}]},"width":"1px"}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBhdlTxt"}]}}}}},"pullToRef":{"typeA":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAbg"}]},"shadow":{"isInset":true,"x":"-1px","y":"1px","blur":"2px","color":"#54000000"}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAsubTxt"}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contAbrdr"}]},"width":"1px"}}}}},"typeB":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg"}]},"shadow":{"isInset":true,"x":"-1px","y":"1px","blur":"2px","color":"#54000000"}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBsubTxt"}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"subTxt"}]},"isBlack":true,"isSimple":false}}}},"ribbon":{"txt":{"type":"text","data":{"default":{"color":"#FF000000"}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":false,"x":"0px","y":"0px","blur":"3px","color":"#99000000"}}}},"brdr":{"type":"border","data":{"default":{"top":{"color":"#FF000000","width":"1px"},"bottom":{"color":"#FF000000","width":"1px"}}}}}},"appHeader":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,1.6,1],[1,0.9,1.25,0.92]]}]},"location":0},{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.9,1.4,1],[1,1,1.13,0.95]]}]},"location":0.25},{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,1,1.1,1],[1,1,1.1,1]]}]},"location":0.49},{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,1,1,1],[1,1,1,1]]}]},"location":0.5},{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,1,0.8,1],[1,1,0.8,0.9]]}]},"location":0.73},{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,1,0.7,1],[1,0.7,0.5,1]]}]},"location":1}],"shadow":{"isInset":false,"x":"0px","y":"1px","blur":"3px","color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,0.3,0.8],[1,0.7,0.2,1]]}]}}}}},"bgTint":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrTxt"}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.5,1.05,1],[1,0.7,0.6,0.9]]}]},"width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"hdrTxt"}]}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.9,0.7,0.4],[1,0.9,0.5,0.4]]}]}},"clicked":{"type":"solid","color":"#4C000000","shadow":{"isInset":true,"x":"-1px","y":"1px","blur":"2px","color":"#66000000"}},"selected":{"type":"solid","color":"#4C000000","shadow":{"isInset":true,"x":"-1px","y":"1px","blur":"2px","color":"#66000000"}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrTxt"}]},"isBlack":false,"isSimple":true}}}}},"navBar":{"item":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,0.8,1.3,1],[1,0.9,1.25,0.95]]}]},"location":0},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,0.9,1.2,1],[1,1,1,0.95]]}]},"location":0.18},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,1,1],[1,1,0.7,1]]}]},"location":0.55},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.8,1],[1,1,0.5,1]]}]},"location":0.84},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.7,1],[1,0.6,0.4,1]]}]},"location":1}]},"clicked":{"type":"gradient","orientation":"vertical","color":[{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.5,0.7],[1,0.6,0.5,1]]}]},"location":0},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.5,0.7],[1,1,0.35,1]]}]},"location":0.18},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.4,0.7],[1,1,0.3,1]]}]},"location":0.55},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,0.8,0.2,0.7],[1,1,0.4,1]]}]},"location":0.84},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,0.5,0.1,0.7],[1,0.9,0.5,1]]}]},"location":1}],"shadow":{"isInset":true,"x":"0px","y":"0px","blur":"2px","color":"#FF000000"}},"selected":{"type":"gradient","orientation":"vertical","color":[{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.5,0.7],[1,0.6,0.5,1]]}]},"location":0},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.5,0.7],[1,1,0.35,1]]}]},"location":0.18},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.4,0.7],[1,1,0.3,1]]}]},"location":0.55},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,0.8,0.2,0.7],[1,1,0.4,1]]}]},"location":0.84},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,0.5,0.1,0.7],[1,0.9,0.5,1]]}]},"location":1}],"shadow":{"isInset":true,"x":"0px","y":"0px","blur":"2px","color":"#FF000000"}}}},"bubbleBg":{"type":"background","data":{"default":{},"clicked":{}}},"brdr":{"type":"border","data":{"default":{},"clicked":{}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"navTxt","fn":"hsla","params":[1,1,1,0.8]}]}},"clicked":{"color":{"_replace":[{"param":"navTxt"}]}},"selected":{"color":{"_replace":[{"param":"navTxt"}]}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"navIcn"}]},"isBlack":false,"isSimple":true}}}}},"navGrid":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#33000000"}}},"btn":{"bg":{"type":"background","data":{"default":{},"clicked":{}}},"brdr":{"type":"border","data":{"default":{},"clicked":{}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"navTxt","fn":"hsla","params":[1,1,1,0.8]}]}},"clicked":{"color":{"_replace":[{"param":"navTxt"}]}}}}}},"navList":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#33000000"}}},"item":{"bg":{"type":"background","data":{"default":{},"clicked":{"type":"solid","color":"#40000000"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#4c2a2a2a","width":"1px"}},"clicked":{}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"navTxt"}]}},"clicked":{}}}}},"navSidebar":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FF282828"}}},"scrnDiv":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000","shadow":{"isInset":false,"x":"-3px","y":"0px","blur":"10px","color":"#99000000"}}}},"brdr":{"type":"border","data":{"default":{"left":{"color":"#FF000000","width":"1px"}}}}},"item":{"bg":{"type":"background","data":{"default":{},"clicked":{"type":"solid","color":"#33000000","shadow":{"isInset":true,"x":"0px","y":"1px","blur":"3px","color":"#99000000"}},"selected":{"type":"solid","color":"#33000000","shadow":{"isInset":true,"x":"0px","y":"1px","blur":"3px","color":"#99000000"}}}},"marker":{"type":"background","data":{"default":{},"clicked":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FF3e3e3e","width":"1px"}},"clicked":{},"selected":{}}},"txt":{"type":"text","data":{"default":{"color":"#FFefefef"},"clicked":{"color":"#FFFFFFFF"},"selected":{"color":"#FFFFFFFF"}}}}},"tabBar":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#E1FFFFFF"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FFC1C1C2","width":"1px"}}}},"item":{"bg":{"type":"background","data":{"default":{},"clicked":{}}},"bubble":{"bg":{"type":"background","data":{"default":{},"clicked":{"type":"solid","color":"#3C000000"},"selected":{"type":"solid","color":"#FFb0b0b1"}}},"brdr":{"type":"border","data":{"default":{},"clicked":{},"selected":{}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]},"shadow":{"x":"0","y":"1px","blur":"0","color":"#FFf6f5f1"}},"clicked":{"color":"#FFFFFFFF","shadow":{"x":"0","y":"1px","blur":"0","color":"#FFa1a09e"}},"selected":{"color":"#FFFFFFFF","shadow":{"x":"0","y":"1px","blur":"1px","color":"#FFa1a09e"}}}}},"brdr":{"type":"border","data":{"default":{},"clicked":{}}}}},"tab2Bar":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"horizontal","color":[{"color":"#DCCDCDCD","location":0},{"color":"#E6FFFFFF","location":0.5},{"color":"#DCCDCDCD","location":1}],"shadow":[{"isInset":true,"x":"0px","y":"-1px","blur":"0px","color":{"_replace":[{"param":"lnkTxt"}]}},{"isInset":true,"x":"0px","y":"1px","blur":"0px","color":{"_replace":[{"param":"lnkTxt"}]}},{"isInset":true,"x":"0px","y":"1px","blur":"10px -2px","color":"#B4000000"},{"isInset":true,"x":"0px","y":"-1px","blur":"10px -2px","color":"#B4000000"}]}}},"triangle":{"type":"border","data":{"default":{"top":{"width":"6px","color":{"_replace":[{"param":"contAtxt"}]}},"left":{"width":"8px","color":"#00000000"},"right":{"width":"8px","color":"#00000000"},"bottom":{"width":"6px","color":{"_replace":[{"param":"contAtxt"}]}}}}},"item":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000"},"selected":{"type":"solid","color":"#00000000"}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}},"selected":{"color":{"_replace":[{"param":"contAtxt"}]}}}}}},"contTypeA":{"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAhdlTxt"}]}}}},"hdlTxtBrdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":"#FFCCCCCC"},"bottom":{"width":"1px","color":"#FFCCCCCC"}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAtxt"}]}},"mandatory":{"color":"#FFBB0000"}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAsubTxt"}]}}}},"lnkTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}}}},"hdlIcn":{"type":"server_icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAhdlTxt"}]},"isBlack":true,"isSimple":true}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAtxt"}]},"isBlack":true,"isSimple":false}}},"subIcn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAsubTxt"}]},"isBlack":true,"isSimple":false}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAbg"}]}},"clicked":{"type":"solid","color":"#FFf5f3ef"},"selected":{"type":"solid","color":"#FFf7f7f7"}}},"subBg":{"type":"background","data":{"default":{"type":"solid","color":"#FFeeeeee"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contAbrdr"}]},"width":"1px"}},"clicked":{},"selected":{"top":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,0.5,1]}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,0.5,1]}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,0.5,1]}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,0.5,1]}]}}}}},"classicItem":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAbg"}]}},"clicked":{"type":"solid","color":"#FFf5f3ef"},"selected":{"type":"solid","color":"#FFf7f7f7"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contAbrdr"}]},"width":"1px"}},"clicked":{},"selected":{"top":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,0.5,1]}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,0.5,1]}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,0.5,1]}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,0.5,1]}]}}}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFfcfcfc","location":0},{"color":"#FFe5e5e5","location":1}],"shadow":[{"isInset":false,"x":"1px","y":"1px","blur":"2px","color":"#26000000"},{"isInset":true,"x":"-1px","y":"-1px","blur":"0px","color":"#CCFFFFFF"}]},"clicked":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFe5e5e5","location":0},{"color":"#FFfcfcfc","location":1}],"shadow":[{"isInset":false,"x":"1px","y":"1px","blur":"1px","color":"#4c000000"},{"isInset":true,"x":"1px","y":"1px","blur":"0px","color":"#CCFFFFFF"}]},"disabled":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFe7e7e7","location":0},{"color":"#FFE6E6E6","location":1}]}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FFBFBBB8","width":"1px"},"right":{"color":"#FFBFBBB8","width":"1px"},"left":{"color":"#FFBFBBB8","width":"1px"},"top":{"color":"#FFBFBBB8","width":"1px"}},"clicked":{"bottom":{"color":"#FFa7a7a7","width":"1px"},"right":{"color":"#FFa7a7a7","width":"1px"},"left":{"color":"#FFa7a7a7","width":"1px"},"top":{"color":"#FFa7a7a7","width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FF5F5B5A","shadow":{"x":"0","y":"1px","blur":"0","color":"#80FFFFFF"}},"selected":{"color":"#CC000000","shadow":{"x":"0","y":"1px","blur":"0","color":"#80FFFFFF"}},"disabled":{"color":"#ffCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF2a2a2a","isBlack":true,"isSimple":false}}}},"actBtn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"actBtn","fn":"t_hsla","params":[0.5,[1,1,1.3,1],[1,1,0.5,1]]}]}},"disabled":{"type":"solid","color":"#33333333"}}},"brdr":{"type":"border","data":{}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FFFFFFFF"},"selected":{"color":"#FFFFFFFF"},"disabled":{"color":"#ffCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FFFFFFFF","isBlack":false,"isSimple":true}}}},"contentSession":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAhdlTxt","fn":"hsla","params":[1,1,1,0.88]}]}}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg"}]}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg","fn":"hsla","params":[1,1,1,0.69]}]}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg","fn":"hsla","params":[1,1,1,0.49]}]}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00FFFFFF","shadow":[{"isInset":false,"x":"0px","y":"0px","blur":"0px 1px","color":"#66000000"},{"isInset":true,"x":"1px","y":"1px","blur":"0px","color":"#4Dffffff"}]}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FFFFFFFF","isBlack":false,"isSimple":true}}}}},"contentSession2":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"lnkTxt","fn":"hsla","params":[1,1,1,0.88]}]}}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg"}]}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg","fn":"hsla","params":[1,1,1,0.69]}]}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg","fn":"hsla","params":[1,1,1,0.49]}]}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00FFFFFF","shadow":[{"isInset":false,"x":"1px","y":"1px","blur":"0px","color":"#66ffffff"},{"isInset":true,"x":"1px","y":"1px","blur":"3px","color":"#99000000"}]}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FFFFFFFF","isBlack":false,"isSimple":true}}}}},"calBoxBrdr1":{"type":"border","data":{"default":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","style":"dotted","color":{"_replace":[{"param":"contBbrdr","fn":"hsla","params":[1,1,1,0.7]}]}}}}},"calBoxBrdr2":{"type":"border","data":{"default":{"top":{"width":"1px","style":"dotted","color":{"_replace":[{"param":"contBbrdr","fn":"hsla","params":[1,1,1,0.7]}]}},"bottom":{"width":"1px","style":"dotted","color":{"_replace":[{"param":"contBbrdr","fn":"hsla","params":[1,1,1,0.7]}]}}}}}},"contTypeB":{"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBhdlTxt"}]},"shadow":{"x":"1px","y":"1px","blur":"0","color":"#ccFFFFFF"}}}},"hdlTxtBrdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":{"_replace":[{"param":"contBhdlTxt","fn":"hsla","params":[1,1,1,0.2]}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBhdlTxt","fn":"hsla","params":[1,1,1,0.2]}]}}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBtxt"}]},"shadow":{"x":"1px","y":"1px","blur":"1px","color":"#FFFFFFFF"}},"mandatory":{"color":"#FFBB0000","shadow":{"x":"1px","y":"1px","blur":"1px","color":"#FFFFFFFF"}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBsubTxt"}]},"shadow":{"x":"1px","y":"1px","blur":"1px","color":"#FFFFFFFF"}}}},"lnkTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]},"shadow":{"x":"1px","y":"1px","blur":"1px","color":"#FFf6f5f1"}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBtxt"}]},"isBlack":true,"isSimple":false}}},"subIcn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBsubTxt"}]},"isBlack":true,"isSimple":true}}},"hdlIcn":{"type":"server_icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBhdlTxt"}]},"isBlack":true,"isSimple":true}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.88]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.82]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.82]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}}}},"subBg":{"type":"background","data":{"default":{"type":"solid","color":"#FFe1e1e1"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}},"clicked":{"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}},"selected":{"top":{"color":{"_replace":[{"param":"contBbrdr","fn":"hsla","params":[1,1,0.6,1]}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"contBbrdr","fn":"hsla","params":[1,1,0.6,1]}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"contBbrdr","fn":"hsla","params":[1,1,0.6,1]}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"contBbrdr","fn":"hsla","params":[1,1,0.6,1]}]},"width":"1px"}}}},"bubbleItem":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.88]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.82]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBbg"}]},"shadow":[{"isInset":false,"x":"0px","y":"0px","blur":"1px","color":"#FFFFFFFF"},{"isInset":false,"x":"0px","y":"0px","blur":"2px","color":"#FFFFFFFF"},{"isInset":false,"x":"0px","y":"0px","blur":"2px","color":"#FFFFFFFF"},{"isInset":false,"x":"0px","y":"0px","blur":"2px","color":"#FFFFFFFF"}]}}},"ovrImg":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#B2000000"},"clicked":{"type":"solid","color":{"_replace":[{"param":"lnkTxt","fn":"hsla","params":[1,1,1,0.6]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"lnkTxt","fn":"hsla","params":[1,1,1,0.8]}]}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#b2ffffff","isBlack":false,"isSimple":false}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FFFFFFFF"}}},"txt":{"type":"text","data":{"default":{"color":"#B2FFFFFF"}}},"subTxt":{"type":"text","data":{"default":{"color":"#7fFFFFFF"}}}},"brdr":{"type":"border","data":{}}},"headerItem":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.88]}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.82]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.82]}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}}}}},"trackItem":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.88]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.82]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBbg"}]}}}},"brdr":{"type":"border","data":{"default":{"top":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}},"clicked":{"top":{"color":{"_replace":[{"param":"hdrBg"}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"hdrBg"}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"hdrBg"}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"hdrBg"}]},"width":"1px"}},"selected":{"top":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}}}}},"fullPage":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.88]}]}}}}},"fullPage2":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.82]}]}}}}},"fullPage3":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.95]}]}}}}},"sep":{"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr","fn":"hsla","params":[1,1,0.6,1]}]}}}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFFFFFFF","location":0},{"color":"#FFE6E6E6","location":1}]},"clicked":{"type":"gradient","orientation":"vertical","color":[{"color":"#ffdddddd","location":0},{"color":"#ffcccccc","location":1}]},"disabled":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFe7e7e7","location":0},{"color":"#FFE6E6E6","location":1}]}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FFBFBBB8","width":"1px"},"right":{"color":"#FFBFBBB8","width":"1px"},"left":{"color":"#FFBFBBB8","width":"1px"},"top":{"color":"#FFBFBBB8","width":"1px"}},"clicked":{"bottom":{"color":"#FF757575","width":"1px"},"right":{"color":"#FF757575","width":"1px"},"left":{"color":"#FF757575","width":"1px"},"top":{"color":"#FF757575","width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FF5F5B5A","shadow":{"x":"0","y":"1px","blur":"0","color":"#80FFFFFF"}},"selected":{},"disabled":{"color":"#CCCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF5F5B5A","isBlack":true,"isSimple":false},"clicked":{"type":"solid","color":"#FF464342","isBlack":true,"isSimple":false},"disabled":{"type":"solid","color":"#CCCCCCCC","isBlack":true,"isSimple":false}}}},"actBtn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"actBtn","fn":"t_hsla","params":[0.5,[1,1,1.3,1],[1,1,0.5,1]]}]}},"disabled":{"type":"solid","color":"#33333333"}}},"brdr":{"type":"border","data":{}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FFFFFFFF"},"selected":{"color":"#FFFFFFFF"},"disabled":{"color":"#ffCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FFFFFFFF","isBlack":false,"isSimple":true}}}},"subBtn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBsubTxt","fn":"hsla","params":[1,1,0.8,1]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBsubTxt"}]}}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FFFFFFFF","shadow":{"x":"0px","y":"1px","blur":"1px","color":"#80FFFFFF"}}}}}},"contTypeC":{"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contChdlTxt"}]}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contCtxt"}]}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contCsubTxt"}]}}}},"lnkTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contCbg","fn":"t_hsla","params":[0.5,[1,1,0.6,0.9],[1,1,0.3,0.9]]}]}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"actBtn","fn":"t_hsla","params":[0.5,[1,1,1.3,1],[1,1,0.5,1]]}]}},"disabled":{"type":"solid","color":"#33333333"}}},"brdr":{"type":"border","data":{}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FFFFFFFF"},"selected":{"color":"#FFFFFFFF"},"disabled":{"color":"#ffCCCCCC"}}}}},"form":{"element":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFe4e4e4","location":0},{"color":"#FF8d8d8d","location":1}]},"mandatory":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFFFFFFF","location":0},{"color":"#FF8d8d8d","location":1}],"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#4cb60021"}}}},"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":"#FFC1C1C2"},"bottom":{"width":"1px","color":"#FFC1C1C2"},"left":{"width":"1px","color":"#FFC1C1C2"},"right":{"width":"1px","color":"#FFC1C1C2"}},"mandatory":{"top":{"color":"#FFB60021","width":"1px"},"bottom":{"color":"#FFB60021","width":"1px"},"left":{"color":"#FFB60021","width":"1px"},"right":{"color":"#FFB60021","width":"1px"}}}},"txt":{"type":"text","data":{"default":{"color":"#FF111111"},"watermark":{"color":"#FF888888"},"mandWatermark":{"color":"#FFb60021"}}}},"dropdown":{"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF2a2a2a","isBlack":true,"isSimple":true}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":"#22000000"}}},"brdr":{"type":"border","data":{"default":{"left":{"color":"#FFC1C1C2","width":"1px"},"right":{"color":"#FFC1C1C2","width":"1px"}}}}},"input":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF"},"disabled":{"type":"solid","color":"#FFCCCCCC"},"mandatory":{"type":"solid","color":"#FFfff8f8","shadow":{"isInset":false,"x":"1px","y":"1px","blur":"5px","color":"#4cb60021"}}}},"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":"#FFC1C1C2"},"bottom":{"width":"1px","color":"#FFC1C1C2"},"left":{"width":"1px","color":"#FFC1C1C2"},"right":{"width":"1px","color":"#FFC1C1C2"}},"diabled":{},"mandatory":{"top":{"color":"#FFB60021","width":"1px"},"bottom":{"color":"#FFB60021","width":"1px"},"left":{"color":"#FFB60021","width":"1px"},"right":{"color":"#FFB60021","width":"1px"}}}},"txt":{"type":"text","data":{"default":{"color":"#FF000000"},"watermark":{"color":"#FF8e8e8e"},"mandWatermark":{"color":"#FFb60021"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FFa8a8a8","isBlack":false,"isSimple":true},"selected":{"type":"solid","color":"#FF2a2a2a","isBlack":true,"isSimple":true},"clicked":{"type":"solid","color":"#FF626262","isBlack":true,"isSimple":true}}}},"checkBox":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"selected":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"mandatory":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"disabled":{"type":"solid","color":"#54d3d3d3","shadow":{"isInset":false,"x":"0px","y":"1px","blur":"0px","color":"#FFFFFFFF"}}}},"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}}},"selected":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}}},"mandatory":{"top":{"color":"#FFB60021","width":"1px"},"bottom":{"color":"#FFB60021","width":"1px"},"left":{"color":"#FFB60021","width":"1px"},"right":{"color":"#FFB60021","width":"1px"}},"disabled":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#00FFFFFF","isBlack":false,"isSimple":true},"selected":{"type":"solid","color":"#FF2a2a2a","isBlack":true,"isSimple":true}}}},"radioBtn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"selected":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"mandatory":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"disabled":{"type":"solid","color":"#54d3d3d3","shadow":{"isInset":false,"x":"0px","y":"1px","blur":"0px","color":"#FFFFFFFF"}}}},"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}}},"selected":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}}},"mandatory":{"top":{"color":"#FFB60021","width":"1px"},"bottom":{"color":"#FFB60021","width":"1px"},"left":{"color":"#FFB60021","width":"1px"},"right":{"color":"#FFB60021","width":"1px"}},"disabled":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}}}}},"icn":{"type":"background","data":{"default":{},"selected":{"type":"solid","color":"#FF2a2a2a","isBlack":true,"isSimple":true},"disabled":{"type":"solid","color":"#FFd3d3d3","isBlack":true,"isSimple":true}}}}},"audioPlayer":{"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"hdrTxt"}]}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"hdrTxt","fn":"hsla","params":[1,1,1,0.8]}]}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrTxt"}]},"isBlack":false,"isSimple":false}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg","fn":"hsla","params":[1,1,0.3,1]}]}}}},"bgMini":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg","fn":"hsla","params":[1,1,0.3,1]}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.5,0.7,0.9],[1,0.7,0.6,0.9]]}]},"width":"1px"}}}},"seekBar":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,1.3,1],[1,0.7,0.7,1]]}]},"shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,0.001,1],[1,0.7,0.001,1]]}]}}}}},"brdr":{"type":"border","data":{"default":{"top":{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,1.1,1],[1,0.7,0.7,1]]}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,1.8,1],[1,0.7,0.7,1]]}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,1.8,1],[1,0.7,0.7,1]]}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,1.1,1],[1,0.7,0.7,1]]}]},"width":"1px"}}}},"seekFill":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrTxt"}]},"shadow":{"isInset":true,"x":"0px","y":"1px","blur":"1px","color":"#ff000000"}}}}}},"liveChat":{"bubbleMe":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.88]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}}}},"triangle":{"type":"border","data":{"default":{"ltrLeft":{"color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.88]}]},"width":"10px"},"bottom":{"color":"#00000000","width":"10px"},"top":{"color":"#00000000","width":"10px"}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBhdlTxt"}]},"shadow":{"x":"1px","y":"1px","blur":"0","color":"#CCFFFFFF"}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBsubTxt"}]},"shadow":{"x":"1px","y":"1px","blur":"1px","color":"#FFFFFFFF"}}}}},"bubbleOther":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAbg"}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}}}},"triangle":{"type":"border","data":{"default":{"ltrRight":{"color":{"_replace":[{"param":"contAbg"}]},"width":"10px"},"bottom":{"color":"#00000000","width":"10px"},"top":{"color":"#00000000","width":"10px"}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAhdlTxt"}]},"shadow":{"x":"1px","y":"1px","blur":"0px","color":"#CCFFFFFF"}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBsubTxt"}]},"shadow":{"x":"1px","y":"1px","blur":"0px","color":"#FFFFFFFF"}}}}}},"facebook":{"txt":{"type":"text","data":{"default":{"color":"#FF576b95"}}},"bubble":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFedeff4"}}},"brdr":{"type":"border","data":{"default":{"left":{"color":"#FFced5e4","width":"1px"},"right":{"color":"#FFced5e4","width":"1px"},"bottom":{"color":"#FFced5e4","width":"1px"},"top":{"color":"#FFced5e4","width":"1px"}}}},"triangle":{"type":"border","data":{"default":{"left":{"color":"#00000000","width":"4px"},"right":{"color":"#00000000","width":"4px"},"bottom":{"color":"#FFedeff4","width":"4px"}}}},"triangleBrdr":{"type":"border","data":{"default":{"left":{"color":"#00000000","width":"6px"},"right":{"color":"#00000000","width":"6px"},"bottom":{"color":"#FFced5e4","width":"6px"}}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000"},"clicked":{"type":"solid","color":"#FFFFCCAA"},"disabled":{"type":"solid","color":"#33333333"}}},"brdr":{"type":"border","data":{"default":{"left":{"color":"#00000000","width":"1px"},"right":{"color":"#00000000","width":"1px"},"bottom":{"color":"#00000000","width":"1px"},"top":{"color":"#00000000","width":"1px"}},"clicked":{"bottom":{"color":"#FFFF6611","width":"1px"},"right":{"color":"#FFFF6611","width":"1px"},"left":{"color":"#FFFF6611","width":"1px"},"top":{"color":"#FFFF6611","width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FF576b95"},"selected":{"color":"#FF576b95"},"disabled":{"color":"#CCCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF5F5B5A","isBlack":true,"isSimple":true},"clicked":{"type":"solid","color":"#FF464342","isBlack":true,"isSimple":true},"disabled":{"type":"solid","color":"#CCCCCCCC","isBlack":true,"isSimple":true}}}}},"events":{"calPict":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.78]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"2px","color":"#FF000000"}}}}}},"comment":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF"}}},"panel":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFF0F0F0"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FFCCCCCC","width":"1px"}}}}}},"images":{"image1":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FFC1C1C2","width":"1px"},"top":{"color":"#FFC1C1C2","width":"1px"},"right":{"color":"#FFC1C1C2","width":"1px"},"left":{"color":"#FFC1C1C2","width":"1px"}}}}},"image2":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FF000000","width":"1px"},"top":{"color":"#FF000000","width":"1px"},"right":{"color":"#FF000000","width":"1px"},"left":{"color":"#FF000000","width":"1px"}}}}},"catImage":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000","shadow":[{"isInset":false,"x":"0px","y":"0px","blur":"1px","color":"#FF000000"},{"isInset":true,"x":"0px","y":"0px","blur":"0px 3px","color":"#FFFFFFFF"},{"isInset":true,"x":"0px","y":"0px","blur":"1px 3px","color":"#66000000"}]},"clicked":{"type":"solid","color":"#00000000","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"3px","color":"#CC000000"}},"selected":{"type":"solid","color":"#00000000","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"3px","color":"#CC000000"}}}},"bgGrad":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#00000000","location":0},{"color":"#00000000","location":0.47},{"color":"#59000000","location":1}],"shadow":[{"isInset":false,"x":"0px","y":"0px","blur":"1px","color":"#FF000000"},{"isInset":true,"x":"0px","y":"0px","blur":"0px 3px","color":"#FFFFFFFF"},{"isInset":true,"x":"0px","y":"0px","blur":"1px 3px","color":"#66000000"}]}}},"txt":{"type":"text","data":{"default":{"color":"#FFFFFFFF","shadow":[{"x":"0px","y":"0px","blur":"1px","color":"#FF000000"},{"x":"1px","y":"1px","blur":"3px","color":"#CC000000"}]}}}},"imgBtn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#FF000000"}},"clicked":{"type":"solid","color":"#FFFFFFFF"},"selected":{"type":"solid","color":"#FFFFFFFF"}}},"overlayBg":{"type":"background","data":{"default":{"type":"solid","color":"#99000000"},"clicked":{"type":"solid","color":"#00000000"},"selected":{"type":"solid","color":"#00000000"}}},"brdr":{"type":"border","data":{"default":{"left":{"color":"#ffffffff","width":"3px"},"right":{"color":"#ffffffff","width":"3px"},"bottom":{"color":"#ffffffff","width":"3px"},"top":{"color":"#ffffffff","width":"3px"}},"clicked":{"bottom":{"color":"#00000000","width":"0px"},"right":{"color":"#00000000","width":"0px"},"left":{"color":"#00000000","width":"0px"},"top":{"color":"#00000000","width":"0px"}},"selected":{"bottom":{"color":"#00000000","width":"0px"},"right":{"color":"#00000000","width":"0px"},"left":{"color":"#00000000","width":"0px"},"top":{"color":"#00000000","width":"0px"}}}}}},"coupons":{"claimed":{"txt":{"type":"text","data":{"default":{"color":"#FFFFFFFF"}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FF9cba3e","shadow":{"isInset":true,"x":"0px","y":"-1px","blur":"3px","color":"#96000000"}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FFFFFFFF","isBlack":false,"isSimple":true}}},"brdr":{"type":"border","data":{"default":{"bottom":{"width":"1px","color":"#FF2a2a2a"}}}}},"notClaimed":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg"}]},"shadow":{"isInset":true,"x":"0px","y":"-1px","blur":"3px","color":"#96000000"}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"style":"dotted","width":"1px","color":"#FF2A2A2A"}}}}}},"punch":{"wideBg":{"type":"background","data":{"default":{"type":"solid","color":"#B2000000"}}},"bgImage":{"overlayBg":{"type":"background","data":{"default":{"type":"solid","color":"#DDFFFFFF"}}}},"errTxt":{"type":"text","data":{"default":{"color":"#FFB60021"}}},"slot":{"whole":{"bg":{"type":"svg","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}}}},"overlay":{"type":"svg","data":{"default":{"type":"solid","color":"#55FFFFFF"}}},"txt":{"type":"text","data":{"default":{"color":"#FFFFFFFF"}}}},"punch":{"bg":{"type":"svg","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}}}},"overlay":{"type":"svg","data":{"default":{"type":"solid","color":"#FFFFFFFF"}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}}}}}}}}},"meta":{"bgImage":"http:\/\/storage.conduit.com\/images\/mobile\/controlpanel\/backgrounds\/abstract.png","culture":"en-US","header":{"type":1,"content":"http:\/\/storage.conduit.com\/Mobile\/da\/1c\/da3d6046-ec1c-41f8-b479-c2516c6879cf\/Images\/f49e8276-1168-424d-8458-b123a9b7d9d2.png"},"isRtl":false,"material":0},"name":"HUM Magazine","pages":[{"alias":"editors-choice","displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/48","id":"f6035ad5-ee48-44b1-8e41-baaa017b96bb","label":"Editor's Choice","meta":{"pageLayout":-1,"items":[{"links":[{"url":"http:\/\/hummagazine.com\/?p=5631","imageUrl":"http:\/\/storage.conduit.com\/Mobile\/da\/1c\/da3d6046-ec1c-41f8-b479-c2516c6879cf\/Images\/2cc24ba8-31fd-4d2f-bdbe-a60904fdc2d4.png"},{"url":"http:\/\/hummagazine.com\/?p=5636","imageUrl":"http:\/\/storage.conduit.com\/Mobile\/da\/1c\/da3d6046-ec1c-41f8-b479-c2516c6879cf\/Images\/4b3e6697-ebc5-4140-ba4f-09e196c7c5c3.png"},{"url":"http:\/\/hummagazine.com\/?p=5606","imageUrl":"http:\/\/storage.conduit.com\/Mobile\/da\/1c\/da3d6046-ec1c-41f8-b479-c2516c6879cf\/Images\/0c9f077f-96d4-48ac-a88c-858320745b4c.png"},{"url":"http:\/\/hummagazine.com\/?p=5602","imageUrl":"http:\/\/storage.conduit.com\/Mobile\/da\/1c\/da3d6046-ec1c-41f8-b479-c2516c6879cf\/Images\/12f98726-b6fa-4f85-9548-a2638f5d64ad.png"},{"url":"http:\/\/hummagazine.com\/?p=5618","imageUrl":"http:\/\/storage.conduit.com\/Mobile\/da\/1c\/da3d6046-ec1c-41f8-b479-c2516c6879cf\/Images\/afa16898-8855-4fad-8166-185a5c0fc14f.png"},{"url":"http:\/\/hummagazine.com\/?p=5596","imageUrl":"http:\/\/storage.conduit.com\/Mobile\/da\/1c\/da3d6046-ec1c-41f8-b479-c2516c6879cf\/Images\/6bf96711-7690-4ced-8e14-14b4198c32c1.png"},{"url":"http:\/\/hummagazine.com\/?p=5623","imageUrl":"http:\/\/storage.conduit.com\/Mobile\/da\/1c\/da3d6046-ec1c-41f8-b479-c2516c6879cf\/Images\/31690a13-86c2-4281-90b5-2a1defa536a0.png"},{"url":"http:\/\/hummagazine.com\/?p=5584","imageUrl":"http:\/\/storage.conduit.com\/Mobile\/da\/1c\/da3d6046-ec1c-41f8-b479-c2516c6879cf\/Images\/c0a96d06-07d6-45c4-90f2-92a64ebda15b.png"},{"url":"http:\/\/hummagazine.com\/?p=5574","imageUrl":"http:\/\/storage.conduit.com\/Mobile\/da\/1c\/da3d6046-ec1c-41f8-b479-c2516c6879cf\/Images\/978eba9b-e352-46f9-8f4c-acbb645d67b9.png"},{"url":"http:\/\/hummagazine.com\/?p=5627","imageUrl":"http:\/\/storage.conduit.com\/Mobile\/da\/1c\/da3d6046-ec1c-41f8-b479-c2516c6879cf\/Images\/d6a68cd0-6ba2-4e0c-be96-183a51540ea2.png"}]}],"layout":null},"minVersion":"2.7.0.5","type":"fc6700a7-a11e-de90-93f8-7357f9f0037f","version":null},{"alias":"inside","displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/44","id":"83d10515-8d2e-488a-9ee1-82712ca806cd","label":"Inside","meta":{"pageLayout":6,"feeds":[{"id":"8a79ce69-102f-b9ff-a514-145ffe6f2c78","url":"http:\/\/hummagazine.com\/?feed=rss2","title":"Feed","params":{"addGeo":false,"sort":{},"expiration":null}}],"layout":null},"minVersion":"0.0.0.0","type":"51a61af7-1e90-4d68-88db-b1e69a0cca59","version":null},{"alias":"facebook","displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/17","id":"dff459e5-48f7-46e9-ba9a-444c8d9c982b","label":"Facebook","meta":{"pageLayout":0,"channels":[{"id":"ef0bd769-2ee7-6cf6-675f-d0345fadac4e","user":"hummagazine?ref=tn_tnmn","postsSource":"feed","title":"Channel"}],"layout":null},"minVersion":"0.0.0.0","type":"df7d11f3-233c-4d49-8f2a-d1886e07c641","version":null},{"alias":"e-magazine","displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/78","id":"81d7324c-fee7-4aea-883c-b3b556f64930","label":"E-Magazine","meta":{"pageLayout":-1,"items":[{"link":"http:\/\/issuu.com\/hummagazine\/docs\/hum_magazine_march_e-magazine1","openInExternalBrowser":false}],"layout":null},"minVersion":"2.7.0.5","type":"c54d24ef-faf5-45dd-8859-85e3ebe7cecf","version":null},{"alias":"call","displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/40","id":"b50b4a35-532e-4558-aa48-cc660f97aed7","label":"Call","meta":{"pageLayout":-1,"items":[{"phone":"8323684012"}],"layout":null},"minVersion":"2.0.0.0","type":"308af5fa-e91b-d7e7-1926-acfea8f266dc","version":null},{"alias":"contact-us","displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/15","id":"b21bf2e5-82d6-4407-a3d6-bee258f58fc7","label":"Contact us","meta":{"pageLayout":1,"items":[{"id":"c161eba2-285e-ed22-258e-69b684487605","phone":"281-888-4552 ","mail":"info@hummagazine.com","url":"http:\/\/www.hummagazine.com","address":"7457 Harwin Dr #250, Houston, TX 77036","lat":29.7175859,"long":-95.51476249999996}],"layout":null},"minVersion":"1.9.0.0","type":"083e52df-721d-4ca4-efa3-25161d344f40","version":null},{"alias":"media-kit","displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/82","id":"eb8e409f-2b00-44e2-80a6-10fa10b65635","label":"Media Kit","meta":{"pageLayout":-1,"items":[{"link":"http:\/\/hummagazine.com\/wp-content\/uploads\/2013\/10\/Mediakit-for-Hum-Magazine.pdf","openInExternalBrowser":false}],"layout":null},"minVersion":"2.7.0.5","type":"c54d24ef-faf5-45dd-8859-85e3ebe7cecf","version":null},{"alias":"location","displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/35","id":"adc95f24-3181-4583-a838-b25408c2c2ca","label":"Location","meta":{"pageLayout":-1,"items":[{"header":"HUM Magazine","address":{"text":"7457 Harwin Dr #250, Houston, TX 77036"},"location":{"lat":"29.7175859","lng":"-95.51476249999996"}}],"layout":null},"minVersion":"2.0.0.0","type":"aca2f190-b22b-920d-f12a-998101ad4b70","version":null},{"alias":"inquiry","displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/85","id":"634d9022-20cc-47ce-b013-cc39facc6b84","label":"Inquiry","meta":{"pageLayout":-1,"items":[{"title":"form","params":{"extraInfo":{},"type":2},"id":"4e5120ec-e9ca-91c6-962e-f0c1c6b7ae02","reportId":"f289b977-6ddb-4c1a-9b28-754109d1207e","name":"Inquiry","reportVersion":"1","controls":[{"caption":"Name","type":"inputtext","type_name":"name","id":"_06421c32-1572-0dca-c4ae-daaa16784e4f","isMandatory":true,"isActive":true},{"caption":"Email","type":"inputtext","type_name":"email","id":"_0531d78f-c884-df4f-79c2-8f9fdb1fa969","isMandatory":true,"isActive":true,"subType":"email"},{"caption":"Phone","type":"inputtext","type_name":"phone","id":"_6eca984d-9d21-7772-4496-0a0b08a6f2c0","isMandatory":false,"isActive":true,"subType":"tel"},{"caption":"Message","type":"textarea","type_name":"multiline","id":"_e18ea6b4-194b-a0b1-cb0c-be3a6fac8e99","isMandatory":true,"isActive":true}],"success":{"message":"Thank you for your interest. We will get back to you soon."},"sendButton":{"caption":"Submit"}}],"layout":null},"minVersion":"3.4.0.0","type":"38ab2b78-a1ad-42f8-8cb7-9475498c0f30","version":null}],"publisherId":"1dc44ed9-3d66-4403-aec3-79649d26f0c9","settings":{"ads":{"adBarCycles":null,"bottomBarAdEnabled":null,"bottomBarSwitchInterval":null,"enabled":false,"fullScreenAdDisplayDuration":null,"fullScreenAdEnabled":null,"fullScreenAdShowTimespan":null,"fullScreenAdSupportedPages":null,"fullScreenAdTO":null,"providers":null},"brand":{"name":null,"link":null,"showAppLinks":true},"env":3,"fbAccessToken":"AAACeZBZANVcJ0BALWdkZBkVMprgCHf89vvzV3bq47rmnXHXXRnFbOhtwvU0k0tbUcL1aEjCQgZCrZCOhldBPeaBZAymqaZAyZBUZD","overrideServices":[{"key":"CMS_TWITTER_QUERY_GET","params":{},"version":3},{"key":"CMS_TWITTER_USER_GET","params":{},"version":3}]},"social":{"facebook":{"appId":"375757265883286"}},"version":"1.2.17.136"},"maxAge":7200,"serviceUrl":"http:\/\/ams.mobile.conduit-services.com\/03cd5554-904f-4b33-9236-e2110e76f287\/2?appVersion={appVersion}"}],"timestamp":1382478284};
DEBUG = 0
var DeviceDetector=(function(){var d=false,a=null;var g={};g.isDesktop=function(){return d};g.device=function(){return DEVICE};g.layout=function(){return LAYOUT};var h={"(ipad)":{device:deviceTypeEnum.iphone,layout:layoutFormat.wide},"(ipod|iphone)":{device:deviceTypeEnum.iphone,layout:layoutFormat.narrow},"(gt-p1000|mz604|mz606|xoom)":{device:deviceTypeEnum.android,layout:layoutFormat.wide},"(android.+mobile)":{device:deviceTypeEnum.android,layout:layoutFormat.narrow},"(android|Mobile Safari)":{device:deviceTypeEnum.android,layout:layoutFormat.wide},"(windows phone os|iemobile|zunewp7)":{device:deviceTypeEnum.winPhone,layout:layoutFormat.narrow},"(silk|kindle)":{device:deviceTypeEnum.android,layout:layoutFormat.wide,variant:deviceVariantEnum.amazon},"(SCH-I800|NOOK|GT-P7510)":{device:deviceTypeEnum.android,layout:layoutFormat.wide}};var e=function(k){var j=[];for(var l in k){if(k.hasOwnProperty(l)){j.push(l)}}return j};var i=function(k,j){if(j){for(var l in j){k[l]=j[l]}}};var f=function(o){if(!a){a=e(h)}var n=new RegExp(a.join("|"),"i"),k=null;if(n.test(o)){for(var m=0;m<a.length;m++){var p=a[m];var l=new RegExp(p,"i");if(l.test(o)){k=h[p];break}}}if(!k){k={};var j=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(o)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(o.substr(0,4));if(j){k.layout=layoutFormat.narrow}else{k.layout=layoutFormat.wide;d=true}}return k};g.detectDevice=function(){var j=(g.testUserAgent||navigator.userAgent||navigator.vendor||window.opera);return f(j)};var b=function(j,k){if(typeof(j)!=="undefined"){k(j)}};var c=g.detectDevice();if(PREVENT_DEVICE_DETECT||PLATFORM===platformEnum.nativeApp||window!==top){return g}b(c.device,function(j){DEVICE=j});b(c.layout,function(j){LAYOUT=j});b(c.variant,function(j){DEVICE_VARIANT=j});return g}());
(new Image()).src = 'app/interface/web/img/ajax-loader.png';
var WebAppPreloader=(function(){var y={};var e=null,k=null,A=null,b=true,j=false,f=null;var p={background_color:"#222222",splash_timeout:5000};var c=function(B,D){var C;return function(){if(C){return}C=setTimeout(function(){C=null;B.apply(this)},D);B.apply(this)}};var i=function(){return(typeof window.orientation!=="undefined")};var g=function(){var D=window.screen.width;var C=window.screen.height;if(C<D){C=window.screen.width;D=window.screen.height}var B=window.devicePixelRatio;if((window.innerWidth*B===window.screen.width)&&(DEVICE===deviceTypeEnum.android)){C=Math.ceil(C/B);D=Math.ceil(D/B)}return[D,C]};var r=function(){var B=g();if(o()!==0){return[B[1],B[0]]}else{return B}};var l=function(){var D=null;if(typeof WebViewportSizeManager!=="undefined"){D=WebViewportSizeManager.getViewportHeight()}var C=window.innerWidth;var B=D?D:window.innerHeight;if(B<C){B=window.innerWidth;C=window.innerHeight}return[C,B]};var z=function(){var B=l();if(o()!==0){return[B[1],B[0]]}else{return B}};var n=function(){if(i()){return window.orientation}var C=window.innerWidth;var B=window.innerHeight;if(B<C){return 90}return 0};var o=function(){if(LAYOUT===layoutFormat.wide){return 90}else{return 0}};var w=function(){return p.background_color};var d=function(){if(typeof PRELOADER_OPTIONS==="undefined"||typeof PRELOADER_OPTIONS.splash==="undefined"||typeof PRELOADER_OPTIONS.splash.img==="undefined"){return null}var P=PRELOADER_OPTIONS.splash.img;var G=window==top?r():z(),I=G[1]/G[0],N=G[1]*G[0]*window.devicePixelRatio*window.devicePixelRatio,C=null,D=999,J=999999999;var H=/^\d+x\d+$/;for(var F in P){if(!P.hasOwnProperty(F)||!H.test(F)){continue}var L=F.split("x");var B=L[0];var O=L[1];var K=(O/B);var M=Math.abs(I-K);if(M<=D){var E=Math.abs(N-B*O);if(M<D||E<J){D=M;J=E;C=P[F]}}}if(!C){return null}return{path:C,timeout:typeof PRELOADER_OPTIONS.splash.timeout!=="undefined"?PRELOADER_OPTIONS.splash.timeout:p.splash_timeout}};var a=function(C){var G=false;b=false;var E=function(){if(G){return}G=true;b=true;clearTimeout(D);u()};var F=function(){clearTimeout(D);setTimeout(function(){b=true;u()},C.timeout)};var D=setTimeout(E,C.image_load_timeout?C.image_load_timeout:6000);var B=(new Image());B.src=C.path;B.onload=F;B.onerror=E};var m=function(){var C=(window.innerHeight?window.innerHeight:document.documentElement.clientHeight)+"px";var D=(window.innerWidth?window.innerWidth:document.documentElement.clientWidth)+"px";e.style.height=C;e.style.width=D;if(k!=null){var E=z();var F=(o()-n())%180;var B="rotate("+F+"deg)";k.style.display="block";k.style.left=Math.ceil(window.innerWidth/2-E[0]/2)+"px";k.style.top=Math.ceil(window.innerHeight/2-E[1]/2)+"px";k.style.width=E[0]+"px";k.style.height=E[1]+"px";k.style.transform=B;k.style["-ms-transform"]=B;k.style["-webkit-transform"]=B;k.style["-o-transform"]=B;k.style["-moz-transform"]=B}};var q=function(D,B,C){if(D.addEventListener){D.addEventListener(B,C,false)}else{if(D.attachEvent){D.attachEvent("on"+B,C)}}};var x=function(D,B,C){if(D.addEventListener){D.removeEventListener(B,C,false)}else{if(D.detachEvent){D.detachEvent("on"+B,C)}}};var v=function(C){if(!window.addEventListener){return}q(window,"orientationchange",C);q(window,"scroll",C);q(window,"resize",C);var B=t;t=function(){B(C)}};var t=function(B){if(!window.removeEventListener){return}x(window,"orientationchange",B);x(window,"scroll",B);x(window,"resize",B)};var u=function(){if(!j||!b){return}t();if(e){document.body.removeChild(e);e=null}if(k){document.body.removeChild(k);k=null}$("#app").addClass("visible");if(Scrolling){setTimeout(Scrolling.triggerWrapperResize,100)}if(f){f()}};var s=function(){A=d();e=document.createElement("div");e.className="web_preloader";e.style["background-color"]=w();var C=document.createElement("span");C.className="web_preloader_spinner spin";var B=document.createElement("p");B.className="web_preloader_caption";B.innerHTML="Loading...";e.appendChild(C);e.appendChild(B);if(A!==null){k=document.createElement("div");k.className="web_preloader_splash";k.style["background-image"]="url("+A.path+")";a(A);document.body.appendChild(k)}document.body.appendChild(e)};y.onAppReady=function(B){f=B;j=true;u()};s();var h=c(m,100);v(m);setTimeout(m,0);return y})();
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
 
 

/**
 * This module is in charge of changes of the URL and ...
 */
var UN = (function () 
{
	var me = {};

	// e.g.: "news/2/article1"
	var _currentUrl = "";
	// e.g.: ["news", "2", "article1"]
	var _splittedUrl = [];

	// array of callbacks to call on change in the URL.
	//	every item is dictionary with the fields: cbEventHandler, levelStart, levelEnd
	var _cbs = [];
	
	/**
	 * get the current URL
	 * 
	 * @return {string} url - the current URL, e.g.: "news/2/article1"
	 */
	me.getCurrentUrl = function ()
	{
		return _currentUrl;
	};

	/**
	 * get a specific "level" in the current URL
	 * e.g.: if the current url is "news/2/article1/map" than getCurrentUrlAtLevel(2) will return "article1"
	 * 
	 * @param {integer} level - the "level" of the url. 1st word is 0, 2nd is 1, etc.
	 * @return {string} urlPart - part of current URL at level "level", e.g.: "news/2/article1"
	 */
	me.getCurrentUrlAtLevel = function (level)
	{
		return _splittedUrl[level];
	};

	/**
	 * register to change in the url in "specific levels" part.
	 * e.g.: when moving from "news/2/article1/map" to "news/3/article1":
	 * 	level 0 was not changed.
	 * 	levels 1,2,3 was changed.
	 * 	if we register with levelEnd = 0 , we will not get the cb.
	 * 
	 * e.g.:
	 * if we are interesting only on level 1 (tabs) we will register with levelStart=1. levelEnd=1
	 * if we are interesting only on level 2 and 3 (e.g.: details page of RSS item or map page of RSS item) we will register with levelStart=2. levelEnd=3
	 * 
	 * @param {function} cbEventHandler - the "callback" in case of change of the relevant parts.
	 * @param {integer} levelStart - the "levelStart" of the url that we want to register. 
	 * @param {integer} levelEnd - the "levelEnd" of the url that we want to register. 
	 */
	me.registerChange = function(cbEventHandler, levelStart, levelEnd)
	{
		var item = {cbEventHandler: cbEventHandler,
				levelStart: levelStart,
				levelEnd: levelEnd};
		_cbs.push(item);
		
		// TODO: Do we want this?
		// we call it now if we already "reached" this level:
		if (_splittedUrl.length > levelStart)
		{
			Utils.Helpers.funcWrapper(cbEventHandler)();
		}
	};

	/**
	 * Remove registration to change
	 * 
	 * @param {function} cbEventHandler - the function that we register, and now we want to remove the registration.
	 */
	me.unregisterChange = function(cbEventHandler)
	{
		for (var i=0; i<_cbs.length; i++)
		{
			var func = _cbs[i].cbEventHandler;
			if (func === cbEventHandler)
			{
				// remove it from the array:
				_cbs.splice(i,1);
				return;
			}
		}
	};

	/**
	 * Move to a new URL
	 * (this func will change the URL vars, and will call to callbacks that was registered to change)
	 * 
	 * @param {string} url - the new URL. if starts with "/", will be from root. otherwise, will continue from current path 
	 * e.g.: if current path is "news/2", navTo("art1/map") will go to "news/2/art1/map". navTo("/facebook/0") will go to "facebook/0". 
	 */
	me.navTo = function(url)
	{
		if (url[0] === "/")
		{
			// remove the "/":
			var newUrl = url.substr(1); 
		}
		else
		{
			// add it to the end of the path:
			var newUrl = _currentUrl + '/' + url; 
		}
			
		_setNewUrl(newUrl);
	};

	/**
	 * internal function to move to a new URL
	 * (this func will change the URL vars, and will call to callbacks that was registered to change)
	 * 
	 * @param {string} url - the new URL for "_currentUrl" var
	 */
	var _setNewUrl = function(url)
	{
		var splittedUrl = url.split("/");
		
		// find the levelEnd/levelStart of the change from _currentUrl:
		var levelEnd = Math.max(splittedUrl.length, _splittedUrl.length) - 1;
		for (var i = 0; i < _splittedUrl.length; i++)
		{
			if (_splittedUrl[i] !== splittedUrl[i])
			{
				break;
			}
		}
		var levelStart = i;
		
		// update vars:
		var _splittedUrl = splittedUrl;
		var _currentUrl = url;
		
		//call callbacks:
		for (var i = 0; i < _cbs.length; i++)
		{
			var cb = _cbs[i]; 
			//if !(cb.levelStart > levelEnd || cb.levelEnd < levelStart)
			if (cb.levelStart <= levelEnd && cb.levelEnd >= levelStart)
			{
				Utils.Helpers.funcWrapper(cb.cbEventHandler)();
			}
		}
		
	};
	
	// TODO: add "init" function, that will call to "_setNewUrl" with the current URL?
	
	return me;
})();


/*jshint browser:true, jquery:true*/
/*global console*/
window.WebViewportSizeManager = (function () {
    var BODY_SCROLL_TOP = false;

    var me = {};
    var _lastResult = null;
    var _isIos = navigator.userAgent.match(/iPhone|iPod/i);
    var _isIos7 = navigator.userAgent.match(/(iPad|iPhone);.*CPU.*OS 7_\d/i);
    var _isChrome = navigator.userAgent.match(/CriOS/i);

    var _bindEvents = function () {

        if (!window.addEventListener)
            return;

        window.addEventListener("orientationchange", me.hideUrlBar, false);
        window.addEventListener("resize", me.hideUrlBar, false);
        window.addEventListener("load", function() {
            window.removeEventListener("orientationchange", me.hideUrlBar);
            window.removeEventListener("resize", me.hideUrlBar);
        });
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
    me.getViewportHeight = function () {
        var screenHeight, statusbarHeight, bottomUtilBarHeight;
        var result = null;
        if (_isIos && !_isChrome && !navigator.standalone && typeof window.orientation !== 'undefined') {
            var portrait = ((window.orientation / 90) % 2 === 0);
            var docClientHeight = document.documentElement.clientHeight;
            var urlBarOpen = portrait ?
                false :
                (window.innerHeight == document.documentElement.clientHeight && window.innerHeight != window.screen.width);

            var fullscreenLandscape = !portrait && (docClientHeight == 320 || docClientHeight == 242 /*fullscreen with native ios6 smartbanner*/ ); //iphone 5 'fullscreen landscape' mode
            var nativeSmartBannerShown = !portrait && (docClientHeight == 366 || docClientHeight == 130 /*non-fullscreen without native ios6 smartbanner*/ );

            //if the url bar was hidden, but then redesplayed by touch the status bar - we have no way to recognize that state and "force" ourselves to a smaller viewport.
            //the best guess is - if we already hid the urlbar once, than if its open - the user must have opened it.

            var urlBarHeight = (urlBarOpen) ? 60 : 0; /*url bar opened by tapping status bar*/
            statusbarHeight = fullscreenLandscape ? 0 : 20;
            bottomUtilBarHeight = portrait ? 45 : (fullscreenLandscape ? 0 : 35);
            screenHeight = portrait ? window.screen.height : window.screen.width;
            result = screenHeight - statusbarHeight - bottomUtilBarHeight - urlBarHeight;

            // console.log(printStackTrace());
            //              'bottomUtilBarHeight', bottomUtilBarHeight, 'urlBarHeight', urlBarHeight, 'document.documentElement.clientHeight', document.documentElement.clientHeight])
        }

        if (result != _lastResult && typeof ($) !== 'undefined') {
            $(window).trigger('webapp.viewport.resize');
        }

        return result;
    };

    me.hideUrlBar = function () {
        //if a keyboard is currently open - don't try to resize the scrollwrapper
        if (typeof ($) !== 'undefined' && $(document.activeElement).is(':input')) return;

        if (_isIos && !_isChrome && !navigator.standalone && LAYOUT === layoutFormat.narrow && !_isIos7) {
            // if we are using fixed scroller for iPhone, the performance will be good
            //  if the scroll will be at the "body" level, but will be very bad if
            //  it is in inner level (if we don't use "-webkit-overflow-scrolling: touch;", etc.)

            //temporary until we find a better fix
            _setTargetBodyHeight();

            if (BODY_SCROLL_TOP !== false)
                window.scrollTo(0, BODY_SCROLL_TOP === 1 ? 0 : 1);
        }
    };

    // So we don't redefine this function everytime we
    // we call hideUrlBar
    me.getScrollTop = function () {
        var win = window;
        var doc = document;

        return win.pageYOffset || doc.compatMode === 'CSS1Compat' && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
    };

    var _setTargetBodyHeight = function () {
        var targetHeight = me.getViewportHeight();
        //only if we have a good guess to what the body height should be
        if (targetHeight) {
            document.body.style.height = targetHeight + 'px';
        }
        else {
            document.body.style["min-height"] = window.innerHeight + 'px';
        }
    };

    var _hideUrlBarOnLoad = function () {
        var win = window;
        var doc = win.document;
        var bodycheck;

        // If there's a hash, or addEventListener is undefined, stop here
        if (win.addEventListener) {
            // scroll to 1
            window.scrollTo(0, 1);
            BODY_SCROLL_TOP = 1;

            // reset to 0 on bodyready, if needed
            bodycheck = setInterval(function () {
                if (doc.body) {
                    clearInterval(bodycheck);
                    BODY_SCROLL_TOP = me.getScrollTop();
                    me.hideUrlBar();
                }
            }, 15);
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
			cqm.showLoading(_T('HtmlTextPaginationRefreshItems'), this.$el, true);
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
			cqm.hideLoading(this.$el);
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
		
		cqm.hideLoading(this.$el);
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
				conduitApi.UI.showToastMessage(null, null, this.options.failStr, this.$el);
				// Cancel the loading
				this._cbCancel();
			}
		}
		// Show toast only if fail after executing the service.
		else 
			if (!serviceNotExecuted) 
			{
				// Show toast message in simulator
				conduitApi.UI.showToastMessage(null, null, this.options.failStr, this.$el);
				
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
     * @param {jQuery object} $elm (optional) - if exist - we will put the loading on $elm page (or page above it), else - we will put it on body
	 */
	me.startActivityIndicator = function (cbSuccess, cbFail, message, $elm)
	{
		rpcSender.invoke('conduitApi.UI.startActivityIndicator', cbSuccess, cbFail, message, $elm);
	};
	
	/**
	 * Dismiss the activity indicator.
	 * 
     * @param cbSuccess - Function to be called upon success
     * 					  Signature: function cbSuccess();
	 * @param cbFail - callback function in case the API callback failed.
	 *					  Signature: function cbFail()
     * @param {jQuery object} $elm (optional) - if exist - we will remove the loading from $elm page (or page above it), else - we will remove it from body
     * @param forceDismiss - Force dismissal of the indicator no matter how many times 'show' was called - TODO : relevant?
	 */
	me.dismissActivityIndicator = function (cbSuccess, cbFail, $elm, forceDismiss)
	{
		rpcSender.invoke('conduitApi.UI.dismissActivityIndicator', cbSuccess, cbFail, $elm, forceDismiss);
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
	 * 							title: Title for the share (if no specific title for Email / FB / Twitter...),
	 * 							shortDesc: Text to share (if no specific title for Email / FB ...),
	 * 							url: link to share,
	 * 							imageUrl: url link to image to display
	 * 							emailTitle: Subject of the email (if we don't want the generic title)
	 * 							emailDesc: Body content of the email (if we don't want the generic shortDesc)
	 * 							fbTitle: Title for Facebook (if we don't want the generic title)
	 * 							fbDesc: Description for Facebook (if we don't want the generic shortDesc)
	 * 							twitterTitle: Title for twitter (if we don't want the generic title)
	 * 							twitterFrom: 'From' text for Twitter,
	 * 							savedState: object of saved state of the caller in case	the app needs
	 * 										to be redirected (like facebook login on webapp)
	 * 							allowEdit: allow the user to edit the shared information before sharing it.
	 * 										if set to true, will open an share edit dialog.
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



        /* test for svg support - detect the feature before setting the style...
            http://toddmotto.com/revisiting-svg-workflow-for-performance-and-progressive-development-with-transparent-data-uris/
        */
        !function () {
            function supportsSVG() { return !!document.createElementNS && !! document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect }
            document.documentElement.className += supportsSVG() ? ' svg' : ' no-svg';
        }();



    


        /* var style = document.createElement('style');
        style.type = 'text/css';*/

        var injectStyle = function(e) {
            var svgDoc = this.contentDocument;
            var svgGroup = svgDoc.getElementsByTagName('g')[0];
            //svgDoc.appendChild(style);
            svgDoc.getElementsByTagName('svg')[0].appendChild(style);
        };

        var style = document.getElementById('svg_internal');
        style.sheet;

        var svgs = document.getElementsByClassName('baloon');
        for (var i = 0; i < svgs.length; i++) {
            var svg = svgs[i];
            svg.addEventListener('load', injectStyle);
                // svgRoot = svgDoc.children[0],
                // svgSwitch = svgRoot.children[0],
                // svgGroup = svgSwitch.children[0];
        }


        //var s = new XMLSerializer();

    






    animation = {
        nextFrame: (function() {
            return window.requestAnimationFrame
                || window.webkitRequestAnimationFrame
                || window.mozRequestAnimationFrame
                || window.oRequestAnimationFrame
                || window.msRequestAnimationFrame
                || function(callback) { return setTimeout(callback, 17); }
                    })(),

        cancelFrame: (function () {
            return window.cancelRequestAnimationFrame
                || window.webkitCancelAnimationFrame
                || window.webkitCancelRequestAnimationFrame
                || window.mozCancelRequestAnimationFrame
                || window.oCancelRequestAnimationFrame
                || window.msCancelRequestAnimationFrame
                || clearTimeout
        })()
    }

    var has3d = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix(),
        hasTouch = 'ontouchstart' in window,
        hasTransform = vendor + 'Transform' in document.documentElement.style,

        vendor = (/webkit/i).test(navigator.appVersion) ? 'webkit' :
                (/firefox/i).test(navigator.userAgent) ? 'Moz' :
                'opera' in window ? 'O' : '';

    function Animation($elem) {
        var that = this,
            _startX = 0,
            _startY = 0,
            _startTime;

        var step = {
            time: 100,
        };

        //create an animation function bound to $elem
        var _animationFrameHandler = function() {
            var now = Date.now(),
                newX, newY, transform;

            // if (now >= _startTime + step.time) {
            //     that._pos(step.x, step.y);
            //     that.animating = false;
            //     if (that.options.onAnimationEnd) that.options.onAnimationEnd.call(that);            // Execute custom code on animation end
            //     that._startAni();
            //     return;
            // }

            now = (now - _startTime) / step.time - 1;
            easeOut = Math.sqrt(1 - now * now);
            newX = (step.x - _startX) * easeOut + _startX;
            newY = (step.y - _startY) * easeOut + _startY;

            $elem[0].style[vendor + 'TransformOrigin'] = '0 0';
            $elem[0].style[vendor + 'Transform'] = 'translate3d(' + newX + 'px,' + newY + 'px, 0)' + ' scale(' + this.scale + ')';

            that.animRequestId = animation.nextFrame(_animationFrameHandler);
        };

        this.stop = function() {
            animation.cancelFrame(that.animRequestId);
        };

        this.start = function() {
            _startTime = Date.now();
            _animationFrameHandler();
        };
    };


    // onload
    $(function() {
        var content = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ',
            image = 'http://fc08.deviantart.net/fs6/i/2005/104/1/0/The_duck_by_JasenkaLuksa.jpg',
            $list  = $('#list'), $scroller = $('#scroll_wrapper');

        for (var i = 100; i >= 0; i--) {
            $list.append("<li><img src='" + image + "'></img><p>" + content + "</p></li>");
        };

        var animation = new Animation($list);
        animation.start();
    });
