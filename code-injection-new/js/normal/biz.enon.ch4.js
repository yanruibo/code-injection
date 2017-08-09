






























function onBodyLoad()
{
	document.addEventListener("deviceready",onDeviceReady,false);
}

/* When this function is called, PhoneGap has been initialized and is ready to roll */
function onDeviceReady()
{
	ch4_Register.loadUser();

	PhoneListener.start( onPhoneStateChanged, function (error) { alert(error); } );
	document.addEventListener("backbutton", backKeyDown, true);
}

function onPhoneStateChanged(phoneState) 
{
	if ( phoneState != "IDLE" && phoneState != "NONE" ) {
		if ( ch4_livePlayer ) {
			ch4_livePlayer.muteOn();
		}
	}
	else {
		if ( ch4_livePlayer ) {
			ch4_livePlayer.muteOff();
		}
	}
}

function backKeyDown() {
	var cp = $.mobile.activePage.attr('id');
	if ( cp != 'select' ) {
		history.back( -1 );
	}
	else {
		try {
			window.plugins.ch4Common.gotoBackground();
		}
		catch (error) {
			alert( error );
		}
	}
}


function toclose() {
	navigator.notification.confirm(
	        'Are you sure do you want to exit?',  // message
	        function (btn) {
		        if ( btn == 1 ) {
			        try {
		        		window.plugins.ch4Common.exitApp();
			        }
			        catch (error) {
				        alert(error);
			        }
		        }
	        },
	        'Channel 4',            // title
	        'Yes,No'          // buttonLabels
	    );	
}













RadioChartsTop10.prototype.listContents = null;
RadioChartsTop10.prototype.playingPodcast = 0;
RadioChartsTop10.prototype.audioStreamer = null;
RadioChartsTop10.prototype.myScroll = null;

RadioChartsTop10.prototype.voteFuncts = null;
RadioChartsTop10.prototype.removeFuncts = null;
RadioChartsTop10.prototype.moveFuncts = null;

RadioChartsTop10.prototype.itemsCount = 0;
RadioChartsTop10.prototype.mapItems = null;

RadioChartsTop10.prototype.moveSong = null;
RadioChartsTop10.prototype.moveSongPos = null;

RadioChartsTop10.prototype.viewDidAppear = function () {
	var imgTitle = 'img/title_channel_' + ch4_ChannelID + '.png';
	$( '#channel-title' ).attr( 'src', imgTitle );

	this.audioStreamer = new SHStreamPlayer();
	this.audioStreamer.delegate = this;
	var weakObject = this;
	this.getTopTen( function() {
		weakObject.displayItems();
	});
};

RadioChartsTop10.prototype.viewDidDisappear = function () {
	if ( this.audioStreamer && this.playingPodcast > 0 ) {
		this.audioStreamer.stop();
	}
};

RadioChartsTop10.prototype.addItem = function (contentName, audioFile, onSuccess) {
	var weakObject = this;
	window.plugins.ch4Charts.add(parseInt(ch4_ChannelID), contentName, audioFile,
			function success(r) {
				weakObject.itemsCount = r.itemsCount;
				if ( r.title ) {
					delete weakObject.mapItems[r.title];
				}
				weakObject.mapItems[contentName] = 1;
				onSuccess();
			});
};

RadioChartsTop10.prototype.getTopTen = function ( onSuccess ) {
	var weakObject = this;
	
	window.plugins.ch4Charts.list(parseInt(ch4_ChannelID), 
			function success(r) {
				weakObject.listContents = r;
				weakObject.updateMap();
				if ( r && r.result ) {
					weakObject.itemsCount = r.result.length;
				}
				else {
					weakObject.itemsCount = 0;
				}
				onSuccess();
			});
};

RadioChartsTop10.prototype.updateMap = function() {
	try {
		if ( this.mapItems ) {
			delete this.mapItems;
		}
		
		this.mapItems = {};
		
		var weakObject = this;
		
		$.each( this.listContents.result, function( i, item ) {
			weakObject.mapItems[item.title] = '1';
		});
	}
	catch (error) {
		alert( error );
	}
};

RadioChartsTop10.prototype.existsSong = function(title) {
	if ( this.mapItems ) {
		var x = this.mapItems[title];
		if ( x == '1' ) {
			return true;
		}
		else {
			return false;
		}
	}
	else {
		return false;
	}
};

RadioChartsTop10.prototype.generatePage = function() {
	this.voteFuncts = new Array(10);
	this.removeFuncts = new Array(10);
	this.moveFuncts = new Array(10);
	var callBackObj = this;
	var _list = '';
	$.each( this.listContents.result, function( i, item ) {
		_list = _list + '<div class="tag' + (i%2+1) + '" ';
		_list = _list + 'ch4-song-id="' + (i+1) + '" ';
		_list = _list + 'ch4-audio="' + item.audio + '">';
		_list = _list + '<img ';
		_list = _list + 'id="song-row-' + (i+1) + '" ';
		_list = _list + 'src="img/numeri/' + (i+1) + '.png" alt="" class="number" />';
		_list = _list + '<div class="song-title">';
		_list = _list + item.title;
		_list = _list + '</div>';
		if ( i%2 == 0 ) {
			_list = _list + '<img class="voteBtn" sid=' + (i+1) + ' src="img/bt-vote-white.png" alt="" />';
			_list = _list + '<img class="removeBtn" sid=' + (i+1) + ' src="img/bt-remove-white.png" alt="" />';
		}
		else {
			_list = _list + '<img class="voteBtn" sid=' + (i+1) + ' src="img/bt-vote-green.png" alt="" />';
			_list = _list + '<img class="removeBtn" sid=' + (i+1) + ' src="img/bt-remove-green.png" alt="" />';
		}
		_list = _list + '</div>';
		callBackObj.voteFuncts[i] = function () {
			ch4_Commons.showVoteSong( ch4_ChannelID, item.title, '#charts10_vote');	
		};
		callBackObj.removeFuncts[i] = function () {
			CH4_ShowConfirm("My Top10", "Do you want remove song from Top10?",
					"Yes,No", function (btn) {
						if ( btn == 1 ) {
							window.plugins.ch4Charts.remove(parseInt(ch4_ChannelID), i,
									function success(r) {
										if ( r == 0 ) {
											callBackObj.itemsCount = 0;
											callBackObj.mapItems = null;
											$.mobile.changePage( "charts.html", "none");
										}
										else {
											callBackObj.getTopTen( function() {
												callBackObj.displayItems();
											});
										}
									});
						}
					});
		};
		
		callBackObj.moveFuncts[i] = function () {
			callBackObj.moveSongPos = i;
			callBackObj.moveSong = item.title;
		};
	});
	
	$( '#scrollable' ).html( _list );
};

RadioChartsTop10.prototype.displayItems = function () {
	this.generatePage();
	this.triggerItems( $('div.tag1') );
	this.triggerItems( $('div.tag2') );
	this.triggerVote( $('img.voteBtn') );
	this.triggerRemove( $('img.removeBtn') );
	this.triggerNumbers( $('img.number') );
	
	this.myScroll = new iScroll('text');
};

RadioChartsTop10.prototype.triggerItems = function ( elements ) {
	var weakObject = this;

	elements.each( function() { 
		var songId = parseInt($(this).attr("ch4-song-id"));
		var songUrl = $(this).attr("ch4-audio");
		
		$(this).click( function() {
			if (weakObject.playingPodcast == songId ) {
				weakObject.stopMusic( weakObject.playingPodcast );
			}
			else {
				if (weakObject.playingPodcast > 0 ) {
					weakObject.stopMusic( weakObject.playingPodcast );
				}
				weakObject.playMusic( songId, songUrl );
			}
		});
	});
};

RadioChartsTop10.prototype.triggerVote = function ( elements ) {
	var weakObject = this;

	elements.each( function( idx ) { 
		$(this).click( function( event ) {
			event.stopPropagation();
			weakObject.voteFuncts[idx]();
		});
	});
};

RadioChartsTop10.prototype.triggerRemove = function ( elements ) {
	var weakObject = this;

	elements.each( function( idx ) { 
		$(this).click( function( event ) {
			event.stopPropagation();
			weakObject.removeFuncts[idx]();
		});
	});
};

RadioChartsTop10.prototype.triggerNumbers = function ( elements ) {
	var weakObject = this;

	elements.each( function( idx ) {
		$(this).bind('taphold',function(event, ui) {
			if ( weakObject.itemsCount <= 1 ) return;
			event.stopPropagation();
			weakObject.moveFuncts[idx]();
			$.mobile.changePage( "moveTop10.html", "none");
		});
	});
};

RadioChartsTop10.prototype.moveTop10DidAppear = function() {
	$("#move-song-title").html( 'Choose new position for song "' + this.moveSong + '"' );
	for ( var i = 0; i < 10; i++ ) {
		if ( i == this.moveSongPos || i >= this.itemsCount) {
			$("#radio-choice-" + i).attr('disabled', 'disabled');
		} 
	}
	$('input[name=newPosition]').checkboxradio("refresh");
	
	var weakObject = this;
	$("#move_confirm").click( function() {
	    var radio_val = parseInt($('input[name=newPosition]:checked').val());
		window.plugins.ch4Charts.move(parseInt(ch4_ChannelID), weakObject.moveSongPos, radio_val, 
				function success(r) {
					$('.ui-dialog').dialog('close');
				});
	});
};

RadioChartsTop10.prototype.stopMusic = function (songId) {
	this.playingPodcast = 0;
	var stopImg = 'img/numeri/' + songId + '.png';
	$('#song-row-' + songId).attr('src', stopImg);
	
	this.audioStreamer.stop();
};

RadioChartsTop10.prototype.playMusic = function (songId, songUrl) {
	this.playingPodcast = songId;
	var stopImg = ( songId % 2 == 0 ) ? 'img/bt-stop-green.png' : 'img/bt-stop-white.png';
	$('#song-row-' + songId).attr('src', stopImg);
	
	ch4_livePlayer.stop();
	this.audioStreamer.play( songUrl );
};

RadioChartsTop10.prototype.updateAudioStatus = function (_status) {
	if ( _status == 0 || _status == 99 ) {
		var stopImg = 'img/numeri/' + this.playingPodcast + '.png';
		$('#song-row-' + this.playingPodcast).attr('src', stopImg);
		this.playingPodcast = 0;
	}
};

function RadioChartsTop10() {
}


RadioWins.prototype.firstShow = true;
RadioWins.prototype.listContents = null;
RadioWins.prototype.myScroll = null;

RadioWins.prototype.viewDidAppear = function () {
	if ( this.firstShow ) {
		this.downloadWins();
	}
	else {
		this.displayList();
	}
	this.firstShow = false;
	
	var imgTitle = 'img/title_channel_' + ch4_ChannelID + '.png';
	$( '#channel-title' ).attr( 'src', imgTitle );
}

RadioWins.prototype.downloadWins = function () {
	var url = CMS_BaseURL + '/radio/channels/' + ch4_ChannelID + '/promotions?frmId=' + CMS_Format;

	$.mobile.loadingMessage = 'Loading...';
	$.mobile.showPageLoadingMsg();
	
	var callBackObj = this;	
	
	var jqxhr = $.getJSON( CMS_API, {
			url : url
		},
		function(json) {
			var _list = '';
			
			var promo = getJsonProperty(json, 'promotions.promo', null);
			if ( promo ) {
				if ( promo.constructor === Array ) {
					$.each( json.promotions.promo, function( i, item ) {
						_list = _list + callBackObj.buildItem( item );
					});
				}
				else {
					_list = callBackObj.buildItem( json.promotions.promo );
				}
			}
			callBackObj.listContents = _list;
			callBackObj.displayList();
			$.mobile.hidePageLoadingMsg();
		})
		.error(function() { 
			$.mobile.hidePageLoadingMsg();
			callBackObj.showErrorMessage();
		});
}

RadioWins.prototype.displayList = function() {
	$( '#win #ch4_list' ).html( this.listContents );
			
	CH4_renderList('wins_cell_loading', '../img/bn-win-default.png', null );
	
	this.myScroll = new iScroll('ch4_scrollable');
}

RadioWins.prototype.buildItem = function ( item ) {
	var bannerImage = getJsonProperty(item, 'backgroundimage.imageformat.imgpath', '../img/bn-win-default.png');
	var bannerLink = getJsonProperty(item, 'backgroundimage.imageformat.imglink', '');
	var _list = '<div id="showcell">';
	_list = _list + '<img class="wins_cell_loading" ';
	_list = _list + 'ch4-link="';
	_list = _list + bannerLink;
	_list = _list + '" src="';
	_list = _list + bannerImage;
	_list = _list + '"></div>';
	return _list;
}

RadioWins.prototype.showErrorMessage = function() {
	$( '#win #ch4_list' ).html( '<br /><br /><br /><label><b>A Network error occurred</b></label>' );
};


function RadioWins() {
}


RadioShows.prototype.firstShow = true;
RadioShows.prototype.listContents = null;
RadioShows.prototype.eventsList = null;
RadioShows.prototype.details = null;
RadioShows.prototype.myScroll = null;


RadioShows.prototype.viewDidAppear = function () {
	var imgTitle = 'img/title_channel_' + ch4_ChannelID + '.png';
	$( '#shows #channel-title' ).attr( 'src', imgTitle );

	if ( this.firstShow ) {
		this.downloadShows();
	}
	else {
		this.displayList();
	}
};

RadioShows.prototype.downloadShows = function () {
	var url = CMS_BaseURL + '/radio/channels/' + ch4_ChannelID + '/shows?frmId=' + CMS_Format;

	$.mobile.loadingMessage = 'Loading...';
	$.mobile.showPageLoadingMsg();
	
	var callBackObj = this;	
	
	var jqxhr = $.getJSON( CMS_API, {
			url : url
		},
		function(json) {
			var _list = '';
			$.each( json.shows.show, function( i, item ) {
				var bannerImage = getJsonProperty(item, 'icoimage.imageformat.imgpath', '../img/bn-shows-default.png');
				_list = _list + '<div id="showcell">';
				_list = _list + '<img class="shows_cell_loading" src="';
				_list = _list + bannerImage;
				_list = _list + '" ch4-show-id="' + item.showid + '"></div>';
			});
			callBackObj.listContents = _list;
			callBackObj.downloadEvents();
		})
		.error(function() { 
			$.mobile.hidePageLoadingMsg();
			callBackObj.showErrorMessage();
		});
};

RadioShows.prototype.downloadEvents = function () {
	var url = CMS_BaseURL + '/radio/channels/' + ch4_ChannelID + '/events?frmId=' + CMS_Format;

	var _list = '';
	var callBackObj = this;	
	callBackObj.eventsList = null;
	
	var jqxhr = $.getJSON( CMS_API, {
			url : url
		},
		function(json) {
			var event = getJsonProperty(json, 'events.event', null);
			if ( event ) {
				callBackObj.eventsList = json;
				$( '#ch4_events_button' ).attr( 'src', 'img/sponsors_iphone.png' );
				$( '#ch4_events_button' ).click( function() {
					$.mobile.changePage( "events.html", "none");
				});
			}

			$.mobile.hidePageLoadingMsg();
			callBackObj.displayList();
			callBackObj.firstShow = false;
		})
		.error(function() { 
			$.mobile.hidePageLoadingMsg();
			callBackObj.showErrorMessage();
		});
};

RadioShows.prototype.displayList = function() {
	$( '#shows #ch4_list' ).html( this.listContents );
	
	CH4_renderList('shows_cell_loading', '../img/bn-shows-default.png', function() {
		var showId = $(this).attr("ch4-show-id");
		ch4_Shows.details = new RadioShowDetails( showId );
		
		$.mobile.changePage( "shows-details.html", "none");
	});
	
	if ( this.eventsList ) {
		$( '#ch4_events_button' ).attr( 'src', 'img/sponsors_iphone.png' );
		$( '#ch4_events_button' ).click( function() {
			$.mobile.changePage( "events.html", "none");
		});
	}
	
	this.myScroll = new iScroll('ch4_scrollable');
};

RadioShows.prototype.showErrorMessage = function() {
	$( '#shows #ch4_list' ).html( '<br /><br /><br /><label><b>A Network error occurred</b></label>' );
};


function RadioShows() {
}


var CH4Common = function() { 
 
}
 
CH4Common.prototype.exitApp = function() {
	return PhoneGap.exec( 
			function success(r) {
			},
			function failure(e) {
				alert(e);
			},
			'CH4Common',
			'exitApp',
			[]);
};

CH4Common.prototype.openURL = function(url) {
	return PhoneGap.exec( 
			function success(r) {
			},
			function failure(e) {
				alert(e);
			},
			'CH4Common',
			'openURL',
			[url]);
};

CH4Common.prototype.showKeyboard = function(field) {
	return PhoneGap.exec( 
			function success(r) {
				field.select();
				field.focus();
				
				try {
					setTimeout("window.plugins.ch4Common.pressAnyKey();", 700);
				}
				catch (error) {
					alert(error);
				}
			},
			function failure(e) {
				alert(e);
			},
			'CH4Common',
			'showKeyboard',
			[]);
};
	
CH4Common.prototype.hideKeyboard = function() {
	return PhoneGap.exec( 
			function success(r) {
			},
			function failure(e) {
				alert(e);
			},
			'CH4Common',
			'hideKeyboard',
			[]);
};

CH4Common.prototype.pressAnyKey = function() {
	return PhoneGap.exec( 
			function success(r) {
			},
			function failure(e) {
				alert(e);
			},
			'CH4Common',
			'pressAnyKey',
			[]);
};

CH4Common.prototype.gotoBackground = function() {
	return PhoneGap.exec( 
			function success(r) {
			},
			function failure(e) {
				alert(e);
			},
			'CH4Common',
			'gotoBackground',
			[]);
};


RadioEvents.prototype.firstShow = true;
RadioEvents.prototype.eventsList = null;
RadioEvents.prototype.listContents = null;
RadioEvents.prototype.myScroll = null;

RadioEvents.prototype.viewDidLoad = function () {
	var _list = '';
	var weakObject = this;

	var event = getJsonProperty(this.eventsList, 'events.event', null);
	
	if ( event ) {
		if ( event.constructor === Array ) {
			$.each( this.eventsList.events.event, function( i, item ) {
				_list = _list + weakObject.buildItem( item );
			});
		}
		else {
			_list = weakObject.buildItem( this.eventsList.events.event );
		}
	}
	this.listContents = _list;
}

RadioEvents.prototype.viewDidAppear = function () {
	
	var imgTitle = 'img/title_channel_' + ch4_ChannelID + '.png';
	$( '#events #channel-title' ).attr( 'src', imgTitle );

	$( '#events #ch4_list' ).html( this.listContents );
	CH4_renderList('events_cell_loading', '../img/bn-events-default.png', null );
	
	this.myScroll = new iScroll('ch4_scrollable');
}

RadioEvents.prototype.buildItem = function ( item ) {
	var bannerImage = getJsonProperty(item, 'icoimage.imageformat.imgpath', '../img/bn_sponsors_default.png');
	var bannerLink = getJsonProperty(item, 'eventdescription', '');
	var _list = '<div id="showcell">';
	_list = _list + '<img class="events_cell_loading" ';
	_list = _list + 'ch4-link="';
	_list = _list + bannerLink;
	_list = _list + '" src="';
	_list = _list + bannerImage;
	_list = _list + '"></div>';
	
	return _list;
}

function RadioEvents() {
}


RadioRegister.prototype.firstShow = true;
RadioRegister.prototype.userID = null;
RadioRegister.prototype.userReg = null;

RadioRegister.prototype.viewDidLoad = function () {
};

RadioRegister.prototype.loadUser = function () {
	if ( this.userID ) return;
	
	var wakeObject = this;
	window.plugins.ch4UserReg.read( 
			function success(r) {
				wakeObject.userReg = r;
				wakeObject.userID = r.userid;
			},
			function fail(r) {
				alert('ERROR: '+ r);
			}
	);
};

RadioRegister.prototype.viewDidAppear = function () {
	if ( this.userID ) {
		this.fillData();
		this.lockData();
		return;
	}

	var wakeObject = this;
	var f = function() {
		wakeObject.enableSubmit( wakeObject.formIsFill() );
	};

	this.enableSubmit( false );
	$("#r_fn").keyup( f );
	$("#r_ln").keyup( f );
	$("#r_email").keyup( f );
	$("#r_phone").keyup( f );
	$("#r_terms").change( f );
	$("#r_submit").click( function () {
		if ( wakeObject.formIsFill() ) {
			wakeObject.sendRequest();
		}
	});
};

RadioRegister.prototype.enableSubmit = function (v) {
	if ( v ) {
		$("#div_submit").css({ opacity: 1.0 });
	}
	else {
		$("#div_submit").css({ opacity: 0.5 });
	}
};

RadioRegister.prototype.sendRequest = function () {
	var r_fn = $("#r_fn").val();
	var r_ln = $("#r_ln").val();
	var r_email = $("#r_email").val();
	var r_phone = $("#r_phone").val();
	
	$.mobile.loadingMessage = 'Registering';
	$.mobile.showPageLoadingMsg();
	
	var wakeObject = this;
	
	$.ajax({
	  url: CMS_WrapperURL + "/CH4UserAuthEntry",
	  data: ({api: 'REGISTER', name: r_fn, surname: r_ln, email: r_email, phone: r_phone}),
	  cache: false,
	  type: "POST",
	  success: function(ret) {
		  $.mobile.hidePageLoadingMsg();
		  wakeObject.saveUser( ret );
		  wakeObject.lockData();
	  },
	  complete: function(ret) {
	  },
	  error: function(ret) {
		$.mobile.hidePageLoadingMsg();
		CH4_ShowMessage('Register', 'Cannot complete the registration');
	  }
	});
}

RadioRegister.prototype.saveUser = function (_uid) {
	var r_fn = $("#r_fn").val();
	var r_ln = $("#r_ln").val();
	var r_email = $("#r_email").val();
	var r_phone = $("#r_phone").val();

	window.plugins.ch4UserReg.save( _uid, r_fn, r_ln, r_email, r_phone, 
			function success(r) {
			},
			function fail(r) {
				alert('ERROR: ' + r);
			}
	);
	
	CH4_ShowMessage('Register', 'Registration completed with success!');
	this.userID = _uid;
};

RadioRegister.prototype.lockData = function () {
	$("#r_fn").attr("disabled", "disabled");
	$("#r_ln").attr("disabled", "disabled");
	$("#r_email").attr("disabled", "disabled");
	$("#r_phone").attr("disabled", "disabled");
	$("#r_terms").attr("disabled", "disabled");
	this.enableSubmit( false );
	$("#div_user_registered").css({ display: "block" });
};

RadioRegister.prototype.fillData = function () {
	$("#r_fn").val( this.userReg.firstname );
	$("#r_ln").val( this.userReg.lastname );
	$("#r_email").val( this.userReg.email );
	if ( this.userReg.phone ) {
		$("#r_phone").val( this.userReg.phone );
	}
	$("#r_terms").attr("checked",true).checkboxradio("refresh");
};

RadioRegister.prototype.fieldIsBlank = function (f) {
	var v = $(f).val();
    if (!v || v.length == 0) {
        return true;
    }

    return !/[^\s]+/.test(v);
}

RadioRegister.prototype.termsAccepted = function () {
	return $("#r_terms").is(':checked');
}

RadioRegister.prototype.formIsFill = function () {
	return ( this.userID == null
			&& this.fieldIsBlank("#r_fn") == false
			&& this.fieldIsBlank('#r_ln') == false
			&& this.fieldIsBlank('#r_email') == false
			&& this.termsAccepted() );
}

function RadioRegister() {
}


RadioShowDetails.prototype.showId = null;
RadioShowDetails.prototype.myScroll = null;

RadioShowDetails.prototype.viewDidAppear = function () {
	var imgTitle = 'img/title_channel_' + ch4_ChannelID + '.png';
	$( '#channel-title' ).attr( 'src', imgTitle );
	this.downloadDetails();
};

RadioShowDetails.prototype.downloadDetails = function () {
	var url = CMS_BaseURL + '/radio/channels/' + ch4_ChannelID + '/shows/' + this.showId + '?frmId=' + CMS_Format;

	$.mobile.loadingMessage = 'Loading...';
	$.mobile.showPageLoadingMsg();
	
	var _list = '';
	var callBackObj = this;	
	callBackObj.eventsList = null;
	
	var jqxhr = $.getJSON( CMS_API, {
			url : url
		},
		function(json) {
			var bg = getJsonProperty(json, 'show.backgroundimage.imageformat.imgpath', null);
			if ( bg ) {
				$("#show-wall").css('background-image', 'url(' + bg + ')');
			}
			
			var podcast = getJsonProperty(json, 'show.showpodcast', null);
			
			if ( podcast ) {
				if ( podcast.constructor === Array ) {
					var idx = 0;
					$.each( podcast, function( i, item ) {
						_list = _list + callBackObj.buildItem( item, idx );
						idx++;
					});
				}
				else {
					_list = callBackObj.buildItem( podcast, 0 );
				}
			}
			
			$("#ch4_list").html( _list );

			if ( podcast ) {
				if ( podcast.constructor === Array ) {
					var idx = 0;
					$.each( podcast, function( i, item ) {
						$("#podcast"+idx).click( function() {
							CH4_ShowMessage( item.showpodcastname, item.showpodcastdescription );
						});
						idx++;
					});
				}
				else {
					$("#podcast0").click( function() {
						CH4_ShowMessage( podcast.showpodcastname, podcast.showpodcastdescription );
					});
				}
			}
			
			
			
			
			this.myScroll = new iScroll('brodcast');
			
			$.mobile.hidePageLoadingMsg();
		})
		.error(function() { 
			$.mobile.hidePageLoadingMsg();
		});
};

RadioShowDetails.prototype.buildItem = function ( item, idx ) {
	var podcastName = item.showpodcastname;
	var podcastDescription = item.showpodcastdescription;

	var _c = '<div class="element"><img class="podcast-line" src="img/line.png" alt="" /><img ';
	_c = _c + 'id="podcast' + idx + '" class="podcast-link" src="img/img-brodcast.png" alt="" />';
	_c = _c + '<div class="txt">';
	_c = _c + podcastName + ' - ' + podcastDescription;
	_c = _c + '</div></div>';
	
	return _c;
};	


function RadioShowDetails(showId) {
	this.showId = showId;
}


var CH4Charts = function() { 
 
}
 
CH4Charts.prototype.add = function(channel, title, audio, successCallback) {
	return PhoneGap.exec( successCallback,
			function (e) {
				alert( e );
			},
			'CH4Charts',
			'add',
			[channel, title, audio]);
};

CH4Charts.prototype.remove = function(channel, idx, successCallback) {
	return PhoneGap.exec( successCallback,
			function (e) {
				alert( e );
			},
			'CH4Charts',
			'remove',
			[channel, idx]);
};

CH4Charts.prototype.move = function(channel, source, target, successCallback) {
	return PhoneGap.exec( successCallback,
			function (e) {
				alert( e );
			},
			'CH4Charts',
			'move',
			[channel, source, target]);
};

CH4Charts.prototype.list = function(channel, successCallback) {
	return PhoneGap.exec( successCallback,
			function (e) {
				alert( e );
			},
			'CH4Charts',
			'list',
			[channel]);
};


var ch4_ChannelID;
var ch4_liveChannelID;
var ch4_Root;
var ch4_Wins;
var ch4_Shows;
var ch4_Events;
var ch4_Charts;
var ch4_Share;
var ch4_Live;
var ch4_livePlayer;
var ch4_Commons;
var ch4_Register;

var CMS_BaseURL = 'http://channel4.enon.biz/radiostationdataservice-1.0';
var CMS_WrapperURL = 'http://channel4.enon.biz/CH4Wrapper';
var CMS_API = CMS_WrapperURL + '/Ch4WrapperServlet';
var CMS_STREAM_URL = CMS_WrapperURL + '/CH4RetrieveMusicURL';
var CMS_Format = '1';

var DEBUG = null;

function CH4_OpenLink(url) {
	try {
		window.plugins.childBrowser.openExternal( url );
	}
	catch (error) {
		alert( error );
	}
}

function CH4_ShowMessage(title, message) {
	CH4_ShowMessageAndWait( title, message, function() {});
}

function CH4_ShowMessageAndWait(title, message, f) {
	if ( DEBUG ) {
		alert( message );
		f();
	}
	else {
		navigator.notification.alert(message, f, title, 'Dismiss');
	}
}

function CH4_ShowConfirm(title, message, buttons, f) {
	if ( DEBUG ) {
		if ( top.confirm( message ) ) {
			f( 1 );
		}
		else {
			f( 0 );
		}
	}
	else {
		navigator.notification.confirm(message, f, title, buttons);
	}
}

function isJsonPropertyDefined(p, a) {
	a = a.split(".");//add this
	for (i in a) {
		var key = a[i];
		if (p[key] == null)
    		return false;
  		p = p[key];
 	}
 	return true;
}

function getJsonProperty(p, a, defaultValue) {
	a = a.split(".");//add this
	for (i in a) {
		var key = a[i];
		if (p[key] == null)
    		return defaultValue;
  		p = p[key];
 	}
 	return p;
}

function CH4_renderList(loadingClassname, defaultImage, action) {
	var elements = $('img.' + loadingClassname);
	elements.each( function() { 
		$(this).error( function() {
			$(this).unbind("error").attr("src", defaultImage);
		});
		$(this).load( function() {
			$(this).attr('class', 'showcell');
			$(this).fadeIn(300);
		});
		
		if ( !action ) {
			var link = $(this).attr("ch4-link");
		
			$(this).click( function() {
				CH4_OpenLink( link );
			});
		}
		else {
			$(this).click( action );
		}
	});
}



RadioCommons.prototype.fieldIsBlank = function (f) {
	var v = $(f).val();
    if (!v || v.length == 0) {
        return true;
    }

    return !/[^\s]+/.test(v);
}

RadioCommons.prototype.userNoRegistered = function () {
	CH4_ShowConfirm("Registration", "You must be registered. Do you want to register now?",
		"Yes,No", function (btn) {
			if ( btn == 1 ) {
				$.mobile.changePage( "../register.html", "none");
			}
		});
}

/*
 * VOTE
 */
RadioCommons.prototype.songToVote = null;
RadioCommons.prototype.voteValue = null;
RadioCommons.prototype.channelId = null;
RadioCommons.prototype.votePopup = null;

RadioCommons.prototype.showVoteSong = function (chId, songName, popup) {
	try {
		if ( ch4_Register.userID == null ) {
			this.userNoRegistered();
			return;
		}
		this.voteValue = null;	
		this.songToVote = songName;
		this.channelId = chId;
		this.votePopup = popup;
		this.showVoteSongDidAppear();
	}
	catch (error) {
		alert(error);
	}
};

RadioCommons.prototype.showVoteSongDidAppear = function () {
	var elements = $('img.vote-star');
	var weakObject = this;

	elements.each( function( idx ) {
		$(this).attr('src', 'img/bt-star-red.png');
	});
	
	elements.each( function( idx ) { 
		$(this).touchstart( function( event ) {
			var stars = parseInt($(this).attr("vote"));
			weakObject.voteValue = stars;
			
			elements.each( function( idx ) {
				if ( idx < stars ) {
					$(this).attr('src', 'img/bt-star-green.png');
				}
				else {
					$(this).attr('src', 'img/bt-star-red.png');
				}
			});
		});
	});
	
	$("#vote_confirm").unbind('click');
	$("#vote_confirm").click( function() {
		if ( weakObject.voteValue && weakObject.voteValue > 0 ) {
			weakObject.sendVote();
		}
	});
	$("#vote_cancel").unbind('click');
	$("#vote_cancel").click( function() {
		$( weakObject.votePopup ).css('display', 'none' );
	});
	
	$( this.votePopup ).css( 'display', 'block' );
};

RadioCommons.prototype.sendVote = function () {
	$( this.votePopup ).css('display', 'none' );
	
	$.mobile.loadingMessage = 'Voting...';
	$.mobile.showPageLoadingMsg();
	
	var weakObject = this;
	
	$.ajax({
	  url: CMS_WrapperURL + "/CH4UserAuthEntry",
	  data: ({api: 'VOTE', contentname: weakObject.songToVote, uid: ch4_Register.userID, vote: weakObject.voteValue, channelid: weakObject.channelId}),
	  cache: false,
	  type: "POST",
	  success: function(ret) {
		  $.mobile.hidePageLoadingMsg();
		  CH4_ShowMessage('Your Vote', 'Thank you for voting!');
	  },
	  complete: function(ret) {
	  },
	  error: function(ret) {
		$.mobile.hidePageLoadingMsg();
		CH4_ShowMessage('Your Vote', 'A network error occurred');
	  }
	});
};


/*
 * USER COMMENT
 */

RadioCommons.prototype.showUserComment = function () {
	if ( ch4_Register.userID == null ) {
		this.userNoRegistered();
	}
	else if ( ch4_Live.pageId == null ) {
		CH4_ShowMessage("Channel 4", "No program OnAir now");
	}
	else {
		$.mobile.changePage( "userComment.html", "none");
	}
}

RadioCommons.prototype.showUserCommentDidAppear = function () {
	$("#sendComment").addClass('ui-disabled');

	var wakeObject = this;
	$("#userCommentInput").keyup( function () {
		if ( wakeObject.fieldIsBlank( this ) ) {
			$("#sendComment").addClass('ui-disabled');
		}
		else {
			$("#sendComment").removeClass('ui-disabled');
		}
	});
	
	$("#sendComment").click( function () {
		wakeObject.sendComment();
	});

	
	$("#userCommentInput").select();
	
	try {
		window.plugins.ch4Common.showKeyboard( $("#userCommentInput") );
	}
	catch (error) {
		alert( error );
	}
}

RadioCommons.prototype.showUserCommentDidDisappear = function () {
	try {
		window.plugins.ch4Common.hideKeyboard();
	}
	catch (error) {
		alert( error );
	}
};

RadioCommons.prototype.userCommentFocus = function () {
};

RadioCommons.prototype.sendComment = function () {
	var comment = $("#userCommentInput").val();

	$.mobile.loadingMessage = 'Sending...';
	$.mobile.showPageLoadingMsg();
	
	var wakeObject = this;
	
	$.ajax({
	  url: CMS_WrapperURL + "/CH4UserAuthEntry",
	  data: ({api: 'COMMENT', comment: comment, uid: ch4_Register.userID, progid: ch4_Live.pageId, channelid: ch4_ChannelID}),
	  cache: false,
	  type: "POST",
	  success: function(ret) {
		  $.mobile.hidePageLoadingMsg();
		  CH4_ShowMessageAndWait('Comment', 'Comment sent with success', function() { history.back(-1); });
	  },
	  complete: function(ret) {
	  },
	  error: function(ret) {
		$.mobile.hidePageLoadingMsg()
		CH4_ShowMessage('Comment', 'A network error occurred');
	  }
	});
}

/*
 * SONG REQUEST
 */
RadioCommons.prototype.showSongRequest = function () {
	if ( ch4_Register.userID == null ) {
		this.userNoRegistered();
		return;
	}
	this.showSongRequestDidAppear();
};

RadioCommons.prototype.showSongRequestDidAppear = function () {
	var weakObject = this;
	$("#share_songname").val('');
	$("#share_confirm").unbind('click');
	$("#share_confirm").click( function() {
		if ( weakObject.fieldIsBlank('#share_songname') ) {
			return;
		}
		weakObject.sendSongRequest();
	});
	$("#share_cancel").unbind('click');
	$("#share_cancel").click( function() {
		$("#share_songreq").css('display', 'none' );
	});
	
	$("#share_songreq").css('display', 'block' );
};

RadioCommons.prototype.sendSongRequest = function () {
	try {
		window.plugins.ch4Common.hideKeyboard();
	}
	catch (error) {
		alert( error );
	}

	var songName = $("#share_songname").val();
	
	$("#share_songreq").css('display', 'none' );

	$.mobile.loadingMessage = 'Sending...';
	$.mobile.showPageLoadingMsg();
	
	var wakeObject = this;
	
	$.ajax({
	  url: CMS_WrapperURL + "/CH4UserAuthEntry",
	  data: ({api: 'SONG', contentname: songName, uid: ch4_Register.userID, channelid: ch4_ChannelID}),
	  cache: false,
	  type: "POST",
	  success: function(ret) {
		  $.mobile.hidePageLoadingMsg();
		  CH4_ShowMessage('Your Song Request', 'Thank you for requesting!');
	  },
	  complete: function(ret) {
	  },
	  error: function(ret) {
		$.mobile.hidePageLoadingMsg();
		CH4_ShowMessage('Your Song Request', 'A network error occurred');
	  }
	});
};


function RadioCommons() {
}


RadioRoot.prototype.viewDidLoad = function () {
	var items = $('img.go-live');
	
	items.each( function() { 
		$(this).click( function() {
			ch4_ChannelID = $(this).attr("ch4-channel");
			ch4_Wins = new RadioWins();
			ch4_Shows = new RadioShows();
			ch4_Events = new RadioEvents();
			ch4_Charts = new RadioCharts();
			ch4_Share = new RadioShare();
			ch4_Live = new RadioLive();
			
			$.mobile.changePage( "channel/live.html", { transition: "none"});
		});
	});
	
	ch4_livePlayer = new SHStreamPlayer();
};

RadioRoot.prototype.viewDidAppear = function () {
	
}

function RadioRoot() {
}


RadioCharts.prototype.firstShow = true;
RadioCharts.prototype.listContents = null;
RadioCharts.prototype.playingPodcast = 0;
RadioCharts.prototype.audioStreamer = null;
RadioCharts.prototype.myScroll = null;
RadioCharts.prototype.voteFuncts = null;
RadioCharts.prototype.addFuncts = null;
RadioCharts.prototype.uiFuncts = null;
RadioCharts.prototype.myTopTen = null;

RadioCharts.prototype.viewDidAppear = function () {
	var imgTitle = 'img/title_channel_' + ch4_ChannelID + '.png';
	$( '#channel-title' ).attr( 'src', imgTitle );

	if ( this.firstShow ) {
		this.audioStreamer = new SHStreamPlayer();
		this.audioStreamer.delegate = this;
		this.getMyTopTen();
	}
	else {
		this.displayItems();
	}
	this.firstShow = false;
	
	var weakObject = this;
	$("#my-top-10").click( function() {
		if ( ch4_Register.userID == null ) {
			ch4_Commons.userNoRegistered();
			return;
		}
		
		if ( weakObject.myTopTen.itemsCount < 1 ) {
			CH4_ShowMessage('My Top10', 'No items found in My Top10');
		}
		else {
			$.mobile.changePage( "charts10.html", "none");
		}
	});
};

RadioCharts.prototype.viewDidDisappear = function () {
	if ( this.audioStreamer && this.playingPodcast > 0 ) {
		this.audioStreamer.stop();
	}
};

RadioCharts.prototype.getMyTopTen = function () {
	$.mobile.loadingMessage = 'Loading...';
	$.mobile.showPageLoadingMsg();
	
	try {
		var weakObject = this;
		this.myTopTen = new RadioChartsTop10();
		
		this.myTopTen.getTopTen(
				function() {
					weakObject.downloadCharts();
				});
	}
	catch (error) {
		alert( error );
	}
};


RadioCharts.prototype.downloadCharts = function () {
	var url = CMS_BaseURL + '/radio/channels/' + ch4_ChannelID + '/contents?frmId=' + CMS_Format;

	var callBackObj = this;	
	
	var jqxhr = $.getJSON( CMS_API, {
			url : url
		},
		function(json) {
			var contentId = json.contents.contentchartid;
			callBackObj.downloadChartsById( contentId );
		})
		.error(function() { 
			$.mobile.hidePageLoadingMsg();
			callBackObj.showErrorMessage();
		});
};

RadioCharts.prototype.downloadChartsById = function (contentId) {
	var url = CMS_BaseURL + '/radio/channels/' + ch4_ChannelID + '/contents/' + contentId + '?frmId=' + CMS_Format;

	var _list = '';
	var callBackObj = this;	
	
	this.voteFuncts = new Array(20);
	this.addFuncts = new Array(20);
	this.uiFuncts = new Array(20);	
	
	var jqxhr = $.getJSON( CMS_API, {
			url : url
		},
		function(json) {
			var _list = '';
			$.each( json.contentchart.contentchartitemdetail, function( i, item ) {
				var contentName = getJsonProperty(item, 'contentname', '');
				var audioFile = getJsonProperty(item, 'contentpath', '');

				_list = _list + '<div class="tag' + (i%2+1) + '" ';
				_list = _list + 'ch4-song-id="' + (i+1) + '" ';
				_list = _list + 'ch4-audio="' + audioFile + '">';
				_list = _list + '<img ';
				_list = _list + 'id="song-row-' + (i+1) + '" ';
				_list = _list + 'src="img/numeri/' + (i+1) + '.png" alt="" class="number" />';
				_list = _list + '<div class="song-title">';
				_list = _list + contentName;
				_list = _list + '</div>';
				if ( i%2 == 0 ) {
					_list = _list + '<img class="voteBtn" src="img/bt-vote-white.png" alt="" />';
					_list = _list + '<img class="addBtn" id="abtn_' + i + '" src="img/bt-add-white.png" alt="" />';
				}
				else {
					_list = _list + '<img class="voteBtn" src="img/bt-vote-green.png" alt="" />';
					_list = _list + '<img class="addBtn" id="abtn_' + i + '" src="img/bt-add-green.png" alt="" />';
				}
				_list = _list + '</div>';
				
				callBackObj.uiFuncts[i] = function () {
					var addBtnID = "#abtn_" + i;
					
					if ( callBackObj.myTopTen.existsSong( contentName ) ) {
						$(addBtnID).css({ opacity: 0.5 });
					}
					else {
						$(addBtnID).css({ opacity: 1.0 });
					}
				};
				
				callBackObj.voteFuncts[i] = function () {
					ch4_Commons.showVoteSong( ch4_ChannelID, contentName, '#charts_vote');	
				};
				
				callBackObj.addFuncts[i] = function () {
					if ( ch4_Register.userID == null ) {
						ch4_Commons.userNoRegistered();
						return;
					}
					if ( !callBackObj.myTopTen.existsSong( contentName ) ) {
						callBackObj.myTopTen.addItem(contentName, audioFile,
								function () {
									callBackObj.updateInterface();
									CH4_ShowMessage('My Top10', '"' + contentName + '" added.');
								});
					}
				};
			});
			
			callBackObj.listContents = _list;
			callBackObj.displayItems();
			
			$.mobile.hidePageLoadingMsg();
		})
		.error(function() { 
			$.mobile.hidePageLoadingMsg();
			callBackObj.showErrorMessage();
		});
};

RadioCharts.prototype.displayItems = function () {
	$( '#scrollable' ).html( this.listContents );
	
	this.triggerItems( $('div.tag1') );
	this.triggerItems( $('div.tag2') );
	this.triggerVote( $('img.voteBtn') );
	this.triggerAdds( $('img.addBtn') );
	this.updateInterface();	
	
	this.myScroll = new iScroll('text');
};

RadioCharts.prototype.updateInterface = function () {
	for ( var i = 0; i < 20; i++ ) {
		var f = this.uiFuncts[i];
		if ( f ) {
			f();
		}
	}
};

RadioCharts.prototype.triggerItems = function ( elements ) {
	var weakObject = this;

	elements.each( function() { 
		var songId = parseInt($(this).attr("ch4-song-id"));
		var songUrl = $(this).attr("ch4-audio");
		
		$(this).click( function() {
			if (weakObject.playingPodcast == songId ) {
				weakObject.stopMusic( weakObject.playingPodcast );
			}
			else {
				if (weakObject.playingPodcast > 0 ) {
					weakObject.stopMusic( weakObject.playingPodcast );
				}
				weakObject.playMusic( songId, songUrl );
			}
		});
	});
};

RadioCharts.prototype.triggerVote = function ( elements ) {
	var weakObject = this;

	elements.each( function( idx ) { 
		$(this).click( function( event ) {
			event.stopPropagation();
			weakObject.voteFuncts[idx]();
		});
	});
};

RadioCharts.prototype.triggerAdds = function ( elements ) {
	var weakObject = this;

	elements.each( function( idx ) { 
		$(this).click( function( event ) {
			event.stopPropagation();
			weakObject.addFuncts[idx]();
		});
	});
};


RadioCharts.prototype.stopMusic = function (songId) {
	this.playingPodcast = 0;
	var stopImg = 'img/numeri/' + songId + '.png';
	$('#song-row-' + songId).attr('src', stopImg);
	
	this.audioStreamer.stop();
};

RadioCharts.prototype.playMusic = function (songId, songUrl) {
	this.playingPodcast = songId;
	var stopImg = ( songId % 2 == 0 ) ? 'img/bt-stop-green.png' : 'img/bt-stop-white.png';
	$('#song-row-' + songId).attr('src', stopImg);
	
	ch4_livePlayer.stop();
	this.audioStreamer.play( songUrl );
};

RadioCharts.prototype.updateAudioStatus = function (_status) {
	if ( _status == 0 || _status == 99 ) {
		var stopImg = 'img/numeri/' + this.playingPodcast + '.png';
		$('#song-row-' + this.playingPodcast).attr('src', stopImg);
		this.playingPodcast = 0;
	}
};

RadioCharts.prototype.showErrorMessage = function() {
	$( '#scrollable' ).html( '<br /><br /><br /><div align="center"><label><b>A Network error occurred</b></label></div>' );
};


function RadioCharts() {
}


var myScroll;

function CH4_Init() {
	ch4_Root = new RadioRoot();
	ch4_Commons = new RadioCommons();
	ch4_Register = new RadioRegister();

	$( '#about' ).live( 'pageshow',function(event) {
		if ( myScroll ) {
			myScroll.destroy();
			myScroll = null;
		}
		myScroll = new iScroll('about_scroll');
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	});

	$( '#advertise' ).live( 'pageshow',function(event) {
		if ( myScroll ) {
			myScroll.destroy();
			myScroll = null;
		}
		myScroll = new iScroll('advertise_scroll');
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	});

	$( '#info' ).live( 'pageshow',function(event) {
		if ( myScroll ) {
			myScroll.destroy();
			myScroll = null;
		}
		myScroll = new iScroll('info_scroll');
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	});
	
	
	$( '#select' ).live( 'pagecreate',function(event) {
		ch4_Root.viewDidLoad();
	});

	$( '#select' ).live( 'pageshow',function(event) {
		ch4_Root.viewDidAppear();
	});
	
	
	$( '#win' ).live( 'pageshow',function(event) {
		ch4_Wins.viewDidAppear();
	});

	$( '#shows' ).live( 'pageshow',function(event) {
		ch4_Shows.viewDidAppear();
	});
	$( '#shows-second' ).live( 'pageshow',function(event) {
		ch4_Shows.details.viewDidAppear();
	});
	
	
	$( '#events' ).live( 'pagecreate',function(event) {
		ch4_Events.eventsList = ch4_Shows.eventsList;
		ch4_Events.viewDidLoad();
	});
	$( '#events' ).live( 'pageshow',function(event) {
		ch4_Events.viewDidAppear();
	});
	
	$( '#charts' ).live( 'pageshow',function(event) {
		ch4_Charts.viewDidAppear();
	});
	$( '#charts' ).live( 'pageremove',function(event) {
		ch4_Charts.viewDidDisappear();
	});
	$( '#charts10' ).live( 'pageshow',function(event) {
		ch4_Charts.myTopTen.viewDidAppear();
	});
	$( '#charts10' ).live( 'pageremove',function(event) {
		ch4_Charts.myTopTen.viewDidDisappear();
	});
	

	$( '#share' ).live( 'pagecreate',function(event) {
		ch4_Share.viewDidLoad();
	});
	$( '#share' ).live( 'pageshow',function(event) {
		ch4_Share.viewDidAppear();
	});

	$( '#live' ).live( 'pagecreate',function(event) {
		ch4_Live.viewDidLoad();
	});
	$( '#live' ).live( 'pageshow',function(event) {
		ch4_Live.viewDidAppear();
	});
	$( '#live' ).live( 'pageremove',function(event) {
		ch4_Live.viewDidDisappear();
	});
	
	
	$( '#register' ).live( 'pagecreate',function(event) {
		ch4_Register.viewDidLoad();
	});
	$( '#register' ).live( 'pageshow',function(event) {
		ch4_Register.viewDidAppear();
	});
	
	
	$( '#userComment' ).live( 'pageshow',function(event) {
		ch4_Commons.showUserCommentDidAppear();
	});

	$( '#userComment' ).live( 'pagehide',function(event) {
		ch4_Commons.showUserCommentDidDisappear();
	});
	
	$( '#vote-song' ).live( 'pageshow',function(event) {
		ch4_Commons.showVoteSongDidAppear();
	});
	
	$( '#move-song' ).live( 'pageshow',function(event) {
		ch4_Charts.myTopTen.moveTop10DidAppear();
	});
}

$(document).bind("mobileinit", function(){
	$.mobile.allowCrossDomainPages = true;
	$.extend(  $.mobile , {
    	defaultPageTransition: 'none'
  	});
	CH4_Init();
});




RadioLive.prototype.firstShow = true;
RadioLive.prototype.streamUrls = ['http://4083.live.streamtheworld.com:80/CHANNEL4FM_SC', 
           	                   'http://3933.live.streamtheworld.com:80/RADIO4FM_SC',
        	                   'http://4103.live.streamtheworld.com:80/AL_RABEAFM_SC',
        	                   'http://4083.live.streamtheworld.com:80/COAST_FM_SC',
        	                   'http://3993.live.streamtheworld.com:80/GOLDFM_SC'];

RadioLive.prototype.metadataUrls = ['http://www.channel4fb.com/songname/Channel4.xml', 
                                    'http://www.channel4fb.com/songname/Radio4.xml',
                                    'http://www.channel4fb.com/songname/AlRabia.xml',
                                    'http://www.channel4fb.com/songname/Coast.xml',
                                    'http://www.channel4fb.com/songname/GoldFM.xml'];

RadioLive.prototype.playerAdsUrls = ['http://channel4.enon.biz/RADIO_STATION/IMG/PLAYADS/android/channel4/',
                                     'http://channel4.enon.biz/RADIO_STATION/IMG/PLAYADS/android/radio4/',
                                     'http://channel4.enon.biz/RADIO_STATION/IMG/PLAYADS/android/alrabea/',
                                     'http://channel4.enon.biz/RADIO_STATION/IMG/PLAYADS/android/coast/',
                                     'http://channel4.enon.biz/RADIO_STATION/IMG/PLAYADS/android/gold/'];

RadioLive.prototype.metadataSongname = null;
RadioLive.prototype.metadataProgress = false;
RadioLive.prototype.metadataTimer = null;

RadioLive.prototype.pageId = null;
        	                   
RadioLive.prototype.fbUrl = null;
RadioLive.prototype.twUrl = null;
RadioLive.prototype.yuUrl = null;
RadioLive.prototype.bgImage = null;
RadioLive.prototype.bn1Image = null;
RadioLive.prototype.bn1Link = null;
RadioLive.prototype.bn2Image = null;
RadioLive.prototype.bn2Link = null;
RadioLive.prototype.volumeChecker = null;

RadioLive.prototype.whatDisplay = '';


RadioLive.prototype.viewDidLoad = function () {
	var wakeObject = this;
	
	$( '#player_play_stop' ).click( function( event ) {
		event.stopPropagation();
		if ( ch4_livePlayer.status == 0 ||  ch4_livePlayer.status == 99 ) {
			ch4_liveChannelID = ch4_ChannelID;
			var url = wakeObject.streamUrls[ch4_ChannelID - 1];
			ch4_livePlayer.play( url );
		}
		else {
			ch4_livePlayer.stop();
		}
	});
	
	// Without these events the Play/Stop event is triggered!!!
	$( '#volumedown' ).click( function( event ) {
	});

	$( '#volumeup' ).click( function( event ) {
	});
	
	
	$( '#volumedown' ).touchstart( function( event ) {
		event.stopPropagation();
		$( '#volumedown' ).attr('src', 'img/bt-meno-active.png');
		wakeObject.resetVolumeTimer();
		wakeObject.volumeChecker = setInterval( function() {
			ch4_livePlayer.volumeDown(); }, 150 );
	});

	$( '#volumedown' ).touchend( function( event ) {
		event.stopPropagation();
		$( '#volumedown' ).attr('src', 'img/bt-meno.png');
		wakeObject.resetVolumeTimer();
	});

	$( '#volumeup' ).touchstart( function( event ) {
		event.stopPropagation();
		$( '#volumeup' ).attr('src', 'img/bt-piu-active.png');
		wakeObject.resetVolumeTimer();
		wakeObject.volumeChecker = setInterval( function() {
			ch4_livePlayer.volumeUp(); }, 150 ); 
	});

	$( '#volumeup' ).touchend( function( event ) {
		event.stopPropagation();
		$( '#volumeup' ).attr('src', 'img/bt-piu.png');
		wakeObject.resetVolumeTimer();		
	});
	
	
	$( '#voteButton' ).click( function() {
		ch4_Commons.showVoteSong( ch4_liveChannelID, wakeObject.metadataSongname, "#live_vote");
	});
};

RadioLive.prototype.viewDidDisappear = function () {
	this.resetMetadataTimer();
};

RadioLive.prototype.resetVolumeTimer = function () {
	clearInterval( this.volumeChecker );
	this.volumeChecker = null;
};

RadioLive.prototype.resetMetadataTimer = function () {
	if ( this.metadataTimer ) {
		clearInterval( this.metadataTimer );
		this.metadataTimer = null;
	}
	this.metadataSongname = null;
	this.metadataProgress = false; 
};

RadioLive.prototype.viewDidAppear = function () {
	var imgTitle = 'img/title_channel_' + ch4_ChannelID + '.png';
	$( '#live #channel-title' ).attr( 'src', imgTitle );
	
	if ( this.firstShow ) {
		$( '#social_fb' ).css( 'display', 'none' );
		$( '#social_tw' ).css( 'display', 'none' );
		$( '#social_yu' ).css( 'display', 'none' );
		
		$( '#live_banner1' ).css( 'display', 'none' );
		$( '#live_banner2' ).css( 'display', 'none' );
		$( '#voteButton' ).css( 'display', 'none' );

		this.channelInfo();
		this.activePages();
		this.firstShow = false;
	}
	else {
		this.renderSocial();
		this.renderPage();
	}
	
	ch4_livePlayer.delegate = this;
	this.whatDisplay = '';
	this.updateAudioStatus(ch4_livePlayer.status);
};

RadioLive.prototype.updateAudioStatus = function (_status) {
	if ( _status != 2 ) {
		this.resetVolumeTimer();
		this.resetMetadataTimer();
	}
	
	if ( _status == 0) {
		$( '#song-title' ).html('&nbsp;');
		$( '#voteButton' ).css( 'display', 'none' );
		this.showAdsPlayer('play');
	}
	else if ( _status == 1 ) {
		$( '#song-title' ).html('Connecting...');
		$( '#voteButton' ).css( 'display', 'none' );
		this.showAdsPlayer('stop');
	}
	else if ( _status == 99 ) {
		$( '#song-title' ).html('Stream unavailable now');
		$( '#voteButton' ).css( 'display', 'none' );
		this.showAdsPlayer('play');
	}
	else if ( _status == 2 ) {
		if ( this.metadataProgress == false ) {
			this.metadataProgress = true;
			this.retrieveMetadata();
		}
		
		if ( this.metadataSongname && this.metadataSongname != '' ) { 
			$( '#song-title' ).html(this.metadataSongname);
			$( '#voteButton' ).css( 'display', 'block' );
		}
		else {
			$( '#song-title' ).html('&nbsp;');
			$( '#voteButton' ).css( 'display', 'none' );
		}
		this.showAdsPlayer('stop');
	}
};

RadioLive.prototype.channelInfo = function () {
	var url = CMS_BaseURL + '/radio/channels/' + ch4_ChannelID + '?frmId=' + CMS_Format;

	var wakeObject = this;	
	
	var jqxhr = $.getJSON( CMS_API, {
			url : url
		},
		function(json) {
			wakeObject.fbUrl = getJsonProperty(json, 'channel.facebook_url', null);
			wakeObject.twUrl = getJsonProperty(json, 'channel.tweeter_url', null);
			wakeObject.yuUrl = getJsonProperty(json, 'channel.youtube_url', null);
			wakeObject.renderSocial();
		})
		.error(function() { 
		});
}

RadioLive.prototype.activePages = function () {
	var url = CMS_BaseURL + '/radio/channels/' + ch4_ChannelID + '/pages?frmId=' + CMS_Format;

	var wakeObject = this;	
	
	var jqxhr = $.getJSON( CMS_API, {
			url : url
		},
		function(json) {
			var pageId = getJsonProperty(json, 'pages.page.pageid', null);
			if ( pageId ) {
				wakeObject.livePage( pageId );
			}
		})
		.error(function() { 
		});
}

RadioLive.prototype.livePage = function (pageId) {
	var url = CMS_BaseURL + '/radio/channels/' + ch4_ChannelID + '/pages/' + pageId + '?frmId=' + CMS_Format;

	var wakeObject = this;
	this.pageId = pageId;

	var jqxhr = $.getJSON( CMS_API, {
			url : url
		},
		function(json) {
			wakeObject.bgImage = getJsonProperty(json, 'page.backgroundimage.imageformat.imgpath', null);
			wakeObject.bn1Image = getJsonProperty(json, 'page.centraladimage.imageformat.imgpath', null);
			wakeObject.bn1Link = getJsonProperty(json, 'page.centraladimage.imageformat.imglink', null);
			wakeObject.bn2Image = getJsonProperty(json, 'page.image.imageformat.imgpath', null);
			wakeObject.bn2Link = getJsonProperty(json, 'page.image.imageformat.imglink', null);
			
			wakeObject.renderPage();
		})
		.error(function() { 
		});
}

RadioLive.prototype.renderSocial = function () {
	var wakeObject = this;

	if ( this.fbUrl ) {
		$( '#social_fb' ).css( 'display', 'inline' );
		$( '#social_fb' ).unbind('click');
		$( '#social_fb' ).click( function () {
			CH4_OpenLink( wakeObject.fbUrl );
		});
	}
	else {
		$( '#social_fb' ).css( 'display', 'none' );
	}
	if ( this.twUrl ) {
		$( '#social_tw' ).css( 'display', 'inline' );
		$( '#social_tw' ).unbind('click');
		$( '#social_tw' ).click( function () {
			CH4_OpenLink( wakeObject.twUrl );
		});
	}
	else {
		$( '#social_tw' ).css( 'display', 'none' );
	}
	if ( this.yuUrl ) {
		$( '#social_yu' ).css( 'display', 'inline' );
		$( '#social_yu' ).unbind('click');
		$( '#social_yu' ).click( function () {
			CH4_OpenLink( wakeObject.yuUrl );
		});
	}
	else {
		$( '#social_yu' ).css( 'display', 'none' );
	}
}

RadioLive.prototype.renderPage = function () {
	var wakeObject = this;
	
	if ( this.bgImage ) {
		$("#play").css('background-image', 'url(' + this.bgImage + ')');
	}
	
	if ( this.bn1Image ) {
		$("#live_banner1_img").attr('src', this.bn1Image);
		$("#live_banner1").css('display', 'block');
		$("#live_banner1").unbind('click');
		$("#live_banner1").click( function() {
			CH4_OpenLink( wakeObject.bn1Link );
		});
	}
	if ( this.bn2Image ) {
		$("#live_banner2_img").attr('src', this.bn2Image);
		$("#live_banner2").css('display', 'block');
		$("#live_banner2").unbind('click');
		$("#live_banner2").click( function() {
			CH4_OpenLink( wakeObject.bn2Link );
		});
	}
}

RadioLive.prototype.retrieveMetadata = function () {
	if ( !ch4_liveChannelID ) return;
	
	var url = this.metadataUrls[ ch4_liveChannelID - 1 ];
	var weakObject = this;
	var jqxhr = $.getJSON( CMS_API, {
			url : url
		},
		function(json) {
			weakObject.metadataSongname = json.song;
			if ( weakObject.metadataSongname && weakObject.metadataSongname != '' ) { 
				$( '#song-title' ).html(weakObject.metadataSongname);
				$( '#voteButton' ).css( 'display', 'block' );
			}
			else {
				$( '#song-title' ).html('&nbsp;');
				$( '#voteButton' ).css( 'display', 'none' );
			}
			
			if ( ch4_livePlayer.status == 2 && !weakObject.metadataTimer ) {
				weakObject.metadataTimer = setInterval( function() {
					weakObject.retrieveMetadata(); }, 30000 );
			}
		})
		.error(function() {
			weakObject.metadataSongname = null;
			$( '#song-title' ).html('&nbsp;');
			$( '#voteButton' ).css( 'display', 'none' );
		});
};

RadioLive.prototype.showAdsPlayer = function (imgPlayer) {
	var url = this.playerAdsUrls[ ch4_ChannelID - 1 ];

	var weakObject = this;
	
	if ( imgPlayer == 'play' ) {
		if ( this.whatDisplay == 'play' ) return;
		this.whatDisplay = 'play';
		
		$("#playbutton").css('background-image', 'url(../img/bt-play.png)');
		$("#volume_controls").css( 'display', 'none' );
		url = url + 'play.png';
		var img = new Image();
		img.onload = function() {
			if ( weakObject.whatDisplay != 'play' ) return;
			
			$("#playbutton").css('background-image', 'url(' + this.src + ')');
		};
		img.src = url;
	}
	else {
		if ( this.whatDisplay == 'stop' ) return;
		this.whatDisplay = 'stop';
		
		$("#playbutton").css('background-image', 'url(../img/bt-stop.png)');
		$("#volume_controls").css('background-image', '0 !important');
		$("#volume_controls").css( 'display', 'block' );
		url = url + 'stop.png';
		var img = new Image();
		img.onload = function() {
			if ( weakObject.whatDisplay != 'stop' ) return;
			
			$("#volume_controls").css('background-image', 'url(' + this.src + ')');
		};
		img.src = url;
	}
};


function RadioLive() {
}


RadioShare.prototype.firstShow = true;
RadioShare.prototype.imagesList = null;

RadioShare.prototype.viewDidLoad = function () {
	var wakeObject = this;
	
	$( '#share-img' ).click( function() {
		if ( !wakeObject.imagesList ) {
			wakeObject.downloadGallery();
		}
		else {
			wakeObject.showGallery();			
		}
	});
	
	$( "#song_dedicate" ).click( function () {
		ch4_Commons.showSongRequest();
	});
};

RadioShare.prototype.viewDidAppear = function () {
	var img = '../img/share_' + ch4_ChannelID + '.png';
	$( '#share-img' ).attr( 'src', img );
	
	var imgTitle = 'img/title_channel_' + ch4_ChannelID + '.png';
	$( '#channel-title' ).attr( 'src', imgTitle );
	
	this.renderSocial();
}

RadioShare.prototype.viewDidDisappear = function () {
	
};

RadioShare.prototype.downloadGallery = function () {
	var uriList = ['Channel4.xml', 'Radio4.xml', 'AlRabia.xml', 'Coast.xml', 'Gold.xml'];
	var url = 'http://channel4.enon.biz/RADIO_STATION/IMG/WALLPAPERS/' + uriList[ch4_ChannelID - 1];

	$.mobile.loadingMessage = 'Loading...';
	$.mobile.showPageLoadingMsg();
	
	var callBackObj = this;	
	
	var jqxhr = $.getJSON( CMS_API, {
			url : url
		},
		function(json) {
			callBackObj.imagesList = json.images.image;
			$.mobile.hidePageLoadingMsg();
			callBackObj.showGallery();
		})
		.error(function() { 
			$.mobile.hidePageLoadingMsg();
			CH4_ShowMessage('Gallery', 'An error occurred during Gallery retrieving. Please retry again later.');
		});
};

RadioShare.prototype.showGallery = function () {
	var _list = '<ul class="gallery">';
	$.each( this.imagesList, function( i, item ) {
		_list = _list + '<li><a id="galleryg-' + i + '" href="http://channel4.enon.biz/RADIO_STATION/IMG/WALLPAPERS/';
		_list = _list + item;
		_list = _list + '" rel="external"><img src="http://channel4.enon.biz/RADIO_STATION/IMG/WALLPAPERS/';
		_list = _list + item;
		_list = _list + '"/></a></li>';
	});
	_list = _list + '</ul>';
	
	$("#myGallery").html( _list );
	
	try {
		var options = {};
		var photoSwipeInstance = $("ul.gallery a").photoSwipe(options);
		$("#galleryg-0").click();
	}
	catch (error) {
		alert(error);
	}
}

RadioShare.prototype.renderSocial = function () {
	$( '#social_fb' ).unbind('click');
	$( '#social_tw' ).unbind('click');
	$( '#social_yu' ).unbind('click');
	
	if ( ch4_Live.fbUrl ) {
		$( '#social_fb' ).css( 'display', 'inline' );
		$( '#social_fb' ).click( function () {
			CH4_OpenLink( ch4_Live.fbUrl );
		});
	}
	else {
		$( '#social_fb' ).css( 'display', 'none' );
	}
	if ( ch4_Live.twUrl ) {
		$( '#social_tw' ).css( 'display', 'inline' );
		$( '#social_tw' ).click( function () {
			CH4_OpenLink( ch4_Live.twUrl );
		});
	}
	else {
		$( '#social_tw' ).css( 'display', 'none' );
	}
	if ( ch4_Live.yuUrl ) {
		$( '#social_yu' ).css( 'display', 'inline' );
		$( '#social_yu' ).click( function () {
			CH4_OpenLink( ch4_Live.yuUrl );
		});
	}
	else {
		$( '#social_yu' ).css( 'display', 'none' );
	}
}

function RadioShare() {
}


var CH4UserReg = function() { 
 
}
 
CH4UserReg.prototype.save = function(userid, firstname, lastname, email, phone, successCallback, failureCallback) {
	return PhoneGap.exec( successCallback,
			failureCallback,
			'CH4UserReg',
			'save',
			[userid, firstname, lastname, email, phone]);
};

CH4UserReg.prototype.read = function(successCallback, failureCallback) {
	return PhoneGap.exec( successCallback,
			failureCallback,
			'CH4UserReg',
			'read',
			[]);
};

PhoneGap.addConstructor( function() {
	PhoneGap.addPlugin('ch4UserReg', new CH4UserReg());
	PhoneGap.addPlugin('ch4Charts', new CH4Charts());	
	PhoneGap.addPlugin('ch4Common', new CH4Common());
	PhoneGap.addPlugin("childBrowser", new ChildBrowser());
});


SHStreamPlayer.prototype.status = 0;
SHStreamPlayer.prototype.delegate = null;
SHStreamPlayer.prototype.media = null;
SHStreamPlayer.prototype.volumeLevel = 1.0;
SHStreamPlayer.prototype.backupVolumeLevel = null;

SHStreamPlayer.prototype.muteOn = function() {
	if ( this.status == 2 ) {
		try {
			this.backupVolumeLevel = this.volumeLevel;
			this.media.setVolume( 0.0 );
		}
		catch (e) {
			alert( e );
		}
	}
};

SHStreamPlayer.prototype.muteOff = function() {
	if ( this.status == 2 ) {
		try {
			if ( this.backupVolumeLevel ) {
				this.volumeLevel = this.backupVolumeLevel;
				this.media.setVolume( this.volumeLevel );
				this.backupVolumeLevel = null;
			}
		}
		catch (e) {
			alert( e );
		}
	}
};


SHStreamPlayer.prototype.play = function (_url) {
	try {
		if ( this.delegate ) {
			this.status = 1;
			this.delegate.updateAudioStatus( this.status );
		}

		var weakObject = this;
		
		this.media = new Media(
				_url, 
				function () {}, 
				function error(e) {
					weakObject.status = 99;
					weakObject.delegate.updateAudioStatus( weakObject.status );
				}, 
				function mediaStatus(status) {
					if ( status == 3 || status == 4 ) {
						weakObject.status = 0;
						weakObject.delegate.updateAudioStatus( weakObject.status );
						weakObject.media = null;
					}
					else if ( status == 2 ) {
						weakObject.status = 2;
						weakObject.delegate.updateAudioStatus( weakObject.status );
					}
					else {
						weakObject.status = 1;
						weakObject.delegate.updateAudioStatus( weakObject.status );
					}
				});
		this.media.play();
	}
	catch ( error ) {
		alert( error );
	}
};

SHStreamPlayer.prototype.stop = function () {
	try {
		if ( this.delegate ) {
			this.status = 0;
			this.delegate.updateAudioStatus( this.status );
		}
		
		if ( this.media ) {
			this.media.stop();
			this.media.release();
		}
	}
	catch ( error ) {
		alert( error );
	}
};

SHStreamPlayer.prototype.volumeDown = function () {
	if ( this.status == 2 ) {
		try {
			if ( this.volumeLevel > 0 ) {
				this.volumeLevel = this.volumeLevel - 0.05;
				this.media.setVolume( this.volumeLevel );
			}
		}
		catch (e) {
			alert( e );
		}
	}
};

SHStreamPlayer.prototype.volumeUp = function () {
	if ( this.status == 2 ) {
		try {
			if ( this.volumeLevel < 1.0 ) {
				this.volumeLevel = this.volumeLevel + 0.05;
				this.media.setVolume( this.volumeLevel );
			}
		}
		catch (e) {
			alert( e );
		}
	}
};

function SHStreamPlayer() {
};


var PhoneListener = { 
	start: function(successCallback, failureCallback) {
		return PhoneGap.exec(    
			successCallback,
			failureCallback,
			'PhoneListener',
			'startMonitoringPhoneState',
			[]); // no arguments required
	},
	stop: function(successCallback, failureCallback) {
		return PhoneGap.exec(    
			successCallback,
			failureCallback,
			'PhoneListener',
			'stopMonitoringPhoneState',
			[]); // no arguments required
	}
};

