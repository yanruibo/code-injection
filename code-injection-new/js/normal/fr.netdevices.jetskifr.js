
































			__debug__ = true;
            
			function dlog(message)
			{
				if (__debug__)
                window.console.log(message);
			}
			window.Cordova = window.cordova = 
			{
				exec : function(){}
			};
		

































			__debug__ = true;
			function dlog(message)
			{
				if (__debug__)
                window.console.log(message);
			}
		

































			document.addEventListener("deviceready", function(event)
                                      {                                      
                                        application.initApplication();
                                      }, false);
		
































			news.load();
		


			function loadpage(page)
			{
				if (page.length == 0)
				{
					return;
				}
				var iframes = document.getElementsByTagName("iframe");
				for (var i = 0; i < iframes.length; i++)
				{
					var iframe = iframes[i];
					iframe.src = page;
				}
			}
			loadpage('home.html');
		








var settings =
{
	signin : function()
	{
		var form = document.getElementById("signin_form");

		// clean error message
		var errorView = form.getElementsByClassName("error")[0];
		errorView.innerText = "";
		
		var login = form.email.value;
		var password = form.password.value;
		form.email.blur();
		form.password.blur();
		var loginCallback = function(response)
		{
			if (response.success === true)
			{
			  newsstand.loadMagazines();
			  //settings.closeLoginDialog();
			  var application = document.getElementById("application");
			  application.classList.add("loggedIn");
			}
			else
			{
				errorView.innerText = response.message;
			}
		};
	
		user.logIn(login, password, loginCallback);
		return (false);
	},
	
	signout : function(callback)
	{
		user.logOut(
			function(result)
			{
				//settings.closeLoginDialog();
				var application = document.getElementById("application");
				application.classList.remove("loggedIn");
				newsstand.loadMagazines();
				if (callback)
					callback();
			}
		);	
	},

	showLoginDialog : function ()
	{
		var form = document.getElementById("signin_form");
		var restore_purchase_button = document.getElementById("restore_purchases");
		
		form.email.value = "";
		form.password.value = "";
		tabbar.goToLogin();
		
		if (navigator.network &&	// on a device with cordova
			(navigator.network.connection.type == Connection.UNKNOWN || // network is off
			 navigator.network.connection.type == Connection.NONE))
		{
			var error_message = "You appear to be offline. You must be connected to login.";
			var error_label = document.getElementById("login_error");
			error_label.innerHTML = error_message;
		}

		form.addEventListener("submit", settings.onLoginSubmit);
		restore_purchase_button.addEventListener("click", settings.onRestorePurchase);
		
	},
	
	restorePurchases : function()
	{
		newsstand.restorePurchases();
		newsstand.loadMagazines();
		return;
	},
	
	onLoginSubmit : function(evnet)
	{
		event.preventDefault();
		if (!navigator.network ||	// not on a device with cordova
			!(navigator.network.connection.type == Connection.UNKNOWN || // network is on
			 navigator.network.connection.type == Connection.NONE))
		{
			settings.signin();
		}
	},
	
	onRestorePurchase : function(evnet)
	{
		event.preventDefault();
		if (!navigator.network ||	// not on a device with cordova
			!(navigator.network.connection.type == Connection.UNKNOWN || // network is on
			 navigator.network.connection.type == Connection.NONE))
		{
			settings.restorePurchases();
		}
	},
	
	hideLoginDialog : function()
	{
		var form = document.getElementById("signin_form");
		form.removeEventListener("submit");
		
		form.email.value = "";
		form.password.value = "";
		form.email.blur();
		
		var error_label = document.getElementById("login_error");
		error_label.innerHTML = "";
		
		var restore_purchase_button = document.getElementById("restore_purchases");
		restore_purchase_button.removeEventListener("click");
	},
	
	showTou : function()
	{
		var tou = document.getElementById("tou");
		tou.classList.add("visible");
	},
	
	closeTou : function()
	{
		var tou = document.getElementById("tou");
		tou.classList.remove("visible");
	}
}

var base_url = "http://localhost:8888/ski/universal/proxy.php?url=";
var sample_base_url = "http://localhost:8888/ski/";
//var base_url = "http://192.168.0.20:8888/ski/universal/proxy.php?url=";
//var base_url = "http://192.168.0.12:8888/ski/universal/proxy.php?url=";
//var base_url ="http://dev.j2ldev.fr/apps/universal/proxy.php?url=";
//var base_url = i18n.getStringForId("base_url");

if (!device)
	var device = {};

/* debug offline */
//navigator.network =
//{
//	connection :
//	{
//		type : "none"
//	}
//}
//Connection.NONE = "none";

if (!window.plugins)
	window.plugins = {};

// template to graphic component table
var tabTemplates = {};
tabTemplates["template_none"] = {component : "template1", header: false, sectionTemplate : false};
tabTemplates["tp001"] = {component : "template1", header: false, sectionTemplate : false};
tabTemplates["tp002"] = {component : "template1", header: false, sectionTemplate : false};
tabTemplates["tp003"] = {component : "template1", header: false, sectionTemplate : false};
tabTemplates["tp004"] = {component : "template1", header: false, sectionTemplate : false};
tabTemplates["tp005"] = {component : "template2", header: true, sectionTemplate : true};
tabTemplates["tp006"] = {component : "template2", header: true, sectionTemplate : false};
tabTemplates["tp007"] = {component : "template1", header: true, sectionTemplate : false};
tabTemplates["tp008"] = {component : "template2", header: true, sectionTemplate : false};
tabTemplates["tp009"] = {component : "template2", header: true, sectionTemplate : false};
tabTemplates["tp010"] = {component : "template2", header: true, sectionTemplate : false};
tabTemplates["tp011"] = {component : "template1", header: true, sectionTemplate : false};
tabTemplates["tp012"] = {component : "template1", header: true, sectionTemplate : false};
tabTemplates["tp013"] = {component : "templateRiding", header: true, sectionTemplate : false};
tabTemplates["tp014"] = {component : "templatePortrait", header: true, sectionTemplate : false};
tabTemplates["tp015"] = {component : "template1", header: true, sectionTemplate : false};
tabTemplates["tp016"] = {component : "template1", header: false, sectionTemplate : false};
tabTemplates["tp017"] = {component : "template1", header: true, sectionTemplate : false};
tabTemplates["tp018"] = {component : "template1", header: true, sectionTemplate : false};
tabTemplates["tp019"] = {component : "templateMediaBottom", title: false, sectionTemplate : false};
tabTemplates["tp020"] = {component : "template1", header: false, sectionTemplate : false};
tabTemplates["tp021"] = {component : "template2", header: false, sectionTemplate : false};
tabTemplates["tp022"] = {component : "cover", header: false, sectionTemplate : false};

var iconArray = {}
iconArray["couverture"] = "images/iko-rubriques/" + "iko-edito.png";
iconArray["edito"] = "images/iko-rubriques/" + "iko-edito.png";
iconArray["courrier"] = "images/iko-rubriques/" + "iko-courrier-lecteurs.png";
iconArray["astuces lecteurs"] = "images/iko-rubriques/" + "iko-astuces-lecteurs.png";
iconArray["sommaire"] = "images/iko-rubriques/" + "iko-sommaire.png";
iconArray["portfolio"] = "images/iko-rubriques/" + "iko-portfolio.png";
iconArray["news"] = "images/iko-rubriques/" + "iko-news.png";
iconArray["people"] = "images/iko-rubriques/" + "iko-people.png";
iconArray["mini-view"] = "images/iko-rubriques/" + "iko-mini-view.png";
iconArray["shopping"] = "images/iko-rubriques/" + "iko-shopping.png";
iconArray["news-matos"] = "images/iko-rubriques/" + "iko-new-matos.png";
iconArray["presentation"] = "images/iko-rubriques/" + "iko-presentation.png";
iconArray["test-matos"] = "images/iko-rubriques/" + "iko-test-matos.png";
iconArray["essais"] = "images/iko-rubriques/" + "iko-essais.png";
iconArray["occasion"] = "images/iko-rubriques/" + "iko-occasion.png";
iconArray["comparatif"] = "images/iko-rubriques/" + "iko-comparatif.png";
iconArray["rando"] = "images/iko-rubriques/" + "iko-randonnee.png";
iconArray["pin-up"] = "images/iko-rubriques/" + "iko-pin-up.png";
iconArray["racing"] = "images/iko-rubriques/" + "iko-racing.png";
iconArray["abonnement"] = "images/iko-rubriques/" + "iko-abonnement.png";
iconArray["boutique"] = "images/iko-rubriques/" + "iko-boutique.png";
iconArray["technique"] = "images/iko-rubriques/" + "iko-dossier-technique.png";
iconArray["interview"] = "images/iko-rubriques/" + "iko-interview.png";
iconArray["visite"] = "images/iko-rubriques/" + "iko-visite.png";
iconArray["economie"] = "images/iko-rubriques/" + "iko-visite.png";
iconArray["evenement"] = "images/iko-rubriques/" + "iko-evenement.png";
iconArray["hi-tech"] = "images/iko-rubriques/" + "iko-hi-tech.png";
iconArray["reportage"] = "images/iko-rubriques/" + "iko-reportage.png";
iconArray["equipement"] = "images/iko-rubriques/" + "iko-equipement.png";
iconArray["guide"] = "images/iko-rubriques/" + "iko-guide.png";
iconArray["pilotage"] = "images/iko-rubriques/" + "iko-lecon-de-pilotage.png";
iconArray["jeu-concours"] = "images/iko-rubriques/" + "iko-jeu-concours.png";
iconArray["enquête"] = "images/iko-rubriques/" + "iko-enquete.png";

iconArray["Couverture"] = "images/iko-rubriques/" + "iko-edito.png";
iconArray["Edito"] = "images/iko-rubriques/" + "iko-edito.png";
iconArray["Courrier"] = "images/iko-rubriques/" + "iko-courrier-lecteurs.png";
iconArray["Astuces-lecteurs"] = "images/iko-rubriques/" + "iko-astuces-lecteurs.png";
iconArray["Sommaire"] = "images/iko-rubriques/" + "iko-sommaire.png";
iconArray["Porfolio"] = "images/iko-rubriques/" + "iko-portfolio.png";
iconArray["News"] = "images/iko-rubriques/" + "iko-news.png";
iconArray["People"] = "images/iko-rubriques/" + "iko-people.png";
iconArray["Mini-view"] = "images/iko-rubriques/" + "iko-mini-view.png";
iconArray["Shopping"] = "images/iko-rubriques/" + "iko-shopping.png";
iconArray["News-Matos"] = "images/iko-rubriques/" + "iko-new-matos.png";
iconArray["Présentation"] = "images/iko-rubriques/" + "iko-presentation.png";
iconArray["Test-Matos"] = "images/iko-rubriques/" + "iko-test-matos.png";
iconArray["Essais"] = "images/iko-rubriques/" + "iko-essais.png";
iconArray["Occasion"] = "images/iko-rubriques/" + "iko-occasion.png";
iconArray["Comparatif"] = "images/iko-rubriques/" + "iko-comparatif.png";
iconArray["Rando"] = "images/iko-rubriques/" + "iko-randonnee.png";
iconArray["Pin-up"] = "images/iko-rubriques/" + "iko-pin-up.png";
iconArray["Racing"] = "images/iko-rubriques/" + "iko-racing.png";
iconArray["Abonnement"] = "images/iko-rubriques/" + "iko-abonnement.png";
iconArray["Boutique"] = "images/iko-rubriques/" + "iko-boutique.png";
iconArray["Technique"] = "images/iko-rubriques/" + "iko-dossier-technique.png";
iconArray["Interview"] = "images/iko-rubriques/" + "iko-interview.png";
iconArray["Visite"] = "images/iko-rubriques/" + "iko-visite.png";
iconArray["Economie"] = "images/iko-rubriques/" + "iko-visite.png";
iconArray["Evenement"] = "images/iko-rubriques/" + "iko-evenement.png";
iconArray["Hi-tech"] = "images/iko-rubriques/" + "iko-hi-tech.png";
iconArray["Reportage"] = "images/iko-rubriques/" + "iko-reportage.png";
iconArray["Equipment"] = "images/iko-rubriques/" + "iko-equipement.png";
iconArray["Guide"] = "images/iko-rubriques/" + "iko-guide.png";
iconArray["Pilotage"] = "images/iko-rubriques/" + "iko-lecon-de-pilotage.png";
iconArray["Jeu-concours"] = "images/iko-rubriques/" + "iko-jeu-concours.png";
iconArray["Enquête"] = "images/iko-rubriques/" + "iko-enquete.png";

var UIInterfaceOrientationPortrait = "0";
var UIInterfaceOrientationPortraitUpSideDown = "180";
var UIInterfaceOrientationLandscapeLeft = "90";
var UIInterfaceOrientationLandscapeRight = "-90";
var InterfaceOrientationPortrait = [UIInterfaceOrientationPortrait,
									UIInterfaceOrientationPortraitUpSideDown];
var InterfaceOrientationAll = [UIInterfaceOrientationPortrait,
							   UIInterfaceOrientationPortraitUpSideDown,
							   UIInterfaceOrientationLandscapeLeft,
							   UIInterfaceOrientationLandscapeRight];

var application =
{
	supportedOrientations : InterfaceOrientationPortrait,
	
	initNetworkEventListeneer : function()
	{
		document.addEventListener("offline", this.offlineEventHandler);
		document.addEventListener("online", this.onlineEventHandler);
	},
	
	onlineEventHandler : function(event)
	{
		var application = document.getElementById("application");
		if (application.classList.contains("newsstand"))
		{
			newsstand.loadMagazines();
			news.load();
		}
		dlog("online");
	},
	
	offlineEventHandler : function(event)
	{
		dlog("offline");
	},
	
	setMinimalWindowHeight: function()
	{
		var height = window.innerHeight;
		var body = document.getElementsByTagName("html")[0];
		body.style.minHeight = height  + "px";
	},
	
	initApplication : function ()
	{
		this.setMinimalWindowHeight();
		this.initNetworkEventListeneer();

		// init inapp plugin
		if (!window.plugins.inAppPlugin)
		{
			window.plugins.inAppPlugin = new InAppPlugin();
		}	
		
		i18n.setLanguageCode("en_US");
		//i18n.setLanguageCode("fr_FR");
		NDAPI._baseURL = base_url + encodeURI(i18n.getStringForId("base_url"));
		initText();
		
		FileManager.ROOT_DIRECTORY_NAME = i18n.getStringForId("root_directory_name");
		
		var applicationView = document.getElementById("application");
		if (!window.user)
		{
			var value = localStorage.getItem("user");
			if (value !== null && value !== undefined)
			{
				user = new User(value);
				var callback = function(result)
				{
					if (result.success === true && user._isAnonymous === false)
					{
						applicationView.classList.add("loggedIn");
					}
					loadComponent("newsstand", applicationView, newsstand);
				}
				user.logIn(user._login, user._password, callback);
			}
			else
			{
				user = new User();
				loadComponent("newsstand", applicationView, newsstand);
			}
		}
		Splash.showStartupSplash();
	}
}

function supportedOrientations()
{
	return (JSON.stringify(application.supportedOrientations));
}

function initText()
{
	document.getElementById("tou_close").innerText = i18n.getStringForId("close");
	//document.getElementById("tou_title").innerText = i18n.getStringForId("tou_title");
	document.getElementById("tou_content").innerHTML = i18n.getStringForId("tou_content");
}


var modalLoading = {
	spinner : null,
	show : function() {
		if ( this.spinner == null ) {
			var opts = {
			  lines: 13, // The number of lines to draw
			  length: 20, // The length of each line
			  width: 10, // The line thickness
			  radius: 30, // The radius of the inner circle
			  corners: 1, // Corner roundness (0..1)
			  rotate: 0, // The rotation offset
			  direction: 1, // 1: clockwise, -1: counterclockwise
			  color: '#FFF', // #rgb or #rrggbb or array of colors
			  speed: 1, // Rounds per second
			  trail: 60, // Afterglow percentage
			  shadow: false, // Whether to render a shadow
			  hwaccel: false, // Whether to use hardware acceleration
			  className: 'spinner', // The CSS class to assign to the spinner
			  zIndex: 2e9, // The z-index (defaults to 2000000000)
			};
			this.spinner = new Spinner(opts);
		}
		
		this.spinner.spin();
		var view = document.getElementById("modal-loading");
		view.appendChild(this.spinner.el);
		view.classList.add("visible");
	},
	
	hide : function() {
		var view = document.getElementById("modal-loading");
		view.classList.remove("visible");
		this.spinner.stop();
	}
}

var JetSkiApp =
{
	TABLET_MIN_HEIGHT : 700,
	TABLET_MIN_WIDTH : 480,
	
	isTablet : function()
	{
		return (window.innerHeight >= this.TABLET_MIN_HEIGHT &&
				window.innerWidth >= this.TABLET_MIN_WIDTH);
	}
}

var reader =
{
	currentItemIndex : 0,
	currentSectionIndex : 0,
	nextItemIndex : 0,
	nextSectionIndex : 0,
	previousItemIndex : 0,
	previousSectionInex : 0,
	pageNumber : 1,
	current_video : null,
	failedDownloadSectionIndex: null,
	
	issue : null,
	articleCount: 0,
	waitingForArticle : null,
	
	openIssue : function(issue)
	{
		this.currentItemIndex = 0;
		this.currentSectionIndex = 0;
		this.nextItemIndex = 1;
		this.nextSectionIndex = 0;
		this.previousItemIndex = 0;
		this.previousSectionIndex = 0;
		this.pageNumber = 1;
		
		// set the first page as waiting		
		this.waitingForArticle = {pageIndex: 0, sectionIndex: 0};
		
		this.issue = issue;
		for (var i = 0; i < issue.sections.length; i++)
		{
            // if first section has only one article,
            //  set the next section first item as the next item
            if ( i == 0 && issue.sections[i].itemCount == 1)
            {
                this.nextItemIndex = 0;
                this.nextSectionIndex = 1;
            }
			this.articleCount += issue.sections[i].itemCount;
		}
		var applicationView = document.getElementById("application");
		loadComponent("reader", applicationView, this);
	},
	
	componentDidLoad : function()
	{
		readerInitText();
		wireframe.init();
		this.issue.load(this);
		menu.init();
		this.gestureInit();
		this.updatePageNumber();
		document.addEventListener("backbutton", reader.backListenter);
	},
	
	backListenter : function(event)
	{
		event.stopPropagation();
		dlog("reader back event");
		if (viewer.isOpen)
			viewer.close();
		else if (wireframe.isOpen)
			reader.closeWireframe();
		else if (menu.isOpen)
			menu.closeMenu();
		else
			reader.home();
	},
	
	home : function()
	{
		document.removeEventListener("backbutton", this.home);
		reader.issue.stopDownload();
		menu.remove();
		var callback = function()
		{
			var applicationView = document.getElementById("application");
			applicationView.classList.remove("reader");
			loadComponent("newsstand", applicationView, newsstand);
		};
		
		Splash.showBackToNewstandSplash(callback);
		
	},
	
	updatePageNumber : function()
	{
		var pageNumberContainer = document.getElementById("page_number_container");
		var pageNumber = document.getElementById("page_number");
		pageNumber.innerText = this.pageNumber;
		if (this.fadeTmeout != null)
		{
			window.clearTimeout(this.fadeTmeout);
		}
		pageNumberContainer.classList.add("fade");
		this.fadeTmeout = window.setTimeout(function()
											{
												pageNumberContainer.classList.remove("fade");
												window.clearTimeout(reader.fadeTmeout);
												reader.fadeTmeout = null;
											}
											, 600);
	},
	
	updateProgessBar : function(progressValue)
	{
		var progessIndicator = document.getElementById("progress");
		progessIndicator.style.width = progressValue + "%";
	},
	
	updateSectionIcon : function()
	{
		var section = this.issue.sections[this.currentSectionIndex];
		var article = section.articles[this.currentItemIndex];
		var menu_button = document.getElementById("menubutton");
		
		if (!article)
		{
			menu_button.src = iconArray[section.title];
		}
		else
		{
			menu_button.src = iconArray[article.category[0].term];
		}
	},
	
	itemLoadDidStart : function(itemIndex, sectionIndex)
	{
		dlog("itemLoadDidStart");
		var section = this.issue.sections[sectionIndex];
		var item = section.articles[itemIndex];        
		//dlog("itemLoadDidStart : " + itemIndex +" - "+ item.title);
	},
	
	itemLoadDidFinish : function(itemIndex, sectionIndex)
	{
        dlog("itemLoadDidFinish section index = " + sectionIndex + ", item index = " + itemIndex);
		var article = this.issue.sections[sectionIndex].articles[itemIndex];
		if (article.template && article.template.sectionTemplate)
		{
			this.issue.sections[sectionIndex].sectionTemplate = true;
		}
		
        // check for article waiting for display
		if (this.waitingForArticle != null &&
			(itemIndex == this.waitingForArticle.pageIndex &&
			sectionIndex == this.waitingForArticle.sectionIndex))
		{
			this.waitingForArticle = null;
			this.loadArticle();
			this.loadNextArticle();
			this.loadPreviousArticle();
		}
		
		var section = this.issue.sections[sectionIndex];
		var item = section.articles[itemIndex];
		//dlog("itemLoadDidFinish : " + itemIndex +" - "+ item.title);
		 
		var sectionCount = this.issue.sections.length;
		var sectionProgress = Math.round(((sectionIndex) / sectionCount) * 100);
		var sectionProgressStep = Math.floor(100 / sectionCount);
		
		var sectionItemCount = section.itemCount;
		var itemProgress = (itemIndex / sectionItemCount) * sectionProgressStep;
		var progressValue = Math.round(sectionProgress + itemProgress);
		
		this.updateProgessBar(progressValue);
	},
	
	sectionLoadDidStart : function(section, index)
	{                                      
		dlog("sectionLoadDidStart");
	  //dlog("sectionLoadDidStart : " + section.title);
	},
	
	sectionLoadDidFinish : function(section, index)
	{
		dlog("sectionLoadDidFinish " + index);
	
        // check for article waiting for display
        // when start loading issue, load first articles if not loaded already
		if (this.waitingForArticle != null &&
			(index == this.waitingForArticle.sectionIndex))
		{
			this.waitingForArticle = null;
			this.loadArticle();
			this.loadNextArticle();
			this.loadPreviousArticle();
		}
        
		wireframe.addSectionItems(index);

		var sectionCount = this.issue.sections.length;
		var progressValue = Math.round(((index + 1)/ sectionCount) * 100);
		this.updateProgessBar(progressValue);
		
		var sections = document.getElementById("sections");
		var section_model = sections.getElementsByClassName("model")[0];
		var new_section = section_model.cloneNode(true);
		new_section.classList.remove("model");
		new_section.sectionIndex = index;
		
		var goToCatogry = function()
		{
			var index = this.sectionIndex;
			reader.goToCatogryAtIndex(index);
			var menu = document.getElementById("menu");
			menu.classList.remove("sections");
			menu.classList.remove("expanded");
		}
				
		new_section.onclick = goToCatogry;
		
		var title = new_section.getElementsByClassName("title")[0];
		title.innerText = i18n.getStringForId(section.title);
		if ( section.articles[0] && section.articles[0].category ) {
			var sectionInfo = section.articles[0].category[0];
			var icon = new_section.getElementsByTagName("img")[0];
			icon.src = iconArray[sectionInfo.term];
		}
		sections.appendChild(new_section);
	},
	
	sectionLoadDidFinishAtItemIndexWithError : function(section, index, itemIndex, error)
	{
		dlog("sectionLoadDidFinishWithError");
		this.failedDownloadSectionIndex = {sectionIndex: index, itemIndex: itemIndex};
	},
	
	magazineLoadDidStop : function(magazine)
	{
		dlog("magazineLoadDidStop");
		var progressBar = document.getElementById("progressbar");
		if (progressBar)
		{
			progressBar.style.display = "none";
		}
	},
	
	magazineLoadDidFinish : function(magazine)
	{
		dlog("magazineLoadDidFinish");
		var progressBar = document.getElementById("progressbar");
		progressBar.style.display = "none";
	},
	
	magazineLoadDidFinishWithError : function(issue, section, error)
	{
		var progressBar = document.getElementById("progressbar");
		progressBar.style.display = "none";
		
		if (isset(this.magazineDownloadStopped) && 
			this.magazineDownloadStopped === true)
		{
		  this.currentMagazine.resumeDownloadSections(this);
		}
		dlog("magazineLoadDidFinishWithError");
	},
	
	didDownloadFailForItem : function(indexPath)
	{
		if (this.failedDownloadSectionIndex &&
			this.failedDownloadSectionIndex.sectionIndex == indexPath.sectionIndex &&
			this.failedDownloadSectionIndex.itemIndex <= indexPath.itemIndex)
		{
			return true;
		}
		return false;
	},
	
	loadArticle : function(sectionIndex, pageIndex, place)
	{
		this.updateSectionIcon();
		
		if (sectionIndex == undefined)
		{
			sectionIndex = this.currentSectionIndex;
		}
		if (pageIndex == undefined)
		{
			pageIndex = this.currentItemIndex;
		}
		if (place == undefined)
		{
			place = document.getElementById("current");
		}
		//dlog("loadArticle currentSection = " + sectionIndex + " currentPage = " + pageIndex);
		var section = this.issue.sections[sectionIndex];
		var article = section.articles[pageIndex];
		if (article)
		{
			if (article.template.sectionTemplate)
			{
				this.displaySectionArticles(section, place);
			}
			else
				this.displayArticle(article, section, place);
		}
		else
		{
			this.displayNotReadyarticle(place);
            dlog("waitingForArticle section index = " + sectionIndex + ", page index = " + pageIndex);
			this.waitingForArticle = {sectionIndex: sectionIndex, pageIndex: pageIndex};
		}
	},
	
	displaySectionArticles : function(section, place)
	{
		var delegate =
		{
			componentDidLoad : function(component)
			{
				var newsitems = document.getElementById("newsitems");
				var model  = newsitems.getElementsByClassName("model")[0];
				var onclick = function()
				{
					var index = this.itemIndex;
					boxedArticles.openWithArticles(this.section.articles, index);
				}
				for (var i = 0; i < section.articles.length; i++)
				{
					var newNode = model.cloneNode(true);
					newNode.classList.remove("model");
					newNode.section = section;
					newNode.itemIndex = i;
					newNode.onclick = onclick;
					var article = section.articles[i];
					this.fillNode(newNode, article);
					newsitems.appendChild(newNode);
				}
			},
			
			fillNode : function(node, article)
			{
				var title = node.getElementsByClassName("title")[0];
				var pictureContainer = node.getElementsByClassName("title")[0];
				var picture = node.getElementsByTagName("img")[0];
				var content = node.getElementsByClassName("content")[0];
				
				title.innerText = article.title;
                // fix app directory name change upon update
                var url = article.customfields.corpuspro_image_url_1;
                if (url.indexOf("/") == 0) // local url
                {
                    var contentDirectoryIndex = url.indexOf(FileManager.ROOT_DIRECTORY_NAME) + FileManager.ROOT_DIRECTORY_NAME.length;
                    var newLength = url.length - contentDirectoryIndex;
                    var imagePath = url.substr(contentDirectoryIndex, newLength);
                    url = application.contentRootDirectory + imagePath;
                }
				picture.src = url;
                var articleContent = htmlDecode(article.content);
                if (window.innerHeight < 548)
                {
                    var length = 155;
                    length -= article.title.length;
                    content.innerHTML = articleContent.substr(0, length);
                }
                else if (window.innerHeight < 700)
                {
                    var length = 190;
                    length -= article.title.length;
                    content.innerHTML = articleContent.substr(0, length);
                }
                else
                {
                    var length = 370;
                    length -= article.title.length;
                    content.innerHTML = articleContent.substr(0, length);
                }
			}
		};
		loadComponent("templates/templateNews", place, delegate, true);
	},
	
	displayNotReadyarticle : function(place)
	{
		var delegate =
		{
			componentDidLoad : function(component)
			{
				var picture = place.getElementsByClassName("main_picture")[0];
                
				if (picture)
                {
                    picture.onload = function(event)
                    {
                        centerImage(this);
                    }
					picture.src = "images/signin_background.png";
                }

                if (place.classList.contains("hasMedia"))
                    place.classList.remove("hasMedia");
            
                if (place.classList.contains("hasChildren"))
                    place.classList.remove("hasChildren");
			}
		};
		loadComponent("templates/cover", place, delegate, true);
	},
	
	displayArticle : function(article, section, place)
	{
		// select the template here to be sure whatever the application version which had store the data
		// we get the right template parameters
		var template = tabTemplates[article.customfields.corpuspro_template_id];
		var delegate =
		{
			componentDidLoad : function(component)
			{
				var title = place.getElementsByClassName("article_title")[0];
				var summary = place.getElementsByClassName("article_summary")[0];
				var content = place.getElementsByClassName("article_content")[0];
				var regexp = "[0-9]+/[0-9]+$";
				var isANext = article.title.search(regexp) != -1;
				
				if (article.media && article.media.length)
				{
					place.classList.add("hasMedia");
				}
				else
				{
					if (place.classList.contains("hasMedia"))
						place.classList.remove("hasMedia");
				}
				
				if (article.children && article.children.length)
				{
					place.classList.add("hasChildren");
				}
				else
				{
					if (place.classList.contains("hasChildren"))
						place.classList.remove("hasChildren");
				}

				if (title && template.header)
				{
					if (isANext == false)
					{
						title.innerText = article.title;
					}
				}
				if (summary)
				{
					if (isANext == false)
					{
						summary.innerHTML = article.description;
					}
				}
				if (content)
				{
					//var div = document.createElement("div");
					content.innerHTML = article.content;
					var articleView = place.getElementsByClassName("article")[0];
					var fontSizeStart = 100;
					var handleGestureStart = function(event)
					{
						var fontsizeString = articleView.style.fontSize;
						if (fontsizeString.length > 2)
						{
							var index = fontsizeString.indexOf("%");
							fontSizeStart = fontsizeString.substring(0, index);
						}
						
					};
					
					var handleGestureChange = function(event)
					{
						var newFontsize = 100;
						if (event.gesture.scale > 1)
							newFontsize = Math.round(fontSizeStart * event.gesture.scale);
						else
							newFontsize = Math.round(fontSizeStart * event.gesture.scale);
	
							dlog("scale : " + event.gesture.scale + " ratio : " + newFontsize);
						if (newFontsize >= 100 && newFontsize < 151)
							articleView.style.fontSize = newFontsize + "%";
					};
					
					Hammer(articleView).on("transformstart", handleGestureStart);
					Hammer(articleView).on("transform", handleGestureChange);
					//articleView.addEventListener("gesturestart", handleGestureStart);
					//articleView.addEventListener("gesturechange", handleGestureChange);
				}
				
				var mediaIsVideo =
					article.customfields.corpuspro_image_url_1.indexOf(".mp4") != -1 ||
					article.customfields.corpuspro_image_url_1.indexOf(".mov") != -1
				if (mediaIsVideo)
				{
					place.classList.add("video");
					var url = article.customfields.corpuspro_image_url_1;
					var extension = url.substr(url.length - 3, url.length);
					var type = "video/";
					if (extension == "mov")
					{
						type += "quicktime"
					}
					else
					{
						type += extension;
					}
					var video = place.getElementsByClassName("main_video")[0];
					var video_source = place.getElementsByClassName("main_video_source")[0];
					if (video)
					{
						video_source.type = type;
						video_source.src = article.customfields.corpuspro_image_url_1;
						video.load();
					}
				}
				else
				{
					place.classList.remove("video");
					var picture = place.getElementsByClassName("main_picture")[0];
					if (picture)
					{
						picture.onload = function(event)
						{
							centerImage(this);
						}
                        
                        // fix app directory name change upon update
                        var url = article.customfields.corpuspro_image_url_1;
                        if (url.indexOf("/") == 0) // local url
                        {
                            var contentDirectoryIndex = url.indexOf(FileManager.ROOT_DIRECTORY_NAME) + FileManager.ROOT_DIRECTORY_NAME.length;
                            var newLength = url.length - contentDirectoryIndex;
                            var imagePath = url.substr(contentDirectoryIndex, newLength);
                            url = application.contentRootDirectory + imagePath;
                        }
						picture.src = url;
                        
						if (article.media && article.media.length)
						{
							//picture.addEventListener("click", reader.openViewer);
						}
						
						if (article.customfields.corpuspro_extra_url
							&& article.customfields.corpuspro_extra_url.length > 0)
						{
							picture.addEventListener("click", function(){window.open(article.customfields.corpuspro_extra_url);});
						}
					}
				}
				
				if (article.customfields.corpuspro_image_url_2 &&
					article.customfields.corpuspro_image_url_2.length > 0)
				{
					var picture = place.getElementsByClassName("second_picture")[0];
					if (picture)
					{
                        // fix app directory name change upon update
                        var url = article.customfields.corpuspro_image_url_2;
                        if (url.indexOf("/") == 0) // local url
                        {
                            var contentDirectoryIndex = url.indexOf(FileManager.ROOT_DIRECTORY_NAME) + FileManager.ROOT_DIRECTORY_NAME.length;
                            var newLength = url.length - contentDirectoryIndex;
                            var imagePath = url.substr(contentDirectoryIndex, newLength);
                            url = application.contentRootDirectory + imagePath;
                        }
						picture.src = url;
					}
				}
			}
		};
		loadComponent("templates/" + template.component, place, delegate, true);
	},
	
	stopCurrentVideo : function()
	{
		if (this.current_video == null)
		{
			return;
		}
		
		this.current_video.pause();
		this.current_video = null;
	},
	
	loadNextArticle : function()
	{
		var place = document.getElementById("next");
		this.loadArticle(this.nextSectionIndex, this.nextItemIndex, place);
	},
	
	loadPreviousArticle : function()
	{
		var place = document.getElementById("previous");
		this.loadArticle(this.previousSectionIndex, this.previousItemIndex, place);
	},
	
	goToCatogryAtIndex : function(index)
	{
		this.goToArticle(index, 0);
	},
	
	goToArticle : function(sectionIndex, itemIndex)
	{
		this.currentSectionIndex = sectionIndex;
		this.currentItemIndex = itemIndex;
		this.loadArticle();
		
		var readerView = document.getElementById("reader");
		readerView.classList.add("animated_button");
		
		if (this.issue.sections[this.currentSectionIndex].sectionTemplate)
		{
			this.nextSectionIndex = sectionIndex + 1;
			this.nextItemIndex = 0;
			this.loadNextArticle();
			
			this.previousSectionIndex = sectionIndex - 1;
			this.previousItemIndex = this.issue.sections[this.previousSectionIndex].itemCount - 1;
			this.loadPreviousArticle();
		}
		else
		{
			// if the current section have more articles
			if (itemIndex < this.issue.sections[this.currentSectionIndex].itemCount)
			{
				this.nextSectionIndex = this.currentSectionIndex;
				this.nextItemIndex = 1;
				this.loadNextArticle();
			}
			// else if we are not on the last section of the issue and the section have articles
			else if (this.issue.sections[this.currentSectionIndex + 1] &&
					 this.issue.sections[this.currentSectionIndex + 1].itemCount > 0)
			{
				this.nextSectionIndex = this.currentSectionIndex + 1;
				this.nextItemIndex = 0;
				this.loadNextArticle();
			}
			if (itemIndex < 0)
			{
				this.previousSectionIndex = this.currentSectionIndex;
				this.previousItemIndex = 0;
				this.loadPreviousArticle();
			}
			// if a previous section exists, and have at least one article
			else if (this.issue.sections[this.currentSectionIndex - 1] &&
					 this.issue.sections[this.currentSectionIndex].itemCount > 0)
			{
				this.previousSectionIndex = this.currentSectionIndex - 1;
				this.previousItemIndex = this.issue.sections[this.previousSectionIndex].itemCount - 1;
				this.loadPreviousArticle();
			}
		}
		
		var pageNumber = 0
		for (var i = 0; i < sectionIndex; i++)
		{
			if (this.issue.sections[i].sectionTemplate)
				pageNumber += 1
			else
				pageNumber += this.issue.sections[i].itemCount;
		}
		
		this.pageNumber = pageNumber + itemIndex + 1;
		this.updatePageNumber();
		
		if(readerView.classList.contains("viewer"))
		{
			viewer.close();
		}
		
		//dlog("go to section (" + this.pageNumber+")");
		//dlog("previous section = " + this.previousSectionIndex + " , previsous item = " + this.previousItemIndex);
		//dlog("current section = " + this.currentSectionIndex + " , current item = " + this.currentItemIndex);
		//dlog("next section = " + this.nextSectionIndex + " , next item = " + this.nextItemIndex);
	},
	
	isAtTheBeginingOfTheIssue : function()
	{
		var firstSectionIndex = 0;
		var firstArticleIndex = 0;
		if (this.currentSectionIndex <= firstSectionIndex &&
			this.currentItemIndex <= firstArticleIndex)
		{
			return (true);
		}
		return (false);
	},
	
	isAtTheEndOfTheIssue : function()
	{
		var lastSectionIndex = this.issue.sections.length - 1;
		var lastArticleIndex = this.issue.sections[lastSectionIndex].itemCount - 1;
		if (this.currentSectionIndex >= lastSectionIndex &&
			this.currentItemIndex >= lastArticleIndex)
		{
			return (true);
		}
		return (false);
	},
	
	next : function()
	{
		var current = document.getElementById("current");
		var next = document.getElementById("next");
		var previous = document.getElementById("previous");
		
		if ((this.pageNumber + 1) < this.articleCount)
		{
			this.pageNumber += 1;
			this.updatePageNumber();
		}
		
		this.previousItemIndex = this.currentItemIndex;
		this.previousSectionIndex = this.currentSectionIndex;
		this.currentItemIndex = this.nextItemIndex;
		this.currentSectionIndex = this.nextSectionIndex;

		var sections = this.issue.sections;
		var section = sections[this.currentSectionIndex];
		var articles = section.articles;
		
		// previous section template is news
		if (this.currentItemIndex == 0 &&
			this.issue.sections[this.currentSectionIndex - 1] &&
			this.issue.sections[this.currentSectionIndex - 1].sectionTemplate)
		{
			this.previousItemIndex = 0;
		}
		
		// next page same section
		var nextSectionIndex = this.currentSectionIndex;
		var nextItemIndex = this.nextItemIndex;
		
		// end of the section
		if ((nextItemIndex) >= section.itemCount - 1)
		{
			// next section first page
			nextSectionIndex = this.currentSectionIndex + 1;
			nextItemIndex = 0;
			
			// end of the issue
			if (!this.issue.sections[nextSectionIndex])
			{
				return;
			}
			
			// if the new section is a section template, set the index to last article index of the section
			// to pass the following section when next method will be called again
			if (this.issue.sections[nextSectionIndex].sectionTemplate)
			{
				nextItemIndex = this.issue.sections[nextSectionIndex].itemCount - 1;
			}
		}
		else
			nextItemIndex += 1;
		
		// if the next item has not been download
		// TODO : /!\ we don't handle the case where it's the second page load faile
		//var indexPath = {sectionIndex: nextSectionIndex, itemIndex: nextItemIndex};
		//if (this.didDownloadFailForItem(indexPath))
		//{
		//	return;
		//}
		
		
		// set next section and articles indexes
		this.nextSectionIndex = nextSectionIndex;
		this.nextItemIndex = nextItemIndex;
		
		dlog("next (" + this.pageNumber+")");
		dlog("previous section = " + this.previousSectionIndex + " , previsous item = " + this.previousItemIndex);
		dlog("current section = " + this.currentSectionIndex + " , current item = " + this.currentItemIndex);
		dlog("next section = " + this.nextSectionIndex + " , next item = " + this.nextItemIndex);

		this.loadNextArticle();
	},
	
	previous : function()
	{
		var current = document.getElementById("current");
		var next = document.getElementById("next");
		var previous = document.getElementById("previous");
		
		if ((this.pageNumber - 1) > 0 )
		{
			this.pageNumber -= 1;
			this.updatePageNumber();
		}

		this.nextItemIndex = this.currentItemIndex;
		this.nextSectionIndex = this.currentSectionIndex;
		this.currentItemIndex = this.previousItemIndex;
		this.currentSectionIndex = this.previousSectionIndex;
		
		// next section template is news
		if (this.issue.sections[this.currentSectionIndex + 1] &&
			this.currentItemIndex == this.issue.sections[this.currentSectionIndex + 1].itemCount - 1 &&
			this.issue.sections[this.currentSectionIndex + 1].sectionTemplate)
		{
			this.nextItemIndex = this.issue.sections[this.currentSectionIndex + 1].itemCount - 1;
		}
		
		// previous article same section
		var previousSectionIndex = this.currentSectionIndex;
		var previousItemIndex = this.previousItemIndex;
		
		if (this.currentItemIndex == 0)
		{
			// previous section last page
			previousSectionIndex = this.currentSectionIndex - 1;
			
			if (!this.issue.sections[previousSectionIndex])
			{
				return;
			}
			
			var sections = this.issue.sections;
			var section = sections[previousSectionIndex];
			previousItemIndex = section.itemCount - 1;
			
			// we are on a section template
			if (this.issue.sections[previousSectionIndex].sectionTemplate)
			{
				previousItemIndex = 0;
			}
		}
		else
			previousItemIndex -= 1;
		
		// update previous indexes
		this.previousSectionIndex = previousSectionIndex;
		this.previousItemIndex = previousItemIndex;
		
		dlog("previous (" + this.pageNumber+")");
		dlog("previous section = " + this.previousSectionIndex + " , previsous item = " + this.previousItemIndex);
		dlog("current section = " + this.currentSectionIndex + " , current item = " + this.currentItemIndex);
		dlog("next section = " + this.nextSectionIndex + " , next item = " + this.nextItemIndex);

		this.loadPreviousArticle();
	},
	
	buttonNext : function()
	{
		var readerView = document.getElementById("reader");
		readerView.classList.remove("edge");
		readerView.classList.remove("next");
		readerView.classList.remove("previous");
		this.next();
	},
	
	buttonPrevious : function()
	{
		var readerView = document.getElementById("reader");
		readerView.classList.remove("edge");
		readerView.classList.remove("next");
		readerView.classList.remove("previous");
		this.previous();
	},
	
	gestureInit : function()
	{
		var readerView = document.getElementById("reader");
		var menuView = document.getElementById("menu");
		var articlesView = document.getElementById("articles");
		var threshold = 5;
		var startX = 0;
		var startY = 0;
		var endX = 0;
		var endY = 0;
		var hasMoved = false;
		
		var current = null;
		var next = null;
		var previous = null;
		
		var isAtTheBeginning = true;
		var isAtTheEnd = false;
		var thereIsNoNextPage = false;
		
		var isThereANextPage = function ()
		{
			var indexPath = {sectionIndex: reader.nextSectionIndex, itemIndex: reader.nextItemIndex}
			return (reader.didDownloadFailForItem(indexPath));
		}
		
		var handleMouseDown = function(event)
		{
			articlesView.removeEventListener("mousedown", handleMouseDown);
			articlesView.removeEventListener("touchstart", handleMouseDown);
			
			if (!event.touches)
			{
				event.preventDefault();
				event.stopPropagation();
			}
			
			readerView.classList.remove("animMoveBack");
			readerView.classList.remove("next");
			readerView.classList.remove("previous");
			
			reader.closeWireframe();
			menu.closeSections();
			menu.closeMenu();
			
			current = document.getElementById("current");
			next = document.getElementById("next");
			previous = document.getElementById("previous");

			current.classList.remove("animMoveBack");
			next.classList.remove("animMoveBack");
			
			reader.current_video = current.getElementsByTagName("video")[0];
			
			isAtTheBeginning = reader.isAtTheBeginingOfTheIssue();
			isAtTheEnd = reader.isAtTheEndOfTheIssue();
			
			startX = event.touches ? event.touches[0].clientX : event.clientX;
			startY = event.touches ? event.touches[0].clientY : event.clientY;
			if (event.touches)
			{
				readerView.addEventListener("touchend", handleMouseUp);
				readerView.addEventListener("touchmove", handleMouseMove);
			}
			else
			{
				readerView.addEventListener("mouseup", handleMouseUp);
				readerView.addEventListener("mousemove", handleMouseMove);
			}
		};
		
		var handleMouseMove= function(event)
		{
			endX = event.touches ? event.touches[0].clientX : event.clientX;
			endY = event.touches ? event.touches[0].clientY : event.clientY;
			var diffX = endX - startX;
			var diffY = endY - startY;
			if (Math.abs(diffY) > threshold && hasMoved == false)
			{
				readerView.removeEventListener("mousemove", handleMouseMove, true);
				readerView.removeEventListener("mouseup", handleMouseUp, true);
				readerView.removeEventListener("touchmove", handleMouseMove, true);
				readerView.removeEventListener("touchend", handleMouseUp, true);
				hasMoved = false;
				startX = 0;
				startY = 0;
				return;
			}
			if (Math.abs(diffX) > threshold)
			{
				event.preventDefault();
				event.stopPropagation();
				
				if (!hasMoved)
				{
					hasMoved = true;
					
					// remove button animation if there is a page change
					readerView.classList.remove("animated_button");
				}
				var width = window.innerWidth;
				// move backward
				if (diffX > 0)
				{
					if (isAtTheBeginning == false)
						current.style.webkitTransform = "translate3d("+ diffX + "px, 0, 0)";
					else
						readerView.style.webkitTransform = "translate3d("+ diffX +"px, 0, 0)";
				}
				// move forward
				else
				{
					if (isAtTheEnd == false && thereIsNoNextPage == false)
						next.style.webkitTransform = "translate3d("+(width + diffX)+"px, 0, 0)";
					else
						readerView.style.webkitTransform = "translate3d("+ diffX +"px, 0, 0)";
				}
			}
		};
		
		var handleMouseUp = function(event)
		{
			readerView.removeEventListener("mousemove", handleMouseMove);
			readerView.removeEventListener("mouseup", handleMouseUp);
			readerView.removeEventListener("touchmove", handleMouseMove);
			readerView.removeEventListener("touchend", handleMouseUp);
			menuView.style.webkitTransform = "";
			var diffX = endX - startX;
			var diffY = endY - startY;
			var changePageThreshold = Math.round(window.innerHeight / 8);
			if (hasMoved && Math.abs(diffX) > 100)
			{
				event.preventDefault();
				event.stopPropagation();
				
				// move backward
				if (diffX > 0)
				{
					//readerView.classList.add("previous");
		
					// at the beginning of the issue
					if (isAtTheBeginning)
					{
						readerView.classList.add("animMoveBack");
						readerView.style.webkitTransform = "";
					}
					else
					{
						current.classList.add("animMoveBack");
						previous.id = "current";
						current.id = "next";
						current.style.webkitTransform = "";
						next.id = "previous";
						reader.previous();
					}
				}
				// moved forward
				else
				{
					//readerView.classList.add("next");
					
					// at the end of the issue
					if (isAtTheEnd || thereIsNoNextPage)
					{
						readerView.classList.add("animMoveBack");
						readerView.style.webkitTransform = "";
					}
					else
					{
						next.classList.add("animMoveBack");
						next.id = "current";
						next.style.webkitTransform = "";
						current.id = "previous";
						previous.id = "next";
						reader.next();
					}
				}
				readerView.classList.add("animated_button");
				reader.stopCurrentVideo();
				boxedArticles.close();
			}
			else
			{
				// move backward
				if (diffX > 0)
				{
					// at the beginning of the issue
					if (isAtTheBeginning)
					{
						readerView.classList.add("animMoveBack");
						readerView.style.webkitTransform = "";
					}
					else
					{
						current.style.webkitTransform = "";
						current.classList.add("animMoveBack");
					}
				}
				// moved forward
				else
				{
					// at the end of the issue
					if (isAtTheEnd || thereIsNoNextPage)
					{
						readerView.classList.add("animMoveBack");
						readerView.style.webkitTransform = "";
					}
					else
					{
						next.style.webkitTransform = "";
						next.classList.add("animMoveBack");
					}
				}
			}
			
			startX = 0;
			startY = 0;
			hasMoved = false;
			current = null;
			next = null;
			previous = null;
			
			thereIsNoNextPage = isThereANextPage();
	
			articlesView.addEventListener("mousedown", handleMouseDown);
			articlesView.addEventListener("touchstart", handleMouseDown);
		};
	
		articlesView.addEventListener("mousedown", handleMouseDown);
		articlesView.addEventListener("touchstart", handleMouseDown);
	},
	
	openViewer : function()
	{
		var article = reader.issue.sections[reader.currentSectionIndex].articles[reader.currentItemIndex];
		viewer.open(article.media);
	},
	
	openWireframe : function()
	{
		var readerView = document.getElementById("reader");
		if(readerView.classList.contains("viewer"))
		{
			var viewerView = document.getElementById("viewer");
			viewerView.classList.add("wireframe");
		}
		else
		{
			readerView.classList.add("wireframe");
		}
	},
	
	closeWireframe : function()
	{
		var readerView = document.getElementById("reader");
		if(readerView.classList.contains("viewer"))
		{
			var viewerView = document.getElementById("viewer");
			viewerView.classList.remove("wireframe");
		}
		else
		{
			readerView.classList.remove("wireframe");
		}
	},
	
	toogleWireframe : function()
	{
		var readerView = document.getElementById("reader");
		if(readerView.classList.contains("viewer"))
		{
			var viewerView = document.getElementById("viewer");
			viewerView.classList.toggle("wireframe");
		}
		else
		{
			readerView.classList.toggle("wireframe");
		}
	},
	
	openBoxedArticles : function()
	{
		var article = this.issue.sections[this.currentSectionIndex].articles[this.currentItemIndex];
		if (article.children && article.children.length)
		{
			boxedArticles.openWithArticles(article.children);
		}
	}
};

var menu =
{
	isOpen : false,
	
	toggleMenu : function()
	{
		var menu = document.getElementById("menu");
		menu.classList.toggle("expanded");
		this.isOpen = !this.iOpen;
	},
	
	closeMenu : function()
	{
		this.closeSections();
		var menu = document.getElementById("menu");
		menu.classList.remove("expanded");
		this.isOpen = false;
	},
	
	initButtons : function()
	{
		var homeButton = document.getElementById("gohome");
		homeButton.addEventListener("click", reader.home);
		
		var sectionButton = document.getElementById("showsections");
		sectionButton.addEventListener("click", menu.toggleSections);
		
		var wireframeButton = document.getElementById("showwireframe");
		wireframeButton.addEventListener("click", reader.toogleWireframe);
		
		var helpButton = document.getElementById("showhelp");
		helpButton.addEventListener("click", function(event){help.presentModalView(true);});
	},
	
	remove : function()
	{
		var homeButton = document.getElementById("gohome");
		homeButton.removeEventListener("click", reader.home);
		
		var sectionButton = document.getElementById("showsections");
		sectionButton.removeEventListener("click", menu.toggleSections);
		
		var wireframeButton = document.getElementById("showwireframe");
		wireframeButton.removeEventListener("click", reader.toogleWireframe);
		
		var helpButton = document.getElementById("showhelp");
		helpButton.removeEventListener("click", function(event){help.presentModalView(true);});
	},
	
	init : function()
	{
		this.initButtons();
		
		dlog("menu gesture init");		
		
		var menuView = document.getElementById("menu");
		var menubutton = document.getElementById("menubutton");
		var readerView = document.getElementById("reader");
		var threshold = 50;
		var startX = 0;
		var startY = 0;
		var endX = 0;
		var endY = 0;
		var hasMoved = false;
		var handleMouseDown = function(event)
		{
			/*
			menubutton.removeEventListener("mousedown", handleMouseDown);
			menubutton.removeEventListener("touchstart", handleMouseDown);
			*/
			
			dlog("menu mouse down");
			
			if (!event.touches)
			{
				event.preventDefault();
				event.stopPropagation();
			}
			
			startX = event.touches ? event.touches[0].clientX : event.clientX;
			startY = event.touches ? event.touches[0].clientY : event.clientY;
			/*if (event.touches)
			{*/
				readerView.addEventListener("touchend", handleMouseUp);
				readerView.addEventListener("touchmove", handleMouseMove);
				/*}
			else
			{
				readerView.addEventListener("mouseup", handleMouseUp);
				readerView.addEventListener("mousemove", handleMouseMove);
			}*/
		};
		
		var handleMouseMove= function(event)
		{
			endX = event.touches ? event.touches[0].clientX : event.clientX;
			endY = event.touches ? event.touches[0].clientY : event.clientY;
			var diffX = endX - startX;
			var diffY = endY - startY;
			menuView.style.webkitTransform = "translate3d("+diffX+"px, "+ diffY +"px, 0)";
			if (Math.abs(diffX) > threshold || Math.abs(diffY) > threshold)
			{
				hasMoved = true;
			}
		};
		
		var handleMouseUp = function(event)
		{
			//readerView.removeEventListener("mousemove", handleMouseMove);
			//readerView.removeEventListener("mouseup", handleMouseUp);
			readerView.removeEventListener("touchmove", handleMouseMove);
			readerView.removeEventListener("touchend", handleMouseUp);
			menuView.style.webkitTransform = "";
			var diffX = endX - startX;
			var diffY = endY - startY;
			var position = "";
			var lastPosition = menuView.className.split("_");
			if (hasMoved)
			{
				if (Math.abs(diffY) > threshold)
				{
					if (diffY > 0)
					{
						position += "bottom";
					}
					else
					{
						position += "top";
					}
				}
				else
				{
					position += lastPosition[0];
				}
				
				position += "_";
				
				if (Math.abs(diffX) > threshold)
				{
					if (diffX > 0)
					{
						position += "right";
					}
					else
					{
						position += "left";
					}
				}
				else
				{
					position += lastPosition[1];
				}
				menuView.className = position;
			}
			else
			{
				menu.toggleMenu();
			}
			startX = 0;
			startY = 0;
			hasMoved = false;
			
			/*
			menubutton.addEventListener("mousedown", handleMouseDown);
			menubutton.addEventListener("touchstart", handleMouseDown);
			*/
		};
		
		//menubutton.addEventListener("mousedown", handleMouseDown);
		menubutton.addEventListener("touchstart", handleMouseDown);
	},
	
	toggleSections : function()
	{
		var menu = document.getElementById("menu");
		menu.classList.toggle("sections");
	},
	
	closeSections : function()
	{
		var menu = document.getElementById("menu");
		menu.classList.remove("sections");
	},
}

var wireframe =
{
	wireFrameView : null,
	wireFrameItems : null,
	model : null,
	pageCount : 0,
	
	init : function()
	{
		this.pageCount = 0;
		this.wireFrameView = document.getElementById("wireframe");
		this.wireFrameItems = document.getElementById("wireframeitems");
		this.model = this.wireFrameItems.getElementsByClassName("model")[0];
	},
	
	// sections are always load in the right order
	addSectionItems : function(sectionIndex)
	{
		var section = reader.issue.sections[sectionIndex];
		for (var itemIndex = 0; itemIndex < section.articles.length; itemIndex++)
		{
		  this.addItem(sectionIndex, itemIndex);
		}
		
		var item = this.wireFrameItems.getElementsByClassName("wireframeitem")[1];
		var itemWidth = item.clientWidth + (item.offsetLeft * 2);
		this.wireFrameItems.style.width = (itemWidth * this.pageCount) + "px";
	},
	
	addItem : function(sectionIndex, itemIndex)
	{
		if (reader.issue.sections[sectionIndex].sectionTemplate && itemIndex > 0)
		{
			return;
		}
		var article =  reader.issue.sections[sectionIndex].articles[itemIndex];
		var item = this.model.cloneNode(true);
		item.classList.remove("model");
		item.sectionIndex = sectionIndex;
		item.itemIndex = itemIndex;
		
		
		var pageNumber = item.getElementsByClassName("pagenumber")[0];
		pageNumber.innerText = this.pageCount + 1;
		
		var image = item.getElementsByTagName("img")[0];
		if (article.customfields.corpuspro_image_url_1 &&
			article.customfields.corpuspro_image_url_1.length > 0 &&
			article.customfields.corpuspro_image_url_1.indexOf(".mp4") == -1 &&
			article.customfields.corpuspro_image_url_1.indexOf(".mov") == -1)
		{
			if (article.thumbnailURL && 
					article.thumbnailURL['corpuspro_image_url_1'])
			{
				image.src = article.thumbnailURL['corpuspro_image_url_1'];
			}
			else
				image.src = article.customfields.corpuspro_image_url_1;
		}
		else
		{
			image.src = "images/signin_background.png";
		}

		item.addEventListener("click", wireframe.onclickhandler);
		//item.style.webkitTransform = "translate3d("+this.pageCount+"00%, 0, 0)";
		this.wireFrameItems.appendChild(item);
		
		this.pageCount += 1;
	},
	
	onclickhandler : function()
	{
		reader.goToArticle(this.sectionIndex, this.itemIndex);
		reader.closeWireframe();
	}
}

var boxedArticles =
{
	articles : null,
	currentItemIndex : 0,
	parent: null,
	
	openWithArticles : function(articles, index, parent)
	{
		this.articles = articles;
		if (index)
		{
			this.loadArticle(index);
		}
		else
			this.loadArticle(0);
		if (!parent)
		{
			this.parent = document.getElementById("reader");
		}
		else
			this.parent = parent;
		this.parent.classList.add("boxed_article");
	},
	
	close : function()
	{
		if (this.parent == null)
		{
			return;
		}
		
		this.parent.classList.remove("boxed_article");
		this.currentItemIndex = 0;
		this.articles = null;
		this.parent = null;
	},
	
	loadArticle : function(index)
	{
		var boxedArticleView = document.getElementById("boxed_articles");
		var title = boxedArticleView.getElementsByClassName("title")[0];
		var content = boxedArticleView.getElementsByClassName("content")[0];
		
		var article = this.articles[index];
		
		title.innerText = article.title;
		content.innerHTML = article.content;
		
		content.parentNode.scrollTop = 0;
		
		this.currentItemIndex = index;

		var previous_button = boxedArticleView.getElementsByClassName("previous_button")[0];
		if (this.currentItemIndex == 0)
		{
			previous_button.classList.add("disable");
		}
		else
		{
			previous_button.classList.remove("disable");
		}

		var next_button = boxedArticleView.getElementsByClassName("next_button")[0];
		if (this.currentItemIndex >= this.articles.length - 1)
		{
			next_button.classList.add("disable");
		}
		else
		{
			next_button.classList.remove("disable");
		}
	},
	
	next : function()
	{
		if (this.currentItemIndex >= this.articles.length)
		{
			return;
		}
		
		this.loadArticle(this.currentItemIndex + 1);
	},
	
	previous : function()
	{
		if (this.currentItemIndex <= 0)
		{
			return;
		}
		
		this.loadArticle(this.currentItemIndex - 1);
	}
};

function centerImage (image)
{
	var parent = image.parentNode;
	if (!parent)
	{
		return;
	}
	var offsetx = (parent.clientWidth - image.width) / 2;
	var offsety = (parent.clientHeight - image.height) / 2;
	//image.style.left = offsetx + "px";
	image.style.webkitTransform = "translate3d(0, " + offsety + "px, 0)";
}


function readerInitText()
{
	document.getElementById("reader_help_page1").style.backgroundImage = "url('" + i18n.getStringForId("reader_help_page1") + "')";
	document.getElementById("help_content_page_2").innerHTML = i18n.getStringForId("help_page_2");	
}

var tabbar =
{
	current_tab : null,
	
	goToNewsStand : function()
	{
		this.goTo("newsstand");
	},
	
	goToNews : function()
	{
		this.goTo("news");
	},
	
	goToLogin : function()
	{
		this.goTo("login");
	},
	
	goToHelp : function()
	{
		this.goTo("help");
	},
	
	goTo : function(tab)
	{
		if (this.current_tab == tab)
		{
			return;
		}
		
		if (this.current_tab == "help")
		{
			help.hide();
		}
		
		if (this.current_tab == "login")
		{
			settings.hideLoginDialog();
		}
		
		if (this.tab == "login")
		{
			settings.showLoginDialog();
		}
		
		var applicationView = document.getElementById("application");
		applicationView.classList.add(tab);
		if (this.current_tab != null)
		{
			applicationView.classList.remove(this.current_tab);
		}
		this.current_tab = tab;
	}
}

/**
 *
 * This component manage the newsstand display and actions
 * - load issues
 * - launch issue read
 * - handle to download events
 * - handle issue purchase event
 *
 **/
var newsstand =
{
	/**
	 * access to the issue datas
	 * @type Magazines
	 **/
	magazines : new Magazines(newsstand),
	
	/**
	 * Reference on the HTML issue list
	 * As we access it often, cache the reference
	 * @type HTMLElement
	 **/
	magazineViews : null,
	
	/**
	 * The current selected issue
	 * The issue @ the center of the screen
	 * Start at one because of the model/template issue whitch is the first of the list but not displayed (ie. display=none)
	 * @type int
	 **/
	currentIssueIndex : 1,

	/**
	 *  gesture flag
	 *  whether the gestures management has been added to the issue list
	 *  @type bool
	 **/
	// because the newsstand object exists even if the newsstand component is not load
	// we have to keep track of the state of the gesture init
	gestureIsSet: false,
	
    /**
     *
     */
    issueViews: null,
    
    /**
     *
     */
    imageSize: null,
    
    /**
     *
     */
    issueWidth: null,
		
    /**
     *
     */
    spinner: null,
    
    
	loadMagazines : function()
	{
		tabbar.goToNewsStand();
		var newsstand = document.getElementById("newsstand");
		var wrapper = newsstand.getElementsByClassName("wrapper")[0];
		newsstand.classList.add("loading");
		var opts = {
		  lines: 13, // The number of lines to draw
		  length: 20, // The length of each line
		  width: 10, // The line thickness
		  radius: 30, // The radius of the inner circle
		  corners: 1, // Corner roundness (0..1)
		  rotate: 0, // The rotation offset
		  direction: 1, // 1: clockwise, -1: counterclockwise
		  color: '#FFF', // #rgb or #rrggbb or array of colors
		  speed: 1, // Rounds per second
		  trail: 60, // Afterglow percentage
		  shadow: false, // Whether to render a shadow
		  hwaccel: false, // Whether to use hardware acceleration
		  className: 'spinner', // The CSS class to assign to the spinner
		  zIndex: 2e9, // The z-index (defaults to 2000000000)
		};
		this.spinner = new Spinner(opts).spin();
		wrapper.appendChild(this.spinner.el);
		
		this.magazines.loadMagazines(this);
	},
	
	componentDidLoad : function()
	{
        this.issueViews = [];
		newsstandInitText();
		// when the component is load, reset the gesture flag
		this.gestureIsSet = false;
		
		this.loadMagazines();
		news.load();
		
		if (JetSkiApp.isTablet())
		{
			var newsstand = document.getElementById("newsstand");
			newsstand.classList.add("library");
		}
	},
	
	addDownloadListener : function()
	{
		downloadQueue.addListener("queue", this);
		downloadQueue.addListener("magazineDelete", this);
		downloadQueue.addListener("magazineDownload", this);
		downloadQueue.addListener("sectionDownload", this);
		downloadQueue.addListener("itemDownload", this);
		downloadQueue.addListener("itemGalleryImageDownload", this);
	},
	
	removeDownloadListener : function()
	{
		library.removeDownloadListener();
		downloadQueue.removeListener("queue", this);
		downloadQueue.removeListener("magazineDownload", this);
		downloadQueue.removeListener("magazineDelete", this);
		downloadQueue.removeListener("sectionDownload", this);
		downloadQueue.removeListener("itemDownload", this);
		downloadQueue.removeListener("itemGalleryImageDownload", this);
	},
	
	magazinesLoadDidFinish : function()
	{
		this.spinner.stop();
		
		var count = magazines.count();
		
		var newsstandView = document.getElementById("newsstand");
		if (count == 0)
		{
			newsstandView.classList.add("no_content");
			return;
		}
		else
		{
			newsstandView.classList.remove("no_content");
		}
		
		for (var i = 0; i < count; i++)
		{
			var magazine = this.magazines.getMagazineAtIndex(i);
		}
		
		var issue = this.magazines.magazineArray[this.currentIssueIndex - 1];
		var buttons = document.getElementById("newsstand_buttons");
		if (issue.purchased)
		{
			buttons.classList.add("purchased");
		}
		else
		{
			buttons.classList.remove("purchased");
		}
		
		this.updateButtons();
		this.updateDisplay();
		this.addDownloadListener();

		if (newsstand.currentIssueIndex != 1)
		{
			var newsstandView = document.getElementById("newstand_issues");
			var issueList = newsstandView.getElementsByClassName("issue");
			var issueWidth = issueList[1].clientWidth / 2;
			var currentIssue = issueList[newsstand.currentIssueIndex];
			var half_screen = window.innerWidth / 2;
			var scroll = half_screen - currentIssue.offsetLeft - issueWidth;
			newsstandView.style.webkitTransform = "translate3d("+ (scroll) + "px, 0, 0)";
		}
		
		// init library for tablet only
		if (JetSkiApp.isTablet())
			library.init();
		downloadQueue.resume();
	},
	
	updateButtons : function()
	{
		var issue = this.magazines.magazineArray[this.currentIssueIndex - 1];
		var buttons = document.getElementById("newsstand_buttons");
		if (issue.purchased)
		{
			buttons.classList.add("purchased");
		}
		else
		{
			buttons.classList.remove("purchased");
			var price = document.getElementById("buy_button_price");
			if (price)
				price.innerHTML = issue.price;
		}
	},
	
	updateDisplay : function()
	{
		var issues = this.magazines.magazineArray;
		var htmlIssueViewList = document.getElementById("newstand_issues");
		if (!htmlIssueViewList)
		{
			return;
		}
		
		// set the with long enough to display all the issues in line
		htmlIssueViewList.style.width = (issues.length * 100)+ "%";
		
		var issue_model = htmlIssueViewList.getElementsByClassName("model")[0];
		
		var delete_buttonOnClick = function deleteIssue()
		{
			var issueView = this.parentNode.parentNode;
			var index = issueView.issueIndex;
			newsstand.deleteView(index);
		}
		
        if (this.issueViews.length > 0)
        {
            var newsstandView = document.getElementById("newsstand");
            newsstandView.classList.remove("loading");
        }
        
		for (var i = 0; i < issues.length; i++)
		{
			var issue = issues[i];
			var viewIndex = this.magazines.getMagazineIndex(issue.id) + 1;
			var issueView = htmlIssueViewList.getElementsByClassName("issue")[viewIndex];
			if (!issueView)
			{
				issueView = issue_model.cloneNode(true);
				this.issueViews.push(issueView);
				htmlIssueViewList.appendChild(issueView);
				issueView.classList.remove("model");
			}
			else
			{
				// reset the view
				issueView.classList.remove("purchased");
				issueView.classList.remove("downloaded");
				issueView.classList.remove("partialy_downloaded");
				issueView.classList.remove("waiting");
			}
			issueView.getElementsByClassName("title")[0].innerText = issue.title;
			var cover = issueView.getElementsByClassName("cover")[0];
			var url = issue.cover;
			
			// cover size are different for tablet and smartphone
			var size = [313, 409]; // size for smartphone
			if (window.innerWidth >= 768)
			{
				size = [410, 562]; // size for tablet
			}
			
			// if cover url is not a local url, resize it from the server
			if (url.indexOf("/") != 0 && url.indexOf("http://localhost") != 0)
			{
				url = Utils.getResizedImageUrl(size[0], size[1], issue.cover);
			}
			
			/* fix different image size */
			var firstToLoad = true;
            var self = this;
			cover.onload = function(event)
			{
				var currentIssuesView = this.parentNode.parentNode;
				if (firstToLoad === true)
				{
					// image size computed by the browser according to the CSS rules applied to the image element
					self.imageSize = {width: this.width, height: this.height};
					var title = issueView.getElementsByClassName("title")[0];
					var padding = title.offsetLeft * 2;
					self.issueWidth = currentIssuesView.clientWidth;
					if (self.issueWidth < (this.width + padding))
					{
						self.issueWidth = this.width + padding;
					}
					
					var half_screen = window.innerWidth / 2;
					var halfIssueWidth = self.issueWidth / 2;
					var offsetX = Math.floor(half_screen - halfIssueWidth);
					htmlIssueViewList.style.width = ((issues.length * self.issueWidth) + (2 * offsetX))+ "px";
					htmlIssueViewList.style.paddingLeft = offsetX + "px";
					htmlIssueViewList.style.paddingRight = offsetX + "px";
                    
					firstToLoad = false;
					
					// the first issue will be displayed, hide the loading wheel
					var newsstandView = document.getElementById("newsstand");
					newsstandView.classList.remove("loading");
					
					// the gesture depend on the issue list length
					// init the gesture when the issue load is finished
					newsstand.newsstandGestureInit();
				}
				else
				{
					this.width = self.imageSize.width;
					this.height = self.imageSize.height;
				}
				
				this.classList.add("loaded");
			}

			// fix app directory name change upon update
			if (url.indexOf("/") == 0) // local url
			{
				var contentDirectoryIndex = url.indexOf(FileManager.ROOT_DIRECTORY_NAME) + FileManager.ROOT_DIRECTORY_NAME.length;
				var newLength = url.length - contentDirectoryIndex;
				var imagePath = url.substr(contentDirectoryIndex, newLength);
				url = application.contentRootDirectory + imagePath;
			}
			
			cover.src = url;
			//cover.onclick = coverOnclick;
			issueView.issueIndex = i;
			
			var delete_button = issueView.getElementsByClassName("delete_button")[0];
			delete_button.onclick = delete_buttonOnClick;
			
			// the use of the band is deprecated for the newsstand issues
			// but not for the downloaded issues
			if (issue.purchased || user.purchases[issue.appStoreProductId])
			{
				issueView.getElementsByClassName("band")[0].innerText = i18n.getStringForId("Purchased");
				issueView.classList.add("purchased");
			}
			else
				issueView.getElementsByClassName("band")[0].innerText = issue.price;
			
			if (issue._downloadState.downloaded)
			{
				issueView.getElementsByClassName("band")[0].innerText = i18n.getStringForId("Downloaded");
				issueView.classList.add("downloaded");
			}
			else if (issue._downloadState.downloadedSections.length > 0)
			{
				var progress = Math.round((issue._downloadState.downloadedSections.length / issue.sections.length) * 100);
				issueView.classList.add("partialy_downloaded");
				var band = issueView.getElementsByClassName("band")[0];
				band.innerText = progress+ "% " + "Downloading";
			}
			else if (issue._downloadState.downloading)
			{
				issueView.getElementsByClassName("band")[0].innerText = i18n.getStringForId("Downloading");
				issueView.classList.add("downloading");
			}
			else if (downloadQueue.isQueued(issue))
			{
				issueView.getElementsByClassName("band")[0].innerText = i18n.getStringForId("Waiting");
				issueView.classList.add("waiting");
				
				// use the download data sectionto display the waiting message
				var download_data_view = issueView.getElementsByClassName("download_data")[0];
				var download_data =
				{
					section : i18n.getStringForId("Waiting"),
					article : "",
					gallery : "",
				};
				this._updateDownloadDataForIssueView(download_data_view, download_data);
			}
		}
	},
	
	purchaseIssue : function()
	{
		if (isOffline())
		{
			var message = i18n.getStringForId("offline_purchase_alert_message");
			var title = i18n.getStringForId("purchase_error");
			var button = i18n.getStringForId("ok");
			jetskiAlert(message, title, button);
			return;
		}
		
		var issue = this.magazines.magazineArray[this.currentIssueIndex - 1];
		window.plugins.inAppPlugin.makePurchase(issue.appStoreProductId, 
											  function(productId, transactionReceipt){newsstand._issuePurchaseDidFinish(productId, transactionReceipt);},
											  function(errorCode, errorText){newsstand._issuePurchaseDidFail(errorCode, errorText);} );
		modalLoading.show();
	},
	
	_issuePurchaseDidFinish : function(productId, transactionReceipt)
	{
		var issue = this.magazines.getMagazineByAppStoreProductId(productId)
		window.console.log(issue);
		// store localy
		user.addPurchase(issue.appStoreProductId, new Date(), transactionReceipt);
		user.save();
		
		// store remotely
		if (user._isAnonymous === false)
		  NDAPI.buyNumeroByAppStoreId(issue.appStoreProductId, 
									  transactionReceipt, 
									  function()
									  {
										dlog("nd purchase ok");
									  });
		issue.purchased = true;
		var viewIndex = this.magazines.getMagazineIndex(issue.id) + 1;
		var issueView = document.getElementsByClassName("issue")[viewIndex];
		issueView.classList.add("purchased");
		
		var buttons = document.getElementById("newsstand_buttons");
		buttons.classList.add("purchased");
		
		// the use of the band is deprecated for the newsstand issues
		// but not for the downloaded issues
		var band = issueView.getElementsByClassName("band")[0];
		band.innerText = i18n.getStringForId("Purchased");
		modalLoading.hide();
	},
	
	_issuePurchaseDidFail : function(errorCode, errorText)
	{
		modalLoading.hide();
		var message = errorText;
		var title = i18n.getStringForId("purchase_error");
		var button = i18n.getStringForId("ok");
		jetskiAlert(message, title, button);
		dlog(errorText);
	},
	
	/***************** magazine purchase restore *****************/

	restorePurchases : function()
	{
		var inAppPlugin = window.plugins.inAppPlugin;
		inAppPlugin.restoreCompletedTransactions(this._didRestorePurchase,
												this._purchaseRestoreDidComplete,
												this._purchaseRestoreDidFail);
	},
	
	_didRestorePurchase : function(productId, originalTransactionReceipt)
	{
		var issue = newsstand.magazines.getMagazineByAppStoreProductId(productId);
		if (issue !== null)
		{
			// store localy
			user.addPurchase(issue.appStoreProductId, new Date(), originalTransactionReceipt);
			user.save();

			// store remotely
			if (user._isAnonymous === false)
				NDAPI.buyNumeroByAppStoreId(issue.appStoreProductId, 
											originalTransactionReceipt, 
											function()
											{
											  dlog("nd purchase ok");
											});

			issue.purchased = true;
			var viewIndex = newsstand.magazines.getMagazineIndex(issue.id) + 1;
			var issueView = document.getElementsByClassName("issue")[viewIndex];
			issueView.classList.add("purchased");
			
			// the use of the band is deprecated for the newsstand issues
			// but not for the downloaded issues
			var band = issueView.getElementsByClassName("band")[0];
			band.innerText = i18n.getStringForId("Purchased");
		}
		else
		{
			dlog("purchase does not correspond to any magazine, this case is not supposed to happen!!!");
		}
	},
	
	_purchaseRestoreDidComplete : function()
	{
		dlog("_purchaseRestoreDidComplete");
		// TODO : display success message
	},
	
	_purchaseRestoreDidFail : function()
	{
		dlog("_purchaseRestoreDidFail");
		// TODO : display error message
	},
	
	downloadView : function()
	{
		if (isOffline())
		{
			var message = i18n.getStringForId("offline_download_alert_message");
			var title = i18n.getStringForId("download_error");
			var button = i18n.getStringForId("ok");
			jetskiAlert(message, title, button);
			return;
		}
		
		var issue = this.magazines.magazineArray[this.currentIssueIndex - 1];
		var issueSections = issue.sections;
		var sections = document.getElementById("sections");
		sections.issueIndex = this.currentIssueIndex - 1;
		var section_model = sections.getElementsByClassName("model")[0];
		
		var sectionList = sections.getElementsByClassName("section");
		while (sections.getElementsByClassName("section").length > 1)
		{
			sections.removeChild(sections.lastChild);
		}
		
		for (var i = 0; i < issueSections.length; i++)
		{
			var section = section_model.cloneNode(true);
			section.classList.remove("model");
			var issueSection = issueSections[i];
			section.issueSectionIndex = i;
			
			//var sectionTitleIndex = pipeline.name.indexOf("-") + 1;
			//var sectionTitle = pipeline.name.substr(sectionTitleIndex, pipeline.name.length);
			
			var icon = section.getElementsByClassName("icon")[0];
			icon.src = iconArray[issueSection.title];

			
			var title = section.getElementsByClassName("title")[0];
			
			var input = section.getElementsByTagName("input")[0];
			input.setAttribute("name", "section" + i);
			input.setAttribute("id", "section" + i);
			
			var label = section.getElementsByTagName("label")[0];
			label.setAttribute("for", "section" + i);
			
			// don't propose already downloaed sections
			if ( !issueSection._downloadState.downloaded &&
				 !issueSection._downloadState.downloading)
			{
				title.innerText = i18n.getStringForId(issueSection.title);
				sections.appendChild(section);
			}
		}
		
		var applicationView = document.getElementById("application");
		applicationView.classList.add("download_sections");
	},
	
	deleteView : function(index)
	{
		var issue = this.magazines.magazineArray[index];
		var issueSections = issue.sections;
		var sections = document.getElementById("sections");
		sections.issueIndex = index;
		var section_model = sections.getElementsByClassName("model")[0];
		
		var sectionList = sections.getElementsByClassName("section");
		
		// remove all previous section li elements except the first one whitch is the template
		while (sections.getElementsByClassName("section").length > 1)
		{
			sections.removeChild(sections.lastChild);
		}
		
		// add the section li element for the selected element
		for (var i = 0; i < issueSections.length; i++)
		{
			var section = section_model.cloneNode(true);
			section.classList.remove("model");
			var issueSection = issueSections[i];
			section.issueSectionIndex = i;

			//var sectionTitleIndex = pipeline.name.indexOf("-") + 1;
			//var sectionTitle = pipeline.name.substr(sectionTitleIndex, pipeline.name.length);
			
			var icon = section.getElementsByClassName("icon")[0];
			icon.src = iconArray[issueSection.title];

			
			var title = section.getElementsByClassName("title")[0];
			
			var input = section.getElementsByTagName("input")[0];
			input.setAttribute("name", "section" + i);
			input.setAttribute("id", "section" + i);
			
			var label = section.getElementsByTagName("label")[0];
			label.setAttribute("for", "section" + i);
			
			//dlog(i + " " + issueSection._downloadState.downloaded);
			if (!issueSection._downloadState.downloaded)
			{
				// don't propose sections not downloaded
				var chekbox = section.getElementsByClassName("checkbox")[0];
				section.removeChild(chekbox);
			}
			
			title.innerText = issueSection.title;
			sections.appendChild(section);
			
		}
		
		var applicationView = document.getElementById("application");
		applicationView.classList.add("delete_sections");
	},
	
	selectAllSections : function()
	{
		var sections = document.getElementById("sections");
		
		var inputList = sections.getElementsByTagName("input");

		// don't check the first element because it's the seciton li element template
		// all new sections created by cloning the template will be checked by default
		for (var i = 1; i < inputList.length; i++)
		{
			var input = inputList[i];
			input.checked = true;
		}
	},
	
	closeSectionView : function()
	{
		var applicationView = document.getElementById("application");
		applicationView.classList.remove("download_sections");
		applicationView.classList.remove("delete_sections");
	},
	
	closeWarning : function()
	{
		var warning = document.getElementById("warning");
		warning.classList.add("dismissed");
	},
	
	downloadSections : function()
	{
		var sections = document.getElementById("sections");
		var issue = this.magazines.magazineArray[sections.issueIndex];
		
		var inputList = sections.getElementsByTagName("input");
		var sectionToDownload = [];
		for (var i = 1; i < inputList.length; i++)
		{
			if (inputList[i].checked)
			{
				var input = inputList[i];
				var liSection = input.parentNode.parentNode;
				var sectionIndex = liSection.issueSectionIndex;
				sectionToDownload.push(issue.sections[sectionIndex]);
			}
		}
		this.downloadMagazine(sections.issueIndex, sectionToDownload);
		this.closeSectionView();
	},
	
	deleteSections : function()
	{
		var sections = document.getElementById("sections");
		var issue = this.magazines.magazineArray[sections.issueIndex];
		
		var inputList = sections.getElementsByTagName("input");
		var sectionToDelete = [];
		for (var i = 1; i < inputList.length; i++)
		{
			if (inputList[i].checked)
			{
				var input = inputList[i];
				var liSection = input.parentNode.parentNode; // li is the target
				var sectionIndex = liSection.issueSectionIndex;
				sectionToDelete.push(issue.sections[sectionIndex]);
			}
		}
		this.deleteMagazine(sections.issueIndex, sectionToDelete);
		this.closeSectionView();
	},
	
	downloadMagazine : function(index, sectionToDownload)
	{
		var issue = this.magazines.magazineArray[index];
		downloadQueue.queueForDownload(issue, sectionToDownload);
	},
	
	deleteMagazine : function(index, sectionToDelete)
	{
		var issue = this.magazines.magazineArray[index];
		downloadQueue.queueForDelete(issue, sectionToDelete);
	},
	
	readMagazine : function()
	{
		var issue = this.magazines.magazineArray[this.currentIssueIndex - 1];
		var downloadedSections = issue._downloadState.downloadedSections;
		
		if (isOffline() && downloadedSections.length == 0)
		{
			var message = i18n.getStringForId("offline_read_alert_message");
			var title = i18n.getStringForId("read_error");
			var button = i18n.getStringForId("ok");
			jetskiAlert(message, title, button);
			return;
		}
		
		if (downloadQueue._isDownloading)
		{
			this._wantsToReadIssue = issue;
			downloadQueue.pause();
			// wait for the pause to be effective then magazineDownloadDidStop will be call
			// so the issue read is launched from that method
		}
		else
		{
			this.removeDownloadListener();
			var applicationView = document.getElementById("application");
			applicationView.classList.add("reader");
			reader.openIssue(issue);
			return;
		}
	},
	
	didQueueIssueForDownload : function(data)
	{
		var issue = data.issue;
		// the magazine model view had the index 0
		var viewIndex = this.magazines.getMagazineIndex(issue.id) + 1;
		var issueView = document.getElementsByClassName("issue")[viewIndex];
		issueView.classList.add("waiting");
		
		// use the download data sectionto display the waiting message
		var download_data_view = issueView.getElementsByClassName("download_data")[0];
		var download_data =
		{
			section : i18n.getStringForId("Waiting"),
			article : "",
			gallery : "",
		};
		this._updateDownloadDataForIssueView(download_data_view, download_data)

		// the use of the band is deprecated for the newsstand issues
		// but not for the downloaded issues
		var band = issueView.getElementsByClassName("band")[0];
		band.innerText = i18n.getStringForId("Waiting");
	},
	
	didQueueIssueForDelete : function(data)
	{
		dlog("library didQueueIssueForDelete");
	},
	
	magazineDownloadDidStart : function(data)
	{
		var issue = data.issue;
		var viewIndex = this.magazines.getMagazineIndex(issue.id) + 1;
		var issueView = document.getElementsByClassName("issue")[viewIndex];
		issueView.classList.remove("waiting");
		issueView.classList.add("downloading");
		
		var magazineProgressBar = document.getElementsByClassName("progressbar")[viewIndex];
		var magazineProgressBarIndicator = magazineProgressBar.getElementsByClassName("progressindicator")[0];
		magazineProgressBarIndicator.style.width = "0%";
		
		// the use of the band is deprecated for the newsstand issues
		// but not for the downloaded issues
		var band = issueView.getElementsByClassName("band")[0];
		band.innerText = i18n.getStringForId("Downloading");
	},
	
	magazineDownloadDidStop : function(data)
	{
		var issue = data.issue;

		if (this._wantsToReadIssue != null)
		{
			this.removeDownloadListener();
			var applicationView = document.getElementById("application");
			applicationView.classList.add("reader");
			reader.openIssue(this._wantsToReadIssue);
			this._wantsToRead = null;
			return;
		}
		
		var viewIndex = this.magazines.getMagazineIndex(issue.id) + 1;
		var issueView = document.getElementsByClassName("issue")[viewIndex];
		issueView.classList.remove("downloading");
	},
	
	magazineDownloadDidFinish : function(data)
	{
		var issue = data.issue;
		// the magazine model view had the index 0
		var viewIndex = this.magazines.getMagazineIndex(issue.id) + 1;
		
		var magazineProgressBar = document.getElementsByClassName("progressbar")[viewIndex];
		var issueView = document.getElementsByClassName("issue")[viewIndex];
		
		issueView.classList.remove("downloading");
		
		// the use of the band is deprecated for the newsstand issues
		// but not for the downloaded issues
		var text = i18n.getStringForId("Downloaded");
		if ( issue._downloadState.downloaded)
		{
			issueView.classList.add("downloaded");
		}
		else
		{
			issueView.classList.add("partialy_downloaded");
			var progress = Math.round((issue._downloadState.downloadedSections.length / issue.sections.length) * 100);
			text =  progress+ "% " + text;
		}
		var band = issueView.getElementsByClassName("band")[0];
		band.innerText = text;
	},
	
	magazineDownloadDidFinishWithError : function(data)
	{		
		var issue = data.issue;
		var viewIndex = this.magazines.getMagazineIndex(issue.id) + 1;
		var issueView = document.getElementsByClassName("issue")[viewIndex];
		issueView.classList.remove("downloading");
		
		var message = i18n.getStringForId("download_error_message") + " " + issue.title;
		var title = i18n.getStringForId("download_error");
		var button = i18n.getStringForId("ok");
		jetskiAlert(message,title, button);
	},
	
	magazineDeleteDidStart : function(data)
	{
		modalLoading.show();
		var issue = data.issue;
		var viewIndex = this.magazines.getMagazineIndex(issue.id) + 1;
		var issueView = document.getElementsByClassName("issue")[viewIndex]
		
		issueView.classList.add("deleting");
		
		// the use of the band is deprecated for the newsstand issues
		// but not for the downloaded issues
		var band = issueView.getElementsByClassName("band")[0];
		band.innerText = i18n.getStringForId("Deleting");
	},
	
	magazineDeleteDidFinish : function(data)
	{
		var issue = data.issue;
		var viewIndex = this.magazines.getMagazineIndex(issue.id) + 1;
		var issueView = document.getElementsByClassName("issue")[viewIndex]

		issueView.classList.remove("deleting");
		
		// the use of the band is deprecated for the newsstand issues
		// but not for the downloaded issues
		var band = issueView.getElementsByClassName("band")[0];
		if (issue._downloadState.downloadedSections.length > 0)
		{
			var text = i18n.getStringForId("Downloaded");
			issueView.classList.add("partialy_downloaded");
			var progress = Math.round((issue._downloadState.downloadedSections.length / issue.sections.length) * 100);
			text =  progress+ "% " + text;
			band.innerText = text;
		}
		else
		{
			if (issueView.classList.contains("partialy_downloaded"))
				issueView.classList.remove("partialy_downloaded");
			if (issueView.classList.contains("downloaded"))
				issueView.classList.remove("downloaded");
			band.innerText = i18n.getStringForId("Purchased");
		}
		modalLoading.hide();
	},
	
	sectionDownloadDidStart : function(data)
	{
		var issue = data.issue;
		var section = data.section;
		var sectionIndex = data.sectionIndex;
		
		var viewIndex = this.magazines.getMagazineIndex(issue.id) + 1;
		
		var download_data_view = document.getElementsByClassName("download_data")[viewIndex];
		var download_data =
		{
			section : i18n.getStringForId(section.title),
			article : " " + i18n.getStringForId("page") + " --/" + str_pad(section.itemCount),
			gallery : " " + i18n.getStringForId("gallery") + " --/--",
		};
		this._updateDownloadDataForIssueView(download_data_view, download_data)
	},
	
	sectionDownloadDidFinish : function(data)
	{
		var issue = data.issue;
		var section = data.section;
		var sectionIndex = data.sectionIndex;
		var progress = data.progress;
		
		// the magazine model view had the index 0
		var viewIndex = this.magazines.getMagazineIndex(issue.id) + 1;
		
		var magazineProgressBar = document.getElementsByClassName("progressbar")[viewIndex];
		var magazineProgressBarIndicator = magazineProgressBar.getElementsByClassName("progressindicator")[0];
		magazineProgressBarIndicator.style.width = progress + "%";
		dlog("sectionDownloadDidFinish " + sectionIndex);
	},
	
	sectionDownloadDidFinishAtItemIndexWithError : function(error)
	{
		// do nothing let the error rise to magazine level
	},
	
	itemDownloadDidStart : function(data)
	{
		var issue = data.issue;
		var section = data.section;
		var sectionIndex = data.sectionIndex;
		var itemIndex = data.itemIndex;
		
		var viewIndex = this.magazines.getMagazineIndex(issue.id) + 1;

		var download_data_view = document.getElementsByClassName("download_data")[viewIndex];
		var download_data =
		{
			section : i18n.getStringForId(section.title),
			article : " " + i18n.getStringForId("page") + " " + str_pad(itemIndex + 1) + "/" + str_pad(section.itemCount),
			gallery : " " + i18n.getStringForId("gallery") + " " + str_pad("--") + "/" + str_pad("--"),
		};
		this._updateDownloadDataForIssueView(download_data_view, download_data)
	},
	
	itemDownloadDidFinish : function(data)
	{
		var issue = data.issue;
		var section = data.section;
		var sectionIndex = data.sectionIndex;
		var itemIndex = data.itemIndex;
		var progress = data.progress;
		
		// the magazine model view had the index 0
		var viewIndex = this.magazines.getMagazineIndex(issue.id) + 1;
		
		var magazineProgressBar = document.getElementsByClassName("progressbar")[viewIndex];
		var magazineProgressBarIndicator = magazineProgressBar.getElementsByClassName("progressindicator")[0];
		magazineProgressBarIndicator.style.width = progress + "%";
	},
	
	itemGalleryImageDownloadDidStart : function(data)
	{
		var issue = data.issue;
		var section = data.section;
		var sectionIndex = data.sectionIndex;
		var itemIndex = data.itemIndex;
		var galleryImageIndex = data.galleryImageIndex;
		
		var viewIndex = this.magazines.getMagazineIndex(issue.id) + 1;
		
		var item = section.articles[itemIndex];
		var mediaCount = section.articles[itemIndex].media.length;
		
		
		var download_data_view = document.getElementsByClassName("download_data")[viewIndex];
		var download_data =
		{
			section : i18n.getStringForId(section.title),
			article : " " + i18n.getStringForId("page") + " " + str_pad(itemIndex + 1) + "/" + str_pad(section.itemCount),
			gallery : " " + i18n.getStringForId("gallery") + " " + str_pad(galleryImageIndex + 1) + "/" + str_pad(mediaCount),
		};
		this._updateDownloadDataForIssueView(download_data_view, download_data)
	},
	
	itemGalleryImageDownloadDidFinish : function(data)
	{
		var issue = data.issue;
		var section = data.section;
		var sectionIndex = data.sectionIndex;
		var itemIndex = data.itemIndex;
		var galleryImageIndex = data.galleryImageIndex;
		var progress = data.progress;
		
		var viewIndex = this.magazines.getMagazineIndex(issue.id) + 1;
		
		var magazineProgressBar = document.getElementsByClassName("progressbar")[viewIndex];
		var magazineProgressBarIndicator = magazineProgressBar.getElementsByClassName("progressindicator")[0];
		magazineProgressBarIndicator.style.width = progress + "%";
	},
	
	_updateDownloadDataForIssueView : function(download_data_view, progressData)
	{
		var section = progressData.section;
		var article = progressData.article;
		var gallery = progressData.gallery;
		
		var download_data_section = download_data_view.getElementsByClassName("section_name")[0];
		var download_data_progress = download_data_view.getElementsByClassName("gallery_progress")[0];
		var download_data_page = download_data_view.getElementsByClassName("page_progress")[0];
		
		download_data_section.innerText = section;
		download_data_page.innerText = article;
		download_data_progress.innerText = gallery;
	},
	
	goToLibrary : function()
	{
		var newsstand = document.getElementById("newsstand");
		newsstand.classList.add("library");
	},
	
	newsstandGestureInit : function()
	{
		if (this.magazines.magazineArray.length == 0)
		{
			return;
		}
		
		var newsstandView = document.getElementById("newstand_issues");

		if (this.gestureIsSet === true)
		{
			return;
		}
		
		var threshold = 5;
		var startX = 0;
		var startY = 0;
		var endX = 0;
		var endY = 0;
		var scroll = 0;
		var half_screen = window.innerWidth / 2;
		var issueList = newsstandView.getElementsByClassName("issue");
		var hasMoved = false;
		
		if (newsstand.currentIssueIndex != 1)
		{
			var newsstandView = document.getElementById("newstand_issues");
			var issueList = newsstandView.getElementsByClassName("issue");
			var issueWidth = issueList[1].clientWidth / 2;
			var currentIssue = issueList[newsstand.currentIssueIndex];
			var half_screen = window.innerWidth / 2;
			scroll = half_screen - currentIssue.offsetLeft - issueWidth;
		}
		
		var handleMouseDown = function(event)
		{
			// prevent desktop browser to grap the image
			if (!device.cordova)
			{
				event.preventDefault();
			}
			
			newsstandView.classList.remove("animTransfrom");
			startX = event.touches ? event.touches[0].clientX : event.clientX;
			startY = event.touches ? event.touches[0].clientY : event.clientY;
			if (event.touches)
			{
				newsstandView.addEventListener("touchend", handleMouseUp);
				newsstandView.addEventListener("touchmove", handleMouseMove);
			}
			else
			{
				newsstandView.addEventListener("mouseup", handleMouseUp);
				newsstandView.addEventListener("mousemove", handleMouseMove);
			}
		};
		
		var handleMouseMove= function(event)
		{
			event.preventDefault();
			
			endX = event.touches ? event.touches[0].clientX : event.clientX;
			endY = event.touches ? event.touches[0].clientY : event.clientY;
			var diffX = endX - startX;
			var diffY = endY - startY;
			if (Math.abs(diffY) > threshold && hasMoved == false)
			{
				newsstandView.removeEventListener("mousemove");
				newsstandView.removeEventListener("mouseup");
				newsstandView.removeEventListener("touchmove");
				newsstandView.removeEventListener("touchend");
				hasMoved = false;
				startX = 0;
				startY = 0;
				return;
			}
			if (Math.abs(diffX) > threshold)
			{
				hasMoved = true;
				newsstandView.style.webkitTransform = "translate3d("+ (scroll + diffX) + "px, 0, 0)";
			}
		};
		
		var handleMouseUp = function(event)
		{
			if (!device.cordova)
			{
				event.preventDefault();
			}

			// update max_scroll here (and not in the gestureInit method)
			// to be sure the issue list size is up to date
			// and not get the old value from the closure.
			// Fix: we must subtract the padding to prevent max_scroll to be wider than the actual scroll area
			var padding = issueList[1].offsetLeft * 2;
			var max_scroll = newsstandView.clientWidth - window.innerWidth - padding;
			
			// the first visible element is at index 1
			// the first element ([0]) is the template which have the css display
			// property set to none
			var issueWidth = issueList[1].clientWidth / 2;
			
			newsstandView.removeEventListener("mousemove");
			newsstandView.removeEventListener("mouseup");
			newsstandView.removeEventListener("touchmove");
			newsstandView.removeEventListener("touchend");
			
			var diffX = endX - startX;
			var diffY = endY - startY;
			if (hasMoved)
			{
				// move backward
				if (diffX > 0)
				{
					// @ the begining of the list
					if ((scroll + diffX) >= 0)
					{
						scroll = 0;
						this.currentIssueIndex = 1;
					}
					// find the issue the nearest of the center of screen
					else
					{
						var currentIssue = issueList[newsstand.currentIssueIndex];
						var previousIssue = issueList[newsstand.currentIssueIndex - 1];
						var scrollOffset = -scroll - diffX + window.innerWidth;
						curentIssueEdge = currentIssue.offsetLeft + currentIssue.clientWidth;
						if (scrollOffset < curentIssueEdge)
						{
							scroll = half_screen - previousIssue.offsetLeft - issueWidth;
							newsstand.currentIssueIndex -= 1;
						}
						else
						{
							scroll = half_screen - currentIssue.offsetLeft - issueWidth;
						}
					}
				}
				// move forward
				else
				{
					// @ the end of the list
					if (((scroll + diffX) * -1) >= max_scroll)
					{
						scroll = -max_scroll;
						newsstand.currentIssueIndex = newsstand.magazines.magazineArray.length;
					}
					// find the issue the nearest of the center of screen
					else
					{
						var currentIssue = issueList[newsstand.currentIssueIndex];
						var nextIssue = issueList[newsstand.currentIssueIndex + 1];
						var scrollOffset = -scroll - diffX;
						if (scrollOffset > currentIssue.offsetLeft)
						{
							scroll = half_screen - nextIssue.offsetLeft - issueWidth;
							newsstand.currentIssueIndex += 1;
						}
						else
						{
							scroll = half_screen - currentIssue.offsetLeft - issueWidth;
						}
					}
				}
				newsstandView.classList.add("animTransfrom");
				newsstandView.style.webkitTransform = "translate3d("+ (scroll) + "px, 0, 0)";
				newsstand.updateButtons();
			}
			startX = 0;
			startY = 0;
			hasMoved = false;
		};
		
		// apply default translation
		newsstandView.style.webkitTransform = "translate3d("+ (scroll) + "px, 0, 0)";
		
		newsstandView.addEventListener("mousedown", handleMouseDown);
		newsstandView.addEventListener("touchstart", handleMouseDown);
		this.gestureIsSet = true;
	}
};


function newsstandInitText()
{
	document.getElementById("app_title").innerText = i18n.getStringForId("app_title");
	
	document.getElementById("newsstand_tab_title").innerText = i18n.getStringForId("newsstand");
	document.getElementById("news_tab_title").innerText = i18n.getStringForId("free_news");
	document.getElementById("login_tab_title").innerText = i18n.getStringForId("log_in");
	document.getElementById("logout_tab_title").innerText = i18n.getStringForId("log_out");
	document.getElementById("help_tab_title").innerText = i18n.getStringForId("help");
	
	document.getElementById("login_label").innerText = i18n.getStringForId("login");
	document.getElementById("password_label").innerText = i18n.getStringForId("password");
	document.getElementById("signin_button").innerText = i18n.getStringForId("sign_in");
	document.getElementById("restore_purchases").innerText = i18n.getStringForId("restore_purchase");
	
	document.getElementById("newsstand_no_content").innerHTML = i18n.getStringForId("offline_newsstand_alert_message");
	
	document.getElementById("buy_button_label").innerText = i18n.getStringForId("buy");
	document.getElementById("read").innerText = i18n.getStringForId("read");
	document.getElementById("download").innerText = i18n.getStringForId("download");

	document.getElementById("library_title").innerText = i18n.getStringForId("my_downloads");
	
	document.getElementById("news_no_content").innerHTML = i18n.getStringForId("offline_news_alert_message");
	
	document.getElementById("section_download_title").innerText = i18n.getStringForId("download");
	document.getElementById("section_delete_title").innerText = i18n.getStringForId("delete");
	document.getElementById("link_to_tou").innerText = i18n.getStringForId("tou_button");
	document.getElementById("select_all").innerText = i18n.getStringForId("select_all");
	
	document.getElementById("delete_warning_message").innerHTML = i18n.getStringForId("delete_warning");
	document.getElementById("section_close").innerText = i18n.getStringForId("close");
	document.getElementById("section_download").innerText = i18n.getStringForId("download");
	document.getElementById("section_delete").innerText = i18n.getStringForId("delete");
	
	document.getElementById("download_warning_message").innerHTML = i18n.getStringForId("download_warning");
	document.getElementById("warning_read_more_button").innerText = i18n.getStringForId("read_more");
	document.getElementById("warning_cancel_button").innerText = i18n.getStringForId("cancel");
	document.getElementById("warning_ok_button").innerText = i18n.getStringForId("i_agree");

	document.getElementById("app_help_page1").style.backgroundImage = "url('" + i18n.getStringForId("app_help_page1") + "')";
	document.getElementById("help_content_page_2").innerHTML = i18n.getStringForId("help_page_2");	
}

/* 
 * DOMParser HTML extension 
 * 2012-02-02 
 * 
 * By Eli Grey, http://eligrey.com 
 * Public domain. 
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK. 
 */  

/*! @source https://gist.github.com/1129031 */  
/*global document, DOMParser*/  

(function(DOMParser) {  
    "use strict";  
    var DOMParser_proto = DOMParser.prototype  
      , real_parseFromString = DOMParser_proto.parseFromString;

    // Firefox/Opera/IE throw errors on unsupported types  
    try {  
        // WebKit returns null on unsupported types  
        if ((new DOMParser).parseFromString("", "text/html")) {  
            // text/html parsing is natively supported  
            return;  
        }  
    } catch (ex) {}  

    DOMParser_proto.parseFromString = function(markup, type) {  
        if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {  
            var doc = document.implementation.createHTMLDocument("")
              , doc_elt = doc.documentElement
              , first_elt;

            doc_elt.innerHTML = markup;
            first_elt = doc_elt.firstElementChild;

            if (doc_elt.childElementCount === 1
                && first_elt.localName.toLowerCase() === "html") {  
                doc.replaceChild(first_elt, doc_elt);  
            }  

            return doc;  
        } else {  
            return real_parseFromString.apply(this, arguments);  
        }  
    };  
}(DOMParser));

function loadComponent(source, destination, delegate, useClass)
{
    var xhr = new XMLHttpRequest();
    var url = source + ".html";
    var index = source.lastIndexOf("/") + 1;
    var componentName = source.substr(index, source.length);
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState == 4)
        {
            var xmlString = xhr.responseText;
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(xmlString,"text/html");
            var componentHTML = xmlDoc.body.innerHTML;
            destination.innerHTML = componentHTML;
            var time_interval = window.setInterval(
                function()
                {
                     var component = null;
                    if (useClass == true)
                    {
                        component = destination.getElementsByClassName(componentName)[0];
                    }
                    else
                        component = document.getElementById(componentName.toLowerCase());
                    if (!component)
                    {
                        return;
                    }
                    window.clearInterval(time_interval);
                    time_interval = null;
                    if (delegate && typeof delegate.componentDidLoad == "function")
                    {
                        delegate.componentDidLoad(component);
                    } 
                },
                500);
            
        }
    };
    xhr.open("GET", url);
    xhr.send();
}

var viewer =
{
	medias : null,
	currentIndex : 0,
	isOpen : false,
	
	open : function(medias)
	{
		this.isOpen = true;
		this.medias = medias;
		
		var viewerView = document.getElementById("viewer");
		viewerView.classList.add("animTransfrom");
		
		var readerView = document.getElementById("reader");
		readerView.classList.add("viewer");
		
		this.gestureInit();
		this.currentIndex = 0;
		this.updatePageNumber();
		this.loadMedia();
		this.loadNextMedia();
		galleryWireframe.init();
	},
	
	updatePageNumber : function()
	{
		var total = this.medias.length;
		var pageNumber = this.currentIndex + 1;
		var pageNumberView = document.getElementById("gallery_page_number");
		pageNumberView.innerText = pageNumber + " / " + total;
	},
	
	close : function()
	{
		var viewerView = document.getElementById("viewer");
		viewerView.classList.add("animTransfrom");

		var readerView = document.getElementById("reader");
		readerView.classList.remove("viewer");

		this.medias = null;
		
		var current = document.getElementById("current_picture");
		var next = document.getElementById("next_picture");
		var previous = document.getElementById("previous_picture");
		
		current.getElementsByTagName("img")[0].style.opacity = "0";
		next.getElementsByTagName("img")[0].style.opacity = "0";
		previous.getElementsByTagName("img")[0].style.opacity = "0";
		
		viewerView.style.webkitTransform ="";
		current.style.webkitTransform ="";
		next.style.webkitTransform ="";
		previous.style.webkitTransform ="";
		
		galleryWireframe.clean();
		this.isOpen = false;
	},
	
	gestureInit : function()
	{
		var viewerView = document.getElementById("viewer");
		var viewerItemsView = document.getElementById("gallery_items");
		
		var threshold = 5;
		var startX = 0;
		var startY = 0;
		var endX = 0;
		var endY = 0;
		var hasMovedX = false;
		var hasMovedY = false;
		
		var current = null;
		var next = null;
		var previous = null;
		
		var isAtTheBeginning = viewer.currentIndex <= 0;
		var isAtTheEnd = viewer.currentIndex >= viewer.medias.length - 1;
		var changePageThreshold = Math.round(window.innerHeight / 8);

		var handleMouseDown = function(event)
		{
			if (viewer.currentIndex >= viewer.medias.length - 1)
			{
				viewerView.classList.add("end");
			}
			if (viewer.currentIndex <= 0)
			{
				viewerView.classList.add("beginning");
			}
			
			viewerView.classList.remove("animTransfrom");
			viewerView.classList.remove("next");
			viewerView.classList.remove("previous");

			current = document.getElementById("current_picture");
			next = document.getElementById("next_picture");
			previous = document.getElementById("previous_picture");

			current.classList.remove("animate");
			
			viewer.closeWireframe();
			menu.closeSections();
			menu.closeMenu();
			
			//event.preventDefault();
			//event.stopPropagation();
			
			startX = event.touches ? event.touches[0].clientX : event.clientX;
			startY = event.touches ? event.touches[0].clientY : event.clientY;
			if (event.touches)
			{
				viewerView.addEventListener("touchend", handleMouseUp);
				viewerView.addEventListener("touchmove", handleMouseMove);
			}
			else
			{
				//viewerView.addEventListener("mouseup", handleMouseUp);
				//viewerView.addEventListener("mousemove", handleMouseMove);
			}
		};
		
		var handleMouseMove= function(event)
		{
			endX = event.touches ? event.touches[0].clientX : event.clientX;
			endY = event.touches ? event.touches[0].clientY : event.clientY;
			var diffX = endX - startX;
			var diffY = endY - startY;
			
			if (Math.abs(diffX) > threshold && hasMovedY == false)
			{
				hasMovedX = true;
			}
			if (Math.abs(diffY) > threshold && hasMovedX == false)
			{
				hasMovedY = true;
			}
			
			if (Math.abs(diffY) > threshold && diffY > 0 && hasMovedX == false)
			{
				viewerView.style.webkitTransform = "translate3d(0, "+diffY+"px, 0)";
				return;
			}
			
			var width = window.innerWidth;
			// move backward
			if (diffX > 0)
			{
					current.style.webkitTransform = "translate3d("+ diffX + "px, 0, 0)";
			}
			// move forward
			else
			{
				if (isAtTheEnd == false)
					next.style.webkitTransform = "translate3d("+(width + diffX)+"px, 0, 0)";
				else
					current.style.webkitTransform = "translate3d("+ diffX +"px, 0, 0)";
			}
		};
		
		var handleMouseUp = function(event)
		{
			if (!device.cordova)
			{
				event.preventDefault();
				event.stopPropagation();
			}
			//viewerView.removeEventListener("mousemove", handleMouseMove);
			//viewerView.removeEventListener("mouseup", handleMouseUp);
			viewerView.removeEventListener("touchmove", handleMouseMove);
			viewerView.removeEventListener("touchend", handleMouseUp);
			var diffX = endX - startX;
			var diffY = endY - startY;
			if (hasMovedX || hasMovedY)
			{
				// move down to close the viewer
				if (diffY > threshold && diffY > 0 && hasMovedX == false)
				{
					resetViewerVariables();
					gestureRemove();
					viewer.close();
					return;
				}
				// move backward
				else if (diffX > 0)
				{
					if (isAtTheBeginning)
					{
						current.classList.add("animate");
					}
					viewer.previous();
				}
				// moved forward
				else
				{
					if (isAtTheEnd)
					{
						current.classList.add("animate");
					}
				   viewer.next();
				}
			}
			else
			{
				// move backward
				if (diffX > 0)
				{
					current.style.webkitTransform = "";
				}
				// moved forward
				else
				{
					next.style.webkitTransform = "";
				}
			}
			resetViewerVariables();
			isAtTheBeginning = viewer.currentIndex <= 0;
			isAtTheEnd = viewer.currentIndex >= viewer.medias.length - 1;
		};
		
		gestureRemove = function()
		{
			//viewerItemsView.removeEventListener("mousedown", handleMouseDown);
			viewerItemsView.removeEventListener("touchstart", handleMouseDown);
		};
		
		var resetViewerVariables = function()
		{
			startX = 0;
			startY = 0;
			hasMovedX = false;
			hasMovedY = false;
			current = null;
			next = null;
			previous = null;
		}
		//viewerItemsView.addEventListener("mousedown", handleMouseDown);
		viewerItemsView.addEventListener("touchstart", handleMouseDown);
	},
	
	loadMedia : function(index, place)
	{
		if (index == undefined)
		{
			index = this.currentIndex;
		}
		if (place == undefined)
		{
			place = document.getElementById("current_picture");
		}
		var media = this.medias[index];
		if (!media)
		{
			return;
		}
		
		var image = place.getElementsByTagName("img")[0];
		image.style.opacity = "0";
		
		var progress_bar = place.getElementsByClassName("progress-bar")[0];
		var progress_bar_value = progress_bar.getElementsByClassName("progress-value")[0];
		var xhr = new XMLHttpRequest();
		
		// encapsulate for the callback have its own execution context
		xhr.onloadstart = function galleryImageLoadingDidStart(event)
		{
			progress_bar.classList.remove("hidden");
			progress_bar_value.innerText = "0%";
			dlog("galleryImageLoadingDidStart");
		};
		
		// did load
		(function(index)
		 {
			xhr.onload = function galleryImageDidLoad(event)
			{
				// if we are too far from the current index the image must not be displayed
				if (index == viewer.currentIndex + 2 ||
					index == viewer.currentIndex - 2)
				{
					return;
				}
				
				progress_bar.classList.add("hidden");
				progress_bar_value.innerText = "";
				dlog("galleryImageLoadingDidEnd");
			
				dlog("galleryImageDidLoad");
				var image = place.getElementsByTagName("img")[0];
				//var newImage = document.createElement("img");
				var imageObjectURL = window.webkitURL.createObjectURL(xhr.response);
				image.onload = function cleanUpObjectURL()
				{
					window.webkitURL.revokeObjectURL(imageObjectURL);
					viewer.onImageload(image);
					image.style.opacity = "1";
					//place.replaceChild(newImage, oldImage);
				};
				image.src = imageObjectURL;
			}
		})(index);
		
		// did fail
		xhr.onerror = function galleryImageDidFail(event)
		{
			progress_bar.classList.add("hidden");
			progress_bar_value.innerText = "";
			dlog("galleryImageDidFail");
		};
		
		// did progress
		xhr.onprogress = function galleryImageDidProgress(event)
		{
			// if we are too far from the current index the image won't be displayed
			if (index == viewer.currentIndex + 2 ||
				index == viewer.currentIndex - 2)
			{
				xhr.abort();
				dlog("abort image load");
				return;
			}
			
			var progressValue = Math.ceil(event.loaded / event.total * 100);
			progress_bar_value.innerText = progressValue + "%";
			dlog("galleryImageDidProgress");
		};

		// fix app directory name change upon update
		var url = media.url;
		if (url.indexOf("/") == 0) // local url
		{
			var contentDirectoryIndex = url.indexOf(FileManager.ROOT_DIRECTORY_NAME) + FileManager.ROOT_DIRECTORY_NAME.length;
			var newLength = url.length - contentDirectoryIndex;
			var imagePath = url.substr(contentDirectoryIndex, newLength);
			url = application.contentRootDirectory + imagePath;
		}
		
		// not on a real device
		if (!device.cordova)
		{
			url = base_url + url;
		}
		
		xhr.open("GET", url);
		xhr.responseType = "blob";
		xhr.send();
		
		/*
		if (media.description && media.description.length > 0)
		{

		}
		*/
	},
	
	onImageload : function(image)
	{
		// reset the image orientation
		image.classList.remove("landscape");
		image.style.webkitTransform = "";

		var offsetX = 0;
		var offsetY = 0;
		var imageWidth = 0;
		var imageHeight = 0;
		var ratio = (image.naturalWidth / image.naturalHeight);
		
		var orientationIsLandscape = false;
		
		// orientation paysage?
		if (image.naturalWidth > image.naturalHeight)
			orientationIsLandscape = true;
		else
			orientationIsLandscape = false;
		
		var itemWidth = orientationIsLandscape ? window.innerHeight : window.innerWidth;
		var itemHeight = orientationIsLandscape ? window.innerWidth : window.innerHeight;
		
		// seul un coté de l'image est plus grand, on adapte l'autre côté, et on centre l'image
		if (image.naturalWidth > itemWidth || image.naturalHeight > itemHeight)
		{
			// set the bigger edge to the carousel image same edge, the other edge will ajust automatically
			if (image.naturalWidth > image.naturalHeight)
			{
			  imageWidth = itemWidth;
			  imageHeight = Math.floor(imageWidth / ratio);
			  offsetY = Math.floor((itemHeight - imageHeight) / 2);
			}
			else
			{
			  imageHeight = itemHeight;
			  imageWidth = Math.floor(imageHeight * ratio);
			  offsetX = Math.floor((itemWidth - imageWidth) / 2);
			}
		}
		// les deux coté sont plus petits, on centre l'image
		else
		{
			imageWidth = image.naturalWidth;
			imageHeight = image.naturalHeight;
			offsetX = Math.floor((itemWidth - imageWidth) / 2);
			offsetY= Math.floor((itemHeight - imageHeight) / 2);
		}
		
		var transform = "";
		// en orientation paysage, transformer les repère 
		if (orientationIsLandscape)
		{
			// on a adapté l'image à la hauteur de l'ecran mais l'image est toujours trop large
			if (imageHeight > window.innerWidth)
			{
				var newRatio = window.innerWidth / imageHeight;
				imageWidth *= newRatio;
				imageHeight = window.innerWidth;
				offsetX = Math.floor((window.innerHeight - imageWidth) / 2);
				offsetY= Math.floor((window.innerWidth - imageHeight) / 2);
			}
			image.classList.add("landscape");
			transform += "rotate(-90deg)";
			// swap offset values, because transformations have swap the axises
			var temp  = offsetX;
			offsetX = offsetY;
			offsetY = window.innerHeight - temp;
			image.style.webkitTransform = "translate3d(" + offsetX + "px, " + offsetY +"px, 0) " + transform;
		}
		
		image.style.width = imageWidth + "px";
		image.style.heigth = imageHeight + "px";
		image.classList.add("loaded");
	},
	
	loadNextMedia : function()
	{
		var place = document.getElementById("next_picture");
		var newIndex = this.currentIndex + 1;
		if (newIndex >= this.medias.length)
		{
			return;
		}
		else
		{
			this.loadMedia(newIndex, place);
		}
	},
	
	loadPreviousMedia : function()
	{
		var place = document.getElementById("previous_picture");
		var newIndex = this.currentIndex - 1;
		if (newIndex < 0)
		{
			return;
		}
		else
		{
			this.loadMedia(newIndex, place);
		}
	},
	
	next : function()
	{
		var viewer = document.getElementById("viewer");
		var current = document.getElementById("current_picture");
		var next = document.getElementById("next_picture");
		var previous = document.getElementById("previous_picture");

		if (this.currentIndex >= this.medias.length - 1)
		{
			current.style.webkitTransform = "";
			return;
		}
		
		viewer.classList.remove("beginning");
		viewer.classList.add("next");
		next.id = "current_picture";
		next.style.webkitTransform = "";
		current.id = "previous_picture";
		previous.id = "next_picture";
		
		var previousImage = previous.getElementsByTagName("img")[0];
		previousImage.style.opacity = "0";
		
		this.currentIndex += 1;
		
		this.updatePageNumber();
		
		this.loadNextMedia();
	},
	
	previous : function()
	{
		var viewer = document.getElementById("viewer");
		var current = document.getElementById("current_picture");
		var next = document.getElementById("next_picture");
		var previous = document.getElementById("previous_picture");

		if (this.currentIndex <= 0)
		{
			current.style.webkitTransform = "";
			return;
		}
		
		viewer.classList.remove("end");
		viewer.classList.add("previous");
		
		previous.id = "current_picture";
		current.id = "next_picture";
		current.style.webkitTransform = "";
		next.id = "previous_picture";
		
		var nextImage = next.getElementsByTagName("img")[0];
		nextImage.style.opacity = "0";
		
		this.currentIndex -= 1;
		
		this.updatePageNumber();
		
		this.loadPreviousMedia();
	},
	
	goToMedia :function(itemIndex)
	{
		this.closeWireframe();
		this.currentIndex = itemIndex;
		this.loadMedia();
		this.updatePageNumber();
		this.loadNextMedia();
		this.loadNextMedia();
	},
	
	openWireframe : function()
	{
		var viewerView = document.getElementById("viewer");
		viewerView.classList.add("wireframe");
	},
	
	closeWireframe : function()
	{
		var viewerView = document.getElementById("viewer");
		viewerView.classList.remove("wireframe");
	},
	
	toogleWireframe : function()
	{
		var viewerView = document.getElementById("viewer");
		viewerView.classList.toggle("wireframe");
	}
}

var galleryWireframe =
{
	wireFrameView : null,
	wireFrameItems : null,
	model : null,
	pageCount : 0,
	
	init : function()
	{
		this.pageCount = 0;
		this.wireFrameView = document.getElementById("gallery_wireframe");
		this.wireFrameItems = document.getElementById("gallery_wireframeitems");
		this.model = this.wireFrameItems.getElementsByClassName("model")[0];
		
		this.wireFrameView.scrollLeft = 0;
		
		for (var itemIndex = 0; itemIndex < viewer.medias.length; itemIndex++)
		{
			this.addItem(itemIndex);
		}
		
		var item = this.wireFrameItems.getElementsByClassName("wireframeitem")[1];
		var itemWidth = item.clientWidth + (item.offsetLeft * 2);
		this.wireFrameItems.style.width = (itemWidth * this.pageCount) + "px";
	},
	
	clean : function()
	{
		this.wireFrameView.scrollLeft = 0;
		var items = this.wireFrameItems.getElementsByClassName("wireframeitem");
		var itemCount = items.length
		for (var i = 1; i < itemCount;  i++) // the model is at index = 0
		{
			var item = items[items.length - 1] // items length change each time we delete a child
			this.wireFrameItems.removeChild(item);
		}
	},
	
	addItem : function(itemIndex)
	{
		var media =  viewer.medias[itemIndex];
		var item = this.model.cloneNode(true);
		item.classList.remove("model");
		item.itemIndex = itemIndex;
		
		
		var pageNumber = item.getElementsByClassName("pagenumber")[0];
		pageNumber.innerText = this.pageCount + 1;
		
		
		var image = item.getElementsByTagName("img")[0];
		if (media.thumbnailURL)
		{
			// fix app directory name change upon update
			var url = media.thumbnailURL;
			if (url.indexOf("/") == 0) // local url
			{
				var contentDirectoryIndex = url.indexOf(FileManager.ROOT_DIRECTORY_NAME) + FileManager.ROOT_DIRECTORY_NAME.length;
				var newLength = url.length - contentDirectoryIndex;
				var imagePath = url.substr(contentDirectoryIndex, newLength);
				url = application.contentRootDirectory + imagePath;
			}
			image.src = url;
		}
		else
		{
			image.src = media.thumbnailUrl;
		}

		item.addEventListener("click", this.onclickhandler);
		//item.style.webkitTransform = "translate3d("+this.pageCount+"00%, 0, 0)";
		this.wireFrameItems.appendChild(item);
		
		this.pageCount += 1;
	},
	
	onclickhandler : function()
	{
		viewer.goToMedia(this.itemIndex);
		viewer.closeWireframe();
	}
}

var Splash =
{
	splash_timeout : null,
	closable_timeout : null,
	isHidden: false,
	
	/**
	 * create a 3 seconds time out then call Splash.showCloseButton
	 */
	setClosableTiemout : function()
	{
		this.closable_timeout = window.setTimeout(Splash.showCloseButton, 5000);
	},
	
	/**
	 * reset the time out and display a close button on the ad
	 */
	showCloseButton : function()
	{
		if (this.closable_timeout)
		{
			window.clearTimeout(this.closable_timeout);
			this.closable_timeout = null;
		}
		var splash_container = document.getElementById("splash_container");
		splash_container.classList.add("closable");
	},
	
	/**
	 * show the appliction start up ad
	 * The splash container is visible at application launch
	 */
	showStartupSplash : function(callback)
	{
		var splash_container = document.getElementById("splash_container");
		var splash = document.getElementById("splash");
		splash_container.style.display = "block";
		splash_container.classList.remove("closable");
		
		// the splash container is displayed, call the callback
		if (typeof callback == "function")
		{
			callback();
		}
		splash.show = function()
		{
			if (!Splash.isHidden)
			{
				centerImage(this);
				 this.classList.add("visible");
				// set a 5 seconds time out before the user can close the ad
				Splash.setClosableTiemout();
			}
		};
		
		// must keep track of the image load, because it may be fire only once
		if (splash.isLoaded !== true)
		{
			splash.onload = function(event)
			{
				splash.isLoaded = true;
				splash.show();
			};
		}
		else
		{
			splash.show();
		}
		
        splash.onerror = function(event)
        {
            dlog("error loading splash image");
            if (typeof callback == "function")
			{
				callback();
			}
        };
        
		if (window.innerWidth < 768)
			splash.src = i18n.getStringForId("smartphone_splash_advertiment_url");
		else
			splash.src = i18n.getStringForId("tablet_splash_advertiment_url");
        this.splash_timeout = window.setTimeout( this.hideSplash, 7000);
	},
	
	/**
	 * show an ad destined to be displayed when the user get back to the news-stand
	 * The splash container is not visible, it has been hidden by the call to Splash.showStartupSplash
	 */
	showBackToNewstandSplash : function(callback)
	{
		var applictionView = document.getElementById("application");
        applictionView.classList.add("hidden");
		
		var splash_container = document.getElementById("splash_container");
		var splash = document.getElementById("back_splash");
		splash_container.classList.add("back_splash");
        splash_container.classList.remove("closable");
		splash_container.style.display = "block";
		Splash.isHidden = false;
		
		// call the callback 1s after the back splash has been displayed
		window.setTimeout(	function()
							{
								splash_container.classList.remove("hidden");
								window.setTimeout(	function()
													{
														if (typeof callback == "function")
														{
															callback();
														}
													}, 1000);
							},100);
		splash.show = function()
		{
			if (!Splash.isHidden)
			{
				centerImage(this);
				this.classList.add("visible");
			}
		};
		
		// must keep track of the image load, because it may be fire only once
		if (splash.isLoaded !== true)
		{
			splash.onload = function(event)
			{
				splash.isLoaded = true;
				splash.show();
			};
		}
		else
		{
			splash.show();
		}

        splash.onerror = function(event)
        {
            dlog("error loading splash image");
        }
		if (window.innerWidth < 768)
			splash.src = i18n.getStringForId("smartphone_back_splash_advertiment_url");
		else
			splash.src = i18n.getStringForId("tablet_back_splash_advertiment_url");
        this.splash_timeout = window.setTimeout( this.hideSplash, 5000);
    },
	
	/**
	 * hide the ads
	 */
	hideSplash : function()
	{
        var applictionView = document.getElementById("application");
        applictionView.classList.remove("hidden");
        
		if (this.splash_timeout)
		{
			window.clearTimeout(this.splash_timeout);
			this.splash_timeout = null;
		}
		
		var splash = document.getElementById("splash");
		var backSplash = document.getElementById("back_splash");
		
		splash_container.classList.add("hidden");
		splash.classList.remove("visible");
		Splash.isHidden = true;
		
		window.setTimeout(function()
						  {
							splash_container.style.display = "none";
							splash_container.classList.remove("back_splash");
							splash.classList.remove("visible");
							backSplash.classList.remove("visible");
						  }, 1500);
		
	}
}

//fgnass.github.com/spin.js#v2.0.0
!function(a,b){"object"==typeof exports?module.exports=b():"function"==typeof define&&define.amd?define(b):a.Spinner=b()}(this,function(){"use strict";function a(a,b){var c,d=document.createElement(a||"div");for(c in b)d[c]=b[c];return d}function b(a){for(var b=1,c=arguments.length;c>b;b++)a.appendChild(arguments[b]);return a}function c(a,b,c,d){var e=["opacity",b,~~(100*a),c,d].join("-"),f=.01+c/d*100,g=Math.max(1-(1-a)/b*(100-f),a),h=j.substring(0,j.indexOf("Animation")).toLowerCase(),i=h&&"-"+h+"-"||"";return l[e]||(m.insertRule("@"+i+"keyframes "+e+"{0%{opacity:"+g+"}"+f+"%{opacity:"+a+"}"+(f+.01)+"%{opacity:1}"+(f+b)%100+"%{opacity:"+a+"}100%{opacity:"+g+"}}",m.cssRules.length),l[e]=1),e}function d(a,b){var c,d,e=a.style;for(b=b.charAt(0).toUpperCase()+b.slice(1),d=0;d<k.length;d++)if(c=k[d]+b,void 0!==e[c])return c;return void 0!==e[b]?b:void 0}function e(a,b){for(var c in b)a.style[d(a,c)||c]=b[c];return a}function f(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)void 0===a[d]&&(a[d]=c[d])}return a}function g(a,b){return"string"==typeof a?a:a[b%a.length]}function h(a){this.opts=f(a||{},h.defaults,n)}function i(){function c(b,c){return a("<"+b+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',c)}m.addRule(".spin-vml","behavior:url(#default#VML)"),h.prototype.lines=function(a,d){function f(){return e(c("group",{coordsize:k+" "+k,coordorigin:-j+" "+-j}),{width:k,height:k})}function h(a,h,i){b(m,b(e(f(),{rotation:360/d.lines*a+"deg",left:~~h}),b(e(c("roundrect",{arcsize:d.corners}),{width:j,height:d.width,left:d.radius,top:-d.width>>1,filter:i}),c("fill",{color:g(d.color,a),opacity:d.opacity}),c("stroke",{opacity:0}))))}var i,j=d.length+d.width,k=2*j,l=2*-(d.width+d.length)+"px",m=e(f(),{position:"absolute",top:l,left:l});if(d.shadow)for(i=1;i<=d.lines;i++)h(i,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(i=1;i<=d.lines;i++)h(i);return b(a,m)},h.prototype.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}}var j,k=["webkit","Moz","ms","O"],l={},m=function(){var c=a("style",{type:"text/css"});return b(document.getElementsByTagName("head")[0],c),c.sheet||c.styleSheet}(),n={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",direction:1,speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"50%",left:"50%",position:"absolute"};h.defaults={},f(h.prototype,{spin:function(b){this.stop();{var c=this,d=c.opts,f=c.el=e(a(0,{className:d.className}),{position:d.position,width:0,zIndex:d.zIndex});d.radius+d.length+d.width}if(b&&(b.insertBefore(f,b.firstChild||null),e(f,{left:d.left,top:d.top})),f.setAttribute("role","progressbar"),c.lines(f,c.opts),!j){var g,h=0,i=(d.lines-1)*(1-d.direction)/2,k=d.fps,l=k/d.speed,m=(1-d.opacity)/(l*d.trail/100),n=l/d.lines;!function o(){h++;for(var a=0;a<d.lines;a++)g=Math.max(1-(h+(d.lines-a)*n)%l*m,d.opacity),c.opacity(f,a*d.direction+i,g,d);c.timeout=c.el&&setTimeout(o,~~(1e3/k))}()}return c},stop:function(){var a=this.el;return a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=void 0),this},lines:function(d,f){function h(b,c){return e(a(),{position:"absolute",width:f.length+f.width+"px",height:f.width+"px",background:b,boxShadow:c,transformOrigin:"left",transform:"rotate("+~~(360/f.lines*k+f.rotate)+"deg) translate("+f.radius+"px,0)",borderRadius:(f.corners*f.width>>1)+"px"})}for(var i,k=0,l=(f.lines-1)*(1-f.direction)/2;k<f.lines;k++)i=e(a(),{position:"absolute",top:1+~(f.width/2)+"px",transform:f.hwaccel?"translate3d(0,0,0)":"",opacity:f.opacity,animation:j&&c(f.opacity,f.trail,l+k*f.direction,f.lines)+" "+1/f.speed+"s linear infinite"}),f.shadow&&b(i,e(h("#000","0 0 4px #000"),{top:"2px"})),b(d,b(i,h(g(f.color,k),"0 0 1px rgba(0,0,0,.1)")));return d},opacity:function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)}});var o=e(a("group"),{behavior:"url(#default#VML)"});return!d(o,"transform")&&o.adj?i():j=d(o,"animation"),h});

var library =
{
    // keep the size of the first library cover displayed
    // help to have a unique size for all images
    // event if the orignal sizez are different
    imageSize: null,
    
    // keep the with of the first library issue view displayed
    // help to compute the wrapper size
    issueWidth: 0,
	init : function()
	{
		this.addDownloadListener();
		this.reset();
        this.imageSize = null;
        this.imageWidth = null;
		this.issueViews = [];
		this.updateDisplay();
	},
	
	reset : function()
	{
		var issueView = document.getElementById("library_issues");
		var issue_model = issueView.getElementsByClassName("model")[0];
		while (issueView.firstChild)
		{
			issueView.removeChild(issueView.firstChild);
		}
		issueView.appendChild(issue_model);
	},
	
	addDownloadListener : function()
    {
	    downloadQueue.addListener("queue", this);
        downloadQueue.addListener("magazineDownload", this);
        downloadQueue.addListener("magazineDelete", this);
        downloadQueue.addListener("sectionDownload", this);
        downloadQueue.addListener("itemDownload", this);
        downloadQueue.addListener("itemGalleryImageDownload", this);
    },
    
    removeDownloadListener : function()
    {
		downloadQueue.removeListener("queue", this);
        downloadQueue.removeListener("magazineDownload", this);
        downloadQueue.removeListener("magazineDelete", this);
        downloadQueue.removeListener("sectionDownload", this);
        downloadQueue.removeListener("itemDownload", this);
        downloadQueue.removeListener("itemGalleryImageDownload", this);
    },
	
	updateDisplay : function()
	{
		var issues = newsstand.magazines.magazineArray;
		var issuesView = document.getElementById("library_issues");
		var issue_model = issuesView.getElementsByClassName("model")[0];

		var delete_buttonOnClick = function()
		{
			var issueView = this.parentNode.parentNode;
			var index = issueView.issueIndex;
			newsstand.deleteView(index);
		}
		
		var count = 0;
		if (JetSkiApp.isTablet())
		{
			var count = 0;
			for (var i = 0; i < issues.length; i++)
			{
				if (issues[i]._downloadState.downloadedSections.length > 0 ||
					issues[i]._downloadState.downloading)
				{
					count += 1;
				}
			}
		}
		
		var downloadIssueCount = 0;
		for (var i = 0; i < issues.length; i++)
		{
			var issueViewListItem = issuesView.getElementsByClassName("issue");
			var issue = issues[i];
			var issueView = this.getIssueViewByIssueId(issue.id);
			// issue view already exist
			if (issueView)
			{
				continue;
			}
			
			if (issue._downloadState.downloadedSections.length == 0 &&
				issues[i]._downloadState.downloading == false)
			{
				continue;
			}
			
			var issueView = issue_model.cloneNode(true);
			issueView.getElementsByClassName("title")[0].innerText = issue.title;
			
			var nextSibling = null;
			for (var j = 0; j < issueViewListItem.length; j++)
			{
				if (issueViewListItem[j].publishDate < issueView.publishDate)
				{
					nextSibling = issueViewListItem[j];
					break;
				}
			}
			if (nextSibling)
			{
				issuesView.insertBefore(issueView, nextSibling);
			}
			else
				issuesView.appendChild(issueView);
			
			issueView.classList.toggle("model");
			issueView.issueIndex = i;
			issueView.issueId = issue.id;
			issueView.publishDate = issue.date;
			
			var cover = issueView.getElementsByClassName("cover")[0];
			var url  = issue.cover;
			// cover size are different for tablet and smartphone
            var size = [313, 409]; // size for smartphone
			if (window.innerWidth >= 768)
			{
                size = [410, 562]; // size for tablet
			}
            
            // if cover url is not a local url, resize it from the server
            if (url.indexOf("/") != 0 && url.indexOf("http://localhost") != 0)
            {
                url = Utils.getResizedImageUrl(size[0], size[1], issue.cover);
            }
            
            // fix app directory name change upon update
            if (url.indexOf("/") == 0) // local url
            {
                var contentDirectoryIndex = url.indexOf(FileManager.ROOT_DIRECTORY_NAME) + FileManager.ROOT_DIRECTORY_NAME.length;
                var newLength = url.length - contentDirectoryIndex;
                var imagePath = url.substr(contentDirectoryIndex, newLength);
                url = application.contentRootDirectory + imagePath;
            }
            
            /* fix different image size */
			var firstToLoad = this.imageSize == null;
			cover.onload = function(event)
			{
				var currentIssuesView = this.parentNode.parentNode;
				if (firstToLoad === true)
				{
					// store the first cover size to apply the same parameters to the other cover
					library.imageSize = {width: this.width, height: this.height};
                    //store the first library issue view to ease the computation of the wrapper size (issue count x issue with)
					library.issueWidth = currentIssuesView.clientWidth;
					firstToLoad = false;
				}
				else
				{
                    // apply the same image parameters to the other images
                    // CSS will make all library issue view the same width
					this.width = library.imageSize.width;
					this.height = library.imageSize.height;
				}
				
                // resize the wrapper
                issuesView.style.width = (count * library.issueWidth) + "px";
                
				// mark the issue as loaded for css effect
                this.classList.add("loaded");
			}
            cover.src = url;

			var delete_button = issueView.getElementsByClassName("delete_button")[0];
			delete_button.onclick = delete_buttonOnClick;
			
			if (issue.purchased || user.purchases[issue.appStoreProductId])
			{
				issueView.getElementsByClassName("band")[0].innerText = i18n.getStringForId("Purchased");
				issueView.classList.add("purchased");
			}
			else
				issueView.getElementsByClassName("band")[0].innerText = issue.price;
      
			if (issue._downloadState.downloaded)
			{
				issueView.getElementsByClassName("band")[0].innerText = i18n.getStringForId("Downloaded");
				issueView.classList.add("downloaded");
			}
			else if (issue._downloadState.downloadedSections.length > 0)
			{
				var progress = Math.round((issue._downloadState.downloadedSections.length / issue.sections.length) * 100);
				issueView.classList.add("partialy_downloaded");
				var band = issueView.getElementsByClassName("band")[0];
				band.innerText = progress+ "% " + i18n.getStringForId("Downloading");
			}
			else if (issue._downloadState.downloading)
			{
				issueView.getElementsByClassName("band")[0].innerText = i18n.getStringForId("Downloading");
				issueView.classList.add("downloading");
			}
			else if (downloadQueue.isQueued(issue))
			{
				issueView.getElementsByClassName("band")[0].innerText = i18n.getStringForId("Waiting");
				issueView.classList.add("waiting");
			}
            this.issueViews.push(issueView);
		}
	},
	
	getIssueViewByIssueId : function(issueId)
	{
		var issues = document.getElementsByClassName("libraryissue");
		for (var i = 0; i < issues.length; i++)
		{
			if (issues[i].issueId == issueId)
			{
				return (issues[i]);
			}
		}
		return (null);
	},
	
	getIssueViewIndexByIssueId : function(issueId)
	{
		var issues = document.getElementsByClassName("libraryissue");
		for (var i = 0; i < issues.length; i++)
		{
			if (issues[i].issueId == issueId)
			{
				return (i);
			}
		}
		return (-1);
	},
	
	didQueueIssueForDownload : function(data)
	{
		var issue = data.issue;
		var issueView = this.getIssueViewByIssueId(issue.id);
		if (issueView == null)
		{
			return;
		}
		issueView.classList.add("waiting");
		var band = issueView.getElementsByClassName("band")[0];
		band.innerText = i18n.getStringForId("Waiting");
	},
	
	didQueueIssueForDelete : function(data)
	{
		dlog("newsstand didQueueIssueForDelete");
	},
	
	magazineDownloadDidStart : function(data)
	{
		library.updateDisplay();

		var issue = data.issue;
		var issueView = this.getIssueViewByIssueId(issue.id);
		if (issueView == null)
		{
			return;
		}
				
		issueView.classList.remove("waiting");
		issueView.classList.add("downloading");
		var band = issueView.getElementsByClassName("band")[0];
		band.innerText = i18n.getStringForId("Downloading");
		var magazineProgressBar = issueView.getElementsByClassName("libraryissueprogressbar")[0];
		var magazineProgressBarIndicator = magazineProgressBar.getElementsByClassName("libraryissueprogressindicator")[0]
	},
	
	magazineDownloadDidStop : function(data)
	{
	},
	
	magazineDownloadDidFinish : function(data)
	{
		var issue = data.issue;
		var issueView = this.getIssueViewByIssueId(issue.id);
		if (issueView == null)
		{
			return;
		}
		var magazineProgressBar = issueView.getElementsByClassName("libraryissueprogressbar")[0];
		issueView.classList.remove("downloading");
		var text = i18n.getStringForId("Downloaded");
		if ( issue._downloadState.downloaded)
		{
			issueView.classList.add("downloaded");
		}
		else
		{
			issueView.classList.add("partialy_downloaded");
			var progress = Math.round((issue._downloadState.downloadedSections.length / issue.sections.length) * 100);
			text =  progress+ "% " + text;
		}
		var band = issueView.getElementsByClassName("band")[0];
		band.innerText = text;
	},
	
	magazineDownloadDidFinishWithError : function(data)
	{
		var issue = data.issue;
		var issueView = this.getIssueViewByIssueId(issue.id);
		if (issueView == null)
		{
			return;
		}
				
		issueView.classList.remove("downloading");
	},
	
	magazineDeleteDidStart : function(data)
	{
		var issue = data.issue;
		var issueView = this.getIssueViewByIssueId(issue.id);
		if (issueView == null)
		{
			return;
		}
		issueView.classList.add("deleting");
		var band = issueView.getElementsByClassName("band")[0];
		band.innerText = i18n.getStringForId("Deleting");
	},
	
	magazineDeleteDidFinish : function(data)
	{
		var issue = data.issue;
		var issueView = this.getIssueViewByIssueId(issue.id);
		if (issueView == null)
		{
			return;
		}
		issueView.classList.remove("deleting");
		var band = issueView.getElementsByClassName("band")[0];
		if (issue._downloadState.downloadedSections.length > 0)
		{
			var text = i18n.getStringForId("Downloaded");
			issueView.classList.add("partialy_downloaded");
			var progress = Math.round((issue._downloadState.downloadedSections.length / issue.sections.length) * 100);
			text =  progress+ "% " + text;
			band.innerText = text;
		}
		else
		{
			var issues = document.getElementById("library_issues");
			issues.removeChild(issueView);
		}
	},
	
	magazineDeleteDidFinishWithError : function(data)
	{
		var issue = data.issue;
		var error = data.error;
		dlog("magazineDownloadDidFinishWithError " + error);
	},
	
	sectionDownloadDidStart : function(data)
	{
		var issue = data.issue;
        var section = data.section;
        var sectionIndex = data.sectionIndex;
        
		// the magazine model view had the index 0
        var issueView = this.getIssueViewByIssueId(issue.id);
        if (issueView == null)
		{
			return;
		}
        var download_data = issueView.getElementsByClassName("download_data")[0];
		var download_data_section = download_data.getElementsByClassName("section_name")[0];
		var download_data_progress = download_data.getElementsByClassName("gallery_progress")[0];
        var download_data_page = download_data.getElementsByClassName("page_progress")[0];
        
        download_data_section.innerText = i18n.getStringForId("section") + " : " + section.title;
        download_data_page.innerText = " " + i18n.getStringForId("page") + " : --/" + str_pad(section.itemCount);
        download_data_progress.innerText = " " + i18n.getStringForId("gallery") + " : --/--";
        dlog("sectionDownloadDidStart " + sectionIndex);
	},
	
	sectionDownloadDidFinish : function(data)
	{
		var issue = data.issue;
        var section = data.section;
        var sectionIndex = data.sectionIndex;
        var progress = data.progress;
		
		// the magazine model view had the index 0
		var viewIndex = this.getIssueViewIndexByIssueId(issue.id);
		if (viewIndex < 0)
		{
			return;
		}
		
		var magazineProgressBar = document.getElementsByClassName("libraryissueprogressbar")[viewIndex];
		var magazineProgressBarIndicator = magazineProgressBar.getElementsByClassName("libraryissueprogressindicator")[0];
		magazineProgressBarIndicator.style.width = progress + "%";
	},
	
	itemDownloadDidStart : function(data)
	{
		var issue = data.issue;
        var section = data.section;
        var sectionIndex = data.sectionIndex;
        var itemIndex = data.itemIndex;
        
		var issueView = this.getIssueViewByIssueId(issue.id);
        if (issueView == null)
		{
			return;
		}
        var download_data = issueView.getElementsByClassName("download_data")[0];
		var download_data_section = download_data.getElementsByClassName("section_name")[0];
		var download_data_progress = download_data.getElementsByClassName("gallery_progress")[0];
        var download_data_page = download_data.getElementsByClassName("page_progress")[0];
        
        download_data_section.innerText = i18n.getStringForId("section") + " : " + section.title;
        download_data_page.innerText = " " + i18n.getStringForId("page") + "/" + str_pad(section.itemCount);
        download_data_progress.innerText = " " + i18n.getStringForId("gallery") + " : --/--";
	},
	
	itemDownloadDidFinish : function(data)
	{
		var issue = data.issue;
        var section = data.section;
        var sectionIndex = data.sectionIndex;
        var itemIndex = data.itemIndex;
        var galleryImageIndex = data.galleryImageIndex;
        var progress = data.progress;
		
		var issueView = this.getIssueViewByIssueId(issue.id);
        if (issueView == null)
		{
			return;
		}
		var magazineProgressBar = issueView.getElementsByClassName("libraryissueprogressbar")[0];
		var magazineProgressBarIndicator = magazineProgressBar.getElementsByClassName("libraryissueprogressindicator")[0];
		magazineProgressBarIndicator.style.width = progress + "%";
	},
	
	itemGalleryImageDownloadDidStart : function(data)
	{
		var issue = data.issue;
        var section = data.section;
        var sectionIndex = data.sectionIndex;
        var itemIndex = data.itemIndex;
        var galleryImageIndex = data.galleryImageIndex;
        
        var issueView = this.getIssueViewByIssueId(issue.id);
        if (issueView == null)
		{
			return;
		}
		var item = section.articles[itemIndex];
        var mediaCount = section.articles[itemIndex].media.length;
        
        var download_data = issueView.getElementsByClassName("download_data")[0];
		var download_data_section = download_data.getElementsByClassName("section_name")[0];
		var download_data_progress = download_data.getElementsByClassName("gallery_progress")[0];
        var download_data_page = download_data.getElementsByClassName("page_progress")[0];
        
        download_data_section.innerText = i18n.getStringForId("section") + " : " + section.title;
        download_data_page.innerText =  " " + i18n.getStringForId("page") + " : " + str_pad(itemIndex + 1) + "/" + str_pad(section.itemCount);
        download_data_progress.innerText = " " + i18n.getStringForId("gallery") +" : " + str_pad(galleryImageIndex + 1) + "/" + str_pad(mediaCount);
	},
	
	itemGalleryImageDownloadDidFinish : function(data)
	{
        var issue = data.issue;
        var section = data.section;
        var sectionIndex = data.sectionIndex;
        var itemIndex = data.itemIndex;
        var galleryImageIndex = data.galleryImageIndex;
        var progress = data.progress;
        
        var issueView = this.getIssueViewByIssueId(issue.id);
        if (issueView == null)
		{
			return;
		}
		var magazineProgressBar = issueView.getElementsByClassName("libraryissueprogressbar")[0];
		var magazineProgressBarIndicator = magazineProgressBar.getElementsByClassName("libraryissueprogressindicator")[0];
		magazineProgressBarIndicator.style.width = progress + "%";
	},
	
	goToNewsstand : function()
	{
		var newsstand = document.getElementById("newsstand");
		newsstand.classList.remove("library");
	},
	
	libraryGestureInit : function()
	{
		var libraryView = document.getElementById("library");
		var threshold = 20;
		var startX = 0;
		var startY = 0;
		var endX = 0;
		var endY = 0;
		var hasMoved = false;
		var handleMouseDown = function(event)
		{
			startX = event.touches ? event.touches[0].clientX : event.clientX;
			startY = event.touches ? event.touches[0].clientY : event.clientY;
			if (event.touches)
			{
				libraryView.addEventListener("touchend", handleMouseUp);
				libraryView.addEventListener("touchmove", handleMouseMove);
			}
			else
			{
				libraryView.addEventListener("mouseup", handleMouseUp);
				libraryView.addEventListener("mousemove", handleMouseMove);
			}
		};
		
		var handleMouseMove= function(event)
		{
			endX = event.touches ? event.touches[0].clientX : event.clientX;
			endY = event.touches ? event.touches[0].clientY : event.clientY;
			var diffX = endX - startX;
			var diffY = endY - startY;
			if (Math.abs(diffY) > threshold)
			{
				libraryView.removeEventListener("mousemove", handleMouseMove);
				libraryView.removeEventListener("mouseup", handleMouseUp);
				libraryView.removeEventListener("touchmove", handleMouseMove);
				libraryView.removeEventListener("touchend", handleMouseUp);
				hasMoved = false;
				startX = 0;
				startY = 0;
				return;
			}
			if (Math.abs(diffX) > threshold)
			{
				hasMoved = true;
			}
		};
		
		var handleMouseUp = function(event)
		{
			libraryView.removeEventListener("mousemove", handleMouseMove);
			libraryView.removeEventListener("mouseup", handleMouseUp);
			libraryView.removeEventListener("touchmove", handleMouseMove);
			libraryView.removeEventListener("touchend", handleMouseUp);
			var diffX = endX - startX;
			var diffY = endY - startY;
			var changePageThreshold = Math.round(window.innerHeight / 8);
			if (hasMoved)
			{
				if (Math.abs(diffX) > changePageThreshold)
				{
					if (diffX > 0)
					{
						library.goToNewsstand();
					}
				}
			}
			startX = 0;
			startY = 0;
			hasMoved = false;
		};
		libraryView.addEventListener("mousedown", handleMouseDown);
		libraryView.addEventListener("touchstart", handleMouseDown);
	},
	
	librarySignOut : function()
	{
		settings.signout(
			function()
			{
				library.goToNewsstand();
			});
		
	},
	
	toggleEditMode : function()
	{
		var libraryView = document.getElementById("library");
		libraryView.classList.toggle("edit");
	}
}

var news =
{
    _pipelineId : 19,
    articles : null,
    
    load : function()
    {
        var newsstand = document.getElementById("news");
        newsstand.classList.remove("no_content");
        
        this.gestureInit();
        
				var advert = document.getElementById("news_advert");
				var self = this;
				advert.onload = function()
				{
					var container = document.getElementById("news");
					var containerHeight = container.clientHeight;
					var newWrapper = container.querySelector(".wrapper");
					var imageContainer = document.getElementById("news_advert_container");
					var width = this.width;
					var height = this.height;
					imageContainer.style.height = height + "px";
					var newWrapperHeight = containerHeight - height;
					newWrapper.style.top = height + "px";
					newWrapper.style.height = newWrapperHeight + "px";
		      NDAPI.getPipeline(self._pipelineId, 
		                    self.newsListLoadSuccess, 
		                    self.newsListLoadFailure, 
		                    self);
				};
		    advert.onerror = function(event)
		    {
		        advert.style.display = "none";
		        NDAPI.getPipeline(self._pipelineId, 
		                      self.newsListLoadSuccess, 
		                      self.newsListLoadFailure, 
		                      self);
		    };
        
				if (window.innerWith < 768)
				{
					advert.src = i18n.getStringForId("smartphone_news_home_advertisement");
				}
				else
				{
					advert.src = i18n.getStringForId("tablet_news_home_advertisement");
				}
    },

    tempDiv : null,
    newsListLoadSuccess : function(pipeline)
    {
        // no pipeline
        if (pipeline === null)
        {
          this.newsListLoadFailure();
          return;
        }
        
        var onclick = function()
        {
        	var index = this.index;
        	news.openArticles(index);
        }
        
        if (pipeline.channel.items.length == 0)
        {
            this.newsListLoadFailure();
            return;
        }
        
        var items = pipeline.channel.items.slice(0, 10);
        this.articles = items;
        var newsitems = document.getElementById("newsitems");
				if (!newsitems)
				{
					return;
				}
        var model  = newsitems.getElementsByClassName("model")[0];
        
        for (var i = 0; i < items.length; i++)
        {
        	var item = items[i];
        	item.content = htmlDecode(item.content);
            var newNode = model.cloneNode(true);
            newNode.classList.remove("model");
            var article = items[i];
            this.fillNode(newNode, article);
            newNode.index = i;
            newNode.onclick = onclick;
            newsitems.appendChild(newNode);
        }
    },
    
    fillNode : function(node, article)
    {
        var title = node.getElementsByClassName("title")[0];
        var pictureContainer = node.getElementsByClassName("title")[0];
        var picture = node.getElementsByTagName("img")[0];
        var content = node.getElementsByClassName("content")[0];
        
        title.innerText = article.title;
        picture.src = article.customfields.corpuspro_image_url_1;
        var articleContent = htmlDecode(article.content);
				if (window.innerHeight < 548)
				{
		            var length = 100;
		            length -= article.title.length;
			        content.innerHTML = articleContent.substr(0, length);
				}
				else if (window.innerWidth < 768)
				{
		            var length = 150;
		            length -= article.title.length;
			        content.innerHTML = articleContent.substr(0, length);
				}
				else
		        {
		            var length = 300;
		            length -= article.title.length;
			        content.innerHTML = articleContent.substr(0, length);
		        }
		    },
    
		    newsListLoadFailure : function()
		    {
		        var newsstand = document.getElementById("news");
		        newsstand.classList.add("no_content");
		    },
    
		    gestureInit : function()
				{
				var newsView = document.getElementById("news");
				var threshold = 20;
				var startX = 0;
				var startY = 0;
				var endX = 0;
				var endY = 0;
				var hasMoved = false;
				var handleMouseDown = function(event)
				{
					startX = event.touches ? event.touches[0].clientX : event.clientX;
					startY = event.touches ? event.touches[0].clientY : event.clientY;
					if (event.touches)
					{
						newsView.addEventListener("touchend", handleMouseUp);
						newsView.addEventListener("touchmove", handleMouseMove);
					}
					else
					{
						newsView.addEventListener("mouseup", handleMouseUp);
						newsView.addEventListener("mousemove", handleMouseMove);
					}
				};
		
				var handleMouseMove= function(event)
				{
					endX = event.touches ? event.touches[0].clientX : event.clientX;
					endY = event.touches ? event.touches[0].clientY : event.clientY;
					var diffX = endX - startX;
					var diffY = endY - startY;
		            if (Math.abs(diffY) > threshold)
		            {
		                newsView.removeEventListener("mousemove", handleMouseMove);
		                newsView.removeEventListener("mouseup", handleMouseUp);
		                newsView.removeEventListener("touchmove", handleMouseMove);
		                newsView.removeEventListener("touchend", handleMouseUp);
		                hasMoved = false;
		                startX = 0;
		                startY = 0;
		                return;
		            }
					if (Math.abs(diffX) > threshold)
					{
						hasMoved = true;
					}
				};
		
				var handleMouseUp = function(event)
				{
					newsView.removeEventListener("mousemove", handleMouseMove);
					newsView.removeEventListener("mouseup", handleMouseUp);
					newsView.removeEventListener("touchmove", handleMouseMove);
					newsView.removeEventListener("touchend", handleMouseUp);
					var diffX = endX - startX;
					var diffY = endY - startY;
		            var changePageThreshold = Math.round(window.innerHeight / 8);
					if (hasMoved)
					{
						if (Math.abs(diffX) > changePageThreshold)
						{
							if (diffX < 0)
							{
								news.goToNewsStand();
							}
						}
					}
					startX = 0;
					startY = 0;
					hasMoved = false;
				};
				newsView.addEventListener("mousedown", handleMouseDown);
				newsView.addEventListener("touchstart", handleMouseDown);	
		},
    
    openArticles : function(index)
    {
    	var newsWiew = document.getElementById("news");
	    boxedArticles.openWithArticles(this.articles, index, newsWiew);
    }
}

if (!window.plugins)
	window.plugins = {};

// template to graphic component table
var tabTemplates = {};
tabTemplates["template_none"] = {component : "template1", header: false, sectionTemplate : false};
tabTemplates["tp001"] = {component : "template1", header: false, sectionTemplate : false};
tabTemplates["tp002"] = {component : "template1", header: false, sectionTemplate : false};
tabTemplates["tp003"] = {component : "template1", header: false, sectionTemplate : false};
tabTemplates["tp004"] = {component : "template1", header: false, sectionTemplate : false};
tabTemplates["tp005"] = {component : "template2", header: true, sectionTemplate : true};
tabTemplates["tp006"] = {component : "template2", header: true, sectionTemplate : false};
tabTemplates["tp007"] = {component : "template1", header: true, sectionTemplate : false};
tabTemplates["tp008"] = {component : "template2", header: true, sectionTemplate : false};
tabTemplates["tp009"] = {component : "template2", header: true, sectionTemplate : false};
tabTemplates["tp010"] = {component : "template2", header: true, sectionTemplate : false};
tabTemplates["tp011"] = {component : "template1", header: true, sectionTemplate : false};
tabTemplates["tp012"] = {component : "template1", header: true, sectionTemplate : false};
tabTemplates["tp013"] = {component : "templateRiding", header: true, sectionTemplate : false};
tabTemplates["tp014"] = {component : "templatePortrait", header: true, sectionTemplate : false};
tabTemplates["tp015"] = {component : "template1", header: true, sectionTemplate : false};
tabTemplates["tp016"] = {component : "template1", header: false, sectionTemplate : false};
tabTemplates["tp017"] = {component : "template1", header: true, sectionTemplate : false};
tabTemplates["tp018"] = {component : "template1", header: true, sectionTemplate : false};
tabTemplates["tp019"] = {component : "templateMediaBottom", title: false, sectionTemplate : false};
tabTemplates["tp020"] = {component : "template1", header: false, sectionTemplate : false};
tabTemplates["tp021"] = {component : "template2", header: false, sectionTemplate : false};
tabTemplates["tp022"] = {component : "cover", header: false, sectionTemplate : false};

var iconArray = {}
iconArray["couverture"] = "images/iko-rubriques/" + "iko-edito.png";
iconArray["edito"] = "images/iko-rubriques/" + "iko-edito.png";
iconArray["courrier"] = "images/iko-rubriques/" + "iko-courrier-lecteurs.png";
iconArray["astuces lecteurs"] = "images/iko-rubriques/" + "iko-astuces-lecteurs.png";
iconArray["sommaire"] = "images/iko-rubriques/" + "iko-sommaire.png";
iconArray["portfolio"] = "images/iko-rubriques/" + "iko-portfolio.png";
iconArray["news"] = "images/iko-rubriques/" + "iko-news.png";
iconArray["people"] = "images/iko-rubriques/" + "iko-people.png";
iconArray["mini-view"] = "images/iko-rubriques/" + "iko-mini-view.png";
iconArray["shopping"] = "images/iko-rubriques/" + "iko-shopping.png";
iconArray["news-matos"] = "images/iko-rubriques/" + "iko-new-matos.png";
iconArray["presentation"] = "images/iko-rubriques/" + "iko-presentation.png";
iconArray["test-matos"] = "images/iko-rubriques/" + "iko-test-matos.png";
iconArray["essais"] = "images/iko-rubriques/" + "iko-essais.png";
iconArray["occasion"] = "images/iko-rubriques/" + "iko-occasion.png";
iconArray["comparatif"] = "images/iko-rubriques/" + "iko-comparatif.png";
iconArray["rando"] = "images/iko-rubriques/" + "iko-randonnee.png";
iconArray["pin-up"] = "images/iko-rubriques/" + "iko-pin-up.png";
iconArray["racing"] = "images/iko-rubriques/" + "iko-racing.png";
iconArray["abonnement"] = "images/iko-rubriques/" + "iko-abonnement.png";
iconArray["boutique"] = "images/iko-rubriques/" + "iko-boutique.png";
iconArray["technique"] = "images/iko-rubriques/" + "iko-dossier-technique.png";
iconArray["interview"] = "images/iko-rubriques/" + "iko-interview.png";
iconArray["visite"] = "images/iko-rubriques/" + "iko-visite.png";
iconArray["economie"] = "images/iko-rubriques/" + "iko-visite.png";
iconArray["evenement"] = "images/iko-rubriques/" + "iko-evenement.png";
iconArray["hi-tech"] = "images/iko-rubriques/" + "iko-hi-tech.png";
iconArray["reportage"] = "images/iko-rubriques/" + "iko-reportage.png";
iconArray["equipement"] = "images/iko-rubriques/" + "iko-equipement.png";
iconArray["guide"] = "images/iko-rubriques/" + "iko-guide.png";
iconArray["pilotage"] = "images/iko-rubriques/" + "iko-lecon-de-pilotage.png";
iconArray["jeu-concours"] = "images/iko-rubriques/" + "iko-jeu-concours.png";
iconArray["enquête"] = "images/iko-rubriques/" + "iko-enquete.png";

iconArray["Couverture"] = "images/iko-rubriques/" + "iko-edito.png";
iconArray["Edito"] = "images/iko-rubriques/" + "iko-edito.png";
iconArray["Courrier"] = "images/iko-rubriques/" + "iko-courrier-lecteurs.png";
iconArray["Astuces-lecteurs"] = "images/iko-rubriques/" + "iko-astuces-lecteurs.png";
iconArray["Sommaire"] = "images/iko-rubriques/" + "iko-sommaire.png";
iconArray["Porfolio"] = "images/iko-rubriques/" + "iko-portfolio.png";
iconArray["News"] = "images/iko-rubriques/" + "iko-news.png";
iconArray["People"] = "images/iko-rubriques/" + "iko-people.png";
iconArray["Mini-view"] = "images/iko-rubriques/" + "iko-mini-view.png";
iconArray["Shopping"] = "images/iko-rubriques/" + "iko-shopping.png";
iconArray["News-Matos"] = "images/iko-rubriques/" + "iko-new-matos.png";
iconArray["Présentation"] = "images/iko-rubriques/" + "iko-presentation.png";
iconArray["Test-Matos"] = "images/iko-rubriques/" + "iko-test-matos.png";
iconArray["Essais"] = "images/iko-rubriques/" + "iko-essais.png";
iconArray["Occasion"] = "images/iko-rubriques/" + "iko-occasion.png";
iconArray["Comparatif"] = "images/iko-rubriques/" + "iko-comparatif.png";
iconArray["Rando"] = "images/iko-rubriques/" + "iko-randonnee.png";
iconArray["Pin-up"] = "images/iko-rubriques/" + "iko-pin-up.png";
iconArray["Racing"] = "images/iko-rubriques/" + "iko-racing.png";
iconArray["Abonnement"] = "images/iko-rubriques/" + "iko-abonnement.png";
iconArray["Boutique"] = "images/iko-rubriques/" + "iko-boutique.png";
iconArray["Technique"] = "images/iko-rubriques/" + "iko-dossier-technique.png";
iconArray["Interview"] = "images/iko-rubriques/" + "iko-interview.png";
iconArray["Visite"] = "images/iko-rubriques/" + "iko-visite.png";
iconArray["Economie"] = "images/iko-rubriques/" + "iko-visite.png";
iconArray["Evenement"] = "images/iko-rubriques/" + "iko-evenement.png";
iconArray["Hi-tech"] = "images/iko-rubriques/" + "iko-hi-tech.png";
iconArray["Reportage"] = "images/iko-rubriques/" + "iko-reportage.png";
iconArray["Equipment"] = "images/iko-rubriques/" + "iko-equipement.png";
iconArray["Guide"] = "images/iko-rubriques/" + "iko-guide.png";
iconArray["Pilotage"] = "images/iko-rubriques/" + "iko-lecon-de-pilotage.png";
iconArray["Jeu-concours"] = "images/iko-rubriques/" + "iko-jeu-concours.png";
iconArray["Enquête"] = "images/iko-rubriques/" + "iko-enquete.png";

var UIInterfaceOrientationPortrait = "0";
var UIInterfaceOrientationPortraitUpSideDown = "180";
var UIInterfaceOrientationLandscapeLeft = "90";
var UIInterfaceOrientationLandscapeRight = "-90";
var InterfaceOrientationPortrait = [UIInterfaceOrientationPortrait,
									UIInterfaceOrientationPortraitUpSideDown];
var InterfaceOrientationAll = [UIInterfaceOrientationPortrait,
							   UIInterfaceOrientationPortraitUpSideDown,
							   UIInterfaceOrientationLandscapeLeft,
							   UIInterfaceOrientationLandscapeRight];

var application =
{
	supportedOrientations : InterfaceOrientationPortrait,
	
	initNetworkEventListeneer : function()
	{
		document.addEventListener("offline", this.offlineEventHandler);
		document.addEventListener("online", this.onlineEventHandler);
	},
	
	onlineEventHandler : function(event)
	{
		var application = document.getElementById("application");
		if (application.classList.contains("newsstand"))
		{
			newsstand.loadMagazines();
			news.load();
		}
		dlog("online");
	},
	
	offlineEventHandler : function(event)
	{
		dlog("offline");
	},
	
	setMinimalWindowHeight: function()
	{
		var height = window.innerHeight;
		var body = document.getElementsByTagName("html")[0];
		body.style.minHeight = height  + "px";
	},
	
	initApplication : function ()
	{
		dlog("screen size : " + window.innerWidth + " x " + window.innerHeight);
		
		this.setMinimalWindowHeight();
		this.initNetworkEventListeneer();
		
		// init inapp plugin
		if (!window.plugins.inAppPlugin)
		{
			window.plugins.inAppPlugin = new InAppPlugin();
		}		
		
		/* fix variable name differences between android and iOS */
		if (!window.Cordova)
		{
			Cordova = cordova;
		}
		
		if (!window.DeviceInfo)
		{
			DeviceInfo = device;
		}
		var lang = DeviceInfo.lang;
		i18n.setLanguageCode(lang);
		if (DeviceInfo.env == "production")
			NDAPI._baseURL = i18n.getStringForId("base_url");
		else
			NDAPI._baseURL = i18n.getStringForId("base_url_staging");
		initText();
		
		var appInitCallback = function()
		{
			var applicationView = document.getElementById("application");
			if (!window.user)
			{
				var value = localStorage.getItem("user");
				if (value !== null && value !== undefined)
				{
					user = new User(value);
					var callback = function(result)
					{						
						if (result.success === true && user._isAnonymous === false)
						{
							applicationView.classList.add("loggedIn");
						}
						loadComponent("newsstand", applicationView, newsstand);
					}
					user.logIn(user._login, user._password, callback);
				}
				else
				{
					user = new User();
					loadComponent("newsstand", applicationView, newsstand);
				}
			}
		}
		
		FileManager.ROOT_DIRECTORY_NAME = i18n.getStringForId("root_directory_name");
		window.console.log("root directory = " + FileManager.ROOT_DIRECTORY_NAME);
		// fix app directory name change upon update
        FileManager.getMagazinesRootDirectoryEntry(function(result)
                                                 {
                                                   application.contentRootDirectory = result.fullPath;
                                                   appInitCallback();
                                                 },
                                                 function(error)
                                                 {
                                                   appInitCallback();
                                                 }, null)
		Splash.showStartupSplash();
	}
}

function supportedOrientations()
{
	return (JSON.stringify(application.supportedOrientations));
}

function initText()
{
	document.getElementById("tou_close").innerText = i18n.getStringForId("close");
	//document.getElementById("tou_title").innerText = i18n.getStringForId("tou_title");
	document.getElementById("tou_content").innerHTML = i18n.getStringForId("tou_content");
}


var help =
{
	currentPageIndex : 0,
	
	show : function()
	{
		var applicationView = document.getElementById("application");
        
        this.currentPageIndex = 0;
		var help_pages = document.getElementById("help_pages");
        help_pages.style.webkitTransform = "translate3d(0, 0, 0)";
        
		this.updateIndicators();
		this.gestureInit();
		tabbar.goToHelp();
	},
	
	hide : function()
	{
		this.removeGesture();
	},
	
	presentModalView : function(vertical_gesture)
	{
		this.updateIndicators();
		this.gestureInit(vertical_gesture);
		
		var applicationView = document.getElementById("application");

        this.currentPageIndex = 0;
        var help_pages = document.getElementById("help_pages");
        help_pages.style.webkitTransform = "translate3d(0, 0, 0)";
		var helpView = document.getElementById("help");
		helpView.classList.add("animTransfrom");
		
        applicationView.classList.add("help");
	},
	
	dismissModalView : function()
	{
		this.removeGesture();
		var applicationView = document.getElementById("application");
		applicationView.classList.remove("help");
	},
	
	gestureInit : function(vertical_gesture)
	{
		if (vertical_gesture !== true)
		{
			vertical_gesture = false;
		}
		
		var helpView = document.getElementById("help");
		var help_pages = document.getElementById("help_pages");
        var pages = help_pages.getElementsByClassName("page");
        var content = null;
		var threshold = 5;
		var startX = 0;
		var startY = 0;
		var endX = 0;
		var endY = 0;
		var scroll = 0;
		var quarter_screen = window.innerWidth / 4;
		var pages = help_pages.getElementsByClassName("page");
		var max_scroll = window.innerWidth * (pages.length - 1);
		var hasMovedX = false;
		var hasMovedY = false;
        var wantToDismiss = false;
		
		var handleMouseDown = function(event)
		{
			help_pages.classList.remove("animTransfrom");
			helpView.classList.remove("animTransfrom");
            
            content = pages[help.currentPageIndex].getElementsByClassName("content")[0];

			startX = event.touches ? event.touches[0].clientX : event.clientX;
			startY = event.touches ? event.touches[0].clientY : event.clientY;
			if (event.touches)
			{
				help_pages.addEventListener("touchend", handleMouseUp);
				help_pages.addEventListener("touchmove", handleMouseMove);
			}
			else
			{
				help_pages.addEventListener("mouseup", handleMouseUp);
				help_pages.addEventListener("mousemove", handleMouseMove);
			}
		};
		
		var handleMouseMove= function(event)
		{
			endX = event.touches ? event.touches[0].clientX : event.clientX;
			endY = event.touches ? event.touches[0].clientY : event.clientY;
			var diffX = endX - startX;
			var diffY = endY - startY;
			
			if (hasMovedY ||
                (Math.abs(diffY) > threshold &&
				hasMovedX == false))
			{
				hasMovedY = true;
			}
			
            if (hasMovedX ||
                (Math.abs(diffX) > threshold &&
                 hasMovedY == false))
			{
				hasMovedX = true;
			}
            
			if ((diffY > 0 &&                // swap down
                wantToDismiss == true) ||    // have already detect the intention of dismiss
                (vertical_gesture &&        // vertical gesture allowed
                hasMovedY == true &&        // y threshold reached
                diffY > 0 &&                // swap down
                (!content ||                // content is presente on the page not scrolling
                 (content &&
                  content.scrollTop == 0)) &&
                hasMovedX == false))        // intention is not to swipe left or right
			{
                event.preventDefault();
                wantToDismiss = true;
				helpView.style.webkitTransform = "translate3d(0, "+diffY+"px, 0)";
				return;
			}
			
			if (hasMovedX)
			{
                event.preventDefault();
				help_pages.style.webkitTransform = "translate3d("+ (scroll + diffX) + "px, 0, 0)";
			}
		};
		
		var handleMouseUp = function(event)
		{
			help_pages.removeEventListener("mousemove", handleMouseMove);
			help_pages.removeEventListener("mouseup", handleMouseUp);
			help_pages.removeEventListener("touchmove", handleMouseMove);
			help_pages.removeEventListener("touchend", handleMouseUp);
			var diffX = endX - startX;
			var diffY = endY - startY;
			if (hasMovedY)
			{
				if (vertical_gesture &&
					hasMovedY &&
					diffY > 0 &&
                    wantToDismiss)
				{
					help.dismissModalView();
					helpView.classList.add("animTransfrom");
					helpView.style.webkitTransform = "";
				}
            }
            else if (hasMovedX)
            {
				// move backward
				if (diffX >= 0)
				{
					if (help.currentPageIndex <= 0)
					{
						scroll = 0;
						help.currentPageIndex = 0;
					}
					else
					{
						scroll = -(help.currentPageIndex - 1) * window.innerWidth;
						help.currentPageIndex -= 1;
					}
				}
				// move forward
				else if (diffX < 0)
				{
					if (help.currentPageIndex >= pages.length - 1)
					{
						scroll = -max_scroll;
						help.currentIssueIndex = pages.length;
					}
					else
					{
						scroll = -(help.currentPageIndex + 1) * window.innerWidth;
						help.currentPageIndex += 1;
					}
				}

				help_pages.classList.add("animTransfrom");
				help_pages.style.webkitTransform = "translate3d("+ (scroll) + "px, 0, 0)";
				help.updateIndicators();
			}
            resetViewerVariables();
		};
		
		var resetViewerVariables = function()
		{
			startX = 0;
			startY = 0;
			hasMovedX = false;
			hasMovedY = false;
            wantToDismiss = false;
		}
		
		help_pages.addEventListener("mousedown", handleMouseDown);
		help_pages.addEventListener("touchstart", handleMouseDown);
	},

	removeGesture : function()
	{
		var help_pages = document.getElementById("help_pages");
		help_pages.removeEventListener("mousedown");
		help_pages.removeEventListener("touchstart");
	},
	
	resetIndicators : function()
	{
		var indicators = document.getElementsByClassName("page_indicator");
		for (var i = 0; i < indicators.length; i++)
		{
			indicators[i].classList.remove("current_page");
		}
	},

	updateIndicators : function()
	{
		var indicators = document.getElementsByClassName("page_indicator");
		if (this.currentPageIndex == 0)
		{
			indicators[this.currentPageIndex + 1].classList.remove("current_page");
		}
		else if (this.currentPageIndex == indicators.length - 1)
		{
			indicators[this.currentPageIndex - 1].classList.remove("current_page");
		}
		else
		{
			indicators[this.currentPageIndex + 1].classList.remove("current_page");
			indicators[this.currentPageIndex - 1].classList.remove("current_page");
		}
		indicators[this.currentPageIndex].classList.add("current_page");
	}
}

/*
 *  md5.js 1.0b 27/06/96
 *
 * Javascript implementation of the RSA Data Security, Inc. MD5
 * Message-Digest Algorithm.
 *
 * Copyright (c) 1996 Henri Torgemane. All Rights Reserved.
 *
 * Permission to use, copy, modify, and distribute this software
 * and its documentation for any purposes and without
 * fee is hereby granted provided that this copyright notice
 * appears in all copies.
 *
 * Of course, this soft is provided "as is" without express or implied
 * warranty of any kind.
 *
 *
 * Modified with german comments and some information about collisions.
 * (Ralf Mieke, ralf@miekenet.de, http://mieke.home.pages.de)
 * French translation: Serge François, serge@selfhtml.org, http://fr.selfhtml.org
 */



function array(n) {
  for(i=0;i<n;i++) this[i]=0;
  this.length=n;
}



/* Quelques fonctions fondamentales doivent être transformées à cause
 * d'erreurs Javascript.
 * Essayez par exemple de calculer 0xffffffff >> 4 ...
 * Les fonctions utilisées maintenant sont il est vrai plus lentes que les
 * fonctions originales mais elles fonctionnent.
 */

function integer(n) { return n%(0xffffffff+1); }

function shr(a,b) {
  a=integer(a);
  b=integer(b);
  if (a-0x80000000>=0) {
    a=a%0x80000000;
    a>>=b;
    a+=0x40000000>>(b-1);
  } else
    a>>=b;
  return a;
}

function shl1(a) {
  a=a%0x80000000;
  if (a&0x40000000==0x40000000)
  {
    a-=0x40000000;
    a*=2;
    a+=0x80000000;
  } else
    a*=2;
  return a;
}

function shl(a,b) {
  a=integer(a);
  b=integer(b);
  for (var i=0;i<b;i++) a=shl1(a);
  return a;
}

function and(a,b) {
  a=integer(a);
  b=integer(b);
  var t1=(a-0x80000000);
  var t2=(b-0x80000000);
  if (t1>=0)
    if (t2>=0)
      return ((t1&t2)+0x80000000);
    else
      return (t1&b);
  else
    if (t2>=0)
      return (a&t2);
    else
      return (a&b);
}

function or(a,b) {
  a=integer(a);
  b=integer(b);
  var t1=(a-0x80000000);
  var t2=(b-0x80000000);
  if (t1>=0)
    if (t2>=0)
      return ((t1|t2)+0x80000000);
    else
      return ((t1|b)+0x80000000);
  else
    if (t2>=0)
      return ((a|t2)+0x80000000);
    else
      return (a|b);
}

function xor(a,b) {
  a=integer(a);
  b=integer(b);
  var t1=(a-0x80000000);
  var t2=(b-0x80000000);
  if (t1>=0)
    if (t2>=0)
      return (t1^t2);
    else
      return ((t1^b)+0x80000000);
  else
    if (t2>=0)
      return ((a^t2)+0x80000000);
    else
      return (a^b);
}

function not(a) {
  a=integer(a);
  return (0xffffffff-a);
}

/* Début de l'algorithme */

    var state = new array(4);
    var count = new array(2);
        count[0] = 0;
        count[1] = 0;
    var buffer = new array(64);
    var transformBuffer = new array(16);
    var digestBits = new array(16);

    var S11 = 7;
    var S12 = 12;
    var S13 = 17;
    var S14 = 22;
    var S21 = 5;
    var S22 = 9;
    var S23 = 14;
    var S24 = 20;
    var S31 = 4;
    var S32 = 11;
    var S33 = 16;
    var S34 = 23;
    var S41 = 6;
    var S42 = 10;
    var S43 = 15;
    var S44 = 21;

    function F(x,y,z) {
        return or(and(x,y),and(not(x),z));
    }

    function G(x,y,z) {
        return or(and(x,z),and(y,not(z)));
    }

    function H(x,y,z) {
        return xor(xor(x,y),z);
    }

    function I(x,y,z) {
        return xor(y ,or(x , not(z)));
    }

    function rotateLeft(a,n) {
        return or(shl(a, n),(shr(a,(32 - n))));
    }

    function FF(a,b,c,d,x,s,ac) {
        a = a+F(b, c, d) + x + ac;
        a = rotateLeft(a, s);
        a = a+b;
        return a;
    }

    function GG(a,b,c,d,x,s,ac) {
        a = a+G(b, c, d) +x + ac;
        a = rotateLeft(a, s);
        a = a+b;
        return a;
    }

    function HH(a,b,c,d,x,s,ac) {
        a = a+H(b, c, d) + x + ac;
        a = rotateLeft(a, s);
        a = a+b;
        return a;
    }

    function II(a,b,c,d,x,s,ac) {
        a = a+I(b, c, d) + x + ac;
        a = rotateLeft(a, s);
        a = a+b;
        return a;
    }

    function transform(buf,offset) {
        var a=0, b=0, c=0, d=0;
        var x = transformBuffer;

        a = state[0];
        b = state[1];
        c = state[2];
        d = state[3];

        for (i = 0; i < 16; i++) {
            x[i] = and(buf[i*4+offset],0xff);
            for (j = 1; j < 4; j++) {
                x[i]+=shl(and(buf[i*4+j+offset] ,0xff), j * 8);
            }
        }

        /* tour 1 */
        a = FF ( a, b, c, d, x[ 0], S11, 0xd76aa478); /* 1 */
        d = FF ( d, a, b, c, x[ 1], S12, 0xe8c7b756); /* 2 */
        c = FF ( c, d, a, b, x[ 2], S13, 0x242070db); /* 3 */
        b = FF ( b, c, d, a, x[ 3], S14, 0xc1bdceee); /* 4 */
        a = FF ( a, b, c, d, x[ 4], S11, 0xf57c0faf); /* 5 */
        d = FF ( d, a, b, c, x[ 5], S12, 0x4787c62a); /* 6 */
        c = FF ( c, d, a, b, x[ 6], S13, 0xa8304613); /* 7 */
        b = FF ( b, c, d, a, x[ 7], S14, 0xfd469501); /* 8 */
        a = FF ( a, b, c, d, x[ 8], S11, 0x698098d8); /* 9 */
        d = FF ( d, a, b, c, x[ 9], S12, 0x8b44f7af); /* 10 */
        c = FF ( c, d, a, b, x[10], S13, 0xffff5bb1); /* 11 */
        b = FF ( b, c, d, a, x[11], S14, 0x895cd7be); /* 12 */
        a = FF ( a, b, c, d, x[12], S11, 0x6b901122); /* 13 */
        d = FF ( d, a, b, c, x[13], S12, 0xfd987193); /* 14 */
        c = FF ( c, d, a, b, x[14], S13, 0xa679438e); /* 15 */
        b = FF ( b, c, d, a, x[15], S14, 0x49b40821); /* 16 */

        /* tour 2 */
        a = GG ( a, b, c, d, x[ 1], S21, 0xf61e2562); /* 17 */
        d = GG ( d, a, b, c, x[ 6], S22, 0xc040b340); /* 18 */
        c = GG ( c, d, a, b, x[11], S23, 0x265e5a51); /* 19 */
        b = GG ( b, c, d, a, x[ 0], S24, 0xe9b6c7aa); /* 20 */
        a = GG ( a, b, c, d, x[ 5], S21, 0xd62f105d); /* 21 */
        d = GG ( d, a, b, c, x[10], S22,  0x2441453); /* 22 */
        c = GG ( c, d, a, b, x[15], S23, 0xd8a1e681); /* 23 */
        b = GG ( b, c, d, a, x[ 4], S24, 0xe7d3fbc8); /* 24 */
        a = GG ( a, b, c, d, x[ 9], S21, 0x21e1cde6); /* 25 */
        d = GG ( d, a, b, c, x[14], S22, 0xc33707d6); /* 26 */
        c = GG ( c, d, a, b, x[ 3], S23, 0xf4d50d87); /* 27 */
        b = GG ( b, c, d, a, x[ 8], S24, 0x455a14ed); /* 28 */
        a = GG ( a, b, c, d, x[13], S21, 0xa9e3e905); /* 29 */
        d = GG ( d, a, b, c, x[ 2], S22, 0xfcefa3f8); /* 30 */
        c = GG ( c, d, a, b, x[ 7], S23, 0x676f02d9); /* 31 */
        b = GG ( b, c, d, a, x[12], S24, 0x8d2a4c8a); /* 32 */

        /* tour 3 */
        a = HH ( a, b, c, d, x[ 5], S31, 0xfffa3942); /* 33 */
        d = HH ( d, a, b, c, x[ 8], S32, 0x8771f681); /* 34 */
        c = HH ( c, d, a, b, x[11], S33, 0x6d9d6122); /* 35 */
        b = HH ( b, c, d, a, x[14], S34, 0xfde5380c); /* 36 */
        a = HH ( a, b, c, d, x[ 1], S31, 0xa4beea44); /* 37 */
        d = HH ( d, a, b, c, x[ 4], S32, 0x4bdecfa9); /* 38 */
        c = HH ( c, d, a, b, x[ 7], S33, 0xf6bb4b60); /* 39 */
        b = HH ( b, c, d, a, x[10], S34, 0xbebfbc70); /* 40 */
        a = HH ( a, b, c, d, x[13], S31, 0x289b7ec6); /* 41 */
        d = HH ( d, a, b, c, x[ 0], S32, 0xeaa127fa); /* 42 */
        c = HH ( c, d, a, b, x[ 3], S33, 0xd4ef3085); /* 43 */
        b = HH ( b, c, d, a, x[ 6], S34,  0x4881d05); /* 44 */
        a = HH ( a, b, c, d, x[ 9], S31, 0xd9d4d039); /* 45 */
        d = HH ( d, a, b, c, x[12], S32, 0xe6db99e5); /* 46 */
        c = HH ( c, d, a, b, x[15], S33, 0x1fa27cf8); /* 47 */
        b = HH ( b, c, d, a, x[ 2], S34, 0xc4ac5665); /* 48 */

        /* tour 4 */
        a = II ( a, b, c, d, x[ 0], S41, 0xf4292244); /* 49 */
        d = II ( d, a, b, c, x[ 7], S42, 0x432aff97); /* 50 */
        c = II ( c, d, a, b, x[14], S43, 0xab9423a7); /* 51 */
        b = II ( b, c, d, a, x[ 5], S44, 0xfc93a039); /* 52 */
        a = II ( a, b, c, d, x[12], S41, 0x655b59c3); /* 53 */
        d = II ( d, a, b, c, x[ 3], S42, 0x8f0ccc92); /* 54 */
        c = II ( c, d, a, b, x[10], S43, 0xffeff47d); /* 55 */
        b = II ( b, c, d, a, x[ 1], S44, 0x85845dd1); /* 56 */
        a = II ( a, b, c, d, x[ 8], S41, 0x6fa87e4f); /* 57 */
        d = II ( d, a, b, c, x[15], S42, 0xfe2ce6e0); /* 58 */
        c = II ( c, d, a, b, x[ 6], S43, 0xa3014314); /* 59 */
        b = II ( b, c, d, a, x[13], S44, 0x4e0811a1); /* 60 */
        a = II ( a, b, c, d, x[ 4], S41, 0xf7537e82); /* 61 */
        d = II ( d, a, b, c, x[11], S42, 0xbd3af235); /* 62 */
        c = II ( c, d, a, b, x[ 2], S43, 0x2ad7d2bb); /* 63 */
        b = II ( b, c, d, a, x[ 9], S44, 0xeb86d391); /* 64 */

        state[0] +=a;
        state[1] +=b;
        state[2] +=c;
        state[3] +=d;

    }
    /* Avec l'initialisation de  Dobbertin:
       state[0] = 0x12ac2375;
       state[1] = 0x3b341042;
       state[2] = 0x5f62b97c;
       state[3] = 0x4ba763ed;
       s'il y a une collision:

       begin 644 Message1
       M7MH=JO6_>MG!X?!51$)W,CXV!A"=(!AR71,<X`Y-IIT9^Z&8L$2N'Y*Y:R.;
       39GIK9>TF$W()/MEHR%C4:G1R:Q"=
       `
       end

       begin 644 Message2
       M7MH=JO6_>MG!X?!51$)W,CXV!A"=(!AR71,<X`Y-IIT9^Z&8L$2N'Y*Y:R.;
       39GIK9>TF$W()/MEHREC4:G1R:Q"=
       `
       end
    */
    function init() {
        count[0]=count[1] = 0;
        state[0] = 0x67452301;
        state[1] = 0xefcdab89;
        state[2] = 0x98badcfe;
        state[3] = 0x10325476;
        for (i = 0; i < digestBits.length; i++)
            digestBits[i] = 0;
    }

    function update(b) {
        var index,i;

        index = and(shr(count[0],3) , 0x3f);
        if (count[0]<0xffffffff-7)
          count[0] += 8;
        else {
          count[1]++;
          count[0]-=0xffffffff+1;
          count[0]+=8;
        }
        buffer[index] = and(b,0xff);
        if (index  >= 63) {
            transform(buffer, 0);
        }
    }

    function finish() {
        var bits = new array(8);
        var        padding;
        var        i=0, index=0, padLen=0;

        for (i = 0; i < 4; i++) {
            bits[i] = and(shr(count[0],(i * 8)), 0xff);
        }
        for (i = 0; i < 4; i++) {
            bits[i+4]=and(shr(count[1],(i * 8)), 0xff);
        }
        index = and(shr(count[0], 3) ,0x3f);
        padLen = (index < 56) ? (56 - index) : (120 - index);
        padding = new array(64);
        padding[0] = 0x80;
        for (i=0;i<padLen;i++)
          update(padding[i]);
        for (i=0;i<8;i++)
          update(bits[i]);

        for (i = 0; i < 4; i++) {
            for (j = 0; j < 4; j++) {
                digestBits[i*4+j] = and(shr(state[i], (j * 8)) , 0xff);
            }
        }
    }

/* Fin de l'algorithme MD5 */

function hexa(n) {
 var hexa_h = "0123456789abcdef";
 var hexa_c="";
 var hexa_m=n;
 for (hexa_i=0;hexa_i<8;hexa_i++) {
   hexa_c=hexa_h.charAt(Math.abs(hexa_m)%16)+hexa_c;
   hexa_m=Math.floor(hexa_m/16);
 }
 return hexa_c;
}


var ascii="01234567890123456789012345678901" +
          " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ"+
          "[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";

function MD5(message)
{
 var l,s,k,ka,kb,kc,kd;

 init();
 for (k=0;k<message.length;k++) {
   l=message.charAt(k);
   update(ascii.lastIndexOf(l));
 }
 finish();
 ka=kb=kc=kd=0;
 for (i=0;i<4;i++) ka+=shl(digestBits[15-i], (i*8));
 for (i=4;i<8;i++) kb+=shl(digestBits[15-i], ((i-4)*8));
 for (i=8;i<12;i++) kc+=shl(digestBits[15-i], ((i-8)*8));
 for (i=12;i<16;i++) kd+=shl(digestBits[15-i], ((i-12)*8));
 s=hexa(kd)+hexa(kc)+hexa(kb)+hexa(ka);
 return s;
}

var Utils = {};

Utils.IMAGE_SCRIPT_SECRET = "fb65nd42";

Utils.getResizedImageUrl = function(width, height, url)
{
  // "${secret}:${width}x${height}_${url}"
  // get_ext_photo?url=hpg&width=120&height=80&sig=a7df2500ca5cfeeb1800a5f91c535d38
  var sig = MD5(Utils.IMAGE_SCRIPT_SECRET 
            + ":" 
            + width 
            + "x" 
            + height 
            + "_" 
            + url);
  var croppedImageUrl = i18n.getStringForId("front_host_url") + "get_ext_photo.php?url="
                        + encodeURIComponent(url)
                        + "&width="
                        + width
                        + "&height="
                        + height
                        + "&sig="
                        + sig;
    return (croppedImageUrl);
};

/*
Utils.getCacheImageUrl = function(url)
{
  if (URLMap !== null && URLMap[url])
    return (URLMap[url]);
  else
    return (url);
};

Utils.getContentCachedImageForElement = function(element)
{
  var imgTags = element.getElementsByTagName("img");
  for (var i = 0; i < imgTags.length; i++)
  {
    var img = imgTags[i];
    img.src = Utils.getCacheImageUrl(img.src);
  }
};

*/

function htmlDecode(input)
{
    var e = document.createElement('div');
    e.innerHTML = input;
    if (e.childNodes.length == 0)
    {
      return "";
    }
    else
    {
        if (e.childNodes[0].nodeValue)
        {
            return e.childNodes[0].nodeValue;
        }
        else
        {
            return e.childNodes[0].innerHTML;
        }
    }
    return "";
}

function nonClickableImage(element)
{
  var bodyImages = element.getElementsByTagName("img");
    for (var i = 0; i < bodyImages.length; i++)
    {
      var bodyImage = bodyImages[i];
      var bodyImageParent = bodyImage.parentNode;
      if (bodyImageParent.tagName == "A")
      {
         bodyImageParent.parentNode.replaceChild(bodyImage, bodyImageParent);
      }
    }
}

function clickableLink(element)
{
  var linkClicked = function(event)
    {
      event.stopPropagation();
      event.preventDefault();
      window.plugins.openURLPlugin.open(this.href);
      dlog("open link to : " + link.href);
    };
    
  var links = element.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++)
  {
    var link = links[i];
    link.addEventListener(POINTER_END, linkClicked, false);
  }
}

function clickableImage(vsdImage, url, parentComponent)
{
  var imageButton = new vs.ui.Button({
                                        position: vsdImage.position,
                                        size: vsdImage.size
                                      });
  imageButton.init();
  imageButton.addClassName("imageButton");
  parentComponent.add(imageButton);
  imageButton.bind("select", 
                    parentComponent, 
                    function()
                    {
                      dlog("button image clicked");
                      window.plugins.openURLPlugin.open(url);
                    });
  var parentNode = vsdImage.view.parentNode;
  var nextSibling = vsdImage.view.nextSibling;
  if (nextSibling)
    parentNode.insertBefore(imageButton.view, nextSibling);
  else
    parentNode.appendChild(imageButton.view);
  return (imageButton);
}

function trim (aString) 
{ 
  return aString.replace(/^\s+/g,'').replace(/\s+$/g,'');
} 

function isset(object)
{
  return (object !== null && object !== undefined);
}

function isFunction(object)
{
  return ("function" === typeof object);
}

function str_pad(value)
{
  if (value <= 9)
  {
    return ("0" + value);
  }
  return (""+value);
}

function isOffline()
{
   return (navigator.network &&
           (navigator.network.connection.type == Connection.UNKNOWN ||
            navigator.network.connection.type == Connection.NONE));
}

function jetskiAlert(message, title, button)
{
    if (device.cordova)
    {
        navigator.notification.alert(message, null, title, button);
    }
    else
    {
        window.alert(message);
    }
}

var downloadQueue =
{
	delegate : null,
	_queue : [],
	_isDownloading : false,
	_isPaused : false,
	_currentIssue : null,
	
	queueForDownload : function(issue, sectionToDownload)
	{
		this._queue.push({issue: issue, sections: sectionToDownload, download: true});
		this.didQueueIssueForDownload(issue);
		if (this._queue.length == 1 && this._isDownloading == false)
		{
			this._next();
		}
	},
	
	queueForDelete : function(issue, sectionToDelete)
	{
		this._queue.push({issue: issue, sections: sectionToDelete, download: false});
		this.didQueueIssueForDelete(issue);
		if (this._queue.length == 1 && this._isDownloading == false)
		{
			this._next();
		}
	},
	
	isQueued : function(issue)
	{
		for (var i = 0; i < this._queue.length; i++)
		{
			var queuedIssue = this._queue[i];
			if (queuedIssue.issue.id == issue.id)
			{
				return (true);
			}
		}
		return (false);
	},
	
	dequeue : function(issue)
	{
		for (var i = 0; i < this._queue.length; i++)
		{
			var queuedIssue = this._queue[i];
			if (queuedIssue.issue.id == issue.id)
			{
				this._queue.splice(i, 1);
				return;
			}
		}
	},
	
	_next : function()
	{
		if (this._queue.length == 0)
        {
            this._currentIssue = null
			return;
        }
		
		var queueItem = this._queue.shift();
		this._currentIssue = queueItem.issue;
		if (queueItem.download)
		{
			this._isDownloading = true;
			queueItem.issue.downloadSections(this, queueItem.sections);
		}
		else
		{
			queueItem.issue.deleteSections(this, queueItem.sections);
		}
	},
	
	pause : function()
	{
		if (this._currentIssue == null)
		{
			return;
		}
		
		this._currentIssue.stopDownload();
		this._isPaused = true;
		this._isDownloading = false;
	},
	
	resume : function()
	{
		if (this._currentIssue == null)
		{
			return;
		}
		
		this._currentIssue.resumeDownloadSections(this);
		this._isPaused = false;
		this._isDownloading = true;
	},

	listeners :
	{
		queue : [],
		magazineDownload : [],
		magazineDelete : [],
		sectionDownload : [],
		itemDownload : [],
		itemGalleryImageDownload : []
	},
	
	addListener : function(eventType, listener)
	{
		switch (eventType)
		{
			case "queue" :
				this.listeners.queue.push(listener);
				break;
			case "magazineDownload" :
				this.listeners.magazineDownload.push(listener);
				break;
			case "magazineDelete" :
				this.listeners.magazineDelete.push(listener);
				break;
			case "sectionDownload" :
				this.listeners.sectionDownload.push(listener);
				break;
			case "itemDownload" :
				this.listeners.itemDownload.push(listener);
				break;
			case "itemGalleryImageDownload" :
				this.listeners.itemGalleryImageDownload.push(listener);
				break;
			default :
				break;
		}
	},
	
	removeListener : function(eventType, listener)
	{
		if (this.listeners[eventType])
		{
			var listeners = this.listeners[eventType];
			for (var i = 0; i < listeners.length; i++)
			{
				if (listeners[i] == listener)
				{
					listeners.splice(i, 1);
				}
			}
		}
	},
	
	fireEvent : function(eventType, functionName, data)
	{
		if (this.listeners[eventType])
		{
			var listeners = this.listeners[eventType];
			for (var i = 0; i < listeners.length; i++)
			{
			  if (listeners[i][functionName] &&
				  "function" == typeof listeners[i][functionName])
			  {
				  listeners[i][functionName](data);
			  }
			}
		}
	},
	
	didQueueIssueForDownload : function(issue)
	{
		var data = {issue : issue};
		this.fireEvent("queue", "didQueueIssueForDownload", data);
	},
	
	didQueueIssueForDelete : function(issue)
	{
		var data = {issue : issue};
		this.fireEvent("queue", "didQueueIssueForDelete", data);
	},
	
	magazineDownloadDidStart : function(issue)
	{
		dlog("magazineDownload");
		var data = {issue : issue};
		this.fireEvent("magazineDownload", "magazineDownloadDidStart", data);
	},
	
	magazineDownloadDidStop : function(issue)
	{
		this._isDownloading = false;
		dlog("magazineDownloadDidStop");
		var data = {issue : issue};
		this.fireEvent("magazineDownload", "magazineDownloadDidStop", data);
		
		// the next method must be the last call, because we have to be sure
		// the event has been dispatch before starting a new download
		// else event for the new download will be fire before the event for the finished one
		// and the ui won't be updated correctly
		//this._next();
	},
	
	magazineDownloadDidFinish : function(issue)
	{
		this._isDownloading = false;
		dlog("magazineDownloadDidFinish");
		var progress = Math.round((issue._downloadState.downloadedSections.length / issue.sections.length) * 100);
		var data = {issue : issue, progress: progress};
		this.fireEvent("magazineDownload", "magazineDownloadDidFinish", data);
		
		// the next method must be the last call, because we have to be sure
		// the event has been dispatch before starting a new download
		// else event for the new download will be fire before the event for the finished one
		// and the ui won't be updated correctly
		this._next();
	},
	
	magazineDownloadDidFinishWithError : function(issue, error)
	{
		this._isDownloading = false;
		dlog("magazineDownloadDidFinishWithError");
		var data = {issue : issue, error : error};
		this.fireEvent("magazineDownload", "magazineDownloadDidFinishWithError", data);
		
		// the next method must be the last call, because we have to be sure
		// the event has been dispatch before starting a new download
		// else event for the new download will be fire before the event for the finished one
		// and the ui won't be updated correctly
		this._next();
	},
	
	sectionDownloadDidStart : function(issue, section, sectionIndex)
	{
		dlog("sectionDownloadDidStart " + sectionIndex);
		var data = {issue : issue, section : section, sectionIndex: sectionIndex};
		this.fireEvent("sectionDownload", "sectionDownloadDidStart", data);
	},
	
    sectionDownloadDidStop : function(issue, section, sectionIndex)
    {
        dlog("sectionDownloadDidStop " + sectionIndex);
		var data = {issue : issue, section : section, sectionIndex: sectionIndex};
		this.fireEvent("sectionDownload", "sectionDownloadDidStop", data);
    },
    
	sectionDownloadDidFinish : function(issue, section, sectionIndex)
	{
		var sectionCount = issue.sections.length;
		var progress = Math.floor(((sectionIndex + 1) / issue._sectionsToDownload.length) * 100);
		dlog("sectionDownloadDidFinish " + sectionIndex);
		var data = {issue : issue, progress: progress, section : section, sectionIndex: sectionIndex};
		this.fireEvent("sectionDownload", "sectionDownloadDidFinish", data);
	},
	
	sectionDownloadDidFinishWithError : function(issue, section, sectionIndex, error)
	{
		var sectionCount = issue.sections.length;
		var progress = Math.floor(((sectionIndex + 1) / issue._sectionsToDownload.length) * 100);
		dlog("sectionDownloadDidFinishWithError " + sectionIndex);
		var data = {issue : issue, progress: progress, section : section, sectionIndex: sectionIndex, error: error};
		this.fireEvent("sectionDownload", "sectionDownloadDidFinishWithError", data);
	},
	
	itemDownloadDidStart : function(issue, sectionIndex, itemIndex, section)
	{
		var data = {issue : issue, section : section, sectionIndex: sectionIndex, itemIndex: itemIndex};
		this.fireEvent("itemDownload", "itemDownloadDidStart", data);
	},
	
	itemDownloadDidFinish : function(issue, sectionIndex, itemIndex, section)
	{
		var item = section.articles[itemIndex];
		 
		var sectionCount = issue.sections.length;
		var sectionProgressStep = 1 / issue._sectionsToDownload.length;
		var sectionProgress = sectionIndex * sectionProgressStep;
		
		var sectionItemCount = section.itemCount;
		var itemProgressStep = 1 / sectionItemCount;
		var itemProgress = (itemIndex + 1) * (itemProgressStep * sectionProgressStep);
		var progress = Math.round((sectionProgress + itemProgress) * 100);
		
		dlog("sectionDownloadDidFinish " + progress + " " + sectionIndex);
		var data = {issue : issue, progress: progress, section : section, sectionIndex: sectionIndex, itemIndex: itemIndex};
		this.fireEvent("itemDownload", "itemDownloadDidFinish", data);
	},
	
	itemGalleryImageDownloadDidStart : function(issue, galleryImageIndex, section, sectionIndex, itemIndex)
	{
		var item = section.articles[itemIndex];
		var mediaCount = section.articles[itemIndex].media.length;
		
		dlog("itemGalleryImageDownloadDidStart " + galleryImageIndex);
		var data = {issue : issue, galleryImageIndex: galleryImageIndex, section : section, sectionIndex: sectionIndex, itemIndex: itemIndex};
		this.fireEvent("itemGalleryImageDownload", "itemGalleryImageDownloadDidStart", data);
	},
	
	itemGalleryImageDownloadDidFinish : function(issue, galleryImageIndex, section, sectionIndex, itemIndex)
	{
		var item = section.articles[itemIndex];
		 
		var sectionCount = issue.sections.length;
		var sectionProgressStep = 1 / issue._sectionsToDownload.length;
		var sectionProgress = sectionIndex * sectionProgressStep;
		
		var sectionItemCount = section.itemCount;
		var itemProgressStep = 1 / sectionItemCount;
		var itemProgress = itemIndex * (sectionProgressStep * itemProgressStep) ;
		
		var mediaCount = section.articles[itemIndex].media.length;
		var mediaProgressStep = 1 / mediaCount;
		var mediaProgress = (galleryImageIndex + 1) * (sectionProgressStep * mediaProgressStep * itemProgressStep);
		var progress = Math.round((sectionProgress + itemProgress + mediaProgress) * 100);
		
		dlog("downloadItemGalleryImageDidFinish " + galleryImageIndex);
		var data = {issue : issue, progress: progress, galleryImageIndex: galleryImageIndex, section : section, sectionIndex: sectionIndex, itemIndex: itemIndex};
		this.fireEvent("itemGalleryImageDownload", "itemGalleryImageDownloadDidFinish", data);
	},
	
	itemGalleryImageDownloadDidFinishWithError : function(issue, galleryImageIndex, section, sectionIndex, itemIndex, error)
	{
	  var item = section.articles[itemIndex];
		 
		var sectionCount = issue.sections.length;
		var sectionProgressStep = 1 / issue._sectionsToDownload.length;
		var sectionProgress = sectionIndex * sectionProgressStep;
		
		var sectionItemCount = section.itemCount;
		var itemProgressStep = 1 / sectionItemCount;
		var itemProgress = itemIndex * (sectionProgressStep * itemProgressStep) ;
		
		var mediaCount = section.articles[itemIndex].media.length;
		var mediaProgressStep = 1 / mediaCount;
		var mediaProgress = (galleryImageIndex + 1) * (sectionProgressStep * mediaProgressStep * itemProgressStep);
		var progress = Math.round((sectionProgress + itemProgress + mediaProgress) * 100);
		
		dlog("downloadItemGalleryImageDidFinish " + galleryImageIndex);
		var data =
		{
		  issue : issue,
		  progress: progress,
		  galleryImageIndex: galleryImageIndex,
		  section : section,
		  sectionIndex: sectionIndex,
		  itemIndex: itemIndex,
		  error: error
		 };
		this.fireEvent("itemGalleryImageDownload", "itemGalleryImageDownloadDidFinish", data);
	},
	
	magazineDeleteDidStart : function(issue)
	{
		var data = {issue : issue};
		this.fireEvent("magazineDelete", "magazineDeleteDidStart", data);
	},
	
	magazineDeleteDidFinish : function(issue)
	{
		var data = {issue : issue};
		this.fireEvent("magazineDelete", "magazineDeleteDidFinish", data);
	},
	
	deleteDidFinishWithError : function(issue, error)
	{
		var data = {issue : issue, error: error};
		this.fireEvent("magazineDelete", "deleteDidFinishWithError", data);
	}
};

var Purchase = function(productId, date, receipt)
{
  this._productId = productId;
  this._date = date;
  this._receipt = receipt;
};

var DownloadRecord= function(magazineId, date)
{
  this._magazineId = magazineId;
  this._date = date;
};

var User = function(userDataSting)
{
  if (isset(userDataSting) === false)
  {
    this._id = null;
    this._login = "anonymous@netdevices.fr";
    this._password = "anonymous";
    this._consumerType = null;
    
    this._isAnonymous = true;
    
    this._purchases = {};
    this._downloadRecords = {};
  }
  else
  {
    var userData = JSON.parse(userDataSting);
    if (isset(userData))
    {
      this._id = userData._id;
      this._login = userData._login;
      this._password = userData._password;
      this._consumerType = userData._consumerType;
      
      if (this._login == "anonymous@netdevices.fr" && this._password == "anonymous")
      	this._isAnonymous = true;
      
      this._purchases = userData._purchases;
      this._downloadRecords = userData._downloadRecords;
    }
  }
  this._facebookSessionIsOpen = false; 
  this._anonymous = false;
  
  /* getter - setter */
  Object.defineProperty( this, "login", {
    get: function(){ return (this._login); },
    set: function(value){ this._login = value; }
  });
  
  Object.defineProperty( this, "password", {
    get: function(){ return (this._password); },
    set: function(value){ this._password = value; }
  });
  
  Object.defineProperty( this, "isLoggedIn", {
    get: function(){ return (isset(this._login) === true && isset(this._password) === true); }
  });
  
  Object.defineProperty( this, "purchases", {
    get: function(){ return (this._purchases); },
    set: function(value){ this._purchases = value; }
  });

  Object.defineProperty( this, "anonymous", {
    get: function(){ return (this._anonymous); },
    set: function(value){ this._anonymous = value; }
  });
  
  Object.defineProperty( this, "facebookSessionIsOpen", {
    get: function(){ return (this._facebookSessionIsOpen); },
    set: function(value){ this._facebookSessionIsOpen = value; }
  });
  
  Object.defineProperty( this, "consumerType", {
    get: function(){ return (this._consumerType); },
    set: function(value){ this._consumerType = value; }
  });
};


/* load user from preference if exists, or create a new one */

User.loadUser = function()
{
	var userString = LocalStorage.getItem("user");
    if (userString !== null)
      user = new User(userString);
    else
      user = new User();
};

User.prototype.logIn = function(login, password, callback)
{
  var user = this;
  
  if ((isset(login) === false && isset(password) === false) || 
      login == "anonymous@netdevices.fr")
  {
    if (isset(user._login) === false && isset(user._password) === false)
    {
      login = "anonymous@netdevices.fr";
      password = "anonymous";
      this._anonymous = true;
    }
    else
    {
      login = user._login;
      password = user._password;
      this._anonymous = false;
    }
  }
  else
  {
      this._anonymous = false;
  }
  
  NDAPI.connect(  login, 
                  password,
                  function(response)
                  {
                    // request success
                    if (response.success === true)
                    {                      
                      // store id
                      if (user.anonymous === false)
                      {
                      	user._id = response.message.id;
                        user._login = login;
                        user._password = password;
                        if (user._login == "anonymous@netdevices.fr" && user._password == "anonymous")
      						user._isAnonymous = true;
      					else
	                        user._isAnonymous = false;
                        if (isset(response.message) && isset(response.message.consumerType))
                          user._consumerType = response.message.consumerType;
                        user.save();
                      }
                    }
                    // request failure
                    else
                    {
                      dlog(response.message); 
                    }
                    if (callback)
                    	callback(response);
                  });
};

User.prototype.logOut = function(callback)
{
  var user = this;
  NDAPI.disconnect( function(success)
                    {
                      if (success === true)
                      {
                        user.delete();
                      }
                      if (callback)
                        callback(success);
                    });
};
  
User.prototype.addPurchase = function(productId, date, receipt)
{
  if (isset(this._purchases[productId] ))
    return;
  var purchase = new Purchase(productId, date, receipt);
  this._purchases[productId] = purchase;
};
  
User.prototype.hasPurchasedProductWithProductId = function(productId)
{
  return (isset(this._purchases[productId]));
};
  
User.prototype.addDownloadRecord = function(magazine, date)
{
var key = MD5(magazine.title);
  var downloadRecord = new DownloadRecord(key, date);
  this._downloadRecords[key] = downloadRecord;
  this.save();
};
  
User.prototype.removeDownloadRecord = function(magazine)
{
var key = MD5(magazine.title);
  if (isset(this._downloadRecords[key]))
  {
    delete(this._downloadRecords[key]);
    this.save();
  }
};
  
User.prototype.hasDownloadedMagazine = function(magazine)
{
var key = MD5(magazine.title);
  return (isset(this._downloadRecords[key]));
};
  
User.prototype.save = function()
{
  var userString = JSON.stringify(this);
  //window.plugins.preferences.write("user", userString);
  localStorage.setItem("user", userString);
};

User.prototype.delete = function()
{
	this._id = null;
    this._login = "anonymous@netdevices.fr";
    this._password = "anonymous";
    this._consumerType = null;
    
    this._isAnonymous = true;
    
    this.purchases = {};
    this.downloadRecords = {};
	localStorage.removeItem("user");
}


var Section = function()
{ 
  this._downloadState = null,
  this.articles = null,

  this.init = function ()
  {
    this.id = null;
    this.magazine = null;
    this.title = "";
    this.currentArticleIndex = 0;
    this.itemCount = 0;
    
    this._downloadState = 
    {
      downloading:        false,
      downloaded:         false,
      downloadProgress:   0,
      markedForDownload:  false,
      currentItemIndex:   0,
      currentImageIndex:  0
    };
    
    this._downloadState.downloading = false;
    this._downloadState.downloaded = false;
    this._downloadState.downloadProgress = 0;
    
    this.loading = false;
    this.loaded = false;
    
    this.imageDownloadProgress = 0;
    this.galeryCount = 0;
    this.galeryImageCount = 0;
    this.downloadGalery = false;
    
    this.sectionTemplate = false;
    this.articles = [];
  } 
};

Section.prototype.initWithData = function(sectionData)
{
  this.init();
  this.id = sectionData.id;
  this.itemCount = sectionData.itemCount;
  this.type = sectionData.type;
  this.title = sectionData.title;
  this.sectionTemplate = sectionData.sectionTemplate;
  if (this.title.toLowerCase() == "news" &&
			this.sectionTemplate == false)
		this.sectionTemplate = true;
  	
  this.articles = sectionData.articles;
  this._downloadState = sectionData.downloadState;
  // section initial state cannot be downloading
  this._downloadState.downloading = false;
};

Section.prototype.addArticleAtIndex = function(article, index)
{
  this.articles[index] = article;
};

/** first article **/

Section.prototype.getFirstArticle = function()
{
  return (this.articles[0]);
};

Section.prototype.setFirstArticle = function()
{
  this.currentArticleIndex = 0;
};

/** article at index **/

Section.prototype.setArticleAtIndex = function(index)
{
  this.currentArticleIndex = index;
};

/** last article **/

Section.prototype.getLastArticle = function()
{
  return (this.articles[this.articles.length - 1]);
};

Section.prototype.setLastArticle = function()
{
  this.currentArticleIndex = this.articles.length - 1;
};

/** current article **/

Section.prototype.getCurrentArticle = function()
{
  return this.articles[this.currentArticleIndex];
};

Section.prototype.getTemplateCurrentArticle = function()
{
  return this.articles[this.currentArticleIndex].template;
};

/** next article **/

Section.prototype.setNextArticle = function()
{
  if (this.currentArticleIndex < this.articles.length-1)  // is there article after
  {
    ++this.currentArticleIndex;                           // yes so select next article
    return (true);
  }
  return (false);                                         // no, don't change current article
};

Section.prototype.getNextArticle = function()
{
  if (this.currentArticle < this.articles.length-1)  // is there article after
  {
    return (this.articles[this.currentArticleIndex+1]);
  }
  return (null);
};

/** previous article **/

Section.prototype.setPreviousArticle = function()
{
  if (this.currentArticleIndex > 0)   // is there article before
  {
    --this.currentArticleIndex;         // yes so select previous article
    return (true);
  }
  return (false);                     // no, don't change current article
};

Section.prototype.getPreviousArticle = function()
{
  if (this.currentArticle > 0)  // is there article before
  {
    return (this.articles[this.currentArticleIndex - 1]);
  }
  return (null);
};

/************************/

Section.prototype.stopDownload = function(callback)
{
  //dlog("Section stopDownload");
  this._stopDownload = true;
};

/**
 * sectionLoadDidFinish
 * sectionLoadDidStop
 * sectionLoadDidFinishWithError
 * 
 **/

Section.prototype.load = function(delegate)
{
  this._delegate = delegate;
  
  if (this.loaded)
  {
    this.downloadDidFinish();
    return;
  }

  this.loadFromLocalStorage();
};

Section.prototype.loadFromLocalStorage = function()
{
  var section = this;
  FileManager.readMagazineSectionFile(this, 
    function()
    {
      if (section.articles.length == section.itemCount)
        section.downloadDidFinish();
      else
        section.loadFromNetwork();
    },
    function()
    {
      section.loadFromNetwork();
    });
};

Section.prototype.loadFromNetwork = function()
{
  this.download(this._delegate);
};

Section.prototype.markForDownload = function()
{
  this._downloadState.markedForDownload = true;
};

Section.prototype.unmarkForDownload = function()
{
  this._downloadState.markedForDownload = false;
};

/**
 * sectionDownloadDidStart
 * sectionLoadDidFinish
 * sectionLoadDidStop
 * sectionLoadDidFinishWithError
 * 
 **/
Section.prototype.download = function(delegate)
{
  this._delegate = delegate;
  
  if (this._downloadState.downloaded)
  {
    this.downloadDidFinish();
    return;
  }
  
  this._downloadState.downloadProgress = 0;
  this.downloadDidStart();
  
  if (this.loaded)
  {
      this.processSectionItems(this.articles, 0);
    return;
  }

  var currentItemIndex = 0;
  var section = this;
  NDAPI.getPipeline(this.id, 
                    function(pipeline)
                    {
                      section.gotPipeline(pipeline);
                    },
                    function(error)
                    {
                      dlog("downloadSection error");
                      section.downloadDidFinishAtItemIndexWithError(currentItemIndex, error);
                    });
};

Section.prototype.gotPipeline = function(pipeline)
{
  var currentItemIndex = 0;
  //dlog("gotPipeline");
  if (pipeline === null)
  {
    dlog("gotPipeline error : no section");
    this.downloadDidFinishAtItemIndexWithError(currentItemIndex, {/*error*/});
    return;
  }
  
  if (this._stopDownload === true)
  {
    this.downloadDidStop();
    return;
  }
  
  // populate the current section
  var items = pipeline.channel.items;
  
  var section = this;
  this.processSectionItems(items, currentItemIndex);
};


Section.prototype.updateGaleriesImagesCount = function(items, index)
{
  var galeryCount = 0;
  var galeryImageCount = 0;
  for (var i = index; i < items.length; i++)
  {
    var item = items[i];
    if (isset(item.media) && item.media.length > 0)
    {
      ++galeryCount;
      galeryImageCount += item.media.length;
    }
  }
  
  this.galeryCount = galeryCount;
  this.galeryImageCount = galeryImageCount;
};


//Section.prototype.updateProcessProgress = function(items, index)
//{
//  // update progress
//  var step = 100 / this.itemCount;
//  // increment the magazine download progress width the section processing progress
//  this._downloadState.downloadProgress = Math.floor((index) * step);
//};

Section.prototype.processSectionItems = function(items, currentItemIndex)
{
  // stop download requested ?
  if (this._stopDownload === true)
  {
    this.downloadDidStop();
    return;
  }

  //this.updateProcessProgress(items, currentItemIndex);
  this.updateGaleriesImagesCount(items, currentItemIndex);

  //var tmp = items.length > 5 ? 5 : items.length;
  // all items downloaded ?
  if (currentItemIndex >= items.length)
  {
    this.downloadDidFinish();
    return;
  }

  //dlog("process section item at index: " + currentItemIndex);
  // section already loaded ? ie. content and main pictures already downloaded 
  if (this.loaded === true)
  {
    this.downloadGaleryForItemAtIndex(currentItemIndex, items);
    return;
  }

  var item = items[currentItemIndex];

  if (item.customfields.corpuspro_template_id == "template_none")
  {
    dlog("!!!! template = none dans " + this.title + " article : " + item.title + "(" + item.id + ")" );
  }
  item.template = tabTemplates[item.customfields.corpuspro_template_id];
  
  // if firs item has a section template, mark the section as a section template section
  if (currentItemIndex == 0 && item.template.sectionTemplate)
    this.sectionTemplate = true;
  
  this.addArticleAtIndex(item, currentItemIndex);
  this.downloadItemDidStart(currentItemIndex);

  var section = this;
  NDAPI.getChildren(item.id, 
                    function(response)
                    {
                      if (response)
                      {
                        var children = response.channel.items;
                        section.addChildrenToItemAtIndex(children, currentItemIndex, items);
                      }
                      else // there is no children
                      {
                        section.downloadTemplateMediaForItemAtIndex(currentItemIndex, items);
                      }
                    },
                    function(error) // children resquest failed
                    {
                      dlog("processSectionItems getChildren error");
                      
                      // test : do not stop the download, if we cant delete the children, remove it from the article instead
                      //section.downloadDidFinishWithError(error);
                      item.children = [];
                      section.downloadTemplateMediaForItemAtIndex(currentItemIndex, items);
                    });
  return;
};

Section.prototype.addChildrenToItemAtIndex = function(children, currentItemIndex, items)
{
  if (this._stopDownload === true)
  {
    this.downloadDidStop();
    return;
  }
  
  //dlog("add children to item at index : " + currentItemIndex);
  var item = items[currentItemIndex];
  for (var i = 0; i < children.length; i++)
  {
    var child = children[i];
    var div = document.createElement("div");
    div.innerHTML = htmlDecode(child.content);
    child.content = div.innerHTML;
  }
  item.children = children;
  this.downloadTemplateMediaForItemAtIndex(currentItemIndex, items);
};

Section.prototype.downloadTemplateMediaForItemAtIndex = function(currentItemIndex, items)
{
  if (this._stopDownload === true)
  {
    this.downloadDidStop();
    return;
  }
  
  //dlog("prepare template image to download for item at index : " + currentItemIndex);
  var item = items[currentItemIndex];
  var imageArray = [];
  
  if (item.customfields)
  {
    var url = item.customfields.corpuspro_image_url_1;
    if (url && 
        url.length > 0 &&
        url.indexOf(".mov") < 0 && 
        url.indexOf(".mp4") < 0)
    {
      imageArray.push({url : url, object:item.customfields, property:"corpuspro_image_url_1", thumbnail: true});
    }
    
    url = item.customfields.corpuspro_image_url_2;
    if (url && 
        url.length > 0 &&
        url.indexOf(".mov") < 0 && 
        url.indexOf(".mp4") < 0)
    {
      imageArray.push({url : url, object:item.customfields, property:"corpuspro_image_url_2"});
    }
  }
  
  var div = document.createElement("div");
  div.innerHTML = htmlDecode(item.content);
  // keep the div to serialize the img source modification
  this._divContent = div;
  var imgTags = div.getElementsByTagName("img");
  for (var i = 0; i < imgTags.length; i++)
  {
    var img = imgTags[i];
    imageArray.push({url : img.src, object:img, property: "src"});
  }

  // TODO : get children galeries
  
  this.downloadTemplateImagesForItemAtIndex(0, imageArray, currentItemIndex, items);
};

Section.prototype.downloadTemplateImagesForItemAtIndex = function(currentImageIndex, imageArray, currentItemIndex, items)
{
  if (this._stopDownload === true)
  {
    this.downloadDidStop();
    return;
  }
  
  var item = items[currentItemIndex];
  
  if (currentImageIndex >= imageArray.length)
  {
    // replace the content with the modified div html content
    item.content = this._divContent.innerHTML;
    // reset the variable
    delete(this._divContent);
    this._divContent = null;
        
    if (isset(item.media) && 
        item.media.length > 0 && 
        this.downloadGalery === true)
      this.downloadGaleryForItemAtIndex(currentItemIndex, items);
    else
    {
      this.downloadItemDidFinish(currentItemIndex);
      this.processSectionItems(items, currentItemIndex + 1);
    }
    return;
  }
  
  var image = imageArray[currentImageIndex];
  var section = this;
  
  var downloadImageDidSucceed = function(filePath)
  {
    image.object[image.property] = filePath;
    
    if (isset(device.cordova) && isset(image.thumbnail) && image.thumbnail=== true)
    {
      window.plugins.cropImagePlugin.cropImage(filePath, 110, 144,
        function(croppedImagePath)
        {
          if (isset(croppedImagePath))
          {
            if (!item.thumbnailURL)
              item.thumbnailURL = {};
            item.thumbnailURL[image.property] = croppedImagePath;
          }
          section.downloadTemplateImagesForItemAtIndex(currentImageIndex + 1, imageArray, currentItemIndex, items);
        });
    }
    else
    {
      var url = item.customfields[image.property];
      if (!item.thumbnailURL)
              item.thumbnailURL = {};
      item.thumbnailURL[image.property] = Utils.getResizedImageUrl(110, 144, url);
      section.downloadTemplateImagesForItemAtIndex(currentImageIndex + 1, imageArray, currentItemIndex, items);
    }
  };
  
  this.downloadImageAtIndex(
    image.url, 
    downloadImageDidSucceed,
    function(error)
    {
      dlog("download image failed");
      
      // test : stop the download when template image download fail
      //section.downloadTemplateImagesForItemAtIndex(currentImageIndex + 1, imageArray, currentItemIndex, items);
      section.downloadDidFinishAtItemIndexWithError(currentItemIndex, error);
    },
    null);
};

Section.prototype.downloadGaleryForItemAtIndex = function(currentItemIndex, items)
{ 
  if (this._stopDownload === true)
  {
    this.downloadDidStop();
    return;
  }

  //dlog("prepare template image to download for item at index : " + currentItemIndex);
  var item = items[currentItemIndex];
  var imageArray = [];
  
  for (var j = 0; j < item.media.length; j++)
  {
    var media = item.media[j];
    var mediaUrl = media.url;
    if (mediaUrl && 
        mediaUrl.length > 0 &&
        mediaUrl.indexOf(".mov") < 0 && 
        mediaUrl.indexOf(".mp4") < 0)
    {
      imageArray.push({url : mediaUrl, object: media, property:"url", thumbnail: true});
    }
  }
  
  //dlog("download gallery " + item.title + " : " + imageArray.length);
  this.downloadGaleryImageForItemAtIndex(0, imageArray, currentItemIndex, items);
};

Section.prototype.downloadGaleryImageForItemAtIndex = function(currentImageIndex, imageArray, currentItemIndex, items)
{
  if (this._stopDownload === true)
  {
    this.downloadDidStop();
    return;
  }
  
  if (currentImageIndex >= imageArray.length)
  {
    this.galeryCount -= 1;
    this.downloadItemDidFinish(currentItemIndex);
    this.processSectionItems(items, currentItemIndex + 1);
    return;
  }
  
  var section = this;
  var image = imageArray[currentImageIndex];

  var downloadImageDidSucceed = function(filePath)
  {
    section.galeryImageCount -= 1;
    
    section.imageDownloadProgress = 0;
    
    if (isset(device.cordova) && isset(image.thumbnail) && image.thumbnail=== true)
    {
      image.object[image.property] = filePath;
      window.plugins.cropImagePlugin.cropImage(filePath, 200, 154,
        function(croppedImagePath)
        {
          if (isset(croppedImagePath))
          {
            var item = items[currentItemIndex];
            var media = item.media[currentImageIndex];
            media.thumbnailURL = croppedImagePath;
          }
          section.itemGalleryImageDownloadDidFinish(currentImageIndex, currentItemIndex)
          section.downloadGaleryImageForItemAtIndex(currentImageIndex + 1, imageArray, currentItemIndex, items);
        });
    }
    else
    {
      var item = items[currentItemIndex];
      var url = item.media[currentImageIndex].url;
      item.media[currentImageIndex].thumbnailURL = Utils.getResizedImageUrl(200, 154, url);
      section.itemGalleryImageDownloadDidFinish(currentImageIndex, currentItemIndex)
      section.downloadGaleryImageForItemAtIndex(currentImageIndex + 1, imageArray, currentItemIndex, items);
    }
  };
  
  var image = imageArray[currentImageIndex];
  this.itemGalleryImageDownloadDidStart(currentImageIndex, currentItemIndex)
  this.downloadImageAtIndex(image.url, 
                            downloadImageDidSucceed,
                            function(error)
                            {
                              dlog("download image failed");
                              section.itemGalleryImageDownloadDidFinishWithError(currentImageIndex, currentItemIndex, error)
                              section.downloadGaleryImageForItemAtIndex(currentImageIndex + 1, imageArray, currentItemIndex, items);
                            },
                            function(progressValue)
                            {
                              section.imageDownloadProgress = progressValue;
                            },
                            currentImageIndex,
                            currentItemIndex);
};

Section.prototype.downloadImageAtIndex = function(url, success, failure, progress)
{
  if (this._stopDownload === true)
  {
    this.downloadDidStop();
    return;
  }
  
  if (device.cordova)
  {
    FileManager.downloadImage(url, this.magazine, this, success, failure, progress);
  }
  // pour le debugging
  else
  {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
      if (xhr.readyState == 4)
      {
        if (xhr.status == 200)
        {
          if (isset(progress))
          {
            var progressValue = 100;
            progress(progressValue);
          }
          success(url);
        }
        else
        {
            failure(/*error*/);
        }
      }
    }
    xhr.open("GET", base_url + encodeURI(url));
    xhr.send();
  }
};

Section.prototype.save = function(success, failure)
{
  FileManager.saveMagazineSection(this, success, failure);
};

Section.prototype.remove = function(success, failure)
{
  var section = this;
  FileManager.removeMagazineSection(this, 
                                    function()
                                    {
                                      section._downloadState.downloaded = false;
                                      success();
                                    },
                                    failure);
};

/******************************************************************************/

Section.prototype.downloadDidStart = function()
{
  if (this.downloadGalery === true)
  {
    this.unmarkForDownload();
    this._downloadState.downloading = true;
    this._delegate.sectionDownloadDidStart(this);
  }
  else
  {
    this.loading = true;
    this._delegate.sectionLoadDidStart(this);
  }
};

Section.prototype.downloadDidStop = function()
{
  this._stopDownload = false;
  this.galeryImageCount = 0;
  
  this.save(
    function()
    {
  
    },
    function()
    {
    
    });
    
  if (this.downloadGalery === true)
  {
    this._downloadState.downloading = false;
    this._delegate.sectionDownloadDidStop(this);
  }
  else
  {
    this.loading = false;
    this._delegate.sectionLoadDidStop(this);
  }
};

Section.prototype.downloadDidFinishAtItemIndexWithError = function(itemIndex, error)
{
  if (this.downloadGalery === true)
  {
    this._downloadState.downloading = false;
    this._delegate.sectionDownloadDidFinishAtItemIndexWithError(this, itemIndex, error);
  }
  else
  {
    this.loading = false;
    this._delegate.sectionLoadDidFinishAtItemIndexWithError(this, itemIndex, error);
  }
};

Section.prototype.downloadDidFinish = function()
{
    // download finished
    if (this.downloadGalery === true)
    {
      this._downloadState.downloading = false;
      
      this._downloadState.downloaded = true;
    }
    else
    {
      this.loading = false;
      
      this.loaded = true;
    }
    
    var section = this;
    this.save(
      function()
      {
        if (section.downloadGalery === true)
        {
          section._downloadState.downloaded = true;
          section._delegate.sectionDownloadDidFinish(section);
        }
        else
        {
          section.loaded = true;
          section._delegate.sectionLoadDidFinish(section);
        }
      }, 
      function(error)
      {
        if (section.downloadGalery === true)
          section._delegate.sectionDownloadDidFinishWithError(section, error);
        else
          section._delegate.sectionLoadDidFinishWithError(section, error);
      });  
    return;
};

Section.prototype.downloadItemDidStart = function(currentItemIndex)
{
  if (!this._delegate)
  {
    return;
  }
  if (this.downloadGalery === true)
  {
    if (typeof this._delegate.itemDownloadDidStart == "function")
    {
       this._delegate.itemDownloadDidStart(this, currentItemIndex);
    }
  }
  else
  {
    if (typeof this._delegate.itemLoadDidStart == "function")
    {
      this._delegate.itemLoadDidStart(this, currentItemIndex);
    }
  }
};

Section.prototype.downloadItemDidFinish = function(currentItemIndex)
{
  if (!this._delegate)
  {
    return;
  }
  if (this.downloadGalery === true)
  {
    if (typeof this._delegate.itemDownloadDidFinish == "function")
    {
    this._delegate.itemDownloadDidFinish(this, currentItemIndex);
    }
  }
  else
  {
    if (typeof this._delegate.itemLoadDidFinish == "function")
    {
    this._delegate.itemLoadDidFinish(this, currentItemIndex);
    }
  }
};

Section.prototype.itemGalleryImageDownloadDidStart = function(currentGalleryImageIndex, currentItemIndex)
{
  if (!this._delegate)
  {
    return;
  }
  this._delegate.itemGalleryImageDownloadDidStart(this, currentGalleryImageIndex, currentItemIndex);
};

Section.prototype.itemGalleryImageDownloadDidFinish = function(currentGalleryImageIndex, currentItemIndex)
{
  if (!this._delegate)
  {
    return;
  }
  this._delegate.itemGalleryImageDownloadDidFinish(this, currentGalleryImageIndex, currentItemIndex);
};

Section.prototype.itemGalleryImageDownloadDidFinishWithError = function(currentGalleryImageIndex, currentItemIndex, error)
{
  if (!this._delegate)
  {
    return;
  }
  this._delegate.itemGalleryImageDownloadDidFinishWithError(this, currentGalleryImageIndex, currentItemIndex, error);
};


/**********************/

Section.prototype.unload = function()
{
  this.loaded = false;
  delete(this.articles);
  this.articles = [];
};

/*
 *
 *
 */

/*
 *  Download Queue Protocole
 *
 * magazineDownloadDidSucceed
 * magazineDownloadDidFail
 * magazineDownloadsDidFinish
 *
 */

/*******************************************************************************
 *
 *                              Magazines
 *
 ******************************************************************************/

/*
 * Magazines Protocole
 *
 * magazineLoadingDidFinish
 * magazinesLoadingDidFinish
 * magazinesLoadingDidFinishWithError
 */

/**
 * Manage the magazine list
 *
 */
var Magazines = function(delegate)
{
    /**
     * magazine list
     * type : Array
     */
    this.magazineArray = [];
    
    /**
     * magazine list delegate
     * type : Object
     */
    this._delegate = delegate;
    
    /**
     * magazine list image thumbnail size
     * type : Object
     * details : {width: Number, height: Number}
     */
    this.thumbnailSizes = null;
    
    this.isLoadingIssues = false;
};

/*
 * CONSTANT
 */

/**
 * magazine granted access constant
 */
Magazines.ACCESS_GRANTED = 1;


/*
 Magazines.prototype.downloadMagazineForReading = function(magazine, downloadSucceeded, downloadFailed)
 {
 this.magazineDownloadQueue.downloadMagazineForReading(magazine, downloadSucceeded, downloadFailed);
 };
 
 Magazines.prototype.downloadMagazine = function(magazine)
 {
 magazine.setThumbnailSizes(this.thumbnailSizes);
 this.magazineDownloadQueue.queueMagazineForDownload(magazine);
 };
 */


/**
 * return how many magazine the list contains
 * return : Number
 */
Magazines.prototype.count = function()
{
    return (this.magazineArray.length);
};

/**
 * return the magazine for the given index or null if index is out of range
 * return : Magazine
 */
Magazines.prototype.getMagazineAtIndex = function(index)
{
    if (index >= 0 && index < this.magazineArray.length)
		return (this.magazineArray[index]);
    return (null);
};

/**
 * return the index of the magazine which have the given id
 * return : Numerber
 */
Magazines.prototype.getMagazineIndex = function(magazineId)
{
    for (var i = 0; i < this.magazineArray.length; i++)
    {
		if (magazineId == this.magazineArray[i].id)
		{
            return (i);
		}
    }
    return (-1);
};

/**
 * return the magazine which have the given id or null if the id doen't match any magazine
 * return : Magazine
 */
Magazines.prototype.getMagazineById = function(magazineId)
{
    //dlog("Magazines getMagazineById: " + magazineId);
    for (var i = 0; i < this.magazineArray.length; i++)
    {
        if (this.magazineArray[i].id == magazineId)
			return (this.magazineArray[i]);
    }
    return (null);
};

/**
 * return the magazine which have the given app store product id or null if the id doen't match any magazine
 * return : Magazine
 */
Magazines.prototype.getMagazineByAppStoreProductId = function(appStoreProductId)
{
    for (var i = 0; i < this.magazineArray.length; i++)
    {
		//dlog("Magazines getMagazineByAppStoreProductId magazine id: " + this.magazineArray[i].appStoreProductId);
		if (this.magazineArray[i].appStoreProductId == appStoreProductId)
            return (this.magazineArray[i]);
    }
    return (null);
};

/**
 * add a magazine to the magzine list
 * parameter :
 *  magazine : Magazine, the magazine to add
 * return : void
 */
Magazines.prototype.addMagazine = function(magazine)
{
    this.magazineArray.push(magazine);
    magazine.magazines = this;
};

/**
 * remove a magazine to the magzine list
 * return true if success
 * parameter :
 *  magazine : Magazine, the magazine to remove
 * return : Boolean
 */
Magazines.prototype.removeMagazine = function(magazine)
{
    for (var i = 0; i < this.magazineArray.length; i++)
    {
		if (magazine.id == this.magazineArray[i].id)
		{
            this.magazineArray.splice(i,1);
            return (true);
		}
    }
    return (false);
};

/**
 * try to load magazine frome local file system and network
 * local file system magazines are loaded first and updated if network is up
 *
 * the magazineLoadingDidFinish delegate method is call for each magazine succefully loaded
 * the magazinesLoadingDidFinishdelegate method is call when all magazines are succefully loaded
 * the magazinesLoadingDidFinishWithError method is call when an error occured and stopped the loading of the magazines
 *
 * return : void
 */
Magazines.prototype.loadMagazines = function(delegate)
{
    // already loading issues
    if (this.isLoadingIssues)
    {
        return;
    }
    
		this.magazineArray = [];
    this.isLoadingIssues = true;
    dlog("loadMagazines");
    this._delegate = delegate;
    
    // load magazines from local storage first
    this.loadMagazinesFromLocalStorage();
};


/**
 * read magazine files from local storage and add them to the magazine list
 * return : void
 */
Magazines.prototype.loadMagazinesFromLocalStorage = function()
{
    dlog("loadMagazinesFromLocalStorage");
    magazines = this;
	
    var delegate =
    {
		magazineLoadingDidFinish : function(magazine)
		{
            dlog("local magazine loaded finish " + magazine._downloadState.downloaded);
            var index = magazines.getMagazineIndex(magazine.id);
            if (index != -1)
            {
                magazines.magazineArray[index] = magazine;
            }
            else
                magazines.addMagazine(magazine);
		},
		magazinesLoadingDidFinish : function()
		{
            dlog("local magazines loaded finish");
            magazines.loadMagazinesFromNetwork();
		},
		magazinesLoadingDidFinishWithError : function()
		{
            //dlog("local magazines loaded with error");
		}
    };
    
    FileManager.loadMagazines(delegate);
};

/**
 * request magazines from the server, add them to the magazine list.
 * return : void
 */
Magazines.prototype.loadMagazinesFromNetwork = function()
{
    NDAPI.getptree(this.loadMagazinesFromNetworkCallback, this);
};

/**
 * build the magazine list from the pipeline tree received from the server
 * return : void
 */
Magazines.prototype.loadMagazinesFromNetworkCallback = function(ptree)
{
    var sortIssueFunction = function(issueA, issueB)
    {
        var dateA = new Date(issueA.date);
        var dateB = new Date(issueB.date);
        if (dateA > dateB)
        {
			return (-1);
        }
        else if (dateA == dateB)
        {
			return (0);
        }
        else
			return (1);
    };
    
    // no data returned
    if (ptree === null)
    {
        this.magazineArray = this.magazineArray.sort(sortIssueFunction);
        this.isLoadingIssues = false;
        this._delegate.magazinesLoadDidFinish();
        return;
    }
    
    for (var i = 0; i < ptree.length; i++)
    {
        var pipeline = ptree[i];
        
        // pipeline wiht no children or issue are not process
        if (pipeline.children === null || "object" !== typeof pipeline.numero)
            continue;
        
        // does the magazine already exists?
				var downloaded = this.getMagazineIndex(pipeline.numero.id) != -1;
        var magazine = this.getMagazineById(pipeline.numero.id);
        // if not
        if (magazine === null)
        {
            // create a new one
            magazine = new Magazine();
            magazine.init();
            magazine.id = pipeline.numero.id;
            magazine.title = pipeline.numero.title;
            magazine.cover = pipeline.numero.cover;
            magazine.itemCount = pipeline.itemCount;
            magazine.date = pipeline.numero.date;
            magazine.pipeline = pipeline;
            magazine.appStoreProductId = pipeline.numero.appstoreproductid;
            magazine.initSections();
            this.addMagazine(magazine);
        }
        
        // for all magazines (localy or remotely loaded)
        // if there is no app store product id defined, so set the magazine "free"
				// or the magazine has been download already
        var appStoreProductId = pipeline.numero.appstoreproductid;
        if (isset(appStoreProductId) === false ||
            appStoreProductId.length == 0 ||
						downloaded )
        {
            magazine.purchased = true;
        }
        else if (pipeline.accessright == Magazines.ACCESS_GRANTED || user.purchases[magazine.appStoreProductId])
        {
            // magazine has already been purchased
            magazine.purchased = true;
        }
        else
            magazine.purchased = false
    }
    
    this.magazineArray = this.magazineArray.sort(sortIssueFunction);
    
    // On iOS price has to be fetch from Apple app store
    this.requestMagazineAppStoreProductsData();
};

/**
 * request app store product datas for each magazine witch is not free or downloaded
 *  return : void
 */
Magazines.prototype.requestMagazineAppStoreProductsData = function()
{
    // prepare the list of magazine witch are not free or downloaded
    var productIds = [];
    for (var i = 0; i < this.magazineArray.length; i++)
    {
        var magazine = this.magazineArray[i];
        if (isset(magazine.appStoreProductId) &&
            magazine.purchased !== true)
			productIds.push(magazine.appStoreProductId);
    }
    
    // if the list is not empty, send the request
    magazines = this;
    if (productIds.length > 0)
    {
        var inAppPlugin = window.plugins.inAppPlugin;
        inAppPlugin.requestProductsData(productIds, magazines);
    }
    // else magazines loading is done
    else
    {
        this.isLoadingIssues = false;
        this._delegate.magazinesLoadDidFinish();
    }
};

/**
 * The server did respond to the request, update magazines data
 * return : void
 */
Magazines.prototype.requestProductsDataDidReceiveResponse = function(validProducts, invalidProductIds)
{
    for (var i = 0; i < validProducts.length; i++)
    {
			var validProduct = validProducts[i];
			var magazine = this.getMagazineByAppStoreProductId(validProduct.id);
			if (magazine !== null)
			{
	            magazine.price = validProduct.price;
			}
    }
    
    this.isLoadingIssues = false;
    
    // magazines loading is done
    if (isset(this._delegate))
			this._delegate.magazinesLoadDidFinish();
};

Magazines.prototype.removeMagazineFromList = function(magazine)
{
    var index = this.getMagazineIndex(magazine.id);
    this.magazineArray.splice(index, 1);
};

Magazines.prototype.removeMagazineAtIndex = function(index, success, failure)
{
    var magazine = this.magazineArray[index];
    var magazines = this;
    if (device.cordova)
		magazine.remove(function()
						{
                        dlog("magazine removed succefully");
                        var removedMagazineArray = magazines.magazineArray.splice(index, 1);
                        var removedMagazine = removedMagazineArray[0];
                        success(removedMagazine);
						},
						function()
						{
                        dlog("error while removing magzine");
                        failure();
						});
    else
    {
		var removedMagazineArray = magazines.magazineArray.splice(index, 1);
		var removedMagazine = removedMagazineArray[0];
		success(removedMagazine);
    }
};

Magazines.prototype.downloadMagazineSections = function(magazine, sectionsToDownload)
{
    this.downloadQueue.queueMagazineForDownload(magazine, sectionsToDownload);
};


/*******************************************************************************
 * 
 *                              Magazine
 * 
 ******************************************************************************/

 /*
  * Magazine download Protocol
  * 
  * sectionLoadDidFinish
  * sectionLoadDidFinishWithError
  * magazineLoadDidFinish
  *
  * sectionDownloadDidStart
  * sectionDownloadDidFinish
  * sectionDownloadDidFinishWithError
  * sectionsDownloadDidFinish
  */

/**
 * Store a magazine data and state
 */
var Magazine = function()
{
  
  this._sectionsToDownload = null;
  this._currentDownloadingSection = null;
  this._currentIndex = 0;
  
  this._downloadState = null;
  this._stopDownload = false;
  
  // Initialization
  this.init = function ()
  {
	this.id = null;
	this.purchased = false;
	this.cover = "";
	this.title = "";
	this.price = null;
	this.itemCount = 0;
	
	this.currentSectionIndex = 0;
	this.sections = [];
	
	this.pipeline = null;
	this.appStoreProductId = null;
	
	this._downloadState = 
	{
	  downloading:          false,
	  downloaded:           false,
	  downloadProgress:     0,
	  currentSectionIndex:  0,
	  downloadedSections:   []
	};
	
	this._downloadState.downloading = false;
	this._downloadState.downloaded = false;
	this._downloadState.downloadProgress = 0;
	
	this.loading = false;
	this.loaded = false;
	
	this.reading = false;
	
	this.magazines = null;
	
	this._startDownloadDate = null;
	this._endDownloadDate = null;
  };
};

Magazine.TEMPLATE_IMAGE_FOLDER = "template_image";
Magazine.GALERY_IMAGE_FOLDER = "galery_image";
Magazine.CROP_IMAGE_FOLDER = "crop_image";


Magazine.prototype.initWithData = function(magazineData)
{
  this.init();
  this.id = magazineData.id;
  this.purchased = magazineData.purchased;
  this.cover = magazineData.cover;
  this.title = magazineData.title;
  this.date = magazineData.date;
  this.price = magazineData.price;
  this.itemCount = magazineData.itemCount;
  this.appStoreProductId = magazineData.appStoreProductId;
  
  this.pipeline = magazineData.pipeline;
  this.pipeline = magazineData.pipeline;
  if (magazineData.downloadState)
  {
	this._downloadState = magazineData.downloadState;
	// magazine initial state cannot be downloading
	this._downloadState.downloading = false;
  }

  this.initSections();
};

Magazine.prototype.setThumbnailSizes = function(thumbnailSizes)
{
  this._thumbnailSizes = thumbnailSizes;
};

/**
 * create section objects for each pipeline child of the root pipeline
 * and add it to the magazine section list.
 * return false if the magazine pipeline is not set
 * return : Boolean
 */
Magazine.prototype.initSections = function()
{
  if (isset(this.pipeline) === false)
	return (false);
  
  var pipeline = this.pipeline;
  
  for (var j = 0; j < pipeline.children.length; j++)
  {
	var child = pipeline.children[j];
	var section = new Section();
	section.init();
	section.id = child.id;
	section.magazine = this;
	
	var pipelineName = child.name;
	var startIndex = pipelineName.indexOf("-");
	var sectionTitle = "";
	if (startIndex < 0)
	  sectionTitle = trim(pipelineName);
	else
	  sectionTitle = trim(pipelineName.substr(startIndex + 1, pipelineName.length));
	
	section.title = sectionTitle;
  if (section.title.toLowerCase() == "news" &&
			section.sectionTemplate == false)
		section.sectionTemplate = true;
	section.itemCount = child.itemCount;
	
	var downloadedSections = this._downloadState.downloadedSections;
	for(var i = 0; i < downloadedSections.length; i++)
	{
		if (section.id == downloadedSections[i])
		{
			section._downloadState.downloaded = true;
		}
	}
	  
	this.addSection(section);
  }
  
  return (true);
};

Magazine.prototype.addSection = function(section)
{
  this.sections.push(section);
};

/******** download **********/

Magazine.prototype.stopDownload = function()
{
  //dlog("Magazine stopDownload");
  if (this._downloadingSection)
  {
    this._stopDownload = true;
	this._downloadingSection.stopDownload();
  }
};

Magazine.prototype.load = function(loadDelegate)
{
  this._loadDelegate = loadDelegate;
  this.loading = true;
  
  this._loadCurrentIndex = 0;
  
  this.loadSection(this._loadCurrentIndex);
};

Magazine.prototype.loadSection = function(index)
{
  if (this._stopDownload)
  {
    this._stopDownload = false;
    this.magazineLoadDidStop();
    return;
  }
  this._loadCurrentIndex = index;
  if (index >= this.sections.length)
  {
	this.magazineLoadDidFinish();
	return;
  }
  
  var magazine = this;
  var section = this.sections[index];
  section.downloadGalery = false;
  section.load(this);
};

/******* section load delegate *********/

Magazine.prototype.itemLoadDidStart= function(section, itemIndex)
{
    if(isset(this._loadDelegate))
	this._loadDelegate.itemLoadDidStart(itemIndex, this._loadCurrentIndex);
};

Magazine.prototype.itemLoadDidFinish = function(section, itemIndex)
{
    if(isset(this._loadDelegate))
	this._loadDelegate.itemLoadDidFinish(itemIndex, this._loadCurrentIndex);
};

Magazine.prototype.sectionLoadDidStart= function(section)
{
    this._downloadingSection = section;
    if(isset(this._loadDelegate))
      this._loadDelegate.sectionLoadDidStart(section, this._loadCurrentIndex);
};

Magazine.prototype.sectionLoadDidFinish = function(section)
{
    this._downloadingSection = null;
    if(isset(this._loadDelegate))
      this._loadDelegate.sectionLoadDidFinish(section, this._loadCurrentIndex);
    
    this.loadSection(this._loadCurrentIndex + 1);
};

Magazine.prototype.sectionLoadDidStop = function(section)
{
    this._stopDownload = false;
    this._downloadingSection = null;
    if(isset(this._loadDelegate))
      this._loadDelegate.magazineLoadDidStop(this);
};

Magazine.prototype.sectionLoadDidFinishAtItemIndexWithError = function(section, itemIndex, error)
{
    this._downloadingSection = null;
    var currentSectionIndex = this._loadCurrentIndex;

    if(isset(this._loadDelegate))
    {
        this._loadDelegate.sectionLoadDidFinishAtItemIndexWithError(section, currentSectionIndex, itemIndex, error);
    }
    
    // test : stop the load of the issue if a section load fail
    // we will try to resume the download from where the download failed
    //this.loadSection(this._loadCurrentIndex + 1);
    this.magazineLoadDidFinishWithError(section, currentSectionIndex, itemIndex, error);
};

Magazine.prototype.magazineLoadDidFinish = function()
{
    this.loading = false;
    this.loaded = true;
    this._loadDelegate.magazineLoadDidFinish(this);
    this._loadDelegate = null;
};

Magazine.prototype.magazineLoadDidFinishWithError = function(section, error)
{
  this.loading = false;
  this.loaded = false;
  this._loadDelegate.magazineLoadDidFinishWithError(this, section, error);
  this._loadDelegate = null;
};

Magazine.prototype.magazineLoadDidStop = function()
{
    this.loading = false;
    this._loadDelegate.magazineLoadDidStop(this);
    this._loadDelegate = null;
    this._stopDownload = false;
};

/*** section download delegate *****/

Magazine.prototype.sectionDownloadDidStart = function(section)
{
  dlog("Magazine sectionDownloadDidStarts section = " + section.title);
  this._downloadingSection = section;
  if(isset(this._downloadDelegate))
	this._downloadDelegate.sectionDownloadDidStart(this, section, this._currentIndex);
};

Magazine.prototype.sectionDownloadDidFinish = function(section)
{
  this._downloadingSection = null;
  this._sectionDownloaded += 1;
  
  // add the section to the downloaded sections list
  this._downloadState.downloadedSections.push(section.id);
  
  var magazine = this;
  this.save(
	function()
	{
	  if(isset(magazine._downloadDelegate))
		magazine._downloadDelegate.sectionDownloadDidFinish(magazine, section, magazine._currentIndex);
	  magazine.downloadSection(magazine._currentIndex + 1);
	},
	function(error)
	{
	  if(isset(magazine._downloadDelegate))
		magazine._downloadDelegate.sectionDownloadDidFinishWithError(magazine, section, magazine._currentIndex, error);
	});
  dlog("Magazine sectionDownloadDidFinish section = " + section.title);
};

Magazine.prototype.sectionDownloadDidStop = function(section)
{
  dlog("Magazine sectionDownloadDidStop section = " + section.title);
  this._downloadingSection = null;
  if(isset(this._downloadDelegate))
	this._downloadDelegate.sectionDownloadDidStop(this, section, this._currentIndex);
  this.downloadDidStop();
};

Magazine.prototype.sectionDownloadDidFinishAtItemIndexWithError = function(section, itemIndex, error)
{
  dlog("Magazine sectionDownloadDidFinishWithError section = " + section.title);
  dlog("error while loading section");
  if(isset(this._downloadDelegate))
	this._downloadDelegate.sectionDownloadDidFinishAtItemIndexWithError(this, section, this._currentIndex, itemIndex, error);
  this.downloadDidFail(error);
};

Magazine.prototype.itemDownloadDidStart = function(section, itemIndex)
{
	this._downloadDelegate.itemDownloadDidStart(this, this._currentIndex, itemIndex, section);
	dlog("itemDownloadDidStart " + itemIndex);
};
	
Magazine.prototype.itemDownloadDidFinish = function(section, itemIndex)
{
	this._downloadDelegate.itemDownloadDidFinish(this, this._currentIndex, itemIndex, section);
	dlog("itemDownloadDidFinish " + itemIndex);
};

Magazine.prototype.itemGalleryImageDownloadDidStart = function(section, galleryImageIndex, itemIndex)
{
  if (!this._downloadDelegate)
  {
    return;
  }
  this._downloadDelegate.itemGalleryImageDownloadDidStart(this, galleryImageIndex, section, this._currentIndex, itemIndex);
};

Magazine.prototype.itemGalleryImageDownloadDidFinish = function(section, galleryImageIndex, itemIndex)
{
  if (!this._downloadDelegate)
  {
    return;
  }
  this._downloadDelegate.itemGalleryImageDownloadDidFinish(this, galleryImageIndex, section, this._currentIndex, itemIndex);
};

/**** Download ****/

Magazine.prototype.download = function(downloadDelegate)
{
  this._downloadDelegate = downloadDelegate;
  
  // initialize the downloaded section count holder for this download session
  this._sectionDownloaded = 0;
  
  // start downloading
  this.downloadDidStart();
  this.downloadSection(0);
};

Magazine.prototype.downloadSections = function(downloadDelegate, sectionsToDownload)
{
  this._downloadDelegate = downloadDelegate;
  this._sectionsToDownload = sectionsToDownload;
  
  // initialize the downloaded section count holder for this download session
  this._sectionDownloaded = 0;
  
  // start downloading
  this.downloadDidStart();
  this.downloadSection(0);
};

Magazine.prototype.resumeDownloadSections = function(downloadDelegate)
{
  this._downloadDelegate = downloadDelegate;
  // start downloading
  this.downloadDidStart();
  this.downloadSection(this._currentIndex);
};

Magazine.prototype.downloadSection = function(index)
{
  this._currentIndex = index;

  this.updateDownloadProgress();
  
  var sections = this.sections;
  if (isset(this._sectionsToDownload))
  {
	sections = this._sectionsToDownload;
  }
  
  var magazine = this;
  if (index >= sections.length)
  {    
	magazine.downloadDidFinish();
	return;
  }
  
  var section = sections[index];
  
  if (section._downloadState.downloaded)
  {
    this.downloadSection(this._currentIndex + 1);
    return;
  }
  
  section.downloadGalery = true;
  section.download(this);
};

/**** Delete ****/

Magazine.prototype.deleteSections = function(deleteDelegate, sectionsToDelete)
{
  this._deleteDelegate = deleteDelegate;
  this._sectionsToDelete = sectionsToDelete;
  
  // initialize the downloaded section count holder for this download session
  this._sectionsDeleted = 0;
  
  // start deleting
  this.deleteDidStart();
  this.deleteSection(0);
};

Magazine.prototype.deleteSection = function(index)
{
  this._currentIndex = index;
  
  var sections = this._sectionsToDelete;
  
  var magazine = this;
  if (index >= sections.length)
  {    
	this.deleteDidFinish();
	return;
  }
  
  var section = sections[index];
  
  if (section._downloadState.downloaded == false)
  {
  	this._currentIndex = 0;
  	this._sectionsToDelete = null;
  	this.deleteSection(this._currentIndex + 1);
    return;
  }
  
  var success = function()
  {
  	magazine.deleteSection(magazine._currentIndex + 1);
  };
  
  var failure = function(error)
  {
  	magazine._currentIndex = 0;
  	magazine._sectionsToDelete = null;
  	magazine.deleteDidFinishWithError(error);
  	dlog("failed to remove section at index " + magazine._currentIndex);
  };
  
  this.removeSection(section, success, failure);
};

/**** Send message to delegate ****/

Magazine.prototype.deleteDidStart = function()
{  
  if(isset(this._deleteDelegate))
	this._deleteDelegate.magazineDeleteDidStart(this);
};

Magazine.prototype.deleteDidFinish = function()
{
  if(isset(this._deleteDelegate))
	this._deleteDelegate.magazineDeleteDidFinish(this);
};

Magazine.prototype.deleteDidFinishWithError = function(error)
{
  if(isset(this._deleteDelegate))
	this._deleteDelegate.magazineDeleteDidFinishWithError(this, error);
}

Magazine.prototype.downloadDidStart = function()
{
  this._startDownloadDate = new Date();
  this._downloadState.downloading = true;
  
  if(isset(this._downloadDelegate))
	this._downloadDelegate.magazineDownloadDidStart(this);
};

Magazine.prototype.downloadDidStop = function(error)
{  
  this._downloadState.downloading = false;
  this._stopDownload = false;
  
  if(isset(this._downloadDelegate))
	this._downloadDelegate.magazineDownloadDidStop(this);
};

Magazine.prototype.downloadDidFail = function(error)
{
  this._downloadState.downloading = false;
  
  if(isset(this._downloadDelegate))
	this._downloadDelegate.magazineDownloadDidFinishWithError(this, error);
};

Magazine.prototype.downloadDidFinish = function()
{
  this._endDownloadDate = new Date();
  var elapsetime = this._endDownloadDate - this._startDownloadDate;
  dlog("elapse time : " + (elapsetime / 3600));
  this._downloadState.downloading = false;
  
  // all sections of the magazine are downloaded ?
  if (this.isDownloaded() === true)
  {
	this._downloadState.downloaded = true;
  }
  
  var magazine = this;
  this.save(
	function()
	{
	  if(isset(magazine._downloadDelegate))
	  {
        var delegate = magazine._downloadDelegate;
		magazine._downloadDelegate = null;
		delegate.magazineDownloadDidFinish(magazine);
	  }
	},
	function(error)
	{
	  if(isset(magazine._downloadDelegate))
		magazine._downloadDelegate.magazineDownloadDidFinishWithError(magazine, error);
	});
};

/**** utility section ****/

Magazine.prototype.isDownloaded = function()
{
  return (this._downloadState.downloadedSections.length == this.sections.length);
};

Magazine.prototype.updateDownloadProgress = function(section)
{
  var sectionProgress = 0;
  if(isset(section) === true)
  {
	sectionProgress = section.downloadProgress / 100;
  }
  
  //var count = this._sectionsToDownload.length;
  var count = this.sections.length;
  var step = 100 / count;
  sectionProgress =  Math.ceil(sectionProgress * step);
  var magazineProgress = Math.ceil(this._sectionDownloaded * step);
  this._downloadState.downloadProgress = magazineProgress + sectionProgress;
};

Magazine.prototype.removeSection = function(section, success, failure)
{
  var magazine = this;
  section.remove(function()
  {
	var index = magazine.getDownloadedSectionIndex(section.id);
	var downloadedSections = magazine._downloadState.downloadedSections;
	downloadedSections.splice(index, 1);
	magazine.save(success, failure);
  });
};

Magazine.prototype.getDownloadedSectionIndex = function(sectionId)
{
  for (var i = 0; i < this._downloadState.downloadedSections.length; i++)
  {
	if (sectionId === this._downloadState.downloadedSections[i])
	  return (i);
  }
  return (-1);
};

Magazine.prototype.save = function(success, failure)
{
  FileManager.saveMagazine(this, success, failure);
};

Magazine.prototype.remove = function(success, failure)
{
  var magazine = this;
  var magazines = this.magazines;
  FileManager.removeMagazine(this, 
	function()
	{
	  magazines.removeMagazine(magazine);
							 success();
	}, failure);
};

Magazine.prototype.unload = function()
{
  for (var i = 0; i < this.sections.length; i++)
  {
	var section = this.sections[i];
	section.unload();
  }
};


/*
 * corpus-pro feed access layer
 * author : jose luc voltaire
 */

var NDAPI = 
{
  _requestQueue : [],
  _isProcessingRequest: false
};

/*
 * 
 */
NDAPI._sessionId = null;

/*
 * 
 */
NDAPI._baseURL = null;

/*
 *
 */
NDAPI._user = null;

/*
 * constant identifiying api method execution success status
 */
NDAPI.SUCCESS = 0;
NDAPI.CONNECTION_NEEDED = 2;

/*
 * 
 */
NDAPI.invokeMethod = function(method, parameters, callback)
{
	this._requestQueue.push({method: method, parameters: parameters, callback: callback});
  if (this._isProcessingRequest === false)
    this.processQueue();
};

NDAPI.processQueue = function()
{
  if (this._requestQueue.length === 0)
  {
    return; 
  }
  var request = this._requestQueue.shift();
  NDAPI.sendRequest(request.method, request.parameters, request.callback);
};

/**
 * send request to corpus-pro
 * method : the method name to call
 * paramers : a key/value pairs object in json notation
 * callback : the method which will be called after response is received
 **/
NDAPI.sendRequest = function(method, parameters, callback)
{
  this._isProcessingRequest = true;
  var parameterString = "tpl=json";
  if (NDAPI._sessionId !== null)
		parameterString += "&sid=" + NDAPI._sessionId;
	for (var parameter in parameters)
	{
		if (parameters[parameter] !== null)
		{
			parameterString += "&";
			parameterString += parameter + "=" + parameters[parameter];
		}	
	}
	
	var url = "";
	if (device.cordova)
	{
	  url = NDAPI._baseURL + method + "?" + parameterString;
	}
	else
	{
	  url = NDAPI._baseURL + method + "?" + encodeURIComponent(parameterString);
	}
	
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function ()
	{
		if (xhr.readyState == 4)
		{
			NDAPI._isProcessingRequest = false;
			if (xhr.status == 200)
			{
				if (window.plugins.NetworkActivityIndicator)
					window.plugins.NetworkActivityIndicator.set(false);
				if (callback !== null)
				{
					var parsedResponse = null;
					try
					{
						parsedResponse = JSON.parse(xhr.responseText);
					}
					catch (exception)
					{
					  dlog("connectCallBack exception :" + exception.message);
					}
					if (	parsedResponse &&
							parsedResponse.status && 
							parsedResponse.status == NDAPI.CONNECTION_NEEDED)
					{
						NDAPI.restoreConnection(method, parameters, callback);
					}
					else
						callback(parsedResponse);
				}
			}
			else
			{
				callback(null);
			}
        NDAPI.processQueue();
		}	
	};
  
  if (window.plugins.NetworkActivityIndicator)
    window.plugins.NetworkActivityIndicator.set(true);
	xhr.open("GET", url, true);	
  xhr.send();
};

NDAPI.restoreConnection = function(method, parameters, callback)
{
	NDAPI.connect(	user._login, 
					user._password, 
					function(response)
					{
						if (response.success)
						{
							NDAPI._requestQueue.unshift({method: method, parameters: parameters, callback: callback});
						}
						else
						{
							dlog("restoreConnection :" + response.message);
							callback(null);
						}
					});
};


/*
 * authentified the user and store his session id that will be use into all other requests
 * username :
 * password :
 * callback :
 */
NDAPI.connect = function(username, password, callback, object)
{
  if (NDAPI._connectCallBack === undefined)
  {
	  NDAPI._connectCallBack = [];
  }
  NDAPI._connectCallBack.push({callback: callback, object: object});
	NDAPI.invokeMethod(	"auth/connect", 
						{
              "u" : username, 
              "p" : password
            }, 
						NDAPI.connectCallBack);
};

/*
 * called when the connect request returns
 * store the session id and execute the call back method if exists
 */
NDAPI.connectCallBack = function(response)
{
  var callbackData = NDAPI._connectCallBack.shift();
  var callback = callbackData.callback;
  var object = callbackData.object;
  var result = null;
  
    if (response)
    {
        var success = response.status == NDAPI.SUCCESS;
        NDAPI._sessionId = response.message;
        result = {success : success, message: response.message};
    }
    else
        result = {success : false, message: i18n.getStringForId("server_unreachable")};
      
	if (object && "function" === typeof callback)
  	{
    	callback.call(object, result);
  	}
  	else if (callback !== null)
		callback(result);
};

/*
 * disconnect user and delete sessionId
 * callback :
 */
NDAPI.disconnect = function(callback, object)
{
  if (NDAPI._disconnectCallBack === undefined)
  {
    NDAPI._disconnectCallBack = [];
  }
	NDAPI._disconnectCallBack.push({callback: callback, object: object});
	NDAPI.invokeMethod(	"auth/disconnect", 
						{}, 
						NDAPI.disconnectCallBack);
};

/*
 * called when the disconnect request returns
 * delete the session id and execute the call back method if exists
 */
NDAPI.disconnectCallBack = function(response)
{		
  var callbackData = NDAPI._disconnectCallBack.shift();
  var callback = callbackData.callback;
  var object = callbackData.object;
  var result = false;
  
      if (response && response.status == NDAPI.SUCCESS)
      {
        NDAPI._sessionId = null;
        result = true;
      }
      
	if (object && "function" === typeof callback)
  {
    callback.call(object, result);
  }
  else if (callback !== null)
		callback(result);
};

/*
 * get from corpus-pro pipeline tree describing available content
 * callback : 
 */
NDAPI.getptree = function(callback, object)
{
  if (NDAPI._getptreeCallBack === undefined)
  {
    NDAPI._getptreeCallBack = [];
  }
  NDAPI._getptreeCallBack.push({callback: callback, object: object});
	NDAPI.invokeMethod(	"meta/getnumeroptree", 
						{}, 
						NDAPI.getptreeCallBack);
};

/*
 * called when the getptree request returns
 * execute the call back method if exists passing the pipeline tree object
 */
NDAPI.getptreeCallBack = function(response)
{	
  var callbackData = NDAPI._getptreeCallBack.shift();
  var callback = callbackData.callback;
  var object = callbackData.object;  
  var result = null;
  
      if (response && response.status == NDAPI.SUCCESS)
      {
        result = response.content;
      }
  
  if (object && "function" === typeof callback)
  {
    callback.call(object, result);
  }
	else if (callback !== null)
		callback(result);
};

/*
 * get a pipeline from corpus-pro
 * id :
 * callback : 
 *    pipeline : {}
 */
NDAPI.getPipeline = function(id, success, failure, object)
{
  if (NDAPI._getPipelineSuccessCallBack === undefined)
  {
    NDAPI._getPipelineSuccessCallBack = [];
  }
  NDAPI._getPipelineSuccessCallBack.push({success: success, failure: failure, object: object});
	NDAPI.invokeMethod(	"news/get", 
						{
              "id" : id
						}, 
						NDAPI.getPipelineCallBack);
};

/*
 * called when the getPipeline request returns
 * execute the call back method if exists passing the pipeline object
 */
NDAPI.getPipelineCallBack = function(response)
{
  var callback = NDAPI._getPipelineSuccessCallBack.shift();
  var successCallback = callback.success;
  var failureCallback = callback.failure;
  var object = callback.object;
  var result = null;
  
  if (response)
  {      
    if (object && "function" === typeof successCallback)
    {
      successCallback.call(object, response);
    }
    else if (successCallback !== null)
      successCallback(response);
    return;
  }
  
  if (object && "function" === typeof failureCallback)
  {
    failureCallback.call(object, result);
  }
  else if (failureCallback !== null)
    failureCallback(result);
};

/*
 * get the items link to an item
 * id : 
 * callback :
 *    items : [] 
 */
NDAPI.getChildren = function(id, success, failure, object)
{
  if (NDAPI._getChildrenSuccessCallBack === undefined)
  {
    NDAPI._getChildrenSuccessCallBack = [];
  }
  NDAPI._getChildrenSuccessCallBack.push({success: success, failure: failure, object: object});
	NDAPI.invokeMethod(	"news/get_children", 
						{
              "id" : id
						}, 
						NDAPI.getChildrenCallBack);
};

/*
 * called when the getPipeline request returns
 * execute the call back method if exists passing the pipeline object
 */
NDAPI.getChildrenCallBack = function(response)
{	
  var callback = NDAPI._getChildrenSuccessCallBack.shift();
  var successCallback = callback.success;
  var failureCallback = callback.failure;
  var object = callback.object;
	var result = null;
  
      if (response)
      {
        if (object && "function" === typeof successCallback)
        {
          successCallback.call(object, response);
        }
        else if (successCallback !== null)
          successCallback(response);
        return;
      }
  
  if (object && "function" === typeof failureCallback)
  {
    failureCallback.call(object, result);
  }
  else if (failureCallback !== null)
    failureCallback(result);
};

/*
 * get one item giving its id
 * callback : 
 *    response : {}
 */
NDAPI.getItem = function(id, success, failure,object)
{
  if (NDAPI._getItemCallBack === undefined)
  {
    NDAPI._getItemCallBack = [];
  }
  NDAPI._getItemCallBack.push({success: success, failure: failure, object: object});
  NDAPI.invokeMethod(	"news/get_item", 
						{
              "id" : id
						}, 
						NDAPI.getItemCallBack);
};

/*
 * called when the getItem request returns
 * execute the call back method if exists passing the request response
 */
NDAPI.getItemCallBack = function(response)
{
  var callback = NDAPI._getItemCallBack.shift();
	var successCallback = callback.success;
  var failureCallback = callback.failure;
  var object = callback.object;
  
      if (response)
      {
        if (object && "function" === typeof successCallback)
        {
          successCallback.call(object, response);
        }
        else if (successCallback !== null)
          successCallback(response);
        return;
      }
  
  if (object && "function" === typeof failureCallback)
  {
    failureCallback.call(object, response);
  }
  else if (failureCallback !== null)
    failureCallback(response);
};

/*
 * add a purchase to corpus-pro user account
 * appStoreId : 
 * receipt : 
 * callback : 
 *    response : {}
 */
NDAPI.buyNumeroByAppStoreId = function(appStoreId, receipt, callback, object)
{
  if (NDAPI._buyNumeroByAppStoreIdCallBack === undefined)
  {
    NDAPI._buyNumeroByAppStoreIdCallBack = [];
  }
  NDAPI._buyNumeroByAppStoreIdCallBack.push({callback: callback, object: object});
	NDAPI.invokeMethod(	"accesscontrol/buy_numero_inapp", 
						{
              "product_id" : appStoreId,
              "receipt_data" : receipt
						}, 
						NDAPI.buyNumeroByAppStoreIdCallBack);
  
};

/*
 * called when the buyNumeroByAppStoreId request returns
 * execute the call back method if exists passing the request response
 */
NDAPI.buyNumeroByAppStoreIdCallBack = function(response)
{		
  var callbackData = NDAPI._buyNumeroByAppStoreIdCallBack.shift();
  var callback = callbackData.callback;
  var object = callbackData.object;
	var result = null;
  
      if (response && response.status == NDAPI.SUCCESS)
      {
        result = response.content;
      }
  
  if (object && "function" === typeof callback)
  {
    callback.call(object, result);
  }
  else if (callback !== null)
		callback(result);
};

/*
 * add a purchase to corpus-pro user account
 * ndId : 
 * callback : 
 *    response : {}
 */
NDAPI.buyNumeroByNDId = function(ndId, callback, object)
{
  if (NDAPI._buyNumeroByNDIdCallBack === undefined)
  {
    NDAPI._buyNumeroByNDIdCallBack = [];
  }
  NDAPI._buyNumeroByNDIdCallBack.push({callback: callback, object: object});
  NDAPI.invokeMethod(	"accesscontrol/buyNumero", 
						{
              "numero_id" : ndId
						}, 
						NDAPI.buyNumeroByNDIdCallBack);
};

/*
 * called when the buyNumeroByAppStoreId request returns
 * execute the call back method if exists passing the request response
 */
NDAPI.buyNumeroByNDIdCallBack = function(response)
{		
  var callbackData = NDAPI._buyNumeroByNDIdCallBack.shift();
  var callback = callbackData.callback;
  var object = callbackData.object;
	var result = null;
  
      if (response && response.status == NDAPI.SUCCESS)
      {
        result = response;
      }
  
  if (object && "function" === typeof callback)
  {
    callback.call(object, result);
  }
  else if (callback !== null)
		callback(result);
};

/*
 * retreive all purchases done by the user stored in its corpus-pro account
 * callback : 
 *    response : {}
 */
NDAPI.getPurchases = function(callback, object)
{
  if (NDAPI._getPurchasesCallBack === undefined)
  {
    NDAPI._getPurchasesCallBack = [];
  }
  NDAPI._getPurchasesCallBack.push({callback: callback, object: object});
  NDAPI.invokeMethod(	"accesscontrol/getNumeroPurchases", 
                      {}, 
                      NDAPI.getPurchasesCallBack);
};

/*
 * called when the buyNumeroByAppStoreId request returns
 * execute the call back method if exists passing the request response
 */
NDAPI.getPurchasesCallBack = function(response)
{	
  var callbackData = NDAPI._getPurchasesCallBack.shift();
  var callback = callbackData.callback;
  var object = callbackData.object;
	var result = null;
  
      if (response && response.status == NDAPI.SUCCESS)
      {
        result = response.content;
      }
      
  if (object && "function" === typeof callback)
  {
    callback.call(object, result);
  }
  else if (callback !== null)
		callback(result);
};



var FileManager = {};

/* file error constants
 NOT_FOUND_ERR = 1,
 SECURITY_ERR = 2,
 ABORT_ERR = 3,
 NOT_READABLE_ERR = 4,
 ENCODING_ERR = 5,
 NO_MODIFICATION_ALLOWED_ERR = 6,
 INVALID_STATE_ERR = 7,
 SYNTAX_ERR = 8,
 INVALID_MODIFICATION_ERR = 9,
 QUOTA_EXCEEDED_ERR = 10,
 TYPE_MISMATCH_ERR = 11,
 PATH_EXISTS_ERR = 12
 */

/**
 * 
 * 
 */
FileManager.ROOT_DIRECTORY_NAME = null;


/*******************************************************************************
 *                            MAGAZINE UTILS
 *******************************************************************************/

/**
 * try to get magazines file system
 * return DirectoryEntry
 */
FileManager.getMagazinesRootDirectoryEntry = function(success, failure, options)
{
  if (isset(options) === false)
	options = {create: true, exclusive: false};
  var gotFS = function (fileSystem) 
  {
	//dlog("gotFS");
	// if no root folder was given, get the file system root folder
	if (isset(FileManager.ROOT_DIRECTORY_NAME) === false)
	{
	  success(fileSystem.root);
	}
	else
	{
	  //dlog(options.create);
	  fileSystem.root.getDirectory( FileManager.ROOT_DIRECTORY_NAME, 
								   options, 
								   success, 
								   failure);
	}
  };
  
  if (device.cordova)
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, failure);
  else
  {
	//dlog("gotFS");
  }
};

/**
 * get magazines folder list
 * return DirectoryEntries
 */
FileManager.getMagazinesRootDirectoryEntries = function(success, failure)
{
  var readMagazineDirectoryEntries = function (MagazinesDirectoryEntry) 
  {
	//dlog("readMagazineDirectoryEntries");
	var directoryReader = MagazinesDirectoryEntry.createReader();
	directoryReader.readEntries(success, failure);
  };
  
  if (device.cordova)
	FileManager.getMagazinesRootDirectoryEntry(readMagazineDirectoryEntries, failure);
  else
  {
	//dlog("readMagazineDirectoryEntries");
  }
};

/**
 * get a magzazine folder
 * return DirectoryEntriy
 */
FileManager.getMagazineDirectoryEntry = function(magazine, success, failure, options)
{   
  if (isset(options) === false)
	options = {create: false, exclusive: false};
  //dlog(options.create);
  var getMagazineDirectoryEntry = function (magazinesDirectoryEntry) 
  {
	//dlog("getMagazineDirectoryEntry: " + magazinesDirectoryEntry.fullPath);
	magazinesDirectoryEntry.getDirectory( "" + magazine.id, 
										 options, 
										 success, 
										 failure);
  };
  
  if (device.cordova)
	FileManager.getMagazinesRootDirectoryEntry(getMagazineDirectoryEntry, failure, options);
  else
  {
	//dlog("getMagazineDirectoryEntry");
  }
};

/**
 * 
 * 
 */
FileManager.getMagazineFileEntry = function(magazineDirectoryEntry, success, failure, options)
{   
  if (isset(options) === false)
	options = {create: false, exclusive: false};
   //dlog("getMagazineFileEntry");
  magazineDirectoryEntry.getFile( "magazine.json", 
								   options, 
								   success, 
								   failure);
};

/*******************************************************************************
 *                            SECTIONS UTILS
 *******************************************************************************/

/**
 * 
 * 
 */
FileManager.getSectionDirectoryEntry = function(magazine, section, success, failure, options)
{
  if (isset(options) === false)
	options = {create: false, exclusive: false};
  var getSectionDirectoryEntry = function (magazineDirectoryEntry) 
  {
	//dlog("getSectionDirectoryEntry: " + magazineDirectoryEntry.fullPath);
	magazineDirectoryEntry.getDirectory( "" + section.id, 
										 options, 
										 success, 
										 failure);
  };
  
  FileManager.getMagazineDirectoryEntry(magazine, getSectionDirectoryEntry, failure, options);
};

/**
 * 
 * 
 */
FileManager.getSectionFileEntry = function(magazine, section, success, failure, options)
{   
  if (isset(options) === false)
	options = {create: false, exclusive: false};
  var getSectionFileEntry = function(sectionDirectoryEntry)
  {
	//dlog("getSectionFileEntry: " + sectionDirectoryEntry.fullPath);
	sectionDirectoryEntry.getFile( "section.json", 
								   options, 
								   success, 
								   failure);
  };
  
  FileManager.getSectionDirectoryEntry(magazine, section, getSectionFileEntry, failure, options);
};

/*******************************************************************************
 *                            MAGAZINE
 *******************************************************************************/

/**
 * 
 * 
 */
FileManager.saveMagazine = function(magazine, success, failure)
{  
  //dlog("saveMagazine");
  
  var dataToStore = 
  {
	id: magazine.id,
	purchased: magazine.purchased,
	cover: magazine.cover,
	title: magazine.title,
	price: magazine.price,      
	pipeline: magazine.pipeline,
	date: magazine.date,
	appStoreProductId: magazine.appStoreProductId,
	downloadState: magazine._downloadState
  };
  
  var gotFileWriter = function (writer) 
  {
	//dlog("gotFileWriter");
	writer.onwrite = function(event) 
	{
	  //dlog("magazine saved");
	  success();
	};
	writer.onerror = function(event) 
	{
	  dlog("error saving magazine code : " + this.error.code);
	  failure(this.error);
	};
	writer.write(JSON.stringify(dataToStore));
  };
  
  var gotFileEntry = function (fileEntry) 
  {
	//dlog("gotFileEntry");
	fileEntry.createWriter(gotFileWriter, failure);
  };
  
  var downloadCoverImageSuccess = function(path)
  {
	magazine.cover = dataToStore.coverURL = path;
	FileManager.getMagazineDirectoryEntry(magazine, 
										  function(magazineDirectoryEntry)
										  {
										  FileManager.getMagazineFileEntry(magazineDirectoryEntry, gotFileEntry, failure, {create: true, exclusive : false});
										  },
										  failure, 
										  {create: true, exclusive : false});
  };
  
  if (device.cordova)
  {
	if (magazine.cover.indexOf("http") > -1)
		FileManager.downloadImage(magazine.cover, magazine, null, downloadCoverImageSuccess, failure, null);
	else
		FileManager.getMagazineDirectoryEntry(magazine, 
											  function(magazineDirectoryEntry)
											  {
											  FileManager.getMagazineFileEntry(magazineDirectoryEntry, gotFileEntry, failure, {create: true, exclusive : false});
											  },
											  failure, 
											  {create: true, exclusive : false});
  }
  else
  {
	//dlog("write magazine file");
	success();
  }
};

/**
 * 
 * 
 */
FileManager.readMagazineFile = function(magazineDirectoryEntry, success, failure)
{
  var readFile = function(file)
  {
	//dlog("gotFile");
	var fileReader = new FileReader();
	
	fileReader.onloadend = function(event)
	{
	  //dlog("read ended");
	  //dlog(event.target.result);
	  if (this.error)
	  {
		dlog("error loading magazine code : " + this.error.code);        
		FileManager._delegate.magazineLoadingDidFinishWithError(this.error);
		if (isset(success))
		  success();
	  }
	  else
	  {
		try
		{
		  //dlog(this.result);
		  //dlog("before parsing");
		  var magazineData = JSON.parse(this.result);
		  //dlog("after parsing");
		  var magazine = new Magazine();
		  //dlog("before initwithdata");
		  magazine.initWithData(magazineData);
		  //dlog("after initwithdata");
		  FileManager._delegate.magazineLoadingDidFinish(magazine);
		  if (isset(success))
			success();
		}
		catch (exception)
		{
		  dlog("exception catched : " + exception);        
		  FileManager._delegate.magazineLoadingDidFinishWithError(exception);
		  if (isset(success))
			success();
		}
	  }
	};
	
	fileReader.readAsText(file);
  };
  
  var getFile = function (fileEntry) 
  {
	//dlog("gotFileEntry");
	fileEntry.file(readFile, failure);
  };
  
  if (device.cordova)
	FileManager.getMagazineFileEntry(magazineDirectoryEntry, getFile, failure);
  else
  {
	//dlog("gotFileEntry");
	//dlog("gotFile");
	var magazineData = JSON.parse("{}");
	var magazine = new Magazine();
	magazine.initWithData(magazineData);
	success(magazine);
	//dlog("magazine read");
  }
};

/**
 * 
 * 
 */
FileManager.loadMagazines = function(delegate)
{
  //dlog("loadMagazines");
  FileManager._delegate = delegate;  
  var readEntries_R = function(entries, index)
  {
	if (index >= entries.length)
	{
	  FileManager._delegate.magazinesLoadingDidFinish();
	  return;
	}
	
	var entry = entries[index];
	//dlog("entry name : " + entry.name);
	if (entry.isDirectory)
	  FileManager.readMagazineFile(entry, function(){readEntries_R(entries, index + 1);}, function(){readEntries_R(entries, index + 1);});
	else
	  readEntries_R(entries, index + 1);      
  };
  
  var gotMagazineDirectoriesEntries = function(entries)
  {
	//dlog("gotMagazineDirectoriesEntries");
	readEntries_R(entries, 0);
  };
  
  var failure = function(error)
  {
	dlog("failure");
	FileManager._delegate.magazinesLoadingDidFinishWithError();
	FileManager._delegate.magazinesLoadingDidFinish();
  };
  
  if (device.cordova)
	FileManager.getMagazinesRootDirectoryEntries(gotMagazineDirectoriesEntries, failure);
  else
  {
	
	dlog("gotMagazineDirectoriesEntries");
	dlog("magazines loaded");
	
	FileManager._delegate.magazinesLoadingDidFinish();
    
    //var xhr = new XMLHttpRequest();
    //xhr.onreadystatechange = function()
    //{
    //    if (xhr.readyState == 4)
    //    {
    //        if (xhr.status != 200)
    //        {
    //          failure({/*error*/});
    //          return;
    //        }
    //        
    //        try
    //        {
    //          var magazineDataArray = JSON.parse(xhr.responseText);
    //          for (var i = 0; i < magazineDataArray.length; i++)
    //          {
    //            var magazineData = magazineDataArray[i];
    //            var magazine = new Magazine();
    //            magazine.initWithData(magazineData);
    //            FileManager._delegate.magazineLoadingDidFinish(magazine);
    //          }
    //          
    //          FileManager._delegate.magazinesLoadingDidFinish();
    //        }
    //        catch (excrption)
    //        {
    //          failure({/*error*/});
    //        }
    //        
    //    }
    //}
    //xhr.open("GET", sample_base_url + "sample/magazine.json");
    //xhr.send();
	
  }
};


/**
 * 
 * 
 */
FileManager.removeMagazine = function(magazine, success, failure)
{  
  //dlog("removeMagazine");
  var gotMagazineDirectoryEntry = function(magazineDirectoryEntry)
  {
	//dlog("gotMagazineDirectoryEntry");
	magazineDirectoryEntry.removeRecursively(success, failure);
  };
  
  if (device.cordova)
	FileManager.getMagazineDirectoryEntry(magazine, 
										  gotMagazineDirectoryEntry,
										  failure, 
										  {create: false, exclusive : false});
  else
  {
	/*
	dlog("gotMagazineDirectoryEntry");
	dlog("magazine removed");
	 */
	 success();
  }
};

/*******************************************************************************
 *                            SECTIONS
 *******************************************************************************/

/**
 * 
 * 
 */
FileManager.saveMagazineSection = function(section, success, failure, options)
{  
  //dlog("saveMagazineSection");
  
  var dataToStore = 
  {
	id: section.id,
	title: section.title,
	itemCount: section.itemCount,
	articles: section.articles,
	downloadState: section._downloadState,
	sectionTemplate: section.sectionTemplate
  };
  //dlog("saveMagazineSection item count = " + dataToStore.itemCount);
  dlog("saveMagazineSection section "+dataToStore.id+" template " + dataToStore.sectionTemplate);
  var gotFileWriter = function (writer)
  {
	//dlog("gotFileWriter");
	writer.onwrite = function(event) 
	{
	  success();
	};
	writer.onerror = function(event) 
	{
	  failure(this.error);
	  dlog("error saving section code : " + this.error.code);
	};
	
	writer.write(JSON.stringify(dataToStore));
  };
  
  var gotFileEntry = function (fileEntry) 
  {
	//dlog("gotFileEntry");
	fileEntry.createWriter(gotFileWriter, failure);
  };
  
  if (device.cordova)
	FileManager.getSectionFileEntry(section.magazine, 
									section, gotFileEntry, 
									failure, 
									{create: true, exclusive: false});
  else
  {
	//dlog(JSON.stringify(dataToStore));
	success();
  }
};

/**
 * 
 * 
 */
FileManager.readMagazineSectionFile = function(section, success, failure)
{
  //dlog("readMagazineSectionFile");
  var gotFile = function(file, entries, index)
  {
	//dlog("gotFile");
	var fileReader = new FileReader();
	
	fileReader.onloadend = function(event)
	{
	  //dlog("read ended");
	  //dlog(event.target.result);
	  if (this.error)
	  {
		dlog("error loading magazine code : " + this.error.code);        
		failure(this.error);
	  }
	  else
	  {
		try
		{
		  //dlog(this.result);
		  var magazine = section.magazine;
		  var sectionData = JSON.parse(this.result);
		  section.initWithData(sectionData);
		  section.magazine = magazine;
		  success(section);
		}
		catch (exception)
		{
		  dlog("exception catched : " + exception);        
		  failure(exception);
		}
	  }
	};
	
	fileReader.readAsText(file);
  };
  
  var gotFileEntry = function (fileEntry) 
  {
	//dlog("gotFileEntry");
	fileEntry.file(gotFile, failure);
  };
  
  if (device.cordova)
	FileManager.getSectionFileEntry(section.magazine, 
									section, 
									gotFileEntry, 
									failure, 
									{create: false, exclusive:false});
  else
  {
    if (section.magazine.cover.indexOf("http://localhost") == -1)
    {
      failure();
      return;
    }
    
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function()
	{
	  if (xhr.readyState == 4)
	  {
		var sectionString = xhr.responseText;
		try
		{
		  var sectionData = JSON.parse(sectionString);
		  section.initWithData(sectionData);
		  //section.magazine = magazine;
		  success(section);
		}
		catch (exception)
		{
		  dlog("exception catched : " + exception);        
		  failure(exception);
		}
	  }
	}
	var url = sample_base_url + "sample/" + section.magazine.id + "/" + section.id + "/section.json";
	xhr.open("GET", url);
	xhr.send();
  }
};

/**
 * 
 * 
 */
FileManager.loadMagazineSections = function(magazines, magazineReadCallback, callback)
{  
  //dlog("loadMagazineSections");
  
  var readEntries_R = function(entries, index)
  {
	if (index >= entries.length)
	{
	  success();
	  return;
	}
	
	var entry = entries[index];
	//dlog("entry name : " + entry.name);
	if (entry.isDirectory)
	  gotMagazineDirectoryEntry(entry, success, failure);
	else
	  readEntries_R(entries, index + 1);      
  };
  
  var gotMagazineDirectoriesEntries = function(entries)
  {
	//dlog("gotMagazineDirectoriesEntries");
	readEntries_R(entries, 0);
  };
  
  FileManager.getMagazinesRootDirectoryEntry();
};


/**
 * 
 * 
 */
FileManager.removeMagazineSection = function(section, success, failure)
{  
  //dlog("removeMagazineSection");
  
  var gotSectionDirectoryEntry = function(sectionDirectoryEntry)
  {
	//dlog("gotMagazineDirectoryEntry");
	sectionDirectoryEntry.removeRecursively(success, failure);
  };
  
  if (device.cordova)
	FileManager.getSectionDirectoryEntry( section.magazine, 
										  section, 
										  gotSectionDirectoryEntry, 
										  failure,
										  {create: false, exclusive:false});
  else
	success();
};

/*******************************************************************************
 *                            IMAGES
 *******************************************************************************/

/**
 * 
 * 
 */
FileManager.downloadImage = function(url, magazine, section, success, failure, progress)
{  
  //dlog("downloadImage");
  var fileName = MD5(url);
  var filePath = "";
  
  var downloadImageSuccess = function(response)
  {
	//dlog("downloadImageSuccess : " + response.progress);
	
	if (response.status == 1)
	{
	  //dlog("downloadDidFinish " + response.status);
	  success(filePath);
	}
	else
	{
	  dlog("downloading: " + response.progress + "%");
	}
  };
  
  var downloadImageFailure = function(error) 
  {
	dlog("downloadImageFailure");
	failure(error);
  };
  
  var imageFileEntryExists = function(fileEntry)
  {
	success(fileEntry.fullPath);
  };
  
  var imageFileEntryDoesNotExist = function(error)
  {
	if(error.code != FileError.NOT_FOUND_ERR)
	{
	  failure();
	  return;
	}
	
	var fileDownloader = window.plugins.FileDownloader;
	fileDownloader.downloadFile(url,
								filePath, 
								downloadImageSuccess, 
								downloadImageFailure,
								progress);
  };
  
  var gotFileDirectoryEntry = function(fileDirectoryEntry)
  {
	filePath = fileDirectoryEntry.fullPath + "/" + fileName;
	  //dlog("gotFileDirectoryEntry : " + url);
	
	// remove the scheme file://, cause it makes image download on android failed (file not found exception)
	if (filePath.indexOf("file://") > -1)
	  filePath = filePath.substr(7, filePath.length);
	
	var options = {create: false, exclusive: false};
	fileDirectoryEntry.getFile( fileName, 
							   options,
							   imageFileEntryExists,
							   imageFileEntryDoesNotExist);
  };
  
  if (isset(section))
	FileManager.getSectionDirectoryEntry(magazine, section, gotFileDirectoryEntry, failure, {create: true, exclusive: false});
  else
	FileManager.getMagazineDirectoryEntry(magazine, gotFileDirectoryEntry, failure, {create: true, exclusive: false});
};
