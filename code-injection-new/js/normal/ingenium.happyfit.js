














/**************************************************************************
MyGymmit v.1.0.2.0 - 18/09/2013
**************************************************************************/
//Set this to false if it is mobile site; set to true if it is mobile app
var isApp = true;

var appName = 'Happy Fit';

var timezoneOffset = new Date().getTimezoneOffset() * 60000;

var weekDays = ['','Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato','Domenica'];

var viewModel = {

    //PRODUCTION
    baseUrl: "http://www.gymmit.com",
    //STAGE
    //baseUrl: "http://stage.gymmit.com",
    //DEVELOPMENT
    //baseUrl: "http://192.168.0.6/gmt",

    applicationUID: "C8975BA5-49EF-46CA-8C8D-32AB0E83EED3",

    centerUID: "",

    centerName: ko.observable(''),

    isAuthenticated: ko.observable(false),

    getAuthToken: function(){
        if (viewModel.getAuthData()){
            return viewModel.getAuthData().Token;
        }
        else{
            return "";
        }
    },

    getRegisteredCenters: function()
    {
        return JSON.parse(window.localStorage.getItem("RegisteredCenters"));
    },

    addRegisteredCenter: function(data)
    {
        var centers; // = JSON.parse(window.localStorage.getItem("RegisteredCenters"));
        var found = false;
        if (centers)
        {
            for (var i=0;i<centers.length;i++)
            {
                if (centers[i].centerID==data.centerID)
                    found=true;
            }
            if (!found)
                centers.push(data);
        }
        else
        {
            centers = [];
            for (var i=0;i<data.length;i++){
                centers.push(data[i]);
            }
        }
        window.localStorage.setItem("RegisteredCenters", JSON.stringify(centers));
    },

    getPersistedData: function(key)
    {
        return JSON.parse(window.localStorage.getItem(key));
    },

    setPersistedData: function(key, data)
    {
        window.localStorage.setItem(key, JSON.stringify(data));
    },

    removePersistedData: function(key)
    {
        window.localStorage.removeItem(key);
    },
    
    //Rimuovo tutti i calendari cachati (cominiciano per cal_
    removeCachedCalendars: function()
    {
        var keys=[];
        for (i=0; i<=localStorage.length-1; i++) {
            key = localStorage.key(i);
            console.log(key);
            if (key.substring(0,4)=="cal_")
            {
                
                keys.push(key);
            }
        }
        window.localStorage.removeItem("calendars");
        for (i=0; i<=keys.length-1; i++) {
            window.localStorage.removeItem(keys[i]);
        }
    },
    
    // Legge il centro selezionato
    getCenterData: function()
    {
        return JSON.parse(window.localStorage.getItem("CenterData"));
    },

    // Imposta il centro selezionato
    setCenterData: function(data)
    {
        window.localStorage.setItem("CenterData", JSON.stringify(data));
    },

    getAuthData: function()
    {
        return JSON.parse(window.localStorage.getItem("AuthData"));
    },

    setAuthData: function(data)
    {
        window.localStorage.setItem("AuthData", JSON.stringify(data));
    },

    getUserAvatarUrl: function(userID, uniqueID)
    {
        return viewModel.baseUrl + "/portals/0/gmt/users/" + userID + "/1200/P_" + uniqueID + ".jpg";
    },

    getSmallAvatarUrl: function(entityRefID, entityTypeID, uniqueID)
    {
        if (entityTypeID==0)
            return viewModel.baseUrl + "/portals/0/gmt/users/" + entityRefID + "/1200/A_" + uniqueID + ".jpg";
        else if (entityTypeID==1)
            return viewModel.baseUrl + "/portals/0/gmt/centers/" + uniqueID + "/A_" + uniqueID + ".jpg";
    },

    getCenterLogoUrl: function(uniqueID)
    {
        return viewModel.baseUrl + "/portals/0/gmt/centers/" + uniqueID + "/L_" + uniqueID + ".jpg";
    },

    getCenterSquareLogoUrl: function(uniqueID)
    {
        return viewModel.baseUrl + "/portals/0/gmt/centers/" + uniqueID + "/Q_" + uniqueID + ".jpg";
    },

    getCenterCoverUrl: function(uniqueID)
    {
        console.log(viewModel.baseUrl + "/portals/0/gmt/centers/" + uniqueID + "/C_" + uniqueID + ".jpg");
        return viewModel.baseUrl + "/portals/0/gmt/centers/" + uniqueID + "/C_" + uniqueID + ".jpg?" + (new Date()).getTime();
    },

    setCurrentCenter: function()
    {
        var centerData = viewModel.getCenterData();
        //Imposto grafica
        //$(".appHeader").css("background-color", centerData.DarkColor);
        $(".appHeader").css("background","-webkit-linear-gradient(top, "+centerData.LightColor+" 40%, "+centerData.DarkColor+")");
        $(".companyName").css("color", "#ffffff");
        $(".companyName").text(centerData.CenterName);
        $(".logoSquare").attr("src", viewModel.getCenterSquareLogoUrl(centerData.CenterUID));
        $(".cover").attr("src", viewModel.getCenterCoverUrl(centerData.CenterUID));
        $('.formee input[type="button"]').css("background","-webkit-linear-gradient(top, "+centerData.LightColor+" 40%, "+centerData.DarkColor+")");
        $('.formee input[type="button"]').css("border", centerData.DarkColor);
        $('.page').css("background-color", centerData.BackColor);

        viewModel.clubInfoViewModel.show(true);

    },

    setCurrentUser: function()
    {
        //proxy.me(viewModel.getAuthToken(), function(result){
        //     viewModel.profileViewModel.userID = result.UserID;
        //     viewModel.profileViewModel.displayName(result.DisplayName);
        //     viewModel.profileViewModel.uniqueID = result.UniqueID;
        //     viewModel.profileViewModel.avatarUrl(viewModel.getUserAvatarUrl(result.UserID, result.UniqueID));
        //viewModel.isAuthenticated(true);
        //     $(".message").show();
        //});
    },

    logOutCurrentUser : function()
    {
        viewModel.loginViewModel.email("");
        viewModel.loginViewModel.password("");
        window.localStorage.removeItem("AuthData");
        viewModel.profileViewModel.userID = 0;
        viewModel.profileViewModel.displayName("");
        viewModel.profileViewModel.uniqueID = "";
        viewModel.profileViewModel.avatarUrl("");
        viewModel.isAuthenticated(false);
        $(".message").hide();
    },

    /****************************************************************
    Start ViewModel : profileViewModel
    ****************************************************************/
    profileViewModel: {
        userID: 0,
        displayName: ko.observable(""),
        uniqueID: "",
        avatarUrl: ko.observable("")
    },

    centersViewModel: {
        centers: ko.observableArray([])
    },

    /****************************************************************
    Start ViewModel : voucherViewModel
    ****************************************************************/
    voucherViewModel: {
        voucher: ko.observable(""),
        confirmVoucher: function(){
            //Claim Voucher
            proxy.claimMobileVoucher(this.voucher(), function(data){
                if (data.Successful)
                {
                    //se il sistema trova i voucher, li salva nel local storage
                    viewModel.addRegisteredCenter(data.MobileVouchers);
                    //imposta come centro attivo il primo che trova
                    //console.log(JSON.stringify(data.MobileVouchers[0]));
                    viewModel.setCenterData(data.MobileVouchers[0]);
                    //imposta e carica i dati del centro
                    viewModel.setCurrentCenter();
                    $("#pnlVoucher").hide();
                    $("#pnlHome").show();
                    $(".menu-trigger").show();
                    viewModel.voucherViewModel.voucher('')
                    //Navigo alla pagina start
                    window.location.href = "#start";
                }
                else
                {
                    popupMessage("Nessun voucher trovato.");
                }
            },
            function(a,b,c){
                window.popupMessage('Codice di attivazione errato.');
            });
        }
    },

    /****************************************************************
    Start ViewModel: loginViewModel
    ****************************************************************/
    loginViewModel: {
        email: ko.observable(""),
        password: ko.observable(""),
        clubs : ko.observableArray([]),
        selectedClub: ko.observable(),

        login: function(){
            proxy.authenticateThirdParty(this.email(), this.password(), viewModel.loginViewModel.selectedClub.CenterUID, viewModel.applicationUID, function(result){
                if (result.Successful)
                {
                    viewModel.setAuthData(result);
                    viewModel.isAuthenticated(true);
                    $("#loggedUserName").text(viewModel.getAuthData().DisplayName);
                    window.location.href = "#start";
                }
                else
                {
                    window.localStorage.removeItem("AuthData");
                    viewModel.isAuthenticated(false);
                    popupMessage('Credenziali errate.');
                }
            },
            function(){
                popupMessage('Impossibile comunicare con il server.');
            });
        },

        logOut: function(){
            viewModel.logOutCurrentUser();
            window.location.href = "#start";
        },

        facebookLogin: function() {
            var appId = "187970744566350";
            window.plugins.facebookConnect.login({permissions: ["email", "publish_stream"], appId: appId}, function(result) {
                proxy.authenticateFacebook({AuthToken: result.accessToken, CenterID: viewModel.getCenterData().CenterID, ApplicationUID: viewModel.applicationUID},
                    function(response){
                        if (response.Successful)
                        {
                            viewModel.setAuthData(response);
                            viewModel.setCurrentUser();
                            window.location.href = "#start";
                        }
                        else
                        {
                            popupMessage('Credenziali errate.');
                        }
                    },
                    function(a,b,c){
                        popupMessage('Impossibile comunicare con il server.');
                    }
                );
            });
        }
    },

    afterShowLogin: function()
    {
        viewModel.loginViewModel.clubs.removeAll();
        viewModel.loginViewModel.clubs(viewModel.getRegisteredCenters());
        viewModel.loginViewModel.selectedClub = viewModel.getCenterData();
    },

    /****************************************************************
    Start ViewModel: homeViewModel
    ****************************************************************/
    homeViewModel : {

        areaClienti: function(){
            window.open('http://my.happyfit.it', '_blank', 'location=yes');
        },

        presenta: function(){
            window.location.href = "#introduce";
        },

        assistenza: function(){
            window.open('http://www.happyfit.it/ticket', '_blank', 'location=yes');
        },

        vantaggi: function(){
            window.location.href = "#advantage";
        }
    },

    afterShowHome : function() {
        //Se per il centro è abilitata la pubblicità...
        if (viewModel.getCenterData() && viewModel.getCenterData().IsAdvertisementEnabled)
        {
            proxy.getRandomAdvertisement(
                function(result){
                    if (result.Successful)
                    {
                        if (result.Advertisements.length > 0)
                        {
                            $(".footer").css("background-color", result.Advertisements[0].BackgroundColor);
                            //$(".advUrl").attr("resourceUrl", result.Advertisements[0].URL);
                            $(".advUrl").click({resourceUrl: result.Advertisements[0].URL}, viewModel.showAd);
                            $(".advImage").attr("src", result.Advertisements[0].ImageFileUrl);
                            $(".advText").text(result.Advertisements[0].Text);
                            $(".advText").css("color", result.Advertisements[0].ForegroundColor);
                        }
                        else
                        {
                            $(".footer").hide();
                        }
                    }
                },
                function(jqXHR, textStatus, errorThrown){
                    //Communication error...
                    $(".footer").hide();
                }
            );
        }
        else{
            $(".footer").hide();
        }
    },

    /****************************************************************
    Start ViewModel: clubInfoViewModel
    ****************************************************************/
    clubInfoViewModel: {
        address: ko.observable(""),
        centerID: 0,
        history: ko.observable(""),
        isMember: ko.observable(false),
        latitude: 0.0,
        longitude: 0.0,
        membershipEnabled: ko.observable(false),
        municipalityName: ko.observable(""),
        name: ko.observable(""),
        notes: ko.observable(""),
        openHours: ko.observable(""),
        subRegionName: ko.observable(""),
        surface: ko.observable(""),
        uniqueID: "",
        zipCode: ko.observable(""),
        activities: ko.observableArray([]),
        contactDetails: ko.observableArray([]),
        features: ko.observableArray([]),
        photos: ko.observableArray([]),

        init: function(dto)
        {
            this.address(dto.Address);
            this.centerID = dto.CenterID;
            this.history(dto.History);
            this.isMember(dto.IsMember);
            this.latitude = dto.Latitude;
            this.longitude = dto.Longitude;
            this.membershipEnabled(dto.MembershipEnabled);
            this.municipalityName(dto.MunicipalityName);
            this.name(dto.Name);
            this.notes(dto.Notes);
            this.openHours(dto.OpenHours);
            this.subRegionName(dto.SubRegionName);
            this.surface(dto.Surface);
            this.uniqueID=dto.UniqueID;
            this.zipCode(dto.ZipCode);

            this.photos.removeAll();
            for(var i=0;i<dto.Photos.length;i++)
            {
                this.photos.push({thumbURL: viewModel.baseUrl + dto.Photos[i].ThumbURL, photoURL: viewModel.baseUrl + dto.Photos[i].PhotoURL});
            }

            this.contactDetails.removeAll();
            for(var i=0;i<dto.ContactDetails.length;i++)
            {
                var url='';
                switch (dto.ContactDetails[i].ContactTypeID)
                {
                    case 1:
                        url = 'tel:' + dto.ContactDetails[i].Name;
                        break;
                    case 2:
                        url = 'mailto:' + dto.ContactDetails[i].Name;
                        break;
                    case 3:
                    case 4:
                    case 5:
                        url = dto.ContactDetails[i].Name;
                        break;
                }
                this.contactDetails.push({id: dto.ContactDetails[i].ID, iconUrl: "images/contact" + dto.ContactDetails[i].ContactTypeID + ".png" , contactTypeId: dto.ContactDetails[i].ContactTypeID, contactUrl: url, name: dto.ContactDetails[i].Name, description: dto.ContactDetails[i].Description});
            }

            this.activities.removeAll();
            for(var i=0;i<dto.Activities.length;i++)
            {
                this.activities.push({id: dto.Activities[i].ID, description: dto.Activities[i].Description});
            }

            this.features.removeAll();
            for(var i=0;i<dto.Features.length;i++)
            {
                this.features.push({id: dto.Features[i].ID, description: dto.Features[i].Description});
            }
        },

        refresh: function()
        {
            this.show(false);
        },
        
        show: function(useCache)
        {
            var centerInfo;
            var centerData = viewModel.getCenterData();
            if (centerData)
            {
                if (useCache)
                {
                    centerInfo = viewModel.getPersistedData("CenterInfo_" + centerData.CenterUID);
                }

                if (centerInfo)
                {
                    //Cache esistente
                    viewModel.clubInfoViewModel.init(centerInfo);
                }
                else
                {
                    //cache non esiste, leggo i dati dal web service
                    proxy.getCenterInfo(centerData.CenterID, viewModel.getAuthToken(), function(result){
                        if (result.Successful)
                        {
                            //Persist center value in cache
                            viewModel.setPersistedData("CenterInfo_" + centerData.CenterID, result.Center);
                            viewModel.clubInfoViewModel.init(result.Center);
                        }
                        else
                        {
                            //centro non trovato
                        }
                    });
                }
            }

        },

        selectedPhoto: ko.observable({photoURL:"", thumbURL:""}),

        selectPhoto: function(){
            viewModel.clubInfoViewModel.selectedPhoto(this);
            window.location.href = "#photoDetail";
        }
    },

    afterShowInfo: function () {
        var latLng = new google.maps.LatLng(viewModel.clubInfoViewModel.latitude, viewModel.clubInfoViewModel.longitude);
        //Posiziono la latitudine e longitudine
        var mapOptions = {zoom: 12,
                          center: latLng,
                          mapTypeId: google.maps.MapTypeId.ROADMAP,
                          mapTypeControl: false,
                          navigationControl : false,
                          streetViewControl : false,
                          callback : function(map) {
                                        document.getElementById("map_square").gmap('addMarker', {position : map.getCenter(), animation : google.maps.Animation.DROP});
                                     }
                          };
        map = new google.maps.Map(document.getElementById("map_square"), mapOptions);

        var marker = new google.maps.Marker({
            position: latLng,
            title: viewModel.clubInfoViewModel.name()
        });

        // To add the marker to the map, call setMap();
        marker.setMap(map);
        //resizzo (refresho) la mappa, non si sa mai
        google.maps.event.trigger(map, 'resize');

        //refresh
        setTimeout(function () {
                wrpInfo.refresh();
        }, 0);
    },

    afterPhotoGalleryIsDisplayed: function(){
        var imgs = $("#pgContainer img");
        for (var i=0;i<imgs.length;i++){
            fillImage(imgs[i]);
        }
        //refresh
        setTimeout(function () {
                wrpPhotos.refresh();
        }, 0);
    },

    afterPhotoIsDisplayed: function(){
        //refresh
        setTimeout(function () {
                wrpPhoto.refresh();
        }, 0);
    },

    afterPhotoAlbumIsDisplayed: function(){
        //Carico il photo album
        console.log('afterPhotoAlbumIsDisplayed');
        var slides = viewModel.clubInfoViewModel.photos();

        //document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

        var	el,
            i,
            page,
            dots = document.querySelectorAll('#nav li');

        //Svuoto la gallery precedente (se è stata caricata)
        $("#wrpGallery").empty();
        viewModel.gallery = new SwipeView('#wrpGallery', { numberOfPages: slides.length });

        console.log('mpLength: ' + viewModel.gallery.masterPages.length);

        // Load initial data
        for (i=0; i<3; i++) {
            page = i==0 ? slides.length-1 : i-1;
            el = document.createElement('img');
            el.className = 'loading';
            el.src = slides[page].photoURL;
            //el.width = slides[page].width;
            //el.height = slides[page].height;
            el.onload = function () { this.className = ''; }
            viewModel.gallery.masterPages[i].appendChild(el);

            //el = document.createElement('span');
            //el.innerHTML = slides[page].desc;
            //gallery.masterPages[i].appendChild(el)
        }

        $("#selPhoto").text("Foto 1 di " + viewModel.clubInfoViewModel.photos().length);

        viewModel.gallery.onFlip(function () {
            var el,
                upcoming,
                i;

            for (i=0; i<3; i++) {
                upcoming = viewModel.gallery.masterPages[i].dataset.upcomingPageIndex;

                if (upcoming != viewModel.gallery.masterPages[i].dataset.pageIndex) {
                    el = viewModel.gallery.masterPages[i].querySelector('img');
                    el.className = 'loading';
                    el.src = slides[upcoming].photoURL;
                    //el.width = slides[upcoming].width;
                    //el.height = slides[upcoming].height;

                    //el = gallery.masterPages[i].querySelector('span');
                    //el.innerHTML = slides[upcoming].desc;
                }
            }

            $("#selPhoto").text("Foto " + (viewModel.gallery.pageIndex + 1) + " di " + viewModel.clubInfoViewModel.photos().length);

            document.querySelector('#nav .selected').className = '';
            dots[viewModel.gallery.pageIndex+1].className = 'selected';
        });

        viewModel.gallery.onMoveOut(function () {
            viewModel.gallery.masterPages[viewModel.gallery.currentMasterPage].className = viewModel.gallery.masterPages[viewModel.gallery.currentMasterPage].className.replace(/(^|\s)swipeview-active(\s|$)/, '');
        });

        viewModel.gallery.onMoveIn(function () {
            var className = viewModel.gallery.masterPages[viewModel.gallery.currentMasterPage].className;
            /(^|\s)swipeview-active(\s|$)/.test(className) || (viewModel.gallery.masterPages[viewModel.gallery.currentMasterPage].className = !className ? 'swipeview-active' : className + ' swipeview-active');
        });
    },

    /****************************************************************
    Start ViewModel: calendarsViewModel
    ****************************************************************/
    calendarsViewModel : {
        items: ko.observableArray([]),

        selectedCalendar: null,

        loaded: ko.observable(false),

        refresh: function()
        {
            this.show(false);
        },

        show: function(useCache)
        {
            var calendars;
            if (useCache){
                calendars = viewModel.getPersistedData("calendars");
            }
            
            viewModel.calendarsViewModel.items.removeAll();
            
            if (calendars)
            {
                //Cache esistente
                viewModel.calendarsViewModel.loaded(true);
                viewModel.calendarsViewModel.items(calendars);
                //refresh
                setTimeout(function () {
                    wrpCalendars.refresh();
                }, 0);
            }
            else
            {
                //Cache non trovata
                viewModel.calendarsViewModel.loaded(false);
                proxy.getClassCalendars(viewModel.getCenterData().CenterID, viewModel.getAuthToken(),
                    function(result){
                        if (result.Successful)
                        {
                            viewModel.calendarsViewModel.loaded(true);
                            viewModel.setPersistedData("calendars", result.ClassCalendars);
                            viewModel.calendarsViewModel.items(result.ClassCalendars);
                        }

                        //refresh
                        setTimeout(function () {
                            wrpCalendars.refresh();
                        }, 0);
                    }
                );
            }
        },

        navigateCalendar: function()
        {
            viewModel.calendarsViewModel.selectedCalendar = this;
            window.location.href = "#calendar";
        }
    },

    afterShowCalendars:function () {
        viewModel.calendarsViewModel.show(true);
    },

    /****************************************************************
    Start ViewModel: calendarSlotViewModel
    ****************************************************************/
    calendarSlotViewModel: {
        name: ko.observable(""),
        dateTimeStart: ko.observable(new Date()),
        dateTimeEnd: ko.observable(new Date()),
        note: ko.observable("")
    },

    /****************************************************************
    Start ViewModel: calendarSlotViewModel
    ****************************************************************/
    calendarViewModel: {
        name: ko.observable(""),
        slots1: ko.observableArray([]),
        slots2: ko.observableArray([]),
        slots3: ko.observableArray([]),
        slots4: ko.observableArray([]),
        slots5: ko.observableArray([]),
        slots6: ko.observableArray([]),
        slots7: ko.observableArray([]),

        selectedSlot: ko.observable(null),

        selectSlot: function(){
            viewModel.calendarViewModel.selectedSlot(this);
            window.location.href = "#lesson";
        },
        
        backToList: function(){
            history.go(-1);
        },
        
        refresh: function()
        {
            this.show(false);
        },

        show: function(useCache)
        {
            var calId = viewModel.calendarsViewModel.selectedCalendar.ClassCalendarID;
            var calendar;
            if (useCache){
                calendar = viewModel.getPersistedData("cal_" + calId);
            }

            if (calendar)
            {
                //Cache esistente
                viewModel.calendarViewModel.init(calendar);
            }
            else
            {
                //Cache non trovata
                proxy.getClassCalendar(calId, viewModel.getAuthToken(),
                    function(result){
                        if (result.Successful)
                        {
                            viewModel.setPersistedData("cal_" + calId, result);
                            viewModel.calendarViewModel.init(result);
                        }
                    }
                );
            }
        },

        init: function(calendar)
        {
            if (calendar && this.name() != calendar.CalendarName)
            {
                viewModel.calendarViewModel.slots1.removeAll();
                viewModel.calendarViewModel.slots2.removeAll();
                viewModel.calendarViewModel.slots3.removeAll();
                viewModel.calendarViewModel.slots4.removeAll();
                viewModel.calendarViewModel.slots5.removeAll();
                viewModel.calendarViewModel.slots6.removeAll();
                viewModel.calendarViewModel.slots7.removeAll();
                viewModel.calendarViewModel.name(calendar.CalendarName);
                //carico le lezioni in liste distinte per i vari giorni
                for (var i=0;i<calendar.ClassCalendarSlots.length;i++)
                {
                    var slotSet;
                    var cs = calendar.ClassCalendarSlots[i];
                    switch (calendar.ClassCalendarSlots[i].WeekDayID)
                    {
                        case 1:
                            slotSet = viewModel.calendarViewModel.slots1;
                            break;
                        case 2:
                            slotSet = viewModel.calendarViewModel.slots2;
                            break;
                        case 3:
                            slotSet = viewModel.calendarViewModel.slots3;
                            break;
                        case 4:
                            slotSet = viewModel.calendarViewModel.slots4;
                            break;
                        case 5:
                            slotSet = viewModel.calendarViewModel.slots5;
                            break;
                        case 6:
                            slotSet = viewModel.calendarViewModel.slots6;
                            break;
                        case 7:
                            slotSet = viewModel.calendarViewModel.slots7;
                            break;
                    }

                    slotSet.push({activityDescription: cs.ActivityDescription,
                                  weekDay: weekDays[cs.WeekDayID],
                                  dateTimeStart: parseJsonDate(cs.DateTimeStart),
                                  dateTimeEnd: parseJsonDate(cs.DateTimeEnd),
                                  roomName:cs.RoomName,
                                  trainerName:cs.TrainerName,
                                  note: cs.Note,
                                  intensity: cs.Intensity,
                                  isPayed: cs.IsPayed ? "Sì" : "No",
                                  bookMandatory: cs.BookMandatory ? "Sì" : "No",});
                }
            }
            //refresh
            setTimeout(function () {
                wrpCal.refresh();
            }, 0);
        }

    },

    afterShowCalendar: function () {
        viewModel.calendarViewModel.show(true);
    },

    afterShowLesson: function(){
        //Se si desidera fare qualcosa dopo aver visualizzato la lezione...
        //refresh
        setTimeout(function () {
            wrpLesson.refresh();
        }, 0);
    },

    /****************************************************************
    Start ViewModel: newsGalleryViewModel
    ****************************************************************/
    newsGalleryViewModel: {
        items: ko.observableArray([]),

        selectedArticle: ko.observable(null),

        refresh: function()
        {
            this.show(false);
        },

        show: function(useCache)
        {
            var news;
            if (useCache){
                news = viewModel.getPersistedData("news");
            }

            if (news)
            {
                //Cache esistente
                viewModel.newsGalleryViewModel.items(news);
                //refresh
                setTimeout(function () {
                    wrpNews.refresh();
                }, 0);
            }
            else
            {
                //Cache non trovata
                 proxy.getCenterResources(viewModel.getCenterData().CenterID, 1,
                    function(result){
                        if (result.Successful)
                        {
                            viewModel.setPersistedData("news", result.Articles);
                            viewModel.newsGalleryViewModel.items(result.Articles);
                            //refresh
                            setTimeout(function () {
                                wrpNews.refresh();
                            }, 0);
                        }
                    }
                );
            }
        },

        selectArticle: function(){
            viewModel.newsGalleryViewModel.selectedArticle(this);
            window.location.href = "#article";
            setTimeout(function () {
                wrpNew.refresh();
            }, 0);
        }
    },

    afterShowNewsGallery:function () {
        viewModel.newsGalleryViewModel.show(true);
    },

    /****************************************************************
    Start ViewModel: slotsFilterViewModel
    ****************************************************************/
    slotsFilterViewModel: {
        categories : ko.observableArray([]),
        services : ko.observableArray([]),
        selectedCategory: ko.observable(),
        selectedService: ko.observable(),

        searchSlots: function(){
            window.location.href = "#slots";
        },

        goToAccount: function(){
            window.location.href = "#login";
        }
    },

    afterShowSlotsFilter:function () {
        proxy.getServiceCategories(viewModel.getAuthToken(),
            function(result){
                if (result.Successful)
                {
                    viewModel.slotsFilterViewModel.categories(result.Items);
                }
            }
        );
    },

    /****************************************************************
    Start ViewModel: slotsViewModel
    ****************************************************************/
    bookableSlotsViewModel: {
        items: ko.observableArray([]),

        selectedBookableSlot: ko.observable(null),

        selectBookableSlot: function(){
            viewModel.bookableSlotsViewModel.selectedBookableSlot(this);
            window.location.href = "#bookableslot";
        },
        
        backToList: function(){
            history.go(-1);
        },
        
        canBook : function() {
            if (this.selectedBookableSlot())
            {
               if (this.selectedBookableSlot().UserBooked == 0 &&
                    this.selectedBookableSlot().AvailablePlaces > 0 &&
                    this.selectedBookableSlot().MaxBookings > 0) return true;
            }
            return false;
        },

        canWait : function() {
            if (this.selectedBookableSlot())
            {
               if (this.selectedBookableSlot().UserBooked == 0 &&
                    this.selectedBookableSlot().AvailablePlaces == 0 &&
                    this.selectedBookableSlot().UserWaiting == 0 &&
                    this.selectedBookableSlot().MaxBookings > 0) return true;
            }
            return false;
        },

        canCancelBook : function() {
            if (this.selectedBookableSlot())
            {
               if (this.selectedBookableSlot().UserBooked == 1) return true;
            }
            return false;
        },

        canCancelWait : function() {

            if (this.selectedBookableSlot())
            {
               if (this.selectedBookableSlot().UserWaiting == 1) return true;
            }
            return false;
        },

        bookLesson: function(){
            var _bookableSlot = viewModel.bookableSlotsViewModel.selectedBookableSlot();

            var payload = {};
            payload.BookingID = _bookableSlot.BookingID;
            payload.BookingLessonID = _bookableSlot.BookingLessonID;
            payload.StartDate = _bookableSlot.StartDateTime;
            payload.EndDate = _bookableSlot.EndDateTime;
            payload.Note = "",
            payload.BookFor = 1;

            proxy.addReservation(JSON.stringify(payload), viewModel.getAuthToken(),
                function(result){
                    popupMessage(result.Comment);
                    window.location.href = "#myreservations";
                },
                function(){
                    popupMessage('Si è verificato un errore.');
                }
            );
        },

        cancelBookLesson: function()
        {
            var _bookableSlot = viewModel.bookableSlotsViewModel.selectedBookableSlot();

            var payload = {};
            payload.BookingID = _bookableSlot.BookingID;
            payload.BookingLessonID = _bookableSlot.BookingLessonID;
            payload.StartDate = _bookableSlot.StartDateTime;
            payload.EndDate = _bookableSlot.EndDateTime;
            payload.Note = "",
            payload.BookFor = 1;

            proxy.cancelReservation(JSON.stringify(payload), viewModel.getAuthToken(),
                function(result){
                    popupMessage(result.Comment);
                    window.location.href = "#myreservations";
                },
                function(){
                    popupMessage('Si è verificato un errore.');
                }
            );
        },

        waitLesson: function(){
            var _bookableSlot = viewModel.bookableSlotsViewModel.selectedBookableSlot();

            var payload = {};
            payload.BookingID = _bookableSlot.BookingID;
            payload.StartDate = _bookableSlot.StartDateTime;
            payload.EndDate = _bookableSlot.EndDateTime;
            payload.Note = "",

            proxy.addWaitingList(JSON.stringify(payload), viewModel.getAuthToken(),
                function(result){
                    popupMessage(result.Comment);
                    window.location.href = "#myreservations";
                },
                function(){
                    popupMessage('Si è verificato un errore.');
                }
            );
        },

        cancelWaitLesson: function()
        {
            var _bookableSlot = viewModel.bookableSlotsViewModel.selectedBookableSlot();

            var payload = {};
            payload.BookingID = _bookableSlot.BookingID;
            payload.BookingLessonID = _bookableSlot.BookingLessonID;
            payload.StartDate = _bookableSlot.StartDateTime;
            payload.EndDate = _bookableSlot.EndDateTime;
            payload.Note = "",
            payload.BookFor = 1;

            proxy.cancelWaitingList(JSON.stringify(payload), viewModel.getAuthToken(),
                function(result){
                    popupMessage(result.Comment);
                    window.location.href = "#myreservations";
                },
                function(){
                    popupMessage('Si è verificato un errore.');
                }
            );
        }
    },

    afterShowBookableSlots:function () {
        var categoryID = viewModel.slotsFilterViewModel.selectedCategory().CategoryID;
        var serviceID = viewModel.slotsFilterViewModel.selectedService().ServiceID;
        var now = new Date();
        proxy.getBookingSlots(serviceID, categoryID, 7, now.toString('yyyy-MM-dd'), '1900-01-01T00:00:00', '1900-01-01T23:59:59', viewModel.getAuthToken(),
            function(result){
                if (result.Successful)
                {
                    viewModel.bookableSlotsViewModel.items(result.Items);
                    //refresh
                    setTimeout(function () {
                        wrpSlots.refresh();
                    }, 0);
                }
            }
        );
    },

    afterShowBookableSlot:function () {
        //refresh
        setTimeout(function () {
            wrpSlot.refresh();
        }, 0);
    },

    /****************************************************************
    Start ViewModel: videoGalleryViewModel
    ****************************************************************/
    videoGalleryViewModel: {
        items: ko.observableArray([]),
        showVideo: function(o)
        {
            if (isApp)
            {
                var ref = window.open(o.ResourceUrl, '_blank', 'location=yes');
            }
            else
            {
                window.location.href = o.ResourceUrl;
            }

        }
    },

    afterVideoGalleryIsDisplayed:function () {
        proxy.getCenterResources(viewModel.getCenterData().CenterID, 2,
            function(result){
                if (result.Successful)
                {
                    viewModel.videoGalleryViewModel.items(result.Articles);
                    //refresh
                    setTimeout(function () {
                        wrpVideos.refresh();
                    }, 0);
                }
            },
            function(a,b,c)
            {
                popupMessage(a+b+c);
            }
        );
    },

    /****************************************************************
    Start ViewModel: bookingsViewModel
    ****************************************************************/
    myReservationsViewModel: {
        items: ko.observableArray([]),

        selectedReservation: ko.observable(null),

        loaded: ko.observable(false),

        selectReservation: function(){
            viewModel.myReservationsViewModel.selectedReservation(this);
            window.location.href = "#myreservation";
        },
        
        backToList: function(){
            history.go(-1);
        },
        
        canCancelBook : function() {
            if (this.selectedReservation())
            {
               if (this.selectedReservation().WaitingList == 0) return true;
            }
            return false;
        },

        canCancelWait : function() {
            if (this.selectedReservation())
            {
               if (this.selectedReservation().WaitingList == 1) return true;
            }
            return false;
        },

        cancelBookLesson: function()
        {
            var _reservation = this.selectedReservation();
            var payload = {};
            payload.BookingID = _reservation.BookingID;
            payload.BookingLessonID = _reservation.BookingLessonID;
            payload.StartDate = _reservation.StartDate;
            payload.EndDate = _reservation.EndDate;
            payload.Note = "",
            payload.BookFor = 1;

            proxy.cancelReservation(JSON.stringify(payload), viewModel.getAuthToken(),
                function(result){
                    popupMessage(result.Comment);
                    window.location.href = "#myreservations";
                },
                function(){
                    popupMessage('Si è verificato un errore.');
                    window.location.href = "#myreservations";
                }
            );
        },

        cancelWaitLesson: function()
        {
            var _reservation = this.selectedReservation();

            var payload = {};
            payload.BookingID = _reservation.BookingID;
            payload.BookingLessonID = _reservation.BookingLessonID;
            payload.StartDate = _reservation.StartDate;
            payload.EndDate = _reservation.EndDate;
            payload.Note = "",
            payload.BookFor = 1;

            proxy.cancelWaitingList(JSON.stringify(payload), viewModel.getAuthToken(),
                function(result){
                    popupMessage(result.Comment);
                    window.location.href = "#myreservations";
                },
                function(){
                    popupMessage('Si è verificato un errore.');
                    window.location.href = "#myreservations";
                }
            );
        },

        goToAccount: function(){
            window.location.href = "#login";
        }

    },

    afterShowMyReservations:function () {
        viewModel.myReservationsViewModel.loaded(false);
        proxy.getMyReservations(viewModel.getAuthToken(),
            function(result){
                if (result.Successful)
                {
                    viewModel.myReservationsViewModel.loaded(true);
                    viewModel.myReservationsViewModel.items(result.Items);
                    setTimeout(function () {
                        wrpMyReservations.refresh();
                    }, 0);
                }
            }
        );
    },

    /****************************************************************
    Start ViewModel: settingsViewModel
    ****************************************************************/
    settingsViewModel: {

        enterVoucher: function(){
            window.location.href = "#voucher";
        },

        clearCache: function(){
            window.localStorage.clear();
            $(".companyName").text(appName);
            $(".menu-trigger").hide();
            viewModel.logOutCurrentUser();
            window.location.href = "#voucher";
        }
    },

    /****************************************************************
        Start ViewModel: bookingsViewModel
    ****************************************************************/
    messageBoardViewModel: {
        messages: ko.observableArray([]),

        selectedMessage: null,

        navigateMessage: function()
        {
            viewModel.messageBoardViewModel.selectedMessage = this;
            window.location.href = "#message";
        },

        messageText: ko.observable(""),

        sendMessage: function()
        {
            if (this.messageText()!=='')
            {
                var message = {};
                message.AuthToken = viewModel.getAuthToken();
                message.ApplicationUID = viewModel.applicationUID;
                message.MessageText = this.messageText();
                message.ParentID = null;
                message.MessageTypeID = 0,
                message.EntityRefID = viewModel.getCenterData().CenterID;
                message.EntityTypeID = 1;
                message.CreatorRefID = viewModel.profileViewModel.userID;
                message.CreatorTypeID = 0
                message.VisibilityType = 0;

                proxy.postNoticeBoardMessage(JSON.stringify(message),
                    function(){
                        this.messageText("");
                        viewModel.messageBoardViewModel.messages.removeAll();
                        proxy.getNoticeBoardMessages(viewModel.getCenterData().CenterID, 1, 1, viewModel.getAuthToken(),
                            function(result){
                                if (result.Successful)
                                {
                                    viewModel.messageBoardViewModel.messages(result.Messages);
                                }
                            }
                        );
                    },
                    function(){

                    }
                );
            }
        },

        loadOthers: function()
        {
            //TODO!!
        }
    },

    /****************************************************************
    Start ViewModel: messageViewModel
    ****************************************************************/
    messageViewModel: {
        comments: ko.observableArray([]),
        MessageText: ko.observable(""),
        creatorRefID: ko.observable(0),
        creatorTypeID: ko.observable(0),
        creatorUID: ko.observable(""),
        CreatorName: ko.observable(""),
        CommentsCount: ko.observable(0),
        commentText: ko.observable(""),
        avatarUrl: ko.observable(""),

        sendComment: function(){
            if (this.commentText()!=='' && viewModel.getAuthToken()!=='')
            {
                var comment = {};
                comment.AuthToken = viewModel.getAuthToken();
                comment.ApplicationUID = viewModel.applicationUID;
                comment.MessageText = this.commentText();
                comment.ParentID = viewModel.messageBoardViewModel.selectedMessage.ID;
                comment.MessageTypeID = 0,
                comment.EntityRefID = viewModel.getCenterData().CenterID;
                comment.EntityTypeID = 1;
                comment.CreatorRefID = viewModel.profileViewModel.userID;
                comment.CreatorTypeID = 0
                comment.VisibilityType = 0;
                proxy.postNoticeBoardMessage(JSON.stringify(comment),
                    function(){
                        this.commentText("");
                        proxy.getNoticeBoardMessage(viewModel.messageBoardViewModel.selectedMessage.ID, viewModel.getAuthToken(),
                            function(result){
                                viewModel.messageViewModel.CreatorName(result.Messages[0].CreatorName);
                                viewModel.messageViewModel.MessageText(result.Messages[0].MessageText);
                                viewModel.messageViewModel.comments(result.Messages[0].Comments);
                                viewModel.messageViewModel.CommentsCount(result.Messages[0].CommentsCount);
                            }
                        );
                    },
                    function(){

                    }
                );
            }
        }
    },

    /****************************************************************
    Start ViewModel: clubListViewModel
    ****************************************************************/
    clubListViewModel: {
        clubs: ko.observableArray([]),

        selectedClub: null,

        selectClub: function()
        {
            viewModel.clubListViewModel.selectedClub = this;
            //Devo selezionare il club dalla lista e leggere le informazioni del club
            viewModel.removePersistedData("CenterInfo");
            viewModel.removeCachedCalendars();
            viewModel.setCenterData(this);
            viewModel.setCurrentCenter();
            window.location.href = "#start";
        }
    },

    afterClubListIsDisplayed: function(){
        //Carico i centri registrati e memorizzati nello storage
        viewModel.clubListViewModel.clubs.removeAll();
        viewModel.clubListViewModel.clubs(viewModel.getRegisteredCenters());
        setTimeout(function () {
            wrpClubs.refresh();
        }, 0);
    },

    /****************************************************************
    Start ViewModel: registerViewModel
    ****************************************************************/
    registerViewModel: {
        firstName: ko.observable(""),
        lastName: ko.observable(""),
        eMail: ko.observable(""),
        gender: ko.observable("M"),
        birthDate: ko.observable(""),
        password: ko.observable(""),
        repeatPassword: ko.observable(""),
        centerID: 0,

        registerUser: function() {
            var isValid = true;
            var errorMessage = '';

            if (this.firstName()===''){
                isValid = false;
                errorMessage = errorMessage + '\nSpecificare il nome.';
            }
            if (this.lastName()===''){
                isValid = false;
                errorMessage = errorMessage + '\nSpecificare il cognome.';
            }
            if (this.eMail()===''){
                isValid = false;
                errorMessage = errorMessage + '\nSpecificare una e-mail.';
            }

            if (this.password()===''){
                isValid = false;
                errorMessage = errorMessage + '\nSpecificare una password.';
            }
            if (this.password()!==this.repeatPassword()){
                isValid = false;
                errorMessage = errorMessage + '\nPassword non corrispondente.';
            }

            if (!isValid)
            {
                alert(errorMessage);
            }
            else
            {
                var request = {FirstName: this.firstName(),
                               LastName: this.lastName(),
                               Email: this.eMail(),
                               Gender: this.gender(),
                               BirthDate: this.birthDate(),
                               Password: this.password(),
                               ApplicationUID: viewModel.applicationUID,
                               CenterID: viewModel.getCenterData().CenterID};
                //Register, login e redirect alla home

                proxy.gymmitEnrollUser(request,function(result){
                    popupMessage(result.Successful + result.Comment);
                },
                function(a,b,c){
                    popupMessage(a+b+c);
                });
            }
        }
    },

    afterMessageBoardIsDisplayed: function(){
        proxy.getNoticeBoardMessages(viewModel.getCenterData().CenterID, 1, 1, viewModel.getAuthToken(),
            function(result){
                if (result.Successful)
                {
                    viewModel.messageBoardViewModel.messages(result.Messages);
                }
            }
        );
    },

    afterMessageIsDisplayed: function(){
        proxy.getNoticeBoardMessage(viewModel.messageBoardViewModel.selectedMessage.ID, viewModel.getAuthToken(),
            function(result){
                viewModel.messageViewModel.CreatorName(result.Messages[0].CreatorName);
                viewModel.messageViewModel.MessageText(result.Messages[0].MessageText);
                viewModel.messageViewModel.creatorRefID(result.Messages[0].CreatorRefID);
                viewModel.messageViewModel.creatorTypeID(result.Messages[0].CreatorTypeID);
                viewModel.messageViewModel.creatorUID(result.Messages[0].CreatorUID);
                viewModel.messageViewModel.comments(result.Messages[0].Comments);
                viewModel.messageViewModel.CommentsCount(result.Messages[0].CommentsCount);
                viewModel.messageViewModel.avatarUrl(viewModel.getSmallAvatarUrl(result.Messages[0].CreatorRefID, result.Messages[0].CreatorTypeID,result.Messages[0].CreatorUID));
            }
        );
    },

    getIntensity: function(value)
    {
        switch (value)
        {
            case 0:
                return 'Non disponibile';
            case 1:
                return 'Bassa';
            case 2:
                return 'Media';
            case 3:
                return 'Alta';
        }
    },

    /*START ViewModel Introduce*/
    introduceViewModel: {

        goToContacts: function(){
            window.location.href = "#contacts";
        },

        goToAccount: function(){
            window.location.href = "#login";
        },

        introduceAll: function(){

            //Carico i contatti dalla rubrica, visualizzando solo quelli che hanno un numero mobile
            viewModel.contactsViewModel.presented.removeAll();
            var options = new ContactFindOptions();
            options.filter = "";
            options.multiple = true;
            var fields = ["displayName", "name", "phoneNumbers"];
            $("#ajaxLoaderContainer").show();
            navigator.contacts.find(fields,
                function(phoneContacts){
                    console.log("Contacts found: " + phoneContacts.length);
                    for (i=0;i<phoneContacts.length;i++)
                    {
                        if (phoneContacts[i].displayName && phoneContacts[i].displayName != '' &&
                            phoneContacts[i].phoneNumbers && phoneContacts[i].phoneNumbers.length > 0)
                        {
                            var mobileNumber = "";
                            for (n=0;n<phoneContacts[i].phoneNumbers.length;n++)
                            {
                                if (phoneContacts[i].phoneNumbers[n].type === 'mobile')
                                {
                                    mobileNumber = phoneContacts[i].phoneNumbers[n].value;
                                    break;
                                }
                            }
                            if (mobileNumber !== "")
                            {
                                //Se il contatto ha un numero mobile, lo aggiungo
                                var contact = {displayName: phoneContacts[i].displayName, LastName: phoneContacts[i].name.familyName, FirstName: phoneContacts[i].name.givenName, MobileNumber: mobileNumber};
                                viewModel.contactsViewModel.presented.push(contact);
                            }
                        }
                    }
                    $("#ajaxLoaderContainer").hide();

                    if (viewModel.contactsViewModel.presented().length > 0)
                    {
                        //Domanda se continuare...
                        navigator.notification.confirm(
                            'Sono stati trovati ' + viewModel.contactsViewModel.presented().length + ' contatti. Vuoi presentarli a Happy Fit?', // message
                            function(buttonIndex)
                            {
                                if (buttonIndex == 1)
                                {
                                    var payload = ko.toJS(viewModel.contactsViewModel.presented());
                                    console.log(JSON.stringify(payload));
                                    /**/
                                    proxy.addReferrals(JSON.stringify(payload), viewModel.getAuthToken(),
                                        function(result){
                                            if (result.Successful)
                                            {
                                                popupMessage("Sono stati accettati " + result.Item + " contatti su " + viewModel.contactsViewModel.presented().length + ".");
                                                window.location.href = "#start";
                                            }
                                            else
                                            {
                                                popupMessage('Non è stato possibile caricare i contatti.');
                                            }
                                        },
                                        function(a,b,c){
                                            popupMessage('Si è verificato un errore.');
                                        }
                                    );
                                }
                            },                      // callback to invoke with index of button pressed
                            'Happy Fit',            // title
                            'Ok,Annulla'            // buttonLabels
                        );
                    }
                    else
                    {
                        popupMessage('Non è stato trovato nessun contatto valido.');
                    }

                },
                function(contactError){
                    $("#ajaxLoaderContainer").hide();
                    alert('Errore nel caricamento contatti!');
                },
                options
            );


        }
    },
    /*END ViewModel Introduce*/

    /*START ViewModel Contacts*/
    contactsViewModel: {
        contacts: ko.observableArray([]),

        presented: ko.observableArray([]),

        selectedContact: null,

        searchText: ko.observable(""),

        selectContact: function(){
            console.log("selectContact");
            viewModel.contactsViewModel.presented.push(this);
            viewModel.contactsViewModel.contacts.remove(this);
            $("#btnIntroduce").val("Presenta (" + viewModel.contactsViewModel.presented().length + ")");
            setTimeout(function () {
                wrpContacts.refresh();
            }, 0);
        },

        removeContact: function(){
            viewModel.contactsViewModel.presented.remove(this);
        },

        introduce: function(){
            if (viewModel.contactsViewModel.presented().length>0)
            {
                window.location.href = "#presentedContacts";
            }
            else
            {
                popupMessage('Selezionare almeno un contatto.');
            }
        },

        presentContacts: function(){
            //Avvisare utente e richiamare web service
            var payload = ko.toJS(viewModel.contactsViewModel.presented());
            proxy.addReferrals(JSON.stringify(payload), viewModel.getAuthToken(),
                function(result){
                    if (result.Successful)
                    {
                        popupMessage("Sono stati accettati " + result.Item + " contatti su " + viewModel.contactsViewModel.presented().length + ".");
                        window.location.href = "#start";
                    }
                    else
                    {
                        popupMessage('Non è stato possibile caricare i contatti.');
                    }
                },
                function(a,b,c){
                    popupMessage('Si è verificato un errore.');
                }
            );
        }
    },

    afterContactsIsDisplayed: function(){
        viewModel.contactsViewModel.contacts.removeAll();
        viewModel.contactsViewModel.presented.removeAll();
        viewModel.contactsViewModel.searchText("");
        $("#btnIntroduce").val("Presenta (0)");
    },

    afterPresentedIsDisplayed: function(){

    },
    /*END ViewModel Contacts*/

    showAd: function(event)
    {
        if (isApp)
        {
            var ref = window.open(event.data.resourceUrl, '_blank', 'location=yes');
        }
        else
        {
            window.location.href = event.data.resourceUrl;
        }
        return false;
    },
    
    navContact: function()
    {
        if (!viewModel.browserOpened)
        {
            viewModel.browserOpened = true;
            console.log(this.contactUrl);

            if (this.contactTypeId == 3 || this.contactTypeId == 4 || this.contactTypeId == 5) //http
            {
                var navUrl = ""
                if (this.contactUrl.substring(0,4)==='http')
                {navUrl = this.contactUrl;}
                else
                {navUrl = 'http://' + this.contactUrl;}
                var ref = window.open(navUrl, '_blank', 'location=yes');
                ref.addEventListener('exit', function() { viewModel.browserOpened = false; });
            }
            else //mailto, tel
            {
                window.location.href=this.contactUrl;
            }
        }
    },

    browserOpened: false,

    gallery: null
};

viewModel.slotsFilterViewModel.selectedCategory.subscribe(function (newValue) {
    if (newValue)
    {
        proxy.getServices(newValue.CategoryID, viewModel.getAuthToken(),
            function(result){
                if (result.Successful)
                {
                    viewModel.slotsFilterViewModel.services(result.Items);
                }
            }
        );
    }
}, viewModel);

viewModel.contactsViewModel.searchText.subscribe(function(newValue) {
    if (newValue.length >= 3)
    {
        $("#ajaxLoaderContainer").show();
        //Carico i contatti dalla rubrica, visualizzando solo quelli che hanno un numero mobile
        viewModel.contactsViewModel.contacts.removeAll();
        var options = new ContactFindOptions();
        options.filter = newValue;
        options.multiple = true;
        var fields = ["displayName", "name", "phoneNumbers"];
        navigator.contacts.find(fields,
            function(phoneContacts){
                for (i=0;i<phoneContacts.length;i++)
                {
                    if (phoneContacts[i].displayName && phoneContacts[i].displayName != '' &&
                        phoneContacts[i].phoneNumbers && phoneContacts[i].phoneNumbers.length > 0)
                    {
                        var mobileNumber = "";
                        for (n=0;n<phoneContacts[i].phoneNumbers.length;n++)
                        {
                            if (phoneContacts[i].phoneNumbers[n].type === 'mobile')
                            {
                                mobileNumber = phoneContacts[i].phoneNumbers[n].value;
                                break;
                            }
                        }
                        if (mobileNumber !== "")
                        {
                            //Se il contatto ha un numero mobile, lo aggiungo
                            var contact = {displayName: phoneContacts[i].displayName, LastName: phoneContacts[i].name.familyName, FirstName: phoneContacts[i].name.givenName, MobileNumber: mobileNumber};
                            viewModel.contactsViewModel.contacts.push(contact);
                        }
                    }
                }
                $("#ajaxLoaderContainer").hide();

                setTimeout(function () {
                    wrpContacts.refresh();
                }, 0);
            },
            function(contactError){
                $("#ajaxLoaderContainer").hide();
                alert('Errore nel caricamento contatti!');
            },
            options);
    }
}, viewModel);
/****************************************************************
End ViewModel: viewModel
****************************************************************/

var proxy = new ServiceProxy(viewModel.baseUrl);

if (isApp){
    //Sync with Phonegap
    document.addEventListener("deviceready", onDeviceReady, false);
}
else{
    //Sync with jQuery
    $(document).ready(onDeviceReady);
}

//For iScroll
//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);

var wrpCal;
var wrpInfo;
var wrpVideos;
var wrpPhotos;
var wrpPhoto;
var wrpMyReservations;
var wrpCalendars;
var wrpClubs;
var wrpNews;
var wrpSlots;
var wrpLesson;
var wrpSlot;
var wrpReservation;
var wrpNew;
var wrpContacts;

function loaded()
{
    //Liste scrollabili
    wrpSlots = new iScroll('wrpSlots', {useTransition: true});
    wrpNews = new iScroll('wrpNews', {useTransition: true});
    wrpNew = new iScroll('wrpNew', {useTransition: true});
    wrpClubs = new iScroll('wrpClubs', {useTransition: true});
    wrpCalendars = new iScroll('wrpCalendars', {useTransition: true});
    wrpMyReservations = new iScroll('wrpMyReservations', {useTransition: true});
    wrpPhotos = new iScroll('wrpPhotos', {useTransition: true});
    wrpPhoto = new iScroll('wrpPhoto', {useTransition: true, zoom: true});
    wrpVideos = new iScroll('wrpVideos', {useTransition: true});
    wrpLesson = new iScroll('wrpLesson', {useTransition: true});
    wrpSlot = new iScroll('wrpSlot', {useTransition: true});
    wrpReservation = new iScroll('wrpReservation', {useTransition: true});
    wrpCal = new iScroll('wrpCal',{useTransition: true, snap: true, momentum: false, hScrollbar: false});
    wrpInfo = new iScroll('wrpInfo',{useTransition: true, snap: true, momentum: false, hScrollbar: false});
    wrpContacts = new iScroll('wrpContacts', {useTransition: true});
}

/////////////////////////////////////////////////////////////
// Cordova or Document is ready
/////////////////////////////////////////////////////////////
var jPM;
function initMenu(){
    if (jPM) jPM.off();
    jPM = $.jPanelMenu({animated: false, menu: 'header.appHeader nav', openPosition:"400px"});
    jPM.on();
    $(document).on('click', jPM.menu + ' li a', function(e){
        if ( jPM.isOpen() && $(e.currentTarget).attr('href').substring(0,1) == '#' ) { jPM.close(); }
    });
}

function onDeviceReady() {
    networkAvailable();

    console.log('Device is ready.');

    $.support.cors = true;

     // extend your view-model with pager.js specific data
    pager.extendWithPage(viewModel);

    // apply the view-model using KnockoutJS as normal
    ko.applyBindings(viewModel);

    // start pager.js
    pager.start();

    //Gestione menu
    initMenu();

    //****** PERSONALIZZAZIONE APP FISSA
    var data = {"Comment":"","Successful":true,"MobileVouchers":[
    {"BackColor":"#000000","CenterID":1507,"CenterName":"Happy Fit Treviso",
    "CenterUID":"a0799c92-0ec7-4cf1-bd20-0f87589d3fe7","DarkColor":"#101010",
    "EnableFacebookLogin":false,"EnableGymmitLogin":false,"EnableThirdPartyLogin":false,
    "FontColor":"#ffffff","ForeColor":"#ffffff","IsAdvertisementEnabled":false,"LightColor":"#303030","ModuleCode":"MYGYMMIT","TitleColor":"#ffffff"},
    {"BackColor":"#000000","CenterID":1508,"CenterName":"Happy Fit Padova Est","CenterUID":"14b2a8bb-2438-449f-821d-95453cc67229","DarkColor":"#101010","EnableFacebookLogin":false,"EnableGymmitLogin":false,"EnableThirdPartyLogin":false,"FontColor":"#ffffff","ForeColor":"#ffffff","IsAdvertisementEnabled":false,"LightColor":"#303030","ModuleCode":"MYGYMMIT","TitleColor":"#ffffff"},{"BackColor":"#000000","CenterID":1509,"CenterName":"Happy Fit Padova Ovest","CenterUID":"f5b52c0b-c25b-4b5a-b89a-34f8dad637a3","DarkColor":"#101010","EnableFacebookLogin":false,"EnableGymmitLogin":false,"EnableThirdPartyLogin":false,"FontColor":"#ffffff","ForeColor":"#ffffff","IsAdvertisementEnabled":false,"LightColor":"#303030","ModuleCode":"MYGYMMIT","TitleColor":"#ffffff"},{"BackColor":"#000000","CenterID":1540,"CenterName":"Happy Fit Mestre","CenterUID":"cd7709b2-bf70-4855-9221-d5dfeb8f048c","DarkColor":"#101010","EnableFacebookLogin":false,"EnableGymmitLogin":false,"EnableThirdPartyLogin":false,"FontColor":"#ffffff","ForeColor":"#ffffff","IsAdvertisementEnabled":false,"LightColor":"#303030","ModuleCode":"MYGYMMIT","TitleColor":"#ffffff"},{"BackColor":"#000000","CenterID":1541,"CenterName":"Happy Fit Bassano","CenterUID":"0ac57b8b-21a5-4756-a6e3-115db5b26dbc","DarkColor":"#101010","EnableFacebookLogin":false,"EnableGymmitLogin":false,"EnableThirdPartyLogin":false,"FontColor":"#ffffff","ForeColor":"#ffffff","IsAdvertisementEnabled":false,"LightColor":"#303030","ModuleCode":"MYGYMMIT","TitleColor":"#ffffff"},{"BackColor":"#000000","CenterID":1542,"CenterName":"Happy Fit Udine","CenterUID":"f2ab8d22-18b0-43c5-b5b7-0abe912c4544","DarkColor":"#101010","EnableFacebookLogin":false,"EnableGymmitLogin":false,"EnableThirdPartyLogin":false,"FontColor":"#ffffff","ForeColor":"#ffffff","IsAdvertisementEnabled":false,"LightColor":"#303030","ModuleCode":"MYGYMMIT","TitleColor":"#ffffff"},{"BackColor":"#000000","CenterID":1543,"CenterName":"Happy Fit Bergamo","CenterUID":"2c0a4db4-5b09-4916-a082-1a22898b73a8","DarkColor":"#101010","EnableFacebookLogin":false,"EnableGymmitLogin":false,"EnableThirdPartyLogin":false,"FontColor":"#ffffff","ForeColor":"#ffffff","IsAdvertisementEnabled":false,"LightColor":"#303030","ModuleCode":"MYGYMMIT","TitleColor":"#ffffff"},{"BackColor":"#000000","CenterID":1544,"CenterName":"Happy Fit Bologna","CenterUID":"33cd5406-36c3-4a53-81a8-fa27284311a8","DarkColor":"#101010","EnableFacebookLogin":false,"EnableGymmitLogin":false,"EnableThirdPartyLogin":false,"FontColor":"#ffffff","ForeColor":"#ffffff","IsAdvertisementEnabled":false,"LightColor":"#303030","ModuleCode":"MYGYMMIT","TitleColor":"#ffffff"},{"BackColor":"#000000","CenterID":1545,"CenterName":"Happy Fit Cremona","CenterUID":"502f8824-2bc5-4d85-8072-26db59af7b0c","DarkColor":"#101010","EnableFacebookLogin":false,"EnableGymmitLogin":false,"EnableThirdPartyLogin":false,"FontColor":"#ffffff","ForeColor":"#ffffff","IsAdvertisementEnabled":false,"LightColor":"#303030","ModuleCode":"MYGYMMIT","TitleColor":"#ffffff"},{"BackColor":"#000000","CenterID":1546,"CenterName":"Happy Fit Pavia","CenterUID":"a1257d10-bbfa-49d2-8f9e-9c97b6a96969","DarkColor":"#101010","EnableFacebookLogin":false,"EnableGymmitLogin":false,"EnableThirdPartyLogin":false,"FontColor":"#ffffff","ForeColor":"#ffffff","IsAdvertisementEnabled":false,"LightColor":"#303030","ModuleCode":"MYGYMMIT","TitleColor":"#ffffff"},{"BackColor":"#000000","CenterID":1547,"CenterName":"Happy Fit Marghera","CenterUID":"3a5d222e-f953-410b-8113-0264ef3433c7","DarkColor":"#101010","EnableFacebookLogin":false,"EnableGymmitLogin":false,"EnableThirdPartyLogin":false,"FontColor":"#ffffff","ForeColor":"#ffffff","IsAdvertisementEnabled":false,"LightColor":"#303030","ModuleCode":"MYGYMMIT","TitleColor":"#ffffff"},{"BackColor":"#000000","CenterID":1548,"CenterName":"Happy Fit Vicenza","CenterUID":"d414192c-c893-4246-814b-0f995cb6a584","DarkColor":"#101010","EnableFacebookLogin":false,"EnableGymmitLogin":false,"EnableThirdPartyLogin":false,"FontColor":"#ffffff","ForeColor":"#ffffff","IsAdvertisementEnabled":false,"LightColor":"#303030","ModuleCode":"MYGYMMIT","TitleColor":"#ffffff"}]};
    viewModel.addRegisteredCenter(data.MobileVouchers);
    //imposta come centro attivo il primo che trova
    if (!viewModel.getCenterData())
        viewModel.setCenterData(data.MobileVouchers[0]);
    //****** PERSONALIZZAZIONE APP FISSA

    //Se i dati dei voucher del centro sono disponibili in cache, imposto la pagina di start
    if (viewModel.getCenterData()){
        viewModel.setCurrentCenter();
        //Mostro la home
        $("#pnlVoucher").hide();
        $("#pnlHome").show();
        $(".menu-trigger").show();

        if (viewModel.getAuthData()){
            viewModel.setCurrentUser();
            $("#loggedUserName").text(viewModel.getAuthData().DisplayName);
            viewModel.isAuthenticated(true);
        }
    }
    else{
        //mostro la richiesta voucher
        $(".companyName").text(appName);
        $(".menu-trigger").hide();
        $("#pnlHome").hide();
        $("#pnlVoucher").show();
    }

    if (isApp){
        navigator.splashscreen.hide();
        //Gestione backbutton nella home
        document.addEventListener("backbutton", function(e){
            if(pager.page.route[0] && pager.page.route[0] != 'start'){
                navigator.app.backHistory()
            }
            else {
                e.preventDefault();
                navigator.app.exitApp();
            }
        }, false);
    }

    setWidth();

    $(window).on('resize', function(){
        setWidth();
    });

    $("body").show();
}

function setWidth()
{
    var w = $(window).width();
    //Resizzo le pagine del carousel
    $(".footer").css("width", w);
    $(".advUrl").css("width", w);
    $(".wrapperCal").css("width", w);
    $(".scrollerCal").css("width", w*7);
    $(".scrollerCal ul").css("width", w);
    $(".dayPage").css("width", w);
    $(".wrapperInfo").css("width", w);
    $(".scrollerInfo").css("width", w*5);
    $(".scrollerInfo ul").css("width", w);
    $(".scrollerInfo li a").css("width", w);
    $(".infoPage").css("width", w);
    $(".wrapperContacts").css("width", w);
}


function googleMapsReady() {
    //Do nothing
}

$.ajaxSetup({
    beforeSend:function(xhr){
        if (this.url.indexOf("advertisement") == -1)
            $("#ajaxLoaderContainer").show();
    },
    complete:function(xhr, status){
        $("#ajaxLoaderContainer").hide();
    }
});

function parseJsonDate(jsonDate) {
    var parts = /\/Date\((-?\d+)([+-]\d{2})?(\d{2})?.*/.exec(jsonDate);
	//Daylight Handling
	return new Date(+parts[1]+timezoneOffset);
};

function networkAvailable(){
    if (isApp){
        var networkState = navigator.connection.type;
        var states = {};
                states[navigator.connection.UNKNOWN]  = 'Unknown connection';
                states[navigator.connection.ETHERNET] = 'Ethernet connection';
                states[navigator.connection.WIFI]     = 'WiFi connection';
                states[navigator.connection.CELL_2G]  = 'Cell 2G connection';
                states[navigator.connection.CELL_3G]  = 'Cell 3G connection';
                states[navigator.connection.CELL_4G]  = 'Cell 4G connection';
                states[navigator.connection.NONE]     = 'No network connection';
                console.log('Connection type: ' + states[networkState]);
                return networkState != navigator.connection.NONE;
    }
    else{
        console.log('Connection type: BROWSER HOSTED');
        return true;
    }
}

/////////////////////////////
// Utilities
/////////////////////////////
function ScaleImage(srcwidth, srcheight, targetwidth, targetheight, fLetterBox) {

    var result = { width: 0, height: 0, fScaleToTargetWidth: true };

    if ((srcwidth <= 0) || (srcheight <= 0) || (targetwidth <= 0) || (targetheight <= 0)) {
        return result;
    }

    // scale to the target width
    var scaleX1 = targetwidth;
    var scaleY1 = (srcheight * targetwidth) / srcwidth;

    // scale to the target height
    var scaleX2 = (srcwidth * targetheight) / srcheight;
    var scaleY2 = targetheight;

    // now figure out which one we should use
    var fScaleOnWidth = (scaleX2 > targetwidth);
    if (fScaleOnWidth) {
        fScaleOnWidth = fLetterBox;
    }
    else {
       fScaleOnWidth = !fLetterBox;
    }

    if (fScaleOnWidth) {
        result.width = Math.floor(scaleX1);
        result.height = Math.floor(scaleY1);
        result.fScaleToTargetWidth = true;
    }
    else {
        result.width = Math.floor(scaleX2);
        result.height = Math.floor(scaleY2);
        result.fScaleToTargetWidth = false;
    }
    result.targetleft = Math.floor((targetwidth - result.width) / 2);
    result.targettop = Math.floor((targetheight - result.height) / 2);

    return result;
}

function OnImageLoad(evt) {
    var img = evt.currentTarget;
    fillImage(img);
}

function fillImage(img)
{
    // what's the size of this image and it's parent
    var w = $(img).width();
    var h = $(img).height();
    var tw = $(img).parent().parent().width();
    var th = $(img).parent().parent().height();

    // compute the new size and offsets
    var result = ScaleImage(w, h, tw, th, false);

    // adjust the image coordinates and size
    img.width = result.width;
    img.height = result.height;
    $(img).css("left", result.targetleft);
    $(img).css("top", result.targettop);
}

function popupMessage(message)
{
    if (isApp){
        navigator.notification.alert(message, null, appName, 'Ok');
    }
    else{
        alert(message);
    }
}

/**
  *
  * jPanelMenu 1.3.0 (http://jpanelmenu.com)
  * By Anthony Colangelo (http://acolangelo.com)
  *
* */
(function(e){e.jPanelMenu=function(t){if(typeof t=="undefined"||t==null)t={};var n={options:e.extend({menu:"#menu",trigger:".menu-trigger",excludedPanelContent:"style, script",direction:"left",openPosition:"250px",animated:!0,closeOnContentClick:!0,keyboardShortcuts:[{code:27,open:!1,close:!0},{code:37,open:!1,close:!0},{code:39,open:!0,close:!0},{code:77,open:!0,close:!0}],duration:150,openDuration:t.duration||150,closeDuration:t.duration||150,easing:"ease-in-out",openEasing:t.easing||"ease-in-out",closeEasing:t.easing||"ease-in-out",before:function(){},beforeOpen:function(){},beforeClose:function(){},after:function(){},afterOpen:function(){},afterClose:function(){},beforeOn:function(){},afterOn:function(){},beforeOff:function(){},afterOff:function(){}},t),settings:{transitionsSupported:"WebkitTransition"in document.body.style||"MozTransition"in document.body.style||"msTransition"in document.body.style||"OTransition"in document.body.style||"Transition"in document.body.style,shiftFixedChildren:!1,panelPosition:"relative",positionUnits:"px"},menu:"#jPanelMenu-menu",panel:".jPanelMenu-panel",fixedChildren:[],timeouts:{},clearTimeouts:function(){clearTimeout(n.timeouts.open);clearTimeout(n.timeouts.afterOpen);clearTimeout(n.timeouts.afterClose)},setPositionUnits:function(){var e=!1,t=["%","px","em"];for(unitID in t){var r=t[unitID];if(n.options.openPosition.toString().substr(-r.length)==r){e=!0;n.settings.positionUnits=r}}e||(n.options.openPosition=parseInt(n.options.openPosition)+n.settings.positionUnits)},checkFixedChildren:function(){n.disableTransitions();var t={position:e(n.panel).css("position")};t[n.options.direction]=e(n.panel).css(n.options.direction)=="auto"?0:e(n.panel).css(n.options.direction);e(n.panel).find("> *").each(function(){e(this).css("position")=="fixed"&&e(this).css(n.options.direction)=="auto"&&n.fixedChildren.push(this)});if(n.fixedChildren.length>0){var r={position:"relative"};r[n.options.direction]="1px";n.setPanelStyle(r);parseInt(e(n.fixedChildren[0]).offset().left)==0&&(n.settings.shiftFixedChildren=!0)}n.setPanelStyle(t)},setjPanelMenuStyles:function(){var t="#fff",r=e("html").css("background-color"),i=e("body").css("background-color");i!="transparent"&&i!="rgba(0, 0, 0, 0)"?t=i:r!="transparent"&&r!="rgba(0, 0, 0, 0)"?t=r:t="#fff";e("#jPanelMenu-style-master").length==0&&e("body").append('<style id="jPanelMenu-style-master">body{width:100%}.jPanelMenu,body{overflow-x:hidden}#jPanelMenu-menu{display:block;position:fixed;top:0;'+n.options.direction+":0;height:100%;z-index:-1;overflow-x:hidden;overflow-y:scroll;-webkit-overflow-scrolling:touch}.jPanelMenu-panel{position:static;"+n.options.direction+":0;top:0;z-index:2;width:100%;min-height:100%;background:"+t+"}</style>")},setMenuState:function(t){var n=t?"open":"closed";e("body").attr("data-menu-position",n)},getMenuState:function(){return e("body").attr("data-menu-position")},menuIsOpen:function(){return n.getMenuState()=="open"?!0:!1},setMenuStyle:function(t){e(n.menu).css(t)},setPanelStyle:function(t){e(n.panel).css(t)},showMenu:function(){n.setMenuStyle({display:"block"});n.setMenuStyle({"z-index":"1"})},hideMenu:function(){n.setMenuStyle({"z-index":"-1"});n.setMenuStyle({display:"none"})},enableTransitions:function(t,r){var i=t/1e3,s=n.getCSSEasingFunction(r);n.disableTransitions();e("body").append('<style id="jPanelMenu-style-transitions">.jPanelMenu-panel{-webkit-transition: all '+i+"s "+s+"; -moz-transition: all "+i+"s "+s+"; -o-transition: all "+i+"s "+s+"; transition: all "+i+"s "+s+";}</style>")},disableTransitions:function(){e("#jPanelMenu-style-transitions").remove()},enableFixedTransitions:function(t,r,i,s){var o=i/1e3,u=n.getCSSEasingFunction(s);n.disableFixedTransitions(r);e("body").append('<style id="jPanelMenu-style-fixed-'+r+'">'+t+"{-webkit-transition: all "+o+"s "+u+"; -moz-transition: all "+o+"s "+u+"; -o-transition: all "+o+"s "+u+"; transition: all "+o+"s "+u+";}</style>")},disableFixedTransitions:function(t){e("#jPanelMenu-style-fixed-"+t).remove()},getCSSEasingFunction:function(e){switch(e){case"linear":return e;case"ease":return e;case"ease-in":return e;case"ease-out":return e;case"ease-in-out":return e;default:return"ease-in-out"}},getJSEasingFunction:function(e){switch(e){case"linear":return e;default:return"swing"}},openMenu:function(t){if(typeof t=="undefined"||t==null)t=n.options.animated;n.clearTimeouts();n.options.before();n.options.beforeOpen();n.setMenuState(!0);n.setPanelStyle({position:"relative"});n.showMenu();var r={none:t?!1:!0,transitions:t&&n.settings.transitionsSupported?!0:!1};if(r.transitions||r.none){r.none&&n.disableTransitions();r.transitions&&n.enableTransitions(n.options.openDuration,n.options.openEasing);var i={};i[n.options.direction]=n.options.openPosition;n.setPanelStyle(i);n.settings.shiftFixedChildren&&e(n.fixedChildren).each(function(){var t=e(this).prop("tagName").toLowerCase()+" "+e(this).attr("class"),i=t.replace(" ","."),t=t.replace(" ","-");r.none&&n.disableFixedTransitions(t);r.transitions&&n.enableFixedTransitions(i,t,n.options.openDuration,n.options.openEasing);var s={};s[n.options.direction]=n.options.openPosition;e(this).css(s)});n.timeouts.afterOpen=setTimeout(function(){n.disableTransitions();n.settings.shiftFixedChildren&&e(n.fixedChildren).each(function(){var t=e(this).prop("tagName").toLowerCase()+" "+e(this).attr("class"),t=t.replace(" ","-");n.disableFixedTransitions(t)});n.options.after();n.options.afterOpen();n.initiateContentClickListeners()},n.options.openDuration)}else{var s=n.getJSEasingFunction(n.options.openEasing),o={};o[n.options.direction]=n.options.openPosition;e(n.panel).stop().animate(o,n.options.openDuration,s,function(){n.options.after();n.options.afterOpen();n.initiateContentClickListeners()});n.settings.shiftFixedChildren&&e(n.fixedChildren).each(function(){var t={};t[n.options.direction]=n.options.openPosition;e(this).stop().animate(t,n.options.openDuration,s)})}},closeMenu:function(t){if(typeof t=="undefined"||t==null)t=n.options.animated;n.clearTimeouts();n.options.before();n.options.beforeClose();n.setMenuState(!1);var r={none:t?!1:!0,transitions:t&&n.settings.transitionsSupported?!0:!1};if(r.transitions||r.none){r.none&&n.disableTransitions();r.transitions&&n.enableTransitions(n.options.closeDuration,n.options.closeEasing);var i={};i[n.options.direction]=0+n.settings.positionUnits;n.setPanelStyle(i);n.settings.shiftFixedChildren&&e(n.fixedChildren).each(function(){var t=e(this).prop("tagName").toLowerCase()+" "+e(this).attr("class"),i=t.replace(" ","."),t=t.replace(" ","-");r.none&&n.disableFixedTransitions(t);r.transitions&&n.enableFixedTransitions(i,t,n.options.closeDuration,n.options.closeEasing);var s={};s[n.options.direction]=0+n.settings.positionUnits;e(this).css(s)});n.timeouts.afterClose=setTimeout(function(){n.setPanelStyle({position:n.settings.panelPosition});n.disableTransitions();n.settings.shiftFixedChildren&&e(n.fixedChildren).each(function(){var t=e(this).prop("tagName").toLowerCase()+" "+e(this).attr("class"),t=t.replace(" ","-");n.disableFixedTransitions(t)});n.hideMenu();n.options.after();n.options.afterClose();n.destroyContentClickListeners()},n.options.closeDuration)}else{var s=n.getJSEasingFunction(n.options.closeEasing),o={};o[n.options.direction]=0+n.settings.positionUnits;e(n.panel).stop().animate(o,n.options.closeDuration,s,function(){n.setPanelStyle({position:n.settings.panelPosition});n.hideMenu();n.options.after();n.options.afterClose();n.destroyContentClickListeners()});n.settings.shiftFixedChildren&&e(n.fixedChildren).each(function(){var t={};t[n.options.direction]=0+n.settings.positionUnits;e(this).stop().animate(t,n.options.closeDuration,s)})}},triggerMenu:function(e){n.menuIsOpen()?n.closeMenu(e):n.openMenu(e)},initiateClickListeners:function(){e(document).on("click",n.options.trigger,function(){n.triggerMenu(n.options.animated);return!1})},destroyClickListeners:function(){e(document).off("click",n.options.trigger,null)},initiateContentClickListeners:function(){if(!n.options.closeOnContentClick)return!1;e(document).on("click",n.panel,function(e){n.menuIsOpen()&&n.closeMenu(n.options.animated)});e(document).on("touchend",n.panel,function(e){n.menuIsOpen()&&n.closeMenu(n.options.animated)})},destroyContentClickListeners:function(){if(!n.options.closeOnContentClick)return!1;e(document).off("click",n.panel,null);e(document).off("touchend",n.panel,null)},initiateKeyboardListeners:function(){var t=["input","textarea"];e(document).on("keydown",function(r){var i=e(r.target),s=!1;e.each(t,function(){i.is(this.toString())&&(s=!0)});if(s)return!0;for(mapping in n.options.keyboardShortcuts)if(r.which==n.options.keyboardShortcuts[mapping].code){var o=n.options.keyboardShortcuts[mapping];o.open&&o.close?n.triggerMenu(n.options.animated):o.open&&!o.close&&!n.menuIsOpen()?n.openMenu(n.options.animated):!o.open&&o.close&&n.menuIsOpen()&&n.closeMenu(n.options.animated);return!1}})},destroyKeyboardListeners:function(){e(document).off("keydown",null)},setupMarkup:function(){e("html").addClass("jPanelMenu");e("body > *").not(n.menu+", "+n.options.excludedPanelContent).wrapAll('<div class="'+n.panel.replace(".","")+'"/>');e(n.options.menu).clone().attr("id",n.menu.replace("#","")).insertAfter("body > "+n.panel)},resetMarkup:function(){e("html").removeClass("jPanelMenu");e("body > "+n.panel+" > *").unwrap();e(n.menu).remove()},init:function(){n.options.beforeOn();n.initiateClickListeners();Object.prototype.toString.call(n.options.keyboardShortcuts)==="[object Array]"&&n.initiateKeyboardListeners();n.setjPanelMenuStyles();n.setMenuState(!1);n.setupMarkup();n.setMenuStyle({width:n.options.openPosition});n.checkFixedChildren();n.setPositionUnits();n.closeMenu(!1);n.options.afterOn()},destroy:function(){n.options.beforeOff();n.closeMenu();n.destroyClickListeners();Object.prototype.toString.call(n.options.keyboardShortcuts)==="[object Array]"&&n.destroyKeyboardListeners();n.resetMarkup();var t={};t[n.options.direction]="auto";e(n.fixedChildren).each(function(){e(this).css(t)});n.fixedChildren=[];n.options.afterOff()}};return{on:n.init,off:n.destroy,trigger:n.triggerMenu,open:n.openMenu,close:n.closeMenu,isOpen:n.menuIsOpen,menu:n.menu,getMenu:function(){return e(n.menu)},panel:n.panel,getPanel:function(){return e(n.panel)}}}})(jQuery);

(function(a,b){"use strict";var c=a.console||b,d=a.document,e=a.navigator,f=a.sessionStorage||!1,g=a.setTimeout,h=a.clearTimeout,i=a.setInterval,j=a.clearInterval,k=a.JSON,l=a.alert,m=a.History=a.History||{},n=a.history;k.stringify=k.stringify||k.encode,k.parse=k.parse||k.decode;if(typeof m.init!="undefined")throw new Error("History.js Core has already been loaded...");m.init=function(){return typeof m.Adapter=="undefined"?!1:(typeof m.initCore!="undefined"&&m.initCore(),typeof m.initHtml4!="undefined"&&m.initHtml4(),!0)},m.initCore=function(){if(typeof m.initCore.initialized!="undefined")return!1;m.initCore.initialized=!0,m.options=m.options||{},m.options.hashChangeInterval=m.options.hashChangeInterval||100,m.options.safariPollInterval=m.options.safariPollInterval||500,m.options.doubleCheckInterval=m.options.doubleCheckInterval||500,m.options.storeInterval=m.options.storeInterval||1e3,m.options.busyDelay=m.options.busyDelay||250,m.options.debug=m.options.debug||!1,m.options.initialTitle=m.options.initialTitle||d.title,m.intervalList=[],m.clearAllIntervals=function(){var a,b=m.intervalList;if(typeof b!="undefined"&&b!==null){for(a=0;a<b.length;a++)j(b[a]);m.intervalList=null}},m.debug=function(){(m.options.debug||!1)&&m.log.apply(m,arguments)},m.log=function(){var a=typeof c!="undefined"&&typeof c.log!="undefined"&&typeof c.log.apply!="undefined",b=d.getElementById("log"),e,f,g,h,i;a?(h=Array.prototype.slice.call(arguments),e=h.shift(),typeof c.debug!="undefined"?c.debug.apply(c,[e,h]):c.log.apply(c,[e,h])):e="\n"+arguments[0]+"\n";for(f=1,g=arguments.length;f<g;++f){i=arguments[f];if(typeof i=="object"&&typeof k!="undefined")try{i=k.stringify(i)}catch(j){}e+="\n"+i+"\n"}return b?(b.value+=e+"\n-----\n",b.scrollTop=b.scrollHeight-b.clientHeight):a||l(e),!0},m.getInternetExplorerMajorVersion=function(){var a=m.getInternetExplorerMajorVersion.cached=typeof m.getInternetExplorerMajorVersion.cached!="undefined"?m.getInternetExplorerMajorVersion.cached:function(){var a=3,b=d.createElement("div"),c=b.getElementsByTagName("i");while((b.innerHTML="<!--[if gt IE "+ ++a+"]><i></i><![endif]-->")&&c[0]);return a>4?a:!1}();return a},m.isInternetExplorer=function(){var a=m.isInternetExplorer.cached=typeof m.isInternetExplorer.cached!="undefined"?m.isInternetExplorer.cached:Boolean(m.getInternetExplorerMajorVersion());return a},m.emulated={pushState:!Boolean(a.history&&a.history.pushState&&a.history.replaceState&&!/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(e.userAgent)&&!/AppleWebKit\/5([0-2]|3[0-2])/i.test(e.userAgent)),hashChange:Boolean(!("onhashchange"in a||"onhashchange"in d)||m.isInternetExplorer()&&m.getInternetExplorerMajorVersion()<8)},m.enabled=!m.emulated.pushState,m.bugs={setHash:Boolean(!m.emulated.pushState&&e.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(e.userAgent)),safariPoll:Boolean(!m.emulated.pushState&&e.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(e.userAgent)),ieDoubleCheck:Boolean(m.isInternetExplorer()&&m.getInternetExplorerMajorVersion()<8),hashEscape:Boolean(m.isInternetExplorer()&&m.getInternetExplorerMajorVersion()<7)},m.isEmptyObject=function(a){for(var b in a)return!1;return!0},m.cloneObject=function(a){var b,c;return a?(b=k.stringify(a),c=k.parse(b)):c={},c},m.getRootUrl=function(){var a=d.location.protocol+"//"+(d.location.hostname||d.location.host);if(d.location.port||!1)a+=":"+d.location.port;return a+="/",a},m.getBaseHref=function(){var a=d.getElementsByTagName("base"),b=null,c="";return a.length===1&&(b=a[0],c=b.href.replace(/[^\/]+$/,"")),c=c.replace(/\/+$/,""),c&&(c+="/"),c},m.getBaseUrl=function(){var a=m.getBaseHref()||m.getBasePageUrl()||m.getRootUrl();return a},m.getPageUrl=function(){var a=m.getState(!1,!1),b=(a||{}).url||d.location.href,c;return c=b.replace(/\/+$/,"").replace(/[^\/]+$/,function(a,b,c){return/\./.test(a)?a:a+"/"}),c},m.getBasePageUrl=function(){var a=d.location.href.replace(/[#\?].*/,"").replace(/[^\/]+$/,function(a,b,c){return/[^\/]$/.test(a)?"":a}).replace(/\/+$/,"")+"/";return a},m.getFullUrl=function(a,b){var c=a,d=a.substring(0,1);return b=typeof b=="undefined"?!0:b,/[a-z]+\:\/\//.test(a)||(d==="/"?c=m.getRootUrl()+a.replace(/^\/+/,""):d==="#"?c=m.getPageUrl().replace(/#.*/,"")+a:d==="?"?c=m.getPageUrl().replace(/[\?#].*/,"")+a:b?c=m.getBaseUrl()+a.replace(/^(\.\/)+/,""):c=m.getBasePageUrl()+a.replace(/^(\.\/)+/,"")),c.replace(/\#$/,"")},m.getShortUrl=function(a){var b=a,c=m.getBaseUrl(),d=m.getRootUrl();return m.emulated.pushState&&(b=b.replace(c,"")),b=b.replace(d,"/"),m.isTraditionalAnchor(b)&&(b="./"+b),b=b.replace(/^(\.\/)+/g,"./").replace(/\#$/,""),b},m.store={},m.idToState=m.idToState||{},m.stateToId=m.stateToId||{},m.urlToId=m.urlToId||{},m.storedStates=m.storedStates||[],m.savedStates=m.savedStates||[],m.normalizeStore=function(){m.store.idToState=m.store.idToState||{},m.store.urlToId=m.store.urlToId||{},m.store.stateToId=m.store.stateToId||{}},m.getState=function(a,b){typeof a=="undefined"&&(a=!0),typeof b=="undefined"&&(b=!0);var c=m.getLastSavedState();return!c&&b&&(c=m.createStateObject()),a&&(c=m.cloneObject(c),c.url=c.cleanUrl||c.url),c},m.getIdByState=function(a){var b=m.extractId(a.url),c;if(!b){c=m.getStateString(a);if(typeof m.stateToId[c]!="undefined")b=m.stateToId[c];else if(typeof m.store.stateToId[c]!="undefined")b=m.store.stateToId[c];else{for(;;){b=(new Date).getTime()+String(Math.random()).replace(/\D/g,"");if(typeof m.idToState[b]=="undefined"&&typeof m.store.idToState[b]=="undefined")break}m.stateToId[c]=b,m.idToState[b]=a}}return b},m.normalizeState=function(a){var b,c;if(!a||typeof a!="object")a={};if(typeof a.normalized!="undefined")return a;if(!a.data||typeof a.data!="object")a.data={};b={},b.normalized=!0,b.title=a.title||"",b.url=m.getFullUrl(m.unescapeString(a.url||d.location.href)),b.hash=m.getShortUrl(b.url),b.data=m.cloneObject(a.data),b.id=m.getIdByState(b),b.cleanUrl=b.url.replace(/\??\&_suid.*/,""),b.url=b.cleanUrl,c=!m.isEmptyObject(b.data);if(b.title||c)b.hash=m.getShortUrl(b.url).replace(/\??\&_suid.*/,""),/\?/.test(b.hash)||(b.hash+="?"),b.hash+="&_suid="+b.id;return b.hashedUrl=m.getFullUrl(b.hash),(m.emulated.pushState||m.bugs.safariPoll)&&m.hasUrlDuplicate(b)&&(b.url=b.hashedUrl),b},m.createStateObject=function(a,b,c){var d={data:a,title:b,url:c};return d=m.normalizeState(d),d},m.getStateById=function(a){a=String(a);var c=m.idToState[a]||m.store.idToState[a]||b;return c},m.getStateString=function(a){var b,c,d;return b=m.normalizeState(a),c={data:b.data,title:a.title,url:a.url},d=k.stringify(c),d},m.getStateId=function(a){var b,c;return b=m.normalizeState(a),c=b.id,c},m.getHashByState=function(a){var b,c;return b=m.normalizeState(a),c=b.hash,c},m.extractId=function(a){var b,c,d;return c=/(.*)\&_suid=([0-9]+)$/.exec(a),d=c?c[1]||a:a,b=c?String(c[2]||""):"",b||!1},m.isTraditionalAnchor=function(a){var b=!/[\/\?\.]/.test(a);return b},m.extractState=function(a,b){var c=null,d,e;return b=b||!1,d=m.extractId(a),d&&(c=m.getStateById(d)),c||(e=m.getFullUrl(a),d=m.getIdByUrl(e)||!1,d&&(c=m.getStateById(d)),!c&&b&&!m.isTraditionalAnchor(a)&&(c=m.createStateObject(null,null,e))),c},m.getIdByUrl=function(a){var c=m.urlToId[a]||m.store.urlToId[a]||b;return c},m.getLastSavedState=function(){return m.savedStates[m.savedStates.length-1]||b},m.getLastStoredState=function(){return m.storedStates[m.storedStates.length-1]||b},m.hasUrlDuplicate=function(a){var b=!1,c;return c=m.extractState(a.url),b=c&&c.id!==a.id,b},m.storeState=function(a){return m.urlToId[a.url]=a.id,m.storedStates.push(m.cloneObject(a)),a},m.isLastSavedState=function(a){var b=!1,c,d,e;return m.savedStates.length&&(c=a.id,d=m.getLastSavedState(),e=d.id,b=c===e),b},m.saveState=function(a){return m.isLastSavedState(a)?!1:(m.savedStates.push(m.cloneObject(a)),!0)},m.getStateByIndex=function(a){var b=null;return typeof a=="undefined"?b=m.savedStates[m.savedStates.length-1]:a<0?b=m.savedStates[m.savedStates.length+a]:b=m.savedStates[a],b},m.getHash=function(){var a=m.unescapeHash(d.location.hash);return a},m.unescapeString=function(b){var c=b,d;for(;;){d=a.unescape(c);if(d===c)break;c=d}return c},m.unescapeHash=function(a){var b=m.normalizeHash(a);return b=m.unescapeString(b),b},m.normalizeHash=function(a){var b=a.replace(/[^#]*#/,"").replace(/#.*/,"");return b},m.setHash=function(a,b){var c,e,f;return b!==!1&&m.busy()?(m.pushQueue({scope:m,callback:m.setHash,args:arguments,queue:b}),!1):(c=m.escapeHash(a),m.busy(!0),e=m.extractState(a,!0),e&&!m.emulated.pushState?m.pushState(e.data,e.title,e.url,!1):d.location.hash!==c&&(m.bugs.setHash?(f=m.getPageUrl(),m.pushState(null,null,f+"#"+c,!1)):d.location.hash=c),m)},m.escapeHash=function(b){var c=m.normalizeHash(b);return c=a.escape(c),m.bugs.hashEscape||(c=c.replace(/\%21/g,"!").replace(/\%26/g,"&").replace(/\%3D/g,"=").replace(/\%3F/g,"?")),c},m.getHashByUrl=function(a){var b=String(a).replace(/([^#]*)#?([^#]*)#?(.*)/,"$2");return b=m.unescapeHash(b),b},m.setTitle=function(a){var b=a.title,c;b||(c=m.getStateByIndex(0),c&&c.url===a.url&&(b=c.title||m.options.initialTitle));try{d.getElementsByTagName("title")[0].innerHTML=b.replace("<","&lt;").replace(">","&gt;").replace(" & "," &amp; ")}catch(e){}return d.title=b,m},m.queues=[],m.busy=function(a){typeof a!="undefined"?m.busy.flag=a:typeof m.busy.flag=="undefined"&&(m.busy.flag=!1);if(!m.busy.flag){h(m.busy.timeout);var b=function(){var a,c,d;if(m.busy.flag)return;for(a=m.queues.length-1;a>=0;--a){c=m.queues[a];if(c.length===0)continue;d=c.shift(),m.fireQueueItem(d),m.busy.timeout=g(b,m.options.busyDelay)}};m.busy.timeout=g(b,m.options.busyDelay)}return m.busy.flag},m.busy.flag=!1,m.fireQueueItem=function(a){return a.callback.apply(a.scope||m,a.args||[])},m.pushQueue=function(a){return m.queues[a.queue||0]=m.queues[a.queue||0]||[],m.queues[a.queue||0].push(a),m},m.queue=function(a,b){return typeof a=="function"&&(a={callback:a}),typeof b!="undefined"&&(a.queue=b),m.busy()?m.pushQueue(a):m.fireQueueItem(a),m},m.clearQueue=function(){return m.busy.flag=!1,m.queues=[],m},m.stateChanged=!1,m.doubleChecker=!1,m.doubleCheckComplete=function(){return m.stateChanged=!0,m.doubleCheckClear(),m},m.doubleCheckClear=function(){return m.doubleChecker&&(h(m.doubleChecker),m.doubleChecker=!1),m},m.doubleCheck=function(a){return m.stateChanged=!1,m.doubleCheckClear(),m.bugs.ieDoubleCheck&&(m.doubleChecker=g(function(){return m.doubleCheckClear(),m.stateChanged||a(),!0},m.options.doubleCheckInterval)),m},m.safariStatePoll=function(){var b=m.extractState(d.location.href),c;if(!m.isLastSavedState(b))c=b;else return;return c||(c=m.createStateObject()),m.Adapter.trigger(a,"popstate"),m},m.back=function(a){return a!==!1&&m.busy()?(m.pushQueue({scope:m,callback:m.back,args:arguments,queue:a}),!1):(m.busy(!0),m.doubleCheck(function(){m.back(!1)}),n.go(-1),!0)},m.forward=function(a){return a!==!1&&m.busy()?(m.pushQueue({scope:m,callback:m.forward,args:arguments,queue:a}),!1):(m.busy(!0),m.doubleCheck(function(){m.forward(!1)}),n.go(1),!0)},m.go=function(a,b){var c;if(a>0)for(c=1;c<=a;++c)m.forward(b);else{if(!(a<0))throw new Error("History.go: History.go requires a positive or negative integer passed.");for(c=-1;c>=a;--c)m.back(b)}return m};if(m.emulated.pushState){var o=function(){};m.pushState=m.pushState||o,m.replaceState=m.replaceState||o}else m.onPopState=function(b,c){var e=!1,f=!1,g,h;return m.doubleCheckComplete(),g=m.getHash(),g?(h=m.extractState(g||d.location.href,!0),h?m.replaceState(h.data,h.title,h.url,!1):(m.Adapter.trigger(a,"anchorchange"),m.busy(!1)),m.expectedStateId=!1,!1):(e=m.Adapter.extractEventData("state",b,c)||!1,e?f=m.getStateById(e):m.expectedStateId?f=m.getStateById(m.expectedStateId):f=m.extractState(d.location.href),f||(f=m.createStateObject(null,null,d.location.href)),m.expectedStateId=!1,m.isLastSavedState(f)?(m.busy(!1),!1):(m.storeState(f),m.saveState(f),m.setTitle(f),m.Adapter.trigger(a,"statechange"),m.busy(!1),!0))},m.Adapter.bind(a,"popstate",m.onPopState),m.pushState=function(b,c,d,e){if(m.getHashByUrl(d)&&m.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(e!==!1&&m.busy())return m.pushQueue({scope:m,callback:m.pushState,args:arguments,queue:e}),!1;m.busy(!0);var f=m.createStateObject(b,c,d);return m.isLastSavedState(f)?m.busy(!1):(m.storeState(f),m.expectedStateId=f.id,n.pushState(f.id,f.title,f.url),m.Adapter.trigger(a,"popstate")),!0},m.replaceState=function(b,c,d,e){if(m.getHashByUrl(d)&&m.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(e!==!1&&m.busy())return m.pushQueue({scope:m,callback:m.replaceState,args:arguments,queue:e}),!1;m.busy(!0);var f=m.createStateObject(b,c,d);return m.isLastSavedState(f)?m.busy(!1):(m.storeState(f),m.expectedStateId=f.id,n.replaceState(f.id,f.title,f.url),m.Adapter.trigger(a,"popstate")),!0};if(f){try{m.store=k.parse(f.getItem("History.store"))||{}}catch(p){m.store={}}m.normalizeStore()}else m.store={},m.normalizeStore();m.Adapter.bind(a,"beforeunload",m.clearAllIntervals),m.Adapter.bind(a,"unload",m.clearAllIntervals),m.saveState(m.storeState(m.extractState(d.location.href,!0))),f&&(m.onUnload=function(){var a,b;try{a=k.parse(f.getItem("History.store"))||{}}catch(c){a={}}a.idToState=a.idToState||{},a.urlToId=a.urlToId||{},a.stateToId=a.stateToId||{};for(b in m.idToState){if(!m.idToState.hasOwnProperty(b))continue;a.idToState[b]=m.idToState[b]}for(b in m.urlToId){if(!m.urlToId.hasOwnProperty(b))continue;a.urlToId[b]=m.urlToId[b]}for(b in m.stateToId){if(!m.stateToId.hasOwnProperty(b))continue;a.stateToId[b]=m.stateToId[b]}m.store=a,m.normalizeStore(),f.setItem("History.store",k.stringify(a))},m.intervalList.push(i(m.onUnload,m.options.storeInterval)),m.Adapter.bind(a,"beforeunload",m.onUnload),m.Adapter.bind(a,"unload",m.onUnload));if(!m.emulated.pushState){m.bugs.safariPoll&&m.intervalList.push(i(m.safariStatePoll,m.options.safariPollInterval));if(e.vendor==="Apple Computer, Inc."||(e.appCodeName||"")==="Mozilla")m.Adapter.bind(a,"hashchange",function(){m.Adapter.trigger(a,"popstate")}),m.getHash()&&m.Adapter.onDomLoad(function(){m.Adapter.trigger(a,"hashchange")})}},m.init()})(window)

/***************************************************************
	ServiceProxy
	Proxy class generated by RESTflectionist
	Service Url: http://stage.gymmit.com/services/gymmitservice.svc
***************************************************************/

ServiceProxy = function(baseUrl) //constructor for the proxy
{
    this._serviceURL = baseUrl + "/services/gymmitservice.svc";
};

ServiceProxy.prototype =
{
	deleteAvailability: function(request, onSuccess, onError) {
		$.ajax({ type: "post", url: this._serviceURL + "/user/deleteavailability", data: request, dataType: "json", contentType: "application/json;charset=UTF-8", success: onSuccess, error: onError});
	},
	getAvailabilities: function(authtoken, onSuccess, onError) {
		var payload = {at:authtoken};
		$.ajax({ type: "get", url: this._serviceURL + "/user/getavailabilities", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	getNotifications: function(authtoken, onSuccess, onError) {
		var payload = {at:authtoken};
		$.ajax({ type: "get", url: this._serviceURL + "/user/getnotifications", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	claimMobileVoucher: function(code, onSuccess, onError) {
		var payload = {cd:code};
		$.ajax({ type: "get", url: this._serviceURL + "/voucher/claim", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	postNoticeBoardMessage: function(request, onSuccess, onError) {
		$.ajax({ type: "post", url: this._serviceURL + "/noticeboard/post", data: request, dataType: "json", contentType: "application/json;charset=UTF-8", success: onSuccess, error: onError});
	},
	getNoticeBoardMessages: function(refid, typeid, pageindex, authtoken, onSuccess, onError) {
		var payload = {id:refid,ti:typeid,pi:pageindex,at:authtoken};
		$.ajax({ type: "get", url: this._serviceURL + "/noticeboard/getmessages", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	getNoticeBoardMessage: function(id, authtoken, onSuccess, onError) {
		var payload = {id:id,at:authtoken};
		$.ajax({ type: "get", url: this._serviceURL + "/noticeboard/getmessage", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	deleteNoticeBoardMessage: function(id, authtoken, onSuccess, onError) {
		var payload = {id:id,at:authtoken};
		$.ajax({ type: "get", url: this._serviceURL + "/noticeboard/deletemessage", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	facebookEnrollUser: function(request, onSuccess, onError) {
		$.ajax({ type: "post", url: this._serviceURL + "/enroll/facebook", data: request, dataType: "json", contentType: "application/json;charset=UTF-8", success: onSuccess, error: onError});
	},
	gymmitEnrollUser: function(request, onSuccess, onError) {
		$.ajax({ type: "post", url: this._serviceURL + "/enroll/gymmit", data: request, dataType: "json", contentType: "application/json;charset=UTF-8", success: onSuccess, error: onError});
	},
	getRandomAdvertisement: function(onSuccess, onError) {
		$.ajax({ type: "get", url: this._serviceURL + "/advertisement/random", dataType: "json", success: onSuccess, error: onError});
	},
	getBookableCategories: function(centerID, authtoken, onSuccess, onError) {
		var payload = {ci:centerID,at:authtoken};
		$.ajax({ type: "get", url: this._serviceURL + "/center/getbookablecategories", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	getBookableActivities: function(centerID, authtoken, onSuccess, onError) {
		var payload = {ci:centerID,at:authtoken};
		$.ajax({ type: "get", url: this._serviceURL + "/center/getbookableactivities", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	createClassCategory: function(centerID, description, customcode, authToken, onSuccess, onError) {
		var payload = {ci:centerID,ds:description,cc:customcode,at:authToken};
		$.ajax({ type: "get", url: this._serviceURL + "/center/createclasscategory", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	createClassActivity: function(centerID, categoryID, description, customcode, authToken, onSuccess, onError) {
		var payload = {ci:centerID,ca:categoryID,ds:description,cc:customcode,at:authToken};
		$.ajax({ type: "get", url: this._serviceURL + "/center/createclassactivity", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	inviteCenterUser: function(request, onSuccess, onError) {
		$.ajax({ type: "post", url: this._serviceURL + "/center/inviteuser", data: request, dataType: "json", contentType: "application/json;charset=UTF-8", success: onSuccess, error: onError});
	},
	registerDevice: function(request, onSuccess, onError) {
		$.ajax({ type: "post", url: this._serviceURL + "/user/registerdevice", data: request, dataType: "json", contentType: "application/json;charset=UTF-8", success: onSuccess, error: onError});
	},
	getArticle: function(articleID, authtoken, onSuccess, onError) {
		var payload = {ai:articleID,at:authtoken};
		$.ajax({ type: "get", url: this._serviceURL + "/center/getarticle", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	getArticles: function(articleType, authtoken, onSuccess, onError) {
		var payload = {tp:articleType,at:authtoken};
		$.ajax({ type: "get", url: this._serviceURL + "/center/getarticles", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	getCenterResources: function(centerID, resourceType, onSuccess, onError) {
		var payload = {ci:centerID,tp:resourceType};
		$.ajax({ type: "get", url: this._serviceURL + "/center/getresources", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	getTopCenters: function(authtoken, onSuccess, onError) {
		var payload = {at:authtoken};
		$.ajax({ type: "get", url: this._serviceURL + "/center/gettop", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	getBookings: function(authtoken, onSuccess, onError) {
		var payload = {at:authtoken};
		$.ajax({ type: "get", url: this._serviceURL + "/booking/getbookings", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	getCenterBookings: function(centerID, authtoken, onSuccess, onError) {
		var payload = {ci:centerID,at:authtoken};
		$.ajax({ type: "get", url: this._serviceURL + "/center/getbookings", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	getBooking: function(bookingID, authtoken, onSuccess, onError) {
		var payload = {bi:bookingID,at:authtoken};
		$.ajax({ type: "get", url: this._serviceURL + "/booking/getbooking", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	book: function(request, onSuccess, onError) {
		$.ajax({ type: "post", url: this._serviceURL + "/booking/book", data: request, dataType: "json", contentType: "application/json;charset=UTF-8", success: onSuccess, error: onError});
	},
	canBook: function(slotID, bookDate, authtoken, onSuccess, onError) {
		var payload = {si:slotID,bd:bookDate,at:authtoken};
		$.ajax({ type: "get", url: this._serviceURL + "/booking/canbook", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	cancelBook: function(bookCode, authtoken, onSuccess, onError) {
		var payload = {bc:bookCode,at:authtoken};
		$.ajax({ type: "get", url: this._serviceURL + "/booking/cancelbook", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	getBookingDays: function(slotID, authtoken, onSuccess, onError) {
		var payload = {si:slotID,at:authtoken};
		$.ajax({ type: "get", url: this._serviceURL + "/booking/getbookingdays", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	uploadCenterUser: function(request, onSuccess, onError) {
		$.ajax({ type: "post", url: this._serviceURL + "/center/uploaduser", data: request, dataType: "json", contentType: "application/json;charset=UTF-8", success: onSuccess, error: onError});
	},
	notifyActivityToFriends: function(request, onSuccess, onError) {
		$.ajax({ type: "post", url: this._serviceURL + "/friend/notifyactivity", data: request, dataType: "json", contentType: "application/json;charset=UTF-8", success: onSuccess, error: onError});
	},
	getHighlightedCenters: function(onSuccess, onError) {
		$.ajax({ type: "get", url: this._serviceURL + "/center/gethighlighted", dataType: "json", success: onSuccess, error: onError});
	},
	getCenterComments: function(centerID, pageIndex, onSuccess, onError) {
		var payload = {cid:centerID,pi:pageIndex};
		$.ajax({ type: "get", url: this._serviceURL + "/center/getcomments", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	signalCenter: function(request, onSuccess, onError) {
		$.ajax({ type: "post", url: this._serviceURL + "/center/signalcenter", data: request, dataType: "json", contentType: "application/json;charset=UTF-8", success: onSuccess, error: onError});
	},
	saveNotification: function(request, onSuccess, onError) {
		$.ajax({ type: "post", url: this._serviceURL + "/user/savenotification", data: request, dataType: "json", contentType: "application/json;charset=UTF-8", success: onSuccess, error: onError});
	},
	deleteNotification: function(request, onSuccess, onError) {
		$.ajax({ type: "post", url: this._serviceURL + "/user/deletenotification", data: request, dataType: "json", contentType: "application/json;charset=UTF-8", success: onSuccess, error: onError});
	},
	saveAvailability: function(request, onSuccess, onError) {
		$.ajax({ type: "post", url: this._serviceURL + "/user/saveavailability", data: request, dataType: "json", contentType: "application/json;charset=UTF-8", success: onSuccess, error: onError});
	},
	authenticate: function(username, password, appUID, onSuccess, onError) {
		var payload = {uid:username,pwd:password,aid:appUID};
		$.ajax({ type: "get", url: this._serviceURL + "/authenticate", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	authenticateCard: function(centerid, payload, appUID, onSuccess, onError) {
		var payload = {cid:centerid,pld:payload,aid:appUID};
		$.ajax({ type: "get", url: this._serviceURL + "/authenticate/card", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	performCheckIn: function(centerid, payload, appUID, onSuccess, onError) {
		var payload = {cid:centerid,pld:payload,aid:appUID};
		$.ajax({ type: "get", url: this._serviceURL + "/authenticate/checkin", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	becomeMember: function(centerid, authToken, onSuccess, onError) {
		var payload = {ci:centerid,at:authToken};
		$.ajax({ type: "get", url: this._serviceURL + "/center/becomemember", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	registerMember: function(centerid, userid, internalCode, payload, authToken, onSuccess, onError) {
		var payload = {ci:centerid,uid:userid,uic:internalCode,pl:payload,at:authToken};
		$.ajax({ type: "get", url: this._serviceURL + "/center/registermember", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	getUserByEMail: function(email, authToken, onSuccess, onError) {
		var payload = {eml:email,at:authToken};
		$.ajax({ type: "get", url: this._serviceURL + "/user/getbyemail", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	registerUser: function(request, onSuccess, onError) {
		$.ajax({ type: "post", url: this._serviceURL + "user/register", data: request, dataType: "json", contentType: "application/json;charset=UTF-8", success: onSuccess, error: onError});
	},
	me: function(authToken, onSuccess, onError) {
		var payload = {at:authToken};
		$.ajax({ type: "get", url: this._serviceURL + "/user/me", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	postBoardMessage: function(request, onSuccess, onError) {
		$.ajax({ type: "post", url: this._serviceURL + "/messageboard/post", data: request, dataType: "json", contentType: "application/json;charset=UTF-8", success: onSuccess, error: onError});
	},
	postFriendBoardMessage: function(request, onSuccess, onError) {
		$.ajax({ type: "post", url: this._serviceURL + "/messageboard/postfriend", data: request, dataType: "json", contentType: "application/json;charset=UTF-8", success: onSuccess, error: onError});
	},
	getFriends: function(pageIndex, authToken, onSuccess, onError) {
		var payload = {pi:pageIndex,at:authToken};
		$.ajax({ type: "get", url: this._serviceURL + "/friend/getfriends", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	getSubscribedCenters: function(pageIndex, authToken, onSuccess, onError) {
		var payload = {pi:pageIndex,at:authToken};
		$.ajax({ type: "get", url: this._serviceURL + "/center/getsubscribed", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	getClassCalendar: function(calendarID, authToken, onSuccess, onError) {
		var payload = {ci:calendarID,at:authToken};
		$.ajax({ type: "get", url: this._serviceURL + "/center/getclasscalendar", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	deleteCalendar: function(calendarID, authToken, onSuccess, onError) {
		var payload = {ci:calendarID,at:authToken};
		$.ajax({ type: "get", url: this._serviceURL + "/center/deletecalendar", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	getMessageBoardMessages: function(pageIndex, authToken, onSuccess, onError) {
		var payload = {pi:pageIndex,at:authToken};
		$.ajax({ type: "get", url: this._serviceURL + "/messageboard/getmessages", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	getOwnedCenters: function(pageIndex, authToken, onSuccess, onError) {
		var payload = {pi:pageIndex,at:authToken};
		$.ajax({ type: "get", url: this._serviceURL + "/center/getowned", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	getMembers: function(centerID, pageIndex, authToken, onSuccess, onError) {
		var payload = {ci:centerID,pi:pageIndex,at:authToken};
		$.ajax({ type: "get", url: this._serviceURL + "/center/getmembers", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	getRegistrations: function(centerID, authToken, onSuccess, onError) {
		var payload = {ci:centerID,at:authToken};
		$.ajax({ type: "get", url: this._serviceURL + "/center/getregistrations", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	getClassCalendars: function(centerID, authToken, onSuccess, onError) {
		var payload = {ci:centerID,at:authToken};
		$.ajax({ type: "get", url: this._serviceURL + "/center/getclasscalendars", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	getSubscribedCalendars: function(authToken, onSuccess, onError) {
		var payload = {at:authToken};
		$.ajax({ type: "get", url: this._serviceURL + "/center/getsubscribedcalendars", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	searchCenters: function(searchstring, tags, location, pageindex, authToken, onSuccess, onError) {
		var payload = {ss:searchstring,tg:tags,lc:location,pi:pageindex,at:authToken};
		$.ajax({ type: "get", url: this._serviceURL + "/center/search", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	simpleSearchCenters: function(searchstring, pageindex, onSuccess, onError) {
		var payload = {ss:searchstring,pi:pageindex};
		$.ajax({ type: "get", url: this._serviceURL + "/center/simplesearch", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	getCenter: function(centerID, authToken, onSuccess, onError) {
		var payload = {ci:centerID,at:authToken};
		$.ajax({ type: "get", url: this._serviceURL + "/center/get", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	getCenterInfo: function(centerID, authToken, onSuccess, onError) {
		var payload = {ci:centerID,at:authToken};
		$.ajax({ type: "get", url: this._serviceURL + "/center/getinfo", data: payload, dataType: "json", success: onSuccess, error: onError});
	},
	publishCalendar: function(request, onSuccess, onError) {
		$.ajax({ type: "post", url: this._serviceURL + "/center/publishcalendar", data: request, dataType: "json", contentType: "application/json;charset=UTF-8", success: onSuccess, error: onError});
	},

    //START Third Party Integration
    authenticateThirdParty: function(username, password, centerUID, appUID, onSuccess, onError) {
        var payload = {uid:username,pwd:password,aid:appUID,cid:centerUID};
        $.ajax({ type: "get", url: this._serviceURL + "/thirdparty/security/authenticate", data: payload, dataType: "json", success: onSuccess, error: onError});
    },

    getBookingSlots: function(idPrenotazione, idPrenotazioneCategoria, intervalloGiorni, dataInizio, oraInizio, oraFine, authToken, onSuccess, onError) {
        var payload = {idprenotazione:idPrenotazione,idprenotazionecategoria:idPrenotazioneCategoria,intervallogiorni:intervalloGiorni,datainizio:dataInizio,oraInizio:oraInizio,orafine:oraFine,at:authToken};
        $.ajax({ type: "get", url: this._serviceURL + "/thirdparty/reservation/bookingslots", data: payload, dataType: "json", success: onSuccess, error: onError});
    },

    addReservation: function(request, authToken, onSuccess, onError) {
        $.ajax({ type: "post", url: this._serviceURL + "/thirdparty/reservation/add?at=" + authToken, data: request, dataType: "json", contentType: "application/json;charset=UTF-8", success: onSuccess, error: onError});
    },

    cancelReservation: function(request, authToken, onSuccess, onError) {
        $.ajax({ type: "post", url: this._serviceURL + "/thirdparty/reservation/cancel?at=" + authToken, data: request, dataType: "json", contentType: "application/json;charset=UTF-8", success: onSuccess, error: onError});
    },

    addWaitingList: function(request, authToken, onSuccess, onError) {
        $.ajax({ type: "post", url: this._serviceURL + "/thirdparty/waitinglist/add?at=" + authToken, data: request, dataType: "json", contentType: "application/json;charset=UTF-8", success: onSuccess, error: onError});
    },

    cancelWaitingList: function(request, authToken, onSuccess, onError) {
        $.ajax({ type: "post", url: this._serviceURL + "/thirdparty/waitinglist/cancel?at=" + authToken, data: request, dataType: "json", contentType: "application/json;charset=UTF-8", success: onSuccess, error: onError});
    },

    getMyReservations: function(authToken, onSuccess, onError) {
        var payload = {at:authToken};
        $.ajax({ type: "get", url: this._serviceURL + "/thirdparty/reservation/myreservations", data: payload, dataType: "json", success: onSuccess, error: onError});
    },

    getServiceCategories: function(authToken, onSuccess, onError) {
        var payload = {at:authToken};
        $.ajax({ type: "get", url: this._serviceURL + "/thirdparty/reservation/categories", data: payload, dataType: "json", success: onSuccess, error: onError});
    },

    getServices: function(idPrenotazioneCategoria, authToken, onSuccess, onError) {
        var payload = {idprenotazionecategoria:idPrenotazioneCategoria, at:authToken};
        $.ajax({ type: "get", url: this._serviceURL + "/thirdparty/reservation/services", data: payload, dataType: "json", success: onSuccess, error: onError});
    },

    addReferrals: function(request, authToken, onSuccess, onError) {
        $.ajax({ type: "post", url: this._serviceURL + "/thirdparty/user/addreferrals?at=" + authToken, data: request, dataType: "json", contentType: "application/json;charset=UTF-8", success: onSuccess, error: onError});
    },

    getMyStatus: function(authToken, onSuccess, onError) {
        var payload = {at:authToken};
        $.ajax({ type: "get", url: this._serviceURL + "/thirdparty/user/mystatus", data: payload, dataType: "json", success: onSuccess, error: onError});
    }
    //END Third Party Integration
};

(function(){var n=this,t=n._,r={},e=Array.prototype,u=Object.prototype,i=Function.prototype,a=e.push,o=e.slice,c=e.concat,l=u.toString,f=u.hasOwnProperty,s=e.forEach,p=e.map,h=e.reduce,v=e.reduceRight,d=e.filter,g=e.every,m=e.some,y=e.indexOf,b=e.lastIndexOf,x=Array.isArray,_=Object.keys,j=i.bind,w=function(n){return n instanceof w?n:this instanceof w?(this._wrapped=n,void 0):new w(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=w),exports._=w):n._=w,w.VERSION="1.4.4";var A=w.each=w.forEach=function(n,t,e){if(null!=n)if(s&&n.forEach===s)n.forEach(t,e);else if(n.length===+n.length){for(var u=0,i=n.length;i>u;u++)if(t.call(e,n[u],u,n)===r)return}else for(var a in n)if(w.has(n,a)&&t.call(e,n[a],a,n)===r)return};w.map=w.collect=function(n,t,r){var e=[];return null==n?e:p&&n.map===p?n.map(t,r):(A(n,function(n,u,i){e[e.length]=t.call(r,n,u,i)}),e)};var O="Reduce of empty array with no initial value";w.reduce=w.foldl=w.inject=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),h&&n.reduce===h)return e&&(t=w.bind(t,e)),u?n.reduce(t,r):n.reduce(t);if(A(n,function(n,i,a){u?r=t.call(e,r,n,i,a):(r=n,u=!0)}),!u)throw new TypeError(O);return r},w.reduceRight=w.foldr=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),v&&n.reduceRight===v)return e&&(t=w.bind(t,e)),u?n.reduceRight(t,r):n.reduceRight(t);var i=n.length;if(i!==+i){var a=w.keys(n);i=a.length}if(A(n,function(o,c,l){c=a?a[--i]:--i,u?r=t.call(e,r,n[c],c,l):(r=n[c],u=!0)}),!u)throw new TypeError(O);return r},w.find=w.detect=function(n,t,r){var e;return E(n,function(n,u,i){return t.call(r,n,u,i)?(e=n,!0):void 0}),e},w.filter=w.select=function(n,t,r){var e=[];return null==n?e:d&&n.filter===d?n.filter(t,r):(A(n,function(n,u,i){t.call(r,n,u,i)&&(e[e.length]=n)}),e)},w.reject=function(n,t,r){return w.filter(n,function(n,e,u){return!t.call(r,n,e,u)},r)},w.every=w.all=function(n,t,e){t||(t=w.identity);var u=!0;return null==n?u:g&&n.every===g?n.every(t,e):(A(n,function(n,i,a){return(u=u&&t.call(e,n,i,a))?void 0:r}),!!u)};var E=w.some=w.any=function(n,t,e){t||(t=w.identity);var u=!1;return null==n?u:m&&n.some===m?n.some(t,e):(A(n,function(n,i,a){return u||(u=t.call(e,n,i,a))?r:void 0}),!!u)};w.contains=w.include=function(n,t){return null==n?!1:y&&n.indexOf===y?n.indexOf(t)!=-1:E(n,function(n){return n===t})},w.invoke=function(n,t){var r=o.call(arguments,2),e=w.isFunction(t);return w.map(n,function(n){return(e?t:n[t]).apply(n,r)})},w.pluck=function(n,t){return w.map(n,function(n){return n[t]})},w.where=function(n,t,r){return w.isEmpty(t)?r?null:[]:w[r?"find":"filter"](n,function(n){for(var r in t)if(t[r]!==n[r])return!1;return!0})},w.findWhere=function(n,t){return w.where(n,t,!0)},w.max=function(n,t,r){if(!t&&w.isArray(n)&&n[0]===+n[0]&&65535>n.length)return Math.max.apply(Math,n);if(!t&&w.isEmpty(n))return-1/0;var e={computed:-1/0,value:-1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;a>=e.computed&&(e={value:n,computed:a})}),e.value},w.min=function(n,t,r){if(!t&&w.isArray(n)&&n[0]===+n[0]&&65535>n.length)return Math.min.apply(Math,n);if(!t&&w.isEmpty(n))return 1/0;var e={computed:1/0,value:1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;e.computed>a&&(e={value:n,computed:a})}),e.value},w.shuffle=function(n){var t,r=0,e=[];return A(n,function(n){t=w.random(r++),e[r-1]=e[t],e[t]=n}),e};var k=function(n){return w.isFunction(n)?n:function(t){return t[n]}};w.sortBy=function(n,t,r){var e=k(t);return w.pluck(w.map(n,function(n,t,u){return{value:n,index:t,criteria:e.call(r,n,t,u)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index<t.index?-1:1}),"value")};var F=function(n,t,r,e){var u={},i=k(t||w.identity);return A(n,function(t,a){var o=i.call(r,t,a,n);e(u,o,t)}),u};w.groupBy=function(n,t,r){return F(n,t,r,function(n,t,r){(w.has(n,t)?n[t]:n[t]=[]).push(r)})},w.countBy=function(n,t,r){return F(n,t,r,function(n,t){w.has(n,t)||(n[t]=0),n[t]++})},w.sortedIndex=function(n,t,r,e){r=null==r?w.identity:k(r);for(var u=r.call(e,t),i=0,a=n.length;a>i;){var o=i+a>>>1;u>r.call(e,n[o])?i=o+1:a=o}return i},w.toArray=function(n){return n?w.isArray(n)?o.call(n):n.length===+n.length?w.map(n,w.identity):w.values(n):[]},w.size=function(n){return null==n?0:n.length===+n.length?n.length:w.keys(n).length},w.first=w.head=w.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:o.call(n,0,t)},w.initial=function(n,t,r){return o.call(n,0,n.length-(null==t||r?1:t))},w.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:o.call(n,Math.max(n.length-t,0))},w.rest=w.tail=w.drop=function(n,t,r){return o.call(n,null==t||r?1:t)},w.compact=function(n){return w.filter(n,w.identity)};var R=function(n,t,r){return A(n,function(n){w.isArray(n)?t?a.apply(r,n):R(n,t,r):r.push(n)}),r};w.flatten=function(n,t){return R(n,t,[])},w.without=function(n){return w.difference(n,o.call(arguments,1))},w.uniq=w.unique=function(n,t,r,e){w.isFunction(t)&&(e=r,r=t,t=!1);var u=r?w.map(n,r,e):n,i=[],a=[];return A(u,function(r,e){(t?e&&a[a.length-1]===r:w.contains(a,r))||(a.push(r),i.push(n[e]))}),i},w.union=function(){return w.uniq(c.apply(e,arguments))},w.intersection=function(n){var t=o.call(arguments,1);return w.filter(w.uniq(n),function(n){return w.every(t,function(t){return w.indexOf(t,n)>=0})})},w.difference=function(n){var t=c.apply(e,o.call(arguments,1));return w.filter(n,function(n){return!w.contains(t,n)})},w.zip=function(){for(var n=o.call(arguments),t=w.max(w.pluck(n,"length")),r=Array(t),e=0;t>e;e++)r[e]=w.pluck(n,""+e);return r},w.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},w.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=w.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}if(y&&n.indexOf===y)return n.indexOf(t,r);for(;u>e;e++)if(n[e]===t)return e;return-1},w.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=null!=r;if(b&&n.lastIndexOf===b)return e?n.lastIndexOf(t,r):n.lastIndexOf(t);for(var u=e?r:n.length;u--;)if(n[u]===t)return u;return-1},w.range=function(n,t,r){1>=arguments.length&&(t=n||0,n=0),r=arguments[2]||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=0,i=Array(e);e>u;)i[u++]=n,n+=r;return i},w.bind=function(n,t){if(n.bind===j&&j)return j.apply(n,o.call(arguments,1));var r=o.call(arguments,2);return function(){return n.apply(t,r.concat(o.call(arguments)))}},w.partial=function(n){var t=o.call(arguments,1);return function(){return n.apply(this,t.concat(o.call(arguments)))}},w.bindAll=function(n){var t=o.call(arguments,1);return 0===t.length&&(t=w.functions(n)),A(t,function(t){n[t]=w.bind(n[t],n)}),n},w.memoize=function(n,t){var r={};return t||(t=w.identity),function(){var e=t.apply(this,arguments);return w.has(r,e)?r[e]:r[e]=n.apply(this,arguments)}},w.delay=function(n,t){var r=o.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},w.defer=function(n){return w.delay.apply(w,[n,1].concat(o.call(arguments,1)))},w.throttle=function(n,t){var r,e,u,i,a=0,o=function(){a=new Date,u=null,i=n.apply(r,e)};return function(){var c=new Date,l=t-(c-a);return r=this,e=arguments,0>=l?(clearTimeout(u),u=null,a=c,i=n.apply(r,e)):u||(u=setTimeout(o,l)),i}},w.debounce=function(n,t,r){var e,u;return function(){var i=this,a=arguments,o=function(){e=null,r||(u=n.apply(i,a))},c=r&&!e;return clearTimeout(e),e=setTimeout(o,t),c&&(u=n.apply(i,a)),u}},w.once=function(n){var t,r=!1;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}},w.wrap=function(n,t){return function(){var r=[n];return a.apply(r,arguments),t.apply(this,r)}},w.compose=function(){var n=arguments;return function(){for(var t=arguments,r=n.length-1;r>=0;r--)t=[n[r].apply(this,t)];return t[0]}},w.after=function(n,t){return 0>=n?t():function(){return 1>--n?t.apply(this,arguments):void 0}},w.keys=_||function(n){if(n!==Object(n))throw new TypeError("Invalid object");var t=[];for(var r in n)w.has(n,r)&&(t[t.length]=r);return t},w.values=function(n){var t=[];for(var r in n)w.has(n,r)&&t.push(n[r]);return t},w.pairs=function(n){var t=[];for(var r in n)w.has(n,r)&&t.push([r,n[r]]);return t},w.invert=function(n){var t={};for(var r in n)w.has(n,r)&&(t[n[r]]=r);return t},w.functions=w.methods=function(n){var t=[];for(var r in n)w.isFunction(n[r])&&t.push(r);return t.sort()},w.extend=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]=t[r]}),n},w.pick=function(n){var t={},r=c.apply(e,o.call(arguments,1));return A(r,function(r){r in n&&(t[r]=n[r])}),t},w.omit=function(n){var t={},r=c.apply(e,o.call(arguments,1));for(var u in n)w.contains(r,u)||(t[u]=n[u]);return t},w.defaults=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)null==n[r]&&(n[r]=t[r])}),n},w.clone=function(n){return w.isObject(n)?w.isArray(n)?n.slice():w.extend({},n):n},w.tap=function(n,t){return t(n),n};var I=function(n,t,r,e){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;n instanceof w&&(n=n._wrapped),t instanceof w&&(t=t._wrapped);var u=l.call(n);if(u!=l.call(t))return!1;switch(u){case"[object String]":return n==t+"";case"[object Number]":return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object RegExp]":return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]==n)return e[i]==t;r.push(n),e.push(t);var a=0,o=!0;if("[object Array]"==u){if(a=n.length,o=a==t.length)for(;a--&&(o=I(n[a],t[a],r,e)););}else{var c=n.constructor,f=t.constructor;if(c!==f&&!(w.isFunction(c)&&c instanceof c&&w.isFunction(f)&&f instanceof f))return!1;for(var s in n)if(w.has(n,s)&&(a++,!(o=w.has(t,s)&&I(n[s],t[s],r,e))))break;if(o){for(s in t)if(w.has(t,s)&&!a--)break;o=!a}}return r.pop(),e.pop(),o};w.isEqual=function(n,t){return I(n,t,[],[])},w.isEmpty=function(n){if(null==n)return!0;if(w.isArray(n)||w.isString(n))return 0===n.length;for(var t in n)if(w.has(n,t))return!1;return!0},w.isElement=function(n){return!(!n||1!==n.nodeType)},w.isArray=x||function(n){return"[object Array]"==l.call(n)},w.isObject=function(n){return n===Object(n)},A(["Arguments","Function","String","Number","Date","RegExp"],function(n){w["is"+n]=function(t){return l.call(t)=="[object "+n+"]"}}),w.isArguments(arguments)||(w.isArguments=function(n){return!(!n||!w.has(n,"callee"))}),"function"!=typeof/./&&(w.isFunction=function(n){return"function"==typeof n}),w.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},w.isNaN=function(n){return w.isNumber(n)&&n!=+n},w.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"==l.call(n)},w.isNull=function(n){return null===n},w.isUndefined=function(n){return n===void 0},w.has=function(n,t){return f.call(n,t)},w.noConflict=function(){return n._=t,this},w.identity=function(n){return n},w.times=function(n,t,r){for(var e=Array(n),u=0;n>u;u++)e[u]=t.call(r,u);return e},w.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))};var M={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"}};M.unescape=w.invert(M.escape);var S={escape:RegExp("["+w.keys(M.escape).join("")+"]","g"),unescape:RegExp("("+w.keys(M.unescape).join("|")+")","g")};w.each(["escape","unescape"],function(n){w[n]=function(t){return null==t?"":(""+t).replace(S[n],function(t){return M[n][t]})}}),w.result=function(n,t){if(null==n)return null;var r=n[t];return w.isFunction(r)?r.call(n):r},w.mixin=function(n){A(w.functions(n),function(t){var r=w[t]=n[t];w.prototype[t]=function(){var n=[this._wrapped];return a.apply(n,arguments),D.call(this,r.apply(w,n))}})};var N=0;w.uniqueId=function(n){var t=++N+"";return n?n+t:t},w.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var T=/(.)^/,q={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},B=/\\|'|\r|\n|\t|\u2028|\u2029/g;w.template=function(n,t,r){var e;r=w.defaults({},r,w.templateSettings);var u=RegExp([(r.escape||T).source,(r.interpolate||T).source,(r.evaluate||T).source].join("|")+"|$","g"),i=0,a="__p+='";n.replace(u,function(t,r,e,u,o){return a+=n.slice(i,o).replace(B,function(n){return"\\"+q[n]}),r&&(a+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"),e&&(a+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),u&&(a+="';\n"+u+"\n__p+='"),i=o+t.length,t}),a+="';\n",r.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";try{e=Function(r.variable||"obj","_",a)}catch(o){throw o.source=a,o}if(t)return e(t,w);var c=function(n){return e.call(this,n,w)};return c.source="function("+(r.variable||"obj")+"){\n"+a+"}",c},w.chain=function(n){return w(n).chain()};var D=function(n){return this._chain?w(n).chain():n};w.mixin(w),A(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=e[n];w.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!=n&&"splice"!=n||0!==r.length||delete r[0],D.call(this,r)}}),A(["concat","join","slice"],function(n){var t=e[n];w.prototype[n]=function(){return D.call(this,t.apply(this._wrapped,arguments))}}),w.extend(w.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}).call(this);
