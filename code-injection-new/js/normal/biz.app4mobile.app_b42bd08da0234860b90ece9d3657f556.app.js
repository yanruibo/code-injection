

	
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
  	






(new Image()).src = 'app/interface/web/img/ajax-loader.png';




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

var platformEnum={simulator:0,nativeApp:1,webApp:2,gadget:3,playground:4};var deviceTypeEnum={unknown:0,iphone:1<<0,android:1<<1,rim:1<<2,winPhone:1<<3,symbian:1<<4,bada:1<<5};var deviceVariantEnum={"default":0,amazon:1};var storesEnum={appStore:"AppStore",googlePlay:"GooglePlay",amazon:"Amazon"};var pageTypes={"0":{folder:"apiTest",cssClass:"apiTest",templateViewName:"APITestTemplateView"},"5a8368df-6ebd-c0f2-2d82-e173c1f33d40":{folder:"aboutUs",cssClass:"aboutUs",templateViewName:"AboutUsTemplateView",itemsName:"items"},"f61f12d6-df0c-465c-b3ba-70fb8f3894a4":{folder:"agenda",cssClass:"agenda",templateViewName:"AgendaTemplateView",itemsName:"items"},"30be1358-8b36-4d22-b6d2-50c38f4246c4":{folder:"audio",cssClass:"audio",templateViewName:"AudioTemplateView",nativeControllerName:"AudioController",itemsName:"items"},"51a61af7-1e90-4d68-88db-b1e69a0cca59":{folder:"blog",cssClass:"blog",templateViewName:"BlogTemplateView",nativeControllerName:"BlogController",itemsName:"feeds"},"308af5fa-e91b-d7e7-1926-acfea8f266dc":{folder:"notForCp",templateViewName:"NotForCpTemplateView",cssClass:"notForCp"},"083e52df-721d-4ca4-efa3-25161d344f40":{folder:"contactUs",cssClass:"contactUs",itemsName:"items",templateViewName:"ContactUsTemplateView"},"e9773a60-828f-6a16-a1fb-770163905537":{folder:"poll",cssClass:"poll",itemsName:"items",templateViewName:"PollTemplateView"},"0311d37d-6d9f-fc9d-35fd-45b471d2382f":{folder:"quiz",cssClass:"quiz",itemsName:"items",templateViewName:"QuizTemplateView"},"1002937d-8b19-40de-9df5-ba0d1ea2fbb2":{folder:"events",cssClass:"events",templateViewName:"EventsTemplateView",nativeControllerName:"EventsController",itemsName:"items"},"0053bbba-1ca1-11e0-89a4-af28e0d72085":{folder:"external",cssClass:"external",templateViewName:"ExternalPageTemplateView"},"df7d11f3-233c-4d49-8f2a-d1886e07c641":{folder:"facebook",cssClass:"facebook",templateViewName:"FacebookTemplateView",nativeControllerName:"FacebookController",itemsName:"channels"},"fa7071be-8262-3b0d-b439-d2edd1ac35ec":{folder:"favorites",cssClass:"favorites",templateViewName:"FavoritesTemplateView"},"79eec590-f806-f7ac-946b-1fd9c90283ba":{folder:"form",cssClass:"form",templateViewName:"FormTemplateView",itemsName:"items"},"e0adcb11-f7bb-8107-1cd0-77690221f31c":{folder:"instagram",cssClass:"instagram",templateViewName:"InstagramTemplateView",itemsName:"items"},"fc6700a7-a11e-de90-93f8-7357f9f0037f":{folder:"links",templateViewName:"LinksTemplateView",cssClass:"links",itemsName:"items"},"c54d24ef-faf5-45dd-8859-85e3ebe7cecf":{folder:"webModule",templateViewName:"WebModuleTemplateView",cssClass:"webModule",itemsName:"items"},"9eea8149-956c-46f9-8597-167401c63cd7":{folder:"webModule",templateViewName:"WebModuleTemplateView",cssClass:"webModule",itemsName:"items"},"26ae8ccc-5464-7979-4fdf-3a13f166ffff":{folder:"photos",cssClass:"photos",templateViewName:"PhotosTemplateView",nativeControllerName:"PhotosController",itemsName:"feeds"},"a00b52bb-ff49-704f-bdf3-fb0bd0fd4739":{folder:"livePerson",templateViewName:"LivePersonTemplateView",cssClass:"livePerson",itemsName:"tabs"},"9953766f-6b47-4878-8d38-b9cde750fe58":{folder:"loyaltyCards",cssClass:"loyaltyCards",templateViewName:"LoyaltyCardsTemplateView",itemsName:"items"},"ec79d314-f6aa-f396-a651-3f9b3344dd99":{folder:"notForCp",templateViewName:"NotForCpTemplateView",cssClass:"notForCp"},"aca2f190-b22b-920d-f12a-998101ad4b70":{folder:"map",cssClass:"map",templateViewName:"MapTemplateView",nativeControllerName:"MapController",itemsName:"items"},"3b11bcdf-ba5e-4eaa-9059-ea580b3f1681":{folder:"photos",cssClass:"photos",templateViewName:"PhotosTemplateView",itemsName:"feeds"},"7a2641b0-ceb2-48d6-b715-344198c73dd3":{folder:"reviews",cssClass:"reviews",templateViewName:"ReviewsTemplateView"},"0255eb38-1fb5-4b65-abee-b6fdb69c8f07":{folder:"coupons",cssClass:"coupons",templateViewName:"CouponsTemplateView"},"8901e95e-4dc9-411f-835a-0f18a7872122":{folder:"menu",cssClass:"menu",templateViewName:"MenuTemplateView",itemsName:"items"},"ff4532d2-9137-8da2-f97f-be8b3ddd08e4":{folder:"agenda",cssClass:"agenda",templateViewName:"AgendaTemplateView",itemsName:"items"},"27f91d0a-42c0-48fa-90a8-7138641ddecf":{folder:"staticHtml",cssClass:"staticHtml",templateViewName:"StaticHtmlTemplateView",itemsName:"notes"},"c6bb3e68-0ea7-43dc-a358-b40d9b75d224":{folder:"subscribe",cssClass:"subscribe",templateViewName:"SubscribeTemplateView"},"a77583ef-758f-45f3-9ad1-9704d82a2154":{folder:"twitter",cssClass:"twitter",templateViewName:"TwitterTemplateView",nativeControllerName:"TwitterController",itemsName:"feeds"},"a95e67d5-4816-11c2-318d-fe64a33e32d2":{folder:"users",cssClass:"users",templateViewName:"UsersTemplateView",nativeControllerName:"UsersController",itemsName:"items"},"4680c3f3-e767-4ebf-b112-9ba769c3ff2a":{folder:"video",cssClass:"video",templateViewName:"VideoTemplateView",nativeControllerName:"VideoController",itemsName:"items"},"a7bf6078-3f92-4b90-acf2-b122903bc846":{folder:"video",cssClass:"video",templateViewName:"VideoTemplateView",nativeControllerName:"VideoController",itemsName:"channels"},"6181507a-fdf4-4b90-a270-cbd286603443":{folder:"collections",cssClass:"collections",templateViewName:"CollectionsTemplateView",wideTemplateViewName:"CollectionsWideTemplateView",itemsName:"items"},"38ab2b78-a1ad-42f8-8cb7-9475498c0f30":{folder:"reports",cssClass:"reports",nativeControllerName:"ReportsController",templateViewName:"ReportsTemplateView",itemsName:"items"},"8d7507ff-317e-44b1-9ad3-776ad52d6ee2":{folder:"homepage",cssClass:"homepage",nativeControllerName:"HomepageController",itemsName:"items"},"fe6a4b7d-cf62-172e-8eba-a231dd39eb20":{folder:"myProfile",cssClass:"myProfile",templateViewName:"MyProfileTemplateView",itemsName:"items"},"a8c1cd8e-7e55-828d-3bd2-fb2122472fa3":{folder:"inbox",cssClass:"inbox",templateViewName:"InboxTemplateView",itemsName:"items"},"11111111-1111-1111-1111-111111111111":{folder:"customNative",cssClass:"customNative",templateViewName:"",itemsName:"items"},sharePageType:{cssClass:"share_template_page",templateViewName:"ShareTemplateView",wideTemplateViewName:"ShareTemplateView"}};var appMode={normal:0,experience:1,developers:2};var headerTypes={textHeader:0,imageHeader:1,imageAndTextHeader:2};var navigationLayoutTypes={none:-1,bottomBar:0,topBar:1,list:2,grid:3,sideMenu:4};var adDisplayTypes={text:1,image:2};var layoutFormat={unknown:-1,narrow:0,wide:1};var comTypeEnum={postMessage:0,iframeMessage:1,nativeMessage:2};var protocolTypeEnum={rpc:0,event:1};var socialServices={Facebook:"FACEBOOK",Email:"EMAIL",Twitter:"TWITTER"};var executeTypeEnum={FORCE_NETWORK:0,HIT_AND_RUN:1,HIT_AND_RUN_SILENT:2,HIT_ON_NETWORK_FAIL:3};var responseTypeEnum={NETWORK:0,VALID_CACHE:1,EXPIRED_CACHE:2};var loadingTypeEnum={NORMAL:0,REFRESH:1,SILENT_REFRESH:2,SHOW_MORE:3};var socialServiceReturnType={FACEBOOK:1,TWITTER:2};var ExternalContentTypes={BLOG_POST:1,STATIC_HTML:2};var VideoTypes={GENERAL:"generalVideoType",YOUTUBE:"youtubeVideoType"};var MediaLibraryMergeTypes={Overwrite:0,Override:1,Merge:2};var MediaLibraryIncludeItems={None:0,Playlists:1,Unknown:2,All:3};var PhotoUploadUserTypes={NONE:0,FACEBOOK:1};var FacebookCountStatus={error:"error",deprecatedCount:"dep_count",ok:"ok"};
var RETURN_STATE_INFO="return_state_info";var RETURN_FUNCTION_FACEBOOK_SHARE="handleFacebookShare";var TWITTER_TOKENS="twitter_credentials";var SOCIAL_USER_CANCELED="user_canceled";var APP_VERSION="4.1.0.32";var DEV_SERVICEMAP_URL="http://servicemap.mobile.site-services.com/mobile";var QA_SERVICEMAP_URL="http://servicemap.mobile.qasite-services.com/mobile";var PROD_SERVICEMAP_URL="http://servicemap.mobile.conduit-services.com/mobile";var TEST_LOYALTY=false;var USE_AGENDA_FAVORITES=false;var USE_DATADUMP_SERVICE=false;var DEBUG=1;var PREVENT_DEVICE_DETECT=DEBUG&&false;var NAVIGATION_PAGE_GUID="00000000-0000-0000-0000-000000000002";var NAVIGATION_PAGE_ALIAS="app-navigation-page";var NAVIGATION_PAGE_ID="_navpage";var APP_MODE=appMode.normal;var PLATFORM=platformEnum.simulator;var DEVICE=deviceTypeEnum.iphone;var DEVICE_VARIANT=deviceVariantEnum["default"];var LAYOUT=layoutFormat.narrow;var FORCE_NO_CACHE=false&&DEBUG;var SERVICEMAP_URL=QA_SERVICEMAP_URL;var APP_ID=null;var IS_RTL=false;
var DEBUG = 0;
var AMS_VERSION = "1.80.103.790";
var PLATFORM = 1;
var DEVICE_TOKEN = 2;
var APP_ID = "b42bd08d-a023-4860-b90e-ce9d3657f556";
var APP_MODE = 0;
var SIMULATOR = 0;
var SERVICEMAP_URL = PROD_SERVICEMAP_URL;

var __dataDump={"images":[],"services":[{"data":{"services":[{"name":"AMS_APP_GET","url":"http:\/\/app.mobile.conduit-services.com\/api\/app\/{appId}\/{deviceType}?appVersion={appVersion}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_FEEDS_GET","url":"http:\/\/content.mobile.conduit-services.com\/api\/feeds\/{take}\/{skip}?url={feedUrl}&extraInfo={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_TWITTER_USER_GET","url":"http:\/\/cms.mobile.conduit-services.com\/twitter\/user\/{userName}\/{take}\/{skip}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_TWITTER_QUERY_GET","url":"http:\/\/cms.mobile.conduit-services.com\/twitter\/query\/{query}\/{type}\/{take}\/{skip}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_YOUTUBE_GET","url":"http:\/\/cms.mobile.conduit-services.com\/youtube\/{query}\/{type}\/{skip}\/{take}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_PHOTOS_GET","url":"http:\/\/cms.mobile.conduit-services.com\/photos\/{type}\/{userName}\/{take}\/{skip}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_PHOTOS_ALBUMS_GET","url":"http:\/\/cms.mobile.conduit-services.com\/photos\/albums\/{type}\/{username}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_FACEBOOK_USER_GET","url":"http:\/\/cms.mobile.conduit-services.com\/facebook\/user\/{pageName}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_FACEBOOK_DATA_GET","url":"http:\/\/cms.mobile.conduit-services.com\/facebook\/data\/{pageName}\/{take}\/{skip}\/?params={}","reload_interval_sec":7200,"method":"GET"},{"name":"UMS_USER_POST","url":"http:\/\/ums.mobile.conduit-services.com\/login\/user","method":"POST"},{"name":"PROXY_WEBSLICE","url":"http:\/\/proxy.mobile.conduit-services.com\/webslice?url={url}","reload_interval_sec":12092600,"method":"GET"},{"name":"AMS_APPID_GET","url":"http:\/\/app.mobile.conduit-services.com\/api\/code\/{code}\/{email}\/pwd","reload_interval_sec":7200,"method":"GET"},{"name":"UMS_USAGE_PUT","url":"http:\/\/ums.mobile.conduit-services.com\/usage\/log","reload_interval_sec":7200,"method":"POST"},{"name":"ADS_POST","url":"http:\/\/ads.mobile.conduit-services.com\/{appId}\/{deviceType}","reload_interval_sec":600,"method":"POST"},{"name":"CMS_RAYV_GET","url":"http:\/\/cms.mobile.conduit-services.com\/rayv\/feeds\/{distributer}\/{listType}\/{take}\/{skip}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"MOBILE_SOCIAL_LOGIN","url":"http:\/\/social.mobile.conduit-services.com\/connect\/facebook?appId={appId}&type={deviceType}&ret={returnUrl}","method":"GET"},{"name":"CMS_MEDIA_VIDEO_GET","url":"http:\/\/content.mobile.conduit-services.com\/api\/media\/video\/{deviceType}\/{take}\/{skip}\/?url={url}&extraInfo={params}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_MEDIA_AUDIO_GET","url":"http:\/\/content.mobile.conduit-services.com\/api\/media\/audio\/{deviceType}\/{take}\/{skip}\/?url={url}&extraInfo={params}","reload_interval_sec":7200,"method":"GET"},{"name":"AMS_TRANSLATION_GET","url":"http:\/\/app.mobile.conduit-services.com\/api\/translate\/{product}\/{culture}\/{deviceType}","reload_interval_sec":1200,"method":"GET"},{"name":"LIVE_ALBUM_PHOTO_POST","url":"http:\/\/livealbum.mobile.conduit-services.com\/Album\/{appId}\/{parentSocialId}\/{socialId}\/{albumId}\/{tagWithUserId}\/","reload_interval_sec":7200,"method":"POST"},{"name":"TWITTER_API_PROXY_POST","url":"http:\/\/apiproxy.conduit-services.com\/twitter\/{tId}?sshkey={sshKey}&hts={hts}&url=http%3a%2f%2fapi.twitter.com%2f1%2fstatuses%2fupdate.json","reload_interval_sec":7200,"method":"POST"},{"name":"SOCIAL_LOGOUT","url":"http:\/\/social.conduit-services.com\/ConduitLogout.aspx","reload_interval_sec":7200,"method":"GET"},{"name":"SIGSERV_HTTP_GET","url":"http:\/\/sub.conduit-push.com","reload_interval_sec":7200,"method":"GET"},{"name":"SIGSERV_HTTP_PUT","url":"http:\/\/pub.conduit-push.com","reload_interval_sec":7200,"method":"PUT"},{"name":"SIGSERV_WEBSOCKET_GET","url":"ws:\/\/ws.conduit-push.com","reload_interval_sec":7200,"method":"GET"},{"name":"MOBILE_TWITTER_LOGIN","url":"http:\/\/social.mobile.conduit-services.com\/twitter\/SignIn?appId={appId}&type={deviceType}&ret={returnUrl}","reload_interval_sec":7200,"method":"GET"},{"name":"LIVE_ALBUM_EULA_GET","url":"http:\/\/conduit.ourtoolbar.com\/eula\/","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_CALENDAR_GET","url":"http:\/\/cms.mobile.conduit-services.com\/calendar\/{type}\/?id={id}&max-results={take}&start-index={skip}&since={since}&until={until}&params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"WIBIYA_SUBSCRIBE_GET","url":"https:\/\/api.wibiya.com\/Handlers\/apps\/subscribe_mobile.php?t={token}&e={email}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_MEDIA_ART_GET","url":"http:\/\/content.mobile.conduit-services.com\/api\/media\/art\/?url={url}&extraInfo={params}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_REVIEW_GET","url":"http:\/\/cms.mobile.conduit-services.com\/reviews\/{type}\/?q={query}&max-results={take}&start-index={skip}&params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"NFL_STATS_GET","url":"http:\/\/pages.mobile.conduit.com\/nfl\/player\/{key}\/{id}?info={level}","reload_interval_sec":7200,"method":"GET"},{"name":"IMAGES_REVIEWS_PROVIDER_GET","url":"http:\/\/images.mobile.conduit-services.com\/icon\/100{type}","reload_interval_sec":7200,"method":"GET"},{"name":"INAPP_USER_TOKENS_GET","url":"http:\/\/inapp.mobile.conduit-services.com\/client\/tokens\/{bucketId}?userId={userId}","method":"GET"},{"name":"INAPP_USER_TRANSACTION_POST","url":"http:\/\/inapp.mobile.conduit-services.com\/client\/transaction","method":"POST"},{"name":"CONTACT_CONTENT_PUT","url":"http:\/\/contact.mobile.conduit-services.com\/contact\/client\/{appId}\/{formId}\/?action={action}&postUrl={postUrl}","reload_interval_sec":1200,"method":"POST"},{"name":"CMS_USERS_GET","url":"http:\/\/cms.mobile.conduit-services.com\/users\/{userId}\/{provider}\/{relationType}\/{take}\/{skip}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"LIVE_ALBUM_PHOTO_V2_POST","url":"http:\/\/livealbum.mobile.conduit-services.com\/Files\/upload\/?groupId={groupId}&appId={appId}&albumId={albumId}","reload_interval_sec":7200,"method":"POST"},{"name":"CMS_CONFERENCE_GET","url":"http:\/\/cms.mobile.conduit-services.com\/agenda\/{type}\/{id}\/{version}\/?ranges={ranges}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_PEOPLE_GET","url":"http:\/\/cms.mobile.conduit-services.com\/agenda\/{type}\/{id}\/{version}\/","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_POLLS_GET","url":"http:\/\/cms.mobile.conduit-services.com\/polls\/{type}\/{pollId}\/","reload_interval_sec":7200,"method":"GET"},{"name":"CONTACT_POLLS_POST","url":"http:\/\/polls.mobile.conduit-services.com\/polls\/result\/","reload_interval_sec":1200,"method":"POST"},{"name":"CMS_CONTENT_ITEMS","url":"http:\/\/cms.mobile.conduit-services.com\/contentItems\/items\/contenthost\/{take}\/{skip}\/?id={id}&params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_CONTENT_COLLECTION","url":"http:\/\/cms.mobile.conduit-services.com\/contentItems\/collection\/contenthost\/{take}\/?id={id}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_CONTENT_ITEMS_SEARCH","url":"http:\/\/cms.mobile.conduit-services.com\/contentItems\/items\/search\/{type}\/{collectionId}\/{take}\/{skip}\/?searchParams={searchParams}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_MENU_GET","url":"http:\/\/cms.mobile.conduit-services.com\/restaurants\/menu\/{provider}\/?query={restid}","reload_interval_sec":7200,"method":"GET"},{"name":"COMMUNITY_SOCIAL_LOGIN_POST","url":"http:\/\/community.mobile.conduit-services.com\/users\/social\/login\/{globalAppId}","reload_interval_sec":7200,"method":"POST"},{"name":"COMMUNITY_SOCIAL_LOGOUT_POST","url":"http:\/\/community.mobile.conduit-services.com\/users\/social\/logout\/{globalAppId}\/{userId}?socialId={socialId}","reload_interval_sec":7200,"method":"POST"},{"name":"CMS_USERS_SEARCH_GET","url":"http:\/\/cms.mobile.conduit-services.com\/users\/{provider}\/{skip}\/{take}\/?globalAppId={globalAppId}&q={search_term}&params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"DISCUSSION_DISCUSSIONS_GET","url":"http:\/\/discussion.mobile.conduit-services.com\/discussions\/{globalAppId}\/{userId}","reload_interval_sec":7200,"method":"GET"},{"name":"DISCUSSION_MESSAGES_GET","url":"http:\/\/discussion.mobile.conduit-services.com\/messages\/{discussionId}\/{skip}\/{take}","reload_interval_sec":7200,"method":"GET"},{"name":"DISCUSSION_MESSAGES_SEND_POST","url":"http:\/\/discussion.mobile.conduit-services.com\/messages\/{globalAppId}\/{fromId}","reload_interval_sec":7200,"method":"POST"},{"name":"CONTACT_CONTENT_POST","url":"http:\/\/contact.mobile.conduit-services.com\/contact\/client\/v2\/{globalAppId}\/{formId}\/?version={version}&postUrl={postUrl}","reload_interval_sec":7200,"method":"POST"},{"name":"IMAGE_UPLOADER_POST","url":"http:\/\/imageupload.mobile.conduit-services.com\/files\/upload","reload_interval_sec":7200,"method":"POST"},{"name":"CMS_COUPONS_GET","url":"http:\/\/cms.mobile.conduit-services.com\/coupons\/{type}\/{listId}\/{take}\/{skip}","reload_interval_sec":7200,"method":"GET"},{"name":"AMS_PUBLISHER_APPS_GET","url":"http:\/\/app.mobile.conduit-services.com\/api\/publisher\/apps\/{publisherId}","reload_interval_sec":7200,"method":"GET"},{"name":"AMS_APP_STYLE_GET","url":"http:\/\/app.mobile.conduit-services.com\/api\/appstyletemplate\/{styleTemplateId}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_LOYALTYCARDS_GET","url":"http:\/\/cms.mobile.conduit-services.com\/loyalty\/{type}\/{listId}\/{take}\/{skip}","reload_interval_sec":7200,"method":"GET"},{"name":"CONTENTHOST_LOYALTYCARDS_VALIDATE_POST","url":"https:\/\/contenthost.mobile.conduit-services.com\/loyalty\/validate\/{cardId}","reload_interval_sec":7200,"method":"POST"},{"name":"NOTIFICATIONDATA_PUSHDATA_GET","url":"http:\/\/notificationdata.mobile.conduit-services.com\/notification\/data\/{appId}\/{messageId}\/{deviceType}","reload_interval_sec":7200,"method":"GET"},{"name":"REVU_FIRSTLAUNCH_GET","url":"http:\/\/revu.mobile.conduit-services.com\/first?return={returnUrl}","reload_interval_sec":7200,"method":"GET"}],"reload_interval_sec":86400},"maxAge":86399,"serviceUrl":"http:\/\/servicemap.mobile.conduit-services.com\/mobile"},{"data":{"id":"b42bd08d-a023-4860-b90e-ce9d3657f556","publisherId":"54dd0da4-7989-4555-8464-54c902a391a4","name":"Lucky Dog Bark and Brew","label":"Lucky Dog Bark and Brew","icon":"http:\/\/storage.conduit.com\/Mobile\/69\/6d\/69bd6fb9-626d-4f8c-9313-9563dc5d0b6e\/Images\/8dbcd3cf-7a29-49b4-8a4a-0a1401cc7dc6.png","layout":{"deviceType":-1,"layoutType":3,"colorTheme":{"id":9,"background":"#00ffffff","headers":"#ff000000","mainText":"#ffa81212","smallText":"#ff030303","buttons":"#ffff0000","navTxt":"#FFFFFFFF","contBtxt":"#ff030303","contBsubTxt":"#FFB4B4B4","contAbg":"#FFFFFFFF","hdrBg":"#ffff0000","contAhdlTxt":"#ff000000","navIcn":"#FFFFFFFF","contCsubTxt":"#FFB4B4B4","contBhdlTxt":"#ff000000","contCbg":"#ffff0000","contAsubTxt":"#FFB4B4B4","contAtxt":"#ff030303","appBg":"#00ffffff","contBbg":"#FFFFFFFF","actBtn":"#ffa81212","navBg":"#ffff0000","contCtxt":"#FFFFFFFF","contAbrdr":"#FFDDDDDD","lnkTxt":"#ffa81212","hdrTxt":"#FFFFFFFF","contChdlTxt":"#FFFFFFFF","contBbrdr":"#FFC1C1C2","deviceType":-1,"displayName":"Mono"},"meta":{"bgImage":"http:\/\/storage.conduit.com\/Mobile\/69\/6d\/69bd6fb9-626d-4f8c-9313-9563dc5d0b6e\/Images\/a17fa906-8427-4099-9d1f-2867f62a0172.png","material":0,"isRtl":false,"culture":null,"header":{"type":1,"content":"http:\/\/storage.conduit.com\/Mobile\/69\/6d\/69bd6fb9-626d-4f8c-9313-9563dc5d0b6e\/Images\/1033149b-c97f-41da-b9c1-8150cd270977.png"}},"template":{"appGeneral":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"appBg"}]}}}},"loadingSmallIcn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAsubTxt"}]}}}},"footer":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000","shadow":{"isInset":false,"x":"0px","y":"-2px","blur":"3px","color":"#99000000"}}}}},"scrnDiv":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000","shadow":{"isInset":false,"x":"3px","y":"0px","blur":"10px","color":"#99000000"}}}},"brdr":{"type":"border","data":{"default":{"right":{"color":"#FF000000","width":"1px"}}}}},"dialog":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#CC141414","shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}}}},"lightBoxBg":{"type":"background","data":{"default":{"type":"solid","color":"#c6FFFFFF"}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FF5C5C5C"}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":false,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"clicked":{"type":"solid","color":"#FFE1E1E1","shadow":{"isInset":false,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"disabled":{"type":"solid","color":"#33333333"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FF898989","width":"1px"},"right":{"color":"#FF898989","width":"1px"},"left":{"color":"#FFBFBBB8","width":"1px"},"top":{"color":"#FFBFBBB8","width":"1px"}},"clicked":{"bottom":{"color":"#FF898989","width":"1px"},"right":{"color":"#FF898989","width":"1px"},"left":{"color":"#FFBFBBB8","width":"1px"},"top":{"color":"#FFBFBBB8","width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FF5F5B5A"},"selected":{"color":"#FF535353"},"disabled":{"color":"#CCCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF5F5B5A"},"clicked":{"type":"solid","color":"#FF535353"},"disabled":{"type":"solid","color":"#CCCCCCCC"}}}},"btn2":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFCDCDCD","shadow":{"isInset":false,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"clicked":{"type":"solid","color":"#FFC2C2C2","shadow":{"isInset":false,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"disabled":{"type":"solid","color":"#33333333"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FFABABAB","width":"1px"},"right":{"color":"#FFABABAB","width":"1px"},"left":{"color":"#FFABABAB","width":"1px"},"top":{"color":"#FFABABAB","width":"1px"}},"clicked":{"bottom":{"color":"#FF8A8A8A","width":"1px"},"right":{"color":"#FF8A8A8A","width":"1px"},"left":{"color":"#FF8A8A8A","width":"1px"},"top":{"color":"#FF8A8A8A","width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FF5F5B5A"},"selected":{"color":"#FF535353"},"disabled":{"color":"#CCCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF5F5B5A"},"clicked":{"type":"solid","color":"#FF535353"},"disabled":{"type":"solid","color":"#CCCCCCCC"}}}}},"adBar":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0.9}}]}]}}}},"brdr":{"type":"border","data":{"top":{"color":{"_replace":[{"param":"contBbg"}]},"width":"1px"}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBhdlTxt"}]}}}}},"pullToRef":{"typeA":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAbg"}]},"shadow":{"isInset":true,"x":"-1px","y":"1px","blur":"2px","color":"#54000000"}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAsubTxt"}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contAbrdr"}]},"width":"1px"}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAsubTxt"}]}}}}},"typeB":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg"}]},"shadow":{"isInset":true,"x":"-1px","y":"1px","blur":"2px","color":"#54000000"}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBsubTxt"}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBsubTxt"}]}}}}},"ribbon":{"txt":{"type":"text","data":{"default":{"color":"#FF000000"}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":false,"x":"0px","y":"0px","blur":"3px","color":"#99000000"}}}},"brdr":{"type":"border","data":{"default":{"top":{"color":"#FF000000","width":"1px"},"bottom":{"color":"#FF000000","width":"1px"}}}}},"greenCrouton":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#F2408422","location":0},{"color":"#e5408422","location":1}]}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FF273f0d","width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#ffffffff"}}},"shadowGradTop":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#B2000000","location":0},{"color":"#33000000","location":0.46},{"color":"#00000000","location":1}]}}},"shadowGradBottom":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#4C000000","location":0},{"color":"#00000000","location":0.82},{"color":"#00000000","location":1}]}}}}},"appHeader":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg"}]},"shadow":{"isInset":false,"x":"0px","y":"1px","blur":"3px","color":{"_replace":[{"param":"hdrBg","params":[{"s":{"mul":0.7},"l":{"mul":0.3},"a":{"mul":0.8},"if":0.5},{"s":{"mul":0.7},"l":{"mul":0.2}}]}]}}}}},"bgTint":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg"}]}}}},"brdr":{},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"hdrTxt"}]}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg","params":[{"s":{"mul":0.9},"l":{"mul":0.7},"a":{"mul":0.4},"if":0.5},{"s":{"mul":0.9},"l":{"mul":0.5},"a":{"mul":0.4}}]}]}},"clicked":{"type":"solid","color":"#4C000000","shadow":{"isInset":true,"x":"-1px","y":"1px","blur":"2px","color":"#66000000"}},"selected":{"type":"solid","color":"#4C000000","shadow":{"isInset":true,"x":"-1px","y":"1px","blur":"2px","color":"#66000000"}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrTxt"}]}}}}}},"appHeaderAndroid":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg"}]}}}},"shadowGrad":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#3f000000","location":0},{"color":"#28000000","location":0.04},{"color":"#00000000","location":0.83},{"color":"#00000000","location":1}]}}},"brdr":{"type":"border","data":{"default":{"top":{"color":{"_replace":[{"param":"hdrBg","params":[{"s":{"mul":0},"l":{"mul":100},"a":{"mul":0,"add":0.2},"if":0.1},{"s":{"mul":0},"l":{"mul":100},"a":{"mul":0.1},"if":0.3},{"s":{"mul":0},"l":{"mul":100},"a":{"mul":0.3}}]}]},"width":"2dp"},"bottom":{"color":{"_replace":[{"param":"hdrBg","params":[{"s":{"mul":0},"l":{"mul":0,"add":0.3},"a":{"mul":0,"add":0.2},"if":0.2},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.2}}]}]},"width":"4dp"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"hdrTxt"}]}}}},"actIcn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrTxt"}]}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrTxt","params":[{"l":{"mul":0.8}}]}]}}}},"refresh":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"lnkTxt"}]}}}}},"spinnerMenu":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg","params":[{"s":{"mul":0.8},"l":{"mul":0,"add":0.4},"if":0.2},{"s":{"mul":0.8},"l":{"add":0.2},"if":0.4},{"s":{"mul":0.7},"l":{"add":0.1},"if":0.7},{"s":{"mul":0.7},"l":{"add":0.3},"if":0.9},{"s":{"mul":0.7},"l":{"mul":0.8}}]}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"hdrBg","params":[{"s":{"mul":0.9},"l":{"mul":0,"add":0.3},"if":0.2},{"s":{"mul":0.9},"l":{"add":0.1},"if":0.4},{"s":{"mul":0.9},"if":0.7},{"s":{"mul":0.9},"l":{"add":-0.1},"if":0.9},{"s":{"mul":0.9},"l":{"mul":0.7}}]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"hdrBg","params":[{"s":{"mul":0.9},"l":{"mul":0,"add":0.3},"if":0.2},{"s":{"mul":0.9},"l":{"add":0.1},"if":0.4},{"s":{"mul":0.9},"if":0.7},{"s":{"mul":0.9},"l":{"add":-0.1},"if":0.9},{"s":{"mul":0.9},"l":{"mul":0.7}}]}]}}}},"brdr":{"type":"border","data":{"default":{"top":{"color":{"_replace":[{"param":"hdrBg","params":[{"s":{"mul":0.9},"if":0.2},{"s":{"mul":0.9},"l":{"add":-0.1},"if":0.4},{"s":{"mul":0.9},"l":{"add":-0.3},"if":0.7},{"s":{"mul":0.9},"l":{"mul":0.8},"if":0.9},{"s":{"mul":0.9},"l":{"mul":0.8}}]}]},"width":"1dp"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"hdrBg","params":[{"s":{"mul":0.8},"l":{"mul":0,"add":1},"if":0.7},{"l":{"mul":0.2}}]}]}}}}},"navBar":{"item":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"navBg"}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"navBg","params":[{"l":{"mul":1.2},"a":{"mul":0.9},"if":0.2},{"l":{"mul":0.7}}]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"navBg","params":[{"l":{"mul":1.2},"a":{"mul":0.8},"if":0.2},{"l":{"mul":0.8}}]}]}}}},"bubbleBg":{"type":"background","data":{"default":{},"clicked":{}}},"brdr":{"type":"border","data":{"default":{},"clicked":{}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"navTxt","params":[{"a":{"mul":0.8}}]}]}},"clicked":{"color":{"_replace":[{"param":"navTxt"}]}},"selected":{"color":{"_replace":[{"param":"navTxt"}]}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#ffffffff"}}}}},"navBarCustom":{"item":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"navBg"}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"navBg","params":[{"s":{"mul":0.8},"l":{"mul":1.2},"if":0.3},{"s":{"mul":0.8},"l":{"mul":0.8}}]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"navBg","params":[{"s":{"mul":0.8},"l":{"mul":1.2},"if":0.3},{"s":{"mul":0.8},"l":{"mul":0.8}}]}]}}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"navTxt","params":[{"a":{"mul":0.8}}]}]}},"clicked":{"color":{"_replace":[{"param":"navTxt"}]}},"selected":{"color":{"_replace":[{"param":"navTxt"}]}}}}}},"navBarNew":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#CCFFFFFF"}}},"item":{"hdlTxt":{"type":"text","data":{"default":{"color":"#FF929292"},"clicked":{"color":"#FF757575"},"selected":{"color":"#FF2a2a2a"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF929292"},"clicked":{"type":"solid","color":"#FF757575"},"selected":{"type":"solid","color":"#FF2a2a2a"}}}}},"navGrid":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#33000000"}}},"btn":{"bg":{"type":"background","data":{"default":{},"clicked":{}}},"brdr":{"type":"border","data":{"default":{},"clicked":{}}},"txt":{"type":"text","data":{"default":{"color":"#FFFFFFFF"},"clicked":{"color":"#CCFFFFFF"}}}}},"dynamicGrid":{"fullPage":{"bg":{}},"slot":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":{"_replace":[{"param":"hdrBg","params":[{"s":{"add":-0.1},"l":{"add":0.2},"a":{"mul":0,"add":0.9}}]}]},"location":0},{"color":{"_replace":[{"param":"hdrBg","params":[{"a":{"mul":0,"add":0.9},"if":0.3},{"l":{"add":-0.05},"a":{"mul":0,"add":0.9},"if":0.6},{"l":{"add":-0.25},"a":{"mul":0,"add":0.9}}]}]},"location":1}],"shadow":{"isInset":false,"x":"0px","y":"0px","blur":"3px","color":"#4c000000"}},"clicked":{"type":"solid","color":{"_replace":[{"param":"hdrBg"}]},"shadow":{"isInset":false,"x":"0px","y":"0px","blur":"3px","color":"#4c000000"}},"selected":{"type":"solid","color":{"_replace":[{"param":"hdrBg"}]},"shadow":{"isInset":false,"x":"0px","y":"0px","blur":"3px","color":"#4c000000"}}}},"text":{"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"hdrTxt"}]},"shadow":{"x":"0px","y":"-1px","color":"#66000000"}}}}}}},"navList":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#33000000"}}},"item":{"bg":{"type":"background","data":{"default":{},"clicked":{"type":"solid","color":"#40000000"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#4c2a2a2a","width":"1px"}},"clicked":{}}},"txt":{"type":"text","data":{"default":{"color":"#FFFFFFFF"},"clicked":{}}}}},"navSidebar":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FF282828"}}},"scrnDiv":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000","shadow":{"isInset":false,"x":"-3px","y":"0px","blur":"10px","color":"#99000000"}}}},"brdr":{"type":"border","data":{"default":{"left":{"color":"#FF000000","width":"1px"}}}}},"item":{"bg":{"type":"background","data":{"default":{},"clicked":{"type":"solid","color":"#33000000","shadow":{"isInset":true,"x":"0px","y":"1px","blur":"3px","color":"#99000000"}},"selected":{"type":"solid","color":"#33000000","shadow":{"isInset":true,"x":"0px","y":"1px","blur":"3px","color":"#99000000"}}}},"marker":{"type":"background","data":{"default":{},"clicked":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FF3e3e3e","width":"1px"}},"clicked":{},"selected":{}}},"txt":{"type":"text","data":{"default":{"color":"#FFefefef"},"clicked":{"color":"#FFFFFFFF"},"selected":{"color":"#FFFFFFFF"}}}}},"tabBar":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0.7},"if":0.3},{"a":{"mul":0.88}}]}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}}}},"item":{"bg":{"type":"background","data":{"default":{},"clicked":{}}},"bubble":{"bg":{"type":"background","data":{"default":{},"clicked":{"type":"solid","color":{"_replace":[{"param":"lnkTxt","params":[{"a":{"mul":0.8}}]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"lnkTxt"}]}}}},"brdr":{"type":"border","data":{"default":{},"clicked":{},"selected":{}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}},"clicked":{"color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0,"add":1}}]}]}},"selected":{"color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0,"add":1}}]}]}}}}},"brdr":{"type":"border","data":{"default":{},"clicked":{}}}}},"tab2Bar":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"horizontal","color":[{"color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0,"add":0.86},"if":0.3},{"s":{"mul":0.8},"l":{"add":-0.2},"a":{"mul":0,"add":0.86}}]}]},"location":0},{"color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0,"add":0.9},"if":0.3},{"s":{"mul":0.8},"l":{"add":0.2},"a":{"mul":0,"add":0.9}}]}]},"location":0.5},{"color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0,"add":0.86},"if":0.3},{"s":{"mul":0.8},"l":{"add":-0.2},"a":{"mul":0,"add":0.86}}]}]},"location":1}],"shadow":[{"isInset":true,"x":"0px","y":"-1px","blur":"0px","color":{"_replace":[{"param":"lnkTxt"}]}},{"isInset":true,"x":"0px","y":"1px","blur":"0px","color":{"_replace":[{"param":"lnkTxt"}]}},{"isInset":true,"x":"0px","y":"1px","blur":"10px -2px","color":"#B4000000"},{"isInset":true,"x":"0px","y":"-1px","blur":"10px -2px","color":"#B4000000"}]}}},"triangle":{"type":"border","data":{"default":{"top":{"width":"6px","color":{"_replace":[{"param":"contBtxt"}]}},"left":{"width":"8px","color":"#00000000"},"right":{"width":"8px","color":"#00000000"},"bottom":{"width":"6px","color":{"_replace":[{"param":"contBtxt"}]}}}}},"item":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000"},"selected":{"type":"solid","color":"#00000000"}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}},"selected":{"color":{"_replace":[{"param":"contAtxt"}]}}}}}},"tab3Bar":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0,"add":0.54},"if":0.2},{"a":{"mul":0,"add":0.88}}]}]},"shadow":{"isInset":false,"x":"0px","y":"1px","blur":"3px","color":"#96000000"}}}},"item":{"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}},"selected":{"color":{"_replace":[{"param":"contBsubTxt"}]}}}}}},"tabAndroidBar":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0.95}}]}]}}}},"bottomBrdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":0.14},"if":0.3},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.14}}]}]},"width":"2dp"}}}},"sepBrdr":{"type":"border","data":{"default":{"left":{"color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":0.2},"if":0.2},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.2}}]}]},"width":"1px"}}}},"item":{"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBhdlTxt"}]}}}},"bg":{"type":"background","data":{"default":{},"clicked":{"type":"solid","color":{"_replace":[{"param":"lnkTxt","params":[{"a":{"mul":0,"add":0.5}}]}]}}}},"brdr":{"type":"border","data":{"default":{},"clicked":{"bottom":{"color":{"_replace":[{"param":"lnkTxt","params":[{"l":{"mul":1.2},"if":0.5},{"s":{"mul":0.8},"l":{"mul":0.8}}]}]},"width":"1px"}}}}}},"contTypeA":{"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAhdlTxt"}]}}}},"hdlTxtBrdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":"#FFCCCCCC"},"bottom":{"width":"1px","color":"#FFCCCCCC"}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAtxt"}]}},"mandatory":{"color":"#FFBB0000"}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAsubTxt"}]}}}},"lnkTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}}}},"hdlIcn":{"type":"server_icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAhdlTxt"}]}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAtxt"}]}}}},"subIcn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAsubTxt"}]}}}},"lnkIcn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"lnkTxt"}]}}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAbg"}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"contAbg","params":[{"a":{"mul":0.7},"if":0.3},{"l":{"mul":0.8},"a":{"mul":0.8}}]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"contAbg","params":[{"a":{"mul":0.8},"if":0.3},{"l":{"mul":0.7},"a":{"mul":0.9}}]}]}}}},"subBg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAbg","params":[{"s":{"mul":0.8},"l":{"add":0.24},"if":0.4},{"s":{"mul":0.8},"l":{"add":-0.2}}]}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contAbrdr"}]},"width":"1px"}},"clicked":{},"selected":{"top":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","params":[{"l":{"mul":0.5}}]}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","params":[{"l":{"mul":0.5}}]}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","params":[{"l":{"mul":0.5}}]}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","params":[{"l":{"mul":0.5}}]}]}}}}},"classicItem":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAbg"}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"contAbg","params":[{"a":{"mul":0.7},"if":0.3},{"l":{"mul":0.8},"a":{"mul":0.8}}]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"contAbg","params":[{"a":{"mul":0.8},"if":0.3},{"l":{"mul":0.7},"a":{"mul":0.9}}]}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contAbrdr"}]},"width":"1px"}},"clicked":{},"selected":{"top":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","params":[{"l":{"mul":0.5}}]}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","params":[{"l":{"mul":0.5}}]}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","params":[{"l":{"mul":0.5}}]}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","params":[{"l":{"mul":0.5}}]}]}}}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFfcfcfc","location":0},{"color":"#FFe5e5e5","location":1}],"shadow":[{"isInset":false,"x":"1px","y":"1px","blur":"2px","color":"#26000000"},{"isInset":true,"x":"-1px","y":"-1px","blur":"0px","color":"#CCFFFFFF"}]},"clicked":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFe5e5e5","location":0},{"color":"#FFfcfcfc","location":1}],"shadow":[{"isInset":false,"x":"1px","y":"1px","blur":"1px","color":"#4c000000"},{"isInset":true,"x":"1px","y":"1px","blur":"0px","color":"#CCFFFFFF"}]},"disabled":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFe7e7e7","location":0},{"color":"#FFE6E6E6","location":1}]}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FFBFBBB8","width":"1px"},"right":{"color":"#FFBFBBB8","width":"1px"},"left":{"color":"#FFBFBBB8","width":"1px"},"top":{"color":"#FFBFBBB8","width":"1px"}},"clicked":{"bottom":{"color":"#FFa7a7a7","width":"1px"},"right":{"color":"#FFa7a7a7","width":"1px"},"left":{"color":"#FFa7a7a7","width":"1px"},"top":{"color":"#FFa7a7a7","width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FF5F5B5A"},"selected":{"color":"#CC000000"},"disabled":{"color":"#ffCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF2a2a2a"}}}},"actBtn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"actBtn","params":[{"a":{"add":-0.2}}]}]}},"disabled":{"type":"solid","color":"#33333333"}}},"brdr":{"type":"border","data":{}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"actBtn","params":[{"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":1},"if":0.7},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":1}}]}]}},"selected":{"color":{"_replace":[{"param":"actBtn","params":[{"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":0.8},"if":0.7},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.8}}]}]}},"disabled":{"color":"#ffCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn","params":[{"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":1},"if":0.7},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":1}}]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"actBtn","params":[{"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":0.8},"if":0.7},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.8}}]}]}},"disabled":{"type":"solid","color":"#ffCCCCCC"}}}},"contentSession":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAhdlTxt","params":[{"a":{"mul":0,"add":0.88}}]}]}}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg"}]}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg","params":[{"a":{"mul":0,"add":0.69}}]}]}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg","params":[{"a":{"mul":0,"add":0.59}}]}]}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000","shadow":[{"isInset":false,"x":"0px","y":"0px","blur":"0px 1px","color":"#66000000"},{"isInset":true,"x":"1px","y":"1px","blur":"0px","color":"#4Dffffff"}]}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FFFFFFFF"}}}}},"contentSession2":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"lnkTxt","params":[{"a":{"mul":0.88}}]}]}}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg"}]}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg","params":[{"a":{"mul":0.69}}]}]}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg","params":[{"a":{"mul":0.49}}]}]}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00FFFFFF","shadow":[{"isInset":false,"x":"1px","y":"1px","blur":"0px","color":"#66ffffff"},{"isInset":true,"x":"1px","y":"1px","blur":"3px","color":"#99000000"}]}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAbg","params":[{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":1},"if":0.3},{"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":1}}]}]}}}}}},"calBoxBrdr1":{"type":"border","data":{"default":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","style":"dotted","color":{"_replace":[{"param":"contBbrdr","params":[{"a":{"mul":0.7}}]}]}}}}},"calBoxBrdr2":{"type":"border","data":{"default":{"top":{"width":"1px","style":"dotted","color":{"_replace":[{"param":"contBbrdr","params":[{"a":{"mul":0.7}}]}]}},"bottom":{"width":"1px","style":"dotted","color":{"_replace":[{"param":"contBbrdr","params":[{"a":{"mul":0.7}}]}]}}}}}},"contTypeB":{"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBhdlTxt"}]}},"selected":{"color":{"_replace":[{"param":"contBsubTxt"}]}}}},"hdlTxtBrdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":{"_replace":[{"param":"contBhdlTxt","params":[{"a":{"mul":0.2}}]}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBhdlTxt","params":[{"a":{"mul":0.2}}]}]}}}}},"hdlTxtBrdr2":{"type":"border","data":{"default":{"top":{"width":"1px","color":{"_replace":[{"param":"contBhdlTxt"}]}}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBtxt"}]}},"selected":{"color":{"_replace":[{"param":"contBsubTxt"}]}},"mandatory":{"color":"#FFBB0000"}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBsubTxt"}]}}}},"lnkTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBtxt"}]}}}},"subIcn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBsubTxt"}]}}}},"lnkIcn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"lnkTxt"}]}}}},"subSvg":{"type":"svg","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBsubTxt"}]}}}},"rateSvg":{"type":"svg","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0.8},"l":{"add":0.24},"a":{"add":0.4},"if":0.4},{"s":{"mul":0.8},"l":{"add":-0.4},"a":{"add":0.2}}]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"lnkTxt"}]}}}},"rateIcn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0.8},"l":{"add":0.24},"a":{"add":0.4},"if":0.4},{"s":{"mul":0.8},"l":{"add":-0.4},"a":{"add":0.2}}]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"lnkTxt"}]}}}},"hdlIcn":{"type":"server_icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBhdlTxt"}]}}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"add":-0.12}}]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0},"if":0.3},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.58}}]}]}}},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"add":-0.18}}]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0},"if":0.3},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.58}}]}]}}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"add":-0.18}}]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0},"if":0.3},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.58}}]}]}}}}},"subBg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0.8},"l":{"add":0.24},"if":0.4},{"s":{"mul":0.8},"l":{"add":-0.2}}]}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}},"clicked":{"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}},"selected":{"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}}}},"subBrdr":{"type":"border","data":{"default":{"top":{"color":{"_replace":[{"param":"contBsubTxt"}]},"width":"1px"}}}},"bubbleItem":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"add":-0.12}}]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0},"if":0.2},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.58}}]}]}}},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"add":-0.33},"s":{"add":-0.24},"l":{"add":0.24},"if":0.3},{"a":{"add":-0.24},"s":{"add":-0.24},"l":{"add":-0.24}}]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"1px","color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0},"if":0.2},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.7}}]}]}}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBbg"}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"1px","color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0},"if":0.2},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.7}}]}]}}}}},"ovrImg":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#B2000000"},"clicked":{"type":"solid","color":{"_replace":[{"param":"lnkTxt","params":[{"a":{"mul":0.6}}]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"lnkTxt","params":[{"a":{"mul":0.8}}]}]}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#b2ffffff"}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FFFFFFFF"}}},"txt":{"type":"text","data":{"default":{"color":"#B2FFFFFF"}}},"subTxt":{"type":"text","data":{"default":{"color":"#7fFFFFFF"}}}},"brdr":{"type":"border","data":{}},"shadowBrdr":{"type":"border","data":{"default":{"bottom":{"color":"#26000000","width":"1dp"}}}}},"headerItem":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"add":-0.18},"if":0.2},{"a":{"add":-0.12}}]}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0.82}}]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"l":{"mul":0.82}}]}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}}}}},"trackItem":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0.88}}]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0},"if":0.2},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.58}}]}]}}},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0.82}}]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0},"if":0.2},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.58}}]}]}}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBbg"}]}}}},"brdr":{"type":"border","data":{"default":{"top":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}},"clicked":{"top":{"color":{"_replace":[{"param":"lnkTxt"}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"lnkTxt"}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"lnkTxt"}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"lnkTxt"}]},"width":"1px"}},"selected":{"top":{"color":{"_replace":[{"param":"lnkTxt"}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"lnkTxt"}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"lnkTxt"}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"lnkTxt"}]},"width":"1px"}}}}},"fullPage":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"add":-0.32},"if":0.2},{"a":{"add":-0.22}}]}]}}}}},"fullPage2":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0.82}}]}]}}}}},"fullPage3":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0.95}}]}]}}}}},"fullPage4":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0.7}}]}]}}}}},"fullPage5":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0,"add":0.5}}]}]}}}}},"sideAlbums":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0,"add":0.5}}]}]}}}},"item":{"bg":{"type":"background","data":{"default":{},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0.2}}]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBbg"}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contBbrdr","params":[{"a":{"mul":0.5}}]}]},"width":"1px"}}}}}},"sep":{"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr","params":[{"a":{"mul":0,"add":0.6}}]}]}}}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFFFFFFF","location":0},{"color":"#FFE6E6E6","location":1}]},"clicked":{"type":"gradient","orientation":"vertical","color":[{"color":"#ffdddddd","location":0},{"color":"#ffcccccc","location":1}]},"disabled":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFe7e7e7","location":0},{"color":"#FFE6E6E6","location":1}]}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FFBFBBB8","width":"1px"},"right":{"color":"#FFBFBBB8","width":"1px"},"left":{"color":"#FFBFBBB8","width":"1px"},"top":{"color":"#FFBFBBB8","width":"1px"}},"clicked":{"bottom":{"color":"#FF757575","width":"1px"},"right":{"color":"#FF757575","width":"1px"},"left":{"color":"#FF757575","width":"1px"},"top":{"color":"#FF757575","width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FF5F5B5A"},"selected":{"color":"#FF464342"},"disabled":{"color":"#CCCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF5F5B5A"},"clicked":{"type":"solid","color":"#FF464342"},"disabled":{"type":"solid","color":"#CCCCCCCC"}}}},"actBtn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"actBtn","params":[{"a":{"add":-0.2}}]}]}},"disabled":{"type":"solid","color":"#33333333"}}},"brdr":{"type":"border","data":{}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"actBtn","params":[{"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":1},"if":0.7},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":1}}]}]}},"selected":{"color":{"_replace":[{"param":"actBtn","params":[{"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":0.8},"if":0.7},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.8}}]}]}},"disabled":{"color":"#ffCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn","params":[{"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":1},"if":0.7},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":1}}]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"actBtn","params":[{"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":0.8},"if":0.7},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.8}}]}]}},"disabled":{"type":"solid","color":"#ffCCCCCC"}}}},"subBtn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBsubTxt"}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBsubTxt","params":[{"l":{"mul":0.8}}]}]}}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBsubTxt","params":[{"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":1},"if":0.7},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":1}}]}]}}}}}},"contTypeC":{"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contChdlTxt"}]}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contCtxt"}]}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contCsubTxt"}]}}}},"lnkTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contCbg","params":[{"l":{"mul":0.9},"a":{"mul":0.9},"if":0.7},{"l":{"mul":0.7},"a":{"mul":0.9}}]}]}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"actBtn","params":[{"l":{"mul":1.3},"if":0.5},{"l":{"mul":0.5}}]}]}},"disabled":{"type":"solid","color":"#33333333"}}},"brdr":{"type":"border","data":{}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FFFFFFFF"},"selected":{"color":"#FFFFFFFF"},"disabled":{"color":"#ffCCCCCC"}}}}},"form":{"element":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFe4e4e4","location":0},{"color":"#FF8d8d8d","location":1}]},"mandatory":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFFFFFFF","location":0},{"color":"#FF8d8d8d","location":1}],"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#4cb60021"}}}},"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":"#FFC1C1C2"},"bottom":{"width":"1px","color":"#FFC1C1C2"},"left":{"width":"1px","color":"#FFC1C1C2"},"right":{"width":"1px","color":"#FFC1C1C2"}},"mandatory":{"top":{"color":"#FFB60021","width":"1px"},"bottom":{"color":"#FFB60021","width":"1px"},"left":{"color":"#FFB60021","width":"1px"},"right":{"color":"#FFB60021","width":"1px"}}}},"txt":{"type":"text","data":{"default":{"color":"#FF111111"},"watermark":{"color":"#FF888888"},"mandWatermark":{"color":"#FFb60021"}}}},"dropdown":{"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF2a2a2a"}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":"#22000000"}}},"brdr":{"type":"border","data":{"default":{"left":{"color":"#FFC1C1C2","width":"1px"},"right":{"color":"#FFC1C1C2","width":"1px"}}}}},"input":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF"},"disabled":{"type":"solid","color":"#FFCCCCCC"},"mandatory":{"type":"solid","color":"#FFfff8f8","shadow":{"isInset":false,"x":"1px","y":"1px","blur":"5px","color":"#4cb60021"}}}},"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":"#FFC1C1C2"},"bottom":{"width":"1px","color":"#FFC1C1C2"},"left":{"width":"1px","color":"#FFC1C1C2"},"right":{"width":"1px","color":"#FFC1C1C2"}},"diabled":{},"mandatory":{"top":{"color":"#FFB60021","width":"1px"},"bottom":{"color":"#FFB60021","width":"1px"},"left":{"color":"#FFB60021","width":"1px"},"right":{"color":"#FFB60021","width":"1px"}}}},"txt":{"type":"text","data":{"default":{"color":"#FF000000"},"watermark":{"color":"#FF8e8e8e"},"mandWatermark":{"color":"#FFb60021"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FFa8a8a8"},"selected":{"type":"solid","color":"#FF2a2a2a"},"clicked":{"type":"solid","color":"#FF626262"}}}},"checkBox":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"selected":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"mandatory":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"disabled":{"type":"solid","color":"#54d3d3d3","shadow":{"isInset":false,"x":"0px","y":"1px","blur":"0px","color":"#FFFFFFFF"}}}},"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}}},"selected":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}}},"mandatory":{"top":{"color":"#FFB60021","width":"1px"},"bottom":{"color":"#FFB60021","width":"1px"},"left":{"color":"#FFB60021","width":"1px"},"right":{"color":"#FFB60021","width":"1px"}},"disabled":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#00FFFFFF"},"selected":{"type":"solid","color":"#FF2a2a2a"}}}},"radioBtn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"selected":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"mandatory":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"disabled":{"type":"solid","color":"#54d3d3d3","shadow":{"isInset":false,"x":"0px","y":"1px","blur":"0px","color":"#FFFFFFFF"}}}},"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}}},"selected":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}}},"mandatory":{"top":{"color":"#FFB60021","width":"1px"},"bottom":{"color":"#FFB60021","width":"1px"},"left":{"color":"#FFB60021","width":"1px"},"right":{"color":"#FFB60021","width":"1px"}},"disabled":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}}}}},"icn":{"type":"background","data":{"default":{},"selected":{"type":"solid","color":"#FF2a2a2a"},"disabled":{"type":"solid","color":"#FFd3d3d3"}}}}},"audioPlayer":{"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"hdrTxt"}]}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"hdrTxt","params":[{"a":{"mul":0.8}}]}]}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrTxt"}]}}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg","params":[{"l":{"mul":0.3}}]}]}}}},"bgMini":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg","params":[{"l":{"mul":0.3}}]}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"hdrBg","params":[{"s":{"mul":0.5},"l":{"mul":0.7},"a":{"mul":0.9},"if":0.5},{"s":{"mul":0.7},"l":{"mul":0.6},"a":{"mul":0.9}}]}]},"width":"1px"}}}},"seekBar":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg","params":[{"s":{"mul":0.7},"l":{"mul":1.3},"if":0.5},{"s":{"mul":0.7},"l":{"mul":0.7}}]}]},"shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":{"_replace":[{"param":"hdrBg","params":[{"s":{"mul":0.7},"l":{"mul":0.001},"if":0.5},{"s":{"mul":0.7},"l":{"mul":0.001}}]}]}}}}},"brdr":{"type":"border","data":{"default":{"top":{"color":{"_replace":[{"param":"hdrBg","params":[{"s":{"mul":0.7},"l":{"mul":1.1},"if":0.5},{"s":{"mul":0.7},"l":{"mul":0.7}}]}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"hdrBg","params":[{"s":{"mul":0.7},"l":{"mul":1.8},"if":0.5},{"s":{"mul":0.7},"l":{"mul":0.7}}]}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"hdrBg","params":[{"s":{"mul":0.7},"l":{"mul":1.8},"if":0.5},{"s":{"mul":0.7},"l":{"mul":0.7}}]}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"hdrBg","params":[{"s":{"mul":0.7},"l":{"mul":1.8},"if":0.5},{"s":{"mul":0.7},"l":{"mul":0.7}}]}]},"width":"1px"}}}},"seekFill":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrTxt"}]},"shadow":{"isInset":true,"x":"0px","y":"1px","blur":"1px","color":"#ff000000"}}}}}},"liveChat":{"bubbleMe":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0.88}}]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}}}},"triangle":{"type":"border","data":{"default":{"ltrLeft":{"color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0.88}}]}]},"width":"10px"},"bottom":{"color":"#00000000","width":"10px"},"top":{"color":"#00000000","width":"10px"}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBhdlTxt"}]}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBsubTxt"}]}}}}},"bubbleOther":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAbg"}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}}}},"triangle":{"type":"border","data":{"default":{"ltrRight":{"color":{"_replace":[{"param":"contAbg"}]},"width":"10px"},"bottom":{"color":"#00000000","width":"10px"},"top":{"color":"#00000000","width":"10px"}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAhdlTxt"}]}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBsubTxt"}]}}}}}},"facebook":{"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}}}},"bubble":{"bg":{"type":"background","data":{"default":{}}},"brdr":{"type":"border","data":{"default":{"left":{"color":"#66767676","width":"1px"},"right":{"color":"#66767676","width":"1px"},"bottom":{"color":"#66767676","width":"1px"},"top":{"color":"#66767676","width":"1px"}}}},"triangle":{"type":"border","data":{"default":{"left":{"color":"#00000000","width":"4px"},"right":{"color":"#00000000","width":"4px"},"bottom":{"color":"#00000000","width":"4px"}}}},"triangleBrdr":{"type":"border","data":{"default":{"left":{"color":"#00000000","width":"6px"},"right":{"color":"#00000000","width":"6px"},"bottom":{"color":"#66767676","width":"6px"}}}}},"btn":{"bg":{"type":"background","data":{"default":{}}},"brdr":{"type":"border","data":{"default":{}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}},"selected":{"color":{"_replace":[{"param":"lnkTxt","params":[{"a":{"mul":0,"add":0.7}}]}]}},"disabled":{"color":"#CCCCCCCC"}}}},"socialBtnA":{"bg":{"type":"background","data":{"default":{},"clicked":{"type":"solid","color":{"_replace":[{"param":"contAbg","params":[{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":0.04},"if":0.3},{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.04}}]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"contAbg","params":[{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":0.08},"if":0.3},{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.08}}]}]}},"disabled":{}}},"sepLine":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAbrdr"}]}}}},"sepBrdr":{"type":"border","data":{"default":{"top":{"color":{"_replace":[{"param":"contAbrdr"}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"contAbrdr"}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"contAbrdr"}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"contAbrdr"}]},"width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}},"clicked":{"color":{"_replace":[{"param":"contAsubTxt"}]}},"selected":{"color":{"_replace":[{"param":"contAhdlTxt"}]}},"disabled":{"color":"#CCCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"lnkTxt"}]},"isBlack":true,"isSimple":true},"clicked":{"type":"solid","color":{"_replace":[{"param":"contAsubTxt"}]},"isBlack":true,"isSimple":true},"selected":{"type":"solid","color":{"_replace":[{"param":"contAhdlTxt"}]},"isBlack":true,"isSimple":true},"disabled":{"type":"solid","color":"#CCCCCCCC","isBlack":true,"isSimple":true}}}},"socialBtnB":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000"},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":0.04},"if":0.3},{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.04}}]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":0.08},"if":0.3},{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.08}}]}]}},"disabled":{"type":"solid","color":"#00000000"}}},"sepLine":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbrdr"}]}}}},"sepBrdr":{"type":"border","data":{"default":{"top":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}},"clicked":{"color":{"_replace":[{"param":"contBsubTxt"}]}},"selected":{"color":{"_replace":[{"param":"contBhdlTxt"}]}},"disabled":{"color":"#CCCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"lnkTxt"}]},"isBlack":true,"isSimple":true},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBsubTxt"}]},"isBlack":true,"isSimple":true},"selected":{"type":"solid","color":{"_replace":[{"param":"contBhdlTxt"}]},"isBlack":true,"isSimple":true},"disabled":{"type":"solid","color":"#CCCCCCCC","isBlack":true,"isSimple":true}}}}},"events":{"calPict":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0.78}}]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"2px","color":"#FF000000"}}}}}},"comment":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF"}}},"panel":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFF0F0F0"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FFCCCCCC","width":"1px"}}}}}},"images":{"image1":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":1},"if":0.3},{"s":{"mul":0.2},"l":{"mul":0,"add":0.76},"a":{"mul":0,"add":1}}]}]},"width":"1px"},"top":{"color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":1},"if":0.3},{"s":{"mul":0.2},"l":{"mul":0,"add":0.76},"a":{"mul":0,"add":1}}]}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":1},"if":0.3},{"s":{"mul":0.2},"l":{"mul":0,"add":0.76},"a":{"mul":0,"add":1}}]}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":1},"if":0.3},{"s":{"mul":0.2},"l":{"mul":0,"add":0.76},"a":{"mul":0,"add":1}}]}]},"width":"1px"}}}}},"image2":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FF000000","width":"1px"},"top":{"color":"#FF000000","width":"1px"},"right":{"color":"#FF000000","width":"1px"},"left":{"color":"#FF000000","width":"1px"}}}}},"image3":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FF000000","shadow":{"isInset":false,"x":"0px","y":"2px","blur":"7px","color":"#b2000000"}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FFFFFFFF","width":"5px"},"top":{"color":"#FFFFFFFF","width":"5px"},"right":{"color":"#FFFFFFFF","width":"5px"},"left":{"color":"#FFFFFFFF","width":"5px"}}}}},"catImage":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000","shadow":[{"isInset":false,"x":"0px","y":"0px","blur":"1px","color":"#FF000000"},{"isInset":true,"x":"0px","y":"0px","blur":"0px 3px","color":"#FFFFFFFF"},{"isInset":true,"x":"0px","y":"0px","blur":"1px 3px","color":"#66000000"}]},"clicked":{"type":"solid","color":"#00000000","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"3px","color":"#CC000000"}},"selected":{"type":"solid","color":"#00000000","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"3px","color":"#CC000000"}}}},"bgGrad":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#00000000","location":0},{"color":"#00000000","location":0.47},{"color":"#59000000","location":1}],"shadow":[{"isInset":false,"x":"0px","y":"0px","blur":"1px","color":"#FF000000"},{"isInset":true,"x":"0px","y":"0px","blur":"0px 3px","color":"#FFFFFFFF"},{"isInset":true,"x":"0px","y":"0px","blur":"1px 3px","color":"#66000000"}]}}},"txt":{"type":"text","data":{"default":{"color":"#FFFFFFFF","shadow":[{"x":"0px","y":"0px","blur":"1px","color":"#FF000000"},{"x":"1px","y":"1px","blur":"3px","color":"#CC000000"}]}}}},"imgBtn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#FF000000"}},"clicked":{"type":"solid","color":"#FFFFFFFF"},"selected":{"type":"solid","color":"#FFFFFFFF"}}},"overlayBg":{"type":"background","data":{"default":{"type":"solid","color":"#99000000"},"clicked":{"type":"solid","color":"#00000000"},"selected":{"type":"solid","color":"#00000000"}}},"brdr":{"type":"border","data":{"default":{"left":{"color":"#ffffffff","width":"3px"},"right":{"color":"#ffffffff","width":"3px"},"bottom":{"color":"#ffffffff","width":"3px"},"top":{"color":"#ffffffff","width":"3px"}},"clicked":{"bottom":{"color":"#00000000","width":"0px"},"right":{"color":"#00000000","width":"0px"},"left":{"color":"#00000000","width":"0px"},"top":{"color":"#00000000","width":"0px"}},"selected":{"bottom":{"color":"#00000000","width":"0px"},"right":{"color":"#00000000","width":"0px"},"left":{"color":"#00000000","width":"0px"},"top":{"color":"#00000000","width":"0px"}}}}}},"coupons":{"claimed":{"txt":{"type":"text","data":{"default":{"color":"#FFFFFFFF"}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FF9cba3e","shadow":{"isInset":true,"x":"0px","y":"-1px","blur":"3px","color":"#96000000"}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FFFFFFFF"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"width":"1px","color":"#FF2a2a2a"}}}}},"notClaimed":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg"}]},"shadow":{"isInset":true,"x":"0px","y":"-1px","blur":"3px","color":"#96000000"}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"style":"dotted","width":"1px","color":"#FF2A2A2A"}}}}}},"punch":{"wideBg":{"type":"background","data":{"default":{"type":"solid","color":"#B2000000"}}},"bgImage":{"overlayBg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0,"add":0.48}}]}]}}}}},"errTxt":{"type":"text","data":{"default":{"color":"#FFB60021"}}},"slot":{"whole":{"bg":{"type":"svg","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}}}},"overlay":{"type":"svg","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn","params":[{"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":0.33},"if":0.7},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.33}}]}]}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"actBtn","params":[{"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":1},"if":0.7},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":1}}]}]}}}}},"punch":{"bg":{"type":"svg","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}}}},"overlay":{"type":"svg","data":{"default":{"type":"solid","color":"#FFFFFFFF"}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}}}}}}}},"navigation":{"type":3}},"meta":{"bgImage":"http:\/\/storage.conduit.com\/Mobile\/69\/6d\/69bd6fb9-626d-4f8c-9313-9563dc5d0b6e\/Images\/a17fa906-8427-4099-9d1f-2867f62a0172.png","material":0,"isRtl":false,"culture":"en-US","header":{"type":1,"content":"http:\/\/storage.conduit.com\/Mobile\/69\/6d\/69bd6fb9-626d-4f8c-9313-9563dc5d0b6e\/Images\/1033149b-c97f-41da-b9c1-8150cd270977.png"}},"settings":{"brand":{"name":null,"link":null,"showAppLinks":true},"ga":{"trckId":"UA-46674138-1"},"ads":{"enabled":false,"fullScreenAdEnabled":null,"bottomBarAdEnabled":null,"bottomBarSwitchInterval":null,"adBarCycles":null,"fullScreenAdDisplayDuration":null,"fullScreenAdTO":null,"fullScreenAdShowTimespan":null,"fullScreenAdSupportedPages":null,"providers":null},"overrideServices":[{"key":"CMS_TWITTER_QUERY_GET","version":3,"params":{}},{"key":"CMS_TWITTER_USER_GET","version":3,"params":{}}],"fbAccessToken":"AAACeZBZANVcJ0BALWdkZBkVMprgCHf89vvzV3bq47rmnXHXXRnFbOhtwvU0k0tbUcL1aEjCQgZCrZCOhldBPeaBZAymqaZAyZBUZD","env":3,"providers":[{"id":0,"settings":[{"key":"googleMapAPIVersion","value":"1"}]}]},"details":{"appHomeUrl":"http:\/\/m.luckydog.4yourmobile.com"},"pages":[{"id":"7e56f979-669a-4a2c-a56f-b2d77092f02e","label":"Home Page","icon":"http:\/\/images.mobile.conduit-services.com\/icon\/external\/?src=http%3A%2F%2Fstorage.conduit.com%2FMobile%2F69%2F6d%2F69bd6fb9-626d-4f8c-9313-9563dc5d0b6e%2FImages%2F80d88bea-283b-4728-adc3-f58b552de28b.png","deviceIcon":null,"type":"5a8368df-6ebd-c0f2-2d82-e173c1f33d40","version":null,"minVersion":"2.0.0.0","devicesMeta":{"layouts":[],"layout":null,"pageLayout":-1,"items":[{"buttons":{"facebook":"https:\/\/www.facebook.com\/luckydoglkn","twitter":"https:\/\/twitter.com\/luckydoglkn","email":"luckydoglkn@gmail.com","webSite":"http:\/\/luckydoglkn.com\/"},"list":[{"title":"{$HtmlTextAboutUsItemTitleHours}","icon":"http:\/\/storage.conduit.com\/Images\/Mobile\/controlpanel\/AboutUs\/icons_white\/Hours.png","iconBlack":"http:\/\/storage.conduit.com\/Images\/Mobile\/controlpanel\/AboutUs\/icons_black\/Hours.png","dataType":"hours","data":{"hours":[]}},{"title":"{$HtmlTextAboutUsItemTitleServices}","icon":"http:\/\/storage.conduit.com\/Images\/Mobile\/controlpanel\/AboutUs\/icons_white\/Services.png","iconBlack":"http:\/\/storage.conduit.com\/Images\/Mobile\/controlpanel\/AboutUs\/icons_black\/Services.png","dataType":"list","data":{"list":["Bar","Dog Grooming","Kennels"]}},{"title":"{$HtmlTextAboutUsItemTitleSpecialties}","icon":"http:\/\/storage.conduit.com\/Images\/Mobile\/controlpanel\/AboutUs\/icons_white\/Specialties.png","iconBlack":"http:\/\/storage.conduit.com\/Images\/Mobile\/controlpanel\/AboutUs\/icons_black\/Specialties.png","dataType":"list","data":{"list":["Bar","Dog Grooming","Kennels"]}},{"title":"{$HtmlTextAboutUsItemTitleParking}","icon":"http:\/\/storage.conduit.com\/Images\/Mobile\/controlpanel\/AboutUs\/icons_white\/Parking.png","iconBlack":"http:\/\/storage.conduit.com\/Images\/Mobile\/controlpanel\/AboutUs\/icons_black\/Parking.png","dataType":"list","data":{"list":["Parking Lot"]}}],"name":"Lucky Dog Bark and Brew","about":"Kick back and relax in our bar where you can watch your favorite sporting event in the bar and lounge!\u000d\u000a\u000d\u000aOur bar offers beer wine, liquor, soft drinks, and an espresso bar for you coffee lovers. We do not serve food, however, you are welcome to enjoy take out from one of the area restaurants, bring your own or grab one of our snacks and candy available at the bar.  \u000d\u000aWe also have the NFL Package and College Game Day so you can watch all your favorite games on one of our large tv's both inside and out! ","description":"The Lucky Dog is a membership bar, but you can certainly come as a GUEST to come check it out!   Each owner will be charged a $10.00 annual member fee per family. Each owner must sign a waiver that their dogs are up to date on all shots. We also have a right to not allow aggressive dogs in.  \u000a\u000aHours are:  Bar –\u000aMonday through Thursday  5 – 10\u000aFriday  4- 12\u000aSaturday 12noon  - 12\u000aSunday 12 – 10pm\u000a\u000ao   Daycare, Boarding & Grooming:\u000aMonday through Friday  6am  - 9pm\u000aSat & Sun 7am – 9pm\u000a\u000aBecause of the nature of our business, we will not have food prepared on site. We will work however with local Cornelius restaurants to have takeout food available to our customers. \u000a\u000aCustomers will also have the option of bringing in their own food. Just as with public dog parks, all dog owners will be responsible for their dogs. \u000a\u000aThe Lucky Dog is cleaned professionally & extensively on a daily basis. Numerous receptacles are provided for animal waste, with employees ensuring prompt removal of any animal waste.","imgUrl":"http:\/\/storage.conduit.com\/Mobile\/69\/6d\/69bd6fb9-626d-4f8c-9313-9563dc5d0b6e\/Images\/5b8ef7cd-0d2d-4025-aec3-68efc4ca4974.jpg"}]},"meta":{"layout":null,"pageLayout":-1,"items":[{"buttons":{"facebook":"https:\/\/www.facebook.com\/luckydoglkn","twitter":"https:\/\/twitter.com\/luckydoglkn","email":"luckydoglkn@gmail.com","webSite":"http:\/\/luckydoglkn.com\/"},"list":[{"title":"{$HtmlTextAboutUsItemTitleHours}","icon":"http:\/\/storage.conduit.com\/Images\/Mobile\/controlpanel\/AboutUs\/icons_white\/Hours.png","iconBlack":"http:\/\/storage.conduit.com\/Images\/Mobile\/controlpanel\/AboutUs\/icons_black\/Hours.png","dataType":"hours","data":{"hours":[]}},{"title":"{$HtmlTextAboutUsItemTitleServices}","icon":"http:\/\/storage.conduit.com\/Images\/Mobile\/controlpanel\/AboutUs\/icons_white\/Services.png","iconBlack":"http:\/\/storage.conduit.com\/Images\/Mobile\/controlpanel\/AboutUs\/icons_black\/Services.png","dataType":"list","data":{"list":["Bar","Dog Grooming","Kennels"]}},{"title":"{$HtmlTextAboutUsItemTitleSpecialties}","icon":"http:\/\/storage.conduit.com\/Images\/Mobile\/controlpanel\/AboutUs\/icons_white\/Specialties.png","iconBlack":"http:\/\/storage.conduit.com\/Images\/Mobile\/controlpanel\/AboutUs\/icons_black\/Specialties.png","dataType":"list","data":{"list":["Bar","Dog Grooming","Kennels"]}},{"title":"{$HtmlTextAboutUsItemTitleParking}","icon":"http:\/\/storage.conduit.com\/Images\/Mobile\/controlpanel\/AboutUs\/icons_white\/Parking.png","iconBlack":"http:\/\/storage.conduit.com\/Images\/Mobile\/controlpanel\/AboutUs\/icons_black\/Parking.png","dataType":"list","data":{"list":["Parking Lot"]}}],"name":"Lucky Dog Bark and Brew","about":"Kick back and relax in our bar where you can watch your favorite sporting event in the bar and lounge!\u000d\u000a\u000d\u000aOur bar offers beer wine, liquor, soft drinks, and an espresso bar for you coffee lovers. We do not serve food, however, you are welcome to enjoy take out from one of the area restaurants, bring your own or grab one of our snacks and candy available at the bar.  \u000d\u000aWe also have the NFL Package and College Game Day so you can watch all your favorite games on one of our large tv's both inside and out! ","description":"The Lucky Dog is a membership bar, but you can certainly come as a GUEST to come check it out!   Each owner will be charged a $10.00 annual member fee per family. Each owner must sign a waiver that their dogs are up to date on all shots. We also have a right to not allow aggressive dogs in.  \u000a\u000aHours are:  Bar –\u000aMonday through Thursday  5 – 10\u000aFriday  4- 12\u000aSaturday 12noon  - 12\u000aSunday 12 – 10pm\u000a\u000ao   Daycare, Boarding & Grooming:\u000aMonday through Friday  6am  - 9pm\u000aSat & Sun 7am – 9pm\u000a\u000aBecause of the nature of our business, we will not have food prepared on site. We will work however with local Cornelius restaurants to have takeout food available to our customers. \u000a\u000aCustomers will also have the option of bringing in their own food. Just as with public dog parks, all dog owners will be responsible for their dogs. \u000a\u000aThe Lucky Dog is cleaned professionally & extensively on a daily basis. Numerous receptacles are provided for animal waste, with employees ensuring prompt removal of any animal waste.","imgUrl":"http:\/\/storage.conduit.com\/Mobile\/69\/6d\/69bd6fb9-626d-4f8c-9313-9563dc5d0b6e\/Images\/5b8ef7cd-0d2d-4025-aec3-68efc4ca4974.jpg"}]},"displayDevices":0,"alias":"home-page"},{"id":"93e22d9b-299b-45cd-888d-39ef999584c8","label":"Events","icon":"http:\/\/images.mobile.conduit-services.com\/icon\/external\/?src=http%3A%2F%2Fstorage.conduit.com%2FMobile%2F69%2F6d%2F69bd6fb9-626d-4f8c-9313-9563dc5d0b6e%2FImages%2Fab6dfc37-0bcf-4474-83ff-a21775969eed.png","deviceIcon":null,"type":"1002937d-8b19-40de-9df5-ba0d1ea2fbb2","version":null,"minVersion":"2.0.0.0","devicesMeta":{"layouts":[],"layout":null,"pageLayout":-1,"items":[{"title":"Calendar","params":{"id":"354980607876603","type":3,"extraInfo":{}},"views":[{"title":"{$HtmlTextEventsFutureEvents}","since":"$date","until":"$date+6m","extraInfo":{"order":"asc"}},{"title":"{$HtmlTextEventsPastEvents}","since":"$date-2m","until":"$date","extraInfo":{"order":"desc"}}],"id":"a6540547-bb9a-76b2-759d-d8e6b95ad010","feed":"luckydoglkn","description":null}]},"meta":{"layout":null,"pageLayout":-1,"items":[{"title":"Calendar","params":{"id":"354980607876603","type":3,"extraInfo":{}},"views":[{"title":"{$HtmlTextEventsFutureEvents}","since":"$date","until":"$date+6m","extraInfo":{"order":"asc"}},{"title":"{$HtmlTextEventsPastEvents}","since":"$date-2m","until":"$date","extraInfo":{"order":"desc"}}],"id":"a6540547-bb9a-76b2-759d-d8e6b95ad010","feed":"luckydoglkn","description":null}]},"displayDevices":0,"alias":"events"},{"id":"0129815a-e38b-430a-92df-741b1e0604b2","label":"Contact us","icon":"http:\/\/images.mobile.conduit-services.com\/icon\/external\/?src=http%3A%2F%2Fstorage.conduit.com%2FMobile%2F69%2F6d%2F69bd6fb9-626d-4f8c-9313-9563dc5d0b6e%2FImages%2F212191cf-673d-4acc-b12f-519d9450688a.png","deviceIcon":null,"type":"083e52df-721d-4ca4-efa3-25161d344f40","version":null,"minVersion":"1.9.0.0","devicesMeta":{"layouts":[],"layout":null,"pageLayout":1,"items":[{"id":"1e1ee603-6e68-9006-81d6-a57f987e67e2","address":"19607 Statesville Rd Cornelius, NC 28031","phone":"704-896-5550","url":"http:\/\/ luckydogbarkandbrew.com","urlTitle":"Lucky Dog Website","mail":"luckydoglkn@gmail.com","fax":"888.758.8159","header":"Lucky dog Bark and Brew ","logoImgUrl":"http:\/\/storage.conduit.com\/Mobile\/69\/6d\/69bd6fb9-626d-4f8c-9313-9563dc5d0b6e\/Images\/e49dfd9d-645a-4e25-88bd-0212a7ec20bf.jpg","text":"Randy and Kelly Waugh are the creators of the Lake Norman Lucky Dog Bark & Brew. Their idea stems from a need with their own pets. They love their dogs and love their sports, so why not create a place where you can have both! There is a need in the area and together they decided after many years working in the corporate world to branch out and start their dream business. With four rescued dogs of their own, they also wanted a place where people who can't have dogs are still welcome to come and enjoy them. The goal is to make a full service dog friendly location filled with anything and everything a loyal dog owner would want. So they filled it with Full Service Grooming, Doggie Day care that is affordable and a bar where your dog can run off leash safely throughout the many indoor and outdoor areas. Its a dream for any dog or dog owner. Don't forget, you don't have to have a dog to come, Just MUST LOVE DOGS","lat":35.481901,"long":-80.87365,"description":null}]},"meta":{"layout":null,"pageLayout":1,"items":[{"id":"1e1ee603-6e68-9006-81d6-a57f987e67e2","address":"19607 Statesville Rd Cornelius, NC 28031","phone":"704-896-5550","url":"http:\/\/ luckydogbarkandbrew.com","urlTitle":"Lucky Dog Website","mail":"luckydoglkn@gmail.com","fax":"888.758.8159","header":"Lucky dog Bark and Brew ","logoImgUrl":"http:\/\/storage.conduit.com\/Mobile\/69\/6d\/69bd6fb9-626d-4f8c-9313-9563dc5d0b6e\/Images\/e49dfd9d-645a-4e25-88bd-0212a7ec20bf.jpg","text":"Randy and Kelly Waugh are the creators of the Lake Norman Lucky Dog Bark & Brew. Their idea stems from a need with their own pets. They love their dogs and love their sports, so why not create a place where you can have both! There is a need in the area and together they decided after many years working in the corporate world to branch out and start their dream business. With four rescued dogs of their own, they also wanted a place where people who can't have dogs are still welcome to come and enjoy them. The goal is to make a full service dog friendly location filled with anything and everything a loyal dog owner would want. So they filled it with Full Service Grooming, Doggie Day care that is affordable and a bar where your dog can run off leash safely throughout the many indoor and outdoor areas. Its a dream for any dog or dog owner. Don't forget, you don't have to have a dog to come, Just MUST LOVE DOGS","lat":35.481901,"long":-80.87365,"description":null}]},"displayDevices":0,"alias":"contact-us"},{"id":"9c43db25-4d52-4508-9c39-9ddd03c3e81a","label":"Map","icon":"http:\/\/images.mobile.conduit-services.com\/icon\/external\/?src=http%3A%2F%2Fstorage.conduit.com%2FMobile%2F69%2F6d%2F69bd6fb9-626d-4f8c-9313-9563dc5d0b6e%2FImages%2F5af3713a-2f12-404a-9a70-2ce48cd05f93.png","deviceIcon":null,"type":"aca2f190-b22b-920d-f12a-998101ad4b70","version":null,"minVersion":"2.0.0.0","devicesMeta":{"layouts":[],"layout":null,"pageLayout":-1,"items":[{"address":{"text":"19607 Statesville Rd Cornelius NC 28031"},"header":"Lucky Dog Bark and Brew","location":{"lat":"35.481901","lng":"-80.87365"},"description":null}]},"meta":{"layout":null,"pageLayout":-1,"items":[{"address":{"text":"19607 Statesville Rd Cornelius NC 28031"},"header":"Lucky Dog Bark and Brew","location":{"lat":"35.481901","lng":"-80.87365"},"description":null}]},"displayDevices":0,"alias":"map"},{"id":"9ee0845b-88a9-41cd-89ae-d423730042dd","label":"Photos","icon":"http:\/\/images.mobile.conduit-services.com\/icon\/external\/?src=http%3A%2F%2Fstorage.conduit.com%2FMobile%2F69%2F6d%2F69bd6fb9-626d-4f8c-9313-9563dc5d0b6e%2FImages%2F2f9129ea-4dc5-4655-8e38-ad38474c6c72.png","deviceIcon":null,"type":"3b11bcdf-ba5e-4eaa-9059-ea580b3f1681","version":null,"minVersion":"0.0.0.0","devicesMeta":{"layouts":[],"layout":null,"pageLayout":8,"feeds":[{"title":"Album","params":{"albumId":"358778557496808","albumName":"Timeline Photos"},"type":"facebook","id":"0d75bb07-761b-378f-485d-416f7a177c24","userName":"luckydoglkn"}]},"meta":{"layout":null,"pageLayout":8,"feeds":[{"title":"Album","params":{"albumId":"358778557496808","albumName":"Timeline Photos"},"type":"facebook","id":"0d75bb07-761b-378f-485d-416f7a177c24","userName":"luckydoglkn"}]},"displayDevices":0,"alias":"photos"},{"id":"bb4b371d-add4-45e3-a6e6-bed915427bea","label":"Instagram","icon":"http:\/\/images.mobile.conduit-services.com\/icon\/external\/?src=http%3A%2F%2Fstorage.conduit.com%2FMobile%2F69%2F6d%2F69bd6fb9-626d-4f8c-9313-9563dc5d0b6e%2FImages%2F499f241b-b036-44f7-a88c-9a8e043bfca1.png","deviceIcon":null,"type":"e0adcb11-f7bb-8107-1cd0-77690221f31c","version":null,"minVersion":"2.7.0.5","devicesMeta":{"layouts":[],"layout":null,"pageLayout":-1,"items":[{"id":"afcd05ac-e77f-31b7-ba60-730403e2c9ca","type":"instagram","title":"Instagram","userTitle":"BarkandBrew","userName":"600040495","description":null}]},"meta":{"layout":null,"pageLayout":-1,"items":[{"id":"afcd05ac-e77f-31b7-ba60-730403e2c9ca","type":"instagram","title":"Instagram","userTitle":"BarkandBrew","userName":"600040495","description":null}]},"displayDevices":0,"alias":"instagram"},{"id":"656de3b0-a6fe-4ced-92bf-4bd29672b2b4","label":"You Tube","icon":"http:\/\/images.mobile.conduit-services.com\/icon\/external\/?src=http%3A%2F%2Fstorage.conduit.com%2FMobile%2F69%2F6d%2F69bd6fb9-626d-4f8c-9313-9563dc5d0b6e%2FImages%2F99cf7c6c-fe54-435a-a850-c11d1b243bd5.png","deviceIcon":null,"type":"4680c3f3-e767-4ebf-b112-9ba769c3ff2a","version":null,"minVersion":"2.0.0.0","devicesMeta":{"layouts":[],"layout":null,"pageLayout":-1,"items":[{"title":"Canine Scholars","params":{"type":3,"className":"youtube","icon":"\/Images\/Providers\/Video\/small_icon_3.png","params":{"isOpenSearch":true},"youtube":{"type":"uploads","query":"caninescholars","sort":{}},"url":"http:\/\/gdata.youtube.com\/feeds\/api\/users\/caninescholars\/uploads\/?v=2&format=5&orderby=published","sort":null},"id":"2b2dfcd2-31ee-39da-f29d-4bb56951ec6e","description":null},{"title":"Lucky Dog LKN","params":{"type":3,"className":"youtube","icon":"\/Images\/Providers\/Video\/small_icon_3.png","params":{"isOpenSearch":true},"youtube":{"type":"favorites","query":"luckydogbarkandbrew","sort":{},"user":"luckydoglkn"},"url":"http:\/\/gdata.youtube.com\/feeds\/api\/users\/luckydogbarkandbrew\/favorites\/?v=2&format=5&orderby=published","sort":null},"id":"9d4418d1-e971-94d5-2d1f-db406d647992","description":null},{"title":"Dog TV","params":{"type":3,"className":"youtube","icon":"\/Images\/Providers\/Video\/small_icon_3.png","params":{"isOpenSearch":true},"youtube":{"type":"playlist","query":"PL137AB4AEB698A592","sort":{},"user":"DOGTVWORLD"},"url":"https:\/\/gdata.youtube.com\/feeds\/api\/playlists\/PL137AB4AEB698A592\/?v=2&format=5&orderby=position","sort":null},"id":"e2716570-01ab-54f0-9140-e4080db51567","description":null}]},"meta":{"layout":null,"pageLayout":-1,"items":[{"title":"Canine Scholars","params":{"type":3,"className":"youtube","icon":"\/Images\/Providers\/Video\/small_icon_3.png","params":{"isOpenSearch":true},"youtube":{"type":"uploads","query":"caninescholars","sort":{}},"url":"http:\/\/gdata.youtube.com\/feeds\/api\/users\/caninescholars\/uploads\/?v=2&format=5&orderby=published","sort":null},"id":"2b2dfcd2-31ee-39da-f29d-4bb56951ec6e","description":null},{"title":"Lucky Dog LKN","params":{"type":3,"className":"youtube","icon":"\/Images\/Providers\/Video\/small_icon_3.png","params":{"isOpenSearch":true},"youtube":{"type":"favorites","query":"luckydogbarkandbrew","sort":{},"user":"luckydoglkn"},"url":"http:\/\/gdata.youtube.com\/feeds\/api\/users\/luckydogbarkandbrew\/favorites\/?v=2&format=5&orderby=published","sort":null},"id":"9d4418d1-e971-94d5-2d1f-db406d647992","description":null},{"title":"Dog TV","params":{"type":3,"className":"youtube","icon":"\/Images\/Providers\/Video\/small_icon_3.png","params":{"isOpenSearch":true},"youtube":{"type":"playlist","query":"PL137AB4AEB698A592","sort":{},"user":"DOGTVWORLD"},"url":"https:\/\/gdata.youtube.com\/feeds\/api\/playlists\/PL137AB4AEB698A592\/?v=2&format=5&orderby=position","sort":null},"id":"e2716570-01ab-54f0-9140-e4080db51567","description":null}]},"displayDevices":0,"alias":"you-tube"},{"id":"12ef2a18-4e7b-41e9-af5f-67ee23362584","label":"Loyalty Card","icon":"http:\/\/images.mobile.conduit-services.com\/icon\/external\/?src=http%3A%2F%2Fstorage.conduit.com%2FMobile%2F69%2F6d%2F69bd6fb9-626d-4f8c-9313-9563dc5d0b6e%2FImages%2F83899c4b-eec6-4f67-a982-620265c45acc.png","deviceIcon":null,"type":"9953766f-6b47-4878-8d38-b9cde750fe58","version":null,"minVersion":"4.0.0.0","devicesMeta":{"layouts":[],"layout":null,"pageLayout":-1,"items":[{"id":"f2f0a35e-74fd-3d0e-ef65-56dcaee9b936","params":{"listId":"33fbbf28-a5ba-4dcd-90c6-04572a2c5aab","type":"contenthost"},"description":null}]},"meta":{"layout":null,"pageLayout":-1,"items":[{"id":"f2f0a35e-74fd-3d0e-ef65-56dcaee9b936","params":{"listId":"33fbbf28-a5ba-4dcd-90c6-04572a2c5aab","type":"contenthost"},"description":null}]},"displayDevices":0,"alias":"loyalty-card"},{"id":"cbfd4f58-0592-4161-a9d5-8058a4725d01","label":"Drink Specials ","icon":"http:\/\/images.mobile.conduit-services.com\/icon\/external\/?src=http%3A%2F%2Fstorage.conduit.com%2FMobile%2F69%2F6d%2F69bd6fb9-626d-4f8c-9313-9563dc5d0b6e%2FImages%2F1104177d-78c7-4400-b188-e56f12894981.png","deviceIcon":null,"type":"0255eb38-1fb5-4b65-abee-b6fdb69c8f07","version":null,"minVersion":"3.5.0.0","devicesMeta":{"layouts":[],"layout":null,"pageLayout":-1,"items":[{"id":"e92b0cf2-826a-53c7-4502-67702cb46a49","params":{"listId":"07f7712e-afa3-4730-a2a5-11460fcf4d49","type":"contenthost"},"description":null}]},"meta":{"layout":null,"pageLayout":-1,"items":[{"id":"e92b0cf2-826a-53c7-4502-67702cb46a49","params":{"listId":"07f7712e-afa3-4730-a2a5-11460fcf4d49","type":"contenthost"},"description":null}]},"displayDevices":0,"alias":"drink-specials"},{"id":"a42e48b8-b811-45a4-93e7-7015011caea8","label":"Canine Scholars","icon":"http:\/\/images.mobile.conduit-services.com\/icon\/external\/?src=http%3A%2F%2Fstorage.conduit.com%2FMobile%2F69%2F6d%2F69bd6fb9-626d-4f8c-9313-9563dc5d0b6e%2FImages%2F49548bc7-395b-4f0d-b121-0c1436c1c5fd.png","deviceIcon":null,"type":"51a61af7-1e90-4d68-88db-b1e69a0cca59","version":null,"minVersion":"0.0.0.0","devicesMeta":{"layouts":[],"layout":null,"pageLayout":0,"feeds":[{"id":"458b2a75-1fd0-5e97-cea3-b7738099e24e","url":"http:\/\/caninescholars.com\/feed\/","title":"Canine Scholars","params":{"addGeo":false,"sort":"Default","expiration":0}},{"id":"a27fde9d-1c42-2f3e-6df0-0b4b3941d3cc","url":"http:\/\/www.vetstreet.com\/rss\/news-feed.jsp?Categories=siteContentTags:training:cat-training:dog-training:crate-training:kitten-training:puppy-training:house-training","title":"Pet Training","params":{"addGeo":false,"sort":"Default","expiration":0}},{"id":"84e4da66-9994-b8c7-d38f-5db8502e276e","url":"http:\/\/www.vetstreet.com\/rss\/news-feed.jsp?Categories=siteContentTags:puppy-training:new-dog-owner-guide:puppies:puppy-issues:puppy-health-conditions","title":"Puppy Tips","params":{"addGeo":false,"sort":"Default","expiration":0}}]},"meta":{"layout":null,"pageLayout":0,"feeds":[{"id":"458b2a75-1fd0-5e97-cea3-b7738099e24e","url":"http:\/\/caninescholars.com\/feed\/","title":"Canine Scholars","params":{"addGeo":false,"sort":"Default","expiration":0}},{"id":"a27fde9d-1c42-2f3e-6df0-0b4b3941d3cc","url":"http:\/\/www.vetstreet.com\/rss\/news-feed.jsp?Categories=siteContentTags:training:cat-training:dog-training:crate-training:kitten-training:puppy-training:house-training","title":"Pet Training","params":{"addGeo":false,"sort":"Default","expiration":0}},{"id":"84e4da66-9994-b8c7-d38f-5db8502e276e","url":"http:\/\/www.vetstreet.com\/rss\/news-feed.jsp?Categories=siteContentTags:puppy-training:new-dog-owner-guide:puppies:puppy-issues:puppy-health-conditions","title":"Puppy Tips","params":{"addGeo":false,"sort":"Default","expiration":0}}]},"displayDevices":0,"alias":"canine-scholars"},{"id":"43d6a850-3a43-4e0a-b007-8aad1542a886","label":"Facebook","icon":"http:\/\/images.mobile.conduit-services.com\/icon\/external\/?src=http%3A%2F%2Fstorage.conduit.com%2FMobile%2F69%2F6d%2F69bd6fb9-626d-4f8c-9313-9563dc5d0b6e%2FImages%2Ff702e346-da49-466e-b171-4fd26a6b2304.png","deviceIcon":null,"type":"df7d11f3-233c-4d49-8f2a-d1886e07c641","version":null,"minVersion":"0.0.0.0","devicesMeta":{"layouts":[],"layout":null,"pageLayout":0,"channels":[{"id":"2414eeaa-cca3-5957-b2d1-1b936fbdfa8d","user":"luckydoglkn","postsSource":"posts","title":"Channel"}]},"meta":{"layout":null,"pageLayout":0,"channels":[{"id":"2414eeaa-cca3-5957-b2d1-1b936fbdfa8d","user":"luckydoglkn","postsSource":"posts","title":"Channel"}]},"displayDevices":0,"alias":"facebook"},{"id":"a1908b2d-f53c-48b0-8355-4e35d2e7dca4","label":"Twitter","icon":"http:\/\/images.mobile.conduit-services.com\/icon\/external\/?src=http%3A%2F%2Fstorage.conduit.com%2FMobile%2F69%2F6d%2F69bd6fb9-626d-4f8c-9313-9563dc5d0b6e%2FImages%2F10ff8481-e937-4893-be16-85f7abd532a1.png","deviceIcon":null,"type":"a77583ef-758f-45f3-9ad1-9704d82a2154","version":null,"minVersion":"0.0.0.0","devicesMeta":{"layouts":[],"layout":null,"feeds":[{"id":"10c60ead-31f6-4706-97b6-75a75b500ae9","type":0,"userName":"luckydoglkn","params":null,"title":"Lucky Dog Bark&Brew"}],"pageLayout":0},"meta":{"layout":null,"feeds":[{"id":"10c60ead-31f6-4706-97b6-75a75b500ae9","type":0,"userName":"luckydoglkn","params":null,"title":"Lucky Dog Bark&Brew"}],"pageLayout":0},"displayDevices":0,"alias":"twitter"},{"id":"2e89f0d8-66cd-4a4e-bf7f-69dde7c61c76","label":"Web Form","icon":"http:\/\/images.mobile.conduit-services.com\/icon\/external\/?src=http%3A%2F%2Fstorage.conduit.com%2FMobile%2F69%2F6d%2F69bd6fb9-626d-4f8c-9313-9563dc5d0b6e%2FImages%2F112cc94d-eb78-45f4-9ca9-5cfcbac7b3c9.png","deviceIcon":null,"type":"38ab2b78-a1ad-42f8-8cb7-9475498c0f30","version":null,"minVersion":"3.4.0.0","devicesMeta":{"layouts":[],"layout":null,"pageLayout":-1,"items":[{"title":"form","params":{"extraInfo":{},"type":2},"id":"eeb29c35-28bb-a147-ed30-787a60da6998","reportId":"5e0e2d67-49d1-4f9a-b6de-a64a9796daa2","name":"Inquiry","reportVersion":"1","controls":[{"caption":"Name","type":"inputtext","type_name":"name","id":"_37913ccb-0c32-ed4e-e7fa-1d4c74a616ea","isMandatory":true,"isActive":true},{"caption":"Email","type":"inputtext","type_name":"email","id":"_3847e69a-425a-f6b6-11ef-a6e69e00c83f","isMandatory":true,"isActive":true,"subType":"email"},{"caption":"Phone","type":"inputtext","type_name":"phone","id":"_6bb43622-38c9-8df6-5e83-8f50770f2da5","isMandatory":false,"isActive":true,"subType":"tel"},{"caption":"Message","type":"textarea","type_name":"multiline","id":"_c4a7c7ca-4864-b688-f8cf-6fe3893f073c","isMandatory":true,"isActive":true},{"caption":"Photos","type":"photo","type_name":"photos","id":"_d79da21c-3a4a-04f5-fc1d-eb62d2943407","isMandatory":false,"isActive":true}],"success":{"message":"Thank you for your interest. We will get back to you soon."},"sendButton":{"caption":"Submit"},"description":null}]},"meta":{"layout":null,"pageLayout":-1,"items":[{"title":"form","params":{"extraInfo":{},"type":2},"id":"eeb29c35-28bb-a147-ed30-787a60da6998","reportId":"5e0e2d67-49d1-4f9a-b6de-a64a9796daa2","name":"Inquiry","reportVersion":"1","controls":[{"caption":"Name","type":"inputtext","type_name":"name","id":"_37913ccb-0c32-ed4e-e7fa-1d4c74a616ea","isMandatory":true,"isActive":true},{"caption":"Email","type":"inputtext","type_name":"email","id":"_3847e69a-425a-f6b6-11ef-a6e69e00c83f","isMandatory":true,"isActive":true,"subType":"email"},{"caption":"Phone","type":"inputtext","type_name":"phone","id":"_6bb43622-38c9-8df6-5e83-8f50770f2da5","isMandatory":false,"isActive":true,"subType":"tel"},{"caption":"Message","type":"textarea","type_name":"multiline","id":"_c4a7c7ca-4864-b688-f8cf-6fe3893f073c","isMandatory":true,"isActive":true},{"caption":"Photos","type":"photo","type_name":"photos","id":"_d79da21c-3a4a-04f5-fc1d-eb62d2943407","isMandatory":false,"isActive":true}],"success":{"message":"Thank you for your interest. We will get back to you soon."},"sendButton":{"caption":"Submit"},"description":null}]},"displayDevices":0,"alias":"web-form"},{"id":"2c8c45f2-fa39-4042-9bc3-add7aa3cdea9","label":"Share App.","icon":"http:\/\/images.mobile.conduit-services.com\/icon\/external\/?src=http%3A%2F%2Fstorage.conduit.com%2FMobile%2F69%2F6d%2F69bd6fb9-626d-4f8c-9313-9563dc5d0b6e%2FImages%2F098f8bc6-60dc-4821-bf8e-ec3781b10910.png","deviceIcon":null,"type":"fc6700a7-a11e-de90-93f8-7357f9f0037f","version":null,"minVersion":"2.7.0.5","devicesMeta":{"layouts":[],"layout":null,"pageLayout":-1,"items":[{"links":[{"url":"https:\/\/itunes.apple.com\/us\/app\/lucky-dog-bark-and-brew\/id731708502?ls=1&mt=8","imageUrl":"http:\/\/storage.conduit.com\/Mobile\/69\/6d\/69bd6fb9-626d-4f8c-9313-9563dc5d0b6e\/Images\/265a6945-e932-4c00-9436-661aa401d268.png"},{"url":"https:\/\/play.google.com\/store\/apps\/details?id=biz.app4mobile.app_b42bd08da0234860b90ece9d3657f556.app&hl=en","imageUrl":"http:\/\/storage.conduit.com\/Mobile\/69\/6d\/69bd6fb9-626d-4f8c-9313-9563dc5d0b6e\/Images\/086d67bb-d60c-42be-8ea9-d876ab627e9c.png"},{"url":"http:\/\/m.luckydog.4yourmobile.com\/landing\/Desktop","imageUrl":"http:\/\/storage.conduit.com\/Mobile\/69\/6d\/69bd6fb9-626d-4f8c-9313-9563dc5d0b6e\/Images\/97d667e1-a677-484b-b1c6-4a640ef4c7d2.png"},{"url":"http:\/\/storage.app4mobile.biz\/Mobile\/69\/6d\/69bd6fb9-626d-4f8c-9313-9563dc5d0b6e\/Images\/2dfae348-ebd9-45c1-b3f8-ec5502269e6b.png","imageUrl":"http:\/\/storage.conduit.com\/Mobile\/69\/6d\/69bd6fb9-626d-4f8c-9313-9563dc5d0b6e\/Images\/de2578b6-7b9e-4cac-9357-c21c6971ac58.png"}],"logoImgUrl":"http:\/\/storage.conduit.com\/Mobile\/69\/6d\/69bd6fb9-626d-4f8c-9313-9563dc5d0b6e\/Images\/e6c45f90-ac7d-4529-b977-c22dfd09e580.jpg","description":null}]},"meta":{"layout":null,"pageLayout":-1,"items":[{"links":[{"url":"https:\/\/itunes.apple.com\/us\/app\/lucky-dog-bark-and-brew\/id731708502?ls=1&mt=8","imageUrl":"http:\/\/storage.conduit.com\/Mobile\/69\/6d\/69bd6fb9-626d-4f8c-9313-9563dc5d0b6e\/Images\/265a6945-e932-4c00-9436-661aa401d268.png"},{"url":"https:\/\/play.google.com\/store\/apps\/details?id=biz.app4mobile.app_b42bd08da0234860b90ece9d3657f556.app&hl=en","imageUrl":"http:\/\/storage.conduit.com\/Mobile\/69\/6d\/69bd6fb9-626d-4f8c-9313-9563dc5d0b6e\/Images\/086d67bb-d60c-42be-8ea9-d876ab627e9c.png"},{"url":"http:\/\/m.luckydog.4yourmobile.com\/landing\/Desktop","imageUrl":"http:\/\/storage.conduit.com\/Mobile\/69\/6d\/69bd6fb9-626d-4f8c-9313-9563dc5d0b6e\/Images\/97d667e1-a677-484b-b1c6-4a640ef4c7d2.png"},{"url":"http:\/\/storage.app4mobile.biz\/Mobile\/69\/6d\/69bd6fb9-626d-4f8c-9313-9563dc5d0b6e\/Images\/2dfae348-ebd9-45c1-b3f8-ec5502269e6b.png","imageUrl":"http:\/\/storage.conduit.com\/Mobile\/69\/6d\/69bd6fb9-626d-4f8c-9313-9563dc5d0b6e\/Images\/de2578b6-7b9e-4cac-9357-c21c6971ac58.png"}],"logoImgUrl":"http:\/\/storage.conduit.com\/Mobile\/69\/6d\/69bd6fb9-626d-4f8c-9313-9563dc5d0b6e\/Images\/e6c45f90-ac7d-4529-b977-c22dfd09e580.jpg","description":null}]},"displayDevices":0,"alias":"share-app"},{"id":"95b2e45e-5024-4409-94f5-a700e46097bb","label":"Web links","icon":"http:\/\/images.mobile.conduit-services.com\/icon\/external\/?src=http%3A%2F%2Fstorage.conduit.com%2FMobile%2F69%2F6d%2F69bd6fb9-626d-4f8c-9313-9563dc5d0b6e%2FImages%2Fe9c36d95-9892-45dd-9bcf-4c6dff676361.png","deviceIcon":null,"type":"fc6700a7-a11e-de90-93f8-7357f9f0037f","version":null,"minVersion":"2.7.0.5","devicesMeta":{"layouts":[],"layout":null,"pageLayout":-1,"items":[{"text":"Useful Links","links":[{"url":"http:\/\/","imageUrl":"http:\/\/storage.conduit.com\/Mobile\/69\/6d\/69bd6fb9-626d-4f8c-9313-9563dc5d0b6e\/Images\/76a196d1-8da8-48e3-aea1-9ababacbd340.png"},{"title":"New Customers ","url":"https:\/\/secure.petexec.net\/newOwner.php?x=vK7d94l09s8="},{"url":"http:\/\/www.lknrescue.org\/","imageUrl":"http:\/\/s.conduit.com\/Mobile\/69\/6d\/69bd6fb9-626d-4f8c-9313-9563dc5d0b6e\/Images\/61d15cd7-8e88-40d6-bbae-6f26c8a198d1.png"}],"logoImgUrl":"http:\/\/storage.conduit.com\/Mobile\/69\/6d\/69bd6fb9-626d-4f8c-9313-9563dc5d0b6e\/Images\/fb66c326-5f4d-4e3a-85db-15ac8fb20cc0.jpg","description":null}]},"meta":{"layout":null,"pageLayout":-1,"items":[{"text":"Useful Links","links":[{"url":"http:\/\/","imageUrl":"http:\/\/storage.conduit.com\/Mobile\/69\/6d\/69bd6fb9-626d-4f8c-9313-9563dc5d0b6e\/Images\/76a196d1-8da8-48e3-aea1-9ababacbd340.png"},{"title":"New Customers ","url":"https:\/\/secure.petexec.net\/newOwner.php?x=vK7d94l09s8="},{"url":"http:\/\/www.lknrescue.org\/","imageUrl":"http:\/\/s.conduit.com\/Mobile\/69\/6d\/69bd6fb9-626d-4f8c-9313-9563dc5d0b6e\/Images\/61d15cd7-8e88-40d6-bbae-6f26c8a198d1.png"}],"logoImgUrl":"http:\/\/storage.conduit.com\/Mobile\/69\/6d\/69bd6fb9-626d-4f8c-9313-9563dc5d0b6e\/Images\/fb66c326-5f4d-4e3a-85db-15ac8fb20cc0.jpg","description":null}]},"displayDevices":0,"alias":"web-links"},{"id":"7ce8a7d7-7f54-4672-84bc-95ec29c44f9a","label":"Shopping","icon":"http:\/\/images.mobile.conduit-services.com\/icon\/external\/?src=http%3A%2F%2Fstorage.conduit.com%2FMobile%2F69%2F6d%2F69bd6fb9-626d-4f8c-9313-9563dc5d0b6e%2FImages%2F1685b445-7dcd-466a-ba43-42c196ed1913.png","deviceIcon":null,"type":"6181507a-fdf4-4b90-a270-cbd286603443","version":null,"minVersion":"3.2.0.0","devicesMeta":{"layouts":[],"layout":null,"pageLayout":-1,"items":[{"id":"205fe9c9-2045-68cb-caec-25e40bae7220","params":{"id":"34c6c82e-103c-4582-aaee-4c4da7c81e2b"},"meta":{"images":{"header":"http:\/\/storage.conduit.com\/Mobile\/69\/6d\/69bd6fb9-626d-4f8c-9313-9563dc5d0b6e\/Images\/0fe04631-e101-4763-a1f6-6f712935f4ed.jpg"}},"name":"Boutique","description":null}]},"meta":{"layout":null,"pageLayout":-1,"items":[{"id":"205fe9c9-2045-68cb-caec-25e40bae7220","params":{"id":"34c6c82e-103c-4582-aaee-4c4da7c81e2b"},"meta":{"images":{"header":"http:\/\/storage.conduit.com\/Mobile\/69\/6d\/69bd6fb9-626d-4f8c-9313-9563dc5d0b6e\/Images\/0fe04631-e101-4763-a1f6-6f712935f4ed.jpg"}},"name":"Boutique","description":null}]},"displayDevices":0,"alias":"shopping"},{"id":"c077decb-eee0-4112-8e69-f9e60133aed5","label":"Grooming Login","icon":"http:\/\/images.mobile.conduit-services.com\/icon\/external\/?src=http%3A%2F%2Fstorage.conduit.com%2FMobile%2F69%2F6d%2F69bd6fb9-626d-4f8c-9313-9563dc5d0b6e%2FImages%2F8f22eafa-4d2d-4862-b5dc-c273df6735fc.png","deviceIcon":null,"type":"083e52df-721d-4ca4-efa3-25161d344f40","version":null,"minVersion":"1.9.0.0","devicesMeta":{"layouts":[],"layout":null,"pageLayout":0,"items":[{"id":"1d52f73a-40b0-b706-2a3e-0d503b6b461a","urlTitle":"New Customer Signup","url":"https:\/\/secure.petexec.net\/newOwner.php?x=vK7d94l09s8=","phone":"704.896.5550","mail":"luckydoglkn@gmail.com","logoImgUrl":"http:\/\/storage.conduit.com\/Mobile\/69\/6d\/69bd6fb9-626d-4f8c-9313-9563dc5d0b6e\/Images\/c645ccbc-d91f-47d8-8b51-93e549a64126.png","header":"Grooming Signup and Login. ","text":"New customers please click the weblink. Existing customers use login and password. ","address":"19607 Statesville Road\u000d\u000aCornelius, North Carolina 28031","description":"<p><strong><a href=\"https:\/\/secure.petexec.net\/remoteLogin.php\">Existing Customers Login Here<\/a><\/strong><\/p>","lat":35.481901,"long":-80.87365}]},"meta":{"layout":null,"pageLayout":0,"items":[{"id":"1d52f73a-40b0-b706-2a3e-0d503b6b461a","urlTitle":"New Customer Signup","url":"https:\/\/secure.petexec.net\/newOwner.php?x=vK7d94l09s8=","phone":"704.896.5550","mail":"luckydoglkn@gmail.com","logoImgUrl":"http:\/\/storage.conduit.com\/Mobile\/69\/6d\/69bd6fb9-626d-4f8c-9313-9563dc5d0b6e\/Images\/c645ccbc-d91f-47d8-8b51-93e549a64126.png","header":"Grooming Signup and Login. ","text":"New customers please click the weblink. Existing customers use login and password. ","address":"19607 Statesville Road\u000d\u000aCornelius, North Carolina 28031","description":"<p><strong><a href=\"https:\/\/secure.petexec.net\/remoteLogin.php\">Existing Customers Login Here<\/a><\/strong><\/p>","lat":35.481901,"long":-80.87365}]},"displayDevices":0,"alias":"grooming-login"}],"modules":[],"version":"1.80.103.790","social":{"facebook":{"appId":"375757265883286"}},"globalAppId":"69bd6fb9-626d-4f8c-9313-9563dc5d0b6e"},"maxAge":1800,"serviceUrl":"http:\/\/app.mobile.conduit-services.com\/api\/app\/b42bd08d-a023-4860-b90e-ce9d3657f556\/2?appVersion={appVersion}"},{"data":{"albumName":"Timeline Photos","coverPhotoUrl":null,"description":null,"opeanSearch":null,"paging":{"next":"http:\/\/cms.mobile.conduit-services.com\/photos\/facebook\/luckydoglkn\/25\/25\/?params=%7b%22albumId%22%3a%22358778557496808%22%2c%22albumName%22%3a%22Timeline+Photos%22%2c%22expiration%22%3anull%2c%22isOpenSearch%22%3afalse%7d","nextUrl":"http:\/\/cms.mobile.conduit-services.com\/photos\/facebook\/luckydoglkn\/25\/25\/?params=%7b%22albumId%22%3a%22358778557496808%22%2c%22albumName%22%3a%22Timeline+Photos%22%2c%22expiration%22%3anull%2c%22isOpenSearch%22%3afalse%7d"},"photos":[{"description":null,"id":"721437274564266","largeImage":"https:\/\/scontent-b.xx.fbcdn.net\/hphotos-xfp1\/v\/t1.0-9\/10153851_721437274564266_9124044603507260706_n.jpg?oh=9caf8190592f187818bac384b7772acd&oe=53F8D20A","mediumImage":"https:\/\/scontent-b.xx.fbcdn.net\/hphotos-xfp1\/v\/t1.0-9\/p480x480\/10153851_721437274564266_9124044603507260706_n.jpg?oh=c7f2c83e658811cec956b8b3afcf0c0d&oe=53F2EFF4","photoTime":1400671207,"smallImage":"https:\/\/scontent-b.xx.fbcdn.net\/hphotos-xfp1\/v\/t1.0-9\/p130x130\/10153851_721437274564266_9124044603507260706_n.jpg?oh=263edb98c0e305c2ef93731c090cff1c&oe=53F899C1","socialInfo":{"imageUrl":"https:\/\/fbcdn-photos-f-a.akamaihd.net\/hphotos-ak-xfp1\/v\/t1.0-0\/10153851_721437274564266_9124044603507260706_s.jpg?oh=d55f91e58c9e3bb375c27c97e6a1c6c9&oe=53EFF8DE&__gda__=1409486423_724aecd9ae2cc8ec59630cb917280234","shortDesc":"ITS PROFILE PICTURE DAY AGAIN!! let's see those funny faces!! You can upload to this status or to our page and get your friends to LIKE it. MOST LIKES WINS!","socialId":"Facebook721437274564266","title":"ITS PROFILE PICTURE DAY AGAIN!! let's see those funny faces!! You can upload to this status or to our page and get your friends to LIKE it. MOST LIKES WINS!","url":"https:\/\/www.facebook.com\/photo.php?fbid=721437274564266&set=a.358778557496808.77567.354980607876603&type=1"},"title":"ITS PROFILE PICTURE DAY AGAIN!! let's see those funny faces!! You can upload to this status or to our page and get your friends to LIKE it. MOST LIKES WINS!"},{"description":null,"id":"718741074833886","largeImage":"https:\/\/scontent-a.xx.fbcdn.net\/hphotos-xpf1\/t1.0-9\/10341609_718741074833886_2759837799589389460_n.jpg","mediumImage":"https:\/\/scontent-a.xx.fbcdn.net\/hphotos-xpf1\/t1.0-9\/p480x480\/10341609_718741074833886_2759837799589389460_n.jpg","photoTime":1400250608,"smallImage":"https:\/\/scontent-a.xx.fbcdn.net\/hphotos-xpf1\/t1.0-9\/p130x130\/10341609_718741074833886_2759837799589389460_n.jpg","socialInfo":{"imageUrl":"https:\/\/fbcdn-photos-c-a.akamaihd.net\/hphotos-ak-xpf1\/t1.0-0\/10341609_718741074833886_2759837799589389460_s.jpg","shortDesc":"Check out this easy frosty treat recipe for your pups! Then treat yourself to a tasty beverage at the Lucky Dog tonight. No food trucks tonight so pack a picnic and come party with your pup after a long week! http:\/\/sharonmcconnell.hubpages.com\/hub\/Recipe-for-Frozen-Dog-Treats","socialId":"Facebook718741074833886","title":"Check out this easy frosty treat recipe for your pups! Then treat yourself to a tasty beverage at the Lucky Dog tonight. No food trucks tonight so pack a picnic and come party with your pup after a long week! http:\/\/sharonmcconnell.hubpages.com\/hub\/Recipe-for-Frozen-Dog-Treats","url":"https:\/\/www.facebook.com\/photo.php?fbid=718741074833886&set=a.358778557496808.77567.354980607876603&type=1"},"title":"Check out this easy frosty treat recipe for your pups! Then treat yourself to a tasty beverage at the Lucky Dog tonight. No food trucks tonight so pack a picnic and come party with your pup after a long week! http:\/\/sharonmcconnell.hubpages.com\/hub\/Recipe-for-Frozen-Dog-Treats"},{"description":null,"id":"717792911595369","largeImage":"https:\/\/scontent-b.xx.fbcdn.net\/hphotos-xap1\/t1.0-9\/10367748_717792911595369_5548711313845923635_n.jpg","mediumImage":"https:\/\/scontent-b.xx.fbcdn.net\/hphotos-xap1\/t1.0-9\/p480x480\/10367748_717792911595369_5548711313845923635_n.jpg","photoTime":1400090715,"smallImage":"https:\/\/scontent-b.xx.fbcdn.net\/hphotos-xap1\/t1.0-9\/p130x130\/10367748_717792911595369_5548711313845923635_n.jpg","socialInfo":{"imageUrl":"https:\/\/fbcdn-photos-h-a.akamaihd.net\/hphotos-ak-xap1\/t1.0-0\/10367748_717792911595369_5548711313845923635_s.jpg","shortDesc":"ITS PROFILE PICTURE DAY AT LUCKY DOG!  Upload your picture to this STATUS or the PAGE itself.  Then get your friends to LIKE the picture.  The picture with the most likes wins PROFILE PIC OF OUR FACEBOOK PAGE FOR THE WEEK!  Tonight is $3.50 Draft night and $4 Fireball shots!  Plus we always have $13 Domestic Buckets, $2.50 Bud Lt Drafts and $4 Pinnacle Flavors all May.  Come see us!","socialId":"Facebook717792911595369","title":"ITS PROFILE PICTURE DAY AT LUCKY DOG!  Upload your picture to this STATUS or the PAGE itself.  Then get your friends to LIKE the picture.  The picture with the most likes wins PROFILE PIC OF OUR FACEBOOK PAGE FOR THE WEEK!  Tonight is $3.50 Draft night and $4 Fireball shots!  Plus we always have $13 Domestic Buckets, $2.50 Bud Lt Drafts and $4 Pinnacle Flavors all May.  Come see us!","url":"https:\/\/www.facebook.com\/photo.php?fbid=717792911595369&set=a.358778557496808.77567.354980607876603&type=1"},"title":"ITS PROFILE PICTURE DAY AT LUCKY DOG!  Upload your picture to this STATUS or the PAGE itself.  Then get your friends to LIKE the picture.  The picture with the most likes wins PROFILE PIC OF OUR FACEBOOK PAGE FOR THE WEEK!  Tonight is $3.50 Draft night and $4 Fireball shots!  Plus we always have $13 Domestic Buckets, $2.50 Bud Lt Drafts and $4 Pinnacle Flavors all May.  Come see us!"},{"description":null,"id":"717374068303920","largeImage":"https:\/\/fbcdn-sphotos-b-a.akamaihd.net\/hphotos-ak-xpa1\/t1.0-9\/10325419_717374068303920_3626074125164029427_n.jpg","mediumImage":"https:\/\/fbcdn-sphotos-b-a.akamaihd.net\/hphotos-ak-xpa1\/t1.0-9\/10325419_717374068303920_3626074125164029427_n.jpg","photoTime":1400011323,"smallImage":"https:\/\/fbcdn-sphotos-b-a.akamaihd.net\/hphotos-ak-xpa1\/t1.0-9\/p130x130\/10325419_717374068303920_3626074125164029427_n.jpg","socialInfo":{"imageUrl":"https:\/\/fbcdn-photos-b-a.akamaihd.net\/hphotos-ak-xpa1\/t1.0-0\/10325419_717374068303920_3626074125164029427_s.jpg","shortDesc":"Does your bucket list have \"attend a Beer & Bath night at Lucky Dog!!!???\"  Nows your chance!  Come see Taylor on her first night back after getting married, grab a beer or a tasty cocktail and get your pup a bath for only $15!  The pool is out and lots of new craft and drafts on tap.  Memorial Day weekend is just around the corner so make sure you get your boarding booked soon.  We are already starting to book up!  See you soon.","socialId":"Facebook717374068303920","title":"Does your bucket list have \"attend a Beer & Bath night at Lucky Dog!!!???\"  Nows your chance!  Come see Taylor on her first night back after getting married, grab a beer or a tasty cocktail and get your pup a bath for only $15!  The pool is out and lots of new craft and drafts on tap.  Memorial Day weekend is just around the corner so make sure you get your boarding booked soon.  We are already starting to book up!  See you soon.","url":"https:\/\/www.facebook.com\/photo.php?fbid=717374068303920&set=a.358778557496808.77567.354980607876603&type=1"},"title":"Does your bucket list have \"attend a Beer & Bath night at Lucky Dog!!!???\"  Nows your chance!  Come see Taylor on her first night back after getting married, grab a beer or a tasty cocktail and get your pup a bath for only $15!  The pool is out and lots of new craft and drafts on tap.  Memorial Day weekend is just around the corner so make sure you get your boarding booked soon.  We are already starting to book up!  See you soon."},{"description":null,"id":"716102178431109","largeImage":"https:\/\/scontent-a.xx.fbcdn.net\/hphotos-xpf1\/t1.0-9\/10338269_716102178431109_1304219301587722315_n.jpg","mediumImage":"https:\/\/scontent-a.xx.fbcdn.net\/hphotos-xpf1\/t1.0-9\/10338269_716102178431109_1304219301587722315_n.jpg","photoTime":1399817706,"smallImage":"https:\/\/scontent-a.xx.fbcdn.net\/hphotos-xpf1\/t1.0-9\/p130x130\/10338269_716102178431109_1304219301587722315_n.jpg","socialInfo":{"imageUrl":"https:\/\/fbcdn-photos-c-a.akamaihd.net\/hphotos-ak-xpf1\/t1.0-0\/10338269_716102178431109_1304219301587722315_s.jpg","shortDesc":"Happy Mother's Day to all the moms out there with furry and human kids! Bring your furry kids to the bar and celebrate with a tasty Bloody Mary on the patio! We open at noon! See you soon","socialId":"Facebook716102178431109","title":"Happy Mother's Day to all the moms out there with furry and human kids! Bring your furry kids to the bar and celebrate with a tasty Bloody Mary on the patio! We open at noon! See you soon","url":"https:\/\/www.facebook.com\/photo.php?fbid=716102178431109&set=a.358778557496808.77567.354980607876603&type=1"},"title":"Happy Mother's Day to all the moms out there with furry and human kids! Bring your furry kids to the bar and celebrate with a tasty Bloody Mary on the patio! We open at noon! See you soon"},{"description":null,"id":"714017055306288","largeImage":"https:\/\/fbcdn-sphotos-h-a.akamaihd.net\/hphotos-ak-xpf1\/t1.0-9\/10344842_714017055306288_4262780912702421249_n.jpg","mediumImage":"https:\/\/fbcdn-sphotos-h-a.akamaihd.net\/hphotos-ak-xpf1\/t1.0-9\/10344842_714017055306288_4262780912702421249_n.jpg","photoTime":1399479175,"smallImage":"https:\/\/fbcdn-sphotos-h-a.akamaihd.net\/hphotos-ak-xpf1\/t1.0-9\/p130x130\/10344842_714017055306288_4262780912702421249_n.jpg","socialInfo":{"imageUrl":"https:\/\/fbcdn-photos-h-a.akamaihd.net\/hphotos-ak-xpf1\/t1.0-0\/10344842_714017055306288_4262780912702421249_s.jpg","shortDesc":"Two years ago today, we received a unanimous approval to open the Lucky Dog Bark and Brew in the town of Cornelius.  Thanks to 60+ supporters that came out to the Town of Cornelius Board Meeting, we were able to win over the Board with our unique concept. It wasn't without a fight but after three excruciating hours, we prevailed.  Even though Hampton Inn was very concerned initially, they have grown to become one of our biggest supporters and send people our way all the time now.  We really have come full circle!  Thank you all for supporting us that day and every day since then.  We can't tell you how much we appreciate each and every one of you.  Cheers!!","socialId":"Facebook714017055306288","title":"Two years ago today, we received a unanimous approval to open the Lucky Dog Bark and Brew in the town of Cornelius.  Thanks to 60+ supporters that came out to the Town of Cornelius Board Meeting, we were able to win over the Board with our unique concept. It wasn't without a fight but after three excruciating hours, we prevailed.  Even though Hampton Inn was very concerned initially, they have grown to become one of our biggest supporters and send people our way all the time now.  We really have come full circle!  Thank you all for supporting us that day and every day since then.  We can't tell you how much we appreciate each and every one of you.  Cheers!!","url":"https:\/\/www.facebook.com\/photo.php?fbid=714017055306288&set=a.358778557496808.77567.354980607876603&type=1"},"title":"Two years ago today, we received a unanimous approval to open the Lucky Dog Bark and Brew in the town of Cornelius.  Thanks to 60+ supporters that came out to the Town of Cornelius Board Meeting, we were able to win over the Board with our unique concept. It wasn't without a fight but after three excruciating hours, we prevailed.  Even though Hampton Inn was very concerned initially, they have grown to become one of our biggest supporters and send people our way all the time now.  We really have come full circle!  Thank you all for supporting us that day and every day since then.  We can't tell you how much we appreciate each and every one of you.  Cheers!!"},{"description":null,"id":"713218255386168","largeImage":"https:\/\/scontent-b.xx.fbcdn.net\/hphotos-xpf1\/t1.0-9\/10258509_713218255386168_1261687368894978679_n.jpg","mediumImage":"https:\/\/scontent-b.xx.fbcdn.net\/hphotos-xpf1\/t1.0-9\/10258509_713218255386168_1261687368894978679_n.jpg","photoTime":1399324365,"smallImage":"https:\/\/scontent-b.xx.fbcdn.net\/hphotos-xpf1\/t1.0-9\/p130x130\/10258509_713218255386168_1261687368894978679_n.jpg","socialInfo":{"imageUrl":"https:\/\/fbcdn-photos-b-a.akamaihd.net\/hphotos-ak-xpf1\/t1.0-0\/10258509_713218255386168_1261687368894978679_s.jpg","shortDesc":"HAPPY CINCO DE MAYO!  Come grab a $4 Margarita, $2.50 Corona or Corona Light and $5 Jose Cuervo Shots! Bar is NOW OPEN!!  Did you know you can get a BATH 7 days a week now for your pup until 9pm!  $25 for 40 lbs and over and $20 for 39lbs and under! Best Bath deal in town!!!  See you soon.","socialId":"Facebook713218255386168","title":"HAPPY CINCO DE MAYO!  Come grab a $4 Margarita, $2.50 Corona or Corona Light and $5 Jose Cuervo Shots! Bar is NOW OPEN!!  Did you know you can get a BATH 7 days a week now for your pup until 9pm!  $25 for 40 lbs and over and $20 for 39lbs and under! Best Bath deal in town!!!  See you soon.","url":"https:\/\/www.facebook.com\/photo.php?fbid=713218255386168&set=a.358778557496808.77567.354980607876603&type=1"},"title":"HAPPY CINCO DE MAYO!  Come grab a $4 Margarita, $2.50 Corona or Corona Light and $5 Jose Cuervo Shots! Bar is NOW OPEN!!  Did you know you can get a BATH 7 days a week now for your pup until 9pm!  $25 for 40 lbs and over and $20 for 39lbs and under! Best Bath deal in town!!!  See you soon."},{"description":null,"id":"712591568782170","largeImage":"https:\/\/scontent-a.xx.fbcdn.net\/hphotos-xfa1\/t1.0-9\/10178055_712591568782170_1667467877245781918_n.jpg","mediumImage":"https:\/\/scontent-a.xx.fbcdn.net\/hphotos-xfa1\/t1.0-9\/p480x480\/10178055_712591568782170_1667467877245781918_n.jpg","photoTime":1399215210,"smallImage":"https:\/\/scontent-a.xx.fbcdn.net\/hphotos-xfa1\/t1.0-9\/p130x130\/10178055_712591568782170_1667467877245781918_n.jpg","socialInfo":{"imageUrl":"https:\/\/fbcdn-photos-e-a.akamaihd.net\/hphotos-ak-xfa1\/t1.0-0\/10178055_712591568782170_1667467877245781918_s.jpg","shortDesc":"Looking for something fun to do today?  Come by the Lucky Dog this afternoon!  Its a gorgeous day, so pack a picnic or some snacks and come by for a delicious Bloody Mary or an Ice Cold Beer!  Music, Pups, and all kinds of great entertainment.  The groomer is in too if your pups need to smell better!  Happy Sunday Funday!","socialId":"Facebook712591568782170","title":"Looking for something fun to do today?  Come by the Lucky Dog this afternoon!  Its a gorgeous day, so pack a picnic or some snacks and come by for a delicious Bloody Mary or an Ice Cold Beer!  Music, Pups, and all kinds of great entertainment.  The groomer is in too if your pups need to smell better!  Happy Sunday Funday!","url":"https:\/\/www.facebook.com\/photo.php?fbid=712591568782170&set=a.358778557496808.77567.354980607876603&type=1"},"title":"Looking for something fun to do today?  Come by the Lucky Dog this afternoon!  Its a gorgeous day, so pack a picnic or some snacks and come by for a delicious Bloody Mary or an Ice Cold Beer!  Music, Pups, and all kinds of great entertainment.  The groomer is in too if your pups need to smell better!  Happy Sunday Funday!"},{"description":null,"id":"708503299190997","largeImage":"https:\/\/fbcdn-sphotos-f-a.akamaihd.net\/hphotos-ak-xpf1\/t1.0-9\/10177873_708503299190997_5572267073289987681_n.jpg","mediumImage":"https:\/\/fbcdn-sphotos-f-a.akamaihd.net\/hphotos-ak-xpf1\/t1.0-9\/p480x480\/10177873_708503299190997_5572267073289987681_n.jpg","photoTime":1398460869,"smallImage":"https:\/\/fbcdn-sphotos-f-a.akamaihd.net\/hphotos-ak-xpf1\/t1.0-9\/p130x130\/10177873_708503299190997_5572267073289987681_n.jpg","socialInfo":{"imageUrl":"https:\/\/fbcdn-photos-f-a.akamaihd.net\/hphotos-ak-xpf1\/t1.0-0\/10177873_708503299190997_5572267073289987681_s.jpg","shortDesc":"SMILE!  Its Friday!  We have 1\/2 Price Bottles of Wine, $2.50 Mich Ultra on draft and $4 Sheltie shots.  Don't forget, Maryland Crab Co. Llc & Juan Taco Truck will be serving up some good eats!!","socialId":"Facebook708503299190997","title":"SMILE!  Its Friday!  We have 1\/2 Price Bottles of Wine, $2.50 Mich Ultra on draft and $4 Sheltie shots.  Don't forget, Maryland Crab Co. Llc & Juan Taco Truck will be serving up some good eats!!","url":"https:\/\/www.facebook.com\/photo.php?fbid=708503299190997&set=a.358778557496808.77567.354980607876603&type=1"},"title":"SMILE!  Its Friday!  We have 1\/2 Price Bottles of Wine, $2.50 Mich Ultra on draft and $4 Sheltie shots.  Don't forget, Maryland Crab Co. Llc & Juan Taco Truck will be serving up some good eats!!"},{"description":null,"id":"708462125861781","largeImage":"https:\/\/fbcdn-sphotos-d-a.akamaihd.net\/hphotos-ak-xpf1\/t1.0-9\/10177222_708462125861781_735539666279592924_n.jpg","mediumImage":"https:\/\/fbcdn-sphotos-d-a.akamaihd.net\/hphotos-ak-xpf1\/t1.0-9\/10177222_708462125861781_735539666279592924_n.jpg","photoTime":1398454703,"smallImage":"https:\/\/fbcdn-sphotos-d-a.akamaihd.net\/hphotos-ak-xpf1\/t1.0-9\/p130x130\/10177222_708462125861781_735539666279592924_n.jpg","socialInfo":{"imageUrl":"https:\/\/fbcdn-photos-d-a.akamaihd.net\/hphotos-ak-xpf1\/t1.0-0\/10177222_708462125861781_735539666279592924_s.jpg","shortDesc":"I know a lot of people have asked if we sell that cute black dog that is drinking the wine bottle in our boutique....well guess what!!  We now can!!  Come check out our boutique with lots of great collars and take home a fun wine holder for your dog loving home!  FOOD TRUCK FRIDAY TONIGHT!  The weather is perfect for chilling on the patio with your pups.  and speaking of wine its 1\/2 price bottles tonight!!!  See you soon.","socialId":"Facebook708462125861781","title":"I know a lot of people have asked if we sell that cute black dog that is drinking the wine bottle in our boutique....well guess what!!  We now can!!  Come check out our boutique with lots of great collars and take home a fun wine holder for your dog loving home!  FOOD TRUCK FRIDAY TONIGHT!  The weather is perfect for chilling on the patio with your pups.  and speaking of wine its 1\/2 price bottles tonight!!!  See you soon.","url":"https:\/\/www.facebook.com\/photo.php?fbid=708462125861781&set=a.358778557496808.77567.354980607876603&type=1"},"title":"I know a lot of people have asked if we sell that cute black dog that is drinking the wine bottle in our boutique....well guess what!!  We now can!!  Come check out our boutique with lots of great collars and take home a fun wine holder for your dog loving home!  FOOD TRUCK FRIDAY TONIGHT!  The weather is perfect for chilling on the patio with your pups.  and speaking of wine its 1\/2 price bottles tonight!!!  See you soon."},{"description":null,"id":"707795562595104","largeImage":"https:\/\/scontent-a.xx.fbcdn.net\/hphotos-xpa1\/t1.0-9\/10172839_707795562595104_6030634527689890741_n.jpg","mediumImage":"https:\/\/scontent-a.xx.fbcdn.net\/hphotos-xpa1\/t1.0-9\/p180x540\/10172839_707795562595104_6030634527689890741_n.jpg","photoTime":1398346404,"smallImage":"https:\/\/scontent-a.xx.fbcdn.net\/hphotos-xpa1\/t1.0-9\/p130x130\/10172839_707795562595104_6030634527689890741_n.jpg","socialInfo":{"imageUrl":"https:\/\/fbcdn-photos-a-a.akamaihd.net\/hphotos-ak-xpa1\/t1.0-0\/10172839_707795562595104_6030634527689890741_s.jpg","shortDesc":"Thanks for everyone that uploaded pictures yesterday for profile pic of the week!!  This sweet baby face is our winner!  Please give lil Anne some love!!  <3 <3 <3","socialId":"Facebook707795562595104","title":"Thanks for everyone that uploaded pictures yesterday for profile pic of the week!!  This sweet baby face is our winner!  Please give lil Anne some love!!  <3 <3 <3","url":"https:\/\/www.facebook.com\/photo.php?fbid=707795562595104&set=a.358778557496808.77567.354980607876603&type=1"},"title":"Thanks for everyone that uploaded pictures yesterday for profile pic of the week!!  This sweet baby face is our winner!  Please give lil Anne some love!!  <3 <3 <3"},{"description":null,"id":"704794159561911","largeImage":"https:\/\/scontent-a.xx.fbcdn.net\/hphotos-xfa1\/t1.0-9\/1524565_704794159561911_3505396766042031764_n.jpg","mediumImage":"https:\/\/scontent-a.xx.fbcdn.net\/hphotos-xfa1\/t1.0-9\/p180x540\/1524565_704794159561911_3505396766042031764_n.jpg","photoTime":1397831400,"smallImage":"https:\/\/scontent-a.xx.fbcdn.net\/hphotos-xfa1\/t1.0-9\/p130x130\/1524565_704794159561911_3505396766042031764_n.jpg","socialInfo":{"imageUrl":"https:\/\/fbcdn-photos-a-a.akamaihd.net\/hphotos-ak-xfa1\/t1.0-0\/1524565_704794159561911_3505396766042031764_s.jpg","shortDesc":"Come grab a Pint with your buddy tonight at the LD.  Its food truck friday and we'll have Juan Taco Truck serving up some tasty food so come hungry!  $2.50 Mich Ultra Drafts, $4 Pinnacle Flavors and $5 Sheltie Shots.  1\/2 Price Wine Bottles every Friday night too.  Bar hours are 4pm but daycare, boarding and grooming is open 7am every day! See you soon","socialId":"Facebook704794159561911","title":"Come grab a Pint with your buddy tonight at the LD.  Its food truck friday and we'll have Juan Taco Truck serving up some tasty food so come hungry!  $2.50 Mich Ultra Drafts, $4 Pinnacle Flavors and $5 Sheltie Shots.  1\/2 Price Wine Bottles every Friday night too.  Bar hours are 4pm but daycare, boarding and grooming is open 7am every day! See you soon","url":"https:\/\/www.facebook.com\/photo.php?fbid=704794159561911&set=a.358778557496808.77567.354980607876603&type=1"},"title":"Come grab a Pint with your buddy tonight at the LD.  Its food truck friday and we'll have Juan Taco Truck serving up some tasty food so come hungry!  $2.50 Mich Ultra Drafts, $4 Pinnacle Flavors and $5 Sheltie Shots.  1\/2 Price Wine Bottles every Friday night too.  Bar hours are 4pm but daycare, boarding and grooming is open 7am every day! See you soon"},{"description":null,"id":"704256142949046","largeImage":"https:\/\/scontent-b.xx.fbcdn.net\/hphotos-xpf1\/t1.0-9\/10155888_704256142949046_1219565117970795755_n.jpg","mediumImage":"https:\/\/scontent-b.xx.fbcdn.net\/hphotos-xpf1\/t1.0-9\/p180x540\/10155888_704256142949046_1219565117970795755_n.jpg","photoTime":1397730647,"smallImage":"https:\/\/scontent-b.xx.fbcdn.net\/hphotos-xpf1\/t1.0-9\/p130x130\/10155888_704256142949046_1219565117970795755_n.jpg","socialInfo":{"imageUrl":"https:\/\/fbcdn-photos-f-a.akamaihd.net\/hphotos-ak-xpf1\/t1.0-0\/10155888_704256142949046_1219565117970795755_s.jpg","shortDesc":"Congrats to Roxy, the newest profile pic winner with 20 Likes!! She is all decked out for Easter Sunday!","socialId":"Facebook704256142949046","title":"Congrats to Roxy, the newest profile pic winner with 20 Likes!! She is all decked out for Easter Sunday!","url":"https:\/\/www.facebook.com\/photo.php?fbid=704256142949046&set=a.358778557496808.77567.354980607876603&type=1"},"title":"Congrats to Roxy, the newest profile pic winner with 20 Likes!! She is all decked out for Easter Sunday!"},{"description":null,"id":"703909736317020","largeImage":"https:\/\/scontent-b.xx.fbcdn.net\/hphotos-xfp1\/t1.0-9\/10171830_703909736317020_989406104251610091_n.jpg","mediumImage":"https:\/\/scontent-b.xx.fbcdn.net\/hphotos-xfp1\/t1.0-9\/p480x480\/10171830_703909736317020_989406104251610091_n.jpg","photoTime":1397663101,"smallImage":"https:\/\/scontent-b.xx.fbcdn.net\/hphotos-xfp1\/t1.0-9\/p130x130\/10171830_703909736317020_989406104251610091_n.jpg","socialInfo":{"imageUrl":"https:\/\/fbcdn-photos-b-a.akamaihd.net\/hphotos-ak-xfp1\/t1.0-0\/10171830_703909736317020_989406104251610091_s.jpg","shortDesc":"SMILE!  Its that time again...LETS SEE THOSE GREAT PROFILE PICTURES...THEN GET YOUR FRIENDS TO LIKE IT.  The one with the most LIKES wins!  Come see us tonight for $3.50 Pints and $4 Fireballs all night long!!  Happy Hump Day...come drink with your pup!","socialId":"Facebook703909736317020","title":"SMILE!  Its that time again...LETS SEE THOSE GREAT PROFILE PICTURES...THEN GET YOUR FRIENDS TO LIKE IT.  The one with the most LIKES wins!  Come see us tonight for $3.50 Pints and $4 Fireballs all night long!!  Happy Hump Day...come drink with your pup!","url":"https:\/\/www.facebook.com\/photo.php?fbid=703909736317020&set=a.358778557496808.77567.354980607876603&type=1"},"title":"SMILE!  Its that time again...LETS SEE THOSE GREAT PROFILE PICTURES...THEN GET YOUR FRIENDS TO LIKE IT.  The one with the most LIKES wins!  Come see us tonight for $3.50 Pints and $4 Fireballs all night long!!  Happy Hump Day...come drink with your pup!"},{"description":null,"id":"702242719817055","largeImage":"https:\/\/scontent-b.xx.fbcdn.net\/hphotos-xfp1\/t1.0-9\/1530451_702242719817055_6461561015519162723_n.jpg","mediumImage":"https:\/\/scontent-b.xx.fbcdn.net\/hphotos-xfp1\/t1.0-9\/1530451_702242719817055_6461561015519162723_n.jpg","photoTime":1397404802,"smallImage":"https:\/\/scontent-b.xx.fbcdn.net\/hphotos-xfp1\/t1.0-9\/p130x130\/1530451_702242719817055_6461561015519162723_n.jpg","socialInfo":{"imageUrl":"https:\/\/fbcdn-photos-f-a.akamaihd.net\/hphotos-ak-xfp1\/t1.0-0\/1530451_702242719817055_6461561015519162723_s.jpg","shortDesc":"Its a week away from Easter and I know my pups are looking forward to their Easter baskets! Come by the Lucky Dog to party with your pups and enjoy a tasty cocktail while you are at it.  $2.50 Mich Ultra Drafts, $4 Pinnacle Flavored Vodkas and $5 Sheltie Shots!  The groomer is in all day too!  Boarding is booking up fast for Spring Break and Easter weekend.  Call us if you want to secure a spot at 704.896.5550!","socialId":"Facebook702242719817055","title":"Its a week away from Easter and I know my pups are looking forward to their Easter baskets! Come by the Lucky Dog to party with your pups and enjoy a tasty cocktail while you are at it.  $2.50 Mich Ultra Drafts, $4 Pinnacle Flavored Vodkas and $5 Sheltie Shots!  The groomer is in all day too!  Boarding is booking up fast for Spring Break and Easter weekend.  Call us if you want to secure a spot at 704.896.5550!","url":"https:\/\/www.facebook.com\/photo.php?fbid=702242719817055&set=a.358778557496808.77567.354980607876603&type=1"},"title":"Its a week away from Easter and I know my pups are looking forward to their Easter baskets! Come by the Lucky Dog to party with your pups and enjoy a tasty cocktail while you are at it.  $2.50 Mich Ultra Drafts, $4 Pinnacle Flavored Vodkas and $5 Sheltie Shots!  The groomer is in all day too!  Boarding is booking up fast for Spring Break and Easter weekend.  Call us if you want to secure a spot at 704.896.5550!"},{"description":null,"id":"701679199873407","largeImage":"https:\/\/scontent-b.xx.fbcdn.net\/hphotos-xap1\/t1.0-9\/10168179_701679199873407_9121906367432446117_n.jpg","mediumImage":"https:\/\/scontent-b.xx.fbcdn.net\/hphotos-xap1\/t1.0-9\/10168179_701679199873407_9121906367432446117_n.jpg","photoTime":1397319245,"smallImage":"https:\/\/scontent-b.xx.fbcdn.net\/hphotos-xap1\/t1.0-9\/p130x130\/10168179_701679199873407_9121906367432446117_n.jpg","socialInfo":{"imageUrl":"https:\/\/fbcdn-photos-h-a.akamaihd.net\/hphotos-ak-xap1\/t1.0-0\/10168179_701679199873407_9121906367432446117_s.jpg","shortDesc":"Spring is here and the weather is PERFECT!!!  Come grab your pup and a picnic and head to the Lucky Dog!  $2.50 Mich Ultra Drafts ALL APRIL LONG, plus $5 Sheltie Shots and $4 Pinnacle Flavors!  the groomer is in all day too!  Be sure to check out the best Bath Prices in town too!  $25 for 40lbs and over and includes ears, nails, bath, dry and anals.  $20 for 39lbs or less!  Come see us!","socialId":"Facebook701679199873407","title":"Spring is here and the weather is PERFECT!!!  Come grab your pup and a picnic and head to the Lucky Dog!  $2.50 Mich Ultra Drafts ALL APRIL LONG, plus $5 Sheltie Shots and $4 Pinnacle Flavors!  the groomer is in all day too!  Be sure to check out the best Bath Prices in town too!  $25 for 40lbs and over and includes ears, nails, bath, dry and anals.  $20 for 39lbs or less!  Come see us!","url":"https:\/\/www.facebook.com\/photo.php?fbid=701679199873407&set=a.358778557496808.77567.354980607876603&type=1"},"title":"Spring is here and the weather is PERFECT!!!  Come grab your pup and a picnic and head to the Lucky Dog!  $2.50 Mich Ultra Drafts ALL APRIL LONG, plus $5 Sheltie Shots and $4 Pinnacle Flavors!  the groomer is in all day too!  Be sure to check out the best Bath Prices in town too!  $25 for 40lbs and over and includes ears, nails, bath, dry and anals.  $20 for 39lbs or less!  Come see us!"},{"description":null,"id":"701159126592081","largeImage":"https:\/\/fbcdn-sphotos-b-a.akamaihd.net\/hphotos-ak-xfp1\/t1.0-9\/10154006_701159126592081_6626446447970686547_n.jpg","mediumImage":"https:\/\/fbcdn-sphotos-b-a.akamaihd.net\/hphotos-ak-xfp1\/t1.0-9\/p480x480\/10154006_701159126592081_6626446447970686547_n.jpg","photoTime":1397235070,"smallImage":"https:\/\/fbcdn-sphotos-b-a.akamaihd.net\/hphotos-ak-xfp1\/t1.0-9\/p130x130\/10154006_701159126592081_6626446447970686547_n.jpg","socialInfo":{"imageUrl":"https:\/\/fbcdn-photos-b-a.akamaihd.net\/hphotos-ak-xfp1\/t1.0-0\/10154006_701159126592081_6626446447970686547_s.jpg","shortDesc":"This weather and the fact that its Friday makes me feel like its almost summer!  Tonight is normally Food Truck Friday but Maryland Crab Co had to cancel at the last minute.  Juan Taco Truck is going to hopefully be here from 6-9pm to save the day!  Come see us and check out our great April Drink Specials!!!  $2.50 Michelob Ultra Drafts, $4 Pinnacle Flavored Vodka drinks, $5 Sheltie shots!  Don't forget about our amazing bath prices.  $25 for 40lbs and over and $20 for 39lbs and under.  Includes Ears, Nails, Anal glands and wash and dry!  Come see us tonight!!","socialId":"Facebook701159126592081","title":"This weather and the fact that its Friday makes me feel like its almost summer!  Tonight is normally Food Truck Friday but Maryland Crab Co had to cancel at the last minute.  Juan Taco Truck is going to hopefully be here from 6-9pm to save the day!  Come see us and check out our great April Drink Specials!!!  $2.50 Michelob Ultra Drafts, $4 Pinnacle Flavored Vodka drinks, $5 Sheltie shots!  Don't forget about our amazing bath prices.  $25 for 40lbs and over and $20 for 39lbs and under.  Includes Ears, Nails, Anal glands and wash and dry!  Come see us tonight!!","url":"https:\/\/www.facebook.com\/photo.php?fbid=701159126592081&set=a.358778557496808.77567.354980607876603&type=1"},"title":"This weather and the fact that its Friday makes me feel like its almost summer!  Tonight is normally Food Truck Friday but Maryland Crab Co had to cancel at the last minute.  Juan Taco Truck is going to hopefully be here from 6-9pm to save the day!  Come see us and check out our great April Drink Specials!!!  $2.50 Michelob Ultra Drafts, $4 Pinnacle Flavored Vodka drinks, $5 Sheltie shots!  Don't forget about our amazing bath prices.  $25 for 40lbs and over and $20 for 39lbs and under.  Includes Ears, Nails, Anal glands and wash and dry!  Come see us tonight!!"},{"description":null,"id":"699243446783649","largeImage":"https:\/\/scontent-b.xx.fbcdn.net\/hphotos-xpf1\/t1.0-9\/10151790_699243446783649_534120213_n.jpg","mediumImage":"https:\/\/scontent-b.xx.fbcdn.net\/hphotos-xpf1\/t1.0-9\/10151790_699243446783649_534120213_n.jpg","photoTime":1396888090,"smallImage":"https:\/\/scontent-b.xx.fbcdn.net\/hphotos-xpf1\/t1.0-9\/p130x130\/10151790_699243446783649_534120213_n.jpg","socialInfo":{"imageUrl":"https:\/\/fbcdn-photos-d-a.akamaihd.net\/hphotos-ak-xpf1\/t1.0-0\/10151790_699243446783649_534120213_s.jpg","shortDesc":"How's your Monday starting out?  Need a good place to chill after work and watch the Championship Game tonight!?  We have FREE Jet's Pizza from 7-8pm so come by and grab some grub, watch the game!  UCONN Vs KENTUCKY on the big screen at 9:10.  Come with or without your pups!  Don't forget, we have grooming all day!  See you soon!","socialId":"Facebook699243446783649","title":"How's your Monday starting out?  Need a good place to chill after work and watch the Championship Game tonight!?  We have FREE Jet's Pizza from 7-8pm so come by and grab some grub, watch the game!  UCONN Vs KENTUCKY on the big screen at 9:10.  Come with or without your pups!  Don't forget, we have grooming all day!  See you soon!","url":"https:\/\/www.facebook.com\/photo.php?fbid=699243446783649&set=a.358778557496808.77567.354980607876603&type=1"},"title":"How's your Monday starting out?  Need a good place to chill after work and watch the Championship Game tonight!?  We have FREE Jet's Pizza from 7-8pm so come by and grab some grub, watch the game!  UCONN Vs KENTUCKY on the big screen at 9:10.  Come with or without your pups!  Don't forget, we have grooming all day!  See you soon!"},{"description":null,"id":"698294536878540","largeImage":"https:\/\/scontent-b.xx.fbcdn.net\/hphotos-xpf1\/t1.0-9\/10151297_698294536878540_464094820_n.jpg","mediumImage":"https:\/\/scontent-b.xx.fbcdn.net\/hphotos-xpf1\/t1.0-9\/p180x540\/10151297_698294536878540_464094820_n.jpg","photoTime":1396715680,"smallImage":"https:\/\/fbcdn-photos-f-a.akamaihd.net\/hphotos-ak-xpf1\/t1.0-0\/10151297_698294536878540_464094820_s.jpg","socialInfo":{"imageUrl":"https:\/\/fbcdn-photos-f-a.akamaihd.net\/hphotos-ak-xpf1\/t1.0-0\/10151297_698294536878540_464094820_s.jpg","shortDesc":"Love the look of these two!  They look like either are on their way or just leaving the Lucky Dog!  Come party on the fresh new patio outside!  Its clean, pretty and lots of fun!  We moved the small dog \/ special function area towards the front now too so you can still be part of the action.  Anyone else think it looks bigger now!?  Joey is in all day grooming dogs and we have $2.50 Bud Lights, $4 Flavored Pinnacle Vodkas and $13 Domestic Buckets!  Come see us!","socialId":"Facebook698294536878540","title":"Love the look of these two!  They look like either are on their way or just leaving the Lucky Dog!  Come party on the fresh new patio outside!  Its clean, pretty and lots of fun!  We moved the small dog \/ special function area towards the front now too so you can still be part of the action.  Anyone else think it looks bigger now!?  Joey is in all day grooming dogs and we have $2.50 Bud Lights, $4 Flavored Pinnacle Vodkas and $13 Domestic Buckets!  Come see us!","url":"https:\/\/www.facebook.com\/photo.php?fbid=698294536878540&set=a.358778557496808.77567.354980607876603&type=1"},"title":"Love the look of these two!  They look like either are on their way or just leaving the Lucky Dog!  Come party on the fresh new patio outside!  Its clean, pretty and lots of fun!  We moved the small dog \/ special function area towards the front now too so you can still be part of the action.  Anyone else think it looks bigger now!?  Joey is in all day grooming dogs and we have $2.50 Bud Lights, $4 Flavored Pinnacle Vodkas and $13 Domestic Buckets!  Come see us!"},{"description":null,"id":"697389590302368","largeImage":"https:\/\/scontent-a.xx.fbcdn.net\/hphotos-xpf1\/t1.0-9\/1457722_697389590302368_315294646_n.jpg","mediumImage":"https:\/\/scontent-a.xx.fbcdn.net\/hphotos-xpf1\/t1.0-9\/p180x540\/1457722_697389590302368_315294646_n.jpg","photoTime":1396534659,"smallImage":"https:\/\/scontent-a.xx.fbcdn.net\/hphotos-xpf1\/t1.0-9\/p130x130\/1457722_697389590302368_315294646_n.jpg","socialInfo":{"imageUrl":"https:\/\/fbcdn-photos-g-a.akamaihd.net\/hphotos-ak-xpf1\/t1.0-0\/1457722_697389590302368_315294646_s.jpg","shortDesc":"With 25 Likes, please welcome Lexi and Louie to the Profile Picture of the week!  Love their sweet faces!","socialId":"Facebook697389590302368","title":"With 25 Likes, please welcome Lexi and Louie to the Profile Picture of the week!  Love their sweet faces!","url":"https:\/\/www.facebook.com\/photo.php?fbid=697389590302368&set=a.358778557496808.77567.354980607876603&type=1"},"title":"With 25 Likes, please welcome Lexi and Louie to the Profile Picture of the week!  Love their sweet faces!"},{"description":null,"id":"696949663679694","largeImage":"https:\/\/scontent-b.xx.fbcdn.net\/hphotos-xpf1\/t1.0-9\/1962728_696949663679694_1042548677_n.jpg","mediumImage":"https:\/\/scontent-b.xx.fbcdn.net\/hphotos-xpf1\/t1.0-9\/p480x480\/1962728_696949663679694_1042548677_n.jpg","photoTime":1396449597,"smallImage":"https:\/\/scontent-b.xx.fbcdn.net\/hphotos-xpf1\/t1.0-9\/p130x130\/1962728_696949663679694_1042548677_n.jpg","socialInfo":{"imageUrl":"https:\/\/fbcdn-photos-f-a.akamaihd.net\/hphotos-ak-xpf1\/t1.0-0\/1962728_696949663679694_1042548677_s.jpg","shortDesc":"ITS PROFILE PICTURE DAY!  We need a new face for our Lucky Dog Profile Pic.  Please UPLOAD your pups picture onto our page or onto this status and get your friends to LIKE it!  The one with the most LIKES WINS!!  $3.50 Pint Night tonight and $4 Fireballs!  Come party with us for HUMP Day!","socialId":"Facebook696949663679694","title":"ITS PROFILE PICTURE DAY!  We need a new face for our Lucky Dog Profile Pic.  Please UPLOAD your pups picture onto our page or onto this status and get your friends to LIKE it!  The one with the most LIKES WINS!!  $3.50 Pint Night tonight and $4 Fireballs!  Come party with us for HUMP Day!","url":"https:\/\/www.facebook.com\/photo.php?fbid=696949663679694&set=a.358778557496808.77567.354980607876603&type=1"},"title":"ITS PROFILE PICTURE DAY!  We need a new face for our Lucky Dog Profile Pic.  Please UPLOAD your pups picture onto our page or onto this status and get your friends to LIKE it!  The one with the most LIKES WINS!!  $3.50 Pint Night tonight and $4 Fireballs!  Come party with us for HUMP Day!"},{"description":null,"id":"696522860389041","largeImage":"https:\/\/scontent-b.xx.fbcdn.net\/hphotos-xfp1\/t1.0-9\/10176075_696522860389041_394976414_n.jpg","mediumImage":"https:\/\/scontent-b.xx.fbcdn.net\/hphotos-xfp1\/t1.0-9\/p480x480\/10176075_696522860389041_394976414_n.jpg","photoTime":1396371468,"smallImage":"https:\/\/scontent-b.xx.fbcdn.net\/hphotos-xfp1\/t1.0-9\/p130x130\/10176075_696522860389041_394976414_n.jpg","socialInfo":{"imageUrl":"https:\/\/fbcdn-photos-d-a.akamaihd.net\/hphotos-ak-xfp1\/t1.0-0\/10176075_696522860389041_394976414_s.jpg","shortDesc":"Last year I said we were going to allow Cats in for April Fools and it went over hysterically!  I'll promise, not to do that this year!  This year, just come grab a cocktail for Beer & Bath night with your pup.  For only a small upcharge, you can get either wine or liquor with your dogs bath!  EASTER Boarding is filling up fast so call today to get your spot saved.  704.896.5550!  Bar opens at 5pm!  See you soon.","socialId":"Facebook696522860389041","title":"Last year I said we were going to allow Cats in for April Fools and it went over hysterically!  I'll promise, not to do that this year!  This year, just come grab a cocktail for Beer & Bath night with your pup.  For only a small upcharge, you can get either wine or liquor with your dogs bath!  EASTER Boarding is filling up fast so call today to get your spot saved.  704.896.5550!  Bar opens at 5pm!  See you soon.","url":"https:\/\/www.facebook.com\/photo.php?fbid=696522860389041&set=a.358778557496808.77567.354980607876603&type=1"},"title":"Last year I said we were going to allow Cats in for April Fools and it went over hysterically!  I'll promise, not to do that this year!  This year, just come grab a cocktail for Beer & Bath night with your pup.  For only a small upcharge, you can get either wine or liquor with your dogs bath!  EASTER Boarding is filling up fast so call today to get your spot saved.  704.896.5550!  Bar opens at 5pm!  See you soon."},{"description":null,"id":"694660613908599","largeImage":"https:\/\/scontent-a.xx.fbcdn.net\/hphotos-xfp1\/t1.0-9\/1978610_694660613908599_1886946575_n.jpg","mediumImage":"https:\/\/scontent-a.xx.fbcdn.net\/hphotos-xfp1\/t1.0-9\/p180x540\/1978610_694660613908599_1886946575_n.jpg","photoTime":1396022367,"smallImage":"https:\/\/fbcdn-photos-e-a.akamaihd.net\/hphotos-ak-xfp1\/t1.0-0\/1978610_694660613908599_1886946575_s.jpg","socialInfo":{"imageUrl":"https:\/\/fbcdn-photos-e-a.akamaihd.net\/hphotos-ak-xfp1\/t1.0-0\/1978610_694660613908599_1886946575_s.jpg","shortDesc":"Rough week?  Don't worry, we have 1\/2 Price Bottles of Wine, Masterbacon serving up some good eats and Tasty Cocktails!  $2.50 Bud Light Drafts, $ 4 Boston Terrier Cocktails and $5 Baby Guinness shots!  Come party at the Lucky Dog tonight!  See you soon!","socialId":"Facebook694660613908599","title":"Rough week?  Don't worry, we have 1\/2 Price Bottles of Wine, Masterbacon serving up some good eats and Tasty Cocktails!  $2.50 Bud Light Drafts, $ 4 Boston Terrier Cocktails and $5 Baby Guinness shots!  Come party at the Lucky Dog tonight!  See you soon!","url":"https:\/\/www.facebook.com\/photo.php?fbid=694660613908599&set=a.358778557496808.77567.354980607876603&type=1"},"title":"Rough week?  Don't worry, we have 1\/2 Price Bottles of Wine, Masterbacon serving up some good eats and Tasty Cocktails!  $2.50 Bud Light Drafts, $ 4 Boston Terrier Cocktails and $5 Baby Guinness shots!  Come party at the Lucky Dog tonight!  See you soon!"},{"description":null,"id":"694174457290548","largeImage":"https:\/\/scontent-b.xx.fbcdn.net\/hphotos-xfp1\/t1.0-9\/10150749_694174457290548_2042123152_n.jpg","mediumImage":"https:\/\/scontent-b.xx.fbcdn.net\/hphotos-xfp1\/t1.0-9\/10150749_694174457290548_2042123152_n.jpg","photoTime":1395937461,"smallImage":"https:\/\/scontent-b.xx.fbcdn.net\/hphotos-xfp1\/t1.0-9\/p130x130\/10150749_694174457290548_2042123152_n.jpg","socialInfo":{"imageUrl":"https:\/\/fbcdn-photos-h-a.akamaihd.net\/hphotos-ak-xfp1\/t1.0-0\/10150749_694174457290548_2042123152_s.jpg","shortDesc":"Dogs make me laugh!  If you could use a good laugh, come hang out at the Lucky Dog...With or without a dog.  We have puppy training classes going on tonight from 7-8pm and all kinds of tasty cocktails!  $2.50 Bud Light Drafts, $4 Boston Terrier Cocktails, $5 Baby Guinness shots and $13 Domestic Buckets!  Soup of the day is VODKA!  See you soon.","socialId":"Facebook694174457290548","title":"Dogs make me laugh!  If you could use a good laugh, come hang out at the Lucky Dog...With or without a dog.  We have puppy training classes going on tonight from 7-8pm and all kinds of tasty cocktails!  $2.50 Bud Light Drafts, $4 Boston Terrier Cocktails, $5 Baby Guinness shots and $13 Domestic Buckets!  Soup of the day is VODKA!  See you soon.","url":"https:\/\/www.facebook.com\/photo.php?fbid=694174457290548&set=a.358778557496808.77567.354980607876603&type=1"},"title":"Dogs make me laugh!  If you could use a good laugh, come hang out at the Lucky Dog...With or without a dog.  We have puppy training classes going on tonight from 7-8pm and all kinds of tasty cocktails!  $2.50 Bud Light Drafts, $4 Boston Terrier Cocktails, $5 Baby Guinness shots and $13 Domestic Buckets!  Soup of the day is VODKA!  See you soon."},{"description":null,"id":"693344770706850","largeImage":"https:\/\/scontent-a.xx.fbcdn.net\/hphotos-xfp1\/t1.0-9\/10150717_693344770706850_665233369_n.jpg","mediumImage":"https:\/\/scontent-a.xx.fbcdn.net\/hphotos-xfp1\/t1.0-9\/p480x480\/10150717_693344770706850_665233369_n.jpg","photoTime":1395779637,"smallImage":"https:\/\/scontent-a.xx.fbcdn.net\/hphotos-xfp1\/t1.0-9\/p130x130\/10150717_693344770706850_665233369_n.jpg","socialInfo":{"imageUrl":"https:\/\/fbcdn-photos-g-a.akamaihd.net\/hphotos-ak-xfp1\/t1.0-0\/10150717_693344770706850_665233369_s.jpg","shortDesc":"Crazy day?  Come by Lucky Dog tonight with your pup and get a $15 Beer for you and Bath for your dog!  We still have our Unlimited 30 day Daycare passes on special for only $300 on sale, so come check it out!  $2.50 Bud Light Drafts, $5 Baby Guinness Shots and $4 Boston Terrier Cocktails!  Come see us!!!","socialId":"Facebook693344770706850","title":"Crazy day?  Come by Lucky Dog tonight with your pup and get a $15 Beer for you and Bath for your dog!  We still have our Unlimited 30 day Daycare passes on special for only $300 on sale, so come check it out!  $2.50 Bud Light Drafts, $5 Baby Guinness Shots and $4 Boston Terrier Cocktails!  Come see us!!!","url":"https:\/\/www.facebook.com\/photo.php?fbid=693344770706850&set=a.358778557496808.77567.354980607876603&type=1"},"title":"Crazy day?  Come by Lucky Dog tonight with your pup and get a $15 Beer for you and Bath for your dog!  We still have our Unlimited 30 day Daycare passes on special for only $300 on sale, so come check it out!  $2.50 Bud Light Drafts, $5 Baby Guinness Shots and $4 Boston Terrier Cocktails!  Come see us!!!"}],"totalPhotos":652},"maxAge":1800,"serviceUrl":"http:\/\/cms.mobile.conduit-services.com\/photos\/facebook\/luckydoglkn\/25\/0\/?params=%7B%0D%0A%20%20%22albumId%22%3A%20%22358778557496808%22%2C%0D%0A%20%20%22albumName%22%3A%20%22Timeline%20Photos%22%0D%0A%7D"},{"data":{"isRtl":false,"items":{"ButtonOk":"OK","ButtonCancel":"Cancel","ButtonClose":"Close","ButtonRetry":"Retry","DialogMessageFailGetFeeds":"Failed to load application data. You must connect to a Wi-Fi or cellular data network to access this data.","DialogMessageFailGetAppExperience":"Failed to load application data. You must connect to a Wi-Fi or cellular data network to access this data.","DialogMessageFailGetAppNormal":"Failed to load application data. You must connect to a Wi-Fi or cellular data network to access this data.","DialogMessageFailLoadPage":"Failed to load page.","DialogMessageFailGetAppId":"Please check your application code and try again","DialogMessageEmailAddressInvalid":"E-mail address is invalid","DialogMessageAppCodeInvalid":"App code is invalid","DialogMessageFailGetServiceMap":"Failed to initialize network communication","DialogMessageFacebookLogoutFail":"Unable to log out of Facebook at the moment. Please try again later.","DialogCaptionError":"Error","DialogCaptionFailGetFeeds":"Network error","DialogCaptionFacebookLogout":"Facebook logout","SSecondsAgo":"seconds ago","SSecondAgo":"a second ago","SNumberSecondsAgo":"{number} seconds ago","SMinuteAgo":"a minute ago","SNumberMinutesAgo":"{number} minutes ago","SHourAgo":"an hour ago","SNumberHoursAgo":"{number} hours ago","SDayAgo":"a day ago","SNumberDaysAgo":"{number} days ago","SWeekAgo":"a week ago","SNumberWeeksAgo":"{number} weeks ago","SMonthAgo":"a month ago","SNumberMonthsAgo":"{number} months ago","SYearAgo":"a year ago","SNumberYearsAgo":"{number} years ago","IndicatorLoading":"Loading...","HtmlTextLoadingPagination":"Loading...","HtmlTextShowMorePagination":"Show more","HtmlTextMorePages":"More","DialogMessageLeaveWarning":"You are about to leave this app. Press OK to continue.","DialogCaptionNavigate":"Navigate","DialogMessageFailConnectTwitter":"Failed to connect to Twitter","DialogMessageFailLoginTwitter":"Failed to log in to Twitter","DialogMessageShareNotSupportedInSimulator":"Share is not supported in Simulator mode.","DialogCaptionTwitter":"Twitter","DialogCaptionShare":"Share","DialogCaptionFacebook":"Facebook","IndicatorShareTwitterSigningIn":"Signing in ...","IndicatorShareLogOut":"Log out...","IndicatorSharePublishing":"Publishing...","IndicatorShareTweeting":"Tweeting...","HtmlTextShareOnTwitter":"Share on Twitter","HtmlTextShareOnFacebook":"Share on Facebook","HtmlTextShareTwitterPostButton":"Tweet","HtmlTextShareFacebookPostButton":"Post","HtmlTextShareTwitterChangeUserButton":"Change user","HtmlTextShareFacebookChangeUserButton":"Change user","HtmlTextShareTwitterLoginCaption":"Sign in","HtmlTextShareTwitterUserNameCaption":"User name or e-mail","HtmlTextShareTwitterPasswordCaption":"Password","HtmlTextShareTwitterLoginButton":"Sign in","SShareTweetedFromLink":"Tweeted from {appLink}","SShareMobileApp":"mobile app","SShareMailApplinkHtml":"Shared from my: {htmlLink}","SShareMailApplinkSimple":"Shared from my mobile app: {appLink}","SShareFromMobile":"Shared from my mobile app","SShareFromMobileWithLink":"Shared from my mobile app {appLink}","SShareConduitMobile":"Conduit Mobile","SShareMailPowerByConduitHtml":"Powered by: {htmlLink}","SShareMailPowerByConduitSimple":"Powered by Conduit Mobile: {conduitLink}","DialogMessageShareFailConectTwitter":"Sorry, failed to connect to Twitter service, please try again shortly.","DialogMessageShareFailConectFacebook":"Sorry, failed to connect to Facebook service, please try again shortly.","DialogMessageShareFailPostFacebook":"Sorry, failed to post. Facebook is not responding.","DialogMessageShareFailTweet":"Failed to tweet","HtmlTextRevuShakeToReload":"(shake to reload app)","HtmlTextRevuReopenToReview":"(reopen app to review your changes)","HtmlTextContactUsWeb":"Web:","HtmlTextContactUsMail":"Mail:","HtmlTextContactUsPhone":"Phone:","HtmlTextContactUsFax":"Fax:","HtmlTextContactUsAddress":"Address:","HtmlTextContactUsShowOnMap":"Show on map","HtmlTextContactUsGetDirections":"Get directions","HtmlTextFacebookLikesCount":"{number} likes","HtmlTextFacebookReadMore":"Read more","SFacebookShareEmailSubject":"Check out this post from {user}'s Facebook page","SFacebookShareTwitterFrom":"From {user}'s Facebook wall","IndicatorLiveAlbumPostingImage":"Posting Image...","SLivePersonUserName":"me","DialogMessageLivePersonNoAnswer":"There was no answer. Try again later.","DialogMessageLivePersonErrorClosing":"Error in closing chat","DialogMessageLivePersonNoAvailability":"Account is offline","HtmlTextLivePersonStart":"Start","HtmlTextLivePersonEnd":"End","HtmlTextLivePersonSend":"Send","HtmlTextLivePersonStatusInit":"To initiate a chat session click:","HtmlTextLivePersonStatusChatting":"Chatting with {agentName}","HtmlTextLivePersonStatusCheckingAvailability":"Checking availability...","HtmlTextLivePersonStatusClosingChat":"Closing chat...","HtmlTextLivePersonStatusWaitingAgent":"Waiting for an agent...","HtmlTextLivePersonStatusAgentTyping":"{agentName} is typing...","DialogCaptionLivePersonChatEnded":"Chat ended","DialogCaptionLivePersonNoAvailability":"Not available","DialogCaptionLivePersonTimeOut":"Time out","HtmlTextRadioLoading":"Loading...","HtmlTextRssShowOnMap":"Show on map","HtmlTextRssReadMore":"Read more","SRssShareComment":"check out this post from {link}","SRssShareEmailSubject":"Check out this article from {title}","SRssShareTwitterFrom":"from {title}","HtmlTextSlicerUnableLoading":"Unable to load site content","HtmlTextTwitterFollowersCount":"{number} followers","HtmlTextTwitterStatusesCount":"{number} statuses","STwitterShareEmailSubject":"Check out this tweet from @{name}","HtmlTextYoutubeViewsCount":"{number} views","HtmlTextYoutubeByAuthor":"by {author}","HtmlTextYoutubeRatings":"{ratings} Ratings | {views} Views","HtmlTextYoutubeLikes":"{likes} Like | {dislikes} Dislike","SYoutubeShareTitle":"Check out this video - {title}","DialogMessageAudioNoUrl":"There is no audio-source.","DialogMessageAudioNoFeeds":"Your device doesn't support playing this type of audio files","DialogMessageAudioNotSupportedDevice":"Your device doesn't support HTML5 audio","DialogMessageAudioNotSupportedSimulator":"Your browser (of the simulator) doesn't support audio","DialogMessageAudioTypeNotSupportedDevice":"Your device doesn't support playing this type of audio file","DialogMessageAudioTypeNotSupportedSimulator":"Your browser (of the simulator) doesn't support playing this type of audio file","HtmlTextAudioLoading":"Loading...","HtmlTextAudioSeeking":"Seeking...","HtmlTextAudioSeek":"Seek:","HtmlTextAudioLyricist":"Lyricist:","HtmlTextAudioComposer":"Composer:","HtmlTextAudioAlbum":"Album:","HtmlTextVideoByAuthor":"by {author}","DialogCaptionEmail":"Email","DialogMessageFailGetAppDisabled":"Sorry, this app has been temporarily disabled due to a content violation.\\n\\nPlease check back in a few days","DialogMessageFailGetServiceMapWinPhone":"Failed to initialize network communication. Press OK to retry or Cancel to quit","DialogMessageMediaNotSupported":"Audio is not supported by this browser","DialogMessageLinkNotSupportedInSimulator":"This link is not supported in simulation mode","DialogMessageAlbumAddedToFavorites":"Album's tracks added to favorites","DialogCaptionShareControlDialog":"Share on","DialogCaptionFacebookLogin":"Facebook Login","DialogCaptionTwitterLogout":"Twitter Logout","DialogCaptionTwitterLogin":"Twitter Login","DialogCaptionAddedToFavorites":"Add to favorites","HtmlTextShareTwitterWriteCommentPlaceholder":"Enter your comment","HtmlTextShareFacebookWriteCommentPlaceholder":"Enter your comment","HtmlTextShareChangeUserName":"Not {name}?","HtmlTextAddAlbumToFavorites":"Add tracks to your favorites list now","HtmlTextAddTrackToFavorites":"Add track to your favorites list now","HtmlTextAudioDetails":"Details","HtmlTextAudioTrackNumber":"Track {number}","HtmlTextAudioVocals":"Vocals","HtmlTextAudioWriters":"Writers","HtmlTextAudioLyrics":"Lyrics","HtmlTextBlogShowMorePosts":"Show more","HtmlTextBlogLoadingPosts":"Loading...","HtmlTextBlogViewOriginalPost":"view original post","HtmlTextBlogViewOriginalSite":"view original site","HtmlTextBlogbyAuthor":"by {author}","ToastMessageBlogFailedGetPosts":"failed to get posts","HtmlTextFacebookPageLikesCount":"like this","HtmlTextFacebookShowMorePosts":"Show more posts","HtmlTextFacebookLoadingPosts":"Loading...","HtmlTextFacebookPostCommentsCount":"{number} comments","HtmlTextRemoveTrackFromFavorites":"Remove track from your favorites list now","SShareEmailLink":"Read more","HtmlTextViewOriginalPageBtnText":"View Original Version","HtmlTextMapLoading":"Loading...","HtmlTextShareButtonText":"Share","HtmlTextPurchaseItemBuy":"Buy","HtmlTextPurchaseItemBuyAlbum":"Buy Album","DialogCaptionPurchaseChooseMethod":"Purchase:","HtmlTextPaginationShowMoreItems":"Show more...","HtmlTextPaginationRefreshItems":"Loading...","HtmlTextPaginationRefreshButton":"Refresh","ToastMessagePaginationFailedGetItems":"failed to receive data","ToastMessageTrackAddedToFavorites":"Track added to favorites","ToastMessageTrackRemovedFromFavorites":"Track removed from favorites","ToastMessageAudioInitFail":"Failed to initialize audio player","ToastMessageFacebookFailedGetComments":"failed to receive data","DialogMessageLiveAlbumCameraNotSupported":"Camera is not supported","DialogMessageLiveAlbumCameraNotSupportedSimulator":"Camera is not supported in simulation mode","DialogMessageLiveAlbumTakePhotoFailed":"Take photo failed ({message})","DialogMessageLiveAlbumPostPhotoFailed":"Post photo failed","ToastMessageLiveAlbumPublishingPhoto":"Image uploaded successfully, stream will be updated shortly","HtmlTextLiveAlbumByUploader":"by {name}","HtmlTextLiveAlbumPhotos":"photos","HtmlTextLiveAlbumShareCheckbox":"Share on Facebook","HtmlTextLiveAlbumNoImages":"BE THE FIRST TO POST A PHOTO","HtmlTextLiveAlbumLoadingAlbum":"Loading...","HtmlTextLiveAlbumLoadingImage":"Loading...","HtmlTextLiveAlbumLoadingShowMore":"Loading...","HtmlTextLiveAlbumShowMore":"Show more","HtmlTextLiveAlbumErrorLoadingImage":"Unable to load image","HtmlTextLiveAlbumFacebookLoginLiveAlbum":"LiveAlbum","HtmlTextLiveAlbumFacebookLogin":"Share photos with your friends on facebook","HtmlTextLiveAlbumFacebookLoginComment":"(requires that you link your facebook account)","HtmlTextLiveAlbumEula":"Terms of Use","HtmlTextLiveAlbumAddComment":"add comment","DialogCaptionLiveAlbumPostPhoto":"Post photo","DialogButtonLiveAlbumPostPhotoOk":"post","DialogButtonLiveAlbumPostPhotoCancel":"cancel","DialogButtonLiveAlbumChoosePhotoChoose":"Choose photo","DialogButtonLiveAlbumChoosePhotoTake":"Take photo","DialogButtonLiveAlbumChoosePhotoCancel":"Cancel","HtmlTextLivePersonInputPlaceholder":"Write a message...","HtmlTextLivePersonStatusCheckingAvailabilityMinorText":"connecting","HtmlTextLivePersonStatusWaitingAgentMinorText":"calling","HtmlTextPhotosImagesCount":"{number} photos","HtmlTextReviewsReviewsCount":"{number} reviews on {provider}","HtmlTextReviewsByAuthor":"by {name}","HtmlTextReviewsLoadingProvider":"Loading...","HtmlTextReviewsReadMoreLink":"Read more","DialogMessageSubscribeSubscribeSuccess":"Thank you for subscribing","DialogMessageSubscribeFailed":"Subscription currently unavailable. Please try again later","HtmlTextSubscribeUnknownButton":"Unknown","HtmlTextSubscribeFacebookButton":"Facebook","HtmlTextSubscribeTwitterButton":"Twitter","HtmlTextSubscribeLinkedInButton":"LinkedIn","HtmlTextSubscribeSubscribeButton":"Subscribe","HtmlTextSubscribeFollowBlogTitle":"Follow {blogTitle}","HtmlTextSubscribeDiscoverString":"Discover us on these sites","HtmlTextSubscribeSubscribeString":"Subscribe to {blogTitle}","HtmlTextSubscribeInsetYourEmail":"your@email.com","HtmlTextSubscribeLoading":"Subscribing...","ToastMessageSubscribeInsetEmail":"Email address is required","ToastMessageSubscribeInvalidEmail":"Please enter a valid email address","DialogCaptionSubscribeSuccess":"Success","DialogCaptionSubscribeFail":"Error","HtmlTextTwitterFollowers":"Followers","HtmlTextTwitterTweets":"Tweets","HtmlTextTwitterFollowButton":"Follow","HtmlTextTwitterRetweet":"by {retweeterName}","HtmlTextTwitterRetweetDetails":"retweeted by","HtmlTextTwitterShowMoreTweets":"Show more tweets","HtmlTextTwitterLoadingTweets":"Loading...","HtmlTextYoutubeViews":"{views} Views","HtmlTextEventsPastEvents":"Past Events","HtmlTextEventsFutureEvents":"Upcoming Events","HtmlTextEventsMonthJanuary":"January","HtmlTextEventsMonthFebruary":"February","HtmlTextEventsMonthMarch":"March","HtmlTextEventsMonthApril":"April","HtmlTextEventsMonthMay":"May","HtmlTextEventsMonthJune":"June","HtmlTextEventsMonthJuly":"July","HtmlTextEventsMonthAugust":"August","HtmlTextEventsMonthSeptember":"September","HtmlTextEventsMonthOctober":"October","HtmlTextEventsMonthNovember":"November","HtmlTextEventsMonthDecember":"December","HtmlTextEventsDaySunday":"Sunday","HtmlTextEventsDayMonday":"Monday","HtmlTextEventsDayTuesday":"Tuesday","HtmlTextEventsDayWednesday":"Wednesday","HtmlTextEventsDayThursday":"Thursday","HtmlTextEventsDayFriday":"Friday","HtmlTextEventsDaySaturday":"Saturday","HtmlTextEventsVenueStr":"Venue","HtmlTextEventsLocationStr":"Location","HtmlTextEventsPhoneNumberStr":"Phone Number","HtmlTextEventsTicketStr":"Ticket","HtmlTextShowOnMapButtonStr":"Map","HtmlTextContactUsSignUpStr":"Sign Up","HtmlTextContactUsAddressStr":"Address","HtmlTextContactUsPhoneNumberStr":"Phone Number","HtmlTextContactUsFaxNumberStr":"Fax Number","HtmlTextContactUsCallNowStr":"Call","HtmlTextContactUsCallStr":"Call","HtmlTextContactUsFaxStr":"Fax","HtmlTextContactUsEmailStr":"Email","HtmlTextContactUsLinkStr":"Link","HtmlTextContactUsMapStr":"Map","HtmlTextContactUsContactUsStr":"Contact us","HtmlTextFavoritesEditButton":"Edit","HtmlTextFavoritesDoneButton":"Done","HtmlTextFavoritesCancelButton":"Cancel","HtmlTextFavoritesBuyButton":"Buy","DialogCaptionPhotosManagerDeviceNotSupported":"Your device does not support the photo gallery view","DialogCaptionPhotosManagerSimulatorNotSupported":"Photo gallery view is not supported in simulator mode","HtmlTextPaginationLoadingItems":"Loading...","PushNotificationTitle":"Notification","DialogMessagePurchaseFail":"Purchase failed. Please try again shortly.  If you encounter any additional problems, please feel free to contact us.","HtmlTextEventsNoEventsStr":"There are currently no events to display.","HtmlTextFavoritesNoFavsStr1":"No tracks added.","HtmlTextFavoritesNoFavsStr2":"Add tracks to your favorites list.","DialogMessageFacebookRequiresPermissions":"This action requires permissions","DialogCaptionFacebookRequiresPermissions":"Facebook","SShareAppMailBody":"Hey,<br>Check out the {appName} mobile app I just used!","SShareAppMailSubject":"Check out this great new app!","SSharePhotoSubject":"Look at this awesome pic!","SSharePhotoTitle":"Awesome pic","SSharePhotoText":"Take a look at this awesome pic!","HtmlTextCommentDialogButtonOk":"Post on Facebook","HtmlTextCommentDialogButtonCancel":"Cancel","HtmlTextCommentDialogPlaceholder":"Write something...","HtmlTextShareAppButtonText":"Share app","SShareApp":"Check out the {appName} mobile app I just used!","HtmlTextFacebookAddCommentButton":"Comment","HtmlTextFacebookLikePostButton":"Like","HtmlTextFacebookUnikePostButton":"Unlike","HtmlTextFacebookLikeComment":"Like","HtmlTextFacebookUnikeComment":"Unlike","HtmlTextFacebookPostLikesCount":"{number} people like this","HtmlTextFacebookPostLikesCountIncludeYou":"You and {number} others like this","HtmlTextPhotosNoImages":"Album is empty","HtmlTextTwitterUnfollowButton":"Unfollow","TitleShareVia":"Share via","HtmlTextFacebookPostLikesOnlyYou":"You like this","HtmlTextSpeakersBioTitle":"Speaker's bio","HtmlTextAboutUsItemTitleDescription":"Description","HtmlTextAboutUsItemTitleFoodStyle":"Food Type","HtmlTextInstagramUserLikePhoto":"Like this","HtmlTextInstagramPhotosCount":"photos","HtmlTextInstagramFollowersCount":"followers","HtmlTextInstagramFollowingCount":"following","DialogMessageFormSendSuccess":"Data sent","DialogMessageFormSendFail":"Failed to send data","HtmlTextFormSendButton":"Submit","ToastMessageFormFieldMandatory":"Field {fieldName} cannot remain empty","HtmlTextEventsRsvpButton":"Join","HtmlTextEventsRsvpAttending":"Attending","HtmlTextEventsRsvpMaybe":"Maybe","HtmlTextEventsRsvpDecline":"Decline","HtmlTextEventsAdd2CalStr":"Calendar","HtmlTextAboutUsItemTitleGenre":"Genre","HtmlTextAboutUsItemTitleFounded":"Founded","HtmlTextAboutUsItemTitleMembers":"Members","HtmlTextAboutUsItemTitleHometown":"Hometown","HtmlTextAboutUsItemTitleBiography":"Biography","HtmlTextAboutUsItemTitleRecordLabel":"Record Label","HtmlTextAboutUsItemTitleHours":"Hours","HtmlTextAboutUsItemTitleServices":"Services","HtmlTextAboutUsItemTitleAwards":"Awards","HtmlTextAboutUsItemTitleParking":"Parking","HtmlTextAboutUsItemTitleProducts":"Products","HtmlTextAboutUsItemTitleMission":"Mission","HtmlTextAboutUsItemTitleManager":"Manager","HtmlTextAboutUsItemTitleBookingAgent":"Booking Agent","HtmlTextAboutUsItemTitleSpecialties":"Specialties","HtmlTextAboutUsItemTitleCulinaryTeam":"Culinary Team","HtmlTextAboutUsItemTitleGeneralInfo":"General Info","HtmlTextAboutUsItemTitleCompanyOverview":"Company Overview","HtmlTextAboutUsItemHoursAlwaysOpen":"Open 24\/7","HtmlTextAboutUsItemHoursNoHours":"No available hours","HtmlTextAboutUsInfoVersion":"Version {versionName}","HtmlTextAboutUsReadMore":"Read more","HtmlTextAboutUsListItemReadMore":"Read more","HtmlTextAboutUsDescriptionTitle":"Description","DialogCaptionConfirm":"Confirm","DialogCaptionSuccess":"Success","DialogMessagePollAreYouSureVote":"Are you sure you want to vote for \"{text}\" ?","DialogMessagePollVoteFail":"Your vote was not received. Please try again later.","DialogMessagePollVoteSuccess":"Your vote has been received.","HtmlTextPollVoteButton":"Vote","HtmlTextLinksDescriptionTitle":"Description","HtmlTextDatePickerDialogButtonOk":"OK","HtmlTextDatePickerDialogButtonCancel":"Cancel","HtmlTextDatePickerDialogButtonClear":"Clear","HtmlTextPageNotSupportedInCp":"This page is not supported in simulator mode.","HtmlTextPageNotSupportedInCp2":"To test it on your device, please install our ReVu app.","HtmlTextInstagramLikes":"Likes","HtmlTextInstagramComments":"Comments","HtmlTextInstagramPrivateUserMainText":"This user does not share information publicly.","HtmlTextInstagramPrivateUserSecondaryText":"You cannot view this page.","HtmlTextLiveAlbumUploadingImage":"Uploading image...","HtmlTextLiveAlbumUploadingFailed":"The image failed to upload.","HtmlTextLiveAlbumUploadedByYou":"You","HtmlTextAgendaSpeakersCount":"{number} speakers:","HtmlTextAgendaOneSpeaker":"Speaker:","HtmlTextAgendaSessionDetails":"Details","HtmlTextAgendaAddToFav":"Add to Favs","HtmlTextAgendaRemoveFromFav":"Remove from Favs","DialogMessageAgendaNoFav":"There are no sessions in your Favorites list.","DialogCaptionAgendaNoFav":"Favorites","DialogMessageEventsRsvpNotSupportedInSimulator":"This action is not supported in simulator mode.","UserMessageTextHello":"Hi there! I’m having a blast at SXSW. You?","ReportsUploadingImage":"Uploading...","ReportsImageUploadingStartedForImageByIndex":"Uploading image {number}","ReportsImageUploadingSucceededForImageByIndex":"Upload for image {number} successful","ReportsImageUploadingFailedForImageByIndex":"Image {number} failed to upload","ReportsImageUploaded":"Uploaded","ReportsImageUploadFailed":"Upload failed","ReportsImageUploadAddPhoto":"Add a photo","SShareFavoritesPlaylistTitle":"Check out the playlist I've created!","HtmlTextCommentDialogButtonOkShort":"Post","HtmlTextCommentDialogTitle":"Comment","HtmlTextQuizStartQuizButton":"Start Quiz","HtmlTextQuizQuestionPosition":"{index} of {total}","HtmlTextQuizHowManyCorrect":"You answered {count} correctly.","HtmlTextQuizRetryButton":"Replay Quiz","SQuizShareTitle":"I played the quiz: {title}","SQuizShareBody":"I played the quiz: {title}. My score is: {grade}","UploadStatusLiveAlbumImageUploading":"Uploading image","UploadStatusLiveAlbumImageSent":"Image sent ","UploadStatusLiveAlbumProcessFailed":"Something went wrong. Please try again.","SAgendaShareSession":"I'm in the session: {sessionTitle}","HtmlTextLinkStaticTextIfCantOpenSafari":"Tap the buttons to start using this app","HtmlTextFavoritesShareButton":"Share","PhotoGalleryPreparingToShare":"Preparing to share...","ErrorHandleTitle":"Failed to retrieve data","ErrorHandleSubTitle":"There might be a problem with the connection to the server","ErrorHandleReloadButtonTitle":"Reload","CollectionsSearchPlaceholder":"Search {category}","CollectionsBuyNow":"Buy Now","CollectionsCurrentPrice":"Current Price","CollectionsItemDetails":"Item Details","CollectionsContactUs":"Contact Us","CollectionsVisitUs":"Visit Us","CollectionsContactItem-Email":"Email","CollectionsContactItem-Facebook":"Facebook Page","CollectionsContactItem-Linkedin":"LinkedIn","CollectionsContactItem-Twitter":"Twitter","CollectionsContactItem-Website":"Website","SShareMailPowerByBrand":"Powered by {brand}","HtmlTextCouponsTitleOffer":"Special Offer","HtmlTextCouponsTitleSpecialDiscount":"Special Discount","HtmlTextCouponsTitleOriginalPrice":"Original Price","HtmlTextCouponsTitleDiscount":"Discount","HtmlTextCouponsTitleSaving":"Savings","HtmlTextCouponsTitleDealDetails":"Deal Details","ReportsInvalidFormPopupTitle":"Form cannot be sent","ReportsInvalidInputMessage":"{name} is a mandatory field","ReportsTemplateDefaultSubmitCaption":"Submit","ReportsInvalidEmail":"Invalid email","ReportsSaveFailedSubtitleMessage":"Oops! We couldn't save your message. Please try again.","ReportsShowMyLocationMessage":"Show my location","ReportsFailedToDetermineLocation":"We couldn't pinpoint your location. Please make sure your GPS device is on.","CollectionsSearchNoResultsFound":"No results found","CollectionsSearchNoResultsFoundSubtitle":"We did not find results for: <b>{query_string}<\/b> On <b>{node_name}<\/b>","CollectionsSearchNoItemsFound":"No items found","CollectionsSearchNoItemsFoundSubtitle":"{node_name} has no items","HtmlTextInputPanelButtonSendMessage":"Send","HtmlTextInputPanelPlaceholder":"Write something...","HtmlTextChatHeaderChattingWith":"Chatting with","HtmlTextLoginOverlayTitle":"Log in to start networking","HtmlTextLoginOverlayLogin":"Log in","HtmlTextMyProfileLogoutFromLinkedin":"Log out of LinkedIn","HtmlTextMyProfileLogoutButton":"Sign Out","HtmlTextInboxNoMessagesStr":"No messages","ReportsMandatoryMessage":"Some fields are mandatory","SUnknownUserName":"[Unknown]","ReportsInvalidValueMessage":"{name} is invalid. Please enter correct format.","SUserJobTitleFull":"{job_title} at {company}","UserSearchNoResultsFound":"No results found","UserSearchNoResultsFoundSubtitle":"No matches found","UserSayHelloTo":"Say hello to {user_caption}","UserGoogle":"Google {user_caption}","AppsfireNotifications":"Notifications","SmartBannerInAppStore":"This app is available on the App Store","SmartBannerInGooglePlay":"This app is available on Google Play","SmartBannerButtonText":"Get It","SSharePhotoSubjectWithTitle":"Look at this awesome pic: {title}","HtmlTextContactUsWebSiteStr":"Website","HtmlTextCouponsPriceOff":"OFF","HtmlTextCouponsTitleNewPrice":"New Price","HtmlTextCouponsValidFrom":"valid from","HtmlTextCouponsValidUntil":"until","HtmlTextCouponsTermsTitle":"Terms & Conditions","HtmlTextCouponsTitleValidity":"Expiration","ToastMessageCouponsClaimSuccess":"Congrats! You’ve claimed this offer.","HtmlTextCouponsClaimButton":"Get Coupon","HtmlTextCouponsCouponClaimed":"Coupon claimed","HtmlTextCouponsExpired":"EXPIRED","CouponsNoResultsFound":"No coupons available","CouponsNoResultsFoundSubtitle":"Check back again soon!","HtmlTextCouponsShareDefaultOfferTitle":"Buy 1 Get 1 FREE","HtmlTextCouponsShareTitle":"Hey, you should grab this deal, too!","HtmlTextCouponsShareDescription":"Check out the awesome deal I got through the {appName} mobile app: \"{offerTitle}\"","HtmlTextAboutUsInfoTermsTitle":"Terms and Conditions","HtmlTextPhotosImagesCountTitle":"photos","HtmlTextAboutUsInfoPrivacyPolicy":"By downloading, accessing, and\/or using the App in any manner, you agree to the <a href='http:\/\/mobile.conduit.com\/eula.aspx'>Terms and Conditions<\/a> and <a href='http:\/\/mobile.conduit.com\/privacypolicy.aspx'>Privacy Policy<\/a>","ReportsSavedSuccessfullyMessage":"Sent successfully","ReportsSavedSuccessfullySubtitleMessage":"Thank you! Your message has been sent successfully.","ReportsSaveFailedMessage":"Send failed","ReportsSavingMessage":"Sending...","HtmlTextLoyaltyCardsDefaultFreebieName":"freebie","HtmlTextLoyaltyCardsTitleOffer":"Special Offer","HtmlTextLoyaltyCardsValidFrom":"Start","HtmlTextLoyaltyCardsValidUntil":"End","HtmlTextLoyaltyCardsShowMoreButton":"Info","HtmlTextLoyaltyCardsExpired":"EXPIRED","HtmlTextLoyaltyCardsComingSoon":"COMING SOON","HtmlTextLoyaltyCardsShareWinTitle":"I just filled up my {cardName} loyalty card and got a FREE {freebieName}! Get the {appName} mobile app and start collecting your freebies!","HtmlTextLoyaltyCardsShareWinTwitterTitle":"I just filled up my loyalty card on the {appName} mobile app and got a freebie! Check it out","HtmlTextLoyaltyCardsShareWinEmailTitle":"Wanna get free stuff?","HtmlTextLoyaltyCardsShareWinEmailText":"Hey,\u000aI just filled up my {cardName} loyalty card and got a FREE {freebieName}! Get the {appName} app and start collecting stamps on your loyalty card to get rewards, too. It pays to be a loyal customer! :)","HtmlTextLoyaltyCardsShareTitle":"I’m on my way to getting some free stuff thanks to my {cardName} loyalty card. Get the {appName} mobile app and you can start collecting rewards too!","HtmlTextLoyaltyCardsShareTwitterTitle":"I’m about to get free stuff using my {appName} mobile app! Download it and start earning rewards too!","HtmlTextLoyaltyCardsShareEmailTitle":"Wanna get free stuff, too?","HtmlTextLoyaltyCardsShareEmailText":"Hey,\u000aI’m using this really cool loyalty card and I’m on my way to getting a FREE {freebieName}!","HtmlTextLoyaltyCardsValidityTitle":"Validity","HtmlTextLoyaltyCardsInfoTitle":"Card Info","HtmlTextLoyaltyCardsInfoButtonCancel":"Close","HtmlTextLoyaltyCardsOnlyNativeTitle":"Get your freebie!","HtmlTextLoyaltyCardsOnlyNativeText":"Download our app to start collecting stamps and earning rewards","HtmlTextLoyaltyCardsOnlyNativeDownloadButton":"Download Now!","HtmlTextLoyaltyCardsNoItemsTitle":"No loyalty cards available","HtmlTextLoyaltyCardsNoItemsText":"Check back again soon!","HtmlTextLoyaltyCardsDialogButtonOk":"Stamp Card","HtmlTextLoyaltyCardsDialogButtonCancel":"Cancel","HtmlTextLoyaltyCardsDialogPlaceholder":"Enter Code","HtmlTextLoyaltyCardsDialogPlaceholderLocked":"Locked","HtmlTextLoyaltyCardsDialogStampCaption":"Stamp Card","HtmlTextLoyaltyCardsDialogCongratsCaption":"Congrats!","HtmlTextLoyaltyCardsDialogCongratsSuccessCaption":"Congrats!","HtmlTextLoyaltyCardsDialogNormalText":"Please hand your device to the cashier to stamp your device","HtmlTextLoyaltyCardsDialogMidFreebieText":"Please hand your device to the cashier to stamp your device and get a free {freebie}","HtmlTextLoyaltyCardsDialogFreebieText":"You've earned your freebie {freebie}","HtmlTextLoyaltyCardsDialogFreebieSuccessText":"You've redeemed your freebie {freebie}","HtmlTextLoyaltyCardsDialogServiceCoolDownText":"Uh oh! That was one too many attempts. For security purposes, this card will be blocked for {hours} hours","HtmlTextLoyaltyCardsDialogLoading":"Verifying code...","HtmlTextLoyaltyCardsDialogServiceFailText":"Service is unavailable. Try again later.","HtmlTextLoyaltyCardsDialogWrongCodeText":"Incorrect code","HtmlTextLoyaltyCardsDialogLimitPerDayText":"Sorry, the daily stamp limit for this card is {punchesPerDay}. Please come back tomorrow!","CollectionsCategoryItemsCount":"{count} items","CollectionsCategoryUnknownItemsCount":"Category","CollectionsSearchPlaceholder2":"Enter your search here","HtmlTextVideoShowAllChannelItems":"See all","HtmlTextVideoChannelItemsCount":"{number} videos","HtmlTextVideoMoreFromChannelTitle":"More from {title}","HtmlTextNoCouponsText":"But keep checking back so you don’t miss any hot deals.","HtmlTextNoCouponsTitle":"No Coupons Available","HtmlTextCouponsCouponClaimedLongText":"Coupon claimed and ready for use","HtmlTextVideoNoItems":"No videos","HtmlTextLiveAlbumOverlayText":"Take pictures and instantly share them with friends via email and the social channels. The shared album gets updated constantly so you and your friends can take, share, and view photos in real time, right through the app!","HtmlTextLiveAlbumListHeaderHelper":"Select an album to get started","HtmlTextLiveAlbumOverlayButtonText":"Start Sharing","HtmlTextLiveAlbumHeaderHelper":"Start snapping and sharing photos","HtmlTextItemNotFoundTitle":"Uh oh!","HtmlTextItemNotFoundText":"Looks like we took a wrong turn.","HtmlTextBadPermalinkButtonText":"Go to {alias}","HtmlTextPageNotFoundBackButtonText":"Go to app","HtmlTextNoTabsTitlePublisher":"Add Content","HtmlTextNoTabsTextPublisher":"Add content to finish building this page.","HtmlTextNoTabsTitleUser":"Oops!","HtmlTextNoTabsSubTitleUser":"Nothing to see here right now.","HtmlTextNoTabsTextUser":"Try again later.","HtmlTextNoItemsTitle":"Oops!","HtmlTextNoItemsText":"Nothing to see here right now. Try again later.","HtmlTextNoEventsTitle":"No Events","HtmlTextNoEventsSubTitle":"(Don’t worry, you’re not missing out on anything.)","HtmlTextNoEventsText":"Check back soon!","HtmlTextFailItemsTitle":"Oops!","HtmlTextFailItemsText":"Looks like some information is missing.","HtmlTextFailItemsButtonText":"Try again","HtmlTextInvalidGetItemsTitle":"Almost Done!","HtmlTextInvalidGetItemsText":"To see this page, be sure to fill in all required fields.","HtmlTextErrorViewFacebookRestrictionTitle":"This page is restricted","HtmlTextFacebookRestrictedText":"To access this page, please log in to your Facebook account","HtmlTextLiveAlbumOverlayTitle":"Share Photos with Friends in a Snap","_shortTimeUNI":"h:mm a","_shortDateUNI":"M\/d\/yyyy","_shortTime":"h:MMTT","_day1":"Sunday","_longDate":"mmmm dd, yyyy","_day3":"Tuesday","_day4":"Wednesday","_day5":"Thursday","_day3s":"Tue","_day4s":"Wed","_day5s":"Thu","_day7":"Saturday","_day1s":"Sun","_day7s":"Sat","_month9":"September","_month9s":"Sep","_day2":"Monday","_month10":"October","_month11":"November","_month10s":"Oct","_month11s":"Nov","_day2s":"Mon","_month3":"March","_month5":"May","_month3s":"Mar","_month5s":"May","_shortDate":"m\/d\/yyyy","_dateTime":"m\/d\/yyyy h:MM:ss tt","_month1":"January","_month6":"June","_month7":"July","_month1s":"Jan","_month6s":"Jun","_month7s":"Jul","_longTime":"h:MM:ss tt","_day6":"Friday","_day6s":"Fri","_month2":"February","_month12":"December","_month2s":"Feb","_month12s":"Dec","_fullDate":"dddd, mmmm dd, yyyy","_month4":"April","_month8":"August","_month4s":"Apr","_month8s":"Aug","_decimalSymbol":".","_digitGroupingSymbol":",","StateNotSpecified":"State","StateNonUS":"Non-US","StateAlabama":"Alabama","StateAlaska":"Alaska","StateArizona":"Arizona","StateArkansas":"Arkansas","StateCalifornia":"California","StateColorado":"Colorado","StateConnecticut":"Connecticut","StateDelaware":"Delaware","StateFlorida":"Florida","StateGeorgia":"Georgia","StateHawaii":"Hawaii","StateIdaho":"Idaho","StateIllinois":"Illinois","StateIndiana":"Indiana","StateIowa":"Iowa","StateKansas":"Kansas","StateKentucky":"Kentucky","StateLouisiana":"Louisiana","StateMaine":"Maine","StateMaryland":"Maryland","StateMassachusetts":"Massachusetts","StateMichigan":"Michigan","StateMinnesota":"Minnesota","StateMississippi":"Mississippi","StateMissouri":"Missouri","StateMontana":"Montana","StateNebraska":"Nebraska","StateNevada":"Nevada","StateNewHampshire":"New Hampshire","StateNewJersey":"New Jersey","StateNewMexico":"New Mexico","StateNewYork":"New York","StateNorthCarolina":"North Carolina","StateNorthDakota":"North Dakota","StateOhio":"Ohio","StateOklahoma":"Oklahoma","StateOregon":"Oregon","StatePennsylvania":"Pennsylvania","StateRhodeIsland":"Rhode Island","StateSouthCarolina":"South Carolina","StateSouthDakota":"South Dakota","StateTennessee":"Tennessee","StateTexas":"Texas","StateUtah":"Utah","StateVermont":"Vermont","StateVirginia":"Virginia","StateWashington":"Washington","StateWestVirginia":"West Virginia","StateWisconsin":"Wisconsin","StateWyoming":"Wyoming","CountryNotSpecified":"Country","CountryAfghanistan":"Afghanistan","CountryAlbania":"Albania","CountryAlgeria":"Algeria","CountryAndorra":"Andorra","CountryAngola":"Angola","CountryAntiguaandBarbuda":"Antigua and Barbuda","CountryArgentina":"Argentina","CountryArmenia":"Armenia","CountryAustralia":"Australia","CountryAustria":"Austria","CountryAzerbaijan":"Azerbaijan","CountryBahamas":"Bahamas","CountryBahrain":"Bahrain","CountryBangladesh":"Bangladesh","CountryBarbados":"Barbados","CountryBelarus":"Belarus","CountryBelgium":"Belgium","CountryBelize":"Belize","CountryBenin":"Benin","CountryBhutan":"Bhutan","CountryBolivia":"Bolivia","CountryBosniaHerzegovina":"Bosnia-Herzegovina","CountryBotswana":"Botswana","CountryBrazil":"Brazil","CountryBrunei":"Brunei","CountryBulgaria":"Bulgaria","CountryBurkina":"Burkina","CountryBurundi":"Burundi","CountryCambodia":"Cambodia","CountryCameroon":"Cameroon","CountryCanada":"Canada","CountryCapeVerde":"Cape Verde","CountryCentralAfricanRep":"Central African Republic","CountryChad":"Chad","CountryChile":"Chile","CountryChina":"China","CountryColombia":"Colombia","CountryComoros":"Comoros","CountryCongo":"Congo","CountryCostaRica":"Costa Rica","CountryCroatia":"Croatia","CountryCuba":"Cuba","CountryCyprus":"Cyprus","CountryCzechRepublic":"Czech Republic","CountryDenmark":"Denmark","CountryDjibouti":"Djibouti","CountryDominica":"Dominica","CountryDominicanRepublic":"Dominican Republic","CountryEastTimor":"East Timor","CountryEcuador":"Ecuador","CountryEgypt":"Egypt","CountryElSalvador":"El Salvador","CountryEquatorialGuinea":"Equatorial Guinea","CountryEritrea":"Eritrea","CountryEstonia":"Estonia","CountryEthiopia":"Ethiopia","CountryFiji":"Fiji","CountryFinland":"Finland","CountryFrance":"France","CountryGabon":"Gabon","CountryGambia":"Gambia","CountryGeorgia":"Georgia","CountryGermany":"Germany","CountryGhana":"Ghana","CountryGreece":"Greece","CountryGrenada":"Grenada","CountryGuatemala":"Guatemala","CountryGuinea":"Guinea","CountryGuyana":"Guyana","CountryHaiti":"Haiti","CountryHonduras":"Honduras","CountryHungary":"Hungary","CountryIceland":"Iceland","CountryIndia":"India","CountryIndonesia":"Indonesia","CountryIran":"Iran","CountryIraq":"Iraq","CountryIreland":"Ireland","CountryIsrael":"Israel","CountryItaly":"Italy","CountryIvoryCoast":"Ivory Coast","CountryJamaica":"Jamaica","CountryJapan":"Japan","CountryJordan":"Jordan","CountryKazakhstan":"Kazakhstan","CountryKenya":"Kenya","CountryKiribati":"Kiribati","CountryKoreaNorth":"North Korea","CountryKoreaSouth":"South Korea","CountryKosovo":"Kosovo","CountryKuwait":"Kuwait","CountryKyrgyzstan":"Kyrgyzstan","CountryLaos":"Laos","CountryLatvia":"Latvia","CountryLebanon":"Lebanon","CountryLesotho":"Lesotho","CountryLiberia":"Liberia","CountryLibya":"Libya","CountryLiechtenstein":"Liechtenstein","CountryLithuania":"Lithuania","CountryLuxembourg":"Luxembourg","CountryMacedonia":"Macedonia","CountryMadagascar":"Madagascar","CountryMalawi":"Malawi","CountryMalaysia":"Malaysia","CountryMaldives":"Maldives","CountryMali":"Mali","CountryMalta":"Malta","CountryMarshallIslands":"Marshall Islands","CountryMauritania":"Mauritania","CountryMauritius":"Mauritius","CountryMexico":"Mexico","CountryMicronesia":"Micronesia","CountryMoldova":"Moldova","CountryMonaco":"Monaco","CountryMongolia":"Mongolia","CountryMontenegro":"Montenegro","CountryMorocco":"Morocco","CountryMozambique":"Mozambique","CountryMyanmar":"Myanmar","CountryNamibia":"Namibia","CountryNauru":"Nauru","CountryNepal":"Nepal","CountryNetherlands":"Netherlands","CountryNewZealand":"New Zealand","CountryNicaragua":"Nicaragua","CountryNiger":"Niger","CountryNigeria":"Nigeria","CountryNorway":"Norway","CountryOman":"Oman","CountryPakistan":"Pakistan","CountryPalau":"Palau","CountryPanama":"Panama","CountryPapuaNewGuinea":"Papua New Guinea","CountryParaguay":"Paraguay","CountryPeru":"Peru","CountryPhilippines":"Philippines","CountryPoland":"Poland","CountryPortugal":"Portugal","CountryQatar":"Qatar","CountryRomania":"Romania","CountryRussianFederation":"Russian Federation","CountryRwanda":"Rwanda","CountryStLucia":"St Lucia","CountrySaintVincent":"Saint Vincent and the Grenadines","CountrySamoa":"Samoa","CountrySanMarino":"San Marino","CountrySaoTome":"Sao Tome","CountrySaudiArabia":"Saudi Arabia","CountrySenegal":"Senegal","CountrySerbia":"Serbia","CountrySeychelles":"Seychelles","CountrySierraLeone":"Sierra Leone","CountrySingapore":"Singapore","CountrySlovakia":"Slovakia","CountrySlovenia":"Slovenia","CountrySolomonIslands":"Solomon Islands","CountrySomalia":"Somalia","CountrySouthAfrica":"South Africa","CountrySouthSudan":"South Sudan","CountrySpain":"Spain","CountrySriLanka":"Sri Lanka","CountrySudan":"Sudan","CountrySuriname":"Suriname","CountrySwaziland":"Swaziland","CountrySweden":"Sweden","CountrySwitzerland":"Switzerland","CountrySyria":"Syria","CountryTaiwan":"Taiwan","CountryTajikistan":"Tajikistan","CountryTanzania":"Tanzania","CountryThailand":"Thailand","CountryTogo":"Togo","CountryTonga":"Tonga","CountryTunisia":"Tunisia","CountryTurkey":"Turkey","CountryTurkmenistan":"Turkmenistan","CountryTuvalu":"Tuvalu","CountryUganda":"Uganda","CountryUkraine":"Ukraine","CountryUnitedArabEmirates":"United Arab Emirates","CountryUnitedKingdom":"United Kingdom","CountryUnitedStates":"United States","CountryUruguay":"Uruguay","CountryUzbekistan":"Uzbekistan","CountryVanuatu":"Vanuatu","CountryVaticanCity":"Vatican City","CountryVenezuela":"Venezuela","CountryVietnam":"Vietnam","CountryYemen":"Yemen","CountryZambia":"Zambia","CountryZimbabwe":"Zimbabwe","CountryStKittsNevis":"St. Kitts & Nevis","CountryTrinidadTobago":"Trinidad & Tobago","GenderNotSpecified":"Gender","GenderMale":"Male","GenderFemale":"Female","_firstDayOfWeek":"1"}},"maxAge":1800,"serviceUrl":"http:\/\/app.mobile.conduit-services.com\/api\/translate\/mobile.client%2Cmobile.localeFormat\/en-US\/2"}],"timestamp":1401022636};
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
 * Application initliazation module
 *
 * @author Eran Zinman
 */
var AppInit = (function () {
	var me = {};

	var _defaultPageId = null;
	var _defaultTabIndex = 0;

	// app data from AMS
	var _appData = null;

	/**
	 * Application initialization point
	 *
	 * @author Eran Zinman
	 */
	me.init = function () {

       // Initialzie device info and device support
       DeviceInfo.init(); // = detect OS version
       DeviceSupport.init(); // = some "is_<something>_Supported" functions
       
       // TODO: NEED THIS?
       // This stops mobile devices (such as iPhone) to bounch the entire screen when the user
       // swipes his finger through the webview
//       if (DEVICE === deviceTypeEnum.iphone) {
//           document.ontouchmove = function (e) {
//               e.preventDefault();
//           };
//       }
       
       // load the sprites etc.
       if (typeof (ImagesLoader) === "object") {
       ImagesLoader.init();
       }
       
       // Initialize the on resume manager (relevant to native)
       if (typeof (ResumeManager) === "object") {
       ResumeManager.init();
       }
       
       // continue init stuff after device is ready (= phone-gap is ready)
       DeviceReady.ready(onDeviceReady);
	};

	/**
	 * Continue init stuff after device-ready (= phone-gap ready)
	 */
	var onDeviceReady = function () {
        Config.onChange(me.onConfigReady);
	};
               
               
    me.onConfigReady = function (cfg) {
        _.extend(window, cfg);
               
         // Check if the app id is set
        if (!APP_ID) {
            console.log('No APP_ID, quitting...');
            return;
        }

       // initialize api
       initApi();
       
       // Dump data into cache
       DataDumper.dumpInitialData();
       
       // We are ready - start application execution
       me.initLocalization();
       
       //TODO: remove the "AppConfiguration", it is just another layer to the storage, and only DataDump use it
       // Init app settings instance
       AppConfiguration.init();
       
       // Init the user manager
       UserManager.init(onUserManagerReady);
   };

	/**
	 * Continue init stuff after UserManager-ready (= we have UUID)
	 */
	var onUserManagerReady = function () {
		// Init the profile manager
		ProfileManager.init();

		// Init the hash-manager
		var hm = HashManager.init();

		// Init the URL-navigator
		UN.init(hm);

		// Get the service map before we do anything
		getServiceMap(onServiceMapReady);
	};

	/**
	 * Continue init stuff after we have the servicemap
	 */
	var onServiceMapReady = function () {
		// Start the usage which depends on the API and servicemap
        UsageManager.init();

		// Check if we specificed state in hash (e.g.: come back from twitter login) and launch app
		StateManager.loadSavedState(onSavedStateLoaded);
	};

	var onSavedStateLoaded = function (savedInfo) {
		me.launchApp(savedInfo);
	};

	/**
	 * This function is called when API is initialized
	 * and we have the servicemap (after data dump). This is
	 * where we choose if to launch the application or to display
	 * the experience dialog
	 *
	 * @author Moshe Darzi
	 */
	me.launchApp = function (savedInfo) {
			// Get application data
			if (savedInfo) {
				_defaultTabIndex = savedInfo.pageState ? savedInfo.pageState.tabIndex : 0;
				_defaultPageId = savedInfo.pageId;
			}
			else {
				_defaultTabIndex = 0;
				_defaultPageId = null;
			}
			AmsLoader.loadApp(onAmsReady, APP_ID);
	};

	/**
	 * Continue init stuff after we have the AMS
	 */
	var onAmsReady = function (appData) {
		_appData = appData;
		// Add the test templates to the app pages data
		// NOTE: This is only viable in "Debug" mode (as we wish to push test templates in debug)
		if ( /*true || */ DEBUG && window.TestAmsData) {
			TestAmsData.addTestData(_appData);
		}

		// run JS code from the server if available.
		if (_appData.jsCode) {
			CodeRunner.runCode(_appData.jsCode);
		}

		//remove all default params (if exist from previous ams, e.g.: in CP or ReVu)
		UrlGenerator.emptyAppParams();

		// Init the "InappPurchase" data:
		// TODO: do we want to show error message in case of fail?
		InappPurchaseManager.init(_appData);

        var localizationLoad = $.Deferred(),
            styleLoad = $.Deferred();

		// get the localization data for the culture of the app
		//	(=store it for the next time...)
		//TODO: Do we need to check if appData.meta.culture exists?
		// continue only after we got the localization data.
        LocalizationManager.updateLocalizationData(_appData.meta.culture, function() {
            localizationLoad.resolve();
        });
        LayoutTemplate.onChange(function(response) {
            styleLoad.resolve(response);
        });

        $.when(localizationLoad, styleLoad)
            .done(onAppReady);
            //.fail();
	};

	/**
	 * Continue init stuff after we the finish to update the localization
	 */
    var onAppReady = function (localizationLoadResult, templateLoadResult) {
		// Set app settings
		AppSettingsManager.createSettings(_appData.settings);

		// init stuff from app settings (overrideServices, fbAppId, AdsManager, ...)
		_initStuffFromAppSettings();

		// avoid duplication since the resume manager sends the user login as well.
		if (typeof (ResumeManager) === 'undefined' || !ResumeManager.onResumeFired()) {
			// Send user login usage
			conduitApi.analytics.addEvent(null, null, conduitApi.analytics.usageEventTypeEnum.UserLoggedIn, null, true);
		}

		// Update app model, create appView, add colors CSS, etc.:
        createApp(templateLoadResult);
	};

	/**
	 * Create the actual web app (Update app model, create appView, add colors CSS, etc.)
	 * @author Eran Zinman
	 */
    var createApp = function (appStyleTemplate) {
		// Update app object
		var app = AppManager.app();

		// Create app layout (including some "extend/override" of the json, and run the layoutEngine) :
		var appLayout = new Layout({
			layout: _appData.layout,
            meta: _appData.meta,
            template: appStyleTemplate
		});

		app.setAppData(_appData, _defaultPageId, _defaultTabIndex, appLayout);

		// Wait for "DOM Ready" before creating app view
		$(document).ready(function () {
			// Apply layout
			LayoutApplier.apply(app);

			//Init SmartBanner settings (captions, links...)
			if (window.SmartBanner) {
				SmartBanner.initOptionsWithAppData(app);
			}

			// NOTE: We need this also in native for HTML (="not native") pages:
			// Initialize Scrolling mechanism.
			window.Scrolling = ScrollingFactory.createScroller();

			var $body = $('body');
			$body.addClass('ui-mobile-viewport');

			if (LAYOUT === layoutFormat.wide) {
				$body.addClass('wideLayout');
			}
            else {
                $body.addClass('narrowLayout');
            }

			$body.addClass(Utils.Helpers.inverseDict(deviceTypeEnum)[DEVICE]);

			if (IS_RTL) {
				$body.removeClass('ltr').addClass('rtl').attr("dir", "rtl");
			}
			else {
				$body.removeClass('rtl').addClass('ltr').attr("dir", "ltr");
			}

			// Create the appview and bind it with the app model.
			// NOTE: appView calls to render in its constructor
			var appView = AppViewFactory.getAppView(app);

			// Init the navigation manager (we do it only now, because we want that the app will add all the pages. e.g.:
			//	include the "more pages" page)
			NavigationManager.init();

			// Update HTML document title (so it will appear in the browser title and add2home)
			document.title = app.get('appLabel');

			// open startup dialog (if exists):
			_openStartupDialog(AppSettingsManager.getSettings().get('startupDialog'));

			// app is launched. notify the controlPanelProxy.
			app.trigger('appLaunched');

			// Remove webapp preloader after a timeout, allowing the screen to render properly
			setTimeout(function () {
				Scrolling.triggerWrapperResize();

				var fullScreenAd = app.get('fullScreenAd');

				//TODO : Move this logic to a seperate file, loaded only for webapps and native android. IOS native has only native ads since 3.7.
				if (fullScreenAd && typeof FullScreenAdView !== 'undefined' /* not available on native ios */ ) {
					fullScreenAd.ready(function (isOK) {

						if (isOK) {
							var fullScreenAdView = new FullScreenAdView({
								model: fullScreenAd
							});
							appView.$el.prepend(fullScreenAdView.render().el);
						}
						// if we show the full screen ad, we leave the screen locked till the ad is dismissed by the full screen ad view.
						var unlock = !isOK;
						_hideSplash(unlock);
					});
				}
				else {
					_hideSplash(true);
				}

			}, 100);
		});
	};

	/**
	 * init stuff from app settings (overrideServices, fbAppId, AdsManager, ...)
	 */
	var _initStuffFromAppSettings = function () {
		var appSettings = AppSettingsManager.getSettings();

		var overrideTranslation = appSettings.get('overrideTranslation');
		if (overrideTranslation)
			LocalizationManager.addOverrideTranslation(overrideTranslation);

		// set the google analytics account id code if exists.
		var ga = appSettings.get('ga');
		if (ga && window.googleAnalytics && googleAnalytics.setCode)
			googleAnalytics.setCode(ga.trckId); // set google analytics script

		// init the facebook lib:
		var fbAppAuthInfo = {
			appId: Utils.Helpers.getPath(_appData, 'social.facebook.appId') || appSettings.get('fbAppId'),
			appAccessToken: Utils.Helpers.getPath(_appData, 'social.facebook.appAccessToken') || appSettings.get('fbAccessToken')
		};

		FacebookLib.init(fbAppAuthInfo);

		// Handle globalAppId stuff
		var globalAppId = _appData.globalAppId;
		if (globalAppId) {
			// set to ProfileManager:
			ProfileManager.setGlobalAppId(globalAppId);
			// add to default params:
			UrlGenerator.extendAppParams({
				globalAppId: globalAppId
			});
		}

		// add default params to UrlGenerator
		extendAppParams(appSettings.get('params'));

		// Check if we need to override any services
		var overrideServices = appSettings.get('overrideServices');
		if (overrideServices)
			ServiceOverrideManager.overrideServices(overrideServices);

		// Set ads model (if ads are enabled).
		// TODO : make AdsManager listen to onAppSettingsReady (pull) instead of pushing settings via 'init'
		if (appSettings.get('ads').enabled && typeof (AdsManager) !== 'undefined' /* not available on native ios since v3.7*/ )
			AdsManager.init({
				settings: appSettings.get('ads')
			});

		// Flag that add2home is disabled if app disabled add2home
		if (appSettings.get('showAdd2Home') === false)
			window.add2HomeIsDisabled = true;
	};

	/**
	 * open startup dialog (if exists)
	 */
	var _openStartupDialog = function (startupDialog) {
		// check if there is startupDialog to show:
		if (!startupDialog) {
			return false;
		}
		var startDateKey = 'startupDialog_start_' + startupDialog.id;
		var endDateKey = 'startupDialog_end_' + startupDialog.id;

		var now = new Date().getTime();
		var endDate = conduitApi.platform.storage.getItem(null, null, endDateKey);
		if (endDate && (endDate < now)) {
			// we are after the "endDate" -> don't show the dialog
			return false;
		}
		var startDate = conduitApi.platform.storage.getItem(null, null, startDateKey);
		if (startDate && (startDate > now)) {
			// we are before the "startDate" -> don't show the dialog
			return false;
		}

		// If we have "startDueDate" -> update the storage in the new startDate & exit;
		if (!startDate && (typeof (startupDialog.startDueDate) === "number") && startupDialog.startDueDate) {
			startDate = now + (startupDialog.startDueDate * 1000);
			conduitApi.platform.storage.setItem(null, null, startDateKey, startDate);
			return false;
		}

		// If we have "interval" -> update the storage in the new startDate (without exit);
		if (typeof (startupDialog.interval) === "number") {
			startDate = now + (startupDialog.interval * 1000);
			conduitApi.platform.storage.setItem(null, null, startDateKey, startDate);
		}
		else // startupDialog.interval === null
		{
			// don't show the dialog again:
			conduitApi.platform.storage.setItem(null, null, endDateKey, now);
		}

		// params for the dialog:
		var title = Utils.String.translateIfNeed(startupDialog.title);
		var message = Utils.String.translateIfNeed(startupDialog.message);
		var buttons = $.map(startupDialog.buttons, function (button) {
			button.text = Utils.String.translateIfNeed(button.title);
			button.cb = function () {
				// if link - open it:
				if (button.url) {
					// Open the link using Conduit API
					if (conduitApi.app.isSupported()) {
						conduitApi.app.openLink(null, null, {
							'url': button.url,
							'title': button.url,
							'useExternalBrowser': true
						});
					}
				}

				// if this button prevent the startup dialog in the future:
				if (button.stop) {
					conduitApi.platform.storage.setItem(null, null, endDateKey, now);
				}
			};
			return button;
		});

		//open the dialog:
		conduitApi.UI.showDialogBox(null, null, {
			title: title,
			message: message,
			buttons: buttons
		});
	};

	/**
	 * Hide the splash screen and remove loading indicator
	 * @param unlock - should the screen be unlocked after dismissing the splash screen
	 * @author Matanya
	 */
	var _hideSplash = function (unlock) {
		// NOTE: the WebAppPreloader script is loaded from the index.html, and init itself
		if (window.WebAppPreloader) {
			WebAppPreloader.onAppReady();
		}

		if (window.SmartBanner) {
			SmartBanner.show();
		}

		if (navigator.appManager && navigator.appManager.hideSplashScreen) {
			navigator.appManager.hideSplashScreen();
		}

		if (unlock && navigator.appManager && navigator.appManager.unlockScreen) {
			navigator.appManager.unlockScreen();
		}

	};

	/**
	 * Parse the parameters array and set it in the UrlGenerator.
	 * @param  {Array} paramsArr the parameters array from the AMS
	 */
	var extendAppParams = function (paramsArr) {
		// check if we have the params array.
		if (!paramsArr) {
			return;
		}

		var params = {};
		for (var i = paramsArr.length - 1; i >= 0; i--) {
			params[paramsArr[i].key] = paramsArr[i].val;
		}

		UrlGenerator.extendAppParams(params);
	};

	/**
	 * Get service map from the web
	 *
	 * @param cbSuccess - callback for success
	 * @author Eran Zinman
	 */

	function getServiceMap(cbSuccess) {
		navigator.serviceMap.registerServiceMapReady(function (result) {
			// Update the serviseMap model with the response:
			ServiceMap.parseServiceMap(result);
			Utils.Helpers.funcWrapper(cbSuccess)();
		}, {
			SERVICEMAP_URL: SERVICEMAP_URL,
			FORCE_NO_CACHE: FORCE_NO_CACHE,
			APP_ID: APP_ID,
			APP_VERSION: APP_VERSION
		});
	}

	/**
	 * Returns the communicaiton type cooriding o the DEVICE and PLATFORM.
	 */

	function getComType() {
		//TODO: Remove all the "communication" stuff (iFrame, native, etc.) we don't need it any more...
		var retVal;
		retVal = comTypeEnum.postMessage;
		return retVal;
	}

	/**
	 * Create the add slave method according to the communication type.
	 * @param {Object} comType - the communication type.
	 */

	function getAddSlaveByType(comType) {
		var retCb;
		switch (comType) {
		case comTypeEnum.iframeMessage:
			retCb = function (domElement, pageId, pageReady) {
				domElement.setPageId = function (cbSetPageId) {
					cbSetPageId(pageId);
				};

				comMaster.addSlave(
					pageId,
					pageId,
					domElement.contentWindow,
					pageReady);
			};
			break;

		case comTypeEnum.postMessage:
			retCb = function (domElement, pageId, pageReady) {
				comMaster.addSlave(
					pageId,
					domElement.contentWindow,
					domElement.contentWindow,
					pageReady);
			};
			break;

		case comTypeEnum.nativeMessage:
			retCb = function (domElement, pageId, pageReady) {
				comMaster.addSlave(
					pageId,
					pageId,
					pageId,
					pageReady);
			};
			break;
		}

		return retCb;
	}

	/**
	 * Initialize API. After this function
	 *
	 * @author Yaron Jackoby
	 */

	function initApi() {
		// Initialize API
		ConduitApiImpl.initApiImpl();

		// Set API implementation
		conduitApi.__BCAPI = ConduitApiImpl;

		// get the communication type by the device and platform.
		var comType = getComType();

		AppManager.addSlave = getAddSlaveByType(comType);

		// initialize the communication.
		comMaster.init(comType);
	}

	/**
	 * Initialize the app.
	 * and the "localization" stuff
	 *
	 * @author Matanya
	 */
	me.initLocalization = function () {
		// Initialize the localization & localizationManager:
		// Update the global var: "localizationData" according to the culture:
		LocalizationManager.initLocalizationData();
	};

	return me;
}());

// Initialize app
AppInit.init();

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
            document.body.style["min-height"] = '';
            document.body.style["height"] = '';
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

        /**
     * OVERRIDE - render level 1 - tab:
     */
    _renderTab : function(index, navRequest)
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
		'data-role': 'page'
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
ChatListView = Backbone.View.extend({
    className: 'chat_list'

    ,
    initialize: function () {
        var itemsCollection = this.model.get('items');

        if (itemsCollection) {
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

    ,
    render: function () {
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
    ,
    _reset: function () {
        this.$itemsList.html('');
    }

    /**
     * Render one item.
     *
     * @param item the item's model.
     *
     * @author Matanya
     */
    ,
    _renderOneItem: function (item, collection, options) {
        var itemView = this.createItemView(item);

        // if the message is a new message (from me or from another user) - add it at the bottom.
        // else (on refresh or show more) - add it at the top
        if (options && options.isNew) {
            this.$itemsList.append(itemView.render().el);
        }
        else {
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
    ,
    createItemView: function (itemModel) {
        if (itemModel.get('isMe')) {
            var view = new MyChatMessageView({
                model: itemModel
            });
        }
        else {
            var view = new UserChatMessageView({
                model: itemModel
            });
        }

        return view;
    }

    /**
     * Render all the items in the list one by one.
     *
     * @author Matanya
     */
    ,
    _renderItems: function () {
        var itemsCollection = this.model.get('items');
        if (itemsCollection) {
            itemsCollection.each(this._renderOneItem.hitch(this));
        }
    }


    ,
    handleRefreshClick: function () {
        if (this.model.get('discussionId')) {
            this.refreshing = true;
            cqm.showLoading(_T('HtmlTextPaginationRefreshItems'), this.$el, true);
            this.model.getItems(executeTypeEnum.FORCE_NETWORK);
        }
    }

    ,
    handleSilentRefresh: function () {
        if (this.model.get('discussionId')) {
            if (this.model.isExpiredCache()) {
                this.model.getItems(executeTypeEnum.FORCE_NETWORK);
            }
        }
    }

    /**
     * Handle the items get success.
     *
     * @author Yoel Gluschnaider
     */
    ,
    _onGetItemsSuccess: function (metaData, parseResult, requestId) {
        if (this.refreshing) {
            this.refreshing = false;
            cqm.hideLoading(this.$el);
        }
        this._renderShowMoreButton();

        this._refreshScroll();
        //
        //      var itemsCollection = this.model.get('items');
        //
        //      if (itemsCollection && _.isEmpty(itemsCollection.models)) {
        //          this.onNoResults();
        //      }
    }

    /**
     * refresh the scroll after content changed
     */
    ,
    _refreshScroll: function () {
        this.$myScrollWrapper = this.$myScrollWrapper || Scrolling.getMyScrollerWrapper(this.$el);
        Scrolling.onContentChanged(this.$myScrollWrapper);
    }

    /**
     * Render the show more button.
     * @author Yoel Gluschnaider
     */
    ,
    _renderShowMoreButton: function () {}


    /**
     * Handle the failure dialog retry button click.
     * Retry to get the next posts.
     */
    ,
    _cbRetry: function () {
        this.model.getItems(executeTypeEnum.HIT_AND_RUN);
    }

    /**
     * Handle the failure dialog cancel button click.
     * Set the EOF to true (avoid showing the "show more" button).
     */
    ,
    _cbCancel: function () {
        this.model.set({
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
    ,
    onGetDataFail: function (executeType, serviceNotExecuted) {

        cqm.hideLoading(this.$el);
        // don't show errors in simulator.
        if (PLATFORM != platformEnum.simulator) {
            // if is the first call to get data, show a dialog box.
            if (executeType === executeTypeEnum.HIT_AND_RUN) {
                var dlgOptions = {
                    title: _T('DialogCaptionError'),
                    message: this.options.failStr,
                    buttons: [{
                        text: _T('ButtonRetry'),
                        cb: this._cbRetry.hitch(this)
                    }, {
                        text: _T('ButtonCancel'),
                        cb: this._cbCancel.hitch(this)
                    }]
                };
                conduitApi.UI.showDialogBox(null, null, dlgOptions);

            }
            // not the first call (in pagination) show toast.
            else {
                conduitApi.UI.showToastMessage(null, null, this.options.failStr, this.$el);
                // Cancel the loading
                this._cbCancel();
            }
        }
        // Show toast only if fail after executing the service.
        else
        if (!serviceNotExecuted) {
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
    ,
    _onShowMoreTap: function (e) {
        e.preventDefault();
        this.model.getItems(executeTypeEnum.HIT_AND_RUN_SILENT);
    }

    ,
    onSendMessage: function (msg) {
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
        /**
     * OVERRIDE - render level 1 - tab:
     */
    _renderTab : function(index, navRequest)
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
