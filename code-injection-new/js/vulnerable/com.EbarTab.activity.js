
// JavaScript Document
App.views.EbarTabLoding = Ext.extend(Ext.Panel,{
   fullscreen:true,
			id:'lodingPage',
			style:'background:#111111;',
            items:[{xtype:'spacer',cls:Ext.is.Phone ? 'IphoneCls':'IpadCls'}   ]
});
Ext.reg('EbarTabLoding', App.views.EbarTabLoding);



Ext.regController('EbarTab', {
 
    // index action
	index: function()
    {
			if(!this.indexView){
            this.indexView = this.render({
                xtype: 'EbarTabLogin',
            });
       
		} 	this.application.viewport.setActiveItem(this.indexView); 
			localStorage.removeItem('UserId');
			localStorage.removeItem('UserName');
			localStorage.removeItem('Email');
			localStorage.removeItem('Point');
			localStorage.removeItem('increment');
			localStorage.removeItem('Status');
		 document.getElementById('EbarTabVieport').setAttribute('class','x-panel x-fullscreen x-landscape');
		if(document.getElementById('UserRecieptView')){
		   document.getElementById('UserRecieptView').setAttribute('class','x-hidden-display');
		   }
		    if(document.getElementById('VoucherDescriptionView')){
		  document.getElementById('VoucherDescriptionView').setAttribute('class','x-hidden-display');
   }
        Ext.getCmp('EbarTabToolBar').setTitle('Login Form');
        var backBtn = this.application.viewport.query('#backBtn')[0];
        backBtn.hide();
		var EbarTabMainMenu = this.application.viewport.query('#EbarTabMainMenu')[0];
        EbarTabMainMenu.hide();
		Ext.getCmp('EbarTabToolBar').hide();
        var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
        NavigationBtn.hide();
		var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
        UploadreceiptBtn.hide();
        fillRememberedValues();
       	this.application.viewport.doLayout();
    },
	EbarTabHome: function(options)
    {
		if(fnmcheckUser()){
			var EbarTabMainMenu = this.application.viewport.query('#EbarTabMainMenu')[0];
			EbarTabMainMenu.show();
			if(!this.EbarTabHomeView){
				this.EbarTabHomeView = this.render({
					xtype: 'EbarTabHomePage',
				});
			}
			document.getElementById('fullUserLevel').innerHTML='';
			document.getElementById('UserPoint').innerHTML='';
			document.getElementById('fullUserName').innerHTML='';
			fngetuserProfile();
			Ext.getCmp('EbarTabToolBar').show();
				if(document.getElementById('VoucherDescriptionView')){
			  document.getElementById('VoucherDescriptionView').setAttribute('class','x-hidden-display');
				}
			  if(Ext.is.Phone){
				var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
				NavigationBtn.show();
			  }else{
			  var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
			NavigationBtn.hide();	  
			}
			var backBtn = this.application.viewport.query('#backBtn')[0];
			backBtn.hide();
				var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
			UploadreceiptBtn.hide();
			Ext.getCmp('EbarTabToolBar').setTitle('My Profile');
			this.application.viewport.setActiveItem(this.EbarTabHomeView, options.animation);
						
			Ext.getCmp('MainMenuProfile').addCls('x-tab-active'); 
			this.application.viewport.doLayout();
		}
    },
	// about action
    MyVouchers: function(options)
    {
		//alert('MyVoucher');
	  if(fnmcheckUser()){
		  if(!this.MyVoucherPage){
				this.MyVoucherPage = this.render({
					xtype: 'MyVoucher',
				});
		  }
		  
		  if(document.getElementById('VoucherDescriptionView')){
			  document.getElementById('VoucherDescriptionView').setAttribute('class','x-hidden-display');
	   }
		  profile='';
			   document.getElementById('EbarTabVieport').setAttribute('class','x-panel x-fullscreen x-landscape');
			   
			  /* if(document.getElementById('MyVoucherView')){
				var MV=document.getElementById('MyVoucherView').parentNode.id;				
					if(MV=='EbarTabVieport'){
					document.getElementById('MyVoucherView').style.top='0px';	
					}else{
					document.getElementById('MyVoucherView').style.top='47px';	
					}  
			   }*/
				if(Ext.is.Phone){
				var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
				NavigationBtn.show();
			  }else{
			  var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
			NavigationBtn.hide();	  
			}
			var backBtn = this.application.viewport.query('#backBtn')[0];
			backBtn.hide();
			var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
			UploadreceiptBtn.hide();
			Ext.getCmp('EbarTabToolBar').setTitle('My Vouchers');
			this.application.viewport.setActiveItem(this.MyVoucherPage, options.animation);
			if(!options.data){fngetUserVoucher();}
			this.application.viewport.doLayout();
			Ext.getCmp('MainMenuMyvoucher').addCls('x-tab-active');
	  }
    },
	MyReceiptHistory: function(options)
    {
		if(fnmcheckUser()){
		   if(!this.MyReceiptHistorypage){
				this.MyReceiptHistorypage = this.render({
					xtype: 'MyReceipt',
				});
		   }
			if(document.getElementById('VoucherDescriptionView')){
			  document.getElementById('VoucherDescriptionView').setAttribute('class','x-hidden-display');
	   }
			 profile='';
	   document.getElementById('EbarTabVieport').setAttribute('class','x-panel x-fullscreen x-landscape');
			var backBtn = this.application.viewport.query('#backBtn')[0];
			backBtn.hide();
			  if(Ext.is.Phone){
				var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
				 UploadreceiptBtn.show();
			  }else{
				var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
				UploadreceiptBtn.show();
			  }
			   if(Ext.is.Phone){
				var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
				NavigationBtn.show();
			  }else{
			  var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
			NavigationBtn.hide();	  
			}
			  UploadreceiptBtn.setHandler(function()
			{
				fnopenUploadReceipt();
					
			});
			Ext.getCmp('EbarTabToolBar').setTitle('My Receipts');
			this.application.viewport.setActiveItem(this.MyReceiptHistorypage, options.animation);
			fngetUserReceipt();Ext.getCmp('MainMenurecipet').addCls('x-tab-active');this.application.viewport.doLayout();
		}
    },
	UploadReceipts: function(options)
    {
	   if(fnmcheckUser()){
			if(!this.UploadReceipttpage){
				this.UploadReceipttpage = this.render({
					xtype: 'UploadReceipts',
				});
			}
		   
			var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
			UploadreceiptBtn.hide();
			Ext.getCmp('UploadreceiptBtn').hide();
			 if(Ext.is.Phone){
				var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
				NavigationBtn.show();
					var backBtn = this.application.viewport.query('#backBtn')[0];
			backBtn.hide();	
			  }else{
			  var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
			NavigationBtn.hide(); 
			var backBtn = this.application.viewport.query('#backBtn')[0];
			backBtn.show();	  
			}
			 profile='';
			 backBtn.setHandler(function()
			{
				Ext.dispatch({
				controller: 'EbarTab',
				action: 'MyReceiptHistory',
				historyUrl: 'EbarTab/MyReceiptHistory',
				animation: {
						type: 'slide',
						 direction:'right'
					},
				});
			});
			Ext.getCmp('EbarTabToolBar').setTitle('Upload Receipt');
			this.application.viewport.setActiveItem(this.UploadReceipttpage, options.animation);
			if(options.data){			Ext.getCmp('hidreceiptImg').setValue(options.data);		}else{loadClubName();}this.application.viewport.doLayout();
	   }
    },
	UploadImg: function(options)
    {
	  if(fnmcheckUser()){
		  if(!this.UploadImgView){
				this.UploadImgView = this.render({
					xtype: 'UploadImg',
				});
				
		  }
			var backBtn = this.application.viewport.query('#backBtn')[0];
			backBtn.show();
				Ext.getCmp('EbarTabMainMenu').show();
			document.getElementById('EbarTabVieport').setAttribute('class','x-panel x-fullscreen x-landscape');
			var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
			UploadreceiptBtn.hide();
			  var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
			NavigationBtn.hide();	
	
			 if(document.getElementById('VoucherDescriptionView')){
			  document.getElementById('VoucherDescriptionView').setAttribute('class','x-hidden-display');
	   }
			 profile='';
			
			backBtn.setHandler(function()
			{
				Ext.dispatch({
					controller: 'EbarTab',
					action: 'UploadReceipts',
					historyUrl: 'EbarTab/UploadReceipts',
					animation: {
						type: 'slide',
						 direction:'right'
					},
				});
			});
			
			Ext.getCmp('EbarTabToolBar').setTitle('Upload Image');
			this.application.viewport.setActiveItem(this.UploadImgView, options.animation);
            if(!options.data){
					pic=0;
	      	//	Ext.getCmp('Share_but').hide();
                    Ext.getCmp('receiptImgbasecode').setValue(''); 
                    document.getElementById('UploadImg').src='upload1.png';
           }
			 //  Ext.getCmp('Share_but').hide();
			      if(posi!=0){
                  var Obj=document.getElementById('PhotoShareView');
                  var Pr=Obj.parentNode;
                  var str=document.getElementById(Pr.id).style.height;
                  var hei=str.substring(0,str.length-2);
                  document.getElementById(Pr.id).style.height=(parseInt(hei)-50)+"px";
                  var str=Obj.style.height;
                  var hei=str.substring(0,str.length-2);
                  Obj.style.height=(parseInt(hei)-50)+"px";
                  var Obj=document.getElementById('ShareBarTab');
                  var str=Obj.style.top;
                  var hei=str.substring(0,str.length-2);
                  Obj.style.top=(parseInt(hei)-50)+"px";
                  posi=0;
                  }
		  
		this.application.viewport.doLayout();
		 
	  }
    },
   AuctionsItem: function(options)
    {		
	   if(fnmcheckUser()){
		   if(!this.AuctionsItemPage){
				this.AuctionsItemPage = this.render({
					xtype: 'AuctionsItemform',
				});
		   }
		   profile='';
		   document.getElementById('EbarTabVieport').setAttribute('class','x-panel x-fullscreen x-landscape');
				if(document.getElementById('VoucherDescriptionView')){
			    document.getElementById('VoucherDescriptionView').setAttribute('class','x-hidden-display');
	   }
			var backBtn = this.application.viewport.query('#backBtn')[0];
			backBtn.hide();
			var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
			UploadreceiptBtn.hide();
			 if(Ext.is.Phone){
				var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
				NavigationBtn.show();
			  }else{
			  var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
			NavigationBtn.hide(); 
			}
			Ext.getCmp('EbarTabToolBar').setTitle('Auction Items');
			this.application.viewport.setActiveItem(this.AuctionsItemPage, options.animation);
			//window.location=document.URL;
			if(!options.data){fngetAuctionsItem(); }
			Ext.getCmp('MainMenuAuction').addCls('x-tab-active');this.application.viewport.doLayout();
	   }
    },
	MyClub: function(options)
    {
		 profile='';
	   if(fnmcheckUser()){
		   if(!this.MyClubpage){			  
				this.MyClubpage = this.render({
					xtype: 'MyClubform',
				});
				
		   }
		   
			if(document.getElementById('VoucherDescriptionView')){
			  document.getElementById('VoucherDescriptionView').setAttribute('class','x-hidden-display');
	   }
	   document.getElementById('EbarTabVieport').setAttribute('class','x-panel x-fullscreen x-landscape');
			var backBtn = this.application.viewport.query('#backBtn')[0];
			backBtn.hide();
			 if(Ext.is.Phone){
				var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
				NavigationBtn.show();
			  }else{
			  var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
			NavigationBtn.hide(); 
			}
			var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
			UploadreceiptBtn.hide();
			Ext.getCmp('EbarTabToolBar').setTitle('Clubs');
			this.application.viewport.setActiveItem(this.MyClubpage, options.animation);
			this.application.viewport.doComponentLayout();
			//this.application.viewport.doLayout();
			/*alert(options.data);*/
			if(!options.data){
				fngetMyClubs();
				if(Ext.getCmp('ClubList').rendered){				
					Ext.getCmp('ClubList').scroller.scrollTo({
						 x:0, y:0
					});		
				}
			}	
			Ext.getCmp('txtSearchClub').setValue('');
			Ext.getCmp('txtSearchClub').doComponentLayout();
			var tempData2 = [];
			MyClubstore.each(function (record) {
						tempData2.push(record);
			});
			MySearchClubstore.loadData(tempData2);
			Ext.getCmp('MainMenuClub').addCls('x-tab-active');
	   }
    },
	EventGuestlists: function(options)
    {
	   if(fnmcheckUser()){
		   if(!this.EventGuestlistspage){
				this.EventGuestlistspage = this.render({
					xtype: 'EventGuestlistsform',
				});
		   }
		if(document.getElementById('VoucherDescriptionView')){
			  document.getElementById('VoucherDescriptionView').setAttribute('class','x-hidden-display');
	   }
		 profile='';
	   document.getElementById('EbarTabVieport').setAttribute('class','x-panel x-fullscreen x-landscape');
			var backBtn = this.application.viewport.query('#backBtn')[0];
			backBtn.hide();
			var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
			UploadreceiptBtn.hide();
			  if(Ext.is.Phone){
				var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
				NavigationBtn.show();
			  }else{
			  var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
			NavigationBtn.hide(); 
			}
			Ext.getCmp('EbarTabToolBar').setTitle('Event Guestlist');
			this.application.viewport.setActiveItem(this.EventGuestlistspage, options.animation);
			this.application.viewport.doLayout();
			fngetEventGuestlists();Ext.getCmp('MainMenuGuestList').addCls('x-tab-active');
	   }
    },
	UpcomingEvents: function(options)
    {
	   if(fnmcheckUser()){
		   if(!this.UpcomingEventspage){
				this.UpcomingEventspage = this.render({
					xtype: 'UpcomingEventsform',
				});
		   }
		if(document.getElementById('VoucherDescriptionView')){
			  document.getElementById('VoucherDescriptionView').setAttribute('class','x-hidden-display');
	   }
	   document.getElementById('EbarTabVieport').setAttribute('class','x-panel x-fullscreen x-landscape');
			var backBtn = this.application.viewport.query('#backBtn')[0];
			backBtn.hide();
			var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
			UploadreceiptBtn.hide();
			 
			  if(Ext.is.Phone){
				var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
				NavigationBtn.show();
			  }else{
			  var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
			NavigationBtn.hide(); 
		}
			Ext.getCmp('EbarTabToolBar').setTitle('Upcoming Events');
			this.application.viewport.setActiveItem(this.UpcomingEventspage, options.animation);
			this.application.viewport.doLayout();
			if(!options.data){
			fngetUpcomingEvents();
			}
			Ext.getCmp('MainMenuEvent').addCls('x-tab-active');
	   }
    },
	ClubDescription: function(options)
    {
		

	  if(fnmcheckUser()){
		   if(!this.ClubDescriptionpage){
				this.ClubDescriptionpage = this.render({
					xtype: 'ClubDescriptionform',
				});
		   }
		if(document.getElementById('VoucherDescriptionView')){
			  document.getElementById('VoucherDescriptionView').setAttribute('class','x-hidden-display');
	   }
	   document.getElementById('EbarTabVieport').setAttribute('class','x-panel x-fullscreen x-landscape');
			var backBtn = this.application.viewport.query('#backBtn')[0];
			backBtn.show();
			  var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
			NavigationBtn.hide();	
					if(options.data.pageback=='TheWeek'){
						var action='Club_This_Week';
						
					}else{
						var action='MyClub';
						
					}
					
			backBtn.setHandler(function()
			{
					Ext.dispatch({
									controller: 'EbarTab',
									action: action,
									data:'back',
									historyUrl: 'EbarTab/'+action,
									animation: {
										type: 'slide',
										 direction:'right'
									},
								});
			});
			var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
			UploadreceiptBtn.hide();
			Ext.getCmp('EbarTabToolBar').setTitle('Club Description');
			if(!options.data.Bask){
				setClubsFullDesc(options.data.record);
			}
			this.application.viewport.setActiveItem(this.ClubDescriptionpage, options.animation);
			this.application.viewport.doLayout();
	  }
    },
	VoucherDescription: function(options)
    {
	 if(fnmcheckUser()){
       if(!this.VoucherDescriptionpage){
            this.VoucherDescriptionpage = this.render({
                xtype: 'VoucherDescriptionform',
            });
	   }
	   document.getElementById('EbarTabVieport').setAttribute('class','x-panel x-fullscreen x-landscape');
		   document.getElementById('VoucherDescriptionView').setAttribute('class',' x-scroller x-list-parent uploadimgCls  x-fullscreen x-landscap');
        var backBtn = this.application.viewport.query('#backBtn')[0];
        backBtn.show();
		var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
        NavigationBtn.hide();	
		backBtn.setHandler(function()
		{
				Ext.dispatch({
								controller: 'EbarTab',
								action: 'MyVouchers',
								data:'back',
								historyUrl: 'EbarTab/MyVouchers',
								animation: {
									type: 'slide',
									 direction:'right'
								},
							});
				
		});
		var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
        UploadreceiptBtn.hide();
        this.application.viewport.setActiveItem(this.ClubDescriptionpage, options.animation);
		//Ext.getCmp('EbarTabToolBar').setTitle(options.data.data.Voucher);
		Ext.getCmp('EbarTabToolBar').setTitle('Voucher Description');
		setVoucherFullDesc(options.data);
		this.application.viewport.doLayout();
	 }
    },
	AustionDescription: function(options)
    {
	   if(fnmcheckUser()){
		   if(!this.AustionDescriptionpage){
				this.AustionDescriptionpage = this.render({
					xtype: 'AustionDescriptionform',
				});
		   }
		if(document.getElementById('VoucherDescriptionView')){
			  document.getElementById('VoucherDescriptionView').setAttribute('class','x-hidden-display');
	   }
	   document.getElementById('EbarTabVieport').setAttribute('class','x-panel x-fullscreen x-landscape');
			var backBtn = this.application.viewport.query('#backBtn')[0];
			backBtn.show();
			  var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
			NavigationBtn.hide();	
			if(options.data[0].page=='AuctionItem'){

				var action='AuctionsItem';
				Bidpage='AuctionsItem';
			}else{
				var action='FeaturedRewards';
				Bidpage='FeaturedRewards';
			}
			//alert('action'+action);
			
			backBtn.setHandler(function()
			{
					Ext.dispatch({
									controller: 'EbarTab',
									action: action,
									data:'back',
									historyUrl: 'EbarTab/'+action,
									animation: {
										type: 'slide',
										 direction:'right'
									},
								});
			});
			var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
			UploadreceiptBtn.hide();
			this.application.viewport.setActiveItem(this.AustionDescriptionpage, options.animation);
			//Ext.getCmp('EbarTabToolBar').setTitle(options.data[0].record.data.ItemeName);
			Ext.getCmp('EbarTabToolBar').setTitle('Auction Description');
			setAustionFullDesc(options.data[0].record);
			this.application.viewport.doLayout();
	   }
    },
	UpcomingEventDescription: function(options)
    {
	  if(fnmcheckUser()){
		   if(!this.UpcomingEventDescriptionpage){
				this.UpcomingEventDescriptionpage = this.render({
					xtype: 'UpcomingEventDescriptionform',
				});
		   }
		if(document.getElementById('VoucherDescriptionView')){
			  document.getElementById('VoucherDescriptionView').setAttribute('class','x-hidden-display');
	   }
	   document.getElementById('EbarTabVieport').setAttribute('class','x-panel x-fullscreen x-landscape');
		 var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
			NavigationBtn.hide();	
			var backBtn = this.application.viewport.query('#backBtn')[0];
			backBtn.show();
				var action='UpcomingEvents';
				if(options.data.pageback=='TheWeek'){action='Event_This_Week';BackpageName='TheWeek';}
				else{BackpageName='UpcomingEvents';}
			backBtn.setHandler(function()
			{
					Ext.dispatch({
									controller: 'EbarTab',
									action: action,
									data:'back',
									historyUrl: 'EbarTab/'+action,
									animation: {
										type: 'slide',
										 direction:'right'
									},
								});
			});
			var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
			UploadreceiptBtn.hide();
			this.application.viewport.setActiveItem(this.UpcomingEventDescriptionpage, options.animation);
				Ext.getCmp('EbarTabToolBar').setTitle('Event Description');
				if(options.data.record){
			setEventFullDesc(options.data.record);
			}
			this.application.viewport.doLayout();
	  }
    },
	FeaturedRewards: function(options)
    {
	   if(fnmcheckUser()){
		   if(!this.FeaturedRewardspage){
				this.FeaturedRewardspage = this.render({
					xtype: 'FeaturedRewardspageform',
				});
		   }
		if(document.getElementById('VoucherDescriptionView')){
			  document.getElementById('VoucherDescriptionView').setAttribute('class','x-hidden-display');
	   }
	   document.getElementById('EbarTabVieport').setAttribute('class','x-panel x-fullscreen x-landscape');
		 
			 if(Ext.is.Phone){
				var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
				NavigationBtn.hide(); 
				var backBtn = this.application.viewport.query('#backBtn')[0];
			backBtn.show();
			  }else{
			  var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
			NavigationBtn.hide(); 
			var backBtn = this.application.viewport.query('#backBtn')[0];
			backBtn.hide();
			}
			backBtn.setHandler(function()
			{
					Ext.dispatch({
									controller: 'EbarTab',
									action: 'Rewards',
									historyUrl: 'EbarTab/Rewards',
									animation: {
										type: 'slide',
										 direction:'right'
									},
								});
			});
			var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
			UploadreceiptBtn.hide();
			this.application.viewport.setActiveItem(this.FeaturedRewardspage, options.animation);
			Ext.getCmp('EbarTabToolBar').setTitle('Featured Rewards');
			Ext.getCmp('SubMenuFeaturedRewards').addCls('x-tab-active');
			if(!options.data){fngetFeaturedRewards();}
			Ext.getCmp('MainMenuRewards').addCls('x-tab-active');
	   }
    },
	MentioneBarTab: function(options)
    {
	   if(fnmcheckUser()){
		   if(!this.MentioneBarTabpage){
				this.MentioneBarTabpage = this.render({
					xtype: 'Mentione-BarTabform',
				});
		   }
			if(document.getElementById('VoucherDescriptionView')){
			  document.getElementById('VoucherDescriptionView').setAttribute('class','x-hidden-display');
	   }
	   document.getElementById('EbarTabVieport').setAttribute('class','x-panel x-fullscreen x-landscape');
		  
			  if(Ext.is.Phone){
				var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
				NavigationBtn.hide(); 
				var backBtn = this.application.viewport.query('#backBtn')[0];
			backBtn.show();
		  }else{
			  var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
			NavigationBtn.hide(); 
			var backBtn = this.application.viewport.query('#backBtn')[0];
			backBtn.hide();
			}	
			backBtn.setHandler(function()
			{
					Ext.dispatch({
									controller: 'EbarTab',
									action: 'Rewards',
									historyUrl: 'EbarTab/Rewards',
									animation: {
										type: 'slide',
										 direction:'right'
									},
								});
			});
			var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
			UploadreceiptBtn.hide();
			this.application.viewport.setActiveItem(this.MentioneBarTabpage, options.animation);
			Ext.getCmp('EbarTabToolBar').setTitle('Mention e-BarTab');
			Ext.getCmp('SubMenuMentionEbarTab').addCls('x-tab-active');
			if(!options.data){fngetUserMentioneBarTab();}
			Ext.getCmp('MainMenuRewards').addCls('x-tab-active');
	   }
    },
	FCFS: function(options)
    {
	   if(fnmcheckUser()){
		   if(!this.FCFSpage){
				this.FCFSpage = this.render({
					xtype: 'FCFSform',
				});
		   }
		if(document.getElementById('VoucherDescriptionView')){
			  document.getElementById('VoucherDescriptionView').setAttribute('class','x-hidden-display');
	   }
	   document.getElementById('EbarTabVieport').setAttribute('class','x-panel x-fullscreen x-landscape');
		   
			var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
			 UploadreceiptBtn.hide();
			 if(Ext.is.Phone){
				var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
				  NavigationBtn.hide();
				  var backBtn = this.application.viewport.query('#backBtn')[0];
			backBtn.show();
			  }else{ 
			  var backBtn = this.application.viewport.query('#backBtn')[0];
			backBtn.hide();
			var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
			NavigationBtn.hide(); 
			}	
			backBtn.setHandler(function()
			{
					Ext.dispatch({
									controller: 'EbarTab',
									action: 'Rewards',
									historyUrl: 'EbarTab/Rewards',
									animation: {
										type: 'slide',
										 direction:'right'
									},
								});
			});
			this.application.viewport.setActiveItem(this.FCFSpage, options.animation);
			Ext.getCmp('EbarTabToolBar').setTitle('Be The First');
			Ext.getCmp('SubMenuFCFS').addCls('x-tab-active');
			if(!options.data){		fngetUserFCFS(); }
			Ext.getCmp('MainMenuRewards').addCls('x-tab-active');
	   }
    },
	FCFSItemDescription: function(options)
    {
	  if(fnmcheckUser()){
		   if(!this.FCFSDescriptionpage){
				this.FCFSDescriptionpage = this.render({
					xtype: 'FCFSDescriptionform',
				});
		   }
		if(document.getElementById('VoucherDescriptionView')){
			  document.getElementById('VoucherDescriptionView').setAttribute('class','x-hidden-display');
	   }
	   document.getElementById('EbarTabVieport').setAttribute('class','x-panel x-fullscreen x-landscape');
			var backBtn = this.application.viewport.query('#backBtn')[0];
			backBtn.show();
			  var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
			NavigationBtn.hide();
			backBtn.setHandler(function()
			{
					Ext.dispatch({
									controller: 'EbarTab',
									action: 'FCFS',
									data:'back',
									historyUrl: 'EbarTab/FCFS',
									animation: {
										type: 'slide',
										 direction:'right'
									},
								});
			});
			var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
			UploadreceiptBtn.hide();
			this.application.viewport.setActiveItem(this.FCFSDescriptionpage, options.animation);
			//Ext.getCmp('EbarTabToolBar').setTitle(options.data.data.Name);
			Ext.getCmp('EbarTabToolBar').setTitle('Item Description');
			setUserFCFSItemData(options.data);
			this.application.viewport.doLayout();
	  }
    },
	MentioneBarTabDescription: function(options)
    {
	   if(fnmcheckUser()){
		   if(!this.MentioneBarTabDescriptionpage){
				this.MentioneBarTabDescriptionpage = this.render({
					xtype: 'MentioneBarTabDescriptionform',
				});
		   }
		if(document.getElementById('VoucherDescriptionView')){
			  document.getElementById('VoucherDescriptionView').setAttribute('class','x-hidden-display');
	   }
	   document.getElementById('EbarTabVieport').setAttribute('class','x-panel x-fullscreen x-landscape');
			var backBtn = this.application.viewport.query('#backBtn')[0];
			backBtn.show();
			  var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
			NavigationBtn.hide();	
			backBtn.setHandler(function()
			{
					Ext.dispatch({
									controller: 'EbarTab',
									action: 'MentioneBarTab',
									data:'back',
									historyUrl: 'EbarTab/MentioneBarTab',
									animation: {
										type: 'slide',
										 direction:'right'
									},
								});
			});
			var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
			UploadreceiptBtn.hide();
			this.application.viewport.setActiveItem(this.MentioneBarTabDescriptionpage, options.animation);
			//Ext.getCmp('EbarTabToolBar').setTitle(options.data.data.Name);
			Ext.getCmp('EbarTabToolBar').setTitle('Item Description');
			setUserMentioneBarTabData(options.data);
			this.application.viewport.doLayout();
	   }
    },
	EventInvetion: function(options)
    {
	  if(fnmcheckUser()){
		   if(!this.EventInvetionpage){
				this.EventInvetionpage = this.render({
					xtype: 'EventInvetionform',
				});
		   }
		if(document.getElementById('VoucherDescriptionView')){
			  document.getElementById('VoucherDescriptionView').setAttribute('class','x-hidden-display');
	   }
	   document.getElementById('EbarTabVieport').setAttribute('class','x-panel x-fullscreen x-landscape');
			var backBtn = this.application.viewport.query('#backBtn')[0];
			backBtn.show();
			  var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
			NavigationBtn.hide();	
			backBtn.setHandler(function()
			{
					Ext.dispatch({
									controller: 'EbarTab',
									action: 'EventGuestlists',
									//historyUrl: 'EbarTab/EventGuestlists',
									animation: {
										type: 'slide',
										 direction:'right'
									},
								});
			});
			var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
			UploadreceiptBtn.hide();
			this.application.viewport.setActiveItem(this.EventInvetionpage, options.animation);
			//Ext.getCmp('EbarTabToolBar').setTitle(options.data.data.Name);
			Ext.getCmp('EbarTabToolBar').setTitle('Event Description');	
			if(options.data){
			setUserInvetaionData(options.data);
			}
			this.application.viewport.doLayout();
	  }
    },
	EventInvetdFriend: function(options)
    {
      	if(fnmcheckUser()){		
		   if(!this.InviatedFriendListpage){
				this.InviatedFriendListpage = this.render({
					xtype: 'InviatedFriendListform',
				});
		   }
		if(document.getElementById('VoucherDescriptionView')){
			  document.getElementById('VoucherDescriptionView').setAttribute('class','x-hidden-display');
	   }
	   document.getElementById('EbarTabVieport').setAttribute('class','x-panel x-fullscreen x-landscape');
			var backBtn = this.application.viewport.query('#backBtn')[0];
			backBtn.show();
			  var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
			NavigationBtn.hide();	
			var action='';
			
			if(options.data=='UpcomingEvent'){
				action='UpcomingEventDescription'; 
				if(document.getElementById('UpCommingEventId').value!=''){ 
				SetEventInvetedStor(document.getElementById('UpCommingEventId').value);
				}
				
			}
			else{if(document.getElementById('GuesstEventId').value!=''){ action='EventInvetion';	SetEventInvetedStor(document.getElementById('GuesstEventId').value);}}
			backBtn.setHandler(function()
			{
					Ext.dispatch({
									controller: 'EbarTab',
									action: action,
									data:{pageback:BackpageName},
										animation: {
										type: 'slide',
										 direction:'right'
									},
								});
			});
			var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
			UploadreceiptBtn.hide();
		  var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
			NavigationBtn.hide();	
			this.application.viewport.setActiveItem(this.InviatedFriendListpage, options.animation);
			this.application.viewport.doLayout();
			Ext.getCmp('EbarTabToolBar').setTitle('Invited Friends');
		}
    },
	YourFriendInvation: function(options)
    {
		
	  	if(fnmcheckUser()){
		   if(!this.NonInviatedFriendlis){
				this.NonInviatedFriendlis = this.render({
					xtype: 'NonInviatedFriendlistform',
				});
		   }
		   
		  
		if(document.getElementById('VoucherDescriptionView')){
			  document.getElementById('VoucherDescriptionView').setAttribute('class','x-hidden-display');
	   }
	   document.getElementById('EbarTabVieport').setAttribute('class','x-panel x-fullscreen x-landscape');
			var backBtn = this.application.viewport.query('#backBtn')[0];
			backBtn.show();
			backBtn.setHandler(function()
			{
					Ext.dispatch({
									controller: 'EbarTab',
									action: 'EventInvetion',
									animation: {
										type: 'slide',
										 direction:'right'
									},
								});
			});
			var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
			UploadreceiptBtn.hide();
			  var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
			NavigationBtn.hide();
				this.application.viewport.setActiveItem(this.NonInviatedFriendlis, options.animation);
	if(document.getElementById('GuesstEventId').value!=''){				      SetEventNonInvetedStor(document.getElementById('GuesstEventId').value);
	}
			Ext.getCmp('EbarTabToolBar').setTitle('Invite Friends');
			//Ext.getCmp('ViewListNonInviatedFriend').doComponentLayout();
			this.application.viewport.doComponentLayout();
			//this.application.viewport.doLayout();
		}
    },
	ClubSearch:function(){
		
	  if(fnmcheckUser()){
			if(!this.searchView2)
			{
				this.searchView2=this.render({
					xtype:'SearchIndex'
				});
			}
			
		 	this.searchView2.show({
				type:'slide',
				direction:'up',
				duration:500
			});
		 	
			  var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
			NavigationBtn.hide();	
	   }
	},
	UserGestSearch:function(){
		  if(fnmcheckUser()){
			  
				if(!this.searchView3)
				{
					this.searchView3=this.render({
						xtype:'SearchUserGestIndexView'
					});
				}
				
			 	this.searchView3.show({
					type:'slide',
					direction:'up',
					duration:500
				});
				  var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
				NavigationBtn.hide();	
		   }
		},
	Inbox:function(options){
		 profile='';
	 	if(fnmcheckUser()){
		 if(!this.UserInbox){
				this.UserInbox = this.render({
					xtype: 'UserInbox',
				});
					fngetAllMember();
		   }
		if(document.getElementById('VoucherDescriptionView')){
			  document.getElementById('VoucherDescriptionView').setAttribute('class','x-hidden-display');
	   }
	   document.getElementById('EbarTabVieport').setAttribute('class','x-panel x-fullscreen x-landscape');
		   if(Ext.is.Phone){
				var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
				NavigationBtn.show();
					var backBtn = this.application.viewport.query('#backBtn')[0];
			backBtn.hide();	
			  }else{
			  var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
			NavigationBtn.hide(); 
			var backBtn = this.application.viewport.query('#backBtn')[0];
			backBtn.show();	  
			}
			backBtn.setHandler(function()
			{
					Ext.dispatch({
									controller: 'EbarTab',
									action: 'EbarTabHome',
									historyUrl: 'EbarTab/EbarTabHome',
									animation: {
										type: 'slide',
										 direction:'right'
									},
								});
			});
			var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
			UploadreceiptBtn.hide();
			if(!options.data){fngetUserInbox(); }
			Ext.getCmp('EbarTabToolBar').setTitle('Inbox');
			this.application.viewport.setActiveItem(this.UserInbox);
			 Ext.getCmp('SubMenuInbox').addCls('class','x-tab-active');
			 Ext.getCmp('SubMenuComposeMailInPage').removeCls('class','x-tab-active');
	
			this.application.viewport.doLayout();
		}
	},
	Outbox:function(options){
		 profile='';
		if(fnmcheckUser()){
		 if(!this.UserOutBox){
				this.UserOutBox = this.render({
					xtype: 'UserOutBox',
				});
		   }
		if(document.getElementById('VoucherDescriptionView')){
			  document.getElementById('VoucherDescriptionView').setAttribute('class','x-hidden-display');
	   }
	   document.getElementById('EbarTabVieport').setAttribute('class','x-panel x-fullscreen x-landscape');
			if(Ext.is.Phone){
				var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
				NavigationBtn.show();
					var backBtn = this.application.viewport.query('#backBtn')[0];
			backBtn.hide();	
			  }else{
			  var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
			NavigationBtn.hide(); 
			var backBtn = this.application.viewport.query('#backBtn')[0];
			backBtn.show();	  
			}
			backBtn.setHandler(function()
			{
					Ext.dispatch({
									controller: 'EbarTab',
									action: 'EbarTabHome',
									historyUrl: 'EbarTab/EbarTabHome',
									animation: {
										type: 'slide',
										 direction:'right'
									},
								});
			});
			var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
			UploadreceiptBtn.hide();
			if(!options.data){fngetUserOutBox(); }
			Ext.getCmp('EbarTabToolBar').setTitle('Outbox');
			this.application.viewport.setActiveItem(this.UserOutBox);
			 Ext.getCmp('SubMenuOutbox').addCls('class','x-tab-active');
			this.application.viewport.doLayout();
		}
	},
	Trash:function(){
		 profile='';
		if(fnmcheckUser()){
			 if(!this.UserTrash){
					this.UserTrash = this.render({
						xtype: 'UserTrash',
					});
			   }
			if(document.getElementById('VoucherDescriptionView')){
				  document.getElementById('VoucherDescriptionView').setAttribute('class','x-hidden-display');
		   }
		   document.getElementById('EbarTabVieport').setAttribute('class','x-panel x-fullscreen x-landscape');
			 if(Ext.is.Phone){
					var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
					NavigationBtn.show();
						var backBtn = this.application.viewport.query('#backBtn')[0];
				backBtn.hide();	
				  }else{
				  var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
				NavigationBtn.hide(); 
				var backBtn = this.application.viewport.query('#backBtn')[0];
				backBtn.show();	  
				}
				backBtn.setHandler(function()
				{
						Ext.dispatch({
										controller: 'EbarTab',
										action: 'EbarTabHome',
										historyUrl: 'EbarTab/EbarTabHome',
										animation: {
											type: 'slide',
											 direction:'right'
										},
									});
				});
				var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
				UploadreceiptBtn.hide();
				fngetUserTrash();
				Ext.getCmp('EbarTabToolBar').setTitle('Trash');
				this.application.viewport.setActiveItem(this.UserTrash);
				 Ext.getCmp('SubMenuTrash').addCls('class','x-tab-active');
				this.application.viewport.doLayout();
		}
	},
	EmailDescription: function(options)
    {
	  	if(fnmcheckUser()){
		   if(!this.EmailDescriptionpage){
				this.EmailDescriptionpage = this.render({
					xtype: 'EmailDescriptionform',
				});
		   }
		if(document.getElementById('VoucherDescriptionView')){
			  document.getElementById('VoucherDescriptionView').setAttribute('class','x-hidden-display');
	   }
	   document.getElementById('EbarTabVieport').setAttribute('class','x-panel x-fullscreen x-landscape');
		 var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
			NavigationBtn.hide();	
			var backBtn = this.application.viewport.query('#backBtn')[0];
			backBtn.show();
			if(options.data[1].page=='Inbox'){
				var action='Inbox';
			}else{
				var action='Outbox';
			}
			backBtn.setHandler(function()
			{
					Ext.dispatch({
									controller: 'EbarTab',
									action: action,
									data:'back',
									historyUrl: 'EbarTab/'+action,
									animation: {
										type: 'slide',
										 direction:'right'
									},
								});
			});
			var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
			UploadreceiptBtn.hide();
			this.application.viewport.setActiveItem(this.EmailDescriptionpage, options.animation);
			this.application.viewport.doLayout();
			if(!options.data[0].Bask){
				Ext.getCmp('EbarTabToolBar').setTitle(options.data[0].record.data.UserName+","+options.data[0].record.data.MailDate);
				setEmailFullDesc(options.data[0].record,options.data[1].page);
			}
		}
	   },
	   ComposeMail:function(options){
		   profile='';
		   	fngetAllMember();
		   	if(fnmcheckUser()){
			 if(!this.userComposeMail){
					this.userComposeMail = this.render({
						xtype: 'ComposeMailform',
					});
			   }
			if(document.getElementById('VoucherDescriptionView')){
				  document.getElementById('VoucherDescriptionView').setAttribute('class','x-hidden-display');
		   }
		   document.getElementById('EbarTabVieport').setAttribute('class','x-panel x-fullscreen x-landscape');
			   if(Ext.is.Phone){
					var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
					NavigationBtn.show();
					var backBtn = this.application.viewport.query('#backBtn')[0];
				backBtn.hide();	
				  }else{
				  var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
				NavigationBtn.hide(); 
				var backBtn = this.application.viewport.query('#backBtn')[0];
				backBtn.show();	  
				}
				var Action ='EbarTabHome'
				var page='';
				if(options.data){
					 Action='EmailDescription';page=options.data[0].BackPage;fnsetEmailReplay(options.data[0].EmailId,options.data[0].BackPage);
				}else{ Ext.getCmp('EbarTabToolBar').setTitle('Compose Mail');
					Ext.getCmp('txtUserNAme').setValue('');
					Ext.getCmp('txtUserSubject').setValue('');
					Ext.getCmp('txtUserId').setValue('');}
					Ext.getCmp('SubMenuInbox').removeCls('class','x-tab-active');
					Ext.getCmp('SubMenuComposeMailInPage').addCls('class','x-tab-active');
				this.application.viewport.doLayout();
			}
				backBtn.setHandler(function()
				{
						Ext.dispatch({
										controller: 'EbarTab',
										action: Action,
										historyUrl: 'EbarTab/'+Action,
										data:[{Bask:'NOCHANG'},{page:page}],
										animation: {
											type: 'slide',
											 direction:'right'
										},
									});
				});
				var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
				UploadreceiptBtn.hide();
				this.application.viewport.setActiveItem(this.userComposeMail); Ext.getCmp('SubMenuComposeMail').addCls('class','x-tab-active');

			
	},
	Rewards:function(){
		 profile='';
	   if(fnmcheckUser()){
		if(!this.RewardsView)
		{
			this.RewardsView=this.render({
				xtype:'RewardsForm'
			});
		}
		var backBtn = this.application.viewport.query('#backBtn')[0];
        backBtn.hide();	
		  if(Ext.is.Phone){
			var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
			NavigationBtn.show();
		  }else{
		  var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
        NavigationBtn.hide(); 
		}
		 if(document.getElementById('VoucherDescriptionView')){
		  document.getElementById('VoucherDescriptionView').setAttribute('class','x-hidden-display');
   }
			var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
        UploadreceiptBtn.hide();
		 Ext.getCmp('EbarTabToolBar').setTitle('Rewards');
		 Ext.getCmp('MainMenuRewards').addCls('class','x-tab-active');
		this.application.viewport.setActiveItem(this.RewardsView);
		this.application.viewport.doLayout();
	   }
	},
	ClubAddresh:function(options){
				if(navigator.geolocation){
                 navigator.geolocation.watchPosition(geolocationSuccess);
			 }
		if(fnclubOpen(this)){
			var cp= document.getElementById('ClubAddreshView').parentNode.parentNode.id;
			if(cp=='EbarTabVieport'){
			document.getElementById('ClubAddreshView').style.top='0px';	
			}else{
			document.getElementById('ClubAddreshView').style.top='40px';	
			}
				 var data = options.data;
			 var options = { frequency: 3000 };
		
				 ClubLocationMap = new google.maps.LatLng(data[0].latitude, data[0].longitude);
			setTimeout(function(){
				Ext.getCmp('ClubAddreshView').addMap(data);
				if(!data[1].pageNotShow){
					document.getElementById("routeclub").innerHTML='';
					Ext.getCmp('ClubRoute').hide();
				 Ext.getCmp('Map').addCls('class','x-tab-active');
				 Ext.getCmp('Route').removeCls('class','x-tab-active');
				  Ext.getCmp('ClubMap').show();
				}
				  if(userLatitude==data[0].latitude && data[0].longitude==userLongitude){fnuserInclub(data[0].ClubId); }
				  },1000);
			  
				setTimeout(function(){
					alert(Ext.getCmp(this.ClubAddreshView.id).isHidden());
									if(!Ext.getCmp(this.ClubAddreshView.id).isHidden()){ 
						  Ext.dispatch({
							controller: 'EbarTab',action: 'ClubAddresh',
							data:[{latitude:data[0].latitude,longitude:data[0].longitude,ClubId:data[0].ClubId},{page:'Back',pageNotShow:'ok'}],
							animation: {type: 'slide',direction: 'left'},
                 	});}
		    	 },10000);
				
				
		}
	},
	
	WhatIsEbarTab:function(options){
		//alert('WhatIsEbarTab options');
		if(!this.WhatIsEbarTabForm)
		{
			this.WhatIsEbarTabForm=this.render({
				xtype:'WhatIsEbarTabForm'
			});
		} 
		fnGetPageContentData(13);
			var backBtn = this.application.viewport.query('#backBtn')[0];
				backBtn.show();	 
			var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
        NavigationBtn.hide();
		var EbarTabMainMenu = this.application.viewport.query('#EbarTabMainMenu')[0];
        EbarTabMainMenu.hide();
		var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
        UploadreceiptBtn.hide();
				Ext.getCmp('EbarTabToolBar').show();
				backBtn.setHandler(function()
				{
						Ext.dispatch({
										controller: 'EbarTab',
										action: 'index',
										historyUrl: 'EbarTab/index',
										animation: {
											type: 'slide',
											 direction:'right'
										},
									});

				});

		 Ext.getCmp('EbarTabToolBar').setTitle('What is E-barTab');
		 this.application.viewport.setActiveItem(this.WhatIsEbarTabForm, options.animation);
		 this.application.viewport.doComponentLayout();
	},
	HowToUploadReceipts:function(options){
		//alert('WhatIsEbarTab options');
		if(!this.HowToUploadReceiptsForm)
		{
			this.HowToUploadReceiptsForm=this.render({
				xtype:'HowToUploadReceiptsForm'
			});
			
		} 
			
			 Ext.getCmp('HowToUploadReceiptsPage').doComponentLayout();
		fnGetPageContentData(49);
			var backBtn = this.application.viewport.query('#backBtn')[0];
				backBtn.show();	 
				var EbarTabMainMenu = this.application.viewport.query('#EbarTabMainMenu')[0];
        EbarTabMainMenu.hide();
			var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
        NavigationBtn.hide();
		var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
        UploadreceiptBtn.hide();
				Ext.getCmp('EbarTabToolBar').show();
				backBtn.setHandler(function()
				{
						Ext.dispatch({
										controller: 'EbarTab',
										action: 'index',
										historyUrl: 'EbarTab/index',
										animation: {
											type: 'slide',
											 direction:'right'
										},
									});

				});

		 Ext.getCmp('EbarTabToolBar').setTitle('How To Upload Receipts');
		 this.application.viewport.setActiveItem(this.HowToUploadReceiptsForm, options.animation);
		 this.application.viewport.doComponentLayout();
	},
	Register:function(options){
			if(!this.RegisterView)
		{
			this.RegisterView=this.render({
				xtype:'Registerform'
			});
		} fnCountryList();
			var backBtn = this.application.viewport.query('#backBtn')[0];
				backBtn.show();	 
			var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
        NavigationBtn.hide();
		var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
        UploadreceiptBtn.hide();
		var EbarTabMainMenu = this.application.viewport.query('#EbarTabMainMenu')[0];
        EbarTabMainMenu.hide();
				Ext.getCmp('EbarTabToolBar').show();
				backBtn.setHandler(function()
				{
						Ext.dispatch({
										controller: 'EbarTab',
										action: 'index',
										historyUrl: 'EbarTab/index',
										animation: {
											type: 'slide',
											 direction:'right'
										},
									});

				});

				 Ext.getCmp('EbarTabToolBar').setTitle('Register Form');				 
				 //Ext.getCmp('StateTex').hide();
				 fngetState();
			//mapdemo.mapOptions.center=new google.maps.LatLng(options.data.latitude,options.data.longitude);
				this.application.viewport.setActiveItem(this.RegisterView, options.animation);
					this.application.viewport.doLayout();
		},
	PhotoShare:function(options){
		if(!this.PhotoShareView)
		{
			this.PhotoShareView=this.render({
				xtype:'PhotoShareform'
			});
		}
			var backBtn = this.application.viewport.query('#backBtn')[0];
				backBtn.show();	 
		var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
        NavigationBtn.hide();
		var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
        UploadreceiptBtn.hide();
		searchMembar=0;
		Ext.getCmp('EbarTabToolBar').setTitle('Photo Share');
		Ext.getCmp('EbarTabMainMenu').hide();
		Ext.getCmp('EbarTabToolBar').show();
				backBtn.setHandler(function()
				{
						Ext.dispatch({
										controller: 'EbarTab',
										action: 'UploadImg',
                                        data:{"back":"share"},
										animation: {
											type: 'slide',
											 direction:'right'
										},
									});

				});
				
		this.application.viewport.setActiveItem(this.PhotoShareView, options.animation);
		this.application.viewport.doLayout();
		if(posi==0){
			var Obj=document.getElementById('PhotoShareView');
			var Pr=Obj.parentNode;
			var str=document.getElementById(Pr.id).style.height;
			var hei=str.substring(0,str.length-2);
			document.getElementById(Pr.id).style.height=(parseInt(hei)+50)+"px";
			var str=Obj.style.height;
			var hei=str.substring(0,str.length-2);
			Obj.style.height=(parseInt(hei)+50)+"px";
			var Obj=document.getElementById('ShareBarTab');
			var str=Obj.style.top;
			var hei=str.substring(0,str.length-2);
			Obj.style.top=(parseInt(hei)+50)+"px";
                  posi=1;
		}
					
	},
	SiteMamber:function(options){
		fngetAllMember();
		if(!this.CountactsView)
		{
			this.CountactsView=this.render({
				xtype:'Countactsform'
			});
		}
			var backBtn = this.application.viewport.query('#backBtn')[0];
				backBtn.hide();	
			/*	var FullSiteBtn = this.application.viewport.query('#FullSiteBtn')[0];
				FullSiteBtn.hide();	*/ 
		var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
        NavigationBtn.hide();
		var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
        UploadreceiptBtn.hide();
		MoreCount=1;
		searchMembar=1;
		fnloadSiteMembar();
		Ext.getCmp('txtSearchCountactMembar').setValue('');
		Ext.getCmp('EbarTabToolBar').setTitle('Site Member');
		Ext.getCmp('EbarTabMainMenu').hide();
		Ext.getCmp('EbarTabToolBar').show();
		this.application.viewport.setActiveItem(this.CountactsView, options.animation);
					this.application.viewport.doLayout();
	},
	Countacts:function(options){
		if(!this.CountactsView)
		{
			this.CountactsView=this.render({
				xtype:'Countactsform'
			});
		}
			var backBtn = this.application.viewport.query('#backBtn')[0];
				backBtn.hide();	 
				/*var FullSiteBtn = this.application.viewport.query('#FullSiteBtn')[0];
				FullSiteBtn.hide();	 */
		var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
        NavigationBtn.hide();
		var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
        UploadreceiptBtn.hide();
		searchMembar=0;
		Ext.getCmp('txtSearchCountactMembar').setValue('');
		fnloadCountact();
		Ext.getCmp('EbarTabToolBar').setTitle('Contacts');
		Ext.getCmp('EbarTabMainMenu').hide();
		Ext.getCmp('EbarTabToolBar').show();
		this.application.viewport.setActiveItem(this.CountactsView, options.animation);
		this.application.viewport.doLayout();
	},
	searchSiteMembar:function(){
	  if(fnmcheckUser()){
				if(!this.SearchMembarView)
				{
					this.SearchMembarView=this.render({
						xtype:'SearchMembarView'
					});
				}
			 	this.SearchMembarView.show({
					type:'slide',
					direction:'up',
					duration:500
				});
			  var ch=document.getElementById('SearchMembarIndex').childNodes[1];
			   document.getElementById(ch.id).style.display="none";
			   document.getElementById('SearchMembarIndex').style.height="50px";
		   }
	},
	Membar_This_Week:function(options){
		
		 profile='';
		 setTheWeekPage(this);
		 fngetMembarTheWeekstore();
		Ext.getCmp('EbarTabToolBar').setTitle('Member Of The Week');
		Ext.getCmp('MembarTheWeekView').show();
		Ext.getCmp('ClubTheWeekView').hide();
		Ext.getCmp('EventTheWeekView').hide();
		 Ext.getCmp('MembarTheWeekOptionsub').addCls('class','x-tab-active');
		Ext.getCmp('clubTheWeekOptionsub').removeCls('class','x-tab-active');
		 Ext.getCmp('EventTheWeekOptionsub').removeCls('class','x-tab-active');
	},
	Club_This_Week:function(options){
		 setTheWeekPage(this);
		 fngetClubTheWeekstore();
		Ext.getCmp('EbarTabToolBar').setTitle('Club Of The Week');
		 Ext.getCmp('clubTheWeekOptionsub').addCls('class','x-tab-active');
		 Ext.getCmp('ClubTheWeekView').show();
		Ext.getCmp('MembarTheWeekView').hide();
		Ext.getCmp('EventTheWeekView').hide();
		 Ext.getCmp('MembarTheWeekOptionsub').removeCls('class','x-tab-active');
		  Ext.getCmp('EventTheWeekOptionsub').removeCls('class','x-tab-active');
	},
	Event_This_Week:function(options){
		 setTheWeekPage(this);
		 fngetEventTheWeekstore();
		Ext.getCmp('EbarTabToolBar').setTitle('Event Of The Week');
		 Ext.getCmp('EventTheWeekOptionsub').addCls('class','x-tab-active');
		 Ext.getCmp('EventTheWeekView').show();
		Ext.getCmp('ClubTheWeekView').hide();
		Ext.getCmp('MembarTheWeekView').hide();
		Ext.getCmp('MembarTheWeekOptionsub').removeCls('class','x-tab-active');
		 Ext.getCmp('clubTheWeekOptionsub').removeCls('class','x-tab-active');
	},
	Global_Brag_on_your_tab:function(options){
		 setBragTabPage(this);
		  Ext.getCmp('BragtabPageView').setActiveItem(1);
		   setBragTabPage(this);
		  Ext.getCmp('BragtabPageView').setActiveItem(2);
		   setBragTabPage(this);
		  Ext.getCmp('BragtabPageView').setActiveItem(3);
	 	 setBragTabPage(this);
		  fngetBragTab('Global');
		Ext.getCmp('EbarTabToolBar').setTitle('Global');
		 Ext.getCmp('GlobalBragTabOptionsub').addCls('class','x-tab-active');
		 Ext.getCmp('BragtabPageView').setActiveItem(0);
		Ext.getCmp('CityBragOptionsub').removeCls('class','x-tab-active');
		Ext.getCmp('ClubBragOptionsub').removeCls('class','x-tab-active');
		Ext.getCmp('FeaturedPromoterOptionsub').removeCls('class','x-tab-active');
		Ext.getCmp('FeaturedPromoterOptionsub').removeCls('class','x-tab-active');
	},
	City_Brag_on_your_tab:function(options){
		 setBragTabPage(this);
		  Ext.getCmp('BragtabPageView').setActiveItem(0);
		   setBragTabPage(this);
		  Ext.getCmp('BragtabPageView').setActiveItem(2);
		   setBragTabPage(this);
		  Ext.getCmp('BragtabPageView').setActiveItem(3);
	 	 setBragTabPage(this);
		  fngetBragTab('City');
		  fngetselectcityData();
		Ext.getCmp('EbarTabToolBar').setTitle('City');
		 Ext.getCmp('CityBragOptionsub').addCls('class','x-tab-active');
		 Ext.getCmp('BragtabPageView').setActiveItem(1);
		Ext.getCmp('GlobalBragTabOptionsub').removeCls('class','x-tab-active');
		Ext.getCmp('ClubBragOptionsub').removeCls('class','x-tab-active');
		Ext.getCmp('StateBragOptionsub').removeCls('class','x-tab-active');
	},
	Club_Brag_on_your_tab:function(options){
		 setBragTabPage(this);
		  Ext.getCmp('BragtabPageView').setActiveItem(0);
		   setBragTabPage(this);
		  Ext.getCmp('BragtabPageView').setActiveItem(1);
		   setBragTabPage(this);
		  Ext.getCmp('BragtabPageView').setActiveItem(3);
	 	 setBragTabPage(this); 
		 fngetBragTab('Club');
		  fngetselectclubData();
		Ext.getCmp('EbarTabToolBar').setTitle('Club');
		 Ext.getCmp('ClubBragOptionsub').addCls('class','x-tab-active');
	 Ext.getCmp('BragtabPageView').setActiveItem(2);
		Ext.getCmp('CityBragOptionsub').removeCls('class','x-tab-active');
		Ext.getCmp('GlobalBragTabOptionsub').removeCls('class','x-tab-active');
		Ext.getCmp('StateBragOptionsub').removeCls('class','x-tab-active');
	},
	State_Brag_on_your_tab:function(options){
		 setBragTabPage(this);
		  Ext.getCmp('BragtabPageView').setActiveItem(0);
		   setBragTabPage(this);
		  Ext.getCmp('BragtabPageView').setActiveItem(1);
		   setBragTabPage(this);
		  Ext.getCmp('BragtabPageView').setActiveItem(2);
	 	 setBragTabPage(this); 
		  fngetBragTab('State');
		Ext.getCmp('EbarTabToolBar').setTitle('State');
		 Ext.getCmp('StateBragOptionsub').addCls('class','x-tab-active');
		 Ext.getCmp('BragtabPageView').setActiveItem(3);
		Ext.getCmp('CityBragOptionsub').removeCls('class','x-tab-active');
		Ext.getCmp('GlobalBragTabOptionsub').removeCls('class','x-tab-active');
		Ext.getCmp('ClubBragOptionsub').removeCls('class','x-tab-active');
	},
	Current_Promoter:function(options){
	 setPromoterPage(this); 
	 if(document.getElementById('CurrentPromoterHTML').innerHTML==''){	 fngetCurrentPromoter(); }
		Ext.getCmp('EbarTabToolBar').setTitle('Current Promotion');
		 Ext.getCmp('CurrentPromoterOptionsub').addCls('class','x-tab-active');
		 Ext.getCmp('CurrentPromoterView').show();
		Ext.getCmp('FeaturedPromoterView').hide();
		Ext.getCmp('FeaturedPromoterOptionsub').removeCls('class','x-tab-active');
	},
	Featured_Promoter:function(options){
	 setPromoterPage(this);
	 fngetFeaturedPromoter();
		Ext.getCmp('EbarTabToolBar').setTitle('Featured Promoter');
		 Ext.getCmp('FeaturedPromoterOptionsub').addCls('class','x-tab-active');
		 Ext.getCmp('FeaturedPromoterView').show();
		Ext.getCmp('CurrentPromoterView').hide();
		Ext.getCmp('CurrentPromoterOptionsub').removeCls('class','x-tab-active');
	},
	PromoterstoreDesc:function(options){
		if(fnmcheckUser()){
		 if(!this.ProDescription){
				this.ProDescription = this.render({
					xtype: 'ProDescriptionform',
				});
		   }
		if(document.getElementById('VoucherDescriptionView')){
			  document.getElementById('VoucherDescriptionView').setAttribute('class','x-hidden-display');
	   }
	   document.getElementById('EbarTabVieport').setAttribute('class','x-panel x-fullscreen x-landscape');
			var backBtn = this.application.viewport.query('#backBtn')[0];
			backBtn.show();	  
			var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
			NavigationBtn.hide(); 
			backBtn.setHandler(function()
			{
					Ext.dispatch({
									controller: 'EbarTab',
									action: 'Featured_Promoter',
									animation: {
										type: 'slide',
										 direction:'right'
									},
								});
			});
			document.getElementById('proTitleName').innerHTML=options.data.data.Title;
			document.getElementById('proDescription').innerHTML=options.data.data.Description;
			document.getElementById('ProSiteURL').innerHTML=options.data.data.SiteURL;
			document.getElementById('a_SiteURl').href="http://"+options.data.data.SiteURL;
			document.getElementById('PromoterImg').src=SreverURL+'Gallery/'+options.data.data.ImageFile;
			var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
			UploadreceiptBtn.hide();
			Ext.getCmp('EbarTabToolBar').setTitle('Promoter Description');
			this.application.viewport.setActiveItem(this.ProDescription);
			this.application.viewport.doLayout();
		}
	},
	Where_is_the_Case:function(options){
	 	if(fnmcheckUser()){
		 if(!this.theCase){
				this.theCase = this.render({
					xtype: 'WhereIsTheCase',
				});
		   }
		if(document.getElementById('VoucherDescriptionView')){
			  document.getElementById('VoucherDescriptionView').setAttribute('class','x-hidden-display');
	   }
	   document.getElementById('EbarTabVieport').setAttribute('class','x-panel x-fullscreen x-landscape');
			var backBtn = this.application.viewport.query('#backBtn')[0];
			backBtn.show();	  
			var NavigationBtn = this.application.viewport.query('#NavigationBtn')[0];
			NavigationBtn.hide(); 
			backBtn.setHandler(function()
			{
					Ext.dispatch({
									controller: 'EbarTab',
									action: 'EbarTabHome',
									historyUrl: 'EbarTab/EbarTabHome',
									animation: {
										type: 'slide',
										 direction:'right'
									},
								});
			});
			var UploadreceiptBtn = this.application.viewport.query('#UploadreceiptBtn')[0];
			UploadreceiptBtn.hide();
			fngetWhatIsTheCase();
			Ext.getCmp('EbarTabToolBar').setTitle('Where is the Case');
			this.application.viewport.setActiveItem(this.theCase);
			this.application.viewport.doLayout();
		}
	},
});
function setTheWeekPage(obj){
		 	if(fnmcheckUser()){
		 if(!obj.TheWeek){
				obj.TheWeek = obj.render({
					xtype: 'TheWeekPage',
				});
		   }
		if(document.getElementById('VoucherDescriptionView')){
			  document.getElementById('VoucherDescriptionView').setAttribute('class','x-hidden-display');
	   }
	   document.getElementById('EbarTabVieport').setAttribute('class','x-panel x-fullscreen x-landscape');
			var backBtn = obj.application.viewport.query('#backBtn')[0];
			backBtn.show();	  
			var NavigationBtn = obj.application.viewport.query('#NavigationBtn')[0];
			NavigationBtn.hide(); 
			backBtn.setHandler(function()
			{
					Ext.dispatch({
									controller: 'EbarTab',
									action: 'EbarTabHome',
									historyUrl: 'EbarTab/EbarTabHome',
									animation: {
										type: 'slide',
										 direction:'right'
									},
								});
			});
			
			var UploadreceiptBtn = obj.application.viewport.query('#UploadreceiptBtn')[0];
			UploadreceiptBtn.hide();
			obj.application.viewport.setActiveItem(obj.TheWeek);obj.application.viewport.doLayout();
	}
}
function setPromoterPage(obj){
		if(fnmcheckUser()){
		 if(!obj.Promoter){
				obj.Promoter = obj.render({
					xtype: 'PromoterPage',
				});
		   }
		if(document.getElementById('VoucherDescriptionView')){
			  document.getElementById('VoucherDescriptionView').setAttribute('class','x-hidden-display');
	   }
	   document.getElementById('EbarTabVieport').setAttribute('class','x-panel x-fullscreen x-landscape');
			var backBtn = obj.application.viewport.query('#backBtn')[0];
			backBtn.show();	  
			var NavigationBtn = obj.application.viewport.query('#NavigationBtn')[0];
			NavigationBtn.hide(); 
			backBtn.setHandler(function()
			{
					Ext.dispatch({
									controller: 'EbarTab',
									action: 'EbarTabHome',
									historyUrl: 'EbarTab/EbarTabHome',
									animation: {
										type: 'slide',
										 direction:'right'
									},
								});
			});
			var UploadreceiptBtn = obj.application.viewport.query('#UploadreceiptBtn')[0];
			UploadreceiptBtn.hide();
			obj.application.viewport.setActiveItem(obj.Promoter);
			obj.application.viewport.doLayout();
		}
}
function setBragTabPage(obj){
	if(fnmcheckUser()){
		 if(!obj.BragTab){
				obj.BragTab = obj.render({
					xtype: 'BragtabPage',
				});
		   }
		if(document.getElementById('VoucherDescriptionView')){
			  document.getElementById('VoucherDescriptionView').setAttribute('class','x-hidden-display');
	   }
	   document.getElementById('EbarTabVieport').setAttribute('class','x-panel x-fullscreen x-landscape');
			var backBtn = obj.application.viewport.query('#backBtn')[0];
			backBtn.show();	  
			var NavigationBtn = obj.application.viewport.query('#NavigationBtn')[0];
			NavigationBtn.hide(); 
			backBtn.setHandler(function()
			{
					Ext.dispatch({
									controller: 'EbarTab',
									action: 'EbarTabHome',
									historyUrl: 'EbarTab/EbarTabHome',
									animation: {
										type: 'slide',
										 direction:'right'
									},
								});
			});
			var UploadreceiptBtn = obj.application.viewport.query('#UploadreceiptBtn')[0];
			UploadreceiptBtn.hide();
			obj.application.viewport.setActiveItem(obj.BragTab);
			obj.application.viewport.doLayout();
		}
}
function fnclubOpen(obj){	
 if(fnmcheckUser()){
		if(!obj.ClubAddreshView)
		{
			obj.ClubAddreshView=obj.render({
				xtype:'ClubAddreshform'
			});
		}
	//	Ext.getCmp('ClubAddreshView').removeCls('class','x-hidden-display');
	//	Ext.getCmp('ClubAddreshView').addCls('class',' x-panel black_gray x-fullscreen x-landscape x-fit-item');
			var backBtn = obj.application.viewport.query('#backBtn')[0];
				backBtn.show();	 
				backBtn.setHandler(function()
				{
						Ext.dispatch({
										controller: 'EbarTab',
										action: 'ClubDescription',
										data:{Bask:'NOCHANG'},
										animation: {
											type: 'slide',
											 direction:'right'
										},
						});
				//	Ext.getCmp('ClubAddreshView').addCls('class','  x-hidden-display');
			});
				
		  Ext.getCmp('EbarTabToolBar').setTitle('Club Location');
				obj.application.viewport.setActiveItem(obj.ClubAddreshView);
				return true;
		}	
}


Ext.Router.draw(function(map) {
    map.connect(':controller/:action');
});

// JavaScript Document
var FeaturedRewardsbar = new Ext.TabBar({
    dock : 'top',
	activeItem:1,
	 hidden: Ext.is.Phone ? true : false,
	scroll:'horizontal',
	id:'EbarTabRewardSubMenu',
    ui   : 'dark',
	layout: {
						pack : 'center',
	},
    items: [
        {
            text: 'Featured Rewards',
			id:'SubMenuFeaturedRewards',
			handler:function(){fnpageSubMenuNav(9);}
        },
        {
            text: 'Mention e-BarTab',
			handler:function(){fnpageSubMenuNav(10);}
        },{
            text: 'Be The First',
			handler:function(){fnpageSubMenuNav(11);}
		}
    ]
});
App.views.FeaturedRewardspage = Ext.extend(Ext.Panel,{
	sortable  : true,
	  scroll:true,
	id:'FeaturedRewardspageView',layout:'fit',
	style:'padding:0px',
	dockedItems: [FeaturedRewardsbar],
	cls:'black_gray',
items:[{
	   xtype:'list',
	    store: FeaturedRewardstore,
		emptyText :'No Data Found',
		itemTpl:['<tpl for=".">',
                 '<table style="width: 100%;">',
					'<tr >',
					'<td class="img" style="width: 70px;"><img width="60px" height="60px"  onerror="fnItemNoImage(this)"  src="'+SreverURL+'Gallery/{ImageFile}"  alt=""/></td>',
					'<td style="text-align:left">',
						'<b style="font-size: 16px;">{ItemeName}</b>',
						'<p style="text-align:left;color: #ACACAC;">Last Date:{LastDate}</p>',
					'</td>',
					'<td  style="text-align:right">',
					   '<p style="font-weight:normal;font-size:14px;">{BirrerName}',
					   '</p>',
					   '<p style="font-weight:normal;font-size:14px;">{HighestBidAmount}</p>',  
					'</td>',
					'</tr>',
				'</table>',
           '</tpl>'
           ],
		listeners:{
			 "itemtap": function(list, index, item, e) {  fnsetAustionItemDesc(list.getStore().getAt(index),'FeaturedReward');
			 Bidpage='FeaturedRewards';
			 }
		}
	   }  ]
	
});
Ext.reg('FeaturedRewardspageform', App.views.FeaturedRewardspage);


// JavaScript Document
App.views.UpcomingEventDescription = Ext.extend(Ext.Panel,{
    fullscreen: true,
	sortable  : true,
	  scroll:true,
	  style:'padding:0px',
	id:'UpcomingEventDescriptionView',
	//style:'padding:0px 10px 0px 10px',
	cls:'EventInvetion_black black_gray Rewards_black',
items:[ {xtype:'spacer',html:'<div>'+
	   '<table width="100%" cellpadding="0" cellspacing="1" border="0">'+
	   	'<tr ><td valign="top" align="center"><img id="UpCommingEventImg" onerror="fnItemNoImage(this)" src="" style="padding: 0.5em 0.8em;" /></td></tr>'+
	   '</table></div>'},{ xtype:'spacer',cls:'setPageTop',
	   	 html:'<div style="margin-right:5px;margin-left:5px;">'+
		      '<table width="100%" cellpadding="0" cellspacing="1" border="0" class="x-list">'+
			   '<tr class="x-Table-item "><td valign="top" align="left">Event:<p><span id="UpCommingEventName"></span></p></td></tr>'+
			  '<tr class="x-Table-item "><td valign="top" >About the Event:<p><span id="UpCommingEventDescription"></span></p></td></tr>'+
			  '<tr class="x-Table-item "><td valign="top" align="left" style="border:solid 0px red;">Description:<p><span id="UpCommingdetailDesc"></span></p></td></tr>'+
			  '<tr class="x-Table-item "><td valign="top" >Date: <p><span id="UpCommingEventDate"></span></p></td></tr>'+
			  '<tr class="x-Table-item "><td >Day:<p><span id="UpCommingEventDay"></span><input type="hidden" id="UpCommingEventId"/></p></td></tr>'+
			  '<tr class="x-Table-item "><td >Club Name :<p><span id="UpCommingEventClubs"></span></p></td></tr></table><div>'
	} ,{
	   		xtype:'button', 
			text: 'Friends on Guest List',
			id:'UpcomingInviatedFriend',
			cls:'btn_ext',
			style:'margin-top: 20px;margin-bottom: 8px;',
			 handler:function()
			{
				
				Ext.dispatch({
        	    controller: 'EbarTab',
        	    action: 'EventInvetdFriend',
				data:'UpcomingEvent',
        	    //historyUrl: 'EbarTab/EventInvetdFriend',
        	    animation: {
        	        type: 'slide',
        	        direction:'left'
        	     },
        	  });
			}
	   }]
	
});
Ext.reg('UpcomingEventDescriptionform', App.views.UpcomingEventDescription);


// JavaScript Document

App.views.EventInvetionpage = Ext.extend(Ext.Panel,{
    fullscreen: true,
	sortable  : true,
	  scroll:false,
	id:'EventInvetionView',
	style:'padding:0px',
	dockedItems:[
				
	   {xtype:'spacer',html:'<div class="voucherTop">'+
	   '<table width="100%" cellpadding="0" cellspacing="1" border="0">'+
	   	'<tr ><td valign="top" class="clubimg" rowspan="3" ><img id="GuestEventImg" src="" height="75px" width="75px" style="padding: 0.5em 0.8em;" onerror="fnItemNoImage(this)" /></td><td style="vertical-align:middle;padding: 0.5em 0.8em 0.2em;align:left;">Event :<span id="EventName" ></span></td></tr>'+
		'<tr><td style="vertical-align:middle;padding: 0.5em 0.8em 0.2em;align:left;">Event Date:<span id="EventDate" ></span></td></tr>'+
		'<tr><td style="padding: 0.2em 0.8em 0.5em;">Short Description: <input type="hidden" id="GuesstEventId"/><span id="EventDescription"></span></td></tr>'+
	   '</table></div>'}
				],
	cls:'Rewards_black black_gray',
items:[{
	   		xtype:'button', 
			text: 'Invited Friends',
			id:'InviatedFriend',
			cls:'btn_ext',
			 handler:function()
			{
				Ext.dispatch({
        	    controller: 'EbarTab',
        	    action: 'EventInvetdFriend',
        	    animation: {
        	        type: 'slide',
        	         direction:'left'
        	    },
        	});
			}
	   },{
	   		xtype:'button', 
			text: 'Add Friends to the list',
			id:'YourFriend',
			cls:'btn_ext',
			 handler:function()
			{
				if(document.getElementById('NonInvFriendSearchBox')){
				Ext.getCmp('NonInvFriendSearchBox').setValue('');
				}
				
				Ext.dispatch({
        	    controller: 'EbarTab',
        	    action: 'YourFriendInvation',
        	    animation: {
        	        type: 'slide',
        	         direction:'left'
        	    },
        	});
			}
	   }]
	
});
Ext.reg('EventInvetionform', App.views.EventInvetionpage);



// JavaScript Document
//Server Setting--
var url="http://www.eliteclubaccess.com/e-BarTab/Mobile/EbarTabServer.php";
var SreverURL="http://www.eliteclubaccess.com/e-BarTab/";
//var url="http://www.eliteclubaccess.com/a7test/Mobile/EbarTabServer.php";
/*var url="http://www.eliteclubaccess.com/a7test/Mobile/EbarTabServer.php";
var SreverURL="http://www.eliteclubaccess.com/a7test/";*/
//---Server Setting
//var SreverURL="http://localhost/EbarTab2012/";
var curdate= new Date();
Ext.regModel("EbatTab.models.Clubrecord", {
    fields: [
      {name: 'id',      type: 'int'},
      {name: 'name',       type: 'string'},
    ]
});
var ClubStore = new Ext.data.JsonStore({
            model: 'EbatTab.models.Clubrecord',
         	sorters: 'id',
		 	proxy: {
			type: 'ajax',
			},
             autoLoad: false
        });
function fnmcheckUser(){
	if(localStorage.getItem('UserId')!='' && localStorage.getItem('UserId')!=null){
		return true;
	}else{
		Ext.ControllerManager.get('EbarTab').index();
		return  false;
	}
}
function resize(which, max) {
	  var elem = document.getElementById(which);
	  if (elem == undefined || elem == null) return false;
	  if (max == undefined) max = 100;
	  if (elem.width > elem.height) {
	    if (elem.width > max) elem.width = max;
	  } else {
	    if (elem.height > max) elem.height = max;
	  }
	}
function fnuserInclub(clubId){
	Ext.util.JSONP.request({
			url: url,
			callbackKey: 'callback',
			params: { action:'getClubPoint',UserId:localStorage.getItem('UserId'),clubId:clubId },
			callback: function(data) {
				if (data.success) {
				  
				}
		    }
		  });
}
function fncheckEmailID(){
	var EmailId=Ext.getCmp('Email').getValue();
	var Password=Ext.getCmp('password').getValue();
	if(EmailId==''){
		Ext.Msg.alert('','Enter The Email Id', Ext.emptyFn);
	}else if(Password==''){
		Ext.Msg.alert('','Enter The Password', Ext.emptyFn);
	}else{
		myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
			myLoader.show();
			Ext.util.JSONP.request({
			url: url,
			callbackKey: 'callback',
			params: { action:'login',email:EmailId,Password:Password },
			callback: function(data) {
				if (data.success) {
					myLoader.hide();
					localStorage.setItem('UserId',data.UserId);
					localStorage.setItem('UserName',data.UserName);
					localStorage.setItem('Email',data.Email);
					localStorage.setItem('Status',data.Status);
					localStorage.setItem('Point',data.Point);
					localStorage.setItem('increment',data.increment);
					loadClubName();
					fnpageNav(1);
				}else{
					Ext.Msg.alert('',data.msg, Ext.emptyFn);
						myLoader.hide();
				}
		    }
		  });
		}
	}
function fngetBragTab(type){
	myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
		myLoader.show();
		Ext.util.JSONP.request({
				url: url,
				callbackKey: 'callback',
				params: { action:'getBragTab',type:type},
				callback: function(data) {myLoader.hide();
					if (data.success) {
					if(type=="Global"){GlobalBragtore.loadData(data.rows);}
					else if(type=="City"){CityBragstore.loadData(data.rows);}
					else if(type=="Club"){ClubBragstore.loadData(data.rows);}
					else{StateBragstore.loadData(data.rows);}
					}else{						
						Ext.Msg.alert('',data.msg, Ext.emptyFn);
					}
				}
				});
}
function loadClubName(){
	Ext.util.JSONP.request({
				url: url,
				callbackKey: 'callback',
				params: { action:'AllActiveClub'},
				callback: function(data) {
					if (data.success) {
						ClubStore.loadData(data.rows);
					}else{
						Ext.Msg.alert('',data.msg, Ext.emptyFn);
					}
				}
				});
}
function fngetselectcityData(){
	Ext.util.JSONP.request({
				url: url,
				callbackKey: 'callback',
				params: { action:'Allcity'},
				callback: function(data) {
					if (data.success) {
						selectcityStor.loadData(data.rows);
					}else{
						Ext.Msg.alert('',data.msg, Ext.emptyFn);
					}
				}
				});
}
function fngetselectclubData(){
	Ext.util.JSONP.request({
				url: url,
				callbackKey: 'callback',
				params: { action:'AllActiveClub'},
				callback: function(data) {
					if (data.success) {
						selectcluStor.loadData(data.rows);
					}else{
						Ext.Msg.alert('',data.msg, Ext.emptyFn);
					}
				}
				});
}
var redeemVoucher=function(){
	Ext.util.JSONP.request({
				url: url,
				callbackKey: 'callback',
				params: { action:'AddFCFSItem',ItemId:ItemId,MinimumReqiiredPoint:MinimumReqiiredPoint,OwnUserId:localStorage.getItem('UserId')},
				callback: function(data) {
					if (data.success) {
						Ext.Msg.alert('',data.msg, Ext.emptyFn);
						localStorage.setItem('Point',data.userPoint);
					}else{
						Ext.Msg.alert('',data.msg, Ext.emptyFn);
					}
				}
				});
}
var data = {
    text: 'Main Menu',
    items: [{
        text: 'My Profile',id:'1',
        items: [{ text: 'Inbox',id:'12',leaf: true},{text: 'Outbox',id:'13',leaf: true},{text: 'Trash',id:'14',leaf: true},{text: 'Compose Email',id:'15',leaf: true}]
         },{text: 'My Receipts',id:'2',items: [{ text: 'Upload Receipt',id:'16',leaf: true}]
        },{text: 'My Vouchers',id:'3',leaf: true
        },{text: 'Auction Items',id:'4',leaf: true
        },{text: 'Club',id:'5',leaf: true
        },{text: 'Guest Lists',id:'6',leaf: true
        },{text: 'Upcoming Events',id:'7',leaf: true
        },{text: 'Rewards',id:'8',
             items: [{ text: 'Featured Rewards',id:'9',leaf: true},{text: 'Mention e-BarTab',id:'10',leaf: true},{text: 'FCFS',id:'11',leaf: true}]
        },{text: 'Logout',id:'17',leaf: true
        }]
};
Ext.regModel('ListItem', {
    fields: [{name: 'text', type: 'string'},{name: 'id', type: 'string'}]
});
var store = new Ext.data.TreeStore({
    model: 'ListItem',
    root: data,
    proxy: {
        type: 'ajax',
        reader: {
            type: 'tree',
            root: 'items'
        }
    }
});
var NavSettingButData=[{ text: 'My Profile',id:'1'},{ text: 'My Receipts',id:'2'},{ text: 'My Vouchers',id:'3'},{ text: 'Auction Items',id:'4'},{ text: 'Clubs',id:'5'},{ text: 'Logout',id:'17'}/*,{ text: 'FullSite',id:'18'}*/];
var NavSettingButstore = new Ext.data.JsonStore({
    model: 'ListItem',
    data: NavSettingButData,
});

function fnUploadReceipt(){
	
	var receiptImg=Ext.getCmp('hidreceiptImg').getValue();
	var Clubvendor=Ext.getCmp('txtClubvendor').getValue();
	var ClubName=Ext.getCmp('slfClubName').getValue();
	var amount=Ext.getCmp('txtamount').getValue();
	var receiptdate=new Date(Ext.getCmp('txtreceiptdate').getValue());
	var d=receiptdate.getDate();
	var m=receiptdate.getMonth();
	var y=receiptdate.getFullYear();
	if(receiptImg==""){
		if(ReciptUploadPhoto==1){
			Ext.Msg.alert('','Please Wait Upload  Receipt Image', Ext.emptyFn);
		}else{
			Ext.Msg.alert('','Please Select Receipt Image', Ext.emptyFn);
		}
	}
	else if(amount==""){
		Ext.Msg.alert('','Please Enter Receipt Amount', Ext.emptyFn);
	}else if(receiptdate==""){
		Ext.Msg.alert('','Please Enter Receipt Date', Ext.emptyFn);
	}else if(Clubvendor==""){
		Ext.Msg.alert('','Please Enter Receipt Club Vendor', Ext.emptyFn);
	}else{
		ReciptUploadPhoto=0;
        myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Preliminary Validation…Please wait"});
		myLoader.show();
	Ext.util.JSONP.request({
	url: url,
	callbackKey: 'callback',
	params: { action:'InsertReceipts',receiptImg:receiptImg,Clubvendor:Clubvendor,ClubName:ClubName,amount:amount,UserId:localStorage.getItem('UserId'),UserEmail:localStorage.getItem('Email'),receiptdate:y+"-"+m+"-"+d },
	callback: function(data) {
		if (data.success) {
			Ext.Msg.alert('',data.msg, Ext.emptyFn);
			myLoader.hide();
			Ext.getCmp('hidreceiptImg').setValue('');
			Ext.getCmp('txtClubvendor').setValue('');
			Ext.getCmp('slfClubName').setValue('');
			Ext.getCmp('txtamount').setValue('');
			Ext.getCmp('txtreceiptdate').setValue({year: curdate.getFullYear(), day: curdate.getDate(), month: curdate.getMonth()});
		}else{
			Ext.Msg.alert('',data.msg, Ext.emptyFn);
				myLoader.hide();
		}
	}
	});
	setTimeout(function(){myLoader.hide();
	Ext.getCmp('hidreceiptImg').setValue('');
	Ext.getCmp('txtClubvendor').setValue('');
	Ext.getCmp('slfClubName').setValue('');
	Ext.getCmp('txtamount').setValue('');
	Ext.getCmp('txtreceiptdate').setValue({year: curdate.getFullYear(), day: curdate.getDate(), month: curdate.getMonth()});
		Ext.Msg.alert('','Try Again', Ext.emptyFn);},100000);
	}
}
function fnsetclubVender(ClubName){
	
	Ext.util.JSONP.request({
	url: url,
	callbackKey: 'callback',
	params: { action:'getClubVender',ClubName:ClubName },
	callback: function(data) {
		if (data.success) {
			if(data.ClubVender==''){
				Ext.getCmp('txtClubvendor').setValue('');	
				}else{
			//Ext.Msg.alert('','Setting Vendor to:'+data.ClubVender);		
			Ext.getCmp('txtClubvendor').setValue(data.ClubVender);	
			}
		}
	}
	});
}


function fnUploadReceiptPhoto(){
	Ext.dispatch({
        	    controller: 'EbarTab',
        	    action: 'UploadImg',
        	    animation: {
        	        type: 'slide',
        	         direction:'left'
        	    },
        	});
}
function fnpageNav(nav){
	var action='';
	Ext.getCmp('MainMenuProfile').removeCls('x-tab-active');
	Ext.getCmp('MainMenurecipet').removeCls('x-tab-active');
	Ext.getCmp('MainMenuMyvoucher').removeCls('x-tab-active');
	Ext.getCmp('MainMenuAuction').removeCls('x-tab-active');
	Ext.getCmp('MainMenuClub').removeCls('x-tab-active');
	Ext.getCmp('MainMenuGuestList').removeCls('x-tab-active');
	Ext.getCmp('MainMenuEvent').removeCls('x-tab-active');
	Ext.getCmp('MainMenuRewards').removeCls('x-tab-active');
	if(nav==1){action='EbarTabHome';}
	else if(nav==3){action='MyVouchers'; }
	else if(nav==2){action='MyReceiptHistory';}
	else if(nav==4){action='AuctionsItem';}
	else if(nav==5){action='MyClub';}
	else if(nav==6){action='EventGuestlists';}
	else if(nav==7){action='UpcomingEvents';}
	else if(nav==8){action='Rewards';}
	else if(nav==17){ 
						action='index';
						localStorage.removeItem('UserId');
						localStorage.removeItem('UserName');
						localStorage.removeItem('Email');
						localStorage.removeItem('Point');
						localStorage.removeItem('increment');
						localStorage.removeItem('Status');
	}
	else if(nav==20){ action='Rewards'; }
	Ext.dispatch({
        	    controller: 'EbarTab',
        	    action: action,
        	    historyUrl: 'EbarTab/'+action,
        	    animation: {
        	        type: 'slide',
        	        direction:'left'
        	    },
        	});
}
function fnsetVoucherDesc(record){
	Ext.dispatch({
        	    controller: 'EbarTab',
        	    action: 'VoucherDescription',
 				data:record,
        	    animation: {
        	        type: 'slide',
        	         direction:'left'
        	    },
        	});
}
function setVoucherFullDesc(record){
	document.getElementById('voucheercode').innerHTML=record.data.VoucherCode;
	document.getElementById('voucherName').innerHTML=record.data.Voucher;
	document.getElementById('VoucherNameadd').innerHTML=record.data.Amount;
	//document.getElementById('voucherRecipients').innerHTML=record.data.Vendor;
	document.getElementById('hdnVId').value=record.data.VoucherAllotmentID;
	document.getElementById('voucherRecipients').innerHTML=localStorage.getItem('UserName');
	document.getElementById('voucherExpires').innerHTML=record.data.Date;
	document.getElementById('VoucherFinePrint').innerHTML=record.data.Description;
	document.getElementById('voucherRedeem').innerHTML=record.data.Redeemat;
	document.getElementById('voucherUniversal').innerHTML=record.data.Universalfine;
	document.getElementById('VoucherImg').src=SreverURL+"Gallery/"+record.data.logo;
}
function fnpageSubMenuNav(nav){
	var action='';
	if(nav==9){action='FeaturedRewards'; }
	else if(nav==11){	action='FCFS'; }
	else if(nav==10){	action='MentioneBarTab';}
	else if(nav==12){	action='Inbox';}
	else if(nav==13){	action='Outbox';}
	else if(nav==14){	action='Trash';}
	else if(nav==15){	action='ComposeMail';}
	Ext.dispatch({
        	    controller: 'EbarTab',action: action,historyUrl: 'EbarTab/'+action,
        	    animation: {
        	        type: 'slide',direction:'left'
        	    },
        	});
}
function fnopenUploadReceipt(){
		Ext.dispatch({
								controller: 'EbarTab',action: 'UploadReceipts',historyUrl: 'EbarTab/UploadReceipts',
								animation: {
									type: 'slide',direction:'left'
								},
							});	
}
function SetEventInvetedStor(EventId){
	myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
	myLoader.show();
	Ext.util.JSONP.request({
	url: url,
	callbackKey: 'callback',
	params: { action:'EventInveiteGestList',EventId:EventId},
	callback: function(data) {
		if (data.success) {
			InveitefriendDatastore.loadData(data.rows);
			myLoader.hide();
		}else{
			Ext.Msg.alert('',data.msg, Ext.emptyFn);
			myLoader.hide();
		}
	}
	});

}
function SetEventNonInvetedStor(EventId){
	friendDatastore.removeAll();
	SearchfriendDatastore.removeAll();
	MoreCount=1;fngetMoreUser();
}
function fngetMoreUser(){
	var EventId=document.getElementById('GuesstEventId').value;
	myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
	myLoader.show();
	Ext.util.JSONP.request({
	url: url,
	callbackKey: 'callback',
	params: { action:'EventNonInveiteGestList',EventId:EventId,Morecound:MoreCount},
	callback: function(data) {
		if (data.success) {			
			friendDatastore.loadData(data.rows);
			
			 if(document.getElementById('MorePullId')){
					var par=document.getElementById('MorePullId').parentNode
					document.getElementById(par.id).removeChild(document.getElementById('MorePullId'));
				}
				if(MoreCount==2){
				if (Ext.getCmp('ViewListNonInviatedFriend').rendered){					
				 Ext.getCmp('ViewListNonInviatedFriend').scroller.scrollTo({x:0, y:0});		
				 }
				}
				 
				 
				//ViewListNonInviatedFriend
			//var chid=document.getElementById('NonInvFriend').childNodes[0];
			var chid=document.getElementById('ViewListNonInviatedFriend').childNodes[0];
			el=document.createElement("Div");
			el.id='MorePullId';
			el.style.height="300px";
			el.style.padding="0px";
			el.style.margin="0px";
            el.innerHTML='<table style="padding:10px;width:100%;height:54px;background-color:#F1F1F1;"  onclick="fngetMoreUser()"><tr><td><p style="color:#3692FE;font-size:14px;vertical-align:middle;text-align: left;padding: 10px;"><b style="border:none;background-color:transparent;color:#3692FE;">Click For More...</b></p></td></tr></table>';
			document.getElementById(chid.id).appendChild(el);
			SearchfriendDatastore.loadData(data.rows);			
			myLoader.hide();
		}else{
			myLoader.hide();
			Ext.Msg.alert('',data.msg, Ext.emptyFn);
		}
	}
	});
	MoreCount++;
	}
function fnNoImage(obj){obj.src='noimg.gif';}
function fnItemNoImage(obj){obj.src=SreverURL+'img/logo-1.png';}
function fnSetNewCarIntColor(obj){
	var EventId=document.getElementById('GuesstEventId').value;
	var userId=obj.value;
	if(obj.checked){
		Ext.Msg.confirm("", "Confirmation <br> Can You Confirm This?", function(res) {if(res=='yes'){
			Ext.util.JSONP.request({
			url: url,
			callbackKey: 'callback',
			params: { action:'AddInvetionForEvent',EventId:EventId,userId:userId,OwnUserId:localStorage.getItem('UserId'),OwnUserName:localStorage.getItem('UserName'),OwnUserEmail:localStorage.getItem('Email'),OwnUserPoint:localStorage.getItem('Point')},
			callback: function(data) {
				if (data.success) {
					Ext.Msg.alert('',data.msg, Ext.emptyFn);
					localStorage.setItem('Point',data.UserPoint)
				}else{
					Ext.Msg.alert('',data.msg, Ext.emptyFn);
				}
			}
			});
											}
								});
	}
}
function fnAcstionBid(){
	//alert(document.URL);	
	var bidpoint=document.getElementById('txtBidPoint').value;
	var oldbidpoint=parseInt(document.getElementById('hdnBidPoint').value);
	var BidId=parseInt(document.getElementById('hdnBidID').value);
	var BasicBidPrice=parseInt(document.getElementById('hdnBasicBidPrice').value);
	var userLocalPoint=parseInt(localStorage.getItem('Point'));
	if(bidpoint=="" || bidpoint=="0"){
		Ext.Msg.alert('','Enter The Austion Point', Ext.emptyFn);
	}else if(oldbidpoint>bidpoint){
		if(BasicBidPrice>bidpoint){Ext.Msg.alert('','The minimum bid for this item is '+BasicBidPrice+' Points', Ext.emptyFn);}
		else{	Ext.Msg.alert('','Your bid is invalid because it is less than the current leading bid of '+oldbidpoint+' points', Ext.emptyFn);}
	}else{
		if(bidpoint>userLocalPoint){
			Ext.Msg.alert('',"You don't have the required points to place this bid", Ext.emptyFn);
		}else{
			 Ext.util.JSONP.request({
				url: url,
				callbackKey: 'callback',
				params: { action:'AddNewBid',BidId:BidId,bidpoint:bidpoint,OwnUserId:localStorage.getItem('UserId')},
				callback: function(data) {
					if (data.success) {
						Ext.Msg.alert('','Your bid has been placed successfully...', Ext.emptyFn);
						//alert('action'+Bidpage);
						setTimeout(function(){
						Ext.dispatch({
									controller: 'EbarTab',
									action:Bidpage,									
									animation: {
										type: 'slide',direction:'right'
									},
								});
						},1000);
					}else{
						Ext.Msg.alert('',data.msg, Ext.emptyFn);
					}
				}
				});
		}
	}
}
function fnSubmitEntry(){
	var userPoint=parseInt(localStorage.getItem('Point'));
	var ItemId=parseInt(document.getElementById('hdnFCFSItem').value);
	var MinimumReqiiredPoint=parseInt(document.getElementById('hdnItemMinimumReqiiredPoint').value);
	if(MinimumReqiiredPoint>userPoint){
		Ext.Msg.alert('',"You don't have the required points to order this item", Ext.emptyFn);
	}else{
		Ext.util.JSONP.request({
				url: url,
				callbackKey: 'callback',
				params: { action:'AddFCFSItem',ItemId:ItemId,MinimumReqiiredPoint:MinimumReqiiredPoint,OwnUserId:localStorage.getItem('UserId')},
				callback: function(data) {
					if (data.success) {
						Ext.Msg.alert('',data.msg, Ext.emptyFn);
						localStorage.setItem('Point',data.userPoint);
						fnpageSubMenuNav(11);
					}else{
						Ext.Msg.alert('',data.msg, Ext.emptyFn);
					}
				}
				});
	}
}
function fngetUserInbox(){
	myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
	myLoader.show();
	Ext.util.JSONP.request({
				url: url,
				callbackKey: 'callback',
				params: { action:'UserInbox',UserId:localStorage.getItem('UserId')},
				callback: function(data) {
					if (data.success) {
						UserInboxstore.loadData(data.rows);
						myLoader.hide();
					}else{
							myLoader.hide();
					}
				}
				});
}
function fngetUserOutBox(){
	myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
	myLoader.show();
	Ext.util.JSONP.request({
				url: url,
				callbackKey: 'callback',
				params: { action:'UserOutBox',UserId:localStorage.getItem('UserId')},
				callback: function(data) {
					if (data.success) {
						UserOutstore.loadData(data.rows);
						myLoader.hide();
					}else{	myLoader.hide();
					}
				}
				});
}
function fngetUserTrash(){
	myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
	myLoader.show();
	Ext.util.JSONP.request({
				url: url,
				callbackKey: 'callback',
				params: { action:'UserTrash',UserId:localStorage.getItem('UserId')},
				callback: function(data) {
					if (data.success) {
						UserTrashstore.loadData(data.rows);
						myLoader.hide();
					}else{ 	myLoader.hide();
					}
				}
				});
}
function fnsetEmailDesc(record,Page){
	Ext.dispatch({
        	    controller: 'EbarTab',
        	    action: 'EmailDescription',
        		data:[{record:record},{page:Page}],
        	    animation: {
        	        type: 'slide',
        	        direction:'left',
        	    },
        	});
}
function setEmailFullDesc(record,BackPage){
	document.getElementById('EmailSubject').innerHTML=record.data.Subject;
	document.getElementById('EmailMessage').innerHTML=record.data.Message;
	document.getElementById('ViewEmailId').value=record.data.Id;
	document.getElementById('ViewEmailPage').value=BackPage;
	if(record.data.Isreaded==0){
		Ext.util.JSONP.request({
				url: url,
				params: { action:'MailIsRead',EmailId:record.data.Id},
				});
	}
}
function fngetAllMember(){
	Ext.util.JSONP.request({
				url: url,
				callbackKey: 'callback',
				params: { action:'AllMembar',UserId:localStorage.getItem('UserId')},
				callback: function(data) {
					AllMembarInSite.loadData(data.rows);
					SearchAllMembarInSite.loadData(data.rows);
					}
				
				});
}

function fnsendEmail(){
	var To=Ext.getCmp('txtUserNAme').getValue();
	var Subject=Ext.getCmp('txtUserSubject').getValue();
	var Message=Ext.getCmp('txtUserMessage').getValue();
	 var resId=Ext.getCmp('txtUserId').getValue();
	if(To==''){ Ext.Msg.alert('','Enter The User Name', Ext.emptyFn);
	}else if(Subject==''){ Ext.Msg.alert('','Enter The Your Subject', Ext.emptyFn);
	}else if(Message==''){ Ext.Msg.alert('','Enter The Your Message', Ext.emptyFn);
	}else{
		myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
	myLoader.show();

		Ext.util.JSONP.request({
				url: url,
				callbackKey: 'callback',
				params: { action:'SendEmail',UserId:localStorage.getItem('UserId'),UserName:localStorage.getItem('UserName'),resId:resId,userEmail:localStorage.getItem('Email'),To:To,Subject:Subject,Message:Message},
				callback: function(data) {
					if (data.success) {
						myLoader.hide();
						Ext.Msg.alert('',data.msg, Ext.emptyFn);
						var To=Ext.getCmp('txtUserNAme').setValue('');
						var Subject=Ext.getCmp('txtUserSubject').setValue('');
						var Message=Ext.getCmp('txtUserMessage').setValue('');
						var resId=Ext.getCmp('txtUserId').setValue('');
					}else{
						myLoader.hide();
						Ext.Msg.alert('',data.msg, Ext.emptyFn);
					}
					}
				
				});
	}
}
function fnCountryList(){
myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
	myLoader.show();
	Ext.util.JSONP.request({
				url: url,
				callbackKey: 'callback',
				params: { action:'AllCountry'},
				callback: function(data) {
				myLoader.hide();
					CountryStore.loadData(data.rows);
					}
				});
}
function fnGetPageContentData(rec){
	Ext.util.JSONP.request({
				url: url,
				callbackKey: 'callback',
				params: {action:'GetPageContent',PageID:rec},
				callback: function(data) {
					if (data.success) {
						//alert(data.rows[0].Title);
						stringWithHTML=data.rows[0].Description;
						//stringWithHTML = stringWithHTML.replace(/<\/?[a-z][a-z0-9]*[^<>]*>/ig, "");
						var text=ReplaceAll(stringWithHTML,"\\n","");
						document.getElementById('Page_'+rec).innerHTML=(text);
					}else{
						
					}
					}
				});
}
function ReplaceAll(Source,stringToFind,stringToReplace){
 var temp = Source;
    var index = temp.indexOf(stringToFind);
        while(index != -1){
            temp = temp.replace(stringToFind,stringToReplace);
            index = temp.indexOf(stringToFind);
        }
        return temp;
}
function fngetState(){
	myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
	myLoader.show();
	
	if(Ext.getCmp('CountrySlt').getValue()=='' || Ext.getCmp('CountrySlt').getValue()=='United States'){
	var Con=223;
	}else{
	var Con=Ext.getCmp('CountrySlt').getValue();	
	}
	
	Ext.util.JSONP.request({
				url: url,
				callbackKey: 'callback',
				params: { action:'AllStateByCountry',Country:Con},
				callback: function(data) {
					if (data.success) {
						//alert('callback-suc');
						StateStore.loadData(data.rows);
						Ext.getCmp('StateSle').show();
						Ext.getCmp('StateTex').hide();
					}else{
						//alert('callback-fail');
						Ext.getCmp('StateTex').show();
						Ext.getCmp('StateSle').setValue('');
						StateStore.loadData('');
						Ext.getCmp('StateSle').hide();
					}
					myLoader.hide();
				}
				
	});
}
function fncleckUserName(){
	var name=Ext.getCmp('NewUserName').getValue()
	if(name!=''){
	Ext.util.JSONP.request({
				url: url,
				callbackKey: 'callback',
				params: { action:'checkNewUserName',NewUserName:name},
				callback: function(data) {
					if (data.success) {
						Ext.Msg.alert('',data.Msg);
						Ext.getCmp('NewUserName').setValue('');
						Ext.getCmp('NewUserName').focus();
					}
				}
				
	});
	}
}
function fncleckNewUserEmail(){
	var name=Ext.getCmp('NewUserEmail').getValue();
	if(name!=''){
	Ext.util.JSONP.request({
				url: url,
				callbackKey: 'callback',
				params: { action:'checkNewUserEmail',NewUserEmail:name},
				callback: function(data) {
					if (data.success) {
						Ext.Msg.alert('',data.Msg);
						Ext.getCmp('NewUserEmail').setValue('');
						Ext.getCmp('NewUserEmail').focus();
					}
				}
				
	});
	}
}

function fnSingUpNewUser(){
	var NewLastName=Ext.getCmp('NewLastName').getValue();
	var NewFirstName=Ext.getCmp('NewFirstName').getValue();
	var NewUserName=Ext.getCmp('NewUserName').getValue();
	var NewUserEmail=Ext.getCmp('NewUserEmail').getValue();
	if(Ext.getCmp('CountrySlt').getValue()=='United States')
	{
	var CountrySlt=223;
	}else{
	var CountrySlt=Ext.getCmp('CountrySlt').getValue();
	}
	
	    var StateSle='';
		if(StateStore.getCount()>0){ 
		StateSle=Ext.getCmp('StateSle').getValue();
		}else{ 
		StateSle=Ext.getCmp('StateTex').getValue();
		}
	
	var CityTex=Ext.getCmp('CityTex').getValue();
	var NewDateOfBirth=Ext.getCmp('NewDateOfBirth').getValue();
	var NewReferralCode=Ext.getCmp('NewReferralCode').getValue();
	
	
	var x=NewUserEmail;
	var atpos=x.indexOf("@");
	var dotpos=x.lastIndexOf(".");
	
	if(NewFirstName==''){
		Ext.Msg.alert('','Enter The First Name');
	}else if(NewLastName==''){
		Ext.Msg.alert('','Enter The Last Name');
	}else if(NewUserName==''){
		Ext.Msg.alert('','Enter The User Name');
   }else if(NewUserEmail==''){
		Ext.Msg.alert('','Enter The User Email');
   }else if(CountrySlt=='' || CountrySlt=='Select Country'){
		Ext.Msg.alert('','Enter The Country');
   }else if(StateSle=='' || StateSle=='Select State'){
		Ext.Msg.alert('','Enter The State');
   }else if(CityTex==''){
		Ext.Msg.alert('','Enter The City');
   }else if(NewDateOfBirth==''){
		Ext.Msg.alert('','Enter The Date Of Birth');
   }else if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length){
	   Ext.Msg.alert('','Enter Valied Email');
   }else{
	   	myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
	myLoader.show();
	   Ext.util.JSONP.request({
				url: url,
				callbackKey: 'callback',
				params: { action:'SaveNewUser',NewLastName:NewLastName,NewFirstName:NewFirstName,NewUserName:NewUserName,NewUserEmail:NewUserEmail,CountrySlt:CountrySlt,StateSle:StateSle,CityTex:CityTex,NewDateOfBirth:NewDateOfBirth,NewReferralCode:NewReferralCode},
				callback: function(data) {
					myLoader.hide();
					if (data.success) {
						Ext.Msg.alert('',data.Msg);
						Ext.dispatch({
							controller: 'EbarTab',
							action: 'index',
							historyUrl: 'EbarTab/index',
							animation: {
								type: 'slide',
								direction:'left'
							},
						});
					}else{
						Ext.Msg.alert('',data.Msg);
					}
				}
				
	});
	}
}
 

// JavaScript Document

App.views.InviatedFriendList = Ext.extend(Ext.List,{
			 fullscreen:true,
		store:InveitefriendDatastore,
		style:'padding:0px',
		emptyText :'<b style="color:#fff;">Data Not Found...</b>',
		cls:'Editradio black_gray',
		itemTpl:['<tpl for=".">',
                 '<table style="width: 100%;">',
					'<tr >',
					'<td class="img" style="width: 70px;"><img width="60px" height="60px"  src="'+SreverURL+'Gallery/member/{UserImg}" onerror="fnNoImage(this)"  alt=""/></td>',
					'<td style="text-align:left">',
						'<b style="font-size: 17px;font-weight:bold;">{UserName}</b>',						
					'</td>',
					'<td  style="text-align:right">',					   
					   '</p>',
					'</td>',
					'</tr>',
				'</table>',
           '</tpl>']
   });
Ext.reg('InviatedFriendListform', App.views.InviatedFriendList);


var ViewListNonInviatedFriend = new Ext.List({
	fullscreen:true,
    store: friendDatastore,
	id:'ViewListNonInviatedFriend',
	cls:'Editradio black_gray',	
    emptyText :'<p onClick="ShowAllMemberOfSite()" style="color:#fff;">&nbsp;Data Not Found.....<br>&nbsp;Show All Member</p>', 
    itemTpl:['<div class=" x-field x-field-radio x-label-align-left"><div class="x-form-label" style="width: 93%;">',
				 '<span >',
				  '<table style="width: 100%;">',
					'<tr >',
					'<td class="img" style="width: 70px;"><img width="60px" height="60px" src="'+SreverURL+'Gallery/member/{UserImg}" onerror="fnNoImage(this)"  alt=""/></td>',
					'<td style="text-align:left">',
						'<b style="font-size: 17px;font-weight:bold;">{UserName}</b>',						
					'</td>',
					'</tr>',
				'</table>',
				 '</span></div>',
				 '<input type="radio" name="color" class="x-input-radio" tabindex="-1" value="{UserId}" onclick="fnSetNewCarIntColor(this)"></div>']
	
	
});

function ShowAllMemberOfSite(){
Ext.getCmp('NonInvFriendSearchBox').setValue('');	
Ext.dispatch({
	controller: 'EbarTab',
	action: 'YourFriendInvation',
	animation: {
		type: 'slide',
		 direction:'left'
	},
});
}
App.views.NonInviatedFriendlist = Ext.extend(Ext.Panel,{
	 fullscreen:true,
	scroll:true,
	id:'asd',
	dockedItems:[{
     	xtype:'toolbar',
     	items:[{xtype:'searchfield',id:'NonInvFriendSearchBox',flex:1,cls:'SearchFieldPos',			   
			   listeners: {
				   keyup: function (field, e) {	
				   var value = field.getValue();	
				   var tempData= new Array();
							if(value.length==0){
								
					if(document.getElementById('MorePullId')){
					var par=document.getElementById('MorePullId').parentNode
					document.getElementById(par.id).removeChild(document.getElementById('MorePullId'));
					}	
								SearchfriendDatastore.each(function (record) {
										tempData.push(record);
								});
							   friendDatastore.loadData(tempData);
							   
						var chid=document.getElementById('ViewListNonInviatedFriend').childNodes[0];
						el=document.createElement("Div");
						el.id='MorePullId';
						el.style.height="300px";
						el.style.padding="0px";
						el.style.margin="0px";
						el.innerHTML='<table style="padding:10px;width:100%;height:54px;background-color:#F1F1F1;"  onclick="fngetMoreUser()"><tr><td><p style="color:#3692FE;font-size:14px;vertical-align:middle;text-align: left;padding: 10px;"><b style="border:none;background-color:transparent;color:#3692FE;">Click For More...</b></p></td></tr></table>';
						document.getElementById(chid.id).appendChild(el);
						}
							if (value.length > 0) {
									SearchfriendDatastore.each(function (record) {
										if (record.get('UserName').toLowerCase().match(value.toLowerCase())){  tempData.push(record);} 
								});
									   friendDatastore.loadData(tempData);
							  }	
							  
					if(Ext.getCmp('ViewListNonInviatedFriend').rendered){					
					Ext.getCmp('ViewListNonInviatedFriend').scroller.scrollTo({
					 x:0, y:0
					 });		
					 }
                   }
					
			   }
			   
			   }]
     }],
	style:'padding:0px',
	cls:'Editradio black_gray',
	layout:'fit',
	items:[ViewListNonInviatedFriend],
	
	
});


Ext.reg('NonInviatedFriendlistform', App.views.NonInviatedFriendlist);



function set_cookie ( name, value, exp_y, exp_m, exp_d, path, domain, secure )
{

  var cookie_string = name + "=" + escape ( value );

  if ( exp_y )
  {
    var expires = new Date ( exp_y, exp_m, exp_d );
    cookie_string += "; expires=" + expires.toGMTString();
  }

  if ( path )
        cookie_string += "; path=" + escape ( path );

  if ( domain )
        cookie_string += "; domain=" + escape ( domain );
  
  if ( secure )
        cookie_string += "; secure";
  
  document.cookie = cookie_string;
}

/////////////////// Function to delete cookie ///////////////////////////////////
function delete_cookie ( cookie_name )
{
  var cookie_date = new Date ( );  // current date & time
  cookie_date.setTime ( cookie_date.getTime() - 1 );
  document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
}

/////////////////// Function to retrieve cookie value ///////////////////////////////////
function get_cookie ( cookie_name )
{
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

  if ( results )
    return ( unescape ( results[2] ) );
  else
    return null;
}

///////////////// This function set cookies for username and password , if user selects checkbox remember me , during login /////////////
function fnRemember()
{
	var checkStatus=Ext.getCmp('chkRemember').isChecked();
	
	if(checkStatus==true)
	{
		var rememberEmail=Ext.getCmp('Email').getValue();
		var rememberPassword=Ext.getCmp('password').getValue();
		if(rememberEmail==""||rememberPassword=="")
		{
			return false;
		}
		else
		{
			localStorage.setItem ( "rememberU_Email", rememberEmail );
			localStorage.setItem ( "rememberU_Password", rememberPassword );
		}
	}
	else
	{
			localStorage.removeItem("rememberU_Email");
			localStorage.removeItem("rememberU_Password");
	}
}
/////////////////// This function is used to set initial values of textboxes for username and password if user has selected remember me earlier //////////////////////////////////
function fillRememberedValues()
{
	Ext.getCmp('Email').setValue(localStorage.getItem("rememberU_Email"));
	Ext.getCmp('password').setValue(localStorage.getItem("rememberU_Password"));
	if(Ext.getCmp('Email').getValue()!="")
	{	
			Ext.getCmp('chkRemember').check();
	}
	
}


// JavaScript Document
App.views.UploadImgView = Ext.extend(Ext.Panel,{
    fullscreen: true,
	sortable  : true,
	  scroll:true,
	id:'uploadReceiptimg',
	cls:'black_gray uploadimgCls',
	layout: {
			pack: 'center'
		},
	items:[ {
		   cls:'uploadButCls',
		   items:[{xtype:'spacer',style:'height:30px;'},
				  {layout: {
							pack: 'center',type: 'hbox',
						},
						items:[
						 {  xtype: 'button',
							name : 'CapturePhone',
							id:'CapturePhone',
							cls:Ext.is.Phone ? 'padding but_class but_phonewidth' : 'padding but_class but_Tabwidth',
							text:'Capture Photo',handler:function(){ 
								fnUploadReceiptCapturePhoto();
								}
						},{
								xtype:'button',text:'50Px',cls:'padding but_class',id:'MagaPix_but',handler:function(){
									if(!Ext.getCmp('MGPX_Picker')){
									var picker = new Ext.Picker({
											id : 'MGPX_Picker',
											slots: [
												{
													name:'MGPX_Picker',
													id:'MGPX_Pic_id',
													title: 'Magapixels',
													data : [{text: '10', value: 10},{text: '20', value: 20},{text: '30', value: 30},{text: '40', value: 40},{text: '50', value: 50},{text: '60', value: 60},{text: '70', value: 70},{text: '80', value: 80},{text: '90', value: 90},{text: '100', value: 100}]
												}
											],
											 onDoneButtonTap : function() {
												 var vlu=Ext.getCmp('MGPX_Pic_id').getValue();
												Ext.getCmp('MagaPix_but').setText(vlu+"Px");
												Ext.getCmp('MGPX_Picker').hide();
												 }
										});
									Ext.getCmp('MGPX_Pic_id').setValue(50);
									}
									
										Ext.getCmp('MGPX_Picker').show();
									}
								}
				  ]},{xtype:'spacer',style:'height:30px;'},
					 {
						layout: {
							pack: 'center',type: 'hbox',
						},
						items:[{
							 xtype: 'button',
							name : 'imgPhone',
							id:'imgPhone',
							cls:Ext.is.Phone ? 'padding but_class but_phonewidth' : 'padding but_class but_Tabwidth',
							text:'Choose Photo',handler:function(){
									fnUploadReceiptChoosePhoto();
								}
						},{
							xtype:'button',text:'Share',id:'Share_but',cls:'padding but_class', 
							 handler:function(){
								Ext.dispatch({
									controller: 'EbarTab',
									action: 'PhotoShare',
									animation: {type: 'slide',direction:'left'},
								});
							}
						}
						]},{xtype:'spacer',height :15}]
				},{
					xtype:'spacer',height :15},{
					 xtype: 'hiddenfield',
					id:'receiptImgbasecode',
                    name: 'receiptImgbasecode',
				 },{xtype:'spacer',html:'<div align="center" style="margin-top:5px;"><img id="UploadImg" src="" name="UploadImg" width="200px;" height="200px;" /></div>'},
				 {xtype:'spacer',height :20},{
						xtype:'button',text:'Attach',cls:'padding but_class',handler:function(){
							fnUploadSumbitReceiptImg();
						}
		  },
		  ]
	
});
Ext.reg('UploadImg', App.views.UploadImgView);


// JavaScript Document
var MentioneBarTabbar = new Ext.TabBar({
    dock : 'top',
	activeItem:3,
	scroll:'horizontal',
	 hidden: Ext.is.Phone ? true : false,
	id:'MentioneBarTabSubMenu',
    ui   : 'dark',
	layout: {
						pack : 'center',
	},
    items: [
        {
            text: 'Featured Rewards',
			handler:function(){			fnpageSubMenuNav(9);		}
        },
        {
            text: 'Mention e-BarTab',
			id:'SubMenuMentionEbarTab',
			handler:function(){			fnpageSubMenuNav(10);		}
        },{
            text: 'Be The First',
			handler:function(){			fnpageSubMenuNav(11);		}
		}
    ]
});
App.views.MentioneBarTabformpage = Ext.extend(Ext.Panel,{
	sortable  : true,
	  scroll:true,
	id:'MentioneBarTabformpageView',layout:'fit',
	style:'padding:0px',
	dockedItems: [MentioneBarTabbar],
	cls:'black_gray',
	tabBar: {
		dock: 'bottom',
		layout: {
			pack: 'center'
		},
		cardSwitchAnimation: {
			type: 'slide',
			cover: true
		},
		listeners:{
			change: function(ctrl, tab, card){

			}
		}
	},
	
items:[{
	   xtype:'list',
	    store: MentioneBarTabtore,
		emptyText :'No Data Found',
		itemTpl:['<tpl for=".">',
                 '<table style="width: 100%;">',
					'<tr >',
					'<td class="img" style="width: 70px;"><img width="60px" height="60px" onerror="fnItemNoImage(this)"   src="'+SreverURL+'Gallery/{ImageFileName}"  alt=""/></td>',
					'<td style="text-align:left">',
						'<b style="font-size: 16px;">{Name}</b>',
						'<p style="text-align:left;color: #ACACAC;">Last Date:{Enddate}</p>',
					'</td>',
					'</tr>',
				'</table>',
           '</tpl>'
           ],
		listeners:{
			 "itemtap": function(list, index, item, e) {  fnsetMentioneBarTabDesc(list.getStore().getAt(index),'FeaturedReward');}
		}
	   }  ]
	
});
Ext.reg('Mentione-BarTabform', App.views.MentioneBarTabformpage);

// JavaScript Document
App.views.WhatIsEbarTabForm = Ext.extend(Ext.Panel,{
   			fullscreen:true,
            scroll:true,
			id:'WhatIsEbarTabPage',
			layout: {pack: 'center',align:'center'},
			html:'<div id="Page_13" style="background-color:#fff;padding:4px 10px 4px 10px;"></div>'
            });
Ext.reg('WhatIsEbarTabForm', App.views.WhatIsEbarTabForm);


// JavaScript Document
var UserEmailIndox = new Ext.TabBar({
    dock : 'top',
	activeItem:1,
	scroll:'horizontal',
	 hidden: Ext.is.Phone ? true : false ,
	id:'EbarTabEmailSubMenu',
    ui   : 'dark',
	layout: {
						pack : 'center',
	},
    items: [
        {
            text: 'Inbox',
			id:'SubMenuInbox',
			handler:function(){			fnpageSubMenuNav(12);			}
        },
        {
            text: 'Outbox',
			handler:function(){			fnpageSubMenuNav(13);		}
        },{
            text: 'Trash',
			handler:function(){			fnpageSubMenuNav(14);		}
		},{
            text: 'Compose Mail',
			id:'SubMenuComposeMailInPage',
			handler:function(){			fnpageSubMenuNav(15);		}
		}
    ]
});
App.views.UserInboxPage = Ext.extend(Ext.Panel,{
    fullscreen: true,
	sortable  : true,
	  scroll:true,
	id:'UserInboxView',
	dockedItems: [UserEmailIndox],
	cls:'black_gray',
	layout:'fit',
items:[ 
	   {
	   xtype:'list',
	    store: UserInboxstore,
		emptyText :'<b style="color:#fff;">Data Not Found...</b>',
		itemTpl:['<tpl for=".">',
                 '<table style="width: 100%;"  class="setBgColor">',
					'<tr >',
					'<td style="text-align:left">',
						'<b style="font-size: 16px;"> {UserName}</b>',
						 '<tpl if="values.Isreaded == \'0\'">',
						'<p style="text-align:left;"><b>{Subject}</b></p>',
						 '</tpl>',
						  '<tpl if="values.Isreaded == \'1\'">',
						'<p style="text-align:left;color: #ACACAC;">{Subject}</p>',
						 '</tpl>',
					'</td>',
					'<td  style="text-align:right;width: 40%;">',
					'<input type="hidden" id="InboxEmailId">',
					   '<p style="font-weight:normal;font-size:14px;"> {MailDate}',
					   '</p>',
					'</td>',
					'</tr>',
				'</table>',
           '</tpl>'
           ],
		listeners:{
			 "itemtap": function(list, index, item, e) {  fnsetEmailDesc(list.getStore().getAt(index),'Inbox');}
		}
	   } 
	   ]
	
});
Ext.reg('UserInbox', App.views.UserInboxPage);


// JavaScript Document
App.views.MyReceipt = Ext.extend(Ext.Panel,{
    fullscreen: true,
	sortable  : true,
	  scroll:true,
	id:'MyReceiptView',
	cls:'black_gray',
	layout:'fit',
items:[ 
	   {
	   xtype:'list',
	    store: Receiptstore,
		emptyText :'No Data Found',
		id:'ReceiptList',
		itemTpl:['<tpl for=".">',
                 '<table style="width: 100%;" id="test">',
					'<tr >',
					'<td style="text-align:left">',
						'<b style="font-size: 16px;">Vendor : {Vendor}</b>',
						'<p style="text-align:left;color: #989898;">Date :{InputDate}</p>',
						'<p style="text-align:left;color: #989898;">Amount : <span> {Amount}</span></p>',
					'</td>',
					'<td  style="text-align:right">',
					   '<p style="font-weight:normal;font-size:14px;">Point : {Point}',
					   '</p>',
					   '<tpl if="values.IsVilify == \'1\'">',
						'<img src="'+SreverURL+'images/accepted.png" width="20px;" height="20px;">',
					'</tpl>',
					'<tpl if="values.IsVilify == \'0\'">',
						'<img src="'+SreverURL+'images/cross.png" width="20px;" height="20px;">',
					'</tpl>',  
					'</td>',
					'</tr>',
				'</table>',
           '</tpl>'
           ],
		
	   } 
	   ]
	
});
Ext.reg('MyReceipt', App.views.MyReceipt);


// JavaScript Document
App.views.MentioneBarTabDescription = Ext.extend(Ext.Panel,{
    fullscreen: true,
	sortable  : true,
	  scroll:true,
	id:'MentioneBarTabView',
	style:'padding:0px',
	//style:'padding:0px 10px 0px 10px',
	cls:'black_gray uploadimgCls',
items:[{xtype:'spacer',style:'height:50px;'},
	   {xtype:'spacer',html:'<div>'+
	   '<table width="100%" cellpadding="0" cellspacing="1" border="0">'+
	   	'<tr ><td valign="top" align="center"><img id="MentioneBarTabImg" onerror="fnItemNoImage(this)" src="" style="padding: 0.5em 0.8em;" /></td></tr>'+
	   '</table></div>'},{ xtype:'spacer',cls:'setPageTop',
	   	 html:'<div style="margin-right:5px;margin-left:5px;">'+
		      '<table width="100%" cellpadding="0" cellspacing="1" border="0" class="x-list">'+
			  '<tr class="x-Table-item "><td valign="top" >Item :<p><span id="MentioneBarTabName"></span></p></td></tr>'+
			  '<tr class="x-Table-item "><td valign="top" >Item Avalible For Level:<p><span id="MentioneBarTabLevel"></span></p></td></tr>'+
			  '<tr class="x-Table-item "><td valign="top" >Quantity Available: <p><span id="MentioneBarTabQuntity"></span><input type="hidden" id="hdnBasicBidPrice" name="hdnBasicBidPrice"></p></td></tr>'+
			  '<tr class="x-Table-item "><td >Description:<p><span id="MentioneBarTabDescription"></span><input type="hidden" id="EventId"/><input type="hidden" id="hdnBidPoint" name="hdnBidPoint"></p></td></tr>'+
			  '<tr class="x-Table-item " ><td >FaceBookUrl:<p><a href="" id="a_MentioneBarTabURL" target="_blank"></a></p></td></tr>'+
			  '<tr class="x-Table-item " ><td >Offer Point:<p><span id="MentioneBarTabofferPoint"></span></p></td></tr>'+
			  '<tr class="x-Table-item "  align="center"><td ><input type="tel" id="txtMentionItemQun" name="txtMentionItemQun" value="1"><input type="hidden" id="hdnMentionitemId"><input type="hidden" id="hdnMentionitemPoint"></td></tr>'+
			  '<tr class="x-Table-item "  align="center"><td ><input type="button" class="x-button x-button-normal but_class" value="Order With Your E-Points" onclick="fnorderMentionEbarTab();" ></td></tr>'+
			  '</table><div>'
	},{xtype:'spacer',style:'height:50px;'} ]
	
});
Ext.reg('MentioneBarTabDescriptionform', App.views.MentioneBarTabDescription);


// JavaScript Document
var UserEmailOutbox = new Ext.TabBar({
    dock : 'top',
	activeItem:1,
	scroll:'horizontal',
	id:'EbarTabOutboxSubMenu',
	 hidden: Ext.is.Phone ? true : false ,
    ui   : 'dark',
	layout: {
						pack : 'center',
	},
    items: [
        {
            text: 'Inbox',
			handler:function(){			fnpageSubMenuNav(12);		}
        },
        {
            text: 'Outbox',
			id:'SubMenuOutbox',
			handler:function(){			fnpageSubMenuNav(13);		}
        },{
            text: 'Trash',
			handler:function(){			fnpageSubMenuNav(14);		}
		},{
            text: 'Compose Mail',
			handler:function(){		fnpageSubMenuNav(15);		}
		}
    ]
});
App.views.UserOutBoxPage = Ext.extend(Ext.Panel,{
    fullscreen: true,
	sortable  : true,
	  scroll:true,
	id:'UserOutBoxView',
	dockedItems: [UserEmailOutbox],
	cls:'black_gray',
	layout:'fit',
items:[ /*{xtype:'spacer',height:70},MyReceiptDataView */
	   {
	   xtype:'list',
	    store: UserOutstore,
		emptyText :'<b style="color:#fff;">Data Not Found...</b>',
		//styleHtmlContent: true,
		itemTpl:['<tpl for=".">',
                 '<table style="width: 100%;" class="setBgColor">',
					'<tr >',
					'<td style="text-align:left">',
						'<b style="font-size: 16px;"> {UserName}</b>',
						'<p style="text-align:left;color: #ACACAC;">{Subject}</p>',
						'<input type="hidden" id="OutboxEmailId">',
					'</td>',
					'<td  style="text-align:right;width: 40%;">',
					   '<p style="font-weight:normal;font-size:14px;"> {MailDate}',
					   '</p>',
					'</td>',
					'</tr>',
				'</table>',
           '</tpl>'
           ],
		listeners:{
			 "itemtap": function(list, index, item, e) {  fnsetEmailDesc(list.getStore().getAt(index),'OutBox');}
		}
	   } 
	   ]
	
});
Ext.reg('UserOutBox', App.views.UserOutBoxPage);


App.views.SearchMembarView=Ext.extend(Ext.Panel,{
	 cls: 'search-panel',
     fullscreen: true,
	 id:'SearchMembarIndex',
     floating: true,layout:'fit',
     dockedItems:[{
     	xtype:'toolbar',
     	items:[{
     		xtype:'searchfield',
     		flex:1,
				listeners: {
				keyup: function (field, e) { 
					var value = field.getValue();
						Ext.util.JSONP.request({
						url: url,
						callbackKey: 'callback',
						params: { action:'SearchSiteMembar',value:value},
						callback: function(data) {
							if (data.success) {
								AllMembarInSite.loadData(data.rows);
								}else{
								Ext.Msg.alert('',data.msg, Ext.emptyFn);
							}
						}
						});
						
				}
			}
     	},{
     		text:'Cancel',
     		itemId:'cancelSearchBtn',
     		ui:'action'
     	}]
     }],
});
Ext.reg('SearchMembarView',App.views.SearchMembarView);


// JavaScript Document
App.views.Registerform = Ext.extend(Ext.Panel,{
   			fullscreen:true,
            scroll:true,
			id:'RegisterformPage',
			layout: {pack: 'center',align:'center'},
            items:[
                {
                    xtype:'fieldset',
                    cls:'padding registerForm',
					layout: {
						pack: 'center',align:'center'
						},
                    defaults: {
                        required: false,
                        labelAlign: 'left',
                        labelWidth: '35%'
                    },
                    items:[{xtype:'spacer',style:'height:10px;'},
                        {xtype:'textfield',name :'NewFirstName',id:'NewFirstName', label: 'First Name'}, 
                        {xtype:'textfield',name :'NewLastName',id:'NewLastName', label: 'Last Name'} ,
						{xtype:'textfield',name :'NewUserName',id:'NewUserName', label: 'User Name',
							listeners: {
								blur:function(){
									  fncleckUserName();
									}
							}},
						{xtype:'emailfield',name :'NewUserEmail',id:'NewUserEmail', label: 'Email Id',
						listeners: {
								blur:function(){
									  fncleckNewUserEmail();
									}
							}},
						{xtype:'selectfield',
								name :'CountrySlt',
								id:'CountrySlt',
								label: 'Country',
								store:CountryStore,
								displayField :'countries_name',
								valueField:'countries_id',
								value:'United States',
								listeners: {
									change:function(){
											fngetState();
										}
									}},
						{xtype:'selectfield',name :'StateSle',id:'StateSle',label: 'State',store:StateStore,
								displayField :'zone_name',value:'Select State',
								valueField:'zone_name'},
						{xtype:'textfield',name :'StateTxt',id:'StateTex', label: 'State'},
						{xtype:'textfield',name :'CityTxt',id:'CityTex', label: 'City'},
						{xtype:'datepickerfield',name :'NewDateOfBirth',id:'NewDateOfBirth', label: 'Date Of Birth'},
						{xtype:'textfield',name :'NewReferralCode',id:'NewReferralCode', label: 'Referral Code'},
                    ]
                }, {
                      xtype:'button',
					  layout: {
						pack: 'center',align:'center'
						},
                    cls:'padding but_class',
                    text:'Sign Up',
                    handler:function()  // Function for switch to home screen
                    { 
					   fnSingUpNewUser();
					}
                },{xtype:'spacer',style:'height:10px;'}				
            ]
});
Ext.reg('Registerform', App.views.Registerform);


// JavaScript Document
App.views.profile = Ext.extend(Ext.Panel,{
    fullscreen: true,
	sortable  : true,scroll:true,
	id:'userprofile',
	cls:'EventInvetion_black black_gray Rewards_black',
	items:[ {xtype:'spacer', height:20},
		   {xtype:'spacer',  
	  layout:'fit',html:'<div width="100%" align="center" >'+
		   						'<table  border="0" width="90%">'+
								'<tr><td style="text-align:center;">'+
								'<img src="" width="171px" height="133" id="userImgProgile" onerror="fnNoImage(this)" name="userImgProgile" >'+
								'</td></tr>'+
								'<tr><td><table border="0" width="100%" class="ProfileTable">'+
								'<tr><td><label style="font-size: 16pt;color:#606162;font-family: Trebuchet MS;">Welcome , </label><label id="fullUserName" name="fullUserName" style="font-size:16pt;color:#FFFFFF;font-family: Trebuchet MS;"></label></td></tr>'+
								'<tr><td>'+
								'<label style="font-size:14pt;color:#606162;font-family: Trebuchet MS;">Available Points at Login :</label><label id="UserPoint" name="UserPoint" style="font-size:14pt;color:#F8BA34;font-family: Trebuchet MS;"></label></td></tr>'+
								'<tr><td>'+
								'<label  style="font-size:14pt;color:#606162;font-family: Trebuchet MS;">Membership Level :</label><label id="fullUserLevel" name="fullUserLevel" style="font-size:14pt;color:#F8BA34;font-family: Trebuchet MS;"></label></td></tr>'+
								'<tr><td style="height:10px"></td></tr>'+
								'<tr><td><input type="button" class="Emailbtn_ext" value="New Email" id="UserNewEmail" onclick="fnSelectonclick(1);"/></td></tr>'+
								'<tr><td style="height:10px"></td></tr>'+
								'<tr><td><input type="button" class="Emailbtn_ext" value="This Week" id="TheWeek_But" onclick="fnSelectonclick(2);"/></td></tr>'+
								'<tr><td style="height:10px"></td></tr>'+
								'<tr><td><input type="button" class="Emailbtn_ext" value="Brag on your tab" id="Btag_But" onclick="fnSelectonclick(3);"/></td></tr>'+
								'<tr><td style="height:10px"></td></tr>'+
								'<tr><td><input type="button" class="Emailbtn_ext" value="Promotions" id="Promoter_But" onclick="fnSelectonclick(4);"/></td></tr>'+
								'<tr><td style="height:10px"></td></tr>'+
								'<tr><td><input type="button" class="Emailbtn_ext" value="Where is the Case?" id="theCase_But" onclick="fnSelectonclick(5);"/></td></tr>'+
								'<tr><td style="height:10px"></td></tr>'+
								'<tr><td><input type="button" class="Linkbtn_ext" value="Facebook" id="theCase_But" onclick="fnSelectonclick(6);"/>&nbsp;&nbsp;&nbsp;<input type="button" class="Linkbtn_ext" value="Twitter" id="theCase_But" onclick="fnSelectonclick(7);"/></td></tr>'+
								'</table>'+
								'</td></tr></table></div>'}
		  ,{xtype:'spacer', height:100}]
	
});
Ext.reg('userprofile', App.views.profile);
function fnSelectonclick (index){
	var action='';
	if(index==1){action='Inbox';}
	else if(index==2){action='Membar_This_Week';}
	else if(index==3){action='Global_Brag_on_your_tab';}
	else if(index==4){action='Current_Promoter';}
	else if(index==5){action='Where_is_the_Case';}
	else if(index==6){window.location="http://www.facebook.com/ebartab";action='EbarTabHome';}
	else if(index==7){window.location="http://www.twitter.com/#!/ebartab";action='EbarTabHome';}
	Ext.dispatch({		
			controller: 'EbarTab',
			action: action,
			historyUrl: 'EbarTab/'+action,
			animation: {
				type: 'slide',
				direction:'right'
			},
	});	
}

// JavaScript Document
App.views.UploadReceipts = Ext.extend(Ext.Panel,{
    fullscreen: true,
	sortable  : true,
	  scroll:true,
	id:'UserRecieptView',
	cls:'black_gray',
	items:[ {xtype:'spacer',style:'height:50px;'},{
		           xtype: 'button',
                    name : 'btnUploadPhoto',
					id:'btnUploadPhoto',
					cls:'padding but_class',
					text:'Attach Photo',handler:function(){
							fnUploadReceiptPhoto();
						}
                },{xtype:'spacer',style:'height:20px;'},{
					 xtype:'fieldset',
                     cls:'padding but_class',
					layout: {
						pack: 'center',align:'center'
						},
                    defaults: {
                        required: false,
                        labelAlign: 'left',
                        labelWidth: '40%'
                    },
                    items:[
		                {
		                    xtype: 'textfield',
							inputType:'tel',
		                    name : 'txtamount',
							cls:'login',
							id:'txtamount',
		                    label: 'Amount',
		                },{
							 xtype: 'selectfield',
		                    name : 'slfClubName',
							id:'slfClubName',
							cls:'login',
							store:ClubStore,
							displayField: 'name',
							valueField : 'id',
		                    label: 'Club',
							listeners:{
							   change :function(){ if(this.value!=0){fnsetclubVender(this.value);}}
						   }
						},{
							 xtype: 'textfield',
		                    name : 'txtClubvendor',
							cls:'login',
							id:'txtClubvendor',
		                    label: 'vendor'
						},{
							 xtype: 'datepickerfield',
		                    name : 'txtreceiptdate',
							cls:'login',
							
							id:'txtreceiptdate',
		                    label: 'Receipt Date',
							value:{year: curdate.getFullYear(), day: curdate.getDate(), month: (parseInt(curdate.getMonth())+1)}
						},{
							 xtype: 'hiddenfield',
							id:'hidreceiptImg',
		                    name: 'hidreceiptImg'
						}]},{
					layout: {
						pack : 'center',
					},
					items:[{
						xtype:'button',text:'Upload Receipts',cls:'padding but_class',handler:function(){
							fnUploadReceipt();
						}
					}]
		  }]
	
});
Ext.reg('UploadReceipts', App.views.UploadReceipts);


// JavaScript Document
App.views.EmailDescription = Ext.extend(Ext.Panel,{
    fullscreen: true,
	sortable  : true,
	  scroll:true,
	  style:'padding:0px',
	id:'EmailDescriptionView',
	cls:'black_gray',
items:[{ xtype:'spacer', 
	   	 html:'<div style="margin-right:0px;margin-left:0px;">'+
		 		'<table width="100%" cellpadding="0" cellspacing="1" border="0">'+
				'<tr><td valign="top"  class="HeaderTitel">Subject: <label id="ldlEmailreplay" style="float:right;margin-right:5px;" onclick="fnReplayEmail()">reply</label></td></tr>'+
				'<tr><td align="left" class="HeaderDES"><span id="EmailSubject"></span></td></tr>'+
				'<tr><td valign="top" class="HeaderTitel">Message:'+
				'<input type="hidden" id="ViewEmailId"><input type="hidden" id="ViewEmailPage"></td></tr>'+
				'<tr><td align="left" class="HeaderDES"><span id="EmailMessage"></span></td></tr>'
	} ]
	
});
Ext.reg('EmailDescriptionform', App.views.EmailDescription);


// JavaScript Document
var TheWeekOption = new Ext.TabBar({
    dock : 'top',
	activeItem:1,
	scroll:'horizontal',
	id:'TheWeekOptionsub',
    ui   : 'dark',
	layout: {
						pack : 'center',
	},
    items: [
        {text: 'Member',id:'MembarTheWeekOptionsub',handler:function(){fnsetWeekPage(1);} },
       {text: 'Club',id:'clubTheWeekOptionsub',handler:function(){fnsetWeekPage(2);}},
       {text: 'Event',id:'EventTheWeekOptionsub',handler:function(){fnsetWeekPage(3);		}}
    ]
});
function fnsetWeekPage(index){
	var action='';
	if(index==1){action='Membar_This_Week';}
	else if(index==2){action='Club_This_Week';}
	else if(index==3){action='Event_This_Week';}
	else if(index==4){action='Current_Promoter';}
	else if(index==5){action='Featured_Promoter';}
	else if(index==6){action='Global_Brag_on_your_tab';}
	else if(index==7){action='City_Brag_on_your_tab';}
	else if(index==8){action='Club_Brag_on_your_tab';}
	else if(index==9){action='State_Brag_on_your_tab';}
	Ext.dispatch({
								controller: 'EbarTab',
								action: action,
								historyUrl: 'EbarTab/'+action,
								animation: {
									type: 'slide',
									 direction:'right'
								},
							});	
}
App.views.TheWeekPage = Ext.extend(Ext.Panel,{
    fullscreen: true,
	  scroll:true,
	id:'TheWeekOptionView',
	dockedItems: [TheWeekOption],
	cls:'black_gray',
	layout:'card',
	items:[{
		   xtype:'list',
		   fullscreen: true,
		   id:'MembarTheWeekView',
    		store: MembarTheWeekstore,
		emptyText :'No Data Found',
			itemTpl:['<tpl for=".">',
						 '<table style="width: 100%;">',
							'<tr >',
							'<td class="img" style="width: 70px;"><img width="60px" height="60px" onerror="fnNoImage(this)"  src="'+SreverURL+'Gallery/{UserImg}"  alt=""/></td>',
							'<td style="text-align:left">',
								'<b style="font-size: 16px;">{UserName}</b>',
							'</td>',
							'</tr>',
						'</table>',
				   '</tpl>'
				   ],
	},{
		   xtype:'list',
		   fullscreen: true,
		   id:'ClubTheWeekView',
          store: MyClubstore,
		emptyText :'No Data Found',
		itemTpl:['<tpl for=".">',
                 '<table style="width: 100%;">',
					'<tr >',
					'<td class="img" style="width: 70px;"><img width="60px" height="60px" onerror="fnItemNoImage(this)"  src="'+SreverURL+'Gallery/{FileImage}"  alt=""/></td>',
					'<td style="text-align:left">',
						'<b style="font-size: 16px;">{Name}</b>',
						'<p style="text-align:left;color: #ACACAC;">{SiteURL}</p>',
					'</td>',
					'</tr>',
				'</table>',
           '</tpl>'
           ],
		listeners:{
			 "itemtap": function(list, index, item, e) {  fnsetcluDesc(list.getStore().getAt(index),'TheWeek');}
		}},{
		   xtype:'list',
		   fullscreen: true,
		   id:'EventTheWeekView',
         store: UpcomingEventsstore,
		emptyText :'No Data Found',
	itemTpl:['<tpl for=".">',
                 '<table style="width: 100%;">',
					'<tr >',
					'<td class="img" style="width: 70px;"><img width="60px" height="60px" onerror="fnItemNoImage(this)"  src="'+SreverURL+'Gallery/{ImageFile}"  alt=""/></td>',
					'<td style="text-align:left">',
						'<b style="font-size: 16px;">{Name}</b>',
						'<p style="text-align:left;color: #AFAFAF;">{EventDate}</p>',
					'</td>',
					'</tr>',
				'</table>',
           '</tpl>'
           ],
		listeners:{
			 "itemtap": function(list, index, item, e) {fnsetUpcomingEventDesc(list.getStore().getAt(index),'TheWeek');}
		}} ]
});
Ext.reg('TheWeekPage', App.views.TheWeekPage);



var UserComposeMail = new Ext.TabBar({
    dock : 'top',
	activeItem:1,
	scroll:'horizontal',
	id:'EbarTabEmailSubMenu',
	 hidden: Ext.is.Phone ? true : false ,
    ui   : 'dark',
	layout: {
						pack : 'center',
	},
    items: [
        {
           text: 'Inbox',	handler:function(){		fnpageSubMenuNav(12);		}
        },
        {
            text: 'Outbox',		handler:function(){		fnpageSubMenuNav(13);		}
        },{
            text: 'Trash',	handler:function(){		fnpageSubMenuNav(14);		}
		},{
            text: 'Compose Mail',id:'SubMenuComposeMail',
			handler:function(){			fnpageSubMenuNav(15);		}
		}
    ]
});
App.views.ComposeMailPage = Ext.extend(Ext.Panel,{
	sortable  : true,
	  scroll:true,
	id:'ComposeMailView',
	dockedItems: [UserComposeMail],
	cls:'black_gray composebg',
items:[ 
	  {    xtype:'fieldset',
                    cls:'Morepadding',
					layout: {
						pack: 'center',align:'center'
						},
                    defaults: {
                        required: false,
                        labelAlign: 'left',
                        labelWidth: '30%'
                    },
                    items:[
                        {xtype:'textfield', name :'txtUserNAme',id:'txtUserNAme',cls:'cmpMail', label: 'To',ui:"select",picker:null,destroyPickerOnHide:false,
							listeners: {
								focus: function (field, e) { 
								  if (!this.actions) {
										this.actions = new Ext.ActionSheet({
											height:200,
											id:'composeMailActionSheet',
											dockedItems: [{xtype:'toolbar', items:[
													{text:'Cancel',handler:function(){
														Ext.getCmp('composeMailActionSheet').hide();
													}},{xtype:'spacer'},{xtype:'searchfield',id:'searchUserNameTO', listeners: {
					keyup: function (field, e) {
						
						var value = field.getValue();
						var tempData = [];
						//alert(AllMembarInSite.getCount());
						
						if(value.length==1){							
							if(e.browserEvent.keyCode != 8){
								AllMembarInSite.each(function (record) {
								tempData.push(record);
							});
								
								SearchAllMembarInSite.loadData(tempData);
							}
						}
						if(value.length==0){
							if (e.browserEvent.keyCode == 8) {
								AllMembarInSite.each(function (record) {
									tempData.push(record);
							});
								SearchAllMembarInSite.loadData(tempData);
						 }
						}
						if (value.length > 0) {
							AllMembarInSite.each(function (record) {
								if (record.get('UserName').toLowerCase().match(value.toLowerCase())){
									tempData.push(record);
								}else if (record.get('Email').toLowerCase().match(value.toLowerCase())){
									tempData.push(record);
								}
								
							});
						SearchAllMembarInSite.loadData(tempData);
						}
					}  
				  }}
											]}],
											layout:'fit',
											items: [{
												 xtype:'list',
												 id:'AllMemberInsiteForactions',
													store: SearchAllMembarInSite,													
	itemTpl:['<tpl for=".">',
			 '<table style="width: 100%;">',
				'<tr >',
				'<td style="text-align:left">',
					'<b style="font-size: 16px;">{UserName}</b>',
				'</td>',
				'</tr>',
			'</table>',
	   '</tpl>'
	   ],
									listeners:{
"itemtap": function(list, index, item, e) { var rocord=list.getStore().getAt(index);
Ext.getCmp('txtUserNAme').setValue(rocord.data.UserName);
Ext.getCmp('txtUserId').setValue(rocord.data.UserId);
Ext.getCmp('composeMailActionSheet').hide();

										 }
									}
													}]
											
										});
									}
									this.actions.show();
									Ext.getCmp('searchUserNameTO').focus();
								}
							}}, 
                        {xtype:'textfield', name :'txtUserSubject',cls:'cmpMail', id:'txtUserSubject', label: 'Subject'},
						{xtype:'hiddenfield', name :'txtUserId', id:'txtUserId',cls:'cmpMail',},
						{xtype:'textareafield', name :'txtUserMessage', id:'txtUserMessage',cls:'cmpMail', label: 'Message',height:100},
                  {xtype:'spacer',height:30},
		{ xtype:'button',
					  layout: {
						pack: 'center',align:'center',cls:'padding'
						},
                    cls:'padding but_class',
                    text:'Send Email',
                    handler:function()  // Function for switch to home screen
                    { 
					fnsendEmail();
					}}  ]
	   },  ]
	
});
Ext.reg('ComposeMailform', App.views.ComposeMailPage);


// JavaScript Document
App.views.UpcomingEvents = Ext.extend(Ext.Panel,{
	sortable  : true,
	  scroll:true,
	id:'UpComingEventView',
	cls:'black_gray',
	layout:'fit',
items:[{
	   xtype:'list',
	    store: UpcomingEventsstore,
		emptyText :'No Data Found',
		itemTpl:['<tpl for=".">',
                 '<table style="width: 100%;">',
					'<tr >',
					'<td class="img" style="width: 70px;"><img width="60px" height="60px" onerror="fnItemNoImage(this)"  src="'+SreverURL+'Gallery/{ImageFile}"  alt=""/></td>',
					'<td style="text-align:left">',
						'<b style="font-size: 16px;">{Name}</b>',
						'<p style="text-align:left;color: #AFAFAF;">{EventDate}</p>',
					'</td>',
					'</tr>',
				'</table>',
           '</tpl>'
           ],
		listeners:{
			 "itemtap": function(list, index, item, e) {  fnsetUpcomingEventDesc(list.getStore().getAt(index),'UpcomingEvent');}
		}
	   } ]
	
});
Ext.reg('UpcomingEventsform', App.views.UpcomingEvents);


App.views.SearchUserGestIndexView=Ext.extend(Ext.Panel,{
	 cls: 'search-panel',
     fullscreen: true,
	 id:'SearchClubIndex',
     floating: true,layout:'fit',
     dockedItems:[{
     	xtype:'toolbar',
     	items:[{
     		xtype:'searchfield',
     		flex:1,
				listeners: {
				keyup: function (field, e) {
					var value = field.getValue();
						var tempData = [];
					if(value.length==0){
						if (e.browserEvent.keyCode == 8) {
							friendDatastore.each(function (record) {
								tempData.push(record);
						});
							SearchfriendDatastore.loadData(tempData);
					 }
					}
					if (value.length > 0) {
						friendDatastore.each(function (record) {
							if (record.get('UserName').toLowerCase().match(value.toLowerCase()))
							tempData.push(record);
						});
						SearchfriendDatastore.loadData(tempData);
					}
				}
			}
     	},{
     		text:'Cancel',
     		itemId:'cancelGroupSearchBtn',
     		ui:'action'
     	}]
     }],
	 items:[ { xtype:'list',
	    store: SearchfriendDatastore,
		emptyText :'No Data Found',
		itemTpl:['<div class=" x-field x-field-radio x-label-align-left" ><div class="x-form-label"  style="width: 60%;">',
				 '<span >',
				  '<table style="width: 100%;">',
					'<tr >',
					'<td class="img" style="width: 70px;"><img width="60px" height="60px"  src="'+SreverURL+'Gallery/member/{UserImg}" onerror="fnNoImage(this)"  alt=""/></td>',
					'<td style="text-align:left">',
						'<b style="font-size: 17px;font-weight:bold;">{UserName}</b>',
						/*'<p style="font-size: 13px;text-align:left;">{Email}</p>', Ashish */
					'</td>',
					'</tr>',
				'</table>',
				 '</span></div>',
				 '<input  type="radio" name="color" class="x-input-radio" tabindex="-1" value="{UserId}" onclick="fnSetNewCarIntColor(this)"></div>'],

	   }]
});
Ext.reg('SearchUserGestIndexView',App.views.SearchUserGestIndexView);


// JavaScript Document
App.views.VoucherDescription = Ext.extend(Ext.Panel,{
    fullscreen: true,
	sortable  : true,
	  scroll:true,
	  style:'padding:0px',
	id:'VoucherDescriptionView',
	//style:'padding:0px 10px 0px 10px',
	cls:'black_gray uploadimgCls',
items:[{xtype:'spacer',style:'height:50px;'},
	   {xtype:'spacer',html:'<div class="voucherTop">'+
	   '<table width="100%" cellpadding="0" cellspacing="1" border="0">'+
	   	'<tr ><td valign="top" class="clubimg" rowspan="3" ><img id="VoucherImg" src="" height="100px" width="100px" onerror="fnItemNoImage(this)" style="padding: 0.5em 0.8em;" /></td><td style="vertical-align:middle;padding: 1.5em 0.8em 0.2em;align:left;">Voucher :<span id="voucherName" style="color:#A41213;"></span></td></tr>'+
		'<tr><td style="vertical-align:middle;padding: 1.5em 0.8em 0.2em;align:left;">Voucher Code:<span id="voucheercode" style="color:#A41213;"></span></td></tr>'+
		'<tr><td style="padding: 0.1em 0.8em 0.5em;">Voucher Amount: <span id="VoucherNameadd"></span></td></tr>'+
	   '</table></div>'},
	   {xtype:'spacer',html:'<div>'+
	   '<table width="100%" cellpadding="0" cellspacing="1" border="0" class="x-list">'+
	   	'<tr class="x-Table-item "><td valign="top"  >Recipients : <p><span id="voucherRecipients"  ></span></p></td></tr>'+
		'<tr class="x-Table-item "><td valign="top" class="clubimg" >Expires On :<p><span id="voucherExpires"></span></p></td></tr>'+
		'<tr class="x-Table-item "><td valign="top" class="clubimg" >Fine Print :<p><span id="VoucherFinePrint"></span></p></td></tr>'+
		'<tr class="x-Table-item "><td valign="top" class="clubimg" >Redeem at :<p><span id="voucherRedeem"></span></p> </td></tr>'+
		'<tr class="x-Table-item "><td valign="top" class="clubimg" >Universal Fine Print :<p><span id="voucherUniversal"></span></p> </span></td></tr>'+
		'<tr class="x-Table-item "><td valign="top" class="clubimg" ><input type="hidden" id="hdnVId"><input type="button" class="x-button x-button-normal but_class" value="redeem/use" onclick="getVoucherId()" ></td></tr>'+
	   '</table></div>'},{xtype:'spacer',style:'height:50px;'} ]
	
});
Ext.reg('VoucherDescriptionform', App.views.VoucherDescription);
function getVoucherId(){
	var VId=document.getElementById('hdnVId').value;
	fndeleteVoucher(VId);
	Ext.dispatch({
								controller: 'EbarTab',
								action: 'MyVouchers',
								data:'back',
								historyUrl: 'EbarTab/MyVouchers',
								animation: {
									type: 'slide',
									 direction:'right'
								},
							});
}


function SystemNotification() {
}

SystemNotification.prototype.notificationEnabled = false;

SystemNotification.prototype.newCount = 0; //to keep track of multiple notifications events

SystemNotification.prototype.enableNotification = function () {
    this.notificationEnabled = true;
};

SystemNotification.prototype.disableNotification = function () {
    this.notificationEnabled = false;
};

SystemNotification.prototype.onBackground = function () {
    this.enableNotification();
};

SystemNotification.prototype.onForeground = function () {
    this.disableNotification();
};

SystemNotification.prototype.createStatusBarNotification = function (contentTitle, contentText, tickerText) {
    PhoneGap.exec(null, null, "systemNotification", "createStatusBarNotification", [contentTitle, contentText, tickerText]);
};

SystemNotification.prototype.updateNotification = function (contentText, tickerText, number) {
    this.newCount++;
    var contentTitle = "my title";
    if (this.newCount === 1) {
        this.createStatusBarNotification(contentTitle, contentText, tickerText);
    } else {
        PhoneGap.exec(null, null, "systemNotification", "updateNotification", [contentTitle, contentText, this.newCount]);
        this.showTickerText(tickerText);  //optional
    }
};

SystemNotification.prototype.cancelNotification = function (contentText) {
    this.newCount--;
    if (this.newCount === 0) {
        PhoneGap.exec(null, null, "systemNotification", "cancelNotification", []);
    }
    else {
	//updating the notification
        var contentTitle = "my title";
        PhoneGap.exec(null, null, "systemNotification", "updateNotification", [contentTitle, contentText, this.newCount]);
    }
};

SystemNotification.prototype.showTickerText = function (tickerText) {
    PhoneGap.exec(null, null, "systemNotification", "showTickerText", [tickerText]);
};

SystemNotification.prototype.touch = function () {
    PhoneGap.exec(null, null, "systemNotification", "touch", []);
};

PhoneGap.addConstructor(function () {
    if (typeof(navigator.systemNotification) == "undefined") {
        navigator.systemNotification = new SystemNotification();
        navigator.systemNotification.touch();  //this ensures that the plugin is added when phonegap kicks off
    }
});

App.views.WhereIsTheCase = Ext.extend(Ext.Panel,{
    fullscreen: true,
	sortable  : true,
	  scroll:true,
	  style:'padding:0px',
	id:'WhereIsTheCaseView',
	//style:'padding:0px 10px 0px 10px',
	cls:'black_gray',
items:[{xtype:'spacer',style:'height:50px;'},
	   {xtype:'spacer',html:'<div>'+
	   '<table width="100%" cellpadding="0" cellspacing="1" border="0">'+
	   	'<tr ><td valign="top" align="center"><img id="WhereIsTheCaseImg" src="" style="padding: 0.5em 0.8em;width:200px;height:200" onerror="fnItemNoImage(this)" /></td></tr>'+
	   '</table></div>'},{ xtype:'spacer',cls:'setPageTop',
	   	 html:'<div style="margin-right:5px;margin-left:5px;">'+
		      '<table width="100%" cellpadding="0" cellspacing="1" border="0" class="x-list">'+
			  '<tr class="x-Table-item "><td valign="top" ><p>Title</p></td></tr>'+
			  '<tr class="x-Table-item "><td valign="top" ><p><span id="TheCaseTitle"></span></p></td></tr>'+
			  '<tr class="x-Table-item "><td valign="top" ><p>Description</p></td></tr>'+
			  '<tr class="x-Table-item "><td valign="top" ><p><span id="TheCaseDescription"></span><input type="hidden" id="hdnWhatIsTheCase"></p></td></tr>'+
			  '<tr class="x-Table-item "><td >YOUR GUESS:</td></tr>'+
			  '<tr class="x-Table-item "><td ><input name="caseguess" type="text" value="where?" size="40" maxlength="50" id="CassGuessAns" /></td></tr>'+
			  '<tr class="x-Table-item "><td ><input type="button" class="x-button x-button-normal but_class" value="Submit Guess" onclick="fnsaveCaseAns()"  ></td></tr>'+
			  '</table><div>'
	},{xtype:'spacer',style:'height:50px;'}]
	
});
Ext.reg('WhereIsTheCase', App.views.WhereIsTheCase);
function fnsaveCaseAns(){
	var CassGuessAns=document.getElementById('CassGuessAns').value;
	var WhatIsTheCaseId=document.getElementById('hdnWhatIsTheCase').value;
	var userId=localStorage.getItem('UserId');
	if(CassGuessAns=='' || CassGuessAns=='where?'){
		Ext.Msg.alert('','Please Enter Cass Answer', Ext.emptyFn);
	}else{
		myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
		myLoader.show();
		Ext.util.JSONP.request({
		url: url,
		callbackKey: 'callback',
		params: { action:'SaveCaseAns',CassGuessAns:CassGuessAns,WhatIsTheCaseId:WhatIsTheCaseId,userId:userId},
		callback: function(data) {myLoader.hide();
			if (data.success) {
					Ext.Msg.alert('',data.rows, Ext.emptyFn);
			}else{
				Ext.Msg.alert('',data.rows, Ext.emptyFn);
			}
		}
		});
	}
}

// JavaScript Document
App.views.EventGuestlists = Ext.extend(Ext.Panel,{
    //fullscreen: true,
	sortable  : true,
	  scroll:true,
	id:'EventGuestListView',
	style:'padding:0px',
	cls:'black_gray',
	layout:'fit',
items:[ {
	   xtype:'list',
	    store: EventGuestlists,
		//	styleHtmlContent: true,
		//layout:'fit',
		emptyText :'<b style="color:#fff;">Data Not Found...</b>',
		itemTpl:['<tpl for=".">',
                 '<table style="width: 100%;">',
					'<tr >',
					'<td class="img" style="width: 70px;"><img width="60px" height="60px" onerror="fnItemNoImage(this)"  src="'+SreverURL+'Gallery/{ImageFile}"  alt=""/></td>',
					'<td style="text-align:left">',
					'<b>{Name}</b>',
					'<p style="text-align:left;color: #AFAFAF;">{EventDate}</p>',
					'</td>',
					'<td style="text-align:right">',
					   '<p style="font-size: 18px;">{countGuest}',
					   '</p>',
					'</td>',
					'</tr>',
				'</table>',
           '</tpl>'
           ],
		listeners:{
			 "itemtap": function(list, index, item, e) {  fnsetEventInvetionDesc(list.getStore().getAt(index));}
		}
	   }  ]
	
});
Ext.reg('EventGuestlistsform', App.views.EventGuestlists);


// JavaScript Document
App.views.TabPanel = Ext.extend(Ext.Panel,{
    fullscreen: true,
	sortable  : true,
	  scroll:true,
	id:'UserRecieptform',
	//style:'padding:0px 10px 0px 10px',
	cls:'black_gray',
	tabBar: {
		dock: 'bottom',
		layout: {
			pack: 'center'
		},
		cardSwitchAnimation: {
			type: 'slide',
			cover: true
		},
		listeners:{
			change: function(ctrl, tab, card){

			}
		}
	},
	layout: {
			pack: 'center'
		},
	items:[ {xtype:'spacer',style:'height:70px;'},{
		           xtype: 'button',
                    name : 'btnUploadPhoto',
					id:'btnUploadPhoto',
					cls:'padding',
					text:'upload phone',handler:function(){
							fnUploadReceiptPhoto();
						}
                },{xtype:'spacer',style:'height:20px;'},{
					 xtype:'fieldset',
                     cls:'padding',
					layout: {
						pack: 'center',align:'center'
						},
                    defaults: {
                        required: false,
                        labelAlign: 'left',
                        labelWidth: '20%'
                    },
                    items:[
                {
                    xtype: 'textfield',
					inputType:'tel',
                    name : 'txtamount',
					cls:'login',
					id:'txtamount',
                    label: 'Amount',
					listeners:{
						/*keypress:function(e){
							fnCheckPrice(this,e);
						}*/
						/*'keypress': function(my, e) {
						alert(e.getKey()); //this is don't work
						}*/
					}
                },{
					 xtype: 'selectfield',
                    name : 'slfClubName',
					id:'slfClubName',
					cls:'login',
					store:ClubStore,
					displayField: 'name',
					valueField : 'id',
                    label: 'Club',
					listeners:{
					   change :function(){ if(this.value!=0){fnsetclubVender(this.value);}}
				   }
				},{
					 xtype: 'textfield',
                    name : 'txtClubvendor',
					cls:'login',
					id:'txtClubvendor',
					//hidden:true,
                    label: 'vendor'
				},{
					 xtype: 'datepickerfield',
                    name : 'txtreceiptdate',
					cls:'login',
					id:'txtreceiptdate',
                    label: 'Receipt Date',
					value:{year: curdate.getFullYear(), day: curdate.getDate(), month: curdate.getMonth()}
				},{
					 xtype: 'hiddenfield',
					id:'hidreceiptImg',
                    name: 'hidreceiptImg'
				}]},{
					layout: {
						pack : 'center',
					},
					items:[{xtype:'spacer',height :20},{
						xtype:'button',text:'Upload Receipts',cls:'padding',handler:function(){
							fnUploadReceipt();
						}
					}]
		  }]
	
});
Ext.reg('UploadReceipts', App.views.TabPanel);


App.views.SearchIndex=Ext.extend(Ext.Panel,{
	 cls: 'search-panel',
     fullscreen: true,
	 id:'SearchClubIndex',
     floating: true,layout:'fit',
     dockedItems:[{
     	xtype:'toolbar',
     	items:[{
     		xtype:'searchfield',
     		flex:1,
				listeners: {
				keyup: function (field, e) {
					var value = field.getValue();
					/*var tempData = [];
					if(value.length==1){
						if(e.browserEvent.keyCode != 8){
							MyClubstore.each(function (record) {
							tempData.push(record);
						});
							MySearchClubstore.loadData(tempData);
						}
					}
					if(value.length==0){
						if (e.browserEvent.keyCode == 8) {
							MySearchClubstore.each(function (record) {
								tempData.push(record);
						});
							MyClubstore.loadData(tempData);
					 }
					}
					if (value.length > 0) {
						MySearchClubstore.each(function (record) {
							if (record.get('Name').toLowerCase().match(value.toLowerCase()))
							tempData.push(record);
						});
					MyClubstore.loadData(tempData);
					}*/
					var tempData = [];
					if(value.length==0){
						if (e.browserEvent.keyCode == 8) {
							MyClubstore.each(function (record) {
								tempData.push(record);
						});
							MySearchClubstore.loadData(tempData);
					 }
					}
					if (value.length > 0) {
						MyClubstore.each(function (record) {
							if (record.get('Name').toLowerCase().match(value.toLowerCase()))
							tempData.push(record);
						});
					MySearchClubstore.loadData(tempData);
					}
				}
			}
     	},{
     		text:'Cancel',
     		itemId:'cancelSearchBtn',
     		ui:'action'
     	}]
     }],
	 items:[ { xtype:'list',
	    store: MySearchClubstore,
		
		emptyText :'No Data Found',
		itemTpl:['<tpl for=".">',
                 '<table style="width: 100%;">',
					'<tr >',
					'<td class="img" style="width: 70px;"><img width="60px" height="60px" onerror="fnItemNoImage(this)"  src="'+SreverURL+'Gallery/{FileImage}"  alt=""/></td>',
					'<td style="text-align:left">',
						'<b style="font-size: 16px;">{Name}</b>',
						'<p style="text-align:left;color: #ACACAC;">{SiteURL}</p>',
					'</td>',
					'</tr>',
				'</table>',
           '</tpl>'
           ],
		listeners:{
			 "itemtap": function(list, index, item, e) { fnsetcluDesc(list.getStore().getAt(index));Ext.getCmp('SearchClubIndex').hide();}
		}
	   }]
});
Ext.reg('SearchIndex',App.views.SearchIndex);


// JavaScript Document
var UserEmailTrash = new Ext.TabBar({
    dock : 'top',
	activeItem:1,
	scroll:'horizontal',
	id:'EbarTabEmailSubMenu',
	 hidden: Ext.is.Phone ? true : false ,
    ui   : 'dark',
	layout: {
						pack : 'center',
	},
    items: [
        {
            text: 'Inbox',
			handler:function(){			fnpageSubMenuNav(12);			}
        },
        {
            text: 'Outbox',
			handler:function(){			fnpageSubMenuNav(13);			}
        },{
            text: 'Trash',
			id:'SubMenuTrash',
			handler:function(){			fnpageSubMenuNav(14);			}
		},{
            text: 'Compose Mail',
			handler:function(){			fnpageSubMenuNav(15);			}
		}
    ]
});
App.views.UserTrashPage = Ext.extend(Ext.Panel,{
    fullscreen: true,
	sortable  : true,
	  scroll:true,
	id:'UserTrashView',
	dockedItems: [UserEmailTrash],
	cls:'black_gray',
	layout:'fit',
	items:[ 
	   {
	   xtype:'list',
	    store: UserTrashstore,
		emptyText :'<b style="color:#fff;">Data Not Found...</b>',
		itemTpl:['<tpl for=".">',
                 '<table style="width: 100%;" class="setBgColor">',
					'<tr >',
					'<td style="text-align:left">',
						'<b style="font-size: 16px;">{UserName}</b>',
						'<p style="text-align:left;color: #ACACAC;">{Subject}</p>',
					'</td>',
					'<td  style="text-align:right;width: 40%;">',
					   '<p style="font-weight:normal;font-size:14px;">{MailDate}',
					   '</p>',
					'</td>',
					'</tr>',
				'</table>',
           '</tpl>'
           ]
	   } 
	   ]
	
});
Ext.reg('UserTrash', App.views.UserTrashPage);



var profile='';var ReciptUploadPhoto=0;







var isOnline='';
var geocoder = new google.maps.Geocoder();
var address = "";
var clubName='';
var position='';
var MoreCount=1;
var swipeButton=null;
 var posi=0;
 var searchMembar=0;
 var req=0;
 var BackpageName='';
 var Bidpage='AuctionsItem';




















































var FCFSbar = new Ext.TabBar({
    dock : 'top',
	activeItem:3,
	scroll:'horizontal',
	id:'FCFSSubMenu',
	 hidden: Ext.is.Phone ? true : false,
	cls: 'demo-list',
    ui   : 'dark',
	layout: {
						pack : 'center',
	},
    items: [
        {
            text: 'Featured Rewards',
			
			handler:function(){
				fnpageSubMenuNav(9);
			}
        },
        {
            text: 'Mention e-BarTab',
			
			handler:function(){
				fnpageSubMenuNav(10);
			}
        },{
            text: 'Be The First',
			id:'SubMenuFCFS',
			handler:function(){
				fnpageSubMenuNav(11);
			}
		}
    ]
});
App.views.FCFSpage = Ext.extend(Ext.Panel,{
	sortable  : true,
	  scroll:true,
	id:'FCFSpageView',layout:'fit',
	style:'padding:0px',
	dockedItems: [FCFSbar],
	cls:'black_gray',
	tabBar: {
		dock: 'bottom',
		layout: {
			pack: 'center'
		},
		cardSwitchAnimation: {
			type: 'slide',
			cover: true
		},
		listeners:{
			change: function(ctrl, tab, card){

			}
		}
	},
	
items:[{
	   xtype:'list',
	    store: FCFSstore,
		//styleHtmlContent: true,
		emptyText :'No Data Found',
		itemTpl:['<tpl for=".">',
                 '<table style="width: 100%;">',
					'<tr >',
					'<td class="img" style="width: 70px;"><img width="60px" onerror="fnItemNoImage(this)" height="60px" src="'+SreverURL+'Gallery/{ImageFileName}"  alt=""/></td>',
					'<td style="text-align:left">',
						'<b style="font-size: 17px; font-weight: bold;">{Name}</b>',
						'<p style="text-align:left;color: #ACACAC;">Minimum Required Points:{MinimumReqiiredPoint}</p>',
					'</td>',
					'</tr>',
				'</table>',
           '</tpl>'
           ],
		listeners:{
			 "itemtap": function(list, index, item, e) {  fnsetFCFSItemDesc(list.getStore().getAt(index));}
		}
	   }  ]
	
});
Ext.reg('FCFSform', App.views.FCFSpage);

var NavSettingBut=new Ext.Panel({
		height:200,
		width:200,
		floating: true,
		dock: 'bottom',
		scroll:false,
		autoRender: true,
		centered: true,
		id:'NavSettingButActionSheet',
		layout: 'fit',
	   items:[{
			  		xtype:'list',
					store: NavSettingButstore,
					itemTpl:'{text}',
				listeners:{
					 "itemtap": function(list, index, item, e) {  var Nav=list.getStore().getAt(index);
						 if(Nav.data.id==18){
							 window.location.href='http://www.eliteclubaccess.com/e-BarTab/';
						}else{
							 NavSettingBut.setVisible(false);fnpageNav(Nav.data.id);
						 }
					 }
			}	
	}]
	  
	
		});
NavSettingBut.setVisible(false);
NavSettingBut.setPosition(Ext.orientation == 'landscape' ? 500 : 280, Ext.orientation == 'landscape' ? 280 : 430);
var bar = new Ext.TabBar({
    dock : 'bottom',
	activeItem:1,
	scroll:'horizontal',
	id:'EbarTabMainMenu',
    ui   : 'dark',
	layout: {
						pack : 'center',
	},
    items: [
        {
            text: 'My Profile',
			 hidden: Ext.is.Phone ? true : false ,
			id:'MainMenuProfile',
			iconCls:'user'
			,handler:function(){
				fnpageNav(1);
			}
        },
        {
            text: 'My Receipts',
			iconCls:'recipet',
			id:'MainMenurecipet'
			,handler:function(){
				fnpageNav(2);
			}
        },{
            text: 'My Vouchers',
			 hidden: Ext.is.Phone ? true : false,
			id:'MainMenuMyvoucher',
			iconCls:'MyVoucher'
			,handler:function(){
				fnpageNav(3);
			}
        },{
            text: 'Auction Items',	 hidden: Ext.is.Phone ? true : false,
			id:'MainMenuAuction',
			iconCls:'Auction'
			,handler:function(){
				fnpageNav(4);
			}
        },{
            text: 'Clubs',
			id:'MainMenuClub',
			hidden: Ext.is.Phone ? true : false,
			iconCls:'club'
			,handler:function(){
				fnpageNav(5);
			}
        },{
            text: 'Guest Lists',
			id:'MainMenuGuestList',
			iconCls:'guestList'
			,handler:function(){
				fnpageNav(6);
			}
        },{
            text: 'Upcoming Events',
			id:'MainMenuEvent',
			iconCls:'cal'
			,handler:function(){
				fnpageNav(7);
			}
        },{
            text: 'Rewards',
			id:'MainMenuRewards',
			iconCls:'Reward'
			,handler:function(){
				if(Ext.is.Phone){
					fnpageNav(20);
				}else{
					fnpageNav(8);
				}
			}
        },{
            text: 'Logout',
			 hidden: Ext.is.Phone ? true : false,
			id:'MainMenulogoutBtn',
			iconCls:'logout'
			,handler:function(){
				fnpageNav(17);
			}
        },{
            text: 'Quick Links',
			 hidden: Ext.is.Phone ? false :true ,
			id:'MainMenusettingsBtn',
			iconCls:'settings'
			,handler:function(){
					NavSettingBut.setVisible(true);
						NavSettingBut.setPosition(document.body.offsetWidth /2  - 100 , document.body.offsetHeight /2 - 100);
			}
        }
    ]
});

var Phonemainbar = new Ext.NestedList({
    fullscreen: true,
   // title: 'Main Menu',
    displayField: 'text',
	updateTitleText :false,
    store: store,
	listeners:{
			 "itemtap": function(list, index, item, e) {  
			 	var Nav=list.getStore().getAt(index);
				if(Nav.data.id==16){ fnopenUploadReceipt();App.views.Phonebar.hide();
				}else if(Nav.data.id=='9' || Nav.data.id=='10' || Nav.data.id=='11' || Nav.data.id=='12' || Nav.data.id=='13' || Nav.data.id=='14' || Nav.data.id=='15' ){ fnpageSubMenuNav(Nav.data.id);App.views.Phonebar.hide();
				}else{	fnpageNav(Nav.data.id); if( Nav.data.id=='4' || Nav.data.id=='5' || Nav.data.id=='6' || Nav.data.id=='7' || Nav.data.id=='17'){ App.views.Phonebar.hide();}}
			 }
	}
});

 App.views.Phonebar = new Ext.Panel({
        floating: true,
		modal: true,
		centered: false,
		title: 'Main Menu',
		width: Ext.is.Phone ? 140 : 140,
		height: Ext.is.Phone ? 250 : 250,
		styleHtmlContent: true,
		scroll: 'vertical',
		cls:'filter',
		layout:'fit',
		id:'EbarTabNavigationMainMenu',
    items: [Phonemainbar ],
});
  var filter = function(btn, event) {
	       App.views.Phonebar.showBy(btn);
        };
App.views.Viewport = Ext.extend(Ext.Panel, {
   fullscreen: true,
    layout: 'card',
	  scroll:false,
    cardSwitchAnimation: 'slide',
	id:'EbarTabVieport',
	cls:'Vieport bodyBG',
    dockedItems: [
        {
        	xtype: 'toolbar',
        	title:'Login Form',
			cls:'LoginFormtoolbar',
			id:'EbarTabToolBar',
        	items: [
    	        {
    	            text:'Back',
    	            itemId: 'backBtn',
					id:'backBtn',
					iconCls:'back',
    	            ui: 'back',
    	        }, {
    	            itemId: 'NavigationBtn',
					iconCls:'list',
					iconMask: true,
					id:'NavigationBtn',
					ui: 'action',
					  handler: filter,
         			   scope: this
    	         },{xtype: 'spacer'},
				{
    	            text: 'Upload Receipt',
			        itemId: 'UploadreceiptBtn',
					 hidden: true  ,
					id:'UploadreceiptBtn'
    	        },{
				    itemId: 'FullSiteBtn',
					text:'Web',
					id:'FullSiteBtn',
					 hidden: true  ,
					ui: 'action',
					handler:function(){
						window.location.href='http://www.eliteclubaccess.com/e-BarTab/';
					}
			   }
    	    ],
        },bar
    ],
});



App.views.CountactsView = Ext.extend(Ext.Panel,{
    fullscreen: true,
	sortable  : true,
	  scroll:true,
	id:'PcountactView',
	cls:'black_gray uploadimgCls',
	 layout:'fit',
	items:[{
		   xtype:'list',
		   layout:'fit',
		   store:AllMembarInSite,
		   id:'AllMembarInSiteCount',
		style:'padding:0px',
		emptyText :'No Data Found',
		cls:'Editradio black_gray',
		itemTpl:['<div class=" x-field x-field-radio x-label-align-left" ><div class="x-form-label"  style="width: 60%;">',
				 '<span >',
				  '<table style="width: 100%;">',
					'<tr >',
						'<td style="text-align:left">',
						'<b style="font-size: 17px;font-weight:bold;">{UserName}</b>',
					'</td>',
					'</tr>',					
				'</table>',
				 '</span></div>',
				 '<input  type="checkbox" name="Con_email" class="x-input-radio" tabindex="-1" value="{Email}-{UserName}" ></div>']
		   }],
	dockedItems:[{
				 xtype: 'button',
				  dock : 'bottom',
				name : 'Done',
				id:'SelectMember',
				cls:'padding but_class',
				text:'Done',handler:function(){
					fnselectname();
					}
	},{xtype:'toolbar',
     	items:[{xtype:'searchfield',id:'txtSearchCountactMembar',flex:1,			  
			   listeners: {
				   keyup: function (field, e) {
					   var value = field.getValue();
						var tempData= new Array();
						if(value.length==0){
							var i=0;
							SearchAllMembarInSite.each(function (record) {
								if(i<30){	tempData.push(record); } 
								i++;
							}); AllMembarInSite.loadData(tempData); 
							if(tempData.length==30){ 
									 if(document.getElementById('PullMoreMemberId')){
											var par=document.getElementById('PullMoreMemberId').parentNode
											document.getElementById(par.id).removeChild(document.getElementById('PullMoreMemberId'));
										}
									var chid=document.getElementById('AllMembarInSiteCount').childNodes[0];
									el=document.createElement("Div");
									el.id='PullMoreMemberId';
									el.style.height="300px";
									el.style.padding="0px";
									el.style.margin="0px";
									 el.innerHTML='<table style="padding:10px;width:100%;height:54px;background-color:#F1F1F1;"  onclick="fnloadSiteMembar()"><tr><td><p style="color:#3692FE;font-size:14px;vertical-align:middle;text-align: left;padding: 10px;"><b style="border:none;background-color:transparent;color:#3692FE;">Click For More...</b></p></td></tr></table>';
									document.getElementById(chid.id).appendChild(el);
								}
						  MoreCount=0;
						}
						if (value.length > 0) {
								SearchAllMembarInSite.each(function (record) {
									if (record.get('UserName').toLowerCase().match(value.toLowerCase())){  tempData.push(record);} 
									if (record.get('Email').toLowerCase().match(value.toLowerCase())){  tempData.push(record);}
								});
								   AllMembarInSite.loadData(tempData);
						  }	
					   }
				}
		}]
		
	}]
});
Ext.reg('Countactsform', App.views.CountactsView);

// JavaScript Document
App.views.AustionDescription = Ext.extend(Ext.Panel,{
    fullscreen: true,
	  scroll:true,
	id:'AustionDescriptionView',
	style:'padding:0px',
	cls:'black_gray',
items:[{xtype:'spacer',style:'height:50px;'},
	   {xtype:'spacer',html:'<div>'+
	   '<table width="100%" cellpadding="0" cellspacing="1" border="0">'+
	   	'<tr ><td valign="top" align="center"><img id="AustionImg" src="" style="padding: 0.5em 0.8em;" onerror="fnItemNoImage(this)" /></td></tr>'+
		'<tr><td valign="top" align="center"><div id="AuctionAssociateImg" valign="top" align="center"></div></td></tr>'+
	   '</table></div>'},{ xtype:'spacer',cls:'setPageTop',
	   	 html:'<div style="margin-right:5px;margin-left:5px;">'+
		      '<table width="100%" cellpadding="0" cellspacing="1" border="0" class="x-list">'+
			   '<tr class="x-Table-item "><td valign="top" >Name<p><span id="AustionName"></span></p></td></tr>'+
			  '<tr class="x-Table-item "><td valign="top" >Item Avalible For Membership Level:<p><span id="AustionLevel"></span></p></td></tr>'+
			  '<tr class="x-Table-item "><td valign="top" >Leading Bidder:<p><span id="LeadingBidder"></span></p></td></tr>'+
			  '<tr class="x-Table-item "><td valign="top" >Associated Images: <p><span id="AssociatedImages"></span></p><input type="hidden" id="hdnBidID" name="hdnBidID"></td></tr>'+
			  '<tr class="x-Table-item "><td >Description:<p><span id="AustionDescription"></span></p></td></tr>'+
			  '<tr class="x-Table-item "  align="center"><td ><input type="tel" id="txtBidPoint" name="txtBidPoint" value="1"><input type="hidden" id="hdnBidPoint"><input type="hidden" id="hdnBasicBidPrice"></td></tr>'+
			  '<tr class="x-Table-item "  align="center"><td ><input type="button" class="x-button x-button-normal but_class" value="Place Your Bid" onclick="fnAcstionBid();" ></td></tr>'+
			  '</table><div>'
	},{xtype:'spacer',style:'height:50px;'} ]
	
});
Ext.reg('AustionDescriptionform', App.views.AustionDescription);
var AuctionImgPopup=new Ext.Panel({
		height:300,
		width:300,
		floating: true,
		scroll:false,
		autoRender: true,
		centered: true,
		id:'AuctionImgPopupActionSheet',
		layout: 'fit',
		dockedItems:[{
				  xtype:'button',
				   dock: 'bottom',
     		text:'Cancel',
     		ui:'action',
			style:'color:#000;',
			cls:'but_class'
			,handler:function(){
				AuctionImgPopup.setVisible(false);
			}
     	}],
	   items:[{xtype:'spacer',id:'AuctionImgPopup',style:'height:200px;width:300;border:1px sold red;',html:'<div align="center"><img src="" id="ImgAuctionAssoc"  style="padding: 0.5em 0.8em;height:200px;width:200px;"/></div>'} ]
		});
AuctionImgPopup.setVisible(false);
AuctionImgPopup.setPosition(Ext.orientation == 'landscape' ? 500 : 280, Ext.orientation == 'landscape' ? 280 : 430);


// JavaScript Document
var BragtabOption = new Ext.TabBar({
    dock : 'top',
	activeItem:1,
	scroll:'horizontal',
    ui   : 'dark',
	layout: {
						pack : 'center',
	},
    items: [
       {text: 'Global',id:'GlobalBragTabOptionsub',handler:function(){fnsetWeekPage(6);  } },
       {text: 'City',id:'CityBragOptionsub',handler:function(){fnsetWeekPage(7);
       fngetBragTab('City');
       }},
	   {text: 'Club',id:'ClubBragOptionsub',handler:function(){fnsetWeekPage(8); 
        fngetBragTab('Club');
       }},
	   {text: 'State',id:'StateBragOptionsub',handler:function(){fnsetWeekPage(9);
       fngetBragTab('State');
       }}
    ]
});
var ddFill1 = new Ext.data.JsonStore({
    root: 'rows',
    fields: ['id','ds',],
    data   : [
                   {
                        id : 'Select LeaderBoard',
                        ds : 'Select LeaderBoard'
                    },
                    {
                        id : 'LeadrBoard',
                        ds : 'LeadrBoard'
                    },
                    {
                        id : 'Special',
                        ds : 'Special'
                    }
                ]
});

App.views.BragtabPage = Ext.extend(Ext.Panel,{
    fullscreen: true,
	  scroll:true,
	id:'BragtabPageView',
	dockedItems: [BragtabOption],
	cls:'black_gray',
	layout:'card',
	items:[{
		   xtype:'list',
		   fullscreen: true,
		   id:'GlobalBragTabView',
          store: GlobalBragtore,
		emptyText :'No Data Found',
		itemTpl:['<tpl for=".">',
                 '<table style="width: 100%;" id="test">',
					'<tr >',
					'<td style="text-align:left">',
						'<b style="font-size: 16px;">User Name : {UserName}</b>',
					'</td>',
					'<td  style="text-align:right">',
					   '<p style="font-weight:normal;font-size:14px;">Tab : ${Amount}',
					   '</p>',
					   '<p style="color: #989898;">	Prize : <span> {PrizeName}</span></p>',
					'</td>',
					'</tr>',
				'</table>',
           '</tpl>'
		   ]
		},{
			 xtype:'panel',
			    id:'CityBragView',
				layout:'fit',
			dockedItems: [{
				    xtype:'toolbar',
				      dock : 'top',
					  cls:'MyTool',
					  layout:'hbox',
					   items: [{
								 xtype        : 'selectfield',
										name         : 'one',
										displayField : 'ds',
										style :'width: 40%;',
										valueField:'ds',
										id:'CityCom',
										store        : ddFill1,
										listeners : {
											change : function(cb, value) {
												myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
													myLoader.show();
													Ext.util.JSONP.request({
													url: url,
													callbackKey: 'callback',
													params: { action:'LBTypeCitySelectBox',LBType:value},
													callback: function(data) {	myLoader.hide();
														if (data.success) {
														    selectcityStor.loadData(data.poster);
															 CityBragstore.loadData(data.row);
														}
													}
													});
											}
										}
									},{
								         xtype        : 'selectfield',
										id:'IdCity',
										store:selectcityStor,
										style :'width: 40%;',
										value:'Please Select City',
										displayField: 'CityName',
										valueField:'CityName',
										listeners : {
											change : function(cb, value) {
												myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
													myLoader.show();
													var LBType=Ext.getCmp('CityCom').getValue();
													Ext.util.JSONP.request({
													url: url,
													callbackKey: 'callback',
													params: { action:'SearchBragByCity',CityName:value,LBType:LBType},
													callback: function(data) {	myLoader.hide();
														if (data.success) {
																 ClubBragstore.loadData(data.row);
														}
													}
													});
											}
										}
									}]
				   }],
			items:[{
					   xtype:'list',
					   fullscreen: true,
					  store: CityBragstore,
					emptyText :'No Data Found',
					itemTpl:['<tpl for=".">',
							 '<table style="width: 100%;" id="test">',
								'<tr >',
								'<td style="text-align:left">',
									'<b style="font-size: 16px;">User Name : {UserName}</b>',
									'<p style="text-align:left;color: #989898;">City : {Subtype_Value}</p>',
								'</td>',
								'<td  style="text-align:right">',
								   '<p style="font-weight:normal;font-size:14px;">Tab : ${Amount}',
								   '</p>',
								   '<p style="color: #989898;">	Prize : <span> {PrizeName}</span></p>',
								'</td>',
								'</tr>',
							'</table>',
					   '</tpl>'
					   ]
				   }]
		},{
			 xtype:'panel',
			    id:'ClubBragView',
				layout:'fit',
			dockedItems: [{
				    xtype:'toolbar',
				      dock : 'top',
					  cls:'MyTool',
					   layout:'hbox',
					   items: [{
								 xtype        : 'selectfield',
										name         : 'one',
										displayField : 'ds',
										style :'width: 40%;',
										valueField:'ds',
										id:'selclubLeads',	
										store        : ddFill1,
										listeners : {
											change : function(cb, value) {
												myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
													myLoader.show();
													Ext.util.JSONP.request({
													url: url,
													callbackKey: 'callback',
													params: { action:'LBTypeClubSelectBox',LBType:value},
													callback: function(data) {	myLoader.hide();
														if (data.success) {
														    selectcluStor.loadData(data.poster);
															 ClubBragstore.loadData(data.row);
														}
													}
													});
											}
										}
									},{
							        	 xtype        : 'selectfield',
										id:'IdClub',
										store:selectcluStor,
										style :'width: 40%;',
										displayField: 'name',
										valueField:'id',
										value:'Please Select Club',
										listeners : {
											change : function(cb, value) {
												myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
													myLoader.show();
													var LBType=Ext.getCmp('selclubLeads').getValue();
													Ext.util.JSONP.request({
													url: url,
													callbackKey: 'callback',
													params: { action:'SearchBragByclub',ClubName:value,LBType:LBType},
													callback: function(data) {	myLoader.hide();
														if (data.success) {
																 ClubBragstore.loadData(data.row);
														}
													}
													});
											}
										}
									}]
				   }],
			items:[{
		   xtype:'list',
		   fullscreen: true,
          store: ClubBragstore,
		emptyText :'No Data Found',
		itemTpl:['<tpl for=".">',
                 '<table style="width: 100%;" id="test">',
					'<tr >',
					'<td style="text-align:left">',
						'<b style="font-size: 16px;">User Name : {UserName}</b>',
						'<p style="text-align:left;color: #989898;">Club Name : {ClubName}</p>',
					'</td>',
					'<td  style="text-align:right">',
					   '<p style="font-weight:normal;font-size:14px;">Tab : ${Amount}',
					   '</p>',
					   '<p style="color: #989898;">	Prize : <span> {PrizeName}</span></p>',
					'</td>',
					'</tr>',
				'</table>',
           '</tpl>'
           ],
		}]
		},{
			 xtype:'panel',
			    id:'StateBragView',
				layout:'card',
			dockedItems: [{
				    xtype:'toolbar',
    				  cls:'MyTool',
					   items: [{
							     	 xtype        : 'selectfield',
									  name         : 'one',
										displayField : 'ds',
										valueField:'ds',
										id:'selStateLeads',
										style :'width: 40%;',
										store        : ddFill1,
										listeners : {
											change : function(cb, value) {
												myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
													myLoader.show();
													Ext.util.JSONP.request({
													url: url,
													callbackKey: 'callback',
													params: { action:'LBTypeStateSelectBox',LBType:value},
													callback: function(data) {	myLoader.hide();
														if (data.success) {
														    selectStateStore.loadData(data.poster);
															 StateBragstore.loadData(data.row);
														}
													}
													});
											}
										}
									},{
								 xtype        : 'selectfield',
										id:'IdState',
										store:selectStateStore,
										displayField: 'zone_name',
										valueField:'zone_id',
										style :'width: 40%;',
										value:'Please Select State',
										listeners : {
											change : function(cb, value) {
												myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
													myLoader.show();
													var LBType=Ext.getCmp('selStateLeads').getValue();
													Ext.util.JSONP.request({
													url: url,
													callbackKey: 'callback',
													params: { action:'SearchBragByState',StateName:value,LBType:LBType},
													callback: function(data) {	myLoader.hide();
														if (data.success) {
																 StateBragstore.loadData(data.row);
														}
													}
													});
											}
										}
									}]
				   }],
			items:[{
					   xtype:'list',
					   fullscreen: true,
					  store: StateBragstore,
					emptyText :'No Data Found',
					itemTpl:['<tpl for=".">',
							 '<table style="width: 100%;" id="test">',
								'<tr >',
								'<td style="text-align:left">',
									'<b style="font-size: 16px;">User Name : {UserName}</b>',
									'<p style="text-align:left;color: #989898;">State : {zone_name}</p>',
								'</td>',
								'<td  style="text-align:right">',
								   '<p style="font-weight:normal;font-size:14px;">Tab : ${Amount}',
								   '</p>',
								   '<p style="color: #989898;">	Prize : <span> {PrizeName}</span></p>',
								'</td>',
								'</tr>',
							'</table>',
					   '</tpl>'
					   ]
					}]
		}]
});
Ext.reg('BragtabPage', App.views.BragtabPage);


// JavaScript Document
var PromoterOption = new Ext.TabBar({
    dock : 'top',
	activeItem:1,
	scroll:'horizontal',
    ui   : 'dark',
	layout: {
						pack : 'center',
	},
    items: [
        {text: 'Current Promotion',id:'CurrentPromoterOptionsub',handler:function(){fnsetWeekPage(4);} },
       {text: 'Featured Promotion',id:'FeaturedPromoterOptionsub',handler:function(){fnsetWeekPage(5);}}
    ]
});

App.views.PromoterPage = Ext.extend(Ext.Panel,{
    fullscreen: true,
	  scroll:true,
	id:'PromoterPageView',
	dockedItems: [PromoterOption],
	cls:'black_gray',
	layout:'card',
	items:[{
		   xtype:'panel',
		   //fullscreen: true,
		   layout:'fit',
		   scroll:true,
		   id:'CurrentPromoterView',
			html:['<div style="color:#fff;text-align:center;padding:10px 0px 0px 0px" id="PromoterPageTitle"></div><div class="contentBackground" id="CurrentPromoterHTML"></div>']
	},{
		   xtype:'list',
		   fullscreen: true,
		   id:'FeaturedPromoterView',
          store: MyPromoterstore,
		emptyText :'No Data Found',
		itemTpl:['<tpl for=".">',
                 '<table style="width: 100%;">',
					'<tr >',
					'<td class="img" style="width: 70px;"><img width="60px" height="60px" onerror="fnItemNoImage(this)"  src="'+SreverURL+'Gallery/{ImageFile}"  alt=""/></td>',
					'<td style="text-align:left">',
						'<b style="font-size: 16px;">{Title}</b>',
						'<p style="text-align:left;color: #ACACAC;">{SiteURL}</p>',
					'</td>',
					'</tr>',
				'</table>',
           '</tpl>'
           ],
		listeners:{
			 "itemtap": function(list, index, item, e) {  fnsetPromoterstoreDesc(list.getStore().getAt(index),'TheWeek');}
		}}]
});
Ext.reg('PromoterPage', App.views.PromoterPage);


/*// JavaScript Document
*/
var pictureSource;   /*// picture source*/
var destinationType; /*// sets the format of returned value */
var pic=0;

document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady() {
pictureSource=navigator.camera.PictureSourceType;
destinationType=navigator.camera.DestinationType;
}

function fnUploadReceiptCapturePhoto(){	var vlu=Ext.getCmp('MagaPix_but').getText();
vlu=vlu.substr(0,vlu.indexOf('P'));
//navigator.camera.getPicture(captureSuccess, onFail, { quality: vlu ,destinationType: destinationType.FILE_URI })
window.plugins.MyCamrePlugin.getCapture({ sourceType: 1,destinationType:1,quality:vlu },captureSuccess,onFail);
}// , destinationType: destinationType.FILE_URI});
function captureSuccess(mediaFiles) {
	pic=1;
          Ext.getCmp('receiptImgbasecode').setValue(mediaFiles); 		
		   document.getElementById('UploadImg').src=mediaFiles;   
		   Ext.getCmp('Share_but').show();
		  }
    function captureError(error) {
        var msg = 'Please select receipt image';        navigator.notification.alert(msg, null, 'Uh oh!');	}
	function fnUploadReceiptChoosePhoto(){
		var arr={ sourceType: 0,destinationType:1,quality:50 };
    	window.plugins.MyCamrePlugin.getChoosePhoto( arr ,captureSuccess,captureError);
	}
/*//DATA_URL*/
	function onFail(message) {      alert('Failed because: ' + message);    }
	var ImageName='';
	 function fnUploadSumbitReceiptImg() {		/*// Get URI of picture to upload*/  

		 var img = document.getElementById('UploadImg');  
		 var imageURI = img.src;  
		 if (!imageURI || (img.style.display == "none")) {     
			 alert("Take picture or selectpicture from library first.");    
			 return;   
			 }  
			 if(pic==0){
				 Ext.Msg.alert('','Please select receipt image', Ext.emptyFn);
				 }
			if(imageURI=='upload1.png'){
				Ext.Msg.alert('','Please select receipt image', Ext.emptyFn);
			}else{
				ReciptUploadPhoto=1;
				server = SreverURL+"Mobile/upload.php"; 
				if (server) {    	 
					// Specify transfer options   
					var curdate=new Date();
					ImageName="Receipt-"+curdate.getTime();
					 var options = new FileUploadOptions();
						options.fileKey="file";
						options.fileName=ImageName;
						options.mimeType="image/jpeg";
						options.chunkedMode = false;  
			
					// Transfer picture to server   
		
					var ft = new FileTransfer();   
					 ft.upload(imageURI, server, win, fail, options);
					Ext.dispatch({
						controller: 'EbarTab',	action: 'UploadReceipts',data:data.imgName,	historyUrl: 'EbarTab/UploadReceipts',
						animation: {				type: 'slide',		direction:'left' },
					});
				}
			}
    }
	 function win(r) {
	
			
		//	 myLoader.hide();
			Ext.getCmp('hidreceiptImg').setValue(ImageName+".jpeg");	

     }

     function fail(error) {
    	// myLoader.hide();
		alert("Please select receipt image");
         //alert("An error has occurred: Code = " + error.code);
     }
	

// JavaScript Document

function fngetuserProfile(){
	myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
	myLoader.show();
	Ext.util.JSONP.request({
	url: url,
	callbackKey: 'callback',
	params: { action:'userProfile',userId:localStorage.getItem('UserId'),req:req}, 
	callback: function(data) {
		if (data.success) {			 
			/*var tester=new Image();	tester.src="http://www.eliteclubaccess.com/a7test/Gallery/MidtownButton.jpg";
					
			tester.onload = function() {
				alert('success '+tester.completed);
			  };
			  tester.onerror = function() {
				alert('onerror '+tester.completed);
			  };*/	
			profile='1';
			if(data.Status=='All')
			{
				document.getElementById('fullUserLevel').innerHTML='New user';	
			}
			else
			{
				document.getElementById('fullUserLevel').innerHTML=data.Status;	
			}
			document.getElementById('fullUserName').innerHTML=data.fullUserName;
			document.getElementById('UserPoint').innerHTML=data.CurrentPoint;
			if(data.UserImg!=null){
			document.getElementById('userImgProgile').src=SreverURL+"Gallery/member/"+data.UserImg;
			}
			document.getElementById('UserNewEmail').value='New Email ('+data.NewEmail+')';
			resize('userImgProgile', 135);
			myLoader.hide();
		}else{
			profile='1';
			Ext.Msg.alert('',data.msg, Ext.emptyFn);
			myLoader.hide();
		}
	}
	});
	req++;
	setTimeout(function(){ if(profile==''){myLoader.hide();} },10000);
}
var voucherstore = new Ext.data.JsonStore({
    root: 'rows',
    fields: ['Id','Voucher','Date','Amount','Vendor','Description','VoucherCode','logo','Agiftfrom','Howtouse','Legalstuff','Redeemat','Universalfine','phone','VenderEmail','VoucherAllotmentID' ]
});
var MembarTheWeekstore = new Ext.data.JsonStore({
    root: 'rows',
    fields: ['MemberId','UserImg','UserName' ]
});
var MyPromoterstore = new Ext.data.JsonStore({
    root: 'rows',
    fields: ['Id','Title','Description','ImageFile','SiteURL' ]
});
function fngetWhatIsTheCase(){
	myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
	myLoader.show();
	Ext.util.JSONP.request({
	url: url,
	callbackKey: 'callback',
	params: { action:'getWhatIsTheCase',req:req},
	callback: function(data) {
		if (data.success) {
			if(data.rows.length>0){
				document.getElementById('WhereIsTheCaseImg').src=SreverURL+"/Gallery/"+data.rows[0]['ImageFileName'];
				document.getElementById('TheCaseTitle').innerHTML=data.rows[0]['Title'];
				document.getElementById('TheCaseDescription').innerHTML=data.rows[0]['Description'];
				document.getElementById('hdnWhatIsTheCase').value=data.rows[0]['CaseGuessId'];
			}
			myLoader.hide();
		}else{
			myLoader.hide();
		}
	}
	});
	req++;
}
function fngetCurrentPromoter(){
	myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
	myLoader.show();
	Ext.util.JSONP.request({
	url: url,
	callbackKey: 'callback',
	params: { action:'getCurrentPromoter'},
	callback: function(data) {
		if (data.success) {
			document.getElementById('PromoterPageTitle').innerHTML=data.rows[0]['Title'];
			document.getElementById('CurrentPromoterHTML').innerHTML=data.rows[0]['Description'];
			myLoader.hide();
		}else{
				myLoader.hide();
		}
	}
	});
}
function fnsetPromoterstoreDesc(record){
	Ext.dispatch({
				controller: 'EbarTab',
				action: 'PromoterstoreDesc',
				data:record,
				animation: {
					type: 'slide',
					 direction:'right'
				},
			});
}
function fngetFeaturedPromoter(){
	myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
	myLoader.show();
	Ext.util.JSONP.request({
	url: url,
	callbackKey: 'callback',
	params: { action:'getFeaturedPromoter',req:req},
	callback: function(data) {
		if (data.success) {
			MyPromoterstore.loadData(data.rows);
			myLoader.hide();
		}else{
			myLoader.hide();
		}
	}
	});
	req++;
}
function fngetMembarTheWeekstore(){
	myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
	myLoader.show();
	Ext.util.JSONP.request({
	url: url,
	callbackKey: 'callback',
	params: { action:'getMembarTheWeek',req:req},
	callback: function(data) {
		if (data.success) {
			MembarTheWeekstore.loadData(data.rows);
			myLoader.hide();
		}else{
			myLoader.hide();
		}
	}
	});
	req++;
}
function fngetClubTheWeekstore(){
	myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
	myLoader.show();
	Ext.util.JSONP.request({
	url: url,
	callbackKey: 'callback',
	params: { action:'getClubTheWeek',req:req},
	callback: function(data) {
		if (data.success) {
			MyClubstore.loadData(data.rows);
			myLoader.hide();
		}else{
				myLoader.hide();
		}
	}
	});
	req++;
}
function fngetEventTheWeekstore(){
	myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
	myLoader.show();
	Ext.util.JSONP.request({
	url: url,
	callbackKey: 'callback',
	params: { action:'getEventTheWeek',req:req},
	callback: function(data) {
		if (data.success) {
			UpcomingEventsstore.loadData(data.rows);
			myLoader.hide();
		}else{
				myLoader.hide();
		}
	}
	});
	req++;
}
function fngetUserVoucher(){
	voucherstore.removeAll();
	Ext.getCmp('voucherstoreList').refresh();
	myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
	myLoader.show();
	Ext.util.JSONP.request({
	url: url,
	callbackKey: 'callback',
	params: { action:'getUserVoucher',userId:localStorage.getItem('UserId'),req:req},
	callback: function(data) {
		if (data.success) {
			voucherstore.loadData(data.rows);
			myLoader.hide();
		}else{			
			myLoader.hide();
		}
	}
	});
	req++;
}
var Receiptstore = new Ext.data.JsonStore({
    root: 'rows',
    fields: ['Vendor', 'InputDate','Amount','IsVilify','Point' ]
});
var selectStateStore = new Ext.data.JsonStore({
    root: 'rows',
    fields: ['zone_id', 'zone_name']
});
var selectcityStor = new Ext.data.JsonStore({
    root: 'rows',
    fields: ['CityName' ]
});
var selectcluStor = new Ext.data.JsonStore({
    root: 'rows',
    fields: ['id', 'name' ]
});
function fngetUserReceipt(){
	myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
	myLoader.show();
	Ext.util.JSONP.request({
	url: url,
	callbackKey: 'callback',
	params: { action:'getUserReceipt',userId:localStorage.getItem('UserId'),req:req},
	callback: function(data) {
		if (data.success) {
			Receiptstore.loadData(data.rows);
			myLoader.hide();
		}else{
			Ext.Msg.alert('',data.msg, Ext.emptyFn);	myLoader.hide();
		}
	}
	});
	req++;
}
function fndeleteVoucher(VId){
	myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
	myLoader.show();
	Ext.util.JSONP.request({
	url: url,
	callbackKey: 'callback',
	params: { action:'DeleteVoucher',VId:VId},
	callback: function(data) {
		if (data.success) {
			fngetUserVoucher();
			Ext.Msg.alert('',data.Msg, Ext.emptyFn);
			myLoader.hide();
		}else{
			Ext.Msg.alert('',data.Msg, Ext.emptyFn);	myLoader.hide();
		}
	}
	});
}
var UpcomingEventsstore = new Ext.data.JsonStore({
    root: 'rows',
    fields: ['Id', 'Name','ShortDesc','EventDate','ImageFile','ClubName','countFriend' ],
});
var GlobalBragtore = new Ext.data.JsonStore({
    root: 'rows',
    fields: ['UserName','Amount','PrizeName' ],
});
var CityBragstore = new Ext.data.JsonStore({
    root: 'rows',
    fields: ['Subtype_Value', 'UserName','Amount','PrizeName' ],
});
var ClubBragstore = new Ext.data.JsonStore({
    root: 'rows',
    fields: ['ClubName', 'UserName','Amount','PrizeName' ],
});
var StateBragstore = new Ext.data.JsonStore({
    root: 'rows',
    fields: ['zone_name', 'UserName','Amount','PrizeName' ],
});
var EventGuestlists = new Ext.data.JsonStore({
    root: 'rows',
    fields: ['Id', 'Name','countGuest','EventDate','ImageFile' ],
});
var MyClubstore = new Ext.data.JsonStore({
    root: 'rows',
    fields: ['ClubId','Name','Address','City','State','Country','ContactName','ContactEmail','SiteURL','FaceBookUrl','TwitterUrl','IsActive','MultiplierId','ClubType','MultiplierValue','Description','IsFeatured','FileImage','Vendor','order_by','multiplierValue' ],
});
var MySearchClubstore = new Ext.data.JsonStore({
    root: 'rows',
    fields: ['ClubId','Name','Address','City','State','Country','ContactName','ContactEmail','SiteURL','FaceBookUrl','TwitterUrl','IsActive','MultiplierId','ClubType','MultiplierValue','Description','IsFeatured','FileImage','Vendor','order_by','multiplierValue' ],
});
var AuctionItemstore = new Ext.data.JsonStore({
    root: 'rows',
    fields: ['BidId','BasicBidPrice', 'ItemeName','LVLName','ImageFile','UserName','BirrerName','HighestBidAmount','LastDate','Description','BidAvailableFor','AssociatedImages','AssociatedImg' ],
});
var CountryStore = new Ext.data.JsonStore({
    root: 'rows',
    fields: ['countries_id','countries_name' ],
});
var StateStore = new Ext.data.JsonStore({
    root: 'rows',
    fields: ['zone_id','zone_name' ],
});
var FeaturedRewardstore = new Ext.data.JsonStore({
    root: 'rows',
    fields: ['BidId', 'BasicBidPrice','ItemeName','LVLName','ImageFile','BirrerName','HighestBidAmount','LastDate','Description','BidAvailableFor','AssociatedImages','AssociatedImg'],
});
var FCFSstore = new Ext.data.JsonStore({
    root: 'rows',
    fields: ['ItemId','Name','ImageFileName','LVLName','MinimumReqiiredPoint','CurrentStockQty','ItemDescription','ItemAvalibleFor','ItemURL' ],
});
var MentioneBarTabtore = new Ext.data.JsonStore({
    root: 'rows',
    fields: ['Id','Name','Detal_desc','Enddate','LVLName','Availablefor','FaceBookUrl','MinimumReqiiredPoint','ImageFileName','DiscoumdinPercent','CurrentStockQty' ],
});
var friendDatastore = new Ext.data.JsonStore({
    root: 'rows',
	sorters:'UserName',
    fields: ['UserId','UserName','UserImg','Email' ],
});
var SearchfriendDatastore = new Ext.data.JsonStore({
    root: 'rows',
	sorters:'UserName',
    fields: ['UserId','UserName','UserImg','Email' ],
});
var InveitefriendDatastore = new Ext.data.JsonStore({
    root: 'rows',
    fields: ['GuestID','GuestName','GuestEmail','UserName','UserImg' ],
});
var UserInboxstore = new Ext.data.JsonStore({
    root: 'rows',
    fields: ['UserName','MailDate','Subject','Message','Isreaded','Id'],
});
var UserOutstore = new Ext.data.JsonStore({
    root: 'rows',
    fields: ['UserName','MailDate','Subject','Message','Id'],
});
var UserTrashstore = new Ext.data.JsonStore({
    root: 'rows',
     fields: ['UserName','MailDate','Subject','Message','Id'],
});
var AllMembarInSite = new Ext.data.JsonStore({
    root: 'rows',
     fields: ['UserName','Email','UserId'],
});
var SearchAllMembarInSite = new Ext.data.JsonStore({
    root: 'rows',
     fields: ['UserName','Email','UserId'],
});
var SelectMembarEmail = new Ext.data.JsonStore({
    root: 'rows',
     fields: ['Email','UserName'],
});
function fnloadSiteMembar(){
	var len=MoreCount*30;
	myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
	myLoader.show();
	Ext.util.JSONP.request({
	url: url,
	callbackKey: 'callback',
	params: { action:'SiteMembar',Morecound:MoreCount},
	callback: function(data) {myLoader.hide();
		if (data.success) {
			AllMembarInSite.loadData(data.rows);
			 if(document.getElementById('PullMoreMemberId')){
					var par=document.getElementById('PullMoreMemberId').parentNode
					document.getElementById(par.id).removeChild(document.getElementById('PullMoreMemberId'));
				}
			if(AllMembarInSite.getCount()>len){
			var chid=document.getElementById('AllMembarInSiteCount').childNodes[0];
			el=document.createElement("Div");
			el.id='PullMoreMemberId';
			el.style.height="300px";
			el.style.padding="0px";
			el.style.margin="0px";
             el.innerHTML='<table style="padding:10px;width:100%;height:54px;background-color:#F1F1F1;"  onclick="fnloadSiteMembar()"><tr><td><p style="color:#3692FE;font-size:14px;vertical-align:middle;text-align: left;padding: 10px;"><b style="border:none;background-color:transparent;color:#3692FE;">Click For More...</b></p></td></tr></table>';
			document.getElementById(chid.id).appendChild(el);
				}
				
		}else{
				myLoader.hide();
			Ext.Msg.alert('',data.msg, Ext.emptyFn);
		}
	}
	});
	MoreCount++;
}
function fnloadCountact(){
	   var options = new ContactFindOptions();
        options.filter="@"; 
        options.multiple=true;
        var fields = ["name", "emails"];
        navigator.contacts.find(fields, onSuccess, onError,options);
}
// onSuccess: Get a snapshot of the current contacts
    //
    function onSuccess(contacts) {
		 MoreCount=0;
		var con_arr= [];
        for (var i=0; i<contacts.length; i++) {
			if(contacts[i].name.formatted!=''){
			con_arr.push({"UserName":contacts[i].name.formatted,"Email":contacts[i].emails[0].value});
			}
			if(i==30){
				AllMembarInSite.loadData(con_arr);
				 if(document.getElementById('PullMoreMemberId')){
						var par=document.getElementById('PullMoreMemberId').parentNode
						document.getElementById(par.id).removeChild(document.getElementById('PullMoreMemberId'));
					}
				var chid=document.getElementById('AllMembarInSiteCount').childNodes[0];
				el=document.createElement("Div");
				el.id='PullMoreMemberId';
				el.style.height="300px";
				el.style.padding="0px";
				el.style.margin="0px";
				 el.innerHTML='<table style="padding:10px;width:100%;height:54px;background-color:#F1F1F1;"  onclick="fnloadcountMembar()"><tr><td><p style="color:#3692FE;font-size:14px;vertical-align:middle;text-align: left;padding: 10px;"><b style="border:none;background-color:transparent;color:#3692FE;">Click For More...</b></p></td></tr></table>';
				document.getElementById(chid.id).appendChild(el);
			}
        }
		if(contacts.length<30){AllMembarInSite.loadData(con_arr);}
	    SearchAllMembarInSite.loadData(con_arr);
    }
	function fnloadcountMembar(){
		 MoreCount++;
		 var len=MoreCount*30;
		 i=0;
		 SearchAllMembarInSite.each(function (record) {
			if(i<len){	tempData.push(record); } 
			i++;
		}); 
		 if(document.getElementById('PullMoreMemberId')){
						var par=document.getElementById('PullMoreMemberId').parentNode
						document.getElementById(par.id).removeChild(document.getElementById('PullMoreMemberId'));
					}
		 AllMembarInSite.loadData(tempData);
		 if(len==i && SearchAllMembarInSite.getCount()>len){
			
				var chid=document.getElementById('AllMembarInSiteCount').childNodes[0];
				el=document.createElement("Div");
				el.id='PullMoreMemberId';
				el.style.height="300px";
				el.style.padding="0px";
				el.style.margin="0px";
				 el.innerHTML='<table style="padding:10px;width:100%;height:54px;background-color:#F1F1F1;"  onclick="fnloadcountMembar()"><tr><td><p style="color:#3692FE;font-size:14px;vertical-align:middle;text-align: left;padding: 10px;"><b style="border:none;background-color:transparent;color:#3692FE;">Click For More...</b></p></td></tr></table>';
				document.getElementById(chid.id).appendChild(el);
	
	     }
	}
    // onError: Failed to get the contacts
    //
    function onError(contactError) {
        Ext.Msg.alert('','onError!');
    }
function fnselectname(){
	Email_arr=[];
	var con_obj=document.getElementsByName('Con_email');
	//var Email_arr= new Array();
	var Con_Lan=con_obj.length;
    for(var i=0;i<Con_Lan;i++){
		if(con_obj.item(i).checked){
			var val=con_obj.item(i).value;
			var Email=val.substr(0,val.indexOf('-',0));
			var UN=val.substr(parseInt(val.indexOf('-',0))+1,val.length);
			Email_arr.push({"Email":Email,"UserName":UN});
		}
	}
	SelectMembarEmail.loadData(Email_arr);
	Ext.dispatch({
				controller: 'EbarTab',
				action: 'PhotoShare',
				animation: {
					type: 'slide',
					 direction:'right'
				},
			});
}
function fnsendLink(){
	var i=0;
	var str='';
	var img = document.getElementById('UploadImg');  
		 var imageURI = img.src; 
		  if (!imageURI || (img.style.display == "none")) {     
			 Ext.Msg.alert("","Take picture or selectpicture from library first.",Ext.emptyFn);    
			 return;   
			 }  
    var imgName=imageURI.substring(imageURI.length-11,imageURI.length);
		if(imgName=='upload1.png'){
				Ext.Msg.alert('','Please select receipt image', Ext.emptyFn);
			}else{
				
	SelectMembarEmail.each(function (record) {
			if(i==0){
				str=record.get('Email');
				i++;
			}else{
				str=str+","+record.get('Email');
			}
	});
		server = url+"?action=ShareImg&Sendae="+localStorage.getItem('UserName')+"&SendaeEmail="+localStorage.getItem('Email')+"&User="+str; 
					// Specify transfer options 
                 if(SelectMembarEmail.getCount()>0){
                    myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
	                myLoader.show();
            		var curdate=new Date();
					ImageName="Ebar-"+curdate.getTime();
					 var options = new FileUploadOptions();
						options.fileKey="file";
						options.fileName=ImageName;
						options.mimeType="image/jpeg";
						options.chunkedMode = false;  
					// Transfer picture to server   
					var ft = new FileTransfer(); 
					ft.upload(imageURI, server, Sharewin, Sharefail, options);
                }else{
                    Ext.Msg.alert('','Please Select User',Ext.emptyFn);
                }
			}
}
 function Sharewin(r) {
 		 myLoader.hide();
		Ext.dispatch({
										controller: 'EbarTab',
										action: 'UploadImg',
                                        data:"share",
										animation: {
											type: 'slide',
											 direction:'right'
										},
									});

     }

     function Sharefail(error) {
    	 myLoader.hide();
		//alert("Please select image");
         Ext.Msg.alert('',"An error has occurred: Code = " + error.code);
     }
function fngetFeaturedRewards(){
	myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
	myLoader.show();
	Ext.util.JSONP.request({
	url: url,
	callbackKey: 'callback',
	params: { action:'FeaturedRewardstoreBYUserStatus',UserStatus:localStorage.getItem('Status')},
	callback: function(data) {
		if (data.success) {
			FeaturedRewardstore.loadData(data.rows);
				myLoader.hide();
		}else{
			Ext.Msg.alert('',data.msg, Ext.emptyFn);	myLoader.hide();
		}
	}
	});
}
function fngetUserFCFS(){
	myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
	myLoader.show();
	Ext.util.JSONP.request({
	url: url,
	callbackKey: 'callback',
	params: { action:'FCFSItemBYUserStatus',UserStatus:localStorage.getItem('Status')},
	callback: function(data) {
		if (data.success) {
			FCFSstore.loadData(data.rows);
				myLoader.hide();
		}else{
			Ext.Msg.alert('',data.msg, Ext.emptyFn); 	myLoader.hide();
		}
	}
	});
}
function fngetUserMentioneBarTab(){
	myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
	myLoader.show();
	Ext.util.JSONP.request({
	url: url,
	callbackKey: 'callback',
	params: { action:'MentionEbarTabBYUserStatus',UserStatus:localStorage.getItem('Status')},
	callback: function(data) {
		if (data.success) {
			MentioneBarTabtore.loadData(data.rows);
				myLoader.hide();
		}else{
			Ext.Msg.alert('',data.msg, Ext.emptyFn); 	myLoader.hide();
		}
	}
	});
}
function fngetUpcomingEvents(){
myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
	myLoader.show();
   Ext.util.JSONP.request({
	url: url,
	callbackKey: 'callback',
	params: { action:'AllUpComingEvent',UserStatus:localStorage.getItem('Status')},
	callback: function(data) {
		if (data.success) {
			UpcomingEventsstore.loadData(data.rows);
				myLoader.hide();
		}else{
			myLoader.hide();
		}
	}
	});
}
function fngetEventGuestlists(){
	myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
	myLoader.show();
   Ext.util.JSONP.request({
	url: url,
	callbackKey: 'callback',
	params: { action:'AllEventlist',UserStatus:localStorage.getItem('Status')},
	callback: function(data) {
		if (data.success) {
			EventGuestlists.loadData(data.rows);
				myLoader.hide();
		}else{
			Ext.Msg.alert('',data.msg, Ext.emptyFn); 	myLoader.hide();
		}
	}
	});
 }
function fngetMyClubs(){
	myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
	myLoader.show();
	Ext.util.JSONP.request({
	url: url,
	callbackKey: 'callback',
	params: { action:'AllClub'},
	callback: function(data) {
		if (data.success) {
			//alert(data);
			MyClubstore.loadData(data.rows);
			MySearchClubstore.loadData(data.rows);
				myLoader.hide();
		}else{
			Ext.Msg.alert('',data.msg, Ext.emptyFn); 	myLoader.hide();
		}
	}
	});
}
function fngetAuctionsItem(){
	myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
	myLoader.show();
	Ext.util.JSONP.request({
	url: url,
	callbackKey: 'callback',
	params: {action:'AuctionsItemBYUserStatus',UserStatus:localStorage.getItem('Status')},
	callback:function(data){
		if (data.success) {
			AuctionItemstore.loadData(data.rows);
			Ext.getCmp('AuctionItemId').refresh();
			myLoader.hide();
		}else{
			Ext.Msg.alert('',data.msg, Ext.emptyFn);myLoader.hide();
		}
	}
	});

}
function fnsetcluDesc(record,backpage){
	Ext.dispatch({
        	    controller: 'EbarTab',action: 'ClubDescription',data:{record:record,pageback:backpage},
        	    animation: {type: 'slide',direction:'left'},
        	});
}
function setClubsFullDesc(record){
	document.getElementById('ClubImg').src=SreverURL+"Gallery/"+record.data.FileImage;
	document.getElementById('ClubAddress').innerHTML=record.data.Address;
	document.getElementById('ClubName').innerHTML=record.data.Name;
	document.getElementById('hdnClubAddress').value=record.data.Address;
	document.getElementById('hdnClubName').value=record.data.Name;
	document.getElementById('hdnClubid').value=record.data.ClubId;
	resize('ClubImg', 200);
	document.getElementById('ClubDescription').innerHTML=record.data.Description;
	/*alert(record.data.Description);*/
	document.getElementById('ClubEmail').innerHTML=record.data.ContactEmail;
	document.getElementById('ClubURL').innerHTML=record.data.SiteURL;
	document.getElementById('ClubPhone').innerHTML=record.data.ContactName;
	document.getElementById('ClubPhone_A').href="tel:"+record.data.ContactName;
	document.getElementById('ClubMultiplier').innerHTML=record.data.multiplierValue+' Point(s) for every dollar spent';
	document.getElementById('a_ClubURl').href="http://"+record.data.SiteURL;
	document.getElementById('a_ClubEmail').href="mailto://"+record.data.ContactEmail;
	
}
function fnsetAustionItemDesc(record,pageAction){
	Ext.dispatch({
        	    controller: 'EbarTab',action: 'AustionDescription',
        		data:[{record:record,page:pageAction}],
        	    animation: {type: 'slide',direction: 'left'},
        	});
}
function fnopenMap(){
	
	address= document.getElementById('hdnClubAddress').value;
	clubName= document.getElementById('hdnClubName').value;
	var ClubId=document.getElementById('hdnClubid').value;
	geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
		var latitude = results[0].geometry.location.lat();
    	var longitude = results[0].geometry.location.lng();
			Ext.dispatch({
        	    controller: 'EbarTab',action: 'ClubAddresh',
        		data:[{latitude:latitude,longitude:longitude,ClubId:ClubId},{page:'Back'}],
        	    animation: {type: 'slide',direction: 'left'},
        	});
		}else{
			alert('The last location provider was disabled');
				//Ext.util.JSONP.request({
//				url:'http://maps.google.com/maps/geo?q=1350 I Street, NW Washington, DC 20005&oe=utf8&hl=en',								
//				callback: function(data) {
//					alert('results');
//				}
//				});
		} 
		});
}
function setAustionFullDesc(record){
	document.getElementById('AustionImg').src=SreverURL+"Gallery/"+record.data.ImageFile;
	document.getElementById('AustionDescription').innerHTML=record.data.Description;
	document.getElementById('AustionName').innerHTML=record.data.ItemeName;
	resize('AustionImg', 200);
	var Temp=record.data.AssociatedImg.split(',');
	document.getElementById('AssociatedImages').innerHTML=record.data.TotalIMG;
	document.getElementById('LeadingBidder').innerHTML=record.data.UserName;
	document.getElementById('AustionLevel').innerHTML=record.data.LVLName;
	var HighestBidAmount=parseInt(record.data.HighestBidAmount);
	var increment=parseInt(localStorage.getItem('increment'));
	document.getElementById('txtBidPoint').value=HighestBidAmount+increment;
	document.getElementById('hdnBidPoint').value=HighestBidAmount;
	document.getElementById('hdnBidID').value=record.data.BidId;
	document.getElementById('hdnBasicBidPrice').value=record.data.BasicBidPrice;
	var cell = document.getElementById("AuctionAssociateImg");
	if ( cell.hasChildNodes() )
{
    while ( cell.childNodes.length >= 1 )
    {
        cell.removeChild( cell.firstChild );       
    } 
}
	if(Temp[0]==''){document.getElementById('AuctionAssociateImg').style.display='none';}
	for(var i=0;i<Temp.length;i++){
		var oImg=document.createElement("img");
			oImg.setAttribute('src', SreverURL+"Gallery/bid_more/"+Temp[i]);
			oImg.setAttribute('alt', Temp[i]);
			oImg.setAttribute('height', '50px');
			oImg.setAttribute('width', '50px');
			oImg.setAttribute('style', 'padding: 0.1em 0.3em;');
			oImg.setAttribute('onClick', 'fnopenPopup(this)');
			document.getElementById('AuctionAssociateImg').appendChild(oImg);
		}
}
function fnopenPopup(obj){
	AuctionImgPopup.setVisible(true);
	AuctionImgPopup.setPosition(document.body.offsetWidth /2  - 150 , document.body.offsetHeight /2 - 100);
		document.getElementById('ImgAuctionAssoc').src=obj.src;
	}
function fnsetUpcomingEventDesc(record,backPage){
	Ext.dispatch({
        	    controller: 'EbarTab',action: 'UpcomingEventDescription',data:{record:record,pageback:backPage},
        	    animation: {type: 'slide',direction: 'left'},
        	});
}
function setEventFullDesc(record){
	document.getElementById('UpCommingEventImg').src=SreverURL+"Gallery/"+record.data.ImageFile;
	document.getElementById('UpCommingdetailDesc').innerHTML=record.data.ShortDesc;
	document.getElementById('UpCommingEventDate').innerHTML=record.data.EventDate;
	document.getElementById('UpCommingEventName').innerHTML=record.data.Name;
	resize('EventImg', 200);
	var EventDate=new Date(record.data.EventDate);
	var dayNames = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
	document.getElementById('UpCommingEventDay').innerHTML=dayNames[EventDate.getDay()];
	document.getElementById('UpCommingEventClubs').innerHTML=record.data.ClubName;
	document.getElementById('UpCommingEventId').value=record.data.Id;
	Ext.getCmp('UpcomingInviatedFriend').setText('Friends on Guest List ('+record.data.countFriend+')');
	document.getElementById('UpCommingdetailDesc').innerHTML=record.data.DetailDesc;
}
function fnsetFCFSItemDesc(record){
	Ext.dispatch({
        	    controller: 'EbarTab',action: 'FCFSItemDescription',data:record,
        	    animation: {type: 'slide',direction: 'left'},
        	});
}
function setUserFCFSItemData(record){
		document.getElementById('FCFSItemImg').src=SreverURL+"Gallery/"+record.data.ImageFileName;
	document.getElementById('FCFSItemDescription').innerHTML=record.data.ItemDescription;
	document.getElementById('FCFSItemName').innerHTML=record.data.Name;
	resize('FCFSItemImg', 200);
	document.getElementById('FCFSItemLevel').innerHTML=record.data.LVLName;
	document.getElementById('FCFSItemItemURL').innerHTML=record.data.ItemURL;
	document.getElementById('FCFSItemAuntity').innerHTML=record.data.CurrentStockQty;
	document.getElementById('a_FCFSItemItemURL').href="http://"+record.data.ItemURL;
	document.getElementById('hdnItemMinimumReqiiredPoint').value=record.data.MinimumReqiiredPoint;
	document.getElementById('hdnFCFSItem').value=record.data.ItemId;
	document.getElementById('spanMinPoints').innerHTML=record.data.MinimumReqiiredPoint;
	
	}
function fnsetMentioneBarTabDesc(record){
	
	Ext.dispatch({
        	    controller: 'EbarTab',action: 'MentioneBarTabDescription',data:record,
        	    animation: {type: 'slide',direction: 'left'},
        	});
}
function fnsetEventInvetionDesc(record){
	Ext.dispatch({
        	    controller: 'EbarTab',action: 'EventInvetion',data:record,
				animation: {type: 'slide',direction: 'left'},
        	});
}
function setUserMentioneBarTabData(record){
	document.getElementById('MentioneBarTabImg').src=SreverURL+"Gallery/"+record.data.ImageFileName;
	document.getElementById('MentioneBarTabDescription').innerHTML=record.data.Detal_desc;
	document.getElementById('MentioneBarTabName').innerHTML=record.data.Name;
	resize('MentioneBarTabImg', 200);
	document.getElementById('MentioneBarTabLevel').innerHTML=record.data.LVLName;	
	document.getElementById('MentioneBarTabofferPoint').innerHTML=record.data.MinimumReqiiredPoint;
	document.getElementById('a_MentioneBarTabURL').href="http://"+record.data.FaceBookUrl;
	document.getElementById('hdnMentionitemId').value=record.data.Id;
	document.getElementById('hdnMentionitemPoint').value=record.data.MinimumReqiiredPoint;
	document.getElementById('a_MentioneBarTabURL').innerHTML=record.data.FaceBookUrl;
	document.getElementById('MentioneBarTabQuntity').innerHTML=record.data.CurrentStockQty;	

}
function setUserInvetaionData(record){
	document.getElementById('GuestEventImg').src=SreverURL+"Gallery/"+record.data.ImageFile;
	document.getElementById('EventDate').innerHTML=record.data.EventDate;
	document.getElementById('EventName').innerHTML=record.data.Name;
	resize('GuestEventImg', 200);
	document.getElementById('EventDescription').innerHTML=record.data.ShortDesc;
	document.getElementById('GuesstEventId').value=record.data.Id;
}
function fnorderMentionEbarTab(){
	var txtMentionItemQun=document.getElementById('txtMentionItemQun').value;
	var hdnMentionitemId=document.getElementById('hdnMentionitemId').value;
	var hdnMentionitemPoint=document.getElementById('hdnMentionitemPoint').value;
	if(txtMentionItemQun=="" || txtMentionItemQun==0){
		Ext.Msg.alert('','Enter The Qun.', Ext.emptyFn);
	}else{
	myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please Wait..."});
	myLoader.show();
		Ext.util.JSONP.request({
				url: url,
				callbackKey: 'callback',
				params: { action:'MentionItemOrder',hdnMentionitemPoint:hdnMentionitemPoint,UserId:localStorage.getItem('UserId'),hdnMentionitemId:hdnMentionitemId,txtMentionItemQun:txtMentionItemQun},
				callback: function(data) {
					if (data.success) {
							Ext.Msg.alert('',data.msg, Ext.emptyFn);
							myLoader.hide();
					}else{
						Ext.Msg.alert('Offer',data.msg, Ext.emptyFn);
						myLoader.hide();
					}
					}
				
				});
	}
}
function fnReplayEmail(){
	var EmailId=document.getElementById('ViewEmailId').value;
	var BackPage=document.getElementById('ViewEmailPage').value;
	Ext.dispatch({
        	    controller: 'EbarTab',
        	    action: 'ComposeMail',
        	    historyUrl: 'EbarTab/ReplayEmail',
				data:[{EmailId:EmailId,BackPage:BackPage,page:'InboxEmailPage'}],
        	    animation: {
        	        type: 'slide',
        	        direction: 'left'
        	    },
        	});
}
function fnsetEmailReplay(EmailId,Page){
	if(Page=='Inbox'){
	Ext.util.JSONP.request({
				url: url,
					callbackKey: 'callback',
				params: { action:'EmailDecByEmailId',EmailId:EmailId},
				callback: function(data) {
					if (data.success) {
					Ext.getCmp('txtUserNAme').setValue(data.UserName);
					Ext.getCmp('txtUserSubject').setValue("RE:"+data.subject);
					Ext.getCmp('txtUserId').setValue(data.UserId);
					}
					}
				
				});
	}else if(Page=='OutBox'){
		Ext.util.JSONP.request({
				url: url,
				callbackKey: 'callback',
				params: { action:'EmailDecByOutEmailId',EmailId:EmailId},
				callback: function(data) {
					if (data.success) {
					Ext.getCmp('txtUserNAme').setValue(data.UserName);
					Ext.getCmp('txtUserSubject').setValue("RE:"+data.subject);
					Ext.getCmp('txtUserId').setValue(data.UserId);
					}
					}
				
				});
	}
}




// JavaScript Document
App.views.RewardsPage = Ext.extend(Ext.Panel,{
    fullscreen: true,
	sortable  : true,
	  scroll:false,
	id:'RewardsForm',
		cls:'Rewards_black black_gray',
	items:[ 
		{
	   		xtype:'button', 
			text: 'Featured Rewards',
			id:'FeaturedRewardsphone',
			cls:'btn_ext',
			 handler:function()
			{		fnpageSubMenuNav(9);		}
	   },{
	   		xtype:'button', 
			text: 'Mention e-BarTab',
			id:'Mentione-BarTabphone',
			cls:'btn_ext',
			 handler:function()
			{	fnpageSubMenuNav(10);	}
	   },{
	   		xtype:'button', 
			text: 'Be The First',
			id:'FCFSphone',
			cls:'btn_ext',
			 handler:function()
			{		fnpageSubMenuNav(11);	}
	   }]
	
});
Ext.reg('RewardsForm', App.views.RewardsPage);


// JavaScript Document
var Sharebar = new Ext.TabBar({
    dock : 'bottom',
	activeItem:1,
	scroll:'horizontal',
	id:'ShareBarTab',
    ui   : 'dark',
	layout: {
						pack : 'center',
	},
    items: [{ 
			text: 'Contacts',
			id:'ShareBarCountacts'
			,iconCls:'user'
			,handler:function(){
				Ext.dispatch({
        	    controller: 'EbarTab',
        	    action: 'Countacts',
        	    animation: {
        	        type: 'slide',
        	         direction:'left'
        	    },
        	});
			}
		},{ 
			text: 'Site Member',
			id:'ShareBarSiteMamber'
			,iconCls:'user'
			,handler:function(){
				Ext.dispatch({
        	    controller: 'EbarTab',
        	    action: 'SiteMamber',
        	    animation: {
        	        type: 'slide',
        	         direction:'left'
        	    },
        	});
			}
		}]
});
App.views.PhotoShareView = Ext.extend(Ext.Panel,{
    fullscreen: true,
	sortable  : true,
	  scroll:true,
	id:'PhotoShareView',
	cls:'black_gray uploadimgCls',
	layout: {
			pack: 'center'
		},
		items:[{ 
			   xtype:'list',
		   layout:'fit',
		   store:SelectMembarEmail,
		style:'padding:0px',
		emptyText :'No Data Found',
		cls:'Editradio black_gray',
		itemTpl:['<div class=" x-field x-field-radio x-label-align-left" ><div class="x-form-label"  style="width: 60%;">',
				 '<span >',
				  '<table style="width: 100%;">',
					'<tr >',
						'<td style="text-align:left">',
						'<b style="font-size: 17px;font-weight:bold;">{UserName}</b>',
					'</td>',
					'</tr>',
					'<tr >',
				'</table>',
				 '</span></div>',
				'</div>']
		},
		],
	dockedItems: [Sharebar,{
				 xtype: 'button',
				  dock : 'bottom',
				name : 'ImgLink',
				id:'SendImgLink',
				cls:'padding but_class',
				text:'Send Link',handler:function(){
					fnsendLink();
							}}]

});
Ext.reg('PhotoShareform', App.views.PhotoShareView);


// JavaScript Document HowToUploadReceipts.js
App.views.HowToUploadReceiptsForm = Ext.extend(Ext.Panel,{
   			fullscreen:true,
            scroll:true,
			id:'HowToUploadReceiptsPage',
			layout: {pack: 'center',align:'center'},
			html:'<div id="Page_49" style="background-color:#fff;padding:4px 10px 4px 10px;"></div>'
            });
Ext.reg('HowToUploadReceiptsForm', App.views.HowToUploadReceiptsForm);


// JavaScript Document
//var userlatitude='';
//var userlongitude='';
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var UserLocationMap = '';
var ClubLocationMap = '';
var userLatitude='';
var userLongitude='';

var MapOption = new Ext.TabBar({
    dock : 'top',
	activeItem:1,
	scroll:'horizontal',
    ui   : 'dark',
	layout: {
						pack : 'center',
	},
    items: [
        {text: 'Direction',id:'Map',handler:function(){
			Ext.getCmp('ClubRoute').hide();
		    Ext.getCmp('ClubMap').show();
			Ext.getCmp('Map').addCls('class','x-tab-active');
			Ext.getCmp('Route').removeCls('class','x-tab-active');
			} },
       {text: 'Turn By Turn',id:'Route',handler:function(){
		   Ext.getCmp('ClubRoute').show();
		   Ext.getCmp('ClubMap').hide();
		   Ext.getCmp('Route').addCls('class','x-tab-active');
		   Ext.getCmp('Map').removeCls('class','x-tab-active');
		   }},
       
    ]
});
App.views.ClubAddreshView = Ext.extend(Ext.Panel,{
    fullscreen: true,
	  //scroll:true,
	id:'ClubAddreshView',
	cls:'black_gray',
	dockedItems: [MapOption],
		layout:'card',
 initComponent: function() {	
        App.views.ClubAddreshView.superclass.initComponent.apply(this, arguments);
    },
	items:[
		   {xtype:'panel',id:'ClubMap'},
		   {xtype:'panel', scroll:'vertical',id:'ClubRoute',  html:'<div id="routeclub"></div>'
		   } 
		  ],
    addMap: function(data) {
		document.getElementById("ClubMap").innerHTML='';
		document.getElementById("routeclub").innerHTML='';
   		directionsDisplay = new google.maps.DirectionsRenderer();
		  var myOptions = {
			zoom:14,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			center:UserLocationMap
		  }
		  map = new google.maps.Map(document.getElementById("ClubMap"), myOptions);
		   directionsDisplay.setMap(map);
  		   directionsDisplay.setPanel(document.getElementById("routeclub"));
			var isRefreshRequired = false;
  			if (Ext.getCmp('ClubMap').getXTypes() === 'box/map') {
  				this.remove(Ext.getCmp('ClubMap'));
  				isRefreshRequired = true;
  			}
		//  directionsDisplay.setMap(map);
		
		   var request = {
		   origin: UserLocationMap,
		   destination: ClubLocationMap,
		   travelMode: google.maps.TravelMode.DRIVING
  		};
		directionsService.route(request, function(response, status) {
   		 if (status == google.maps.DirectionsStatus.OK) {
      		directionsDisplay.setDirections(response);
    		}
  		});
    },
	listeners: {
	orientationchange: function(panel, orientation, width, height){	
	
		var cp= document.getElementById('ClubAddreshView').parentNode.parentNode.id;
			if(cp=='EbarTabVieport'){
			document.getElementById('ClubAddreshView').style.top='0px';	
			}else{
			document.getElementById('ClubAddreshView').style.top='40px';	
			}
	}
}
	
	
});
Ext.reg('ClubAddreshform', App.views.ClubAddreshView);
function addMarker(map, position, desc) 
{
    var marker = new google.maps.Marker({
        map: map,
        position: position
    });
		var infowindow = new google.maps.InfoWindow({
        content: "Club Name: "+clubName+"<br/> Address"+address
    });
        google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
    });
}


function geolocationSuccess (position){	
	UserLocationMap = new google.maps.LatLng(position.coords.latitude,position.coords.longitude); 
	userLatitude=position.coords.latitude;
	userLongitude=position.coords.longitude;

};
function geolocationError(error) {
    alert('message: ' + error.message + '\n');
}





// JavaScript Document

App.views.AuctionsItem = Ext.extend(Ext.Panel,{
	sortable  : true,
	  scroll:true,
	id:'AustionItemView',layout:'fit',
	cls:'black_gray',
items:[{
	   xtype:'list',
	    store: AuctionItemstore,
	    id:'AuctionItemId',
		emptyText :'No Data Found',
		itemTpl:['<tpl for=".">',
                 '<table style="width: 100%;">',
					'<tr >',
					'<td class="img" style="width: 70px;"><img width="60px" height="60px" onerror="fnItemNoImage(this)" src="'+SreverURL+'Gallery/{ImageFile}"  alt=""/></td>',
					'<td style="text-align:left">',
						'<b style="font-size: 16px;">{ItemeName}</b>',
						'<p style="text-align:left;color: #ACACAC;">{LastDate}</p>',
					'</td>',
					'<td  style="text-align:right">',
					   '<p style="font-weight:normal;font-size:14px;">{BirrerName}',
					   '</p>',
					   '<p style="font-weight:normal;font-size:14px;">{HighestBidAmount}</p>',  
					'</td>',
					'</tr>',
				'</table>',
           '</tpl>'
           ],
		listeners:{
			 "itemtap": function(list, index, item, e) { 
			 fngetAuctionsItem();
			 Ext.defer(function(){
				fnsetAustionItemDesc(list.getStore().getAt(index),'AuctionItem');	
				Bidpage='AuctionsItem';
			 },3000);
			 
			 
			 }
		}
	   }  ]
	
});
Ext.reg('AuctionsItemform', App.views.AuctionsItem);


// JavaScript Document
App.views.FCFSItemDescription = Ext.extend(Ext.Panel,{
    fullscreen: true,
	sortable  : true,
	  scroll:true,
	  style:'padding:0px',
	id:'FCFSItemDescriptionView',
	//style:'padding:0px 10px 0px 10px',
	cls:'black_gray',
items:[{xtype:'spacer',style:'height:50px;'},
	   {xtype:'spacer',html:'<div>'+
	   '<table width="100%" cellpadding="0" cellspacing="1" border="0">'+
	   	'<tr ><td valign="top" align="center"><img id="FCFSItemImg" onerror="fnItemNoImage(this)" src="" style="padding: 0.5em 0.8em;" /></td></tr>'+
	   '</table></div>'},{ xtype:'spacer',cls:'setPageTop',
	   	 html:'<div style="margin-right:5px;margin-left:5px;">'+
		      '<table width="100%" cellpadding="0" cellspacing="1" border="0" class="x-list">'+
			  '<tr class="x-Table-item "><td valign="top" >Item Name:<p><span id="FCFSItemName"></span></p></td></tr>'+
			  '<tr class="x-Table-item "><td valign="top" >Item Avalible For Level:<p><span id="FCFSItemLevel"></span></p></td></tr>'+
			  '<tr class="x-Table-item "><td valign="top" >Quantity Available: <p><span id="FCFSItemAuntity"></span><input type="hidden" id="hdnBasicBidPrice" name="hdnBasicBidPrice"></p></td></tr>'+
			  '<tr class="x-Table-item " style="display:none;"><td >Description:<p><span id="MentioneBarTabDescription"></span><input type="hidden" id="EventId"/><input type="hidden" id="hdnBidPoint" name="hdnBidPoint"></p></td></tr>'+
			  '<tr class="x-Table-item " ><td >Description:<p><span id="FCFSItemDescription"></span></p></td></tr>'+
			  '<tr class="x-Table-item " ><td >Minimum Required Points:<p><span id="spanMinPoints"></span></p></td></tr>'+
			  '<tr class="x-Table-item " ><td >Item URL:<p><a href="" id="a_FCFSItemItemURL" target="_blank"><span id="FCFSItemItemURL"></span></a></p><input type="hidden" id="hdnItemMinimumReqiiredPoint" name="hdnItemMinimumReqiiredPoint"></td></tr>'+
			  '<tr class="x-Table-item "  align="center"><td ><input type="hidden" id="hdnFCFSItem" name="hdnFCFSItem"><input type="button" class="x-button x-button-normal but_class" value="Submit Your Entry" onclick="fnSubmitEntry();" ></td></tr>'+
			  '</table><div>'
	},{xtype:'spacer',style:'height:50px;'}  ]
	
});
Ext.reg('FCFSDescriptionform', App.views.FCFSItemDescription);


	Ext.regApplication({
	name: 'App',
    defaultUrl: 'EbarTab/index',
    launch: function()
    {
       this.viewport = new App.views.Viewport();
    },
});



// JavaScript Document MySearchClubstore

var ClubList = new Ext.List({
    store: MySearchClubstore,
	id:'ClubList',
    emptyText :'<p onClick="fnpageNav(5)" style="color:#fff;">&nbsp;Data Not Found.....<br>&nbsp;Show All Club</p>', 
    itemTpl:['<tpl for=".">',
                 '<table style="width: 100%;">',
					'<tr >',
					'<td class="img" style="width: 70px;"><img width="60px" height="60px" onerror="fnItemNoImage(this)"  src="'+SreverURL+'Gallery/{FileImage}"  alt=""/></td>',
					'<td style="text-align:left">',
						'<b style="font-size: 16px;">{Name}</b>',
						'<p style="text-align:left;color: #ACACAC;">{SiteURL}</p>',
					'</td>',
					'</tr>',
				'</table>',
           '</tpl>'
           ],
	listeners:{
			 "itemtap": function(list, index, item, e) {
				 fnsetcluDesc(list.getStore().getAt(index));
				 }
	  		}
	
});

App.views.MyClub = Ext.extend(Ext.Panel,{
	sortable  : true,
	scroll:true,
	dockedItems:[{
     	xtype:'toolbar',
     	items:[{xtype:'searchfield',id:'txtSearchClub',flex:1,cls:'SearchFieldPos',			  
			   listeners: {
				   keyup: function (field, e) {
					   Ext.getCmp('ClubList').refresh();
					   var tempData = [];
					   var value = field.getValue();
					   //alert(MyClubstore.getCount());
					    //value.length==0
					   if(value.length==0){
						    Ext.getCmp('ClubList').refresh();
						if (e.browserEvent.keyCode == 8) {
							MyClubstore.each(function (record) {
								tempData.push(record);
							});
							MySearchClubstore.loadData(tempData);
					 }
					}
					//EO value.length==0
					if (value.length > 0) {
						 Ext.getCmp('ClubList').refresh();
						MyClubstore.each(function (record) {
							if (record.get('Name').toLowerCase().match(value.toLowerCase()))
							tempData.push(record);
						});
					MySearchClubstore.loadData(tempData);
					}
					//EO value.length > 0	
					if(Ext.getCmp('ClubList').rendered){					
					Ext.getCmp('ClubList').scroller.scrollTo({
					 x:0, y:0
					 });		
					 }
					
				   } //EO keyup: function (field, e)	
				
					
				   
			   }
			   }]
     }],
	id:'MyClubView',
	style:'padding:0px',
	cls:'black_gray',
	layout:'fit',
	items:[ClubList]
	
});

Ext.reg('MyClubform', App.views.MyClub);





// JavaScript Document

var redeemPanel=new Ext.Panel({
	items:[{xtype:'button',text:'Redeem',handler:redeemVoucher} ],
	
});
App.views.MyVoucher = Ext.extend(Ext.Panel,{
    fullscreen: true,
	sortable  : true,
	  scroll:true,
	id:'MyVoucherView',
	cls:'black_gray',
	//layout:'fit',
	items:[  {
	   xtype:'list',
	    store: voucherstore,
		id:'voucherstoreList',
		emptyText :'No Data Found',
		itemTpl:['<tpl for=".">',
                 '<table style="width: 100%;" id="VoucherListView">',
					'<tr >',
					'<td style="text-align:left">',
						'<b style="font-size: 16px;">{Vendor}</b>',
						'<p style="text-align:left;color: #ACACAC;">{Date}</p>',
					'</td>',
					'<td  style="text-align:right">',
					   '<p style="font-weight:normal;font-size:14px;">{Amount}',
					   /*'</p><input type="hidden" value="{Id}">',*/
					   '</p><input type="hidden" value="{VoucherAllotmentID}">',
					'</td>',
					'</tr>',
				'</table>',
           '</tpl>'
           ],
		
		listeners:{
			 "itemtap": function(list, index, item, e) {
				 if(swipeButton){}else{fnsetVoucherDesc(list.getStore().getAt(index));}
			 //fnsetVoucherDesc(list.getStore().getAt(index));
			 },
			  "render":function(panel)
               {
                    panel.getEl().on({
                        'swipe':function(index, item, e)
                        {
				if(item.parentNode.className=="" || item.parentNode.className==null)
				{
					 var tableName=item.parentNode.parentNode.parentNode.parentNode;
					 
					if(tableName.id!="VoucherListView"){
						tableName=item.parentNode.parentNode.parentNode;
					}
					var swipeItemIndex = voucherstore.findExact("VoucherAllotmentID", tableName.getElementsByTagName('input')[0].value);
					var VId=tableName.getElementsByTagName('input')[0].value;
						if(swipeButton)
							{
								swipeButton.destroy();
								swipeButton=null;
							}
							else
							{
							swipeButton = new Ext.Button({
                                    renderTo:tableName.childNodes[0].childNodes[0],
                                    id:'btnSwipeButton',
                                    dock:'right',
									width: 100,
                                    text:'Redeem',
                                    handler:function(index, btn, e){
								 	 fndeleteVoucher(VId);
                                     voucherstore.removeAt(swipeItemIndex);
                                     swipeItemIndex=-1; 
									 swipeButton=null;
                                     //Ext.getCmp('ReceiptList').bindStore(store_photo);
									 Ext.getCmp('voucherstoreList').bindStore(voucherstore);
									
                                    }
                                });
								}
						}
						
						}});
			   }
		}
	   }]
	
});
Ext.reg('MyVoucher', App.views.MyVoucher);


App.views.ProDescription = Ext.extend(Ext.Panel,{
    fullscreen: true,
	sortable  : true,
	  scroll:true,
	  style:'padding:0px',
	id:'ProDescriptionView',
	//style:'padding:0px 10px 0px 10px',
	cls:'black_gray',
items:[{xtype:'spacer',style:'height:50px;'},
	   {xtype:'spacer',html:'<div>'+
	   '<table width="100%" cellpadding="0" cellspacing="1" border="0">'+
	   	'<tr ><td valign="top" align="center"><img id="PromoterImg" src="" style="padding: 0.5em 0.8em;" onerror="fnItemNoImage(this)" /></td></tr>'+
	   '</table></div>'},{ xtype:'spacer',cls:'setPageTop',
	   	 html:'<div style="margin-right:5px;margin-left:5px;">'+
		      '<table width="100%" cellpadding="0" cellspacing="1" border="0" class="x-list">'+
			  '<tr class="x-Table-item "><td valign="top" >Title:<p><span id="proTitleName"></span></p></td></tr>'+
			  '<tr class="x-Table-item "><td valign="top" >Description: <p><span id="proDescription"></span><input type="hidden" id="hdnBasicBidPrice" name="hdnBasicBidPrice"></p></td></tr>'+
			  '<tr class="x-Table-item "><td >SiteURL:<p><a href="" id="a_SiteURl" target="_blank"><span id="ProSiteURL"></span></a></p></td></tr>'+
			  '</table><div>'
	},{xtype:'spacer',style:'height:50px;'} ]
	
});
Ext.reg('ProDescriptionform', App.views.ProDescription);

// JavaScript Document
App.views.EbarTabHome = Ext.extend(Ext.Panel,{
    fullscreen: true,
	  scroll:true,
	id:'EbarTabHomeTabPanel',
	cls:'black_gray',
	tabBar: {
		dock: 'bottom',
		layout: {
			pack: 'center'
		},
		cardSwitchAnimation: {
			type: 'slide',
			cover: true
		},
		listeners:{
			change: function(ctrl, tab, card){

			}
		}
	},
	items:[App.views.profile]
	
});
Ext.reg('EbarTabHomePage', App.views.EbarTabHome);



// JavaScript Document
App.views.ClubDescription = Ext.extend(Ext.Panel,{
    fullscreen: true,	sortable  : true,	  scroll:true,	id:'ClubDescriptionView',	cls:'black_gray',
items:[{xtype:'spacer',style:'height:50px;'},
	   {xtype:'spacer',html:'<div>'+
	   '<table width="100%" cellpadding="0" cellspacing="1" border="0">'+
	   	'<tr ><td valign="top" align="center"><img id="ClubImg" src="" style="padding: 0.5em 0.8em;" onerror="fnItemNoImage(this)" /></td></tr>'+
	   '</table></div>'},{ xtype:'spacer',cls:'setPageTop',
	   	 html:'<div style="margin-right:5px;margin-left:5px;">'+
		      '<table width="100%" cellpadding="0" cellspacing="1" border="0" class="x-list">'+
			  '<tr class="x-Table-item "><td valign="top" >Name:<p><span id="ClubName"></span></p><input type="hidden" id="hdnClubName"><input type="hidden" id="hdnClubid"></td></tr>'+
			  '<tr class="x-Table-item "><td valign="top" >Address:<p><a  onClick="fnopenMap()"><span id="ClubAddress" style="color:#EDD780";></span></a></p><input type="hidden" id="hdnClubAddress"></td></tr>'+
			  '<tr class="x-Table-item "><td valign="top" >Description: <p><span id="ClubDescription"></span><input type="hidden" id="hdnBasicBidPrice" name="hdnBasicBidPrice"></p></td></tr>'+
			  '<tr class="x-Table-item "><td >URL:<p><a href="" id="a_ClubURl" target="_blank"><span id="ClubURL"></span></a><input type="hidden" id="EventId"/><input type="hidden" id="hdnBidPoint" name="hdnBidPoint"></p></td></tr>'+
			  '<tr class="x-Table-item " ><td >Email:<p><a href="" id="a_ClubEmail" target="_blank"><span id="ClubEmail"></span></a></p></td></tr>'+
			  '<tr class="x-Table-item " ><td >Phone:<p><a href="tel:" id="ClubPhone_A"><span id="ClubPhone"></span></a></p><input type="hidden" id="hdnItemMinimumReqiiredPoint" name="hdnItemMinimumReqiiredPoint"></td></tr>'+
			  '<tr class="x-Table-item " ><td >Multiplier:<p><span id="ClubMultiplier"></span></p></td></tr>'+
			  '</table><div>'
	},{xtype:'spacer',style:'height:50px;'} ]
	
});
Ext.reg('ClubDescriptionform', App.views.ClubDescription);


// JavaScript Document
App.views.Login = Ext.extend(Ext.Panel,{
   fullscreen:true,
            scroll:true,
			id:'userLoginPage',
			cls:'bodyBG',
			layout: {pack: 'center',align:'center'},
            items:[
                {xtype:'spacer',baseCls:'logo',style:'height:90px;'},
                {
                    xtype:'fieldset',
                    
                    cls:'padding',
					layout: {
						pack: 'center',align:'center'
						},
                    defaults: {
                        required: false,
                        labelAlign: 'left',
                        labelWidth: '35%'
                    },
                    items:[
                        {xtype:'emailfield',name :'Email',id:'Email', cls:'login',label: 'Email Id'}, 
                        {xtype:'passwordfield',name :'password', cls:'loginPW',id:'password', label: 'Password'} 
                    ]
                }, {
                      xtype:'button',
					  layout: {
						pack: 'center',align:'center'
						},
                    cls:'padding but_class',
                    text:'Login',
                    handler:function()  // Function for switch to home screen
                    { 
						fnRemember();
						fncheckEmailID();
					}
                },{xtype:'spacer',style:'height:10px;'},{
                      xtype:'button',
                    cls:'btn_ext1',
                    text:'Register',
                    handler:function()  // Function for switch to home screen
                    { 
						Ext.dispatch({
							controller: 'EbarTab',
							action: 'Register',
							historyUrl: 'EbarTab/Register',
							animation: {
								type: 'slide',
								direction:'left'
							},
						});
					}
                },
				{xtype:'spacer',style:'height:10px;'},{
                      xtype:'button',
                    cls:'btn_ext1',
                    text:'What is E-barTab',
                    handler:function()  // Function for switch to home screen
                    { 
						Ext.dispatch({
							controller: 'EbarTab',
							action: 'WhatIsEbarTab',
							historyUrl: 'EbarTab/WhatIsEbarTab',
							animation: {
								type: 'slide',
								direction:'left'
							},
						});
					}
                },
				{xtype:'spacer',style:'height:10px;'},{
                      xtype:'button',
                    cls:'btn_ext1',
                    text:'How To Upload Receipts',
                    handler:function()  // Function for switch to home screen
                    { 
						Ext.dispatch({
							controller: 'EbarTab',
							action: 'HowToUploadReceipts',
							historyUrl: 'EbarTab/HowToUploadReceipts',
							animation: {
								type: 'slide',
								direction:'left'
							},
						});
					}
                },
				{xtype:'checkboxfield',id:'chkRemember',cls:'bg',value:true,label:'Remember Me', labelWidth: '40%',
             },
				
            ]
});
Ext.reg('EbarTabLogin', App.views.Login);

