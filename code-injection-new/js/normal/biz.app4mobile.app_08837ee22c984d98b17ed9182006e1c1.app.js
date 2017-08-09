

	
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
 * External page model. Basically holds the URL.
 */
var ExternalPageModel = Backbone.Model.extend(
{
	defaults: 
	{
		url: ''
	}
});
 /**
 * The External Page template.
 */
var ExternalPageTemplateView = TemplateView.extend(
{
     /**
     * OVERRIDE - render level 1 - tab:
     */
    _renderTab : function(index, navRequest)
    {
        var templateMetaData = this.model.get('meta');
        
        var externalPageModel = new ExternalPageModel(templateMetaData);
        
        var id = Utils.Helpers.generateGUID();
        var externalPageView = new ExternalPageView(
        { 
            model: externalPageModel,
            id: id
        });
        
        this.$el.append(externalPageView.render().el);

        if (window.AppManager && AppManager.addSlave)
        {
            AppManager.addSlave(externalPageView.el, this.model.get('id'), function () {});
        }
        
        UN.onPageReady(id, navRequest, 1);
    }
    
});
 /**
 * The view of the external page. Will create the iFrame.
 */
var ExternalPageView = Backbone.View.extend(
{
	tagName: 'iframe',
	
	className: 'external_page',
	
	initialize: function () 
	{
		this.id = 'external_' + Utils.Helpers.generateGUID();
		
		// set the external page attributes such as data-role page.
		this.$el.attr(
		{
			'id': this.id,
			'data-role': 'page',
			'frameborder': '0',
			'scrolling': 'no',
			'allowtransparency': 'true'
		});
	},
	
	render: function () 
	{
		// set the external page url.
		this.$el.attr('src', this.model.get('url'));
		
		return this;
	}
});
 








(new Image()).src = 'app/interface/web/img/ajax-loader.png';






var DonationModel = Backbone.Model.extend(
{
    defaults:
    {
        id: "", // the id of the donation object
        payment: {}, // the payment object, with providers etc.
        meta: {
            successTitle: "", // not HTML text
            successDescription: "" // not HTML text
        },
        afterDonate: false, // before donate: false. after successfull donation: object with the donation data - how much money, etc.
        image: "", // image URL. TODO: object? array? etc.
        title: "", // not HTML text
        description: "" // not HTML text
    },

    initialize: function()
    {
        // temporary (=until will be supported) add alias
        var id = this.get('id') || "";
        var alias = Utils.Html.fixAlias(this.get('alias') || id, true, id);
        var images = this.get('images');
        var image = (images && images.main && images.main.url) || "";

        this.set(
            {
                alias: alias,
                image: image
            });
    },

    /**
     * ...
     * @return ...
     */
    donate: function () {
        //we take the 1st item in the providers array:
        var paymentProvider = this.get('payment').providers[0];

        var that = this;
        function cbSuccess (data) {
            that.set({afterDonate: data});
        }

        function cbFail (data) {
            if (typeof data === "string" && data === "TWICE")
            {
                // normal case - e.g.: the user closed the paypal browser, and now clicked on the "buy" again
            }
            else
            {
                // TODO: what to do?
                //cqm.showToastMessage( _T('DialogMessageAgendaNoFav'));
            }
        }
        StorePurchaseManager.buy(cbSuccess, cbFail, this.get('id'), paymentProvider, analytics.paymentType.Donate);
    },

    /**
     * Create and return share info object
     *
     * @return shareInfo - object containing the share info
     *
     * @author Matanya
     */
    getShareInfo: function()
    {
        var shareInfo = $.extend({}, this.get('shareInfo'));

        var appLink = AppManager.app().get('appLink');
        var params = {appName: AppManager.app().get('appLabel'),appLink: appLink };

        // if no texts from server - take client defaults:
        shareInfo.twitterTitle = shareInfo.twitterTitle || _T('DonationShareTwitter', params);
        shareInfo.fbDesc = shareInfo.fbDesc || _T('DonationShareFacebook', params); // for fb
        shareInfo.emailTitle = shareInfo.emailTitle || _T('DonationShareEmailTitle');
        shareInfo.emailDesc = shareInfo.emailDesc || _T('DonationShareEmailBody', params);
        shareInfo.url = shareInfo.url || appLink;
        shareInfo.shareButtonText = shareInfo.shareButtonText || _T('DonateShareButtonText');;

        return shareInfo;
    }
}); /**
* Donations list model
*/
var DonationsModel = ItemsModel.extend(
{
    // create + init the DonationCollection.
    createItemsCollection: function ()
    {
        return new DonationCollection(null, this.get('params'));
    }
}); /**
* Collection of donation - the service return object, but we treat it like item in array...
*/
var DonationCollection = ItemsCollection.extend({

    model: DonationModel,

    initialize: function (models, params) 
    {
		// "inherit" ("Super"):
		ItemsCollection.prototype.initialize.apply(this);
//        params.donationListId = params.listId;
		if (!params.donationListId)
	    {
		    this.invalid = true;
	    }
        this.params = {
            donationListId: params.donationListId
        };
    },
    
    getServiceName: function ()
    {
        return 'CMS_DONATION_GET';
    },
    
    parse: function (result)
    {
        return {models: $.map( result.items, function(item, i) {
            // filter items without payment providers:
            if (item.payment && item.payment.providers && item.payment.providers.length)
                return item;
            return null;
        })};
    },

    getParams: function ()
    {
        return this.params;
    }
}); var donationTemplates = {};

donationTemplates.donationPage = _.template(
'<div class="scroll_wrapper"><div class="scroller">' +

    // image
    '<% if (image) { %>' +
        '<div class="logoImgContainer">' +
            '<div class="dummy320x120"></div>' +
            '<div class="logoImg sliced_image" style="background-image:url(\'<%= image %>\')"></div>' +
        '</div>' +
    '<% } %>' +

    '<div class="info_container clr_contTypeA_bg shadow">' +
            '<div class="size_title_4 header clr_contTypeA_hdlTxt"></div>' +
            '<div class="description size_1 clr_contTypeA_txt"></div>' +
            '<div class="button_container narrow_button_container"></div>' +

    '</div>' +
    //'<div class="scroller_bug"></div>' +
'</div></div>' // scroll_wrapper + scroller
);

donationTemplates.donationPageWide = _.template(
'<div class="scroll_wrapper"><div class="scroller">' +
    '<div class="main_box_cont"><div class="main_box clr_contTypeA_bg shadow">' +
        // image
        '<% if (image) { %>' +
            '<div class="logoImgContainer">' +
                '<div class="dummy320x120"></div>' +
                '<div class="logoImg sliced_image" style="background-image:url(\'<%= image %>\')"></div>' +
            '</div>' +
        '<% } %>' +
        '<div class="container1">' +
            '<div class="button_container wide_button_container clr_contTypeA_vrtBrdr">' +
            '</div>' +
            '<div class="container2">' +
                '<div class="size_title_4 header clr_contTypeA_hdlTxt"></div>' +
                '<div class="description size_1 clr_contTypeA_txt"></div>' +
            '</div>' +
        '</div>' +
    '</div></div>' +
'</div></div>' // scroll_wrapper + scroller
);

donationTemplates.normalDonate = _.template(
'<div data-role="button" class="donate_button normal_donate clr_contTypeA_actBtn_bg clr_contTypeA_actBtn_brdr clr_contTypeA_actBtn_hdlTxt">' +
    '<span class="text"><%= _T("DonateNowNormal") %></span>' +
'</div>'
);

donationTemplates.paypalDonate = _.template(
'<div data-role="button" class="donate_button paypal_donate">' +
    '<span class="text"><%= _T("PaypalDonateNow", {paypalImage: \'<span class="sprite sprite-Paypal-logo"></span>\'}) %></span>' +
'</div>'
);
 /**
* view for the list of donations - but we probably will get 1 item - and we
 * will jump to "lonely item" - DonationView of the 1st item
*/
var DonationsView = ItemsView.extend(
{
	initialize: function ()
	{
        this.$el.attr(
        {
            'data-role': 'page'
//            ,'data-buttons': 'refresh'
        });

//        this.$el.html(blogTemplates.postsList());
//
//        // intialize the scrolling.
//        Scrolling.init(this.$el.find('.scroll_wrapper'));
//		this.$scroller = this.$el.find('.scroller');
//
//		this.$el.bind('refresh', this.handleRefreshClick.hitch(this));
//        this.$el.bind('silentRefresh', this.handleSilentRefresh.hitch(this));
		ItemsView.prototype.initialize.apply(this);
	},

    getRootView: function () 
    {
//        return this.$scroller;
        return this.$el;
    },
    
    createItemView: function (post)
    {
        return new Backbone.View({});
    },
    
    addTabsView: function (tabsViewEl) 
    {
//        this.getRootView().prepend(tabsViewEl);
    }
});
 /**
 * View that shows the donation home page
 * 
 * @author Matanya
 */
var DonationView = Backbone.View.extend(
{
    attributes: {
        'data-role': 'page'
    },

    className: "clr_contTypeB_fullPage4_bg",

    events: {
        "tap .donate_button": "donateClicked"
    },

    initialize: function () {
        this.$el.bind('pagehide', this.onPageHide.hitch(this));
        this.model.on("change:afterDonate", this.render, this);
        var template = (LAYOUT === layoutFormat.wide) ? donationTemplates.donationPageWide : donationTemplates.donationPage;

        this.$el.html(template(this.model.toJSON()));

        this.$scrollWrapper = this.$('.scroll_wrapper');
        this.$header = this.$('.header');
        this.$description = this.$('.description');
        this.$buttonContainer = this.$('.button_container');

        // intialize the scrolling.
        Scrolling.init(this.$scrollWrapper);
    },

    render: function () 
	{
        // do we before the donate, or after hte donate?
        if (this.model.get('afterDonate')) {
            var meta = this.model.get('meta');
            this.$header.text(meta.successTitle);
            this.$description.text(meta.successDescription);
            // render share button:
            this.$buttonContainer.html('');
            ShareControlHelper.addShareControlButton(this.$buttonContainer, this.model);
        }
        else {
            this.$header.text(this.model.get('title'));
            this.$description.text(this.model.get('description'));
            // do we need the normal donate or paypal?  NOTE: we don't need to check if provider exists, we filter all the items without providers...
            var isPaypal = this.model.get('payment').providers[0].type === paymentProvidersTypesEnum.Paypal;
            var template = isPaypal ? donationTemplates.paypalDonate : donationTemplates.normalDonate;
            this.$buttonContainer.html(template({}));
        }

        // update the scrolling.
        Scrolling.onContentChanged(this.$scrollWrapper);

        return this;
    },


    onPageHide: function ()
    {
        // after succeswsfull donate, in the next time we enter the page, we want to show the page like before the donation:
        this.model.set({afterDonate: false});
    },

    donateClicked: function (e) {
        //TODO: do we want toast message: "not supported in simulator"?
        this.model.donate();
    },
	
    addTabsView: function (tabsViewEl) 
    {
        this.$el.find('.scroller').prepend(tabsViewEl);
    }	
	

}); var DonationTemplateView = TemplateView.extend(
{	
	 /**
     * OVERRIDE - render level 1 - tab:
     */
    _renderTab : function(index, navRequest)
	{	
        var templateMetaData = this.model.get('meta');

        var item = templateMetaData.items[index];

        // create the model & view of the "list".
        var model = new DonationsModel(item);

        var view = new DonationsView({
            model: model
        });

        this.renderListPage({navRequest: navRequest, model: model, view: view/*, dividedScreenOptions: {}*/});

//        var donationModel = new DonationModel(item.params);
        
//        var id = Utils.Helpers.generateGUID();
//        var donationView = new DonationView(
//        {
//            model: donationModel,
//            id: id
//        });
//
//        //contactUsView.bind('showOnMapClicked', this._onMapClicked, this);
//
//        this.$el.append(donationView.render().el);
//
//        this.addTabsToView(donationView, index);
//        UN.onPageReady(id, navRequest, 1, true);
	},

    /**
     * OVERRIDE - handle "lonely item"
     */
    getDefaultItemAlias: function (data)
    {
        var itemsCollection = data.model.get('items');
        if (itemsCollection.length > 0) // temporay, until we have list design, than the condition will be  itemsCollection.length === 1
        {
            var itemModel = itemsCollection.at(0);
            return itemModel.get('alias');
        }
        return null;
    },

    /**
     * OVERRIDE.
     */
    getDetailsView: function (model)
    {
        var detailsPage = new DonationView({
            model: model
        });
//        detailsPage.bind('onShowOnMapTap', this._onShowOnMapTap, this);
        return detailsPage;
    },

	_onMapClicked: function (model)
    {
    }
}); 



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
        _didRedirect = true; APP_ID = null; //break loading
        window.setTimeout(function() {
            window.top.location.href = url;
        }, 0);
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

/**
 * Created by oren.tal on 04/08/2014.
 */
var QRScannerTemplateView = TemplateView.extend({
        /**
         * OVERRIDE - render level 1 - tab:
         */

        _renderTab: function (index, navRequest) {
            if (PLATFORM === platformEnum.simulator ){

                var genericPageModel = ErrPagesManager.getErrPage(errorPages.errorPagesTypes.notSupported, this.model.getArrContext());
                var id = Utils.Helpers.generateGUID();
                var pageView = new GenericPageView({
                    model: genericPageModel,
                    id: id
                });

                this.$el.append(pageView.render().el);
                UN.onPageReady(id, navRequest, 1, true);
            }
            else {
                var genericPageModel = new GenericPageModel({
                    title: _T("QRScannerWebAppHeader"),
                    text: _T("QRScannerWebAppText"),
                    img: 'app/interface/web/img/qrcode.svg'
                });

                var id = Utils.Helpers.generateGUID();
                var pageView = new GenericPageView({
                    model: genericPageModel,
                    id: id
                });

                this.$el.append(pageView.render().el);
                UN.onPageReady(id, navRequest, 1, true);
            }
        },



 }) 







/**
 * Model for the AboutUs template
 * 
 * @author Matanya
 */
var AboutUsModel = Backbone.Model.extend(
{	
	_INFO_ALIAS: 'info',
	_SHOWMORE_ALIAS: 'more',
	
	initialize: function()
	{
		//TODO: do all "set"-s in 1 "set":
		this.set(
		{
			'info_alias': this.get('info_alias') || this._INFO_ALIAS,
			'more_alias': this.get('more_alias') || this._SHOWMORE_ALIAS
		});
		
		// add the info-button (we always want it in about-us template):
		var buttons = this.get('buttons') || {};
		buttons.info = true;
		this.set(
		{
			'buttons': buttons
		});

		// for convenient...:
		var about = this.get('about') || "";
		this.set(
		{
			'about': about
		});
		var title = this.get('title') || "";
		this.set(
		{
			'title': title
		});
		var description = this.get('description') || "";
		this.set(
		{
			'description': description
		});
		var name = this.get('name') || "";
		this.set(
		{
			'aboutUsName': name
		});
		this.set(
		{
			'descriptionTitle': _T("HtmlTextAboutUsDescriptionTitle")
		});
		this.set(
		{
			'readMoreTitle': _T("HtmlTextAboutUsReadMore")
		});
		
		
		// Handle the data-list types and titles:
		this._handleDataList();
	},
	
	/**
	 * return the relevant model when navigating to inner page with alias "alias"
	 * @param {string} alias - the alias of the inner page (e.g.: info)
	 * @return {Model} model - the model relevant for this innear page
	 */
	getItemForAlias: function(alias)
	{
	    switch(alias)
	    {
	    case this.get('info_alias'): //'info':
		    return this; //I am the wanted model... 
	    case this.get('more_alias'): // 'more':
		    return this; //I am the wanted model... 
	    default: //item-more:
	    	// find the relevant item:
			var dataList = this.get('list') || [];
			for (var i = 0; i < dataList.length; i++) 
			{
				var params = dataList[i];
				if (params.alias === alias)
				{
					return new Backbone.Model(
					{
						title: params.title || '',
						text: params.text || '',
						icon: params.icon || '',
						iconBlack: params.iconBlack || ''
					});
					
				}
			}
	    }
		return null; // not found...
	},

	/**
	 * handle the data list:
	 * 1) translate titles if needed
	 * 2) handle all data-types to text/description (=html) fields
	 */
	_handleDataList: function()
	{
		var dataList = this.get('list') || [];
		for (var i = 0; i < dataList.length; i++) 
		{
			var params = dataList[i];
			
			params.alias = params.alias || ('' + (i+1)); 
			
			// translate the title (if needed):
			if (params.title) 
			{
				params.title = Utils.String.translateIfNeed(params.title);
			}
			// handle "no data":
			params.data = params.data || {};
			
			// handle the "dataType"s:
			if (params.dataType === "text") 
			{
				params.text = params.data.text;
			}
			else if (params.dataType === "html") 
			{
				params.description = params.data.html;
			}
			else if (params.dataType === "hours") 
			{
				var blocks = params.data.hours;
				if (params.data.alwaysOpen)
				{
					params.text = _T('HtmlTextAboutUsItemHoursAlwaysOpen');
				} 
				else if (blocks && blocks.length) 
				{
					var daysNames = 
					[
						_T("_day1s"),
						_T("_day2s"),
						_T("_day3s"),
						_T("_day4s"),
						_T("_day5s"),
						_T("_day6s"),
						_T("_day7s")
					];
					var firstDayOfWeek = _T("_firstDayOfWeek");
					for (var j = 0; j < blocks.length; j++) 
					{
						
						var days = $.map(blocks[j].days, function(n, i){
							// fix bug in CP: Sunday is 7 instead of 0:
							n = (n%7);
							if (n < firstDayOfWeek)
							{
								n += 7;
							}
							return n;
					    });
						
						days = days.sort();
						var daysStr = "";
						for (var k = 0; k < days.length; k++) 
						{
							daysStr += daysNames[(days[k]%7)];
							
							//check the "Sequence" - to check if we 
							//need "-" or "," or nothing:
							for (var k2 = k + 1; (k2 < days.length) && (days[k2-1] + 1 === days[k2]); k2++);
							if (k2 > k + 2)
							{
								daysStr += '-';
								//"jump" to the last day of the sequence (after the "k++" of the loop...)
								k = k2 - 2;
							}
							else if (k + 1 < days.length)
							{
								daysStr += ', ';
							}
						}
						blocks[j].daysStr = daysStr;
                        var startHour = (new Date(Utils.TimeDate.toUTCTime(Utils.TimeDate.timeToSeconds(blocks[j].startHour)))).format('shortTime2h');
                        var endHour = (new Date(Utils.TimeDate.toUTCTime(Utils.TimeDate.timeToSeconds(blocks[j].endHour)))).format('shortTime2h');
                        blocks[j].hoursStr = startHour + ' - ' + endHour;
					}
				}
				else
				{
					params.text = _T('HtmlTextAboutUsItemHoursNoHours');
				} 
			}
			else if (params.dataType === "list") 
			{
				var list = params.data.list;
				if (list && list.length) 
				{
					params.text = list[0];
					for (var j = 1; j < list.length; j++) 
					{
						params.text = params.text + "\n" + list[j];
					}
				}
			}
		}
		this.set(
		{
			'list': dataList
		});

	}
}); var aboutUsTemplates = {};

aboutUsTemplates.aboutUsTemplate = _.template(
    '<div class="scroll_wrapper"><div class="scroller"><div class="ipad_screen_center">' +
        '<% if (typeof(imgUrl) != "undefined" && imgUrl) { %>' +
            '<img class="aboutUs-img" src="<%= imgUrl %>" />' +
        '<% } %>' +
        '<div class="header">' +
            '<div class="header-text">' +
                '<% if (aboutUsName) { %>' +
                    '<div class="size_title_4 name clr_contTypeB_hdlTxt"><%= aboutUsName %></div>' +
                '<% } %>' +
                '<% if (title) { %>' +
                    '<div class="size_title_1 title clr_contTypeB_subTxt"><%= title %></div>' +
                '<% } %>' +
            '</div>' +
        '</div>' +
        '<% if (about) { %>' +
            '<div class="size_1 about descriptionText clr_contTypeB_txt"></div>' +
        '<% } %>' +
        '<% if (description) { %>' +
            '<div class="size_title_1 descriptionTitle clr_contTypeB_subTxt"><%= descriptionTitle %></div>' +
            '<div class="size_1 description descriptionText clr_contTypeB_txt"></div>' +
        '<% } %>' +
		'<div class="size_title_1 read_more_button clr_contTypeB_lnkTxt">' +
			'<%= readMoreTitle %>' +
		'</div>' +
        '<div class="share-icons-container">' +
        '</div>' +
        '<ul class="dataList"></ul>' +
    '</div></div></div>'
);

aboutUsTemplates.aboutUsMoreTemplate = _.template(
    '<div class="scroll_wrapper"><div class="scroller"><div class="ipad_screen_center">' +
        '<% if (typeof(imgUrl) != "undefined" && imgUrl) { %>' +
            '<img class="aboutUs-img" src="<%= imgUrl %>" />' +
        '<% } %>' +
        '<div class="header">' +
            '<div class="header-text">' +
                '<% if (aboutUsName) { %>' +
                    '<div class="size_title_4 name clr_contTypeA_hdlTxt"><%= aboutUsName %></div>' +
                '<% } %>' +
                '<% if (title) { %>' +
                    '<div class="size_title_1 title clr_contTypeA_subTxt"><%= title %></div>' +
                '<% } %>' +
            '</div>' +
        '</div>' +
        '<% if (about) { %>' +
            '<div class="size_1 about descriptionText clr_contTypeA_txt"></div>' +
        '<% } %>' +
        '<% if (description) { %>' +
            '<div class="size_title_1 descriptionTitle clr_contTypeA_subTxt"><%= descriptionTitle %></div>' +
            '<div class="size_1 description descriptionText clr_contTypeA_txt"></div>' +
        '<% } %>' +
    '</div></div></div>'
);

aboutUsTemplates.aboutUsItemMoreTemplate = _.template(
    '<div class="scroll_wrapper"><div class="scroller"><div class="ipad_screen_center">' +
        '<div class="header">' +
			'<% if (typeof(icon) != "undefined" && icon && typeof(iconBlack) != "undefined" && iconBlack) { %>' +
				'<div class="dataItemImage sliced_image clr_contTypeA_hdlIcn_black_icon" style="background-image:url(\'<%= iconBlack %>\')"></div>' +
				'<div class="dataItemImage sliced_image clr_contTypeA_hdlIcn_white_icon" style="background-image:url(\'<%= icon %>\')"></div>' +
				'<div class="dataItemImage sliced_mask clr_contTypeA_hdlIcn_mask_icon" style="-webkit-mask-image:url(\'<%= icon %>\')"></div>' +
			'<% } %>' +
            '<div class="header-text">' +
                '<% if (title) { %>' +
                    '<div class="size_title_1 title clr_contTypeA_subTxt"><%= title %></div>' +
                '<% } %>' +
            '</div>' +
        '</div>' +
        '<% if (text) { %>' +
            '<div class="size_1 description descriptionText clr_contTypeA_txt"></div>' +
        '<% } %>' +
    '</div></div></div>'
);

aboutUsTemplates.listItemTemplate = _.template(
	'<li class="dataItem clr_contTypeB_sep_brdr clearfix">' +
		'<div class="titleContainer">' +
			'<% if (typeof(icon) != "undefined" && icon && typeof(iconBlack) != "undefined" && iconBlack) { %>' +
				'<div class="dataItemImage inList sliced_image clr_contTypeB_hdlIcn_black_icon" style="background-image:url(\'<%= iconBlack %>\')"></div>' +
				'<div class="dataItemImage inList sliced_image clr_contTypeB_hdlIcn_white_icon" style="background-image:url(\'<%= icon %>\')"></div>' +
				'<div class="dataItemImage inList sliced_mask clr_contTypeB_hdlIcn_mask_icon" style="-webkit-mask-image:url(\'<%= icon %>\')"></div>' +
			'<% } %>' +
			'<% if (typeof(title) != "undefined" && title) { %>' +
				'<div class="size_title_0 dataItemTitle clr_contTypeB_hdlTxt"><%= title %></div>' +
			'<% } %>' +
		'</div>' +
		'<% if (typeof(description) != "undefined" && description) { %>' +
			'<div class="size_1 dataItemText descrContainer"></div>' +
		'<% } %>' +
		'<% if (typeof(text) != "undefined" && text) { %>' +
			'<div class="size_1 dataItemText listTextContainer clr_contTypeB_txt" ' +
			'data-alias="<%= alias %>" data-text="<%= text %>"' +
			'></div>' +
		'<% } %>' +
	'</li>');

aboutUsTemplates.readMoreTemplate = _.template(
	'<span class="size_title_1 read_more_text clr_contTypeB_lnkTxt">' +
		'<%= staticTitle %>' +
	'</span>');

aboutUsTemplates.hoursTemplate = _.template(
'<div class="hours_block">' +
    '<% for (var i = 0; i < days.length; i++) { %>' +
        '<div class="hourDayLine" > ' +
            '<div class="days_section">' +
                '<%= days[i] %>' +
            '</div>' +
            '<div class="hours_section" dir="ltr">' +
                '<%= hours %>' +
            '</div>' +
        '</div>' +
    '<% } %>' +
'</div>');

aboutUsTemplates.infoPageTemplate = _.template(
    '<div class="scroll_wrapper"><div class="scroller">' +
	    '<div class="info-page-place-holder  <%= cardColor %>">' +
	        '<img class="applogoimg" src="<%= appLogoImgUrl %>" />' +
            '<div class="size_title_4 _1_line ellipsis app-label clr_contTypeB_hdlTxt center"><%= appLabel %></div>' +
            '<div class="size_title_1 app-version clr_contTypeB_subTxt center"><%= appVersion %></div>' +
	        '<div class="share-button-container center"></div>' +
	    	'<% if (privacyPolicy) { %>' +
	        	'<div class="privacyPolicy center"></div>' +
			'<% } %>' +
        '</div>' + // info-page-place-holder
		'</div></div>' // scroll_wrapper + scroller

);

aboutUsTemplates.infoBannerTemplate = _.template(
    '<div class="infoFooter <%= pageColor %>">' +
        '<% if (banner && banner.imageUrl) { %>' +
            '<img class="banner" src="<%= banner.imageUrl %>" />' +
        '<% } %>' +
    '</div>'
);
 /**
 * View that shows the entire AboutUs template.
 * 
 * @author Matanya
 */
var AboutUsTemplateView = TemplateView.extend(
{	

	    /**
     * OVERRIDE - render level 1 - tab:
     */
    _renderTab : function(index, navRequest)
	{	
        var templateMetaData = this.model.get('meta');
        
        var item = templateMetaData.items[index]
        var model;
        // TODO: need this check?
        if (item)
        {
            item.metaTab = this.model.get('meta');
            model = new AboutUsModel(item);
        }
        else
        {
            model = new AboutUsModel();
            model.set('metaTab', this.model.get('meta'));
        }
        var id = Utils.Helpers.generateGUID();
        var aboutUsView = new AboutUsView(
        { 
            model: model,
            id: id
        });
        
//        aboutUsModel.bind('infoClicked', this._onInfoClicked, this);
//        aboutUsModel.bind('moreClicked', this._onMoreClicked, this);
//        aboutUsModel.bind('itemMoreClicked', this._onItemMoreClicked, this);
        this.$el.append(aboutUsView.render().el);
        
        this.addTabsToView(aboutUsView, index);

        // for case of no permalink to the item:
        var tabReady = function()
        {
            UN.onPageReady(id, navRequest, 1);
        };

        UN.registerChange(this._navToInner.hitch(this), 2, {
            data: {model: model},
            cbSelectDefault: tabReady,
            navRequest: navRequest});

	}

	,_navToInner: function (data, alias)
	{
		var navRequest = data.navRequest;
        var model = data.model.getItemForAlias(alias);
	
		if (!model)
		{
            this.itemNotFound(navRequest, 2, null);
            return;
		}
	
	    // create the details page (=info/more/item-more):
	    var id = Utils.Helpers.generateGUID();
	    
	    switch(alias)
	    {
	    case model.get('info_alias'): //'info':
		    var detailsPage = new AboutUsInfoView({
		        model: model,
		        id: id 
		    });
	      break;
	    case model.get('more_alias'): // 'more':
		    var detailsPage = new AboutUsMoreView({
		        model: model,
		        id: id 
		    });
	      break;
	    default: //item-more:
		    var detailsPage = new AboutUsItemMoreView({
		        model: model,
		        id: id 
		    });
	    }
	    
	    this.$el.append(detailsPage.render().el);
	
	    // "Slide" to it:
	    UN.onPageReady(id, navRequest, 2, true);
	}

}); var AboutUsInfoView = Backbone.View.extend({
	
	className: "info_page",

    attributes: {
		'data-role': 'page'
	},

    initialize: function () {
        var pageColor = (LAYOUT === layoutFormat.wide) ? 'clr_punch_wideBg' : 'clr_contTypeB_fullPage2_bg';
        this.$el.addClass(pageColor);

        var appSettings = AppSettingsManager.getSettings();
        var info = appSettings.get('brand').info || {};
        var banner = info.banner || null;

        if (banner)
        {
            var $infoFooter = $('#app_footer .infoFooter');
            if ($infoFooter.length == 0)
            {
                var params = {pageColor: pageColor, banner: banner};
                $infoFooter = $(aboutUsTemplates.infoBannerTemplate(params));

                // handle click on banner:
                if (banner && banner.redirectUrl)
                {
                    $infoFooter.find('.banner').tap(function(e){
                        appDriver.openLink(null, null, {
                            'url': banner.redirectUrl,
                            'title': banner.redirectUrl
                        });
                    });
                }
                $infoFooter.hide();
                var $footer = $('#app_footer');
                $footer.append($infoFooter);
            }

            var $mainFooter = $('#app_footer .mainFooter');

            this.$el.bind("pageshow", function () {
                $mainFooter.hide();
                $infoFooter.show();
    		});
            this.$el.bind("pagebeforehide", function () {
                $infoFooter.hide();
                $mainFooter.show();
            });
		}
    },
	
    render: function () {
		var templateParams = this.model.toJSON();
		
		// add the app's icon and label
		templateParams.appLabel = AppManager.app().get('appLabel');
		templateParams.appLogoImgUrl = AppManager.app().get('appIcon');

        templateParams.appVersion = _T('HtmlTextAboutUsInfoVersion', {
            versionName: APP_VERSION
        });
        templateParams.cardColor = (LAYOUT === layoutFormat.wide) ? 'clr_contTypeB_fullPage2_bg' : '';
        var appSettings = AppSettingsManager.getSettings();
        var info = appSettings.get('brand').info || {};
        var privacyPolicy = info.privacyPolicy || null;
		templateParams.privacyPolicy = privacyPolicy;

		this.$el.html(aboutUsTemplates.infoPageTemplate(templateParams));

        //add privacy policy html:
        if (privacyPolicy && privacyPolicy.text && privacyPolicy.type==="html")
        {
            var htmlContainer = new HtmlContainerControl();
            var html = Utils.String.translateIfNeed(privacyPolicy.text);
            htmlContainer.renderHtml(this.$('.privacyPolicy'), html, {
                zoomOnWide: false,
                changeColors: true,
                color: {
                    text: "clr_contTypeB_subTxt", //NOTE: we want here "sub text" color, not "text"!
                    title: "clr_contTypeB_hdlTxt",
                    link: "clr_contTypeB_lnkTxt"
                }
            });
        }

		var $scrollWrapper = this.$('.scroll_wrapper')

		var $buttonsContainer = this.$('.share-button-container');

		// Save the share option object inside the model
        this.model.set({
					getShareInfo: this._getShareInfo
				});
		this.model.getShareInfo = this._getShareInfo;
		
		ShareControlHelper.addShareControlButton($buttonsContainer, this.model);
		
		// update the scroller after loading the images. Also, delete the image in error
        this.$el.find('IMG').load(function () {
            // Call refresh scroll callback
            Scrolling.onContentChanged($scrollWrapper);
        }).error(function () {
            $(this).remove();
        });		        
        
		// intialize the scrolling.
		Scrolling.init($scrollWrapper);

		return this;
	},

    _getShareInfo: function () {
		var shareInfo = Utils.ShareInfo.shareAppInfo();
		
		// In simulator we dont share the app.
        if (PLATFORM == platformEnum.simulator) {
			return shareInfo;
		}				
		shareInfo.shareButtonText = _T('HtmlTextShareAppButtonText');
		return shareInfo;
	}
}); /**
 * View that shows the AboutUs home page
 *
 * @author Matanya
 */
var AboutUsView = Backbone.View.extend(
{
    className: 'main-page clr_contTypeB_bg t3d',

    attributes:
    {
        'data-role': 'page'
    },

    initialize: function()
    {
        // We need to know the size for "do we need show-more" calculations:
        $(window).bind("throttledresize", this.onResize.bind(this));
        this.$el.bind("pageshow", this.onPageShow.bind(this));
        this.$el.bind("pagehide", this.onPageHide.bind(this));

    },

    /**
     * function to convert days from number to words in the selected number
     * @param daysArray - an array of days in which the days are represented by number where number 1 mean monday and so on
     * @returns {Array} - an array of string that contain the days in words in the selected language
     * @private
     */
    _convertNumToDay: function (daysArray) {
        var DAYS = [ "_day2s", "_day3s", "_day4s", "_day5s", "_day6s", "_day7s", "_day1s"]; //week start from the second day Monday
        var convertedDays = [];
        for (var i = 0; i < daysArray.length; i++){
            convertedDays[i] = _T(DAYS[daysArray[i] - 1]); //The minus 1 is because the counting starting from one but the array starting from zero
        }
        return convertedDays;
    },
    _createItemView: function(item)
    {
        var blocks = item.data.hours;
        if (blocks && blocks.length)
        {
            item.description = '';
            for (var j = 0; j < blocks.length; j++)
            {
                var convertedDays = this._convertNumToDay( blocks[j].days);
                var blockParams =
                {
                    days: convertedDays,
                    hours: blocks[j].hoursStr
                }
                var block = aboutUsTemplates.hoursTemplate(blockParams);
                item.description = item.description + block;
            }
        }
        var $listItem = $(aboutUsTemplates.listItemTemplate(item));

        if (item.description)
        {
            item.text = Utils.String.sanitizeText(item.text, true);
            // Render HTML into container using HTML container control
            var htmlContainer = new HtmlContainerControl();

            // Set the description DIVs with the HTML Content
            htmlContainer.renderHtml($listItem.find('.descrContainer'),
                                    item.description,
                                    { zoomOnWide:false, changeColors: true });

        }

        return $listItem;
    },

    render: function()
    {
        var params = this.model.toJSON();

        this.$el.html(aboutUsTemplates.aboutUsTemplate(params));
        var $scrollWrapper = this.$('.scroll_wrapper');

        // update the scroller after loading the images. Also, delete the image in error
        this.$('IMG').load(function ()
        {
            // Call refresh scroll callback
            Scrolling.onContentChanged($scrollWrapper);
        }).error(function ()
        {
            $(this).remove();
        });

        // Add the data-list:
        var list = this.model.get('list');
        if (list.length)
        {
            var $list = this.$('.dataList');
            for (var i = 0; i < list.length; i++)
            {
                var params = list[i];
                var $listItem = this._createItemView(params);
                $list.append($listItem);
            }
        }

        // create share buttons:
        this.shareIconsView = new ShareIconsView(
        {
            model: this.model
        });
        this.$('.share-icons-container').append(this.shareIconsView.render().el);

        //bind "read more"
        this.$('.read_more_button').tap(this._onReadMoreClick.hitch(this));
        // intialize the scrolling.
        Scrolling.init($scrollWrapper);

        return this;
    },

    _onReadMoreClick: function (e)
    {
        e.preventDefault();
        var alias = this.model.get('more_alias');
        UN.navTo(alias);
        //this.model.trigger('moreClicked', this.model);
    },

    onPageShow: function ()
    {
        this.isPageShow = true;
        this.shareIconsView.onPageShow();
        this.updateDescriptions();
    },

    onPageHide: function ()
    {
        this.isPageShow = false;
    },

    onResize: function ()
    {
        if (this.isPageShow)
        {
            this.updateDescriptions();
        }
    },

    updateDescriptions: function ()
    {
        var pageWidth = Math.max(300, this.$el.width());

        //var that = this;
        var readMore = false;
        var params =
        {
            staticTitle: _T("HtmlTextAboutUsListItemReadMore")
        }
        var readMoreHtml = aboutUsTemplates.readMoreTemplate(params);

        // update description section:
        var description = this.model.get('description');
        if (description)
        {
            var descriptionMaxLength = Math.floor(pageWidth / 1.5);
            var $container = this.$('.description');
            //Do we need "show more"?
            if (descriptionMaxLength < description.length)
            {
                // If we can cut in dot (".") - do it
                description = Utils.String.trailString(description, descriptionMaxLength,{charStop:[{charStop:".",threshold:"50"}]});
                readMore = true;
            }
            $container.html(Utils.String.sanitizeText(description));
        }

        // update about section:
        var about = this.model.get('about');
        if (about)
        {
            var aboutMaxLength = Math.floor(pageWidth / 1.5);
            var $container = this.$('.about');
            //Do we need "show more"?
            if (aboutMaxLength < about.length)
            {
                // If we can cut in dot (".") - do it
                about = Utils.String.trailString(about, aboutMaxLength,{charStop:[{charStop:".",threshold:"50"}]});
                readMore = true;
            }
            $container.html(Utils.String.sanitizeText(about));
        }

        // Do we want to shoe the "general read more" ?
        if (readMore)
        {
            this.$('.read_more_button').show();
        }
        else
        {
            this.$('.read_more_button').hide();
        }

        // handle "read more" for list items:
        var listItemMaxLength = Math.floor((pageWidth - 40) / 2);
        this.$('.listTextContainer').each(function(index)
        {
            var $container = $(this);
            var text = $container.attr('data-text');
//          var title = $container.attr('data-title') || "";
//          var icon = $container.attr('data-icon') || "";
//          var iconBlack = $container.attr('data-iconBlack') || "";
            //Do we need "show more"?
            if (listItemMaxLength < text.length)
            {
                // "Cut" the string + Change \n to <br \>, etc.:
                var sanitizeText = Utils.String.trailString(text, listItemMaxLength);
                sanitizeText = Utils.String.sanitizeText(sanitizeText, true);
                $container.html(sanitizeText + '<br \>');
                var $readMore = $(readMoreHtml);
                $container.append($readMore);
//              var model = new Backbone.Model(
//              {
//                  title: title,
//                  text: text,
//                  icon: icon,
//                  iconBlack: iconBlack
//              });
                $readMore.tap(function(e)
                {
                    e.preventDefault();
                    var alias = $container.attr('data-alias');
                    UN.navTo(alias);
                    //that.model.trigger('itemMoreClicked', model);
                });
            }
            else
            {
                // Change \n to <br \>, etc.:
                var sanitizeText = Utils.String.sanitizeText(text, true);
                $container.html(sanitizeText);
            }
        });

    },

    addTabsView: function (tabsViewEl)
    {
        this.$el.find('.scroller').prepend(tabsViewEl);
    }

}); /**
 * View that shows the AboutUs "after show more" page  
 * 
 * @author Matanya
 */
var AboutUsMoreView = Backbone.View.extend(
{	
	className: 'main-page clr_contTypeA_bg',
	
	attributes: 
	{
        'data-role': 'page'
    },
	
	render: function() 
	{	
	    var params = this.model.toJSON();

	    this.$el.html(aboutUsTemplates.aboutUsMoreTemplate(params));
		var $scrollWrapper = this.$('.scroll_wrapper');

		if (params.about) 
		{
			// Render "about" text into container using links-text-control
			var linksTextControl = new LinksTextControl();
			linksTextControl.renderText(this.$('.about'), params.about);
		}
		if (params.description) 
		{
			// Render "description" text into container using links-text-control
			var linksTextControl = new LinksTextControl();
			linksTextControl.renderText(this.$('.description'), params.description);
		}
        
		// update the scroller after loading the images. Also, delete the image in error
        this.$('IMG').load(function ()
        {
            // Call refresh scroll callback
            Scrolling.onContentChanged($scrollWrapper);
        }).error(function ()
        {
            $(this).remove();
        });

	    Scrolling.init($scrollWrapper);
	    
		return this;
    }	
		
}); /**
 * View that shows the AboutUs "after show more of list item" page  
 * 
 * @author Matanya
 */
var AboutUsItemMoreView = Backbone.View.extend(
{	
	className: 'main-page clr_contTypeA_bg',
	
	attributes: 
	{
        'data-role': 'page'
    },
	
	render: function() 
	{	
	    var params = this.model.toJSON();
	    this.$el.html(aboutUsTemplates.aboutUsItemMoreTemplate(params));
		
		// Render text into container using links-text-control
		var linksTextControl = new LinksTextControl();
		linksTextControl.renderText(this.$('.description'), 
								params.text);

		var $scrollWrapper = this.$('.scroll_wrapper');
	    Scrolling.init($scrollWrapper);
		return this;
    }	
		
}); 











var webModuleTemplates = {};

webModuleTemplates.pageIframeTemplate = _.template(
    '<div class="scroll_wrapper" >' +
    '<iframe frameborder="0" marginheight="0" marginwidth="0" scrolling="auto" src="<%= link %>"></iframe>' +
    '</div>');

webModuleTemplates.pageStaticTemplate = _.template(
    '<div class="scroll_wrapper"><div class="scroller">' +
    '<div class="size_title_4 text clr_contTypeB_hdlTxt"><%= text %></div>' +
    '</div></div>'); var WebModuleTemplateView = TemplateView.extend({

    initialize: function () {
        TemplateView.prototype.initialize.apply(this);

        var platformInversed = Utils.Helpers.inverseDict(platformEnum);
        //"simulator"
        this.platformString = platformInversed[PLATFORM];
    },

    /**
     * OVERRIDE - render level 1 - tab:
     */
    _renderTab: function (index, navRequest) {
        var templateMetaData = this.model.get('meta'),
            jModel = templateMetaData.items[index],
            staticPages = jModel && jModel.staticPages,
            staticPage = (staticPages) ? staticPages[this.platformString] : null,
            tabModel = new Backbone.Model(jModel),
            viewType = WebModuleView;
        var id = Utils.Helpers.generateGUID();

        if (staticPage)
        {
            tabModel = new GenericPageModel(staticPage);//staticPage can include title,text,img params for the "generic page":
            viewType = GenericPageView;
        }
        var view = new viewType({
            model: tabModel,
            id: id,
            arrContext: this.model.getArrContext()
        });

        this.$el.append(view.render().el);
        UN.onPageReady(id, navRequest, 1, true);
    }

}); 

var PhotoModel = Backbone.Model.extend({
    
    defaults:
    {
        description: null,
        id: null,
        index: -1,
        largeImage: '',
        mediumImage: '',
        smallImage: '',
        photoTime: -1,
        selected: false,
        socialInfo: null,
        title: null
    },

	initialize: function()
	{
        var alias = Utils.Html.fixAlias(this.get('alias') || this.get('title'));
		this.set(
		{
            alias: alias,
            shareInfo: this.getShareInfo()
		});
	},

 	/**
	 * Create and return share info object
	 * 
	 * @return shareInfo - object containing the share info
	 *
	 * @author Moshe Darzi
	 */
	getShareInfo: function()
	{
		var shareInfo = this.get('socialInfo');
		
		if (shareInfo)
		{
			if(shareInfo.title)
			{
				shareInfo.title = _T('SSharePhotoSubjectWithTitle', {title: shareInfo.title});
			}
			else
			{
				shareInfo.title = _T('SSharePhotoSubject');
			}
		}

		return shareInfo;
	},

    getLargestImage: function ()
    {
        return this.get('largeImage') || this.get('mediumImage') || this.get('smallImage');
    },
    
    getSmallestImage: function ()
    {
        return this.get('smallImage') || this.get('mediumImage') || this.get('largeImage');
    },

    getMediumImage: function(larger)
    {
        if (larger)
        {
            return this.get('mediumImage') || this.get('largeImage') || this.get('smallImage');
        }
        else
        {
            return this.get('mediumImage') || this.get('smallImage') || this.get('largeImage');
        }
    }
    
}); var instagramTemplates = {

	// main user panel view
	userPanelView_tpl: _.template(
		'<div class="scroll_wrapper"><div class="scroller">' + 
			 '<div class="main_user_panel">' +
				'<div class="userInfoPanel"></div>' +
				'<div class="thumbGridPanel showMoreGapBug"></div>' +
			 '</div>' +
		 '</div></div>'),
		
	// user info panel view - user avatar, following, followers etc.
	userInfoPanelView_tpl: _.template(	
	'<div class="infoPanel box_padding clr_contTypeB_headerItem_bg clr_contTypeB_headerItem_brdr">'+
		'<div class="avatar sliced_image" style="background-image:url(\'<%= profile_picture %>\')"></div>' +
		'<div class="user_texts">'+
			'<div class="responsive size_title_3 clr_contTypeB_hdlTxt"><%= username %></div>'+
			'<div class="responsive size_title_2 number_box"><div class="info-box clr_contTypeB_hdlTxt"><%= media %></div><div class="responsive size_title_0 info-box-footer clr_contTypeB_subTxt"><%= photosText %></div></div>'+
			'<div class="responsive size_title_2 number_box cursor"><a class="followers clr_contTypeB_hdlTxt"><div class="info-box"><%= followed_by %></div><div class="responsive size_title_0 info-box-footer clr_contTypeB_lnkTxt"><%= followersText %></div></a></div>'+
			'<div class="responsive size_title_2 number_box last cursor"><a class="following clr_contTypeB_hdlTxt"><div class="info-box"><%= follows %></div><div class="responsive size_title_0 info-box-footer clr_contTypeB_lnkTxt"><%= followingText %></div></a></div>'+
		'</div>'+
        '<div class="clearfix"></div>'+
	'</div>'
		),
	
	// thumbs place holder
	thumbGridView_tpl: _.template(
			'<ul class="thumbPanel photoGridView"></ul>'
			),	

	// individual thumb.
    photoThumbView_tpl: _.template(
			'<img class="thumbnail" src="<%= smallImage %>" />'
    ),	
	
	// Detailed photo view.
	detailedPhotoView_tpl:_.template(
	'<div class="scroll_wrapper"><div class="scroller">' + 
		'<div class="box_padding clr_contTypeB_headerItem_bg clr_contTypeB_headerItem_brdr">' +
			'<div class="avatar sliced_image" style="background-image:url(\'<%= profilePictureUrl %>\')"></div>' +
			'<div class="comment_texts">' + 
				'<div class="responsive size_title_1 clr_contTypeB_hdlTxt user_name"><%= username %></div>' +
				'<% if(title){ %>' + 
					'<div class="responsive size_1 clr_contTypeB_txt"><%= title %></div>' +
				'<% } %>' +
				'<% if(photoTime){ %>' + 
					'<div class="responsive size_0 clr_contTypeB_subTxt photoTime"><%= photoTime %></div>' +
				'<% } %>' +
            '</div>' +
            '<div class="clearfix"></div>'+
        '</div>' +
		'<div class="clr_contTypeA_bg box_padding">' +
			'<div class="detailsPhoto_imageContainer">' +
                '<img class="full-image-view" src= <%= standard_resolution %> />'+
                '<div class="likesCommentsBar">' +
                    '<% if (likes_count) { %><div class="likesIcon showLikes cursor left"><span class="mask_sprite sprite-insta-heart clr_contTypeA_subIcn"></span><span class="cursor likesCount responsive size_title_0 clr_contTypeA_subTxt"><%= likes_count %> <span class="clr_contTypeA_lnkTxt cursor"><%= likes_str %></span></span></div><% } %>'+
                    '<% if (comments_count) { %><div class="commentsIcon showComments cursor right"><span class="mask_sprite sprite-insta-bubble clr_contTypeA_subIcn"></span><span class="cursor commentsCount responsive size_title_0 clr_contTypeA_subTxt"><%= comments_count %> <span class="clr_contTypeA_lnkTxt cursor"><%= comments_str %></span></span></div><% } %>'+
                '</div>' +
            '</div>'+
		'</div>' +
    '</div></div>'),

//	// Private user = failed to get user data
//	privateUser_tpl:_.template(
//		'<div class="privateUserBlock clr_contTypeA_bg">' +
//			'<div class="responsive size_title_4 privateUserMain clr_contTypeA_hdlTxt"><%= privateUserMain %></div>' +
//			'<div class="responsive size_title_1 privateUserSecondary clr_contTypeA_subTxt"><%= privateUserSecondary %></div>' +
//		'</div>'),
    
	// list view for comment/like/followers/following:
	itemsCollection_tpl: _.template('<div class="scroll_wrapper"><div class="scroller"><div class="itemsCollection showMoreGapBug"></div></div></div>'),
	
	// item in list of: comment/like/followers/following:
	item_tpl: _.template(
	'<div class="listPanel box_classic_padding clr_contTypeA_classicItem_bg clr_contTypeA_classicItem_brdr">' +
		'<div class="mini-avatar sliced_image" style="background-image:url(\'<%= profilePictureUrl %>\')"></div>' + 
		'<div class="comment_texts">' + 
			'<div class="responsive size_title_1 clr_contTypeA_lnkTxt small_user_name"><%= displayName || username%></div>' +
			'<% if(typeof(text)!= "undefined" && text){ %>' + 
				'<div class="responsive size_1 clr_contTypeA_txt"><%= text %></div>' +
			'<% } %>' +
	    '</div>' +
        '<div class="clearfix"></div>'+
    '</div>')
}

 var CommentsCollectionModel = Backbone.Model.extend({ 

    defaults: function() {
	
	},
	    
	initialize: function(model) {
		
		this.set("id" , model.user.id);
        this.set({alias: model.user.id});// NOTE: we can't "fix alias" because we use it as instagram id...
		this.set("created_time", model.created_time);
		this.set("text", model.text);
		this.set("username", model.user.username);
		this.set("displayName", model.user.displayName);
		this.set("profilePictureUrl", model.user.profilePictureUrl);
		this.set("comment_id", model.id);
	}
	
});
 var InstagramModel = ItemsModel.extend({
	
	createItemsCollection: function ()
	{
		var photoCollection = new InstagramPhotoCollection(null, this.toJSON());
//		photoCollection.on('thumb:click', this._onThumbClick, this);
//		photoCollection.on('commentsList:click', this._onCommentsClick, this);
//		photoCollection.on('likesList:click', this._onLikesClick, this);
//		photoCollection.on('getUser:click', this._onUserClick, this);
//		photoCollection.on('getFollowers:click', this._onFollowersClick, this);
//		photoCollection.on('getFollowing:click', this._onFollowingClick, this);
		return photoCollection;
	},

	_onGetItemsSuccess: function (metaData) {
		
        if (metaData) {
        	
        	this.set(metaData);
        }
    },

//	_onThumbClick: function (Data)
//	{
//		//bubble it...
//		this.trigger('thumb:click', Data);
//    },
//	_onCommentsClick: function (Data)
//	{
//		//bubble it...
//		this.trigger('commentsList:click', Data);
//    },
//	_onLikesClick: function (Data)
//	{
//		//bubble it...
//		this.trigger('likesList:click', Data);
//    },
//	_onUserClick: function (Data)
//	{
//		//bubble it...
//		this.trigger('getUser:click', Data);
//    },
//	_onFollowersClick: function (Data)
//	{
//		//bubble it...
//		this.trigger('getFollowers:click', Data);
//    },
//	_onFollowingClick: function (Data)
//	{
//		//bubble it...
//		this.trigger('getFollowing:click', Data);
//    },

    getItemsCollectionsNames: function () {
    	return [''];
    }

});
 // list items of "FollowedBy" or "Followers"
var FollowsModel = ItemsModel.extend({
	
	createItemsCollection: function ()
	{
		var followsCollection = new FollowsCollection(null, this.toJSON());
//		followsCollection.on('getUser:click', this._onUserClick, this);
		return followsCollection;
	},
//
//	_onUserClick: function (Data)
//	{
//		//bubble it...
//		this.trigger('getUser:click', Data);
//    },

	_onGetItemsSuccess: function (metaData) {
		
        if (metaData) {
        	
        	this.set(metaData);
        }
    },
    
    getItemsCollectionsNames: function () {
    	return [''];
    }

});
 
var LikesCollectionModel = Backbone.Model.extend({ 
    	  
    defaults: function() {
	},

    initialize: function(model) {
        this.set({alias: this.get("id")});// NOTE: we can't "fix alias" because we use it as instagram id...
    }

	
}); var InstagramUser = Backbone.Model.extend({ 
	  
	defaults: function() {
	   
		return {
			username: "",
			bio: "",
			website: "",
			profile_picture: "",
			full_name: "",
			media: "",
			followed_by: "",
			follows: "",
			id: ""
	    };
	},
    
	initialize: function() {
        this.set({alias: this.get('id')});// NOTE: we can't "fix alias" because we use it as instagram id...
	}

});

 var InstagramPhotoCollection = ItemsCollection.extend( {
    
	initialize: function (models, params) {

		ItemsCollection.prototype.initialize.apply(this);

        if (!params.userName)
        {
            this.invalid = true;
        }

		this.params = {
                type: params.type,
                userName: params.userName,
                extraInfo: params.params || {},
                take: params.PHOTOS_TAKE_COUNT
            };
	},
	
	parse: function (result){

		var retVal = {};
        var models = [];
        
		if (result && result.photos) 
		{
			var user = result.owner;
		 
			 _.each(result.photos, function(item, key)
			 {
                 item.alias = item.id;// NOTE: we can't "fix alias" because we use it as instagram id...
			 	models[key] = new PhotoModel(item);
				models[key].set({
					profilePictureUrl: user.profilePictureUrl,
					username: user.username,
					displayName: user.displayName
				});
				});
			 
            retVal.models = models;
	 
            var userModel = new InstagramUser({
		                	username:    user.username,
		                	displayName:    user.displayName,
		                	profile_picture: user.profilePictureUrl,
		                	media:       result.totalPhotos,
		                	followed_by: user.meta.totalFollowers ,
		                	follows:     user.meta.totalFollows ,
		                	id:  user.id
            	    		});
//			userModel.on('getFollowers:click', this._onFollowersClick, this);
//			userModel.on('getFollowing:click', this._onFollowingClick, this);
        
            retVal.metaData = {userModel: userModel};
		}
         
		return retVal;
	},
	
//	_onFollowersClick: function (Data)
//	{
//		//bubble it...
//		this.trigger('getFollowers:click', Data);
//    },
//	_onFollowingClick: function (Data)
//	{
//		//bubble it...
//		this.trigger('getFollowing:click', Data);
//    },

	getServiceName: function (){

		return 'CMS_PHOTOS_GET' ;
	},
	
	getParams: function (){
		
		return this.params;
	}
    
});

 // collection of "FollowedBy" or "Followers"
var FollowsCollection = ItemsCollection.extend( {
    
	initialize: function (models, params) {

		ItemsCollection.prototype.initialize.apply(this);
		
		this.params = {
				relationType: params.relationType,
				provider:params.type,
				userId: params.userName,
                extraInfo: params.params || {},
                take: params.PHOTOS_TAKE_COUNT
            };
	},

	parse: function (result){

		var retVal = {};
        var models = [];
        
		if (result && result.relations) {
		 
			 _.each(result.relations[0].Value, function(item, key){ 
				models[key] = new InstagramUser({
                    displayName: item.displayName,
                    id: item.id,
                    link: item.link,
                    profilePictureUrl: item.profilePictureUrl,
                    username: item.username
                });
	          });

            retVal.models = models;
		}
         
		return retVal;
	},
	
	getServiceName: function (){

		return 'CMS_USERS_GET' ;
	},
	
	getParams: function (){
		
		return this.params;
	}
    
}); /**
 * Instagram user panel
 * Shows user info and album thumbnails.
 *  
 * @author Dani Koren
 */

var UserMainPanelView = Backbone.View.extend({
	
	//general
	attributes: {"data-role": 'page', "data-buttons": 'refresh'},
	
	initialize: function (options) {
		
		this.userInfoPanelView = null;
		this.userGridPanelView = null;
		
		this.model.get('items').on('getItemsSuccess', this.getItemsSuccess, this);		
		this.template = instagramTemplates.userPanelView_tpl;
	},
	
    handleRefreshClick: function ()
	{
		if (this.userGridPanelView)
		{
			this.userGridPanelView.handleRefreshClick();
		}
	},
	    
    handleSilentRefresh: function ()
	{
		if (this.userGridPanelView)
		{
			this.userGridPanelView.handleSilentRefresh();
		}
	},
	    
	getItemsSuccess: function (param){
		
		this.initInfoPanel_View(param.userModel);
		this.$('.userInfoPanel').empty().append(this.userInfoPanelView.el);   
	},
    
	clearView: function(options){

		options.off();
		options.remove();
		options = null; 
	},
	
	initInfoPanel_View: function(userModel){
		
		if(this.userInfoPanelView){		
			this.clearView(this.userInfoPanelView);
		}
		
		this.userInfoPanelView = new UserInfoPanelView({model: userModel});
		this.userInfoPanelView.render();		
	},
	
	render: function(){
		
		$(this.el).html(this.template());
		Scrolling.init(this.$('.scroll_wrapper'));
		this.$el.bind('refresh', this.handleRefreshClick.hitch(this));

		this.userGridPanelView = new UserGridPanelView({
			  model: this.model
		});
    	this.$('.thumbGridPanel').append(this.userGridPanelView.render().el);

        this.$el.bind("pageshow", this._onPageShow.hitch(this));
        this.$el.bind("pagehide", this._onPageHide.hitch(this));

		// now - the page is not shown yet, so we start with
		// onPageHide (not with onPageShow):
//        this.userGridPanelView.onPageHide.hitch(this.userGridPanelView)();  
    	
		return this;
	},

    _onPageShow: function ()
    {
		// TODO: change it!
		// We need this TO, because the photosListView (grid or fade-show)
		// want to calculate positions according to some sizes 
		// (e.g.: offset, width) but without the TO, sometimes some 
		// elements are not shown yet, and we get offset=0 or width=0.
		setTimeout(function(){
			this.userGridPanelView.onPageShow.hitch(this.userGridPanelView)();
		}.hitch(this), 10);
    },

    _onPageHide: function ()
    {
		this.userGridPanelView.onPageHide.hitch(this.userGridPanelView)();
    },
    
	addTabsView: function (tabsViewEl){
		
        this.$('.scroller').prepend(tabsViewEl);
    }
	
});
 /**
 * Instagram user info panel
 * Shows user thumb, followers, following etc.
 *  
 * @author Dani Koren
 */

var UserInfoPanelView = Backbone.View.extend ({

	initialize: function () {
			
		this.template = instagramTemplates.userInfoPanelView_tpl;

	},
	
	events: {
		
		"tap .followers": "handleFollowers",
		"tap .following": "handleFollowing"
	},
	
	handleFollowers: function(e) {
		
		e.preventDefault();
		//this.model.trigger('getFollowers:click', this.model);
        UN.navTo(InstagramUrlPrefixes.FOLLOWERS_URL + this.model.get('alias'), {level:2});
	},
	
	handleFollowing: function(e) {
		
		e.preventDefault();
//		this.model.trigger('getFollowing:click', this.model);
        UN.navTo(InstagramUrlPrefixes.FOLLOWING_URL + this.model.get('alias'), {level:2});
	},
	
	render: function(){
        
		var view = this;
		var params =
		{
			photosText: _T('HtmlTextInstagramPhotosCount'),
			followersText: _T('HtmlTextInstagramFollowersCount'),
			followingText: _T('HtmlTextInstagramFollowingCount'),
			profile_picture: this.model.get('profile_picture')
			
		}
		params.username = this.model.get('displayName') || this.model.get('username');
		var media = localization.formatNumber(this.model.get('media'));
		params.media = media || '0';
		var followed_by = localization.formatNumber(this.model.get('followed_by'));
		params.followed_by = followed_by || '0';
		var follows = localization.formatNumber(this.model.get('follows'));
		params.follows = follows || '0';
		$(this.el).html(this.template(params));	
		return this;
	}
	
});
 /**
 * Instagram photo panel
 * Shows user grid of thumbnails.
 *  
 * @author Dani Koren
 */

var UserGridPanelView = ItemsView.extend({
	
	className: 'thumbPanel',
	
	initialize: function () 
	{
		ItemsView.prototype.initialize.apply(this);
		this.$itemsList.addClass('clr_contTypeA_bg');
		$(window).bind("throttledresize", this.onResize.hitch(this));
        var itemsCollection = this.model.get('items');
        if (itemsCollection)
        {
            // we want to update the margin also for the new items:
			itemsCollection.bind('getItemsSuccess', this.onResize, this);
        }
	},

	createItemView: function (thumbModel){
		
		var view = new ThumbView({model: thumbModel});
		
	    return  view;
	},

    onResize: function ()
    {
		if (this.isPageShow) 
		{
			this.updateThumbnailsMargin();
		}
    },

    onPageShow: function ()
    {
		this.isPageShow = true;
		this.updateThumbnailsMargin();
        this.$itemsList.css({
			visibility: "visible"
		});
    },

    onPageHide: function ()
    {
		this.isPageShow = false;
		
		// We don't want the "jump" when calculating the grid-margin,
		// but we need the items to take up place - for margin calculation,
		// so we use the:
		// "hidden - The element is invisible (but still takes up space)"
        this.$itemsList.css({
			visibility: "hidden"
		});
    },
        
    updateThumbnailsMargin: function()
	{
		var options = 
		{
			minWidth: 80,
			margin: 6,
			setAlsoMargin: true,
			setAlsoMarginTop: true
		};
		
		if (LAYOUT === layoutFormat.wide)
		{
			options.minWidth = 150;
		}
		//Utils.Html.setGridMargin(this.$itemsList);
		Utils.Html.setGridSizes(this.$itemsList, options);
	},

	getRootView: function (){
		
		return this.$el;
		
	}
	
});

 var ThumbView = Backbone.View.extend({
	
	model: PhotoModel,
	tagName: 'li',
	
	initialize: function(options) {

		this.template =  instagramTemplates.photoThumbView_tpl;
	},
	
	events: 
	{
		'tap': 'itemClicked' 
	},
	
	remove: function() {
		$(this.el).remove();
	},
	
	itemClicked: function (e){
		
		e.preventDefault();
        UN.navTo(this.model.get('alias'), {level:3});
		//this.model.trigger('thumb:click', this.model);
    },
    
    render: function() {
		
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
})
 var DetailedPhotoView = Backbone.View.extend({
	
	//general
	attributes: {"data-role": 'page', 'id': this.id},

    model:PhotoModel,
    
	events: {
		
		"tap .showComments": "showComments",
		"tap .showLikes": "showLikes",
		"tap .full-image-view": "openGallery"
	},
	
	initialize: function(){
		
		this.template = instagramTemplates.detailedPhotoView_tpl;
	},
	
	showComments: function(e){
		
		e.preventDefault();
//		this.model.trigger('commentsList:click', this.model);
        UN.navTo(InstagramUrlPrefixes.COMMENTS_URL + this.model.get('alias'), {level:3});
    },
	
	showLikes: function(e){
		
		e.preventDefault();
        UN.navTo(InstagramUrlPrefixes.LIKES_URL + this.model.get('alias'), {level:3});
//		this.model.trigger('likesList:click', this.model);
	},

	openGallery: function(e)
	{
		e.preventDefault();
		var photoArray =
			[{
				title: this.model.get('title'),
				photoTime: this.model.get('photoTime'),
				largeImage: this.model.getLargestImage(),
				shareInfo: this.model.get('shareInfo')
			}];
		
		new PhotoGalleryManager().pressedImage(photoArray, 0);
	},
	
	render: function() 
	{
		
		var params = 
		{
			likes_count: 0,
			comments_count: 0,
			likes_str: _T('HtmlTextInstagramLikes'),
			comments_str: _T('HtmlTextInstagramComments'),
			title: this.model.get('title'),
			photoTime: Utils.TimeDate.timeAsText(this.model.get('photoTime')),
			username: this.model.get('displayName') || this.model.get('username'),
			profilePictureUrl: this.model.get('profilePictureUrl'),
			standard_resolution: this.model.getLargestImage()
		};
		if (this.model.get('additionalInfo').likes.likes)
		{
			params.likes_count = localization.formatNumber(this.model.get('additionalInfo').likes.likes);
		}
		if (this.model.get('additionalInfo').totalComments)
		{
			params.comments_count = localization.formatNumber(this.model.get('additionalInfo').totalComments);
		}
		this.$el.html(this.template(params));
		var $scrollWrapper = this.$('.scroll_wrapper');
		Scrolling.init($scrollWrapper);

        // update the scroller after loading the image. Also, delete the image in error
        this.$('IMG').load(function ()
        {
            // Call refresh scroll callback
            Scrolling.onContentChanged($scrollWrapper);
        }.hitch(this)).error(function ()
        {
            $(this).remove();
        });
		
		return this;
	},
	
}); /**
 * View of "user" inside likes/followers/following list
 * 
 */
var InstagramItemView = Backbone.View.extend({

	tagName: 'li',
	
	initialize: function(options) {

		this.template =  instagramTemplates.item_tpl;
	},
	
	events: {
		
		"tap": "itemClicked"
	},
	
	itemClicked: function (e){
		
		e.preventDefault();
		//this.model.trigger('getUser:click', this.model);
        UN.navTo(InstagramUrlPrefixes.USER_URL + this.model.get('alias'), {level:2});
    },
    
    render: function() 
	{
		var params = this.model.toJSON();
		params.text = this.options.text;//w.g.: can be "like this" in case of likes
		$(this.el).html(this.template(params));
		
		return this;
	}
})
 var InstagramCommentView = Backbone.View.extend({
	
	tagName: 'li',
	
	initialize: function(options) {

		this.template =  instagramTemplates.item_tpl;
	},
	
	events: {
		
		"tap": "itemClicked" 
	},
	
	remove: function() {
		$(this.el).remove();
	},
	
	itemClicked: function (e){
		
		e.preventDefault();
		//this.model.trigger('getUser:click', this.model);
        UN.navTo(InstagramUrlPrefixes.USER_URL + this.model.get('alias'), {level:2});
    },
    
    render: function() {
		
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
})
 
var CommentsCollectionView = Backbone.View.extend({
	
	attributes: {"data-role": 'page',
		'id': this.id},
	
	initialize: function (options) {

		this.template = instagramTemplates.itemsCollection_tpl;
	},
	
	addAll: function() {
		
		var that = this;
		var commentModel;
		
		 _.each(this.collection, function(item, key){ 
			commentModel = new CommentsCollectionModel(item);
			//commentModel.on('getUser:click', that._onUserClick, that);
			
			that.addOne(commentModel);
		 });
	},

	addOne: function(model) {
		
		var view = new InstagramCommentView({model: model});
		this.$(".itemsCollection").append(view.render().el); 

	},

//	_onUserClick: function (Data)
//	{
//		//bubble it...
//		this.trigger('getUser:click', Data);
//    },

	render: function() {
		
		$(this.el).html(this.template());
		this.addAll();
		Scrolling.init(this.$('.scroll_wrapper'));
		
		return this;
	}
	
});
 
var LikesCollectionView = Backbone.View.extend({

	attributes: {"data-role": 'page', 'id': this.id },
	
	initialize: function (options) {

		this.template = instagramTemplates.itemsCollection_tpl;
	},
	
	
	addAll: function() {
		
		var that = this;
		var likeModel;
		
		 _.each(this.collection, function(item, key){ 
			likeModel = new LikesCollectionModel(item);
//			likeModel.on('getUser:click', that._onUserClick, that);
			that.addOne(likeModel);
		 });
	},

	addOne: function(likeModel) {
		
		view = new InstagramItemView(
		{
			model: likeModel,
			text: _T('HtmlTextInstagramUserLikePhoto')
		});
		this.$(".itemsCollection").append(view.render().el);

	},

//	_onUserClick: function (Data)
//	{
//		//bubble it...
//		this.trigger('getUser:click', Data);
//    },

	render: function() {
		
		$(this.el).html(this.template());
		this.addAll();
		Scrolling.init(this.$('.scroll_wrapper'));
		return this;
	}
	
});

 /**
 * The Instagram template.
 *
 * About the URL:
 * (e.g.: "instagram" is the template name. "tab2" is the tab name.
 * "123" is a user name. "456" is a photo id)
 *
 * level 0 - template. e.g.: instagram
 * level 1 - tab (=not show any page yet...) e.g.: instagram/tab2
 * level 2 - a page. can be:
 *  A: Default (the tab user) e.g.:instagram/tab2/default
 *  B: Another user e.g.: instagram/tab2/user_123
 *  C: followers list e.g.:instagram/tab2/followedBy_123
 *  D: following list e.g.:instagram/tab2/follows_123

 * level 3 (in case of after 2A or 2B)- a page. can be:
 *  A: Comments list on a photo e.g.: instagram/tab2/user_123/comments_456
 *  B: Likes list on a photo e.g.: instagram/tab2/user_123/likes_456
 *  c: Image e.g.: instagram/tab2/user_123/456

 // * level 3 - (in case of after 2A or 2B) a photo page instagram/tab2/user_123/456
// * level 4 - a page. can be:
// *  A: Comments list  e.g.:instagram/tab2/user_123/456/comments
// *  B: Likes list  e.g.:instagram/tab2/user_123/456/likes

 */
var InstagramUrlPrefixes = {
    // URL level 2 prefixes
    USER_URL: "user_", // the url of user page start with this, e.g.: "instagram/tab2/user_123" (123 is the user id)
    DEFAULT_USER_URL: "default", // like USER_URL of the user, but we need to know if to add the tabs-bar (we don't want tabs in inner page)
    FOLLOWERS_URL: "followedBy_", // the url of followers list page start with this, e.g.: "instagram/tab2/followedBy_123" (123 is the user id that we want to see his followers)
    FOLLOWING_URL: "follows_", // the url of following list page start with this, e.g.: "instagram/tab2/follows_123" (123 is the user id that we want to see his following list)

    // URL level 3 prefixes
    COMMENTS_URL: "comments_", // the url of comments list page is this, e.g.: instagram/tab2/user_123/comments_456
    LIKES_URL: "likes_" // the url of likes list page is this, e.g.: instagram/tab2/user_123/likes_456

//    // URL level 4
//    COMMENTS_URL: "comments", // the url of comments list page is this, e.g.: instagram/tab2/user_123/456/comments
//    LIKES_URL: "likes" // the url of likes list page is this, e.g.: instagram/tab2/user_123/456/likes
};

var InstagramTemplateView = TemplateView.extend({

    // URL level 2 prefixes
//    USER_URL: "user_", // the url of user page start with this, e.g.: "instagram/tab2/user_123" (123 is the user id)
//    DEFAULT_USER_URL: "default", // like USER_URL of the user, but we need to know if to add the tabs-bar (we don't want tabs in inner page)
//    FOLLOWERS_URL: "followedBy_", // the url of followers list page start with this, e.g.: "instagram/tab2/followedBy_123" (123 is the user id that we want to see his followers)
//    FOLLOWING_URL: "follows_", // the url of following list page start with this, e.g.: "instagram/tab2/follows_123" (123 is the user id that we want to see his following list)
//
//    // URL level 3 prefixes
//    COMMENTS_URL: "comments_", // the url of comments list page is this, e.g.: instagram/tab2/user_123/comments_456
//    LIKES_URL: "likes_", // the url of likes list page is this, e.g.: instagram/tab2/user_123/likes_456

//    getFollowing: function (model) {
//
//    	var params = {
//    			type: "instagram",
//    			relationType: "follows",
//    			userName: model.get('profile_id')
//    	};
//
//		this.innerGetFollows(params);
//    },
//
//    getFollowers: function (model) {
//
//    	var params = {
//    			type: "instagram",
//    			relationType: "followed-by",
//    			userName: model.get('profile_id')
//    	};
//		this.innerGetFollows(params);
//
//    },
//
//    innerGetFollows: function (params)
//	{
//    	var model = new FollowsModel(params);
//		model.on('getUser:click', this.getUser, this);
//
//        var following = new FollowsPanelView({
//            model: model,
//            id: 'Follows' + Utils.Helpers.generateGUID()
//        });
//
//        this.$el.append(following.render().el);
//        model.getItems(executeTypeEnum.HIT_AND_RUN);
//        $.mobile.changePage(Utils.Html.getIdSelector(following.id),  { transition: "slide", reverse: IS_RTL});
//
//		return this;
//    },
//
//    getUser: function (model) {
//
//    	var params = {
//    			title: "Instagram",
//    			type: "instagram",
//    			userName:  model.get("id")
//    	};
//
//    	var model = this._createInstagramModel(params);
//
//        var likesList = new UserMainPanelView({
//            model: model,
//            id: 'home_' + Utils.Helpers.generateGUID()
//
//        });
//
//		var $likesView = likesList.render().$el;
//
//		// Add back button:
//		$likesView.attr(
//		{
//			'data-buttons': 'refresh'
//		});
//
//        this.$el.append($likesView);
//        model.getItems(executeTypeEnum.HIT_AND_RUN);
//        $.mobile.changePage(Utils.Html.getIdSelector(likesList.id), { transition: "slide", reverse: IS_RTL});
//    },
//
//    /**
//     * Create & return new InstagramModel and bind to all the relevant events
//     * @param {dictionary} params - params for the model
//     * @return {InstagramModel} model - the new model
//     */
//	_createInstagramModel: function (params) {
//    	var model = new InstagramModel(params);
//		model.on('thumb:click', this.getDetailedPhoto, this);
//		model.on('likesList:click', this.getLikesCollection, this);
//		model.on('commentsList:click', this.getCommentsCollection, this);
//		model.on('getUser:click', this.getUser, this);
//		model.on('getFollowers:click', this.getFollowers, this);
//		model.on('getFollowing:click', this.getFollowing, this);
//		return model;
//    },
    
	 /**
     * OVERRIDE - render level 1 - tab:
     */
    _renderTab : function(index, navRequest) {
//    	this.index = index;
//
//		var tabParams = this.model.get('meta').items[index];
//		var instagramModel = this._createInstagramModel(tabParams);
//        var id = Utils.Helpers.generateGUID();
//        var userMainPanelView = new UserMainPanelView({
//            model: instagramModel,
//            id: id
//        });
//
//        this.$el.append(userMainPanelView.render().el);
//
//        this.addTabsToView(userMainPanelView, index);
//        UN.onPageReady(id);
//
//        instagramModel.getItems(executeTypeEnum.HIT_AND_RUN);
         var initParams = this.model.get('meta').items[index] || {};

         var data = {tabParams: initParams};
         UN.registerChange(this.onUserSelected.hitch(this), 2, {navRequest: navRequest, data: data, cbSelectDefault: this._selectDefaultUser.hitch(this)});
    },

    /**
     * select default user
     */
    _selectDefaultUser: function(data)
    {
        var navRequest = data.navRequest;
        // if not permalink: simulate the level 2 (e.g.: "user_123") from the tab params.
        UN.navTo(InstagramUrlPrefixes.DEFAULT_USER_URL, {navRequest: navRequest, isInner: false});
    },

    onUserSelected: function (data, alias)
    {
        var navRequest = data.navRequest;

        // clone the tab params (NOTE: we probably don't need it and can create a new params {type: "instagram"}, and that's it...):
        var params = $.extend({}, data.tabParams);

        if (alias.startsWith(InstagramUrlPrefixes.FOLLOWERS_URL) || alias.startsWith(InstagramUrlPrefixes.FOLLOWING_URL))
        {
            // followers list or following list

            var useGenericNoItems = true;
            var type = null;

            if (alias.startsWith(InstagramUrlPrefixes.FOLLOWERS_URL))
            {
                type = "followed-by";
                // get the user name (=id) from alias
                var userName = alias.replace(InstagramUrlPrefixes.FOLLOWERS_URL, "");
            }
            else if (alias.startsWith(InstagramUrlPrefixes.FOLLOWING_URL))
            {
                type = "follows";
                // get the user name (=id) from alias
                var userName = alias.replace(InstagramUrlPrefixes.FOLLOWING_URL, "");
            }

            // extend the params with the search query:
            $.extend(params, { userName: userName, relationType: type });

            // set current item in CurrentPageTracker:
            CurrentPageTracker.setCurrentItem(userName);

            // add "item view" usage-event:
            UsageManager.addEvent(analytics.usageEventTypeEnum.ItemView, {
                type: type,
                id: userName,
                list: true
            });

            var model = new FollowsModel(params);
            //model.on('getUser:click', this.getUser, this);

            var view = new FollowsPanelView({
                model: model
            });

//            this.$el.append(following.render().el);
//            model.getItems(executeTypeEnum.HIT_AND_RUN);
//            $.mobile.changePage(Utils.Html.getIdSelector(following.id),  { transition: "slide", reverse: IS_RTL});
        }
        else
        {
            // user list (inner or default)

            var useGenericNoItems = false; // maybe there is user with followers etc. but without "items" ("images"), so we don't want the "no images" page:

            if (alias.startsWith(InstagramUrlPrefixes.USER_URL))
            {
                // get the user name (=id) from alias
                var userName = alias.replace(InstagramUrlPrefixes.USER_URL, "");
                // extend the params with the search query:
                $.extend(params, { userName: userName });

                // set current item in CurrentPageTracker:
                CurrentPageTracker.setCurrentItem(userName);

                // add "item view" usage-event:
                UsageManager.addEvent(analytics.usageEventTypeEnum.ItemView, {
                    type: "user",
                    id: userName,
                    list: true
                });

            }
            else // if (alias.startsWith(InstagramUrlPrefixes.DEFAULT_USER_URL))
            {
                // no need to do nothing. the userName already exists in the params...
            }
            var model = new InstagramModel(params);
            var view = new UserMainPanelView({
                model: model
            });
//            model.on('thumb:click', this.getDetailedPhoto, this); // V
//            model.on('likesList:click', this.getLikesCollection, this); //not here
//            model.on('commentsList:click', this.getCommentsCollection, this); // not here
//            model.on('getUser:click', this.getUser, this); //this is already this level
//            model.on('getFollowers:click', this.getFollowers, this); //this is already this level
//            model.on('getFollowing:click', this.getFollowing, this); //this is already this level
        }

        // we wants the tabs only on the "normal" level, not after the user clicked on inner user:
        var addTabs = (alias === InstagramUrlPrefixes.DEFAULT_USER_URL);

        this.renderListPage({navRequest: navRequest, model: model, view: view, addTabs: addTabs, level: 2, useGenericNoItems: useGenericNoItems});
    },


    /**
     * OVERRIDE.
     */
    getItemViewUsageMeta: function (model, alias)
    {
        var meta = {id: model.get('id')};

        if (alias.startsWith(InstagramUrlPrefixes.COMMENTS_URL))
        {
            meta.type = 'comments';
        }
        else if (alias.startsWith(InstagramUrlPrefixes.LIKES_URL))
        {
            meta.type = 'likes';
        }
        else
        {
            meta.type = 'image';
        }

        return meta;
    },


    /**
     * OVERRIDE.
     */
    aliasToItemAlias: function (alias)
    {
        if (alias.startsWith(InstagramUrlPrefixes.COMMENTS_URL))
        {
            // get the image alias of comments page
           return alias.replace(InstagramUrlPrefixes.COMMENTS_URL, "");
        }
        else if (alias.startsWith(InstagramUrlPrefixes.LIKES_URL))
        {
            // get the image alias of likes page
            return alias.replace(InstagramUrlPrefixes.LIKES_URL, "");
        }
        else
        {
            // get the image alias of image page
            return alias;
        }
    },

    /**
     * OVERRIDE.
     */
    getDetailsView: function (model, data, alias)
    {
        if (alias.startsWith(InstagramUrlPrefixes.COMMENTS_URL))
        {
            // create the comments page view
            return new CommentsCollectionView({
                collection: model.get('additionalInfo').comments
            });
        }
        else if (alias.startsWith(InstagramUrlPrefixes.LIKES_URL))
        {
            // create the likes page view
            return new LikesCollectionView({
                collection: model.get('additionalInfo').likes.likeUsers
            });
        }
        else
        {
            // create the image page view
            return new DetailedPhotoView({
                model: model
            });
        }
    }

//    getDetailedPhoto: function(model){
//
//    	var detailsPage = new DetailedPhotoView({
//    		model: model,
//    		id: 'details_' + Utils.Helpers.generateGUID()
//    	});
//
//    	this.$el.append(detailsPage.render().el);
//        $.mobile.changePage(Utils.Html.getIdSelector(detailsPage.id), { transition: "slide", reverse: IS_RTL});
//
//    },
//
//    getLikesCollection: function(param){
//
//        var likesPage = new LikesCollectionView({
//        	collection: param.get('additionalInfo').likes.likeUsers,
//        	id: 'likes_' + Utils.Helpers.generateGUID()
//        });
//		likesPage.on('getUser:click', this.getUser, this);
//
//        this.$el.append(likesPage.render().el);
//        $.mobile.changePage(Utils.Html.getIdSelector(likesPage.id), { transition: "slide", reverse: IS_RTL});
//
//    },
//
//    getCommentsCollection: function(param){
//        var commentsPage = new CommentsCollectionView({
//        	collection: param.get('additionalInfo').comments,
//        	id: 'comments_' + Utils.Helpers.generateGUID()
//        });
//		commentsPage.on('getUser:click', this.getUser, this);
//        this.$el.append(commentsPage.render().el);
//        $.mobile.changePage(Utils.Html.getIdSelector(commentsPage.id), { transition: "slide", reverse: IS_RTL});
//    }
   
});

 //TODO: maybe we can unify FollowsPanelView and SocialCollectionView to 1 view
var SocialCollectionView = ItemsView.extend({
	
	initialize: function () {

		ItemsView.prototype.initialize.apply(this);
	},

	createItemView: function (thumbModel){

		var view = new InstagramItemView({model: thumbModel});
        
	    return  view;

	},

	getRootView: function (){

		return this.$el;	
	}
	
});
 //TODO: maybe we can unify FollowsPanelView and SocialCollectionView to 1 view
var FollowsPanelView = Backbone.View.extend({

	attributes: {"data-role": 'page', "data-buttons": "refresh"},
	
	initialize: function (options) {
		this.template = instagramTemplates.itemsCollection_tpl;
        this.$el.bind('refresh', this.handleRefreshClick.hitch(this));
        this.$el.bind('silentRefresh', this.handleSilentRefresh.hitch(this));
	},

    handleRefreshClick: function ()
    {
        if (this.screenView)
        {
            this.screenView.handleRefreshClick();
        }
    },

    handleSilentRefresh: function ()
    {
        if (this.screenView)
        {
            this.screenView.handleSilentRefresh();
        }
    },

	render: function(){
		
		$(this.el).html(this.template());
		Scrolling.init(this.$('.scroll_wrapper'));
    	
        this.screenView = new SocialCollectionView({
            model: this.model
        });

    	this.$('.itemsCollection').append(this.screenView.render().el);
    	
		return this;
	}
});
	
 var photosTemplates = {

	previews_list_tpl: _.template('<ul class="previews_list">' +
	'</ul>')

    ,album_preview_tpl:_.template(
	    '<div class="album_item touch_active clr_contTypeB_bubbleItem_bg clr_contTypeB_bubbleItem_brdr <% if (selected) { %> selected <% } %>" data-role="button" rel2="<%= albumIndex %>">' +
			'<div class="size_title_2 photos_count clr_contTypeB_txt">0</div>' +
			'<div class="size_0 photos_static_text clr_contTypeB_subTxt"><%= photosStaticText %></div>' +
			'<div class="preview_images active"></div>' +
			'<div class="preview_images inactive"></div>' +
		'</div>')

    ,preview_no_images_tpl:_.template(
		'<div class="preview_no_images clr_contTypeB_subBg">' +
			'<div class="center">' +
				'<div class="message clr_contTypeB_subTxt"><%= staticText %></div>' +
			'</div>' +
		'</div>')

    ,album_properties_preview_tpl:_.template(
		'<% if (coverUrl!== "") { %>' +			
        '<div class="album_cover sliced_image" style="background-image: url(\'<%= coverUrl %>\');" />' +
		'<% } %>' +
		'<div class="album_texts">' +
        	'<div class="size_title_3 _1_line ellipsis album_cover_name clr_contTypeB_hdlTxt"><%= name %></div>' +
			'<% if (descr!== "") { %>' +			
    	    	'<div class="size_1 album_description clr_contTypeB_txt"><%= descr %></div>' +
			'<% } %>' +
		'</div>')

    ,preview_image_tpl:_.template(
		'<div class="preview_image sliced_image" ' +
		'style="width: <%= width %>px;height: <%= height %>px;margin-top: <%= marginTop %>px;margin-right: <%= marginRight %>px;margin-left: <%= marginLeft %>px;' +
		'<% if (typeof(lazyLoad) != "undefined" && lazyLoad) { %>' +			
			'" data-image="<%= imgSrc %>" ' +
		'<% } else { %>' +
			'background-image: url(<%= imgSrc %>);" ' +
		'<% } %>' +
		'rel="<%= id %>" />')
	
	,photosListMarkup: _.template('<div class="scroll_wrapper">' +
	'<div class="scroller"></div>' +
	'</div>')
	
	,albumHeaderMarkup: _.template(
        '<% if (typeof(albumImage) != "undefined" && albumImage) { %>' +
            '<div class="album_header_item album_image sliced_image" style="background-image: url(<%= albumImage %>);"></div>' +
        '<% } %>' +
        '<div class="album_header_item flexboxChild-wideChild flexbox flexbox-center">' +
            '<div class="album_texts_container">' +
                '<div class="size_title_3 album_name clr_contTypeB_hdlTxt"> <%= albumName %> </div>' +
                '<% if (typeof(albumDescr) != "undefined" && albumDescr) { %>' +
                    '<div class="size_1 album_descr clr_contTypeB_txt"> <%= albumDescr %> </div>' +
                '<% } %>' +
            '</div>' +
        '</div>' +
        '<div class="album_header_item numbers_box flexbox flexbox-vertical flexbox-end">' +
            '<div class="size_title_2 photos_count_number clr_contTypeB_subTxt"> <%= count %> </div>' +
            '<div class="flexboxChild-wideChild size_0 _1_line photos_count_str clr_contTypeB_txt"> <%= photosStr %> </div>' +
            '<% if (typeof(uploadButton) != "undefined" && uploadButton) { %>' +
                '<div data-role="button" class="upload_button clr_contTypeB_actBtn_bg clr_contTypeB_actBtn_brdr clr_contTypeB_actBtn_hdlTxt">' +
                    '<div class="icon mask_sprite sprite-takePhoto clr_contTypeB_actBtn_icn"></div>' +
                '</div>' +
            '<% } %>' +
        '</div>')
	
	,thumbnail: 
	{
	
		// bordered images grid layout. No text
		0: _.template('<div class="image_thumbnail_container clr_images_image2_brdr clr_images_image2_bg">' +
		'<div class="image_thumbnail sliced_image" style="background-image: url(<%= imageSrc %>); height: <%= imageWidth %>px; width: <%= imageWidth %>px;"></div>' +
		'</div>')
		
		// small thumbnails with text
		,1: _.template('<div class="image_thumbnail sliced_image" style="background-image: url(<%= imageSrc %>); height: <%= imageWidth %>px; width: <%= imageWidth %>px;"></div>' +
		'<div class="photo_title clr_contTypeB_hdlTxt" style="max-width: <%= imageWidth %>px;"><%= title %></div>')
		
		// blog layout - layout 2
		,2: _.template(
		'<div class="photo_blog_container">' +
			'<div class="photo_blog_img" style="background-image: url(\'<%= imageSrc %>\');"></div>' +
			'<div class="photo_blog_user_container' +
			'<% if (userImage) { %>' +
				' withImage' +
			'<% } %>' +
			'">' +
				'<% if (userImage) { %>' +
					'<div class="userImage sliced_image" style="background-image: url(<%= userImage %>);"></div>' +
				'<% } %>' +
				'<div class="userTexts">' +
					'<% if (byUser) { %>' +
						'<div class="size_title_1 byUser clr_contTypeA_hdlTxt"><%= byUser %></div>' +
					'<% } %>' +
					'<div class="size_1 photo_blog_title clr_contTypeA_txt"><%= title %></div>' +
				'</div>' +
			'</div>' +
			'<div class="size_0 photo_blog_poster clr_contTypeA_subTxt"><%= timeText %></div>' +
		'</div>')
		
		// "Jerusalem's wall" grid, keep ratio
		,3: _.template('<img class="image_thumbnail clr_images_image2_brdr clr_images_image2_bg"' +
		' src="<%= imageSrc %>" style="height: <%= imageWidth %>px;">' +
		'</img>'),
		
		// vertical list layout - layout 4
		4: _.template('<img class="photo_vertical_img" src="<%= imageSrc %>" />' +
		'<% if (title) { %>' +
		'<div class="image_title clr_contTypeC_subTxt ' +
		'<% if (position === "top") { %>' +
		'top' +
		'<% } else if (position === "middle") { %>' +
		'middle' +
		'<% } else { %>' +
		'bottom' +
		'<% } %>' +
		'"><%= title %></div>' +
		'<% } %>'),
		
		// images size according to screen
		8: _.template('<div class="image_thumbnail_container clr_images_image2_brdr clr_images_image2_bg">' +
		'<div class="image_thumbnail sliced_image" style="background-image: url(<%= imageSrc %>);"></div>' +
		'</div>'),

		// like 8...
		9: _.template('<div class="image_thumbnail_container clr_images_image2_brdr clr_images_image2_bg">' +
		'<div class="image_thumbnail sliced_image" style="background-image: url(<%= imageSrc %>);"></div>' +
		'</div>')

		//10: columns grid, keep ratio - not in "thumbnail view", and no
		// HTML inside the thumbnail...

	}
	
	// fade-show layout - layout 5
	,largeImage: _.template(	//		'<div>' + /* <- we will do the "fade" on this div */
	'<div class="large_img sliced_image clr_appGeneral_bg" style="background-image:url(<%= imageSrc %>);">' +
	'<% if (title) { %>' +
	'<div class="header_box clr_contTypeC_bg">' +
	'<div class="image_title clr_contTypeC_hdlTxt"><%= title %></div>' +
	'</div>' +
	'<% } %>' +
	//		'</div>' +
	'</div>')
	
	// slide layout - layout 6
	,slideViewMarkup: _.template('<div class="slide_container" dir="ltr">' +
	'<div class="horizontal_strip">' +
	// TODO: Add this dynamicly?
	'<div class="image sliced_image cool_border_image clr_appGeneral_bg"></div>' +
	'<div class="image sliced_image cool_border_image clr_appGeneral_bg"></div>' +
	'<div class="image sliced_image cool_border_image clr_appGeneral_bg"></div>' +
	'<div class="image sliced_image cool_border_image clr_appGeneral_bg"></div>' +
	'<div class="image sliced_image cool_border_image clr_appGeneral_bg"></div>' +
	'<div class="image sliced_image cool_border_image clr_appGeneral_bg"></div>' +
	'<div class="image sliced_image cool_border_image clr_appGeneral_bg"></div>' +
	'</div>' +
	'</div>' +
	'<div class="size_1 album_description clr_contTypeB_hdlTxt"></div>')
	
	// arrows layout - layout 7
	,arrowsViewMarkup: _.template('<div class="slide_panel" dir="ltr">' +
	'<div class="prev button_arrow clr_contTypeB_actBtn_bg clr_contTypeB_actBtn_brdr clr_contTypeB_actBtn_hdlTxt clr_contTypeB_actBtn_icn" data-role="button">' +
	'<div class="icon mask_sprite sprite-arrow-left clr_contTypeB_actBtn_icn"></div>' +
	'</div>' +
	'<div class="image sliced_image cool_border_image clr_appGeneral_bg"></div>' +
	'<div class="next button_arrow clr_contTypeB_actBtn_bg clr_contTypeB_actBtn_brdr clr_contTypeB_actBtn_hdlTxt clr_contTypeB_actBtn_icn" data-role="button">' +
	'<div class="icon mask_sprite sprite-arrow-right clr_contTypeB_actBtn_icn"></div>' +
	'</div>' +
	'</div>' +
	'<div class="circles_container" dir="ltr"></div>' +
	'<div class="size_1 album_description clr_contTypeB_hdlTxt"></div>'
	)
	
	,circleButtonMarkup: _.template('<div class="circle_button clr_contTypeB_actBtn_bg clr_contTypeB_actBtn_brdr clr_contTypeB_actBtn_hdlTxt clr_contTypeB_actBtn_icn' +
	'<% if (disabled) { %>' +
	' disabled' +
	'<% } %>' +
	'" data-role="button">' +
	'</div>')
	
	,photoUploadMarkup: _.template(
			'<img class="thumbnail" src="<%= imageURI %>" />' +
			'<div class="uploading">' +
				'<div class="loading-txt clr_contTypeB_txt"><%= uploadTxt %></div>' +
				'<div class="loading-indicator mask_sprite sprite-ajax-loader_small spin clr_contTypeA_subIcn"></div>' +
			'</div>' +
			'<div class="fail-bar">' +
				'<div class="error-message clr_contTypeB_txt"><%= errorMessage %></div>' +
				'<div class="button retry-button clr_contTypeB_btn_bg clr_contTypeB_btn_brdr clr_contTypeB_btn_hdlTxt">' +
					'<div class="button-icon mask_sprite sprite-la-retry clr_contTypeB_btn_icn"></div>' +
				'</div>' +
				'<div class="button cancel-button clr_contTypeB_btn_bg clr_contTypeB_btn_brdr clr_contTypeB_btn_hdlTxt">' +
					'<div class="button-icon mask_sprite sprite-la-cancel clr_contTypeB_btn_icn"></div>' +
				'</div>' +
			'</div>'// buttons-bar
	)
}; /**
* The photos general model. Communicates with the CMS to get the feeds.
*/
var PhotosModel = ItemsModel.extend(
{
    initialize: function ()
    {
        ItemsModel.prototype.initialize.apply(this, arguments);

        var itemsCollection = this.get('items'); 
        
        // TODO: I think that we don't need this check.
        if (itemsCollection)
        {
            itemsCollection.bind('getItemsSuccess', this._onGetItemsSuccess, this);
            itemsCollection.bind('itemClicked', this.onItemClicked, this);//REMOVE THIS WHEN WE WILL USE "navTo"...
        }
        
		// create the collection for uploading images (live album)
        var uploadingImagesCollection = new Backbone.Collection();
		this.set({uploadingImagesCollection: uploadingImagesCollection});
    },

    createItemsCollection: function ()
    {
        var params = this.toJSON();
		var layout = this.get('layoutId');
		if (layout === 4 ||  layout === 5 ||  layout === 6 ||  layout === 7)
		{
			params.PHOTOS_TAKE_COUNT = 8;
		}
		else//if (layout === 0 ||  layout === 1 ||  layout === 2 ||  layout === 3)
		{
			params.PHOTOS_TAKE_COUNT = 25;			
		}
		
		return new PhotosCollection(null, params);
    },

//REMOVE THIS WHEN WE WILL USE "navTo"...
	/**
	 * Bubble it...
	 * @param {ItemModel Object} itemModel
	 */
	onItemClicked: function (itemModel)
	{
		this.trigger('itemSelected', itemModel);
	},

    _onGetItemsSuccess: function (metaData) 
    {
        if (metaData) 
        {
            this.set(metaData);
        }
        
		// handle "live album" stuff: add "uploading images", or remove if we get it from service:
		this._addUploadingToCollection();
    },
    

	/**
	 * get the url of the live-album service (create it if not exists)
	 */
    _getUploadUrl: function ()
	{
    	if (!this.uploadServiceUrl)
    	{
    		var groupId = this.get('params').groupId;
    		var albumId = this.get('userName');
    		
    		var getParams = 
    		{
    			albumId: albumId
    			,groupId: groupId
    		};
    		
    		this.uploadServiceUrl = Services.generateUrl('LIVE_ALBUM_PHOTO_V2_POST', getParams);
    	}
    	return this.uploadServiceUrl;
	},
	
	/**
	 * Post a new image (from the user) to the album.
	 */
    uploadImage: function (imageURI, textMessage)
	{
        var that = this;
    	function _cbGetAccessSuccess(tokens, userData) 
		{                        
    		// data of the model:
			var userImageUrl = "http://graph.facebook.com/" + tokens.fbId + "/picture";
			
			var postParams = new Object();
			postParams.message = textMessage;
			postParams.userId = tokens.fbId;
			postParams.userType = PhotoUploadUserTypes.FACEBOOK;
			//NOTE: we will update it every "retry":
			//postParams.dateTaken = parseInt(new Date().getTime()/1000);
			postParams.userImageUrl = userImageUrl;
			postParams.userProfileUrl = "http://www.facebook.com/" + tokens.fbId;
			if (userData && userData.link)
			{
				postParams.userProfileUrl = userData.link;
			}
			postParams.username = "";
			if (userData && userData.name)
			{
				postParams.username = userData.name;
			}

			var photoUploadModel = new PhotoUploadModel({
				
				// Data for "upload image:
				imageURI: imageURI
				,postParams: postParams

				// Data for "image":
				,largeImage: imageURI
				,title: textMessage
				//NOTE: we will update it every "retry":
				,photoTime: parseInt((new Date().getTime())/1000)
				,from: {
					imageUrl: userImageUrl,
					name: _T("HtmlTextLiveAlbumUploadedByYou")
				}

			});
                                    
            var cbIPhoneUploadImageDlgSuccess = function (data) {
                if (data) {
                    photoUploadModel.set({
                        id: Utils.Helpers.generateGUID(),
                        upload_id: data.result.photo.id
                    });
                                    
                    that.get('uploadingImagesCollection').add(photoUploadModel);
                    photoUploadModel.set({state: PhotoUploadModel.STATE.SUCCESS});
                    that._addUploadingToCollection();
                }
            };
            /*
            if (DEVICE === deviceTypeEnum.iphone)
            {
                photoUploadModel.set({uploadServiceUrl: that._getUploadUrl()});
                photoUploadModel.set({instagramShare: AppSettingsManager.getSettings().get('instagramShare')});
                  
                navigator.liveAlbum.postImageData(cbIPhoneUploadImageDlgSuccess, null, photoUploadModel.toJSON());
            }
            else 
            {
             */
                that.get('uploadingImagesCollection').add(photoUploadModel);

                photoUploadModel.bind('onRetry', that._uploadImage, that);
                photoUploadModel.bind('onCancel', that._onCancelUpload, that);
			
                that._uploadImage(photoUploadModel);
            //}
		}
		
		function _cbGetAccessFailed()
		{
			// do nothing, user canceld login.
		}
		
		var options = {useLoginForm : true};
        socialDriver.getAccessTokens(_cbGetAccessSuccess,
										  _cbGetAccessFailed, 
										  socialServicesEnum.Facebook,
										  options);
		
	},

    
	/**
	 * Upload/retry uploading a new image (from the user: photoUploadModel) to the album.
	 */
    _uploadImage: function (photoUploadModel)
	{
    	photoUploadModel.set({state: PhotoUploadModel.STATE.UPLOADING});
    	/************************ TEST START ********************************
		if (new Date().getSeconds() > 40) 
		{
			//SUCCESS:
			var response = 
			{
				result:
				{
					photo:
					{
						id: Utils.Helpers.generateGUID()
					}
				}
			};
			
			setTimeout(function () {
				this._imageUploadSuccess(photoUploadModel, response);
			}.hitch(this), 1000);
		}
		else 
		{
			//FAIL
			setTimeout(function () {
				this._imageUploadFailed(photoUploadModel);
			}.hitch(this), 1000);
		}

		return;

		/************************ TEST END ********************************/

		var imageURI = photoUploadModel.get('imageURI');
		var postParams = photoUploadModel.get('postParams');
		
		// TODO: Do it only once?
		var options = new FileUploadOptions();
		options.fileKey = "file";
		options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
		options.mimeType = "image/jpeg";

		// update the time (also for the model...)
		var dateTaken = parseInt(new Date().getTime()/1000);
		postParams.dateTaken = dateTaken; 
    	photoUploadModel.set({photoTime: dateTaken});

		options.params = postParams;
		var uploadServiceUrl = this._getUploadUrl();
		var ft = new FileTransfer();
		var that = this;
		ft.upload(
				imageURI,
				uploadServiceUrl,
				function (response)
				{
					// I don't know why but according the PhoneGap doc, 
					//	"response.response" is:
					//	"The HTTP response returned by the server. (DOMString)"
					//	(Why not JSON? it is like "JSON.strinigfy" of the JSON)
					//	So I turn it back from string to JSON.
					// Another problem: in iPhone, the string is also URI-encoded!
					//	(maybe because of the PhoneGap version?), so we need also to decode
					//	it...
					if (response.response)
					{
						if (DEVICE === deviceTypeEnum.iphone)
						{
							response.response = decodeURIComponent(response.response);
						}
						response = JSON.parse(response.response);
					}
					if (response.success) {
						that._imageUploadSuccess(photoUploadModel, response);
					}
					else {
						that._imageUploadFailed(photoUploadModel, response);
					}
				},
				function (error) 
				{
					that._imageUploadFailed(photoUploadModel, error);
				}, 
				options);
	},

	/**
	 * cancel uploading the image (after "fail" state)
	 */
	_onCancelUpload: function (photoUploadModel)
	{
		this.get('uploadingImagesCollection').remove(photoUploadModel);
	},
	
	/**
	 * after failed to uploading the image
	 */
	_imageUploadFailed: function (photoUploadModel)
	{
    	photoUploadModel.set({state: PhotoUploadModel.STATE.FAIL});
	},

	/**
	 * after success to uploading the image
	 */
	_imageUploadSuccess: function (photoUploadModel, response)
	{
		// Update the id from: response:
		// NOTE: we don't set it as "id" so we will know that this is not a "real" (= from service)
		//	photo yet...
		if (response && response.result && response.result.photo && response.result.photo.id)
		{
			photoUploadModel.set({
				id: Utils.Helpers.generateGUID(),
				upload_id: response.result.photo.id
			});
                  
            //update iphone native on upload success for more operations on uploaded image
            if (navigator.liveAlbum.uploadImageSucceeded)
            {
                photoUploadModel.set({instagramShare: AppSettingsManager.getSettings().get('instagramShare')});
                navigator.liveAlbum.uploadImageSucceeded(null, null, photoUploadModel.toJSON());
            }
		}
		
		photoUploadModel.set({state: PhotoUploadModel.STATE.SUCCESS});
		
		// add this model to the "normal" photos collection:
		this._addUploadingToCollection();
	},

	/**
	 * merge the relevant photos (=after success) from "uploading collection"
	 * to "normal collection", and/or delete photos from "uploading collection" that already
	 * exist in the "normal collection":
	 */
	_addUploadingToCollection: function ()
	{
		var uploadingImagesCollection = this.get('uploadingImagesCollection');
        var itemsCollection = this.get('items'); 
        uploadingImagesCollection.each(function (photoUploadModel)
		{ 
        	if (photoUploadModel.get('state') === PhotoUploadModel.STATE.SUCCESS)
			{
				//if already exists in the normal collection - delete from uploadingImagesCollection,
				// else: add it temporary to the normal collection (if we didn't already add it temporary)
        		var upload_id = photoUploadModel.get('upload_id');
        		var tempId = photoUploadModel.get('id');
				if (itemsCollection.get(upload_id))
				{
					uploadingImagesCollection.remove(photoUploadModel);
				}
				else if (!itemsCollection.get(tempId))
				{
					// Add it to the beginning of the collection, so we will render it at
					//	the top:
					itemsCollection.add(photoUploadModel, {at: 0});
					//itemsCollection.unshift(photoUploadModel);

					// for updating the scroll:
					itemsCollection.trigger('singleAdd');
				}
			}
		});
	},	
    /**
     * returns array of all the photos for the "photosGallery
     */
    getPhotosArrayForGallery : function()
    {
        var result = [];

        var photosCollection = this.get('items');
        if (photosCollection)
        {
            for ( var i = 0; i < photosCollection.models.length; i++)
            {
                var model = photosCollection.at(i);
                result[i] =
                {
                    title : model.get('title'),
                    photoTime : model.get('photoTime'),
                    largeImage : model.getLargestImage(),
					shareInfo : model.get("shareInfo")
                };
            }
        }

        return result;
    }

}); var PhotoUploadModel = PhotoModel.extend({
	defaults:
	{
		state: 0
	}
});

PhotoUploadModel.STATE = {
	UPLOADING: 0,
	FAIL: 1,
	SUCCESS: 2
}; /**
 * Collection of photos
 * @author Guy Talmor
 */
var PhotosCollection = ItemsCollection.extend({
	
    model: PhotoModel,
    
    initialize: function (models, photosParams) 
	{
		// "inherit" ("Super"):
		ItemsCollection.prototype.initialize.apply(this);
		
		if (photosParams.type)
	    {
		    switch (photosParams.type)
            {
                case 'picasa':
                case 'facebook':
                case 'flickr':
                case 'smugmug':
                    if (!photosParams.userName || !photosParams.params || !photosParams.params.albumName)
                    {
                        this.invalid = true;
                    }
                    break;
                    
                case 'tumblr':
                case 'twitpic':
                    if (!photosParams.userName)
                    {
                        this.invalid = true;
                    }
                    break;
                case 'livealbum':
                    if (!photosParams.userName || !photosParams.params.groupId)
                    {
                        this.invalid = true;
                    }
                    break;
                
                case 'mrss':
                    if (!photosParams.params || !photosParams.params.albumId)
                    {
                        this.invalid = true;
                    }
                    break;
            }
	    }
		else
	    {
		    this.invalid = true;
	    }
		
		this.params = {
                type: photosParams.type,
                userName: photosParams.userName,
                extraInfo: photosParams.params || {},
                take: photosParams.PHOTOS_TAKE_COUNT
            };
		
		// if live album add expiration of one minute.
		if (photosParams.uploadButton)
		{
			this.params.extraInfo.expiration = 1;
		}
		
		this.overrideDescription = photosParams.overrideDescription;	
	},
	
	parse: function (result)
    {
        var retVal = {};
        if (result && result.photos)
        {
            var albumDescr = result.description;
            
            // Workaround a service bug where empty string is translated to
            // null or empty object.
            if (this.overrideDescription === null ||
            		typeof(this.overrideDescription) === 'object')
        	{
            	this.overrideDescription = '';
        	}
            
			if (typeof(this.overrideDescription) === "string")
			{
				albumDescr = this.overrideDescription;
			}
			// Array of the the new Model-s (that we are going to create...):
            var models = [];
            for (var i = 0; i < result.photos.length; i++)
            {
				result.photos[i].albumDescription = albumDescr; 
				if (typeof(this.overrideDescription) === "string")
				{
					result.photos[i].title = this.overrideDescription;
				}
				models[i] = new PhotoModel(result.photos[i]);
            }

            retVal.models = models;

            var albumModel = new Backbone.Model({
                count: result.totalPhotos, 
                albumName: _.isString(result.albumDisplayName) ? result.albumDisplayName :  result.albumName,
				albumDescr: albumDescr,
				albumImage: result.coverPhotoUrl || "" 
            });
            
            retVal.metaData = {album: albumModel};
        }
        
        return retVal;
    },
    
    getServiceName: function ()
    {
        return 'CMS_PHOTOS_GET';
    },
    
    getParams: function ()
    {
        return this.params;
    },

    isEOF: function (result, parseResult)
    {
        if (result.totalPhotos == this.length)
            return true;
        else //call "super":
            return ItemsCollection.prototype.isEOF.apply(this, [ result, parseResult ]);
    }
    
}); /**
 * The Photos template.
 */
var PhotosTemplateView = TemplateView.extend({

	DEFAULT_LAYOUT : 8,

	LIVE_ALBUM_TYPE: '26ae8ccc-5464-7979-4fdf-3a13f166ffff',

	initialize : function()
	{
		TemplateView.prototype.initialize.apply(this);

		var templateMetaData = this.model.get('meta');

		//TODO: delete this!
		// e.g.: it is OK that the CP want for specific app
		//	not to use the "usePreviews" or (in the future) use grid layout.
		if (this.model.get('type') == this.LIVE_ALBUM_TYPE)
		{
			templateMetaData.pageLayout = 2;
			templateMetaData.usePreviews = true;
		}

		this._galleryManager = new PhotoGalleryManager();

		this._photosModels = [];

		// TODO: need this here? maybe only a var...
		// "previews" views, relevant only for "use previews" (not
		// "tabs")
		this.coverViews = [];

		// TEST!!
		// templateMetaData.pageLayout = 10;
		// templateMetaData.usePreviews = true;

		// Supported layouts 0-10. Default is 8.
		if ((typeof (templateMetaData.pageLayout) !== "number")
				|| templateMetaData.pageLayout < 0
				|| templateMetaData.pageLayout > 10)
		{
			templateMetaData.pageLayout = this.DEFAULT_LAYOUT;
		}

		if (LAYOUT === layoutFormat.wide
				&& (templateMetaData.pageLayout === 2
						|| templateMetaData.pageLayout === 4
						|| templateMetaData.pageLayout === 5
						|| templateMetaData.pageLayout === 6 || templateMetaData.pageLayout === 7))
		{
			// layouts 2,4,5,6,7 are looking bad in iPad, so we use
			// different layout:
			templateMetaData.pageLayout = this.DEFAULT_LAYOUT;
		}

	},

    /**
     * OVERRIDE - we have "previews album layout"
     */
    _shouldRenderTemplate : function()
    {
        var meta = this.model.get('meta');

		// check if we need to show albums previews page (=instead of normal tabs)
        return (meta.usePreviews || meta.pageLayout === 9);
    },

    /**
     * OVERRIDE - in Wide we want both: render level 0 + select default tab:
     */
    _shouldSelectDefaultTab : function()
    {
        // check if we want to select the 1st album by default:
        return (LAYOUT === layoutFormat.wide) || !this._shouldRenderTemplate();
    },

    /**
     * OVERRIDE - render level 0
     */
    _renderTemplate: function (navRequest)
    {
        var templateMetaData = this.model.get('meta');
		var id = Utils.Helpers.generateGUID();
		// "previews" page
		var previewsListView = new PreviewsListView({
			id: id
		});
		previewsListView.render();
		var tabs = templateMetaData.items;
        if (!tabs || !tabs.length) {
            var noDataView = this._renderNoData(navRequest);
            this.homePageId = noDataView && noDataView.id;
            return;
        }
		$.each(tabs, function(i)
		{
			this.createPhotosModel(i);
            this._photosModels[i].getItems({ executeType: executeTypeEnum.FORCE_NETWORK /*TODO: maybe normal? instead of force network?*/});
			this.coverViews[i] = new AlbumPreviewView({
				model : this._photosModels[i],
				albumIndex : i
			});
		}.hitch(this));
		previewsListView.addTabs(this.coverViews);

		if (LAYOUT === layoutFormat.wide)
		{
            id = Utils.Helpers.generateGUID();
            this.dividedScreenView = new DividedScreenView({
				id: id
			});
			this.dividedScreenView.setView1(previewsListView);
			this.$el.append(this.dividedScreenView.render()
					.addRefreshButton(true).el);
		} // end of "iPad"
		else
		{
			this.$el.append(previewsListView.el);
		} // end of "not iPad"

        this.homePageId = id;
	},

    /**
     * override...
     */
    _noDefaultTab : function(navRequest)
    {
        UN.onPageReady(this.homePageId, navRequest, 0);
    },

    /**
     * OVERRIDE - render level 1 - tab:
     */
    _renderTab : function(index, navRequest)	{
		var templateMetaData = this.model.get('meta');

		this.createPhotosModel(index);

		var model = this._photosModels[index];
        var view = this.createPhotosView(model, index);

        // handle the selected color:
        this.onAlbumSelected(model);

        var addTabs = !this._shouldRenderTemplate();
        var useGenericNoItems = false; // we want the header with album name, "0 photos", "upload image" (in LA)
        this.renderListPage({
            navRequest: navRequest,
            model: model,
            view: view,
            addTabs: addTabs,
            dividedScreenView: this.dividedScreenView,
            useGenericNoItems: useGenericNoItems});
	},

	/**
	 *
	 * @param {ItemModel Object} itemModel
	 */
	onAlbumSelected: function (itemModel)
	{
		// Is the selected item is the "prev-selected"
		var isReselect = !!(this._selectedItem && this._selectedItem.cid === itemModel.cid);

		if (this._selectedItem && !isReselect)
		{
			// de-select the prev item:
			this._selectedItem.set({selected: false});
		}

		if (!isReselect)
		{
			// save "pointer" to the current itemModel:
			this._selectedItem = itemModel;
			// select the new item:
			this._selectedItem.set({selected: true});
		}
	},

	/**
	 * Create and init the "PhotosModel" (= album model), and put it on
	 * the member array "_photosModels" (in _photosModels[index])
	 *
	 * @param {Integer}
	 *            index - the index of the tab (= album)
	 *
	 * @author Matanya
	 */
	createPhotosModel : function(index)
	{
		if (!this._photosModels[index])
        {
            var templateMetaData = this.model.get('meta');

            // create the model of the photos.
            var tabParams = templateMetaData.items[index];

            // we need this "null check": support page without tabs:
            if (tabParams)
            {
                tabParams.layoutId = templateMetaData.pageLayout;
                tabParams.layoutParams = templateMetaData.layoutParams;
                tabParams.uploadButton = this.model.get('type') == this.LIVE_ALBUM_TYPE;
            }
            this._photosModels[index] = new PhotosModel(tabParams);

            this._photosModels[index].set({
                layoutId : templateMetaData.pageLayout,
                albumIndex : index
            });
        }
	},

	/**
	 * Create and return the "PhotosView" (= images list + header)
	 *
	 * @param {PhotosModel} model - the model for the view
	 * @param {int} index - the index of this photos view.
	 * @author Matanya
	 */
	createPhotosView : function(model, tabIndex)
	{
        var photosView = new PhotosView({
            model : model
        });

        photosView.bind('onPhotoSelected', this._onPhotoSelected, this);//REMOVE THIS WHEN WE WILL USE "navTo"...
        photosView.bind('onUploadButtonClick', function()
        {
            this._onUploadButtonClick(tabIndex);
        }, this);

		return photosView;
	},

	_onUploadButtonClick : function(tabIndex)
	{
		// we don't support upload photo in simulator.
		if (PLATFORM === platformEnum.simulator)
		{
			var btns = [ {
				text : 'Close'
			} ];

			var errorMessage = "Camera is not supported in simulator mode";

			// Show message box to the user
			uiDriver.showDialogBox(null, null, {
				title : 'Error',
				message : errorMessage,
				buttons : btns
			});
			return;
		}

		// create the "take photo/ choose photo" dialog:
		var buttons = [ {
			title : _T('DialogButtonLiveAlbumChoosePhotoTake'),
			returnValue : 'CAMERA'
		}, {
			title : _T('DialogButtonLiveAlbumChoosePhotoChoose'),
			returnValue : 'PHOTOLIBRARY'
		} ];

		// Create the options for the dialog:
		var options = {
		// dialogTitle: _T('DialogCaptionLiveAlbumChoosePhoto'),
		// cancelTitle: _T('DialogButtonLiveAlbumChoosePhotoCancel'),
		// dialogWidth: 260
		};

		ChooseDialog.execute(buttons, function(pictureSourceType)
		{
			this._takePhoto(pictureSourceType, tabIndex);
		}.hitch(this), null, options);
	},

	/**
	 * @param {String}
	 *            pictureSourceType - the wanted source type, e.g.:
	 *            'PHOTOLIBRARY' , 'CAMERA'
	 * @author Matanya
	 */
	_takePhoto : function(pictureSourceType, tabIndex)
	{
		var that = this;

     	/******************   TEST START  *******************
		if (pictureSourceType === 'CAMERA')
		{
			var imageURI = "http://www.evworld.com/press/cars2_chase.jpg";
		}
		else
		{
			var imageURI = "http://www.pixartalk.com/wp-content/uploads/2010/11/wallewave.jpg";
		}
   		this._cbCaptureImageSuccess(imageURI, tabIndex);
		return;
		/***************** TEST END **********************/

		// Camera options
		var pictureSourceTypes = {
			'CAMERA' : navigator.camera.PictureSourceType.CAMERA,
			'PHOTOLIBRARY' : navigator.camera.PictureSourceType.PHOTOLIBRARY
		}

		var options = {
			quality: 80 // default quality
			,destinationType : navigator.camera.DestinationType.FILE_URI
			,sourceType : pictureSourceTypes[pictureSourceType]
			,targetWidth: 1024
			,targetHeight: 1024
		};

		// get AMS options
		var templateMetaData = this.model.get('meta');

		var tabParams = templateMetaData.items[tabIndex];

		// merge the options from the AMS with the default ones.
		if (tabParams.options)
		{
			_.extend(options, tabParams.options);
		}

        var templateMetaData = this.model.get('meta');
        var album = templateMetaData.items[tabIndex];

        album.filters = album.filters || {};

        var filters = album.filters["device_" + DEVICE];

        that.translateFiltersNames(filters);

		options.extraOptions = {
				isShowPhotoDialog: true
				,dialogCaption: _T('DialogCaptionLiveAlbumPostPhoto')
				,cancelTitle: _T('DialogButtonLiveAlbumPostPhotoCancel')
				,okTitle: _T('DialogButtonLiveAlbumPostPhotoOk')
				,inputPlaceholder: _T('HtmlTextLiveAlbumAddComment')
	            ,filters: filters
	            ,watermark: album.watermark
	            ,augmentedReality: album.augmentedReality
                ,activityUploading: _T('UploadStatusLiveAlbumImageUploading')
                ,activitySent: _T('UploadStatusLiveAlbumImageSent')
                ,activityFailed: _T('UploadStatusLiveAlbumProcessFailed')
                ,overlay: album.overlay
		};

		var getPictureSuccess = function(imageUri)
		{
			options.imageURI = imageUri;
			that._cbCaptureImageSuccess(tabIndex, options);
		};

		var getPictureFail = function()
		{
			// user cancel do nothing.
		};

        if (((DEVICE === deviceTypeEnum.iphone) && (PLATFORM === platformEnum.nativeApp)) ||
        		// if the source type is camera and there is an overlay, we use our own plugin.
            (((options.sourceType == pictureSourceTypes.CAMERA) && options.extraOptions.augmentedReality) &&
                ((DEVICE === deviceTypeEnum.android) && (PLATFORM === platformEnum.nativeApp) && (OS_VERSION >= 11)))) {
            navigator.liveAlbum.takePicture(getPictureSuccess, getPictureFail, options);
        }
        else {
            navigator.camera.getPicture(getPictureSuccess, getPictureFail, options);
        }
	},

	translateFiltersNames: function (filters)
	{
		if (filters) {
			for (var i = filters.length - 1; i >= 0; i--) {
				filters[i].name = Utils.String.translateIfNeed(filters[i].name);
			};
		}
	},

	_cbCaptureImageSuccess : function(tabIndex, options)
	{
		var that = this;

		/**
		 * User pressed cancel button.
		 */
		var cbUploadImageDlgCancel = function()
		{
			// user cancel do nothing.
		};

        var cbUploadImageDlgSuccess = function (data) {

            that._cbUploadImageDlgOk(data.imageURI, data.textMessage, tabIndex);
        }

        navigator.liveAlbum.uploadImageDialog(cbUploadImageDlgSuccess, cbUploadImageDlgCancel, options);

        /*
		UploadImageDialog.execute(
				function (textMessage) {
					that._cbUploadImageDlgOk(imageURI, textMessage, tabIndex);
				},
				cbUploadImageDlgCancel,
				options);
         */
	},

	/**
	 * User selected to post the image.
	 */
	_cbUploadImageDlgOk: function (imageURI, textMessage, tabIndex)
	{
		this._photosModels[tabIndex].uploadImage(imageURI, textMessage);

	},

//REMOVE THIS WHEN WE WILL USE "navTo"...
	_onPhotoSelected : function(albumIndex, photoIndex)
	{
		var photoArray = this._photosModels[albumIndex]
				.getPhotosArrayForGallery();

		this._galleryManager.pressedImage(photoArray, photoIndex);
	}

//ADD THIS WHEN WE WILL USE "navTo"...
//     /**
//     * OVERRIDE.
//     */
//    getDetailsView: function (model, data)
//    {
//
////        // 1 level back (e.g.: if we are in "news/nba/art1" -> go to "news/nba")
////        //TODO: make function without the "+1...", because the -2 is strange...
////        var url = UN.getCurrentUrl(-2); // = 1 step back
////        // TODO: maybe in bad permalink, we want to remove me from the history, so we can't go back to this page?
////        UN.navTo(url, {level:0, isInner: false});
//
////        UN.setPageForUrl(data.pageView.id, data.navRequest, 1);
////        history.back();
//
//        // the collection model
//        var listModel = data.model;
//        var items = listModel.get('items');
//        var photoIndex = items.indexOf(model);
//
//        var photoArray = listModel.getPhotosArrayForGallery();
//
//		this._galleryManager.pressedImage(photoArray, photoIndex);
//
//        return null;
//    }

});
 /**
 * View that shows the "album-cover"
 *
 * @author Matanya
 */
var AlbumPreviewView = BaseItemsView.extend({

	tagName: 'li',

	className: "album_cover",
	
	initialize: function()
	{
//		ItemsView.prototype.initialize.apply(this);
		BaseItemsView.prototype.initialize.apply(this);

        // bind on change:selected for highlight it on iPad: 
        this.model.bind('change:selected', this.onSelectedChange, this);
		
		$(window).bind("throttledresize", this.onResize.hitch(this));
		//		var itemsCollection = this.model.get('items');
		//		if (itemsCollection) 
		//		{
		//			// we want to update the margin also for the new items:
		//			itemsCollection.bind('getItemsSuccess', this.onResize, this);
		//		}
		
		this.$el.tap(function(e)
		{

			e.preventDefault();
			UN.navTo(this.model.get('alias'), {level:1, isInner: (LAYOUT === layoutFormat.narrow)});
		}.hitch(this));
	},
	
	/**
	 * OVERRIDE:
	 * Handle the items get success - (re?) render the view:
	 */
	_onGetItemsSuccess: function()
	{
		this.render();
		
		//		var albumDescr = this.model.get('album').get('albumDescr');
		//		if (albumDescr) 
		//		{
		//			this.$descr.html(albumDescr).show();
		//		}
		//		else 
		//		{
		//			this.$descr.hide();
		//		}
		
		// call "super":
		BaseItemsView.prototype._onGetItemsSuccess.apply(this);
	},

	/**
	 * This function will update the DOM element with the 
	 * 	current photos-count in the manager
	 * 
	 * @author Matanya
	 */
	_updatePhotosCount:function()
	{
	/* NOTE: we can't use this, because maybe in the album there are many photos
	that we didn't load: 
		var itemsCollection = this.model.get('items');
		var imagesCount = itemsCollection.length;
		*/
		var album = this.model.get('album');
		var imagesCount = album && album.get('count');
		this.$el.find('.photos_count').html(imagesCount || '0');
	},

    onSelectedChange: function ()
    {
		if (LAYOUT === layoutFormat.wide)
		{
			if (this.model.get('selected')) 
			{
				this.$('.album_item').addClass('selected');
			}
			else 
			{
				this.$('.album_item').removeClass('selected');
			}
		}
    },
	
	/**
	 * OVERRIDE:
	 * create the "empty" skeleton of the view, and init the vars
	 * (NOTE: we will fill the data in "_renderItems")
	 */
	_reset: function()
	{
		// create the "skeleton":
        var albumParams =
		{
		    'photosStaticText': _T('HtmlTextLiveAlbumPhotos'),
			'albumIndex': this.options.albumIndex,
            'selected': this.model.get('selected')
		};


		this.$el.html(photosTemplates.album_preview_tpl(albumParams));
		
		//		// init vars:
		//		this.$prevArrow = this.$el.find('.prev.button_arrow');
		//		this.$nextArrow = this.$el.find('.next.button_arrow');
		//		this.$image = this.$el.find('.image');
		//		this.$circles = this.$el.find('.circles_container');
		//		this.$descr = this.$el.find('.album_description');
		//		this.imageIndex = 0;
		//		
		//		// update items look (probably will hide arrows, etc.):
		//		this.renderElements();
		
		
		//HERE?
		this._initAlbumProperties();
		
		//Add "loading" indicator
        var params =
		{
			'staticText': '<div class="loading_album_icon mask_sprite sprite-ajax-loader_small spin clr_appGeneral_loadingSmallIcn"></div>' + 
			'<div class="loading_album_text">' + _T('HtmlTextLiveAlbumLoadingAlbum') + '</div>'
		};
		
		var loadingIndicatorHtml = photosTemplates.preview_no_images_tpl(params);
		this.$el.find('.preview_images.active').html(loadingIndicatorHtml);
		
	},
	
	/**
	 * This function will update width/height of all the images
	 * 	(e.g.: in orientation change or after every change in the items)
	 * 	NOTE: We will update only the 1st image - all the others will
	 * 	stay the same!
	 * @author Matanya
	 */
	updateImagesSizes:function()
	{
		var itemsCollection = this.model.get('items');
		var imagesCount = itemsCollection.length;
		if (imagesCount > 0) 
		{
			// The first (newest) image
			var $image = this.$el.find('.preview_images.active .preview_image:first-child');

			// Calculate the width and height of the photo (in pixels)
			var sizes = this._getImageSizes(0);
			
			// update the sizes
			$image.css('width', sizes.width + 'px')
				  .css('height', sizes.height + 'px')
				  .css('margin-top', sizes.marginTop + 'px');
			if (IS_RTL)
			{
				$image.css('margin-right', sizes.marginLeft + 'px');
			}
			else
			{
				$image.css('margin-left', sizes.marginLeft + 'px');
			}
			
		}
	},
	
	/**
	 * This function will return the wanted {width,height,margin} of a image
	 * 	(e.g.: in orientation change or after every change in the items)
	 * 
	 * @param {integer} imageIndex, the index of the photo, where 0 is newest.
	 * @return{Dictionaty} sizes, the wanted sizes object, includes: 
	 * 		{integer} width, the width, in pixels. 
	 * 		{integer} height, the height, in pixels. 
	 * 		{integer} margin, the margin, in pixels. 
	 * @author Matanya
	 */
	_getImageSizes:function(imageIndex)
	{
		var sizes = 
		{
			height: 40,
			width: 40,
			marginTop: 4, 			
			marginLeft: 4 			
		}
		if (imageIndex === 0) 
		{
			var itemsCollection = this.model.get('items');
			var imagesCount = itemsCollection.length;
			
			// The container of all the images:
			var $container = this.$el.find('.preview_images.active');
			
			// TODO: Is this true? maybe it is an old code:
			// In case that we in inner page, the container.width() is wrong, so we use the "max"...
			var containerWidth = Math.max($container.width(), 40);
			
			//The last photo is bigger than the others:
			sizes.height = sizes.height * 2 + sizes.marginTop;
			if (imagesCount === 1) 
			{
				sizes.width = containerWidth;
			}
			else 
				if (imagesCount < 4) 
				{
					sizes.width = containerWidth - sizes.marginLeft - sizes.width;
				}
				else 
					if (imagesCount < 6) 
					{
						sizes.width = containerWidth - sizes.marginLeft * 2 - sizes.width * 2;
					}
					else 
					{
						sizes.width = containerWidth - sizes.marginLeft * 3 - sizes.width * 3;
					}
			
			// first image don't need margin top or left:
			sizes.marginLeft = 0;
			sizes.marginTop = 0;
		}
		else //"top" images don't need margin top:
			if (( imagesCount < 4 && imageIndex < 2 ) || 
			    ( imagesCount < 6 && imageIndex < 3 ) ||
				( imageIndex < 4 ) 
				) 
			{
				sizes.marginTop = 0;
			}
			
		return sizes;
	},
	
	/**
	 * OVERRIDE:
	 * now we have items, so we can start the "show".
	 */
	_renderItems: function()
	{
		// Check if we got CMS response:
		if (!this.model.get('album'))
		{
			return;
		}
		
		//TODO: here?
		this._updatePhotosCount();
		
		//this.renderElements();
		
		//TODO: save the "min-position", and we don't need to update nothing
		//	if in the items we have only old items, and we have 7 items
		
		// We want to display only the last 7 images:
		var itemsCollection = this.model.get('items');		
		items = itemsCollection.models.slice(-7);
		
		// Update the element with the new photos-items
		var images = $.map(items,function(item,idx)
		{
			// Calculate the width and height of the photo (in pixels)
			var sizes = this._getImageSizes(items.length - 1 - idx);
			
			// We need to choose whice image-size we want:
			//		= the smallest that is bigger than the size of
			//		the "div".
			//      (but if "isSmallImages" - always the smallest...)
			 
//			// start on smallest image:
//			var imageSizeIndex = item.images.length - 1;
//			if (!this.manager().isSmallImages()) 
//			{
//				while ((imageSizeIndex > 0) &&
//				((item.images[imageSizeIndex].height < sizes.height) ||
//				(item.images[imageSizeIndex].width < sizes.width))) 
//				{
//					imageSizeIndex--;
//				}
//			}
			
			if (IS_RTL)
			{
				sizes.marginRight = sizes.marginLeft; 
				sizes.marginLeft = 0; 
			}
			else
			{
				sizes.marginRight = 0; 
			}
			
//			var imgSrc = item.images[imageSizeIndex].source;
//			var imgSrc = item.getSmallestImage();
			var imgSrc = item.getMediumImage();
			
			// we want "lazy load" only on "new" urls.
			//	we don't want it for "old" urls - even for "fail" ones!
//			var lazyLoad = !LazyLoader.Dictionary[imgSrc];
			var lazyLoad = false;

	        var imageParams =
			{
			    'width': sizes.width,
			    'height': sizes.height,
			    'marginTop': sizes.marginTop,
			    'marginLeft': sizes.marginLeft,
			    'marginRight': sizes.marginRight,
			    'imgSrc': imgSrc,
				'lazyLoad': lazyLoad,
//			    'id': item.id
			    'id': item.get('id')
			};

			var $image = $(photosTemplates.preview_image_tpl(imageParams))  
//			if (lazyLoad) 
//			{
//				LazyLoader.itemsQueue.push($image)
//			}
			
			return $image; 			
		}.hitch(this));
		
		var oldPreviewElement = this.$el.find('.preview_images.active');	
		var newPreviewElement = this.$el.find('.preview_images.inactive');
		
		if (images.length > 0) 
		{
			newPreviewElement.html('');
			$.each(images, function(idx, item)
			{
				newPreviewElement.prepend(item);
			});
			//this.$el.trigger('updated');
		}
		else
		{
	        var params =
			{
			    'staticText': _T('HtmlTextPhotosNoImages')
			};
			
			var noImagesHtml = photosTemplates.preview_no_images_tpl(params);
			
			newPreviewElement.html(noImagesHtml);
		}
		
		// Switch between the old and new preview-images
		// (NOTE: Because we used 2 divs, we can do it with animation, etc.)
		newPreviewElement.removeClass('inactive').addClass('active');
		oldPreviewElement.removeClass('active').addClass('inactive');
		
	},

	/**
	 * This function will add to the DOM element the album data.
	 * (only the static data, like name, cover, etc. without
	 * the "dynamic" data = the images, images count etc.)
	 * 
	 * @author Matanya
	 */
	_initAlbumProperties:function()
	{
		var albumParams =
		{
		    'coverUrl': '',
		    'name': this.model.get('title') || '',
		    'descr': this.model.get('description') || ''
		};		
		var albumHtml = photosTemplates.album_properties_preview_tpl(albumParams);
		this.$el.find('.album_item').prepend(albumHtml);
	},
	
	onResize: function()
	{
		if (this.isPageShow) 
		{
			this.updateImagesSizes();
		}
	},
	
	onPageShow: function()
	{
		this.isPageShow = true;
		this.updateImagesSizes();
	},
	
	onPageHide: function()
	{
		this.isPageShow = false;
	},
	
	/**
	 * OVERRIDE:
	 * We don't want "show more" so we override this func:
	 * (BTW, we don't need to do this, because we anyway didn't implement "getRootView"...)
	 */
	_renderShowMoreButton: function()
	{
	}
}); /**
 * View that shows the list of "album-cover"s
 *
 * @author Matanya
 */
var PreviewsListView = Backbone.View.extend(
{
	// the "previews" views
	coverViews: [],

	// The selected item model:
	//_selectedItem: null,

	initialize: function ()
    {
        // this is a page that we want to navigate to.
	    this.$el.attr(
		{
	    	'data-role': 'page',
	        'data-buttons': 'refresh'
		});
//        this.model.bind('itemSelected', this._onAlbumSelected, this);

		this.$el.bind('pageshow', this.onPageShow.hitch(this));
		this.$el.bind('pagehide', this.onPageHide.hitch(this));
		// we need this for divided screen
		this.bind('pageshow', this.onPageShow.hitch(this));
		this.bind('pagehide', this.onPageHide.hitch(this));

		this.$el.bind('refresh', this.handleRefreshClick.hitch(this));
		this.$el.bind('silentRefresh', this.handleSilentRefresh.hitch(this));
    },

	render: function($previewsList)
	{
		this.$el.html('<div class="scroll_wrapper"><div class="scroller"></div></div>');
		
		var $scroller = this.$el.find('.scroller');
		
		this.$scrollWrapper = this.$el.find('.scroll_wrapper');
		
		var template = photosTemplates.previews_list_tpl;
		
		$scroller.html(template($previewsList));
		
		this.$listContainer = $scroller.find('.previews_list');
		//this.$listContainer.html($previewsList);
//		var previews = this.model.get('meta').items;
//		
//		var that = this;
//		// Create a list of all the previews
//		_.each(previews, function(preview, index)
//		{
//			that._renderOnePreview($listContainer, preview);
//		});
		
		Scrolling.init(this.$scrollWrapper);
		
		return this;
	},

	onPageShow: function()
	{
		$.each(this.coverViews, function(i)
		{
			//TODO: need this TO here?
			// TODO: change it!
			// We need this TO, because the photosListView (grid or fade-show)
			// want to calculate positions according to some sizes 
			// (e.g.: offset, width) but without the TO, sometimes some 
			// elements are not shown yet, and we get offset=0 or width=0.
			setTimeout(function(){
				this.coverViews[i].onPageShow.hitch(this.coverViews[i])();
			}.hitch(this), 10);
		}.hitch(this));
	},

	onPageHide: function()
	{
		$.each(this.coverViews, function(i)
		{
			this.coverViews[i].onPageHide.hitch(this.coverViews[i])();
		}.hitch(this));
	},

	handleRefreshClick: function()
	{
		$.each(this.coverViews, function(i)
		{
			this.coverViews[i].handleRefreshClick();
		}.hitch(this));
	},

	handleSilentRefresh: function()
	{
		$.each(this.coverViews, function(i)
		{
			this.coverViews[i].handleSilentRefresh();
		}.hitch(this));
	},
	
	addTabs: function(coverViews)
	{
		this.coverViews = coverViews;
		$.each(coverViews, function(i)
		{
			this.$listContainer.append(this.coverViews[i].render().el);
			
			this.coverViews[i].onPageShow();

			//this.coverViews[i].bind('albumClicked', this.onItemClicked.hitch(this));
		}.hitch(this));
		Scrolling.init(this.$scrollWrapper);
	}	
});
 /* Relevant for layouts 0,1,2,3,4,8,9*/
var ThumbnailView = Backbone.View.extend(
{
	tagName: 'li',
	
	/* The width (and height) of a thumbnail in "narrow format" (in pixels) */
	IMAGE_WIDTH_NARROW: 73,
	
	/* The width (and height) of a thumbnail in "wide format" (in pixels) */
	IMAGE_WIDTH_WIDE: 150,
	
	// This defines the events binded to the blog post summery element (jQuery Mobile)
    events:
	{
	    'tap': 'itemClicked'
	},
	
	initialize: function ()
    {
	    this.$el.attr('data-role', 'button');
    },
	
	render: function ()
	{
	    var params = { title: this.model.get('title') };
	    if (this.options.layoutId === 2) 
		{
			this.$el.addClass('clr_contTypeA_bg clr_contTypeA_brdr');
			
			var time = this.model.get('photoTime');
			params.timeText = Utils.TimeDate.timeAsText(time);
			params.imageSrc = this.model.getLargestImage();
			params.userImage = "";
			params.byUser = "";
			var from = this.model.get('from');
			if (from)
			{
				if (from.imageUrl)
				{
					params.userImage = from.imageUrl;
				}
				
				if (from.name)
				{
					params.byUser = _T("HtmlTextLiveAlbumByUploader", {name: from.name});
				}
			}
		}
		else 
			if (this.options.layoutId === 0 ||
			this.options.layoutId === 1 ||
			this.options.layoutId === 3 ||
			this.options.layoutId === 8 ||
			this.options.layoutId === 9) 
			{
				// only thumbnails (layout 2 is blog).
				this.$el.addClass('thumbnail-view');
				
				// Add "imageWidth","imageSrc" param:		
				if (LAYOUT === layoutFormat.wide) 
				{
					params.imageWidth = this.IMAGE_WIDTH_WIDE;
					params.imageSrc = this.model.getMediumImage(true);
				}
				else 
				{
					params.imageWidth = this.IMAGE_WIDTH_NARROW;
					params.imageSrc = this.model.getMediumImage(true);
				}
				
			}
			else 
				if (this.options.layoutId === 4) 
				{
					this.$el.addClass('photo_vertical_item');
					params.imageSrc = this.model.getLargestImage();
					if (this.options.layoutParams && this.options.layoutParams.descriptionPosition) 
					{
						params.position = this.options.layoutParams.descriptionPosition;
					}
					else
					{
						params.position = "bottom"
					}
				}

		

	    this.$el.html(photosTemplates.thumbnail[this.options.layoutId](params));

	    if (this.options.layoutId === 4 || this.options.layoutId === 3) 
		{
			// Update the scroller after loading the images.
			// Also, delete the image in error
			this.$el.find('IMG').load(function()
			{
				var $scrollWrapper = Scrolling.getMyScrollerWrapper(this.$el);
				// Call refresh scroll callback
				Scrolling.onContentChanged($scrollWrapper);
			}.hitch(this)).error(function()
			{
				$(this).remove();
			});
		}
	    
	    return this;
	},
	
	itemClicked: function (e)
	{
		e.preventDefault();
		if (this.options.layoutId !== 4) 
		{
			// in layout 4 we don't want the "gallery". ask Tali why.
            //REMOVE THIS WHEN WE WILL USE "navTo"...
			this.model.trigger('itemClicked', this.model);
//            UN.navTo(this.model.get('alias'), {level:2, isInner: false}); // the "isInner" is not so relevant - we open photoswipe, not moving to a new page
		}
    }

}); /* Thumbnail in column grid (layout 10) */
var ThumbnailColumnView = Backbone.View.extend(
{
	tagName: 'li',
	
//	className: 'clr_images_image2_brdr sliced_image column-thumbnail-view',
	className: 't3d sliced_image column-thumbnail-view animation',
	
	// This defines the events binded to the blog post summery element (jQuery Mobile)
    events:
	{
	    'tap': 'itemClicked'
	},
	
	render: function ()
	{
		this.$el.css(
		{
			"background-image": "url(" +  this.model.getMediumImage(true) + ")"
		});
	    return this;
	},
	
	itemClicked: function (e)
	{
		e.preventDefault();
        //REMOVE THIS WHEN WE WILL USE "navTo"...
		this.model.trigger('itemClicked', this.model);
//        UN.navTo(this.model.get('alias'), {level:2, isInner: false}); // the "isInner" is not so relevant - we open photoswipe, not moving to a new page
    }

}); var PhotosView = Backbone.View.extend(
{
	initialize: function ()
    {
        // this is a page that we want to navigate to.
	    this.$el.attr(
		{
	    	'data-role': 'page',
	        'data-buttons': 'refresh'
		});

        this.model.unbind('change:album');
        this.model.unbind('itemSelected');

        this.model.bind('change:album', this._renderHeader, this);
        this.model.bind('itemSelected', this._onPhotoSelected, this);//REMOVE THIS WHEN WE WILL USE "navTo"...

        this.$el.bind('refresh', this.handleRefreshClick.hitch(this));
        this.$el.bind('silentRefresh', this.handleSilentRefresh.hitch(this));

        var layout = parseInt(this.model.get('layoutId'));

        if (false && layout === 5)
        {
            // no scroll in this layout:
            this.$scroller = this.$el;
        }
        else
        {
            // wrap this page with scorller wrapper.
            this.$el.html(photosTemplates.photosListMarkup());
            this.$scroller = this.$('.scroller');
            Scrolling.init(this.$('.scroll_wrapper'));
        }
    },

    handleRefreshClick: function ()
    {
        if (this.photosListView)
        {
            this.photosListView.handleRefreshClick();
        }
    },

    handleSilentRefresh: function ()
    {
        if (this.photosListView)
        {
            this.photosListView.handleSilentRefresh();
        }
    },

    render: function ()
    {
		var layout = parseInt(this.model.get('layoutId'));

        // create the header.
        this.$headerContainer = $('<div></div>').appendTo(this.$scroller);

        // render the photos list
		var photosListParams = {
				model: this.model,
				id: 'photos_view_' + Utils.Helpers.generateGUID()// I think that we don't need this...
			};
		this.$el.addClass('layout-' + layout);
		if (layout === 0 || layout === 1 || layout === 2 || layout === 3 || layout === 4 || layout === 8 || layout === 9)
		{
			if (layout === 8 || layout === 9)
			{
				this.$el.addClass('change_size');
			}
			this.photosListView = new PhotosListView(photosListParams);
		}
		else if (layout === 5)
		{
			this.photosListView = new PhotosShowView(photosListParams);
		}
		else if (layout === 6)
		{
			this.photosListView = new PhotosSlideView(photosListParams);
		}
		else if (layout === 7)
		{
			this.photosListView = new PhotosArrowsView(photosListParams);
		}
		else if (layout === 10)
		{
			this.photosListView = new PhotosColumnsView(photosListParams);
		}
        this.$scroller.append(this.photosListView.render().el);

        // in some layouts we have size-calculations in js,
		// (e.g.: grid thumbnails margin, slideshow height, etc..)
		// so, we need to recalc it on "onResize" and, in addition every page show:
		if (layout === 0 || layout === 1 || layout === 3 || layout === 5 || layout === 8 || layout === 9 || layout === 10)
		{
            this.$el.bind("pageshow", this._onPageShow.hitch(this));
            this.$el.bind("pagehide", this._onPageHide.hitch(this));

			//in case of divided screen:
            this.bind("pageshow", this._onPageShow.hitch(this));
            this.bind("pagehide", this._onPageHide.hitch(this));

			// now - the page is not shown yet, so we start with
			// onPageHide (not with onPageShow):
            this.photosListView.onPageHide.hitch(this.photosListView)();

        }

		if (layout === 6 || layout === 7)
		{
			this.$el.addClass('clr_contTypeB_fullPage_bg');
		}

		this._renderHeader();

        return this;
    },

    _onPageShow: function ()
    {
		// TODO: change it!
		// We need this TO, because the photosListView (grid or fade-show)
		// want to calculate positions according to some sizes
		// (e.g.: offset, width) but without the TO, sometimes some
		// elements are not shown yet, and we get offset=0 or width=0.
		setTimeout(function(){
			this.photosListView.onPageShow.hitch(this.photosListView)();
		}.hitch(this), 10);
    },

    _onPageHide: function ()
    {
		this.photosListView.onPageHide.hitch(this.photosListView)();
    },

//REMOVE THIS WHEN WE WILL USE "navTo"...
    _onPhotoSelected: function (photoModel, isReselect)
    {
        var items = this.model.get('items');
        var photoIndex = items.indexOf(photoModel);
    	this.trigger('onPhotoSelected', this.model.get('albumIndex'), photoIndex);
    },

    _onUploadButtonClick: function ()
    {
        this.trigger('onUploadButtonClick');
    },

    _renderHeader: function ()
    {
        // render the header.
        if (this.model.get('hideHeader'))
        {
            return;
        }

		var photosAlbumHeaderView = null;
		var album = this.model.get('album');
		if (this.model.get('logoImgUrl'))
		{
			// "override image" for the header:
			photosAlbumHeaderView = new LogoHeaderView(
			{
				model: this.model
			});
		}
		else if (album)
		{
			album.set({uploadButton: this.model.get('uploadButton')});
			photosAlbumHeaderView = new PhotosAlbumHeaderView(
			{
				model: album,
				id: 'photos_album_header_view_' + Utils.Helpers.generateGUID()
			});
			photosAlbumHeaderView.bind('onUploadButtonClick', this._onUploadButtonClick, this);
		}

		if (photosAlbumHeaderView)
		{
			this.$headerContainer.html(photosAlbumHeaderView.render().el);
		}
    },

    addTabsView: function (tabsViewEl)
    {
        this.$scroller.prepend(tabsViewEl);
    }
}); var PhotosAlbumHeaderView = Backbone.View.extend({
    
    className: 'flexbox album_header clr_contTypeB_headerItem_bg clr_contTypeB_headerItem_brdr',
    
    render: function ()
    {
        var params = this.model.toJSON();
        
        /*TEST!!!:
        params.albumDescr = "This is the album descsdfsdf sdfgmnvm dfg dfbjdf DFG dfgdg d dDF!";
        params.albumImage = "http://t3.gstatic.com/images?q=tbn:ANd9GcQadLlidr1bmtziwbXPIIsbQufKj6IikeJ3KpRlraNU25JVHmDe";
		*/

        params.photosStr = _T('HtmlTextLiveAlbumPhotos');
        params.uploadButton = (params.uploadButton && PLATFORM !== platformEnum.webApp);
        this.$el.html(photosTemplates.albumHeaderMarkup(params));
        this.$('.upload_button').tap(this.onUploadButtonClick.hitch(this));
        
        return this;
    },
    
    onUploadButtonClick: function ()
    {
    	this.trigger('onUploadButtonClick');
    }
    
    
}); /* Relevant for layouts 0,1,2,3,4,8,9*/
var PhotosListView = ItemsView.extend({

    initialize: function ()
    {
        ItemsView.prototype.initialize.apply(this);

        // "uploadingImage" (live album)
        var uploadingImagesCollection = this.model.get('uploadingImagesCollection');
        if (uploadingImagesCollection)
        {
            // we want to add the "uploadingImage" view in this case
        	uploadingImagesCollection.bind('add', this.onAddUploadingPhoto, this);
        }

        var layoutId = this.model.get('layoutId');

        // these layouts need a different background.
        if (layoutId === 0 || layoutId === 1 || layoutId === 3 || layoutId === 8 || layoutId === 9)
        {
            if (layoutId === 3 || layoutId === 1)
            {
                this.$itemsList.addClass('clr_contTypeA_bg');
	            if (layoutId === 3)
	            {
	                this.$itemsList.addClass('centered_grid');
	            }
            }
			$(window).bind("throttledresize", this.onResize.hitch(this));
            var itemsCollection = this.model.get('items');
            if (itemsCollection)
            {
                // we want to update the margin also for the new items:
				itemsCollection.bind('getItemsSuccess singleAdd', this.onResize, this);
            }
        }
    },

    createItemView: function (photo)
    {
        var thumbnailView = new ThumbnailView({
            model: photo,
            layoutId: this.model.get('layoutId'),
            layoutParams: this.model.get('layoutParams'),
            id: 'thumbnail_view_'+Utils.Helpers.generateGUID()
        });

        return thumbnailView;
    },

    getRootView: function ()
    {
        return this.$el;
    },

    onResize: function ()
    {
		if (this.isPageShow)
		{
			this.updateThumbnailsMargin();
		}
    },

    onPageShow: function ()
    {
		this.isPageShow = true;
		this.updateThumbnailsMargin();
        this.$itemsList.css({
			visibility: "visible"
		});
    },

    onPageHide: function ()
    {
		this.isPageShow = false;

		// We don't want the "jump" when calculating the grid-margin,
		// but we need the items to take up place - for margin calculation,
		// so we use the:
		// "hidden - The element is invisible (but still takes up space)"
        this.$itemsList.css({
			visibility: "hidden"
		});
    },

    updateThumbnailsMargin: function()
	{
		var layoutId = this.model.get('layoutId');

		// these layouts need a "grid center".
		if (layoutId === 0 || layoutId === 1)
		{
			Utils.Html.setGridMargin(this.$itemsList);
		}
		else
		if (layoutId === 8 || layoutId === 9)
		{
			if (LAYOUT === layoutFormat.wide)
            {
                var options = {
                    minWidth: 150,
                    setAlsoMarginTop: true,
                    margin: 10
                };
            }
            else
            {
                var options = {
                    minWidth: 80,
                    setAlsoMarginTop: false,
                    margin: 4
                };
            }
            Utils.Html.setGridSizes(this.$itemsList, options);
		}

	},

	onAddUploadingPhoto: function (photoUploadModel)
	{
		// Add view and put it on top.
		var photoUploadView = new PhotoUploadView({model: photoUploadModel});

		this.getRootView().prepend(photoUploadView.render().el);

		// TODO: here? in the photoUploadView?
		this.$myScrollWrapper = this.$myScrollWrapper || Scrolling.getMyScrollerWrapper(this.$el);;
		Scrolling.onContentChanged(this.$myScrollWrapper);
	}
}); var PhotosShowView = BaseItemsView.extend(
{   
    initialize: function () 
    {
        BaseItemsView.prototype.initialize.apply(this);
		$(window).bind("throttledresize", this.onResize.hitch(this));
    },

    /**
     * OVERRIDE:
     * Handle the items get success - (re?) render the view:
     */
    _onGetItemsSuccess: function () 
    {
        this.render();
     
	    // call "super":
		BaseItemsView.prototype._onGetItemsSuccess.apply(this);	
    },

    /**
     * Like singleton handler to "$fadeContainer"
     */
    $fadeContainerHandle: function () 
    {
		if (!this.$fadeContainer) 
		{
			// create the $fadeContainer - the "photoView"-s container
			this.$fadeContainer = $('<div class = "fade_container"></div>');
			this.$el.append(this.$fadeContainer);
		}
		return this.$fadeContainer;
    },

    /**
     * OVERRIDE:
     * now we have items, so we can start the "show".
     */
    _renderItems: function ()
    {
        // Cancel any timer (if exists):
        if (this._timerHandle !== null)
        {
            clearTimeout(this._timerHandle);
            this._timerHandle = null;
        }		

        var itemsCollection = this.model.get('items');
		if (itemsCollection.length > 0)
		{
			if (!this.photoModel) 
			{
				// create the empty model:
				this.photoModel = new PhotoModel();
				
				// create the (empty) view:
				this.photoView = new PhotosLargeImageView(
				{
					model: this.photoModel
				});
				// create the empty model2 (for fade-in: the next model):
				this.photoModel2 = new PhotoModel();
				
				// create the (empty) view2 (for fade-in: the next view):
				this.photoView2 = new PhotosLargeImageView(
				{
					model: this.photoModel2
				});
				this.$fadeContainerHandle().append(this.photoView.$el).append(this.photoView2.$el);
				this.initPhotoViewsCss();
			}			

			// select the 1st item, and start "slideshow":
			this.prepareNextImage(true);
			// will be inside the "prepareNextImage": 
			//this.selectNextImage(0, true);	
		}
    },

    // handle for timers, so we will be able to cancel the timers.
    _timerHandle: null,
	
	SLIDESHOW_DELAY: 3000,
	
    /**
     * Select (=show) the next image - the "photoView2" (need to be already done).
     * @param {integer} animationTime - the animation duration in mSec
     * @param {boolean} playSlideshow - if true, select the next item after interval 
     */
	selectNextImage: function (animationTime, playSlideshow)
    {
        // Cancel any timer (if exists):
        if (this._timerHandle !== null)
        {
            clearTimeout(this._timerHandle);
            this._timerHandle = null;
        }		
		
		var transitionDuration = (animationTime / 1000) + "s";
			
		// Fade in the new view:
		this.photoView2.$el.css(
		{
			"-webkit-transition-property": "opacity",
			//"-webkit-transition-property": "all",
			"-webkit-transition-duration": transitionDuration,
			"-webkit-transition-timing-function": "ease-out",
			"opacity": "1"
		});
		// Fade out the old image:
		this.photoView.$el.css(
		{
			"-webkit-transition-property": "opacity",
			//"-webkit-transition-property": "all",
			"-webkit-transition-duration": transitionDuration,
			"-webkit-transition-timing-function": "linear",
			"opacity": "0"
		});

		//call the "done" func
		setTimeout(this.swapPhotos.hitch(this), animationTime);
		
		var itemsCollection = this.model.get('items');
		if (playSlideshow && itemsCollection.length > 1)
		{
			this.prepareNextImage();
			// select next image (after delay, only when it ready): 
			this.setTimer();
		}
    },

    /**
     * Set timer to show the next image.
     * if the image is not loaded yet - call this function recursivly... 
     */
	setTimer: function ()
    {
		this._timerHandle = setTimeout(function()
		{
			if (this.isNextImageReady) 
			{
				this.selectNextImage(400, true);
			}
			else
			{
				this.setTimer();
			}
		} .hitch(this), this.SLIDESHOW_DELAY);
	},

    /**
     * Select the next item to be the "next" (= prepare "photoModel2", "photoView2") 
     */
	prepareNextImage: function (isFirstTime)
    {
		this.isNextImageReady = false;
		var itemsCollection = this.model.get('items');
       	if (typeof(this.imageIndex) === "undefined") 
		{
			this.imageIndex = 0;
		}
		else 
		{
			this.imageIndex = (this.imageIndex + 1) % itemsCollection.length;
		}
		var photoModel = itemsCollection.at(this.imageIndex);
		if (photoModel)
		{
			var that = this;

			// Get URL of the image to load
			var imageUrl = photoModel.getLargestImage();
			
			// Load the URL (make the browser cache it)
			var imagePreloader = new Image();
			
			// Attach to the image loaded event
			imagePreloader.onload = function()
			{
				// Change the model to the new image:
				that.photoModel2.set(photoModel.toJSON());
				that.isNextImageReady = true;
				if (isFirstTime)
				{
					that.selectNextImage(0, true);					
				}
			};
			
			// In case image error or abort was triggered
			var onImageError = function()
			{
				// skip on the this error image - load next image:
				that.prepareNextImage(isFirstTime);		
			};		
			
			// Attach to the image error event
			imagePreloader.onerror = onImageError;
			imagePreloader.onabort = onImageError;			
			// Now load the image
			imagePreloader.src = imageUrl;	
		}
    },

	/**
	 * Swap the "currant" photo and "next" photo pointers
	 */
	swapPhotos: function ()
    {
		// Swap models:
		var temp = this.photoModel2; 
		this.photoModel2 = this.photoModel; 
		this.photoModel = temp; 

		// Swap views:
		temp = this.photoView2; 
		this.photoView2 = this.photoView; 
		this.photoView = temp; 
    },

    initPhotoViewsCss: function ()
    {
		this.photoView.$el.css(
		{
			"-webkit-transition-duration": "0s",
			"opacity": "1",
			"z-index": "0" // Do we want this? - now not, because we use both fade-in & fade out
		});

		this.photoView2.$el.css(
		{
			"-webkit-transition-duration": "0s",
			"opacity": "0",
			"z-index": "1" // Do we want this? - now not, because we use both fade-in & fade out
		});
    },

    updatePhotoHeight: function ()
    {
		var top = this.$fadeContainerHandle().offset().top;
        var options = 
		{
			includeHeader: true
		};

		var height = Utils.Html.getInnerHeight(options) - top;
		if (height < 100)
		{
			height = 100;
		}
		 
		this.$fadeContainerHandle().css({height: height + "px"});

		var $scrollWrapper = Scrolling.getMyScrollerWrapper(this.$el);
		// Call refresh scroll callback
		Scrolling.onContentChanged($scrollWrapper);			
    },

    onResize: function ()
    {
		if (this.isPageShow) 
		{
			this.updatePhotoHeight();
		}
    },
	
    onPageShow: function ()
    {
		this.isPageShow = true;
		this.updatePhotoHeight();
    },

    onPageHide: function ()
    {
		this.isPageShow = false;
    },
	

	/**
	 * OVERRIDE:
	 * We don't want "show more" so we override this func: 
	 * (BTW, we don't need to do this, because we anyway didn't implement "getRootView"...)
	 */
    _renderShowMoreButton: function()
	{
	}
}); /* for layouts 10 */
var PhotosColumnsView = ItemsView.extend({
   
	/**{array of integers} the length of the array
	 * 				is the columns count. the value of each cell is the last
	 * 				"height" of the column.
	 * 				e.g.: [510,495,525]*/
    columns: [],
	
	/**
	 * this.margin: {integer} horizontal margin between columns and 
	 * 				vertical margin between images in the same column
	 */
	margin:0,

	/** this.columnWidth: {integer} the column width.
	 */
	columnWidth: 0,
	
	initialize: function () 
    {
		ItemsView.prototype.initialize.apply(this);
		
		$(window).bind("throttledresize", this.onResize.hitch(this));
//		var itemsCollection = this.model.get('items');
//		if (itemsCollection)
//		{
//			// we want to update the margin also for the new items:
//			itemsCollection.bind('getItemsSuccess', this.onResize, this);
//		}
    },

	/**
     * override ItemsView function
     */
    _reset: function ()
    {
		// call "super":
		ItemsView.prototype._reset.apply(this);
		// => this.$itemsList.html('');
		
		// init the "loaded images" array:
		this.loadedImages = [];
		
		// we need this before we start adding images to the columns...
		this._recalcColumns();
    },    
        
	/**
     * override ItemsView function
     */
    _renderOneItem: function (item)
    {
        var itemView = this.createItemView(item);
		
		// add it to the html:
		this.$itemsList.append(itemView.render().el);

		// we put it on random position (= so, after we will load it, 
		// we will show animation of "ordering"...)
		var top = Math.floor((Math.random()*500));
		var left =  Math.floor((Math.random()*300));
		itemView.$el.css(
		{
			top: top,
			left: left,
			width: 0,
			height: 0
		});

		// Load the URL (make the browser cache it)
		var imagePreloader = new Image();
		
		var that = this;
		// Attach to the image loaded event
		imagePreloader.onload = function()
		{
			var imageItem = 
			{
				itemView: itemView,
				imageRatio: this.height / this.width
			}
			// we don't want the border before loading the image...:
			itemView.$el.addClass('clr_images_image2_brdr');
			
			// we need also to save it, in case that we will resize and need to re-arrange:
			that.loadedImages.push(imageItem);

//			// add it to the html:
//			that.$itemsList.append(itemView.render().el);
			
//			setTimeout(function(){
			// put it on the wanted column
			that._changeItemPosition(imageItem);
//			},1);
		};
		
		// In case image error or abort was triggered
		var onImageError = function()
		{
			// I think that we don't need this, but anyway:
			itemView.remove();
		};
		
		// Attach to the image error event
		imagePreloader.onerror = onImageError;
		imagePreloader.onabort = onImageError;
		
		// Now load the image
		setTimeout(function(){		
		imagePreloader.src =  item.getMediumImage(true);
		}, 1);
    },
    
    createItemView: function (photo)
    {
        var thumbnailView = new ThumbnailColumnView({
            model: photo
        });
        
        return thumbnailView;
    },
    
    getRootView: function ()
    {
        return this.$el;
    },

    onResize: function ()
    {
		if (this.isPageShow) 
		{
			this.updateThumbnailsMargin();
		}
    },

    onPageShow: function ()
    {
		this.isPageShow = true;
		this.updateThumbnailsMargin();
//        this.$itemsList.css({
//			visibility: "visible"
//		});
    },

    onPageHide: function ()
    {
		this.isPageShow = false;
		
		// We don't want the "jump" when calculating the grid-margin,
		// but we need the items to take up place - for margin calculation,
		// so we use the:
		// "hidden - The element is invisible (but still takes up space)"
//        this.$itemsList.css({
//			visibility: "hidden"
//		});
    },
        
    updateThumbnailsMargin: function()
	{
		// we need to recalc columns width:
		this._recalcColumns();
		
		// change the images to the wanted position
		for (var i = 0; i < this.loadedImages.length; i++) 
		{
			// change the image position:
			var imageItem = this.loadedImages[i];
			this._changeItemPosition(imageItem);
		}
	},

	/**
	 * This function will calc the number of columns and
	 * the width of each column according to the screen width.
	 * 
	 * after this function we will have in "this" the following vars:
	 * 	this.columns: {array of integers} the length of the array
	 * 				is the columns count. the value of each cell is the last
	 * 				"height" of the column. (after this function it will 
	 * 				be 0 in all cells)
	 * 				e.g.: [0,0,0]
	 * 	this.margin: {integer} horizontal margin between columns and 
	 * 				vertical margin between images in the same column
	 * 				e.g.: 4
	 * 	this.columnWidth: {integer} the column width. e.g.: 101
	 */
    _recalcColumns: function()
	{
		/**
		 * We will try to put maximum columns when the minimum
		 * width of column is COLUMN_MIN_WIDTH.
		 */
		
		// Do we want different values on iPad, etc.? 
		if (LAYOUT === layoutFormat.wide)
        {
	        var COLUMN_MARGIN = 8;
			var COLUMN_MIN_WIDTH = 160;
        }
        else
        {
	        var COLUMN_MARGIN = 4;
			var COLUMN_MIN_WIDTH = 100;
        }

		var itemsCount = 0;
		var itemWidth = COLUMN_MIN_WIDTH + COLUMN_MARGIN;
		// NOTE: we do " - COLUMN_MARGIN" because we need also additional margin in the right side.
		var containerWidth = this.$itemsList.width() - COLUMN_MARGIN;
		
		// In case of hidden, we will get width=0. 
		// (TODO: I think that we can delete this check, we will just get itemsCount=NaN (X/0) or 0 (0/X), and we will "exit" in the next validation... So: do we want this validation?)
		if (containerWidth > 0) 
		{
			// calculate the possible items count in a row.
			itemsCount = Math.floor(containerWidth / itemWidth);
			
			// in case of even 1 item can't feet (e.g.: containerWidth=100, itemWidth = 101) 
			if (itemsCount > 0) 
			{
				containerWidth = containerWidth - (itemsCount * COLUMN_MARGIN);
				itemWidth = Math.floor(containerWidth / itemsCount);
			}
		}
		
		/* Now, we set the values to the member-vars: */
		this.margin = COLUMN_MARGIN;
		this.columnWidth = itemWidth;
		this.columns = [];
		for (var i = 0; i<itemsCount; i++)
		{
			this.columns[i] = 0;
		}
	},

    _changeItemPosition: function(imageItem)
	{
		// sanity:
		if (!this.columns.length) 
		{
			return;
		}
		
		// find the lowest column:
		var columnHight = 999999; //columnMinHight
		var columnMaxHight = 0;
		var columnIndex = 0; // index of column with MinHight
		for (var i = 0; i < this.columns.length; i++)
		{
			if (this.columns[i] < columnHight)
			{
				columnHight = this.columns[i];
				columnIndex = i;
			}
			if (this.columns[i] > columnMaxHight)
			{
				columnMaxHight = this.columns[i];
			}
		}
		
		// set image size & position
		var top = columnHight + this.margin;
		var left = columnIndex * (this.margin + this.columnWidth) + this.margin;
		var width = this.columnWidth;
		var height = Math.floor(this.columnWidth * imageItem.imageRatio);
		
		// Make "move animation" if supported:
		if (false && $.support.cssTransitions) 
		{
			var baseWidth = 100;
			var baseheight = Math.floor(baseWidth * imageItem.imageRatio);
			var scale = "scale(" + (width / baseWidth) + ")";
			var move = "translate(" + left + "px, " + top + "px)";
			imageItem.itemView.$el.css(
			{
				width: baseWidth,
				height: baseheight,
				"-webkit-transition-property": "all",
				"-webkit-transition-duration": "1.25s",
				"-webkit-transition-timing-function": "ease-out",
				"-webkit-transform": scale + " " + move
			});

//			var move = "translate(" + left + "px, " + top + "px)";
//			imageItem.itemView.$el.css(
//			{
//				width: width,
//				height: height,
//				"-webkit-transition-property": "all",
//				"-webkit-transition-duration": "1.25s",
//				"-webkit-transition-timing-function": "ease-out",
//				"-webkit-transform": move
//			});
		
		}
		else 
		{
			imageItem.itemView.$el.css(
			//		imageItem.itemView.$('.thumbnail-view').css(
			{
				top: top,
				left: left,
				width: width,
				height: height
			});
		}
		// update the columns array:
		var newColumnHeight = top + height; 
		this.columns[columnIndex] = newColumnHeight;
		
		//update the "ul" height (e.g.: for "show more" button and scrolling...)
		if (newColumnHeight > columnMaxHight)
		{
			this.$itemsList.css({height: newColumnHeight,
								marginBottom: 15});
			this.updateScroller();
		}
	},
	
	/**
	 * Update the scroller after "threshold" (e.g.:1 second).
	 * If someone will call this method again in this time - 
	 * we will ignore it.
	 */
	updateScroller: function()
	{
		if (!this.waitForUpdate)
		{
			this.waitForUpdate = true;
			setTimeout(function()
			{
				this.waitForUpdate = false;
				
				var $scrollWrapper = Scrolling.getMyScrollerWrapper(this.$el);
				// Call refresh scroll callback
				Scrolling.onContentChanged($scrollWrapper);
			}.hitch(this), 1000);
		}
	}

}); var PhotosSlideView = BaseItemsView.extend(
{   
	className: "slide_view",
	
    /**
     * OVERRIDE:
     * Handle the items get success - (re?) render the view:
     */
    _onGetItemsSuccess: function () 
    {
        this.render();

		// update scroller:
		var $scrollWrapper = Scrolling.getMyScrollerWrapper(this.$el);
		Scrolling.onContentChanged($scrollWrapper);			
     
	    // call "super":
		BaseItemsView.prototype._onGetItemsSuccess.apply(this);	
    },

    /**
     * OVERRIDE:
     * create the "empty" skeleton of the view, and init the vars
     * (NOTE: we will fill the data in "_renderItems")
     */
    _reset: function ()
    {
		// create the "skeleton":
		this.$el.html(photosTemplates.slideViewMarkup());
		
		// init vars:
		this._$slideContainer = this.$el.find('.slide_container');
		this._$iconsStrip = this.$el.find('.horizontal_strip');
		this._currImageIndex = -1;
		this._page = 0;
		var $images = this.$el.find('.image');
		this.$descr = this.$el.find('.album_description');		
		this._$imagesArray = [$($images[0]),
						   $($images[1]),
						   $($images[2]),
						   $($images[3]),
						   $($images[4]),
						   $($images[5]),
						   $($images[6])];
		// we will set to true when we will get more than 1 image:
		this._supportNav = false;
		
	},
	
    /**
     * OVERRIDE:
     * now we have items, so we can start the "show".
     */
    _renderItems: function ()
    {
		var albumDescr = this.model.get('album')? this.model.get('album').get('albumDescr'): null; 
		if (albumDescr)
		{
			this.$descr.html(albumDescr).show();
		}
		else
		{
			this.$descr.hide();
		}

        var itemsCollection = this.model.get('items');
		
		if (itemsCollection.length > 0) 
		{
			if (itemsCollection.length > 1) 
			{
				// we want the slide stuff only if we have more than 1 image
				// TODO: maybe only on reset? in case of pagination it is better...
				this._bindNavEvents();
				this._supportNav = true;

				// show all the images (in case that we hide it before...)
				this._$imagesArray[0].show();  
				this._$imagesArray[1].show();  
				this._$imagesArray[2].show();  
				this._$imagesArray[4].show();  
				this._$imagesArray[5].show();  
				this._$imagesArray[6].show();  
			}
			else
			{
				// hide all the images except the center:
				this._$imagesArray[0].hide();  
				this._$imagesArray[1].hide();  
				this._$imagesArray[2].hide();  
				this._$imagesArray[4].hide();  
				this._$imagesArray[5].hide();  
				this._$imagesArray[6].hide();  
			}
	        // By default, select first image
	        this.setImage(0, 0);
		}
    },

    /**
    * This function changes the left (= "X coordinate")
    * of the icons-strip.
    * NOTE: if we support nav and support webkit, we will override this func...
    * 
    * @param x - integer, the wanted "x" position.
    * @param delay - integer, the time (in ms) to animate this. can be 0.
    *
    * @author Matanya
    **/
    _setStripLeft: function (x, delay)
    {
        this._$iconsStrip.animate({
			left: x
		}, delay);
    },

    /**
    * This function changes the left (= "X coordinate")
    * of a single image.
    * NOTE: if we support nav and support webkit, we will override this func...
    * NOTE2: we need this func (instead of just change the left), because there
    * is bug in iPhone - after some slides, there are "jumps" in the center when
    * changing the last image left. I don't have any idea why, but when we use
    * webkit-transform instead of it, it is working OK...  
    * 
    * @param $image - the jquery object of the image
    * @param x - integer, the wanted "x" position.
    *
    * @author Matanya
    **/
    _setImageLeft: function ($image, position)
    {
		$image.css(
		{
			"left": position + "px"
		});
    },

    /**
    * Bind all slide stuff events
    *
    * @author Matanya
    */
    _bindNavEvents: function()
    {
		// Init nav vars:
		
	    // The index of the selected image (integer).
	    this._currImageIndex = -1;
	    // Width of image in the navigator:
	    this._imageWidth = 225;
	    // # of page moves (e.g.: -50 can be 52 slides to "prev" + 2 to "next")
		this._page = 0;
	    // Are we in the middle of moving in the navigator?
	    this._touchNavStarted = false;
	    // Current X position in moving in the navigator.
	    this._curX;
	    // The total movement of the touch event in the navigator.
	    this._totalXDiff = 0;

        var that = this;
		
		// check if supports touch and have webkit support
        var isTouch = ('ontouchstart' in window);
        var webKitEnabled = ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix());

        if (webKitEnabled)
        {
			// override the _setStripLeft function:
            this._setStripLeft = function (x, delay)
            {
                this._$iconsStrip.css({
					'-webkit-transition': 'all ' + delay + 'ms',
					"-webkit-transition-timing-function": "ease-out",
					'-webkit-transform': 'translate3d(' + x + 'px,0,0)'
				});
            };

			// override the _setImageLeft function:
		    this._setImageLeft = function ($image, position)
		    {
				$image.css(
				{
					'-webkit-transform': 'translate3d(' + position + 'px,0,0)'
				});
		    };
        }

        if (isTouch)
        {
            /**
            * This function returns the "X coordinate" in touch events.
            * @param e - the event.
            * @return x - integer the x position.
            *
            * @author Matanya
            **/
            _getXFromEvent = function (e)
            {
                return e.changedTouches[0].pageX;
            };
        }
        else if ($.browser.msie)
        {
            // See above for documantation...
            _getXFromEvent = function (e)
            {
                return e.clientX;
            };
        }
        else
        {
            // See above for documantation...
            _getXFromEvent = function (e)
            {
                return e.pageX;
            };
        }

        // set the event names according to the touch support
        var START_EVENT = isTouch ? 'touchstart' : 'mousedown';
        var MOVE_EVENT = isTouch ? 'touchmove' : 'mousemove';
        var END_EVENT = isTouch ? 'touchend' : 'mouseup';

        /**
        * Start-move event handler.
        * @param {Object} e the event to handle.
        */
        var handleStartNavEvent = function (e)
        {
            that._touchNavStarted = true;
            that._totalXDiff = 0;

            // when using jQuery.bind we get an original event.
            if (e.originalEvent)
            {
                e = e.originalEvent;
            }
            // prevent default touch behavior
            if (e.preventDefault)
            {
                e.preventDefault();
            }

            // get the touch event's location.
            that._curX = _getXFromEvent(e);

            return true;
        };

        /**
        * Move event handler.
        * @param {Object} e the event to handle.
        */
        var handleMoveNavEvent = function (e)
        {
            if (!that._touchNavStarted)
            {
                return false;
            }

            // when using jQuery.bind we get an original event.
            if (e.originalEvent)
            {
                e = e.originalEvent;
            }
            // prevent default touch behavior
            if (e.preventDefault)
            {
                e.preventDefault();
            }

            var eventXPosition = _getXFromEvent(e);

            // accumulate the total movement of the touch
            var diffX = eventXPosition - that._curX;
            that._totalXDiff += diffX;
            that._curX = eventXPosition;
            that._setStripLeft(-(that._page * that._imageWidth) + that._totalXDiff, 0);
            return true;
        };

        /**
        * End-move event handler.
        * @param {Object} e the event to handle.
        */
        var handleEndNavEvent = function (e)
        {
            if (that._touchNavStarted)
            {
                // "final update" of "_totalXDiff" (because, maybe the last "move" event was on a different "x" position)

                // when using jQuery.bind we get an original event.
                if (e.originalEvent)
                {
                    e = e.originalEvent;
                }
                // prevent default touch behavior
                if (e.preventDefault)
                {
                    e.preventDefault();
                }

                var eventXPosition = _getXFromEvent(e);
                // accumulate the total movement of the touch
                var diffX = eventXPosition - that._curX;
                that._totalXDiff += diffX;
				var indexChange = -that._totalXDiff / that._imageWidth;
				
				//support threshold:
				if (indexChange > 0.2 && indexChange < 1)
				{
					indexChange = 1;
				}
				if (indexChange < -0.2 && indexChange > -1)
				{
					indexChange = -1;
				}
				
				indexChange = Math.round(indexChange);
                var newIndex = that._currImageIndex + indexChange;				
				that.setImage(newIndex, 250);
				
                that._touchNavStarted = false;
            }
            return true;
        };

        that._$slideContainer.bind(START_EVENT, handleStartNavEvent);
        that._$slideContainer.bind(MOVE_EVENT, handleMoveNavEvent);

        //$("body").bind(END_EVENT, handleEndNavEvent);//TODO: unbind on exit? on destructor?
        that._$slideContainer.bind(END_EVENT, handleEndNavEvent);

    },

    /**
     * 
     * @param {integer} containerIndex
     */
	setImageSrc: function(containerIndex)
    {
		var itemsCollection = this.model.get('items');
		var itemsCount = itemsCollection.length;
		//NOTE: we do "*2" in case for itemsCount = 1, (but now we don't want nav for this)
		var srcIndex = (this._currImageIndex + containerIndex - 3 + 2*itemsCount) % itemsCount;		
		var $image = this._$imagesArray[containerIndex];    
		var src = itemsCollection.at(srcIndex).getLargestImage();
		$image.css(
		{
			"background-image": "url(" + src + ")"
		});    
    },

	/**
	 * Update the image position, according to the "_page"
	 * @param {Object} containerIndex
	 */
	setImagePosition: function(containerIndex)
    {
		var $image = this._$imagesArray[containerIndex];    
		var position = this._page + containerIndex - 3;
		// We can't do this, because of iPhone bug. see "_setImageLeft" documentation
//		position = position * 100 + "%";
//		$image.css(
//		{
//			"left": position
//		});
		position = position * this._imageWidth;		
		this._setImageLeft($image, position);
    },

    /**
    * This function is the main function for set a image = change GUI, vars, etc. 
    * @param imageIndex - integer, the index of the wanted "image" 
    *                       (in the "photos" array)
    * @param delay - integer, the time (in ms) to animate the navigator. can be 0.
    * @author Matanya
    **/
    setImage: function(imageIndex, delay)
    {
		var itemsCollection = this.model.get('items');
		var itemsCount = itemsCollection.length;
		// initial load of images:
		if (this._currImageIndex === -1) 
		{
			this._currImageIndex = 0;

			// load center (1st) image:
			this.setImageSrc(3);						 
			this.setImagePosition(3);
			
			if (this._supportNav) 
			{
				// load the other 6 images:
				this.setImageSrc(0);
 				this.setImageSrc(1);						 			
				this.setImageSrc(2);						 
				this.setImageSrc(4);
				this.setImageSrc(5);						 
				this.setImageSrc(6);

				this.setImagePosition(0);
				this.setImagePosition(1);
				this.setImagePosition(2);
				this.setImagePosition(4);
				this.setImagePosition(5);
				this.setImagePosition(6);
				
			}
		}
		var indexDelta = imageIndex - this._currImageIndex;
        
		// Save the index of current image, and the current "page":
        this._currImageIndex = (imageIndex + itemsCount) % itemsCount;
		this._page += indexDelta;
		
		if (this._supportNav && indexDelta !== 0) 
		{
			// update the edge images:
			// TODO: now we don't support slide of more than 1 image (i.e.: indexDelta>1 or indexDelta<-1)
			//	if we want this, we need also more than 5 images... 
			if (indexDelta > 0)
			{
				var i = 0;
				while (i < indexDelta) 
				{
					// move the left image to be in the right:
					var tmp = this._$imagesArray[6];
					this._$imagesArray[6] = this._$imagesArray[0];
					this._$imagesArray[0] = this._$imagesArray[1];
					this._$imagesArray[1] = this._$imagesArray[2];
					this._$imagesArray[2] = this._$imagesArray[3];
					this._$imagesArray[3] = this._$imagesArray[4];
					this._$imagesArray[4] = this._$imagesArray[5];
					this._$imagesArray[5] = tmp;
					
					i++;
				}
				i = 0;
				while (i < indexDelta) 
				{
					// load to it the next src image:
					this.setImageSrc(6 - i);
					
					// update its position
					this.setImagePosition(6 - i);
					
					i++;
				}
			}
			else
			{
				var i = 0;
				while (i > indexDelta) 
				{
					// move the right image to be in the left:
					var tmp = this._$imagesArray[0];
					this._$imagesArray[0] = this._$imagesArray[6];
					this._$imagesArray[6] = this._$imagesArray[5];
					this._$imagesArray[5] = this._$imagesArray[4];
					this._$imagesArray[4] = this._$imagesArray[3];
					this._$imagesArray[3] = this._$imagesArray[2];
					this._$imagesArray[2] = this._$imagesArray[1];
					this._$imagesArray[1] = tmp;
					
					i--;
				}

				i = 0;
				while (i > indexDelta) 
				{
					// load to it the next (="prev") src image:
					this.setImageSrc(-i);
					
					// update its position
					this.setImagePosition(-i);
					
					i--;
				}
			}
		}

        // Update navigator position:
        this._setStripLeft(-this._page * this._imageWidth, delay);
    },

	/**
	 * OVERRIDE:
	 * We don't want "show more" so we override this func: 
	 * (BTW, we don't need to do this, because we anyway didn't implement "getRootView"...)
	 */
    _renderShowMoreButton: function()
	{
	}
}); var PhotosArrowsView = BaseItemsView.extend(
{   
	className: "arrows_view",
	
    /**
     * OVERRIDE:
     * Handle the items get success - (re?) render the view:
     */
    _onGetItemsSuccess: function () 
    {
        this.render();
     
		// update scroller:
		var $scrollWrapper = Scrolling.getMyScrollerWrapper(this.$el);
		Scrolling.onContentChanged($scrollWrapper);			
		
	    // call "super":
		BaseItemsView.prototype._onGetItemsSuccess.apply(this);	
    },

    /**
     * OVERRIDE:
     * create the "empty" skeleton of the view, and init the vars
     * (NOTE: we will fill the data in "_renderItems")
     */
    _reset: function ()
    {
		// create the "skeleton":
		this.$el.html(photosTemplates.arrowsViewMarkup());
		
		// init vars:
		this.$prevArrow = this.$el.find('.prev.button_arrow');
		this.$nextArrow = this.$el.find('.next.button_arrow');
		this.$image = this.$el.find('.image');
		this.$circles = this.$el.find('.circles_container');
		this.$descr = this.$el.find('.album_description');
		this.imageIndex = 0;
		
		// bind "prev" and "next" buttons events:
		var that = this;
		this.$prevArrow.tap(function(e)
		{
	        e.preventDefault();
		 	var $eventTarget = $(e.target);
			// if not disabled:
			if (!$eventTarget.hasClass('disabled') && !$eventTarget.parent().hasClass('disabled')) 
			{
		        /* if we want to support "circle":*/
				var itemsCount = that.model.get('items').length;
				// find the new index:
				that.imageIndex = (that.imageIndex - 1 + itemsCount) % itemsCount;
		        /* if we don't want to support "circle":				
				// find the new index:
				that.imageIndex = (that.imageIndex - 1);
				*/
				// re-render the elements, according the new index:
				that.renderElements();
			}
		});
		this.$nextArrow.tap(function(e)
		{
	        e.preventDefault();
		 	var $eventTarget = $(e.target);
			// if not disabled:
			if (!$eventTarget.hasClass('disabled') && !$eventTarget.parent().hasClass('disabled')) 
			{
		        /* if we want to support "circle":*/
		        var itemsCount = that.model.get('items').length;
				// find the new index:
				that.imageIndex = (that.imageIndex + 1) % itemsCount;
		        /* if we don't want to support "circle":
				// find the new index:
				that.imageIndex = (that.imageIndex + 1);
				*/
				// re-render the elements, according the new index:
				that.renderElements();
			}
		});
		
		// update items look (probably will hide arrows, etc.):
		this.renderElements();
	},
	
    /**
     * change the elements (arrows, circles, image) according to the 
     * model state (e.g.: images count) and "this.imageIndex".
     * 
     * (e.g.: disable "prev-arrow" if we are in the 1st item)
     */
    renderElements: function ()
    {
        var itemsCollection = this.model.get('items');
		if (itemsCollection.length < 2)
		{
			this.$prevArrow.hide();
			this.$nextArrow.hide();
			this.$circles.hide();			
		}
		else
		{
			// render "prev" button:
			this.$prevArrow.show();
			
			var isLoop = this.model.get('layoutParams') && this.model.get('layoutParams').loop; 
			if (!isLoop) 
			{
				if (this.imageIndex > 0) 
				{
					this.$prevArrow.removeClass('disabled');
				}
				else 
				{
					this.$prevArrow.addClass('disabled');
				}
			}
			// render "next" button:
			this.$nextArrow.show();
			if (!isLoop) 
			{
				if (this.imageIndex < itemsCollection.length - 1) 
				{
					this.$nextArrow.removeClass('disabled');
				}
				else 
				{
					this.$nextArrow.addClass('disabled');
				}
			}
			
			// render "circles":
			var html = "";
			for (var i = 0; i < itemsCollection.length; i++)
			{
				var params = 
				{
					disabled: (i !== this.imageIndex)
				};
				html += photosTemplates.circleButtonMarkup(params);
			}
			this.$circles.show().html(html);
	
		}
		var photoModel = itemsCollection.at(this.imageIndex);
		if (photoModel)
		{
			// Change the image src:
			this.$image.css({
				"background-image": "url(" + photoModel.getLargestImage() + ")"
			});
		}
		
	},

    /**
     * OVERRIDE:
     * now we have items, so we can start the "show".
     */
    _renderItems: function ()
    {
		var albumDescr = this.model.get('album')? this.model.get('album').get('albumDescr'): null; 
		if (albumDescr)
		{
			this.$descr.html(albumDescr).show();
		}
		else
		{
			this.$descr.hide();
		}
		
		this.renderElements();
    },

	/**
	 * OVERRIDE:
	 * We don't want "show more" so we override this func: 
	 * (BTW, we don't need to do this, because we anyway didn't implement "getRootView"...)
	 */
    _renderShowMoreButton: function()
	{
	}
}); var PhotosLargeImageView = Backbone.View.extend(
{
	tagName: 'div',
	
	className: "fade_element",

	initialize: function () 
	{
		this.model.bind('change', this.render, this);
	},
	
	render: function ()
	{
	    var params = 
		{
			title: this.model.get('title'),
			imageSrc: this.model.getLargestImage()
		}; 

	    this.$el.html(photosTemplates.largeImage(params));
	    
	    return this;
	}
}); var PhotoUploadView = Backbone.View.extend({
	
	className: 'photo-upload-view clr_contTypeA_bg clr_contTypeA_brdr'
	
	,initialize: function ()
	{
		this.model.bind('change:state', this._onStateChanged, this);
	}
	
	,render: function ()
	{
		var params = this.model.toJSON();
		params.errorMessage = _T('HtmlTextLiveAlbumUploadingFailed');
		params.uploadTxt = _T('HtmlTextLiveAlbumUploadingImage');
		this.$el.html(photosTemplates.photoUploadMarkup(params));
		
		this.$failBar = this.$el.find('.fail-bar');
		
		this.$failBar.find('.retry-button').tap(this._onRetryTap.hitch(this));
		this.$failBar.find('.cancel-button').tap(this._onCancelTap.hitch(this));
		
		this.$uploading = this.$el.find('.uploading');

		return this;
	}
	
	,_onStateChanged: function ()
	{
		var state = this.model.get('state');
		switch(state) 
		{
			case PhotoUploadModel.STATE.UPLOADING:
				this.$failBar.hide();
				this.$uploading.show();
				break;
			case PhotoUploadModel.STATE.FAIL:
				this.$failBar.show();
				this.$uploading.hide();
				break;
			case PhotoUploadModel.STATE.SUCCESS:
				this.remove();
				break;
		}
	}
	
	,_onRetryTap: function (e)
	{
		e.preventDefault();
		this.model.trigger('onRetry', this.model);
	}

	,_onCancelTap: function (e)
	{
		e.preventDefault();
		var $scrollWrapper = Scrolling.getMyScrollerWrapper(this.$el);
		this.remove();
		// refresh scroll:
		Scrolling.onContentChanged($scrollWrapper);
		this.model.trigger('onCancel', this.model);
	}

}); 

/**
 * Manu - restaurant model
 */
var RestaurantModel = ItemsModel.extend(
{
    defaults: _.extend({}, ItemModel.prototype.defaults, {
		// display name of the business, from the AMS: 
		"title": "",
		"location":"",
		"type":"",
		// params for the service:
		"params": null
    }),

    createItemsCollection: function ()
    {
        var menuCollection = new MenuCollection(null, this.get('params'));
        //menuCollection.bind('menuSelected', this._onMenuSelected, this);
        return menuCollection;
    }
});
 /**
 * Menu model
 */
var MenuModel = ItemModel.extend(
{
    defaults:
    {
    	"desc": "",
        "alias": "",
    	"disclamer":"",
    	"entries":"",
    	"name":"",
    	"state":"",
		"title": ""
    },

    initialize: function()
    {
        ItemModel.prototype.initialize.apply(this, arguments);
        // temporary (=until will be supported) add alias
        var alias = Utils.Html.fixAlias(this.get('alias') || this.get('name') || this.get('title'));
        this.set(
            {
                alias: alias
            });
    }
});
 /**
* Collection of menu list
*/
var MenuCollection = ItemsCollection.extend({

    model: MenuModel,
      
    initialize: function (models, params) 
    {
		// "inherit" ("Super"):
		ItemsCollection.prototype.initialize.apply(this);

        this.params = {
            provider: params.provider,
            restid: params.restid
        };
    },
    
    getServiceName: function ()
    {
        return 'CMS_MENU_GET';
    },
    
    parse: function (result)
    {       
        return {models: result.menus};
    },

    getParams: function ()
    {     
        return this.params;
    }
}); /**
 * View that shows list of restaurants
 */
var RestaurantListView = Backbone.View.extend(
{
    attributes: 
	{
	    'data-role': 'page'
	},

    render: function()
    {
        this.$el.html(menuTemplates.scroller_tpl());
        var $scroller = this.$el.find('.scroller');
        var $scrollWrapper = this.$el.find('.scroll_wrapper');
        
        var template = menuTemplates.restaurants_list_tpl;
        
        $scroller.html(template());
        
        var $listContainer = $scroller.find('.rest_list');
        var restaurants = this.model.get('meta').items;
        
        var that = this;
        // Create a list of all the restaurants
        _.each(restaurants, function(restaurant, index)
        {
            that._renderOneRestaurant($listContainer, restaurant);
        });
        
        Scrolling.init($scrollWrapper);
        
        return this;
    },
    
    _renderOneRestaurant: function($listContainer, restParams)
    {
        if (restParams) 
        {
            // Create preview model to show only the title and image
            var restaurantModel = new RestaurantModel(restParams);
            var restaurantView = new RestaurantView(
            {
                model: restaurantModel,
                layoutId: this.options.layoutId
            });
            
            $listContainer.append(restaurantView.render().el);
        }
    }
});
 /**
 * MenuListView (="RestaurantFullView"),
 * View that shows a list of all the menu categories for the selected restaurant
 */
var MenuListView = ItemsView.extend(
{
	className : 'clr_contTypeB_bg menu_list',

    attributes : {
        'data-role': 'page'
        //,'data-buttons': 'refresh' // DO we want refresh?
    },

    initialize: function ()
    {
        this.$el.html(menuTemplates.scroller_tpl());
        this.$scroller = this.$el.find('.scroller');
        this.$scrollWrapper = this.$el.find('.scroll_wrapper');

        Scrolling.init(this.$scrollWrapper);
        ItemsView.prototype.initialize.apply(this);
    },

    getRootView: function ()
    {
        return this.$scroller;
    },

    createItemView: function (item)
    {
        return new MenuView({
            model: item
        });
    }
});
 /**
 * MenuItemListView (="MenuFullView"),
 * The details page of a menu
 */
var MenuItemListView = Backbone.View.extend(
{
    TYPE_CATEGORY : 2,
    TYPE_ITEM : 1,

    attributes : {
        'data-role': 'page'
    },

    className: "clr_contTypeB_bg",
    
    render: function ()
    {

        this.$el.html(menuTemplates.scroller_tpl());
        this.$scroller = this.$el.find('.scroller');
        this.$scrollWrapper = this.$el.find('.scroll_wrapper');

        this.$scroller.html(menuTemplates.menu_items_list_tpl());
        
        var $listContainer = this.$('.menu_items_list');
        var menu_items_list = this.model.get('entries');
                
        var that = this;
        
        // Create a list of all the menu items 
        _.each(menu_items_list, function(menuItem, index)
        {
            that._renderOneMenuItem($listContainer, menuItem);
        });

        Scrolling.init(this.$scrollWrapper);

        return this;
    },
    
    _renderOneMenuItem : function(container, menuItem)
    {
        var template;
        var currency = this.model.get('currency') || "";
        switch (menuItem.type)
        {
            case this.TYPE_CATEGORY :
                template = menuTemplates.menu_single_item_type_tpl;
                break;
            case this.TYPE_ITEM :
                template = menuTemplates.menu_single_item_tpl;
                break;
        }
        var itemView = new Backbone.View(); 
        var el = $("<li>");
        menuItem.currency = currency;
    
        $(el).html(template(menuItem));
        container.append(el);
    }

});
 /**
 * View that shows a single restaurant inside the list
 */
var RestaurantView = Backbone.View.extend(
{
    className: "restaurant_list_item item",

	tagName: 'li',
    
    events: 
    {
        "tap": "itemClicked"
    },

    initialize: function ()
    {
		this.$el.attr('data-role', 'button').addClass('t3d');

        // bind on change:selected for highlight it on iPad: 
        this.model.bind('change:selected', this.onSelectedChange, this);
    },
    
    render: function()
    {
        var template = menuTemplates.restaurants_item_tpl;
        
        var itemParams = 
        {
            title: this.model.get('title') || '',
            location: this.model.get('location') || '',
            imageUrl: this.model.get('imageUrl') || ''
        };
        var compiled = template(itemParams);
        this.$el.html(compiled);

/*		if (this.options.layoutId === 0) 
		{
			this.$el.addClass("color_clickable_classic_item2 feed_classic_item");
		}
		else 
		{
			this.$el.addClass("color_clickable_bubble_item2 feed_bubble_item");
		};*/
        this.$el.addClass("clr_contTypeB_bubbleItem_bg feed_bubble_item");        
		        
		if (this.model.has('imageUrl'))
		{
			this.$el.addClass('with-image');
		}
		else
		{
			this.$el.addClass('no-image');
		};
		
        return this;
    },

    onSelectedChange: function ()
    {
		if (LAYOUT === layoutFormat.wide)
		{
			if (this.model.get('selected')) 
			{
				this.$el.addClass('ipad_selected');
			}
			else 
			{
				this.$el.removeClass('ipad_selected');
			}
		}
    },
	    
    /**
     * This is the event handler for the 'tap' event.
     */
    itemClicked: function(event)
	{
		event.preventDefault();

        UN.navTo(this.model.get('alias'), { level:1 });
    }
});
 /**
* single menu list item view
*/
var MenuView = Backbone.View.extend(
{
    tagName: 'li',
    
    className: 'clr_contTypeC_bg t3d feed_bubble_item',

    // This defines the events binded to the blog post summary element (jQuery Mobile)
    events:
	{
	    "tap": "itemClicked"
	},

    initialize: function ()
    {
        // bind on change:selected for highlight it on iPad: 
        this.model.bind('change:selected', this.onSelectedChange, this);
               
    },

    render: function ()
    {
    	
    	var template = menuTemplates.menus_list_item_tpl;
    	
    	this.$el.attr('data-role', 'button');
        
        var menuListItemParams = 
        {
            title: this.model.get('title') || ''
        };
        var compiled = template(menuListItemParams);
        
        this.$el.html(compiled);
        
        return this;
    },

    onSelectedChange: function ()
    {
		if (LAYOUT === layoutFormat.wide)
		{
			if (this.model.get('selected')) 
			{
				this.$el.addClass('ipad_selected');
			}
			else 
			{
				this.$el.removeClass('ipad_selected');
			}
		}
    },

    itemClicked: function (e)
    {
    	e.preventDefault();
        UN.navTo(this.model.get('alias'), {level:2});
    }
}); /**
 * The Menus template.
 */
var MenuTemplateView = TemplateView.extend(
{
    /**
     * OVERRIDE - in some cases, we show page of providers (=tabs), instead of part of the page:
     */
    _shouldRenderTemplate : function()
    {
        var meta = this.model.get('meta');

        return ( meta.items.length > 1 );
    },

    /**
     * OVERRIDE - render level 0
     */
    _renderTemplate: function (navRequest)
    {
        // Get the template requested
        var meta = this.model.get('meta');

        var id = Utils.Helpers.generateGUID();

        // Create the restaurants list view
        var mainView = new RestaurantListView(
            {
                model: this.model,
                id: id
            });

        this.$el.append(mainView.render().el);
        this.homePageId = id;
    },

    /**
     * override...
     */
    _noDefaultTab : function(navRequest)
    {
        UN.onPageReady(this.homePageId, navRequest, 0);
    },

	/**
     * OVERRIDE - render level 1 - tab:
     */
    _renderTab : function(index, navRequest)
    {
        // Get the template requested
        var meta = this.model.get('meta');
        //var mainView = null;
        var params = meta.items[index];

        if (PLATFORM != platformEnum.webApp && params.type === 'menulink')
        {
            var id = Utils.Helpers.generateGUID();
            var webModuleModel = new Backbone.Model(params);

            var mainView = new WebModuleView({
                model: webModuleModel,
                id: id
            });
            this.$el.append(mainView.render().el);
            UN.onPageReady(id, navRequest, 1);
            return;
        }

        var model = new RestaurantModel(params);
        var view = new MenuListView(
        {
            model: model
        });

        this.renderListPage({navRequest: navRequest, model: model, view: view, addTabs: false});
    },

    /**
     * OVERRIDE - handle "lonely item"
     */
    getDefaultItemAlias: function (data)
    {
        var itemsCollection = data.model.get('items');
        if (itemsCollection.length === 1)
        {
            var itemModel = itemsCollection.at(0);
            return itemModel.get('alias');
        }
        return null;
    },

    /**
     * OVERRIDE.
     */
    getDetailsView: function (model)
    {
        return new MenuItemListView({
            model: model
        });
    }
});
 var menuTemplates = 
{	
	scroller_tpl : _.template('<div class="scroll_wrapper"><div class="scroller"></div></div>'),

		
	/*restaurant list*/
    restaurants_list_tpl: _.template(
		'<ul class="rest_list"> \
        </ul>'),

    restaurants_item_tpl: _.template(	
		'<div class="rest_container"> \
		<% if (typeof(title) != "undefined" && title) { %> \
			<div class="title clr_contTypeB_hdlTxt"><%= title %></div><% } %> \
		<% if (typeof(location) != "undefined" && location) { %> \
			<div class="location clr_contTypeB_txt"><%= location.address %>, <%= location.city %></div><% } %> \
		</div> \
		<% if (typeof(imageUrl) != "undefined" && imageUrl) { %> \
			<div class="image sliced_image" style="background-image:url(\'<%= imageUrl %>\')"></div> \
		<% } %>'),
	
	/*menu list*/	
	menu_list_tpl: _.template(
		'<ul class="menu_list color_m2_background"></ul>'),
	
	menus_list_item_tpl: _.template(
		'<div class="menu_list_item clr_contTypeC_hdlTxt"><%= title %></div>'),
	
	/*menu items list*/
	menu_items_list_tpl: _.template(
		'<ul class="menu_items_list color_m2_background"></ul>'),

	menu_single_item_tpl: _.template(
		'<div class="menu_single_item clr_contTypeB_brdr"> '+
			'<div class="menu_single_item_content">' +
			'<% if (typeof(prices) != "undefined" && prices != "" && prices.length >= 0 && prices[0].price && prices[0].title == null) { %>'+
				'<div class="menu_single_item_name clr_contTypeB_txt"><%= title %></div>' +
			'<% } else { %>' +
				'<div class="menu_single_item_name_priceless clr_contTypeB_txt"><%= title %></div><% } %>' +
			'<% if (typeof(prices) != "undefined" && prices != "" && prices.length >= 0 && prices[0].title == null && prices[0].price) { %>' +
				'<div class="menu_single_item_price clr_contTypeB_txt"><%= currency %><%= prices[0].price %></div><% } %>' +
				'</div>' +
			'<% if (typeof(desc) != "undefined" && desc) { %>' +
				'<div class="menu_single_item_desc clr_contTypeB_subTxt">' +
				'<div class="desc_txt"><%= desc %></div>' +
				'</div> <% } %>' +
			'<% if (typeof(prices) != "undefined" && prices != "" && prices.length > 0 ) { %>' +
				'<% for (var i=0; i < prices.length; i++ ) { %>' +
					'<% if  (prices[i].price && prices[i].title != null) {%>' +
						'<div class="menu_single_item_desc clr_contTypeB_subTxt"> ' +
						'<div class="desc_txt"><%= prices[i].title %></div>'  +
						'<div class="menu_single_item_price sub_price clr_contTypeB_txt"><%= currency %><%= prices[i].price %></div>' +
						'</div>' +
					'<% } %>' +
				'<% } %>' +
			'<% } %>' +
		'</div>'
	),

    menu_single_item_type_tpl: _.template(
		'<div class="menu_type_item clr_contTypeB_brdr"> \
			<div class="menu_type_item_name clr_contTypeB_hdlTxt"><%= title %></div> \
			<div class="menu_type_item_desc clr_contTypeB_txt"><%= desc %></div> \
		</div>'		
	)
		
}; var webModuleTemplates = {};

webModuleTemplates.pageIframeTemplate = _.template(
    '<div class="scroll_wrapper" >' +
    '<iframe frameborder="0" marginheight="0" marginwidth="0" scrolling="auto" src="<%= link %>"></iframe>' +
    '</div>');

webModuleTemplates.pageStaticTemplate = _.template(
    '<div class="scroll_wrapper"><div class="scroller">' +
    '<div class="size_title_4 text clr_contTypeB_hdlTxt"><%= text %></div>' +
    '</div></div>'); 

/**
 * View that shows the entire contactUs template.
 * 
 * @author Matanya
 */
var StaticHtmlTemplateView = TemplateView.extend(
{
	
	DEFAULT_PADDING: 10,
	
	/**
     * OVERRIDE - render level 1 - tab:
     */
    _renderTab : function(index, navRequest)
	{	
        var templateMetaData = this.model.get('meta');
        
        var html = '';
        
        // default is 10.
        var padding = this.DEFAULT_PADDING;
        
        if (templateMetaData.items[0] && templateMetaData.items[0].html)
    	{
            html = templateMetaData.items[0].html;
            if (typeof(templateMetaData.items[0].padding) != 'undefined')
        	{
		padding = templateMetaData.items[0].padding;
        	}
    	}
        
        var staticHtmlModel = new Backbone.Model(
		{
			html: html,
			padding: padding
		});
        var id = Utils.Helpers.generateGUID();
        var staticHtmlView = new StaticHtmlView(
        { 
            model: staticHtmlModel,
            id: id
        });
        
        this.$el.append(staticHtmlView.render().el);
        
        UN.onPageReady(id, navRequest, 1, true);
   	}
}); var StaticHtmlView = Backbone.View.extend(
{	

	attributes:
	{
		'data-role': 'page'
	},
	
	render: function() 
	{	
        this.$el.html('<div class="scroll_wrapper"><div class="scroller"></div></div>');
        this.$scroller = this.$el.find('.scroller');

        // intialize the scrolling.
		this.$scrollerWrapper = this.$el.find('.scroll_wrapper');
        Scrolling.init(this.$scrollerWrapper);

		// Render HTML into container using HTML container control
		var content = this.model.get('html'); 
		if (content) 
		{
			var htmlContainer = new HtmlContainerControl();
			
			htmlContainer.renderHtml(this.$scroller, content, {
				changeColors: false
			});
			
			// Add some padding:
			this.$scroller.children().css({padding: this.model.get('padding') + 'px'});
		}
	    	    	    
		return this;
	},
    
	/**
	 * Append the givven element to the view inside the scroller.
	 * 
	 * @param el - a DOM element, an HTML string or a jQuery object
	 * 
	 * @author Yoel Gluschnaider
	 */
    appendToView: function (el)
    {
        this.$scroller.append(el);
    }
		
}); 



// Deployment platform enumerator
var platformEnum = {
	simulator: 0,
	nativeApp: 1,
	webApp: 2,
	gadget: 3, //obsolete
	playground: 4 //obsolete
};

// Device types enumerator
var deviceTypeEnum = {
	unknown: 0,
	iphone: 1 << 0,
	android: 1 << 1,
	rim: 1 << 2,//obsolete
	winPhone: 1 << 3,//obsolete
	symbian: 1 << 4,//obsolete
	bada: 1 << 5//obsolete
};

var deviceVariantEnum = {
	"default" : 0,
    amazon : 1
};

var storesEnum = {
    appStore: "AppStore",
    googlePlay: "GooglePlay",
    amazon: "Amazon"
};

var modulesTypes = {
    //images module:
    "685f6141-e72b-4bf8-91aa-51ac6cbea288": {
        moduleViewName: "NavImagesModuleView"
    },
    "7a8d5026-ff7e-47d3-bd12-683e32b01313": {
        moduleViewName: "NavEmptyModuleView"
    }
};

var headerButtonsIconsEnum = {
    refresh: "refresh",
    back: "back",
    list: "list",
    grid: "grid",
    info: "info",
    star: "star",
    emptyStar: "emptyStar"
};

/**
 * Services enumerator. This is used for the social driver calls
 */
var socialServicesEnum =
{
    Facebook: 0,
    Twitter: 1,
    Email: 2
};

/**
 * payment provider types enums. This is used for purchasing store-item.
 */
var paymentProvidersTypesEnum =
{
    Paypal: 0
    ,ExternalLink: 1
    ,ShopifyPermalink: 2
    ,Unknown: -1
};

/**
 * stuff for generic error pages. used in errPagesManager.
 */
var errorPages = {
    // type of error, that we will show a error page. used in errPagesManager.
    errorPagesTypes : {
        notSupported: "notSupported", //an error page in case of template that not supported (e.g.: call-us in simulator)
        noTabs: "noTabs", //an error page in case of template without tabs
        block: "block", // an error page in case of "block" the template (e.g.: "notSupportedPage" in email-us in simulator. "blockWeb" in loyalty in webApp)(TODO: maybe delete "block" and use "invalid" in these cases - means, also in "page" level)
        invalid: "invalid", // an error page in case of tab with invalid params (e.g.: the publisher didn't fill all the fields in the CP)
        fail: "fail", // an error page in case of failure in execute the service
        empty: "empty" // an error page in case of success in execute the service, but we get empty response
        // TODO: do we want bad permalink? FB restrication? app without pages?
    },
    // type of button in the error page
    buttonTypes:{
        retry: "retry", //retry (refresh) button (e.g.: for fail)
        download: "download", //"download native" button (e.g.: for block on web)
        notSupported: "notSupported" // button is not supported
        //TODO: do we want the "login" for facebook restrict? "back" for bad permalink?
    }
};

var analytics =
{
    /**
     * To be used by the 'event' function.
     */
    usageEventTypeEnum:
    {
        PageView: 1, // Tab is clicked on the navigation bar (="template click")
        OpenLink: 2, // URL linked is opened
        ReceivedPush: 3, // Push notification received. should be reported only in native code
        SocialLogin: 4, // login to FB
        SocialShare: 5, // do the share (email/fb/twitter). if the shareType (=provider) is null => this is the event of click on the share button, that opens the list of providers.
        TabView: 6,// Inner tab is clicked inside a template
        AdClicked: 7, // Ad was clicked
        UserLoggedIn: 8, // User logged with a new app (when the app is loading)
        ExternalContentShown: 9, // OBSOLETE. External content (readability) page shown.
        CouponClaimed: 10, // Click on "claim coupon".
        CardPunched: 11, // successfully punch card
        SocialActivity: 12, // click on: like / unlike / add comment
        ContactRequest: 13, // mailto/sms/mms/tel anywhere in the app (NOTE: not in share via email.)
        ItemView: 14, // The user see the details page of an item in list from CMS (e.g.: post in rss, post in FB, item in catalog, etc.)
        OpenPhotosGallery: 15, // The user open the photos gallery
        Search: 16, // The user do search (currently relevant only for catalog)
        PaymentCheckout: 17, // The user do "buy now" on store item or "donate now" in donation page
        RESERVED18: 18, // this is reserved. the servers reports this...
        MapInteraction: 19, // Action on map, e.g.: The user want to get navigation direction to point on the map
        Unknown: 0
    },

    /**
     * To be used by MapInteraction
     */
    mapInteractionType:
    {
        Unknown: 0,
        GetDirections: 1
    },

    /**
     * To be used by SocialLogin / SocialShare
     */
    socialProviderType:
    {
        Unknown: 0,
        Facebook: 1,
        Email: 2,
        Twitter: 3
    },

    /**
     * To be used by PaymentCheckout
     */
    paymentType:
    {
        Unknown: 0,
        BuyNow: 1,
        Donate: 2
    },

    /**
     * To be used by SocialActivity
     */
    socialActivityType:
    {
        Unknown: 0,
        Like: 1,
        Unlike: 2,
        AddComment: 3
    },

    /**
     * To be used by SocialActivity (+SocialLogin?)
     */
    actionStatus:
    {
        Start: 0,
        Success: 1,
        Fail: 2
    }
};

// Convert page type to page template folder
var pageTypes = {

	/* About Us */
	"5a8368df-6ebd-c0f2-2d82-e173c1f33d40": {
		packageName: "aboutUs",
		cssClass: "aboutUs",
		templateViewName: "AboutUsTemplateView",
		itemsName: "items"
	},

	/* Agenda. NOTE: we use the same template also for "Speakers" template*/
	"f61f12d6-df0c-465c-b3ba-70fb8f3894a4": {
		packageName: "agenda",
		cssClass: "agenda",
		templateViewName: "AgendaTemplateView",
		itemsName: "items"
	},

	/* Audio template */
	"30be1358-8b36-4d22-b6d2-50c38f4246c4": {
		packageName: "audio",
		cssClass: "audio",
		templateViewName: "AudioTemplateView",
		itemsName: "items"
	},

	/* Blog feeds */
	"51a61af7-1e90-4d68-88db-b1e69a0cca59": {
		packageName: "blog",
		cssClass: "blog",
		templateViewName: "BlogTemplateView",
		itemsName: "feeds"
	},

	/* Branches */
	"8849f293-d4b2-3914-67e2-1a8c0003dd8a": {
		packageName: "branches",
		cssClass: "branches",
		templateViewName: "BranchesTemplateView",
		itemsName: "items"
	},

	/* Call-us template */
	"308af5fa-e91b-d7e7-1926-acfea8f266dc": {
		packageName: "notForCp",
		templateViewName: "NotForCpTemplateView",
		cssClass: "notForCp"
	},

	/* Contact Us Page*/
	"083e52df-721d-4ca4-efa3-25161d344f40": {
		packageName: "contactUs",
		cssClass: "contactUs",
		itemsName: "items",
		templateViewName: "ContactUsTemplateView"
	},

	/* Donation Page*/
	"d04a2104-f4bd-5ec1-b25e-c2093624b5be": {
		packageName: "donation",
		cssClass: "donation",
		itemsName: "items",
		templateViewName: "DonationTemplateView"
	},

	/* Poll Page*/
	"e9773a60-828f-6a16-a1fb-770163905537": {
		packageName: "poll",
		cssClass: "poll",
		itemsName: "items",
		templateViewName: "PollTemplateView"
	},

	/* Quiz Page*/
	"0311d37d-6d9f-fc9d-35fd-45b471d2382f": {
		packageName: "quiz",
		cssClass: "quiz",
		itemsName: "items",
		templateViewName: "QuizTemplateView"
	},

	/* events feed */
	"1002937d-8b19-40de-9df5-ba0d1ea2fbb2": {
        packageName: "events",
		cssClass: "events",
		templateViewName: "EventsTemplateView",
		itemsName: "items"
	},

	/* External URL template */
	"0053bbba-1ca1-11e0-89a4-af28e0d72085": {
		packageName: "externalPage",
		cssClass: "externalPage",
		templateViewName: "ExternalPageTemplateView"
	},

	/* Facebook feed */
	"df7d11f3-233c-4d49-8f2a-d1886e07c641": {
		packageName: "facebook",
		cssClass: "facebook",
		templateViewName: "FacebookTemplateView",
		itemsName: "channels"
	},

	"fa7071be-8262-3b0d-b439-d2edd1ac35ec": {
		packageName: "favorites",
		cssClass: "favorites",
		templateViewName: "FavoritesTemplateView"
	},

	/* form */
	"79eec590-f806-f7ac-946b-1fd9c90283ba": {
		packageName: "form",
		cssClass: "form",
		templateViewName: "FormTemplateView",
		itemsName: "items"
	},

	/* Instagram */
	"e0adcb11-f7bb-8107-1cd0-77690221f31c": {
		packageName: "photos",
		cssClass: "instagram",
		templateViewName: "InstagramTemplateView",
		itemsName: "items"
	},

	/* Links template */
	"fc6700a7-a11e-de90-93f8-7357f9f0037f": {
		packageName: "links",
		templateViewName: "LinksTemplateView",
		cssClass: "links",
		itemsName: "items"
	},

	/* Link Template - NOTE: also for Web Module (its the same in CP and webApp, and in native, the link is button - so we never get the page) */
	'c54d24ef-faf5-45dd-8859-85e3ebe7cecf': {
		packageName: "webModule",
		templateViewName: "WebModuleTemplateView",
		cssClass: "webModule",
		itemsName: "items"
	},
    /* PDF Template  */
    '6c2faa10-d8ff-11e3-9c1a-0800200c9a66': {
        packageName: "webModule",
        templateViewName: "WebModuleTemplateView",
        cssClass: "webModule",
        itemsName: "items"
    },
	/* Web Module Template - NOTE: also for link (its the same in CP and webApp, and in native, the link is button - so we never get the page) */
	'9eea8149-956c-46f9-8597-167401c63cd7': {
		packageName: "webModule",
		templateViewName: "WebModuleTemplateView",
		cssClass: "webModule",
		itemsName: "items"
	},

	/* LiveAlbum template */
	"26ae8ccc-5464-7979-4fdf-3a13f166ffff": {
		packageName: "photos",
		cssClass: "photos",
		templateViewName: "PhotosTemplateView",
		itemsName: "feeds"
	},

	/* LivePerson template */
	"a00b52bb-ff49-704f-bdf3-fb0bd0fd4739": {
		packageName: "livePerson",
		templateViewName: "LivePersonTemplateView",
		cssClass: "livePerson",
		itemsName: "tabs"
	},

    /* loyaltyCards template */
    "9953766f-6b47-4878-8d38-b9cde750fe58": {
        packageName: "loyaltyCards",
        cssClass: "loyaltyCards",
        templateViewName: "LoyaltyCardsTemplateView",
//        wideTemplateViewName: "LoyaltyCardsWideTemplateView",
        itemsName: "items"
    },

	/* Mail-us feed */
	"ec79d314-f6aa-f396-a651-3f9b3344dd99": {
		packageName: "notForCp",
		templateViewName: "NotForCpTemplateView",
		cssClass: "notForCp"
	},

	/* Map */
	"aca2f190-b22b-920d-f12a-998101ad4b70": {
		packageName: "map",
		cssClass: "map",
		templateViewName: "MapTemplateView",
		itemsName: "items"
	},

	/* Photos */
	"3b11bcdf-ba5e-4eaa-9059-ea580b3f1681": {
		packageName: "photos",
		cssClass: "photos",
		templateViewName: "PhotosTemplateView",
		itemsName: "feeds"
	},

	/* Reviews feed */
	"7a2641b0-ceb2-48d6-b715-344198c73dd3": {
		packageName: "reviews",
		cssClass: "reviews",
		templateViewName: "ReviewsTemplateView"
	},

	/* Coupons  */
	"0255eb38-1fb5-4b65-abee-b6fdb69c8f07": {
		packageName: "coupons",
		cssClass: "coupons",
		templateViewName: "CouponsTemplateView"

	},

	/* Menu  */
	"8901e95e-4dc9-411f-835a-0f18a7872122": {
		packageName: "menu",
		cssClass: "menu",
		templateViewName: "MenuTemplateView",
		itemsName: "items"

	},

	/* Speakers. NOTE: we use the same template also for "Agenda" template*/
	"ff4532d2-9137-8da2-f97f-be8b3ddd08e4": {
		packageName: "agenda",
		cssClass: "agenda",
		templateViewName: "AgendaTemplateView",
		itemsName: "items"
	},

	/* Static HTML */
	"27f91d0a-42c0-48fa-90a8-7138641ddecf": {
		packageName: "staticHtml",
		cssClass: "staticHtml",
        templateViewName: "StaticHtmlTemplateView",
        itemsName: "notes"
	},

	/* Subscribe template */
	"c6bb3e68-0ea7-43dc-a358-b40d9b75d224": {
		packageName: "subscribe",
		cssClass: "subscribe",
		templateViewName: "SubscribeTemplateView"
	},

	/* Twitter feed */
	"a77583ef-758f-45f3-9ad1-9704d82a2154": {
		packageName: "twitter",
		cssClass: "twitter",
		templateViewName: "TwitterTemplateView",
		itemsName: "feeds"
	},

	/* Users */
	"a95e67d5-4816-11c2-318d-fe64a33e32d2": {
		packageName: "users",
		cssClass: "users",
		templateViewName: "UsersTemplateView",
		itemsName: "items"
	},


	/* Video Page*/
	"4680c3f3-e767-4ebf-b112-9ba769c3ff2a": {
		packageName: "video",
		cssClass: "video",
		templateViewName: "VideoTemplateView",
		itemsName: "items" // NOTE: in "youtube" template it is "channels"!
	},

	/* YouTube feed - NOTE: we use "video" template also for youtube */
	"a7bf6078-3f92-4b90-acf2-b122903bc846": {
		packageName: "video",
		cssClass: "video",
		templateViewName: "VideoTemplateView",
		itemsName: "channels" // NOTE: in "video" template it is "items"!
	},

	/* Collections Page */
	"6181507a-fdf4-4b90-a270-cbd286603443": {
		packageName: "collections",
		cssClass: "collections",
		templateViewName: "CollectionsTemplateView",
		wideTemplateViewName: "CollectionsWideTemplateView",
		itemsName: "items"
	},

    /* Store Page */
    "567882ad-f783-4bc6-bbe6-c5eb3b7669db": {
        packageName: "store",
        cssClass: "store",
        templateViewName: "StoreTemplateView",
        wideTemplateViewName: "StoreWideTemplateView",
        itemsName: "items"
    },

	/* Reports Page */
	"38ab2b78-a1ad-42f8-8cb7-9475498c0f30": {
		packageName: "reports",
		cssClass: "reports",
		templateViewName: "ReportsTemplateView",
		itemsName: "items"
	},

	/* Home Page */
	"8d7507ff-317e-44b1-9ad3-776ad52d6ee2": {
		packageName: "homepage",
		cssClass: "homepage",
		itemsName: "items"
	},

	/* MyProfile page */
	"fe6a4b7d-cf62-172e-8eba-a231dd39eb20": {
		packageName: "myProfile",
		cssClass: "myProfile",
		templateViewName: "MyProfileTemplateView",
		itemsName: "items"
	},

	/* Inbox page */
	"a8c1cd8e-7e55-828d-3bd2-fb2122472fa3": {
		packageName: "inbox",
		cssClass: "inbox",
		templateViewName: "InboxTemplateView",
		itemsName: "items"
	},

	/* Custom native page */
	"11111111-1111-1111-1111-111111111111": {
		packageName: "customNative",
		cssClass: "customNative",
		templateViewName: "",
		itemsName: "items"
	},

    /* QR scanner page */
    "3f9666a7-3fbb-428d-9149-7622ef126e26": {
        packageName: "qrscanner",
        cssClass: "QRscanner",
        templateViewName: "QRScannerTemplateView"
    }

};

// Application mode
var appMode = {
	normal: 0,
	experience: 1,
	developers: 2
};

// Application header types
var headerTypes = {
	textHeader: 0,
	imageHeader: 1,
	imageAndTextHeader: 2
};

// Navigation layout types
var navigationLayoutTypes = {
	none: -1,
	bottomBar: 0,
	topBar: 1,
	list: 2,
	grid: 3,
	sideMenu: 4,
    dynamicGrid: 5
};

// Dynamic grid scroll types
var gridScrollTypes = {
	vertical: "vertical",
    horizontal: "horizontal"
};

// Ad display types
var adDisplayTypes = {
	text: 1,
	image: 2,
    adsense: "adsense"
};

// Ad providers types
var adProvidersTypes = {
    //1 - default?
    //2 - admob?
	adsense: 3
};

// Application layout (wide: tablets, browsers .. narrow: mobile devices)
//TODO: do "unknown" as 0, narrow as 1, etc.
var layoutFormat = {
	unknown: -1,
	narrow: 0,
	wide: 1
};

// Communication type between the pages and the application base.
var comTypeEnum = {
	postMessage: 0,
	iframeMessage: 1,
	nativeMessage: 2
};

// The message protocol in the inter pages communction.
var protocolTypeEnum = {
	rpc: 0,
	event: 1
};

// Social share services constants
var socialServices = {
	Facebook: 'FACEBOOK',
	Email: 'EMAIL',
	Twitter: 'TWITTER'
};

// Request type enumerator, these are the different
// types of requests we can perform as part of our services, each
// type might be relevant in different scenarios
var executeTypeEnum = {
	// FORCE_NETWORK: This mode forces the service to go to the network (even if we have a
	// a valid cache).
	FORCE_NETWORK: 0,

	// HIT_AND_RUN: This mode will return the cache service response (if cache exists and is valid, or allowExpiredCacheHit is set). 
	// It will attempt to first return the cached result. 
	// If the cache is expired, we will go to the network and bring the content again (calling success callback again)
	HIT_AND_RUN: 1,

	// HIT_AND_SILENT: This mode will return the cache service response (if cache exist). If the
	// cache is expired or if not, it will first return the cached result. However, if the cache
	// is expired, we will go to the network and bring the content again, saving it silently to cache, not
	// calling any more callbacks
	HIT_AND_RUN_SILENT: 2,

	// HIT_ON_NETWORK_FAIL: This mode will try to bring the service from the network. In case
	// of failure (for example, no network connectivity), the cached version will return if its valid, or if allowExpiredCacheHitOnFail is set
	HIT_ON_NETWORK_FAIL: 3,

	// NORMAL: This mode will return a cached response if one exists and is not expired. 	
	// Does not "RUN" to the network in case of cache hit.
	// allowExpiredHit option is invalid for this executeType
	NORMAL: 4
};

// Execute service response types, we will get this flag for
// every execute service request, in addition to the service reply
var responseTypeEnum = {
	// We got this response from the network
	NETWORK: 0,

	// We got this response from a valid cache (not expired cache)
	VALID_CACHE: 1,

	// We got this response from cache, but it's expired
	EXPIRED_CACHE: 2
};

// The UI types of getting data for CMS service:
var loadingTypeEnum = {
    NORMAL: 0 // for initial "get data" (= e.g.: move to page with list page). this is the default.
    ,REFRESH: 1 // for "refresh" button click
    ,SILENT_REFRESH: 2 // = refresh that we do without user action, e.g.: after long time.
    ,SHOW_MORE: 3 // = click on "show more" button
};

var socialServiceReturnType = {
	FACEBOOK: 1,
	TWITTER: 2
};

var ExternalContentTypes = {
	BLOG_POST: 1,
	STATIC_HTML: 2
};

var VideoTypes = {
	GENERAL: 'generalVideoType',
	YOUTUBE: 'youtubeVideoType'
};

// Specifies the merge types for an update
var MediaLibraryMergeTypes = {
	Overwrite: 0,
	/* Overwrite will destroy any previous instance of an item */
	Override: 1,
	/* Override will only replace the values provided in the new item (keeping unreferenced values intact) */
	Merge: 2 /* Merge will deep clone the changes */
};

// Specifies the type of items to include in the livrary
var MediaLibraryIncludeItems = {
	None: 0,
	/* None: do not include any items, only structure */
	Playlists: 1,
	/* Playlists: include items of known playlists */
	Unknown: 2,
	/* Unknown: include items of unknown playlists - items not associated with any playlist */
	All: 3 /* All: include all items*/
};

// Photo upload user types.
var PhotoUploadUserTypes = {
	NONE: 0,
	FACEBOOK: 1
};

var FacebookCountStatus = {
    error : 'error',
    deprecatedCount : 'dep_count',
    ok : 'ok'
};

// ---------------------
// GENERAL CONSTANTS
// ---------------------

// Strings constants
var RETURN_STATE_INFO = 'return_state_info';
var RETURN_FUNCTION_FACEBOOK_SHARE = 'handleFacebookShare';
var TWITTER_TOKENS = 'twitter_credentials';
var SOCIAL_USER_CANCELED = 'user_canceled';

// Application version defintion
var APP_VERSION = "4.8.0.4";

// Different environments service maps
var DEV_SERVICEMAP_URL = "http://servicemap.mobile.site-services.com/mobile";
var QA_SERVICEMAP_URL = "http://servicemap.mobile.qasite-services.com/mobile";
var PROD_SERVICEMAP_URL = "http://servicemap.como-services.com/mobile";

var TEST_LOYALTY = false;
var TEST_STORE = false;
var TEST_BRANCHES = false;

// ---------------------
// APP SETTING
// ---------------------

//Do we want to see favorites stuff in agenda template?
var USE_AGENDA_FAVORITES = false;
var USE_DATADUMP_SERVICE = false;

var DEBUG = 1; /* Debug / Production */
var PREVENT_DEVICE_DETECT = DEBUG && false;							/* For Debugging - Prevent DeviceDetector from automatically setting DEVICE and LAYOUT (take those defined in constants)
var LANG_TEST = null;												  /* For testing translation. e.g.: "fr-FR", default is NULL */
var NAVIGATION_PAGE_GUID = '00000000-0000-0000-0000-000000000002'; /* Navigation page GUID (for statistics) purposes */
var NAVIGATION_PAGE_ALIAS = 'app-navigation-page';					  /* Navigation page alias (e.g.: part of the URL) */
var NAVIGATION_PAGE_ID = '_navpage';                    /* Navigation page alias (e.g.: part of the URL) */

var APP_MODE = appMode.normal; /* Application mode */
//var APP_MODE = appMode.experience;	  			  				  /* Application mode */

//var PLATFORM = platformEnum.webApp; /* Deployment platform */
var PLATFORM = platformEnum.nativeApp; 	  						  /* Deployment platform */
//var PLATFORM = platformEnum.simulator; 	  						  /* Deployment platform */
//var PLATFORM = platformEnum.gadget;								  /* Deployment platform */
//var PLATFORM = platformEnum.playground;							  /* Deployment platform */

//var DEVICE = deviceTypeEnum.iphone; /* Device type */
var DEVICE = deviceTypeEnum.android;								  /* Device type */
//var DEVICE = deviceTypeEnum.winPhone;								  /* Device type */
//var DEVICE = deviceTypeEnum.symbian;								  /* Device type */
//var DEVICE = deviceTypeEnum.bada;									  /* Device type */

var DEVICE_VARIANT = deviceVariantEnum["default"];

var LAYOUT = layoutFormat.narrow; /* Device screen layout */
//var LAYOUT = layoutFormat.wide; 	  								  /* Device screen layout */

var FORCE_NO_CACHE = false && DEBUG; /* Force adding "nocache=1" to all services, this can only happen in DEBUG mode!! */

var SERVICEMAP_URL = DEV_SERVICEMAP_URL; /* Service map url (PRODUCTION / QA / DEV) */
//var SERVICEMAP_URL = QA_SERVICEMAP_URL;                               /* Service map url (PRODUCTION / QA / DEV) */
//var SERVICEMAP_URL = PROD_SERVICEMAP_URL;                              /* Service map url (PRODUCTION / QA / DEV) */

// No application ID (Conduit Revu or Simulator)
var APP_ID = null;

var IS_RTL = false;



//-------------
// Broshi App
//-------------
//var APP_ID = '2d77d4bf-771f-4fa6-8449-53576c246625';
//var APP_ID = '29f77d6d-e023-41f7-a431-a726bb284560';

// ---------------------
// DEV APPS
// ---------------------
//var APP_ID = '424BC29A-3C74-413E-9701-CFA2D91F533C'; // macaroons - dynamic grid
//var APP_ID = '911DAC1C-4E2B-438A-9C9D-A8AFEDD225B9'; // beauty saloon - dynamic grid
//var APP_ID = '7D67D290-E568-4258-87E7-EF4AF84388BA'; // car agency - dynamic grid
//var APP_ID = '82ca34ef-cbd8-453b-9584-980ffcffd5aa'; // disco - dynamic grid + module
// var APP_ID = '5ecd3d66-2c0e-4922-b42e-5c46df8d0f57'; // yoni's empty app
// var APP_ID = 'ac317782-4918-4117-95d4-226431bb655d'; // Mati - HEBREW! (dev)
//var APP_ID = '316f9795-1015-4fb7-861f-25e62ee4966c'; // Mati (dev - light)
// var APP_ID = '4152acb9-5749-4235-b8c8-cc5abc60db21'; // inapp purchase test
// var APP_ID = '86147272-9981-4c3d-a115-723bb69e4cd7'; // Foodexpressed (yoel)
// var APP_ID = '11e15e13-cac2-45bd-9d3f-b86cf4ceef56'; // External links purchase.
// var APP_ID = 'c904770c-7517-4a0e-8189-1272c0552fae'; // conduit -wibiya test
// var APP_ID = '4550D0D8-C000-4B33-9EC4-239A60221808'; // SXSW (DEV)
//var APP_ID = '48dea1e6-5845-4051-9c02-b2c6e63e8b90'; // Mr. Sela app (dev)
//var APP_ID = 'c05c8acf-b62c-4e14-b3b0-169a4f6a7014'; // Mati (dev)
//var APP_ID = '7285773a-e732-45f0-a04e-2b65f7c273e9'; // Mati donation (dev)
//var APP_ID = 'd56b24a2-10ab-4c4d-bf7f-9836254d3b94'; // Tomer (dev)
//var APP_ID = '72ea43d0-2358-419f-ac80-60df6b30448a'; //revital text app

// ---------------------
// QA APPS
// ---------------------
// var APP_ID = 'd51be9a5-c1ca-4aec-a2d8-cb1738a89271'; // gunz&roses events testing app
// var APP_ID = 'b4932dcb-32c7-4687-a30b-c3907f8df0b9'; // igor QA coupons
// var APP_ID = '9b9ed3f9-cdca-4803-a905-54ad38f24585'; // IGOR TEST APP
// var APP_ID = 'e6240141-34dc-4df5-beea-9be68f000b99'; // QA IGOR TEST APP with web module as first page
// var APP_ID = '40d00b78-7796-45fb-a272-a3b373d27581'; //igor alfa romeo app
// var APP_ID = '9093e46e-8edc-4a81-a6cd-d1e75ee8f997'; //zara1
// var APP_ID = 'd5b13c71-061c-44bf-986d-76a0addc64b8'; // igor QA
// var APP_ID = '50e298fd-a693-4a0a-8d6f-c5b1da64ff5e'; // Yoel's QA App
// var APP_ID = '8e303f2f-1f3b-4a41-b96b-77639895ad11'; // topgear2
// var APP_ID = 'eb3d6abd-5dc7-4d77-bca7-c714a234bc0b'; // Igor's QA IgorCallll
// var APP_ID = 'f014c677-6187-42b3-9124-0f0aac6c022d'; // twitter direct (no CMS)
 //var APP_ID = 'ff838fb3-b46e-465f-a3ce-777d7571b09d'; // revital's QA app
//var APP_ID = '789cc2a8-28b3-4132-aff0-2cc170b72a5f'; // revital events
//var APP_ID = 'c7f988f5-f3c7-468d-9eb9-5059b871c0b7'; // Ran's QA app
// var APP_ID = '102ef1c4-f20a-4e86-a6ef-e198f7d1874d'; // SXSW (QA)
// var APP_ID = '96d25bb6-d8ad-4801-8f57-6ae22748fea4'; // Drorly Ultimate App.
//var APP_ID = '4ebeee16-dc97-4b0e-865a-395eea7f8ab8'; // Mati's QA App
// var APP_ID = 'ac610b7c-af4c-447d-971b-7d2dc5fbcf7f'; // Ultimate Ruth (bug #2541)
// var APP_ID = '29f77d6d-e023-41f7-a431-a726bb284560'; // Oren QA

// ---------------------
// PRODUCTION APPS
// ---------------------
// var APP_ID = '1fc0022f-8a91-4f73-84ad-854411ae2675'; // kobi peretz
// var APP_ID = '576d5595-0935-4e8f-bc30-33a960ab3c02'; // Meek Mill
// var APP_ID = '71a5e225-6edb-4b66-a32e-8ab8fc15a412'; // Calcalist PROD
// var APP_ID = '3803fba9-f739-4d81-bba7-f11a1bf142c3'; // Apps world PROD
// var APP_ID = 'f04d4fbd-c219-4be6-be0f-19dfc36be8e7'; // PROD: bio bug
// var APP_ID = 'e2c36841-5abc-4bb6-906a-14c28da96c74'; // SF MusicTech PROD
// var APP_ID = '6fd9fa2c-f0fe-45d0-83c9-e9d5db0a5924'; // Glee PROD
// var APP_ID = 'b691c8b3-af60-4dc7-9201-e6090eca3be0'; // pierce the veil
// var APP_ID = 'de994537-5331-48ed-9644-2810b7b3d03c'; // SXSW (Production)
// var APP_ID = '4bff7344-8dc9-455b-9b4e-9d13415b5f96'; // Paradise Travel
// var APP_ID = '7a395a81-f591-4bfb-b6e4-88a9e16ab0fb'; // ScoreBoard
// var APP_ID = '77af3a70-f556-4d95-8ca1-d6188a34ed97'; // 8 news
// var APP_ID = 'fca0cfb5-a039-4b81-a6e0-72fe05b69bcc'; // Stichting LVK
// var APP_ID = '6c78b2e3-5350-4e1a-8539-507a9f802282'; // (Swedish app)
// var APP_ID = '5362a3f1-bb90-4512-b6ae-0833b7b926b0'; // Olympics
// var APP_ID = 'c961ac14-1c6d-47da-bbab-9542e9020355'; // Gold Motel (Tomer's app)
// var APP_ID = 'c3b73ac3-6d43-4b22-b06f-11066dabf72d'; // Andy Ward
// var APP_ID = 'e997c321-434e-4918-8b01-f73225d6a6e1'; // Takeo Spikes
// var APP_ID = '2abec763-ef1d-46d7-9d4e-9351464c019d'; // Urge Overkill
// var APP_ID = 'd649aef1-bfbd-444e-980f-86dc83a08468'; // The next web
// var APP_ID = '5fa580e5-f597-48b3-88c7-f8736d707e64'; // Conduit Mashup
// var APP_ID = 'e10a6db0-705a-4e38-97d1-7e7fe27d1447'; // Udi - offer nissim
// var APP_ID = '0d8211a4-c07e-4da6-9e1c-64e0c1be975e'; // "Mobile by Conduit" Midem app
// var APP_ID = 'a5f56b7b-d659-4322-91ab-47c17b60726d'; // FC conduit
// var APP_ID = '1d55b1da-e4e4-4724-a4c6-306e05162919'; // BFL - Benjamin Francis Leftwitch
// var APP_ID = '893a8dda-05a7-45d8-b31c-ead1aeb58426'; // Train app (Tali)
// var APP_ID = 'c6305f36-7d68-4ff9-91e4-61dd40b96dd5'; // Mati Hebrew App
// var APP_ID = 'd34e9bad-4fb3-48b9-9ff6-16559ed066eb'; // dar a volta (bug #1009)
// var APP_ID = 'f540b69d-6137-4416-b86f-cea1afe31bf7'; // MagicMobile53 (bug #1484)
// var APP_ID = '0f7020ae-bd9c-4f9d-b3e3-343cf12a70d8'; //  (bug #2480)
// var APP_ID = '43f8129f-0964-428a-8930-1b1b42ef5f8f'; // LYC (bug #2496)
// var APP_ID = '3be78076-0dcb-4b9f-9ece-b337fe35bc50'; // garden show (bug #2496)
// var APP_ID = '9b726f44-0751-4e99-99e5-7a772d1ebb9e'; // oren broshi app (bug #2859)
// var APP_ID = 'd5859787-7f2b-48f4-9b87-a2e241fb54cd'; // with external page
//var APP_ID = '600d6a8d-131d-4d5d-b38c-861da2925469'; // The Glengarry News (bug #2308)
//var APP_ID = '853cb8fe-b7db-4b3f-bcf1-c98b4e0158e9'; // LSS Summit San Diego (bug #622)
//var APP_ID = '323666de-61b7-4aef-913b-3cc533ad532a'; // igor's app
//var APP_ID = 'ab7db787-bbe5-4ab7-9d6a-a3f51b90cf56'; // Eylon's app
//var APP_ID = 'f9c1d778-d04a-41c2-8188-d0ed0b2d7e1d'; // Mati's app

// Top 10 apps (17/02/14) (Total Installs):
// =======================
//var APP_ID = '7A14DD74-51A2-4CE1-9F9E-94925E80EE09'; // Eyal Golan
// var APP_ID = '0BFA8976-788E-4707-AA92-A7D89A980214'; // La Mega
// var APP_ID = '983D78A7-D02F-4762-B49D-69FB2DC5C87C'; // FB Fast
// var APP_ID = '7A30AEF5-4085-49E7-99B0-863F2FDC7E57'; // CoolRom
// var APP_ID = '10D74B08-9879-4E80-BDA4-2508F9203A57'; // ARY NEWS
// var APP_ID = '402E8375-0F66-47D3-8D61-D89FEFE67266'; // arabic... (alhussainy?)
// var APP_ID = 'e7dddad6-9edc-49ee-ac76-e4fbea2fc807'; // F1
// var APP_ID = '9E22B2FD-3565-408A-B9B8-A242CCC6C80D'; // CubanFlow
// var APP_ID = '45E13C31-C4C3-4628-9BDC-7E46B0546BF6'; // arabic... (picfaceb?)
// var APP_ID = '85AFD64B-0022-480B-8BF5-40D804404922'; // arabic... (KHBARNA Maroc)

// Top 10 apps (11/03/13) (Installs from the last 30 days):
// =======================
// var APP_ID = '98546E06-944E-439E-AB8B-7EB17FFA6178'; // arabic... (songs gulf?)
// var APP_ID = '42CFC4F9-F3B3-4D17-877B-863BC38C3CDA'; // chinese... (movies online for free)
// var APP_ID = '0BFA8976-788E-4707-AA92-A7D89A980214'; // La Mega
// var APP_ID = 'e7dddad6-9edc-49ee-ac76-e4fbea2fc807'; // F1
// var APP_ID = '7A14DD74-51A2-4CE1-9F9E-94925E80EE09'; // Eyal Golan
// var APP_ID = '10D74B08-9879-4E80-BDA4-2508F9203A57'; // ARY NEWS
// var APP_ID = 'EAF8EE65-0585-4537-80FC-732505BC4214'; // Disney Movie Songs
// var APP_ID = '6FCC9704-06CB-4897-BB6F-4D7832527A5F'; // arabic... (images comuunity?)
// var APP_ID = 'A05A049A-C9C9-487A-90A6-7F6F411EDC10'; // arabic... (kitchen eve?)
// var APP_ID = '77E17307-76E9-46DB-9FD9-DC78166F1D13'; // arabic... (publication.net?)

// Top 10 apps (21/10/12) (Usages from the beginning of time):
// =======================
// var APP_ID = 'D8221E2F-6894-4535-9CF9-05C52DE78780'; // MakeUseOf (Mobile)
//var APP_ID = '7A14DD74-51A2-4CE1-9F9E-94925E80EE09'; // Eyal Golan
// var APP_ID = '0BFA8976-788E-4707-AA92-A7D89A980214'; // La Mega
// var APP_ID = '693fb71f-f4aa-4158-8703-a7656c1fc61d'; // AllHipHop
// var APP_ID = 'e7dddad6-9edc-49ee-ac76-e4fbea2fc807'; // F1
// var APP_ID = '5A23D399-5703-4F01-8F48-4FDFB64A9EE5'; // arabic... (y222.net?)
// var APP_ID = 'E3BE2178-755A-498D-862C-0D5906171379'; // arabic... (hawaa.com?)
// var APP_ID = '9E22B2FD-3565-408A-B9B8-A242CCC6C80D'; // CubanFlow
// var APP_ID = 'F3E0A743-5886-46CA-81F9-230054B033FC'; // Fashion4Arab
// var APP_ID = 'F3A985D1-36E7-4C20-A3B0-22653313FD2C'; // Artie Lange

// Top 10 apps (28/3/12):
// =======================
// var APP_ID = 'e7dddad6-9edc-49ee-ac76-e4fbea2fc807'; // F1
// var APP_ID = '27d87af3-a4e1-434c-82da-84d1483b22fe'; // DJ Celteric
// var APP_ID = 'b820e9e1-2b98-4af3-8e61-be1717d7e59f'; // EyeShadow Guru
// var APP_ID = 'f8683015-1287-4063-b804-3a53f2ffe3ff'; // One Direction
// var APP_ID = 'e41ead96-6c22-4a97-bc60-813f00d2d757'; // DJ cre8
// var APP_ID = '8b3851e3-7547-4f84-bb05-b551d627e728'; // Galaxy Note
// var APP_ID = 'd613dfe7-26fa-4dfd-96f5-b21fb6710c3b'; // AT2W
// var APP_ID = '693fb71f-f4aa-4158-8703-a7656c1fc61d'; // AllHipHop
// var APP_ID = 'ce65c135-3630-4e09-ade8-f5e26b24d17e'; // Galaxy SII
// var APP_ID = 'bf5a3d6c-14d4-410e-b696-6887e992e10a'; // xxxxxx

// Top 10 apps (Jan 2012):
// =======================
// var APP_ID = '27d87af3-a4e1-434c-82da-84d1483b22fe'; // DJ Celteric
// var APP_ID = 'ec5679d1-a34f-4b7a-8996-506a98d0e7d2'; // SanSimera.gr
// var APP_ID = 'bf5a3d6c-14d4-410e-b696-6887e992e10a'; // 3X Gallery
// var APP_ID = 'e266a000-311f-4170-924b-0dd511c854db'; // MiddleEasy
// var APP_ID = 'b820e9e1-2b98-4af3-8e61-be1717d7e59f'; // EyeShadow Guru
// var APP_ID = 'f8683015-1287-4063-b804-3a53f2ffe3ff'; // One Direction
// var APP_ID = 'c5753179-4d26-4758-8cfa-5afc8ea0e78e'; // iTopMusic
// var APP_ID = 'cc8c1aab-71c5-4ae5-ac9b-a7527506fe8d'; // DMode Radio
// var APP_ID = '37e1d4e4-46b4-4738-b186-6857e65ebd90'; // Fashion4Arab
// var APP_ID = '1ba8cc2f-de7b-4a07-a300-dfcb3a9c549b'; // SikhNet

PLATFORM = platformEnum.nativeApp
DEVICE = deviceTypeEnum.android
var DEBUG = 0;
var AMS_VERSION = "1.146.266.820";
var PLATFORM = 1;
var DEVICE_TOKEN = 2;
var APP_ID = "08837ee2-2c98-4d98-b17e-d9182006e1c1";
var APP_MODE = 0;
var SIMULATOR = 0;
var SERVICEMAP_URL = PROD_SERVICEMAP_URL;

var __dataDump={"images":[],"services":[{"data":{"services":[{"name":"AMS_APP_GET","url":"http:\/\/app.como-services.com\/api\/app\/{appId}\/{deviceType}?appVersion={appVersion}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_FEEDS_GET","url":"http:\/\/content.como-services.com\/api\/feeds\/{take}\/{skip}?url={feedUrl}&extraInfo={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_TWITTER_USER_GET","url":"http:\/\/cms.como-services.com\/twitter\/user\/{userName}\/{take}\/{skip}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_TWITTER_QUERY_GET","url":"http:\/\/cms.como-services.com\/twitter\/query\/{query}\/{type}\/{take}\/{skip}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_YOUTUBE_GET","url":"http:\/\/cms.como-services.com\/youtube\/{query}\/{type}\/{skip}\/{take}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_PHOTOS_GET","url":"http:\/\/content.como-services.com\/api\/photos\/{type}\/{userName}\/{take}\/{skip}\/?extraInfo={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_PHOTOS_ALBUMS_GET","url":"http:\/\/content.como-services.com\/api\/photos\/{type}\/albums\/{username}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_FACEBOOK_USER_GET","url":"http:\/\/cms.como-services.com\/facebook\/user\/{pageName}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_FACEBOOK_DATA_GET","url":"http:\/\/cms.como-services.com\/facebook\/data\/{pageName}\/{take}\/{skip}\/?params={}","reload_interval_sec":7200,"method":"GET"},{"name":"UMS_USER_POST","url":"http:\/\/ums.como-services.com\/login\/user","method":"POST"},{"name":"PROXY_WEBSLICE","url":"http:\/\/proxy.como-services.com\/webslice?url={url}","reload_interval_sec":12092600,"method":"GET"},{"name":"AMS_APPID_GET","url":"http:\/\/app.como-services.com\/api\/code\/{code}\/{email}\/pwd","reload_interval_sec":7200,"method":"GET"},{"name":"UMS_USAGE_PUT","url":"http:\/\/ums.como-services.com\/usage\/log","reload_interval_sec":7200,"method":"POST"},{"name":"ADS_POST","url":"http:\/\/ads.como-services.com\/{appId}\/{deviceType}","reload_interval_sec":600,"method":"POST"},{"name":"CMS_RAYV_GET","url":"http:\/\/cms.como-services.com\/rayv\/feeds\/{distributer}\/{listType}\/{take}\/{skip}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"MOBILE_SOCIAL_LOGIN","url":"http:\/\/social.como-services.com\/connect\/facebook?appId={appId}&type={deviceType}&ret={returnUrl}","method":"GET"},{"name":"CMS_MEDIA_VIDEO_GET","url":"http:\/\/content.como-services.com\/api\/media\/video\/{deviceType}\/{take}\/{skip}\/?url={url}&extraInfo={params}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_MEDIA_AUDIO_GET","url":"http:\/\/content.como-services.com\/api\/media\/audio\/{deviceType}\/{take}\/{skip}\/?url={url}&extraInfo={params}","reload_interval_sec":7200,"method":"GET"},{"name":"AMS_TRANSLATION_GET","url":"http:\/\/app.como-services.com\/api\/translate\/{product}\/{culture}\/{deviceType}","reload_interval_sec":1200,"method":"GET"},{"name":"LIVE_ALBUM_PHOTO_POST","url":"http:\/\/livealbum.como-services.com\/Album\/{appId}\/{parentSocialId}\/{socialId}\/{albumId}\/{tagWithUserId}\/","reload_interval_sec":7200,"method":"POST"},{"name":"TWITTER_API_PROXY_POST","url":"http:\/\/apiproxy.como-services.com\/twitter\/{tId}?sshkey={sshKey}&hts={hts}&url=http%3a%2f%2fapi.twitter.com%2f1%2fstatuses%2fupdate.json","reload_interval_sec":7200,"method":"POST"},{"name":"SOCIAL_LOGOUT","url":"http:\/\/social.como-services.com\/ConduitLogout.aspx","reload_interval_sec":7200,"method":"GET"},{"name":"SIGSERV_HTTP_GET","url":"http:\/\/sub.conduit-push.com","reload_interval_sec":7200,"method":"GET"},{"name":"SIGSERV_HTTP_PUT","url":"http:\/\/pub.conduit-push.com","reload_interval_sec":7200,"method":"PUT"},{"name":"SIGSERV_WEBSOCKET_GET","url":"ws:\/\/ws.conduit-push.com","reload_interval_sec":7200,"method":"GET"},{"name":"MOBILE_TWITTER_LOGIN","url":"http:\/\/social.como-services.com\/twitter\/SignIn?appId={appId}&type={deviceType}&ret={returnUrl}","reload_interval_sec":7200,"method":"GET"},{"name":"LIVE_ALBUM_EULA_GET","url":"http:\/\/como.ourtoolbar.com\/eula\/","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_CALENDAR_GET","url":"http:\/\/cms.como-services.com\/calendar\/{type}\/?id={id}&max-results={take}&start-index={skip}&since={since}&until={until}&params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"WIBIYA_SUBSCRIBE_GET","url":"https:\/\/api.wibiya.com\/Handlers\/apps\/subscribe_mobile.php?t={token}&e={email}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_MEDIA_ART_GET","url":"http:\/\/content.como-services.com\/api\/media\/art\/?url={url}&extraInfo={params}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_REVIEW_GET","url":"http:\/\/cms.como-services.com\/reviews\/{type}\/?q={query}&max-results={take}&start-index={skip}&params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"NFL_STATS_GET","url":"http:\/\/pages.como.com\/nfl\/player\/{key}\/{id}?info={level}","reload_interval_sec":7200,"method":"GET"},{"name":"IMAGES_REVIEWS_PROVIDER_GET","url":"http:\/\/images.como-services.com\/icon\/100{type}","reload_interval_sec":7200,"method":"GET"},{"name":"INAPP_USER_TOKENS_GET","url":"http:\/\/inapp.mobile.conduit-services.com\/client\/tokens\/{bucketId}?userId={userId}","method":"GET"},{"name":"INAPP_USER_TRANSACTION_POST","url":"http:\/\/inapp.mobile.conduit-services.com\/client\/transaction","method":"POST"},{"name":"CONTACT_CONTENT_PUT","url":"http:\/\/contact.como-services.com\/contact\/client\/{appId}\/{formId}\/?action={action}&postUrl={postUrl}","reload_interval_sec":1200,"method":"POST"},{"name":"CMS_USERS_GET","url":"http:\/\/cms.como-services.com\/users\/{userId}\/{provider}\/{relationType}\/{take}\/{skip}\/?params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"LIVE_ALBUM_PHOTO_V2_POST","url":"http:\/\/livealbum.como-services.com\/Files\/upload\/?groupId={groupId}&appId={appId}&albumId={albumId}","reload_interval_sec":7200,"method":"POST"},{"name":"CMS_CONFERENCE_GET","url":"http:\/\/cms.como-services.com\/agenda\/{type}\/{id}\/{version}\/?ranges={ranges}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_PEOPLE_GET","url":"http:\/\/cms.como-services.com\/agenda\/{type}\/{id}\/{version}\/","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_POLLS_GET","url":"http:\/\/cms.como-services.com\/polls\/{type}\/{pollId}\/","reload_interval_sec":7200,"method":"GET"},{"name":"CONTACT_POLLS_POST","url":"http:\/\/polls.como-services.com\/polls\/result\/","reload_interval_sec":1200,"method":"POST"},{"name":"CMS_CONTENT_ITEMS","url":"http:\/\/cms.como-services.com\/contentItems\/items\/contenthost\/{take}\/{skip}\/?id={id}&params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_CONTENT_COLLECTION","url":"http:\/\/cms.como-services.com\/contentItems\/collection\/contenthost\/{take}\/?id={id}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_CONTENT_ITEMS_SEARCH","url":"http:\/\/cms.como-services.com\/contentItems\/items\/search\/{type}\/{collectionId}\/{take}\/{skip}\/?searchParams={searchParams}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_MENU_GET","url":"http:\/\/cms.como-services.com\/restaurants\/menu\/{provider}\/?query={restid}","reload_interval_sec":7200,"method":"GET"},{"name":"COMMUNITY_SOCIAL_LOGIN_POST","url":"http:\/\/community.como-services.com\/users\/social\/login\/{globalAppId}","reload_interval_sec":7200,"method":"POST"},{"name":"COMMUNITY_SOCIAL_LOGOUT_POST","url":"http:\/\/community.como-services.com\/users\/social\/logout\/{globalAppId}\/{userId}?socialId={socialId}","reload_interval_sec":7200,"method":"POST"},{"name":"CMS_USERS_SEARCH_GET","url":"http:\/\/cms.como-services.com\/users\/{provider}\/{skip}\/{take}\/?globalAppId={globalAppId}&q={search_term}&params={extraInfo}","reload_interval_sec":7200,"method":"GET"},{"name":"DISCUSSION_DISCUSSIONS_GET","url":"http:\/\/discussion.como-services.com\/discussions\/{globalAppId}\/{userId}","reload_interval_sec":7200,"method":"GET"},{"name":"DISCUSSION_MESSAGES_GET","url":"http:\/\/discussion.como-services.com\/messages\/{discussionId}\/{skip}\/{take}","reload_interval_sec":7200,"method":"GET"},{"name":"DISCUSSION_MESSAGES_SEND_POST","url":"http:\/\/discussion.como-services.com\/messages\/{globalAppId}\/{fromId}","reload_interval_sec":7200,"method":"POST"},{"name":"CONTACT_CONTENT_POST","url":"http:\/\/contact.como-services.com\/contact\/client\/v2\/{globalAppId}\/{formId}\/?version={version}&postUrl={postUrl}","reload_interval_sec":7200,"method":"POST"},{"name":"IMAGE_UPLOADER_POST","url":"http:\/\/imageupload.como-services.com\/files\/upload","reload_interval_sec":7200,"method":"POST"},{"name":"CMS_COUPONS_GET","url":"http:\/\/cms.como-services.com\/coupons\/{type}\/{listId}\/{take}\/{skip}","reload_interval_sec":7200,"method":"GET"},{"name":"AMS_PUBLISHER_APPS_GET","url":"http:\/\/app.como-services.com\/api\/publisher\/apps\/{publisherId}","reload_interval_sec":7200,"method":"GET"},{"name":"AMS_APP_STYLE_GET","url":"http:\/\/app.como-services.com\/api\/appstyletemplate\/{styleTemplateId}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_LOYALTYCARDS_GET","url":"http:\/\/cms.como-services.com\/loyalty\/{type}\/{listId}\/{take}\/{skip}","reload_interval_sec":7200,"method":"GET"},{"name":"CONTENTHOST_LOYALTYCARDS_VALIDATE_POST","url":"https:\/\/contenthost.como-services.com\/loyalty\/validate\/{cardId}","reload_interval_sec":7200,"method":"POST"},{"name":"NOTIFICATIONDATA_PUSHDATA_GET","url":"http:\/\/notificationdata.como-services.com\/notification\/data\/{appId}\/{messageId}\/{deviceType}","reload_interval_sec":7200,"method":"GET"},{"name":"REVU_FIRSTLAUNCH_GET","url":"http:\/\/revu.como-services.com\/first?return={returnUrl}","reload_interval_sec":7200,"method":"GET"},{"name":"LIVE_ALBUM_PHOTO_REPORT","url":"http:\/\/livealbum.como-services.com\/Self\/Client\/report\/{appId}\/{photoId}","reload_interval_sec":7200,"method":"GET"},{"name":"STORE_CHECKOUT_BUYNOW","url":"http:\/\/store.como-services.com\/api\/checkout\/buynow\/{productId}?globalAppId={globalAppId}&provider={provider}&purchaseParams={purchaseParams}&providerId={providerId}","reload_interval_sec":7200,"method":"GET"},{"name":"STORE_CATALOG_ITEMS_GET","url":"http:\/\/store.como-services.com\/api\/store\/client\/item\/{storeItemId}\/{take}\/{skip}?rootId={rootId}","reload_interval_sec":7200,"method":"GET"},{"name":"STORE_CATALOG_ITEMS_SEARCH","url":"http:\/\/store.como-services.com\/api\/store\/client\/items\/search\/{catalogId}\/{take}\/{skip}?parentId={parentId}&searchParams={searchParams}","reload_interval_sec":7200,"method":"GET"},{"name":"CONTENT_MEDIA_VIDEO_GET","url":"http:\/\/content.como-services.com\/api\/media\/feed\/video\/{deviceType}\/{type}\/{take}\/{skip}\/?url={url}&extraInfo={params}","reload_interval_sec":1200,"method":"GET"},{"name":"DONATION_DONATE_NOW","url":"http:\/\/donation.como-services.com\/api\/checkout?id={id}&provider={provider}&params={params}&deviceType={deviceType}&globalAppId={globalAppId}&appVersion={appVersion}","reload_interval_sec":7200,"method":"GET"},{"name":"CMS_DONATION_GET","url":"http:\/\/donation.como-services.com\/api\/content\/list\/{donationListId}","reload_interval_sec":7200,"method":"GET"},{"name":"AUTH_REVU_LOGIN_PUT","url":"https:\/\/auth.como-services.com\/revu\/login\/{userName}","reload_interval_sec":7200,"method":"PUT"},{"name":"AUTH_REVU_TOKEN_LOGIN_POST","url":"https:\/\/auth.como-services.com\/revu\/login?token={token}&provider={provider}","reload_interval_sec":7200,"method":"POST"},{"name":"CMS_BRANCHES_GET","url":"http:\/\/businessinfo.como-services.com\/api\/content\/list\/{listId}","reload_interval_sec":7200,"method":"GET"}],"reload_interval_sec":86400},"maxAge":86399,"serviceUrl":"http:\/\/servicemap.como-services.com\/mobile"},{"data":{"id":"08837ee2-2c98-4d98-b17e-d9182006e1c1","publisherId":"714e8fea-39a5-48aa-a21e-4fba98fd5e39","name":"Challenge","label":"Challenge","icon":"http:\/\/s.como.com\/mobile\/df\/ce\/df444df8-f2ce-49fa-8244-88e3d8ae84f5\/Images\/1e7472ba-6957-4bb8-bdc2-fd2cbdddf9c6.Png","layout":{"deviceType":-1,"layoutType":2,"colorTheme":{"id":61,"background":"#00000000","headers":"#FFFFFFFF","mainText":"#FFDF3336","smallText":"#FF9E9E9E","buttons":"#FFAB2B00","navTxt":"#FFFFFFFF","contBtxt":"#FF9E9E9E","contBsubTxt":"#FFB4B4B4","contAbg":"#ffffffff","hdrBg":"#FFd32232","contAhdlTxt":"#ffd32232","navIcn":"#FFFFFFFF","contCsubTxt":"#FFFFFFFF","contBhdlTxt":"#ffd32232","contCbg":"#FFd32232","contAsubTxt":"#FFB4B4B4","contAtxt":"#FF9E9E9E","appBg":"#00000000","contBbg":"#ffffffff","actBtn":"#ff0d0d0d","navBg":"#FFd32232","contCtxt":"#FFFFFFFF","contAbrdr":"#ffd32232","lnkTxt":"#ff0d0d0d","hdrTxt":"#FFFFFFFF","contChdlTxt":"#FFFFFFFF","contBbrdr":"#ffd32232","deviceType":-1,"name":"mono","displayName":"Mono"},"meta":{"bgImage":"http:\/\/s.como.com\/mobile\/df\/ce\/df444df8-f2ce-49fa-8244-88e3d8ae84f5\/Images\/107624d1-152f-4bcc-93f2-cc8fb0a10bc2.Jpeg","material":0,"isRtl":false,"culture":null,"header":{"type":0,"content":"HMT Challenge"}},"template":{"appGeneral":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"appBg"}]}}}},"loadingSmallIcn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAsubTxt"}]}}}},"footer":{"bg":{"type":"background","data":{"facdefault":{"type":"solid","color":"#00000000","shadow":{"isInset":false,"x":"0px","y":"-2px","blur":"3px","color":"#99000000"}}}}},"scrnDiv":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000","shadow":{"isInset":false,"x":"3px","y":"0px","blur":"10px","color":"#99000000"}}}},"brdr":{"type":"border","data":{"default":{"ltrRight":{"color":"#FF000000","width":"1px"}}}}},"scrnDivRight":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000","shadow":{"isInset":false,"x":"3px","y":"0px","blur":"5px","color":"#99000000"}}}},"brdr":{"type":"border","data":{"default":{"right":{"color":"#cc000000","width":"1px"}}}}},"scrnDivLeft":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000","shadow":{"isInset":false,"x":"-3px","y":"0px","blur":"5px","color":"#99000000"}}}},"brdr":{"type":"border","data":{"default":{"left":{"color":"#cc000000","width":"1px"}}}}},"dialog":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#CC141414","shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}}}},"lightBoxBg":{"type":"background","data":{"default":{"type":"solid","color":"#c6FFFFFF"}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FF5C5C5C"}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":false,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"clicked":{"type":"solid","color":"#FFE1E1E1","shadow":{"isInset":false,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"disabled":{"type":"solid","color":"#33333333"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FF898989","width":"1px"},"right":{"color":"#FF898989","width":"1px"},"left":{"color":"#FFBFBBB8","width":"1px"},"top":{"color":"#FFBFBBB8","width":"1px"}},"clicked":{"bottom":{"color":"#FF898989","width":"1px"},"right":{"color":"#FF898989","width":"1px"},"left":{"color":"#FFBFBBB8","width":"1px"},"top":{"color":"#FFBFBBB8","width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FF5F5B5A"},"selected":{"color":"#FF535353"},"disabled":{"color":"#CCCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF5F5B5A"},"clicked":{"type":"solid","color":"#FF535353"},"disabled":{"type":"solid","color":"#CCCCCCCC"}}}},"btn2":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFCDCDCD","shadow":{"isInset":false,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"clicked":{"type":"solid","color":"#FFC2C2C2","shadow":{"isInset":false,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"disabled":{"type":"solid","color":"#33333333"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FFABABAB","width":"1px"},"right":{"color":"#FFABABAB","width":"1px"},"left":{"color":"#FFABABAB","width":"1px"},"top":{"color":"#FFABABAB","width":"1px"}},"clicked":{"bottom":{"color":"#FF8A8A8A","width":"1px"},"right":{"color":"#FF8A8A8A","width":"1px"},"left":{"color":"#FF8A8A8A","width":"1px"},"top":{"color":"#FF8A8A8A","width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FF5F5B5A"},"selected":{"color":"#FF535353"},"disabled":{"color":"#CCCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF5F5B5A"},"clicked":{"type":"solid","color":"#FF535353"},"disabled":{"type":"solid","color":"#CCCCCCCC"}}}}},"adBar":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0.9}}]}]}}}},"brdr":{"type":"border","data":{"top":{"color":{"_replace":[{"param":"contBbg"}]},"width":"1px"}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBhdlTxt"}]}}}}},"pullToRef":{"typeA":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAbg"}]},"shadow":{"isInset":true,"x":"-1px","y":"1px","blur":"2px","color":"#54000000"}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAsubTxt"}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contAbrdr"}]},"width":"1px"}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAsubTxt"}]}}}}},"typeB":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg"}]},"shadow":{"isInset":true,"x":"-1px","y":"1px","blur":"2px","color":"#54000000"}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBsubTxt"}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBsubTxt"}]}}}}},"ribbon":{"txt":{"type":"text","data":{"default":{"color":"#FF000000"}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":false,"x":"0px","y":"0px","blur":"3px","color":"#99000000"}}}},"brdr":{"type":"border","data":{"default":{"top":{"color":"#FF000000","width":"1px"},"bottom":{"color":"#FF000000","width":"1px"}}}}},"greenCrouton":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#F2408422","location":0},{"color":"#e5408422","location":1}]}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FF273f0d","width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#ffffffff"}}},"shadowGradTop":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#B2000000","location":0},{"color":"#33000000","location":0.46},{"color":"#00000000","location":1}]}}},"shadowGradBottom":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#4C000000","location":0},{"color":"#00000000","location":0.82},{"color":"#00000000","location":1}]}}}},"iosPopup":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbrdr"}]}}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBbrdr","params":[{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":1},"if":0.3},{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":1}}]}]}}}}}},"appHeader":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg"}]},"shadow":{"isInset":false,"x":"0px","y":"1px","blur":"3px","color":{"_replace":[{"param":"hdrBg","params":[{"s":{"mul":0.7},"l":{"mul":0.3},"a":{"mul":0.8},"if":0.5},{"s":{"mul":0.7},"l":{"mul":0.2}}]}]}}}}},"bgTint":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg"}]}}}},"brdr":{},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"hdrTxt"}]}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg","params":[{"s":{"mul":0.9},"l":{"mul":0.7},"a":{"mul":0.4},"if":0.5},{"s":{"mul":0.9},"l":{"mul":0.5},"a":{"mul":0.4}}]}]}},"clicked":{"type":"solid","color":"#4C000000","shadow":{"isInset":true,"x":"-1px","y":"1px","blur":"2px","color":"#66000000"}},"selected":{"type":"solid","color":"#4C000000","shadow":{"isInset":true,"x":"-1px","y":"1px","blur":"2px","color":"#66000000"}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrTxt"}]}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"hdrTxt"}]}}}}}},"appHeaderAndroid":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg"}]}}}},"shadowGrad":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#3f000000","location":0},{"color":"#28000000","location":0.04},{"color":"#00000000","location":0.83},{"color":"#00000000","location":1}]}}},"brdr":{"type":"border","data":{"default":{"top":{"color":{"_replace":[{"param":"hdrBg","params":[{"s":{"mul":0},"l":{"mul":100},"a":{"mul":0,"add":0.2},"if":0.1},{"s":{"mul":0},"l":{"mul":100},"a":{"mul":0.1},"if":0.3},{"s":{"mul":0},"l":{"mul":100},"a":{"mul":0.3}}]}]},"width":"2dp"},"bottom":{"color":{"_replace":[{"param":"hdrBg","params":[{"s":{"mul":0},"l":{"mul":0,"add":0.3},"a":{"mul":0,"add":0.2},"if":0.2},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.2}}]}]},"width":"4dp"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"hdrTxt"}]}}}},"actIcn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrTxt"}]}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrTxt"}]}}}},"refresh":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"lnkTxt"}]}}}}},"spinnerMenu":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg","params":[{"s":{"mul":0.8},"l":{"mul":0,"add":0.4},"if":0.2},{"s":{"mul":0.8},"l":{"add":0.2},"if":0.4},{"s":{"mul":0.7},"l":{"add":0.1},"if":0.7},{"s":{"mul":0.7},"l":{"add":0.3},"if":0.9},{"s":{"mul":0.7},"l":{"mul":0.8}}]}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"hdrBg","params":[{"s":{"mul":0.9},"l":{"mul":0,"add":0.3},"if":0.2},{"s":{"mul":0.9},"l":{"add":0.1},"if":0.4},{"s":{"mul":0.9},"if":0.7},{"s":{"mul":0.9},"l":{"add":-0.1},"if":0.9},{"s":{"mul":0.9},"l":{"mul":0.7}}]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"hdrBg","params":[{"s":{"mul":0.9},"l":{"mul":0,"add":0.3},"if":0.2},{"s":{"mul":0.9},"l":{"add":0.1},"if":0.4},{"s":{"mul":0.9},"if":0.7},{"s":{"mul":0.9},"l":{"add":-0.1},"if":0.9},{"s":{"mul":0.9},"l":{"mul":0.7}}]}]}}}},"brdr":{"type":"border","data":{"default":{"top":{"color":{"_replace":[{"param":"hdrBg","params":[{"s":{"mul":0.9},"if":0.2},{"s":{"mul":0.9},"l":{"add":-0.1},"if":0.4},{"s":{"mul":0.9},"l":{"add":-0.3},"if":0.7},{"s":{"mul":0.9},"l":{"mul":0.8},"if":0.9},{"s":{"mul":0.9},"l":{"mul":0.8}}]}]},"width":"1dp"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"hdrBg","params":[{"s":{"mul":0.8},"l":{"mul":0,"add":1},"if":0.7},{"l":{"mul":0.2}}]}]}}}}},"navBar":{"item":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"navBg"}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"navBg","params":[{"s":{"add":-0.1},"l":{"add":0.1},"a":{"add":-0.2},"if":0.2},{"s":{"add":-0.1},"l":{"add":-0.1},"a":{"add":-0.2}}]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"navBg","params":[{"s":{"add":-0.1},"l":{"add":0.1},"if":0.2},{"s":{"add":-0.1},"l":{"add":-0.1}}]}]}}}},"bubbleBg":{"type":"background","data":{"default":{},"clicked":{}}},"brdr":{"type":"border","data":{"default":{},"clicked":{}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#CCFFFFFF"},"clicked":{"color":"#FFFFFFFF"},"selected":{"color":"#FFFFFFFF"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#ffffffff"}}}}},"navBarCustom":{"item":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"navBg"}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"navBg","params":[{"s":{"add":-0.1},"l":{"add":0.1},"a":{"add":-0.2},"if":0.2},{"s":{"add":-0.1},"l":{"add":-0.1},"a":{"add":-0.2}}]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"navBg","params":[{"s":{"add":-0.1},"l":{"add":0.1},"if":0.2},{"s":{"add":-0.1},"l":{"add":-0.1}}]}]}}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FFFFFFFF"},"clicked":{}}}}},"navBarNew":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#CCFFFFFF"}}},"item":{"hdlTxt":{"type":"text","data":{"default":{"color":"#FF929292"},"clicked":{"color":"#FF757575"},"selected":{"color":"#FF2a2a2a"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF929292"},"clicked":{"type":"solid","color":"#FF757575"},"selected":{"type":"solid","color":"#FF2a2a2a"}}}}},"navGrid":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000"}}},"btn":{"bg":{"type":"background","data":{"default":{},"clicked":{}}},"brdr":{"type":"border","data":{"default":{},"clicked":{}}},"txt":{"type":"text","data":{"default":{"color":"#CCFFFFFF"},"clicked":{"color":"#FFFFFFFF"},"selected":{"color":"#FFFFFFFF"}}}}},"dynamicGrid":{"fullPage":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000"}}}},"slot":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#4cFFFFFF","shadow":{"isInset":false,"x":"0px","y":"0px","blur":"3px","color":"#66000000"}},"clicked":{"type":"solid","color":"#66FFFFFF","shadow":{"isInset":false,"x":"0px","y":"0px","blur":"3px","color":"#66000000"}},"selected":{"type":"solid","color":"#3fFFFFFF","shadow":{"isInset":false,"x":"0px","y":"0px","blur":"3px","color":"#66000000"}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#59FFFFFF","width":"1px"},"right":{"color":"#59FFFFFF","width":"1px"},"left":{"color":"#59FFFFFF","width":"1px"},"top":{"color":"#59FFFFFF","width":"1px"}},"clicked":{}}},"text":{"hdlTxt":{"type":"text","data":{"default":{"color":"#ffffffff"}}}}}},"navList":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000"}}},"item":{"bg":{"type":"background","data":{"default":{},"clicked":{"type":"solid","color":"#40000000"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#4c2a2a2a","width":"1px"}},"clicked":{}}},"txt":{"type":"text","data":{"default":{"color":"#ffffffff"}}}}},"navSidebar":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FF282828"}}},"scrnDiv":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000","shadow":{"isInset":false,"x":"-3px","y":"0px","blur":"10px","color":"#99000000"}}}},"brdr":{"type":"border","data":{"default":{"left":{"color":"#FF000000","width":"1px"}}}}},"item":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000"},"clicked":{"type":"solid","color":"#33000000","shadow":{"isInset":true,"x":"0px","y":"1px","blur":"3px","color":"#99000000"}},"selected":{"type":"solid","color":"#33000000","shadow":{"isInset":true,"x":"0px","y":"1px","blur":"3px","color":"#99000000"}}}},"marker":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FF3e3e3e","width":"1px"}},"clicked":{},"selected":{}}},"txt":{"type":"text","data":{"default":{"color":"#FFefefef"},"clicked":{"color":"#FFFFFFFF"},"selected":{"color":"#FFFFFFFF"}}}}},"androidDialog":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0,"add":0.16},"a":{"mul":0,"add":1},"if":0.6},{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0,"add":0.96},"a":{"mul":0,"add":1}}]}]}}}},"item":{"bg":{"type":"background","data":{"default":{},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"h":{"mul":0,"add":0.544},"s":{"mul":0,"add":0.62},"l":{"mul":0,"add":0.45},"a":{"mul":0,"add":1},"if":0.6},{"h":{"mul":0,"add":0.544},"s":{"mul":0,"add":0.757},"l":{"mul":0,"add":0.63},"a":{"mul":0,"add":1}}]}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contBbg","params":[{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":0.1},"if":0.6},{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.1}}]}]},"width":"1px"}},"clicked":{}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBbg","params":[{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":1},"if":0.6},{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0,"add":0.133},"a":{"mul":0,"add":1}}]}]}},"selected":{"color":{"_replace":[{"param":"contBbg","params":[{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":1},"if":0.6},{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0,"add":0.133},"a":{"mul":0,"add":1}}]}]}}}},"chkboxIcn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0,"add":0.26},"a":{"mul":0,"add":1},"if":0.6},{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0,"add":0.46},"a":{"mul":0,"add":1}}]}]}}}}},"header":{"hdlTxt":{"type":"text","data":{"default":{"color":"#FF33b5e5"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FF33b5e5","width":"6px"}}}}},"group":{"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBbg","params":[{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0,"add":0.8},"a":{"mul":0,"add":1},"if":0.6},{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0,"add":0.6},"a":{"mul":0,"add":1}}]}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contBbg","params":[{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.23},"if":0.6},{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0,"add":0.6},"a":{"mul":0,"add":1}}]}]},"width":"6px"}}}}},"btn":{"bg":{"type":"background","data":{"default":{},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"h":{"mul":0,"add":0.544},"s":{"mul":0,"add":0.62},"l":{"mul":0,"add":0.45},"a":{"mul":0,"add":1},"if":0.6},{"h":{"mul":0,"add":0.544},"s":{"mul":0,"add":0.757},"l":{"mul":0,"add":0.63},"a":{"mul":0,"add":1}}]}]}}}},"brdr":{"type":"border","data":{"default":{"top":{"color":{"_replace":[{"param":"contBbg","params":[{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0,"add":0.16},"a":{"mul":0,"add":1},"if":0.6},{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0,"add":0.86},"a":{"mul":0,"add":1}}]}]},"width":"1px"}}}},"sepBrdr":{"type":"border","data":{"default":{"left":{"color":{"_replace":[{"param":"contBbg","params":[{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0,"add":0.16},"a":{"mul":0,"add":1},"if":0.6},{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0,"add":0.86},"a":{"mul":0,"add":1}}]}]},"width":"1px"}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBbg","params":[{"h":{"mul":0,"add":0},"s":{"mul":0,"add":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":1},"if":0.6},{"h":{"mul":0,"add":0},"s":{"mul":0,"add":0},"l":{"mul":0,"add":0},"a":{"mul":0,"add":1}}]}]}}}}}},"tabBar":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0.7},"if":0.3},{"a":{"mul":0.88}}]}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}}}},"item":{"bg":{"type":"background","data":{"default":{},"clicked":{}}},"bubble":{"bg":{"type":"background","data":{"default":{},"clicked":{"type":"solid","color":{"_replace":[{"param":"lnkTxt","params":[{"a":{"mul":0.8}}]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"lnkTxt"}]}}}},"brdr":{"type":"border","data":{"default":{},"clicked":{},"selected":{}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}},"clicked":{"color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0,"add":1}}]}]}},"selected":{"color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0,"add":1}}]}]}}}}},"brdr":{"type":"border","data":{"default":{},"clicked":{}}}}},"tab2Bar":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"horizontal","color":[{"color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0,"add":0.86},"if":0.3},{"s":{"mul":0.8},"l":{"add":-0.2},"a":{"mul":0,"add":0.86}}]}]},"location":0},{"color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0,"add":0.9},"if":0.3},{"s":{"mul":0.8},"l":{"add":0.2},"a":{"mul":0,"add":0.9}}]}]},"location":0.5},{"color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0,"add":0.86},"if":0.3},{"s":{"mul":0.8},"l":{"add":-0.2},"a":{"mul":0,"add":0.86}}]}]},"location":1}],"shadow":[{"isInset":true,"x":"0px","y":"-1px","blur":"0px","color":{"_replace":[{"param":"lnkTxt"}]}},{"isInset":true,"x":"0px","y":"1px","blur":"0px","color":{"_replace":[{"param":"lnkTxt"}]}},{"isInset":true,"x":"0px","y":"1px","blur":"10px -2px","color":"#B4000000"},{"isInset":true,"x":"0px","y":"-1px","blur":"10px -2px","color":"#B4000000"}]}}},"triangle":{"type":"border","data":{"default":{"top":{"width":"6px","color":{"_replace":[{"param":"contBtxt"}]}},"left":{"width":"8px","color":"#00000000"},"right":{"width":"8px","color":"#00000000"},"bottom":{"width":"6px","color":{"_replace":[{"param":"contBtxt"}]}}}}},"item":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000"},"selected":{"type":"solid","color":"#00000000"}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}},"selected":{"color":{"_replace":[{"param":"contAtxt"}]}}}}}},"tab3Bar":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0,"add":0.5}}]}]},"shadow":{"isInset":false,"x":"0px","y":"1px","blur":"3px","color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0},"if":0.2},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.58}}]}]}}}}},"item":{"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}},"selected":{"color":{"_replace":[{"param":"contBsubTxt"}]}}}}}},"tab4Bar":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0,"add":0.7},"if":0.2},{"a":{"mul":0,"add":0.88}}]}]},"shadow":{"isInset":false,"x":"0px","y":"1px","blur":"3px","color":"#96000000"}}}},"item":{"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBtxt"}]}},"selected":{"color":{"_replace":[{"param":"lnkTxt"}]}}}},"sepBrdr":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbrdr","params":[{"a":{"mul":0,"add":0.7}}]}]}}}}}},"tabAndroidBar":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0.95}}]}]}}}},"bottomBrdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":0.14},"if":0.3},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.14}}]}]},"width":"2dp"}}}},"sepBrdr":{"type":"border","data":{"default":{"left":{"color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":0.2},"if":0.2},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.2}}]}]},"width":"1px"}}}},"item":{"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBhdlTxt"}]}}}},"bg":{"type":"background","data":{"default":{},"clicked":{"type":"solid","color":{"_replace":[{"param":"lnkTxt","params":[{"a":{"mul":0,"add":0.5}}]}]}}}},"brdr":{"type":"border","data":{"default":{},"clicked":{"bottom":{"color":{"_replace":[{"param":"lnkTxt","params":[{"l":{"mul":1.2},"if":0.5},{"s":{"mul":0.8},"l":{"mul":0.8}}]}]},"width":"1px"}}}}}},"contTypeA":{"audioSeekBar":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAbg","params":[{"s":{"mul":0.8},"l":{"add":0.15},"if":0.4},{"s":{"mul":0.8},"l":{"add":-0.1}}]}]}}}},"fillBg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"lnkTxt"}]}}}},"thumb":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"lnkTxt","params":[{"l":{"add":0.1},"if":0.1},{"l":{"add":-0.1}}]}]}}}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAhdlTxt"}]}}}},"hdlTxtBrdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":"#FFCCCCCC"},"bottom":{"width":"1px","color":"#FFCCCCCC"}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAtxt"}]}},"mandatory":{"color":"#FFBB0000"}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAsubTxt"}]}}}},"lnkTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}}}},"hdlIcn":{"type":"server_icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAhdlTxt"}]}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAtxt"}]}}}},"lnkIcnLight":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"lnkTxt","params":[{"l":{"add":0.05},"if":0.9},{"l":{"add":-0.05}}]}]}}}},"subIcn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAsubTxt"}]}}}},"lnkIcn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"lnkTxt"}]}}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAbg"}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"contAbg","params":[{"l":{"add":0.05},"a":{"add":-0.1},"if":0.3},{"l":{"add":-0.05},"a":{"add":-0.1}}]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"contAbg","params":[{"l":{"add":0.03},"a":{"add":-0.1},"if":0.3},{"l":{"add":-0.03},"a":{"add":-0.1}}]}]}}}},"subBg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAbg","params":[{"s":{"mul":0.8},"l":{"add":0.15},"if":0.4},{"s":{"mul":0.8},"l":{"add":-0.1}}]}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contAbrdr"}]},"width":"1px"}}}},"vrtBrdr":{"type":"border","data":{"default":{"ltrLeft":{"color":{"_replace":[{"param":"contAbrdr"}]},"width":"1px"}}}},"vrtBrdrLeft":{"type":"border","data":{"default":{"left":{"color":{"_replace":[{"param":"contAbrdr"}]},"width":"1px"}}}},"vrtBrdrRight":{"type":"border","data":{"default":{"right":{"color":{"_replace":[{"param":"contAbrdr"}]},"width":"1px"}}}},"classicItem":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAbg"}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"contAbg","params":[{"l":{"add":0.05},"a":{"add":-0.1},"if":0.3},{"l":{"add":-0.05},"a":{"add":-0.1}}]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"contAbg","params":[{"l":{"add":0.03},"a":{"add":-0.1},"if":0.3},{"l":{"add":-0.03},"a":{"add":-0.1}}]}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contAbrdr"}]},"width":"1px"}}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFfcfcfc","location":0},{"color":"#FFe5e5e5","location":1}],"shadow":[{"isInset":false,"x":"1px","y":"1px","blur":"2px","color":"#26000000"},{"isInset":true,"x":"-1px","y":"-1px","blur":"0px","color":"#CCFFFFFF"}]},"clicked":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFe5e5e5","location":0},{"color":"#FFfcfcfc","location":1}],"shadow":[{"isInset":false,"x":"1px","y":"1px","blur":"1px","color":"#4c000000"},{"isInset":true,"x":"1px","y":"1px","blur":"0px","color":"#CCFFFFFF"}]},"disabled":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFe7e7e7","location":0},{"color":"#FFE6E6E6","location":1}]}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FFBFBBB8","width":"1px"},"right":{"color":"#FFBFBBB8","width":"1px"},"left":{"color":"#FFBFBBB8","width":"1px"},"top":{"color":"#FFBFBBB8","width":"1px"}},"clicked":{"bottom":{"color":"#FFa7a7a7","width":"1px"},"right":{"color":"#FFa7a7a7","width":"1px"},"left":{"color":"#FFa7a7a7","width":"1px"},"top":{"color":"#FFa7a7a7","width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FF5F5B5A"},"selected":{"color":"#CC000000"},"disabled":{"color":"#ffCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF2a2a2a"}}}},"actBtn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"actBtn","params":[{"a":{"add":-0.2}}]}]}},"disabled":{"type":"solid","color":"#33333333"}}},"brdr":{"type":"border","data":{}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"actBtn","params":[{"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":1},"if":0.7},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":1}}]}]}},"selected":{"color":{"_replace":[{"param":"actBtn","params":[{"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":0.8},"if":0.7},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.8}}]}]}},"disabled":{"color":"#ffCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn","params":[{"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":1},"if":0.7},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":1}}]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"actBtn","params":[{"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":0.8},"if":0.7},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.8}}]}]}},"disabled":{"type":"solid","color":"#ffCCCCCC"}}},"svgicn":{"type":"svg","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn","params":[{"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":1},"if":0.7},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":1}}]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"actBtn","params":[{"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":0.8},"if":0.7},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.8}}]}]}},"disabled":{"type":"solid","color":"#ffCCCCCC"}}}},"contentSession":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAhdlTxt","params":[{"a":{"mul":0,"add":0.88}}]}]}}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg"}]}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg","params":[{"a":{"mul":0,"add":0.69}}]}]}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg","params":[{"a":{"mul":0,"add":0.59}}]}]}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000","shadow":[{"isInset":false,"x":"0px","y":"0px","blur":"0px 1px","color":"#66000000"},{"isInset":true,"x":"1px","y":"1px","blur":"0px","color":"#4Dffffff"}]}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FFFFFFFF"}}}}},"contentSession2":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"lnkTxt","params":[{"a":{"mul":0.88}}]}]}}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg"}]}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg","params":[{"a":{"mul":0.69}}]}]}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAbg","params":[{"a":{"mul":0.49}}]}]}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00FFFFFF","shadow":[{"isInset":false,"x":"1px","y":"1px","blur":"0px","color":"#66ffffff"},{"isInset":true,"x":"1px","y":"1px","blur":"3px","color":"#99000000"}]}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAbg","params":[{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":1},"if":0.3},{"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":1}}]}]}}}}}},"calBoxBrdr1":{"type":"border","data":{"default":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","style":"dotted","color":{"_replace":[{"param":"contBbrdr","params":[{"a":{"mul":0.7}}]}]}}}}},"calBoxBrdr2":{"type":"border","data":{"default":{"top":{"width":"1px","style":"dotted","color":{"_replace":[{"param":"contBbrdr","params":[{"a":{"mul":0.7}}]}]}},"bottom":{"width":"1px","style":"dotted","color":{"_replace":[{"param":"contBbrdr","params":[{"a":{"mul":0.7}}]}]}}}}}},"contTypeB":{"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBhdlTxt"}]}},"selected":{"color":{"_replace":[{"param":"contBsubTxt"}]}}}},"hdlTxtBrdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":{"_replace":[{"param":"contBhdlTxt","params":[{"a":{"mul":0.2}}]}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBhdlTxt","params":[{"a":{"mul":0.2}}]}]}}}}},"hdlTxtBrdr2":{"type":"border","data":{"default":{"top":{"width":"1px","color":{"_replace":[{"param":"contBhdlTxt"}]}}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBtxt"}]}},"selected":{"color":{"_replace":[{"param":"contBsubTxt"}]}},"mandatory":{"color":"#FFBB0000"}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBsubTxt"}]}}}},"lnkTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBtxt"}]}}}},"subIcn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBsubTxt"}]}}}},"lnkIcn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"lnkTxt"}]}}}},"subSvg":{"type":"svg","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBsubTxt"}]}}}},"rateSvg":{"type":"svg","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0.8},"l":{"add":0.24},"a":{"add":0.4},"if":0.4},{"s":{"mul":0.8},"l":{"add":-0.4},"a":{"add":0.2}}]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"lnkTxt"}]}}}},"rateIcn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0.8},"l":{"add":0.24},"a":{"add":0.4},"if":0.4},{"s":{"mul":0.8},"l":{"add":-0.4},"a":{"add":0.2}}]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"lnkTxt"}]}}}},"hdlIcn":{"type":"server_icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBhdlTxt"}]}}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"add":-0.12}}]}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"add":-0.18}}]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"add":-0.18}}]}]}}}},"subBg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0.8},"l":{"add":0.15},"if":0.4},{"s":{"mul":0.8},"l":{"add":-0.1}}]}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}},"clicked":{"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}},"selected":{"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}}}},"subBrdr":{"type":"border","data":{"default":{"top":{"color":{"_replace":[{"param":"contBsubTxt"}]},"width":"1px"}}}},"bubbleItem":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"add":-0.12}}]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0},"if":0.2},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.7}}]}]}}},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"add":-0.1},"s":{"add":-0.1},"l":{"add":0.1},"if":0.3},{"a":{"add":-0.1},"s":{"add":-0.1},"l":{"add":-0.1}}]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"1px","color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0},"if":0.2},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.8}}]}]}}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"add":0.3}}]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"1px","color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0},"if":0.2},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.7}}]}]}}}}},"ovrImg":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#B2000000"},"clicked":{"type":"solid","color":{"_replace":[{"param":"lnkTxt","params":[{"a":{"mul":0.6}}]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"lnkTxt","params":[{"a":{"mul":0.8}}]}]}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#b2ffffff"}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FFFFFFFF"}}},"txt":{"type":"text","data":{"default":{"color":"#B2FFFFFF"}}},"subTxt":{"type":"text","data":{"default":{"color":"#7fFFFFFF"}}}},"brdr":{"type":"border","data":{}},"shadowBrdr":{"type":"border","data":{"default":{"bottom":{"color":"#26000000","width":"1dp"}}}}},"headerItem":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"add":-0.18},"if":0.2},{"a":{"add":-0.12}}]}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0.82}}]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"l":{"mul":0.82}}]}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}}}}},"trackItem":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0.88}}]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0},"if":0.2},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.58}}]}]}}},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0.82}}]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0},"if":0.2},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.58}}]}]}}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBbg"}]}}}},"brdr":{"type":"border","data":{"default":{"top":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}},"clicked":{"top":{"color":{"_replace":[{"param":"lnkTxt"}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"lnkTxt"}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"lnkTxt"}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"lnkTxt"}]},"width":"1px"}},"selected":{"top":{"color":{"_replace":[{"param":"lnkTxt"}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"lnkTxt"}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"lnkTxt"}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"lnkTxt"}]},"width":"1px"}}}}},"fullPage":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"add":-0.32},"if":0.2},{"a":{"add":-0.22}}]}]}}}}},"fullPage2":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0.82}}]}]}}}}},"fullPage3":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0.95}}]}]}}}}},"fullPage4":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0.7}}]}]}}}}},"fullPage5":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0,"add":0.8}}]}]},"location":0},{"color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0,"add":0.5}}]}]},"location":1}]}}}},"sideAlbums":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0,"add":0.5}}]}]}}}},"item":{"bg":{"type":"background","data":{"default":{},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0.2}}]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBbg"}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contBbrdr","params":[{"a":{"mul":0.5}}]}]},"width":"1px"}}}}}},"sep":{"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr","params":[{"a":{"mul":0,"add":0.6}}]}]}}}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFFFFFFF","location":0},{"color":"#FFE6E6E6","location":1}]},"clicked":{"type":"gradient","orientation":"vertical","color":[{"color":"#ffdddddd","location":0},{"color":"#ffcccccc","location":1}]},"disabled":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFe7e7e7","location":0},{"color":"#FFE6E6E6","location":1}]}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FFBFBBB8","width":"1px"},"right":{"color":"#FFBFBBB8","width":"1px"},"left":{"color":"#FFBFBBB8","width":"1px"},"top":{"color":"#FFBFBBB8","width":"1px"}},"clicked":{"bottom":{"color":"#FF757575","width":"1px"},"right":{"color":"#FF757575","width":"1px"},"left":{"color":"#FF757575","width":"1px"},"top":{"color":"#FF757575","width":"1px"}}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FF5F5B5A"},"selected":{"color":"#FF464342"},"disabled":{"color":"#CCCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF5F5B5A"},"clicked":{"type":"solid","color":"#FF464342"},"disabled":{"type":"solid","color":"#CCCCCCCC"}}}},"actBtn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"actBtn","params":[{"a":{"add":-0.2}}]}]}},"disabled":{"type":"solid","color":"#33333333"}}},"brdr":{"type":"border","data":{}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"actBtn","params":[{"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":1},"if":0.7},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":1}}]}]}},"selected":{"color":{"_replace":[{"param":"actBtn","params":[{"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":0.8},"if":0.7},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.8}}]}]}},"disabled":{"color":"#ffCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn","params":[{"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":1},"if":0.7},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":1}}]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"actBtn","params":[{"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":0.8},"if":0.7},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.8}}]}]}},"disabled":{"type":"solid","color":"#ffCCCCCC"}}}},"subBtn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBsubTxt"}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBsubTxt","params":[{"l":{"mul":0.8}}]}]}}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBsubTxt","params":[{"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":1},"if":0.7},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":1}}]}]}}}}}},"contTypeC":{"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contChdlTxt"}]}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contCtxt"}]}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contCsubTxt"}]}}}},"lnkTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contCbg","params":[{"l":{"mul":0.9},"a":{"mul":0.9},"if":0.7},{"l":{"mul":0.7},"a":{"mul":0.9}}]}]}}}},"btn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}},"clicked":{"type":"solid","color":{"_replace":[{"param":"actBtn","params":[{"l":{"mul":1.3},"if":0.5},{"l":{"mul":0.5}}]}]}},"disabled":{"type":"solid","color":"#33333333"}}},"brdr":{"type":"border","data":{}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FFFFFFFF"},"selected":{"color":"#FFFFFFFF"},"disabled":{"color":"#ffCCCCCC"}}}}},"form":{"element":{"bg":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFe4e4e4","location":0},{"color":"#FF8d8d8d","location":1}]},"mandatory":{"type":"gradient","orientation":"vertical","color":[{"color":"#FFFFFFFF","location":0},{"color":"#FF8d8d8d","location":1}],"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#4cb60021"}}}},"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":"#FFC1C1C2"},"bottom":{"width":"1px","color":"#FFC1C1C2"},"left":{"width":"1px","color":"#FFC1C1C2"},"right":{"width":"1px","color":"#FFC1C1C2"}},"mandatory":{"top":{"color":"#FFB60021","width":"1px"},"bottom":{"color":"#FFB60021","width":"1px"},"left":{"color":"#FFB60021","width":"1px"},"right":{"color":"#FFB60021","width":"1px"}}}},"txt":{"type":"text","data":{"default":{"color":"#FF111111"},"watermark":{"color":"#FF888888"},"mandWatermark":{"color":"#FFb60021"}}}},"dropdown":{"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FF2a2a2a"}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":"#22000000"}}},"brdr":{"type":"border","data":{"default":{"left":{"color":"#FFC1C1C2","width":"1px"},"right":{"color":"#FFC1C1C2","width":"1px"}}}}},"input":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF"},"disabled":{"type":"solid","color":"#FFCCCCCC"},"mandatory":{"type":"solid","color":"#FFfff8f8","shadow":{"isInset":false,"x":"1px","y":"1px","blur":"5px","color":"#4cb60021"}}}},"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":"#FFC1C1C2"},"bottom":{"width":"1px","color":"#FFC1C1C2"},"left":{"width":"1px","color":"#FFC1C1C2"},"right":{"width":"1px","color":"#FFC1C1C2"}},"diabled":{},"mandatory":{"top":{"color":"#FFB60021","width":"1px"},"bottom":{"color":"#FFB60021","width":"1px"},"left":{"color":"#FFB60021","width":"1px"},"right":{"color":"#FFB60021","width":"1px"}}}},"txt":{"type":"text","data":{"default":{"color":"#FF000000"},"watermark":{"color":"#FF8e8e8e"},"mandWatermark":{"color":"#FFb60021"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FFa8a8a8"},"selected":{"type":"solid","color":"#FF2a2a2a"},"clicked":{"type":"solid","color":"#FF626262"}}}},"checkBox":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"selected":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"mandatory":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"disabled":{"type":"solid","color":"#54d3d3d3","shadow":{"isInset":false,"x":"0px","y":"1px","blur":"0px","color":"#FFFFFFFF"}}}},"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}}},"selected":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}}},"mandatory":{"top":{"color":"#FFB60021","width":"1px"},"bottom":{"color":"#FFB60021","width":"1px"},"left":{"color":"#FFB60021","width":"1px"},"right":{"color":"#FFB60021","width":"1px"}},"disabled":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#00FFFFFF"},"selected":{"type":"solid","color":"#FF2a2a2a"}}}},"radioBtn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"selected":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"mandatory":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":"#33000000"}},"disabled":{"type":"solid","color":"#54d3d3d3","shadow":{"isInset":false,"x":"0px","y":"1px","blur":"0px","color":"#FFFFFFFF"}}}},"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}}},"selected":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}}},"mandatory":{"top":{"color":"#FFB60021","width":"1px"},"bottom":{"color":"#FFB60021","width":"1px"},"left":{"color":"#FFB60021","width":"1px"},"right":{"color":"#FFB60021","width":"1px"}},"disabled":{"top":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"left":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}},"right":{"width":"1px","color":{"_replace":[{"param":"contBbrdr"}]}}}}},"icn":{"type":"background","data":{"default":{},"selected":{"type":"solid","color":"#FF2a2a2a"},"disabled":{"type":"solid","color":"#FFd3d3d3"}}}}},"audioPlayer":{"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"hdrTxt"}]}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"hdrTxt","params":[{"a":{"mul":0.8}}]}]}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrTxt"}]}}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg","params":[{"l":{"mul":0.3}}]}]}}}},"bgMini":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg","params":[{"l":{"mul":0.3}}]}]}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"hdrBg","params":[{"s":{"mul":0.5},"l":{"mul":0.7},"a":{"mul":0.9},"if":0.5},{"s":{"mul":0.7},"l":{"mul":0.6},"a":{"mul":0.9}}]}]},"width":"1px"}}}},"seekBar":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg","params":[{"s":{"mul":0.7},"l":{"mul":1.3},"if":0.5},{"s":{"mul":0.7},"l":{"mul":0.7}}]}]},"shadow":{"isInset":true,"x":"1px","y":"1px","blur":"2px","color":{"_replace":[{"param":"hdrBg","params":[{"s":{"mul":0.7},"l":{"mul":0.001},"if":0.5},{"s":{"mul":0.7},"l":{"mul":0.001}}]}]}}}}},"brdr":{"type":"border","data":{"default":{"top":{"color":{"_replace":[{"param":"hdrBg","params":[{"s":{"mul":0.7},"l":{"mul":1.1},"if":0.5},{"s":{"mul":0.7},"l":{"mul":0.7}}]}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"hdrBg","params":[{"s":{"mul":0.7},"l":{"mul":1.8},"if":0.5},{"s":{"mul":0.7},"l":{"mul":0.7}}]}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"hdrBg","params":[{"s":{"mul":0.7},"l":{"mul":1.8},"if":0.5},{"s":{"mul":0.7},"l":{"mul":0.7}}]}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"hdrBg","params":[{"s":{"mul":0.7},"l":{"mul":1.8},"if":0.5},{"s":{"mul":0.7},"l":{"mul":0.7}}]}]},"width":"1px"}}}},"seekFill":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrTxt"}]},"shadow":{"isInset":true,"x":"0px","y":"1px","blur":"1px","color":"#ff000000"}}}}}},"liveChat":{"bubbleMe":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0.88}}]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}}}},"triangle":{"type":"border","data":{"default":{"ltrLeft":{"color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0.88}}]}]},"width":"10px"},"bottom":{"color":"#00000000","width":"10px"},"top":{"color":"#00000000","width":"10px"}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBhdlTxt"}]}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBsubTxt"}]}}}}},"bubbleOther":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAbg"}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#96000000"}}}},"triangle":{"type":"border","data":{"default":{"ltrRight":{"color":{"_replace":[{"param":"contAbg"}]},"width":"10px"},"bottom":{"color":"#00000000","width":"10px"},"top":{"color":"#00000000","width":"10px"}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAhdlTxt"}]}}}},"subTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBsubTxt"}]}}}}}},"facebook":{"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}}}},"bubble":{"bg":{"type":"background","data":{"default":{}}},"brdr":{"type":"border","data":{"default":{"left":{"color":"#66767676","width":"1px"},"right":{"color":"#66767676","width":"1px"},"bottom":{"color":"#66767676","width":"1px"},"top":{"color":"#66767676","width":"1px"}}}},"triangle":{"type":"border","data":{"default":{"left":{"color":"#00000000","width":"4px"},"right":{"color":"#00000000","width":"4px"},"bottom":{"color":"#00000000","width":"4px"}}}},"triangleBrdr":{"type":"border","data":{"default":{"left":{"color":"#00000000","width":"6px"},"right":{"color":"#00000000","width":"6px"},"bottom":{"color":"#66767676","width":"6px"}}}}},"btn":{"bg":{"type":"background","data":{"default":{}}},"brdr":{"type":"border","data":{"default":{}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}},"selected":{"color":{"_replace":[{"param":"lnkTxt","params":[{"a":{"mul":0,"add":0.7}}]}]}},"disabled":{"color":"#CCCCCCCC"}}}},"socialBtnLike":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"actBtn","params":[{"a":{"add":-0.2}}]}]}}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"actBtn","params":[{"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":1},"if":0.7},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":1}}]}]}},"selected":{"color":{"_replace":[{"param":"actBtn","params":[{"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":0.8},"if":0.7},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.8}}]}]}},"disabled":{"color":"#ffCCCCCC"}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn","params":[{"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":1},"if":0.7},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":1}}]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"actBtn","params":[{"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":0.8},"if":0.7},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.8}}]}]}},"disabled":{"type":"solid","color":"#ffCCCCCC"}}}},"socialBtnA":{"bg":{"type":"background","data":{"default":{},"clicked":{"type":"solid","color":{"_replace":[{"param":"contAbg","params":[{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":0.06},"if":0.3},{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.06}}]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0},"if":0.3},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.58}}]}]}}},"selected":{"type":"solid","color":{"_replace":[{"param":"contAbg","params":[{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":0.02},"if":0.3},{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.02}}]}]}},"disabled":{}}},"left_bg":{"type":"background","data":{"default":{},"clicked":{"type":"solid","color":{"_replace":[{"param":"contAbg","params":[{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":0.06},"if":0.3},{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.06}}]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0},"if":0.3},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.58}}]}]}}},"selected":{"type":"solid","color":{"_replace":[{"param":"contAbg","params":[{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":0.02},"if":0.3},{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.02}}]}]}},"disabled":{}}},"right_bg":{"type":"background","data":{"default":{},"clicked":{"type":"solid","color":{"_replace":[{"param":"contAbg","params":[{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":0.06},"if":0.3},{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.06}}]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0},"if":0.3},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.58}}]}]}}},"selected":{"type":"solid","color":{"_replace":[{"param":"contAbg","params":[{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":0.02},"if":0.3},{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.02}}]}]}},"disabled":{}}},"sepLine":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAbrdr"}]}}}},"sepBrdr":{"type":"border","data":{"default":{"top":{"color":{"_replace":[{"param":"contAbrdr"}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"contAbrdr"}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"contAbrdr"}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"contAbrdr"}]},"width":"1px"}}}},"brdr":{"type":"border","data":{"default":{"top":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}}}},"right_brdr":{"type":"border","data":{"default":{}}},"left_brdr":{"type":"border","data":{"default":{"right":{"color":{"_replace":[{"param":"contAbrdr"}]},"width":"1px"}}}},"left_hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAhdlTxt"}]}},"selected":{"color":{"_replace":[{"param":"lnkTxt"}]}}}},"left_icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAhdlTxt"}]},"isBlack":true,"isSimple":true},"clicked":{"type":"solid","color":{"_replace":[{"param":"lnkTxt"}]},"isBlack":true,"isSimple":true},"selected":{"type":"solid","color":{"_replace":[{"param":"lnkTxt"}]},"isBlack":true,"isSimple":true},"disabled":{"type":"solid","color":"#CCCCCCCC","isBlack":true,"isSimple":true}}},"right_hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAhdlTxt"}]}},"selected":{"color":{"_replace":[{"param":"lnkTxt"}]}}}},"right_icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAhdlTxt"}]},"isBlack":true,"isSimple":true},"clicked":{"type":"solid","color":{"_replace":[{"param":"lnkTxt"}]},"isBlack":true,"isSimple":true},"selected":{"type":"solid","color":{"_replace":[{"param":"lnkTxt"}]},"isBlack":true,"isSimple":true},"disabled":{"type":"solid","color":"#CCCCCCCC","isBlack":true,"isSimple":true}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAhdlTxt"}]}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAhdlTxt"}]},"isBlack":true,"isSimple":true},"clicked":{"type":"solid","color":{"_replace":[{"param":"lnkTxt"}]},"isBlack":true,"isSimple":true},"selected":{"type":"solid","color":{"_replace":[{"param":"lnkTxt"}]},"isBlack":true,"isSimple":true},"disabled":{"type":"solid","color":"#CCCCCCCC","isBlack":true,"isSimple":true}}}},"socialBtnB":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000"},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":0.06},"if":0.3},{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.06}}]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":0.02},"if":0.3},{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.02}}]}]}},"disabled":{"type":"solid","color":"#00000000"}}},"left_bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000"},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":0.06},"if":0.3},{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.06}}]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":0.02},"if":0.3},{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.02}}]}]}},"disabled":{"type":"solid","color":"#00000000"}}},"right_bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000"},"clicked":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":0.06},"if":0.3},{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.06}}]}]}},"selected":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":0.02},"if":0.3},{"h":{"mul":0},"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.02}}]}]}},"disabled":{"type":"solid","color":"#00000000"}}},"sepLine":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbrdr"}]}}}},"sepBrdr":{"type":"border","data":{"default":{"top":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}}}},"brdr":{"type":"border","data":{"default":{"top":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"bottom":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}}}},"right_brdr":{"type":"border","data":{"default":{"top":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}}}},"left_brdr":{"type":"border","data":{"default":{"top":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"contBbrdr"}]},"width":"1px"}}}},"left_hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAhdlTxt"}]}},"selected":{"color":{"_replace":[{"param":"lnkTxt"}]}}}},"left_icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAhdlTxt"}]},"isBlack":true,"isSimple":true},"clicked":{"type":"solid","color":{"_replace":[{"param":"lnkTxt"}]},"isBlack":true,"isSimple":true},"selected":{"type":"solid","color":{"_replace":[{"param":"lnkTxt"}]},"isBlack":true,"isSimple":true},"disabled":{"type":"solid","color":"#CCCCCCCC","isBlack":true,"isSimple":true}}},"right_hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contAhdlTxt"}]}},"selected":{"color":{"_replace":[{"param":"lnkTxt"}]}}}},"right_icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAhdlTxt"}]},"isBlack":true,"isSimple":true},"clicked":{"type":"solid","color":{"_replace":[{"param":"lnkTxt"}]},"isBlack":true,"isSimple":true},"selected":{"type":"solid","color":{"_replace":[{"param":"lnkTxt"}]},"isBlack":true,"isSimple":true},"disabled":{"type":"solid","color":"#CCCCCCCC","isBlack":true,"isSimple":true}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"contBhdlTxt"}]}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBhdlTxt"}]},"isBlack":true,"isSimple":true},"clicked":{"type":"solid","color":{"_replace":[{"param":"lnkTxt"}]},"isBlack":true,"isSimple":true},"selected":{"type":"solid","color":{"_replace":[{"param":"lnkTxt"}]},"isBlack":true,"isSimple":true},"disabled":{"type":"solid","color":"#CCCCCCCC","isBlack":true,"isSimple":true}}}},"articleA":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAbg","params":[{"s":{"add":-0.1},"l":{"add":0.05},"a":{"add":0.2},"if":0.2},{"s":{"add":-0.1},"l":{"add":-0.05},"a":{"add":0.2}}]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":{"_replace":[{"param":"contAbg","params":[{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0},"if":0.2},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.58}}]}]}}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contAbrdr","params":[{"a":{"add":-0.3}}]}]},"width":"1px"}}}}},"articleB":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"s":{"add":-0.1},"l":{"add":0.05},"a":{"add":0.2},"if":0.2},{"s":{"add":-0.1},"l":{"add":-0.05},"a":{"add":0.2}}]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"1px","color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0},"if":0.2},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.58}}]}]}}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contBbrdr","params":[{"a":{"add":-0.3}}]}]},"width":"1px"}}}}}},"twitter":{"btn":{"bg":{"type":"background","data":{"default":{}}},"brdr":{"type":"border","data":{"default":{}}},"hdlTxt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"lnkTxt"}]}},"selected":{"color":{"_replace":[{"param":"lnkTxt","params":[{"a":{"mul":0,"add":0.7}}]}]}},"disabled":{"color":"#CCCCCCCC"}}}},"articleA":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contAbg","params":[{"s":{"add":-0.1},"l":{"add":0.05},"a":{"add":0.2},"if":0.2},{"s":{"add":-0.1},"l":{"add":-0.05},"a":{"add":0.2}}]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":{"_replace":[{"param":"contAbg","params":[{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0},"if":0.2},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.58}}]}]}}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contAbrdr","params":[{"a":{"add":-0.3}}]}]},"width":"1px"}}}},"shadowBrdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contAbrdr","params":[{"a":{"add":-0.3}}]}]},"width":"1dp"}}}}},"articleB":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"s":{"add":-0.1},"l":{"add":0.05},"a":{"add":0.2},"if":0.2},{"s":{"add":-0.1},"l":{"add":-0.05},"a":{"add":0.2}}]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"1px","color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0},"if":0.2},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":0.58}}]}]}}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contBbrdr","params":[{"a":{"add":-0.3}}]}]},"width":"1px"}}}}}},"events":{"calPict":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0.78}}]}]},"shadow":{"isInset":false,"x":"1px","y":"1px","blur":"2px","color":"#FF000000"}}}}}},"comment":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF"}}},"panel":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFF0F0F0"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FFCCCCCC","width":"1px"}}}}}},"images":{"image1":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":1},"if":0.3},{"s":{"mul":0.2},"l":{"mul":0,"add":0.76},"a":{"mul":0,"add":1}}]}]},"width":"1px"},"top":{"color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":1},"if":0.3},{"s":{"mul":0.2},"l":{"mul":0,"add":0.76},"a":{"mul":0,"add":1}}]}]},"width":"1px"},"right":{"color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":1},"if":0.3},{"s":{"mul":0.2},"l":{"mul":0,"add":0.76},"a":{"mul":0,"add":1}}]}]},"width":"1px"},"left":{"color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":1},"if":0.3},{"s":{"mul":0.2},"l":{"mul":0,"add":0.76},"a":{"mul":0,"add":1}}]}]},"width":"1px"}}}}},"image2":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FF000000","width":"1px"},"top":{"color":"#FF000000","width":"1px"},"right":{"color":"#FF000000","width":"1px"},"left":{"color":"#FF000000","width":"1px"}}}}},"image3":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FF000000","shadow":{"isInset":false,"x":"0px","y":"2px","blur":"7px","color":"#b2000000"}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"color":"#FFFFFFFF","width":"5px"},"top":{"color":"#FFFFFFFF","width":"5px"},"right":{"color":"#FFFFFFFF","width":"5px"},"left":{"color":"#FFFFFFFF","width":"5px"}}}}},"catImage":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000","shadow":[{"isInset":false,"x":"0px","y":"0px","blur":"1px","color":"#FF000000"},{"isInset":true,"x":"0px","y":"0px","blur":"0px 3px","color":"#FFFFFFFF"},{"isInset":true,"x":"0px","y":"0px","blur":"1px 3px","color":"#66000000"}]},"clicked":{"type":"solid","color":"#00000000","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"3px","color":"#CC000000"}},"selected":{"type":"solid","color":"#00000000","shadow":{"isInset":true,"x":"1px","y":"1px","blur":"3px","color":"#CC000000"}}}},"bgGrad":{"type":"background","data":{"default":{"type":"gradient","orientation":"vertical","color":[{"color":"#00000000","location":0},{"color":"#00000000","location":0.47},{"color":"#59000000","location":1}],"shadow":[{"isInset":false,"x":"0px","y":"0px","blur":"1px","color":"#FF000000"},{"isInset":true,"x":"0px","y":"0px","blur":"0px 3px","color":"#FFFFFFFF"},{"isInset":true,"x":"0px","y":"0px","blur":"1px 3px","color":"#66000000"}]}}},"txt":{"type":"text","data":{"default":{"color":"#FFFFFFFF","shadow":[{"x":"0px","y":"0px","blur":"1px","color":"#FF000000"},{"x":"1px","y":"1px","blur":"3px","color":"#CC000000"}]}}}},"imgBtn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF","shadow":{"isInset":false,"x":"1px","y":"1px","blur":"3px","color":"#FF000000"}},"clicked":{"type":"solid","color":"#FFFFFFFF"},"selected":{"type":"solid","color":"#FFFFFFFF"}}},"overlayBg":{"type":"background","data":{"default":{"type":"solid","color":"#99000000"},"clicked":{"type":"solid","color":"#00000000"},"selected":{"type":"solid","color":"#00000000"}}},"brdr":{"type":"border","data":{"default":{"left":{"color":"#ffffffff","width":"3px"},"right":{"color":"#ffffffff","width":"3px"},"bottom":{"color":"#ffffffff","width":"3px"},"top":{"color":"#ffffffff","width":"3px"}},"clicked":{"bottom":{"color":"#00000000","width":"0px"},"right":{"color":"#00000000","width":"0px"},"left":{"color":"#00000000","width":"0px"},"top":{"color":"#00000000","width":"0px"}},"selected":{"bottom":{"color":"#00000000","width":"0px"},"right":{"color":"#00000000","width":"0px"},"left":{"color":"#00000000","width":"0px"},"top":{"color":"#00000000","width":"0px"}}}}}},"coupons":{"claimed":{"txt":{"type":"text","data":{"default":{"color":"#FFFFFFFF"}}},"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FF9cba3e","shadow":{"isInset":true,"x":"0px","y":"-1px","blur":"3px","color":"#96000000"}}}},"icn":{"type":"icon","data":{"default":{"type":"solid","color":"#FFFFFFFF"}}},"brdr":{"type":"border","data":{"default":{"bottom":{"width":"1px","color":"#FF2a2a2a"}}}}},"notClaimed":{"bg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"hdrBg"}]},"shadow":{"isInset":true,"x":"0px","y":"-1px","blur":"3px","color":"#96000000"}}}},"brdr":{"type":"border","data":{"default":{"bottom":{"style":"dotted","width":"1px","color":"#FF2A2A2A"}}}}},"expiredCouponBg":{"type":"background","data":{"default":{"type":"solid","color":"#7f000000"}}}},"punchSubBg":{"type":"background","data":{"default":{"type":"solid","color":"#FFf8f8f8"}}},"LoyaltyCard":{"punchSubBg":{"type":"background","data":{"default":{"type":"solid","color":"#FFf8f8f8"}}},"inputLoyalty":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000"},"disabled":{"type":"solid","color":"#FFCCCCCC"},"mandatory":{"type":"solid","color":"#FFb60021"},"selected":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}}}},"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":{"_replace":[{"param":"actBtn"}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"actBtn"}]}},"left":{"width":"1px","color":{"_replace":[{"param":"actBtn"}]}},"right":{"width":"1px","color":{"_replace":[{"param":"actBtn"}]}}},"mandatory":{"top":{"color":"#FFb60021","width":"1px"},"bottom":{"color":"#FFb60021","width":"1px"},"left":{"color":"#FFb60021","width":"1px"},"right":{"color":"#FFb60021","width":"1px"}}}},"txt":{"type":"text","data":{"default":{"color":"#00000000"}}}},"inputLoyaltyError":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFb60021"},"disabled":{"type":"solid","color":"#FFCCCCCC"},"mandatory":{"type":"solid","color":"#FFb60021"}}},"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":"#FFb60021"},"bottom":{"width":"1px","color":"#FFb60021"},"left":{"width":"1px","color":"#FFb60021"},"right":{"width":"1px","color":"#FFb60021"}}}},"txt":{"type":"text","data":{"default":{"color":"#00000000"}}}},"punch":{"wideBg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0,"add":0.5}}]}]}}}},"bgImage":{"overlayBg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0,"add":0.48}}]}]}}}}},"errTxt":{"type":"text","data":{"default":{"color":"#FFB60021"}}},"slot":{"whole":{"bg":{"type":"svg","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0.8},"l":{"add":0.15},"if":0.4},{"s":{"mul":0.8},"l":{"add":-0.1}}]}]}}}},"overlay":{"type":"svg","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"actBtn"}]}}}}},"punch":{"bg":{"type":"svg","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}}}},"overlay":{"type":"svg","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn","params":[{"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":1},"if":0.7},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":1}}]}]}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"actBtn","params":[{"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":1},"if":0.7},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":1}}]}]}}}}}}}},"inputLoyalty":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#00000000"},"disabled":{"type":"solid","color":"#FFCCCCCC"},"mandatory":{"type":"solid","color":"#FFb60021"},"selected":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}}}},"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":{"_replace":[{"param":"actBtn"}]}},"bottom":{"width":"1px","color":{"_replace":[{"param":"actBtn"}]}},"left":{"width":"1px","color":{"_replace":[{"param":"actBtn"}]}},"right":{"width":"1px","color":{"_replace":[{"param":"actBtn"}]}}},"mandatory":{"top":{"color":"#FFb60021","width":"1px"},"bottom":{"color":"#FFb60021","width":"1px"},"left":{"color":"#FFb60021","width":"1px"},"right":{"color":"#FFb60021","width":"1px"}}}},"txt":{"type":"text","data":{"default":{"color":"#00000000"}}}},"inactiveLoyaltyBg":{"type":"background","data":{"default":{"type":"solid","color":"#33000000"}}},"inputLoyaltyError":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFb60021"},"disabled":{"type":"solid","color":"#FFCCCCCC"},"mandatory":{"type":"solid","color":"#FFb60021"}}},"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":"#FFb60021"},"bottom":{"width":"1px","color":"#FFb60021"},"left":{"width":"1px","color":"#FFb60021"},"right":{"width":"1px","color":"#FFb60021"}}}},"txt":{"type":"text","data":{"default":{"color":"#00000000"}}}},"punch":{"wideBg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0,"add":0.5}}]}]}}}},"bgImage":{"overlayBg":{"type":"background","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"a":{"mul":0,"add":0.48}}]}]}}}}},"errTxt":{"type":"text","data":{"default":{"color":"#FFB60021"}}},"slot":{"whole":{"bg":{"type":"svg","data":{"default":{"type":"solid","color":{"_replace":[{"param":"contBbg","params":[{"s":{"mul":0.8},"l":{"add":0.15},"if":0.4},{"s":{"mul":0.8},"l":{"add":-0.1}}]}]}}}},"overlay":{"type":"svg","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"actBtn"}]}}}}},"punch":{"bg":{"type":"svg","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn"}]}}}},"overlay":{"type":"svg","data":{"default":{"type":"solid","color":{"_replace":[{"param":"actBtn","params":[{"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":1},"if":0.7},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":1}}]}]}}}},"txt":{"type":"text","data":{"default":{"color":{"_replace":[{"param":"actBtn","params":[{"s":{"mul":0},"l":{"mul":0,"add":1},"a":{"mul":0,"add":1},"if":0.7},{"s":{"mul":0},"l":{"mul":0},"a":{"mul":0,"add":1}}]}]}}}}}}},"sideTabletOverlay":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#33000000"},"clicked":{"type":"solid","color":"#00000000"},"selected":{"type":"solid","color":"#00000000"}}}},"forms":{"errorForm":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFffe0e0"},"disabled":{"type":"solid","color":"#FFCCCCCC"}}},"brdr":{"type":"border","data":{"default":{"top":{"width":"2px","color":"#FFb60021"},"bottom":{"width":"2px","color":"#FFb60021"},"left":{"width":"2px","color":"#FFb60021"},"right":{"width":"2px","color":"#FFb60021"}}}},"txt":{"type":"text","data":{"default":{"color":"#FFb60021"}}}},"defaultForm":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#FFFFFFFF"},"disabled":{"type":"solid","color":"#FFCCCCCC"}}},"brdr":{"type":"border","data":{"default":{"top":{"width":"1px","color":"#FFc1c1c2"},"bottom":{"width":"1px","color":"#FFc1c1c2"},"left":{"width":"1px","color":"#FFc1c1c2"},"right":{"width":"1px","color":"#FFc1c1c2"}}}},"txt":{"type":"text","data":{"default":{"color":"#FF313132"}}}}},"donation":{"btn":{"bg":{"type":"background","data":{"default":{"type":"solid","color":"#ffffbc32"},"clicked":{"type":"solid","color":"#fff2aa18"},"disabled":{"type":"solid","color":"#fff2aa18"}}},"hdlTxt":{"type":"text","data":{"default":{"color":"#FF2d2d2d"},"clicked":{"color":"#FF2d2d2d"},"selected":{"color":"#FF2d2d2d"}}}}}},"navigation":{"type":2,"meta":{}}},"meta":{"bgImage":"http:\/\/s.como.com\/mobile\/df\/ce\/df444df8-f2ce-49fa-8244-88e3d8ae84f5\/Images\/107624d1-152f-4bcc-93f2-cc8fb0a10bc2.Jpeg","material":0,"isRtl":false,"culture":"EN-US","header":{"type":0,"content":"HMT Challenge"}},"settings":{"brand":{"name":null,"link":null,"showAppLinks":true},"ga":{"trckId":"UA-46674138-1"},"ads":{"enabled":false,"fullScreenAdEnabled":null,"bottomBarAdEnabled":null,"bottomBarSwitchInterval":null,"adBarCycles":null,"fullScreenAdDisplayDuration":null,"fullScreenAdTO":null,"fullScreenAdShowTimespan":null,"fullScreenAdSupportedPages":null,"providers":null},"overrideServices":[{"key":"CMS_TWITTER_QUERY_GET","version":3,"params":{}},{"key":"CMS_TWITTER_USER_GET","version":3,"params":{}}],"fbAccessToken":"AAACeZBZANVcJ0BALWdkZBkVMprgCHf89vvzV3bq47rmnXHXXRnFbOhtwvU0k0tbUcL1aEjCQgZCrZCOhldBPeaBZAymqaZAyZBUZD","env":3,"providers":[{"id":0,"settings":[{"key":"googleMapAPIVersion","value":"1"}]}],"params":[{"key":"f191c769-e9c6-c645-11e1-e7a2213aed91","val":1}]},"details":{"appHomeUrl":"http:\/\/hmtchallenge.4yourmobile.com"},"pages":[{"id":"16e815c7-d95b-405e-a41f-5050c8aab047","label":"Brochure","icon":"http:\/\/images.como-services.com\/icon\/external\/?src=http%3A%2F%2Fs.como.com%2Fmobile%2Fdf%2Fce%2Fdf444df8-f2ce-49fa-8244-88e3d8ae84f5%2FImages%2F77c9dbbc-1d83-46dc-87bc-562ed0f89177.Png","deviceIcon":null,"type":"6c2faa10-d8ff-11e3-9c1a-0800200c9a66","version":null,"minVersion":"0.0.0.0","devicesMeta":{"layouts":[],"layout":null,"items":[{"link":"http:\/\/s.como.com\/mobile\/df\/ce\/df444df8-f2ce-49fa-8244-88e3d8ae84f5\/pdf\/2c131535-3a06-4f31-9d17-7e9e4d9eae99.pdf","description":null}],"pageLayout":-1},"meta":{"layout":null,"items":[{"link":"http:\/\/s.como.com\/mobile\/df\/ce\/df444df8-f2ce-49fa-8244-88e3d8ae84f5\/pdf\/2c131535-3a06-4f31-9d17-7e9e4d9eae99.pdf","description":null}],"pageLayout":-1},"displayDevices":0,"alias":"brochure"},{"id":"2c4dba45-0c01-46a9-86ef-7d012c262d14","label":"Subscribe","icon":"http:\/\/images.como-services.com\/icon\/external\/?src=http%3A%2F%2Fs.como.com%2Fmobile%2Fdf%2Fce%2Fdf444df8-f2ce-49fa-8244-88e3d8ae84f5%2FImages%2F6015dab5-f3d1-4beb-b335-087096b39349.Png","deviceIcon":null,"type":"38ab2b78-a1ad-42f8-8cb7-9475498c0f30","version":null,"minVersion":"3.4.0.0","devicesMeta":{"layouts":[],"layout":null,"items":[{"id":"d90203d5-c337-39e8-7f56-29bbd05c827e","params":{"extraInfo":{},"type":3},"name":"Entry Form Request","sendButton":{"caption":"Please send"},"success":{"message":"Thank you - we will send the entry form"},"controls":[{"type_name":"name","caption":"Name","type":"inputtext","isMandatory":true,"id":"_54575991-3e75-364e-46f8-bb1cbd65fa70","isActive":true},{"type_name":"name","caption":"Surname","type":"inputtext","id":"_1a69521f-be1c-e381-2fe2-12119ccbbaf4","isActive":true,"isMandatory":true},{"type_name":"email","caption":"Email","type":"inputtext","subType":"email","isMandatory":true,"id":"_293e1852-0092-bc1a-7c02-bf3401476237","isActive":true},{"type_name":"phone","caption":"Phone number","type":"inputtext","id":"_65e55b22-124b-d4d4-756d-f4a44ee18e77","isActive":true,"isMandatory":false,"subType":"tel"}],"desc":"HMT Weight loss challenge - 2015 - WIN R10 000 cash - Please send me the entry form.","logoImgUrl":"http:\/\/s.como.com\/mobile\/df\/ce\/df444df8-f2ce-49fa-8244-88e3d8ae84f5\/Images\/0592c946-45f3-4ea1-bad5-b71d10e7ad70.Jpeg","reportVersion":10,"reportId":"849ddcf3-5167-42b5-9b6b-08be499e316b","description":null}],"pageLayout":-1},"meta":{"layout":null,"items":[{"id":"d90203d5-c337-39e8-7f56-29bbd05c827e","params":{"extraInfo":{},"type":3},"name":"Entry Form Request","sendButton":{"caption":"Please send"},"success":{"message":"Thank you - we will send the entry form"},"controls":[{"type_name":"name","caption":"Name","type":"inputtext","isMandatory":true,"id":"_54575991-3e75-364e-46f8-bb1cbd65fa70","isActive":true},{"type_name":"name","caption":"Surname","type":"inputtext","id":"_1a69521f-be1c-e381-2fe2-12119ccbbaf4","isActive":true,"isMandatory":true},{"type_name":"email","caption":"Email","type":"inputtext","subType":"email","isMandatory":true,"id":"_293e1852-0092-bc1a-7c02-bf3401476237","isActive":true},{"type_name":"phone","caption":"Phone number","type":"inputtext","id":"_65e55b22-124b-d4d4-756d-f4a44ee18e77","isActive":true,"isMandatory":false,"subType":"tel"}],"desc":"HMT Weight loss challenge - 2015 - WIN R10 000 cash - Please send me the entry form.","logoImgUrl":"http:\/\/s.como.com\/mobile\/df\/ce\/df444df8-f2ce-49fa-8244-88e3d8ae84f5\/Images\/0592c946-45f3-4ea1-bad5-b71d10e7ad70.Jpeg","reportVersion":10,"reportId":"849ddcf3-5167-42b5-9b6b-08be499e316b","description":null}],"pageLayout":-1},"displayDevices":0,"alias":"subscribe"},{"id":"63218963-f4ff-4322-889d-35c04cfbb712","label":"Events","icon":"http:\/\/images.como-services.com\/icon\/external\/?src=http%3A%2F%2Fs.como.com%2Fmobile%2Fdf%2Fce%2Fdf444df8-f2ce-49fa-8244-88e3d8ae84f5%2FImages%2F9da39b6d-3662-4edf-bc04-92da09ad6f8a.Png","deviceIcon":null,"type":"1002937d-8b19-40de-9df5-ba0d1ea2fbb2","version":null,"minVersion":"2.0.0.0","devicesMeta":{"layouts":[],"layout":null,"pageLayout":-1,"items":[{"id":"12ad27ba-a8af-7e62-402a-19276aabdece","feed":"https:\/\/www.facebook.com\/pages\/HMT-Weight-Loss-Challenge\/401670303255279?sk=timeline","title":"Calendar","params":{"id":"401670303255279","type":3,"extraInfo":{}},"views":[{"title":"{$HtmlTextEventsFutureEvents}","since":"$date","until":"$date+6m","extraInfo":{"order":"asc"}},{"title":"{$HtmlTextEventsPastEvents}","since":"$date-6m","until":"$date","extraInfo":{"order":"desc"}}],"description":null}]},"meta":{"layout":null,"pageLayout":-1,"items":[{"id":"12ad27ba-a8af-7e62-402a-19276aabdece","feed":"https:\/\/www.facebook.com\/pages\/HMT-Weight-Loss-Challenge\/401670303255279?sk=timeline","title":"Calendar","params":{"id":"401670303255279","type":3,"extraInfo":{}},"views":[{"title":"{$HtmlTextEventsFutureEvents}","since":"$date","until":"$date+6m","extraInfo":{"order":"asc"}},{"title":"{$HtmlTextEventsPastEvents}","since":"$date-6m","until":"$date","extraInfo":{"order":"desc"}}],"description":null}]},"displayDevices":0,"alias":"events"},{"id":"5345feea-6ed5-407e-9de7-628f78206cd0","label":"Tickets","icon":"http:\/\/images.como-services.com\/icon\/external\/?src=http%3A%2F%2Fs.como.com%2Fmobile%2Fdf%2Fce%2Fdf444df8-f2ce-49fa-8244-88e3d8ae84f5%2FImages%2Fdfdfbf3b-a372-4b0a-87c5-d747e675cae9.Png","deviceIcon":null,"type":"c54d24ef-faf5-45dd-8859-85e3ebe7cecf","version":null,"minVersion":"2.7.0.5","devicesMeta":{"layouts":[],"layout":null,"pageLayout":-1,"items":[{"link":"http:\/\/hmtapp.blogspot.com\/p\/ticket-office.html","openInExternalBrowser":false,"description":null}]},"meta":{"layout":null,"pageLayout":-1,"items":[{"link":"http:\/\/hmtapp.blogspot.com\/p\/ticket-office.html","openInExternalBrowser":false,"description":null}]},"displayDevices":0,"alias":"tickets"},{"id":"5c458940-72fe-48b9-8bc8-df0f3aac3ce1","label":"HMT","icon":"http:\/\/images.como-services.com\/icon\/external\/?src=http%3A%2F%2Fs.como.com%2Fmobile%2Fdf%2Fce%2Fdf444df8-f2ce-49fa-8244-88e3d8ae84f5%2FImages%2Fc9f051d9-390e-44aa-a1d7-91dbc00b6c2f.Png","deviceIcon":null,"type":"c54d24ef-faf5-45dd-8859-85e3ebe7cecf","version":null,"minVersion":"2.7.0.5","devicesMeta":{"layouts":[],"layout":null,"items":[{"id":"6348a03b-2f09-7e16-ed73-00ba1eaf2983","openInExternalBrowser":false,"link":"http:\/\/www.hmtnutrition.co.za","description":null}],"pageLayout":-1},"meta":{"layout":null,"items":[{"id":"6348a03b-2f09-7e16-ed73-00ba1eaf2983","openInExternalBrowser":false,"link":"http:\/\/www.hmtnutrition.co.za","description":null}],"pageLayout":-1},"displayDevices":0,"alias":"hmt"},{"id":"9cca1607-6216-4fa9-ad10-fd17efec274d","label":"History","icon":"http:\/\/images.como-services.com\/icon\/external\/?src=http%3A%2F%2Fs.como.com%2Fmobile%2Fdf%2Fce%2Fdf444df8-f2ce-49fa-8244-88e3d8ae84f5%2FImages%2Fa47a7973-181b-475f-af77-bb56f9a9824b.Png","deviceIcon":null,"type":"27f91d0a-42c0-48fa-90a8-7138641ddecf","version":null,"minVersion":"0.0.0.0","devicesMeta":{"layouts":[{"deviceType":-1,"meta":{"bgImage":"http:\/\/s.como.com\/mobile\/df\/ce\/df444df8-f2ce-49fa-8244-88e3d8ae84f5\/95f24462-f149-44e2-aa8b-d4665febbbb9.png"}},{"deviceType":129,"meta":{"bgImage":"http:\/\/s.como.com\/mobile\/df\/ce\/df444df8-f2ce-49fa-8244-88e3d8ae84f5\/1f6c3e7e-1a93-476c-90ae-326d1cc5b685.jpg"}},{"deviceType":130,"meta":{"bgImage":"http:\/\/s.como.com\/mobile\/df\/ce\/df444df8-f2ce-49fa-8244-88e3d8ae84f5\/1f6c3e7e-1a93-476c-90ae-326d1cc5b685.jpg"}}],"layout":null,"notes":[{"id":"395b050a-bec8-c32f-3300-896c1424c3f5","html":"<p><strong>HMT Challenge<\/strong> has been going since 2006. It was always held as part of the Mr &amp; Ms Fitness SA Pageant at Grand West Casino. Since we have had the \"Yacht Cruise\" prize giving 2012, \"Tannie Eveta Peron\" in Darling prize giving 2013 and \"Fort Simon Medieval\" prize giving 2014.<\/p>\u000a<p>&nbsp;<\/p>\u000a<p>We try and do the prize giving in different venues with different themes or attractions to create a \"blissful\" experience for ALL family and friends that join on the day.&lrm;<\/p>\u000a<p>&nbsp;<\/p>\u000a<p>We have given R10 000 cash to each of these winners each time which has varied from a 16 year old Teenager to a lady, &nbsp;to a gent and one year we had both male and female winners. It all depends on the amount of entries as to what we will be doing next!!!<\/p>\u000a<p>&nbsp;<\/p>\u000a<p>Now we want YOU to join us as not only can you stand a chance to win R10 000 but your personal trainer of \"body fat assessor\" also stands a chance of winning R10 000 cash and <strong>all profits made in the event goes to our Durbanville Orphanage Project<\/strong>, so YOU can make a difference in a child's life by entering and loosing some unwanted body fat!&nbsp;<\/p>\u000a<p>&nbsp;<\/p>"}],"pageLayout":-1},"meta":{"layout":{"meta":{"bgImage":"http:\/\/s.como.com\/mobile\/df\/ce\/df444df8-f2ce-49fa-8244-88e3d8ae84f5\/95f24462-f149-44e2-aa8b-d4665febbbb9.png"}},"notes":[{"id":"395b050a-bec8-c32f-3300-896c1424c3f5","html":"<p><strong>HMT Challenge<\/strong> has been going since 2006. It was always held as part of the Mr &amp; Ms Fitness SA Pageant at Grand West Casino. Since we have had the \"Yacht Cruise\" prize giving 2012, \"Tannie Eveta Peron\" in Darling prize giving 2013 and \"Fort Simon Medieval\" prize giving 2014.<\/p>\u000a<p>&nbsp;<\/p>\u000a<p>We try and do the prize giving in different venues with different themes or attractions to create a \"blissful\" experience for ALL family and friends that join on the day.&lrm;<\/p>\u000a<p>&nbsp;<\/p>\u000a<p>We have given R10 000 cash to each of these winners each time which has varied from a 16 year old Teenager to a lady, &nbsp;to a gent and one year we had both male and female winners. It all depends on the amount of entries as to what we will be doing next!!!<\/p>\u000a<p>&nbsp;<\/p>\u000a<p>Now we want YOU to join us as not only can you stand a chance to win R10 000 but your personal trainer of \"body fat assessor\" also stands a chance of winning R10 000 cash and <strong>all profits made in the event goes to our Durbanville Orphanage Project<\/strong>, so YOU can make a difference in a child's life by entering and loosing some unwanted body fat!&nbsp;<\/p>\u000a<p>&nbsp;<\/p>"}],"pageLayout":-1},"displayDevices":0,"alias":"history"},{"id":"724ed240-d3db-485d-8174-1970d584e161","label":"Testimonials","icon":"http:\/\/images.como-services.com\/icon\/external\/?src=http%3A%2F%2Fs.como.com%2Fmobile%2Fdf%2Fce%2Fdf444df8-f2ce-49fa-8244-88e3d8ae84f5%2FImages%2Fea8edd91-1ffd-409f-9472-daeee089244a.Png","deviceIcon":null,"type":"51a61af7-1e90-4d68-88db-b1e69a0cca59","version":null,"minVersion":"0.0.0.0","devicesMeta":{"layouts":[],"layout":null,"feeds":[{"id":"fe721c6f-d601-654e-4039-40d88bc045d4","params":{"addGeo":false,"expiration":0,"sort":"Default"},"url":"http:\/\/hmtapp.blogspot.com\/feeds\/posts\/default"}],"pageLayout":4},"meta":{"layout":null,"feeds":[{"id":"fe721c6f-d601-654e-4039-40d88bc045d4","params":{"addGeo":false,"expiration":0,"sort":"Default"},"url":"http:\/\/hmtapp.blogspot.com\/feeds\/posts\/default"}],"pageLayout":4},"displayDevices":0,"alias":"testimonials"},{"id":"679a62bd-0c45-4ae2-8943-87e27b6e1f7e","label":"Sponsors","icon":"http:\/\/images.como-services.com\/icon\/external\/?src=http%3A%2F%2Fs.como.com%2Fmobile%2Fdf%2Fce%2Fdf444df8-f2ce-49fa-8244-88e3d8ae84f5%2FImages%2Fddf00cd6-a8bc-4f4d-8b95-fe738125625d.Png","deviceIcon":null,"type":"fc6700a7-a11e-de90-93f8-7357f9f0037f","version":null,"minVersion":"2.7.0.5","devicesMeta":{"layouts":[],"layout":null,"items":[{"text":null,"links":[{"url":"http:\/\/www.asara.co.za","imageUrl":"http:\/\/s.como.com\/mobile\/df\/ce\/df444df8-f2ce-49fa-8244-88e3d8ae84f5\/e1f08314-1d85-460f-9047-729568b224e3.jpg"},{"url":"http:\/\/www.hmtnutrition.co.za","imageUrl":"http:\/\/s.como.com\/mobile\/df\/ce\/df444df8-f2ce-49fa-8244-88e3d8ae84f5\/Images\/a2aacfaf-634e-4923-8adc-244728ef35c3.Jpeg"},{"url":"http:\/\/www.milkjug.co.za","imageUrl":"http:\/\/s.como.com\/mobile\/df\/ce\/df444df8-f2ce-49fa-8244-88e3d8ae84f5\/Images\/d61425e3-d3f6-4768-9334-4ce8e8206929.Jpeg"},{"url":"http:\/\/www.grandstylehiring.co.za","imageUrl":"http:\/\/s.como.com\/mobile\/df\/ce\/df444df8-f2ce-49fa-8244-88e3d8ae84f5\/Images\/78446aa7-9be9-48d7-b1f8-3d276e33d72c.Png"},{"url":"http:\/\/www.atkinssa.co.za","imageUrl":"http:\/\/s.como.com\/mobile\/df\/ce\/df444df8-f2ce-49fa-8244-88e3d8ae84f5\/Images\/6a272bab-adce-4fb9-a5d8-9838346cdabf.Jpeg"},{"url":"http:\/\/kranking.co.za","imageUrl":"http:\/\/s.como.com\/mobile\/df\/ce\/df444df8-f2ce-49fa-8244-88e3d8ae84f5\/Images\/9fdb18d3-ae14-4768-ae32-2a961bd224b4.Jpeg"},{"url":"http:\/\/www.facebook.com\/treatcapetown","imageUrl":"http:\/\/s.como.com\/mobile\/df\/ce\/df444df8-f2ce-49fa-8244-88e3d8ae84f5\/Images\/2e2f3cb3-ebdf-47fc-a65d-5a7d31849269.Png"}],"description":null}],"pageLayout":-1},"meta":{"layout":null,"items":[{"text":null,"links":[{"url":"http:\/\/www.asara.co.za","imageUrl":"http:\/\/s.como.com\/mobile\/df\/ce\/df444df8-f2ce-49fa-8244-88e3d8ae84f5\/e1f08314-1d85-460f-9047-729568b224e3.jpg"},{"url":"http:\/\/www.hmtnutrition.co.za","imageUrl":"http:\/\/s.como.com\/mobile\/df\/ce\/df444df8-f2ce-49fa-8244-88e3d8ae84f5\/Images\/a2aacfaf-634e-4923-8adc-244728ef35c3.Jpeg"},{"url":"http:\/\/www.milkjug.co.za","imageUrl":"http:\/\/s.como.com\/mobile\/df\/ce\/df444df8-f2ce-49fa-8244-88e3d8ae84f5\/Images\/d61425e3-d3f6-4768-9334-4ce8e8206929.Jpeg"},{"url":"http:\/\/www.grandstylehiring.co.za","imageUrl":"http:\/\/s.como.com\/mobile\/df\/ce\/df444df8-f2ce-49fa-8244-88e3d8ae84f5\/Images\/78446aa7-9be9-48d7-b1f8-3d276e33d72c.Png"},{"url":"http:\/\/www.atkinssa.co.za","imageUrl":"http:\/\/s.como.com\/mobile\/df\/ce\/df444df8-f2ce-49fa-8244-88e3d8ae84f5\/Images\/6a272bab-adce-4fb9-a5d8-9838346cdabf.Jpeg"},{"url":"http:\/\/kranking.co.za","imageUrl":"http:\/\/s.como.com\/mobile\/df\/ce\/df444df8-f2ce-49fa-8244-88e3d8ae84f5\/Images\/9fdb18d3-ae14-4768-ae32-2a961bd224b4.Jpeg"},{"url":"http:\/\/www.facebook.com\/treatcapetown","imageUrl":"http:\/\/s.como.com\/mobile\/df\/ce\/df444df8-f2ce-49fa-8244-88e3d8ae84f5\/Images\/2e2f3cb3-ebdf-47fc-a65d-5a7d31849269.Png"}],"description":null}],"pageLayout":-1},"displayDevices":0,"alias":"sponsors"},{"id":"dfee0f67-dac9-4f5a-9add-7681c9387440","label":"Tips","icon":"http:\/\/images.como-services.com\/icon\/external\/?src=http%3A%2F%2Fs.como.com%2Fmobile%2Fdf%2Fce%2Fdf444df8-f2ce-49fa-8244-88e3d8ae84f5%2FImages%2F2e0d0c4c-6515-433e-99f3-32e60253d015.Png","deviceIcon":null,"type":"df7d11f3-233c-4d49-8f2a-d1886e07c641","version":null,"minVersion":"0.0.0.0","devicesMeta":{"layouts":[],"layout":null,"channels":[{"id":"162b9413-6661-db0a-e155-31479bbbec98","postsSource":"feed","title":"Feed","user":"401670303255279"}],"pageLayout":0},"meta":{"layout":null,"channels":[{"id":"162b9413-6661-db0a-e155-31479bbbec98","postsSource":"feed","title":"Feed","user":"401670303255279"}],"pageLayout":0},"displayDevices":0,"alias":"tips"},{"id":"cd5f489d-d31c-49ae-bf23-b90a25ff0fb9","label":"Shop","icon":"http:\/\/images.como-services.com\/icon\/external\/?src=http%3A%2F%2Fs.como.com%2Fmobile%2Fdf%2Fce%2Fdf444df8-f2ce-49fa-8244-88e3d8ae84f5%2FImages%2F324ac251-59fc-463d-8f0b-2c2a7dd2d848.Png","deviceIcon":null,"type":"6181507a-fdf4-4b90-a270-cbd286603443","version":null,"minVersion":"3.2.0.0","devicesMeta":{"layouts":[],"layout":null,"items":[{"id":"38e1f9a7-f922-197d-98d4-bb6ff8abda0d","name":"Shop","description":null,"params":{"id":"7f42c2ce-1589-5e3a-cffb-8560635d966d"},"meta":{"images":{"header":"http:\/\/s.conduit.com\/mobile\/df\/ce\/df444df8-f2ce-49fa-8244-88e3d8ae84f5\/Images\/7d1f1034-0c95-445d-9d3b-9f3dad3e1faa.Jpeg"}}}],"pageLayout":-1},"meta":{"layout":null,"items":[{"id":"38e1f9a7-f922-197d-98d4-bb6ff8abda0d","name":"Shop","description":null,"params":{"id":"7f42c2ce-1589-5e3a-cffb-8560635d966d"},"meta":{"images":{"header":"http:\/\/s.conduit.com\/mobile\/df\/ce\/df444df8-f2ce-49fa-8244-88e3d8ae84f5\/Images\/7d1f1034-0c95-445d-9d3b-9f3dad3e1faa.Jpeg"}}}],"pageLayout":-1},"displayDevices":0,"alias":"shop"},{"id":"845999e9-9cd7-4cdf-977a-f72cecc118ed","label":"Photos","icon":"http:\/\/images.como-services.com\/icon\/external\/?src=http%3A%2F%2Fs.como.com%2Fmobile%2Fdf%2Fce%2Fdf444df8-f2ce-49fa-8244-88e3d8ae84f5%2FImages%2Fa97e68e7-5b7d-4dc6-be68-397d0c737b73.Png","deviceIcon":null,"type":"3b11bcdf-ba5e-4eaa-9059-ea580b3f1681","version":null,"minVersion":"0.0.0.0","devicesMeta":{"layouts":[],"layout":null,"feeds":[{"id":"dd955f55-effd-3471-78bb-aa7a8fe3a98b","title":"General","type":"facebook","params":{"albumId":"402697969819179","albumName":"Timeline Photos","albumDisplayName":"Timeline Photos"},"userName":"401670303255279"},{"id":"dc2f9904-53e8-4d92-f9b7-74f718378e74","title":"Previous years!","type":"facebook","params":{"albumId":"697324447023195","albumName":"Previous years!!!","albumDisplayName":"Previous years!!!"},"userName":"401670303255279"}],"pageLayout":9},"meta":{"layout":null,"feeds":[{"id":"dd955f55-effd-3471-78bb-aa7a8fe3a98b","title":"General","type":"facebook","params":{"albumId":"402697969819179","albumName":"Timeline Photos","albumDisplayName":"Timeline Photos"},"userName":"401670303255279"},{"id":"dc2f9904-53e8-4d92-f9b7-74f718378e74","title":"Previous years!","type":"facebook","params":{"albumId":"697324447023195","albumName":"Previous years!!!","albumDisplayName":"Previous years!!!"},"userName":"401670303255279"}],"pageLayout":9},"displayDevices":0,"alias":"photos"},{"id":"9042a0e8-6a5f-4d21-a3b9-9d8073159470","label":"Contact Us","icon":"http:\/\/images.como-services.com\/icon\/external\/?src=http%3A%2F%2Fs.como.com%2Fmobile%2Fdf%2Fce%2Fdf444df8-f2ce-49fa-8244-88e3d8ae84f5%2FImages%2F5a905ac1-83dc-4710-aaab-2019ac0c08f4.Png","deviceIcon":null,"type":"083e52df-721d-4ca4-efa3-25161d344f40","version":null,"minVersion":"1.9.0.0","devicesMeta":{"layouts":[],"layout":null,"pageLayout":0,"items":[{"id":"005ba4ce-2600-1709-798a-07e19d2b6dbb","mail":"bdtrade@iafrica.com","url":"http:\/\/hmtnutrition.co.za","header":"HMT Challenge","text":"South Africa","description":"<p><em>* Powered by Modern Web Presence<\/em><\/p>"}]},"meta":{"layout":null,"pageLayout":0,"items":[{"id":"005ba4ce-2600-1709-798a-07e19d2b6dbb","mail":"bdtrade@iafrica.com","url":"http:\/\/hmtnutrition.co.za","header":"HMT Challenge","text":"South Africa","description":"<p><em>* Powered by Modern Web Presence<\/em><\/p>"}]},"displayDevices":0,"alias":"contact-us"}],"modules":[],"version":"1.146.266.820","social":{"facebook":{"appId":"232039573607224"}},"globalAppId":"df444df8-f2ce-49fa-8244-88e3d8ae84f5"},"maxAge":1800,"serviceUrl":"http:\/\/app.como-services.com\/api\/app\/08837ee2-2c98-4d98-b17e-d9182006e1c1\/2?appVersion={appVersion}"},{"data":{"title":"HMT Challenge","link":"http:\/\/hmtapp.blogspot.com\/?noredirect=1#noredirect","description":null,"imageUrl":null,"items":[{"title":"Gert Louw","link":"http:\/\/hmtapp.blogspot.com\/2014\/11\/gert-louw.html?noredirect=1&noredirect=1#comment-form","description":"Mark started with 8% body fat, ended at 4% over a 3 month period! Before After","descriptionWithHtml":"<div dir=\"ltr\" style=\"text-align: left;\" trbidi=\"on\">Mark started with 8% body fat, ended at 4% over a 3 month period!<br \/><div style=\"text-align: center;\"><div style=\"text-align: left;\"><br \/><\/div><div style=\"text-align: left;\">Before<\/div><div style=\"text-align: left;\"><a href=\"http:\/\/3.bp.blogspot.com\/-NA2uSk2vNHI\/VHTETVk-2ZI\/AAAAAAAAf4Q\/js0ZHFwi_Cw\/s1600\/gert%2Bbefore%2Bpic%2Bhigh%2Bres.jpg\" imageanchor=\"1\" style=\"margin-left: 1em; margin-right: 1em;\"><img border=\"0\" src=\"http:\/\/3.bp.blogspot.com\/-NA2uSk2vNHI\/VHTETVk-2ZI\/AAAAAAAAf4Q\/js0ZHFwi_Cw\/s1600\/gert%2Bbefore%2Bpic%2Bhigh%2Bres.jpg\" height=\"320\" width=\"162\" \/><\/a><\/div><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: left;\">After<\/div><div class=\"separator\" style=\"clear: both; text-align: left;\"><a href=\"http:\/\/4.bp.blogspot.com\/-sYVsuBwx-WU\/VHTFfDvAMTI\/AAAAAAAAf4k\/qfJgewfQwbI\/s1600\/IMG_2348_Web_small.jpg\" imageanchor=\"1\" style=\"margin-left: 1em; margin-right: 1em;\"><img border=\"0\" src=\"http:\/\/4.bp.blogspot.com\/-sYVsuBwx-WU\/VHTFfDvAMTI\/AAAAAAAAf4k\/qfJgewfQwbI\/s1600\/IMG_2348_Web_small.jpg\" height=\"320\" width=\"226\" \/><\/a><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div style=\"text-align: center;\"><br \/><\/div><\/div>","contentWithHtml":null,"datetime":1416939125,"id":"tag:blogger.com,1999:blog-8602866697957575262.post-4549709790908594212","imageUrl":"http:\/\/3.bp.blogspot.com\/-NA2uSk2vNHI\/VHTETVk-2ZI\/AAAAAAAAf4Q\/js0ZHFwi_Cw\/s200-c\/gert%2Bbefore%2Bpic%2Bhigh%2Bres.jpg","disableContentImageUrl":false,"date":"2014-11-25T18:12:05.394Z","geo":null,"socialInfo":{"socialId":"Feeds:tag:blogger.com,1999:blog-8602866697957575262.post-4549709790908594212","url":"http:\/\/hmtapp.blogspot.com\/2014\/11\/gert-louw.html?noredirect=1#comment-form","title":"Gert Louw","shortDesc":"Mark started with 8% body fat, ended at 4% over a 3 month period! Before After","imageUrl":"http:\/\/3.bp.blogspot.com\/-NA2uSk2vNHI\/VHTETVk-2ZI\/AAAAAAAAf4Q\/js0ZHFwi_Cw\/s200-c\/gert%2Bbefore%2Bpic%2Bhigh%2Bres.jpg"},"contentImageUrl":"http:\/\/3.bp.blogspot.com\/-NA2uSk2vNHI\/VHTETVk-2ZI\/AAAAAAAAf4Q\/js0ZHFwi_Cw\/s200-c\/gert%2Bbefore%2Bpic%2Bhigh%2Bres.jpg"},{"title":"Incredible muscle transformation of 47 y\/o - Mark Couzens","link":"http:\/\/hmtapp.blogspot.com\/2014\/11\/incredible-muscle-transformation-of-47.html?noredirect=1&noredirect=1#comment-form","description":"Before VIDEO: http:\/\/youtu.be\/wWTmFQbE2ok","descriptionWithHtml":"<div dir=\"ltr\" style=\"text-align: left;\" trbidi=\"on\"><br \/><div><div style=\"text-align: center;\"><div style=\"text-align: left;\">Before<\/div><\/div><div class=\"separator\" style=\"clear: both; text-align: left;\"><a href=\"http:\/\/4.bp.blogspot.com\/-D5Wvs_iILQE\/VHTEgAWYPiI\/AAAAAAAAf4Y\/3Qq-PymnvEM\/s1600\/IMG_8515.jpg\" imageanchor=\"1\" style=\"margin-left: 1em; margin-right: 1em;\"><img border=\"0\" src=\"http:\/\/4.bp.blogspot.com\/-D5Wvs_iILQE\/VHTEgAWYPiI\/AAAAAAAAf4Y\/3Qq-PymnvEM\/s1600\/IMG_8515.jpg\" height=\"320\" width=\"180\" \/><\/a><\/div><div style=\"text-align: center;\"><br \/><\/div>VIDEO: http:\/\/youtu.be\/wWTmFQbE2ok<br \/><div style=\"text-align: center;\"><br \/><\/div><div style=\"text-align: center;\"><div style=\"text-align: left;\"><iframe allowfullscreen=\"\" frameborder=\"0\" height=\"236\" src=\"\/\/www.youtube.com\/embed\/wWTmFQbE2ok\" width=\"420\"><\/iframe><\/div><\/div><br \/><br \/><br \/><br \/><br \/><br \/><br \/><br \/><\/div><\/div>","contentWithHtml":null,"datetime":1416939600,"id":"tag:blogger.com,1999:blog-8602866697957575262.post-6223962974474046789","imageUrl":"http:\/\/4.bp.blogspot.com\/-D5Wvs_iILQE\/VHTEgAWYPiI\/AAAAAAAAf4Y\/3Qq-PymnvEM\/s200-c\/IMG_8515.jpg","disableContentImageUrl":false,"date":"2014-11-25T18:20:00.35Z","geo":null,"socialInfo":{"socialId":"Feeds:tag:blogger.com,1999:blog-8602866697957575262.post-6223962974474046789","url":"http:\/\/hmtapp.blogspot.com\/2014\/11\/incredible-muscle-transformation-of-47.html?noredirect=1#comment-form","title":"Incredible muscle transformation of 47 y\/o - Mark Couzens","shortDesc":"Before VIDEO: http:\/\/youtu.be\/wWTmFQbE2ok","imageUrl":"http:\/\/4.bp.blogspot.com\/-D5Wvs_iILQE\/VHTEgAWYPiI\/AAAAAAAAf4Y\/3Qq-PymnvEM\/s200-c\/IMG_8515.jpg"},"contentImageUrl":"http:\/\/4.bp.blogspot.com\/-D5Wvs_iILQE\/VHTEgAWYPiI\/AAAAAAAAf4Y\/3Qq-PymnvEM\/s200-c\/IMG_8515.jpg"},{"title":"Charlette Harris","link":"http:\/\/hmtapp.blogspot.com\/2014\/11\/charlette-harris.html?noredirect=1&noredirect=1#comment-form","description":"Charlette has a very fast metabolism and is a typical \"ectomorph\" body type. The sugar in her diet will actually make it difficult in her case to add on muscle, as it is speeding tings up too much, but I couldn't just take all the sugar out, so we had to cut it down slowly and over 3 months, we went off it totally. If you take the sugar away then you have to give the body back some other forms of carbohydrates in the from of fruit, potatoes, rice ect. So this is How I changed hers. In order to add more muscle, but still drop body fat, I kept the calories the same but changed the ratio of protein to carbs and fat.","descriptionWithHtml":"<div dir=\"ltr\" style=\"text-align: left;\" trbidi=\"on\"><div class=\"MsoNormal\"><span style=\"font-family: \"Times New Roman\",\"serif\"; font-size: 12.0pt; mso-fareast-font-family: \"Times New Roman\"; mso-fareast-language: EN-ZA;\">Charlette has a very fast metabolism and is a typical \"ectomorph\" body type. The sugar in her diet will actually make it difficult in her case to add on muscle, as it is speeding tings up too much, but I couldn't just take all the sugar out, so we had to cut it down slowly and over 3 months, we went off it totally. If you take the sugar away then you have to give the body back some other forms of carbohydrates in the from of fruit, potatoes, rice ect. So this is How I changed hers.<o:p><\/o:p><\/span><\/div><span style=\"font-family: \"Times New Roman\",\"serif\"; font-size: 12.0pt; line-height: 115%; mso-ansi-language: EN-ZA; mso-bidi-language: AR-SA; mso-fareast-font-family: \"Times New Roman\"; mso-fareast-language: EN-ZA;\">In order to add more muscle, but still drop body fat, I kept the calories the same but changed the ratio of protein to carbs and fat.<\/span><br \/><span style=\"font-family: \"Times New Roman\",\"serif\"; font-size: 12.0pt; line-height: 115%; mso-ansi-language: EN-ZA; mso-bidi-language: AR-SA; mso-fareast-font-family: \"Times New Roman\"; mso-fareast-language: EN-ZA;\"><br \/><\/span><br \/><div class=\"separator\" style=\"clear: both; text-align: center;\"><a href=\"http:\/\/2.bp.blogspot.com\/-KhAl1DOoNPg\/VHMDEyHL-iI\/AAAAAAAAf2k\/ji9h9JuD0Ho\/s1600\/2014-11-24_1205.png\" imageanchor=\"1\" style=\"margin-left: 1em; margin-right: 1em;\"><img border=\"0\" src=\"http:\/\/2.bp.blogspot.com\/-KhAl1DOoNPg\/VHMDEyHL-iI\/AAAAAAAAf2k\/ji9h9JuD0Ho\/s1600\/2014-11-24_1205.png\" height=\"201\" width=\"640\" \/><\/a><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div style=\"text-align: center;\"><span style=\"font-family: \"Times New Roman\",\"serif\"; font-size: 12.0pt; line-height: 115%; mso-ansi-language: EN-ZA; mso-bidi-language: AR-SA; mso-fareast-font-family: \"Times New Roman\"; mso-fareast-language: EN-ZA;\"><br \/><\/span><\/div><\/div>","contentWithHtml":null,"datetime":1416939907,"id":"tag:blogger.com,1999:blog-8602866697957575262.post-6480812873159925009","imageUrl":"http:\/\/2.bp.blogspot.com\/-KhAl1DOoNPg\/VHMDEyHL-iI\/AAAAAAAAf2k\/ji9h9JuD0Ho\/s200-c\/2014-11-24_1205.png","disableContentImageUrl":false,"date":"2014-11-25T18:25:07.128Z","geo":null,"socialInfo":{"socialId":"Feeds:tag:blogger.com,1999:blog-8602866697957575262.post-6480812873159925009","url":"http:\/\/hmtapp.blogspot.com\/2014\/11\/charlette-harris.html?noredirect=1#comment-form","title":"Charlette Harris","shortDesc":"Charlette has a very fast metabolism and is a typical \"ectomorph\" body type. The sugar in her diet will actually make it difficult in her case to add on muscle, as it is speeding tings up too much, but I couldn't just take all the sugar out, so we had to cut it down slowly and over 3 months, we went off it totally. If you take the sugar away then you have to give the body back some other forms of carbohydrates in the from of fruit, potatoes, rice ect. So this is How I changed hers. In order to add more muscle, but still drop body fat, I kept the calories the same but changed the ratio of protein to carbs and fat.","imageUrl":"http:\/\/2.bp.blogspot.com\/-KhAl1DOoNPg\/VHMDEyHL-iI\/AAAAAAAAf2k\/ji9h9JuD0Ho\/s200-c\/2014-11-24_1205.png"},"contentImageUrl":"http:\/\/2.bp.blogspot.com\/-KhAl1DOoNPg\/VHMDEyHL-iI\/AAAAAAAAf2k\/ji9h9JuD0Ho\/s200-c\/2014-11-24_1205.png"},{"title":"Lisa Ncetani","link":"http:\/\/hmtapp.blogspot.com\/2014\/11\/lisa-ncetani.html?noredirect=1&noredirect=1#comment-form","description":"Lisa trained at 7pm and took no protein shake after training. Now for most of you this seems like a very healthy diet, but in Lisa's case, as she has a typical pear shape body, it is too high in wheat products (allbran, provita and pasta). She is wheat intolerant and the wheat in her diet increases her estorgen which makes her store fat on the bum area. The ratio of carbs, to protein to fat is also why out. She will do better on a lower carb, higher fat and protein diet.","descriptionWithHtml":"<div dir=\"ltr\" style=\"text-align: left;\" trbidi=\"on\"><br \/>Lisa trained at 7pm and took no protein shake after training. Now for most of you this seems like a very healthy diet, but in Lisa's case, as she has a typical pear shape body, it is too high in wheat products (allbran, provita and pasta). She is wheat intolerant and the wheat in her diet increases her estorgen which makes her store fat on the bum area. The ratio of carbs, to protein to fat is also why out. She will do better on a lower carb, higher fat and protein diet.<br \/><div><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><a href=\"http:\/\/4.bp.blogspot.com\/-Ahre6M9_Kz4\/VHMC215o0RI\/AAAAAAAAf2c\/UUf755C39uI\/s1600\/2014-11-24_1203.png\" imageanchor=\"1\" style=\"margin-left: 1em; margin-right: 1em;\"><img border=\"0\" src=\"http:\/\/4.bp.blogspot.com\/-Ahre6M9_Kz4\/VHMC215o0RI\/AAAAAAAAf2c\/UUf755C39uI\/s1600\/2014-11-24_1203.png\" height=\"201\" width=\"640\" \/><\/a><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div style=\"text-align: center;\"><br \/><\/div><\/div>","contentWithHtml":null,"datetime":1416939918,"id":"tag:blogger.com,1999:blog-8602866697957575262.post-5227991546103555276","imageUrl":"http:\/\/4.bp.blogspot.com\/-Ahre6M9_Kz4\/VHMC215o0RI\/AAAAAAAAf2c\/UUf755C39uI\/s200-c\/2014-11-24_1203.png","disableContentImageUrl":false,"date":"2014-11-25T18:25:18.57Z","geo":null,"socialInfo":{"socialId":"Feeds:tag:blogger.com,1999:blog-8602866697957575262.post-5227991546103555276","url":"http:\/\/hmtapp.blogspot.com\/2014\/11\/lisa-ncetani.html?noredirect=1#comment-form","title":"Lisa Ncetani","shortDesc":"Lisa trained at 7pm and took no protein shake after training. Now for most of you this seems like a very healthy diet, but in Lisa's case, as she has a typical pear shape body, it is too high in wheat products (allbran, provita and pasta). She is wheat intolerant and the wheat in her diet increases her estorgen which makes her store fat on the bum area. The ratio of carbs, to protein to fat is also why out. She will do better on a lower carb, higher fat and protein diet.","imageUrl":"http:\/\/4.bp.blogspot.com\/-Ahre6M9_Kz4\/VHMC215o0RI\/AAAAAAAAf2c\/UUf755C39uI\/s200-c\/2014-11-24_1203.png"},"contentImageUrl":"http:\/\/4.bp.blogspot.com\/-Ahre6M9_Kz4\/VHMC215o0RI\/AAAAAAAAf2c\/UUf755C39uI\/s200-c\/2014-11-24_1203.png"},{"title":"Bernadine Schwartz","link":"http:\/\/hmtapp.blogspot.com\/2014\/11\/bernadine-schwartz.html?noredirect=1&noredirect=1#comment-form","description":"She is a typical wife with kids, we tend to do the quick stuff, fish fingers and chips at night because it incorporates meals the kids also eat, but you have to look out for yourself, so make better choice as I will show you here below. She also wants to add more muscle, so I keep the calories the same as what she has been eating up till now but just balancing it better in each meal. TOTAL CALORIES: ± 1700 per day Protein: 100g Carbohydrates: 200g Fat: 88g","descriptionWithHtml":"<div dir=\"ltr\" style=\"text-align: left;\" trbidi=\"on\"><div class=\"MsoNormal\"><span style=\"font-family: \"Times New Roman\",\"serif\"; font-size: 12.0pt; mso-fareast-font-family: \"Times New Roman\"; mso-fareast-language: EN-ZA;\">She is a typical wife with kids, we tend to do the quick stuff, fish fingers and chips at night because it incorporates meals the kids also eat, but you have to look out for yourself, so make better choice as I will show you here below. <o:p><\/o:p><\/span><\/div><div class=\"MsoNormal\"><span style=\"font-family: \"Times New Roman\",\"serif\"; font-size: 12.0pt; mso-fareast-font-family: \"Times New Roman\"; mso-fareast-language: EN-ZA;\">She also wants to add more muscle, so I keep the calories the same as what she has been eating up till now but just balancing it better in each meal.<o:p><\/o:p><\/span><\/div><b><span style=\"font-family: \"Times New Roman\",\"serif\"; font-size: 12.0pt; line-height: 115%; mso-ansi-language: EN-ZA; mso-bidi-language: AR-SA; mso-fareast-font-family: \"Times New Roman\"; mso-fareast-language: EN-ZA;\">TOTAL CALORIES:<\/span><\/b><span style=\"font-family: \"Times New Roman\",\"serif\"; font-size: 12.0pt; line-height: 115%; mso-ansi-language: EN-ZA; mso-bidi-language: AR-SA; mso-fareast-font-family: \"Times New Roman\"; mso-fareast-language: EN-ZA;\"> ± 1700 per day <br \/><b> Protein:<\/b> 100g <br \/><b> Carbohydrates: <\/b>200g <br \/><b> Fat: <\/b>88g<\/span><br \/><span style=\"font-family: \"Times New Roman\",\"serif\"; font-size: 12.0pt; line-height: 115%; mso-ansi-language: EN-ZA; mso-bidi-language: AR-SA; mso-fareast-font-family: \"Times New Roman\"; mso-fareast-language: EN-ZA;\"><br \/><\/span><br \/><div class=\"separator\" style=\"clear: both; text-align: center;\"><a href=\"http:\/\/3.bp.blogspot.com\/-0XGITrPNYr0\/VHMB6CT4bQI\/AAAAAAAAf2Q\/sCpxatYzxb8\/s1600\/2014-11-24_1200.png\" imageanchor=\"1\" style=\"margin-left: 1em; margin-right: 1em;\"><img border=\"0\" src=\"http:\/\/3.bp.blogspot.com\/-0XGITrPNYr0\/VHMB6CT4bQI\/AAAAAAAAf2Q\/sCpxatYzxb8\/s1600\/2014-11-24_1200.png\" height=\"203\" width=\"640\" \/><\/a><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div style=\"text-align: center;\"><br \/><\/div><\/div>","contentWithHtml":null,"datetime":1416939931,"id":"tag:blogger.com,1999:blog-8602866697957575262.post-1785622737476305225","imageUrl":"http:\/\/3.bp.blogspot.com\/-0XGITrPNYr0\/VHMB6CT4bQI\/AAAAAAAAf2Q\/sCpxatYzxb8\/s200-c\/2014-11-24_1200.png","disableContentImageUrl":false,"date":"2014-11-25T18:25:31.248Z","geo":null,"socialInfo":{"socialId":"Feeds:tag:blogger.com,1999:blog-8602866697957575262.post-1785622737476305225","url":"http:\/\/hmtapp.blogspot.com\/2014\/11\/bernadine-schwartz.html?noredirect=1#comment-form","title":"Bernadine Schwartz","shortDesc":"She is a typical wife with kids, we tend to do the quick stuff, fish fingers and chips at night because it incorporates meals the kids also eat, but you have to look out for yourself, so make better choice as I will show you here below. She also wants to add more muscle, so I keep the calories the same as what she has been eating up till now but just balancing it better in each meal. TOTAL CALORIES: ± 1700 per day Protein: 100g Carbohydrates: 200g Fat: 88g","imageUrl":"http:\/\/3.bp.blogspot.com\/-0XGITrPNYr0\/VHMB6CT4bQI\/AAAAAAAAf2Q\/sCpxatYzxb8\/s200-c\/2014-11-24_1200.png"},"contentImageUrl":"http:\/\/3.bp.blogspot.com\/-0XGITrPNYr0\/VHMB6CT4bQI\/AAAAAAAAf2Q\/sCpxatYzxb8\/s200-c\/2014-11-24_1200.png"},{"title":"Christoff Dippenaar","link":"http:\/\/hmtapp.blogspot.com\/2014\/11\/christoff-dippenaar.html?noredirect=1&noredirect=1#comment-form","description":"We started at 2700 calories and he dropped 9kg of fat in that period of 4 months, then in 2008 he dropped a total of another 12kg of fat. As his metabolism sped up, I had to slowly increase his calories to 3000, then 3200 in order to preserve his muscles. He is now at the stage when he wants to add more muscle, so we have increased the calories to 3600 and I will be increasing it by 300 every month in order for him to pack on enough size. Looking forward to seeing the end result by August. Supplements he used: Thermogenics (ECA stack), Creatine Ethyl Ester (to gain a bit of muscle) and Explode (the pre-workout combination drink that gives a great pump, energy and muscle volume.","descriptionWithHtml":"<div dir=\"ltr\" style=\"text-align: left;\" trbidi=\"on\"><div class=\"MsoNormal\"><span style=\"font-family: \"Times New Roman\",\"serif\"; font-size: 12.0pt; mso-fareast-font-family: \"Times New Roman\"; mso-fareast-language: EN-ZA;\">We started at 2700 calories and he dropped 9kg of fat in that period of 4 months, then in 2008 he dropped a total of another 12kg of fat. As his metabolism sped up, I had to slowly increase his calories to 3000, then 3200 in order to preserve his muscles. <o:p><\/o:p><\/span><\/div><div class=\"MsoNormal\"><span style=\"font-family: \"Times New Roman\",\"serif\"; font-size: 12.0pt; mso-fareast-font-family: \"Times New Roman\"; mso-fareast-language: EN-ZA;\">He is now at the stage when he wants to add more muscle, so we have increased the calories to 3600 and I will be increasing it by 300 every month in order for him to pack on enough size. Looking forward to seeing the end result by August.<o:p><\/o:p><\/span><\/div><b><span style=\"font-family: \"Times New Roman\",\"serif\"; font-size: 12.0pt; line-height: 115%; mso-ansi-language: EN-ZA; mso-bidi-language: AR-SA; mso-fareast-font-family: \"Times New Roman\"; mso-fareast-language: EN-ZA;\">Supplements he used:<\/span><\/b><span style=\"font-family: \"Times New Roman\",\"serif\"; font-size: 12.0pt; line-height: 115%; mso-ansi-language: EN-ZA; mso-bidi-language: AR-SA; mso-fareast-font-family: \"Times New Roman\"; mso-fareast-language: EN-ZA;\"> Thermogenics (ECA stack), Creatine Ethyl Ester (to gain a bit of muscle) and Explode (the pre-workout combination drink that gives a great pump, energy and muscle volume.<\/span><br \/><span style=\"font-family: \"Times New Roman\",\"serif\"; font-size: 12.0pt; line-height: 115%; mso-ansi-language: EN-ZA; mso-bidi-language: AR-SA; mso-fareast-font-family: \"Times New Roman\"; mso-fareast-language: EN-ZA;\"><br \/><\/span><br \/><div class=\"separator\" style=\"clear: both; text-align: center;\"><a href=\"http:\/\/4.bp.blogspot.com\/-Nrh2Z4uao14\/VHMBil9cfWI\/AAAAAAAAf2I\/Z9ESzUqri7o\/s1600\/2014-11-24_1158.png\" imageanchor=\"1\" style=\"margin-left: 1em; margin-right: 1em;\"><img border=\"0\" src=\"http:\/\/4.bp.blogspot.com\/-Nrh2Z4uao14\/VHMBil9cfWI\/AAAAAAAAf2I\/Z9ESzUqri7o\/s1600\/2014-11-24_1158.png\" height=\"200\" width=\"640\" \/><\/a><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div style=\"text-align: center;\"><span style=\"font-family: \"Times New Roman\",\"serif\"; font-size: 12.0pt; line-height: 115%; mso-ansi-language: EN-ZA; mso-bidi-language: AR-SA; mso-fareast-font-family: \"Times New Roman\"; mso-fareast-language: EN-ZA;\"><br \/><\/span><\/div><\/div>","contentWithHtml":null,"datetime":1416939940,"id":"tag:blogger.com,1999:blog-8602866697957575262.post-1389434030610583084","imageUrl":"http:\/\/4.bp.blogspot.com\/-Nrh2Z4uao14\/VHMBil9cfWI\/AAAAAAAAf2I\/Z9ESzUqri7o\/s200-c\/2014-11-24_1158.png","disableContentImageUrl":false,"date":"2014-11-25T18:25:40.617Z","geo":null,"socialInfo":{"socialId":"Feeds:tag:blogger.com,1999:blog-8602866697957575262.post-1389434030610583084","url":"http:\/\/hmtapp.blogspot.com\/2014\/11\/christoff-dippenaar.html?noredirect=1#comment-form","title":"Christoff Dippenaar","shortDesc":"We started at 2700 calories and he dropped 9kg of fat in that period of 4 months, then in 2008 he dropped a total of another 12kg of fat. As his metabolism sped up, I had to slowly increase his calories to 3000, then 3200 in order to preserve his muscles. He is now at the stage when he wants to add more muscle, so we have increased the calories to 3600 and I will be increasing it by 300 every month in order for him to pack on enough size. Looking forward to seeing the end result by August. Supplements he used: Thermogenics (ECA stack), Creatine Ethyl Ester (to gain a bit of muscle) and Explode (the pre-workout combination drink that gives a great pump, energy and muscle volume.","imageUrl":"http:\/\/4.bp.blogspot.com\/-Nrh2Z4uao14\/VHMBil9cfWI\/AAAAAAAAf2I\/Z9ESzUqri7o\/s200-c\/2014-11-24_1158.png"},"contentImageUrl":"http:\/\/4.bp.blogspot.com\/-Nrh2Z4uao14\/VHMBil9cfWI\/AAAAAAAAf2I\/Z9ESzUqri7o\/s200-c\/2014-11-24_1158.png"},{"title":"CARYN SWART (SA FITNESS CHALLENGE WINNER 2010)","link":"http:\/\/hmtapp.blogspot.com\/2014\/11\/caryn-swart-sa-fitness-challenge-winner.html?noredirect=1&noredirect=1#comment-form","description":"My name is Caryn Swart – and I would like to begin by giving my background history – to contextualise the journey that I traveled, how far I’ve come, and how the choice of a healthier lifestyle, currently leaves me able to live life with confidence, wisdom, happiness and full of energy.","descriptionWithHtml":"<div dir=\"ltr\" style=\"text-align: left;\" trbidi=\"on\"><span style=\"font-family: \"Times New Roman\",\"serif\"; font-size: 12.0pt; line-height: 115%; mso-ansi-language: EN-ZA; mso-bidi-language: AR-SA; mso-fareast-font-family: \"Times New Roman\"; mso-fareast-language: EN-ZA;\">My name is Caryn Swart – and I would like to begin by giving my background history – to contextualise the journey that I traveled, how far I’ve come, and how the choice of a healthier lifestyle, currently leaves me able to live life with confidence, wisdom, happiness and full of energy.<\/span><br \/><span style=\"font-family: \"Times New Roman\",\"serif\"; font-size: 12.0pt; line-height: 115%; mso-ansi-language: EN-ZA; mso-bidi-language: AR-SA; mso-fareast-font-family: \"Times New Roman\"; mso-fareast-language: EN-ZA;\"><br \/><\/span><br \/><div class=\"separator\" style=\"clear: both; text-align: center;\"><a href=\"http:\/\/1.bp.blogspot.com\/-EpLOLpDBZQA\/VHMBHbdJcCI\/AAAAAAAAf2A\/wKlNj1c0Jos\/s1600\/2014-11-24_1157.png\" imageanchor=\"1\" style=\"margin-left: 1em; margin-right: 1em;\"><img border=\"0\" src=\"http:\/\/1.bp.blogspot.com\/-EpLOLpDBZQA\/VHMBHbdJcCI\/AAAAAAAAf2A\/wKlNj1c0Jos\/s1600\/2014-11-24_1157.png\" height=\"187\" width=\"640\" \/><\/a><\/div><div style=\"text-align: center;\"><br \/><\/div><div style=\"text-align: center;\"><span style=\"font-family: \"Times New Roman\",\"serif\"; font-size: 12.0pt; line-height: 115%; mso-ansi-language: EN-ZA; mso-bidi-language: AR-SA; mso-fareast-font-family: \"Times New Roman\"; mso-fareast-language: EN-ZA;\"><br \/><\/span><\/div><div style=\"text-align: center;\"><span style=\"font-family: \"Times New Roman\",\"serif\"; font-size: 12.0pt; line-height: 115%; mso-ansi-language: EN-ZA; mso-bidi-language: AR-SA; mso-fareast-font-family: \"Times New Roman\"; mso-fareast-language: EN-ZA;\"><br \/><\/span><\/div><div style=\"text-align: center;\"><span style=\"font-family: \"Times New Roman\",\"serif\"; font-size: 12.0pt; line-height: 115%; mso-ansi-language: EN-ZA; mso-bidi-language: AR-SA; mso-fareast-font-family: \"Times New Roman\"; mso-fareast-language: EN-ZA;\"><br \/><\/span><\/div><div style=\"text-align: center;\"><span style=\"font-family: \"Times New Roman\",\"serif\"; font-size: 12.0pt; line-height: 115%; mso-ansi-language: EN-ZA; mso-bidi-language: AR-SA; mso-fareast-font-family: \"Times New Roman\"; mso-fareast-language: EN-ZA;\"><br \/><\/span><\/div><div style=\"text-align: center;\"><span style=\"font-family: \"Times New Roman\",\"serif\"; font-size: 12.0pt; line-height: 115%; mso-ansi-language: EN-ZA; mso-bidi-language: AR-SA; mso-fareast-font-family: \"Times New Roman\"; mso-fareast-language: EN-ZA;\"><br \/><\/span><\/div><div style=\"text-align: center;\"><span style=\"font-family: \"Times New Roman\",\"serif\"; font-size: 12.0pt; line-height: 115%; mso-ansi-language: EN-ZA; mso-bidi-language: AR-SA; mso-fareast-font-family: \"Times New Roman\"; mso-fareast-language: EN-ZA;\"><br \/><\/span><\/div><\/div>","contentWithHtml":null,"datetime":1416939949,"id":"tag:blogger.com,1999:blog-8602866697957575262.post-6686410724862274853","imageUrl":"http:\/\/1.bp.blogspot.com\/-EpLOLpDBZQA\/VHMBHbdJcCI\/AAAAAAAAf2A\/wKlNj1c0Jos\/s200-c\/2014-11-24_1157.png","disableContentImageUrl":false,"date":"2014-11-25T18:25:49.53Z","geo":null,"socialInfo":{"socialId":"Feeds:tag:blogger.com,1999:blog-8602866697957575262.post-6686410724862274853","url":"http:\/\/hmtapp.blogspot.com\/2014\/11\/caryn-swart-sa-fitness-challenge-winner.html?noredirect=1#comment-form","title":"CARYN SWART (SA FITNESS CHALLENGE WINNER 2010)","shortDesc":"My name is Caryn Swart – and I would like to begin by giving my background history – to contextualise the journey that I traveled, how far I’ve come, and how the choice of a healthier lifestyle, currently leaves me able to live life with confidence, wisdom, happiness and full of energy.","imageUrl":"http:\/\/1.bp.blogspot.com\/-EpLOLpDBZQA\/VHMBHbdJcCI\/AAAAAAAAf2A\/wKlNj1c0Jos\/s200-c\/2014-11-24_1157.png"},"contentImageUrl":"http:\/\/1.bp.blogspot.com\/-EpLOLpDBZQA\/VHMBHbdJcCI\/AAAAAAAAf2A\/wKlNj1c0Jos\/s200-c\/2014-11-24_1157.png"},{"title":"LONA BOSHOF (3RD IN THE MODEL FITNESS ROUND - WBBF\/WFF 2010)","link":"http:\/\/hmtapp.blogspot.com\/2014\/11\/lona-boshof-3rd-in-model-fitness-round.html?noredirect=1&noredirect=1#comment-form","description":"I would like to give you a little bit of background about myself, my medical history and my journey since arriving in Cape Town four and a half years ago. This will help you to understand the extent of my transformation - not only on a physical level, but also on a mental and spiritual level.","descriptionWithHtml":"<div dir=\"ltr\" style=\"text-align: left;\" trbidi=\"on\">I would like to give you a little bit of background about myself, my medical history and my journey since arriving in Cape Town four and a half years ago. This will help you to understand the extent of my transformation - not only on a physical level, but also on a mental and spiritual level.<br \/><div><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><a href=\"http:\/\/1.bp.blogspot.com\/-2FIKOQGmd_c\/VHMAv1rojUI\/AAAAAAAAf14\/476XqurWLVU\/s1600\/2014-11-24_1155.png\" imageanchor=\"1\" style=\"margin-left: 1em; margin-right: 1em;\"><img border=\"0\" src=\"http:\/\/1.bp.blogspot.com\/-2FIKOQGmd_c\/VHMAv1rojUI\/AAAAAAAAf14\/476XqurWLVU\/s1600\/2014-11-24_1155.png\" height=\"188\" width=\"640\" \/><\/a><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div class=\"separator\" style=\"clear: both; text-align: center;\"><br \/><\/div><div style=\"text-align: center;\"><br \/><\/div><\/div>","contentWithHtml":null,"datetime":1416939961,"id":"tag:blogger.com,1999:blog-8602866697957575262.post-5145711361843192048","imageUrl":"http:\/\/1.bp.blogspot.com\/-2FIKOQGmd_c\/VHMAv1rojUI\/AAAAAAAAf14\/476XqurWLVU\/s200-c\/2014-11-24_1155.png","disableContentImageUrl":false,"date":"2014-11-25T18:26:01.852Z","geo":null,"socialInfo":{"socialId":"Feeds:tag:blogger.com,1999:blog-8602866697957575262.post-5145711361843192048","url":"http:\/\/hmtapp.blogspot.com\/2014\/11\/lona-boshof-3rd-in-model-fitness-round.html?noredirect=1#comment-form","title":"LONA BOSHOF (3RD IN THE MODEL FITNESS ROUND - WBBF\/WFF 2010)","shortDesc":"I would like to give you a little bit of background about myself, my medical history and my journey since arriving in Cape Town four and a half years ago. This will help you to understand the extent of my transformation - not only on a physical level, but also on a mental and spiritual level.","imageUrl":"http:\/\/1.bp.blogspot.com\/-2FIKOQGmd_c\/VHMAv1rojUI\/AAAAAAAAf14\/476XqurWLVU\/s200-c\/2014-11-24_1155.png"},"contentImageUrl":"http:\/\/1.bp.blogspot.com\/-2FIKOQGmd_c\/VHMAv1rojUI\/AAAAAAAAf14\/476XqurWLVU\/s200-c\/2014-11-24_1155.png"}],"totalItems":8,"categories":[],"paging":{"nextUrl":null,"next":null}},"maxAge":1800,"serviceUrl":"http:\/\/content.como-services.com\/api\/feeds\/25\/0?url=http%3A%2F%2Fhmtapp.blogspot.com%2Ffeeds%2Fposts%2Fdefault&extraInfo=%7B%0D%0A%20%20%22addGeo%22%3A%20false%2C%0D%0A%20%20%22expiration%22%3A%200%2C%0D%0A%20%20%22sort%22%3A%20%22Default%22%0D%0A%7D"},{"data":{"isRtl":false,"items":{"ButtonOk":"OK","ButtonCancel":"Cancel","ButtonClose":"Close","ButtonRetry":"Retry","DialogMessageFailGetFeeds":"Failed to load application data. You must connect to a Wi-Fi or cellular data network to access this data.","DialogMessageFailGetAppExperience":"Failed to load application data. You must connect to a Wi-Fi or cellular data network to access this data.","DialogMessageFailGetAppNormal":"Failed to load application data. You must connect to a Wi-Fi or cellular data network to access this data.","DialogMessageFailLoadPage":"Failed to load page.","DialogMessageFailGetAppId":"Please check your application code and try again","DialogMessageEmailAddressInvalid":"E-mail address is invalid","DialogMessageAppCodeInvalid":"App code is invalid","DialogMessageFailGetServiceMap":"Failed to initialize network communication","DialogMessageFacebookLogoutFail":"Unable to log out of Facebook at the moment. Please try again later.","DialogCaptionError":"Error","DialogCaptionFailGetFeeds":"Network error","DialogCaptionFacebookLogout":"Facebook logout","SSecondsAgo":"seconds ago","SSecondAgo":"a second ago","SNumberSecondsAgo":"{number} seconds ago","SMinuteAgo":"a minute ago","SNumberMinutesAgo":"{number} minutes ago","SHourAgo":"an hour ago","SNumberHoursAgo":"{number} hours ago","SDayAgo":"a day ago","SNumberDaysAgo":"{number} days ago","SWeekAgo":"a week ago","SNumberWeeksAgo":"{number} weeks ago","SMonthAgo":"a month ago","SNumberMonthsAgo":"{number} months ago","SYearAgo":"a year ago","SNumberYearsAgo":"{number} years ago","IndicatorLoading":"Loading...","HtmlTextLoadingPagination":"Loading...","HtmlTextShowMorePagination":"Show more","HtmlTextMorePages":"More","DialogMessageLeaveWarning":"You are about to leave this app. Press OK to continue.","DialogCaptionNavigate":"Navigate","DialogMessageFailConnectTwitter":"Failed to connect to Twitter","DialogMessageFailLoginTwitter":"Failed to log in to Twitter","DialogMessageShareNotSupportedInSimulator":"Share is not supported in Simulator mode.","DialogCaptionTwitter":"Twitter","DialogCaptionShare":"Share","DialogCaptionFacebook":"Facebook","IndicatorShareTwitterSigningIn":"Signing in ...","IndicatorShareLogOut":"Log out...","IndicatorSharePublishing":"Publishing...","IndicatorShareTweeting":"Tweeting...","HtmlTextShareOnTwitter":"Share on Twitter","HtmlTextShareOnFacebook":"Share on Facebook","HtmlTextShareTwitterPostButton":"Tweet","HtmlTextShareFacebookPostButton":"Post","HtmlTextShareTwitterChangeUserButton":"Change user","HtmlTextShareFacebookChangeUserButton":"Change user","HtmlTextShareTwitterLoginCaption":"Sign in","HtmlTextShareTwitterUserNameCaption":"User name or e-mail","HtmlTextShareTwitterPasswordCaption":"Password","HtmlTextShareTwitterLoginButton":"Sign in","SShareTweetedFromLink":"Tweeted from {appLink}","SShareMobileApp":"mobile app","SShareMailApplinkHtml":"Shared from my: {htmlLink}","SShareMailApplinkSimple":"Shared from my mobile app: {appLink}","SShareFromMobile":"Shared from my mobile app","SShareFromMobileWithLink":"Shared from my mobile app {appLink}","SShareConduitMobile":"Conduit Mobile","SShareMailPowerByConduitHtml":"Powered by: {htmlLink}","SShareMailPowerByConduitSimple":"Powered by Conduit Mobile: {conduitLink}","DialogMessageShareFailConectTwitter":"Sorry, failed to connect to Twitter service, please try again shortly.","DialogMessageShareFailConectFacebook":"Sorry, failed to connect to Facebook service, please try again shortly.","DialogMessageShareFailPostFacebook":"Sorry, failed to post. Facebook is not responding.","DialogMessageShareFailTweet":"Failed to tweet","HtmlTextRevuShakeToReload":"(shake to reload app)","HtmlTextRevuReopenToReview":"(reopen app to review your changes)","HtmlTextContactUsWeb":"Web:","HtmlTextContactUsMail":"Mail:","HtmlTextContactUsPhone":"Phone:","HtmlTextContactUsFax":"Fax:","HtmlTextContactUsAddress":"Address:","HtmlTextContactUsShowOnMap":"Show on map","HtmlTextContactUsGetDirections":"Get directions","HtmlTextFacebookLikesCount":"{number} likes","HtmlTextFacebookReadMore":"Read more","SFacebookShareEmailSubject":"Check out this post from {user}'s Facebook page","SFacebookShareTwitterFrom":"From {user}'s Facebook wall","IndicatorLiveAlbumPostingImage":"Posting Image...","SLivePersonUserName":"me","DialogMessageLivePersonNoAnswer":"There was no answer. Try again later.","DialogMessageLivePersonErrorClosing":"Error in closing chat","DialogMessageLivePersonNoAvailability":"Account is offline","HtmlTextLivePersonStart":"Start","HtmlTextLivePersonEnd":"End","HtmlTextLivePersonSend":"Send","HtmlTextLivePersonStatusInit":"To initiate a chat session click:","HtmlTextLivePersonStatusChatting":"Chatting with {agentName}","HtmlTextLivePersonStatusCheckingAvailability":"Checking availability...","HtmlTextLivePersonStatusClosingChat":"Closing chat...","HtmlTextLivePersonStatusWaitingAgent":"Waiting for an agent...","HtmlTextLivePersonStatusAgentTyping":"{agentName} is typing...","DialogCaptionLivePersonChatEnded":"Chat ended","DialogCaptionLivePersonNoAvailability":"Not available","DialogCaptionLivePersonTimeOut":"Time out","HtmlTextRadioLoading":"Loading...","HtmlTextRssShowOnMap":"Show on map","HtmlTextRssReadMore":"Read more","SRssShareComment":"check out this post from {link}","SRssShareEmailSubject":"Check out this article from {title}","SRssShareTwitterFrom":"from {title}","HtmlTextSlicerUnableLoading":"Unable to load site content","HtmlTextTwitterFollowersCount":"{number} followers","HtmlTextTwitterStatusesCount":"{number} statuses","STwitterShareEmailSubject":"Check out this tweet from @{name}","HtmlTextYoutubeViewsCount":"{number} views","HtmlTextYoutubeByAuthor":"by {author}","HtmlTextYoutubeRatings":"{ratings} Ratings | {views} Views","HtmlTextYoutubeLikes":"{likes} Like | {dislikes} Dislike","SYoutubeShareTitle":"Check out this video - {title}","DialogMessageAudioNoUrl":"There is no audio-source.","DialogMessageAudioNoFeeds":"Your device doesn't support playing this type of audio files","DialogMessageAudioNotSupportedDevice":"Your device doesn't support HTML5 audio","DialogMessageAudioNotSupportedSimulator":"Your browser (of the simulator) doesn't support audio","DialogMessageAudioTypeNotSupportedDevice":"Your device doesn't support playing this type of audio file","DialogMessageAudioTypeNotSupportedSimulator":"Your browser (of the simulator) doesn't support playing this type of audio file","HtmlTextAudioLoading":"Loading...","HtmlTextAudioSeeking":"Seeking...","HtmlTextAudioSeek":"Seek:","HtmlTextAudioLyricist":"Lyricist:","HtmlTextAudioComposer":"Composer:","HtmlTextAudioAlbum":"Album:","HtmlTextVideoByAuthor":"by {author}","DialogCaptionEmail":"Email","DialogMessageFailGetAppDisabled":"Sorry, this app has been temporarily disabled due to a content violation.\\n\\nPlease check back in a few days","DialogMessageFailGetServiceMapWinPhone":"Failed to initialize network communication. Press OK to retry or Cancel to quit","DialogMessageMediaNotSupported":"Audio is not supported by this browser","DialogMessageLinkNotSupportedInSimulator":"This link is not supported in simulation mode","DialogMessageAlbumAddedToFavorites":"Album's tracks added to favorites","DialogCaptionShareControlDialog":"Share on","DialogCaptionFacebookLogin":"Facebook Login","DialogCaptionTwitterLogout":"Twitter Logout","DialogCaptionTwitterLogin":"Twitter Login","DialogCaptionAddedToFavorites":"Add to favorites","HtmlTextShareTwitterWriteCommentPlaceholder":"Enter your comment","HtmlTextShareFacebookWriteCommentPlaceholder":"Enter your comment","HtmlTextShareChangeUserName":"Not {name}?","HtmlTextAddAlbumToFavorites":"Add tracks to your favorites list now","HtmlTextAddTrackToFavorites":"Add track to your favorites list now","HtmlTextAudioDetails":"Details","HtmlTextAudioTrackNumber":"Track {number}","HtmlTextAudioVocals":"Vocals","HtmlTextAudioWriters":"Writers","HtmlTextAudioLyrics":"Lyrics","HtmlTextBlogShowMorePosts":"Show more","HtmlTextBlogLoadingPosts":"Loading...","HtmlTextBlogViewOriginalPost":"view original post","HtmlTextBlogViewOriginalSite":"view original site","HtmlTextBlogbyAuthor":"by {author}","ToastMessageBlogFailedGetPosts":"failed to get posts","HtmlTextFacebookPageLikesCount":"like this","HtmlTextFacebookShowMorePosts":"Show more posts","HtmlTextFacebookLoadingPosts":"Loading...","HtmlTextFacebookPostCommentsCount":"{number} comments","HtmlTextRemoveTrackFromFavorites":"Remove track from your favorites list now","SShareEmailLink":"Read more","HtmlTextViewOriginalPageBtnText":"View Original Version","HtmlTextMapLoading":"Loading...","HtmlTextShareButtonText":"Share","HtmlTextPurchaseItemBuy":"Buy","HtmlTextPurchaseItemBuyAlbum":"Buy Album","DialogCaptionPurchaseChooseMethod":"Purchase:","HtmlTextPaginationShowMoreItems":"Show more...","HtmlTextPaginationRefreshItems":"Loading...","HtmlTextPaginationRefreshButton":"Refresh","ToastMessagePaginationFailedGetItems":"failed to receive data","ToastMessageTrackAddedToFavorites":"Track added to favorites","ToastMessageTrackRemovedFromFavorites":"Track removed from favorites","ToastMessageAudioInitFail":"Failed to initialize audio player","ToastMessageFacebookFailedGetComments":"failed to receive data","DialogMessageLiveAlbumCameraNotSupported":"Camera is not supported","DialogMessageLiveAlbumCameraNotSupportedSimulator":"Camera is not supported in simulation mode","DialogMessageLiveAlbumTakePhotoFailed":"Take photo failed ({message})","DialogMessageLiveAlbumPostPhotoFailed":"Post photo failed","ToastMessageLiveAlbumPublishingPhoto":"Image uploaded successfully, stream will be updated shortly","HtmlTextLiveAlbumByUploader":"by {name}","HtmlTextLiveAlbumPhotos":"photos","HtmlTextLiveAlbumShareCheckbox":"Share on Facebook","HtmlTextLiveAlbumNoImages":"BE THE FIRST TO POST A PHOTO","HtmlTextLiveAlbumLoadingAlbum":"Loading...","HtmlTextLiveAlbumLoadingImage":"Loading...","HtmlTextLiveAlbumLoadingShowMore":"Loading...","HtmlTextLiveAlbumShowMore":"Show more","HtmlTextLiveAlbumErrorLoadingImage":"Unable to load image","HtmlTextLiveAlbumFacebookLoginLiveAlbum":"LiveAlbum","HtmlTextLiveAlbumFacebookLogin":"Share photos with your friends on facebook","HtmlTextLiveAlbumFacebookLoginComment":"(requires that you link your facebook account)","HtmlTextLiveAlbumEula":"Terms of Use","HtmlTextLiveAlbumAddComment":"add comment","DialogCaptionLiveAlbumPostPhoto":"Post photo","DialogButtonLiveAlbumPostPhotoOk":"post","DialogButtonLiveAlbumPostPhotoCancel":"cancel","DialogButtonLiveAlbumChoosePhotoChoose":"Choose photo","DialogButtonLiveAlbumChoosePhotoTake":"Take photo","DialogButtonLiveAlbumChoosePhotoCancel":"Cancel","HtmlTextLivePersonInputPlaceholder":"Write a message...","HtmlTextLivePersonStatusCheckingAvailabilityMinorText":"connecting","HtmlTextLivePersonStatusWaitingAgentMinorText":"calling","HtmlTextPhotosImagesCount":"{number} photos","HtmlTextReviewsReviewsCount":"{number} reviews on {provider}","HtmlTextReviewsByAuthor":"by {name}","HtmlTextReviewsLoadingProvider":"Loading...","HtmlTextReviewsReadMoreLink":"Read more","DialogMessageSubscribeSubscribeSuccess":"Thank you for subscribing","DialogMessageSubscribeFailed":"Subscription currently unavailable. Please try again later","HtmlTextSubscribeUnknownButton":"Unknown","HtmlTextSubscribeFacebookButton":"Facebook","HtmlTextSubscribeTwitterButton":"Twitter","HtmlTextSubscribeLinkedInButton":"LinkedIn","HtmlTextSubscribeSubscribeButton":"Subscribe","HtmlTextSubscribeFollowBlogTitle":"Follow {blogTitle}","HtmlTextSubscribeDiscoverString":"Discover us on these sites","HtmlTextSubscribeSubscribeString":"Subscribe to {blogTitle}","HtmlTextSubscribeInsetYourEmail":"your@email.com","HtmlTextSubscribeLoading":"Subscribing...","ToastMessageSubscribeInsetEmail":"Email address is required","ToastMessageSubscribeInvalidEmail":"Please enter a valid email address","DialogCaptionSubscribeSuccess":"Success","DialogCaptionSubscribeFail":"Error","HtmlTextTwitterFollowers":"Followers","HtmlTextTwitterTweets":"Tweets","HtmlTextTwitterFollowButton":"Follow","HtmlTextTwitterRetweet":"by {retweeterName}","HtmlTextTwitterRetweetDetails":"retweeted by","HtmlTextTwitterShowMoreTweets":"Show more tweets","HtmlTextTwitterLoadingTweets":"Loading...","HtmlTextYoutubeViews":"{views} Views","HtmlTextEventsPastEvents":"Past Events","HtmlTextEventsFutureEvents":"Upcoming Events","HtmlTextEventsMonthJanuary":"January","HtmlTextEventsMonthFebruary":"February","HtmlTextEventsMonthMarch":"March","HtmlTextEventsMonthApril":"April","HtmlTextEventsMonthMay":"May","HtmlTextEventsMonthJune":"June","HtmlTextEventsMonthJuly":"July","HtmlTextEventsMonthAugust":"August","HtmlTextEventsMonthSeptember":"September","HtmlTextEventsMonthOctober":"October","HtmlTextEventsMonthNovember":"November","HtmlTextEventsMonthDecember":"December","HtmlTextEventsDaySunday":"Sunday","HtmlTextEventsDayMonday":"Monday","HtmlTextEventsDayTuesday":"Tuesday","HtmlTextEventsDayWednesday":"Wednesday","HtmlTextEventsDayThursday":"Thursday","HtmlTextEventsDayFriday":"Friday","HtmlTextEventsDaySaturday":"Saturday","HtmlTextEventsVenueStr":"Venue","HtmlTextEventsLocationStr":"Location","HtmlTextEventsPhoneNumberStr":"Phone Number","HtmlTextEventsTicketStr":"Ticket","HtmlTextShowOnMapButtonStr":"Map","HtmlTextContactUsSignUpStr":"Sign Up","HtmlTextContactUsAddressStr":"Address","HtmlTextContactUsPhoneNumberStr":"Phone Number","HtmlTextContactUsFaxNumberStr":"Fax Number","HtmlTextContactUsCallNowStr":"Call","HtmlTextContactUsCallStr":"Call","HtmlTextContactUsFaxStr":"Fax","HtmlTextContactUsEmailStr":"Email","HtmlTextContactUsLinkStr":"Link","HtmlTextContactUsMapStr":"Map","HtmlTextContactUsContactUsStr":"Contact us","HtmlTextFavoritesEditButton":"Edit","HtmlTextFavoritesDoneButton":"Done","HtmlTextFavoritesCancelButton":"Cancel","HtmlTextFavoritesBuyButton":"Buy","DialogCaptionPhotosManagerDeviceNotSupported":"Your device does not support the photo gallery view","DialogCaptionPhotosManagerSimulatorNotSupported":"Photo gallery view is not supported in simulator mode","HtmlTextPaginationLoadingItems":"Loading...","PushNotificationTitle":"Notification","DialogMessagePurchaseFail":"Purchase failed. Please try again shortly.  If you encounter any additional problems, please feel free to contact us.","HtmlTextEventsNoEventsStr":"There are currently no events to display.","HtmlTextFavoritesNoFavsStr1":"No tracks added.","HtmlTextFavoritesNoFavsStr2":"Add tracks to your favorites list.","DialogMessageFacebookRequiresPermissions":"This action requires permissions","DialogCaptionFacebookRequiresPermissions":"Facebook","SShareAppMailBody":"Hey,<br>Check out the {appName} mobile app I just used!","SShareAppMailSubject":"Check out this great new app!","SSharePhotoSubject":"Look at this awesome pic!","SSharePhotoTitle":"Awesome pic","SSharePhotoText":"Take a look at this awesome pic!","HtmlTextCommentDialogButtonOk":"Post on Facebook","HtmlTextCommentDialogButtonCancel":"Cancel","HtmlTextCommentDialogPlaceholder":"Write something...","HtmlTextShareAppButtonText":"Share app","SShareApp":"Check out the {appName} mobile app I just used!","HtmlTextFacebookAddCommentButton":"Comment","HtmlTextFacebookLikePostButton":"Like","HtmlTextFacebookUnikePostButton":"Unlike","HtmlTextFacebookLikeComment":"Like","HtmlTextFacebookUnikeComment":"Unlike","HtmlTextFacebookPostLikesCount":"{number} likes","HtmlTextFacebookPostLikesCountIncludeYou":"You and {number} others like this","HtmlTextPhotosNoImages":"Album is empty","HtmlTextTwitterUnfollowButton":"Unfollow","TitleShareVia":"Share via","HtmlTextFacebookPostLikesOnlyYou":"You like this","HtmlTextSpeakersBioTitle":"Speaker's bio","HtmlTextAboutUsItemTitleDescription":"Description","HtmlTextAboutUsItemTitleFoodStyle":"Food Type","HtmlTextInstagramUserLikePhoto":"Like this","HtmlTextInstagramPhotosCount":"photos","HtmlTextInstagramFollowersCount":"followers","HtmlTextInstagramFollowingCount":"following","DialogMessageFormSendSuccess":"Data sent","DialogMessageFormSendFail":"Failed to send data","HtmlTextFormSendButton":"Submit","ToastMessageFormFieldMandatory":"Field {fieldName} cannot remain empty","HtmlTextEventsRsvpButton":"Join","HtmlTextEventsRsvpAttending":"Attending","HtmlTextEventsRsvpMaybe":"Maybe","HtmlTextEventsRsvpDecline":"Decline","HtmlTextEventsAdd2CalStr":"Calendar","HtmlTextAboutUsItemTitleGenre":"Genre","HtmlTextAboutUsItemTitleFounded":"Founded","HtmlTextAboutUsItemTitleMembers":"Members","HtmlTextAboutUsItemTitleHometown":"Hometown","HtmlTextAboutUsItemTitleBiography":"Biography","HtmlTextAboutUsItemTitleRecordLabel":"Record Label","HtmlTextAboutUsItemTitleHours":"Hours","HtmlTextAboutUsItemTitleServices":"Services","HtmlTextAboutUsItemTitleAwards":"Awards","HtmlTextAboutUsItemTitleParking":"Parking","HtmlTextAboutUsItemTitleProducts":"Products","HtmlTextAboutUsItemTitleMission":"Mission","HtmlTextAboutUsItemTitleManager":"Manager","HtmlTextAboutUsItemTitleBookingAgent":"Booking Agent","HtmlTextAboutUsItemTitleSpecialties":"Specialties","HtmlTextAboutUsItemTitleCulinaryTeam":"Culinary Team","HtmlTextAboutUsItemTitleGeneralInfo":"General Info","HtmlTextAboutUsItemTitleCompanyOverview":"Company Overview","HtmlTextAboutUsItemHoursAlwaysOpen":"Open 24\/7","HtmlTextAboutUsItemHoursNoHours":"No available hours","HtmlTextAboutUsInfoVersion":"Version {versionName}","HtmlTextAboutUsReadMore":"Read more","HtmlTextAboutUsListItemReadMore":"Read more","HtmlTextAboutUsDescriptionTitle":"Description","DialogCaptionConfirm":"Confirm","DialogCaptionSuccess":"Success","DialogMessagePollAreYouSureVote":"Are you sure you want to vote for \"{text}\" ?","DialogMessagePollVoteFail":"Your vote was not received. Please try again later.","DialogMessagePollVoteSuccess":"Your vote has been received.","HtmlTextPollVoteButton":"Vote","HtmlTextLinksDescriptionTitle":"Description","HtmlTextDatePickerDialogButtonOk":"OK","HtmlTextDatePickerDialogButtonCancel":"Cancel","HtmlTextDatePickerDialogButtonClear":"Clear","HtmlTextPageNotSupportedInCp":"This page is not supported in simulator mode.","HtmlTextPageNotSupportedInCp2":"To test it on your device, please install our ReVu app.","HtmlTextInstagramLikes":"Likes","HtmlTextInstagramComments":"Comments","HtmlTextInstagramPrivateUserMainText":"This user does not share information publicly.","HtmlTextInstagramPrivateUserSecondaryText":"You cannot view this page.","HtmlTextLiveAlbumUploadingImage":"Uploading image...","HtmlTextLiveAlbumUploadingFailed":"The image failed to upload.","HtmlTextLiveAlbumUploadedByYou":"You","HtmlTextAgendaSpeakersCount":"{number} speakers:","HtmlTextAgendaOneSpeaker":"Speaker:","HtmlTextAgendaSessionDetails":"Details","HtmlTextAgendaAddToFav":"Add to Favs","HtmlTextAgendaRemoveFromFav":"Remove from Favs","DialogMessageAgendaNoFav":"There are no sessions in your Favorites list.","DialogCaptionAgendaNoFav":"Favorites","DialogMessageEventsRsvpNotSupportedInSimulator":"This action is not supported in simulator mode.","UserMessageTextHello":"Hi there! I’m having a blast at SXSW. You?","ReportsUploadingImage":"Uploading...","ReportsImageUploadingStartedForImageByIndex":"Uploading image {number}","ReportsImageUploadingSucceededForImageByIndex":"Upload for image {number} successful","ReportsImageUploadingFailedForImageByIndex":"Image {number} failed to upload","ReportsImageUploaded":"Uploaded","ReportsImageUploadFailed":"Upload failed","ReportsImageUploadAddPhoto":"Add a photo","SShareFavoritesPlaylistTitle":"Check out the playlist I've created!","HtmlTextCommentDialogButtonOkShort":"Post","HtmlTextCommentDialogTitle":"Comment","HtmlTextQuizStartQuizButton":"Start Quiz","HtmlTextQuizQuestionPosition":"{index} of {total}","HtmlTextQuizHowManyCorrect":"You answered {count} correctly.","HtmlTextQuizRetryButton":"Replay Quiz","SQuizShareTitle":"I played the quiz: {title}","SQuizShareBody":"I played the quiz: {title}. My score is: {grade}","UploadStatusLiveAlbumImageUploading":"Uploading image","UploadStatusLiveAlbumImageSent":"Image sent ","UploadStatusLiveAlbumProcessFailed":"Something went wrong. Please try again.","SAgendaShareSession":"I'm in the session: {sessionTitle}","HtmlTextLinkStaticTextIfCantOpenSafari":"Tap the buttons to start using this app","HtmlTextFavoritesShareButton":"Share","PhotoGalleryPreparingToShare":"Preparing to share...","ErrorHandleTitle":"Failed to retrieve data","ErrorHandleSubTitle":"There might be a problem with the connection to the server","ErrorHandleReloadButtonTitle":"Reload","CollectionsSearchPlaceholder":"Search {category}","CollectionsBuyNow":"Buy Now","CollectionsCurrentPrice":"Current Price","CollectionsItemDetails":"Item Details","CollectionsContactUs":"Contact Us","CollectionsVisitUs":"Visit Us","CollectionsContactItem-Email":"Email","CollectionsContactItem-Facebook":"Facebook page","CollectionsContactItem-Linkedin":"LinkedIn","CollectionsContactItem-Twitter":"Twitter","CollectionsContactItem-Website":"Website","SShareMailPowerByBrand":"Powered by {brand}","HtmlTextCouponsTitleOffer":"Special Offer","HtmlTextCouponsTitleSpecialDiscount":"Special Discount","HtmlTextCouponsTitleOriginalPrice":"Original Price","HtmlTextCouponsTitleDiscount":"Discount","HtmlTextCouponsTitleSaving":"Savings","HtmlTextCouponsTitleDealDetails":"Deal Details","ReportsInvalidFormPopupTitle":"Form cannot be sent","ReportsInvalidInputMessage":"{name} is a mandatory field","ReportsTemplateDefaultSubmitCaption":"Submit","ReportsInvalidEmail":"Invalid email","ReportsSaveFailedSubtitleMessage":"Oops! We couldn't save your message. Please try again.","ReportsShowMyLocationMessage":"Show my location","ReportsFailedToDetermineLocation":"We couldn't pinpoint your location. Please make sure your GPS device is on.","CollectionsSearchNoResultsFound":"No results found","CollectionsSearchNoResultsFoundSubtitle":"We did not find results for: <b>{query_string}<\/b> On <b>{node_name}<\/b>","CollectionsSearchNoItemsFound":"No items found","CollectionsSearchNoItemsFoundSubtitle":"{node_name} has no items","HtmlTextInputPanelButtonSendMessage":"Send","HtmlTextInputPanelPlaceholder":"Write something...","HtmlTextChatHeaderChattingWith":"Chatting with","HtmlTextLoginOverlayTitle":"Log in to start networking","HtmlTextLoginOverlayLogin":"Log in","HtmlTextMyProfileLogoutFromLinkedin":"Log out of LinkedIn","HtmlTextMyProfileLogoutButton":"Sign Out","HtmlTextInboxNoMessagesStr":"No messages","ReportsMandatoryMessage":"Some fields are mandatory","SUnknownUserName":"[Unknown]","ReportsInvalidValueMessage":"{name} is invalid. Please enter correct format.","SUserJobTitleFull":"{job_title} at {company}","UserSearchNoResultsFound":"No results found","UserSearchNoResultsFoundSubtitle":"No matches found","UserSayHelloTo":"Say hello to {user_caption}","UserGoogle":"Google {user_caption}","AppsfireNotifications":"Notifications","SmartBannerInAppStore":"This app is available on the App Store","SmartBannerInGooglePlay":"This app is available on Google Play","SmartBannerButtonText":"Get It","SSharePhotoSubjectWithTitle":"Look at this awesome pic: {title}","HtmlTextContactUsWebSiteStr":"Website","HtmlTextCouponsPriceOff":"OFF","HtmlTextCouponsTitleNewPrice":"New Price","HtmlTextCouponsValidFrom":"Valid from","HtmlTextCouponsValidUntil":"Until","HtmlTextCouponsTermsTitle":"Terms of Use","HtmlTextCouponsTitleValidity":"Expiration","ToastMessageCouponsClaimSuccess":"Congrats! You’ve claimed this offer.","HtmlTextCouponsClaimButton":"Get Coupon","HtmlTextCouponsCouponClaimed":"Coupon claimed","HtmlTextCouponsExpired":"EXPIRED","CouponsNoResultsFound":"No coupons available","CouponsNoResultsFoundSubtitle":"Check back again soon!","HtmlTextCouponsShareDefaultOfferTitle":"Buy 1 Get 1 FREE","HtmlTextCouponsShareTitle":"Hey, you should grab this deal, too!","HtmlTextCouponsShareDescription":"Check out the awesome deal I got through the {appName} mobile app: \"{offerTitle}\"","HtmlTextAboutUsInfoTermsTitle":"Terms of Use","HtmlTextPhotosImagesCountTitle":"photos","HtmlTextAboutUsInfoPrivacyPolicy":"By downloading, accessing, and\/or using the App in any manner, you agree to the <a href='http:\/\/www.como.com\/mobile-apps-terms-of-use'>Terms of Use<\/a> and <a href='http:\/\/www.como.com\/app-privacypolicy'>Privacy Policy<\/a>","ReportsSavedSuccessfullyMessage":"Sent successfully","ReportsSavedSuccessfullySubtitleMessage":"Thank you! Your message has been sent successfully.","ReportsSaveFailedMessage":"Send failed","ReportsSavingMessage":"Sending...","HtmlTextLoyaltyCardsDefaultFreebieName":"freebie","HtmlTextLoyaltyCardsTitleOffer":"Special Offer","HtmlTextLoyaltyCardsValidFrom":"Start","HtmlTextLoyaltyCardsValidUntil":"End","HtmlTextLoyaltyCardsShowMoreButton":"Info","HtmlTextLoyaltyCardsExpired":"EXPIRED","HtmlTextLoyaltyCardsComingSoon":"COMING SOON","HtmlTextLoyaltyCardsShareWinTitle":"I just filled up my {appName} mobile app’s loyalty card and got a free {freebieName}! Get the app at {appLink} and start earning rewards.","HtmlTextLoyaltyCardsShareWinTwitterTitle":"Just got a free {freebieName} using my {appName} app! Download it & earn rewards: {appLink}","HtmlTextLoyaltyCardsShareWinEmailTitle":"Have you checked out the {appName} app?","HtmlTextLoyaltyCardsShareWinEmailText":"Hey, \u000a<br><br>\u000aI’m using the {appName} app, and I think you’d like it. I just earned a free {freebieName} with the in-app loyalty card. \u000a<br><br>\u0009\u000aSound like your kind of app? You can download it at {appLink} and start using your loyalty card to earn rewards too. :-)\u000a<br><br>\u000aHope you enjoy!","HtmlTextLoyaltyCardsShareTitle":"Have you checked out the {appName} app? I’m on my way to a free {freebieName} using its in-app loyalty card. Get the app and start earning rewards too! {appLink}","HtmlTextLoyaltyCardsShareTwitterTitle":"I’m going to get free stuff using my {appName} app! Download it & earn rewards: {appLink}","HtmlTextLoyaltyCardsShareEmailTitle":"Have you checked out the {appName} app?","HtmlTextLoyaltyCardsShareEmailText":"Hey, \u000a<br><br>\u000aI’m using the {appName} app, and I think you’d like it. I just got my in-app loyalty card stamped, and I’m on my way to a free {freebieName}. \u000a<br><br>\u000aSound like your kind of app? You can download it at {appLink} and start using your loyalty card to earn rewards too.  :-)\u000a<br><br>\u000aHope you enjoy!","HtmlTextLoyaltyCardsValidityTitle":"Validity","HtmlTextLoyaltyCardsInfoTitle":"Card Info","HtmlTextLoyaltyCardsInfoButtonCancel":"Close","HtmlTextLoyaltyCardsOnlyNativeTitle":"Get your freebie!","HtmlTextLoyaltyCardsOnlyNativeText":"Download our app to start collecting stamps and earning rewards","HtmlTextLoyaltyCardsOnlyNativeDownloadButton":"Download Now!","HtmlTextLoyaltyCardsNoItemsTitle":"No loyalty cards available","HtmlTextLoyaltyCardsNoItemsText":"Check back again soon!","HtmlTextLoyaltyCardsDialogButtonOk":"Stamp Card","HtmlTextLoyaltyCardsDialogButtonCancel":"Cancel","HtmlTextLoyaltyCardsDialogPlaceholder":"Enter Code","HtmlTextLoyaltyCardsDialogPlaceholderLocked":"Locked","HtmlTextLoyaltyCardsDialogStampCaption":"Stamp Card","HtmlTextLoyaltyCardsDialogCongratsCaption":"Congrats!","HtmlTextLoyaltyCardsDialogCongratsSuccessCaption":"Congrats!","HtmlTextLoyaltyCardsDialogNormalText":"Please hand your device to the cashier to stamp your device","HtmlTextLoyaltyCardsDialogMidFreebieText":"Please hand your device to the cashier to stamp your device and get a free {freebie}","HtmlTextLoyaltyCardsDialogFreebieText":"You've earned your freebie {freebie}","HtmlTextLoyaltyCardsDialogFreebieSuccessText":"You've redeemed your freebie {freebie}","HtmlTextLoyaltyCardsDialogServiceCoolDownText":"Uh oh! That was one too many attempts. For security purposes, this card will be blocked for {hours} hours","HtmlTextLoyaltyCardsDialogLoading":"Verifying code...","HtmlTextLoyaltyCardsDialogServiceFailText":"Service is unavailable. Try again later.","HtmlTextLoyaltyCardsDialogWrongCodeText":"Incorrect code","HtmlTextLoyaltyCardsDialogLimitPerDayText":"Sorry, the daily stamp limit for this card is {punchesPerDay}. Please come back tomorrow!","CollectionsCategoryItemsCount":"{count} items","CollectionsCategoryUnknownItemsCount":null,"CollectionsSearchPlaceholder2":"Enter your search here","HtmlTextVideoShowAllChannelItems":"See all","HtmlTextVideoChannelItemsCount":"{number} videos","HtmlTextVideoMoreFromChannelTitle":"More from {title}","HtmlTextNoCouponsText":"But keep checking back so you don’t miss any hot deals.","HtmlTextNoCouponsTitle":"No Coupons Available","HtmlTextCouponsCouponClaimedLongText":"Coupon claimed and ready for use","HtmlTextVideoNoItems":"No videos","HtmlTextLiveAlbumOverlayText":"Take pictures and instantly share them with friends via email and the social channels. The shared album gets updated constantly so you and your friends can take, share, and view photos in real time, right through the app!","HtmlTextLiveAlbumListHeaderHelper":"Select an album to get started","HtmlTextLiveAlbumOverlayButtonText":"Start Sharing","HtmlTextLiveAlbumHeaderHelper":"Start snapping and sharing photos","HtmlTextItemNotFoundTitle":"Uh oh!","HtmlTextItemNotFoundText":"Looks like we took a wrong turn.","HtmlTextBadPermalinkButtonText":"Go to {alias}","HtmlTextPageNotFoundBackButtonText":"Go to app","HtmlTextNoTabsTitlePublisher":"Add Content","HtmlTextNoTabsTextPublisher":"Add content to finish building this page.","HtmlTextNoTabsTitleUser":"Oops!","HtmlTextNoTabsSubTitleUser":"Nothing to see here right now.","HtmlTextNoTabsTextUser":"Try again later.","HtmlTextNoItemsTitle":"Oops!","HtmlTextNoItemsText":"Nothing to see here right now. Try again later.","HtmlTextNoEventsTitle":"No Events","HtmlTextNoEventsSubTitle":"(Don’t worry, you’re not missing out on anything.)","HtmlTextNoEventsText":"Check back soon!","HtmlTextFailItemsTitle":"Oops!","HtmlTextFailItemsText":"Looks like some information is missing.","HtmlTextFailItemsButtonText":"Try again","HtmlTextInvalidGetItemsTitle":"Almost Done!","HtmlTextInvalidGetItemsText":"To see this page, be sure to fill in all required fields.","HtmlTextErrorViewFacebookRestrictionTitle":"This page is restricted","HtmlTextFacebookRestrictedText":"To access this page, please log in to your Facebook account","HtmlTextLiveAlbumOverlayTitle":"Share Photos with Friends in a Snap","_shortTimeUNI":"h:mm a","_shortDateUNI":"MM\/d\/yyyy","HtmlTextMapNavigateWith":"Navigate with:","HtmlTextMapTypeMaps":"Maps","HtmlTextMapTypeGoogleMaps":"Google Maps","HtmlTextMapTypeWaze":"Waze","HtmlTextQRScanDiscardButton":"Discard","HtmlTextQRScanTitle":"QR Link Scanner","HtmlTextQRScanLinkFoundTitle":"Link Found","HtmlTextQRScanSubTitle":"To scan a QR code, push Start Scan and then focus your mobile device’s camera on the code.","HtmlTextQRScanBeforeScanningButtonTitle":"Start Scan","HtmlTextQRScanFoundLinkButtonTitle":"Open","HtmlTextQRScanCopyToastMessage":"Link Copied","HtmlTextQRScanBottomBarScanningTitle":"Scanning for link","SShareQRScanBodyTxt":"Check out what I found on {appName}'s QR code scanner!","HtmlTextReportsDoneButton":"Done","HtmlTextReportsNextButton":"Next","HtmlTextFacebookPostLikesCountBtnTitle":"{number} likes","HtmlTextErrorViewCmsFailButtonTitle":"Try Again","HtmlTextEmptyOption":"--","HtmlTextNoVideosTitle":"CHECK BACK SOON!","HtmlTextNoVideosSubTitle":"No videos here… yet","HtmlTextNoVideosInChannelTitle":"Looks like this channel is empty. Check back soon!","HtmlTextEventsReadMoreStr":"Read More","ReportsRatingControlTitle":"How would you rate us?","HtmlTextVideoItemReadMore":"Read more","HtmlTextVideoItemReadLess":"Read less","ReportsMultiSelectSelected":"Selected","ReportsMultiSelectDone":"Done","ReportsMultiSelectItemsSelected":"items selected","ReportsMultiSelectAll":"All","DialogMessageCannotDetermineLocationTitle":"Location Services Disabled","DialogMessageCannotDetermineLocationText":"To re-enable, please go to Settings and turn on location services for this app.","HtmlTextTabUntitled":"Untitled","HtmlTextVideoChannelItemsCountSingleItem":"{number} video","HtmlTextFacebookRestrictedTitle":"This page is restricted","AndroidBackToExitApp":"Press Back Again to Exit","HtmlTextCouponsShareDescriptionNoTitle":"Check out the awesome deal I got through the {appName} mobile app!","HtmlTextLoyaltyCardsDialogServiceErrorText":"Service not available. Please try again later.","HtmlTextLoyaltyCardsDialogNormalCongratsCaption":"Enjoy!","HtmlTextLoyaltyCardsDialogNormalSuccessText":"You're on your way to a freebie","HtmlTextLoyaltyCardsDialogMidFreebieSuccessText":"You just earned a free {freebieName}","HtmlTextLoyaltyCardsShareMidFreebieEmailTitle":"Have you checked out the {appName} app?","HtmlTextLoyaltyCardsProductDisclaimer":"If you delete this app, clear its data, or switch to a different device, all loyalty card stamps will be lost.","QRScannerLiveWebHeader":"QR Scanner","QRScannerLiveWebText":"Click below to scan a QR code.","QRScannerButtonText":"Start Scan","QRScannerActionNotSupportedInSimulator":"This functionality doesn’t work in the App Simulator.","QRScannerWebAppHeader":"QR Scanner","QRScannerWebAppText":"Download our app to use the QR Scanner.","HtmlTextLoyaltyCardsShareMidFreebieEmailText":"Hey,\u000a<br><br>\u000aI’m using the {appName} app, and I think you’d like it. I just earned a free {freebieName} with the in-app loyalty card.\u000a<br><br>\u000aSound like your kind of app? You can download it at {appLink} and start using your loyalty card to earn rewards too.  :-)\u000a<br><br>\u000aHope you enjoy!","HtmlTextLoyaltyCardsShareMidFreebieTwitterTitle":"Just got a free {freebieName} using my {appName} app! Download it & earn rewards: {appLink}","HtmlTextLoyaltyCardsShareMidFreebieFacebookTitle":"I just got a free {freebieName}, and I’m on my way to getting some more free stuff with my {appName} mobile app’s loyalty card. Get the app and start earning rewards too! {appLink}","LiveAlbumReportDialogReportMessage":"Are you sure you want to report this photo as offensive?","LiveAlbumReportDialogReportBtnTitle":"Report","LiveAlbumReportDialogReportConfirmation":"Your report has been sent. Thank you for notifying us.","HtmlAgendaTextNoItemsTitle":"Add Content","HtmlAgendaTextNoItemsText":"Add content to finish building this page.","HtmlContactUsTextNoItemsTitle":"Add Content","HtmlContactUsTextNoItemsText":"Add content to finish building this page.","shortTime2h":"h:MM TT","HtmlTextCouponsCouponClaimedShort":"Claimed","ToastMessageActionNotSupported":"Your device does not currently support this action.","HtmlTextAboutUsInfoPrivacyPolicyUnbranded":"By downloading, accessing, and\/or using the App in any manner, you agree to the <a href='http:\/\/www.app4mobile.biz\/mobile-apps-terms-of-use.html'>Terms of Use<\/a> and <a href='http:\/\/www.app4mobile.biz\/app-privacypolicy.html'>Privacy Policy<\/a>.","DialogCaptionSuccessBuy":"Congratulations!","DialogMessageSuccessBuy":"Thank you for purchasing {itemTitle}.","DialogButtonSuccessBuy":"Continue Shopping","HtmlTextCouponsComingSoon":"COMING SOON","StorePaypalBuyNow":"Buy Now with {paypalImage}","StoreBuyNowNormal":"Buy Now","StoreBuyNowUnavailable":"Unavailable","StoreBuyNowSoldOut":"Sold Out","DonateNowNormal":"Donate Now","PaypalDonateNow":"Donate with {paypalImage}","DonationShareEmailTitle":"Want to support a good cause?","DonationShareTextNoUrl":"I’m using the {appName} app, and I just made a donation. You can help too! Download the app: ","DonationShareText":"I’m using the {appName} app, and I just made a donation. You can help too! Download the app: {appLink}","DonationShareEmailBody":"Hey,\u000a\u000aI’m using the {appName} app, and I think you’d like it. I just contributed through the app’s Donations feature to support its important cause.\u000a\u000aSound like a cause you’d like to support? You can download the app at {appLink}.\u000a\u000aThanks!","DonateShareButtonText":"Tell My Friends","ActivityStatusCompletedSuccessfully":"This item was shared successfully.","ActivityStatusCompletedWithFailure":"This item was not shared. Please try again.","ActivityStatusCopied":"Content copied to clipboard","HtmlTextAudioError":"Couldn't play track","BranchesDistanceKM":"km","BranchesDistanceMiles":"miles","BranchesBranchesCount":"{count} Branches","BranchesSortByLocation":"Location","BranchesReadMore":"Read more","BranchesOpeningHoursAlwaysOpen":"Open 24\/7","BranchesOpeningHoursOpenNow":"Open now!","BranchesOpeningHoursDefault":"Business hours","DonateDisclaimerText":null,"HtmlTextPullToRefresh":"Pull down to refresh","DialogMessageCannotDetermineLocationQuestionText":"Do you want to turn on location services?","HtmlTextRefreshing":"Refreshing...","SJustNow":"Just now","SYesterdayWithTime":"Yesterday at {time}","SDateAtTime":"{date} at {time}","SVideoPlayingFailed":"Couldn't play video","QRScanReScanButtonTitle":"Scan Again","QRScanOpenLinkButtonTitle":"Open Link","branchesCpTitleReviews":"Reviews","branchesCpTitleOrderfood":"Order Food","branchesCpTitleMenu":"Menu","branchesCpTitleScheduling":"Scheduling","branchesCpTitleBook":"Book a Table","HtmlTextNotSupportedTitle":"The App Simulator does not support this page.","HtmlTextNotSupportedText":"To view this page, please install our Rev.u app.","_shortTime":"h:MMTT","_day1":"Sunday","_longDate":"mmmm dd, yyyy","_day3":"Tuesday","_day4":"Wednesday","_day5":"Thursday","_day3s":"Tue","_day4s":"Wed","_day5s":"Thu","_day7":"Saturday","_day1s":"Sun","_day7s":"Sat","_month9":"September","_month9s":"Sep","_day2":"Monday","_month10":"October","_month11":"November","_month10s":"Oct","_month11s":"Nov","_day2s":"Mon","_month3":"March","_month5":"May","_month3s":"Mar","_month5s":"May","_shortDate":"m\/d\/yyyy","_dateTime":"m\/d\/yyyy h:MM:ss tt","_month1":"January","_month6":"June","_month7":"July","_month1s":"Jan","_month6s":"Jun","_month7s":"Jul","_longTime":"h:MM:ss tt","_day6":"Friday","_day6s":"Fri","_month2":"February","_month12":"December","_month2s":"Feb","_month12s":"Dec","_fullDate":"dddd, mmmm dd, yyyy","_month4":"April","_month8":"August","_month4s":"Apr","_month8s":"Aug","_decimalSymbol":".","_digitGroupingSymbol":",","StateNotSpecified":"State","StateNonUS":"Non-US","StateAlabama":"Alabama","StateAlaska":"Alaska","StateArizona":"Arizona","StateArkansas":"Arkansas","StateCalifornia":"California","StateColorado":"Colorado","StateConnecticut":"Connecticut","StateDelaware":"Delaware","StateFlorida":"Florida","StateGeorgia":"Georgia","StateHawaii":"Hawaii","StateIdaho":"Idaho","StateIllinois":"Illinois","StateIndiana":"Indiana","StateIowa":"Iowa","StateKansas":"Kansas","StateKentucky":"Kentucky","StateLouisiana":"Louisiana","StateMaine":"Maine","StateMaryland":"Maryland","StateMassachusetts":"Massachusetts","StateMichigan":"Michigan","StateMinnesota":"Minnesota","StateMississippi":"Mississippi","StateMissouri":"Missouri","StateMontana":"Montana","StateNebraska":"Nebraska","StateNevada":"Nevada","StateNewHampshire":"New Hampshire","StateNewJersey":"New Jersey","StateNewMexico":"New Mexico","StateNewYork":"New York","StateNorthCarolina":"North Carolina","StateNorthDakota":"North Dakota","StateOhio":"Ohio","StateOklahoma":"Oklahoma","StateOregon":"Oregon","StatePennsylvania":"Pennsylvania","StateRhodeIsland":"Rhode Island","StateSouthCarolina":"South Carolina","StateSouthDakota":"South Dakota","StateTennessee":"Tennessee","StateTexas":"Texas","StateUtah":"Utah","StateVermont":"Vermont","StateVirginia":"Virginia","StateWashington":"Washington","StateWestVirginia":"West Virginia","StateWisconsin":"Wisconsin","StateWyoming":"Wyoming","CountryNotSpecified":"Country","CountryAfghanistan":"Afghanistan","CountryAlbania":"Albania","CountryAlgeria":"Algeria","CountryAndorra":"Andorra","CountryAngola":"Angola","CountryAntiguaandBarbuda":"Antigua and Barbuda","CountryArgentina":"Argentina","CountryArmenia":"Armenia","CountryAustralia":"Australia","CountryAustria":"Austria","CountryAzerbaijan":"Azerbaijan","CountryBahamas":"Bahamas","CountryBahrain":"Bahrain","CountryBangladesh":"Bangladesh","CountryBarbados":"Barbados","CountryBelarus":"Belarus","CountryBelgium":"Belgium","CountryBelize":"Belize","CountryBenin":"Benin","CountryBhutan":"Bhutan","CountryBolivia":"Bolivia","CountryBosniaHerzegovina":"Bosnia-Herzegovina","CountryBotswana":"Botswana","CountryBrazil":"Brazil","CountryBrunei":"Brunei","CountryBulgaria":"Bulgaria","CountryBurkina":"Burkina Faso","CountryBurundi":"Burundi","CountryCambodia":"Cambodia","CountryCameroon":"Cameroon","CountryCanada":"Canada","CountryCapeVerde":"Cape Verde","CountryCentralAfricanRep":"Central African Republic","CountryChad":"Chad","CountryChile":"Chile","CountryChina":"China","CountryColombia":"Colombia","CountryComoros":"Comoros","CountryCongo":"Congo","CountryCostaRica":"Costa Rica","CountryCroatia":"Croatia","CountryCuba":"Cuba","CountryCyprus":"Cyprus","CountryCzechRepublic":"Czech Republic","CountryDenmark":"Denmark","CountryDjibouti":"Djibouti","CountryDominica":"Dominica","CountryDominicanRepublic":"Dominican Republic","CountryEastTimor":"East Timor","CountryEcuador":"Ecuador","CountryEgypt":"Egypt","CountryElSalvador":"El Salvador","CountryEquatorialGuinea":"Equatorial Guinea","CountryEritrea":"Eritrea","CountryEstonia":"Estonia","CountryEthiopia":"Ethiopia","CountryFiji":"Fiji","CountryFinland":"Finland","CountryFrance":"France","CountryGabon":"Gabon","CountryGambia":"Gambia","CountryGeorgia":"Georgia","CountryGermany":"Germany","CountryGhana":"Ghana","CountryGreece":"Greece","CountryGrenada":"Grenada","CountryGuatemala":"Guatemala","CountryGuinea":"Guinea","CountryGuyana":"Guyana","CountryHaiti":"Haiti","CountryHonduras":"Honduras","CountryHungary":"Hungary","CountryIceland":"Iceland","CountryIndia":"India","CountryIndonesia":"Indonesia","CountryIran":"Iran","CountryIraq":"Iraq","CountryIreland":"Ireland","CountryIsrael":"Israel","CountryItaly":"Italy","CountryIvoryCoast":"Ivory Coast","CountryJamaica":"Jamaica","CountryJapan":"Japan","CountryJordan":"Jordan","CountryKazakhstan":"Kazakhstan","CountryKenya":"Kenya","CountryKiribati":"Kiribati","CountryKoreaNorth":"North Korea","CountryKoreaSouth":"South Korea","CountryKosovo":"Kosovo","CountryKuwait":"Kuwait","CountryKyrgyzstan":"Kyrgyzstan","CountryLaos":"Laos","CountryLatvia":"Latvia","CountryLebanon":"Lebanon","CountryLesotho":"Lesotho","CountryLiberia":"Liberia","CountryLibya":"Libya","CountryLiechtenstein":"Liechtenstein","CountryLithuania":"Lithuania","CountryLuxembourg":"Luxembourg","CountryMacedonia":"Macedonia","CountryMadagascar":"Madagascar","CountryMalawi":"Malawi","CountryMalaysia":"Malaysia","CountryMaldives":"Maldives","CountryMali":"Mali","CountryMalta":"Malta","CountryMarshallIslands":"Marshall Islands","CountryMauritania":"Mauritania","CountryMauritius":"Mauritius","CountryMexico":"Mexico","CountryMicronesia":"Micronesia","CountryMoldova":"Moldova","CountryMonaco":"Monaco","CountryMongolia":"Mongolia","CountryMontenegro":"Montenegro","CountryMorocco":"Morocco","CountryMozambique":"Mozambique","CountryMyanmar":"Myanmar","CountryNamibia":"Namibia","CountryNauru":"Nauru","CountryNepal":"Nepal","CountryNetherlands":"Netherlands","CountryNewZealand":"New Zealand","CountryNicaragua":"Nicaragua","CountryNiger":"Niger","CountryNigeria":"Nigeria","CountryNorway":"Norway","CountryOman":"Oman","CountryPakistan":"Pakistan","CountryPalau":"Palau","CountryPanama":"Panama","CountryPapuaNewGuinea":"Papua New Guinea","CountryParaguay":"Paraguay","CountryPeru":"Peru","CountryPhilippines":"Philippines","CountryPoland":"Poland","CountryPortugal":"Portugal","CountryQatar":"Qatar","CountryRomania":"Romania","CountryRussianFederation":"Russian Federation","CountryRwanda":"Rwanda","CountryStLucia":"St Lucia","CountrySaintVincent":"Saint Vincent and the Grenadines","CountrySamoa":"Samoa","CountrySanMarino":"San Marino","CountrySaoTome":"Sao Tome","CountrySaudiArabia":"Saudi Arabia","CountrySenegal":"Senegal","CountrySerbia":"Serbia","CountrySeychelles":"Seychelles","CountrySierraLeone":"Sierra Leone","CountrySingapore":"Singapore","CountrySlovakia":"Slovakia","CountrySlovenia":"Slovenia","CountrySolomonIslands":"Solomon Islands","CountrySomalia":"Somalia","CountrySouthAfrica":"South Africa","CountrySouthSudan":"South Sudan","CountrySpain":"Spain","CountrySriLanka":"Sri Lanka","CountrySudan":"Sudan","CountrySuriname":"Suriname","CountrySwaziland":"Swaziland","CountrySweden":"Sweden","CountrySwitzerland":"Switzerland","CountrySyria":"Syria","CountryTaiwan":"Taiwan","CountryTajikistan":"Tajikistan","CountryTanzania":"Tanzania","CountryThailand":"Thailand","CountryTogo":"Togo","CountryTonga":"Tonga","CountryTunisia":"Tunisia","CountryTurkey":"Turkey","CountryTurkmenistan":"Turkmenistan","CountryTuvalu":"Tuvalu","CountryUganda":"Uganda","CountryUkraine":"Ukraine","CountryUnitedArabEmirates":"United Arab Emirates","CountryUnitedKingdom":"United Kingdom","CountryUnitedStates":"United States","CountryUruguay":"Uruguay","CountryUzbekistan":"Uzbekistan","CountryVanuatu":"Vanuatu","CountryVaticanCity":"Vatican City","CountryVenezuela":"Venezuela","CountryVietnam":"Vietnam","CountryYemen":"Yemen","CountryZambia":"Zambia","CountryZimbabwe":"Zimbabwe","CountryStKittsNevis":"St. Kitts & Nevis","CountryTrinidadTobago":"Trinidad & Tobago","GenderNotSpecified":"Gender","GenderMale":"Male","GenderFemale":"Female","_firstDayOfWeek":"1","DonationShareFacebook":"I’m using the {appName} app, and I just made a donation. Download the app!","DonationShareTwitter":"I’m using the {appName} app, and I just made a donation. You can help too! Download the app:","_isMetricSystem":"0"}},"maxAge":1800,"serviceUrl":"http:\/\/app.como-services.com\/api\/translate\/mobile.client%2Cmobile.localeFormat\/EN-US\/2"}],"timestamp":1424099046};
DEBUG = 0
/**
 * This class detect the device (iphone/android...) and the layout (is tablet?)
 * and store the data in the global vars: DEVICE, LAYOUT
 *
 * @author Matanya
 */
var DeviceDetector = (function () {
	var _isDesktop = false,
		_userAgentsArr = null;

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
		"(ipad)": {
			device: deviceTypeEnum.iphone,
			layout: layoutFormat.wide
		},
		"(ipod|iphone)": {
			device: deviceTypeEnum.iphone,
			layout: layoutFormat.narrow
		},
		"(gt-p1000|mz604|mz606|xoom)": {
			device: deviceTypeEnum.android,
			layout: layoutFormat.wide
		}, // samsung galaxy/xoom tab
		"(android.+mobile)": {
			device: deviceTypeEnum.android,
			layout: layoutFormat.narrow
		}, // android phone
		"(android|Mobile Safari)": {
			device: deviceTypeEnum.android,
			layout: layoutFormat.wide
		}, // android tablet?
		"(windows phone os|iemobile|zunewp7)": {
			device: deviceTypeEnum.winPhone,
			layout: layoutFormat.narrow
		},
		"(silk|kindle)": {
			device: deviceTypeEnum.android,
			layout: layoutFormat.wide,
			variant: deviceVariantEnum.amazon
		},
		//TODO: check if some of these tablets are android, and if so, move it to the "android tablet" section
		"(SCH-I800|NOOK|GT-P7510)": {
			device: deviceTypeEnum.android,
			layout: layoutFormat.wide
		} // other tablets stuff
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

	var _simpleExtend = function(obj, source) {
		if (source) {
			for (var prop in source) {
				obj[prop] = source[prop];
			}
		}
	};

	var _detect = function (userAgent) {
		//cache the keys array
		if (!_userAgentsArr)
			_userAgentsArr = _allKeys(_userAgentMap);

		//creates a regex pattern looking like '(ipad)|(ipod|iphone)|(gt-p1000..."
		var userAgentsPattern = new RegExp(_userAgentsArr.join('|'), 'i'),
			result = null;

		if (userAgentsPattern.test(userAgent)) {
			for (var i = 0; i < _userAgentsArr.length; i++) {
				var rgxStr = _userAgentsArr[i];
				var rgx = new RegExp(rgxStr, 'i');
				if (rgx.test(userAgent)) {
					result = _userAgentMap[rgxStr];

					//TODO: if layout not detected: use screen resolution/width etc.?
					break;
				}
			}
		}

		// TODO: remove this code and use only the _userAgentMap? there is a problem in this section:
		// userAgent.substr(0, 4)

		// try to find if mobile or not (e.g.: for desktop-landing-page)
		if (!result) {
			result = {};

			// check if mobile
			// from "http://detectmobilebrowsers.com/":
			var isMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(userAgent.substr(0, 4));
			if (isMobile) {
				result.layout = layoutFormat.narrow;
			}
			else {
				result.layout = layoutFormat.wide;
				_isDesktop = true;
			}
		}
		return result;
	};

	/**
	 * detect the device (iphone/android...) and the layout (is tablet?)
	 *
	 * @return {dictionary} the device and layout.
	 * @author Matanya
	 */
	me.detectDevice = function () {
		// Detect device and layout according to the userAgent:
		var userAgent = (me.testUserAgent || navigator.userAgent || navigator.vendor || window.opera);
		return _detect(userAgent);
	};

	var _setIfDefined = function(x, setter) {
		if (typeof(x) !== 'undefined')
			setter(x);
	};

	/**
	 * update the global vars: DEVICE, LAYOUT
	 *
	 * @author Matanya
	 */

	// Detect device and layout according to the userAgent:
	var data = me.detectDevice();

	//never override the globals in native apps and iframes
	if (PREVENT_DEVICE_DETECT || PLATFORM === platformEnum.nativeApp || window !== top)
		return me;

	_setIfDefined(data.device,	function(v) { DEVICE = v; });
	_setIfDefined(data.layout,	function(v) { LAYOUT = v; });
	_setIfDefined(data.variant,	function(v) { DEVICE_VARIANT = v; });

	return me;
}());
(new Image()).src = 'app/interface/web/img/ajax-loader.png';
/**
 * This function will check if we are running as a webapp, and if we
 * are, will show a nice preloader until everything is ready
 */
var WebAppPreloader = (function()
{
	var me = {};

	var _preloader = null, _splash = null,

		_screen_splash_data = null,
		_splash_completed = true,
		_app_ready = false,
		_cbSplashCompleted = null;

	// Defaults
	var defaults = {
		background_color: "#222222",
		splash_timeout: 5000
	};

	var _simpleDebounce = function(func, wait) {
		var timeout;
		return function() {
			if (timeout) return;
			timeout = setTimeout(function() { timeout = null; func.apply(this); }, wait);
			func.apply(this);
		};
	};

	var _isWindowOrientationSupported = function () {
		return (typeof window.orientation !== 'undefined');
	};

	/**
	 * return the screen width, height ("raw" ,not multiple by devicePixelRatio) in portrait mode
	 */
	var _getScreenDimensions = function () {
		//first, we want to get the height and width of the device (in "portrait" orientation)
		var width = window.screen.width;
		var height = window.screen.height;
		if (height < width) // = if landscape (in android. in iOS we get always screen.height > screen.width)
		{
			height = window.screen.width;
			width = window.screen.height;
		}

		// We have an issue in android that the height and width are already multiple by devicePixelRatio, so we change it so
		//	it will be like iOS:
		var devicePixelRatio = window.devicePixelRatio;
		if ((window.innerWidth * devicePixelRatio === window.screen.width) && (DEVICE === deviceTypeEnum.android))
		{
			height = Math.ceil(height / devicePixelRatio);
			width = Math.ceil(width / devicePixelRatio);
		}

		//NOTE: we use screen.width instead of innerWidth etc. we have a little issue: the screen.height includes also
		// the browser-header and status bar, etc., and the innerHeight is not. if we don't rotate the image: the innerHeight
		// will be better, but if we rotate - the status bar will change its place, etc. and the rotated resolution will not
		// be in the wanted proportion, and, in addition, maybe we will have "gaps" because the div is too small.
		return [width, height];
	};

	// Screen physical dims related functions (e.g.: get portrait for iPhone, landscape for iPad)
	var _getScreenDimensionsFixedOrientation = function () {
		var screen_dimensions = _getScreenDimensions();
		if (_getDefaultOrientation() !== 0) {
			return [screen_dimensions[1], screen_dimensions[0]];
		} else {
			return screen_dimensions;
		}
	};

	/**
	 * return the window width, height ("raw" ,not multiple by devicePixelRatio) in portrait mode
	 */
	var _getWindowDimensions = function () {
		//first, we want to get the height and width of the device (in "portrait" orientation)
		var webappBodyHight = null;
		if (typeof WebViewportSizeManager !== 'undefined')
		 	webappBodyHight = WebViewportSizeManager.getViewportHeight();

		var width = window.innerWidth;
		var height = webappBodyHight ? webappBodyHight : window.innerHeight;
		if (height < width) // = if landscape
		{
			height = window.innerWidth;
			width = window.innerHeight;
		}

		return [width, height];
	};

	// window dims related functions (e.g.: get portrait for iPhone, landscape for iPad)
	var _getWindowDimensionsFixedOrientation = function () {
		var window_dimensions = _getWindowDimensions();
		if (_getDefaultOrientation() !== 0) {
			return [window_dimensions[1], window_dimensions[0]];
		} else {
			return window_dimensions;
		}
	};

	/**
	 * return the device orientation (0/90/-90/180. NOTE: also simulate orientation if orientation not supported)
	 */
	var _getOrientation = function () {
		if (_isWindowOrientationSupported()) {
			return window.orientation;
		}
		var width = window.innerWidth;
		var height = window.innerHeight;
		if (height < width) {// = simulate landscape orientation (we don't know if 90 or -90)
			return 90;
		}
		return 0;
	};

	// Get wanted default orientation
	var _getDefaultOrientation = function () {
		if (LAYOUT === layoutFormat.wide) {
			return 90;
		} else {
			return 0;
		}
	};

	// Styles
	var _getBackgroundColor = function () {
		return defaults.background_color;
	};

	/**
	 * the mother of all image selection algorithms
	 */
	var _getBestFitSplash = function () {
		if (typeof PRELOADER_OPTIONS === 'undefined' ||
			typeof PRELOADER_OPTIONS.splash === 'undefined' ||
			typeof PRELOADER_OPTIONS.splash.img === 'undefined')
		{
			return null
		}
		var raw_splashes_images = PRELOADER_OPTIONS.splash.img;

		// If we are here, we have custom splashes
		// We want the best fit image:
		//	1st priority is the height/width ratio.
		//	2nd priority is the amount of pixel.
		//	(e.g.: for 320*480, the priority is: 320*480, 32*48, 320*460, 480*320, 960*640)
		var screen_dimensions = window == top ? _getScreenDimensionsFixedOrientation() : _getWindowDimensionsFixedOrientation(),
			wantedRatio = screen_dimensions[1] / screen_dimensions[0],
			wantedPixels = screen_dimensions[1] * screen_dimensions[0] * window.devicePixelRatio * window.devicePixelRatio,
			best_splash = null, best_splash_ratio_def = 999, best_splash_pixels_def = 999999999;

		// validate resolutions
		var valid_resolution_regex = /^\d+x\d+$/;
		for (var resolution in raw_splashes_images) {
			if (!raw_splashes_images.hasOwnProperty(resolution) ||
				!valid_resolution_regex.test(resolution))
				continue;

			var splitted_resolution = resolution.split("x");
			var width = splitted_resolution[0];
			var height = splitted_resolution[1];
			var ratio = (height/width);
			var ratio_def = Math.abs(wantedRatio - ratio);
			if (ratio_def <= best_splash_ratio_def) {
				//TODO: maybe we need to prefer a better way (division?) instead of subtraction
				var splash_pixels_def = Math.abs(wantedPixels - width*height);
				if (ratio_def < best_splash_ratio_def || splash_pixels_def < best_splash_pixels_def)
				{
					best_splash_ratio_def = ratio_def;
					best_splash_pixels_def = splash_pixels_def;
					best_splash = raw_splashes_images[resolution];
				}
			}
		}

		if (!best_splash)
		{
			return null;
		}
		return {
			path: best_splash,
			timeout: typeof PRELOADER_OPTIONS.splash.timeout !== "undefined" ? PRELOADER_OPTIONS.splash.timeout : defaults.splash_timeout
		};
	};

	var _initSplashTimeout = function (screen_splash) {
		var image_load_failed = false;
		_splash_completed = false;

		var onImageFailedLoading = function() {
			//one-shot
			if (image_load_failed) return; image_load_failed = true;
			_splash_completed = true

			clearTimeout(splash_backup_timeout);
			_removeLoader();
		};

		var onImageLoaded = function() {
			//remove the backup
			clearTimeout(splash_backup_timeout);

			//show the splashscreen for {screen_splash.timeout} milliseconds
			setTimeout(function() {
				_splash_completed = true
				_removeLoader();
			}, screen_splash.timeout);
		}

		//backup timeout - we try to wait for the image load event, and if we dont get it until this timeout fires - we just ignore the splash and continue
		var splash_backup_timeout = setTimeout(onImageFailedLoading, screen_splash.image_load_timeout ? screen_splash.image_load_timeout : 6000);

		//first step - wait for splashscreen to load
		var splash_image = (new Image());
		splash_image.src = screen_splash.path;
		splash_image.onload = onImageLoaded;
		splash_image.onerror = onImageFailedLoading;
	};

	var _onResize = function()
	{
		/* NOTE: we use this func, instead of height = 100%, because it has some
		 * problems on iPhone.
		 */
		var height = (window.innerHeight ? window.innerHeight : document.documentElement.clientHeight) + 'px';
		var width = (window.innerWidth ? window.innerWidth : document.documentElement.clientWidth) + 'px';

		_preloader.style.height = height;
		_preloader.style.width = width;

		if (_splash != null)
		{
			var window_dimensions = _getWindowDimensionsFixedOrientation();
			var wantedChange = (_getDefaultOrientation() - _getOrientation()) % 180;
			var rotateCss = "rotate(" + wantedChange + "deg)";

			//NOTE: we need to put the image in the center, so the rotate will
			//	be OK.
			//NOTE2: for put it in the center we can't use "top:50%; marginTop: -(imageHeight/2)px;" because
			//	sometimes iPhone has some problems with 50%, and we get gap, so we "calc" also the 50%
			//	and we use only top (without margin-top)

			_splash.style.display = 'block';
			_splash.style.left = Math.ceil(window.innerWidth/2-window_dimensions[0]/2) + "px";
			_splash.style.top = Math.ceil(window.innerHeight/2-window_dimensions[1]/2) + "px";
			_splash.style.width = window_dimensions[0] + "px";
			_splash.style.height = window_dimensions[1] + "px";

			_splash.style.transform = rotateCss;
			_splash.style["-ms-transform"] = rotateCss;
			_splash.style["-webkit-transform"] = rotateCss;
			_splash.style["-o-transform"] = rotateCss;
			_splash.style["-moz-transform"] = rotateCss;
		}
	};

	var _addEventHandler = function(elem,eventType,handler) {
		if (elem.addEventListener)
			elem.addEventListener (eventType,handler, false);
		else if (elem.attachEvent)
			elem.attachEvent('on'+eventType,handler);
	};

	var _removeEventHandler = function(elem,eventType,handler) {
		if (elem.addEventListener)
			elem.removeEventListener(eventType,handler, false);
		else if (elem.detachEvent)
			elem.detachEvent('on'+eventType,handler);
	};

	var _bindResizeEvents = function(handler)
	{
		if (!window.addEventListener)
			return;

		_addEventHandler(window, "orientationchange", handler);
		_addEventHandler(window, "scroll", handler);
		_addEventHandler(window, "resize", handler);

		//force calls to unbindevents to use this handler
		var unbinder = _unbindEvents;
		_unbindEvents = function () { unbinder(handler); }
	};

	var _unbindEvents = function(handler)
	{
		if (!window.removeEventListener)
			return;

		_removeEventHandler(window, "orientationchange", handler);
		_removeEventHandler(window, "scroll", handler);
		_removeEventHandler(window, "resize", handler);
	};

	var _removeLoader = function () {
		if (!_app_ready || !_splash_completed)
			return;

		_unbindEvents();

		// Remove the webapp preloader
		if (_preloader) {
			document.body.removeChild(_preloader); _preloader = null;
		}

		// Remove splash overlay
		if (_splash) {
			document.body.removeChild(_splash); _splash = null;
		}

		//make the app visible:
		// (The app is invisible until the WebAppPreloader will finish its job
		// (because sometimes during rotation we can see the app under the loading/splash layouts))
		$('#app').addClass('visible');

		if (Scrolling) setTimeout(Scrolling.triggerWrapperResize, 100); //ugly hack... needed due to display:none during splash
		if (_cbSplashCompleted) _cbSplashCompleted();
	};

	var _createLoader = function()
	{
		_screen_splash_data = _getBestFitSplash();

		// Set background color, and reset margin and padding
		_preloader = document.createElement('div');
		_preloader.className = 'web_preloader';
		_preloader.style["background-color"] = _getBackgroundColor();

		/*var spinner = document.createElement('span');
		spinner.className = 'web_preloader_spinner spin';*/
		var spinner = document.createElement('div');
		spinner.className = 'web_preloader_animation spinner';		
		spinner.innerHTML = '<div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div>';

		var caption = document.createElement('p');
		caption.className = 'web_preloader_caption';
		caption.innerHTML = 'Loading...';

		_preloader.appendChild(spinner);
		_preloader.appendChild(caption);

		if (_screen_splash_data !== null) {

			_splash = document.createElement('div');
			_splash.className = 'web_preloader_splash';
			_splash.style['background-image'] = 'url(' + _screen_splash_data.path + ')';

			_initSplashTimeout(_screen_splash_data);
			document.body.appendChild(_splash);
		}

		document.body.appendChild(_preloader);
	};

	me.onAppReady = function(cbSplashCompleted) {
		_cbSplashCompleted = cbSplashCompleted;
		_app_ready = true;
		_removeLoader();
	};

	// Initialize webapp preloader
	_createLoader();

	var _throttledResize = _simpleDebounce(_onResize, 100);
	_bindResizeEvents(_onResize);
	setTimeout(_onResize,0);

	return me;
})();

/*! jQuery v1.11.1 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l="1.11.1",m=function(a,b){return new m.fn.init(a,b)},n=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,o=/^-ms-/,p=/-([\da-z])/gi,q=function(a,b){return b.toUpperCase()};m.fn=m.prototype={jquery:l,constructor:m,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=m.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return m.each(this,a,b)},map:function(a){return this.pushStack(m.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},m.extend=m.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||m.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(m.isPlainObject(c)||(b=m.isArray(c)))?(b?(b=!1,f=a&&m.isArray(a)?a:[]):f=a&&m.isPlainObject(a)?a:{},g[d]=m.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},m.extend({expando:"jQuery"+(l+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===m.type(a)},isArray:Array.isArray||function(a){return"array"===m.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){return!m.isArray(a)&&a-parseFloat(a)>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==m.type(a)||a.nodeType||m.isWindow(a))return!1;try{if(a.constructor&&!j.call(a,"constructor")&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(k.ownLast)for(b in a)return j.call(a,b);for(b in a);return void 0===b||j.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(b){b&&m.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(o,"ms-").replace(p,q)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=r(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(n,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(r(Object(a))?m.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(g)return g.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=r(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(f=a[b],b=a,a=f),m.isFunction(a)?(c=d.call(arguments,2),e=function(){return a.apply(b||this,c.concat(d.call(arguments)))},e.guid=a.guid=a.guid||m.guid++,e):void 0},now:function(){return+new Date},support:k}),m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function r(a){var b=a.length,c=m.type(a);return"function"===c||m.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var s=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+-new Date,v=a.document,w=0,x=0,y=gb(),z=gb(),A=gb(),B=function(a,b){return a===b&&(l=!0),0},C="undefined",D=1<<31,E={}.hasOwnProperty,F=[],G=F.pop,H=F.push,I=F.push,J=F.slice,K=F.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},L="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",N="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",O=N.replace("w","w#"),P="\\["+M+"*("+N+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+O+"))|)"+M+"*\\]",Q=":("+N+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+P+")*)|.*)\\)|)",R=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),S=new RegExp("^"+M+"*,"+M+"*"),T=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=new RegExp("="+M+"*([^\\]'\"]*?)"+M+"*\\]","g"),V=new RegExp(Q),W=new RegExp("^"+O+"$"),X={ID:new RegExp("^#("+N+")"),CLASS:new RegExp("^\\.("+N+")"),TAG:new RegExp("^("+N.replace("w","w*")+")"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+Q),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+L+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ab=/[+~]/,bb=/'|\\/g,cb=new RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),db=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{I.apply(F=J.call(v.childNodes),v.childNodes),F[v.childNodes.length].nodeType}catch(eb){I={apply:F.length?function(a,b){H.apply(a,J.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function fb(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],!a||"string"!=typeof a)return d;if(1!==(k=b.nodeType)&&9!==k)return[];if(p&&!e){if(f=_.exec(a))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return I.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName&&b.getElementsByClassName)return I.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=9===k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(bb,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+qb(o[l]);w=ab.test(a)&&ob(b.parentNode)||b,x=o.join(",")}if(x)try{return I.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function gb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function hb(a){return a[u]=!0,a}function ib(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function jb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function kb(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||D)-(~a.sourceIndex||D);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function lb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function mb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function nb(a){return hb(function(b){return b=+b,hb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function ob(a){return a&&typeof a.getElementsByTagName!==C&&a}c=fb.support={},f=fb.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=fb.setDocument=function(a){var b,e=a?a.ownerDocument||a:v,g=e.defaultView;return e!==n&&9===e.nodeType&&e.documentElement?(n=e,o=e.documentElement,p=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){m()},!1):g.attachEvent&&g.attachEvent("onunload",function(){m()})),c.attributes=ib(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ib(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(e.getElementsByClassName)&&ib(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),c.getById=ib(function(a){return o.appendChild(a).id=u,!e.getElementsByName||!e.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==C&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){var c=typeof a.getAttributeNode!==C&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==C?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==C&&p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(e.querySelectorAll))&&(ib(function(a){a.innerHTML="<select msallowclip=''><option selected=''></option></select>",a.querySelectorAll("[msallowclip^='']").length&&q.push("[*^$]="+M+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+M+"*(?:value|"+L+")"),a.querySelectorAll(":checked").length||q.push(":checked")}),ib(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+M+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ib(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",Q)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===v&&t(v,a)?-1:b===e||b.ownerDocument===v&&t(v,b)?1:k?K.call(k,a)-K.call(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],i=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:k?K.call(k,a)-K.call(k,b):0;if(f===g)return kb(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?kb(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},e):n},fb.matches=function(a,b){return fb(a,null,null,b)},fb.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return fb(b,n,null,[a]).length>0},fb.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},fb.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&E.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},fb.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},fb.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=fb.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=fb.selectors={cacheLength:50,createPseudo:hb,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(cb,db),a[3]=(a[3]||a[4]||a[5]||"").replace(cb,db),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||fb.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&fb.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(cb,db).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+M+")"+a+"("+M+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==C&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=fb.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||fb.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?hb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=K.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:hb(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?hb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:hb(function(a){return function(b){return fb(a,b).length>0}}),contains:hb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:hb(function(a){return W.test(a||"")||fb.error("unsupported lang: "+a),a=a.replace(cb,db).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:nb(function(){return[0]}),last:nb(function(a,b){return[b-1]}),eq:nb(function(a,b,c){return[0>c?c+b:c]}),even:nb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:nb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:nb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:nb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=lb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=mb(b);function pb(){}pb.prototype=d.filters=d.pseudos,d.setFilters=new pb,g=fb.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?fb.error(a):z(a,i).slice(0)};function qb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function rb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function sb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function tb(a,b,c){for(var d=0,e=b.length;e>d;d++)fb(a,b[d],c);return c}function ub(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function vb(a,b,c,d,e,f){return d&&!d[u]&&(d=vb(d)),e&&!e[u]&&(e=vb(e,f)),hb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||tb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ub(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ub(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?K.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=ub(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):I.apply(g,r)})}function wb(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=rb(function(a){return a===b},h,!0),l=rb(function(a){return K.call(b,a)>-1},h,!0),m=[function(a,c,d){return!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>i;i++)if(c=d.relative[a[i].type])m=[rb(sb(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return vb(i>1&&sb(m),i>1&&qb(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&wb(a.slice(i,e)),f>e&&wb(a=a.slice(e)),f>e&&qb(a))}m.push(c)}return sb(m)}function xb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=G.call(i));s=ub(s)}I.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&fb.uniqueSort(i)}return k&&(w=v,j=t),r};return c?hb(f):f}return h=fb.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=wb(b[c]),f[u]?d.push(f):e.push(f);f=A(a,xb(e,d)),f.selector=a}return f},i=fb.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(cb,db),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(cb,db),ab.test(j[0].type)&&ob(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&qb(j),!a)return I.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,ab.test(a)&&ob(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ib(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ib(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||jb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ib(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||jb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ib(function(a){return null==a.getAttribute("disabled")})||jb(L,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),fb}(a);m.find=s,m.expr=s.selectors,m.expr[":"]=m.expr.pseudos,m.unique=s.uniqueSort,m.text=s.getText,m.isXMLDoc=s.isXML,m.contains=s.contains;var t=m.expr.match.needsContext,u=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,v=/^.[^:#\[\.,]*$/;function w(a,b,c){if(m.isFunction(b))return m.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return m.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(v.test(b))return m.filter(b,a,c);b=m.filter(b,a)}return m.grep(a,function(a){return m.inArray(a,b)>=0!==c})}m.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?m.find.matchesSelector(d,a)?[d]:[]:m.find.matches(a,m.grep(b,function(a){return 1===a.nodeType}))},m.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(m(a).filter(function(){for(b=0;e>b;b++)if(m.contains(d[b],this))return!0}));for(b=0;e>b;b++)m.find(a,d[b],c);return c=this.pushStack(e>1?m.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(w(this,a||[],!1))},not:function(a){return this.pushStack(w(this,a||[],!0))},is:function(a){return!!w(this,"string"==typeof a&&t.test(a)?m(a):a||[],!1).length}});var x,y=a.document,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=m.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||x).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof m?b[0]:b,m.merge(this,m.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:y,!0)),u.test(c[1])&&m.isPlainObject(b))for(c in b)m.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}if(d=y.getElementById(c[2]),d&&d.parentNode){if(d.id!==c[2])return x.find(a);this.length=1,this[0]=d}return this.context=y,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):m.isFunction(a)?"undefined"!=typeof x.ready?x.ready(a):a(m):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),m.makeArray(a,this))};A.prototype=m.fn,x=m(y);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};m.extend({dir:function(a,b,c){var d=[],e=a[b];while(e&&9!==e.nodeType&&(void 0===c||1!==e.nodeType||!m(e).is(c)))1===e.nodeType&&d.push(e),e=e[b];return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),m.fn.extend({has:function(a){var b,c=m(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(m.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=t.test(a)||"string"!=typeof a?m(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&m.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?m.unique(f):f)},index:function(a){return a?"string"==typeof a?m.inArray(this[0],m(a)):m.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(m.unique(m.merge(this.get(),m(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}m.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return m.dir(a,"parentNode")},parentsUntil:function(a,b,c){return m.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return m.dir(a,"nextSibling")},prevAll:function(a){return m.dir(a,"previousSibling")},nextUntil:function(a,b,c){return m.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return m.dir(a,"previousSibling",c)},siblings:function(a){return m.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return m.sibling(a.firstChild)},contents:function(a){return m.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:m.merge([],a.childNodes)}},function(a,b){m.fn[a]=function(c,d){var e=m.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=m.filter(d,e)),this.length>1&&(C[a]||(e=m.unique(e)),B.test(a)&&(e=e.reverse())),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return m.each(a.match(E)||[],function(a,c){b[c]=!0}),b}m.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):m.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(c=a.memory&&l,d=!0,f=g||0,g=0,e=h.length,b=!0;h&&e>f;f++)if(h[f].apply(l[0],l[1])===!1&&a.stopOnFalse){c=!1;break}b=!1,h&&(i?i.length&&j(i.shift()):c?h=[]:k.disable())},k={add:function(){if(h){var d=h.length;!function f(b){m.each(b,function(b,c){var d=m.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&f(c)})}(arguments),b?e=h.length:c&&(g=d,j(c))}return this},remove:function(){return h&&m.each(arguments,function(a,c){var d;while((d=m.inArray(c,h,d))>-1)h.splice(d,1),b&&(e>=d&&e--,f>=d&&f--)}),this},has:function(a){return a?m.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],e=0,this},disable:function(){return h=i=c=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,c||k.disable(),this},locked:function(){return!i},fireWith:function(a,c){return!h||d&&!i||(c=c||[],c=[a,c.slice?c.slice():c],b?i.push(c):j(c)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!d}};return k},m.extend({Deferred:function(a){var b=[["resolve","done",m.Callbacks("once memory"),"resolved"],["reject","fail",m.Callbacks("once memory"),"rejected"],["notify","progress",m.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return m.Deferred(function(c){m.each(b,function(b,f){var g=m.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&m.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?m.extend(a,d):d}},e={};return d.pipe=d.then,m.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&m.isFunction(a.promise)?e:0,g=1===f?a:m.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&m.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;m.fn.ready=function(a){return m.ready.promise().done(a),this},m.extend({isReady:!1,readyWait:1,holdReady:function(a){a?m.readyWait++:m.ready(!0)},ready:function(a){if(a===!0?!--m.readyWait:!m.isReady){if(!y.body)return setTimeout(m.ready);m.isReady=!0,a!==!0&&--m.readyWait>0||(H.resolveWith(y,[m]),m.fn.triggerHandler&&(m(y).triggerHandler("ready"),m(y).off("ready")))}}});function I(){y.addEventListener?(y.removeEventListener("DOMContentLoaded",J,!1),a.removeEventListener("load",J,!1)):(y.detachEvent("onreadystatechange",J),a.detachEvent("onload",J))}function J(){(y.addEventListener||"load"===event.type||"complete"===y.readyState)&&(I(),m.ready())}m.ready.promise=function(b){if(!H)if(H=m.Deferred(),"complete"===y.readyState)setTimeout(m.ready);else if(y.addEventListener)y.addEventListener("DOMContentLoaded",J,!1),a.addEventListener("load",J,!1);else{y.attachEvent("onreadystatechange",J),a.attachEvent("onload",J);var c=!1;try{c=null==a.frameElement&&y.documentElement}catch(d){}c&&c.doScroll&&!function e(){if(!m.isReady){try{c.doScroll("left")}catch(a){return setTimeout(e,50)}I(),m.ready()}}()}return H.promise(b)};var K="undefined",L;for(L in m(k))break;k.ownLast="0"!==L,k.inlineBlockNeedsLayout=!1,m(function(){var a,b,c,d;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",k.inlineBlockNeedsLayout=a=3===b.offsetWidth,a&&(c.style.zoom=1)),c.removeChild(d))}),function(){var a=y.createElement("div");if(null==k.deleteExpando){k.deleteExpando=!0;try{delete a.test}catch(b){k.deleteExpando=!1}}a=null}(),m.acceptData=function(a){var b=m.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b};var M=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,N=/([A-Z])/g;function O(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(N,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:M.test(c)?m.parseJSON(c):c}catch(e){}m.data(a,b,c)}else c=void 0}return c}function P(a){var b;for(b in a)if(("data"!==b||!m.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;return!0}function Q(a,b,d,e){if(m.acceptData(a)){var f,g,h=m.expando,i=a.nodeType,j=i?m.cache:a,k=i?a[h]:a[h]&&h;
if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||m.guid++:h),j[k]||(j[k]=i?{}:{toJSON:m.noop}),("object"==typeof b||"function"==typeof b)&&(e?j[k]=m.extend(j[k],b):j[k].data=m.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[m.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[m.camelCase(b)])):f=g,f}}function R(a,b,c){if(m.acceptData(a)){var d,e,f=a.nodeType,g=f?m.cache:a,h=f?a[m.expando]:m.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){m.isArray(b)?b=b.concat(m.map(b,m.camelCase)):b in d?b=[b]:(b=m.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!P(d):!m.isEmptyObject(d))return}(c||(delete g[h].data,P(g[h])))&&(f?m.cleanData([a],!0):k.deleteExpando||g!=g.window?delete g[h]:g[h]=null)}}}m.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?m.cache[a[m.expando]]:a[m.expando],!!a&&!P(a)},data:function(a,b,c){return Q(a,b,c)},removeData:function(a,b){return R(a,b)},_data:function(a,b,c){return Q(a,b,c,!0)},_removeData:function(a,b){return R(a,b,!0)}}),m.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=m.data(f),1===f.nodeType&&!m._data(f,"parsedAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=m.camelCase(d.slice(5)),O(f,d,e[d])));m._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){m.data(this,a)}):arguments.length>1?this.each(function(){m.data(this,a,b)}):f?O(f,a,m.data(f,a)):void 0},removeData:function(a){return this.each(function(){m.removeData(this,a)})}}),m.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=m._data(a,b),c&&(!d||m.isArray(c)?d=m._data(a,b,m.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=m.queue(a,b),d=c.length,e=c.shift(),f=m._queueHooks(a,b),g=function(){m.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return m._data(a,c)||m._data(a,c,{empty:m.Callbacks("once memory").add(function(){m._removeData(a,b+"queue"),m._removeData(a,c)})})}}),m.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?m.queue(this[0],a):void 0===b?this:this.each(function(){var c=m.queue(this,a,b);m._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&m.dequeue(this,a)})},dequeue:function(a){return this.each(function(){m.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=m.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=m._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var S=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=["Top","Right","Bottom","Left"],U=function(a,b){return a=b||a,"none"===m.css(a,"display")||!m.contains(a.ownerDocument,a)},V=m.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===m.type(c)){e=!0;for(h in c)m.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,m.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(m(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},W=/^(?:checkbox|radio)$/i;!function(){var a=y.createElement("input"),b=y.createElement("div"),c=y.createDocumentFragment();if(b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",k.leadingWhitespace=3===b.firstChild.nodeType,k.tbody=!b.getElementsByTagName("tbody").length,k.htmlSerialize=!!b.getElementsByTagName("link").length,k.html5Clone="<:nav></:nav>"!==y.createElement("nav").cloneNode(!0).outerHTML,a.type="checkbox",a.checked=!0,c.appendChild(a),k.appendChecked=a.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue,c.appendChild(b),b.innerHTML="<input type='radio' checked='checked' name='t'/>",k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,k.noCloneEvent=!0,b.attachEvent&&(b.attachEvent("onclick",function(){k.noCloneEvent=!1}),b.cloneNode(!0).click()),null==k.deleteExpando){k.deleteExpando=!0;try{delete b.test}catch(d){k.deleteExpando=!1}}}(),function(){var b,c,d=y.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(k[b+"Bubbles"]=c in a)||(d.setAttribute(c,"t"),k[b+"Bubbles"]=d.attributes[c].expando===!1);d=null}();var X=/^(?:input|select|textarea)$/i,Y=/^key/,Z=/^(?:mouse|pointer|contextmenu)|click/,$=/^(?:focusinfocus|focusoutblur)$/,_=/^([^.]*)(?:\.(.+)|)$/;function ab(){return!0}function bb(){return!1}function cb(){try{return y.activeElement}catch(a){}}m.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=m.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return typeof m===K||a&&m.event.triggered===a.type?void 0:m.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(E)||[""],h=b.length;while(h--)f=_.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=m.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=m.event.special[o]||{},l=m.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&m.expr.match.needsContext.test(e),namespace:p.join(".")},i),(n=g[o])||(n=g[o]=[],n.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?n.splice(n.delegateCount++,0,l):n.push(l),m.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m.hasData(a)&&m._data(a);if(r&&(k=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=_.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=m.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,n=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=n.length;while(f--)g=n[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(n.splice(f,1),g.selector&&n.delegateCount--,l.remove&&l.remove.call(a,g));i&&!n.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||m.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)m.event.remove(a,o+b[j],c,d,!0);m.isEmptyObject(k)&&(delete r.handle,m._removeData(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,n,o=[d||y],p=j.call(b,"type")?b.type:b,q=j.call(b,"namespace")?b.namespace.split("."):[];if(h=l=d=d||y,3!==d.nodeType&&8!==d.nodeType&&!$.test(p+m.event.triggered)&&(p.indexOf(".")>=0&&(q=p.split("."),p=q.shift(),q.sort()),g=p.indexOf(":")<0&&"on"+p,b=b[m.expando]?b:new m.Event(p,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=q.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:m.makeArray(c,[b]),k=m.event.special[p]||{},e||!k.trigger||k.trigger.apply(d,c)!==!1)){if(!e&&!k.noBubble&&!m.isWindow(d)){for(i=k.delegateType||p,$.test(i+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),l=h;l===(d.ownerDocument||y)&&o.push(l.defaultView||l.parentWindow||a)}n=0;while((h=o[n++])&&!b.isPropagationStopped())b.type=n>1?i:k.bindType||p,f=(m._data(h,"events")||{})[b.type]&&m._data(h,"handle"),f&&f.apply(h,c),f=g&&h[g],f&&f.apply&&m.acceptData(h)&&(b.result=f.apply(h,c),b.result===!1&&b.preventDefault());if(b.type=p,!e&&!b.isDefaultPrevented()&&(!k._default||k._default.apply(o.pop(),c)===!1)&&m.acceptData(d)&&g&&d[p]&&!m.isWindow(d)){l=d[g],l&&(d[g]=null),m.event.triggered=p;try{d[p]()}catch(r){}m.event.triggered=void 0,l&&(d[g]=l)}return b.result}},dispatch:function(a){a=m.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(m._data(this,"events")||{})[a.type]||[],k=m.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=m.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,g=0;while((e=f.handlers[g++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(e.namespace))&&(a.handleObj=e,a.data=e.data,c=((m.event.special[e.origType]||{}).handle||e.handler).apply(f.elem,i),void 0!==c&&(a.result=c)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(e=[],f=0;h>f;f++)d=b[f],c=d.selector+" ",void 0===e[c]&&(e[c]=d.needsContext?m(c,this).index(i)>=0:m.find(c,this,null,[i]).length),e[c]&&e.push(d);e.length&&g.push({elem:i,handlers:e})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[m.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=Z.test(e)?this.mouseHooks:Y.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new m.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=f.srcElement||y),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,g.filter?g.filter(a,f):a},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button,g=b.fromElement;return null==a.pageX&&null!=b.clientX&&(d=a.target.ownerDocument||y,e=d.documentElement,c=d.body,a.pageX=b.clientX+(e&&e.scrollLeft||c&&c.scrollLeft||0)-(e&&e.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||c&&c.scrollTop||0)-(e&&e.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&g&&(a.relatedTarget=g===a.target?b.toElement:g),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==cb()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===cb()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return m.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return m.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=m.extend(new m.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?m.event.trigger(e,null,b):m.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},m.removeEvent=y.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]===K&&(a[d]=null),a.detachEvent(d,c))},m.Event=function(a,b){return this instanceof m.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?ab:bb):this.type=a,b&&m.extend(this,b),this.timeStamp=a&&a.timeStamp||m.now(),void(this[m.expando]=!0)):new m.Event(a,b)},m.Event.prototype={isDefaultPrevented:bb,isPropagationStopped:bb,isImmediatePropagationStopped:bb,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=ab,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=ab,a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=ab,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},m.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){m.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!m.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.submitBubbles||(m.event.special.submit={setup:function(){return m.nodeName(this,"form")?!1:void m.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=m.nodeName(b,"input")||m.nodeName(b,"button")?b.form:void 0;c&&!m._data(c,"submitBubbles")&&(m.event.add(c,"submit._submit",function(a){a._submit_bubble=!0}),m._data(c,"submitBubbles",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&m.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){return m.nodeName(this,"form")?!1:void m.event.remove(this,"._submit")}}),k.changeBubbles||(m.event.special.change={setup:function(){return X.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(m.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._just_changed=!0)}),m.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),m.event.simulate("change",this,a,!0)})),!1):void m.event.add(this,"beforeactivate._change",function(a){var b=a.target;X.test(b.nodeName)&&!m._data(b,"changeBubbles")&&(m.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||m.event.simulate("change",this.parentNode,a,!0)}),m._data(b,"changeBubbles",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return m.event.remove(this,"._change"),!X.test(this.nodeName)}}),k.focusinBubbles||m.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){m.event.simulate(b,a.target,m.event.fix(a),!0)};m.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=m._data(d,b);e||d.addEventListener(a,c,!0),m._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=m._data(d,b)-1;e?m._data(d,b,e):(d.removeEventListener(a,c,!0),m._removeData(d,b))}}}),m.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(f in a)this.on(f,b,c,a[f],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=bb;else if(!d)return this;return 1===e&&(g=d,d=function(a){return m().off(a),g.apply(this,arguments)},d.guid=g.guid||(g.guid=m.guid++)),this.each(function(){m.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,m(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=bb),this.each(function(){m.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){m.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?m.event.trigger(a,b,c,!0):void 0}});function db(a){var b=eb.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}var eb="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",fb=/ jQuery\d+="(?:null|\d+)"/g,gb=new RegExp("<(?:"+eb+")[\\s/>]","i"),hb=/^\s+/,ib=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,jb=/<([\w:]+)/,kb=/<tbody/i,lb=/<|&#?\w+;/,mb=/<(?:script|style|link)/i,nb=/checked\s*(?:[^=]|=\s*.checked.)/i,ob=/^$|\/(?:java|ecma)script/i,pb=/^true\/(.*)/,qb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,rb={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:k.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},sb=db(y),tb=sb.appendChild(y.createElement("div"));rb.optgroup=rb.option,rb.tbody=rb.tfoot=rb.colgroup=rb.caption=rb.thead,rb.th=rb.td;function ub(a,b){var c,d,e=0,f=typeof a.getElementsByTagName!==K?a.getElementsByTagName(b||"*"):typeof a.querySelectorAll!==K?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||m.nodeName(d,b)?f.push(d):m.merge(f,ub(d,b));return void 0===b||b&&m.nodeName(a,b)?m.merge([a],f):f}function vb(a){W.test(a.type)&&(a.defaultChecked=a.checked)}function wb(a,b){return m.nodeName(a,"table")&&m.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function xb(a){return a.type=(null!==m.find.attr(a,"type"))+"/"+a.type,a}function yb(a){var b=pb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function zb(a,b){for(var c,d=0;null!=(c=a[d]);d++)m._data(c,"globalEval",!b||m._data(b[d],"globalEval"))}function Ab(a,b){if(1===b.nodeType&&m.hasData(a)){var c,d,e,f=m._data(a),g=m._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)m.event.add(b,c,h[c][d])}g.data&&(g.data=m.extend({},g.data))}}function Bb(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!k.noCloneEvent&&b[m.expando]){e=m._data(b);for(d in e.events)m.removeEvent(b,d,e.handle);b.removeAttribute(m.expando)}"script"===c&&b.text!==a.text?(xb(b).text=a.text,yb(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),k.html5Clone&&a.innerHTML&&!m.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&W.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}}m.extend({clone:function(a,b,c){var d,e,f,g,h,i=m.contains(a.ownerDocument,a);if(k.html5Clone||m.isXMLDoc(a)||!gb.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(tb.innerHTML=a.outerHTML,tb.removeChild(f=tb.firstChild)),!(k.noCloneEvent&&k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||m.isXMLDoc(a)))for(d=ub(f),h=ub(a),g=0;null!=(e=h[g]);++g)d[g]&&Bb(e,d[g]);if(b)if(c)for(h=h||ub(a),d=d||ub(f),g=0;null!=(e=h[g]);g++)Ab(e,d[g]);else Ab(a,f);return d=ub(f,"script"),d.length>0&&zb(d,!i&&ub(a,"script")),d=h=e=null,f},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,l,n=a.length,o=db(b),p=[],q=0;n>q;q++)if(f=a[q],f||0===f)if("object"===m.type(f))m.merge(p,f.nodeType?[f]:f);else if(lb.test(f)){h=h||o.appendChild(b.createElement("div")),i=(jb.exec(f)||["",""])[1].toLowerCase(),l=rb[i]||rb._default,h.innerHTML=l[1]+f.replace(ib,"<$1></$2>")+l[2],e=l[0];while(e--)h=h.lastChild;if(!k.leadingWhitespace&&hb.test(f)&&p.push(b.createTextNode(hb.exec(f)[0])),!k.tbody){f="table"!==i||kb.test(f)?"<table>"!==l[1]||kb.test(f)?0:h:h.firstChild,e=f&&f.childNodes.length;while(e--)m.nodeName(j=f.childNodes[e],"tbody")&&!j.childNodes.length&&f.removeChild(j)}m.merge(p,h.childNodes),h.textContent="";while(h.firstChild)h.removeChild(h.firstChild);h=o.lastChild}else p.push(b.createTextNode(f));h&&o.removeChild(h),k.appendChecked||m.grep(ub(p,"input"),vb),q=0;while(f=p[q++])if((!d||-1===m.inArray(f,d))&&(g=m.contains(f.ownerDocument,f),h=ub(o.appendChild(f),"script"),g&&zb(h),c)){e=0;while(f=h[e++])ob.test(f.type||"")&&c.push(f)}return h=null,o},cleanData:function(a,b){for(var d,e,f,g,h=0,i=m.expando,j=m.cache,l=k.deleteExpando,n=m.event.special;null!=(d=a[h]);h++)if((b||m.acceptData(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)n[e]?m.event.remove(d,e):m.removeEvent(d,e,g.handle);j[f]&&(delete j[f],l?delete d[i]:typeof d.removeAttribute!==K?d.removeAttribute(i):d[i]=null,c.push(f))}}}),m.fn.extend({text:function(a){return V(this,function(a){return void 0===a?m.text(this):this.empty().append((this[0]&&this[0].ownerDocument||y).createTextNode(a))},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?m.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||m.cleanData(ub(c)),c.parentNode&&(b&&m.contains(c.ownerDocument,c)&&zb(ub(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&m.cleanData(ub(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&m.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return m.clone(this,a,b)})},html:function(a){return V(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(fb,""):void 0;if(!("string"!=typeof a||mb.test(a)||!k.htmlSerialize&&gb.test(a)||!k.leadingWhitespace&&hb.test(a)||rb[(jb.exec(a)||["",""])[1].toLowerCase()])){a=a.replace(ib,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(m.cleanData(ub(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,m.cleanData(ub(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,n=this,o=l-1,p=a[0],q=m.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&nb.test(p))return this.each(function(c){var d=n.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(i=m.buildFragment(a,this[0].ownerDocument,!1,this),c=i.firstChild,1===i.childNodes.length&&(i=c),c)){for(g=m.map(ub(i,"script"),xb),f=g.length;l>j;j++)d=i,j!==o&&(d=m.clone(d,!0,!0),f&&m.merge(g,ub(d,"script"))),b.call(this[j],d,j);if(f)for(h=g[g.length-1].ownerDocument,m.map(g,yb),j=0;f>j;j++)d=g[j],ob.test(d.type||"")&&!m._data(d,"globalEval")&&m.contains(h,d)&&(d.src?m._evalUrl&&m._evalUrl(d.src):m.globalEval((d.text||d.textContent||d.innerHTML||"").replace(qb,"")));i=c=null}return this}}),m.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){m.fn[a]=function(a){for(var c,d=0,e=[],g=m(a),h=g.length-1;h>=d;d++)c=d===h?this:this.clone(!0),m(g[d])[b](c),f.apply(e,c.get());return this.pushStack(e)}});var Cb,Db={};function Eb(b,c){var d,e=m(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:m.css(e[0],"display");return e.detach(),f}function Fb(a){var b=y,c=Db[a];return c||(c=Eb(a,b),"none"!==c&&c||(Cb=(Cb||m("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Cb[0].contentWindow||Cb[0].contentDocument).document,b.write(),b.close(),c=Eb(a,b),Cb.detach()),Db[a]=c),c}!function(){var a;k.shrinkWrapBlocks=function(){if(null!=a)return a;a=!1;var b,c,d;return c=y.getElementsByTagName("body")[0],c&&c.style?(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",b.appendChild(y.createElement("div")).style.width="5px",a=3!==b.offsetWidth),c.removeChild(d),a):void 0}}();var Gb=/^margin/,Hb=new RegExp("^("+S+")(?!px)[a-z%]+$","i"),Ib,Jb,Kb=/^(top|right|bottom|left)$/;a.getComputedStyle?(Ib=function(a){return a.ownerDocument.defaultView.getComputedStyle(a,null)},Jb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ib(a),g=c?c.getPropertyValue(b)||c[b]:void 0,c&&(""!==g||m.contains(a.ownerDocument,a)||(g=m.style(a,b)),Hb.test(g)&&Gb.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0===g?g:g+""}):y.documentElement.currentStyle&&(Ib=function(a){return a.currentStyle},Jb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ib(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Hb.test(g)&&!Kb.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function Lb(a,b){return{get:function(){var c=a();if(null!=c)return c?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d,e,f,g,h;if(b=y.createElement("div"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=d&&d.style){c.cssText="float:left;opacity:.5",k.opacity="0.5"===c.opacity,k.cssFloat=!!c.cssFloat,b.style.backgroundClip="content-box",b.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===b.style.backgroundClip,k.boxSizing=""===c.boxSizing||""===c.MozBoxSizing||""===c.WebkitBoxSizing,m.extend(k,{reliableHiddenOffsets:function(){return null==g&&i(),g},boxSizingReliable:function(){return null==f&&i(),f},pixelPosition:function(){return null==e&&i(),e},reliableMarginRight:function(){return null==h&&i(),h}});function i(){var b,c,d,i;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),b.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",e=f=!1,h=!0,a.getComputedStyle&&(e="1%"!==(a.getComputedStyle(b,null)||{}).top,f="4px"===(a.getComputedStyle(b,null)||{width:"4px"}).width,i=b.appendChild(y.createElement("div")),i.style.cssText=b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",i.style.marginRight=i.style.width="0",b.style.width="1px",h=!parseFloat((a.getComputedStyle(i,null)||{}).marginRight)),b.innerHTML="<table><tr><td></td><td>t</td></tr></table>",i=b.getElementsByTagName("td"),i[0].style.cssText="margin:0;border:0;padding:0;display:none",g=0===i[0].offsetHeight,g&&(i[0].style.display="",i[1].style.display="none",g=0===i[0].offsetHeight),c.removeChild(d))}}}(),m.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var Mb=/alpha\([^)]*\)/i,Nb=/opacity\s*=\s*([^)]*)/,Ob=/^(none|table(?!-c[ea]).+)/,Pb=new RegExp("^("+S+")(.*)$","i"),Qb=new RegExp("^([+-])=("+S+")","i"),Rb={position:"absolute",visibility:"hidden",display:"block"},Sb={letterSpacing:"0",fontWeight:"400"},Tb=["Webkit","O","Moz","ms"];function Ub(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=Tb.length;while(e--)if(b=Tb[e]+c,b in a)return b;return d}function Vb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=m._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&U(d)&&(f[g]=m._data(d,"olddisplay",Fb(d.nodeName)))):(e=U(d),(c&&"none"!==c||!e)&&m._data(d,"olddisplay",e?c:m.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function Wb(a,b,c){var d=Pb.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Xb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=m.css(a,c+T[f],!0,e)),d?("content"===c&&(g-=m.css(a,"padding"+T[f],!0,e)),"margin"!==c&&(g-=m.css(a,"border"+T[f]+"Width",!0,e))):(g+=m.css(a,"padding"+T[f],!0,e),"padding"!==c&&(g+=m.css(a,"border"+T[f]+"Width",!0,e)));return g}function Yb(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ib(a),g=k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Jb(a,b,f),(0>e||null==e)&&(e=a.style[b]),Hb.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Xb(a,b,c||(g?"border":"content"),d,f)+"px"}m.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Jb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":k.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=m.camelCase(b),i=a.style;if(b=m.cssProps[h]||(m.cssProps[h]=Ub(i,h)),g=m.cssHooks[b]||m.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b];if(f=typeof c,"string"===f&&(e=Qb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(m.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||m.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]=c}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=m.camelCase(b);return b=m.cssProps[h]||(m.cssProps[h]=Ub(a.style,h)),g=m.cssHooks[b]||m.cssHooks[h],g&&"get"in g&&(f=g.get(a,!0,c)),void 0===f&&(f=Jb(a,b,d)),"normal"===f&&b in Sb&&(f=Sb[b]),""===c||c?(e=parseFloat(f),c===!0||m.isNumeric(e)?e||0:f):f}}),m.each(["height","width"],function(a,b){m.cssHooks[b]={get:function(a,c,d){return c?Ob.test(m.css(a,"display"))&&0===a.offsetWidth?m.swap(a,Rb,function(){return Yb(a,b,d)}):Yb(a,b,d):void 0},set:function(a,c,d){var e=d&&Ib(a);return Wb(a,c,d?Xb(a,b,d,k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,e),e):0)}}}),k.opacity||(m.cssHooks.opacity={get:function(a,b){return Nb.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=m.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===m.trim(f.replace(Mb,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Mb.test(f)?f.replace(Mb,e):f+" "+e)}}),m.cssHooks.marginRight=Lb(k.reliableMarginRight,function(a,b){return b?m.swap(a,{display:"inline-block"},Jb,[a,"marginRight"]):void 0}),m.each({margin:"",padding:"",border:"Width"},function(a,b){m.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+T[d]+b]=f[d]||f[d-2]||f[0];return e}},Gb.test(a)||(m.cssHooks[a+b].set=Wb)}),m.fn.extend({css:function(a,b){return V(this,function(a,b,c){var d,e,f={},g=0;if(m.isArray(b)){for(d=Ib(a),e=b.length;e>g;g++)f[b[g]]=m.css(a,b[g],!1,d);return f}return void 0!==c?m.style(a,b,c):m.css(a,b)},a,b,arguments.length>1)},show:function(){return Vb(this,!0)},hide:function(){return Vb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){U(this)?m(this).show():m(this).hide()})}});function Zb(a,b,c,d,e){return new Zb.prototype.init(a,b,c,d,e)}m.Tween=Zb,Zb.prototype={constructor:Zb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(m.cssNumber[c]?"":"px")
},cur:function(){var a=Zb.propHooks[this.prop];return a&&a.get?a.get(this):Zb.propHooks._default.get(this)},run:function(a){var b,c=Zb.propHooks[this.prop];return this.pos=b=this.options.duration?m.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Zb.propHooks._default.set(this),this}},Zb.prototype.init.prototype=Zb.prototype,Zb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=m.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){m.fx.step[a.prop]?m.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[m.cssProps[a.prop]]||m.cssHooks[a.prop])?m.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Zb.propHooks.scrollTop=Zb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},m.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},m.fx=Zb.prototype.init,m.fx.step={};var $b,_b,ac=/^(?:toggle|show|hide)$/,bc=new RegExp("^(?:([+-])=|)("+S+")([a-z%]*)$","i"),cc=/queueHooks$/,dc=[ic],ec={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=bc.exec(b),f=e&&e[3]||(m.cssNumber[a]?"":"px"),g=(m.cssNumber[a]||"px"!==f&&+d)&&bc.exec(m.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,m.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function fc(){return setTimeout(function(){$b=void 0}),$b=m.now()}function gc(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=T[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function hc(a,b,c){for(var d,e=(ec[b]||[]).concat(ec["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function ic(a,b,c){var d,e,f,g,h,i,j,l,n=this,o={},p=a.style,q=a.nodeType&&U(a),r=m._data(a,"fxshow");c.queue||(h=m._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,n.always(function(){n.always(function(){h.unqueued--,m.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=m.css(a,"display"),l="none"===j?m._data(a,"olddisplay")||Fb(a.nodeName):j,"inline"===l&&"none"===m.css(a,"float")&&(k.inlineBlockNeedsLayout&&"inline"!==Fb(a.nodeName)?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",k.shrinkWrapBlocks()||n.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],ac.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=!0}o[d]=r&&r[d]||m.style(a,d)}else j=void 0;if(m.isEmptyObject(o))"inline"===("none"===j?Fb(a.nodeName):j)&&(p.display=j);else{r?"hidden"in r&&(q=r.hidden):r=m._data(a,"fxshow",{}),f&&(r.hidden=!q),q?m(a).show():n.done(function(){m(a).hide()}),n.done(function(){var b;m._removeData(a,"fxshow");for(b in o)m.style(a,b,o[b])});for(d in o)g=hc(q?r[d]:0,d,n),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function jc(a,b){var c,d,e,f,g;for(c in a)if(d=m.camelCase(c),e=b[d],f=a[c],m.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=m.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function kc(a,b,c){var d,e,f=0,g=dc.length,h=m.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=$b||fc(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:m.extend({},b),opts:m.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:$b||fc(),duration:c.duration,tweens:[],createTween:function(b,c){var d=m.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(jc(k,j.opts.specialEasing);g>f;f++)if(d=dc[f].call(j,a,k,j.opts))return d;return m.map(k,hc,j),m.isFunction(j.opts.start)&&j.opts.start.call(a,j),m.fx.timer(m.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}m.Animation=m.extend(kc,{tweener:function(a,b){m.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],ec[c]=ec[c]||[],ec[c].unshift(b)},prefilter:function(a,b){b?dc.unshift(a):dc.push(a)}}),m.speed=function(a,b,c){var d=a&&"object"==typeof a?m.extend({},a):{complete:c||!c&&b||m.isFunction(a)&&a,duration:a,easing:c&&b||b&&!m.isFunction(b)&&b};return d.duration=m.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in m.fx.speeds?m.fx.speeds[d.duration]:m.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){m.isFunction(d.old)&&d.old.call(this),d.queue&&m.dequeue(this,d.queue)},d},m.fn.extend({fadeTo:function(a,b,c,d){return this.filter(U).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=m.isEmptyObject(a),f=m.speed(b,c,d),g=function(){var b=kc(this,m.extend({},a),f);(e||m._data(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=m.timers,g=m._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&cc.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&m.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=m._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=m.timers,g=d?d.length:0;for(c.finish=!0,m.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),m.each(["toggle","show","hide"],function(a,b){var c=m.fn[b];m.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(gc(b,!0),a,d,e)}}),m.each({slideDown:gc("show"),slideUp:gc("hide"),slideToggle:gc("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){m.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),m.timers=[],m.fx.tick=function(){var a,b=m.timers,c=0;for($b=m.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||m.fx.stop(),$b=void 0},m.fx.timer=function(a){m.timers.push(a),a()?m.fx.start():m.timers.pop()},m.fx.interval=13,m.fx.start=function(){_b||(_b=setInterval(m.fx.tick,m.fx.interval))},m.fx.stop=function(){clearInterval(_b),_b=null},m.fx.speeds={slow:600,fast:200,_default:400},m.fn.delay=function(a,b){return a=m.fx?m.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a,b,c,d,e;b=y.createElement("div"),b.setAttribute("className","t"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=y.createElement("select"),e=c.appendChild(y.createElement("option")),a=b.getElementsByTagName("input")[0],d.style.cssText="top:1px",k.getSetAttribute="t"!==b.className,k.style=/top/.test(d.getAttribute("style")),k.hrefNormalized="/a"===d.getAttribute("href"),k.checkOn=!!a.value,k.optSelected=e.selected,k.enctype=!!y.createElement("form").enctype,c.disabled=!0,k.optDisabled=!e.disabled,a=y.createElement("input"),a.setAttribute("value",""),k.input=""===a.getAttribute("value"),a.value="t",a.setAttribute("type","radio"),k.radioValue="t"===a.value}();var lc=/\r/g;m.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=m.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,m(this).val()):a,null==e?e="":"number"==typeof e?e+="":m.isArray(e)&&(e=m.map(e,function(a){return null==a?"":a+""})),b=m.valHooks[this.type]||m.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=m.valHooks[e.type]||m.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(lc,""):null==c?"":c)}}}),m.extend({valHooks:{option:{get:function(a){var b=m.find.attr(a,"value");return null!=b?b:m.trim(m.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&m.nodeName(c.parentNode,"optgroup"))){if(b=m(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=m.makeArray(b),g=e.length;while(g--)if(d=e[g],m.inArray(m.valHooks.option.get(d),f)>=0)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),m.each(["radio","checkbox"],function(){m.valHooks[this]={set:function(a,b){return m.isArray(b)?a.checked=m.inArray(m(a).val(),b)>=0:void 0}},k.checkOn||(m.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var mc,nc,oc=m.expr.attrHandle,pc=/^(?:checked|selected)$/i,qc=k.getSetAttribute,rc=k.input;m.fn.extend({attr:function(a,b){return V(this,m.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){m.removeAttr(this,a)})}}),m.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===K?m.prop(a,b,c):(1===f&&m.isXMLDoc(a)||(b=b.toLowerCase(),d=m.attrHooks[b]||(m.expr.match.bool.test(b)?nc:mc)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=m.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void m.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=m.propFix[c]||c,m.expr.match.bool.test(c)?rc&&qc||!pc.test(c)?a[d]=!1:a[m.camelCase("default-"+c)]=a[d]=!1:m.attr(a,c,""),a.removeAttribute(qc?c:d)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&m.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),nc={set:function(a,b,c){return b===!1?m.removeAttr(a,c):rc&&qc||!pc.test(c)?a.setAttribute(!qc&&m.propFix[c]||c,c):a[m.camelCase("default-"+c)]=a[c]=!0,c}},m.each(m.expr.match.bool.source.match(/\w+/g),function(a,b){var c=oc[b]||m.find.attr;oc[b]=rc&&qc||!pc.test(b)?function(a,b,d){var e,f;return d||(f=oc[b],oc[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,oc[b]=f),e}:function(a,b,c){return c?void 0:a[m.camelCase("default-"+b)]?b.toLowerCase():null}}),rc&&qc||(m.attrHooks.value={set:function(a,b,c){return m.nodeName(a,"input")?void(a.defaultValue=b):mc&&mc.set(a,b,c)}}),qc||(mc={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},oc.id=oc.name=oc.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},m.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:mc.set},m.attrHooks.contenteditable={set:function(a,b,c){mc.set(a,""===b?!1:b,c)}},m.each(["width","height"],function(a,b){m.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),k.style||(m.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var sc=/^(?:input|select|textarea|button|object)$/i,tc=/^(?:a|area)$/i;m.fn.extend({prop:function(a,b){return V(this,m.prop,a,b,arguments.length>1)},removeProp:function(a){return a=m.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),m.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!m.isXMLDoc(a),f&&(b=m.propFix[b]||b,e=m.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=m.find.attr(a,"tabindex");return b?parseInt(b,10):sc.test(a.nodeName)||tc.test(a.nodeName)&&a.href?0:-1}}}}),k.hrefNormalized||m.each(["href","src"],function(a,b){m.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),k.optSelected||(m.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}}),m.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){m.propFix[this.toLowerCase()]=this}),k.enctype||(m.propFix.enctype="encoding");var uc=/[\t\r\n\f]/g;m.fn.extend({addClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j="string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).addClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(uc," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=m.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j=0===arguments.length||"string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).removeClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(uc," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?m.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(m.isFunction(a)?function(c){m(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=m(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===K||"boolean"===c)&&(this.className&&m._data(this,"__className__",this.className),this.className=this.className||a===!1?"":m._data(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(uc," ").indexOf(b)>=0)return!0;return!1}}),m.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){m.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),m.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var vc=m.now(),wc=/\?/,xc=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;m.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=m.trim(b+"");return e&&!m.trim(e.replace(xc,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():m.error("Invalid JSON: "+b)},m.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))}catch(e){c=void 0}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||m.error("Invalid XML: "+b),c};var yc,zc,Ac=/#.*$/,Bc=/([?&])_=[^&]*/,Cc=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Dc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Ec=/^(?:GET|HEAD)$/,Fc=/^\/\//,Gc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Hc={},Ic={},Jc="*/".concat("*");try{zc=location.href}catch(Kc){zc=y.createElement("a"),zc.href="",zc=zc.href}yc=Gc.exec(zc.toLowerCase())||[];function Lc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(m.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Mc(a,b,c,d){var e={},f=a===Ic;function g(h){var i;return e[h]=!0,m.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Nc(a,b){var c,d,e=m.ajaxSettings.flatOptions||{};for(d in b)void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&m.extend(!0,a,c),a}function Oc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else{for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g)}f=f||d}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Pc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}m.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:zc,type:"GET",isLocal:Dc.test(yc[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Jc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":m.parseJSON,"text xml":m.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Nc(Nc(a,m.ajaxSettings),b):Nc(m.ajaxSettings,a)},ajaxPrefilter:Lc(Hc),ajaxTransport:Lc(Ic),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=m.ajaxSetup({},b),l=k.context||k,n=k.context&&(l.nodeType||l.jquery)?m(l):m.event,o=m.Deferred(),p=m.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!j){j={};while(b=Cc.exec(f))j[b[1].toLowerCase()]=b[2]}b=j[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?f:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return i&&i.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||zc)+"").replace(Ac,"").replace(Fc,yc[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=m.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(c=Gc.exec(k.url.toLowerCase()),k.crossDomain=!(!c||c[1]===yc[1]&&c[2]===yc[2]&&(c[3]||("http:"===c[1]?"80":"443"))===(yc[3]||("http:"===yc[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=m.param(k.data,k.traditional)),Mc(Hc,k,b,v),2===t)return v;h=k.global,h&&0===m.active++&&m.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!Ec.test(k.type),e=k.url,k.hasContent||(k.data&&(e=k.url+=(wc.test(e)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=Bc.test(e)?e.replace(Bc,"$1_="+vc++):e+(wc.test(e)?"&":"?")+"_="+vc++)),k.ifModified&&(m.lastModified[e]&&v.setRequestHeader("If-Modified-Since",m.lastModified[e]),m.etag[e]&&v.setRequestHeader("If-None-Match",m.etag[e])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+Jc+"; q=0.01":""):k.accepts["*"]);for(d in k.headers)v.setRequestHeader(d,k.headers[d]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(d in{success:1,error:1,complete:1})v[d](k[d]);if(i=Mc(Ic,k,b,v)){v.readyState=1,h&&n.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,i.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,c,d){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),i=void 0,f=d||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,c&&(u=Oc(k,v,c)),u=Pc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(m.lastModified[e]=w),w=v.getResponseHeader("etag"),w&&(m.etag[e]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,h&&n.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),h&&(n.trigger("ajaxComplete",[v,k]),--m.active||m.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return m.get(a,b,c,"json")},getScript:function(a,b){return m.get(a,void 0,b,"script")}}),m.each(["get","post"],function(a,b){m[b]=function(a,c,d,e){return m.isFunction(c)&&(e=e||d,d=c,c=void 0),m.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),m.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){m.fn[b]=function(a){return this.on(b,a)}}),m._evalUrl=function(a){return m.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},m.fn.extend({wrapAll:function(a){if(m.isFunction(a))return this.each(function(b){m(this).wrapAll(a.call(this,b))});if(this[0]){var b=m(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return this.each(m.isFunction(a)?function(b){m(this).wrapInner(a.call(this,b))}:function(){var b=m(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=m.isFunction(a);return this.each(function(c){m(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){m.nodeName(this,"body")||m(this).replaceWith(this.childNodes)}).end()}}),m.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0||!k.reliableHiddenOffsets()&&"none"===(a.style&&a.style.display||m.css(a,"display"))},m.expr.filters.visible=function(a){return!m.expr.filters.hidden(a)};var Qc=/%20/g,Rc=/\[\]$/,Sc=/\r?\n/g,Tc=/^(?:submit|button|image|reset|file)$/i,Uc=/^(?:input|select|textarea|keygen)/i;function Vc(a,b,c,d){var e;if(m.isArray(b))m.each(b,function(b,e){c||Rc.test(a)?d(a,e):Vc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==m.type(b))d(a,b);else for(e in b)Vc(a+"["+e+"]",b[e],c,d)}m.param=function(a,b){var c,d=[],e=function(a,b){b=m.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=m.ajaxSettings&&m.ajaxSettings.traditional),m.isArray(a)||a.jquery&&!m.isPlainObject(a))m.each(a,function(){e(this.name,this.value)});else for(c in a)Vc(c,a[c],b,e);return d.join("&").replace(Qc,"+")},m.fn.extend({serialize:function(){return m.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=m.prop(this,"elements");return a?m.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!m(this).is(":disabled")&&Uc.test(this.nodeName)&&!Tc.test(a)&&(this.checked||!W.test(a))}).map(function(a,b){var c=m(this).val();return null==c?null:m.isArray(c)?m.map(c,function(a){return{name:b.name,value:a.replace(Sc,"\r\n")}}):{name:b.name,value:c.replace(Sc,"\r\n")}}).get()}}),m.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&Zc()||$c()}:Zc;var Wc=0,Xc={},Yc=m.ajaxSettings.xhr();a.ActiveXObject&&m(a).on("unload",function(){for(var a in Xc)Xc[a](void 0,!0)}),k.cors=!!Yc&&"withCredentials"in Yc,Yc=k.ajax=!!Yc,Yc&&m.ajaxTransport(function(a){if(!a.crossDomain||k.cors){var b;return{send:function(c,d){var e,f=a.xhr(),g=++Wc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)void 0!==c[e]&&f.setRequestHeader(e,c[e]+"");f.send(a.hasContent&&a.data||null),b=function(c,e){var h,i,j;if(b&&(e||4===f.readyState))if(delete Xc[g],b=void 0,f.onreadystatechange=m.noop,e)4!==f.readyState&&f.abort();else{j={},h=f.status,"string"==typeof f.responseText&&(j.text=f.responseText);try{i=f.statusText}catch(k){i=""}h||!a.isLocal||a.crossDomain?1223===h&&(h=204):h=j.text?200:404}j&&d(h,i,j,f.getAllResponseHeaders())},a.async?4===f.readyState?setTimeout(b):f.onreadystatechange=Xc[g]=b:b()},abort:function(){b&&b(void 0,!0)}}}});function Zc(){try{return new a.XMLHttpRequest}catch(b){}}function $c(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}m.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return m.globalEval(a),a}}}),m.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),m.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=y.head||m("head")[0]||y.documentElement;return{send:function(d,e){b=y.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||e(200,"success"))},c.insertBefore(b,c.firstChild)},abort:function(){b&&b.onload(void 0,!0)}}}});var _c=[],ad=/(=)\?(?=&|$)|\?\?/;m.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=_c.pop()||m.expando+"_"+vc++;return this[a]=!0,a}}),m.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(ad.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&ad.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=m.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(ad,"$1"+e):b.jsonp!==!1&&(b.url+=(wc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||m.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,_c.push(e)),g&&m.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),m.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||y;var d=u.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=m.buildFragment([a],b,e),e&&e.length&&m(e).remove(),m.merge([],d.childNodes))};var bd=m.fn.load;m.fn.load=function(a,b,c){if("string"!=typeof a&&bd)return bd.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=m.trim(a.slice(h,a.length)),a=a.slice(0,h)),m.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(f="POST"),g.length>0&&m.ajax({url:a,type:f,dataType:"html",data:b}).done(function(a){e=arguments,g.html(d?m("<div>").append(m.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,e||[a.responseText,b,a])}),this},m.expr.filters.animated=function(a){return m.grep(m.timers,function(b){return a===b.elem}).length};var cd=a.document.documentElement;function dd(a){return m.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}m.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=m.css(a,"position"),l=m(a),n={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=m.css(a,"top"),i=m.css(a,"left"),j=("absolute"===k||"fixed"===k)&&m.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),m.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(n.top=b.top-h.top+g),null!=b.left&&(n.left=b.left-h.left+e),"using"in b?b.using.call(a,n):l.css(n)}},m.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){m.offset.setOffset(this,a,b)});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,m.contains(b,e)?(typeof e.getBoundingClientRect!==K&&(d=e.getBoundingClientRect()),c=dd(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return"fixed"===m.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),m.nodeName(a[0],"html")||(c=a.offset()),c.top+=m.css(a[0],"borderTopWidth",!0),c.left+=m.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-m.css(d,"marginTop",!0),left:b.left-c.left-m.css(d,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||cd;while(a&&!m.nodeName(a,"html")&&"static"===m.css(a,"position"))a=a.offsetParent;return a||cd})}}),m.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);m.fn[a]=function(d){return V(this,function(a,d,e){var f=dd(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?m(f).scrollLeft():e,c?e:m(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)}}),m.each(["top","left"],function(a,b){m.cssHooks[b]=Lb(k.pixelPosition,function(a,c){return c?(c=Jb(a,b),Hb.test(c)?m(a).position()[b]+"px":c):void 0})}),m.each({Height:"height",Width:"width"},function(a,b){m.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){m.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return V(this,function(b,c,d){var e;return m.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?m.css(b,c,g):m.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),m.fn.size=function(){return this.length},m.fn.andSelf=m.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return m});var ed=a.jQuery,fd=a.$;return m.noConflict=function(b){return a.$===m&&(a.$=fd),b&&a.jQuery===m&&(a.jQuery=ed),m},typeof b===K&&(a.jQuery=a.$=m),m});

/*! jQuery Migrate v1.2.1 | (c) 2005, 2013 jQuery Foundation, Inc. and other contributors | jquery.org/license */
jQuery.migrateMute===void 0&&(jQuery.migrateMute=!0),function(e,t,n){function r(n){var r=t.console;i[n]||(i[n]=!0,e.migrateWarnings.push(n),r&&r.warn&&!e.migrateMute&&(r.warn("JQMIGRATE: "+n),e.migrateTrace&&r.trace&&r.trace()))}function a(t,a,i,o){if(Object.defineProperty)try{return Object.defineProperty(t,a,{configurable:!0,enumerable:!0,get:function(){return r(o),i},set:function(e){r(o),i=e}}),n}catch(s){}e._definePropertyBroken=!0,t[a]=i}var i={};e.migrateWarnings=[],!e.migrateMute&&t.console&&t.console.log&&t.console.log("JQMIGRATE: Logging is active"),e.migrateTrace===n&&(e.migrateTrace=!0),e.migrateReset=function(){i={},e.migrateWarnings.length=0},"BackCompat"===document.compatMode&&r("jQuery is not compatible with Quirks Mode");var o=e("<input/>",{size:1}).attr("size")&&e.attrFn,s=e.attr,u=e.attrHooks.value&&e.attrHooks.value.get||function(){return null},c=e.attrHooks.value&&e.attrHooks.value.set||function(){return n},l=/^(?:input|button)$/i,d=/^[238]$/,p=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,f=/^(?:checked|selected)$/i;a(e,"attrFn",o||{},"jQuery.attrFn is deprecated"),e.attr=function(t,a,i,u){var c=a.toLowerCase(),g=t&&t.nodeType;return u&&(4>s.length&&r("jQuery.fn.attr( props, pass ) is deprecated"),t&&!d.test(g)&&(o?a in o:e.isFunction(e.fn[a])))?e(t)[a](i):("type"===a&&i!==n&&l.test(t.nodeName)&&t.parentNode&&r("Can't change the 'type' of an input or button in IE 6/7/8"),!e.attrHooks[c]&&p.test(c)&&(e.attrHooks[c]={get:function(t,r){var a,i=e.prop(t,r);return i===!0||"boolean"!=typeof i&&(a=t.getAttributeNode(r))&&a.nodeValue!==!1?r.toLowerCase():n},set:function(t,n,r){var a;return n===!1?e.removeAttr(t,r):(a=e.propFix[r]||r,a in t&&(t[a]=!0),t.setAttribute(r,r.toLowerCase())),r}},f.test(c)&&r("jQuery.fn.attr('"+c+"') may use property instead of attribute")),s.call(e,t,a,i))},e.attrHooks.value={get:function(e,t){var n=(e.nodeName||"").toLowerCase();return"button"===n?u.apply(this,arguments):("input"!==n&&"option"!==n&&r("jQuery.fn.attr('value') no longer gets properties"),t in e?e.value:null)},set:function(e,t){var a=(e.nodeName||"").toLowerCase();return"button"===a?c.apply(this,arguments):("input"!==a&&"option"!==a&&r("jQuery.fn.attr('value', val) no longer sets properties"),e.value=t,n)}};var g,h,v=e.fn.init,m=e.parseJSON,y=/^([^<]*)(<[\w\W]+>)([^>]*)$/;e.fn.init=function(t,n,a){var i;return t&&"string"==typeof t&&!e.isPlainObject(n)&&(i=y.exec(e.trim(t)))&&i[0]&&("<"!==t.charAt(0)&&r("$(html) HTML strings must start with '<' character"),i[3]&&r("$(html) HTML text after last tag is ignored"),"#"===i[0].charAt(0)&&(r("HTML string cannot start with a '#' character"),e.error("JQMIGRATE: Invalid selector string (XSS)")),n&&n.context&&(n=n.context),e.parseHTML)?v.call(this,e.parseHTML(i[2],n,!0),n,a):v.apply(this,arguments)},e.fn.init.prototype=e.fn,e.parseJSON=function(e){return e||null===e?m.apply(this,arguments):(r("jQuery.parseJSON requires a valid JSON string"),null)},e.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||0>e.indexOf("compatible")&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},e.browser||(g=e.uaMatch(navigator.userAgent),h={},g.browser&&(h[g.browser]=!0,h.version=g.version),h.chrome?h.webkit=!0:h.webkit&&(h.safari=!0),e.browser=h),a(e,"browser",e.browser,"jQuery.browser is deprecated"),e.sub=function(){function t(e,n){return new t.fn.init(e,n)}e.extend(!0,t,this),t.superclass=this,t.fn=t.prototype=this(),t.fn.constructor=t,t.sub=this.sub,t.fn.init=function(r,a){return a&&a instanceof e&&!(a instanceof t)&&(a=t(a)),e.fn.init.call(this,r,a,n)},t.fn.init.prototype=t.fn;var n=t(document);return r("jQuery.sub() is deprecated"),t},e.ajaxSetup({converters:{"text json":e.parseJSON}});var b=e.fn.data;e.fn.data=function(t){var a,i,o=this[0];return!o||"events"!==t||1!==arguments.length||(a=e.data(o,t),i=e._data(o,t),a!==n&&a!==i||i===n)?b.apply(this,arguments):(r("Use of jQuery.fn.data('events') is deprecated"),i)};var j=/\/(java|ecma)script/i,w=e.fn.andSelf||e.fn.addBack;e.fn.andSelf=function(){return r("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"),w.apply(this,arguments)},e.clean||(e.clean=function(t,a,i,o){a=a||document,a=!a.nodeType&&a[0]||a,a=a.ownerDocument||a,r("jQuery.clean() is deprecated");var s,u,c,l,d=[];if(e.merge(d,e.buildFragment(t,a).childNodes),i)for(c=function(e){return!e.type||j.test(e.type)?o?o.push(e.parentNode?e.parentNode.removeChild(e):e):i.appendChild(e):n},s=0;null!=(u=d[s]);s++)e.nodeName(u,"script")&&c(u)||(i.appendChild(u),u.getElementsByTagName!==n&&(l=e.grep(e.merge([],u.getElementsByTagName("script")),c),d.splice.apply(d,[s+1,0].concat(l)),s+=l.length));return d});var Q=e.event.add,x=e.event.remove,k=e.event.trigger,N=e.fn.toggle,T=e.fn.live,M=e.fn.die,S="ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",C=RegExp("\\b(?:"+S+")\\b"),H=/(?:^|\s)hover(\.\S+|)\b/,A=function(t){return"string"!=typeof t||e.event.special.hover?t:(H.test(t)&&r("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"),t&&t.replace(H,"mouseenter$1 mouseleave$1"))};e.event.props&&"attrChange"!==e.event.props[0]&&e.event.props.unshift("attrChange","attrName","relatedNode","srcElement"),e.event.dispatch&&a(e.event,"handle",e.event.dispatch,"jQuery.event.handle is undocumented and deprecated"),e.event.add=function(e,t,n,a,i){e!==document&&C.test(t)&&r("AJAX events should be attached to document: "+t),Q.call(this,e,A(t||""),n,a,i)},e.event.remove=function(e,t,n,r,a){x.call(this,e,A(t)||"",n,r,a)},e.fn.error=function(){var e=Array.prototype.slice.call(arguments,0);return r("jQuery.fn.error() is deprecated"),e.splice(0,0,"error"),arguments.length?this.bind.apply(this,e):(this.triggerHandler.apply(this,e),this)},e.fn.toggle=function(t,n){if(!e.isFunction(t)||!e.isFunction(n))return N.apply(this,arguments);r("jQuery.fn.toggle(handler, handler...) is deprecated");var a=arguments,i=t.guid||e.guid++,o=0,s=function(n){var r=(e._data(this,"lastToggle"+t.guid)||0)%o;return e._data(this,"lastToggle"+t.guid,r+1),n.preventDefault(),a[r].apply(this,arguments)||!1};for(s.guid=i;a.length>o;)a[o++].guid=i;return this.click(s)},e.fn.live=function(t,n,a){return r("jQuery.fn.live() is deprecated"),T?T.apply(this,arguments):(e(this.context).on(t,this.selector,n,a),this)},e.fn.die=function(t,n){return r("jQuery.fn.die() is deprecated"),M?M.apply(this,arguments):(e(this.context).off(t,this.selector||"**",n),this)},e.event.trigger=function(e,t,n,a){return n||C.test(e)||r("Global events are undocumented and deprecated"),k.call(this,e,t,n||document,a)},e.each(S.split("|"),function(t,n){e.event.special[n]={setup:function(){var t=this;return t!==document&&(e.event.add(document,n+"."+e.guid,function(){e.event.trigger(n,null,t,!0)}),e._data(this,n,e.guid++)),!1},teardown:function(){return this!==document&&e.event.remove(document,n+"."+e._data(this,n)),!1}}})}(jQuery,window);
/**
* Resources dictionary, each object accept the following parameters:
*
* - "file": (required) The file name to load
* - "min":  (optional) true if file is already minified and doesn"t required minification, by default will minify
* - "yeah": (optional) Array containing "&" seperated strings for optional platforms/devices to be loaded
* - "nope": (optional) Array containing "&" seperated strings for optional platforms/devices to *not* be loaded
*
*  IMPORTANT
*  =========
*
*  - Unless "yeah" is specified, it's considered as "yeah" for all platforms / devices.
*  - If "yeah" is specified, you are specify an array of items, which can meet the condition, with "or" between arrays, for example:
*	       { "file": "api/drivers/webApp/cameraDriver.js", "yeah": ["webApp&iPhone","simulator"] },
*		   This will make the "cameraDriver.js" to load only if we are in "Webapp iPhone" OR "simulator".
*
*  - In addition, you can have a "nope" section, so if a condition is met by "yeah" it can be cancelled by "nope", for example:
*			{ "file": "app/interface/web/libs/iscroll/iscroll-lite.js", "yeah": ["webApp", "simulator"], "nope": ["webApp&winPhone"] },
*			This will load the "iscroll-lite.js" file for webApp OR simulator, but won't load it for webApps on WP7.
*
*/
var __resources =
/* {RESOURCES_START} */[{"packageName": "main", "type": "css", "name": "appbase.min.css"}, {"packageName": "audio", "type": "css", "name": "audio.min.css"}, {"packageName": "agenda", "type": "css", "name": "agenda.min.css"}, {"packageName": "blog", "type": "css", "name": "blog.min.css"}, {"packageName": "branches", "type": "css", "name": "branches.min.css"}, {"packageName": "users", "type": "css", "name": "users.min.css"}, {"packageName": "poll", "type": "css", "name": "poll.min.css"}, {"packageName": "quiz", "type": "css", "name": "quiz.min.css"}, {"packageName": "contactUs", "type": "css", "name": "contactUs.min.css"}, {"packageName": "donation", "type": "css", "name": "donation.min.css"}, {"packageName": "twitter", "type": "css", "name": "twitter.min.css"}, {"packageName": "video", "type": "css", "name": "video.min.css"}, {"packageName": "externalPage", "type": "css", "name": "externalPage.min.css"}, {"packageName": "facebook", "type": "css", "name": "facebook.min.css"}, {"packageName": "livePerson", "type": "css", "name": "livePerson.min.css"}, {"packageName": "loyaltyCards", "type": "css", "name": "loyaltyCards.min.css"}, {"packageName": "reviews", "type": "css", "name": "reviews.min.css"}, {"packageName": "subscribe", "type": "css", "name": "subscribe.min.css"}, {"packageName": "aboutUs", "type": "css", "name": "aboutUs.min.css"}, {"packageName": "webModule", "type": "css", "name": "webModule.min.css"}, {"packageName": "favorites", "type": "css", "name": "favorites.min.css"}, {"packageName": "events", "type": "css", "name": "events.min.css"}, {"packageName": "form", "type": "css", "name": "form.min.css"}, {"packageName": "links", "type": "css", "name": "links.min.css"}, {"packageName": "menu", "type": "css", "name": "menu.min.css"}, {"packageName": "coupons", "type": "css", "name": "coupons.min.css"}, {"packageName": "reports", "type": "css", "name": "reports.min.css"}, {"packageName": "inbox", "type": "css", "name": "inbox.min.css"}, {"packageName": "myProfile", "type": "css", "name": "myProfile.min.css"}, {"packageName": "collections", "type": "css", "name": "collections.min.css"}, {"packageName": "store", "type": "css", "name": "store.min.css"}, {"packageName": "photos", "type": "css", "name": "photos.min.css"}, {"packageName": "qrscanner", "type": "css", "name": "QRScannerTemplateView.min.css"}, {"packageName": "main", "type": "js", "name": "appbase.min.js"}, {"packageName": "audio", "type": "js", "name": "audio.min.js"}, {"packageName": "agenda", "type": "js", "name": "agenda.min.js"}, {"packageName": "blog", "type": "js", "name": "blog.min.js"}, {"packageName": "branches", "type": "js", "name": "branches.min.js"}, {"packageName": "users", "type": "js", "name": "users.min.js"}, {"packageName": "poll", "type": "js", "name": "poll.min.js"}, {"packageName": "quiz", "type": "js", "name": "quiz.min.js"}, {"packageName": "twitter", "type": "js", "name": "twitter.min.js"}, {"packageName": "photos", "type": "js", "name": "photos.min.js"}, {"packageName": "contactUs", "type": "js", "name": "contactUs.min.js"}, {"packageName": "donation", "type": "js", "name": "donation.min.js"}, {"packageName": "externalPage", "type": "js", "name": "externalPage.min.js"}, {"packageName": "facebook", "type": "js", "name": "facebook.min.js"}, {"packageName": "livePerson", "type": "js", "name": "livePerson.min.js"}, {"packageName": "loyaltyCards", "type": "js", "name": "loyaltyCards.min.js"}, {"packageName": "reviews", "type": "js", "name": "reviews.min.js"}, {"packageName": "menu", "type": "js", "name": "menu.min.js"}, {"packageName": "coupons", "type": "js", "name": "coupons.min.js"}, {"packageName": "subscribe", "type": "js", "name": "subscribe.min.js"}, {"packageName": "video", "type": "js", "name": "video.min.js"}, {"packageName": "map", "type": "js", "name": "map.min.js"}, {"packageName": "aboutUs", "type": "js", "name": "aboutUs.min.js"}, {"packageName": "notForCp", "type": "js", "name": "notForCp.min.js"}, {"packageName": "qrscanner", "type": "js", "name": "QRScannerTemplateView.min.js"}, {"packageName": "staticHtml", "type": "js", "name": "staticHtml.min.js"}, {"packageName": "staticHtml", "type": "js", "name": "staticHtml.min.js"}, {"packageName": "events", "type": "js", "name": "events.min.js"}, {"packageName": "events", "type": "js", "name": "events.min.js"}, {"packageName": "links", "type": "js", "name": "links.min.js"}, {"packageName": "form", "type": "js", "name": "form.min.js"}, {"packageName": "webModule", "type": "js", "name": "webModule.min.js"}, {"packageName": "collections", "type": "js", "name": "collections.min.js"}, {"packageName": "store", "type": "js", "name": "store.min.js"}, {"packageName": "reports", "type": "js", "name": "reports.min.js"}, {"packageName": "myProfile", "type": "js", "name": "myProfile.min.js"}, {"packageName": "inbox", "type": "js", "name": "inbox.min.js"}]/* {RESOURCES_END} */
;

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
//  var documentWrite = '';

    // current "done" callback function
//  var _cbDone = null;

    /**
     * Load a given resource file, by document.write into the HTML.
     *
     * @param {string} file - Relative path of the resource URL to include
     * @param {string} type - ('css', 'js') - The type of resource to load
     * @author Eran Zinman
     */
//  function loadResource(file, type)
//  {
//      if (type === 'js')
//      {
//          documentWrite += '<script type="text/javascript" src="' + file + '"></' + 'script>';
//      }
//      else if (type === 'css')
//      {
//          documentWrite += '<link type="text/css" rel="stylesheet" href="' + file + '">';
//      }
//  }

//  /**
//   * Load a given resource file, by document.write into the HTML.
//   *
//   * @param {string} file - Relative path of the resource URL to include
//   * @param {string} type - ('css', 'js') - The type of resource to load
//   */
//  function loadResource2(file, type, cbDone)
//  {
//      if (type === 'js')
//      {
//            var cbFail = function(a,b,c){
//                cbDone();
//            };
//            $.getScript(file).done(cbDone).fail(cbFail);
//      }
//      else if (type === 'css')
//      {
//            $.get(file, function(){
//                if (document.createStyleSheet)
//                    document.createStyleSheet(file);
//                else
//                    $('<link rel="stylesheet" type="text/css" href="'+file+'" />').appendTo("head");
//                cbDone();
//            });
////            $.ajax({
////                url: file,
////                dataType: 'css',
////                success: function(){
////                    $('<link rel="stylesheet" type="text/css" href="'+file+'" />').appendTo("head");
////                    cbDone();
////                }
////            });
//      }
//  }

    /**
     * Load a given resource file, by document.write into the HTML.
     *
     * @param {string} file - Relative path of the resource URL to include
     * @param {string} type - ('css', 'js') - The type of resource to load
     */
    function loadResource(file, type, cbDone)
    {
	if (type === 'js')
	{
            var script = document.createElement('script'), run = false;
            script.type = 'text/javascript';
            script.src = file;

            script.onload = script.onreadystatechange = function() {
                if (!run && (!this.readyState || this.readyState === 'complete')) {
                    run = true;
                    cbDone && cbDone();
                }
            };
            document.body.appendChild(script);

        }
	else if (type === 'css')
	{
	    $.get(file)
		.done(function(){
		    if (document.createStyleSheet)
			document.createStyleSheet(file);
		    else
			$('<link rel="stylesheet" type="text/css" href="'+file+'" />').appendTo("head");
		})
		.fail(function(jqXhr, status, error){
		    console.log('loadResource : error !!! trying to load file ' + file);
		    console.log('loadResource : error was ' + error);
		    console.log('loadResource : this might be caused due to zero-byte target file - check www dir !');
		})
		.always(function(){
		    cbDone && cbDone();
		});
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

    function getResourcesToLoad(resources, packages)
    {
	var resourcesToLoad = [];

	// Loop through resources
	var i = null;
	for (i in resources)
	{
	    // Get resource and it's type
	    var resource = resources[i];

            // check if we need to load this resource package
            if (!packages[resource.packageName])
                continue;

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
		var name = resource.name;

		// Add minified resource to array
		resourcesToLoad.push({ file: name, type: resourceType });
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
			    var fileResource = resourceObj['file'];
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
     * @param {Object} packages - dictionary of packages e.g.: {"main":true}.
     * @author Eran Zinman
     */
    me.loadResources = function(resources, packages, cbDone)
    {
	// Get resources to load
	var resourcesToLoad = getResourcesToLoad(resources, packages);

	// Loop through resources
        var len = resourcesToLoad.length;
        // i - index in "resourcesToLoad" array.
        var loadNext = function(i){
            if (i >= len)
            {
                cbDone && cbDone();
                return;
            }
            var resource = resourcesToLoad[i];
            loadResource(resource.file, resource.type, function() {
                loadNext(i+1);
            });
        };
        loadNext(0);

//      for (var i = 0; i < len; i++)
//      {
//          var resource = resourcesToLoad[i];
//          loadResource3(resource.file, resource.type, (i === len - 1)? cbDone : null);
//      }

        // Document write to HTML
	//ResourceLoader.flush(cbDone);
    };

    /**
	 * Loads the given resources array.
	 *
	 * @param {int} countToReach - what count the counter should reach
     * @param {Function} countReachedCb - callback to call when count is reached via boundIncreaseCount()
	 * @author Yury Michurin
	 */
    function CallbackCounter(countToReach, countReachedCb) {

        // private
        var currentCount = 0;

        // public
        this.countToReach = countToReach;
        this.countReachedCb = countReachedCb;

        this.boundIncreaseCount = function boundIncreaseCount() {
            currentCount++;
            if (currentCount >= countToReach) {
                if (typeof this.countReachedCb === "function") {
                    this.countReachedCb();
                }
            }
        }.bind(this);

        if (countToReach === 0) {
            countReachedCb && countReachedCb();
        }
    }

    /**
	 * Loads the given resources without waiting between them
	 *
	 * @param {Object} resources - Resources to load array
     * @param {Object} packages - dictionary of packages e.g.: {"main":true}.
	 * @author Eran Zinman
	 */
    me.loadResourcesParallel = function loadResourcesParallel(resources, packages, cbDone) {
        var resourcesToLoad = null,
            resource = null,
            cbCounter = null,
            resourcesToLoadLen = 0,
            i = 0;

        resourcesToLoad = getResourcesToLoad(resources, packages);
        resourcesToLoadLen = resourcesToLoad.length;

        cbCounter = new CallbackCounter(resourcesToLoadLen, cbDone);

        for (i = 0; i < resourcesToLoadLen; i++) {
            resource = resourcesToLoad[i];
            loadResource(resource.file, resource.type, cbCounter.boundIncreaseCount);
        }
    };

//  /**
//   * Loads the given resources array.
//   *
//   * @param {Object} resources - Resources to load array
//   * @param {Object} packages - dictionary of packages e.g.: {"main":true}.
//   */
//  me.loadResources2 = function(resources, packages, cbDone)
//  {
//        // Check if we are in DEBUG / RELEASE modes. Try to fetch
//        // this state from the parent (if executed from a page)
//        var debugMode = false;
//        try
//        {
//            if (typeof window.DEBUG !== 'undefined')
//            {
//                debugMode = window.DEBUG;
//            }
//            else if (typeof parent.DEBUG !== 'undefined')
//            {
//                debugMode = parent.DEBUG;
//            }
//        }
//        catch (e)
//        {
//            // Prevent exception when unable to access parent
//        }
//
//        // i - index in "resources" array.
//        // j - index in "files" array (in item inside resources, in case of "debug").
//        var loadNext = function(i, j){
////            console.log('i = '+ i +' j = ' + j);
//            if (i >= resources.length)
//            {
//                cbDone && cbDone();
//                return;
//            }
//            var resource = resources[i];
//            if (!packages[resource.packageName])
//            {
//                loadNext(i+1, 0);
//                return;
//            }
//            var resourceType = resource.type;
//            // In release, load minified file
//            if (!debugMode)
//            {
//                loadResource3(resource.name, resourceType, function() {
//                    loadNext(i+1);
//                });
//                return;
//            }
//            var files = resource.files;
//            if (j >= files.length)
//            {
//                loadNext(i+1, 0);
//                return;
//            }
//            var resourceObj = files[j];
//            if (me.isValidResource(resourceObj))
//            {
//                // Add minified resource to array
//                var fileResource = resourceObj['file'];
//                loadResource3(fileResource, resourceType, function() {
//                    loadNext(i, j+1);
//                });
//            }
//            else
//            {
//                loadNext(i, j+1);
//            }
//        };
//        loadNext(0, 0);
//
//  };

    /**
     * Will make actual write to HTML, to load all the required
     * resources
     *
     * @author Eran Zinman
     */
//  me.flush = function(cbDone)
//  {
//        if (cbDone)
//        {
//            _cbDone = cbDone;
////            ResourceLoader.doneLoading();
//        }
//        else
//        {
//          // Write document write buffer to document
//            document.write(documentWrite);
//        }
//
//      // Clear document write buffer
//      documentWrite = '';
//  };


//  /**
//   * TBD
//   */
//  me.doneLoading = function()
//  {
//      _cbDone && _cbDone();
//        _cbDone = null;
//  };

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
        ResourceLoader.loadResources(window.__resources, {"main":true});
//        ResourceLoader.loadResources2(window.__resources, {"main":true});
    }

    // Document write to HTML
//  ResourceLoader.flush();
})();




var loyaltyCardsEnums = {

    /* what is the state of the stamp action on the card? */
    verificationState: {
        NORMAL: "NORMAL" // no attempt to punch
        ,SUCCESS: "SUCCESS" // successfully punch was finished
        ,VERIFYING: "LOADING" // attempting to punch is in progress...
        ,SERVER_FAIL: "SERVER_FAIL" // attempt to punch was failed to due server error
        ,INVALID_CODE: "INVALID_CODE" // attempt to punch was failed to due invalid code
    }

    /* what is the type of the slot (punch area) */
    ,slotType: {
        NORMAL: "punch" // no freebie at this slot, only punch in the way to get the freebie...
        ,MID_FREEBIE: "mid-freebie" // freebie, but not the final one
        ,FREEBIE: "freebie" // the last freebie ( = final prize)
    }

    /* what is the type of the slot icon (=which color-class to use?) */
    ,slotColorType: {
        NORMAL: "normal" // use the color: clr_punch_finalSlot
        ,WATERMARK: "watermark" // use the color: clr_punch_punchSlot
    }

    /* what is the type of the stamp dialog (before punch) */
    ,stampLayoutType: {
        NORMAL: "punch" // just stamp
        ,GET_FREE: "get-a-free" // small congrats message, e.g.: for mid-freebie
        ,CONGRATS: "punch-congrats" // large congrats message, e.g.: for final-freebie
    }

    /* what should do in stamp dialog (after successfully punch) */
    ,afterPunchType: {
        CLOSE: "close" // close the stamp dialog
        ,CONGRATS: "congrats" // congrats message + share etc., e.g.: for final-freebie
    }

    /* special text on the slot */
    ,slotTextType: {
        NUMBERING: "$auto" // show the number of the slot
    }
};

//what is the default slotColorType,stampLayoutType,afterPunchType for slotType
var loyaltyCardsMaps = {
    slotColorType:{}
    ,stampLayoutType:{}
    ,afterPunchType:{}
};
loyaltyCardsMaps.slotColorType[loyaltyCardsEnums.slotType.NORMAL] = loyaltyCardsEnums.slotColorType.WATERMARK;
loyaltyCardsMaps.slotColorType[loyaltyCardsEnums.slotType.MID_FREEBIE] = loyaltyCardsEnums.slotColorType.WATERMARK;
loyaltyCardsMaps.slotColorType[loyaltyCardsEnums.slotType.FREEBIE] = loyaltyCardsEnums.slotColorType.NORMAL;

loyaltyCardsMaps.stampLayoutType[loyaltyCardsEnums.slotType.NORMAL] = loyaltyCardsEnums.stampLayoutType.NORMAL;
loyaltyCardsMaps.stampLayoutType[loyaltyCardsEnums.slotType.MID_FREEBIE] = loyaltyCardsEnums.stampLayoutType.GET_FREE;
loyaltyCardsMaps.stampLayoutType[loyaltyCardsEnums.slotType.FREEBIE] = loyaltyCardsEnums.stampLayoutType.CONGRATS;

loyaltyCardsMaps.afterPunchType[loyaltyCardsEnums.slotType.NORMAL] = loyaltyCardsEnums.afterPunchType.CLOSE;
loyaltyCardsMaps.afterPunchType[loyaltyCardsEnums.slotType.MID_FREEBIE] = loyaltyCardsEnums.afterPunchType.CLOSE;
loyaltyCardsMaps.afterPunchType[loyaltyCardsEnums.slotType.FREEBIE] = loyaltyCardsEnums.afterPunchType.CONGRATS;
 /*******************
 * loyaltyCards list model
 ********************/
var LoyaltyCardsModel = ItemsModel.extend({
    createItemsCollection: function () {
        var params = this.get('params');
        var itemsCollection = new LoyaltyCardsCollection(null, params);
//        itemsCollection.bind('onShowMore', this._onShowMore, this);

        return itemsCollection;
    }

//    /**
//     * Bubble it...
//     */
//    _onShowMore: function (itemModel)
//    {
//        this.trigger('onShowMore', itemModel);
//    }
}); var LoyaltyCardModel = ItemModel.extend({

    initialize: function () {
        // NOTE:  we don't use the "defaults" for 3 reasons:
        //  1) we want "deep extend" for json fields.
        //  2) we want to use "_T()", and we can't do this before loading the translation
        //  3) (not important...) if we have the defaults here, we don't need to run this code if there is no loyalty card etc.
        var defaults = {
            id: null, // mandatory
            title: "", // not HTML
            offerTitle: "", // e.g.: "9+1"
            upperTitle: "{$HtmlTextLoyaltyCardsTitleOffer}",
            isHidden: false,// if the card is "hidden" we will show in client only if is has stamps
            isExpired: false,
            isComingSoon: false,
            /* icon objects to be referenced later */
            icons: {
                /* default - mandatory */
                "default": {
                    whole: null,
                    punched: null
                }
            },
            images: {
                header: null,
                background: null
            },
            disclaimer: "", // not HTML
            description: "", // HTML
            validity: {
                validFrom: null, /* timestamp - before this timestamp card will be disabled ("coming soon")
                 null = since forever */
                validUntil: null /* timestamp - after this timestamp, unused card will disappear used card will be disabled ("expired")
                 null = until forever */
            },
            totalSlots: 0, /* mandatory. total circles to draw */
            limits: {
                punchesPerDay: 3, /* maximum 3 allowed punches per same calender day. 0 = no limit */
                codeAttempts: 5, /* 5 invalid codes blocks the user out for codeAttemptsCoolDown mSec. 0 = no limit */
                codeAttemptsCoolDown: 86400000 /* block user for # of mSec (e.g.: 24 hours = 24*60*60*1000 = 86400000) before allowing another code to be attempted */
            },

            defaults:
            {
                icon: 'default',
                freebieName: _T("HtmlTextLoyaltyCardsDefaultFreebieName"), // ='freebie'
                punchLayout: null, // loyaltyCardsEnums.stampLayoutType
                afterPunchLayout: null, // loyaltyCardsEnums.afterPunchType
                style: null, // loyaltyCardsEnums.slotColorType
                slotType: loyaltyCardsEnums.slotType.NORMAL,
                punchText: loyaltyCardsEnums.slotTextType.NUMBERING, // null/'' = empty, '$auto' = automatic number, other string = use the string
                afterPunchText: loyaltyCardsEnums.slotTextType.NUMBERING // null/'' = empty, '$auto' = automatic number, other string = use the string
            },
            defaultOverrides : {},
            overrides: [],

            userData:
            {
                currentPunches: 0,
                lastPunchDate: null, // the date ("dd-mm-yyyy") of last punch. if it is today, in punchesToday will be the amount of punches today
                punchesToday: 0,
                currentCodeAttempts: 0, // how many wrong codes the user typed? we set it back to 0 after successfully code (TODO: also after block? now we continue, and check with "%" )
                blockUntil: 0 // the card is block (cool down after too many wrong codes) until this time stamp (mSec from 1970)
            },
            verificationState: loyaltyCardsEnums.verificationState.NORMAL,
            slots: [] //the slots array. every item has icon, slotType, etc.
        };

        // deep extend the fields with the defaults values:
        var modelData = this.toJSON();
        $.extend(true, defaults, modelData);

        // temporary (=until will be supported) add alias
        defaults.alias = Utils.Html.fixAlias(defaults.alias || defaults.id, true, defaults.id);

        this.set(defaults);


        // add the user data (e.g.: current # of punches of this user) to the model from the storage:
        this._updateUserDataFromStorage();

        var validity = this.get('validity');
        if (validity)
        {
            var now = (new Date().getTime() / 1000);
            // add "is expired"
            var isExpired = (validity.validUntil && validity.validUntil < now );
            // add "is coming soon"
            var isComingSoon = (validity.validFrom && validity.validFrom > now );
            this.set({isExpired: isExpired, isComingSoon: isComingSoon});
        }

        // create the "slots" array:
        this._updateSlots();
    },

    // add/update the "slots" array according to all data:
    _updateSlots: function () {
        //override slots defaults:
        var defaultOverrides = this.get('defaultOverrides');
        var defaults = this.get('defaults');
        $.extend(defaults, defaultOverrides);

        var slots = [];
        var punchCount = this.get('userData').currentPunches;
        var slotsCount = this.get('totalSlots');
        var icons = this.get('icons');
        var overrides = this.get('overrides');
        var overridesCount = overrides.length;
        for (var i = 0; i < slotsCount; i++)
        {
            var slot = $.extend({}, defaults);
            for (var j = 0; j < overridesCount; j++)
            {
                var override = overrides[j];
                if ($.inArray(i+1, override.at) > -1)
                {
                    $.extend(slot, override);
                }
            }

            // find the icon & text
            var icon = icons[slot.icon];
            slot.punched = i < punchCount;
//            slot.text = '';
            if (slot.punched)
            {
                slot.icon = icon.punched;
                if (slot.afterPunchText === loyaltyCardsEnums.slotTextType.NUMBERING)
                {
                    slot.text = '' + (i+1);
                }
                else
                {
                    slot.text = slot.afterPunchText;
                }
            }
            else
            {
                slot.icon = icon.whole;
                if (slot.punchText === loyaltyCardsEnums.slotTextType.NUMBERING)
                {
                    slot.text = '' + (i+1);
                }
                else
                {
                    slot.text = slot.punchText;
                }
            }

            slots[i] = slot;
        }

        this.set({slots: slots});
    },

    getLastSlot: function() {
        var slotsCount = this.get('totalSlots'),
            slots = this.get('slots');

        return slots[slotsCount - 1];
    },

    // return the active slot
    getActiveSlot: function () {
        var slotIndex = this.get('userData').currentPunches;
        if (this.get('verificationState') === loyaltyCardsEnums.verificationState.SUCCESS)
        {
            // we are still "talking" about the punched slot...
            slotIndex--;
        }

        return this.get('slots')[slotIndex];
    },

    // add the user data (e.g.: current # of punches of this user) to the model from the storage:
    _updateUserDataFromStorage: function () {
        // we don't want storage in CP:
        if (PLATFORM === platformEnum.simulator)
        {
            return;
        }

        var cachedItem = storageDriver.getItem(null, null, this.get('id'), true);
        if (cachedItem) {
            // Parse cached item
            var userData = JSON.parse(cachedItem);

            this.set({userData: userData});

            // if # of punched is bigger than / equal to # of slots (e.g.: invalid change in CP, or the user close the app after success, without closing the dialog)
            // we will init the card = set the currentPunches to 0
            if(userData.currentPunches >= this.get('totalSlots'))
            {
                userData.currentPunches = 0;
                // TODO: do we want to write log/ show toast/ etc.
                this._updateStorageFromUserData();
            }
        }
    },

    // update the storage (e.g.: current # of punches of this user) from userData.
    _updateStorageFromUserData: function () {
        // we don't want storage in CP:
        if (PLATFORM === platformEnum.simulator)
        {
            return;
        }

        // Stringify cached object
        var cachedItem = JSON.stringify(this.get('userData'));
        storageDriver.setItem(null, null, this.get('id'), cachedItem, true);
    },

    // internal function to init the dialog state:
    initStampDialogState: function () {
        // if # of punched is bigger than / equal to # of slots (e.g.: probably close the dialog after last punch)
        // we will init the card = set the currentPunches to 0
        var userData = this.get('userData');
        if(userData.currentPunches >= this.get('totalSlots'))
        {
            userData.currentPunches = 0;

            // update the "slots" array:
            this._updateSlots();

            // TODO: do we want to write log/ show toast/ etc.
            this._updateStorageFromUserData();
        }

        this.set({verificationState: loyaltyCardsEnums.verificationState.NORMAL});
    },

    // will cause to the view to close the dialog, and change the "verificationState" to normal:
    closeStampDialog: function () {
        this.initStampDialogState(); // NOTE: maybe we don't need this here, because we call this in "openStampDialog"
        this.trigger('onDialogClose', this);
    },

    // will cause to the view to open the dialog, and change the "verificationState" to normal:
    openStampDialog: function () {
        this.initStampDialogState(); // we need it here (and not in "closeStampDialog"). MOBILE-1581
        this.trigger('onDialogOpen', this);
    },

    /** try to punch the card
     *
     * @param (String) code - the stamp code.
     */
    punch: function (code) {
        //if we are already in progress, return:
        if (this.get('verificationState') === loyaltyCardsEnums.verificationState.VERIFYING)
        {
            console.log('in progress...');
            return;
        }

        //set the state to "loading"
        this.set({verificationState: loyaltyCardsEnums.verificationState.VERIFYING});

        // track in analytics.
        var slot = this.getActiveSlot();
        var userData = this.get('userData');
        this.usageData = {
            status: analytics.actionStatus.Start,
            slotType: slot.slotType,
            cardId: this.get('id'),
            slotIndex: userData.currentPunches,
            slotsCount: this.get('totalSlots')
        };
        UsageManager.addEvent(analytics.usageEventTypeEnum.CardPunched, this.usageData);


        this._executeService(code);
    },

    // try to punch the card
    _executeService: function (code) {
//        var slot = this.getActiveSlot();

        var params = {
                cardId: this.get("id")
            },
            options = {
                executeType: executeTypeEnum.FORCE_NETWORK,
                postParams: {code: code}
            };

        Services.executeService('CONTENTHOST_LOYALTYCARDS_VALIDATE_POST', params, this._onServiceSuccess.hitch(this), this._onServiceFail.hitch(this), options);
    },

    // failed to get response from "punch card" service
    _onServiceFail: function (response) {
        if (this.get('verificationState') !== loyaltyCardsEnums.verificationState.VERIFYING)
        {
            // the user probably canceled the stamp request, so we ignore this...
            //TODO: another thing? e.g.: message/usage/etc.
            return;
        }
        this.set({verificationState: loyaltyCardsEnums.verificationState.SERVER_FAIL});

        // track in analytics.
        this.usageData.status = analytics.actionStatus.Fail;
        UsageManager.addEvent(analytics.usageEventTypeEnum.CardPunched, this.usageData);

    },

    // response from "punch card" service
    _onServiceSuccess: function (response) {
        if (this.get('verificationState') !== loyaltyCardsEnums.verificationState.VERIFYING)
        {
            // the user probably canceled the stamp request, so we ignore this...
            //TODO: another thing? e.g.: message/usage/etc.
            return;
        }
        var userData = this.get('userData');
        //code is valid
        if (response)
        {
            userData.currentCodeAttempts = 0;

            // increase the "PunchesToday":
            this.getPunchesToday(true);

            // track in analytics.
            this.usageData.status = analytics.actionStatus.Success;
            UsageManager.addEvent( analytics.usageEventTypeEnum.CardPunched, this.usageData);

            userData.currentPunches++;

            this.set({verificationState: loyaltyCardsEnums.verificationState.SUCCESS});

            // update the "slots" array:
            this._updateSlots();
        }
        //code is invalid
        else
        {
            userData.currentCodeAttempts++;
            var limits = this.get('limits');
            if (limits && (userData.currentCodeAttempts % limits.codeAttempts) === 0)
            {
                var now = new Date().getTime();
                userData.blockUntil = now + limits.codeAttemptsCoolDown;

            }

            this.set({verificationState: loyaltyCardsEnums.verificationState.INVALID_CODE});

            // track in analytics.
            this.usageData.status = analytics.actionStatus.Fail;
            UsageManager.addEvent(analytics.usageEventTypeEnum.CardPunched, this.usageData);
        }

        this._updateStorageFromUserData();
    },


    /**
     * get how many punches today (+ ability to increase it => "punch" today)
     * @param {boolean} punch - do we want also to punch (+ update the "punchesToday" and "lastPunchDate")
     * @return {integer} punchesToday - how many punches were today
     */
    getPunchesToday: function (punch) {
        var userData = this.get('userData');
        var nowDate = new Date().format("dd-mm-yyyy");

        if (userData.lastPunchDate !== nowDate)
        {
            userData.punchesToday = 0;
        }

        if (punch)
        {
            userData.punchesToday++;
            userData.lastPunchDate = nowDate;
        }

        return userData.punchesToday;
    },

    /**
     * Create and return share info object
     *
     * @return shareInfo - object containing the share info
     *
     * @author Matanya
     */
    getShareInfo: function () {
        //TODO: Do we want to get data from socialInfo?
        var shareInfo = $.extend({}, this.get('socialInfo'));

        //add app link if we need:
        if (typeof(shareInfo.url) === "undefined" || shareInfo.url === "$APP_LINK") {
            var appLink = AppManager.app().get('appLink');
            shareInfo.url = (appLink) ? appLink : "";
        }

        var appName = AppManager.app().get('appLabel');

        var slot = this.getLastSlot();
        var params =
        {
            appName: appName,
            cardName: this.get('title'),
            freebieName: slot.freebieName
        };

        // NOTE: we have 2 share buttons: 1 on card, and 1 on "success dialog".
        // we use different texts in case of "after win"
        if (this.get('verificationState') === loyaltyCardsEnums.verificationState.SUCCESS)
        {
            // title for facebook (= we use different texts for email and twitter):
            shareInfo.title = shareInfo.title || _T('HtmlTextLoyaltyCardsShareWinTitle', params);

            // title for twitter:
            shareInfo.twitterTitle = shareInfo.twitterTitle || _T('HtmlTextLoyaltyCardsShareWinTwitterTitle', params);

            // we have different texts for email:
            shareInfo.emailTitle = shareInfo.emailTitle || _T('HtmlTextLoyaltyCardsShareWinEmailTitle', params);
            shareInfo.emailDesc = shareInfo.emailDesc || _T('HtmlTextLoyaltyCardsShareWinEmailText', params);
        }
        else
        {
            // title for facebook (= we use different texts for email and twitter):
            shareInfo.title = shareInfo.title || _T('HtmlTextLoyaltyCardsShareTitle', params);

            // title for twitter:
            shareInfo.twitterTitle = shareInfo.twitterTitle || _T('HtmlTextLoyaltyCardsShareTwitterTitle', params);

            // we have different texts for email:
            shareInfo.emailTitle = shareInfo.emailTitle || _T('HtmlTextLoyaltyCardsShareEmailTitle', params);
            shareInfo.emailDesc = shareInfo.emailDesc || _T('HtmlTextLoyaltyCardsShareEmailText', params);
        }
        return shareInfo;
    }

}); var LoyaltyCardsCollection = ItemsCollection.extend({
    model: LoyaltyCardModel,

    initialize: function (models, params) {
        ItemsCollection.prototype.initialize.apply(this); // "inherit" ("Super"):
        if (!params.listId || !params.type)
            this.invalid = true;

        this.params = params;
    },

    getServiceName: function () {
        return 'CMS_LOYALTYCARDS_GET';
    },

    parse: function (result) {
        var models = $.map(result.items, function(item, i){

            // remove cards without id:
            if (!item.id)
                return null;

            // the model calc the "isExpired", "isComingSoon" and "userData"
            var model = new LoyaltyCardModel(item);

            if(TEST_LOYALTY)
            {
                return model;//TEST!!!!!
            }

            // remove hidden and expired cards - only if the card is not in used (=not stamped):
            if (!model.get('userData').currentPunches && (model.get('isExpired') || model.get('isComingSoon') || model.get('isHidden')))
                return null;

            return model;
        });
        return {models: models};
//        var now = (new Date().getTime() / 1000);
//        var models = $.map(result.items, function(item, i){
//
//            // remove cards without id:
//            if (!item.id)
//                return null;
//
//            //TODO: maybe all the "currentPunches", "isExpired" calculations need to be in the card model,
//            //  (and here we need to create the model), and in this way, we can do set and get storage at
//            //  the same module?
//
//            // add the current # of punches of this user:
//            item.currentPunches = storageDriver.getItem(null, null, item.id) || 0;
//
//            // add "is expired"
//            item.isExpired = (item.validity && item.validity.validUntil && item.validity.validUntil < now );
//
//            // add "is coming soon"
//            item.isComingSoon = (item.validity && item.validity.validFrom && item.validity.validFrom > now );
//
//            // remove hidden and expired cards - only if the card is not in used (=not stamped):
//            if (!item.currentPunches && (item.isExpired || item.isComingSoon || item.isHidden));
//                return null;
//
//            return item;
//        });
//        return {models: models};
    },

    getParams: function () {
        return this.params;
    }
}); /**
 * loyaltyCards template.
 */
var LoyaltyCardsTemplateView = TemplateView.extend({

    /**
     * OVERRIDE - render level 1 - tab:
     */
    _renderTab : function(index, navRequest)
    {
        var meta = this.model.get('meta');
        // check if this feature is blocked for webApps
        var defaultOnlyForNative = true;
        if(TEST_LOYALTY)
        {
            defaultOnlyForNative = false;
        }
        var onlyForNative = (typeof(meta.onlyForNative) === 'undefined')? defaultOnlyForNative : meta.onlyForNative;
        if (PLATFORM == platformEnum.webApp && onlyForNative) {
            // show the "this feature is only for native" page:
            var id =  Utils.Helpers.generateGUID();
            var genericPageModel = ErrPagesManager.getErrPage(errorPages.errorPagesTypes.block, this.model.getArrContext());

            var blockWebView = new GenericPageView({model: genericPageModel, id: id});
            this.$el.append(blockWebView.render().el);

            UN.onPageReady(id, navRequest, 1);
            return;
        }

        // create the model of the tab.
        var model = new LoyaltyCardsModel(meta.items[index]);

        model.set({ layoutId: meta.pageLayout });

        var view = new LoyaltyCardsListView({
            model: model
        });

        this.renderListPage({navRequest: navRequest, model: model, view: view, dividedScreenOptions: {minWidth: '320px'}});
    },

    /**
     * OVERRIDE - handle "lonely item"
     */
    getDefaultItemAlias: function (data)
    {
        var itemsCollection = data.model.get('items');
        if (itemsCollection.length === 1 || (itemsCollection.length && data.dividedScreen))
        {
            var itemModel = itemsCollection.at(0);
            return itemModel.get('alias');
        }
        return null;
    },

    /**
     * OVERRIDE.
     */
    getDetailsView: function (model)
    {
        return new LoyaltyCardDetailsPageView({
            model: model
        });
    }

}); var LoyaltyCardsListView = ItemsView.extend({

    initialize: function ()
    {
        this.$el.attr(
            {
                'data-role': 'page',
                'data-buttons': 'refresh'
            });

        this.$el.html(loyaltyCardsTemplates.scroller_tpl());

        // initialize the scrolling.
        Scrolling.init(this.$('.scroll_wrapper'));
        this.$scroller = this.$('.scroller');

        this.$el.bind('refresh', this.handleRefreshClick.hitch(this));
        this.$el.bind('silentRefresh', this.handleSilentRefresh.hitch(this));

        ItemsView.prototype.initialize.apply(this);
    },

    getRootView: function () {
        return this.$scroller;
    },

    createItemView: function (model) {
        return new LoyaltyCardItemView({
            model: model,
            layoutType: this.model.get('layoutId')
        });
    }
}); /**
 * item inside the list.
 */
var LoyaltyCardItemView = Backbone.View.extend({
    className: 'LoyaltyCardItemView feed_bubble_item',
//    className: 'item_container',

    tagName: 'li',

    events: {
        "tap": "itemClicked"
    },

    initialize: function () {
        // bind on change:selected for highlight it on iPad:
        this.model.bind('change:selected', this.onSelectedChange, this);
    },

    render: function () {
        var params = this.model.toJSON();
        this.$el.html(loyaltyCardsTemplates.list_item_tpl(params));
        var $item_container = this.$('.item_container');
        var isExpired = this.model.get('isExpired');
        var isComingSoon = this.model.get('isComingSoon');
        // if loyaltyCard is expired
        if (isExpired || isComingSoon) {
            var params = {
                loyaltyCardExpired: _T(isExpired?'HtmlTextLoyaltyCardsExpired':'HtmlTextLoyaltyCardsComingSoon')
            };
            this.$el.append(loyaltyCardsTemplates.loyaltyCardExpired(params));
            $item_container.addClass('expired');
        }

        var description = this.model.get('description');
        if (description)
        {
            var $containerElement = this.$('.description');
            // Render HTML into container using HTML container control
            var htmlContainer = new HtmlContainerControl();
            htmlContainer.renderHtml($containerElement, description, {changeColors: false});
        }

        var validFrom = this.model.get('validity').validFrom;
        var validUntil = this.model.get('validity').validUntil;

        if (/*this.options.isGrid ||*/ validFrom || validUntil) {
            var params = {
                startStr: "",
                endStr: "",
                formattedValidFrom: "",
                formattedValidUntil: ""
            };

            if (validFrom) {
                params.formattedValidFrom = new Date(validFrom * 1000).format("shortDate");
                params.startStr = _T('HtmlTextLoyaltyCardsValidFrom');
            }
            if (validUntil) {
                params.formattedValidUntil = new Date(validUntil * 1000).format("shortDate");
                params.endStr = _T('HtmlTextLoyaltyCardsValidUntil');
            }
            $item_container.append(loyaltyCardsTemplates.listItemDates(params));
        }
        return this;
    },

    onSelectedChange: function () {
        if (LAYOUT === layoutFormat.wide) {
            // NOTE: we do the selected (and the color) on the cuild and not on me, because we want to
            // show the "opacity = 0.7" on expired item
            if (this.model.get('selected')) {
                this.$el.children().addClass('selected');
            }
            else {
                this.$el.children().removeClass('selected');
            }
        }
    },

    itemClicked: function (e) {
        e.preventDefault();
        UN.navTo(this.model.get('alias'), {level:2, isInner: (LAYOUT === layoutFormat.narrow)});
    }
}); var LoyaltyCardDetailsPageView = Backbone.View.extend({
    className: 'LoyaltyCardDetailsPageView'

    ,initialize: function ()
    {
        this.$el.attr(
            {
                'data-role': 'page'
            });

        this.model.bind('onDialogClose', this.backFlip, this);
        this.model.bind('onInfoClose', this.backFlip, this);
        this.model.bind('onInfoOpen', this.changeToInfoView, this);
        this.model.bind('onDialogOpen', this.changeToDialogView, this);
    }

    ,render: function()
    {
        var params = this.model.toJSON();
        //NOTE: use different template for iPad:
//        var template = (LAYOUT === layoutFormat.wide)? loyaltyCardsTemplates.wideCardContainer : loyaltyCardsTemplates.narrowCardContainer;
        var template = loyaltyCardsTemplates.pageCardContainer;
		this.$el.html(template(params));
        this.$scroll_wrapper = this.$('.scroll_wrapper');

		// initialize the scrolling.
        Scrolling.init(this.$scroll_wrapper);

        // show the card view in the container:
        this.showCardView();

        return this;
    }

    /** flip the card to its back side
     */
    ,flip: function()
    {
        this.animate({transition: "flip", reverse: IS_RTL})
    }
    /** flip back the card to its front side
     */
    ,backFlip: function()
    {
        this.animate({transition: "flip", reverse: !IS_RTL})
    }
    /** change between the inactive and active view with animation.
     * @param {dictionary} options - the animation options can include:
     *  transition {string} - the transition name
     *  reverse {boolean} - do we want to do it reverse?
     */
    ,animate: function(options)
    {
        var defaults = {
            transition: 'none',
            reverse: false
        };

        var settings = $.extend( {}, defaults, options );

        var name = settings.transition;
        var reverseClass = settings.reverse ? " reverse" : "";
        // NOTE: we don't want to do:
//          var viewportClass = "ui-mobile-viewport-transitioning viewport-" + name;
        // because "ui-mobile-viewport-transitioning" do "height:100%; overflow:hidden;", and this can hide part
        // of the card (if the card is longer than the scroller)
        // NOTE2: we even don't do:
        //var viewportClass = "viewport-" + name;
        // because it makes the flip very bad in android (even in desktop if DEVICE = deviceTypeEnum.android)
        // so, we remove all the viewport classes


        var $from = this.$('.active.animationContainer');
        var $to = this.$('.inactive.animationContainer');

        $from.removeClass('active');
        $to.removeClass('inactive');

        var that = this;
        var doneFunc = function()
        {
            $from.addClass('inactive');
            $to.addClass('active');

            // update the scrolling.
            Scrolling.onContentChanged(that.$scroll_wrapper);

            //TODO: do we want this?
//            //scroll to top:
//            setTimeout(function(){
//                Scrolling.scrollTo(that.$scroll_wrapper, 0, 300);
//            }.hitch(this), 1);
        };

        var webkitDoneFunc = function()
        {
            $to.add( $from ).removeClass( "animation out in reverse " + name );

            //$to.parent().removeClass( viewportClass );

            // Call the "base" done func:
            doneFunc();
        };

        var webkitAnimation =  //false &&
            (
                ( name !== "none" ) &&
                ( $.support.cssTransitions )
            );

        if( webkitAnimation )

        {
            $to.one('webkitAnimationEnd', webkitDoneFunc );

            //$to.parent().addClass( viewportClass );

            $to.add( $from ).addClass(name + " animation" + reverseClass );

            $from.addClass("out");
            $to.addClass("in");
        }
        else
        {
            doneFunc();
        }

    }

    // show the LoyaltyCardsCardView in the active (=front) side:
    ,showCardView: function()
    {
        var itemView = new LoyaltyCardsCardView({
            model:this.model
        });
        var $cardContainer = this.$('.active .cardContainer');
        $cardContainer.html(itemView.render().el);

        // update the scrolling.
        Scrolling.onContentChanged(this.$scroll_wrapper);
    }

    // set the LoyaltyCardsStampView in the inactive (=back) side of the card, and flip the card to show it:
    ,changeToDialogView: function()
    {
        var itemView = new LoyaltyCardsStampView({
            model:this.model
        });

        var $cardContainer = this.$('.inactive .cardContainer');
        $cardContainer.html(itemView.render().el);
        this.flip();
    }
    // set the LoyaltyCardInfoView in the inactive (=back) side of the card, and flip the card to show it:
    ,changeToInfoView: function()
    {
        var itemView = new LoyaltyCardInfoView({
            model:this.model
        });

        var $cardContainer = this.$('.inactive .cardContainer');
        $cardContainer.html(itemView.render().el);
        this.flip();
    }
}); var LoyaltyCardInfoView = Backbone.View.extend({
    className: 'LoyaltyCardInfoView',

    render: function()
    {
        var params = this.model.toJSON();
        params.infoTitle = _T("HtmlTextLoyaltyCardsInfoTitle");
        params.validFrom = null;
        params.validUntil = null;
        var validity = this.model.get('validity');
        if (validity.validFrom || validity.validUntil)
        {
            params.validityTitle = _T("HtmlTextLoyaltyCardsValidityTitle");
            if (validity.validFrom)
            {
                params.validFrom = new Date(validity.validFrom * 1000).format("shortDate");
                params.validFromTitle = _T('HtmlTextLoyaltyCardsValidFrom');
            }
            if (validity.validUntil)
            {
                params.validUntil = new Date(validity.validUntil * 1000).format("shortDate");
                params.validUntilTitle = _T('HtmlTextLoyaltyCardsValidUntil');
            }
        }
        params.cancel = _T("HtmlTextLoyaltyCardsInfoButtonCancel");
        this.$el.append(loyaltyCardsTemplates.info_tpl(params));

        this.$cancelButton = this.$('.cancelButton');
        //bind events:
        // TODO: maybe in the "events" of the view?
        this.$cancelButton.tap(this.cancelButtonClick.hitch(this));

//        var description = this.model.get('description');
//        if (description)
//        {
//            var $containerElement = this.$('.description');
//            // Render HTML into container using HTML container control
//            var htmlContainer = new HtmlContainerControl();
//            htmlContainer.renderHtml($containerElement, description, {changeColors: false});// TODO: maybe changeColors:false, but with color class?
//        }

        // update the scroller after loading the images. Also, delete the image in error
        this.$('IMG').load(function () {
                // Call refresh scroll callback
                this.$scrollWrapper = this.$scrollWrapper || Scrolling.getMyScrollerWrapper(this.$el);
                Scrolling.onContentChanged(this.$scrollWrapper);
            }.hitch(this)).error(function () {
                $(this).remove();
            });

        return this;
    },

    cancelButtonClick: function(e)
    {
        e.preventDefault();

        this.model.trigger('onInfoClose', this.model);

        return false;
    }

}); var LoyaltyCardsCardView = Backbone.View.extend({
    className: 'LoyaltyCardsCardView',

    render: function()
    {
        var params = this.model.toJSON();

        this.$el.append(loyaltyCardsTemplates.loyaltyCard(params));
        var isExpired = this.model.get('isExpired');
        var isComingSoon = this.model.get('isComingSoon');
        // if loyaltyCard is expired
        if (isExpired || isComingSoon) {
            var params = {
                loyaltyCardExpired: _T(isExpired?'HtmlTextLoyaltyCardsExpired':'HtmlTextLoyaltyCardsComingSoon')
            };
            this.$el.append(loyaltyCardsTemplates.loyaltyCardExpired(params));
            var $item_container = this.$('.item_container');
            $item_container.addClass('expired');
        }

        var description = this.model.get('description');
        if (description)
        {
            var $containerElement = this.$('.description');
            // Render HTML into container using HTML container control
            var htmlContainer = new HtmlContainerControl();
            htmlContainer.renderHtml($containerElement, description, {changeColors: false});
        }

        this.$cardContainer = this.$('.card_container');
        //bind events:
        // TODO: maybe in the "events" of the view?
        this.$cardContainer.tap(this.punchCardClick.hitch(this));
        this.model.bind('change:slots', this.renderCard, this);

        this.addButtons();
        this.renderCard();

        // update the scroller after loading the images. Also, delete the image in error
        this.$('IMG').load(function () {
            // Call refresh scroll callback
            this.$scrollWrapper = this.$scrollWrapper || Scrolling.getMyScrollerWrapper(this.$el);
            Scrolling.onContentChanged(this.$scrollWrapper);
        }.hitch(this)).error(function () {
            $(this).remove();
        });

        return this;
    },

    punchCardClick: function(e)
    {
        e.preventDefault();

        var isExpired = this.model.get('isExpired');
        var isComingSoon = this.model.get('isComingSoon');
        // if loyaltyCard is expired
        if (!isExpired && !isComingSoon) {
            this.model.openStampDialog();
        }

        return false;
    },

    renderCard: function()
    {
        this.$cardContainer.html('');
        var slots = this.model.get('slots'),
            _bgFallback = $('<div class="fallback circle">'),
            _overlayFallback = $('<div class="fallback star">');

        for (var i = 0; i < slots.length; i++)
        {
            var slot = slots[i],
                icon = slot.icon || {},
                $iconContainer = $('<div>').addClass('slot');

            $iconContainer.appendTo(this.$cardContainer);

            var classVariant = slot.punched ? 'punch' : 'whole',
                colorClasses = {
                    bg: 'clr_punch_slot_' + classVariant + '_bg',
                    overlay: 'clr_punch_slot_' + classVariant + '_overlay',
                    text: 'clr_punch_slot_' + classVariant + '_txt'
                };

            var addText = _.bind(function(_slot, _$iconContainer, _colorClasses)
            {
                if (_slot.text) {
                    var $text = $('<div>').addClass('slot_text ' + _colorClasses.text).text(_slot.text);
                    $text.appendTo(_$iconContainer);
                }
            }, this, slot, $iconContainer, colorClasses);


            //both are added to the same svg container dynamically created inside $iconContainer. rendering order is determined by order added
            //NOTE: if (!icon.bg), we want to fall to fallback: "circle css":
            var fallback = _bgFallback.clone().addClass(colorClasses.bg + '_fallback');
            Utils.Html.appendLayeredImage($iconContainer, icon.bg, colorClasses.bg, fallback, addText, addText);

            if (icon.overlay) {
                var fallback = _overlayFallback.clone().addClass(colorClasses.overlay + '_fallback_text');
                Utils.Html.appendLayeredImage($iconContainer, icon.overlay, colorClasses.overlay, fallback);
            }

            //this.$cardContainer.append(slot);
        }

    },

    addButtons: function ()
    {
        var $buttonsContainer = this.$('.buttons_container');

        // Create share control
        ShareControlHelper.addShareControlButton($buttonsContainer, this.model);

        // add the "more info" button. only if we have disclaimer / valid from / valid until:
        var validity = this.model.get('validity');
        var addInfoBtn = (this.model.get('disclaimer') || validity.validFrom || validity.validUntil);
        if (addInfoBtn)
        {
            // create the button view.
            var showMoreButton = new FlatButtonView({
                text: _T('HtmlTextLoyaltyCardsShowMoreButton'),
                icon: 'info22'
            });

            showMoreButton.bind('onButtonClicked', this._showMore, this);

            $buttonsContainer.append(showMoreButton.render().el);
        }

    },

    _showMore: function ()
    {
//        this.trigger('onShowMoreTap', this.model);
//        this.model.trigger('onShowMore', this.model);
        this.model.trigger('onInfoOpen', this.model);
    }
}); var LoyaltyCardsStampView = Backbone.View.extend({
    className: 'LoyaltyCardsStampView narrow_box',

    render: function()
    {
//        var params = this.model.toJSON();
        var params = {
            ok: _T('HtmlTextLoyaltyCardsDialogButtonOk'),
            cancel: _T('HtmlTextLoyaltyCardsDialogButtonCancel')
        };
        this.$el.append(loyaltyCardsTemplates.stamp_tpl(params));

        // save some jQuery objects:
        this.$header = this.$('.header');
        this.$okButton = this.$('.okButton');
        this.$cancelButton = this.$('.cancelButton');
        this.$status = this.$('.status');
        this.$input = this.$('INPUT');

        //bind events:
        // TODO: maybe in the "events" of the view?
        this.$okButton.tap(this.okButtonClick.hitch(this));
        this.$cancelButton.tap(this.cancelButtonClick.hitch(this));
        this.model.bind('change:verificationState', this.updateState, this);
        this.$input.focus(this.onInputEnter.hitch(this));

        this.renderHeader();
        this.updateState();

        // update the scroller after loading the images. Also, delete the image in error
        this.$('IMG').load(function () {
                // Call refresh scroll callback
                this.$scrollWrapper = this.$scrollWrapper || Scrolling.getMyScrollerWrapper(this.$el);
                Scrolling.onContentChanged(this.$scrollWrapper);
            }.hitch(this)).error(function () {
                $(this).remove();
            });

        return this;
    },

    close: function()
    {
        // unbind events:
        this.model.unbind('change:verificationState');

        // close keyboard (if open):
        this.$input.blur();

        // will cause to my father to close me, and change the "verificationState" to normal (= cancel stamp request, and also init for next time):
        this.model.closeStampDialog();

    },

    onInputEnter: function(e)
    {
//        console.log('AAAAAAAAAA');
        this.$input.val('').attr({placeholder: _T('HtmlTextLoyaltyCardsDialogPlaceholder')});
        this.$input.removeClass('mandatory');
        this.$status.html('');
    },

    okButtonClick: function(e)
    {
        e.preventDefault();

        // if not disabled:
        if (!$(e.target).hasClass('disabled'))
        {
            var code = this.$input.val();
            this.model.punch(code);
        }
        return false;
    },

    cancelButtonClick: function(e)
    {
        e.preventDefault();

        this.close();

        return false;
    },

    renderHeader: function()
    {
        var slot = this.model.getActiveSlot();

        //TODO: if (!slot) close dialog and return?

        var stampDialogType = slot.punchLayout || loyaltyCardsMaps.stampLayoutType[slot.slotType];
        if (stampDialogType === loyaltyCardsEnums.stampLayoutType.CONGRATS)
        {
            var params = slot;
            var template = loyaltyCardsTemplates.stampFreebieHeader_tpl;
        }
        else if (stampDialogType === loyaltyCardsEnums.stampLayoutType.GET_FREE)
        {
            var params = slot;
            var template = loyaltyCardsTemplates.stampMidFreebieHeader_tpl;
        }
        else //if (stampDialogType === loyaltyCardsEnums.stampLayoutType.NORMAL)
        {
            var params = this.model.toJSON();
            var template = loyaltyCardsTemplates.stampNormalHeader_tpl;
        }
        params = _.extend(params, {
            CongratsCaption: _T("HtmlTextLoyaltyCardsDialogCongratsCaption"),
            FreebieText: _T("HtmlTextLoyaltyCardsDialogFreebieText", {freebie: '<div class="freebie size_title_4 clr_contTypeB_hdlTxt">' + params.freebieName + '</div>'}),
            DialogStampCaption: _T("HtmlTextLoyaltyCardsDialogStampCaption"),
            MidFreebieText: _T("HtmlTextLoyaltyCardsDialogMidFreebieText", {freebie: '<span class="mid_freebie clr_contTypeB_hdlTxt">' + params.freebieName + '</span>'}),
            StampCaption: _T("HtmlTextLoyaltyCardsDialogStampCaption"),
            NormalText: _T("HtmlTextLoyaltyCardsDialogNormalText")
        })

        this.$header.html(template(params));

        //add the "icon" of the slot if relevant:
        var $iconContainer = this.$('.slot_icon_header');
        if ($iconContainer && $iconContainer.length === 1)
        {
            var colorClasses = 'clr_punch_slot_punch_bg'; // this color?
            Utils.Html.appendLayeredImage($iconContainer, slot.icon.overlay, colorClasses);
        }

    },

    updateState: function ()
    {
        var userData = this.model.get('userData');
        var limits = this.model.get('limits');
        // check if card is blocked:
        var nowTime = new Date().getTime();
        var verificationState = this.model.get('verificationState');

        if (userData.blockUntil && userData.blockUntil > nowTime )
        {
            this._disableStamp();
            this.$input.val('').attr({placeholder: _T('HtmlTextLoyaltyCardsDialogPlaceholderLocked')});
            this.$input.addClass('mandatory');

            var delta = userData.blockUntil - nowTime;
            var hours = "" + Math.ceil(delta / 1000 / 60 / 60 ) ;
            var text = _T("HtmlTextLoyaltyCardsDialogServiceCoolDownText", {hours: hours});
//            var time = new Date(userData.blockUntil).format('shortDate');
//            var text = _T("HtmlTextLoyaltyCardsDialogServiceCoolDownText", {time: time});
            this.$status.html(text).removeClass('clr_contTypeB_txt').addClass('clr_punch_errTxt');
            return;
        }
        else if (verificationState === loyaltyCardsEnums.verificationState.VERIFYING)
        {
            this.$input.removeClass('mandatory');

            this._disableStamp();
            //TODO: add loading indicator?
            var text = _T("HtmlTextLoyaltyCardsDialogLoading" );
            this.$status.html(text).removeClass('clr_punch_errTxt').addClass('clr_contTypeB_txt');
        }
        else if (verificationState === loyaltyCardsEnums.verificationState.SERVER_FAIL)
        {
            this._enableStamp();
            var text = _T("HtmlTextLoyaltyCardsDialogServiceFailText");
            this.$status.html(text).removeClass('clr_contTypeB_txt').addClass('clr_punch_errTxt');
        }
        else if (verificationState === loyaltyCardsEnums.verificationState.INVALID_CODE)
        {
//            uiDriver.showToastMessage(null, null, "Wrong code!", this.$el);
            this.$input.addClass('mandatory');

            this._enableStamp();
            //TODO: add "1 of 3 tries?"
            var text = _T("HtmlTextLoyaltyCardsDialogWrongCodeText");
            this.$status.html(text).removeClass('clr_contTypeB_txt').addClass('clr_punch_errTxt');
        }
        else if (verificationState === loyaltyCardsEnums.verificationState.SUCCESS)
        {
            var slot = this.model.getActiveSlot();
            var afterPunchType = slot.afterPunchType || loyaltyCardsMaps.afterPunchType[slot.slotType];
            if (afterPunchType === loyaltyCardsEnums.afterPunchType.CONGRATS)
            {
                //make sure that the dialog will not be shorter after the change:
                var height = this.$el.height();
                this.$el.css({
                    "height": "1px",
                    "min-height": height + "px"
                });


                this.$input.remove();
                this.$status.remove();
                this.$okButton.remove();

                this.$header.html(loyaltyCardsTemplates.successHeader_tpl(_.extend(slot, {
                    CongratsSuccessCaption: _T("HtmlTextLoyaltyCardsDialogCongratsSuccessCaption"),
                    FreebieSuccessText: _T("HtmlTextLoyaltyCardsDialogFreebieSuccessText", {freebie: '<div class="freebie size_title_4 clr_contTypeB_hdlTxt">' + slot.freebieName + '</div>'})})));

                //add the "icon" of the slot if relevant:
                var $iconContainer = this.$('.slot_icon_header');
                if ($iconContainer && $iconContainer.length === 1)
                {
                    var colorClasses = 'clr_punch_slot_punch_bg'; // this color?
                    Utils.Html.appendLayeredImage($iconContainer, slot.icon.overlay, colorClasses);
                }

                // Create share control
                var $shareContainer = this.$('.buttonsContainer');
                ShareControlHelper.addShareControlButton($shareContainer, this.model, null,{big: true});

            }
            else //if (afterPunchType === loyaltyCardsEnums.afterPunchType.CLOSE)
            {
                // will cause to my father to close me, unbind, etc.
                this.close();
            }
        }
        else // if (verificationState === loyaltyCardsEnums.verificationState.NORMAL)
        {
            // TODO: want this?
            // empty the code input?
            this.$input.val('');

            // TODO: want this?
            // "enter" inside the input:
            this.$input.focus();

            // check if is in card limit (NOTE: we don't want daily limit in CP):
            // we don't want storage in CP:
            if (PLATFORM !== platformEnum.simulator && limits.punchesPerDay && this.model.getPunchesToday() >= limits.punchesPerDay)
            {
                this._disableStamp();
                var text = _T("HtmlTextLoyaltyCardsDialogLimitPerDayText", {punchesPerDay: limits.punchesPerDay});
                this.$status.html(text).removeClass('clr_contTypeB_txt').addClass('clr_punch_errTxt');

            }
            else
            {
                this._enableStamp();
                this.$status.html('');

            }
        }
        this.$scrollWrapper = this.$scrollWrapper || Scrolling.getMyScrollerWrapper(this.$el);
        Scrolling.onContentChanged(this.$scrollWrapper);
    },

    _disableStamp: function ()
    {
        this.$input.addClass('disabled');
        this.$input.attr({'disabled': 'disabled'});
        this.$okButton.addClass('disabled');
    },

    _enableStamp: function ()
    {
        this.$input.removeClass('disabled');
        this.$input.removeAttr('disabled');
        this.$input.attr({placeholder: _T('HtmlTextLoyaltyCardsDialogPlaceholder')});
        this.$okButton.removeClass('disabled');
    }
}); var loyaltyCardsTemplates = {
    pageCardContainer: _.template(
        '<div class="black_bg clr_punch_wideBg"></div>' +
            '<div class="scroll_wrapper"><div class="scroller">' +
            '<div class="active animationContainer">' +
            '<div class="fullCardContainer sliced_image" style="background-image:url(\'<%= images.background %>\')">' +
            '<div class="clr_punch_bgImage_overlayBg cardContainer">' +
            '</div></div></div>' +
            '<div class="inactive animationContainer">' +
            '<div class="fullCardContainer sliced_image" style="background-image:url(\'<%= images.background %>\')">' +
            '<div class="clr_punch_bgImage_overlayBg cardContainer">' +
            '</div></div></div>' +
            '<div class="clearfix"></div>' +
            '</div></div>'),

    scroller_tpl : _.template('<div class="scroll_wrapper"><div class="scroller"></div></div>'),


    info_tpl: _.template(
        '<div class="box2">' +
            '<% if (images.header) { %>' +
            '<img class="header_image" src="<%= images.header %>" />' +
            '<% } %>' +
            '<div class="not_responsive card_info_title size_title_3 _1_line clr_contTypeB_hdlTxt ellipsis"><%= infoTitle %></div>' +
//    '<% if (description) { %>' +
//        '<div class="description clr_contTypeB_txt"></div>' +
//    '<% } %>' +
            '<% if (disclaimer) { %>' +
            '<div class="disclaimer size_1 clr_contTypeB_txt"><%= disclaimer %></div>' +
            '<% } %>' +

            '<% if (validFrom || validUntil) { %> ' +
            '<div class="new_box validityTitle clr_contTypeB_brdr not_responsive size_title_1 clr_contTypeB_hdlTxt"><%= validityTitle %></div>' +
            '<div class="validity_box box clr_contTypeB_brdr">' +
            '<div class="val_icon mask_sprite sprite-cal clr_contTypeB_icn"></div>' +
            //'<div class="vertical_center">' +
            '<div class="val_texts_container">' +
            '<% if (validFrom) { %> ' +
            '<div class="val_text clr_contTypeB_txt not_responsive size_1"><span class="val_mini_title not_responsive size_title_1 clr_contTypeB_hdlTxt"><%= validFromTitle %></span><%= validFrom %></div>' +
            '<% } %> ' +
            '<% if (validUntil) { %> ' +
            '<div class="val_text clr_contTypeB_txt not_responsive size_1"><span class="val_mini_title not_responsive size_title_1 clr_contTypeB_hdlTxt"><%= validUntilTitle %></span><%= validUntil %></div>' +
            '<% } %> ' +
            '</div>' +
            //'</div>' +
            '</div>' +
            '<% } %> ' +

            '<div class="cancelButton button clr_appGeneral_dialog_btn2_bg clr_appGeneral_dialog_btn2_brdr clr_appGeneral_dialog_btn2_hdlTxt" data-role="button">' +
            '<%= cancel %>' +
            '</div>' +
            '</div>'),

    stamp_tpl: _.template(
        '<div class="table">' +
            '<div class="header">' +
            '</div>' +
//    '<div class="input_container">' +
            '<input type="tel" maxlength="4" class="input clr_form_input_bg clr_form_input_brdr clr_form_input_txt" />' +
//    '</div>' +
            '<div class="status size_1"></div>' +
            '<div class="space"></div>' +
            '<div class="buttonsContainer">' +
            '<div class="okButton button clr_contTypeB_btn_bg clr_contTypeB_btn_brdr clr_contTypeB_btn_hdlTxt" data-role="button">' +
            '<%= ok %>' +
            '</div>' +
            '<div class="cancelButton button clr_appGeneral_dialog_btn2_bg clr_appGeneral_dialog_btn2_brdr clr_appGeneral_dialog_btn2_hdlTxt" data-role="button">' +
            '<%= cancel %>' +
            '</div>' +
            '</div>' +
            '</div>'),

    stampFreebieHeader_tpl: _.template(
        '<div class="box1">' +
            '<% if (typeof(icon) !== undefined && icon.overlay) { %>' +
            '<div class="slot_icon_header"></div>' +
            '<% } %>' +
            '<div class="not_responsive title size_title_3 _1_line clr_contTypeB_hdlTxt ellipsis"><%= CongratsCaption %></div>' +
            '<div class="text1 size_1 clr_contTypeB_txt">' +
            '<%= FreebieText %>' +
            '</div>' +
            '</div>'),

    successHeader_tpl: _.template(
        '<div class="box1">' +
            '<% if (typeof(icon) !== undefined && icon.overlay) { %>' +
            '<div class="slot_icon_header"></div>' +
            '<% } %>' +
            '<div class="not_responsive title size_title_3 _1_line clr_contTypeB_hdlTxt ellipsis"><%= CongratsSuccessCaption %></div>' +
            '<div class="text1 size_1 clr_contTypeB_txt">' +
            '<%= FreebieSuccessText %>' +
            '</div>' +
            '</div>'),

    stampMidFreebieHeader_tpl: _.template(
        '<div class="box1">' +
            '<% if (typeof(icon) !== undefined && icon.overlay) { %>' +
            '<div class="slot_icon_header"></div>' +
            '<% } %>' +
            '<div class="not_responsive title size_title_3 _1_line clr_contTypeB_hdlTxt ellipsis"><%= DialogStampCaption %></div>' +
            '<div class="text1 size_1 clr_contTypeB_txt">' +
            '<%= MidFreebieText %>' +
            '</div>' +
            '</div>'),

    stampNormalHeader_tpl: _.template(
        '<div class="box1">' +
            '<% if (images.header) { %>' +
            '<img class="header_image" src="<%= images.header %>" />' +
            '<% } %>' +
            '<div class="not_responsive title size_title_3 _1_line clr_contTypeB_hdlTxt ellipsis"><%= StampCaption %></div>' +
            '<div class="text1 size_1 clr_contTypeB_txt"><%= NormalText %></div>' +
            '</div>'),


    list_item_tpl: _.template(
        '<div class="item_container clr_contTypeB_bubbleItem_bg clr_contTypeB_bubbleItem_brdr box" data-role="button">' +
            '<% if (title) { %>' +
            '<div class="not_responsive list_title size_title_3 _1_line clr_contTypeB_hdlTxt ellipsis"><%= title %></div>' +
            '<% } %>' +
            '<% if (description) { %>' +
            '<div class="description clr_contTypeB_txt"></div>' +
            '<% } %>' +
            '<div class="main_banner clr_contTypeB_subBg">' +
            '<% if (images.header) { %>' +
            '<div class="image top_sliced_image" style="background-image:url(\'<%= images.background %>\')">' +
            '<div class="clr_punch_bgImage_overlayBg image">' +
            '<div class="small_header_image contain_image" style="background-image:url(\'<%= images.header %>\')"></div>' +
            '</div>' +
            '</div>' +
            '<div class="offer_container">' +
            '<% } else { %>' +
            '<div class="offer_container_no_image">' +
            '<% } %>' +
            '<div class="vertical_center"><div>' +
            '<% if (upperTitle) { %>' +
            '<div class="not_responsive size_0 upperTitle clr_contTypeB_subTxt"><%=Utils.String.translateIfNeed(upperTitle)%></div>' +
            '<% } %>' +
            //'<% if (offerTitle) { %>' +
            '<div class="mainOfferTitle clr_contTypeB_hdlTxt"><%=offerTitle%></div>' +
            //'<% } %>' +

            '</div></div>' +  // close "vertical_center"
            '</div>' + // close "offer_container"
            '</div>'),

    listItemDates: _.template(
        '<div class="dates_container not_responsive size_0 _1_line"> \
            <% if (startStr) { %> \
                <div class="left startStr clr_contTypeB_subTxt"><%= startStr %></div>\
                <div class="left formattedValidFrom clr_contTypeB_hdlTxt"><%= formattedValidFrom %></div>\
            <% } %> \
            <% if (endStr) { %> \
                <div class="right formattedValidUntil clr_contTypeB_hdlTxt"><%= formattedValidUntil %></div>\
                <div class="right endStr clr_contTypeB_subTxt"><%= endStr %></div>\
            <% } %> \
        </div>'),

    loyaltyCard: _.template(
        '<div class="box2 item_container">' +
            '<% if (images.header) { %>' +
            '<img class="header_image" src="<%= images.header %>" />' +
            '<% } if (title) { %>' +
            '<div class="not_responsive title size_title_3 _1_line clr_contTypeB_hdlTxt ellipsis"><%= title %></div>' +
            '<% } %>' +
            '<% if (description) { %>' +
            '<div class="description clr_contTypeB_txt"></div>' +
            '<% } %>' +
            '<div class="card_container"></div>' +
            '<div class="buttons_container"></div>' +
            '</div>'),

    loyaltyCardExpired: _.template(
        '<div class="expired-wrapper">' +
            '<div class="expired-ribbon-wrapper"><div class="expired-ribbon clr_appGeneral_ribbon_bg clr_appGeneral_ribbon_brdr clr_appGeneral_ribbon_txt"><%= loyaltyCardExpired %></div></div>' +
            '</div>')
}; 







var linksTemplates = {};

linksTemplates.pageTemplate = _.template(
'<div class="scroll_wrapper"><div class="scroller">' +
	'<% if(typeof(logoImgUrl)!= "undefined" && logoImgUrl){ %>' +
		'<div class="header" style="background-image:url(<%= logoImgUrl %>);">' +
			'<% if(typeof(text)!= "undefined" && text){ %>' +
				'<div class="header_box clr_contTypeC_bg">' +
					'<div class="size_title_3 max_3_lines links_title clr_contTypeC_hdlTxt"><%= text %></div>' +
				'</div>' +
			'<% } %>' +
		'</div>' +
	'<% } %>' +
	'<div class="linksContainer">' +
	'</div>' +
'</div></div>' // scroll_wrapper + scroller
);

linksTemplates.linkTemplate = _.template(
'<div class="link" data-role="button">' +
	'<% if(typeof(imageUrl)!= "undefined" && imageUrl){ %>' +
		'<div class="link_image contain_image" style="background-image:url(<%= imageUrl %>);"></div>' +
	'<% } else if(typeof(title)!= "undefined" && title){ %>' +
		'<span class="link_title ellipsis"><%= title %></span>' +
	'<% } %>' +
'</div>');

linksTemplates.linkDetailsTemplate = _.template(
'<div class="scroll_wrapper"><div class="scroller">' +
	'<% if (imageUrl) { %>' +
		'<img class="img clr_contTypeA_brdr" src="<%= imageUrl %>" />' +
	'<% } %>' +
	
	'<% if (linkTitle ) { %>' +
    '<a class="linkItem clr_contTypeA_bg clr_contTypeA_brdr" href="javascript:void(0)" data-role="button" >' +
    	'<div class="icon mask_sprite sprite-link clr_contTypeA_icn" alt="" />' +
    	'<div class="size_title_1 linkTitle clr_contTypeA_hdlTxt"><%= linkTitle %></div>' +
    '</a>' +
	'<% } %>' +

	'<% if (title) { %>' +
    	'<div class="size_title_4 title clr_contTypeA_hdlTxt"><%= title %></div>' +
    '<% } %>' +
    
    '<% if (description) { %>' +
    	'<div class="size_title_1 descriptionTitle clr_contTypeA_subTxt"><%= descriptionTitle %></div>' +
    	'<div class="size_0 description clr_contTypeA_txt"></div>' +
//    	'<div class="description clr_contTypeA_txt"><%= description %></div>' +
    '<% } %>' +
'</div></div>' // scroll_wrapper + scroller
);
 /**
 * View that shows the Links home page
 * 
 * @author Matanya
 */
var LinksView = Backbone.View.extend(
{
	className: "links_page",
	
	initialize: function()
	{
		this.$el.attr(
		{
			'data-role': 'page'
		});
		
        var layoutId = this.model.get('layoutId');
        
        // these layouts need grid calculations:
        if (layoutId === 0 || layoutId === 1 || layoutId === 3) 
        {
			$(window).bind("throttledresize", this.onResize.hitch(this));
            this.$el.bind("pageshow", function()
			{
				// TODO: need this at all?:
				// TODO: change it!
				// We need this TO, because the photosListView (grid or fade-show)
				// want to calculate positions according to some sizes 
				// (e.g.: offset, width) but without the TO, sometimes some 
				// elements are not shown yet, and we get offset=0 or width=0.
				setTimeout(function(){
					this.onPageShow();
				}.hitch(this), 10);
			}.hitch(this));
            this.$el.bind("pagehide", this.onPageHide.hitch(this));
			
        }
		
	},
	
	render: function()
	{
		// get the layout's template.
		var layoutTemplate = linksTemplates.pageTemplate;
		
		var layoutId = this.model.get('layoutId');
		this.$el.html(layoutTemplate(this.model.toJSON())).addClass('layout-' + layoutId);
		if (LAYOUT === layoutFormat.wide)
		{
			this.$el.addClass('wide');
		}

		// Add all the links + bind click events:
		var linkTemplate = linksTemplates.linkTemplate;
		var $linksContainer = this.$('.linksContainer');
		var links = this.model.get('links');
		if (links) 
		{
			$.each(links, function(index, link)
			{
				var $link = $(linkTemplate(link));
				$linksContainer.append($link);
				
				$link.tap(function(e)
				{
					// If there is a details page: open it:
					if (link.details)
					{
                        UN.navTo(link.details.alias, {level:2});
					}
					else
					{
						appDriver.openLink(null, null,
						{
							'url': link.url,
							'title': link.title
						});
					}
					
					return false;
				}.hitch(this));
			}.hitch(this));
		}
		
		// Delete the image in error:
        $linksContainer.find('IMG').error(function ()
        {
            $(this).remove();
			// TODO: do we want to use title in this case?
        });
		
		this.$itemsList = $linksContainer; 
		
		var $scrollWrapper = this.$('.scroll_wrapper');

		// initialize the scrolling.
		Scrolling.init($scrollWrapper);
		
		return this;
	},

    onResize: function ()
    {
		if (this.isPageShow) 
		{
			this.updateGrid();
		}
    },

    onPageShow: function ()
    {
		this.isPageShow = true;
		this.updateGrid();
        this.$itemsList.css({
			visibility: "visible"
		});
    },

    onPageHide: function ()
    {
		this.isPageShow = false;
		
		//TODO: need this?:
		// We don't want the "jump" when calculating the grid-margin,
		// but we need the items to take up place - for margin calculation,
		// so we use the:
		// "hidden - The element is invisible (but still takes up space)"
        this.$itemsList.css({
			visibility: "hidden"
		});
    },

    updateGrid: function()
	{
		var options = 
		{
			minWidth: 150,
			maxWidth: 99999,
			margin: 0,
			setAlsoMargin: false,
			setAlsoHeight: false
		};
		var layoutId = this.model.get('layoutId');
		if (layoutId === 1)
		{
			options.setAlsoHeight = true;
			options.minWidth = 100;
		}
		else if (layoutId === 3)
		{
			options.margin = 10;
			options.minWidth = 120;
		}

		if (LAYOUT === layoutFormat.wide)
		{
			options.minWidth = options.minWidth * 2;
		}
		

		Utils.Html.setGridSizes(this.$itemsList, options);
	},

	addTabsView: function(tabsViewEl)
	{
		this.$('.scroller').prepend(tabsViewEl);
	}
}); /**
 * View that shows the entire links template.
 * 
 * @author Matanya
 */
var LinksTemplateView = TemplateView.extend(
{	

	initialize: function()
	{
		TemplateView.prototype.initialize.apply(this);

		var templateMetaData = this.model.get('meta');
		
		// Supported layouts 0-3. Default is 0.
		if (!templateMetaData.pageLayout || templateMetaData.pageLayout < 0 || templateMetaData.pageLayout > 3) 
		{
			templateMetaData.pageLayout = 0;
		}
//		if (LAYOUT === layoutFormat.wide && templateMetaData.pageLayout === 2) 
//		{
//			// layout 2 is looking bad in iPad, so we use different layout:
//			templateMetaData.pageLayout = 0;
//		}
		
		// NOTE: We don't need this code (because we get the object "by reference",
		//	but we do "set" anyway ("for the good order"...)) 
		this.model.set(
		{
			'meta': templateMetaData
		});

	},
	
	/**
     * OVERRIDE - render level 1 - tab:
     */
    _renderTab : function(index, navRequest)
	{
		var templateMetaData = this.model.get('meta');

		var item = templateMetaData.items[index] || {};
		item.layoutId = templateMetaData.pageLayout;
		
		var linksModel = new Backbone.Model(item);

        //fix "links aliases":
        var links = linksModel.get('links');
        if (links)
        {
            $.each(links, function(index, link)
            {
                if (link.details)
                {
                    link.details.alias = Utils.Html.fixAlias(link.details.alias || link.details.title || link.title);
                }
            });
        }

		var id = Utils.Helpers.generateGUID();
		var linksView = new LinksView(
		{
			model: linksModel,
			id: id
		});

		this.$el.append(linksView.render().el);
		
        this.addTabsToView(linksView, index);

        UN.registerChange(this._navToInner.hitch(this), 2, {data: {model: linksModel}, navRequest: navRequest});

        UN.onPageReady(id, navRequest, 1, true);
	},

    _navToInner: function (data, alias)
    {
        var navRequest = data.navRequest;
        var link = null;

        // find the link with this alias:
        var links = data.model.get('links');
        if (links)
        {
            for (var i = links.length - 1; i > -1; i--)
            {
                link = links[i];
                if (link.details && link.details.alias === alias)
                {
                    break;
                }
            }
        }

        if (!link || i === -1)
        {
            this.itemNotFound(navRequest, 2, null);
            return;
        }

        // create the detailsPage: 
        var id = Utils.Helpers.generateGUID();
        var detailsPage = new LinkDetailsView({
            model: new Backbone.Model(link),
            id: id
        });

        this.$el.append(detailsPage.render().el);

        // "Slide" to it:
        UN.onPageReady(id, navRequest, 2);
    }
}); /**
 * View that shows details page of link (if exists...)
 * 
 * @author Matanya
 */
var LinkDetailsView = Backbone.View.extend(
{
	className: "link_details_page clr_contTypeA_bg",
	
	initialize: function()
	{
		this.$el.attr(
		{
			'data-role': 'page'
		});
	},
	
	render: function()
	{
		// Add all the links + bind click events:
		var details = this.model.get('details') || {};
	    var params = {
	    	descriptionTitle: _T("HtmlTextLinksDescriptionTitle"),
	    	linkTitle: details.linkTitle || '',
	    	title: details.title || '',
	    	imageUrl: details.imageUrl || '',
	    	description: details.description || ''
	    };
		
	    this.$el.html(linksTemplates.linkDetailsTemplate(params));

		if (params.description) 
		{
			// Render "description" text into container using htmlContainer
			var htmlContainer = new HtmlContainerControl();
			htmlContainer.renderHtml(this.$('.description'), params.description,{
				changeColors: false
			});
		}
	    
	    this.$('.linkItem').tap(function(e)
		{
            var link = this.model.toJSON();
            appDriver.openLink(null, null,
            {
                'url': link.url,
                'title': link.title
            });
			return false;
		}.hitch(this));
		
		var $scrollWrapper = this.$('.scroll_wrapper');

		// initialize the scrolling.
		Scrolling.init($scrollWrapper);

		// update the scroller after loading the images. Also, delete the image in error
        this.$('IMG').load(function ()
        {
            // Call refresh scroll callback
            Scrolling.onContentChanged($scrollWrapper);
        }).error(function ()
        {
            $(this).remove();
        });
		
		return this;
	}
}); 



var couponsEnums = {
//	couponType: {
//		UNKNOWN: 0 //not in use.
//		,GENERAL_DISCOUNT: 1 //e.g.: 25% discount on all the products. can be % or $, etc. not in use yet.
//		,PRODUCT_DISCOUNT: 2 //e.g.: buy a giraffe in 80$ instead of 100$.
//		,FREE: 3 //e.g.: get a free giraffe.
//		,GET_MORE: 4 //e.g.: buy 2 giraffes, get the 3rd for free. not in use yet.
//	}
	
	couponType: {
		UNKNOWN: 0 //not in use.
		,DISCOUNT: 1 //e.g.: buy a giraffe in only 60$. 40% discount on all the products. etc.
		,CUSTOM: 2 //e.g.: get a free giraffe.
		,BUY_AND_GET: 3 //e.g.: buy 2 giraffes, get the 3rd for free.
	}
	
	/* How to treat to the "discount" number? */
	,discountType: {
		PERCENT: 0 // %
		,MONEY: 1 // e.g.: $ . according to the currency symbol...
	}

	/* How to show the main display of the offer? */
	,offerType: { 
		NO_OFFER: 0 // nothing in the "offer"section. the image will be bigger and will cover the offer section
		,DISCOUNT: 1 // e.g.: 40% off, 40$ off.
		,FINAL_PRICE: 2 // e.g.: only 60$
		,CUSTOM_TEXT: 3 //e.g.: "FREE!", "4+1", "2 + 1 Free!" etc.
		,CUSTOM_ICON: 4 // icon for the offer (NOTE: we use it only in the list. in the details page we will use "no offer" (=big image))
	}
	
};
 /*******************
* Coupons list model
********************/
var CouponsListModel = ItemsModel.extend(
{
    createItemsCollection: function()
    {
        var params = this.get('params');
        return new CouponsCollection(null, params);
    }
});



 var CouponModel = ItemModel.extend(
{
    // key name for the storage
    _key: 'CouponClaim',

    defaults:
	{
		id: "",
		/*
		couponType values:
			UNKNOWN //not in use.
			DISCOUNT //e.g.: buy a giraffe in only 60$. 40% discount on all the products. etc. 
			CUSTOM //e.g.: get a free giraffe.
			BUY_AND_GET //e.g.: buy 2 giraffes, get the 3rd for free.
		*/
		couponType: couponsEnums.couponType.UNKNOWN,
		isClaimed: false, // Did the user already claimed this coupon?
		claim: false, // Do we want the "claim" button?
		title: "", // main title. mandatory.
		description: "",// main description. mandatory.
		imageUrl: "", // mandatory.
		largeImageUrl: "",//mandatory.
		dealDetails: "", // HTML field. optional.
		overrideHtmlColors: true, // do we want to override the colors in HTML fields (dealDetails)
		disclaimer: "", // disclaimer text. optional.
		productDiscount: 
		{
			/* 
			discountType = How to treat to the "discount" number?
				PERCENT // %
				MONEY // e.g.: $ . according to the currency symbol... 
			*/
			discountType: couponsEnums.discountType.PERCENT, 

			/*
			offerType = How to show the main display of the offer?
				DISCOUNT // e.g.: 40% off, 40$ off.
				FINAL_PRICE // e.g.: only 60$
				CUSTOM_TEXT //e.g.: "FREE!", "4+1", "2 + 1 Free!" etc.
				CUSTOM_ICON // icon for the offer (NOTE: we use it only in the list. in the details page we will use "no offer" (=big image))
				NO_OFFER // nothing in the "offer"section. the image will be bigger and will cover the offer section 
			*/
			offerType: couponsEnums.offerType.DISCOUNT,
			price: 0, // mandatory if offerType = FINAL_PRICE
			discount: 0, // mandatory if offerType = DISCOUNT
			imageUrl: "", // relevant only if "CUSTOM_ICON"-> if we have an image, we will display it instead of main-display-offer-texts
			upperTitle: null, //if it is null (NOTE: empty string ("") is not null!) we will calculate it in the client to "{$HtmlTextCouponsTitleOffer}" for "Special Offer"
			lowerTitle: null, //if it is null (NOTE: empty string ("") is not null!) we will calculate it in the client in DISCOUNT to "{$HtmlTextCouponsPriceOff}" for "OFF" and to empty string if not DISCOUNT
			offerTitle: "", // use this in CUSTOM_TEXT e.g.: "4+1"
			currency: "USD", // not in use in the client
			currencySymbol: "$"
		},
        validity:
        {
			validFrom: 0,
			validUntil: 0,
			//validity hours:
	        hours : null
	        /* example:
			hours : [{
			 days : [7, 1, 3],
			 startHour : "13:00",
			 endHour : "16:00"
			}, {
			 days : [7, 5, 6],
			 startHour : "8:00",
			 endHour : "12:00"
			}, {
			 days : [3],
			 startHour : "23:45",
			 endHour : "23:59"
			}, {
			 days : [1, 2, 4, 6, 7],
			 startHour : "5:00",
			 endHour : "5:30"
			}
			]*/
        },
		linkCaption: "", // the caption of the link button. we translate it if needed. if null, empty string, etc. we will set "{$HtmlTextCouponsTermsTitle}" for "terms & conditions"
		linkUrl: "",
		//share info:
		socialInfo: {
			title: "", // offer title. e.g.: "Buy a new giraffe in only 60$"
			imageUrl: "", //probably like the "largeImageUrl"
			url: "" // url to this coupon. if we get the "$APP_LINK" string, we will add link to the app
		}
	},
	
	initialize: function()
	{
        // temporary (=until will be supported) add alias
        var id = this.get('id') || "";
        var alias = Utils.Html.fixAlias(this.get('alias') || id, true, id);

        this.set(
        {
            alias: alias,
            isClaimed: this.isClaimed()
        });

		if (!this.get('linkCaption'))
		{
			this.set(
			{
				linkCaption: '{$HtmlTextCouponsTermsTitle}'
			});
		}
		var productDiscount = this.get('productDiscount');
		if (productDiscount.upperTitle === null)
		{
			productDiscount.upperTitle = _T('HtmlTextCouponsTitleOffer');
		}
		if (productDiscount.lowerTitle === null)
		{
			if (productDiscount.offerType === couponsEnums.offerType.DISCOUNT)
			{
				productDiscount.lowerTitle = _T('HtmlTextCouponsPriceOff');
			}
			else
			{
				productDiscount.lowerTitle = "";
			}
		}
        if (!this.get('largeImageUrl')){
            this.set('largeImageUrl',this.get('imageUrl'))
        }
	},

    _isDateExpired: function () {
        //TODO: maybe to save it once, so we will not get valid in list, expired in details, etc.?
        var validity = this.get('validity');
        var now = (new Date().getTime() / 1000);
        if (validity.validUntil) {
            validity.validUntil += 24*60*60; //adding 24-hour period to the date, so that it will still be valid if we are in the same date.
            if (validity.validUntil < now)
                return _T('HtmlTextCouponsExpired');
        }
        if (validity.validFrom) {
            //validity.validFrom -= 24*60*60; //substract 24-hour period to the date, so that it will still be valid if we are in the same date.
            if (validity.validFrom > now)
                return _T('HtmlTextCouponsComingSoon');
        }
        return false;
    },


    // get if the coupon was expired or coming soon (return the string of "expired" or "coming soon" in this case)
    isExpired: function() {
        return this._isDateExpired();
    },

    // get "is coupon already claimed" from local storage
    isClaimed: function()
    {
        //TEST!!:
//        return true;

        var id = this.get('id');
        if (!id)
        {
            return false;
        }
        var _key = this._key + id;
        var data = storageDriver.getItem(null, null, _key, true);

        // if there is data in the storage, update the userProfile
        if (data)
        {
            return true;
        }
        return false;
    },

    // set "coupon claimed" to local storage
    setClaimed: function()
    {
        //TODO: not in simulator?
        var id = this.get('id');
        if (!id)
        {
            return;
        }
        var _key = this._key + id;
        //TODO: maybe to set time of "now", so we can do "expired" in the future?
        storageDriver.setItem(null, null, _key, '1', true);

        this.set({isClaimed: true});
    },


	/**
	 * Create and return share info object
	 * 
	 * @return shareInfo - object containing the share info
	 *
	 * @author Matanya
	 */
   getShareInfo: function()
    {
        var shareInfo = $.extend({}, this.get('socialInfo'));
        var offerTitle = shareInfo.title;
        var shareTitle = _T('HtmlTextCouponsShareTitle');
		var appName = AppManager.app().get('appLabel');
        var shareDescription;
        if (_.isNull(offerTitle)){
            shareDescription = _T('HtmlTextCouponsShareDescriptionNoTitle', {appName: appName});

        }
        else {
            shareDescription = _T('HtmlTextCouponsShareDescription', {offerTitle: offerTitle, appName: appName});
        }


        // we override the title and description:
        shareInfo.title = shareTitle;
        shareInfo.shortDesc = shareDescription;

        //TEST!!!:
        //shareInfo.shortDesc = 'a \n b\nc';
        
		//add app link if we need:
        if(shareInfo.url === "$APP_LINK")
		{
			var appLink = AppManager.app().get('appLink');
        	shareInfo.url = (appLink) ? appLink : "";
		}
        
        // Create Twitter text
//        shareInfo.twitterFrom = _T('SRssShareTwitterFrom', 
//        {
//            'title': title
//        });
		
		return shareInfo;
    }

}); var CouponsCollection = ItemsCollection.extend(
{
    model: CouponModel,

    initialize: function (models, params) 
    {
        // "inherit" ("Super"):
        ItemsCollection.prototype.initialize.apply(this);
        if (!params.listId || !params.type)
        {
            this.invalid = true;
        }
        this.params = params;
    },

    getServiceName: function ()
    {
        return 'CMS_COUPONS_GET';
    },

    
    parse: function (result)
    {
	// remove unsupported coupons types:
	var models = $.map(result.items, function(item,i){
		if (item.couponType === couponsEnums.couponType.BUY_AND_GET ||
				item.couponType === couponsEnums.couponType.CUSTOM ||
				item.couponType === couponsEnums.couponType.DISCOUNT)
		{
			return item;
		}
	});
	return {models: models};
    },

    getParams: function ()
    {
        return this.params;
    }
});     /**
 * Coupons template.
 */
var CouponsTemplateView = TemplateView.extend(
{
    /**
     * OVERRIDE - render level 1 - tab:
     */
    _renderTab : function(index, navRequest) {

        var meta = this.model.get('meta'),
            tabMetaData = meta.items[index] || { params : {} };

        //TODO: what is it?:
        this.model.get('tabCollection').models[index].set('selected', true);

        var model = new CouponsListModel( { params : tabMetaData.params } );
        
        model.set(
        {
            layoutId: meta.pageLayout,
            layoutParams: meta.items
        });

        var view = new CouponsListView({
            model: model
        });

        this.renderListPage({navRequest: navRequest, model: model, view: view});
    },

    /**
     * OVERRIDE - handle "lonely item"
     */
    getDefaultItemAlias: function (data)
    {
        var navRequest = data.navRequest;
        var itemsCollection = data.model.get('items');
        if (itemsCollection.length === 1)
        {
            var itemModel = itemsCollection.at(0);
            return itemModel.get('alias');
        }
        return null;
    },

    /**
     * OVERRIDE.
     */
    getDetailsView: function (model)
    {
        return new CouponDetailsPageView({
            model: model
        });
    }
    
}); var CouponsListView = ItemsView.extend(
{

    initialize: function ()
    {
        this.$el.attr(
            {
                'data-role': 'page',
                'data-buttons': 'refresh'
            });

        this.isGrid = (LAYOUT === layoutFormat.wide);

        this.$el.html(couponsTemplates.scroller_tpl());

        // intialize the scrolling.
        this.$scroll_wrapper = this.$('.scroll_wrapper');
        Scrolling.init(this.$scroll_wrapper);
        this.$scroller = this.$('.scroller');

        if (this.isGrid)
        {
			$(window).bind("throttledresize", this.onResize.hitch(this));
            var itemsCollection = this.model.get('items');
            if (itemsCollection)
            {
                // we want to update the margin also for the new items:
				itemsCollection.bind('getItemsSuccess', this.onResize, this);

				// now - the page is not shown yet, so we start with
				// onPageHide (not with onPageShow):
				this.onPageHide();

                this.$el.bind("pageshow", this.onPageShow.hitch(this));
                this.$el.bind("pagehide", this.onPageHide.hitch(this));
            }

        }
        this.$el.bind('refresh', this.handleRefreshClick.hitch(this));
        this.$el.bind('silentRefresh', this.handleSilentRefresh.hitch(this));

        ItemsView.prototype.initialize.apply(this);
    },

    updateThumbnailsMargin: function ()
    {
		Utils.Html.setGridMargin(this.$itemsList, {minMargin:1});
    },

    onResize: function ()
    {
		if (this.isPageShow)
		{
			this.updateThumbnailsMargin();
			Scrolling.triggerWrapperResize();
		}
    },

    onPageShow: function ()
    {
        this.isPageShow = true;
        this.updateThumbnailsMargin();
    },

    onPageHide: function ()
    {
    	this.isPageShow = false;
    },

    getRootView: function ()
    {
         return this.$scroller;
    },

    createItemView: function (model)
    {
		return new CouponsItemView({
            model: model,
            layoutType: this.model.get('layoutId'),
            layoutParams: this.model.get('layoutParams'),
            isGrid: this.isGrid
        });
    }
});
 var CouponsItemView = ListItemView.extend(
{
    className: 't3d couponsItemView',

    events:
	{
	    "tap": "itemClicked"
	},

    render: function ()
    {
        //this.$el.attr('data-role', 'button');
        if (this.options.isGrid)
        {
            this.$el.addClass('gridItem');
        }
        else
        {
            this.$el.addClass('feed_bubble_item');
        }

        this.$el.html(couponsTemplates.list_item_tpl());
        var $item_container = this.$('.item_container');
		var itemView = new CouponPrimaryView({
			model:this.model, 
			isListItem : true,
			isGrid: this.options.isGrid
		});
		
		$item_container.html(itemView.render().el);

        var validFrom = this.model.get('validity').validFrom;
        var validUntil = this.model.get('validity').validUntil;
		
		// if coupon is expired
        var isExpired = this.model.isExpired();
        if (isExpired)
        {
            var params =
            {couponExpired: isExpired};
            this.$el.append(couponsTemplates.couponExpired(params));
            $item_container.addClass('expired');
        }

        if (this.options.isGrid || validFrom || validUntil)
        {
			var params = 
			{
				startStr: "",
				endStr: "",
				formattedValidFrom: "",
				formattedValidUntil: ""
			};

			if (validFrom)
			{
				params.formattedValidFrom = new Date(validFrom * 1000).format("shortDate");
				params.startStr = _T('HtmlTextCouponsValidFrom');
			}
			if (validUntil)
			{
				params.formattedValidUntil = new Date(validUntil * 1000).format("shortDate");
				params.endStr = _T('HtmlTextCouponsValidUntil');
			}
			$item_container.append(couponsTemplates.listItemDates(params));
        }       
        return this;
    },

    itemClicked: function (e)
    {
    	e.preventDefault();
        UN.navTo(this.model.get('alias'), {level:2});
    }
}); var CouponPrimaryView = Backbone.View.extend(
{
    className: 'coupon_box',
	events: 
	{
		'tap .open_gallery': '_photoClick'
	},

	_photoClick: function(event)
	{
		event.preventDefault();
		
		// If we have large image: open the photos-gallery:
		var largeImage = this.model.get('largeImageUrl');
		if (largeImage) 
		{
			var photoArray =
			[{
				title: this.model.get('title'),
				//photoTime: this.get('createdTime') / 1000,
				largeImage: largeImage
			}];

			new PhotoGalleryManager().pressedImage(photoArray, 0);
			//e.g.: if click on list, and we open the gallery, we don't want to open also the details page: 
			return false;
		}
		
	},
	_showClaim: function(){
        if (this.options.isListItem && this.model.get('isClaimed')){
            this.$el.find(".couponClaimContainer").html(couponsTemplates.couponShowClaimTemplate({CouponsCouponClaimed: _T("HtmlTextCouponsCouponClaimed")}));
        }
    },
	render: function ()
    {
        //var couponType = this.model.get('couponType');
        var productDiscount = this.model.get('productDiscount');
        if (!productDiscount)
        {
        	return this;
        }

        var params = 
        {
		useDividedScreen: this.options.useDividedScreen
		,title: this.model.get('title')
        	,description: this.model.get('description')
        	,imageUrl: this.model.get('imageUrl')
        	,isListItem: this.options.isListItem
        	,classPrefix: this.options.isListItem? 'clr_contTypeB' : 'clr_contTypeA'
        	,discountImage: ""
        	,useBigImage: false
		,isGrid: this.options.isGrid
        };
        if (productDiscount.offerType === couponsEnums.offerType.CUSTOM_ICON &&
        	productDiscount.imageUrl &&
        	this.options.isListItem /* <- product decision: we want this behavior only in the list. in the details we will show big image */)
        {
        	// use icon for main offer:
        	params.discountImage = productDiscount.imageUrl;
        }
        if (productDiscount.offerType === couponsEnums.offerType.FINAL_PRICE ||
        		productDiscount.offerType === couponsEnums.offerType.DISCOUNT ||
			productDiscount.offerType === couponsEnums.offerType.CUSTOM_TEXT ||
			params.discountImage)
        {
        	// use texts for main offer:
        	params.upperTitle = Utils.String.translateIfNeed(productDiscount.upperTitle);
        	params.lowerTitle = Utils.String.translateIfNeed(productDiscount.lowerTitle);
        	params.currencySymbol = "";
        	params.percentSymbol = "";
        	params.offerTitle = productDiscount.offerTitle;
		if (productDiscount.offerType !== couponsEnums.offerType.CUSTOM_TEXT)
    		{
        		//calculate the offerTitle according to price, discount, etc.
        		if (productDiscount.offerType === couponsEnums.offerType.FINAL_PRICE)
    			{
        			// e.g.: 60$
        			var price = productDiscount.price;
        			if (productDiscount.discount)
        			{
                		if (productDiscount.discountType === couponsEnums.discountType.MONEY)
                		{
                			price = price - productDiscount.discount; 
                		}
                		else if (productDiscount.discountType === couponsEnums.discountType.PERCENT)
                		{
                			price = Math.floor(price * (100 - productDiscount.discount) / 100);
                		}
        			}
        			params.offerTitle = price;
				params.currencySymbol = productDiscount.currencySymbol || "";
    			}
        		else if (productDiscount.offerType === couponsEnums.offerType.DISCOUNT)
    			{
        			params.offerTitle = productDiscount.discount;
            		if (productDiscount.discountType === couponsEnums.discountType.MONEY)
            		{
        				// e.g.: 40$ (off)
					params.currencySymbol = productDiscount.currencySymbol || "";
            		}
            		else if (productDiscount.discountType === couponsEnums.discountType.PERCENT)
            		{
        				// e.g.: 40% (off)
        				params.percentSymbol = "%";
            		}
    			}
    		}

    		// calculate the fonts size:
    		var offerTitle = "" + params.offerTitle;
    		var charsCount = offerTitle.length + params.percentSymbol.length/1.7 + params.currencySymbol.length/1.7;
    		params.numberFontSize = 45;
    		if (charsCount > 4)
    		{
        		params.numberFontSize = Math.floor(160/charsCount);
			}
		else if (charsCount > 3)
		{
			params.numberFontSize = 41;
			}
    		
    		// in the list we have less width (because of the "bubble padding"):
    		if (this.options.isListItem)
    		{
    			params.numberFontSize = params.numberFontSize - 4;
    		}
            if (LAYOUT === layoutFormat.wide)
            {
                params.numberFontSize *= 1.2;
            }
            params.symbolFontSize = params.numberFontSize / 1.7;
    		params.symbolFontSize = Math.floor(params.symbolFontSize);
            params.numberFontSize = Math.floor(params.numberFontSize);
        }
    	else
        {
        	// no main offer => use big image that will cover this area:
        	params.useBigImage = true;
        }

        params.showClaim = params.isListItem && this.model.get('isClaimed');//TODO: check if expired?
        params.largeImage = this.model.get('largeImageUrl');
        this.$el.html(couponsTemplates.couponPrimaryTemplate(params));
        this._showClaim();
        this.model.bind('change', this._showClaim.hitch(this));
        return this;
    }
}); var CouponDetailsPageView = Backbone.View.extend(
{	
	attributes:{
        "data-role": "page"
    },

    render: function()
	{
//        var params = {};
//		this.$el.html(couponsTemplates.scroller_tpl(params));
		var itemView = new CouponFullView({ 
			model:this.model 
		});
//
//		this.$('.scroller').html(itemView.render().el);
//
//		// intialize the scrolling.
//        Scrolling.init(this.$('.scroll_wrapper'));

		this.$el.html(itemView.render().el);
		return this;
	}
	
}); /**
 * Full view of coupon, can be on details page or in "lonely item" in the first page
 * 
 * */
var CouponFullView = Backbone.View.extend(
{
    className: "CouponFullView",

	render: function() 
	{
		var useDividedScreen = (LAYOUT === layoutFormat.wide);
		// the "data" (or "data1") view:
		var data1View = new CouponDataView({
			model:this.model, 
			useDividedScreen : useDividedScreen
		});
		
		if (useDividedScreen)
		{
			// the "data2"  view:
			var data2View = new CouponData2View({
				model:this.model
			});

			// the DividedScreenView:
			var dividedScreenView = new DividedScreenView({id: 'divided_screen_' + Utils.Helpers.generateGUID()});
			dividedScreenView.setView1(data1View.render());
			// TODO: maybe the default of DividedScreenView should be without the data-role:page?
			dividedScreenView.$el.removeAttr('data-role');
			this.$el.html(dividedScreenView.render().el);
			// NOTE: we need "setView2" only here (= not 2 code-lines above, near the setView1...), if we want the scroller to work. TODO: fix it.
			dividedScreenView.setView2(data2View.render());
		}
		else
		{
//	        var params = {};
//			this.$el.html(couponsTemplates.scroller_tpl(params));
//
//			this.$('.scroller').html(data1View.render().el);
//
//			// intialize the scrolling.
//	        Scrolling.init(this.$('.scroll_wrapper'));

			this.$el.html(data1View.render().el);
		}

		
		return this;
	}
	
}); /**
 * the "main data" of the coupon. in DividedScreen (iPad), it is just half of the data.
 *
 * */
var CouponDataView = Backbone.View.extend(
{
	className: 'data1',

	render: function()
	{
	    var params = {};
		this.$el.html(couponsTemplates.scroller_tpl(params));
		var $scroller = this.$('.scroller');

		var dealDetails = this.model.get('dealDetails');
        var linkUrl = this.model.get('linkUrl');
		var params =
        {
		useDividedScreen: this.options.useDividedScreen
		,pricesBanner: false
		,disclaimer: this.model.get('disclaimer')
		,validFrom: 0
		,validUntil: 0
		,hours: null
		,validityTitle: _T('HtmlTextCouponsTitleValidity')
			,dealDetails: dealDetails
			,detailsTitle: _T('HtmlTextCouponsTitleDealDetails')
			,linkUrl: linkUrl
			,linkCaption: Utils.String.translateIfNeed(this.model.get('linkCaption'))
        };

        var productDiscount = this.model.get('productDiscount');
        if (productDiscount.price && productDiscount.discount)    {
            // NOTE:
            // we have 4 "fields": original price, new price, discount in $, discount in %.
            //		in the prices banner we show the other 3 fields (except the field that we show
            //	in the "main" banner)
            //		field A is always "original price".
            //		field B is sometimes "new price" and sometimes "discount" (sometimes in $, sometimes in %)
            //		field C is always "savings" (sometimes in $, sometimes in %)
            params.pricesBanner = {
                titleA: _T('HtmlTextCouponsTitleOriginalPrice')
                ,numberA: productDiscount.price
                ,symbolA: productDiscount.currencySymbol
                ,symbolB: "" //if remains empty: use "%"
                ,symbolC: "" //if remains empty: use "%"
                ,titleC: _T('HtmlTextCouponsTitleSaving')
            };

            if (productDiscount.offerType === couponsEnums.offerType.FINAL_PRICE)
            {
                params.pricesBanner.titleB = _T('HtmlTextCouponsTitleDiscount');
                params.pricesBanner.numberB = productDiscount.discount;
                if (productDiscount.discountType === couponsEnums.discountType.MONEY)
                {
                    params.pricesBanner.symbolB = productDiscount.currencySymbol;
                    params.pricesBanner.numberC = Math.floor(100 * productDiscount.discount / productDiscount.price);//40%
                }
                else if (productDiscount.discountType === couponsEnums.discountType.PERCENT)
                {
                    params.pricesBanner.symbolC = productDiscount.currencySymbol;
                    params.pricesBanner.numberC = Math.floor(productDiscount.price * productDiscount.discount / 100);//40$
                }
            }
            else //if (productDiscount.offerType === couponsEnums.offerType.DISCOUNT || productDiscount.offerType === couponsEnums.offerType.CUSTOM_... etc.)
            {
                params.pricesBanner.titleB = _T('HtmlTextCouponsTitleNewPrice');
                params.pricesBanner.symbolB = productDiscount.currencySymbol;
                if (productDiscount.discountType === couponsEnums.discountType.MONEY)
                {
                    params.pricesBanner.numberB = parseFloat((productDiscount.price - productDiscount.discount).toFixed(2));//60$
                    params.pricesBanner.numberC = Math.floor(100 * productDiscount.discount / productDiscount.price);//40%
                }
                else if (productDiscount.discountType === couponsEnums.discountType.PERCENT)
                {
                params.pricesBanner.numberB = parseFloat((productDiscount.price * (100 - productDiscount.discount) / 100).toFixed(2));//60$
                    params.pricesBanner.symbolC = productDiscount.currencySymbol;
                    params.pricesBanner.numberC = parseFloat((productDiscount.price * productDiscount.discount / 100).toFixed(2)).toString();//40$
                }
            }
        }

        var validity = this.model.get('validity');

        if (validity.validFrom || validity.validUntil)
        {
            if (validity.validFrom)
            {
                params.validFrom = new Date(validity.validFrom * 1000).format("shortDate");
                params.validFromTitle = _T('HtmlTextCouponsValidFrom');
            }
            if (validity.validUntil)
            {
                params.validUntil = new Date(validity.validUntil * 1000).format("shortDate");
                params.validUntilTitle = _T('HtmlTextCouponsValidUntil');
            }
        }

        if (validity.hours)
        {
            //TODO: this is duplicated code (we have this also in about us template)
            //			move it to "UTILS" function or something like this.
                var hoursOptions = validity.hours;

                if (hoursOptions && hoursOptions.length)
                {
                    var daysNames =
                    [
                        _T("_day1s"),
                        _T("_day2s"),
                        _T("_day3s"),
                        _T("_day4s"),
                        _T("_day5s"),
                        _T("_day6s"),
                        _T("_day7s")
                    ];
                    var firstDayOfWeek = _T("_firstDayOfWeek");
                    for (var j = 0; j < hoursOptions.length; j++)
                    {

                        var days = $.map(hoursOptions[j].days, function(n, i){
                            // fix bug in CP: Sunday is 7 instead of 0:
                            n = (n%7);
                            if (n < firstDayOfWeek)
                            {
                                n += 7;
                            }
                            return n;
                        });

                        days = days.sort();
                        var daysStr = "";
                        for (var k = 0; k < days.length; k++)
                        {
                            daysStr += daysNames[(days[k]%7)];

                            //check the "Sequence" - to check if we
                            //need "-" or "," or nothing:
                            for (var k2 = k + 1; (k2 < days.length) && (days[k2-1] + 1 === days[k2]); k2++);
                            if (k2 > k + 2)
                            {
                                daysStr += '-';
                                //"jump" to the last day of the sequence (after the "k++" of the loop...)
                                k = k2 - 2;
                            }
                            else if (k + 1 < days.length)
                            {
                                daysStr += ', ';
                            }
                        }
                        hoursOptions[j].daysStr = daysStr;
                        hoursOptions[j].hoursStr = hoursOptions[j].startHour + ' - ' + hoursOptions[j].endHour;
                    }
                    params.hours = hoursOptions;
                }
                else
                {
                    params.hours = _T('HtmlTextCouponsNoHours');
                }
        }
		var $fullCoupon = $(couponsTemplates.fullCoupon(params));
		$scroller.html($fullCoupon);

        // if coupon is expired
        var isExpired = this.model.isExpired();
        if (isExpired)
        {
            params.couponExpired = isExpired;
            $scroller.prepend(couponsTemplates.couponExpired(params));
            $fullCoupon.addClass('expired');
        } else {
		// Add "Claim" section:
            if(this.model.get('claim'))
            {
			var claimView = new CouponClaimView({
				model:this.model
			});
			this.$('.claim_container').prepend(claimView.render().el);
            }
        }


		// Add "dealDetails" (HTML) section:
        if (dealDetails)
        {
		var $containerElement = this.$('.deal_details');

		// Render HTML into container using HTML container control
		var htmlContainer = new HtmlContainerControl();
		htmlContainer.renderHtml($containerElement, dealDetails, {changeColors: this.model.get('overrideHtmlColors')});
        }

        //handle click on "linkUrl"
        this.$('.view_original_button').tap(function(e){
            appDriver.openLink(null, null,
            {
                'url': linkUrl
                //,'title': linkUrl //Do we need this "title" field?
            });
        });

		// Add "Primary" section:
		var itemView = new CouponPrimaryView({
			model:this.model,
			isListItem : false,
			useDividedScreen: this.options.useDividedScreen
		});
		this.$('.primary_container').html(itemView.render().el);

		// Add "Share" button:
        var $buttonsContainer = this.$('.share_container');
        ShareControlHelper.addShareControlButton($buttonsContainer, this.model);

		// intialize the scrolling.
        var $scrollWrapper = this.$('.scroll_wrapper');
	    Scrolling.init($scrollWrapper);
	    //TODO: why do we need also "onContentChanged" and not just "init"?
	    Scrolling.onContentChanged($scrollWrapper);
		return this;
	}

}); /**
 * the 2nd part of the divided screen details page of iPad
 *
 * */
var CouponData2View = Backbone.View.extend(
{
	className: 'data2 clr_contTypeB_bg',

	render: function()
	{
	    var params = {};
		this.$el.html(couponsTemplates.scroller_tpl(params));
		var $scroller = this.$('.scroller');
		var $scrollWrapper = this.$('.scroll_wrapper');
		var dealDetails = this.model.get('dealDetails');

		var params =
        {
			title: this.model.get('title')
			,description: this.model.get('description')
			,largeImage: this.model.get('largeImageUrl')
			,dealDetails: dealDetails
			,detailsTitle: _T('HtmlTextCouponsTitleDealDetails')
            ,imageUrl: this.model.get('imageUrl')
        };

		var $fullCoupon = $(couponsTemplates.data2(params));
		$scroller.html($fullCoupon);

        // do we want/need this?
		$scroller.find('IMG').load(function ()
        {
            // Call refresh scroll callback
            Scrolling.onContentChanged($scrollWrapper);
        }.hitch(this)).error(function ()
        {
            $(this).remove();
        });


        // if coupon is expired
        if (this.model.isExpired())
        {
            this.$el.addClass('expired');
        }

		// Add "dealDetails" (HTML) section:
        if (dealDetails)
        {
		var $containerElement = this.$('.deal_details');

		// Render HTML into container using HTML container control
		var htmlContainer = new HtmlContainerControl();
		htmlContainer.renderHtml($containerElement, dealDetails, {changeColors: this.model.get('overrideHtmlColors'), colorType: "B"});
        }

		// intialize the scrolling.
	    Scrolling.init($scrollWrapper);

		return this;
	}

}); /**
 * View of "claim button" or "coupon claimed".
 * This view is responsible for show the wanted state, save/load the "claim" in local storage, and
 * 	send usage to the server. 
 * */
var CouponClaimView = Backbone.View.extend(
{	
	className: 'CouponClaimView color_claim_content',

	events: 
	{
		'tap .clickable_button': 'claimCoupon'
	},

	render: function()
	{
        this.$claimed = $(this.getClaimed());
        this.$el.html(this.$claimed);
        if (this.model.get('isClaimed'))
        {
//            this.$claimed.removeClass('out');
        }
        else
        {
            this.$claimed.addClass('out');
            this.$notClaimed = $(this.getNotClaimed());
            this.$el.append(this.$notClaimed);
        }

		return this;
	},

	getNotClaimed: function()
	{
        var params = 
        {
        	txt: _T('HtmlTextCouponsClaimButton')
        };
		
		return couponsTemplates.claimCoupon(params);
	},

    getClaimed: function()
	{
        var params = 
        {
        	txt: _T('HtmlTextCouponsCouponClaimedLongText')
        };
		
		return couponsTemplates.couponClaimed(params);
	},

	// add "coupon claimed" event
	addClaimUsage: function()
	{
		// track in analytics.
        UsageManager.addEvent( analytics.usageEventTypeEnum.CouponClaimed,
    		{
    			couponId: this.model.get('id')
	},	
                true);
        },

	claimCoupon: function() 
	{
//		// show message:
//		uiDriver.showToastMessage(null, null, _T('ToastMessageCouponsClaimSuccess'), this.$el);

		// save to local storage:
		this.model.setClaimed();
		// add event:
		this.addClaimUsage();

		// render the view with animation:
        this.$claimed.addClass('animation');
        this.$notClaimed.addClass('animation');

        this.$claimed.removeClass('out');
        this.$notClaimed.addClass('out');

        // make it not clickable again during the animation...
        this.$notClaimed.removeClass('clickable_button');
	}
	
}); var couponsTemplates = 
{
scroller_tpl : _.template('<div class="scroll_wrapper"><div class="scroller"></div></div>'),

//list_tpl : _.template(
//'<div class="lonely_item_container"></div>' +
//'<div class="scroll_wrapper"><div class="scroller">' +
//	'<div class="list_container"></div>' +
//'</div></div>'),

list_item_tpl : _.template(
'<div class="item_container clr_contTypeB_bubbleItem_bg clr_contTypeB_bubbleItem_brdr box" data-role="button">' +
'</div>'),

couponExpired: _.template(	
'<div class="expired-wrapper">\
   <div class="expired-ribbon-wrapper"><div class="expired-ribbon clr_appGeneral_ribbon_bg clr_appGeneral_ribbon_brdr clr_appGeneral_ribbon_txt"><%= couponExpired %></div></div>\
</div>'),

couponPrimaryTemplate: _.template(
'<% if (!useDividedScreen) { %>' +
    '<% if (isListItem && isGrid) { %> <div class="fixedHeightTexts"> <% } %>' +
    '<div class="couponClaimContainer"> </div>'+
	'<% if (title) { %> ' +
		'<div class="responsive size_title_3 max_2_lines title <%=classPrefix %>_hdlTxt"><%= title %></div>' +
	'<% } %> ' +
	'<% if (description && !(isListItem && isGrid && showClaim)) { %> ' +
		'<div class="responsive size_1 max_3_lines description <%=classPrefix %>_txt"><%= description %></div>' +
	'<% } %> ' +
//	'<% if (description) { %> ' +
//		'<div class="<% if (isListItem && isGrid && showClaim) { %> _1_line <% } %> responsive size_1 max_3_lines description <%=classPrefix %>_txt"><%= description %></div>' +
//	'<% } %> ' +
    '<% if (isListItem && isGrid) { %> </div> <% } %>' +
'<% } %> ' +
'<% if (!useDividedScreen || !useBigImage) { %> ' +
'<div class="<% if (useDividedScreen) { %>top_banner box<% } else { %>main_banner<% } %> <%=classPrefix %>_subBg"> ' +
	'<% if (!useDividedScreen) { %> ' +
	'<div class="image sliced_image <% if (!isListItem) { %> open_gallery <% } if (useBigImage) { %> big <% } %>" style="background-image:url(\'<%= imageUrl %>\')">' +
		'<% if (!isListItem && largeImage) { %> <div class="full_screen_hint sprite sprite-FullScreenIcon"></div> <% } %>' +
	'</div> ' +
	'<% } %> ' +
	'<% if (!useBigImage){ %> ' +
		'<% if (useDividedScreen) { %> ' +
			'<div class="horizontal_center">' +
		'<% } else { %> ' +
			'<div class="offer_container"><div class="vertical_center"><div> ' +
		'<% } %> ' +
			'<% if (upperTitle) { %> ' +
				'<div class="element responsive size_0 _1_line upperTitle <%=classPrefix %>_subTxt"><%=upperTitle%></div> ' +
			'<% } %> ' +
			'<% if (discountImage) { %> ' +
				'<img class="element discountImage" src="<%= discountImage %>" />' +
			'<% } else { %> ' +
				'<div class="element mainOfferTitle <%=classPrefix %>_hdlTxt" dir="ltr"> ' +
					'<span class="symbol currencySymbol" style="font-size:<%= symbolFontSize %>px"><%=currencySymbol%></span> ' +
					'<span class="offerTitle" style="font-size:<%= numberFontSize %>px"><%=offerTitle%></span> ' +
					'<span class="symbol percentSymbol" style="font-size:<%= symbolFontSize %>px"><%=percentSymbol%></span> ' +
				'</div> ' +
			'<% } %> ' +
			'<% if (lowerTitle) { %> ' +
				'<div class="element responsive size_0 _1_line lowerTitle <%=classPrefix %>_subTxt"><%=lowerTitle%></div> ' +
			'<% } %> ' +
		'<% if (useDividedScreen) { %> ' +
			'</div> ' +
		'<% } else { %> ' +
			'</div></div></div>' +
		'<% } %> ' +
	'<% } %> ' +
'</div><% } %>'),

couponShowClaimTemplate: _.template(
    '<div class="CouponClaimView_inList color_claim_content">' +
        '<img class="iconV_inList" src="app/interface/web/img/check.svg"/>' +
        '<span class="couponClaimedText_inList color_claim_text"><%= CouponsCouponClaimed %></span>' +
    '</div>'
),
data2: _.template(
'<div class="box_padding">\
<% if (title) { %> \
	<div class="responsive size_title_3 title clr_contTypeB_hdlTxt"><%= title %></div>\
<% } %> \
<% if (description) { %> \
	<div class="responsive  description clr_contTypeB_txt"><%= description %></div>\
<% } %> \
<% if (largeImage) { %> \
	<img class="largeImage" src="<%= largeImage %>" />\
<% } %> \
<% if (dealDetails) { %> \
	<div class="coupon_description">\
		<div class="details_title responsive  clr_contTypeB_hdlTxt"><%= detailsTitle %></div>\
		<div class="deal_details clr_contTypeB_txt"></div>\
	</div>\
<% } %>\
</div>'),


listItemDates: _.template(	
'<div class="dates_container responsive size_0 _1_line"> \
	<% if (startStr) { %> \
		<div class="left startStr clr_contTypeB_subTxt"><%= startStr %></div>\
		<div class="left formattedValidFrom clr_contTypeB_hdlTxt"><%= formattedValidFrom %></div>\
	<% } %> \
	<% if (endStr) { %> \
		<div class="right formattedValidUntil clr_contTypeB_hdlTxt"><%= formattedValidUntil %></div>\
		<div class="right endStr clr_contTypeB_subTxt"><%= endStr %></div>\
	<% } %> \
</div>'),

claimCoupon: _.template(
'<a class="claim_button color_claim_button clickable_button out_small" data-role="button">' +
	'<%= txt %>' +
'</a>'),
	
couponClaimed: _.template(
'<div class="couponClaimed out_big">' +
	'<img class="iconV" src="app/interface/web/img/check.svg"/>' +
    '<div class="vertical_center claimedBoxText"><div class="couponClaimedText color_claim_text"><%= txt %></div></div>' +
'</div>'),

fullCoupon: _.template(
'<div class="box clr_contTypeA_bg clr_contTypeA_brdr">\
	<div class="claim_container"></div>\
	<div class="primary_container"></div>\
	<% if (pricesBanner) { %> \
		<div class="banner box clr_contTypeA_subBg clr_contTypeA_hdlTxt responsive size_0">' +
			'<div class="boxA prices_box" dir="ltr">' +
				'<span class="boxSymbol currencySymbol"><%=pricesBanner.symbolA%></span>' +
				'<span class="boxNumber responsive size_title_3"><%=pricesBanner.numberA%></span>' +
				'<div class="boxTitle clr_contTypeA_subTxt"><%=pricesBanner.titleA%></div>' +
			'</div>' +
			'<div class="boxB prices_box" dir="ltr">' +
				'<% if (pricesBanner.symbolB) { %><span class="boxSymbol currencySymbol"><%=pricesBanner.symbolB%></span><% } %>' +
				'<span class="boxNumber responsive size_title_3"><%=pricesBanner.numberB%></span>' +
				'<% if (!pricesBanner.symbolB) { %><span class="boxSymbol percentSymbol">%</span><% } %>' +
				'<div class="boxTitle clr_contTypeA_subTxt"><%=pricesBanner.titleB%></div>' +
			'</div>' +
			'<div class="boxC prices_box" dir="ltr">' +
				'<% if (pricesBanner.symbolC) { %><span class="boxSymbol currencySymbol"><%=pricesBanner.symbolC%></span><% } %>' +
				'<span class="boxNumber responsive size_title_3"><%=pricesBanner.numberC%></span>' +
				'<% if (!pricesBanner.symbolC) { %><span class="boxSymbol percentSymbol">%</span><% } %>' +
				'<div class="boxTitle clr_contTypeA_subTxt"><%=pricesBanner.titleC%></div>' +
			'</div>' +
		'</div>' +
	'<% } %>' +
	'<% if (disclaimer) { %> ' +
		'<div class="responsive size_1 disclaimer banner box clr_contTypeA_subBg clr_contTypeA_txt"><%= disclaimer %></div>' +
	'<% } %> ' +
	'<div class="share_container"></div>' +
'</div>' +
'<% if (hours || validFrom || validUntil || dealDetails || linkUrl) { %> ' +
'<div class="clr_contTypeB_bg validity">' +
	'<% if (hours || validFrom || validUntil) { %> ' +
		'<div class="new_box clr_contTypeB_brdr responsive size_title_1 clr_contTypeB_hdlTxt"><%= validityTitle %></div>' +
	'<% } %> ' +
	'<% if (validFrom || validUntil) { %> ' +
	 '<div class="validity_box box clr_contTypeB_brdr">' +
		'<div class="val_icon mask_sprite sprite-cal clr_contTypeB_icn"></div>' +
		//'<div class="vertical_center">' +
        '<div class="val_texts_container">' +
            '<% if (validFrom) { %> ' +
                '<div class="val_text clr_contTypeB_txt responsive size_1"><span class="val_mini_title responsive size_title_1 clr_contTypeB_hdlTxt"><%= validFromTitle %></span><time><%= validFrom %></time></div>' +
            '<% } %> ' +
            '<% if (validUntil) { %> ' +
                '<div class="val_text clr_contTypeB_txt responsive size_1"><span class="val_mini_title responsive size_title_1 clr_contTypeB_hdlTxt"><%= validUntilTitle %></span><time><%= validUntil %></time></div>' +
            '<% } %> ' +
        '</div>' +
        //'</div>' +
	 '</div>' +
	'<% } if (hours) { %> ' +
	 '<div class="validity_box box clr_contTypeB_brdr">' +
		'<div class="val_icon mask_sprite sprite-clock clr_contTypeB_icn"></div>' +
		'<div class="val_texts_container">' +
        '<% if (_.isString(hours)) {%>' +
            '<div class="val_text clr_contTypeB_txt responsive size_1"><span class="val_mini_title responsive size_title_1 clr_contTypeB_hdlTxt"><%= hours %></span></div>' +
        '<% } else {%>' + //"else" mean it is an array
            '<% for(var hour in hours) { %>' +
                '<div class="val_text clr_contTypeB_txt responsive size_1"><span class="val_mini_title responsive size_title_1 clr_contTypeB_hdlTxt"><%= hours[hour].daysStr %></span><time><%= hours[hour].hoursStr %></time></div>' +
            '<% } %>' +
        '<% } %>' +
		'</div>' +
	 '</div>' +
	'<% } %> ' +
	'<% if (!useDividedScreen && dealDetails) { %> ' +
		'<div class="new_box">' +
			'<div class="details_title responsive size_title_1 clr_contTypeA_hdlTxt"><%= detailsTitle %></div>' +
			'<div class="deal_details responsive size_1 clr_contTypeA_txt"></div>' +
		'</div>' +
	'<% } %> ' +
	'<% if (linkUrl) { %> ' +
		'<div class="urlBtn box">' +
			'<a class="view_original_button clr_contTypeA_actBtn_bg clr_contTypeA_actBtn_brdr clr_contTypeA_actBtn_hdlTxt"href="javascript:void(0)"><%= linkCaption %></a>' +
		'</div>' +
	'<% } %> ' +
'</div>' +
'<% } %>')

}; 

var agendaTemplates = {};


agendaTemplates.homePageTemplate = _.template(
'<div class="scroll_wrapper"><div class="scroller">' +
'</div></div>' // scroll_wrapper + scroller
);

agendaTemplates.dateHeaderTemplate = _.template(
'<a class="date-button prev clr_contTypeB_btn_bg clr_contTypeB_btn_brdr clr_contTypeB_btn_hdlTxt" data-role="button">' +
	'<div class="nav_icon mask_sprite sprite-arrow-left clr_contTypeB_btn_icn"></div>' +
'</a>' +
'<a class="date-button next clr_contTypeB_btn_bg clr_contTypeB_btn_brdr clr_contTypeB_btn_hdlTxt" data-role="button">' +
	'<div class="nav_icon mask_sprite sprite-arrow-right clr_contTypeB_btn_icn"></div>' +
'</a>' +
'<div class="day_caption clr_contTypeB_hdlTxt"></div>' +
'<div class="date_caption clr_contTypeB_hdlTxt"></div>'
);

agendaTemplates.hallHeaderTemplate = _.template(
'<div class="triangle up clr_tab2Bar_triangle"></div>' +
'<div class="triangle down clr_tab2Bar_triangle"></div>' +
'<div class="slideable_bar">' +
	'<a class="center hall_caption clr_tab2Bar_item_txt selected clr_tab2Bar_item_bg"><div class="hall_container ellipsis"><%= name %></div></a>' +
	'<% if(prev){ %>' +
		'<a class="prev hall_caption clr_tab2Bar_item_txt clr_tab2Bar_item_bg"><div class="hall_container ellipsis"><%= prev %></div></a>' +
	'<% } %>' +
	'<% if(next){ %>' +
		'<a class="next hall_caption clr_tab2Bar_item_txt clr_tab2Bar_item_bg"><div class="hall_container ellipsis"><%= next %></div></a>' +
	'<% } %>' +
	'<% if(prev2){ %>' +
		'<a class="prev2 hall_caption clr_tab2Bar_item_txt clr_tab2Bar_item_bg"><div class="hall_container ellipsis"><%= prev2 %></div></a>' +
	'<% } %>' +
	'<% if(next2){ %>' +
		'<a class="next2 hall_caption clr_tab2Bar_item_txt clr_tab2Bar_item_bg"><div class="hall_container ellipsis"><%= next2 %></div></a>' +
	'<% } %>' +
'</div>'
);

agendaTemplates.calendarTemplate = _.template(
'<div class="calendar" style="height:<%= calHeight %>px;"></div>' +
'<div class="sessionsContainer" style="height:<%= calHeight %>px;"></div>'
);

// e.g.: the lines of 8:00 and 8:15:
agendaTemplates.calendarBoxTemplate = _.template(
'<div class="calendar_box clr_contTypeA_calBoxBrdr1" style="height:<%= height %>px;top:<%= top %>px;"></div>'
);
//e.g.: the lines of 8:30 and 8:45:
agendaTemplates.calendarBox2Template = _.template(
'<div class="calendar_box clr_contTypeA_calBoxBrdr2" style="height:<%= height %>px;top:<%= top %>px;"></div>'
);

agendaTemplates.calendarTimeTemplate = _.template(
'<div class="calendar_time clr_contTypeA_txt" style="top:<%= top %>px;">' +
	'<%= time %>' +
'</div>'
);

agendaTemplates.singleLineEvent = _.template(
'<div class="event_title single_line clr_contTypeA_<%= colorCode %>_hdlTxt">' +
	'<%= title %>' +
'</div>' +
'<div class="event_time single_line clr_contTypeA_<%= colorCode %>_subTxt">' +
	'<%= time %>' +
'</div>'
);

agendaTemplates.multiLinesEvent = _.template(
'<div class="event_title multi_lines" style="max-height:<%= textMaxHeight %>px;">' +
	'<div class="clr_contTypeA_<%= colorCode %>_hdlTxt' +
	'<% if(ellipsis){ %>' +
	' ellipsis' +
	'<% } %>' +
	'" style="line-height:<%= textLineHeight %>px;">' +
		'<%= title %>' +
	'</div>' +
	'<div class="event_description clr_contTypeA_<%= colorCode %>_txt" style="line-height:<%= textLineHeight %>px;">' +
		'<%= description %>' +
	'</div>' +
'</div>' +
'<div class="event_location clr_contTypeA_<%= colorCode %>_subTxt' +
'<% if(ellipsis){ %>' +
' ellipsis' +
'<% } %>' +
'" style="max-height:<%= locationMaxHeight %>px;line-height:<%= textLineHeight %>px;">' +
	'<%= location %>' +
'</div>' +
'<div class="event_time multi_lines clr_contTypeA_<%= colorCode %>_subTxt">' +
	'<%= time %>' +
'</div>' +
'<div class="event_speakers clr_contTypeA_<%= colorCode %>_subTxt">' +
	'<%= speaker %>' +
'</div>' +
'<% if(USE_AGENDA_FAVORITES){ %>' +
'<div class="fav_button_container clr_contTypeA_<%= colorCode %>_btn_bg"></div>' +
'<% } %>'
);

agendaTemplates.addFavButton = _.template(
'<div class="fav_icon mask_sprite sprite-starEmpty clr_contTypeA_contentSession_btn_icn"></div>'
);
agendaTemplates.removeFavButton = _.template(
'<div class="fav_icon mask_sprite sprite-starFull clr_contTypeA_contentSession2_btn_icn"></div>'
);

agendaTemplates.fullSession = _.template(
'<div class="scroll_wrapper"><div class="scroller">' +
	'<div class="itemContainer clr_contTypeA_bg clr_contTypeA_brdr t3d feed_classic_item">' +
		'<div class="session_title clr_contTypeA_hdlTxt">' +
			'<%= title %>' +
		'</div>' +
		'<% if(date){ %>' +
			'<div class="left agenda_icon mask_sprite sprite-speakers-date clr_contTypeA_subIcn"></div>' +
			'<div class="left session_date session_text clr_contTypeA_txt">' +
				'<%= date %>' +
			'</div>' +
			'<div class="clearfix"></div>' +
		'<% } %>' +
		'<% if(time){ %>' +
			'<div class="left agenda_icon mask_sprite sprite-speakers-time clr_contTypeA_subIcn"></div>' +
			'<div class="left session_text clr_contTypeA_txt">' +
				'<%= time %>' +
			'</div>' +
			'<div class="clearfix"></div>' +
		'<% } %>' +
		'<% if(location){ %>' +
			'<div class="left agenda_icon mask_sprite sprite-speakers-location clr_contTypeA_subIcn"></div>' +
			'<div class="left session_location session_text clr_contTypeA_txt">' +
				'<%= location %>' +
			'</div>' +
			'<div class="clearfix"></div>' +
		'<% } %>' +
		'<div class="buttonsContainer"></div>' +
	'</div>' +
	'<% if(speakersStr || description){ %>' +
		'<div class="itemContainer clr_contTypeB_headerItem_bg clr_contTypeB_headerItem_brdr">' +
			'<% if(description){ %>' +
				'<div class="session_description_title clr_contTypeB_hdlTxt">' +
					'<%= detailsStr %>' +
				'</div>' +
				'<div class="session_description session_text clr_contTypeB_txt">' +
					'<%= description %>' +
				'</div>' +
			'<% } %>' +
			'<% if(speakersStr){ %>' +
				'<div class="session_speakers clr_contTypeB_subTxt">' +
					'<%= speakersStr %>' +
				'</div>' +
			'<% } %>' +
		'</div>' +
		'<ul class="speakersContainer"></ul>' +
	'<% } %>' +
'</div></div>' // scroll_wrapper + scroller
);

agendaTemplates.speakerInSession = _.template(
'<div class="slide_arrow_image mask_sprite sprite-arrow clr_contTypeB_icn"></div>' +
'<% if(image){ %>' +
	'<img class="speakerImage" src="<%= image %>" />' +
'<% } %>' +
'<div class="dataContainer">' +
	'<div class="speakerName clr_contTypeB_hdlTxt ellipsis"><%= name %></div>' +
	'<div class="speakerTitle clr_contTypeB_subTxt ellipsis"><%= title %></div>' +
'</div>'
);

agendaTemplates.fullSpeaker = _.template(
'<div class="scroll_wrapper"><div class="scroller">' +
	'<div class="itemContainer clr_contTypeA_bg clr_contTypeA_brdr t3d feed_classic_item">' +
		'<% if(typeof(image)!= "undefined" && image){ %>' +
			'<img class="speakerBigImage" src="<%= image %>" />' +
		'<% } %>' +
		'<div class="dataContainer">' +
			'<div class="speaker_name clr_contTypeA_hdlTxt"><%= name %></div>' +
			'<div class="speaker_title clr_contTypeA_subTxt"><%= jobTitle %></div>' +
			'<div class="speaker_company clr_contTypeA_subTxt"><%= companyName %></div>' +
		'</div>' +
		'<div class="clearfix"></div>' +
		'<% if(typeof(bio)!= "undefined" && bio){ %>' +
			'<div class="bioStaticText clr_contTypeA_hdlTxt"><%= bioStaticText %></div>' +
			'<div class="speaker_bio clr_contTypeA_txt"><%= bio %></div>' +
		'<% } %>' +
		'<div class="share-icons-container"></div>' +
	'</div>'+
	'<ul class="sessionsContainerInSpeaker"></ul>' +
'</div></div>' // scroll_wrapper + scroller
);

agendaTemplates.sessionInSpeaker = _.template(
'<div class="slide_arrow_image mask_sprite sprite-arrow clr_contTypeB_icn"></div>' +
'<div class="session_title_in_speaker ellipsis clr_contTypeB_hdlTxt">' +
	'<%= title %>' +
'</div>' +
'<div class="left icon_in_speaker mask_sprite sprite-speakers-date clr_contTypeB_subIcn"></div>' +
'<div class="left session_date session_text_in_speaker clr_contTypeB_txt">' +
	'<%= date %>' +
'</div>' +
'<div class="right session_text_in_speaker clr_contTypeB_txt">' +
'<%= time %>' +
'</div>' +
'<div class="right icon_in_speaker mask_sprite sprite-speakers-time clr_contTypeB_subIcn"></div>'
);

agendaTemplates.speakerInList = _.template(
'<% if(typeof(image)!= "undefined" && image){ %>' +
	'<img class="speakerBigImage" src="<%= image %>" />' +
'<% } %>' +
'<div class="dataContainer">' +
	'<div class="speaker_name clr_contTypeB_hdlTxt"><%= name %></div>' +
	'<div class="speaker_title clr_contTypeB_subTxt"><%= jobTitle %></div>' +
	'<div class="speaker_company clr_contTypeB_subTxt"><%= companyName %></div>' +
'</div>' +
'<div class="clearfix"></div>' +
'<% if(typeof(bio)!= "undefined" && bio){ %>' +
	'<div class="speaker_bio short clr_contTypeB_txt"><%= bio %></div>' +
'<% } %>' +
'<% if(typeof(nextSessionTitle)!= "undefined" && nextSessionTitle){ %>' +
	'<div class="nextSessionTitle ellipsis clr_contTypeB_hdlTxt clr_contTypeA_hdlTxtBrdr"><%= nextSessionTitle %></div>' +
	'<div class="dates_container">' +
		'<div class="left icon_in_speaker mask_sprite sprite-speakers-date clr_contTypeB_subIcn"></div>' +
		'<div class="left session_date session_text_in_speaker clr_contTypeB_txt">' +
			'<%= nextSessionDate %>' +
		'</div>' +
		'<div class="right session_text_in_speaker clr_contTypeB_txt">' +
			'<%= nextSessionTime %>' +
		'</div>' +
		'<div class="right icon_in_speaker mask_sprite sprite-speakers-time clr_contTypeB_subIcn"></div>' +
	'</div>' +
'<% } %>'
); /**
* The agenda model. Communicates with the CMS to get the data, and create 
* 	a collection with 1 item of "conference" 
*/
var AgendaModel = ItemsModel.extend(
{
    createItemsCollection: function ()
    {
		var agendaCollection = new AgendaCollection(null, this.get('params'));

    	return agendaCollection;
    },

    /**
     * OVERRIDE
     */
    getItemForAlias: function (alias)
    {
        var items = this.get('items');

        //we have the "getItemForAlias" in ConferenceModel:
        var cModel = items.at(0);
        return cModel && cModel.getItemForAlias(alias);
    }

}); var ConferenceModel = Backbone.Model.extend({
    
	// TODO: maybe we need to change it, for only this conference
	// (maybe "+ conferenceId", but it is still not good: maybe will be some
	//	pages/tabs with the same conferenceId)
	//	current state is working: the array will include session IDs from all conferences,
	//	but maybe we have problems when opening page 1, going to page 2, do "adding
	//	 to favorites" and back to page 1 and do "add to favorites" again...
	// possible solution: read it from storage every time before save. 
	FAVORITES_ARRAY_STORAGE_KEY: "AGENDA_FAVORITES_ARRAY",
		
	_favoritesSessionsArray: [],
	
	defaults:
    {
        description: ""
        ,conferenceId: ""
        ,halls: null
        ,name: ''
        ,sessions: null
        ,speakers: null
        // index in "hallsInDateCollection"
        ,currHallIndex: 0
        ,currHallId: 0
        ,currDate: 0
        ,minDate: 0
        ,maxDate: 0
        ,hallsCollection: null
		,speakersCollection: null
    	,sessionsCollection: null
    	,isFavMode: false
        ,hallsInDateCollection: null
    },

    initialize: function ()
    {
    	// NOTE: we get all "times" in "Seconds from 1970", so we
    	//	do "*1000" for "mSec from 1970", and we need this as "UTC"
    	// so we add the timezone offset (in mSec)
    	
    	this._getFavoritesFromStorage();
    	
    	//change the halls, sessions and speakers from array of dictionaries to 
    	//	collections of model 
    	var hallsCollection = new Backbone.Collection();
		_.each(this.get('halls'), function (item) 
		{
			item.id = item.hallId;
			hallsCollection.add(item);
		});
        
    	var speakersCollection = new SpeakersCollection();
		_.each(this.get('speakers'), function (item, i) 
		{
			item.id = item.speakerId;
			item.alias = Utils.Html.fixAlias(item.alias || item.id || ('speaker_' + (i+1)));
			speakersCollection.add(item);
		});

    	var sessionsCollection = new SessionsCollection();
		_.each(this.get('sessions'), function (item, i) 
		{
			item.id = item.sessionId;
			item.alias = Utils.Html.fixAlias(item.alias || item.id || ('session_' + (i+1)));
			item.startDate = Utils.TimeDate.toUTCTime(item.startDate);
			item.endDate = Utils.TimeDate.toUTCTime(item.endDate);

			item.conferenceName = this.get('name');

			// Calc if exists in the favorites array: 
			item.isInFavorites = (this._favoritesSessionsArray.indexOf(item.id) > -1);

			// add the MODELs of hall and speakers (= not just the IDs)
			item.hallModel = hallsCollection.get(item.hallId);
			if (item.speakers)
			{
				item.speakersModels = $.map(item.speakers, function(speakerId){
				      return speakersCollection.get(speakerId);
			    });
			}
			else
			{
				item.speakersModels = [];
			}
			sessionsCollection.add(item);
		}.hitch(this));
		
		// handle the favorites state: save to storage every change:
		sessionsCollection.bind('change:isInFavorites', this._onFavoritesChanged, this);

		// add to each speaker all of his sessions:
		speakersCollection.each(function (speakerModel) 
		{
			var sessionsModels = [];

			sessionsCollection.each(function (sessionModel) 
			{
				if (_.include(sessionModel.get("speakers"), speakerModel.get('id')))
				{
					sessionsModels.push(sessionModel);
				}
			});
			speakerModel.set({sessionsModels: sessionsModels});
		});
		
		// find min, max and curr dates:
		var currDate = AgendaTemplateHelper.trimTime(new Date()).getTime();
		
		if (sessionsCollection.length)
		{
			var maxDate = 0;
			var minDate = 9999999999999;
			sessionsCollection.each(function (sessionModel) 
			{
				var date = sessionModel.get('startDate');
				date = AgendaTemplateHelper.trimTime(new Date(date)).getTime();
				if (date > maxDate)
				{
					maxDate = date;
				}
				if (date < minDate)
				{
					minDate = date;
				}
			});
		}
		else
		{
			var maxDate = currDate;
			var minDate = currDate;
		}
		
		if (currDate > maxDate || currDate < minDate)
		{
			currDate = minDate;
		}
		
        this.set({
        	currDate: currDate,
        	minDate: minDate,
        	maxDate: maxDate,
        	hallsCollection: hallsCollection,
        	speakersCollection: speakersCollection,
        	sessionsCollection: sessionsCollection
        });

		//create hallsInDateCollection and its stuff...
		this._updateHallsInDate();

    },

    /**
     * function for changes in the url - get the model of the item (SpeakerModel / SessionModel)
     * with the alias "alias"
     * 
     * @param {string} alias - the alias of the wanted item
     * @return {SpeakerModel / SessionModel} item - the item with this alias. null if doesn't exist
     */
    getItemForAlias: function (alias)
    {
    	var speakersCollection = this.get('speakersCollection');
		for (var i = 0; i < speakersCollection.length; i++) 
		{
			var item = speakersCollection.at(i);
			if (item.get('alias') === alias)
			{
				return item;
			}
		};

    	var sessionsCollection = this.get('sessionsCollection');
		for (var i = 0; i < sessionsCollection.length; i++) 
		{
			var item = sessionsCollection.at(i);
			if (item.get('alias') === alias)
			{
				return item;
			}
		};

		return null;
    },
    
    _updateHallsInDate: function(model)
	{
    	var hallsInDateCollection = new Backbone.Collection();
		var hallsCollection = this.get('hallsCollection');
		var currDate = this.get('currDate');

		for(var i = 0; i < hallsCollection.length; i++) 
		{
			var hallModel = hallsCollection.at(i);
			if (this.isSessionsInHall(hallModel))
			{
				hallsInDateCollection.add(hallModel);
			}
		}
		
		// try to return to last hall (if exist in both prev & new)
    	var currHallId = this.get('currHallId');
    	var currHallIndex = 0;
    	if (currHallId)
    	{
    		for(var i = 0; i < hallsInDateCollection.length; i++) 
    		{
    			var hallModel = hallsInDateCollection.at(i);
    			if (hallModel.get('id') === currHallId)
    			{
					currHallIndex = i;
					break;
    			}
    		}
    	}

		var hallModel = hallsInDateCollection.at(currHallIndex);
		if (hallModel)
		{
			currHallId = hallModel.get('id');
		}
		else
		{
			currHallId = null;
		}

    	this.set({hallsInDateCollection: hallsInDateCollection,
    			currHallId: currHallId,
    			currHallIndex: currHallIndex});
	},
    
    _onFavoritesChanged: function(sessionModel)
	{
    	if (sessionModel.get('isInFavorites'))
    	{
    		this._addSessionToFavorites(sessionModel.get('id'));
    	}
    	else
    	{
    		this._removeSessionFromFavorites(sessionModel.get('id'));
    	}
	},

   	/**
     * Update the "_favoritesSessionsArray" from the local storage
     *
     * @author Matanya
     */
    _getFavoritesFromStorage: function ()
	{
        var cachedItem = storageDriver.getItem(null, null, this.FAVORITES_ARRAY_STORAGE_KEY, true);

        if (cachedItem)
        {
            // Parse cached item
            this._favoritesSessionsArray = JSON.parse(cachedItem);
        }
    },

  	/**
     * Update the local storage from the "_favoritesSessionsArray"
     *
     * @author Matanya
     */
    _setFavoritesToStorage: function ()
	{
        // Stringify cached object
        var cachedItem = JSON.stringify(this._favoritesSessionsArray);

        // Save item into cache
        storageDriver.setItem(null, null, this.FAVORITES_ARRAY_STORAGE_KEY, cachedItem, true);
    },

  	/**
     * Update the local storage and the "_favoritesSessionsArray" with a
     * new sessionId
     *
     * @author Matanya
     */
    _addSessionToFavorites: function (sessionId)
	{
    	var index = this._favoritesSessionsArray.indexOf(sessionId);
    	if (index === -1)
    	{
    		this._favoritesSessionsArray.push(sessionId);
    		this._setFavoritesToStorage();
    	}
    },

  	/**
     * return true iff there are no sessions in the "favorites" list
     *
     * @author Matanya
     */
    isFavoritesEmpty: function ()
	{
    	return (this._favoritesSessionsArray.length === 0);
    },

  	/**
     * return true iff there are session in the "day" param (Integer: mSec from 1970)
     * @param {Integer} day - the start of the day (mSec from 1970) that we check sessions in it
     * @return {Boolean} isSessions - iff there are session in the "day" 
     * @author Matanya
     */
    isSessionsInDate: function (day)
	{
		var sessionsCollection = this.get('sessionsCollection');
		// dayEnd = day + 1 day:
		var dayEnd = day + AgendaTemplateHelper.ONE_DAY;

		for(var i = 0;i < sessionsCollection.length; i++) 
		{
			var sessionModel = sessionsCollection.at(i);
			if (!this.get('isFavMode') || this._favoritesSessionsArray.indexOf(sessionModel.get('id')) > -1)
			{
				var date = sessionModel.get("startDate");
				if (date >= day && date < dayEnd)
				{
					return true;
				}
			}
		}

    	return false;
    },

  	/**
     * return true iff there are session in the "currDate" in the hall param (HallModel)
     * @param {HallModel} hall - the hall that we check sessions in it
     * @return {Boolean} isSessions - iff there are session in the "hall" 
     * @author Matanya
     */
    isSessionsInHall: function (hall)
	{
		var sessionsCollection = this.get('sessionsCollection');
    	var hallId = hall.get('id');
		var currDate = this.get('currDate');
		// currDateEnd = currDate + 1 day:
		var currDateEnd = currDate + AgendaTemplateHelper.ONE_DAY;

		for(var i = 0;i < sessionsCollection.length; i++) 
		{
			var sessionModel = sessionsCollection.at(i);
			if (!this.get('isFavMode') || this._favoritesSessionsArray.indexOf(sessionModel.get('id')) > -1)
			{
				if (sessionModel.get("hallId") === hallId)
				{
					var date = sessionModel.get("startDate");
					
					if (date >= currDate && date < currDateEnd)
					{
						return true;
					}
				}
			}
		}

    	return false;
    },
    
    /**
     * return the closest day (Integer: mSec from 1970) with sessions after the "currDate",
     * if no such day, return null
     *
     * @author Matanya
     */
    getNextDate: function ()
	{
    	for (var currDate = this.get('currDate') + AgendaTemplateHelper.ONE_DAY; 
    			currDate <= this.get('maxDate');
    			currDate += AgendaTemplateHelper.ONE_DAY)
    	{
			if (this.isSessionsInDate(currDate))
			{
				return currDate;
			}
    	}
    	return null;
    },

    
    /**
     * return the closest day (Integer: mSec from 1970) with sessions before the "currDate",
     * if no such day, return null
     *
     * @author Matanya
     */
    getPrevDate: function ()
	{
    	for (var currDate = this.get('currDate') - AgendaTemplateHelper.ONE_DAY; 
    			currDate >= this.get('minDate');
    			currDate -= AgendaTemplateHelper.ONE_DAY)
    	{
			if (this.isSessionsInDate(currDate))
			{
				return currDate;
			}
    	}
    	return null;
    },
    
//  	/**
//     * change the "currDate" to the closest day with sessions before the "currDate",
//     * if no such day, do nothing
//     *
//     * @author Matanya
//     */
//    goPrevDate: function ()
//	{
//		var prevDate = this.getPrevDate();
//		if (prevDate)
//		{
//			//TODO: check if need to change hall
//			this.set({currDate: prevDate});
//		}
//    },
//
//  	/**
//     * change the "currDate" to the closest day with sessions after the "currDate",
//     * if no such day, do nothing
//     *
//     * @author Matanya
//     */
//    goNextDate: function ()
//	{
//		var nextDate = this.getNextDate();
//		if (nextDate)
//		{
//			//TODO: check if need to change hall
//			this.set({currDate: nextDate});
//		}
//    },


    /**
     * change the "isFavMode" to the "newValue" param
     *
     * @author Matanya
     */
    changeFavMode: function (newValue)
	{
//		if (this._inProcess)
//		{
//			return;
//		}
//		this._inProcess = true;
    	this.set({isFavMode: newValue});

		//check if need to change date:
		if (!this.isSessionsInDate(this.get('currDate')))
		{
			var nextDate = this.getNextDate();
			if (nextDate)
			{
				this.set({currDate: nextDate});
			} 
			else
			{
				var prevDate = this.getPrevDate();
				if (prevDate)
				{
					this.set({currDate: prevDate});
				}
			}
		}

		// update the halls in curr date & fav mode:
		this._updateHallsInDate();

		this.trigger("favModeChanged");
//		this._inProcess = false;
	},
    /**
     * change the "currDate" to the "newValue" param
     * @param {Integer} newValue - the new value for currDate 
     * @author Matanya
     */
    changeDate: function (newValue)
	{
//		if (this._inProcess)
//		{
//			return;
//		}
//		this._inProcess = true;

		this.set({currDate: newValue});

		// update the halls in curr date:
		this._updateHallsInDate();

		this.trigger("dateChanged");
		this.trigger("hallChanged");
		this.trigger("calendarChanged");
//		this._inProcess = false;
    },
    /**
     * change the "currHallIndex" to the "newValue" param
     *
     * @author Matanya
     */
    changeHall: function (newValue)
	{
//		if (this._inProcess)
//		{
//			return;
//		}
//		this._inProcess = true;

		this.set({currHallIndex: newValue});

		// update the ID:
		var hallModel = this.get('hallsInDateCollection').at(newValue);
		if (hallModel)
		{
			var currHallId = hallModel.get('id');
		}
		else
		{
			var currHallId = null;
		}
		this.set({currHallId: currHallId});
		
		this.trigger("hallChanged");
		this.trigger("calendarChanged");
//		this._inProcess = false;
    },
    
    
    /**
     * Update the local storage and the "_favoritesSessionsArray": remove the 
     * session with sessionId from favorites
     *
     * @author Matanya
     */
    _removeSessionFromFavorites: function (sessionId)
	{
    	var index = this._favoritesSessionsArray.indexOf(sessionId);
    	if (index > -1)
    	{
    		this._favoritesSessionsArray.splice(index,1);
    		this._setFavoritesToStorage();
    	}
    },
    
 	/**
	 * Return an array with all sessionModel-s in current date and hall
	 * 
	 * @return {array} sessions - array with all sessionModel-s in current date and hall
	 *
	 * @author Matanya
	 */
	getCurrentSessions: function()
	{
		var sessionsModels = [];
		
		var currHallId = this.get('currHallId');
		var currDate = this.get('currDate');
                                                    
		if (currDate)
		{
			// currDateEnd = currDate + 1 day:
			var currDateEnd = currDate + AgendaTemplateHelper.ONE_DAY;
			
			var sessionsCollection = this.get('sessionsCollection');
			sessionsCollection.each(function (sessionModel) 
			{
				if (!currHallId || sessionModel.get("hallId") === currHallId)
				{
					if (!this.get('isFavMode') || this._favoritesSessionsArray.indexOf(sessionModel.get('id')) > -1)
					{
						var date = sessionModel.get("startDate");
						if (date >= currDate && date < currDateEnd)
						{
							sessionsModels.push(sessionModel);
						}
					}
				}
			}.hitch(this));
		}

		return sessionsModels;
	}
}); var SessionModel = Backbone.Model.extend({
    
    defaults:
    {
        description: ""
        ,title: ""
        ,conferenceId: ""
        ,speakers: null
        ,currHallIndex: 0
        ,startDate: 0
        ,endDate: 0
    },

 	/**
	 * Create and return share info object
	 * 
	 * @return shareInfo - object containing the share info
	 */
	getShareInfo: function()
	{
		//TODO:CHANGE!!!
		var shareInfo = {};

		var conferenceName = this.get('conferenceName');
		var sessionText = "";
		var sessionTitle = this.get('title');
		if (sessionTitle)
		{
			sessionText = _T("SAgendaShareSession", {sessionTitle: sessionTitle});
		}

		shareInfo.twitterTitle = sessionText;
		if (conferenceName)
		{
			shareInfo.title = conferenceName;
			shareInfo.shortDesc = sessionText;
		}
		else
		{
			shareInfo.title = sessionText;
		}

        var appLink = AppManager.app().get('appLink');
        if (appLink)
        {
            //TODO: USE A BETTER SOLUTION!!! (e.g.: if we will not use hash, etc...)
            //link to current state
//            shareInfo.url = appLink + '/#' + UN.getCurrentUrl();

            //link to current session:
            shareInfo.url = appLink + '/#' + UN.getCurrentUrlAtLevel(0) + '/' + UN.getCurrentUrlAtLevel(1) + '/' + this.get('alias');
        }

		return shareInfo;
	}
}); var SpeakerModel = Backbone.Model.extend({
    
    defaults:
    {
    	bio: ""
        ,companyName: ""
        ,image: ""
        ,jobTitle: ""
        ,name: ""
        ,speakerId: ""
        ,speakerLinks: []
		,sessionsModels: []
		,buttons: {}
    },

    initialize: function ()
    {
    	// Convert the array of "speakerLinks" (=what we get in speakers/agenda templates) to
        // "buttons" dictionary (like we get in about-us template) 
    	this.set(
    	{
    		buttons: AgendaTemplateHelper.linkTypesToButtons(this.get('speakerLinks'))
    	});
    }
}); /**
 * Collection of 1 item of "conference"
 */
var AgendaCollection = ItemsCollection.extend({
	
    model: ConferenceModel,
    
    initialize: function (models, params) 
	{
		// "inherit" ("Super"):
		ItemsCollection.prototype.initialize.apply(this);
		
		if (!params || !params.id)
	    {
			this.invalid = true;
        }

		this.params = params;
	},
	
	parse: function (result)
    {
        var retVal = {};
        if (result)
        {
			// Array with length 1 with the model
            var models = [
                          	new ConferenceModel(result)
                          ];

            retVal.models = models;
        }
        
        return retVal;
    },
    
    getServiceName: function ()
    {
        return 'CMS_CONFERENCE_GET';
    },
    
    getParams: function ()
    {
        return this.params;
    }
    
}); var SpeakersCollection = Backbone.Collection.extend({
    model: SpeakerModel
});
 var SessionsCollection = Backbone.Collection.extend({
    model: SessionModel
});
 var AgendaTemplateHelper = 
{	
    ONE_DAY: 1000*60*60*24

    // height (in pixels) of minute in the calendar
    // TODO: get it from AMS (as part of the page data)
    ,MINUTE_HEIGHT: 2.5
    
	// The enum for "linkType" in the links of the speakers:
	,linksButtonsEnum: 
	{
		UNKNOWN: 0
		,FACEBOOK: 1
		,TWITTER: 2
		,LINKEDIN: 3
		,MYSPACE: 4
		,WEB_SITE: 5
		,MAIL: 6
		,INFO: 7
		,YOUTUBE: 8
		,SKYPE: 9
	}

	/**
     * get an array of "speakerLinks" (like we get in speakers/agenda templates) and return
     * "buttons" dictionary (like we get in about-us template)
     * @param {Array} speakerLinks - the array of links-objects.
     * @return {Dictionary} buttons - the links in dictionary format
     */
    ,linkTypesToButtons: function (speakerLinks)
    {
    	var buttons = {};
    	
    	for (var i = 0; i < speakerLinks.length; i++)
    	{
    		var type = "";
    		switch(speakerLinks[i].linkType)
    		{
    		case this.linksButtonsEnum.UNKNOWN:
    		  type = "unknown";
    		  break;
    		case this.linksButtonsEnum.FACEBOOK:
      		  type = "facebook";
      		  break;
    		case this.linksButtonsEnum.TWITTER:
      		  type = "twitter";
      		  break;
    		case this.linksButtonsEnum.LINKEDIN:
      		  type = "linkedin";
      		  break;
    		case this.linksButtonsEnum.MYSPACE:
      		  type = "mySpace";
      		  break;
    		case this.linksButtonsEnum.WEB_SITE:
      		  type = "webSite";
      		  break;
    		case this.linksButtonsEnum.MAIL:
      		  type = "email";
      		  break;
    		case this.linksButtonsEnum.INFO:
      		  type = "info";
      		  break;
    		case this.linksButtonsEnum.YOUTUBE:
      		  type = "youtube";
      		  break;
    		case this.linksButtonsEnum.SKYPE:
      		  type = "skype";
      		  break;
    		}
    		if (type)
    		{
    			var value = speakerLinks[i].link;
    			buttons[type] = value; 
    		}
    	}
    	
        return buttons;
    }

	/**
     * Format the time and return "number of minutes" from the start of the day.
     * e.g.: "3:07 AM" will return 187.
     * @param {Integer} time - the time, as mSec from 1970.
     * @return {Integer} minutesCount - integer number of minutes from midnight to date
     */
    ,getMinutes: function (time)
    {
    	var date = new Date(time);
    	var minutesCount = date.getHours() * 60;
   		minutesCount += date.getMinutes();
        return minutesCount;
    }

	/**
     * get a date object, and return a date object with the same date, at 24:00
     * e.g.: The date "22/5/1999 15:07" will return the date "22/5/1999 00:00".
     * @param {Date} date - the date
     * @return {Date} trimDate - the date with time = 24:00:00
     */
    ,trimTime: function (date)
    {
		var trimDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
        return trimDate;
    }
    
	/**
     * return the height for X minutes in the calendar
     * @param {Integer} minutesCount - the duration - e.g.: from 8:00 to 9:00 it will be 60.
     * @return {Integer} pixels - the height for this duration
     */
    ,minutesToPixels: function (minutesCount)
    {
    	return Math.floor(this.MINUTE_HEIGHT * minutesCount);
    }
    
	/**
	 * Sort array of models according to field name
	 * @param {Array} array - array of models
	 * @param {String} sortBy - the field name to sort according to it
	 */
	,sortArray: function (array, sortBy)
	{
		for (var i = 0; i < array.length - 1; i++)
		{
			for (var j = i + 1; j < array.length; j++)
			{
				var a = array[i];
				if (a.get(sortBy) > array[j].get(sortBy))
				{
					array[i] = array[j];
					array[j] = a;
				}
			}
		}
	}
}; /**
 * The Agenda/Speakers template.
 */
var AgendaTemplateView = TemplateView.extend({
    /**
     * OVERRIDE - render level 1 - tab:
     */
    _renderTab : function(index, navRequest)
	{
		var templateMetaData = this.model.get('meta');
		var tabParams = templateMetaData.items[index];
		
		//check if we are in agenda template or speakers template:
		var isSpeakers = this.model.get('type') === "ff4532d2-9137-8da2-f97f-be8b3ddd08e4";
		
		var model = new AgendaModel(tabParams);
		var view = new AgendaView(
		{
			model: model,
			isSpeakers: isSpeakers,
			pageId: this.model.get('id')
		});

        this.renderListPage({navRequest: navRequest, model: model, view: view});
	}

    /**
     * OVERRIDE.
     */
    ,getDetailsView: function (model)
	{
	    // check if to create speaker or session view:
	    if (model.get('speakerId'))
	    {
		    return new FullSpeakerView({
		        model: model
		    });
	    }
	    else
	    {
		    return new FullSessionView({
		        model: model
		    });
	    }
	}
}); var AgendaView = ItemsView.extend({
	
	attributes:
	{
        'data-role': 'page'
    },
    
	initialize: function () 
	{
        this.$el.html(agendaTemplates.homePageTemplate());

        // intialize the scrolling.
        Scrolling.init(this.$el.find('.scroll_wrapper'));
		this.$scroller = this.$el.find('.scroller');    

		this.$el.bind('refresh', this.handleRefreshClick.hitch(this));
        this.$el.bind('silentRefresh', this.handleSilentRefresh.hitch(this));
		
        // create the "favorites view" button: 
        if (USE_AGENDA_FAVORITES && !this.options.isSpeakers)
        {
            this.isFavMode = false;
            this._favBtnHandle = -1;
        	this.$el.bind('pageshow',this._handlePageShow.hitch(this));
            this.$el.bind('pagebeforehide',this._handlePageHide.hitch(this));
            // If we have the "fav" button we don't want "refresh" button
            this.$el.attr(
            {
                'data-buttons': ''
            });
        }
        else
        {
            this.$el.attr(
            {
                'data-buttons': 'refresh'
            });
        }
        
        
        ItemsView.prototype.initialize.apply(this);
	},
	
    getRootView: function () 
    {
        return this.$scroller;
    },
    
    createItemView: function (model)
    {
        if (this.options.isSpeakers)
        {
        	return new SpeakersListView({ 
        		model: model 
        	});
        }
        else
        {
        	this.conferenceModel = model;
        	this.conferenceModel.changeFavMode(this.isFavMode);
        	return new ConferenceView({ 
        		model: model 
        	});
        }
    },
    
    _addFavBtn: function ()
    {
        var img;
		if (this.isFavMode)
        {
            img = headerButtonsIconsEnum.star;
        }
		else
        {
            img = headerButtonsIconsEnum.emptyStar;
        }
				
        var addToRight = true;

        function addButtonCbSuccess(btnHandle) 
        {
            this._favBtnHandle = btnHandle;
        }
        
        //what is it? do we need this?
        var pageId = this.options.pageId;
        
        appDriver.addInfoBarButton.hitch(
        {
            slaveId : pageId
        })(addButtonCbSuccess.hitch(this), null, img, addToRight, this._favBtnClicked.hitch(this));
    },

    _removeFavBtn : function(cbDone)
    {
        //what is it? do we need this?
        var pageId = this.options.pageId;
        if (this._favBtnHandle !== -1) 
		{
			appDriver.removeInfoBarButton.hitch(
			{
				slaveId: pageId
			})(cbDone, cbDone, this._favBtnHandle);
		}
    },
    
    _handlePageShow: function ()
    {
        this._addFavBtn();
    },

    _handlePageHide: function ()
    {
        this._removeFavBtn();
    },

    _favBtnClicked : function()
    {
        if (!this.isFavMode && this.conferenceModel.isFavoritesEmpty())
        {
            cqm.showToastMessage( _T('DialogMessageAgendaNoFav'));
	    	return;
        }

    	//toggle:
    	this.isFavMode = (!this.isFavMode);
    	this.conferenceModel.changeFavMode(this.isFavMode);
    	//remove the old button, and create a new one:
        this._removeFavBtn(function(){
        	this._addFavBtn();
        }.hitch(this));
    },

    addTabsView: function (tabsViewEl) 
    {
        this.getRootView().prepend(tabsViewEl);
    }
}); /**
 * View the conference "calendar"
 */
var CalendarView = Backbone.View.extend(
{

	className: 'calendar_view clr_contTypeA_bg t3d',
	
	initialize: function () 
	{
        this.model.bind('calendarChanged', this.viewChanged, this);
	},

	render: function() 
	{
		var sessions = this.model.getCurrentSessions();
		
		//sort the session according to startDate:
		AgendaTemplateHelper.sortArray(sessions, "startDate");
		
		// the minimum time (in "boxes") of the day
		var minTime = 0;
		if (sessions.length)
		{
			// take the start date of the 1st session - but "floor"
			// it to whole hour (=e.g.: don't start in 07:30)
			minTime = AgendaTemplateHelper.getMinutes(sessions[0].get('startDate'));
			minTime = Math.floor(minTime / 60) * 60;
		}
		
		// build the "empty" calendar - with hours, lines, etc.:
		
		// we want to show 24 hours + 15 minutes after midnight (=of next day).
		var endOfDay = 24*60 + 15;
		// NOTE: we do temporary "+2" for android bug fix (bug - can scroll horizontaly):
		var calHeight = AgendaTemplateHelper.minutesToPixels(endOfDay - minTime) + 2;
		this.$el.html(agendaTemplates.calendarTemplate({calHeight: calHeight}));
		var $cal = this.$('.calendar');
		var $sessionsContainer = this.$('.sessionsContainer');

		for (var i = minTime; i < endOfDay; i+=30)
		{
			if (i%60 === 0)
			{
				//hours; no leading zero for single-digit hours (12-hour clock) + AM/PM
				//TODO: add to localization format? e.g.: for 24 hours format
				var time = new Date(1999,1,1,(i/60)%24,0,0,0).format('htt');
				var params = 
				{
					top: AgendaTemplateHelper.minutesToPixels(i - minTime)
					,height: AgendaTemplateHelper.minutesToPixels(15)
					,time: time 
				}
				
				// e.g.: the lines of 8:00 and 8:15:
				var calBox = agendaTemplates.calendarBoxTemplate(params);
				// e.g.: the "8:00" text:
				var timeElement = agendaTemplates.calendarTimeTemplate(params);
				$cal.append(calBox).append(timeElement);
			}
			else
			{
				var params = 
				{
					top: AgendaTemplateHelper.minutesToPixels(i - minTime)
					,height: AgendaTemplateHelper.minutesToPixels(15)
				}
				
				// e.g.: the lines of 8:30 and 8:45:
				var calBox = agendaTemplates.calendarBox2Template(params);
				$cal.append(calBox);
			}		
		}
		
		// add the sessions inside the calendar:
		
		// we need these 2 params for support 2 session in the same time
		var leftSideReservedEnd = 0;
		var rightSideReservedEnd = 0;
		
		// the minimum height of session, If the session is shorter, we will display it in this height.
		// NOTE: this var is in "minutes". maybe we should do it in pixels?
		var MINIMUM_DISPLAY_HEIGHT = 10;
		
		for (var i = 0; i < sessions.length; i++)
		{
			var start = AgendaTemplateHelper.getMinutes(sessions[i].get('startDate'));
			var end = Math.max(AgendaTemplateHelper.getMinutes(sessions[i].get('endDate')) , start + MINIMUM_DISPLAY_HEIGHT);

			//save this "end" for also for "SessionInCalView":
			sessions[i].set({'displayEndMinutes' : end})
			
			var isLeftReserved = (leftSideReservedEnd > start);
			var isRightReserved = (rightSideReservedEnd > start);
			if (isLeftReserved && isRightReserved)
			{
				// we don't support more than 2 sessions in the same time:
				continue;
			}
			else if (isLeftReserved)
			{
				// create the session on right side:
				var side = sessionSideEnum.RIGHT;
					
				//update the "reserved" var:
				rightSideReservedEnd = end;
			}
			else if (isRightReserved)
			{
				// create the session on left side:
				var side = sessionSideEnum.LEFT;
					
				//update the "reserved" var:
				leftSideReservedEnd = end;
			}
			else
			{
				// if I'm the only session on my time: use "both" sides,
				//	else, I take the left side, and the next session(s)
				//  will be in the right side
				var isMoreSession = ((i+1 < sessions.length) &&	(end>AgendaTemplateHelper.getMinutes(sessions[i+1].get('startDate'))));
				
				if (isMoreSession)
				{
					// create the session on left side:
					var side = sessionSideEnum.LEFT;
						
					//update the "reserved" var:
					leftSideReservedEnd = end;
				}
				else
				{
					// create the session on both side:
					var side = sessionSideEnum.BOTH;
						
					//update the "reserved" vars (BTW: we don't need it , but anyway...):
					leftSideReservedEnd = end;
					rightSideReservedEnd = end;
				}
			}
				
			var sessionView = new SessionInCalView(
			{
				model: sessions[i],
				side: side
			});
			$sessionsContainer.append(sessionView.render().el);
			
			// calc the session "top"
			start -= minTime;
			// NOTE: we do "+1" because of the border (= calendar lines)
			// NOTE: we do "+2" for some padding
			var top = AgendaTemplateHelper.minutesToPixels(start) + 1 + 2;
			sessionView.$el.css({top: top + "px"});
		}
		
		return this;
	},
	
	/**
	 * The date / hall was changed, so we need to change the view content
	 */
	viewChanged: function() 
	{
		this.render();
		
		//We need to update the scroller in this case:

		// Get my scroll wrapper
		this.$myScrollWrapper = this.$myScrollWrapper || Scrolling.getMyScrollerWrapper(this.$el);

		// update scroller:
		Scrolling.onContentChanged(this.$myScrollWrapper);
	}
});
 /**
 * View the conference "calendar" + the date and hall headers.
 */
var ConferenceView = Backbone.View.extend(
{

    initialize: function () 
	{
        if (USE_AGENDA_FAVORITES)
        {
			// This will change when we the user wants/doesn't want to see only favorites:
			this.model.bind('favModeChanged', this.render, this);
        }
	},
	
	render: function() 
	{	
		this.$el.html('');
		// Date header
		var dateHeaderView = new DateHeaderView(
		{
			model: this.model
		});
		this.$el.append(dateHeaderView.render().el);

		// Hall header (if halls exist)
		if (this.model.get('hallsInDateCollection').length)
		{
			var hallHeaderView = new HallHeaderView(
			{
				model: this.model
			});
			this.$el.append(hallHeaderView.render().el);
		}

		// Calendar
		var calendarView = new CalendarView(
		{
			model: this.model
		});
		this.$el.append(calendarView.render().el);
		
		//We need to update the scroller in this case:

		// Get my scroll wrapper
		this.$myScrollWrapper = this.$myScrollWrapper || Scrolling.getMyScrollerWrapper(this.$el);

		// update scroller:
		Scrolling.onContentChanged(this.$myScrollWrapper);

		return this;
	}
}); /**
 * View the date header.
 */
var DateHeaderView = Backbone.View.extend(
{
    className: 'date_header clr_contTypeB_headerItem_bg clr_contTypeB_headerItem_brdr t3d',


    initialize: function ()
    {
        this.model.bind('dateChanged', this.updateUiState, this);
    },

    updateUiDate: function() {
        var currDate = this.model.get('currDate');
        var date = new Date(currDate);

        // Day of the week as its full name:
        this.$dayCaption.text(date.format('dddd'));

        // (Day of the month as digits; no leading zero for single-digit days) + (Month as a three-letter abbreviation)
        this.$dateCaption.text(date.format('d mmm'));
    },

    // in RTL, the "right arrow" is prev, and "left arrow" is next, so we swap the next and prev:
    getNextDate: function() {
        return IS_RTL ? this.model.getPrevDate() : this.model.getNextDate();
    },

    getPrevDate: function() {
        return IS_RTL ? this.model.getNextDate() : this.model.getPrevDate();
    },

    updateUiState:function() {
        this.updateUiDate();

        var prevDate = this.getPrevDate();
        var nextDate = this.getNextDate();

        this.prevDisabled = !prevDate;
        this.nextDisabled = !nextDate;

        var showButtons = !(this.prevDisabled && this.nextDisabled);

        (this.nextDisabled ? $.fn.addClass : $.fn.removeClass).apply(this.$nextButton, ['disabled']);
        (this.prevDisabled ? $.fn.addClass : $.fn.removeClass).apply(this.$prevButton, ['disabled']);

        var showHideFn = (showButtons ? $.fn.show : $.fn.hide);
        showHideFn.apply(this.$prevButton);
        showHideFn.apply(this.$nextButton);
    },

    render: function()
    {
        this.$el.html(agendaTemplates.dateHeaderTemplate());

        this.$dateCaption = this.$el.find('.date_caption');
        this.$dayCaption = this.$el.find('.day_caption');
        this.$nextButton = this.$el.find('.date-button.next, .date-button.next .nav_icon')
        this.$prevButton = this.$el.find('.date-button.prev, .date-button.prev .nav_icon');

        this.updateUiState();

        // bind buttons events:
        var that = this;

        this.$('.prev').tap(function (e){
            if (that.prevDisabled) return;
            that.model.changeDate(that.getPrevDate());
        });

        this.$('.next').tap(function (e){
            if (that.nextDisabled) return;
            that.model.changeDate(that.getNextDate());
//              that.model.goNextDate();
        });

        return this;
    }
}); /**
 * This view is for a single speech, take the full screen 
 * 
 * @author Matanya
 */
var FullSessionView = Backbone.View.extend({
	className: 'speech-page',

	initialize: function () {
		// this is a page that we want to navigate to.
		this.$el.attr({
            'data-role': 'page'
        });
		
		if (USE_AGENDA_FAVORITES) {
			// This will change when we the user remove/add to favorites
			this.model.bind('change:isInFavorites', this._renderFavButton, this);
        }
	},
	
	render: function () {

		var startTime = new Date(this.model.get('startDate')).format('shortTime'); 
		var endTime = new Date(this.model.get('endDate')).format('shortTime'); 
		var date = new Date(this.model.get('startDate')).format('fullDate');
		var location = this.model.get('locationText') || "";
		var hallModel = this.model.get('hallModel'); 
		if (hallModel) {
			var hall = hallModel.get('name') || "";
			if (location && hall) {
				location += ", ";
			}
			location += hall;
		}
		
		var speakersStr = "";
		var speakers = this.model.get('speakersModels');
		if (speakers.length === 1) {
			speakersStr = _T("HtmlTextAgendaOneSpeaker");
		}
		else if (speakers.length > 1) {
			speakersStr = _T("HtmlTextAgendaSpeakersCount", {
				number: speakers.length
			});
		}
		var params = {
			title: this.model.get('title'),
			time: startTime + " - " + endTime,
			date: date,
			location: location,
			detailsStr: _T("HtmlTextAgendaSessionDetails"),
			description: this.model.get('description'),
			speakersStr: speakersStr
		};
		this.$el.html(agendaTemplates.fullSession(params));
		
		if (speakers.length) {
			// Add all speakers:
			var $speakersContainer = this.$('.speakersContainer');
			for (var i = 0; i < speakers.length; i++) {
				var speakerView = new SpeakerInSessionView({
					model: speakers[i]
				});
				$speakersContainer.append(speakerView.render().el);
			}
		}

        
        // Create share control
		var $buttonsContainer = this.$el.find('.buttonsContainer');
        ShareControlHelper.addShareControlButton($buttonsContainer, this.model);
		
        // only supported in native apps
		if (PLATFORM === platformEnum.nativeApp && navigator && navigator.events) {
        	
            // create the button view.
            var add2CalendarButtton = new FlatButtonView({
                text: _T('HtmlTextEventsAdd2CalStr'),
                icon: 'events-add2cal'
            });
            
            add2CalendarButtton.bind('onButtonClicked', this._add2Calendar, this);
            
            $buttonsContainer.append(add2CalendarButtton.render().el);
    	}

		if (USE_AGENDA_FAVORITES) {
			// create the "add to fav" button view:
			this.addFavButtton = new FlatButtonView({
				text: _T('HtmlTextAgendaAddToFav'),
				icon: 'starEmpty'
			});
			
			this.addFavButtton.bind('onButtonClicked', this._onAddFavTap, this);
			
			$buttonsContainer.append(this.addFavButtton.render().el);
			
			// create the "remove from fav" button view:
			this.removeFavButtton = new FlatButtonView({
				text: _T('HtmlTextAgendaRemoveFromFav'),
				icon: 'starFull'
			});
			
			this.removeFavButtton.bind('onButtonClicked', this._onRemoveFavTap, this);
			
			$buttonsContainer.append(this.removeFavButtton.render().el);
			
			// do we want to show the "add" button or the "remove" button:
			this._renderFavButton();
        }
		if (window.Scrolling) {
		    Scrolling.init(this.$('.scroll_wrapper'));
        }

		return this;
	},

    /**
     * Add the event to the device calendar.
     */
	_add2Calendar: function () {
		// Build the JSON to send to the native.
		var location = this.model.get('locationText') || "";
		var hallModel = this.model.get('hallModel'); 
		if (hallModel) {
			var hall = hallModel.get('name') || "";
			if (location && hall) {
				location += ", ";
			}
			location += hall;
		}
    	
		var event = {
			startTime: this.model.get('startDate') / 1000,
			endTime: this.model.get('endDate') / 1000,
			title: this.model.get('title'),
			description: this.model.get('descrition'),
			eventLocation: location,
			allDayEvent: false
		};

		navigator.events.addToCalendar(event);
	},
	
	_onAddFavTap: function () {
		this.model.set({
			"isInFavorites": true
		});
	},
	
	_onRemoveFavTap: function () {
		this.model.set({
			"isInFavorites": false
		});
	},
	
	_renderFavButton: function () {
		if (this.model.get('isInFavorites')) {
			this.addFavButtton.$el.hide();
			this.removeFavButtton.$el.show();
		}
		else {
			this.removeFavButtton.$el.hide();
			this.addFavButtton.$el.show();
		}
	}
	

}); 
/**
 * This view is for a single speaker, take the full screen
 *
 * @author Matanya
 */
var FullSpeakerView = Backbone.View.extend(
{
	className: 'speaker-page',

    initialize: function ()
	{
		// this is a page that we want to navigate to.
		this.$el.attr(
        {
            'data-role': 'page'
        });
	},

	render: function()
	{
		var templateParams = this.model.toJSON();
		templateParams.bioStaticText = _T('HtmlTextSpeakersBioTitle');

		this.$el.html(agendaTemplates.fullSpeaker(templateParams));

		// Delete the image in error
		var $myScrollWrapper = this.$('.scroll_wrapper');
        this.$('IMG').error(function ()
        {
            $(this).remove();
    		 Scrolling.onContentChanged($myScrollWrapper);
        });

		var sessions = this.model.get('sessionsModels');
		if (sessions.length)
		{
			// Add all sessions:
			var $sessionsContainer = this.$('.sessionsContainerInSpeaker');
			for (var i = 0; i < sessions.length; i++)
			{
				var sessionView = new SessionInSpeakerView(
				{
					model: sessions[i]
				});
				$sessionsContainer.append(sessionView.render().el);
			}
		}

		// create share buttons:
		var shareIconsView = new ShareIconsView(
		{
			model: this.model
		});
		this.$('.share-icons-container').append(shareIconsView.render().el);

		if (window.Scrolling)
        {
		    Scrolling.init($myScrollWrapper);
        }

		return this;
	}
}); /**
 * View hall header.
 */
var HallHeaderView = Backbone.View.extend(
{
	className: 'hall_header clr_tab2Bar_bg t3d',
	
	initialize: function () 
	{
		this.model.bind('hallChanged', this.render, this);
	},
	
	render: function() 
	{	
		//TODO: maybe to change only the captions & disable in 'change:currHallIndex'? 
		// (instead of full render)?
		var currIdx = this.model.get('currHallIndex');
		var halls = this.model.get('hallsInDateCollection');
		var hall = halls.at(currIdx);
		var name = "";
		if (hall && hall.get('name'))
		{
			name = hall.get('name');
		}
		var prevIdx = currIdx - 1;
		var nextIdx = currIdx + 1;
		var prevDisabled = (prevIdx < 0);
		var nextDisabled = (nextIdx >= halls.length);
		var prev = "";
		var hall = halls.at(prevIdx);
		if (hall && hall.get('name'))
		{
			prev = hall.get('name');
		}
		var next = "";
		var hall = halls.at(nextIdx);
		if (hall && hall.get('name'))
		{
			next = hall.get('name');
		}
		var prev2 = "";
		var hall = halls.at(prevIdx - 1);
		if (hall && hall.get('name'))
		{
			prev2 = hall.get('name');
		}
		var next2 = "";
		var hall = halls.at(nextIdx + 1);
		if (hall && hall.get('name'))
		{
			next2 = hall.get('name');
		}
		
		var params = 
		{
			name: name,
			next: next,
			prev: prev,
			next2: next2,
			prev2: prev2
		}
		this.$el.html(agendaTemplates.hallHeaderTemplate(params));
		
		var $slidebar = this.$('.slideable_bar');
		
		// bind buttons events:
		var that = this;
		if (!prevDisabled)
		{
//			this.$('.prev').tap(function (e){
// Can it help:?
			var movePrev = function (e){
				if (IS_RTL)
				{
					var leftPosition = "-50%";
				}
				else
				{
					var leftPosition = "50%";
				}
                var animationDoneCb = function(){
                    that.model.changeHall(prevIdx);
                };
                Utils.Helpers.animate($slidebar, leftPosition, 500, animationDoneCb);
			};
			
			this.$('.prev').one('tap', movePrev);
			if (IS_RTL)
			{
				$slidebar.bind('swipeleft', function(e){
					e.preventDefault();
					movePrev();
					return false;
				});
			}
			else
			{
				$slidebar.bind('swiperight', function(e){
					e.preventDefault();
					movePrev();
					return false;
				});
			}
		}
		if (!nextDisabled)
		{
			var moveNext = function (e){
				if (IS_RTL)
				{
					var leftPosition = "50%";
				}
				else
				{
					var leftPosition = "-50%";
				}
                var animationDoneCb = function(){
                    that.model.changeHall(nextIdx);
                };
                Utils.Helpers.animate($slidebar, leftPosition, 500, animationDoneCb);
			};

			this.$('.next').one('tap', moveNext);
			if (IS_RTL)
			{
				$slidebar.one('swiperight', moveNext);
			}
			else
			{
				$slidebar.one('swipeleft', moveNext);
			}
			
		}
		 
		return this;
	}
}); /**
 * This view is for a single speech, inside the calendar. 
 * 
 * @author Matanya
 */

var sessionSideEnum = {LEFT: 1, RIGHT: 2, BOTH: 3};
var SessionInCalView = Backbone.View.extend(
{	
	className: 'session_in_cal',
	
	FAV_COLOR_CODE: "contentSession2",
	NORMAL_COLOR_CODE: "contentSession",
	
    initialize: function () 
	{
        if (USE_AGENDA_FAVORITES)
        {
			// This will change when we the user remove/add to favorites
			this.model.bind('change:isInFavorites', this.render, this);
        }

		// trigger the "click" event:
		this.$el.tap(function(e)
		{
			UN.navTo(this.model.get('alias'), {level: 2});
		}.hitch(this));
	},
	
	render: function() 
	{	
		if (this.options.side === sessionSideEnum.LEFT)
		{
			this.$el.addClass('half left');
		}
		else if (this.options.side === sessionSideEnum.RIGHT)
		{
			this.$el.addClass('half right');
		}
		
		// Calc the height:
		var start = AgendaTemplateHelper.getMinutes(this.model.get('startDate'));
		var end = this.model.get('displayEndMinutes');
		var minutesCount = (end - start);
		// NOTE: we do "-4" for some padding (2 for top, 2 for bottom)
		var height = AgendaTemplateHelper.minutesToPixels(minutesCount) - 4;
		this.$el.css({height: height + "px"});
		
		var params = 
		{
			title: this.model.get('title'),
			// TODO: do we want localization? e.g.: short time format?, if so: make sure that we have space for long text like "12:59 PM"
			time: new Date(this.model.get('startDate')).format('h:MM')
		};
		
		// we want to change all the colors (background, text, etc.) in case of "in favorites":
		if (USE_AGENDA_FAVORITES && this.model.get('isInFavorites'))
		{
			params.colorCode = this.FAV_COLOR_CODE;
			this.$el.addClass('clr_contTypeA_' + this.FAV_COLOR_CODE +'_bg').
					 removeClass('clr_contTypeA_' + this.NORMAL_COLOR_CODE +'_bg');
		}
		else
		{
			params.colorCode = this.NORMAL_COLOR_CODE;
			this.$el.removeClass('clr_contTypeA_' + this.FAV_COLOR_CODE +'_bg').
					addClass('clr_contTypeA_' + this.NORMAL_COLOR_CODE +'_bg');
		}
			
		// Add the template according to "height"
		if (height < 50)
		{
			this.$el.html(agendaTemplates.singleLineEvent(params));
		}
		else
		{
			// make the "speaker text":
			var speaker = "";
			var speakersModels = this.model.get('speakersModels');
			if (speakersModels.length === 1)
			{
				speaker = speakersModels[0].get("name") || "";
				var company = speakersModels[0].get("companyName");
				if (speaker && company)
				{
					speaker = speaker + " | " + company; 
				}
			}
			else if (speakersModels.length > 1)
			{
				speaker = _T("HtmlTextAgendaSpeakersCount",{number: speakersModels.length});
			}
			
			// we need the text-max-height to be multiple of line height
			var lineHeight = 20;
			var textHeight = height - 25;
			textHeight = Math.floor(textHeight/lineHeight ) * lineHeight; 

			var locationMaxHeight = height - 55;
			locationMaxHeight = Math.floor(locationMaxHeight/lineHeight ) * lineHeight; 

			params.speaker = speaker;
			params.location = "";
			if (this.options.side === sessionSideEnum.BOTH)
			{
				params.location = this.model.get('locationText') || "";
			}
			params.description = this.model.get('description') || "";				
			params.textLineHeight = lineHeight;
			params.textMaxHeight = textHeight;
			params.locationMaxHeight = locationMaxHeight;
			// in case of only 1 line - use ellipsis
			params.ellipsis = (textHeight === lineHeight);
			params.USE_AGENDA_FAVORITES = USE_AGENDA_FAVORITES;
			this.$el.html(agendaTemplates.multiLinesEvent(params));
		}

		var $buttonsContainer = this.$('.fav_button_container');
		if ($buttonsContainer.length)
		{
			if (!this.model.get('isInFavorites'))
			{
				var $favButton = $(agendaTemplates.addFavButton({}));
				$favButton.tap(function(e)
				{
					e.preventDefault();
					this.model.set({"isInFavorites": true});
					return false;
				}.hitch(this));
			}
			else
			{
				var $favButton = $(agendaTemplates.removeFavButton({}));
				$favButton.tap(function(e)
				{
					e.preventDefault();
					this.model.set({"isInFavorites": false});
					return false;
				}.hitch(this));
			}
			$buttonsContainer.append($favButton);
		}
        
		return this;
	}
	
}); /**
 * This view is for a single speech, inside the speaker page. 
 * 
 * @author Matanya
 */
var SessionInSpeakerView = Backbone.View.extend(
{	
	className: 'session_in_speaker itemArrowContainer clr_contTypeB_headerItem_bg clr_contTypeB_headerItem_brdr',
	
	render: function() 
	{	
		var startTime = new Date(this.model.get('startDate')).format('shortTime'); 
		var endTime = new Date(this.model.get('endDate')).format('shortTime'); 
		var date = new Date(this.model.get('startDate')).format('shortDate');
		var params = 
		{
			title: this.model.get('title')
			,time: startTime + " - " + endTime
			,date: date
		};

		this.$el.html(agendaTemplates.sessionInSpeaker(params));

		// trigger the "click" event:
		this.$el.tap(function(e)
		{
			UN.navTo(this.model.get('alias'), {level: 2});
            e.preventDefault();
		}.hitch(this));

		return this;
	}
}); /**
 * This view is for a single speaker, inside the speakers list page. 
 * 
 * @author Matanya
 */
var SpeakerInListView = Backbone.View.extend(
{	
	className: 'speaker_in_List itemContainer clr_contTypeB_bubbleItem_bg clr_contTypeB_bubbleItem_brdr feed_bubble_item',
	
    tagName: 'li',
	
	render: function() 
	{	
		this.$el.attr('data-role', 'button');

		var templateParams = this.model.toJSON();

		// Find next session (if exists):
		var sessions = this.model.get('sessionsModels');
		if (sessions.length)
		{
			var now = new Date().getTime();
			// minimum date that is bigger than now:
			var minDate = 9999999999999;
			var selectedIndex = -1;
			for (var i = 0; i < sessions.length; i++)
			{
				var sessionDate = new Date(sessions[i].get('startDate')).getTime();
				if (sessionDate > now && sessionDate < minDate)
				{
					minDate = sessionDate;
					selectedIndex = i;
				}
			}
			if (selectedIndex > -1)
			{
				var nextSession = sessions[selectedIndex];
				var startTime = new Date(nextSession.get('startDate')).format('shortTime'); 
				var endTime = new Date(nextSession.get('endDate')).format('shortTime'); 
				var date = new Date(nextSession.get('startDate')).format('shortDate');
				templateParams.nextSessionTitle = nextSession.get('title');
				templateParams.nextSessionDate = date;
				templateParams.nextSessionTime = startTime + " - " + endTime;
				
			}
		}
		
		this.$el.html(agendaTemplates.speakerInList(templateParams));

		// Delete the image in error
		var that = this
        this.$('IMG').error(function ()
        {
            $(this).remove();
    		 var $myScrollWrapper = Scrolling.getMyScrollerWrapper(that.$el);
    		 Scrolling.onContentChanged($myScrollWrapper);
        });

		// trigger the "click" event:
		this.$el.tap(function(e)
		{
			UN.navTo(this.model.get('alias'), {level: 2});
		}.hitch(this));

		return this;
	}
}); /**
 * This view is for a single speaker, inside the session page. 
 * 
 * @author Matanya
 */
var SpeakerInSessionView = Backbone.View.extend(
{	
	className: 'speaker_in_session itemArrowContainer clr_contTypeB_headerItem_bg clr_contTypeB_headerItem_brdr',
	
    tagName: 'li',
	
	render: function() 
	{	
		this.$el.attr('data-role', 'button');

		var name = this.model.get('name') || "";
		var image = this.model.get('image') || "";
		var title = this.model.get('jobTitle') || ""; 
		var companyName = this.model.get('companyName') || "";
		if (title && companyName)
		{
			title += ", ";
		}
		if (companyName)
		{
			title += companyName;
		}
		
		var params = 
		{
			name: name
			,image: image
			,title: title
		};

		this.$el.html(agendaTemplates.speakerInSession(params));

		// Delete the image in error
		var that = this
        this.$('IMG').error(function ()
        {
            $(this).remove();
    		 var $myScrollWrapper = Scrolling.getMyScrollerWrapper(that.$el);
    		 Scrolling.onContentChanged($myScrollWrapper);
        });

		
		// trigger the "click" event:
		this.$el.tap(function(e)
		{
			UN.navTo(this.model.get('alias'), {level: 2});
            e.preventDefault();
		}.hitch(this));

		return this;
	}
}); var SpeakersListView = Backbone.View.extend(
{
	className: 'speakers_list_container',
	
	render: function() 
	{	
		// "reset": 
		this.skip = 0;
		this.take = 15;
		this.$el.html('');
		
		// add the first bulk of speakers from the collection:
		this.renderNextBulk();
		return this;
	},

	renderNextBulk: function() 
	{	
		var speakersCollection = this.model.get('speakersCollection');
		for (var i = 0; i < this.take && this.skip < speakersCollection.length; i++)
		{
			var speakerView = new SpeakerInListView({ 
        		model: speakersCollection.at(this.skip) 
        	});
			this.$el.append(speakerView.render().el);
			this.skip++;
		}
		
		if (this.skip < speakersCollection.length)
		{
			this.renderShowMore();
		}


		// Get my scroll wrapper
		this.$myScrollWrapper = this.$myScrollWrapper || Scrolling.getMyScrollerWrapper(this.$el);

		// update scroller:
		Scrolling.onContentChanged(this.$myScrollWrapper);

        this.$('IMG').load(function ()
        {
            // Call refresh scroll callback
            Scrolling.onContentChanged(this.$myScrollWrapper);
        }.hitch(this));

		
	},
	
	renderShowMore: function() 
	{	
		var $showMoreButton = $(commonTemplates.showMoreButtonWithoutLoading(
			{showMoreStr: _T('HtmlTextPaginationShowMoreItems')}
		));
		
		this.$el.append($showMoreButton);
		var that = this;
		$showMoreButton.tap(function(e)
		{
			e.preventDefault();
			$(this).remove();
			that.renderNextBulk();
		});
	}
	
});
 

var collectionsEnums = {
	PagesLayouts: {
		0: "default"		
	}
};

collectionsEnums.nodeType = {
	CATEGORY: "3ffdbd0e-3a28-41e8-b446-c3008edebe04",
	ITEM: "83a5a90b-6950-49c3-a0c9-594f82df3e6a"
};

//TODO: remove this type (=why "item" is better than "83a5a90b-6950-49c3-a0c9-594f82df3e6a")
//// it should be only as above
//var collectionsNodesTypes = {
//	"3ffdbd0e-3a28-41e8-b446-c3008edebe04": "node",
//	"83a5a90b-6950-49c3-a0c9-594f82df3e6a": "item"
//};

collectionsEnums.aliases = {
    DEFAULT_URL: "default", // the root category = the url of the tab without override it after user click on link, e.g.: "catalog/tab2/default" (note: for sub-category it will be e.g.: "catalog/tab2/categoryId")

    ITEMS_URL: "items", // the url of "normal" items inside root/category, e.g.: "catalog/tab2/default/items"
    SEARCH_URL: "Q_" // the url of search items inside root/category starts with this, e.g.: "catalog/tab2/default/Q_Nemo"
};
 /*
 * Collections template's views templates
 *
 * @author Daniel Chcouri
 */

(function () {

    var collectionsTemplates = {
        collectionsWrapper: _.template(
'<div class="scroll_wrapper"><div class="scroller">'+
    '<div class="header"></div>' +
    '<div class="descendants_container"></div>' +
'</div></div>'),

        "node_view": _.template(
'<div class="search_container_container"></div>' +
'<% if (headerImage && !isSearch) { %>' +
    '<div class="image-container clr_contTypeA_bg clr_contTypeA_brdr">' +
        '<div class="header_image sliced_image" style="background-image: url(\'<%= headerImage %>\');">' +
            '<% if (name || description) { %>' +
                '<div class="text_container clr_contTypeC_bg">' +
                    '<div class="collection_title title size_title_3 max_3_lines clr_contTypeC_hdlTxt">' +
                        '<% if (name) { %>' +
                            '<%= name %>' +
                        '<% } %>' +
                    '</div>' +
                    '<% if (description) { %>' +
                        '<div class="collection_subtitle size_0 max_2_lines time clr_contTypeC_txt">' +
                            '<%= description %>' +
                        '</div>' +
                    '<% } %>' +
                '</div>' +
            '<% } %>' +
        '</div>' +
    '</div>' +
'<% } %>'
),

        "search_view": _.template(
            '<form class="search_form" action="javascript:void(0)">' +
                '<input type="text" class="search_input rounded_corners_all clr_form_input_bg clr_form_input_brdr clr_form_input_txt" placeholder="<%= CollectionsSearchPlaceholder %>" />' +
                '<a class="search_button clr_contTypeB_btn_bg clr_contTypeB_btn_brdr clr_contTypeB_btn_hdlTxt rounded_corners_all' +
                '" data-role="button">' +
                    '<div class="mask_sprite sprite-search clr_contTypeB_btn_icn' +
                    '"></div>' +
                '</a>' +
                '<input type="submit" style="display: none">' +
            '</form>'
        ),

        "item_view": _.template(
            '<div class="item_view_content_container clr_contTypeA_classicItem_bg">' +
                '<div class="item_name clr_contTypeA_hdlTxt"><%= name %></div>' +
                '<% if (images.length > 0) { %>' +
                    '<div class="images_container images_amount_<%= images.length %>  clr_contTypeA_subBg">' +
                        '<div class="main_image sliced_image" style="background-image: url(\'<%= images[0] %>\');"><div class="full_screen_hint sprite sprite-FullScreenIcon"></div></div>' +
                        '<% if (images.length > 1) { %>' +
                            '<div class="thumbnails_container">' +
                                '<table class="thumbnails_table" data-role="controlgroup">' +
                                    '<tr>' +
                                        '<td width="*">' +
                                            '<div class="sliced_image item_thumbnail images_imgBtn_bg images_imgBtn_brdr" data-index="0" style="background-image: url(\'<%= images[0] %>\');" data-role="button"></div>' +
                                        '</td>' +
                                        '<td width="*">' +
                                            '<div class="sliced_image item_thumbnail" data-index="1" style="background-image: url(\'<%= images[1] %>\');" data-role="button"></div>' +
                                        '</td>' +
                                    '<% if (images.length > 2) { %>' +
                                        '<td width="*">' +
                                            '<div class="sliced_image item_thumbnail" data-index="2" style="background-image: url(\'<%= images[2] %>\');" data-role="button"></div>' +
                                        '</td>' +
                                    '<% } %>' +
                                    '<tr>' +
                                '</table>' +
                            '</div>' +
                        '<% } %>' +
                    '</div>' +
                '<% } %>' +
                '<% if ((meta.price && _.isArray(meta.priceArr)) || needBuyButton) { %>' +
                    '<div class="price_container clr_contTypeA_subBg">' +
                        '<% if (needBuyButton) { %>' +
                            '<div data-role="button" class="buy_now clr_contTypeA_actBtn_bg clr_contTypeA_actBtn_brdr clr_contTypeA_actBtn_hdlTxt order">' +
                                '<span class="text"><%= buyNowText %></span>' +
                            '</div>' +
                        '<% } if (meta.price && _.isArray(meta.priceArr)) { %>' +
                        '<div class="info_container">' +
                            '<span class="current_price clr_contTypeA_subTxt"><%= currentPriceText %>:</span><br />' + '' +
                            //'<span class="price clr_contTypeA_hdlTxt"><%= price %></span>' +
                            '<div class="narrow_price_container clr_contTypeA_hdlTxt" dir="ltr">' +
                                '<% if (meta.currencySign) { %>' +
                                    '<span class="currency"><%= meta.currencySign %></span>' +
                                '<% } %>' +
                                '<span class="dollars"><%= meta.priceArr[0] %></span>' +
                                '<% if (meta.priceArr[1]) { %>' +
                                    '<span class="cents"><%= meta.priceArr[1] %></span>' +
                                '<% } %>' +
                            '</div>' +
                        '</div>' +
                        '<% } %>' +
                    '</div>' +
                '<% } %>' +
                '</div><!-- /clr_contTypeA_hdlTxt -->' +

                '<div class="clr_contTypeB_bg clr_contTypeB_txt">' +

                    '<% if (details) { %>' +
                        '<div class="details_container">' +
                            '<div class="details_header clr_contTypeB_hdlTxt"><%= CollectionsItemDetails %>:</div>' +
                        '</div>' +
                    '<% } %>' +

                    '<div class="contact_details_container">' +

                        '<% if (email) { %>' +
                            '<%= email %>' +
                        '<% } %>' +

                        '<% if (facebook) { %>' +
                            '<%= facebook %>' +
                        '<% } %>' +

                        '<% if (linkedin) { %>' +
                            '<%= linkedin %>' +
                        '<% } %>' +

                        '<% if (twitter) { %>' +
                            '<%= twitter %>' +
                        '<% } %>' +

                        '<% if (contact_web) { %>' +
                            '<%= contact_web %>' +
                        '<% } %>' +

                        '<% if (contact_web2) { %>' +
                            '<%= contact_web2 %>' +
                        '<% } %>' +

                        '<div style="clear: both;"></div>' +

                    '</div>' +
                '</div>' +
            '</div>'
        ),

        "contact_link_template": _.template(
            '<a href="<%= href %>" data-role="button" class="ui-btn-up contact_icon sprite sprite-<%= sprite_name %>"></a>'
        ),

        "contact_item_template": _.template(
            '<span data-href="<%= href %>" data-role="button" class="ui-btn-up contact_icon sprite sprite-<%= sprite_name %>"></span>'
        ),

        "item_descendant_summary": _.template(
            '<% if (typeof thumbnail !== "undefined") { %><div class="thumbnail sliced_image" style="background-image:url(\'<%= thumbnail %>\');"></div><% } %>' +
                '<div class="descendant_summary_content_container">' +
                    '<div class="descendant_summary_content_table_emulation">' +
                        '<div class="descendant_summary_content_tr_emulation">' +
                            '<div class="descendant_summary_content">' +
                                '<div class="descendant_summary_title clr_contTypeA_hdlTxt size_title_1 _1_line"><%= title %></div>' +
                                '<div class="descendant_summary_subtitle clr_contTypeA_subTxt size_0 max_2_lines"><%= subtitle %></div>' +
                                '<% if (price) { %>' +
                                    '<div class="descendant_summary_price clr_contTypeA_txt"><%= price %></div>' +
                                '<% } %>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '<div class="slide_arrow_image mask_sprite sprite-arrow clr_contTypeA_icn"></div>'
        )
    };

//collectionsTemplates.item_descendant_summary = collectionsTemplates.node_descendant_summary;


/* common for wide (iPad) and narrow (iPhone) */
//collectionsTemplates.no_items_results = _.template(
//'<div class="no_results_container no_items_results_container clr_contTypeB_bg clr_contTypeB_brdr">' +
//    '<div class="title size_title_4 clr_contTypeB_hdlTxt"><%= _T("CollectionsSearchNoItemsFound") %></div>' +
//    '<div class="subtitle size_title_1 clr_contTypeB_subTxt"><%= _T("CollectionsSearchNoItemsFoundSubtitle", {node_name: node_name}) %></div>' +
//'</div>');
//
//collectionsTemplates.no_search_results = _.template(
//'<div class="no_results_container no_search_results_container clr_contTypeB_bg clr_contTypeB_brdr">' +
//    '<div class="watermark mask_sprite sprite-noSearchItemsIcn clr_contTypeB_subIcn"></div>' +
//    '<div class="title size_title_4 clr_contTypeB_hdlTxt"><%= _T("CollectionsSearchNoResultsFound") %></div>' +
//    '<div class="subtitle size_title_1 clr_contTypeB_subTxt"><%= _T("CollectionsSearchNoResultsFoundSubtitle", {node_name: node_name, query_string: query_string}) %></div>' +
//'</div>');









/* iPad views: */

collectionsTemplates.CollectionsCategoryLeftView = _.template(
//TODO: Do we want scroller here?
'<div class="scroll_wrapper"><div class="scroller">' +
'<% if (headerImage) { %>' +
    '<div class="headerImage sliced_image" style="background-image:url(\'<%= headerImage %>\');">' +
        '<div class="catImage clr_images_catImage_bg"></div>' +
    '</div>' +
'<% } %>' +
'<% if (name) { %>' +
    '<div class="name size_title_4 clr_contTypeA_hdlTxt"><%= name %></div>' +
'<% } %>' +
'<% if (description) { %>' +
    '<div class="description size_1 clr_contTypeA_subTxt"><%= description %></div>' +
'<% } %>' +
'</div></div>'
);

collectionsTemplates.CollectionsItemRightView = _.template(
'<div class="scroll_wrapper"><div class="scroller">' +
'<div class="data_content">' +
'<% if (headerImage) { %>' +
    '<div class="headerImage sliced_image" style="background-image:url(\'<%= headerImage %>\');">' +
        '<div class="catImage clr_images_catImage_bg"></div>' +
        '<div class="full_screen_hint sprite sprite-FullScreenIcon"></div>' +
    '</div>' +
'<% } %>' +
'<% if (meta.images.length > 1) { %>' +
    '<div class="images_container clr_contTypeB_subBg">' +
        '<div class="item_thumbnail sliced_image" style="background-image:url(\'<%= meta.images[0] %>\');"><div data-role="button" class="catImage clr_images_catImage_bg selected" data-index="0"></div></div>' +
        '<div class="item_thumbnail sliced_image" style="background-image:url(\'<%= meta.images[1] %>\');"><div data-role="button" class="catImage clr_images_catImage_bg" data-index="1"></div></div>' +
        '<% if (meta.images.length > 2) { %>' +
            '<div class="item_thumbnail sliced_image" style="background-image:url(\'<%= meta.images[2] %>\');"><div data-role="button" class="catImage clr_images_catImage_bg" data-index="2"></div></div>' +
        '<% } %>' +
    '</div>' +
'<% } %>' +
'<% if (name) { %>' +
    '<div class="name size_title_4 clr_contTypeB_hdlTxt"><%= name %></div>' +
'<% } %>' +
'<% if (description) { %>' +
    '<div class="description size_1 clr_contTypeB_subTxt"><%= description %></div>' +
'<% } %>' +
'<% if ((meta.price && _.isArray(meta.priceArr)) || needBuyButton) { %>' +
    '<div class="price_container clr_contTypeB_subBg">' +
        '<% if (meta.price && _.isArray(meta.priceArr)) { %>' +
            '<div class="price clr_contTypeB_hdlTxt" dir="ltr">' +
                '<% if (meta.currencySign) { %>' +
                    '<span class="currency"><%= meta.currencySign %></span>' +
                '<% } %>' +
                '<span class="dollars"><%= meta.priceArr[0] %></span>' +
                '<% if (meta.priceArr[1]) { %>' +
                '<span class="cents"><%= meta.priceArr[1] %></span>' +
                '<% } %>' +
            '</div>' +
        '<% } %>' +
        '<% if (needBuyButton) { %>' +
            '<div data-role="button" class="buy_now clr_contTypeB_actBtn_bg clr_contTypeB_actBtn_brdr clr_contTypeB_actBtn_hdlTxt">' +
                '<span class="text"><%= buyNow %></span>' +
            '</div>' +
        '<% } %>' +
    '</div>' +
'<% } %>' +
'<% if (meta.details) { %>' +
    '<div class="details size_1 clr_contTypeB_txt"><%= meta.details %></div>' +
'<% } %>' +
'</div>' +
'<div class="scrollingBug"></div>' + // we have scrolling issue. I don't know why. so I use this as walkaround...
/*'<div class="clearfix">A</div>' +
'<div class="clearfix">B</div>' +*/
'</div></div>'
);

collectionsTemplates.CollectionsCategoryRightView = _.template(
'<div class="scroll_wrapper"><div class="scroller">' +
    '<div class="bread_wrapper"></div>' +
    '<div class="no_result_wrapper"></div>' +
    '<div class="grid_wrapper"></div>' +
'</div></div>'
);

collectionsTemplates.CollectionsItemLeftView = _.template(
'<div class="scroll_wrapper"><div class="scroller">' +
'</div></div>'
);

collectionsTemplates.CollectionsGridItemView =
{
    category: _.template(
'<% if (headerImage) { %>' +
    '<div class="headerImage sliced_image" style="background-image:url(\'<%= headerImage %>\');">' +
        '<div class="header_box clr_contTypeC_bg">' +
            '<% if(name){ %>' +
                '<div class="size_title_3 _1_line name clr_contTypeC_hdlTxt ellipsis"><%= name %></div>' +
            '<% } %>' +
            '<% if(itemsCountStr){ %>' +
                '<div class="size_title_0 _1_line itemsCountStr clr_contTypeC_subTxt"><%= itemsCountStr %></div>' +
            '<% } %>' +
        '</div>' +
        '<div data-role="button" class="catImage clr_images_catImage_bg"></div>' +
    '</div>' +
'<% } %>'
),
    item: _.template(
'<% if (headerImage) { %>' +
    '<div class="headerImage sliced_image" style="background-image:url(\'<%= headerImage %>\');">' +
        '<% if (meta.price) { %>' +
            '<div data-role="button" class="catImage clr_images_catImage_bgGrad"></div>' +
            '<div class="price clr_images_catImage_txt" dir="ltr">' +
                '<% if (meta.currencySign && _.isArray(meta.priceArr)) { %>' +
                    '<span class="currency"><%= meta.currencySign %></span>' +
                '<% } %>' +
                '<% if (_.isArray(meta.priceArr) && meta.priceArr.length > 0) { %>' +
                    '<span class="dollars"><%= meta.priceArr[0] %></span>' +
                '<% } %>' +
                '<% if (_.isArray(meta.priceArr) && meta.priceArr.length > 1) { %>' +
                    '<span class="cents"><%= meta.priceArr[1] %></span>' +
                '<% } %>' +
            '</div>' +
        '<% } else { %>' +
            '<div data-role="button" class="catImage clr_images_catImage_bg"></div>' +
        '<% } %>' +
    '</div>' +
'<% } %>' +
//'<% if (name) { %>' +
//    '<div class="name_container size_1 _2_lines clr_contTypeB_hdlTxt">' +
//        '<div class="name"><%= name %></div>' +
//    '</div>' +
//'<% } %>'
'<div class="name_container size_1 _2_lines clr_contTypeB_hdlTxt"><%= name %></div>'
    )
};

collectionsTemplates.CollectionsListItemView = _.template(
'<% if (headerImage) { %>' +
    '<div class="headerImage sliced_image" style="background-image:url(\'<%= headerImage %>\');">' +
        '<div class="catImage clr_images_catImage_bg"></div>' +
    '</div>' +
'<% } %>' +
'<div class="vertical_center"><div>' +
    '<% if (name) { %>' +
        '<div class="name size_1 <% if (meta.price) { %>max_2_lines<% } else { %>max_3_lines<% } %> clr_contTypeA_hdlTxt"><%= name %></div>' +
    '<% } %>' +
    '<% if (meta.price && _.isArray(meta.priceArr)) { %>' +
        '<div class="price clr_contTypeA_subTxt" dir="ltr">' +
            '<% if (meta.currencySign) { %>' +
                '<span class="currency"><%= meta.currencySign %></span>' +
            '<% } %>' +
            '<% if (meta.priceArr.length > 0) { %>' +
                '<span class="dollars"><%= meta.priceArr[0] %></span>' +
            '<% } %>' +
            '<% if (meta.priceArr.length > 1) { %>' +
                '<span class="cents"><%= meta.priceArr[1] %></span>' +
            '<% } %>' +
        '</div>' +
    '<% } %>' +
'</div></div>'
);

/* BreadBarView */

collectionsTemplates.BreadCrumb = _.template(
'<span class="BreadCrumb size_1 clr_contTypeA_subTxt"><%= name %></span>' +
'<div class="BreadCrumbArrow mask_sprite sprite-breadArrow clr_contTypeA_subIcn"></div>'
);

collectionsTemplates.lastBreadCrumb = _.template(
    '<span class="BreadCrumb size_1 clr_contTypeA_hdlTxt"><%= name %></span>'
);

    /*TODO: split to 2: "lastBreadCrumb", "Search" ?*/
collectionsTemplates.Search = _.template(
'<span class="search_container_wide clr_form_input_bg clr_form_input_brdr">' +
    '<div class="right mainButtonContainer clr_form_input_brdr"  data-role="button">' +
        '<div class="clearButton mask_sprite sprite-la-cancel clr_form_input_icn selected"></div>' +
        '<div class="searchButton mask_sprite sprite-search clr_form_input_icn"></div>' +
    '</div>' +
    '<div class="left searchIndicator mask_sprite sprite-catSearchSmall clr_form_input_icn"></div>' +
    '<div class="right clearEditButton">' + // TODO: add  data-role="button" for this container?
        '<div class="mask_sprite sprite-catXSmall clr_form_input_icn" data-role="button"></div>' +
    '</div>' +
    '<div class="textContainer clr_form_input_txt">' +
        '<form class="search_form" action="javascript:void(0)">' +
            '<input type="text" class="searchInput" placeholder="<%= placeholder %>" />' +
            //'<input type="submit" style="display: none">' +
            //'<input type="submit" style="...">' +
        '</form>' +
    '</div>' +
'</span>' +
'<div class="clearfix"></div>');

collectionsTemplates.BreadBarView = _.template(
'<div class="breadContainer ellipsis"></div>'
);





    window.collectionsTemplates = collectionsTemplates;
})();

 /*
 * Collections template's Node Model
 *
 * @author Daniel Chcouri
 */

var CollectionsNodeModel = ItemsModel.extend({
    //NOTE: we can't use "default", because it will override the "ItemsModel.defaults", so we set it in initialize...
//    defaults: {
//        id: null,
//        collectionId: null,
//        nodeId: null, // nodeId is like id, but we set it only in CMS response,
//        meta: {},
//        description: "", // description (NOT HTML!)
//        name: "", // string title
//        headerImage: "", // NOTE: we calc it from the meta.images.header or meta.images.main1
//        isCategory: true, // is category or "leaf" item. in this model this is always true TODO: delete this, and use only "type"
//        itemsCount: null, // NOTE: 0 means 0 items. null means unknwon (e.g.: not supported yet in the service...)
//        defaultImage: "http://storage.conduit.com/Mobile/66/e4/663a9521-49e4-4c44-80b4-826b9ff4405f/Images/fd4fa8cc-4253-4959-9f8b-4b05f54d4e09.png", // default image to this item and to all items under it. NOTE: we temporary add this, until the service will return a defaultImage.
//        breadCrumbs: [] // array of all models "before" me.
//    },

    initialize: function () {
        ItemsModel.prototype.initialize.apply(this, arguments);

        //NOTE: we can't use "default", because it will override the "ItemsModel.defaults"...
        var defaults = {
            id: null,
                collectionId: null,
                nodeId: null, // nodeId is like id, but we set it only in CMS response,
                meta: {},
                needBuyButton: false, // do we need a buy button for this item?
                description: "", // description (NOT HTML!)
                name: "", // string title
                headerImage: "", // NOTE: we calc it from the meta.images.header or meta.images.main1
                isCategory: true, // is category or "leaf" item. in this model this is always true TODO: delete this, and use only "type"
                itemsCount: null, // NOTE: 0 means 0 items. null means unknwon (e.g.: not supported yet in the service...)
                defaultImage: "http://storage.conduit.com/Mobile/66/e4/663a9521-49e4-4c44-80b4-826b9ff4405f/Images/fd4fa8cc-4253-4959-9f8b-4b05f54d4e09.png", // default image to this item and to all items under it. NOTE: we temporary add this, until the service will return a defaultImage.
                breadCrumbs: [] // array of all models "before" me.
        };

        var data = $.extend(defaults, this.toJSON());
        this._updateFromJSON(data);
    },

    /**
     * we make some parsing on the JSON data of the model
     */
    _updateFromJSON: function (data) {

        var meta = data.meta;

        // make simple access to headerImage:
        var images = meta.images || {};
        data.headerImage = images.header || images[0] || images.main1 || data.defaultImage;
        data.isCategory = this.get('type') === collectionsEnums.nodeType.CATEGORY;

        // split the price, e.g.: 29.5 to "29","50"
        if (meta.priceInt) {
            var priceArr = ("" + meta.priceInt).split(".");
            priceArr[0] = localization.formatNumber(priceArr[0]);
            if (priceArr[1] && priceArr[1].length === 1) {
                priceArr[1] = priceArr[1] + "0";
            }
            //TODO: cut the "cents" to maximum 2 chars?

            meta.priceArr = priceArr;
        }

        // create model for "shareIconsView"
        if (meta.links &&
            (meta.links.email || meta.links.web || meta.links.linkedin)) {
            var params = {
                buttons: {
                    twitter: null,
                    facebook: null,
                    linkedin: meta.links.linkedIn,
                    webSite: meta.links.web,
                    mySpace: null,
                    email: meta.links.email
                }
            };
            var shareIconsModel = new Backbone.Model(params);
            meta.shareIconsModel = shareIconsModel;
        }

        //we need "buy now" button in case of url-link
        data.needBuyButton = meta.links && meta.links.store;

        //TODO: sanitize texts, etc.?

        data.alias = data.id; //NOTE: we need that the alias will be like the id, because we take the alias as an id to the service...
        this.set(data);
    },

    createItemsCollection: function () {
        var params = {
            id: this.get("collectionId"), // relevant for search, root and node
            parentId: this.get("nodeId"), // relevant for search and node
            defaultImage: this.get("defaultImage") // we add this for set the default image for all items under it. NOTE: if the service will return defaultImage, it will update it.
        };
        var collection = new CollectionsCollection(null, params);

        // we add this for set the default image for all items under it. NOTE: if the service will return defaultImage, it will update it.
        //collection.defaultImage = this.get("defaultImage");

        // find the breadCrumbs for every model in my collection:
        collection.breadCrumbs = _.extend([], this.get('breadCrumbs'));
        // add "me" as the last model in the array:
        collection.breadCrumbs.push(this);

        //collection.nodeId = this.get("nodeId"); // relevant for search and node
        collection.term = this.get("term"); // relevant for search
        collection.type = this.get("type"); // relevant for search

        // handle get data about me (e.g. name of the category)
        collection.bind('getItemsSuccess', this._onGetItemsSuccess, this);

        return collection;
    },

    _onGetItemsSuccess: function (metaData)
    {
        //TODO: do we need this sanity "if"?
        if (metaData)
        {
            if (metaData.category)
            {
                //TODO: do we want to do "extend current attributes", before "_updateFromJSON"? e.g.: to stay with current default image, etc.
                this._updateFromJSON(metaData.category);
            }
            //temporary, until we will get "category" also for root level:
            else
            {
                var name = metaData.name || this.get('name');
                var description = metaData.description || this.get('description');
                var headerImage = metaData.meta && metaData.meta.images && metaData.meta.images.header;
                headerImage = headerImage || this.get('headerImage');
                this.set({
                    name: name,
                    description: description,
                    headerImage: headerImage
                });
            }
            this.trigger('headerChanged');
        }
    },

    /**
     * reset the collection, and get new items with the search term & type
     * @param {string} term - the term for the search. note: can be null for "no search"
     * @param {string} type - the type for the search.
     */
    setSearch: function (term, type) {
        var collection = this.get('items');
        collection.term = term;
        collection.type = type;
        collection.reset();
        var executeOptions = executeTypeEnum.HIT_AND_RUN; //OK? something else?
        collection.getItems(executeOptions);
    },

    /**
     * get  the search term. can be null, etc. if no search
     * @return {string} term - the term for the search. note: can be null etc. for "no search"
     */
    getSearchTerm: function () {
        var collection = this.get('items');
        return collection.term;
    },

    /**
     * ...
     * @return ...
     */
    buy: function () {
        var url = this.get('meta').links.store;

        appDriver.openLink(null, null,
            {
                'url': url,
                'title': url
            });
    },

    /**
     * reset the collection, and get new items without the search
     */
    clearSearch: function () {
        this.setSearch(null, null);
    }
}); /*
* Collections template Collection
*/
var CollectionsCollection = ItemsCollection.extend({

	model: CollectionsNodeModel,
	
	initialize: function(models, params) {
		ItemsCollection.prototype.initialize.apply(this, arguments);
		this.defaultImage = params.defaultImage;
		this.layoutId = params.layoutId;
        this.parentId = params.parentId;

		if ( !params || !params.id )
			this.invalid = true;
        this.params = {
            id: params.id, // relevant for search, root and node
            extraInfo: { // relevant for node
                parentId: params.parentId
            },
            collectionId: params.id,// relevant for search
            type: null,//params.type,// relevant for search
            searchParams: { // relevant for search
                term: null,
                parentId: params.parentId,
                sortOrder: 0 // 0 asc, 1 desc
            }
        };
	},

	parse: function (result) {
		result = result || {};
		
		var collectionId = this.params.id;
		var layoutId = this.layoutId;
		// if there is a defaultImage from the service: update my defaultImage.
		var defaultImage = result.defaultImage || this.defaultImage;
        var breadCrumbs = this.breadCrumbs;

		_.each(result.items, function (item) {
			// add the "collectionId", "layoutId", "defaultImage", etc. to each item:
			item.collectionId = collectionId;
			item.layoutId = layoutId;
			item.defaultImage = defaultImage;
            item.breadCrumbs = breadCrumbs;

			//set nodeId:
			item.nodeId = item.id;

			//item.type = collectionsNodesTypes[item.type];

			if (item.type === collectionsEnums.nodeType.ITEM) {
				var raw_images = item.meta.images,
					images = [];

				if (typeof raw_images !== 'undefined') {
					for (var i = 0; i < 10; i++) {
						if (raw_images["main" + i]) {
							images.push(raw_images["main" + i]);
						}
					}

					item.meta.images = images;
				}
			}
		});

		return {models: result.items, metaData: result};
	},

	getParams: function () {
		this.params.skip = this.skip;

        //update search term:
        this.params.type = this.type;
        this.params.searchParams.term = this.term;

        return this.params;
	},

    getServiceName: function () {
        if(this.term)//search
        {
            return 'CMS_CONTENT_ITEMS_SEARCH';
        }
        else if(this.parentId)//node
        {
            return 'CMS_CONTENT_ITEMS';
        }
        else //root
        {
            return 'CMS_CONTENT_COLLECTION';
        }
    }

}); /*
* @author Daniel Chcouri
*/
var CollectionsDescendantSummaryView = /*ItemsView*/Backbone.View.extend(
{
	tagName: 'li',

	className: 'descendant_summary clr_contTypeA_classicItem_bg clr_contTypeA_classicItem_brdr',

    events:
    {
        "tap": "itemClicked"
    },

	initialize: function () {
        this.model.set('tabMeta', this.options.tabMeta);
//		this.$el.data("model", this.model);
	},

	render: function () {
		this.$el.attr('data-role', 'button');

		var type = this.model.get("type");

		var model_meta = this.model.get("meta");

		// set template according to layout
		var template = /*collectionsTemplates[type + "_descendant_summary"];*/ collectionsTemplates["item_descendant_summary"];

		var thumbnail = undefined;
		this.$el.addClass("no_thumbnail");
		if (type === collectionsEnums.nodeType.CATEGORY) {
            thumbnail = Utils.Helpers.getPath(model_meta, 'images.main');
			if (thumbnail && thumbnail.length > 0) {
				this.$el.removeClass("no_thumbnail");
			}
		} else if (type === collectionsEnums.nodeType.ITEM) {
			if (model_meta.images && model_meta.images[0] && model_meta.images[0].length > 0) {
				thumbnail = model_meta.images[0];
				this.$el.removeClass("no_thumbnail");
			}
		}

		this.$el.append(template({title: this.model.get("name"), subtitle: this.model.get("description"), price: this.model.get("meta").price, thumbnail: thumbnail}));

		return this;
	},

    itemClicked: function (e)
    {
        e.preventDefault();
        var alias = this.model.get('alias'); //NOTE: this is the same like: this.model.get('id')

        if (this.model.get('type') === collectionsEnums.nodeType.CATEGORY)
        {

            // set current item in CurrentPageTracker:
            CurrentPageTracker.setCurrentItem(this.model);

            // add "item view" usage-event:
            UsageManager.addEvent(analytics.usageEventTypeEnum.ItemView, {
                id: this.model.get('id'),
                list: true
            });


            UN.navTo(alias, {level:2}); // page/tab/CATEGORY_ID
        }
        else //if (this.model.get('type') === collectionsEnums.nodeType.ITEM)
        {
            UN.navTo(alias, {level:4}); // page/tab/category/search/ITEM_ID
        }
    }

});
 /*
 * @author Daniel Chcouri
 */
var CollectionsItemView = Backbone.View.extend({
	events: {
		"tap .item_thumbnail": "collectionItemThumbnailClicked",
		"tap .main_image": "onCollectionMainImageClicked",
        "tap .buy_now": "buyClicked",
		"tap [href]": "openLink"
	},

	initialize: function () {
		this.$el.attr({
			'data-role': 'page',
			'data-buttons': 'refresh'
		});

		this.$el.html(genericPageTemplates.pageTemplate());

		//		this.$el.data("model", this.model).data("view", this);
		//
		//		this.$el.addClass("item_view");
		//
		//		this.$el.attr("parent", this.model.get("parentId"));

		// intialize the scrolling.
		Scrolling.init(this.$('.scroll_wrapper'));
		this.$scroller = this.$('.scroller');

		var itemTemplate = collectionsTemplates["item_view"];
		var meta = this.model.get("meta");
		var details = meta.details;
		var links = meta.links;
		var links = meta.links;

		this.$scroller.append(itemTemplate({
			name: this.model.get("name"),
			description: this.model.get("description"),
            needBuyButton: this.model.get("needBuyButton"),
			images: meta.images,
			price: meta.price,
            meta: meta,
			priceInt: meta.priceInt,
			details: details,
			//			layout: this.model.get("layout"),
			//TODO: What is all this? we have a controller for this! change it!
            buyNowText: _T("CollectionsBuyNow"),
            currentPriceText: _T("CollectionsCurrentPrice"),
            CollectionsItemDetails: _T("CollectionsItemDetails"),
            email: links.email ? collectionsTemplates["contact_link_template"]({ href: "mailto:" + links.email, sprite_name: "aboutus_email"}) : null,
            facebook: links.facebook ? collectionsTemplates["contact_item_template"]({ href: links.facebook, sprite_name: "aboutus_facebook" }) : null,
            linkedin: links.linkedIn ? collectionsTemplates["contact_item_template"]({ href: links.linkedIn, sprite_name: "aboutus_linkedin"}) : null,
            twitter: links.twitter ? collectionsTemplates["contact_item_template"]({ href: links.twitter, sprite_name: "aboutus_twitter"}) : null,
            contact_web: links.web ? collectionsTemplates["contact_item_template"]({ href: links.web, sprite_name: "aboutus_link"}) : null,
            contact_web2: links.web2 ? collectionsTemplates["contact_item_template"]({ href: links.web2, sprite_name: "aboutus_link"}) : null

		}));

		if (details) {
			// Render HTML into container using HTML container control
			var htmlContainer = new HtmlContainerControl();

			// Set the description DIVs with the HTML Content
			htmlContainer.renderHtml(this.$scroller.find('.details_container'),
				details, {
					changeColors: false,
					colorType: "B"
				});

		}

		var $linkElements = this.$scroller.find('.contact_details_container span.contact_icon');
		$linkElements.tap(function () {
			var $this = $(this);
			var url = $this.attr('data-href'); // Get link URL and title

            appDriver.openLink(null, null, {
                'url': url,
                'title': $this.text()
            });

		});
	},

	collectionItemThumbnailClicked: function (e) {
		var $selected = $(e.target);
		this.imageIndex = parseInt($selected.attr("data-index"));
		var image = this.model.get('meta').images[this.imageIndex];

		//update the main image:
		this.$(".main_image").css("background-image", 'url(' + image + ')');
	},

	onCollectionMainImageClicked: function (e) {
		var model = this.model;
		var images_array = _.map(this.model.get('meta').images, function (path) {

			return {
				largeImage: path,
				shareInfo: {
					imageUrl: path,
					title: model.get("name"),
					url: path,
					shortDesc: model.get("description") || ''
				}
			};
		});
		new PhotoGalleryManager().pressedImage(images_array, this.imageIndex || 0);
	},

	getRootView: function () {
		return this.$scroller;
	},

    buyClicked: function (e) {
		this.model.buy();
	},

	openLink: function (e) {
        var url = $(e.currentTarget).attr("href");
        appDriver.openLink(null, null, {
            url: url
        });
        e.preventDefault();
	}
}); /*
* @author Daniel Chcouri
*/
var CollectionsNodeView = ItemsView.extend(
{
    className: "collection_view",

	initialize: function ()
	{
        this.$el.attr(
        {
            'data-role': 'page',
            'data-buttons': 'refresh'
        });

        this.$el.html(collectionsTemplates.collectionsWrapper());

        // intialize the scrolling.
        Scrolling.init(this.$('.scroll_wrapper'));

		this.$scroller = this.$('.scroller');

        //NOTE: bind on "change" is not good. we get lots of "change events" due to unrelevant params, like "loadingType"
//        this.model.on('change', this._updateHeader, this);
        this.model.on('headerChanged', this._updateHeader, this);
//        this._updateHeader();

        this.$el.bind('refresh', this.handleRefreshClick.hitch(this));
        this.$el.bind('silentRefresh', this.handleSilentRefresh.hitch(this));

        // super()
		ItemsView.prototype.initialize.apply(this);
	},

	_updateHeader: function ()
	{
        var headerTemplate = collectionsTemplates["node_view"];

        var isSearch = !!this.model.get("term");
        var description = this.model.get("description");
        description = description && description.trim() || description;

        var name = this.model.get("name");
        name = name && name.trim() || name;

        this.$('.header').html(headerTemplate({
            name: Utils.String.sanitizeText(name, true),
            description: Utils.String.sanitizeText(description, true),
            headerImage: this.model.get("headerImage"),
            isSearch: isSearch
        }));

        // if the node type is root or node (not search node) display the search view
        if (!isSearch) {
            var searchView = new SearchView({model: this.model});
            this.$scroller.find(".search_container_container").html(searchView.render().el);
        }
	},

    getRootView: function ()
    {
        return this.$scroller.find(".descendants_container");
    },

    createItemView: function (item) {
        return new CollectionsDescendantSummaryView({
            model: item,
            tabMeta: this.model.get('tabMeta')
//            layout: this.model.get('layout'),
//            id: 'descendant_' + item.get('id')
        });
    }

//    onNoResults: function () {
//        this.$scroller.css({height: "100%"});
//
//        if (typeof this.model.get("term") !== 'undefined') {
//            this.$scroller
//                .html(collectionsTemplates["no_search_results"]({
//                    query_string: this.model.get("term"),
//                    node_name: this.model.get("name")
//                }));
//        } else {
//            this.$scroller
//                .html(collectionsTemplates["no_items_results"]({
//                    node_name: this.model.get("name")
//                }));
//        }
//
//    }
});
 /*
 * the "search" bar view (only for narrow).
 * this view show the search input and handle the events
 */
var SearchView = Backbone.View.extend({
    className: "search_container clr_contTypeB_bg clr_contTypeB_brdr",

    events: {
        "tap .search_button": "onSearchButtonClicked",
        "submit .search_form": "onSearchButtonClicked"
    },

    onSearchButtonClicked: function () {
        var term = this.$input.val();

        //fix crazy bug where IOS would crash after clicking "search"
        this.$input.blur();
        window.setTimeout(function() {

            if (term) {
                UN.navTo(collectionsEnums.aliases.SEARCH_URL + term, {level:3}); // page/tab/category/Q_searchTerm
                //TODO: do we want to clear the input field?
                //this.$input.val('');
            }
        },1);

    },

    render: function () {
        var param = {
            CollectionsSearchPlaceholder: _T("CollectionsSearchPlaceholder", {"category": this.model.get('name')})
        };
        this.$el.html(collectionsTemplates.search_view(param));

        this.$input = this.$('.search_input');

        return this;

    }
}); /**
 * The collection template (for narrow only).
 */
var CollectionsTemplateView = TemplateView.extend(
    {
        /**
         * OVERRIDE - render level 1 - tab:
         */
        _renderTab : function(index, navRequest)
        {
            var templateMetaData = this.model.get('meta');

            var tabData = templateMetaData.items[index] || {};

            var collectionId = tabData.params && tabData.params.id;
            tabData.layoutId = templateMetaData.pageLayout;
            tabData.collectionId = collectionId;

            var data = {
                tabParams: tabData
            };
            UN.registerChange(this.onCategorySelected.hitch(this), 2, {navRequest: navRequest, data: data, cbSelectDefault: this._selectDefaultCategory.hitch(this)});
        },

        /**
         * select default item (=root) on level 2 (root / sub category)
         */
        _selectDefaultCategory: function(data)
        {
            var navRequest = data.navRequest;
            // if not permalink: simulate the level 2 from the tab params.
            UN.navTo(collectionsEnums.aliases.DEFAULT_URL, {navRequest: navRequest, isInner: false});
        },

        /**
         * change on level 2 (root / sub category)
         */
        onCategorySelected: function (data, alias)
        {
            var navRequest = data.navRequest;
            var params = null;
            //check if we on root
            if (alias === collectionsEnums.aliases.DEFAULT_URL)
            {
                // clone the tab params (we have the layout,collectionId there, and probably more things...):
                params = $.extend({}, data.tabParams, {tabMeta: data.tabParams.meta});
            }
            //check if we on sub category:
            else
            {
                // get the category id by from alias, catalog id and layout from the tab:
                params = {
                    nodeId: alias,
                    layoutId: data.tabParams.layoutId,
                    collectionId: data.tabParams.collectionId,
                    tabMeta: data.tabParams.meta
                };
            }

            var data2 =
                {
                    addTabs: (alias === collectionsEnums.aliases.DEFAULT_URL),// we wants the tabs only on the "root" level, not after the user clicked on inner lists
                    params: params
                };

            UN.registerChange(this.onListSelected.hitch(this), 3, {navRequest: navRequest, data: data2, cbSelectDefault: this._selectDefaultList.hitch(this)});
        },

        /**
         * select default item on level 3 (normal/search)
         */
        _selectDefaultList: function(data)
        {
            var navRequest = data.navRequest;
            // if not permalink: simulate the level 3 from the tab params.
            UN.navTo(collectionsEnums.aliases.ITEMS_URL, {navRequest: navRequest, isInner: false});
        },

        /**
         * change on level 3 (normal / search)
         */
        onListSelected: function (data, alias)
        {
            var navRequest = data.navRequest;

            // clone the params:
            // TODO: maybe only on "default"? because maybe we moved to category without 1 of the params (e.g.: subtitle)- and we don't want the root subtitle...
            var params = $.extend({}, data.params);

            // create the model of the root / subCategory:
            var model = new CollectionsNodeModel(params);
            model.set('tabMeta',this.model.get('meta'));
            //check if we on search:
            if (alias.startsWith(collectionsEnums.aliases.SEARCH_URL))
            {
                // get the search term by removing the "Q_" at the beginning
                var term = alias.replace(collectionsEnums.aliases.SEARCH_URL, "");
                var type = 'contenthost';

//                model.setSearch(term, type);
                // for narrow, to know that this is search:
                model.set({term: term});
                // for getting the search data:
                var collection = model.get('items');
                collection.term = term;
                collection.type = type;

                // add "Search" usage-event:
                UsageManager.addEvent(analytics.usageEventTypeEnum.Search, {
                    term: term
                });

            }
            //check if we on normal (=no search)
            else // if (alias === collectionsEnums.aliases.ITEMS_URL)
            {
                // nothing to do here...
            }


            var view = new CollectionsNodeView({
                model: model
            });

            this.renderListPage({navRequest: navRequest, model: model, view: view, addTabs: data.addTabs, level: 3});
        },

        /**
         * OVERRIDE - handle "lonely item"
         * NOTE: TEMPORARY, until the CP will be changed, and then we will not want this behaviour!
         */
        selectDefaultItem: function (data)
        {
            var navRequest = data.navRequest;
            // we want to select lonely item only on 1st level:
            var catAlias = UN.getCurrentUrlAtLevel(2);
            var itemsCollection = data.model.get('items');
            if (itemsCollection.length === 1 && catAlias === collectionsEnums.aliases.DEFAULT_URL)
            {
                var itemModel = itemsCollection.at(0);
                // check that this is category, and not item (can be in search on 1st level)
                if (itemModel.get('isCategory'))
                {
                    catAlias = itemModel.get('alias');
                    UN.navTo(catAlias, {level: 2, navRequest: navRequest, isInner: false /* TODO: always false? */});
                    return;
                }
            }

            // call "super":
            TemplateView.prototype.selectDefaultItem.apply(this, arguments);
        },

        /**
         * OVERRIDE.
         */
        getDetailsView: function (model)
        {
            var detailsPage = new CollectionsItemView({
                model: model
            });

            return detailsPage;
        },

        /**
         * OVERRIDE.
         */
        getNoItemsView : function(settings)
        {
            var node_name = settings.model.get("name");
            var term = settings.model.get("items").term;

            if (term) {
                // no items for search
                var title = _T("CollectionsSearchNoResultsFound");
                var text = _T("CollectionsSearchNoResultsFoundSubtitle", {node_name: node_name, query_string: term});
                var img = "app/interface/web/img/search.svg";
            } else {
                // empty category
                var title = _T("CollectionsSearchNoItemsFound");
                var text = _T("CollectionsSearchNoItemsFoundSubtitle", {node_name: node_name});
                var img = "app/interface/web/img/noItems.svg";
            }

            var genericPageModel = new GenericPageModel({
                title: title,
                text: text,
                img: img
            });
            var id = Utils.Helpers.generateGUID();
            return new GenericPageView({
                model: genericPageModel,
                id: id
            });
        }


    }); /**
 * View that shows the preview of the item ("leaf" item or sub category) inside grid 
 * (=in the collection iPad page)
 * 
 * @author Matanya
 */
var CollectionsGridItemView = Backbone.View.extend(
{	
	tagName: 'li',

	className: 'CollectionsGridItemView',

	events:
	{
		"tap": "itemClicked"
	},
	
	// initialize: function () 
	// {
	// 	this.$el.attr('data-role', 'button').addClass('t3d');		
	// },

	render: function() 
	{	
		var params = this.model.toJSON();
		if (this.model.get('isCategory')) 
		{
			var className = 'category';
			var template = collectionsTemplates.CollectionsGridItemView.category;
			// TEST: params.itemsCount = 45;
			if (params.itemsCount === null) // unknown number of items 
			{
				params.itemsCountStr = _T('CollectionsCategoryUnknownItemsCount');
			}
			else
			{
				params.itemsCountStr = _T('CollectionsCategoryItemsCount', {count: params.itemsCount});
			}
		}
		else 
		{
			var className = 'item';
			var template = collectionsTemplates.CollectionsGridItemView.item;
		}
		
		this.$el.html(template(params)).addClass(className);
		return this;
	},

	itemClicked: function (event) 
	{
		event.preventDefault();
//		this.model.trigger('collectionItemClicked', this.model);
        var alias = this.model.get('alias'); //NOTE: this is the same like: this.model.get('id')

        if (this.model.get('type') === collectionsEnums.nodeType.CATEGORY)
        {
            // set current item in CurrentPageTracker:
            CurrentPageTracker.setCurrentItem(this.model);

            // add "item view" usage-event:
            UsageManager.addEvent(analytics.usageEventTypeEnum.ItemView, {
                id: this.model.get('id'),
                list: true
            });

            UN.navTo(alias, {level:2}); // page/tab/CATEGORY_ID
        }
        else //if (this.model.get('type') === collectionsEnums.nodeType.ITEM)
        {
            UN.navTo(alias, {level:4}); // page/tab/category/search/ITEM_ID
        }

	}
		
}); /*
* the left side of CollectionsWideCategoryView.
* this view show the category data (image, title, descr)
*/
var CollectionsCategoryLeftView = Backbone.View.extend(
{
	className: "CollectionsCategoryLeftView clr_contTypeA_bg",

    initialize: function () {
        //NOTE: bind on "change" is not good. we get lots of "change events" due to unrelevant params, like "loadingType"
//        this.model.on('change', this.render, this);
        this.model.on('headerChanged', this.render, this);
    },

    render: function ()
	{
		this.$el.html(collectionsTemplates.CollectionsCategoryLeftView(this.model.toJSON()));
		
		//TODO: do we need this init scroller? do we want here scroller at all?
        var $scrollWrapper = this.$('.scroll_wrapper');
        Scrolling.init($scrollWrapper);

		return this;
	}
}); /*
 * the "bread crumbs" bar view.
 * this view show the "bread crumbs" ("Shoes>sports>man>nike>search abc")
 * and can show the search input.
 */
var BreadBarView = Backbone.View.extend({
    className: "BreadBarView clr_contTypeB_bg",

    events: {
        "tap .mainButtonContainer": "mainButtonClicked",
        "tap .clearEditButton": "clearEditClicked",
        "blur .searchInput": "inputExit",
        "focus .searchInput": "inputEnter",
        "input .searchInput": "inputChanged" // "input" event. also for drag&drop, etc. http://jsfiddle.net/pxfunc/5kpeJ/
        //,"keyup .searchInput": "inputChanged"
        ,
        "submit .search_form": "searchClicked"
    },

    /* we catch the click on the external button to enlarge the clickable area */
    mainButtonClicked: function () {
        if (this.$searchButton.is(":visible"))
            this.searchClicked();
        else
            this.clearSearchClicked();
    },

    searchClicked: function () {
        //console.log('searchClicked');
        this.doSearch();
        this.$input.blur();
    },

    clearSearchClicked: function () {
        //console.log('clearSearchClicked');
        this.clearSearch();
        this.$input.blur();
    },

    clearEditClicked: function () {
        //console.log('clearEditClicked');
        //this.$input.blur();
        //this.cancelEdit();
        this.$input.val('');
    },

    inputEnter: function () {
        //console.log('inputEnter');
        this.$searchIndicator.hide();
        this.$clearButton.hide();

        this.$searchButton.show();
        this.$clearEditButton.show();

    },

    inputExit: function () {
        //console.log('inputExit');
        this.cancelEdit();
    },

    inputChanged: function () {
        //console.log('inputChanged');
        var term = this.$input.val();
        if (term) {
            this.$searchButton.addClass('selected');
        }
        else {
            this.$searchButton.removeClass('selected');
        }
    },

    cancelEdit: function () {
        //console.log('cancelEdit');
        this.$clearEditButton.hide();
        var term = this.model.getSearchTerm();
        if (term) {
            //NOTE: we can remove this. but we need also to call to "inputChanged"  (maybe we don't need, and it will call because of this change?)
            //like "inputChanged"
            this.$searchButton.addClass('selected');

            //like "doSearch"
            this.$searchIndicator.show();
            this.$clearButton.show();
            this.$searchButton.hide();
        }
        else {
            //like "inputChanged"
            this.$searchButton.removeClass('selected');

            //like "clearSearch"
            this.$searchIndicator.hide();
            this.$clearButton.hide();
            this.$searchButton.show();
        }
        this.$input.val(term);
    },

    doSearch: function () {
        var term = this.$input.val();
        var type = 'contenthost';
        this.model.setSearch(term, type);

        this.$searchIndicator.show();
        this.$clearButton.show();

        //this.$clearEditButton.hide();//need this?
        this.$searchButton.hide();

        // add "Search" usage-event:
        UsageManager.addEvent(analytics.usageEventTypeEnum.Search, {
            term: term
        });

    },

    clearSearch: function () {
        this.model.clearSearch();

        this.$searchIndicator.hide();
        this.$clearButton.hide();

        this.$searchButton.show();
    },

    initialize: function () {
//        this.model.on('change:breadCrumbs', this.render, this); // currently we don't get the breadCrumbs from CMS, so it will never be changed
        this.model.on('change:name', this.render, this);
    },

    render: function () {
        this.$el.html(collectionsTemplates.BreadBarView());
        var $breadContainer = this.$('.breadContainer');
        var breadCrumbs = this.model.get('breadCrumbs');
        for (var i = 0; i < breadCrumbs.length; i++) {
            var model = breadCrumbs[i];
            $breadContainer.append(collectionsTemplates.BreadCrumb(model.toJSON()));
        }
        var params = {
            name: this.model.get('name')
        };
        $breadContainer.append(collectionsTemplates.lastBreadCrumb(params));

        // add the search stuff:
        params = {
            placeholder: _T('CollectionsSearchPlaceholder2')
        };
        this.$el.append(collectionsTemplates.Search(params));
        this.$input = this.$('.searchInput');
        this.$clearButton = this.$('.clearButton');
        this.$searchButton = this.$('.searchButton');
        this.$searchIndicator = this.$('.searchIndicator');
        this.$clearEditButton = this.$('.clearEditButton');

        //will init controls: hide, show, etc:
        this.cancelEdit();
        return this;
    }


}); /*
* the right side of CollectionsWideCategoryView.
* this view show the category grid items
*/
var CollectionsCategoryRightView = ItemsView.extend(
{
	className: "CollectionsCategoryRightView clr_contTypeB_bg",

	initialize: function ()
	{
        // wrap with scroller.
        this.$el.html(collectionsTemplates.CollectionsCategoryRightView({}));
        this.$scroller = this.$('.scroller');
        this.$list = this.$('.grid_wrapper');
        this.$noResults = this.$('.no_result_wrapper');

        // add the bread view:
        var breadBarView = new BreadBarView({
            model: this.model
        });
        var $breadWrapper = this.$('.bread_wrapper');
        $breadWrapper.html(breadBarView.render().el);

        var $scrollWrapper = this.$('.scroll_wrapper');
        Scrolling.init($scrollWrapper);

        ItemsView.prototype.initialize.apply(this);

        // for update margin of the grid:
        // (we need the "pageshow" because the calc method need the ul visible...)
		$(window).bind("throttledresize", this.onResize.hitch(this));
        var itemsCollection = this.model.get('items');
        if (itemsCollection)
        {
            // we want to update the margin also for the new items, and handle "no events":
			itemsCollection.bind('getItemsSuccess', this.onGetItems, this);
        }

        this.bind("pageshow", this.onPageShow.hitch(this));
        this.bind("pagehide", this.onPageHide.hitch(this));
        // this.$el.bind("pageshow", this.onPageShow.hitch(this));
        // this.$el.bind("pagehide", this.onPageHide.hitch(this));

		// now - the page is not shown yet, so we start with
		// onPageHide (not with onPageShow):
		this.onPageHide();

        this.$el.bind('refresh', this.handleRefreshClick.hitch(this));
        this.$el.bind('silentRefresh', this.handleSilentRefresh.hitch(this));
	},

	getRootView: function ()
    {
	    return this.$list;
    },

	createItemView: function (item)
	{
		// if (this.model.get('type') === ...)
		// {
		// 	var itemView = new CollectionsGridItemView({ model: item });
		// }
		// else
		// {
		// 	var itemView = new CollectionGridCategoryView({ model: item });
		// }
        item.set('tabMeta', this.model.get('tabMeta'));
		var itemView = new CollectionsGridItemView({ model: item });
		return itemView;
	},

    /**
     * OVERRIDE, for handling "no results"
     */
    _reset: function ()
    {
        this.$scroller.removeClass('noResults');
        this.$noResults.html('').removeClass('noResults');
        //call super:
        ItemsView.prototype._reset.apply(this, arguments);
    },

    onNoResults: function () {

        var node_name = this.model.get("name");
        var term = this.model.get("items").term;

        if (term) {
            // no items for search
            var title = _T("CollectionsSearchNoResultsFound");
            var text = _T("CollectionsSearchNoResultsFoundSubtitle", {node_name: node_name, query_string: term});
            var img = "app/interface/web/img/search.svg";
        } else {
            // empty category
            var title = _T("CollectionsSearchNoItemsFound");
            var text = _T("CollectionsSearchNoItemsFoundSubtitle", {node_name: node_name});
            var img = "app/interface/web/img/noItems.svg";
        }

        var genericPageModel = new GenericPageModel({
            title: title,
            text: text,
            img: img
        });
        var noItemsView = new GenericView({
            model: genericPageModel
        });
        this.$scroller.addClass('noResults');
        this.$noResults.html(noItemsView.render().el).addClass('noResults');

//        var node_name = this.model.get("name");
//        var term = this.model.get("items").term;
//        if (term) {
//            var html = collectionsTemplates["no_search_results"]({
//                    query_string: term,
//                    node_name: node_name
//                });
//        } else {
//            var html = collectionsTemplates["no_items_results"]({
//                    node_name: node_name
//                });
//        }
//        this.$scroller.addClass('noResults');
//        this.$noResults.html(html).addClass('noResults');
    },

    onGetItems: function ()
    {
		if (!this.model.get('items').length)
            this.onNoResults();
        //TODO: do "onResize" only on "else"?
        this.onResize();
    },

    updateThumbnailsMargin: function ()
    {
        Utils.Html.setGridMargin(this.$itemsList, {alsoTopUl: true});
    },

    onResize: function ()
    {
		if (this.isPageShow)
		{
			this.updateThumbnailsMargin();
            this.isGridUpdated = true;
		}
        else
        {
            this.isGridUpdated = false;
            // We don't want the "jump" when calculating the grid-margin,
            // but we need the items to take up place - for margin calculation,
            // so we use the:
            // "hidden - The element is invisible (but still takes up space)"
            this.$itemsList.css({
                visibility: "hidden"
            });
        }
    },

    onPageShow: function ()
    {
		this.isPageShow = true;
        if (!this.isGridUpdated)
		{
            this.onResize();
            this.$itemsList.css({
                visibility: "visible"
            });
        }
    },

    onPageHide: function ()
    {
		this.isPageShow = false;

        if (!this.isGridUpdated)
        {
    		// We don't want the "jump" when calculating the grid-margin,
    		// but we need the items to take up place - for margin calculation,
    		// so we use the:
    		// "hidden - The element is invisible (but still takes up space)"
            this.$itemsList.css({
    			visibility: "hidden"
    		});
        }
    }
});
 /**
 * The collection main view (= "category view" ) for iPad.
 */
var CollectionsWideCategoryView = DividedScreenView.extend(
{
    setCollectionModel: function (collectionModel) 
    {        
        var leftView = new CollectionsCategoryLeftView({
            model: collectionModel
        });
        var rightView = new CollectionsCategoryRightView({
            model: collectionModel
        });
        this.setView1(leftView.render());
        this.setView2(rightView.render());
    }
}); /**
 * View that shows the preview of the item ("leaf" item) inside list
 * (=in the collection in details iPad page)
 * 
 * @author Matanya
 */
var CollectionsListItemView = ListItemView.extend(
{
	className: 'CollectionsListItemView clr_contTypeA_bg clr_contTypeA_brdr',

	events:
	{
		"tap": "itemClicked"
	},
	
	initialize: function () 
	{
        // call "super":
        ListItemView.prototype.initialize.apply(this);

        this.$el.attr('data-role', 'button').addClass('t3d');
	},
	
	render: function() 
	{	
		this.$el.html(collectionsTemplates.CollectionsListItemView(this.model.toJSON()));
		return this;
	},

    itemClicked: function (e) 
	{
        e.preventDefault();
        var alias = this.model.get('alias'); //NOTE: this is the same like: this.model.get('id')

        //TODO: do we want this "if"? in case that we will want to show also categories in the list...
//        if (this.model.get('type') === collectionsEnums.nodeType.CATEGORY)
//            UN.navTo(alias, {level:2}); // page/tab/CATEGORY_ID
//        else //if (this.model.get('type') === collectionsEnums.nodeType.ITEM)
            UN.navTo(alias, {level:4}); // page/tab/category/search/ITEM_ID
	}
		
}); /*
* the left side of CollectionsWideItemView.
* this view show the category list items
*/
var CollectionsItemLeftView = ItemsView.extend(
{	
	className: "CollectionsItemLeftView clr_contTypeA_bg",

	initialize: function () 
	{
        // wrap with scroller.
        this.$el.html(collectionsTemplates.CollectionsItemLeftView({}));
        this.$scroller = this.$('.scroller');
        this.$scrollWrapper = this.$('.scroll_wrapper');
        Scrolling.init(this.$scrollWrapper);
        
        ItemsView.prototype.initialize.apply(this);
        
        // we need this if we want to handle refresh
        this.$el.bind('refresh', this.handleRefreshClick.hitch(this));
        this.$el.bind('silentRefresh', this.handleSilentRefresh.hitch(this));

//        this.bind("pageshow", this.onPageShow.hitch(this));

	},

//    onPageShow: function ()
//    {
//        //NOTE: it is working only after page show...
//        this.scrollToSelected();
//    },
//
//    scrollToSelected: function ()
//    {
//        // 1) we need this timer for waitning that the page will be show, so we can calc offsets...
//        // 2) in addition, there are timers in the scroller after page show, etc. so we need to be
//        //      after these timers. TODO: fix it, that the scroller will not use timer. or, at least,
//        //      the scroller will call to cb when it finished with its stuff, or when we call to
//        //      scrollTo, the scroller will wait until it will finish all its stuff...
//        //NOTE: we don't need the timer because we use "time" for the animation (Scrolling.scrollTo(...,..., time))
////        setTimeout(function(){
//
//        var selectedItemOffset = this.$('.CollectionsListItemView.selected').offset();
//        if (selectedItemOffset)
//        {
//            var listOffset = this.$itemsList.offset();
//            var y = selectedItemOffset.top - listOffset.top;
//
//            var scope = this.$scrollWrapper.height();
//
//            // we want to scroll only if out of the scope:
//            if (y > scope)
//            {
//                Scrolling.scrollTo(this.$scrollWrapper, y, 500);
//            }
//        }
////        }.hitch(this),300);
//    },
	
	getRootView: function ()
    {
	    return this.$scroller;
    },

	createItemView: function (item) 
	{
		// "Filter" only items. no categories:
//        if (item.get('type') !== collectionsEnums.nodeType.ITEM)
        if (item.get('isCategory'))
        {
            return null;
        }
        var itemView = new CollectionsListItemView({ model: item });
		return itemView;
//	},
//
//    // we need this if we want to handle refresh
//    onNoResults: function () {
//        this.$scroller.css({height: "100%"});
//
//        if (typeof this.model.get("term") !== 'undefined') {
//            this.$scroller
//                .html(collectionsTemplates["no_search_results"]({
//                    query_string: this.model.get("term"),
//                    node_name: this.model.get("name")
//                }));
//        } else {
//            this.$scroller
//                .html(collectionsTemplates["no_items_results"]({
//                    node_name: this.model.get("name")
//                }));
//        }
    }
});
 /*
* the right side of CollectionsWideItemView.
* this view show the item data (image, title, descr, etc.)
*/
var CollectionsItemRightView = Backbone.View.extend(
{
	className: "CollectionsItemRightView clr_contTypeB_bg",

	events:
	{
		"tap .item_thumbnail": "thumbnailClicked",
		"tap .headerImage": "headerImageClicked",
		"tap .buy_now": "buyClicked"
	},

	initialize: function () 
	{
        var collectionItemRightNowParameter = _.extend({}, this.model.toJSON(), {buyNow:  _T("CollectionsBuyNow")} )
		this.$el.html(collectionsTemplates.CollectionsItemRightView(collectionItemRightNowParameter));
		var meta = this.model.get('meta');
		
		var details = meta.details;
		if (details)
		{
			var $containerElement = this.$('.details');

			// Render HTML into container using HTML container control
			var htmlContainer = new HtmlContainerControl();

			htmlContainer.renderHtml($containerElement, details, {changeColors: true, colorType: "B"}); 
		}

		var shareIconsModel = meta.shareIconsModel;
		if (shareIconsModel)
		{
		    // create share buttons:
			var shareIconsView = new ShareIconsView(
			{
				model: shareIconsModel
			});
			//this.$('.scroller').append(shareIconsView.render().el);
			this.$('.data_content').append(shareIconsView.render().el);
		}
		
		// save some jQuery objects for future use:
		this.$mainImage = this.$(".headerImage");
		this.$colorOnImage = this.$(".catImage");
		this.$thumbnails = this.$(".item_thumbnail");
		this.$images_container = this.$(".images_container");
		this.$data_content = this.$(".data_content");

        this.$scrollWrapper = this.$('.scroll_wrapper');
        Scrolling.init(this.$scrollWrapper);

        // for update sizes of the view: 
        // (we need the "pageshow" because the calc method need the el visible...)
		$(window).bind("throttledresize", this.onResize.hitch(this));
        this.bind("pageshow", this.onPageShow.hitch(this));       
        this.bind("pagehide", this.onPageHide.hitch(this));       
        // this.$el.bind("pageshow", this.onPageShow.hitch(this));       
        // this.$el.bind("pagehide", this.onPageHide.hitch(this));       
        
		// now - we need to check if the page is shown or not:
		// var isPageShown = (this.$el.width() > 0);
		// if (isPageShown)
		// {
		// 	this.onPageShow();
		// }
		// else
		// {
		// 	this.onPageHide();
		// }

		// now the page is not shown yet (we will get "pageShow" on page show, or my father will simulate it for me...)
        this.onPageHide();
	},

	render: function ()
	{
		return this;
	},

	buyClicked: function (e) {
        this.model.buy();
	},

	thumbnailClicked: function (e) {
		var $selected = $(e.target);
		this.imageIndex = parseInt($selected.attr("data-index"));
		var image = this.model.get('meta').images[this.imageIndex];

		//update the main image:
		this.$mainImage.css("background-image", 'url(' + image + ')');

		//update the "selected" color:
		this.$colorOnImage.removeClass('selected');
		$selected.addClass('selected');
	},
	
	headerImageClicked: function (e) {
		var images_array = _.map(this.model.get('meta').images, function (path) {
			return {largeImage: path};
		});

		new PhotoGalleryManager().pressedImage(images_array, this.imageIndex || 0);
	},

	updateViewSizes: function ()
    {
		var MAX_IMAGE_WIDTH = 500;
		var MAX_MARGIN_TOP = 20;
		// find the width/height of the main image:

		var elWidth = this.$el.width();
		var width = elWidth * 0.7; // 70% of the minipage width
		width = Math.min(MAX_IMAGE_WIDTH, width); // don't allow too big
		width = 4 * Math.floor(width/4); // we want number that modulu 4 
		var height = 3*width/4;

		// find the width/height of the thumbnail images:
		var thmbHeight = Math.floor((height - 40) / 3); //3 images and 4 margins.
		var thmbWidth = Math.floor(thmbHeight*4/3);

		//find the width of the dat container and margin in top (=should be like margins in left and right)
		var dataWidth = width + 10 + 10 + thmbWidth + 10;// 2 margins inside the thumbnails container, + margin between it to the main image.
		var marginTop = Math.floor((elWidth - dataWidth) / 2);
		marginTop =  Math.min(MAX_MARGIN_TOP, marginTop);
		this.$mainImage.css({width: width, height: height});
		this.$thumbnails.css({width: thmbWidth, height: thmbHeight});
		this.$images_container.css({height: height});
		this.$data_content.css({width: dataWidth, marginTop: marginTop});

 		Scrolling.onContentChanged(this.$scrollWrapper);

    },

    onResize: function ()
    {
		if (this.isPageShow) 
		{
			this.updateViewSizes();
		}
    },

    onPageShow: function ()
    {
		this.isPageShow = (this.$el.width() > 0); // check if page show and added to DOM.
		if (this.isPageShow)
        {
        	this.onResize();
        	this.$data_content.css({
		 		visibility: "visible"
			});
        }
    },

    onPageHide: function ()
    {
		this.isPageShow = false;
		// We don't want the "jump" when calculating the grid-margin,
		// but we need the items to take up place - for margin calculation,
		// so we use the:
		// "hidden - The element is invisible (but still takes up space)"
        this.$data_content.css({
		 	visibility: "hidden"
		});
    }

}); /**
 * The view of item (= NOTE: include also the category) for iPad.
 */
var CollectionsWideItemView = DividedScreenView.extend(
{
    setCollectionModel: function (collectionModel) 
    {        
        if (collectionModel === this.collectionModel)
            return;

        this.collectionModel = collectionModel;
        var leftView = new CollectionsItemLeftView({
            model: collectionModel
        });

        this.setView1(leftView.render());
        
        //bind item selected in view 1 for updating view 2
        collectionModel.bind('itemSelected', this._onItemSelected, this);
    },

//    /* "public" function to select item inside the category.
//     * will show it in both views: left & right
//     * @param {CollectionsNodeModel} item - the "leaf" item in the category
//     */
//    setSelectedItem: function (item)
//    {
//        // will set as selected in the list ( = left view = view 1):
//        item.trigger('itemClicked', item);
//
//        // NO NEED: the _view1 does it on pageshow:
//        // scroll to selected item in the list (if out of the scope)
//        //this._view1.scrollToSelected();
//
//        // update the right view:
//        //this._updateView2(item);
//    },

    _updateView2: function (item) 
    {        
        var rightView = new CollectionsItemRightView({
            model: item
        });

        this.setView2(rightView.render());

        //simulate page show, so the view will calc sizes only after it added to the DOM:
        rightView.trigger("pageshow");
    },

    _onItemSelected: function (item, isReselect) 
    {
        // NOTE: we don't check: 
        //  if (!isReselect)
        // because maybe we back to prev page (grid), and than we reselect the item,
        // and in this case we want to select it.

        // update the right view:
        this._updateView2(item);
    }
}); /**
 * The collection template for iPad.
 */
var CollectionsWideTemplateView = TemplateView.extend(
    {
        /**
         * OVERRIDE - render level 1 - tab:
         */
        _renderTab : function(index, navRequest)
        {
            var templateMetaData = this.model.get('meta');

            var tabData = templateMetaData.items[index] || {};

            var collectionId = tabData.params && tabData.params.id;
            tabData.layoutId = templateMetaData.pageLayout;
            tabData.collectionId = collectionId;

            var data = {tabParams: tabData};
            UN.registerChange(this.onCategorySelected.hitch(this), 2, {navRequest: navRequest, data: data, cbSelectDefault: this._selectDefaultCategory.hitch(this)});
        },

        /**
         * select default item (=root) on level 2 (root / sub category)
         */
        _selectDefaultCategory: function(data)
        {
            var navRequest = data.navRequest;
            // if not permalink: simulate the level 2 from the tab params.
            UN.navTo(collectionsEnums.aliases.DEFAULT_URL, {navRequest: navRequest, isInner: false});
        },

        /**
         * change on level 2 (root / sub category)
         */
        onCategorySelected: function (data, alias)
        {
            var navRequest = data.navRequest;

            //check if we on root
            if (alias === collectionsEnums.aliases.DEFAULT_URL)
            {
                // clone the tab params (we have the layout,collectionId there, and probably more things...):
                var params = $.extend({}, data.tabParams);
            }
            //check if we on sub category:
            else
            {
                // get the category id by from alias, catalog id and layout from the tab:
                var params = {
                    nodeId: alias,
                    layoutId: data.tabParams.layoutId,
                    collectionId: data.tabParams.collectionId
                };
            }

            var data2 =
            {
                addTabs: (alias === collectionsEnums.aliases.DEFAULT_URL),// we wants the tabs only on the "root" level, not after the user clicked on inner lists
                params: params
            };

            UN.registerChange(this.onListSelected.hitch(this), 3, {navRequest: navRequest, data: data2, cbSelectDefault: this._selectDefaultList.hitch(this)});
        },

        /**
         * select default item on level 3 (normal/search)
         */
        _selectDefaultList: function(data)
        {
            var navRequest = data.navRequest;
            // if not permalink: simulate the level 3 from the tab params.
            UN.navTo(collectionsEnums.aliases.ITEMS_URL, {navRequest: navRequest, isInner: false});
        },

        /**
         * change on level 3 (normal / search)
         */
        onListSelected: function (data, alias)
        {
            var navRequest = data.navRequest;

            // clone the params:
            // TODO: maybe only on "default"? because maybe we moved to category without 1 of the params (e.g.: subtitle)- and we don't want the root subtitle...
            var params = $.extend({}, data.params);

            // create the model of the root / subCategory:
            var model = new CollectionsNodeModel(params);
            model.set("tabMeta", this.model.get("meta"));
            //TODO: is this code relevant? It seems that the search in wide is not changing the URL, etc.
            //check if we on search:
            if (alias.startsWith(collectionsEnums.aliases.SEARCH_URL))
            {
                // get the search term by removing the "Q_" at the beginning
                var term = alias.replace(collectionsEnums.aliases.SEARCH_URL, "");
                var type = 'contenthost';

//                model.setSearch(term, type);
                // for narrow, to know that this is search:
                model.set({term: term});
                // for getting the search data:
                var collection = model.get('items');
                collection.term = term;
                collection.type = type;
            }
            //check if we on normal (=no search)
            else // if (alias === collectionsEnums.aliases.ITEMS_URL)
            {
                // nothing to do here...
            }


            var view = new CollectionsWideCategoryView({ leftWidth: "280px" }).addRefreshButton(false, true);
            view.setCollectionModel(model);

            this.renderListPage({
                navRequest: navRequest,
                model: model,
                view: view,
                addTabs: data.addTabs,
                level: 3,
                useGenericNoItems: false /*we temporary handle the "no items" here in CollectionsCategoryRightView, until we will support no items on right side of divided screen*/
                });
        },

        /**
         * OVERRIDE - handle "lonely item"
         * NOTE: TEMPORARY, until the CP will be changed, and then we will not want this behaviour!
         */
        selectDefaultItem: function (data)
        {
            var navRequest = data.navRequest;
            // we want to select lonely item only on 1st level:
            var catAlias = UN.getCurrentUrlAtLevel(2);
            var itemsCollection = data.model.get('items');
            if (itemsCollection.length === 1 && catAlias === collectionsEnums.aliases.DEFAULT_URL)
            {
                var itemModel = itemsCollection.at(0);
                // check that this is category, and not item (can be in search on 1st level)
                if (itemModel.get('isCategory'))
                {
                    catAlias = itemModel.get('alias');
                    UN.navTo(catAlias, {level: 2, navRequest: navRequest, isInner: false /* TODO: always false? */});
                    return;
                }
            }

            // call "super":
            TemplateView.prototype.selectDefaultItem.apply(this, arguments);
        },

//        /**
//         * OVERRIDE - handle "lonely item"
//         */
//        getDefaultItemAlias: function (data)
//        {
//            var itemsCollection = data.model.get('items');
//            if (itemsCollection.length === 1)
//            {
//                var itemModel = itemsCollection.at(0);
//                return itemModel.get('alias');
//            }
//            return null;
//        },

        /**
         * OVERRIDE.
         */
        getDetailsView: function (model, data)
        {
            //NOTE: we check this to validate that the view.$el is still in the DOM
            // (e.g.: maybe the UN decided to remove it after "back"),
            //  because after it was removed from the DOM, we don't get the events on the list.
            //TODO: maybe we can get notification when the view is out of the DOM, and than we will do: this.itemView = null; and here we just do: this.itemView = this.itemView || new CollectionsWideItemView({leftWidth: "34%"});
            if (!this.itemView || !this.itemView.$el.parent().length)
                this.itemView = new CollectionsWideItemView({leftWidth: "34%"});

            // the collection model
            var listModel = data.model;
            this.itemView.setCollectionModel(listModel);
//            this.itemView.setSelectedItem(model); // the templateView will do this


            return this.itemView;
        }

    }); 

var ContactUsModel = Backbone.Model.extend(
{
    initialize: function()
    {
		// we need this because "long" is reserved word in the native
        var lng = this.get('long');
        if(lng)
        {
        	this.set({lng: lng});
        }
    }
}); var contactUsTemplates = {};

contactUsTemplates.detailsPageTemplate = _.template(
    '<div class="scroll_wrapper"><div class="scroller">' +

		// image logo
        '<% if (typeof(logoImgUrl) != "undefined" && logoImgUrl) { %>' +
	        '<div class="logoImgContainer">' +
	            '<div class="dummy640x500"></div>' +
	            '<div class="logoImg sliced_image" style="background-image:url(\'<%= logoImgUrl %>\')"></div>' +
	        '</div>' +
        '<% } %>' +
		
		'<div class="info_container clr_contTypeB_bg">' +
	        '<% if (typeof(header) != "undefined" && header) { %>' +
	            '<div class="size_title_1 header clr_contTypeB_hdlTxt"><%= header %></div>' +
	        '<% } %>' +
	        '<% if (typeof(text) != "undefined" && text) { %>' +
	            '<div class="size_1 text contact-text clr_contTypeB_txt"><%= text %></div>' +
	        '<% } %>' +
		'</div>' +
		'<div class="scroller_bug"></div>' +
    '</div></div>' // scroll_wrapper + scroller
);

contactUsTemplates.contactUsTemplate = [];

contactUsTemplates.contactUsTemplate[0] = _.template(
    '<div class="scroll_wrapper"><div class="scroller">' +

	// image logo
	'<% if (typeof(logoImgUrl) != "undefined" && logoImgUrl) { %>' +
        '<div class="logoImgContainer">' +
            '<div class="dummy640x500"></div>' +
            '<div class="logoImg sliced_image" style="background-image:url(\'<%= logoImgUrl %>\')"></div>' +
        '</div>' +
    '<% } %>' +


// Header
        '<% if ((typeof(header) != "undefined" && header) || (typeof(text) != "undefined" && text) ){ %>' +
            '<div class="header-wrapper clr_contTypeB_headerItem_bg clr_contTypeB_headerItem_brdr">' +
                '<% if (typeof(header) != "undefined" && header) { %>' +
                    '<div class="size_title_3 header clr_contTypeB_hdlTxt"><%= header %></div>' +
                '<% } %>' +
                '<% if (typeof(text) != "undefined" && text) { %>' +
                    '<div class="size_1 contact-text clr_contTypeB_txt"><%= text %></div>' +
                '<% } %>' +
            '</div>' +
        '<% } %>' +

// map
        '<% if (typeof(address) != "undefined" && address) { %>' +
            '<a class="map item clr_contTypeA_bg clr_contTypeA_brdr" data-role="button">' +
                '<div class="icon mask_sprite sprite-map clr_contTypeA_icn" alt="" />' +
                '<div class="size_title_1 text clr_contTypeA_hdlTxt"><%= address %></div>' +
            '</a>' +
        '<% } %>' +

// phone
        '<% if (typeof(phone) != "undefined" && phone) { %>' +
            '<a class="openLink item clr_contTypeA_bg clr_contTypeA_brdr" data-href="tel:<%= phone %>" data-role="button" >' +
                '<div class="icon mask_sprite sprite-phone clr_contTypeA_icn" alt="" />' +
                '<div dir="ltr" class="size_title_1 text clr_contTypeA_hdlTxt"><%= phone %></div>' +
            '</a>' +
        '<% } %>' +

        '<% if (typeof(extraPhones) != "undefined" && extraPhones && extraPhones.length > 0) { %>' +
            '<% _.each(extraPhones, function (extraPhone) { %>' +
                '<a class="openLink item clr_contTypeA_bg clr_contTypeA_brdr" data-href="tel:<%= extraPhone.phone %>" data-role="button" >' +
                    '<div class="icon mask_sprite sprite-phone clr_contTypeA_icn" alt="" />' +
                    '<div dir="ltr" class="size_title_1 text clr_contTypeA_hdlTxt"><%= extraPhone.phone %></div>' +
                '</a>' +
            '<% }); %>' +
        '<% } %>' +

// fax
        '<% if (typeof(fax) != "undefined" && fax) { %>' +
            '<a class="openLink item clr_contTypeA_bg clr_contTypeA_brdr" data-href="tel:<%= fax %>" data-role="button" >' +
                '<div class="icon mask_sprite sprite-fax clr_contTypeA_icn" alt="" />' +
                '<div dir="ltr" class="size_title_1 text clr_contTypeA_hdlTxt"><%= fax %></div>' +
            '</a>' +
        '<% } %>' +

// email
        '<% if (typeof(mail) != "undefined" && mail) { %>' +
            '<a class="openLink item clr_contTypeA_bg clr_contTypeA_brdr" data-href="mailto:<%= mail %>" data-role="button" >' +
                '<div class="icon mask_sprite sprite-email clr_contTypeA_icn" alt="" />' +
                '<div class="size_title_1 text clr_contTypeA_hdlTxt"><%= mail %></div>' +
            '</a>' +
        '<% } %>' +
        
// website 
        '<% if (typeof(url) != "undefined" && url ) { %>' +
	        '<a class="openLink web-site item clr_contTypeA_bg clr_contTypeA_brdr" data-href="<%= url %>" data-role="button" >' +
                '<div class="icon mask_sprite sprite-link clr_contTypeA_icn" alt="" />' +
                '<div class="size_title_1 text clr_contTypeA_hdlTxt"><%= urlTitle %></div>' +
            '</a>' +
        '<% } %>' +

// descr
        '<% if (typeof(description) != "undefined" && description) { %>' +
            '<div class="size_1 item description clr_contTypeA_bg clr_contTypeA_brdr clr_contTypeA_hdlTxt" ></div>' +
        '<% } %>' +

    '</div></div>' // scroll_wrapper + scroller
);

contactUsTemplates.contactUsTemplate[1] = _.template(
    '<div class="scroll_wrapper clr_contTypeB_bg"><div class="scroller">' +

	// image logo
	'<% if (typeof(logoImgUrl) != "undefined" && logoImgUrl) { %>' +
        '<div class="logoImgContainer">' +
            '<div class="dummy640x500"></div>' +
            '<div class="logoImg sliced_image" style="background-image:url(\'<%= logoImgUrl %>\')"></div>' +
        '</div>' +
    '<% } %>' +

// image
        '<% if (typeof(imgUrl) != "undefined" && imgUrl) { %>' +
            '<div class="headerImg" style="background-image: url(<%= imgUrl %>)"></div>' +
        '<% } %>' +

// Header
		'<% if ((typeof(header) != "undefined" && header) || (typeof(text) != "undefined" && text) || (typeof(description) != "undefined" && description) ){ %>' +
			'<div class="header-wrapper">' +
				'<% if (typeof(header) != "undefined" && header) { %>' +
					'<div class="size_title_3 header clr_contTypeB_hdlTxt"><%= header %></div>' +
				'<% } %>' +
				'<% if (typeof(text) != "undefined" && text) { %>' +
					'<div class="size_1 text contact-text clr_contTypeB_txt"><%= text %></div>' +
				'<% } %>' +
				'<% if (typeof(description) != "undefined" && description) { %>' +
					'<div class="size_1 description contact-text clr_contTypeB_txt"></div>' +
				'<% } %>' +
			'</div>' +
		'<% } %>' +

// phone
        '<% if (typeof(phone) != "undefined" && phone) { %>' +
            '<div class="call item clr_contTypeB_brdr">' +
                '<a data-href="tel:<%= phone %>" class="openLink iconWrapper clr_contTypeB_actBtn_bg clr_contTypeB_actBtn_brdr clr_contTypeB_actBtn_hdlTxt" data-role="button"><div class="icon mask_sprite sprite-phone clr_contTypeB_actBtn_icn"></div><%= _T("HtmlTextContactUsCallStr") %></a>' +
                '<div class="size_title_1 text clr_contTypeB_hdlTxt">' +
                    '<h3><%= _T("HtmlTextContactUsPhoneNumberStr") %>:</h3>' +
                    '<p dir="ltr"><%= phone %></p>' +
                '</div>' +
            '</div>' +
        '<% } %>' +

	    '<% if (typeof(extraPhones) != "undefined" && extraPhones && extraPhones.length > 0) { %>' +
	    	'<% _.each(extraPhones, function (extraPhone) { %>' +
		    '<div class="call item clr_contTypeB_brdr">' +
                '<a data-href="tel:<%= extraPhone.phone %>" class="openLink iconWrapper clr_contTypeB_actBtn_bg clr_contTypeB_actBtn_brdr clr_contTypeB_actBtn_hdlTxt" data-role="button">' +
                    '<div class="icon mask_sprite sprite-phone clr_contTypeB_actBtn_icn"></div>' +
                    '<% if (extraPhone.title) { %>' +
                        '<%= Utils.String.translateIfNeed(extraPhone.title)%>' +
                    '<% } else { %>' +
                        '<%= _T("HtmlTextContactUsCallStr") %>' +
                    '<% } %>' +
                '</a>' +
		        '<div class="size_title_1 text clr_contTypeB_hdlTxt">' +
                    '<h3><%= _T("HtmlTextContactUsPhoneNumberStr") %>:</h3>' +
		            '<p dir="ltr"><%= extraPhone.phone %></p>' +
		        '</div>' +
		    '</div>' +
			'<% }); %>' +
		'<% } %>' +
// fax
        '<% if (typeof(fax) != "undefined" && fax) { %>' +
            '<div class="fax item clr_contTypeB_brdr">' +
                '<a data-href="tel:<%= fax %>" class="openLink iconWrapper clr_contTypeB_actBtn_bg clr_contTypeB_actBtn_brdr clr_contTypeB_actBtn_hdlTxt" data-role="button"><div class="icon mask_sprite sprite-fax clr_contTypeB_actBtn_icn"></div><%= _T("HtmlTextContactUsFaxStr") %></a>' +
                '<div class="size_title_1 text clr_contTypeB_hdlTxt">' +
                    '<h3><%= _T("HtmlTextContactUsFaxNumberStr") %>:</h3>' +
                    '<p  dir="ltr"><%= fax %></p>' +
                '</div>' +
            '</div>' +
        '<% } %>' +

// map
        '<% if (typeof(address) != "undefined" && address) { %>' +
            '<div class="item clr_contTypeB_brdr">' +
                '<a class="map iconWrapper clr_contTypeB_actBtn_bg clr_contTypeB_actBtn_brdr clr_contTypeB_actBtn_hdlTxt" data-role="button"><div class="icon mask_sprite sprite-map clr_contTypeB_actBtn_icn"></div><%= _T("HtmlTextContactUsMapStr") %></a>' +
                '<div class="size_title_1 text clr_contTypeB_hdlTxt">' +
                    '<h3><%= _T("HtmlTextContactUsAddressStr") %>:</h3><p><%= address %></p>' +
                '</div>' +
            '</div>' +
        '<% } %>' +

// email
        '<% if (typeof(mail) != "undefined" && mail) { %>' +
            '<div class="email item clr_contTypeB_brdr">' +
                '<a data-href="mailto:<%= mail %>" class="openLink iconWrapper clr_contTypeB_actBtn_bg clr_contTypeB_actBtn_brdr clr_contTypeB_actBtn_hdlTxt" data-role="button"><div class="icon mask_sprite sprite-email clr_contTypeB_actBtn_icn"></div><%= _T("HtmlTextContactUsEmailStr") %></a>' +
                '<div class="size_title_1 text clr_contTypeB_hdlTxt">' +
                    '<h3><%= _T("HtmlTextContactUsContactUsStr") %>:</h3><p><%= mail %></p>' +
                '</div>' +
            '</div>' +
        '<% } %>' +

// website
        '<% if (typeof(url) != "undefined" && url) { %>' +
            '<div class="link item clr_contTypeB_brdr">' +
                '<a data-href="<%= url %>" class="openLink web-site iconWrapper clr_contTypeB_actBtn_bg clr_contTypeB_actBtn_brdr clr_contTypeB_actBtn_hdlTxt" data-role="button"><div class="icon mask_sprite sprite-link clr_contTypeB_actBtn_icn"></div><%= _T("HtmlTextContactUsLinkStr") %></a>' +
                '<div class="size_title_1 text clr_contTypeB_hdlTxt">' +
                    "<h3><%= _T('HtmlTextContactUsWebSiteStr') %>:</h3><p><%= urlTitle %></p>" +
                '</div>' +
            '</div>' +
        '<% } %>' +

    '</div></div>' // scroll_wrapper + scroller
);

contactUsTemplates.contactUsTemplate[2] = _.template(
    '<div class="scroll_wrapper clr_contTypeB_bg"><div class="scroller">' +

        '<div class="sidebar-wrapper ">' +

// image
        '<% if ((typeof(imgUrl) != "undefined" && imgUrl) || (typeof(logoImgUrl) != "undefined" && logoImgUrl)) { %>' +
            '<div class="sidebarImg">' +
                '<% if(typeof(logoImgUrl) != "undefined" && logoImgUrl){ %>' +
                    '<div class="logoImgContainer">' +
                        '<div class="dummy640x500"></div>' +
                        '<div class="logoImg sliced_image" style="background-image:url(\'<%= logoImgUrl %>\')"></div>' +
                    '</div>' +
                '<% } if(typeof(imgUrl) != "undefined" && imgUrl){ %>' +
                    '<div style="background-image: url(<%= imgUrl %>)"></div>' +
                '<% } %>' +
            '</div>' +
        '<% } %>' +

// phone
        '<% if (typeof(phone) != "undefined" && phone) { %>' +
            '<a data-href="tel:<%= phone %>" class="openLink call item clr_contTypeB_actBtn_bg clr_contTypeB_actBtn_brdr clr_contTypeB_actBtn_hdlTxt" data-role="button">' +
                '<div class="icon mask_sprite sprite-phone clr_contTypeB_actBtn_icn"></div><span class="size_title_1"><%= _T("HtmlTextContactUsCallNowStr") %></span>' +
            '</a>' +
        '<% } %>' +

        '<% if (typeof(extraPhones) != "undefined" && extraPhones && extraPhones.length > 0) { %>' +
            '<% _.each(extraPhones, function (extraPhone) { %>' +
                '<a data-href="tel:<%= extraPhone.phone %>" class="openLink call item clr_contTypeB_actBtn_bg clr_contTypeB_actBtn_brdr clr_contTypeB_actBtn_hdlTxt" data-role="button">' +
                    '<div class="icon mask_sprite sprite-phone clr_contTypeB_actBtn_icn"></div>' +
                        '<span class="size_title_1">' +
                        '<% if ( extraPhone.title) { %>' +
                            '<%= Utils.String.translateIfNeed(extraPhone.title) %>' +
                        '<% } else { %>' +
                            '<%= _T("HtmlTextContactUsCallNowStr") %>' +
                        '<% } %>' +
                        '</span>' +
                '</a>' +
            '<% }); %>' +
        '<% } %>' +

// fax
        '<% if (typeof(fax) != "undefined" && fax) { %>' +
            '<a data-href="tel:<%= fax %>" class="openLink fax item clr_contTypeB_actBtn_bg clr_contTypeB_actBtn_brdr clr_contTypeB_actBtn_hdlTxt" data-role="button">' +
                '<div class="icon mask_sprite sprite-fax clr_contTypeB_actBtn_icn"></div><span class="size_title_1"><%= _T("HtmlTextContactUsFaxStr") %></span>' +
            '</a>' +
        '<% } %>' +

// map
        '<% if (typeof(address) != "undefined" && address) { %>' +
            '<a class="item map clr_contTypeB_actBtn_bg clr_contTypeB_actBtn_brdr clr_contTypeB_actBtn_hdlTxt" data-role="button">' +
                '<div class="icon mask_sprite sprite-map clr_contTypeB_actBtn_icn"></div><span class="size_title_1"><%= _T("HtmlTextContactUsMapStr") %></span>' +
            '</a>' +
        '<% } %>' +

// email
        '<% if (typeof(mail) != "undefined" && mail) { %>' +
            '<a data-href="mailto:<%= mail %>" data-role="button" class="openLink email item clr_contTypeB_actBtn_bg clr_contTypeB_actBtn_brdr clr_contTypeB_actBtn_hdlTxt">' +
                '<div class="icon mask_sprite sprite-email clr_contTypeB_actBtn_icn"></div><span class="size_title_1"><%= _T("HtmlTextContactUsEmailStr") %></span>' +
            '</a>' +
        '<% } %>' +

// website
        '<% if (typeof(url) != "undefined" && url) { %>' +
            '<a data-href="<%= url %>" class="openLink web-site link item clr_contTypeB_actBtn_bg clr_contTypeB_actBtn_brdr clr_contTypeB_actBtn_hdlTxt" data-role="button">' +
                '<div class="icon mask_sprite sprite-link clr_contTypeB_actBtn_icn"></div><span class="size_title_1"><%= _T("HtmlTextContactUsLinkStr") %></span>' +
            '</a>' +
        '<% } %>' +
        '</div>' +

// Header
        '<% if ((typeof(header) != "undefined" && header) || (typeof(text) != "undefined" && text) || (typeof(description) != "undefined" && description) ){ %>' +
            '<div class="header-wrapper">' +
                '<% if (typeof(header) != "undefined" && header) { %>' +
                    '<div class="size_title_3 header clr_contTypeB_hdlTxt"><%= header %></div>' +
                '<% } %>' +
                '<% if (typeof(text) != "undefined" && text) { %>' +
                    '<div class="size_1 text contact-text clr_contTypeB_txt"><%= text %></div>' +
                '<% } %>' +
                '<% if (typeof(description) != "undefined" && description) { %>' +
                    '<div class="size_1 description contact-text clr_contTypeB_txt"></div>' +
                '<% } %>' +
            '</div>' +
        '<% } %>' +

// clear the floats (fix scrolling problem).
        '<div class="clearfix"></div>' +

    '</div></div>' // scroll_wrapper + scroller
); /**
 * View that shows the ContactUs home page  
 * 
 * @author Matanya
 */
var ContactUsView = Backbone.View.extend(
{
		attributes: {
			'data-role': 'page'
		},

    initialize: function () {
        // validate the layout ID
        var layoutId = this.model.get('layoutId') || 0;

        // check that the layout id is in range.
        if (layoutId > contactUsTemplates.contactUsTemplate.length - 1 ||
                layoutId < 0) {
            layoutId = 0;
        }

        // set the validated layout ID.
        this.model.set({ layoutId: layoutId });

        this.$el.addClass('layout-' + layoutId);
    },

    render: function () 
	{
        var layoutId = this.model.get('layoutId');

        // get the layout's template.
        var layoutTemplate = contactUsTemplates.contactUsTemplate[layoutId];

        // get the layout template parameters
        var templateParams = this.model.toJSON();

		templateParams.urlTitle = templateParams.urlTitle || templateParams.url;         

		// "Sanitize Texts":
		templateParams.header = Utils.String.sanitizeText(templateParams.header, true);
		templateParams.text = Utils.String.sanitizeText(templateParams.text, true);
		templateParams.address = Utils.String.sanitizeText(templateParams.address, true);
		templateParams.phone = Utils.String.sanitizeText(templateParams.phone, true);
		templateParams.fax = Utils.String.sanitizeText(templateParams.fax, true);
		templateParams.mail = Utils.String.sanitizeText(templateParams.mail, true);
		templateParams.urlTitle = Utils.String.sanitizeText(templateParams.urlTitle, true);

        this.$el.html(layoutTemplate(templateParams));

		var $scrollWrapper = this.$el.find('.scroll_wrapper');

		// update the scroller after loading the images. Also, delete the image in error
        this.$el.find('IMG').load(function ()
        {
            // Call refresh scroll callback
            Scrolling.onContentChanged($scrollWrapper);
        }).error(function ()
        {
            $(this).remove();
        });

        // Render HTML into container using HTML container control
        var htmlContainer = new HtmlContainerControl();

        // Set the description DIVs with the HTML Content
        htmlContainer.renderHtml(this.$el.find('div.description'), templateParams.description, { changeColors: false }); 

        // intialize the scrolling.
        Scrolling.init($scrollWrapper);

        this.$el.find('.openLink').tap(this._onLinkTap.hitch(this));

        this.$el.find('.map').tap(this._onMapClicked.hitch(this));
                
        return this;
    },

    _onMapClicked: function (e) 
	{
		e.preventDefault();
        this.trigger('showOnMapClicked', this.model);
    },

	_showNotSupportedMsg: function (e) 
	{
		e.preventDefault();
        cqm.showToastMessage("This action is not supported in simulator mode.");
    },

    _onLinkTap: function (e)
	{
        e.preventDefault();
        var url = $(e.currentTarget).data("href");
        // MOBILE-6417: we don't want useExternalBrowser
        appDriver.openLink(null, null, { url: url,useExternalBrowser:false });

    },
	
    addTabsView: function (tabsViewEl) 
    {
        this.$el.find('.scroller').prepend(tabsViewEl);
    }	
	

}); /**
 * View that shows the entire contactUs template.
 * 
 * @author Matanya
 */
var ContactUsTemplateView = TemplateView.extend(
{	
	    /**
     * OVERRIDE - render level 1 - tab:
     */
    _renderTab : function(index, navRequest)
	{	
        var templateMetaData = this.model.get('meta');

        var item = templateMetaData.items[index];
        
        if (item && typeof(item.layoutId) === "undefined")
        {
            item.layoutId = templateMetaData.pageLayout || 0;
        }
        
        var contactUsModel = new ContactUsModel(item);
        
        var id = Utils.Helpers.generateGUID();
        var contactUsView = new ContactUsView(
        { 
            model: contactUsModel,
            id: id
        });
        
        contactUsView.bind('showOnMapClicked', this._onMapClicked, this);
        
        this.$el.append(contactUsView.render().el);

        this.addTabsToView(contactUsView, index);
        UN.onPageReady(id, navRequest, 1, true);
	},
	
	_onMapClicked: function (model)
    {

        var lat = model.get('lat');
        var lng = model.get('long');

        if (lat && lng)
        {
            var marker = {
            		location:{
            			lat: lat,
            			lng: lng
            		},
            		header: model.get('header'),
            		address: model.get('address')
                };

            var model = new Backbone.Model(
            {
                markers: [marker],
                googleOptions: {zoom:14} 
            });
            MapManager.show_on_map(this.$el, model);
        }
    }
}); 

/**
 * Collection of provider reviews
 * @author Matanya
 */
var ReviewsCollection = ItemsCollection.extend(
{
    initialize: function(models, reviewParams)
    {
        // "inherit" ("Super"):
        ItemsCollection.prototype.initialize.apply(this);
		if (reviewParams && reviewParams.type && reviewParams.query) 
		{
			this.params = reviewParams;
		}
		else 
		{
		    this.invalid = true;			
		}
    },
    
    parse: function(result)
    {
		// Save the result as meta data so provider model could use it
        var retVal = {metaData : result};
        
        if (result && result.items) 
        {
            var providerType = this.params.type;
			
			// Array of the the new ReviewModel
            var models = [];
            for (var i = 0; i < result.items.length; i++) 
            {
                var review = result.items[i];
				review.providerType = providerType;

                models[i] = new ReviewModel(review);
            }
            
            retVal.models = models;
        }
        
        return retVal;
    },
    
    getServiceName: function()
    {
        return 'CMS_REVIEW_GET';
    },
    
    getParams: function()
    {
        return this.params;
    }
    
});
 /**
 * Provider model
 *
 * @author Matanya
 */
var ProviderModel = ItemsModel.extend(
{
    defaults:
    {
		// we didn't get the data (= before "getItemsSuccess")
		"hasData": false,
		// display name of the business, from the AMS: 
		"title": "",
		// display name of the business, from the CMS: 
		"businessName": "",
		// provider image:
		"image": "", 
		// provider display name: (e.g.: "Yelp")
		"providerName": "", 
		"reviewsCount": 0,
		// 0, 0.5, 1, 1.5, ...,  4.5, 5:
		"rating": 0,
		// params for the service:
		"params": {}
    },

    initialize: function()
    {
        ItemsModel.prototype.initialize.apply(this, arguments);
        
        this.get('items').bind('getItemsSuccess', this._onGetItemsSuccess, this);

        // initialize the get parameters.
        var params = this.get('params');
        if (params) 
        {
			var url = Services.generateUrl('IMAGES_REVIEWS_PROVIDER_GET', params);
            if (url && url !== '')
            {
                this.set({image: url});
            }
        }        
    },
    
    /**
     * Create the items collection.
     *
     * @author Matanya
     */
    createItemsCollection: function()
    {
        var params = this.get('params');
        return new ReviewsCollection(null, params);
    },
    
    _onGetItemsSuccess: function(result)
    {
		// Update the new data
        this.set(
        {
            hasData: true, /* = we after the "getItemsSuccess" */
			rating: result.rating,
			reviewsCount: result.totalItems,
			providerName: result.providerName,
			businessName: result.name
        });
        this.trigger('getItemsSuccess', this);
    }
});
 /**
 * Review model
 *
 * @author Matanya
 */
var ReviewModel = ItemModel.extend(
{
    defaults:
    {
        time: 0,
        description: "",
        fullDescription: "",
        id: "",
        rating: 0,
        reviewer: {
           id: "",
           imageUrl: "",
           name: ""
        },
        socialInfo: null,
		title: "",
		link: "",
		providerType: 0
    }
});
 /**
 * The Reviews template.
 */
var ReviewsTemplateView = TemplateView.extend({

    initialize: function() {
        TemplateView.prototype.initialize.apply(this);

        // Get the template requested
        var meta = this.model.get('meta');

        this.providers = $.map(meta.items, function(elem, i) {
            return new ProviderModel(elem);
        });
        this.layoutId = meta.pageLayout;

        // Currently we support layout 0 or 1. default = 0.
        if (this.layoutId !== 1)
            this.layoutId = 0;
    },

    /**
     * OVERRIDE
     */
    _shouldRenderTemplate: function() {
        var meta = this.model.get('meta');

        return (LAYOUT === layoutFormat.wide ||
            meta.items.length > 1 ||
            (meta.items[0] && meta.items[0].params && meta.items[0].params.type == ReviewsUtils.reviewsTypes.OPEN_TABLE)
        );
    },

    /**
     * OVERRIDE - render level 0
     */
    _renderTemplate: function(navRequest) {
        var meta = this.model.get('meta');

        // Create the providers list view
        this.tabsView = new ProvidersListView({
            model: this.providers,
            layoutId: this.layoutId
        });

        if (LAYOUT === layoutFormat.wide) {
            this.dividedScreenView = new DividedScreenView({});
            this.dividedScreenView.addRefreshButton(false, true);
            this.dividedScreenView.setView1(this.tabsView.render());

            var mainView = this.dividedScreenView;
        } else {
            var mainView = this.tabsView;
        }

        var id = Utils.Helpers.generateGUID();
        mainView.id = id;
        mainView.$el.attr({
            id: id
        });
        this.$el.append(mainView.render().$el);

        this.homePageId = id;
    },

    /**
     * OVERRIDE - in iPad we always show page of providers (=tabs), instead of part of the page, and we have
     * another logic for select default tab, so we will set the "defaultTabIndex" if it is relevant
     */
    _shouldSelectDefaultTab: function() {
        if (LAYOUT === layoutFormat.wide) {
            var meta = this.model.get('meta');
            var tabsCount = meta.items.length;

            //NOTE: 1st we check if "defaultTabIndex" is exist & valid, and if so- we use it. (e.g.: maybe the publisher want the 4th tab to be default?)
            // and if defaultTabIndex not exist/valid, we try to find the wanted defaultTabIndex:
            for (var i = this.model.get('defaultTabIndex') || 0; i < tabsCount; i++) {
                if (meta.items[i] && meta.items[i].params && meta.items[i].params.type != ReviewsUtils.reviewsTypes.OPEN_TABLE)
                    break;
            }
            if (i < tabsCount) {
                this.model.set({
                    defaultTabIndex: i
                });
                return true;
            }
        }
        return TemplateView.prototype._shouldSelectDefaultTab.apply(this);
    },

    /**
     * override...
     */
    _noDefaultTab: function(navRequest) {
        UN.onPageReady(this.homePageId, navRequest, 0);
    },

    /**
     * OVERRIDE - render level 1 - tab:
     */
    _renderTab: function(index, navRequest) {
        //        // Get the template requested
        //        var meta = this.model.get('meta');

        var id = Utils.Helpers.generateGUID();
        var model = this.providers[index];
        var view = new ProviderDetailsView({
            model: model,
            layoutId: this.layoutId,
            id: id
        });

        // handle the selected color:
        if (this.tabsView)
            this.tabsView.onProviderSelected(model);

        // in case it's openTable, show "not supported in simulator"
        var providerType = this.providers[index].attributes.params.type;
        if (providerType == ReviewsUtils.reviewsTypes.OPEN_TABLE) {
            var genericPageModel = ErrPagesManager.getErrPage(errorPages.errorPagesTypes.notSupported, this.model.getArrContext());
            var id = Utils.Helpers.generateGUID();
            var pageView = new GenericPageView({
                model: genericPageModel,
                id: id
            });

            this.$el.append(pageView.render().el);

            //        this.addTabsToView(pageView, index);
            UN.onPageReady(id, navRequest, 1, true);

        } else {
            this.renderListPage({
                navRequest: navRequest,
                model: model,
                view: view,
                addTabs: false,
                dividedScreenView: this.dividedScreenView,
                useGenericNoItems: (LAYOUT === layoutFormat.wide)
            });
        }

        //        //TODO: OK? if we created the providers list, we already have the data...
        //        model.getItems(executeTypeEnum.HIT_AND_RUN);
        //
        //        this.$el.append(view.render().$el);
        //
        //        UN.onPageReady(id, navRequest, 1, true);
        //
        //        //TODO: OK? if we go to another tab, we will continue refresh also the prev tab?
        //        this.$el.bind('refresh',function()
        //        {
        //            mainView.handleRefreshClick();
        //        });
    }

}); /**
 * View that shows the list of providers
 *
 * @author Matanya
 */
var ProvidersListView = Backbone.View.extend({
    attributes: {
        'data-role': 'page',
        'data-buttons': 'refresh'
    },

    initialize: function () {
        this.$el.bind('refresh', this.handleRefreshClick.hitch(this));
        //this.$el.bind('silentRefresh', this.handleSilentRefresh.hitch(this));
        this.$el.bind('silentRefresh', this.handleRefreshClick.hitch(this)); // OK?
    },

    render: function () {
        // we created the models here, and the "ReviewsTemplateView" using it for the details page...

        this.$el.html('<div class="scroll_wrapper"><div class="scroller"></div></div>');

        var $scroller = this.$el.find('.scroller');

        var $scrollWrapper = this.$el.find('.scroll_wrapper');

        var template = reviewsTemplates.providers_list_tpl;

        $scroller.html(template());

        var $listContainer = $scroller.find('.providers_list');
        var providers = this.model;

        var that = this;
        // Create a list of all the providers
        _.each(providers, function (providerModel, index) {
            that._renderOneProvider($listContainer, providerModel);
        });

        Scrolling.init($scrollWrapper);

        return this;
    },

    _renderOneProvider: function ($listContainer, providerModel) {
        if (providerModel) {
            // Create preview model to show only the title and image
            var providerView = new ProviderView({
                model: providerModel,
                layoutId: this.options.layoutId
            });

            $listContainer.append(providerView.render().el);
        }
    },

    /**
     * Hande the "selected" provider, and trigger the relevant event
     *
     * @author Matanya
     */
    onProviderSelected: function (providerModel) {
        // Is the selected item is the "prev-selected"
        var isReselect = !! (this._selectedProvider && this._selectedProvider.cid === providerModel.cid);

        if (this._selectedProvider && !isReselect) {
            // de-select the prev item:
            this._selectedProvider.set({
                selected: false
            });
        }

        if (!isReselect) {
            // save "pointer" to the current itemModel:
            this._selectedProvider = providerModel;
            // select the new item:
            this._selectedProvider.set({
                selected: true
            });
        }
    },

    handleRefreshClick: function () {
        this.render();
    }

}); /**
 * View that shows a single provider inside the list
 *
 * @author Matanya
 */
var ProviderView = ListItemView.extend(
{
    className: "provider_list_item item box_classic_padding",

    events:
    {
        "tap": "itemClicked"
    },

    initialize: function ()
    {
        // call "super":
        ListItemView.prototype.initialize.apply(this);

        this.$el.attr('data-role', 'button').addClass('t3d');

		var collection = this.model.get('items');
		if(!collection || collection.invalid)
		{
			this.$el.css({'display': 'none'});
		}
    },

    render: function()
    {
        var template = reviewsTemplates.provider_loading_tpl;

        var itemParams =
        {
            image: this.model.get('image') || '',
            title: this.model.get('title') || '',
			loadingString: _T("HtmlTextReviewsLoadingProvider"),
			type: this.model.get('params').type
        };
		if (this.options.layoutId === 0)
		{
			this.$el.addClass("clr_contTypeA_classicItem_bg clr_contTypeA_classicItem_brdr feed_classic_item");
			itemParams.colorClassType = "A";
		}
		else
		{
			this.$el.addClass("clr_contTypeB_bubbleItem_bg clr_contTypeB_bubbleItem_brdr feed_bubble_item");
			itemParams.colorClassType = "B";
		}

		var compiled = template(itemParams);
        this.$el.html(compiled);

		this.model.bind('getItemsSuccess', this.onGetItemsSuccess.hitch(this));
		this.model.getItems(executeTypeEnum.HIT_AND_RUN);

        return this;
    },

    onGetItemsSuccess: function ()
	{
        var template = reviewsTemplates.provider_full_tpl;
		var reviewsCount = this.model.get('reviewsCount') || 0;
		var formatteReviewsCount = localization.formatNumber(reviewsCount);

		var providerName = this.model.get('providerName');
		var reviewsString = _T("HtmlTextReviewsReviewsCount",
			{
				number: formatteReviewsCount,
				provider: providerName
			});
		var providerType = this.model.get('params').type;
		var rating = ReviewsUtils.ratingToHtml(this.model.get('rating'), providerType, 'clr_contTypeB_icn');
        var itemParams =
        {
            image: this.model.get('image'),
            title: this.model.get('title'),
			reviewsCount: reviewsString,
			rating: rating
        };
		if (this.options.layoutId === 0)
		{
			itemParams.colorClassType = "A";
		}
		else
		{
			itemParams.colorClassType = "B";
		}

        var compiled = template(itemParams);

        // remove the image on error (bug #1251)
        this.$el.find('IMG').error(function () {
            $(this).remove();
        });

        this.$el.html(compiled);
    },

    /**
     * This is the event handler for the 'tap' event.
     */
    itemClicked: function(event)
	{
		event.preventDefault();
		var modelParams = this.model.get('params')
    	// if opentable redirect instead of addPage
        if(modelParams.type == ReviewsUtils.reviewsTypes.OPEN_TABLE && PLATFORM != platformEnum.simulator)
        {
            var query = modelParams.query;
            if (query)
            {
            	var params = { url : query };
            	appDriver.openLink(null, null, params);
            }
        }
		else
		{
            UN.navTo(this.model.get('alias'), {level:1, isInner: (LAYOUT === layoutFormat.narrow)});
        }
    }
});
 /**
 * View that shows the reviews list of a provider
 *
 * @author Matanya
 */
var ProviderDetailsView = ItemsView.extend(
{
    attributes: {
        'data-role': 'page',
        'data-buttons': 'refresh'
    },

    initialize: function ()
    {
        this.$el.html('<div class="provider_details_page scroll_wrapper"><div class="scroller"></div></div>');
        
        var $scrollWrapper = this.$el.find('.scroll_wrapper');
		this.$scroller = this.$el.find('.scroller');
        Scrolling.init($scrollWrapper);
		
		// We don't want this, we want always to show the header,
		// with "loading" until we will get the data 
//		if (this.model.get('hasData')) 
//		{
//			this._createHeader();
//		}
//		else 
//		{
//			this.model.bind('getItemsSuccess', this._createHeader.hitch(this));
//		}
		this._createHeader();
		
        ItemsView.prototype.initialize.apply(this, arguments);

        this.$el.bind('refresh', this.handleRefreshClick.hitch(this));
        this.$el.bind('silentRefresh', this.handleSilentRefresh.hitch(this));

		var collection = this.model.get('items');		
		if(!collection || collection.invalid)
		{
			this.$el.css({'display': 'none'});			
		}		
    },
	
    /**
     * Create an item view with the given model (override)
     * 
     * @param itemModel - the model of the item to create the view for.
     * 
     * @return the view of the item.
     *          
     * @author Matanya
     */
    createItemView: function (itemModel)
    {
        var reviewView = new ReviewView(
        {
            model: itemModel,
            layoutId: this.options.layoutId
        });
        
		return reviewView;
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
        return this.$scroller;
    },
    
    /**
     * Render the header.
     * 
     * @author Matanya
     */
    _createHeader: function () 
    {
        if (this.header)
        {
            return;
        }
		
        this.header = new ProviderDetailsHeaderView(
        {
            model: this.model,
            layoutId: this.options.layoutId
        });
                
        this.$scroller.prepend(this.header.render().el);
    }
});
 /**
 * View that shows the header of the provider in the details page
 *
 * @author Matanya
 */
var ProviderDetailsHeaderView = Backbone.View.extend(
{
    className: "provider_header item box_classic_padding clr_contTypeB_headerItem_bg clr_contTypeB_headerItem_brdr",

	tagName: 'div',
    
    render: function()
    {
        var template = reviewsTemplates.provider_loading_tpl;
        
        var itemParams = 
        {
            image: this.model.get('image') || '',
            title: this.model.get('title') || '',
			loadingString: _T("HtmlTextReviewsLoadingProvider"),
			type: this.model.get('params').type
        };
        var compiled = template(itemParams);
        
        this.$el.html(compiled);

		if (this.model.get('hasData')) 
		{
			this._renderFull();
		}
		else 
		{
			this.model.bind('getItemsSuccess', this._renderFull.hitch(this));
		}
        
        return this;
    },
	
    _renderFull: function()
    {
        var template = reviewsTemplates.provider_full_tpl;
		
		var reviewsCount = this.model.get('reviewsCount') || 0;
		var formatteReviewsCount = localization.formatNumber(reviewsCount);

		var providerName = this.model.get('providerName');
		var reviewsString = _T("HtmlTextReviewsReviewsCount",
			{
				number: formatteReviewsCount,
				provider: providerName 
			});
		var providerType = this.model.get('params').type;
		var rating = ReviewsUtils.ratingToHtml(this.model.get('rating'), providerType, 'clr_contTypeB_icn');
        var itemParams = 
        {
            image: this.model.get('image'),
            title: this.model.get('title'),
			reviewsCount: reviewsString,
			rating: rating,
			colorClassType: "B"
        };
        var compiled = template(itemParams);
        this.$el.html(compiled);

        // remove the image on error (bug #1251)
        this.$el.find('IMG').error(function () {
            $(this).remove();
        });

        return this;
    }	
}); /**
 * View that shows the a review in a list
 */
var ReviewView = Backbone.View.extend(
{
    className: "review_list_item item box_classic_padding clr_contTypeA_bg",
	
    /**
     * Create and return the reviews list in html
     *
     * @param template - the template to use
     * @return html - the html representation of the reviews list
     *
     * @author Moshe Darzi
     */
    render: function()
    {
        var template = reviewsTemplates.review_item_tpl;
		var image = this.model.get('reviewer').imageUrl;
		var title = this.model.get('title');
		var providerType = this.model.get('providerType');		
		var rating = ReviewsUtils.ratingToHtml(this.model.get('rating'), providerType, 'clr_contTypeA_icn');		
		var text = this.model.get('description') || "";
		var reviewerName = _T("HtmlTextReviewsByAuthor", {name: this.model.get('reviewer').name});
		var timeAgo = Utils.TimeDate.timeAsText(this.model.get('time'));
		
        var itemParams = 
        {
            image: image,
            title: title,
			text: text,
			rating: rating,
			reviewerName: reviewerName,
			timeAgo: timeAgo
        };
		
        this.$el.html(template(itemParams))
				  .attr("data-role", "button").addClass('t3d');

		var link = this.model.get('link');
		if (link)
		{
			// Create the link jquery object:
			var $link = $('<span class="clr_contTypeA_lnkTxt review_link">' + 
							_T("HtmlTextReviewsReadMoreLink") + 
						'</span>');
			
			// Add to the html:
			var $text = this.$el.find('.review_text');
			$text.append($link);
			
			// Bind click: 
			$link.tap(function (e)
			{
				e.preventDefault();
                appDriver.openLink(null, null,
                {
                    'url': link,
                    'title': link
                });
			});
		}	

		if (this.options.layoutId === 0)
		{
			this.$el.addClass("clr_contTypeA_brdr feed_classic_item");
		}
		else
		{
			this.$el.addClass("clr_contTypeA_brdrBubble feed_bubble_item");
		}

        // remove the image on error
        this.$el.find('IMG').error(function () {
            $(this).remove();
        });

        return this;
    }
});
 var reviewsTemplates = 
{
    providers_list_tpl: _.template(
		'<ul class="providers_list">'+
        '</ul>'),
                    
    provider_loading_tpl: _.template(
        '<% if (typeof(image) != "undefined" && image) { %>' +
			'<img class="image" src="<%= image %>" />' +
        '<% } %>' +			
		'<div class="container">' +
			'<div class="responsive size_title_3 clr_contTypeA_hdlTxt"><%= title %></div>' +
			'<% if (type !== 3) { %>' +
 			'<div class="responsive size_title_0 loading_provider clr_contTypeA_subTxt">' +
				'<div class="loading_icon mask_sprite sprite-ajax-loader_small clr_contTypeA_subIcn spin"></div>' +
				'<div class="loading_string"><%= loadingString %></div>' +
			'</div>' +				
			'<% } %>' +
		'</div>'),

    provider_full_tpl: _.template(
        '<% if (typeof(image) != "undefined" && image) { %>' +
            '<div class="image uploader_image">' +
                '<img class="" src="<%= image %>" />' +
            '</div>' +
        '<% } %>' +			
		'<div class="container">' +
			'<div class="responsive size_title_3 clr_contType<%= colorClassType %>_hdlTxt"><%= title %></div>' +
			'<div class="responsive size_title_0 clr_contType<%= colorClassType %>_subTxt"><%= reviewsCount %></div>' +
			'<div class="rating_container"><%= rating %></div>' + 
		'</div>'),
		
	review_item_tpl: _.template(
        '<% if (typeof(image) != "undefined" && image) { %>' +
			'<img class="image uploader_image" src="<%= image %>" />' +
        '<% } %>' +			
		'<div class="container">' +
			'<div class="responsive size_title_1 clr_contTypeA_hdlTxt"><%= title %></div>' +
			'<div class="rating_container"><%= rating %></div>' + 
			'<div class="responsive size_1 review_text clr_contTypeA_txt"><%= text %></div>' +
			'<div class="responsive size_0 extra_info clr_contTypeA_subTxt">' +
				'<div class="reviewer"><%= reviewerName %></div>' + 
				'<div class="time_ago"><%= timeAgo %></div>' +
			'</div>' +	 
		'</div>')

}; /**
 * Utils functions for reviews template
 */
var ReviewsUtils = (function ()
{
    var me = {};

	me.reviewsTypes = 
    {
       //TODO: add all types...
       'OPEN_TABLE': 3
    };

	/**
	 * This function convert "rating" (=integer, e.g.: 3) to html string that
	 * represents it (e.g.: 3 stars)
	 * 
	 * @param {integer} rating, 0-5, include "half", e.g.: 3.5. NOTE: can be null = no rating = no html.
	 * @param {integer} providerType, (optional) e.g.: 1 for yelp
	 * @param {string} iconColorClass, (optional) in case of "no-yelp", the color for the mask e.g.: "clr_contTypeA_icn"
	 * @return {string} html - html that represents the rating
	 * @author Matanya
	 */
	me.ratingToHtml = function (rating, providerType, iconColorClass) 
	{
		if (providerType === 1) 
		{
			return me.ratingToHtmlYelp(rating);
		}
		else			
		{
			return me.ratingToHtmlDefault(rating, iconColorClass);
		}
	};

	/**
	 * This function convert "rating" (=integer, e.g.: 3) to html string that
	 * represents it (e.g.: 3 stars).
	 * use "default" star images
	 * 
	 * @param {integer} rating, 0-5, include "half", e.g.: 3.5  NOTE: can be null = no rating = no html.
	 * @param {string} iconColorClass, (optional)  the color for the mask e.g.: "clr_contTypeA_icn"
	 * @return {string} html - html that represents the rating
	 * @author Matanya
	 */
	me.ratingToHtmlDefault = function (rating, iconColorClass) 
	{
		if (rating === null)
		{
			return "";
		}
		iconColorClass = iconColorClass || 'clr_contTypeB_icn';
		var MAX_RATING = 5;
		var html = "";
		for (var i = 0; i < MAX_RATING; i++) 
		{
			if (rating >= 1) 
			{
				// Add "full" star:
				html += '<div class="mask_sprite star_image sprite-fullStar ' + iconColorClass + '"></div>';
			}
			else 
				if (rating > 0) 
				{
					// TODO: in RTL, add "sprite-RTLhalfStar" image
					// Add "half" star:
					html += '<div class="mask_sprite star_image sprite-halfStar ' + iconColorClass + '"></div>';
				}
				else 
				{
					// Add "empty" star:
					html += '<div class="mask_sprite star_image sprite-emptyStar ' + iconColorClass + '"></div>';
				}
			rating--;
			
		}
		return html;			
	};

	/**
	 * This function convert "rating" (=integer, e.g.: 3) to html string that
	 * represents it (e.g.: 3 stars).
	 * use "Yelp" star images
	 * 
	 * @param {integer} rating, 0-5, include "half", e.g.: 3.5 NOTE: can be null = no rating = no html.
	 * @return {string} html - html that represents the rating
	 * @author Matanya
	 */
	me.ratingToHtmlYelp = function (rating) 
	{
		if (rating === null)
		{
			return "";
		}
		var classRating = "rating5";// default (= 5 or more) = 5 = max rating 
		if (rating <= 0)
			classRating = "rating0";
		else if (rating <= 1)
			classRating = "rating1";
		else if (rating < 2)
			classRating = "rating1p5";
		else if (rating == 2)
			classRating = "rating2";
		else if (rating < 3)
			classRating = "rating2p5";
		else if (rating == 3)
			classRating = "rating3";
		else if (rating < 4)
			classRating = "rating3p5";
		else if (rating == 4)
			classRating = "rating4";
		else if (rating < 5)
			classRating = "rating4p5";

		var html = '<div class="reviewsSprite yelp_stars ' + classRating +'"></div>'; 
		return html;			
	};

    return me;
} ());
 





var storeEnums = {
	PagesLayouts: {
		0: "default"		
	}
};

storeEnums.nodeType = {
    CATALOG: 1,
	CATEGORY: 2,
	ITEM: 3
};

storeEnums.variantCheckoutStatus = {
    NORMAL: 0, // show "buy now" button
    HIDE_BUY: 1, // no "buy now" button
    UNAVAILABLE: 2, // no "buy now" button. show "unavaible"
    SOLD_OUT: 3 // no "buy now" button. show "sold out"
};

//TODO: remove this type (=why "item" is better than "83a5a90b-6950-49c3-a0c9-594f82df3e6a")
//// it should be only as above
//var collectionsNodesTypes = {
//	"3ffdbd0e-3a28-41e8-b446-c3008edebe04": "node",
//	"83a5a90b-6950-49c3-a0c9-594f82df3e6a": "item"
//};

storeEnums.aliases = {
    DEFAULT_URL: "default", // the root category = the url of the tab without override it after user click on link, e.g.: "catalog/tab2/default" (note: for sub-category it will be e.g.: "catalog/tab2/categoryId")

    ITEMS_URL: "items", // the url of "normal" items inside root/category, e.g.: "catalog/tab2/default/items"
    SEARCH_URL: "Q_" // the url of search items inside root/category starts with this, e.g.: "catalog/tab2/default/Q_Nemo"
};
 /*
 * Collections template's views templates
 *
 * @author Daniel Chcouri
 */

(function () {

    var storeTemplates = {
        collectionsWrapper: _.template(
'<div class="scroll_wrapper"><div class="scroller">'+
    '<div class="header"></div>' +
    '<div class="descendants_container"></div>' +
'</div></div>'),

        "node_view": _.template(
'<div class="search_container_container"></div>' +
'<% if (headerImage && !isSearch) { %>' +
    '<div class="image-container clr_contTypeA_bg clr_contTypeA_brdr">' +
        '<div class="header_image sliced_image" style="background-image: url(\'<%= headerImage %>\');">' +
            '<% if (variantData.name || variantData.subtitle) { %>' +
                '<div class="text_container clr_contTypeC_bg">' +
                    '<div class="collection_title title size_title_3 max_3_lines clr_contTypeC_hdlTxt">' +
                        '<% if (variantData.name) { %>' +
                            '<%= variantData.name %>' +
                        '<% } %>' +
                    '</div>' +
                    '<% if (variantData.subtitle) { %>' +
                        '<div class="collection_subtitle size_0 max_2_lines time clr_contTypeC_txt">' +
                            '<%= variantData.subtitle %>' +
                        '</div>' +
                    '<% } %>' +
                '</div>' +
            '<% } %>' +
        '</div>' +
    '</div>' +
'<% } %>'
),

        "search_view": _.template(
            '<form class="search_form" action="javascript:void(0)">' +
                '<input type="text" class="search_input rounded_corners_all clr_form_input_bg clr_form_input_brdr clr_form_input_txt" placeholder="<%= CollectionsSearchPlaceholder %>" />' +
                '<a class="search_button clr_contTypeB_btn_bg clr_contTypeB_btn_brdr clr_contTypeB_btn_hdlTxt rounded_corners_all' +
                '" data-role="button">' +
                    '<div class="mask_sprite sprite-search clr_contTypeB_btn_icn' +
                    '"></div>' +
                '</a>' +
                '<input type="submit" style="display: none">' +
            '</form>'
        ),

        "item_view": _.template(
            '<div class="item_view_content_container clr_contTypeA_classicItem_bg">' +
                '<div class="item_view_header"></div>' +
                '<div class="buyboxContainer"></div>' +

                '<div class="clr_contTypeB_bg clr_contTypeB_txt">' +

                    '<div class="details_container">' +
                    '</div>' +

                    '<div class="contact_details_container">' +

                        '<% if (email) { %>' +
                            '<%= email %>' +
                        '<% } %>' +

                        '<% if (contact_web) { %>' +
                            '<%= contact_web %>' +
                        '<% } %>' +

                        '<div style="clear: both;"></div>' +

                    '</div>' +
                '</div>' +
            '</div>'
        ),

//        "item_view_details": _.template(
//            '<% if (variantData.description) { %>' +
//                '<div class="details_container">' +
//                    '<div class="details_header clr_contTypeB_hdlTxt"><%= CollectionsItemDetails %>:</div>' +
//                '</div>' +
//            '<% } %>'
//        ),

        "item_view_header": _.template(
            '<div class="item_name clr_contTypeA_hdlTxt"><%= variantData.name %></div>' +
            '<% if (gallery.length > 0) { %>' +
                '<div class="images_container images_amount_<%= gallery.length %>  clr_contTypeA_subBg">' +
                    '<div class="main_image sliced_image" style="background-image: url(\'<%= gallery[0].url %>\');"><div class="full_screen_hint sprite sprite-FullScreenIcon"></div></div>' +
                    '<% if (gallery.length > 1) { %>' +
                        '<div class="thumbnails_container">' +
                            '<table class="thumbnails_table" data-role="controlgroup">' +
                                '<tr>' +
                                    '<td width="*">' +
                                        '<div class="sliced_image item_thumbnail images_imgBtn_bg images_imgBtn_brdr" data-index="0" style="background-image: url(\'<%= gallery[0].url %>\');" data-role="button"></div>' +
                                    '</td>' +
                                    '<td width="*">' +
                                        '<div class="sliced_image item_thumbnail" data-index="1" style="background-image: url(\'<%= gallery[1].url %>\');" data-role="button"></div>' +
                                    '</td>' +
                                '<% if (gallery.length > 2) { %>' +
                                    '<td width="*">' +
                                        '<div class="sliced_image item_thumbnail" data-index="2" style="background-image: url(\'<%= gallery[2].url %>\');" data-role="button"></div>' +
                                    '</td>' +
                                '<% } %>' +
                                '<tr>' +
                            '</table>' +
                        '</div>' +
                    '<% } %>' +
                '</div>' +
            '<% } %>'
        ),

        "buyboxSkelaton": _.template(
'<div class="price_container <%=color%>_subBg">' +
    '<% if (options.length) { %>' +
        '<div class="optionsContainer"></div>' +
    '<% } %>' +
    '<div class="dataContainer"></div>' +
'</div>'
        ),

        "buyboxData": _.template(
'<% if (showPrice) { %>' +
    '<div class="info_container">' +
        '<span class="current_price <%=color%>_subTxt"><%= currentPriceText %>:</span><br />' + '' +
        '<div class="narrow_price_container <%=color%>_hdlTxt" dir="ltr">' +
            '<% if (variantData.payment.meta.currencySign) { %>' +
                '<span class="currency"><%= variantData.payment.meta.currencySign %></span>' +
            '<% } %>' +
            '<span class="dollars"><%= priceArr[0] %></span>' +
            '<% if (priceArr[1]) { %>' +
                '<span class="cents"><%= priceArr[1] %></span>' +
            '<% } %>' +
        '</div>' +
    '</div>' +
'<% } if (paypalBuynow) { %>' +
    '<div data-role="button" class="buy_now_button paypal_buy">' +
        '<span class="text"><%= _T("StorePaypalBuyNow", {paypalImage: \'<span class="sprite sprite-Paypal-logo"></span>\'}) %></span>' +
    '</div>' +
'<% } else if (buyNowText) { %>' +
    '<div data-role="button" class="<% if (buyNowDisabled) { %> disabled <% } %> buy_now buy_now_button <%=color%>_actBtn_bg <%=color%>_actBtn_brdr <%=color%>_actBtn_hdlTxt">' +
        '<span class="text"><%= buyNowText %></span>' +
    '</div>' +
'<% } %>'
),

        "contact_link_template": _.template(
            '<a href="<%= href %>" data-role="button" class="ui-btn-up contact_icon sprite sprite-<%= sprite_name %>"></a>'
        ),

        "contact_item_template": _.template(
            '<span data-href="<%= href %>" data-role="button" class="ui-btn-up contact_icon sprite sprite-<%= sprite_name %>"></span>'
        ),

        "item_descendant_summary": _.template(
            '<% if (thumbnail) { %><div class="thumbnail sliced_image" style="background-image:url(\'<%= thumbnail %>\');"></div><% } %>' +
                '<div class="descendant_summary_content_container">' +
                    '<div class="descendant_summary_content_table_emulation">' +
                        '<div class="descendant_summary_content_tr_emulation">' +
                            '<div class="descendant_summary_content">' +
                                '<div class="descendant_summary_title clr_contTypeA_hdlTxt size_title_1 _1_line"><%= variantData.name %></div>' +
                                '<div class="descendant_summary_subtitle clr_contTypeA_subTxt size_0 max_2_lines"><%= variantData.subtitle %></div>' +
                                '<% if (price) { %>' +
                                    '<div class="descendant_summary_price clr_contTypeA_txt"><%= price %></div>' +
                                '<% } %>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '<div class="slide_arrow_image mask_sprite sprite-arrow clr_contTypeA_icn"></div>'
        )
    };


/* iPad views: */

    storeTemplates.CollectionsCategoryLeftView = _.template(
//TODO: Do we want scroller here?
'<div class="scroll_wrapper"><div class="scroller">' +
'<% if (headerImage) { %>' +
    '<div class="headerImage sliced_image" style="background-image:url(\'<%= headerImage %>\');">' +
        '<div class="catImage clr_images_catImage_bg"></div>' +
    '</div>' +
'<% } %>' +
'<% if (variantData.name) { %>' +
    '<div class="name size_title_4 clr_contTypeA_hdlTxt"><%= variantData.name %></div>' +
'<% } %>' +
'<% if (variantData.subtitle) { %>' +
    '<div class="description size_1 clr_contTypeA_subTxt"><%= variantData.subtitle %></div>' +
'<% } %>' +
'</div></div>'
);

    storeTemplates.CollectionsItemRightViewSkelaton = _.template(
'<div class="scroll_wrapper"><div class="scroller">' +
    '<div class="data_content">' +
        '<div class="putHereData"></div>' +
        '<div class="buyboxWideContainer"></div>' +
        '<div class="details"></div>' +
        '<div class="linksContainer"></div>' +
    '</div>' +
    '<div class="scrollingBug"></div>' + // we have scrolling issue. I don't know why. so I use this as walkaround...
'</div></div>'
);
    storeTemplates.CollectionsItemRightViewData = _.template(
'<% if (variantData.images.gallery && variantData.images.gallery.length) { %>' +
    '<div class="headerImage sliced_image" style="background-image:url(\'<%= variantData.images.gallery[0].url %>\');">' +
        '<div class="catImage clr_images_catImage_bg"></div>' +
        '<div class="full_screen_hint sprite sprite-FullScreenIcon"></div>' +
    '</div>' +
'<% } if (variantData.images.gallery && variantData.images.gallery.length > 1) { %>' +
    '<div class="images_container clr_contTypeB_subBg">' +
        '<div class="item_thumbnail sliced_image" style="background-image:url(\'<%= variantData.images.gallery[0].url %>\');"><div data-role="button" class="catImage clr_images_catImage_bg selected" data-index="0"></div></div>' +
        '<div class="item_thumbnail sliced_image" style="background-image:url(\'<%= variantData.images.gallery[1].url %>\');"><div data-role="button" class="catImage clr_images_catImage_bg" data-index="1"></div></div>' +
        '<% if (variantData.images.gallery.length > 2) { %>' +
            '<div class="item_thumbnail sliced_image" style="background-image:url(\'<%= variantData.images.gallery[2].url %>\');"><div data-role="button" class="catImage clr_images_catImage_bg" data-index="2"></div></div>' +
        '<% } %>' +
    '</div>' +
'<% } if (variantData.name) { %>' +
    '<div class="name size_title_4 clr_contTypeB_hdlTxt"><%= variantData.name %></div>' +
'<% } if (variantData.subtitle) { %>' +
    '<div class="description size_1 clr_contTypeB_subTxt"><%= variantData.subtitle %></div>' +
'<% } %>'
);

    storeTemplates.CollectionsCategoryRightView = _.template(
'<div class="scroll_wrapper"><div class="scroller">' +
    '<div class="bread_wrapper"></div>' +
    '<div class="no_result_wrapper"></div>' +
    '<div class="grid_wrapper"></div>' +
'</div></div>'
);

    storeTemplates.CollectionsItemLeftView = _.template(
'<div class="scroll_wrapper"><div class="scroller">' +
'</div></div>'
);

    storeTemplates.CollectionsGridItemView =
{
    category: _.template(
'<% if (headerImage) { %>' +
    '<div class="headerImage sliced_image" style="background-image:url(\'<%= headerImage %>\');">' +
        '<div class="header_box clr_contTypeC_bg">' +
            '<% if(variantData.name){ %>' +
                '<div class="size_title_3 _1_line name clr_contTypeC_hdlTxt ellipsis"><%= variantData.name %></div>' +
            '<% } %>' +
            '<% if(itemsCountStr){ %>' +
                '<div class="size_title_0 _1_line itemsCountStr clr_contTypeC_subTxt"><%= itemsCountStr %></div>' +
            '<% } %>' +
        '</div>' +
        '<div data-role="button" class="catImage clr_images_catImage_bg"></div>' +
    '</div>' +
'<% } %>'
),
    item: _.template(
'<% if (headerImage) { %>' +
    '<div class="headerImage sliced_image" style="background-image:url(\'<%= headerImage %>\');">' +
        '<% if (showPrice) { %>' +
            '<div data-role="button" class="catImage clr_images_catImage_bgGrad"></div>' +
            '<div class="price clr_images_catImage_txt" dir="ltr">' +
                '<% if (variantData.payment.meta.currencySign) { %>' +
                    '<span class="currency"><%= variantData.payment.meta.currencySign %></span>' +
                '<% } %>' +
                '<span class="dollars"><%= priceArr[0] %></span>' +
                '<% if (priceArr.length > 1) { %>' +
                    '<span class="cents"><%= priceArr[1] %></span>' +
                '<% } %>' +
            '</div>' +
        '<% } else { %>' +
            '<div data-role="button" class="catImage clr_images_catImage_bg"></div>' +
        '<% } %>' +
    '</div>' +
'<% } %>' +
'<div class="name_container size_1 _2_lines clr_contTypeB_hdlTxt"><%= variantData.name %></div>'
    )
};

    storeTemplates.CollectionsListItemView = _.template(
'<% if (headerImage) { %>' +
    '<div class="headerImage sliced_image" style="background-image:url(\'<%= headerImage %>\');">' +
        '<div class="catImage clr_images_catImage_bg"></div>' +
    '</div>' +
'<% } %>' +
'<div class="vertical_center"><div>' +
    '<% if (variantData.name) { %>' +
        '<div class="name size_1 <% if (showPrice) { %>max_2_lines<% } else { %>max_3_lines<% } %> clr_contTypeA_hdlTxt"><%= variantData.name %></div>' +
    '<% } %>' +
    '<% if (showPrice) { %>' +
        '<div class="price clr_contTypeA_subTxt" dir="ltr">' +
            '<% if (variantData.payment.meta.currencySign) { %>' +
                '<span class="currency"><%= variantData.payment.meta.currencySign %></span>' +
            '<% } %>' +
            '<span class="dollars"><%= priceArr[0] %></span>' +
            '<% if (priceArr.length > 1) { %>' +
                '<span class="cents"><%= priceArr[1] %></span>' +
            '<% } %>' +
        '</div>' +
    '<% } %>' +
'</div></div>'
);

/* StoreBreadBarView */

    storeTemplates.BreadCrumb = _.template(
'<span class="BreadCrumb size_1 clr_contTypeA_subTxt"><%= variantData.name %></span>' +
'<div class="BreadCrumbArrow mask_sprite sprite-breadArrow clr_contTypeA_subIcn"></div>'
);

    storeTemplates.lastBreadCrumb = _.template(
    '<span class="BreadCrumb size_1 clr_contTypeA_hdlTxt"><%= variantData.name %></span>'
);

    /*TODO: split to 2: "lastBreadCrumb", "Search" ?*/
    storeTemplates.Search = _.template(
'<span class="search_container_wide clr_form_input_bg clr_form_input_brdr">' +
    '<div class="right mainButtonContainer clr_form_input_brdr"  data-role="button">' +
        '<div class="clearButton mask_sprite sprite-la-cancel clr_form_input_icn selected"></div>' +
        '<div class="searchButton mask_sprite sprite-search clr_form_input_icn"></div>' +
    '</div>' +
    '<div class="left searchIndicator mask_sprite sprite-catSearchSmall clr_form_input_icn"></div>' +
    '<div class="right clearEditButton">' + // TODO: add  data-role="button" for this container?
        '<div class="mask_sprite sprite-catXSmall clr_form_input_icn" data-role="button"></div>' +
    '</div>' +
    '<div class="textContainer clr_form_input_txt">' +
        '<form class="search_form" action="javascript:void(0)">' +
            '<input type="text" class="searchInput" placeholder="<%= placeholder %>" />' +
            //'<input type="submit" style="display: none">' +
            //'<input type="submit" style="...">' +
        '</form>' +
    '</div>' +
'</span>' +
'<div class="clearfix"></div>');

    storeTemplates.BreadBarView = _.template(
'<div class="breadContainer ellipsis"></div>'
);

    storeTemplates.chooseOptionTitle = _.template(
'<div class="chooseOptionTitle clr_contTypeA_subTxt"><%= text %>:</div>'
);

    window.storeTemplates = storeTemplates;
})();

 var StoreNodeModel = ItemsModel.extend({
    //NOTE: we can't use "default", because it will override the "ItemsModel.defaults", so we set it in initialize...

    initialize: function () {
        ItemsModel.prototype.initialize.apply(this, arguments);

        //NOTE: we can't use "default", because it will override the "ItemsModel.defaults"...
        var defaults = {
            id: null,
            collectionId: null, // the root id
            nodeId: null, // nodeId is like id, but we set it only in CMS response,
            options: [], // the options for variants, e.g.: [{key : 'size',value : ['L', 'M']},{key : 'color',value : ['Yellow', 'Black', 'Red']}]
            variants: [], // array of variants = all the combinations from "options"
            variantData: { // curr variant data (e.g.: if curr variant override the payment object, we put here the overrided payment, because we must not change the original payment, because maybe we need it for different variant)
                optionSelect: [] // array of indexes of selected values fot all options
//                payment: {},
//                images: {},
//                meta: {},
//                description: "", // description (HTML)
//                subtitle: "",
//                name: "", // string title
//                status: storeEnums.variantCheckoutStatus.NORMAL,
            },
            priceArr: ["0"],// array of dollars,cents. e.g.: ["29","99"] = 29.99
            payment: {},
            status: storeEnums.variantCheckoutStatus.NORMAL,
            images: {},
            meta: {},
            showPrice: false, // do we need to show the price for this item?
            description: "", // description (HTML)
            subtitle: "",
            name: "", // string title
            headerImage: "", // NOTE: we calc it from images.header or defaultImage.
            itemsCount: null, // NOTE: 0 means 0 items. null means unknwon
            defaultImage: "http://storage.conduit.com/Mobile/66/e4/663a9521-49e4-4c44-80b4-826b9ff4405f/Images/fd4fa8cc-4253-4959-9f8b-4b05f54d4e09.png", // default image to this item and to all items under it.
            breadCrumbs: [] // array of all models "before" me.
        };

        var data = $.extend(defaults, this.toJSON());
        // change some nulls to empty dictionary:
        data.images = data.images || {};
        data.meta = data.meta || {};
        if (data.payment)
            data.payment.meta = data.payment.meta || {};

        this._updateFromJSON(data);
    },

    /**
     * we use this func for calculated fields, and for select a variant
     */
    _updateFromJSON: function (data, optionSelected) {

        var variantData= { // curr variant data (e.g.: if curr variant override the payment object, we put here the overrided payment, because we must not change the original payment, because maybe we need it for different variant)
            //optionSelect: optionSelected,
            payment: data.payment,
            images: data.images,
            meta: data.meta,
            description: data.description,
            subtitle: data.subtitle,
            name: data.name,
            status: data.status
        };
        var len = data.variants.length;
        if (len) {
            for (var i = 0; i < len; i++)
            {
                var variant = data.variants[i];
                if ((!optionSelected && variant.isDefault) ||
                    Utils.Helpers.arraysEqual(optionSelected, variant.optionSelect))
                {
                    // we need to extend the default with curr variant
                    // (but we need to clone, so we can use the default again for deferrent variants...)
                    variantData = $.extend(true, {}, variantData, variant);
                    break;
                }
            }
        }

        //TODO: do trim() and sanitizeText on "variantData.name" and "variantData.subtitle"

        data.variantData = variantData;

        // make simple access to headerImage:
        data.headerImage = (variantData.images && variantData.images.main && variantData.images.main.url) || data.defaultImage;

        // split the price, e.g.: 29.5 to "29","50"
        if (typeof variantData.payment.price === "number") {
            data.priceArr = ("" + variantData.payment.price).split(".");
            data.priceArr[0] = localization.formatNumber(data.priceArr[0]);
            if (data.priceArr[1] && data.priceArr[1].length === 1) {
                data.priceArr[1] = data.priceArr[1] + "0";
            }
            //TODO: cut the "cents" to maximum 2 chars?
        }

        //NOTE: we display "0$" if we get 0. if we don't want to display, it shouldn't be number
        data.showPrice = (typeof variantData.payment.price === "number");

        // create model for "shareIconsView"
        var meta = variantData.meta;
        if (meta.links &&
            (meta.links.email || meta.links.web)) {
            var params = {
                buttons: {
                    twitter: null,
                    facebook: null,
                    linkedin: null,
                    webSite: meta.links.web,
                    mySpace: null,
                    email: meta.links.email
                }
            };
            var shareIconsModel = new Backbone.Model(params);
            meta.shareIconsModel = shareIconsModel;
        }

        //TODO: sanitize texts, etc.?

        data.alias = data.id; //NOTE: we need that the alias will be like the id, because we take the alias as an id to the service...
        this.set(data);
    },

    /**
     * we use this func for calculated fields, and for select a variant
     */
    setVariant: function (optionSelected) {
        this._updateFromJSON(this.toJSON(), optionSelected);
    },

    createItemsCollection: function () {
        var params = {
            id: this.get("collectionId"),
            parentId: this.get("nodeId")
        };
        var collection = new StoreCollection(null, params);

        // find the breadCrumbs for every model in my collection:
        collection.breadCrumbs = _.extend([], this.get('breadCrumbs'));
        // add "me" as the last model in the array:
        collection.breadCrumbs.push(this);

        collection.term = this.get("term"); // relevant for search

        // handle get data about me (e.g. name of the category)
        collection.bind('getItemsSuccess', this._onGetItemsSuccess, this);

        return collection;
    },

    _onGetItemsSuccess: function (metaData)
    {
        //update my fields (e.g.: in root category, or permalink to sub category, in addition to my childs, we want to set the name, images, etc. of this level)
        var data = this.toJSON();
        data.images = metaData.images;
        data.name = metaData.name;
        data.subtitle = metaData.subtitle;
        this._updateFromJSON(data);
        this.trigger('headerChanged');
    },

    /**
     * reset the collection, and get new items with the search term & type
     * @param {string} term - the term for the search. note: can be null for "no search"
     */
    setSearch: function (term) {
        var collection = this.get('items');
        collection.term = term;
        collection.reset();
        var executeOptions = executeTypeEnum.HIT_AND_RUN; //OK? something else?
        collection.getItems(executeOptions);
    },

    /**
     * get the search term. can be null, etc. if no search
     * @return {string} term - the term for the search. note: can be null etc. for "no search"
     */
    getSearchTerm: function () {
        var collection = this.get('items');
        return collection.term;
    },

    /**
     * ...
     * @return ...
     */
    buy: function () {
        //we take the 1st item in the providers array:
        var paymentProvider = this.get('variantData').payment.providers[0];

        var storeItemId = this.get('id');

        var that = this;
        function cbSuccess (data) {
            //go back to the category:
            //TODO: in case of permalink, we will go out of the app!, and if we will do "navTo" 1 step up, after back we will go to the product again.
            UN.goBack();

            //show success dialog:
            var btns = [
                {
//                    text: _T('ButtonClose'),
                    text: _T('DialogButtonSuccessBuy'),
                    cb: function(){}
                }];

            // Show message box to the user
            uiDriver.showDialogBox(null, null,
                {
                    title: _T('DialogCaptionSuccessBuy'),
                    message: _T('DialogMessageSuccessBuy', {itemTitle: that.get('variantData').name}),
                    buttons: btns
                });

        }

        function cbFail (data) {
            if (typeof data === "string" && data === "TWICE")
            {
                // normal case - e.g.: the user closed the paypal browser, and now clicked on the "buy" again
            }
            else
            {
                // TODO: what to do?
                //cqm.showToastMessage( _T('DialogMessageAgendaNoFav'));
            }
        }

        StorePurchaseManager.buy(cbSuccess, cbFail, storeItemId, paymentProvider, analytics.paymentType.BuyNow);
    },

    /**
     * reset the collection, and get new items without the search
     */
    clearSearch: function () {
        this.setSearch(null);
    },

    /**
     * returns array of all the photos for the "photosGallery
     */
    getPhotosArrayForGallery : function()
    {
        var variantData = this.get('variantData');
        return _.map(variantData.images.gallery, function (item) {
            return {
                largeImage: item.url,
                shareInfo: {
                    imageUrl: item.url,
                    title: variantData.name,
                    url: item.url,
                    shortDesc: variantData.subtitle || ''
                }
            };
        });
    },

    /**
     * get the price in string e.g.: "5.99$"
     */
    getPriceStr: function () {
        if (this.get('showPrice'))
        {
            var payment = this.get('variantData').payment;
            var sign = payment.meta.currencySign || "";
            return payment.price + sign;
        }

        return "";
    }
}); /*
* Store template Collection
*/
var StoreCollection = ItemsCollection.extend({

	model: StoreNodeModel,
	
	initialize: function(models, params) {
		ItemsCollection.prototype.initialize.apply(this, arguments);

		if ( !params || !params.id )
			this.invalid = true;
        this.params = {
            rootId: params.id, // root id for get
            catalogId: params.id, // root id for search
            storeItemId: params.parentId || params.id, // item id for get (e.g.: the category that we want to see its data & children)
            parentId: params.parentId || params.id, // item id for search (e.g.: the category that we want to search under it)
            searchParams: { // relevant for search
                term: null, // the serch term
                sortOrder: 0 // 0 asc, 1 desc
            }
        };
	},

	parse: function (result) {
		result = result || {};
		
		var collectionId = this.params.id;
        var breadCrumbs = this.breadCrumbs;
        var rootPayment = result.payment || (result.root && result.root.payment) || {};

		_.each(result.items, function (item) {
			// add the "collectionId", "breadCrumbs", etc. to each item:
			item.collectionId = collectionId;
            item.breadCrumbs = breadCrumbs;

            //extend the item payment from root payment (= use default, unless the item override this)
            item.payment = $.extend({}, rootPayment, item.payment);

			//set nodeId:
			item.nodeId = item.id;
		});

		return {models: result.items, metaData: result};
	},

	getParams: function () {
		this.params.skip = this.skip;

        //update search term:
        this.params.searchParams.term = this.term;

        return this.params;
	},

    getServiceName: function () {
        if(this.term)//search
        {
            return 'STORE_CATALOG_ITEMS_SEARCH';
        }
        else// category / catalog (= store = root)
        {
            return 'STORE_CATALOG_ITEMS_GET';
        }
    }

}); /*
 * show the "buy box" that include the options-selectore, the price and the buy button.
 * this view is relevant for both wide & narrow.
 */
var StoreBuyView = Backbone.View.extend({
	events: {
        "tap .buy_now_button": "buyClicked"
	},

	initialize: function () {
        var data= this._getParams();
        var options = this.model.get("options");
        var len = options.length;

        if (!len && !data.buyNowText && !data.showPrice && !data.paypalBuynow)
        {
            //we don't have anything to show in the box:
            this.$el.hide();
            return this;
        }

        this.$el.html(storeTemplates.buyboxSkelaton(data));

        if (len) {
            var variantData = this.model.get("variantData");
            var $container = this.$('.optionsContainer');
            var models = [];
            function onChange () {
                var optionSelected = [];
                for (var i = 0; i < len; i++)
                {
                    optionSelected[i] = models[i].get('selectedIndex');
                }
                this.model.setVariant(optionSelected);
            }
            for (var i = 0; i < len; i++)
            {
                var option = options[i];
                var model = new ComboboxModel({
                    sringsArray: option.value,
                    selectedIndex: variantData.optionSelect[i]
                });
                model.on('change:selectedIndex', onChange, this);
                models[i] = model;

                var view = new ComboboxView({model: model});
                $container.append(storeTemplates.chooseOptionTitle({text: Utils.String.translateIfNeed(option.key)}))
                    .append(view.render().el);

            }
        }

        this.$dataContainer = this.$('.dataContainer');
        this.model.on('change:variantData', this.render, this);
    },
    render: function () {

        if (!this.$dataContainer) return this;

        var data= this._getParams();

        this.$dataContainer.html(storeTemplates.buyboxData(data));

        return this;
	},

    _getParams: function () {

        var variantData = this.model.get("variantData");
		var options = this.model.get("options");
        var data= {
            color: 'clr_contType' + (this.options.colorType ? this.options.colorType : "A"),
            options: options,
            priceArr: this.model.get("priceArr"),
            variantData: variantData,
            buyNowDisabled: true,// button disabled
            buyNowText: "",// do we need a buy button for this item? and if so - what is the text? (empty string = no button)
            showPrice: this.model.get("showPrice"),
            currentPriceText: _T("CollectionsCurrentPrice"),
            paypalBuynow: false  // don't use paypal buynow
        };
        if (variantData.payment.providers && variantData.payment.providers.length)
        {
            switch (variantData.status)
            {
                case storeEnums.variantCheckoutStatus.NORMAL:
                    data.buyNowDisabled = false;
                    if (variantData.payment.providers[0].type === paymentProvidersTypesEnum.Paypal)
                    {
                        data.paypalBuynow = true; // use paypal button
                    }
                    else
                    {
                        data.buyNowText = _T("StoreBuyNowNormal");// use buy button
                    }
                    break;
                case storeEnums.variantCheckoutStatus.UNAVAILABLE:
                    data.buyNowText = _T("StoreBuyNowUnavailable");
                    break;
                case storeEnums.variantCheckoutStatus.SOLD_OUT:
                    data.buyNowText = _T("StoreBuyNowSoldOut");
                    break;
            }
        }

        return data;
	},

    buyClicked: function (e) {
        if (!this.$('.buy_now_button').hasClass('disabled'))
        {
            this.model.buy();
        }
	}
}); /*
* @author Daniel Chcouri
*/
var StoreDescendantSummaryView = /*ItemView*/Backbone.View.extend(
{
	tagName: 'li',

	className: 'descendant_summary clr_contTypeA_classicItem_bg clr_contTypeA_classicItem_brdr',

    events:
    {
        "tap": "itemClicked"
    },

	render: function () {
		this.$el.attr('data-role', 'button');

		var variantData = this.model.get("variantData");
		var images = variantData.images;

		// set template according to layout
		var template = storeTemplates["item_descendant_summary"];

		var thumbnail = images && images.thumbnail && images.thumbnail.url;
		if (!thumbnail) {
            this.$el.addClass("no_thumbnail");
		}
        var price = this.model.getPriceStr();
		this.$el.append(template({variantData: variantData, price: price, thumbnail: thumbnail}));

		return this;
	},

    itemClicked: function (e)
    {
        e.preventDefault();
        var alias = this.model.get('alias'); //NOTE: this is the same like: this.model.get('id')

        if (this.model.get('type') === storeEnums.nodeType.CATEGORY)
        {
            // set current item in CurrentPageTracker:
            CurrentPageTracker.setCurrentItem(this.model);

            // add "item view" usage-event:
            UsageManager.addEvent(analytics.usageEventTypeEnum.ItemView, {
                id: this.model.get('id'),
                list: true
            });


            UN.navTo(alias, {level:2}); // page/tab/CATEGORY_ID
        }
        else //if (this.model.get('type') === storeEnums.nodeType.ITEM)
        {
            UN.navTo(alias, {level:4}); // page/tab/category/search/ITEM_ID
        }
    }

});
 /*
 * @author Daniel Chcouri
 */
var StoreItemView = Backbone.View.extend({
	events: {
		"tap .item_thumbnail": "collectionItemThumbnailClicked",
		"tap .main_image": "onCollectionMainImageClicked",
		"tap [href]": "openLink"
	},

	initialize: function () {
		this.$el.attr({
			'data-role': 'page',
			'data-buttons': 'refresh'
		});
        this.model.on('change:variantData', this.render, this);

        this.$el.html(genericPageTemplates.pageTemplate());

        // intialize the scrolling.
        this.$scrollWrapper = this.$('.scroll_wrapper');
        Scrolling.init(this.$scrollWrapper);
        this.$scroller = this.$('.scroller');

        var variantData = this.model.get("variantData");
        var links = variantData.meta.links || {};

        this.$scroller.append(storeTemplates["item_view"]({
            email: links.email ? storeTemplates["contact_link_template"]({ href: "mailto:" + links.email, sprite_name: "aboutus_email"}) : null,
            contact_web: links.web ? storeTemplates["contact_item_template"]({ href: links.web, sprite_name: "aboutus_link"}) : null
        }));
        this.$item_view_header = this.$('.item_view_header');
        this.$details_container = this.$('.details_container');

        this.$('.buyboxContainer').html(new StoreBuyView({model:this.model, colorType: "B"}).render().el);

        var $linkElements = this.$scroller.find('.contact_details_container span.contact_icon');
        $linkElements.tap(function () {
            var $this = $(this);
            var url = $this.attr('data-href'); // Get link URL and title

            appDriver.openLink(null, null, {
                'url': url,
                'title': $this.text()
            });

        });

    },

    render: function () {

		var variantData = this.model.get("variantData");

		this.$item_view_header.html(storeTemplates["item_view_header"]({
            variantData: variantData,
			gallery: (variantData.images && variantData.images.gallery) || []
		}));

        if (variantData.description) {
			// Render HTML into container using HTML container control
			var htmlContainer = new HtmlContainerControl();

			// Set the description DIVs with the HTML Content
			htmlContainer.renderHtml(this.$details_container,
                variantData.description, {
					changeColors: true,
					colorType: "B"
				});
		} else {
            this.$details_container.html('');
        }

        Scrolling.onContentChanged(this.$scrollWrapper);
        return this;
	},

	collectionItemThumbnailClicked: function (e) {
		var $selected = $(e.target);
		this.imageIndex = parseInt($selected.attr("data-index"));
		var image = this.model.get('variantData').images.gallery[this.imageIndex].url;

		//update the main image:
		this.$(".main_image").css("background-image", 'url(' + image + ')');
	},

	onCollectionMainImageClicked: function (e) {
		var images_array = this.model.getPhotosArrayForGallery();
		new PhotoGalleryManager().pressedImage(images_array, this.imageIndex || 0);
	},

	getRootView: function () {
		return this.$scroller;
	},

	openLink: function (e) {
        var url = $(e.currentTarget).attr("href");
        appDriver.openLink(null, null, {
            url: url
        });
        e.preventDefault();
	}
}); /*
* @author Daniel Chcouri
*/
var StoreNodeView = ItemsView.extend(
{
    className: "collection_view",

	initialize: function ()
	{
        this.$el.attr(
        {
            'data-role': 'page',
            'data-buttons': 'refresh'
        });

        this.$el.html(storeTemplates.collectionsWrapper());

        // intialize the scrolling.
        Scrolling.init(this.$('.scroll_wrapper'));

		this.$scroller = this.$('.scroller');

        //NOTE: bind on "change" is not good. we get lots of "change events" due to unrelevant params, like "loadingType"
//        this.model.on('change', this._updateHeader, this);
        this.model.on('headerChanged', this._updateHeader, this);
//        this._updateHeader();

        this.$el.bind('refresh', this.handleRefreshClick.hitch(this));
        this.$el.bind('silentRefresh', this.handleSilentRefresh.hitch(this));

        // super()
		ItemsView.prototype.initialize.apply(this);
	},

	_updateHeader: function ()
	{
        var headerTemplate = storeTemplates["node_view"];

        var isSearch = !!this.model.get("term");

        this.$('.header').html(headerTemplate({
            headerImage: this.model.get("headerImage"),
            variantData: this.model.get("variantData"),
            isSearch: isSearch
        }));

        // if the node type is root or node (not search node) display the search view
        if (!isSearch) {
            var searchView = new StoreSearchView({model: this.model});
            this.$scroller.find(".search_container_container").html(searchView.render().el);
        }
	},

    getRootView: function ()
    {
        return this.$scroller.find(".descendants_container");
    },

    createItemView: function (item) {
        return new StoreDescendantSummaryView({
            model: item
//            layout: this.model.get('layout'),
//            id: 'descendant_' + item.get('id')
        });
    }

});
 /*
 * the "search" bar view (only for narrow).
 * this view show the search input and handle the events
 */
var StoreSearchView = Backbone.View.extend({
    className: "search_container clr_contTypeB_bg clr_contTypeB_brdr",

    events: {
        "tap .search_button": "onSearchButtonClicked",
        "submit .search_form": "onSearchButtonClicked"
    },

    onSearchButtonClicked: function () {
        var term = this.$input.val();
        if (term) {
            UN.navTo(storeEnums.aliases.SEARCH_URL + term, {level:3}); // page/tab/category/Q_searchTerm
            //TODO: do we want to clear the input field?
            //this.$input.val('');
        }
    },

    render: function () {
        var param = {
            CollectionsSearchPlaceholder: _T("CollectionsSearchPlaceholder", {"category": this.model.get('variantData').name})
        };
        this.$el.html(storeTemplates.search_view(param));

        this.$input = this.$('.search_input');

        return this;

    }
}); /**
 * The collection template (for narrow only).
 */
var StoreTemplateView = TemplateView.extend(
    {
        /**
         * OVERRIDE - render level 1 - tab:
         */
        _renderTab : function(index, navRequest)
        {
            var templateMetaData = this.model.get('meta');

            var tabData = templateMetaData.items[index] || {};

            var collectionId = tabData.params && tabData.params.id;
            tabData.collectionId = collectionId;

            var data = {
                tabParams: tabData
            };
            UN.registerChange(this.onCategorySelected.hitch(this), 2, {navRequest: navRequest, data: data, cbSelectDefault: this._selectDefaultCategory.hitch(this)});
        },

        /**
         * select default item (=root) on level 2 (root / sub category)
         */
        _selectDefaultCategory: function(data)
        {
            var navRequest = data.navRequest;
            // if not permalink: simulate the level 2 from the tab params.
            UN.navTo(storeEnums.aliases.DEFAULT_URL, {navRequest: navRequest, isInner: false});
        },

        /**
         * change on level 2 (root / sub category)
         */
        onCategorySelected: function (data, alias)
        {
            var navRequest = data.navRequest;
            var params = null;
            //check if we on root
            if (alias === storeEnums.aliases.DEFAULT_URL)
            {
                // clone the tab params (we have the layout,collectionId there, and probably more things...):
                params = $.extend({}, data.tabParams, {tabMeta: data.tabParams.meta});
            }
            //check if we on sub category:
            else
            {
                // get the category id by from alias, catalog id and layout from the tab:
                params = {
                    nodeId: alias,
                    collectionId: data.tabParams.collectionId,
                    tabMeta: data.tabParams.meta
                };
            }

            var data2 =
                {
                    addTabs: (alias === storeEnums.aliases.DEFAULT_URL),// we wants the tabs only on the "root" level, not after the user clicked on inner lists
                    params: params
                };

            UN.registerChange(this.onListSelected.hitch(this), 3, {navRequest: navRequest, data: data2, cbSelectDefault: this._selectDefaultList.hitch(this)});
        },

        /**
         * select default item on level 3 (normal/search)
         */
        _selectDefaultList: function(data)
        {
            var navRequest = data.navRequest;
            // if not permalink: simulate the level 3 from the tab params.
            UN.navTo(storeEnums.aliases.ITEMS_URL, {navRequest: navRequest, isInner: false});
        },

        /**
         * change on level 3 (normal / search)
         */
        onListSelected: function (data, alias)
        {
            var navRequest = data.navRequest;

            // clone the params:
            // TODO: maybe only on "default"? because maybe we moved to category without 1 of the params (e.g.: subtitle)- and we don't want the root subtitle...
            var params = $.extend({}, data.params);

            // create the model of the root / subCategory:
            var model = new StoreNodeModel(params);
            model.set('tabMeta',this.model.get('meta'));
            //check if we on search:
            if (alias.startsWith(storeEnums.aliases.SEARCH_URL))
            {
                // get the search term by removing the "Q_" at the beginning
                var term = alias.replace(storeEnums.aliases.SEARCH_URL, "");

                // for narrow, to know that this is search:
                model.set({term: term});
                // for getting the search data:
                var collection = model.get('items');
                collection.term = term;

                // add "Search" usage-event:
                UsageManager.addEvent(analytics.usageEventTypeEnum.Search, {
                    term: term
                });

            }
            //check if we on normal (=no search)
            else // if (alias === storeEnums.aliases.ITEMS_URL)
            {
                // nothing to do here...
            }


            var view = new StoreNodeView({
                model: model
            });

            this.renderListPage({navRequest: navRequest, model: model, view: view, addTabs: data.addTabs, level: 3});
        },

        /**
         * OVERRIDE - handle "lonely item"
         * NOTE: TEMPORARY, until the CP will be changed, and then we will not want this behaviour!
         */
        selectDefaultItem: function (data)
        {
            var navRequest = data.navRequest;
            // we want to select lonely item only on 1st level:
            var catAlias = UN.getCurrentUrlAtLevel(2);
            var itemsCollection = data.model.get('items');
            if (itemsCollection.length === 1 && catAlias === storeEnums.aliases.DEFAULT_URL)
            {
                var itemModel = itemsCollection.at(0);
                // check that this is category, and not item (can be in search on 1st level)
                if (itemModel.get('type') !== storeEnums.nodeType.ITEM)
                {
                    catAlias = itemModel.get('alias');
                    UN.navTo(catAlias, {level: 2, navRequest: navRequest, isInner: false /* TODO: always false? */});
                    return;
                }
            }

            // call "super":
            TemplateView.prototype.selectDefaultItem.apply(this, arguments);
        },

        /**
         * OVERRIDE.
         */
        getDetailsView: function (model)
        {
            var detailsPage = new StoreItemView({
                model: model
            });

            return detailsPage;
        },

        /**
         * OVERRIDE.
         */
        getNoItemsView : function(settings)
        {
            var node_name = settings.model.get("variantData").name;
            var term = settings.model.get("items").term;

            if (term) {
                // no items for search
                var title = _T("CollectionsSearchNoResultsFound");
                var text = _T("CollectionsSearchNoResultsFoundSubtitle", {node_name: node_name, query_string: term});
                var img = "app/interface/web/img/search.svg";
            } else {
                // empty category
                var title = _T("CollectionsSearchNoItemsFound");
                var text = _T("CollectionsSearchNoItemsFoundSubtitle", {node_name: node_name});
                var img = "app/interface/web/img/noItems.svg";
            }

            var genericPageModel = new GenericPageModel({
                title: title,
                text: text,
                img: img
            });
            var id = Utils.Helpers.generateGUID();
            return new GenericPageView({
                model: genericPageModel,
                id: id
            });
        }


    }); /**
 * View that shows the preview of the item ("leaf" item or sub category) inside grid 
 * (=in the collection iPad page)
 * 
 * @author Matanya
 */
var StoreGridItemView = Backbone.View.extend(
{	
	tagName: 'li',

	className: 'CollectionsGridItemView',

	events:
	{
		"tap": "itemClicked"
	},
	
	// initialize: function () 
	// {
	// 	this.$el.attr('data-role', 'button').addClass('t3d');		
	// },

	render: function() 
	{	
		var params = this.model.toJSON();
		if (this.model.get('type') === storeEnums.nodeType.CATEGORY)
		{
			var className = 'category';
			var template = storeTemplates.CollectionsGridItemView.category;
			// TEST: params.itemsCount = 45;
			if (params.itemsCount === null) // unknown number of items 
			{
				params.itemsCountStr = _T('CollectionsCategoryUnknownItemsCount');
			}
			else
			{
				params.itemsCountStr = _T('CollectionsCategoryItemsCount', {count: params.itemsCount});
			}
		}
		else //item
		{
			var className = 'item';
			var template = storeTemplates.CollectionsGridItemView.item;
		}
		
		this.$el.html(template(params)).addClass(className);
		return this;
	},

	itemClicked: function (event) 
	{
		event.preventDefault();
//		this.model.trigger('collectionItemClicked', this.model);
        var alias = this.model.get('alias'); //NOTE: this is the same like: this.model.get('id')

        if (this.model.get('type') === storeEnums.nodeType.CATEGORY)
        {
            // set current item in CurrentPageTracker:
            CurrentPageTracker.setCurrentItem(this.model);

            // add "item view" usage-event:
            UsageManager.addEvent(analytics.usageEventTypeEnum.ItemView, {
                id: this.model.get('id'),
                list: true
            });

            UN.navTo(alias, {level:2}); // page/tab/CATEGORY_ID
        }
        else //if (this.model.get('type') === storeEnums.nodeType.ITEM)
        {
            UN.navTo(alias, {level:4}); // page/tab/category/search/ITEM_ID
        }

	}
		
}); /*
* the left side of StoreWideCategoryView.
* this view show the category data (image, title, descr)
*/
var StoreCategoryLeftView = Backbone.View.extend(
{
	className: "CollectionsCategoryLeftView clr_contTypeA_bg",

    initialize: function () {
        //NOTE: bind on "change" is not good. we get lots of "change events" due to unrelevant params, like "loadingType"
//        this.model.on('change', this.render, this);
        this.model.on('headerChanged', this.render, this);
    },

    render: function ()
	{
		this.$el.html(storeTemplates.CollectionsCategoryLeftView(this.model.toJSON()));
		
		//TODO: do we need this init scroller? do we want here scroller at all?
        var $scrollWrapper = this.$('.scroll_wrapper');
        Scrolling.init($scrollWrapper);

		return this;
	}
}); /*
 * the "bread crumbs" bar view.
 * this view show the "bread crumbs" ("Shoes>sports>man>nike>search abc")
 * and can show the search input.
 */
var StoreBreadBarView = Backbone.View.extend({
    className: "BreadBarView clr_contTypeB_bg",

    events: {
        "tap .mainButtonContainer": "mainButtonClicked",
        "tap .clearEditButton": "clearEditClicked",
        "blur .searchInput": "inputExit",
        "focus .searchInput": "inputEnter",
        "input .searchInput": "inputChanged" // "input" event. also for drag&drop, etc. http://jsfiddle.net/pxfunc/5kpeJ/
        //,"keyup .searchInput": "inputChanged"
        ,
        "submit .search_form": "searchClicked"
    },

    /* we catch the click on the external button to enlarge the clickable area */
    mainButtonClicked: function () {
        if (this.$searchButton.is(":visible"))
            this.searchClicked();
        else
            this.clearSearchClicked();
    },

    searchClicked: function () {
        //console.log('searchClicked');
        this.doSearch();
        this.$input.blur();
    },

    clearSearchClicked: function () {
        //console.log('clearSearchClicked');
        this.clearSearch();
        this.$input.blur();
    },

    clearEditClicked: function () {
        //console.log('clearEditClicked');
        //this.$input.blur();
        //this.cancelEdit();
        this.$input.val('');
    },

    inputEnter: function () {
        //console.log('inputEnter');
        this.$searchIndicator.hide();
        this.$clearButton.hide();

        this.$searchButton.show();
        this.$clearEditButton.show();

    },

    inputExit: function () {
        //console.log('inputExit');
        this.cancelEdit();
    },

    inputChanged: function () {
        //console.log('inputChanged');
        var term = this.$input.val();
        if (term) {
            this.$searchButton.addClass('selected');
        }
        else {
            this.$searchButton.removeClass('selected');
        }
    },

    cancelEdit: function () {
        //console.log('cancelEdit');
        this.$clearEditButton.hide();
        var term = this.model.getSearchTerm();
        if (term) {
            //NOTE: we can remove this. but we need also to call to "inputChanged"  (maybe we don't need, and it will call because of this change?)
            //like "inputChanged"
            this.$searchButton.addClass('selected');

            //like "doSearch"
            this.$searchIndicator.show();
            this.$clearButton.show();
            this.$searchButton.hide();
        }
        else {
            //like "inputChanged"
            this.$searchButton.removeClass('selected');

            //like "clearSearch"
            this.$searchIndicator.hide();
            this.$clearButton.hide();
            this.$searchButton.show();
        }
        this.$input.val(term);
    },

    doSearch: function () {
        var term = this.$input.val();
        this.model.setSearch(term);

        this.$searchIndicator.show();
        this.$clearButton.show();

        //this.$clearEditButton.hide();//need this?
        this.$searchButton.hide();

        // add "Search" usage-event:
        UsageManager.addEvent(analytics.usageEventTypeEnum.Search, {
            term: term
        });

    },

    clearSearch: function () {
        this.model.clearSearch();

        this.$searchIndicator.hide();
        this.$clearButton.hide();

        this.$searchButton.show();
    },

    initialize: function () {
//        this.model.on('change:breadCrumbs', this.render, this); // currently we don't get the breadCrumbs from CMS, so it will never be changed
        this.model.on('change:name', this.render, this);//TODO: OK? need this? variantData?
    },

    render: function () {
        this.$el.html(storeTemplates.BreadBarView());
        var $breadContainer = this.$('.breadContainer');
        var breadCrumbs = this.model.get('breadCrumbs');
        for (var i = 0; i < breadCrumbs.length; i++) {
            var model = breadCrumbs[i];
            $breadContainer.append(storeTemplates.BreadCrumb(model.toJSON()));
        }
        var params = {
            variantData: this.model.get('variantData')
        };
        $breadContainer.append(storeTemplates.lastBreadCrumb(params));

        // add the search stuff:
        params = {
            placeholder: _T('CollectionsSearchPlaceholder2')
        };
        this.$el.append(storeTemplates.Search(params));
        this.$input = this.$('.searchInput');
        this.$clearButton = this.$('.clearButton');
        this.$searchButton = this.$('.searchButton');
        this.$searchIndicator = this.$('.searchIndicator');
        this.$clearEditButton = this.$('.clearEditButton');

        //will init controls: hide, show, etc:
        this.cancelEdit();
        return this;
    }


}); /*
* the right side of StoreWideCategoryView.
* this view show the category grid items
*/
var StoreCategoryRightView = ItemsView.extend(
{
	className: "CollectionsCategoryRightView clr_contTypeB_bg",

	initialize: function ()
	{
        // wrap with scroller.
        this.$el.html(storeTemplates.CollectionsCategoryRightView({}));
        this.$scroller = this.$('.scroller');
        this.$list = this.$('.grid_wrapper');
        this.$noResults = this.$('.no_result_wrapper');

        // add the bread view:
        var breadBarView = new StoreBreadBarView({
            model: this.model
        });
        var $breadWrapper = this.$('.bread_wrapper');
        $breadWrapper.html(breadBarView.render().el);

        var $scrollWrapper = this.$('.scroll_wrapper');
        Scrolling.init($scrollWrapper);

        ItemsView.prototype.initialize.apply(this);

        // for update margin of the grid:
        // (we need the "pageshow" because the calc method need the ul visible...)
		$(window).bind("throttledresize", this.onResize.hitch(this));
        var itemsCollection = this.model.get('items');
        if (itemsCollection)
        {
            // we want to update the margin also for the new items, and handle "no events":
			itemsCollection.bind('getItemsSuccess', this.onGetItems, this);
        }

        this.bind("pageshow", this.onPageShow.hitch(this));
        this.bind("pagehide", this.onPageHide.hitch(this));
        // this.$el.bind("pageshow", this.onPageShow.hitch(this));
        // this.$el.bind("pagehide", this.onPageHide.hitch(this));

		// now - the page is not shown yet, so we start with
		// onPageHide (not with onPageShow):
		this.onPageHide();

        this.$el.bind('refresh', this.handleRefreshClick.hitch(this));
        this.$el.bind('silentRefresh', this.handleSilentRefresh.hitch(this));
	},

	getRootView: function ()
    {
	    return this.$list;
    },

	createItemView: function (item)
	{
		// if (this.model.get('type') === ...)
		// {
		// 	var itemView = new StoreGridItemView({ model: item });
		// }
		// else
		// {
		// 	var itemView = new CollectionGridCategoryView({ model: item });
		// }
		var itemView = new StoreGridItemView({ model: item });
		return itemView;
	},

    /**
     * OVERRIDE, for handling "no results"
     */
    _reset: function ()
    {
        this.$scroller.removeClass('noResults');
        this.$noResults.html('').removeClass('noResults');
        //call super:
        ItemsView.prototype._reset.apply(this, arguments);
    },

    onNoResults: function () {

        var node_name = this.model.get("variantData").name;
        var term = this.model.get("items").term;

        if (term) {
            // no items for search
            var title = _T("CollectionsSearchNoResultsFound");
            var text = _T("CollectionsSearchNoResultsFoundSubtitle", {node_name: node_name, query_string: term});
            var img = "app/interface/web/img/search.svg";
        } else {
            // empty category
            var title = _T("CollectionsSearchNoItemsFound");
            var text = _T("CollectionsSearchNoItemsFoundSubtitle", {node_name: node_name});
            var img = "app/interface/web/img/noItems.svg";
        }

        var genericPageModel = new GenericPageModel({
            title: title,
            text: text,
            img: img
        });
        var noItemsView = new GenericView({
            model: genericPageModel
        });
        this.$scroller.addClass('noResults');
        this.$noResults.html(noItemsView.render().el).addClass('noResults');

//        var node_name = this.model.get("name");
//        var term = this.model.get("items").term;
//        if (term) {
//            var html = storeTemplates["no_search_results"]({
//                    query_string: term,
//                    node_name: node_name
//                });
//        } else {
//            var html = storeTemplates["no_items_results"]({
//                    node_name: node_name
//                });
//        }
//        this.$scroller.addClass('noResults');
//        this.$noResults.html(html).addClass('noResults');
    },

    onGetItems: function ()
    {
		if (!this.model.get('items').length)
            this.onNoResults();
        //TODO: do "onResize" only on "else"?
        this.onResize();
    },

    updateThumbnailsMargin: function ()
    {
        Utils.Html.setGridMargin(this.$itemsList, {alsoTopUl: true});
    },

    onResize: function ()
    {
		if (this.isPageShow)
		{
			this.updateThumbnailsMargin();
            this.isGridUpdated = true;
		}
        else
        {
            this.isGridUpdated = false;
            // We don't want the "jump" when calculating the grid-margin,
            // but we need the items to take up place - for margin calculation,
            // so we use the:
            // "hidden - The element is invisible (but still takes up space)"
            this.$itemsList.css({
                visibility: "hidden"
            });
        }
    },

    onPageShow: function ()
    {
		this.isPageShow = true;
        if (!this.isGridUpdated)
		{
            this.onResize();
            this.$itemsList.css({
                visibility: "visible"
            });
        }
    },

    onPageHide: function ()
    {
		this.isPageShow = false;

        if (!this.isGridUpdated)
        {
    		// We don't want the "jump" when calculating the grid-margin,
    		// but we need the items to take up place - for margin calculation,
    		// so we use the:
    		// "hidden - The element is invisible (but still takes up space)"
            this.$itemsList.css({
    			visibility: "hidden"
    		});
        }
    }
});
 /**
 * The collection main view (= "category view" ) for iPad.
 */
var StoreWideCategoryView = DividedScreenView.extend(
{
    setCollectionModel: function (collectionModel) 
    {        
        var leftView = new StoreCategoryLeftView({
            model: collectionModel
        });
        var rightView = new StoreCategoryRightView({
            model: collectionModel
        });
        this.setView1(leftView.render());
        this.setView2(rightView.render());
    }
}); /**
 * View that shows the preview of the item ("leaf" item) inside list
 * (=in the collection in details iPad page)
 * 
 * @author Matanya
 */
var StoreListItemView = ListItemView.extend(
{
	className: 'CollectionsListItemView clr_contTypeA_bg clr_contTypeA_brdr',

	events:
	{
		"tap": "itemClicked"
	},
	
	initialize: function () 
	{
        // call "super":
        ListItemView.prototype.initialize.apply(this);

        this.$el.attr('data-role', 'button').addClass('t3d');
	},
	
	render: function() 
	{	
		this.$el.html(storeTemplates.CollectionsListItemView(this.model.toJSON()));
		return this;
	},

    itemClicked: function (e) 
	{
        e.preventDefault();
        var alias = this.model.get('alias'); //NOTE: this is the same like: this.model.get('id')

        //TODO: do we want this "if"? in case that we will want to show also categories in the list...
//        if (this.model.get('type') === storeEnums.nodeType.CATEGORY)
//            UN.navTo(alias, {level:2}); // page/tab/CATEGORY_ID
//        else //if (this.model.get('type') === storeEnums.nodeType.ITEM)
            UN.navTo(alias, {level:4}); // page/tab/category/search/ITEM_ID
	}
		
}); /*
* the left side of StoreWideItemView.
* this view show the category list items
*/
var StoreItemLeftView = ItemsView.extend(
{	
	className: "CollectionsItemLeftView clr_contTypeA_bg",

	initialize: function () 
	{
        // wrap with scroller.
        this.$el.html(storeTemplates.CollectionsItemLeftView({}));
        this.$scroller = this.$('.scroller');
        this.$scrollWrapper = this.$('.scroll_wrapper');
        Scrolling.init(this.$scrollWrapper);
        
        ItemsView.prototype.initialize.apply(this);
        
        // we need this if we want to handle refresh
        this.$el.bind('refresh', this.handleRefreshClick.hitch(this));
        this.$el.bind('silentRefresh', this.handleSilentRefresh.hitch(this));
	},

	getRootView: function ()
    {
	    return this.$scroller;
    },

	createItemView: function (item) 
	{
		// "Filter" only items. no categories:
        if (item.get('type') !== storeEnums.nodeType.ITEM)
        {
            return null;
        }
        var itemView = new StoreListItemView({ model: item });
		return itemView;
    }
});
 /*
* the right side of StoreWideItemView.
* this view show the item data (image, title, descr, etc.)
*/
var StoreItemRightView = Backbone.View.extend(
{
	className: "CollectionsItemRightView clr_contTypeB_bg",

	events:
	{
		"tap .item_thumbnail": "thumbnailClicked",
		"tap .headerImage": "headerImageClicked"
	},

    initialize: function ()
    {
        this.model.on('change:variantData', this.render, this);

        // for update sizes of the view:
        // (we need the "pageshow" because the calc method need the el visible...)
        $(window).bind("throttledresize", this.onResize.hitch(this));
        this.bind("pageshow", this.onPageShow.hitch(this));
        this.bind("pagehide", this.onPageHide.hitch(this));
        // this.$el.bind("pageshow", this.onPageShow.hitch(this));
        // this.$el.bind("pagehide", this.onPageHide.hitch(this));

        this.$el.html(storeTemplates.CollectionsItemRightViewSkelaton({}));
        this.$putHereData = this.$('.putHereData')
        this.$details = this.$('.details')
        this.$links = this.$('.linksContainer')
        this.$('.buyboxWideContainer').html(new StoreBuyView({model:this.model, colorType: "B"}).render().el);
        this.$data_content = this.$(".data_content");

        this.$scrollWrapper = this.$('.scroll_wrapper');
        Scrolling.init(this.$scrollWrapper);

    },

    render: function ()
	{
        var params = this.model.toJSON();
		this.$putHereData.html(storeTemplates.CollectionsItemRightViewData(params));
		var variantData = this.model.get('variantData');
		var meta = variantData.meta;

		if (variantData.description)
		{
			// Render HTML into container using HTML container control
			var htmlContainer = new HtmlContainerControl();

			htmlContainer.renderHtml(this.$details, variantData.description, {changeColors: true, colorType: "B"});
		} else {
            this.$details.html('');
        }

		var shareIconsModel = meta.shareIconsModel;
		if (shareIconsModel)
		{
		    // create share buttons:
			var shareIconsView = new ShareIconsView(
			{
				model: shareIconsModel
			});
            this.$links.html(shareIconsView.render().el);
		}

		// save some jQuery objects for future use:
		this.$mainImage = this.$(".headerImage");
		this.$colorOnImage = this.$(".catImage");
		this.$thumbnails = this.$(".item_thumbnail");
		this.$images_container = this.$(".images_container");

		// now - we need to check if the page is shown or not:
		var isPageShown = (this.$el.width() > 0);
		if (isPageShown)
		{
			this.onPageShow();
		}
		else
		{
			this.onPageHide();
		}

		// now the page is not shown yet (we will get "pageShow" on page show, or my father will simulate it for me...)
//        this.onPageHide();
        return this;
	},

	thumbnailClicked: function (e) {
		var $selected = $(e.target);
		this.imageIndex = parseInt($selected.attr("data-index"));
		var image = this.model.get('variantData').images.gallery[this.imageIndex].url;

		//update the main image:
		this.$mainImage.css("background-image", 'url(' + image + ')');

		//update the "selected" color:
		this.$colorOnImage.removeClass('selected');
		$selected.addClass('selected');
	},
	
	headerImageClicked: function (e) {
		var images_array = this.model.getPhotosArrayForGallery();

		new PhotoGalleryManager().pressedImage(images_array, this.imageIndex || 0);
	},

	updateViewSizes: function ()
    {
		var MAX_IMAGE_WIDTH = 500;
		var MAX_MARGIN_TOP = 20;
		// find the width/height of the main image:

		var elWidth = this.$el.width();
		var width = elWidth * 0.7; // 70% of the minipage width
		width = Math.min(MAX_IMAGE_WIDTH, width); // don't allow too big
		width = 4 * Math.floor(width/4); // we want number that modulu 4 
		var height = 3*width/4;

		// find the width/height of the thumbnail images:
		var thmbHeight = Math.floor((height - 40) / 3); //3 images and 4 margins.
		var thmbWidth = Math.floor(thmbHeight*4/3);

		//find the width of the dat container and margin in top (=should be like margins in left and right)
		var dataWidth = width + 10 + 10 + thmbWidth + 10;// 2 margins inside the thumbnails container, + margin between it to the main image.
		var marginTop = Math.floor((elWidth - dataWidth) / 2);
		marginTop =  Math.min(MAX_MARGIN_TOP, marginTop);
		this.$mainImage.css({width: width, height: height});
		this.$thumbnails.css({width: thmbWidth, height: thmbHeight});
		this.$images_container.css({height: height});
		this.$data_content.css({width: dataWidth, marginTop: marginTop});

 		Scrolling.onContentChanged(this.$scrollWrapper);

    },

    onResize: function ()
    {
		if (this.isPageShow) 
		{
			this.updateViewSizes();
		}
    },

    onPageShow: function ()
    {
		this.isPageShow = (this.$el.width() > 0); // check if page show and added to DOM.
		if (this.isPageShow)
        {
        	this.onResize();
        	this.$data_content.css({
		 		visibility: "visible"
			});
        }
    },

    onPageHide: function ()
    {
		this.isPageShow = false;
		// We don't want the "jump" when calculating the grid-margin,
		// but we need the items to take up place - for margin calculation,
		// so we use the:
		// "hidden - The element is invisible (but still takes up space)"
        this.$data_content.css({
		 	visibility: "hidden"
		});
    }

}); /**
 * The view of item (= NOTE: include also the category) for iPad.
 */
var StoreWideItemView = DividedScreenView.extend(
{
    setCollectionModel: function (collectionModel) 
    {        
        if (collectionModel === this.collectionModel)
            return;

        this.collectionModel = collectionModel;
        var leftView = new StoreItemLeftView({
            model: collectionModel
        });

        this.setView1(leftView.render());
        
        //bind item selected in view 1 for updating view 2
        collectionModel.bind('itemSelected', this._onItemSelected, this);
    },

//    /* "public" function to select item inside the category.
//     * will show it in both views: left & right
//     * @param {StoreNodeModel} item - the "leaf" item in the category
//     */
//    setSelectedItem: function (item)
//    {
//        // will set as selected in the list ( = left view = view 1):
//        item.trigger('itemClicked', item);
//
//        // NO NEED: the _view1 does it on pageshow:
//        // scroll to selected item in the list (if out of the scope)
//        //this._view1.scrollToSelected();
//
//        // update the right view:
//        //this._updateView2(item);
//    },

    _updateView2: function (item) 
    {        
        var rightView = new StoreItemRightView({
            model: item
        });

        this.setView2(rightView.render());

        //simulate page show, so the view will calc sizes only after it added to the DOM:
        rightView.trigger("pageshow");
    },

    _onItemSelected: function (item, isReselect) 
    {
        // NOTE: we don't check: 
        //  if (!isReselect)
        // because maybe we back to prev page (grid), and than we reselect the item,
        // and in this case we want to select it.

        // update the right view:
        this._updateView2(item);
    }
}); /**
 * The collection template for iPad.
 */
var StoreWideTemplateView = TemplateView.extend(
    {
        /**
         * OVERRIDE - render level 1 - tab:
         */
        _renderTab : function(index, navRequest)
        {
            var templateMetaData = this.model.get('meta');

            var tabData = templateMetaData.items[index] || {};

            var collectionId = tabData.params && tabData.params.id;
            tabData.collectionId = collectionId;

            var data = {tabParams: tabData};
            UN.registerChange(this.onCategorySelected.hitch(this), 2, {navRequest: navRequest, data: data, cbSelectDefault: this._selectDefaultCategory.hitch(this)});
        },

        /**
         * select default item (=root) on level 2 (root / sub category)
         */
        _selectDefaultCategory: function(data)
        {
            var navRequest = data.navRequest;
            // if not permalink: simulate the level 2 from the tab params.
            UN.navTo(storeEnums.aliases.DEFAULT_URL, {navRequest: navRequest, isInner: false});
        },

        /**
         * change on level 2 (root / sub category)
         */
        onCategorySelected: function (data, alias)
        {
            var navRequest = data.navRequest;

            //check if we on root
            if (alias === storeEnums.aliases.DEFAULT_URL)
            {
                // clone the tab params (we have the layout,collectionId there, and probably more things...):
                var params = $.extend({}, data.tabParams);
            }
            //check if we on sub category:
            else
            {
                // get the category id by from alias, catalog id and layout from the tab:
                var params = {
                    nodeId: alias,
                    collectionId: data.tabParams.collectionId
                };
            }

            var data2 =
            {
                addTabs: (alias === storeEnums.aliases.DEFAULT_URL),// we wants the tabs only on the "root" level, not after the user clicked on inner lists
                params: params
            };

            UN.registerChange(this.onListSelected.hitch(this), 3, {navRequest: navRequest, data: data2, cbSelectDefault: this._selectDefaultList.hitch(this)});
        },

        /**
         * select default item on level 3 (normal/search)
         */
        _selectDefaultList: function(data)
        {
            var navRequest = data.navRequest;
            // if not permalink: simulate the level 3 from the tab params.
            UN.navTo(storeEnums.aliases.ITEMS_URL, {navRequest: navRequest, isInner: false});
        },

        /**
         * change on level 3 (normal / search)
         */
        onListSelected: function (data, alias)
        {
            var navRequest = data.navRequest;

            // clone the params:
            // TODO: maybe only on "default"? because maybe we moved to category without 1 of the params (e.g.: subtitle)- and we don't want the root subtitle...
            var params = $.extend({}, data.params);

            // create the model of the root / subCategory:
            var model = new StoreNodeModel(params);
            model.set("tabMeta", this.model.get("meta"));
            //TODO: is this code relevant? It seems that the search in wide is not changing the URL, etc.
            //check if we on search:
            if (alias.startsWith(storeEnums.aliases.SEARCH_URL))
            {
                // get the search term by removing the "Q_" at the beginning
                var term = alias.replace(storeEnums.aliases.SEARCH_URL, "");

                // for narrow, to know that this is search:
                model.set({term: term});
                // for getting the search data:
                var collection = model.get('items');
                collection.term = term;
            }
            //check if we on normal (=no search)
            else // if (alias === storeEnums.aliases.ITEMS_URL)
            {
                // nothing to do here...
            }


            var view = new StoreWideCategoryView({ leftWidth: "280px" }).addRefreshButton(false, true);
            view.setCollectionModel(model);

            this.renderListPage({
                navRequest: navRequest,
                model: model,
                view: view,
                addTabs: data.addTabs,
                level: 3,
                useGenericNoItems: false /*we temporary handle the "no items" here in CollectionsCategoryRightView, until we will support no items on right side of divided screen*/
                });
        },

        /**
         * OVERRIDE - handle "lonely item"
         * NOTE: TEMPORARY, until the CP will be changed, and then we will not want this behaviour!
         */
        selectDefaultItem: function (data)
        {
            var navRequest = data.navRequest;
            // we want to select lonely item only on 1st level:
            var catAlias = UN.getCurrentUrlAtLevel(2);
            var itemsCollection = data.model.get('items');
            if (itemsCollection.length === 1 && catAlias === storeEnums.aliases.DEFAULT_URL)
            {
                var itemModel = itemsCollection.at(0);
                // check that this is category, and not item (can be in search on 1st level)
                if (itemModel.get('type') !== storeEnums.nodeType.ITEM)
                {
                    catAlias = itemModel.get('alias');
                    UN.navTo(catAlias, {level: 2, navRequest: navRequest, isInner: false /* TODO: always false? */});
                    return;
                }
            }

            // call "super":
            TemplateView.prototype.selectDefaultItem.apply(this, arguments);
        },

//        /**
//         * OVERRIDE - handle "lonely item"
//         */
//        getDefaultItemAlias: function (data)
//        {
//            var itemsCollection = data.model.get('items');
//            if (itemsCollection.length === 1)
//            {
//                var itemModel = itemsCollection.at(0);
//                return itemModel.get('alias');
//            }
//            return null;
//        },

        /**
         * OVERRIDE.
         */
        getDetailsView: function (model, data)
        {
            //NOTE: we check this to validate that the view.$el is still in the DOM
            // (e.g.: maybe the UN decided to remove it after "back"),
            //  because after it was removed from the DOM, we don't get the events on the list.
            //TODO: maybe we can get notification when the view is out of the DOM, and than we will do: this.itemView = null; and here we just do: this.itemView = this.itemView || new StoreWideItemView({leftWidth: "34%"});
            if (!this.itemView || !this.itemView.$el.parent().length)
                this.itemView = new StoreWideItemView({leftWidth: "34%"});

            // the collection model
            var listModel = data.model;
            this.itemView.setCollectionModel(listModel);
//            this.itemView.setSelectedItem(model); // the templateView will do this


            return this.itemView;
        }

    }); 

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

/**
 * Vibration class
 *
 * @author Yaron Jackoby
 */
var vibrateDriver = (function ()
{
	var myVibrateDriver = {};
	
	myVibrateDriver.isSupported = function()
    {
        return false;
    };
	
    /**
     * Vibrate device for a specific time
	 *
	 * @param nTime - Time in miliseconds for the vibration
	 *					nTime range from 0 to 10000. default is 10
     *
	 * @author Yaron Jackoby
     */
	myVibrateDriver.vibrateForTime = function (cbSuccess, cbFail, nTime)
	{
		Utils.Helpers.funcWrapper(cbFail)('not supported');
	};
	
	return myVibrateDriver;
}());



        function myFunction(closeWindow)
        {
            var win = window.opener;
            if (!win)
            {
                console.log("error: no opener!");
            }
            else
            {
                //NOTE: this const is also in the client JS code!
                var COMO_MESSAGE = "cimp://";

                var ACTION = "";//for future use
                var messageParams = window.location.search;

                var data = COMO_MESSAGE + ACTION + messageParams;
                win.postMessage(data, "*");
            }
            if (closeWindow)
                window.close();
        }

        myFunction(true);

    

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
				appDriver.removeBackButton();
			break;
		}
	}

	,_addBackButton: function ()
	{
		function cbHandle()
		{
			navigator.webModule.goBack();
		}
		appDriver.addBackButton(null, null, null, false, cbHandle);
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
                uiDriver.showDialogBox(null, null, dlgOptions);

            }
            // not the first call (in pagination) show toast.
            else {
                uiDriver.showToastMessage(null, null, this.options.failStr, this.$el);
                // Cancel the loading
                this._cbCancel();
            }
        }
        // Show toast only if fail after executing the service.
        else
        if (!serviceNotExecuted) {
            // Show toast message in simulator
            uiDriver.showToastMessage(null, null, this.options.failStr, this.$el);

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




        function crash() {
            var img = document.createElement('img');
            img.src = '';
            img.onerror  = function() {
                /* will crash HERE */
                img.remove();
            };

            document.body.appendChild(img);
        }

    


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

    




        $(function() {
            $.getScript("//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js");
        });
    

    (adsbygoogle = window.adsbygoogle || []).push({});
    







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
