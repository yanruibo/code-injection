
var majorVersion = '3';
var minorVersion = '4';
var branch = 'ee';
var revision = '387';
var build = 'Build 5779';
var version =  majorVersion + '.' + minorVersion + " " + branch + '-' + revision + ' ' + build;







































/**
 * Main page module for RallyUI
 */
function RallySchedulePage() {
	if (!(this instanceof arguments.callee))
		throw new Error("Constructor called as a function");
	this.name = 'Schedule';
};

RallySchedulePage.prototype = new RallyUIPage({});

/**
 * Initializes main menu listeners.
 */
RallySchedulePage.prototype.initialize = function() {
	var self = this;
	this.node = $('#commonList');
	this.subheader = false;
	this.parent = "Main";
}

RallySchedulePage.prototype.onshow = function() {
	var that = this;
	var node = this.node;
    
    var lang = RUI.locale.lang;
    
	node.empty();

	RUI.call('schedule&locale='+lang, {}, function(data) {
		var html = "";
        var schedules = data;
             
		for (i in schedules) {
			html += "<div class='itemTitle'>" + schedules[i].title + "</div>";
             for(j in schedules[i].data)
             {
                html += "<div class='item'>";
                html += "<div class='itemTime'>" + schedules[i].data[j].time + "</div>";
                html += "<div class='itemCenter'>" + schedules[i].data[j].description + "</div>";
                html += "</div>";
             }
		}
		node.html(html);
	});
}

RallySchedulePage.prototype.onhide = function() {
	RUI.hideMenu();
}

RUI.addPage(new RallySchedulePage());


function RallyUIPage(params){
	if (!(this instanceof arguments.callee)) throw new Error("Constructor called as a function");
	$.extend(this, params);
}

RallyUIPage.prototype.params = {
		parent:null,
		name:"Untitled Page",
		onorientationchange: null,
		onshow:function(){},
		onhide:function(){},
		node:null,
		subheader:null
}

RallyUIPage.prototype.show = function(options){
	this.node.show();
	
	if(this.subheader){
		this.subheader.show();
	}
	
	if(this.onshow){
		this.onshow(options);
	}
}

RallyUIPage.prototype.hide = function(){
	this.node.hide();
	
	if(this.subheader){
		this.subheader.hide();
	}

	if(this.onhide){
		this.onhide();
	}
}

RallyUIPage.prototype.onhide = function(){};
RallyUIPage.prototype.onshow = function(){};
RallyUIPage.prototype.onresize = function(){};
RallyUIPage.prototype.onmenuhide = function(){};

RallyUIPage.prototype.initialize = function(){
	if(this.node) this.node.hide();
}

/**
 * Main page module for RallyUI
 */
function RallyNewsPage(){
	if (!(this instanceof arguments.callee)) throw new Error("Constructor called as a function");
	this.name = 'News';
};

RallyNewsPage.prototype = new RallyUIPage({});
RallyNewsPage.prototype.offset = 0;
RallyNewsPage.prototype.limit = 2;
RallyNewsPage.prototype.loaded = false;

/**
 * Initializes main menu listeners.
 */
RallyNewsPage.prototype.initialize = function() {
  var self = this;
  this.node = $('#news');
  this.subheader = false;
  this.parent="Main";
}

RallyNewsPage.prototype.newsClick = function(){
	RUI.showPage("NewsDetail",
		{
			id:this.getAttribute('ref')
		}
	);
}

RallyNewsPage.prototype.onshow = function(){
	var that = this;
	var node = this.node;
	
	if(!this.loaded){
		node.empty();
		RUI.call('newsList',{limit:that.limit,offset:that.offset},function(data){
			for (i in data){
				node.append(RUI.newsService.getNewsItem(data[i],that.newsClick));
			}
		});
	}
}

RUI.addPage(new RallyNewsPage());


/**
 * Main page module for RallyUI
 */
function RallyPenaltiesPage() {
	if (!(this instanceof arguments.callee))
		throw new Error("Constructor called as a function");
	this.name = 'Penalties';
};

RallyPenaltiesPage.prototype = new RallyUIPage({});

/**
 * Initializes main menu listeners.
 */
RallyPenaltiesPage.prototype.initialize = function() {
	var self = this;
	this.node = $('#commonList');
	this.subheader = false;
	this.parent = "Main";
}

RallyPenaltiesPage.prototype.onshow = function() {
	var that = this;
	var node = this.node;
    
	node.empty();

	RUI.call('penalties', {}, function(data) {
		var html = "";
        var retires = data;
             
		for (i in retires) {

                html += "<div class='item'>";
                html += "<div class='itemLeft'>" + retires[i].number + "</div>";
                html += "<div class='itemCenter'>" + retires[i].team + "</div>";
                html += "<div class='itemReason'><div class='reason_holder'>"+retires[i].reason+"</div><div class='stage_holder'>" + retires[i].stage_penalty +"</div></div>";
                html += "</div>";
		}
		node.html(html);
	});
}

RallyPenaltiesPage.prototype.onhide = function() {
	RUI.hideMenu();
}

RUI.addPage(new RallyPenaltiesPage());





























/**
 * News detail page module for RallyUI
 */
function RallyNewsDetailPage(){
	if (!(this instanceof arguments.callee)) throw new Error("Constructor called as a function");
	this.name = 'NewsDetail';
};

RallyNewsDetailPage.prototype = new RallyUIPage({});

/**
 * Initializes main menu listeners.
 */
RallyNewsDetailPage.prototype.initialize = function() {
  var self = this;
  this.node = $('#newsDetail');
  this.subheader = false;
  this.parent="News";
  this.gallery=null;
}

RallyNewsDetailPage.prototype.onshow = function(input){
	if(!input.backnav && input.id){
		var that = this;
		var node = this.node;
		
		node.empty();
		RUI.call('newsDetail',input,function(data){
			RUI.newsService.renderNewsDetail(data, that.node);

			if(that.gallery){
				// detach old gallery so we can instantiate it anew
				// yes, it's really "detatch" argh
				window.Code.PhotoSwipe.detatch(that.gallery);
				that.gallery = null;
			}
			var images = that.node.find('img').get();
			var options = {
				getImageSource: function(obj){
					return obj.src;
				},
			};
	
			var commentsLink = $('<a class="commentsLink" href="#">'+RUI.locale.tr('Read Comments')+" ("+data.comments+')'+'</a>');
			commentsLink.attr('ref', input.id);
			commentsLink.click(function(){
				RUI.showPage("Comments",{id:this.getAttribute('ref')});
			});
			
			that.node.append(commentsLink);
			
			that.node.append('<a href="'
					+RUI.locale.tr('http://www.auto24.ee/news/')+data.id+'" target="_system" rel="alternate" onclick="window.open(this.getAttribute(\'href\'),\'_system\');return false;">'
					+RUI.locale.tr('http://www.auto24.ee/news/')+data.id+'</a>'
			);
			
			if(images.length > 0){
				var ps = window.Code.PhotoSwipe
				that.gallery = ps.attach(images, options);
				that.gallery.addEventHandler(ps.EventTypes.onBeforeShow, function(e){
					RUI.inGallery = true;
				});
				that.gallery.addEventHandler(ps.EventTypes.onBeforeHide, function(e){
					RUI.inGallery = false;
				});
			}
		});
	}
}

RUI.addPage(new RallyNewsDetailPage());


/**
 * Main page module for RallyUI
 */
function RallyResultsPage() {
	if (!(this instanceof arguments.callee))
		throw new Error("Constructor called as a function");
	this.name = 'Results';
};

RallyResultsPage.prototype = new RallyUIPage({});

/**
 * Initializes main menu listeners.
 */
RallyResultsPage.prototype.initialize = function() {
	var self = this;
	this.node = $('#results');
	this.subheader = false;
	this.parent = "Main";
	
	$('#resultsMenu').children().click(function(){
		RUI.showPage(
			this.getAttribute('target'),{
				id:$('#overlayMask').attr('rel'),
				mode:this.getAttribute('rel')
			}
		);
	});
}

RallyResultsPage.prototype.onshow = function() {
	var that = this;
	var node = this.node;

	node.empty();

	RUI.call('contests', {}, function(data) {
		var html = "";
		for (i in data) {
			html += "<div class='resultLink' data-trackid='" + data[i].code
					+ "' rel='" + data[i].id + "'>" + data[i].name + "</div>";
		}
		node.html(html);
		node.children('.resultLink').click(
			function() {
				$(this).addClass('resultClicked');
				$('#overlayMask').attr('rel', this.getAttribute('rel'));
				
				var trackCode = this.getAttribute('data-trackid');
				var trackName = trackCode + " (" + this.innerHTML + ")";
	
				$('#resultsMenu .roundedMenuEntry[rel=0] div').html(
						trackName);
				$('#resultsMenu .roundedMenuEntry[rel=1] div').html(
						RUI.locale.tr('ABS after') + " " + trackName);
				RUI.showMenu();
			}
		);
	});
}

RallyResultsPage.prototype.onhide = function() {
	RUI.hideMenu();
}

RallyResultsPage.prototype.onmenuhide = function() {
	this.node.children().removeClass('resultClicked');
}

RUI.addPage(new RallyResultsPage());


/**
 * Main page module for RallyUI
 */
function RallyResultPage(){
	if (!(this instanceof arguments.callee)) throw new Error("Constructor called as a function");
	this.name = 'Result';
};

RallyResultPage.prototype = new RallyUIPage({});

/**
 * Initializes main menu listeners.
 */
RallyResultPage.prototype.initialize = function() {
  var self = this;
  this.node = $('#result');
  this.subheader = $('#resultSubheader');
  this.parent="Results";
  this.menu = $('#resultMenu');
  
  this.currentMode = 0;
  this.currentId = 0;
  
  this.subheader.click(function(){
	    $('#overlayMask').attr('rel', self.currentId);
	    $('#resultMenu').attr('rel', self.currentMode);
		RUI.toggleMenu('resultMenu');
  });
  
  //$('#resultSubheader .subheaderTitle').html(RUI.locale.tr('Class')+': '+RUI.locale.tr('All'));
  $('#resultSubheader .subheaderTitle').html(RUI.locale.tr('All'));

}

RallyResultPage.prototype.onhide = function(){
  //$('#resultSubheader .subheaderTitle').html(RUI.locale.tr('Class')+': '+RUI.locale.tr('All'));
  $('#resultSubheader .subheaderTitle').html(RUI.locale.tr('All'));
}

RallyResultPage.prototype.onshow = function(input){
	var that = this;
	var node = this.node;
	
	node.empty();
	
	var selected = input.group;
	
	that.currentMode = input.mode;
	that.currentId = input.id;
	
	RUI.call('contest',input,function(data){
		var groups = data.groups;
		var entries = data.positions;
        var information = data.information;
		
		$('#resultMenu').attr('rel',input.mode);
		
		var selectedGroupName = RUI.locale.tr("All");
		var groupHtml = "";
		
		for(i=0;i<groups.length;i++){
			groupHtml += '<div class="roundedMenuEntry" target="Result" rel="'+(groups[i].id)+'"><div>'+RUI.locale.tr(groups[i].name)+'</div></div>'
			if(groups[i].id == selected){
				selectedGroupName = RUI.locale.tr(groups[i].name);
			}
		}
		
		//$('#resultSubheader .subheaderTitle').html(RUI.locale.tr('Class')+': '+RUI.locale.tr(selectedGroupName));
        $('#resultSubheader .subheaderTitle').html(RUI.locale.tr(selectedGroupName));
		
		$('#resultMenu').html(groupHtml).children().click(function(){
			RUI.showPage(
				this.getAttribute('target'),{
					id:$('#overlayMask').attr('rel'),
					mode:$('#resultMenu').attr('rel'),
					group:this.getAttribute('rel')
				}
			);
		});;
		
		var html = "";
		for (i=0;i<entries.length;i++){
			var row = entries[i];
			
			html += "<div class='item'>";
			
			html += "<div class='itemLeft'>"+
			"<div class='place_holder'><div class='place'>"+row.place+"</div><div class='change'>"+(row.change?row.change:'')+"</div></div>"+
			"<div class='class_holder'>"+"</div>"+
			"</div>";
			
			html += "<div class='itemCenter'>"+
			(row.team[0]?("<div class='team_holder'>"+row.team[0]+"</div>"):'')+
            (row.team[1]?("<div class='team_holder'>"+row.team[1]+"</div>"):'')+
			"<div class='car_holder'>"+row.vehicle+"</div>"+
             "<div class='number_holder'>"+row.number+(row.group?(", "+RUI.locale.tr('Class')+" "+row.group):'')+"</div>"+
			"</div>";
			
			html += "<div class='itemRight'>"+
			"<div class='time_holder'>"+row.time[0]+"</div>";
			
			if(row.time[1]){
				html += "<div class='diff_holder'>"+row.time[1]+"</div>";
			}
			
			html += "</div>";
			
			html += "</div>";
		}
        if(information.length>0)
        {
             html += "<div class='stageInfo'><div class='info_holder'>"+RUI.locale.tr('information_about_stage')+"</div></div>";
             for(i=0;i<information.length;i++)
             {
                var row = information[i];
             
                html += "<div class='stageInfo'>";
             
                html += "<div class='info_data_holder'>"+row.info+"</div>";
             
                html += "</div>";
             }
        }
		node.html(html);
	});
}

RUI.addPage(new RallyResultPage());


/**
 * Main page module for RallyUI
 */
function RallyEntriesPage(){
	if (!(this instanceof arguments.callee)) throw new Error("Constructor called as a function");
	this.name = 'Entries';
};

RallyEntriesPage.prototype = new RallyUIPage({});

/**
 * Initializes main menu listeners.
 */
RallyEntriesPage.prototype.initialize = function() {
  var self = this;
  this.node = $('#entries');
  this.subheader = null;
  this.parent="Main";
}

RallyEntriesPage.prototype.onshow = function(){
	var that = this;
	var node = this.node;
	
	console.log(node);
	
	node.empty();
	
	var list = document.createElement('div');
	list.setAttribute('id','entriesList');
	
	RUI.call('entries',{},function(data){
		var html = "";
		for (i in data){
			html += that.renderEntry(data[i]);
		}
		$(list).html(html);
		node.append(list);
	});
}

RallyEntriesPage.prototype.renderEntry = function(data){
	var names = [data.driver,data.codriver];
	var country = data.country.split('/');
	
	country[0] = this.countryLookup(country[0]);
	country[1] = this.countryLookup(country[1]);

	return( 
		'<div class="roundedMenuEntry">'+
		'<div class="entryLeft">'+
    		'<div class="entrySubline"><img src="img/flags/'+country[0]+'.png"><span>'+names[0].trim()+'</span></div>'+
			'<div class="entrySubline"><img src="img/flags/'+country[1]+'.png"><span>'+names[1].trim()+'</span></div>'+
		'</div>'+
		'<div class="entryRight"><label>'+data.vehicle+'</label></div>'+
		'</div>'
	);
}

RallyEntriesPage.prototype.countryLookup = function(country){
	var countryOriginal = country;
	
	if(!country) return "void";
	
	country = countries[country.trim()];
	
	if(!country){
		console.warn('country '+countryOriginal+' not found in lookup table!');
		country = "void"
	}else{
		country = country.toLowerCase();
	}
	
	return country;
}

RUI.addPage(new RallyEntriesPage());


/**
 * Main page module for RallyUI
 */
function RallyMainPage(){
	if (!(this instanceof arguments.callee)) throw new Error("Constructor called as a function");
	this.name = 'Main';
};

RallyMainPage.prototype = new RallyUIPage({});

/**
 * Initializes main menu listeners.
 */
RallyMainPage.prototype.initialize = function() {
  var self = this;
  this.node = $('#main');
  this.backToMain = $('#backToMain');
  this.node.find('.roundedMenuEntry').click(function(){
	  var $this = $(this);
	  var pagename = $this.attr('rel');
	  
	  if(!$this.hasClass('clicked')){
		  $this.addClass('clicked');
		  setTimeout(function(){
			RUI.showPage(pagename);
			$this.removeClass('clicked');
		  },100);
	  }
  });
}

RallyMainPage.prototype.onshow = function(){
	if (!RUI.isAndroid){
		this.backToMain.show();
	}
}

RallyMainPage.prototype.onhide = function(){
	if (!RUI.isAndroid){
		this.backToMain.hide();
	}
}

RUI.addPage(new RallyMainPage());


/**
 * Maps list page module for RallyUI
 */
function RallyMapsPage() {
	if (!(this instanceof arguments.callee))
		throw new Error("Constructor called as a function");
	this.name = 'Maps';
};

RallyMapsPage.prototype = new RallyUIPage({});

/**
 * Array containing the tracks list
 */
RallyMapsPage.prototype.tracks = [
	{ 
		name:"ABC",
		vertices:	[
		         	 new google.maps.LatLng(57.823869,26.624322),
				     new google.maps.LatLng(57.822955,26.631017),
				     new google.maps.LatLng(57.825012,26.636167),
				     new google.maps.LatLng(57.821904,26.647582),
				     new google.maps.LatLng(57.820807,26.660886)
		]
	},
	{ 
		name:"BAC",
		vertices:	[
		         	 new google.maps.LatLng(58.823869,26.624322),
				     new google.maps.LatLng(58.822955,26.631017),
				     new google.maps.LatLng(58.825012,26.636167),
				     new google.maps.LatLng(58.821904,26.647582),
				     new google.maps.LatLng(58.820807,26.660886)
		]
	},
	{ 
		name:"BCA",
		vertices:	[
		         	 new google.maps.LatLng(57.823869,27.624322),
				     new google.maps.LatLng(57.822955,27.631017),
				     new google.maps.LatLng(57.825012,27.636167),
				     new google.maps.LatLng(57.821904,27.647582),
				     new google.maps.LatLng(57.820807,27.660886)
		]
	},
	{ 
		name:"CBA",
		vertices:	[
		         	 new google.maps.LatLng(58.823869,27.624322),
				     new google.maps.LatLng(58.822955,27.631017),
				     new google.maps.LatLng(58.825012,27.636167),
				     new google.maps.LatLng(58.821904,27.647582),
				     new google.maps.LatLng(58.820807,27.660886)
		]
	},
];


/**
 * Initializes main menu listeners.
 */
RallyMapsPage.prototype.initialize = function() {
	var self = this;
	this.node = $('#results');
	this.subheader = false;
	this.parent = "Main";
	
	  RUI.call('tracks',{},function(data){
		  self.tracks = data;
		  
		  for (t in self.tracks){
			  var vertices = self.tracks[t].vertices;
			  for (v in vertices){
				  vertices[v] = new google.maps.LatLng(vertices[v][0],vertices[v][1]);
			  }
			  
			  self.tracks[t].vertices = vertices;
		  }
	 });
}

RallyMapsPage.prototype.onshow = function() {
	var that = this;
	var node = this.node;
    
	node.empty();
	
	var html = "";

	for (i in this.tracks) {
            html += "<div class='item' rel='"+i+"'>" + this.tracks[i].name + "</div>";
	}
	
	node.html(html);
	
	node.children('.item').click(function(){
		var $this = $(this);
		var id = $this.attr('rel');
		
		if(!$this.hasClass('clicked')){
			$this.addClass('clicked');
			  
			RUI.confirm('Do you want to display your own location on map?',
				function(v){
				  if(v == 1){
					  console.log('geolocation enabled');
					  RUI.showPage('Map',{geolocate:true,track:that.tracks[id]});
				  }else{
					  console.log('geolocation disabled');
					  RUI.showPage('Map',{geolocate:false,track:that.tracks[id]});
				  }
				},	["Yes","No"]
			);
			  
			setTimeout(function(){
				  $this.removeClass('clicked');
			},100);
		}
	});
}

RallyMapsPage.prototype.onhide = function() {
	RUI.hideMenu();
}

RUI.addPage(new RallyMapsPage());


/**
 * Comments page module for RallyUI
 */
function RallyCommentsPage(){
	if (!(this instanceof arguments.callee)) throw new Error("Constructor called as a function");
	this.name = 'Comments';
};

RallyCommentsPage.prototype = new RallyUIPage({});

RallyCommentsPage.prototype.initialize = function() {
  var self = this;
  this.node = $('#comments');
  this.subheader = false;
  this.parent="NewsDetail";
  
  var commentForm = this.node.find('#commentForm');
  
  var commentName = this.commentName = commentForm.find("#commentNameInput");
  var commentText = this.commentText = commentForm.find("#commentText");
  var commentCaptcha = this.commentCaptcha = commentForm.find("#commentCaptcha");
  var captchaImage = this.captchaImage = commentForm.find("#captchaImg");
  
  commentForm.find('input.input-submit').click(function(){
		var nimi = commentName.val();
		var kommentaar = commentText.val();
		
		if (nimi == ''){
			RUI.alert('Name cannot be empty!');
			return;
		}
		
		if(kommentaar == ''){
			RUI.alert('Comment cannot be empty!');
			return;
		}
		
		self.addComment(nimi, kommentaar, commentCaptcha.val(), function(data){
			if (data.status == 'success'){
				commentContainer.appendChild(RUI.newsService.getCommentItem({
					nimi:nimi, 
					kommentaar:RUI.htmlEntities(kommentaar), 
					sday:data.sday,
					stime:data.stime
				}));
			}else if (data.status == 'wrong_captcha'){
				RUI.alert('The entered security code is wrong!');
			}else if (data.status == 'no_captcha'){
				RUI.alert('You must enter a security code!');
			}else if (data.status == 'blocked'){
				RUI.alert('Your comment was blocked on suspicion of spam');
			}else if (data.status == 'invalid'){
				RUI.alert('You did not fill a required field!');
			}
			captchaImage.attr('src', RUI.getRootURL(data.captcha));
			commentCaptcha.val('');
			commentText.val('');
			self.commentTunix = data.tunix;
			self.commentTrash = data.trash;
		});
	});
}

RallyCommentsPage.prototype.onshow = function(input){
	var that = this;
	var node = this.node.find('#commentContainer');
	
	if (input.id) this.commentUid = input.id;
	
	node.empty();
	RUI.call('newsComments',input,function(data){
		that.commentTunix = data.tunix;
		that.commentTrash = data.trash;
		that.captchaImage.attr('src',RUI.getRootURL(data.captcha));
		if (data.comments.length > 0){
			var comments = data.comments
			for (c in comments){
				node.append(RUI.newsService.getCommentItem(comments[c]));
			}
		}
	});
}

RallyCommentsPage.prototype.addComment = function(name, text, captcha, ready){
	var self = this;
	RUI.call("addComment",{
		id:self.commentUid,
		name:name,
		text:text, 
		tunix:self.commentTunix,
		trash:self.commentTrash,
		captcha:captcha
	}, function(data){if (ready) ready(data);}, true);
}

RUI.addPage(new RallyCommentsPage());

/**
 * Some requisite poisoning of the google maps api
 */
google.maps.LatLng.prototype.kmTo = function(a){
    var e = Math, ra = e.PI/180;
    var b = this.lat() * ra, c = a.lat() * ra, d = b - c;
    var g = this.lng() * ra - a.lng() * ra;
    var f = 2 * e.asin(e.sqrt(e.pow(e.sin(d/2), 2) + e.cos(b) * e.cos(c) * e.pow(e.sin(g/2), 2)));
    return f * 6378.137;
}

google.maps.Polyline.prototype.inKm = function(n){
    var a = this.getPath(n), len = a.getLength(), dist = 0;
    for(var i=0; i<len-1; i++){
      dist += a.getAt(i).kmTo(a.getAt(i+1));
    }
    return dist;
} 

/**
 * Map page module for RallyUI
 */
function RallyMapPage(){
	if (!(this instanceof arguments.callee)) throw new Error("Constructor called as a function");
	this.name = 'Map';
};

RallyMapPage.prototype = new RallyUIPage({});

/**
 * The google map object for greater good.
 */
RallyMapPage.prototype.map;

/**
 * Currently displayed map object
 */
RallyMapPage.prototype.track = undefined;

/**
 * Title element for display of current track name 
 */
RallyMapPage.prototype.title;

/**
 * Location marker handle
 */
RallyMapPage.prototype.positionMarker = undefined;

/**
 * Initializes the map and listeners.
 */
RallyMapPage.prototype.initialize = function() {
  var self = this;
  
  this.node = $('#map');
  this.onresize();
  this.title =  $('#trackTitle');
  this.parent = "Maps";
  
  var map = this.map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(58.381918,26.727619),
    zoom: 6,
    zoomControl:RUI.isAndroid?true:undefined,
    mapTypeId: 'terrain'
  });
  
  var dot = this.dot = {
          url: 'img/red-dot.png',
          size: new google.maps.Size(9, 9),
          origin: new google.maps.Point(0,0),
          anchor: new google.maps.Point(5, 5)
  };
  
  var startIcon = this.startIcon =  new StyledIcon(
		  StyledIconTypes.BUBBLE,
		  {
			  color:"ffffff",
			  fore:'cd2428',
			  text:"START"
		  }
  );
   
  var finishIcon = this.finishIcon = new StyledIcon(
		StyledIconTypes.BUBBLE,
		{
			color:"ffffff",
			fore:'cd2428',
			text:"FINISH"
		}
  );
  
  var trackControl = this.trackControl = document.createElement('div');
  
  trackControl.setAttribute('class','trackControl');
  trackControl.innerHTML = "<p id='trackName'>SS4</p><p id='trackDistance'>9,1km</p>";
  map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(trackControl);
  
}

RallyMapPage.prototype.onresize = function(){
	console.log('map onresize');
	var that = this;
	setTimeout(function(){
		if(RUI.isIOS) that.node.css({position:'fixed'});
		if(that.map) google.maps.event.trigger(that.map, "resize");	
	},10);
}

RallyMapPage.prototype.onshow = function(options){
	var geolocate = options.geolocate;
	var track = options.track;
	if(this.map && track){
		
		if(this.track){
			for (object in this.track){
				this.track[object].setMap(null);
			}
		}
		
		this.track = [];
		
		RUI.showTicker();
		
		var that = this;
		var trackName = track.name
		var vertices = track.vertices;
		var map = this.map;
		var endIndex = vertices.length-1;
		var startLabel = "Start";
		var endLabel = "Finish";
		
	    if(trackName.length>7)
	    {
	    	trackName = trackName.substring(0,6) + "...";
	    }
	    $('#pageTitle').html(trackName);
		this.title.html(trackName);
		$('#trackName').html(trackName);
		

		var bounds = this.getPathBounds(vertices);
		
		if(endIndex==0){
			var startLabel = track.name;
			var endLabel = "";

			var styleIcon = new StyledIcon(
				StyledIconTypes.BUBBLE,
				{
					color:"ffffff",
					text: startLabel,
				}
			);
			
			
			var startMarker = new StyledMarker({
				styleIcon:  styleIcon,
				position: vertices[0],
				map:map,
			});
		
			$('#trackDistance').html('');
			
			this.track.push(startMarker);
		}else{
			var path = new google.maps.Polyline({
				 path: vertices,
				 strokeColor: '#cd2428',
				 strokeOpacity: 1.0,
				 strokeWeight: 2
			});
			this.track.push(path);
			
	        $('#trackDistance').html(path.inKm().toFixed(1)+" km");
			path.setMap(this.map);

			var startMarker = new StyledMarker({
				styleIcon:this.startIcon,
				position:vertices[0],
				map:this.map,
			});
			
			var finishMarker = new StyledMarker({
				styleIcon:  this.finishIcon,
				position: vertices[endIndex],
				map:this.map,
			});
			this.track.push(startMarker);
			this.track.push(finishMarker);
		}
	
		setTimeout(function(){
			if(RUI.isIOS) that.node.css({position:'fixed'});
			google.maps.event.trigger(that.map, "resize");
		    
			 
			if(geolocate){
				console.log('geolocation enabled');
				that.positionMarker =  new GeolocationMarker();
				
				var positionOptions = {
				  	maximumAge: 3000, 
				  	timeout: 5000, 
				  	enableHighAccuracy: true 
				};
				
				that.positionMarker.setPositionOptions(positionOptions);
				that.positionMarker.setMap(that.map);
				
				navigator.geolocation.getCurrentPosition(
					function(pos){
						pos = pos.coords;
						
					    // a rather weird way to clone a LatLngBounds object, but $.extend fails here 0_o 
						var zoombounds = new google.maps.LatLngBounds();
						zoombounds.union(bounds); 
    
				    	var userpos = new google.maps.LatLng(pos.latitude,pos.longitude);
				    	zoombounds.extend(userpos);
				    	
						console.log('geolocation success - showing bounds: <'+pos.longitude+','+pos.latitude+'>');
					    
						that.map.fitBounds(zoombounds);
						RUI.hideTicker();
						delete zoombounds;						
					}, 
					function(err){
						var type = [];
						
						type[err.PERMISSION_DENIED] = "PERMISSION_DENIED";
						type[err.POSITION_UNAVAILABLE] = "POSITION_UNAVAILABLE";
						type[err.TIMEOUT] = "TIMEOUT";
						
						console.log('geolocation failure - :'+type[err.code]+":"+err.message+' - showing normal bounds');
						that.map.fitBounds(bounds);
						RUI.hideTicker();
					}, 
					positionOptions
                );
			} else {
				console.log('geolocation disabled - showing normal bounds');
				that.map.fitBounds(bounds);
				RUI.hideTicker();
			}
		});
	}
}

RallyMapPage.prototype.onhide = function(){
	if(this.positionMarker){
		this.positionMarker.setMap(null);
	}
}

RallyMapPage.prototype.getPathBounds = function(path){
	var bounds = new google.maps.LatLngBounds();
	for (var i = 0; i < path.length; i++) {
	    bounds.extend(path[i]);
	}
	return bounds;
}

RallyMapPage.prototype.startPositionWatch = function(interval, callback){
	if(!this.positionWatch){
		console.log('starting position watch');
	}else{
		this.stopPositionWatch();	
	}
	var self = this;
	
	self.positionWatch = navigator.geolocation.watchPosition(
		function(position){
	    	self.position = position;
	    	callback(position);
	    },
	    function(e){
	    	console.error(e);
	    }, 
	    {  	maximumAge: 3000, timeout: 5000, enableHighAccuracy: true 
	    }
	);
}

RallyMapPage.prototype.stopPositionWatch = function(){
	if(this.positionWatch){
		console.log('stopping watch '+this.positionWatch);
		navigator.geolocation.clearWatch(this.positionWatch);
		this.positionWatch = null;
	}
}

RallyMapPage.prototype.adjustPositionMarker = function(){
	if(this.position){
		position = this.position.coords;
		this.positionMarker.setPosition(new google.maps.LatLng(position.latitude,position.longitude));
		this.positionMarker.setVisible(true);
	}else{
		this.positionMarker.setVisible(false);
	}
}

RUI.addPage(new RallyMapPage());


/**
 * Main page module for RallyUI
 */
function RallyTimetablePage() {
	if (!(this instanceof arguments.callee))
		throw new Error("Constructor called as a function");
	this.name = 'Timetable';
};

RallyTimetablePage.prototype = new RallyUIPage({});

/**
 * Initializes main menu listeners.
 */
RallyTimetablePage.prototype.initialize = function() {
	var self = this;
	this.node = $('#commonList');
	this.subheader = false;
	this.parent = "Main";
}

RallyTimetablePage.prototype.onshow = function() {
	var that = this;
	var node = this.node;

	node.empty();

	RUI.call('timetable', {}, function(data) {
		var html = "";
        var timetables = data.timetable;
             
		for (i in timetables) {
			html += "<div class='itemTitle'>" + timetables[i].title + "</div>";
             for(j in timetables[i].data)
             {
                html += "<div class='item'>";
                html += "<div class='itemLeft'>" + timetables[i].data[j].stage + "</div>";
                html += "<div class='itemCenter'>" + timetables[i].data[j].name + "</div>";
                html += "<div class='itemRight'>" + (timetables[i].data[j].distance?(timetables[i].data[j].distance):'') + "</div>";
                html += "<div class='itemRight'>" + (timetables[i].data[j].time?(timetables[i].data[j].time):'') + "</div>";
                html += "</div>";
             }
		}
		node.html(html);
	});
}

RallyTimetablePage.prototype.onhide = function() {
	RUI.hideMenu();
}

RUI.addPage(new RallyTimetablePage());


function RallyUI(){
	if (!(this instanceof arguments.callee)) throw new Error("Constructor called as a function");
}

RallyUI.prototype.pages = {};
RallyUI.prototype.orientationChange = function(){}
RallyUI.prototype.firstPage = "";
RallyUI.prototype.currentPage = "";
RallyUI.prototype.touchy = 	("ontouchstart" in document.documentElement || 'ontouchstart' in window);
RallyUI.prototype.backArrow;
RallyUI.prototype.pageTitle;
RallyUI.prototype.navBar;
RallyUI.prototype.dimensions = {x:window.innerWidth, y:window.innerHeight};
RallyUI.prototype.locale = null;
RallyUI.prototype.overlay;
RallyUI.prototype.showingMenu = false;
RallyUI.prototype.fontSize = 16;

var webMode = (location.protocol == 'http:' || location.protocol == 'https:') && location.host;

RallyUI.prototype.webMode = webMode;
RallyUI.prototype.host = 'http://www.auto24.ee/';

if (webMode) {
	RallyUI.prototype.scriptURL = location.protocol+'//' + location.host + '/mobile/services/rally_json.php';
} else {
	RallyUI.prototype.scriptURL = 'http://www.auto24.ee/mobile/services/rally_json.php';	
}

RallyUI.prototype.getRootURL = getRoot = function(link) {
	if(link.indexOf('/')==0){
		link=link.substring(1);
	}
	return this.host + link;
}

/**
 * Looks like this will call initialize() on each page
 */
RallyUI.prototype.initialize = function(){
	console.log('initializing RallyUI');
	
	localStorage.setItem('m.auto24.ee.app.isFromRally','true');

	var self = this;
	
	this.locale = new i18n();
	var i18n_data = localStorage.getItem("m.auto24.ee.app.i18n");
	if(i18n_data) this.locale.dictionary = $.parseJSON(i18n_data).data;
	
	this.isAndroid = (/Android/i).test(navigator.userAgent);
	this.isTablet = (/ipad|android 3/i).test(navigator.userAgent);
	this.isIOS7 = (/OS 7_/i).test(navigator.userAgent);
	this.isIOS6 = (/OS 6_/i).test(navigator.userAgent);
	this.isIOS5 = (/OS 5_/i).test(navigator.userAgent) || this.isIOS6;
	this.isIOS = (/ipad|ipod|iphone/i).test(navigator.userAgent);
	
	this.menuNotShown = this.isIOS;
	
	if(!(this.isIOS && this.webMode)){
		this.locale.loadLocale(get_default_locale());
		this.locale.localize();
	}
	
	if(this.isIOS7){
		$("#backToMain").css('top','1em');
	}
	
	$('.comment-input').each(function(){
		this.setAttribute('placeholder', self.locale.tr(this.getAttribute('placeholder')));
	});
	
	var resizeProxy = function(e){
		console.log(e.type);
		self.resize(e.type);
	}; 
	
	if(this.touchy){
		console.log('device is touchy; registering orientation change');
		window.onorientationchange = resizeProxy;
		window.onresize = resizeProxy;
	}else{
		console.log('device is not touchy; registering resize');
		window.onresize = resizeProxy;
	}
	
	this.pageTitle = $('#pageTitle');
	this.backArrow = $('#backArrow');
	this.navBar = $('#navbar');
	this.overlay = $('#overlayMask');
	
	this.overlay.click(function(){
		self.hideMenu();
	});
	
	this.backArrow.click(function(){
		self.back();
	});
	
	this.backArrow.css('cursor:pointer');
	
	this.newsService = new NewsService();
	
	console.log('registering deviceready');
	
	$(document).on('deviceready',function(){
		self.deviceReady();
	});
	
	if(!this.isAndroid){
		$('#backToMain').click(function(){
			self.quit();
		}).css({display:'block'});
		$('body').addClass('ios');
	}
	
	setTimeout(function(){
		self.initialSize(function(){
			console.log('initializing pages...');
			
			for (p in self.pages){
				console.log('initializing page '+p);
				self.pages[p].initialize();
			}
			
			self.showPage();
			setTimeout(function(){navigator.splashscreen.hide();});
		});
	}, 100);
}

RallyUI.prototype.initialSize = function(callback) {
	console.log('initialsize: firing');
	var self = this;
	
	var greaterAxis = Math.max(window.innerWidth, window.innerHeight);
	console.log('initialsize: greaterAxis = : ' + greaterAxis);

	// sometimes honeycomb, for instance, returns zero, probably due to some
	// race condition
	// here's one dirty haxaround for this.
	if (greaterAxis == 0) {
		console.log('initialsize: delay by 100');
		setTimeout(function(){self.initialSize(callback)}, 100);
		return;
	}

	self.fontSize = Math.max(16, Math.ceil(15 * (greaterAxis / 500) + 1));
	console.log('initialsize: body font size in px: ' + self.fontSize);

	$('body').css({
		fontSize : self.fontSize + 'px'
	});
	
	if(callback) callback();

	setTimeout(function(){
		//$('body').height(window.innerHeight);
		self.hideSplash();
	},200);
}

RallyUI.prototype.deviceReady = function(){
	var self = this;
	
	if (this.isAndroid) {
		document.addEventListener("pause", function(){
			console.log('paused');
		}, false);
		
		document.addEventListener("resume", function(){
			console.log('resumed');
		}, false);

		document.addEventListener('backbutton', function() {
			self.back();
			return false;
		});

		document.addEventListener('menubutton', function() {
			console.log('menubutton')
			return false;
		});
	}
	
	
	var uaid = "UA-8897065-11"; // v2 release uaid
	//uaid = 'UA-27181546-2'; // v2 debug uaid
	navigator.analytics.setTrackingId(uaid);
}

RallyUI.prototype.htmlEntities = function(string) {
	var div = document.createElement('div');
	var text = document.createTextNode(string);
	div.appendChild(text);
	text = div.innerHTML;
	delete div;
	return text;
}

RallyUI.prototype.call = function(action, params, callback, silent){
	console.log('calling '+this.scriptURL+'?action='+action);
	
	var self = this;
	
	if(!silent){
		self.showTicker();
	}
	
	$.ajax({
	  url: this.scriptURL+'?action='+action,
	  type:'post',
	  dataType: 'json',
	  cache:false,
	  data:params?params:{length:'required'},
	  success: function(data, status, jqxhr){
		  console.log('call to '+action+' succeeded');
		  callback(data, status, jqxhr);
		  if(!silent){
			self.hideTicker();
		  }
	  },
	  error: function(j,x,e){alert(x);alert(e)},
      xhrFields: {
   	    crossDomain: true,
        withCredentials: true
      },
	});
}

RallyUI.connectionError=function(jqxhr, textstatus, errorThrown){
	if (textstatus =='parsererror'){
		console.log('failed to parse server response');
		console.log(':::::::DUMPING RESPONSE:::::: ');
		console.log(jqxhr.responseText);
		console.log(':::::::END RESPONSE DUMP:::::  ');
		RUI.alert(RUI.locale.trUcf('Connection Error')+": "+RUI.locale.trUcf("Could not parse server's response")+"!");
	}else{
		console.log('failed to fetch url due to '+textstatus);
		RUI.alert(RUI.locale.trUcf('Connection Error')+": "+RUI.locale.trUcf("Failed to retrieve data ("+textstatus+'): '+errorThrown)+"!");	
	}
}

RallyUI.prototype.alert = function(message){
	message = this.locale.tr(message);
	if(this.webMode){
		alert(message);
	}else{
		navigator.notification.alert(message,null,"Auto24");
	}
}

RallyUI.prototype.confirm = function(message, callback, buttons){
	message = this.locale.tr(message);
	if(this.webMode){
		if(callback) {callback(confirm(message)?1:2)};
	}else{
		for(button in buttons){
			buttons[button] = this.locale.tr(buttons[button]);
		}
		navigator.notification.confirm(message, callback,"Auto24", buttons);
	}
}



RallyUI.prototype.addPage = function(page){
	var name = page.name;
	this.pages[name] = page;
	if(!this.firstPage){
		this.firstPage = name;
	}
}

RallyUI.prototype.getCurrentPage = function(){
	var name = this.currentPage?this.currentPage:this.firstPage;
	return this.pages[name];
}

RallyUI.prototype.quit = function(){
	$('body').hide();
	navigator.splashscreen.show();
	window.location = "../index.html?splash";
}

RallyUI.prototype.back = function(){
	if(this.currentPage){
		if(this.inGallery){
			this.getCurrentPage().gallery.hide();
		}else{
			var parent = this.pages[this.currentPage].parent 
			if(parent){
				console.log('parent of '+this.currentPage+' is '+parent);
				this.showPage(parent, {backnav:true});
			}else{
				this.quit();
			}
		}
	}else{
		this.quit();
	}
}

RallyUI.prototype.showPage = function(pagename, options){
	var self = this;
	
	if(!pagename) pagename = this.firstPage;
	
	this.hideMenu();
	
	var newPage = this.pages[pagename];
	var curPage = this.pages[this.currentPage];
	
	if(curPage) console.log(curPage);
	
	if(!newPage){
		pagename = this.firstPage;
		newPage = this.pages[pagename];
		
		console.log('page not found: showing first: '+pagename)
	}

	this.pageTitle.html(this.locale.tr(newPage.name).toUpperCase());
	
	if (!!curPage) {
		curPage.hide();
	}
	// timeout works to prevent first display of .split to fail on android 2.2
	setTimeout(function(){ 
		self.navBar.toggleClass('split',!!newPage.subheader);
		self.navBar.toggleClass('expanded',!!newPage.parent);
	},1);
	
	this.currentPage = pagename;
	newPage.show(options);
	
	if (navigator.analytics) {
		var success = function(){console.log('analytics: appview submission succesful')};
		var error = function(err){console.log('analytics: appview submission failed: '+err)}; 
		navigator.analytics.sendAppView('rally:'+pagename,success,error); 
	}
	
	scrollTo(0, 0);
}

RallyUI.prototype.changeStyle = function(rule, properties) {
	var ss = document.styleSheets[0];
	var rules = ss.cssRules || ss.rules;
	var changedRule = null;
	for ( var i = 0; i < rules.length; i++) {
		var irule = rules[i];
		if (irule.selectorText.indexOf(rule) >= 0) {
			changedRule = irule;
			break;
		}
	}
	if (changedRule !== null) {
		for ( var key in properties) {
			changedRule.style[key] = properties[key];
		}
	}
}

RallyUI.prototype.resize = function (type) {
	console.log('RUI '+type+' to '+window.innerWidth+'x'+window.innerHeight);
	
	
	if(this.isAndroid && !this.initialResize && this.getCurrentPage().name == "Main"){
		this.initialResize = true;
		this.initialSize();
	}
	
	
	var himc = $('#headerImgContainer');
	himc.css({width:'auto',border:'none'});
	
	
	var w = window.innerWidth;
	
    $('#header').width(w);
    $('#navBar').width(w);
    $('.rallyPage').width(w);
    
    //himc.width(w);
	
	if(type == 'orientationchange'){
		$('body').css('min-height',window.innerHeight);
	}
	
	this.dimensions = {x:window.innerWidth, y:window.innerHeight};
	
	var pages = this.pages;
	if(pages){
		var curPage = pages[this.currentPage];
		if(curPage){
			console.log('passing to page onresize');
			curPage.onresize();
		}else{
			console.log('current page not set! withhold onresize passthrough!');
		}
	}else{
		console.log('no pages found to pass resize to!')
	}
}


RallyUI.prototype.toggleMenu = function(type){
	if(this.menuNotShown){
		this.showMenu(type);
	}else if (this.showingMenu){
		this.hideMenu();
	}
}

RallyUI.prototype.hideMenu = function(){
	if(this.showingMenu){
		var self = this;
		this.overlay.css({opacity:0});
		
		setTimeout(function(){
			self.overlay.css({zIndex:-1,display:'none'});
			self.getCurrentPage().onmenuhide();
			self.showingMenu = false;
			self.menuNotShown = true;
		},250);
	}
}

RallyUI.prototype.showMenu = function(type){
	if(!type) type = "resultsMenu";
	
	this.overlay.css({'display':'block',zIndex:1000});
	var that = this;
	
	this.showingMenu = true;
	
	this.overlay.find('.roundedMenu').hide();
	this.overlay.find('#'+type).show();
	
	this.menuNotShown = false;
	
	setTimeout(function(){
		that.overlay.css({opacity:1});
	});
	
}

RallyUI.prototype.hideSplash = function(){
	$('#splash').css({opacity:0});
	setTimeout(function(){
		$('#splash').hide();
	},250);
}

RallyUI.prototype.showSplash = function(){
	$('#splash').show();
	setTimeout(function(){
		$('#splash').css({opacity:1});	
	});
}

RallyUI.prototype.showTicker = function(){
	$('#ticker').css({'display':'block',zIndex:1000});
	setTimeout(function(){
		$('#ticker').css({opacity:0.4});
	});
}

RallyUI.prototype.hideTicker = function(){
	$('#ticker').css({opacity:0});
	setTimeout(function(){
		$('#ticker').css('display','none');
	},250);
}

var RUI = new RallyUI();

$(document).ready(function(){
	RUI.initialize();
});

/**
 * Main page module for RallyUI
 */
function RallyRetiredPage() {
	if (!(this instanceof arguments.callee))
		throw new Error("Constructor called as a function");
	this.name = 'Retired';
};

RallyRetiredPage.prototype = new RallyUIPage({});

/**
 * Initializes main menu listeners.
 */
RallyRetiredPage.prototype.initialize = function() {
	var self = this;
	this.node = $('#commonList');
	this.subheader = false;
	this.parent = "Main";
}

RallyRetiredPage.prototype.onshow = function() {
	var that = this;
	var node = this.node;
    
	node.empty();

	RUI.call('retired', {}, function(data) {
		var html = "";
        var retires = data;
             
		for (i in retires) {

                html += "<div class='item'>";
                html += "<div class='itemLeft'>" + retires[i].number + "</div>";
                html += "<div class='itemCenter'><div class='team_holder'>" + retires[i].team + "</div><div class='vehicle_holder'>"+retires[i].vehicle+"</div></div>";
                html += "<div class='itemReason'>" + retires[i].reason +"</div>";
                html += "</div>";
		}
		node.html(html);
	});
}

RallyRetiredPage.prototype.onhide = function() {
	RUI.hideMenu();
}

RUI.addPage(new RallyRetiredPage());


var countries = {"AND":"AD","ARE":"AE","AFG":"AF","ATG":"AG","AIA":"AI","ALB":"AL","ARM":"AM","AGO":"AO","ATA":"AQ","ARG":"AR","ASM":"AS","AUT":"AT","AUS":"AU","ABW":"AW","ALA":"AX","AZE":"AZ","BIH":"BA","BRB":"BB","BGD":"BD","BEL":"BE","BFA":"BF","BGR":"BG","BHR":"BH","BDI":"BI","BEN":"BJ","BLM":"BL","BMU":"BM","BRN":"BN","BOL":"BO","BES":"BQ","BRA":"BR","BHS":"BS","BTN":"BT","BVT":"BV","BWA":"BW","BLR":"BY","BLZ":"BZ","CAN":"CA","CCK":"CC","COD":"CD","CAF":"CF","COG":"CG","CHE":"CH","CIV":"CI","COK":"CK","CHL":"CL","CMR":"CM","CHN":"CN","COL":"CO","CRI":"CR","CUB":"CU","CPV":"CV","CUW":"CW","CXR":"CX","CYP":"CY","CZE":"CZ","DEU":"DE","DJI":"DJ","DNK":"DK","DMA":"DM","DOM":"DO","DZA":"DZ","ECU":"EC","EST":"EE","EGY":"EG","ESH":"EH","ERI":"ER","ESP":"ES","ETH":"ET","FIN":"FI","FJI":"FJ","FLK":"FK","FSM":"FM","FRO":"FO","FRA":"FR","GAB":"GA","GBR":"GB","GRD":"GD","GEO":"GE","GUF":"GF","GGY":"GG","GHA":"GH","GIB":"GI","GRL":"GL","GMB":"GM","GIN":"GN","GLP":"GP","GNQ":"GQ","GRC":"GR","SGS":"GS","GTM":"GT","GUM":"GU","GNB":"GW","GUY":"GY","HKG":"HK","HMD":"HM","HND":"HN","HRV":"HR","HTI":"HT","HUN":"HU","IDN":"ID","IRL":"IE","ISR":"IL","IMN":"IM","IND":"IN","IOT":"IO","IRQ":"IQ","IRN":"IR","ISL":"IS","ITA":"IT","JEY":"JE","JAM":"JM","JOR":"JO","JPN":"JP","KEN":"KE","KGZ":"KG","KHM":"KH","KIR":"KI","COM":"KM","KNA":"KN","PRK":"KP","KOR":"KR","XKX":"XK","KWT":"KW","CYM":"KY","KAZ":"KZ","LAO":"LA","LBN":"LB","LCA":"LC","LIE":"LI","LKA":"LK","LBR":"LR","LSO":"LS","LAT":"LV","LUX":"LU","LVA":"LV","LIT":"LT","LBY":"LY","MAR":"MA","MCO":"MC","MDA":"MD","MNE":"ME","MAF":"MF","MDG":"MG","MHL":"MH","MKD":"MK","MLI":"ML","MMR":"MM","MNG":"MN","MAC":"MO","MNP":"MP","MTQ":"MQ","MRT":"MR","MSR":"MS","MLT":"MT","MUS":"MU","MDV":"MV","MWI":"MW","MEX":"MX","MYS":"MY","MOZ":"MZ","NAM":"NA","NCL":"NC","NER":"NE","NFK":"NF","NGA":"NG","NIC":"NI","NLD":"NL","NOR":"NO","NPL":"NP","NRU":"NR","NIU":"NU","NZL":"NZ","OMN":"OM","PAN":"PA","PER":"PE","PYF":"PF","PNG":"PG","PHL":"PH","PAK":"PK","POL":"PL","SPM":"PM","PCN":"PN","PRI":"PR","PSE":"PS","PRT":"PT","PLW":"PW","PRY":"PY","QAT":"QA","REU":"RE","ROU":"RO","SRB":"RS","RUS":"RU","RWA":"RW","SAU":"SA","SLB":"SB","SYC":"SC","SDN":"SD","SSD":"SS","SWE":"SE","SGP":"SG","SHN":"SH","SVN":"SI","SJM":"SJ","SVK":"SK","SLE":"SL","SMR":"SM","SEN":"SN","SOM":"SO","SUR":"SR","STP":"ST","SLV":"SV","SXM":"SX","SYR":"SY","SWZ":"SZ","TCA":"TC","TCD":"TD","ATF":"TF","TGO":"TG","THA":"TH","TJK":"TJ","TKL":"TK","TLS":"TL","TKM":"TM","TUN":"TN","TON":"TO","TUR":"TR","TTO":"TT","TUV":"TV","TWN":"TW","TZA":"TZ","UKR":"UA","UGA":"UG","UMI":"UM","USA":"US","URY":"UY","UZB":"UZ","VAT":"VA","VCT":"VC","VEN":"VE","VGB":"VG","VIR":"VI","VNM":"VN","VUT":"VU","WLF":"WF","WSM":"WS","YEM":"YE","MYT":"YT","ZAF":"ZA","ZMB":"ZM","ZWE":"ZW","SCG":"CS","ANT":"AN"}

i18n_bootstrap = {"status":true,"hash":"641e7a787d945bc7cbfca2304936c1b1","data":{"et":{"you have no outgoing messages.":"teil pole saadetud s\u00f5numeid","remove from favorites":"","yellow":"kollane","km":"km","video":"","__hash_invalidator":"tehhniline s\u00f5ne t\u00f5lgete h\u00e4shi uuendamiseks","add to favorites":"lisa lemmikuks","white":"valge","silver":"h\u00f5bedane","purple":"lilla","red":"punane","pink":"roosa","orange":"oran\u017e","dark red":"tumepunane","dark yellow":"tumekollane","golden":"kuldne","gray":"hall","green":"roheline","light beige":"helebee\u017e","light yellow":"helekollane","light purple":"helelilla","light red":"helepunane","light orange":"heleoran\u017e","light green":"heleroheline","light gray":"helehall","light blue":"helesinine","light brown":"helepruun","dark purple":"tumelilla","dark orange":"tumeoran\u017e","dark green":"tumeroheline","dark brown":"tumepruun","dark gray":"tumehall","dark blue":"tumesinine","black":"must","blue":"sinine","brown":"pruun","dark beige":"tumebee\u017e","beige":"bee\u017e","ready":"Valmis","password":"salas\u00f5na","register":"registreeru","logged in as":"Olete sisseloginud kui","login":"Kasutaja konto","logout":"V\u00e4lju","cancel":"Loobu","log in":"Logi sisse","username":"kasutajanimi","make, model":"Mark, mudel","up to":"kuni","select":"vali","clear all":"Puhasta k\u00f5ik","by year (descending)":"aasta kahanevalt ","quit":"jah","there are no saved vehicles to display":"\u00dchtegi s\u00f5idukit pole nimekirja lisatud","by price (descending)":"kallimad ette","by make":"margi j\u00e4rgi","by year (ascending)":"aasta kasvavalt","do you want to quit the application?":"Kas soovite lahkuda rakendusest?","by price (ascending)":"odavamad ette","front-wheel drive":"esivedu","rear-wheel drive":"tagavedu","four-wheel drive":"nelikvedu","diesel":"diisel","gas":"gaas","hybrid":"h\u00fcbriid","electric":"elekter","ethanol":"etanool","manual":"manuaal","automatic":"automaat","semi-automatic":"poolautomaat","petrol":"bensiin","cabrio":"kabriolett","coupe":"kupee","station wagon":"universaal","minivan":"mahtuniversaal","water vehicle":"vees\u00f5iduk","racing vehicle":"v\u00f5istluss\u00f5iduk","hatchback":"luukp\u00e4ra","sedan":"sedaan","special technics and other":"eritehnika ja muu","suv":"maastur","commercial vehicle":"kaubik","bus":"buss","truck":"veoauto","trailer":"haagis","mototechnics":"mototehnika","caravan":"haagissuvila","passenger car":"s\u00f5iduauto","bodytype":"keret\u00fc\u00fcp","make":"mark","model":"mudel","year":"aasta","fuel":"k\u00fctus","gearbox":"k\u00e4igukast","drive wheels":"vedav sild","price":"hind","bargain price":"soodushind","sort":"j\u00e4rjesta","any":"k\u00f5ik","from":"alates","to":"kuni","back":"tagasi","modify search":"muuda otsingut","see %n results":"Otsi (%n)","%n more":"veel %n","equipment":"varustus","other-information":"muu info","contact-information":"kontaktandmed","type":"liik","searchform":"otsi","incorrect username or password!":"Vale kasutajanimi v\u00f5i salas\u00f5na!","result":"tulemus","details":"andmed","location":"asukoht","could not parse server's response":"Serveri vastus ebakorrektne","failed to retrieve data":"Andmete p\u00e4rimine eba\u00f5nnestus","service book":"Hooldusraamat","connection error":"\u00dchenduse viga","exchange":"vahetus","not crashed":"mitte avariiline","vehicle exchange":"Vahetuse v\u00f5imalus","less options":"V\u00e4hem valikuid","age of ad":"Kuulutuse vanus","max mileage":"L\u00e4bis\u00f5idum. n\u00e4it kuni","color":"V\u00e4rvus","dealer":"M\u00fc\u00fcja","crashed":"avariiline","more options":"Rohkem valikuid","up to 2 days":"kuni 2 p\u00e4eva","up to 3 days":"kuni 3 p\u00e4eva","up to 7 days":"kuni 7 p\u00e4eva","http:\/\/www.auto24.ee\/":"http:\/\/www.auto24.ee\/","it's taking longer than expected.":"L\u00e4heb kauem kui arvata v\u00f5is..","kw":"kW","power":"V\u00f5imsus","up to 1 day":"kuni \u00fcks p\u00e4ev","this video cannot be viewed on your device.":"Seda videot ei saa vaadata teie seadmega.","name cannot be empty!":"Nimi on sisestamata!","comment cannot be empty!":"Kommentaar on sisestamata!","you did not fill a required field!":"Ebakorrektne kommentaar, puudub n\u00f5utud v\u00e4li","name":"Nimi","enter the security code:":"Sisesta kontrollkood","the entered security code is wrong!":"Sisestatud kontrollkood on vale!","your comment was blocked on suspicion of spam":"Teie kommentaar blokeeriti kuna sp\u00e4mmifilter pidas seda sp\u00e4mmiks","you must enter a security code!":"Kontrollkood on sisestamata!","no more comments":"Rohkem kommentaare pole","there are no comments to display":"Kommentaarid puuduvad","read comments":"Loe kommentaare","article":"Uudis","comments":"Kommentaarid","comment":"Kommentaar","add a comment":"Lisa kommentaar","no more results":"Rohkem tulemusi pole","loading...":"Laadimine...","there are no more news to display":"Rohkem uudiseid pole","load more":"Vaata veel","submit":"Saada","please narrow your search if you want notifications!":"Teavituse saamiseks t\u00e4psustage otsingut (tulemusi kuni 1000).","please specify a title for this search!":"Palun sisestage otsingu pealkiri!","please specify vehicle type!":"Palun sisestage s\u00f5iduki liik!","continue on web":"j\u00e4tka saidi peal","done":"valmis","next":"edasi","other":"muu","engine":"mootor","interior view":"seestvaade","rear view":"tagantvaade","front view":"eestvaade","phone":"Telefon","add photos":"Lisa pilte","advertise":"Kuuluta","other model":"muu mudel","model name":"mudeli nimi","edit ad":"Muuda kuulutus","adedit":"Muuda kuulutus","edit":"muuda","my ads":"Minu kuulutused","saved search":"salvestatud otsing","saved searches":"salvestatud otsingud","place an ad":"Lisa kuulutus","my favorites":"Minu lemmikud","my saved searches":"Minu salvestatud otsingud","your query returned no results":"Teie p\u00e4ring ei tagastanud \u00fchtegi tulemust","query":"P\u00e4ring","query result":"P\u00e4ringu tulemus","vehicle queries":"S\u00f5iduki p\u00e4ringud","no vehicles found":"\u00dchtegi s\u00f5idukit ei leitud","error while saving search!":"Viga otsingu salvestamisel!","search saved":"Otsing salvestatud","error while deleting search":"Viga otsingu kustutamisel","search deleted":"Otsing kustutatud","really delete?":"Kas t\u00f5esti kustutada?","notification email:":"E-posti adress teavituste jaoks:","notify about new ads":"Teavita uutest kuulutustest","search title:":"Otsingu nimi:","damages":"Liikluskahjud","vin or plate number:":"VIN v\u00f5i registrinumber:","insurance":"Kindlustus","registration":"Registriandmed","auction":"oksjon","select language":"vali keel","save search":"Salvesta otsing","remove favorite":"kustuta lemmik","add favorite":"lisa lemmik","language":"keel","my auto24":"minu auto24","news":"uudised","queries":"p\u00e4ringud","ad_instruction_text_post":"lehte peasaidil.","this":"see","technical specifications":"tehnilised andmed","other information":"muu info","search":"otsi","favorites":"lemmikud","dashboard":"avaleht","ad_instruction_text_pre":"Teie kuulutus salvestati Auto24 andmebaasi, kuid selle aktiveerimiseks tuleb Teil veel maksta kuulutuse ja teiste Teile vajalike teenuste eest. Selleks k\u00fclastage","no email specified by the seller!":"M\u00fc\u00fca ei sisestanud e-posti!","there are no more messages to display":"Rohkem s\u00f5numeid pole","do you want to delete this message?":"Kas te tahate kustutada selle s\u00f5numi?","view message":"S\u00f5num","invalid_email":"Sisestatud e-posti aadress on ebakorrektne","telephone":"Telefon","email":"E-post","ask extra info":"K\u00fcsi lisainfot","mail folders":"Postkast","outbox":"Saadetud","delete":"Kustuta","inbox":"Saabunud","write again":"Kirjuta veel","message content:":"S\u00f5numi tekst:","reply":"Vasta","characters remaining":"t\u00e4hem\u00e4rki","send message":"Saada s\u00f5num","maximum size of the message is %n characters.":"S\u00f5numi maksimaalne pikkus on %n t\u00e4hem\u00e4rki","mailfrom":"Saatja","mailto":"Saaja","date":"Kuup\u00e4ev","compose message":"Kirjuta s\u00f5num","mailbox":"postkast","model period":"mudeli p\u00f5lvkond","model trim":"mudeli varustustase","first registration":"esmane reg.","vat":"k\u00e4ibemaks","vat 0% (civilian or not a subject to vat)":"KM 0% (eraisik v\u00f5i mitte k\u00e4ibemaksukohuslane)","price includes vat 20%":"Hind sisaldab KM 20%","autocaravan":"autoelamu","agricultural machinery":"p\u00f5llumajandustehnika","construction machinery":"ehitustehnika","forest machinery":"metsatehnika","communal machinery":"kommunaaltehnika","please specify vehicle type first!":"palun esmalt sisestage s\u00f5iduki liik!","you have no saved searches":"teil pole salvestatud otsinguid","view":"vaata","hide":"peida","restore":"taasta","site link":"saidi link","really hide?":"kas soovite ajutiselt peita kuulutust?","bodytype(in detail)":"Keret\u00fc\u00fcp(t\u00e4psustus)","ad inserted":"kuulutus lisatud","to site":"auto24.ee","to list":"listile","order services":"veel","stats":"statistika","stop":"l\u00f5peta kuulutus","views":"vaatamised","ad_unhide_message":"Teie kuulutus on n\u00fc\u00fcd otsinguga leitav. Kuulutuse detailvaates on Teie kontaktandmed taas n\u00e4htavad. ","too_many_search_results":"Teavituse saamiseks t\u00e4psustage otsingut (tulemusi kuni 1000).","order_services_notice":"Teiste toimingute tegemiseks (tellimuste lisamine \/ muutmine, oksjoni  sisestamine jne.) tuleb minna auto24.ee veebilehele.","country_input":"riik","location_input":"linn v\u00f5i maakond","mileage":"L\u00e4bis\u00f5idum. n\u00e4it (km)","last 30 days":"Viimase 30 p\u00e4eva vaatamise statistika.","petrol + gas (lpg)":"bensiin + gaas (LPG\/vedelgaas)","petrol + gas (cng)":"bensiin + gaas (CNG\/surugaas)","gas (LPG)":"gaas (LPG\/vedelgaas)","gas (CNG)":"gaas (CNG\/surugaas)","maps":"kaardid","entries":"stardinimekiri","results":"tulemused","results \/ timetable":"tulemused","newsdetail":"Uudis","abs after":"ABS peale","track results":"rada tulemused","class":"klass","all":"k\u00f5ik","information_about_stage":"Kiiruskatse info","timetable":"kiiruskatsete ajatabel","schedule":"programm","penalties":"karistused","retired":"katkestajad","caravan and autocaravan":"haagissuvila ja autoelamu","passenger and suv":"s\u00f5iduauto ja maastur","security code":"kontrollkood","you":"teie","do you want to display your own location on map?":"kas te tahate n\u00e4ha kaardil enda asukohta?","group":"Group","no":"ei","yes":"jah","really discontinue?":"Kas t\u00f5esti l\u00f5petada?","orders\/services":"Tellimused \/ Teenused","my ad":"minu kuulutus","do you want to change or delete this image?":"kas vahetada v\u00f5i kustutada pilti?","change":"vaheta","select picture source":"valige pildi allikas","camera":"kaamera","picture library":"salvestatud pildid","ad no longer exists":"kuulutus ei ole aktiivne","remember":"m\u00e4leta mind","saved vehicle":"salvestatud s\u00f5iduk","saved vehicles":"salvestatud s\u00f5idukid","delete saved vehicle":"kustuta salvestatud","save vehicle":"salvesta s\u00f5iduk","look up vehicle market price":"vaata s\u00f5iduki turuhinda","enter the vehicle's estonian registration number in the following field":"Sisesta s\u00f5iduauto Eesti registreerimism\u00e4rk","detailed query":"detailne p\u00e4ring","show telephone":"n\u00e4ita numbrit","no results found for":"tulemusi ei leitud","check a vehicle's market price":"Vaata s\u00f5iduki turuhinda","vehicle":"S\u00f5iduk","vehicle price":"S\u00f5iduki hind","ad no longer exists, delete?":"kuulutus ei ole aktiivne, kas kustutada?","market price":"Turuhind","vehicles in estonia":"","no vehicles were found on auto24.lv":"Netika atrasts neviens transportl\u012bdzeklis auto24.lv","http:\/\/www.auto24.lv\/":"","newer ads first":"uued eespool","older ads first":"vanad eespool","you have no incoming messages.":"teil pole sissetulevaid s\u00f5numeid","accept user agreement":"n\u00f5ustun kasutustingimustega","read":"loe","used vehicles":"kasutatud s\u00f5idukid","find yourself a suitable car":"otsi sobiv kasutatud s\u00f5iduk ","latest news":"uudised","fresh info on what's happening":"v\u00e4rsked uudised iga p\u00e4ev ","for managing your ads":"Postkast, kuulutuste lisamine jpm. ","all information about the event":"Programm, kiiruskatsete kaardid jpm. ","change your preferred language":"English, Eesti, Soumi, \u0420\u0443\u0441\u0441\u043a\u0438\u0439 ","warranty":"garantii","doors":"Uste arv","seats":"istekohti","display":"kuvamine","parking aid":"parkimisandurid","engine pre-heating":"mootori eelsoojendus","seat heating":"istmesoojendus","cruise control":"p\u00fcsikiiruse hoidja","xenon lights":"Xenon tuled","cd player":"CD m\u00e4ngija","traction control":"veoj\u00f5ukontroll","anti skidding":"k\u00fclglib. vas. seade","year from":"aasta al.","year to":"aasta kuni","price from":"hind al.","price to":"hind kuni","monthly payment to":"kuumakse kuni","transm.":"k\u00e4igukast","drivetrain":"vedav sild","sort by":"j\u00e4rjesta","newer first":"uued eespool","by price":"hinna j\u00e4rgi","by year":"aasta j\u00e4rgi","list":"n\u00e4ita","%1$s on page":"%1$s kaupa","climate control":"kliimaseade","new of the week":"n\u00e4dala uued","show photos":"n\u00e4ita pilte","selected by user":"kasutaja valitud","passenger car and suv":"s\u00f5iduauto ja maastur","motorcycle":"mootorratas","search choice":"otsingu valik","data":"andmed","power (kw)":"v\u00f5imsus (kW)","mileage (km)":"l\u00e4bis\u00f5idum\u00f5\u00f5diku n\u00e4it (km)","payload (kg)":"kandev\u00f5ime (kg)","luggage space (m\u00b3)":"kaubaruum (m\u00b3)","gross weight (kg)":"t\u00e4ismass (kg)","axle":"rattavalem","displacement (cm\u00b3)":"mootor (cm\u00b3)","unladen weight (kg)":"t\u00fchimass (kg)","length (mm)":"pikkus (mm)","width (mm)":"laius (mm)","beds":"magamiskohti","abs":"ABS","alarm":"signalisatsioon","immobilizer":"immobilisaator","central locking":"kesklukustus","power steering":"rooliv\u00f5imendi","leather upholstery":"nahkpolster","tow hitch":"veokonks","electric windows":"el. aknad","alloy wheels":"valuveljed","sunroof":"katuseluuk","navigation system":"nav. seade","tv":"TV","wc":"WC","refrigerator":"k\u00fclmik","intarder":"intarder","retarder":"retarder","taillift":"tagaluukt\u00f5stuk","adaptive suspension":"\u00f5hkvedrustus","tv antenna":"TV antenn","gas cooker":"gaasipliit","mileage to (km)":"odom. n\u00e4it kuni (km)","price includes vat":"hind sisaldab KM","price plus vat":"hinnale lisandub KM","vat 0%":"KM 0%","up to %1$d days":"kuni %1$d p\u00e4eva","superstruct.":"pealisehitus","currency":"valuuta","isothermal van":"isotermiline furgoon","refrigerator unit":"k\u00fclmutusseade","select all":"m\u00e4rgi k\u00f5ik","model specification":"muu mudel v\u00f5i t\u00e4psustus","all types":"k\u00f5ik liigid","technical data":"tehnilised andmed","make and model":"mark ja mudel","model generation":"mudeli p\u00f5lvkond","select multiple":"vali mitu","inspected":"tehn. kontrollitud","brought from":"toodud riigist","electrically heated windshield":"elektrilise soojendusega esiklaas","mirror heating":"peeglite soojendus","choose type here":"vali liik siit","racing seats":"sportistmed","electrically adj. seats":"elektriliselt reg. istmed","cruise control with monitoring the distance to vehicle in front":"eess\u00f5itjaga distantsi j\u00e4lgiv p\u00fcsikiiruse hoidja","keyless-go":"v\u00f5tmeta avamis- ja k\u00e4ivituss\u00fcsteem","closing aid for doors":"uste servosulgurid","rain sensor":"vihmasensor","hands free":"k\u00e4ed vabad s\u00fcsteem","steering wheel adjustment":"reguleeritav roolisammas","ventilated seats":"ventileeritavad istmed","adjustable suspension":"reguleeritav vedrustus","panorama glass roof":"panoraamkatus (klaasist)","parking camera":"parkimiskaamera","down folding back rest":"tagaistme seljatugi allaklapitav","start-stop system":"start-stopp s\u00fcsteem","disability equipment":"invavarustus","touring":"universaal","cabriolet":"kabriolett","pickup":"pikap","small commercial vehicle":"v\u00e4ikekaubik","rigid":"veok","saddle":"sadul","chassis":"\u0161assii","light trailer":"kerghaagis","semi-trailer":"poolhaagis","classical motorcycle":"klassikaline mootorratas","scooter":"jett","moped":"mopeed","bike":"bike","cruiser \/ chopper":"cruiser \/ chopper","motocross bike":"krossimootorratas","enduro \/ supermoto":"enduro \/ supermoto","trial":"traiel","ATV":"ATV","buggy":"bagi","moped car":"mopeedauto","snowmobile":"mootorsaan","trailer tent":"haagistelk","launch\/motorboat":"kaater\/mootorpaat","yacht":"jaht\/purjekas","waterscooter":"jett","select make, model":"vali mark, mudel","added":"Lisatud","please select vehicle body type!":"palun valige s\u00f5iduki keret\u00fc\u00fcp!","market price query":"Turuhinnap\u00e4ring","if you don't know your vehicle's worth":"kui sa ei tea oma s\u00f5iduki turuhinda","look up":"vaata","estonia":"Eesti","latvia":"L\u00e4ti","lithuania":"Leedu","germany":"Saksamaa","netherlands":"Holland","switzerland":"\u0160veits","belgium":"Belgia","denmark":"Taani","austria":"Austria","france":"Prantsusmaa","luxembourg":"Luksemburg","sweden":"Rootsi","czech republic":"T\u0161ehhi","italy":"Itaalia","hungary":"Ungari","united states of america":"Ameerika \u00dchendriigid","finland":"Soome","russia":"Venemaa","england":"Inglismaa","japan":"Jaapan","poland":"Poola","bulgaria":"Bulgaaria","greece":"Kreeka","ireland":"Iirimaa","cyprus":"K\u00fcpros","malta":"Malta","united kingdom":"Suurbritannia","portugal":"Portugal","romania":"Rumeenia","slovakia":"Slovakkia","slovenia":"Sloveenia","spain":"Hispaania","norway":"Norra","turkey":"T\u00fcrgi"},"ru":{"you have no outgoing messages.":"\u0443 \u0432\u0430\u0441 \u043d\u0435\u0442 \u0438\u0441\u0445\u043e\u0434\u044f\u0449\u0438\u0445 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0439","remove from favorites":"","yellow":"\u0436\u0451\u043b\u0442\u044b\u0439","km":"\u043a\u043c","video":"\u0412\u0418\u0414\u0415\u041e","__hash_invalidator":"\u0442\u0435\u0445\u043d\u0438\u0447\u0435\u0441\u043a\u0430\u044f \u0441\u0442\u0440\u043e\u043a\u0430 \u0434\u043b\u044f \u0438\u043d\u0432\u0430\u043b\u0438\u0434\u0430\u0446\u0438\u0438 \u0445\u044d\u0448\u0430 \u0441\u043b\u043e\u0432\u0430\u0440\u044f ","add to favorites":"","white":"\u0431\u0435\u043b\u044b\u0439","silver":"\u0441\u0435\u0440\u0435\u0431\u0440\u0438\u0441\u0442\u044b\u0439","purple":"\u0444\u0438\u043e\u043b\u0435\u0442\u043e\u0432\u044b\u0439","red":"\u043a\u0440\u0430\u0441\u043d\u044b\u0439","pink":"\u0440\u043e\u0437\u043e\u0432\u044b\u0439","orange":"\u043e\u0440\u0430\u043d\u0436\u0435\u0432\u044b\u0439","dark red":"\u0442\u0451\u043c\u043d\u043e-\u043a\u0440\u0430\u0441\u043d\u044b\u0439","dark yellow":"\u0442\u0451\u043c\u043d\u043e-\u0436\u0451\u043b\u0442\u044b\u0439","golden":"\u0437\u043e\u043b\u043e\u0442\u0438\u0441\u0442\u044b\u0439","gray":"\u0441\u0435\u0440\u044b\u0439","green":"\u0437\u0435\u043b\u0451\u043d\u044b\u0439","light beige":"\u0441\u0432\u0435\u0442\u043b\u043e-\u0431\u0435\u0436\u0435\u0432\u044b\u0439","light yellow":"\u0441\u0432\u0435\u0442\u043b\u043e-\u0436\u0451\u043b\u0442\u044b\u0439","light purple":"\u0441\u0432\u0435\u0442\u043b\u043e-\u0444\u0438\u043e\u043b\u0435\u0442\u043e\u0432\u044b\u0439","light red":"\u0441\u0432\u0435\u0442\u043b\u043e-\u043a\u0440\u0430\u0441\u043d\u044b\u0439","light orange":"\u0441\u0432\u0435\u0442\u043b\u043e-\u043e\u0440\u0430\u043d\u0436\u0435\u0432\u044b\u0439","light green":"\u0441\u0432\u0435\u0442\u043b\u043e-\u0437\u0435\u043b\u0451\u043d\u044b\u0439","light gray":"\u0441\u0432\u0435\u0442\u043b\u043e-\u0441\u0435\u0440\u044b\u0439","light blue":"\u0441\u0432\u0435\u0442\u043b\u043e-\u0441\u0438\u043d\u0438\u0439","light brown":"\u0441\u0432\u0435\u0442\u043b\u043e-\u043a\u043e\u0440\u0438\u0447\u043d\u0435\u0432\u044b\u0439","dark purple":"\u0442\u0451\u043c\u043d\u043e-\u0444\u0438\u043e\u043b\u0435\u0442\u043e\u0432\u044b\u0439","dark orange":"\u0442\u0451\u043c\u043d\u043e-\u043e\u0440\u0430\u043d\u0436\u0435\u0432\u044b\u0439","dark green":"\u0442\u0451\u043c\u043d\u043e-\u0437\u0435\u043b\u0451\u043d\u044b\u0439","dark brown":"\u0442\u0451\u043c\u043d\u043e-\u043a\u043e\u0440\u0438\u0447\u043d\u0435\u0432\u044b\u0439","dark gray":"\u0442\u0451\u043c\u043d\u043e-\u0441\u0435\u0440\u044b\u0439","dark blue":"\u0442\u0451\u043c\u043d\u043e-\u0441\u0438\u043d\u0438\u0439","black":"\u0447\u0451\u0440\u043d\u044b\u0439","blue":"\u0441\u0438\u043d\u0438\u0439","brown":"\u043a\u043e\u0440\u0438\u0447\u043d\u0435\u0432\u044b\u0439","dark beige":"\u0442\u0451\u043c\u043d\u043e-\u0431\u0435\u0436\u0435\u0432\u044b\u0439","beige":"\u0431\u0435\u0436\u0435\u0432\u044b\u0439","ready":"\u0413\u043e\u0442\u043e\u0432\u043e","password":"\u043f\u0430\u0440\u043e\u043b\u044c","register":"\u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c\u0441\u044f","logged in as":"\u0412\u044b \u0432\u043e\u0448\u043b\u0438 \u043a\u0430\u043a","login":"\u0423\u0447\u0451\u0442\u043d\u0430\u044f \u0437\u0430\u043f\u0438\u0441\u044c","logout":"\u0412\u044b\u0439\u0442\u0438","cancel":"\u041e\u0442\u043c\u0435\u043d\u0430","log in":"\u0412\u043e\u0439\u0442\u0438","username":"\u0438\u043c\u044f \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f","make, model":"\u041c\u0430\u0440\u043a\u0430, \u043c\u043e\u0434\u0435\u043b\u044c","up to":"\u0434\u043e","select":"\u0412\u044b\u0431\u0440\u0430\u0442\u044c","clear all":"\u041e\u0447\u0438\u0441\u0442\u0438\u0442\u044c \u0432\u0441\u0435","by year (descending)":"\u0433\u043e\u0434 \u043f\u043e \u0443\u0431\u044b\u0432\u0430\u043d\u0438\u044e","quit":"\u0432\u044b\u0439\u0442\u0438","there are no saved vehicles to display":"\u041d\u0435\u0442 \u043d\u0438 \u043e\u0434\u043d\u043e\u0433\u043e \u0441\u043e\u0445\u0440\u0430\u043d\u0451\u043d\u043d\u043e\u0433\u043e \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u044f","by price (descending)":"\u0434\u043e\u0440\u043e\u0433\u0438\u0435 \u0432\u0432\u0435\u0440\u0445","by make":"\u043f\u043e \u043c\u0430\u0440\u043a\u0435","by year (ascending)":"\u0433\u043e\u0434 \u043f\u043e \u0432\u043e\u0437\u0440\u0430\u0441\u0442\u0430\u043d\u0438\u044e","do you want to quit the application?":"\u0425\u043e\u0442\u0438\u0442\u0435 \u043b\u0438 \u0432\u044b \u0432\u044b\u0439\u0442\u0438 \u0438\u0437 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f?","by price (ascending)":"\u0434\u0435\u0448\u0435\u0432\u044b\u0435 \u0432\u0432\u0435\u0440\u0445","front-wheel drive":"\u043f\u0435\u0440\u0435\u0434\u043d\u0438\u0439 \u043f\u0440\u0438\u0432\u043e\u0434","rear-wheel drive":"\u0437\u0430\u0434\u043d\u0438\u0439 \u043f\u0440\u0438\u0432\u043e\u0434","four-wheel drive":"4x4","diesel":"\u0434\u0438\u0437\u0435\u043b\u044c","gas":"\u0433\u0430\u0437","hybrid":"\u0433\u0438\u0431\u0440\u0438\u0434","electric":"\u044d\u043b\u0435\u043a\u0442\u0440\u0438\u0447\u0435\u0441\u0442\u0432\u043e","ethanol":"\u044d\u0442\u0430\u043d\u043e\u043b","manual":"\u043c\u0435\u0445\u0430\u043d\u0438\u0447\u0435\u0441\u043a\u0430\u044f","automatic":"\u0430\u0432\u0442\u043e\u043c\u0430\u0442","semi-automatic":"\u043f\u043e\u043b\u0443\u0430\u0432\u0442\u043e\u043c\u0430\u0442","petrol":"\u0431\u0435\u043d\u0437\u0438\u043d","cabrio":"\u043a\u0430\u0431\u0440\u0438\u043e\u043b\u0435\u0442","coupe":"\u043a\u0443\u043f\u0435","station wagon":"\u0443\u043d\u0438\u0432\u0435\u0440\u0441\u0430\u043b","minivan":"\u043e\u0431\u044a\u0435\u043c\u043d\u044b\u0439 \u0443\u043d\u0438\u0432\u0435\u0440\u0441\u0430\u043b","water vehicle":"\u043d\u0430\u0434\u0432\u043e\u0434\u043d\u044b\u0439 \u0442\u0440\u0430\u043d\u0441\u043f\u043e\u0440\u0442","racing vehicle":"\u0433\u043e\u043d\u043e\u0447\u043d\u044b\u0435 \u043c\u0430\u0448\u0438\u043d\u044b","hatchback":"\u0445\u0435\u0442\u0447\u0431\u044d\u043a","sedan":"\u0441\u0435\u0434\u0430\u043d","special technics and other":"\u0441\u043f\u0435\u0446\u0438\u0430\u043b\u044c\u043d\u0430\u044f \u0442\u0435\u0445\u043d\u0438\u043a\u0430 \u0438 \u0434\u0440\u0443\u0433\u043e\u0435","suv":"\u0432\u043d\u0435\u0434\u043e\u0440\u043e\u0436\u043d\u0438\u043a","commercial vehicle":"\u0433\u0440\u0443\u0437\u043e\u0432\u043e\u0439 \u043c\u0438\u043a\u0440\u043e\u0430\u0432\u0442\u043e\u0431\u0443\u0441","bus":"\u0430\u0432\u0442\u043e\u0431\u0443\u0441","truck":"\u0433\u0440\u0443\u0437\u043e\u0432\u043e\u0439 \u0430\u0432\u0442\u043e\u043c\u043e\u0431\u0438\u043b\u044c","trailer":"\u043f\u0440\u0438\u0446\u0435\u043f","mototechnics":"\u043c\u043e\u0442\u043e\u0442\u0435\u0445\u043d\u0438\u043a\u0430","caravan":"\u0434\u0430\u0447\u0430-\u043f\u0440\u0438\u0446\u0435\u043f","passenger car":"\u043b\u0435\u0433\u043a\u043e\u0432\u043e\u0439 \u0430\u0432\u0442\u043e\u043c\u043e\u0431\u0438\u043b\u044c","bodytype":"\u0442\u0438\u043f \u043a\u0443\u0437\u043e\u0432\u0430","make":"\u043c\u0430\u0440\u043a\u0430","model":"\u043c\u043e\u0434\u0435\u043b\u044c","year":"\u0433\u043e\u0434","fuel":"\u0442\u043e\u043f\u043b\u0438\u0432\u043e","gearbox":"\u041a\u041f\u041f","drive wheels":"\u0432\u0435\u0434\u0443\u0449\u0438\u0439 \u043c\u043e\u0441\u0442","price":"\u0446\u0435\u043d\u0430","bargain price":"\u0446\u0435\u043d\u0430 \u0441\u043e \u0441\u043a\u0438\u0434\u043a\u043e\u0439","sort":"\u0441\u043e\u0440\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c","any":"\u0432\u0441\u0435","from":"\u043e\u0442","to":"\u0434\u043e","back":"\u043d\u0430\u0437\u0430\u0434","modify search":"\u0438\u0437\u043c\u0435\u043d\u0438\u0442\u044c \u043f\u043e\u0438\u0441\u043a","see %n results":"\u0438\u0441\u043a\u0430\u0442\u044c (%n)","%n more":"\u0435\u0449\u0451 %n","equipment":"\u043e\u0431\u043e\u0440\u0443\u0434\u043e\u0432\u0430\u043d\u0438\u0435","other-information":"\u0434\u0440\u0443\u0433\u0430\u044f \u0438\u043d\u0444\u043e","contact-information":"\u043a\u043e\u043d\u0442\u0430\u043a\u0442\u044b","type":"\u0442\u0438\u043f","searchform":"\u0438\u0441\u043a\u0430\u0442\u044c","incorrect username or password!":"\u041d\u0435\u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u043e\u0435 \u0438\u043c\u044f \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f \u0438\u043b\u0438 \u043f\u0430\u0440\u043e\u043b\u044c!","result":"\u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442","details":"\u0434\u0435\u0442\u0430\u043b\u044c\u043d\u044b\u0439 \u0432\u0438\u0434","location":"\u041c\u0435\u0441\u0442\u043e\u043d\u0430\u0445\u043e\u0436\u0434\u0435\u043d\u0438\u0435","could not parse server's response":"\u041d\u0435\u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u044b\u0439 \u0444\u043e\u0440\u043c\u0430\u0442 \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u0430","failed to retrieve data":"\u041d\u0435\u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u0434\u0430\u043d\u043d\u044b\u0435","service book":"\u041a\u043d\u0438\u0433\u0430 \u043e\u0431\u0441\u043b\u0443\u0436\u0438\u0432\u0430\u043d\u0438\u044f","connection error":"\u041e\u0448\u0438\u0431\u043a\u0430 \u0441\u043e\u0435\u0434\u0438\u043d\u0435\u043d\u0438\u044f","exchange":"\u043e\u0431\u043c\u0435\u043d","not crashed":"\u043d\u0435 \u0430\u0432\u0430\u0440\u0438\u0439\u043d\u0430\u044f","vehicle exchange":"\u0412\u043e\u0437\u043c\u043e\u0436\u043d\u043e\u0441\u0442\u044c \u043e\u0431\u043c\u0435\u043d\u0430","less options":"","age of ad":"\u0412\u043e\u0437\u0440\u0430\u0441\u0442 \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u044f","max mileage":"\u041c\u0430\u043a\u0441. \u043f\u0440\u043e\u0431\u0435\u0433","color":"\u0426\u0432\u0435\u0442","dealer":"\u041f\u0440\u043e\u0434\u0430\u0432\u0435\u0446","crashed":"\u0430\u0432\u0430\u0440\u0438\u0439\u043d\u0430\u044f","more options":"\u0415\u0449\u0435 \u0432\u0430\u0440\u0438\u0430\u043d\u0442\u044b","up to 2 days":"\u0434\u043e 2 \u0434\u043d\u0435\u0439","up to 3 days":"\u0434\u043e 3 \u0434\u043d\u0435\u0439","up to 7 days":"\u0434\u043e 7 \u0434\u043d\u0435\u0439","http:\/\/www.auto24.ee\/":"http:\/\/rus.auto24.ee\/","it's taking longer than expected.":"","kw":"\u043a\u0412\u0442","power":"\u041c\u043e\u0449\u043d\u043e\u0441\u0442\u044c","up to 1 day":"\u0434\u043e 1 \u0434\u043d\u044f","this video cannot be viewed on your device.":"\u042d\u0442\u043e \u0432\u0438\u0434\u0435\u043e \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u043d\u043e \u043a \u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0443 \u043d\u0430 \u0432\u0430\u0448\u0435\u043c \u0443\u0441\u0442\u0440\u043e\u0439\u0441\u0442\u0432\u0435.","name cannot be empty!":"\u0418\u043c\u044f \u0434\u043e\u043b\u0436\u043d\u043e \u0431\u044b\u0442\u044c \u0437\u0430\u043f\u043e\u043b\u043d\u0435\u043d\u043e!","comment cannot be empty!":"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043a\u0441\u0442 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u044f!","you did not fill a required field!":"\u041d\u0435\u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u044b\u0439 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439: \u043e\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0442\u0440\u0435\u0431\u0443\u0435\u043c\u043e\u0435 \u043f\u043e\u043b","name":"\u0418\u043c\u044f","enter the security code:":"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u0440\u043e\u0432\u0435\u0440\u043e\u0447\u043d\u044b\u0439 \u043a\u043e\u0434:","the entered security code is wrong!":"\u041f\u0440\u043e\u0432\u0435\u0440\u043e\u0447\u043d\u044b\u0439 \u043a\u043e\u0434 \u043d\u0435 \u043f\u043e\u0434\u0445\u043e\u0434\u0438\u0442!","your comment was blocked on suspicion of spam":"\u0412\u0430\u0448 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439 \u0437\u0430\u0431\u043b\u043e\u043a\u0438\u0440\u043e\u0432\u0430\u043d \u0441\u043f\u0430\u043c\u0444\u0438\u043b\u044c\u0442\u0440\u043e\u043c.","you must enter a security code!":"\u041f\u0440\u043e\u0432\u0435\u0440\u043e\u0447\u043d\u044b\u0439 \u043a\u043e\u0434 \u043d\u0435 \u0432\u0432\u0435\u0434\u0451\u043d!","no more comments":"\u0411\u043e\u043b\u044c\u0448\u0435 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0435\u0432 \u043d\u0435\u0442","there are no comments to display":"\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0438 \u043e\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044e\u0442","read comments":"\u0427\u0438\u0442\u0430\u0442\u044c \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0438","article":"\u041d\u043e\u0432\u043e\u0441\u0442\u044c","comments":"\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0438","comment":"\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439","add a comment":"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439","no more results":"\u0411\u043e\u043b\u044c\u0448\u0435 \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u043e\u0432 \u043d\u0435\u0442","loading...":"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430...","there are no more news to display":"\u0411\u043e\u043b\u044c\u0448\u0435 \u043d\u043e\u0432\u043e\u0441\u0442\u0435\u0439 \u043d\u0435\u0442","load more":"\u041f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0435\u0449\u0435","submit":"\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c","please narrow your search if you want notifications!":"\u0414\u043b\u044f \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u044f \u043e\u043f\u043e\u0432\u0435\u0449\u0435\u043d\u0438\u044f \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0443\u0442\u043e\u0447\u043d\u0438\u0442\u044c \u0444\u0438\u043b\u044c\u0442\u0440 \u043f\u043e\u0438\u0441\u043a\u0430 (\u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u043e\u0432 \u0434\u043e 1000).","please specify a title for this search!":"\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430 \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043f\u043e\u0438\u0441\u043a\u0430!","please specify vehicle type!":"\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430 \u0443\u043a\u0430\u0436\u0438\u0442\u0435 \u0442\u0438\u043f \u0442\u0440\u0430\u043d\u0441\u043f\u043e\u0440\u0442\u043d\u043e\u0433\u043e \u0441\u0440\u0435\u0434\u0441\u0442\u0432\u0430!","continue on web":"\u043f\u0435\u0440\u0435\u0439\u0442\u0438 \u043d\u0430 \u0441\u0430\u0439\u0442","done":"\u0433\u043e\u0442\u043e\u0432\u043e","next":"\u0434\u0430\u043b\u044c\u0448\u0435","other":"\u0434\u0440\u0443\u0433\u043e\u0435","engine":"\u0434\u0432\u0438\u0433\u0430\u0442\u0435\u043b\u044c","interior view":"\u0432\u0438\u0434 \u0432\u043d\u0443\u0442\u0440\u0438","rear view":"\u0432\u0438\u0434 \u0441\u0437\u0430\u0434\u0438","front view":"\u0432\u0438\u0434 \u0441\u043f\u0435\u0440\u0435\u0434\u0438","phone":"\u0422\u0435\u043b\u0435\u0444\u043e\u043d ","add photos":"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0444\u043e\u0442\u043e","advertise":"\u041e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435","other model":"\u0434\u0440\u0443\u0433\u0430\u044f \u043c\u043e\u0434\u0435\u043b\u044c","model name":"\u0438\u043c\u044f \u043c\u043e\u0434\u0435\u043b\u0438","edit ad":"\u0438\u0437\u043c\u0435\u043d\u0438\u0442\u044c \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435","adedit":"\u0438\u0437\u043c\u0435\u043d\u0438\u0442\u044c \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435","edit":"\u0438\u0437\u043c\u0435\u043d\u0438\u0442\u044c","my ads":"\u041c\u043e\u0438 \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u044f","saved search":"\u0441\u043e\u0445\u0440\u0430\u043d\u0451\u043d\u043d\u044b\u0439 \u043f\u043e\u0438\u0441\u043a","saved searches":"\u0441\u043e\u0445\u0440\u0430\u043d\u0451\u043d\u043d\u044be \u043f\u043e\u0438\u0441\u043a\u0438","place an ad":"\u0420\u0430\u0437\u043c\u0435\u0441\u0442\u0438\u0442\u044c \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435","my favorites":"\u041c\u043e\u0451 \u0438\u0437\u0431\u0440\u0430\u043d\u043d\u043e\u0435","my saved searches":"\u041c\u043e\u0438 \u0441\u043e\u0445\u0440\u0430\u043d\u0451\u043d\u043d\u044b\u0435 \u043f\u043e\u0438\u0441\u043a\u0438","your query returned no results":"\u041d\u0430 \u0432\u0430\u0448 \u0437\u0430\u043f\u0440\u043e\u0441 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e \u043d\u0438 \u043e\u0434\u043d\u043e\u0433\u043e \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u0430","query":"\u0417\u0430\u043f\u0440\u043e\u0441\u0438\u0442\u044c","query result":"\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442 \u0437\u0430\u043f\u0440\u043e\u0441\u0430","vehicle queries":"\u0417\u0430\u043f\u0440\u043e\u0441\u044b \u043f\u043e \u0430\u0432\u0442\u043e\u043c\u043e\u0431\u0438\u043b\u044e","no vehicles found":"\u041e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0439 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e","error while saving search!":"\u041e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0438\u0438 \u043f\u043e\u0438\u0441\u043a\u0430!","search saved":"\u041f\u043e\u0438\u0441\u043a \u0441\u043e\u0445\u0440\u0430\u043d\u0451\u043d","error while deleting search":"\u041e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u0443\u0434\u0430\u043b\u0435\u043d\u0438\u0438 \u043f\u043e\u0438\u0441\u043a\u0430","search deleted":"\u041f\u043e\u0438\u0441\u043a \u0443\u0434\u0430\u043b\u0451\u043d","really delete?":"\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u044c\u043d\u043e \u0443\u0434\u0430\u043b\u0438\u0442\u044c?","notification email:":"\u0410\u0434\u0440\u0435\u0441 \u0435-\u043f\u043e\u0447\u0442\u044b \u0434\u043b\u044f \u0438\u0437\u0432\u0435\u0449\u0435\u043d\u0438\u0439:","notify about new ads":"\u0418\u0437\u0432\u0435\u0441\u0442\u0438\u0442\u044c \u043e \u043d\u043e\u0432\u044b\u0445 \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u044f\u0445","search title:":"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043f\u043e\u0438\u0441\u043a\u0430:","damages":"\u0414\u043e\u0440\u043e\u0436\u043d\u044b\u0439 \u0443\u0449\u0435\u0440\u0431","vin or plate number:":"VIN \u0438\u043b\u0438 \u043d\u043e\u043c\u0435\u0440 \u0430\u0432\u0442\u043e\u043c\u043e\u0431\u0438\u043b\u044f:","insurance":"\u0421\u0442\u0440\u0430\u0445\u043e\u0432\u043a\u0430","registration":"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u043e\u043d\u043d\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435","auction":"\u0430\u0443\u043a\u0446\u0438\u043e\u043d","select language":"\u0432\u044b\u0431\u0440\u0430\u0442\u044c \u044f\u0437\u044b\u043a","save search":"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c \u043f\u043e\u0438\u0441\u043a","remove favorite":"\u0423\u0414\u0410\u041b\u0418\u0422\u042c \u0418\u0417 \u0418\u0417\u0411\u0420\u0410\u041d\u041d\u041e\u0413\u041e","add favorite":"\u0414\u041e\u0411\u0410\u0412\u0418\u0422\u042c \u0412 \u0418\u0417\u0411\u0420\u0410\u041d\u041d\u041e\u0415","language":"\u042f\u0417\u042b\u041a","my auto24":"\u041c\u041e\u0419 AUTO24","news":"\u043d\u043e\u0432\u043e\u0441\u0442\u0438","queries":"\u0417\u0410\u041f\u0420\u041e\u0421\u042b","ad_instruction_text_post":"\u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443.","this":"\u044d\u0442\u0443","technical specifications":"\u0442\u0435\u0445\u043d\u0438\u0447\u0435\u0441\u043a\u0438\u0435 \u0434\u0430\u043d\u043d\u044b\u0435","other information":"\u043f\u0440\u043e\u0447\u0430\u044f \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f","search":"\u0438\u0441\u043a\u0430\u0442\u044c","favorites":"\u0438\u0437\u0431\u0440\u0430\u043d\u043d\u043e\u0435","dashboard":"\u041d\u0410 \u0413\u041b\u0410\u0412\u041d\u0423\u042e","ad_instruction_text_pre":"\u0412\u0430\u0448\u0435 \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435 \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u043e \u0432 \u0431\u0430\u0437\u0443 \u0434\u0430\u043d\u043d\u044b\u0445 Auto24, \u043d\u043e \u043d\u0435\u0430\u043a\u0442\u0438\u0432\u043d\u043e. \u0427\u0442\u043e\u0431\u044b \u0435\u0433\u043e \u0430\u043a\u0442\u0438\u0432\u0438\u0440\u043e\u0432\u0430\u0442\u044c, \u043d\u0443\u0436\u043d\u043e \u043e\u043f\u043b\u0430\u0442\u0438\u0442\u044c \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435 \u0438 \u043b\u044e\u0431\u044b\u0435 \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u044b\u0435 \u0434\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0435 \u0443\u0441\u043b\u0443\u0433\u0438, \u043f\u043e\u0441\u0435\u0442\u0438\u0432 ","no email specified by the seller!":"\u041f\u0440\u043e\u0434\u0430\u0432\u0435\u0446 \u043d\u0435 \u0443\u043a\u0430\u0437\u0430\u043b \u0430\u0434\u0440\u0435\u0441 \u0435-\u043f\u043e\u0447\u0442\u044b!","there are no more messages to display":"\u0411\u043e\u043b\u044c\u0448\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0439 \u043d\u0435\u0442","do you want to delete this message?":"\u0425\u043e\u0442\u0438\u0442\u0435 \u043b\u0438 \u0432\u044b \u0443\u0434\u0430\u043b\u0438\u0442\u044c \u044d\u0442\u043e \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435?","view message":"\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435","invalid_email":"\u0412\u0432\u0435\u0434\u0435\u043d\u043d\u044b\u0439 \u0430\u0434\u0440\u0435\u0441 \u042d-\u043f\u043e\u0447\u0442\u044b \u043d\u0435\u043a\u043e\u0440\u0440\u0435\u043a\u0442\u0435\u043d","telephone":"\u0422\u0435\u043b\u0435\u0444\u043e\u043d","email":"E-\u043f\u043e\u0447\u0442\u0430","ask extra info":"\u0414\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u0430\u044f \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f","mail folders":"\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f","outbox":"\u041e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043d\u044b\u0435","delete":"\u0423\u0434\u0430\u043b\u0438\u0442\u044c","inbox":"\u041f\u043e\u043b\u0443\u0447\u0435\u043d\u043d\u044b\u0435","write again":"\u041d\u0430\u043f\u0438\u0441\u0430\u0442\u044c \u0435\u0449\u0451","message content:":"\u0422\u0435\u043a\u0441\u0442 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f:","reply":"\u041e\u0442\u0432\u0435\u0442\u0438\u0442\u044c","characters remaining":"\u0437\u043d\u0430\u043a\u043e\u0432","send message":"\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435","maximum size of the message is %n characters.":"\u041c\u0430\u043a\u0441\u0438\u043c\u0430\u043b\u044c\u043d\u0430\u044f \u0434\u043b\u0438\u043d\u0430 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f - %n \u0437\u043d\u0430\u043a\u043e\u0432","mailfrom":"\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u0435\u043b\u044c","mailto":"\u041f\u043e\u043b\u0443\u0447\u0430\u0442\u0435\u043b\u044c","date":"\u0414\u0430\u0442\u0430","compose message":"\u041d\u0430\u043f\u0438\u0441\u0430\u0442\u044c","mailbox":"\u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f","model period":"\u043c\u043e\u0434\u0435\u043b\u044c\u043do\u0435 \u043f\u043e\u043a\u043e\u043b\u0435\u043d\u0438e","model trim":"\u0443\u0440\u043e\u0432\u0435\u043d\u044c \u0441\u043d\u0430\u0440\u044f\u0436\u0435\u043d\u0438\u044f \u043c\u043e\u0434\u0435\u043b\u0438","first registration":"\u043f\u0435\u0440\u0432\u0438\u0447\u043d\u0430\u044f \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f","vat":"\u041d\u0414\u0421","vat 0% (civilian or not a subject to vat)":"\u041d\u0414\u0421 0% (\u0447\u0430\u0441\u0442\u043d\u043e\u0435 \u043b\u0438\u0446\u043e \u0438\u043b\u0438 \u043d\u0435\u043e\u0431\u044f\u0437\u0430\u043d\u043d\u043e\u0441\u0442\u044c \u043d\u0430\u043b\u043e\u0433\u0430)","price includes vat 20%":"\u0426\u0435\u043d\u0430 \u0441\u043e\u0434\u0435\u0440\u0436\u0438\u0442 \u041d\u0414\u0421 20%","autocaravan":"\u0430\u0432\u0442\u043e\u0436\u0438\u043b\u044c\u0451","agricultural machinery":"\u0430\u0433\u0440\u043e\u0442\u0435\u0445\u043d\u0438\u043a\u0430","construction machinery":"\u0441\u0442\u0440\u043e\u0438\u0442\u0435\u043b\u044c\u043d\u0430\u044f \u0442\u0435\u0445\u043d\u0438\u043a\u0430","forest machinery":"\u043b\u0435\u0441\u043d\u0430\u044f \u0442\u0435\u0445\u043d\u0438\u043a\u0430","communal machinery":"\u043a\u043e\u043c\u043c\u0443\u043d\u0430\u043b\u044c\u043d\u0430\u044f \u0442\u0435\u0445\u043d\u0438\u043a\u0430","please specify vehicle type first!":"\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0441\u043d\u0430\u0447\u0430\u043b\u0430 \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0438\u043f \u0442\u0440\u0430\u043d\u0441\u043f\u043e\u0440\u0442\u043d\u043e\u0433\u043e \u0441\u0440\u0435\u0434\u0441\u0442\u0432\u0430!","you have no saved searches":"\u0443 \u0432\u0430\u0441 \u043d\u0435\u0442 \u0441\u043e\u0445\u0440\u0430\u043d\u0451\u043d\u043d\u044b\u0445 \u043f\u043e\u0438\u0441\u043a\u043e\u0432","view":"\u043f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c","hide":"\u0441\u043a\u0440\u044b\u0442\u044c","restore":"\u0432\u043e\u0441\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c","site link":"\u043b\u0438\u043d\u043a \u043d\u0430 \u0441\u0430\u0439\u0442","really hide?":"\u0416\u0435\u043b\u0430\u0435\u0442\u0435 \u0432\u0440\u0435\u043c\u0435\u043d\u043d\u043e \u0441\u043a\u0440\u044b\u0442\u044c \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435?","bodytype(in detail)":"\u0422\u0438\u043f \u043a\u0443\u0437\u043e\u0432\u0430 (\u0443\u0442\u043e\u0447\u043d\u0435\u043d\u0438\u0435)","ad inserted":"\u041e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u043e","to site":"auto24.ee","to list":"\u043a \u0441\u043f\u0438\u0441\u043a\u0443","order services":"\u0435\u0449\u0451","stats":"c\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043a\u0430","stop":"\u043f\u0440\u0435\u043a\u0440\u0430\u0442\u0438\u0442\u044c \u043e\u0431\u044c\u044f\u0432\u043b\u0435\u043d\u0438\u0435","views":"\u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u043e\u0432","ad_unhide_message":"\u0412\u0430\u0448\u0435 \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435 \u0442\u0435\u043f\u0435\u0440\u044c \u043f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0435\u0442\u0441\u044f \u0432 \u043f\u043e\u0438\u0441\u043a\u0435. \u0412 \u0434\u0435\u0442\u0430\u043b\u044c\u043d\u043e\u043c \u043e\u0431\u0437\u043e\u0440\u0435 \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u044f \u0412\u0430\u0448\u0438 \u043a\u043e\u043d\u0442\u0430\u043a\u0442\u043d\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435 \u0432\u0438\u0434\u0438\u043c\u044b. ","too_many_search_results":"\u0414\u043b\u044f \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u044f \u043e\u043f\u043e\u0432\u0435\u0449\u0435\u043d\u0438\u044f \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0443\u0442\u043e\u0447\u043d\u0438\u0442\u044c \u0444\u0438\u043b\u044c\u0442\u0440 \u043f\u043e\u0438\u0441\u043a\u0430 (\u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u043e\u0432 \u0434\u043e 1000).","order_services_notice":"\u0414\u043b\u044f \u0441\u043e\u0432\u0435\u0440\u0448\u0435\u043d\u0438\u044f \u0434\u0440\u0443\u0433\u0438\u0445 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439 (\u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u0438\u0435\/\u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u0435 \u0443\u0441\u043b\u0443\u0433, \u0432\u0432\u043e\u0434 \u0430\u0443\u043a\u0446\u0438\u043e\u043d\u0430, \u0438\u0442\u0434) \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u043f\u043e\u0441\u0435\u0442\u0438\u0442\u044c \u0432\u0435\u0431-\u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443 auto24.ee.","country_input":"\u0441\u0442\u0440\u0430\u043d\u0430","location_input":"\u0433\u043e\u0440\u043e\u0434 \u0438\u043b\u0438 \u0443\u0435\u0437\u0434","mileage":"\u043f\u043e\u043a\u0430\u0437 \u043e\u0434\u043e\u043c\u0435\u0442\u0440\u0430 (\u043a\u043c)","last 30 days":"\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043a\u0430 \u043f\u0440\u043e\u0448\u043b\u044b\u0445 30 \u0434\u043d\u0435\u0439.","petrol + gas (lpg)":" \u0431\u0435\u043d\u0437\u0438\u043d + \u0433\u0430\u0437 (LPG\/\u0436\u0438\u0434\u043a\u0438\u0439)","petrol + gas (cng)":" \u0431\u0435\u043d\u0437\u0438\u043d + \u0433\u0430\u0437 (CNG\/\u0441\u0436\u0430\u0442\u044b\u0439)","gas (LPG)":"\u0433\u0430\u0437 (LPG\/\u0436\u0438\u0434\u043a\u0438\u0439)","gas (CNG)":" \u0433\u0430\u0437 (CNG\/\u0441\u0436\u0430\u0442\u044b\u0439)","maps":"\u043a\u0430\u0440\u0442\u044b","entries":"\u0441\u043f\u0438\u0441\u043e\u043a \u0443\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u043e\u0432","results":"\u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u044b","results \/ timetable":"\u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u044b","newsdetail":"\u041d\u043e\u0432\u043e\u0441\u0442\u044c","abs after":"\u0410\u0411\u0421 \u043f\u043e\u0441\u043b\u0435","track results":"\u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u044b \u0442\u0440\u0430\u0441\u0441\u044b","class":"\u043a\u043b\u0430\u0441\u0441","all":"\u0432\u0441\u0435","information_about_stage":"\u0418\u043d\u0444\u043e \u0441\u043a\u043e\u0440\u043e\u0441\u0442\u043d\u043e\u0433\u043e \u0443\u0447\u0430\u0441\u0442\u043a\u0430","timetable":"\u0420\u0430\u0441\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u0437\u0430\u0435\u0437\u0434\u043e\u0432 ","schedule":"\u041f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u0430","penalties":"\u0428\u0442\u0440\u0430\u0444\u043d\u044b\u0435","retired":"\u0412\u044b\u0431\u044b\u0432\u0448\u0438\u0435","caravan and autocaravan":"\u0434\u0430\u0447\u0430-\u043f\u0440\u0438\u0446\u0435\u043f \u0438 \u0430\u0432\u0442\u043e\u0436\u0438\u043b\u044c\u0451","passenger and suv":"\u043b\u0435\u0433. \u0430\u0432\u0442\u043e\u043c\u043e\u0431\u0438\u043b\u044c \u0438 \u0432\u043d\u0435\u0434\u043e\u0440\u043e\u0436\u043d\u0438\u043a","security code":"\u043f\u0440\u043e\u0432\u0435\u0440\u043e\u0447\u043d\u044b\u0439 \u043a\u043e\u0434","you":"\u0432\u044b","do you want to display your own location on map?":"\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0432\u0430\u0448\u0435 \u0440\u0430\u0441\u043f\u043e\u043b\u043e\u0436\u0435\u043d\u0438\u0435 \u043d\u0430 \u043a\u0430\u0440\u0442\u0435?","group":"","no":"\u043d\u0435\u0442","yes":"\u0434\u0430","really discontinue?":"\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u044c\u043d\u043e \u043f\u0440\u0435\u043a\u0440\u0430\u0442\u0438\u0442\u044c?","orders\/services":"\u0417\u0430\u043a\u0430\u0437\u044b \/ \u0423\u0441\u043b\u0443\u0433\u0438 ","my ad":"\u041c\u043e\u0451 \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435 ","do you want to change or delete this image?":"\u0443\u0434\u0430\u043b\u0438\u0442\u044c \u0438\u043b\u0438 \u0441\u043c\u0435\u043d\u0438\u0442\u044c \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435?","change":"\u0441\u043c\u0435\u043d\u0438\u0442\u044c","select picture source":"\u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u0441\u0442\u043e\u0447\u043d\u0438\u043a \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f","camera":"\u043a\u0430\u043c\u0435\u0440\u0430","picture library":"\u0441\u043e\u0445\u0440\u0430\u043d\u0451\u043d\u043d\u044b\u0435 \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f","ad no longer exists":"\u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435 \u043d\u0435\u0430\u043a\u0442\u0438\u0432\u043d\u043e","remember":"\u0437\u0430\u043f\u043e\u043c\u043d\u0438\u0442\u044c","saved vehicle":"\u0441\u043e\u0445\u0440\u0430\u043d\u0451\u043d\u043d\u044b\u0439 \u0430\u0432\u0442\u043e\u043c\u043e\u0431\u0438\u043b\u044c","saved vehicles":"\u0441\u043e\u0445\u0440\u0430\u043d\u0451\u043d\u043d\u044b\u0435 \u0430\u0432\u0442\u043e","delete saved vehicle":"\u0443\u0434\u0430\u043b\u0438\u0442\u044c \u0441\u043e\u0445\u0440\u0430\u043d\u0451\u043d\u043d\u044b\u0439","save vehicle":"\u0441\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c \u0430\u0432\u0442\u043e\u0431\u043e\u043c\u0438\u043b\u044c ","look up vehicle market price":"\u041f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0440\u044b\u043d\u043e\u0447\u043d\u0443\u044e \u0446\u0435\u043d\u0443 \u0430\u0432\u0442\u043e\u043c\u043e\u0431\u0438\u043b\u044f ","enter the vehicle's estonian registration number in the following field":"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u044d\u0441\u0442\u043e\u043d\u0441\u043a\u0438\u0439 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u043e\u043d\u043d\u044b\u0439 \u043d\u043e\u043c\u0435\u0440 \u0430\u0432\u0442\u043e\u043c\u043e\u0431\u0438\u043b\u044f","detailed query":"\u0434\u0435\u0442\u0430\u043b\u044c\u043d\u044b\u0439 \u0437\u0430\u043f\u0440\u043e\u0441","show telephone":"\u043f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u043d\u043e\u043c\u0435\u0440","no results found for":"\u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u043e\u0432 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e","check a vehicle's market price":"\u041f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0440\u044b\u043d\u043e\u0447\u043d\u0443\u044e \u0446\u0435\u043d\u0443 \u0430\u0432\u0442\u043e\u043c\u043e\u0431\u0438\u043b\u044f ","vehicle":"\u0410\u0432\u0442\u043e\u043c\u043e\u0431\u0438\u043b\u044c","vehicle price":"\u0421\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u044c \u0430\u0432\u0442\u043e\u043c\u043e\u0431\u0438\u043b\u044f","ad no longer exists, delete?":"\u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435 \u043d\u0435\u0430\u043a\u0442\u0438\u0432\u043d\u043e, \u0443\u0434\u0430\u043b\u0438\u0442\u044c?","market price":"\u0420\u044b\u043d\u043e\u0447\u043d\u0430\u044f \u0446\u0435\u043d\u0430","vehicles in estonia":"\u0422\u0440\u0430\u043d\u0441\u043f\u043e\u0440\u0442 \u0432 \u042d\u0441\u0442\u043e\u043d\u0438\u0438","no vehicles were found on auto24.lv":"\u041d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e \u0430\u0432\u0442\u043e\u043c\u043e\u0431\u0438\u043b\u0435\u0439 \u043d\u0430 auto24.lv","http:\/\/www.auto24.lv\/":"http:\/\/rus.auto24.lv\/","newer ads first":"\u043d\u043e\u0432\u044b\u0435 \u0441\u043d\u0430\u0447\u0430\u043b\u0430","older ads first":" \u0441\u0442\u0430\u0440\u044b\u0435 \u0441\u043d\u0430\u0447\u0430\u043b\u0430","you have no incoming messages.":"\u0443 \u0432\u0430\u0441 \u043d\u0435\u0442 \u0432\u0445\u043e\u0434\u044f\u0449\u0438\u0445 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0439","accept user agreement":"\u0441\u043e\u0433\u043b\u0430\u0441\u0438\u0442\u044c\u0441\u044f \u0441 \u0443\u0441\u043b\u043e\u0432\u0438\u044f\u043c\u0438","read":"\u0447\u0438\u0442\u0430\u0442\u044c","used vehicles":"\u043f\u043e\u0434\u0435\u0440\u0436\u0430\u043d\u043d\u044b\u0435 \u0430\u0432\u0442\u043e\u043c\u043e\u0431\u0438\u043b\u0438","find yourself a suitable car":"\u043d\u0430\u0439\u0434\u0438 \u0441\u0435\u0431\u0435 \u043f\u043e\u0434\u0445\u043e\u0434\u044f\u0449\u0438\u0439 \u0430\u0432\u0442\u043e\u043c\u043e\u0431\u0438\u043b\u044c ","latest news":"\u0441\u0432\u0435\u0436\u0438\u0435 \u043d\u043e\u0432\u043e\u0441\u0442\u0438","fresh info on what's happening":"\u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f \u043e \u043f\u043e\u0441\u043b\u0435\u0434\u043d\u0438\u0445 \u0441\u043e\u0431\u044b\u0442\u0438\u044f\u0445 ","for managing your ads":"\u041f\u043e\u0447\u0442\u0430, \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0439, \u0438 \u043c\u043d\u043e\u0433\u043e\u0435 \u0434\u0440\u0443\u0433\u043e\u0435 ","all information about the event":"\u0420\u0430\u0441\u043f\u0438\u0441\u0430\u043d\u0438\u0435, \u043a\u0430\u0440\u0442\u0430 \u0437\u0430\u0435\u0437\u0434\u043e\u0432, \u0438\u0442\u0434","change your preferred language":"English, Eesti, Soumi, \u0420\u0443\u0441\u0441\u043a\u0438\u0439 ","warranty":"\u0433\u0430\u0440\u0430\u043d\u0442\u0438\u044f","doors":"\u043a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u0434\u0432\u0435\u0440\u0435\u0439","seats":"\u043a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u043c\u0435\u0441\u0442","display":"\u043e\u0442\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435 ","parking aid":"\u0434\u0430\u0442\u0447\u0438\u043a\u0438 \u043f\u0430\u0440\u043a\u043e\u0432\u043a\u0438","engine pre-heating":"\u043f\u043e\u0434\u043e\u0433\u0440\u0435\u0432 \u043c\u043e\u0442\u043e\u0440\u0430","seat heating":"\u043e\u0431\u043e\u0433\u0440\u0435\u0432 \u0441\u0438\u0434\u0435\u043d\u0438\u0439","cruise control":"\u043a\u0440\u0443\u0438\u0437-\u043a\u043e\u043d\u0442\u0440\u043e\u043b\u044c","xenon lights":"\u043a\u0441\u0435\u043d\u043e\u043d\u043e\u0432\u044b\u0435 \u043b\u0430\u043c\u043f\u044b","cd player":"CD \u043f\u043b\u0435\u0435\u0440","traction control":"\u0442\u0440\u044d\u043a\u0448\u043d \u043a\u043e\u043d\u0442\u0440\u043e\u043b\u044c","anti skidding":"\u0441\u0438\u0441\u0442. \u043f\u0440\u043e\u0442\u0438\u0432 \u0431\u043e\u043a. \u0441\u043a\u043e\u043b\u044c.","year from":"\u0433\u043e\u0434 \u043e\u0442","year to":"\u0433\u043e\u0434 \u0434\u043e","price from":"\u0446\u0435\u043d\u0430 \u043e\u0442","price to":"\u0446\u0435\u043d\u0430 \u0434\u043e","monthly payment to":"\u043c\u0435\u0441\u044f\u0447. \u043f\u043b\u0430\u0442\u0435\u0436 \u0434\u043e","transm.":"\u041a\u041f\u041f","drivetrain":"\u0432\u0435\u0434\u0443\u0449\u0438\u0439 \u043c\u043e\u0441\u0442","sort by":"\u0441\u043e\u0440\u0442\u0438\u0440\u043e\u0432\u043a\u0430","newer first":"\u043d\u043e\u0432\u044b\u0435 \u0441\u043d\u0430\u0447\u0430\u043b\u0430","by price":"\u043f\u043e \u0446\u0435\u043d\u0435","by year":"\u043f\u043e \u0433\u043e\u0434\u0443","list":"\u043f\u043e\u043a\u0430\u0437\u0430\u0442\u044c","%1$s on page":"%1$s \u043d\u0430 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0435","climate control":"\u043a\u043b\u0438\u043c\u0430\u0442-\u043a\u043e\u043d\u0442\u0440\u043e\u043b\u044c","new of the week":"\u043d\u043e\u0432\u044b\u0435 \u043d\u0435\u0434\u0435\u043b\u0438","show photos":"\u043f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0444\u043e\u0442\u043e","selected by user":"\u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u043e","passenger car and suv":"\u043b\u0435\u0433\u043a\u043e\u0432\u043e\u0439 \u0430\u0432\u0442\u043e\u043c\u043e\u0431\u0438\u043b\u044c \u0438 \u0432\u043d\u0435\u0434\u043e\u0440\u043e\u0436\u043d\u0438\u043a","motorcycle":"\u043c\u043e\u0442\u043e\u0446\u0438\u043a\u043b","search choice":"\u0432\u044b\u0431\u043e\u0440 \u043f\u043e\u0438\u0441\u043a\u0430","data":"\u0434\u0430\u043d\u043d\u044b\u0435","power (kw)":"\u043c\u043e\u0449\u043d\u043e\u0441\u0442\u044c (\u043a\u0412)","mileage (km)":"\u043f\u043e\u043a\u0430\u0437 \u043e\u0434\u043e\u043c\u0435\u0442\u0440\u0430 (\u043a\u043c)","payload (kg)":"\u0433\u0440\u0443\u0437\u043e\u043f\u043e\u0434. (\u043a\u0433)","luggage space (m\u00b3)":"\u0431\u0430\u0433\u0430\u0436. \u043e\u0442\u0434\u0435\u043b. (\u043c\u00b3)","gross weight (kg)":"\u043f\u043e\u043b\u043d\u0430\u044f \u043c\u0430\u0441\u0441\u0430 (\u043a\u0433)","axle":"\u043e\u0441\u0438","displacement (cm\u00b3)":"\u043e\u0431\u044a\u0435\u043c (\u0441\u043c\u00b3)","unladen weight (kg)":"\u043f\u0443\u0441\u0442\u0430\u044f \u043c\u0430\u0441\u0441\u0430 (\u043a\u0433)","length (mm)":"\u0434\u043b\u0438\u043d\u0430 (\u043c\u043c)","width (mm)":"\u0448\u0438\u0440\u0438\u043d\u0430 (\u043c\u043c)","beds":"\u043c\u0435\u0441\u0442\u0430 \u0434\u043b\u044f \u0441\u043d\u0430","abs":"\u0410\u0411\u0421","alarm":"\u0441\u0438\u0433\u043d\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u044f","immobilizer":"\u0438\u043c\u043c\u043e\u0431\u0438\u043b\u0430\u0439\u0437\u0435\u0440","central locking":"\u0446\u0435\u043d\u0442\u0440\u0430\u043b\u044c\u043d\u044b\u0439 \u0437\u0430\u043c\u043e\u043a","power steering":"\u0443\u0441\u0438\u043b\u0438\u0442\u0435\u043b\u044c \u0440\u0443\u043b\u044f","leather upholstery":"\u043a\u043e\u0436\u0430\u043d\u0430\u044f \u043e\u0431\u0438\u0432\u043a\u0430","tow hitch":"\u043f\u0440\u0438\u0446\u0435\u043f\u043d\u043e\u0435 \u0443\u0441\u0442\u0440.","electric windows":"\u044d\u043b\u0435\u043a\u0442\u0440\u0438\u0447\u0435\u0441\u043a\u0438\u0435 \u043e\u043a\u043d\u0430","alloy wheels":"\u043b\u0438\u0442\u044b\u0435 \u0434\u0438\u0441\u043a\u0438","sunroof":"\u043b\u044e\u043a \u043d\u0430 \u043a\u0440\u044b\u0448\u0435","navigation system":"\u0441\u0438\u0441\u0442\u0435\u043c\u0430 \u043d\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u0438","tv":"TV","wc":"WC","refrigerator":"\u0445\u043e\u043b\u043e\u0434\u0438\u043b\u044c\u043d\u0438\u043a","intarder":"\u0438\u043d\u0442\u0430\u0440\u0434\u0435\u0440","retarder":"\u0440\u0435\u0442\u0430\u0440\u0434\u0435\u0440","taillift":"\u043f\u043e\u0434\u044a\u0451\u043c\u043d\u0438\u043a \u0437\u0430\u0434. \u043b\u044e\u043a\u0430","adaptive suspension":"\u0432\u043e\u0437\u0434\u0443\u0448\u043d\u0430\u044f \u043f\u043e\u0434\u0432\u0435\u0441\u043a\u0430","tv antenna":"TV \u0430\u043d\u0442\u0435\u043d\u043d\u0430","gas cooker":"\u0433\u0430\u0437\u043e\u0432\u0430\u044f \u043f\u043b\u0438\u0442\u0430","mileage to (km)":"\u043e\u0434\u043e\u043c. \u0434\u043e (\u043a\u043c)","price includes vat":"\u0446\u0435\u043d\u0430 \u0441\u043e\u0434\u0435\u0440\u0436\u0438\u0442 \u041d\u0421\u041e","price plus vat":"\u043a \u0446\u0435\u043d\u0435 \u0434\u043e\u0431\u0430\u0432\u043b\u044f\u0435\u0442\u0441\u044f \u041d\u0421\u041e","vat 0%":"\u041d\u0421\u041e 0%","up to %1$d days":"%1$d \u0434\u043d\u0435\u0439","superstruct.":"\u043d\u0430\u0434\u0441\u0442\u0440\u043e\u0439\u043a\u0430","currency":"\u0432\u0430\u043b\u044e\u0442\u0430","isothermal van":"\u0438\u0437\u043e\u0442\u0435\u0440\u043c\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u0444\u0443\u0440\u0433\u043e\u043d","refrigerator unit":"\u0445\u043e\u043b\u043e\u0434\u0438\u043b\u044c\u043d\u0438\u043a","select all":"\u0432\u044b\u0434\u0435\u043b\u0438\u0442\u044c \u0432\u0441\u0435","model specification":"\u0443\u0442\u043e\u0447\u043d\u0435\u043d\u0438\u0435 \u043c\u043e\u0434\u0435\u043b\u0438","all types":"\u043e\u0431\u0449\u0438\u0439 \u043f\u043e\u0438\u0441\u043a","technical data":"\u0442\u0435\u0445\u043d\u0438\u0447\u0435\u0441\u043a\u0438\u0435 \u0434\u0430\u043d\u043d\u044b\u0435","make and model":"\u043c\u0430\u0440\u043a\u0430 \u0438 \u043c\u043e\u0434\u0435\u043b\u044c","model generation":"\u043c\u043e\u0434\u0435\u043b\u044c\u043doe \u043f\u043e\u043a\u043e\u043b\u0435\u043d\u0438\u0435","select multiple":"\u0432\u044b\u0431\u0440\u0430\u0442\u044c \u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u043e","inspected":"\u0442\u0435\u0445\u043d. \u043a\u043e\u043d\u0442\u0440\u043e\u043b\u044c","brought from":"\u043f\u0440\u0438\u0432\u0435\u0437\u0435\u043d\u043e \u0438\u0437 \u0441\u0442\u0440\u0430\u043d\u044b","electrically heated windshield":"\u043f\u043e\u0434\u043e\u0433\u0440\u0435\u0432 \u043f\u0435\u0440\u0435\u0434\u043d\u0435\u0433\u043e \u0441\u0442\u0435\u043a\u043b\u0430","mirror heating":"\u043f\u043e\u0434\u043e\u0433\u0440\u0435\u0432 \u0437\u0435\u0440\u043a\u0430\u043b","choose type here":"\u0432\u044b\u0431\u0435\u0440\u0438 \u0442\u0438\u043f \u0437\u0434\u0435\u0441\u044c","racing seats":"\u0441\u043f\u043e\u0440\u0442\u0438\u0432\u043d\u044b\u0435 \u0441\u0438\u0434\u0435\u043d\u044c\u044f","electrically adj. seats":"\u044d\u043b\u0435\u043a\u0442\u0440\u0438\u0447\u0435\u0441\u043a\u0438 \u0440\u0435\u0433. \u0441\u0438\u0434\u0435\u043d\u044c\u044f","cruise control with monitoring the distance to vehicle in front":"\u043a\u0440\u0443\u0438\u0437-\u043a\u043e\u043d\u0442\u0440\u043e\u043b\u044c \u0441 \u0438\u0437\u043c\u0435\u0440\u0435\u043d\u0438\u0435\u043c \u0434\u0438\u0441\u0442\u0430\u043d\u0446\u0438\u0438 \u0434\u043e \u043f\u0435\u0440\u0435\u0434\u043d\u0435\u0433\u043e \u0442\u0440\u0430\u043d\u0441\u043f\u043e\u0440\u0442\u043d\u043e\u0433\u043e \u0441\u0440\u0435\u0434\u0441\u0442\u0432\u0430","keyless-go":"\u0441\u0438\u0441\u0442\u0435\u043c\u0430 \u043e\u0442\u043a\u0440\u044b\u0432\u0430\u043d\u0438\u044f \u0438 \u0437\u0430\u043f\u0443\u0441\u043a\u0430 \u0431\u0435\u0437 \u043a\u043b\u044e\u0447\u0430","closing aid for doors":"\u0432\u0441\u043f\u043e\u043c\u043e\u0433\u0430\u0442\u0435\u043b\u0438 \u0437\u0430\u043a\u0440\u044b\u0432\u0430\u043d\u0438\u044f \u0434\u0432\u0435\u0440\u0435\u0439","rain sensor":"\u0434\u0430\u0442\u0447\u0438\u043a \u0434\u043e\u0436\u0434\u044f","hands free":"\u0441\u0438\u0441\u0442\u0435\u043c\u0430 \"hands free\"","steering wheel adjustment":"\u0440\u0435\u0433\u0443\u043b\u0438\u0440\u0443\u0435\u043c\u044b\u0439 \u0440\u0443\u043b\u044c","ventilated seats":"\u0432\u0435\u043d\u0442\u0438\u043b\u0438\u0440\u0443\u0435\u043c\u044b\u0435 \u0441\u0438\u0434\u0435\u043d\u044c\u044f","adjustable suspension":"\u0440\u0435\u0433\u0443\u043b\u0438\u0440\u0443\u0435\u043c\u043e\u0435 \u043f\u043e\u0434\u0432\u0435\u0441\u043a\u0430","panorama glass roof":"\u043f\u0430\u043d\u043e\u0440\u0430\u043c\u043d\u0430\u044f \u043a\u0440\u044b\u0448\u0430","parking camera":"\u043f\u0430\u0440\u043a\u043e\u0432\u043e\u0447\u043d\u0430\u044f \u043a\u0430\u043c\u0435\u0440\u0430","down folding back rest":"\u0441\u043a\u043b\u0430\u0434\u044b\u0432\u0430\u044e\u0449\u0430\u044f\u0441\u044f \u0441\u043f\u0438\u043d\u043a\u0430 \u0437\u0430\u0434\u043d\u0435\u0433\u043e \u0441\u0438\u0434\u0435\u043d\u044c\u044f","start-stop system":"\u0441\u0442\u0430\u0440\u0442-\u0441\u0442\u043e\u043f \u0441\u0438\u0441\u0442\u0435\u043c\u0430","disability equipment":"\u043e\u0431\u043e\u0440\u0443\u0434\u043e\u0432\u0430\u043d\u0438\u0435 \u0434\u043b\u044f \u0438\u043d\u0432\u0430\u043b\u0438\u0434\u043e\u0432","touring":"\u0443\u043d\u0438\u0432\u0435\u0440\u0441\u0430\u043b","cabriolet":"\u043a\u0430\u0431\u0440\u0438\u043e\u043b\u0435\u0442","pickup":"\u043f\u0438\u043a\u0430\u043f","small commercial vehicle":"\u043c\u0430\u043b\u0435\u043d\u044c\u043a\u0438\u0439 \u0433\u0440\u0443\u0437\u043e\u0432\u043e\u0439 \u043c\u0438\u043a\u0440\u043e\u0430\u0432\u0442\u043e\u0431\u0443\u0441","rigid":"\u0433\u0440\u0443\u0437\u043e\u0432\u0438\u043a","saddle":"\u0441\u0435\u0434\u043b\u043e","chassis":"\u0448\u0430\u0441\u0441\u0438","light trailer":"\u043b\u0435\u0433\u043a\u0438\u0439 \u043f\u0440\u0438\u0446\u0435\u043f","semi-trailer":"\u043f\u043e\u043b\u0443\u043f\u0440\u0438\u0446\u0435\u043f","classical motorcycle":"\u043a\u043b\u0430\u0441\u0441\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u043c\u043e\u0442\u043e\u0446\u0438\u043a\u043b","scooter":"\u0440\u043e\u043b\u043b\u0435\u0440","moped":"\u043c\u043e\u043f\u0435\u0434","bike":"\u0431\u0430\u0439\u043a","cruiser \/ chopper":"\u043a\u0440\u0443\u0438\u0437\u0435\u0440 \/ \u0447\u043e\u043f\u043f\u0435\u0440","motocross bike":"\u043c\u043e\u0442\u043e\u0446\u0438\u043a\u043b \u0434\u043b\u044f \u043a\u0440\u043e\u0441\u0441\u0430","enduro \/ supermoto":"\u044d\u043d\u0434\u0443\u0440\u043e \/ \u0441\u0443\u043f\u0435\u0440\u043c\u043e\u0442\u043e","trial":"","ATV":"ATV","buggy":"","moped car":"","snowmobile":"\u0441\u043d\u0435\u0433\u043e\u0445\u043e\u0434","trailer tent":"\u043f\u0440\u0438\u0446\u0435\u043f \u043f\u0430\u043b\u0430\u0442\u043a\u0430","launch\/motorboat":"\u043a\u0430\u0442\u0435\u0440\/\u043c\u043e\u0442\u043e\u0440\u043d\u0430\u044f \u043b\u043e\u0434\u043a\u0430","yacht":"\u044f\u0445\u0442\u0430 ","waterscooter":"\u0441\u043a\u0443\u0442\u0435\u0440","select make, model":"\u0432\u044b\u0431\u0435\u0440\u0438 \u043c\u0430\u0440\u043a\u0443, \u043c\u043e\u0434\u0435\u043b\u044c","added":"\u0414\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u043e","please select vehicle body type!":"\u043f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430 \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0442\u0438\u043f \u043a\u0443\u0437\u043e\u0432\u0430!","market price query":"\u0420\u044b\u043d\u043e\u0447\u043d\u0430\u044f \u0446\u0435\u043d\u0430","if you don't know your vehicle's worth":"\u0443\u0437\u043d\u0430\u0442\u044c, \u0441\u043a\u043e\u043b\u044c\u043a\u043e \u0441\u0442\u043e\u0438\u0442 \u0430\u0432\u0442\u043e\u043c\u043e\u0431\u0438\u043b\u044c ","look up":"\u041f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c","estonia":"\u042d\u0441\u0442\u043e\u043d\u0438\u044f","latvia":"\u041b\u0430\u0442\u0432\u0438\u044f","lithuania":"\u041b\u0438\u0442\u0432\u0430","germany":"\u0413\u0435\u0440\u043c\u0430\u043d\u0438\u044f","netherlands":"\u0413\u043e\u043b\u043b\u0430\u043d\u0434\u0438\u044f","switzerland":"\u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u044f","belgium":"\u0411\u0435\u043b\u044c\u0433\u0438\u044f","denmark":"\u0414\u0430\u043d\u0438\u044f","austria":"\u0410\u0432\u0441\u0442\u0440\u0438\u044f","france":"\u0424\u0440\u0430\u043d\u0446\u0438\u044f","luxembourg":"\u041b\u044e\u043a\u0441\u0435\u043c\u0431\u0443\u0440\u0433","sweden":"\u0428\u0432\u0435\u0446\u0438\u044f","czech republic":"\u0427\u0435\u0448\u0441\u043a\u0430\u044f \u0440\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430","italy":"\u0418\u0442\u0430\u043b\u0438\u044f","hungary":"\u0412\u0435\u043d\u0433\u0440\u0438\u044f","united states of america":"\u0421\u043e\u0435\u0434\u0438\u043d\u0435\u043d\u043d\u044b\u0435 \u0428\u0442\u0430\u0442\u044b \u0410\u043c\u0435\u0440\u0438\u043a\u0438","finland":"\u0424\u0438\u043d\u043b\u044f\u043d\u0434\u0438\u044f","russia":"\u0420\u043e\u0441\u0441\u0438\u044f","england":"\u0410\u043d\u0433\u043b\u0438\u044f","japan":"\u042f\u043f\u043e\u043d\u0438\u044f","poland":"\u041f\u043e\u043b\u044c\u0448\u0430","bulgaria":"\u0411\u043e\u043b\u0433\u0430\u0440\u0438\u044f","greece":"\u0413\u0440\u0435\u0446\u0438\u044f","ireland":"\u0418\u0440\u043b\u0430\u043d\u0434\u0438\u044f","cyprus":"\u041a\u0438\u043f\u0440","malta":"\u041c\u0430\u043b\u044c\u0442\u0430","united kingdom":"\u0412\u0435\u043b\u0438\u043a\u043e\u0431\u0440\u0438\u0442\u0430\u043d\u0438\u044f","portugal":"\u041f\u043e\u0440\u0442\u0443\u0433\u0430\u043b\u0438\u044f","romania":"\u0420\u0443\u043c\u044b\u043d\u0438\u044f","slovakia":"\u0421\u043b\u043e\u0432\u0430\u043a\u0438\u044f","slovenia":"\u0421\u043b\u043e\u0432\u0435\u043d\u0438\u044f","spain":"\u0418\u0441\u043f\u0430\u043d\u0438\u044f","norway":"\u041d\u043e\u0440\u0432\u0435\u0433\u0438\u044f","turkey":"\u0422\u0443\u0440\u0446\u0438\u044f"},"en":{"you have no outgoing messages.":"","remove from favorites":"","yellow":"","km":"","video":"","__hash_invalidator":"technical string to force invalidate dictionary hash","add to favorites":"","white":"","silver":"","purple":"","red":"","pink":"","orange":"","dark red":"","dark yellow":"","golden":"","gray":"","green":"","light beige":"","light yellow":"","light purple":"","light red":"","light orange":"","light green":"","light gray":"","light blue":"","light brown":"","dark purple":"","dark orange":"","dark green":"","dark brown":"","dark gray":"","dark blue":"","black":"","blue":"","brown":"","dark beige":"","beige":"","ready":"","password":"","register":"","logged in as":"You are logged in as","login":"","logout":"","cancel":"","log in":"","username":"","make, model":"","up to":"","select":"","clear all":"","by year (descending)":"by year (descending) \t","quit":"","there are no saved vehicles to display":"","by price (descending)":"cheapest last","by make":"","by year (ascending)":"by year (ascending)","do you want to quit the application?":"","by price (ascending)":"cheapest first","front-wheel drive":"","rear-wheel drive":"","four-wheel drive":"","diesel":"","gas":"","hybrid":"","electric":"","ethanol":"","manual":"","automatic":"","semi-automatic":"","petrol":"","cabrio":"","coupe":"","station wagon":"","minivan":"","water vehicle":"","racing vehicle":"","hatchback":"","sedan":"","special technics and other":"","suv":"SUV","commercial vehicle":"","bus":"","truck":"","trailer":"","mototechnics":"","caravan":"","passenger car":"","bodytype":"","make":"","model":"","year":"","fuel":"","gearbox":"","drive wheels":"","price":"","bargain price":"","sort":"","any":"","from":"","to":"","back":"","modify search":"","see %n results":"","%n more":"","equipment":"","other-information":"other information","contact-information":"contact information","type":"","searchform":"search","incorrect username or password!":"","result":"","details":"","location":"location","could not parse server's response":"","failed to retrieve data":"","service book":"","connection error":"","exchange":"","not crashed":"","vehicle exchange":"","less options":"","age of ad":"","max mileage":"","color":"","dealer":"","crashed":"","more options":"","up to 2 days":"","up to 3 days":"","up to 7 days":"","http:\/\/www.auto24.ee\/":"http:\/\/eng.auto24.ee\/","it's taking longer than expected.":"It's taking longer than expected..","kw":"kW","power":"Power","up to 1 day":"","this video cannot be viewed on your device.":"","name cannot be empty!":"","comment cannot be empty!":"","you did not fill a required field!":"","name":"","enter the security code:":"","the entered security code is wrong!":"","your comment was blocked on suspicion of spam":"","you must enter a security code!":"","no more comments":"","there are no comments to display":"","read comments":"","article":"","comments":"","comment":"","add a comment":"","no more results":"","loading...":"","there are no more news to display":"","load more":"More","submit":"Submit","please narrow your search if you want notifications!":"Search filter has to be more precise to receive automatic notifications. Search result limit is 1000.","please specify a title for this search!":"","please specify vehicle type!":"","continue on web":"","done":"","next":"","other":"","engine":"","interior view":"","rear view":"","front view":"","phone":"","add photos":"","advertise":"","other model":"","model name":"","edit ad":"","adedit":"Edit Ad","edit":"","my ads":"","saved search":"","saved searches":"","place an ad":"","my favorites":"","my saved searches":"","your query returned no results":"","query":"","query result":"","vehicle queries":"","no vehicles found":"","error while saving search!":"","search saved":"","error while deleting search":"","search deleted":"","really delete?":"","notification email:":"","notify about new ads":"","search title:":"","damages":"","vin or plate number:":"","insurance":"","registration":"","auction":"","select language":"","save search":"","remove favorite":"","add favorite":"","language":"","my auto24":"","news":"","queries":"","ad_instruction_text_post":"","this":"","technical specifications":"","other information":"","search":"","favorites":"","dashboard":"","ad_instruction_text_pre":"Your ad has now been inserted into Auto24 database, but is inactive. To activate it, you will need to visit the site and pay for any services you require.","no email specified by the seller!":"","there are no more messages to display":"","do you want to delete this message?":"","view message":"","invalid_email":"Entered e-mail address is invalid!","telephone":"","email":"","ask extra info":"Request for more info","mail folders":"Mailbox","outbox":"","delete":"","inbox":"","write again":"","message content:":"","reply":"","characters remaining":"characters","send message":"","maximum size of the message is %n characters.":"","mailfrom":"From","mailto":"To","date":"","compose message":"","mailbox":"","model period":"","model trim":"","first registration":"","vat":"VAT","vat 0% (civilian or not a subject to vat)":"VAT 0% (civilian or not a subject to VAT)","price includes vat 20%":"price includes VAT 20%","autocaravan":"","agricultural machinery":"","construction machinery":"","forest machinery":"","communal machinery":"","please specify vehicle type first!":"","you have no saved searches":"","view":"","hide":"","restore":"","site link":"","really hide?":"","bodytype(in detail)":"","ad inserted":"","to site":"auto24.ee","to list":"","order services":"more","stats":"","stop":"end ad","views":"","ad_unhide_message":"Your ad is now public again","too_many_search_results":"Too many search results - please narrow down your search!","order_services_notice":"To complete other actions (adding\/changing services, inserting an auction, etc) you need to visit auto24.ee website.","country_input":"country","location_input":"state or city","mileage":"mileage (km)","last 30 days":"View statistics for the last 30 days.","petrol + gas (lpg)":"","petrol + gas (cng)":"","gas (LPG)":"","gas (CNG)":"","maps":"maps","entries":"","results":"","results \/ timetable":"results","newsdetail":"Article","abs after":"ABS after","track results":"","class":"","all":"","information_about_stage":"Information about stage","timetable":"","schedule":"programme","penalties":"","retired":"","caravan and autocaravan":"","passenger and suv":"","security code":"","you":"","do you want to display your own location on map?":"","group":"Group","no":"no","yes":"","really discontinue?":"","orders\/services":"","my ad":"","do you want to change or delete this image?":"","change":"","select picture source":"","camera":"","picture library":"","ad no longer exists":"","remember":"","saved vehicle":"","saved vehicles":"","delete saved vehicle":"","save vehicle":"","look up vehicle market price":"","enter the vehicle's estonian registration number in the following field":"","detailed query":"","show telephone":"","no results found for":"","check a vehicle's market price":"","vehicle":"","vehicle price":"","ad no longer exists, delete?":"","market price":"","vehicles in estonia":"","no vehicles were found on auto24.lv":"","http:\/\/www.auto24.lv\/":"http:\/\/eng.auto24.lv\/","newer ads first":"","older ads first":"","you have no incoming messages.":"","accept user agreement":"","read":"","used vehicles":"","find yourself a suitable car":"","latest news":"","fresh info on what's happening":"","for managing your ads":"","all information about the event":"","change your preferred language":"English, Eesti, Soumi, \u0420\u0443\u0441\u0441\u043a\u0438\u0439 ","warranty":"warranty","doors":"number of doors","seats":"seats","display":"","parking aid":"parking aid","engine pre-heating":"engine pre-heating","seat heating":"seat heating","cruise control":"cruise control","xenon lights":"Xenon lights","cd player":"CD player","traction control":"traction control","anti skidding":"anti skidding","year from":"year from","year to":"year to","price from":"price from","price to":"price to","monthly payment to":"monthly payment to","transm.":"transm.","drivetrain":"drivetrain","sort by":"sort by","newer first":"newer first","by price":"by price","by year":"by year","list":"list","%1$s on page":"%1$s on page","climate control":"climate control","new of the week":"new of the week","show photos":"show photos","selected by user":"selected by user","passenger car and suv":"passenger car and SUV","motorcycle":"motorcycle","search choice":"search choice","data":"data","power (kw)":"power (kW)","mileage (km)":"mileage (km)","payload (kg)":"payload (kg)","luggage space (m\u00b3)":"luggage space (m\u00b3)","gross weight (kg)":"gross weight (kg)","axle":"axle","displacement (cm\u00b3)":"displacement (cm\u00b3)","unladen weight (kg)":"unladen weight (kg)","length (mm)":"length (mm)","width (mm)":"width (mm)","beds":"beds","abs":"ABS","alarm":"alarm","immobilizer":"immobilizer","central locking":"central locking","power steering":"power steering","leather upholstery":"leather upholstery","tow hitch":"tow hitch","electric windows":"electric windows","alloy wheels":"alloy wheels","sunroof":"sunroof","navigation system":"navigation system","tv":"TV","wc":"WC","refrigerator":"refrigerator","intarder":"intarder","retarder":"retarder","taillift":"taillift","adaptive suspension":"adaptive suspension","tv antenna":"TV antenna","gas cooker":"gas cooker","mileage to (km)":"mileage to (km)","price includes vat":"price includes VAT","price plus vat":"price plus VAT","vat 0%":"VAT 0%","up to %1$d days":"up to %1$d days","superstruct.":"superstruct.","currency":"currency","isothermal van":"isothermal van","refrigerator unit":"refrigerator unit","select all":"select all","model specification":"model specification","all types":"all types","technical data":"technical data","make and model":"make and model","model generation":"model generation","select multiple":"select multiple","inspected":"inspected","brought from":"brought from","electrically heated windshield":"electrically heated windshield","mirror heating":"mirror heating","choose type here":"choose type here","racing seats":"racing seats","electrically adj. seats":"electrically adj. seats","cruise control with monitoring the distance to vehicle in front":"cruise control with monitoring the distance to vehicle in front","keyless-go":"keyless-go","closing aid for doors":"closing aid for doors","rain sensor":"rain sensor","hands free":"hands free","steering wheel adjustment":"steering wheel adjustment","ventilated seats":"ventilated seats","adjustable suspension":"adjustable suspension","panorama glass roof":"panorama glass roof","parking camera":"parking camera","down folding back rest":"down folding back rest","start-stop system":"start-stop system","disability equipment":"disability equipment","touring":"","cabriolet":"","pickup":"","small commercial vehicle":"","rigid":"","saddle":"","chassis":"","light trailer":"","semi-trailer":"","classical motorcycle":"","scooter":"","moped":"","bike":"","cruiser \/ chopper":"","motocross bike":"","enduro \/ supermoto":"","trial":"","ATV":"","buggy":"","moped car":"","snowmobile":"","trailer tent":"","launch\/motorboat":"","yacht":"","waterscooter":"","select make, model":"","added":"Added","please select vehicle body type!":"","market price query":"","if you don't know your vehicle's worth":"","look up":"","estonia":"Estonia","latvia":"Latvia","lithuania":"Lithuania","germany":"Germany","netherlands":"Netherlands","switzerland":"Switzerland","belgium":"Belgium","denmark":"Denmark","austria":"Austria","france":"France","luxembourg":"Luxembourg","sweden":"Sweden","czech republic":"Czech Republic","italy":"Italy","hungary":"Hungary","united states of america":"United States of America","finland":"Finland","russia":"Russia","england":"England","japan":"Japan","poland":"Poland","bulgaria":"Bulgaria","greece":"Greece","ireland":"Ireland","cyprus":"Cyprus","malta":"Malta","united kingdom":"United Kingdom","portugal":"Portugal","romania":"Romania","slovakia":"Slovakia","slovenia":"Slovenia","spain":"Spain","norway":"Norway","turkey":"Turkey"},"fi":{"you have no outgoing messages.":"sinulla ei ole l\u00e4htevi\u00e4 viestej\u00e4","remove from favorites":"POISTA SUOSIKEISTA","yellow":"keltainen","km":"","video":"","__hash_invalidator":"","add to favorites":"LIS\u00c4\u00c4 SUOSIKKEIHIN","white":"valkoinen","silver":"hopea","purple":"violetti","red":"punainen","pink":"roosa","orange":"oranssi","dark red":"tummanpunainen","dark yellow":"tummankeltainen","golden":"kultainen","gray":"harmaa","green":"vihre\u00e4","light beige":"vaaleabeige","light yellow":"vaaleankeltainen","light purple":"vaaleavioletti","light red":"vaaleanpunainen","light orange":"vaaleanoranssi","light green":"vaaleanvihre\u00e4","light gray":"vaaleanharmaa","light blue":"vaaleansininen","light brown":"vaaleanruskea","dark purple":"tummavioletti","dark orange":"tummanoranssi","dark green":"tummanvihre\u00e4","dark brown":"tummanruskea","dark gray":"tummanharmaa","dark blue":"tummansininen","black":"musta","blue":"sininen","brown":"ruskea","dark beige":"tummabeige","beige":"beige","ready":"Valmis","password":"salasana","register":"rekister\u00f6id\u00e4","logged in as":"olet kirjautunut","login":"Kirjautuminen","logout":"Kirjaudu ulos","cancel":"Peruuta","log in":"Kirjaudu sis\u00e4\u00e4n","username":"K\u00e4ytt\u00e4j\u00e4tunnus","make, model":"Merkki, malli","up to":"alkaen","select":"valita","clear all":"Poista kaikki","by year (descending)":"vuosi laskeva","quit":"\u200b\u200bKyll\u00e4","there are no saved vehicles to display":"\u041ele tallentanut yht\u00e4\u00e4n mainoksia","by price (descending)":"kallimmat ennen","by make":"merkin mukaan","by year (ascending)":"vuosi nouseva","do you want to quit the application?":"Haluatko lopettaa sovelluksen?","by price (ascending)":"halpa ensimm\u00e4inen","front-wheel drive":"etuveto","rear-wheel drive":"takaveto","four-wheel drive":"neliveto","diesel":"diiseli","gas":"kaasu","hybrid":"hybridi","electric":"s\u00e4hk\u00f6","ethanol":"etanoli","manual":"manuaalivaihteisto","automatic":"automaattiaihteisto","semi-automatic":"puoliautomaatti","petrol":"bensiini","cabrio":"avoauto","coupe":"kupee","station wagon":"farmari","minivan":"tila-auto","water vehicle":"vesikulkuneuvo","racing vehicle":"kilpa-auto","hatchback":"viistoper\u00e4","sedan":"porrasper\u00e4","special technics and other":"erikoistekniikka ja muu","suv":"maastoauto","commercial vehicle":"pakettiauto","bus":"bussi","truck":"kuorma-auto","trailer":"per\u00e4vaunu","mototechnics":"mototekniika","caravan":"farmari","passenger car":"henkil\u00f6auto","bodytype":"korimalli","make":"merkki","model":"malli","year":"vuosi","fuel":"polttoaine","gearbox":"vaihteisto","drive wheels":"vet\u00e4v\u00e4 akseli","price":"hinta","bargain price":"tarjoushinta","sort":"ryhmittele","any":"kaikki","from":"alkaen","to":"asti","back":"takaisin","modify search":"muokkaa hakua","see %n results":"haku (%n)","%n more":"viel\u00e4 %n","equipment":"varusteet","other-information":"muut tiedot","contact-information":"yhteystiedot","type":"tyyppi","searchform":"haku","incorrect username or password!":"V\u00e4\u00e4r\u00e4 k\u00e4ytt\u00e4j\u00e4tunnus tai salasana!","result":"tulos","details":"tiedot","location":"sijainti","could not parse server's response":"Virheellinen palvelimen vastaus","failed to retrieve data":"Ei voi hakea tietoja","service book":"Huoltokirja","connection error":"Yhteysvirhe","exchange":"vaihto","not crashed":"kolaroimaton","vehicle exchange":"Vaihto","less options":"","age of ad":"Ilmoituksen ik\u00e4","max mileage":"Max mittarilukema","color":"V\u00e4ri","dealer":"Myyj\u00e4","crashed":"kolaroitu","more options":"Lis\u00e4\u00e4 vaihtoehtoja","up to 2 days":"jopa 2 p\u00e4iv\u00e4\u00e4","up to 3 days":"jopa 3 p\u00e4iv\u00e4\u00e4","up to 7 days":"jopa 7 p\u00e4iv\u00e4\u00e4","http:\/\/www.auto24.ee\/":"http:\/\/fin.auto24.ee\/","it's taking longer than expected.":"","kw":"kW","power":"Teho","up to 1 day":"enint\u00e4\u00e4n yhden p\u00e4iv\u00e4n","this video cannot be viewed on your device.":"T\u00e4t\u00e4 videota ei voi katsella laitteen.","name cannot be empty!":"Nimi ei voi olla tyhj\u00e4!","comment cannot be empty!":"Kommentti ei voi olla tyhj\u00e4!","you did not fill a required field!":"Et t\u00e4ytt\u00e4nyt pakollinen kentt\u00e4","name":"Nimi","enter the security code:":"Anna turvallisuus-koodi","the entered security code is wrong!":"Tuli turvallisuus-koodi on v\u00e4\u00e4r\u00e4!","your comment was blocked on suspicion of spam":"roskapostin suodatin on tukossa kommenttisi","you must enter a security code!":"Sinun t\u00e4ytyy sy\u00f6tt\u00e4\u00e4 turvakoodi","no more comments":"Ei enemp\u00e4\u00e4 kommentteja","there are no comments to display":"Kommentit poissa","read comments":"Lue kommentit","article":"Uutinen","comments":"Kommentti","comment":"Kommentti","add a comment":"Lis\u00e4\u00e4 kommentti","no more results":"Ei enemp\u00e4\u00e4 tuloksia","loading...":"Ladataan...","there are no more news to display":"En\u00e4\u00e4 ei ole uutinen n\u00e4ytt\u00e4\u00e4","load more":"Katso lis\u00e4\u00e4","submit":"Antaa","please narrow your search if you want notifications!":"Haku-suodatin on tarkemmin voit saada automaattisen ilmoituksen. Hakutulos raja on 1000.","please specify a title for this search!":"M\u00e4\u00e4rit\u00e4 otsikko t\u00e4m\u00e4 haku!","please specify vehicle type!":"Anna ajoneuvotyypin!","continue on web":"edelleen p\u00e4\u00e4ll\u00e4","done":"tehty","next":"seuraava","other":"muu","engine":"moottori","interior view":"katso sis\u00e4lt\u00e4","rear view":"katso takaap\u00e4in","front view":"katso edest\u00e4","phone":"puhelin","add photos":"lis\u00e4\u00e4 kuvia","advertise":"j\u00e4t\u00e4 ilmoitus","other model":"muu malli","model name":"mallin tarkennus","edit ad":"muokkaa ilmoitusta","adedit":"muokkaa ilmoitusta","edit":"muokata","my ads":"Minun ilmoitukset","saved search":"tallennettu haku","saved searches":"tallennettuja hakuja","place an ad":"J\u00e4t\u00e4 ilmoitus","my favorites":"Minun suosikkeja","my saved searches":"Minun tallennetut haut","your query returned no results":"kysely ei tuottanut tuloksia","query":"Kysy\u00e4","query result":"Kyselyn tulos","vehicle queries":"Ajoneuvon kyselytd","no vehicles found":"Ajoneuvoja ei l\u00f6ytynyt","error while saving search!":"Virhe tallennettaessa haku!","search saved":"Haku tallennettu","error while deleting search":"Virhe poistettaessa haku","search deleted":"Etsi poistettu","really delete?":"Haluatko varmasti poistaa?","notification email:":"Ilmoituss\u00e4hk\u00f6posti:","notify about new ads":"Ilmoita uusista mainoksia","search title:":"Haku otsikko:","damages":"Tien vahingoista","vin or plate number:":"VIN tai rekisterinumero:","insurance":"Vakuutus","registration":"Rekister\u00f6intitiedot","auction":"huutokauppa","select language":"valitse kieli","save search":"Tallenna haku","remove favorite":"","add favorite":"","language":"KIELI","my auto24":"MINUN AUTO24","news":"uutiset","queries":"KYSELYT","ad_instruction_text_post":"sivu peasaidi p\u00e4\u00e4ll\u00e4.","this":"t\u00e4m\u00e4","technical specifications":"tekniset tiedot","other information":"muut tiedot","search":"haku","favorites":"Suosikit","dashboard":"ETUSIVU","ad_instruction_text_pre":"Sinun Ilmoitus on nyt tallennettu tietokantaan auto24, mutta sen k\u00e4ytt\u00f6\u00f6n sinun pit\u00e4\u00e4 viel\u00e4 maksaa Ilmoituksen ja muiden tarvittavien palvelujen eest.Selleks teille k\u00e4y","no email specified by the seller!":"Ei s\u00e4hk\u00f6postia m\u00e4\u00e4ritelty myyj\u00e4!","there are no more messages to display":"Ei ole enemp\u00e4\u00e4 viestej\u00e4 n\u00e4ytt\u00e4m\u00e4\u00e4n","do you want to delete this message?":"Haluat poistaa t\u00e4m\u00e4n viestin?","view message":"N\u00e4yt\u00e4 viesti","invalid_email":"Tuli s\u00e4hk\u00f6postiosoite ei kelpaa","telephone":"Puhelin","email":"S\u00e4hk\u00f6posti","ask extra info":"Haluan lis\u00e4tietoja","mail folders":"Postilaatikon","outbox":"L\u00e4htev\u00e4t","delete":"Poistaa","inbox":"Saapuneet","write again":"Kirjoittaa uudelleen","message content:":"Viestin teksti:","reply":"Vastata","characters remaining":"merkkej\u00e4","send message":"L\u00e4het\u00e4 viesti","maximum size of the message is %n characters.":"Maksimikoko viesti on %n merkki\u00e4","mailfrom":"L\u00e4hett\u00e4j\u00e4","mailto":"Vastaanottaja","date":"Ajankohta","compose message":"Kirjoita viesti","mailbox":"postilaatikon","model period":"mallin sukupolvi","model trim":"mallin tarkennus","first registration":"Ensimm\u00e4isen rekister\u00f6innin","vat":"ALV","vat 0% (civilian or not a subject to vat)":"ALV 0% (yksityshenkil\u00f6 tai ei arvonlis\u00e4verovelvollinen)","price includes vat 20%":"Hinta sis\u00e4lt\u00e4\u00e4 ALV 20%","autocaravan":"asuntovaunu","agricultural machinery":"maataloustekniikka","construction machinery":"rakennustekniikka","forest machinery":"mets\u00e4koneet","communal machinery":"kunnallistekniikka","please specify vehicle type first!":"tarkennettava ajoneuvotyypin ensin!","you have no saved searches":"sinulla ei ole tallennettuja hakuja","view":"tarkastella","hide":"piilota ilmoitus","restore":"palautta ilmoitus","site link":"sivuston linkki\u00e4","really hide?":"todella piilottaa?","bodytype(in detail)":"Korimalli (tarkennus)","ad inserted":"mainos lis\u00e4tty","to site":"auto24.ee","to list":"listaan","order services":"lis\u00e4\u00e4","stats":"tilastot","stop":"lopeta ilmoitus","views":"katsotut","ad_unhide_message":"Mainoksesi on nyt julkinen j\u00e4lleen","too_many_search_results":"Muistutuksen saamiseksi tarkenna hakua (tuloksia enint\u00e4\u00e4n 1000s).","order_services_notice":"Voit suorittaa muita toimintoja (kuten lis\u00e4\u00e4m\u00e4ll\u00e4 \/ muuttaa palveluja tai lis\u00e4\u00e4m\u00e4ll\u00e4 huutokauppa, jne.) sinun t\u00e4ytyy k\u00e4yd\u00e4 auto24.ee verkkosivuilla.","country_input":"valtio","location_input":"kaupunki tai osavaltio","mileage":"mittarilukema (km)","last 30 days":"Auton katsojien m\u00e4\u00e4r\u00e4 p\u00e4iv\u00e4n 30 j\u00e4lkeen.","petrol + gas (lpg)":" bensiini + kaasu (LPG)","petrol + gas (cng)":" bensiini +  kaasu (CNG)","gas (LPG)":"kaasu (LPG)","gas (CNG)":" kaasu (CNG)","maps":"kartat","entries":"merkinn\u00e4t","results":"tuloksia","results \/ timetable":"tulokset","newsdetail":"uutiset","abs after":"ABS j\u00e4lkeen","track results":"absoluuttinen tulokset","class":"luokka","all":"kaikki","information_about_stage":"erikoiskoe info","timetable":"Erikoiskoe aikataulu","schedule":"Ohjelma","penalties":"rankaistukset","retired":"keskeytt\u00e4nyt","caravan and autocaravan":"farmari  ja asuntovaunu","passenger and suv":"henkil\u00f6auto ja maastoauto","security code":"turvakoodi","you":"","do you want to display your own location on map?":"Haluatko n\u00e4hd\u00e4 sijaintisi kartalla?","group":"Group","no":"ei","yes":"juu","really discontinue?":"todella lopettaa?","orders\/services":"Tilaukset \/ Palvelut","my ad":"mainokset","do you want to change or delete this image?":"haluatko muuttaa tai poistaa t\u00e4m\u00e4n kuvan?","change":"vaihtaa","select picture source":"valitse kuval\u00e4hde","camera":"kamera","picture library":"tallennettuja kuvia","ad no longer exists":"Ilmoitukseen ei en\u00e4\u00e4 ole","remember":"muista minut","saved vehicle":"tallennettu ajoneuvon","saved vehicles":"tallennettu ajoneuvot","delete saved vehicle":"poistaa tallennettuja","save vehicle":"tallenna auto","look up vehicle market price":"Etsi\u00e4 ajoneuvon markkinahinta","enter the vehicle's estonian registration number in the following field":"Anna ajoneuvon Viron rekisterinumero","detailed query":"yksityiskohtainen kysely","show telephone":"n\u00e4yt\u00e4 numero","no results found for":"ei l\u00f6ytynyt yht\u00e4\u00e4n kuvaa","check a vehicle's market price":"Etsi\u00e4 ajoneuvon markkinahinta","vehicle":"Ajoneuvo","vehicle price":"Ajoneuvon hinta","ad no longer exists, delete?":"ilmoitus ei ole en\u00e4\u00e4 olemassa, poistaa?","market price":"Markkinahinta","vehicles in estonia":"","no vehicles were found on auto24.lv":"","http:\/\/www.auto24.lv\/":"","newer ads first":"uusimmat ensin","older ads first":"vanhemmat ennen","you have no incoming messages.":"sinulla ei ole saapuvia viestej\u00e4","accept user agreement":"Hyv\u00e4ksy k\u00e4ytt\u00e4j\u00e4sopimus","read":"lukea","used vehicles":"k\u00e4ytetyt ajoneuvot","find yourself a suitable car":"huomaat sopivan auton","latest news":"viimeisimm\u00e4t uutiset","fresh info on what's happening":"tuoreet uutiset joka p\u00e4iv\u00e4","for managing your ads":"hallintaan mainokset","all information about the event":"kaikki tiedot tapahtumasta","change your preferred language":"English, Eesti, Soumi, \u0420\u0443\u0441\u0441\u043a\u0438\u0439 ","warranty":"takuu","doors":"ovien lukum\u00e4\u00e4r\u00e4","seats":"istuimet","display":"n\u00e4ytteillepano","parking aid":"pys\u00e4k\u00f6intitutka","engine pre-heating":"lohkol\u00e4mmitin","seat heating":"penkinl\u00e4mmittimet","cruise control":"vakionopeuss\u00e4\u00e4din","xenon lights":"Xenon valot","cd player":"CD","traction control":"luistonesto","anti skidding":"sivuluistonesto","year from":"vuosi min.","year to":"vuosi max.","price from":"hinta min.","price to":"hinta max.","monthly payment to":"kuukausi-maksu max.","transm.":"vaihteisto","drivetrain":"vetotapa","sort by":"ryhmittele","newer first":"uusimmat ensin","by price":"hinnan mukaan","by year":"vuoden mukaan","list":"n\u00e4yt\u00e4","%1$s on page":"%1$s kerralla","climate control":"ilmastointi","new of the week":"viikon uudet","show photos":"n\u00e4yt\u00e4 kuvalliset","selected by user":"k\u00e4ytt\u00e4j\u00e4n mukaan","passenger car and suv":"henkil\u00f6auto ja maastoauto","motorcycle":"moottoripy\u00f6r\u00e4","search choice":"haun valinnat","data":"tiedot","power (kw)":"teho (kW)","mileage (km)":"mittarilukema (km)","payload (kg)":"kantavuus (kg)","luggage space (m\u00b3)":"tavaratila (m\u00b3)","gross weight (kg)":"kokonaisp. (kg)","axle":"pulttijako","displacement (cm\u00b3)":"moottorin tilav. (cm\u00b3)","unladen weight (kg)":"omapaino (kg)","length (mm)":"pituus (mm)","width (mm)":"leveys (mm)","beds":"makuupaikkoja","abs":"ABS","alarm":"varash\u00e4lytin","immobilizer":"k\u00e4ynnistyksen.","central locking":"keskuslukitus","power steering":"ohjaustehostin","leather upholstery":"nahkaverhoilu","tow hitch":"vetokoukku","electric windows":"s\u00e4hk\u00f6ikkunat","alloy wheels":"kevytmetallivanteet","sunroof":"kattoikkuna","navigation system":"navigaatiolaite","tv":"TV","wc":"WC","refrigerator":"j\u00e4\u00e4kaappi","intarder":"intarder","retarder":"retarder","taillift":"per\u00e4laitanosturi","adaptive suspension":"ilmajousitus","tv antenna":"antenni","gas cooker":"kaasuhella","mileage to (km)":"mittarilukema (km)","price includes vat":"hintaan sis\u00e4ltyy ALV","price plus vat":"hintaan lis\u00e4\u00e4ntyy ALV","vat 0%":"ALV 0%","up to %1$d days":"%1$d p\u00e4iv\u00e4\u00e4","superstruct.":"p\u00e4\u00e4llisrakenne","currency":"valuutta","isothermal van":"isoterminen umpikori","refrigerator unit":"j\u00e4\u00e4hdytyskone","select all":"valitse kaikki","model specification":"mallin tarkennus","all types":"yleishaku","technical data":"tekniset tiedot","make and model":"merkki ja malli","model generation":"malli sukupolvi","select multiple":"valitse useampi","inspected":"tekn. katsastettu","brought from":"tuotu","electrically heated windshield":"s\u00e4hk\u00f6l\u00e4mmitteinen tuulilasi","mirror heating":"peilien l\u00e4mmitys","choose type here":"valitse tyyppi t\u00e4\u00e4ll\u00e4","racing seats":"urheiluistuimet","electrically adj. seats":"s\u00e4hk\u00f6iset istuimiens\u00e4\u00e4timet","cruise control with monitoring the distance to vehicle in front":"vakionopeuss\u00e4\u00e4din pit\u00e4\u00e4 et\u00e4isyytt\u00e4 automaattisesti","keyless-go":"kaukolukitus- ja k\u00e4ynnistysj\u00e4rjestelm\u00e4","closing aid for doors":"s\u00e4hk\u00f6toiminen oven sulkija","rain sensor":"sadetunnistin","hands free":"hands free j\u00e4rjestelm\u00e4","steering wheel adjustment":"s\u00e4\u00e4dett\u00e4v\u00e4 ohjauspylv\u00e4s","ventilated seats":"tuuletetut istuimet","adjustable suspension":"s\u00e4\u00e4dett\u00e4v\u00e4 jousitus","panorama glass roof":"panoraamakatto (lasista)","parking camera":"pys\u00e4k\u00f6intikamera","down folding back rest":"takapenkkien k\u00e4\u00e4ntyv\u00e4t selk\u00e4nojat","start-stop system":"start-stop j\u00e4rjestelm\u00e4","disability equipment":"invavarusteet","touring":"touring","cabriolet":"avoauto","pickup":"avolava","small commercial vehicle":"pieni pakettiauto","rigid":"kuorma-auto","saddle":"nuppi","chassis":"kuorma-autoalustat","light trailer":"per\u00e4k\u00e4rry","semi-trailer":"puoliper\u00e4vaunu","classical motorcycle":"klassinen py\u00f6r\u00e4","scooter":"skootteri","moped":"mopo","bike":"bike","cruiser \/ chopper":"","motocross bike":"crossipy\u00f6r\u00e4","enduro \/ supermoto":"","trial":"trial py\u00f6r\u00e4","ATV":"m\u00f6nkij\u00e4","buggy":"buggy","moped car":"mopoauto","snowmobile":"moottorikelkka","trailer tent":"per\u00e4vaunun pressu","launch\/motorboat":"pikavene\/moottoorivene","yacht":"jahti","waterscooter":"vesijetti","select make, model":"Valitse merkki, malli","added":"lis\u00e4tty","please select vehicle body type!":"valitse ajoneuvo korimalli!","market price query":"Markkinahinta","if you don't know your vehicle's worth":"jos et tied\u00e4 autosi arvoinen","look up":"Etsi\u00e4","estonia":"Viro","latvia":"Latvia","lithuania":"Liettua","germany":"Saksa","netherlands":"Hollanti","switzerland":"Sveitsi","belgium":"Belgia","denmark":"Tanska","austria":"It\u00e4valta","france":"Ranska","luxembourg":"Luxemburg","sweden":"Ruotsi","czech republic":"Tsekin tasavalta","italy":"Italia","hungary":"Unkari","united states of america":"Amerikka","finland":"Suomi","russia":"Russia","england":"Englanti","japan":"Japani","poland":"Puola","bulgaria":"Bulgaria","greece":"Kreikka","ireland":"Irlanti","cyprus":"Kypros","malta":"Malta","united kingdom":"Iso-Britannia","portugal":"Portugali","romania":"Romania","slovakia":"Slovakia","slovenia":"Slovenia","spain":"Espanja","norway":"Norja","turkey":"Turkki"}}}

function MainpageService(){
}

MainpageService.prototype.getAds = function(callback){
		function onready(data){
			if(callback){
				callback(data.q.response);
			}
		}
		Login.call(Search.getAbsUrl('services/data_json.php?q=front_ads&locale='+Local.locale),{}, onready, true);
}

MainpageService.prototype.renderSliderAd = function(id,data){
	var $item = $("<div class='mainPageAd' style='height:6em' data-slider-index='"+id+"'><img class='owl-lazy' style='height:100%' data-src='"+data.image+"'/></div>");
	
	var title = data.carTitle;
	if(title == undefined){
		title = data.mark+" "+data.model;
	}
	
	$item.prepend("<div class='captionTop'>"+title+"</div>");
	$item.append("<div class='captionBottom'>"+data.price_with_currency+"</div>");
	
	$item.attr('data-dbt',data.db_tables_id);
	
	if(data.db_tables_id == 3){
		$item.attr('rel',data.referring_table_row_id);	
	}else{
		$item.attr('rel',Local.tr('http://www.auto24.ee/')+data.link);
	}
	
	return $item;
}

/**
 * The FavService object handles fetching, caching, operations, and display of data related to faved ads.
 * This class relies on MobileService to perform its json queries.
 * Depends on Search being instantiated for getAbsUrl.
 * @class
 */

function FavService(){
	/**
	 * contains the list of known faves as well as their data if it has been queried before
	 * @type array
	 */
}

/**
 * Saves an ad to favorites list.
 * UI elements to be updated after completion should be handled via the callback. 
 * This function includes an ugly hack-around for Login.authCall since the latter cannot handle post-login checks
 * @param {int} id the id number of the ad to be faved
 * @param {function} [callback] the function to be executed on success
 * @function
 * @returns {void}
 */
FavService.prototype.saveFav=function(id, callback){
	var self = this;
	
	function onready(data){
		if(callback) callback();
	}
	var url = Search.getAbsUrl('services/fav_json.php?action=save&id='+id);
	if (!Login.isLoggedin){
		Login.showLogin(function(){
			Login.call(url, {}, onready);
		}, false);
	}else{
		Login.call(url, {}, function(json, status, jqxhr){
			if (json.status=='need_auth'){
				Login.isLoggedin = false;
				Login.updateUI();
				Login.showLogin(function(){
					Login.call(url, {}, onready);
				}, false);
			}else{
				onready(json);
			}
		});
	}
};

/**
 * Deletes (or, rather, archives) a faved ad.
 * UI elements to be updated after completion should be handled via the callback.
 * @param {int} id the id number of the ad, whose fave is to be removed
 * @param {function} [callback] the function to be executed on success
 * @function
 * @returns {void}
 */
FavService.prototype.deleteFav=function(id, callback){
	var self = this;
	function onready(data){
		if(callback) callback();
	}
	Login.authCall(Search.getAbsUrl('services/fav_json.php?action=delete&id='+id),{}, onready);
};

/**
 * Queries the server for basic details of faves in range and displays them.
 * Uses an auth call, so will redirect to login if needed.
 * @param {fucntion}ready success callback
 * @returns {void}
 */
FavService.prototype.getPage=function(ready){
		var self = this;
		
		function onready(data){
			var data_count = data.length;
			var thisNode = $('#favorites');
			
			var jResultContainer = thisNode.find('.results');
			if (jResultContainer.length==0) {
				var resultContainer = document.createElement('div');
				resultContainer.setAttribute('class', 'results scrollFrame');
				thisNode.append(resultContainer);
			}
			else {
				var resultContainer = jResultContainer.get(0);
			}
		
			resultContainer.innerHTML = '';
			self.list = {};
			
			if(data_count > 0){
				for (var i=0; i<data_count; i++) {
					var row = data[i];
					var item = UI.getResultItem(row, UI.sections.login.pages.favDetail);
					resultContainer.appendChild(item);
				}}
			else{
				var emptyFavs = document.createElement('div');
				emptyFavs.setAttribute('class','emptyFavs');
				emptyFavs.innerHTML = Local.tr('There are no saved vehicles to display');
				resultContainer.appendChild(emptyFavs);
			}
			setTimeout(function(){
				if(ready){ready()};
			},100);
		}
		
		Login.authCall(Search.getAbsUrl('services/fav_json.php?action=page&archive=1&locale='+Local.locale),{}, onready, true);
}


function VpcService(){
}

VpcService.prototype.version = 1;

VpcService.prototype.getVehicleDataByNumber = function (plate, captcha, callback){
	var url = Search.getAbsUrl('services/vpc_json.php?action=getPrices&captcha='+captcha+'&vpc_reg_nr='+plate+'&locale='+Local.locale+"&version="+this.version);
	Login.call(url, {}, callback)
}

VpcService.prototype.getCaptcha = function(callback){
	var url = Search.getAbsUrl('services/vpc_json.php?action=getCaptcha&version='+this.version);
	Login.call(url, {}, callback)
}

function MailboxService(){
}

MailboxService.prototype.inboxOffset = 0;
MailboxService.prototype.outboxOffset = 0;
MailboxService.prototype.limit = 10;

MailboxService.prototype.getMessageCounts = function(callback){
	Login.authCall(Search.getAbsUrl('services/mail_json.php?action=folders'),{}, callback, true);
}

MailboxService.prototype.sendQuestion = function(id, message, callback, captcha, email, phone, subject){
	function onready(data){
		if (data.notices.error.length == 0){
			UI.alert(data.notices.success[0]);
			if(callback) callback(data);
		}else{
			var error = data.notices.error[0];
			
			if (error == 'wrong_captcha'){
				UI.alert('The entered security code is wrong!');
			}else if (error == 'no_captcha'){
				UI.alert('You must enter a security code!');
			}else if (error == 'blocked'){
				UI.alert('Your comment was blocked on suspicion of spam');
			}else if (error == 'invalid'){
				UI.alert('You did not fill a required field!');
			}else{
				UI.alert(data.notices.error[0]);
			}
		}
	}
	
	Login.authCall(Search.getAbsUrl('services/mail_json.php?action=write&locale='+Local.locale),{
		id:id, 
		msg:message, 
		email:email, 
		phone:phone, 
		subject:subject, 
		captcha:captcha
	}, onready, true);
}

MailboxService.prototype.writeReply = function(id, message, callback){
	function onready(data){
		if (data.notices.error.length == 0){
			UI.alert(data.notices.success[0]);
			if(callback) callback(data);
		}else{
			var error = data.notices.error[0];
			
			if (error == 'wrong_captcha'){
				UI.alert('The entered security code is wrong!');
			}else if (error == 'no_captcha'){
				UI.alert('You must enter a security code!');
			}else if (error == 'blocked'){
				UI.alert('Your comment was blocked on suspicion of spam');
			}else if (error == 'invalid'){
				UI.alert('You did not fill a required field!');
			}else{
				UI.alert(data.notices.error[0]);
			}
		}
	}
	id = parseInt(id);
	Login.authCall(Search.getAbsUrl('services/mail_json.php?action=reply&locale='+Local.locale),{
		id:id,
		msg:message,
	}, onready, true);	
}

MailboxService.prototype.writeFollow = function(id, message, callback){
	function onready(data){
		if (data.notices.error.length == 0){
			UI.alert(data.notices.success[0]);
			if(callback) callback(data);
		}else{
			var error = data.notices.error[0];
			
			if (error == 'wrong_captcha'){
				UI.alert('The entered security code is wrong!');
			}else if (error == 'no_captcha'){
				UI.alert('You must enter a security code!');
			}else if (error == 'blocked'){
				UI.alert('Your comment was blocked on suspicion of spam');
			}else if (error == 'invalid'){
				UI.alert('You did not fill a required field!');
			}else{
				UI.alert(data.notices.error[0]);
			}
		}
	}
	id = parseInt(id);
	Login.authCall(Search.getAbsUrl('services/mail_json.php?action=follow&locale='+Local.locale),{
		id:id,
		msg:message,
	}, onready, true);	
}


MailboxService.prototype.deleteMessage = function(id, mode, callback){
	id = parseInt(id);
	Login.authCall(Search.getAbsUrl('services/mail_json.php?action=delete&id='+id+'&locale='+Local.locale),{mode:mode}, callback, true);	
}

/**
 * Render a reply form for message with provided id into given node.
 * 
 * @param {int}
 *            id the identifier of the message to reply to
 * @param {JQuery}
 *            node the jquery object that will receive the rendered form
 * @param {function}
 *            callback the funciton to execute on successful message submission
 */
MailboxService.prototype.answerForm = function(id, node, callback){
	var self = this;
	function onready(data){
		self.renderForm(data,node,function(text){
			self.writeReply(id, text, callback);
		});
		var extraFields = '<div class="mailQuote">'+data.quote.info+"<div class='quoteText'>"+data.quote.text+'</div></div>';
		node.find('.contentContainer').prepend(extraFields);	
	}
	
	id = parseInt(id);
	Login.authCall(Search.getAbsUrl('services/mail_json.php?action=compose_answer&id='+id+'&locale='+Local.locale),{}, onready, true);	
}

/**
 * Render a composition form for a follow-up message
 * 
 * @param {int}
 *            id the identifier of the message to follow up
 * @param {JQuery}
 *            node the jquery object that will receive the rendered form
 * @param {function}
 *            callback the function to execute on successful message submission
 */
MailboxService.prototype.followForm = function(id, page, callback){
	var self = this;
	var node = page.node;
	function onready(data){
		if(data.notices.error.length == 0){
			node.empty();
			self.renderForm(data, node, function(text, captcha){
				self.writeFollow(id, text, callback);
			});
		}else{
			UI.alert(data.notices.error[0]);
			UI.hashnum++;
			var hash = 'mail/mailOutbox/' + UI.hashnum + '/';
			UI.hashLink(hash);
		}
		// var extraFields = '<div class="mailQuote">'+data.quote.info+"<div
		// class='quoteText'>"+data.quote.text+'</div></div>';
		// node.find('.contentContainer').prepend(extraFields);
	}	
	id = parseInt(id);
	Login.authCall(Search.getAbsUrl('services/mail_json.php?action=compose_follow&id='+id+'&locale='+Local.locale),{}, onready, true);	
}

/**
 * Render an ask-extra-info composition form for provided ad into a dom node,
 * and show the page.
 * 
 * @param {int}
 *            id ad's id number
 * @param {UIPage}
 *            node the UIPage to render the form into.
 * @param {function}
 *            callback the function to be executed on succesful message
 *            submission
 * @returns {void}
 */
MailboxService.prototype.questionForm = function(id, page, callback){
	var self = this;
	var node = page.node;
	function onready(data){
		if(data.dealer>1 && data.has_email==0){
			UI.alert('No email specified by the seller!');
			callback();
		}
		else{
			node.empty();
			self.renderForm(data, node, function(text, captcha){
				if (page.isShop){
					var email = node.find('.mailEmail').val();
					var phone = node.find('.mailPhone').val();
					var subject = node.find('.mailSubject').val();
					self.sendQuestion(id, text, callback, captcha, email, phone, subject);
				}else{
					self.sendQuestion(id, text, callback, captcha);
				}
			}, true);
			page.isShop = (data.dealer>1);
			if(page.isShop){
				var extraFields = '<input type=hidden class="mailSubject" value="'+data.subject+'"/><p class="label">'+Local.tr('Email')+'</p><input type="email" class="mailEmail" value="'+data.email+'"/><p class="label">'+Local.tr('Telephone')+'</p><input type="tel" class="mailPhone"/>';
			}
			page.node.find('.contentContainer').prepend(extraFields);
			
			if(UI.isApple && !UI.isIOS5){
				page.node.find('.contentContainer input').bind("touchstart",
					function(){
						$(this).focus();
					}
				);
			}
			page.section.showPage(page.name);
		}
	}
	id = parseInt(id);
	Login.authCall(Search.getAbsUrl('services/mail_json.php?action=compose&id='+id+'&locale='+Local.locale),{}, onready, true);	
}

/**
 * Generate a message form and render to provided node
 * 
 * @param {object}
 *            data containing variables for the form, such as sender, recipient,
 *            tags, and subject.
 * @param {JQuery}
 *            node containing the JQ node(s) to receive the rendered form
 * @param {function}
 *            onsubmit function(text) that will be executed with form's id and
 *            text on form submission.
 * @param {boolean]
 *            useCaptcha whether to show/use captcha field
 * @returns {void}
 */
MailboxService.prototype.renderForm = function(data, node, onsubmit, useCaptcha){
		var self = this;
		var jResultContainer = node.find('.results');
		if (jResultContainer.length==0) {
			var wrap = document.createElement('div');
			wrap.setAttribute('class', 'results scrollFrame');
			node.append(wrap);
		}
		else {
			var wrap = jResultContainer.get(0);
		}
		var datatable = document.createElement('div');
		datatable.setAttribute('class', 'main-data');
		
		self.renderDetailDataRow(Local.tr("mailFrom"),data.author, datatable);
		self.renderDetailDataRow(Local.tr("mailTo"),data.recipient, datatable);
		wrap.appendChild(datatable);
		
		var event = UI.isTouchy?"touchstart":"click";
		
		var title = document.createElement('div');
		title.setAttribute('class', 'title');
		title.innerHTML = data.subject+data.tag;
		wrap.appendChild(title);
		
		var contentContainer = document.createElement('div');
		contentContainer.setAttribute('class', 'contentContainer');
		
		if(!!useCaptcha){
			
			var captchaContainer = document.createElement('div');
			captchaContainer.setAttribute('class', 'captchaContainer');
			
			var captchaLabel = document.createElement('p');
			captchaLabel.setAttribute('class', 'label');
			captchaLabel.innerHTML = Local.tr('Enter the security code:');
			
			var captchaImg = document.createElement('img');
			captchaImg.setAttribute('class', 'captchaImg');
			captchaImg.setAttribute('src', Search.getRoot(data.captcha));
			
			var captchaInput = document.createElement('input');
			captchaInput.setAttribute('class','captchaInput');
			captchaInput.setAttribute('class','comment-input');
			
			var captchaReload = document.createElement('div');
			captchaReload.setAttribute('class', 'captchaReload');

			captchaContainer.appendChild(captchaInput);
			captchaContainer.appendChild(captchaImg);
			captchaContainer.appendChild(captchaReload);
			
			captchaReload.onclick = function(){
				UI.clicked(this);
				Login.getCaptcha(function(data){
					$(captchaImg).attr('src', Search.getRoot(data.captcha));
					$(captchaInput).val('');
				});
			}
	
			contentContainer.appendChild(captchaLabel);
			contentContainer.appendChild(captchaContainer);
		}
		
		var label = document.createElement('p');
		label.innerHTML = Local.tr('Message Content:');
		label.setAttribute('class','label');
		contentContainer.appendChild(label);
		
		var content = document.createElement('textarea');
		content.setAttribute('class', 'content');
		content.setAttribute('maxlength',data.length);
		contentContainer.appendChild(content);
		
		var stamp = new Date().getTime();
		var counterId = 'notice-charcount-'+stamp;
		
    	$(label).append('<div class="charcount" id="'+counterId+'"></div>');
		
		var submit = document.createElement('input');
		submit.setAttribute('type','submit');
		submit.setAttribute('value', Local.tr('Send Message'));
		submit.setAttribute('class', 'input-submit');
		
		$(submit).bind(event, function(){onsubmit(content.value, !!useCaptcha?captchaInput.value:undefined)});
		
		var submitContainer = document.createElement('div');
		submitContainer.setAttribute('class', 'submitContainer');
		submitContainer.appendChild(submit);
		
		wrap.appendChild(contentContainer);
		
		wrap.appendChild(submitContainer);
		
		setTimeout(function(){
	        $(content).charslimit({
	            counter_id: counterId,
	            counter_after: "/"+data.length,
	            counter_used:true
	        });
	        
			if(UI.isApple && !UI.isIOS5){
				$(content).bind('touchstart',function(){
					$(this).focus();
				});
			}
			$(wrap).find('button,input[type=button],input[type=submit]').on("click",function(){
				UI.clicked(this);
			});

		},0);
}

/**
 * Get messages from inbox/outbox folder and render them to appropriate page
 * 
 * @param {boolean}
 *            mode true for outbox, false or omit for inbox
 * @param {int}
 *            offset the message number to start fetching from
 * @param {int}
 *            limit the number of messages to fetch
 */
MailboxService.prototype.getFolder = function(mode, offset, limit){
		var self = this;
		
		var event = "click";
		
		if(typeof(offset)==='undefined'){
			if(mode){
				offset = this.outboxOffset;
			}else{
				offset = this.inboxOffset;
			}
		}
		
		if(typeof(limit)==='undefined'){
			limit = this.limit;
		}
		
		function onready(data){
			var data_count = data.length;
		
			var thisNode = mode?$('#mailOutbox'):$('#mailInbox');
						
			var jResultContainer = thisNode.find('.results');
			if (jResultContainer.length==0) {
				var resultContainer = document.createElement('div');
				resultContainer.setAttribute('class', 'results scrollFrame');
				thisNode.append(resultContainer);
			}
			else {
				var resultContainer = jResultContainer.get(0);
			}
			
			if(data_count > 0){
				for (var i=0; i<data_count; i++) {
					var row = data[i];
					var item = self.getMailItem(row, mode);
					resultContainer.appendChild(item);
				}
				
				if(mode){
					self.outboxOffset+=data_count;
				}else{
					self.inboxOffset+=data_count;
				}
				
				thisNode.find('.results .next').remove();

				if(data_count<limit){
					thisNode.find('.results .next').remove();
					var emptyMail = document.createElement('div');
					emptyMail.setAttribute('class','empty next');
					emptyMail.innerHTML = Local.tr('There are no more messages to display');
					resultContainer.appendChild(emptyMail);
				}else{
					var next_start = offset + limit;
					var next = document.createElement('button');
					next.setAttribute('type', 'button');
					next.setAttribute('class', 'next');
					next.setAttribute('rel', mode); // inbox or outbox for
													// unified folder handler
					next.setAttribute('ref', next_start); // offset for
															// unified handler
					
					var id = mode?'outboxMoreButton':'inboxMoreButton';
					next.setAttribute('id', id);
					next.appendChild(document.createTextNode(Local.trUcf('Load more')));
					$(next).bind(event, function(e){
						e.stopPropagation();
						e.preventDefault();
						self.getFolder(mode, next_start, limit);
					});
					resultContainer.appendChild(next);
				}
			}else{
				thisNode.find('.results .next').remove();
				if (offset == 0){
					var emptyMail = document.createElement('div');
					emptyMail.setAttribute('class','emptyMail');
					
					if(mode){
						emptyMail.innerHTML = Local.tr('You have no outgoing messages.');
					}else{
						emptyMail.innerHTML = Local.tr('You have no incoming messages.');
					}
					
					resultContainer.appendChild(emptyMail);
				}else{
					var emptyMail = document.createElement('div');
					emptyMail.setAttribute('class','empty next');
					emptyMail.innerHTML = Local.tr('There are no more messages to display');
					resultContainer.appendChild(emptyMail);
				}
			}

			UI.haxComb(thisNode);
		}
		send_mode=mode?'outbox':'inbox';
		
		Login.authCall(Search.getAbsUrl('services/mail_json.php?action=list&locale='+Local.locale),{mode:send_mode,offset:offset, limit:limit}, onready, true);
}

/**
 * Render a single mail list item to html and return as string
 * 
 * @param {object}
 *            row object containing the data to render
 * @param {boolean}
 *            [outbox=false] whether to render in outbox mode
 * @returns {string} html representation of provided data
 */
MailboxService.prototype.getMailItem = function(row, outbox){
	var item = document.createElement('div');
	
	var class_attr = (row.is_read==1 || !!outbox)?'item read':'item unread';
	
	item.setAttribute('class', class_attr);
	item.setAttribute('ref', row.id);
	item.setAttribute('hash', 'mail/mailView/');
	item.setAttribute('rel',!!outbox?'1':'0');
	item.onclick = Mail._mailClick;
	
	var replied = (row.is_replied)?'<img class="replied" src="gfx/arrow_back_blue.png"/>':'';
	
	var emptySubject = (row.subject.length==0)?" emptySubject":"";
	
	item.innerHTML+='<div class="h2 title'+emptySubject+'" data-fulltext="'+row.subject+'">' 
		+ replied
		+ row.subject
		+ '</div>';
		
	
	item.innerHTML+='<div class="info '+emptySubject+'">' + row.body + '</div>';
	item.innerHTML+='<div class="sender">' + row.actor_alias + '</div>';
	item.innerHTML+='<div class="time">' + row.date_time + '</div>';
	item.innerHTML+='<div class="tags">' + row.tag + '</div>';

	return item;
}

/**
 * Utility function to handle clicks on items in mail list
 */
MailboxService.prototype._mailClick = function(){
	UI.clicked(this);
	UI.hashLink(this.getAttribute('hash')+UI.hashnum+'/'+this.getAttribute('ref')+'/'+this.getAttribute('rel'));
}

/**
 * Retrieve a single message from inbox or outbox and render as html to
 * appropriate page
 * 
 * @param {int}
 *            id identifier of message to fetch from server mailbox
 * @param {boolean}
 *            [mode=false] whether to fetch from inbox (false) or outbox (true)
 * @returns {void}
 */
MailboxService.prototype.getMessage = function(id, mode){
	var self = this;
	mode = !!mode;
	
	var event = UI.isTouchy?"touchstart":"click";
	
	function onready(data){
		var thisNode = $('#mailView');
		
		var jResultContainer = thisNode.find('.results');
		if (jResultContainer.length==0) {
			var wrap = document.createElement('div');
			wrap.setAttribute('class', 'results scrollFrame');
			thisNode.append(wrap);
		}
		else {
			var wrap = jResultContainer.get(0);
		}
		
		var datatable = document.createElement('div');
		datatable.setAttribute('class', 'main-data');
		
		self.renderDetailDataRow(Local.tr("mailFrom"),data.sender, datatable);
		self.renderDetailDataRow(Local.tr("mailTo"),data.recipient[0], datatable);
		self.renderDetailDataRow(Local.tr("Date"),data.send_date, datatable);

		wrap.appendChild(datatable);
		
		var title = document.createElement('div');
		title.setAttribute('class', 'title');
		title.innerHTML = data.subject+data.tag;
		wrap.appendChild(title);
		
		var content = document.createElement('div');
		content.setAttribute('class', 'content');
		content.innerHTML = data.body;
		
		wrap.appendChild(content);
		
		var footer = document.createElement('div');
		footer.setAttribute('id','mailFooter');
		
		if(data.answerable && !mode){
			var replyButton = document.createElement('div');
			replyButton.setAttribute('class', 'mailButton mailReply');
			replyButton.innerHTML = '<img src="gfx/arrow_back_green.png"/><span>'+Local.tr('Reply')+'</span>';
			$(replyButton).on(event, function(){
					UI.hashnum++;
					var hash = 'mail/mailReply/' + UI.hashnum + '/'+id;
					UI.hashLink(hash);
			});
			footer.appendChild(replyButton);
		}else if (mode && data.allowIterative){
			var replyButton = document.createElement('div');
			replyButton.setAttribute('class', 'mailButton mailReply');
			replyButton.innerHTML = '<img src="gfx/compose_new_msg.png"/><span>'+Local.tr('Write again')+'</span>';
			$(replyButton).on(event, function(){
					UI.hashnum++;
					var hash = 'mail/mailFollow/' + UI.hashnum + '/'+id;
					UI.hashLink(hash);
			});
			footer.appendChild(replyButton);
		}
		
		if(UI.isIcecream){$(footer).hide()};
		
		var deleteButton = document.createElement('div');
		deleteButton.setAttribute('class', 'mailButton mailDelete');
		deleteButton.setAttribute('ref', id);
		deleteButton.setAttribute('rel', mode?1:0);
		deleteButton.innerHTML = '<img src="gfx/close_X_red.png"/><span>'+Local.tr('Delete')+'</span>';
		$(deleteButton).bind(event, function(){
			var that = this;
			UI.confirm('Do you want to delete this message?', function(v){
				if(v==1)
				self.deleteMessage(that.getAttribute('ref'), (that.getAttribute('rel')==1), function(data){
					UI.hashnum++;
					var section = 'mail';
					var page = mode?'mailOutbox':'mailInbox';
					var hash = 'mail/' + page + '/' + UI.hashnum + '/';
					UI.hashLink(hash);
				});
			},'Delete,Cancel');
		});
		footer.appendChild(deleteButton);
		
		$(content).find('a').click(function(){
			window.open(this.getAttribute('href'),'_system');
			return false;
		});
		
		document.body.appendChild(footer);
		
		if(UI.isIcecream){
			setTimeout(function(){
					$('#mailFooter').show();	
			},100);
		}

		UI.haxComb(thisNode);
	}
	Login.authCall(Search.getAbsUrl('services/mail_json.php?action=view&locale='+Local.locale),{id:id, mode:mode?'outbox':'inbox'}, onready, true);
}

/**
 * Render a single row for basic data fields in message detail view
 */
MailboxService.prototype.renderDetailDataRow=function(title, value, container){
	var this_label = title;
	var this_value = value;
	var this_field = value;

	var datarow = document.createElement('div');
	datarow.setAttribute('class', 'item');

	var labelcell = document.createElement('div');
	labelcell.appendChild(document
			.createTextNode(this_label));
	labelcell.setAttribute('class', 'label td');

	var valuecell = document.createElement('div');
	valuecell.setAttribute('class', 'value td');
	valuecell.innerHTML = this_value;

	datarow.appendChild(labelcell);
	datarow.appendChild(valuecell);
	container.appendChild(datarow);	
}


/**
* Globals in ModSelect namespace.
* (not really closured in that namespace, though)
*/
var ModSelect_self = null;


/**
 * Handles chained selects with ajax/json provided content.
 * This is a modified version of the original class that supports passing an on-slave-updated callback
 * to accomodate for mobile version's need for chained screen-selects
 * @modified Anton Kukushkin <anton.kukushkin@auto24.ee>
 * @class
 */
function ModSelect () {
	ModSelect_self = this;
}

ModSelect.prototype.nocache = true;
ModSelect.prototype.optgmode = 0;
ModSelect.prototype.existonly = false;
ModSelect.prototype.locale = '';
ModSelect.prototype.queryroot = '/';

ModSelect.prototype.change = 100;
ModSelect.prototype.changeModels = 101;
ModSelect.prototype.changeModelPeriods = 102;
ModSelect.prototype.changeBodyTypes = 103;	/*deprecated, renamed to changeBodytypes*/
ModSelect.prototype.changeBodytypes = 103;
ModSelect.prototype.changeFormBodytypes = 104;
ModSelect.prototype.changeMakes = 105;


ModSelect.prototype.filterBodytype = 'data-bodytype';
ModSelect.prototype.filters = new Array();


/** @deprecated */
ModSelect.prototype.include = function (fname) {}
/** @deprecated */
ModSelect.prototype._populateFrom = function (src, container, item_selector, value_selector, label_selector, param_name) {}


/**
* ModSelect.bind()
* Binds relations and actions to elements.
* @function
* @param {string} src_selector a jQuery selector for the element(s) to be used as a master
* @param {string} tar_selector a jQuery selector for slave element(s) to be adjusted according to master's change
* @param {int} type integer type code for link dependency type
* @param {function} [callback] a function to be executed once the slave select is updated in response to master's change
* @param {boolean} [nonexistent] return entries with no children, such as makes without models; default false
*/
ModSelect.prototype.bind = function (src_selector, tar_selector, type, callback, nonexistent) {
	$(src_selector).bind('change', function(){
		var parent = this;

		$(tar_selector).each(function(){
			var target = this;
			var query = '';
			switch (type) {
				case ModSelect_self.changeMakes:
					query = 'services/data_json.php?q=makes&existonly=' + !nonexistent + '&parent=' + parent.value  + '&locale=' + ModSelect_self.locale;
					break;
				case ModSelect_self.changeModels:
					query = 'services/data_json.php?q=models&existonly=' +!nonexistent + '&parent=' + parent.value  + '&locale=' + ModSelect_self.locale;
					break;
				case ModSelect_self.changeModelPeriods:
					query = 'services/data_json.php?q=modperiods&existonly=' + !nonexistent + '&parent=' + parent.value + '&locale=' + ModSelect_self.locale;
					break;
				case ModSelect_self.changeBodytypes:
					query = 'services/data_json.php?q=bodytypes&existonly=' + !nonexistent + '&parent=' + parent.value + '&locale=' + ModSelect_self.locale;
					break;
				case ModSelect_self.changeFormBodytypes:
					query = 'services/data_json.php?q=bodytypes&use_meta=1&existonly=' + !nonexistent + '&parent=' + parent.value + '&locale=' + ModSelect_self.locale;
					break;
				default:
					break;
			}

			if (query) {
				ModSelect_self._populateFromCache(target, ModSelect_self.queryroot + query, query, callback);
			}
		});
	});
}


/**
* ModSelect.filter()
* Defines elements as filters.
*/
ModSelect.prototype.filter = function (filter_selector, type) {
	var jFilter = $(filter_selector);
	var filter_id = jFilter.attr('id');

	ModSelect_self.filters[filter_id] = type;

	jFilter.change(function(){
		$('[' + type + '-filter="true"]').each(function(){
			ModSelect_self._populateFromCache(this);
		});
	});
}

/**
 * Applies a filter
 * @function
 */
ModSelect.prototype._applyFilter = function (target, type, filter_el) {
	if (parseInt(filter_el.value)) {
		for (var j=target.options.length; j>0; j--) {
			var i = j-1;
			var this_option = target.options[i];

			var filter_value = filter_el.value;
			var target_filter = this_option.getAttribute(type);

			if (parseInt(target_filter)>0 && filter_value!=target_filter) {
				target.removeChild(this_option);
			}
		}
	}
}

/**
 * Triggers filters on an element
 * @function
 */
ModSelect.prototype._triggerFilters = function (target) {
	for (var filter_id in ModSelect_self.filters) {
		var type = ModSelect_self.filters[filter_id];

		if (target.getAttribute(type + '-filter')) {
			var filter_el = document.getElementById(filter_id);
			ModSelect.prototype._applyFilter(target, type, filter_el);
		}
	}
	$(target).trigger('triggerFilters');
}

/**
 * Populates target select with options. If possible, the content will be fetched from cache.
 * @param {DOMNode} target the element to populate
 * @param {string} query the remote query to call for the element's content
 * @param [cache_id] cache identifier for caching in cache.
 * @param {function} [callback] the function to execute once the update is complete (either via ajax call or from cache)
 * @function
 */
ModSelect.prototype._populateFromCache = function (target, query, cache_id, callback) {
	
	
	var previousValue = $(target).val();

	try {
		if (parseInt(target.value)>0) {
			target.cachedValue = target.value;
		}
	}catch(e){ModSelect_self._error(e)}

	ModSelect_self._removeChildren(target);


	if (cache_id) {
		target.setAttribute('data-cache-id', cache_id);
	}
	else {
		var cache_id = target.getAttribute('data-cache-id');
	}

	if (cache_id && ModSelect_self._isCached(cache_id)) {
		ModSelect_self._populate(target, ModSelect_self._getCache(cache_id), 0);
		if (callback){
			callback(previousValue);
		}
		ModSelect_self._triggerFilters(target);
	}
	
	else {
		$.getJSON(query, function(data){
			if (data.q.status==1){
				ModSelect_self._populate(target, data.q.response, 0);
				if(cache_id) {
					ModSelect_self._setCache(cache_id, data.q.response);
				}
				
				if(callback){
					callback(previousValue);
				}
				ModSelect_self._triggerFilters(target);
			}else{
				if(callback){
					callback(previousValue);
				}
			}
		});
	}
}

/**
 * fills the target container with provided elements.
 */
ModSelect.prototype._populate = function (Container, data, level) {
	for (var i in data) {
		var label, value, children, datas;

		value = i;

		try{
			var label = data[i].label;
		}catch(e){ModSelect_self._error(e)}

		try{
			value = data[i].value;
		}catch(e){ModSelect_self._error(e)}

		try{
			var children = data[i].children;
		}catch(e){ModSelect_self._error(e)}

		try{
			var datas = data[i].data;
		}catch(e){ModSelect_self._error(e)}


		try{
			if(this.optgmode==1 && children){
				var Optgroup = document.createElement('optgroup');
				Optgroup.label = label;
				this._populate(Optgroup, children, level+1);
				Container.appendChild(Optgroup);
			}else{
				var Option = document.createElement('option');
				Option.value = value;
				Option.selected = false;//value==Container.cachedValue;
				Option.className = 'level-' + level;
				Container.appendChild(Option);

				if(children){
					label += ' (' + Local.tr('any') + ')';
					this._populate(Container, children, level+1);
				}

				Option.label = Option.text = label;

				if (datas) {
					for (var att in datas) {
						Option.setAttribute('data-' + att, datas[att]);
						Container.setAttribute('data-' + att + '-filter', true);
					}
				}
			}
		}catch(e){
			console.error('I accidentally '+e);
		}
	}
}


/**
* ModSelect._removeChildtren()
* Helper function to clear all children of element.
* @function
*/
ModSelect.prototype._removeChildren = function (Container) {
	try{
		if (Container.tagName=='SELECT') {
			var thisClone = document.createDocumentFragment();
			var this_options = Container.options;

			if (this_options.length && parseInt(this_options[0].value)==0) {
				thisClone.appendChild(this_options[0]);
			}
			if (this_options.length && this_options[0].getAttribute('data-multiToggler')=='true') {
				thisClone.appendChild(this_options[0]);
			}

			while (Container.firstChild) {
				$(Container.firstChild).remove();
			}

			Container.appendChild(thisClone);
			Container.selectedIndex = 0;
		}
		else {
			while (Container.firstChild) {
				$(Container.firstChild).remove();
			}
		}

	}catch(e){ModSelect_self._error(e)}
}

/**
 * Does nothing.
 */
ModSelect.prototype._error = function (e, force) {
	if (force) {
		//alert(e);
	}
}


ModSelect.prototype._cache = new Array();
ModSelect.prototype._iscached = new Array();
ModSelect.prototype._unsetCache = function (name) {this._cache[name]=null; this._iscached[name]=false;}
ModSelect.prototype._setCache = function (name, value) {if(!this.nocache){this._cache[name] = value; this._iscached[name]=true;}}
ModSelect.prototype._getCache = function (name) {return this._cache[name];}
ModSelect.prototype._isCached = function (name) {return this._iscached[name];}


(function( $ ){
	
  function createScrollBar(alphabet, target, leftDock) {
	  
	target.find('.alphascroll_container').remove();
  
	var scrollBar = $('<ul class="alphascroll" />');
	var scrollContainer = $('<div class="alphascroll_container"></div>');
	
	if(leftDock){
		scrollContainer.addClass('left-dock');
	}
	
	scrollBar.appendTo(scrollContainer);
	
	if(Object.prototype.toString.call(alphabet) === '[object Array]'){
		for(var i=0;i<alphabet.length;i++){
			scrollBar.append($('<li>'+alphabet[i]+'</li>'));
		}
	}else{
		for (value in alphabet){
			scrollBar.append($('<li data-letter="'+value+'">'+alphabet[value]+'</li>'));
		}
	}
	
	if(UI.isApple){
		// say some polite and respectful words about the company with 
		// the high-quality hardware and polished user experience
		target.parent().on('touchmove',function(){});
	}
	
	scrollContainer.on('touchstart',function(event){
		event.preventDefault();
		var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
		
		scrollBar.addClass('active');
		// scroll to divider position
		alphaScroll( touch.clientY, scrollBar, target );
        
        if(UI.isIOS7){
          target.css({'border-right':"1px solid transparent"});
          setTimeout(function(){
            target.css({'border-right':'none'});
          },100);
        }
	
		scrollContainer.one('touchend',function(){
			scrollBar.children('.current').removeClass('current');
			scrollBar.removeClass('active');
		});
	});
	
	scrollContainer.on( 'touchmove', function( event ) {
		event.preventDefault();
		var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
		// scroll to divider position
		alphaScroll( touch.clientY, scrollBar, target );
	});

	scrollContainer.on( 'mousedown', function(event) {
		var page = $(this).parent()
		alphaScroll( event.clientY, scrollBar, target);
		
		scrollBar.addClass('active');
		
		page.on( 'mousemove', function( event ) {
			// prevent text selection while scrolling
			page.css({
				"-webkit-user-select" : "none",
				"-moz-user-select" : "none",
				"-ms-user-select" : "none",
				"user-select" : "none"
			});
			
			// scroll to divider position
			alphaScroll( event.clientY, scrollBar, target);
		});

		// return page to normal functioning after mouseup
		page.one( 'mouseup', function() {
			// return text selection to default
			page.css({
				"-webkit-user-select" : "text",
				"-moz-user-select" : "text",
				"-ms-user-select" : "text",
				"user-select" : "text"
			});
			page.off('mousemove');
			scrollBar.removeClass('active');			
			scrollBar.children('.current').removeClass('current');
		});
	});
	
	if(UI.isApple){
		scrollContainer.css('position','absolute');
		target.parent().append(scrollContainer);
	}else{
		target.append(scrollContainer);
	}
	
	return scrollBar;
  }
  
	// do the scroll
  function alphaScroll( y, element , target) {
	  
	  var top = element.parent('.alphascroll_container').position().top;
	  
	  var height = element.height(); 
	  
	  var itemHeight = height/element.children().length;
	  
	  var offset = y - top;

	  var itemIndex
	  
	  if(element.hasClass('collapsed')){
		  itemIndex = Math.floor(offset / (itemHeight*2))*2;
	  }else{
		  itemIndex = Math.floor(offset / itemHeight);
	  }
	  
	  
	  if(itemIndex < 0 || itemIndex >= element.children('li').length){
		  return;
	  }
	  
	  var item = element.children().eq(itemIndex);
	  
	  var itemLetter = item.attr('data-letter') || item.html();
	  
	  if (!itemLetter) return;
	  
	  element.children('.current').removeClass('current');
	  item.addClass('current');
	  
	  var scrollTarget = target.find('div[data-alphabet-letter="'+itemLetter+'"]').first();
	  if (scrollTarget.length == 0){
		  return;	  
	  }
	  
	  var scrollPos = scrollTarget.get(0).offsetTop;
	  
	  scrollPos -= 2.5 * UI.fontSize;
	  
	  UI.setScrollPosition(target, scrollPos);
  }
	
  var methods = {
		  init:function(options){
			return this.each(function(){
				var self = this;
				var $this = $(this);
				
				var selected = $this.children('option:selected');
				var defaultVal = $this.children().first().val();
				$this.attr('default', defaultVal);
				
				if (selected.length == 0){
					selected = $this.children().first();
				}
				
				var target = $(options.target);
				var onshow = this.onshow = options.show;
				var onhide = this.onhide = options.hide;
				
				var alphaScroll = $this.attr('data-alphascroll');
				var scrollLeft = alphaScroll == "left";
				
				var scrollbar = null;
				
				var button = document.createElement('div');
				button.setAttribute('class', 'select-button');
				button.setAttribute('id',$this.attr('id')+"-button");
				button.innerHTML = selected.text();
				
				var event = options.event?options.event:'click';
				
				$('label[for='+$this.attr('id')+']').on(event, function(){
					$(button).trigger(event);
				});
				
				function select(){
					
					if(scrollbar){
						scrollbar.remove();
						scrollbar = undefined;
					}
					
					$that = $(this);

					target.children('.scrollFrame').children().removeClass('selected');
					$that.addClass('selected');
					var value = $that.attr('value');
					$this.val(value);
					$this.change();
					
					onhide($this);
					
				}
				
				$this.on('change',function(){
					this.update();
				});
				
				this.update = function(){
					var children = $this.children('option:selected');
					if (children.length==0){
						children=$this.children();
					}
					
					var shortText = children.attr('shorttext');
					if (shortText && shortText.length>0){
						this.setButtonText(Local.tr(shortText));
					}else{
						this.setButtonText(children.get(0).innerHTML);
					}

					if($this.val()!=defaultVal) {
						$(button).addClass('select-button-selected');
					}
					else{
					    $(button).removeClass('select-button-selected');
					}
				}
				
				this.setButtonText = function(text){
					button.innerHTML = text;
					button.setAttribute('title',button.innerHTML);
				}
				
				this.cleanContainer = function(){
					console.log('cleaning container for '+this);
					console.log(target);
					target.empty();
				}
				
				this.createCustomScrollBar = function(alphabet, leftDock){
					console.log('leftdock: '+leftDock)
					target.children().each(function(){
						var $this = $(this);
						var val = $this.attr('value');
						
						if(alphabet[val]){
							$this.attr('data-alphabet-letter', alphabet[val]);
						}else{
							$this.attr('data-alphabet-letter', undefined);
						}
					});
					
					if(scrollbar) {
						scrollbar.remove();
					}
					
					scrollbar = createScrollBar(alphabet, target, leftDock);
				}
				
				this.destroyScrollBar = function(){
					if(scrollbar){
						scrollbar.remove();
						scrollbar = undefined;
					}
				}
				
				var resize = this.resize = function(){
					if(scrollbar){
						var hide = scrollbar.height() > window.innerHeight;
						var scrollHeight = scrollbar.height()+UI.fontSize;
						var winHeight = window.innerHeight; 
						
						if(scrollHeight>winHeight && !scrollbar.hasClass('collapsed')){
							scrollbar.addClass('collapsed');
						}else if(scrollbar.hasClass('collapsed') && winHeight>=scrollHeight*2){
							scrollbar.removeClass('collapsed');
						}
					}
				}
				
				this.click = function(e){
					
					var sF = target.children('.scrollFrame');
					var letters = [];
					
					if (sF.size()==0){
						sF = $(document.createElement('div'));
						sF.addClass('scrollFrame');
						target.append(sF);
					}else{
						sF.empty();
					}
				
					var overVal = $this.val();
					$this.children().each(function(){
						var underVal = this.getAttribute('value');
						var sButton = document.createElement('div');
						
						if(underVal != 0 && underVal != -1){
							var letter = this.innerHTML[0].toLowerCase();
							letters.push(letter);
							sButton.setAttribute('data-alphabet-letter',letter);
						}
						
						sButton.innerHTML = this.innerHTML;
						sButton.setAttribute('value', underVal);
						sButton.setAttribute('class', 'selectDiv');
						sButton.setAttribute('data-i18ntxt',this.getAttribute('data-i18ntxt'));

				    	$Button = $(sButton);
					    var classes = this.getAttribute("class");
					    if(classes){
						    classes = classes.split(" ");
						    for(c in classes){
						    	$Button.addClass(classes[c]);
						    }
					    }
					    
					    var dataDivider = this.getAttribute('data-divider-id'); 
						if(dataDivider){
							$Button.addClass('divider');
							$Button.addClass('divider-'+dataDivider);
						}else{
							sButton.onclick=select;							
						}
					
						if (overVal == underVal){
							$Button.addClass('selected');
						}
						
						sF.append(sButton);
					});
					
					if(alphaScroll){
						console.log('alphabet is enabled!');
						var alphabet = [];
						var uniqueLetters = {};
						
						var collation = $this.attr('data-collation');
						
						if (collation){
							console.log('using collation override: '+collation);
							if(collation == "none") collation = undefined;
						}else{
							console.log('using default collation: '+Local.locale);
							collation = Local.locale;
						}
					
						for(l in letters){
							var letter = letters[l];
							if(!uniqueLetters[letter]){
								uniqueLetters[letter] = true;
								alphabet.push(letter);
							}
						}
						
						if(alphabet.length>5){
							scrollbar = createScrollBar(alphabet, target, scrollLeft);
							setTimeout(function(){
								resize();	
							});
						}
					}else{
						target.find('.alphascroll').remove();
						
						if(UI.isApple){
							$('.alphascroll').remove();
						}
					}
					
					onshow($this);
					
					if(e){
						if (e.preventDefault){
							e.preventDefault();
						}else{
							e.returnValue= false;
						}
					}
				}

				$(button).on(event,this.click);
				this._init = true;
				$this.after(button);
				$this.hide();
			});
		},
		createCustomScrollBar:function(alphabetOverride, leftDock){
			console.log('method/leftdock: '+leftDock)
			return this.each(function() {
				if (!!this._init) this.createCustomScrollBar(alphabetOverride, leftDock);
			});
		},
		destroyScrollBar:function(){
			return this.each(function() {
				if (!!this._init) this.destroyScrollBar();
			});
		},
		cleanContainer:function(){
			return this.each(function(){
				if (!!this._init) this.cleanContainer();
			});
		},
		update: function() {
			return this.each(function() {
				if (!!this._init) this.update();
			});
		},
		setText: function(text) {
			return this.each(function() {
				if (!!this._init) this.setButtonText(text);
			});
		},
		show:function(){
			return this.each(function(){
				if (!!this._init) this.click();
			});
		},
		hide:function(){
			return this.each(function(){
				if (!!this._init) this.onhide($(this));
			});
		},
		resize: function(){
			return this.each(function(){
				if(!!this._init) this.resize();
			});
		},
  }
	
  /**
   * The ScreenSelect JQ plugin replaces affected select elements with a button that displays a separate page with options on click.
   * After an option has been selected on the selection page, the page is hidden, and the hidden select element
   * is modified in accordance to the new selection, as well as alerted of a change event.
   * 
   * @param {mixed} options is an object containing options for the screenselect(specified below) or a method name to execute(such as 'update').
   * @param {jQuery} options.target is a selector, DOMNode, or jquery object for the element that will be filled with options and displayed on select
   * @param {function} options.show is a callback function which is fired when the button that replaces the select is clicked after the target element has been filled
   * @param {function} options.hide is a callback function which is fired after the selection has been made and the wrapped select element updated.
   * @class
   */
  $.fn.screenSelect = function(options) {
	    if (methods[options]) {
			return methods[options].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof options === 'object' || !options) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' +  options + ' does not exist on jQuery.screenSelect');
		}
  };
})( jQuery );


/**
 * The mobile user interface wrapper class. This class holds links to most of
 * the stuff worth keeping track of in the gui, as well as the methods necessary
 * for accessing and changing those.
 * 
 * @class
 */
function MobUI() {
	console.log('instantiating UI');
	var self = this;
	var favStar = document.getElementById('favStar');

	this.isTouchy = ("ontouchstart" in document.documentElement || 'ontouchstart' in window);

	this.hashnum = 0;

	this.isHoneycomb = (/Android 3\./i).test(navigator.userAgent);
	this.isIcecream = (/Android 4\./i).test(navigator.userAgent);
	this.isJellyBean = this.isIcecream
			&& parseInt((/Android 4\.(\d+)/i).exec(navigator.userAgent)[1]) >= 1;

	this.isAndroid = (/Android/i).test(navigator.userAgent);
	this.isTablet = (/ipad|android 3/i).test(navigator.userAgent);

	this.isIOS8 = (/OS 8_/i).test(navigator.userAgent);
	this.isIOS7 = (/OS 7_/i).test(navigator.userAgent) || this.isIOS8; // kind of hack
	this.isIOS6 = (/OS 6_/i).test(navigator.userAgent);

	this.isIOS6_plus == this.isIOS6 || this.isIOS7 || this.isIOS8;

	this.isIOS5 = (/OS 5_/i).test(navigator.userAgent) || this.isIOS6;

	this.isApple = (/ipad|ipod|iphone/i).test(navigator.userAgent);

	this.searchForm = $('#searchForm');
	this.searchResult = $('#searchResult');
	this.searchDetail = $('#detailView');
	this.searchGallery = $('#searchGallery');

	this.selectContainer = $('#selectScreen');

	this.OSVersion = 0;
	this.popups = {};

	// generic click event; touchstart for touchy devices to skim on ios' delay
	var event = this.isTouchy ? 'touchstart' : 'click';

	$(favStar)
			.bind(
					event,
					function() {
						var favImg = favStar.innerHTML;
						favStar.innerHTML = '<img src="gfx/star_black.png" width=2em height=2em/>';
						setTimeout(function() {
							favStar.innerHTML = favImg;
						}, 100);
						return true;
					});

	$('#menu_saveSearch').bind('click', function(e) {
		e.preventDefault();
		self.hashLink('search/searchSave/' + (UI.hashNum + 1));
	});
	
	$('#menu_savedSearches').bind('click', function(e) {
		e.preventDefault();
		self.hashLink('login/loginSearches/' + (UI.hashNum + 1));
	});

	$('#inputSearchNotify').bind('change', function() {
		var state = $(this).prop('checked');
		if (state) {
			$('#searchEmailField').slideDown();
		} else {
			$('#searchEmailField').slideUp();
		}
	});

	$('#inputSave')
			.bind(
					"click",
					function(e) {
						e.preventDefault();
						e.stopPropagation();
						var title = $('#inputSearchTitle').val();
						var notify = $('#inputSearchNotify').prop('checked');
						var email = $('#inputSearchEmail').val();

						if (title.length > 0) {
							if (!(self.resultCount > 1000 && notify)) {
								Saved
										.save(
												title,
												self.sections.search.pages.searchResult.params,
												notify,
												email,
												function(data) {
													if (data.status == 'success') {
														self
																.hashLink('search/searchResult/'
																		+ (self.hashnum + 1));
													} else {
														if (data.message) {
															UI
																	.alert(
																			data.message,
																			null,
																			'Auto24');
														} else {
															UI
																	.alert(
																			'Error while saving search!',
																			null,
																			'Auto24');
														}
													}
												});
							} else {
								UI
										.alert(
												'Please narrow your search if you want notifications!',
												null, 'Auto24');
							}
						} else {
							UI.alert('Please specify a title for this search!',
									null, 'Auto24');
							$('#inputSearchTitle').focus();
						}
						return false;
					});

	if (this.isAndroid) {
		$('#vinReturn').remove();
		$('#newsComments').css('padding-bottom', '7em');
	}

	if (this.isIcecream) {
		// this voodoo makes arrows render in gallery on ics
		changeStyle('.img-button', {
			border : '1px solid transparent'
		});

		$('input[type="tel"]').each(function() {
			this.setAttribute('type', 'text');
		});

		// these arcane runes prevent fixed elements from silently ignoring
		// touch input
		$('body').bind('touchstart', function(e) {
		});
		$(document).bind('touchstart', function(e) {
		});

		if (this.isJellyBean) {
			changeStyle('.scrollFrame', {
				'-webkit-transform' : 'translateZ(0)'
			});

			$('.frame').css({
				'overflow-x' : 'hidden',
				'overflow-y' : 'hidden'
			});

			$('.dashContents').css({
				'-webkit-transform' : 'translateZ(0)'
			});

			changeStyle('.alphascroll_container', {
				'z-index' : 10
			});
		}
	}

	if (this.isIOS6_plus) {
		changeStyle('.frame', {
			'-webkit-transform' : 'scale3d(0,0,0)',
			'-webkit-transform' : 'translate3d(0,0,0)'
		});

		changeStyle('.scrollFrame', {
			'-webkit-transform' : 'translate3d(0,0,0)',
		});

		// stripping relative positions to see if that helps much
		var irrelatives = [
				'body',
				'#inputVin',
				'button, input[type=button], input[type=submit], input[type=checkbox], .empty',
				'button.back, button.selectback, .langback',
				'button[type=submit], input[type=submit]',
				'button[type=submit], input[type=submit], #bottom-ctrl button',
				'#logoutButton', '.myStuff span', '.adListButton',
				'.adListButtonWrap', '.imgUploadButtons a', '.tabTitles',
				'.back, .selectback, #selectready', ];

		for (i in irrelatives) {
			changeStyle(irrelatives[i], {
				'position' : 'static'
			});
		}
	}

	if (this.isApple) {
		changeStyle('#loginDialog', {
			'-webkit-overflow-scrolling' : 'touch',
			overflowY : 'scroll',
			bottom : '0em',
			position : 'absolute'
		});

		changeStyle('.frame', {
			top : '2.5em'
		});

		$('.frame').css({
			bottom : '0em',
			left : "0em",
			right : "0em",
			display : 'none',
			position : 'absolute',
			paddingBottom : '1em',
			paddingTop : '0em',
			overflowX : 'hidden'
		});

		$("#logo_aspect").css({
			position : "absolute",
			top : "0em",
			"z-index" : 1,
		});

		$(".dashContents").css({
			position : "absolute",
			"padding-top" : "0em",
			top : "9em",
			bottom : "0em",
			overflow : "scroll",
			"-webkit-overflow-scrolling" : "touch",
		});

		$('#adHitcounts').css({
			overflowX : 'scroll',
			paddingBottom : 0
		});

		$('#loginDialog').css({
			'padding-bottom' : '0em'
		});

		$('#loginDialogForm').css('top', '0em');
		$('.d-header-wrap').css('padding-bottom', '2.5em');

		changeStyle('.frame.active', {
			"-webkit-overflow-scrolling" : 'touch',
			paddingTop : '0em'
		});

		changeStyle('#searchSection form', {
			width : 'auto'
		});

		$('#dashBoard').css({
			overflow : 'scroll',
			position : 'absolute',
			bottom : '0em',
			top : "0em",
			left : "0em",
			right : '0em',
			paddingBottom : '0em',
			minHeight : '0em',
		});

		changeStyle('#dashBoardWrapper', {
			minHeight : '0em',
		});

		changeStyle('.dashIconContainer', {
			height : 'auto'
		});

		changeStyle('body', {
			position : 'static',
			overflow : 'hidden'
		});

		changeStyle('#header', {
			position : 'absolute'
		});

		$('.back').bind('click', function(e) {
			e.preventDefault();
			self.back();
		});

		changeStyle('.scrollFrame', {
			marginTop : '0em',
			paddingTop : '0em',
			paddingBottom : '2em'
		});

		changeStyle('.gallery .img-count', {
			position : 'fixed'
		});

		$('body').height(window.innerHeight);

		$('.dashContents').css({
			'min-height' : 'auto',
			'height' : 'auto',
			'bottom' : '0em',
			'overflow' : 'scroll',
		});

		$('#dashBoard').css({
			'min-height' : 'auto',
			'height' : 'auto',
			'overflow' : 'hidden',
		});

		if (this.isIOS7 || this.isIOS8) {
			changeStyle('#title', {
				paddingTop : '0.5em'
			});

			$('#popupAd').css({
				'top' : '3em',
			});

			$('#logo_aspect').css({
				paddingTop : '0.8em',
				'height' : '3em',
			});

			changeStyle('#buttonMenu', {
				top : '3em'
			});

			changeStyle('button.back, button.selectback, .langback', {
				top : '0.5em'
			});

			changeStyle('.frame.active', {
				"-webkit-overflow-scrolling" : 'touch',
				top : '3em'
			});

			$('#loginDialog').css('top', '3em');
			$('.d-header-wrap').css('padding-bottom', '3em');

			$('.dashContents').css('top', '9em');
		}

		$(window).on('resize', function() {
			$('body').height(window.innerHeight);
			$('#loginDialogWrapper').scrollTop(0);
		});
	} else {

		changeStyle('.gallery .img-count', {
			position : 'fixed'
		});

		changeStyle('.frame', {
			position : 'static',
		});

		changeStyle('.frame.active', {
			padding : '2.5em 0em 0em 0em',
			'-webkit-backface-visibility' : '',
			'-webkit-perspective' : ''
		});

		changeStyle('.scrollFrame', {
			paddingBottom : '2em'
		});

		changeStyle('#ticker', {
			position : 'fixed'
		});

		changeStyle('.gallery', {
			position : 'static',
			padding : '0 0 0 0'
		});

		$('#loginFormWrapper').css({
			left : '0px',
			marginLeft : '0px',
			paddingLeft : '0px'
		});

		changeStyle('#login-logo', {
			marginTop : '0em',
			marginLeft : 'auto'
		});
	}

	self.pages = {
		searchForm : this.searchForm,
		searchResult : this.searchResult,
		searchDetail : this.searchDetail,
		selectScreen : $('#selectScreen'),
		loginScreen : $('#loginScreen'),
	}

	self.ctrl_back = $('#header .back').get(0);

	if (self.isTouchy) {
		self.ctrl_back.ontouchstart = function(e) {
			e.preventDefault();
			e.stopPropagation();
			self.clicked(this);
			self.back();
		};
	} else {
		this.ctrl_back.onclick = function() {
			self.clicked(this);
			self.back();
		};
	}

	this.logo = document.getElementById('logo');
	this.title = document.getElementById('title');

	this.sections = {
		dash : new UISection($('#dashSection'), this, 'dash'),
		search : new UISection($('#searchSection'), this, 'search'),
		login : new UISection($('#loginSection'), this, 'login'),
		favorites : new UISection($('#favoritesSection'), this, 'favorites'),
		news : new UISection($('#newsSection'), this, 'news'),
		mail : new UISection($('#mailSection'), this, 'mail'),
		vpc : new UISection($('#vpcSection'), this, 'vpc')
	}

	this.sections.search.onHide = function() {
		if (self.inASelect) {
			self.hideSelect();
		}
	};

	/*---------------------     DASHBOARD SECTION    ----------------------------- */
	var firstLoad = true;
	new DashBoardPage(this.sections.dash);

	new DetailPage({
		section:this.sections.dash, 
		name:'dashDetail', 
		node:$("#dashDetail"),
		writeHash: 'dash/dashWrite/',
		depth:1,
	});
	
	new MailQuestionPage({
		section:this.sections.dash,
		name:'dashWrite',
		node:$('#dashWrite'),
		depth:2,
	});

	/*---------------------     SEARCH SECTION    ----------------------------- */

	new SearchFormPage(this.sections.search);

	var sR = new UIPage(this.sections.search, 'searchResult',
			this.searchResult, function() {
				this.section.showPage(this.name);
			}, function() {
				$('#menu_saveSearch').hide();
				$('#menu_savedSearches').hide();
			}, 1);

	sR.reload = false;

	sR.onorientationchange = function() {
		this.node.find('.banner').each(function() {
			self.resizeBanner($(this));
		});
	}

	sR.onshow = function(callback) {
		self.sections.search.pages.searchDetail.reload = false;

		var that = this;

		$('#menu_saveSearch').show();
		$('#menu_savedSearches').show();

		if (this.reload === true) {
			this.reload = false;
			self.hashLink(self.rehash("#search/searchForm/0"));
			return;
		}

		self.resizeBanner($(this));

		UI.sections.search.pages.searchDetail.node.empty();

		favStar.style.display = 'none';
		self.changeTitle('Result');

		setTimeout(function() {
			if (callback) {
				callback()
			};

			UI.loadScrollPosition();
		}, 50);
	}

	new DetailPage({
		section:this.sections.search, 
		name:'searchDetail',
		node:$('#detailView'),
		writeHash:'search/searchWrite/', 
		depth:2,
	});

	var sV = new UIPage(this.sections.search, 'searchSave', $('#searchSave'),
			function(title) {
				var that = this;
				Saved.composeSearch(
						self.sections.search.pages.searchResult.params,
						function(data) {
							$('#inputSearchEmail').val(data.email);

							var nameField = $('#inputSearchTitle');

							var makeOption = $('#searchParam-cmm-1-make').find(
									'option:selected');
							var modelOption = $('#searchParam-cmm-1-model_id')
									.find('option:selected');

							var title = [];

							if (makeOption.size() > 0) {
								if (makeOption.val() != 0)
									title.push(makeOption.text());
							}

							if (modelOption.size() > 0) {
								if (modelOption.val() != 0)
									title.push(modelOption.text());
							}

							nameField.val(title.join(' '));

							that.section.showPage(that.name);
						})
			}, function() {
			}, 2);

	sV.onshow = function(callback) {
		self.changeTitle('Save Search');
		if (callback) {
			callback()
		}
		;
	}

	new MailQuestionPage({
		section:this.sections.search,
		name:'searchWrite',
		node:$('#searchWrite'),
		depth:3,
	});

	/*---------------------     LOGIN SECTION    ----------------------------- */

	var lS = new UIPage(this.sections.login, 'loginScreen', $('#loginScreen'),
			function(title) {
				this.section.showPage(this.name);
			}, function() {
				this.node.hide();
			});

	lS.transferNeeded = true;

	lS.onshow = function(callback) {
		self.sections.login.pages.advertise.modifyAd = false;
		self.sections.login.pages.adEdit.modifyAd = false;
		self.modifyAd = false;
		self.sections.login.pages.adImages.modifyAd = false;
		$('.modify').val('');

		var that = this;
		if (!Login.isLoggedin) {
			$('#loginFormWrapper').hide();
			Login.requestLogin(function(e) {
				$('#loginFormWrapper').show();
			}, true);
		} else {
			$('#loginFormWrapper').show();
			Mail.getMessageCounts(function(data) {
				if (data.inbox.total_unread > 0) {
					$('#myMailNotifier').html(data.inbox.total_unread);
					$('#myMailNotifier').show();
				} else {
					$('#myMailNotifier').hide();
				}
			});
		}

		self.changeTitle('Login');

		$('#adImages .uploadThumb').attr('src', 'gfx/no_photo.png');

		favStar.style.display = 'none';
		if (callback) {
			callback()
		}
		;
	}

	var lSe = new UIPage(this.sections.login, 'loginSearches',
			$('#loginSearches'), function() {
				var that = this;
				Saved.getList(function(data) {
					that.node.html(Saved.renderPage(data.searches));
					that.section.showPage(that.name)
				});

			}, function() {
			}, 1);
	lSe.alwaysReload = true;
	lSe.onshow = function(callback) {
		self.changeTitle('Saved Searches');
		if (callback) {
			callback()
		}
		;
	}
	
	new MailQuestionPage({
		section:this.sections.login,
		name:'loginWrite',
		node:$('#loginWrite'),
		depth:5,
	});

	var aL = new UIPage(this.sections.login, 'adList', $('#adList'),
			function() {
				this.section.showPage(this.name);
			}, function() {
			}, 1);

	aL.onshow = function(callback) {
		self.ticker('show');
		self.changeTitle('My ads');
		var that = this;
		this.node.children('.results').empty();
		Comm.fetchList(function() {
			if (that.active)
				that.node.show();
			self.setScrollPosition(that.node, 0);
			self.ticker('hide');
			if (callback) {
				callback()
			}
			;
		});
	}

	var aO = new UIPage(this.sections.login, 'adOptions', $('#adOptions'),
			function(id) {
				this.modifyAd = id;
				this.section.showPage(this.name);
			}, function() {
			}, 2);

	var shopEnabled = false;

	aO.onshow = function(callback) {
		self.changeTitle('My ad');
		self.ticker('show');

		var that = this;
		var node = this.node;

		Comm
				.getOptions(
						this.modifyAd,
						function(data) {
							if (data.status == 'success') {
								var orders = data.order_data;
								var serviceContainer = node.find('.services')
										.first()

								that.selectedAd = data;

								if (data.small_image_uri) {
									imgURI = data.small_image_uri;
									if (imgURI.indexOf('#') != -1) {
										var tokens = imgURI.split("#");
										imgURI = tokens[1] ? tokens[1]
												: tokens[0];
									}
									node.find('.thumb img').attr('src', imgURI);
								}

								node.find('.titleLeft').html(data.title);
								node.find('.info').html(data.description);
								node.find('.price').html(data.price);

								if (data.hidden) {
									$('#adListButton_hide span').html(
											Local.tr('Restore'));
								} else {
									$('#adListButton_hide span').html(
											Local.tr('Hide'));
								}

								var stopButton = $('#adListButton_stop');
								if (data.archive == 0) {
									stopButton.children('span').html(
											Local.tr('Stop'));
									stopButton.children('img').attr('src',
											'gfx/option_delete.png');
								} else {
									stopButton.children('span').html(
											Local.tr('Delete'));
									stopButton.children('img').attr('src',
											'gfx/option_delete.png');
								}

								serviceContainer.empty();

								if (shopEnabled) {
									for (i in orders) {
										var order = orders[i];

										var row = $('<div class="serviceItem"/>');

										row
												.append($('<span class="serviceDesc">'
														+ order.description
														+ '</span>'));

										if (order.is_removable) {
											row
													.prepend($('<div class="serviceCancel" rel="'
															+ order.id
															+ '"><img src="gfx/close_X_red.png"/></div>'));
										}

										if (order.is_active) {
											row.addClass('paid');
										} else {
											row.addClass('unpaid');
										}

										if (order.parent_id > 0) {
											row
													.prepend($('<div class="serviceChild"><img src="gfx/arrow.png"/></div>'));
										}

										row
												.append($('<span class="serviceDate">'
														+ order.status
														+ "</span>"));

										serviceContainer.append(row);

										row
												.find('.serviceCancel')
												.click(
														function() {
															var id = this
																	.getAttribute('rel');
															UI.clicked(this);
															UI
																	.confirm(
																			"Really delete?",
																			function(
																					c) {
																				if (c == 1) {
																					Comm
																							.cancelOrderItem(
																									id,
																									function(
																											data) {
																										if (data.status == 'success') {
																											that.section
																													.showPage(that.name);
																										} else {
																											UI
																													.alert("Could not delete service");
																										}
																									});
																				}
																			},
																			[
																					'yes',
																					'cancel' ]);
														});
									}
								}

							} else {
								UI.alert(data.error, null, 'Auto24');
							}

							self.ticker('hide');
							if (callback) {
								callback()
							}
							;
						});
	}

	aO.node.find('.option_hide').click(function() {

	});

	var aH = new UIPage(this.sections.login, 'adHitcounts', $('#adHitcounts'),
			function(id) {
				this.modifyAd = id;
				this.section.showPage(this.name);
			}, function() {
			}, 3);

	aH.onorientationchange = function() {
		var frameHeight = window.innerHeight;
		frameHeight -= 5.5 * UI.fontSize;
		$('#hitcountsGraph').height(frameHeight);
		$('.barContainer').height(frameHeight - $('.graphTitle').height());
	}

	aH.onshow = function(callback) {
		var that = this;

		this.onorientationchange();

		self.ticker('show');
		self.changeTitle('Stats');

		var days = that.node.find('.graphBar').not('.sideLegend');
		var labels = that.node.find('.graphLabel').not('.sideLegend');

		if (self.isApple) {
			that.node.scrollLeft(0);
		}

		days.each(function() {
			var $this = $(this);
			$this.children('.barFill').css('height', '0%');
			$this.children('.barEmpty').css('height', '100%').children(
					'.barLabel').html("0");

		});

		Comm.getHitcounts(this.modifyAd, function(data) {
			$('#hitcountsGraph').height(
					window.innerHeight - $('#title').height() - 2
							* (self.fontSize));

			var months = that.node.find('.graphLegend .month');

			months.first().html(data.previous);
			months.last().html(data.next);

			var max = 0;
			var graph = data.graph;

			for (i = 0; i < 30; i++) {
				var dracula = graph[i].count;
				if (dracula) {
					dracula = parseInt(dracula);
					if (dracula > max) {
						max = dracula;
					}
				} else {
					graph[i].count = 0;
				}
			}

			days.each(function() {
				var $this = $(this);
				var i = $this.attr('rel');
				var ratio = max > 0 ? graph[i].count / max : 0;
				var percentFull = Math.ceil(ratio * 100) + '%';
				var percentEmpty = Math.floor((1 - ratio) * 100) + '%';

				var fill = $this.children('.barFill');
				var empty = $this.children('.barEmpty');

				fill.css('height', percentFull);
				empty.css('height', percentEmpty);

				empty.children('.barLabel').html(graph[i].count);
			});

			labels.each(function() {
				var $this = $(this);
				$this.children('span').html(graph[$this.attr('rel')].day);
			});

			self.ticker('hide');
			if (callback) {
				callback()
			}
			;
		});
	}

	var aE = new UIPage(this.sections.login, 'adEdit', $('#adEdit'), function(
			id) {
		this.modifyAd = id;
		this.section.showPage(this.name);
	}, function() {
		if (self.inASelect) {
			$('#loginSelect').hide();
			self.inASelect = false;
		}

		this.node.find('.expanded').removeClass('expanded');
	}, 3);

	aE.equipment = new UIPage(this.sections.login, 'adEditEquipment',
			$('#adEditEquipment'), function() {
				aE.inSubpage = true;
				this.section.showPage(this.name);
			}, function(next) {
				if (self.inASelect) {
					$('#loginSelect').hide();
					self.inASelect = false;
				}

				if (next != this.parent) {
					this.parent.inSubpage = false;
				}

			}, 4);

	aE.techdata = new UIPage(this.sections.login, 'adEditTechdata',
			$('#adEditTechdata'), function() {
				aE.inSubpage = true;
				this.section.showPage(this.name);
			}, function(next) {
				if (self.inASelect) {
					$('#loginSelect').hide();
					self.inASelect = false;
				}
				if (next != this.parent) {
					this.parent.inSubpage = false;
				}
			}, 4);

	aE.otherdata = new UIPage(this.sections.login, 'adEditOtherdata',
			$('#adEditOtherdata'), function() {
				aE.inSubpage = true;
				this.section.showPage(this.name);
			}, function(next) {
				if (self.inASelect) {
					$('#loginSelect').hide();
					self.inASelect = false;
				}
				if (next != this.parent) {
					this.parent.inSubpage = false;
				}

			}, 4);

	aE.techdata.parent = aE;
	aE.otherdata.parent = aE;
	aE.equipment.parent = aE;

	aE.otherdata.onshow = aE.techdata.onshow = aE.equipment.onshow = function(
			callback) {
		self.changeTitle('Edit Ad');
		self.setScrollPosition(this.node, 0);
		if (callback) {
			callback()
		}
		;
	}

	aE.onshow = function(callback) {
		self.changeTitle('Edit Ad');
		var that = this;
		if (!this.inSubpage) {
			self.ticker('show');

			UI.clearScrollPosition();
			self.setScrollPosition(this.node, 0);
			scroll(0, 0);

			var node = this.node;
			node.find('.advertise-select').val(0);
			node.find('.advertise-select').screenSelect('update');
			node.find('.advertise-location option:selected').attr('selected',
					false);
			node.find('.advertise-location').val(0);
			node.find('.advertise-location').change();
			node.find('.item-text').find('input').val('');
			node.find('.advertise-name').val(Login.loginUsername);
			node.find('.advertise-email').val(Login.loginEmail);
			node.find('.item-advertise-othermodel').hide();
			node.find('#item-advertise-fauxname').hide();

			Comm
					.fetchEditFields(
							that.modifyAd,
							that,
							function(data) {
								try {
									if (data.status == 'success') {
										that.overrideModel = data.maindata.model;
										that.overridePeriod = data.maindata.model_period;
										that.overrideMake = data.maindata.make;
										that.overrideBody = data.maindata.bodytype;

										if (data.maindata.model_name
												&& data.maindata.model_name != ""
												&& data.maindata.model == 0) {
											that.overrideModel = -1;
										}

										// since having overselects open while
										// subselects are closed makes no
										// sense...
										if (data.maindata.locked.model) {
											data.maindata.locked.type = true;
											data.maindata.locked.bodytype = true;
											data.maindata.locked.othermodel = true;
										}

										that.node.find('.form-item.disabled')
												.removeClass('disabled');
										that.node.find('.advertise-othermodel')
												.attr('disabled', false);

										if (data.maindata.locked.model) {
											$('#item-advertise-fauxname')
													.find('.field span')
													.html(
															data.maindata.make_name
																	+ ' '
																	+ data.maindata.model_name);
											$('#item-advertise-fauxname')
													.show();
										}

										for (field in data.maindata.locked) {
											var select = that.node
													.find('.advertise-' + field);
											if (data.maindata.locked[field]) {
												select.attr('disabled', true);
												select.closest('.form-item')
														.addClass('disabled');
											} else {
												select.attr('disabled', false);
												select
														.closest('.form-item')
														.removeClass('disabled');
											}
										}

										setTimeout(function() {
											self
													.setScrollPosition(
															that.node, 0);
										}, 10);

									} else {
										if (data.errors) {
											self.alert(data.errors[0], null,
													"Auto24");
										}
										;
										UI.back();
									}
									self.ticker('hide');
								} catch (e) {
									console.log('query callback error:'
											+ e.message);
								}

								if (callback) {
									callback()
								}
								;
							});
			return;
		}

		this.inSubpage = false;

		self.loadScrollPosition();

		that.inSubpage = false;
		if (callback) {
			callback()
		}
		;
	}

	aE.onorientationchange = function() {
	}

	var aI = new UIPage(this.sections.login, 'adEditImages',
			$('#adEditImages'), function(ad) {
				this.modifyAd = ad;
				this.section.showPage(this.name);
			}, function() {
			}, 5);

	aI.onshow = function(callback) {
		var ad = this.modifyAd;
		var node = this.node;

		var imgUps = node.children('.imgUpload');
		imgUps.find('img').attr('src', 'gfx/no_photo.png');
		imgUps.attr('has_image', 'false');

		Comm.fetchThumbs(ad, function(data) {
			for (view in data) {
				var v = node.children('.imgUpload[view="' + view + '"]');
				v.attr('has_image', 'true');

				var imgURI = data[view];
				if (imgURI.indexOf('#') != -1) {
					var tokens = imgURI.split("#");
					imgURI = tokens[1] ? tokens[1] : tokens[0];
				}

				v.find('img').attr('src', imgURI);
			}
			if (callback) {
				callback()
			}
			;
		});
	}

	var aV = new DetailPage({
		section:this.sections.login, 
		name:'adView', 
		node:$('#adView'), 
		writeHash: 'login/loginWrite/',
		depth:3
	});

	var aS = new UIPage(this.sections.login, 'adServices', $('#adServices'),
			function(ad, mode) {
				this.mode = mode == 1;
				this.modifyAd = ad;
				this.section.showPage(this.name);
				console.log('loading adServices with mode: ' + mode + '('
						+ this.mode + ')');
			}, function() {
			}, 3);

	aS.calculateTotal = function(container) {
		container = $(container || this.node);

		var total = 0;
		var currency = "";
		var selected = container
				.find('input[type=radio]:checked,option:selected');

		selected.each(function() {
			var $this = $(this);
			var price = $this.attr('data-price') || 0;
			var qty = $this.attr('data-qty_raw') || 0;
			currency = $this.attr('data-cur') || currency;
			total += price * qty;
		});

		return total > 0 ? total.toFixed(2) + " " + currency : '0.00 EUR';
	}

	var showOther = function(callback) {
		self.changeTitle('Orders/Services');
		self.ticker('show');

		var that = this;

		var title = this.mode ? Local.tr('Back') : Local.tr('Next');

		that.node.find('#service_not').html(title);

		Comm.getServices(this.modifyAd, function(data) {
			if (data.status == 'success') {
				that.node.find('.title').html(data.title);
				that.node.find('.info').html(data.description);
				var href = Local.tr('http://www.auto24.ee/')
						+ 'users/shop.php?dbt=3&ref=' + data.id
						+ '&sbmt=Tellimuste+lisamine+%2F+muutmine';
				$('#service_yes').attr('href', href);

				$('#service_yes').click(function() {
					UI.clicked(this);
					window.open(href, '_system');
					return false;
				});
			} else {
				UI.alert(data.error, null, 'Auto24');
			}

			self.ticker('hide');
			if (callback) {
				callback()
			}
			;
		});

	}

	var showServices = function(callback) {
		self.changeTitle('Orders/Services');
		self.ticker('show');

		var that = this;

		var title = this.mode ? Local.tr('Back') : Local.tr('Next');

		that.node.find('#service_not').html(title);

		Comm.getShopItems(this.modifyAd, function(data) {

			if (data.status == 'success') {
				that.node.html(data.html);
				that.node.find('select.image-picker').imagepicker();

				var selects = that.node.find('select.service');

				that.node.find('input,select').change(function() {
					that.node.find('.sums').html(that.calculateTotal());
				});

				that.node.find('a[target=_blank]').click(function(e) {
					UI.clicked(this);
					e.preventDefault();
					e.stopPropagation();
					window.open(this.href, '_system');
				});

				that.node.find('style').remove();

				that.node.find('select.service option:selected').each(
						function() {
							var $this = $(this);
							if ($this.val() > 0) {
								$this.closest('.ShopForm-container').find(
										'.info .custom').html($this.html());
							}
						});

				selects.screenSelect({
					target : '#loginSelect',
					hide : function() {
						UI.hideSelect(false, $('#loginSelect'))
						setTimeout(function() {
							UI.loadScrollPosition();
							self.pageOffset = 0;
							UI.changeTitle('Order services');
						}, 100);
					},
					show : function(that) {
						var text = that.closest('.field')
								.find('.fieldLeft > b').text();
						UI.saveScrollPosition();
						UI.showSelect(text, $('#loginSelect'));
					}
				});

				that.node.find('.sums').html(that.calculateTotal());

				that.node.find('.field').click(function() {
					var $this = $(this);

					var inputs = $this.find('input[type=text]');
					if (inputs.length > 0) {
						inputs.first().focus();
						return;
					}

					var selects = $this.find('.select-button');
					if (selects.length > 0) {
						selects.first().triggerHandler('click');
					}

				});

				that.node.find('.ShopForm-titlebar').click(function() {
					var container = $(this).closest('.ShopForm-container');
					container.removeClass('collapsed');
					return false;
				});

				that.node.find('.ShopForm-titlebar .serviceCancel').click(
						function() {
							UI.clicked(this);
							$(this).closest('.ShopForm-container').find(
									'select').val(0).change().end().addClass(
									'collapsed').removeClass('ordered').find(
									'.info .custom').html('');

							return false;
						})

				that.node.find('.ShopForm-content .serviceClose').click(
						function() {
							UI.clicked(this);
							var container = $(this).closest(
									'.ShopForm-container');

							var option = container
									.find('select.service option:selected');

							var value = option.val();
							var total = option.html();

							container.addClass('collapsed');

							if (value == 0) {
								container.removeClass('ordered').find(
										'.info .custom').html('');
							} else {
								container.addClass('ordered').children(
										'.ShopForm-titlebar').find(
										'.info .custom').html(total);
							}

							return false;
						});

				that.node.find('.ShopForm-content .serviceCancel').click(
						function() {
							UI.clicked(this);
							$(this).closest('.ShopForm-container').find(
									'select').val(0).change().end().find(
									'input[type=radio]').prop('checked', false)
									.change().end().find('.current')
									.removeClass('current').end().addClass(
											'collapsed').removeClass('ordered')
									.find('.info .custom').html('');

							return false;
						});

				that.node.find('.ShopForm-content p').click(function(e) {
					var button = $(this).children('.select-button');
					UI.clicked(button);
					if (button.length > 0) {
						e.stopPropagation();
						e.preventDefault();
						setTimeout(function() {
							button.triggerHandler('click');
						});
					}
					return false;
				});

				that.node.find('.ShopForm-plans p').off('click');

				that.node.find(".ShopForm-plans td").on('click', function() {
					var $that = $(this);
					var i = $that.index();

					if (i == 0)
						return;

					$that.closest('table').find('td').each(function() {
						var $this = $(this);
						var isCurrent = ($this.index() == i);

						$this.toggleClass('current', isCurrent);

						var check = $this.find('input.service')

						check.prop('checked', isCurrent);
						if (isCurrent && check.length > 0) {
							check.change();
						}
					});
				});

				that.node.find('.ShopForm-plans td input.service:checked')
						.closest('td').triggerHandler('click');

				that.node.children('form').submit(
						function() {
							Comm.saveServices(that.modifyAd, $(this)
									.serializeArray(), function(data) {
								if (data.status == "success") {
									window.open(Local
											.tr('http://www.auto24.ee/')
											+ 'users/shop_prindi_arve.php?t='
											+ data.order_id, '_system');
									UI.back();
								} else {
									UI
											.alert('connection error', null,
													'Auto24');
									UI.back();
								}
							});
							return false;
						});

				that.node.find('.summary .shopFormButtonBright').click(
						function() {
							UI.clicked(this);
							UI.back();
							return false;
						});

			} else {
				UI.alert(data.error, null, 'Auto24');
			}

			self.ticker('hide');
			if (callback) {
				callback()
			}
			;
		});

	}

	aS.onshow = shopEnabled ? showServices : showOther;

	var cP = new UIPage(this.sections.login, 'advertise', $('#advertise'),
			function() {
				this.section.showPage(this.name);
			}, function() {
				if (self.inASelect) {
					$('#loginSelect').hide();
					self.inASelect = false;
				}
				this.node.find('.expanded').removeClass('expanded');
			}, 2);

	cP.equipment = new UIPage(this.sections.login, 'adEquipment',
			$('#adEquipment'), function() {
				cP.inSubpage = true;
				this.section.showPage(this.name);
			}, function(next) {
				if (self.inASelect) {
					$('#loginSelect').hide();
					self.inASelect = false;
				}

				if (next != this.parent) {
					this.parent.inSubpage = false;
				}
			}, 3);

	cP.techdata = new UIPage(this.sections.login, 'adTechdata',
			$('#adTechdata'), function() {
				cP.inSubpage = true;
				this.section.showPage(this.name);
			}, function(next) {
				if (self.inASelect) {
					$('#loginSelect').hide();
					self.inASelect = false;
				}
				if (next != this.parent) {
					this.parent.inSubpage = false;
				}
			}, 3);

	cP.otherdata = new UIPage(this.sections.login, 'adOtherdata',
			$('#adOtherdata'), function() {
				cP.inSubpage = true;
				this.section.showPage(this.name);
			}, function(next) {
				if (self.inASelect) {
					$('#loginSelect').hide();
					self.inASelect = false;
				}
				if (next != this.parent) {
					this.parent.inSubpage = false;
				}
			}, 3);

	cP.techdata.parent = cP;
	cP.otherdata.parent = cP;
	cP.equipment.parent = cP;

	cP.otherdata.onshow = cP.techdata.onshow = cP.equipment.onshow = function(
			callback) {
		self.changeTitle('Advertise');
		self.setScrollPosition(this.node, 0);
		if (callback) {
			callback()
		}
		;
	}

	cP.onshow = function(callback) {
		self.changeTitle('Advertise');

		var node = this.node;

		if (!this.inSubpage && !this.modifyAd) {
			self.clearScrollPosition();
			self.setScrollPosition(this.node, 0);

			Comm.fetchFields(0, this, function(data) {
				$('#advertise-name').val(Login.loginUsername);
				$('#advertise-email').val(Login.loginEmail);
				node.find('.advertise-select').val(0);
				node.find('.advertise-select').screenSelect('update');
				node.find('.advertise-location option:selected').attr('selected', false);
				node.find('.advertise-location').val(0);
				node.find('.advertise-location').change();
				node.find('.item-text').find('input').val('');
				node.find('.advertise-name').val(Login.loginUsername);
				node.find('.advertise-email').val(Login.loginEmail);
				node.find('.item-advertise-othermodel').hide();
				node.find('#advertise-type').change();
			});
		}

		this.inSubpage = false;

		self.loadScrollPosition();

		if (callback) {
			callback()
		}
		;
	}

	var cI = new UIPage(this.sections.login, 'adImages', $('#adImages'),
			function(ad) {
				this.modifyAd = ad;
				cP.modifyAd = ad;
				this.section.showPage(this.name);
			}, function() {
			}, 3);

	cI.onshow = function(callback) {
		if (!this.modifyAd) {
			self.hashLink(self.rehash("#login/loginScreen/0"));
		}
		self.changeTitle('Add photos');
		if (callback) {
			callback()
		}
		;
	}

	$('#adImages').find('.imgUploadDone').bind(event, function(e) {
		var ad = cI.modifyAd;

		e.preventDefault();
		e.stopPropagation();

		cI.modifyAd = false;
		cP.modifyAd = false;

		self.hashLink(self.rehash("#login/adServices/0/" + ad + '/0'));
	});

	/*---------------------     FAVORITES SECTION    ----------------------------- */

	var fF = new UIPage(this.sections.login, 'favorites', $('#favorites'),
			function() {
				this.section.showPage(this.name);
			}, function() {
			}, 1);

	fF.hidden = false;

	fF.onshow = function(callback) {
		UI.sections.login.pages.favDetail.reload = false;
		var that = this;
		self.changeTitle('Saved vehicles');
		favStar.style.display = 'none';
		self.ticker('show');
		Favs.getPage(function() {
			that.node.find('.item.archived').off('click').attr('onclick', '')
					.click(
							function(e) {
								UI.clicked(this);
								var item = $(this);
								e.preventDefault();
								e.stopPropagation();
								function confirmed(type) {
									if (type == 1) {
										var id = item.attr('ad');
										Favs.deleteFav(id, function() {
											that.onshow();
										});
									}
								}
								UI.confirm('Ad no longer exists, delete?',
										confirmed, 'Delete,Cancel');
							});

			self.loadScrollPosition();
			self.ticker('hide');
			if (callback) {
				callback()
			}
			;
		});
	}

	fF.onhide = function() {
		this.node.get(0).innerHTML = '';
	}

	new DetailPage({
		section:this.sections.login, 
		name:'favDetail', 
		node:$('#favDetail'),
		writeHash:'login/favWrite/',
		depth:2
	});

	new MailQuestionPage({
		section:this.sections.login,
		name:'favhWrite',
		node:$('#favWrite'),
		depth:3,
	});

	/*---------------------     NEWS SECTION    ----------------------------- */

	new NewsListPage(this.sections.news);
	new NewsDetailPage(this.sections.news);


	/*--------------------- MAIL SECTION  ----------------------------------------   ***/

	var mF = new UIPage(this.sections.mail, 'mailFolders', $('#mailFolders'),
			function() {
				this.section.showPage(this.name);
			}, function() {
			}, 0);

	mF.onshow = function(callback) {
		Mail.getMessageCounts(function(data) {
			$('#inboxUnread').html(data.inbox.total_unread);
			$('#inboxTotal').html(data.inbox.total);

			if (data.inbox.total_unread > 0) {
				$('#inboxUnread').css('font-weight', 'bold');
			} else {
				$('#inboxUnread').css('font-weight', 'normal');
			}

			$('#outboxTotal').html(data.outbox.total);
			if (callback) {
				callback()
			}
			;
		});
		self.changeTitle('Mail folders');
	}
	
	mF.backOverride = function(){
		if(this.backOverrideTarget){
			var target = this.backOverrideTarget; 
			self.hashLink(self.rehash(target));
			this.backOverrideTarget = false;
		}
	}

	var mI = new UIPage(this.sections.mail, 'mailInbox', $('#mailInbox'),
			function(id) {
				this.section.showPage(this.name);
			}, function() {
			}, 1);

	mI.onshow = function(callback) {
		this.node.empty();
		Mail.getFolder(false, 0, Math.max(Mail.inboxOffset, Mail.limit));
		self.changeTitle('Inbox');
		if (callback) {
			callback()
		}
		;
	}

	var mO = new UIPage(this.sections.mail, 'mailOutbox', $('#mailOutbox'),
			function(id) {
				this.section.showPage(this.name);
			}, function() {
			}, 1);

	mO.onshow = function(callback) {
		this.node.empty();
		Mail.getFolder(true, 0, Math.max(Mail.outboxOffset, Mail.limit));
		self.changeTitle('Outbox');
		if (callback) {
			callback()
		}
		;
	}

	var mV = new UIPage(this.sections.mail, 'mailView', $('#mailView'),
			function(id, mode) {
				$('#mailFooter').remove();
				this.node.empty();
				Mail.getMessage(id, mode == 1);

				this.section.showPage(this.name);
			}, function() {
				$('#mailFooter').hide();
			}, 2);

	mV.onshow = function(callback) {
		self.changeTitle('View Message');
		$('#mailFooter').show();
		if (callback) {
			callback()
		}
		;
	}

	var mW = new UIPage(this.sections.mail, 'mailReply', $('#mailReply'),
			function(id) {
				this.node.empty();
				Mail.answerForm(id, this.node, function() {
					self.hashnum++;
					var section = 'mail';
					var Section = self.sections[section];
					var hash = 'mail/mailInbox/' + self.hashnum + '/';
					self.hashLink(hash);
				});
				this.section.showPage(this.name);
			}, function() {
			}, 3);

	mW.onshow = function(callback) {
		self.changeTitle('Compose Message');
		UI.setScrollPosition(this.node.find('.results'), 0);
		if (callback) {
			callback()
		}
		;
	}

	var mF = new UIPage(this.sections.mail, 'mailFollow', $('#mailFollow'),
			function(id) {
				this.node.empty();
				Mail.followForm(id, this, function() {
					self.hashnum++;
					var section = 'mail';
					var Section = self.sections[section];
					var hash = 'mail/mailOutbox/' + self.hashnum + '/';
					self.hashLink(hash);
				});
				this.section.showPage(this.name);
			}, function() {
			}, 3);

	mF.onshow = function(callback) {
		self.changeTitle('Compose Message');
		UI.setScrollPosition(this.node.find('.results'), 0);
		if (callback) {
			callback()
		}
		;
	}

	/*--------------------      VPC SECTION               ----------------------------  */
	new VpcFormPage(this.sections.vpc);
	new VpcResultPage(this.sections.vpc);

	/*---------------------     MISCELLANEOUS BINDINGS    ----------------------------- */

	this.loginForm = $('#loginForm');
	this.favDetail = $('#favDetail');

	var menuButton = document.getElementById('menuButton');
	$(menuButton).bind(event, function(e) {
		e.preventDefault();
		e.stopPropagation();
		self.menuButton();
	});

	$('#darkmask').bind(event, function(e) {
		e.stopPropagation();
		e.preventDefault();
		self.menuButton(false);
	});

	$('#title').bind('touchstart', function(e) {
		e.preventDefault();
		self.setScrollPosition(self.getCurrentPage().node, 0);
	});

	$('#inboxButton').bind('click', function(e) {
		e.preventDefault();
		self.hashnum++;
		var hash = 'mail/mailInbox/' + self.hashnum + '/';
		self.hashLink(hash);
	});

	$('#outboxButton').bind('click', function(e) {
		e.preventDefault();
		self.hashnum++;
		var hash = 'mail/mailOutbox/' + self.hashnum + '/';
		self.hashLink(hash);
	});

	$('.sectionButton').bind('click', function(e) {
		e.preventDefault();
		if (self.showingMenu) {
			self.menuButton(false);
			if (self.inLangSelect)
				self.hideLangSelect();

			if (self.inASelect) {
				self.hideSelect(true, self.selectContainer);
			}

			return self.sectionSwitch(this.getAttribute('rel'), this, e);
		}
	});

	var searchButton = document.getElementById('searchIcon');

	event = 'click';

	$(searchButton).bind(event, function(e) {
		e.preventDefault();
		self.hashnum++;
		var section = 'search';
		var Section = self.sections[section];
		var hash = section + '/' + Section.first + '/' + self.hashnum + '/';
		self.hashLink(hash);
	});

	var favButton = document.getElementById('myFavorites');
	$(favButton).bind(event, function(e) {
		e.preventDefault();
		var hash = 'login/favorites/' + (self.hashnum + 1) + '/';
		self.hashLink(hash);
	});

	var savedButton = document.getElementById('mySaved');
	$(savedButton).bind(event, function(e) {
		e.preventDefault();
		self.hashLink('login/loginSearches/' + (self.hashnum + 1));
	});

	var adsButton = document.getElementById('myAds');
	$(adsButton).bind(event, function(e) {
		e.preventDefault();
		self.hashLink('login/adList/' + (self.hashnum + 1));
	});

	var myMailButton = document.getElementById('myMail');
	$(myMailButton)
			.bind(
					event,
					function(e) {
						UI.sections.mail.pages.mailFolders.backOverrideTarget = '#login/loginScreen/0';
						e.preventDefault();
						self.hashLink('mail/mailFolders/' + (self.hashnum + 1));
					});

	var advertiseButton = document.getElementById('advertiseButton');
	$(advertiseButton).bind(event, function(e) {
		cI.modifyAd = false;
		cP.modifyAd = false;
		e.preventDefault();
		self.hashLink('login/advertise/' + (self.hashnum + 1));
	});

	var newsButton = document.getElementById('newsIcon');
	$(newsButton).bind(event, function(e) {
		e.preventDefault();

		News.reset();
		self.hashnum++;

		var section = 'news';
		var Section = self.sections[section];
		var hash = section + '/' + Section.first + '/' + self.hashnum + '/';

		self.hashLink(hash);
	});

	var mailButton = document.getElementById('mailIcon');
	$(mailButton).bind(event, function(e) {
		e.preventDefault();

		self.hashnum++;
		UI.sections.mail.pages.mailFolders.backOverride = false;
		var section = 'mail';
		var Section = self.sections[section];
		var hash = section + '/' + Section.first + '/' + self.hashnum + '/';
		self.hashLink(hash);
	});

	var loginButton = document.getElementById('myautoIcon');
	this.loginButton = loginButton;
	$(loginButton).bind(event, function(e) {
		e.preventDefault();
		self.hashnum++;
		var section = 'login';
		var Section = self.sections[section];
		var hash = section + '/' + Section.first + '/' + self.hashnum + '/';
		self.hashLink(hash);
	});

	var vpcButton = document.getElementById('vpcIcon');
	this.vpcButton = vpcButton;
	$(vpcButton).bind(event, function(e) {
		e.preventDefault();
		self.hashnum++;
		var section = 'vpc';
		var Section = self.sections[section];
		var hash = section + '/' + Section.first + '/' + self.hashnum + '/';
		self.hashLink(hash);
	});

	var rallyButton = document.getElementById('rallyIcon');
	$(rallyButton).bind(event, function(e) {
		navigator.splashscreen.show();
		$('#dashBoard').hide();
		setTimeout(function() {
			location = 'rally/rally.html';
		}, 10);
	});

	this.tickEl = document.getElementById('ticker');
	this.tickEl.onclick = function() {
	};

	this.noHashChangeSupport = true;

	if ('onhashchange' in window || 'onhashchange' in document) {
		window.addEventListener("hashchange", function() {
			self.hashChanged()
		}, false);
		this.noHashChangeSupport = false;
	}

	self.hashLink('dash/dashBoard/0/0');
	
	// MYSTIC VOODOO
	if (this.isAndroid) {
		$('#adHitcounts').css('width', '46.6em');
		$('#dashBoard').hide();
		setTimeout(function() {
			$('#dashBoard').show();
		}, 0);
		this.ctrl_back.style.display = 'none';
	} else {
		this.ctrl_back.style.display = 'block';
	}
}

MobUI.prototype.busy = false;
MobUI.prototype.tickEl = '';
MobUI.prototype.viewportWidth = 320;
MobUI.prototype.webMode = !!((location.protocol == 'http:' || location.protocol == 'https:') && location.host);
MobUI.prototype.searchForm = '';
MobUI.prototype.loginForm = '';
MobUI.prototype.searchResult = '';
MobUI.prototype.searchDetail = '';
MobUI.prototype.favDetail = '';
MobUI.prototype.showingMenu = false;
MobUI.prototype.selectContainer = null;

/**
 * if this is a dreaded honeycomb tablet which needs haxes on dom updates
 */
MobUI.prototype.isHoneycomb = false;

/**
 * If this device is a tablet rather than a smartphone, and should have HQ
 * images in detail view. Identification done via useragent string, honeycomb
 * and ipads count as tablets, else smartphone.
 */
MobUI.prototype.isTablet = false;
/**
 * if this is an android device, zoom with pinch wont work - so we show buttons
 */

MobUI.prototype.isAndroid = false;

/**
 * Contains sections indexed by name
 * 
 * @var
 */
MobUI.prototype.sections = {}

/**
 * Name of the currently active section
 * 
 * @var
 * @type string
 */
MobUI.prototype.currentSection = '';

/**
 * Link to the ui backbutton element
 * 
 * @var
 * @type DomNode
 */
MobUI.prototype.ctrl_back = null;

/**
 * Link to the ui title element
 * 
 * @var
 * @type DomNode
 */
MobUI.prototype.title = null;

MobUI.prototype.resultStart = 0;
MobUI.prototype.resultCount = 0;
MobUI.prototype.resultLimit = 20;
MobUI.prototype.fontSize = 16;

/**
 * Previous section name used for one-time back-navigation
 * 
 * @var
 * @type mixed
 */
MobUI.prototype.prevSect = false;

/**
 * Whether the next back-nav event should close the app
 * 
 * @var
 * @type boolean
 */
MobUI.prototype.quitWarning = false;

/**
 * Global history number, used to prevent backwards-moving hashes from being
 * rewritten to history
 * 
 * @var
 * @type int
 */
MobUI.prototype.hashNum = 0;

/**
 * Whether this platform cannot support onHashChange events
 * 
 * @var
 * @type boolean
 */
MobUI.prototype.noHashChangeSupport = true;

/**
 * Whether the UI is currently in a select screen (which are not treated as
 * pages for history purposes)
 * 
 * @var
 * @type boolean
 */
MobUI.prototype.inASelect = false;

/**
 * Whether the current platform has the orientation change event
 * 
 * @var
 * @type boolean
 */
MobUI.prototype.hasOrientationChange = false;

/**
 * Reference to the zoomer element
 * 
 * @var
 * @type DomNode
 */
MobUI.prototype.zoomer = null;

MobUI.prototype.iOS5_timeout = null;

MobUI.prototype.initialize = function(){
	// generate some html that is just wrong to type
	var years = "<option value='0' data-i18ntxt='any'>" + Local.tr('any')
			+ "</option>";
	var this_year = new Date().getFullYear()
	for (i = this_year; i > 1900; i -= 1) {
		var option = "<option value='" + i + "'>" + i + "</option>";
		years += option;
	}

	var months = "<option value='0' data-i18ntxt='any'>" + Local.tr('any')
			+ "</option>";

	for (i = 1; i <= 12; i++) {
		i_name = ((i + "").length < 2) ? "0" + i : i;
		var option = "<option value='" + i + "'>" + i_name + "</option>";
		months += option;
	}

	$('.year-select').each(function() {
		this.innerHTML = years
	});
	
	$('.month-select').each(function() {
		this.innerHTML = months
	});
	
	this.initializePages();
}

MobUI.prototype.initializePages = function(){
	for(s in this.sections){
		var section = this.sections[s];
		for(p in section.pages){
			var page = section.pages[p];
			if(page.initialize){page.initialize(this)};
		}
	}
}

MobUI.prototype.onLocalize = function() {

	$('#regLink').attr('href',Local.tr('http://www.auto24.ee/') + '/users/reg.php');
	$('#loginName').html(Local.tr(Login.loginUsername));

	if (News) {
		News.reset();
	}

	$('.agreement-label>a').attr('href',
			Search.getRoot('/users/kasutustingimused.php'));
	$('#myAdsLink').attr('href',
			Local.tr('http://www.auto24.ee/') + 'users/minu_at.php');
	
	UI.translateAttributes('input[placeholder]','placeholder');
	UI.translateAttributes('input[type=submit],input[type=button]','value');
	UI.localizePages();
}

MobUI.prototype.localizePages = function(){
	for(s in this.sections){
		var section = this.sections[s];
		for(p in section.pages){
			var page = section.pages[p];
			if(page.onlocalize){page.onlocalize(this)};
		}
	}	
}

// TODO probably move to i18n
MobUI.prototype.translateAttributes = function(selector, attribute){
	$(selector).each(function(){
		var $this = $(this);
		var data_attr = $this.attr('data-tr-'+attribute);
		if(data_attr){
			$this.attr(attribute,Local.tr(data_attr));
		}else{
			var attr = $this.attr(attribute);
			$this.attr(attribute,Local.tr(attr));
			$this.attr('data-tr-'+attribute,attr);
		}
	});
}

MobUI.prototype.bindAndroidButtons = function() {
	if (this.isAndroid) {
		document.addEventListener("pause", function() {
			console.log('paused');
		}, false);

		document.addEventListener("resume", function() {
			console.log('resumed');
		}, false);

		document.addEventListener('backbutton', function() {
			if (UI.showingMenu) {
				UI.menuButton(false);
			} else {
				UI.back();
			}
			return false;
		});

		document.addEventListener('menubutton', function() {
			if (UI.currentSection != 'dash' || UI.inLangSelect) {
				UI.menuButton();
			}
		});
	}
}

MobUI.prototype.deviceReady = function() {
	this.isDeviceReady = true;
	console.log('device is ready');

	this.bindAndroidButtons();

	var uaid = "UA-8897065-11"; // v2 release uaid
	// uaid = 'UA-27181546-2'; // v2 debug uaid

	navigator.analytics.setTrackingId(uaid);
	console.log('analytics: set tracking uaid ' + uaid);

	// camera interface
	this.hasCamera = true;

	function performUpload(self) {
		var source = Camera.PictureSourceType.PHOTOLIBRARY;
		var imgElement = self.find('img');
		var viewId = self.children('input').val();

		var useCamera = false;

		function sourcePicked(type) {
			if (type == 1) {
				source = Camera.PictureSourceType.CAMERA
				UI.uploadImage(source, imgElement, viewId);
			} else if (type == 2) {
				UI.uploadImage(source, imgElement, viewId);
			}
		}

		if (UI.hasCamera) {
			UI.confirm('Select picture source', sourcePicked,
					'Camera,Picture Library');
		} else {
			UI.uploadImage(source, imgElement, viewId);
		}
	}

	$('.imgUpload')
			.bind(
					'click',
					function(e) {

						var $imgUpload = $(this);
						var self = this;
						e.preventDefault();
						e.stopPropagation();

						if ($imgUpload.attr('has_image') == "true") {
							console.log('image already exists!');
							UI
									.confirm(
											'Do you want to change or delete this image?',
											function(c) {
												if (c == 1) {
													performUpload($imgUpload);
												} else if (c == 2) {
													var imgElement = $imgUpload
															.find('img');
													UI
															.confirm(
																	'Really delete?',
																	function(c) {
																		if (c == 1) {
																			UI
																					.deleteImage(
																							$imgUpload
																									.find(
																											'input')
																									.first()
																									.val(),
																							function(
																									data) {
																								if (data.status == 'success') {
																									imgElement
																											.attr(
																													'src',
																													'gfx/no_photo.png');
																									$imgUpload
																											.attr(
																													'has_image',
																													'false');
																								} else {
																									UI
																											.alert('Error while deleting image');
																								}
																							});
																		}
																	},
																	'Delete,Cancel');
												}
											}, 'Change,Delete');
						} else {
							performUpload($imgUpload);
						}
					});
}

MobUI.prototype.alert = function(message) {
	message = Local.tr(message);
	if (this.webMode) {
		alert(message);
	} else {
		navigator.notification.alert(message, null, "Auto24");
	}
}

MobUI.prototype.confirm = function(message, callback, buttons) {
	message = Local.tr(message);
	if (this.webMode) {
		if (callback) {
			callback(confirm(message) ? 1 : 2)
		}
		;
	} else {
		buttonArray = buttons.split(',');
		for (button in buttonArray) {
			buttonArray[button] = Local.tr(buttonArray[button]);
		}
		buttons = buttonArray;

		navigator.notification.confirm(message, callback, "Auto24", buttons);
	}
}

MobUI.prototype.saveScrollPosition = function() {
	var page = this.getCurrentPage();
	page.scrollOffset = this.getScrollPosition(page.node);
	page.defaultHeight = page.node.css('height');
	page.node.css('min-height', page.node.height());
}

MobUI.prototype.loadScrollPosition = function() {
	var self = this;
	setTimeout(function() {
		var page = self.getCurrentPage();
		var offset = page.scrollOffset;
		var height = page.defaultHeight ? page.defaultHeight : 'auto';
		if (!offset) {
			offset = 0
		}
		;
		self.setScrollPosition(page.node, offset);
		page.scrollOffset = 0;
		page.node.css('min-height', '');
	}, 0);
}

MobUI.prototype.clearScrollPosition = function(page) {
	page = page ? page : this.getCurrentPage();
	page.scrollOffset = 0;
}

/**
 * Retrieve a jquery element's scroll position in proper device-specific way
 * 
 * @param {JQuery}
 *            target
 * @returns {int} target's scroll position
 */
MobUI.prototype.getScrollPosition = function(target) {
	var scrollTop = undefined;

	if (this.webMode) {
		return target.scrollTop();
	}

	if (this.isApple) {
		var pos = target.scrollTop();
		return pos;
	}

	return $('body').scrollTop();
}

/**
 * Set a jquery element's scroll position in proper device-specific way
 * 
 * @param {JQuery}
 *            target
 * @param {int}
 *            position
 * @returns {void}
 */
MobUI.prototype.setScrollPosition = function(target, position) {
	if (this.isApple) {
		target.scrollTop(position);
		target.css('border-right', '1px solid transparent');
		setTimeout(function() {
			target.css('border-right', 'none')
		});
	} else {
		scrollTo(0, position);
	}
}

/**
 * Show, hide or toggle the global menu, where appropriate This function will
 * either show or hide the global navigation menu depending on the passed state
 * parameter and whether the menu is already shown or hidden. The menu will not
 * be shown if the current page is a gallery or dashboard.
 * 
 * @param {boolean}
 *            [state] whether to show(true) or hide(false) the menu. If omitted,
 *            menu will be toggled.
 * @function
 * @returns {void}
 */
MobUI.prototype.menuButton = function(state, force) {

	/* Skip everything if dash or gallery */
	if ((this.inGallery || this.getCurrentPage().name == 'dashBoard'
			&& !this.inLangSelect)
			&& !force) {
		return;
	}

	if (this.menuInTransition) {
		return;
	}

	var self = this;

	if (state === undefined) {
		state = !this.showingMenu;
	}
	if (state && !this.showingMenu) {
		$('#buttonMenu').show();
		this.menuInTransition = true;

		var mask = $('#darkmask')

		mask.css('display', 'block');
		setTimeout(function() {
			mask.css('opacity', 0.5);
		});
		setTimeout(function() {
			self.menuInTransition = false
		}, 200);

		$('#menuButton').addClass('menuButtonActive');
		$('#menuButton').removeClass('menuButtonDisabled');

		setTimeout(function() {
			// this fixes unnecessary extra events being fired on the actual
			// button
			$('#buttonMenu').attr('disabled', false);
		}, 10);

		this.showingMenu = state;
	} else if (!state && this.showingMenu) {
		$('#buttonMenu').hide();
		this.menuInTransition = true;

		var mask = $('#darkmask')

		setTimeout(function() {
			mask.css('opacity', 0.0);
		});

		setTimeout(function() {
			self.menuInTransition = false
			mask.css('display', 'none');
		}, 200);

		$('#menuButton').removeClass('menuButtonActive');
		$('#menuButton').addClass('menuButtonDisabled');
		$('#buttonMenu').attr('disabled', true);
		this.showingMenu = state;
	}
}

/**
 * Utility method to change a section
 * 
 * @param {string}[section=dash]
 *            section name of section to change to; dashboard, if omitted;
 * @param {domNode}[element]
 *            optional element to apply "clicked" effect to
 * @param {Event}[event]
 *            optional - event that triggered the switch, will be stopPropagated
 *            and preventDefaulted
 * @returns {void}
 */

MobUI.prototype.sectionSwitch = function(section, element, event) {

	if (!section) {
		section = "dash";
	}

	if (event) {
		event.stopPropagation();
		event.preventDefault();
	}

	if (element)
		this.clicked(element);

	this.hashnum++;
	var Section = this.sections[section];
	var hash = section + '/' + Section.first + '/' + this.hashnum + '/';
	this.hashLink(hash);

	return false;
}

/**
 * Take an old hash and update it with new global history number so it won't
 * trigger back-nav detection
 * 
 * @function
 * @param {string}
 *            hash
 * @returns {string} the new hash string
 */
MobUI.prototype.rehash = function(hash) {
	hash = hash.substr(1).split('/');
	var nhash = hash[0] + '/' + hash[1] + '/' + (this.hashnum);
	for ( var i = 3; i < hash.length; i++) {
		nhash += '/' + hash[i];
	}
	return nhash;
}

/**
 * Navigate upwards in section history
 * 
 * @param {string}
 *            [fragment] optional value to pass to the previous page (use for
 *            transferring state data between pages)
 * @returns {void}
 */

MobUI.prototype.up = function(fragment) {
	var self = this;
	if (self.getCurrentPage().depth > 0) {
		if (!UI.busy) {
			self.hashnum++;
			var section = self.sections[self.currentSection];
			section.history.pop();
			var hash = section.history[section.history.length - 1].hash;
			hash = this.rehash(hash);
			self.hashLink(hash);
		}
	}
}

/**
 * Changes the title in header. This function changes the header title text to
 * localized given value, or, if none given, the logo. Additionally, it scrolls
 * the document so the title is in view, as this function is only intended for
 * use on page switches.
 * 
 * @function
 * @param {string}[title]
 *            the title that should be shown. if null, header will switch to
 *            logo.
 * @returns {void}
 */
MobUI.prototype.changeTitle = function(title) {
	/*
	 * should really move $header to UI vars rather than fetch them always
	 */
	var header = document.getElementById('header');
	this.title.scrollIntoView();

	this.haxComb(header);

	if (!title) {
		this.title.style.display = 'none';
	} else {
		this.title.style.display = 'block';
		this.title.innerHTML = Local.trUcf(title);
	}
}

/**
 * Forces browser to redraw the element by mucking around with its max/height
 * css. Hacky.
 * 
 * @param {jQuery}
 *            jElement to affect
 * @param {int}
 *            [timeout=100] how many milliseconds to give browser for redraw
 */
MobUI.prototype.forceRepaint = function(jElement, timeout) {
	if (typeof timeout == 'undefined') {
		timeout = 100;
	}

	jElement.css('max-height', jElement.css('height'));
	setTimeout(function() {
		jElement.css('max-height', 'none');
	}, timeout);
}

/**
 * Get name of the currently displayed page
 * 
 * @function
 * @returns {string} name of the currently displayed page
 */
MobUI.prototype.getCurrentPageName = function() {
	if (this.currentSection) {
		var s = this.sections[this.currentSection];

		if (s.current)
			return this.sections[this.currentSection].current.page;
	}

	return 'undefined';
}

/**
 * Get UIPage object that represents the currently displayed page
 * 
 * @function
 * @returns {UIPage} currently displayed page
 */
MobUI.prototype.getCurrentPage = function() {
	if (this.currentSection) {
		var s = this.sections[this.currentSection];
		if (s.current) {
			return s.pages[s.current.page];
		}
	}

	var hash = location.hash.substr(1).split('/');
	var section = hash[0];
	var page = hash[1];

	if (section && page) {
		var Page = this.sections[section].pages[page];
		return Page;
	} else {
		return this.sections.dash.pages.dashBoard;
	}
}

/**
 * Helper function to hide language select menu
 */
MobUI.prototype.hideLangSelect = function() {
	UI.inLangSelect = false;
	$('#dashSelect').hide();
	$('#dashBoard').show();
	$('.langback').hide();
	UI.changeTitle();
	UI.ctrl_back.disabled = false;
	scroll(0, 0);
}

/**
 * Go one page back, if possible This function handless all the back-navigation
 * actions such as html ui backbutton, android hardware backbutton, etc It will
 * skip going back in navigation if a back-button press had occured in a select
 * screen or in 'more options' on searchForm Additionally, it will do absolutely
 * nothing if the UI thinks itself to already be busy with some navigation step.
 * 
 * @returns {void}
 * @function
 */
MobUI.prototype.back = function() {
	if (this.busy) {
		return;
	}

	$('input').blur();

	// special cases like back button in select menus go here

	if (this.inGallery) {
		this.getCurrentPage().gallery.hide();
	} else if (this.showingMenu) {
		this.menuButton(false);
	} else if (Ads.popupVisible) {
		Ads.hidePopup();
	} else if (this.inASelect) {
		this.hideSelect(true, this.selectContainer);
	} else if (this.inLogin) {
		Login.hideLogin();
		Login.loginAction = function() {
		};
	} else if (this.inLangSelect) {
		this.hideLangSelect();
	} else if (this.inAdvSelects && this.getCurrentPageName() == 'searchForm') {
		$('#okOptions').click();
	} else if (this.inModelSelects && this.getCurrentPageName() == 'searchForm') {
		$('#models-submit').click();
	} else {
		if (this.prevSect) {
			var section = this.sections[this.prevSect];
			this.hashLink(this
					.rehash(section.history[section.history.length - 1].hash));
			this.prevSect = false;
		} else {
			var p = this.getCurrentPage();
			if (p.backOverride) {
				p.backOverride();
			} else if (p.depth > 0) {
				this.up();
			} else {
				if (this.currentSection == 'dash') {
					navigator.app.exitApp();
				} else {
					this.sectionSwitch('dash');
				}
			}
		}
	}
}

/**
 * Request a page change. This function will update location.hash to the
 * provided new hash, and manually trigger MobUI.hashChanged if environment
 * doesn't support onhashchange.
 * 
 * @param {string}
 *            hash the string containing the target hash, typically in the
 *            following format:
 *            [sectionName]/[pageName]/[globalHistoryInt]/[page-specific data
 *            string].
 * @returns {void}
 * @function
 */
MobUI.prototype.hashLink = function(hash) {
	location.hash = hash;
	if (this.noHashChangeSupport) {
		this.hashChanged();
	}
}

MobUI.prototype.processTextImpostor = function($this) {
	var values = [];
	var totalText = "";

	$this.find('input[type=text]').each(function() {
		var text = $(this).val();
		values.push(text);
		totalText += text;
	});

	var isSelected = totalText.trim().length > 0;

	var id = $this.attr('id');
	var impostorId = 'impostor-' + id;
	var ifg = $('#impostorFieldGroup');
	var c = ifg.children('#' + impostorId).size();
	var hasImpostor = c > 0;

	if (isSelected) {
		if (hasImpostor) {
			var i = 0;
			var localImpostors = $('#' + impostorId).find('input[type=text]');
			localImpostors.each(function() {
				$(this).val(values[i]);
				i++;
			});
		} else {
			var inputs = $this.find('input[type=text]');
			var impostor = $('<div class="form-item"></div>');

			impostor.attr('id', impostorId);
			impostor.attr('data-impostor-for', id);

			if (inputs.size() > 1) {
				impostor.addClass('item-double-text');
			}
			;

			impostor.toggleClass('item-multiline', $this
					.hasClass('item-multiline'));
			impostor.toggleClass('item-text', $this.hasClass('item-text'));
			impostor.toggleClass('item-text-text', $this
					.hasClass('item-text-text'));

			var field = $("<div class=field></div>");
			var clone = inputs.clone();

			var originalLabel = $this.find('label');
			var label = originalLabel.html();

			impostor.append("<label class='label' for='impostor-"
					+ clone.first().attr('id') + "' data-i18ntxt='"
					+ originalLabel.attr('data-i18ntxt') + "'>" + label
					+ "</label>");

			clone.appendTo(field);

			if (clone.size() > 1) {
				clone.first().after(
						$('<span class="separator" data-i18ntxt="–">–</span>'));
			}

			field.appendTo(impostor);
			
			this.wrapUnderline(impostor.find('input[type=text]'));

			ifg.prepend(impostor);

			clone.each(function() {
				var $t = $(this);
				var iid = $t.attr('id');

				$t.attr('id', 'impostor-' + iid);

				var v = $('#' + iid).val();

				$t.attr('name', '');
				$t.attr('data-impostor-for', iid);
				$t.val(v);
			});

			clone.change(function() {
				var $this = $(this);
				$('#' + $this.attr('data-impostor-for')).val($this.val());
			});
		}
	} else { // check if clone deletion necessary
		if (hasImpostor) {
			$('#' + impostorId).remove();
		}
	}
}

MobUI.prototype.setupImpostorCheckbox = function(check) {
	if (!check)
		check = $(this);
	var row = check.closest('.form-item').last();
	row.find('.label_check').toggleClass('c_on', check.is(':checked'));
}

MobUI.prototype.processCheckboxImpostor = function($this) {
	var isSelected = $this.find('input[type="checkbox"]').prop('checked');
	var id = $this.attr('id');
	var impostorId = 'impostor-' + id;
	var ifg = $('#impostorFieldGroup');
	var c = ifg.children('#' + impostorId).size();
	var hasImpostor = c > 0;
	var self = this;

	if (isSelected) {
		if (hasImpostor) {
			var cb = $('#' + impostorId).find('input[type="checkbox"]');
			cb.prop("checked", isSelected);
			self.setupImpostorCheckbox(cb);
		} else {
			var input = $this.find('input');
			var name = input.attr('name');
			var impostor = $('<div class="form-item item-checkbox"></div>');

			impostor.attr('id', impostorId);
			impostor.attr('data-impostor-for', id);

			var originalLabel = $this.find('label');
			var label = originalLabel.html();
			impostor.append("<label class='label' for='" + impostorId
					+ "' data-i18ntxt='" + originalLabel.attr('data-i18ntxt')
					+ "'>" + label + "</label>");

			var field = $("<div class=field></div>");
			var clone = input.clone();

			if ($this.hasClass('item-multiline')) {
				impostor.addClass('item-multiline');
			}

			clone.appendTo(field);
			field.appendTo(impostor);
			ifg.prepend(impostor);

			clone.wrap($("<div class='label_check'></div>"));

			var iid = clone.attr('id');

			clone.attr('id', 'impostor-' + iid);
			clone.attr('name', '');
			clone.attr('data-impostor-for', iid);
			clone.prop('checked', isSelected);

			impostor.click(function() {
				$(this).find('input').first().each(
						function() {
							var $this = $(this);
							this.checked = !this.checked;
							self.setupImpostorCheckbox($this);
							$('#' + $this.attr('data-impostor-for')).prop(
									'checked', this.checked).change();
						});
			});

			setTimeout(function() {
				self.setupImpostorCheckbox(clone);
			});
		}
	} else { // check if clone deletion necessary
		if (hasImpostor) {
			$('#' + impostorId).remove();
		}
	}
}

MobUI.prototype.processSelectImpostor = function($this) {
	var isSelected = $this.find('.select-button').hasClass(
			'select-button-selected');
	var id = $this.attr('id');
	var impostorId = 'impostor-' + id;
	var ifg = $('#impostorFieldGroup');
	var c = ifg.children('#' + impostorId).size();
	var hasImpostor = c > 0;

	if (isSelected) {
		if (hasImpostor) {
			$('#' + impostorId).val($this.val()).screenSelect('update');
		} else {
			var select = $this.find('select');
			var name = select.attr('name');

			var impostor = $('<div class="form-item item-select"></div>');

			impostor.attr('id', impostorId);
			impostor.attr('data-impostor-for', id);

			if (select.size() > 1) {
				impostor.addClass('item-double-select');
			}
			;

			var field = $("<div class=field></div>");
			var clone = select.clone();

			var originalLabel = $this.find('label');
			var label = originalLabel.html();

			impostor.append("<label class='label' for='impostor-"
					+ clone.first().attr('id') + "' data-i18ntxt='"
					+ originalLabel.attr('data-i18ntxt') + "'>" + label
					+ "</label>");

			clone.appendTo(field);

			if (clone.size() > 1) {
				clone.first().after(
						$('<span class="hbar" data-i18ntxt="―">―</span>'));
			}

			field.appendTo(impostor);

			ifg.prepend(impostor);

			clone.each(function() {
				var $t = $(this);
				var iid = $t.attr('id');

				$t.attr('id', 'impostor-' + iid);

				var v = $('#' + iid).val();

				$t.attr('name', '');
				$t.attr('data-impostor-for', iid);
				$t.val(v);
			});

			setTimeout(function() {
				clone.screenSelect('update');
			});

			clone.screenSelect({
				target : '#selectScreen',
				hide : function(that) {
					$('#' + that.attr('data-impostor-for')).val(that.val())
							.change();
					UI.sections.search.pages.searchForm.updateAdvText();
					UI.hideSelect(false, $('#selectScreen'));

					setTimeout(function() {
						UI.loadScrollPosition();
					}, 100);
				},
				show : function(that) {
					var selector = "label";
					UI.saveScrollPosition();
					UI.showSelect(that.closest('.item-select').find(selector)
							.text(), $('#selectScreen'));
				}
			});

			impostor.click(function(e) {
				if (e.target.className == 'field') {
					$(this).find('.select-button').first().triggerHandler(
							'click');
				}
			});

		}
	} else { // check if clone deletion necessary
		if (hasImpostor) {
			$('#' + impostorId).remove();
		}
	}
}

/**
 * Reusable bit for showing the select screens
 * 
 * @param {string}
 *            [title] what to show in the caption
 * @param {node}
 *            [container] element which should be shown
 * @returns null
 */
MobUI.prototype.showSelect = function(title, container) {
	var self = this;
	if (!container)
		container = $('#selectScreen');
	else
		container = $(container);

	this.selectContainer = container;

	container.addClass('active');
	container.show();

	this.getCurrentPage().node.hide();
	this.changeTitle(Local.trUcf(title));

	container.css("visibility", "hidden");
		
	setTimeout(function() {
		var chosen = container.find('.selectDiv.selected').get(0);
		if (chosen) {
			var offset = chosen.offsetTop;
			offset -= 2.5 * UI.fontSize;
			self.setScrollPosition(container, offset);
		} else {
			console.log('nothing chosen, offset = 0');
			self.setScrollPosition(container, 0);
		}
		
		container.css({
			"visibility":"visible",
			"max-height":container.height(),
		});
		
		setTimeout(function(){
			container.css("max-height", "none");
		}, 75);
	}, 25);
	
	scroll(0, 0);
	self.inASelect = true;
}

MobUI.prototype.hideSelect = function hideSelect(instantly, container) {
	var self = this;

	if (!container)
		container = UI.selectContainer;
	else
		container = $(container);

	if (UI.isIOS7 && instantly) {
		container.css("visibility", "hidden")
	}


	if (this.isApple) {
		$('.alphascroll').remove();
	}

	// why setTimeout? Because user would want to see what button they
	// clicked,
	// and humans are SLOW.
	function actually_hide() {
		container.hide();
		container.removeClass('active');
		
		var page = self.getCurrentPage();

		page.node.show();
		$('.selectback').hide();

		if (!UI.isAndroid) {
			UI.ctrl_back.disabled = false;
			UI.ctrl_back.style.display = 'block';
		}

		if (self.isHoneycomb) {
			$('#header').hide();
		}

		setTimeout(function() {
			if (UI.isHoneycomb) {
				$('#header').show();
			}
			if (UI.isIOS5 || UI.isIcecream) {
				UI.setScrollPosition(container, 0);
			}
		}, 100);
		scroll(0, 0);
		self.inASelect = false;
		
		var title = Local.tr(page.parent ? page.parent.name : page.name);
		self.changeTitle(title);
	}

	if (instantly){
		actually_hide();
	}else{
		setTimeout(actually_hide, 100);
	}
}

/**
 * Handles hash change events. This function is responsible for updating the UI
 * once a hash change event has been received (or emulated in environments where
 * onhashchange is not supported). It does so by parsing location.hash for
 * section and page names, global and section history, and then determining
 * whether the change was a forward one (global history counter incremented) or
 * triggered by browser-back button (global history counter decremented). In
 * case of back-button change, the (global)hash will be overridden by a previous
 * section-scope page. Then, the proper requested page is shown and its onshow
 * function passed the data in the hashe's last segment. The page is responsible
 * for making sense of the final segment itself (such as detail view
 * understanding it to be an id of the ad to show)
 * 
 * @function
 * @returns {void}
 */
MobUI.prototype.hashChanged = function() {

	if (this.showingMenu)
		this.menuButton(false);

	this.quitWarning = false;

	var hash = location.hash.substr(1).split('/');
	var section, history, decremented;

	hash = {
		section : hash[0],
		page : hash[1],
		globalAge : parseInt(hash[2]),
		data : hash[3],
		fragment : hash[4],
		raw : location.hash
	};

	if (hash.globalAge < this.hashnum) {
		decremented = true;
	}

	if (this.currentSection != hash.section) {
		this.section(hash.section);
	} else {
		this.prevSect = false;
	}

	section = this.sections[this.currentSection];
	this.hashnum++;

	if (section.current) {
		if (section.current.page != hash.page
				|| section.pages[hash.page].alwaysReload) {
			section.loadPage(hash.page, decremented, hash.data, hash.fragment);
		} else {
			section.showPage(hash.page);
		}
	} else {
		section.loadPage(hash.page, decremented, hash.data, hash.fragment);
	}

	if (navigator.analytics) {
		console.log("analytics: submitting " + location.hash);

		var success = function() {
			console.log('analytics: appview submission succesful')
		};
		var error = function(err) {
			console.log('analytics: appview submission failed: ' + err)
		};

		navigator.analytics.sendAppView(location.hash, success, error);
	}
}

/**
 * Switches between sections.
 * 
 * @param {string}
 *            sect the name of the section to switch to
 * @returns {void}
 * @function
 */
MobUI.prototype.section = function(sect) {
	$('#loginDialog').hide();
	$('#mask').hide();

	if (!(sect in this.sections)) {
		sect = 'dash';
	}

	Sect = this.sections[sect];

	if (this.currentSection)
		this.sections[this.currentSection].hide(Sect);

	this.currentSection = sect;
	Sect.show();
}

/**
 * Load next set of search result on currently open page. Attaches to next-rows
 * button This function only exists to prevent unnecessary closures.
 */
MobUI.prototype.loadNext = function() {

	var Search = new WebSearch;
	var self = UI;
	var page = self.getCurrentPage();
	var button = page.node.find('.results .next');

	button.text(Local.trUcf('Loading...'));
	button.get(0).onclick = null;

	self.saveScrollPosition();

	var start = page.resultStart + self.resultLimit;
	
	UI.ticker('show');
	page.resultStart = start;
	Search.loadResult(page.params, page, function() {
		button.remove();
		UI.forceRepaint(page.node);
		UI.ticker('hide');
	}, start, self.resultLimit);
}

/**
 * Uniform behaviour for clicked UI items
 * 
 * @param {DOMNode}
 *            [element=this] element to apply the clicked anim to
 * @function
 */
MobUI.prototype.clicked = function(element) {
	var self = element ? element : this;
	$(self).css('opacity', '0.7');
	setTimeout(function() {
		$(self).css('opacity', '');
	}, 400);
}

/**
 * Helper function to resize banner elements on page. For use in
 * page.onorientationchange events.
 * 
 * @param {JQuery}
 *            adContainer the jquery object containing the banner node
 */
MobUI.prototype.resizeBanner = function(adContainer) {
	var adImg = adContainer.find('img').first();

	var adWidth = adImg.attr('width');
	var adHeight = adImg.attr('height');

	var bWidth = $('body').width();

	var nh = adHeight * (bWidth / adWidth);
	adContainer.css({
		width : bWidth + 'px',
		height : nh + "px"
	});
	adImg.attr('width', bWidth);
	adImg.attr('height', nh);
}


/**
 * Fires callback once all images in provided DOM Node have been loaded, aborted, or timed out
 */
MobUI.prototype.waitForImages = function(element, callback){
	var incomplete = true;
	var $node = $(element);
	var images = $node.children().find('img');
	var imageCount = images.size();
	UI.ticker('show');

	var imageCallback = function(status) {
		var count = 0;
		var aborted = 0;
		if (incomplete) {
	
			images.each(function() {
				if (this.width > 0) {
					count++;
				}else if ($(this).attr('aborted')){
					aborted++;
				}
			});

			if (count+aborted >= imageCount) {
				incomplete = false;
				clearTimeout(waitTimeout);
				UI.ticker('hide');
				callback();
			}
		}
	}

	var waitTimeout;

	var timeoutCallback = function() {
		if (incomplete) {
			incomplete = false;
			UI.ticker('hide');
			callback();
		}
	}

	var imageAbort = function() {
		$(this).attr('aborted', true);
		imageCallback('abort/error');
	}

	if (imageCount > 0) {
		images.on('load', imageCallback);
		images.on('error', imageAbort);
		images.on('abort', imageAbort);
		imageCallback('initial call'); // maybe they got loaded already
		waitTimeout = setTimeout(timeoutCallback, 5000);
	} else {
		UI.ticker('hide');
		callback();
	}
}

/**
 * Displays the passed search results.
 * 
 * @param {array}
 *            data array of the results to be shown
 * @param {UIPage}
 *            page to show results on
 * @param {function}
 *            callback function to execute on completion
 * @function
 * @returns {void}
 */
MobUI.prototype.renderSearchResult = function(data, page, callback) {

	var self = this;
	var node = page.node;

	var resultContainer;
	var jResultContainer = node.find('.results');
	
	var containerFragment = document.createDocumentFragment();

	if (jResultContainer.length == 0) {
		var resultContainer = document.createElement('div');
		resultContainer.setAttribute('class', 'results scrollFrame');
		node.append(resultContainer);
	} else {
		resultContainer = jResultContainer.get(0);
	}

	var data_count = data.length;

	if (data_count > 0) {
		for ( var i = 0; i < data_count; i++) {
			var row = data[i];
			var item = UI.getResultItem(row, page.detailPage);
			containerFragment.appendChild(item);
		}
	}

	var data_offset = data_count + page.resultStart;
	if (data_offset < page.resultCount) {

		node.find('.results .next').remove();
		var next_start = page.resultStart + this.resultLimit;

		var next = document.createElement('button');
		next.setAttribute('type', 'button');
		next.setAttribute('id', 'searchResultNextButton');

		if (self.isApple && page.resultStart > 360) {
			next.setAttribute('class', 'next empty');
			next.appendChild(document.createTextNode(Local
					.trUcf('too_many_search_results')));
		} else {
			next.setAttribute('class', 'next');
			next.appendChild(document
					.createTextNode(Local.trUcf('%n more').replace('%n',
							(page.resultCount - data_offset).toString())));

			next.onclick = this.loadNext;
		}

		containerFragment.appendChild(next);
	}
	
	Ads.loadAd(containerFragment, function(adContainer) {
		if(adContainer)	self.resizeBanner(adContainer);
		setTimeout(function() {
			if (callback) {
				callback(containerFragment);
			};
		}, 10);
	}, Search.offsetParams(page.params, page.resultStart, this.resultLimit));
}

/**
 * Render a single result to html
 * 
 * @param {object}
 *            data the single result object
 * @param {UIPage}
 *            [page=searchDetail] page the page to link on item selection
 * @param {UIPage}
 *            [parent=searchResult] page the page to query for current scroll
 *            position bookmark on click
 * @returns {DomNode.DIV} a DIV containing the rendered result
 * @function
 */
MobUI.prototype.getResultItem = function(data, page, parent) {
	if (!page)
		page = this.sections.search.pages.searchDetail;
	if (!parent)
		parent = this.sections.search.pages.searchResult;

	var this_ref = this;
	var item = document.createElement('div');

	var iclass = [ 'item' ];

	if (data.archived && data.archived != 0)
		iclass.push('archived');
	if (data.disabled && data.disabled != 0)
		iclass.push('disabled');

	item.setAttribute('class', iclass.join(' '));
	item.setAttribute('ad', data.id);
	item.setAttribute('hash', page.section.name + '/' + page.name);

	item.onclick = _resultClick;

	var thumbSpan = document.createElement('span');
	thumbSpan.setAttribute('class', 'thumb');

	var thumbImg = document.createElement('img');

	var thumbPrice = document.createElement('span');
	thumbPrice.setAttribute('class', 'price');
	thumbPrice.innerHTML = data.price;

	thumbSpan.appendChild(thumbImg);
	thumbSpan.appendChild(thumbPrice);

	item.appendChild(thumbSpan);

	var imgURI = "gfx/void.gif";

	if (data.small_image_uri) {
		imgURI = data.small_image_uri;
		if (imgURI.indexOf('#') != -1) {
			var tokens = imgURI.split("#");
			imgURI = tokens[1] ? tokens[1] : tokens[0];
		}
	}

	thumbImg.setAttribute('src', imgURI);

	var auction = "";
	if (data.auction) {
		auction = "<span class='auction'>" + Local.tr('auction') + "</span>";
	}

	item.innerHTML += '<div class="h2 title">' + data.title + auction
			+ "</div>" + '<div class="info">' + data.description + '</span>';
	return item;
}

function _resultClick() {
	UI.resultClick(this);
}

MobUI.prototype.resultClick = function(item) {
	this.clicked(item);

	this.saveScrollPosition();

	var newGlobal = this.hashnum + 1;
	var self = this;
	setTimeout(function() {
		self.hashLink(item.getAttribute('hash') + '/' + newGlobal + '/'
				+ item.getAttribute('ad'));
		$(item).css('opacity', '');
	}, 400);
}

MobUI.prototype.disableInsertion = function() {
	this.enableInsertion = false;
	$('#myAds').hide();
	$('#advertiseButton').hide();
}

MobUI.prototype.formatTelephone = function(numberString, element) {
	var numbers = numberString.split(/[^0-9 ()\+]/);
	var addBr = false;
	var html = "";

	for (n in numbers) {
		number = numbers[n].replace(/[\s)(]/, "");

		if (number.length > 0) {

			if (addBr) {
				html += '<br />';
			} else {
				addBr = true;
			}

			html += '<a class="wtai_mc" href="tel:' + number + '">' + number
					+ '</a>';
		}
	}

	if (element) {
		element.html(html);
	} else {
		return html;
	}
}


/**
 * Control the loading animation thingy
 * 
 * @param {string}
 *            action Defines what to do with the ticker ('show', 'hide',
 *            'reset')
 * @function
 * @public
 * @returns {void}
 */

MobUI.prototype.ticker = function(action) {
	var ticker = this.tickEl;

	if (!ticker.queue) {
		ticker.queue = 0;
		ticker.startedAt = 0;
	}

	switch (action) {
	case 'show':
		if (ticker.queue <= 0) {
			var t = new Date().getTime();
			ticker.startedAt = t;
			ticker.queue = 0;
		}
		ticker.queue++;
		break;
	case 'hide':
		ticker.queue--;
		break;
	case 'reset':
		ticker.queue = 0;
		break;
	default:
		break;
	}

	if (ticker.queue > 0) {
		clearTimeout(ticker.timer);
		ticker.timer = setTimeout(function() {
			if (ticker.queue > 0) {
				UI.ticker('reset');
			}
		}, 30000);

		ticker.style.display = 'block';
		setTimeout(function() {
			ticker.style.opacity = 0.4;
		});

		$('button').attr('disabled', 'disabled');
		$('.item').attr('disabled', 'disabled');
		this.busy = true;
	} else {
		ticker.style.opacity = 0;
		$('button').removeAttr('disabled');
		$('.item').removeAttr('disabled');
		this.busy = false;
		var t = new Date().getTime();
		// console.log('ticker finished at '+t);

		var dt = t - ticker.startedAt;
		if (dt > 250) {
			// console.log('slow fading ticker ('+dt+' milliseconds passed)');
			setTimeout(function() {
				ticker.style.display = 'none';
			}, 250);
		} else {
			// console.log('insta hiding ticker ('+dt+' milliseconds passed)');
			ticker.style.display = 'none';
		}
	}
}
/**
 * Scale a thumbnail image to better fit allowed area in case of aspect
 * mismatch. Used as image.onload handler.
 */
MobUI.prototype.scaleThumb = function(element, width, height) {
	var aspect = height / width;
	var img = $(element).find('img').first();
	if (aspect <= 0.756756757) {// align on width, height downscale
		var imgWidth = 7.55;
		var imgHeight = 7.55 * (aspect);
		var margin = (5.75 - imgHeight) / 2;

		img.css('width', imgWidth + 'em');
		img.css('height', imgHeight + 'em');
		img.css('margin-top', margin + 'em')
	} else {// align on height, width downscale
		var imgWidth = 5.75 / aspect;
		var imgHeight = 5.75;
		var margin = (7.55 - imgWidth) / 2;

		img.css('width', imgWidth + 'em');
		img.css('height', imgHeight + 'em');
		img.css('margin-left', (margin) + 'em');
	}

}

/**
 * Forces redraw of an element in some cases. Voodoo.
 * 
 * @param {mixed}
 *            JQuery selector of the target element
 * @returns {null}
 */

MobUI.prototype.haxComb = function(selector) {
	var hash = location.hash;
	var isForm = hash.indexOf('searchForm') >= 0;
	var isIcecream = this.isIcecream;

	if (isIcecream && isForm) {
		setTimeout(function() {
			var $s = $(selector);
			var border = $s.css('border-bottom');
			$s.css('border-bottom', '1px solid transparent');
			setTimeout(function() {
				$s.css('border-bottom', border);
			}, 250);
		}, 250);
	}
}

MobUI.prototype.deleteImage = function(viewId, callback) {
	var page = this.getCurrentPage();
	ad = page.modifyAd;
	Login.authCall(Search
			.getAbsUrl('services/images_json.php?action=delete&ad=' + ad
					+ '&view=' + parseInt(viewId)), {}, callback, true);
}

MobUI.prototype.uploadImage = function(sourceType, imgElement, viewId) {

	var page = this.getCurrentPage();

	ad = page.modifyAd;

	var tw, th;
	if (this.isApple) {
		tw = th = 770;
	}

	navigator.camera.getPicture(function(pic) {
		setTimeout(function() {
			var win = function(r) {
				var resultString = r.response;

				if (UI.isApple) { // workaround for CB-1571, remove when
					// upgrading to 2.2
					resultString = unescape(resultString);
				}

				var result = $.parseJSON(resultString);

				if (result.status != 'error') {
					imgElement.removeClass('loading');
					imgElement.attr('src', pic);
					imgElement.closest('.imgUpload').attr('has_image', 'true');
				} else {
					UI.alert('Failed to upload image - unknown error', null,
							'Auto24');
				}
			}

			var fail = function(error) {
				UI.alert("An error has occurred: Code = " + error.code + " ("
						+ error.message + ")", null, 'Auto24');
			}

			var options = new FileUploadOptions();
			options.fileKey = "images[0]";
			options.fileName = pic;
			options.mimeType = "image/jpeg";

			var params = new Object();
			params['views[0]'] = viewId;

			options.params = params;

			var ft = new FileTransfer();
			imgElement.attr('src', 'gfx/89.gif');
			imgElement.addClass('loading');

			ft.upload(pic, Search
					.getAbsUrl('services/images_json.php?action=upload&id='
							+ ad), win, fail, options);
		}, 0);
	}, function(e) {
		setTimeout(function() {
			console.log('got error:' + e);
			if (UI.hasCamera && e == 'no camera available') {
				UI.hasCamera = false;
				UI.alert('No camera available! Use picture library instead.',
						null, 'Auto24');
			} else {
				UI.alert(e);
			}
		}, 0);
	}, {
		quality : 49,
		destinationType : Camera.DestinationType.FILE_URI,
		sourceType : sourceType,
		allowEdit : true,
		encodingType : Camera.EncodingType.JPEG,
		correctOrientation : true,
		targetWidth : tw,
		targetHeight : th,
	});
}

MobUI.prototype.wrapUnderline = function(jqNode){
	jqNode
		.addClass('underlined')
		.wrap('<div class="inputUnderliner"/>')
		.parent()
		.append('<div class="inputUnderlinerMask"/>');
}

MobUI.prototype.overlayInputFields = function(jqNode, selector) {
	if (!selector)
		selector = ".field input";

	jqNode.find(selector).blur(function() {
		$(this).siblings('.fieldOverlay').show();
	}).focus(function() {
		$(this).siblings('.fieldOverlay').hide();
	}).each(
			function() {
				$(this).parent().addClass('overlayField').append(
						$('<div class="fieldOverlay"/>'));
			});
	jqNode.find('.fieldOverlay').click(function() {
		$(this).siblings(selector).focus();
	});
}


/**
 * parse datetime into Date
 * maybe this needs to be moved into some util class 
 * @param {string} datetime
 * @returns Date
 */
MobUI.prototype.convertDateTime=function(dateTime){
    dateTime = dateTime.split(" ");

    var date = dateTime[0].split("-");
    var yyyy = date[0];
    var mm = date[1]-1;
    var dd = date[2];

    var time = dateTime[1].split(":");
    var h = time[0];
    var m = time[1];
    var s = parseInt(time[2]); //get rid of that 00.0;

    return new Date(yyyy,mm,dd,h,m,s);
}

/**
 * Forces stuff into correct size
 * 
 * @function
 * @returns {void}
 */

var fitviewport_events = 0;

MobUI.prototype.fitViewport = function(e) {

	fitviewport_events++;

	var minWidth = 240;
	var docWidth = window.innerWidth;
	var newWidth = Math.max(minWidth, docWidth);

	var fontSize = this.fontSize;

	var c = this.getCurrentPageName()
	var mode = (window.innerWidth > window.innerHeight) ? 'landscape'
			: 'portrait';
	var type = e ? e.type : 'manual fitViewport';

	if (this.isApple && type == 'orientationchange') {
		$('body').height(window.innerHeight);
	}

	this.viewportWidth = newWidth;

	var newMargin = (docWidth - newWidth) / 2;

	var headLeft = newMargin + 'px';
	var headWidth = newWidth + 'px';

	var mask = document.getElementById('mask');
	mask.style.width = headWidth;
	mask.style.left = headLeft;

	var header = document.getElementById('header');
	header.style.width = headWidth;
	header.style.left = headLeft;

	$('#buttonMenu').css({
		position : 'fixed',
		left : 'auto',
		right : headLeft
	});

	var loginDialog = document.getElementById('loginDialog');
	loginDialog.style.width = headWidth;
	loginDialog.style.left = headLeft;

	var loginSection = document.getElementById('loginSection');
	loginSection.style.width = headWidth;
	loginSection.style.left = headLeft;

	this.sections.login.pages.adHitcounts.onorientationchange();

	if (this.showingMenu && this.isAndroid) {
		var bm = $('#buttonMenu li');
		bm.css('width', 'auto');

		setTimeout(function() {
			bm.css('width', '100%');
		}, 100);
	}

	if (this.inASelect) {
		$('select[data-alphascroll="true"]').screenSelect('resize');
	}

	var page = this.getCurrentPage();
	if (type == 'resize' && page) {
		if (page.onorientationchange) {
			if (UI.isIOS5) {
				setTimeout(function() {
					page.onorientationchange(newWidth);
				}, 10);
			} else {
				page.onorientationchange(newWidth);
			}
		}
	}
}


(function($)
{
    $.fn.charslimit  = function(options) 
    {
        var def_options = {
	        limit: null,
	        counter_id: false,
	        counter_before: '',
	        counter_after: '',
	        counter_used:false
        }
        
        var options = $.extend(def_options,  options);
        
        return this.each(function() 
        {
            var $this = $(this);
        	if(options.limit==null){
        		options.limit = $(this).attr('maxlength');
        	}else{
        		$this.attr('maxlength', options.limit);
        	}
            
            $this.attr('autocorrect', 'off');
            $this.attr('autocapitalization', 'off');

            var characters_limit = options.limit;
            var characters_start = $(this).val().length;
            
            if(options.counter_id != false)
            {
            	if(options.counter_used){
            		$("#"+options.counter_id).html(options.counter_before + 0 + options.counter_after);
            	}else{
            		$("#"+options.counter_id).append(options.counter_before + (characters_limit-characters_start) + options.counter_after);
            	}
            }
            
            $this.on('input',function(){
            	var currentValue = $this.val();
                if(currentValue.length > characters_limit){
                	currentValue = currentValue.substr(0, characters_limit);
                    $this.val(currentValue);
                }
                
                if(options.counter_id != false)
                {
                	if(options.counter_used){
                		$("#"+options.counter_id).html(options.counter_before + currentValue.length + options.counter_after);
                	}else{
                        var remaining =  characters_limit - currentValue.length;
                        $("#"+options.counter_id).html(options.counter_before + remaining + options.counter_after);
               		}
                }
                
                return true;
            });
            
        });
    };
})(jQuery);



/**
 * The NewsService object handles display of site news.
 * This class relies on MobileService to perform its json queries.
 * Depends on Search being instantiated for getAbsUrl.
 * @class
 */
function NewsService(){
}


/**
 * Offset for multipart loading of news
 */
NewsService.prototype.offset = 0;

/**
 * Number of articles to load per fetch
 */
NewsService.prototype.limit = 15;

/**
 * Comment security stuffs 
 */
NewsService.prototype.commentTrash = '';
NewsService.prototype.commentTunix = '';
NewsService.prototype.commentUid = 0;

/**
 * Comment pagination stuffs
 */
NewsService.prototype.commentOffset = 0;
NewsService.prototype.commentCount = 0;
NewsService.prototype.commentLimit = 15;


/**
 * Reset comments variables and empty comments page
 */
NewsService.prototype.resetComments=function(){
	$('#newsComments').empty();
	this.commentOffset = 0;
	this.commentCount = 0;
	this.commentTrash = '';
	this.commentTunix = '';
	this.commentUid = 0;
}


/**
 * Queries the server for a list of comments for a given news article and outputs them
 * @param {int} id of the news article 
 * @returns {void}
 */
NewsService.prototype.newsComments=function(id){
	var self = this;
	UI.ticker('show');
	Login.call(
		Search.getAbsUrl('services/news_json.php?action=comments&id='+id+'&locale=et'),
		{offset:self.commentOffset, limit:self.commentLimit}, 
		function(data){self.renderComments(id, data)}, 
		true
	);
}

/**
 * Render provided comments data to default container
 */
NewsService.prototype.renderComments = function(id, data){
		var self = this;
		var thisNode = $('#newsComments');
		var offset = self.commentOffset;
		
		self.commentOffset += self.commentLimit;
		self.commentTrash = data.trash;
		self.commentTunix = data.tunix;
		self.commentUid = id;
		
		var commentContainer;
		var jResultContainer = thisNode.find('#commentContainer');
		
		if (jResultContainer.length==0) {
			var resultContainer = document.createElement('div');
			resultContainer.setAttribute('class', 'results');
			thisNode.append(resultContainer);
			
			commentContainer = document.createElement('div');
			commentContainer.setAttribute('id', 'commentContainer');
			resultContainer.appendChild(commentContainer);
			
			var commentForm = document.createElement('div');
			commentForm.setAttribute('id','commentForm');
			
			var title = document.createElement('h4');
			title.innerHTML = Local.tr('Add a comment');
			
			
			var label = document.createElement('label');
			label.innerHTML = Local.tr('Name');
			
			var name = document.createElement('input');
			name.setAttribute('type','text');
			name.setAttribute('class', 'input-type-text comment-input');

			
			if (Login.isLoggedin){
				name.value = Login.loginUsername;
			}
			
			var commentLabel = document.createElement('label');
			commentLabel.innerHTML = Local.tr('Comment');
			commentLabel.setAttribute('class', 'label-comment')
			
			var commentText = document.createElement('textarea');
			commentText.setAttribute('class', 'comment-input');
			
			var commentSubmitWrap = document.createElement('div');
			commentSubmitWrap.setAttribute('class','commentSubmitWrap');
			
			var commentSubmit = document.createElement('input');
			commentSubmit.setAttribute('type','submit');
			commentSubmit.setAttribute('value', Local.tr('submit'))
			commentSubmit.setAttribute('class','input-submit fat-submit-button');
			commentSubmit.onclick = function(data){
				UI.clicked(this);
				//UI.ticker('show');
				var nimi = name.value;
				var kommentaar = commentText.value;
				
				if (nimi == ''){
					UI.alert('Name cannot be empty!');
					return;
				}
				
				if(kommentaar == ''){
					UI.alert('Comment cannot be empty!');
					return;
				}
				
				self.addComment(nimi, kommentaar, captchaInput.value, function(data){
					if (data.status == 'success'){
						commentContainer.appendChild(self.getCommentItem({
							nimi:nimi, 
							kommentaar:htmlEntities(kommentaar), 
							sday:data.sday,
							stime:data.stime
						}));
					}else if (data.status == 'wrong_captcha'){
						UI.alert('The entered security code is wrong!');
					}else if (data.status == 'no_captcha'){
						UI.alert('You must enter a security code!');
					}else if (data.status == 'blocked'){
						UI.alert('Your comment was blocked on suspicion of spam');
					}else if (data.status == 'invalid'){
						UI.alert('You did not fill a required field!');
					}
					captchaImg.src = Search.getRoot(data.captcha);
					captchaInput.value = '';
					commentText.value = '';
					self.commentTunix = data.tunix;
					self.commentTrash = data.trash;
					setTimeout(function(){
						UI.ticker('hide');
					},10)
				});
			};
			
			commentSubmitWrap.appendChild(commentSubmit);
			
			var captchaContainer = document.createElement('div');
			captchaContainer.setAttribute('id', 'captchaContainer');
			captchaContainer.innerHTML = '<span class="captchaText">'+Local.tr('Enter the security code:')+'</span>';
			
			var captchaReload = document.createElement('div');
			captchaReload.setAttribute('class', 'captchaReload');
			
			var captchaImg = document.createElement('img');
			captchaImg.setAttribute('class', 'captchaImg');
			
			var captchaInput = document.createElement('input');
			captchaInput.setAttribute('class','captchaInput');
			captchaInput.setAttribute('class','comment-input');
			
			captchaContainer.appendChild(captchaInput);
			captchaContainer.appendChild(captchaImg);
			captchaContainer.appendChild(captchaReload);
			
			captchaReload.onclick = function(){
				UI.clicked(this);
				Login.getCaptcha(function(data){
					self.commentTunix = data.tunix;
					self.commentTrash = data.trash;
					$('#commentForm').find('.captchaImg').attr('src', Search.getRoot(data.captcha));
					$('#commentForm').find('#captchaContainer .comment-input').val('');
				});
			}

			var moreComments = document.createElement('button');
			moreComments.innerHTML = Local.tr('Load more');
			moreComments.setAttribute('id','moreComments');
			moreComments.setAttribute('class','next');
			
			moreComments.onclick = function(){
				self.newsComments(id);
			}
			
			resultContainer.appendChild(moreComments);
			commentForm.appendChild(title);
			commentForm.appendChild(label);
			commentForm.appendChild(name);
			commentForm.appendChild(commentLabel);
			commentForm.appendChild(commentText);
			commentForm.appendChild(captchaContainer);
			commentForm.appendChild(commentSubmitWrap);
			
			if (UI.isApple && !UI.isIOS5){
				name.ontouchstart = function(){$(this).focus();};
				captchaInput.ontouchstart = function(){$(this).focus();};
				commentText.ontouchstart = function(){$(this).focus();};
			}
			
			resultContainer.appendChild(commentForm);
		}
		else {
			commentContainer = jResultContainer.get(0);
		}
		
		var comments = data.comments;
		$('#commentForm').find('.captchaImg').attr('src', Search.getRoot(data.captcha));
	
		if(comments.length>0){
			for (var i=0; i<comments.length; i++) {
				var row = comments[i];
				var item = self.getCommentItem(row);
				commentContainer.appendChild(item);
			}
			
			if (comments.length < self.commentLimit || self.commentOffset >= self.commentCount){
				$('#moreComments').remove();
			}
		}
		else{
			$('#moreComments').remove();
			var moreComments = document.createElement('button');
			moreComments.innerHTML = Local.tr('There are no comments to display');
			moreComments.setAttribute('id','moreComments');
			moreComments.setAttribute('class','next empty');
			
			$(moreComments).insertAfter(commentContainer);
		}
		
		if(UI.isApple){
			$('input.comment-input').css('width','100%').wrap('<div class="commentField" style="width:50%"/>');
			$('textarea.comment-input').wrap('<div class="commentField"/>');
			UI.overlayInputFields($('#commentForm'),'.commentField input, .commentField textarea');
		}
		
		UI.haxComb(thisNode);
		UI.ticker('hide');
}

/**
 * Send comment to server and perform additional local tasks on completion
 * @param {string} name of the author
 * @param {string} text content of the comment
 * @param {function} ready the callback function to execute on success 
 */
NewsService.prototype.addComment = function(name, text, captcha, ready){
	var self = this;
	Login.call(Search.getAbsUrl('services/news_json.php?action=comment&id='+self.commentUid),{
		name:name,
		text:text, 
		tunix:self.commentTunix,
		trash:self.commentTrash,
		captcha:captcha
	}, function(data){if (ready) ready(data);}, true);
}


/**
 * Render a single comment to html 
 * @param {object} row a single json-parsed row array
 * @returns {DomNode} comment div
 */
NewsService.prototype.getCommentItem = function(row){
	var item = document.createElement('div');
	item.setAttribute('class', 'item news-item');
	
	item.innerHTML+=
		'<div class="h2 title blue-shadow">' + row.nimi + '</span></div>'+
		'<span class="comment-date">' + row.sday +' ' + row.stime + '</span>'+
		'<div class="info">' + row.kommentaar + '</div>';
	return item;
}



/**
 * Reset the news component.
 * Will force news list reload on next access, and reset status variables.
 * @function 
 */
NewsService.prototype.reset = function(){
	var page = UI.sections.news.pages.newsList;
	
	page.loaded = false;
	page.node.empty();
	this.offset = 0;
}

/**
 * Respond to click on a news list item; used to avoid extra closures.
 * Not meant for actual reuse anywhere.
 */
NewsService.prototype._newsClick = function(){
	UI.clicked(this);
	UI.saveScrollPosition();
	UI.hashLink(this.getAttribute('hash')+UI.hashnum+'/'+this.getAttribute('ref'));
}

/**
 * Render a single news list item to html 
 * @param {object} row a single json-parsed row array
 * @returns {DomNode} item div
 */
NewsService.prototype.getNewsItem = function(row, click){
	var item = document.createElement('div');
	item.setAttribute('class', 'item');
	item.setAttribute('ref', row.id);
	item.setAttribute('hash', 'news/newsDetail/');
	
	item.onclick = click?click:News._newsClick;
	
	if(row.thumbnail){
	
		var thumbSpan = document.createElement('span');
		thumbSpan.setAttribute('class','thumb');
		
		
		//this is a rather gross way to make an event handler, but IOS6 refuses to change src in onerror any other way
		var $thumbImg = $("<img src='"+row.thumbnail+"' onerror='this.src=\"gfx/void.gif\"'>");
		
		/*
		if(typeof(UI) != 'undefined'){
			$thumbImg.load(function(){
				UI.scaleThumb(item, this.width, this.height);
			});
		}
		*/
		
		thumbSpan.appendChild($thumbImg.get(0));
		item.appendChild(thumbSpan);
	}
	
	var style = '';
	if (row.title.length>30 && window.innerWidth<400){
		style = ' style:"font-size:0.8em;" ';
	}
	
	var comments = '';
	if(row.comments>0){
		comments = 	'<span class="commentsCount">(<span class="commentsNumber">'+row.comments+'</span>)</span>';
	}
	
	item.innerHTML+='<div class="h2 title"'+style+' data-fulltext="'+row.title+'"  data-comments="'+row.comments+'">' 
		+ row.title
		+ comments
		+ '</div>';
	
	item.innerHTML+='<div class="info">' + row.description + '</div>';

	return item;
}

/**
 * Render a news detail page from given data into provided container
 */
NewsService.prototype.renderNewsDetail = function(data,wrap, uberwrap){
	var id = data.id;
	
  	var title = '<div class="h2 title">' + data.title;  
  	if (data.comments>0){
  		title += '<span class="commentsCount">(<span class="commentsNumber">'+data.comments+'</span>)</span>';
  	}
  	title += '</div>';
	wrap.append(title);
	wrap.append('<p class="date">' + data.date + '</p>');
	
	var useTouchscrollNow = false;

	var datatable = document.createElement('div');
	datatable.setAttribute('class', 'main-data');
	$(datatable).html(data.content);
	wrap.append(datatable);
	
	if (data.source){
		wrap.append('<div class="newsSource">'+data.source.name.replace(/\n/g,"<br>")+"</div>");
	}
	
	if(typeof UI != "undefined"){
		wrap.append('<a href="'
				+Local.tr('http://www.auto24.ee/news/')+id+'" target="_system" rel="alternate" onclick="window.open(this.getAttribute(\'href\'),\'_system\');return false;">'
				+Local.tr('http://www.auto24.ee/news/')+id+'</a>'
		);
	}
	
	wrap.find('.vidLink').each(function(){
		this.innerHTML = Local.tr(this.innerHTML);
	});
	
	wrap.find('a img').each(function(){
		$(this).parent().addClass('imageLink');
	})
	
	wrap.find('a').not('.commentsLink').not('.imageLink').each(function(){
		$(this).click(function(){
			var href = this.getAttribute('href');
			
			if(href.indexOf('//') == 0){ // "context protocol" embeds from youtube will do that
				href = "http:"+href;
			}
			console.log('opening link in external browser: ' + href);
			window.open(href,'_system');
			return false;
		});
	});
	
  	var commentsTitle = '<div class="h2 title">'+Local.tr("Comments");  
  	if (data.comments>0){
  		commentsTitle += '<span class="commentsCount">(<span class="commentsNumber">'+data.comments+'</span>)</span>';
  	}
  	commentsTitle += '</div>';
  	
	uberwrap.append('<div id="newsComments"></div>');
	$('#newsComments').append(commentsTitle);
	this.commentCount = data.comments;
	this.renderComments(id,data.comments_data);
}


/**
 * Contains reusable UI-related objects - that is, all but the main MobUI class
 */

/**
 * Container for the detail information tabs.
 * 
 * @param {DomNode}
 *            container to attach the tabs object to
 * @param {function}
 *            [callback] an optional callback function to execute on tab switch
 * @class
 */
function UIDataSwitcher(container, callback) {
	this.container = container
	this.callback = callback;

	this.contents = document.createElement('div');
	this.contents.setAttribute('class', 'tabContents');

	this.titles = document.createElement('div');
	this.titles.setAttribute('class', 'tabTitles');

	this.tabs = [];

	container.appendChild(this.titles);
	container.appendChild(this.contents);
}

/**
 * Show one tab and hide the others
 * 
 * @param {UITab}
 *            tab to be shown
 */
UIDataSwitcher.prototype.select = function(tab) {
	tab.show();
	for (t in this.tabs) {
		if (this.tabs[t] !== tab) {
			this.tabs[t].hide();
		}
	}
	
	if (this.callback) {
		this.callback()
	};
}
/**
 * Select the first tab.
 */

UIDataSwitcher.prototype.showFirst = function() {
	this.select(this.tabs[0])
}

/**
 * Create and attach an UITab to this switcher
 * 
 * @param {string}
 *            title of the nascent tab
 * @param {string}
 *            contents string
 * @returns {UITab} the created tab object
 */
UIDataSwitcher.prototype.addTab = function(title, contents) {
	var t = new UITab(this, title, contents);
	var childrens = $(this.titles).children();
	$(this.titles).children('.tab-label').css('width',
			Math.floor((100 / this.tabs.length)) + '%');
	$(this.titles).children('.tab-label').eq(childrens.size() - 1).css('width',
			Math.ceil((100 / this.tabs.length)) + '%');

	return t;
}

/**
 * A single tab in the detailed information view
 * 
 * @param {UIDataSwitcher}
 *            parent tab switcher object
 * @param {string}
 *            title of the tab, also used for unique class attribute generation.
 *            Translated.
 * @param {string}
 *            tab's contents
 * @class
 */
function UITab(parent, title, contents) {
	var self = this;
	this.parent = parent;

	this.label = document.createElement('div');
	this.label.setAttribute('class', 'tab-label tab-label-bg');
	this.label.innerHTML = "<div class='tab-label-inner tab-label_" + title
			+ "'>" + Local.trUcf(title) + "</div>";
	this.label.onclick = function() {
		self.select();
	}

	this.content = document.createElement('div');
	this.content.setAttribute('class', 'tab-content');
	this.content.innerHTML = contents;

	parent.tabs.push(this);

	parent.contents.appendChild(this.content);
	parent.titles.appendChild(this.label);

}

UITab.prototype.parent;
UITab.prototype.label;
UITab.prototype.content;
UITab.prototype.callback;

/**
 * Make this tab active and the rest inactive;
 */
UITab.prototype.select = function() {
	this.parent.select(this);
}

/**
 * Show tab contents and *highlight* its title
 */
UITab.prototype.show = function() {
	// simply using show/hide seems to cause a full slow repaint on some ios
	// versions
	// hence, scale to 1/0 instead.
	if (UI.isIOS5 && false) {
		$(this.content).css('-webkit-transform', 'scale(1)');
		$(this.content).css('border', '1px dashed transparent');
		$(this.content).css('top', '0em');
	} else {
		$(this.content).show();
	}
	this.label.setAttribute('class', 'tab-label tab-label-fg');
	this.content.setAttribute('class', 'tab-content tab-content-fg');
}

/**
 * Hide tab contents and *downdark* its title;
 */
UITab.prototype.hide = function() {
	if (UI.isIOS5 && false) {
		$(this.content).css('border', '1px solid transparent');
		$(this.content).css('top', '0em');
		$(this.content).css('-webkit-transform', 'scale(0)');
	} else {
		$(this.content).hide();
	}
	this.content.setAttribute('class', 'tab-content tab-content-bg');
	this.label.setAttribute('class', 'tab-label tab-label-bg');
}

/**
 * Defines a section to be used in MobUI.
 * 
 * @class
 * @param {DomNode}
 *            node the Dom Node to be bound as the section's content
 * @param {MobUI}
 *            ui the master MobUI object
 */

function UISection(node, ui, name) {
	this.node = node;
	this.pages = {};
	this.first = null;
	this.name = (name ? name : node.attr('id'));
	this.history = [];
}

UISection.prototype.onShow = function() {
};
UISection.prototype.onHide = function() {
};
UISection.prototype.node = null;
UISection.prototype.pages = {};
UISection.prototype.first = null;
UISection.prototype.name = '';
UISection.prototype.current = null;

/**
 * Stores per-section history for depth navigation purposes
 * 
 * @var
 */
UISection.prototype.history = [];

if (!Object.keys) {
	Object.keys = function(obj) {
		var keys = new Array();
		for (k in obj)
			if (obj.hasOwnProperty(k))
				keys.push(k);
		return keys;
	};
}

/**
 * Adds an or replaces an UIPage in the section
 * 
 * @param {UIPage}
 *            uipage the page to be added
 * @returns {void}
 * @function
 */
UISection.prototype.addPage = function(uipage) {
	if (Object.keys(this.pages).length == 0) {
		this.first = uipage.name;
	}
	this.pages[uipage.name] = uipage;
}

/**
 * Load a page within this section. This function sets an active page within a
 * section, fetches appropriate content, and shows the page. Additionally, if
 * ignoreHistory parameter is omitted, this will truncate history to the page
 * shown. If ignoreHistory is passed and evaluates to true, history will not be
 * affected at all.
 * 
 * @function
 * @param {string}
 *            pagename the name of the page to be shown
 * @param {boolean}
 *            ignoreHistory if true, the page will not be written to history
 *            (used for backlinks)
 * @param {mixed}
 *            passthrough any value to be passed through to the page's onshow
 *            callback, such as ad id
 * @param {int}
 *            fragment the subsection of the page to be shown; used to pass
 *            current-image data between gallery and detail
 * @returns {void}
 */
UISection.prototype.loadPage = function(pagename, ignoreHistory, passthrough,
		fragment) {
	console.log('loadPage ' + pagename + ' from section ' + this.name);
	if (!this.pages[pagename]) {
		print('page ' + pagename + ' not found on ' + this.name)
		return;
	}

	if (this.current) {
		var depth = this.pages[pagename].depth;
		if (depth > this.pages[this.current.page].depth) {
			this.history.push({
				hash : location.hash,
				page : this.pages[pagename]
			});
		} else {
			while (depth <= this.history[this.history.length - 1].page.depth
					&& this.history.length > 0) {
				this.history.pop();
			}
			this.history.push({
				hash : location.hash,
				page : this.pages[pagename]
			});
		}
	} else {
		this.history.push({
			hash : location.hash,
			page : this
		});
	}

	this.pages[pagename].load(passthrough, fragment);
	this.current = {
		page : pagename,
		title : (UI ? UI.title.innerHTML : ''),
		hash : location.hash
	};

}

/**
 * Shows a page in a section without any changes to content, which is assumed to
 * have been fetched already. This function does not work with history variables
 * either.
 * 
 * @function
 * @param {string}
 *            [pagename] the name of the page to show, defaults to section
 *            current (or section first if current is not set)
 */
UISection.prototype.showPage = function(pagename) {
	if (!pagename)
		pagename = this.current ? this.current : this.first;

	var nextpage = this.pages[pagename];
	for (p in this.pages) {
		if (p.name != pagename) {
			this.pages[p].hide(nextpage);
		}
	}

	var that = this;
	setTimeout(function() {
		that.pages[pagename].show();
	}, 10);

}

/**
 * Show the section's node and execute all additional tasks.
 * 
 * @function
 * @public
 * @returns {void}
 */
UISection.prototype.show = function() {
	this.node.show();
	this.onShow();
}

/**
 * Hide the section's node and execute all additional tasks.
 * 
 * @param {UISection}[sect]
 *            section that will be shown after this one is hidden
 * @function
 * @public
 * @returns {void}
 */
UISection.prototype.hide = function(sect) {
	var next;

	if (sect) {
		next = sect.current ? sect.current : sect.first;
		next = sect.pages[next.page];
	}

	this.node.hide();
	this.pages[this.current ? this.current.page : this.first].hide(next);
	this.onHide(sect);
}

/**
 * A single page in the section
 * 
 * @param {UISection}
 *            the section which this page belongs to
 * @param {string}
 *            name the identifier the page will be shown by
 * @param {jQuery}
 *            node the jquery object which contains the page content
 * @param {function}
 *            [onload] the function to be executed when this page is loaded
 * @param {function}
 *            [onhide] the function to be executed when this page is hidden
 * @param {int}
 *            [level=0] page level for depth navigation purposes
 * @class
 */
function UIPage(section, name, node, onload, onhide, level) {
	this.node = node;
	this.name = name;
	this.section = section;
	this.onload = onload;
	this.onhide = onhide;
	this.depth = level ? level : 0;
	this.active = false;
	section.addPage(this);
}

UIPage.prototype.onshow = function() {
};
UIPage.prototype.onhide = function() {
};
UIPage.prototype.onload = function() {
};
UIPage.prototype.active = false;

/**
 * Show this page and execute the onshow callback if set.
 * 
 * @returns {null}
 * @function
 * @public
 */
UIPage.prototype.show = function() {

	this.node.addClass('active');

	console.log(this.name + '.onshow');

	UI.ticker('show');

	var that = this;

	$('#loginDialog').hide();
	$('#mask').hide();

	var display = function() {
		that.active = true;

		if (UI.isIOS6 || UI.isIOS7) {
			that.node.css('transform', 'scale3d(1,1,1)');
		}

		that.node.show();

		if (UI.popups[that.name]) {
			$('#popupAd').empty();
			Ads.loadAd($('#popupAd'), function(adContainer) {
				if($('#popupAd').html().length > 0){
					var closeButton = $("<div class='popupAdClose'/>");
					closeButton.click(function(){
						Ads.hidePopup();
					});
					
					$('#popupAd').append(closeButton);
					
					setTimeout(function() {
						Ads.showPopup(UI.popups[that.name].hide);
					}, UI.popups[that.name].show);
				}
			}, "APP_POPUP");
		}

		UI.ticker('hide');
	}

	var waitForImages = function() {
		UI.waitForImages(that.node, display);
	}

	if (this.onshow) {
		this.onshow(waitForImages, display);
	} else {
		display();
	}
}

/**
 * Hide this page and execute the onhide callback if set.
 * 
 * @param {UIPage}
 *            [nextpage] the page that will be shown after this page is hidden
 * @returns {void}
 * @function
 * @public
 */
UIPage.prototype.hide = function(nextpage) {
	if (this.active) {
		this.active = false;

		this.node.removeClass('active');

		if (UI.isIOS6 || UI.isIOS7) {
			this.node.css('transform', 'scale3d(0,0,0)')
		} else {
			this.node.hide();
		}

		if (this.onhide) {
			this.onhide(nextpage);
		}
	} else if (this.node.css('display') != 'none') {
		// this.node.hide();
	}
}

/**
 * Load the page. If the onload callback is provided, it is then responsible for
 * calling show(), else load callback is not fired and show is.
 * 
 * @param {mixed}
 *            passthrough any data to be passed to page load handler
 * @returns {null}
 * @function
 * @public
 */
UIPage.prototype.load = function(passthrough, fragment) {
	console.log(this.name + '.onload');
	if (this.onload) {
		this.onload(passthrough, fragment);
	} else {
		this.show();
	}
}

/**
 * @fileOverview the core script that keeps everything else running.
 */

var logArray = [];
var log = function(text) {
	logArray.push(text);
}

// console.log = log;
console.log('Starting m.auto24.ee ' + version);
console.log('useragent string: ' + navigator.userAgent);

/**
 * @type i18n
 */
var Local;

/**
 * @type MobUI
 */
var UI;

/**
 * @type WebSearch
 */
var Search;

/**
 * @type MobileService
 */
var Login;

/**
 * @type FavService
 */
var Favs;

/**
 * @type NewsService
 */
var News;

/**
 * @type AdsService
 */
var Ads;

/**
 * @type SavedSearches
 */
var Saved;

/**
 * @type CommercialsService
 */
var Comm;

/**
 * @type SyncService
 */
var Sync;

/**
 * @type ModSelect
 */
var Ms;

/**
 * @type MainpageService
 */
var Mainpage;

function print(str) {
	console.log(str);
}

function signum(number){
	return number?number<0?-1:1:0;
}

function shuffle(array) {
	  var copy = [], n = array.length, i;
	  while (n) {
	    i = Math.floor(Math.random() * array.length);
	    if (i in array) {
	      copy.push(array[i]);
	      delete array[i];
	      n--;
	    }
	  }
	  return copy;
} 


function htmlEntities(string) {
	var div = document.createElement('div');
	var text = document.createTextNode(string);
	div.appendChild(text);
	text = div.innerHTML;
	delete div;
	return text;
}

function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	}
	return [ curleft, curtop ];
}

function changeStyle(rule, properties, strict) {
	for(var n=0; n < document.styleSheets.length; n++){
		var ss = document.styleSheets[n];
		var rules = ss.cssRules || ss.rules;
		var changedRule = null;
		for ( var i = 0; i < rules.length; i++) {
			var irule = rules[i];
			if(irule.type != 1){
				continue;
			}
			var index = irule.selectorText.indexOf(rule); 
			if (index >= 0) {
				if(!strict || irule.selectorText == rule || irule.selectorText.substr(index+rule.length,1) == ','){
					changedRule = irule;
					break;
				}else{
					console.log('changeStyle: skipping selector "'+irule.selectorText+'" for argument "'+rule+'"');
				}
			}
		}
		if (changedRule !== null) {
			for ( var key in properties) {
				changedRule.style[key] = properties[key];
			}
		}
	}
}

document.addEventListener('deviceready', deferredUIDeviceReady);

function deferredUIDeviceReady() {
	if (UI) {
		UI.deviceReady();
	} else {
		setTimeout(deferredUIDeviceReady, 300);
	}
}

$(function() { 
	console.log('document.ready executing');

	var isSymbian = (/symbian/i).test(navigator.userAgent);

	$.support.cors = true;

	Local = new i18n();

	UI = new MobUI();

	console.log('UI instantiation complete');

	UI.isSymbian = isSymbian;
	UI.debug = true;

	Search = new WebSearch();
	Ads = new AdService();

	Login = new MobileService();
	Sync = new SyncService();

	Favs = new FavService();
	News = new NewsService();
	Mail = new MailboxService();
	Saved = new SavedSearches();
	Comm = new CommercialsService();
	Mainpage = new MainpageService();
	
	Ms = new ModSelect();
	Ms.optgmode = 0;
	Ms.existonly = true;
	Ms.queryroot = Search.queryhost;
	Ms.strChoose = Local.tr('any');
	Ms.locale = Local.locale;

	console.log('services ready, performing initial tasks');

	Sync.synchronize();
	Local.loadLocale(get_default_locale())
	Login.authCheck();

	Comm.checkEnabled(function() {
		$('#hitcountsGraph').html(Comm.renderGraph(30));
	});

	UI.initialize();

	if (UI.isIOS5 || UI.isIOS7) {
		window.onorientationchange = function(e) {
			UI.fitViewport(e);
		};

		// hax to prevent ios5 from focusing on password field instead of
		// username when in landscape
		$('#login-username-field').bind('touchstart', function(e) {
			e.preventDefault();
			$(this).focus();
		});
	}
  
	if (!UI.isApple) {
		$('.advertiseForm .input-submit').css({
			'-webkit-transform' : ''
		})
		$('#adHitcounts > *').css({
			'-webkit-transform' : ''
		})
	}

	window.onresize = function(e) {
		UI.fitViewport(e);
	};

	Local.localize(null, UI.onLocalize);

	UI.sections.search.pages.searchResult.reload = false;
	
	var TypeSelector, BodytypeSelector;
	var ThisMakeSelector, ThisModelSelector;

	TypeSelector = document.getElementById('searchParam-type');
	BodytypeSelector = document.getElementById('searchParam-bodytype');
	
	if (UI.isApple) {
		$('#login-password-field').bind('touchstart', function(e) {
			$(this).focus();
			e.preventDefault();
		});
	}

	var event = UI.isTouchy ? 'touchstart' : 'click';

	$('#savedSearchesButton').bind(event, function() {
		UI.hashLink('login/loginSearches/' + (UI.hashnum + 1));
	});
	
	var yearFromVal = 0;
	var yearToVal = 0;

	$('.selectback').bind(event, function(e) {
		e.preventDefault();
		UI.hideSelect(true);
	});

	var adType = $('#advertise-type');
	var adBody = $('#advertise-bodytype');
	var adMake = $('#advertise-make');
	var adModel = $('#advertise-model');
	var adPeriod = $('#advertise-modelperiod');
	var adForm = $('#advertiseForm');
	var adOtherModel = adForm.find('.item-advertise-othermodel');

	$('.advertiseForm.subpage').submit(function() {
		UI.clicked(this);
		return false;
	});

	adType.html($('#searchParam-type').html());
	
	adType.children('option.metaOption').remove();
	adType.children('option').removeClass('typeOption').removeClass('subtype');
	
	adBody.html($('#searchParam-bodytype').html());
	adMake.html($('#searchParam-cmm-1-make').html());
	adModel.html($('#searchParam-cmm-1-model_id').html());

	$('#advertiseForm').find('select').each(function() {
		var frist = $(this).children('option').first();
		if (frist.val() == 0) {
			frist.html(Local.tr('select'));
			frist.attr('data-i18ntxt', 'select');
		}
	});

	var adEditForm = $('#advertiseEditForm');
	var advertiseForm = $('#advertiseForm');
	adEditForm.append(advertiseForm.html());
	
	adEditForm.find('select').each(
			function() {
				var id = $(this).attr('id');
				var $this = $(this);
				$this.attr('id', id + "_edit");
				$this.closest('.item-select').find('label[for="' + id + '"]')
						.attr('for', id + '_edit');
			});

	$('#adEditImages').html($('#adImages').html());

	$('#adEditImages').find('.imgUploadDone').bind('click', function(e) {
		e.stopPropagation();
		e.preventDefault();
		UI.sections.login.pages.adEditImages.modifyAd = false;
		UI.hashLink(UI.rehash("#login/adList/0"));
	})

	var adEditType = adEditForm.find('.advertise-type');
	var adEditBody = adEditForm.find('.advertise-bodytype');
	var adEditMake = adEditForm.find('.advertise-make');
	var adEditModel = adEditForm.find('.advertise-model');
	var adEditPeriod = adEditForm.find('.advertise-modelperiod');
	var adEditOtherModel = adEditForm.find('.item-advertise-othermodel');

	adEditForm.find('.item-text label.label').click(function() {
		$(this).siblings('.field').children('input').focus();
	});

	advertiseForm.find('.item-text label.label').click(function() {
		$(this).siblings('.field').children('input').focus();
	});

	$('.item-expand').click(function() {
		var $this = $(this);
		var $next = $this.next();

		$this.toggleClass('expanded');
		$next.toggleClass('expanded');
	});

	$('.item-button').click(
			function() {
				var page = UI.getCurrentPage();
				var rel = this.getAttribute('rel');

				var type = page.node.find('.advertise-type').val();

				if (type == 0) {
					UI.alert('Please specify vehicle type first!', null,
							'Auto24');
				} else {
					UI.saveScrollPosition();
					var target = page[rel];
					var hash = target.section.name + '/' + target.name + '/'
							+ UI.hashNum;
					UI.hashLink(hash);
				}
			});

	$('.subitem-expand .label_check input').change(function() {
		var $this = $(this).parent().parent('.subitem-expand');
		var $next = $this.next();
		$this.toggleClass('expanded');
		$next.slideToggle();
	});

	$('.form-subitem .label_check').click(itemCheckboxClick);
	$('.form-subitem label').click(function(e) {
		e.preventDefault();
		$(this).prev('.label_check').click();
	});
	
	$('button,input[type=button],input[type=submit]').on("click",function(){
		UI.clicked(this);
	});

	$('#imgUploadDone').on('click', function(){
		UI.clicked(this);
	});
	
	$('a[target="_system"]').click(function() {
		window.open(this.getAttribute('href'),'_system');
		return false;
	});
	
	$('#advertiseForm')
			.submit(
					function() {
						if (adType.val() == 0 && adBody.val() == 0) {
							UI.alert('Please specify vehicle type!', null,
									'Auto24');
						} else {
							var mod = UI.sections.login.pages.advertise.modifyAd;

							if (mod) {
								$('#advertiseForm .modify').val(mod);
							} else {
								$('#advertiseForm .modify').val('');
							}

							var maindata = adForm.serializeArray();
							var eqdata = $('#adEquipment').serializeArray();
							var techdata = $('#adTechdata').serializeArray();
							var otherdata = $('#adOtherdata').serializeArray();

							maindata = $.merge(maindata, eqdata);
							maindata = $.merge(maindata, techdata);
							maindata = $.merge(maindata, otherdata);

							data = $.param(maindata);

							Comm
									.publish(
											data,
											function(data) {
												if (data.status == 'success') {
													UI
															.hashLink('login/adImages/'
																	+ (UI.hashnum + 1)
																	+ '/'
																	+ data.id);
													UI.sections.login.pages.advertise.modifyAd = data.id;
													$('#adSiteLink')
															.attr(
																	'href',
																	Local
																			.tr('http://www.auto24.ee/')
																			+ 'users/shop.php?dbt=3&ref='
																			+ data.id
																			+ '&sbmt=Tellimuste+lisamine+%2F+muutmine');
												} else {
													if (data.errors)
														UI.alert(
																data.errors[0],
																null, 'Auto24');
													else
														UI
																.alert(
																		'Unknown error!',
																		null,
																		'Auto24');
												}
											});
						}
						return false;
					});
	var adEditPage = UI.sections.login.pages.adEdit;

	$('#advertiseEditForm').submit(
			function() {
				var type = $(this).find('.advertise-type').val();
				var body = $(this).find('.advertise-bodytype').val();

				if (type == 0 && body == 0) {
					UI.alert('Please specify vehicle type!', null, 'Auto24');
				} else {
					var modify = adEditPage.modifyAd
					$(this).children('input.modify').val(modify);

					var maindata = $(this).serializeArray();
					var eqdata = $('#adEditEquipment').serializeArray();
					var techdata = $('#adEditTechdata').serializeArray();
					var otherdata = $('#adEditOtherdata').serializeArray();

					maindata = $.merge(maindata, eqdata);
					maindata = $.merge(maindata, techdata);
					maindata = $.merge(maindata, otherdata);

					data = $.param(maindata);

					Comm.publish(data, function(data) {
						if (data.status == 'success') {
							UI.hashLink('login/adEditImages/'
									+ (UI.hashnum + 1) + '/' + modify);
						} else {
							if (data.errors)
								UI.alert(data.errors[0], null, 'Auto24');
							else
								UI.alert('Unknown error!', null, 'Auto24');

							UI.back();
						}
					});
				}
				return false;
			});

	// modselect bindings for advertise form
	// --------------------------------------------------
	var prevAdType = 0;
	Ms.filter(adBody.get(0), Ms.filterBodytype);
	Ms.bind(adType.get(0), adBody.get(0), Ms.changeBodytypes, function(value) {
		if (value != prevAdType) {
			adBody.val(value ? value : 0);
			adBody.screenSelect('update');
		}
	}, true);

	Ms.bind(adType.get(0), adMake.get(0), Ms.changeMakes, function(value) {
		UI.ticker('show');
		adMake.val(value ? value : 0);
		adMake.screenSelect('update');

		Comm.fetchFields(adType.val(), UI.sections.login.pages.advertise,
				function() {
					UI.ticker('hide');
				});
	}, true);

	Ms.bind(adMake.get(0), adModel.get(0), Ms.changeModels, function(value) {
		if (adModel.children('.othervalue').size() == 0)
			adModel.append('<option class="othervalue" value="-1">'
					+ Local.tr("other model") + '</option>');
		adModel.val(value ? value : 0);
		adModel.screenSelect('update');
	}, true);

	Ms.bind(adModel.get(0), adPeriod.get(0), Ms.changeModelPeriods, function(
			value) {
		adPeriod.screenSelect('update');
	}, true);

	// modselect bindings for advertisement edit form
	// -------------------------------------------

	Ms.filter(adEditBody.get(0), Ms.filterBodytype);
	Ms.bind(adEditType.get(0), adEditBody.get(0), Ms.changeBodytypes, function(value) {
		if (adEditPage.overrideBody) {
			value = adEditPage.overrideBody;
			adEditPage.overrideBody = false;
		}
		adEditBody.val(value ? value : 0);
		adEditBody.screenSelect('update');

	}, true);

	Ms.bind(adEditType.get(0), adEditMake.get(0), Ms.changeMakes, function(
			value) {
		if (adEditPage.overrideMake) {
			value = adEditPage.overrideMake;
			adEditPage.overrideMake = false;
		}

		adEditMake.val(value ? value : 0);
		adEditMake.change();
	}, true);

	Ms.bind(adEditMake.get(0), adEditModel.get(0), Ms.changeModels, function(
			value) {
		if (adEditModel.children('.othervalue').size() == 0) {
			adEditModel.append('<option value="-1">' + Local.tr("other model")
					+ '</option>');
		}
		if (adEditPage.overrideModel) {
			value = adEditPage.overrideModel;
			adEditPage.overrideModel = false;
		}

		adEditModel.val(value ? value : 0);
		adEditModel.change();
	}, true);

	Ms.bind(adEditModel.get(0), adEditPeriod.get(0), Ms.changeModelPeriods,
			function(value) {
				if (adEditPage.overridePeriod) {
					value = adEditPage.overridePeriod;
					adEditPeriod.overridePeriod = false;
					adEditPeriod.val(value ? value : 0);
					adEditPeriod.screenSelect('update');
				} else {
					adEditPeriod.val(value ? value : 0);
					adEditPeriod.screenSelect('update');
				}
			}, true);

	// --------------------------------------------
	// input redirection for select items
	$('.item-select').click(function(e) {
		if (e.target.className == 'field') {
			$(this).find('.select-button').first().triggerHandler('click');
		}
	});

	// --------------------------------------------
	// other-model value bindings

	adEditModel.bind('change', function() {
		if (adEditModel.val() == -1) {
			adEditOtherModel.show();
		} else {
			adEditOtherModel.hide();
		}
	});

	adModel.bind('change', function() {
		if (adModel.val() == -1) {
			adOtherModel.show();
		} else {
			adOtherModel.hide();
		}
	});

	$('.advertise-select').screenSelect(
			{
				target : '#loginSelect',
				hide : function(that) {
					UI.hideSelect(false, $('#loginSelect'));
					setTimeout(function() {
						UI.loadScrollPosition();
					}, 100)
				},
				show : function(that) {
					var selector = "label[for='" + that.attr('id') + "']";
					UI.saveScrollPosition();
					UI.showSelect(that.closest('.item-select').find(selector)
							.text(), $('#loginSelect'));
				}
			});

	adEditModel.screenSelect({
		target : '#loginSelect',
		hide : function(that) {
			UI.hideSelect(false, $('#loginSelect'));
			setTimeout(function() {
				UI.loadScrollPosition();
			}, 100)
		},
		show : function(that) {
			var selector = "label[for='" + that.attr('id') + "']";

			UI.saveScrollPosition();
			var make = $('#advertise-make_edit').val()

			UI.showSelect(that.closest('.item-select').find(selector).text(),
					$('#loginSelect'));

			if (scrollOverrides[make]) {
				that.screenSelect('destroyScrollBar');
				that.screenSelect('createCustomScrollBar',
						scrollOverrides[make], false);
			}

		}
	});

	adModel.screenSelect({
		target : '#loginSelect',
		hide : function(that) {
			UI.hideSelect(false, $('#loginSelect'));
			setTimeout(function() {
				UI.loadScrollPosition();
			}, 100)
		},
		show : function(that) {
			var selector = "label[for='" + that.attr('id') + "']";

			UI.saveScrollPosition();
			var make = $('#advertise-make').val()

			UI.showSelect(that.closest('.item-select').find(selector).text(),
					$('#loginSelect'));

			if (scrollOverrides[make]) {
				that.screenSelect('destroyScrollBar');
				that.screenSelect('createCustomScrollBar',
						scrollOverrides[make], false);
			}
		}
	});

	function itemCheckboxClick(e) {
		var self = this;
		$(this).find('input').first().each(function() {
			this.checked = !this.checked;
			$(this).change();
		});
	};
	
	$('.d-remember').click(function(e){
		$(this).find('input').first().each(function(){
			this.checked = !this.checked;
			$(this).change();
		});
	});
	
	$('div .field').click(itemCheckboxClick);

	$('.input-checkbox').click(function(e) {
		this.checked = !this.checked;
	});

	function setupLabel() {
		if ($('.label_check input').length) {
			$('.label_check').each(function() {
				$(this).removeClass('c_on');
			});
			$('.label_check input:checked').each(function() {
				$(this).parent('.label_check').addClass('c_on');
			});
		}
		;
	}
	;

	$('input[type="checkbox"]').change(function() {
		setupLabel();
	});

	setupLabel();

	$('.screen-select').screenSelect({
		target : '#selectScreen',
		hide : function(that) {
			UI.hideSelect();
		},
		show : function(that) {
			var selector = "label[for='" + that.attr('id') + "']";
			UI.showSelect(that.parent().parent().children(selector).text());
		}
	});

	var regLink = Search.getAbsUrl('users/reg.php');
	$('.regLink').attr('href', regLink);

	$('.window .close').click(function(e) {
		// Cancel the link behavior
		e.preventDefault();
		$('#mask').hide();
		$('.window').hide();
	});

	$('#adListMenuMask').click(function() {
		$(this).hide();
	});
	
	$('#adOptions .header.item').click(
			function() {
				var link = 'login/adView/' + UI.hashnum + '/'
						+ UI.getCurrentPage().selectedAd.id;
				UI.hashLink(link);
			});

	$('#adListButton_view').click(
			function() {
				var link = 'login/adView/' + UI.hashnum + '/'
						+ UI.getCurrentPage().selectedAd.id;
				UI.hashLink(link);
			});
	
	$('#adListButton_shop').click(
			function() {
				var link = 'login/adServices/' + UI.hashnum + '/'
						+ UI.getCurrentPage().selectedAd.id;
				UI.hashLink(link);
			});

	$('#adListButton_stats').click(
			function() {
				var link = 'login/adHitcounts/' + UI.hashnum + '/'
						+ UI.getCurrentPage().selectedAd.id;
				UI.hashLink(link);
			});

	$('#adListButton_edit').click(
			function() {
				var link = 'login/adEdit/' + UI.hashnum + '/'
						+ UI.getCurrentPage().selectedAd.id;
				UI.hashLink(link);
			});

	$('#adListButton_hide').click(
			function() {
				var page = UI.getCurrentPage();
				var ad = page.selectedAd;
				var val = !ad.hidden;
				var id = ad.id;

				function confirmed(c) {
					if (c == 1)
						Comm.setHidden(id, val, function(data) {
							var s = data.status;
							if (s) {
								var txtval = val ? '1' : '';

								if (!val) {
									UI.alert('ad_unhide_message');
								}
							} else {
								UI.alert('Error while hiding/unhiding ad!',
										null, 'Auto24');
							}
							
							page.onshow();
						});
				}

				if (val) {
					UI.confirm('Really hide?', confirmed, 'Hide,Cancel');
				} else {
					confirmed(1);
				}
			});

	$('#adListButton_stop').click(function() {
		var page = UI.getCurrentPage();
		var ad = page.selectedAd;
		var archive = ad.archive;
		var id = ad.id;

		if (archive == 0) {
			UI.confirm('Really discontinue?', function(v) {
				if (v == 1) {
					Comm.discontinue(id, function(data) {
						if (data.status != 'success') {
							UI.alert(data.errors[0], null, 'Auto24');
						}
						page.onshow();
					});
				}
			}, 'Stop,Cancel');
		} else {
			UI.confirm('Really delete?', function(v) {
				if (v == 1) {
					Comm.archive(id, function(data) {
						if (data.status != "success") {
							UI.alert(data.errors[0], null, 'Auto24');
						}
						page.onshow();
					});
				}
			}, 'Delete,Cancel');

		}
	});

	$('#adListButton_services').click(function() {
		var page = UI.getCurrentPage();
		var ad = page.selectedAd;
		var link = 'login/adServices/' + UI.hashnum + '/' + ad.id + '/1';

		UI.hashLink(link);
	});

	$('#service_not').click(function() {
		UI.hashLink(UI.rehash("#login/adList/0/"));
	});

	UI.hasOrientationChange = ("ontouchstart" in document.documentElement
			|| "onorientationchange" in window || "ontouchstart" in window);
	if (UI.hasOrientationChange) {
		window.addEventListener('orientationchange', function(e) {
		}, false);
	}

	scroll(0, 0);

	UI.sections.search.pages.searchForm.node.change();//

	$('button').click(function() {
		UI.clicked(this);
	});
	
	if (UI.isApple) {
        UI.overlayInputFields($('body'));
        UI.overlayInputFields($('#searchSaveWrapper'),'.searchSaveField input[type="text"]');
        UI.overlayInputFields($('#loginDialogForm'),'.d-field input');
        
        $('#loginDialog').css({
        	position:'absolute',
        	height:'auto',
        	bottom:'0em'
        });
    }

	// Additional translation for reg links
	$('#regLink').attr('href',
			Local.tr('http://www.auto24.ee/') + 'users/reg.php');
});

$(window)
		.load(
				function() {
					console.log('window onload');
					var fontSizeAdjust = function() {
						var greaterAxis = Math.max(window.innerWidth,
								window.innerHeight);
						console.log('initialsize: greater axis in px = '
								+ greaterAxis);

						// sometimes honeycomb, for instance, returns zero,
						// probably due to some
						// race condition
						// here's one dirty haxaround for this.
						if (greaterAxis == 0) {
							setTimeout(fontSizeAdjust, 100);
							console
									.log('initialsize: skipping zero axis, isInitialSize = true;');
							return;
						}

						if (UI.isAndroid) {
							if (localStorage
									.getItem('m.auto24.ee.app.isFromRally') == 'true') {
								greaterAxis = parseInt(localStorage
										.getItem('m.auto24.ee.app.screenSize'));
							} else {
								localStorage.setItem(
										'm.auto24.ee.app.screenSize',
										greaterAxis);
							}
							localStorage.setItem('m.auto24.ee.app.isFromRally',
									'false');
						}

						UI.fontSize = Math.max(16, Math
								.ceil(15 * (greaterAxis / 500) + 1));
						
						if(UI.fontSize < 18){
							console.log('initialsize: using low-reso images due to low pixel density');
							$('body').addClass('lowres');
						}
						
						console.log('initialsize: body font size in px: '
								+ UI.fontSize);

						UI.isTablet = greaterAxis > 800;
						console.log('initialsize: use tablet layout: '
								+ UI.isTablet);

						changeStyle('body',{
							'fontSize' : UI.fontSize + 'px'
						});

						UI.fitViewport();
						
						if(navigator.splashscreen) setTimeout(function(){
							navigator.splashscreen.hide();	
						},50);
					}

					setTimeout(fontSizeAdjust, 0);
				});

/**
 * Remote advertisements search service.
 * 
 * @class
 */
function WebSearch() {
	this.setQueryUrl(Local.tr('http://www.auto24.ee/mobile/'));
	this.setHttpsQueryUrl(Local.tr('https://www.auto24.ee/mobile/'));
	this.setHost('http://www.auto24.ee/');
}

WebSearch.prototype.version = 1;
WebSearch.prototype.queryhost = '';
WebSearch.prototype.httpsHost = '';
WebSearch.prototype.httpsQueryHost = '';
WebSearch.prototype.host = '';
WebSearch.prototype.seeker = 'services/search_json.php';
WebSearch.prototype.counter = 'services/count.php';

WebSearch.prototype.setHost = function(url) {
	if (UI.webMode && UI.debug) {
		this.host = location.protocol + '//' + location.host + '/';
		this.httpsHost = 'https://' + location.host + '/';
	} else {
		this.host = url;
	}
}

/**
 * Sets the search query url
 * 
 * @function
 * @returns {void}
 */
WebSearch.prototype.setQueryUrl = function(url) {
	if (UI.webMode && UI.debug) {
		this.queryhost = location.protocol + '//' + location.host + '/mobile/';
	} else {
		this.queryhost = url;
	}
}

WebSearch.prototype.setHttpsQueryUrl = function(url) {
	if (UI.webMode && UI.debug) {
		this.httpsQueryHost = location.protocol + '//' + location.host
				+ '/mobile/';
	} else {
		this.httpsQueryHost = url;
	}
}

/**
 * Returns the absolute url to the relative script filename Probably should be
 * moved elsewhere.
 * 
 * @function
 * @param script
 *            the service script filename
 * @returns {string} the absolute url
 */

WebSearch.prototype.getAbsUrl = function(script) {
	return this.queryhost + script;
}

WebSearch.prototype.getHttpsAbsUrl = function(script) {
	return this.httpsQueryHost + script;
}

WebSearch.prototype.getRoot = function(link) {
	if (link.indexOf('/') == 0) {
		link = link.substring(1);
	}
	return this.host + link;
}

WebSearch.prototype.loadCount = function(params, page, callback){
	this.load(
		this.counter + '?' + params,
		function(count) {
			page.resultCount = count.result;
			callback(count);
		}
	);
}

WebSearch.prototype.loadResult = function(params, page, callback, offset, limit){
	page.params = params;
	
	if(!offset) offset = 0;
	if(!limit) limit = UI.resultLimit;
	
	UI.ticker('show');
	this.load(
		this.seeker+'?'+this.offsetParams(params,offset,limit),
		function(data) {
			UI.renderSearchResult(data, page, function(fragment){
				UI.waitForImages(fragment,function(){
					page.node.find('.results').append(fragment);
					if(callback){callback();}
				});
			});
			UI.ticker('hide');
		}
	);
}

/**
 * Fetches the search data from remote service
 * 
 * @param script
 *            the service to be called
 * @param callback
 *            function to execute on success
 * @returns {void}
 */
WebSearch.prototype.load = function(script, callback, hideTicker) {
	if (!hideTicker) {
		UI.ticker('show')
	}
	if (script.substring(0, this.counter.length) != this.counter) {
		script += '&locale=' + Local.locale;
	}
	script += '&version=' + this.version;
	Login.call(this.getAbsUrl(script), {}, function(i, s) {
		if (!hideTicker){
			UI.ticker('hide');
		}
		
		if(callback){
			callback(i)
		}
	}, hideTicker);
}

/**
 * Turns form field data into an urlencoded string and attaches proper start and
 * limit parameters
 * 
 * @param form
 *            the form either as DOM element or JQuery object
 * @param start
 *            start offset
 * @param limit
 *            max number of entries to fetch
 * @returns {string} urlencoded form data
 */
WebSearch.prototype.serialize = function(form, start, limit) {
	if (!(form instanceof jQuery)){
		form = $(form);
	}

	this.sanitize(form);

	if(start && limit){
		return this.offsetParams(form.serialize(), start, limit);	
	}
	else return form.serialize();
}

WebSearch.prototype.offsetParams = function(params, start, limit){
	 return params + '&ak=' + start + '&af=' + limit;
}

/**
 * Sanitizes stuff in provided form. Currently only assures that numerical
 * fields are numeric.
 * 
 * @param form
 *            the form either as DOM element or JQuery object
 * @returns {void}
 */
WebSearch.prototype.sanitize = function(form) {
	if (!(form instanceof jQuery))
		form = $(form);
	form.find('input').each(function() {
		if (this.type == 'number') {
			if (this.value != '') {
				if (!(!isNaN(parseFloat(this.value)) && isFinite(this.value))) {
					this.value = '';
				}
			}
		}
	});
}

function SavedSearches(){}

SavedSearches.prototype.getList = function(callback){
	Login.authCall(Search.getAbsUrl('services/saved_searches_json.php?action=list&locale='+Local.locale),{}, callback, true);
}

SavedSearches.prototype.bookmark = 0;
SavedSearches.prototype.resultCount = 0;
SavedSearches.prototype.start = 0;
SavedSearches.prototype.limit = 20;
SavedSearches.prototype.params = '';

SavedSearches.prototype.renderPage = function(data){
	var that = this;
	if(data.length>0){
		var ul = document.createElement('ul');
		ul.setAttribute('class', 'savedSearch');

		for (row in data){
			var s = data[row];
			var li = document.createElement('li');
			
			li.setAttribute('id', 'savedSearch-'+s.id);
			
			li.onclick = function(e){
				e.stopPropagation();
				e.preventDefault();
	
				if($(e.target).closest('a').hasClass('searchDelete')){
					var rel = $(this).children('.searchDelete').attr('rel');
					UI.confirm('Really delete?', function(c){
						if (c==1){
							that.deleteSearch(rel, function(data){
								if(data.status == 'success'){
									$('#savedSearch-'+rel).remove();
									UI.getCurrentPage().load();
								}else{
									UI.alert('Error while deleting search');
								}
							});
						}
					},'Delete,Cancel');
				}else{
					$(ul).children('li').each(function(){
						this.onclick = function(){};
					});
					
					var params =  $(this).find('.savedSearchBox a').first().attr('rel');
					
					$('#loginResults .results').empty();
					
					UI.sections.search.pages.searchForm.loadOptions(params);
					UI.hashLink(UI.rehash("#search/searchForm/0"));
				}
			}
			
			var title = document.createElement('a');
			title.innerHTML = s.title;
			title.setAttribute('rel',decodeURIComponent(s.params));
			
			var del = document.createElement('a');
			del.innerHTML = '<img src="gfx/close_X_blue.png" />';
			del.setAttribute('class', 'searchDelete')
			del.setAttribute('rel', s.id);
			
			var timestamp = document.createElement('span');
			var date = new UI.convertDateTime(s.timestamp);
			var dateString = date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear();
			
			timestamp.setAttribute('class','savedSearchDate');
			timestamp.innerHTML = Local.tr('Added')+": "+dateString;
			
			var box = document.createElement('div');
			box.setAttribute('class','savedSearchBox');
			
			box.appendChild(title);
			box.appendChild(timestamp);
			li.appendChild(box);
			li.appendChild(del);
			ul.appendChild(li);;
		}
		
		return ul;
	}else{
		var div = document.createElement('div');
		div.setAttribute('class','emptySearches');
		div.innerHTML = Local.tr('You have no saved searches')
		return div;
	}
}

SavedSearches.prototype.deleteSearch = function(id, callback){
	id = parseInt(id);
	Login.authCall(Search.getAbsUrl('services/saved_searches_json.php?action=delete&id='+id+'&locale='+Local.locale),{}, callback, true);	
}

SavedSearches.prototype.composeSearch = function(formdata, callback){
	Login.authCall(Search.getAbsUrl('services/saved_searches_json.php?action=compose&locale='+Local.locale),formdata, callback, true);	
}

SavedSearches.prototype.save = function(title, params, notify, email, callback){
	Login.authCall(Search.getAbsUrl('services/saved_searches_json.php?action=save&locale='+Local.locale),{
		title:title,
		params:params, 
		notify:notify,
		email:email
	}, callback, true);
}

/**
 * Handles cached entities that are not completely permanent, such as: dealers,
 * translation strings, possibly makes/models
 * 
 * @class
 */
function SyncService() {
	var fields = {
		i18n : new SyncField('i18n', 
			function(data) { // onload
				Local.dictionary = data;
				
				if(Local.lang){
					Local.loadLocale(Local.lang);
					Local.localize(null,UI.onLocalize);
				}
			}, 
			Local.bootstrap
		),
		makes: new SyncField('makes',
			function(data) { // onload
				var node = $('#searchParam-cmm-1-make');
				node.empty();
				node.append("<option value='0' data-i18ntxt='any'>"+Local.tr('any')+"</option>");
				
				var sortable = [];
				
				for(key in data){
					sortable.push([key, data[key]]);
				}
				
				sortable.sort(function(a, b) {return a[1].localeCompare(b[1])});
				
				for (i in sortable){
					node.append("<option value="+sortable[i][0]+">"+sortable[i][1]+"</option>");
				}
			}, 
			function(){
				var makes = $('#searchParam-cmm-1-make').children('option');
				var data = {}
				makes.each(function(){
					if(this.value != 0){
						data[this.value] = this.innerHTML;
					}
				});
				return {
					hash : 'bootstrap_'+version,
					data : data
				};
			}
		),
		types : new SyncField('types', 
				function(data) { // onload
					var node = $('#searchParam-type');
					node.empty();
					node.append("<option value='0' class='typeOption metaOption typeOption-0' data-i18ntxt='any'>"+Local.tr('any')+"</option>");
					
					var isNewFormat = !!data[0]&&data[0]["id"];
				
					if(isNewFormat){
						for (type in data){
							var cdata = data[type];
							var isMetaType = !!cdata['sub'];
							var label = cdata.label.toLowerCase();
							var id = cdata.id;
							
							if(isMetaType){
								node.append("<option class='typeOption typeOption-"+id+" metaOption' data-i18ntxt='"+label+"' value="+id+">"+Local.tr(label)+"</option>");
								for(subtype in cdata.sub){
									var sub = cdata.sub[subtype];
									label = sub.label.toLowerCase();
									node.append("<option class='typeOption subType' data-parent='"+id+"' data-i18ntxt='"+label+"' value="+subtype+">"+Local.tr(label)+"</option>");
								}
							}else{
								node.append("<option class='typeOption typeOption-"+id+"' data-i18ntxt='"+label+"' value="+id+">"+Local.tr(label)+"</option>");							
							}
						}
					}else{
						for (type in data){
							var cdata = data[type];
							node.append("<option data-i18ntxt='"+cdata+"' value="+type+">"+Local.tr(cdata)+"</option>");							
						}
					}
				}, 
				function(){
					var types = $('#searchParam-type').children('option');
					var data = {}
					types.each(function(){
						if(this.value != 0){
							data[this.value]=this.innerHTML;
						}
					});
					
					return {
						hash : 'bootstrap_'+version,
						data : data
					};
				}
		),
		bodytypes: new SyncField('bodytypes',
				function(data) { // onload
					var lang = get_default_locale();
					var node = $('#searchParam-bodytype');
					
					node.empty();
					node.append('<option value="0" data-i18txt="any" data-i18ntxt="any">'+Local.tr('any')+'</option>');
					
					var localizedData = data[lang];
					var enData = data["en"];
					
					for (i in localizedData){
						var name = localizedData[i]["value"];
						var en_name = enData[i]["value"];
						var id = enData[i]["id"];
						var isMeta = enData[i]["type"] == "divider";
						
						if(isMeta){
							node.append('<option value="type-'+id+'" class="level-0" label="'+name+' data-i18ntxt='+en_name+'" data-divider-id="'+id+'">'+name+'</option>');
						}else{
							node.append('<option value="'+id+'" class="level-0" label="'+name+' data-i18ntxt='+en_name+'">'+name+'</option>');							
						}
					}
				}, 
				function(){
					return {
						hash : 'bootstrap_'+version,
						data : {}
					};
				}
			),
		fuels : new SyncField('fuels', 
				function(data) { // onload
					var node = $('#searchParam-fuel');
					node.empty();
					node.append("<option value='0' data-i18ntxt='any'>"+Local.tr('any')+"</option>");
					
					for (fuel in data){
						var name = data[fuel].name;
						var value = data[fuel].value;
						
						if(!name){ // ignore older format; regenerate from boostrap or sync next time
							localStorage.removeItem('m.auto24.ee.app.' + this.name);
							return;
						}
						
						node.append("<option data-i18ntxt='"+name.toLowerCase()+"' value="+value+">"+Local.tr(name.toLowerCase())+"</option>");
					}
				}, 
				function(){
					var types = $('#searchParam-fuel').children('option');
					var data = [];
					types.each(function(){
						if(this.value != 0){
							data.push({value:this.value,name:this.innerHTML});
						}
					});
					
					return {
						hash : 'bootstrap_'+version,
						data : data
					};
				}
		),
		locations : new SyncField('locations', 
				function(data) { // onload
					var node = $('#searchParam-location');
					var lang = get_default_locale();
					
					node.empty();
					node.append("<option value='0' data-i18ntxt='any'>"+Local.tr('any')+"</option>");
					
					var countries = [];
					var states = [];
					
					
					for (loc in data){
						var cdata = data[loc];
						
						if(loc < 0){
							countries.push([loc, cdata['en'],cdata[lang]]);
						}else{
							states.push([loc, cdata['en'],cdata[lang]]);
						}
					}
					
					countries.sort(function(a, b){return a[2].localeCompare(b[2])});
					states.sort(function(a, b){return a[2].localeCompare(b[2])});
					
					for (c in countries){
						var cc = countries[c];
						node.append("<option data-i18ntxt='"+cc[1]+"' value="+cc[0]+">"+cc[2]+"</option>");	
					}
					
					for (c in states){
						var cc = states[c];
						node.append("<option data-i18ntxt='"+cc[1]+"' value="+cc[0]+">"+cc[2]+"</option>");	
					}
				}, 
				function(){
					var locs = $('#searchParam-location').children('option');
					var data = {}
					locs.each(function(){
						if(this.value != 0){
							var s = this.innerHTML
							data[this.value]={
									en:s,ru:s,et:s,fi:s
							}
						}
					});
					
					return {
						hash : 'bootstrap_'+version,
						data : data
					};
				}
			),
		dealers : new SyncField('dealers', 
			function(data) { // onload
	
				var node = $('#searchParam-dealer');
				var sortable = [];
				
				for(key in data){
					sortable.push([key, data[key]]);
				}
				
				sortable.sort(function(a, b) {return a[1].localeCompare(b[1], "en",{numeric:true})});
				
				node.empty();
				node.append($("<option value='0' data-i18ntxt='any'>" + Local.tr('any')
								+ "</option>"));
				
				for (i in sortable) {
					node.append($("<option data-i18ntxt='"+sortable[i][1]+"' value='" + sortable[i][0] + "'>" + sortable[i][1]
							+ "</option>"));
				}
	
				node.change();
	
			}, 
			function() { // bootstrap
				var value = {};
				var node = $('#searchParam-dealer');
	
				node.children('option').each(function() {
					if (this.value != 0) {
						value[this.value] = this.innerHTML;
					}
				});
	
				return {
					hash : 'bootstrap_'+version,
					data : value
				};
			}
		),
		rally: new SyncField('rally',
			function(data) { // onload
				if(data){
					$("#rallyIcon").show();
				}else{
					$("#rallyIcon").hide();
				}
			}, 
			function(){
				return {
					hash : 'bootstrap_'+version,
					data : true
				};
			}
		),
		vpc: new SyncField('vpc',
			function(data) { // onload
				if(data){
					$("#vpcIcon").show();
				}else{
					$("#vpcIcon").hide();
				}
			}, 
			function(){
				return {
					hash : 'bootstrap_'+version,
					data : false
				};
			}
		),
		popups: new SyncField('popups',
			function(data) { // onload
				UI.popups = data;
			}, 
			function(){
				return {
					hash : 'bootstrap_'+version,
					data : {}
				};
			}
		),
	}

	/**
	 * Synchronizes all registered fields in one call
	 */
	this.synchronize = function() {
		var hashesArray = {}

		for (field in fields) {
			hashesArray[field] = fields[field].hash;
		}

		function onready(data) {
			for (item in data) {
				if (data[item].status && fields[item]) {
					fields[item].update(data[item].hash, data[item].data);
				}
			}
		}

		Login.call(Search.getAbsUrl('services/sync_json.php?action=sync&version=2'), {
			hash : hashesArray
		}, onready, true);
	}
}

/**
 * Represents a single synchronized item
 * 
 * @class
 * @param {string}
 *            name universal identifier of this syncField
 * @param {function}[onload]
 *            function(data) to execute on successful retrieval of field from
 *            localStorage
 * @param {function}[bootstrap]
 *            synchronous function returning values {hash,data} if those aren't
 *            found in localStorage
 */
function SyncField(name, onload, bootstrap) {

	this.name = name;
	this.onload = onload;
	
	var fullName = 'm.auto24.ee.app.' + this.name;
	var data_string = localStorage.getItem(fullName);
	var data_object = {};

	if (data_string && data_string != 'null') {
		data_object = $.parseJSON(data_string);
		
		if(data_object){

			this.hash = data_object.hash;
			this.data = data_object.data;
	
			if (onload) {
				this.onload(this.data);
			}
		}else{
			if (bootstrap) {
				data_object = bootstrap();
				data_string = JSON.stringify(data_object);
				
				localStorage.setItem(fullName, data_string);
				
				this.update(data_object.hash, data_object.data);
			}
		}
	} else {
		if (bootstrap) {
			data_object = bootstrap();
			data_string = JSON.stringify(data_object);
			
			if(data_object == null || data_object === undefined){
				console.log('could not sync field ' + name + ": bootstrap data is "+data_object);
			}
			
			//if(!UI.webMode)
				localStorage.setItem(fullName, data_string);
			
			this.update(data_object.hash, data_object.data);
		}
	}
}

SyncField.prototype.name = "UntitledSyncField";
SyncField.prototype.hash = "UninitializedSyncHash";
SyncField.prototype.data = {};

/**
 * Sets new hash and data values, saves them to local storage, executes
 * callbacks
 */
SyncField.prototype.update = function(hash, data) {
	this.hash = hash;
	this.data = data;
	var data_object = {
		hash : hash,
		data : data
	};
	var data_string = JSON.stringify(data_object);
	var fullName = 'm.auto24.ee.app.' + this.name;

	if(!(UI.webMode && UI.isApple))
		localStorage.setItem(fullName, data_string);

	if (this.onload)
		this.onload(data);
}

function CommercialsService(){
}

CommercialsService.prototype.pageOffset = 0;
CommercialsService.prototype.enabled = true;
CommercialsService.prototype.version = 3;

CommercialsService.prototype.killSwitchEngage = function(){
	UI.disableInsertion();
	UI.ticker('hide');
	UI.alert('Ad insertion is disabled',null,'Auto24');
	UI.hashLink('login/loginScreen/'+UI.hashnum);
	this.enabled = false;
}

CommercialsService.prototype.checkEnabled = function(callback){
	UI.ticker('show');
	var self = this;
	
	$.ajax({
		url:Search.getAbsUrl('services/commercials_json.php?action=check_enabled&v='+self.version),
		success:function(data, status, jqxhr){
			UI.ticker('hide');
			  if(data == '1'){
				  if(callback) callback(data, status, jqxhr);
			  }else{
				  UI.disableInsertion();
				  self.enabled = false;
			  }
		},
		error:function(){
			/*
			UI.ticker('hide');
			UI.disableInsertion();
			self.enabled = false;
			*/
		}
	});
}

CommercialsService.prototype.getHitcounts = function(id, callback){
	var id = parseInt(id);
	var self = this;
	Login.authCall(Search.getAbsUrl('services/commercials_json.php?action=hitcounts&id='+id+'&locale='+Local.locale)+'&v='+self.version,{}, function(data){
		if(data == 0){
			self.killSwitchEngage();
			return;
		}
		
		if(data.status=='success'){
			if(callback) callback(data);			
		}else{
			UI.alert(data.errors[0], null, "Auto24");
		}
	}, true);
}

CommercialsService.prototype.publish = function(data, callback){
	var self = this;
	Login.authCall(Search.getAbsUrl('services/commercials_json.php?action=insert_vehicle&locale='+Local.locale+'&v='+self.version),data, function(data){
		if(data == 0){
			self.killSwitchEngage();
			return;
		}
		
		if(data.status=='success'){
			if(callback) callback(data);			
		}else{
			UI.alert(data.errors[0], null, "Auto24");
		}
	}, true);
}

CommercialsService.prototype.fetchList = function(callback){
	var self = this;
	Login.authCall(Search.getAbsUrl('services/commercials_json.php?action=list&locale='+Local.locale+'&v='+self.version),{}, function(data){
		if(data == 0){
			self.killSwitchEngage();
			return;
		}
		
		if(data.status=='error'){
			UI.alert(data.errors[0], null, "Auto24");
		}else{
			self.showResults(data.ads, callback);
		}
	}, true);
}

CommercialsService.prototype.fetchThumbs = function(ad, callback){
	var self = this;
	Login.authCall(Search.getAbsUrl('services/images_json.php?action=retrieve&dbt=3&id='+ad+'&locale='+Local.locale+'&v='+self.version),{}, function(data){
		callback(data);
	}, true);
}

CommercialsService.prototype._resultClick = function(){
	// caveat - this is used as onclick handler for my ads, so "this" means
	// "this div", not "this class"!
	UI.clicked(this);
	UI.saveScrollPosition();

	UI.hashLink(this.getAttribute('hash') + '/' + (UI.hashnum + 1) + '/'
			+ this.getAttribute('ad'));
}

CommercialsService.prototype.getOptions = function(ad, callback){
	var self = this;
	Login.authCall(Search.getAbsUrl('services/commercials_json.php?action=ad_short&ad='+ad+'&locale='+Local.locale+'&v='+self.version),{}, function(data){
		if(data == 0){
			self.killSwitchEngage();
			return;
		}
		if(callback)callback(data);
	}, true);
}

CommercialsService.prototype.getServices = function(ad, callback){
	var self = this;
	Login.authCall(Search.getAbsUrl('services/commercials_json.php?action=ad_short&ad='+ad+'&locale='+Local.locale+'&v='+self.version),{}, function(data){
		if(data == 0){
			self.killSwitchEngage();
			return;
		}
		if(callback)callback(data);
	}, true);
}

CommercialsService.prototype.getShopItems = function(ad, callback){
	var self = this;
	Login.authCall(Search.getAbsUrl('services/shop_json.php?action=list&id='+ad+'&locale='+Local.locale+'&v='+self.version),{}, function(data){
		if(data == 0){
			self.killSwitchEngage();
			return;
		}
		if(callback)callback(data);
	}, true);
}

CommercialsService.prototype.cancelOrderItem = function(id, callback){
	var self = this;
	Login.authCall(Search.getAbsUrl('services/shop_json.php?action=cancel_order_part&id='+id+'&locale='+Local.locale+'&v='+self.version),{}, function(data){
		if(data == 0){
			self.killSwitchEngage();
			return;
		}
		if(callback) callback(data);
	}, true);	
}

CommercialsService.prototype.saveServices = function(ad, input, callback){
	var self = this;
	Login.authCall(Search.getAbsUrl('services/shop_json.php?action=save&id='+ad+'&locale='+Local.locale+'&v='+self.version),input, function(data){
		if(data == 0){
			self.killSwitchEngage();
			return;
		}
		if(callback)callback(data);
	}, true);
}

CommercialsService.prototype.setHidden = function(ad, hidden, callback){
	var self = this;
	Login.authCall(Search.getAbsUrl('services/commercials_json.php?action=hide&ad='+ad+'&value='+hidden+'&v='+self.version),{}, function(data){
		if(data == 0){
			self.killSwitchEngage();
			return;
		}
		if(callback)callback(data);
	}, true);
}

CommercialsService.prototype.discontinue = function(ad, callback){
	var self = this;
	Login.authCall(Search.getAbsUrl('services/commercials_json.php?action=discontinue&ad='+ad+'&v='+self.version),{}, function(data){
		if(data == 0){
			self.killSwitchEngage();
			return;
		}
		if(callback)callback(data);
	}, true);
}

CommercialsService.prototype.archive = function(ad, callback){
	var self = this;
	Login.authCall(Search.getAbsUrl('services/commercials_json.php?action=delete&ad='+ad+'&v='+self.version),{}, function(data){
		if(data == 0){
			self.killSwitchEngage();
			return;
		}
		if(callback)callback(data);
	}, true);
}

CommercialsService.prototype.showResults = function(data, ready){
	var data_count = data.length;
	var thisNode = $('#adList');
	var that = this;
	
	var jResultContainer = thisNode.find('.results');
	if (jResultContainer.length==0) {
		var resultContainer = document.createElement('div');
		resultContainer.setAttribute('class', 'results scrollFrame');
		thisNode.append(resultContainer);
	}
	else {
		jResultContainer.empty();
		var resultContainer = jResultContainer.get(0);
	}

	if(data_count > 0){
		for (var i=0; i<data_count; i++) {
			var row = data[i];
			var item = UI.getResultItem(row, UI.sections.login.pages.adOptions,UI.sections.login.pages.adList);
			item.onclick = this._resultClick;
			
			resultContainer.appendChild(item);
			
			var statusBar = $('<div class="status">'+data[i].ad_status+'</div>');
			
			if(data[i].hidden){
				item.setAttribute('ei_naita_auto24','1');
				$(item).addClass('adHidden');
				// statusBar.append('<br/>'+data[i].hidden);
			}
			
			if(data[i].archive){
				item.setAttribute('archive',data[i].archive);
			}
			
			var title = $(item).find('.title'); 
			
			title.wrapInner('<div class="titleLeft"/>');
			
			$(item).append(statusBar);
		}
	}
	else{
		var emptyRes = document.createElement('div');
		emptyRes.setAttribute('class','emptyFavs');
		emptyRes.innerHTML = Local.tr('No vehicles found');
		resultContainer.appendChild(emptyRes);
	}
	setTimeout(function(){
		if(ready){ready()};
	},100);
}

CommercialsService.prototype.fillForm = function(page, data, callback){
	var self = this;
	var form = page.node.find('form').first(); 
		
	var equipmentContainer = page.equipment.node;
	var techdataContainer  = page.techdata.node;
	var otherdataContainer = page.otherdata.node;
	
	equipmentContainer.empty();
	techdataContainer.empty();
	otherdataContainer.empty();
	
	function itemCheckboxClick(e) {
		$(this).find('input').first().each(function() {
			if(this.getAttribute('rel') != 'locked'){
				this.checked = !this.checked;
				$(this).change();
			}
		});
	}
	
	function updateLocation(countrySelect,locationSelect){
		var selectedCountry = countrySelect.children('option:selected');
		if (selectedCountry.length == 0) {
			selectedCountry = countrySelect.children().first();
		}

		var selectedState = locationSelect.children('option:selected');
		if (selectedState.length == 0) {
			selectedState = locationSelect.children().first();
		}
		
		var countryButton = countrySelect.next('.select-button');
		
		var validState = selectedState.val() != 0 && !selectedState.hasClass('nullOption');
		var validCountry = selectedCountry.val() != 0 && !selectedCountry.hasClass('nullOption'); 
		
		if (validState && validCountry)	
		{
			countryButton.text(selectedState.text() + ', ' + selectedCountry.text());
		} else if (validCountry) {
			countryButton.text(selectedCountry.text());
		} else if (validState){
			countryButton.text(selectedState.text());
		} else{
			countryButton.text(Local.tr('select'));
		}
	}
	
	function setupLabel(){
		var check = $(this);
		var row = check.parentsUntil('.frame,.expand-block,form').last();
		
		if(check.size()){
			var checked = check.is(':checked');
			var inputs = row.find('input').not('[type="checkbox"],[type="hidden"]');
			var inputtexts = '';
			inputs.each(function(){
				inputtexts += this.value;
			});
			
			row.find('.label_check').toggleClass('c_on',checked);
	
			row.toggleClass('with-placeholder',inputtexts.length==0 && checked);
			
			if(!checked){
				row.find('.text-field').removeClass('expanded');
				row.find('.text-field-expand').removeClass('expanded');
			}
			
			if(inputtexts.length>0 && !checked){
				inputs.val('');
			}
		}
	}
	
	function setupLabels() { 
		var inputs = UI.getCurrentPage().node.find('.label_check input')
		if (inputs.length) {
			inputs.each(setupLabel);
		};
	}
	
	function clickRelay(e){
		var $this = $(this);
			if(e.target.tagName!='LABEL' 
				&& e.target.tagName!='INPUT' 
				&& e.target.tagName != 'SELECT'  
				&& !$(e.target).hasClass('select-button')
				&& !$(e.target).hasClass('label_check')
				&& !$(e.target).hasClass('text-field-expand')
				&& !$(e.target).hasClass('fieldOverlay')
			){
				e.preventDefault();
				e.stopPropagation();
				$this.children('label').first().click();	
			}
	}
	
	var equipment = data.equipment;
	var eqhtml = '';
	
	var hasOtherEq = false;
	for(g in equipment){
		var group = equipment[g];
		
		if (!!group.children[170]){
			hasOtherEq = group;
			continue;
		}
		eqhtml += this.renderEquipmentGroup(group)
	}
	if (hasOtherEq){
		eqhtml += this.renderEquipmentGroup(hasOtherEq);
	}
	
	if(UI.isAndroid && !UI.isIcecream && !UI.isHoneycomb){
		eqhtml += "<input type='text' value='' class='froyoHaxInput' onfocus='this.blur()'/>";
	}
	
	
	equipmentContainer.html(eqhtml);
	techdataContainer.html(data.techdata);
	otherdataContainer.html(data.otherdata);
	
	var forwardBackButtonHtml = '<div class="form-item item-submit">'
  	+ '	<input type="submit" class="input-submit fat-submit-button subpage-back-button" data-value="Next" value="'+Local.tr('Next')+'">'
	+ '</div>';
	
	equipmentContainer.append($(forwardBackButtonHtml));
	techdataContainer.append($(forwardBackButtonHtml));
	otherdataContainer.append($(forwardBackButtonHtml));
	
	equipmentContainer.find('.fat-submit-button').click(function(){UI.back();});
	techdataContainer.find('.fat-submit-button').click(function(){UI.back();});
	otherdataContainer.find('.fat-submit-button').click(function(){UI.back();});
	
	form.find('.item-agreement')
	.toggle(data.agreement_needed)
	.find('input')
	.prop('checked',false)
	.change();

	var i = 0;
	
	var equipmentSelects = equipmentContainer.find('select');
	
	equipmentSelects.screenSelect({
		target:'#loginSelect',
		hide:function(that){
			UI.hideSelect(false, $('#loginSelect'))
			setTimeout(function(){
				UI.loadScrollPosition();
				self.pageOffset = 0;
				UI.changeTitle(page.name);
			},100);
		},
		show:function(that){
			UI.saveScrollPosition();
			UI.showSelect(that.closest('.form-subitem').find('label').text(), $('#loginSelect'));
		}
	});
	
	var techdataSelects = techdataContainer.find('select'); 
	
	techdataSelects.each(function(){
		var $this = $(this);
		var label = $this.closest('.form-item').find('label');
		label.addClass('selectLabel');
		
		if(!$this.attr('id')){
			var id = 'techDataSelect-'+i++;
			$this.attr('id', id);
			label.attr('for',id);
			i++;
		}else{
			label.attr('for',$this.attr('id'));
		}
		
		var frist = $this.children('option:first-child'); 
		if(frist.html() == ""){
			$this.children('option:first-child').html(Local.tr('select'));
			frist.addClass('nullOption');
		}
		
	});
	
	techdataSelects.screenSelect({
		target:'#loginSelect',
		hide:function(that){
			UI.hideSelect(false, $('#loginSelect'))
			setTimeout(function(){
				UI.loadScrollPosition();
				self.pageOffset = 0;
				UI.changeTitle(page.name);
			},100);
		},
		show:function(that){
			UI.saveScrollPosition();
			UI.showSelect(that.closest('.form-item').find('label').text(), $('#loginSelect'));
		}
	});
	
	var otherDataSelects = otherdataContainer.find('select');
	
	otherDataSelects.each(function(){
		var $this = $(this);
		
		var label = $this.parent().prev('label');
		label.addClass('selectLabel');
		
		if(!$this.attr('id')){
			var id = 'otherDataSelect-'+i++;
			$this.attr('id', id);
			label.attr('for',id);
			i++;
		}
		
		var hasNoFrist = ($this.children().first().val()!=0);
		
		$this.children().each(function(){
			if(this.innerHTML.trim().length==0){
				this.innerHTML = (Local.tr('select'));
				$(this).addClass('nullOption')
				hasNoFrist = false;
				return false;
			}
		});
		
		if(hasNoFrist){
			$this.prepend("<option value='0'>"+Local.tr('select')+"</option>");
		}
	});
	
	otherdataContainer.find('label[for="advertise-country"]').text(Local.tr('Location'));
	
	var inspectionSelect = otherdataContainer.find("select[name='autod[ylevaatus]']");
	var inspectionRow = inspectionSelect.closest('.form-item');
	var inspectionPrev = inspectionRow.prev();
	
	inspectionRow.addClass('inspection-second');
	inspectionPrev.addClass('inspection-first');
	
	
	otherDataSelects.not('.advertise-location,.advertise-country').screenSelect({
		target:'#loginSelect',
		hide:function(that){
			UI.hideSelect(false, $('#loginSelect'));
			setTimeout(function(){
				UI.loadScrollPosition();
				self.pageOffset = 0;
				UI.changeTitle(page.name);
			},100);
		},
		show:function(that){
			UI.saveScrollPosition();
			UI.showSelect(that.parent().siblings('label').text(), $('#loginSelect'));
		}
	});
	
	var countrySelect = otherDataSelects.filter('.advertise-country');
	var locationSelect = otherDataSelects.filter('.advertise-location');
	
	countrySelect.screenSelect({
		target:'#loginSelect',
		hide:function(that){
			if(that.val() != 1){
				UI.hideSelect(false, $('#loginSelect'));
				setTimeout(function(){
					UI.loadScrollPosition();
					self.pageOffset = 0;
					UI.changeTitle(page.name);
				},100);
			}else{
				var locationButton = locationSelect.next('.select-button');
				locationButton.triggerHandler('click');
			}
		},
		show:function(that){
			UI.saveScrollPosition();
			UI.showSelect(that.parent().siblings('label').text(), $('#loginSelect'));
		}
	});
	
	locationSelect.screenSelect({
		target:'#loginSelect',
		hide:function(that){
			updateLocation(countrySelect, locationSelect);
			UI.hideSelect(false, $('#loginSelect'));
			UI.loadScrollPosition();
			UI.changeTitle(page.name);
		},
		show:function(that){
			UI.saveScrollPosition();
			UI.showSelect(that.parent().siblings('label').text(), $('#loginSelect'));
		}
	});
	
	updateLocation(countrySelect, locationSelect);
	
	techdataContainer.find('.label_check').click(itemCheckboxClick);
	techdataContainer.find('.field label').click(function(e){
		e.preventDefault();
		e.stopPropagation();
		UI.clicked(this);
		$(this).siblings('.label_check').click();
		$(this).siblings('input').focus();
	});

	otherdataContainer.find('.label_check').click(itemCheckboxClick);
	otherdataContainer.find('.form-item label').click(function(e){
		e.preventDefault();
		e.stopPropagation()
		var $this = $(this);
		UI.clicked(this);
		$this.siblings('.label_check').click();
		$this.next('.field').find('input').focus();
	});
	
	otherdataContainer.find('input').change(function(){
		var $this = $(this);
		
		if($this.attr('type') == 'checkbox'){
			if(!this.checked){
				$this.closest('.form-item').find('input').each(function(){
					if($(this).attr('type') != "checkbox"){
						this.value = '';
					}
				});
			}
		}else{
			var $check = $this.closest('.form-item').find('input[type="checkbox"]');
			if($check.size() > 0 && $this.val().length > 0){
				$this.parentsUntil('.frame').last().removeClass('with-placeholder');
				$check.attr('rel','locked');
				$check.attr('checked',true);
				
				setTimeout(function(){
					$check.attr('rel','');
				},100);
				$check.change();
			}
		}
	});
	
	setTimeout(function(){
		equipmentContainer.find('.item-expand').click(function(e){
			e.stopPropagation();
			e.preventDefault();
			UI.clicked(this);
			var $this = $(this);
			var $next = $this.next();
			$this.toggleClass('expanded');
			$next.toggleClass('expanded');
		});
		
		equipmentContainer.find('.subitem-expand .label_check input').change(function(){
			var checked = $(this).prop('checked');
			
			var $this = $(this).closest('.subitem-expand');
			var $next = $this.next();
			
			if(checked){
				$this.addClass('expanded');
				$next.addClass('expanded');
			}else{
				$this.removeClass('expanded');
				$next.removeClass('expanded');
				
				$this.find('input[type="text"]').val('');
				$next.find('input[type="text"]').val('');
				
				var childBoxes = $next.find('input[type="checkbox"]');
				
				childBoxes.attr('checked',false);
				childBoxes.change();
			}

		});
		
		equipmentContainer.find('.text-field-expand').click(function(){
			var $this = $(this);
			var item = $this.closest('.form-subitem')
			var textfield = item.find('.text-field');
			
			var isOpen = textfield.hasClass('expanded');
			var isEmpty = textfield.find('input').val().trim().length == 0;
			var isChecked = item.find('input[type="checkbox"]').prop('checked');
			
			UI.clicked(this);
			
			if (isOpen && isEmpty){
				$this.removeClass('expanded');
				textfield.removeClass('expanded');
			}
			else if(!isOpen && isChecked){
				$this.addClass('expanded');
				textfield.addClass('expanded');
			}
		});
		
		otherdataContainer.find('.text-field-expand').click(function(){
			var $this = $(this);
			var item = $this.closest('.form-item')
			var textfield = item.find('.text-field');
			
			var isOpen = textfield.hasClass('expanded');
			var isEmpty = textfield.find('input').val().trim().length == 0;
			var isChecked = item.find('input[type="checkbox"]').prop('checked');
			
			if (isOpen && isEmpty){
				$this.removeClass('expanded');
				textfield.removeClass('expanded');
			}
			else if(!isOpen && isChecked){
				$this.addClass('expanded');
				textfield.addClass('expanded');
			}
		});
		
		otherdataContainer.find('input[type="checkbox"]').each(function(){
			var $this = $(this);
			var item = $this.closest('.form-item')
			var textfield = item.find('.text-field');
			var input = textfield.find('input');
			
			if (input.length == 0){
				return;
			}
			
			var isOpen = textfield.hasClass('expanded');
			var isEmpty = input.val().trim().length == 0;
			var isChecked = item.find('input[type="checkbox"]').prop('checked');
			
			if(isChecked){
				console.log($this.attr('name')+' is checked');
				item.addClass('with-placeholder');
				if(!isEmpty){
					console.log($this.attr('name')+' is not empty');
					$this.addClass('expanded');
					textfield.addClass('expanded');
				}
			}
		});
		
		equipmentContainer.find('.form-subitem .label_check').click(itemCheckboxClick);
		equipmentContainer.find('.form-subitem label').click(function(e){
			e.preventDefault();
			UI.clicked(this);
			$(this).prev('.label_check').click();
			$(this).next('input').focus();
		});
		
		equipmentContainer.find('input[type="checkbox"]').change(setupLabel);
		otherdataContainer.find('input[type="checkbox"]').change(setupLabel);
		techdataContainer.find('input[type="checkbox"]').change(setupLabel);
		
		equipmentContainer.find('input[type="text"]').change(function(e){
			e.preventDefault();
			var $this = $(this);
			if($this.val().length>0){
				var $check =$this.closest('.form-subitem').find('input[type="checkbox"]'); 

				$check.attr('rel','locked')
					  .attr('checked',true)
					  .change();
				
				$this.parentsUntil('.frame').last().removeClass('with-placeholder');
				
				setTimeout(function(){
					$check.attr('rel','');
				},100);
			}else{
				if($this.closest('.form-subitem')
				.find('input[type="checkbox"]')
				.prop('checked')){
					//$this.parentsUntil('.frame').last().addClass('with-placeholder');
				}
			}
		});
		
		equipmentContainer.find('.form-subitem').click(function(e){
			var t = $(e.target);
			if(t.hasClass('form-subitem')){
				var l =t.children('label').first(); 
				e.stopPropagation();
				e.preventDefault();
				l.click();
			}
		});
		
		equipmentContainer.find('textarea').change(function(){
			$(this).toggleClass('no-placeholder', this.value.length>0);
		}).change();
		
		equipmentContainer.find('.field').click(function(e){
			$(this).children('input').focus();
		});
		
		otherdataContainer.find('.form-item').click(clickRelay);			
		techdataContainer.find('.form-item').click(clickRelay);
		
		otherdataContainer.find('textarea').change(function(){
			$(this).toggleClass('no-placeholder', this.value.length>0);
		}).change();
		
		var phoneInput = form.find('.advertise-phone');
		
		if(data.maindata){
			form.find('.advertise-price').val(data.maindata.price);
			form.find('.advertise-bargainprice').val(data.maindata.bargainprice);
			form.find('.advertise-vat').val(data.maindata.vat).change();
			form.find('.advertise-name').val(data.maindata.name);
			form.find('.advertise-email').val(data.maindata.email);
			form.find('.advertise-phone').val(data.maindata.phone);
			form.find('.advertise-othermodel').val(data.maindata.model_name);
			form.find('.advertise-model_trim').val(data.maindata.model_trim);
			form.find('.advertise-type').val(data.maindata.type).change();
			form.find('.advertise-bodytype_in_detail').val(data.maindata.bodytype_in_detail).change();
			form.find('.advertise-year').val(data.maindata.year).change();
			form.find('.advertise-month').val(data.maindata.month).change();
		}
		
		if(equipmentContainer.html().length == 0){
			form.find('.item-button[rel="equipment"]').hide();
		}else{
			form.find('.item-button[rel="equipment"]').show();
		}
		
		setupLabels();
		
		if(callback){callback(data);}
	},0);
	
	equipmentContainer.find('.text-field-expand').prev().css('width','100%');
	otherdataContainer.find('.text-field-expand').prev().css('width','100%');
    
    UI.overlayInputFields(otherdataContainer);
    UI.overlayInputFields(equipmentContainer);
    UI.overlayInputFields(techdataContainer);
	
}

CommercialsService.prototype.fetchEditFields = function(ad, page, callback){
	var self = this;
	Login.authCall(Search.getAbsUrl('services/commercials_json.php?action=edit&ad='+ad+'&locale='+Local.locale+'&v='+self.version),{}, function(data){
		if(data == 0){
			self.killSwitchEngage();
			return;
		}
		if (data.status == 'success'){
			self.fillForm(page, data, callback);
		}else{
			if(callback) callback(data);
		}
	});
}

CommercialsService.prototype.fetchFields = function(vehicleType, page, callback){
	var self = this;
	
	Login.authCall(Search.getAbsUrl('services/commercials_json.php?action=fields&vehicle_type='+vehicleType+'&locale='+Local.locale+'&v='+self.version),{}, function(data){
		if(data == 0){
			self.killSwitchEngage();
			return;
		}
		
		setTimeout(function(){
			self.fillForm(page, data, callback);
		},0)
	});
}

CommercialsService.prototype.renderGraph = function(){
	var html = "";
	
	html += "<div class='graphTitle' data-i18ntxt='Last 30 days'>"+Local.tr('Last 30 days')+"</div>";
	
	html+="<div class='barContainer'>";
	html+="<div class='graphBar sideLegend' rel='left'><span data-i18ntxt='views'>"+Local.tr('views')+"</span></div>";
	for(i=0;i<30;i++){
		html+="<div class='graphBar' rel='"+i+"'>";
		html+="<div class='barEmpty' style='height:100%'><div class='barLabel'>0</div></div>";
		html+="<div class='barFill' style='height:0%'></div>";
		html+="</div>";
	}
	html+="<div class='graphBar sideLegend' rel='right'><span data-i18ntxt='views'>"+Local.tr('views')+"</span></div>";
	html+="</div>"
		
	html += "<div class='graphLegend'>"
	for(i=0;i<30;i++){
		html+="<div class='graphLabel' rel='"+i+"'><span>"+i+"</span></div>";
	}
	html += "</div>";
	
	html += "<div class='graphLegend'>" +
			"<div class='month'>previous</div>"+
			"<div class='month'>next</div>"+
			"</div>";
	
	return html;
}


CommercialsService.prototype.renderEquipmentGroup = function(group){
	var html = "<div class='form-item'>"+
	'<label class="label">'+ucf(group.title)+'</label>'+
	'<div class="field">'+
	'</div>'+
	'</div>\n';

	var hasOther = false;
	for (c in group.children){
		var row = group.children[c];
		
		if(row.id==170){
			hasOther = row;
			continue;
		}
		html += this.renderEquipmentRow(row);
	}
	if (hasOther){
		html += this.renderEquipmentRow(hasOther);
		hasOther = false;
	}
	return html;
}

CommercialsService.prototype.renderEquipmentRow = function(row){
	return row.children?this.renderEquipmentNode(row):this.renderEquipmentLeaf(row);
}

CommercialsService.prototype.renderEquipmentNode = function(row){
	
	var rowHtml = '<div class="form-subitem subitem-expand">';
	
	var title = Local.lang=='et'?row['nimi']:row['nimi_'+Local.locale_to_lang(Local.lang)];
	if (title===undefined){
		title = row['nimi'];
	}
	
	var checked = row.checked?' checked ':'';
	var value = row.value?" value='"+row.value+"' ":'';
	var expanded = row.checked?" expanded":'';
	
	var unit = "";
	if(row.lisainfo_pikkus>0 && row.yhik) unit = "("+row.yhik+")";
	
	rowHtml += "<div class='elasticField'>";
	rowHtml += "<div class='elasticTable'>";
	
	rowHtml += "<div class='label_check'><input type='checkbox' name='lisad["+row.id+"]' "+checked+" id='nodeCheckbox-"+row.id+"'/></div>";
	rowHtml += "<label for='nodeCheckbox-"+row.id+"'>"+title+unit+"</label>";
	
	rowHtml += "</div></div>";
	
	if (row.lisainfo_pikkus>0){
		var expandedText = (row.checked && row.value.trim().length > 0)?' expanded':'';
		rowHtml += "<div class='text-field-expand"+expandedText+"'></div><div class='field text-field "+expandedText+"'><input type='text' name='lisainfo["+row.id+"]' "+value+"'/></div>";
	}
	
	rowHtml += '</div><div class="expand-block'+expanded+'">';
	
	for (c in row.children){
		rowHtml += this.renderEquipmentRow(row.children[c]);
	}
	rowHtml+="</div>";
	return rowHtml;
}

CommercialsService.prototype.renderEquipmentLeaf = function(row){
	var rowHtml = '';
	
	var checked = row.checked?' checked ':'';
	var expanded = row.checked?' expanded ':'';
	var value = row.value?" value='"+row.value+"' ":'';
	
	var title = row['nimi'];
	if(Local.lang!='et'){
		title = row['nimi_'+Local.locale_to_lang(Local.lang)];
	}
	
	if(row.sisestamine == 2){
		rowHtml+='<div class="form-subitem item-textarea">';
		rowHtml += "<label class='label multilineLabel' for='nodeTextfield-"+row.id+"'>"+title+(row.yhik?"("+Local.tr(row.yhik)+")":"")+"</label>";
		rowHtml += "<input type='hidden' value=1 name='lisad["+row.id+"]'/>";

		rowHtml += "<div class='field'><textarea name='lisainfo["+row.id+"]'>"+(row.value?row.value:'')+"</textarea></div>";
	}else if(row.sisestamine == 4){
		rowHtml+='<div class="form-subitem item-select">';
		rowHtml += "<label class='label multilineLabel' for='nodeTextfield-"+row.title+"'>"+row.title+"</label>";
		rowHtml += "<div class='field'><select name='equipment[]'>";
		
		rowHtml += "<option value='' data-i18txt='select'>"+Local.tr('select')+"</option>";
		
		for(key in row.options){
			var option = row.options[key];
			var optionTitle = option['nimi'];
			if(Local.lang!='et'){
				optionTitle = option['nimi_'+Local.locale_to_lang(Local.lang)];
			}
			
			var selected = option.selected?"selected":"";
			rowHtml += "<option value='"+option.id+"' "+selected+">"+optionTitle+"</option>";
		}
		
		rowHtml += "</select></div></div>";
		
	}else if(row.sisestamine == 10){
		rowHtml+='<div class="form-subitem item-text">';
		rowHtml += "<div class='elasticField'>";
		rowHtml += "<div class='label'>"+title+(row.yhik?"("+row.yhik+")":"")+"</div>";
		rowHtml += "</div>";
	}else{
		rowHtml+='<div class="form-subitem item-text">';
		rowHtml += "<div class='elasticField'>";
		rowHtml += "<div class='elasticTable'>";
		
		var unit = ""
		if(row.lisainfo_pikkus>0 && row.yhik) unit = "("+row.yhik+")";

		rowHtml += "<div class='label_check'><input type='checkbox' name='lisad["+row.id+"]'"+checked+" id='leafCheckbox-"+row.id+"'/></div>";
		rowHtml += "<label class='eqCbLabel' for='nodeCheckbox-"+row.id+"'>"+title+unit+"</label>";
		rowHtml += "</div>";
		if (row.lisainfo_pikkus>0){
			var expandedText = (row.checked && row.value.trim().length > 0)?' expanded':'';
			rowHtml += "<div class='text-field-expand"+expandedText+"'></div></div>";
			rowHtml += "<div class='field text-field"+expandedText+"'><input type='text' name='lisainfo["+row.id+"]' "+value+"/></div>";
		}else{
			rowHtml+= "</div>";
		}
	}
	rowHtml+="</div>";
	return rowHtml;
}


/**
 * Handles display of banners. Stubclass. Maybe do stuff later. 
 * @class
 */
function AdService(){}

/**
 * Attach an ad to an existing container, if an ad is served to us.
 * @param {DomNode} container to attach the ad to
 * @param {function} callback function with extra actions to execute on ad insertion, such as refreshing container's scroll. receives the created ad container JQuery object.
 * @param {object} [extra] optional extra data parameters for ad targeting
 */
AdService.prototype.loadAd = function(container, callback, extra){
	var ready = function(data){
		if(data){
		 if(data.ad_content && data.ad_content.length > 0) {
			var jContainer = $(container);
			 
			var adContainer = document.createElement('div');
			var jadContainer = $(adContainer);
			adContainer.setAttribute('class','banner');
			
			var injectPos = data.position?data.position:6;
			var injectItem;
			
			var items = jContainer.children('.item');
			
			if(items.length == 0){
				jadContainer.html(data.ad_content);
				jContainer.prepend(jadContainer);
			}else{
				if (injectPos >= items.length){
					injectItem = items.last();
				}else{
					injectItem = items.eq(injectPos);
				}
			}
			
			jadContainer.html(data.ad_content);
			jadContainer.insertAfter(injectItem);
			
			jadContainer.find('a').click(function(){
				window.open(this.getAttribute("href"),"_system");
				return false;
			});			
		 }
		
		 if(callback) {
			callback(jadContainer);
		 }
		}
	}
	
	var url = Search.getAbsUrl('services/ads_json.php');	
	
	var params = {width:$('body').width(),hash:location.hash,extra:extra,version:1};
	
	Login.call(url, params, ready);
}

AdService.prototype.popupVisible = false;
AdService.prototype.popupTimeout = false;

AdService.prototype.showPopup = function(timeout){
	this.popupVisible = true;
	var self = this;
	var popup = $('#popupAd');
	
	if(this.popupTimeout){
		clearTimeout(this.popupTimeout);
		this.popupTimeout = false;
	}
	
	popup.show();
	setTimeout(function(){
		popup.css('opacity',1);
		if(timeout && timeout > 0){
			self.popupTimeout = setTimeout(function(){
				self.hidePopup();
			}, timeout);
		}
	},1);
}

AdService.prototype.hidePopup = function(){
	this.popupVisible = false;
	if(this.popupTimeout){
		clearTimeout(this.popupTimeout);
		this.popupTimeout = false;
	}

	var popup = $('#popupAd');
	popup.css('opacity',0);
	setTimeout(function(){
		popup.hide();
	},500);
}



/**
 * The MobileService object acts as wrapper and gateway for individual remote services that actually do stuff. 
 * 
 * Additionally, it provides an implementation for the login mechanism.
 * 
 * As such, it manages the following for its clients:
 * 1) whether the user has access to the given function (i.e, whether he is logged in or needs to be shown login page)
 * 2) login, logout, and operations on related UI elements
 * 3) connection status and operations on related UI elements
 * @class
 */

function MobileService(){
	this.isLoggedin = false;
	this.loginUsername = 'Guest';
	this.loginEmail = '';
	this.loginButton = UI.loginButton;
	this.loginScreen = UI.pages.loginScreen;
	this.loginForm = UI.loginForm;
	this.loginNotice = this.loginScreen.find('.notice').first();
	this.logoutButton = $('#logoutButton');
	this.previousNode = null;
	this.version = 1;
	
	var prefix = 'm.auto24.ee.app.';
	this.ls_id = prefix+"loginID";
	this.ls_hash = prefix+"loginHash";

	this.loadRememberData();
	
	UI.inLogin = false;
	
	this.UI = UI;

	var self = this;
		
	this.loginAction = function(){
	}
	
	this.loginForm.submit(function(){
		self.login(this.loginForm);
		return false;
	});
	
	var event = UI.isTouchy?'touchstart':'click';
	
	$('#loginDialogForm').submit(function(){
		self.login($('#loginDialogForm'));
		return false;
	});
	
	$('#loginDialogCancel').bind(event, function(){
		self.hideLogin();
		this.loginAction = function(){};
	});
	
	// accelerate button press for ios devices
	if(UI.isApple){
		$('#d-login-b').bind(event, function(e){
			e.preventDefault();
			e.stopPropagation();
			$('#loginDialogForm').submit();
		});
	};
	
	this.logoutButton.bind(event,function(){self.logout()});
}

/**
 * Perform a login.
 * 
 * This function calls the remote login service and parses the response.
 * If the login is successful, the 'source' function will be executed if passed previously to 
 * showLogin.
 * If login fails due to wrong auth, an error message will be displayed on top of the login form.
 * If the user has been blocked, an error message will be shown and username set to 'banned'.
 * @param {DOMNode} [form=MobileService.loginForm] the form to be submitted 
 * @returns {void}
 */
MobileService.prototype.login = function(form){
	if (!form){form = this.loginForm}
	
	var data = $(form).serialize();
	var self = this;
	
	var remember = $('#loginRemember').prop('checked');
	
	if(!remember){
		self.clearRememberData();
	}
	
	form.find('input').attr('disabled',true);
	
	function onready(data){
		form.find('input').removeAttr('disabled');
		var status = data.status;
		var node = form.find('.notice').first();
		if (status == 'success'){
			self.isLoggedin = true;
			self.loginUsername = data.username;
			self.loginEmail = data.email;
			node.hide();
			self.hideLogin();
			self.updateUI();
			
			if(remember && data.hash && data.id){
				self.saveRememberData(data.id,data.hash);
			}
			
			if (self.loginAction){
				self.loginAction();
			}
			
			self.loginAction = function(){};			
		}else if (status == 'login_failed'){
			self.notice(Local.tr('Incorrect username or password!'), node);
		}else if (status == 'ip_blocked'){
			self.notice(Local.tr('Your ip has been blocked!'), node);
			self.isLoggedin = false;
			self.loginUsername = 'banned';
			self.updateUI();
		}
	}
	this.call(Search.getHttpsAbsUrl('services/login_json.php?action=login&version='+this.version),data, onready);
	return false;
}

/**
 * Puts hash-login credentials into local storage and live vars
 * @param {int} id
 * @param {string} hash
 * @return void
 * @function
 */
MobileService.prototype.saveRememberData = function (id, hash){
	this.loginID = id;
	this.loginHash = hash;
	
	localStorage.setItem(this.ls_id, id);
	localStorage.setItem(this.ls_hash,hash);
}

/**
 * Gets live hash-login credential vars from local storage
 */
MobileService.prototype.loadRememberData = function (){
	this.loginID = localStorage.getItem(this.ls_id);
	this.loginHash = localStorage.getItem(this.ls_hash);
}

/**
 * Resets hash-login credentials
 */
MobileService.prototype.clearRememberData = function(){
	this.loginID = null;
	this.loginHash = null;

	localStorage.removeItem(this.ls_id);
	localStorage.removeItem(this.ls_hash);
}

/**
 * Attempt to login using hash credentials
 * @param {function} callback to execute on attempt's completion, receives text status
 */
MobileService.prototype.hashLogin = function(callback){
	var self = this;
	if (this.loginID && this.loginHash){
		this.call(
			Search.getAbsUrl('services/login_json.php?action=hash_login&version='+this.version),
			{id:this.loginID, hash:this.loginHash},
			function(data){
				var status = data.status;
				if (status == 'success'){
					console.log('hash login: success');
					self.isLoggedin = true;
					self.loginUsername = data.username;
					self.loginEmail = data.email;
					self.updateUI();
					if (callback){
						callback(status);
					}
				}else if (status == "login_failed"){
					console.log('hash login: failed');
					self.clearRememberData();
					if (callback){
						callback(status);
					}
				}
			},
			true
		);
	}else{
		if (callback){
			callback("login_failed");
		}
	}
}

/**
 * display a message above the login form
 * @param text string to be shown
 * @returns {void}
 */
MobileService.prototype.notice=function(text, jq){
	if (!jq) jq = this.loginNotice;
	jq.text(text);
	jq.show();
	setTimeout(function(){
		jq.fadeOut();
	},2000);
}

/**
 * Query a remote service without auth check using json
 * @param url the url to be queried (string)
 * @param data jquery-accepted ajax data parameter (object, array, urlencoded string) to be posted to server
 * @param ready function(jsondata, status, jqxhr) to be executed on successful call
 * @returns {void}
 */
MobileService.prototype.call = function(url, data, ready, suppressTicker){
	if(!suppressTicker) {
		UI.ticker('show');
	}
	
	if(UI.isIOS6){
		if(url.indexOf('?')>0){
			url+="&i6cotad="+(new Date().getTime());
		}else{
			url+="?i6cotad="+(new Date().getTime());
		}
	}
	
	console.log('Calling url: '+url);
	
	$.ajax({
	  url: url,
	  type:'post',
	  dataType: 'json',
	  cache:false,
	  data:data?data:{length:'required'},
	  success: function(data, status, jqxhr){
		  if(!suppressTicker) {
			  UI.ticker('hide');
		  }
		  ready(data, status, jqxhr);
	  },
	  error: this.connectionError,
      xhrFields: {
   	    crossDomain: true,
        withCredentials: true
      },
	});
}

/**
 * Query a remote service that requires authentication.
 * 
 * Does everything call() does (by calling call()), and also checks the current known login status and response.
 * 
 * If user is known to be not authenticated, or if 'need_auth' is returned by the server, the user will be presented with a login dialog.
 * Once the user successfully authorizes, the function will automatically re-execute. If the user hits cancel or otherwise hides the dialog, no action will be taken.
 * 
 * @function
 * @param {string} url same as call()
 * @param {object} data same as call()
 * @param {function} ready function to run on success, same as call()
 * @param {boolean} [cancel=true] whether to display the cancel button in login popup if shown
 * @returns {void}
 */
MobileService.prototype.authCall = function(url, data, ready, cancel, showloginOverride){
		var self = this;
		// dont even try if we believe ourselves to be logged out!
		if (!this.isLoggedin){
			UI.ticker('reset');
			this.requestLogin(function(){
				self.authCall(url, data, ready, !!cancel);
			}, !!cancel);
		}else{
			this.call(url, data, function(json, status, jqxhr){
				if (json.status=='need_auth'){
					UI.ticker('reset');
					console.log('query failure: authentication needed');
					self.isLoggedin = false;
					self.updateUI();
					self.requestLogin(function(){
						self.authCall(url, data, ready);
					}, !!cancel);
				}else{
					console.log('query success: executing callback');
					ready(json, status, jqxhr);
				}
			});
		}
}

/**
 * Check the current auth status by querying the server
 * This function checks whether the user is logged in, and updates the class variables and ui accordingly.
 * The optional callback parameter allows for additional actions to be executed on completion.
 * @param {function}[callback] function(boolean) that will be executed if there is no connection error
 * @function
 * @returns {void}
 */
MobileService.prototype.authCheck=function(callback){
    var url = Search.getAbsUrl('services/login_json.php?action=check');
    var self = this;
	this.call(url, {}, function(data){
		var status = data.status;
		if (status == 1){
			self.isLoggedin = true;
			self.loginUsername = data.username;
			self.loginEmail = data.email;
			self.updateUI();
			if(callback) callback(self.isLoggedin);
		}else{
			if (self.loginID && self.loginHash){
				self.hashLogin(function(status){
					if(callback){
						callback(self.isLoggedin);
					}
				});
			}else{
				self.isLoggedin = false;
				self.updateUI();
				if(callback){
					callback(self.isLoggedin);
				}
			}
		}
	});
}

/**
 * Bring the ui into accordance with auth status
 * @function
 * @returns {void}
 */
MobileService.prototype.updateUI = function(){
	  var self = this;
	  if (this.isLoggedin){
		Mail.getMessageCounts(function(data) {
			if(data.inbox.total_unread > 0){
				$('#myMailNotifier').html(data.inbox.total_unread);
				$('#myMailNotifier').show();
				
				$('#dashMailNotifier').html(data.inbox.total_unread);
				$('#dashMailNotifier').show();
			}else{
				$('#myMailNotifier').hide();
				$('#dashMailNotifier').hide();
			}
		});
		$('#loginName').text(this.loginUsername);
		this.logoutButton.show();
		$('#loginScreen > *').css('visibility','visible');
	  }else{
		$('#myMailNotifier').hide();
		$('#dashMailNotifier').hide();
		$('#loginScreen > *').css('visibility','hidden');
		$('#loginName').text('Guest');
		$('#advertise-phone').val('');
		this.logoutButton.hide();
	  }
}

/**
 * Request login from either user or application. 
 * If hash/id pair is available, this will silently attempt to login with those.
 * If this attempt fails, falls back to usual login.
 * Otherwise, user will be asked via showLogin.
 * @param {function} source callback function to execute on success
 * @param {boolean} noCancel true if cancel button should be hidden
 * @function
 * @returns false to suppress default behaviour when used as event handler
 */
MobileService.prototype.requestLogin = function(source, noCancel){
	var self = this;
	if (this.loginID && this.loginHash){
		this.hashLogin(function(status){
			if(status == 'success'){
				if(source) source();
			}else{
				self.showLogin(source, noCancel);
			}
		});
	}else{
		this.showLogin(source, noCancel);
	}
}

/**
 * Show the login dialog
 * @param {function} source function to be executed on successful login
 * @param {boolean} noCancel whether to hide cancel button in the login popup
 * @function
 * @returns {boolean} returns a false value to suppress default behavior when used in a js event
 */
MobileService.prototype.showLogin = function(source, noCancel){

	UI.inLogin = !noCancel; // for backbutton handling
	
	this.previousNode = UI.getCurrentPage().node || $('#dashBoard');
	this.previousNode.hide();
	
	$('#loginDialog input').removeAttr('disabled');
	
	if (source!=undefined){
		this.loginAction = source;
	}

	var loginb = $('#d-login-b');
	var logint = Local.trUcf('Log in');
	loginb.attr('title', logint);
	loginb.attr('alt', logint);
	loginb.val(logint);
	
	var cancelb = $('#loginDialogCancel');
	var cancelt = Local.trUcf('Cancel');
	cancelb.attr('title', cancelt);
	cancelb.attr('alt', cancelt);
	cancelb.val(cancelt);
	
	$('#d-login-b').css('width',noCancel?'100%':'45%');
	$('#d-login-b').css('margin-left',noCancel?'0':'9%');
	$('#loginDialogCancel').css('display', noCancel?'none':'block');
	
	var dialog =$('#loginDialog'); 
	dialog.css('display','block');
	setTimeout(function(){
		dialog.css('opacity',1);	
	});
	
	setTimeout(function(){
		scroll(0,0);
	},500);
	
	return false;
}

/**
 * Hide the login form and display whatever was hidden by
 */
MobileService.prototype.hideLogin = function(){
	var dialog = $('#loginDialog'); 
	dialog.css('opacity',0);
	
	setTimeout(function(){
		dialog.css('display','none');
	},500);
	
	this.previousNode = UI.getCurrentPage().node || $('#dashBoard');
    this.previousNode.show();
	UI.inLogin = false;
}

/**
 * Log out
 * @function
 * @returns {boolean} always returns a false value to suppress default behavior when used in a js event
 */
MobileService.prototype.logout=function(){
	var self = this;
	this.call(Search.getAbsUrl('services/login_json.php?action=logout'),{}, function(){
		  self.clearRememberData();
		  self.isLoggedin = false;
		  self.updateUI();
		  Favs.list = {};
		  $('#login-username-field').val('');
 		  $('#login-password-field').val('');
 		  self.showLogin(function(){}, true);
	});
	return false;
}

/**
 * Refresh a captcha challenge 
 * @param {function} ready the callback function to execute on success 
 */
MobileService.prototype.getCaptcha = function(ready){
	this.call(
		Search.getAbsUrl('services/login_json.php?action=reload_captcha'),
		{},
		function(data){if (ready) ready(data);}, 
		true
	);
}

/**
 * Handle a connection error
 * This function acts as an unified connection error callback used across all the mobile services.
 * @function
 * @returns {void}
 */

MobileService.prototype.connectionError=function(jqxhr, textstatus, errorThrown){
	if (textstatus =='parsererror'){
		console.log('failed to parse server response');
		console.log(':::::::DUMPING RESPONSE:::::: ');
		console.log(jqxhr.responseText);
		console.log(':::::::END RESPONSE DUMP:::::  ');
		UI.alert(Local.trUcf('Connection Error')+": "+Local.trUcf("Could not parse server's response")+"!");
	}else{
		console.log('failed to fetch url due to '+textstatus);
		UI.alert(Local.trUcf('Connection Error')+": "+Local.trUcf("Failed to retrieve data ("+textstatus+'): '+errorThrown)+"!");	
	}
	UI.ticker('reset');
}


/**
 * Internationalization class.
 * 
 * @class
 */
function i18n(locale) {
	//this.loadLocale(locale);
}

i18n.prototype.locale = '';
i18n.prototype.lang = '';
i18n.prototype._tr = [];

i18n.prototype.locale_lang_dictionary = {en:'eng',et:'est',ru:'rus',fi:'fin',lt:'lat',lv:'lit'}


i18n.prototype.locale_to_lang = function(lang){
	return this.locale_lang_dictionary[lang];
}

/**
 * Translates a single string by searching in dicitonary array
 */
i18n.prototype.tr = function (text) {
	var keytext = trim(text);
	
	var key = keytext.toLowerCase();
	
	if (!this._tr[key]) {
		return text;
	}else{
		var translation = this._tr[key];
		
		if(translation == "") return text;
		
		var text_caps = text.toUpperCase();
		var text_ucf =text.substr(0,1).toUpperCase()+text.substr(1);  
		
		if(text == text_caps)
			return translation.toUpperCase();
		else if(text_ucf == text)
			return translation.substr(0,1).toUpperCase()+translation.substr(1);
		else
			return translation;
	}
	return this._tr[key];
}

i18n.prototype.trUcf = function (text) {
	return ucf(this.tr(text));
}

i18n.prototype.dictionary = {};

/**
 * Saves/loads the builtin locale array to local storage
 * 
 * @function
 * @param locale
 *            locale string code (et, en, fi, ru...)
 */
i18n.prototype.loadLocale = function (locale) {
	try{
		localStorage.setItem('m.auto24.ee.app.locale', locale);
	}catch(e){}

	this.locale = locale;
	this._tr = [];
	this.lang = this.locale.substr(0,2);
	
	this._tr = this.dictionary[this.lang];
}

i18n.prototype.bootstrap = function(){
	return  i18n_bootstrap;
}


/**
 * Translate the entire dom tree by searching for data-i18ntxt attribute in
 * given nodes
 * 
 * @function
 * @param {DOMNode}
 *            [node] the root element of the tree to be translated; document
 *            body if omitted
 * @param {function} [callback] optional function to be executed after translation of passed nodes is complete
 */

i18n.prototype.localize = function (node, callback) {
	if (!node) {
		var node = document.getElementsByTagName('body').item(0);
	}
	var text_nodes = get_text_nodes(node);
	var isDigits = /^\d+$/;
	for (var i=0; i<text_nodes.length; i++) {
		var text_node = text_nodes[i];
		var parent_node = text_node.parentNode;		
		if (!parent_node.getAttribute('data-i18ntxt')) {
			var v = trim(text_node.nodeValue);
			if(!isDigits.test(v)){
				parent_node.setAttribute('data-i18ntxt', trim(text_node.nodeValue));
				text_node.nodeValue = this.tr(parent_node.getAttribute('data-i18ntxt'));
			}
		}else{
			text_node.nodeValue = this.tr(parent_node.getAttribute('data-i18ntxt'));	
		}
	}
	if(callback){callback()};
}

/**
 * Returns the default locale
 */
function get_default_locale () {
	var matches = location.search.match(/(\?|&)locale=([\w]{2})(&|$)/i);

	var selected_locale = false;

	if (matches && matches[2]) {
		selected_locale = matches[2];
	}
	else {
		try{
			selected_locale = localStorage.getItem('m.auto24.ee.app.locale');
		}catch(e){}
	}

	return selected_locale ? selected_locale : 'et';
}

/**
 * Retrieves all text-containing dom nodes for further translation
 * 
 * @param {DOMNode}
 *            node
 * @param {Boolean}
 *            includeWHitespaceNodes
 * @function
 */
function get_text_nodes(node, includeWhitespaceNodes) {
    var textNodes = [], whitespace = /^\s*$/;

    function getTextNodes(node) {
        if (node.nodeType == 3) {
            if (includeWhitespaceNodes || !whitespace.test(node.nodeValue)) {
                textNodes.push(node);
            }
        } else {
            for (var i = 0, len = node.childNodes.length; i < len; ++i) {
                getTextNodes(node.childNodes[i]);
            }
        }
    }

    getTextNodes(node);
    return textNodes;
}

/**
 * Exterminates whitespace
 * 
 * @function
 */
function trim(s) { 
	return s?
			s.replace(/^\s\s*/, '')
			.replace(/\s\s*$/, '')
			:'undefined'; 
}

/**
 * Upper Case First letter in the given string
 * 
 * @function
 */
function ucf(s) { return s?s.substr(0,1).toUpperCase() + s.substr(1):'undefined'; }

function UIPageModule(){
	if (!(this instanceof arguments.callee)) throw new Error("Constructor called as a function");
}

/**
 * Show this page and execute the onshow callback if set.
 * 
 * @returns {null}
 * @function
 * @public
 */
UIPageModule.prototype.show = function() {

	this.node.addClass('active');

	console.log(this.name + '.onshow');

	UI.ticker('show');

	var that = this;

	$('#loginDialog').hide();
	$('#mask').hide();

	var display = function() {
		that.active = true;

		if (UI.isIOS6 || UI.isIOS7) {
			that.node.css('transform', 'scale3d(1,1,1)');
		}

		that.node.show();

		if (UI.popups[that.name]) {
			$('#popupAd').empty();
			Ads.loadAd($('#popupAd'), function(adContainer) {
				if($('#popupAd').html().length > 0){
					var closeButton = $("<div class='popupAdClose'/>");
					closeButton.click(function(){
						Ads.hidePopup();
					});
					
					$('#popupAd').append(closeButton);
					
					setTimeout(function() {
						Ads.showPopup(UI.popups[that.name].hide);
					}, UI.popups[that.name].show);
				}
				
			}, "APP_POPUP");
		}

		UI.ticker('hide');
	}

	var waitForImages = function() {

		var incomplete = true;
		var images = that.node.find('img');

		var imageCount = images.size();

		var imageCallback = function() {
			var count = 0;

			if (incomplete) {
				images.each(function() {
					if (this.width > 0 || $(this).attr('aborted')) {
						count++;
					}
				});

				if (count >= imageCount) {
					incomplete = false;
					clearTimeout(waitTimeout);
					display();
				}
			}
		}

		var waitTimeout;

		var timeoutCallback = function() {
			if (incomplete) {
				incomplete = false;
				display();
			}
		}

		var imageAbort = function() {
			$(this).attr('aborted', true);
			imageCallback();
		}

		if (imageCount > 0) {
			images.on('load', imageCallback);
			images.on('error', imageAbort);
			images.on('abort', imageAbort);
			imageCallback(); // maybe they got loaded while we were
								// registering callback, huh?
			waitTimeout = setTimeout(timeoutCallback, 5000);
		} else {
			display();
		}
	}

	if (this.onshow) {
		this.onshow(waitForImages, display);
	} else {
		display();
	}
}

/**
 * Hide this page and execute the onhide callback if set.
 * 
 * @param {UIPage}
 *            [nextpage] the page that will be shown after this page is hidden
 * @returns {void}
 * @function
 * @public
 */
UIPageModule.prototype.hide = function(nextpage) {
	if (this.active) {
		this.active = false;

		this.node.removeClass('active');

		if (UI.isIOS6 || UI.isIOS7) {
			this.node.css('transform', 'scale3d(0,0,0)')
		} else {
			this.node.hide();
		}

		if (this.onhide) {
			this.onhide(nextpage);
		}
	}
}

/**
 * Load the page. If the onload callback is provided, it is then responsible for
 * calling show(), else load callback is not fired and show is.
 * 
 * @param {mixed}
 *            passthrough any data to be passed to page load handler
 * @returns {null}
 * @function
 * @public
 */
UIPageModule.prototype.load = function(passthrough, fragment) {
	console.log(this.name + '.onload');
	if (this.onload) {
		this.onload(passthrough, fragment);
	} else {
		this.show();
	}
}


UIPageModule.prototype.initialize = function(){
	if(this.node) this.node.hide();
}

UIPageModule.prototype.active = false;

UIPageModule.prototype.onhide = function(){};
UIPageModule.prototype.onshow = function(){};
UIPageModule.prototype.onresize = function(){};
UIPageModule.prototype.onback = function(){};
UIPageModule.prototype.onlocalize = function(){};
UIPageModule.prototype.onorientationchange = function(newWidth){};

function DetailPage(options){
	if (!(this instanceof arguments.callee)) throw new Error("Constructor called as a function");
	$.extend(this, options);
	this.section.addPage(this);
};

DetailPage.prototype = new UIPageModule();

DetailPage.prototype.reload = false;
DetailPage.prototype.skipReload = false;

DetailPage.prototype.load = function(id, frag) {
	var that = this;
	if (this.skipReload) {
		this.section.showPage(this.name);
	} else {
		this.render(id, function() {
			that.section.showPage(that.name);
		});
	}
	this.skipReload = false;
}

DetailPage.prototype.onhide = function() {
	this.skipReload = false;
	$('#favStar').hide();
}

DetailPage.prototype.onshow = function(callback) {
	var that = this;
	var node = this.node;

	if (this.slider) {
		this.slider.show(0);
	}
	$('#favStar').show();
	UI.changeTitle('Details');
	if (callback) {
		callback();
	}
	
	setTimeout(function() {
		UI.setScrollPosition(node, 0);
	}, 10);
}

DetailPage.prototype.initialize = function(){
	this.node.hide();
}

DetailPage.prototype.onlocalize = function(){
	this.reload = true;
}

/**
 * Fetches detail data on a given ad, displays it on detail page, and switches
 * to that page.
 * 
 * @param {int}
 *            id advertisement id to be shown
 * @param {function}
 *            [callback] a function to execute once query has returned and all
 *            elements have been placed onto the page
 * @function
 * @returns {void}
 */
DetailPage.prototype.render = function(id, callback) {
	UI.ticker('show');
	var L = new WebSearch;
	var event = UI.isTouchy ? 'touchstart' : 'click';
	var page = this;

	if (page.gallery) {
		// detach old gallery so we can instantiate it anew
		window.Code.PhotoSwipe.detatch(page.gallery);
		page.gallery = null;
	}

	if (page.slider) {
		// detach old gallery so we can instantiate it anew
		window.Code.PhotoSwipe.detatch(page.slider);
		page.slider = null;
	}

	var node = page.node;
	node.empty();

	var frag = $(document.createDocumentFragment());
	var wrap = $(document.createElement('div'));
	
	frag.append(wrap);
	wrap.addClass('scrollFrame');

	L.load('services/data_json.php?dbt=3&pretty-eq=1&ad='+id+'&locale='+Local.locale+'&clean=1',
		function(data) {
			if (data.length == 0) {
				UI.alert('Ad no longer exists');
				UI.back();
				return;
			}

			var auction = "";
			if (data.auction)
				auction = "<span class='auction'>"
						+ Local.tr('auction') + "</span>";

			if (data.hidden)
				auction += "<span class='ad_hidden'>" + data.hidden
						+ "</span>";

			wrap.append('<div class="title">' + data.title
					+ auction + '</div>');

			var savedText = $('#favStar');

			function unfav() {
				if (UI.showingMenu) {
					UI.menuButton(false);
					Favs.deleteFav(id, function() {
						savedText.children('.text').html(Local.tr('SAVE VEHICLE'));
						savedText.children('img').attr('src','gfx/menu_favorite_add.png');
						savedText.unbind(event);
						savedText.bind(event, fav);
					});
				}
				return false;
			}

			function fav() {
				if (UI.showingMenu) {
					UI.menuButton(false);
					Favs.saveFav(id, function() {
						savedText.children('.text').html(Local.tr('DELETE SAVED VEHICLE'));
						savedText.children('img').attr('src','gfx/menu_favorite_remove.png');
						savedText.unbind(event);
						savedText.bind(event, unfav);
					});
				}
				return false;
			}

			if (data.faved) {
				savedText.children('.text').html(
						Local.tr('DELETE SAVED VEHICLE'));
				savedText.children('img').attr('src',
						'gfx/menu_favorite_remove.png');
				savedText.unbind(event);
				savedText.bind(event, unfav);
			} else {
				savedText.children('.text').html(
						Local.tr('SAVE VEHICLE'));
				savedText.children('img').attr('src',
						'gfx/menu_favorite_add.png');
				savedText.unbind(event);
				savedText.bind(event, fav);
			}

			var useTouchscrollNow = false;

			if (data.images) {
				if (data.images.length > 0) {
					var container = this.container = document.createElement('div');
					container.setAttribute('class', 'images');
					wrap.append(container);

					var aspect = 1;

					if (data.images[0].bigview_size) {
						aspect = data.images[0].bigview_size[1]
								/ data.images[0].bigview_size[0];
					} else if (data.images[0].preview_size) {
						aspect = data.images[0].preview_size[1]
								/ data.images[0].preview_size[0];
					}

					var smallerAxis = Math.min(window.innerWidth,
							window.innerHeight);

					container.style.height = smallerAxis * aspect
							+ 'px';

					for (index in data.images) {
						data.images[index].index = index;
					}

					var ps = window.Code.PhotoSwipe;

					var sliderOptions = {
						target : container,
						preventHide : true,
						captionAndToolbarHide : true,
						preventDefaultTouchEvents : true,
						allowVerticalScroll : true,
						gesture : UI.isIOS7,
						enableKeyboard : UI.webMode,
						backButtonHideEnabled : false,
						getImageSource : function(obj) {
							return obj.bigview || obj.preview;
						},
						getImageCaption : function(obj) {
							return null;
						},
					};

					var galleryOptions = {
						backButtonHideEnabled : false,
						getImageSource : function(obj) {
							return obj.bigview || obj.preview;
						},
						getImageCaption : function(obj) {
							return null;
						}
					}

					page.slider = ps.attach(data.images,sliderOptions);
					page.gallery = ps.attach(data.images,galleryOptions);

					page.slider.addEventHandler(
						ps.EventTypes.onTouch,
						function(e) {
							if (e.action == 'tap') {
								page.gallery
										.show(page.slider.currentIndex);
							}
						}
					);

					var counter = $('<div class="img-count" />');
					var length = data.images.length;

					for (i = 0; i < length; i++) {
						var thingy = document.createElement('div');
						var css = 'imgControlDot';
						thingy.setAttribute('class', css);
						counter.append(thingy);
					}
					counter.css('marginLeft', -1.25*length/2+'em');

					var appendDots = function() {
						if (!page.slider || !page.slider.carousel) {
							console.groupEnd();
							setTimeout(appendDots, 100);
							return;
						}
						$(page.slider.carousel.el).append(counter);
						counter.css('display', 'block').find('*')
								.css('display', 'block');
					}

					appendDots();

					page.slider.addEventHandler(
						ps.EventTypes.onDisplayImage, function(
								e) {
							counter.children('.currentDot')
									.removeClass('currentDot');
							counter.children().eq(e.index)
									.addClass('currentDot');
						});

					page.gallery.addEventHandler(
							ps.EventTypes.onBeforeShow,
							function(e) {
								UI.inGallery = true;
								$('#header').hide();
							});

					page.gallery.addEventHandler(
							ps.EventTypes.onBeforeHide,
							function(e) {
								UI.inGallery = false;
								$('#header').show();
							});

					page.gallery
							.addEventHandler(
									ps.EventTypes.onHide,
									function(e) {
										page.slider.carousel
												.show(page.gallery.currentIndex);
										page.slider
												.resetPosition(true);
									});

				} else {
					useTouchscrollNow = true;
				}
			} else {
				useTouchscrollNow = true;
			}

			if (data.maindata) {
				var datatable = document.createElement('div');
				datatable.setAttribute('class', 'main-data');
				for ( var i = 0; i < data.maindata.length; i++) {
					var maindata = data.maindata[i]

					var this_label = maindata[0];
					var this_value = maindata[1];
					var this_field = maindata[2];

					var datarow = document.createElement('div');
					datarow.setAttribute('class', 'item field-'
							+ this_field);

					if (!!maindata['protected']) {
						(function() { // closuring in case of
							// multiple protected
							// entries

							var ikey = maindata.key;
							var action = maindata.action;
							var jDataRow = $(datarow);

							var labelcell = $('<div class="label td">'
									+ this_label + '</div>');
							var valuecell = $('<div class="value td"></div>');

							var valueWrapper = $('<div style="display:table;width:100%"/>');
							valuecell.append(valueWrapper);

							var valuePreview = $('<div style="display:block"/>');
							valuePreview.html(maindata.value);
							valueWrapper.append(valuePreview);

							var requestButton = $('<button style="display:block;margin-left:0">'
									+ maindata.title + "</button>");
							valueWrapper.append(requestButton);

							(function() { // closuring in case of
								// multiple protected
								// entries
								requestButton.click(function() {
									Login.call(
										Search.getAbsUrl('services/data_json.php?q='
											+ action
											+ '&k='
											+ ikey
											+ '&clean=1'),
										{},
										function(r) {
											var response = r.q.response;
											if (response['protected']) {

												valuecell.empty();

												var infodiv = $("<div />");
												infodiv.append(Local.tr('Enter the security code:'));
												infodiv.append($("<br />"));
												valuecell.append(infodiv);

												var captchaInput = $('<input type="text" class="input-text input-checksec" name="checksec" autocomplete="off" maxlength="4" style="width: 4em;float: left;margin-top: 0.2em;"/>');
												valuecell.append(captchaInput);

												var captchaImg = $('<img style="float:none;display:inline-block;margin-top:0.5em;margin-left:0.5em" src="'
														+ Search.getRoot('/export/secimg.php?c='															+ response.captcha)
														+ '" class="captchaImg" />');
												valuecell.append(captchaImg);

												var captchaSubmit = $('<input data-key="'
														+ response.key
														+ '" type="submit" name="send" value="'
														+ response.title
														+ '" class="c-sbm" style="height: 1.75em;margin-top: 0.3em;margin-left: 0em;clear:both;float:left;"/>');
												valuecell.append(captchaSubmit);

												var captchaAction = response.action;
												(function() {
													captchaSubmit.click(function(e) {
														e.preventDefault();
														var k2 = {
															checksec : captchaInput.val(),
															ikey : $(this).attr('data-key'),
														};

														Login.call(
															Search.getAbsUrl('services/data_json.php?clean=1&q='
																+ captchaAction
																+ '&k='
																+ encodeURIComponent($.param(k2))),
															{},
															function(secResponse) {
																var response = secResponse.q.response;
																if (response.wrong) {
																	infodiv.html(
																		Local.tr('The entered security code is wrong!')+'<br/>'
																	);
																	infodiv.css('color','red');
																	captchaImg.attr('src',
																		Search.getRoot('/export/secimg.php?c='+ response.captcha));
																	captchaInput.val('');
																	captchaSubmit.attr('data-key',response.key);
																	action = response.action;
																} else {
																	captchaImg.remove();
																	valuecell.html(response.value);
																}
																UI.forceRepaint(jDataRow);
															},
															true);
														return false;
													});
												})();
											} else {
												valuecell.html(response.value);
											}

											UI.forceRepaint(jDataRow);
									});
								});
							})();

							jDataRow.append(labelcell);
							jDataRow.append(valuecell);
						})();
					} else {
						var labelcell = document
								.createElement('div');
						labelcell.appendChild(document
								.createTextNode(this_label));
						labelcell.setAttribute('class', 'label td');

						var valuecell = document
								.createElement('div');
						valuecell.setAttribute('class', 'value td');

						valuecell.innerHTML = this_value;

						if (this_field == 'labisoit'
								&& data.servicebook == 1) {
							valuecell.innerHTML += ' - '
									+ Local.tr('service book');
						}

						datarow.appendChild(labelcell);
						datarow.appendChild(valuecell);
					}

					datatable.appendChild(datarow);
				}
				wrap.append(datatable);
			}

			var infoSwitcher = page.createInfoSwitcher(data, wrap);
			
			page.preloadImages(data.images, function(){
				wrap.append(infoSwitcher);
				node.append(frag);

				if (callback){
					callback();
				} else {
					setTimeout(function() {
						UI.setScrollPosition(wrap, 0);
						if (page.slider)
							page.slider.show(0);
					}, 100);
					page.section.showPage(page.name);
				}

				delete wrap;
			});
		}
	);
	UI.ticker('hide');
}

/**
 * Ajax-preloads an array of images by creating a fragment, then fires callback
 */

DetailPage.prototype.preloadImages = function(images, callback){
	if(images.length > 0){
		var frag = document.createDocumentFragment();
		var wrap = document.createElement('div');
		frag.appendChild(wrap);
		for(i in images){
			var image = new Image();
			image.src = images[i].bigview || images[i].preview;
			wrap.appendChild(image);
		}
		UI.waitForImages(frag,callback);
	}else{
		if(callback) callback();
	}
}

/**
 * Create a tabulated vehicle data section
 * 
 * @param {Object}
 *            data
 * @param {JQuery}
 *            element to refresh scroll on after tab change
 * @returns {DomNode} tabs element
 */
DetailPage.prototype.createInfoSwitcher = function(data, element) {
	var tabs = document.createElement('div');
	tabs.setAttribute('class', 'tabs');

	var writeHash =  this.writeHash + (UI.hashnum + 1) + '/' + data.id;

	var InfoTabs = new UIDataSwitcher(tabs, function() {
		setTimeout(function() {
			if (UI.isApple) {
				var selected = $(InfoTabs.container).find('.tab-content-fg');
				var minheight = selected.height();
				InfoTabs.container.style.minHeight = minheight;
			}
		}, 10);
	});

	var this_link = '';

	if (data.url) {
		this_link = '<a href="'
				+ Local.tr('http://www.auto24.ee/')
				+ data.id
				+ '" target="_system" rel="alternate" onclick="window.open(this.getAttribute(\'href\'),\'_system\');return false;">'
				+ Local.tr('http://www.auto24.ee/') + data.id + '</a>';
	}

	if (data.equipment) {
		data.equipment += this_link;
		InfoTabs.addTab("equipment", data.equipment);
	}

	if (data.description) {
		data.description += this_link;
		var otherInfo = InfoTabs.addTab("other-information",
				"<p class='description'>" + data.description + "</p>");
		var $content = $(otherInfo.content);

		$content.find('tr.item').each(function() {
			$(this).replaceWith('<li>' + this.innerHTML + '</li>');
		});

		$content.find('table.group').each(function() {
			$(this).replaceWith('<ul>' + this.innerHTML + '</ul>');
		});
	}

	if (data.contactdata) {
		var content = "";

		if (data.location) {
			content += '<div class="contactLine">' + data.location + '</div>';
		}

		if (data.contactdata.dealer) {
			content += '<div class="contactLine">' + data.contactdata.dealer
					+ '</div>';
		}

		if (data.contactdata.name) {
			content += '<div class="contactLine">' + data.contactdata.name
					+ '</div>';
		}

		if (data.contactdata.address) {
			content += '<div class="contactLine">' + data.contactdata.address
					+ '</div>';
		}

		var initProtected = false;
		var ikey = "";
		if (data.contactdata.phone) {
			var tel = data.contactdata.wtai_mc[0];

			if (tel.protected) {
				initProtected = true;
				ikey = tel.key;

				content += '<div class="telnr_container"><a class="wtai_mc" href="javascript:">'
						+ tel.content
						+ '</a>'
						+ '<button class="odwpm_request_button" style="display:inline-block;margin: 0 0 0 1em;" class="submit">'
						+ Local.tr('show telephone') + '</button></div>';
			} else {

				for (t in data.contactdata.wtai_mc) {
					content += "<div>"
							+ UI.formatTelephone(data.contactdata.wtai_mc[t])
							+ "</div>";
				}
			}
		}

		content += "<div class='askInfo' onclick=\"UI.hashLink('" + writeHash
				+ "')\" value='" + Local.tr('Ask extra info') + "'>"
				+ Local.tr('Ask extra info') + "</div>";

		content += this_link;

		var contactTab = InfoTabs.addTab("contact-information", content);

		//TODO: this seems copypasted. It seems to need to die.
		if (initProtected) {
			(function() {
				var valuecell = $(contactTab.content).find('.telnr_container');
				var requestButton = valuecell.children('.odwpm_request_button');
				requestButton.click(function() {
					Login.call(
						Search.getAbsUrl('services/data_json.php?q=uv_telnr&k='
							+ ikey + '&clean=1'),
						{},
						function(r) {
							var response = r.q.response;
							if (response['protected']) {
								valuecell.empty();

								var infodiv = $("<div />");
								infodiv.append(Local.tr('Enter the security code:'));
								infodiv.append($("<br />"));
								valuecell.append(infodiv);

								var captchaInput = $('<input type="text" class="input-text input-checksec" name="checksec" autocomplete="off" maxlength="4" style="width: 4em;float: left;margin-top: 0.2em;"/>');
								valuecell.append(captchaInput);

								var captchaImg = $('<img src="'
									+ Search.getRoot('/export/secimg.php?c='
									+ response.captcha)
									+ '" class="captchaImg phoneCaptchaImg" />'
								);
								valuecell.append(captchaImg);

								var captchaSubmit = $('<input data-key="'
									+ response.key
									+ '" type="submit" name="send" value="'
									+ response.title
									+ '" class="c-sbm phoneCaptchaSubmit"/>');
								
								valuecell.append(captchaSubmit);

								var captchaAction = response.action;
								(function() {
									captchaSubmit.click(function(e) {
										e.preventDefault();
										var k2 = {
											checksec : captchaInput	.val(),
											ikey : $(this).attr('data-key'),
										};

										Login.call(
											Search.getAbsUrl('services/data_json.php?clean=1&q='
												+ captchaAction
												+ '&k='
												+ encodeURIComponent($.param(k2))),
											{},
											function(secResponse) {
												var response = secResponse.q.response;
												if (response.wrong) {
													infodiv
															.html(Local
																	.tr('The entered security code is wrong!')
																	+ '<br/>');
													infodiv
															.css(
																	'color',
																	'red');
													captchaImg
															.attr(
																	'src',
																	Search
																			.getRoot('/export/secimg.php?c='
																					+ response.captcha));
													captchaInput
															.val('');

													captchaSubmit
															.attr(
																	'data-key',
																	response.key);

													action = response.action;
												} else {
													captchaImg
															.remove();
													UI
															.formatTelephone(
																	response.value,
																	valuecell);
												}
												UI
														.forceRepaint(valuecell
																.parent());
											},
											true
										);
										return false;
									});
								})();
							} else {
								UI.formatTelephone(response.value,valuecell);
							}

							UI.forceRepaint($(contactTab.content));
						}
					);
				});
			})();
		}
	}

	InfoTabs.showFirst();

	return InfoTabs.container;
}


function AbstractMailPage(){
	if (!(this instanceof arguments.callee)) throw new Error("Constructor called as a function");
};

AbstractMailPage.prototype = new UIPageModule();

/**
 * Generate a message form and render to provided node
 * 
 * @param {object} data containing variables for the form, such as sender, recipient, tags, and subject.
 * @param {JQuery} node containing the JQ node(s) to receive the rendered form
 * @param {function} onsubmit form submission callback
 * @param {boolean] useCaptcha whether to show/use captcha field
 */
AbstractMailPage.prototype.renderForm = function(data, onsubmit, useCaptcha){
		var jResultContainer = this.node.find('.results');
		if (jResultContainer.length==0) {
			var wrap = document.createElement('div');
			wrap.setAttribute('class', 'results scrollFrame');
			this.node.append(wrap);
		}
		else {
			var wrap = jResultContainer.get(0);
		}
		var datatable = document.createElement('div');
		datatable.setAttribute('class', 'main-data');
		
		this.renderDetailDataRow(Local.tr("mailFrom"),data.author, datatable);
		this.renderDetailDataRow(Local.tr("mailTo"),data.recipient, datatable);
		wrap.appendChild(datatable);
		
		var event = UI.isTouchy?"touchstart":"click";
		
		var title = document.createElement('div');
		title.setAttribute('class', 'title');
		title.innerHTML = data.subject+data.tag;
		wrap.appendChild(title);
		
		var contentContainer = document.createElement('div');
		contentContainer.setAttribute('class', 'contentContainer');
		
		if(!!useCaptcha){
			
			var captchaContainer = document.createElement('div');
			captchaContainer.setAttribute('class', 'captchaContainer');
			
			var captchaLabel = document.createElement('p');
			captchaLabel.setAttribute('class', 'label');
			captchaLabel.innerHTML = Local.tr('Enter the security code:');
			
			var captchaImg = document.createElement('img');
			captchaImg.setAttribute('class', 'captchaImg');
			captchaImg.setAttribute('src', Search.getRoot(data.captcha));
			
			var captchaInput = document.createElement('input');
			captchaInput.setAttribute('class','captchaInput');
			captchaInput.setAttribute('class','comment-input');
			
			var captchaReload = document.createElement('div');
			captchaReload.setAttribute('class', 'captchaReload');

			captchaContainer.appendChild(captchaInput);
			captchaContainer.appendChild(captchaImg);
			captchaContainer.appendChild(captchaReload);
			
			captchaReload.onclick = function(){
				UI.clicked(this);
				Login.getCaptcha(function(data){
					$(captchaImg).attr('src', Search.getRoot(data.captcha));
					$(captchaInput).val('');
				});
			}
	
			contentContainer.appendChild(captchaLabel);
			contentContainer.appendChild(captchaContainer);
		}
		
		var label = document.createElement('p');
		label.innerHTML = Local.tr('Message Content:');
		label.setAttribute('class','label');
		contentContainer.appendChild(label);
		
		var content = document.createElement('textarea');
		content.setAttribute('class', 'content');
		content.setAttribute('maxlength',data.length);
		contentContainer.appendChild(content);
		
		var stamp = new Date().getTime();
		var counterId = 'notice-charcount-'+stamp;
		
    	$(label).append('<div class="charcount" id="'+counterId+'"></div>');
		
		var submit = document.createElement('input');
		submit.setAttribute('type','submit');
		submit.setAttribute('value', Local.tr('Send Message'));
		submit.setAttribute('class', 'input-submit');
		
		$(submit).bind(event, function(){onsubmit(content.value, !!useCaptcha?captchaInput.value:undefined)});
		
		var submitContainer = document.createElement('div');
		submitContainer.setAttribute('class', 'submitContainer');
		submitContainer.appendChild(submit);
		
		wrap.appendChild(contentContainer);
		
		wrap.appendChild(submitContainer);
		
		setTimeout(function(){
	        $(content).charslimit({
	            counter_id: counterId,
	            counter_after: "/"+data.length,
	            counter_used:true
	        });
	        
			if(UI.isApple && !UI.isIOS5){
				$(content).bind('touchstart',function(){
					$(this).focus();
				});
			}
			$(wrap).find('button,input[type=button],input[type=submit]').on("click",function(){
				UI.clicked(this);
			});

		},0);
}

/**
 * Render a single row for basic data fields in message detail/write view
 */
AbstractMailPage.prototype.renderDetailDataRow=function(title, value, container){
	var this_label = title;
	var this_value = value;
	var this_field = value;

	var datarow = document.createElement('div');
	datarow.setAttribute('class', 'item');

	var labelcell = document.createElement('div');
	labelcell.appendChild(document
			.createTextNode(this_label));
	labelcell.setAttribute('class', 'label td');

	var valuecell = document.createElement('div');
	valuecell.setAttribute('class', 'value td');
	valuecell.innerHTML = this_value;

	datarow.appendChild(labelcell);
	datarow.appendChild(valuecell);
	container.appendChild(datarow);	
}
/**
 * Processes a message submission response, shows error/success messages, executes CB
 * @param {object} data
 * @param {function} callback
 */
AbstractMailPage.prototype.handleSendResponse = function(data, callback){
	if (data.notices.error.length == 0){
		UI.alert(data.notices.success[0]);
		if(callback) callback(data);
	}else{
		var error = data.notices.error[0];
		
		if (error == 'wrong_captcha'){
			UI.alert('The entered security code is wrong!');
		}else if (error == 'no_captcha'){
			UI.alert('You must enter a security code!');
		}else if (error == 'blocked'){
			UI.alert('Your comment was blocked on suspicion of spam');
		}else if (error == 'invalid'){
			UI.alert('You did not fill a required field!');
		}else{
			UI.alert(data.notices.error[0]);
		}
	}
}


function MailQuestionPage(options){
	if (!(this instanceof arguments.callee)) throw new Error("Constructor called as a function");
	$.extend(this, options);
	this.isShop = false;
	this.section.addPage(this);
};

MailQuestionPage.prototype = new AbstractMailPage();

MailQuestionPage.prototype.onload = function(id){
	this.questionForm(id, function() {
		UI.back();
	});
}

MailQuestionPage.prototype.onshow = function(callback){
	UI.changeTitle('Compose Message');
	UI.setScrollPosition(this.node.find('.results'), 0);
	if (callback) {
		callback();
	}
}

/**
 * TODO: probably goes into subclass
 * Sends a question message about a single vehicle
 * @param {int} id of the databse object to ask about
 * @param {string} message body
 * @param {function} callback executed on successful submission of message
 * @param {string} captcha 
 * @param {string} email used if writing to a dealer entity 
 * @param {string} phone
 * @param {string} subject text 
 */
MailQuestionPage.prototype.sendQuestion = function(id, message, callback, captcha, email, phone, subject){
	var self = this;
	Login.authCall(Search.getAbsUrl('services/mail_json.php?action=write&locale='+Local.locale),{
		id:id, 
		msg:message, 
		email:email, 
		phone:phone, 
		subject:subject, 
		captcha:captcha
	}, function(data){self.handleSendResponse(data,callback)}, true);
}

MailQuestionPage.prototype.questionForm = function(id, callback){
	var self = this;
	var node = this.node;
	function onready(data){
		if(data.dealer>1 && data.has_email==0){
			UI.alert('No email specified by the seller!');
			callback();
		}
		else{
			node.empty();
			self.renderForm(data, function(text, captcha){
				if (self.isShop){
					var email = node.find('.mailEmail').val();
					var phone = node.find('.mailPhone').val();
					var subject = node.find('.mailSubject').val();
					self.sendQuestion(id, text, callback, captcha, email, phone, subject);
				}else{
					self.sendQuestion(id, text, callback, captcha);
				}
			}, true);
			self.isShop = (data.dealer>1);
			if(self.isShop){
				var extraFields = '<input type=hidden class="mailSubject" value="'+data.subject+'"/><p class="label">'+Local.tr('Email')+'</p><input type="email" class="mailEmail" value="'+data.email+'"/><p class="label">'+Local.tr('Telephone')+'</p><input type="tel" class="mailPhone"/>';
			}
			self.node.find('.contentContainer').prepend(extraFields);
			
			if(UI.isApple && !UI.isIOS5){
				self.node.find('.contentContainer input').bind("touchstart",
					function(){
						$(this).focus();
					}
				);
			}
			self.section.showPage(self.name);
		}
	}
	id = parseInt(id);
	Login.authCall(Search.getAbsUrl('services/mail_json.php?action=compose&id='+id+'&locale='+Local.locale),{}, onready, true);	
}



function SearchFormPage(section){
	if (!(this instanceof arguments.callee)) throw new Error("Constructor called as a function");
	this.name = 'searchForm';
	this.node = $('#searchForm');
	this.section = section;
	this.TypeSelector = document.getElementById('searchParam-type');
	this.BodytypeSelector = document.getElementById('searchParam-bodytype');
	this.counterHandler = null;
	this.depth = 0;
	
	section.addPage(this);
};

SearchFormPage.prototype = new UIPageModule();

SearchFormPage.prototype.initialize = function(UI) {
	var self = this;
	
	var $makeSelect1 = $('#searchParam-cmm-1-make');
	var $makeSelect2 = $('#searchParam-cmm-2-make');
	var $makeSelect3 = $('#searchParam-cmm-3-make');

	var $modelSelect1 = $('#searchParam-cmm-1-model_id');
	var $modelSelect2 = $('#searchParam-cmm-2-model_id');
	var $modelSelect3 = $('#searchParam-cmm-3-model_id');
	
	this.modelCombinations = [
	  {make:$makeSelect1,model:$modelSelect1,spec:$('#searchParam-cmm-1-model')},
	  {make:$makeSelect2,model:$modelSelect2,spec:$('#searchParam-cmm-2-model')},
	  {make:$makeSelect3,model:$modelSelect3,spec:$('#searchParam-cmm-3-model')}
	];

	$makeSelect2.html($makeSelect1.html());
	$makeSelect3.html($makeSelect1.html());

	$modelSelect2.html($modelSelect1.html());
	$modelSelect3.html($modelSelect1.html());

	Ms.filter(this.BodytypeSelector, Ms.filterBodytype);

	Ms.bind(this.TypeSelector, this.BodytypeSelector, Ms.changeFormBodytypes,
		function(value) {
			var val = 0;
			if (value && value !=0){
				val = value
			}
			$(self.BodytypeSelector).val(value ? value : 0);
			$(self.BodytypeSelector).screenSelect('update');
			self.updateModelSelectUI();
		}
	);

	this.constructMakeModelSelect($makeSelect1.get(0), $modelSelect1.get(0));
	this.constructMakeModelSelect($makeSelect2.get(0), $modelSelect2.get(0));
	this.constructMakeModelSelect($makeSelect3.get(0), $modelSelect3.get(0));

	$('.modelGroupClose').click(function(){
		var modelGroup = $(this).closest('.modelGroup');
		modelGroup.find('select').val(0).change();
		modelGroup.find('input[type="text"]').val("").change();
		modelGroup.hide();
		$('#addModelGroup').show();
	});
	
	$('#addModelGroup').click(function(){
		var $this = $(this);
		for (c in self.modelCombinations){
			var make = self.modelCombinations[c].make; 
			if(make.val() == 0){
				make.closest('.modelGroup').insertBefore($this);
				make.screenSelect('show');
				return;
			}
		}
	});
	
	var modelSelectsButton = $('#item-searchParam-makeModelSpecification');
	var modelSelects = $('#modelSelects');
	
	modelSelectsButton.click(function(){
		UI.inModelSelects = true;
		$('#searchForm').show();
		$('#fieldGroup').hide();
		modelSelects.show();
		UI.setScrollPosition($('#searchForm'), 0);
		if($makeSelect1.val() == 0){
			$makeSelect1.screenSelect('show');
		}	
	});
	
	$('#models-submit').click(function(e){
		e.preventDefault();
		UI.sections.search.pages.searchForm.updateModelSelectUI();
		UI.inModelSelects = false;
		modelSelects.hide();
		$('#searchForm').show();
		$('#fieldGroup').show();
		$('#advSelects').hide();
		UI.setScrollPosition($('#searchForm'), 0);

	});
	
	$('.adv-screen-select').screenSelect({
		target : '#selectScreen',
		hide : function(that) {
			UI.hideSelect();
		},
		show : function(that) {
			var selector = "label[for='" + that.attr('id') + "']";
			UI.showSelect(that.parent().parent().children(selector).text());
		}
	});
	
	$('#clearOptions').click(function() { 
		self.resetOptions();
	});

	$('.modelGroup').hide();
	

	// fill number selects with numbers!
	var mileage = $('#searchParam-mileage');
	for ( var i = 10000; i < 250000; i = i + 10000) {
		mileage.append($('<option value="' + i + '"  class="input-option">' + i
				+ '</option>'));
	}

	var price = $('#searchParam-price');
	var priceto = $('#searchParam-priceto');
	price.append($('<option value="500"  class="input-option">€ 500</option>'));
	priceto.append($('<option value="500"  class="input-option">€ 500</option>'));
	for ( var i = 1000; i < 100000; i = i + 1000) {
		price.append($('<option value="' + i + '"  class="input-option">€ ' + i
				+ '</option>'));
		priceto.append($('<option value="' + i + '"  class="input-option">€ ' + i
				+ '</option>'));
	}

	var kwmin = $('#searchParam-kwmin');
	var kwmax = $('#searchParam-kwmax');
	for ( var i = 10; i < 1000; i = i + 10) {
		kwmin.append($('<option value="' + i + '"  class="input-option">' + i
				+ " " + Local.tr('kw') + '</option>'));
		kwmax.append($('<option value="' + i + '"  class="input-option">' + i
				+ " " + Local.tr('kw') + '</option>'));
	}
	
	/*
	 * Handle form submission
	 */
	this.node.submit(function() {
		self.updateAdvText();
		$('#advSelects').hide();
		$('#fieldGroup').show();
		UI.searchResult.find('.results').empty();
		
		var params = Search.serialize(self.node);
		var searchPage = UI.sections.search.pages.searchResult;
		
		Search.loadCount(params, searchPage, function(count){
			if (count.result > 0) {
				searchPage.resultBookmark = 0;
				Search.loadResult(
					params, 
					searchPage, 
					function(){
						UI.hashLink('search/searchResult/'+ (UI.hashnum + 1) + '/');
					},0,UI.resultLimit
				);
			}
		});
		return false;
	}).change(
	function() {
		clearTimeout(self.counterHandler);
		self.counterHandler = setTimeout(function() {
			Search.load(Search.counter + '?'
					+ Search.serialize(UI.searchForm),
					self.setResultCount)
		}, 250);
	});
	
	$('#searchParam-year').screenSelect({
		target : '#selectScreen',
		hide : function(that) {
			UI.hideSelect();

		},
		show : function(that) {
			UI.showSelect(Local.tr('year') + '(' + Local.tr('from') + ')');
		}
	});

	$('#searchParam-year').bind(
			'change',
			function() {
				var $this = $(this);
				setTimeout(function() {
					if ($this.val() == 0) {
						var button = document.getElementById($this.attr('id')
								+ '-button');
						var text = Local.tr('from');
						button.setAttribute('title', text);
						button.innerHTML = text;
					}
				}, 1);
			});

	$('#year-to').screenSelect({
		target : '#selectScreen',
		hide : function(that) {
			UI.hideSelect();
			if (that.val() == 0) {
				$(that.attr('id') + '-button').html(Local.tr('to'));
			}
		},
		show : function(that) {
			UI.showSelect(Local.tr('year') + '(' + Local.tr('to') + ')');
		}
	});

	$('#year-to').bind(
			'change',
			function() {
				var $this = $(this);
				setTimeout(function() {
					if ($this.val() == 0) {
						var button = document.getElementById($this.attr('id')
								+ '-button');
						var text = Local.tr('to');
						button.setAttribute('title', text);
						button.innerHTML = text;
					}
				}, 1);
			});

	$('#searchParam-price').screenSelect({
		target : '#selectScreen',
		hide : function(that) {
			UI.hideSelect();
			if (that.val() == 0) {
				$(that.attr('id') + '-button').html(Local.tr('from'));
			}
		},
		show : function(that) {
			UI.showSelect(Local.tr('price') + '(' + Local.tr('from') + ')');
		}
	});

	$('#searchParam-price').bind(
			'change',
			function() {
				var $this = $(this);
				setTimeout(function() {
					if ($this.val() == 0) {
						var button = document.getElementById($this.attr('id')
								+ '-button');
						var text = Local.tr('from');
						button.setAttribute('title', text);
						button.innerHTML = text;
					}
				}, 1);
			});

	$('#searchParam-priceto').screenSelect({
		target : '#selectScreen',
		hide : function(that) {
			UI.hideSelect();
			if (that.val() == 0) {
				$(that.attr('id') + '-button').html(Local.tr('to'));
			}
		},
		show : function(that) {
			UI.showSelect(Local.tr('price') + '(' + Local.tr('to') + ')');
		}
	});

	$('#searchParam-priceto').bind(
			'change',
			function() {
				var $this = $(this);
				setTimeout(function() {
					if ($this.val() == 0) {
						var button = document.getElementById($this.attr('id')
								+ '-button');
						var text = Local.tr('to');
						button.setAttribute('title', text);
						button.innerHTML = text;
					}
				}, 1);
			});

	// ------------------------ //

	$('#searchParam-kwmin').screenSelect({
		target : '#selectScreen',
		hide : function(that) {
			UI.hideSelect();
			if (that.val() == 0) {
				$(that.attr('id') + '-button').html(Local.tr('from'));
			}
		},
		show : function(that) {
			UI.showSelect(Local.tr('power') + '(' + Local.tr('from') + ')');
		}
	});

	$('#searchParam-kwmin').bind(
			'change',
			function() {
				var $this = $(this);
				setTimeout(function() {
					if ($this.val() == 0) {
						var button = document.getElementById($this.attr('id')
								+ '-button');
						var text = Local.tr('from');
						button.setAttribute('title', text);
						button.innerHTML = text;
					}
				}, 1);
			});

	$('#searchParam-kwmax').screenSelect({
		target : '#selectScreen',
		hide : function(that) {
			UI.hideSelect();
			if (that.val() == 0) {
				$(that.attr('id') + '-button').html(Local.tr('to'));
			}
		},
		show : function(that) {
			UI.showSelect(Local.tr('power') + '(' + Local.tr('to') + ')');
		}
	});

	$('#searchParam-kwmax').bind(
			'change',
			function() {
				var $this = $(this);
				setTimeout(function() {
					if ($this.val() == 0) {
						var button = document.getElementById($this.attr('id')
								+ '-button');
						var text = Local.tr('to');
						button.setAttribute('title', text);
						button.innerHTML = text;
					}
				}, 1);
			});

	$('#year-to').change();
	$('#searchParam-year').change();
	$('#searchParam-priceto').change();
	$('#searchParam-price').change();
	$('#searchParam-kwmin').change();
	$('#searchParam-kwmax').change();

	$('#advSelects').hide();
	var moreOptions = document.getElementById('moreOptions');
	moreOptions.onclick = function() {
		UI.inAdvSelects = true;
		$('#searchForm').show();
		$('#fieldGroup').hide();
		$('#advSelects').show();
		UI.setScrollPosition($('#searchForm'), 0);
	}
	
	$('#okOptions').click(function() {
		UI.sections.search.pages.searchForm.node.change();
		if (UI.isHoneycomb) {
			$('#searchForm').hide();
			setTimeout(function() {
				$('#searchForm').show();
				UI.setScrollPosition($('#searchForm'), 0);
			}, 100);
		}
		$('#advSelects').hide();
		UI.sections.search.pages.searchForm.updateAdvText();
		UI.inAdvSelects = false;
		UI.setScrollPosition($('#searchForm'), 0);
	});
}

SearchFormPage.prototype.constructMakeModelSelect = function(makeSelect, modelSelect){
	var $makeSelect = $(makeSelect);
	var $modelSelect = $(modelSelect);
	
	var self = this;
	
	Ms.bind(this.TypeSelector, makeSelect, Ms.changeMakes,
		function(value) {
			if(!$makeSelect.attr('data-promised-value')){
				$makeSelect.children('option:selected').attr('selected', false);
				$makeSelect.val(value ? value : 0);
				makeSelect.selectedIndex = 0;
				$makeSelect.screenSelect('update');
				$makeSelect.closest('.modelGroup').hide();
				$makeSelect.trigger('change');
				$('#addModelGroup').show();
			}
		}
	);

	Ms.bind(makeSelect, modelSelect, Ms.changeModels,
		function(value) {
			if(!$modelSelect.attr('data-promised-value')){
				UI.ticker('hide');
				var val = makeSelect.options[makeSelect.selectedIndex].value;
				if (UI.getCurrentPage().name == 'searchForm') {
					if (val !== undefined && val != '0') {
						if($modelSelect.children().size() > 1){
							$modelSelect.screenSelect('cleanContainer');
							$modelSelect.screenSelect('show');
						}else{
							$modelSelect.val(0);
							$modelSelect.screenSelect("hide");
						}
					}else{
						$modelSelect.val(0);
					}
				} else {
					$makeSelect.val(value);
					$makeSelect.children('option[value=' + value + ']').attr('selected', 'selected');
					var make = $makeSelect.find('option:selected').text();
					var model = "";
					if($modelSelect.val() > 0){
						model = $modelSelect.find('option:selected').text()
					}
					$makeSelect.screenSelect("setText",make + ' ' + model);
				}
			}
		}
	);	
	
	$makeSelect.screenSelect({
		target : '#selectScreen',
		hide : function(that) {
			if ($makeSelect.val() != 0) {
				UI.ticker('show');
				$makeSelect.closest('.modelGroup').show();
				
				for(c in self.modelCombinations){
					var make = self.modelCombinations[c].make;
					if(make.val() == 0) return;
				}
				$('#addModelGroup').hide();
			} else {
				UI.hideSelect();
				$makeSelect.closest('.modelGroup').hide();
				$('#addModelGroup').show();
			}
		},
		show : function(that) {
			$modelSelect.screenSelect('destroyScrollBar');
			UI.showSelect('Make');
		}
	});

	var scrollOverrides = {
		"4" : [ 1, 3, 5, 6, 7, 8, 'm', 'x' ],
		"2" : [ 'a', 'c', 'q', 'r', 's', 't', 'v' ],
		"12" : [ 'a', 'b', 'c', 'e', 'g', 'm', 'r', 's', 'v' ],
	}

	$modelSelect.screenSelect({
		target : '#selectScreen',
		hide : function(that) {
			UI.hideSelect();
		},
		show : function(that) {
			UI.showSelect('Model');
			var make = $makeSelect.val()
			if (scrollOverrides[make]) {
				that.screenSelect('destroyScrollBar');
				$modelSelect.screenSelect('createCustomScrollBar',
						scrollOverrides[make], false);
			}
		}
	});
	
	$modelSelect.change(function(){
		var selectedMake = $makeSelect.children('option:selected');
		if (selectedMake.length == 0) {
			selectedMake = $makeSelect.children().first();
		}

		var selectedModel = $modelSelect.children('option:selected');
		if (selectedModel.length == 0) {
			selectedModel = $modelSelect.children().first();
		}
		if (selectedModel.val() != 0) {
			var text =  selectedMake.text() + ' ' + selectedModel.text();
			$makeSelect.screenSelect('setText',text);
		} else {
			var text = selectedMake.text()
			$makeSelect.screenSelect('setText', text);
		}
	});
}

SearchFormPage.prototype.onload = function(){
	this.section.showPage(this.name);
}

SearchFormPage.prototype.onhide = function() {
	this.node.change();
	this.updateModelSelectUI();
	this.updateAdvText();
	UI.inAdvSelects = false;
	UI.inModelSelects = false;
	$('#advSelects').hide();
	$('#modelSelects').hide();
	$('#fieldGroup').show();
}

SearchFormPage.prototype.onshow = function(callback) {
	var sr = UI.sections.search.pages.searchResult;
	UI.clearScrollPosition(sr);
	sr.reload = false;
	sr.node.empty();

	var that = this

	setTimeout(function() {
		UI.setScrollPosition(that.node, 0);
		if (callback) {
			callback();
		}
	}, 0);
	
	sr.resultStart = 0;
	$('#favStar').hide();
	UI.changeTitle(Local.tr('Search'));
}

SearchFormPage.prototype.onlocalize = function(){
	$('#searchParam-cmm-1-make').change();
	// alphabetic sort color translations
	var mylist = $('#searchParam-color');
	var listitems = mylist.children('option').slice(1).get();

	listitems.sort(function(a, b) {
		return $(a).text().toUpperCase().localeCompare(
				$(b).text().toUpperCase());
	});

	$.each(listitems, function(idx, itm) {
		mylist.append(itm);
	});

	// alphabetic sort location search
	mylist = $('#searchParam-location');
	listitems = mylist.children('option').slice(1).get();

	listitems.sort(function(a, b) {
		sa = signum(a.value);
		sb = signum(b.value);

		if (sa != sb) {
			return (sa > sb ? 1 : -1);
		}

		var ta = $(a).text().toUpperCase();
		var tb = $(b).text().toLowerCase();

		return ta.localeCompare(tb);
	});

	for (i in listitems) {
		$(listitems[i]).detach();
	}

	for (i in listitems) {
		mylist.append(listitems[i]);
	}
	
	$('#searchParam-type').change();
}
	
SearchFormPage.prototype.updateModelSelectUI = function(){
		var combinations = [];
		var $modelCombinations = $('#modelSelects').find('.modelGroup');
		
		$modelCombinations.each(function(){
			var $this = $(this);
			var makeElement = $this.find('.make-select');
			
			var combination = "";
			if(makeElement.val()>0){
				var make = makeElement.find('option:selected').text();
				var model = $this.find('.model-select');
				var spec = $this.find('.model-text').val().trim();
				
				combination += make;
				
				if(model.val()>0){
					combination += " " + model.find('option:selected').text(); 
				}
				
				if(spec.length>0){
					combination += " " + spec;
				}
				combinations.push(combination);
				$this.show();
			}else{
				$this.hide();
			}
		});
		
		var $modelsField = $('#item-searchParam-makeModelSpecification .field');
		$modelsField.empty();
		if(combinations.length>0){
			for(i in combinations){
				$modelsField.append('<div>'+combinations[i]+"</div>");
			}
		}
}

/**
 * Updates contents of advanced options button on the search form
 * 
 * @function
 * @returns {void}
 */
SearchFormPage.prototype.updateAdvText = function() {
	$('#advSelects .form-item').each(function(){
		var $this = $(this);
		if ($this.hasClass('item-select')) {
			UI.processSelectImpostor($this);
		} else if ($this.hasClass('item-checkbox')) {
			UI.processCheckboxImpostor($this);
		} else if ($this.hasClass('item-text-text')
				|| $this.hasClass('item-text')) {
			UI.processTextImpostor($this);
		}
	});
	$('#fieldGroup').show();
}
	
SearchFormPage.prototype.resetOptions = function(){
	this.setOptions({});
}

SearchFormPage.prototype.setResultCount = function(data) {
	UI.resultCount = data.result;
	$('#searchFormSubmit').text(
			Local.trUcf('See %n results').replace('%n', UI.resultCount));
}
	
SearchFormPage.prototype.setOptions = function(params){
	UI.ticker('show');
	var elements = this.node.find('[name]');
	var page = this;
	
	elements.each(function(){
		var $this = $(this);
		var type = $this.prop('tagName');
		var name = $this.attr('name');

		if( type == "INPUT"){
			if($this.attr('type') == 'checkbox'){
				$this.prop('checked', !!params[name]);
			}else{
				$this.val(params[name]?params[name]:"");
			}
			$this.change();
		}else if(type == "SELECT"){
			var value = 0;
			var defaultValue = $this.attr('data-default'); 
			if(defaultValue){value = defaultValue};
			if(params[name]){value = params[name]};
			
			if($this.hasClass('child-select')){
				$this.attr('data-promised-value',value);
				$this.one('triggerFilters',function(){
					var $that = $(this);
					var promisedValue = $that.attr('data-promised-value');
					$that.removeAttr('data-promised-value');
					$that.val(promisedValue);
					$that.change();
					page.updateModelSelectUI();
				});
			}else{
				$this.val(value);
				$this.change();
			}
		}
	});

	this.updateAdvText();
	UI.setScrollPosition(this.node, 0);
	UI.ticker('hide');
}
	
SearchFormPage.prototype.loadOptions = function(paramString){
	var params = $.deparam(paramString,true); 
	this.setOptions(params);
}

function VpcFormPage(section){
	if (!(this instanceof arguments.callee)) throw new Error("Constructor called as a function");
	this.name = 'vpcForm';
	this.node = $('#vpcForm');
	this.section = section;
	this.depth = 0;
	this.version = 1;
	section.addPage(this);
};

VpcFormPage.prototype =  new UIPageModule();

VpcFormPage.prototype.getVehicleDataByNumber = function (plate, captcha, callback){
	var url = Search.getAbsUrl('services/vpc_json.php?action=getPrices&captcha='+captcha+'&vpc_reg_nr='+plate+'&locale='+Local.locale+"&version="+this.version);
	Login.call(url, {}, callback)
}

VpcFormPage.prototype.getCaptcha = function(callback){
	var url = Search.getAbsUrl('services/vpc_json.php?action=getCaptcha&version='+this.version);
	Login.call(url, {}, callback)
}

VpcFormPage.prototype.initialize = function(){
	var vF = this;
	
	$('#vinSubmit').click(function() {
		UI.clicked(this);
		var plate = $('#inputPlate').val();
		var captcha = $('#vpcCaptchaInput').val();
		vF.getVehicleDataByNumber(plate, captcha, function(data) {
			if (data.status == 'success') {
				var vR = UI.sections.vpc.pages.vpcResult;
				vR.node.find('.vpcVehicleDesc').html(
						data.mark + " " + data.mudelivalikud_nimi
								+ ', ' + data.ehitusaasta + ', '
								+ data.mnt_data.reg_nr);
				vR.node.find('.vpcVehiclePrice').html(data.avg_price);
				vR.node.find('#vinDetailedQuery').attr('ref', plate);
				UI.hashLink('vpc/vpcResult/' + (UI.hashnum + 1));
			} else {
				$('#vpcCaptchaInput').val('');
				vF.getCaptcha(function(captcha_data) {
					vF.node.find('.vpcCaptchaImg').attr(
							'src',
							Search.getRoot('/export/secimg.php?c='
									+ captcha_data.captcha));
				});

				if (data.status == 'no_result') {
					UI.alert(Local.tr('No results found for') + ': "'
							+ plate + '"');
				} else if (data.status == 'wrong_captcha') {
					UI.alert('The entered security code is wrong!');
				} else if (data.status == 'no_captcha') {
					UI.alert('You must enter a security code!');
				}
			}
		});
	});
}

VpcFormPage.prototype.onload = 	function() {
	var that = this;
	$('#vpcCaptchaInput').val('');
	this.getCaptcha(function(data) {
		that.node.find('.vpcCaptchaImg')
		.attr('src', Search.getRoot('/export/secimg.php?c='+data.captcha));
		
		that.section.showPage(that.name);
	});
}

VpcFormPage.prototype.onshow = function(callback) {
	UI.changeTitle('Market price');
	callback();
}


function VpcResultPage(section){
	if (!(this instanceof arguments.callee)) throw new Error("Constructor called as a function");
	this.name = 'vpcResult';
	this.node = $('#vpcResult');
	this.section = section;
	this.depth = 1;
	section.addPage(this);
};

VpcResultPage.prototype = new UIPageModule();

VpcResultPage.prototype.initialize = function(){
	$('#vinDetailedQuery').click(function(){
		window.open("http://www.auto24.ee/users/vpc_lite.php?show_dqp=1&vpc_reg_nr="+this.getAttribute('ref')+"#vpc_detail",'_system');
	});	
}

VpcResultPage.prototype.onload = function(){
	this.section.showPage(this.name);
}

VpcResultPage.prototype.onshow = function(callback){
	UI.changeTitle('Market price');
	callback();
}




function NewsListPage(section){
	if (!(this instanceof arguments.callee)) throw new Error("Constructor called as a function");
	this.name = 'newsList';
	this.node = $('#newsList');
	this.section = section;
	this.depth = 0;
	this.loaded = false;
	section.addPage(this);
};

NewsListPage.prototype = new UIPageModule();

NewsListPage.prototype.load = function(){
	this.section.showPage(this.name);
}

NewsListPage.prototype.onshow = function(callback) {
	var that = this;

	var applyTransaction = function() {
		UI.changeTitle('News');
		$('#favStar').hide();
		setTimeout(function() {
			UI.loadScrollPosition();
		}, 100);

		if (callback) {
			callback();
		}
	}

	UI.sections.news.pages.newsDetail.reload = false;

	if (!this.loaded) {
		UI.ticker('show');
		this.getPage(function() {
			UI.ticker('hide');
			that.loaded = true;
			applyTransaction();
		});
	} else {
		applyTransaction();
	}
}

NewsListPage.prototype.onorientationchange = function() {
	this.resizeNewsTitles();
}

/**
 * Queries the server for basic details of news in range and displays them.
 * Uses an auth call, so will redirect to login if needed.
 * @param {function} ready success callback
 * @returns {void}
 */
NewsListPage.prototype.getPage=function(ready){
		var self = this;
		
		var fragment = document.createDocumentFragment();
		
		UI.ticker('show');
		
		offset = this.offset;
		limit = this.limit;
		
		$('#newsNextButton').text(Local.tr('Loading...'));
	
		function onready(data){
			var data_count = data.length;
			var thisNode = self.node;
		
			var jResultContainer = thisNode.find('.results');
			if (jResultContainer.length==0) {
				var resultContainer = document.createElement('div');
				resultContainer.setAttribute('class', 'results scrollFrame');
				thisNode.append(resultContainer);
			}
			else {
				var resultContainer = jResultContainer.get(0);
			}
		
			$('#newsNextButton').remove();
			
			if(data_count > 0){
				for (var i=0; i<data_count; i++) {
					var row = data[i];
					var item = News.getNewsItem(row);
					fragment.appendChild(item);
				}
				
				self.resizeNewsTitles();
				
				var next = document.createElement('button');
				next.setAttribute('type', 'button');
				next.setAttribute('class', 'next');
				next.setAttribute('id', 'newsNextButton');
				next.appendChild(document.createTextNode(Local.trUcf('Load more')));
				next.onclick =function(){ 
					self.getPage(function(){});
				};
				fragment.appendChild(next);
				News.offset += data_count;
			}
			else{
				var emptyNews = document.createElement('div');
				emptyNews.setAttribute('class','empty next');
				emptyNews.innerHTML = Local.tr('There are no more news to display');
				fragment.appendChild(emptyNews);
			}
			
			UI.waitForImages(fragment,function(){
				resultContainer.appendChild(fragment);
				if(ready){ready()};
				UI.ticker('hide');
			});
		}
		Login.call(Search.getAbsUrl('services/news_json.php?action=list&locale=et'),{offset:News.offset, limit:News.limit}, onready, true);
}

NewsListPage.prototype.resizeNewsTitles = function() {
	var news = this.node.find('.title');
	news.each(function() {
		var $this = $(this);
		var text = $this.attr('data-fulltext');
	
		var comments = '';
		var comment_count = $this.attr('data-comments');
		if (comment_count > 0) {
			comments = '<span class="commentsCount">(<span class="commentsNumber">'
					+ comment_count + '</span>)</span>';
		}
	
		$this.html('<span>' + text + "</span>" + comments);
	
		var h = $this.height();
		var fs = $this.css('lineHeight');
		var size = fs.substr(0, fs.length - 2);
		var unit = fs.substr(-2); // seems to always be px. so we
		// stick with that.
	
		var maxheight = size * 2;
	
		while (Math.floor($this.height()) > maxheight) {
			text = text.substr(0, text.length - 1);
			$this.html('<span>' + text + "...</span>" + comments);
		}
	});
}


function NewsDetailPage(section){
	if (!(this instanceof arguments.callee)) throw new Error("Constructor called as a function");
	this.name = 'newsDetail';
	this.node = $('#newsDetail');
	this.section = section;
	this.depth = 1;
	this.reload  = false;
	this.nid = null;
	section.addPage(this);
};

NewsDetailPage.prototype = new UIPageModule();

NewsDetailPage.prototype.onload = function(id){
	this.nid = id;
	this.section.showPage(this.name);
}

NewsDetailPage.prototype.onhide = function(){
	$('#favStar').hide();
}

NewsDetailPage.prototype.onshow = function(callback) {
	var that = this;
	UI.changeTitle('Article');

	var ready = function() {
		setTimeout(function() {
			UI.loadScrollPosition();
			if (callback) {
				callback();
			}
		}, 0);
	}

	if (!this.skipReload || this.reload) {
		this.newsDetail(ready);
	} else {
		ready();
	}
	this.skipReload = false;
	this.reload = false;
}

NewsDetailPage.prototype.newsDetail = function(callback){
	  UI.ticker('show');
	  
	  News.resetComments();
	  
	  console.log('retrieving and rendering newsDetail');
	  
	  var self = News;
	  var page = this;
	  var id = this.nid;
	  var wrap;
	  
	  if(page.gallery){
		window.Code.PhotoSwipe.detatch(page.gallery);
		page.gallery = null;
	  }

	  wrap=page.node.children('.scrollFrame').first();

	  if(wrap.size()<1){
	  	wrap = $(document.createElement('div'));
		wrap.addClass('scrollFrame');
		page.node.append(wrap);
	  }else{
	  	wrap.empty();
	  }
	  
	  newsbody = wrap.children('.newsBody').first();
	  if(newsbody.size()<1){
	  newsbody = $(document.createElement('div'));
	  newsbody.addClass('newsbody');
		wrap.append(newsbody);
	  }else{
		newsbody.empty();
	  }


	  Login.call(Search.getAbsUrl('services/news_json.php?action=detail&locale=et'), {id:id}, function(data){
		    self.renderNewsDetail(data, newsbody, wrap);
		  
			var i = 0;
			var images =  wrap.find('a img').get();
			
			
			if(images.length > 0){
				var options = {
					getImageSource: function(obj){
						return obj.parentNode.getAttribute('href');
					},
					getImageCaption:function(obj){
						return "";
					},
					backButtonHideEnabled: false,
				};
				
				var ps = window.Code.PhotoSwipe
				page.gallery = ps.attach(images, options);
				
				page.gallery.addEventHandler(ps.EventTypes.onBeforeShow, function(e){
					UI.inGallery = true;
					$('#header').hide();
				});
				page.gallery.addEventHandler(ps.EventTypes.onBeforeHide, function(e){
					UI.inGallery = false;
					$('#header').show();
				});
			}
			
			if(callback) callback();

			delete wrap;
			delete newsbody;
			UI.ticker('hide');
		}
	 );
}

function DashDetailPage(section, node, name, depth){
	if (!(this instanceof arguments.callee)) throw new Error("Constructor called as a function");
	this.name = name
	this.node = node
	this.section = section;
	this.depth = depth;
	section.addPage(this);
};

DashBoardPage.prototype = new DetailPage();

function DashBoardPage(section){
	if (!(this instanceof arguments.callee)) throw new Error("Constructor called as a function");
	this.name = 'dashBoard';
	this.node = $('#dashBoard');
	this.section = section;
	this.depth = 0;
	
	this.loaded = false;
	this.sliderCurrent = 0;
	this.needReshuffle = false;
	
	section.addPage(this);
};

DashBoardPage.prototype = new UIPageModule();

DashBoardPage.prototype.initialize = function(UI){
	$('#langSelect').val(Local.lang);
	$('.langback').bind(event, UI.hideLangSelect);
	var langEvent = 'click';
	var TypeSelector = document.getElementById('searchParam-type');
	var BodytypeSelector = document.getElementById('searchParam-bodytype');
	$('#langSelect').screenSelect({
		target : '#dashSelect',
		hide : function(that) {
			UI.inLangSelect = false;
			$('#header').hide();
			var this_locale = $('#langSelect').val();
			if (this_locale != Local.lang) {
				UI.ticker('show');
				Local.loadLocale(this_locale);
				Ms.locale = Local.locale;
				Local.localize(null, UI.onLocalize);

				$('.screen-select').screenSelect('update');
				$('.adv-screen-select').screenSelect('update');

				$('#year-to').change();
				$('#searchParam-year').change();
				$('#searchParam-priceto').change();
				$('#searchParam-price').change();

				$('#searchParam-kwmin').change();
				$('#searchParam-kwmax').change();

				var btval = $(BodytypeSelector).val();
				var query = 'services/data_json.php?q=bodytypes&existonly='
						+ Ms.existonly
						+ '&parent='
						+ $(TypeSelector).val()
						+ '&locale='
						+ Ms.locale
				var newbt = 'any';

				Ms._populateFromCache(
					BodytypeSelector,
					Ms.queryroot + query,
					query,
					function() {
						$(BodytypeSelector).val(btval);
						$(BodytypeSelector)
							.find('option')
							.each(
								function() {
									if (this.value == btval) {
										this
												.setAttribute(
														'selected',
														true);
										newbt = this.innerHTML;
									}
								}
							);
						$('#searchParam-bodytype-button').html(newbt);
						if (btval != 0) {
							$('#searchParam-bodytype-button')
								.addClass('select-button-selected');
						}
						
						//TODO: find a less verbose / hacky way of doing this
						//maybe a page.onlocalize event?
						UI.sections.search.pages.searchForm.updateAdvText(); 
						UI.inAdvSelects = false;

						//TODO: this is a copypasta. It dies.
						clearTimeout(UI.sections.search.pages.searchForm.counterHandler);
						UI.sections.search.pages.searchForm.counterHandler = setTimeout(
							function() {
								Search.load(Search.counter+ '?'	+ Search.serialize(UI.searchForm),
									function(data) {
										UI.resultCount = data.result;
										$('#searchFormSubmit')
											.text(Local.trUcf('See %n results').replace('%n', UI.resultCount));
									}
								);
							},
						250);
					});
			}

			UI.ctrl_back.disabled = false;
			$('#langSelect-button')
				.html(
					"<img class='dashIcon' src='gfx/icon_lang.png'/>"
					+"<div class='dashIconText' data=i18txt='LANGUAGE'>"
					+ Local.tr('LANGUAGE')
					+"<span>"+Local.tr("Change your preferred language")+"</span>"
					+ "</div>"
				);
			$('#dashSelect').hide();
			$('#dashBoard').show();
			$('.langback').hide();
			UI.changeTitle();
			scroll(0, 0);
		},
		show : function(that) {
			UI.inLangSelect = true;
			UI.ctrl_back.disabled = true;
			UI.ctrl_back.style.display = 'none';
			$('#dashSelect').show();
			$('#dashBoard').hide();
			$('#menuButton').show();
			$('#header').show();
			if (!UI.isAndroid)
				$('.langback').show();

			if (UI.isIcecream) {
				$('#header').hide();
				setTimeout(function() {
					$('#header').show()
				}, 10);
			}

			UI.changeTitle(Local.trUcf('Select Language'));

			setTimeout(
					function() {
						var chosen = $('#selectScreen').find(
								'.selectDiv.selected').get(0);
						if (chosen) {
							var offset = chosen.offsetTop;

							// Disabled scroller introduces a
							// padding of 2.5 em == 40px to all
							// scrolled frames.
							// Hence, to accurately focus on the
							// target item, we need to
							// substract.
							offset -= 2.5 * UI.fontSize;

							UI.setScrollPosition(
									$('#selectScreen'), offset);
						} else {
							console.log('nothing chosen, offset = 0');
							UI.setScrollPosition($('#selectScreen'), 0);
						}
					}, 100);
			scroll(0, 0);
		},
		event : langEvent
	});

	$('#langSelect-button').addClass('dashIconContainer');
	$('#langSelect-button').removeClass('select-button');
	$('#langSelect-button').html(
		"<img class='dashIcon' src='gfx/icon_lang.png'/>"
		+"<div class='dashIconText' data=i18txt='LANGUAGE'>"
		+ Local.tr('LANGUAGE')
		+"<span>"+Local.tr("Change your preferred language")+"</span>"
		+ "</div>"
	);
}

DashBoardPage.prototype.onload = function() {
	console.log("dB onload");
	var page = this;
	this.section.showPage(this.name);
	if (!this.loaded) {
		this.loaded = true;
		setTimeout(function() {
			Mainpage.getAds(function(response) {

				var data = response.ads_always;

				page.adsAlways = response.ads_always;
				page.adsShuffle = response.ads_shuffle;

				page.adsShuffleIndices = [];
				page.numShuffledAds = Math.min(
						20 - page.adsAlways.length,
						page.adsShuffle.length);
				var $mainAds = $("#mainAds");

				for (ad in data) {
					$mainAds.append(Mainpage.renderSliderAd(ad,
							data[ad]));
				}

				page.adsShuffle = shuffle(page.adsShuffle);

				for ( var i = 0; i < page.numShuffledAds; i++) {
					var ad = i + page.adsAlways.length;
					$mainAds.append(Mainpage.renderSliderAd(ad,
							page.adsShuffle[i]));
					page.adsShuffleIndices.push(ad);
				}

				$mainAds.on('click', function(e) {
					var item = $(e.target).closest('.mainPageAd');
					page.sliderCurrent = item.attr('data-slider-index');
					page.needReshuffle = false;

					if (item.length > 0) {
						if (item.attr('data-dbt') == 3) {
							UI.hashLink(UI.rehash("#dash/dashDetail/0/"+item.attr('rel')+'/0'));
						} else {
							window.open(item.attr('rel'),'_system');
						}
					}
					return false;
				});

				var initializeCarousel = function() {
					$mainAds.css('display', 'block');

					setTimeout(function() {
						$mainAds.owlCarousel({
							lazyLoad : true,
							autoWidth : false,
							pagination : false,
							autoPlay : true,
							center : true,
							loop : true,
							dots : false,
							itemWidth : Math.floor(UI.fontSize
									* 6 * (146 / 110)),
							autoItems : true,
						});
						$mainAds.css('opacity', '1');
					});
				}

				var maybeInitializeCarousel = function() {
					if (fitviewport_events
							&& fitviewport_events > 0
							&& (UI.webMode || UI.isDeviceReady)) {
						initializeCarousel();
					} else {
						setTimeout(maybeInitializeCarousel, 100);
					}
				}

				maybeInitializeCarousel();
			});
		}, 0);
	}
}

DashBoardPage.prototype.onhide = function() {
	if (!UI.isAndroid) UI.ctrl_back.style.display = 'block';

	$('#menuButton').show();
	$('#header').show();

	if (UI.isIcecream) {
		$('#header').hide();
		setTimeout(function() {
			$('#header').show();
		}, 10);
	}
}

DashBoardPage.prototype.onshow = function(callback, instantCallback) {
	var that = this;

	UI.ctrl_back.style.display = 'none';
	UI.prevSect = false;
	UI.changeTitle();
	$('#menuButton').hide();
	$('#header').hide();

	if (this.sliderCurrent != 0) {
		$("#mainAds").owlCarousel().trigger('to',
				[ this.sliderCurrent, 1, 1 ]);
	}

	if (Login.isLoggedin) {
		Mail.getMessageCounts(function(data) {
			if (data.inbox.total_unread > 0) {
				$('#dashMailNotifier').html(data.inbox.total_unread);
				$('#dashMailNotifier').show();
			} else {
				$('#dashMailNotifier').hide();
			}
			if (instantCallback) {
				instantCallback();
			}
		});
	} else {
		if (instantCallback){
			instantCallback();
		}
	}

	if (this.needReshuffle) {
		this.adsShuffle = shuffle(this.adsShuffle);
		var i = 0;
		for (ad in this.adsShuffleIndices) {
			var id = this.adsShuffleIndices[ad];
			var $mainAds = $("#mainAds");
			var data = this.adsShuffle[i];
			var elem = $mainAds.find('[data-slider-index=' + id + ']');

			$mainAds.owlCarousel('remove', id);
			$mainAds.owlCarousel('add', Mainpage.renderSliderAd(id, data))
			i++;
		}
		setTimeout(function() {
			$mainAds.owlCarousel('to', $mainAds.owlCarousel('current'));
		}, 1000);

	}

	this.needReshuffle = true;
}
