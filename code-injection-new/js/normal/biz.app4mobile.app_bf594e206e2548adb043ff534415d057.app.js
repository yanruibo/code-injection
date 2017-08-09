

	
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
  	

var platformEnum={simulator:0,nativeApp:1,webApp:2,gadget:3,playground:4};var deviceTypeEnum={unknown:0,iphone:1<<0,android:1<<1,rim:1<<2,winPhone:1<<3,symbian:1<<4,bada:1<<5};var pageTypes={"0":{folder:"apiTest",cssClass:"apiTest",templateViewName:"APITestTemplateView"},"5a8368df-6ebd-c0f2-2d82-e173c1f33d40":{folder:"aboutUs",cssClass:"aboutUs",templateViewName:"AboutUsTemplateView",itemsName:"items"},"f61f12d6-df0c-465c-b3ba-70fb8f3894a4":{folder:"agenda",cssClass:"agenda",templateViewName:"AgendaTemplateView",itemsName:"items"},"30be1358-8b36-4d22-b6d2-50c38f4246c4":{folder:"audio",cssClass:"audio",templateViewName:"AudioTemplateView",wideTemplateViewName:"AudioWideTemplateView",itemsName:"items",support:{nope:["bada"]}},"51a61af7-1e90-4d68-88db-b1e69a0cca59":{folder:"blog",cssClass:"blog",templateViewName:"BlogTemplateView",wideTemplateViewName:"BlogWideTemplateView",itemsName:"feeds"},"308af5fa-e91b-d7e7-1926-acfea8f266dc":{folder:"notForCp",templateViewName:"NotForCpTemplateView",cssClass:"notForCp"},"083e52df-721d-4ca4-efa3-25161d344f40":{folder:"contactUs",cssClass:"contactUs",itemsName:"items",templateViewName:"ContactUsTemplateView"},"accf5c01-ba57-2017-0b3a-188cdccc8426":{folder:"items",cssClass:"items",templateViewName:"ItemsTemplateView",itemsName:"items"},"e9773a60-828f-6a16-a1fb-770163905537":{folder:"poll",cssClass:"poll",itemsName:"items",templateViewName:"PollTemplateView"},"0311d37d-6d9f-fc9d-35fd-45b471d2382f":{folder:"quiz",cssClass:"quiz",itemsName:"items",templateViewName:"QuizTemplateView"},"1002937d-8b19-40de-9df5-ba0d1ea2fbb2":{folder:"events",cssClass:"events",templateViewName:"EventsTemplateView",wideTemplateViewName:"EventsWideTemplateView",itemsName:"items"},"0053bbba-1ca1-11e0-89a4-af28e0d72085":{folder:"external",cssClass:"external",templateViewName:"ExternalPageTemplateView"},"df7d11f3-233c-4d49-8f2a-d1886e07c641":{folder:"facebook",cssClass:"facebook",templateViewName:"FacebookTemplateView",wideTemplateViewName:"FacebookWideTemplateView",itemsName:"channels"},"fa7071be-8262-3b0d-b439-d2edd1ac35ec":{folder:"favorites",cssClass:"favorites",templateViewName:"FavoritesTemplateView"},"79eec590-f806-f7ac-946b-1fd9c90283ba":{folder:"form",cssClass:"form",templateViewName:"FormTemplateView",itemsName:"items"},"e0adcb11-f7bb-8107-1cd0-77690221f31c":{folder:"instagram",cssClass:"instagram",templateViewName:"InstagramTemplateView",itemsName:"items"},"fc6700a7-a11e-de90-93f8-7357f9f0037f":{folder:"links",templateViewName:"LinksTemplateView",cssClass:"links",itemsName:"items"},"c54d24ef-faf5-45dd-8859-85e3ebe7cecf":{folder:"webModule",templateViewName:"WebModuleTemplateView",cssClass:"webModule",itemsName:"items"},"9eea8149-956c-46f9-8597-167401c63cd7":{folder:"webModule",templateViewName:"WebModuleTemplateView",cssClass:"webModule",itemsName:"items"},"26ae8ccc-5464-7979-4fdf-3a13f166ffff":{folder:"photos",cssClass:"photos",templateViewName:"PhotosTemplateView",itemsName:"feeds"},"a00b52bb-ff49-704f-bdf3-fb0bd0fd4739":{folder:"livePerson",templateViewName:"LivePersonTemplateView",cssClass:"livePerson",itemsName:"tabs"},"ec79d314-f6aa-f396-a651-3f9b3344dd99":{folder:"notForCp",templateViewName:"NotForCpTemplateView",cssClass:"notForCp"},"aca2f190-b22b-920d-f12a-998101ad4b70":{folder:"map",cssClass:"map",templateViewName:"MapTemplateView"},"3b11bcdf-ba5e-4eaa-9059-ea580b3f1681":{folder:"photos",cssClass:"photos",templateViewName:"PhotosTemplateView",itemsName:"feeds"},"7a2641b0-ceb2-48d6-b715-344198c73dd3":{folder:"reviews",cssClass:"reviews",templateViewName:"ReviewsTemplateView",wideTemplateViewName:"ReviewsWideTemplateView"},"0255eb38-1fb5-4b65-abee-b6fdb69c8f07":{folder:"coupons",cssClass:"coupons",templateViewName:"CouponsTemplateView"},"8901e95e-4dc9-411f-835a-0f18a7872122":{folder:"menu",cssClass:"menu",templateViewName:"MenuTemplateView",itemsName:"items"},"ff4532d2-9137-8da2-f97f-be8b3ddd08e4":{folder:"agenda",cssClass:"agenda",templateViewName:"AgendaTemplateView",itemsName:"items"},"27f91d0a-42c0-48fa-90a8-7138641ddecf":{folder:"staticHtml",cssClass:"staticHtml",templateViewName:"StaticHtmlTemplateView"},"c6bb3e68-0ea7-43dc-a358-b40d9b75d224":{folder:"subscribe",cssClass:"subscribe",templateViewName:"SubscribeTemplateView",support:{nope:["winPhone&nativeApp"]}},"a77583ef-758f-45f3-9ad1-9704d82a2154":{folder:"twitter",cssClass:"twitter",templateViewName:"TwitterTemplateView",wideTemplateViewName:"TwitterWideTemplateView",itemsName:"feeds"},"4680c3f3-e767-4ebf-b112-9ba769c3ff2a":{folder:"video",cssClass:"video",templateViewName:"VideoTemplateView",wideTemplateViewName:"VideoWideTemplateView",itemsName:"items"},"a7bf6078-3f92-4b90-acf2-b122903bc846":{folder:"video",cssClass:"video",templateViewName:"VideoTemplateView",wideTemplateViewName:"VideoWideTemplateView",itemsName:"channels"},"6181507a-fdf4-4b90-a270-cbd286603443":{folder:"collections",cssClass:"collections",templateViewName:"CollectionsTemplateView",itemsName:"items"},"38ab2b78-a1ad-42f8-8cb7-9475498c0f30":{folder:"reports",cssClass:"reports",templateViewName:"ReportsTemplateView"},sharePageType:{cssClass:"share_template_page",templateViewName:"ShareTemplateView",wideTemplateViewName:"ShareTemplateView"}};var appMode={normal:0,experience:1,developers:2};var headerTypes={textHeader:0,imageHeader:1,imageAndTextHeader:2};var navigationLayoutTypes={none:-1,bottomBar:0,topBar:1,list:2,grid:3};var adDisplayTypes={text:1,image:2};var layoutFormat={unknown:-1,narrow:0,wide:1};var comTypeEnum={postMessage:0,iframeMessage:1,nativeMessage:2};var protocolTypeEnum={rpc:0,event:1};var socialServices={Facebook:"FACEBOOK",Email:"EMAIL",Twitter:"TWITTER"};var executeTypeEnum={FORCE_NETWORK:0,HIT_AND_RUN:1,HIT_AND_RUN_SILENT:2,HIT_ON_NETWORK_FAIL:3};var responseTypeEnum={NETWORK:0,VALID_CACHE:1,EXPIRED_CACHE:2};var socialServiceReturnType={FACEBOOK:1,TWITTER:2};var ExternalContentTypes={BLOG_POST:1,STATIC_HTML:2};var VideoTypes={GENERAL:"generalVideoType",YOUTUBE:"youtubeVideoType"};var MediaLibraryMergeTypes={Overwrite:0,Override:1,Merge:2};var MediaLibraryIncludeItems={None:0,Playlists:1,Unknown:2,All:3};var PhotoUploadUserTypes={NONE:0,FACEBOOK:1};
var RETURN_STATE_INFO="return_state_info";var RETURN_FUNCTION_FACEBOOK_SHARE="handleFacebookShare";var TWITTER_TOKENS="twitter_credentials";var SOCIAL_USER_CANCELED="user_canceled";var APP_VERSION="3.2.0.7";var DEV_SERVICEMAP_URL="http://servicemap.mobile.site-services.com/mobile";var QA_SERVICEMAP_URL="http://servicemap.mobile.qasite-services.com/mobile";var PROD_SERVICEMAP_URL="http://servicemap.mobile.conduit-services.com/mobile";var USE_AGENDA_FAVORITES=false;var USE_DATADUMP_SERVICE=false;var DEBUG=1;var PREVENT_DEVICE_DETECT=DEBUG&&true;var NAVIGATION_PAGE_GUID="00000000-0000-0000-0000-000000000002";var APP_MODE=appMode.normal;var PLATFORM=platformEnum.nativeApp;var DEVICE=deviceTypeEnum.iphone;var LAYOUT=layoutFormat.narrow;var FORCE_NO_CACHE=false&&DEBUG;var SERVICEMAP_URL=PROD_SERVICEMAP_URL;var APP_ID=null;var IS_RTL=false;var APP_ID="f6115138-77cb-4609-8758-38eaad1a3e6c";
var DeviceDetector={_isDesktop:false,isDesktop:function(){return this._isDesktop},device:function(){return DEVICE},device:function(){return LAYOUT},_userAgentMap:{"(ipad)":{device:deviceTypeEnum.iphone,layout:layoutFormat.wide},"(ipod|iphone)":{device:deviceTypeEnum.iphone,layout:layoutFormat.narrow},"(gt-p1000|mz604|mz606|xoom)":{device:deviceTypeEnum.android,layout:layoutFormat.wide},"(android.+mobile)":{device:deviceTypeEnum.android,layout:layoutFormat.narrow},"(android)":{device:deviceTypeEnum.android},"(windows phone os|iemobile|zunewp7)":{device:deviceTypeEnum.winPhone,layout:layoutFormat.narrow},"(SCH-I800|NOOK|silk|kindle|GT-P7510)":{layout:layoutFormat.wide}},_allKeys:function(b){var a=[];for(var c in b){a.push(c)}return a},detect:function(){var e=(navigator.userAgent||navigator.vendor||window.opera).toLowerCase();var d=this._allKeys(this._userAgentMap);var g=new RegExp(d.join("|"),"i");var a={device:deviceTypeEnum.unknown,layout:layoutFormat.unknown};if(g.test(e)){for(var c=0;c<d.length;c++){var f=d[c];var b=new RegExp(f,"i");if(b.test(e)){data=this._userAgentMap[f];if(typeof(data.device)!=="undefined"){a.device=data.device}if(typeof(data.layout)!=="undefined"){a.layout=data.layout}break}}}if(a.layout===layoutFormat.unknown){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4))){a.layout=layoutFormat.narrow}else{a.layout=layoutFormat.wide;this._isDesktop=true}}return a},init:function(){var a=this.detect();if(PREVENT_DEVICE_DETECT){return}DEVICE=a.device||DEVICE;LAYOUT=a.layout||LAYOUT}};DeviceDetector.init();
var DEBUG = 0;
var AMS_VERSION = "1.2.8.267";
var PLATFORM = 1;
var DEVICE_TOKEN = 2;
var APP_ID = "bf594e20-6e25-48ad-b043-ff534415d057";
var APP_MODE = 0;
var SIMULATOR = 0;
var SERVICEMAP_URL = PROD_SERVICEMAP_URL;

var __dataDump ={"images":[],"services":[{"data":{"services":[{"name":"AMS_APP_GET","url":"http:\/\/ams.mobile.conduit-services.com\/{appId}\/{deviceType}?appVersion={appVersion}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_FEEDS_GET","url":"http:\/\/cms.mobile.conduit-services.com\/feed\/{take}\/{skip}\/?url={feedUrl}&params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_TWITTER_USER_GET","url":"http:\/\/cms.mobile.conduit-services.com\/twitter\/user\/{userName}\/{take}\/{skip}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_TWITTER_QUERY_GET","url":"http:\/\/cms.mobile.conduit-services.com\/twitter\/query\/{query}\/{type}\/{take}\/{skip}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_YOUTUBE_GET","url":"http:\/\/cms.mobile.conduit-services.com\/youtube\/{query}\/{type}\/{skip}\/{take}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_PHOTOS_GET","url":"http:\/\/cms.mobile.conduit-services.com\/photos\/{type}\/{userName}\/{take}\/{skip}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_PHOTOS_ALBUMS_GET","url":"http:\/\/cms.mobile.conduit-services.com\/photos\/albums\/{type}\/{username}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_FACEBOOK_USER_GET","url":"http:\/\/cms.mobile.conduit-services.com\/facebook\/user\/{pageName}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_FACEBOOK_DATA_GET","url":"http:\/\/cms.mobile.conduit-services.com\/facebook\/data\/{pageName}\/{take}\/{skip}\/?params={}","reload_interval_sec":7200,"method":"GET"},{"name":"UMS_USER_POST","url":"http:\/\/ums.mobile.conduit-services.com\/login\/user","method":"POST"},{"name":"PROXY_WEBSLICE","url":"http:\/\/proxy.mobile.conduit-services.com\/webslice?url={url}","reload_interval_sec":12092600,"method":"GET"},{"name":"AMS_APPID_GET","url":"http:\/\/ams.mobile.conduit-services.com\/code\/{code}\/{email}\/pwd","reload_interval_sec":7200,"method":"GET"},{"name":"UMS_USAGE_PUT","url":"http:\/\/ums.mobile.conduit-services.com\/usage\/log","reload_interval_sec":7200,"method":"POST"},{"name":"ADS_POST","url":"http:\/\/ads.mobile.conduit-services.com\/{appId}\/{deviceType}","reload_interval_sec":600,"method":"POST"},{"name":"CMS_RAYV_GET","url":"http:\/\/cms.mobile.conduit-services.com\/rayv\/feeds\/{distributer}\/{listType}\/{take}\/{skip}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"MOBILE_SOCIAL_LOGIN","url":"http:\/\/social.mobile.conduit-services.com\/connect\/facebook?appId={appId}&type={deviceType}&ret={returnUrl}","method":"GET"},{"name":"CMS_MEDIA_VIDEO_GET","url":"http:\/\/cms.mobile.conduit-services.com\/media\/video\/{deviceType}\/{take}\/{skip}\/?url={url}&params={params}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_MEDIA_AUDIO_GET","url":"http:\/\/cms.mobile.conduit-services.com\/media\/audio\/{deviceType}\/{take}\/{skip}\/?url={url}&params={params}","reload_interval_sec":7200,"method":"GET"},{"name":"AMS_TRANSLATION_GET","url":"http:\/\/ams.mobile.conduit-services.com\/translate\/{product}\/{culture}\/{deviceType}","reload_interval_sec":1200,"method":"GET"},{"name":"LIVE_ALBUM_PHOTO_POST","url":"http:\/\/livealbum.mobile.conduit-services.com\/Album\/{appId}\/{parentSocialId}\/{socialId}\/{albumId}\/{tagWithUserId}\/","reload_interval_sec":7200,"method":"POST"},{"name":"TWITTER_API_PROXY_POST","url":"http:\/\/apiproxy.conduit-services.com\/twitter\/{tId}?sshkey={sshKey}&hts={hts}&url=http%3a%2f%2fapi.twitter.com%2f1%2fstatuses%2fupdate.json","reload_interval_sec":7200,"method":"POST"},{"name":"SOCIAL_LOGOUT","url":"http:\/\/social.conduit-services.com\/ConduitLogout.aspx","reload_interval_sec":7200,"method":"GET"},{"name":"SIGSERV_HTTP_GET","url":"http:\/\/sub.conduit-push.com","reload_interval_sec":7200,"method":"GET"},{"name":"SIGSERV_HTTP_PUT","url":"http:\/\/pub.conduit-push.com","reload_interval_sec":7200,"method":"PUT"},{"name":"SIGSERV_WEBSOCKET_GET","url":"ws:\/\/ws.conduit-push.com","reload_interval_sec":7200,"method":"GET"},{"name":"MOBILE_TWITTER_LOGIN","url":"http:\/\/social.mobile.conduit-services.com\/twitter\/SignIn?appId={appId}&type={deviceType}&ret={returnUrl}","reload_interval_sec":7200,"method":"GET"},{"name":"LIVE_ALBUM_EULA_GET","url":"http:\/\/conduit.ourtoolbar.com\/eula\/","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_CALENDAR_GET","url":"http:\/\/cms.mobile.conduit-services.com\/calendar\/{type}\/?id={id}&max-results={take}&start-index={skip}&since={since}&until={until}&params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"WIBIYA_SUBSCRIBE_GET","url":"https:\/\/api.wibiya.com\/Handlers\/apps\/subscribe_mobile.php?t={token}&e={email}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_MEDIA_ART_GET","url":"http:\/\/cms.mobile.conduit-services.com\/media\/art\/?url={url}&params={params}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_REVIEW_GET","url":"http:\/\/cms.mobile.conduit-services.com\/reviews\/{type}\/?q={query}&max-results={take}&start-index={skip}&params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"NFL_STATS_GET","url":"http:\/\/pages.mobile.conduit.com\/nfl\/player\/{key}\/{id}?info={level}","reload_interval_sec":7200,"method":"GET"},{"name":"IMAGES_REVIEWS_PROVIDER_GET","url":"http:\/\/images.mobile.conduit-services.com\/icon\/100{type}","reload_interval_sec":7200,"method":"GET"},{"name":"INAPP_USER_TOKENS_GET","url":"http:\/\/inapp.mobile.conduit-services.com\/client\/tokens\/{bucketId}?userId={userId}","method":"GET"},{"name":"INAPP_USER_TRANSACTION_POST","url":"http:\/\/inapp.mobile.conduit-services.com\/client\/transaction","method":"POST"},{"name":"CONTACT_CONTENT_PUT","url":"http:\/\/contact.mobile.conduit-services.com\/contact\/client\/{appId}\/{formId}\/?action={action}&postUrl={postUrl}","reload_interval_sec":1200,"method":"POST"},{"name":"CMS_USERS_GET","url":"http:\/\/cms.mobile.site-services.com\/users\/{userId}\/{provider}\/{relationType}\/{take}\/{skip}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"LIVE_ALBUM_PHOTO_V2_POST","url":"http:\/\/livealbum.mobile.conduit-services.com\/Files\/upload\/?groupId={groupId}&appId={appId}&albumId={albumId}","reload_interval_sec":7200,"method":"POST"},{"name":"CMS_COUPONS_GET","url":"http:\/\/cms.mobile.conduit-services.com\/coupons\/{listId}\/?take={take}&skip={skip}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_CONFERENCE_GET","url":"http:\/\/cms.mobile.conduit-services.com\/agenda\/{type}\/{id}\/{version}\/?ranges={ranges}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_PEOPLE_GET","url":"http:\/\/cms.mobile.conduit-services.com\/agenda\/{type}\/{id}\/{version}\/","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_POLLS_GET","url":"http:\/\/cms.mobile.conduit-services.com\/polls\/{type}\/{pollId}\/","reload_interval_sec":7200,"method":"GET"},{"name":"CONTACT_POLLS_POST","url":"http:\/\/polls.mobile.conduit-services.com\/polls\/result\/","reload_interval_sec":1200,"method":"POST"},{"name":"CMS_CONTENT_ITEMS","url":"http:\/\/cms.mobile.conduit-services.com\/contentItems\/items\/contenthost\/{take}\/{skip}\/?id={id}&params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_CONTENT_COLLECTION","url":"http:\/\/cms.mobile.conduit-services.com\/contentItems\/collection\/contenthost\/{take}\/?id={id}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_CONTENT_ITEMS_SEARCH","url":"http:\/\/cms.mobile.conduit-services.com\/contentItems\/items\/search\/{type}\/{collectionId}\/{take}\/{skip}\/?searchParams={searchParams}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_MENU_GET","url":"http:\/\/cms.mobile.conduit-services.com\/restaurants\/menu\/{provider}\/?query={restid}","reload_interval_sec":7200,"method":"GET"},{"name":"COMMUNITY_SOCIAL_LOGIN_POST","url":"http:\/\/community.mobile.conduit-services.com\/users\/social\/login\/{globalAppId}","reload_interval_sec":7200,"method":"POST"},{"name":"COMMUNITY_SOCIAL_LOGOUT_POST","url":"http:\/\/community.mobile.conduit-services.com\/users\/social\/logout\/{globalAppId}\/{userId}?socialId={socialId}","reload_interval_sec":7200,"method":"POST"},{"name":"CMS_USERS_SEARCH_GET","url":"http:\/\/cms.mobile.conduit-services.com\/users\/{provider}\/{skip}\/{take}\/?globalAppId={globalAppId}&q={search_term}&params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"DISCUSSION_DISCUSSIONS_GET","url":"http:\/\/discussion.mobile.conduit-services.com\/discussions\/{globalAppId}\/{userId}","reload_interval_sec":7200,"method":"GET"},{"name":"DISCUSSION_MESSAGES_GET","url":"http:\/\/discussion.mobile.conduit-services.com\/messages\/{discussionId}\/{skip}\/{take}","reload_interval_sec":7200,"method":"GET"},{"name":"DISCUSSION_MESSAGES_SEND_POST","url":"http:\/\/discussion.mobile.conduit-services.com\/messages\/{globalAppId}\/{fromId}","reload_interval_sec":7200,"method":"POST"}],"reload_interval_sec":86400},"maxAge":86399,"serviceUrl":"http:\/\/servicemap.mobile.conduit-services.com\/mobile"},{"data":{"details":{"appHomeUrl":"http:\/\/bf594e20-6e25-48ad-b043-ff534415d057.4yourmobile.com"},"globalAppId":"ae35a437-0e44-4297-95d2-1be56c7a36be","icon":"http:\/\/storage.conduit.com\/Mobile\/ae\/44\/ae35a437-0e44-4297-95d2-1be56c7a36be\/Images\/a60e9413-f597-4a09-9ec0-0127aecbbd96.png","id":"bf594e20-6e25-48ad-b043-ff534415d057","label":"Dr. Denim","layout":{"colorTheme":{"background":"#993d3d3d","buttons":"#ff2e2e2e","navTxt":"#FFFFFFFF","contBtxt":"#ff9ab3b2","contBsubTxt":"#FFB4B4B4","contAbg":"#FF000000","hdrBg":"#ff2e2e2e","contAhdlTxt":"#ffffffff","navIcn":"#FFFFFFFF","contCsubTxt":"#FFB4B4B4","contBhdlTxt":"#ffffffff","contCbg":"#ff2e2e2e","contAsubTxt":"#FFB4B4B4","contAtxt":"#ff9ab3b2","appBg":"#993d3d3d","contBbg":"#FF000000","actBtn":"#ff3199de","navBg":"#ff2e2e2e","contCtxt":"#FFFFFFFF","contAbrdr":"#ff2e2e2e","lnkTxt":"#ff3199de","hdrTxt":"#FFFFFFFF","contChdlTxt":"#FFFFFFFF","contBbrdr":"#FF000000","deviceType":-1,"headers":"#ffffffff","id":2,"displayName":"Crimson","mainText":"#ff3199de","smallText":"#ff9ab3b2"},"layoutType":0,"meta":{"bgImage":"http:\/\/storage.conduit.com\/Mobile\/ae\/44\/ae35a437-0e44-4297-95d2-1be56c7a36be\/Images\/c1ac2ac0-d28c-45fd-ba85-f262c538e46d.jpg","culture":null,"header":{"type":1,"content":"http:\/\/storage.conduit.com\/Mobile\/ae\/44\/ae35a437-0e44-4297-95d2-1be56c7a36be\/Images\/c4a8d538-cee5-4e0f-9839-184560a3ee26.png"},"isRtl":false,"material":0},"template":{"appGeneral":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"appBg"}]}}}},"loadingSmallIcn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAsubTxt"}]},"isBlack":false,"isSimple":false}}},"footer":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000","shadow":{"isInset":false,"x":"0px","y":"-2px","blur":"3px","color":"#99000000"}}}}},"scrnDiv":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000","shadow":{"isInset":false,"x":"3px","y":"0px","blur":"10px","color":"#99000000"}}}},"brdr":{"type":"border","data":{"default":{"right":{"color":"#FF000000","width":"1px"}}}}},"dialog":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#E5C8C8C8"}}},"btn2":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFe4e4e4","location":0},{"color":"#FF8d8d8d","location":1}]},"clicked":{"type":"solid","color":"#FF8d8d8d"},"disabled":{"type":"solid","color":"#33333333"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FFBFBBB8","width":"1px"},"right":{"color":"#FFBFBBB8","width":"1px"},"left":{"color":"#FFBFBBB8","width":"1px"},"top":{"color":"#FFBFBBB8","width":"1px"}},"clicked":{"bottom":{"color":"#FF757575","width":"1px"},"right":{"color":"#FF757575","width":"1px"},"left":{"color":"#FF757575","width":"1px"},"top":{"color":"#FF757575","width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FF5F5B5A","shadow":{"x":"0","y":"1px","blur":"0","color":"#80FFFFFF"}},"selected":{"color":"#CC000000","shadow":{"x":"0","y":"1px","blur":"0","color":"#80FFFFFF"}},"disabled":{"color":"#CCCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF5F5B5A","isBlack":true,"isSimple":true},"clicked":{"type":"solid","color":"#FF464342","isBlack":true,"isSimple":true},"disabled":{"type":"solid","color":"#CCCCCCCC","isBlack":true,"isSimple":true}}}}},"floatBtn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000"},"clicked":{},"disabled":{}}},"brdr":{"type":"border","data":{}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FFFFFFFF","shadow":{"x":"0px","y":"1px","blur":"2px","color":"#E5000000"}},"selected":{"color":"#ffb0b0b0"},"disabled":{"color":"#CCCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FFFFFFFF","isBlack":false,"isSimple":true}}}},"shareViewIcn":{"type":"icon","data":{"default":{"type":"solid","color":"#FFa29f9e","isBlack":true,"isSimple":true}}},"adBar":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.9]}]}}}},"brdr":{"type":"border","data":{"top":{"color":"#FF2a2a2a","width":"1px"}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBhdlTxt"}]}}}}}},"appHeader":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,1.6,1],[1,0.9,1.25,0.92]]}]},"location":0},{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.9,1.4,1],[1,1,1.13,0.95]]}]},"location":0.25},{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,1,1.1,1],[1,1,1.1,1]]}]},"location":0.49},{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,1,1,1],[1,1,1,1]]}]},"location":0.5},{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,1,0.8,1],[1,1,0.8,0.9]]}]},"location":0.73},{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,1,0.7,1],[1,0.7,0.5,1]]}]},"location":1}],"shadow":{"isInset":false,"x":"0px","y":"1px","blur":"3px","color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,0.3,0.8],[1,0.7,0.2,1]]}]}}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.5,1.05,1],[1,0.7,0.6,0.9]]}]},"width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"hdrTxt"}]}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.9,0.7,0.4],[1,0.9,0.5,0.4]]}]}},"clicked":{"type":"solid","color":"#4C000000","shadow":{"isInset":true,"x":"-1px","y":"1px","blur":"2px","color":"#66000000"}},"selected":{"type":"solid","color":"#4C000000","shadow":{"isInset":true,"x":"-1px","y":"1px","blur":"2px","color":"#66000000"}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrTxt"}]},"isBlack":false,"isSimple":true}}}}},"navBar":{"item":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,0.8,1.3,1],[1,0.9,1.25,0.95]]}]},"location":0},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,0.9,1.2,1],[1,1,1,0.95]]}]},"location":0.18},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,1,1],[1,1,0.7,1]]}]},"location":0.55},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.8,1],[1,1,0.5,1]]}]},"location":0.84},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.7,1],[1,0.6,0.4,1]]}]},"location":1}]},"clicked":{"type":"gradient","orientation":"vertical","color":[{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.5,0.7],[1,0.6,0.5,1]]}]},"location":0},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.5,0.7],[1,1,0.35,1]]}]},"location":0.18},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.4,0.7],[1,1,0.3,1]]}]},"location":0.55},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,0.8,0.2,0.7],[1,1,0.4,1]]}]},"location":0.84},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,0.5,0.1,0.7],[1,0.9,0.5,1]]}]},"location":1}],"shadow":{"isInset":true,"x":"0px","y":"0px","blur":"2px","color":"#FF000000"}},"selected":{"type":"gradient","orientation":"vertical","color":[{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.5,0.7],[1,0.6,0.5,1]]}]},"location":0},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.5,0.7],[1,1,0.35,1]]}]},"location":0.18},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,1,0.4,0.7],[1,1,0.3,1]]}]},"location":0.55},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,0.8,0.2,0.7],[1,1,0.4,1]]}]},"location":0.84},{"color":{"_replace":[{"param":"navBg","fn":"t_hsla","params":[0.5,[1,0.5,0.1,0.7],[1,0.9,0.5,1]]}]},"location":1}],"shadow":{"isInset":true,"x":"0px","y":"0px","blur":"2px","color":"#FF000000"}}}},"bubbleBg":{"type":"background","data":{"default":{},"clicked":{}}},"brdr":{"type":"border","data":{"default":{},"clicked":{}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"navTxt","fn":"hsla","params":[1,1,1,0.8]}]}},"clicked":{"color":{"_replace":[{"param":"navTxt"}]}},"selected":{"color":{"_replace":[{"param":"navTxt"}]}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"navIcn"}]},"isBlack":false,"isSimple":true}}}}},"navGrid":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#33000000"}}},"btn":{"bg":{"type":"background","data":{"default":{},"clicked":{}}},"brdr":{"type":"border","data":{"default":{},"clicked":{}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"navTxt","fn":"hsla","params":[1,1,1,0.8]}]}},"clicked":{"color":{"_replace":[{"param":"navTxt"}]}}}}}},"navList":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#33000000"}}},"item":{"bg":{"type":"background","data":{"default":{},"clicked":{"type":"solid","color":"#40000000"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#4c2a2a2a","width":"1px"}},"clicked":{}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"navTxt"}]}},"clicked":{}}}}},"tabBar":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#8C000000"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FF000000","width":"1px"}}}},"item":{"bg":{"type":"background","data":{"default":{},"clicked":{}}},"bubble":{"bg":{"type":"background","data":{"default":{},"clicked":{"type":"solid","color":"#66000000"},"selected":{"type":"solid","color":"#FF000000"}}},"brdr":{"type":"border","data":{"default":{},"clicked":{},"selected":{}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}},"clicked":{"color":"#FFFFFFFF"},"selected":{"color":"#FFFFFFFF"}}}},"brdr":{"type":"border","data":{"default":{},"clicked":{}}}}},"tab2Bar":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"horizontal","color":[{"color":"#DC000000","location":0},{"color":"#CC2A2A2A","location":0.5},{"color":"#DC000000","location":1}],"shadow":[{"isInset":true,"x":"0px","y":"-1px","blur":"0px","color":{"_replace":[{"param":"lnkTxt"}]}},{"isInset":true,"x":"0px","y":"1px","blur":"0px","color":{"_replace":[{"param":"lnkTxt"}]}},{"isInset":true,"x":"0px","y":"1px","blur":"6px","color":"#E6000000"},{"isInset":true,"x":"0px","y":"-1px","blur":"6px","color":"#E6000000"}]}}},"triangle":{"type":"border","data":{"default":{"top":{"width":"6px","color":{"_replace":[{"param":"contAtxt"}]}},"left":{"width":"8px","color":"#00000000"},"right":{"width":"8px","color":"#00000000"},"bottom":{"width":"6px","color":{"_replace":[{"param":"contAtxt"}]}}}}},"item":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000"},"selected":{"type":"solid","color":"#00000000"}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}},"selected":{"color":{"_replace":[{"param":"contAtxt"}]}}}}}},"contTypeA":{"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAhdlTxt"}]}}}},"hdlTxtBrdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":"#FFCCCCCC"},"bottom":{"width":"1px","color":"#FFCCCCCC"}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAtxt"}]}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAsubTxt"}]}}}},"lnkTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAtxt"}]},"isBlack":false,"isSimple":true}}},"subIcn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAsubTxt"}]},"isBlack":false,"isSimple":false}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAbg"}]}},"clicked":{"type":"solid","color":"#FF000000"},"selected":{"type":"solid","color":"#FF2a2a2a"}}},"subBg":{"type":"background","data":{"default":{"type":"solid","color":"#FF3c3c3c"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contAbrdr"}]},"width":"1px"}},"clicked":{},"selected":{"top":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,0.5,1]}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,0.5,1]}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,0.5,1]}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,0.5,1]}]}}}}},"classicItem":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAbg"}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"contAbg","fn":"hsla","params":[1,1,1,0.88]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"contAbg","fn":"hsla","params":[1,1,1,0.82]}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contAbrdr"}]},"width":"1px"}},"clicked":{},"selected":{"top":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,1.3,1]}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,1.3,1]}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,1.3,1]}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contAbrdr","fn":"hsla","params":[1,1,1.3,1]}]}}}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFe4e4e4","location":0},{"color":"#FF8d8d8d","location":1}],"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"5px","color":"#FF000000"}},"clicked":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFcacaca","location":0},{"color":"#FFf1f1f1","location":1}],"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"2px","color":"#cc000000"}},"disabled":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFe7e7e7","location":0},{"color":"#FFE6E6E6","location":1}]}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FFBFBBB8","width":"1px"},"right":{"color":"#FFBFBBB8","width":"1px"},"left":{"color":"#FFBFBBB8","width":"1px"},"top":{"color":"#FFBFBBB8","width":"1px"}},"clicked":{"bottom":{"color":"#FF757575","width":"1px"},"right":{"color":"#FF757575","width":"1px"},"left":{"color":"#FF757575","width":"1px"},"top":{"color":"#FF757575","width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FF5F5B5A","shadow":{"x":"0","y":"1px","blur":"0","color":"#80FFFFFF"}},"selected":{"color":"#CC000000","shadow":{"x":"0","y":"1px","blur":"0","color":"#80FFFFFF"}},"disabled":{"color":"#ffCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF2a2a2a","isBlack":true,"isSimple":false}}}},"actBtn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"actBtn","fn":"t_hsla","params":[0.5,[1,1,1.3,1],[1,1,0.5,1]]}]}},"disabled":{"type":"solid","color":"#33333333"}}},"brdr":{"type":"border","data":{}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FFFFFFFF"},"selected":{"color":"#FFFFFFFF"},"disabled":{"color":"#ffCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FFFFFFFF","isBlack":false,"isSimple":true}}}},"contentSession":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAhdlTxt","fn":"hsla","params":[1,1,1,0.88]}]}}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg"}]}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg","fn":"hsla","params":[1,1,1,0.69]}]}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg","fn":"hsla","params":[1,1,1,0.49]}]}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000","shadow":[{"isInset":false,"x":"0px","y":"0px","blur":"0px 1px","color":"#66000000"},{"isInset":true,"x":"1px","y":"1px","blur":"0px","color":"#4Dffffff"}]}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF000000","isBlack":true,"isSimple":true}}}}},"contentSession2":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"lnkTxt","fn":"hsla","params":[1,1,1,0.88]}]}}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg"}]}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg","fn":"hsla","params":[1,1,1,0.69]}]}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg","fn":"hsla","params":[1,1,1,0.49]}]}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000","shadow":[{"isInset":false,"x":"1px","y":"1px","blur":"0px","color":"#66ffffff"},{"isInset":true,"x":"1px","y":"1px","blur":"3px","color":"#99000000"}]}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF000000","isBlack":true,"isSimple":true}}}}},"calBoxBrdr1":{"type":"border","data":{"default":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","style":"dotted","color":{"_replace":[{"param":"contBbrdr","fn":"hsla","params":[1,1,1,0.7]}]}}}}},"calBoxBrdr2":{"type":"border","data":{"default":{"top":{"width":"1px","style":"dotted","color":{"_replace":[{"param":"contBbrdr","fn":"hsla","params":[1,1,1,0.7]}]}},"bottom":{"width":"1px","style":"dotted","color":{"_replace":[{"param":"contBbrdr","fn":"hsla","params":[1,1,1,0.7]}]}}}}}},"contTypeB":{"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBhdlTxt"}]}}}},"hdlTxtBrdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":{"_replace":[{"param":"contBhdlTxt","fn":"hsla","params":[1,1,1,0.2]}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBhdlTxt","fn":"hsla","params":[1,1,1,0.2]}]}}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBtxt"}]}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBsubTxt"}]}}}},"lnkTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBtxt"}]},"isBlack":false,"isSimple":true}}},"subIcn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBsubTxt"}]},"isBlack":false,"isSimple":true}}},"hdlIcn":{"type":"server_icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBhdlTxt"}]},"isBlack":false,"isSimple":true}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.88]}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.8]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.8]}]}}}},"subBg":{"type":"background","data":{"default":{"type":"solid","color":"#FF3c3c3c"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}},"clicked":{"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}},"selected":{"top":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}}}},"bubbleItem":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.88]}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.8]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBbg"}]},"shadow":[{"isInset":false,"x":"0px","y":"0px","blur":"1px","color":"#FF2a2a2a"},{"isInset":false,"x":"0px","y":"0px","blur":"2px","color":"#FF2a2a2a"},{"isInset":false,"x":"0px","y":"0px","blur":"2px","color":"#FF2a2a2a"},{"isInset":false,"x":"0px","y":"0px","blur":"2px","color":"#FF2a2a2a"}]}}},"brdr":{"type":"border","data":{}}},"headerItem":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.82]}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.88]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,1]}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}}}}},"trackItem":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.88]}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.82]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBbg"}]}}}},"brdr":{"type":"border","data":{"default":{"top":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}},"clicked":{"top":{"color":{"_replace":[{"param":"hdrBg"}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"hdrBg"}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"hdrBg"}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"hdrBg"}]},"width":"1px"}},"selected":{"top":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}}}}},"fullPage":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.9]}]}}}}},"fullPage2":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.1]}]}}}}},"sep":{"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr","fn":"hsla","params":[1,1,0.6,1]}]}}}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFFFFFFF","location":0},{"color":"#FFE6E6E6","location":1}]},"clicked":{"type":"gradient","orientation":"vertical","color":[{"color":"#ffdddddd","location":0},{"color":"#ffcccccc","location":1}]},"disabled":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFe7e7e7","location":0},{"color":"#FFE6E6E6","location":1}]}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FFBFBBB8","width":"1px"},"right":{"color":"#FFBFBBB8","width":"1px"},"left":{"color":"#FFBFBBB8","width":"1px"},"top":{"color":"#FFBFBBB8","width":"1px"}},"clicked":{"bottom":{"color":"#FF757575","width":"1px"},"right":{"color":"#FF757575","width":"1px"},"left":{"color":"#FF757575","width":"1px"},"top":{"color":"#FF757575","width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FF5F5B5A","shadow":{"x":"0","y":"1px","blur":"0","color":"#80FFFFFF"}},"selected":{},"disabled":{"color":"#CCCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF5F5B5A","isBlack":true,"isSimple":false},"clicked":{"type":"solid","color":"#FF464342","isBlack":true,"isSimple":false},"disabled":{"type":"solid","color":"#CCCCCCCC","isBlack":true,"isSimple":false}}}},"actBtn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"actBtn","fn":"t_hsla","params":[0.5,[1,1,1.3,1],[1,1,0.5,1]]}]}},"disabled":{"type":"solid","color":"#33333333"}}},"brdr":{"type":"border","data":{}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FFFFFFFF"},"selected":{"color":"#FFFFFFFF"},"disabled":{"color":"#ffCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FFFFFFFF","isBlack":false,"isSimple":true}}}}},"contTypeC":{"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contChdlTxt"}]}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contCtxt"}]}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contCsubTxt"}]}}}},"lnkTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contCbg","fn":"t_hsla","params":[0.5,[1,1,0.6,0.9],[1,1,0.3,0.9]]}]}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"actBtn","fn":"t_hsla","params":[0.5,[1,1,1.3,1],[1,1,0.5,1]]}]}},"disabled":{"type":"solid","color":"#33333333"}}},"brdr":{"type":"border","data":{}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FFFFFFFF"},"selected":{"color":"#FFFFFFFF"},"disabled":{"color":"#ffCCCCCC"}}}}},"form":{"element":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFe4e4e4","location":0},{"color":"#FF8d8d8d","location":1}]},"mandatory":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFFFFFFF","location":0},{"color":"#FFFF0000","location":1}]}}},"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":"#FFC1C1C2"},"bottom":{"width":"1px","color":"#FFC1C1C2"},"left":{"width":"1px","color":"#FFC1C1C2"},"right":{"width":"1px","color":"#FFC1C1C2"}},"mandatory":{"top":{"color":"#FFB60021","width":"1px"},"bottom":{"color":"#FFB60021","width":"1px"},"left":{"color":"#FFB60021","width":"1px"},"right":{"color":"#FFB60021","width":"1px"}}}},"txt":{"type":"text","data":{"default":{"color":"#FF111111"},"watermark":{"color":"#FF888888"},"mandWatermark":{"color":"#FFBB0000"}}}},"dropdown":{"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF2a2a2a","isBlack":true,"isSimple":true}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":"#22000000"}}},"brdr":{"type":"border","data":{"default":{"left":{"color":"#FFC1C1C2","width":"1px"},"right":{"color":"#FFC1C1C2","width":"1px"}}}}},"input":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF"},"disabled":{"type":"solid","color":"#FFCCCCCC"},"mandatory":{"type":"solid","color":"#FFFFDDDD"}}},"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":"#FFC1C1C2"},"bottom":{"width":"1px","color":"#FFC1C1C2"},"left":{"width":"1px","color":"#FFC1C1C2"},"right":{"width":"1px","color":"#FFC1C1C2"}},"diabled":{},"mandatory":{"top":{"color":"#FFB60021","width":"1px"},"bottom":{"color":"#FFB60021","width":"1px"},"left":{"color":"#FFB60021","width":"1px"},"right":{"color":"#FFB60021","width":"1px"}}}},"txt":{"type":"text","data":{"default":{"color":"#FF000000"},"watermark":{"color":"#33000000"},"mandWatermark":{"color":"#FFFF0000"}}}},"checkBox":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#7f2a2a2a","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":"#FF000000"}},"selected":{"type":"solid","color":"#7f2a2a2a","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":"#FF000000"}},"mandatory":{"type":"solid","color":"#7f2a2a2a","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":"#FF000000"}}}},"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":"#FF9f9f9f"},"bottom":{"width":"1px","color":"#FF9f9f9f"},"left":{"width":"1px","color":"#FF9f9f9f"},"right":{"width":"1px","color":"#FF9f9f9f"}},"selected":{"top":{"width":"1px","color":"#FF9f9f9f"},"bottom":{"width":"1px","color":"#FF9f9f9f"},"left":{"width":"1px","color":"#FF9f9f9f"},"right":{"width":"1px","color":"#FF9f9f9f"}},"mandatory":{"top":{"color":"#FFB60021","width":"1px"},"bottom":{"color":"#FFB60021","width":"1px"},"left":{"color":"#FFB60021","width":"1px"},"right":{"color":"#FFB60021","width":"1px"}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrTxt"}]},"isBlack":false,"isSimple":true},"selected":{"type":"solid","color":"#FFFFFFFF","isBlack":false,"isSimple":true}}}}},"audioPlayer":{"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"hdrTxt"}]}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"hdrTxt","fn":"hsla","params":[1,1,1,0.8]}]}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrTxt"}]},"isBlack":false,"isSimple":true}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg","fn":"hsla","params":[1,1,0.3,1]}]}}}},"bgMini":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg","fn":"hsla","params":[1,1,0.3,1]}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.5,0.7,0.9],[1,0.7,0.6,0.9]]}]},"width":"1px"}}}},"seekBar":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,1.3,1],[1,0.7,0.7,1]]}]},"shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,0.001,1],[1,0.7,0.001,1]]}]}}}}},"brdr":{"type":"border","data":{"default":{"top":{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,1.1,1],[1,0.7,0.7,1]]}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,1.8,1],[1,0.7,0.7,1]]}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,1.8,1],[1,0.7,0.7,1]]}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"hdrBg","fn":"t_hsla","params":[0.5,[1,0.7,1.1,1],[1,0.7,0.7,1]]}]},"width":"1px"}}}},"seekFill":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrTxt"}]},"shadow":{"isInset":true,"x":"0px","y":"1px","blur":"1px","color":"#ff000000"}}}}}},"liveChat":{"bubbleMe":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.88]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}}}},"triangle":{"type":"border","data":{"default":{"ltrLeft":{"color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.88]}]},"width":"10px"},"bottom":{"color":"#00000000","width":"10px"},"top":{"color":"#00000000","width":"10px"}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBhdlTxt"}]},"shadow":{"x":"1px","y":"1px","blur":"0","color":"#CCFFFFFF"}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBsubTxt"}]},"shadow":{"x":"1px","y":"1px","blur":"1px","color":"#FFFFFFFF"}}}}},"bubbleOther":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAbg"}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}}}},"triangle":{"type":"border","data":{"default":{"ltrRight":{"color":{"_replace":[{"param":"contAbg"}]},"width":"10px"},"bottom":{"color":"#00000000","width":"10px"},"top":{"color":"#00000000","width":"10px"}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAhdlTxt"}]},"shadow":{"x":"1px","y":"1px","blur":"0px","color":"#CCFFFFFF"}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBsubTxt"}]},"shadow":{"x":"1px","y":"1px","blur":"0px","color":"#FFFFFFFF"}}}}}},"facebook":{"txt":{"type":"text","data":{"default":{"color":"#FFced7e7"}}},"bubble":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FF1d1d1d"}}},"brdr":{"type":"border","data":{"default":{"left":{"color":"#FF2a2a2a","width":"1px"},"right":{"color":"#FF2a2a2a","width":"1px"},"bottom":{"color":"#FF2a2a2a","width":"1px"},"top":{"color":"#FF2a2a2a","width":"1px"}}}},"triangle":{"type":"border","data":{"default":{"left":{"color":"#00000000","width":"4px"},"right":{"color":"#00000000","width":"4px"},"bottom":{"color":"#FF1d1d1d","width":"4px"}}}},"triangleBrdr":{"type":"border","data":{"default":{"left":{"color":"#00000000","width":"6px"},"right":{"color":"#00000000","width":"6px"},"bottom":{"color":"#FF2a2a2a","width":"6px"}}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000"},"clicked":{"type":"solid","color":"#FFCED7E7"},"disabled":{"type":"solid","color":"#33333333"}}},"brdr":{"type":"border","data":{"default":{"left":{"color":"#00000000","width":"1px"},"right":{"color":"#00000000","width":"1px"},"bottom":{"color":"#00000000","width":"1px"},"top":{"color":"#00000000","width":"1px"}},"clicked":{"bottom":{"color":"#FF2a2a2a","width":"1px"},"right":{"color":"#FF2a2a2a","width":"1px"},"left":{"color":"#FF2a2a2a","width":"1px"},"top":{"color":"#FF2a2a2a","width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FF42599C"},"selected":{"color":"#FF42599C"},"disabled":{"color":"#CCCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF5F5B5A","isBlack":true,"isSimple":true},"clicked":{"type":"solid","color":"#FF464342","isBlack":true,"isSimple":true},"disabled":{"type":"solid","color":"#CCCCCCCC","isBlack":true,"isSimple":true}}}}},"events":{"calPict":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","fn":"hsla","params":[1,1,1,0.78]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"2px","color":"#FF000000"}}}}}},"comment":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF"}}},"panel":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFF0F0F0"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FFCCCCCC","width":"1px"}}}}}},"images":{"image1":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FF000000","width":"1px"},"top":{"color":"#FF000000","width":"1px"},"right":{"color":"#FF000000","width":"1px"},"left":{"color":"#FF000000","width":"1px"}}}}},"image2":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FF000000","width":"1px"},"top":{"color":"#FF000000","width":"1px"},"right":{"color":"#FF000000","width":"1px"},"left":{"color":"#FF000000","width":"1px"}}}}},"imgBtn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#FF000000"}},"clicked":{"type":"solid","color":"#FFFFFFFF"},"selected":{"type":"solid","color":"#FFFFFFFF"}}},"overlayBg":{"type":"background","data":{"default":{"type":"solid","color":"#99000000"},"clicked":{"type":"solid","color":"#00000000"},"selected":{"type":"solid","color":"#00000000"}}},"brdr":{"type":"border","data":{"default":{"left":{"color":"#ffffffff","width":"3px"},"right":{"color":"#ffffffff","width":"3px"},"bottom":{"color":"#ffffffff","width":"3px"},"top":{"color":"#ffffffff","width":"3px"}},"clicked":{"bottom":{"color":"#00000000","width":"0px"},"right":{"color":"#00000000","width":"0px"},"left":{"color":"#00000000","width":"0px"},"top":{"color":"#00000000","width":"0px"}},"selected":{"bottom":{"color":"#00000000","width":"0px"},"right":{"color":"#00000000","width":"0px"},"left":{"color":"#00000000","width":"0px"},"top":{"color":"#00000000","width":"0px"}}}}}}}},"meta":{"bgImage":"http:\/\/storage.conduit.com\/Mobile\/ae\/44\/ae35a437-0e44-4297-95d2-1be56c7a36be\/Images\/c1ac2ac0-d28c-45fd-ba85-f262c538e46d.jpg","culture":"en-US","header":{"type":1,"content":"http:\/\/storage.conduit.com\/Mobile\/ae\/44\/ae35a437-0e44-4297-95d2-1be56c7a36be\/Images\/c4a8d538-cee5-4e0f-9839-184560a3ee26.png"},"isRtl":false,"material":0},"name":"Dr. Denim","pages":[{"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/78","id":"4afd8112-b5a3-4a46-868d-61b322ee4dd7","label":"About Us","meta":{"pageLayout":-1,"items":[{"imgUrl":"http:\/\/storage.conduit.com\/Mobile\/ae\/44\/ae35a437-0e44-4297-95d2-1be56c7a36be\/Images\/c745fe86-fce1-495b-ba36-863bc89cbc79.png","buttons":{"facebook":"https:\/\/www.facebook.com\/drdenimdotcom","twitter":"https:\/\/twitter.com\/thedrdenim","email":"customercare@drdenim.com","webSite":"http:\/\/www.drdenim.com\/"},"list":[{"title":"{$HtmlTextAboutUsItemTitleProducts}","icon":"http:\/\/storage.conduit.com\/Images\/Mobile\/controlpanel\/AboutUs\/icons_white\/Product.png","iconBlack":"http:\/\/storage.conduit.com\/Images\/Mobile\/controlpanel\/AboutUs\/icons_black\/Product.png","dataType":"html","data":{"html":"<p><span style=\"color: #333333; font-family: 'lucida grande', tahoma, verdana, arial, sans-serif; font-size: 11px; line-height: 15px; background-color: #ffffff;\">Jeans, Shirts &amp; Sweatshirts, Pants &amp; Shorts, Activewear, Outerwear, Footwear, Accessories, and more.<\/span><\/p>"}}],"name":"Outfitting The World Since 1997","about":"Dr. Denim, Inc. has built its success through offering the latest styles from leading brands, while continually discovering new brands and trends to bring the consumer. We continue to expand and have tremendous love for our customers. For everything fashion, apparel and accessories - whether urban or premium - we have exactly what you want. Expect great customer service, quality and atmosphere. Dr. Denim isn’t only a brand - it’s also a lifestyle."}],"layout":null},"minVersion":"2.0.0.0","type":"5a8368df-6ebd-c0f2-2d82-e173c1f33d40","version":null},{"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/13","id":"b3b252c5-5adb-48f4-a749-60a8c3260842","label":"Coupons","meta":{"pageLayout":-1,"notes":[{"id":"f36766c4-e50f-622e-d19c-d5f6ccd7ae75","html":"<p style=\"text-align: center;\"><span style=\"text-decoration: underline; color: #3366ff; font-size: 20pt;\"><strong>Current Specials<\/strong><\/span><\/p>\u000d\u000a<p style=\"text-align: center;\"><span style=\"text-decoration: underline; color: #3366ff;\"><strong><span style=\"font-size: 24pt;\"><img alt=\"''\" height=\"305\" src=\"http:\/\/i50.tinypic.com\/207w3kh.jpg\" style=\"vertical-align: middle; border: 1px solid black;\" width=\"760\" \/><\/span><\/strong><\/span><\/p>\u000d\u000a<p style=\"text-align: center;\"><span style=\"text-decoration: underline; color: #3366ff;\"><strong><span style=\"font-size: 24pt;\"><br \/><\/span><\/strong><\/span><\/p>\u000d\u000a<p style=\"text-align: center;\"><span style=\"text-decoration: underline; color: #3366ff;\"><strong><span style=\"font-size: 24pt;\"><img alt=\"''\" height=\"447\" src=\"http:\/\/i48.tinypic.com\/e8wu2r.jpg\" style=\"vertical-align: middle; border: 1px solid black;\" width=\"760\" \/><\/span><\/strong><\/span><\/p>"}],"layout":null},"minVersion":"0.0.0.0","type":"27f91d0a-42c0-48fa-90a8-7138641ddecf","version":null},{"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/84","id":"c77f9836-a739-4034-9085-c107e61f5725","label":"Instagram","meta":{"pageLayout":-1,"items":[{"id":"74bea145-3e1b-14af-058e-5ee53f80f784","type":"instagram","title":"Dr. Denim","userTitle":"thedrdenim","userName":"292686745"}],"layout":null},"minVersion":"2.7.0.5","type":"e0adcb11-f7bb-8107-1cd0-77690221f31c","version":null},{"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/17","id":"7e660179-2131-48ce-ac81-c09cc695a00e","label":"Facebook","meta":{"pageLayout":1,"channels":[{"id":"9edd1aca-2979-17c8-50d0-dfe89748e508","user":"drdenimdotcom","postsSource":"feed","title":"Channel"}],"layout":null},"minVersion":"0.0.0.0","type":"df7d11f3-233c-4d49-8f2a-d1886e07c641","version":null},{"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/58","id":"896e6eb8-edc4-4207-aa84-31d6af451fa0","label":"Twitter","meta":{"pageLayout":1,"feeds":[{"id":"e309e506-bb0d-64a6-c7d7-a9dfad019598","title":"Feed","type":"0","userName":"@thedrdenim","params":{}}],"layout":null},"minVersion":"0.0.0.0","type":"a77583ef-758f-45f3-9ad1-9704d82a2154","version":null},{"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/82","id":"5d5ec81a-dc6a-4b9b-a491-f86d6428fe77","label":"Webpage","meta":{"pageLayout":-1,"items":[{"link":"http:\/\/drdenim.com","openInExternalBrowser":true}],"layout":null},"minVersion":"2.7.0.5","type":"c54d24ef-faf5-45dd-8859-85e3ebe7cecf","version":null},{"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/42","id":"9cb5a768-592b-4a2c-a622-90447f59d7dd","label":"Photos","meta":{"pageLayout":10,"feeds":[{"title":"General Photos","params":{"albumId":"113601378781954","albumName":"Cover Photos"},"type":"facebook","id":"a5ecb90f-8ae3-7279-b1e1-6d2c4dbd64d6","userName":"drdenimdotcom"}],"layout":null},"minVersion":"0.0.0.0","type":"3b11bcdf-ba5e-4eaa-9059-ea580b3f1681","version":null},{"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/61","id":"0b4993ab-7b68-49e8-8dbc-b69c22c1fb59","label":"Video","meta":{"pageLayout":-1,"items":[{"title":"Playlist","params":{"type":3,"className":"youtube","icon":"\/Images\/Providers\/Video\/small_icon_3.png","params":{"isOpenSearch":true},"youtube":{"type":"uploads","query":"denimvision","sort":{}},"url":"http:\/\/gdata.youtube.com\/feeds\/api\/users\/denimvision\/uploads\/?v=2&format=5&orderby=published"},"id":"5b3e7537-2b10-52fd-3356-2f326333d60b"}],"layout":null},"minVersion":"2.0.0.0","type":"4680c3f3-e767-4ebf-b112-9ba769c3ff2a","version":null},{"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/33","id":"5d896850-faf2-44d3-b3eb-34e3e98d13d0","label":"LiveAlbum","meta":{"pageLayout":-1,"feeds":[{"id":"5b8f264f-f7b5-23bc-2f02-67bb21d672e0","type":"livealbum","title":"Customer Photos","userName":"4e0266b7-ef50-414c-bc76-4872e92f21af","params":{"groupId":"ae35a437-0e44-4297-95d2-1be56c7a36be"}}],"layout":null},"minVersion":"2.8.0.0","type":"26ae8ccc-5464-7979-4fdf-3a13f166ffff","version":null},{"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/15","id":"536705ce-9cac-4654-a8f3-3aa16ae1f30f","label":"Contact Us","meta":{"pageLayout":1,"items":[{"id":"d062fe38-5b7f-6e17-a9d9-f362b1ceb62a","logoImgUrl":"http:\/\/storage.conduit.com\/Mobile\/ae\/44\/ae35a437-0e44-4297-95d2-1be56c7a36be\/Images\/ecb17f20-74c0-4c25-93e1-e11973c0b26f.png","phone":"1.888.7­61.6520","mail":"customerservice@drdenim.com","url":"http:\/\/drdenim.com"}],"layout":null},"minVersion":"1.9.0.0","type":"083e52df-721d-4ca4-efa3-25161d344f40","version":null},{"displayDevices":0,"icon":"http:\/\/images.mobile.conduit-services.com\/icon\/35","id":"93ae69e4-ad1c-4fce-aec2-d07f9df2184d","label":"Locations","meta":{"pageLayout":-1,"notes":[{"id":"50230d3a-e7f0-c779-279d-eef78d2dd3b5","html":"<p><img alt=\"''\" height=\"334\" src=\"http:\/\/i45.tinypic.com\/15nk2lu.png\" style=\"vertical-align: middle;\" width=\"240\" \/><img alt=\"''\" height=\"352\" src=\"http:\/\/i49.tinypic.com\/zlopqt.png\" style=\"vertical-align: middle; float: left;\" width=\"243\" \/><img alt=\"''\" height=\"309\" src=\"http:\/\/i46.tinypic.com\/2093xok.png\" style=\"vertical-align: middle; border: 0px; float: left;\" width=\"231\" \/><\/p>"}],"layout":{"meta":{"bgImage":"http:\/\/storage.conduit.com\/Mobile\/ae\/44\/ae35a437-0e44-4297-95d2-1be56c7a36be\/Images\/e419f346-bb41-46e8-b892-6d627e47cfe5.jpg"}}},"minVersion":"0.0.0.0","type":"27f91d0a-42c0-48fa-90a8-7138641ddecf","version":null}],"publisherId":"b24ac9cb-b178-48aa-b014-25a258153b01","settings":{"ads":{"adBarCycles":null,"bottomBarAdEnabled":null,"bottomBarSwitchInterval":null,"enabled":false,"fullScreenAdDisplayDuration":null,"fullScreenAdEnabled":null,"fullScreenAdTO":null},"brand":{"name":null,"link":null,"showAppLinks":true},"env":3,"fbAccessToken":"AAACeZBZANVcJ0BALWdkZBkVMprgCHf89vvzV3bq47rmnXHXXRnFbOhtwvU0k0tbUcL1aEjCQgZCrZCOhldBPeaBZAymqaZAyZBUZD","overrideServices":[{"key":"CMS_TWITTER_USER_GET","params":{},"version":1},{"key":"CMS_TWITTER_QUERY_GET","params":{},"version":1}]},"social":{"facebook":{"appId":"209845035304"}},"version":"1.2.8.267"},"maxAge":7200,"serviceUrl":"http:\/\/ams.mobile.conduit-services.com\/bf594e20-6e25-48ad-b043-ff534415d057\/2?appVersion={appVersion}"},{"data":{"data":[{"caption":"instagram.com","description":"thedrdenim's photo on Instagram","from":{"id":"104522723023153","name":"DrDenim.com","category":"Clothing"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"104522723023153_612955775399090","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQCtT5RbnBijndfN&w=154&h=154&url=http%3A%2F%2Fdistilleryimage6.ak.instagram.com%2F3f96e860a4a311e2846522000a1f9d5a_7.jpg","likes":4,"link":"http:\/\/instagram.com\/p\/YERzn9m0mS\/","message":"Philly's own @dannyswiftgarcia showing us some love. Thanks for stopping by champ!","name":"http:\/\/instagram.com\/p\/YERzn9m0mS\/","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQCtT5RbnBijndfN&w=154&h=154&url=http%3A%2F%2Fdistilleryimage6.ak.instagram.com%2F3f96e860a4a311e2846522000a1f9d5a_7.jpg","shortDesc":"Philly's own @dannyswiftgarcia showing us some love. Thanks for stopping by champ!","socialId":"Facebook:104522723023153_612955775399090","title":"instagram.com","url":"http:\/\/instagram.com\/p\/YERzn9m0mS\/"},"time":1366044107,"type":"link"},{"from":{"id":"104522723023153","name":"DrDenim.com","category":"Clothing"},"id":"104522723023153_234839346658156","socialInfo":{"imageUrl":null,"shortDesc":null,"socialId":"Facebook:104522723023153_234839346658156","title":null,"url":null},"time":1365700615,"type":"status"},{"description":"See when Lil Wayne is coming to a city near you... http:\/\/bit.ly\/10oxSWR","from":{"id":"104522723023153","name":"DrDenim.com","category":"Clothing"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"104522723023153_451019971647229","image":"http:\/\/profile.ak.fbcdn.net\/hprofile-ak-snc6\/276819_312267818785925_1801899009_q.jpg","likes":1,"link":"http:\/\/www.facebook.com\/TRUKFITApparel\/posts\/596187540393950","name":"TRUKFIT","socialInfo":{"imageUrl":"http:\/\/profile.ak.fbcdn.net\/hprofile-ak-snc6\/276819_312267818785925_1801899009_q.jpg","shortDesc":"See when Lil Wayne is coming to a city near you... http:\/\/bit.ly\/10oxSWR","socialId":"Facebook:104522723023153_451019971647229","title":"TRUKFIT","url":"http:\/\/www.facebook.com\/TRUKFITApparel\/posts\/596187540393950"},"time":1365700591,"type":"link"},{"from":{"id":"104522723023153","name":"DrDenim.com","category":"Clothing"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yz\/r\/StEh3RhPvjk.gif","id":"104522723023153_232669660208458","image":"http:\/\/photos-c.ak.fbcdn.net\/hphotos-ak-ash3\/533291_232669650208459_1478051007_s.jpg","likes":4,"link":"http:\/\/www.facebook.com\/photo.php?fbid=232669650208459&set=a.127035207438571.26718.104522723023153&type=1&relevant_count=1","message":"The future's so bright, I gotta wear shades: http:\/\/www.drdenim.com\/sunglasses","socialInfo":{"imageUrl":"http:\/\/photos-c.ak.fbcdn.net\/hphotos-ak-ash3\/533291_232669650208459_1478051007_s.jpg","shortDesc":"The future's so bright, I gotta wear shades: http:\/\/www.drdenim.com\/sunglasses","socialId":"Facebook:104522723023153_232669660208458","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=232669650208459&set=a.127035207438571.26718.104522723023153&type=1&relevant_count=1"},"time":1365196789,"type":"photo"},{"from":{"id":"104522723023153","name":"DrDenim.com","category":"Clothing"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yz\/r\/StEh3RhPvjk.gif","id":"104522723023153_231931513615606","image":"http:\/\/photos-a.xx.fbcdn.net\/hphotos-ash4\/299168_231931506948940_1728780282_s.png","likes":13,"link":"http:\/\/www.facebook.com\/photo.php?fbid=231931506948940&set=a.127035207438571.26718.104522723023153&type=1&relevant_count=1","socialInfo":{"imageUrl":"http:\/\/photos-a.xx.fbcdn.net\/hphotos-ash4\/299168_231931506948940_1728780282_s.png","shortDesc":null,"socialId":"Facebook:104522723023153_231931513615606","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=231931506948940&set=a.127035207438571.26718.104522723023153&type=1&relevant_count=1"},"time":1365028512,"type":"photo"},{"description":"14 track album","from":{"id":"104522723023153","name":"DrDenim.com","category":"Clothing"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yj\/r\/v2OnaTyTQZE.gif","id":"104522723023153_516249428421969","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQCHFhT656wV_Sus&w=130&h=130&url=http%3A%2F%2Ff0.bcbits.com%2Fz%2F22%2F87%2F2287136304-1.jpg","link":"http:\/\/emersonkennedy.bandcamp.com\/album\/denim-2","message":"Cool of the day - a free hip hop album download. Called denim. Perfect.","name":"denim., by Emerson Kennedy","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQCHFhT656wV_Sus&w=130&h=130&url=http%3A%2F%2Ff0.bcbits.com%2Fz%2F22%2F87%2F2287136304-1.jpg","shortDesc":"Cool of the day - a free hip hop album download. Called denim. Perfect.","socialId":"Facebook:104522723023153_516249428421969","title":"denim., by Emerson Kennedy","url":"http:\/\/emersonkennedy.bandcamp.com\/album\/denim-2"},"time":1364926466,"type":"video"},{"caption":"www.drdenim.com","from":{"id":"104522723023153","name":"DrDenim.com","category":"Clothing"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"104522723023153_148285598682408","likes":1,"link":"http:\/\/bit.ly\/10in38P","message":"Happy Opening Day. Need some new baseball threads? ","name":"http:\/\/bit.ly\/10in38P","socialInfo":{"imageUrl":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","shortDesc":"Happy Opening Day. Need some new baseball threads? ","socialId":"Facebook:104522723023153_148285598682408","title":"www.drdenim.com","url":"http:\/\/bit.ly\/10in38P"},"time":1364847030,"type":"link"},{"caption":"instagram.com","description":"thedrdenim's photo on Instagram","from":{"id":"104522723023153","name":"DrDenim.com","category":"Clothing"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"104522723023153_573969855955598","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQCK5r8zRa9d0om4&w=154&h=154&url=http%3A%2F%2Fdistilleryimage10.instagram.com%2F8cd72778994c11e28c9e22000a9f308e_7.jpg","likes":2,"link":"http:\/\/instagram.com\/p\/XfH6pBG0mO\/","message":"Waka Flocka visiting Dr. Denim @wakaflockabsm ","name":"http:\/\/instagram.com\/p\/XfH6pBG0mO\/","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQCK5r8zRa9d0om4&w=154&h=154&url=http%3A%2F%2Fdistilleryimage10.instagram.com%2F8cd72778994c11e28c9e22000a9f308e_7.jpg","shortDesc":"Waka Flocka visiting Dr. Denim @wakaflockabsm ","socialId":"Facebook:104522723023153_573969855955598","title":"instagram.com","url":"http:\/\/instagram.com\/p\/XfH6pBG0mO\/"},"time":1364833777,"type":"link"},{"description":"“Good is the enemy of great.” - J. Collins #TrukforLife","from":{"id":"104522723023153","name":"DrDenim.com","category":"Clothing"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"104522723023153_176105722540604","image":"http:\/\/profile.ak.fbcdn.net\/hprofile-ak-snc6\/276819_312267818785925_1801899009_q.jpg","likes":2,"link":"http:\/\/www.facebook.com\/TRUKFITApparel\/posts\/591331157546255","message":"Be great.","name":"TRUKFIT","socialInfo":{"imageUrl":"http:\/\/profile.ak.fbcdn.net\/hprofile-ak-snc6\/276819_312267818785925_1801899009_q.jpg","shortDesc":"Be great.","socialId":"Facebook:104522723023153_176105722540604","title":"TRUKFIT","url":"http:\/\/www.facebook.com\/TRUKFITApparel\/posts\/591331157546255"},"time":1364507391,"type":"link"},{"from":{"id":"104522723023153","name":"DrDenim.com","category":"Clothing"},"id":"104522723023153_229119103896847","socialInfo":{"imageUrl":null,"shortDesc":null,"socialId":"Facebook:104522723023153_229119103896847","title":null,"url":null},"time":1364507359,"type":"status"},{"caption":"Will.I.Am.A.House","from":{"id":"104522723023153","name":"DrDenim.com","category":"Clothing"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"104522723023153_481864721866781","image":"http:\/\/photos-c.ak.fbcdn.net\/hphotos-ak-snc6\/10758_354464111324560_986844737_s.jpg","likes":4,"link":"http:\/\/www.facebook.com\/photo.php?fbid=354464111324560&set=a.251564004947905.47255.205523986218574&type=1","message":"The resemblance is uncanny...","name":"Timeline Photos","socialInfo":{"imageUrl":"http:\/\/photos-c.ak.fbcdn.net\/hphotos-ak-snc6\/10758_354464111324560_986844737_s.jpg","shortDesc":"The resemblance is uncanny...","socialId":"Facebook:104522723023153_481864721866781","title":"Will.I.Am.A.House","url":"http:\/\/www.facebook.com\/photo.php?fbid=354464111324560&set=a.251564004947905.47255.205523986218574&type=1"},"time":1364246734,"type":"photo"},{"from":{"id":"104522723023153","name":"DrDenim.com","category":"Clothing"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yz\/r\/StEh3RhPvjk.gif","id":"104522723023153_226346814174076","image":"http:\/\/photos-f.ak.fbcdn.net\/hphotos-ak-prn1\/31438_226346807507410_942456293_s.jpg","likes":54,"link":"http:\/\/www.facebook.com\/photo.php?fbid=226346807507410&set=a.127035207438571.26718.104522723023153&type=1&relevant_count=1","message":"Two weeks to save. Shop online now.","socialInfo":{"imageUrl":"http:\/\/photos-f.ak.fbcdn.net\/hphotos-ak-prn1\/31438_226346807507410_942456293_s.jpg","shortDesc":"Two weeks to save. Shop online now.","socialId":"Facebook:104522723023153_226346814174076","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=226346807507410&set=a.127035207438571.26718.104522723023153&type=1&relevant_count=1"},"time":1363993088,"type":"photo"},{"caption":"16 games. 4 channels. 12 hours. Welcome to the Madness!\u000a\u000aGet ready: http:\/\/bit.ly\/ZNsQSw","from":{"id":"104522723023153","name":"DrDenim.com","category":"Clothing"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"104522723023153_174460419371867","image":"http:\/\/photos-h.ak.fbcdn.net\/hphotos-ak-ash3\/601519_10151568736213760_1540729526_s.png","link":"http:\/\/www.facebook.com\/photo.php?fbid=10151568736213760&set=a.177021543759.153351.176134773759&type=1","message":"Who's ready?","name":"Timeline Photos","socialInfo":{"imageUrl":"http:\/\/photos-h.ak.fbcdn.net\/hphotos-ak-ash3\/601519_10151568736213760_1540729526_s.png","shortDesc":"Who's ready?","socialId":"Facebook:104522723023153_174460419371867","title":"16 games. 4 channels. 12 hours. Welcome to the Madness!\u000a\u000aGet ready: http:\/\/bit.ly\/ZNsQSw","url":"http:\/\/www.facebook.com\/photo.php?fbid=10151568736213760&set=a.177021543759.153351.176134773759&type=1"},"time":1363876216,"type":"photo"},{"caption":"instagram.com","description":"thedrdenim's photo on Instagram","from":{"id":"104522723023153","name":"DrDenim.com","category":"Clothing"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"104522723023153_477202662345806","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBbSNdZ-fR3-tyR&w=154&h=154&url=http%3A%2F%2Fdistilleryimage7.instagram.com%2Fbae0e5ce8db111e2b4f022000a1f9ac6_7.jpg","link":"http:\/\/instagram.com\/p\/W5GOGsG0o_\/","message":"Denim guide printed right on your tshirt courtesy of Nudie Jeans ","name":"http:\/\/instagram.com\/p\/W5GOGsG0o_\/","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBbSNdZ-fR3-tyR&w=154&h=154&url=http%3A%2F%2Fdistilleryimage7.instagram.com%2Fbae0e5ce8db111e2b4f022000a1f9ac6_7.jpg","shortDesc":"Denim guide printed right on your tshirt courtesy of Nudie Jeans ","socialId":"Facebook:104522723023153_477202662345806","title":"instagram.com","url":"http:\/\/instagram.com\/p\/W5GOGsG0o_\/"},"time":1363620325,"type":"link"},{"from":{"id":"104522723023153","name":"DrDenim.com","category":"Clothing"},"id":"104522723023153_221179298024161","likes":3,"message":"How was your weekend?","socialInfo":{"imageUrl":null,"shortDesc":"How was your weekend?","socialId":"Facebook:104522723023153_221179298024161","title":null,"url":null},"time":1363012783,"type":"status"},{"caption":"instagram.com","description":"thedrdenim's photo on Instagram","from":{"id":"104522723023153","name":"DrDenim.com","category":"Clothing"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"104522723023153_436503393090634","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQCFDo6aGtA4ZBno&w=154&h=154&url=http%3A%2F%2Fdistilleryimage8.instagram.com%2F9aebba5886a611e2a74822000a9e2993_7.jpg","link":"http:\/\/instagram.com\/p\/WiBGbpG0pA\/","message":"Get your hands on some new True Religion. Online at http:\/\/www.drdenim.com\/true-religion\/","name":"http:\/\/instagram.com\/p\/WiBGbpG0pA\/","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQCFDo6aGtA4ZBno&w=154&h=154&url=http%3A%2F%2Fdistilleryimage8.instagram.com%2F9aebba5886a611e2a74822000a9e2993_7.jpg","shortDesc":"Get your hands on some new True Religion. Online at http:\/\/www.drdenim.com\/true-religion\/","socialId":"Facebook:104522723023153_436503393090634","title":"instagram.com","url":"http:\/\/instagram.com\/p\/WiBGbpG0pA\/"},"time":1362782975,"type":"link"},{"from":{"id":"104522723023153","name":"DrDenim.com","category":"Clothing"},"id":"104522723023153_218592848282806","socialInfo":{"imageUrl":null,"shortDesc":null,"socialId":"Facebook:104522723023153_218592848282806","title":null,"url":null},"time":1362524708,"type":"status"},{"caption":"www.mandatory.com","description":"As we inch our way out of the freezing months of indoor insanity, we move into the first decently eventful month of the year, the madness that is March. If you have any qualms with getting out and having some fun, you may want to sit the month out, as this one has massive potential for everyone to s...","from":{"id":"104522723023153","name":"DrDenim.com","category":"Clothing"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"104522723023153_217366911738523","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQDklv4hZJJCc5gP&w=154&h=154&url=http%3A%2F%2Fo.aolcdn.com%2Fdims-global%2Fdims3%2FGLOB%2Fresize%2F76x90%2Fhttp%3A%2F%2Fwww.blogcdn.com%2Fwww.mandatory.com%2Fmedia%2F2013%2F03%2Fgoof-off-day.jpg","link":"http:\/\/www.mandatory.com\/2013\/03\/04\/the-10-best-things-about-march\/1","message":"Happy March. Check out this list of things to love this month.","name":"THE 10 BEST THINGS ABOUT MARCH","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQDklv4hZJJCc5gP&w=154&h=154&url=http%3A%2F%2Fo.aolcdn.com%2Fdims-global%2Fdims3%2FGLOB%2Fresize%2F76x90%2Fhttp%3A%2F%2Fwww.blogcdn.com%2Fwww.mandatory.com%2Fmedia%2F2013%2F03%2Fgoof-off-day.jpg","shortDesc":"Happy March. Check out this list of things to love this month.","socialId":"Facebook:104522723023153_217366911738523","title":"www.mandatory.com","url":"http:\/\/www.mandatory.com\/2013\/03\/04\/the-10-best-things-about-march\/1"},"time":1362439853,"type":"link"},{"caption":"instagram.com","description":"thedrdenim's photo on Instagram","from":{"id":"104522723023153","name":"DrDenim.com","category":"Clothing"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"104522723023153_146216572210402","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBeoZWMZ52OHmQM&w=154&h=154&url=http%3A%2F%2Fdistilleryimage4.instagram.com%2F4dcc76087ee111e290d222000a9e0851_7.jpg","likes":1,"link":"http:\/\/instagram.com\/p\/WIjdwQm0sA\/","message":"NBD, just Donovan McNabb stopping by to say hey. \u000a\u000aFollow us on instagram for more amazing shots. http:\/\/instagram.com\/thedrdenim\/","name":"http:\/\/instagram.com\/p\/WIjdwQm0sA\/","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQBeoZWMZ52OHmQM&w=154&h=154&url=http%3A%2F%2Fdistilleryimage4.instagram.com%2F4dcc76087ee111e290d222000a9e0851_7.jpg","shortDesc":"NBD, just Donovan McNabb stopping by to say hey. \u000a\u000aFollow us on instagram for more amazing shots. http:\/\/instagram.com\/thedrdenim\/","socialId":"Facebook:104522723023153_146216572210402","title":"instagram.com","url":"http:\/\/instagram.com\/p\/WIjdwQm0sA\/"},"time":1362164837,"type":"link"},{"caption":"Looking for a new couch? We've got you covered. Looking for the best of today's Internet? We've got you covered there, too, with a new Top Shelf: http:\/\/www.mandatory.com\/2013\/02\/21\/top-shelf-february-21-2013","from":{"id":"104522723023153","name":"DrDenim.com","category":"Clothing"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"104522723023153_162673163885703","image":"http:\/\/photos-g.ak.fbcdn.net\/hphotos-ak-frc1\/574453_342041655900139_942761367_s.jpg","likes":1,"link":"http:\/\/www.facebook.com\/photo.php?fbid=342041655900139&set=a.251564004947905.47255.205523986218574&type=1","message":"We'll just stick with jeans.","name":"Timeline Photos","socialInfo":{"imageUrl":"http:\/\/photos-g.ak.fbcdn.net\/hphotos-ak-frc1\/574453_342041655900139_942761367_s.jpg","shortDesc":"We'll just stick with jeans.","socialId":"Facebook:104522723023153_162673163885703","title":"Looking for a new couch? We've got you covered. Looking for the best of today's Internet? We've got you covered there, too, with a new Top Shelf: http:\/\/www.mandatory.com\/2013\/02\/21\/top-shelf-february-21-2013","url":"http:\/\/www.facebook.com\/photo.php?fbid=342041655900139&set=a.251564004947905.47255.205523986218574&type=1"},"time":1361834091,"type":"photo"},{"from":{"id":"104522723023153","name":"DrDenim.com","category":"Clothing"},"id":"104522723023153_214738545334903","socialInfo":{"imageUrl":null,"shortDesc":null,"socialId":"Facebook:104522723023153_214738545334903","title":null,"url":null},"time":1361833992,"type":"status"},{"caption":"www.drdenim.com","description":"Diesel DZ1516 Watch - Black","from":{"id":"104522723023153","name":"DrDenim.com","category":"Clothing"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/r\/aS8ecmYRys0.gif","id":"104522723023153_427297850692539","image":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQCG47IIjLmr6KsI&w=154&h=154&url=http%3A%2F%2Fwww.drdenim.com%2Fimages%2FP%2FDZ1516_BLK_1.jpg","likes":4,"link":"http:\/\/www.drdenim.com\/diesel-dz1516-watch-black.html","message":"It's time.","name":"Diesel DZ1516 Watch - Black","socialInfo":{"imageUrl":"http:\/\/external.ak.fbcdn.net\/safe_image.php?d=AQCG47IIjLmr6KsI&w=154&h=154&url=http%3A%2F%2Fwww.drdenim.com%2Fimages%2FP%2FDZ1516_BLK_1.jpg","shortDesc":"It's time.","socialId":"Facebook:104522723023153_427297850692539","title":"www.drdenim.com","url":"http:\/\/www.drdenim.com\/diesel-dz1516-watch-black.html"},"time":1361466836,"type":"link"},{"from":{"id":"104522723023153","name":"DrDenim.com","category":"Clothing"},"id":"104522723023153_212419952233429","likes":5,"message":"Salomon Sneakers","socialInfo":{"imageUrl":null,"shortDesc":"Salomon Sneakers","socialId":"Facebook:104522723023153_212419952233429","title":null,"url":null},"time":1361337607,"type":"status"},{"from":{"id":"104522723023153","name":"DrDenim.com","category":"Clothing"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yz\/r\/StEh3RhPvjk.gif","id":"104522723023153_212419908900100","image":"http:\/\/photos-b.xx.fbcdn.net\/hphotos-prn1\/155264_212419898900101_1580410871_s.jpg","likes":3,"link":"http:\/\/www.facebook.com\/photo.php?fbid=212419898900101&set=a.127035207438571.26718.104522723023153&type=1&relevant_count=1","socialInfo":{"imageUrl":"http:\/\/photos-b.xx.fbcdn.net\/hphotos-prn1\/155264_212419898900101_1580410871_s.jpg","shortDesc":null,"socialId":"Facebook:104522723023153_212419908900100","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=212419898900101&set=a.127035207438571.26718.104522723023153&type=1&relevant_count=1"},"time":1361337586,"type":"photo"},{"from":{"id":"104522723023153","name":"DrDenim.com","category":"Clothing"},"icon":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yz\/r\/StEh3RhPvjk.gif","id":"104522723023153_212419802233444","image":"http:\/\/photos-b.xx.fbcdn.net\/hphotos-prn1\/17011_212419782233446_870837464_s.jpg","likes":3,"link":"http:\/\/www.facebook.com\/photo.php?fbid=212419782233446&set=a.127035207438571.26718.104522723023153&type=1&relevant_count=1","socialInfo":{"imageUrl":"http:\/\/photos-b.xx.fbcdn.net\/hphotos-prn1\/17011_212419782233446_870837464_s.jpg","shortDesc":null,"socialId":"Facebook:104522723023153_212419802233444","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=212419782233446&set=a.127035207438571.26718.104522723023153&type=1&relevant_count=1"},"time":1361337558,"type":"photo"}],"id":"104522723023153","likes":2805,"name":"DrDenim.com","picture":null},"maxAge":900,"serviceUrl":"http:\/\/cms.mobile.conduit-services.com\/facebook\/data\/drdenimdotcom\/25\/0\/?params={}"},{"data":{"icon":"http:\/\/a0.twimg.com\/profile_images\/981375850\/drdenim_logo_chic_normal.jpg","paging":{"next":"http:\/\/cms.mobile.conduit-services.com\/twitter\/user\/@thedrdenim\/25\/25\/?params=%7b%22MaxId%22%3a%22318817661981188095%22%2c%22includeEntities%22%3afalse%2c%22isOpenSearch%22%3afalse%2c%22listName%22%3anull%7d","nextUrl":"http:\/\/cms.mobile.conduit-services.com\/twitter\/user\/@thedrdenim\/25\/25\/?params=%7b%22MaxId%22%3a%22318817661981188095%22%2c%22includeEntities%22%3afalse%2c%22isOpenSearch%22%3afalse%2c%22listName%22%3anull%7d"},"statuses":[{"description":"Did everyone know April is [trend=grilledcheese]#grilledcheese[\/trend] month according to [twit=Esquiremag]@Esquiremag[\/twit]? Don't eat too much or you'll have to upsize in our jeans!","entities":null,"id":325000895773429762,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"Did everyone know April is #grilledcheese month according to @Esquiremag? Don't eat too much or you'll have to upsize in our jeans!","socialId":"Twitter:325000895773429762","title":"Did everyone know April is #grilledcheese month according to @Esquiremag? Don't eat too much or you'll have to upsize in our jeans!","url":null},"source":"<a href=\"http:\/\/twitter.com\/download\/iphone\" rel=\"nofollow\">Twitter for iPhone<\/a>","time":1366321226},{"description":"Check out the sleeves on our [trend=HudsonOuterwear]#HudsonOuterwear[\/trend] Tees [url]http:\/\/t.co\/d8Fva8IwlV[\/url]","entities":null,"id":324972246374440960,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"Check out the sleeves on our #HudsonOuterwear Tees http:\/\/t.co\/d8Fva8IwlV","socialId":"Twitter:324972246374440960","title":"Check out the sleeves on our #HudsonOuterwear Tees http:\/\/t.co\/d8Fva8IwlV","url":null},"source":"<a href=\"http:\/\/instagram.com\" rel=\"nofollow\">Instagram<\/a>","time":1366314395},{"description":"Here's what the front of the [trend=RobinsJeans]#RobinsJeans[\/trend] looks like [url]http:\/\/t.co\/qLUcWLAa6x[\/url]","entities":null,"id":324903435768057856,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"Here's what the front of the #RobinsJeans looks like http:\/\/t.co\/qLUcWLAa6x","socialId":"Twitter:324903435768057856","title":"Here's what the front of the #RobinsJeans looks like http:\/\/t.co\/qLUcWLAa6x","url":null},"source":"<a href=\"http:\/\/instagram.com\" rel=\"nofollow\">Instagram<\/a>","time":1366297990},{"description":"Beautiful weather out, did you know [trend=drdenim]#drdenim[\/trend] on [trend=southstreet]#southstreet[\/trend] closes at 10? Get your [trend=shop]#shop[\/trend] on!","entities":null,"id":324679136058671104,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"Beautiful weather out, did you know #drdenim on #southstreet closes at 10? Get your #shop on!","socialId":"Twitter:324679136058671104","title":"Beautiful weather out, did you know #drdenim on #southstreet closes at 10? Get your #shop on!","url":null},"source":"<a href=\"http:\/\/twitter.com\/download\/iphone\" rel=\"nofollow\">Twitter for iPhone<\/a>","time":1366244512},{"description":"Original Paperbacks shorts [url]http:\/\/t.co\/cghK2EyAIv[\/url]","entities":null,"id":324598627383267331,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"Original Paperbacks shorts http:\/\/t.co\/cghK2EyAIv","socialId":"Twitter:324598627383267331","title":"Original Paperbacks shorts http:\/\/t.co\/cghK2EyAIv","url":null},"source":"<a href=\"http:\/\/instagram.com\" rel=\"nofollow\">Instagram<\/a>","time":1366225318},{"description":"bench tees, what do ya think? [trend=tshirt]#tshirt[\/trend] [trend=art]#art[\/trend] [trend=benchusa]#benchusa[\/trend] [trend=streetstyle]#streetstyle[\/trend] [trend=streetwear]#streetwear[\/trend] [url]http:\/\/t.co\/veVEOyLFYd[\/url]","entities":null,"id":324538038325768193,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"bench tees, what do ya think? #tshirt #art #benchusa #streetstyle #streetwear http:\/\/t.co\/veVEOyLFYd","socialId":"Twitter:324538038325768193","title":"bench tees, what do ya think? #tshirt #art #benchusa #streetstyle #streetwear http:\/\/t.co\/veVEOyLFYd","url":null},"source":"<a href=\"http:\/\/instagram.com\" rel=\"nofollow\">Instagram<\/a>","time":1366210872},{"description":"[trend=WrightandDitson]#WrightandDitson[\/trend] Henleys [url]http:\/\/t.co\/RBcP5q9Tq1[\/url]","entities":null,"id":324267298959540224,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"#WrightandDitson Henleys http:\/\/t.co\/RBcP5q9Tq1","socialId":"Twitter:324267298959540224","title":"#WrightandDitson Henleys http:\/\/t.co\/RBcP5q9Tq1","url":null},"source":"<a href=\"http:\/\/instagram.com\" rel=\"nofollow\">Instagram<\/a>","time":1366146323},{"description":"[trend=animalprint]#animalprint[\/trend] [trend=springtrend]#springtrend[\/trend] [trend=fresh]#fresh[\/trend] [trend=swag]#swag[\/trend] grab em now at Dr. Denim [url]http:\/\/t.co\/oz1ODK9tf7[\/url]","entities":null,"id":324233876169953282,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"#animalprint #springtrend #fresh #swag grab em now at Dr. Denim http:\/\/t.co\/oz1ODK9tf7","socialId":"Twitter:324233876169953282","title":"#animalprint #springtrend #fresh #swag grab em now at Dr. Denim http:\/\/t.co\/oz1ODK9tf7","url":null},"source":"<a href=\"http:\/\/instagram.com\" rel=\"nofollow\">Instagram<\/a>","time":1366138354},{"description":".[twit=thedrdenim]@thedrdenim[\/twit] supports [twit=DannySwift]@DannySwift[\/twit] and Team Garcia! [trend=phillypride]#phillypride[\/trend]","entities":null,"id":324192421321785344,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":1,"socialInfo":{"imageUrl":null,"shortDesc":".@thedrdenim supports @DannySwift and Team Garcia! #phillypride","socialId":"Twitter:324192421321785344","title":".@thedrdenim supports @DannySwift and Team Garcia! #phillypride","url":null},"source":"<a href=\"http:\/\/www.tweetdeck.com\" rel=\"nofollow\">TweetDeck<\/a>","time":1366128471},{"description":"[twit=kylemccutcheon4]@kylemccutcheon4[\/twit] agreed! But we sell online via [url]http:\/\/t.co\/8J8k4c0t8N[\/url] so check it out!","entities":null,"id":324183503166119938,"inReplyToScreenName":"kylemccutcheon4","inReplyToStatusId":"323244438593863680","inReplyToUserId":"579834557","retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"@kylemccutcheon4 agreed! But we sell online via http:\/\/t.co\/8J8k4c0t8N so check it out!","socialId":"Twitter:324183503166119938","title":"@kylemccutcheon4 agreed! But we sell online via http:\/\/t.co\/8J8k4c0t8N so check it out!","url":null},"source":"<a href=\"http:\/\/twitter.com\/download\/iphone\" rel=\"nofollow\">Twitter for iPhone<\/a>","time":1366126344},{"description":"Animal prints [url]http:\/\/t.co\/oz1ODK9tf7[\/url]","entities":null,"id":324181447969763329,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"Animal prints http:\/\/t.co\/oz1ODK9tf7","socialId":"Twitter:324181447969763329","title":"Animal prints http:\/\/t.co\/oz1ODK9tf7","url":null},"source":"<a href=\"http:\/\/instagram.com\" rel=\"nofollow\">Instagram<\/a>","time":1366125854},{"description":"Another great sale online - 20% off through 5\/5 go shop now [url]http:\/\/t.co\/h1cvIRYYl0[\/url]","entities":null,"id":323844062497091584,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"Another great sale online - 20% off through 5\/5 go shop now http:\/\/t.co\/h1cvIRYYl0","socialId":"Twitter:323844062497091584","title":"Another great sale online - 20% off through 5\/5 go shop now http:\/\/t.co\/h1cvIRYYl0","url":null},"source":"<a href=\"http:\/\/sendible.com\" rel=\"nofollow\">Sendible<\/a>","time":1366045415},{"description":"Philly's own [twit=dannyswift]@dannyswift[\/twit] showing us some love. Thanks for stopping by champ! [url]http:\/\/t.co\/gCg7o7Wclv[\/url]","entities":null,"id":323250170378719233,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":1,"socialInfo":{"imageUrl":null,"shortDesc":"Philly's own @dannyswift showing us some love. Thanks for stopping by champ! http:\/\/t.co\/gCg7o7Wclv","socialId":"Twitter:323250170378719233","title":"Philly's own @dannyswift showing us some love. Thanks for stopping by champ! http:\/\/t.co\/gCg7o7Wclv","url":null},"source":"<a href=\"http:\/\/instagram.com\" rel=\"nofollow\">Instagram<\/a>","time":1365903820},{"description":"[twit=DannySwift]@DannySwift[\/twit] anytime brother! Proud of your hard work and what you're doing for our city man!","entities":null,"id":322860430231998465,"inReplyToScreenName":"DannySwift","inReplyToStatusId":"322844117010890752","inReplyToUserId":"38100527","retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"@DannySwift anytime brother! Proud of your hard work and what you're doing for our city man!","socialId":"Twitter:322860430231998465","title":"@DannySwift anytime brother! Proud of your hard work and what you're doing for our city man!","url":null},"source":"<a href=\"http:\/\/twitter.com\/download\/iphone\" rel=\"nofollow\">Twitter for iPhone<\/a>","time":1365810899},{"description":"Agreed. RT [twit=FashionAndStyle]@FashionAndStyle[\/twit]: When in doubt, reach for your trustiest pair of jeans – and, of course, a pair of fabulous shoes. [trend=denim]#denim[\/trend]","entities":null,"id":322483758932578304,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"Agreed. RT @FashionAndStyle: When in doubt, reach for your trustiest pair of jeans – and, of course, a pair of fabulous shoes. #denim","socialId":"Twitter:322483758932578304","title":"Agreed. RT @FashionAndStyle: When in doubt, reach for your trustiest pair of jeans – and, of course, a pair of fabulous shoes. #denim","url":null},"source":"<a href=\"http:\/\/www.tweetdeck.com\" rel=\"nofollow\">TweetDeck<\/a>","time":1365721094},{"description":"The future's so bright, I gotta wear shades: [url]http:\/\/t.co\/GVSt5l8FPn[\/url] [url]http:\/\/t.co\/2RDDSijxFU[\/url]","entities":null,"id":320284640252407809,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"The future's so bright, I gotta wear shades: http:\/\/t.co\/GVSt5l8FPn http:\/\/t.co\/2RDDSijxFU","socialId":"Twitter:320284640252407809","title":"The future's so bright, I gotta wear shades: http:\/\/t.co\/GVSt5l8FPn http:\/\/t.co\/2RDDSijxFU","url":null},"source":"<a href=\"http:\/\/sendible.com\" rel=\"nofollow\">Sendible<\/a>","time":1365196783},{"description":"RT [twit=DannySwift]@DannySwift[\/twit]: S\/O [twit=puma]@puma[\/twit] and [twit=thedrdenim]@thedrdenim[\/twit] for supporting Team Garcia","entities":null,"id":319898634323890176,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"RT @DannySwift: S\/O @puma and @thedrdenim for supporting Team Garcia","socialId":"Twitter:319898634323890176","title":"RT @DannySwift: S\/O @puma and @thedrdenim for supporting Team Garcia","url":null},"source":"<a href=\"http:\/\/www.tweetdeck.com\" rel=\"nofollow\">TweetDeck<\/a>","time":1365104752},{"description":"Happy Opening Day. Need some new baseball threads? [url]http:\/\/t.co\/f60sDLWxQ8[\/url]","entities":null,"id":318817661981188096,"inReplyToScreenName":null,"inReplyToStatusId":null,"inReplyToUserId":null,"retweetedCount":0,"socialInfo":{"imageUrl":null,"shortDesc":"Happy Opening Day. Need some new baseball threads? http:\/\/t.co\/f60sDLWxQ8","socialId":"Twitter:318817661981188096","title":"Happy Opening Day. Need some new baseball threads? http:\/\/t.co\/f60sDLWxQ8","url":null},"source":"<a href=\"http:\/\/sendible.com\" rel=\"nofollow\">Sendible<\/a>","time":1364847028}],"totalFollowers":468,"totalStatuses":494,"user":"Dr. Denim"},"maxAge":1200,"serviceUrl":"http:\/\/cms.mobile.conduit-services.com\/twitter\/user\/%40thedrdenim\/25\/0\/?params=%7B%7D"},{"data":{"albumName":"Cover Photos","coverPhotoUrl":null,"description":null,"opeanSearch":null,"paging":null,"photos":[{"description":null,"id":"206896482785776","largeImage":"http:\/\/sphotos-b.xx.fbcdn.net\/hphotos-frc1\/842922_206896482785776_963699609_o.jpg","mediumImage":"http:\/\/sphotos-b.xx.fbcdn.net\/hphotos-prn1\/s600x600\/65759_206896482785776_963699609_n.jpg","photoTime":1360370965,"smallImage":"http:\/\/photos-d.ak.fbcdn.net\/hphotos-ak-prn1\/65759_206896482785776_963699609_s.jpg","socialInfo":{"imageUrl":"http:\/\/photos-d.ak.fbcdn.net\/hphotos-ak-prn1\/65759_206896482785776_963699609_s.jpg","shortDesc":null,"socialId":"Facebook206896482785776","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=206896482785776&set=a.113601378781954.18570.104522723023153&type=1"},"title":null},{"description":null,"id":"204938386314919","largeImage":"http:\/\/sphotos-b.xx.fbcdn.net\/hphotos-frc1\/793730_204938386314919_1190419302_o.jpg","mediumImage":"http:\/\/sphotos-b.xx.fbcdn.net\/hphotos-ash3\/s600x600\/557665_204938386314919_1190419302_n.jpg","photoTime":1360025494,"smallImage":"http:\/\/photos-b.ak.fbcdn.net\/hphotos-ak-ash3\/557665_204938386314919_1190419302_s.jpg","socialInfo":{"imageUrl":"http:\/\/photos-b.ak.fbcdn.net\/hphotos-ak-ash3\/557665_204938386314919_1190419302_s.jpg","shortDesc":null,"socialId":"Facebook204938386314919","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=204938386314919&set=a.113601378781954.18570.104522723023153&type=1"},"title":null},{"description":null,"id":"185361494939275","largeImage":"http:\/\/sphotos-b.xx.fbcdn.net\/hphotos-prn1\/s2048x2048\/47703_185361494939275_1472492747_n.jpg","mediumImage":"http:\/\/sphotos-b.xx.fbcdn.net\/hphotos-prn1\/s600x600\/47703_185361494939275_1472492747_n.jpg","photoTime":1356993039,"smallImage":"http:\/\/photos-h.ak.fbcdn.net\/hphotos-ak-prn1\/47703_185361494939275_1472492747_s.jpg","socialInfo":{"imageUrl":"http:\/\/photos-h.ak.fbcdn.net\/hphotos-ak-prn1\/47703_185361494939275_1472492747_s.jpg","shortDesc":"New Year, new great product. Get over to www.drdenim.com and take a look.","socialId":"Facebook185361494939275","title":"New Year, new great product. Get over to www.drdenim.com and take a look.","url":"http:\/\/www.facebook.com\/photo.php?fbid=185361494939275&set=a.113601378781954.18570.104522723023153&type=1"},"title":"New Year, new great product. Get over to www.drdenim.com and take a look."},{"description":null,"id":"176801675795257","largeImage":"http:\/\/sphotos-a.xx.fbcdn.net\/hphotos-prn1\/s2048x2048\/16099_176801675795257_1525019133_n.jpg","mediumImage":"http:\/\/sphotos-a.xx.fbcdn.net\/hphotos-prn1\/s600x600\/16099_176801675795257_1525019133_n.jpg","photoTime":1355160399,"smallImage":"http:\/\/photos-a.ak.fbcdn.net\/hphotos-ak-prn1\/16099_176801675795257_1525019133_s.jpg","socialInfo":{"imageUrl":"http:\/\/photos-a.ak.fbcdn.net\/hphotos-ak-prn1\/16099_176801675795257_1525019133_s.jpg","shortDesc":"Levi's Denim Holiday Markdowns\u000ahttp:\/\/bit.ly\/UssqMz","socialId":"Facebook176801675795257","title":"Levi's Denim Holiday Markdowns\u000ahttp:\/\/bit.ly\/UssqMz","url":"http:\/\/www.facebook.com\/photo.php?fbid=176801675795257&set=a.113601378781954.18570.104522723023153&type=1"},"title":"Levi's Denim Holiday Markdowns\u000ahttp:\/\/bit.ly\/UssqMz"},{"description":null,"id":"175369582605133","largeImage":"http:\/\/sphotos-a.xx.fbcdn.net\/hphotos-frc1\/s2048x2048\/432328_175369582605133_836379871_n.jpg","mediumImage":"http:\/\/sphotos-a.xx.fbcdn.net\/hphotos-frc1\/s600x600\/432328_175369582605133_836379871_n.jpg","photoTime":1354832066,"smallImage":"http:\/\/photos-a.ak.fbcdn.net\/hphotos-ak-frc1\/432328_175369582605133_836379871_s.jpg","socialInfo":{"imageUrl":"http:\/\/photos-a.ak.fbcdn.net\/hphotos-ak-frc1\/432328_175369582605133_836379871_s.jpg","shortDesc":null,"socialId":"Facebook175369582605133","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=175369582605133&set=a.113601378781954.18570.104522723023153&type=1"},"title":null},{"description":null,"id":"175332345942190","largeImage":"http:\/\/sphotos-a.xx.fbcdn.net\/hphotos-ash3\/s2048x2048\/559852_175332345942190_260885073_n.jpg","mediumImage":"http:\/\/sphotos-a.xx.fbcdn.net\/hphotos-ash3\/s600x600\/559852_175332345942190_260885073_n.jpg","photoTime":1354823307,"smallImage":"http:\/\/photos-a.xx.fbcdn.net\/hphotos-ash3\/559852_175332345942190_260885073_s.jpg","socialInfo":{"imageUrl":"http:\/\/photos-a.xx.fbcdn.net\/hphotos-ash3\/559852_175332345942190_260885073_s.jpg","shortDesc":null,"socialId":"Facebook175332345942190","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=175332345942190&set=a.113601378781954.18570.104522723023153&type=1"},"title":null},{"description":null,"id":"173224769486281","largeImage":"http:\/\/sphotos-b.xx.fbcdn.net\/hphotos-prn1\/s2048x2048\/432222_173224769486281_1856324958_n.jpg","mediumImage":"http:\/\/sphotos-b.xx.fbcdn.net\/hphotos-prn1\/s600x600\/432222_173224769486281_1856324958_n.jpg","photoTime":1354309261,"smallImage":"http:\/\/photos-h.ak.fbcdn.net\/hphotos-ak-prn1\/432222_173224769486281_1856324958_s.jpg","socialInfo":{"imageUrl":"http:\/\/photos-h.ak.fbcdn.net\/hphotos-ak-prn1\/432222_173224769486281_1856324958_s.jpg","shortDesc":null,"socialId":"Facebook173224769486281","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=173224769486281&set=a.113601378781954.18570.104522723023153&type=1"},"title":null},{"description":null,"id":"168215723320519","largeImage":"http:\/\/sphotos-b.xx.fbcdn.net\/hphotos-ash3\/s2048x2048\/63317_168215723320519_489498233_n.jpg","mediumImage":"http:\/\/sphotos-b.xx.fbcdn.net\/hphotos-ash3\/s600x600\/63317_168215723320519_489498233_n.jpg","photoTime":1353082343,"smallImage":"http:\/\/photos-d.ak.fbcdn.net\/hphotos-ak-ash3\/63317_168215723320519_489498233_s.jpg","socialInfo":{"imageUrl":"http:\/\/photos-d.ak.fbcdn.net\/hphotos-ak-ash3\/63317_168215723320519_489498233_s.jpg","shortDesc":null,"socialId":"Facebook168215723320519","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=168215723320519&set=a.113601378781954.18570.104522723023153&type=1"},"title":null},{"description":null,"id":"165150740293684","largeImage":"http:\/\/sphotos-b.xx.fbcdn.net\/hphotos-ash3\/s2048x2048\/542723_165150740293684_366977021_n.png","mediumImage":"http:\/\/sphotos-b.xx.fbcdn.net\/hphotos-ash3\/s600x600\/542723_165150740293684_366977021_n.png","photoTime":1352311974,"smallImage":"http:\/\/photos-h.ak.fbcdn.net\/hphotos-ak-ash3\/542723_165150740293684_366977021_s.png","socialInfo":{"imageUrl":"http:\/\/photos-h.ak.fbcdn.net\/hphotos-ak-ash3\/542723_165150740293684_366977021_s.png","shortDesc":null,"socialId":"Facebook165150740293684","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=165150740293684&set=a.113601378781954.18570.104522723023153&type=1"},"title":null},{"description":null,"id":"162293613912730","largeImage":"http:\/\/sphotos-a.xx.fbcdn.net\/hphotos-frc1\/s2048x2048\/317271_162293613912730_628672034_n.jpg","mediumImage":"http:\/\/sphotos-a.xx.fbcdn.net\/hphotos-frc1\/s600x600\/317271_162293613912730_628672034_n.jpg","photoTime":1351635184,"smallImage":"http:\/\/photos-c.ak.fbcdn.net\/hphotos-ak-frc1\/317271_162293613912730_628672034_s.jpg","socialInfo":{"imageUrl":"http:\/\/photos-c.ak.fbcdn.net\/hphotos-ak-frc1\/317271_162293613912730_628672034_s.jpg","shortDesc":null,"socialId":"Facebook162293613912730","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=162293613912730&set=a.113601378781954.18570.104522723023153&type=1"},"title":null},{"description":null,"id":"160782147397210","largeImage":"http:\/\/sphotos-a.xx.fbcdn.net\/hphotos-prn1\/s2048x2048\/525543_160782147397210_2138927485_n.jpg","mediumImage":"http:\/\/sphotos-a.xx.fbcdn.net\/hphotos-prn1\/s600x600\/525543_160782147397210_2138927485_n.jpg","photoTime":1351295275,"smallImage":"http:\/\/photos-a.xx.fbcdn.net\/hphotos-prn1\/525543_160782147397210_2138927485_s.jpg","socialInfo":{"imageUrl":"http:\/\/photos-a.xx.fbcdn.net\/hphotos-prn1\/525543_160782147397210_2138927485_s.jpg","shortDesc":null,"socialId":"Facebook160782147397210","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=160782147397210&set=a.113601378781954.18570.104522723023153&type=1"},"title":null},{"description":null,"id":"155386471270111","largeImage":"http:\/\/sphotos-a.xx.fbcdn.net\/hphotos-ash3\/s2048x2048\/548789_155386471270111_163837300_n.jpg","mediumImage":"http:\/\/sphotos-a.xx.fbcdn.net\/hphotos-ash3\/s600x600\/548789_155386471270111_163837300_n.jpg","photoTime":1349969720,"smallImage":"http:\/\/photos-c.ak.fbcdn.net\/hphotos-ak-ash3\/548789_155386471270111_163837300_s.jpg","socialInfo":{"imageUrl":"http:\/\/photos-c.ak.fbcdn.net\/hphotos-ak-ash3\/548789_155386471270111_163837300_s.jpg","shortDesc":null,"socialId":"Facebook155386471270111","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=155386471270111&set=a.113601378781954.18570.104522723023153&type=1"},"title":null},{"description":null,"id":"151163705025721","largeImage":"http:\/\/sphotos-a.xx.fbcdn.net\/hphotos-prn1\/s2048x2048\/66183_151163705025721_253658084_n.jpg","mediumImage":"http:\/\/sphotos-a.xx.fbcdn.net\/hphotos-prn1\/s600x600\/66183_151163705025721_253658084_n.jpg","photoTime":1348917762,"smallImage":"http:\/\/photos-g.ak.fbcdn.net\/hphotos-ak-prn1\/66183_151163705025721_253658084_s.jpg","socialInfo":{"imageUrl":"http:\/\/photos-g.ak.fbcdn.net\/hphotos-ak-prn1\/66183_151163705025721_253658084_s.jpg","shortDesc":null,"socialId":"Facebook151163705025721","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=151163705025721&set=a.113601378781954.18570.104522723023153&type=1"},"title":null},{"description":null,"id":"127042700771155","largeImage":"http:\/\/sphotos-a.xx.fbcdn.net\/hphotos-ash4\/s2048x2048\/480303_127042700771155_661029950_n.jpg","mediumImage":"http:\/\/sphotos-a.xx.fbcdn.net\/hphotos-ash4\/s600x600\/480303_127042700771155_661029950_n.jpg","photoTime":1342811081,"smallImage":"http:\/\/photos-e.ak.fbcdn.net\/hphotos-ak-ash4\/480303_127042700771155_661029950_s.jpg","socialInfo":{"imageUrl":"http:\/\/photos-e.ak.fbcdn.net\/hphotos-ak-ash4\/480303_127042700771155_661029950_s.jpg","shortDesc":null,"socialId":"Facebook127042700771155","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=127042700771155&set=a.113601378781954.18570.104522723023153&type=1"},"title":null},{"description":null,"id":"127042304104528","largeImage":"http:\/\/sphotos-a.xx.fbcdn.net\/hphotos-ash4\/s2048x2048\/314733_127042304104528_1078125566_n.jpg","mediumImage":"http:\/\/sphotos-a.xx.fbcdn.net\/hphotos-ash4\/s600x600\/314733_127042304104528_1078125566_n.jpg","photoTime":1342810980,"smallImage":"http:\/\/photos-a.ak.fbcdn.net\/hphotos-ak-ash4\/314733_127042304104528_1078125566_s.jpg","socialInfo":{"imageUrl":"http:\/\/photos-a.ak.fbcdn.net\/hphotos-ak-ash4\/314733_127042304104528_1078125566_s.jpg","shortDesc":null,"socialId":"Facebook127042304104528","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=127042304104528&set=a.113601378781954.18570.104522723023153&type=1"},"title":null},{"description":null,"id":"113601385448620","largeImage":"http:\/\/sphotos-a.xx.fbcdn.net\/hphotos-ash3\/s2048x2048\/598908_113601385448620_1936696856_n.jpg","mediumImage":"http:\/\/sphotos-a.xx.fbcdn.net\/hphotos-ash3\/s600x600\/598908_113601385448620_1936696856_n.jpg","photoTime":1340406467,"smallImage":"http:\/\/photos-a.ak.fbcdn.net\/hphotos-ak-ash3\/598908_113601385448620_1936696856_s.jpg","socialInfo":{"imageUrl":"http:\/\/photos-a.ak.fbcdn.net\/hphotos-ak-ash3\/598908_113601385448620_1936696856_s.jpg","shortDesc":null,"socialId":"Facebook113601385448620","title":null,"url":"http:\/\/www.facebook.com\/photo.php?fbid=113601385448620&set=a.113601378781954.18570.104522723023153&type=1"},"title":null}],"totalPhotos":16},"maxAge":1800,"serviceUrl":"http:\/\/cms.mobile.conduit-services.com\/photos\/facebook\/drdenimdotcom\/25\/0\/?params=%7B%22albumId%22%3A%22113601378781954%22%2C%22albumName%22%3A%22Cover%20Photos%22%7D"},{"data":{"author":"denimvision","categories":[],"description":null,"imageUrl":"http:\/\/www.youtube.com\/img\/pic_youtubelogo_123x63.gif","items":[{"author":"denimvision","categories":["Entertainment"],"credits":{"uploader":"denimvision"},"description":"http:\/\/drdenim.com\/\u000a\u000aDr. Denim Television presents an inside look at one of our stores in Downtown Philadelphia, Pennsylvania. Dr. Denim offers a variety of popular urban and premium clothing brands. Additional stores are located in Baltimore, Maryland and Atlanta, Georgia. Shop Polo, Lacoste, LRG, Rock & Republic, Mek Denim True Religion, Puma, Sean John and may more quality brand names.","duration":76,"id":"tag:youtube.com,2008:video:Zr7dDgkxkVg","info":{"likes":{"dislikes":1,"likes":4},"rating":{"avg":4,"total":5},"stats":{"favorite":0,"view":1579}},"largeThumbnail":"http:\/\/i.ytimg.com\/vi\/Zr7dDgkxkVg\/hqdefault.jpg","link":"http:\/\/www.youtube.com\/watch?v=Zr7dDgkxkVg&feature=youtube_gdata#noredirect","mediumThumbnail":"http:\/\/i.ytimg.com\/vi\/Zr7dDgkxkVg\/3.jpg","smallThumbnail":"http:\/\/i.ytimg.com\/vi\/Zr7dDgkxkVg\/default.jpg","socialInfo":{"imageUrl":"http:\/\/i.ytimg.com\/vi\/Zr7dDgkxkVg\/default.jpg","shortDesc":"http:\/\/drdenim.com\/\u000a\u000aDr. Denim Television presents an inside look at one of our stores in Downtown Philadelphia, Pennsylvania. Dr. Denim offers a variety of popular urban and premium clothing brands. Additional stores are located in Baltimore, Maryland and Atlanta, Georgia. Shop Polo, Lacoste, LRG, Rock & Republic, Mek Denim True Religion, Puma, Sean John and may more quality brand names.","socialId":"Videos:tag:youtube.com,2008:video:Zr7dDgkxkVg","title":"Denim TV: Dr. Denim Promo Video","url":"http:\/\/www.youtube.com\/watch?v=Zr7dDgkxkVg&feature=youtube_gdata"},"stream":{"mediaType":2,"type":"application\/x-shockwave-flash","url":"http:\/\/www.youtube.com\/v\/Zr7dDgkxkVg?version=3&f=user_uploads&app=youtube_gdata"},"textItems":[],"time":1276724530,"title":"Denim TV: Dr. Denim Promo Video"}],"paging":null,"title":"Uploads by denimvision","total":1},"maxAge":1800,"serviceUrl":"http:\/\/cms.mobile.conduit-services.com\/media\/video\/2\/15\/0\/?url=http%3A%2F%2Fgdata.youtube.com%2Ffeeds%2Fapi%2Fusers%2Fdenimvision%2Fuploads%2F%3Fv%3D2%26format%3D5%26orderby%3Dpublished&params=%7B%22isOpenSearch%22%3A%22true%22%7D"},{"data":{"isRtl":false,"items":{"HtmlTextFormSendButton":"Submit","ToastMessageFormFieldMandatory":"Field {fieldName} cannot remain empty","HtmlTextEventsRsvpButton":"Join","HtmlTextEventsRsvpAttending":"Attending","HtmlTextEventsRsvpMaybe":"Maybe","HtmlTextEventsRsvpDecline":"Decline","HtmlTextEventsAdd2CalStr":"Calendar","HtmlTextAboutUsItemTitleGenre":"Genre","HtmlTextAboutUsItemTitleFounded":"Founded","HtmlTextAboutUsItemTitleMembers":"Members","HtmlTextAboutUsItemTitleHometown":"Hometown","HtmlTextAboutUsItemTitleSpecialties":"Specialties","HtmlTextAboutUsItemTitleCulinaryTeam":"Culinary Team","HtmlTextAboutUsItemTitleGeneralInfo":"General Info","ButtonCancel":"Cancel","ButtonClose":"Close","ButtonOk":"OK","ButtonRetry":"Retry","DialogButtonLiveAlbumChoosePhotoCancel":"Cancel","DialogButtonLiveAlbumChoosePhotoChoose":"Choose photo","DialogButtonLiveAlbumChoosePhotoTake":"Take photo","DialogButtonLiveAlbumPostPhotoCancel":"cancel","DialogButtonLiveAlbumPostPhotoOk":"post","DialogCaptionAddedToFavorites":"Add to favorites","DialogCaptionEmail":"Email","DialogCaptionError":"Error","DialogCaptionFacebook":"Facebook","DialogCaptionFacebookLogin":"Facebook Login","DialogCaptionFacebookLogout":"Facebook logout","DialogCaptionFacebookRequiresPermissions":"Facebook","DialogCaptionFailGetFeeds":"Network error","DialogCaptionLiveAlbumPostPhoto":"Post photo","DialogCaptionLivePersonChatEnded":"Chat ended","DialogCaptionLivePersonNoAvailability":"Not available","DialogCaptionLivePersonTimeOut":"Time out","DialogCaptionNavigate":"Navigate","DialogCaptionPhotosManagerDeviceNotSupported":"Your device does not support the photo gallery view","DialogCaptionPhotosManagerSimulatorNotSupported":"Photo gallery view is not supported in simulator mode","DialogCaptionPurchaseChooseMethod":"Purchase:","DialogCaptionShare":"Share","DialogCaptionShareControlDialog":"Share on","DialogCaptionSubscribeFail":"Error","DialogCaptionSubscribeSuccess":"Success","DialogCaptionTwitter":"Twitter","DialogCaptionTwitterLogin":"Twitter Login","DialogCaptionTwitterLogout":"Twitter Logout","DialogMessageAlbumAddedToFavorites":"Album's tracks added to favorites","DialogMessageAppCodeInvalid":"App code is invalid","DialogMessageAudioNoFeeds":"Your device doesn't support playing this type of audio files","DialogMessageAudioNotSupportedDevice":"Your device doesn't support HTML5 audio","DialogMessageAudioNotSupportedSimulator":"Your browser (of the simulator) doesn't support audio","DialogMessageAudioNoUrl":"There is no audio-source.","DialogMessageAudioTypeNotSupportedDevice":"Your device doesn't support playing this type of audio file","DialogMessageAudioTypeNotSupportedSimulator":"Your browser (of the simulator) doesn't support playing this type of audio file","DialogMessageEmailAddressInvalid":"E-mail address is invalid","DialogMessageFacebookLogoutFail":"Unable to log out of Facebook at the moment. Please try again later.","DialogMessageFacebookRequiresPermissions":"This action requires permissions","DialogMessageFailConnectTwitter":"Failed to connect to Twitter","DialogMessageFailGetAppDisabled":"Sorry, this app has been temporarily disabled due to a content violation.\\n\\nPlease check back in a few days","DialogMessageFailGetAppExperience":"Failed to load application data. You must connect to a Wi-Fi or cellular data network to access this data.","DialogMessageFailGetAppId":"Please check your application code and try again","DialogMessageFailGetAppNormal":"Failed to load application data. You must connect to a Wi-Fi or cellular data network to access this data.","DialogMessageFailGetFeeds":"Failed to load application data. You must connect to a Wi-Fi or cellular data network to access this data.","DialogMessageFailGetServiceMap":"Failed to initialize network communication","DialogMessageFailGetServiceMapWinPhone":"Failed to initialize network communication. Press OK to retry or Cancel to quit","DialogMessageFailLoadPage":"Failed to load page.","DialogMessageFailLoginTwitter":"Failed to log in to Twitter","DialogMessageLeaveWarning":"You are about to leave this app. Press OK to continue.","DialogMessageLinkNotSupportedInSimulator":"This link is not supported in simulation mode","DialogMessageLiveAlbumCameraNotSupported":"Camera is not supported","DialogMessageLiveAlbumCameraNotSupportedSimulator":"Camera is not supported in simulation mode","DialogMessageLiveAlbumPostPhotoFailed":"Post photo failed","DialogMessageLiveAlbumTakePhotoFailed":"Take photo failed ({message})","DialogMessageLivePersonErrorClosing":"Error in closing chat","DialogMessageLivePersonNoAnswer":"There was no answer. Try again later.","DialogMessageLivePersonNoAvailability":"Account is offline","DialogMessageMediaNotSupported":"Audio is not supported by this browser","DialogMessagePurchaseFail":"Purchase failed. Please try again shortly.  If you encounter any additional problems, please feel free to contact us.","DialogMessageShareFailConectFacebook":"Sorry, failed to connect to Facebook service, please try again shortly.","DialogMessageShareFailConectTwitter":"Sorry, failed to connect to Twitter service, please try again shortly.","DialogMessageShareFailPostFacebook":"Sorry, failed to post. Facebook is not responding.","DialogMessageShareFailTweet":"Failed to tweet","DialogMessageShareNotSupportedInSimulator":"Share is not supported in Simulator mode.","DialogMessageSubscribeFailed":"Subscription currently unavailable. Please try again later","DialogMessageSubscribeSubscribeSuccess":"Thank you for subscribing","HtmlTextAddAlbumToFavorites":"Add tracks to your favorites list now","HtmlTextAddTrackToFavorites":"Add track to your favorites list now","HtmlTextAudioAlbum":"Album:","HtmlTextAudioComposer":"Composer:","HtmlTextAudioDetails":"Details","HtmlTextAudioLoading":"Loading...","HtmlTextAudioLyricist":"Lyricist:","HtmlTextAudioLyrics":"Lyrics","HtmlTextAudioSeek":"Seek:","HtmlTextAudioSeeking":"Seeking...","HtmlTextAudioTrackNumber":"Track {number}","HtmlTextAudioVocals":"Vocals","HtmlTextAudioWriters":"Writers","HtmlTextBlogbyAuthor":"by {author}","HtmlTextBlogLoadingPosts":"Loading...","HtmlTextBlogShowMorePosts":"Show more","HtmlTextBlogViewOriginalPost":"view original post","HtmlTextBlogViewOriginalSite":"view original site","HtmlTextCommentDialogButtonCancel":"Cancel","HtmlTextCommentDialogButtonOk":"Post on Facebook","HtmlTextCommentDialogPlaceholder":"Write something...","HtmlTextContactUsAddress":"Address:","HtmlTextContactUsAddressStr":"Address","HtmlTextContactUsCallNowStr":"Call","HtmlTextContactUsCallStr":"Call","HtmlTextContactUsContactUsStr":"Contact us","HtmlTextContactUsEmailStr":"Email","HtmlTextContactUsFax":"Fax:","HtmlTextContactUsFaxNumberStr":"Fax Number","HtmlTextContactUsFaxStr":"Fax","HtmlTextContactUsGetDirections":"Get directions","HtmlTextContactUsLinkStr":"Link","HtmlTextContactUsMail":"Mail:","HtmlTextContactUsMapStr":"Map","HtmlTextContactUsPhone":"Phone:","HtmlTextContactUsPhoneNumberStr":"Phone Number","HtmlTextContactUsShowOnMap":"Show on map","HtmlTextContactUsSignUpStr":"Sign Up","HtmlTextContactUsWeb":"Web:","HtmlTextEventsDayFriday":"Friday","HtmlTextEventsDayMonday":"Monday","HtmlTextEventsDaySaturday":"Saturday","HtmlTextEventsDaySunday":"Sunday","HtmlTextEventsDayThursday":"Thursday","HtmlTextEventsDayTuesday":"Tuesday","HtmlTextEventsDayWednesday":"Wednesday","HtmlTextEventsFutureEvents":"Upcoming Events","HtmlTextEventsLocationStr":"Location","HtmlTextEventsMonthApril":"April","HtmlTextEventsMonthAugust":"August","HtmlTextEventsMonthDecember":"December","HtmlTextEventsMonthFebruary":"February","HtmlTextEventsMonthJanuary":"January","HtmlTextEventsMonthJuly":"July","HtmlTextEventsMonthJune":"June","HtmlTextEventsMonthMarch":"March","HtmlTextEventsMonthMay":"May","HtmlTextEventsMonthNovember":"November","HtmlTextEventsMonthOctober":"October","HtmlTextEventsMonthSeptember":"September","HtmlTextEventsNoEventsStr":"There are currently no events to display.","HtmlTextEventsPastEvents":"Past Events","HtmlTextEventsPhoneNumberStr":"Phone Number","HtmlTextEventsTicketStr":"Ticket","HtmlTextEventsVenueStr":"Venue","HtmlTextFacebookAddCommentButton":"Comment","HtmlTextFacebookLikeComment":"Like","HtmlTextFacebookLikePostButton":"Like","HtmlTextFacebookLikesCount":"{number} likes","HtmlTextFacebookLoadingPosts":"Loading posts...","HtmlTextFacebookPageLikesCount":"like this","HtmlTextFacebookPostCommentsCount":"{number} comments","HtmlTextFacebookPostLikesCount":"{number} people like this","HtmlTextFacebookPostLikesCountIncludeYou":"You and {number} others like this","HtmlTextFacebookPostLikesOnlyYou":"You like this","HtmlTextFacebookReadMore":"Read more","HtmlTextFacebookShowMorePosts":"Show more posts","HtmlTextFacebookUnikeComment":"Unlike","HtmlTextFacebookUnikePostButton":"Unlike","HtmlTextFavoritesBuyButton":"Buy","HtmlTextFavoritesCancelButton":"Cancel","HtmlTextFavoritesDoneButton":"Done","HtmlTextFavoritesEditButton":"Edit","HtmlTextFavoritesNoFavsStr1":"No tracks added.","HtmlTextFavoritesNoFavsStr2":"Add tracks to your favorites list.","HtmlTextLiveAlbumAddComment":"add comment","HtmlTextLiveAlbumByUploader":"by {name}","HtmlTextLiveAlbumErrorLoadingImage":"Unable to load image","HtmlTextLiveAlbumEula":"Terms of Use","HtmlTextLiveAlbumFacebookLogin":"Share photos with your friends on facebook","HtmlTextLiveAlbumFacebookLoginComment":"(requires that you link your facebook account)","HtmlTextLiveAlbumFacebookLoginLiveAlbum":"LiveAlbum","HtmlTextLiveAlbumLoadingAlbum":"Loading...","HtmlTextLiveAlbumLoadingImage":"Loading...","HtmlTextLiveAlbumLoadingShowMore":"Loading...","HtmlTextLiveAlbumNoImages":"BE THE FIRST TO POST A PHOTO","HtmlTextLiveAlbumPhotos":"photos","HtmlTextLiveAlbumShareCheckbox":"Share on Facebook","HtmlTextLiveAlbumShowMore":"Show more","HtmlTextLivePersonEnd":"End","HtmlTextLivePersonInputPlaceholder":"Write a message...","HtmlTextLivePersonSend":"Send","HtmlTextLivePersonStart":"Start","HtmlTextLivePersonStatusAgentTyping":"{agentName} is typing...","HtmlTextLivePersonStatusChatting":"Chatting with {agentName}","HtmlTextLivePersonStatusCheckingAvailability":"Checking availability...","HtmlTextLivePersonStatusCheckingAvailabilityMinorText":"connecting","HtmlTextLivePersonStatusClosingChat":"Closing chat...","HtmlTextLivePersonStatusInit":"To initiate a chat session click:","HtmlTextLivePersonStatusWaitingAgent":"Waiting for an agent...","HtmlTextLivePersonStatusWaitingAgentMinorText":"calling","HtmlTextLoadingPagination":"Loading...","HtmlTextMapLoading":"Loading...","HtmlTextMorePages":"More","HtmlTextPaginationLoadingItems":"Loading...","HtmlTextPaginationRefreshButton":"Refresh","HtmlTextPaginationRefreshItems":"Loading...","HtmlTextPaginationShowMoreItems":"Show more...","HtmlTextPhotosImagesCount":"{number} photos","HtmlTextPhotosNoImages":"Album is empty","HtmlTextPurchaseItemBuy":"Buy","HtmlTextPurchaseItemBuyAlbum":"Buy Album","HtmlTextRadioLoading":"Loading...","HtmlTextRemoveTrackFromFavorites":"Remove track from your favorites list now","HtmlTextReviewsByAuthor":"by {name}","HtmlTextReviewsLoadingProvider":"Loading...","HtmlTextReviewsReadMoreLink":"Read more","HtmlTextReviewsReviewsCount":"{number} reviews on {provider}","HtmlTextRevuReopenToReview":"(reopen app to review your changes)","HtmlTextRevuShakeToReload":"(shake to reload app)","HtmlTextRssReadMore":"Read more","HtmlTextRssShowOnMap":"Show on map","HtmlTextShareAppButtonText":"Share app","HtmlTextShareButtonText":"Share","HtmlTextShareChangeUserName":"Not {name}?","HtmlTextShareFacebookChangeUserButton":"Change user","HtmlTextShareFacebookPostButton":"Post","HtmlTextShareFacebookWriteCommentPlaceholder":"Enter your comment","HtmlTextShareOnFacebook":"Share on Facebook","HtmlTextShareOnTwitter":"Share on Twitter","HtmlTextShareTwitterChangeUserButton":"Change user","HtmlTextShareTwitterLoginButton":"Sign in","HtmlTextShareTwitterLoginCaption":"Sign in","HtmlTextShareTwitterPasswordCaption":"Password","HtmlTextShareTwitterPostButton":"Tweet","HtmlTextShareTwitterUserNameCaption":"User name or e-mail","HtmlTextShareTwitterWriteCommentPlaceholder":"Enter your comment","HtmlTextShowMorePagination":"Show more","HtmlTextShowOnMapButtonStr":"Map","HtmlTextSlicerUnableLoading":"Unable to load site content","HtmlTextSpeakersBioTitle":"Speaker's bio","HtmlTextSubscribeDiscoverString":"Discover us on these sites","HtmlTextSubscribeFacebookButton":"Facebook","HtmlTextSubscribeFollowBlogTitle":"Follow {blogTitle}","HtmlTextSubscribeInsetYourEmail":"your@email.com","HtmlTextSubscribeLinkedInButton":"LinkedIn","HtmlTextSubscribeLoading":"Subscribing...","HtmlTextSubscribeSubscribeButton":"Subscribe","HtmlTextSubscribeSubscribeString":"Subscribe to {blogTitle}","HtmlTextSubscribeTwitterButton":"Twitter","HtmlTextSubscribeUnknownButton":"Unknown","HtmlTextTwitterFollowButton":"Follow","HtmlTextTwitterFollowers":"Followers","HtmlTextTwitterFollowersCount":"{number} followers","HtmlTextTwitterLoadingTweets":"Loading...","HtmlTextTwitterRetweet":"by {retweeterName}","HtmlTextTwitterRetweetDetails":"retweeted by","HtmlTextTwitterShowMoreTweets":"Show more tweets","HtmlTextTwitterStatusesCount":"{number} statuses","HtmlTextTwitterTweets":"Tweets","HtmlTextTwitterUnfollowButton":"Unfollow","HtmlTextVideoByAuthor":"by {author}","HtmlTextViewOriginalPageBtnText":"View Original Version","HtmlTextYoutubeByAuthor":"by {author}","HtmlTextYoutubeLikes":"{likes} Like | {dislikes} Dislike","HtmlTextYoutubeRatings":"{ratings} Ratings | {views} Views","HtmlTextYoutubeViews":"{views} Views","HtmlTextYoutubeViewsCount":"{number} views","IndicatorLiveAlbumPostingImage":"Posting Image...","IndicatorLoading":"Loading...","IndicatorShareLogOut":"Log out...","IndicatorSharePublishing":"Publishing...","IndicatorShareTweeting":"Tweeting...","IndicatorShareTwitterSigningIn":"Signing in ...","PushNotificationTitle":"Notification","SDayAgo":"a day ago","SFacebookShareEmailSubject":"Check out this post from {user}'s Facebook page","SFacebookShareTwitterFrom":"From {user}'s Facebook wall","SHourAgo":"an hour ago","SLivePersonUserName":"me","SMinuteAgo":"a minute ago","SMonthAgo":"a month ago","SNumberDaysAgo":"{number} days ago","SNumberHoursAgo":"{number} hours ago","SNumberMinutesAgo":"{number} minutes ago","SNumberMonthsAgo":"{number} months ago","SNumberSecondsAgo":"{number} seconds ago","SNumberWeeksAgo":"{number} weeks ago","SNumberYearsAgo":"{number} years ago","SRssShareComment":"check out this post from {link}","SRssShareEmailSubject":"Check out this article from {title}","SRssShareTwitterFrom":"from {title}","SSecondAgo":"a second ago","SSecondsAgo":"seconds ago","SShareApp":"Check out the {appName} mobile app I just used!","SShareAppMailBody":"Hey,<br>Check out the {appName} mobile app I just used!","SShareAppMailSubject":"Check out this great new app!","SShareConduitMobile":"Conduit Mobile","SShareEmailLink":"Read more","SShareFromMobile":"Shared from my mobile app","SShareFromMobileWithLink":"Shared from my mobile app {appLink}","SShareMailApplinkHtml":"Shared from my: {htmlLink}","SShareMailApplinkSimple":"Shared from my mobile app: {appLink}","SShareMailPowerByConduitHtml":"Powered by: {htmlLink}","SShareMailPowerByConduitSimple":"Powered by Conduit Mobile: {conduitLink}","SShareMobileApp":"mobile app","SSharePhotoSubject":"Look at this awesome pic!","SSharePhotoText":"Take a look at this awesome pic!","SSharePhotoTitle":"Awesome pic","SShareTweetedFromLink":"Tweeted from {appLink}","STwitterShareEmailSubject":"Check out this tweet from @{name}","SWeekAgo":"a week ago","SYearAgo":"a year ago","SYoutubeShareTitle":"Check out this video - {title}","TitleShareVia":"Share via","ToastMessageAudioInitFail":"Failed to initialize audio player","ToastMessageBlogFailedGetPosts":"failed to get posts","ToastMessageFacebookFailedGetComments":"failed to receive data","ToastMessageLiveAlbumPublishingPhoto":"Image uploaded successfully, stream will be updated shortly","ToastMessagePaginationFailedGetItems":"failed to receive data","ToastMessageSubscribeInsetEmail":"Email address is required","ToastMessageSubscribeInvalidEmail":"Please enter a valid email address","ToastMessageTrackAddedToFavorites":"Track added to favorites","ToastMessageTrackRemovedFromFavorites":"Track removed from favorites","HtmlTextAboutUsItemTitleDescription":"Description","HtmlTextAboutUsItemTitleFoodStyle":"Food Type","HtmlTextAboutUsItemTitleBiography":"Biography","HtmlTextAboutUsItemTitleRecordLabel":"Record Label","HtmlTextAboutUsItemTitleHours":"Hours","HtmlTextAboutUsItemTitleServices":"Services","HtmlTextAboutUsItemTitleAwards":"Awards","HtmlTextAboutUsItemTitleParking":"Parking","HtmlTextAboutUsItemTitleProducts":"Products","HtmlTextAboutUsItemTitleMission":"Mission","HtmlTextAboutUsItemTitleManager":"Manager","HtmlTextAboutUsItemTitleBookingAgent":"Booking Agent","HtmlTextInstagramUserLikePhoto":"Like this","HtmlTextInstagramPhotosCount":"photos","HtmlTextInstagramFollowersCount":"followers","HtmlTextInstagramFollowingCount":"following","DialogMessageFormSendSuccess":"Data sent","DialogMessageFormSendFail":"Failed to send data","HtmlTextAboutUsItemTitleCompanyOverview":"Company Overview","HtmlTextAboutUsItemHoursAlwaysOpen":"Open 24\/7","HtmlTextAboutUsItemHoursNoHours":"No available hours","HtmlTextAboutUsInfoVersion":"Version {versionName}","HtmlTextAboutUsReadMore":"Read more","HtmlTextAboutUsListItemReadMore":"Read more","HtmlTextAboutUsDescriptionTitle":"Description","DialogCaptionConfirm":"Confirm","DialogCaptionSuccess":"Success","DialogMessagePollAreYouSureVote":"Are you sure you want to vote for \"{text}\" ?","DialogMessagePollVoteFail":"Your vote was not received. Please try again later.","DialogMessagePollVoteSuccess":"Your vote has been received.","HtmlTextPollVoteButton":"Vote","HtmlTextLinksDescriptionTitle":"Description","HtmlTextDatePickerDialogButtonOk":"OK","HtmlTextDatePickerDialogButtonCancel":"Cancel","HtmlTextDatePickerDialogButtonClear":"Clear","HtmlTextPageNotSupportedInCp":"This page is not supported in simulator mode.","HtmlTextPageNotSupportedInCp2":"To test it on your device, please install our ReVu app.","HtmlTextInstagramLikes":"Likes","HtmlTextInstagramComments":"Comments","HtmlTextInstagramPrivateUserMainText":"This user does not share information publicly.","HtmlTextInstagramPrivateUserSecondaryText":"You cannot view this page.","HtmlTextLiveAlbumUploadingImage":"Uploading image...","HtmlTextLiveAlbumUploadingFailed":"The image failed to upload.","HtmlTextLiveAlbumUploadedByYou":"You","HtmlTextAgendaSpeakersCount":"{number} speakers:","HtmlTextAgendaOneSpeaker":"Speaker:","HtmlTextAgendaSessionDetails":"Details","HtmlTextAgendaAddToFav":"Add to Favs","HtmlTextAgendaRemoveFromFav":"Remove from Favs","DialogMessageAgendaNoFav":"There are no sessions in your Favorites list.","DialogCaptionAgendaNoFav":"Favorites","DialogMessageEventsRsvpNotSupportedInSimulator":"This action is not supported in simulator mode."}},"maxAge":7200,"serviceUrl":"http:\/\/ams.mobile.conduit-services.com\/translate\/mobile.client\/en-US\/2"}],"timestamp":1366328953};
DEBUG = 0
(new Image()).src = 'app/interface/web/img/ajax-loader.png';
var WebAppPreloader=(function(){var b={};var a=null;function c(){document.body.style.margin="0";document.body.style.padding="0";document.body.style.backgroundColor="#222222";var e=window.pageYOffset+window.innerHeight/2-150;var d='<div id="app_loading" style="z-index:2147483646; position:absolute;width:100%;height:100%;display:block;text-align:center;background-color:#222222;"><div style="position:absolute;top:'+e+'px;width:100%;height:100px;"><span class="spin" style="position: static; display: block; opacity: .9; margin: 0 auto; width: 35px; height: 35px; background-color: transparent; margin-top:80px; background-image: url(app/interface/web/img/ajax-loader.png); -moz-border-radius: 20px; -webkit-border-radius: 20px; border-radius: 20px; background-size: 35px 35px;"></span><p style="font-family: Helvetica,Arial; font-size:16px; color:#ffffff;margin-top:30px;">Loading ...</p></div></div>';document.write(d);a=document.getElementById("app_loading")}b.resize=function(){if(a){if(window.innerHeight&&window.innerWidth){a.style.height=window.innerHeight;a.style.width=window.innerWidth}}};b.remove=function(){if(a){document.body.style.backgroundColor="";document.body.removeChild(a)}a=null};c();return b})();
var __resources={"appbase.min.css":{type:"css"},"appbase.min.js":{type:"js"}};
var ResourceLoader=(function(){var c={};var a="";function d(f,g){if(g==="js"){a+='<script type="text/javascript" src="'+f+'"><\/script>'}else{if(g==="css"){a+='<link type="text/css" rel="stylesheet" href="'+f+'">'}}}function e(g){if(g.length==0){return true}for(var h=0;h<g.length;h++){var k=g[h];var f=k.split("&");var m=true;for(j=0;j<f.length;j++){var l=f[j];if((typeof(platformEnum[l])!=="undefined"&&platformEnum[l]!=PLATFORM)||(typeof(deviceTypeEnum[l])!=="undefined"&&deviceTypeEnum[l]!=DEVICE)){m=false}}if(m){return true}}return false}c.isValidResource=function(g){var f=true;var k=false;if(g){var i=g.yeah||[];var l=g.nope||[];f=e(i);if(l.length>0){k=e(l)}}var h=f&&!k;return h};function b(k,p){var m=[];p=p||"";var q=null;for(q in k){var l=k[q];var h=l.type;var s=false;try{if(typeof window.DEBUG!=="undefined"){s=window.DEBUG}else{if(typeof parent.DEBUG!=="undefined"){s=parent.DEBUG}}}catch(r){}if(!s){q=p+q;m.push({file:q,type:h})}else{if(l.files){var g=l.files;for(var o=0;o<g.length;o++){var n=g[o];if(c.isValidResource(n)){var f=p+n.file;m.push({file:f,type:h})}}}}}return m}c.loadResources=function(k,i){var f=b(k,i);for(var h in f){var g=f[h];d(g.file,g.type)}};c.flush=function(){document.write(a);a=""};return c}());(function loadAllResources(){if(window.__resources){ResourceLoader.loadResources(window.__resources)}ResourceLoader.flush()})();

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
 * AboutUs controller for native UI
 * 
 * @author Matanya
 */
var AboutUsTemplateView = NativeTemplateView.extend(
{
	BUTTON_ID:
	{
		TWITTER: 0
		,FACEBOOK: 1
		,LINKEDIN: 2
		,MYSPACE: 3
		,EMAIL: 4
		,LINK: 5
	},
	
	// override
	innerOpenPage: function(params, requestId)
	{
		this.openStaticPage(new AboutUsModel(params), requestId);
	},
	
	nativeRequest: function (data, model)
	{
		switch (data.buttonId)
		{
			case this.BUTTON_ID.TWITTER:
				url = model.get('twitter');
				break;
			case this.BUTTON_ID.FACEBOOK:
				url = model.get('facebook');
				break;
			case this.BUTTON_ID.LINKEDIN:
				url = model.get('linkedin');
				break;
			case this.BUTTON_ID.MYSPACE:
				url = model.get('myspace');
				break;
			case this.BUTTON_ID.EMAIL:
				url = "mailto:" + model.get('email');
				break;
			case this.BUTTON_ID.LINK:
				url = model.get('link');
				break;
		}
		
		conduitApi.app.openLink(null, null, 
				{
					url: url,
					title: ""
				});
	}

});

/**
 * Reviews controller for native UI
 * 
 * @author Matanya
 */
var ReviewsTemplateView = NativeTemplateView.extend(
{
	//override
	innerOpenPage: function(params, requestId)
	{
		// create the model of items.
		var itemsModel = new ProviderModel(params);
		
		this.openCollection(itemsModel, requestId);
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



/**
 * ExternalPage controller for native UI
 * 
 * @author Matanya
 */
var ExternalPageTemplateView = NativeTemplateView.extend(
{
	render: function(index)
	{
		// NOTE: we override the "render" because we don't have tabs...
		// TODO: to change it?
		var templateMetaData = this.model.get('meta');
		
		var data = 
		{
			requestId: this.model.get('requestId'),
			data: new ExternalPageModel(templateMetaData)
		};
		navigator.appManager.getPageResult(null, null, data);
		return this;
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

/**
 * Photos controller for native UI
 * 
 * @author Matanya
 */
var PhotosTemplateView = NativeTemplateView.extend(
{
	//override
	innerOpenPage: function(params, requestId)
	{
		// create the model of items.
		var itemsModel = new PhotosModel(params);
		
		this.openCollection(itemsModel, requestId);
	}
});

/**
 * Subscribe controller for native UI
 * 
 * @author Matanya
 */
var SubscribeTemplateView = NativeTemplateView.extend(
{
	render: function(index)
	{
		// NOTE: we override the "render" because we don't have tabs...
		// TODO: to change it?
		var templateMetaData = this.model.get('meta');

		var data = 
		{
			requestId: this.model.get('requestId'),
			data: new SubscribeModel(templateMetaData)
		};
		navigator.appManager.getPageResult(null, null, data);
		return this;
	}
});

/**
 * ContactUs controller for native UI
 * 
 * @author Matanya
 */
var ContactUsTemplateView = NativeTemplateView.extend(
{
	//override
	innerOpenPage: function(params, requestId)
	{
		var data = 
		{
			requestId: requestId,
			data: new ContactUsModel(params)
		};
		navigator.appManager.getPageResult(null, null, data);
	}
});

/**
 * StaticHtml controller for native UI
 * 
 * @author Matanya
 */
var StaticHtmlTemplateView = NativeTemplateView.extend(
{
	//override
	innerOpenPage: function(params, requestId)
	{
		var data = 
		{
			requestId: requestId,
			data: new Backbone.Model(params)
		};
		navigator.appManager.getPageResult(null, null, data);
	}
});

/**
 * Links controller for native UI
 * 
 * @author Matanya
 */

var LinksTemplateView = NativeTemplateView.extend(
{
	//override
	innerOpenPage: function(params, requestId)
	{
		var data = 
		{
			requestId: requestId,
			data: new Backbone.Model(params)
		};
		navigator.appManager.getPageResult(null, null, data);
	}
});

/**
 * Form controller for native UI
 * 
 * @author Matanya
 */

var FormTemplateView = NativeTemplateView.extend(
{
	//override
	innerOpenPage: function(params, requestId)
	{
		var data = 
		{
			requestId: requestId,
			data: new Backbone.Model(params)
		};
		navigator.appManager.getPageResult(null, null, data);
	}
});

/**
 * Instagram controller for native UI
 * 
 * @author Matanya
 */
var InstagramTemplateView = NativeTemplateView.extend(
{
	//override
	innerOpenPage: function(params, requestId)
	{
		// create the model of the Instagram. (user-photos)
		var itemsModel = new InstagramModel(params);
		
		this.openCollection(itemsModel, requestId);
	},

	/**
	 * Override:
	 * Handle the pressing on user in every screen (comments list/ followers list/ etc.)
	 * 
	 * @param {Dictionary} newPageData that includes:
	 * 		{String} userName - the instagram user name to get its data
	 */
	onOpenNewPage: function(newPageData, requestId)
	{
		var params = 
		{
			title: "Instagram",
			type: "instagram",
			userName: newPageData.userName
		};
		
		this.innerOpenPage(params, requestId);
	},

	/**
	 * Override:
	 * Handle the pressing on a "get followers" or "get following"
	 * 
	 * @param {Dictionary} subListData that includes:
	 * 		{String} userName - the instagram user name to get his followers/ following him
	 * 		{Integer}(enum) relationType - followers / following?
	 */
	onGetSubItems: function(subListData, requestId)
	{
		var params = 
		{
			type: "instagram",
			userName: subListData.userName
		};
		if (subListData.relationType === JNI.instagramFollowsTypes.FOLLOWING) 
		{
			params.relationType = "follows";
		}
		else //if (subListData.relationType === JNI.instagramFollowsTypes.FOLLOWED_BY)
 		{
			params.relationType = "followed-by";
		}
		var itemsModel = new FollowsModel(params);
		
		this.openCollection(itemsModel, requestId);
	}
});


