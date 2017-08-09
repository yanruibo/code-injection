

	
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
var RETURN_STATE_INFO="return_state_info";var RETURN_FUNCTION_FACEBOOK_SHARE="handleFacebookShare";var TWITTER_TOKENS="twitter_credentials";var SOCIAL_USER_CANCELED="user_canceled";var APP_VERSION="4.0.1.1";var DEV_SERVICEMAP_URL="http://servicemap.mobile.site-services.com/mobile";var QA_SERVICEMAP_URL="http://servicemap.mobile.qasite-services.com/mobile";var PROD_SERVICEMAP_URL="http://servicemap.mobile.conduit-services.com/mobile";var TEST_LOYALTY=false;var USE_AGENDA_FAVORITES=false;var USE_DATADUMP_SERVICE=false;var DEBUG=1;var PREVENT_DEVICE_DETECT=DEBUG&&false;var NAVIGATION_PAGE_GUID="00000000-0000-0000-0000-000000000002";var APP_MODE=appMode.normal;var PLATFORM=platformEnum.nativeApp;var DEVICE=deviceTypeEnum.android;var DEVICE_VARIANT=deviceVariantEnum["default"];var LAYOUT=layoutFormat.narrow;var FORCE_NO_CACHE=false&&DEBUG;var SERVICEMAP_URL=PROD_SERVICEMAP_URL;var APP_ID=null;var IS_RTL=false;
var DEBUG = 0;
var AMS_VERSION = "1.16.14.228";
var PLATFORM = 1;
var DEVICE_TOKEN = 2;
var APP_ID = "b7910a48-87bb-4559-9b20-d8a647c67163";
var APP_MODE = 0;
var SIMULATOR = 0;
var SERVICEMAP_URL = PROD_SERVICEMAP_URL;

var __dataDump={"images":[],"services":[{"data":{"services":[{"name":"AMS_APP_GET","url":"http:\/\/ams.mobile.conduit-services.com\/{appId}\/{deviceType}?appVersion={appVersion}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_FEEDS_GET","url":"http:\/\/cms.mobile.conduit-services.com\/feed\/{take}\/{skip}\/?url={feedUrl}&params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_TWITTER_USER_GET","url":"http:\/\/cms.mobile.conduit-services.com\/twitter\/user\/{userName}\/{take}\/{skip}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_TWITTER_QUERY_GET","url":"http:\/\/cms.mobile.conduit-services.com\/twitter\/query\/{query}\/{type}\/{take}\/{skip}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_YOUTUBE_GET","url":"http:\/\/cms.mobile.conduit-services.com\/youtube\/{query}\/{type}\/{skip}\/{take}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_PHOTOS_GET","url":"http:\/\/cms.mobile.conduit-services.com\/photos\/{type}\/{userName}\/{take}\/{skip}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_PHOTOS_ALBUMS_GET","url":"http:\/\/cms.mobile.conduit-services.com\/photos\/albums\/{type}\/{username}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_FACEBOOK_USER_GET","url":"http:\/\/cms.mobile.conduit-services.com\/facebook\/user\/{pageName}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_FACEBOOK_DATA_GET","url":"http:\/\/cms.mobile.conduit-services.com\/facebook\/data\/{pageName}\/{take}\/{skip}\/?params={}","reload_interval_sec":7200,"method":"GET"},{"name":"UMS_USER_POST","url":"http:\/\/ums.mobile.conduit-services.com\/login\/user","method":"POST"},{"name":"PROXY_WEBSLICE","url":"http:\/\/proxy.mobile.conduit-services.com\/webslice?url={url}","reload_interval_sec":12092600,"method":"GET"},{"name":"AMS_APPID_GET","url":"http:\/\/ams.mobile.conduit-services.com\/code\/{code}\/{email}\/pwd","reload_interval_sec":7200,"method":"GET"},{"name":"UMS_USAGE_PUT","url":"http:\/\/ums.mobile.conduit-services.com\/usage\/log","reload_interval_sec":7200,"method":"POST"},{"name":"ADS_POST","url":"http:\/\/ads.mobile.conduit-services.com\/{appId}\/{deviceType}","reload_interval_sec":600,"method":"POST"},{"name":"CMS_RAYV_GET","url":"http:\/\/cms.mobile.conduit-services.com\/rayv\/feeds\/{distributer}\/{listType}\/{take}\/{skip}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"MOBILE_SOCIAL_LOGIN","url":"http:\/\/social.mobile.conduit-services.com\/connect\/facebook?appId={appId}&type={deviceType}&ret={returnUrl}","method":"GET"},{"name":"CMS_MEDIA_VIDEO_GET","url":"http:\/\/cms.mobile.conduit-services.com\/media\/video\/{deviceType}\/{take}\/{skip}\/?url={url}&params={params}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_MEDIA_AUDIO_GET","url":"http:\/\/cms.mobile.conduit-services.com\/media\/audio\/{deviceType}\/{take}\/{skip}\/?url={url}&params={params}","reload_interval_sec":7200,"method":"GET"},{"name":"AMS_TRANSLATION_GET","url":"http:\/\/ams.mobile.conduit-services.com\/translate\/{product}\/{culture}\/{deviceType}","reload_interval_sec":1200,"method":"GET"},{"name":"LIVE_ALBUM_PHOTO_POST","url":"http:\/\/livealbum.mobile.conduit-services.com\/Album\/{appId}\/{parentSocialId}\/{socialId}\/{albumId}\/{tagWithUserId}\/","reload_interval_sec":7200,"method":"POST"},{"name":"TWITTER_API_PROXY_POST","url":"http:\/\/apiproxy.conduit-services.com\/twitter\/{tId}?sshkey={sshKey}&hts={hts}&url=http%3a%2f%2fapi.twitter.com%2f1%2fstatuses%2fupdate.json","reload_interval_sec":7200,"method":"POST"},{"name":"SOCIAL_LOGOUT","url":"http:\/\/social.conduit-services.com\/ConduitLogout.aspx","reload_interval_sec":7200,"method":"GET"},{"name":"SIGSERV_HTTP_GET","url":"http:\/\/sub.conduit-push.com","reload_interval_sec":7200,"method":"GET"},{"name":"SIGSERV_HTTP_PUT","url":"http:\/\/pub.conduit-push.com","reload_interval_sec":7200,"method":"PUT"},{"name":"SIGSERV_WEBSOCKET_GET","url":"ws:\/\/ws.conduit-push.com","reload_interval_sec":7200,"method":"GET"},{"name":"MOBILE_TWITTER_LOGIN","url":"http:\/\/social.mobile.conduit-services.com\/twitter\/SignIn?appId={appId}&type={deviceType}&ret={returnUrl}","reload_interval_sec":7200,"method":"GET"},{"name":"LIVE_ALBUM_EULA_GET","url":"http:\/\/conduit.ourtoolbar.com\/eula\/","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_CALENDAR_GET","url":"http:\/\/cms.mobile.conduit-services.com\/calendar\/{type}\/?id={id}&max-results={take}&start-index={skip}&since={since}&until={until}&params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"WIBIYA_SUBSCRIBE_GET","url":"https:\/\/api.wibiya.com\/Handlers\/apps\/subscribe_mobile.php?t={token}&e={email}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_MEDIA_ART_GET","url":"http:\/\/cms.mobile.conduit-services.com\/media\/art\/?url={url}&params={params}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_REVIEW_GET","url":"http:\/\/cms.mobile.conduit-services.com\/reviews\/{type}\/?q={query}&max-results={take}&start-index={skip}&params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"NFL_STATS_GET","url":"http:\/\/pages.mobile.conduit.com\/nfl\/player\/{key}\/{id}?info={level}","reload_interval_sec":7200,"method":"GET"},{"name":"IMAGES_REVIEWS_PROVIDER_GET","url":"http:\/\/images.mobile.conduit-services.com\/icon\/100{type}","reload_interval_sec":7200,"method":"GET"},{"name":"INAPP_USER_TOKENS_GET","url":"http:\/\/inapp.mobile.conduit-services.com\/client\/tokens\/{bucketId}?userId={userId}","method":"GET"},{"name":"INAPP_USER_TRANSACTION_POST","url":"http:\/\/inapp.mobile.conduit-services.com\/client\/transaction","method":"POST"},{"name":"CONTACT_CONTENT_PUT","url":"http:\/\/contact.mobile.conduit-services.com\/contact\/client\/{appId}\/{formId}\/?action={action}&postUrl={postUrl}","reload_interval_sec":1200,"method":"POST"},{"name":"CMS_USERS_GET","url":"http:\/\/cms.mobile.site-services.com\/users\/{userId}\/{provider}\/{relationType}\/{take}\/{skip}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"LIVE_ALBUM_PHOTO_V2_POST","url":"http:\/\/livealbum.mobile.conduit-services.com\/Files\/upload\/?groupId={groupId}&appId={appId}&albumId={albumId}","reload_interval_sec":7200,"method":"POST"},{"name":"CMS_CONFERENCE_GET","url":"http:\/\/cms.mobile.conduit-services.com\/agenda\/{type}\/{id}\/{version}\/?ranges={ranges}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_PEOPLE_GET","url":"http:\/\/cms.mobile.conduit-services.com\/agenda\/{type}\/{id}\/{version}\/","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_POLLS_GET","url":"http:\/\/cms.mobile.conduit-services.com\/polls\/{type}\/{pollId}\/","reload_interval_sec":7200,"method":"GET"},{"name":"CONTACT_POLLS_POST","url":"http:\/\/polls.mobile.conduit-services.com\/polls\/result\/","reload_interval_sec":1200,"method":"POST"},{"name":"CMS_CONTENT_ITEMS","url":"http:\/\/cms.mobile.conduit-services.com\/contentItems\/items\/contenthost\/{take}\/{skip}\/?id={id}&params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_CONTENT_COLLECTION","url":"http:\/\/cms.mobile.conduit-services.com\/contentItems\/collection\/contenthost\/{take}\/?id={id}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_CONTENT_ITEMS_SEARCH","url":"http:\/\/cms.mobile.conduit-services.com\/contentItems\/items\/search\/{type}\/{collectionId}\/{take}\/{skip}\/?searchParams={searchParams}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_MENU_GET","url":"http:\/\/cms.mobile.conduit-services.com\/restaurants\/menu\/{provider}\/?query={restid}","reload_interval_sec":7200,"method":"GET"},{"name":"COMMUNITY_SOCIAL_LOGIN_POST","url":"http:\/\/community.mobile.conduit-services.com\/users\/social\/login\/{globalAppId}","reload_interval_sec":7200,"method":"POST"},{"name":"COMMUNITY_SOCIAL_LOGOUT_POST","url":"http:\/\/community.mobile.conduit-services.com\/users\/social\/logout\/{globalAppId}\/{userId}?socialId={socialId}","reload_interval_sec":7200,"method":"POST"},{"name":"CMS_USERS_SEARCH_GET","url":"http:\/\/cms.mobile.conduit-services.com\/users\/{provider}\/{skip}\/{take}\/?globalAppId={globalAppId}&q={search_term}&params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"DISCUSSION_DISCUSSIONS_GET","url":"http:\/\/discussion.mobile.conduit-services.com\/discussions\/{globalAppId}\/{userId}","reload_interval_sec":7200,"method":"GET"},{"name":"DISCUSSION_MESSAGES_GET","url":"http:\/\/discussion.mobile.conduit-services.com\/messages\/{discussionId}\/{skip}\/{take}","reload_interval_sec":7200,"method":"GET"},{"name":"DISCUSSION_MESSAGES_SEND_POST","url":"http:\/\/discussion.mobile.conduit-services.com\/messages\/{globalAppId}\/{fromId}","reload_interval_sec":7200,"method":"POST"},{"name":"CONTACT_CONTENT_POST","url":"http:\/\/contact.mobile.conduit-services.com\/contact\/client\/v2\/{globalAppId}\/{formId}\/?version={version}&postUrl={postUrl}","reload_interval_sec":7200,"method":"POST"},{"name":"IMAGE_UPLOADER_POST","url":"http:\/\/imageupload.mobile.conduit-services.com\/files\/upload","reload_interval_sec":7200,"method":"POST"},{"name":"CMS_COUPONS_GET","url":"http:\/\/cms.mobile.conduit-services.com\/coupons\/{type}\/{listId}\/{take}\/{skip}","reload_interval_sec":7200,"method":"GET"},{"name":"AMS_PUBLISHER_APPS_GET","url":"http:\/\/ams.mobile.conduit-services.com\/publisher\/apps\/{publisherId}","reload_interval_sec":7200,"method":"GET"},{"name":"AMS_APP_STYLE_GET","url":"http:\/\/ams.mobile.conduit-services.com\/appstyletemplate\/{styleTemplateId}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_LOYALTYCARDS_GET","url":"http:\/\/cms.mobile.conduit-services.com\/loyalty\/{type}\/{listId}\/{take}\/{skip}","reload_interval_sec":7200,"method":"GET"},{"name":"CONTENTHOST_LOYALTYCARDS_VALIDATE_POST","url":"https:\/\/contenthost.mobile.conduit-services.com\/loyalty\/validate\/{cardId}","reload_interval_sec":7200,"method":"POST"}],"reload_interval_sec":86400},"maxAge":86399,"serviceUrl":"http:\/\/servicemap.mobile.conduit-services.com\/mobile"},{"data":{"details":{"appHomeUrl":"http:\/\/parereavvocato.4yourmobile.com"},"globalAppId":"b2964e2e-26dd-48e9-9a3e-8824f7c44fce","icon":"http:\/\/storage.conduit.com\/Mobile\/b2\/dd\/b2964e2e-26dd-48e9-9a3e-8824f7c44fce\/Images\/75c1dc0b-3a20-4237-a753-0c87b9793b2f.png","id":"b7910a48-87bb-4559-9b20-d8a647c67163","label":"Consulenza Legale ","layout":{"colorTheme":{"background":"#00ffffff","buttons":"#ff524234","navTxt":"#FFFFFFFF","contBtxt":"#ff877c69","contBsubTxt":"#FFB4B4B4","contAbg":"#FFFFFFFF","hdrBg":"#ff524234","contAhdlTxt":"#ff574229","navIcn":"#FFFFFFFF","contCsubTxt":"#FFB4B4B4","contBhdlTxt":"#ff574229","contCbg":"#ff524234","contAsubTxt":"#FFB4B4B4","contAtxt":"#ff877c69","appBg":"#00ffffff","contBbg":"#FFFFFFFF","actBtn":"#ffda1a1a","navBg":"#ff524234","contCtxt":"#FFFFFFFF","contAbrdr":"#FFDDDDDD","lnkTxt":"#ffda1a1a","hdrTxt":"#FFFFFFFF","contChdlTxt":"#FFFFFFFF","contBbrdr":"#FFC1C1C2","deviceType":-1,"headers":"#ff574229","id":10,"displayName":"Earth","mainText":"#ffda1a1a","smallText":"#ff877c69"},"layoutType":2,"meta":{"bgImage":"http:\/\/storage.conduit.com\/Mobile\/b2\/dd\/b2964e2e-26dd-48e9-9a3e-8824f7c44fce\/Images\/c7117ec8-7856-43fe-a6d7-45759a72118f.png","culture":null,"header":{"type":1,"content":"http:\/\/storage.conduit.com\/Mobile\/b2\/dd\/b2964e2e-26dd-48e9-9a3e-8824f7c44fce\/Images\/557aa06c-cb66-406c-b782-78115eed8f7e.png"},"isRtl":false,"material":0},"template":{"appGeneral":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"appBg"}]}}}},"loadingSmallIcn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAsubTxt"}]},"isBlack":false,"isSimple":false}}},"footer":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000","shadow":{"isInset":false,"x":"0px","y":"-2px","blur":"3px","color":"#99000000"}}}}},"scrnDiv":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000","shadow":{"isInset":false,"x":"3px","y":"0px","blur":"10px","color":"#99000000"}}}},"brdr":{"type":"border","data":{"default":{"right":{"color":"#FF000000","width":"1px"}}}}},"dialog":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#CC000000"}}},"btn2":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFe4e4e4","location":0},{"color":"#FF8d8d8d","location":1}]},"clicked":{"type":"solid","color":"#FF8d8d8d"},"disabled":{"type":"solid","color":"#33333333"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FFBFBBB8","width":"1px"},"right":{"color":"#FFBFBBB8","width":"1px"},"left":{"color":"#FFBFBBB8","width":"1px"},"top":{"color":"#FFBFBBB8","width":"1px"}},"clicked":{"bottom":{"color":"#FF757575","width":"1px"},"right":{"color":"#FF757575","width":"1px"},"left":{"color":"#FF757575","width":"1px"},"top":{"color":"#FF757575","width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FF5F5B5A","shadow":{"x":"0","y":"1px","blur":"0","color":"#80FFFFFF"}},"selected":{"color":"#CC000000","shadow":{"x":"0","y":"1px","blur":"0","color":"#80FFFFFF"}},"disabled":{"color":"#CCCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF5F5B5A","isBlack":true,"isSimple":true},"clicked":{"type":"solid","color":"#FF464342","isBlack":true,"isSimple":true},"disabled":{"type":"solid","color":"#CCCCCCCC","isBlack":true,"isSimple":true}}}}},"floatBtn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000"},"clicked":{},"disabled":{}}},"brdr":{"type":"border","data":{}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FFFFFFFF","shadow":{"x":"0px","y":"1px","blur":"2px","color":"#E5000000"}},"selected":{"color":"#ffb0b0b0"},"disabled":{"color":"#CCCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FFFFFFFF","isBlack":false,"isSimple":true}}}},"shareViewIcn":{"type":"icon","data":{"default":{"type":"solid","color":"#FFa29f9e","isBlack":true,"isSimple":true}}},"adBar":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.9]}]}}}},"brdr":{"type":"border","data":{"top":{"color":{"_replace":[{"param":"contBbg"}]},"width":"1px"}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBhdlTxt"}]}}}}},"pullToRef":{"typeA":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAbg"}]},"shadow":{"isInset":true,"x":"-1px","y":"1px","blur":"2px","color":"#54000000"}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAsubTxt"}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contAbrdr"}]},"width":"1px"}}}}},"typeB":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg"}]},"shadow":{"isInset":true,"x":"-1px","y":"1px","blur":"2px","color":"#54000000"}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBsubTxt"}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"subTxt"}]},"isBlack":true,"isSimple":false}}}},"ribbon":{"txt":{"type":"text","data":{"default":{"color":"#FF000000"}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":false,"x":"0px","y":"0px","blur":"3px","color":"#99000000"}}}},"brdr":{"type":"border","data":{"default":{"top":{"color":"#FF000000","width":"1px"},"bottom":{"color":"#FF000000","width":"1px"}}}}}},"appHeader":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,1.6,1],[1,0.9,1.25,0.92]]}]},"location":0},{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.9,1.4,1],[1,1,1.13,0.95]]}]},"location":0.25},{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,1,1.1,1],[1,1,1.1,1]]}]},"location":0.49},{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,1,1,1],[1,1,1,1]]}]},"location":0.5},{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,1,0.8,1],[1,1,0.8,0.9]]}]},"location":0.73},{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,1,0.7,1],[1,0.7,0.5,1]]}]},"location":1}],"shadow":{"isInset":false,"x":"0px","y":"1px","blur":"3px","color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,0.3,0.8],[1,0.7,0.2,1]]}]}}}}},"bgTint":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrTxt"}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.5,1.05,1],[1,0.7,0.6,0.9]]}]},"width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"hdrTxt"}]}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.9,0.7,0.4],[1,0.9,0.5,0.4]]}]}},"clicked":{"type":"solid","color":"#4C000000","shadow":{"isInset":true,"x":"-1px","y":"1px","blur":"2px","color":"#66000000"}},"selected":{"type":"solid","color":"#4C000000","shadow":{"isInset":true,"x":"-1px","y":"1px","blur":"2px","color":"#66000000"}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrTxt"}]},"isBlack":false,"isSimple":true}}}}},"navBar":{"item":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,0.8,1.3,1],[1,0.9,1.25,0.95]]}]},"location":0},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,0.9,1.2,1],[1,1,1,0.95]]}]},"location":0.18},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,1,1],[1,1,0.7,1]]}]},"location":0.55},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.8,1],[1,1,0.5,1]]}]},"location":0.84},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.7,1],[1,0.6,0.4,1]]}]},"location":1}]},"clicked":{"type":"gradient","orientation":"vertical","color":[{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.5,0.7],[1,0.6,0.5,1]]}]},"location":0},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.5,0.7],[1,1,0.35,1]]}]},"location":0.18},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.4,0.7],[1,1,0.3,1]]}]},"location":0.55},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,0.8,0.2,0.7],[1,1,0.4,1]]}]},"location":0.84},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,0.5,0.1,0.7],[1,0.9,0.5,1]]}]},"location":1}],"shadow":{"isInset":true,"x":"0px","y":"0px","blur":"2px","color":"#FF000000"}},"selected":{"type":"gradient","orientation":"vertical","color":[{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.5,0.7],[1,0.6,0.5,1]]}]},"location":0},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.5,0.7],[1,1,0.35,1]]}]},"location":0.18},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.4,0.7],[1,1,0.3,1]]}]},"location":0.55},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,0.8,0.2,0.7],[1,1,0.4,1]]}]},"location":0.84},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,0.5,0.1,0.7],[1,0.9,0.5,1]]}]},"location":1}],"shadow":{"isInset":true,"x":"0px","y":"0px","blur":"2px","color":"#FF000000"}}}},"bubbleBg":{"type":"background","data":{"default":{},"clicked":{}}},"brdr":{"type":"border","data":{"default":{},"clicked":{}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"navTxt","fn":"hsla","params":[1,1,1,0.8]}]}},"clicked":{"color":{"_replace":[{"param":"navTxt"}]}},"selected":{"color":{"_replace":[{"param":"navTxt"}]}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"navIcn"}]},"isBlack":false,"isSimple":true}}}}},"navGrid":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#33000000"}}},"btn":{"bg":{"type":"background","data":{"default":{},"clicked":{}}},"brdr":{"type":"border","data":{"default":{},"clicked":{}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"navTxt","fn":"hsla","params":[1,1,1,0.8]}]}},"clicked":{"color":{"_replace":[{"param":"navTxt"}]}}}}}},"navList":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#33000000"}}},"item":{"bg":{"type":"background","data":{"default":{},"clicked":{"type":"solid","color":"#40000000"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#4c2a2a2a","width":"1px"}},"clicked":{}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"navTxt"}]}},"clicked":{}}}}},"navSidebar":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FF282828"}}},"scrnDiv":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000","shadow":{"isInset":false,"x":"-3px","y":"0px","blur":"10px","color":"#99000000"}}}},"brdr":{"type":"border","data":{"default":{"left":{"color":"#FF000000","width":"1px"}}}}},"item":{"bg":{"type":"background","data":{"default":{},"clicked":{"type":"solid","color":"#33000000","shadow":{"isInset":true,"x":"0px","y":"1px","blur":"3px","color":"#99000000"}},"selected":{"type":"solid","color":"#33000000","shadow":{"isInset":true,"x":"0px","y":"1px","blur":"3px","color":"#99000000"}}}},"marker":{"type":"background","data":{"default":{},"clicked":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FF3e3e3e","width":"1px"}},"clicked":{},"selected":{}}},"txt":{"type":"text","data":{"default":{"color":"#FFefefef"},"clicked":{"color":"#FFFFFFFF"},"selected":{"color":"#FFFFFFFF"}}}}},"tabBar":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#E1FFFFFF"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FFC1C1C2","width":"1px"}}}},"item":{"bg":{"type":"background","data":{"default":{},"clicked":{}}},"bubble":{"bg":{"type":"background","data":{"default":{},"clicked":{"type":"solid","color":"#3C000000"},"selected":{"type":"solid","color":"#FFb0b0b1"}}},"brdr":{"type":"border","data":{"default":{},"clicked":{},"selected":{}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]},"shadow":{"x":"0","y":"1px","blur":"0","color":"#FFf6f5f1"}},"clicked":{"color":"#FFFFFFFF","shadow":{"x":"0","y":"1px","blur":"0","color":"#FFa1a09e"}},"selected":{"color":"#FFFFFFFF","shadow":{"x":"0","y":"1px","blur":"1px","color":"#FFa1a09e"}}}}},"brdr":{"type":"border","data":{"default":{},"clicked":{}}}}},"tab2Bar":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"horizontal","color":[{"color":"#DCCDCDCD","location":0},{"color":"#E6FFFFFF","location":0.5},{"color":"#DCCDCDCD","location":1}],"shadow":[{"isInset":true,"x":"0px","y":"-1px","blur":"0px","color":{"_replace":[{"param":"lnkTxt"}]}},{"isInset":true,"x":"0px","y":"1px","blur":"0px","color":{"_replace":[{"param":"lnkTxt"}]}},{"isInset":true,"x":"0px","y":"1px","blur":"10px -2px","color":"#B4000000"},{"isInset":true,"x":"0px","y":"-1px","blur":"10px -2px","color":"#B4000000"}]}}},"triangle":{"type":"border","data":{"default":{"top":{"width":"6px","color":{"_replace":[{"param":"contAtxt"}]}},"left":{"width":"8px","color":"#00000000"},"right":{"width":"8px","color":"#00000000"},"bottom":{"width":"6px","color":{"_replace":[{"param":"contAtxt"}]}}}}},"item":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000"},"selected":{"type":"solid","color":"#00000000"}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}},"selected":{"color":{"_replace":[{"param":"contAtxt"}]}}}}}},"contTypeA":{"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAhdlTxt"}]}}}},"hdlTxtBrdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":"#FFCCCCCC"},"bottom":{"width":"1px","color":"#FFCCCCCC"}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAtxt"}]}},"mandatory":{"color":"#FFBB0000"}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAsubTxt"}]}}}},"lnkTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}}}},"hdlIcn":{"type":"server_icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAhdlTxt"}]},"isBlack":true,"isSimple":true}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAtxt"}]},"isBlack":true,"isSimple":false}}},"subIcn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAsubTxt"}]},"isBlack":true,"isSimple":false}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAbg"}]}},"clicked":{"type":"solid","color":"#FFf5f3ef"},"selected":{"type":"solid","color":"#FFf7f7f7"}}},"subBg":{"type":"background","data":{"default":{"type":"solid","color":"#FFeeeeee"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contAbrdr"}]},"width":"1px"}},"clicked":{},"selected":{"top":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,0.5,1]}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,0.5,1]}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,0.5,1]}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,0.5,1]}]}}}}},"classicItem":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAbg"}]}},"clicked":{"type":"solid","color":"#FFf5f3ef"},"selected":{"type":"solid","color":"#FFf7f7f7"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contAbrdr"}]},"width":"1px"}},"clicked":{},"selected":{"top":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,0.5,1]}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,0.5,1]}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,0.5,1]}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,0.5,1]}]}}}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFfcfcfc","location":0},{"color":"#FFe5e5e5","location":1}],"shadow":[{"isInset":false,"x":"1px","y":"1px","blur":"2px","color":"#26000000"},{"isInset":true,"x":"-1px","y":"-1px","blur":"0px","color":"#CCFFFFFF"}]},"clicked":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFe5e5e5","location":0},{"color":"#FFfcfcfc","location":1}],"shadow":[{"isInset":false,"x":"1px","y":"1px","blur":"1px","color":"#4c000000"},{"isInset":true,"x":"1px","y":"1px","blur":"0px","color":"#CCFFFFFF"}]},"disabled":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFe7e7e7","location":0},{"color":"#FFE6E6E6","location":1}]}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FFBFBBB8","width":"1px"},"right":{"color":"#FFBFBBB8","width":"1px"},"left":{"color":"#FFBFBBB8","width":"1px"},"top":{"color":"#FFBFBBB8","width":"1px"}},"clicked":{"bottom":{"color":"#FFa7a7a7","width":"1px"},"right":{"color":"#FFa7a7a7","width":"1px"},"left":{"color":"#FFa7a7a7","width":"1px"},"top":{"color":"#FFa7a7a7","width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FF5F5B5A","shadow":{"x":"0","y":"1px","blur":"0","color":"#80FFFFFF"}},"selected":{"color":"#CC000000","shadow":{"x":"0","y":"1px","blur":"0","color":"#80FFFFFF"}},"disabled":{"color":"#ffCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF2a2a2a","isBlack":true,"isSimple":false}}}},"actBtn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"actBtn","fn":"t_hsla","params":[0.5,[1,1,1.3,1],[1,1,0.5,1]]}]}},"disabled":{"type":"solid","color":"#33333333"}}},"brdr":{"type":"border","data":{}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FFFFFFFF"},"selected":{"color":"#FFFFFFFF"},"disabled":{"color":"#ffCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FFFFFFFF","isBlack":false,"isSimple":true}}}},"contentSession":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAhdlTxt","fn":"hsla","params":[1,1,1,0.88]}]}}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg"}]}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg","fn":"hsla","params":[1,1,1,0.69]}]}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg","fn":"hsla","params":[1,1,1,0.49]}]}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00FFFFFF","shadow":[{"isInset":false,"x":"0px","y":"0px","blur":"0px 1px","color":"#66000000"},{"isInset":true,"x":"1px","y":"1px","blur":"0px","color":"#4Dffffff"}]}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FFFFFFFF","isBlack":false,"isSimple":true}}}}},"contentSession2":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"lnkTxt","fn":"hsla","params":[1,1,1,0.88]}]}}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg"}]}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg","fn":"hsla","params":[1,1,1,0.69]}]}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg","fn":"hsla","params":[1,1,1,0.49]}]}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00FFFFFF","shadow":[{"isInset":false,"x":"1px","y":"1px","blur":"0px","color":"#66ffffff"},{"isInset":true,"x":"1px","y":"1px","blur":"3px","color":"#99000000"}]}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FFFFFFFF","isBlack":false,"isSimple":true}}}}},"calBoxBrdr1":{"type":"border","data":{"default":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","style":"dotted","color":{"_replace":[{"param":"contBbrdr","fn":"hsla","params":[1,1,1,0.7]}]}}}}},"calBoxBrdr2":{"type":"border","data":{"default":{"top":{"width":"1px","style":"dotted","color":{"_replace":[{"param":"contBbrdr","fn":"hsla","params":[1,1,1,0.7]}]}},"bottom":{"width":"1px","style":"dotted","color":{"_replace":[{"param":"contBbrdr","fn":"hsla","params":[1,1,1,0.7]}]}}}}}},"contTypeB":{"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBhdlTxt"}]},"shadow":{"x":"1px","y":"1px","blur":"0","color":"#ccFFFFFF"}}}},"hdlTxtBrdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":{"_replace":[{"param":"contBhdlTxt","fn":"hsla","params":[1,1,1,0.2]}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBhdlTxt","fn":"hsla","params":[1,1,1,0.2]}]}}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBtxt"}]},"shadow":{"x":"1px","y":"1px","blur":"1px","color":"#FFFFFFFF"}},"mandatory":{"color":"#FFBB0000","shadow":{"x":"1px","y":"1px","blur":"1px","color":"#FFFFFFFF"}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBsubTxt"}]},"shadow":{"x":"1px","y":"1px","blur":"1px","color":"#FFFFFFFF"}}}},"lnkTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]},"shadow":{"x":"1px","y":"1px","blur":"1px","color":"#FFf6f5f1"}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBtxt"}]},"isBlack":true,"isSimple":false}}},"subIcn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBsubTxt"}]},"isBlack":true,"isSimple":true}}},"hdlIcn":{"type":"server_icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBhdlTxt"}]},"isBlack":true,"isSimple":true}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.88]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.82]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.82]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}}}},"subBg":{"type":"background","data":{"default":{"type":"solid","color":"#FFe1e1e1"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}},"clicked":{"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}},"selected":{"top":{"color":{"_replace":[{"param":"contBbrdr","fn":"hsla","params":[1,1,0.6,1]}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"contBbrdr","fn":"hsla","params":[1,1,0.6,1]}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"contBbrdr","fn":"hsla","params":[1,1,0.6,1]}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"contBbrdr","fn":"hsla","params":[1,1,0.6,1]}]},"width":"1px"}}}},"bubbleItem":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.88]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.82]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBbg"}]},"shadow":[{"isInset":false,"x":"0px","y":"0px","blur":"1px","color":"#FFFFFFFF"},{"isInset":false,"x":"0px","y":"0px","blur":"2px","color":"#FFFFFFFF"},{"isInset":false,"x":"0px","y":"0px","blur":"2px","color":"#FFFFFFFF"},{"isInset":false,"x":"0px","y":"0px","blur":"2px","color":"#FFFFFFFF"}]}}},"ovrImg":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#B2000000"},"clicked":{"type":"solid","color":{"_replace":[{"param":"lnkTxt","fn":"hsla","params":[1,1,1,0.6]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"lnkTxt","fn":"hsla","params":[1,1,1,0.8]}]}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#b2ffffff","isBlack":false,"isSimple":false}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FFFFFFFF"}}},"txt":{"type":"text","data":{"default":{"color":"#B2FFFFFF"}}},"subTxt":{"type":"text","data":{"default":{"color":"#7fFFFFFF"}}}},"brdr":{"type":"border","data":{}}},"headerItem":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.88]}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.82]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.82]}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}}}}},"trackItem":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.88]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.82]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBbg"}]}}}},"brdr":{"type":"border","data":{"default":{"top":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}},"clicked":{"top":{"color":{"_replace":[{"param":"hdrBg"}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"hdrBg"}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"hdrBg"}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"hdrBg"}]},"width":"1px"}},"selected":{"top":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}}}}},"fullPage":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.88]}]}}}}},"fullPage2":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.82]}]}}}}},"fullPage3":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.95]}]}}}}},"sep":{"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr","fn":"hsla","params":[1,1,0.6,1]}]}}}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFFFFFFF","location":0},{"color":"#FFE6E6E6","location":1}]},"clicked":{"type":"gradient","orientation":"vertical","color":[{"color":"#ffdddddd","location":0},{"color":"#ffcccccc","location":1}]},"disabled":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFe7e7e7","location":0},{"color":"#FFE6E6E6","location":1}]}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FFBFBBB8","width":"1px"},"right":{"color":"#FFBFBBB8","width":"1px"},"left":{"color":"#FFBFBBB8","width":"1px"},"top":{"color":"#FFBFBBB8","width":"1px"}},"clicked":{"bottom":{"color":"#FF757575","width":"1px"},"right":{"color":"#FF757575","width":"1px"},"left":{"color":"#FF757575","width":"1px"},"top":{"color":"#FF757575","width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FF5F5B5A","shadow":{"x":"0","y":"1px","blur":"0","color":"#80FFFFFF"}},"selected":{},"disabled":{"color":"#CCCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF5F5B5A","isBlack":true,"isSimple":false},"clicked":{"type":"solid","color":"#FF464342","isBlack":true,"isSimple":false},"disabled":{"type":"solid","color":"#CCCCCCCC","isBlack":true,"isSimple":false}}}},"actBtn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"actBtn","fn":"t_hsla","params":[0.5,[1,1,1.3,1],[1,1,0.5,1]]}]}},"disabled":{"type":"solid","color":"#33333333"}}},"brdr":{"type":"border","data":{}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FFFFFFFF"},"selected":{"color":"#FFFFFFFF"},"disabled":{"color":"#ffCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FFFFFFFF","isBlack":false,"isSimple":true}}}},"subBtn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBsubTxt","fn":"hsla","params":[1,1,0.8,1]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBsubTxt"}]}}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FFFFFFFF","shadow":{"x":"0px","y":"1px","blur":"1px","color":"#80FFFFFF"}}}}}},"contTypeC":{"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contChdlTxt"}]}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contCtxt"}]}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contCsubTxt"}]}}}},"lnkTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contCbg","fn":"t_hsla","params":[0.5,[1,1,0.6,0.9],[1,1,0.3,0.9]]}]}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"actBtn","fn":"t_hsla","params":[0.5,[1,1,1.3,1],[1,1,0.5,1]]}]}},"disabled":{"type":"solid","color":"#33333333"}}},"brdr":{"type":"border","data":{}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FFFFFFFF"},"selected":{"color":"#FFFFFFFF"},"disabled":{"color":"#ffCCCCCC"}}}}},"form":{"element":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFe4e4e4","location":0},{"color":"#FF8d8d8d","location":1}]},"mandatory":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFFFFFFF","location":0},{"color":"#FF8d8d8d","location":1}],"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#4cb60021"}}}},"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":"#FFC1C1C2"},"bottom":{"width":"1px","color":"#FFC1C1C2"},"left":{"width":"1px","color":"#FFC1C1C2"},"right":{"width":"1px","color":"#FFC1C1C2"}},"mandatory":{"top":{"color":"#FFB60021","width":"1px"},"bottom":{"color":"#FFB60021","width":"1px"},"left":{"color":"#FFB60021","width":"1px"},"right":{"color":"#FFB60021","width":"1px"}}}},"txt":{"type":"text","data":{"default":{"color":"#FF111111"},"watermark":{"color":"#FF888888"},"mandWatermark":{"color":"#FFb60021"}}}},"dropdown":{"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF2a2a2a","isBlack":true,"isSimple":true}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":"#22000000"}}},"brdr":{"type":"border","data":{"default":{"left":{"color":"#FFC1C1C2","width":"1px"},"right":{"color":"#FFC1C1C2","width":"1px"}}}}},"input":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF"},"disabled":{"type":"solid","color":"#FFCCCCCC"},"mandatory":{"type":"solid","color":"#FFfff8f8","shadow":{"isInset":false,"x":"1px","y":"1px","blur":"5px","color":"#4cb60021"}}}},"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":"#FFC1C1C2"},"bottom":{"width":"1px","color":"#FFC1C1C2"},"left":{"width":"1px","color":"#FFC1C1C2"},"right":{"width":"1px","color":"#FFC1C1C2"}},"diabled":{},"mandatory":{"top":{"color":"#FFB60021","width":"1px"},"bottom":{"color":"#FFB60021","width":"1px"},"left":{"color":"#FFB60021","width":"1px"},"right":{"color":"#FFB60021","width":"1px"}}}},"txt":{"type":"text","data":{"default":{"color":"#FF000000"},"watermark":{"color":"#FF8e8e8e"},"mandWatermark":{"color":"#FFb60021"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FFa8a8a8","isBlack":false,"isSimple":true},"selected":{"type":"solid","color":"#FF2a2a2a","isBlack":true,"isSimple":true},"clicked":{"type":"solid","color":"#FF626262","isBlack":true,"isSimple":true}}}},"checkBox":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"selected":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"mandatory":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"disabled":{"type":"solid","color":"#54d3d3d3","shadow":{"isInset":false,"x":"0px","y":"1px","blur":"0px","color":"#FFFFFFFF"}}}},"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}}},"selected":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}}},"mandatory":{"top":{"color":"#FFB60021","width":"1px"},"bottom":{"color":"#FFB60021","width":"1px"},"left":{"color":"#FFB60021","width":"1px"},"right":{"color":"#FFB60021","width":"1px"}},"disabled":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#00FFFFFF","isBlack":false,"isSimple":true},"selected":{"type":"solid","color":"#FF2a2a2a","isBlack":true,"isSimple":true}}}},"radioBtn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"selected":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"mandatory":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"disabled":{"type":"solid","color":"#54d3d3d3","shadow":{"isInset":false,"x":"0px","y":"1px","blur":"0px","color":"#FFFFFFFF"}}}},"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}}},"selected":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}}},"mandatory":{"top":{"color":"#FFB60021","width":"1px"},"bottom":{"color":"#FFB60021","width":"1px"},"left":{"color":"#FFB60021","width":"1px"},"right":{"color":"#FFB60021","width":"1px"}},"disabled":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}}}}},"icn":{"type":"background","data":{"default":{},"selected":{"type":"solid","color":"#FF2a2a2a","isBlack":true,"isSimple":true},"disabled":{"type":"solid","color":"#FFd3d3d3","isBlack":true,"isSimple":true}}}}},"audioPlayer":{"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"hdrTxt"}]}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"hdrTxt","fn":"hsla","params":[1,1,1,0.8]}]}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrTxt"}]},"isBlack":false,"isSimple":false}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg","fn":"hsla","params":[1,1,0.3,1]}]}}}},"bgMini":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg","fn":"hsla","params":[1,1,0.3,1]}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.5,0.7,0.9],[1,0.7,0.6,0.9]]}]},"width":"1px"}}}},"seekBar":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,1.3,1],[1,0.7,0.7,1]]}]},"shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,0.001,1],[1,0.7,0.001,1]]}]}}}}},"brdr":{"type":"border","data":{"default":{"top":{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,1.1,1],[1,0.7,0.7,1]]}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,1.8,1],[1,0.7,0.7,1]]}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,1.8,1],[1,0.7,0.7,1]]}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,1.1,1],[1,0.7,0.7,1]]}]},"width":"1px"}}}},"seekFill":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrTxt"}]},"shadow":{"isInset":true,"x":"0px","y":"1px","blur":"1px","color":"#ff000000"}}}}}},"liveChat":{"bubbleMe":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.88]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}}}},"triangle":{"type":"border","data":{"default":{"ltrLeft":{"color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.88]}]},"width":"10px"},"bottom":{"color":"#00000000","width":"10px"},"top":{"color":"#00000000","width":"10px"}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBhdlTxt"}]},"shadow":{"x":"1px","y":"1px","blur":"0","color":"#CCFFFFFF"}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBsubTxt"}]},"shadow":{"x":"1px","y":"1px","blur":"1px","color":"#FFFFFFFF"}}}}},"bubbleOther":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAbg"}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}}}},"triangle":{"type":"border","data":{"default":{"ltrRight":{"color":{"_replace":[{"param":"contAbg"}]},"width":"10px"},"bottom":{"color":"#00000000","width":"10px"},"top":{"color":"#00000000","width":"10px"}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAhdlTxt"}]},"shadow":{"x":"1px","y":"1px","blur":"0px","color":"#CCFFFFFF"}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBsubTxt"}]},"shadow":{"x":"1px","y":"1px","blur":"0px","color":"#FFFFFFFF"}}}}}},"facebook":{"txt":{"type":"text","data":{"default":{"color":"#FF576b95"}}},"bubble":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFedeff4"}}},"brdr":{"type":"border","data":{"default":{"left":{"color":"#FFced5e4","width":"1px"},"right":{"color":"#FFced5e4","width":"1px"},"bottom":{"color":"#FFced5e4","width":"1px"},"top":{"color":"#FFced5e4","width":"1px"}}}},"triangle":{"type":"border","data":{"default":{"left":{"color":"#00000000","width":"4px"},"right":{"color":"#00000000","width":"4px"},"bottom":{"color":"#FFedeff4","width":"4px"}}}},"triangleBrdr":{"type":"border","data":{"default":{"left":{"color":"#00000000","width":"6px"},"right":{"color":"#00000000","width":"6px"},"bottom":{"color":"#FFced5e4","width":"6px"}}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000"},"clicked":{"type":"solid","color":"#FFFFCCAA"},"disabled":{"type":"solid","color":"#33333333"}}},"brdr":{"type":"border","data":{"default":{"left":{"color":"#00000000","width":"1px"},"right":{"color":"#00000000","width":"1px"},"bottom":{"color":"#00000000","width":"1px"},"top":{"color":"#00000000","width":"1px"}},"clicked":{"bottom":{"color":"#FFFF6611","width":"1px"},"right":{"color":"#FFFF6611","width":"1px"},"left":{"color":"#FFFF6611","width":"1px"},"top":{"color":"#FFFF6611","width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FF576b95"},"selected":{"color":"#FF576b95"},"disabled":{"color":"#CCCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF5F5B5A","isBlack":true,"isSimple":true},"clicked":{"type":"solid","color":"#FF464342","isBlack":true,"isSimple":true},"disabled":{"type":"solid","color":"#CCCCCCCC","isBlack":true,"isSimple":true}}}}},"events":{"calPict":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.78]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"2px","color":"#FF000000"}}}}}},"comment":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF"}}},"panel":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFF0F0F0"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FFCCCCCC","width":"1px"}}}}}},"images":{"image1":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FFC1C1C2","width":"1px"},"top":{"color":"#FFC1C1C2","width":"1px"},"right":{"color":"#FFC1C1C2","width":"1px"},"left":{"color":"#FFC1C1C2","width":"1px"}}}}},"image2":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FF000000","width":"1px"},"top":{"color":"#FF000000","width":"1px"},"right":{"color":"#FF000000","width":"1px"},"left":{"color":"#FF000000","width":"1px"}}}}},"catImage":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000","shadow":[{"isInset":false,"x":"0px","y":"0px","blur":"1px","color":"#FF000000"},{"isInset":true,"x":"0px","y":"0px","blur":"0px 3px","color":"#FFFFFFFF"},{"isInset":true,"x":"0px","y":"0px","blur":"1px 3px","color":"#66000000"}]},"clicked":{"type":"solid","color":"#00000000","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"3px","color":"#CC000000"}},"selected":{"type":"solid","color":"#00000000","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"3px","color":"#CC000000"}}}},"bgGrad":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#00000000","location":0},{"color":"#00000000","location":0.47},{"color":"#59000000","location":1}],"shadow":[{"isInset":false,"x":"0px","y":"0px","blur":"1px","color":"#FF000000"},{"isInset":true,"x":"0px","y":"0px","blur":"0px 3px","color":"#FFFFFFFF"},{"isInset":true,"x":"0px","y":"0px","blur":"1px 3px","color":"#66000000"}]}}},"txt":{"type":"text","data":{"default":{"color":"#FFFFFFFF","shadow":[{"x":"0px","y":"0px","blur":"1px","color":"#FF000000"},{"x":"1px","y":"1px","blur":"3px","color":"#CC000000"}]}}}},"imgBtn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#FF000000"}},"clicked":{"type":"solid","color":"#FFFFFFFF"},"selected":{"type":"solid","color":"#FFFFFFFF"}}},"overlayBg":{"type":"background","data":{"default":{"type":"solid","color":"#99000000"},"clicked":{"type":"solid","color":"#00000000"},"selected":{"type":"solid","color":"#00000000"}}},"brdr":{"type":"border","data":{"default":{"left":{"color":"#ffffffff","width":"3px"},"right":{"color":"#ffffffff","width":"3px"},"bottom":{"color":"#ffffffff","width":"3px"},"top":{"color":"#ffffffff","width":"3px"}},"clicked":{"bottom":{"color":"#00000000","width":"0px"},"right":{"color":"#00000000","width":"0px"},"left":{"color":"#00000000","width":"0px"},"top":{"color":"#00000000","width":"0px"}},"selected":{"bottom":{"color":"#00000000","width":"0px"},"right":{"color":"#00000000","width":"0px"},"left":{"color":"#00000000","width":"0px"},"top":{"color":"#00000000","width":"0px"}}}}}},"coupons":{"claimed":{"txt":{"type":"text","data":{"default":{"color":"#FFFFFFFF"}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FF9cba3e","shadow":{"isInset":true,"x":"0px","y":"-1px","blur":"3px","color":"#96000000"}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FFFFFFFF","isBlack":false,"isSimple":true}}},"brdr":{"type":"border","data":{"default":{"bottom":{"width":"1px","color":"#FF2a2a2a"}}}}},"notClaimed":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg"}]},"shadow":{"isInset":true,"x":"0px","y":"-1px","blur":"3px","color":"#96000000"}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"style":"dotted","width":"1px","color":"#FF2A2A2A"}}}}}},"punch":{"wideBg":{"type":"background","data":{"default":{"type":"solid","color":"#B2000000"}}},"bgImage":{"overlayBg":{"type":"background","data":{"default":{"type":"solid","color":"#DDFFFFFF"}}}},"errTxt":{"type":"text","data":{"default":{"color":"#FFB60021"}}},"slot":{"whole":{"bg":{"type":"svg","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}}}},"overlay":{"type":"svg","data":{"default":{"type":"solid","color":"#55FFFFFF"}}},"txt":{"type":"text","data":{"default":{"color":"#FFFFFFFF"}}}},"punch":{"bg":{"type":"svg","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}}}},"overlay":{"type":"svg","data":{"default":{"type":"solid","color":"#FFFFFFFF"}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}}}}}}}}},"meta":{"bgImage":"http:\/\/storage.conduit.com\/Mobile\/b2\/dd\/b2964e2e-26dd-48e9-9a3e-8824f7c44fce\/Images\/c7117ec8-7856-43fe-a6d7-45759a72118f.png","culture":"IT","header":{"type":1,"content":"http:\/\/storage.conduit.com\/Mobile\/b2\/dd\/b2964e2e-26dd-48e9-9a3e-8824f7c44fce\/Images\/557aa06c-cb66-406c-b782-78115eed8f7e.png"},"isRtl":false,"material":0},"name":"Consulenza Legale ","pages":[{"alias":"pacchetto-offerta","deviceIcon":null,"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/40","id":"677d6de3-228b-4ed8-b4ea-e7ef6ccfbee6","label":"Pacchetto Offerta","meta":{"pageLayout":-1,"notes":[{"id":"0d87dc15-fdd1-23a5-fc89-9fa148d00fa2","html":"<div style=\"background-color: rgba(239,234,229,.8);\">\u000d\u000a<p style=\"text-align: center;\"><span style=\"font-size: 16pt;\"><strong><span style=\"color: #ffffff;\"><br \/><\/span><\/strong><\/span><\/p>\u000d\u000a<p style=\"text-align: center;\"><span style=\"font-size: 16pt; color: #000000;\"><strong>Acquisto consulenze legali telefoniche<\/strong><\/span><\/p>\u000d\u000a<p style=\"text-align: center;\"><span style=\"font-size: 16pt; color: #000000;\"><img alt=\"''\" src=\"http:\/\/itsapp2you.com\/appfiles\/Consulenza%20Legale\/arbitrato%20mobile%20app.png\" \/><\/span><\/p>\u000d\u000a<p style=\"text-align: justify;\"><span style=\"font-size: 11pt;\">Lo Studio Legale Mursia ti offre la possibita' di acquistare due consulenze legali telefoniche al costo di soli 30 euro, iva inclusa e nessun costo aggiuntivo. L' acquisto del servizio pro ti da diritto ad avere le tue consulenze in qualsiasi momento, quando vuoi dal lunedi' al sabato, dalle ore 11.00 am alle ore 20.00 pm &nbsp;chiamando direttamente lo studio legale al numero telefonico di contatto. Il tuo acquisto non ha scadenza e potrai usufruire del servizio di due consulenze telefoniche senza limiti di tempo quando vorrai anche a distanza di mesi od anni. L' acquisto del pacchetto pro per privati ed aziende ti concede, inoltre, il diritto di essere richiamato dall' avvocato dello studio esperto nella tua problematica legale immediatamente per non farti sostenere alcun costo telefonico. Terminate le tue due consulenze telefoniche senza limiti temporali potrai decidere di ricaricare subito il tuo credito per usufruire continuativamente del medesimo servizio di assistenza &nbsp;legale telefonica &nbsp;illimitata temporalmente al medesimo prezzo di 30 euro ogni due consulenze. Di tutte le attivita' dello studio legale riceverai regolare fattura e se' sei azienda o titolare di partita IVA potrai portare in detrazione fiscale il nostro servizio di consulenza legale. L'acquisto del pacchetto pro e' una grande opportunita' che puoi mantenere per sempre, un grande risparmio di soldi e tempo.<\/span><\/p>\u000d\u000a<p style=\"text-align: justify;\"><span style=\"font-size: 11pt;\"><br \/><\/span><\/p>\u000d\u000a<p style=\"text-align: center;\"><a href=\"https:\/\/www.paypal.com\/cgi-bin\/webscr?cmd=_s-xclick&amp;hosted_button_id=N93NFSLGYJYN8\" style=\"font-size: 9pt;\"><img alt=\"Preview Image\" src=\"https:\/\/www.paypalobjects.com\/it_IT\/IT\/i\/btn\/btn_buynow_LG.gif\" \/><\/a><\/p>\u000d\u000a<\/div>"}],"layout":null},"minVersion":"0.0.0.0","type":"27f91d0a-42c0-48fa-90a8-7138641ddecf","version":null},{"alias":"news","deviceIcon":null,"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/20","id":"19202a02-6abe-47bf-b629-ce423ea74a64","label":"News","meta":{"pageLayout":4,"feeds":[{"id":"03df6ffe-01ba-74bb-0232-d37f1fd35204","url":"http:\/\/www.parereavvocato.com\/feed\/","title":"Feed","params":{"addGeo":false,"sort":{},"expiration":null}},{"id":"11fa5518-876c-7095-87fe-631c3db42176","url":"http:\/\/www.parereavvocato.com\/category\/civile\/feed\/","title":"Civile","params":{"addGeo":false,"sort":{},"expiration":null}},{"id":"fc03d72e-0c6a-38a5-2b23-c3d680e36fc5","url":"http:\/\/www.parereavvocato.com\/category\/ereditario\/feed\/","title":"Ereditario","params":{"addGeo":false,"sort":{},"expiration":null}},{"id":"bce66d8e-a3f2-3aa6-9a7a-838569a52070","url":"http:\/\/www.parereavvocato.com\/category\/famiglia\/feed\/","title":"Famiglia","params":{"addGeo":false,"sort":{},"expiration":null}}],"layout":null},"minVersion":"0.0.0.0","type":"51a61af7-1e90-4d68-88db-b1e69a0cca59","version":null},{"alias":"consulenza-legale","deviceIcon":null,"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/79","id":"870746ff-ada0-4b58-921e-cbb3ee593178","label":"Consulenza Legale","meta":{"pageLayout":-1,"notes":[{"id":"1a488d11-b7f1-0cf5-c7be-80ed52ac6e37","html":"<div style=\"background-color: rgba(239,234,229,.8);\">\u000d\u000a<p style=\"margin: 0px 0px 15px; font-family: arial; font-size: 12px; font-weight: bold; color: #0a0000; line-height: 22px; text-align: center;\"><span style=\"color: #000000; font-size: 6pt;\"><strong><br \/><\/strong><\/span><\/p>\u000d\u000a<p style=\"margin: 0px 0px 15px; font-family: arial; font-size: 12px; font-weight: bold; color: #0a0000; line-height: 22px; text-align: center;\"><span style=\"font-family: arial;\"><span style=\"font-size: 19.09090805053711px; line-height: 21.988636016845703px;\"><strong>ATTIVITA&acute;DI CONSULENZA LEGALE E REDAZIONE PARERI MOTIVATI &nbsp;solo di avvocati Cassazionisti<\/strong><\/span><\/span><\/p>\u000d\u000a<p style=\"margin: 0px 0px 15px; font-family: arial; font-size: 12px; font-weight: bold; color: #0a0000; line-height: 22px; text-align: justify;\"><span><span style=\"font-family: arial;\"><span style=\"line-height: 21.988636016845703px;\"><strong>Consulenza legale offerta dal Nostro Studio di Avvocati Cassazionisti ad &nbsp;un costo di euro 30 &nbsp;e &nbsp;fornita esclusivamente da esperti del settore legale di interesse. Per esperti si intende che il legale incaricato del servizio di consulenza legale &egrave; regolarmente iscritto tra gli Avvocati Patrocinanti in Cassazione nel proprio distretto di Corte di Appello.<\/strong><\/span><span style=\"font-size: 12px; line-height: 22px;\"><strong>.<\/strong><\/span><\/span><\/span><\/p>\u000d\u000a<p style=\"margin: 0px 0px 15px; font-family: arial; font-size: 12px; font-weight: bold; color: #0a0000; line-height: 22px; text-align: justify;\"><span style=\"color: #000000;\"><br \/><\/span><\/p>\u000d\u000a<h3 style=\"margin: 0px 0px 0.3em; font-family: 'Open Sans', 'Franklin Gothic Medium', 'Arial Narrow Bold', Arial, sans-serif; font-weight: normal; line-height: 1; color: #0a0000; text-rendering: optimizelegibility; font-size: 24.5px; text-align: center;\"><span><span style=\"color: #ff0000; font-family: 'Open Sans', 'Franklin Gothic Medium', 'Arial Narrow Bold', Arial, sans-serif;\"><span style=\"font-size: 14.545454025268555px; line-height: 12.727272033691406px;\">COME SI SVOLGE IL SERVIZIO DI CONSULENZA LEGALE<\/span><\/span><strong style=\"color: #ff0000; font-family: 'Open Sans', 'Franklin Gothic Medium', 'Arial Narrow Bold', Arial, sans-serif; font-size: 11pt; font-weight: normal; line-height: 1;\">:<\/strong><\/span><\/h3>\u000d\u000a<p style=\"margin: 0px 0px 15px; font-family: arial; font-size: 12px; font-weight: bold; color: #0a0000; line-height: 22px; text-align: justify;\"><span style=\"font-family: arial;\"><span style=\"line-height: 21.988636016845703px;\"><strong>La consulenza legale pu&ograve; essere offerta mediante colloquio telefonico o &nbsp;redazione di parere motivato regolarmente siglato dal titolare dello Studio a richiesta del soggetto interessato e secondo le Sue specifiche esigenze. Garantiamo il pieno anonimato nel rispetto delle Leggi vigenti tempo per tempo per l&acute;intera attivita&acute;di consulenza legale di cui veniamo incaricati.<\/strong><\/span><\/span><\/p>\u000d\u000a<p style=\"margin: 0px 0px 15px; font-family: arial; font-size: 12px; font-weight: bold; color: #0a0000; line-height: 22px; text-align: justify;\"><span style=\"font-family: arial;\"><span style=\"line-height: 21.988636016845703px;\"><strong><br \/><\/strong><\/span><\/span><\/p>\u000d\u000a<p style=\"margin: 0px 0px 15px; font-family: arial; font-size: 12px; font-weight: bold; color: #0a0000; line-height: 22px; text-align: justify;\"><span style=\"font-family: arial;\"><span style=\"line-height: 21.988636016845703px;\"><strong>La nostra attivita&acute;professionale di consulenza legale e&acute;sempre preceduta da un breve colloquio orientativo con l&acute;interessato a garanzia della qualita&acute;del servizio di assistenza legale e per chiarire tutti i termini del servizio.<\/strong><\/span><\/span><\/p>\u000d\u000a<p style=\"margin: 0px 0px 15px; font-family: arial; font-size: 12px; font-weight: bold; color: #0a0000; line-height: 22px; text-align: justify;\"><span style=\"font-family: arial;\"><span style=\"line-height: 21.988636016845703px;\"><strong><br \/><\/strong><\/span><\/span><\/p>\u000d\u000a<p style=\"margin: 0px 0px 15px; font-family: arial; font-size: 12px; font-weight: bold; color: #0a0000; line-height: 22px; text-align: justify;\"><span style=\"font-family: arial;\"><span style=\"line-height: 21.988636016845703px;\"><strong>Puoi richiedere con fiducia e senza impegno un colloquio orientativo prima di accedere al servizio di consulenza legale compilando il modulo sottostante o contattandoci telefonicamente o via e-mail. Puoi reperire tutti gli elementi validi in tal senso anche nella voce del menu&acute;&rdquo;contatta lo studio&rdquo; ed accedere al colloquio orientativo gratuito anche da questa e dalle altre pagine del sito fornite dell&acute;apposito form.<\/strong><\/span><\/span><\/p>\u000d\u000a<p style=\"margin: 0px 0px 15px; font-family: arial; font-size: 12px; font-weight: bold; color: #0a0000; line-height: 22px; text-align: justify;\"><span style=\"font-family: arial;\"><span style=\"line-height: 21.988636016845703px;\"><strong><br \/><\/strong><\/span><\/span><\/p>\u000d\u000a<p style=\"margin: 0px 0px 15px; font-family: arial; font-size: 12px; font-weight: bold; color: #0a0000; line-height: 22px; text-align: justify;\"><span style=\"font-family: arial;\"><span style=\"line-height: 21.988636016845703px;\"><strong>Il servizio e&acute;svolto esclisivamente da avvocati patrocinanti in Cassazione regolarmente iscitti presso il competente Albo Professionale questo, per garantire una consulenza legale esaustiva e competente di qualita&acute;indiscussa per il tuo problema legale e trovare con voi la adeguata soluzione di diritto. Grazie.<\/strong><\/span><\/span><\/p>\u000d\u000a<p style=\"margin: 0px 0px 15px; font-family: arial; font-size: 12px; font-weight: bold; color: #0a0000; line-height: 22px; text-align: justify;\">&nbsp;<\/p>\u000d\u000a<p style=\"margin: 0px 0px 15px; text-align: center;\"><span style=\"font-size: 14pt;\"><span style=\"color: #0a0000; font-family: arial;\"><span style=\"line-height: 21.988636016845703px;\"><strong><a href=\"mailto:studiointernazionale@gmail.com\">RICHIEDI ORA UN COLLOQUIO ORIENTATIVO<\/a><\/strong><\/span><\/span><\/span><\/p>\u000d\u000a<div style=\"text-align: center;\"><\/div>\u000d\u000a<div class=\"middle\" style=\"margin: 0px; padding: 8px; border: 0px; font-family: arial; font-size: 13px; font-weight: bold; vertical-align: baseline; color: #222222;\">\u000d\u000a<div class=\"original-text\" style=\"margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-size: 10pt; font-style: inherit; font-variant: inherit; font-weight: inherit; vertical-align: baseline; clear: both; position: relative; width: 404px; text-align: center;\"><\/div>\u000d\u000a<div style=\"text-align: center;\"><\/div>\u000d\u000a<\/div>\u000d\u000a<\/div>"}],"layout":null},"minVersion":"0.0.0.0","type":"27f91d0a-42c0-48fa-90a8-7138641ddecf","version":null},{"alias":"chi-siamo","deviceIcon":null,"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/48","id":"38e693cd-ed2f-4de1-972c-66418aa5e11d","label":"Chi Siamo","meta":{"pageLayout":-1,"items":[{"buttons":{"facebook":"https:\/\/www.facebook.com\/parere.avvocato","twitter":"https:\/\/twitter.com\/ParereAvvocato","email":"studiointernazionale@gmail.com","webSite":"http:\/\/www.parereavvocato.com\/"},"list":[{"title":"{$HtmlTextAboutUsItemTitleGeneralInfo}","icon":"http:\/\/storage.conduit.com\/Images\/Mobile\/controlpanel\/AboutUs\/icons_white\/Info.png","iconBlack":"http:\/\/storage.conduit.com\/Images\/Mobile\/controlpanel\/AboutUs\/icons_black\/Info.png","dataType":"text","data":{"text":"Lo Studio Legale Mursia è composto esclusivamente da Avvocati Patrocinanti in Cassazione con esperienza ventennale nei settori del: Diritto Civile, Diritto Tributario e Fiscale, Diritto Ereditario, Separazioni e Divorzi, Economia e Finanza, Diritto Contrattuale, Diritto Societario, Diritto del Lavoro Trattati sulla doppia imposizione fiscale. Siamo esperti nel diritto societario e fallimentare, nei trasferimenti societari, nella costituzione di strutture estere on ed off-shore, pianificazione fiscale (tax planning), redazione testamenti, pianificazione fiscale internazionale, copertura patrimoni mobiliari ed immobiliari da aggressioni di terzi."}}],"about":"Lo Studio Legale Mursia tramite il portale giuridico offre informazioni giuridiche ed economiche  e servizi di assistenza legale per privati ed aziende","imgUrl":"http:\/\/storage.conduit.com\/Mobile\/b2\/dd\/b2964e2e-26dd-48e9-9a3e-8824f7c44fce\/Images\/5d1dfda3-e406-49e4-a827-af73326fe067.jpg","description":"Scarica nel tuo cellulare questa applicazione dello Studio Legale Mursia che ti permette di tenerti aggiornato in merito alle importanti news legislative ed economiche del momento, leggere articoli unici commentati per te da avvocati esperti in diritto ed economia. In pari tempo avere questa applicazione nel tuo telefono ti permette di essere costantemente in contatto tramite il portale giuridico con lo Studio Legale e tutti i suoi servizi di assistenza. Potrai ottenere assistenza immediata per le tue problematiche legali o di investimento,  consulti  esclusivi di Avvocati Patrocinanti in Cassazione al costo di pochi euro. Un servizio legale completo, facilmente accessibile e di grande qualita´ che solo avvocati di elevata esperienza professionale possono rendere per privati ed aziende. Avere questo servizio nel tuo telefono significa avere un legale od un economista a tua disposizione per ogni tuo problema legale per ricevere la tua consulenza telefonica in tempo reale ogni giorno della settimana, festivi inclusi dalle ore 10am alle ore 22pm, chiedere opinioni, ottenere informazioni approfondite in ordine ad ogni problematica legata al mondo del diritto e degli investimenti, accedere a servizi gratuiti, richiedere pareri motivati. Un mondo di servizi nel tuo telefono per consulenze, civile, tributario, fiscale, lavoro, economia e finanza, investimenti, e molto altro ancora. Una applicazione gratuita di valore professionale assoluto."}],"layout":null},"minVersion":"2.0.0.0","type":"5a8368df-6ebd-c0f2-2d82-e173c1f33d40","version":null},{"alias":"facebook","deviceIcon":null,"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/17","id":"46775c93-01cd-4f55-9f13-9fa946dd734f","label":"Facebook","meta":{"pageLayout":0,"channels":[{"id":"f2bd7091-ac19-edb8-9c8b-8e1ddd3386d1","user":"parereavvocato","postsSource":"feed","title":"Channel"}],"layout":null},"minVersion":"0.0.0.0","type":"df7d11f3-233c-4d49-8f2a-d1886e07c641","version":null},{"alias":"podcast","deviceIcon":null,"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/47","id":"46deac7a-5692-4c26-aa65-fa6419f32ea5","label":"Podcast","meta":{"pageLayout":-1,"items":[{"title":"Playlist","params":{"type":1,"className":"rss","icon":"\/Images\/Providers\/Audio\/small_icon_1.png","url":"http:\/\/comediansatlaw.podomatic.com\/rss2.xml","params":{"expiration":"0","sort":{}}},"id":"17174fa8-fe55-476c-468d-1b96a49be999"}],"layout":null},"minVersion":"1.8.0.0","type":"30be1358-8b36-4d22-b6d2-50c38f4246c4","version":null},{"alias":"contatta","deviceIcon":null,"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/15","id":"34eaf7d3-849c-4503-809a-916945074294","label":"Contatta ","meta":{"pageLayout":2,"items":[{"id":"d456898b-c547-24d0-03af-9f5b7ee70120","phone":"00393459707221","mail":"studiointernazionale@gmail.com","url":"http:\/\/www.parereavvocato.com\/contattalostudio\/","header":"Parere Avvocato","text":"Lo Studio Legale Mursia tramite il portale giuridico offre informazioni giuridiche ed economiche  e servizi di assistenza legale per privati ed aziende","address":"Via Germanico, 184, Roma, RM, Italia","lat":41.909011,"long":12.463019099999997}],"layout":null},"minVersion":"1.9.0.0","type":"083e52df-721d-4ca4-efa3-25161d344f40","version":null},{"alias":"piu-news","deviceIcon":null,"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/20","id":"bd5edbcd-9c04-4ef5-9238-8428a33deaaa","label":"Più News","meta":{"pageLayout":4,"feeds":[{"id":"9f52ef6f-3c0b-f26a-37ad-454f01a37c06","url":"http:\/\/www.parereavvocato.com\/category\/lavoro\/feed\/","title":"Lavoro","params":{"addGeo":false,"sort":{},"expiration":null}},{"id":"76e567b9-122f-6920-7a32-c0e1a8ca8ca4","url":"http:\/\/www.parereavvocato.com\/category\/societario\/feed\/","title":"Societario","params":{"addGeo":false,"sort":{},"expiration":null}},{"id":"698989e6-720c-be8e-a6da-9f74162062e8","url":"http:\/\/www.parereavvocato.com\/category\/tributario\/feed\/","title":"Tributario","params":{"addGeo":false,"sort":{},"expiration":null}},{"id":"057a610f-db14-5ae3-9dcd-3f04f2fbedd8","url":"http:\/\/www.parereavvocato.com\/category\/news-agenzia-entrate\/feed\/","title":"Pensioni","params":{"addGeo":false,"sort":{},"expiration":null}}],"layout":null},"minVersion":"0.0.0.0","type":"51a61af7-1e90-4d68-88db-b1e69a0cca59","version":null},{"alias":"ubicazione","deviceIcon":null,"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/35","id":"e5c83ab2-6219-4637-a769-8f9e5d1755cf","label":"Ubicazione","meta":{"pageLayout":-1,"items":[{"address":{"text":"Via Germanico, 184, Roma, RM, Italia"},"header":"Parere Avvocato","location":{"lat":"41.909011","lng":"12.463019099999997"}}],"layout":null},"minVersion":"2.0.0.0","type":"aca2f190-b22b-920d-f12a-998101ad4b70","version":null}],"publisherId":"657c690d-6be5-4b99-b83f-15839ec4c5f7","settings":{"ads":{"adBarCycles":null,"bottomBarAdEnabled":null,"bottomBarSwitchInterval":null,"enabled":false,"fullScreenAdDisplayDuration":null,"fullScreenAdEnabled":null,"fullScreenAdShowTimespan":null,"fullScreenAdSupportedPages":null,"fullScreenAdTO":null,"providers":null},"brand":{"name":null,"link":null,"showAppLinks":true},"env":3,"fbAccessToken":"AAACeZBZANVcJ0BALWdkZBkVMprgCHf89vvzV3bq47rmnXHXXRnFbOhtwvU0k0tbUcL1aEjCQgZCrZCOhldBPeaBZAymqaZAyZBUZD","overrideServices":[{"key":"CMS_TWITTER_QUERY_GET","params":{},"version":3},{"key":"CMS_TWITTER_USER_GET","params":{},"version":3}]},"social":{"facebook":{"appId":"375757265883286"}},"version":"1.16.14.228"},"maxAge":7200,"serviceUrl":"http:\/\/ams.mobile.conduit-services.com\/b7910a48-87bb-4559-9b20-d8a647c67163\/2?appVersion={appVersion}"},{"data":{"categories":[],"description":"Consulenza Legale e Pareri di Diritto","imageUrl":null,"items":[{"contentImageUrl":null,"contentWithHtml":"<p><strong>Mobbing, risarcimento del danno per il lavoratore costretto ad “oziare”<\/strong><\/p> <p>Essere pagato per non lavorare…<\/p> <p>Potrebbe essere il sogno di molti non far nulla ed essere ugualmente retribuiti alla fine del mese ma in realtà sappiamo che non è così anzi avendo più volte affrontato casistiche di questo genere e analizzandole dentro un ottica giuridica oltre che medica e sociologica, il lavoratore “messo da parte” ovvero costretto ad “oziare” mentre i colleghi lavorano oltre ad essere una comune forma di mobbing potrebbe comportare anche dei gravi danni al dipendente che potrebbe cadere vittima della depressione.<\/p> <p>La Sezione Lavoro della Suprema Corte di Cassazione, con la sentenza n. 16413 del 28 giugno 2013, che di seguito si riporta, ha affrontato questo tema concludendo per il riconoscimento del danno biologico nei confronti del lavoratore depresso a causa dell’ inattività.<\/p> <p>Sul tema, di grande interesse ed attualità stante la sempre maggiore diffusione delle patologie lavoro-correlate, sono state presentate svariate proposte legislative ad oggi non concretizzatesi in alcun testo di legge.<\/p> <p>Tale perdurante lacuna sul piano normativo contribuisce a creare fraintendimenti nell’attività di individuazione e di qualificazione della fattispecie.<br \/> Frequentemente infatti il fenomeno viene confuso con le più “tradizionali” (ma non per questo meno dannose) azioni di dequalificazione o marginalizzazione professionale.<br \/> In realtà, perché si possa parlare di mobbing, è necessario che ricorrano condizioni e presupposti particolari, in cui la dequalificazione o la marginalizzazione lavorativa possono essere importanti elementi indicatori di una fattispecie che tuttavia è più articolata e che, come vedremo, è connotata dalla sistematicità e dalla regolarità di attacchi attivi alla persona.<\/p> <p>Il mobbing (da “to mob” – assalire tumultuosamente) viene definito dallo psicologo svedese Heinz Leymann – uno dei massimi esperti in materia – come “il terrore psicologico sul luogo di lavoro che consiste in una comunicazione ostile e contraria ai principi etici, perpetrata in modo sistematico da una o più persone principalmente contro un singolo individuo che viene per questo spinto in una posizione di impotenza e impossibilità di difesa e qui costretto a restare da continue attività ostili.<br \/> Queste azioni sono effettuate con un’alta frequenza (almeno una volta alla settimana) e per un lungo periodo di tempo (per almeno sei mesi).<br \/> A causa dell’alta frequenza e della lunga durata, il comportamento ostile dà luogo a seri disagi psicologici, psicosomatici e sociali”.<\/p> <p>Le forme che questa azione può assumere vanno dalla dequalificazione dei compiti assegnati alla persona oggetto della persecuzione alla sua emarginazione nell’ambito lavorativo, dalla diffusione di notizie false ed offensive alle quotidiane critiche sul suo operato, per arrivare all’attacco all’immagine sociale nei confronti di colleghi e superiori.<br \/> Lo scopo principale del mobbing è, normalmente, quello di spingere una persona ritenuta “scomoda” a dare le dimissioni dall’azienda o a commettere azioni che ne giustifichino il licenziamento (c.d. mobbing strategico).<\/p> <p>Non sempre risulta altrettanto scontato chi siano i fautori dell’azione di mobbing: infatti, se in buona parte dei casi l’artefice della persecuzione è il datore di lavoro, spesso nelle azioni di mobbing sono coinvolti gli stessi colleghi che, per compiacere il “capo”, si uniscono alla strategia di isolamento e di vessazioni.<\/p> <p>Le ricerche condotte ed i casi conclamati sul piano medico-legale e giudiziario hanno dimostrato che il mobbing può portare all’invalidità psico-fisica; in questo senso è corretto inquadrare le patologie da mobbing tra le malattie professionali e, non a caso, l’INAIL riconosce queste patologie (qualora ne risulti dimostrata l’origine professionale) tra quelle che danno diritto al riconoscimento del danno biologico(danno all’integrità psico-fisica della persona).<\/p> <p>Nel contesto italiano non esiste, come si accennava, una organica definizione normativa di mobbing.<br \/> La nozione di molestie sul lavoro è stata per la prima volta inserita nei decreti legislativi sulle discriminazioni (D.Lgs. 215\/2003, D.Lgs. 216\/2003, D.Lgs. 145\/2005), i quali assimilano alle discriminazioni anche le molestie, ovvero quei comportamenti indesiderati posti in essere per ragioni di razza, etnia, handicap, sesso, ecc, aventi lo scopo o l’effetto di violare la dignità di una persona e di creare un clima intimidatorio, ostile, degradante, umiliante ed offensivo.<br \/> In base a quei decreti è altresì considerata discriminazione l’ordine di discriminare persone in ragione della razza, dell’origine etnica, dell’handicap, del sesso ecc..<\/p> <p>Si tratta di una prima definizione di molestie (o mobbing) sul lavoro, ma essa non può considerarsi esaustiva, dal momento che non sempre il mobbing è inquadrabile nelle condotte discriminatorie contemplate dalle disposizioni richiamate.<\/p> <p>Nell’ambito degli studi della psicologia del lavoro presenti nel panorama italiano, la definizione più completa è indubbiamente quella proposta da Harald Ege (psicologo del lavoro esperto di mobbing) che definisce il mobbing “una situazione lavorativa di conflittualità sistematica, persistente ed in costante progresso, in cui una o più persone vengono fatte oggetto di azioni ad alto contenuto persecutorio da parte di uno o più aggressori in posizione superiore, inferiore o di parità, con lo scopo di causare alla vittima danni di vario tipo e gravità.<br \/> Il mobbizzato si trova nell’impossibilità di reagire adeguatamente a tali attacchi e a lungo andare accusa disturbi psicosomatici, relazionali e dell’umore che possono portare anche a invalidità psicofisiche permanenti di vario genere e percentualizzazione” (Ege, La valutazione peritale del danno da mobbing, Giuffré, 2002, pag. 39).<br \/> Tale definizione, accompagnata dai parametri per l’individuazione del mobbing individuati dallo stesso Ege, è quella recepita con maggior frequenza dai Giudici (ed anche dalle proposte legislative parlamentari).<\/p> <p>E’ dunque opportuno dare conto dei vari parametri, in totale sette, per l’individuazione del mobbing messi a punto dopo anni di attività e ricerca sul campo dallo stesso Ege. Tali parametri, secondo l’autore, debbono essere tutti presenti affinché si possa parlare di mobbing (salvo i casi di “sasso nello stagno” o di “quick mobbing”).<br \/> Vediamo i parametri nel dettaglio.<\/p> <p><b><span style=\"text-decoration: underline;\">1) Ambiente lavorativo<\/span><\/b><br \/> Il mobbing deve svolgersi sul posto di lavoro, pur essendo un disagio che potrà poi ripercuotersi nella sfera privata del mobbizzato (in questo caso viene denominato doppio mobbing).<\/p> <p><b><span style=\"text-decoration: underline;\">2) Frequenza<\/span><\/b><br \/> Le azioni ostili devono accadere almeno alcune volte al mese (salvo il caso di “sasso nello stagno”).<\/p> <p><b><span style=\"text-decoration: underline;\">3) Durata<\/span><\/b><br \/> Il conflitto deve essere in corso da almeno sei mesi, salvo i casi cosiddetti di “quick mobbing” (cioè di frequenza quotidiana quindi particolarmente devastante delle azioni ostili) la cui durata può essere abbassata a tre mesi.<\/p> <p><b><span style=\"text-decoration: underline;\">4) Tipologia di azioni<\/span><\/b><br \/> Le azioni devono rientrare in almeno due parametri tra i seguenti:<\/p> <ul> <li>attacchi ai contatti umani: ad es. attraverso critiche e rimproveri ingiustificati, gesti e insinuazioni con significato negativo, minacce, limitazioni delle capacità espressive e della libertà di pensiero;<\/li> <li>isolamento sistematico: ad es. deliberata negazione di informazioni relative al lavoro o manipolazione delle stesse o divieto per i dipendenti di parlare con il lavoratore o, ancora, collocazione del lavoratore in luogo isolato;<\/li> <li>cambiamenti delle mansioni: ad es. attribuzione di mansioni dequalificanti, senza senso, umilianti, ecc.;<\/li> <li>attacchi alla reputazione: ad es. calunnie, offese, abusi, espressioni maliziose, insultanti;<\/li> <li>violenza e minacce di violenza; ad es. molestie sessuali, minacce di violenza fisica, adibizione a mansioni nocive per la salute, anche in relazione ad eventuali condizioni di invalidità.<\/li> <\/ul> <p><b><span style=\"text-decoration: underline;\">5) Dislivello tra gli antagonisti<\/span><\/b><br \/> Nel mobbing i “protagonisti” sono sostanzialmente due: la vittima (o mobbizzato) e l’aggressore (o mobber). Non si tratta però necessariamente di due persone, bensì di due ruoli in conflitto. La vittima è comunque in una posizione costante di inferiorità.<\/p> <p><b><span style=\"text-decoration: underline;\">6) Andamento secondo fasi successive<\/span><\/b><br \/> Perché una situazione possa essere definita mobbing, devono essere ben identificabili al suo interno non solo il senso di progresso, ma anche delle fasi successive.<br \/> In questo senso il modello Ege prevede una fase preparatoria (condizione zero) e sei fasi successive:<\/p> <ul> <li>fase 1: conflitto mirato;<\/li> <li>fase 2: inizio del mobbing;<\/li> <li>fase 3: primi sintomi psico-somatici;<\/li> <li>fase 4: errori ed abusi dell’Amministrazione del personale;<\/li> <li>fase 5: serio aggravamento della salute psico-fisica della vittima;<\/li> <li>fase 6: esclusione dal mondo del lavoro).<\/li> <\/ul> <p>E’ a partire dalla seconda fase che la vittima si “cristallizza” e comincia a percepire disagio e tensione, mentre la vicenda incomincia ad incanalarsi in una direzione ben precisa.<\/p> <p><b><span style=\"text-decoration: underline;\">7) Intento persecutorio<\/span><\/b><br \/> Perché si possa parlare di mobbing si deve riscontrare da parte dell’aggressore un chiaro scopo negativo nei confronti della vittima. Nella vicenda cioè devono essere riscontrabili scopo, obiettivo conflittuale e carica emotiva e soggettiva.<\/p> <p>The post <a href=\"http:\/\/www.parereavvocato.com\/2013\/11\/14\/mobbing\/\">Mobbing, risarcimento del danno per il lavoratore costretto ad “oziare”<\/a> appeared first on <a href=\"http:\/\/www.parereavvocato.com\">Parereavvocato.com<\/a>.<\/p>","datetime":1384386625,"description":"Mobbing, risarcimento del danno per il lavoratore costretto ad “oziare” Essere pagato per non lavorare… Potrebbe essere il sogno di molti non far nulla ed essere ugualmente retribuiti alla fine del mese ma in realtà sappiamo che non è così anzi avendo più volte affrontato casistiche di questo genere e analizzandole dentro un ottica giuridica […] The post Mobbing, risarcimento del danno per il lavoratore costretto ad “oziare” appeared first on Parereavvocato.com .","descriptionWithHtml":"<p>Mobbing, risarcimento del danno per il lavoratore costretto ad “oziare” Essere pagato per non lavorare… Potrebbe essere il sogno di molti non far nulla ed essere ugualmente retribuiti alla fine del mese ma in realtà sappiamo che non è così anzi avendo più volte affrontato casistiche di questo genere e analizzandole dentro un ottica giuridica […]<\/p><p>The post <a href=\"http:\/\/www.parereavvocato.com\/2013\/11\/14\/mobbing\/\">Mobbing, risarcimento del danno per il lavoratore costretto ad “oziare”<\/a> appeared first on <a href=\"http:\/\/www.parereavvocato.com\">Parereavvocato.com<\/a>.<\/p>","geo":null,"id":"http:\/\/www.parereavvocato.com\/?p=1630","imageUrl":null,"link":"http:\/\/www.parereavvocato.com\/2013\/11\/14\/mobbing\/?noredirect=1#noredirect","socialInfo":{"imageUrl":null,"shortDesc":"Mobbing, risarcimento del danno per il lavoratore costretto ad “oziare” Essere pagato per non lavorare… Potrebbe essere il sogno di molti non far nulla ed essere ugualmente retribuiti alla fine del mese ma in realtà sappiamo che non è così anzi avendo più volte affrontato casistiche di questo genere e analizzandole dentro un ottica giuridica […] The post Mobbing, risarcimento del danno per il lavoratore costretto ad “oziare” appeared first on Parereavvocato.com .","socialId":"Feeds:http:\/\/www.parereavvocato.com\/2013\/11\/14\/mobbing\/#noredirect","title":"Mobbing, risarcimento del danno per il lavoratore costretto ad “oziare”","url":"http:\/\/www.parereavvocato.com\/2013\/11\/14\/mobbing\/#noredirect"},"title":"Mobbing, risarcimento del danno per il lavoratore costretto ad “oziare”"},{"contentImageUrl":null,"contentWithHtml":"<p>Affidamento minori ed esecuzione dei provvedimento del Giudice civile<\/p> <p style=\"text-align: justify;\">Viola le disposizioni del giudice civile sull’affidamento minori, la madre separata di una bambina di otto mesi che si trasferisce in Sicilia in cerca di un lavoro mentre un provvedimento del Tribunale di Trento aveva collocato la minore presso l’ex abitazione coniugale a Capriana (Tn) stabilendo il diritto di visita anche infrasettimanale del padre. Lo ha stabilito la Corte di cassazione, con la sentenza 43292\/2013, dichiarando inammissibile il ricorso della madre.<\/p> <p style=\"text-align: justify;\">Per la Suprema corte, infatti, “l’<a title=\"articolo 388 codice penale\" href=\"http:\/\/www.testolegge.com\/codice-penale\/articolo-388\">elusione dell’esecuzione di un provvedimento del giudice civile<\/a> che riguardi l’affidamento di minori può concretarsi in un qualunque comportamento da cui derivi la ‘frustrazione’ delle legittime pretese altrui, ivi compresi gli atteggiamenti di mero carattere omissivo, quando questi siano finalizzati ad ostacolare ed impedire di fatto l’esercizio del diritto di visita e di frequentazione della prole (cfr. in termini: cass. pen. sez. 6, 33719\/2010, fattispecie in cui vi erano stati frequenti e non comunicati spostamenti dei luogo di dimora senza preavviso al marito separato non affidatario)”.<\/p> <p style=\"text-align: justify;\">Nell’ambito dei provvedimenti con cui il giudice pronuncia la separazione o il divorzio tra i coniugi, vengono di solito disciplinate anche le modalità di visita dei figli da parte del genitore presso cui non sono stati collocati o – in casi più rari – a cui non sono stati affidati.<\/p> <p style=\"text-align: justify;\">Capita spesso, tuttavia, che quest’ultimo faccia fatica a vedere i bambini in quanto l’altro genitore adotta un atteggiamento ostruzionistico, adducendo scuse e giustificazioni ogni qual volta debbono avvenire gli incontri. Si può parlare, in queste situazioni, di una vera e propria forma di mobbing, che si caratterizza per un insieme di comportamenti che possono così sintetizzarsi.<\/p> <p style=\"text-align: justify;\">Il sabotaggio delle frequentazioni con i figli<\/p> <p style=\"text-align: justify;\">Nella maggior parte delle situazioni conflittuali, si utilizzano scuse comuni (“il bambino dorme” o “non si sente bene”) per non consegnare il figlio all’altro genitore; oppure si mette quest’ultimo nella condizione di dover incontrare i figli in circostanze che lo spogliano di qualunque ruolo genitoriale, anche per la scelta del tempo e dei modi da passare con loro (come quando deve seguire i figli in attività parascolastiche fissate proprio nei suoi giorni di frequentazione).<\/p> <p style=\"text-align: justify;\">In altri casi, addirittura, viene illegittimamente operato un allontanamento fisico del minore, giustificato dal trasferimento del il genitore affidatario in altra località, tale da creare una oggettiva difficoltà alla possibilità degli incontri.<\/p> <p style=\"text-align: justify;\"> L’isolamento dai processi decisionali<\/p> <p style=\"text-align: justify;\">Di frequente, poi, il genitore non affidatario o non collocatario viene tenuto fuori da scelte fondamentali per la vita del figlio (problemi di salute, scelte di indirizzo scolastico, ecc.), venendo informato solo a cose fatte. La giustificazione viene spesso ricondotta all’indole troppo ansiosa o invadente del genitore che potrebbe in qualche modo ledere l’equilibrio psicofisico del minore.<\/p> <p style=\"text-align: justify;\">La attività denigratoria<\/p> <p style=\"text-align: justify;\">Non di rado, ancora, si finiscono col rivolgere all’ex, accuse e minacce di vario tipo, coinvolgendo la rete amicale e familiare, fino ad arrivare alla sede giudiziaria (ne rappresentano il classico esempio le denunce di sottrazione di minore per ritardi nella riconsegna del bambino, fino a quelle gravissime di abuso sessuale e\/o maltrattamenti, ecc.).<\/p> <p style=\"text-align: justify;\">A volte si ottiene il coinvolgimento di terze persone disposte a fare da testimoni: conoscenti, ma anche gli stessi professionisti (si pensi alla produzione di certificati medici attestanti l’indisposizione del bambino).<\/p> <p style=\"text-align: justify;\">Non va dimenticato, però, che la conseguenza di tutto questo è di solito un provvedimento di sospensione delle frequentazioni genitore-figlio (recuperabili solo in un luogo “protetto”), che, inevitabilmente, finisce col portare, in ogni caso, ad una umiliante svalutazione della figura genitoriale.<\/p> <p style=\"text-align: justify;\">Nei casi di forte conflittualità tra le parti si può arrivare ad una partecipazione del minore alla campagna di denigrazione contro il genitore (cosiddetta Sindrome di alienazione parentale o Pas), con il rifiuto di ogni rapporto con questi e alla spontanea scelta, da parte del genitore escluso, di allontanarsi dalla vita del figlio.<\/p> <p style=\"text-align: justify;\">Tutela giuridica<\/p> <p style=\"text-align: justify;\">Non bisogna, invece, dimenticare che, anche nelle ipotesi – più rare – di affido esclusivo da parte di un genitore, rimane il fatto che le decisioni di maggior interesse spettano ad entrambi i coniugi; pertanto ogni comportamento ostativo sarà di grave ostacolo ai diritti dell’altro genitore. Quest’ultimo potrà rivolgersi al giudice utilizzando una serie di strumenti.<\/p> <p style=\"text-align: justify;\">Se, ad esempio, vi siano degli oggettivi mutamenti nella vita del figlio (riguardanti la salute o le sue scelte di vita quotidiana, un trasferimento improvviso), il genitore non collocatario potrà chiedere una modifica delle condizioni e delle modalità degli incontri programmati stabiliti dal giudice o concordate dalle parti.<\/p> <p style=\"text-align: justify;\">Qualora, nonostante i nuovi accordi, permangano gli atteggiamenti ostativi degli incontri del bambino con l’altro genitore, questi potrà agire in sede penale, con una querela per il mancato rispetto degli ordini del giudice in tema di affidamento minori, reato in cui rientra il caso del genitore che non osserva il regime di frequentazione stabilito dal magistrato di competenza.<\/p> <p style=\"text-align: justify;\">Altra strada percorribile per il rispetto dei provvedimenti del Giudice civile sull’affidamento minori, sempre in sede civile, sarà attraverso un’azione di ammonimento del coniuge che sanzioni la condotta di quest’ultimo, prevedendo – nell’ipotesi di gravi inadempienze o di atti che pregiudichino il minore o siano di ostacolo al corretto svolgimento delle modalità dell’affidamento – la possibilità da parte del giudice di modificare i provvedimenti in vigore tra le parti, ammonire il genitore inadempiente, disporre il risarcimento dei danni nei confronti del minore e dell’altro genitore, condannare il genitore inadempiente al pagamento di una sanzione amministrativa pecuniaria.<\/p> <p>The post <a href=\"http:\/\/www.parereavvocato.com\/2013\/11\/14\/affidamento-minori\/\">Affidamento minori – violazione provvedimenti del Giudice civile<\/a> appeared first on <a href=\"http:\/\/www.parereavvocato.com\">Parereavvocato.com<\/a>.<\/p>","datetime":1384385628,"description":"Affidamento minori ed esecuzione dei provvedimento del Giudice civile Viola le disposizioni del giudice civile sull’affidamento minori, la madre separata di una bambina di otto mesi che si trasferisce in Sicilia in cerca di un lavoro mentre un provvedimento del Tribunale di Trento aveva collocato la minore presso l’ex abitazione coniugale a Capriana (Tn) stabilendo […] The post Affidamento minori – violazione provvedimenti del Giudice civile appeared first on Parereavvocato.com .","descriptionWithHtml":"<p>Affidamento minori ed esecuzione dei provvedimento del Giudice civile Viola le disposizioni del giudice civile sull’affidamento minori, la madre separata di una bambina di otto mesi che si trasferisce in Sicilia in cerca di un lavoro mentre un provvedimento del Tribunale di Trento aveva collocato la minore presso l’ex abitazione coniugale a Capriana (Tn) stabilendo […]<\/p><p>The post <a href=\"http:\/\/www.parereavvocato.com\/2013\/11\/14\/affidamento-minori\/\">Affidamento minori – violazione provvedimenti del Giudice civile<\/a> appeared first on <a href=\"http:\/\/www.parereavvocato.com\">Parereavvocato.com<\/a>.<\/p>","geo":null,"id":"http:\/\/www.parereavvocato.com\/?p=1626","imageUrl":null,"link":"http:\/\/www.parereavvocato.com\/2013\/11\/14\/affidamento-minori\/?noredirect=1#noredirect","socialInfo":{"imageUrl":null,"shortDesc":"Affidamento minori ed esecuzione dei provvedimento del Giudice civile Viola le disposizioni del giudice civile sull’affidamento minori, la madre separata di una bambina di otto mesi che si trasferisce in Sicilia in cerca di un lavoro mentre un provvedimento del Tribunale di Trento aveva collocato la minore presso l’ex abitazione coniugale a Capriana (Tn) stabilendo […] The post Affidamento minori – violazione provvedimenti del Giudice civile appeared first on Parereavvocato.com .","socialId":"Feeds:http:\/\/www.parereavvocato.com\/2013\/11\/14\/affidamento-minori\/#noredirect","title":"Affidamento minori – violazione provvedimenti del Giudice civile","url":"http:\/\/www.parereavvocato.com\/2013\/11\/14\/affidamento-minori\/#noredirect"},"title":"Affidamento minori – violazione provvedimenti del Giudice civile"},{"contentImageUrl":null,"contentWithHtml":"<p style=\"text-align: justify;\">Diritto di visita:<\/p> <p style=\"text-align: justify;\">Il caso: viola le disposizioni del giudice la madre separata di una bambina di otto mesi che si trasferisce in Sicilia in cerca di un lavoro mentre un provvedimento del tribunale di Trento aveva collocato la minore presso l’ex abitazione coniugale a Capriana (Tn) stabilendo il diritto di visita anche infrasettimanale del padre. Lo ha stabilito la Corte di cassazione, con la sentenza 43292\/2013, dichiarando inammissibile il ricorso della madre.<\/p> <p style=\"text-align: justify;\">Per la Suprema Corte, in tema di diritto di visita, “l’elusione dell’esecuzione di un provvedimento del giudice civile che riguardi l’affidamento di minori può concretarsi in un qualunque comportamento da cui derivi la ‘frustrazione’ delle legittime pretese altrui, ivi compresi gli atteggiamenti di mero carattere omissivo, quando questi siano finalizzati ad ostacolare ed impedire di fatto l’esercizio del diritto di visita e di frequentazione della prole (cfr. in termini: cass. pen. sez. 6, 33719\/2010, fattispecie in cui vi erano stati frequenti e non comunicati spostamenti dei luogo di dimora senza preavviso al marito separato non affidatario)”.<\/p> <p style=\"text-align: justify;\">Nell’ambito dei provvedimenti con cui il giudice pronuncia la separazione o il divorzio tra i coniugi, vengono di solito disciplinate anche le modalità di visita dei figli da parte del genitore presso cui non sono stati collocati o – in casi più rari – a cui non sono stati affidati.<\/p> <p style=\"text-align: justify;\">Capita spesso, tuttavia, che quest’ultimo faccia fatica a vedere i bambini in quanto l’altro genitore adotta un atteggiamento ostruzionistico, adducendo scuse e giustificazioni ogni qual volta debbono avvenire gli incontri. Si può parlare, in queste situazioni, di una vera e propria forma di mobbing, che si caratterizza per un insieme di comportamenti che possono così sintetizzarsi.<\/p> <p style=\"text-align: justify;\">Il sabotaggio delle frequentazioni con i figli<\/p> <p style=\"text-align: justify;\">Nella maggior parte delle situazioni conflittuali, si utilizzano scuse comuni (“il bambino dorme” o “non si sente bene”) per non consegnare il figlio all’altro genitore; oppure si mette quest’ultimo nella condizione di dover incontrare i figli in circostanze che lo spogliano di qualunque ruolo genitoriale, anche per la scelta del tempo e dei modi da passare con loro (come quando deve seguire i figli in attività parascolastiche fissate proprio nei suoi giorni di frequentazione).<\/p> <p style=\"text-align: justify;\">In altri casi, addirittura, viene illegittimamente operato un allontanamento fisico del minore, giustificato dal trasferimento del il genitore affidatario in altra località, tale da creare una oggettiva difficoltà alla possibilità degli incontri.<\/p> <p style=\"text-align: justify;\">Di frequente, poi, il genitore non affidatario o non collocatario viene tenuto fuori da scelte fondamentali per la vita del figlio (problemi di salute, scelte di indirizzo scolastico, ecc.), venendo informato solo a cose fatte. La giustificazione viene spesso ricondotta all’indole troppo ansiosa o invadente del genitore che potrebbe in qualche modo ledere l’equilibrio psicofisico del minore.<\/p> <p style=\"text-align: justify;\">Non di rado, ancora, si finiscono col rivolgere all’ex, accuse e minacce di vario tipo, coinvolgendo la rete amicale e familiare, fino ad arrivare alla sede giudiziaria (ne rappresentano il classico esempio le denunce di sottrazione di minore per ritardi nella riconsegna del bambino, fino a quelle gravissime di abuso sessuale e\/o maltrattamenti, ecc.).<\/p> <p style=\"text-align: justify;\">A volte si ottiene il coinvolgimento di terze persone disposte a fare da testimoni: conoscenti, ma anche gli stessi professionisti (si pensi alla produzione di certificati medici attestanti l’indisposizione del bambino).<\/p> <p style=\"text-align: justify;\">Non va dimenticato, però, che la conseguenza di tutto questo è di solito un provvedimento di sospensione delle frequentazioni genitore-figlio (recuperabili solo in un luogo “protetto”), che, inevitabilmente, finisce col portare, in ogni caso, ad una umiliante svalutazione della figura genitoriale.<\/p> <p style=\"text-align: justify;\">Nei casi di forte conflittualità tra le parti si può arrivare ad una partecipazione del minore alla campagna di denigrazione contro il genitore (cosiddetta Sindrome di alienazione parentale o Pas), con il rifiuto di ogni rapporto con questi e alla spontanea scelta, da parte del genitore escluso, di allontanarsi dalla vita del figlio.<\/p> <p style=\"text-align: justify;\">Tutela giuridica<\/p> <p style=\"text-align: justify;\">Non bisogna, invece, dimenticare che, anche nelle ipotesi – più rare – di affido esclusivo da parte di un genitore, rimane il fatto che le decisioni di maggior interesse spettano ad entrambi i coniugi; pertanto ogni comportamento ostativo sarà di grave ostacolo ai diritti dell’altro genitore. Quest’ultimo potrà rivolgersi al giudice utilizzando una serie di strumenti.<\/p> <p style=\"text-align: justify;\">Se, ad esempio, vi siano degli oggettivi mutamenti nella vita del figlio (riguardanti la salute o le sue scelte di vita quotidiana, un trasferimento improvviso), il genitore non collocatario potrà chiedere una modifica delle condizioni e delle modalità degli incontri programmati stabiliti dal giudice o concordate dalle parti.<\/p> <p style=\"text-align: justify;\">Qualora, nonostante i nuovi accordi, permangano gli atteggiamenti ostativi degli incontri del bambino con l’altro genitore, questi potrà agire in sede penale, con una querela per il mancato rispetto degli ordini del giudice, reato in cui rientra il caso del genitore che non osserva il regime di frequentazione stabilito dal magistrato di competenza.<\/p> <p style=\"text-align: justify;\">Altra strada sarà percorribile in sede civile, attraverso un’azione di ammonimento del coniuge che sanzioni la condotta di quest’ultimo, prevedendo – nell’ipotesi di gravi inadempienze o di atti che pregiudichino il minore o siano di ostacolo al corretto svolgimento delle modalità dell’affidamento – la possibilità da parte del giudice di modificare i provvedimenti in vigore tra le parti, ammonire il genitore inadempiente, disporre il risarcimento dei danni nei confronti del minore e dell’altro genitore, condannare il genitore inadempiente al pagamento di una sanzione amministrativa pecuniaria.<\/p> <p>The post <a href=\"http:\/\/www.parereavvocato.com\/2013\/11\/12\/diritto-di-visita\/\">Diritto di visita del genitore<\/a> appeared first on <a href=\"http:\/\/www.parereavvocato.com\">Parereavvocato.com<\/a>.<\/p>","datetime":1384294474,"description":"Diritto di visita: Il caso: viola le disposizioni del giudice la madre separata di una bambina di otto mesi che si trasferisce in Sicilia in cerca di un lavoro mentre un provvedimento del tribunale di Trento aveva collocato la minore presso l’ex abitazione coniugale a Capriana (Tn) stabilendo il diritto di visita anche infrasettimanale del […] The post Diritto di visita del genitore appeared first on Parereavvocato.com .","descriptionWithHtml":"<p>Diritto di visita: Il caso: viola le disposizioni del giudice la madre separata di una bambina di otto mesi che si trasferisce in Sicilia in cerca di un lavoro mentre un provvedimento del tribunale di Trento aveva collocato la minore presso l’ex abitazione coniugale a Capriana (Tn) stabilendo il diritto di visita anche infrasettimanale del […]<\/p><p>The post <a href=\"http:\/\/www.parereavvocato.com\/2013\/11\/12\/diritto-di-visita\/\">Diritto di visita del genitore<\/a> appeared first on <a href=\"http:\/\/www.parereavvocato.com\">Parereavvocato.com<\/a>.<\/p>","geo":null,"id":"http:\/\/www.parereavvocato.com\/?p=1622","imageUrl":null,"link":"http:\/\/www.parereavvocato.com\/2013\/11\/12\/diritto-di-visita\/?noredirect=1#noredirect","socialInfo":{"imageUrl":null,"shortDesc":"Diritto di visita: Il caso: viola le disposizioni del giudice la madre separata di una bambina di otto mesi che si trasferisce in Sicilia in cerca di un lavoro mentre un provvedimento del tribunale di Trento aveva collocato la minore presso l’ex abitazione coniugale a Capriana (Tn) stabilendo il diritto di visita anche infrasettimanale del […] The post Diritto di visita del genitore appeared first on Parereavvocato.com .","socialId":"Feeds:http:\/\/www.parereavvocato.com\/2013\/11\/12\/diritto-di-visita\/#noredirect","title":"Diritto di visita del genitore","url":"http:\/\/www.parereavvocato.com\/2013\/11\/12\/diritto-di-visita\/#noredirect"},"title":"Diritto di visita del genitore"},{"contentImageUrl":null,"contentWithHtml":"<p style=\"text-align: justify;\">Il <i>danno da vacanza rovinata <\/i>è stato genericamente definito come quel danno discendente dalla mancata realizzazione del fine di diletto connesso al compimento di un viaggio organizzato; o, più precisamente, come il danno derivante <i>dall’emotional distress <\/i>che ha origine dal disagio e dall’afflizione, conseguenti le situazioni sgradevoli idonee a rovinare occasioni che dovrebbero essere di svago e di relax.<\/p> <p style=\"text-align: justify;\">La reazione di apparente sconcerto o di rifiuto dimostrata verso il ristoro di tale voce risarcitoria, deriva probabilmente dal fatto che il danno da vacanza rovinata è un <i><a title=\"danno non patrimoniale\" href=\"http:\/\/www.dirittoprivatoinrete.it\/danno_non_patrimoniale.htm\">danno non patrimoniale<\/a> di origine contrattuale<\/i>, dipendendo infatti da un inadempimento della controparte (in questo caso, un tour operator o un’agenzia di viaggio). Inutile sottolineare che tale voce di danno è praticamente sconosciuta nel nostro ordinamento.<\/p> <p style=\"text-align: justify;\">L’agenzia di viaggio è tenuta a risarcire la coppia in viaggio di nozze nel caso in cui la moglie considerata ancora cittadina extracomunitaria una volta scesa a destinazione non abbia il visto e quindi non possa soggiornare nel luogo scelto per la luna di miele. E’ questa la vicenda all’esame dalla terza sezione civile della Corte di cassazione con la sentenza 27 settembre-12 novembre 2013 n. 25410.<\/p> <p style=\"text-align: justify;\"> Due coniugi hanno convenuto davanti al Giudice di pace un agenzia di viaggio presso la quale avevano acquistato i biglietti aerei di andata e ritorno per il loro viaggio di nozze in Thailandia — chiedendo il risarcimento dei danni per il fatto che, giunti a destinazione il 6 gennaio 2004, l’Ufficio Immigrazione thailandese ha negato l’ingresso alla sposa, cittadina ecuadoregna, sequestrandole passaporto e il biglietto di viaggio, perché priva del visto di ingresso del Consolato competente, necessario per i cittadini extracomunitari.<\/p> <p style=\"text-align: justify;\">I due coniugi hanno contestato all’Agenzia “di non averli informati della necessità del visto, in violazione dei principi della Convenzione internazionale di Bruxelles del 1970 sui contratti di viaggio, ratificata in Italia con legge 27 dicembre 1977 n. 1084 (CCV)”. In pratica, a norma del Dlgs 17 marzo 1995 n. 111 sui contratti del turismo, hanno contestato la violazione degli obblighi derivanti dal contratto di mandato, ivi incluso il dovere di buona fede e di protezione del cliente, anche nella veste di consumatore, come dal relativo Statuto.<\/p> <p style=\"text-align: justify;\">L’agenzia ha resistito, declinando ogni responsabilità, sull’assunto “che essa aveva solo venduto i biglietti di viaggio e che non era tenuta a fornire informazione alcuna sui visti turistici”. Il giudice di pace adito aveva respinto la domanda. Il successivo appello in tribunale aveva confermato la decisione di primo grado.<\/p> <p style=\"text-align: justify;\">Le motivazioni<\/p> <p style=\"text-align: justify;\">La lettura della sentenza è interessante ai fini di stabilire i confini del contratto di mandato e della responsabilità conseguente. Secondo i giudici, non è condivisibile la tesi sostenuta dalla Corte d’appello “neppure nella parte in cui ha escluso che sia configurabile responsabilità dell’agente (n.d.r., dell’agenzia di viaggio) sulla base del norme che regolano il mandato. “Il principio – fanno presente i Supremi giudici – per cui il mandatario è tenuto ad eseguire solo le prestazioni che gli siano specificamente richieste dal mandante è in linea di principio corretto. (….) E’ frequente (soprattutto in tema di mandato) che i contraenti enuncino solo lo scopo perseguito; non necessariamente le singole attività necessarie per raggiungerlo, ed è compito dell’ interprete stabilire – anche in base ai principi in tema di buona fede nella conclusione, nell’interpretazione e nell’esecuzione del contratto (art. 1337, 1366 e 1375 cod. civ.) – se una determinata attività preparatoria o accessoria sia da ritenere compresa nella prestazione dovuta, pur se non espressamente menzionata, perché ordinariamente richiesta o comunque strumentale al perseguimento dello scopo dichiarato: in particolar modo quando la relativa omissione vanifichi l’utilità della prestazione principale”.<\/p> <p style=\"text-align: justify;\"> <p>The post <a href=\"http:\/\/www.parereavvocato.com\/2013\/11\/12\/danno-da-vacanza-rovinata\/\">Danno da vacanza rovinata<\/a> appeared first on <a href=\"http:\/\/www.parereavvocato.com\">Parereavvocato.com<\/a>.<\/p>","datetime":1384291683,"description":"Il danno da vacanza rovinata è stato genericamente definito come quel danno discendente dalla mancata realizzazione del fine di diletto connesso al compimento di un viaggio organizzato; o, più precisamente, come il danno derivante dall’emotional distress che ha origine dal disagio e dall’afflizione, conseguenti le situazioni sgradevoli idonee a rovinare occasioni che dovrebbero essere di svago e di relax. La […] The post Danno da vacanza rovinata appeared first on Parereavvocato.com .","descriptionWithHtml":"<p>Il danno da vacanza rovinata è stato genericamente definito come quel danno discendente dalla mancata realizzazione del fine di diletto connesso al compimento di un viaggio organizzato; o, più precisamente, come il danno derivante dall’emotional distress che ha origine dal disagio e dall’afflizione, conseguenti le situazioni sgradevoli idonee a rovinare occasioni che dovrebbero essere di svago e di relax. La […]<\/p><p>The post <a href=\"http:\/\/www.parereavvocato.com\/2013\/11\/12\/danno-da-vacanza-rovinata\/\">Danno da vacanza rovinata<\/a> appeared first on <a href=\"http:\/\/www.parereavvocato.com\">Parereavvocato.com<\/a>.<\/p>","geo":null,"id":"http:\/\/www.parereavvocato.com\/?p=1617","imageUrl":null,"link":"http:\/\/www.parereavvocato.com\/2013\/11\/12\/danno-da-vacanza-rovinata\/?noredirect=1#noredirect","socialInfo":{"imageUrl":null,"shortDesc":"Il danno da vacanza rovinata è stato genericamente definito come quel danno discendente dalla mancata realizzazione del fine di diletto connesso al compimento di un viaggio organizzato; o, più precisamente, come il danno derivante dall’emotional distress che ha origine dal disagio e dall’afflizione, conseguenti le situazioni sgradevoli idonee a rovinare occasioni che dovrebbero essere di svago e di relax. La […] The post Danno da vacanza rovinata appeared first on Parereavvocato.com .","socialId":"Feeds:http:\/\/www.parereavvocato.com\/2013\/11\/12\/danno-da-vacanza-rovinata\/#noredirect","title":"Danno da vacanza rovinata","url":"http:\/\/www.parereavvocato.com\/2013\/11\/12\/danno-da-vacanza-rovinata\/#noredirect"},"title":"Danno da vacanza rovinata"},{"contentImageUrl":null,"contentWithHtml":"<h2 style=\"text-align: justify;\"><strong>Notifica atti tributari un tema scottante e quotidiano.<\/strong><\/h2> <p style=\"text-align: justify;\">La Corte di Cassazione sez. tributaria con la sentenza n. 16696 del 03 luglio 2013 intervenendo in tema di deposito di atti impositivi afferma che il mancato invio della raccomandata A\/R di comunicazione del deposito dell’avviso di accertamento presso la casa comunale rende legittima la notifica <span style=\"text-decoration: underline;\"><strong>soltanto in ipotesi di irreperibilità assoluta, ossia quando il trasferimento del domicilio sia avvenuto fuori dal Comune del precedente domicilio.<\/strong><\/span><\/p> <p style=\"text-align: justify;\">Pertanto alla luce della sentenza in esame vanno osservate due distinte procedure nelle diverse ipotesi di notifica di atti di accertamento al contribuente: l’una è prevista in caso di assenza del destinatario ovvero di irreperibilità relativa, l’altra in caso di irreperibilità assoluta.<\/p> <h3 style=\"text-align: justify;\"><strong>QUALE ORIENTAMENTO ASSUME LA S.C. DI CASSAZIONE IN TEMA DI NOTIFICA ATTI TRIBUTARI<\/strong><\/h3> <p style=\"text-align: justify;\">Nella notifica atti tributari di accertamento ha evidenziato la Suprema Corte il combinato disposto degli artt. 137 e 140 epe nonché 60 comma 1° lettera c) del dpr n. 600\/1973, è stato costantemente interpretato, nel senso che, se il destinatario dell’atto di accertamento è temporaneamente assente dal suo domicilio fiscale e se non è possibile consegnare l’atto per irreperibilità, incapacità o rifiuto delle persone legittimate alla ricezione (cioè nel caso di irreperibilità ed. “relativa” di cui all’art.140 epe), la notifica si perfeziona con il compimento delle attività stabilite dall’art. 140 cpc, richiamato del primo comma lettera e) dell’art.60 del dpr n.600\/1973.<\/p> <p>The post <a href=\"http:\/\/www.parereavvocato.com\/2013\/11\/12\/notifica-atti-tributari\/\">Notifica atti tributari accertamento e relative nullità<\/a> appeared first on <a href=\"http:\/\/www.parereavvocato.com\">Parereavvocato.com<\/a>.<\/p>","datetime":1384275142,"description":"Notifica atti tributari un tema scottante e quotidiano. La Corte di Cassazione sez. tributaria con la sentenza n. 16696 del 03 luglio 2013 intervenendo in tema di deposito di atti impositivi afferma che il mancato invio della raccomandata A\/R di comunicazione del deposito dell’avviso di accertamento presso la casa comunale rende legittima la notifica soltanto […] The post Notifica atti tributari accertamento e relative nullità appeared first on Parereavvocato.com .","descriptionWithHtml":"<p>Notifica atti tributari un tema scottante e quotidiano. La Corte di Cassazione sez. tributaria con la sentenza n. 16696 del 03 luglio 2013 intervenendo in tema di deposito di atti impositivi afferma che il mancato invio della raccomandata A\/R di comunicazione del deposito dell’avviso di accertamento presso la casa comunale rende legittima la notifica soltanto […]<\/p><p>The post <a href=\"http:\/\/www.parereavvocato.com\/2013\/11\/12\/notifica-atti-tributari\/\">Notifica atti tributari accertamento e relative nullità<\/a> appeared first on <a href=\"http:\/\/www.parereavvocato.com\">Parereavvocato.com<\/a>.<\/p>","geo":null,"id":"http:\/\/www.parereavvocato.com\/?p=1614","imageUrl":null,"link":"http:\/\/www.parereavvocato.com\/2013\/11\/12\/notifica-atti-tributari\/?noredirect=1#noredirect","socialInfo":{"imageUrl":null,"shortDesc":"Notifica atti tributari un tema scottante e quotidiano. La Corte di Cassazione sez. tributaria con la sentenza n. 16696 del 03 luglio 2013 intervenendo in tema di deposito di atti impositivi afferma che il mancato invio della raccomandata A\/R di comunicazione del deposito dell’avviso di accertamento presso la casa comunale rende legittima la notifica soltanto […] The post Notifica atti tributari accertamento e relative nullità appeared first on Parereavvocato.com .","socialId":"Feeds:http:\/\/www.parereavvocato.com\/2013\/11\/12\/notifica-atti-tributari\/#noredirect","title":"Notifica atti tributari accertamento e relative nullità","url":"http:\/\/www.parereavvocato.com\/2013\/11\/12\/notifica-atti-tributari\/#noredirect"},"title":"Notifica atti tributari accertamento e relative nullità"},{"contentImageUrl":null,"contentWithHtml":"<p style=\"text-align: justify;\"><span style=\"text-decoration: underline;\"><strong>Unicredit crollo utili.<\/strong><\/span><\/p> <p style=\"text-align: justify;\">La banca Italiana ha chiuso i primi nove mesi dell’anno con l’utile netto di gruppo pari a 1 miliardo di euro, in calo del 28,5% rispetto al corrispondente periodo del 2012 e trainato dalla divisione centro-est Europa e Polonia, che ha registrato un utile di 578 milioni nel terzo trimestre, oltre che dall’andamento della divisione corporate e investment banking (utile trimestrale di 361 milioni).<\/p> <p>Mentre i ricavi sono diminuiti del 7,1% a 18,2 miliardi, anche i costi operativi sono scesi del 2,2% a 11 miliardi. Di conseguenza il rapporto costi\/ricavi è peggiorato al 60,6% (+3 punti percentuali) mentre il margine operativo lordo i è attestato a 7,2 miliardi (-13,8%). Nel periodo gennaio settembre, Unicredit ha provveduto ad accantonamenti complessivi per 4,4 miliardi in calo dell’8,7% annuo.<\/p> <p>Per quanto riguarda gli indici patrimoniali, il Core Tier 1 ratio si è attestato all’11,71% dall’11,41% di fine giugno e il Cet 1 ratio al 9,83%. Le operazioni di cessione del 6,7% di FonSai e dell’intera quota detenuta nel Moscow Exchange (5,7%) hanno generato per Unicredit una plusvalenza complessiva di circa 160 milioni di euro al netto delle imposte, con un aumento di circa 5 punti base del Core Tier 1 ratio che sarà contabilizzata il prossimo trimestre (in cui l’indice dovrebbe quindi salire all’11,76%).<\/p> <p>Unicredit ritiene inoltre che l’imminente rivalutazione delle quote partecipative di Bankitalia (di cui l’istituto di credito detiene poco piú del 20%) potrebbe comportare un miglioramento del Core Tier 1 di gruppo in una forchetta tra 15 a 20 punti base assumendo la stima tra 5 e 7,5 miliardi. Il dg della banca, Roberto Nicastro, ha tuttavia sottolineato che la stima è assolutamente preliminare, poiché “ci sono tante cose da definire prima di arrivare alla determinazione vera e propria” della rivalutazione.<\/p> <p>Nel solo terzo trimestre la banca ha invece conseguito un utile netto in diminuzione a 204 milioni (-39,1%) in linea al consenso posto a 204 milioni mentre i ricavi sono scesi a 5,7 miliardi dell’8,5%. I costi operativi di periodo sono diminuiti del 3% a 3,6 miliardi e il rapporto con i ricavi e salito di 3,6 punti percentuali al 63,1%. Il margine operativo lordo è inoltre calato del 16,7% a 2,1 miliardi, mentre gli accantonamenti sui crediti sono diminuiti del 10,6% a 1,6 miliardi.<\/p> <h3 style=\"text-align: justify;\"><span style=\"text-decoration: underline;\"><strong>COSA DICHIARATO DAI VERTICI IN MERITO AD UNICREDIT CROLLO UTILI<\/strong><\/span><\/h3> <p style=\"text-align: justify;\">“Ritengo importante che la banca abbia conseguito un risultato netto positivo anche in un terzo trimestre particolarmente impegnativo, non solo per gli effetti della stagionalità”, ha commentato l’ad di Unicredit, Fedrico Ghizzoni, secondo il quale si comincia a intravedere qualche primo incoraggiante segnale di ripresa anche in Italia dove però il commercial bank ha riportato nei primi nove mesi dell’anno una perdita netta di 165 milioni appesantita da accantonamenti su crediti per 1,1 miliardi.<\/p> <p>“L’impegno di Unicredit per sostenere e accompagnare l’economia reale nei prossimi mesi, in Italia e in Europa, resta un punto fermo”, ha osservato il numero uno di Porta Garibaldi aggiungendo che i flussi netti dei crediti deteriorati si vanno stabilizzando in tutte le principali aree in cui Unicredit opera così come il coverage ratio. Riguardo all’asset quality review della Bce, infine, Ghizzoni è tornato a sottolineare “la necessità di un esame severo e con regole finalmente uguali per tutti, nell’interesse degli operatori, dei clienti e della fiducia dei mercati”.<\/p> <p>Sempre in tema di Bce, all’inizio di novembre Unicredit ha rimborsato un ulteriore miliardo di euro dei 26,1 miliardi complessivi (scadenza 2015) presi a prestito dagli Ltro avvenuti tra dicembre 2011 e gennaio 2012. Il totale restituito da inizio anno è quindi salito a tre miliardi e il totale da rimborsare scende pertanto a 23 miliardi. “In futuro”, ha spiegato l’istituto di credito, “Unicredit valuterà l’opportunità di procedere a ulteriori rimborsi anticipati dei fondi Ltro, tenendo conti di diversi fattori, tra cui le condizioni del mercato”.<\/p> <p>“Sul dividendo come al solito io mi pronuncio solo alla fine dell’anno. Stiamo accantonando per un dividendo pari allo scorso anno, come sempre, salvo poi verificare cosa si può fare in base ai risultati di fine anno”, ha concluso Ghizzoni.<\/p> <p>The post <a href=\"http:\/\/www.parereavvocato.com\/2013\/11\/12\/unicredit-crollo-utili\/\">Unicredit crollo utili<\/a> appeared first on <a href=\"http:\/\/www.parereavvocato.com\">Parereavvocato.com<\/a>.<\/p>","datetime":1384274197,"description":"Unicredit crollo utili. La banca Italiana ha chiuso i primi nove mesi dell’anno con l’utile netto di gruppo pari a 1 miliardo di euro, in calo del 28,5% rispetto al corrispondente periodo del 2012 e trainato dalla divisione centro-est Europa e Polonia, che ha registrato un utile di 578 milioni nel terzo trimestre, oltre che […] The post Unicredit crollo utili appeared first on Parereavvocato.com .","descriptionWithHtml":"<p>Unicredit crollo utili. La banca Italiana ha chiuso i primi nove mesi dell’anno con l’utile netto di gruppo pari a 1 miliardo di euro, in calo del 28,5% rispetto al corrispondente periodo del 2012 e trainato dalla divisione centro-est Europa e Polonia, che ha registrato un utile di 578 milioni nel terzo trimestre, oltre che […]<\/p><p>The post <a href=\"http:\/\/www.parereavvocato.com\/2013\/11\/12\/unicredit-crollo-utili\/\">Unicredit crollo utili<\/a> appeared first on <a href=\"http:\/\/www.parereavvocato.com\">Parereavvocato.com<\/a>.<\/p>","geo":null,"id":"http:\/\/www.parereavvocato.com\/?p=1610","imageUrl":null,"link":"http:\/\/www.parereavvocato.com\/2013\/11\/12\/unicredit-crollo-utili\/?noredirect=1#noredirect","socialInfo":{"imageUrl":null,"shortDesc":"Unicredit crollo utili. La banca Italiana ha chiuso i primi nove mesi dell’anno con l’utile netto di gruppo pari a 1 miliardo di euro, in calo del 28,5% rispetto al corrispondente periodo del 2012 e trainato dalla divisione centro-est Europa e Polonia, che ha registrato un utile di 578 milioni nel terzo trimestre, oltre che […] The post Unicredit crollo utili appeared first on Parereavvocato.com .","socialId":"Feeds:http:\/\/www.parereavvocato.com\/2013\/11\/12\/unicredit-crollo-utili\/#noredirect","title":"Unicredit crollo utili","url":"http:\/\/www.parereavvocato.com\/2013\/11\/12\/unicredit-crollo-utili\/#noredirect"},"title":"Unicredit crollo utili"},{"contentImageUrl":null,"contentWithHtml":"<h2 style=\"text-align: justify;\">Società solide ed a ottimo rendimento secondo gli analisti Morgan Stanley<\/h2> <p style=\"text-align: justify;\">Rendimento dividendo azionario e solidità patrimoniale, secondo gli esperti della banca d’affari Usa, una valida garanzia in merito al buon anadamento ed allo stato di bilacio positivo di un’azienda Ecco dieci società selezionate in base a questo criterio sarebbero in grado di offrire dividendi in crescita per gli azionisti od investirori.<\/p> <p style=\"text-align: justify;\"><strong>1) Nokian Renkaat <\/strong>Il gruppo finlandese del settore pneumatici ha un dividend yield, stimato per l’esercizio 2013, del 4,7%, con un dividendo in crescita annua (cagr) dal 2012 al 2015 del 14,9%, a fronte di un rapporto di indebitamento negativo (-0,1). Il titolo ha registrato una performance (rispetto all’indice Msci Europe) negativa a sei (-2,3%) e 12 mesi (-4,5%). L’utile per azione (eps) è previsto in aumento del 3,2% nel 2013 e del 12,3% nel 2014.<\/p> <p style=\"text-align: justify;\"><strong>2) Berkeley Grp Hldgs <\/strong>La società inglese che si occupa dello sviluppo di immobili residenziali e commerciali offre un rendimento della cedola, stimato per l’esercizio 2013, del 4,3%, con un dividendo in crescita annua (cagr) dal 2012 al 2015 del 13,3%, a fronte di un rapporto di indebitamento negativo (-0,1). Il titolo ha messo a segno una performance (rispetto all’indice Msci Europe) del 10% a sei e del 28,3% a 12 mesi. L’utile per azione (eps) è previsto in aumento del 20,4% nel 2013 e del 10,4% nel 2014.<\/p> <p style=\"text-align: justify;\"><strong>3) Amec <\/strong>L’operatore Uk che offre servizi di consulenza, engieering e project management nel settore petrolifero, gas e carbone ha un dividend yield, stimato per l’esercizio 2013, del 3,7%, con un dividendo in crescita annua (cagr) dal 2012 al 2015 del 10,3%, a fronte di un rapporto di indebitamento negativo (-0,1). Il titolo evidenzia una performance (rispetto all’indice Msci Europe) negativa a sei (-1,9%) e 12 mesi (-17%). L’utile per azione (eps) è previsto in aumento del 5,6% nel 2013 e dell’11,2% nel 2014.<\/p> <p style=\"text-align: justify;\"><strong>4) Hugo Boss <\/strong>La griffe tedesca dell’abbigliamento offre un rendimento della cedola, stimato per l’esercizio 2013, del 3,7%, con un dividendo in crescita annua (cagr) dal 2012 al 2015 del 12,6%, a fronte di un rapporto di indebitamento pari a 0,1. Il titolo ha registrato una performance (rispetto all’indice Msci Europe) negativa a sei mesi (-1,4%), ma positiva a dodici (3,1%). L’utile per azione (eps) è previsto in aumento del 10,9% nel 2013 e del 15% nel 2014.<\/p> <p style=\"text-align: justify;\"><strong>5) Telenor <\/strong>Il gruppo norvegese di tlc ha un dividend yield, stimato per l’esercizio 2013 del 5,3%, con un dividendo in crescita annua (cagr) dal 2012 al 2015 del 12,3%, a fronte di un rapporto di indebitamento di 0,5. Il titolo ha realizzato una performance (rispetto all’indice Msci Europe) positiva a sei (1,3%) e 12 mesi (9,7%). L’utile per azione (eps) è previsto in aumento del 30,2% nel 2013 e del 10,9% nel 2014.<\/p> <p style=\"text-align: justify;\"><strong>6) BP<\/strong> Il colosso petrolifero inglese offre un rendimento della cedola, stimato per l’esercizio 2013, del 5,3%, con un dividendo in crescita annua (cagr) dal 2012 al 2015 dell’8%, a fronte di un rapporto di indebitamento di 0,2. Il titolo ha accusato una performance (rispetto all’indice Msci Europe) negativa a sei (-6,6%) e 12 mesi (-16,5%). L’utile per azione (eps) è previsto in calo del 12,8% nel 2013, ma in progresso del 16,9% nel 2014.<\/p> <p style=\"text-align: justify;\"><strong>7) Ericsson B <\/strong>Il gigante svedese di information technology ha un dividend yield, stimato per l’esercizio 2013, del 3,8%, con un dividendo in crescita annua (cagr) dal 2012 al 2015 del 7,7%, a fronte di un rapporto di indebitamento negativo (-0,3). Il titolo ha registrato una performance (rispetto all’indice Msci Europe) negativa a sei mesi (-4,4%), ma positiva a dodici (4,3%). L’utile per azione (eps) è previsto in aumento del 47,6% nel 2013 e del 29,3% nel 2014.<\/p> <p><strong>8) Petrofac<\/strong> L’operatore inglese specializzato in soluzioni di engineering per il settore petrolifero e gas, offre un rendimento della cedola, stimato per l’esercizio 2013, del 3,4%, con un dividendo in crescita annua (cagr) dal 2012 al 2015 del 12,7%, a fronte di un rapporto di indebitamento di 0,1. Il titolo evidenzia una performance (rispetto all’indice Msci Europe) negativa a sei (-25,8%) e 12 mesi (-28,8%). L’utile per azione (eps) è previsto in aumento del 7,6% nel 2013 e del 17,4% nel 2014.<\/p> <p style=\"text-align: justify;\"><strong>9) TUI Travel <\/strong>Il gruppo inglese del turismo con sede in Europa e negli Stati Uniti ha un dividend yield stimato per l’esercizio 2013 del 3,6%, con un dividendo in crescita annua (cagr) dal 2012 al 2015 del 9,9%, a fronte di un rapporto di indebitamento pari a zero. Il titolo ha realizzato una performance (rispetto all’indice Msci Europe) del 5,4% a sei mesi e del 45,4% a dodici. L’utile per azione (eps) è previsto in aumento del 13,8% nel 2013 e del 9,1% nel 2014.<\/p> <p style=\"text-align: justify;\"><strong>10) Kuehne & Nagel Int<\/strong> La società elvetica di trasporti e logistica offre un rendimento della cedola, stimato per l’esercizio 2013, del 3,3%, con un dividendo in crescita annua (cagr) dal 2012 al 2015 del 10,9%, a fronte di un rapporto di indebitamento negativo (-0,4). Il titolo ha registrato una performance (rispetto all’indice Msci Europe) positiva a sei mesi (2,1%) ma negativa a dodici (-8,4%). L’utile per azione (eps) è previsto in aumento dell’11,2% nel 2013 e del 12% nel 2014.<\/p> <p>Società solide sulle quali puntare nel mondo dell´investimento azionario con dividendi in crescita.<\/p> <p>The post <a href=\"http:\/\/www.parereavvocato.com\/2013\/11\/12\/societa-solide-ad-ottimo-rendimento-secondo-morgan-stanley\/\">Società solide ad ottimo rendimento secondo Morgan Stanley<\/a> appeared first on <a href=\"http:\/\/www.parereavvocato.com\">Parereavvocato.com<\/a>.<\/p>","datetime":1384273325,"description":"Società solide ed a ottimo rendimento secondo gli analisti Morgan Stanley Rendimento dividendo azionario e solidità patrimoniale, secondo gli esperti della banca d’affari Usa, una valida garanzia in merito al buon anadamento ed allo stato di bilacio positivo di un’azienda Ecco dieci società selezionate in base a questo criterio sarebbero in grado di offrire dividendi in […] The post Società solide ad ottimo rendimento secondo Morgan Stanley appeared first on Parereavvocato.com .","descriptionWithHtml":"<p>Società solide ed a ottimo rendimento secondo gli analisti Morgan Stanley Rendimento dividendo azionario e solidità patrimoniale, secondo gli esperti della banca d’affari Usa, una valida garanzia in merito al buon anadamento ed allo stato di bilacio positivo di un’azienda Ecco dieci società selezionate in base a questo criterio sarebbero in grado di offrire dividendi in […]<\/p><p>The post <a href=\"http:\/\/www.parereavvocato.com\/2013\/11\/12\/societa-solide-ad-ottimo-rendimento-secondo-morgan-stanley\/\">Società solide ad ottimo rendimento secondo Morgan Stanley<\/a> appeared first on <a href=\"http:\/\/www.parereavvocato.com\">Parereavvocato.com<\/a>.<\/p>","geo":null,"id":"http:\/\/www.parereavvocato.com\/?p=1604","imageUrl":null,"link":"http:\/\/www.parereavvocato.com\/2013\/11\/12\/societa-solide-ad-ottimo-rendimento-secondo-morgan-stanley\/?noredirect=1#noredirect","socialInfo":{"imageUrl":null,"shortDesc":"Società solide ed a ottimo rendimento secondo gli analisti Morgan Stanley Rendimento dividendo azionario e solidità patrimoniale, secondo gli esperti della banca d’affari Usa, una valida garanzia in merito al buon anadamento ed allo stato di bilacio positivo di un’azienda Ecco dieci società selezionate in base a questo criterio sarebbero in grado di offrire dividendi in […] The post Società solide ad ottimo rendimento secondo Morgan Stanley appeared first on Parereavvocato.com .","socialId":"Feeds:http:\/\/www.parereavvocato.com\/2013\/11\/12\/societa-solide-ad-ottimo-rendimento-secondo-morgan-stanley\/#noredirect","title":"Società solide ad ottimo rendimento secondo Morgan Stanley","url":"http:\/\/www.parereavvocato.com\/2013\/11\/12\/societa-solide-ad-ottimo-rendimento-secondo-morgan-stanley\/#noredirect"},"title":"Società solide ad ottimo rendimento secondo Morgan Stanley"},{"contentImageUrl":null,"contentWithHtml":"<p style=\"text-align: justify;\"><strong>Preliminare vendita nullo.<\/strong><\/p> <p style=\"text-align: justify;\">Nuova sentenza della Corte di Cassazione in meteria interpretativa. Il preliminare vendita nullo nel caso in cui riguardi un immobile che non sia in regola con le norme urbanistiche.<\/p> <p style=\"text-align: justify;\"><strong>Suprema Corte di Cassazione – Sezione Seconda Civile<\/strong> <strong>Sentenza n. 23591 del 17 ottobre 2013<\/strong> <strong>Presidente R. M. Triola, Relatore I. Parziale<\/strong><\/p> <p style=\"text-align: justify;\">La Suprema Corte di Cassazione, con la sentenza che si riporta, ha affermato un importante principio di diritto in materia di contratto preliminare avente ad oggetto la vendita di um immobile irregolare dal punto di vista urbanistico ritenendo il preliminare di vendita nullo.<\/p> <p style=\"text-align: justify;\">Socondo quanto hanno affermato i giudici della seconda sezione civile della suprema corte di cassazione, il suddetto preliminare è nullo perchè contrario alla legge poichè si riferisce a una questione che non può trovare rimedio nella disciplina dell’inadempimento.<\/p> <p> <\/p> <p>The post <a href=\"http:\/\/www.parereavvocato.com\/2013\/11\/12\/preliminare-vendita-nullo-immobile-viola-leggi-urbanistica\/\">Preliminare vendita nullo immobile viola leggi urbanistica<\/a> appeared first on <a href=\"http:\/\/www.parereavvocato.com\">Parereavvocato.com<\/a>.<\/p>","datetime":1384267089,"description":"Preliminare vendita nullo. Nuova sentenza della Corte di Cassazione in meteria interpretativa. Il preliminare vendita nullo nel caso in cui riguardi un immobile che non sia in regola con le norme urbanistiche. Suprema Corte di Cassazione – Sezione Seconda Civile Sentenza n. 23591 del 17 ottobre 2013 Presidente R. M. Triola, Relatore I. Parziale La […] The post Preliminare vendita nullo immobile viola leggi urbanistica appeared first on Parereavvocato.com .","descriptionWithHtml":"<p>Preliminare vendita nullo. Nuova sentenza della Corte di Cassazione in meteria interpretativa. Il preliminare vendita nullo nel caso in cui riguardi un immobile che non sia in regola con le norme urbanistiche. Suprema Corte di Cassazione – Sezione Seconda Civile Sentenza n. 23591 del 17 ottobre 2013 Presidente R. M. Triola, Relatore I. Parziale La […]<\/p><p>The post <a href=\"http:\/\/www.parereavvocato.com\/2013\/11\/12\/preliminare-vendita-nullo-immobile-viola-leggi-urbanistica\/\">Preliminare vendita nullo immobile viola leggi urbanistica<\/a> appeared first on <a href=\"http:\/\/www.parereavvocato.com\">Parereavvocato.com<\/a>.<\/p>","geo":null,"id":"http:\/\/www.parereavvocato.com\/?p=1600","imageUrl":null,"link":"http:\/\/www.parereavvocato.com\/2013\/11\/12\/preliminare-vendita-nullo-immobile-viola-leggi-urbanistica\/?noredirect=1#noredirect","socialInfo":{"imageUrl":null,"shortDesc":"Preliminare vendita nullo. Nuova sentenza della Corte di Cassazione in meteria interpretativa. Il preliminare vendita nullo nel caso in cui riguardi un immobile che non sia in regola con le norme urbanistiche. Suprema Corte di Cassazione – Sezione Seconda Civile Sentenza n. 23591 del 17 ottobre 2013 Presidente R. M. Triola, Relatore I. Parziale La […] The post Preliminare vendita nullo immobile viola leggi urbanistica appeared first on Parereavvocato.com .","socialId":"Feeds:http:\/\/www.parereavvocato.com\/2013\/11\/12\/preliminare-vendita-nullo-immobile-viola-leggi-urbanistica\/#noredirect","title":"Preliminare vendita nullo immobile viola leggi urbanistica","url":"http:\/\/www.parereavvocato.com\/2013\/11\/12\/preliminare-vendita-nullo-immobile-viola-leggi-urbanistica\/#noredirect"},"title":"Preliminare vendita nullo immobile viola leggi urbanistica"},{"contentImageUrl":null,"contentWithHtml":"<p style=\"text-align: justify;\">Nessuna lesione del diritto alla privacy del soggetto che durante un servizio Rai sul “gaypride” viene ripreso mentre si trova alla stazione ferroviaria di Milano, luogo di partenza di molti manifestanti. Lo ha stabilito la Corte di cassazione, con la sentenza 24110\/2013, respingendo il ricorso di un uomo di 60 anni contro la sentenza della Corte di appello di Roma che in riforma della pronuncia di primo grado aveva rigettato la domanda risarcitoria ordinando la restituzione dei 20mila euro ottenuti con la prima pronuncia.<\/p> <p style=\"text-align: justify;\">L’uomo sosteneva di non esser andato al GayPride e ha chiesto alla Rai di essere risarcito.<\/p> <p style=\"text-align: justify;\">L’assenza di consenso, secondo quanto affermato dagli ermellini, è giustificato perchè il Gaypride è una manifestazione di “rilevanza mediatica” e, pertanto, in momenti come questo sono del tutto lecite e giustificate le riprese che “si ricolleghino in modo inequivocabile” all’evento.<\/p> <p style=\"text-align: justify;\">I Giudici continuano spiegando che “un evento come il gay pride, unitamente al costume sessuale che esso rappresenta, è in sè del tutto lecito e privo di qualsivoglia profilo di intrinseca negatività, come invece sembra adombrare il ricorrente, laddove evoca l’onore e il decoro”.<\/p> <p style=\"text-align: justify;\">Nel primo grado di giudizio veniva riconosciuto al ricorrente un risarcimento di 20 mila euro ma in sede d’Appello era stato condannato a restituire la somma unitamente ai 9 mila euro di interessi maturati.<\/p> <p style=\"text-align: justify;\">La decisione della Corte d’Appello di Roma è stata condivisa anche da Piazza Cavour che ha osservato che chi si reca “in una stazione, anche solo di passaggio, o per prendere un treno o per svolgere proprie incombenze private deve accettare il rischio di poter essere astrattamente individuato nella folla dei passeggeri” e ciò rientra “se così può dirsi, tra i rischi della vita che non ci si può esimere dall’accettare”.<\/p> <p style=\"text-align: justify;\">La Corte ha inoltre condannato l’uomo al pagamento di 4 mila euro per le spese di giudizio.<\/p> <p>Svolgimento del processo<\/p> <p style=\"text-align: justify;\">1. Con sentenza del 28 gennaio 2004 il Tribunale di Roma, accogliendo in parte la domanda avanzata da E.C., condannava la RAI – Radiotelevisione italiana s.p.a. a pagare all’attore la somma di euro 20.658,28, col carico delle spese, a titolo di risarcimento danni per la divulgazione non autorizzata della sua immagine – ripresa nell’ambito della partenza dalla Stazione centrale di Milano di numerosi partecipanti alla manifestazione nota come gay pride, tenutasi a Roma nel giugno 2000 – messa in onda nel corso della trasmissione televisiva Sciuscià del 13 luglio 2000.<\/p> <p style=\"text-align: justify;\">2. Avverso la sentenza di primo grado proponeva appello principale la società soccombente ed appello incidentale il C. e la Corte d’appello di Roma, con sentenza del 30 luglio 2007, in riforma di quella del Tribunale, accoglieva l’appello principale, respingeva quello incidentale, rigettava le domande risarcitorie avanzate dal C. che contestualmente condannava alla restituzione della somma di euro 29.126,32, e compensava integralmente le spese del doppio grado di giudizio.<\/p> <p style=\"text-align: justify;\">Osservava la Corte territoriale che non era stata dimostrata la corrispondenza tra la persona fisica del C., identificata tramite la fotografia prodotta in atti, e quella oggetto della ripresa televisiva in contestazione.<\/p> <p style=\"text-align: justify;\">Ciò premesso, la Corte rilevava che il gay pride costituiva un evento pubblico di sicura risonanza mediatica, in relazione al quale era stato legittimamente esercitato dalla RAI il diritto di cronaca. Oltre a ciò, anche volendo ammettere che il C. fosse stato tra le persone oggetto della ripresa televisiva, era certo che egli non era facilmente individuabile «tra la folla anonima dei passeggeri della stazione», i quali facevano «solo da sfondo generico al servizio televisivo di cui trattasi». A tali considerazioni andava poi aggiunto che non c’era alcuna prova che il C., una volta accortosi della ripresa filmata, avesse immediatamente espresso il suo dissenso alla divulgazione.<\/p> <p style=\"text-align: justify;\">3. Avverso la sentenza della Corte d’appello di Roma propone ricorso per cassazione il C., con atto contenente quattro motivi.<\/p> <p style=\"text-align: justify;\">Resiste la RAI – Radiotelevisione italiana s.p.a. con controricorso.<\/p> <p style=\"text-align: justify;\">Il C. ha presentato memoria.<\/p> <p style=\"text-align: justify;\">Motivi della decisione<\/p> <p style=\"text-align: justify;\">1. Conviene procedere all’esame del ricorso, per ragioni di economia processuale, cominciando dal secondo e dal terzo motivo, i quali vanno trattati congiuntamente, per poi esaminare il quarto.<\/p> <p style=\"text-align: justify;\">2. Col secondo motivo di ricorso si lamenta, ai sensi dell’art. 360, primo comma, n. 3) e n. 5), cod. proc. civ., violazione e falsa applicazione dell’art. 97, primo comma, della legge 22 aprile 1941, n. 633, oltre ad omessa e insufficiente motivazione su un punto decisivo della controversia.<\/p> <p style=\"text-align: justify;\">Il ricorrente rileva che la sentenza impugnata ha affermato la natura di evento di rilevanza mediatica del gay pride, in tal modo giustificando la mancanza del consenso del C. alla divulgazione della propria immagine. Tale aspetto non sarebbe stato motivato a sufficienza: la Corte di merito, infatti, avrebbe dovuto specificare le ragioni per le quali, anche ammettendo la natura di evento pubblico del gay pride, tale connotato potesse essere esteso alle riprese avvenute alla stazione di Milano, luogo estraneo alla manifestazione; la previsione dell’art. 97 citato, infatti, presuppone il collegamento tra l’interesse pubblico e la vicenda oggetto di divulgazione, caratteristica che non poteva riguardare, invece, il semplice radunarsi di una folla di persone in partenza da Milano per Roma.<\/p> <p style=\"text-align: justify;\">3. Col terzo motivo di ricorso si lamenta, ai sensi dell’art. 360, primo comma, n. 3) e n. 5), cod. proc. civ., violazione e falsa applicazione dell’art. 96 della legge n. 633 del 1941, oltre ad omessa ed insufficiente motivazione su di un punto decisivo della controversia.<\/p> <p style=\"text-align: justify;\">Si rileva, in proposito, che la Corte d’appello avrebbe errato nell’affermare che il soggetto che sia stato ripreso da una troupe televisiva debba provare in giudizio di aver manifestato il proprio dissenso alla ripresa medesima. La ripresa televisiva, infatti, a differenza di quella prevista dal citato art. 96, può avvenire anche senza che l’interessato ne abbia alcuna consapevolezza; la sentenza – confondendo, secondo il ricorrente, la riproduzione di cui al citato art. 96 con la ripresa televisiva – non offrirebbe un’adeguata motivazione su questo aspetto.<\/p> <p style=\"text-align: justify;\">4. Entrambi i motivi sono privi di fondamento.<\/p> <p style=\"text-align: justify;\">4.1. La sentenza impugnata si basa su alcuni rilievi che questa Corte ritiene opportuno richiamare: da un lato, la mancata identificazione del C., la cui presenza nella stazione di Milano – ammesso che di lui si trattasse – non era facilmente individuabile «tra la folla anonima dei passeggeri della stazione»; e, dall’altro, il carattere pubblico della manifestazione del gay pride, la cui rilevanza mediatica ne giustificava la divulgazione attraverso il mezzo televisivo, eventualmente anche in violazione del diritto alla riproduzione dell’immagine tutelato dall’art. 97, primo comma, della legge n. 633 del 1941.<\/p> <p style=\"text-align: justify;\">Costituisce affermazione più volte ribadita dalla giurisprudenza di questa Corte – alla quale si intende dare continuità nella pronuncia odierna – il fatto che l’esposizione o la pubblicazione dell’immagine altrui non può considerarsi abusiva quando si ricolleghi a fatti, avvenimenti o cerimonie di interesse pubblico o svoltisi in pubblico, in conformità a quanto disposto dal menzionato art. 97, primo comma, della legge n. 633 del 1941 (sentenza 29 settembre 2006, n. 21172, e 11 maggio 2010, n. 11393). Ciò che occorre valutare, quindi, è se – una volta ammessa, senza sostanziali contestazioni da parte del ricorrente, la natura di evento di rilevanza pubblica in relazione alla manifestazione del gay pride tenutasi a Roma nel giugno 2000 – la medesima natura possa essere riconosciuta anche al momento precedente costituito dal radunarsi dei partecipanti alla stazione di Milano allo scopo di prendere il treno per Roma, per prendere parte alla manifestazione stessa.<\/p> <p style=\"text-align: justify;\">È opinione di questo Collegio che il concetto di avvenimento o cerimonia di interesse pubblico non possa essere inteso in senso così restrittivo da escludere tutto ciò che non attiene in via immediata e diretta con l’evento stesso; in altre parole, la cerimonia o l’avvenimento non sono soltanto l’evento assunto nella sua limitata dimensione spazio-temporale, dovendosi ritenere ricompresi nella previsione legislativa anche quegli episodi che, pur non integrando in sé l’evento, al medesimo si ricolleghino in modo inequivocabile. Nella specie, pur svolgendosi la manifestazione in questione nella città di Roma, il radunarsi nella stazione centrale di Milano di una folla di persone pronte a partire per Roma allo scopo di partecipare all’evento indicato costituisce, data l’evidenza e l’immediatezza del collegamento, un fatto di rilevanza mediatica che integra gli estremi di cui all’art. 97, primo comma, della legge n. 633 del 1941, legittimando la riproduzione dell’immagine anche in assenza del consenso della persona interessata.<\/p> <p style=\"text-align: justify;\">Ciò conduce a respingere la censura di violazione di legge di cui al secondo motivo di ricorso. Quanto al presunto vizio di motivazione, poi, il riconoscimento della natura di evento di rilevanza pubblica in ordine al raduno alla stazione di Milano toglie ogni fondamento alla censura; la sentenza, con motivazione in fatto correttamente argomentata e, perciò, insindacabile in questa sede, ha riconosciuto che la ripresa televisiva riguardava una folla «anonima», mentre perde rilievo il fatto che la ripresa sia stata il frutto – come si prospetta nel ricorso – di una «scelta di riproduzione».<\/p> <p style=\"text-align: justify;\">4.2. Il rigetto del secondo motivo conduce al conseguente rigetto anche del terzo. Alla luce dei precedenti rilievi, infatti, non ha alcun fondamento la censura ivi prospettata, la quale è centrata sul problema della mancanza del consenso alla diffusione della propria immagine o, meglio, della impossibilità per il C. di manifestare il proprio dissenso.<\/p> <p style=\"text-align: justify;\">Una volta riconosciuta la valenza di evento mediatico anche al raduno della folla all’interno della stazione di Milano, ogni presunta lesione dell’art. 96 della legge n. 633 del 1941 viene a cadere, dovendosi ricomprendere l’episodio nell’ambito del successivo art. 97, primo comma, sicché non riveste alcun interesse il profilo della mancanza del consenso.<\/p> <p style=\"text-align: justify;\">5. Col quarto motivo di ricorso si lamenta, ai sensi dell’art. 360, primo comma, n. 3) e n. 5), cod. proc. civ., violazione e falsa applicazione dell’art. 112 cod. proc. civ. e dell’art. 97 della legge n. 633 del 1941, oltre ad omessa ed insufficiente motivazione su di un punto decisivo della controversia.<\/p> <p style=\"text-align: justify;\">Rileva il ricorrente che, a norma dell’art. 97, secondo comma, della legge n. 633 del 1941, l’immagine della persona non può essere esposta o messa in commercio quando da tale evento derivi pregiudizio all’onore o al decoro della medesima. Il C. dichiara di aver chiesto alla Corte d’appello nella comparsa di risposta, richiamando la domanda formulata in primo grado, di pronunciarsi sull’illegittimità della diffusione della sua immagine, in quanto inserita in un contesto che gli è estraneo. Anche ammettendo, infatti, che il gay pride fosse un evento di rilevanza pubblica, è noto che in manifestazioni del genere i partecipanti sono soliti esibire i loro costumi sessuali in modo plateale e volutamente esagerato; la ripresa televisiva oggetto di causa, pertanto, avrebbe collocato abusivamente l’immagine del ricorrente in un contesto che esprime un costume ed un’identità che a lui non appartengono; ma su tale aspetto della vicenda il giudice di merito avrebbe completamente omesso di pronunciarsi.<\/p> <p style=\"text-align: justify;\">5.1. Il motivo non è fondato.<\/p> <p style=\"text-align: justify;\">Anche volendo prescindere dalla formale inesattezza della prospettazione del vizio di omessa pronuncia senza il richiamo all’art. 360, primo comma, n. 4), cod. proc. civ., è decisivo – sulla base di quanto si è detto riguardo ai motivi già esaminati – che la Corte d’appello non è affatto incorsa in un’omissione, avendo nella sostanza affrontato il problema posto dal ricorrente.<\/p> <p style=\"text-align: justify;\">È pacifico che la sussistenza di un interesse pubblico alla divulgazione dell’immagine (art. 97, primo comma, cit.) non esclude che tale diffusione possa essere ugualmente lesiva dell’onore e del decoro della persona (art. 97, secondo comma) e, pertanto, dare luogo ad una pretesa risarcitoria. Ma la sentenza motiva sul punto, con un accertamento di fatto non più sindacabile in questa sede; essa – come si è detto – rileva che, ammesso (e non concesso) che il C. sia stato colto dalla ripresa televisiva poi mandata in onda, egli è stato ripreso per brevissimo tempo in mezzo ad una folla anonima di passeggeri, la quale faceva solo da «generico sfondo» del contestato servizio televisivo. È rimasto del tutto indimostrato, in altri termini, che la ripresa televisiva ove pure abbia avuto per destinatario anche il ricorrente – sia avvenuta con modalità lesive della sua dignità e\/o sia stata associata ad un evento e ad un costume sessuale a lui estraneo.<\/p> <p style=\"text-align: justify;\">È appena il caso di rilevare, inoltre, che un evento come il gay pride, unitamente al costume sessuale che esso rappresenta, è in sé del tutto lecito e privo di qualsivoglia profilo di intrinseca negatività, come invece sembra adombrare il ricorrente, sia pure tra le righe dell’odierna impugnazione, laddove evoca l’onore ed il decoro della persona. In ogni caso, questo aspetto della vicenda rimane del tutto estraneo all’odierna pronuncia, in quanto non oggetto di giudizio.<\/p> <p style=\"text-align: justify;\">D’altra parte, se il C. avesse preso parte attivamente alla manifestazione – nel senso che anch’egli era fra coloro i quali stavano partendo per Roma – non potrebbe comunque dolersi della ripresa televisiva. Se, invece, egli – come traspare dalla sentenza della Corte romana in modo abbastanza chiaro – si trovava casualmente all’interno della stazione di Milano, senza alcun contatto con i manifestanti, è evidente che l’eventuale ripresa televisiva non potrebbe danneggiarlo, non essendo comunque collegabile la sua presenza fisica con la partecipazione alla manifestazione del gay pride.<\/p> <p style=\"text-align: justify;\">Non può farsi a meno di rilevare, infine, che il concetto di riservatezza – inteso come tutela del diritto a non vedere indebitamente diffusa la propria immagine – non può porsi nell’ambito di una stazione ferroviaria negli stessi termini in cui si pone in un contesto privato. Chi si reca in una stazione, anche solo di passaggio, o per prendere un treno o per svolgere proprie incombenze private deve accettare il rischio di poter essere astrattamente individuato nella folla dei passeggeri. E tanto rientra, se così può dirsi, fra i «rischi della vita», che non ci si può esimere dall’accettare.<\/p> <p style=\"text-align: justify;\">Alla luce di tutti questi rilievi, dunque, non sussistono gli estremi idonei a giustificare, ai sensi dell’art. 97, secondo comma, della legge n. 633 del 1941, una qualunque pretesa risarcitoria.<\/p> <p style=\"text-align: justify;\">6. Residuerebbe, a questo punto, l’esame del primo motivo di ricorso, col quale si lamenta, ai sensi dell’art. 360, primo comma, n. 3) e n. 5), cod. proc. civ., violazione e falsa applicazione dell’art. 2712 cod. civ., oltre ad omessa e insufficiente motivazione su un punto decisivo della controversia.<\/p> <p style=\"text-align: justify;\">Rileva la ricorrente che l’art. 2712 cod. civ. dispone che le riproduzioni fotografiche e cinematografiche fanno piena prova di quanto rappresentato se colui contro il quale sono prodotte non ne disconosce la conformità ai fatti o alle cose medesime. La RAI, nel costituirsi in primo grado, non ha disconosciuto la conformità all’originale di quanto documentato mediante fotoriproduzione e videocassetta rappresentanti il C. in foto e nel contesto della stazione di Milano. Tale linea difensiva è stata mantenuta in tutto il giudizio di primo grado, sicché, in assenza di specifiche contestazioni dirette a censurare la non conformità al vero delle prove documentali e fotografiche, sia la fotografia che la ripresa video farebbero, secondo il ricorrente, piena prova di quanto in esse rappresentato.<\/p> <p style=\"text-align: justify;\">6.1. Alla luce dei rilievi precedenti appare a questa Corte che il motivo ora riassunto può ritenersi assorbito dal rigetto dei precedenti, poiché ogni discussione circa l’interpretazione dell’art. 2712 cod. civ. e le modalità del disconoscimento delle fotografie è superato dal riconoscimento della piena legittimità della diffusione dell’immagine.<\/p> <p style=\"text-align: justify;\">7. In conclusione, il ricorso è rigettato.<\/p> <p style=\"text-align: justify;\">A tale esito segue la condanna della parte ricorrente alla rifusione delle spese del giudizio di legittimità, liquidate in conformità ai soli parametri introdotti dal decreto ministeriale 20 luglio 2012, n. 140, sopravvenuto a disciplinare i compensi professionali.<\/p> <p style=\"text-align: justify;\">Il Collegio ritiene opportuno disporre, in relazione alla pubblicazione della presente sentenza, l’oscuramento dei dati sensibili, a tutela della riservatezza del ricorrente.<\/p> <p style=\"text-align: justify;\">P.Q.M.<\/p> <p style=\"text-align: justify;\">La Corte rigetta il ricorso e condanna il ricorrente al pagamento delle spese del giudizio di cassazione, liquidate in complessivi euro 4.000, di cui euro 200 per spese, oltre accessori di legge. Il Collegio dispone l’oscuramento dei dati sensibili.<\/p> <p>The post <a href=\"http:\/\/www.parereavvocato.com\/2013\/11\/12\/diritto-alla-privacy\/\">Diritto alla privacy e Gaypride<\/a> appeared first on <a href=\"http:\/\/www.parereavvocato.com\">Parereavvocato.com<\/a>.<\/p>","datetime":1384211825,"description":"Nessuna lesione del diritto alla privacy del soggetto che durante un servizio Rai sul “gaypride” viene ripreso mentre si trova alla stazione ferroviaria di Milano, luogo di partenza di molti manifestanti. Lo ha stabilito la Corte di cassazione, con la sentenza 24110\/2013, respingendo il ricorso di un uomo di 60 anni contro la sentenza della […] The post Diritto alla privacy e Gaypride appeared first on Parereavvocato.com .","descriptionWithHtml":"<p>Nessuna lesione del diritto alla privacy del soggetto che durante un servizio Rai sul “gaypride” viene ripreso mentre si trova alla stazione ferroviaria di Milano, luogo di partenza di molti manifestanti. Lo ha stabilito la Corte di cassazione, con la sentenza 24110\/2013, respingendo il ricorso di un uomo di 60 anni contro la sentenza della […]<\/p><p>The post <a href=\"http:\/\/www.parereavvocato.com\/2013\/11\/12\/diritto-alla-privacy\/\">Diritto alla privacy e Gaypride<\/a> appeared first on <a href=\"http:\/\/www.parereavvocato.com\">Parereavvocato.com<\/a>.<\/p>","geo":null,"id":"http:\/\/www.parereavvocato.com\/?p=1597","imageUrl":null,"link":"http:\/\/www.parereavvocato.com\/2013\/11\/12\/diritto-alla-privacy\/?noredirect=1#noredirect","socialInfo":{"imageUrl":null,"shortDesc":"Nessuna lesione del diritto alla privacy del soggetto che durante un servizio Rai sul “gaypride” viene ripreso mentre si trova alla stazione ferroviaria di Milano, luogo di partenza di molti manifestanti. Lo ha stabilito la Corte di cassazione, con la sentenza 24110\/2013, respingendo il ricorso di un uomo di 60 anni contro la sentenza della […] The post Diritto alla privacy e Gaypride appeared first on Parereavvocato.com .","socialId":"Feeds:http:\/\/www.parereavvocato.com\/2013\/11\/12\/diritto-alla-privacy\/#noredirect","title":"Diritto alla privacy e Gaypride","url":"http:\/\/www.parereavvocato.com\/2013\/11\/12\/diritto-alla-privacy\/#noredirect"},"title":"Diritto alla privacy e Gaypride"},{"contentImageUrl":null,"contentWithHtml":"<p style=\"text-align: justify;\">Consenso informato e responsabilità del medico<\/p> <p style=\"text-align: justify;\">Con la sentenza 9 maggio – 17 ottobre 2013, n. 42656 in commento la Cassazione ha nuovamente trattato il caso del consenso informato e, nel caso di specie, ha affermato che “la sottoscrizione da parte della paziente del consenso informato, non libera da responsabilità derivante da fatto proprio colposo dell’operatore.”<\/p> <p style=\"text-align: justify;\">Già ne avevamo discusso in occasione della Sentenza del 31 luglio 2013, n. 18341 in cui gli ermellini però, oltre agli aspetti riguardante il consenso informato, si soffermavano principalmente su di un altra questione ovvero il nesso causale tra la condotta del personale medico e i danni subiti e, nell’occasione sostenevano che “non assume rilievo decisivo l’affermazione contenuta nella sentenza impugnata circa l’impossibilità di escludere ”quantomeno il ragionevole dubbio sul collegamento dei gravi danni del bambino alla condotta di quel personale”, non influenzando detta affermazione quelle precedenti della Corte territoriale in ordine alla ritenuta insussistenza della prova del nesso causale;”<\/p> <p style=\"text-align: justify;\">Nella motivazioni della sentenza in esame che riguardano anche il consenso informato si legge “Sostiene ancora il M. di essersi trovato a fronteggiare una situazione di particolare complessità tecnica e che la valutazione della sua responsabilità doveva essere effettuata in coordinamento con l’art. 2236 c.c. che, per le ipotesi di danno provocato dal prestatore d’opera qualora la prestazione richieda la soluzione di problemi tecnici di particolare difficoltà, il prestatore sia tenuto al risarcimento nei soli casi di dolo o colpa grave. Il motivo, peraltro assai genericamente formulato, è infondato, considerato da un lato che è solo una mera enunciazione che il M. si sia trovato a fronteggiare una situazione di particolare complessità tecnica, dall’altro che l’(eventuale) maggiore complessità dell’intervento era stato determinato dalle stesse scelte “inopportune” dell’imputato che, peraltro, come sottolineato dai giudici di appello, aveva proceduto alla estrazione del fibroma ampliando una delle vie di ingresso dei trocar laterali, anziché praticare un taglio sufficiente al passaggio del fibroma sulla linea mediana, due centimetri sopra la sinfisi pubica (dato che una minilaparatomia sarebbe stata comunque meno invasiva, anche esteticamente, di quella poi in concreto resasi necessaria per bloccare l’emorragia) – cfr. p. 9 dell’impugnata sentenza.”<\/p> <p style=\"text-align: justify;\">La Corte continua affermando che “è incontestabile che l’attività medico chirurgica, per essere legittima, presuppone il “consenso” del paziente, che non si identifica con quello di cui all’art. 50 c.p., ma costituisce un presupposto di liceità del trattamento: infatti, il medico, di regola ed al di fuori di taluni casi eccezionali (allorché il paziente non sia in grado per le sue condizioni di prestare un qualsiasi consenso o dissenso, ovvero, più in generale, ove sussistano le condizioni dello stato di necessità di cui all’art. 54 c.p.), non può intervenire senza il consenso o malgrado il dissenso del paziente. In questa prospettiva, il “consenso”, per legittimare il trattamento terapeutico, deve essere “informato”, cioè espresso a seguito di una informazione completa, da parte del medico, dei possibili effetti negativi della terapia o dell’intervento chirurgico, con le possibili controindicazioni e l’indicazione della gravità degli effetti del trattamento. Il consenso informato, infatti, ha come contenuto concreto la facoltà non solo di scegliere tra le diverse possibilità di trattamento medico, ma anche di eventualmente rifiutare la terapia e di decidere consapevolmente di interromperla, in tutte le fasi della vita, anche in quella terminale. Tale conclusione, fondata sul rispetto del diritto del singolo alla salute, tutelato dall’art. 32 Cost.”<\/p> <p style=\"text-align: justify;\">Pertanto, “la mancanza del consenso (opportunamente informato) del malato o la sua invalidità per altre ragioni, determina l’arbitrarietà del trattamento medico-chirurgico e la sua rilevanza penale, in quanto posto in violazione della sfera personale del soggetto e del suo diritto di decidere se permettere interventi estranei sul proprio corpo, ma la valutazione del comportamento del medico, sotto il profilo penale, quando si sia in ipotesi sostanziato in una condotta (vuoi omissiva, vuoi commissiva) dannosa per il paziente, non ammette un diverso apprezzamento a seconda che l’attività sia stata prestata con o in assenza di consenso. Cosicché il giudizio sulla sussistenza della colpa non presenta differenze di sorta a seconda che vi sia stato o no il consenso informato del paziente. Dunque il consenso informato, anche se corretto e adeguato e corrisposto dalla reale ed integrale comprensione del paziente, non vale ad escludere la colpa del medico che abbia operato negligentemente o imperitamente ovvero in violazione delle leges artis. Ne consegue che a nulla rileva ex se, ai fini dell’esclusione della responsabilità, l’eventuale adeguatezza della comunicazione ed illustrazione dei rischi connessi all’intervento al paziente che si risolse, ciononostante, ad affrontarlo (cfr. Sez. 4, n. 4541 del 2013, Falasco (PC) c. Carlino).”<\/p> <p style=\"text-align: justify;\">Il ricorso è stato rigettato e il ricorrente condannato al pagamento delle spese processuali.<\/p> <p style=\"text-align: justify;\"> <p>The post <a href=\"http:\/\/www.parereavvocato.com\/2013\/11\/11\/consenso-informato\/\">Consenso informato e responsabilità medica<\/a> appeared first on <a href=\"http:\/\/www.parereavvocato.com\">Parereavvocato.com<\/a>.<\/p>","datetime":1384209569,"description":"Consenso informato e responsabilità del medico Con la sentenza 9 maggio – 17 ottobre 2013, n. 42656 in commento la Cassazione ha nuovamente trattato il caso del consenso informato e, nel caso di specie, ha affermato che “la sottoscrizione da parte della paziente del consenso informato, non libera da responsabilità derivante da fatto proprio colposo dell’operatore.” […] The post Consenso informato e responsabilità medica appeared first on Parereavvocato.com .","descriptionWithHtml":"<p>Consenso informato e responsabilità del medico Con la sentenza 9 maggio – 17 ottobre 2013, n. 42656 in commento la Cassazione ha nuovamente trattato il caso del consenso informato e, nel caso di specie, ha affermato che “la sottoscrizione da parte della paziente del consenso informato, non libera da responsabilità derivante da fatto proprio colposo dell’operatore.” […]<\/p><p>The post <a href=\"http:\/\/www.parereavvocato.com\/2013\/11\/11\/consenso-informato\/\">Consenso informato e responsabilità medica<\/a> appeared first on <a href=\"http:\/\/www.parereavvocato.com\">Parereavvocato.com<\/a>.<\/p>","geo":null,"id":"http:\/\/www.parereavvocato.com\/?p=1593","imageUrl":null,"link":"http:\/\/www.parereavvocato.com\/2013\/11\/11\/consenso-informato\/?noredirect=1#noredirect","socialInfo":{"imageUrl":null,"shortDesc":"Consenso informato e responsabilità del medico Con la sentenza 9 maggio – 17 ottobre 2013, n. 42656 in commento la Cassazione ha nuovamente trattato il caso del consenso informato e, nel caso di specie, ha affermato che “la sottoscrizione da parte della paziente del consenso informato, non libera da responsabilità derivante da fatto proprio colposo dell’operatore.” […] The post Consenso informato e responsabilità medica appeared first on Parereavvocato.com .","socialId":"Feeds:http:\/\/www.parereavvocato.com\/2013\/11\/11\/consenso-informato\/#noredirect","title":"Consenso informato e responsabilità medica","url":"http:\/\/www.parereavvocato.com\/2013\/11\/11\/consenso-informato\/#noredirect"},"title":"Consenso informato e responsabilità medica"}],"link":"http:\/\/www.parereavvocato.com\/?noredirect=1#noredirect","paging":{"next":"http:\/\/cms.mobile.conduit-services.com\/feed\/10\/?url=http%3a%2f%2fwww.parereavvocato.com%2ffeed%2f&params=%7b%22FeedDomain%22%3anull%2c%22ImageSize%22%3a0%2c%22addGeo%22%3afalse%2c%22disableContentImageUrl%22%3anull%2c%22expiration%22%3anull%2c%22media%22%3afalse%2c%22noCache%22%3anull%2c%22readability%22%3anull%2c%22searchOption%22%3a%7b%22expectedBulkSize%22%3a10%2c%22pageNumber%22%3a2%2c%22previousBulkFirstItemId%22%3a%22http%3a%5c%2f%5c%2fwww.parereavvocato.com%5c%2f%3fp%3d1630%22%2c%22searchMethod%22%3a2%7d%2c%22sort%22%3anull%7d","nextUrl":"http:\/\/cms.mobile.conduit-services.com\/feed\/10\/?url=http%3a%2f%2fwww.parereavvocato.com%2ffeed%2f&params=%7b%22FeedDomain%22%3anull%2c%22ImageSize%22%3a0%2c%22addGeo%22%3afalse%2c%22disableContentImageUrl%22%3anull%2c%22expiration%22%3anull%2c%22media%22%3afalse%2c%22noCache%22%3anull%2c%22readability%22%3anull%2c%22searchOption%22%3a%7b%22expectedBulkSize%22%3a10%2c%22pageNumber%22%3a2%2c%22previousBulkFirstItemId%22%3a%22http%3a%5c%2f%5c%2fwww.parereavvocato.com%5c%2f%3fp%3d1630%22%2c%22searchMethod%22%3a2%7d%2c%22sort%22%3anull%7d"},"title":"Parereavvocato.com","totalItems":10},"maxAge":1800,"serviceUrl":"http:\/\/cms.mobile.conduit-services.com\/feed\/25\/0\/?url=http%3A%2F%2Fwww.parereavvocato.com%2Ffeed%2F&params=%7B%22addGeo%22%3A%22false%22%2C%22expiration%22%3Anull%2C%22sort%22%3Anull%7D"}],"timestamp":1384432741};
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
