





       




/**
 * Views
 * @author Pierre Rolland
 * @version 2012-03-16
 */

window.FormationsView = Backbone.View.extend({
  el : $('#formations-container'),
  initialize : function() {
    this.template = _.template($('#formations-template').html());
  },
  render : function() {
    fav.get('view').setActivated(false);
    $('.header').css('position', 'static');
    $('.selected').removeClass('selected');
    var renderedContent = this.template({data : this.model.get('data')});
    $(this.el).html(renderedContent);
    $('.formation').bind('click', function() {
      $(this).addClass('selected');
      var url = $(this).attr('id');
      var name = $(this).find('div.name').html();
      datePicker = new DatePicker({
        url : url,
        name : name
      });
    });
    $('#fav').bind('click', function() {
      if (currentPage == 'formations')
        fav.render();
      else if (currentPage == 'datePicker')
        fav.get('view').changeState();
    });
    $(window).scrollTop(0);
    $('.ajax-loader').hide();
    currentPage = 'formations';
    return this;
  }
});

window.DatePickerView = Backbone.View.extend({
  el : $('#datePicker-container'),
  initialize : function() {
    var monthsNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    var months = [];
    for (var i = 0 ; i < monthsNames.length ; i++)
      months[i] = {
        id : i + 1,
        name : monthsNames[i]
      };
    var wkDaysNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    var days = [];
    for (var i = 0 ; i < 31 ; i++)
      days[i] = i + 1;
    var curDate = new Date();
    var data = [];
    data.curDay = curDate.getDate();
    data.curWkDay = curDate.getDay();
    data.curMonth = curDate.getMonth() + 1;
    data.curYear = curDate.getFullYear();
    data.months = months;
    data.days = days;
    data.wkDays = wkDaysNames;
    data.curWkDayName = data.wkDays[data.curWkDay];
    data.dateObject = curDate;
    data.timeline = this.model.get('timeline');
    this.model.set('data', data);
  },
  refresh : function(day, month) {
    this.template = _.template($('#datePicker-template').html());
    var data = this.model.get('data');
    if (day !== false && month !== false) {
      data.dateObject.setDate(day);
      data.dateObject.setMonth(month - 1);
      data.curDay = day;
      data.curMonth = month;
      data.curWkDay = data.dateObject.getDay();
      data.curWkDayName = data.wkDays[data.curWkDay];
    }
    this.model.set('data', data);
    var renderedContent = this.template({data : data, timeline : data.timeline[data.curMonth][data.curDay]});
    $(this.el).html(renderedContent);
    $(window).scrollTop(0);
    $('form#datePickerForm select').bind('change', function() {
      datePicker.get('view').refresh($('select#datePickerDay').val(), $('select#datePickerMonth').val());
    });
  },
  successIsFavorite : function(tx, results) {
    if (results.rows.length == 0) {
      fav.get('view').setDeactivated();
    } else {
      fav.get('view').setActivated(true);
    }
  },
  error : function() {},
  render : function() {  
    var that = this;
    db.transaction(function(tx) {
      tx.executeSql('SELECT * FROM formations WHERE name = ? AND url = ?', [that.model.get('name'), that.model.get('url')], that.successIsFavorite, that.error);
    });
    $('.header').css('position', 'static');
    $('.selected').removeClass('selected');
    this.refresh(false, false);
    $('.ajax-loader').hide();
    currentPage = 'datePicker';
    return this;
  }
});

window.BookMarkView = Backbone.View.extend({
  el : $('#bookmark-container'),
  activated : true,
  initialize : function() {
    this.template = _.template($('#bookmark-template').html());
  },
  setActivated : function(changeDB) {
    $('#fav #deactivated').hide();
    this.activated = true;
    if (changeDB === true)
      fav.addFormation(datePicker.get('name'), datePicker.get('url'));
    $('#fav #activated').show();
  },
  setDeactivated : function() {
    $('#fav #activated').hide();
    this.activated = false;
    fav.removeFormation(datePicker.get('name'), datePicker.get('url'));
    $('#fav #deactivated').show();
  },
  changeState : function() {
    if (this.activated === true) {
      this.setDeactivated();
    } else {
      this.setActivated(true);
    }
  }, 
  render : function() {
    $('.header').css('position', 'static');
    $('.selected').removeClass('selected');
    var renderedContent = this.template({data : this.model.get('data')});
    $(this.el).html(renderedContent);
    $('.formation').bind('click', function() {
      $(this).addClass('selected');
      var url = $(this).attr('id');
      var name = $(this).find('div.name').html();
      datePicker = new DatePicker({
        url : url,
        name : name
      });
    });
    $(window).scrollTop(0);
    currentPage = 'fav';
    return this;
  }
});

var formations;
var datePicker;
var fav;
var currentPage;
var loadId;
var db;

function repositionMenu() {
  var heightScreen = $(window).height();
  var widthScreen = $(window).width();
  var scrollTop = $(window).scrollTop();
  var liWidth = widthScreen / 3 - 22;

  $('.ajax-loader').css('top', scrollTop + 'px');
  setTimeout(repositionMenu, 100);
}

function positionLogo() {
  var heightLogo = $('.header').height();
  var heightScreen = $(window).height();
  var top = heightScreen / 2 - heightLogo / 2;
  $('.header').css('top', top.toString() + 'px');
}

function positionFav() {
  var heightScreen = $(window).height();
  var widthScreen = $(window).width();
  $('#fav').css('width', (heightScreen / 10) + 'px');
  $('#fav').css('height', (heightScreen / 10) + 'px');
  $('#fav').css('top', '5px');
  $('#fav').css('right', '5px')
  $('#fav img').css('width', (heightScreen / 10) + 'px');
  $('#fav img').css('height', (heightScreen / 10) + 'px');
}

function load() {
  formations = new Formations();
  clearTimeout(loadId);
}

function initDB() {
  db = window.openDatabase('iemniae', '1.0', 'IEMN-IAE', 100000);
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS formations(name, url)');
  });
}

$(document).ready(function() {
  loadId = setTimeout(load, 2000);
  repositionMenu();
  positionLogo();
  positionFav();
  initDB();
  $(document).bind('backbutton', function() {
    if (currentPage == 'datePicker' || currentPage == 'fav')
      formations.render();
    else {
      navigator.notification.confirm(
        'Voulez-vous vraiment quitter ?',
        function() { navigator.app.exitApp(); },
        'Quitter ?',
        'Oui,Non'
      );
    }
  });
  fav = new BookMark();
});

/**
 * Models
 * @author Pierre Rolland
 * @version 2012-03-16
 */

window.Formations = Backbone.Model.extend({
  defaults : {
    instance : "formations",
    callback : "wsCB"
  },
  initialize : function Formations() {
    $('.ajax-loader').show();
    this.getWebservices();
  },
  getWebservices : function () {
    var s = document.createElement('script');
    s.src = 'http://www.itinerairedemerde.fr/webservices/IEMN.php?cmd=formations&instance=' + this.get('instance') + '&cb=' + this.get('callback');
    $(s).addClass('getWS');
    document.body.appendChild(s);
  },
  wsCB : function (data) {
    this.set('data', data);
    $('.getWS').remove();
    $('#fav').show();
    this.render();
  },
  render : function () {
    $('.contentBlock').html('');
    var view = new FormationsView({model : this});
    view.render();
  }
});

window.DatePicker = Backbone.Model.extend({
  defaults : {
    instance : "datePicker",
    callback : "wsCB",
    data : [],
    view : null,
    url : ""
  },
  getWebservices : function () {
    var s = document.createElement('script');
    s.src = 'http://www.itinerairedemerde.fr/webservices/IEMN.php?cmd=formation&instance=' + this.get('instance') + '&cb=' + this.get('callback') + '&url=' + this.get('url');
    $(s).addClass('getWS');
    document.body.appendChild(s);
  },
  wsCB : function (data) {
    this.set('timeline', data);
    $('.getWS').remove();
    this.render();
  },
  initialize : function DatePicker() {
    $('.ajax-loader').show();
    this.getWebservices();
  },
  render : function () {
    $('.contentBlock').html('');
    this.set('view', new DatePickerView({model : this}));
    this.get('view').render();
  }
});

window.BookMark = Backbone.Model.extend({
  defaults : {
    instance : "fav",
    callback : "wsCB",
    data : [],
    view : null,
    url : ""
  },
  error : function(tx, msg) {
    console.log('error');
  },
  successFormations : function(tx, results) {
    var ret = [];
    for (var i = 0 ; i < results.rows.length ; i++) {
      ret.push(results.rows.item(i))
    }
    fav.set('data', ret);
    $('.contentBlock').html('');
    fav.get('view').render();
  },
  getFormations : function () {
    var that = this;
    db.transaction(function(tx) {
      tx.executeSql('SELECT * FROM formations', [], that.successFormations, that.error);
    });
  },
  initialize : function BookMark() {
    this.set('view', new BookMarkView({model : this}));
  },
  addFormation : function(name, url) {
    db.transaction(function(tx) {
      tx.executeSql('INSERT INTO formations(name, url) VALUES(?, ?)', [name, url]);
    });
  },
  removeFormation : function(name, url) {
    db.transaction(function(tx) {
      tx.executeSql('DELETE FROM formations WHERE name = ? AND url = ?', [name, url]);
    });
  },
  render : function () {
    this.getFormations();
  }
});

/**
 * jQuery.ajax mid - CROSS DOMAIN AJAX 
 * ---
 * @author James Padolsey (http://james.padolsey.com)
 * @version 0.11
 * @updated 12-JAN-10
 * ---
 * Note: Read the README!
 * ---
 * @info http://james.padolsey.com/javascript/cross-domain-requests-with-jquery/
 */

jQuery.ajax = (function(_ajax){
    
    var protocol = location.protocol,
        hostname = location.hostname,
        exRegex = RegExp(protocol + '//' + hostname),
        YQL = 'http' + (/^https/.test(protocol)?'s':'') + '://query.yahooapis.com/v1/public/yql?callback=?',
        query = 'select * from html where url="{URL}" and xpath="*"';
    
    function isExternal(url) {
        return !exRegex.test(url) && /:\/\//.test(url);
    }
    
    return function(o) {
        
        var url = o.url;
        
        if ( /get/i.test(o.type) && !/json/i.test(o.dataType) && isExternal(url) ) {
            
            // Manipulate options so that JSONP-x request is made to YQL
            
            o.url = YQL;
            o.dataType = 'json';
            
            o.data = {
                q: query.replace(
                    '{URL}',
                    url + (o.data ?
                        (/\?/.test(url) ? '&' : '?') + jQuery.param(o.data)
                    : '')
                ),
                format: 'xml'
            };
            
            // Since it's a JSONP request
            // complete === success
            if (!o.success && o.complete) {
                o.success = o.complete;
                delete o.complete;
            }
            
            o.success = (function(_success){
                return function(data) {
                    
                    if (_success) {
                        // Fake XHR callback.
                        _success.call(this, {
                            responseText: data.results[0]
                                // YQL screws with <script>s
                                // Get rid of them
                                .replace(/<script[^>]+?\/>|<script(.|\s)*?\/script>/gi, '')
                        }, 'success');
                    }
                    
                };
            })(o.success);
            
        }
        
        return _ajax.apply(this, arguments);
        
    };
    
})(jQuery.ajax);

