











				document.write(i18n.app.TEXT_LOADINGCLAIM);
			

				document.write(i18n.app.TEXT_LOADINGDISCLAIMER);
			

var authentication = {
    userLoggedOnFB: {
        userId:"",
        idFB: "",
        idTW:"",
        email: "",
        displayName: "",
        gender: "",
        nationality: "",
        birthDate: "",
        avatar:"",
    },
    
	authenticationCompleted: false,
	setAuthenticationCompleted: function(complete) {
		this.authenticationCompleted = complete;
	},
	isAuthenticationCompleted: function() {
		return this.authenticationCompleted;
	},
loginOnTWCompleted:function(idTW, displayName, nationality, avatar) {
    var viewport = Ext.Viewport,
    profileStore = Ext.getStore("Profile_Local");
    
    console.log("loginOnTWCompleted   " + idTW);
    
    viewport.setMasked({
                       xtype: 'loadmask',
                       loadingText: i18n.app.HINT_LOADING
                       });
    
    
    this.userLoggedOnFB.userId = idTW;
    this.userLoggedOnFB.idTW = idTW;
    this.userLoggedOnFB.idFB = null;
    this.userLoggedOnFB.displayName = displayName;
    this.userLoggedOnFB.email = null;
    this.userLoggedOnFB.gender = null;
    this.userLoggedOnFB.birthDate = null;
    this.userLoggedOnFB.nationality = nationality;
    this.userLoggedOnFB.avatar = utils.__(avatar);
    
    viewport.setMasked(true);
    this.authenticationCompleted = false;
    
    if (profileStore) {
        if (profileStore.getCount() < 1) {
            this.generateToken(idTW, "t");
        } else {
            var data = profileStore.first().data;
            console.log("loginOnTWCompleted" + data.idUser + data.idTwitter);
            if (data.idUser !== idTW || _.isEmpty(data.token)) {
                Ext.getStore("Profile_Local").removeAll();
                this.generateToken(idTW, "t");
            } else {
                this._loadApplicationView();
            }
        }
    } else {
        viewport.setMasked(false);
    }
},
loginOnFBCompleted: function(idFB, email, displayName, gender, nationality, birthDate) {
    var viewport = Ext.Viewport,
    profileStore = Ext.getStore("Profile_Local");
    
    viewport.setMasked({
                       xtype: 'loadmask',
                       loadingText: i18n.app.HINT_LOADING
                       });
    this.userLoggedOnFB.userId = email;
    this.userLoggedOnFB.idFB = idFB;
    this.userLoggedOnFB.email = email;
    this.userLoggedOnFB.displayName = displayName;
    this.userLoggedOnFB.gender = gender;
    this.userLoggedOnFB.nationality = (nationality ? nationality.split("_")[0].toUpperCase() : "");
    this.userLoggedOnFB.birthDate = birthDate;
    this.userLoggedOnFB.idTw = null;
    this.userLoggedOnFB.avatar = utils.__("http://graph.facebook.com/%1/picture", idFB);
    
    viewport.setMasked(true);
    this.authenticationCompleted = false;
    
    if (profileStore) {
        if (profileStore.getCount() < 1) {
            this.generateToken(idFB, "f");
        } else {
            var data = profileStore.first().data;
            if (data.idUser !== email || _.isEmpty(data.token)) {
                Ext.getStore("Profile_Local").removeAll();
                this.generateToken(idFB, "f");
            } else {
                this._loadApplicationView();
            }
        }
    } else {
        viewport.setMasked(false);
    }
},
addNewAccountTWCompleted:function(idTW) {
    var viewport = Ext.Viewport,
    profileStore = Ext.getStore("Profile_Local");
    
    var user = Ext.getStore("Profile_Local").first().data;
    
    viewport.setMasked({
                       xtype: 'loadmask',
                       loadingText: i18n.app.HINT_LOADING
                       });
    
    
    this.userLoggedOnFB.idTW = idTW;
    
    viewport.setMasked(true);
    this.authenticationCompleted = false;
    
    if (profileStore) {
        if (profileStore.getCount() < 1) {
            this.generateToken(idTW, "f");
        } else {
            var data = profileStore.first().data;
            //console.log("addNewAccountTWCompleted");
            if (data.idTwitter !== idTW || _.isEmpty(data.token) || !bridge.TWSession) {
                var values ={
                idUser: data.idUser,
                idFacebook: data.idFacebook,
                idTwitter: this.userLoggedOnFB.idTW,
                birthDate:Ext.Date.format(data.birthDate, 'c'),
                email: data.email,
                displayName:data.displayName,
                gender:data.gender,
                username:data.username,
                nationality: data.nationality,
                avatar: data.avatar
                };
                this.registerUserWithParams(values, true);
            } else {
                this._doRegisterUserCallback(4, null, null);
                //console.log("else_doRegisterUserCallback");
                // viewport.setMasked(false);
                  
            }
        }
    } else {
        viewport.setMasked(false);
    }
},
addNewAccountFBCompleted: function(idFB, email, gender, nationality, birthDate) {
    //console.log("Auth: addNewAccountFBCompleted");
    var viewport = Ext.Viewport,
    profileStore = Ext.getStore("Profile_Local");
    
    viewport.setMasked({
                       xtype: 'loadmask',
                       loadingText: i18n.app.HINT_LOADING
                       });
    
    this.userLoggedOnFB.email = email;
    this.userLoggedOnFB.idFB = idFB;
    
    viewport.setMasked(true);
    this.authenticationCompleted = false;
    
    if (profileStore) {
        if (profileStore.getCount() < 1) {
            this.generateToken(idFB, "f");
            //  this.registerUserWithParams(this.userLoggedOnFB, true);
        } else {
            
            var data = profileStore.first().data;
            if (data.idFacebook !== idFB || _.isEmpty(data.token) || !bridge.FBSession) {
                //console.log("addNewAccountFBCompleted" + data.idTwitter + " " + this.userLoggedOnFB.email);
                var values ={
                idUser: data.idUser,
                idFacebook: this.userLoggedOnFB.idFB,
                idTwitter:data.idTwitter,
                birthDate:Ext.Date.format(data.birthDate, 'c'),
                email: this.userLoggedOnFB.email,
                displayName:data.displayName,
                gender:data.gender,
                username:data.username,
                nationality: data.nationality,
                avatar: data.avatar
                };
                this.registerUserWithParams(values, true);
            } else {
               // viewport.setMasked(false);
               this._doRegisterUserCallback(4, null, null);
            }
        }
    } else {
        viewport.setMasked(false);
    }
},

	logoutFromApp: function() {
		var profileAjax = Ext.getStore("Profile_Ajax"),
			profileLocal = Ext.getStore("Profile_Local");

		this.authenticationCompleted = false;

		if (profileAjax) {
			profileAjax.removeAll();
		}

		if (profileLocal) {
			//profileLocal.removeAll();
		}

		bridge.logout();
	},
	errorInFacebook: function(appNeedRestart) {
		utils.alert(i18n.app.ALERT_ERRORCOMMUNICATION, i18n.app.COMMON_ATTENTION);
		Ext.Viewport.setMasked(false);

		if (appNeedRestart) {
			this.logoutFromApp();
		}
	},
registerUserWithParams: function(values, update) {
    //console.log("registerUserWithParams");
    var errorCode = -1,
    that = this,
    viewport = Ext.Viewport;
    
    viewport.setMasked({
                       xtype: 'loadmask',
                       loadingText: i18n.app.HINT_LOADING
                       });
    
    viewport.setMasked(true);
    
    if (values && !_.isEmpty(values.idUser) && !_.isEmpty(values.displayName) && !_.isEmpty(values.birthDate)) {
        var params = {
        idUser: values.idUser,
        idFacebook: values.idFacebook,
        idTwitter:values.idTwitter,
        username: values.idUser,
        displayName: values.displayName,
        email: values.email,
        gender: values.gender,
        nationality: values.nationality,
        birthDate: values.birthDate,
        avatar: values.avatar
        };
        //console.log("register");
        Ext.Ajax.request({
                         url: HH.IP_PORT_SERVER + "/birrettaservice/rest/bserv/saveUser",
                         method: "POST",
                         headers: {
                         "btUsername": values.idUser
                         },
                         params: params,
                         success: function(result) {
                         //console.log("success");
                         var json = Ext.decode(result.responseText, true);
                         if (json) {
                         errorCode = json.response.status.code;
                         
                         if (errorCode < 200 && json.response.body.list.length > 0) {
                        
                         var token = json.response.body.list[0].btSid;
                         var index = 0;
                         if (update){index = 3}
                         that._doRegisterUserCallback(index, {
                                                      idUser: params.idUser,
                                                      idFacebook: params.idFacebook,
                                                      idTwitter:params.idTwitter,
                                                      username: params.username,
                                                      displayName: params.displayName,
                                                      email: params.email,
                                                      gender: params.gender,
                                                      nationality: params.nationality,
                                                      birthDate: params.birthDate,
                                                      token: token,
                                                      avatar: params.avatar
                                                      },
                                                      errorCode);
                         } else {
                         that._doRegisterUserCallback(1, null, errorCode);
                         }
                         } else {
                         that._doRegisterUserCallback(1, null, errorCode);
                         }
                         },
                         failure: function(result) {
                         that._doRegisterUserCallback(1, null, errorCode);
                         }
                         });
    } else {
        that._doRegisterUserCallback(2, null, errorCode);
    }
},
generateToken: function(idUser, type) {
    var errorCode = -1,
    that= this,
    viewport = Ext.Viewport;
    viewport.setMasked({
                       xtype: 'loadmask',
                       loadingText: i18n.app.HINT_LOADING
                       });
    viewport.setMasked(true);
    console.log("generateToken");
    
    if (!_.isEmpty(idUser)) {
        console.log("!isEmpty");
        Ext.Ajax.request({
                         url: HH.IP_PORT_SERVER + "/birrettaservice/rest/bserv/generaToken",
                         method: "POST",
                         params: {
                         idUser: idUser,
                         socialType:type
                         },
                         success: function(result) {
                            var json = Ext.decode(result.responseText, true),
                            index = 0, token = "", btUsername="" ;
                            if (json) {
                                errorCode = json.response.status.code;
                                //console.log(">>>>>>>>>>>TOKEN" + errorCode);
                                if (errorCode < 200 && json.response.body.list.length > 0) {
                                    //console.log(">>>>>>>>>>>TOKEN: " + json.response.body.list[0].btUsername);
                                    token = json.response.body.list[0].btSid;
                                    btUsername = json.response.body.list[0].btUsername;
                                    index = 0;
                                } else if (errorCode === 200) {
                                    index = 1;
                                } else {
                                    HH.log("--> Step: Generate token failure - CODE: " + json.response.status.code);
                                    index = 2;
                                }
                            }
                         
                            that._doGenerateTokenCallback(index, token, errorCode,btUsername);
                         },
                         failure: function(result) {
                         that._doGenerateTokenCallback(2, "", errorCode,"");
                         }
                         });
    } else {
        that._doGenerateTokenCallback(3, "", errorCode, "");
    }
},
_doGenerateTokenCallback: function(index, token, errorCode, btUsername) {
    var store = Ext.getStore("Profile_Local"),
    viewport = Ext.Viewport;
    if(store.getCount() < 1)
    {
        store.load();
    }
    
    switch(index) {
        case 0:    // Success
            HH.log("---> Step: [Generate Token] Success");
            this.userLoggedOnFB.idUser = btUsername;
            console.log("---> Step: [Generate Token] Success" + this.userLoggedOnFB.idUser);
            if (store.getCount() < 1) {
               
                store.add({
                          idUser: this.userLoggedOnFB.idUser,
                          token: token,
                          idFacebook: this.userLoggedOnFB.idFB,
                          idTwitter:this.userLoggedOnFB.idTW,
                          });
            } else {
             
                store.first().set("token", token);
            }
            this._loadApplicationView();
            break;
        case 1:    // Fail: user not present
            HH.log("--> Step: [Generate token] User not present - CODE: " + errorCode);
            var register = Ext.create('B2B.view._Register');
            
            register.setValues({
                               idUser: this.userLoggedOnFB.userId,
                               idFacebook: this.userLoggedOnFB.idFB,
                               idTwitter:this.userLoggedOnFB.idTW,
                               birthDate: new Date(this.userLoggedOnFB.birthDate),
                               email: this.userLoggedOnFB.email,
                               displayName: this.userLoggedOnFB.displayName,
                               gender: (this.userLoggedOnFB.gender === 'male' ? i18n.app.LABEL_MALE : i18n.app.LABEL_FEMALE),
                               nationality: this.userLoggedOnFB.nationality,
                               avatar: this.userLoggedOnFB.avatar
                               });
            console.log("user not present");
            if (Ext.fly('appLoadingIndicator')) {
                Ext.fly('appLoadingIndicator').destroy();
            }
            viewport.removeAt(0);
            viewport.add([register]);
            break;
        case 2:    // Fail
            HH.log("--> Step: [Generate token] Failure - CODE: " + errorCode);
            utils.alert(i18n.app.ALERT_ERRORCOMMUNICATION, i18n.app.COMMON_ATTENTION);
            break;
        case 3:    // Params error
            HH.log("---> Step: [Generate token] Params are wrongs");
            break;
    }
    
    viewport.setMasked(false);
},
    
_doRegisterUserCallback: function(index, userValues, errorCode) {
    var store = Ext.getStore("Profile_Local"),
    viewport = Ext.Viewport;

    switch(index) {
        case 0:    // Success
            if (userValues) {
                HH.log("---> Step: [Register user] Success");
                store.removeAll();
                store.add(userValues);
                store.sync();
                bridge.updateAccounts();
                this._loadApplicationView();
            } else {
                HH.log("---> Step: [Register user] Failure - User values are empty");
            }
            break;
        case 1:    // Fail
            HH.log("--> Step: [Register user] Failure - CODE: " + errorCode);
            utils.alert(i18n.app.ALERT_ERRORCOMMUNICATION, i18n.app.COMMON_ATTENTION);
            break;
        case 2:    // Params error
            HH.log("---> Step: [Register user] Params are wrong");
            break;
        case 3:    // UpdateData
            if (userValues) {
                HH.log("---> Step: [Register user] Success");
                store.removeAll();
                store.add(userValues);
                store.sync();
                utils.alert(i18n.app.TEXT_ADD_ACCOUNT_SUCCES, i18n.app.TEXT_CONGRATULATION);
                 bridge.updateAccounts();
            } else {
                HH.log("---> Step: [Register user] Failure - User values are empty");
            }
            break;
        case 4:
                bridge.updateAccounts();
                utils.alert(i18n.app.USER_EXIST, i18n.app.COMMON_ATTENTION);
                  
    }
    
    viewport.setMasked(false);
},
_loadApplicationView: function() {
    var viewport = Ext.Viewport;
     bridge.updateAccounts();
     bridge.loginCompleted();
    viewport.fireEvent("refreshProfileStore", this);
    
    if (Ext.fly('appLoadingIndicator')) {
        Ext.fly('appLoadingIndicator').destroy();
    }
    
    viewport.removeAll(true, true);
    viewport.add([Ext.create('B2B.view._App')]);
    viewport.setMasked(false);
    this.authenticationCompleted = true;
}
};



			if (navigator.userAgent.toLowerCase().match(/android/)) {
				document.write('<script charset="utf-8" src="resources\/js\/cordova-2.0.0.js"><\/script>');
			} else {
				document.write('<script charset="utf-8" src="resources\/js\/cordova-2.0.0.min.js"><\/script>');
			}

			document.write('<script src="sdk\/sencha-touch.js"><\/script>');
			document.write('<script src="resources\/js\/md5.min.js"><\/script>');
			document.write('<script src="utils.js"><\/script>');
			document.write('<script src="app\/controller\/_Bridge.js"><\/script>');
			document.write('<script src="authentication.js"><\/script>');
			document.write('<script src="http:\/\/maps.google.com\/maps\/api\/js?sensor=true"><\/script>');
			document.write('<script id="moment-js" src="resources\/js\/moment.min.js"><\/script>');
			document.write('<script id="underscore" type="text\/javascript" src="resources\/js\/underscore.min.js"><\/script>');
			document.write('<script id="underscore_string" type="text\/javascript" src="resources\/js\/underscore_string.min.js"><\/script>');
			document.write('<script id="hh-js" type="text\/javascript" src="resources\/js\/hh.js"><\/script>');
			document.write('<script id="microloader" type="text\/javascript" src="sdk\/microloader\/development.js"><\/script>');
			document.write('<script type="text\/javascript" src="app.js"><\/script>');
		

					document.write(i18n.app.TEXT_LOADINGCLAIM);
				

					document.write(i18n.app.TEXT_LOADINGDISCLAIMER);
				

/* Utils Global Object*/
var utils = {
	idUser:null,
	needRestart: false,
	/* translate f() a la wordpress */
	__:	function(CONST_String){
		if ( _.isUndefined(CONST_String)) CONST_String = "";
		for (var i = arguments.length - 1; i >= 1; i--) {
			CONST_String = CONST_String.replace("%"+i, arguments[i]);
		};
		return CONST_String;
	},
	isOnline: function() {
		return window.navigator.onLine;
	},
	getAppNeedRestart: function() {
		return this.needRestart;
	},
	setAppNeedRestart: function(restart) {
		this.needRestart = restart;
	},
	getDate: function(date){
		if(!_.isUndefined(date)){
			return this.getHumanDate(new Date(date));
		}else{
			return i18n.app.TEXT_DATESOMETIME;
		}
	},
	getRate: function(rate) {
		return (rate === null || _.isUndefined(rate) ? '0' : rate);
	},
	getDrinkString: function(values, currentUser) {
		var strRate = "0";
		if (values) {
			strRate = this.getRate(values.rate);
			if (values.rate === "0" || values.rate === 0) {
				return this.__((currentUser ? i18n.app.YOU_DRINK_TEXT_1_0 : i18n.app.HE_DRINK_TEXT_1_0), _.titleize(values.beerName), values.placeName,strRate);
			} else if (values.rate === "1" || values.rate === 1) {
				return this.__((currentUser ? i18n.app.YOU_DRINK_TEXT_1_1 : i18n.app.HE_DRINK_TEXT_1_1), _.titleize(values.beerName), values.placeName,strRate);
			} else if (values.rate === "2" || values.rate === 2) {
				return this.__((currentUser ? i18n.app.YOU_DRINK_TEXT_1_2 : i18n.app.HE_DRINK_TEXT_1_2), _.titleize(values.beerName), values.placeName,strRate);
			} else if (values.rate === "3" || values.rate === 3) {
				return this.__((currentUser ? i18n.app.YOU_DRINK_TEXT_1_3 : i18n.app.HE_DRINK_TEXT_1_3), _.titleize(values.beerName), values.placeName,strRate);
			} else if (values.rate === "4" || values.rate === 4) {
				return this.__((currentUser ? i18n.app.YOU_DRINK_TEXT_1_4 : i18n.app.HE_DRINK_TEXT_1_4), _.titleize(values.beerName), values.placeName,strRate);
			} else if (values.rate === "5" || values.rate === 5) {
				return this.__((currentUser ? i18n.app.YOU_DRINK_TEXT_1_5 : i18n.app.HE_DRINK_TEXT_1_5), _.titleize(values.beerName), values.placeName,strRate);
			}
		}
		return this.__((currentUser ? i18n.app.YOU_DRINK_TEXT_1_0 : i18n.app.HE_DRINK_TEXT_1_0), _.titleize(values.beerName), values.placeName,strRate);
	},
	getUserAvatar: function(){
		var avatar_url = HH.default_user64,
			store = Ext.getStore('Profile_Local'),
			profile = null;

		if (store.getCount() > 0) {
			profile = store.first().data;
		}

		if (profile && !_.isEmpty(profile.avatar)) {
			avatar_url = profile.avatar;
		}

		return avatar_url;
	},
	getFriendAvatar: function(idUser) {
		var avatar = HH.default_user64,
			storeFriend = Ext.getStore("Friends_Ajax"),
			storeProfile= Ext.getStore("Profile_Local"),
			user = null;

		if (!_.isEmpty(idUser)) {
			user = storeFriend.findRecord("idUser", idUser);

			if (user && !_.isEmpty(user.data.avatar)) {
				avatar = user.data.avatar;
			} else{
				user = storeProfile.findRecord("idUser", idUser);
				if (user && !_.isEmpty(user.data.avatar)) {
					avatar = user.data.avatar;
				}
			}
		}

		return avatar;
	},
	getUserDisplayName: function(idUser,name) {
		var displayName = name,
			store = Ext.getStore("Friends_Ajax"),
			storeProfile= Ext.getStore("Profile_Local"),
			user = null;

		if (!_.isEmpty(idUser)) {
			user = store.findRecord("idUser", idUser);

			if (user && !_.isEmpty(user.data.displayName)) {
				displayName = user.data.displayName;
			} else{
				user = storeProfile.findRecord("idUser", idUser);
				if (user && !_.isEmpty(user.data.displayName)) {
					displayName = user.data.displayName;
				}
			}
		}

		return displayName;
	},
	getProgressPoints: function(profile){
		if (profile && _.isNumber(profile.currentPoints)) {
			if (profile.currentPoints < 1) {
				return 1
			} else {
				var max = 1;
				if (this.getMaxPoints(profile) > 0) max = this.getMaxPoints(profile);
				return Math.ceil(profile.currentPoints * 100 / max);
			}
		}
		return 1;
	},
	getMaxPoints: function(profile){
		if (profile && _.isNumber(profile.maxPoints)){
			return profile.maxPoints;
		}
		return 1;
	},
	getPointLabel: function(profile, current){
		var pointstatus = 0;

		if (profile) {
			var currentPoints = profile.currentPoints;
			if(currentPoints > 0){
				if (currentPoints < profile.maxPoints){
					pointstatus = 1;
				}
				else
				{
					//per evitare di uscire dal contenitore
					pointstatus = 2;
					currentPoints=profile.maxPoints;
				}
			};
			switch (pointstatus) {
				case 1:
					return this.__(i18n.app.POINTLABEL_TEXT_0_1, (current ? i18n.app.YOU_EARNED : i18n.app.HE_EARNED), currentPoints);
					break;
				case 2:
					return this.__(i18n.app.POINTLABEL_TEXT_0_2, (current ? i18n.app.YOU_EARNED : i18n.app.HE_EARNED), currentPoints);
					break;
				default:
					return this.__(i18n.app.POINTLABEL_TEXT_0_0, (current ? i18n.app.YOU_DIDNT_EARN : i18n.app.HE_DIDNT_EARN), currentPoints);
					break;
			};
		}
		return "";
	},
	getPointClaim: function(profile, current){
		var pointstatus = 0;

		if (profile) {
			var currentPoints = profile.currentPoints;

			if(currentPoints > 0){
				if (currentPoints > (profile.maxPoints/2)){
					pointstatus = 1;
				}
			};
			switch(pointstatus){
				case 1:
					return this.__(i18n.app.POINTCLAIM_TEXT_0_1, (current ? i18n.app.YOU_ARE : i18n.app.HE_IS), currentPoints);
					break;
				default:
					return this.__(i18n.app.POINTCLAIM_TEXT_0_0, (current ? i18n.app.YOU_ARE_STILL : i18n.app.HE_IS_STILL), currentPoints);
					break;
			};
		}
		return "";
	},
	getBeerColorImage: function(values){
		 switch(parseInt(values.beerstyle)){
			case 0:
				return 'resources/img/default/beer_color_1.png';
				break;
			case 1:
				return 'resources/img/default/beer_color_0.png';
				break;
			case 2:
				return 'resources/img/default/beer_color_0.png';
				break;
			case 3:
				return 'resources/img/default/beer_color_1.png';
				break;
			case 4:
				return 'resources/img/default/beer_color_3.png';
				break;
			case 5:
				return 'resources/img/default/beer_color_2.png';
				break;
			case 6:
				return 'resources/img/default/beer_color_0.png';
				break;
			case 7:
				return 'resources/img/default/beer_color_3.png';
				break;
			case 8:
				return 'resources/img/default/beer_color_1.png';
				break;
			case 9:
				return 'resources/img/default/beer_color_1.png';
				break;
			case 10:
				return 'resources/img/default/beer_color_3.png';
				break;
			case 11:
				return 'resources/img/default/beer_color_0.png';
				break;
			default:
				return 'resources/img/default/blank_beer32.png';
				break;
		}
	},
	getActivityString: function(values){
		switch(values.type){
			case 0:
				return this.__(i18n.app.ACTIVITY_TEXT_0_1, this.getUserDisplayName(values.idUser,values.displayName), values.friendName);
				break;
			case 1:
				return this.__(i18n.app.ACTIVITY_TEXT_2_1, this.getUserDisplayName(values.idUser,values.displayName), values.friendname);
				break;
			case 2:
				return this.__(i18n.app.ACTIVITY_TEXT_1_1, this.getUserDisplayName(values.idUser,values.displayName), values.beerName, values.placeName, this.getRate(values.rate));
				break;
			case 3:
				var badgename=utils.getBadgeName(values.idBadge);
				return this.__(i18n.app.ACTIVITY_TEXT_3_1, this.getUserDisplayName(values.idUser,values.displayName), (badgename?badgename:values.badgeName));
				break;
			default:
				return this.__(i18n.app.ACTIVITY_TEXT_0_0, this.getUserDisplayName(values.idUser,values.displayName), values.friendname);
				break;
		}
	},
    getNotificationCount: function() {
        var store = Ext.getStore("Notifications_Ajax"),nread = 0;
        
        if (store.getCount() > 0) {
            var records = store.queryBy(function(record) {
                    return record.get('status') === 1;
                                        });
            nread = records.getCount();
        }
        return nread;
    },
	getNotificationString: function(values){
		switch(values.type){
			case 0:
				return this.__(i18n.app.NOTIFICATION_TEXT_0_1,this.getUserDisplayName(values.idFriend,values.friendName));
				break;
			case 1:
				return this.__(i18n.app.NOTIFICATION_TEXT_1_1,this.getUserDisplayName(values.idFriend,values.friendName));
				break;
			case 2:
				switch(values.subType){
					case 0:
						return this.__(i18n.app.NOTIFICATION_TEXT_2_0,this.getUserDisplayName(values.idFriend,values.friendName),this.getUserDisplayName(values.idFriendConfirm,values.friendNameConfirm));
						break;
					case 1:
						return this.__(i18n.app.NOTIFICATION_TEXT_2_1,this.getUserDisplayName(values.idFriend,values.friendName),values.beerName);
						break;
					case 2:
						return this.__(i18n.app.NOTIFICATION_TEXT_2_2, this.getUserDisplayName(values.idFriend,values.friendName),values.beerName,values.placeName);
						break;
					case 3:
						return this.__(i18n.app.NOTIFICATION_TEXT_2_3,this.getUserDisplayName(values.idFriend,values.friendName),this.getBadgeName(values.idBadge));
						break;
					default:
						return this.__(i18n.app.NOTIFICATION_TEXT_0_0, this.getUserDisplayName(values.idFriend,values.friendName));
						break;
				}
				break;
			case 3:
				return this.__(i18n.app.NOTIFICATION_TEXT_3_1, values.beerName, values.targetName);
				break;
			default:
				return this.__(i18n.app.NOTIFICATION_TEXT_0_0, this.getUserDisplayName(values.idFriend,values.friendName));
				break;
		}
	},
	getDisplayName: function(json){
		if (json.displayName){
			return json.displayName;
		} else if(json.firstName && json.lastName){
			return json.firstName + " " + ((json.lastName).charAt(0)).toUpperCase() + ".";
		}else if(json.firstName){
			return json.firstName;
		} else {
			return json.username;
		}
	},
	getHumanDate: function(date){
		var seconds = Math.floor(((new Date().getTime()/1000) - date.getTime()/1000)),
		interval = Math.floor(seconds / 31536000);
		if (interval > 1) return interval + "y";
		interval = Math.floor(seconds / 2592000);
		if (interval > 1) return interval + "m";
		interval = Math.floor(seconds / 86400);
		if (interval >= 1) return interval + "d";
		interval = Math.floor(seconds / 3600);
		if (interval >= 1) return interval + "h";
		interval = Math.floor(seconds / 60);
		if (interval > 1) return interval + "m ";
		return Math.floor(seconds) + "s";
	},
	getReverseGeo: function(lat, lon, what){
		var locationString = "";
		var geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.LatLng(lat, lon);
		if(geocoder){
			geocoder.geocode({"latLng": latlng}, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK ) {
					if(typeof( what ) != "undefined"){
						what.setHtml(results[0].formatted_address);
					}
				}
			});
		}
	},
	getCountryFromCode: function(value){
		return (_.find(i18n.countries, function(state){ return state.value === value.toUpperCase();})||"").text;
	},
	getCodeFromCountry: function(text){
		return (_.find(i18n.countries, function(state){ return state.text.toUpperCase() === text.toUpperCase();})||"").value;
	},
	getBeerStyleFromCode: function(value) {
		return (_.find(i18n.beerstyles, function(style){ return style.value === value;})||"").text;
	},
	getBeerCodeFromStyle: function(text) {
		return (_.find(i18n.beerstyles, function(code){ return code.text.toUpperCase() === text.toUpperCase();})||"").value;
	},
	getBeerTypeFromCode: function(value) {
		return (_.find(i18n.beertypes, function(type){ return type.value === value;})||"").text;
	},
	getBeerCodeFromType: function(text) {
		return (_.find(i18n.beertypes, function(code){ return code.text.toUpperCase() === text.toUpperCase();})||"").value;
	},
	getLocationCategoryFromCode: function(value) {
		return (_.find(i18n.locationCategory, function(type){ return type.value === value;})||"").text;
	},
	getCodeFromLocationCategory: function(text) {
		return (_.find(i18n.locationCategory, function(code){ return code.text.toUpperCase() === text.toUpperCase();})||"").value;
	},
	getBadgeName: function(value){
		return (_.find(i18n.badgenames, function(code){ return code.value == value;})||"").text;
	},
	getBadgeMessage: function(value){
		return (_.find(i18n.badgealert, function(code){ return code.value == value;})||"").text;
	},
	getErrorMessage: function(value){
		return (_.find(i18n.msgerror, function(code){ return code.value == value;})||"").text;
	},
	getBadgeImage: function(imageUrl){
		if (_.isEmpty(imageUrl)) {
			return HH.default_badge64;
		}else{
			return imageUrl.replace(/\s/g,'_');
		}
	},
	
	alert: function(message, title, confirm, callback, scope, yesOrNotButtons) {
		if (navigator && navigator.notification) {
			title = (title ? title : "");
			if (confirm) {
				// In questo caso nella callback viene passato l'indice +1 del bottone selezionato
				navigator.notification.confirm(message, callback, title, (yesOrNotButtons ? i18n.app.BTN_NO : i18n.app.BTN_CANCEL) + ',' + (yesOrNotButtons ? i18n.app.BTN_YES : i18n.app.BTN_OK));
			} else {
				navigator.notification.alert(message, null, title, i18n.app.BTN_OK);
			}
		} else {
			if (confirm) {
				// In questo caso nella callback viene passato il testo del bottone premuto
				Ext.Msg.confirm(title, message, callback, scope);
			} else{
				Ext.Msg.alert(title, message);
			}
		}
	}
}


Ext.Loader.setConfig({enabled:true});
Ext.Loader.setPath('Ext.ux', './app/components');
Ext.Loader.setPath('Ext', './sdk/src');

Ext.application({
	name: 'B2B',

	models: [ 'User', 'Friend', 'Beer', 'Drink', 'Activity', 'Notification', 'Place', 'BeerSingle', 'Feedback', 'Badge', 'FavoriteBeer', 'Friend_Facebook' ],

	controllers: [
		'_App_Container', '_Login', 'Friend_Detail',
		'Friends', 'Activities', 'Profiles', 'Beers', 'Drinks', 'Notifications',
		'Settings', 'Places', 'Place_Detail', 'Feedbacks', 'Camera', 'Badges',
		'Favorites', 'DrinkIn','Synco'
	],

	stores: [
		'Activities_Ajax', 'Beers_Ajax', 'Friends_Ajax', 'Profile_Ajax', 'Notifications_Ajax', 'Places_Ajax', 'Drinks_Ajax', 'Activities_User_Ajax',
		 'Profile_Local',
		'Badges_Ajax','Friends_Facebook_Local','Min_Friends_Facebook_Local', 'Visualized_Friends_Facebook_Local', 'Friends_sortedPoint_Local',
		'DrinkInCheckIn_Ajax','Beers_Place_Ajax',
		'FavoriteBeers_Local',
		'Drinks_Custom_Ajax' , 'Friends_Custom_Ajax','Badges_Custom_Ajax'
		//'Badges_New', 'Feedback_Ajax', 'Activities_Local', 'Friends_Local', 'Notifications_Local', 'Drinks_Local','Activities_User_Local',
	],

	views: [
		'_App', '_Login', '_App_Slider', '_App_Container',
		'_SplashBeerSearch', '_Register',
		'Activity', 'Activity_List', 'Activity_List_Detail',
		'Beer', 'Beer_List', 'Beer_Search', 'Beer_Add_Form', 'Beer_Detail',
		'Component_Search', 'Beer_Component_List',
		'Place',
		'DrinkIn_List', 'DrinkIn_Detail', 'Drink_List_Custom_Container',
		'Place_List', 'Place_Detail',
		'Favorites_Beer_List', 'Favorites_Beer',
		'Feedback_Form', 'Feedback_List',
		'Friend_Finder','Friend_Invite_List','Friend_Invite_Panel','Friend_Invite_Search','Friend_Paging_Invite_Search',
		'Friend', 'Friend_List', 'Friend_Search', 'Friend_List_Detail','DrinkIn_Friend_Panel',
		'Notification', 'Notification_List',
		'User', 'User_Form',
		'Settings',
		'View_Terms', 'View_Whatsnew', 'View_AboutUs','Privacy_Informativa',
		'Component_IOSToggle', 'Component_NotificationBar',
		'Camera_Container', 'Camera_Picker',
		'Badge_List', 'Badge_List_Container', 'Badge_Detail',
		'Place_Beer_List', 'Place_Beer_Search',
		'View_BottleSpinner','Drink_List_Container','History_Panel',
		'Friend_Custom','Friend_List_Custom', 'Friend_Detail_Container','Badge_Custom_List'
		//'Landing_DrinkIn', 'Feedback_Container'
		],

	icon: {
		'57': 'resources/icons/Icon.png',
		'72': 'resources/icons/Icon~ipad.png',
		'114': 'resources/icons/Icon@2x.png',
		'144': 'resources/icons/Icon~ipad@2x.png'
	},

	isIconPrecomposed: true,

	startupImage: {
		'320x460': 'resources/startup/320x460.png',
		'640x920': 'resources/startup/640x920.png',
		'768x1004': 'resources/startup/768x1004.png',
		'748x1024': 'resources/startup/748x1024.png',
		'1536x2008': 'resources/startup/1536x2008.png',
		'1496x2048': 'resources/startup/1496x2048.png'
	},

	launch: function() {
		Ext.Loader.setConfig({disableCaching:true});
		Ext.Ajax.setDisableCaching(false);
		Ext.Viewport.setMasked({
            xtype: 'loadmask',
            loadingText: i18n.app.HINT_LOADING
        });

		Ext.Viewport.fireEvent("startApp", this);
	},
	onUpdated: function() {
		if(window.confirm(i18n.app.HINT_APPLICATIONRELOADED)){
			window.location.reload();
		}
	}
});


Ext.define("B2B.store.Activities_Local", {
    extend: "Ext.data.Store",
    id: "Activities_Local",
    requires: "Ext.data.proxy.LocalStorage",
    config: {
        model: "B2B.model.Activity",
        proxy: {
            type:'localstorage',
        },
        listeners:{
            exception:function(proxy, response, orientation){
                console.error('Failure Notification', response.responseText);
                utils.alert('Loading failed', response.statusText);
            },
            callback: function(success,response){
                console.log("Activities Store Callback");
            },
            load:function(el,records, successful){
               HH.log("* Loaded: Store.Activity_Local");
               Ext.Viewport.fireEvent("refreshActivities", this);
            }
        }
    }

});


Ext.define("B2B.store.Visualized_Friends_Facebook_Local", {
	extend: "Ext.data.Store",
	id: "Visualized_Friends_Facebook_Local",
	requires: "Ext.data.proxy.LocalStorage",
	config: {
           autoload: true,
           buffered: true,
		model: "B2B.model.Friend_Facebook",
		sorters: 'displayName',
		grouper: function(record){
			return (record.get('displayName')[0]).toUpperCase();
		},
		proxy: {
			type:'localstorage'
		},
		listeners:{
			load: function(source, records, successful, operation, eOpt) {
				if (successful) {
					HH.log("* [Store]Visualized_Friends_Facebook_Local: Loading completed.");
				} else {
					HH.log("* [Store]Visualized_Friends_Facebook_Local: Loading store fail.");
				}
			}
		}
	}
});

Ext.define("B2B.store.DrinkInCheckIn_Ajax", {
	extend: "Ext.data.Store",
	requires: "Ext.data.proxy.JsonP",
	id: "DrinkInCheckIn_Ajax",
	config: {
		model: "B2B.model.Drink",
		proxy: {
			// Mock for Development
			type:'ajax',
			url:'json/mock_drinkincheckinlist.json',
			// type: (HH.OFFLINE_MODE ? 'ajax' : 'jsonp'),
			// url: (HH.OFFLINE_MODE ? 'json/mock_drinkincheckinlist.json' : HH.IP_PORT_SERVER + '/birrettaservice/rest/bserv/listBeer_jsonp'),
			reader: {
				type:'json',
				rootProperty: 'response.body.list',
				successProperty: 'response.status.success',
				totalProperty: 'response.status.count',
				messageProperty: 'response.status.msg'
			}
		},
		//autoLoad: true,
		listeners: {
			load: function(source, records, successful, operation, eOpt) {
				if (!successful) {
					HH.log("* [Store] DrinkInCheckIn_Ajax: Loading store fail.");
				}
			}
		}
	}
});


Ext.define("B2B.store.Beers_Place_Ajax", {
	extend: "Ext.data.Store",
	requires: "Ext.data.proxy.JsonP",
	id: "Beers_Place_Ajax",
	config: {
		model: "B2B.model.Beer",
		proxy: {
			type: (HH.OFFLINE_MODE ? 'ajax' : 'jsonp'),
			url: (HH.OFFLINE_MODE ? 'json/mock_beerlist.json' : HH.IP_PORT_SERVER + '/birrettaservice/rest/bserv/listBeerByPlace_jsonp'),
			reader: {
				type:'json',
				rootProperty: 'response.body.list',
				successProperty: 'response.status.success',
				totalProperty: 'response.status.count',
				messageProperty: 'response.status.msg'
			}
		},
		listeners: {
			load: function(source, records, successful, operation, eOpt) {
				if (!successful) {
					HH.log("* [Store] Beers_Place_Ajax: Loading store fail.");
				}
			}
		}
	}
});

Ext.define("B2B.store.Places_Ajax", {
	extend: "Ext.data.Store",
	id: "Places_Ajax",
	config: {
		model: "B2B.model.Place",
		proxy: {
			type: (HH.OFFLINE_MODE ? 'ajax' : 'jsonp'),
			url: (HH.OFFLINE_MODE ? 'json/mock_placelist.json' : HH.IP_PORT_SERVER + '/birrettaservice/rest/bserv/findLocNear_jsonp'),
			reader: {
				type:'json',
				rootProperty: 'response.body.list',
				successProperty: 'response.status.success',
				totalProperty: 'response.status.count',
				messageProperty: 'response.status.msg'
			}
		},
		buffered: true,
		listeners:{
			load: function(source, records, successful, operation, eOpt) {
				if (successful) {
                var mapplace = Ext.getCmp("mapplace");
					HH.log("* [Store] Places_Ajax: Loading completed.");
           
                    if(mapplace && mapplace.getMap()){
                        var map = mapplace.getMap();
                        if (map.clearMarkers) map.clearMarkers();
                        map.markers.push(new google.maps.Marker({
                                                   position: new google.maps.LatLng(mapplace.getGeo().getLatitude(), mapplace.getGeo().getLongitude()),
                                                   map: map,
                                                   icon: HH.map.currentMarker
                                                   }));
                        _.each(records,function(record){
                                map.markers.push(new google.maps.Marker({
                                                          position: new google.maps.LatLng(record.data.lat, record.data.lng),
                                                          map: map,
                                                          icon: HH.map.marker
                                                          }));
                        });
         
                            
                        
                    }
           
				} else {
					HH.log("* [Store] Places_Ajax: Loading store fail.");
				}
			}
		}
	}
});


Ext.define("B2B.store.Activities_User_Local", {
    extend: "Ext.data.Store",
    id: "Activities_User_Local",
    requires: "Ext.data.proxy.LocalStorage",
    config: {
        model: "B2B.model.Activity",
        proxy: {
            type:'localstorage',
        },
        listeners:{
            exception:function(proxy, response, orientation){
                console.error('Failure Notification', response.responseText);
                utils.alert('Loading failed', response.statusText);
            },
            callback: function(success,response){
                console.log("Activities User Local Store Callback");
            },
            load:function(el,records, successful){
               HH.log("* Loaded: Store.Activity_User_Local");
               Ext.Viewport.fireEvent("refreshStore", this, "Activities_User_Ajax");
            }
        }
    }

});

Ext.define("B2B.store.Activities_User_Ajax", {
	extend: "Ext.data.Store",
	id: "Activities_User_Ajax",
	config: {
		model: "B2B.model.Activity",
		proxy: {
			type: (HH.OFFLINE_MODE ? 'ajax' : 'jsonp'),
			url: (HH.OFFLINE_MODE ? 'json/mock_activityuser.json' : HH.IP_PORT_SERVER + '/birrettaservice/rest/bserv/listMyActivity_jsonp'),
			reader: {
				type:'json',
				rootProperty: 'response.body.list',
				successProperty: 'response.status.success',
				totalProperty: 'response.status.count',
				messageProperty: 'response.status.msg'
			}
		},
		listeners:{
			load:function(el,records, successful) {
				if (successful) {
					HH.log("* [Store] Activities_User_Ajax: Loading completed.");
				} else {
					HH.log("* [Store] Activities_User_Ajax: Loading store fail.");
				}
			}
		}
	}
});


Ext.define("B2B.store.Badges_New", {
	extend: "Ext.data.Store",
	id: "Badges_New",
	requires: "Ext.data.proxy.LocalStorage",
	config: {
		model: "B2B.model.Badge",
		 proxy: {
            type:'localstorage',
        },
		listeners:{
			exception:function(proxy, response, orientation){
				console.error('Failure Badge', response.responseText);
				utils.alert('Loading failed', response.statusText);
			},
			callback: function(success,response){
				HH.log("Badges Store Callback");
			},
			load:function(el,records, successful){
				HH.log("* Loaded: Store.Badges_Local");
			}
		}
	}
});

Ext.define("B2B.store.Feedback_Ajax", {
	extend: "Ext.data.Store",
	id: "Feedback_Ajax",
	config: {
		model: "B2B.model.Feedback",
		proxy: {
			// Mock for Development
			type:'ajax',
			url:'json/mock_feedbacklist.json',
			// type: (HH.OFFLINE_MODE ? 'ajax' : 'jsonp'),
            // url: (HH.OFFLINE_MODE ? 'json/mock_feedbacklist.json' : HH.IP_PORT_SERVER + '/birrettaservice/rest/bserv/listBeer_jsonp'),
			reader: {
				type:'json',
				rootProperty: 'response.body.list',
				successProperty: 'response.status.success',
				totalProperty: 'response.status.count',
				messageProperty: 'response.status.msg'
			},
			extraParams:{
                target:''
            }
		},
		//autoLoad: true,
		autosync: true,
		listeners:{
			exception:function(proxy, response, orientation){
				console.error('Failure Notification', response.responseText);
				utils.alert('Loading failed', response.statusText);
			},
			callback: function(success,response){
				console.log("Feedback Store Callback");
			},
			load:function(el,records, successful){
				HH.log("* Loaded: Store.Feedback_Ajax");

			}
		}
	}

});


Ext.define("B2B.store.Badges_Ajax", {
	extend: "Ext.data.Store",
	id: "Badges_Ajax",
	config: {
		model: "B2B.model.Badge",
		proxy: {
			type: (HH.OFFLINE_MODE ? 'ajax' : 'jsonp'),
            url: (HH.OFFLINE_MODE ? 'json/mock_badgelist.json' : HH.IP_PORT_SERVER+'/birrettaservice/rest/bserv/findBadgesUser_jsonp'),
			reader: {
				type:'json',
				rootProperty: 'response.body.list',
				successProperty: 'response.status.success',
				totalProperty: 'response.status.count',
				messageProperty: 'response.status.msg'
			}
		},
		listeners:{
			load:function(el,records, successful) {
				if (!successful) {
					HH.log("* [Store] Badges_Ajax: Loading store fail.");
				}
			}
		}
	}
});


Ext.define("B2B.store.Drinks_Ajax", {
	extend: "Ext.data.Store",
	requires: "Ext.data.proxy.JsonP",
	id: "Drinks_Ajax",
	config: {
		model: "B2B.model.Drink",
		proxy: {
			type: (HH.OFFLINE_MODE ? 'ajax' : 'jsonp'),
			url: (HH.OFFLINE_MODE ? 'json/mock_drinklist.json' : HH.IP_PORT_SERVER + '/birrettaservice/rest/bserv/listDrink_jsonp'),
			reader: {
				type:'json',
				rootProperty: 'response.body.list',
				successProperty: 'response.status.success',
			//	totalProperty: 'response.status.count',
				messageProperty: 'response.status.msg'
			}
		},
		listeners: {
			load: function(source, records, successful, operation, eOpt) {
				if (!successful) {
					HH.log("* [Store] Drinks_Ajax: Loading store fail.");
				}
			}
		}
	}
});


Ext.define("B2B.store.Friends_sortedPoint_Local", {
	extend: "Ext.data.Store",
	id: "Friends_sortedPoint_Local",
	requires: "Ext.data.proxy.LocalStorage",
	config: {
		autoload: true,
		autosync: true,
		model: "B2B.model.Friend",
		sorters:  {
			property : 'currentPoints',
			direction: 'DESC'
		},
		proxy: {
			type:'localstorage'
		},
		listeners:{
			load: function(source, records, successful, operation, eOpt) {
				if (successful) {
					HH.log("* [Store] Friends_sortedPoint_Local: Loading completed.");
				} else {
					HH.log("* [Store] Friends_sortedPoint_Local: Loading store fail.");
				}
			}
		}
	}
});

Ext.define("B2B.store.Profile_Local", {
	extend: "Ext.data.Store",
	id:"Profile_Local",
	requires: "Ext.data.proxy.LocalStorage",
	config: {
		model: "B2B.model.User",
		proxy: {
			type:'localstorage'
		},
		listeners: {
			load: function(source, records, successful, operation, eOpt) {
				if (!successful) {
					HH.log("* [Store] Profile_Local: Loading store fail.");
				}
			}
		}
	}
});


Ext.define("B2B.store.Drinks_Custom_Ajax", {
	extend: "Ext.data.Store",
	requires: "Ext.data.proxy.JsonP",
	id: "Drinks_Ajax",
	config: {
		model: "B2B.model.Drink",
		proxy: {
			type: (HH.OFFLINE_MODE ? 'ajax' : 'jsonp'),
			url: (HH.OFFLINE_MODE ? 'json/mock_drinklist.json' : HH.IP_PORT_SERVER + '/birrettaservice/rest/bserv/listDrink_jsonp'),
			reader: {
				type:'json',
				rootProperty: 'response.body.list',
				successProperty: 'response.status.success',
			//	totalProperty: 'response.status.count',
				messageProperty: 'response.status.msg'
			}
		},
		listeners: {
			load: function(source, records, successful, operation, eOpt) {
				if (!successful) {
					HH.log("* [Store] Drinks_Custom_Ajax: Loading store fail.");
				}
			}
		}
	}
});

Ext.define("B2B.store.Notifications_Local", {
    extend: "Ext.data.Store",
    id: "Notifications_Local",
    config: {
        model: "B2B.model.Notification",
        proxy: {
            type:'localstorage'
        },
        autoload: true,
        autosync: true,
        listeners:{
            exception:function(proxy, response, orientation){
                console.error('Failure Notification', response.responseText);
                utils.alert('Loading failed', response.statusText);
            },
            callback: function(success,response){
                HH.log("Friends Store Callback");
            },
            load:function(el,records, successful){
              HH.log("* Loaded: Store.Notification_Local");
            }
        }
    }

});


Ext.define("B2B.store.Activities_Ajax", {
	extend: "Ext.data.Store",
	id: "Activities_Ajax",
	config: {
		model: "B2B.model.Activity",
		proxy: {
			type: (HH.OFFLINE_MODE ? 'ajax' : 'jsonp'),
			url: (HH.OFFLINE_MODE ? 'json/mock_activitylist.json' : HH.IP_PORT_SERVER + '/birrettaservice/rest/bserv/listFriendActivity_jsonp'),
			reader: {
				type:'json',
				rootProperty: 'response.body.list',
				successProperty: 'response.status.success',
				totalProperty: 'response.status.count',
				messageProperty: 'response.status.msg'
			}
		},
		listeners: {
			load: function(source, records, successful, operation, eOpt) {
				if (!successful) {
					HH.log("* [Store] Activities_Ajax: Loading store fail.");
				}
			}
		}
	}
});


Ext.define("B2B.store.Friends_Facebook_Local", {
	extend: "Ext.data.Store",
	id: "Friends_Facebook_Local",
	requires: "Ext.data.proxy.LocalStorage",
	config: {
		autoload: true,
		autosync: true,
		buffered: true,
		model: "B2B.model.Friend_Facebook",
		sorters: 'displayName',
		grouper: function(record){
			return (record.get('displayName')[0]).toUpperCase();
		},
		proxy: {
			type:'localstorage'
		},
		listeners:{
			load: function(source, records, successful, operation, eOpt) {
				if (successful) {
					HH.log("* [Store] Friends_Facebook_Local: Loading completed.");
				} else {
					HH.log("* [Store] Friends_Facebook_Local: Loading store fail.");
				}
			}
		}
	}
});

Ext.define("B2B.store.Friends_Ajax", {
	extend: "Ext.data.Store",
	id: "Friends_Ajax",
	config: {
		model: "B2B.model.Friend",
		sorters: 'displayName',
		proxy: {
			type: (HH.OFFLINE_MODE ? 'ajax' : 'jsonp'),
			url: (HH.OFFLINE_MODE ? 'json/mock_friendlist.json' : HH.IP_PORT_SERVER + '/birrettaservice/rest/bserv/listFriend_jsonp'),
			reader: {
				type:'json',
				rootProperty: 'response.body.list',
				successProperty: 'response.status.success',
				totalProperty: 'response.status.count',
				messageProperty: 'response.status.msg'
			}
		},
		listeners:{
			load: function(source, records, successful, operation, eOpt) {
				if (successful) {
					HH.log("* [Store] Friends_Ajax: Loading completed.");
				} else {
					HH.log("* [Store] Friends_Ajax: Loading store fail.");
				}

				HH.log("* [Store] Friends_Ajax: copy to Friends_sortedPoint_Local.");

				var storePointLocal = Ext.getStore('Friends_sortedPoint_Local');

				storePointLocal.removeAll();
				storePointLocal.getProxy().clear();
				this.each(function(record) {
					 storePointLocal.add(record.data);
				});
				storePointLocal.sync();
			}
		}
	}
});


Ext.define("B2B.store.Badges_Custom_Ajax", {
	extend: "Ext.data.Store",
	id: "Badges_Ajax",
	config: {
		model: "B2B.model.Badge",
		proxy: {
			type: (HH.OFFLINE_MODE ? 'ajax' : 'jsonp'),
            url: (HH.OFFLINE_MODE ? 'json/mock_badgelist.json' : HH.IP_PORT_SERVER+'/birrettaservice/rest/bserv/findBadgesUser_jsonp'),
			reader: {
				type:'json',
				rootProperty: 'response.body.list',
				successProperty: 'response.status.success',
				totalProperty: 'response.status.count',
				messageProperty: 'response.status.msg'
			}
		},
		listeners:{
			load:function(el,records, successful) {
				if (!successful) {
					HH.log("* [Store] Badges_Custom_Ajax: Loading store fail.");
				}
			}
		}
	}
});

Ext.define("B2B.store.Beers_Ajax", {
	extend: "Ext.data.Store",
	requires: "Ext.data.proxy.JsonP",
	id: "Beers_Ajax",
	config: {
		model: "B2B.model.Beer",
		proxy: {
			// Mock for Development
			type:'ajax',
			url:'json/mock_beerlist.json',
			// type: (HH.OFFLINE_MODE ? 'ajax' : 'jsonp'),
			// url: (HH.OFFLINE_MODE ? 'json/mock_beerlist.json' : HH.IP_PORT_SERVER + '/birrettaservice/rest/bserv/listBeer_jsonp'),
			reader: {
				type:'json',
				rootProperty: 'response.body.list',
				successProperty: 'response.status.success',
				totalProperty: 'response.status.count',
				messageProperty: 'response.status.msg'
			}
		},
		autoLoad: true,
		buffered: true,
		listeners: {
			load:function(el,records, successful) {
				if (!successful) {
					HH.log("* [Store] Beers_Ajax: Loading store fail.");
				}
			var user = Ext.getStore("Profile_Local").first().data;
			var storeLocal = Ext.getStore('Beers_Ajax')
				//occorre aggiungere le NEW_BEERS
			Ext.Ajax.request({
				url: HH.IP_PORT_SERVER+"/birrettaservice/rest/bserv/listBeer",
				method: "GET",
			//	type: "jsonp",
				headers: {
					"btUsername": user.idUser,
					"btSid" : user.token
				},
				params: {
						details: "new_beer"
				},
				failure: function(response) {
					console.error("impossibile reperire new_beer - SERVER ERROR")
				},
				success: function(response) {
					var dec = Ext.decode(response.responseText);
					if (dec.response.status.code < 200) {
						var list = dec.response.body.list;
						var i=0;
						for(i=0;i<list.length;i++){
							storeLocal.add(list[i]);
						}
					}
					else{
							console.error("impossibile reperire new_beer - BUSINESS ERROR")
						}
					}
				});
			}
		}
	}
});


Ext.define("B2B.store.FavoriteBeers_Local", {
	extend: "Ext.data.Store",
	id:"FavoriteBeers_Local",
	requires: "Ext.data.proxy.LocalStorage",
	config: {
		autoLoad: true,
		autoSync: true,
		model: "B2B.model.Beer",
		proxy:{
			type:'localstorage'
		},
		listeners: {
			load: function(source, records, successful, operation, eOpt) {
				if (successful) {
					HH.log("* [Store] FavoriteBeers_Local: Loading completed.");
				} else {
					HH.log("* [Store] FavoriteBeers_Local: Loading store fail.");
				}
			}
		}
	}
});


Ext.define("B2B.store.Min_Friends_Facebook_Local", {
	extend: "Ext.data.Store",
	id: "Min_Friends_Facebook_Local",
	requires: "Ext.data.proxy.LocalStorage",
	config: {
           autoload: true,
           buffered: true,

		model: "B2B.model.Friend_Facebook",
		sorters: 'displayName',
		grouper: function(record){
			return (record.get('displayName')[0]).toUpperCase();
		},
		proxy: {
			type:'localstorage'
		},
		listeners:{
			load: function(source, records, successful, operation, eOpt) {
				if (successful) {
					HH.log("* [Store] Min_Friends_Facebook_Local: Loading completed.");
				} else {
					HH.log("* [Store] Min_Friends_Facebook_Local: Loading store fail.");
				}
			}
		}
	}
});

Ext.define("B2B.store.Friends_Local", {
    extend: "Ext.data.Store",
    id: "Friends_Local",
    requires: "Ext.data.proxy.LocalStorage",
    config: {
        autoload: true,
        autosync: true,
        model: "B2B.model.Friend",
        sorters: 'displayName',
        grouper: function(record){
            return (record.get('displayName')[0]).toUpperCase();
        },
        proxy: {
            type:'localstorage'
        },
        listeners:{
            exception:function(proxy, response, orientation){
                console.error('Failure Notification', response.responseText);
                utils.alert('Loading failed', response.statusText);
            },
            callback: function(success,response){
                console.log("Friends Store Callback");
            },
            load:function(el,records, successful){
               HH.log("* Loaded: Store.Friend_Local");
               
            }
        }
    }

});


Ext.define("B2B.store.Notifications_Ajax", {
	extend: "Ext.data.Store",
	id: "Notifications_Ajax",
	requires: "Ext.data.proxy.LocalStorage",
	config: {
		model: "B2B.model.Notification",
	/*	sorters:  {
			property : 'insertedOn',
			direction: 'DESC'
		},*/
		proxy: {
			type: (HH.OFFLINE_MODE ? 'ajax' : 'jsonp'),
			url: (HH.OFFLINE_MODE ? 'json/mock_notificationlist.json' : HH.IP_PORT_SERVER + '/birrettaservice/rest/bserv/listNotification_jsonp'),
			reader: {
				type:'json',
				rootProperty: 'response.body.list',
				successProperty: 'response.status.success',
				totalProperty: 'response.status.count',
				messageProperty: 'response.status.msg'
			}
		},
		listeners:{
			load: function(source, records, successful, operation, eOpt) {
				if (!successful) {
					HH.log("* [Store] Notifications_Ajax: Loading store fail.");
				}
			}
		}
	}
});


Ext.define("B2B.store.Friends_Custom_Ajax", {
	extend: "Ext.data.Store",
	id: "Friends_Ajax",
	config: {
		model: "B2B.model.Friend",
		sorters: 'displayName',
		proxy: {
			type: (HH.OFFLINE_MODE ? 'ajax' : 'jsonp'),
			url: (HH.OFFLINE_MODE ? 'json/mock_friendlist.json' : HH.IP_PORT_SERVER + '/birrettaservice/rest/bserv/listFriend_jsonp'),
			reader: {
				type:'json',
				rootProperty: 'response.body.list',
				successProperty: 'response.status.success',
				totalProperty: 'response.status.count',
				messageProperty: 'response.status.msg'
			}
		},
		listeners:{
			load: function(source, records, successful, operation, eOpt) {
				if (successful) {
					HH.log("* [Store] Friends_Custom_Ajax: Loading completed.");
				} else {
					HH.log("* [Store] Friends_Custom_Ajax: Loading store fail.");
				}
			}
		}
	}
});

Ext.define("B2B.store.Profile_Ajax", {
	extend: "Ext.data.Store",
	id:"Profile_Ajax",
	config: {
		model: "B2B.model.User",
		proxy:{
			type: (HH.OFFLINE_MODE ? 'ajax' : 'jsonp'),
			url: (HH.OFFLINE_MODE ? 'json/mock_user.json' : HH.IP_PORT_SERVER + '/birrettaservice/rest/bserv/detailsUserByUsername_jsonp'),
			reader:{
				type:'json',
				rootProperty: 'response.body.list',
				successProperty: 'response.status.success',
				totalProperty: 'response.status.count',
				messageProperty: 'response.status.msg'
			}
		},
		autoload: false,
		listeners: {
			load: function(source, records, successful, operation, eOpt) {
				if (successful) {
					HH.log("* [Store] Profile_Ajax: Loading completed.");
					HH.log("* [Store] Profile_Ajax: copying to Local");

					var storeLocal = Ext.getStore('Profile_Local'), token = "", localJSON = null;

					if (storeLocal && storeLocal.getCount() > 0) {
						localJSON  = storeLocal.first().data;
						token = localJSON.token;
					}

					/* We copy from memory to localstorage */
					storeLocal.removeAll();
					storeLocal.getProxy().clear();
					this.each(function(record) {
						storeLocal.add(record.data);
					});

					if (storeLocal.getCount() > 0) {
						storeLocal.first().set("token", token);
					}

					this.removeAll();
					storeLocal.sync();
				} else {
					HH.log("* [Store] Profile_Ajax: Loading store fail.");
					this.removeAll();
				}
			}
		}
	},
});


Ext.define("B2B.store.Drinks_Local", {
    extend: "Ext.data.Store",
    id: "Drinks_Local",
    requires: "Ext.data.proxy.LocalStorage",
    config: {
        autoload: true,
        autosync: true,
        model: "B2B.model.Drink",
        proxy: {
            type:'localstorage',
        },
        listeners:{
            exception:function(proxy, response, orientation){
                console.error('Failure Notification', response.responseText);
                utils.alert('Loading failed', response.statusText);
            },
            callback: function(success,response){
                HH.log("Beers Store Callback");
            },
            load:function(el,records, successful){

            }
        }
    }

});


Ext.define("B2B.model.Login", {
	extend: "Ext.data.Model",
	requires:'Ext.data.identifier.Uuid',
	config: {
		identifier:'uuid',
		fields: [
			{ name: 'username', type: 'string' },
			{ name: 'password', type: 'string' },
			{ name: 'dateRequest', type: 'date', dateformat: 'c' }
		],
		validations: [
			{ type: 'presence', field: 'username'},
			{ type: 'presence', field: 'password'},
			{ type: 'length', field: 'username', min:3},
			{ type: 'length', field: 'password', min: 3},
		]
	}
});

Ext.define("B2B.model.Badge", {
	extend: "Ext.data.Model",
	requires:'Ext.data.identifier.Uuid',
	config: {
		identifier:'uuid',
		fields: [
			{ name: 'idBadge', type: 'int' },
			{ name: 'name', type: 'string' },
			{ name: 'cod', type: 'int' },
			{ name: 'category', type: 'int' },
			{ name: 'image', type: 'string' },
			//TO DO
			{ name: 'active', type: 'boolean' },
			{ name: 'description', type: 'string' }
		],
		validations: [
			{ type: 'presence', field: 'idBadge'}
		]
	}
});

Ext.define("B2B.model.Friend", {
	extend: "Ext.data.Model",
	requires:'Ext.data.identifier.Uuid',
	config: {
		//idProperty: 'idUser',
		identifier:'uuid',
		fields: [
			{ name: 'idUser', type: 'string' },
            { name: 'idFacebook', type: 'string' },
            { name: 'idTwitter', type: 'string'},
			{ name: 'username', type: 'string' },
			{ name: 'displayName', type: 'string' },
			{ name: 'firstName', type: 'string' },
			{ name: 'lastName', type: 'string' },
			{ name: 'description', type: 'string' },
			{ name: 'email', type: 'email' },
			{ name: 'gender', type: 'int', defaultValue: 0},
			{ name: 'nationality', type: 'string' },
			{ name: 'birthDate', type: 'date', dateformat: 'c' },
			{ name: 'avatar', type: 'string', defaultValue: 'resources/img/pin_124.png'},
			{ name: 'role', type: 'int' },
			{ name: 'status', type: 'int' },
			{ name: 'activatedOn', type: 'date', dateformat: 'c' },
			{ name: 'lastLoginOn', type: 'date', dateformat: 'c' },
			{ name: 'badges', type: 'string', defaultValue: ''},
			{ name: 'favorites', type: 'string', defaultValue: ''},
			{ name: 'liked', type: 'string', defaultValue: '' },
			{ name: 'currentPoints', type: 'int', defaultValue: 0},
			{ name: 'counterCheckIns', type: 'int', defaultValue: 0 },
			{ name: 'counterFriends', type: 'int', defaultValue: 0 },
			{ name: 'counterBadges', type: 'int', defaultValue: 0},
			{ name: 'maxPoints', type: 'int', defaultValue: 50}
		],
		validations: [
			{ type: 'presence', field: 'displayName'}
		]
	}
});

Ext.define("B2B.model.User", {
	extend: "Ext.data.Model",
	requires:'Ext.data.identifier.Uuid',
	config: {
	//	idProperty: 'idUser',
		identifier:'uuid',
		fields: [
			{ name: 'idUser', type: 'string' },
			{ name: 'username', type: 'string' },
            { name: 'idFacebook', type: 'string' },
            { name: 'idTwitter', type: 'string' },
			{ name: 'displayName', type: 'string' },
			{ name: 'firstName', type: 'string' },
			{ name: 'lastName', type: 'string' },
			{ name: 'description', type: 'string' },
			{ name: 'email', type: 'email' },
			{ name: 'gender', type: 'int', defaultValue: 0},
			{ name: 'nationality', type: 'string' },
			{ name: 'birthDate', type: 'date', dateformat: 'c' },
			{ name: 'avatar', type: 'string', defaultValue: HH.default_user48},
			{ name: 'shareFacebook', type: 'boolean', defaultValue: false},
			{ name: 'shareTwitter', type: 'boolean', defaultValue: false},
			{ name: 'enableNotification', type: 'boolean', defaultValue: false},
			{ name: 'role', type: 'int' },
			{ name: 'status', type: 'int' },
			{ name: 'pwdHash', type: 'string' },
			{ name: 'token', type: 'string' },
			{ name: 'currentPoints', type: 'int' },
			{ name: 'maxPoints', type: 'int' },
			{ name: 'activatedOn', type: 'date', dateformat: 'c' },
			{ name: 'lastLoginOn', type: 'date', dateformat: 'c' },
			{ name: 'favorites', type: 'string', defaultValue: ''},
			{ name: 'liked', type: 'string', defaultValue: '' },
			{ name: 'counterCheckIns', type: 'int', defaultValue: 0 },
			{ name: 'counterFriend', type: 'int', defaultValue: 0 },
			{ name: 'counterBadges', type: 'int', defaultValue: 0},
			{ name: 'hashBeerlist', type: 'string'},
			{ name: 'hashFriendlist', type: 'string'},
			{ name: 'hashNotificationlist', type: 'string'}
		],
		validations: [
			{ type: 'presence', field: 'displayName'}
		]
	}
});

Ext.define("B2B.model.Feedback", {
	extend: "Ext.data.Model",
	requires:'Ext.data.identifier.Uuid',
	config: {
	//	idProperty: 'idFeedback',
		identifier:'uuid',
		fields: [
			{ name: 'idFeedback', type: 'string' },
			{ name: 'rate', type: 'int' },
			{ name: 'rate2', type: 'int' },
			{ name: 'rate3', type: 'int' },
			{ name: 'comment', type: 'string' },
			{ name: 'idUser', type: 'string' },
			{ name: 'displayName', type: 'string' },
			{ name: 'idTarget', type: 'string' },
			{ name: 'targetName', type: 'string' },
			{ name: 'type', type: 'string' },
			{ name: 'like', type: 'int' },
			{ name: 'insertedOn', type: 'date', dateformat: 'c' },
		],
		validations: [
			{ type: 'presence', field: 'idFeedback'}
		]
	}
});

Ext.define("B2B.model.BeerSingle", {
	extend: "Ext.data.Model",
	requires:'Ext.data.identifier.Uuid',
	config: {
		//idProperty: 'idBeer',
		identifier:'uuid',
		fields: [
			{ name: 'idBeer', type: 'string' },
			{ name: 'name', type: 'string' }
			
		],
		validations: [
		//	{ type: 'presence', field: 'idBeer'}
		]
	}
});

Ext.define("B2B.model.Beer", {
	extend: "Ext.data.Model",
	requires:'Ext.data.identifier.Uuid',
	config: {
		//idProperty: 'idBeer',
		identifier:'uuid',
		fields: [
			{ name: 'idBeer', type: 'string' },
			{ name: 'idUser', type: 'string' },
			{ name: 'displayName', type: 'string' },
			{ name: 'name', type: 'string' },
			{ name: 'brewery', type: 'string' },
			{ name: 'nationality', type: 'string' },
			{ name: 'beertype', type: 'string' },
			{ name: 'beerstyle', type: 'string' },
			{ name: 'grad', type: 'float' },
			{ name: 'image', type: 'string' },
			{ name: 'status', type: 'int' },
			{ name: 'rate', type: 'double' },
			{ name: 'color', type: 'int' },
			{ name: 'insertedOn', type: 'date', dateformat: 'c' },
			{ name: 'param1', type: 'int', defaultValue: 1  },
			{ name: 'param2', type: 'int', defaultValue: 1 },
			{ name: 'param3', type: 'int', defaultValue: 1 },
            { name: 'description', type: 'string', defaultValue: ''}
		],
		validations: [
		//	{ type: 'presence', field: 'idBeer'}
		]
	}
});

Ext.define("B2B.model.Friend_Facebook", {
	extend: "Ext.data.Model",
	requires:'Ext.data.identifier.Uuid',
	config: {
		//idProperty: 'idUser',
		identifier:'uuid',
		fields: [
			{ name: 'idFacebook', type: 'string' },
            { name: 'idTwitter', type: 'string' },
			{ name: 'displayName', type: 'string' },
			{ name: 'haveApp', type: 'boolean' },
            { name: 'invited', type: 'boolean' },
            { name: 'social', type: 'string' },
			{ name: 'image', type: 'string' }
		],
		validations: [
			{ type: 'presence', field: 'id'}
		]
	}
});

Ext.define("B2B.model.Drink", {
	extend: "Ext.data.Model",
	requires:'Ext.data.identifier.Uuid',
	config: {
		identifier:'uuid',
		fields: [
			{ name: 'idDrink', type: 'string' },
			{ name: 'displayName', type: 'string' },
			{ name: 'idUser', type: 'string' },
			{ name: 'idBeer', type: 'string' },
			{ name: 'beerName', type: 'string' },
			{ name: 'idPlace', type: 'string' },
			{ name: 'placeName', type: 'string' },
			{ name: 'image', type: 'string' },
			{ name: 'rate', type: 'int' },
			{ name: 'rate2', type: 'int' },
			{ name: 'rate3', type: 'int' },
			{ name: 'insertedOn', type: 'date', dateformat: 'c' },
			{ name: 'lat', type: 'string' },
			{ name: 'lng', type: 'string' }
		],
		validations: [
			{ type: 'presence', field: 'idDrink'}
		]
	}
});

Ext.define("B2B.model.Notification", {
	extend: "Ext.data.Model",
	requires:'Ext.data.identifier.Uuid',
	config: {
	//	idProperty: 'idNotification',
		identifier:'uuid',
		fields: [
			{ name: 'idNotification', type: 'string' },
			{ name: 'image', type: 'string' },
			{ name: 'idBeer', type: 'string' },
			{ name: 'beerName', type: 'string' },
			{ name: 'idFriend', type: 'string' },
			{ name: 'friendName', type: 'string' },
			{ name: 'idPlace', type: 'string' },
			{ name: 'placeName', type: 'string' },
			{ name: 'targetName', type: 'string' },
			{ name: 'idBadge', type: 'string' },
			{ name: 'badgeName', type: 'string' },
			{ name: 'idFriendConfirm', type: 'string' },
			{ name: 'friendNameConfirm', type: 'string' },
			{ name: 'type', type: 'int' },
			{ name: 'subType', type: 'int' },
			{ name: 'jumpTo', type: 'string' },
			{ name: 'status', type: 'int' },
			{ name: 'insertedOn', type: 'date', dateformat: 'c' },
		],
		validations: [
			{ type: 'presence', field: 'idNotification'}
		]
	}
});

Ext.define("B2B.model.Activity", {
	extend: "Ext.data.Model",
	requires:'Ext.data.identifier.Uuid',
	config: {
		//idProperty: 'idActivity',
		identifier:'uuid',
		fields: [
			{ name: 'idActivity', type: 'string' },
			{ name: 'image', type: 'string' },
			{ name: 'displayName', type: 'string' },
			{ name: 'idUser', type: 'string' },
			{ name: 'idBeer', type: 'string' },
			{ name: 'idPlace', type: 'string' },
			{ name: 'idFriend', type: 'string' },
			{ name: 'idBadge', type: 'string' },
			{ name: 'beerName', type: 'string' },
			{ name: 'badgeName', type: 'string' },
			{ name: 'placeName', type: 'string' },
			{ name: 'friendName', type: 'string' },
			{ name: 'jumpTo', type: 'string' },
			{ name: 'type', type: 'int' },
			{ name: 'status', type: 'int' },
			{ name: 'like', type: 'int' },
			{ name: 'rate', type: 'int' },
			{ name: 'idUserLike', type: 'Array' },
			{ name: 'date', type: 'date', dateformat: 'c' }
		],
		validations: [
		//	{ type: 'presence', field: 'id'}
		]
	}
});

Ext.define("B2B.model.Place", {
	extend: "Ext.data.Model",
	requires:'Ext.data.identifier.Uuid',
	config: {
		//idProperty: 'idPlace',
		identifier:'uuid',
		fields: [
			{ name: 'idPlace', type: 'string' },
			{ name: 'placeName', type: 'string' },
			{ name: 'image', type: 'string' },
			{ name: 'lat', type: 'string' },
			{ name: 'lng', type: 'string' },
			{ name: 'url', type: 'string' },
			{ name: 'drinkedIn', type: 'int' },
			{ name: 'category', type: 'string' },
            { name: 'distance', type: 'int' },
		],
		validations: [
			{ type: 'presence', field: 'idPlace'}
		]
	}
});

Ext.define("B2B.model.FavoriteBeer", {
	extend: "Ext.data.Model",
	requires:'Ext.data.identifier.Uuid',
	config: {
		identifier:'uuid',
		fields: [
			{ name: 'idFavorite', type: 'int' },
			{ name: 'idBeer', type: 'string' },
			{ name: 'beerName', type: 'string' },
		]
	}
});

Ext.define("B2B.model.TemporaryData_Local", {
	extend: "Ext.data.Model",
	requires:'Ext.data.identifier.Uuid',
	config: {
		//idProperty: 'idDrink',
		identifier:'uuid',
		fields: [
			{ name: 'idDrink', type: 'string' },
			{ name: 'username', type: 'string' },
			{ name: 'beer', type: 'string' },
			{ name: 'feedback', type: 'string' },
			{ name: 'image', type: 'string' },
			{ name: 'insertedOn', type: 'date', dateformat: 'c' }
		],
		validations: [
			{ type: 'presence', field: 'idDrink'}
		]
	}
});

Ext.define("B2B.controller.Notifications", {
	extend: "Ext.app.Controller",
	requires: [
		'Ext.util.DelayedTask'
	],
	config: {
		refs: {
			notificationContainer: "notification",
			notificationList: "notificationlist",
			appContainer: "appcontainer",
			app: "_app"
		},
		control: {
			appContainer: {
				notificationShowCommand: "onNotificationShow"
			},
			notificationContainer:{
				notificationReadAllCommand: "onNotificationReadAll",
				notificationBackCommand: "onNotificationBack"
			},
			notificationList: {
				itemtap: "onNotificationRead"
			}
		}
	},
	onNotificationShow: function(){
		var notification = {
			xtype: "notification",
			id: 'notification'
		};
		var appcontainer = this.getApp(); //.getProfile();
		appcontainer.add(notification);
		appcontainer.setActiveItem(2);
	},
	onNotificationRead: function(a, b, c, record){
		/* deselection of the list */
		setTimeout(function(){a.deselect(b);},500);
		//impostazione notifica come read
		var user = Ext.getStore("Profile_Local").first().data;
		record.data.status = 0;

		var	confirmFriend = function(button) {
				if (button === 'yes' || button === 2) {
					//conferma amicizia
					Ext.Ajax.request({
						url: HH.IP_PORT_SERVER+"/birrettaservice/rest/bserv/frndConfirm",
						method: "POST",
						headers: {
							"btUsername": user.idUser,
							"btSid" : user.token
						},
						params: {
							idRequestor: record.data.idFriend,
							idRequested: user.idUser,
							btUsername: user.idUser,
							btSid : user.token
						},
						success: function(result) {
							Ext.Viewport.fireEvent("refreshActivities", this);
							Ext.Viewport.fireEvent("refreshFriends", this);
							var json = Ext.decode(result.responseText, true);
							if (json) {
								errorCode = json.response.status.code;
								errorMsg = json.response.status.msg;

								if (errorCode < 200) {

									var badges = json.response.metaData.badge;
									if(badges.length>0)
									{
										var badgename=utils.getBadgeName(badges[0].idBadge);
										utils.alert((badgename?badgename:badges[0].badgeName),i18n.app.LABEL_BADGEWIN)
									}else{
										utils.alert(errorMsg, utils.__(i18n.app.LABEL_CONFIRM_FRIEND_OK));
									}

								} else {
									HH.log("[Confirm friend] Failure - CODE: " + errorCode + " MESSAGE: " + errorMsg);
									utils.alert(utils.__(i18n.app.TEXT_CONFIRM_FRIENDERSHIP_FAIL_EXPECTED), utils.__(i18n.app.COMMON_ATTENTION));
								}
							}

							Ext.Ajax.request({
								url: HH.IP_PORT_SERVER+"/birrettaservice/rest/bserv/setNotificationRead",
								method: "GET",
								headers: {
									"btUsername": user.idUser,
									"btSid" : user.token
								},
								params: {
										idUser: user.idUser,
										idNotification: record.data.idNotification
								},
								callback: function(response) {
									Ext.Viewport.fireEvent("refreshNotifications", this);
								}
							});
						},
						failure: function(result) {

							HH.log("[Confirm friend] Failure");
							utils.alert(utils.__(i18n.app.TEXT_CONFIRM_FRIENDERSHIP_FAIL));
							Ext.Ajax.request({
								url: HH.IP_PORT_SERVER+"/birrettaservice/rest/bserv/setNotificationRead",
								method: "GET",
								headers: {
									"btUsername": user.idUser,
									"btSid" : user.token
								},
								params: {
										idUser: user.idUser,
										idNotification: record.data.idNotification
								},
								callback: function(response) {
									Ext.Viewport.fireEvent("refreshNotifications", this);
								}
							});
						}
					});
				} else if (button == 'no' || button == 1) {
					//rifiuto amicizia
					Ext.Ajax.request({
						url: HH.IP_PORT_SERVER+"/birrettaservice/rest/bserv/frndRefuse",
						method: "POST",
						headers: {
							"btUsername": user.idUser,
							"btSid" : user.token
						},
						params: {
							idRequestor: record.data.idFriend,
							idRequested: user.idUser
						},
						success: function(result) {
							Ext.Viewport.fireEvent("refreshFriends", this);
							var json = Ext.decode(result.responseText, true);
							if (json) {
								errorCode = json.response.status.code;
								errorMsg = json.response.status.msg;

								if (errorCode < 200) {
									Ext.Viewport.fireEvent("refreshNotifications", this);
									utils.alert(errorMsg, utils.__(i18n.app.LABEL_REFUSE_FRIEND_OK));
								} else {
									HH.log("[Refuse friend] Failure - CODE: " + errorCode + " MESSAGE: " + errorMsg);
									utils.alert(utils.__(i18n.app.TEXT_REFUSEFRIEND_FAIL_EXPECTED), utils.__(i18n.app.COMMON_ATTENTION));
								}
							}

						},
						failure: function(result) {
							//cmq notifica read
							Ext.Ajax.request({
								url: HH.IP_PORT_SERVER+"/birrettaservice/rest/bserv/setNotificationRead",
								method: "GET",
								headers: {
									"btUsername": user.idUser,
									"btSid" : user.token
								},
								params: {
										idUser: user.idUser,
										idNotification: record.data.idNotification
								},
								callback: function(response) {
									Ext.Viewport.fireEvent("refreshNotifications", this);
								}});
							HH.log("[Refuse friend] Failure");
							utils.alert(utils.__(i18n.app.TEXT_REFUSEFRIEND_FAIL));
						}
					});
				}
			}
		if (record.data.type === 0) {
           
           var fstore = Ext.getStore("Friends_Ajax");
           var found = false;
           fstore.each(function(therecord){
                if(therecord.data.idUser === record.data.idFriend){
                    found = true;
                }
            });
           
           if(!found)
           {
           //chidere se confermare o rifiutare amicizia
			utils.alert(utils.__(i18n.app.TEXT_CONFIRM_FRIENDERSHIP, record.data.friendName), utils.__(i18n.app.LABEL_CONFIRM_FRIEND), true, confirmFriend, this, true);
           }
		} else{
			Ext.Ajax.request({
				url: HH.IP_PORT_SERVER+"/birrettaservice/rest/bserv/setNotificationRead",
				method: "GET",
				headers: {
					"btUsername": user.idUser,
					"btSid" : user.token
				},
				params: {
						idUser: user.idUser,
						idNotification: record.data.idNotification
				},
				callback: function(response) {
					Ext.Viewport.fireEvent("refreshNotifications", this);
				}});
		}
	},
	onNotificationReadAll: function(){
		/* TODO SET all notification read */
	//	console.error("TODO: Notification Read All");
		var user = Ext.getStore("Profile_Local").first().data;
		var array =	Ext.getStore("Notifications_Ajax").getData().all;
		for (i = 0; i < array.length; i+=1) {
			if(array[i].data.status==1) //se non letta richiedo lettura
			{
				array[i].data.status=0;
				Ext.Ajax.request({
					url: HH.IP_PORT_SERVER+"/birrettaservice/rest/bserv/setNotificationRead",
					method: "GET",
					headers: {
						"btUsername": user.idUser,
						"btSid" : user.token
					},
					params: {
							idUser: user.idUser,
							idNotification: array[i].data.idNotification
					},
					callback: function(response) {
						//se arrivato all'ultimo elemento refreshdi tutto
						if((i+1)>=array.length)
							Ext.Viewport.fireEvent("refreshNotifications", this);
					}});
			}
		}
        bridge.updateNotificationCount(0);
	},
	onNotificationBack: function(){
		var appcontainer = Ext.getCmp('_app');
		appcontainer.remove(Ext.getCmp('notification'));
	},
	launch: function(){
		this.callParent(arguments);

		var that = this;

		this.task = function() {
			var store = Ext.getStore("Notifications_Ajax"),
				nread = 0, button = null;

			if (store.getCount() > 0) {
				var records = store.queryBy(function(record) {
					return record.get('status') === 1;
				});

				nread = records.getCount();
			}

			button = Ext.getCmp("notificationbutton");

			if (button) {
				button.setBadgeText(nread === 0 ? "" : "" + nread);
			}
           bridge.updateNotificationCount(nread);
		};
           
		setInterval(this.task, 5000);
	},
	init: function(){
		this.callParent(arguments);
	}
});

Ext.define("B2B.controller.DrinkIn", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			drinkIn: "drinkindetail",
			app: "_app"
		},
		control: {
			drinkIn: {
				backCommand: "onBackPlace",
				endCheckInCommand: "onGoHome"
			}
		}
	},
	onBackPlace: function(source) {
		this.getApp().pop();
	},
	onGoHome: function(source){
		//gestione destroy e push per arrivare a home
		var appcontainer = this.getApp(),
			place = Ext.getCmp('place'),
			beers = Ext.getCmp('beers'),
			drinkindetail = Ext.getCmp("drinkindetail"),
			beerdetail=Ext.getCmp("beerdetailpanel"),
			favoritesbeer= Ext.getCmp("favoritesbeer");

		if (beers) {
			beers.add([
			{
				xtype: 'beersearch',
				id: 'beersearch'
			},
			{
				xtype: 'beerlist',
				id: 'beerlist',
				store: null,
				singleSelect: true,
				scrollable : {
					translationMethod : 'cssTransform'
				}
			}]);
		}

		if (place) {
			appcontainer.remove(place, true);
		}
		if (drinkindetail) {
			appcontainer.remove(drinkindetail, true);
		}
		if(favoritesbeer){
			appcontainer.remove(favoritesbeer, true);
		}
		if(beerdetail){
			appcontainer.remove(beerdetail, true);
		}
		Ext.getCmp("userprofile").setMasked(false);
		var home = Ext.getCmp("appcontainer");
		home.show();
	},
	init: function(){
		this.callParent(arguments);
	},
});




Ext.define("B2B.controller.Friends", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			friendFinder: "friendfinderpanel",
			friendsearch: "friendsearch",
			friendinvitepanel: "friendinvitepanel",
			friendinvitelist: "friendinvitelist",
			friendlistdetail: "friendUserInfo",
			app: "_app"
		},
		control: {
			friendsearch: {
				searchFriendCommand: "onSearchFriend"
			},
			friendFinder: {
				backFriendFinderCommand: "onBackFriendDetail"
			},
			friendlist: {
				itemtap: "onViewFriendDetail"
			},
			friendinvitepanel:{
				backCommand: "onBackFriend",
                friendsBackCommand:"onFriendsBack",
                friendsForwardCommand:"onFriendsForward",
                meetBeerFriendsCommand:"onMeetBeerFriends",
                FBFriendsTapCommand:"onFBFriends",
                TWFriendsTapCommand:"onTwFriends"
			},
			friendinvitelist:{
				itemtap: "onInviteFriendFacebook"
			}
           
           
		}
	},
	onSearchFriend: function(resource){
		this.getApp().add({
			xtype: "friendinvitepanel",
			id: "friendinvitepanel"
		});

		bridge.refreshSocialFriends(false);
	},
	onViewFriendDetail: function(a, b, c, record){
		Ext.getCmp("friend").setMasked(true);
		Ext.Viewport.fireEvent("refreshFriends", this, record.data.idUser);
		Ext.Viewport.fireEvent("refreshBadges", this, record.data.idUser);
		Ext.Viewport.fireEvent("refreshDrinks", this, record.data.idUser);
		/* Deselection of the list */
		setTimeout(function(){a.deselect(b);},500);

		var ajax_store = Ext.getStore('Friends_Ajax');
		var jsonData = ajax_store.getAt(ajax_store.findExact("id", record.data.id));
		this.getApp().add({
			xtype: "frienddetailcontainer",
			id: "frienddetailcontainer",
			profileJson: jsonData
		});
	},
	onBackFriend: function(){
		var appcontainer = this.getApp(),
			friendpanel = Ext.getCmp('friendinvitepanel'),
			search = Ext.getCmp("search_friend_btn"),
			searchFb = Ext.getCmp("search_friend_facebook_btn");

		appcontainer.remove(friendpanel, true);

		if (search) {
			search.enable();
		}

		if (searchFb) {
			searchFb.enable();
		}
	},
    onFriendsBack: function(){
        console.log("onFriendsBack");
        bridge.getNewFacebookFriendsPage(false);
    },
    onFriendsForward: function(){
        console.log("onFriendsForward");
        bridge.getNewFacebookFriendsPage(true);
    },

    onMeetBeerFriends: function(){
        console.log("onMeetBeerFriends");
        bridge.getMeetBeerFriends();
    },
           
    onFBFriends: function(){
        console.log("onFBFriends");
        bridge.getFBFriends();
    },
           
    onTwFriends:function(){
        console.log("onTwFriends");
        bridge.getTWFriends();
    },
           
           
	//per lista amici di amcici
	onInviteFriendFacebook: function(friendinvitelist, b, c, record){
		//(message, title, confirm, callback)
		setTimeout(function(){friendinvitelist.deselect(b);},500);
           
		var profile = Ext.getStore("Profile_Local"),
			user = profile.first().data,
			inviteFriend = function(button) {
				if (button === 'yes' || button === 2) {
           		 //invocazione backEnd
				 Ext.Ajax.request({
						url: HH.IP_PORT_SERVER+"/birrettaservice/rest/bserv/frndReq?timestamp=" + (new Date().getTime()),
						method: "POST",
						headers: {
							"btUsername": user.idUser,
							"btSid" : user.token
						},
						params: {
							idRequestor: user.idUser,
							idRequestedFbId: record.data.idFacebook,
                            idRequested:record.data.idTwitter
						},
						success: function(result) {
							var json = Ext.decode(result.responseText, true);
							if (json) {
								errorCode = json.response.status.code;
								errorMsg = json.response.status.msg;

								if (errorCode < 200) {
									utils.alert(errorMsg, utils.__(i18n.app.TEXT_INVITEFRIEND_SUCCESS));
                                  
                            
								} else {
									utils.alert(errorMsg + " error: " + errorCode);
								}
								Ext.Viewport.fireEvent("refreshFriends", this);
							}
						},
						failure: function(result) {
							HH.log("[Request app friend] Failure");
							utils.alert(utils.__(i18n.app.TEXT_INVITEFRIEND_FAIL));
						}
					});
				}
           
				friendinvitelist.deselect(record);
			},
           
			inviteFriendOnFacebook = function(button){
				HH.log(record.displayName)
				if (button === 'yes' || button === 2) {
					bridge.inviteFriendOnSocial(record.data.idFacebook,record.data.idTwitter, i18n.app.TEXT_INVITEFACEBOOK_TITLE, i18n.app.TEXT_INVITEFACEBOOK_MESSAGE);
           
				}
			};

		if (record.data.haveApp) {
			utils.alert(utils.__(i18n.app.TEXT_INIVITEFRIEND_MEETBEER,record.data.displayName),utils.__(i18n.app.TEXT_INVITE),true,inviteFriend,this);
		} else if(!record.data.invited){
			utils.alert(utils.__(i18n.app.TEXT_INIVITEFRIEND_FACEBOOK,record.data.displayName),utils.__(i18n.app.TEXT_INVITE),true,inviteFriendOnFacebook,this);
		}
	},
	launch: function(){
		this.callParent(arguments);
	},
	init: function(){
		this.callParent(arguments);
	}
});

Ext.define("B2B.controller.Profiles", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			profile: "userprofile",
			settings: "settings",
			profileForm: "userform",
			app: "_app"
		},
		control: {
			profile: {
			//	editProfileCommand: "onShowProfileForm",
				friendsProfileCommand: "onShowFriends",
				settingsCommand: "onShowSettings",
				reloadProfileCommand: "onRefresh"
			},
			profileForm: {
				saveProfileCommand: "onSaveProfile",
				backProfileCommand: "onBackProfile"
			},
			settings:{
				saveProfileCommand: "onSaveProfile",
			}
		}
	},
	onShowProfileForm: function(){
		var userform = {
			xtype: 'userform',
			id: "userform"
		};

		var profileContainer = this.getProfile();
		this.getApp().add(userform);
		var profileForm = this.getProfileForm();
		profileForm.reset();
		profileForm.setRecord(Ext.getStore('Profile_Local').first());
	},
	onSaveProfile: function(source, values) {
		var errorCode = -1, errorMsg = "",
			that = this,
			viewport = Ext.Viewport;

		viewport.setMasked({
            xtype: 'loadmask',
            loadingText: i18n.app.HINT_LOADING
        });

		viewport.setMasked(true);

		Ext.Ajax.request({
			url: HH.IP_PORT_SERVER+"/birrettaservice/rest/bserv/saveUser",
			method: "POST",
			headers: {
        		"btUsername": values.username,
        		"btSid" : values.token
    		},
			params: {
				idUser: values.idUser,
				idFacebook: values.idFacebook,
                idTwitter: values.idTwitter,
				username: values.username,
				email: values.email,
				displayName: values.displayName,
				firstName: values.firstName,
				lastName: values.lastName,
				description: values.description,
				birthDate: values.birthDate,
				gender: values.gender,
				nationality: values.nationality
			},
			success: function(result) {
				Ext.Viewport.fireEvent("refreshProfileStore", this);
				var json = Ext.decode(result.responseText, true);
				if (json) {
					errorCode = json.response.status.code;
					errorMsg = json.response.status.msg;

					if (errorCode < 200 && json.response.body.list.length > 0) {
						that._doSaveProfileCallback(0, errorMsg, errorCode);
					} else {
						that._doSaveProfileCallback(1, errorMsg, errorCode);
					}
				} else {
					that._doSaveProfileCallback(1, errorMsg, errorCode);
				}
			},
			failure: function(result) {
				that._doSaveProfileCallback(1, errorMsg, errorCode);
			}
		});

		var profileContainer = Ext.getCmp('userprofile');
		profileContainer.remove(Ext.getCmp('userform'));
	},
	_doSaveProfileCallback: function(index, errorMsg, errorCode) {
		var viewport = Ext.Viewport;

		switch(index) {
			case 0:    // Success
				HH.log("---> Step: [Save user] Success");
				var appcontainer = this.getApp();
				appcontainer.remove(Ext.getCmp('settings'));
			//	utils.alert(i18n.app.COMMON_ATTENTION, i18n.app.ALERT_ERRORCOMMUNICATION);
				break;
			default:    // Fail
				HH.log("--> Step: [Save user] Failure - CODE: " + errorCode + " - MSG: " + errorMsg);
				utils.alert(i18n.app.COMMON_ATTENTION, i18n.app.ALERT_ERRORCOMMUNICATION);
				break;
		}

		viewport.setMasked(false);
	},
	onBackProfile: function() {
		var appcontainer = this.getApp();
		appcontainer.remove(Ext.getCmp('userform'));
	},
	onShowFriends: function() {
		Ext.getCmp("userprofile").setMasked(false);
		var tabPanel = Ext.Viewport.down("appcontainer");
		tabPanel.setActiveItem(Ext.getCmp('friend'));
	},
	onShowSettings: function() {
		var settings = {
			xtype: 'settings',
			id: 'settings',
			record: Ext.getStore('Profile_Local').first(),
           
		};

		var appcontainer = this.getApp();
		appcontainer.add(settings);
		appcontainer.setActiveItem(2);
	},
	onRefresh: function(){
           console.log(">>>>>>>>>>>>>>>>>>>>Refresh");
		Ext.Viewport.fireEvent("refreshProfileStore", this);
	},
	launch: function(){
		this.callParent(arguments);
	},
	init: function(){
		this.callParent(arguments);
	}
});

Ext.define("B2B.controller.Activities", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			app: "_app",
			activity: "activity",
			activitylist: "activitylist",
			activitylistdetail: "activitylistdetail",
			profile: "userprofile",
			historypanel: "historypanel"
		},
		control: {
			activity: {
				viewActivityDetailCommand: "onViewActivityDetail"
			},
			activitylistdetail: {
				backActivityDetailCommand: "onBackActivityDetail"
			},
			activitylist: {
				itemtap: "onlikeActivity"
			},
			profile: {
				activityListProfileCommand: "onShowMyActivityList"
			},
			historypanel: {
				backToProfileCommand: "onBackActivityDetail"
			}
		}
	},
	/* Transizione popup activity detail */
	onlikeActivity: function(scope, b, c, record){
		/* Deselezione lista */
		setTimeout(function(){scope.deselect(b);},500);
		var jsonData = record.data;
		/* Init Popup */
		HH.log(scope)
	/*	if(_.isEmpty(record.data.like) && record.data.like==null)
		{
			record.data.like=1;
		}
		else{
			record.data.like=record.data.like+1;
		}*/
		//invocazione metodo remoto
		var user = Ext.getStore("Profile_Local").first().data;
		Ext.Ajax.request({
			url: HH.IP_PORT_SERVER+"/birrettaservice/rest/bserv/likeActivity",
			method: "GET",
			headers: {
				"btUsername": user.idUser,
				"btSid" : user.token
			},
			params: {
					idUser: user.idUser,
					idActivity: record.data.idActivity
			},
			callback: function(response) {
				if (scope.id === "activitylist") {
					Ext.Viewport.fireEvent("refreshActivities", this);
				} else {
					Ext.Viewport.fireEvent("refreshStore", this, "Activities_User_Ajax");
				}
			}
		});
	},
	/* Transizione popup activity detail */
	onViewActivityDetail: function(scope, b, c, record){
		this.getApp().push({
		//verso i feedback
			xtype: "activitylistdetail",
			id: "activitylistdetail",
			jsonData: jsonData
		});
	},
	onShowMyActivityList : function()
	{
		this.getApp().push({
			xtype: "historypanel",
			id: "historypanel"
		});
	},
	onBackActivityDetail: function() {
		this.getApp().pop();
	},
	launch: function(){
		this.callParent(arguments);
	},
	init: function(){
		this.callParent(arguments);
	}
});

Ext.define("B2B.controller.Feedbacks", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			app: "_app",
		},
		control: {
			app: {
				
			}
		}
	},
	onCommentSubmit: function(){

	},
	init: function(){
		this.callParent(arguments);
	}
});




Ext.define("B2B.controller.Badges", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			profile: "userprofile",
			badgeListContainer: "badgelistcontainerpanel",
			badgeList: "badgelistcomponent",
			badgeDetail: "badgedetailpanel",
			friendlistdetail: "friendlistdetail",
			badgecustomdetailpanel: "badgecustomdetailpanel",
			app: "_app"
		},
		control: {
			profile: {
				badgesProfileCommand: "onShowBadgesList"
			},
			badgeListContainer: {
				backToProfileCommand: "popCurrentView"
			},
			badgeList: {
				itemtap: "onViewBadgeDetail",
				select: "onSelectItem"
			},
			badgeDetail: {
				backBadgesCommand: "popCurrentView"
			},
			friendlistdetail:{
				badgesFriendsProfileCommand: "onShowBadgesListFriend"
			},
			badgecustomdetailpanel:{
				backBadgesFriendCommand: "onBackBadgesFriendCommand"
			}
		}
	},
	onShowBadgesList: function() {
		this.getApp().push({
			xtype: "badgelistcontainerpanel"
		});
	},
	popCurrentView: function() {
		this.getApp().pop();
	},
	onViewBadgeDetail: function(that, index, item, model, eventObject) {
		setTimeout(function() {
			that.deselect(index);
		}, 500);

		if (model.data.active) {
			this.getApp().push({
				xtype: "badgedetailpanel",
				jsonData: model.data
			});
		}
	},
	onShowBadgesListFriend: function(that, index, item, model, eventObject){
		this.getApp().push({
				xtype: "badgecustomdetailpanel",
				id:"badgecustomdetailpanel",
			});
	},
	onBackBadgesFriendCommand: function(){
		var appcontainer = this.getApp(),
			badgepanel = Ext.getCmp('badgecustomdetailpanel');
		appcontainer.remove(badgepanel, true);
	},
	onSelectItem: function(that, item, eventObject) {
		return item.data.active;
	},
	launch: function(){
		this.callParent(arguments);
	},
	init: function(){
		this.callParent(arguments);
	}
});

Ext.define("B2B.controller.Settings", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			settings: "settings",
			app: "_app"
		},
		control: {
			settings: {
				removeDataCommand: "onRemoveDataCommand",
				settingsBackCommand: 'onBackSettings',
				logoutCommand: "onLogOutCommand"
			}
		}
	},
	onRemoveDataCommand: function(){
		var removeCallback = function(button){
			if (button === 2) {
				Ext.getStore("Activities_Ajax").removeAll();
			//	Ext.getStore("Activities_Local").removeAll();
				Ext.getStore("Beers_Ajax").removeAll();
				Ext.getStore("Friends_Ajax").removeAll();
			//	Ext.getStore("Friends_Local").removeAll();
				Ext.getStore("Notifications_Ajax").removeAll();
			//	Ext.getStore("Notifications_Local").removeAll();
				Ext.getStore("Places_Ajax").removeAll();
				Ext.getStore("Drinks_Ajax").removeAll();
			//	Ext.getStore("Drinks_Local").removeAll();
				Ext.getStore("Profile_Ajax").removeAll();
				Ext.getStore("Profile_Local").removeAll();
				bridge.logout();
			}
		};

		utils.alert(utils.__(i18n.app.DIALOG_YOUSUREREMOVEDATA), i18n.app.PANEL_LOGOUT, true, removeCallback);
	},
	onLogOutCommand: function(){
		var logoutCallback = function(button){
			if (button === 2) {
				authentication.logoutFromApp();
			}
		};

		utils.alert(utils.__(i18n.app.DIALOG_YOUSURELOGOUT), i18n.app.PANEL_LOGOUT, true, logoutCallback);
	},
	onBackSettings: function(){
		var appcontainer = Ext.getCmp('_app');
		appcontainer.remove(Ext.getCmp('settings'));
	},
	init: function(){
		this.callParent(arguments);
	}
});





Ext.define("B2B.controller.Favorites", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			app: "_app",
			profilePanel: "userprofile",
			favoritesPanel: "favoritesbeer"
		},
		control: {
			app: {
				
			},
			profilePanel: {
				favoritesProfileCommand: "onFavoritesOpen"
			},
			favoritesPanel: {
				jumptoBeerCommand: "onJumpToBeer",
				backFavoritesCommand: "onFavoritesBack"
			},
		}
	},
	onFavoritesOpen: function(){
		var favoritesbeer = {
			xtype: "favoritesbeer",
			id: "favoritesbeer"
		};
		var appcontainer = Ext.getCmp('_app');
		appcontainer.add(favoritesbeer);
	//	appcontainer.setActiveItem(2);
	},
	onFavoritesBack: function(){
		var appcontainer = Ext.getCmp('_app');
		appcontainer.add(Ext.getCmp('favoritesbeer'));
	},
	onJumpToBeer: function(){
		this.getApp().pop();
		var tabPanel = Ext.Viewport.down("appcontainer");
		tabPanel.setActiveItem(1);
	},
	init: function(){
		this.callParent(arguments);
	}
});




Ext.define("B2B.controller.Place_Detail", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			placedetail: "placedetail",
			placebeerlist: "placebeerlist",
			beerDetail: "beerdetailpanel",
			app: "_app"
		},
		control: {
			placedetail: {
				backPlaceDetailCommand: "onBackPlace",
				checkInCommand: "onCheckIn",
				searchNewBeerCommand: "searchNewBeer",
				shareOnFacebookCommand: "onShareOnSocial"
			},
			placebeerlist: {
				itemtap: "selectBeerInPlace"
			},
			appContainer: {
				drinkInCommand: "onDrinkIn"
			},
			beerDetail: {
				drinkInCommand: "onDrinkIn"
			}
		}
	},
	onShareOnSocial:function(source, infoFB, infoTW) {
		bridge.postOnSocial(infoFB,infoTW);
	},
	onDrinkIn: function(source, beerSelected) {
		this.beerSelected = beerSelected;
	},
	onBackPlace: function(){
		var appcontainer = this.getApp(),
			place = Ext.getCmp('placedetail');
		if (place) {
			appcontainer.remove(place, true);
		}
	},
	selectBeerInPlace: function(source, index, item, e, evObj) {
		setTimeout(function(){source.deselect(index);},500);
		var container = Ext.getCmp("containerbeerselected"),
			beerSelected = Ext.getCmp("beerSelectedInfoContent");

		if (beerSelected) {
			var nationAvatar = (_.isEmpty(e.data.nationality)) ? "_":(e.data.nationality).toLowerCase();

           beerSelected.setHtml(
            "<div class='search-new-beer'>"+
            "<div class='beer-selected'>"+
            "<img class='beer-selected-image' src='"+utils.getBeerColorImage(e.data)+"' />"+
            "<img class='beer-selected-flag' src='resources/flags/"+nationAvatar+".png'>"+
            "<div class='beer-selected-name'>"+_.titleize(e.data.name)+"</div>"+
            "<div class='beer-selected-style'>"+utils.getBeerStyleFromCode(e.data.beerstyle)+
            (e.data.beertype ? " - " + utils.getBeerTypeFromCode(e.data.beertype): "")+"</div>"+
            "</div>"+
            /*
            "<div class='search-new-beer-button'>"+
            "<div class='search-new-beer-text'>"+i18n.app.CHANGE_BEER+"</div><div class='search-new-beer-logo'></div>"+
            "</div>"+*/
	"<div class='search-new-beer-button x-button x-iconalign-left x-button-beerwhite bg_beer'>"+
							"<span class='x-button-icon search x-icon-mask'></span><span class='x-button-label'>"+i18n.app.CHANGE_BEER+"</span>"+
						"</div>"+
            
            "</div>");
			/*beerSelected.setHtml(
				"<div class='search-new-beer'>"+
				"<div class='search-new-beer-button'>"+
				"<div class='search-new-beer-text'>"+i18n.app.CHANGE_BEER+"</div><div class='search-new-beer-logo'></div></div>"+
				"</div>"+
				"<div class='beer-selected'>"+
				"<img class='beer-selected-image' src='"+utils.getBeerColorImage(e.data)+"' />"+
				"<img class='beer-selected-flag' src='resources/flags/"+nationAvatar+".png'>"+
					"<div class='beer-selected-name'>"+_.titleize(e.data.name)+"</div>"+
					"<div class='beer-selected-style'>"+utils.getBeerStyleFromCode(e.data.beerstyle)+
						(e.data.beertype ? " - " + utils.getBeerTypeFromCode(e.data.beertype): "")+"</div>"+

				"</div>");*/
			this.beerSelected = e.data;
			container.setActiveItem(1);
		}
	},
	searchNewBeer: function() {
		var container = Ext.getCmp("containerbeerselected");
		container.setActiveItem(0);
	},
	onCheckIn: function(source, shareOnFB, shareOnTW, jsonUser, jsonPlace, image, rate){
		var beer =  this.beerSelected,
			that = this;
        var infoFB, infoTW;
           
		if (shareOnFB) {
            infoFB = {
				link: HH.FACEBOOK_CALLBACK,
				picture: "",
				caption: i18n.app.TEXT_SHAREFACEBOOK_CAPTION,
				description: i18n.app.TEXT_SHAREFACEBOOK_MESSAGE,
				message: utils.__(i18n.app.TEXT_SHAREFACEBOOK_DESCRIPTION, beer.name, jsonPlace.placeName)
			};

		}

		if (shareOnTW) {
	
           infoTW = {
           link: "",
           picture: "",
           caption: i18n.app.TEXT_SHAREFACEBOOK_CAPTION,
           description: i18n.app.TEXT_SHAREFACEBOOK_MESSAGE,
           message: utils.__(i18n.app.TEXT_SHAREFACEBOOK_DESCRIPTION, beer.name, jsonPlace.placeName)
           };
		}
        
        if (shareOnFB || shareOnTW){
           this.onShareOnSocial(this, infoFB,infoTW);
        }

		Ext.Ajax.request({
			url: HH.IP_PORT_SERVER+"/birrettaservice/rest/bserv/checkIn",
			method: "POST",
			headers: {
				"btUsername": jsonUser.idUser,
				"btSid": jsonUser.token
			},
			params: {
				idUser: jsonUser.idUser,
				idBeer: beer.idBeer,
				idPlace: jsonPlace.idPlace,
				image: image,
				rate: rate,
				rate2: rate,
				rate3: rate
			},
			failure: function(response) {
				HH.log("FAIL: " + response.responseText);
				that.updateProfile();
			},
			success: function(response) {
			/*  var all = Ext.getStore("Badges_Ajax").getData().all, i = 0,
					values = [];
				for (i = 0; i < all.length; i+=1) {
					values[i] = all[i].data;
				}*/
				var dec = Ext.decode(response.responseText);
				if (dec.response.status.code < 200) {
					var badges = dec.response.metaData.badge,
						currentPoints = dec.response.body.list[0].currentPoints,
						idDrink = dec.response.body.list[0].idDrink,
						drinkin = {
							xtype: "drinkindetail",
							jsonUser: jsonUser,
							jsonBeer: beer,
							jsonPlace: jsonPlace,
							jsonBadges: badges,
							currentPoints: currentPoints,
							idDrink: idDrink,
							id: "drinkindetail",
							rate: rate
						};
					var i=0;
					for(i=0;i<badges.length;i++){
						utils.alert(utils.getBadgeMessage(badges[i].idBadge), utils.getBadgeName(badges[i].idBadge));
					}
					that.getApp().pop();
					that.getApp().push(drinkin);
				} else {
					utils.alert( utils.getErrorMessage(dec.response.status.code), i18n.app.TEXT_FAIL);
					HH.log("Fails: " + dec.response.status.msg);
					Ext.getCmp("submit_checkin_btn").enable();
				}
				that.updateProfile();
			}
		});
	},
	init: function(){
		this.callParent(arguments);
	},
	updateProfile: function(){
		HH.log("places- reload profile");
		Ext.Viewport.fireEvent("refreshProfileStore", this);
		Ext.Viewport.fireEvent("refreshDrinks", this);
		Ext.Viewport.fireEvent("refreshBadges", this);
	}
});




Ext.define("B2B.controller.Camera", {
	extend : "Ext.app.Controller",
	xtype : "camera",
	config : {
		refs : {
			app: "_app",
			userform: "userform",
			cameracontainerpanel : "cameracontainerpanel",
			camerapicker : "camerapicker"
		},
		control : {
			cameracontainerpanel : {
				takePhotoCommand : "takePhoto"
			},
			camerapicker : {
				openCameraCommand : "openCamera",
				openLibraryCommand : "openLibrary"
			},
			userform: {
				chooseProfilePictureCommand: "onChooseProfilePictureCommand"
			}

		}
	},
	onChooseProfilePictureCommand: function(source, imageView){
		this.takePhoto(source, imageView);
	},
	takePhoto : function(source, imageView) {
		this.imageView = imageView;

		if (this.isDevice) {
			if (this.isCameraAvailable) {
				this.getApp().push({
					xtype: "camerapicker"
				});
			} else {
				this.openLibrary();
			}
		} else {
			utils.alert(i18n.app.LABEL_CAMERA_NOT_AVAILABLE, i18n.app.COMMON_ATTENTION);
		}
	},
	openLibrary : function(){
		this.captureFromCamera(false);
	},
	openCamera : function(){
		this.captureFromCamera(true);
	},
	captureFromCamera : function(camera){
		var imageView = this.imageView;
		this.camera.capture({
			success : function(image) {
				if (imageView) {
					imageView.setSrc(image);
				}
			},
			failure : function(e) {
				HH.log('[Camera] Error capture: ' + e);
			},
			quality : 75,
			destination : 'file',
			source : (camera ? 'camera' : 'library')
		});
	},
	launch : function() {
		this.callParent(arguments);
	},
	init : function() {
		this.callParent(arguments);

		this.isDevice = (Ext.browser.is.WebView && (Ext.os.is('Android') || Ext.os.is('iOS')));
		this.isCameraAvailable = true;

		if (!this.camera) {
			this.camera = Ext.device.Camera;
		}
/*
		if (this.isDevice) {
			this.camera.capture({
				success : function(image) {
					this.isCameraAvailable = true;
				},
				source : 'camera'
			});
		}
*/	}
});

Ext.define("B2B.controller.Beers", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			beerSearchComponent: "beersearch",
			beerList: "beer",
			beerForm: "beeraddform",
			beerDetail: "beerdetailpanel",
			beerlist: "beerlist",
			beerlistcomponent: "beerlistselect",
			beerlistcomponent: "beerlistcomponent",
			favoritesbeer : "favoritesbeer",
			spinner: 'tbarspinner',
			app: "_app"
		},
		control:{
			beerSearchComponent: {
				beerAddCommand:	"onShowBeerForm"
			},
			beerSelectSearchComponent: {
				beerAddCommand:	"onShowBeerForm"
			},
			beerForm: {
				beerSaveCommand: "onSaveBeer",
				beerBackCommand: "onBackBeer"
			},
			beerDetail: {
				reportBeerCommand: "onReportBeer",
				beerEditCommand: "onEditBeer",
				backBeerDetailCommand: "onBackBeerDetail",
				addFavoriteBeerCommand: "onAddFavoriteBeer"
			},
			beerList: {
				viewBeerDetailCommand: "onViewBeerDetail"
			},
			beerlist: {
				itemtap: "onViewBeerDetail"
			},
			beerlistcomponent: {
				itemtap: "onSelectBeer"
			},
			beerSelectContainer:{
				backBeerSelectCommand: "onBackBeerSelect"
			},
			favoritesbeer:{
				backFavoritesCommand: "onBackBeerSelect"
			}
		}
	},
	onShowBeerForm: function(){
		Ext.getCmp("beerlist").setMasked(true);
		var beeraddform = {
			xtype: "beeraddform",
			id: 'beeraddform'
		};

		var appcontainer = this.getApp();
		appcontainer.add(beeraddform);
		appcontainer.setActiveItem(2);

	},
	onSaveBeer: function(){
		var user = Ext.getStore("Profile_Local").first().data;
		var spinner = this.getSpinner();
		if(spinner.isHidden()) spinner.show();
		var beerForm = this.getBeerForm();
		var that=this;
		//nel db occorre salvare i gradi nel formato 3.4 (text e non tramite value)
		var grad=Ext.getCmp("selectfieldgrad")._value.data;
		grad.value=grad.text;
		beerForm.submit({
			url: HH.IP_PORT_SERVER+'/birrettaservice/rest/bserv/insertBeer',
			method: 'POST',
			headers: {
        		"btUsername": user.idUser,
        		"btSid": user.token
    		},
			success: function() {
				Ext.getStore("Beers_Ajax").load();
				Ext.getCmp("beerlist").setMasked(false);
				utils.alert(i18n.app.TEXT_SAVEBEER_OK);
				if(!spinner.isHidden()) spinner.hide();
				var app = that.getApp();
				var beeraddform = Ext.getCmp('beeraddform');
				beeraddform.reset();
				app.remove(beeraddform);
			},
			failure: function(form, action) {
				utils.alert(i18n.app.TEXT_SAVEBEER_FAILURE);
				if(!spinner.isHidden()) spinner.hide();
				var app = Ext.getCmp('_app');
				var beeraddform = Ext.getCmp('beeraddform');
				beeraddform.reset();
				app.remove(beeraddform);

			}
		});
		Ext.getCmp("add_beer_btn").enable();
	},
	onBackBeer: function(){
		Ext.getCmp("add_beer_btn").enable();
		Ext.getCmp("beerlist").setMasked(false);
		var app = this.getApp();
		var beeraddform = Ext.getCmp('beeraddform');
		beeraddform.reset();
		app.remove(beeraddform);
	},
	onBackBeerSelect: function(){
		if(Ext.getCmp("beerlist"))
			Ext.getCmp("beerlist").setMasked(false);
		this.getApp().pop();
	},
	onViewBeerDetail: function(a, b, c, record){
		Ext.getCmp("beerlist").setMasked(true);
		/* List Selection Deactivation */
		setTimeout(function(){a.deselect(b);},500);
		/* Since we used a subset list for list binding, on Beer Details we have to get
			the original value, we cannot use the index, which change upon filtering */
		var ajax_store = Ext.getStore('Beers_Ajax');
		//var jsonData = ajax_store.getAt(ajax_store.findExact("name", record.data.name));
		var idBeer=record.data.idBeer;
		var user = Ext.getStore("Profile_Local").first().data;
		var that =this;
		Ext.Ajax.request({
			url: HH.IP_PORT_SERVER+"/birrettaservice/rest/bserv/findBeerById",
			method: "GET",
		//	type: "jsonp",
			headers: {
				"btUsername": user.idUser,
				"btSid" : user.token
			},
			params: {
					idUser: user.idUser,
					idBeer: idBeer
			},
			failure: function(response) {
				that.getApp().push({
					xtype: "beerdetailpanel",
					id: "beerdetailpanel",
					jsonData: record
				});
			},
			success: function(response) {
				var dec = Ext.decode(response.responseText);
				if (dec.response.status.code < 200) {
					record.data.rate = dec.response.body.list[0].rate;
					//aggiornare tutti campi birra!!
					that.getApp().push({
						xtype: "beerdetailpanel",
						id: "beerdetailpanel",
						jsonData: record
					});
				}
				else{
					that.getApp().push({
					xtype: "beerdetailpanel",
					id: "beerdetailpanel",
					jsonData: record
				});
				}
			}
		});
	},
	onBackBeerDetail: function(){
		if(Ext.getCmp("beerlist"))
			Ext.getCmp("beerlist").setMasked(false);
		this.getApp().pop();
	},
	onAddFavoriteBeer: function(a, beer){
		/*var newFavorite = Ext.create("B2B.model.FavoriteBeer", {
			'idBeer': beer.idBeer,
			'beerName': beer.name
		});*/
		var store = Ext.getStore('FavoriteBeers_Local');
		if(store.indexOf(beer)<0)
		{

			store.add(beer.data);
			//store.sync()
			HH.log("-- Added Beer " + beer.data.name+" to store (now "+store.getCount()+" items)");
			Ext.getCmp('addbeerfavorite').setUi('action');
		} else{
			store.remove(beer);
			HH.log("-- Removed Beer " + beer.data.name+" to store (now "+store.getCount()+" items)");
			Ext.getCmp('addbeerfavorite').setUi('small');
		}
		Ext.getCmp("addbeerfavorite").enable();
	},
	onSelectBeer: function(){

	},
	/* Not Yet Implemented */
	onEditBeer: function(){
		utils.alert('TODO: Event EditBeer Received, Next release');
	},
	onDeleteBeer: function(){
		utils.alert('TODO: DeleteBeer Not Implemented');
	},
	onReportBeer: function(a,beer){
		if (!a.actions){
			a.actions = Ext.Viewport.add({
				xtype: 'actionsheet',
				zIndex: 9999,
				items: [
					{
						text: i18n.app.BTN_BEERREPORTXL,
						scope: this,
						ui: 'decline',
						handler: function(){
							var user = Ext.getStore("Profile_Local").first().data;

							Ext.Ajax.request({
								url: HH.IP_PORT_SERVER+'/birrettaservice/rest/bserv/reportIncorrectBeer',
								method: 'POST',
								headers: {
					        		"btUsername": user.idUser,
					        		"btSid": user.token
					    		},
						    	params: {
									idUser: user.idUser,
									idBeer: beer.idBeer,
									name: beer.name,
									brewery: beer.brewery,
									beerstyle: beer.beerstyle,
									beertype: beer.beertype,
									grad: beer.grad,
									nationality: beer.nationality,
									description: beer.description,
								},
								success: function() {
									utils.alert(i18n.app.DIALOG_BEERREPORTED);
								},
								failure: function(form, action) {
									utils.alert("error");
								}
							});
							a.actions.hide();
						}
					},
					{
						text: i18n.app.BTN_BEERSUGGESTEDIT,
						scope: this,
						handler: function(){
							HH.log(a.jsonData);
							a.actions.hide();

							var beeraddform = {
								xtype: "beeraddform",
								id: 'beeraddform'
							};

							var appcontainer = this.getApp();
							appcontainer.add(beeraddform);
						//appcontainer.setActiveItem(2);

							var beerForm = this.getBeerForm();
							beerForm.setRecord(beer);
						}
					},
					{
						text: i18n.app.BTN_CANCEL,
						scope: this,
						handler: function(){
							a.actions.hide();
						}
					}
				]
			});
		}
		a.actions.show();
	},
	launch: function(){
		this.callParent(arguments);
	},
	init: function(){
		this.callParent(arguments);
	}
});

Ext.define("B2B.controller.Message", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			app: "_app",
		},
		control: {
			app: {
				message: "onMessage"
			}
		}
	},
	onMessage: function(a, msg, action){

	},
	onBadge: function(a, msg, action){

	},
	init: function(){
		this.callParent(arguments);
	}
});




Ext.define("B2B.controller.Friend_Detail", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			friendDetailContainer: "frienddetailcontainer",
			friendcustom: "friendcustom",
			friendlistcustom: "friendlistcustom",
			friendlistdetail: "friendlistdetail",
			drinklistcustomcontainer: "drinklistcustomcontainer",
			app: "_app"
		},
		control: {
			drinklistcustomcontainer: {
				backToProfileCommand: "onBackListOfFriendOfFriend",
				switchViewCommand: "onSwitchView"
			},
			friendDetailContainer: {
				removeFriendDetailCommand: "onRemoveFriend",
				backFriendDetailCommand: "onBackFriend"
			},
			friendlistdetail: {
				friendsProfileCommand: "onShowListOfFriend",
				badgesProfileCommand: "onShowBadges",
				drinkListProfileCommand: "onShowDrinkList"
			},
			friendcustom:{
				backToProfileCommand: "onBackListOfFriendOfFriend"
			},
			friendlistcustom:{
				itemtap: "friendlistcustomitemtap"
			}
		}
	},
	onBackListOfFriendOfFriend: function(){
		var appcontainer = this.getApp(),
			friendcustom = Ext.getCmp('friendcustom'),
			drinklistcustomcontainer = Ext.getCmp('drinklistcustomcontainer');
		appcontainer.remove(friendcustom, true);
		appcontainer.remove(drinklistcustomcontainer, true);
	},
	onRemoveFriend: function(){
		var removeIt = function(){
			this.getApp().pop();
		};

		confirm(i18n.app.DIALOG_YOUSURE, removeIt);
	},
	onBackFriend: function(){
		Ext.getCmp("friend").setMasked(false);

		var appcontainer = this.getApp(),
			friendpanel = Ext.getCmp('frienddetailcontainer');
		appcontainer.remove(friendpanel, true);
	},
	//per lista amici di amcici
	onShowListOfFriend: function(){
    	this.getApp().push({
			xtype: "friendcustom",
			id: "friendcustom",
		});
	},
	onShowDrinkList: function() {
		this.getApp().push({
			xtype: "drinklistcustomcontainer",
			id: "drinklistcustomcontainer",
		});
	},
	friendlistcustomitemtap: function(friendlist, b, c, record){
		setTimeout(function(){friendlist.deselect(b);},100);
	},
	onSwitchView: function() {
		var view = Ext.getCmp("drinklistcustomcontainer"),
			btn = Ext.getCmp("changeCustomViewButton"),
			map = Ext.getCmp("mapDrinksCustom");

		if (btn.getText() === i18n.app.BTN_MAP) {
			btn.setText(i18n.app.BTN_LIST);
			view.setActiveItem(0);
		} else {
			btn.setText(i18n.app.BTN_MAP);
			view.setActiveItem(1);
		}
	},
	launch: function(){
		this.callParent(arguments);
	},
	init: function(){
		this.callParent(arguments);
	}
});

Ext.define("B2B.controller.Places", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			place: "place",
			placelist: "placelist",
			appContainer: "appcontainer",
			beerDetail: "beerdetailpanel",
			app: "_app"
		},
		control: {
			place: {
				backCheckCommand: "onBackCheck"
			},
			placelist: {
				itemtap: "onViewPlaceDetail"
			},
			appContainer: {
				drinkInCommand: "onDrinkIn"
			},
			beerDetail: {
				drinkInCommand: "onDrinkIn"
			}
		}
	},
	onDrinkIn: function(source, beerSelected) {
		var place = {
			xtype: 'place',
			id: 'place'
		};

		this.beerSelected = beerSelected;

		if (Ext.getCmp("beerlist")) {
			Ext.destroy([Ext.getCmp("beerlist"), Ext.getCmp("beersearch")]);
		}

		if (Ext.getCmp("favoritesbeer")) {
			Ext.destroy([Ext.getCmp("favoritesbeer")]);
		}

		if (Ext.getCmp("beerdetailpanel")) {
			Ext.destroy([Ext.getCmp("beerdetailpanel")]);
		}

		appcontainer = this.getApp();
		appcontainer.add(place);
	},
	onBackCheck: function(){
		var appcontainer = this.getApp(),
			place = Ext.getCmp('place'),
			beers = Ext.getCmp('beers');

		if (beers) {
			beers.add([
			{
				xtype: 'beersearch',
				id: 'beersearch'
			},
			{
				xtype: 'beerlist',
				id: 'beerlist',
				store: null,
				singleSelect: true,
				scrollable : {
					translationMethod : 'cssTransform'
				}
			}]);
		}

		if (place) {
			appcontainer.remove(place, true);
		}
	},
	onViewPlaceDetail: function(a, b, c, record){
		setTimeout(function(){a.deselect(b);},500);
		Ext.getCmp("placelist").setMasked(true);
		var jsonData = record.data,
			appcontainer = this.getApp();

		appcontainer.add({
			xtype: "placedetail",
			id: "placedetail",
			jsonData: jsonData,
			jsonBeer: this.beerSelected
		});
	},
	init: function(){
		this.callParent(arguments);
	},
	updateProfile: function(){
		HH.log("places- reload profile");
		Ext.Viewport.fireEvent("refreshProfileStore", this);
		Ext.Viewport.fireEvent("refreshBadges", this);
	}
});




// Bridge between native functions and js

function isAndroid(){

		return (Ext.os.is.Android);
	};



function initEnableLog(enabled) {
    console.log("BRIDGEEEEEEEEEEE: initEnableLog" + enabled);
    bridge.enableLog = enabled;
};

function facebookLogInStatus(isLoggedIn) {
	//console.log("BRIDGEEEEEEEEEEE: facebookLogInStatus" + isLoggedIn);
	if (isLoggedIn){
		bridge.getFBUserInformations();
	} else {
		if (Ext.fly('appLoadingIndicator')) {
			Ext.fly('appLoadingIndicator').destroy();
		}
		Ext.Viewport.removeAll(true, true);
		Ext.Viewport.add(Ext.create('B2B.view._Login'));
	}
};

function loginOnFBCompleted(error, user) {
	//console.log("BRIDGE: loginOnFBCompleted" + error);
	bridge.pendingRequest = false;
    
	if (error && user && error.success) {
        //console.log("BRIDGE: loginOnFBCompleted" + error);
		authentication.loginOnFBCompleted(user.idFB, user.email, user.displayName, user.gender, user.nationality, user.birthDate);
	} else {
		authentication.errorInFacebook(error && error.appNeedRestart);
	}
};

function loginOnTWCompleted(error, user) {
	//console.log("BRIDGEE: loginOnTWCompleted " + user.idTw);
	bridge.pendingRequest = false;
    if (error &&  !error.success && error.cancel){
        Ext.Viewport.setMasked(false);
    }else if (error && user && error.success) {
		authentication.loginOnTWCompleted(user.idTw, user.displayName, user.nationality, user.avatar);
	} else {
		authentication.errorInFacebook(error && error.appNeedRestart);
	}
};

function addNewAccountFBCompleted(error, user) {
	bridge.pendingRequest = false;
    
	if (error && user && error.success) {
        //console.log("BRIDGE: addNewAccountFBCompleted" + error);
		authentication.addNewAccountFBCompleted(user.idFB, user.email);
	} else {
		authentication.errorInFacebook(error && error.appNeedRestart);
	}
};

function addNewAccountTWCompleted(error, user) {
	//console.log("BRIDGEE: loginOnTWCompleted" + user.idTw);
	bridge.pendingRequest = false;
    
	if (error && user && error.success) {
		authentication.addNewAccountTWCompleted(user.idTw);
	} else {
		authentication.errorInFacebook(error && error.appNeedRestart);
	}
};

// Se null allora � stato generato un errore
function facebookFriendsCompleted(error, arrayFriends, firstPageFriends) {
	bridge.pendingRequest = false;
	Ext.getCmp("friendinvitelist").setMasked(false);
    Ext.Viewport.setMasked(false);
	var store = Ext.getStore("Friends_Facebook_Local");

	store.removeAll();
	Ext.Array.each(arrayFriends, function(record) {
		store.add(record);
	});
	store.sync();

	var minstore = Ext.getStore("Min_Friends_Facebook_Local");
	
	minstore.removeAll();
	Ext.Array.each(firstPageFriends, function(record) {
				   minstore.add(record);
				   });
	minstore.sync();

	var visualizedstore = Ext.getStore("Visualized_Friends_Facebook_Local");
	visualizedstore.removeAll();
	
	minstore.each(function(record){
				visualizedstore.add(record.copy());
				});
	
	visualizedstore.sync()
	
	if (error && !error.success) {
		authentication.errorInFacebook(error && error.appNeedRestart);
	}
};

function newFacebookFriendsPageCompleted(pageFriends)
{
	//console.log("newFacebookFriendsPageCompleted" + pageFriends);
	
	var minstore = Ext.getStore("Min_Friends_Facebook_Local");
	
	minstore.removeAll();
	
	Ext.Array.each(pageFriends, function(record) {
				   minstore.add(record);
				   });
	minstore.sync();
	
	var visualizedstore = Ext.getStore("Visualized_Friends_Facebook_Local");
	visualizedstore.removeAll();
	
	minstore.each(function(record){
				  visualizedstore.add(record.copy());
				  });
	
	visualizedstore.sync()
}

function inviteFriendOnSocialCompleted(success, already) {
	bridge.pendingRequest = false;
	Ext.Viewport.setMasked(false);

	if (success) {
		var store = Ext.getStore("Visualized_Friends_Facebook_Local");
		var lstore = Ext.getStore("Friends_Facebook_Local");
		if (!_.isEmpty(bridge.idFacebookFriendInvite))
		{
			var index = store.find("idFacebook",bridge.idFacebookFriendInvite)
			if (index>-1)
			{
				var currentRecord = store.getAt(index);
				currentRecord.set('invited', true);
			}
			index = lstore.find("idFacebook",bridge.idFacebookFriendInvite)
			if (index>-1)
			{
				var currentRecord = lstore.getAt(index);
				currentRecord.set('invited', true);
			}
            
            index = store.find("idTwitter",bridge.idFacebookFriendInvite)
			if (index>-1)
			{
				var currentRecord = store.getAt(index);
				currentRecord.set('invited', true);
			}
			index = lstore.find("idTwitter",bridge.idFacebookFriendInvite)
			if (index>-1)
			{
				var currentRecord = lstore.getAt(index);
				currentRecord.set('invited', true);
			}
		}
		utils.alert(i18n.app.TEXT_INVITEFRIEND_SUCCESS, i18n.app.TEXT_CONGRATULATION);
	} else if (already){
        var store = Ext.getStore("Visualized_Friends_Facebook_Local");
		var lstore = Ext.getStore("Friends_Facebook_Local");
		if (!_.isEmpty(bridge.idFacebookFriendInvite))
		{
			var index = store.find("idFacebook",bridge.idFacebookFriendInvite)
			if (index>-1)
			{
				var currentRecord = store.getAt(index);
				currentRecord.set('invited', true);
			}
			index = lstore.find("idFacebook",bridge.idFacebookFriendInvite)
			if (index>-1)
			{
				var currentRecord = lstore.getAt(index);
				currentRecord.set('invited', true);
			}
            
            index = store.find("idTwitter",bridge.idFacebookFriendInvite)
			if (index>-1)
			{
				var currentRecord = store.getAt(index);
				currentRecord.set('invited', true);
			}
			index = lstore.find("idTwitter",bridge.idFacebookFriendInvite)
			if (index>-1)
			{
				var currentRecord = lstore.getAt(index);
				currentRecord.set('invited', true);
			}
		}
		utils.alert(i18n.app.TEXT_INVITEFRIEND_AGAIN, i18n.app.TEXT_FAIL);
	}
    else
    {
        utils.alert(i18n.app.TEXT_INVITEFRIEND_FAIL, i18n.app.TEXT_FAIL);
    }
};

function postOnFacebookCompleted(success) {
	bridge.pendingRequest = false;
	Ext.Viewport.setMasked(false);

	if (success) {
		utils.alert(i18n.app.TEXT_SHAREFACEBOOK_OK, i18n.app.TEXT_CONGRATULATION);
	} else {
		utils.alert(i18n.app.TEXT_SHAREFACEBOOK_FAIL, i18n.app.TEXT_FAIL);
	}
};

function postOnTwitterCompleted(success) {
	bridge.pendingRequest = false;
	Ext.Viewport.setMasked(false);
    
	if (success) {
		//utils.alert(i18n.app.TEXT_SHAREFACEBOOK_OK, i18n.app.TEXT_CONGRATULATION);
	} else {
		utils.alert(i18n.app.TEXT_SHAREFACEBOOK_FAIL, i18n.app.TEXT_FAIL);
	}
};

function logoutCompleted() {
	window.location.reload();
    bridge.FBSession = false;
    bridge.TWSession = false;
};

function removeFBId(success) {
    //console.log("removeFBId");
    bridge.FBSession = success;
    Ext.Viewport.fireEvent("refreshSettings", this);
};

function removeTwId(success) {
    bridge.TWSession = success;
    Ext.Viewport.fireEvent("refreshSettings", this);
};

function pushNotificationSendRequest(token){
    console.log("BRIDGEE: pushNotificationSendRequest" + token);
    
    var deviceTye;
    if (!isAndroid())
    {
        deviceTye = 0;
    }
    else
    {
        deviceTye = 1;
    }
    

    var profileStore = Ext.getStore("Profile_Local");
     console.log("BRIDGEE: pushNotificationSendRequest" + profileStore.getCount());
    if (profileStore.getCount() > 0) {
      
    var user = profileStore.first().data;
     Ext.Ajax.request({
     url: HH.IP_PORT_SERVER+"/birrettaservice/rest/bserv/registerPush",
     method: "POST",
    headers: {
        "btUsername": user.idUser,
        "btSid" : user.token
     },
     params: {
        idUser: user.idUser,
        token:token,
        platform:deviceTye
     },

    success: function(result) {
            console.log("pushNotificationSendRequest OKKKKKK");
    },
    failure: function(result) {
            console.log("pushNotificationSendRequest Failure");
    }
    });
    };
};


function viewDidAppear() {

};

function applicationBecomeActive(fbUserIsLoggedIn) {
	if (!fbUserIsLoggedIn && bridge.pendingRequest) {
		bridge.pendingRequest = false;
		Ext.Viewport.setMasked(false);
	}
};

function updateNotificationsCount() {
  //  console.log("updateNotificationsCount");
 //  Ext.Viewport.fireEvent("refreshNotifications", this);
    var numb = utils.getNotificationCount();
  //    console.log(">>>Count numb");
	bridge.updateNotificationCount(numb);
};


/**********************************************************************************************/

var bridge = {
    FBSession : false,
    TWSession : false,
    enableLog: false,
    
pendingRequest: false,
    getFBUserLogInStatus: function() {
        if (Ext.feature.has.Touch) {
            if (!isAndroid())
            {
                //console.log("BRIDGE: facebookLogInStatus");
                var selector = "targets=socialManager:getUserLogInStatus";
                this.sendSelector(selector);
            }
            else
            {
                androidBridge.getUserLogInStatus();
            }
        } else {
            facebookLogInStatus(true);
        }
    },
    getFBUserInformations: function() {
		this.pendingRequest = true;
        //console.log("BRIDGE: getFBUserInformations");
		Ext.Viewport.setMasked({
			xtype: 'loadmask',
			loadingText: i18n.app.HINT_LOADING
		});
		Ext.Viewport.setMasked(true);

		if (Ext.feature.has.Touch) {
			if (!isAndroid())
			{
            //console.log("BRIDGE: getFBUserInformations");
			var selector = "targets=socialManager:getFBUserInformations";
			this.sendSelector(selector);
			}
			else
			{
				androidBridge.getFBUserInformations();
			}

		} else {
			loginOnFBCompleted({success:true, appNeedRestart:false}, {idFB:"02130123103", email:"marco85@gmail.com", displayName:"Marco", gender:"male", nationality:"it_IT", birthDate:"10/09/1983"});
		//	loginOnFBCompleted({success:true, appNeedRestart:false}, {idFB:"02130123102", email:"pippo@gmail.com", displayName:"Pippo", gender:"male", nationality:"it_IT", birthDate:"10/09/1983"});
		//	loginOnFBCompleted({success:true, appNeedRestart:false}, {idFB:"02130123101", email:"Batman@gmail.com", displayName:"Il cavaliere oscuro", gender:"male", nationality:"us_US", birthDate:"10/09/1983"});

		}
	},
doLoginOnSocial: function(social) {
    this.pendingRequest = true;
    
    authentication.setAuthenticationCompleted(false);
    
    Ext.Viewport.setMasked({
                           xtype: 'loadmask',
                           loadingText: i18n.app.HINT_LOADING
                           });
    Ext.Viewport.setMasked(true);
    
    if (Ext.feature.has.Touch) {
        if (!isAndroid())
        {
            //passare il button selezionato
			var selector = "targets=socialManager:doLoginOnSocial:'string'_'" + social + "'";
			this.sendSelector(selector);
        }
        else
        {
            var array = new Array();
            array[0] = social;
            androidBridge.doLoginOnSocial(array);
        }
    } else {
        loginOnFBCompleted({success:true, appNeedRestart:false}, {idFB:"02130123103", email:"marco85@gmail.com", displayName:"Marco", gender:"male", nationality:"it_IT", birthDate:"10/09/1983"});
    }
},
logout: function() {
     if (Ext.feature.has.Touch) {
     if (!isAndroid())
     {
     var selector = "targets=socialManager:logout";
     this.sendSelector(selector);
     }
     else
     {
     androidBridge.logout();
     }
     } else {
     logoutCompleted();
     }
},
	getNewFacebookFriendsPage:function(next)
	{
		if (Ext.feature.has.Touch) {
			if (!isAndroid())
			{
				var selector = "targets=socialManager:getNewFacebookFriendsPage:'boolean'_'" + (next ? "true" : "false") + "'";
				this.sendSelector(selector);
			}
			else
			{
				var array = new Array();
				if (next)
				{
					array[0] = "true";
				}
				else
				{
					array[0] = "false"
				}
				androidBridge.getNewFacebookFriendsPage(array);
			}
		} else {
			newFacebookFriendsPageCompleted([{idFacebook: "02130123102", displayName:"Pippo", haveApp:true, image: "http://graph.facebook.com/sarfraz.anees/picture"},{idFacebook: "02130123101", displayName:"Il cavaliere oscuro", haveApp:true, image: "http://www.compagniadeldado.it/wp-content/uploads/2012/08/batman.gif"}]);
		}
	},
	
	
	getMeetBeerFriends: function()
	{
		if (Ext.feature.has.Touch) {
			if (!isAndroid())
			{
				var selector = "targets=socialManager:getMeetBeerFriends";
				this.sendSelector(selector);
			}
			else
			{
				androidBridge.getMeetBeerFriends();
			}
		} else {}

	},
	
	getFBFriends: function()
	{
		if (Ext.feature.has.Touch) {
			if (!isAndroid())
			{
				var selector = "targets=socialManager:getFBFriends";
				this.sendSelector(selector);
			}
			else
			{
				androidBridge.getFBFriends();
			}
		} else {}

	},

    getTWFriends: function()
	{
		if (Ext.feature.has.Touch) {
			if (!isAndroid())
			{
				var selector = "targets=socialManager:getTWFriends";
				this.sendSelector(selector);
			}
			else
			{
				androidBridge.getTWFriends();
			}
		} else {}
        
	},
	
	refreshSocialFriends: function(reload) {
		this.pendingRequest = true;
		if (!reload){
			var visualizedstore = Ext.getStore("Visualized_Friends_Facebook_Local");
			visualizedstore.removeAll();
		}
		var fbFriends = Ext.getCmp("friendinvitelist");
		fbFriends.setMasked({
			xtype: 'loadmask',
			loadingText: i18n.app.HINT_LOADING
		});

		fbFriends.setMasked(true);

		if (Ext.feature.has.Touch) {
			if (!isAndroid())
			{
				var fbf= Ext.getStore("Friends_Ajax");
				var fid = "[";
				var i = 0;
				var tot = fbf.getCount();
				var record = null;
				for (i = 0; i<tot ;i++)
				{
					record = fbf.getAt(i);
					var data = record.data;
					fid = fid + "{\"idFB\":" + "\""+ data.idFacebook + "\"," + "\"idTW\":" + "\""+ data.idTwitter + "\"" +  "}";
					if (i< tot-1)
					{
						fid = fid + ",";
					}
				}
				fid = fid + "]";
                
		
			var user = Ext.getStore("Profile_Local").first().data;	
			var selector = "targets=socialManager:refreshSocialFriends:'boolean'_'" + (reload ? "true" : "false") + "':'string'_'" + fid  + "':'string'_'" + user.idUser + "':'string'_'" + user.token +"':'string'_'" + HH.IP_PORT_SERVER +"'";
			this.sendSelector(selector);
			}
			else
			{
				var array = new Array();
				if (reload)
				{
					array[0] = "true";
				}
				else
				{
					array[0] = "false"
				}
				
                
				var fbf= Ext.getStore("Friends_Ajax");
				var fid = "[";
				var i = 0;
				var tot = fbf.getCount();
				var record = null;
				for (i = 0; i<tot ;i++)
				{
					record = fbf.getAt(i);
					var data = record.data;
					fid = fid + "{\"idFB\":" + "\""+ data.idFacebook + "\"," + "\"idTW\":" + "\""+ data.idTwitter + "\"" +  "}";
					if (i< tot-1)
					{
						fid = fid + ",";
					}
				}
				fid = fid + "]";
                
					array[1] = fid;
					var user = Ext.getStore("Profile_Local").first().data;
                    array[2] = user.idUser;
                    array[3] = user.token;
                    array[4] = HH.IP_PORT_SERVER;
                
				androidBridge.refreshSocialFriends(array);
			}
		} else {
			facebookFriendsCompleted({success: true, appNeedRestart: false},[{idFacebook: "02130123102", displayName:"Pippo", haveApp:true, image: "http://graph.facebook.com/sarfraz.anees/picture"},{idFacebook: "02130123101", displayName:"Il cavaliere oscuro", haveApp:true, image: "http://www.compagniadeldado.it/wp-content/uploads/2012/08/batman.gif"},{idFacebook: "02130123103", displayName:"Marco", haveApp:true},{idFacebook: "2399913423423", displayName:"Topolino", haveApp:false}],[{idFacebook: "02130123102", displayName:"Pippo", haveApp:true, image: "http://graph.facebook.com/sarfraz.anees/picture"}]);
		}
	},
	idFacebookFriendInvite:null,
	inviteFriendOnSocial: function(idFacebook,idTwitter, title, message) {
		this.pendingRequest = true;
        if (idFacebook){
            this.idFacebookFriendInvite = idFacebook;}
        else if (idTwitter){
            this.idFacebookFriendInvite = idTwitter;
        }
            
		Ext.Viewport.setMasked({
			xtype: 'loadmask',
			loadingText: i18n.app.HINT_LOADING
		});
		Ext.Viewport.setMasked(true);
		
		if (Ext.feature.has.Touch) {
			if (!isAndroid())
			{
			var selector = "targets=socialManager:inviteFriendOnSocial:'string'_'" + idFacebook + "':'string'_'" + idTwitter +"':'string'_'" + title + "':'string'_'" + message + "'";
			this.sendSelector(selector);
			}
			else
			{
				var array = new Array();
				array[0]=idFacebook;
                array[1]=idTwitter;
				array[2]=title;
				array[3]=message;
				androidBridge.inviteFriendOnSocial(array);
				
			}
		} else {
			inviteFriendOnSocialCompleted(true, false);
		}
	},
	postOnSocial: function(infoFB, infoTW) {
		this.pendingRequest = true;

		Ext.Viewport.setMasked({
			xtype: 'loadmask',
			loadingText: i18n.app.HINT_LOADING
		});
		Ext.Viewport.setMasked(true);

		if (Ext.feature.has.Touch) {
			if (!isAndroid())
			{
                var selector = "targets=socialManager:postOnSocial";
                if (infoFB)
                {
                    selector += ":'string'_'" + "f':'string'_'" + infoFB.caption + "':'string'_'" + infoFB.description + "'";
                    selector += ":'string'_'" + infoFB.link + "':'string'_'" + infoFB.picture + "':'string'_'" + infoFB.message + "'";
                }
                if (infoTW)
                {
                    selector += ":'string'_'" + "t':'string'_'" + infoTW.caption + "':'string'_'" + infoTW.description + "'";
                    selector += ":'string'_'" + infoTW.message + "'";
                }
                this.sendSelector(selector);
			}
			else
			{
                var selector = "targets=socialManager:postOnSocial";
                if (infoFB)
                {
                    var array = new Array();
                    array[0]="f";
                    array[1]=infoFB.caption;
                    array[2]=infoFB.description;
                    array[3]=infoFB.link;
                    array[4]=infoFB.picture;
                    array[5]=infoFB.message;
                    androidBridge.postOnSocial(array);
                    
                }
                if (infoTW)
                {
                    var array = new Array();
                    array[0]="t";
                    array[1]=infoTW.caption;
                    array[2]=infoTW.description;
                    array[3]=infoTW.message;
                    androidBridge.postOnSocial(array);

                }
                
			}
		} else {
			
			postOnFacebookCompleted(true);
		}
	},
    updateNotificationCount: function(number)
	{
		if (Ext.feature.has.Touch) {
			if (!isAndroid())
			{
             
				var selector = "targets=socialManager:sentNotificationCount:'int'_'" + number  + "'";
				this.sendSelector(selector);
			}
			else
			{
				//androidBridge.sentNotificationCount();
			}
		} else {}
        
	},
	sendSelector: function(selector) {
		if (Ext.feature.has.Touch && !_.isEmpty(selector)) {
			document.location = "selector://" + selector;
		}
	},
    addNewAccount: function(social) {
        Ext.Viewport.setMasked({
                           xtype: 'loadmask',
                           loadingText: i18n.app.HINT_LOADING
                           });
        Ext.Viewport.setMasked(true);
    
        if (Ext.feature.has.Touch) {
            if (!isAndroid())
            {
                //passare il button selezionato
                var selector = "targets=socialManager:addNewSocialAccount:'string'_'" + social + "'";
                this.sendSelector(selector);
            }
            else
            {
                Ext.Viewport.setMasked(false);
                androidBridge.addNewSocialAccount(social);
            }
        } else {
        }
    
    },
    
loginCompleted: function() {
       if (Ext.feature.has.Touch) {
        if (!isAndroid())
        {
            
             var selector = "targets=socialManager:loginCompleted";
            this.sendSelector(selector);
        
        }
        else
        {
            androidBridge.loginCompleted();
        }
    } else {
    }
},
    
setEnableLog: function(enable) {
    console.log(">>>>>>>>>>>>>> enableLog" +enable);
    if (Ext.feature.has.Touch) {
        if (!isAndroid())
        {
        }
        else
        {
            this.enableLog = enable;
            console.log(">>>>>>>>>>>>>> enableLog" +enable);
            androidBridge.enableACRALog(this.enableLog);
        }
    } else {
    }

},
updateAccounts: function() {
    //console.log("updateAccount");
   /* Ext.Viewport.setMasked({
                           xtype: 'loadmask',
                           loadingText: i18n.app.HINT_LOADING
                           });
    Ext.Viewport.setMasked(true);
    */
    if (Ext.feature.has.Touch) {
        if (!isAndroid())
        {
            //passare il button selezionato
            var profileStore = Ext.getStore("Profile_Local"), idFB = "", idTW="";
            profileStore.sync();
            if (profileStore.getCount() > 0) {
                  Ext.Viewport.fireEvent("refreshSettings", this);
                var data = profileStore.first().data;
                if (data.idFacebook)
                {
                    idFB = data.idFacebook;
                }
                if (data.idTwitter)
                {
                    idTW = data.idTwitter;
                }
                //console.log("updateAccount" + idFB + " " + idTW);
                var selector = "targets=socialManager:updateAccounts:'string'_'" + idFB + "':'string'_'"+ idTW + "'";
                this.sendSelector(selector);
            }
        }
        else
        {
            var profileStore = Ext.getStore("Profile_Local"), idFB = "", idTW="";
            profileStore.sync();
            if (profileStore.getCount() > 0) {
                Ext.Viewport.fireEvent("refreshSettings", this);
                var data = profileStore.first().data;
                if (data.idFacebook)
                {
                    idFB = data.idFacebook;
                }
                if (data.idTwitter)
                {
                    idTW = data.idTwitter;
                }
            }

            var array = new Array();
            array[0]=idFB;
            array[1]=idTW;
            androidBridge.updateAccounts(array);
        }
    } else {
    }
    
}
};

Ext.define("B2B.controller.Drinks", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			profile: "userprofile",
			drinkListContainer: "drinklistcontainerpanel",
			friendlistdetail: "friendlistdetail",
			app: "_app"
		},
		control: {
			profile: {
   			drinkListProfileCommand: "onShowDrinkList"
   		},
   		drinkListContainer: {
				backToProfileCommand: "popCurrentView",
				switchViewCommand: "switchView"
			},
		friendlistdetail:{
				drinkListFriendsProfileCommand: "onShowDrinkListFriend"
			}
		}
	},
	init: function(){
		this.callParent(arguments);
	},
	popCurrentView: function() {
		var appcontainer = this.getApp();
		appcontainer.remove(Ext.getCmp('drinklistcontainerpanel'));
	},
	onShowDrinkList: function() {
		var drinklistcontainerpanel = {
			xtype: 'drinklistcontainerpanel',
			id: 'drinklistcontainerpanel'
		};

		var appcontainer = this.getApp();
		appcontainer.add(drinklistcontainerpanel);
		appcontainer.setActiveItem(2);
	},
	switchView: function() {
		var view = Ext.getCmp("drinklistcontainerpanel"),
			btn = Ext.getCmp("changeViewButton"),
			map = Ext.getCmp("mapDrinks");

		if (btn.getText() === i18n.app.BTN_MAP) {
			btn.setText(i18n.app.BTN_LIST);
			view.setActiveItem(0);
		} else {
			btn.setText(i18n.app.BTN_MAP);
			view.setActiveItem(1);
		}
	}
});

Ext.define("B2B.controller._App_Container", {
	extend: "Ext.app.Controller",
	task: null,
	oldOnlineStatus: false,
	oldAppNeedRestartStatus: false,
	onChangeAppConnectionStatus: function(source) {
		var drinkInButton = Ext.getCmp("drinkInButton"),
			drinkInBeerButton = Ext.getCmp("drinkInBeerButton"),
			text = "", icon = null, ui = "", needRestart = utils.getAppNeedRestart(), that = this;

		if (utils.isOnline() && needRestart && authentication.isAuthenticationCompleted()) {
			utils.setAppNeedRestart(false);

			Ext.Viewport.fireEvent("refreshProfileStore", this);

			text = i18n.app.PANEL_DRINKIN;
			ui = "action";
			icon = "position";
		} else {
			if (utils.isOnline() && !needRestart) {
				text = i18n.app.PANEL_DRINKIN;
				ui = "action";
				icon = "position";
			} else {
				text = i18n.app.TEXT_OFFLINEMODE;
				ui = "decline";
				icon = (needRestart ? "restart" : null);

				if (needRestart) {
					var restartApp = function(button) {
						if (button === 'yes' || button === 2) {
							window.location.reload();
						}
					}
					utils.alert(i18n.app.TEXT_NEEDRESTART, i18n.app.COMMON_ATTENTION, true, restartApp, this);
				} else {
					var over = Ext.getCmp("offlineOverlay");
					if (!over) {
						Ext.Viewport.add({
							xtype: "panel",
							id: "offlineOverlay",
							modal: true,
							showAnimation: {
								type: 'popIn',
								duration: 250,
								easing: 'ease-out'
							},
							hideAnimation: {
								type: 'popOut',
								duration: 250,
								easing: 'ease-out'
							},
							html: '<p>' + i18n.app.HINT_OFFLINE + '</p>',
							centered: true,
							width: 150,
							height: 150,
							styleHtmlContent: true,
							scrollable: false,
							zIndex: 999
						});
					}

					over = Ext.getCmp("offlineOverlay");
					over.show();

					setTimeout(function() {
						var over = Ext.getCmp("offlineOverlay");
						over.hide();
						over.destroy();
					}, 5000);
				}
			}
		}
/*
		if (drinkInButton) {
			drinkInButton.iconElement.removeCls("position");
			drinkInButton.iconElement.removeCls("restart");
			drinkInButton.setText(text);
			drinkInButton.setUi(ui);
			drinkInButton.iconElement.addCls(icon);
			drinkInButton.setIconCls(icon);
		}

		if (drinkInBeerButton) {
			drinkInBeerButton.iconElement.removeCls("position");
			drinkInBeerButton.iconElement.removeCls("restart");
			drinkInBeerButton.setText(text);
			drinkInBeerButton.setUi(ui);
			drinkInBeerButton.iconElement.addCls(icon);
			drinkInBeerButton.setIconCls(icon);
		}
		*/
	},
	launch: function(){
		this.callParent(arguments);

		var that = this;

		this.reachability = function() {
			var needRestart = utils.isOnline() && (utils.isOnline() != that.oldOnlineStatus);

			if (!that.oldOnlineStatus) {
				utils.setAppNeedRestart(false);
			}

			if (!utils.getAppNeedRestart()) {
				utils.setAppNeedRestart(needRestart);
			}

			if (that.oldOnlineStatus != utils.isOnline() || that.oldAppNeedRestartStatus != utils.getAppNeedRestart()) {
				that.onChangeAppConnectionStatus(this);
			}

			that.oldOnlineStatus = utils.isOnline();
			that.oldAppNeedRestartStatus = utils.getAppNeedRestart();
		};

		setInterval(this.reachability, 3000);
	},
	init: function(){
		this.callParent(arguments);

		Ext.Viewport.on("changeAppConnectionStatus", this.onChangeAppConnectionStatus, this);

		this.oldOnlineStatus = utils.isOnline();
		this.oldAppNeedRestartStatus = utils.getAppNeedRestart();
		utils.setAppNeedRestart(false);
	}
});




Ext.define("B2B.controller._Login", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			login: "#btn_login",
            twlogin:"#tw_btn_login",
			register: "#btn_register",
			app: "_app"
		},
		control: {
			login:{
				loginCommand: "onLoginCommand"
			},
           twlogin:{
           twloginCommand: "onTwLoginCommand"
           
           },
			register: {
				registerCommand: "onRegisterCommand"
			}
		}
	},
	onRegisterCommand: function(source, values) {
		values.birthDate = Ext.Date.format(values.birthDate, 'c');
		authentication.registerUserWithParams(values, false);
	},
	onLoginCommand: function() {
		bridge.doLoginOnSocial("f");
	},
    onTwLoginCommand: function() {
        bridge.doLoginOnSocial("t");
    },
	init: function(){
		this.callParent(arguments);
	}
});

Ext.define("B2B.controller.Preferences", {
	extend: "Ext.app.Controller",
	id: "Preferences",
	config: {
		refs: {
			preferencesForm: "userpreferencesform",
			app: "_app"
		},
		control: {
			preferencesForm: {
				showPreferencesCommand: "onShowPreferencesForm",
				savePreferencesCommand: "onSavePreferences",
				backPreferencesCommand: "onBackPreferences",
				toggleTwitterCommand: "onChangeTwitter",
				toggleFacebookCommand: "onChangeFacebook"
			}
		}
	},
	onInitialize: function(){
		/* Got from the profile our option to SHARE on FACEBOOK / TWITTER */
		this.onChangeTwitter(null, Ext.getStore("Profile").first().data.shareTwitter);
		this.onChangeFacebook(null, Ext.getStore("Profile").first().data.shareFacebook);
	},
	onShowPreferencesForm: function(){
		var preferencesForm = this.getPreferencesForm();
		preferencesForm.reset();
		preferencesForm.setRecord(Ext.getStore('Profile_Ajax').first());
	},
	onChangeTwitter: function(a, what){
		/* on Checkbox change we show a credentials */
		if(what){
			var credentialsTwitter = {
				xtype: 'fieldset',
				id: "fieldset_twitter",
				title: i18n.app.PANEL_TWITTER,
				items: [
					{
						xtype: 'textfield',
						name: 'username_twitter',
						label: i18n.app.FORM_USERNAME
					},
					{
						xtype: 'passwordfield',
						name: 'password_twitter',
						label: i18n.app.FORM_PASSWORD
					}
				]
		    };
        	Ext.getCmp("userpreferencesform").add( credentialsTwitter );
        }else{
        	Ext.getCmp("userpreferencesform").remove( Ext.getCmp('fieldset_twitter'), true );
        }
	},
	onChangeFacebook: function(a, what){
		/* on Checkbox change we show a credentials */
		if(what){
			var credentialsFacebook = {
				xtype: 'fieldset',
				id: "fieldset_facebook",
				title: i18n.app.PANEL_FACEBOOK,
				items: [
					{
						xtype: 'textfield',
						name: 'username_password',
						label: i18n.app.FORM_USERNAME
					},
					{
						xtype: 'passwordfield',
						name: 'password_password',
						label: i18n.app.FORM_PASSWORD
					}
				]
			};
        	Ext.getCmp("userpreferencesform").add( credentialsFacebook );
        }else{
        	Ext.getCmp("userpreferencesform").remove( Ext.getCmp('fieldset_facebook'), true );
        }
	},
	onSavePreferences: function(){
		this.closePanel();
	},
	onBackPreferences: function() {
		var profileContainer = Ext.getCmp('userprofile');
		profileContainer.remove(Ext.getCmp('userpreferencesform'));
	},
	closePanel: function() {
		var maninPanel = Ext.getCmp("userprofile");
		maninPanel.animateActiveItem(0, {
			type:'slide',
			direction:'down'
		});
	},
	init: function(){
		this.callParent(arguments);
	}
});





Ext.define("B2B.controller.Synco", {
	extend: "Ext.app.Controller",
	firstLoad: true,
    loginStatus :false,
	storeProfileLocal: null,
	onStartApp: function() {
		HH.log("[Synco] --------> APP STARTED <--------");
		var store = Ext.getStore("Profile_Local");
		store.load();
	},
	onProfileLocalReady: function(source, data, eOpts) {
		var store = Ext.getStore("Profile_Local"),
			viewport = Ext.Viewport;

		HH.log("[Synco] * onProfileLocalReady");

		if (this.firstLoad) {
			if (utils.isOnline()) {
				if (HH.SKIP_LOGIN) {
					Ext.fly('appLoadingIndicator').destroy();
					this.onRefreshProfileStore();
					viewport.removeAll(true, true);
					viewport.add([Ext.create('B2B.view._App')]);
				} else {
                    if (!this.loginStatus)
                    {
                        bridge.getFBUserLogInStatus();
                        this.loginStatus = true;
                    }
				}
			} else {
				viewport.removeAll(true, true);
				viewport.add([Ext.create('B2B.view._App')]);
				this.refreshProfileView();
				viewport.setMasked(false);
			}

			viewport.fireEvent("changeAppConnectionStatus", this);
		}
	},
	onProfileAjaxReady: function(source, data, eOpts) {
		var profile = this.storeProfileLocal;

		HH.log("[Synco] * onProfileAjaxReady");

		this.refreshProfileView();

		if (utils.isOnline() && profile.getCount() > 0 && this.firstLoad) {
			this.firstLoad = false;

			this.onRefreshDrinks();
			this.onRefreshFriends();
			this.onRefreshActivities();
			this.onRefreshNotifications();
		}
	},
	onDrinksReady: function(source, data, eOpts){
		HH.log("[Synco] *onDrinksReady");

		var drinks = Ext.getStore("Drinks_Ajax"),
			latestDrink = Ext.getCmp('mylatestdrink');

		if (latestDrink) {
			if (drinks && drinks.getCount() > 0) {
				latestDrink.setData(drinks.first().data);
			} else {
				latestDrink.setHtml([
					'<div class=" my-activity-list-empty">',
						'<h2>'+utils.__(i18n.app.TEXT_NODRINKFOUND)+'</h2>',
					'</div>'
				].join(""));
			}
		}
	},
	onActivitiesReady: function(source, data, eOpts){
		HH.log("[Synco] * onActivitiesReady");
	},
	onNotificationsReady: function(source, data, eOpts) {
		HH.log("[Synco] * onNotificationsReady");
	},
	onFriendsReady: function(source, data, eOpts) {
		HH.log("[Synco] * onFriendsReady");
	},
	onBadgesReady: function(source, data, eOpts) {
		HH.log("[Synco] * onBadgesReady");
	},
	onRefreshBadges: function(source, idUser) {
		var store = (_.isEmpty(idUser) ? 'Badges_Ajax' : 'Badges_Custom_Ajax');
		this.onRefreshStore(this, store, idUser);
	},
	onRefreshFriends: function(source, idUser){
		var store = (_.isEmpty(idUser) ? 'Friends_Ajax' : 'Friends_Custom_Ajax');
		this.onRefreshStore(this, store, idUser);
	},
	onRefreshActivities: function(){
		this.onRefreshStore(this, 'Activities_Ajax');
	},
	onRefreshNotifications: function() {
		this.onRefreshStore(this, 'Notifications_Ajax');
	},
	onRefreshDrinks: function(source, idUser) {
		var store = (_.isEmpty(idUser) ? 'Drinks_Ajax' : 'Drinks_Custom_Ajax');
		this.onRefreshStore(this, store, idUser);
	},
	onRefreshPlaces: function() {
		this.onRefreshStore(this, 'Places_Ajax');
	},
	onRefreshStore: function(source, storeName, idUser){
		if (!_.isEmpty(storeName)) {
			var storeProfile = this.storeProfileLocal,
				storeJSONP = Ext.getStore(storeName),
				user = null,
				idUs = null;

			if (storeProfile && storeProfile.getCount() > 0) {
				user = storeProfile.first().data;
				idUs = (_.isEmpty(idUser) ? user.idUser : idUser);
				HH.log("LOAD PROFILE FOR " + storeName + " - " + idUs);
				storeJSONP.getProxy().setExtraParam('idUser', idUs);
				storeJSONP.getProxy().setExtraParam('btUsername',user.idUser);
				storeJSONP.getProxy().setExtraParam('btSid', user.token);//user.token
				storeJSONP.getProxy().setExtraParam('maxElement',50);
			}
			storeJSONP.load();
		} else {
			HH.log("[Synco] onRefreshStore - ERROR: Store name not valid. VALUE: " + storeName);
		}
	},
	onRefreshProfileStore: function() {
		var profileLocal = this.storeProfileLocal,
			profileAjax = Ext.getStore('Profile_Ajax'),
			data = null;

		if (profileLocal && profileLocal.getCount() > 0) {
			data = profileLocal.first().data;
			profileAjax.getProxy().setExtraParam("btUsername", data.idUser);
			profileAjax.getProxy().setExtraParam("btSid", data.token);
			profileAjax.getProxy().setExtraParam("username", data.idUser);
			profileAjax.load();
		}
	},
    onRefreshSettings: function() {
        var settings = Ext.getCmp('settings');
        var data =  Ext.getStore('Profile_Local').first().data;
          
        if (settings)
        {

           if (bridge.TWSession)
           {
                settings.setValues({idTwitter: data.idTwitter});
           }
           
           
           if (bridge.FBSession)
           {
                settings.setValues({emailFB : data.email});
           }
        }
    },
	refreshProfileView: function() {
		var profile = null,
			button = Ext.getCmp("userProfileButton");

		if (button && this.storeProfileLocal && this.storeProfileLocal.getCount() > 0) {
			profile = this.storeProfileLocal.first().data;

			if (profile) {
				button.setHtml([
					'<div class="profile_right_panel">',
						'<img id="profile_image" class="avatar_big" src="' + utils.getUserAvatar() + '" />',
						'<h1 class="profile_displayname">',
							profile.displayName,
						'</h1>',
						'<p class="profile_description">',
							profile.description,
						'</p>',
					'</div>',
						'<hr>',
						'<p class="profile_points">',
							utils.getPointLabel(profile, true),
						'</p>',
						'<div class="progress-bar">',
							'<span class="bar" style="width: '+utils.getProgressPoints(profile)+'%"></span>',
							'<span class="points">'+((utils.getMaxPoints(profile) > 0)?utils.getMaxPoints(profile)+' pt.': '')+'</span>',

						'</div>',
						'<div class="callout">',
							'<div class="calloutTip1"><div class="calloutTip2"></div></div><div class="calloutContent">',
								utils.getPointClaim(profile, true),
							'</div>',
						'</div>',
						"<div class='clear'></div>"
				].join(""));
				Ext.getCmp("userBadgesButton").setHtml([
					'<img class="badge" height="56" width="56" src="resources/icons/badge.png" >',
					'<span class="profile_squarebutton">',
						profile.counterBadges + " "+i18n.app.BTN_BADGES,
					'</span>',
				].join(""));
				Ext.getCmp("userDrinkListButton").setHtml([
					'<img class="badge" height="56" width="56" src="resources/icons/drinks.png" >',
					'<span class="profile_squarebutton">',
					profile.counterCheckIns + " "+i18n.app.BTN_DRINKLIST,
					'</span>',
				].join(""));
			}
		}
	},
	launch: function(){
		this.callParent(arguments);
	},
	init: function(){
		this.callParent(arguments);
		this.firstLoad = true;
		this.storeProfileLocal = Ext.getStore("Profile_Local");

		Ext.Viewport.on("startApp", this.onStartApp, this);
		Ext.Viewport.on("refreshStore", this.onRefreshStore, this);
		Ext.Viewport.on("refreshProfileStore", this.onRefreshProfileStore, this);
		Ext.Viewport.on("refreshFriends", this.onRefreshFriends, this);
		Ext.Viewport.on("refreshBadges", this.onRefreshBadges, this);
		Ext.Viewport.on("refreshActivities", this.onRefreshActivities, this);
		Ext.Viewport.on("refreshNotifications", this.onRefreshNotifications, this);
		Ext.Viewport.on("refreshDrinks", this.onRefreshDrinks, this);
		Ext.Viewport.on("refreshPlaces", this.onRefreshPlaces, this);
        Ext.Viewport.on("refreshSettings", this.onRefreshSettings, this);
		//per trovare dettagli amico
		// Ext.Viewport.on("refreshCustomDrinks", this.onRefreshCustomDrinks, this);
		// Ext.Viewport.on("refreshCustomBadges", this.onRefreshCustomBadges, this);
		// Ext.Viewport.on("refreshCustomFriends", this.onRefreshCustomFriends, this);

		Ext.getStore("Profile_Local").on("load", this.onProfileLocalReady, this);
		Ext.getStore("Profile_Ajax").on("refresh", this.onProfileAjaxReady, this);
		Ext.getStore("Friends_Ajax").on("refresh", this.onFriendsReady, this);
		Ext.getStore("Badges_Ajax").on("refresh", this.onBadgesReady, this);
		Ext.getStore("Activities_Ajax").on("refresh",this.onActivitiesReady, this);
		Ext.getStore("Notifications_Ajax").on("refresh", this.onNotificationsReady, this);
		Ext.getStore("Drinks_Ajax").on("refresh",this.onDrinksReady, this);
	}
});

Ext.define('B2B.view.Friend_Invite_List', {
	extend: 'Ext.dataview.List',
	xtype: 'friendinvitelist',
	requires: [
        'Ext.plugin.PullRefresh'
    ],
	config: {
		loadingText: i18n.app.HINT_LOADING,
		plugins: [
			{
				xclass: 'Ext.plugin.PullRefresh',
				pullRefreshText: i18n.app.HINT_PULLDOWN,
				refreshFn: function(plugin) {
					bridge.refreshSocialFriends(true);
				}
			}
		],
		loadMask: true,
		emptyText: [
			'<div class="friend-list-empty-text list-empty-text">',
				'<h1>'+utils.__(i18n.app.TEXT_NOFRIENDFOUND)+'</h1>',
				'<p>'+utils.__(i18n.app.TEXT_WHYADDFRIEND)+'</p>',
			'</div>',
		].join(""),
		itemTpl: new Ext.XTemplate("<div class='{[this.getClass(values)]}'>{[this.getImageURL(values)]}{[this.getString(values)]}</div>",
		{
			getClass: function(values){
				return "friend-list-item-title small-list";
			},
			getImageURL: function(values){
					//resources/beer/style"+values.beerstyle+".png'
					var str = '<img class="avatar_small" src="';
					if (_.isEmpty(values.image)){
						str += HH.default_user32;
					}else{
						str += values.image;
					}
					str += '" width="32" height="32" />';
					return str;
			},
			getString: function(values){
				var tpl = ""
				if(values.haveApp){
					tpl += "<div class='small-list-right'>"+"<img src='resources/img/pin_small.png'>"+"</div>";
                }else if (values.social == 'f' && values.invited)
                {
                    tpl += "<div class='small-list-right'>"+"<img src='resources/img/facebook_icon_disabled.png'>"+"</div>";
                }
                else if (values.social == 'f' && !values.invited){
                    tpl += "<div class='small-list-right'>"+"<img src='resources/img/facebook_icon.png'>"+"</div>";
					//tpl += "<div class='small-list-right'><strong>"+utils.__(i18n.app.TEXT_INVITEFRIEND_FRIENDNOB2B)+"</strong></div>";
				}else if (values.social == 't' && values.invited){
                    tpl += "<div class='small-list-right'>"+"<img src='resources/img/twitter_icon_disabled.png'>"+"</div>";
                }else if (values.social == 't' && !values.invited){
                    tpl += "<div class='small-list-right'>"+"<img src='resources/img/twitter_icon.png'>"+"</div>";
                                   //tpl += "<div class='small-list-right'><strong>"+utils.__(i18n.app.TEXT_INVITEFRIEND_FRIENDNOB2B)+"</strong></div>";
                }
				tpl+="<div class='small-list-text'>"+values.displayName+"</div>";
				return tpl;
			}
		})
	}
});

Ext.define('B2B.view.View_Whatsnew', {
	extend: 'Ext.Panel',
	xtype: 'viewwhatsnew',
	config: {
		title: i18n.app.PANEL_WHATSNEW,
		iconCls: 'settings6',
		styleHtmlContent: true,
        cls: 'slidableToolbar',

		html: [
			'<h1>Whats New</h1>',
			i18n.app.TEXT_LOREM,
		].join("")
	},
	initialize: function(){
        this.callParent(arguments);

        var toolbar = {
            xtype: 'toolbar',
            title: i18n.app.LABEL_WHATSNEW,
            ui: 'beermainflat',
            cls: "sub_titlebar, slidableToolbar",
            docked: 'top',
            id: 'WhatsnewTitlebar',
            defaults: {
                iconMask: true
            }
        };

        this.add([toolbar]);
    }
});

Ext.define('B2B.view.Activity_List_Detail', {
	extend: 'Ext.form.Panel',
	xtype: 'activitylistdetail',
	config: {
		title: i18n.app.PANEL_ACTIVITYDETAIL,
		iconCls: 'add'
	},
	initialize: function(){

    	this.callParent(arguments);

    	var detailbackbutton = {
			xtype: "button",
			text: i18n.app.BTN_BACK,
			ui: 'back',
			id: 'activitylistdetailbackbutton',
			handler: this.onDetailbackbuttonTap,
			scope: this
		},
		detailtoolbar = {
			xtype: 'toolbar',
			cls: 'sub_titlebar',
			docked: 'top',
			items: [
				detailbackbutton
			]
		};
		this.add([detailtoolbar]);
    },
	onDetailbackbuttonTap: function(){
		this.fireEvent("backActivityDetailCommand", this);
	}
});

Ext.define('B2B.view.Feedback_Form', {
	extend: 'Ext.form.Panel',
	xtype: 'feedbackform',
	id: 'feedbackform',

	initialize: function(){
		this.callParent(arguments);

		var components = [
			{
				xtype: "textareafield",
				id: 'textAreaComment',
				src: '',
				flex: 1
			},
			{
				xtype: "button",
				text: i18n.app.BTN_SEND,
				ui: 'action',
				id: 'sendcomment_btn',
				handler: this.onSendButtonTap,
				scope: this,
				height: 50
			}
		];

		this.add(components);
	},
	onSendButtonTap: function(){
		this.fireEvent("sendCommentCommand", this);
	}
});

Ext.define('B2B.view.Generic_Profile', {
	extend: 'Ext.Container',
	xtype: 'genericprofile',
	config: {
		scrollable: false,
		layout: 'vbox'
	},
	profileJson: null,
	isCurrentProfile: true,
	badgesButtonId: 'genericBadgesButton',
	profileButtonId: 'genericProfileButton',
	drinkListButtonId: 'genericDrinkListButton',
	friendsButtonId: 'genericFriendsButton',
	favoritesButtonId: 'genericFavoritesButton',
	myActivityButtonId: 'genericMyActivityButton',
	settingsButtonId: 'genericSettingsButton',
	thirdButtonsContainerId: 'thirdButtonsContainer',
	showThirdButtonsContainer: true,
	initialize: function(){
		this.callParent(arguments);

		var profile = {
				displayName: "",
				description: "",
			},
			getProfileHTML = function(profile, isCurrentProfile) {
				var str = "";

				if (profile) {
					str = ['<div class="profile_right_panel">',
						'<img id="profile_image" class="avatar_big" src="' + (isCurrentProfile ? utils.getUserAvatar() : utils.getFriendAvatar(profile.idUser)) + '" />',
						'<h1 class="profile_displayname">',
							profile.displayName,
						'</h1>',
						'<p class="profile_description">',
							profile.description,
						'</p>',
					'</div>',
						'<hr>',
						'<p class="profile_points">',
							utils.getPointLabel(profile, isCurrentProfile),
						'</p>',
						'<div class="progress-bar">',
						    '<span class="bar" style="width: '+utils.getProgressPoints(profile)+'%"></span>',
							'<span class="points">'+((utils.getMaxPoints(profile) > 0)?utils.getMaxPoints(profile)+' pt.': '')+'</span>',

						'</div>',
						'<div class="callout">',
							'<div class="calloutTip1"><div class="calloutTip2"></div></div><div class="calloutContent">',
								utils.getPointClaim(profile, isCurrentProfile),
	    					'</div>',
	    				'</div>',
						'<div class="clear"></div>'
					].join("");
				}

				return str;
			};

		if (this.profileJson) {
			profile = this.profileJson;
		}

		var profileButton = {
			// id: 'profile_btn',
			id: this.profileButtonId,
			cls: 'generic-profile-button',
			xtype: 'button',
			ui: 'beerwhite',
			margin: '4px 10px',
		//	text: i18n.app.BTN_PROFILE,
		//	badgeText: i18n.app.BTN_PROFILE,
			//flex: 2,
			html: getProfileHTML(profile, this.isCurrentProfile),
			handler: this.onEditProfileButtonTap,
			scope: this
		},
		badgesButton = {
			id: this.badgesButtonId,
			xtype: 'button',
			ui: 'beergreen',
			cls: 'profile_square',
			width: "100px",
			height: "80px",
			margin: '1px 2px',
			//text: i18n.app.BTN_BADGES,
			html: [
				'<img class="badge" height="56" width="56" src="resources/icons/badge.png" >',
				'<span class="profile_squarebutton">',
					profile.counterBadges + " "+i18n.app.BTN_BADGES,
				'</span>',
			].join(""),
			//flex: 1,
			handler: this.onBadgesButtonTap,
			scope: this
		},
		drinkListButton = {
			// id: 'drinklist_btn',
			id: this.drinkListButtonId,
			xtype: 'button',
			ui: 'beerblue',
			cls: 'profile_square',
			width: "100px",
			height: "80px",
			margin: '1px 2px',
			//text: i18n.app.BTN_DRINKLIST,
			html: [
				'<img class="badge" height="56" width="56" src="resources/icons/drinks.png" >',
				'<span class="profile_squarebutton">',
					profile.counterCheckIns + " "+i18n.app.BTN_DRINKLIST,
				'</span>',
			].join(""),
			flex: 1,
			handler: this.onDrinkListButtonTap,
			scope: this
		},
		myActivityButton = {
			xtype: 'button',
			// id: 'myactivity_btn',
			id: this.myActivityButtonId,
			cls: 'profile_square',
			ui: 'beerred',
			width: "100px",
			height: "80px",
			margin: '1px 2px',
			//text: i18n.app.BTN_MYACTIVITY,
			html: [
				'<img class="badge" height="56" width="56" src="resources/icons/time_clock.png" >',
				'<span class="profile_squarebutton">',
					i18n.app.BTN_MYACTIVITY,
				'</span>',
			].join(""),
			flex: 1,
			handler: this.onMyActivityButtonTap,
			scope: this
		},
		favoritesButton = {
			// id: 'favorites_btn',
			id: this.favoritesButtonId,
			xtype: 'button',
			ui: 'beercyan',
			cls: 'profile_square',
			width: "100px",
			height: "80px",
			margin: '1px 2px',
			//text: i18n.app.BTN_FAVORITES,
			html: [
				'<img class="badge" height="56" width="56" src="resources/icons/star.png" >',
				'<span class="profile_squarebutton">',
					i18n.app.BTN_FAVORITES,
				'</span>',
			].join(""),
			flex: 1,
			handler: this.onFavoritesButtonTap,
			scope: this
		},
		friendsButton = {
			// id: 'friends_btn',
			id: this.friendsButtonId,
			xtype: 'button',
			ui: 'beeryellow',
			cls: 'profile_square',
			width: "100px",
			height: "80px",
			margin: '1px 2px',
			//text: i18n.app.BTN_FRIENDS,
			html: [
					'<img class="badge" height="56" width="56" src="resources/icons/friends.png" >',
					'<span class="profile_squarebutton">',
						i18n.app.BTN_FRIENDS,
					'</span>',
			].join(""),
			flex: 1,
			handler: this.onFriendsButtonTap,
			scope: this
		},
		settingsButton = {
			// id: 'settings_btn',
			id: this.settingsButtonId,
			xtype: 'button',
			ui: 'beerviolet',
			cls: 'profile_square',
			width: "100px",
			height: "80px",
			margin: '1px 2px',
			//text: i18n.app.BTN_STATS,
			html: [
					'<img class="badge" height="56" width="56" src="resources/icons/settings.png" >',
					'<span class="profile_squarebutton">',
						i18n.app.BTN_SETTINGS,
					'</span>',
			].join(""),
			flex: 1,
			handler: this.onSettingsButtonTap,
			scope: this
		},
		secondRowButtonsContainer = {
			xtype: 'panel',
			//flex: 1,
			padding: '0px 4px',
			layout: {
				type: 'hbox',
				pack: 'center'
			},
			items: [
				badgesButton,
				drinkListButton,
				friendsButton
			]
		},
		thirdButtonsContainer = {
			xtype: 'panel',
			id: this.thirdButtonsContainerId,
			//flex: 1,
			padding: '0 4 4 4',
			layout: {
				type: 'hbox',
				pack: 'center'
			},
			items: [
				favoritesButton,
				myActivityButton,
				settingsButton
			]
		},
		array = [profileButton, secondRowButtonsContainer];

		if (this.showThirdButtonsContainer) {
			array.push(thirdButtonsContainer);
		} else {
			array.push({ xtype: 'spacer' });
		}

		this.title = i18n.app.PANEL_FRIENDDETAIL;

		this.add(array);
	},
	onEditProfileButtonTap: function() {
		this.fireEvent("editProfileCommand", this);
	},
	onSettingsButtonTap: function() {
		this.setMasked(true);
		this.fireEvent("settingsCommand", this);
	},
	onBadgesButtonTap: function() {
		this.setMasked(true);
		this.fireEvent("badgesProfileCommand", this);
	},
	onDrinkListButtonTap: function() {
		this.setMasked(true);
		this.fireEvent("drinkListProfileCommand", this);
	},
	onMyActivityButtonTap: function() {
		this.setMasked(true);
		this.fireEvent("activityListProfileCommand", this);
	},
	onFavoritesButtonTap: function() {
		this.setMasked(true);
		this.fireEvent("favoritesProfileCommand", this);
	},
	onFriendsButtonTap: function() {
		this.setMasked(true);
		this.fireEvent("friendsProfileCommand", this);
	},
	refreshProfileData: function() {
		this.fireEvent("reloadProfileCommand", this);
	}
});

Ext.define('B2B.view.Landing_DrinkIn', {
	extend: 'Ext.Panel',
	xtype: 'landingdrinkin',
	config: {
		title: i18n.app.LABEL_FRIENDS,
        layout: {
        	type: 'fit'
        }
	},
	initialize: function(){

    	this.callParent(arguments);
  
      	var continueButton = {
          text: i18n.app.BTN_CONTINUE,
          ui: 'back',
          id: 'back_landingdrink_btn',
          handler: this.onContinue,
          scope: this
      	};

		var content = {
			xtype: 'container',
			id: 'landindrink_content',
			layout:{
				
			}
		};

		this.add([toolbar, content]);

    },
	onContinue: function(){
		this.fireEvent("landingDrinkBackCommand", this);
	}

});

Ext.define("B2B.view._App", {
    extend: 'Ext.NavigationView',
    id: "_app",
    xtype: '_app',
    config: {
        navigationBar: false,
        items: [
            {
                xtype: 'appslider',
                id: 'appslider'
            }
        ]
    }
});


Ext.define('B2B.view.Component_NotificationBar', {
	extend: 'Ext.Container',
	xtype: 'notificationbar',
	config: {
		cls: 'notificationbar',
        docked: 'top',
        height: 30,
        html : ['test'
        ].join('')
	}
});

Ext.define("B2B.view._SplashBeerSearch", {
    extend: 'Ext.Img',
    xtype: 'splashbeersearch',

    config: {

    }
});


Ext.define('B2B.view.Camera_Picker', {
	extend: 'Ext.picker.Picker',
	xtype: 'camerapicker',
	autoDestroy: true,
	config: {
		slots: [
			{
				name : 'camera_source',
				title : 'Select source',
				data : [
					{text: i18n.app.PICKER_CAMERA, value:true},
					{text: i18n.app.PICKER_LIBRARY, value:false}
				]
			}
		],
		listeners: {
			change: function (picker, value, oldValue) {
				var eventName = "openLibraryCommand";
				if (value.camera_source) {
					eventName = "openCameraCommand";
				}

				this.fireEvent(eventName, this);
			},
			cancel: function (picker) {}
		}
	},
	initialize: function(){
		this.callParent(arguments);
	}
});

Ext.define('B2B.view.Beer_Search', {
	extend: 'Ext.Panel',
	requires: [
		'Ext.field.Search'
	],
	xtype: 'beersearch',
	config: {
		docked: 'top',
		layout: {
        	type: 'vbox'
        }
	},
	initialize: function(){
		this.callParent(arguments);
		var	beersearchinfobar = {
			xtype: 'container',
			id: "beersearchinfobar",
			docked: 'top',
			styleHtmlContent: true,
			html: i18n.app.HINT_SEARCH2CHAR,
			flex: 1
		},
		searchField = {
			xtype: 'componentsearch',
			flex: 1,
			store: Ext.getStore('Beers_Ajax'),
			listResultId: 'beerlist',
			infobarId: 'beersearchinfobar'
		},
		addBeerButton ={
			xtype: 'button',
			text: i18n.app.BTN_ADDBEER,
			ui: 'beerwhite',
			id: 'add_beer_btn',
			cls: 'bg_beer',
			iconCls: 'drink_beerpint_add',
			iconMask: true,
			handler: this.onAddBeerButtonTap,
			scope: this
		},
		beertoolbar = {
			xtype: 'toolbar',
			cls: 'sub_titlebar',
			id: 'beersearchtoolbar',
			ui: 'beerneutral',
			docked: 'top',
			flex: 1,
			layout: {
       			type: 'hbox',
       			align: 'middle'
   			},
			items: [
				searchField,
				addBeerButton
			]
		};

		this.add([beertoolbar, beersearchinfobar]);
	},
	onAddBeerButtonTap: function(){
		Ext.getCmp("add_beer_btn").disable();
		this.fireEvent("beerAddCommand", this);
	}
});

Ext.define('B2B.view.View_BottleSpinner', {
	extend: 'Ext.Panel',
	xtype: 'viewbottlespinner',
	config: {
		title: i18n.app.PANEL_BOTTLESPINNER,
		iconCls: 'drink_beerbottle',
		styleHtmlContent: true,
       // cls: 'slidableToolbar',
       layout: {type:'fit', align:'stretch'},
       items: [
            {
                xtype: 'container',
                id: 'bottlegame',
              //  flex:1,
                html: [
                    '<div id="rules">',
                        i18n.app.TEXT_BOTTLEGAME,
                    '</div>',
                ].join("")
            }
       ]

	},
	initialize: function(){
        
        var me = this;

        this.callParent(arguments);

        var viewbottlespinnertoolbar = {
            xtype: 'toolbar',
            title: i18n.app.LABEL_BOTTLESPINNER,
            cls: "sub_titlebar, slidableToolbar",
            ui: 'beermainflat',
            docked: 'top',
            id: 'BottleSpinnerTitlebar',
            defaults: {
                iconMask: true
            }
        };

        var startgamebutton = {
            xtype: 'button',
            ui: 'action',
            id: "startgamebutton",
            text: i18n.app.BTN_PLAY,
            height: 50,
            margin: 30,
            width: '80%',
            handler: this.startGame
        }

        this.add([viewbottlespinnertoolbar, startgamebutton]);
    },
    startGame: function(){
        var playground = Ext.getCmp('bottlegame');
        var startgamebutton = Ext.getCmp('startgamebutton');
        startgamebutton.destroy();

        playground.setHtml([
                    '<div id="playground" style="display: block; ">',
                        '<div id="shadow"> </div>',
                        '<div id="bottle" class="normal"> </div>',
                    '</div>',
                ].join(""));

        var bottle = document.getElementById("bottle"),
            shadow = document.getElementById("shadow");
            what = document.getElementById("bottlegame");
        var timer_rot = 0;
        var rot = 0.0;
        var step;
        var count;
        var tdelta = 20;
        var oldangle1 = 0;
        var oldangle2 = 0;
        var oldangle3 = 0;
        var centerx = 160;
        var centery = 150;
        var spintimer = 1;
        var currentWidth = 0;
        

        what.ontouchstart = function(e) {
            oldangle1 = 0; oldangle2 = 0; oldangle3 = 0;
        }

        what.ontouchmove = function(e) {
            e.preventDefault();
            if (timer_rot != 0) return;

            var touch = e.touches[0];
            var dx = centerx - touch.pageX;
            var dy = centery - touch.pageY;
            var angle = Math.atan2(dy, dx);

            oldangle3 = angle;
            oldangle1 = oldangle2;
            oldangle2 = oldangle3;

            var val = "rotateZ(" + angle + "rad)";
            bottle.style.webkitTransform = val;
            shadow.style.webkitTransform = val;
            rot = angle;
        }
        what.ontouchend = function(e){
            if (timer_rot == 0) {
                var val = ((oldangle2 - oldangle1) + (oldangle3 - oldangle2)) / 2;
                val /= 3;
                if (val == 0.0){
                    val = Math.random()*0.3+0.2;
                }
                else if (Math.abs(val) < 0.3){
                    val *= 3;
                }
                count = 40;
                step = val;
                timer_rot = setTimeout(stepfunc, tdelta);
                bottle.className = "normal blurred";
            }
        }

        function stepfunc() {
            rot += step;
            var val = "rotateZ(" + rot + "rad)";
            bottle.style.webkitTransform = val;
            shadow.style.webkitTransform = val;
            count--;
            if (count < 0) {
                count = 10;
                step = step - step/4;
            }
            if (Math.abs(step) < 0.003){
                bottle.className = "normal";
                timer_rot = 0;
            }
            else{
                setTimeout(stepfunc, tdelta);
            }
        }

        
        function updateLayout() {
          if (window.innerWidth != currentWidth) {
            currentWidth = window.innerWidth;
            window.scrollTo(0, 1);
            centerx = window.innerWidth/2;
            centery = window.innerHeight/2;
            var x = (centerx - 140);
            var y = (centery - 64);
            bottle.style.left = x + "px";
            bottle.style.top = y + "px";
            shadow.style.left = (x+8) + "px";
            shadow.style.top = (y+15) + "px";
          }
        };

        updateLayout()
        //setInterval(updateLayout, 500);
    }
});

Ext.define('B2B.view.Friend', {
	extend: 'Ext.Panel',
	xtype: 'friend',
	config: {
		title: i18n.app.LABEL_FRIENDS,
		iconCls: 'smiley_friends',
        layout: {
        	type: 'fit'
        }
	},
	initialize: function(){
    	this.callParent(arguments);

    	var storeProfile = Ext.getStore("Profile_Local"),
    		storeAjaxFriend = Ext.getStore('Friends_Ajax'),
    		user = null,
    		friendHeader = {
	            xtype: 'container',
	            cls: 'header_img',
	            height: 50,
	            width: '100%',
	            docked: 'top',
	            html: '<img src="'+HH.default_user64+'" width="100%" height="50px" >'
	        },
	        friendListSearch = {
				xtype: 'friendsearch',
				id: 'friendsearch'
			},
			friendList = {
			    xtype: 'friendlist',
			    id: 'friendlist',
			    store: Ext.getStore("Friends_Ajax")
			};

		if (storeProfile && storeProfile.getCount() > 0 ) {
    		user = storeProfile.first().data;

    		HH.log("LOAD PROFILE FOR FRIENDS " + user.idUser);
			storeAjaxFriend.getProxy().setExtraParam('idUser', user.idUser);
			storeAjaxFriend.getProxy().setExtraParam('btUsername',user.idUser);
			storeAjaxFriend.getProxy().setExtraParam('btSid', user.token);//user.token
			//Ext.apply(storeAjaxFriend.getProxy().headers, {'btUsername':user.idUser});
    	}

		storeAjaxFriend.load();

		this.add([/*friendHeader,*/ friendListSearch, friendList]);

    }
});

Ext.define('B2B.view.Beer_Component_List', {
    extend: 'Ext.dataview.List',
    xtype: 'beerlistcomponent',
	config: {
        loadingText: i18n.app.HINT_LOADING,
        emptyText: [
            '<div class="beer-list-empty-text list-empty-text">',
                '<h1>'+utils.__(i18n.app.TEXT_NOBEERFOUND)+'</h1>',
                '<p>'+utils.__(i18n.app.TEXT_WHYADDBEER)+'</p>',
            '</div>'
        ].join(""),
        itemTpl: new Ext.XTemplate("<div class='{[this.getClass(values)]}'>{[this.getImage1URL(values)]}{[this.getImage2URL(values)]}{[this.getString(values)]}</div>",
        {
        	getClass: function(values){
        		return "small-list beer-list-item-title beerTypeClass"+values.beerstyle+" nation_"+values.nationality;
        	},
            getImage1URL: function(values){
                    var str = '<img class="avatar_small" src="';
                    if (_.isEmpty(values.beerstyle)){
                         str += 'resources/img/default/blank_avatar_32.png';
                     }else{
                        str += 'resources/img/default/blank_avatar_32.png';
                     }
                    str += '" width="32" height="32">';
                    return str;
            },
            getImage2URL: function(values){
                    var str = '<img class="avatar_small" src="';
                    if (_.isEmpty(values.beertype)){
                         str += 'resources/img/default/blank_avatar_32.png';
                     }else{
                        str += 'resources/img/default/blank_avatar_32.png';
                     }
                    str += '" width="32" height="32">';
                    return str;
            },
            getString: function(values){
                var tpl = "";
                tpl += "<div class='small-list-text'>"+_.titleize(values.name)+"</div>"+
                       "<div class='small-list-subtext'>"+utils.getBeerStyleFromCode(values.beerstyle);
                if(values.beertype) tpl += " - " + utils.getBeerTypeFromCode(values.beertype);
                tpl += "</div>";
                return tpl;
            }
        })
	}
});


Ext.define('B2B.view.Friend_Search', {
	extend: 'Ext.Panel',
	requires: [
		'Ext.field.Search'
	],
	xtype: 'friendsearch',
	config: {
		docked: 'top'
	},
	initialize: function(){
		this.callParent(arguments);

		var oldValueCount = 0,
			searchFriendButton = {
				xtype: "button",
				text: i18n.app.BTN_SEARCHFRIEND,
				ui: 'beerwhite',
				id: 'search_friend_btn',
				cls: 'bg_beer',
				iconCls: 'smiley_friend_add',
				iconMask: true,
				handler: this.onSearchFriendButtonTap,
				scope: this
			},
			searchField = {
				xtype: 'searchfield',
				placeHolder: i18n.app.LABEL_SEARCH,
				name: 'friendfiltersearch',
				flex: 1,
				listeners : {
		            scope: this,
		            keyup: function(field) {
			           	var value = field.getValue();
			           	var store = Ext.getStore('Friends_Ajax');

			           	if(value < oldValueCount){
			           		store.clearFilter();
			            }

			            oldValueCount = value;

			           	if (!value) {
			           		store.filterBy(function() {
			                    return true;
			                });
						} else {
							var searches = value.split(' '), regexps  = [], i;

							for (i = 0; i < searches.length; i++) {
								if (!searches[i]) return;
								regexps.push(new RegExp(searches[i], 'i'));
							};
							store.filterBy( function(record) {
			                    var matched = [];

								for (i = 0; i < regexps.length; i++) {
									var search = regexps[i];

									if (record.get('displayName').match(search) || record.get('firstName').match(search) || record.get('lastName').match(search) ) matched.push(true);
									else matched.push(false);
								};
								if (regexps.length > 1 && matched.indexOf(false) != -1) {
									return false;
								} else {
									return matched[0];
								}
							});
			            }
		            }
	            }
			},
			friendsearchtoolbar = {
				xtype: 'toolbar',
				id: 'friendsearchtoolbar',
				cls: 'sub_titlebar',
				ui: 'beerneutral',
				docked: 'top',
				items: [
					searchField,
					searchFriendButton
				]
			};

		this.add([friendsearchtoolbar]);
	},
	onSearchFriendButtonTap: function(){
		Ext.getCmp("search_friend_btn").disable();
		this.fireEvent("searchFriendCommand", this);
	}
});

Ext.define('B2B.view.Feedback_List', {
    extend: 'Ext.dataview.List',
    requires: [
        'Ext.plugin.PullRefresh'
    ],
    xtype: 'feedbacklistcomponent',
	config: {
        loadingText: i18n.app.HINT_LOADING,
        plugins: [
            {
                xclass: 'Ext.plugin.PullRefresh',
                pullRefreshText: 'Pull down for more!',
                refreshFn: function(plugin) {
                    var store = plugin.up().getStore();
                    Ext.Viewport.fireEvent("refreshStore", this, store.getStoreId());
                }
            }
        ],
        emptyText: '</pre><div class="feedback-list-empty-text">'+
                '<h1>'+utils.__(i18n.app.TEXT_NOFEEDBACKFOUND)+'</h1></div><pre>',
        itemTpl: new Ext.XTemplate("<div class='{[this.getClass(values)]}'>{[this.getImageURL(values)]}{[this.getTextString(values)]}{[this.getWhenString()]}</div>",
            {
            	getClass: function(values){
            		return "feedback-list-item small-list feedback-type"+values.type;
            	},
            	getImageURL: function(values){
                    var str = '<img class="avatar_small" src="';
                    if (_.isEmpty(values.image)){
                         str += 'resources/img/default/blank_avatar_32.png';
                     }else{
                        str+=values.image;
                     }
                    str += '" width="32" height="32">';
                	return str;
                },
                getWhenString: function(values){
                    var str = "<div class='small-list-when'>";
                    str += "5 minuti fa";
                    str += "</div>";
                    return str;
                },
                getTextString: function(values){
                    var str = "<div class='small-list-text'>";
            		str +=
                	str += "</div>";
                    return str;
                }
            }
   		)
	}
});


Ext.define('B2B.view.User', {
	extend: 'B2B.view.Generic_Profile',
	xtype: 'userprofile',
	config: {
		title: i18n.app.PANEL_ABOUTME,
		iconCls: 'smiley_happy'
	},
	profileJson: null,
	profileButtonId: 'userProfileButton',
	badgesButtonId: 'userBadgesButton',
	drinkListButtonId: 'userDrinkListButton',
	initialize: function(){
		this.callParent(arguments);
	},
	onEditProfileButtonTap: function() {
		this.fireEvent("editProfileCommand", this);
	},
	onSettingsButtonTap: function() {
		this.setMasked(true);
		this.fireEvent("settingsCommand", this);
	},
	onBadgesButtonTap: function() {
		this.setMasked(true);
		this.fireEvent("badgesProfileCommand", this);
	},
	onDrinkListButtonTap: function() {
		this.setMasked(true);
		this.fireEvent("drinkListProfileCommand", this);
	},
	onMyActivityButtonTap: function() {
		this.setMasked(true);
		this.fireEvent("activityListProfileCommand", this);
	},
	onFavoritesButtonTap: function() {
		this.setMasked(true);
		this.fireEvent("favoritesProfileCommand", this);
	},
	onFriendsButtonTap: function() {
		this.setMasked(true);
		this.fireEvent("friendsProfileCommand", this);
	},
	refreshProfileData: function() {
		this.fireEvent("reloadProfileCommand", this);
	}
});

Ext.define('B2B.view.Settings', {
	extend: 'Ext.form.Panel',
	xtype: 'settings',
	config: {
		title: i18n.app.PANEL_SETTINGS,
		iconCls: 'settings6',
        enableLog: bridge.enableLog,
		scrollable : {
			translationMethod : 'cssTransform'
		},
		items:  [
			{
				xtype: 'fieldset',
				title: '<h1>'+i18n.app.FORM_ACCOUNT+'</h1>',
				instructions: i18n.app.HINT_DISPLAYNAME,
				items: [
					{
						xtype: 'hiddenfield',
						name: 'idUser'
					},
					{
						xtype: 'hiddenfield',
						name: 'pwdHash'
					},
					{
						xtype: 'hiddenfield',
						name: 'role'
					},
					{
						xtype: 'hiddenfield',
						name: 'status'
					},
					{
						xtype: 'textfield',
						name: 'username',
						label: i18n.app.FORM_USERNAME,
						labelWidth: '40%',
						disabled: true
					},
					{
						xtype: 'field',
						/*label: i18n.app.FORM_AVATAR,*/
						labelAlign: 'top',
						component:
						{
							xtype: 'image',
							name: 'image',
							id : 'profileformimage',
							// TODO AVATAR IMAGE
							src: HH.default_user64,
							mode: 'element',
						//	height: '50%',
						//	width: '50%',
							/*
							listeners: {
								tap: function (img, evt) {
									if(!this.actions){
										this.actions = Ext.Viewport.add(
											{
												xtype: 'actionsheet',
												zIndex: 9999,	// Evita il problema di visualizzazione della actionsheet sotto alle viste
												items: [
													{
														text: i18n.app.BTN_CHOOSEPICTURE,
														scope: this,
														ui: 'confirm',
														handler: function(){
															Ext.getCmp("userform").fireEvent("chooseProfilePictureCommand", this, Ext.getCmp("profileformimage"));
															this.actions.hide();
														}
													},
													{
														text: i18n.app.BTN_REMOVEPICTURE,
														scope: this,
														ui: 'decline',
														handler: function(){
															Ext.getCmp("profileformimage").setSrc(HH.default_user64);
															this.actions.hide();
														}
													},
													{
														text: i18n.app.BTN_CANCEL,
														scope: this,
														handler: function(){
															this.actions.hide();
														}
													}
												]
											}
										);
									}
									this.actions.show();
								}
							}*/
						}
					},
					{
						xtype: 'textfield',
						name: 'email',
                        id:'email',
						label: i18n.app.FORM_EMAIL,
						labelWidth: '40%',
						disabled: true
					},
					{
						xtype: 'textfield',
						name: 'displayName',
						label: i18n.app.FORM_DISPLAYNAME,
						labelWidth: '40%'
					}
				]
			},
			{
				xtype: 'fieldset',
				title: '<h1>'+i18n.app.FORM_PROFILE+'</h1>',
				items: [
					{
						xtype: 'textfield',
						name: 'firstName',
						label: i18n.app.FORM_FIRSTNAME,
						labelWidth: '40%',
						placeHolder: i18n.app.HINT_CHOOSEFIRSTNAME,
					},
					{
						xtype: 'textfield',
						name: 'lastName',
						label: i18n.app.FORM_LASTNAME,
						labelWidth: '40%'
					},
					{
						xtype: 'textfield',
						name: 'description',
						label: i18n.app.FORM_DESCRIPTION,
						labelAlign: 'top'
						//labelWidth: '40%'
					},
					{
						xtype: 'datepickerfield',
						destroyPickerOnHide: true,
						name: 'birthDate',
						label: i18n.app.FORM_BIRTHDATE,
						labelWidth: '40%',
						placeHolder: i18n.app.HINT_CHOOSEBIRTHDATE,
						yearFrom: 1940
					},
					{
						xtype: 'selectfield',
						name: "gender",
						label: i18n.app.FORM_GENDER,
						labelWidth: '40%',
						placeHolder: i18n.app.HINT_CHOOSEGENDER,
						options: [
							{
								text: i18n.app.LABEL_UNDISCLOSED,
								value: 0
							},
							{
								text: i18n.app.LABEL_MALE,
								value: 1
							},
							{
								text: i18n.app.LABEL_FEMALE,
								value: 2
							}
						]
					},
					{
						xtype: 'selectfield',
						name: "nationality",
						cls: "nation",
						label: i18n.app.FORM_NATIONALITY,
						labelWidth: '40%',
						placeHolder: i18n.app.HINT_CHOOSENATIONALITY,
						options: i18n.countries
					}
				]
			},
			{
				xtype: "fieldset",
				items: [
					{
						xtype: 'textfield',
						name: 'activatedOn',
						id: 'activatedOnField',
						label: i18n.app.FORM_ACTIVATEDON,
						labelWidth: '40%',
						disabled: true
					},
					{
						xtype: 'textfield',
						name: 'lastLoginOn',
						id: 'lastLoginOnField',
						label: i18n.app.FORM_LASTLOGINON,
						labelWidth: '40%',
						disabled: true
					}
				]
			},
                 {
                 xtype: "fieldset",
                 items: [
                         {
                         xtype: 'textfield',
                         name: 'emailFB',
                         id:'emailFB',
                         label: i18n.app.FORM_FBUSER,
                         labelWidth: '40%',
                         disabled: true
                         },
                         {
                         xtype: 'textfield',
                         name: 'idTwitter',
                         id:'idTwitter',
                         label: i18n.app.FORM_TWUSER,
                         labelWidth: '40%',
                         disabled: true
                         }
                         ]
                 },

		]
	},
	initialize: function(){
        this.callParent(arguments);

        var cancelButton = {
			text: i18n.app.BTN_BACK,
			ui: 'back',
			id: 'back_profile_btn',
			handler: this.onBackButtonTap,
			scope: this
		},
		saveProfileButton = {
			text: i18n.app.BTN_SAVE,
			ui: 'action',
			iconCls: 'check_yes',
			id: 'save_profile_btn',
			handler: this.onSaveProfileButtonTap,
			scope: this
		},
		toolbar = {
			xtype: 'toolbar',
			docked: 'top',
			cls: 'sub_titlebar',
			ui: 'beermainflat',
			title: i18n.app.PANEL_SETTINGS,
			id: 'ProfileFormTitlebar',
			defaults: {
				iconMask: true
			},
			items: [
				cancelButton,
				{ xtype: 'spacer' },
				saveProfileButton
			]
		}/*,
        fieldset_Settings = {
			xtype: 'fieldset',
			title: i18n.app.FORM_SETTINGS,
			items: [
				{
					xtype: 'iostogglefield',
					name: 'enableNotification',
					label: i18n.app.FORM_NOTIFICATIONENABLE,
					labelWidth: '50%',
					listeners: {
						change: function (slider, thumb, newValue, oldValue) {
						   HH.log("TODO: Notification Toggle");
						}
					}
				}
			]
		}*/,
		privacyremovedata = {
			xtype: 'button',
			id: 'privacyremovedatabtn',
			text: utils.__(i18n.app.BTN_REMOVEPERSONAL),
			ui: 'decline-small',
			handler: this.onRemoveDataButtonTap,
			scope: this
		},

        fieldset_RemoveData = {
			xtype: 'fieldset',
			title: '<h1>'+utils.__(i18n.app.FORM_PRIVACY)+'</h1>',
			instructions: utils.__(i18n.app.HINT_CAREFULLY),
			items: [
				privacyremovedata
			]
		},
		addFacebookAccount = {
			xtype: 'button',
			id: 'addfacebookbtn',
			cls: 'socialbutton',
			text: utils.__(i18n.app.BTN_ADDFACEBOOKACCOUNT),
			ui: 'beerfacebook',
			handler: this.onAddFacebookAccount,
			scope: this
		},
		addTwitterAccount = {
			xtype: 'button',
			id: 'addtwitterbtn',
			cls: 'socialbutton',
			text: utils.__(i18n.app.BTN_ADDTWITTERACCOUNT),
			ui: 'beertwitter',
			handler: this.onAddTwitterAccount,
			scope: this
		},
		fieldset_SocialAccount = {
			xtype: 'fieldset',
			title: '<h1>'+utils.__(i18n.app.FORM_SOCIAL)+'</h1>',
			items: [
				addFacebookAccount,
				addTwitterAccount,
			]
		},
           logToggle = {
           xtype: 'checkboxfield',
           id: 'logToggle',
           name: 'enableLog',
           checked: bridge.enableLog,
           label: i18n.app.FORM_ENABLE_LOG,
           labelWidth: '40%',
           listeners: {
           check: function () {
           this.enableLog = true;
           bridge.setEnableLog(this.enableLog);
           },
           uncheck: function () {
           this.enableLog = false;
           bridge.setEnableLog(this.enableLog);
           }
           }
        },
        fieldset_Log = {
           xtype: 'fieldset',
           title: '<h1>'+utils.__(i18n.app.FORM_LOG)+'</h1>',
           items: [
                   logToggle
                   ]
           },
           
		button_Logout = {
			xtype: 'button',
			id: 'logoutbtn',
			text: utils.__(i18n.app.BTN_LOGOUT),
			ui: 'decline',
			handler: this.onLogoutButtonTap,
			scope: this
		};

		Ext.getCmp("profileformimage").setSrc(utils.getUserAvatar());
           
        if (bridge.FBSession){
            Ext.getCmp("emailFB").setValue(Ext.getCmp("email").getValue());
        }else{
           Ext.getCmp("emailFB").setValue("");
        }
           
        if (bridge.TWSession){
          // Ext.getCmp("idTwitter").setValue();
        }else{
           Ext.getCmp("idTwitter").setValue("");
        }
           
        this.add([toolbar, /*fieldset_Settings,*/ fieldset_SocialAccount,fieldset_Log,fieldset_RemoveData, button_Logout]);
    },
    onRemoveDataButtonTap: function(){
        this.fireEvent("removeDataCommand", this);
    },
    onLogoutButtonTap: function(){
        this.fireEvent("logoutCommand", this);
    },
    onBackButtonTap: function(){
    	Ext.getCmp("userprofile").setMasked(false);
    	Ext.getCmp("back_profile_btn").disable();
    	this.fireEvent("settingsBackCommand", this);
    },
    onSaveProfileButtonTap: function(){
		var values = this.getValues();
		Ext.getCmp("userprofile").setMasked(false);
		this.fireEvent("saveProfileCommand", this, values);
	},
	onAddFacebookAccount: function(){
        bridge.addNewAccount("f");
	},
	onAddTwitterAccount: function(){
        bridge.addNewAccount("t");
	},

});

Ext.define('B2B.view.Beer_Add_Form', {
	extend: 'Ext.form.Panel',
	xtype: 'beeraddform',
	id: 'beeraddform',
	requires: [
        'Ext.Container',
        'Ext.MessageBox',
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.field.Select'
    ],
	config: {
		title: i18n.app.PANEL_ADDBEER,
		iconCls: 'add',
		submitOnAction: true,
		layout:{animation:false},
		defaults: {
			labelAlign: 'left',
			labelWidth: '50%',
			labelHeight: '50%'
		},
		items: [
			{
				xtype: 'fieldset',
				id: 'beeraddfield',
				title: '<h1>'+i18n.app.FORM_ADDBEER+'</h1>',
				instructions: i18n.app.HINT_ADDBEER,
				items: [
					{
						xtype: 'textfield',
						name: 'name',
						cls: 'beer_form_textfield',
						placeHolder: i18n.app.HINT_BEERCHOOSENAME,
						//label: i18n.app.LABEL_BEERNAME,
						required: true
					},
					{
						xtype: 'textfield',
						name: 'brewery',
						cls: 'beer_form_textfield',
						placeHolder: i18n.app.HINT_BEERCHOOSEBREWERY,
						//label: i18n.app.LABEL_BEERBREWERY,
						required: true
					},
					{
						xtype: 'selectfield',
						name: "beerstyle",
						id: "selectfieldbeerstyle",
						cls: 'beer_form_selectfield',
						placeHolder: i18n.app.HINT_BEERCHOOSESTYLE,
						options: i18n.beerstyles,
						value: "0"
					},
					{
						xtype: 'selectfield',
						name: "grad",
						id: "selectfieldgrad",
						cls: 'beer_form_selectfield',
						placeHolder: i18n.app.HINT_BEERCHOOSEGRAD,
						options: i18n.beergrads,
						value: "0"
					},
					{
						xtype: 'selectfield',
						name: "nationality",
						id: "selectfieldnationality",
						cls: 'beer_form_selectfield',
						//label: i18n.app.FORM_NATIONALITY,
						placeHolder: i18n.app.HINT_BEERCHOOSENATIONALITY,
						//options: i18n.countries
					},
					{
                    xtype: 'textfield',
                 //   label: i18n.app.HINT_BEERCHOOSEDESCRIPTION,
                 //   labelAlign: 'top',
                	cls: 'beer_form_textfield',
                 //   maxRows: 4,
                 	placeHolder: i18n.app.HINT_BEERCHOOSEDESCRIPTION,
                    name: 'description'
                	}
						//label: i18n.app.LABEL_BEERDESCRIPTION,
						//label: i18n.app.HINT_BEERCHOOSEDESCRIPTION,

				]
			}
		]
	},
	initialize: function(){

    	this.callParent(arguments);
    	var profile = (Ext.getStore('Profile_Local').first()).data,
    		backBeerButton = {
				xtype: "button",
				text: i18n.app.BTN_CANCEL,
				ui: 'back',
				id: 'beer_back_btn',
				handler: this.onBeerBackButtonTap,
				scope: this
			},
			saveBeerButton = {
				xtype: "button",
				text: i18n.app.BTN_SEND,
				ui: 'action',
				id: 'beer_save_btn',
				margin: '10px',
				handler: this.onBeerSaveButtonTap,
				scope: this,
				docked: 'bottom'
			},
			toolbar = {
				xtype: 'toolbar',
				cls: 'sub_titlebar',
				title: i18n.app.PANEL_ADDBEER,
				docked: 'top',
				ui: 'beermainflat',
				items: [
					backBeerButton
				]
			};

		this.add([toolbar, saveBeerButton]);
		var selectfieldnationality = Ext.getCmp("selectfieldnationality");
		selectfieldnationality.setOptions(i18n.countries);
		selectfieldnationality.setValue(profile.nationality);
    },
	onBeerSaveButtonTap: function(){
		Ext.getCmp("beer_save_btn").disable();
		this.fireEvent("beerSaveCommand", this);
	},
	onBeerBackButtonTap: function(){
		Ext.getCmp("beer_back_btn").disable();
		this.fireEvent("beerBackCommand", this);
	}
});

Ext.define('B2B.view.Friend_Invite_Panel', {
	extend: 'Ext.Panel',
	xtype: 'friendinvitepanel',
    requires: [
            'Ext.SegmentedButton'
        ],
	config: {
		title: i18n.app.LABEL_INVITE_FRIENDS,
		iconCls: 'smiley_friends',
        layout: {
        	type: 'vbox'
        }
	},
	initialize: function(){
    	this.callParent(arguments);

    	var backButton = {
			text: i18n.app.BTN_BACK,
			ui: 'back',
			id: 'back_about_btn_invite_friend',
			handler: this.onBackButtonTap,
			scope: this
		},
		toolbar = {
			xtype: 'toolbar',
			docked: 'top',
      ui: 'beermainflat',
			cls: 'sub_titlebar',
			title: i18n.app.LABEL_INVITE_FRIENDS,
			id: 'DrinksContainerTitlebar',
			defaults: {
				iconMask: true
			},
			items: [
				backButton
			]
		};

    	var	friendHeader = {
	            xtype: 'container',
	            cls: 'header_img',
	            height: 50,
	            width: '100%',
	            docked: 'top',
	            html: '<img src="'+HH.default_user64+'" width="100%" height="50px" >'
	        },
	        friendPaginginvitesearch = {
    				xtype: 'friendpaginginvitesearch',
    				id: 'friendpaginginvitesearch'
    			},
           friendTypeButton =
           {
           xtype: 'segmentedbutton',
           allowDepress: false,
           docked: 'top',
           id:'friendTypeButton',
           padding: '5 5 5 5',
           allowMultiple: false,
           items: [
                   {
                   ui:'beerwhite',
                   text: i18n.app.PANEL_SEGMENTED_MEETBEER,
                   pressed: true,
                   cls: 'bg_beer',
                   handler:this.onMeetBeerFriendsTap,
                   scope:this,
                   width: '33%',
                   id:'seg1'
                   },
                   {
                   ui:'beerwhite',
                   text: i18n.app.PANEL_SEGMENTED_FACEBOOK,
                   handler:this.onFBFriendsTap,
                   scope:this,
                   cls: 'bg_beer',
                   width: '33%',
                   id:'seg2'
                   },
                   {
                   ui:'beerwhite',
                   text: i18n.app.PANEL_SEGMENTED_TWITTER,
                   handler:this.onTWFriendsTap,
                   scope:this,
                   cls: 'bg_beer',
                   width: '33%',
                   id:'seg3'
                   }
                   ]
           },
            friendList = {
			    xtype: 'friendinvitelist',
			    id: 'friendinvitelist',
			    store: Ext.getStore("Visualized_Friends_Facebook_Local"),
			    flex: 1,
			    scrollable : {
					translationMethod : 'cssTransform'
				}
			},
           
           friendNavigation = {
           xtype: 'toolbar',
           height: 44,
           width: '100%',
           ui: 'beermainflat',
           id:'friendNavigation',
           docked: 'bottom',
           items:[{xtype: 'button',
                  ui:'back',
                  text:i18n.app.BTN_BACK_FRIENDS,
                  handler:this.onFriendsBackButtonTap,
                  width: 80,
                  docked: 'left',
                  margin: '7 0 0 15',
                  scope:this},
                  {
                  xtype: 'button',
                  ui:'forward',
                  width: 80,
                  docked: 'right',
                  margin: '7 15 0 0',
                  text:i18n.app.BTN_FORWARD_FRIENDS,
                  handler:this.onFriendsForwardButtonTap,
                  scope:this}
                  ]
           };
           
			if (true ) {
    	/* impostazione parametri request facebook
    		HH.log("LOAD PROFILE FOR FRIENDS " + user.idUser);
			storeAjaxFriend.getProxy().setExtraParam('idUser', user.idUser);
			storeAjaxFriend.getProxy().setExtraParam('btUsername',user.idUser);
			storeAjaxFriend.getProxy().setExtraParam('btSid', user.token);//user.token
			/Ext.apply(storeAjaxFriend.getProxy().headers, {'btUsername':user.idUser});*/
    	}

		//storeAjaxFriend.load();
		this.add([/*friendHeader,*/toolbar, friendPaginginvitesearch,friendTypeButton, friendList,friendNavigation]);

    },
    onBackButtonTap: function() {
    	var store = Ext.getStore('Friends_Facebook_Local');

    	Ext.getCmp("back_about_btn_invite_friend").disable();
    	store.clearFilter();
    	this.fireEvent("backCommand", this);

    },
           
    onFriendsBackButtonTap: function() {
           console.log("onFriendsBack");
           this.fireEvent("friendsBackCommand", this);
    },
           
    onFriendsForwardButtonTap: function() {
           console.log("onFriendsBack");
           this.fireEvent("friendsForwardCommand", this);
    },
           
    onMeetBeerFriendsTap: function() {
           console.log("onMeetBeerFriendsTap");
           this.fireEvent("meetBeerFriendsCommand", this);
    },
           
    onFBFriendsTap: function() {
           console.log("onFBFriendsTap");
           this.fireEvent("FBFriendsTapCommand", this);
    },
    onTWFriendsTap: function() {
           console.log("onTWFriendsTap");
           this.fireEvent("TWFriendsTapCommand", this);
           },
           
});


Ext.define('B2B.view.Badge_List_Container', {
	extend: 'Ext.Panel',
	xtype: 'badgelistcontainerpanel',
	id: 'badgelistcontainerpanel',
	config: {
		title: i18n.app.LABEL_BADGES,
		iconCls: 'badge_list',
		layout: {
			type: 'fit'
		}
	},
	initialize: function() {
		this.callParent(arguments);

		Ext.Viewport.fireEvent("refreshBadges", this, null);

		var backButton = {
			text: i18n.app.BTN_BACK,
			ui: 'back',
			id: 'back_about_btn',
			handler: this.onBackButtonTap,
			scope: this
		},
		toolbar = {
			xtype: 'toolbar',
			docked: 'top',
			ui: 'beermainflat',
			cls: 'sub_titlebar',
			title: i18n.app.LABEL_BADGES,
			id: 'BadgesContainerTitlebar',
			defaults: {
				iconMask: true
			},
			items: [
				backButton,
				{ xtype: 'spacer' }
			]
		},
		badgeList = {
			xtype: "badgelistcomponent",
			id: 'badgelist',
			store: Ext.getStore("Badges_Ajax")
		};

		this.add([toolbar, badgeList]);
	},
	onBackButtonTap: function() {
		Ext.getCmp("back_about_btn").disable();
		Ext.getCmp("userprofile").setMasked(false);
		this.fireEvent("backToProfileCommand", this);
	}
});

Ext.define('B2B.view.Place_Detail', {
	extend: 'Ext.form.Panel',
	xtype: 'placedetail',
	requires: [
		'Ext.Container',
		'Ext.MessageBox',
		'Ext.Panel',
		'Ext.Toolbar',
		'Ext.field.Select',
		'Ext.ux.starrating.StarRating'
	],
	config: {
		iconCls: 'add',
		layout: 'vbox',
		scrollable: false,
		padding: 10,
		shareOnFacebook: false,
		shareOnTwitter: false
	},
	initialize: function(){
		this.callParent(arguments);
        var twenabled = false, fbenabled = false;
        var profileStore = Ext.getStore("Profile_Local").first().data;
          // console.log(">>>>>>>>>>>>>>>>>>>>>" + bridge.TWSesion);
        if (bridge.TWSession)
        {
           twenabled = true;
        };
        if (bridge.FBSession)
        {
           fbenabled = true;
        };
           
		var jsonData = this.jsonData,
			that = this,
			getPlaceHTMLFromValues = function(values) {
				var str = [
					//"<h2 class='center'>"+i18n.app.FORM_DRINKIN_OK+"</h2>",
					"<div class='placedetail-container'>",
					"<div class='placedetail-wrap'>",
						"<div class='placedetail-info'>",
							values.placeName,
						"</div>",
						"<div class='placedetail-location'>",
							utils.getLocationCategoryFromCode(values.category),
						"</div>",
						"</div>",
					"</div>"
				].join("");
				return str;
			},
			backPlaceDetailButton = {
				xtype: "button",
				text: i18n.app.BTN_BACK,
				ui: 'back',
				id: 'placedetail_back_btn',
				handler: this.onPlaceDetailBackButtonTap,
				scope: this
			},
			toolbar = {
				xtype: 'toolbar',
				cls: 'sub_titlebar',
				ui: 'beermainflat',
				docked: 'top',
				title: i18n.app.PANEL_DRINKIN,
				items: [
					backPlaceDetailButton
				]
			},
			placedetailcontent = {
				xtype: 'container',
				id: 'placedetailcontent',
				html: getPlaceHTMLFromValues(jsonData),
				docked: 'top',
				margin: '5 0 0 0'
			},
			submitCheckInButton = {
				xtype: "button",
				text: i18n.app.BTN_CHECKIN,
				ui: 'action',
				id: 'submit_checkin_btn',
				docked: 'bottom',
				handler: this.onSubmitCheckInButtonTap,
				scope: this
			},
			beersearch = {
				xtype: 'placebeersearch',
				id: 'placebeersearch',
				store: Ext.getStore('Beers_Ajax')
			},
			beerList = {
				xtype: "placebeerlist",
				id: "placebeerlist",
				store: null,
				singleSelect: true,
				flex: 1,
				scrollable : {
					translationMethod : 'cssTransform'
				}
			},
			contentSearch = {
				xtype: 'container',
				id: 'searchBeerContent',
				layout: 'vbox',
				flex: 1,
				items: [
					beersearch,
					beerList
				]
			},
			beerSelectedInfo = {
				xtype: 'container',
				id: 'beerSelectedInfoContent',
				html: '',
				flex: 1,
				listeners: {
					singletap: {
						fn: function() {
							that.fireEvent("searchNewBeerCommand", that);
						},
						element: 'element'
					}
				}
			},
			rating = {
				xtype: 'starrating',
				id: 'beerrating',
				itemsCount : 5,
				label : false,
				value: 3,
				valueCls: 'x-starrating-value',
				itemCls : 'x-starrating',
				itemHoverCls : 'x-starrating-hover',
				startValue: true,
				endValue: true
			},
			facebookToggle = {
				xtype: 'iostogglefield',
				id: 'facebookToggle',
				name: 'shareFacebook',
                hidden:!fbenabled,
				cls: 'ios5_toggle_facebook ios5_toggle',
				//label: i18n.app.FORM_SHAREFACEBOOK,
				//labelWidth: '65%',
				listeners: {
					change: function (slider, thumb, newValue, oldValue) {
						that.shareOnFacebook = (oldValue != 0);
					}
				}
			},
			twitterToggle = {
				xtype: 'iostogglefield',
				id: 'twitterToggle',
				name: 'shareTwitter',
				cls: 'ios5_toggle_twitter ios5_toggle',
                hidden:!twenabled,
				//label: i18n.app.FORM_SHARETWITTER,
				//labelWidth: '65%',
				listeners: {
					change: function (slider, thumb, newValue, oldValue) {
						that.shareOnTwitter = (oldValue != 0);
					}
				}
			},
			socialcontainer = {
				xtype: 'container',
				id: 'socialcontainer',
				layout: 'hbox',
           items: [{flex: 1},
                   facebookToggle, twitterToggle, {flex:1}
				]
			},
			// Riassunto della birra selezionata
			beerSelected = {
				xtype: 'container',
				id: 'beerSelectedContent',
				layout: 'vbox',
				items: [beerSelectedInfo, {
					xtype: 'container',
					id: 'feedbackcontainer',
					items: [
						{
							xtype: 'container',
							id: 'ratecontainer',
							html: "<div class='starrating x-form-fieldset-title x-docked-top'><h2>"+i18n.app.FORM_DRINKIN_STEP2_TODO+"</h2></div>"
						},
						rating
					]
				}, socialcontainer, submitCheckInButton]
			},
			placeholderBeer = {
				xtype: "panel",
				title: i18n.app.LABEL_BEERSEARCH,
				iconCls: 'home',
				id: "drinkinbeerlist",
				flex: 1,
				html: "",
				layout: 'vbox',
				items: [contentSearch]
			},
			placeholderFavorites = {
				xtype: "panel",
				title: i18n.app.LABEL_BEERFAVORITE,
				iconCls: 'home',
				id: "drinkinfavorite",
				flex: 1,
				html: "",
				layout: 'vbox'
			},
			placeholderHere = {
				xtype: "panel",
				title: i18n.app.LABEL_BEERHERE,
				iconCls: 'home',
				id: "drinkinhere",
				flex: 1,
				html: "",
				layout: 'vbox'
			},
			step1 = placedetailcontent,
			step3 = {
				xtype: 'fieldset',
				id: 'drinkinstep3',
				title: '<h1>'+i18n.app.FORM_DRINKIN_STEP3_TODO+'</h1>',
				flex: 1,
				layout: 'vbox',
				items: [
					{
						xtype: 'tabpanel',
						id: 'beerchoosetab',
						ui: 'beermainflat',
						flex: 1,
						tabBar: {
							layout: {
								pack: 'center'
							}
						},
						items: [
							placeholderBeer,
							placeholderFavorites,
							placeholderHere
						],
						listeners: {
							activeitemchange: function(source, value, oldvalue, options) {
								var destroyItems = function(items) {
									var ln = 0, i = 0;

									if (items) {
										ln = items.items.length;

										for (i = 0; i < ln; i++) {
											items.items[i].destroy();
										}
									}
								},
								cmpBeer = Ext.getCmp("drinkinbeerlist"),
								cmpFavorite = Ext.getCmp("drinkinfavorite"),
								cmpHere =  Ext.getCmp("drinkinhere");

								destroyItems(Ext.getCmp("drinkinbeerlist").getItems());
								destroyItems(Ext.getCmp("drinkinfavorite").getItems());
								destroyItems(Ext.getCmp("drinkinhere").getItems());

								if (value === cmpBeer) {
									beerList.store = null;
									beersearch.store = Ext.getStore("Beers_Ajax");
									contentSearch.items = [ beersearch, beerList ];
								} else if (value === cmpFavorite) {
									beerList.store = Ext.getStore("FavoriteBeers_Local");
									contentSearch.items = [beerList];
								} else if (value === cmpHere) {
									Ext.getStore("Beers_Place_Ajax").getProxy().setExtraParam("idPlace", that.jsonData.idPlace);
									Ext.Viewport.fireEvent("refreshStore", this, "Beers_Place_Ajax");
									beerList.store = Ext.getStore("Beers_Place_Ajax");
									contentSearch.items = [beerList];
								}

								value.setItems([contentSearch]);
							}
						}
					}
				]
			},
			containerBeerSelected = {
				xtype: 'panel',
				id: 'containerbeerselected',
				title: i18n.app.LABEL_BEERSEARCH,
				iconCls: 'home',
				flex: 1,
				layout: 'card',
				items: [
					step3,
					beerSelected
				]
			};

		//this.add([toolbar, submitCheckInButton, content, rating, containerBeerSelected]);           
		this.add([toolbar, step1, containerBeerSelected]);

		if (this.jsonBeer) {
			var container = Ext.getCmp("containerbeerselected"),
				beerSelected = Ext.getCmp("beerSelectedInfoContent"),
				nationAvatar = (_.isEmpty(this.jsonBeer.nationality)) ? "_":(this.jsonBeer.nationality).toLowerCase();

			if (beerSelected) {
				beerSelected.setHtml(
					"<div class='search-new-beer'>"+
						"<div class='beer-selected'>"+
						"<img class='beer-selected-image' src='"+utils.getBeerColorImage(this.jsonBeer)+"' />"+
						"<img class='beer-selected-flag' src='resources/flags/"+nationAvatar+".png'>"+
							"<div class='beer-selected-name'>"+_.titleize(this.jsonBeer.name)+"</div>"+
							"<div class='beer-selected-style'>"+utils.getBeerStyleFromCode(this.jsonBeer.beerstyle)+
								(this.jsonBeer.beertype ? " - " + utils.getBeerTypeFromCode(this.jsonBeer.beertype): "")+"</div>"+
						"</div>"+/*
						"<div class='search-new-beer-button'>"+
							"<div class='search-new-beer-text'>"+i18n.app.CHANGE_BEER+"</div><div class='search-new-beer-logo'></div>"+
						"</div>"+*/
						"<div class='search-new-beer-button x-button x-iconalign-left x-button-beerwhite bg_beer'>"+
							"<span class='x-button-icon search x-icon-mask'></span><span class='x-button-label'>"+i18n.app.CHANGE_BEER+"</span>"+
						"</div>"+
					"</div>");
				container.setActiveItem(1);
			}
		}
	},

		


	onPlaceDetailBackButtonTap: function() {
		Ext.getCmp("placedetail_back_btn").disable();
		this.fireEvent("backPlaceDetailCommand", this);
	},
	onSubmitCheckInButtonTap: function(){
		Ext.getCmp("submit_checkin_btn").disable();

		var profile = Ext.getStore('Profile_Local').first(),
			rating = Ext.getCmp("beerrating"),
			value = rating.getValue();

		this.fireEvent("checkInCommand", this, this.shareOnFacebook, this.shareOnTwitter, profile.data, this.jsonData, "", value);
	}
});

Ext.define('B2B.view.Friend_List', {
	extend: 'Ext.dataview.List',
	xtype: 'friendlist',
	 requires: [
		'Ext.plugin.PullRefresh'
	],
	config: {
		loadingText: i18n.app.HINT_LOADING,
		onItemDisclosure: true,
		plugins: [
			{
				xclass: 'Ext.plugin.PullRefresh',
				pullRefreshText: i18n.app.HINT_PULLDOWN,
				refreshFn: function(plugin) {
					var store = plugin.up().getStore();
					Ext.Viewport.fireEvent("refreshStore", this, store.getStoreId());
				}
			}
		],
		loadMask: true,
		emptyText: [
			'<div class="friend-list-empty-text list-empty-text">',
				'<h1>'+utils.__(i18n.app.TEXT_NOFRIENDFOUND)+'</h1>',
				'<p>'+utils.__(i18n.app.TEXT_WHYADDFRIEND)+'</p>',
			'</div>',
		].join(""),
		itemTpl: new Ext.XTemplate("<div class='{[this.getClass(values)]}'>{[this.getImageURL(values)]}{[this.getString(values)]}</div>",
		{
			getClass: function(values){
				return "friend-list-item-title small-list";
			},
			getImageURL: function(values){
					//resources/beer/style"+values.beerstyle+".png'
					var str = '<img class="avatar_small" src="';
					str += utils.getFriendAvatar(values.idUser);
					str += '" width="32" height="32">';
					return str;
			},
			getString: function(values){
			/*	var tpl = "<div class='small-list-text'>"+utils.getDisplayName(values)+"</div>";
				if(values.firstName){
					tpl += "<div class='small-list-subtext'>"+values.firstName+;
					if(values.lastName) tpl += " "+values.lastName;
					tpl += "</div>";
				}*/
				var str = "",
					tpl = null,
					points = i18n.app.POINTS + values.currentPoints;
				if (values.status == 1) {
					if (values.firstName) {
						str += values.firstName;
						if(values.lastName) str += " "+values.lastName;
					}

				  tpl = [
					 "<div class='small-list-text'>"+utils.getDisplayName(values)+"</div>",
					"<div class='small-list-subtext'>",
					   points,
					"</div>"
					].join("");
				 } else {
					 tpl = [
					"<div class='small-list-text'>"+utils.getDisplayName(values)+"</div>",
					"<div class='small-list-subtext'>",
					   utils.__(i18n.app.TEXT_WAITINGFRIEND),
					"</div>"
					].join("");
				 }
				return tpl;
			}
		})
	}
});


Ext.define('B2B.view.DrinkIn_Friend_Panel', {
	extend: 'Ext.form.Panel',
	xtype: 'frienddrinkin',
	
	config: {
		title: "Pippo",
		//i18n.app.LABEL_FRIENDS,
    },
	initialize: function(){
    	this.callParent(arguments);
    var	friendHeader = {
	            xtype: 'container',
	            height: 50,
	            width: '100%',
	            docked: 'top',
	           //background-color: 'transparent',
	           //	html: "La classifica dei tuoi amici più attivi:"		
	            html: "<div>"+"testo"+"</div>"
	        },
	    friendList = {
                            xtype: 'friendlist',
                            id: 'friendPointlist',
                          //  record: Ext.getStore("Friends_sortedPoint_Local").getRange(0,1),
                            store: Ext.getStore("Friends_sortedPoint_Local"),
                            ui: 'round'
                        };
  	HH.log("END inizialize Friend_DrinkIn");
    this.add([/*friendHeader,toolbar,backButton,*/ friendList]);
    }
});

Ext.define('B2B.view.Drink_List_Container', {
	extend: 'Ext.Panel',
	xtype: 'drinklistcontainerpanel',
	config: {
		title: i18n.app.LABEL_DRINKS,
		iconCls: 'drink_list',
		layout: {
			type: 'card',
			animation : 'flip'
		}
	},
	initialize: function() {
		this.callParent(arguments);

		Ext.Viewport.fireEvent("refreshDrinks", this);

		var backButton = {
			text: i18n.app.BTN_BACK,
			ui: 'back',
			id: 'back_about_btn',
			handler: this.onBackButtonTap,
			scope: this
		},
		changeViewButton = {
			text: i18n.app.BTN_LIST,
			ui: 'action',
			id: 'changeViewButton',
			handler: this.onChangeButtonTap,
			scope: this
		},
		toolbar = {
			xtype: 'toolbar',
			docked: 'top',
			cls: 'sub_titlebar',
			ui: 'beermainflat',
			title: i18n.app.LABEL_DRINK,
			id: 'DrinksContainerTitlebar',
			defaults: {
				iconMask: true
			},
			items: [
				backButton,
				{ xtype: 'spacer' },
				changeViewButton
			]
		},
		drinkList = {
			xtype: "drinkinlist",
			id: 'drinklist',
			store: Ext.getStore("Drinks_Ajax")
		},
		mapDrinkList = {
			xtype: 'map',
			id: 'mapDrinks',
			flex: 1,
			useCurrentLocation: true,
			mapOptions: {
				zoom: HH.map.zoomLevel,
				mapTypeId : google.maps.MapTypeId.ROADMAP,
				navigationControl: true,
				zoomControl: true,
				mapTypeControl: false,
				scaleControl: true,
				streetViewControl: true,
				panControl: true,
				draggable: true,
				scrollwheel: true,
				disableDoubleClickZoom: false
			},
           //Mappa delle bevute
			listeners: {
				maprender: function(me, map) {
					map.markers = [];
				//},
				//show: function(me, map) {
					if (map.clearMarkers) {
						map.clearMarkers();
					}
                    var mark = new google.maps.Marker({
                                             position: new google.maps.LatLng(this._geo.getLatitude(), this._geo.getLongitude()),
                                             map: map,
                                             icon: HH.map.currentMarker,
                                             title :"<strong class='hilite'>"  + i18n.app.MAPHERE +"</strong>"
                                             })
					map.markers.push(mark);
           
                     
					Ext.getStore("Drinks_Ajax").getData().each(function(record) {
                                        
						map.markers.push(new google.maps.Marker({
								position: new google.maps.LatLng(record.data.lat, record.data.lng),
								map: map,
								icon: HH.map.marker,
                                title:"<strong class='hilite'>" +record.data.beerName +"</strong>" + "<br>" + "<i><font size=\"2em\">"+record.data.placeName+"</font></i> "+"<br><font size=\"2em\">" +  i18n.app.BEERRATE +"<strong class='hilite'>"+ record.data.rate + "</font><strong class='icon-rate'></strong>"
                                                                
						}));
					});
           
           var infoWindow = new google.maps.InfoWindow();
           var i = 0, l = map.markers.length, marker = null, markerCallback = function(marker){console.log(marker.title);
           
           infoWindow.setContent(marker.title);
           infoWindow.open(map, marker);
           };
                for (i=0; i<l; i++)
                {
                    marker = map.markers[i];
                    if (window.touch)
                    {
                        google.maps.event.addListener(marker, "touchstart", function(){
                                                      markerCallback(this)});
                    }
                    else
                    {
                        google.maps.event.addListener(marker, "click", function(){markerCallback(this)});
                    }
                }
    
				}
			}
		};

		this.add([toolbar, mapDrinkList, drinkList]);
	},
	onBackButtonTap: function() {
		Ext.getCmp("back_about_btn").disable();
		Ext.getCmp("userprofile").setMasked(false);
		this.fireEvent("backToProfileCommand", this);
	},
	onChangeButtonTap: function() {
		this.fireEvent("switchViewCommand", this);
	}
});

Ext.define('B2B.view.Place_Beer_Search', {
	extend: 'Ext.Panel',
	requires: [
		'Ext.field.Search'
	],
	xtype: 'placebeersearch',
	id: 'placebeersearch',
	store: null,
	config: {
		layout: 'vbox'
	},
	initialize: function(){
		this.callParent(arguments);
		var searchField = {
				xtype: 'componentsearch',
				store: this.store,
				flex: 1,
				listResultId: 'placebeerlist',
				infobarId: 'placebeersearchinfobar'
			},
			toolbar = {
				xtype: 'toolbar',
				cls: 'sub_titlebar',
				id: 'placebeersearchtoolbar',
				ui: 'neutral',
				docked: 'top',
				items: [
					searchField
				]
			},
			searchInfoBar = {
				xtype: 'container',
				id: "placebeersearchinfobar",
				styleHtmlContent: true,
				docked: 'top',
				html: i18n.app.HINT_SEARCH2CHAR,
				flex: 1
			};

		this.add([toolbar, searchInfoBar]);
	},
	onAddBeerButtonTap: function(){
		this.fireEvent("beerAddCommand", this);
	}
});

Ext.define('B2B.view.Privacy_Informativa', {
	extend: 'Ext.Panel',
	xtype: 'privacy_informativa',
	config: {
		title: i18n.app.PANEL_PRIVACY,
		iconCls: 'settings6',
		styleHtmlContent: true,
		cls: 'slidableToolbar',
		scrollable: true,
		html: [
		//	'<h1>Terms of Service</h1>',
			i18n.app.HTML_PRIVACY_INFORMATIVA,
		].join("")
	},
	initialize: function(){
        
        this.callParent(arguments);

        var toolbar = {
            xtype: 'toolbar',
            title: i18n.app.LABEL_PRIVACY,
            cls: "sub_titlebar, slidableToolbar",
            ui: 'beermainflat',
            docked: 'top',
            id: 'DisclaimerTitlebarInformativa',
            defaults: {
                iconMask: true
            }
        };

        this.add([toolbar]);
    }
});

Ext.define('B2B.view.Beer', {
	extend: 'Ext.Panel',
	xtype: 'beer',
	/*
	requires: [
		'Ext.SegmentedButton'
	], */
	config: {
		title: i18n.app.LABEL_BEERS,
		iconCls: 'drink_beerpint',
		scrollable: false,
		layout: {
			type: 'fit'
		}
	},
	initialize: function(){
		this.callParent(arguments);

		var beersearch = {
			xtype: 'beersearch',
			id: 'beersearch'
		},
		beerlist = {
			xtype: "beerlist",
			id: "beerlist",
			store: null,
			singleSelect: true,
			scrollable : {
				translationMethod : 'cssTransform'
			}
		};

		this.add([ beersearch, beerlist]);
	}
});

Ext.define('B2B.view.Component_IOSToggle', {
	extend: 'Ext.field.Toggle',
	xtype: 'iostogglefield',
	config: {
		cls: 'ios5_toggle'
	}/*,
    HH Commentato perchè maschera la generazione degli eventi
	initialize: function () {			        
        var me = this;
        var mec = this.getComponent();
        var mythumb = this.element.down('.x-thumb');
        var mytoggle = this.element.down('.x-toggle');
        var myelement = this.element;
        
        mythumb.on({
            // this improves the ON/OFF effect 
            drag: {
                fn: function () {
                    var value,oldvalue,onCls,offCls;
                    value = me.getValue();
                    onCls = me.getMaxValueCls(),
                    offCls = me.getMinValueCls();
                    if(value != oldvalue) {
                        mytoggle.addCls(value ? onCls : offCls);
                        mytoggle.removeCls(value ? offCls : onCls);
                    }
                    oldvalue = value;
                }
            },
            tap: {
                fn: function (e,t) {
                    var value,oldValue,onCls,offCls,thumb;
                    oldValue = me.getValue();
                    value = ((me.getValue()==1) ? 0 : 1);
                    mec.setIndexValue(0, value, mec.getAnimation());
                    onCls = me.getMaxValueCls(),
                    offCls = me.getMinValueCls();
                    mytoggle.addCls(value ? onCls : offCls);
                    mytoggle.removeCls(value ? offCls : onCls);
                }
            }
        });
    }*/
});

Ext.define('B2B.view.Beer_Component', {
	extend: 'Ext.Panel',
	xtype: 'beercomponent',
	requires: [
		'Ext.SegmentedButton'
	],
	config: {
		title: i18n.app.LABEL_BEERS,
		iconCls: 'trash',
		layout: {
        	type: 'fit'
        }
	},
	initialize: function(){
		this.callParent(arguments);

		var me = this,
		backBeerSelectButton = {
			text: i18n.app.BTN_BACK,
			ui: 'back',
			id: 'back_beerselect_btn',
			handler: this.onBackBeerSelectButtonTap,
			scope: this
		},
		toolbar = {
			xtype: 'toolbar',
			docked: 'top',
			cls: 'sub_titlebar',
			title: i18n.app.PANEL_BEER,
			id: 'BeerSelectTitlebar',
			defaults: {
				iconMask: true
			},
			items: [
				backBeerSelectButton
			]
		},
		selectbeerfavorite= {
			xtype: 'selectfield',
			name: "selectbeerfavorite",
			id: "selectfieldbeerfavorite",
			cls: 'beer_form_selectfield',
			placeHolder: i18n.app.HINT_BEERCHOOSE,
			store: Ext.getStore("FavoriteBeers_Local"),
			valueField: "beerName",
			displayField: "beerName",
			docked: 'top'
		},
		beerList = {
			xtype: "beerlist",
			id: "beerlistselect",
			store: null,
			singleSelect: true,
			scrollable : {
				translationMethod : 'cssTransform'
			}
		};

		this.add([toolbar, selectbeerfavorite, beerList]);
	},
	onBackBeerSelectButtonTap: function(){
		this.fireEvent("backBeerSelectCommand", this);
	}
});



Ext.define('B2B.view._Register', {
	extend: 'Ext.form.Panel',
	id: '_register',
	xtype: '_register',
	config: {
		iconCls: 'settings6',
		url: HH.IP_PORT_SERVER,
		styleHtmlContent: true,
		items: [
			{
				xtype: 'fieldset',
				margin: '50px auto',
				id: '_registerfieldset',
				items:[
					{
						xtype: 'hiddenfield',
						name: 'email'
					},
					{
						xtype: 'hiddenfield',
						name: 'idFacebook'
					},
                    {
                       xtype: 'hiddenfield',
                       name: 'idTwitter'
                    },
					{
						xtype: 'textfield',
						id: 'registerform_email',
						name: 'idUser',
						label: i18n.app.PLACEHOLDER_USERNAME,
						labelWidth: '40%',
						placeHolder: i18n.app.PLACEHOLDER_EMAIL,
						listeners: {
						keyup: function(fld, e){
							if (e.browserEvent.keyCode == 13 || e.browserEvent.keyCode == 10) {
									e.stopEvent();
									fld.element.dom.blur();
									window.scrollTo(0,0);
								}
							}
					   }
					},
					{
						xtype: 'textfield',
						id: 'registerform_displayname',
						name: 'displayName',
					    label: i18n.app.FORM_DISPLAYNAME,
					    labelWidth: '40%',
						placeHolder: i18n.app.PLACEHOLDER_DISPLAYNAME,
						listeners: {
		                    keyup: function(fld, e){
		                        if (e.browserEvent.keyCode == 13 || e.browserEvent.keyCode == 10) {
		                            e.stopEvent();
		                            fld.element.dom.blur();
		                            window.scrollTo(0,0);
		                        }
		                    }
		                }
					},
					{
					   xtype: 'selectfield',
					   name: 'gender',
					   label: i18n.app.FORM_GENDER,
					   labelWidth: '40%',
					   placeHolder: i18n.app.HINT_CHOOSEGENDER,
					   title: i18n.app.HINT_CHOOSEGENDER,
					   options: [
					   		{
								text: i18n.app.LABEL_UNDISCLOSED,
								value: 0
							},
							{
								text: i18n.app.LABEL_MALE,
								value: 1
							},
							{
								text: i18n.app.LABEL_FEMALE,
								value: 2
							}
						]
					},
					{
						xtype: 'datepickerfield',
						destroyPickerOnHide: true,
						name: 'birthDate',
						label: i18n.app.FORM_BIRTHDATE,
						labelWidth: '40%',
						placeHolder: i18n.app.HINT_CHOOSEBIRTHDATE,
						yearFrom: 1940
					},
					{
						xtype: 'selectfield',
						name: "nationality",
						cls: "nationality",
						label: i18n.app.FORM_NATIONALITY,
						labelWidth: '40%',
						placeHolder: i18n.app.HINT_CHOOSENATIONALITY,
						options: i18n.countries
					},
                    {
                       xtype: 'hiddenfield',
                       name: 'avatar'
                    },
				]
			}
		]
	},
	initialize: function(){
        this.callParent(arguments);

		var button_Register = {
			xtype: 'button',
			id: 'btn_register',
            width: 150,
            margin: '15px auto',
            ui: 'action',
            text: utils.__(i18n.app.BTN_REGISTER),
			handler: this.onRegisterButtonTap
		}

        Ext.getCmp('_registerfieldset').add([ button_Register]);
    },

    onRegisterButtonTap: function(){
    	var values = Ext.getCmp("_register").getValues();
        this.fireEvent("registerCommand", this, values);
    }
});

 Ext.define('B2B.view.Activity_List', {
	extend: 'Ext.dataview.List',
	requires: [
		'Ext.plugin.PullRefresh'
	],
	xtype: 'activitylist',
	config: {
		loadingText: i18n.app.HINT_LOADING,
		plugins: [
			{
				xclass: 'Ext.plugin.PullRefresh',
				pullRefreshText: i18n.app.HINT_PULLDOWN,
				refreshFn: function(plugin) {
					var store = plugin.up().getStore();
					Ext.Viewport.fireEvent("refreshStore", this, store.getStoreId());
				}
			}
		],
		loadMask: true,
		emptyText: [
			'<div class="activity-list-empty-text list-empty-text">',
				'<h1>'+utils.__(i18n.app.TEXT_NOACTIVITYFOUND)+'</h1>',
				'<p>'+utils.__(i18n.app.TEXT_WHYADDFRIEND)+'</p>',
			'</div>'
		].join(""),
		itemTpl: new Ext.XTemplate([
				"<div class='{[this.getClass(values)]}'>",
					"{[this.getTextString(values)]}",
				"</div>"
			].join(""),
			{
				getClass: function(values){
					return "activity-list-item small-list activity-type" + values.type;
				},
				getAvatarURL: function(values){
					var str = '<img class="avatar_round" src="';
					str += utils.getFriendAvatar(values.idUser);
					str += '" width="48" height="48">';
					return str;
				},
				getImageURL: function(values){
					var str = "";
					if (!_.isEmpty(values.image)){
						str= '<img class="photo" src="'+values.image+'">';
					 }
					return str;
				},
				getTextString: function(values){
					var str = [
						"<div class='list-header'>",
							"<small class='time'>",
								utils.getDate(values.date),
							"</small>",
							"<span class='info'>",
								this.getAvatarURL(values),
							//	utils.getUserDisplayName(values.idUser,values.displayName),
							"</span>",
						"</div>",
					   // "<div class='list-photo'>",
							this.getImageURL(values),
					   // "</div>",
						"<p class='list-text'>",
						  utils.getActivityString(values),
					   "</p>",
					   "<div class='list-footer'>",
							"<span class='like'>",
								(values.like==null?0:values.like),
							"</span>",
					   "</div>",
					   "<div class='clear'></div>"
					].join("");

					return str;
				}
			}
		)
	}
});


Ext.define('B2B.view.DrinkIn_Detail', {
	extend: 'Ext.Panel',
	xtype: 'drinkindetail',
	jsonPlace: null,
	jsonUser: null,
	jsonBeer: null,
	jsonBadges: null,
	currentPoints: null,
	idDrink: null,
	nFriend:0,
	rate: 0,
	config: {
		title: i18n.app.PANEL_DRINKIN,
		iconCls: 'drink_beerpint',
		scrollable: true,
		layout: 'vbox'
	},
	initialize: function(){
		this.callParent(arguments);

		var that = this,
		/*
			getPlaceHTMLFromValues = function(values) {
				var str = "",
					getDescriptionHTML = function(values){
						var str = [
								"<div class='drinkindetail-description'>",
									"<div class='drinkindetail-text'>",
										values.placeName,
									"</div>",
									"<div class='drinkindetail-subtext'>",
										utils.getLocationCategoryFromCode(values.category),
									"</div>",
								"</div>"
								].join("");
						return str;
					};

				str = ["<div class='drinkindetail-title x-form-fieldset-title x-docked-top'>",
							i18n.app.PANEL_DRINKIN_DETAIL_PLACE,
						"</div>",
						"<div class='drinkdetail-place'>",
							getDescriptionHTML(values),
						"</div>"].join("");

				return str;
			},
			getBeerHTMLFromValues = function(values) {
				var str = "",
					getBeerColorHTML = function(values){
						var str = '<img class="drinkindetail-beercolor" src="';
						str += utils.getBeerColorImage(values);
						str += '" />';
						return str;
					},
					getDescriptionHTML = function(values){
						var nationAvatar = (_.isEmpty(values.nationality)) ? "_":(values.nationality).toLowerCase(),
							str = [
								"<img class='drinkindetail-flag' src='resources/flags/"+nationAvatar+".png'>",
								"<div class='drinkindetail-description'>",
									"<div class='drinkindetail-text'>",
										_.titleize(values.name),
									"</div>",
									"<div class='drinkindetail-subtext'>",
										utils.getBeerStyleFromCode(values.beerstyle),
										(values.beertype) ? " - " + utils.getBeerTypeFromCode(values.beertype): "",
									"</div>",
								"</div>"
								].join("");
						return str;
					};

				str = ["<div class='drinkindetail-title x-form-fieldset-title x-docked-top'>",
							i18n.app.PANEL_DRINKIN_DETAIL_BEER,
						"</div>",
						"<div class='drinkdetail-beer'>",
							getBeerColorHTML(values),
							getDescriptionHTML(values),
						"</div>"].join("");

				return str;
			},
		*/
			getBeerHTMLFromValues = function(values) {
				var str = "",
					getBeerColorHTML = function(values){
						var str = '<img class="drinkindetail-beercolor" src="';
						str += utils.getBeerColorImage(values);
						str += '" />';
						return str;
					},
					getDescriptionHTML = function(values){
						var nationAvatar = (_.isEmpty(values.nationality)) ? "_":(values.nationality).toLowerCase(),
							str = [
								"<img class='drinkindetail-flag' src='resources/flags/"+nationAvatar+".png'>",
								"<div class='drinkindetail-description'>",
									"<div class='drinkindetail-text'>",
										utils.getDrinkString(values, true),
									"</div>",
								"</div>"
								].join("");
						return str;
					};

				str = [
						"<div class='drinkdetail-beer'>",
							getBeerColorHTML(values),
							getDescriptionHTML(values),
						"</div>"].join("");

				return str;
			},
			getDrinkInDetailInfo = function(jsonBeer, jsonPlace, rate) {
				var beer = {
						beerName: jsonBeer.name,
						placeName: jsonPlace.placeName,
						rate: rate,
						beerstyle: jsonBeer.beerstyle,
						nationality: jsonBeer.nationality
					},
					str = ["<div class='drinkindetail-info'>",
								getBeerHTMLFromValues(beer),
								//getPlaceHTMLFromValues(jsonPlace),
							"</div>"].join("");
				return str;
			},
			getScoreHTMLFromJson = function(values) {
				var getBadgesHTMLFromValues = function(arrayValues) {
					var str = "",
						getBadgeImageHTML = function(image) {
							var str = '<img class="score-badge-image" src="';
							if (_.isEmpty(image)){
								 str += HH.default_place48;
							 }else{
								str+=image;
							 }
							str += '" />';
							return str;
						},
						getBadgeNameFromValues = function(values) {
							var tpl = "",
								className = "score-badge-message",
								badgename = utils.getBadgeName("" + values.idBadge);

							if (values.name) {
								className += (values.active === true ? " active" : "");
								tpl = "<div class='" + className + "'>" + (badgename?badgename:values.name);
								tpl += "</div>";
							}

							return tpl;
						},
						getBadgeHTMLFromValues = function(values) {
							var str = "";

							if (values) {
								str = [
									"<div class='score-badge'>",
										getBadgeImageHTML(values.image),
										getBadgeNameFromValues(values),
									"</div>"].join("");
							}

							return str;
						};

					if (arrayValues) {
						var ln = arrayValues.length,
							i = 0;

						str = "<div class='score-badge-list'>";

						if (ln > 0) {
							str+= "<div class='drinkindetail-group-title badges'>" + i18n.app.DRINKINDETAIL_UNLOCKBADGES + "</div>"
						}

						for (i = 0; i < ln; i+=1) {
							str += getBadgeHTMLFromValues(arrayValues[i]);
						}

						str += "</div>";
					}

					return str;
				},
				getRankHTML = function() {
					var arrayFriend = Ext.getStore("Friends_sortedPoint_Local").data.items,
						ln = arrayFriend.length, i = 0,
						str = "",
						getFriendNameFromValues = function(values) {
							var name = "", str = "";

							if (!_.isEmpty(values.firstName)) {
								name += values.firstName + " ";
							}

							if (!_.isEmpty(values.lastName)) {
								name += values.lastName;
							}

							str = [
							"<div class='rank-row-name'>",
								"<div class='rank-row-title'>" + utils.getDisplayName(values) + "</div>",
								"<div class='rank-row-subtitle'>" + name + "</div>",
							"</div>"].join("");

							return str;
						},
						getFriendImageHTML= function(values){
							var str = '<img class="rank-row-image" src="';

							if (_.isEmpty(values.avatar) || values.avatar==HH.default_user48){
								str += HH.default_user32;
							} else {
								str += values.avatar;
							}

							str += '" />';
							return str;
						},
						getFriendHTMLFromValues = function(values){
							var str = "";

							if (values) {
								str = [
									"<div class='rank-row'>",
										getFriendImageHTML(values),
										getFriendNameFromValues(values),
										"<div class='rank-row-points'>" + values.currentPoints + " Pnt.</div>",
									"</div>"].join("");
							}

							return str;
						},
						getFriendList = function(){
							var user = Ext.getStore("Profile_Local").first().data,
								strTemp = "<div class='rank-list'>",
								oldUser = null,
								oldOldUser = null,
								findPosition = false;
							//per essere sicuri di usare punteggio giusto:
							if(that.currentPoints)
							{
								//HH.log("update points")
								user.currentPoints=that.currentPoints;
							}
							/*
							if (Ext.getStore("Friends_Ajax").getCount() == 0) {
								Ext.Viewport.fireEvent("refreshFriends", this);
							}*/
							HH.log(arrayFriend);
							if (ln > 0) {
								//HH.log("gli amici ci sono:"+ ln);
								for (i = 0; i < ln; i+=1) {
									//utente migliore di me->oldUser

									//se ho voto migliore di friend ho trovato mia posizione
									if (user.currentPoints>arrayFriend[i].data.currentPoints) {
										//se c'è utente migliore lo visualizzo
										if (oldUser!=null) {
											strTemp += getFriendHTMLFromValues(oldUser);
											that.nFriend+=1;
										}
										//poi mi visualizzo

										strTemp += getFriendHTMLFromValues(user);
										that.nFriend+=1;
										//e infine visualizzo utente peggiore di me

										strTemp += getFriendHTMLFromValues(arrayFriend[i].data);
										that.nFriend+=1;
										//se non c'è nessuno migliore di me visualizzo un ulteriore elemento sotto
										if(that.nFriend<3 && ln>1){
											strTemp += getFriendHTMLFromValues(arrayFriend[i+1].data);
											that.nFriend+=1;
										}
										findPosition = true;
										break;
									} else {
										if(oldUser==null){
											oldUser = arrayFriend[i].data;
										}else{
											oldOldUser=oldUser;
											oldUser = arrayFriend[i].data;
										}

									}
								}
								//se non ho trovato una posizione
								if (findPosition == false) {
									//sono il peggiore
									if(oldOldUser!=null)
									{
										strTemp += getFriendHTMLFromValues(oldOldUser);
										that.nFriend+=1;
									}
									strTemp += getFriendHTMLFromValues(oldUser);
									that.nFriend+=1;
									strTemp += getFriendHTMLFromValues(user);
									that.nFriend+=1;
								}
							}

							strTemp += "</div>";
						return strTemp;
						};

					str = "<div class='rank-container'>";

					if (ln > 0) {
						str += "<div class='drinkindetail-group-title rank'>" + i18n.app.DRINKINDETAIL_RANK_TITLE + "</div>";
						str += getFriendList();
					}

					str += "</div>";

					return str;
				},
				str = [
					"<div class='drinkindetail-container'>",
						//"<div class='drinkindetail-message'>" + i18n.app.DRINKINDETAIL_MESSAGE + "</div>",
						"<div class='drinkindetail-group-title score'>" + i18n.app.DRINKINDETAIL_SCORE_TITLE + "</div>",
						"<div class='drinkindetail-points'>" + i18n.app.DRINKINDETAIL_SCORE_MESSAGE + "</div>",
						getBadgesHTMLFromValues(values),
						getRankHTML(),
					"</div>",
				].join("");

				return str;
			},
			toolbar = {
				xtype: 'toolbar',
				cls: 'sub_titlebar',
				ui: 'beermainflat',
				docked: 'top',
				title: i18n.app.PANEL_DRINKIN
			},
			okButton = {
				xtype: "button",
				text: i18n.app.BTN_OK,
				ui: 'action',
				id: 'drinkin_ok_btn',
				margin: '0 10 10 10',
				handler: this.onOkButtonTap,
				scope: this
			},
			infocontent = {
				xtype: 'container',
				id: 'drinkbeerdetailcontent',
				html: getDrinkInDetailInfo(this.jsonBeer, this.jsonPlace, this.rate),
				margin: '10 10 10 10'
			},
			htmlContent = {
				xtype: 'container',
				id: 'htmlContent',
				html: getScoreHTMLFromJson(this.jsonBadges),
				margin: '5 10 10 10',
				height: 60 + (this.jsonBadges.length > 0 ? 20 : 0) + (this.jsonBadges.length * 40) + (this.nFriend > 0 ? 20 : 0) + (this.nFriend*40)
			};
		this.add([toolbar, infocontent, htmlContent, okButton]);

		Ext.Viewport.fireEvent("refreshBadges", this);
	},
	onOkButtonTap: function() {
		Ext.getCmp("drinkin_ok_btn").disable()

		if(Ext.getCmp("drinkInButton")) {
			Ext.getCmp("drinkInButton").enable();
		}

		Ext.getCmp("userprofile").setMasked(false);
		this.fireEvent("endCheckInCommand", this);
	}
});

Ext.define('B2B.view.Favorites_Beer_List', {
	extend: 'Ext.dataview.List',
	xtype: 'favoritesbeerlist',
	config: {
		cls: 'base_bg',
		loadingText: i18n.app.HINT_LOADING,
		emptyText: [
			'<div class="beer-list-empty-text list-empty-text">',
				'<h1>'+utils.__(i18n.app.TEXT_NOBEERFOUND)+'</h1>',
				'<p>'+utils.__(i18n.app.TEXT_WHYADDBEER)+'</p>',
			'</div>'
		].join(""),
		itemTpl: new Ext.XTemplate("<div class='{[this.getClass(values)]}'>{[this.getImage1URL(values)]}{[this.getString(values)]}</div>",
		{
			getClass: function(values){
				return "small-list beer-list-item-title beerTypeClass"+values.beerstyle;
			},
			getImage1URL: function(values){
					/*
					var str = '<img class="avatar_small" src="';
					if (_.isEmpty(values.beerstyle)){
						 str += 'resources/img/default/blank_beer32.png';
					 }else{
						str += 'resources/img/default/blank_beer32.png';
					 }
					str += '" width="32" height="32">';
					return str;
					*/
					// Invece degli stili per ora facciamo vedere il colore della birra
					var str = '<img class="avatar_small" src="';
					str += utils.getBeerColorImage(values);
					str += '" width="32" height="32">';
					return str;
			},
			getImage2URL: function(values){
				var str = '<img class="avatar_small" src="';
				if (!_.isEmpty(values.beerstyle)){
					switch(parseInt(values.beerstyle)){
						case 0:
							str += 'resources/img/default/beer_color_1.png';
							break;
						case 1:
							str += 'resources/img/default/beer_color_0.png';
							break;
						case 2:
							str += 'resources/img/default/beer_color_0.png';
							break;
						case 3:
							str += 'resources/img/default/beer_color_1.png';
							break;
						case 4:
							str += 'resources/img/default/beer_color_3.png';
							break;
						case 5:
							str += 'resources/img/default/beer_color_2.png';
							break;
						case 6:
							str += 'resources/img/default/beer_color_0.png';
							break;
						case 7:
							str += 'resources/img/default/beer_color_3.png';
							break;
						case 8:
							str += 'resources/img/default/beer_color_1.png';
							break;
						case 9:
							str += 'resources/img/default/beer_color_1.png';
							break;
						case 10:
							str += 'resources/img/default/beer_color_3.png';
							break;
						case 11:
							str += 'resources/img/default/beer_color_0.png';
							break;
						default:
							str += 'resources/img/default/blank_beer32.png';
							break;
					}
				}
				str += '" width="32" height="32">';
			  //  HH.log("return "+str);
			  //  HH.log(values)
				return str;
			},
			getString: function(values){
				var nationAvatar = (_.isEmpty(values.nationality)) ? "_":(values.nationality).toLowerCase();
				var tpl = [
					"<div class='small-list-right'>",
						"<img src='resources/flags/"+nationAvatar+".png'>",
					"</div>",
					"<div class='small-list-text'>",
						_.titleize(values.name),
					"</div>",
					"<div class='small-list-subtext'>",
						utils.getBeerStyleFromCode(values.beerstyle),
						(values.beertype) ? " - " + utils.getBeerTypeFromCode(values.beertype): "",
					"</div>"].join("");
				return tpl;
			}
		})
	}
});


Ext.define('B2B.view.Badge_List', {
	extend: 'Ext.dataview.List',
	xtype: 'badgelistcomponent',
	config: {
		loadingText: i18n.app.HINT_LOADING,
        emptyText: [
            '<div class="badge-list-empty-text list-empty-text">',
                '<h1>'+utils.__(i18n.app.TEXT_NOBADGEFOUND)+'</h1>',
            '</div>'
        ].join(""),
		itemTpl: new Ext.XTemplate([
				"<div class='{[this.getClass(values)]}'>",
					"{[this.getImageURL(values)]}",
					"{[this.getString(values)]}",
				"</div>"
			].join(""),
		{
			getClass: function(values) {
				return "badge-list-item-title small-list";
			},
			getImageURL: function(values) {
					var str = "",
					className = (values.active === true ? " active" : "");
					str = "<img class='" + className + "' src='";
					var s = utils.getBadgeImage(""+values.image);
					str += s;
					str += "' width='64' height='64'>";
					return str;
			},
			getString: function(values) {
				var tpl = "",
					className = "badge-list-text";
				var badgename=utils.getBadgeName(""+values.idBadge);
				if (values.name) {
					className += (values.active === true ? " active" : "");
					tpl = "<div class='" + className + "'>" + (badgename?badgename:values.name) + "</div>";
					tpl += "</div>";
				}

				return tpl;
			}
		})
	}
});


Ext.define('B2B.view.User_Preferences_Form', {
	extend: 'Ext.form.Panel',
	xtype: 'userpreferencesform',
	id: 'userpreferencesform',
	requires: [
		'Ext.form.FieldSet',
		'Ext.field.Password'
	],
	config: {
		title: i18n.app.PANEL_PREFERENCES,
		iconCls: 'settings6',
		url: '/cippa.php'
	},

	initialize: function(){
		this.callParent(arguments);
		var me = this;

		var savePreferencesButton = {
			text: i18n.app.BTN_SAVE,
			ui: 'action',
			iconCls: 'check_yes',
			id: 'save_preferences_btn',
			handler: this.onSavePreferencesButtonTap,
			scope: this
		},
		cancelButton = {
			text: i18n.app.BTN_CANCEL,
			ui: 'action',
			id: 'cancel_preferences_btn',
			handler: this.onCancelButtonTap,
			scope: this
		},
		toolbar = {
			xtype: 'toolbar',
			docked: 'top',
			cls: 'sub_titlebar',
			title: i18n.app.PANEL_PREFERENCES,
			id: 'PreferencesFormTitlebar',
			ui: 'neutral',
			defaults: {
				iconMask: true
			},
			items: [
				cancelButton,
				{ xtype: 'spacer' },
				savePreferencesButton
			]
		},
		notificationField = {
			xtype: 'fieldset',
			title: i18n.app.PANEL_NOTIFICATION,
			items: [
				{
					xtype: 'iostogglefield',
					name: 'enableNotification',
					label: i18n.app.FORM_NOTIFICATIONENABLE,
					labelWidth: '50%',
					listeners: {
						change: function (slider, thumb, newValue, oldValue) {
						   HH.log("TODO: Notification Toggle");
						}
					}
				}
			]
		},
		twitterToggle = {
			xtype: 'iostogglefield',
			id: 'twitterToggle',
			name: 'shareTwitter',
			label: i18n.app.FORM_SHARETWITTER,
			labelWidth: '50%',
			listeners: {
				change: function (slider, thumb, newValue, oldValue) {
					if (oldValue == 0) {
						me.onShareTwitterToggle(false)
					}
					else {
						me.onShareTwitterToggle(true)
					}
				}
			}
		},
		facebookToggle = {
			xtype: 'iostogglefield',
			id: 'facebookToggle',
			name: 'shareFacebook',
			label: i18n.app.FORM_SHAREFACEBOOK,
			labelWidth: '50%',
			listeners: {
				change: function (slider, thumb, newValue, oldValue) {
					if (oldValue == 0) {
						me.onShareFacebookToggle(false)
					}
					else {
						me.onShareFacebookToggle(true)
					}
				}
			}
		},
		fieldsetShare = {
			xtype: 'fieldset',
			title: i18n.app.PANEL_SHARE,
			id: "fieldset_share",
			items: [
				twitterToggle,
				facebookToggle
			]
		};

		this.add([toolbar, notificationField, fieldsetShare]);

	},
	activate: function(){
		this.fireEvent("showPreferencesCommand", this);
	},
	onSavePreferencesButtonTap: function(){
		this.fireEvent("savePreferencesCommand", this);
	},
	onShareTwitterToggle: function(what){
		this.fireEvent("toggleTwitterCommand", this, what);
	},
	onShareFacebookToggle: function(what){
		this.fireEvent("toggleFacebookCommand", this, what);
	},
	onCancelButtonTap: function() {
		this.fireEvent("backPreferencesCommand", this);
	}
});

Ext.define('B2B.view.Drink_List_Custom_Container', {
	extend: 'Ext.Panel',
	xtype: 'drinklistcustomcontainer',
	config: {
		title: i18n.app.LABEL_DRINKS,
		iconCls: 'drink_list',
		layout: {
			type: 'card',
            animation : 'flip'
		}
	},
	initialize: function() {
		this.callParent(arguments);

		var backButton = {
			text: i18n.app.BTN_BACK,
			ui: 'back',
			id: 'backCustomButton',
			handler: this.onBackButtonTap,
			scope: this
		},
		changeViewButton = {
			text: i18n.app.BTN_LIST,
			ui: 'action',
			id: 'changeCustomViewButton',
			handler: this.onChangeButtonTap,
			scope: this
		},
		toolbar = {
			xtype: 'toolbar',
			docked: 'top',
			cls: 'sub_titlebar',
			ui: 'beermainflat',
			title: i18n.app.LABEL_DRINK,
			id: 'DrinksContainerTitlebar',
			defaults: {
				iconMask: true
			},
			items: [
				backButton,
				{ xtype: 'spacer' },
				changeViewButton
			]
		},
		drinkList = {
			xtype: "drinkinlist",
			id: 'drinklistcustom',
			store: Ext.getStore("Drinks_Custom_Ajax")
		},
		mapDrinkList = {
			xtype: 'map',
			id: 'mapDrinksCustom',
			flex: 1,
			useCurrentLocation: true,
			mapOptions: {
				zoom: HH.map.zoomLevel,
				mapTypeId : google.maps.MapTypeId.ROADMAP,
				navigationControl: true,
				zoomControl: true,
				mapTypeControl: false,
				scaleControl: true,
				streetViewControl: true,
				panControl: true,
				draggable: true,
				scrollwheel: true,
                disableDoubleClickZoom: false
			},
			listeners: {
				maprender: function(me, map) {
					map.markers = [];
				},
				centerchange: function(me, map) {
					if (map.clearMarkers) {
						map.clearMarkers();
					}

					/*
					map.markers.push(new google.maps.Marker({
							position: new google.maps.LatLng(this._geo.getLatitude(), this._geo.getLongitude()),
							map: map,
							icon: HH.map.currentMarker
					}));
					*/

					Ext.getStore("Drinks_Custom_Ajax").getData().each(function(record) {
						map.markers.push(new google.maps.Marker({
								position: new google.maps.LatLng(record.data.lat, record.data.lng),
								map: map,
								icon: HH.map.marker
						}));
					});
				}
			}
		};

		this.add([toolbar, mapDrinkList, drinkList]);
	},
	onBackButtonTap: function() {
		Ext.getCmp("backCustomButton").disable();
		Ext.getCmp("friendlistdetail").setMasked(false);
		this.fireEvent("backToProfileCommand", this);
	},
	onChangeButtonTap: function() {
		this.fireEvent("switchViewCommand", this);
	}
});

Ext.define('B2B.view.Friend_Invite_Search', {
	extend: 'Ext.Panel',
	requires: [
		'Ext.field.Search'
	],
	xtype: 'friendinvitesearch',
	config: {
		docked: 'top'
	},
	initialize: function(){
		this.callParent(arguments);

		var oldValueCount = 0,
			searchFriendButton = {
				xtype: "button",
				text: i18n.app.BTN_SEARCHFRIEND,
				ui: 'action',
				id: 'search_friend_facebook_btn',
				iconCls: 'smiley_friend_add',
				iconMask: true,
				handler: this.onSearchFriendButtonTap,
				scope: this
			},
			searchField = {
				xtype: 'searchfield',
				placeHolder: i18n.app.LABEL_SEARCH,
				name: 'friendfiltersearch',
				flex: 1,
				listeners : {
		            scope: this,
		            keyup: function(field) {
			           	var value = field.getValue();
			           	var store = Ext.getStore('Visualized_Friends_Facebook_Local');
                        store.removeAll();
                        store.sync();

           
			           	if(value < oldValueCount){
			           		store.clearFilter();
			            }

			            oldValueCount = value;

			           	if (!value) {
			           		store.filterBy(function() {
			                    return true;
			                });
						} else {
							var searches = value.split(' '), regexps  = [], i;

							for (i = 0; i < searches.length; i++) {
								if (!searches[i]) return;
								regexps.push(new RegExp(searches[i], 'i'));
							};
							store.filterBy( function(record) {
			                    var matched = [];

								for (i = 0; i < regexps.length; i++) {
									var search = regexps[i];

									if (record.get('displayName').match(search)) matched.push(true);
									else matched.push(false);
								};
								if (regexps.length > 1 && matched.indexOf(false) != -1) {
									return false;
								} else {
									return matched[0];
								}
							});
			            }
		            }
	            }
			},
			friendsearchtoolbar = {
				xtype: 'toolbar',
				id: 'friendfacebooksearchtoolbar',
				cls: 'sub_titlebar',
				ui: 'beerneutral',
				docked: 'top',
				items: [
					searchField/*,
					searchFriendButton*/
				]
			};

		this.add([friendsearchtoolbar]);
	},
	onSearchFriendButtonTap: function(){
		Ext.getCmp("search_friend_facebook_btn").disable();
		this.fireEvent("searchFriendCommand", this);
	}
});

Ext.define('B2B.view.Camera_Container', {
	extend: 'Ext.Container',
	xtype: 'cameracontainerpanel',
	config: {
		title : i18n.app.LABEL_CAMERA,
		iconCls : 'photo1',
		styleHtmlContent: true,
		scrollable: true,
		layout: 'vbox'
	},
	initialize: function (a, b) {
		this.callParent(arguments);

		var components = [
			{
				xtype: "image",
				id: 'PhotoView',
				src: '',
				flex: 1
			},
			{
				xtype: "button",
				text: i18n.app.BTN_PHOTO,
				ui: 'action',
				id: 'takephoto_btn',
				handler: this.onTakePhotoButtonTap,
				scope: this,
				height: 50
			}
		];

		this.add(components);
	},
	onTakePhotoButtonTap: function(){
		this.fireEvent("takePhotoCommand", this, Ext.getCmp("PhotoView"));
	}
});

Ext.define('B2B.view.Notification', {
	extend: 'Ext.Panel',
	xtype: 'notification',
	config: {
		title: i18n.app.LABEL_FRIENDS,
		iconCls: 'user_list',
        layout: {
        	type: 'fit'
        }
	},
	initialize: function(){

    	this.callParent(arguments);
    	var storeProfile = Ext.getStore("Profile_Local");
        var storeJSONP=Ext.getStore('Notifications_Ajax');
        var user=storeProfile.first().data;
        HH.log("LOAD PROFILE FOR notification "+user.idUser);
        storeJSONP.getProxy().setExtraParam('idUser', user.idUser);
        storeJSONP.getProxy().setExtraParam('btUsername',user.idUser);
        storeJSONP.getProxy().setExtraParam('btSid', user.token);//user.token
        storeJSONP.load();
    	var markNotificationAllReadButton = {
			xtype: "button",
			text: i18n.app.BTN_MARKALLREAD,
			ui: 'action',
			id: 'mark_notification_allread_btn',
			handler: this.onMarkNotificationAllReadButtonTap,
			scope: this
		};

      var backNotificationButton = {
          text: i18n.app.BTN_BACK,
          ui: 'back',
          id: 'back_notification_btn',
          handler: this.onBackNotificationButtonTap,
          scope: this
      	};

		var toolbar = {
			xtype: 'toolbar',
			cls: 'sub_titlebar',
			title: i18n.app.PANEL_NOTIFICATION,
			docked: 'top',
			ui: 'beermainflat',
			items: [
				backNotificationButton,
				{
					xtype: 'spacer'
				},
				markNotificationAllReadButton
			]
		};

		var notificationList = {
		    xtype: "notificationlist",
		    id: "notificationlist",
		    store: Ext.getStore("Notifications_Ajax"),
		};

		this.add([toolbar, notificationList]);

    },
	onMarkNotificationAllReadButtonTap: function(){
		this.fireEvent("notificationReadAllCommand", this);
	},
	onBackNotificationButtonTap: function(){
		this.fireEvent("notificationBackCommand", this);
	}

});

Ext.define('B2B.view.Badge_Detail', {
	extend: 'Ext.form.Panel',
	id: 'badgedetailpanel',
	xtype: 'badgedetailpanel',
	config: {
		title: i18n.app.PANEL_BADGEDETAIL,
		items: [
		],
		html: [
			'<h1>Badge Detail</h1>',
			'I changed the default <b>HTML Contents</b> to something different!'
		].join("")
	},
	initialize: function(){
		this.callParent(arguments);

		var backButton = {
			text: i18n.app.BTN_BACK,
			ui: 'back',
			id: 'BackBadgeDetailBtn',
			handler: this.onBackButtonTap,
			scope: this
		},
		title = this.jsonData.title,
		toolbar = {
			xtype: 'toolbar',
			docked: 'top',
			cls: 'sub_titlebar',
			ui: 'beermainflat',
			title: (_.isEmpty(title) ? i18n.app.PANEL_BADGEDETAIL : title),
			id: 'BadgeDetailTitlebar',
			defaults: {
				iconMask: true
			},
			items: [
				backButton,
				{ xtype: 'spacer' }
			]
		},
		html = this.getStringHTMLFromValues(this.jsonData);

		this.add([toolbar]);
		this.setHtml(html);
	},
	getStringHTMLFromValues: function(badge){
		var value = '';

		value += '<div class="badge-detail">';
		value += '<img class="badge-image-big" src="';
		if (_.isEmpty(badge.imageUlr)) {
			value += HH.default_badge64;
		} else {
			value += badge.imageUrl;
		}
		value += '" width="200" height="200" />';
		value += '<hr />';
		value += '<p class="badge-title"><b>' + badge.title + '</b></p>';
		value += '<p class="badge-description">' + badge.description + '</p>';
		value += '</div>';
		return value;
	},
	onBackButtonTap: function() {
		this.fireEvent("backBadgesCommand", this);
	}
});

Ext.define('B2B.view.History_Panel', {
	extend: 'Ext.Panel',
	xtype: 'historypanel',
    id: 'historypanel',
	config: {
		title: i18n.app.PANEL_HISTORY,
		iconCls: 'home2',
		styleHtmlContent: true,
		layout: {
        	type: 'fit'
        }
	},
	initialize: function() {
        this.callParent(arguments);
         var storeProfile = Ext.getStore("Profile_Local");
        var storeJSONP=Ext.getStore('Activities_User_Ajax');
        var user=storeProfile.first().data;
        HH.log("LOAD PROFILE FOR Activity "+user.idUser);
        storeJSONP.getProxy().setExtraParam('idUser', user.idUser);
        storeJSONP.getProxy().setExtraParam('btUsername',user.idUser);
        storeJSONP.getProxy().setExtraParam('btSid', user.token);//user.token
        storeJSONP.load();
       var backButton = {
            text: i18n.app.BTN_BACK,
            ui: 'back',
            id: 'back_about_btn',
            handler: this.onBackButtonTap,
            scope: this
        },
        toolbar = {
            xtype: 'toolbar',
            docked: 'top',
            cls: 'sub_titlebar',
            ui: 'beermainflat',
            title: i18n.app.BTN_MYACTIVITY,
            id: 'DrinksContainerTitlebar',
            defaults: {
                iconMask: true
            },
            items: [
                backButton,
                { xtype: 'spacer' }
            ]
        },
            activitylist = {
                xtype: "activitylist",
                id: 'activitylisthistory',
                store: Ext.getStore("Activities_User_Ajax"),
            };


		this.add([ toolbar, activitylist ]);
    },
    onBackButtonTap: function() {
        Ext.getCmp("back_about_btn").disable();
        Ext.getCmp("userprofile").setMasked(false);
        this.fireEvent("backToProfileCommand", this);
    }
});

Ext.define('B2B.view.DrinkIn_Badges_List', {
	extend: 'Ext.dataview.List',
	xtype: 'drinkinbadgelistcomponent',
	config: {
		loadingText: i18n.app.HINT_LOADING,
		scrollable: false,
        emptyText: [
            '<div class="badge-list-empty-text list-empty-text">',
                '<p>'+utils.__(i18n.app.TEXT_NOTUNLOCKBADGE)+'</p>',
            '</div>'
        ].join(""),
		itemTpl: new Ext.XTemplate([
				"<div class='{[this.getClass(values)]}'>",
					"{[this.getImageURL(values)]}",
					"{[this.getString(values)]}",
				"</div>"
			].join(""),
		{
			getClass: function(values) {
				return "badge-list-item-title small-list";
			},
			getImageURL: function(values) {
					var str = "",
					className = (values.active === true ? " active" : "");
					str = "<img class='" + className + "' src='";
					if (_.isEmpty(values.image)) {
						str += HH.default_badge64;
					}else{
						str += values.image;
					}
					str += "' width='20' height='20'>";
					return str;
			},
			getString: function(values) {
				var tpl = "",
					className = "badge-list-text";
				var badgename=utils.getBadgeName(""+values.idBadge);
				if (values.name) {
					className += (values.active === true ? " active" : "");
					tpl = "<div class='" + className + "'>"+i18n.app.TEXT_UNLOCKBADGE+" <span class='hilite'>" + (badgename?badgename:values.name) + "</span></div>";
					tpl += "</div>";
				}

				return tpl;
			}
		})
	}
});


Ext.define('B2B.view.Activity', {
	extend: 'Ext.Panel',
	xtype: 'activity',
	config: {
		title: i18n.app.PANEL_ACTIVITY,
		iconCls: 'home2',
		styleHtmlContent: true,
		layout: {
			type: 'fit'
		}
	},
	initialize: function() {
		this.callParent(arguments);

		var storeProfile = Ext.getStore('Profile_Local'),
			storeJSONP = Ext.getStore('Activities_Ajax'),
			user = null,
			mylatestdrink = {
				xtype: "panel",
				id: "mylatestdrink",
				draggable: false,
				height: 80,
				docked: 'top',
				store: Ext.getStore("Drinks_Ajax"),
				tpl: new Ext.XTemplate([
					"<div class='{[this.getClass()]}'>",
						"{[this.getTextString(values)]}",
					"</div>"
				].join(""),
				{
					getClass: function(){
						return "small-list";
					},
					getImageURL: function(a){
						var str = '<img class="avatar" src="';
						str += utils.getUserAvatar();
						str += '" width="64" height="64">';
						return str;
					},
					getTextString: function(values){
						var str = [
							"<div class='list-header-mylastdrink'>",
								"<small class='time'>",
									utils.getDate(values.insertedOn),
								"</small>",
								"<span class='info'>",
									this.getImageURL(values),
								"</span>",
							"</div>",
							"<p class='list-text'>",
								utils.getDrinkString(values, true),
							"</p>",
							"<div class='clear'></div>"
						].join("");

						return str;
					}
				})
			},
			activitylist = {
				xtype: "activitylist",
				id: 'activitylist',
				store: Ext.getStore("Activities_Ajax"),
			};

		if (storeProfile && storeProfile.getCount() > 0) {
			user = storeProfile.first().data;
			HH.log("LOAD PROFILE FOR ACTIVITY " + user.idUser);
			storeJSONP.getProxy().setExtraParam('idUser', user.idUser);
			storeJSONP.getProxy().setExtraParam('btUsername',user.idUser);
			storeJSONP.getProxy().setExtraParam('btSid',user.token);//
		}

		storeJSONP.load();

		this.add([ mylatestdrink, activitylist ]);
	}
});

Ext.define("B2B.view._App_Container", {
	extend: 'Ext.tab.Panel',
	xtype: 'appcontainer',
	requires: [
		'Ext.ux.toolbarspinner.TSpinner',
		'Ext.device.Camera'
	],
	config: {
		activeTab: 0,
		layout: {
			animation: {
				type: null
			},
		},
		tabBar: {
			layout: {
				pack: 'center',
				align: 'stretch'
			},
			docked: 'bottom',
			scrollable: false
		},
		items: [
			{
				title: false,
				xtype: 'activity',
				id: 'activity'
			},
			{
				title: false,
				xtype: 'beer',
				id: 'beers'
			},
			{
				title: false,
				xtype: 'friend',
				id: 'friend'
			},
			{
				title: false,
				xtype: 'userprofile',
				id: 'userprofile'
			}
		],
		listeners: {
			activeitemchange: function(source, value, oldvalue, options) {
				if (value.getId() === "userprofile") {
					Ext.Viewport.fireEvent("refreshProfileStore", this);
				}
			}
		}
	},
	initialize: function(){

		this.callParent(arguments);

		var notificationButton = {
			iconCls: 'chat4',
			ui: 'plain',
			id: 'notificationbutton',
			handler: this.onGotoNotificationButtonTap,
			scope: this,
			align: 'left'
		},
		toolbarSpinner =  {
			xtype : 'tbarspinner',
			id: 'tbarspinner',
			align : 'right',
			hidden: true
		},
		gotoCheckInButton = {
			//iconCls: 'position',
			//text: i18n.app.PANEL_DRINKIN,
			ui: 'action',
			id: 'drinkInButton',
			handler: this.onDrinkInButtonTap,
			scope: this,
			align: 'right'
		},
		titleBar = {
			xtype: 'titlebar',
			docked: 'top',
			id: 'MainTitlebar',
		   	title: '<img id="slider_logo" src="resources/img/logo_text_white.png" width="120px">',
			cls: 'slidableToolbar',
			defaults: {
				iconMask: true
			},
			ui: 'beermain',
			items: [
				notificationButton,
				toolbarSpinner,
				gotoCheckInButton
			]
		},
		notificationBar = {
			xtype: 'notificationbar',
			id: 'notificationBar',
			hidden: true
		}
		this.add([ titleBar, notificationBar ]);
	},
	onDrinkInButtonTap: function() {
		if (utils.isOnline()) {
			if (utils.getAppNeedRestart()) {
				var restartApp = function(button) {
					if (button === 'yes' || button === 2) {
						window.location.reload();
					}
				}
				utils.alert(i18n.app.TEXT_NEEDRESTART, i18n.app.COMMON_ATTENTION, true, restartApp, this);
			} else {
				Ext.getCmp("drinkInButton").disable();
				this.fireEvent("drinkInCommand", this, null);
			}
		}
	},
	onGotoNotificationButtonTap: function(){
		this.fireEvent("notificationShowCommand", this);
	}
});


Ext.define('B2B.view.Place_List', {
    extend: 'Ext.dataview.List',
    xtype: 'placelist',
	config: {
        loadingText: i18n.app.HINT_LOADING,
        emptyText: '</pre><div class="beer-list-empty-text">'+
                '<h1>'+utils.__(i18n.app.TEXT_NOPLACEFOUND)+'</h1></div><pre>',
        itemTpl: new Ext.XTemplate([
                "<div class='{[this.getClass(values)]}'>",
                    "{[this.getTextString(values)]}",
                "</div>",
            ].join(""),
            {
            	getClass: function(values){
            		return "place-list-item small-list";
            	},
            	getImageURL: function(values){
                    var str = '<img class="avatar" src="';
                    if (_.isEmpty(values.image)){
                         str += HH.default_place32;
                     }else{
                        str+=values.image;
                     }
                    str += '" width="32" height="32">';
                	return str;
                },
                getTextString: function(values){
                     var str = [
                        "<div class='small-list-text'>",
                            "<span class='info'>",
                                values.placeName,
                            "</span>",
                            "<span class='small-list-subtext'>",
                                values.distance,
                                "m</span>",
                        "</div>",
                        "<div class='small-list-subtext'>",
                            "<span class='location-category'>",
                                utils.getLocationCategoryFromCode(values.category),
                            "</span>",
                        "</div>",
                         "<div class='list-footer'>",
                            "<span class='drinkins'>",
                                values.drinkedIn,
                            "</span>",
                        "</div>",
                        "<div class='clear'></div>"
                    ].join("");
                    return str;
                }
            }
   		)
	}
});


Ext.define('B2B.view._Login', {
	extend: 'Ext.form.Panel',
	id: '_login',
	xtype: '_login',
	config: {
		iconCls: 'settings6',
        cls: 'loginPanelBackground',
		styleHtmlContent: true,
		// html:'Cannot login? <a href="#">Send me my credentials via email!</a>',
		scrollable: false,
		layout: 'vbox',
		items: [

			{ xtype: 'spacer',
                height: 62
            },

            {
                xtype:'panel',
                styleHtmlContent: true,
                flex: 1,

                layout: 'vbox',
                html: ['<div>',
                       '<img id="logo_upper" src="resources/img/logo_white.png" width="100px">',

                       '</div>'].join("")
                // }
            },
            {
    			xtype: 'fieldset',
    			margin: '10px auto',
    			id: '_loginfieldset',
                //flex: 2
            }
		],

	},
	initialize: function(){
        this.callParent(arguments);

		var button_Login = {
			xtype: 'button',
			id: 'btn_login',
           cls: 'loginButton',
            width: 261,
           height: 58,
            //text: 'Log In',

           //icon: '../resources/img/fb-connect-large.png',
            //margin: '15px auto',
            ui: 'action',
            //text: utils.__(i18n.app.BTN_LOGIN),
			handler: this.onLoginButtonTap
           };

           var tw_button_Login = {
           xtype: 'button',
           id: 'tw_btn_login',
           cls: 'twLoginButton',
           width: 261,
           height: 58,
           //text: 'Log In',
           
           //icon: '../resources/img/fb-connect-large.png',
           //margin: '15px auto',
           ui: 'action',
           //text: utils.__(i18n.app.BTN_LOGIN),
           handler: this.onTwLoginButtonTap
           };
           
        Ext.getCmp('_loginfieldset').add([button_Login]);
        Ext.getCmp('_loginfieldset').add([tw_button_Login]);
    },

    onLoginButtonTap: function(){
        this.fireEvent("loginCommand", this);
    },
    
    onTwLoginButtonTap: function(){
        this.fireEvent("twloginCommand", this);
    }

});

Ext.define('B2B.view.View_AboutUs', {
	extend: 'Ext.Panel',
	xtype: 'viewaboutus',
	config: {
		title: i18n.app.PANEL_TERMS,
		iconCls: 'settings6',
		styleHtmlContent: true,
		cls: 'slidableToolbar',
		html: [
			'<h1>About Us</h1>',
			i18n.app.TEXT_LOREM
		].join("")
	},
	initialize: function(){
        this.callParent(arguments);

        var toolbar = {
            xtype: 'toolbar',
            title: i18n.app.LABEL_ABOUTUS,
            cls: "sub_titlebar, slidableToolbar",
            ui: 'beermainflat',
            docked: 'top',
            id: 'AboutusTitlebar',
            defaults: {
                iconMask: true
            }
        };

        this.add([toolbar]);
    }
});

Ext.define('B2B.view.Friend_List_Custom', {
	extend: 'Ext.dataview.List',
	xtype: 'friendlistcustom',
	config: {
		loadingText: i18n.app.HINT_LOADING,
		loadMask: true,
		emptyText: [
			'<div class="friend-list-empty-text list-empty-text">',
			'</div>',
		].join(""),
		itemTpl: new Ext.XTemplate("<div class='{[this.getClass(values)]}'>{[this.getImageURL(values)]}{[this.getString(values)]}</div>",
		{
			getClass: function(values){
				return "friend-list-item-title small-list";
			},
			getImageURL: function(values){
					//resources/beer/style"+values.beerstyle+".png'
					var str = '<img class="avatar_small" src="';
					str += utils.getFriendAvatar(values.idUser);
					str += '" width="32" height="32">';
					return str;
			},
			getString: function(values){
			/*	var tpl = "<div class='small-list-text'>"+utils.getDisplayName(values)+"</div>";
				if(values.firstName){
					tpl += "<div class='small-list-subtext'>"+values.firstName+;
					if(values.lastName) tpl += " "+values.lastName;
					tpl += "</div>";
				}*/
				var str = "",
					tpl = null,
					points = i18n.app.POINTS + values.currentPoints;
				if (values.status == 1) {
					if (values.firstName) {
						str += values.firstName;
						if(values.lastName) str += " "+values.lastName;
					}

				  tpl = [
					 "<div class='small-list-text'>"+utils.getDisplayName(values)+"</div>",
					"<div class='small-list-subtext'>",
					   points,
					"</div>"
					].join("");
				 } else {
					 tpl = [
					"<div class='small-list-text'>"+utils.getDisplayName(values)+"</div>",
					"<div class='small-list-subtext'>",
					   utils.__(i18n.app.TEXT_WAITINGFRIEND),
					"</div>"
					].join("");
				 }
				return tpl;
			}
		})
	}
});


Ext.define('B2B.view.Friend_Finder', {
	extend: 'Ext.form.Panel',
	id: 'FriendFinder',
	xtype: 'friendfinderpanel',
	requires: [
        'Ext.Container',
        'Ext.MessageBox',
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.field.Select'
    ],
	config: {
		title: i18n.app.PANEL_FRIENDFINDER,
		iconCls: 'add',
		items: [
		]
	},
	initialize: function(){

    	this.callParent(arguments);

    	var backFriendFinderButton = {
			xtype: "button",
			text: i18n.app.BTN_BACK,
			ui: 'back',
			id: 'friendfinder_back_btn',
			handler: this.onFriendFinderBackButtonTap,
			scope: this
		};

		var toolbar = {
			xtype: 'toolbar',
			cls: 'sub_titlebar',
			ui: 'beermainflat',
			docked: 'top',
			items: [
				backFriendFinderButton,
			]
		};
		this.add([toolbar]);

    },
	onFriendFinderBackButtonTap: function(){
		this.fireEvent("backFriendFinderCommand", this);
	}
});

Ext.define('B2B.view.Friend_List_Detail', {
	extend: 'B2B.view.Generic_Profile',
	xtype: 'friendlistdetail',
	isCurrentProfile: false,
	config: {
		title: i18n.app.PANEL_FRIENDDETAIL,
		scrollable: false
	},
	initialize: function(){
		this.callParent(arguments);
	},
	onBadgesButtonTap: function() {
		this.setMasked(true);
		this.fireEvent("badgesFriendsProfileCommand", this);
	},
	onDrinkListButtonTap: function() {
		this.setMasked(true);
		this.fireEvent("drinkListProfileCommand", this);
	},
	onFriendsButtonTap: function() {
		this.setMasked(true);
		this.fireEvent("friendsProfileCommand", this);
	}
});

Ext.define('B2B.view.Beer_List', {
	extend: 'Ext.dataview.List',
	xtype: 'beerlist',
	config: {
		cls: 'base_bg',
		loadingText: i18n.app.HINT_LOADING,
		emptyText: [
			'<div class="beer-list-empty-text list-empty-text">',
				'<h1>'+utils.__(i18n.app.TEXT_NOBEERFOUND)+'</h1>',
            	'<p>'+utils.__(i18n.app.TEXT_WHYADDBEER)+'</p>',
			'</div>'
		].join(""),
		itemTpl: new Ext.XTemplate("<div class='{[this.getClass(values)]}'>{[this.getImage1URL(values)]}{[this.getString(values)]}</div>",
		{
			getClass: function(values){
				return "small-list beer-list-item-title beerTypeClass"+values.beerstyle;
			},
			getImage1URL: function(values){
					/*
					var str = '<img class="avatar_small" src="';
					if (_.isEmpty(values.beerstyle)){
						 str += 'resources/img/default/blank_beer32.png';
					 }else{
						str += 'resources/img/default/blank_beer32.png';
					 }
					str += '" width="32" height="32">';
					return str;
					*/
					// Invece degli stili per ora facciamo vedere il colore della birra
					var str = '<img class="avatar_small" src="';
					str += utils.getBeerColorImage(values);
					str += '" width="32" height="32">';
					return str;
			},
			getImage2URL: function(values){
				var str = '<img class="avatar_small" src="';
				if (!_.isEmpty(values.beerstyle)){
					switch(parseInt(values.beerstyle)){
						case 0:
							str += 'resources/img/default/beer_color_1.png';
							break;
						case 1:
							str += 'resources/img/default/beer_color_0.png';
							break;
						case 2:
							str += 'resources/img/default/beer_color_0.png';
							break;
						case 3:
							str += 'resources/img/default/beer_color_1.png';
							break;
						case 4:
							str += 'resources/img/default/beer_color_3.png';
							break;
						case 5:
							str += 'resources/img/default/beer_color_2.png';
							break;
						case 6:
							str += 'resources/img/default/beer_color_0.png';
							break;
						case 7:
							str += 'resources/img/default/beer_color_3.png';
							break;
						case 8:
							str += 'resources/img/default/beer_color_1.png';
							break;
						case 9:
							str += 'resources/img/default/beer_color_1.png';
							break;
						case 10:
							str += 'resources/img/default/beer_color_3.png';
							break;
						case 11:
							str += 'resources/img/default/beer_color_0.png';
							break;
						default:
							str += 'resources/img/default/blank_beer32.png';
							break;
					}
				}
				str += '" width="32" height="32">';
			  //  HH.log("return "+str);
			  //  HH.log(values)
				return str;
			},
			getString: function(values){
				var nationAvatar = (_.isEmpty(values.nationality)) ? "_":(values.nationality).toLowerCase();
				var tpl = [
					"<div class='small-list-right'>",
						"<img src='resources/flags/"+nationAvatar+".png'>",
					"</div>",
					"<div class='small-list-text'>",
						_.titleize(values.name),
					"</div>",
					"<div class='small-list-subtext'>",
						utils.getBeerStyleFromCode(values.beerstyle),
						(values.beertype) ? " - " + utils.getBeerTypeFromCode(values.beertype): "",
					"</div>"].join("");
				return tpl;
			}
		})
	}
});


Ext.define("B2B.view._App_Slider", {
    extend: 'Ext.ux.slidenavigation.SlideNavigation',
    xtype: 'appslider',
    requires: [
        'Ext.Container',
        'Ext.Toolbar'
    ],
    config: {
        fullscreen: true,
        slideSelector: 'slidableToolbar',
        selectSlideDuration: 200,
        list: {
            id: "slider_left",
            minDrag: 200,
            maxDrag: 400,
            width: 400,
            items: [{
                xtype: 'toolbar',
                docked: 'top',
                ui: 'plain',
                id: 'slider_toolbar',
                title: {
                    title: '<img id="slider_logo" src="resources/img/logopin_text_black_small.png" width="160px">',
                    width: 200,
                    left: 0
                }
            }]

        },
        groups: {
            'Profile': 1,
            'Goodies': 2,
            'News': 3,
            'Privacy': 4
        },
        defaults: {
            xtype: 'container'
        },
        items: [
            {
                title: '<div id="slider_title" class="slider_item_icon">'+i18n.app.PANEL_CLAIM+'</div>',
                id: 'slider_myprofile',
                slideButton: {
                    selector: 'titlebar',
                    docked: 'left',
                    iconMask: true,
                    iconCls: 'slider slidebutton',
                    ui: 'plain'
                },
                items: [
                    {
                        xtype: 'appcontainer',
                        id: 'appcontainer'
                    }
                ]
            },
            {
                title: '<div id="slider_goodies"  class="slider_item_icon slider_bottle">'+i18n.app.LABEL_BOTTLESPINNER+'</div>' ,
                group: 'Goodies',
                id: 'slider_goodies',
                slideButton: {
                    selector: 'toolbar',
                    docked: 'left',
                    iconMask: true,
                    iconCls: 'slider slidebutton',
                    ui: 'plain'
                },
                items: [
                    {
                        xtype: 'viewbottlespinner',
                        id: 'viewbottlespinner'
                    }
                ]
            },
            {
                title: '<div class="slider_item_icon slider_terms">'+i18n.app.LABEL_TERMS+'</div>' ,
                group: 'Privacy',
                id: 'slider_privacy',
                slideButton: {
                    selector: 'toolbar',
                    docked: 'left',
                    iconMask: true,
                    iconCls: 'slider slidebutton',
                    ui: 'plain'
                },
                items: [
                    {
                        xtype: 'viewterms',
                        id: 'viewterms'
                    }
                ]
            },
            {
                title: '<div class="slider_item_icon slider_terms">'+i18n.app.LABEL_PRIVACY+'</div>' ,
                group: 'Privacy',
                id: 'slider_privacy_informativa',
                slideButton: {
                    selector: 'toolbar',
                    docked: 'left',
                    iconMask: true,
                    iconCls: 'slider slidebutton',
                    ui: 'plain'
                },
                items: [
                    {
                        xtype: 'privacy_informativa',
                        id: 'privacy_informativa'
                    }
                ]
            }
        ]
    }
});

Ext.define('B2B.view.Friend_Paging_Invite_Search', {
           extend: 'Ext.Panel',
           listResultId: 'listresult',
           requires: [
                      'Ext.field.Search'
                      ],
           xtype: 'friendpaginginvitesearch',
           config: {
           docked: 'top'
           },
           initialize: function(){
           this.callParent(arguments);
           
           var oldValueCount = 0,
           
           
           searchFriendButton = {
           xtype: "button",
           text: i18n.app.BTN_SEARCHFRIEND,
           ui: 'action',
           id: 'search_friend_facebook_btn',
           iconCls: 'smiley_friend_add',
           iconMask: true,
           handler: this.onSearchFriendButtonTap,
           scope: this
           },
           
           searchField = {
           xtype: 'searchfield',
           placeHolder: i18n.app.LABEL_SEARCH,
           name: 'friendfiltersearch',
           flex: 1,
           listeners : {
           scope: this,
           clearicontap:function()
           {
                var store = Ext.getStore('Visualized_Friends_Facebook_Local');
                store.clearFilter();
                store.removeAll();
                var minstore = Ext.getStore('Min_Friends_Facebook_Local');
           
                minstore.each(function(record){
                         store.add(record.copy());
                         });
           
              //  store.sync();
                var pnl = Ext.getCmp('friendNavigation');
                pnl.show();
                var fpnl = Ext.getCmp('friendTypeButton');
                fpnl.show();


           },
           
           blur:function(field){
            var store = Ext.getStore('Visualized_Friends_Facebook_Local');
           var value = field.getValue();
           if (value.length == 0)
           {
           store.clearFilter();
           store.removeAll();
           var minstore = Ext.getStore("Min_Friends_Facebook_Local");
           
           store.setData(minstore.getData().all);
           
           // store.sync();
           var pnl = Ext.getCmp('friendNavigation');
           pnl.show();
           var fpnl = Ext.getCmp('friendTypeButton');
           fpnl.show();
           }
           },
           
           focus:function(field){
           var value = field.getValue();
           
           if (value.length == 0){
           var store = Ext.getStore('Visualized_Friends_Facebook_Local');
           store.clearFilter();
           store.removeAll();
           var totstore = Ext.getStore("Friends_Facebook_Local");
           
           store.setData(totstore.getData().all);
           
           // store.sync();
           var pnl = Ext.getCmp('friendNavigation');
           pnl.hide();
           
           var fpnl = Ext.getCmp('friendTypeButton');
           fpnl.hide();
           store.filterBy(function() {
                          return false;
                          });
           }
           },
           
           keyup: function(field,e) {
           var store = Ext.getStore('Visualized_Friends_Facebook_Local');
           var value = field.getValue();
           if (e.event.keyCode == 13) {
           
           console.log("value"+value);
           if (value.length == 0)
           {
           
           store.clearFilter();
           store.removeAll();
           var minstore = Ext.getStore("Min_Friends_Facebook_Local");
           
           store.setData(minstore.getData().all);
           
           // store.sync();
           var pnl = Ext.getCmp('friendNavigation');
           pnl.show();
           var fpnl = Ext.getCmp('friendTypeButton');
           fpnl.show();
           }
           
           }

           if (value.length == 1)
           {
                store.clearFilter();
                var pnl = Ext.getCmp('friendNavigation');
                pnl.hide();
           
                var fpnl = Ext.getCmp('friendTypeButton');
                fpnl.hide();

           }
           
           if(value < oldValueCount){
           store.clearFilter();
           }
           
           oldValueCount = value;
           
           if (!value) {
           store.filterBy(function() {
                          return true;
                          });
           } 
   
           else {
 
           var searches = value.split(' '), regexps  = [], i;
           
       
           for (i = 0; i < searches.length; i++) {
           if (!searches[i]) return;
           regexps.push(new RegExp(searches[i], 'i'));
           
           };
           store.filterBy( function(record) {
                          var matched = [];
                          
                          for (i = 0; i < regexps.length; i++) {
                          var search = regexps[i];
                          
                          if (record.get('displayName').match(search)) matched.push(true);
                          else matched.push(false);
                          };
                          if (regexps.length > 1 && matched.indexOf(false) != -1) {
                          return false;
                          } else {
                          return matched[0];
                          }
                          });
           }
           }
           }
           },
           friendsearchtoolbar = {
           xtype: 'toolbar',
           id: 'friendfacebooksearchtoolbar',
           cls: 'sub_titlebar',
           ui: 'beerneutral',
           docked: 'top',
           items: [
                   searchField/*,
                               searchFriendButton*/
                   ]
           };
           
           this.add([friendsearchtoolbar]);
           },
           onSearchFriendButtonTap: function(){
           Ext.getCmp("search_friend_facebook_btn").disable();
           this.fireEvent("searchFriendCommand", this);
           }
           });

Ext.define('B2B.view.Badge_Custom_List', {
	extend: 'Ext.Panel',
	xtype: 'badgecustomdetailpanel',
	id: 'badgecustomdetailpanel',
	config: {
		title: i18n.app.LABEL_BADGES,
		iconCls: 'badge_list',
		layout: {
			type: 'fit'
		}
	},
	initialize: function(){
		this.callParent(arguments);

		var backButton = {
			text: i18n.app.BTN_BACK,
			ui: 'back',
			id: 'BackBadgeDetailFriendBtn',
			handler: this.onBackButtonTap,
			scope: this
		},
		toolbar = {
			xtype: 'toolbar',
			docked: 'top',
			cls: 'sub_titlebar',
			ui: 'beermainflat',
			title: i18n.app.LABEL_BADGES,
			id: 'BadgesContainerTitlebar',
			defaults: {
				iconMask: true
			},
			items: [
				backButton,
				{ xtype: 'spacer' }
			]
		},
		badgeList = {
			xtype: "badgelistcomponent",
			id: 'badgelistCustom',
			store: Ext.getStore("Badges_Custom_Ajax")
		};
		this.add([toolbar,badgeList]);
	},
	onBackButtonTap: function() {
		Ext.getCmp("BackBadgeDetailFriendBtn").disable();
		Ext.getCmp("friendlistdetail").setMasked(false);
		this.fireEvent("backBadgesFriendCommand", this);
	}
});

Ext.define('B2B.view.DrinkIn_List', {
	extend: 'Ext.dataview.List',
	requires: [
		'Ext.plugin.PullRefresh'
	],
	xtype: 'drinkinlist',
	config: {
		loadingText: i18n.app.HINT_LOADING,
		 plugins: [
			{
				xclass: 'Ext.plugin.PullRefresh',
				pullRefreshText: i18n.app.HINT_PULLDOWN,
				refreshFn: function(plugin) {
					var store = plugin.up().getStore();
					if (store.getStoreId() === 'Drinks_Ajax') {
						Ext.Viewport.fireEvent("refreshDrinks", this);
					}
				}
			}
		],
		loadMask: true,
		emptyText: [
			'<div class="activity-list-empty-text list-empty-text">',
				'<h1>'+utils.__(i18n.app.TEXT_NOACTIVITYFOUND)+'</h1>',
				'<p>'+utils.__(i18n.app.TEXT_WHYADDFRIEND)+'</p>',
			'</div>'
		].join(""),
		itemTpl: new Ext.XTemplate([
			"<div class='{[this.getClass(values)]}'>",
			   "{[this.getTextString(values)]}",
			"</div>"].join(""),
			{
				getClass: function(values){
					return "drinkincheckin-list-item small-list";
				},
				getImageURL: function(values){
					var str = '<img class="avatar" src="';
					str += utils.getFriendAvatar(values.idUser);
					str += '" width="48" height="48">';
					return str;
				},
				getTextString: function(values){
					 var str = [
						"<div class='list-header'>",
							"<small class='time'>",
								utils.getDate(values.insertedOn),
							"</small>",
							"<span class='info'>",
								this.getImageURL(values),
								utils.getUserDisplayName(values.idUser,values.displayName),
							"</span>",
						"</div>",
						"<p class='list-text'>",
						  utils.getDrinkString(values, (Ext.getStore('Profile_Local').first().data.idUser === values.idUser)),
						"</p>"
					].join("");

					return str;
				}
			}
		)
	}
});


Ext.define('B2B.view.View_Terms', {
	extend: 'Ext.Panel',
	xtype: 'viewterms',
	config: {
		title: i18n.app.PANEL_TERMS,
		iconCls: 'settings6',
		styleHtmlContent: true,
		cls: 'slidableToolbar',
		scrollable: true,
		html: [
		//	'<h1>Terms of Service</h1>',
			i18n.app.HTML_TERMS_OF_SERVICE,
		].join("")
	},
	initialize: function(){
        
        this.callParent(arguments);

        var toolbar = {
            xtype: 'toolbar',
            title: i18n.app.LABEL_TERMS,
            ui: 'beermainflat',
            cls: "sub_titlebar, slidableToolbar",
            docked: 'top',
            id: 'DisclaimerTitlebar',
            defaults: {
                iconMask: true
            }
        };

        this.add([toolbar]);
    }
});

Ext.define('B2B.view.Notification_List', {
	extend: 'Ext.dataview.List',
	requires: [
		'Ext.plugin.PullRefresh'
	],
	xtype: 'notificationlist',
	config: {
		loadingText: i18n.app.HINT_LOADING,
		plugins: [
			{
				xclass: 'Ext.plugin.PullRefresh',
				pullRefreshText: 'Pull down for more!',
				refreshFn: function(plugin) {
					var store = plugin.up().getStore();
					Ext.Viewport.fireEvent("refreshStore", this, store.getStoreId());
				}
			}
		],
		emptyText: [
			'<div class="notification-list-empty-text list-empty-text">',
				'<h1>'+utils.__(i18n.app.TEXT_NONOTIFICATIONFOUND)+'</h1>',
				'<p>'+utils.__(i18n.app.TEXT_WHYADDFRIEND)+'</p>',
			'</div>',
		].join(""),
		itemTpl: new Ext.XTemplate([
				"<div class='{[this.getClass(values)]}'>",
					"{[this.getTextString(values)]}",
				"</div>",
			].join(""),
			{
				getClass: function(values){
					var str = "notification-list-item small-list";
					if (values.status == 1||values.status == "1"){
						str += " to_read";
					}
					return str;
				},
				getImageURL: function(values){
					var str = '<img class="avatar" src="';
					if (_.isEmpty(values.image)){
						 str += HH.default_user32;
					 }else{
						str+=values.image;
					 }
					str += '" width="32" height="32">';
					return str;
				},
				getTextString: function(values){

					 var str = [
						"<div class='list-header-small'>",
						 /*   "<small class='time'>",
								utils.getDate(values.insertedOn),
							"</small>",*/
							"<span class='info'>",
								this.getImageURL(values),
								values.displayName,
							"</span>",
						"</div>",
						"<p class='list-text'>",
							utils.getNotificationString(values),
						"</p>",
						"<div class='clear'></div>"
					].join("");
					return str;
				}
			}
		)
	}
});


Ext.define('B2B.view.Place_Beer_List', {
	extend: 'Ext.dataview.List',
	xtype: 'placebeerlist',
	config: {
		cls: 'base_bg',
		loadingText: i18n.app.HINT_LOADING,
		emptyText: [
			'<div class="beer-list-empty-text list-empty-text">',
				'<h1>'+utils.__(i18n.app.TEXT_NOBEERFOUND)+'</h1>',
				'<p>'+utils.__(i18n.app.TEXT_WHYADDBEER)+'</p>',
			'</div>'
		].join(""),
		itemTpl: new Ext.XTemplate("<div class='{[this.getClass(values)]}'>{[this.getImage1URL(values)]}{[this.getString(values)]}</div>",
		{
			getClass: function(values){
				return "small-list beer-list-item-title beerTypeClass"+values.beerstyle;
			},
			getImage1URL: function(values){
					var str = '<img class="avatar_small" src="';
					str += utils.getBeerColorImage(values);
					str += '" width="32" height="32">';
					return str;
			},
			getImage2URL: function(values){
					var str = '<img class="avatar_small" src="';
					if (!_.isEmpty(values.beerstyle)){
						switch(parseInt(values.beerstyle)){
							case 0:
								str += 'resources/img/default/beer_color_1.png';
								break;
							case 1:
								str += 'resources/img/default/beer_color_0.png';
								break;
							case 2:
								str += 'resources/img/default/beer_color_0.png';
								break;
							case 3:
								str += 'resources/img/default/beer_color_1.png';
								break;
							case 4:
								str += 'resources/img/default/beer_color_3.png';
								break;
							case 5:
								str += 'resources/img/default/beer_color_2.png';
								break;
							case 6:
								str += 'resources/img/default/beer_color_0.png';
								break;
							case 7:
								str += 'resources/img/default/beer_color_3.png';
								break;
							case 8:
								str += 'resources/img/default/beer_color_1.png';
								break;
							case 9:
								str += 'resources/img/default/beer_color_1.png';
								break;
							case 10:
								str += 'resources/img/default/beer_color_3.png';
								break;
							case 11:
								str += 'resources/img/default/beer_color_0.png';
								break;
							default:
								str += 'resources/img/default/blank_beer32.png';
								break;
						}
					}
					str += '" width="32" height="32">';
					return str;

			},
			getString: function(values){
				var nationAvatar = (_.isEmpty(values.nationality)) ? "_":(values.nationality).toLowerCase();
				var tpl = [
					"<div class='small-list-right'>",
						"<img src='resources/flags/"+nationAvatar+".png' width='25px' height='auto'>",
					"</div>",
					"<div class='small-list-text'>",
						_.titleize(values.name),
					"</div>",
					"<div class='small-list-subtext'>",
						utils.getBeerStyleFromCode(values.beerstyle),
						(values.beertype) ? " - " + utils.getBeerTypeFromCode(values.beertype): "",
					"</div>",
					"<div class='small-list-subtext'>",
						(values.rate?i18n.app.AVERAGE + values.rate:""),
					"</div>"].join("");
				return tpl;
			}
		})
	}
});


Ext.define('B2B.view.Favorites_Beer', {
	extend: 'Ext.form.Panel',
	xtype: 'favoritesbeer',
	requires: [
		'Ext.Toolbar',
	],
	config: {
		title: i18n.app.PANEL_FAVORITESPANEL,
		iconCls: 'add',
		layout: 'vbox'
	},
	initialize: function(){
		this.callParent(arguments);

		var backFavoritesButton = {
			xtype: "button",
			text: i18n.app.BTN_BACK,
			ui: 'back',
			id: 'favorites_back_btn',
			handler: this.onFavoritesBackButtonTap,
			scope: this
		},
		/*jumptoBeerButton = {
			xtype: "button",
			text: i18n.app.BTN_ADDFAVORITE,
			ui: 'action',
			id: 'favorites_add_btn',
			handler: this.onFavoritesAddButtonTap,
			scope: this,
			docked: 'bottom'
		},*/
		toolbar = {
			xtype: 'toolbar',
			cls: 'sub_titlebar',
			ui: 'beermainflat',
			docked: 'top',
			title: i18n.app.BTN_FAVORITES,
			items: [
				backFavoritesButton
			]
		},
		favoritesList = {
			xtype: "beerlist",
			id: "favoritesbeerlist",
			store: Ext.getStore("FavoriteBeers_Local"),
			flex: 1
		};
		/*
		container = {
			xtype: 'panel',
			flex: 1,
			layout: {
				type: 'vbox'
			},
			items: [
				favoritesList,
				jumptoBeerButton
			]
		};
*/
		this.add([toolbar, favoritesList /* , container */]);

	},
	onFavoritesBackButtonTap: function(){
		Ext.getCmp("favorites_back_btn").disable();
		Ext.getCmp("userprofile").setMasked(false);
		this.fireEvent("backFavoritesCommand", this);
	},
	onFavoritesAddButtonTap: function(){
		this.fireEvent("jumptoBeerCommand", this);
	}
});

Ext.define('B2B.view.Beer_Component_Search', {
	extend: 'Ext.Panel',
	requires: [
		'Ext.field.Search'
	],
	xtype: 'beercomponentsearch',
	config: {
		docked: 'top'
	},
	initialize: function(){
		this.callParent(arguments);
		var oldValueCount = 0,
			store = Ext.getStore('Beers_Ajax'),
			matchedhistory = [],
			searchField = {
				xtype: 'searchfield',
				placeHolder: i18n.app.LABEL_SEARCH,
				name: 'beerfiltersearch',
				flex: 1,
				listeners : {
		            scope: this,
		            clearicontap: function(field){
		            	var beerlist = Ext.getCmp("beercomponent_beerlistselect");
		            	var infobar = Ext.getCmp("beercomponent_searchinfobarselect");
		            	field.setValue("");
		            	beerlist.setStore(null);
			           	store.filterBy( function(record) {return false});
			           	beerlist.setStore(store);
			           	infobar.setHtml(i18n.app.HINT_SEARCH2CHAR);
		            },
		            keyup: function(field, e) {
			           	var value = field.getValue();
			           		value = value.replace(/[^a-zA-Z 0-9]+/g,'');
			           	var beerlist = Ext.getCmp("beerlistselect");
			           	var infobar = Ext.getCmp("beercomponent_searchinfobarselect");

				           	if((!value||value < oldValueCount)){
				           		beerlist.setStore(null);
				            }

				            oldValueCount = value;

				           	if(value.length > 2){
				           		beerlist.setStore(null);
				           		store.clearFilter();

								var searches = value.split(' '), regexps  = [], i;

								for (i = 0; i < searches.length; i++) {
									if (!searches[i]) return;
									regexps.push(new RegExp(searches[i], 'i'));
								};

								store.filterBy( function(record) {
				                    var matched = [];

									for (i = 0; i < regexps.length; i++) {

										var search = regexps[i];

										if (record.get('name').match(search) ) matched.push(true);
										else matched.push(false);
									};

									if (regexps.length > 1 && matched.indexOf(false) != -1) {
										return false;
									} else {
										return matched[0];
									}
								});
								var howmany = store.getCount();

								if(howmany > 0){
									infobar.setHtml(utils.__(i18n.app.HINT_SEARCHRESCHAR, store.getCount()));
				        			beerlist.setStore(store);
				        		}else{
				        			infobar.setHtml(utils.__(i18n.app.HINT_SEARCHNORES));
				        		}
				           	}else{
				           		beerlist.setStore(null);
				           		store.filterBy( function(record) {return false});
				           	}
			           		beerlist.setStore(store);
			           		if(!store.getCount() > 0){
				           		if(value.length < 3 && value.length > 0 ){
				           			infobar.setHtml(utils.__(i18n.app.HINT_SEARCH1CHAR, 3 - value.length));
				           		}else{
				           			if(value.length > 0) {
				           				infobar.setHtml(utils.__(i18n.app.HINT_SEARCHNORES));
				           			}else{
				        				infobar.setHtml(i18n.app.HINT_SEARCH2CHAR);
				           			}
				           		}
			           		}

			           		if (e.browserEvent.keyCode == 13 || e.browserEvent.keyCode == 10) {
				                e.stopEvent();
				                field.element.dom.blur();
				                window.scrollTo(0,0);
				                var activeItem = beerlist.setActiveItem(1);
				                console.log(beerlist.getActiveItem());
				            }
		           }
	            }
			},
			addBeerButton ={
				xtype: 'button',
				text: i18n.app.BTN_ADDBEER,
				ui: 'action',
				id: 'beercomponent_add_beerselect_btn',
				handler: this.onAddBeerButtonTap,
				scope: this
			},
			subtoolbar = {
				xtype: 'toolbar',
				cls: 'sub_titlebar',
				id: 'beercomponent_searchselectbeercomponenttoolbar',
				ui: 'neutral',
				docked: 'top',
				items: [
					searchField,
					addBeerButton
				]
			},
			searchInfoBar = {
				xtype: 'container',
				id: "beercomponent_searchinfobarselect",
				docked: 'top',
				html: "<span class='searchInfoBar'>"+i18n.app.HINT_SEARCH2CHAR+"</span>"
			};

		this.add([subtoolbar, searchInfoBar]);
	},
	onAddBeerButtonTap: function(){
		this.fireEvent("beercomponent_beerAddCommand", this);
	}
});

Ext.define('B2B.view.Component_Search', {
	extend: 'Ext.field.Search',
	xtype: 'componentsearch',
	store: null,
	oldValueCount: 0,
	listResultId: 'listresult',
	infobarId: 'infobar',
	placeHolder: i18n.app.LABEL_SEARCH,
	name: 'filtersearch',
	initialize: function() {
		this.callParent(arguments);

		if (!this.store) {
			this.store = Ext.getStore('Beers_Ajax');
		}

		this.addListener('keyup', this.onKeyUpCommand, this);
		this.addListener('clearicontap', this.onClearIconTapCommand, this);
	},
	onClearIconTapCommand: function(field) {
		var listresult = Ext.getCmp(this.listResultId),
			infobar = Ext.getCmp(this.infobarId);

		// this.store.removeAll(true);
		field.setValue("");
		listresult.setStore(null);
		this.store.filterBy( function(record) {return false});
		listresult.setStore(this.store);

		if (infobar) {
			infobar.setHtml(i18n.app.HINT_SEARCH2CHAR);
		}
	},
	onKeyUpCommand: function(field, e) {
		var value = field.getValue();
			value = value.replace(/[^a-zA-Z 0-9]+/g,''),
			listresult = Ext.getCmp(this.listResultId),
			infobar = Ext.getCmp(this.infobarId);

		if ((!value||value < this.oldValueCount)) {
			listresult.setStore(null);
		}

		this.oldValueCount = value;

		if (value.length > 2 || e.browserEvent.keyCode == 13 || e.browserEvent.keyCode == 10) {
			listresult.setStore(null);
			this.store.clearFilter();

			var searches = value.split(' '), regexps  = [], i;

			for (i = 0; i < searches.length; i++) {
				if (!searches[i]) return;
				regexps.push(new RegExp(searches[i], 'i'));
			};

			this.store.filterBy( function(record) {
				var matched = [];

				for (i = 0; i < regexps.length; i++) {

					var search = regexps[i];

					if (record.get('name').match(search) ) matched.push(true);
					else matched.push(false);
				};

				if (regexps.length > 1 && matched.indexOf(false) != -1) {
					return false;
				} else {
					return matched[0];
				}
			});
			var howmany = this.store.getCount();

			if(howmany > 0){
				if (infobar) {
					infobar.setHtml(utils.__(i18n.app.HINT_SEARCHRESCHAR, this.store.getCount()));
				}

				listresult.setStore(this.store);
			} else {
				if (infobar) {
					infobar.setHtml(utils.__(i18n.app.HINT_SEARCHNORES));
				}
			}
		} else {
			listresult.setStore(null);
			this.store.filterBy( function(record) {return false});
		}
		listresult.setStore(this.store);
		if (!this.store.getCount() > 0 && infobar) {
			if (value.length < 3 && value.length > 0 && !(e.browserEvent.keyCode == 13 || e.browserEvent.keyCode == 10)) {
				infobar.setHtml(utils.__(i18n.app.HINT_SEARCH1CHAR, 3 - value.length));
			} else {
				if (value.length > 0) {
					infobar.setHtml(utils.__(i18n.app.HINT_SEARCHNORES));
				} else {
					infobar.setHtml(i18n.app.HINT_SEARCH2CHAR);
				}
			}
		}

		if (e.browserEvent.keyCode == 13 || e.browserEvent.keyCode == 10) {
			e.stopEvent();
			field.element.dom.blur();
			window.scrollTo(0,0);
			var activeItem = listresult.setActiveItem(1);
		}
	}
});

Ext.define('B2B.view.Friend_Custom', {
	extend: 'Ext.Panel',
	xtype: 'friendcustom',
	config: {
		title: i18n.app.LABEL_FRIENDS,
		iconCls: 'smiley_friends',
        layout: {
        	type: 'fit'
        }
	},
	initialize: function(){
    	this.callParent(arguments);

    	var	storeAjaxFriend = Ext.getStore('Friends_Custom_Ajax'),
    		user = null,
    		backButton = {
			text: i18n.app.BTN_BACK,
			ui: 'back',
			id: 'back_list_friend_about_btn',
			handler: this.onBackButtonTap,
			scope: this
			},
			toolbar = {
				xtype: 'toolbar',
				docked: 'top',
				cls: 'sub_titlebar',
				title: i18n.app.LABEL_FRIENDS,
				id: 'friendOfFriendTitlebar',
				defaults: {
					iconMask: true
				},
				items: [
					backButton,
					{ xtype: 'spacer' }
				]
			},
	        friendList = {
			    xtype: 'friendlistcustom',
			    id: 'friendlistcustom',
			    store: storeAjaxFriend
			};

		this.add([toolbar, friendList]);

    },
    onBackButtonTap: function() {
		Ext.getCmp("back_list_friend_about_btn").disable();
		Ext.getCmp("friendlistdetail").setMasked(false);
	//	Ext.getCmp("userprofile").setMasked(false);
		this.fireEvent("backToProfileCommand", this);
	}
});

Ext.define('B2B.view.Feedback_Container', {
	extend: 'Ext.Panel',
	xtype: 'feedbackcontainerpanel',
	id: 'feedbackcontainerpanel',
	config: {
		title: i18n.app.FORM_FEEDBACK
	},
	initialize: function(){
		this.callParent(arguments);

		if(this.target){

			var store = Ext.getStore("Feedback_Ajax");
			store.getProxy().setExtraParam(target, this.target); 
			
			var feedbacklist = {
				xtype: "feedbacklistcomponent",
	            store: store,
	            draggable: false,
	            height: 100
	        };

			var feedbackform = {
				xtype: 'feedbackform'
			};
			
			this.add([feedbacklist, feedbackform]);

		}else{
			var nocomment = [
				'<div>'+i18n.app.TEXT_NOFEEDBACKFOUND+'</div>'
			].join("");
			this.add([nocomment]);
		}
        
	}
});

Ext.define('B2B.view.Friend_Detail_Container', {
	extend: 'Ext.Container',
	xtype: 'frienddetailcontainer',
	config: {
		title: i18n.app.PANEL_FRIENDDETAIL,
		scrollable: false,
		layout: 'vbox'
	},
	profileJson: null,
	initialize: function(){
		this.callParent(arguments);

		var backFriendDetailButton = {
				xtype: "button",
				text: i18n.app.BTN_BACK,
				ui: 'back',
				id: 'frienddetail_back_btn',
				handler: this.onFriendDetailBackButtonTap,
				scope: this
			},
			toolbar = {
				xtype: 'toolbar',
				cls: 'sub_titlebar',
				ui: 'beermainflat',
				docked: 'top',
				title: i18n.app.PANEL_FRIENDDETAIL,
				items: [
					backFriendDetailButton
				]
			},
			detailFriend = {
				xtype: 'friendlistdetail',
				id: 'friendlistdetail',
				profileJson: this.profileJson.data,
				badgesButtonId: 'friendBadgesButton',
				profileButtonId: 'friendProfileButton',
				drinkListButtonId: 'friendDrinkListButton',
				friendsButtonId: 'friendFriendsButton',
				favoritesButtonId: 'friendFavoritesButton',
				myActivityButtonId: 'friendMyActivityButton',
				settingsButtonId: 'friendSettingsButton',
				thirdButtonsContainerId: 'friendThirdButtonsContainer',
				showThirdButtonsContainer: false,
				flex: 1
			};

		this.add([toolbar, detailFriend]);
	},
	onFriendDetailBackButtonTap: function(){
		this.fireEvent("backFriendDetailCommand", this);
	}
});

Ext.define('B2B.view.Beer_Detail', {
	extend: 'Ext.form.Panel',
	xtype: 'beerdetailpanel',
	requires: [
		'Ext.Container',
		'Ext.MessageBox',
		'Ext.Panel',
		'Ext.Toolbar',
		'Ext.field.Select'
	],	
	config: {
		title: i18n.app.PANEL_BEERDETAIL,
		iconCls: 'add'
	},
	initialize: function(){
		this.callParent(arguments);

		var info = this.jsonData.data,
			backBeerDetailButton = {
			xtype: "button",
			text: i18n.app.BTN_BACK,
			ui: 'back',
			id: 'beerdetail_back_btn',
			handler: this.onBeerDetailBackButtonTap,
			scope: this
		},
		drinkinBeerButton = {
			xtype: "button",
			iconMask: true,
			ui: 'action',
			id: 'drinkInBeerButton',
			handler: this.onDrinkInButtonTap,
			scope: this,
			align: 'right'
		},
		toolbar = {
			xtype: 'toolbar',
			cls: 'sub_titlebar',
			docked: 'top',
			ui: 'beermainflat',
			items: [
				backBeerDetailButton,
				{ xtype: 'spacer' },
				drinkinBeerButton
			]
		},
		addbeerfavorite = {
			xtype: "button",
			text: i18n.app.BTN_FAVORITE,
			//ui: 'beerwhite',
           //cls: (Ext.getStore("FavoriteBeers_Local").indexOf(this.jsonData)<0?'bg_beer_gray':'bg_beer'),
			ui: (Ext.getStore("FavoriteBeers_Local").indexOf(this.jsonData)<0?'small':'action'),
			iconCls: 'favorites',
			iconMask: true,
			id: 'addbeerfavorite',
			handler: this.onFavoritesAddBeerButtonTap,
			flex: 1,
			scope: this,
		},
		reportBeerButton = {
			xtype: "button",
			text: i18n.app.BTN_BEERREPORT,
			ui: 'beerwhite',
			cls: 'bg_beer',
			iconMask: true,
			id: 'reportBeerButton',
			handler: this.onBeerReportButtonTap,
			flex: 1,
			scope: this
		},
		controlcontainer ={
			xtype: 'container',
			id: 'beerDetailContainer',
			layout: {
				type: 'hbox',
				align: 'center'
			},
			items:[
				addbeerfavorite,
				reportBeerButton
			]
		};

		var beerfieldset = {
			xtype: 'fieldset',
			id: "beerdetailfield",
			title: '<h1>'+i18n.app.FORM_BEERDETAIL+'</h1>',
			instructions: i18n.app.HINT_BEERREPORT,
			items: [
				{
					xtype: 'textfield',
					name: 'name',
					readOnly: true,
					cls: 'beer_form_textfield',
					value: _.titleize(info.name),
					label: i18n.app.LABEL_BEERNAME
				},
				{
					xtype: 'textfield',
					name: 'brewery',
					readOnly: true,
					cls: 'beer_form_textfield',
					value: _.titleize(info.brewery),
					label: i18n.app.LABEL_BEERBREWERY
				},
				{
					xtype: 'textfield',
					name: "beerstyle",
					readOnly: true,
					cls: 'beer_form_textfield',
					label: i18n.app.LABEL_BEERSTYLE,
					value: utils.getBeerStyleFromCode(info.beerstyle)
				},
				{
					xtype: 'textfield',
					name: "beertype",
					readOnly: true,
					cls: 'beer_form_textfield',
					label: i18n.app.LABEL_BEERTYPE,
					value: utils.getBeerTypeFromCode(info.beertype)
				},
				{
					xtype: 'textfield',
					name: "grad",
					readOnly: true,
					cls: 'beer_form_textfield',
					label: i18n.app.LABEL_BEERGRAD,
					value: info.grad
				},
				{
					xtype: 'textfield',
					name: "nationality",
					readOnly: true,
					cls: 'beer_form_textfield field_nationality_'+(info.nationality).toLowerCase(),
					label: i18n.app.FORM_NATIONALITY,
					value: utils.getCountryFromCode(info.nationality)
				},
				{
					xtype: 'textfield',
					name: 'avevange',
					readOnly: true,
					cls: 'beer_form_textfield',
					value: (info.rate>0?_.titleize(info.rate):""),
					label: i18n.app.AVERAGE
				},
				{
					xtype: 'textareafield',
					name: 'description',
					id: 'beerdescription',
					cls: 'beer_form_textfield',
					labelAlign: 'top',
					readOnly: true,
					label: i18n.app.LABEL_BEERDESCRIPTION,
					value: info.description
				}
			]
		};

		this.add([toolbar, controlcontainer, beerfieldset]);

		Ext.Viewport.fireEvent("changeAppConnectionStatus", this);
	},
	getStringHTMLFromValues: function(info){
		var value = '';

		if (info.image !== null && info.image !== '') {
		value += '<img id="beer_thumbnail" src="' + info.image +'" /><hr />';
		}

		value += '<p>' + i18n.app.LABEL_BEERNAME + ': <span>' + _.titleize(info.name) + '</span></p>';
		if(info.brewery) value+= '<p>' + i18n.app.LABEL_BEERBREWERY + ': <span>' + _.titleize(info.brewery) + '</span></p>';
		if(info.beerstyle) value += '<p>' + i18n.app.LABEL_BEERSTYLE + ': <span>' + utils.getBeerStyleFromCode(info.beerstyle) + '</span></p>';
		if(info.beertype) value += '<p>' + i18n.app.LABEL_BEERTYPE + ': <span>' + utils.getBeerTypeFromCode(info.beertype) + '</span></p>';
		if(info.grad) value += '<p>' + i18n.app.LABEL_BEERGRAD + ': <span>' + info.grad + '</span></p>';
		if(info.nationality) value += '<p>' + i18n.app.LABEL_BEERNATIONALITY + ': <span>' + utils.getCountryFromCode(info.nationality) + '</span></p>';
		if(info.description) value += '<p>' + i18n.app.LABEL_BEERDESCRIPTION + ': <span>' + info.description + '</span></p>';
		return value;
	},
	onBeerReportButtonTap: function(){
		this.fireEvent("reportBeerCommand", this, this.jsonData.data);
	},
	onFavoritesAddBeerButtonTap: function(){
		//beer:this.jsonData.data
		Ext.getCmp("addbeerfavorite").disable();
		//HH.log(this.jsonData);
		this.fireEvent("addFavoriteBeerCommand", this, this.jsonData);
	},
	onBeerDetailBackButtonTap: function(){
		Ext.getCmp("beerdetail_back_btn").disable();
		this.fireEvent("backBeerDetailCommand", this);
	},
	onDrinkInButtonTap: function() {
		Ext.getCmp("drinkInBeerButton").disable();
		if (utils.isOnline()) {
			if (utils.getAppNeedRestart()) {
				var restartApp = function(button) {
					if (button === 'yes' || button === 2) {
						window.location.reload();
					}
				}
				utils.alert(i18n.app.TEXT_NEEDRESTART, i18n.app.COMMON_ATTENTION, true, restartApp, this);
			} else {
				
				this.fireEvent("drinkInCommand", this, this.jsonData.data);
			}
		}
	}
});



Ext.define('B2B.view.Place', {
	extend: 'Ext.Panel',
	requires: [
		'Ext.Map',
		'Ext.util.DelayedTask',
		'Ext.util.Geolocation'
	],
	xtype: 'place',
	config: {
		title: i18n.app.LABEL_CHECKIN,
		iconCls: 'locate',
		layout: 'card',
		scrollable: false,
		listeners : {
			show : function() {
				Ext.getCmp("back_check_btn").enable();
				if (this.task) {
					this.task.delay(500);
				}
			}
		},
	},
	initialize: function() {
		this.callParent(arguments);
		var me = this;
		me.task = Ext.create('Ext.util.DelayedTask', function() {
			var place = Ext.getCmp("place");
			if (place) {
				place.setMasked({
					xtype: 'loadmask',
					message: i18n.app.HINT_GEOLOAD
				});
				place.setMasked(true);
			}

			me.task.cancel();
			Ext.destroy(me.task);
			me.geolocation.updateLocation();
		});

		var mapplace = {
			xtype: 'map',
			id: 'mapplace',
			flex: 1,
			useCurrentLocation: true,
			height: 140,
			mapOptions: {
				zoom: HH.map.zoomLevel2,
				mapTypeId : google.maps.MapTypeId.ROADMAP,
				navigationControl: false,
				zoomControl: false,
				mapTypeControl: false,
				scaleControl: false,
				streetViewControl: false,
				panControl: false,
				draggable: false,
				scrollwheel: false,
                disableDoubleClickZoom: true
			},
			listeners: {
				maprender: function(me, map){
				map.markers = [];
				},
				centerchange: function(me, map){
				if (map.clearMarkers) map.clearMarkers();
            
                
				map.markers.push(new google.maps.Marker({
						position: new google.maps.LatLng(this._geo.getLatitude(), this._geo.getLongitude()),
						map: map,
						icon: HH.map.currentMarker
				}));
           
                Ext.getStore("Places_Ajax").getData().each(function(record) {
                                                      
                                                      map.markers.push(new google.maps.Marker({
                                                                                              position: new google.maps.LatLng(record.data.lat, record.data.lng),
                                                                                              map: map,
                                                                                              icon: HH.map.marker,
                                                                                        
                                                                                              }));
                                                      });
				}
			}
		},
		refreshAroundButton = {
			text: i18n.app.BTN_REFRESH,
			ui: 'action',
			id: 'refresh_around_btn',
			iconCls: 'refresh',
			handler: this.onRefreshAroundButtonTap,
			scope: this
		},
		backCheckButton = {
			text: i18n.app.BTN_BACK,
			ui: 'back',
			id: 'back_check_btn',
			handler: this.onBackCheckButtonTap,
			scope: this
		},
		toolbar = {
			xtype: 'toolbar',
			docked: 'top',
			cls: 'sub_titlebar',
			title: i18n.app.PANEL_CHECKIN,
			id: 'AroundFormTitlebar',
			ui: 'beermainflat',
			defaults: {
				iconMask: true
			},
			items: [
				backCheckButton,
				{ xtype: 'spacer' },
				refreshAroundButton
			]
		};

		this.geolocation = Ext.create('Ext.util.Geolocation', {
			autoUpdate: false,
			listeners: {
				locationupdate: function(geo) {
					//Ext Call To server with call back
					var infobar = Ext.getCmp('placesearchinfobar'),
						geoStore = Ext.getStore("Places_Ajax"),
						place = Ext.getCmp("place");
					geoStore.getProxy().setExtraParam('lat', geo.getLatitude());
					geoStore.getProxy().setExtraParam('lon', geo.getLongitude());
					HH.log('lat: '+ geo.getLatitude()+' , '+'lon:'+geo.getLongitude());
					utils.getReverseGeo(geo.getLatitude(), geo.getLongitude(), infobar);
					geoStore.removeAll();
					Ext.Viewport.fireEvent("refreshPlaces",this);
					if (place) {
						place.setMasked(false);
					}

					me.geolocation.setAutoUpdate(false);
				},
				locationerror: function(geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
					var place = Ext.getCmp("place");
					console.error("[Geolocation] ERROR: " + message);

					if (place) {
						place.setMasked(false);
					}

					Ext.Viewport.fireEvent("refreshPlaces", this);

					var callback = function(button) {
						if (button === 2) {
							me.geolocation.updateLocation();
							// me.fireEvent("backCheckCommand", me);
						}
					}
					utils.alert(i18n.app.HINT_GEOERROR, i18n.app.COMMON_ATTENTION, true, callback);
				}
			}
		});

		var placelist = {
			xtype: 'placelist',
			id: 'placelist',
			store: Ext.getStore("Places_Ajax"),
			flex: 1,
			scrollable : {
				translationMethod : 'cssTransform'
			}
		},
		squarelogo ={
			xtype: 'container',
			docked: 'bottom',
			id: 'foursquare_logo',
			html: '<img src="resources/img/poweredByFoursquare_footer.png" width="200px">'
		},
		placesearchinfobar = {
			xtype: 'container',
			id: "placesearchinfobar",
			styleHtmlContent: true,
			html: i18n.app.TEXT_NOPLACEFOUND
		},
		verticalbox = {
			xtype: "container",
			id: 'placevbox',
			layout: 'vbox',
			align: 'stretch',
			items: [
				mapplace,
				placesearchinfobar,
				placelist
			]
		};

	this.add([toolbar, verticalbox, squarelogo ]);
	/* Done adding comps, start updating loc */

	},
	onRefreshAroundButtonTap: function() {
		Ext.getStore("Places_Ajax").removeAll();
		Ext.getCmp("place").setMasked({
			xtype: 'loadmask',
			message: i18n.app.HINT_GEOLOAD
		});
		Ext.getCmp("place").setMasked(true);
		this.geolocation.updateLocation();
		this.fireEvent("refreshAroundCommand", this);
	},
	onBackCheckButtonTap: function() {
		Ext.getStore("Places_Ajax").removeAll();
		Ext.getCmp("back_check_btn").disable();
		Ext.getCmp("userprofile").setMasked(false);
		if(Ext.getCmp("drinkInButton"))
			Ext.getCmp("drinkInButton").enable();
		if(Ext.getCmp("drinkInBeerButton"))
			Ext.getCmp("drinkInBeerButton").enable();
		if(Ext.getCmp("beerlist"))
			Ext.getCmp("beerlist").setMasked(false);
		this.geolocation.setAutoUpdate(false);
		Ext.destroy(this.geolocation);
		this.fireEvent("backCheckCommand", this);
	}
});



Ext.define('B2B.view.User_Form', {
	extend: 'Ext.form.Panel',
	xtype: 'userform',
	requires: [
		'Ext.form.FieldSet',
		'Ext.field.Hidden',
		'Ext.field.DatePicker',
		'Ext.field.Select',
		'Ext.field.Toggle',
		'Ext.Img',
		'Ext.ActionSheet'
	],
	config: {
		title: i18n.app.PANEL_PROFILEEDIT,
		iconCls: 'settings6',
		url: '/cippa.php',
		items: [
			{
				xtype: 'fieldset',
				title: '<h1>'+i18n.app.FORM_ACCOUNT+'</h1>',
				instructions: i18n.app.HINT_DISPLAYNAME,
				items: [
					{
						xtype: 'hiddenfield',
						name: 'idUser'
					},
					{
						xtype: 'hiddenfield',
						name: 'idFacebook'
					},
					{
						xtype: 'hiddenfield',
						name: 'pwdHash'
					},
					{
						xtype: 'hiddenfield',
						name: 'role'
					},
					{
						xtype: 'hiddenfield',
						name: 'status'
					},
					{
						xtype: 'textfield',
						name: 'username',
						label: i18n.app.FORM_USERNAME,
						labelWidth: '40%',
						disabled: true
					},
					{
						xtype: 'field',
						/*label: i18n.app.FORM_AVATAR,*/
						labelAlign: 'top',
						component:
						{
							xtype: 'image',
							name: 'image',
							id : 'profileformimage',
							// TODO AVATAR IMAGE
							src: HH.default_user64,
							mode: 'element',
							/*
							listeners: {
								tap: function (img, evt) {
									if(!this.actions){
										this.actions = Ext.Viewport.add(
											{
												xtype: 'actionsheet',
												zIndex: 9999,	// Evita il problema di visualizzazione della actionsheet sotto alle viste
												items: [
													{
														text: i18n.app.BTN_CHOOSEPICTURE,
														scope: this,
														ui: 'confirm',
														handler: function(){
															Ext.getCmp("userform").fireEvent("chooseProfilePictureCommand", this, Ext.getCmp("profileformimage"));
															this.actions.hide();
														}
													},
													{
														text: i18n.app.BTN_REMOVEPICTURE,
														scope: this,
														ui: 'decline',
														handler: function(){
															Ext.getCmp("profileformimage").setSrc(HH.default_user64);
															this.actions.hide();
														}
													},
													{
														text: i18n.app.BTN_CANCEL,
														scope: this,
														handler: function(){
															this.actions.hide();
														}
													}
												]
											}
										);
									}
									this.actions.show();
								}
							}*/
						}
					},
					{
						xtype: 'textfield',
						name: 'email',
						label: i18n.app.FORM_EMAIL,
						labelWidth: '40%',
						disabled: true
					},
					{
						xtype: 'textfield',
						name: 'displayName',
						label: i18n.app.FORM_DISPLAYNAME,
						labelWidth: '40%'
					}
				]
			},
			{
				xtype: 'fieldset',
				title: i18n.app.FORM_PROFILE,
				items: [
					{
						xtype: 'textfield',
						name: 'firstName',
						label: i18n.app.FORM_FIRSTNAME,
						labelWidth: '40%',
						placeHolder: i18n.app.HINT_CHOOSEFIRSTNAME,
					},
					{
						xtype: 'textfield',
						name: 'lastName',
						label: i18n.app.FORM_LASTNAME,
						labelWidth: '40%'
					},
					{
						xtype: 'textfield',
						name: 'description',
						label: i18n.app.FORM_DESCRIPTION,
						labelAlign: 'top'
						//labelWidth: '40%'
					},
					{
						xtype: 'datepickerfield',
						destroyPickerOnHide: true,
						name: 'birthDate',
						label: i18n.app.FORM_BIRTHDATE,
						labelWidth: '40%',
						placeHolder: i18n.app.HINT_CHOOSEBIRTHDATE,
						yearFrom: 1940
					},
					{
						xtype: 'selectfield',
						name: "gender",
						label: i18n.app.FORM_GENDER,
						labelWidth: '40%',
						placeHolder: i18n.app.HINT_CHOOSEGENDER,
						options: [
							{
								text: i18n.app.LABEL_UNDISCLOSED,
								value: 0
							},
							{
								text: i18n.app.LABEL_MALE,
								value: 1
							},
							{
								text: i18n.app.LABEL_FEMALE,
								value: 2
							}
						]
					},
					{
						xtype: 'selectfield',
						name: "nationality",
						cls: "nation",
						label: i18n.app.FORM_NATIONALITY,
						labelWidth: '40%',
						placeHolder: i18n.app.HINT_CHOOSENATIONALITY,
						options: i18n.countries
					}
				]
			},
			{
				xtype: "fieldset",
				items: [
					{
						xtype: 'textfield',
						name: 'activatedOn',
						id: 'activatedOnField',
						label: i18n.app.FORM_ACTIVATEDON,
						labelWidth: '40%',
						disabled: true
					},
					{
						xtype: 'textfield',
						name: 'lastLoginOn',
						id: 'lastLoginOnField',
						label: i18n.app.FORM_LASTLOGINON,
						labelWidth: '40%',
						disabled: true
					}
				]
			}
		]
	},
	initialize: function(){

		this.callParent(arguments);

		var saveProfileButton = {
			text: i18n.app.BTN_SAVE,
			ui: 'action',
			iconCls: 'check_yes',
			id: 'save_profile_btn',
			handler: this.onSaveProfileButtonTap,
			scope: this
		},
		backProfileButton = {
			text: i18n.app.BTN_CANCEL,
			ui: 'back',
			id: 'back_profile_btn',
			handler: this.onBackProfileButtonTap,
			scope: this
		},
		toolbar = {
			xtype: 'toolbar',
			docked: 'top',
			cls: 'sub_titlebar',
			title: i18n.app.PANEL_PROFILEEDIT,
			ui: 'beermainflat',
			id: 'ProfileFormTitlebar',
			defaults: {
				iconMask: true
			},
			items: [
				backProfileButton,
				{ xtype: 'spacer' },
				saveProfileButton
			]
		};

		Ext.getCmp("profileformimage").setSrc(utils.getUserAvatar());
		this.add([toolbar]);
	},
	onSaveProfileButtonTap: function(){
		var values = this.getValues();
		this.fireEvent("saveProfileCommand", this, values);
	},
	onBackProfileButtonTap: function(){
		this.fireEvent("backProfileCommand", this);
	}
});

!function(e,t){"use strict";var n=t.prototype.trim,r=t.prototype.trimRight,i=t.prototype.trimLeft,s=function(e){return e*1||0},o=function(e,t){if(t<1)return"";var n="";while(t>0)t&1&&(n+=e),t>>=1,e+=e;return n},u=[].slice,a=function(e){return e!=null?"["+p.escapeRegExp(e)+"]":"\\s"},f={lt:"<",gt:">",quot:'"',apos:"'",amp:"&"},l={};for(var c in f)l[f[c]]=c;var h=function(){function e(e){return Object.prototype.toString.call(e).slice(8,-1).toLowerCase()}var n=o,r=function(){return r.cache.hasOwnProperty(arguments[0])||(r.cache[arguments[0]]=r.parse(arguments[0])),r.format.call(null,r.cache[arguments[0]],arguments)};return r.format=function(r,i){var s=1,o=r.length,u="",a,f=[],l,c,p,d,v,m;for(l=0;l<o;l++){u=e(r[l]);if(u==="string")f.push(r[l]);else if(u==="array"){p=r[l];if(p[2]){a=i[s];for(c=0;c<p[2].length;c++){if(!a.hasOwnProperty(p[2][c]))throw new Error(h('[_.sprintf] property "%s" does not exist',p[2][c]));a=a[p[2][c]]}}else p[1]?a=i[p[1]]:a=i[s++];if(/[^s]/.test(p[8])&&e(a)!="number")throw new Error(h("[_.sprintf] expecting number but found %s",e(a)));switch(p[8]){case"b":a=a.toString(2);break;case"c":a=t.fromCharCode(a);break;case"d":a=parseInt(a,10);break;case"e":a=p[7]?a.toExponential(p[7]):a.toExponential();break;case"f":a=p[7]?parseFloat(a).toFixed(p[7]):parseFloat(a);break;case"o":a=a.toString(8);break;case"s":a=(a=t(a))&&p[7]?a.substring(0,p[7]):a;break;case"u":a=Math.abs(a);break;case"x":a=a.toString(16);break;case"X":a=a.toString(16).toUpperCase()}a=/[def]/.test(p[8])&&p[3]&&a>=0?"+"+a:a,v=p[4]?p[4]=="0"?"0":p[4].charAt(1):" ",m=p[6]-t(a).length,d=p[6]?n(v,m):"",f.push(p[5]?a+d:d+a)}}return f.join("")},r.cache={},r.parse=function(e){var t=e,n=[],r=[],i=0;while(t){if((n=/^[^\x25]+/.exec(t))!==null)r.push(n[0]);else if((n=/^\x25{2}/.exec(t))!==null)r.push("%");else{if((n=/^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(t))===null)throw new Error("[_.sprintf] huh?");if(n[2]){i|=1;var s=[],o=n[2],u=[];if((u=/^([a-z_][a-z_\d]*)/i.exec(o))===null)throw new Error("[_.sprintf] huh?");s.push(u[1]);while((o=o.substring(u[0].length))!=="")if((u=/^\.([a-z_][a-z_\d]*)/i.exec(o))!==null)s.push(u[1]);else{if((u=/^\[(\d+)\]/.exec(o))===null)throw new Error("[_.sprintf] huh?");s.push(u[1])}n[2]=s}else i|=2;if(i===3)throw new Error("[_.sprintf] mixing positional and named placeholders is not (yet) supported");r.push(n)}t=t.substring(n[0].length)}return r},r}(),p={VERSION:"2.2.0rc",isBlank:function(e){return e==null&&(e=""),/^\s*$/.test(e)},stripTags:function(e){return e==null?"":t(e).replace(/<\/?[^>]+>/g,"")},capitalize:function(e){return e=e==null?"":t(e),e.charAt(0).toUpperCase()+e.slice(1)},chop:function(e,n){return e==null?[]:(e=t(e),n=~~n,n>0?e.match(new RegExp(".{1,"+n+"}","g")):[e])},clean:function(e){return p.strip(e).replace(/\s+/g," ")},count:function(e,n){return e==null||n==null?0:t(e).split(n).length-1},chars:function(e){return e==null?[]:t(e).split("")},swapCase:function(e){return e==null?"":t(e).replace(/\S/g,function(e){return e===e.toUpperCase()?e.toLowerCase():e.toUpperCase()})},escapeHTML:function(e){return e==null?"":t(e).replace(/[&<>"']/g,function(e){return"&"+l[e]+";"})},unescapeHTML:function(e){return e==null?"":t(e).replace(/\&([^;]+);/g,function(e,n){var r;return n in f?f[n]:(r=n.match(/^#x([\da-fA-F]+)$/))?t.fromCharCode(parseInt(r[1],16)):(r=n.match(/^#(\d+)$/))?t.fromCharCode(~~r[1]):e})},escapeRegExp:function(e){return e==null?"":t(e).replace(/([.*+?^=!:${}()|[\]\/\\])/g,"\\$1")},splice:function(e,t,n,r){var i=p.chars(e);return i.splice(~~t,~~n,r),i.join("")},insert:function(e,t,n){return p.splice(e,t,0,n)},include:function(e,n){return n===""?!0:e==null?!1:t(e).indexOf(n)!==-1},join:function(){var e=u.call(arguments),t=e.shift();return t==null&&(t=""),e.join(t)},lines:function(e){return e==null?[]:t(e).split("\n")},reverse:function(e){return p.chars(e).reverse().join("")},startsWith:function(e,n){return n===""?!0:e==null||n==null?!1:(e=t(e),n=t(n),e.length>=n.length&&e.slice(0,n.length)===n)},endsWith:function(e,n){return n===""?!0:e==null||n==null?!1:(e=t(e),n=t(n),e.length>=n.length&&e.slice(e.length-n.length)===n)},succ:function(e){return e==null?"":(e=t(e),e.slice(0,-1)+t.fromCharCode(e.charCodeAt(e.length-1)+1))},titleize:function(e){return e==null?"":t(e).replace(/(?:^|\s)\S/g,function(e){return e.toUpperCase()})},camelize:function(e){return p.trim(e).replace(/[-_\s]+(.)?/g,function(e,t){return t.toUpperCase()})},underscored:function(e){return p.trim(e).replace(/([a-z\d])([A-Z]+)/g,"$1_$2").replace(/[-\s]+/g,"_").toLowerCase()},dasherize:function(e){return p.trim(e).replace(/([A-Z])/g,"-$1").replace(/[-_\s]+/g,"-").toLowerCase()},classify:function(e){return p.titleize(t(e).replace(/_/g," ")).replace(/\s/g,"")},humanize:function(e){return p.capitalize(p.underscored(e).replace(/_id$/,"").replace(/_/g," "))},trim:function(e,r){return e==null?"":!r&&n?n.call(e):(r=a(r),t(e).replace(new RegExp("^"+r+"+|"+r+"+$","g"),""))},ltrim:function(e,n){return e==null?"":!n&&i?i.call(e):(n=a(n),t(e).replace(new RegExp("^"+n+"+"),""))},rtrim:function(e,n){return e==null?"":!n&&r?r.call(e):(n=a(n),t(e).replace(new RegExp(n+"+$"),""))},truncate:function(e,n,r){return e==null?"":(e=t(e),r=r||"...",n=~~n,e.length>n?e.slice(0,n)+r:e)},prune:function(e,n,r){if(e==null)return"";e=t(e),n=~~n,r=r!=null?t(r):"...";if(e.length<=n)return e;var i=function(e){return e.toUpperCase()!==e.toLowerCase()?"A":" "},s=e.slice(0,n+1).replace(/.(?=\W*\w*$)/g,i);return s.slice(s.length-2).match(/\w\w/)?s=s.replace(/\s*\S+$/,""):s=p.rtrim(s.slice(0,s.length-1)),(s+r).length>e.length?e:e.slice(0,s.length)+r},words:function(e,t){return e==null||e==""?"":p.trim(e,t).split(t||/\s+/)},pad:function(e,n,r,i){e=e==null?"":t(e),n=~~n;var s=0;r?r.length>1&&(r=r.charAt(0)):r=" ";switch(i){case"right":return s=n-e.length,e+o(r,s);case"both":return s=n-e.length,o(r,Math.ceil(s/2))+e+o(r,Math.floor(s/2));default:return s=n-e.length,o(r,s)+e}},lpad:function(e,t,n){return p.pad(e,t,n)},rpad:function(e,t,n){return p.pad(e,t,n,"right")},lrpad:function(e,t,n){return p.pad(e,t,n,"both")},sprintf:h,vsprintf:function(e,t){return t.unshift(e),h.apply(null,t)},toNumber:function(e,n){if(e==null||e=="")return 0;e=t(e);var r=s(s(e).toFixed(~~n));return r===0&&!e.match(/^0+$/)?Number.NaN:r},numberFormat:function(e,t,n,r){if(isNaN(e)||e==null)return"";e=e.toFixed(~~t),r=r||",";var i=e.split("."),s=i[0],o=i[1]?(n||".")+i[1]:"";return s.replace(/(\d)(?=(?:\d{3})+$)/g,"$1"+r)+o},strRight:function(e,n){if(e==null)return"";e=t(e),n=n!=null?t(n):n;var r=n?e.indexOf(n):-1;return~r?e.slice(r+n.length,e.length):e},strRightBack:function(e,n){if(e==null)return"";e=t(e),n=n!=null?t(n):n;var r=n?e.lastIndexOf(n):-1;return~r?e.slice(r+n.length,e.length):e},strLeft:function(e,n){if(e==null)return"";e=t(e),n=n!=null?t(n):n;var r=n?e.indexOf(n):-1;return~r?e.slice(0,r):e},strLeftBack:function(e,t){if(e==null)return"";e+="",t=t!=null?""+t:t;var n=e.lastIndexOf(t);return~n?e.slice(0,n):e},toSentence:function(e,t,n){t=t||", ",n=n||" and ";var r=e.slice(),i=r.pop();return r.length?r.join(t)+n+i:i},slugify:function(e){if(e==null)return"";var n="ąàáäâãćęèéëêìíïîłńòóöôõùúüûñçżź",r="aaaaaaceeeeeiiiilnooooouuuunczz",i=new RegExp(a(n),"g");return e=t(e).toLowerCase().replace(i,function(e){var t=n.indexOf(e);return r.charAt(t)||"-"}),p.dasherize(e.replace(/[^\w\s-]/g,""))},surround:function(e,t){return[t,e,t].join("")},quote:function(e){return p.surround(e,'"')},exports:function(){var e={};for(var t in this){if(!this.hasOwnProperty(t)||t.match(/^(?:include|contains|reverse)$/))continue;e[t]=this[t]}return e},repeat:function(e,n,r){if(e==null)return"";n=~~n;if(r==null)return o(t(e),n);for(var i=[];n>0;i[--n]=e);return i.join(r)},levenshtein:function(e,n){if(e==null&&n==null)return 0;if(e==null)return t(n).length;if(n==null)return t(e).length;e=t(e),n=t(n);var r=[],i,s;for(var o=0;o<=n.length;o++)for(var u=0;u<=e.length;u++)o&&u?e.charAt(u-1)===n.charAt(o-1)?s=i:s=Math.min(r[u],r[u-1],i)+1:s=o+u,i=r[u],r[u]=s;return r.pop()}};p.strip=p.trim,p.lstrip=p.ltrim,p.rstrip=p.rtrim,p.center=p.lrpad,p.rjust=p.lpad,p.ljust=p.rpad,p.contains=p.include,p.q=p.quote,typeof exports!="undefined"?(typeof module!="undefined"&&module.exports&&(module.exports=p),exports._s=p):typeof define=="function"&&define.amd?define("underscore.string",[],function(){return p}):(e._=e._||{},e._.string=e._.str=p)}(this,String);

(function(){function r(a,c,d){if(a===c)return 0!==a||1/a==1/c;if(null==a||null==c)return a===c;a._chain&&(a=a._wrapped);c._chain&&(c=c._wrapped);if(a.isEqual&&b.isFunction(a.isEqual))return a.isEqual(c);if(c.isEqual&&b.isFunction(c.isEqual))return c.isEqual(a);var e=l.call(a);if(e!=l.call(c))return!1;switch(e){case "[object String]":return a==""+c;case "[object Number]":return a!=+a?c!=+c:0==a?1/a==1/c:a==+c;case "[object Date]":case "[object Boolean]":return+a==+c;case "[object RegExp]":return a.source==
c.source&&a.global==c.global&&a.multiline==c.multiline&&a.ignoreCase==c.ignoreCase}if("object"!=typeof a||"object"!=typeof c)return!1;for(var f=d.length;f--;)if(d[f]==a)return!0;d.push(a);var f=0,g=!0;if("[object Array]"==e){if(f=a.length,g=f==c.length)for(;f--&&(g=f in a==f in c&&r(a[f],c[f],d)););}else{if("constructor"in a!="constructor"in c||a.constructor!=c.constructor)return!1;for(var h in a)if(b.has(a,h)&&(f++,!(g=b.has(c,h)&&r(a[h],c[h],d))))break;if(g){for(h in c)if(b.has(c,h)&&!f--)break;
g=!f}}d.pop();return g}var s=this,I=s._,o={},k=Array.prototype,p=Object.prototype,i=k.slice,J=k.unshift,l=p.toString,K=p.hasOwnProperty,y=k.forEach,z=k.map,A=k.reduce,B=k.reduceRight,C=k.filter,D=k.every,E=k.some,q=k.indexOf,F=k.lastIndexOf,p=Array.isArray,L=Object.keys,t=Function.prototype.bind,b=function(a){return new m(a)};"undefined"!==typeof exports?("undefined"!==typeof module&&module.exports&&(exports=module.exports=b),exports._=b):s._=b;b.VERSION="1.3.3";var j=b.each=b.forEach=function(a,
c,d){if(a!=null)if(y&&a.forEach===y)a.forEach(c,d);else if(a.length===+a.length)for(var e=0,f=a.length;e<f;e++){if(e in a&&c.call(d,a[e],e,a)===o)break}else for(e in a)if(b.has(a,e)&&c.call(d,a[e],e,a)===o)break};b.map=b.collect=function(a,c,b){var e=[];if(a==null)return e;if(z&&a.map===z)return a.map(c,b);j(a,function(a,g,h){e[e.length]=c.call(b,a,g,h)});if(a.length===+a.length)e.length=a.length;return e};b.reduce=b.foldl=b.inject=function(a,c,d,e){var f=arguments.length>2;a==null&&(a=[]);if(A&&
a.reduce===A){e&&(c=b.bind(c,e));return f?a.reduce(c,d):a.reduce(c)}j(a,function(a,b,i){if(f)d=c.call(e,d,a,b,i);else{d=a;f=true}});if(!f)throw new TypeError("Reduce of empty array with no initial value");return d};b.reduceRight=b.foldr=function(a,c,d,e){var f=arguments.length>2;a==null&&(a=[]);if(B&&a.reduceRight===B){e&&(c=b.bind(c,e));return f?a.reduceRight(c,d):a.reduceRight(c)}var g=b.toArray(a).reverse();e&&!f&&(c=b.bind(c,e));return f?b.reduce(g,c,d,e):b.reduce(g,c)};b.find=b.detect=function(a,
c,b){var e;G(a,function(a,g,h){if(c.call(b,a,g,h)){e=a;return true}});return e};b.filter=b.select=function(a,c,b){var e=[];if(a==null)return e;if(C&&a.filter===C)return a.filter(c,b);j(a,function(a,g,h){c.call(b,a,g,h)&&(e[e.length]=a)});return e};b.reject=function(a,c,b){var e=[];if(a==null)return e;j(a,function(a,g,h){c.call(b,a,g,h)||(e[e.length]=a)});return e};b.every=b.all=function(a,c,b){var e=true;if(a==null)return e;if(D&&a.every===D)return a.every(c,b);j(a,function(a,g,h){if(!(e=e&&c.call(b,
a,g,h)))return o});return!!e};var G=b.some=b.any=function(a,c,d){c||(c=b.identity);var e=false;if(a==null)return e;if(E&&a.some===E)return a.some(c,d);j(a,function(a,b,h){if(e||(e=c.call(d,a,b,h)))return o});return!!e};b.include=b.contains=function(a,c){var b=false;if(a==null)return b;if(q&&a.indexOf===q)return a.indexOf(c)!=-1;return b=G(a,function(a){return a===c})};b.invoke=function(a,c){var d=i.call(arguments,2);return b.map(a,function(a){return(b.isFunction(c)?c||a:a[c]).apply(a,d)})};b.pluck=
function(a,c){return b.map(a,function(a){return a[c]})};b.max=function(a,c,d){if(!c&&b.isArray(a)&&a[0]===+a[0])return Math.max.apply(Math,a);if(!c&&b.isEmpty(a))return-Infinity;var e={computed:-Infinity};j(a,function(a,b,h){b=c?c.call(d,a,b,h):a;b>=e.computed&&(e={value:a,computed:b})});return e.value};b.min=function(a,c,d){if(!c&&b.isArray(a)&&a[0]===+a[0])return Math.min.apply(Math,a);if(!c&&b.isEmpty(a))return Infinity;var e={computed:Infinity};j(a,function(a,b,h){b=c?c.call(d,a,b,h):a;b<e.computed&&
(e={value:a,computed:b})});return e.value};b.shuffle=function(a){var b=[],d;j(a,function(a,f){d=Math.floor(Math.random()*(f+1));b[f]=b[d];b[d]=a});return b};b.sortBy=function(a,c,d){var e=b.isFunction(c)?c:function(a){return a[c]};return b.pluck(b.map(a,function(a,b,c){return{value:a,criteria:e.call(d,a,b,c)}}).sort(function(a,b){var c=a.criteria,d=b.criteria;return c===void 0?1:d===void 0?-1:c<d?-1:c>d?1:0}),"value")};b.groupBy=function(a,c){var d={},e=b.isFunction(c)?c:function(a){return a[c]};
j(a,function(a,b){var c=e(a,b);(d[c]||(d[c]=[])).push(a)});return d};b.sortedIndex=function(a,c,d){d||(d=b.identity);for(var e=0,f=a.length;e<f;){var g=e+f>>1;d(a[g])<d(c)?e=g+1:f=g}return e};b.toArray=function(a){return!a?[]:b.isArray(a)||b.isArguments(a)?i.call(a):a.toArray&&b.isFunction(a.toArray)?a.toArray():b.values(a)};b.size=function(a){return b.isArray(a)?a.length:b.keys(a).length};b.first=b.head=b.take=function(a,b,d){return b!=null&&!d?i.call(a,0,b):a[0]};b.initial=function(a,b,d){return i.call(a,
0,a.length-(b==null||d?1:b))};b.last=function(a,b,d){return b!=null&&!d?i.call(a,Math.max(a.length-b,0)):a[a.length-1]};b.rest=b.tail=function(a,b,d){return i.call(a,b==null||d?1:b)};b.compact=function(a){return b.filter(a,function(a){return!!a})};b.flatten=function(a,c){return b.reduce(a,function(a,e){if(b.isArray(e))return a.concat(c?e:b.flatten(e));a[a.length]=e;return a},[])};b.without=function(a){return b.difference(a,i.call(arguments,1))};b.uniq=b.unique=function(a,c,d){var d=d?b.map(a,d):a,
e=[];a.length<3&&(c=true);b.reduce(d,function(d,g,h){if(c?b.last(d)!==g||!d.length:!b.include(d,g)){d.push(g);e.push(a[h])}return d},[]);return e};b.union=function(){return b.uniq(b.flatten(arguments,true))};b.intersection=b.intersect=function(a){var c=i.call(arguments,1);return b.filter(b.uniq(a),function(a){return b.every(c,function(c){return b.indexOf(c,a)>=0})})};b.difference=function(a){var c=b.flatten(i.call(arguments,1),true);return b.filter(a,function(a){return!b.include(c,a)})};b.zip=function(){for(var a=
i.call(arguments),c=b.max(b.pluck(a,"length")),d=Array(c),e=0;e<c;e++)d[e]=b.pluck(a,""+e);return d};b.indexOf=function(a,c,d){if(a==null)return-1;var e;if(d){d=b.sortedIndex(a,c);return a[d]===c?d:-1}if(q&&a.indexOf===q)return a.indexOf(c);d=0;for(e=a.length;d<e;d++)if(d in a&&a[d]===c)return d;return-1};b.lastIndexOf=function(a,b){if(a==null)return-1;if(F&&a.lastIndexOf===F)return a.lastIndexOf(b);for(var d=a.length;d--;)if(d in a&&a[d]===b)return d;return-1};b.range=function(a,b,d){if(arguments.length<=
1){b=a||0;a=0}for(var d=arguments[2]||1,e=Math.max(Math.ceil((b-a)/d),0),f=0,g=Array(e);f<e;){g[f++]=a;a=a+d}return g};var H=function(){};b.bind=function(a,c){var d,e;if(a.bind===t&&t)return t.apply(a,i.call(arguments,1));if(!b.isFunction(a))throw new TypeError;e=i.call(arguments,2);return d=function(){if(!(this instanceof d))return a.apply(c,e.concat(i.call(arguments)));H.prototype=a.prototype;var b=new H,g=a.apply(b,e.concat(i.call(arguments)));return Object(g)===g?g:b}};b.bindAll=function(a){var c=
i.call(arguments,1);c.length==0&&(c=b.functions(a));j(c,function(c){a[c]=b.bind(a[c],a)});return a};b.memoize=function(a,c){var d={};c||(c=b.identity);return function(){var e=c.apply(this,arguments);return b.has(d,e)?d[e]:d[e]=a.apply(this,arguments)}};b.delay=function(a,b){var d=i.call(arguments,2);return setTimeout(function(){return a.apply(null,d)},b)};b.defer=function(a){return b.delay.apply(b,[a,1].concat(i.call(arguments,1)))};b.throttle=function(a,c){var d,e,f,g,h,i,j=b.debounce(function(){h=
g=false},c);return function(){d=this;e=arguments;f||(f=setTimeout(function(){f=null;h&&a.apply(d,e);j()},c));g?h=true:i=a.apply(d,e);j();g=true;return i}};b.debounce=function(a,b,d){var e;return function(){var f=this,g=arguments;d&&!e&&a.apply(f,g);clearTimeout(e);e=setTimeout(function(){e=null;d||a.apply(f,g)},b)}};b.once=function(a){var b=false,d;return function(){if(b)return d;b=true;return d=a.apply(this,arguments)}};b.wrap=function(a,b){return function(){var d=[a].concat(i.call(arguments,0));
return b.apply(this,d)}};b.compose=function(){var a=arguments;return function(){for(var b=arguments,d=a.length-1;d>=0;d--)b=[a[d].apply(this,b)];return b[0]}};b.after=function(a,b){return a<=0?b():function(){if(--a<1)return b.apply(this,arguments)}};b.keys=L||function(a){if(a!==Object(a))throw new TypeError("Invalid object");var c=[],d;for(d in a)b.has(a,d)&&(c[c.length]=d);return c};b.values=function(a){return b.map(a,b.identity)};b.functions=b.methods=function(a){var c=[],d;for(d in a)b.isFunction(a[d])&&
c.push(d);return c.sort()};b.extend=function(a){j(i.call(arguments,1),function(b){for(var d in b)a[d]=b[d]});return a};b.pick=function(a){var c={};j(b.flatten(i.call(arguments,1)),function(b){b in a&&(c[b]=a[b])});return c};b.defaults=function(a){j(i.call(arguments,1),function(b){for(var d in b)a[d]==null&&(a[d]=b[d])});return a};b.clone=function(a){return!b.isObject(a)?a:b.isArray(a)?a.slice():b.extend({},a)};b.tap=function(a,b){b(a);return a};b.isEqual=function(a,b){return r(a,b,[])};b.isEmpty=
function(a){if(a==null)return true;if(b.isArray(a)||b.isString(a))return a.length===0;for(var c in a)if(b.has(a,c))return false;return true};b.isElement=function(a){return!!(a&&a.nodeType==1)};b.isArray=p||function(a){return l.call(a)=="[object Array]"};b.isObject=function(a){return a===Object(a)};b.isArguments=function(a){return l.call(a)=="[object Arguments]"};b.isArguments(arguments)||(b.isArguments=function(a){return!(!a||!b.has(a,"callee"))});b.isFunction=function(a){return l.call(a)=="[object Function]"};
b.isString=function(a){return l.call(a)=="[object String]"};b.isNumber=function(a){return l.call(a)=="[object Number]"};b.isFinite=function(a){return b.isNumber(a)&&isFinite(a)};b.isNaN=function(a){return a!==a};b.isBoolean=function(a){return a===true||a===false||l.call(a)=="[object Boolean]"};b.isDate=function(a){return l.call(a)=="[object Date]"};b.isRegExp=function(a){return l.call(a)=="[object RegExp]"};b.isNull=function(a){return a===null};b.isUndefined=function(a){return a===void 0};b.has=function(a,
b){return K.call(a,b)};b.noConflict=function(){s._=I;return this};b.identity=function(a){return a};b.times=function(a,b,d){for(var e=0;e<a;e++)b.call(d,e)};b.escape=function(a){return(""+a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;")};b.result=function(a,c){if(a==null)return null;var d=a[c];return b.isFunction(d)?d.call(a):d};b.mixin=function(a){j(b.functions(a),function(c){M(c,b[c]=a[c])})};var N=0;b.uniqueId=
function(a){var b=N++;return a?a+b:b};b.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var u=/.^/,n={"\\":"\\","'":"'",r:"\r",n:"\n",t:"\t",u2028:"\u2028",u2029:"\u2029"},v;for(v in n)n[n[v]]=v;var O=/\\|'|\r|\n|\t|\u2028|\u2029/g,P=/\\(\\|'|r|n|t|u2028|u2029)/g,w=function(a){return a.replace(P,function(a,b){return n[b]})};b.template=function(a,c,d){d=b.defaults(d||{},b.templateSettings);a="__p+='"+a.replace(O,function(a){return"\\"+n[a]}).replace(d.escape||
u,function(a,b){return"'+\n_.escape("+w(b)+")+\n'"}).replace(d.interpolate||u,function(a,b){return"'+\n("+w(b)+")+\n'"}).replace(d.evaluate||u,function(a,b){return"';\n"+w(b)+"\n;__p+='"})+"';\n";d.variable||(a="with(obj||{}){\n"+a+"}\n");var a="var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n"+a+"return __p;\n",e=new Function(d.variable||"obj","_",a);if(c)return e(c,b);c=function(a){return e.call(this,a,b)};c.source="function("+(d.variable||"obj")+"){\n"+a+"}";return c};
b.chain=function(a){return b(a).chain()};var m=function(a){this._wrapped=a};b.prototype=m.prototype;var x=function(a,c){return c?b(a).chain():a},M=function(a,c){m.prototype[a]=function(){var a=i.call(arguments);J.call(a,this._wrapped);return x(c.apply(b,a),this._chain)}};b.mixin(b);j("pop,push,reverse,shift,sort,splice,unshift".split(","),function(a){var b=k[a];m.prototype[a]=function(){var d=this._wrapped;b.apply(d,arguments);var e=d.length;(a=="shift"||a=="splice")&&e===0&&delete d[0];return x(d,
this._chain)}});j(["concat","join","slice"],function(a){var b=k[a];m.prototype[a]=function(){return x(b.apply(this._wrapped,arguments),this._chain)}});m.prototype.chain=function(){this._chain=true;return this};m.prototype.value=function(){return this._wrapped}}).call(this);


/* HH i18n implementation */
var language_string;

if (!Ext.os.is.Android){
   language_string = window.navigator.language || window.navigator.userLanguage || window.navigator.browserLanguage || window.navigator.systemLanguage;

}else{
	var lang;
    if (window.navigator && window.navigator.userAgent && (lang = window.navigator.userAgent
                    .match(/android.*\W(\w\w)-(\w\w)\W/i))) {
        lang = lang[1];
    }
    
    if (!lang && window.navigator) {
        if (window.navigator.language) {
            lang = window.navigator.language;
        } else if (window.navigator.browserLanguage) {
            lang = window.navigator.browserLanguage;
        } else if (window.navigator.systemLanguage) {
            lang = window.navigator.systemLanguage;
        } else if (window.navigator.userLanguage) {
            lang = window.navigator.userLanguage;
        }
        lang = lang.substr(0, 2);
    }
    
    language_string = lang;   
}


if(language_string=="en-us" || language_string=="en-US"|| language_string=="en"){
	   document.write('<script src="i18n/B2B-en-US.js"></'+'script>');
} else if(language_string=="it-it" || language_string=="it-IT" || language_string=="it" || language_string=="IT" || language_string=="IT-IT"){
	   document.write('<script src="i18n/B2B-it.js"></'+'script>');
}else{
	document.write('<script src="i18n/B2B-en-US.js"></'+'script>');
}


var HH = {
	SKIP_LOGIN: false,
	OFFLINE_MODE: false,
	APP_NAME: "Meet Beer",
	APP_LOGO: "resources/img/logo_text.png",
	//IP_PORT_SERVER: "http://antreem.dtdns.net:8080",
    //IP_PORT_SERVER: "http://192.168.1.9:8080",
	IP_PORT_SERVER: "http://37.59.73.225:8080",
	FACEBOOK_CALLBACK: "https://www.facebook.com/meetbeer",
	default_user32: "resources/img/pin_124.png",
	//default/blank_avatar_32.png",
	default_user48: "resources/img/pin_124.png",
	default_user64: "resources/img/pin_124.png",
//	default_user64: "resources/img/default/blank_avatar_64.png",
	default_beerstyle32: "resources/img/default/blank_avatar_32.png",
	default_beergrad32: "resources/img/default/blank_avatar_32.png",
	default_place32: "resources/img/default/blank_place_32.png",
	default_place48: "resources/img/default/blank_place_48.png",
	default_place64: "resources/img/default/blank_place_64.png",
	default_badge32: "resources/img/default/blank_badge_32.png",
	default_badge64: "resources/img/default/blank_badge_64.png",
	DEBUG: false,
	beergroup: 2,
	map: {
		currentMarker: "resources/img/logo_pin_small.png",
		marker: "resources/img/map_marker_default.png",
		zoomLevel: 17,
		zoomLevel2: 16
	},
	log: function(what, isError) {
		if (this.DEBUG) {
			if (isError) {
				console.error(what);
			} else {
				console.log(what);
			}
		}
	}
}

HH.log("* Loaded: HH.js");
HH.log("* Start: Before Init");

_.mixin(_.str.exports());


if (utils.isOnline()) {
	google.maps.Map.prototype.clearMarkers = function() {
		for(var i=0; i < this.markers.length; i++){
			this.markers[i].setMap(null);
		}
		this.markers = new Array();
	};
} else {
	HH.log("Cannot init clearMarkers");
}

HH.log("* END: Before Init");

(function(a){function b(a,b){var c=(a&65535)+(b&65535),d=(a>>16)+(b>>16)+(c>>16);return d<<16|c&65535}function c(a,b){return a<<b|a>>>32-b}function d(a,d,e,f,g,h){return b(c(b(b(d,a),b(f,h)),g),e)}function e(a,b,c,e,f,g,h){return d(b&c|~b&e,a,b,f,g,h)}function f(a,b,c,e,f,g,h){return d(b&e|c&~e,a,b,f,g,h)}function g(a,b,c,e,f,g,h){return d(b^c^e,a,b,f,g,h)}function h(a,b,c,e,f,g,h){return d(c^(b|~e),a,b,f,g,h)}function i(a,c){a[c>>5]|=128<<c%32,a[(c+64>>>9<<4)+14]=c;var d,i,j,k,l,m=1732584193,n=-271733879,o=-1732584194,p=271733878;for(d=0;d<a.length;d+=16)i=m,j=n,k=o,l=p,m=e(m,n,o,p,a[d],7,-680876936),p=e(p,m,n,o,a[d+1],12,-389564586),o=e(o,p,m,n,a[d+2],17,606105819),n=e(n,o,p,m,a[d+3],22,-1044525330),m=e(m,n,o,p,a[d+4],7,-176418897),p=e(p,m,n,o,a[d+5],12,1200080426),o=e(o,p,m,n,a[d+6],17,-1473231341),n=e(n,o,p,m,a[d+7],22,-45705983),m=e(m,n,o,p,a[d+8],7,1770035416),p=e(p,m,n,o,a[d+9],12,-1958414417),o=e(o,p,m,n,a[d+10],17,-42063),n=e(n,o,p,m,a[d+11],22,-1990404162),m=e(m,n,o,p,a[d+12],7,1804603682),p=e(p,m,n,o,a[d+13],12,-40341101),o=e(o,p,m,n,a[d+14],17,-1502002290),n=e(n,o,p,m,a[d+15],22,1236535329),m=f(m,n,o,p,a[d+1],5,-165796510),p=f(p,m,n,o,a[d+6],9,-1069501632),o=f(o,p,m,n,a[d+11],14,643717713),n=f(n,o,p,m,a[d],20,-373897302),m=f(m,n,o,p,a[d+5],5,-701558691),p=f(p,m,n,o,a[d+10],9,38016083),o=f(o,p,m,n,a[d+15],14,-660478335),n=f(n,o,p,m,a[d+4],20,-405537848),m=f(m,n,o,p,a[d+9],5,568446438),p=f(p,m,n,o,a[d+14],9,-1019803690),o=f(o,p,m,n,a[d+3],14,-187363961),n=f(n,o,p,m,a[d+8],20,1163531501),m=f(m,n,o,p,a[d+13],5,-1444681467),p=f(p,m,n,o,a[d+2],9,-51403784),o=f(o,p,m,n,a[d+7],14,1735328473),n=f(n,o,p,m,a[d+12],20,-1926607734),m=g(m,n,o,p,a[d+5],4,-378558),p=g(p,m,n,o,a[d+8],11,-2022574463),o=g(o,p,m,n,a[d+11],16,1839030562),n=g(n,o,p,m,a[d+14],23,-35309556),m=g(m,n,o,p,a[d+1],4,-1530992060),p=g(p,m,n,o,a[d+4],11,1272893353),o=g(o,p,m,n,a[d+7],16,-155497632),n=g(n,o,p,m,a[d+10],23,-1094730640),m=g(m,n,o,p,a[d+13],4,681279174),p=g(p,m,n,o,a[d],11,-358537222),o=g(o,p,m,n,a[d+3],16,-722521979),n=g(n,o,p,m,a[d+6],23,76029189),m=g(m,n,o,p,a[d+9],4,-640364487),p=g(p,m,n,o,a[d+12],11,-421815835),o=g(o,p,m,n,a[d+15],16,530742520),n=g(n,o,p,m,a[d+2],23,-995338651),m=h(m,n,o,p,a[d],6,-198630844),p=h(p,m,n,o,a[d+7],10,1126891415),o=h(o,p,m,n,a[d+14],15,-1416354905),n=h(n,o,p,m,a[d+5],21,-57434055),m=h(m,n,o,p,a[d+12],6,1700485571),p=h(p,m,n,o,a[d+3],10,-1894986606),o=h(o,p,m,n,a[d+10],15,-1051523),n=h(n,o,p,m,a[d+1],21,-2054922799),m=h(m,n,o,p,a[d+8],6,1873313359),p=h(p,m,n,o,a[d+15],10,-30611744),o=h(o,p,m,n,a[d+6],15,-1560198380),n=h(n,o,p,m,a[d+13],21,1309151649),m=h(m,n,o,p,a[d+4],6,-145523070),p=h(p,m,n,o,a[d+11],10,-1120210379),o=h(o,p,m,n,a[d+2],15,718787259),n=h(n,o,p,m,a[d+9],21,-343485551),m=b(m,i),n=b(n,j),o=b(o,k),p=b(p,l);return[m,n,o,p]}function j(a){var b,c="";for(b=0;b<a.length*32;b+=8)c+=String.fromCharCode(a[b>>5]>>>b%32&255);return c}function k(a){var b,c=[];c[(a.length>>2)-1]=undefined;for(b=0;b<c.length;b+=1)c[b]=0;for(b=0;b<a.length*8;b+=8)c[b>>5]|=(a.charCodeAt(b/8)&255)<<b%32;return c}function l(a){return j(i(k(a),a.length*8))}function m(a,b){var c,d=k(a),e=[],f=[],g;e[15]=f[15]=undefined,d.length>16&&(d=i(d,a.length*8));for(c=0;c<16;c+=1)e[c]=d[c]^909522486,f[c]=d[c]^1549556828;return g=i(e.concat(k(b)),512+b.length*8),j(i(f.concat(g),640))}function n(a){var b="0123456789abcdef",c="",d,e;for(e=0;e<a.length;e+=1)d=a.charCodeAt(e),c+=b.charAt(d>>>4&15)+b.charAt(d&15);return c}function o(a){return unescape(encodeURIComponent(a))}function p(a){return l(o(a))}function q(a){return n(p(a))}function r(a,b){return m(o(a),o(b))}function s(a,b){return n(r(a,b))}function t(a,b,c){return b?c?r(b,a):s(b,a):c?p(a):q(a)}"use strict",typeof define=="function"&&define.amd?define(function(){return t}):a.md5=t})(this);

(function(Date,undefined){var moment,VERSION="1.7.0",round=Math.round,i,languages={},currentLanguage='en',hasModule=(typeof module!=='undefined'&&module.exports),langConfigProperties='months|monthsShort|weekdays|weekdaysShort|weekdaysMin|longDateFormat|calendar|relativeTime|ordinal|meridiem'.split('|'),aspNetJsonRegex=/^\/?Date\((\-?\d+)/i,formattingTokens=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|zz?|ZZ?)/g,localFormattingTokens=/(LT|LL?L?L?)/g,formattingRemoveEscapes=/(^\[)|(\\)|\]$/g,parseMultipleFormatChunker=/([0-9a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)/gi,parseTokenOneOrTwoDigits=/\d\d?/,parseTokenOneToThreeDigits=/\d{1,3}/,parseTokenThreeDigits=/\d{3}/,parseTokenFourDigits=/\d{1,4}/,parseTokenWord=/[0-9a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+/i,parseTokenTimezone=/Z|[\+\-]\d\d:?\d\d/i,parseTokenT=/T/i,isoRegex=/^\s*\d{4}-\d\d-\d\d(T(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/,isoFormat='YYYY-MM-DDTHH:mm:ssZ',isoTimes=[['HH:mm:ss.S',/T\d\d:\d\d:\d\d\.\d{1,3}/],['HH:mm:ss',/T\d\d:\d\d:\d\d/],['HH:mm',/T\d\d:\d\d/],['HH',/T\d\d/]],parseTimezoneChunker=/([\+\-]|\d\d)/gi,proxyGettersAndSetters='Month|Date|Hours|Minutes|Seconds|Milliseconds'.split('|'),unitMillisecondFactors={'Milliseconds':1,'Seconds':1e3,'Minutes':6e4,'Hours':36e5,'Days':864e5,'Months':2592e6,'Years':31536e6},formatFunctions={},formatFunctionStrings={M:'(a=t.month()+1)',MMM:'v("monthsShort",t.month())',MMMM:'v("months",t.month())',D:'(a=t.date())',DDD:'(a=new Date(t.year(),t.month(),t.date()),b=new Date(t.year(),0,1),a=~~(((a-b)/864e5)+1.5))',d:'(a=t.day())',dd:'v("weekdaysMin",t.day())',ddd:'v("weekdaysShort",t.day())',dddd:'v("weekdays",t.day())',w:'(a=new Date(t.year(),t.month(),t.date()-t.day()+5),b=new Date(a.getFullYear(),0,4),a=~~((a-b)/864e5/7+1.5))',YY:'p(t.year()%100,2)',YYYY:'p(t.year(),4)',a:'m(t.hours(),t.minutes(),!0)',A:'m(t.hours(),t.minutes(),!1)',H:'t.hours()',h:'t.hours()%12||12',m:'t.minutes()',s:'t.seconds()',S:'~~(t.milliseconds()/100)',SS:'p(~~(t.milliseconds()/10),2)',SSS:'p(t.milliseconds(),3)',Z:'((a=-t.zone())<0?((a=-a),"-"):"+")+p(~~(a/60),2)+":"+p(~~a%60,2)',ZZ:'((a=-t.zone())<0?((a=-a),"-"):"+")+p(~~(10*a/6),4)'},ordinalizeTokens='DDD w M D d'.split(' '),paddedTokens='M D H h m s w'.split(' ');while(ordinalizeTokens.length){i=ordinalizeTokens.pop();formatFunctionStrings[i+'o']=formatFunctionStrings[i]+'+o(a)'}while(paddedTokens.length){i=paddedTokens.pop();formatFunctionStrings[i+i]='p('+formatFunctionStrings[i]+',2)'}formatFunctionStrings.DDDD='p('+formatFunctionStrings.DDD+',3)';function Moment(date,isUTC,lang){this._d=date;this._isUTC=!!isUTC;this._a=date._a||null;date._a=null;this._lang=lang||false}function Duration(duration){var data=this._data={},years=duration.years||duration.y||0,months=duration.months||duration.M||0,weeks=duration.weeks||duration.w||0,days=duration.days||duration.d||0,hours=duration.hours||duration.h||0,minutes=duration.minutes||duration.m||0,seconds=duration.seconds||duration.s||0,milliseconds=duration.milliseconds||duration.ms||0;this._milliseconds=milliseconds+seconds*1e3+minutes*6e4+hours*36e5;this._days=days+weeks*7;this._months=months+years*12;data.milliseconds=milliseconds%1000;seconds+=absRound(milliseconds/1000);data.seconds=seconds%60;minutes+=absRound(seconds/60);data.minutes=minutes%60;hours+=absRound(minutes/60);data.hours=hours%24;days+=absRound(hours/24);days+=weeks*7;data.days=days%30;months+=absRound(days/30);data.months=months%12;years+=absRound(months/12);data.years=years;this._lang=false}function absRound(number){if(number<0){return Math.ceil(number)}else{return Math.floor(number)}}function leftZeroFill(number,targetLength){var output=number+'';while(output.length<targetLength){output='0'+output}return output}function addOrSubtractDurationFromMoment(mom,duration,isAdding){var ms=duration._milliseconds,d=duration._days,M=duration._months,currentDate;if(ms){mom._d.setTime(+mom+ms*isAdding)}if(d){mom.date(mom.date()+d*isAdding)}if(M){currentDate=mom.date();mom.date(1).month(mom.month()+M*isAdding).date(Math.min(currentDate,mom.daysInMonth()))}}function isArray(input){return Object.prototype.toString.call(input)==='[object Array]'}function compareArrays(array1,array2){var len=Math.min(array1.length,array2.length),lengthDiff=Math.abs(array1.length-array2.length),diffs=0,i;for(i=0;i<len;i++){if(~~array1[i]!==~~array2[i]){diffs++}}return diffs+lengthDiff}function dateFromArray(input,asUTC){var i,date;for(i=1;i<7;i++){input[i]=(input[i]==null)?(i===2?1:0):input[i]}input[7]=asUTC;date=new Date(0);if(asUTC){date.setUTCFullYear(input[0],input[1],input[2]);date.setUTCHours(input[3],input[4],input[5],input[6])}else{date.setFullYear(input[0],input[1],input[2]);date.setHours(input[3],input[4],input[5],input[6])}date._a=input;return date}function loadLang(key,values){var i,m,parse=[];if(!values&&hasModule){values=require('./lang/'+key)}for(i=0;i<langConfigProperties.length;i++){values[langConfigProperties[i]]=values[langConfigProperties[i]]||languages.en[langConfigProperties[i]]}for(i=0;i<12;i++){m=moment([2000,i]);parse[i]=new RegExp('^'+(values.months[i]||values.months(m,''))+'|^'+(values.monthsShort[i]||values.monthsShort(m,'')).replace('.',''),'i')}values.monthsParse=values.monthsParse||parse;languages[key]=values;return values}function getLangDefinition(m){var langKey=(typeof m==='string')&&m||m&&m._lang||null;return langKey?(languages[langKey]||loadLang(langKey)):moment}function replaceFormatTokens(token){return formatFunctionStrings[token]?("'+("+formatFunctionStrings[token]+")+'"):token.replace(formattingRemoveEscapes,"").replace(/\\?'/g,"\\'")}function replaceLongDateFormatTokens(input){return getLangDefinition().longDateFormat[input]||input}function makeFormatFunction(format){var output="var a,b;return '"+format.replace(formattingTokens,replaceFormatTokens)+"';",Fn=Function;return new Fn('t','v','o','p','m',output)}function makeOrGetFormatFunction(format){if(!formatFunctions[format]){formatFunctions[format]=makeFormatFunction(format)}return formatFunctions[format]}function formatMoment(m,format){var lang=getLangDefinition(m);function getValueFromArray(key,index){return lang[key].call?lang[key](m,format):lang[key][index]}while(localFormattingTokens.test(format)){format=format.replace(localFormattingTokens,replaceLongDateFormatTokens)}if(!formatFunctions[format]){formatFunctions[format]=makeFormatFunction(format)}return formatFunctions[format](m,getValueFromArray,lang.ordinal,leftZeroFill,lang.meridiem)}function getParseRegexForToken(token){switch(token){case'DDDD':return parseTokenThreeDigits;case'YYYY':return parseTokenFourDigits;case'S':case'SS':case'SSS':case'DDD':return parseTokenOneToThreeDigits;case'MMM':case'MMMM':case'dd':case'ddd':case'dddd':case'a':case'A':return parseTokenWord;case'Z':case'ZZ':return parseTokenTimezone;case'T':return parseTokenT;case'MM':case'DD':case'YY':case'HH':case'hh':case'mm':case'ss':case'M':case'D':case'd':case'H':case'h':case'm':case's':return parseTokenOneOrTwoDigits;default:return new RegExp(token.replace('\\',''))}}function addTimeToArrayFromToken(token,input,datePartArray,config){var a;switch(token){case'M':case'MM':datePartArray[1]=(input==null)?0:~~input-1;break;case'MMM':case'MMMM':for(a=0;a<12;a++){if(getLangDefinition().monthsParse[a].test(input)){datePartArray[1]=a;break}}break;case'D':case'DD':case'DDD':case'DDDD':if(input!=null){datePartArray[2]=~~input}break;case'YY':input=~~input;datePartArray[0]=input+(input>70?1900:2000);break;case'YYYY':datePartArray[0]=~~Math.abs(input);break;case'a':case'A':config.isPm=((input+'').toLowerCase()==='pm');break;case'H':case'HH':case'h':case'hh':datePartArray[3]=~~input;break;case'm':case'mm':datePartArray[4]=~~input;break;case's':case'ss':datePartArray[5]=~~input;break;case'S':case'SS':case'SSS':datePartArray[6]=~~(('0.'+input)*1000);break;case'Z':case'ZZ':config.isUTC=true;a=(input+'').match(parseTimezoneChunker);if(a&&a[1]){config.tzh=~~a[1]}if(a&&a[2]){config.tzm=~~a[2]}if(a&&a[0]==='+'){config.tzh=-config.tzh;config.tzm=-config.tzm}break}}function makeDateFromStringAndFormat(string,format){var datePartArray=[0,0,1,0,0,0,0],config={tzh:0,tzm:0},tokens=format.match(formattingTokens),i,parsedInput;for(i=0;i<tokens.length;i++){parsedInput=(getParseRegexForToken(tokens[i]).exec(string)||[])[0];string=string.replace(getParseRegexForToken(tokens[i]),'');addTimeToArrayFromToken(tokens[i],parsedInput,datePartArray,config)}if(config.isPm&&datePartArray[3]<12){datePartArray[3]+=12}if(config.isPm===false&&datePartArray[3]===12){datePartArray[3]=0}datePartArray[3]+=config.tzh;datePartArray[4]+=config.tzm;return dateFromArray(datePartArray,config.isUTC)}function makeDateFromStringAndArray(string,formats){var output,inputParts=string.match(parseMultipleFormatChunker)||[],formattedInputParts,scoreToBeat=99,i,currentDate,currentScore;for(i=0;i<formats.length;i++){currentDate=makeDateFromStringAndFormat(string,formats[i]);formattedInputParts=formatMoment(new Moment(currentDate),formats[i]).match(parseMultipleFormatChunker)||[];currentScore=compareArrays(inputParts,formattedInputParts);if(currentScore<scoreToBeat){scoreToBeat=currentScore;output=currentDate}}return output}function makeDateFromString(string){var format='YYYY-MM-DDT',i;if(isoRegex.exec(string)){for(i=0;i<4;i++){if(isoTimes[i][1].exec(string)){format+=isoTimes[i][0];break}}return parseTokenTimezone.exec(string)?makeDateFromStringAndFormat(string,format+' Z'):makeDateFromStringAndFormat(string,format)}return new Date(string)}function substituteTimeAgo(string,number,withoutSuffix,isFuture,lang){var rt=lang.relativeTime[string];return(typeof rt==='function')?rt(number||1,!!withoutSuffix,string,isFuture):rt.replace(/%d/i,number||1)}function relativeTime(milliseconds,withoutSuffix,lang){var seconds=round(Math.abs(milliseconds)/1000),minutes=round(seconds/60),hours=round(minutes/60),days=round(hours/24),years=round(days/365),args=seconds<45&&['s',seconds]||minutes===1&&['m']||minutes<45&&['mm',minutes]||hours===1&&['h']||hours<22&&['hh',hours]||days===1&&['d']||days<=25&&['dd',days]||days<=45&&['M']||days<345&&['MM',round(days/30)]||years===1&&['y']||['yy',years];args[2]=withoutSuffix;args[3]=milliseconds>0;args[4]=lang;return substituteTimeAgo.apply({},args)}moment=function(input,format){if(input===null||input===''){return null}var date,matched;if(moment.isMoment(input)){return new Moment(new Date(+input._d),input._isUTC,input._lang)}else if(format){if(isArray(format)){date=makeDateFromStringAndArray(input,format)}else{date=makeDateFromStringAndFormat(input,format)}}else{matched=aspNetJsonRegex.exec(input);date=input===undefined?new Date():matched?new Date(+matched[1]):input instanceof Date?input:isArray(input)?dateFromArray(input):typeof input==='string'?makeDateFromString(input):new Date(input)}return new Moment(date)};moment.utc=function(input,format){if(isArray(input)){return new Moment(dateFromArray(input,true),true)}if(typeof input==='string'&&!parseTokenTimezone.exec(input)){input+=' +0000';if(format){format+=' Z'}}return moment(input,format).utc()};moment.unix=function(input){return moment(input*1000)};moment.duration=function(input,key){var isDuration=moment.isDuration(input),isNumber=(typeof input==='number'),duration=(isDuration?input._data:(isNumber?{}:input)),ret;if(isNumber){if(key){duration[key]=input}else{duration.milliseconds=input}}ret=new Duration(duration);if(isDuration){ret._lang=input._lang}return ret};moment.humanizeDuration=function(num,type,withSuffix){return moment.duration(num,type===true?null:type).humanize(type===true?true:withSuffix)};moment.version=VERSION;moment.defaultFormat=isoFormat;moment.lang=function(key,values){var i;if(!key){return currentLanguage}if(values||!languages[key]){loadLang(key,values)}if(languages[key]){for(i=0;i<langConfigProperties.length;i++){moment[langConfigProperties[i]]=languages[key][langConfigProperties[i]]}moment.monthsParse=languages[key].monthsParse;currentLanguage=key}};moment.langData=getLangDefinition;moment.isMoment=function(obj){return obj instanceof Moment};moment.isDuration=function(obj){return obj instanceof Duration};moment.lang('en',{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D YYYY",LLL:"MMMM D YYYY LT",LLLL:"dddd, MMMM D YYYY LT"},meridiem:function(hours,minutes,isLower){if(hours>11){return isLower?'pm':'PM'}else{return isLower?'am':'AM'}},calendar:{sameDay:'[Today at] LT',nextDay:'[Tomorrow at] LT',nextWeek:'dddd [at] LT',lastDay:'[Yesterday at] LT',lastWeek:'[last] dddd [at] LT',sameElse:'L'},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinal:function(number){var b=number%10;return(~~(number%100/10)===1)?'th':(b===1)?'st':(b===2)?'nd':(b===3)?'rd':'th'}});moment.fn=Moment.prototype={clone:function(){return moment(this)},valueOf:function(){return+this._d},unix:function(){return Math.floor(+this._d/1000)},toString:function(){return this._d.toString()},toDate:function(){return this._d},toArray:function(){var m=this;return[m.year(),m.month(),m.date(),m.hours(),m.minutes(),m.seconds(),m.milliseconds(),!!this._isUTC]},isValid:function(){if(this._a){return!compareArrays(this._a,(this._a[7]?moment.utc(this):this).toArray())}return!isNaN(this._d.getTime())},utc:function(){this._isUTC=true;return this},local:function(){this._isUTC=false;return this},format:function(inputString){return formatMoment(this,inputString?inputString:moment.defaultFormat)},add:function(input,val){var dur=val?moment.duration(+val,input):moment.duration(input);addOrSubtractDurationFromMoment(this,dur,1);return this},subtract:function(input,val){var dur=val?moment.duration(+val,input):moment.duration(input);addOrSubtractDurationFromMoment(this,dur,-1);return this},diff:function(input,val,asFloat){var inputMoment=this._isUTC?moment(input).utc():moment(input).local(),zoneDiff=(this.zone()-inputMoment.zone())*6e4,diff=this._d-inputMoment._d-zoneDiff,year=this.year()-inputMoment.year(),month=this.month()-inputMoment.month(),date=this.date()-inputMoment.date(),output;if(val==='months'){output=year*12+month+date/30}else if(val==='years'){output=year+(month+date/30)/12}else{output=val==='seconds'?diff/1e3: val==='minutes'?diff/6e4: val==='hours'?diff/36e5: val==='days'?diff/864e5: val==='weeks'?diff/6048e5: diff}return asFloat?output:round(output)},from:function(time,withoutSuffix){return moment.duration(this.diff(time)).lang(this._lang).humanize(!withoutSuffix)},fromNow:function(withoutSuffix){return this.from(moment(),withoutSuffix)},calendar:function(){var diff=this.diff(moment().sod(),'days',true),calendar=this.lang().calendar,allElse=calendar.sameElse,format=diff<-6?allElse:diff<-1?calendar.lastWeek:diff<0?calendar.lastDay:diff<1?calendar.sameDay:diff<2?calendar.nextDay:diff<7?calendar.nextWeek:allElse;return this.format(typeof format==='function'?format.apply(this):format)},isLeapYear:function(){var year=this.year();return(year%4===0&&year%100!==0)||year%400===0},isDST:function(){return(this.zone()<moment([this.year()]).zone()||this.zone()<moment([this.year(),5]).zone())},day:function(input){var day=this._isUTC?this._d.getUTCDay():this._d.getDay();return input==null?day:this.add({d:input-day})},startOf:function(val){switch(val.replace(/s$/,'')){case'year':this.month(0);case'month':this.date(1);case'day':this.hours(0);case'hour':this.minutes(0);case'minute':this.seconds(0);case'second':this.milliseconds(0)}return this},endOf:function(val){return this.startOf(val).add(val.replace(/s?$/,'s'),1).subtract('ms',1)},sod:function(){return this.clone().startOf('day')},eod:function(){return this.clone().endOf('day')},zone:function(){return this._isUTC?0:this._d.getTimezoneOffset()},daysInMonth:function(){return moment.utc([this.year(),this.month()+1,0]).date()},lang:function(lang){if(lang===undefined){return getLangDefinition(this)}else{this._lang=lang;return this}}};function makeGetterAndSetter(name,key){moment.fn[name]=function(input){var utc=this._isUTC?'UTC':'';if(input!=null){this._d['set'+utc+key](input);return this}else{return this._d['get'+utc+key]()}}}for(i=0;i<proxyGettersAndSetters.length;i++){makeGetterAndSetter(proxyGettersAndSetters[i].toLowerCase(),proxyGettersAndSetters[i])}makeGetterAndSetter('year','FullYear');moment.duration.fn=Duration.prototype={weeks:function(){return absRound(this.days()/7)},valueOf:function(){return this._milliseconds+this._days*864e5+this._months*2592e6},humanize:function(withSuffix){var difference=+this,rel=this.lang().relativeTime,output=relativeTime(difference,!withSuffix,this.lang());if(withSuffix){output=(difference<=0?rel.past:rel.future).replace(/%s/i,output)}return output},lang:moment.fn.lang};function makeDurationGetter(name){moment.duration.fn[name]=function(){return this._data[name]}}function makeDurationAsGetter(name,factor){moment.duration.fn['as'+name]=function(){return+this/factor}}for(i in unitMillisecondFactors){if(unitMillisecondFactors.hasOwnProperty(i)){makeDurationAsGetter(i,unitMillisecondFactors[i]);makeDurationGetter(i.toLowerCase())}}makeDurationAsGetter('Weeks',6048e5);if(hasModule){module.exports=moment}if(typeof ender==='undefined'){this['moment']=moment}if(typeof define==="function"&&define.amd){define("moment",[],function(){return moment})}}).call(this,Date);(function(){var lang={months:"Gennaio_Febbraio_Marzo_Aprile_Maggio_Giugno_Luglio_Agosto_Settebre_Ottobre_Novembre_Dicembre".split("_"),monthsShort:"Gen_Feb_Mar_Apr_Mag_Giu_Lug_Ago_Set_Ott_Nov_Dic".split("_"),weekdays:"Domenica_Lunedì_Martedì_Mercoledì_Giovedì_Venerdì_Sabato".split("_"),weekdaysShort:"Dom_Lun_Mar_Mer_Gio_Ven_Sab".split("_"),weekdaysMin:"D_L_Ma_Me_G_V_S".split("_"),longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},calendar:{sameDay:'[Oggi alle] LT',nextDay:'[Domani alle] LT',nextWeek:'dddd [alle] LT',lastDay:'[Ieri alle] LT',lastWeek:'[lo scorso] dddd [alle] LT',sameElse:'L'},relativeTime:{future:"in %s",past:"%s fa",s:"secondi",m:"un minuto",mm:"%d minuti",h:"un'ora",hh:"%d ore",d:"un giorno",dd:"%d giorni",M:"un mese",MM:"%d mesi",y:"un anno",yy:"%d anni"},ordinal:function(){return'º'}};if(typeof module!=='undefined'&&module.exports){module.exports=lang}if(typeof window!=='undefined'&&this.moment&&this.moment.lang){this.moment.lang('it',lang)}}());











































        describe("Basic Suite", function() {
            it("Should pass a basic truthiness test.", function() {
                expect(true).toEqual(true);
            });
            
            it("Should fail when it hits an inequal statement.", function() {
                expect(1+1).toEqual(3);
            });
        });
        
        describe("Another Suite", function() {
            it("Should pass this test as well.", function() {
                expect(0).toEqual(0);
            });
        });
        
        jasmine.getEnv().addReporter(new jasmine.ConsoleReporter());
        jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
        jasmine.getEnv().execute();
    






        jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
        jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter());
        jasmine.getEnv().execute();
    


<!--/*--><![CDATA[/*><!--*/
 function CodeHighlightOn(elem, id)
 {
   var target = document.getElementById(id);
   if(null != target) {
     elem.cacheClassElem = elem.className;
     elem.cacheClassTarget = target.className;
     target.className = "code-highlighted";
     elem.className   = "code-highlighted";
   }
 }
 function CodeHighlightOff(elem, id)
 {
   var target = document.getElementById(id);
   if(elem.cacheClassElem)
     elem.className = elem.cacheClassElem;
   if(elem.cacheClassTarget)
     target.className = elem.cacheClassTarget;
 }
/*]]>*///-->

