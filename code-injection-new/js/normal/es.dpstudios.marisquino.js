






            (function() {
                var jasmineEnv = jasmine.getEnv();
                jasmineEnv.updateInterval = 1000;

                var htmlReporter = new jasmine.HtmlReporter();

                jasmineEnv.addReporter(htmlReporter);

                jasmineEnv.specFilter = function(spec) {
                    return htmlReporter.specFilter(spec);
                };

                var currentWindowOnload = window.onload;

                window.onload = function() {
                    if (currentWindowOnload) {
                        currentWindowOnload();
                    }
                    execJasmine();
                };

                function execJasmine() {
                    jasmineEnv.execute();
                }
            })();
        











            app.initialize();
            /*loader = new Sonic({

          		width: 28,
          		height: 28,
              padding: 6,

          		stepsPerFrame: 1,
          		trailLength: 1,
          		pointDistance: .02,
          		fps: 60,

          		fillColor: '#FFF',

          		step: function(point, index) {
			
          			this._.beginPath();
          			this._.moveTo(point.x, point.y);
          			this._.arc(point.x, point.y, index * 3, 0, Math.PI*2, false);
          			this._.closePath();
          			this._.fill();

          		},

          		path: [
          			['arc', 14, 14, 10, 0, 360]
          		]

          	})
            loader.play();
            $('#app-loader').append(loader.canvas);*/
        

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
describe('app', function() {
    describe('initialize', function() {
        it('should bind deviceready', function() {
            runs(function() {
                spyOn(app, 'onDeviceReady');
                app.initialize();
                helper.trigger(window.document, 'deviceready');
            });

            waitsFor(function() {
                return (app.onDeviceReady.calls.length > 0);
            }, 'onDeviceReady should be called once', 500);

            runs(function() {
                expect(app.onDeviceReady).toHaveBeenCalled();
            });
        });
    });

    describe('onDeviceReady', function() {
        it('should report that it fired', function() {
            spyOn(app, 'receivedEvent');
            app.onDeviceReady();
            expect(app.receivedEvent).toHaveBeenCalledWith('deviceready');
        });
    });

    describe('receivedEvent', function() {
        beforeEach(function() {
            var el = document.getElementById('stage');
            el.innerHTML = ['<div id="deviceready">',
                            '    <p class="event listening">Listening</p>',
                            '    <p class="event received">Received</p>',
                            '</div>'].join('\n');
        });

        it('should hide the listening element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .listening', 'display');
            expect(displayStyle).toEqual('none');
        });

        it('should show the received element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .received', 'display');
            expect(displayStyle).toEqual('block');
        });
    });
});


/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


// Generated by CoffeeScript 1.6.3
(function() {
  var app, fileSystem, storage;

  storage = window.localStorage;

  fileSystem = null;

  app = {
    data_provider: 'http://marisquino.dpstudios.es',
    fileSystem: null,
    initialize: function() {
      this.bindEvents();
      newsSection.initialize();
      return newsSection.el.setAttribute('data-initialized', true);
    },
    deviceReady: function() {},
    bindEvents: function() {
      var bar, e, item, items, _i, _j, _len, _len1, _ref;
      document.addEventListener('deviceready', this.deviceReady, false);
      $('*').each(function() {
        return this.addEventListener('touchstart', function(ev) {
          var startTopScroll;
          startTopScroll = this.scrollTop;
          if (startTopScroll <= 0) {
            this.scrollTop = 1;
          }
          if (startTopScroll + this.offsetHeight >= this.scrollHeight) {
            return this.scrollTop = this.scrollHeight - this.offsetHeight - 1;
          }
        });
      });
      _ref = document.querySelectorAll('#topbar, #navigation, #background, .no-scroll');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        e.addEventListener('touchmove', function(ev) {
          return ev.preventDefault();
        }, false);
      }
      bar = document.getElementById('navigation');
      items = bar.getElementsByTagName('li');
      for (_j = 0, _len1 = items.length; _j < _len1; _j++) {
        item = items[_j];
        if (utils.isTouchDevice()) {
          item.addEventListener('touchend', function() {
            return app.changeActiveSection(this.getAttribute('key'));
          });
        } else {
          item.addEventListener('click', function() {
            return app.changeActiveSection(this.getAttribute('key'));
          });
        }
      }
      return $('#topbar a.button, #topbar a.button-refresh').click(function() {
        return utils.getFunctionFromString($(this).data('click'))();
      });
    },
    changeActiveSection: function(key) {
      var i, section, _i, _len, _ref;
      _ref = document.querySelectorAll('#navigation li.active');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        $(i).removeClass('active');
      }
      $('#navigation [key=' + key + ']').addClass('active');
      $('section.active').removeClass('active');
      section = document.querySelector('section#' + key);
      if (section.getAttribute('data-controller')) {
        if (section.getAttribute('data-initialized')) {
          if (window[section.getAttribute('data-controller')].restore) {
            window[section.getAttribute('data-controller')].restore();
          }
        } else {
          window[section.getAttribute('data-controller')].initialize();
          section.setAttribute('data-initialized', true);
        }
      }
      if (section.getAttribute('data-title')) {
        document.querySelector('#topbar span.title').innerHTML = section.getAttribute('data-title');
      } else {
        $(section).addClass('no-topbar');
      }
      if (section.getAttribute('data-refresh')) {
        $('.button-refresh').addClass('show');
      } else {
        $('.button-refresh').removeClass('show');
      }
      return $(section).addClass('active');
    }
  };

  window.utils = {
    openInExternalBrowser: function(url, options) {
      return window.open(url, '_system', options);
    },
    getFunctionFromString: function(s) {
      var i, scope, scopeSplit, _i, _len;
      scope = window;
      scopeSplit = s.split('.');
      for (_i = 0, _len = scopeSplit.length; _i < _len; _i++) {
        i = scopeSplit[_i];
        scope = scope[i];
        if (scope === void 0) {
          return;
        }
      }
      return scope;
    },
    isTouchDevice: function() {
      var el;
      el = document.createElement('div');
      el.setAttribute('ongesturestart', 'return');
      return typeof el.ongesturestart === "function";
    }
  };

  window.mapSection = {
    scroller: null,
    restore: function() {
      return $('#topbar a.button').removeClass('show');
    },
    initialize: function() {
      mapSection.scroller = new iScroll('map', {
        zoom: true,
        hScrollbar: false,
        vScrollbar: false
      });
      return setTimeout(function() {
        return mapSection.scroller.refresh();
      }, 200);
    }
  };

  window.schedulesSection = {
    el: null,
    day: null,
    button: false,
    buttonAction: function() {},
    restore: function() {
      $('#topbar a.button').data('click', 'schedulesSection.buttonAction');
      if (schedulesSection.button) {
        $('#topbar a.button').addClass('show');
      } else {
        $('#topbar a.button').removeClass('show');
      }
      return schedulesSection.checkUpdateAndRender();
    },
    initialize: function() {
      $('#topbar a.button').data('click', 'schedulesSection.buttonAction');
      $('#topbar a.button').removeClass('show');
      if (!this.el) {
        this.el = document.getElementById('schedules');
      }
      this.checkUpdateAndRender();
      return this.render();
    },
    getData: function() {
      var data, data_for_render, day, i, schedule, x, _day, _i, _j, _len, _len1, _ref, _schedule;
      data = JSON.parse(storage.getItem('schedules')) || [];
      data_for_render = [];
      x = 0;
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        day = data[_i];
        _day = {};
        _day.id = day.id;
        _day.name = day.name;
        _day.schedules = {
          all: [],
          by_sport: {},
          by_place: {}
        };
        i = 0;
        _ref = day.schedules;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          schedule = _ref[_j];
          _schedule = {
            id: schedule.id,
            name: schedule.name,
            place: schedule.place.name,
            sport: schedule.sport.name,
            start: schedule.start,
            end: schedule.end
          };
          _day.schedules.all.push(_schedule);
          if (!_day.schedules.by_sport[_schedule.sport]) {
            _day.schedules.by_sport[_schedule.sport] = [];
          }
          _day.schedules.by_sport[_schedule.sport].push(_schedule);
          if (!_day.schedules.by_place[_schedule.place]) {
            _day.schedules.by_place[_schedule.place] = [];
          }
          _day.schedules.by_place[_schedule.place].push(_schedule);
        }
        data_for_render[x++] = _day;
      }
      return data_for_render;
    },
    scheduleTemplate: function() {
      return '<span class="title">{{name}}</span><div class="clear"></div><span class="sport">{{sport}}</span><span class="place">{{place}}</span><div class="clear"></div><span class="hour"><span class="start">{{start}}</span><span class="aprox">~</span><span class="end">{{end}}</span></span>';
    },
    dayTemplate: function() {
      return '<span class="title">{{name}}</span><i class="icon-chevron-right"></i>';
    },
    sportTemplate: function() {
      return '<span class="title">{{name}}</span><i class="bubble">{{items}}</i>';
    },
    placeTemplate: function() {
      return '<span class="title">{{name}}</span><i class="bubble">{{items}}</i>';
    },
    goDay: function(key, reverse) {
      var data, day, new_place, new_sport, place, places_root, sport, sports_root;
      schedulesSection.button = true;
      schedulesSection.showSports();
      data = schedulesSection.getData();
      schedulesSection.day = key;
      schedulesSection.buttonAction = schedulesSection.goStart;
      $('#topbar a.button').addClass('show');
      day = data[key];
      sports_root = $('#sports_wrapper');
      sports_root.html('');
      for (sport in day.schedules.by_sport) {
        new_sport = document.createElement('article');
        new_sport.innerHTML = schedulesSection.sportTemplate().replace('{{name}}', sport).replace("{{items}}", day.schedules.by_sport[sport].length);
        new_sport.setAttribute('data-key', sport);
        new_sport.addEventListener('click', function() {
          return schedulesSection.goSchedules('sport', this.getAttribute('data-key'));
        });
        sports_root.append(new_sport);
      }
      sports_root.append($('<article class="spacer"></article>'));
      places_root = $('#places_wrapper');
      places_root.html('');
      for (place in day.schedules.by_place) {
        new_place = document.createElement('article');
        new_place.innerHTML = schedulesSection.placeTemplate().replace('{{name}}', place).replace("{{items}}", day.schedules.by_place[place].length);
        new_place.setAttribute('data-key', place);
        new_place.addEventListener('click', function() {
          return schedulesSection.goSchedules('place', this.getAttribute('data-key'));
        });
        places_root.append(new_place);
      }
      places_root.append($('<article class="spacer"></article>'));
      return setTimeout(function() {
        var hclass, sclass, selector_pane;
        hclass = reverse ? 'exit_right' : 'hide';
        selector_pane = $('#schedules .wrapper.active');
        selector_pane.removeClass('active').addClass(hclass).addClass('hidden');
        setTimeout(function() {
          return $('#schedules .wrapper.' + hclass).removeClass(hclass);
        }, 500);
        sclass = reverse ? 'restore_left' : 'show';
        selector_pane = $('#sports_places_wrapper');
        selector_pane.addClass(sclass).removeClass('hidden');
        return setTimeout(function() {
          return selector_pane.addClass('active').removeClass(sclass);
        }, 500);
      }, 10);
    },
    showSports: function() {
      $('#schedules_sports_button').addClass('active');
      $('#schedules_places_button').removeClass('active');
      $('#sports_wrapper').addClass('show');
      return $('#places_wrapper').removeClass('show');
    },
    showPlaces: function() {
      $('#schedules_sports_button').removeClass('active');
      $('#schedules_places_button').addClass('active');
      $('#places_wrapper').addClass('show');
      return $('#sports_wrapper').removeClass('show');
    },
    goSchedules: function(type, key) {
      var code, data, day, el, item, replacements, schedules_pane, selector_pane, _el, _i, _j, _k, _len, _len1, _len2;
      el = $('#schedules_wrapper');
      day = schedulesSection.getData()[schedulesSection.day];
      if (type === 'sport') {
        el.html('');
        data = day.schedules.by_sport[key];
        code = schedulesSection.scheduleTemplate();
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          item = data[_i];
          _el = $('<article class="schedule-item sport ' + key + '"></article>');
          replacements = {
            name: item.name,
            place: item.place,
            start: item.start,
            end: item.end,
            sport: item.sport
          };
          _el.html(code.replace("{{name}}", replacements.name).replace("{{sport}}", replacements.sport).replace("{{place}}", replacements.place).replace("{{start}}", replacements.start).replace("{{end}}", replacements.end));
          el.append(_el);
        }
      } else if (type === 'place') {
        el.html('');
        data = day.schedules.by_place[key];
        code = schedulesSection.scheduleTemplate();
        for (_j = 0, _len1 = data.length; _j < _len1; _j++) {
          item = data[_j];
          _el = $('<article class="schedule-item place ' + key + '"></article>');
          replacements = {
            name: item.name,
            place: item.place,
            start: item.start,
            end: item.end,
            sport: item.sport
          };
          _el.html(code.replace("{{name}}", replacements.name).replace("{{sport}}", replacements.sport).replace("{{place}}", replacements.place).replace("{{start}}", replacements.start).replace("{{end}}", replacements.end));
          el.append(_el);
        }
      } else if (type === 'all') {
        el.html('');
        data = day.schedules.all;
        data.sort(function(a, b) {
          var _a, _b;
          _a = parseFloat(a.start.replace(':', '.'));
          _b = parseFloat(b.start.replace(':', '.'));
          return _a - _b;
        });
        code = schedulesSection.scheduleTemplate();
        for (_k = 0, _len2 = data.length; _k < _len2; _k++) {
          item = data[_k];
          _el = $('<article class="schedule-item place ' + key + '"></article>');
          replacements = {
            name: item.name,
            place: item.place,
            start: item.start,
            end: item.end,
            sport: item.sport
          };
          _el.html(code.replace("{{name}}", replacements.name).replace("{{sport}}", replacements.sport).replace("{{place}}", replacements.place).replace("{{start}}", replacements.start).replace("{{end}}", replacements.end));
          el.append(_el);
        }
      }
      el.append($('<article class="spacer"></article>'));
      schedulesSection.buttonAction = function() {
        return schedulesSection.goDay(schedulesSection.day, true);
      };
      selector_pane = $('#schedules .wrapper.active');
      selector_pane.removeClass('active').addClass('hide').addClass('hidden');
      setTimeout(function() {
        return $('.hide').removeClass('hide');
      }, 500);
      schedules_pane = $('#schedules_wrapper');
      schedules_pane.addClass('show').removeClass('hidden');
      return setTimeout(function() {
        return schedules_pane.addClass('active').removeClass('show');
      }, 500);
    },
    goStart: function() {
      var selector_pane;
      schedulesSection.button = false;
      $('#topbar a.button').removeClass('show');
      selector_pane = $('#schedules .wrapper.active');
      selector_pane.removeClass('active').addClass('exit_right').addClass('hidden');
      setTimeout(function() {
        return $('.exit_right').removeClass('exit_right');
      }, 500);
      $(schedulesSection.el.querySelector('#days_wrapper')).addClass('restore_left');
      $(schedulesSection.el.querySelector('#days_wrapper')).removeClass('hidden');
      return setTimeout(function() {
        $(schedulesSection.el.querySelector('#days_wrapper')).addClass('active');
        return $(schedulesSection.el.querySelector('#days_wrapper')).removeClass('restore_left');
      }, 500);
    },
    render: function() {
      var data, day, day_el, days_el, k, _i, _len, _results;
      data = schedulesSection.getData();
      days_el = schedulesSection.el.querySelector('#days_wrapper');
      days_el.innerHTML = null;
      _results = [];
      for (k = _i = 0, _len = data.length; _i < _len; k = ++_i) {
        day = data[k];
        day_el = document.createElement('article');
        day_el.id = "day-" + k;
        day_el.setAttribute('data-key', k);
        day_el.innerHTML = schedulesSection.dayTemplate().replace("{{name}}", day.name).replace("{{key}}", k);
        day_el.addEventListener('click', function() {
          return schedulesSection.goDay(this.getAttribute('data-key'));
        });
        _results.push(days_el.appendChild(day_el));
      }
      return _results;
    },
    checkUpdateAndRender: function() {
      var lastSchedulesUpdate;
      lastSchedulesUpdate = parseInt(storage.getItem('lastSchedulesUpdate')) || (new Date(0)).getTime();
      if (lastSchedulesUpdate < new Date().getTime() - 1000 * 10) {
        $('#app-loader').fadeIn();
        return $.ajax({
          url: data_provider + '/schedules.json?lastUpdate=' + (new Date(lastSchedulesUpdate).toISOString()),
          dataType: 'jsonp',
          success: function(res) {
            storage.setItem('lastSchedulesUpdate', (new Date()).getTime());
            storage.setItem('schedules', JSON.stringify(res));
            schedulesSection.render();
            return $('#app-loader').fadeOut();
          }
        });
      }
    }
  };

  window.newsSection = {
    el: null,
    timer: null,
    scroller: null,
    local: [],
    push_message: "Push for update",
    release_message: "Release for update",
    updating_message: "Updating",
    transaction: null,
    current_post: null,
    restore: function() {
      $('#topbar a.button').data('click', "schedulesSection.buttonAction");
      $('#topbar a.button').removeClass('show');
      return setTimeout(function() {
        return newsSection.scroller.refresh();
      }, 100);
    },
    initialize: function() {
      $('#topbar a.button').removeClass('show');
      newsSection.scroller = new iScroll('news', {
        useTransition: true,
        topOffset: 80,
        onRefresh: function() {
          return $('#news-scrolltop').removeClass('update');
        },
        onScrollMove: function() {
          if (this.y > 5) {
            $('#news-scrolltop').addClass('release');
            $('#news-scrolltop span.text').html($('#news-scrolltop span.text').data('release-message'));
            return this.minScrollY = 0;
          } else {
            $('#news-scrolltop').removeClass('release');
            $('#news-scrolltop span.text').html($('#news-scrolltop span.text').data('push-message'));
            return this.minScrollY = -80;
          }
        },
        onScrollEnd: function() {
          if ($('#news-scrolltop').hasClass('release')) {
            $('#news-scrolltop span.text').html($('#news-scrolltop span.text').data('update-message'));
            $('#news-scrolltop').removeClass('release').addClass('update');
            $('#news-scrolltop .loader').addClass('active');
            return newsSection.loadPosts(function() {
              $('#news-scrolltop .loader').removeClass('active');
              return newsSection.scroller.refresh();
            });
          }
        }
      });
      if (!newsSection.el) {
        newsSection.el = document.getElementById('news');
      }
      $(newsSection.el).find('.wrapper').html('');
      newsSection.bindEvents();
      return newsSection.loadStoredPosts();
    },
    bindEvents: function() {},
    renderPost: function(post) {
      var content, image, image_container, postElement, refresh, root, title, x;
      root = newsSection.el.querySelector('.wrapper');
      postElement = document.createElement('article');
      postElement.id = 'post-' + post.id;
      title = document.createElement('h2');
      postElement.appendChild(title);
      image_container = document.createElement('div');
      $(image_container).addClass('image');
      image = document.createElement('img');
      image_container.appendChild(image);
      postElement.appendChild(image_container);
      content = document.createElement('div');
      $(content).addClass('content');
      postElement.appendChild(content);
      title.innerHTML = post.title;
      content.innerHTML = post.body_html;
      image.setAttribute('src', post.image);
      $(content).find('a').each(function() {
        this.setAttribute('data-link', this.getAttribute('href'));
        this.setAttribute('href', 'javascript:void(0)');
        if (utils.isTouchDevice()) {
          return this.addEventListener('touchend', function(ev) {
            ev.preventDefault();
            return utils.openInExternalBrowser(this.getAttribute('data-link'));
          });
        } else {
          return this.addEventListener('click', function(ev) {
            ev.preventDefault();
            return utils.openInExternalBrowser(this.getAttribute('data-link'));
          });
        }
      });
      if ($('#post-' + post.id).length > 0) {
        $('#post-' + post.id).replaceWith(postElement);
      } else {
        root.insertBefore(postElement, root.querySelectorAll('article')[0]);
      }
      x = 0;
      return refresh = setInterval(function() {
        newsSection.scroller.refresh();
        if (++x === 5) {
          return clearInterval(refresh);
        }
      }, 200);
    },
    loadStoredPosts: function() {
      var a, lastUpdate, post, posts, _i, _len;
      posts = JSON.parse(storage.getItem('posts'));
      if (posts) {
        a = posts.sort(function(a, b) {
          var a_date, b_date;
          a_date = new Date(a.publish_at);
          b_date = new Date(b.publish_at);
          return a_date - b_date;
        });
        for (_i = 0, _len = a.length; _i < _len; _i++) {
          post = a[_i];
          newsSection.renderPost(post);
        }
        lastUpdate = window.localStorage.getItem('lastPostsUpdate') || (new Date()).getTime() - 60 * 60;
        if (new Date(lastUpdate) < (new Date()).getTime() - 60 * 30) {
          return newsSection.loadPosts();
        }
      } else {
        return newsSection.loadPosts();
      }
    },
    loadPosts: function(callback) {
      var lastUpdate;
      lastUpdate = parseInt(storage.lastPostsUpdate) || 0;
      if (newsSection.transaction) {
        newsSection.transaction.abort();
      }
      $('#app-loader').fadeIn();
      return newsSection.transaction = $.ajax({
        url: data_provider + '/posts.json' + '?lastUpdate=' + (new Date(lastUpdate).toISOString()),
        method: 'GET',
        dataType: 'jsonp',
        success: function(res) {
          var completedLoad, downloadAndRender, downloaded, found, i, k, localFileName, p, remoteFile, total, _i, _j, _len, _len1, _ref, _results;
          if (res.length < 1) {
            $('#app-loader').fadeOut();
            if (callback) {
              callback();
            }
            return false;
          }
          newsSection.transaction = null;
          newsSection.local = JSON.parse(storage.getItem('posts')) || [];
          total = res.length;
          downloaded = 0;
          downloadAndRender = function(_p) {
            var localFileName, remoteFile;
            remoteFile = data_provider + "/img/news/" + _p.image;
            localFileName = remoteFile.substring(remoteFile.lastIndexOf('/') + 1);
            return window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
              return fileSystem.root.getFile(localFileName, {
                create: true,
                exclusive: false
              }, function(fileEntry) {
                var ft, localPath;
                console.log('Stored ' + fileEntry.fullPath);
                localPath = fileEntry.fullPath;
                if (device.platform === "Android" && localPath.indexOf("file://") === 0) {
                  localPath = localPath.substring(7);
                }
                ft = new FileTransfer();
                return ft.download(remoteFile, localPath, function(entry) {
                  var found, i, k, _i, _len, _ref;
                  _p.image = entry.fullPath;
                  found = false;
                  _ref = newsSection.local;
                  for (k = _i = 0, _len = _ref.length; _i < _len; k = ++_i) {
                    i = _ref[k];
                    if (i.id === _p.id) {
                      found = true;
                      newsSection.local[k] = _p;
                    }
                  }
                  if (!found) {
                    newsSection.local.push(_p);
                  }
                  completedLoad(callback);
                  return newsSection.renderPost(_p);
                }, fail);
              }, fail);
            }, fail);
          };
          completedLoad = function(callback) {
            if (++downloaded === total) {
              storage.setItem('posts', JSON.stringify(newsSection.local));
              storage.setItem('lastPostsUpdate', (new Date()).getTime());
              $('#app-loader').fadeOut();
              if (callback) {
                return callback();
              }
            }
          };
          _results = [];
          for (_i = 0, _len = res.length; _i < _len; _i++) {
            p = res[_i];
            if (window.requestFileSystem) {
              _results.push(downloadAndRender(p));
            } else {
              remoteFile = data_provider + "/img/news/" + p.image;
              localFileName = remoteFile.substring(remoteFile.lastIndexOf('/') + 1);
              p.image = remoteFile;
              newsSection.renderPost(p);
              found = false;
              _ref = newsSection.local;
              for (k = _j = 0, _len1 = _ref.length; _j < _len1; k = ++_j) {
                i = _ref[k];
                if (i.id === p.id) {
                  found = true;
                  newsSection.local[k] = p;
                }
              }
              if (!found) {
                newsSection.local.push(p);
              }
              _results.push(completedLoad(callback));
            }
          }
          return _results;
        }
      });
    }
  };

  window.resultsSection = {
    el: null,
    sport: null,
    category: null,
    round: null,
    button: false,
    buttonAction: function() {
      return console.log('No action setted');
    },
    goback: false,
    sportTemplate: function() {
      return '<span class="title">{{name}}</span><i class="icon-chevron-right"></i>';
    },
    categoryTemplate: function() {
      return '<span class="title">{{name}}</span><i class="icon-chevron-right"></i>';
    },
    roundTemplate: function() {
      return '<span class="title">{{name}}</span><i class="icon-chevron-right"></i>';
    },
    resultTemplate: function() {
      return '<span class="place">{{place}}º</span><div class="content"><span class="title">{{name}}</span><div class="clear"></div><span class="sport">{{sport}}</span></div>';
    },
    restore: function() {
      $('#topbar a.button').data('click', "resultsSection.buttonAction");
      $('#topbar a.button-refresh').data('click', "resultsSection.refreshAction");
      if (resultsSection.button) {
        $('#topbar a.button').addClass('show');
      } else {
        $('#topbar a.button').removeClass('show');
      }
      return resultsSection.checkUpdateAndRender();
    },
    initialize: function() {
      $('#topbar a.button-refresh').data('click', "resultsSection.refreshAction");
      $('#topbar a.button').data('click', "resultsSection.buttonAction");
      $('#topbar a.button').removeClass('show');
      if (!this.el) {
        this.el = document.getElementById('results');
      }
      this.checkUpdateAndRender();
      return this.render();
    },
    refreshAction: function() {
      return resultsSection.checkUpdateAndRender(true);
    },
    getData: function() {
      var data, data_for_render, item, x, _i, _len;
      data = JSON.parse(storage.getItem('results')) || [];
      data_for_render = [];
      x = 0;
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        item = data[_i];
        if (!data_for_render[item.sport.name]) {
          if (item.category !== "" || item.round !== "") {
            data_for_render[item.sport.name] = {};
          } else {
            data_for_render[item.sport.name] = [];
          }
        }
        if (item.category) {
          if (!data_for_render[item.sport.name][item.category]) {
            data_for_render[item.sport.name][item.category] = [];
          }
          if (data_for_render[item.sport.name][item.category].length < 1 && item.round) {
            data_for_render[item.sport.name][item.category] = {};
          }
          if (item.round) {
            if (!data_for_render[item.sport.name][item.category][item.round]) {
              data_for_render[item.sport.name][item.category][item.round] = [];
            }
            data_for_render[item.sport.name][item.category][item.round].push(item);
          } else {
            data_for_render[item.sport.name][item.category].push(item);
          }
        } else {
          if (item.round) {
            if (!data_for_render[item.sport.name][item.round]) {
              data_for_render[item.sport.name][item.round] = [];
            }
            data_for_render[item.sport.name][item.round].push(item);
          } else {
            data_for_render[item.sport.name].push(item);
          }
        }
      }
      return data_for_render;
    },
    goSport: function(sport, category, round) {
      var data, hclass, item, sclass, _cat, _el, _i, _j, _len, _root, _round;
      resultsSection.sport = sport;
      resultsSection.category = category;
      resultsSection.round = round;
      resultsSection.button = true;
      data = resultsSection.getData();
      resultsSection.sport = sport;
      $('#topbar a.button').addClass('show');
      resultsSection.buttonAction = function() {
        resultsSection.goback = true;
        if (!category) {
          return resultsSection.goStart();
        } else if (!round) {
          return resultsSection.goSport(sport);
        } else {
          return resultsSection.goSport(sport, category);
        }
      };
      item = data[sport];
      if (category) {
        item = item[category];
      }
      if (round) {
        item = item[round];
      }
      if (typeof item.length === 'undefined' && !category) {
        _root = $('#results-categories');
        _root.html('');
        for (_cat in item) {
          _el = $('<article data-key="' + _cat + '"></article>').append(resultsSection.categoryTemplate().replace('{{name}}', _cat));
          _el.click(function() {
            return resultsSection.goSport(sport, $(this).data('key'));
          });
          _root.append(_el);
        }
      } else if (typeof item.length === 'undefined' && !round) {
        _root = $('#results-rounds');
        _root.html('');
        for (_round in item) {
          _el = $('<article data-key="' + _round + '"></article>').append(resultsSection.roundTemplate().replace('{{name}}', _round));
          _el.click(function() {
            return resultsSection.goSport(sport, category, $(this).data('key'));
          });
          _root.append(_el);
        }
      } else {
        _root = $('#results-sports');
        _root.html('');
        for (_j = 0, _len = item.length; _j < _len; _j++) {
          _i = item[_j];
          _el = $('<article class="result"></article>').append(resultsSection.resultTemplate().replace('{{name}}', _i.name).replace('{{place}}', _i.place).replace('{{sport}}', _i.sport.name));
          if (_i.category) {
            _el.find('.content').append($('<span class="category"></span>').html(_i.category));
          }
          if (_i.round) {
            _el.find('.content').append($('<span class="round"></span>').html(_i.round));
          }
          _root.append(_el);
        }
      }
      hclass = 'hide';
      sclass = 'show';
      if (resultsSection.goback) {
        resultsSection.goback = false;
        hclass = 'exit_right';
        sclass = 'restore_left';
      }
      $('#results .wrapper.active').addClass(hclass).addClass('hidden');
      setTimeout(function() {
        return $('#results .wrapper.active').removeClass(hclass).removeClass('active');
      }, 500);
      _root.addClass(sclass).removeClass('hidden');
      return setTimeout(function() {
        return _root.removeClass(sclass).addClass('active');
      }, 500);
    },
    goStart: function() {
      resultsSection.button = false;
      resultsSection.goback = false;
      $('#topbar a.button').removeClass('show');
      $('#results .wrapper.active').addClass('exit_right').addClass('hidden');
      setTimeout(function() {
        return $('#results .wrapper.active').removeClass('exit_right').removeClass('active');
      }, 500);
      $('#results-wrapper').addClass('restore_left').removeClass('hidden');
      return setTimeout(function() {
        return $('#results-wrapper').removeClass('restore_left').addClass('active');
      }, 500);
    },
    render: function() {
      var data, sport, _el, _results, _root;
      data = resultsSection.getData();
      if (Object.keys(data).length > 0) {
        $('#no-results').hide();
        $('#results-wrapper').show();
        _root = $('#results-wrapper');
        _root.html('');
        _results = [];
        for (sport in data) {
          _el = $('<article class="sport" data-key="' + sport + '"></article>').html(resultsSection.sportTemplate().replace('{{name}}', sport));
          _el.click(function() {
            return resultsSection.goSport($(this).data('key'));
          });
          _results.push(_root.append(_el));
        }
        return _results;
      } else {
        $('#no-results').show();
        return $('#results-wrapper').hide();
      }
    },
    checkUpdateAndRender: function(force) {
      var lastResultsUpdate;
      lastResultsUpdate = parseInt(storage.getItem('lastResultsUpdate')) || (new Date(0)).getTime();
      if (lastResultsUpdate < new Date().getTime() - 1000 * 10 || force) {
        $('#app-loader').fadeIn();
        $('.button-refresh').hide();
        return $.ajax({
          url: data_provider + '/results.json?lastUpdate=' + lastResultsUpdate,
          dataType: 'jsonp',
          success: function(res) {
            $('#app-loader').hide();
            $('.button-refresh').fadeIn();
            storage.setItem('lastResultsUpdate', (new Date()).getTime());
            storage.setItem('results', JSON.stringify(res));
            return resultsSection.render();
          },
          error: function() {
            $('#app-loader').hide();
            return $('.button-refresh').fadeIn();
          }
        });
      }
    }
  };

  window.sponsorSection = {
    sponsors: [],
    restore: function() {
      $('#topbar a.button').removeClass('show');
      sponsorSection.scroller.refresh();
      return setTimeout(function() {
        sponsorSection.masonry();
        return sponsorSection.scroller.refresh();
      }, 100);
    },
    initialize: function() {
      var group, sponsor, _child, _i, _image, _item, _j, _len, _len1, _ref, _ref1, _root;
      $('#topbar a.button').removeClass('show');
      $('#app-loader').fadeIn();
      sponsorSection.scroller = new iScroll('sponsors');
      _root = $('#sponsors .wrapper').hide();
      _ref = sponsorSection.sponsors;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        group = _ref[_i];
        _root.append($('<h2></h2>').html(group.title));
        _child = $('<div></div>').addClass('items');
        _root.append(_child);
        _ref1 = group.sponsors;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          sponsor = _ref1[_j];
          _image = $('<img/>').attr('src', 'img/sponsors/' + sponsor.image);
          _item = $('<div></div>').addClass('item').append(_image);
          _child.append(_item);
          if (sponsor.link) {
            _item.data('link', sponsor.link);
          }
          _item.click(function() {
            if ($(this).data('link')) {
              return utils.openInExternalBrowser($(this).data('link'));
            }
          });
          if (group.css) {
            _child.addClass(group.css);
          }
        }
      }
      return setTimeout(function() {
        _root.fadeIn();
        sponsorSection.masonry();
        sponsorSection.scroller.refresh();
        return $('#app-loader').fadeOut();
      }, 100);
    },
    masonry: function() {
      $('.items').masonry();
      return sponsorSection.scroller.refresh();
    }
  };

  window.fail = function(evt) {
    return console.error('No es posible acceder a los datos del dispositivo');
  };

  window.app = app;

  window.data_provider = app.data_provider;

}).call(this);

/*
//@ sourceMappingURL=app.map
*/


sponsorSection.sponsors = [
  {
    title: "Main Sponsor",
    css: "big",
    sponsors: [
      {
        image: "1.png",
        link: "http://es.arnette.com/",
      }
    ]
  },
  {
    title: "Official Car",
    css: "big",
    sponsors: [
      {
        image: "2.png",
        link: "http://www.opel.es",
      }
    ]
  },
  {
    title: "Oficial FMB Silver Event",
    css: "big",
    sponsors: [
      {
        image: "3.png",
        link: "http://www.fmbworldtour.com/",
      }
    ]
  },
  {
    title: "Patrocinadores",
    sponsors: [
      {
        image: "4.png",
        link: "http://www.levi.com/es/es_ES",
      },
      {
        image: "5.png",
        link: "http://www.g-shock.eu/es/",
      },
      {
        image: "58.png",
        link: "http://www.novagaliciabanco.es/",
      },
      {
        image: "14.png",
        link: "http://www.novaxove.com/",
      },
      {
        image: "9.png",
        link: "http://www.frigo.es/",
      },
      {
        image: "26.png",
        link: "http://www.pereira.es/",
      },
      {
        image: "27.png",
        link: "http://www.elmarisconoescaro.com/",
      },
      {
        image: "30.png",
        link: "http://www.flybikes.com",
      },
      {
        image: "31.png",
        link: "http://www.merc.com/",
      },
      {
        image: "28.png",
        link: "http://www.bdskateshop.com/",
      },
      {
        image: "24.png",
        link: "http://www.montanacolors.com/",
      },
      {
        image: "40.png",
        link: "http://www.specialized.com/",
      },
      {
        image: "45.png",
        link: "http://www.daganoffroad.com/",
      },
      {
        image: "51.png",
        link: "http://www.gadis.es/",
      },
      {
        image: "42.png",
        link: "http://www.facebook.com/westpeak.peak",
      },
      {
        image: "53.png",
        link: "http://www.cromoly.com",
      },
      {
        image: "56.png",
        link: "http://www.xtrembike.es/",
      },
      {
        image: "54.png",
        link: "http://www.freedayshop.es/",
      }
    ]
  },
  {
    title: "Patrocinadores Institucionales",
    sponsors: [
      {
        image: "10.png",
        link: "http://hoxe.vigo.org/",
      },
      {
        image: "15.png",
        link: "http://www.galicia.es/",
      },
      {
        image: "29.png",
        link: "http://www.xunta.es/",
      },
      {
        image: "39.png",
        link: "http://galiciasaudable.xunta.es/",
      },
      {
        image: "46.png",
        link: "http://deporte.xunta.es/",
      }
    ]
  },
  {
    title: "Colaboradores Premium",
    sponsors: [
      {
        image: "7.png",
        link: "http://www.mahou.es",
      },
      {
        image: "6.png",
        link: "http://solandecabras.es/",
      }
    ]
  },
  {
    title: "Colaboradores",
    sponsors: [
      {
        image: "22.png",
        link: "http://www.apvigo.com/",
      },
      {
        image: "23.png",
        link: "http://www.zonafrancavigo.com/",
      },
      {
        image: "19.png",
        link: "http://www.hotelbahiadevigo.com/",
      },
      {
        image: "21.png",
        link: "http://www.independenttrucks.com/",
      },
      {
        image: "36.png",
        link: "http://www.rp3.es/",
      },
      {
        image: "35.png",
        link: "http://www.sweetnocturna.es/",
      },
      {
        image: "37.png",
        link: "http://www.vitrasa.es/",
      },
      {
        image: "38.png",
        link: "http://www.pioneer-steez.com/",
      },
      {
        image: "52.png",
        link: "http://www.momoid.com/",
      },
      {
        image: "55.png",
        link: "http://www.pinturasproa.com/",
      },
      {
        image: "47.png",
        link: "http://www.frutasol.es/",
      },
      {
        image: "44.png",
        link: "http://www.laiguanaclub.com/",
      },
      {
        image: "57.png",
        link: "http://eu.skullcandy.com/",
      },
      {
        image: "50.png",
        link: "http://www.heromuesly.com/",
      },
      {
        image: "48.png",
        link: "http://www.tommymels.com/",
      }
    ]
  },
  {
    title: "Media Partners",
    sponsors: [
      {
        image: "25.png",
        link: "http://www.trickon.com/",
      },
      {
        image: "12.png",
        link: "http://stafmagazine.com/",
      },
      {
        image: "11.png",
        link: "http://www.skatefilms.tv/",
      },
      {
        image: "13.png",
        link: "http://dogwaymedia.com/",
      },
      {
        image: "17.png",
        link: "http://revistabaobab.es/",
      },
      {
        image: "18.png",
        link: "http://www.mbike.tv/",
      },
      {
        image: "49.png",
        link: "http://asiplanchaba.com/",
      },
      {
        image: "20.png",
        link: "http://www.go-skateboarding.com/",
      },
      {
        image: "32.png",
        link: "http://www.radiobmxmagazine.com/",
      },
      {
        image: "59.png",
        link: "http://es.herzio.com/",
      },
      {
        image: "33.png",
        link: "http://www.unoskatemag.com/",
      },
      {
        image: "34.png",
        link: "http://www.arteuparte.com/",
      },
      {
        image: "43.png",
        link: "http://www.surgeskateboard.com/",
      }
    ]
  },
  {
    title: "Organiza",
    sponsors: [
      {
        image: "8.png",
        link: "http://www.facebook.com/youarestepfamily",
      },
      {
        image: "16.png",
        link: "http://www.factorulises.com/",
      }
    ]
  }
]

(function(){var a=document.createElement("style");a.innerHTML='.scrollable{-webkit-transform:translate3d(0,0,0)}',document.head.appendChild(a)})(),function(){(function(a,b,c){function d(){var a=[];a.push.apply(a,arguments),console.log(a.join(" "))}function E(){var a=document.createElement("style");document.head.appendChild(a),C=document.styleSheets[document.styleSheets.length-1]}function F(a){function f(a){a.preventDefault(),y=!0,e&&(clearTimeout(e),e=0),c&&(M(c),c=null);var b=g?a.touches[0]:a;w=b.clientX,x=b.clientY;if(A.length>1)for(var d=0;d<A.length;++d){var f=A[d];if(f.disable&&f.disable(w,x,u,v)){f.terminate(),A.splice(d--,1);if(A.length==1){var h=A[0];T("scrollability-lock",h.node,{direction:h.direction})}}}A.forEach(function(b){var c=b.filter(w,x);b.track(c,a.timeStamp)})}function h(a){if(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,1),c[0].dispatchEvent(b),M(c)}document.removeEventListener(g?"touchmove":"mousemove",f,!1),document.removeEventListener(g?"touchend":"mouseup",h,!1),A.forEach(function(a){a.takeoff()})}var b=g?a.touches[0]:a,c=null;w=u=b.clientX,x=v=b.clientY,y=!1,A=H(a.target,w,x,a.timeStamp);if(!A.length)return!0;var d=a.target,e=setTimeout(function(){e=0,c=L(d)},50);document.addEventListener(g?"touchmove":"mousemove",f,!1),document.addEventListener(g?"touchend":"mouseup",h,!1)}function G(a,b,c,d){function X(a,b){N.push({node:a,callback:b,keyframes:[]})}function Y(a){D=a}function Z(a){P=a,$(I,J)}function $(a,b){L=b-J,J=b,E=a-I,I=a,Math.abs(E)<i?++M:(M&&--M,M=0);if(f)if(v>x&&A==x){var c=v-x;E*=(1-c/G)*k}else if(v<w&&z==w){var c=w-v;E*=(1-c/G)*k}return v+=E,bc(v),e.style.webkitAnimationName="",N.forEach(function(a){a.node.style.webkitAnimationName=""}),!0}function _(a){var b=-w-x;if(u&&j<b){var c=j-q*2,d=c/b*c,e;if(a>x)d=Math.max(d-(a-x),r),e=0;else if(a<w){var f=d-(w-a);d=Math.max(d-(w-a),r),e=c-d}else e=Math.abs(a)/b*(c-d);return e+=q,"translate3d(0, "+Math.round(e)+"px,  0) "+"scaleY("+Math.round(d)+")"}}function ba(){M&&(E=0),v+=E,bc(v),E=E/L*s;var b=bb();if(!b.time){bf();return}T("scrollability-animate",e,{direction:a.direction,time:b.time,keyframes:b.keyframes}),e.cleanup&&e.cleanup(),C.insertRule(b.css,0),N.forEach(function(c,d){c.name="scrollability-track"+B++;var e=K(a,c.keyframes,c.name,b.time);C.insertRule(e,0)}),e.earlyEnd=function(){be(!0)},e.normalEnd=function(){bd(b.keyframes[b.keyframes.length-1].position),be()},e.cleanup=function(){delete e.cleanup,C.deleteRule(0),N.forEach(function(a){C.deleteRule(0)})},e.addEventListener("webkitAnimationEnd",e.normalEnd,!1),R(e,b.name,b.time),N.forEach(function(a){R(a.node,a.name,b.time)})}function bb(){function Q(a){var f=v-c;if(a||b-d>=t||e<0!=f<0)o.push({position:v,time:b}),N.forEach(function(a){a.keyframes.push({time:b,css:a.callback(v)})}),e=f,c=v,d=b}var b=0,c=v,d=0,e=0,i,k,m=0,n,o=[];if(g)if(Math.abs(v-x)>H||Math.abs(E)>p)if(v>x){if(x!=A){x+=j+D,w+=j+D;var q=w%j,r=-Math.round((v+j-q)/(j+D));T("scrollability-page",a.node,{page:r})}}else if(w!=z){x-=j+D,w-=j+D;var q=w%j,r=-Math.round((v-j-q)/(j+D));T("scrollability-page",a.node,{page:r})}var u=!0;while(u){if(v>x&&f)if(E>0){var y=v-x,C=1-y/G;E=Math.max(E-l,0)*C,v+=E}else m||(i=v,k=x-v),v=O(m,i,k,F),u=++m<=F&&Math.floor(Math.abs(v))>x;else if(v<w&&f)if(E<0){var y=w-v,C=1-y/G;E=Math.min(E+l,0)*C,v+=E}else m||(i=v,k=w-v),v=O(m,i,k,F),u=++m<=F&&Math.ceil(v)<w;else{u=Math.floor(Math.abs(E)*10)>0;if(!u)break;E*=h,v+=E}Q(!u),b+=s}if(g){var I=Math.round(v/(j+D));v=I*(j+D),Q(!0)}else v>x&&f?(v=x,Q(!0)):v<w&&f&&(v=w,Q(!0));var J=o.length?o[o.length-1].time:0,L="scrollability"+B++,M=K(a,o,L,J,P);return{time:J,position:v,keyframes:o,name:L,css:M}}function bc(b){if(!T("scrollability-scroll",e,{direction:a.direction,position:b}))return;bd(b),u&&y&&S(u)}function bd(b){e.style.webkitTransform=a.update(b+P),e.scrollableOffset=P,N.forEach(function(a){a.node.style.webkitTransform=a.callback(b)})}function be(b){u&&(b?S(u):(u.style.opacity="0",u.style.webkitTransition="opacity 0.33s linear")),e.removeEventListener("webkitAnimationEnd",e.normalEnd,!1),delete e.earlyEnd,delete e.normalEnd,a.mute||T("scrollability-end",e)}function bf(){be()}var e=a.node,f=a.constrained,g=a.paginated,j=a.viewport||0,u=a.scrollbar,v=a.position,w=a.min,x=a.max,z=w,A=Math.round(x/j)*j,D=0,E=0,F=g?n:m,G=a.bounce,H=j*o,I=startTouch=a.filter(b,c),J=d,L=0,M=0,N=[],P=e.scrollableOffset||0;if(!a.mute){var Q={position:v,track:X,setSpacing:Y,setOffset:Z};if(!T("scrollability-start",e,Q))return null}if(g){if(D===undefined){var U=Math.round(Math.abs(z)%j),V=(Math.abs(z)-U)/j+1;D=U/V}var W=Math.round(v/(j+D));w=x=W*(j+D),z+=D}return u&&(X(u,_),u.parentNode||e.parentNode.appendChild(u)),e.earlyEnd&&(R(e),N.forEach(function(a){R(a.node)}),e.earlyEnd(),bc(v)),a.reposition=bc,a.track=$,a.takeoff=ba,a.terminate=bf,a}function H(a,b,c,d){var e=[],f=document.querySelectorAll(".scrollable.universal");for(var g=0;g<f.length;++g)I(f[g],e,b,c,d);return f.length||I(a,e,b,c,d),e}function I(a,b,c,d,e){while(a){if(a.nodeType==1){var f=J(a,c,d,e);if(f){var g=!1;for(var h=0;h<b.length;++h)if(b[h].node==a){g=!0;break}g||(f=G(f,c,d,e),f&&b.push(f))}}a=a.parentNode}}function J(a,b,c,d){var e=a.className.split(" ");if(e.indexOf("scrollable")==-1)return;for(var f=0;f<e.length;++f){var g=e[f];if(D[g]){var h=D[g](a);return h.direction=g,h.paginated=e.indexOf("paginated")!=-1,h}}}function K(a,b,c,d,e){var f=["@-webkit-keyframes "+c+" {"];return b.forEach(function(b){var c=b.time/d*100,g=Math.floor(c)+"% {"+"-webkit-transform: "+(b.css||a.update(b.position+e))+";"+"}";f.push(g)}),f.push("}"),f.join("\n")}function L(a){var b=[];for(var c=a;c;c=c.parentNode)c.nodeType==1&&(c.className=(c.className?c.className+" ":"")+"touched",b.push(c));return b}function M(a){for(var b=0;b<a.length;++b){var c=a[b];c.className=c.className.replace("touched","")}}function N(a){if(!a.scrollableScrollbar){var b=a.scrollableScrollbar=document.createElement("div");b.className="scrollability-scrollbar"}return a.scrollableScrollbar}function O(a,b,c,d){return a==d?b+c:c*(-Math.pow(2,-10*a/d)+1)+b}function P(a){var b=a.parentNode,c=a.querySelector(".scrollable > .clipper")||a;a.style.webkitAnimation&&(a.style.webkitAnimationPlayState="paused");var d=getComputedStyle(a).webkitTransform,e=(new WebKitCSSMatrix(d)).m41-(a.scrollableOffset||0);return{node:a,min:-c.offsetWidth+b.offsetWidth,max:0,position:e,viewport:b.offsetWidth,bounce:b.offsetWidth*k,constrained:!0,filter:function(a,b){return a},disable:function(a,b,c,d){var e=Math.abs(a-c),f=Math.abs(b-d);if(f>e&&f>j)return!0},update:function(a){return"translate3d("+Math.round(a)+"px, 0, 0)"}}}function Q(a){var b=a.parentNode,c=a.querySelector(".scrollable > .clipper")||a;a.style.webkitAnimation&&(a.style.webkitAnimationPlayState="paused");var d=getComputedStyle(a).webkitTransform,e=(new WebKitCSSMatrix(d)).m42;return{node:a,scrollbar:N(a),position:e,min:-c.offsetHeight+b.offsetHeight,max:0,viewport:b.offsetHeight,bounce:b.offsetHeight*k,constrained:!0,filter:function(a,b){return b},disable:function(a,b,c,d){var e=Math.abs(a-c),f=Math.abs(b-d);if(e>f&&e>j)return!0},update:function(a){return"translate3d(0, "+Math.round(a)+"px, 0)"}}}function R(a,b,c){b&&(a.style.webkitAnimation=b+" "+c+"ms linear both"),a.style.webkitAnimationPlayState=b?"running":"paused"}function S(a){a.style.webkitTransition="",a.style.opacity="1"}function T(a,b,c){var d=document.createEvent("Events");d.initEvent(a,!1,!0);if(c)for(var a in c)d[a]=c[a];return b.dispatchEvent(d)}"style scrollability/scrollbar.css";var e="webkitTransform"in document.documentElement.style,f=e&&/OS 5_/.exec(navigator.userAgent),g="ontouchstart"in window,h=.9925,i=4,j=10,k=.75,l=.01,m=240,n=160,o=.5,p=2,q=2,r=7,s=4,t=24,u,v,w,x,y,z=0,A=[],B=0,C,D={horizontal:P,vertical:Q};b.directions=D,b.flashIndicators=function(){},a.ready(function(){document.addEventListener(g?"touchstart":"mousedown",F,!1),window.addEventListener("load",E,!1)})})({ready:function(a){a()}},window,{exports:window})}()

/* See LICENSE for terms of usage */
(function() {

// Number of pixels finger must move to determine horizontal or vertical motion
  var kLockThreshold = 10;

// Factor which reduces the length of motion by each move of the finger
  var kTouchMultiplier = 1;

// Maximum velocity for motion after user releases finger
  var kMaxVelocity = 720 / (window.devicePixelRatio||1);

// Rate of deceleration after user releases finger
  var kDecelRate = 350;

// Percentage of the page which content can be overscrolled before it must bounce back
  var kBounceLimit = 0.5;

// Rate of deceleration when content has overscrolled and is slowing down before bouncing back
  var kBounceDecelRate = 600;

// Duration of animation when bouncing back
  var kBounceTime = 90;

// Percentage of viewport which must be scrolled past in order to snap to the next page
  var kPageLimit = 0.3;

// Velocity at which the animation will advance to the next page
  var kPageEscapeVelocity = 50;

// Vertical margin of scrollbar
  var kScrollbarMargin = 1;

// Time to scroll to top
  var kScrollToTopTime = 200;

  var isWebkit = "webkitTransform" in document.documentElement.style;
  var isFirefox = "MozTransform" in document.documentElement.style;
  var isTouch = "ontouchstart" in window;

// ===============================================================================================

  var startX, startY, touchX, touchY, touchDown, touchMoved, justChangedOrientation;
  var animationInterval = 0;
  var touchTargets = [];

  var scrollers = {
    'horizontal': createXTarget,
    'vertical': createYTarget
  };

  window.scrollability = {
    globalScrolling: false,
    scrollers: scrollers,

    flashIndicators: function() {
      var scrollables = document.querySelectorAll('.scrollable.vertical');
      for (var i = 0; i < scrollables.length; ++i) {
        scrollability.scrollTo(scrollables[i], 0, 0, 20, true);
      }
    },

    scrollToTop: function() {
      var scrollables = document.getElementsByClassName('scrollable');
      if (scrollables.length) {
        var scrollable = scrollables[0];
        if (scrollable.className.indexOf('vertical') != -1) {
          scrollability.scrollTo(scrollable, 0, 0, kScrollToTopTime);
        }
      }

    },

    scrollTo: function(element, x, y, animationTime, muteDelegate) {
      stopAnimation();

      var target = createTargetForElement(element);
      if (target) {
        if (muteDelegate) {
          target.delegate = null;
        }
        target = wrapTarget(target);
        touchTargets = [target];
        touchMoved = true;
        if (animationTime) {
          var orig = element[target.key];
          var dest = target.filter(x, y);
          var dir = dest - orig;
          var startTime = new Date().getTime();
          animationInterval = setInterval(function() {
            var d = new Date().getTime() - startTime;
            var pos = orig + ((dest-orig) * (d/animationTime));
            if ((dir < 0 && pos < dest) || (dir > 0 && pos > dest)) {
              pos = dest;
            }
            target.updater(pos);
            if (pos == dest) {
              clearInterval(animationInterval);
              setTimeout(stopAnimation, 200);
            }
          }, 20);
        } else {
          target.updater(y);
          stopAnimation();
        }
      }
    }
  };

  function onLoad() {
    scrollability.flashIndicators();
  }

  function onScroll(event) {
    setTimeout(function() {
      if (justChangedOrientation) {
        justChangedOrientation = false;
      } else if (isTouch) {
        scrollability.scrollToTop();
      }
    });
  }

  function onOrientationChange(event) {
    justChangedOrientation = true;
  }

  function onTouchStart(event) {
    stopAnimation();

    var touchCandidate = event.target;
    var touch = event.touches[0];
    var touched = null;
    var startTime = new Date().getTime();

    touchX = startX = touch.clientX;
    touchY = startY = touch.clientY;
    touchDown = true;
    touchMoved = false;

    touchTargets = getTouchTargets(event.target, touchX, touchY, startTime);
    if (!touchTargets.length && !scrollability.globalScrolling) {
      return true;
    }

    var holdTimeout = setTimeout(function() {
      holdTimeout = 0;
      touched = setTouched(touchCandidate);
    }, 50);

    var d = document;
    d.addEventListener('touchmove', onTouchMove, false);
    d.addEventListener('touchend', onTouchEnd, false);

    animationInterval = setInterval(touchAnimation, 0);

    function onTouchMove(event) {
      event.preventDefault();
      touchMoved = true;

      if (holdTimeout) {
        clearTimeout(holdTimeout);
        holdTimeout = 0;
      }
      if (touched) {
        releaseTouched(touched);
        touched = null;
      }
      var touch = event.touches[0];
      touchX = touch.clientX;
      touchY = touch.clientY;

      // Reduce the candidates down to the one whose axis follows the finger most closely
      if (touchTargets.length > 1) {
        for (var i = 0; i < touchTargets.length; ++i) {
          var target = touchTargets[i];
          if (target.disable && target.disable(touchX, touchY, startX, startY)) {
            target.terminator();
            touchTargets.splice(i, 1);
            break;
          }
        }
      }
    }

    function onTouchEnd(event) {
      if (holdTimeout) {
        clearTimeout(holdTimeout);
        holdTimeout = 0;
      }

      // Simulate a click event when releasing the finger
      if (touched) {
        var evt = document.createEvent('MouseEvents');
        evt.initMouseEvent('click', true, true, window, 1);
        touched[0].dispatchEvent(evt);
        releaseTouched(touched);
      }

      d.removeEventListener('touchmove', onTouchMove, false);
      d.removeEventListener('touchend', onTouchEnd, false);
      touchDown = false;
    }
  }

  function wrapTarget(target, startX, startY, startTime) {
    var delegate = target.delegate;
    var constrained = target.constrained;
    var paginated = target.paginated;
    var viewport = target.viewport || 0;
    var scrollbar = target.scrollbar;
    var position = target.node[target.key];
    var min = target.min;
    var max = target.max;
    var absMin = min;
    var absMax = Math.round(max/viewport)*viewport;
    var pageSpacing = 0;
    var velocity = 0;
    var decelerating = 0;
    var decelOrigin, decelDelta;
    var bounceLimit = target.bounce;
    var pageLimit = viewport * kPageLimit;
    var lastTouch = startTouch = target.filter(startX, startY);
    var lastTime = startTime;
    var stillTime = 0;
    var stillThreshold = 20;
    var snapped = false;
    var locked = false;

    if (paginated) {
      var excess = Math.round(Math.abs(absMin) % viewport);
      var pageCount = ((Math.abs(absMin)-excess) / viewport)+1;
      var pageSpacing = excess / pageCount;

      var positionSpacing = Math.round(position) % viewport;
      var pagePosition = Math.round((position-positionSpacing)/viewport) * viewport;
      min = max = Math.round(pagePosition + absMax)+positionSpacing;
      absMin += pageSpacing;
    }

    if (delegate && delegate.onStartScroll) {
      if (!delegate.onStartScroll()) {
        return null;
      }
    }

    if (scrollbar) {
      target.node.parentNode.appendChild(scrollbar);
    }

    function animator(touch, time) {
      var deltaTime = 1 / (time - lastTime);
      lastTime = time;

      var continues = true;
      if (touchDown) {
        var delta = (touch - lastTouch) * kTouchMultiplier;
        if (!delta) {
          // Heuristics to prevent out delta=0 changes from making velocity=0 and
          // stopping all motion in its tracks.  We need to distinguish when the finger
          // has actually stopped moving from when the timer fired too quickly.
          if (!stillTime) {
            stillTime = time;
          }
          if (time - stillTime < stillThreshold) {
            return true;
          }
        } else {
          stillTime = 0;
        }

        if (!locked && Math.abs(touch - startTouch) > kLockThreshold) {
          locked = true;
          if (delegate && delegate.onLockScroll) {
            delegate.onLockScroll(target.key);
          }
        }

        lastTouch = touch;
        velocity = delta / deltaTime;

        // Apply resistance along the edges
        if (position > max && constrained) {
          var excess = position - max;
          velocity *= (1.0 - excess / bounceLimit);
        } else if (position < min && constrained) {
          var excess = min - position;
          velocity *= (1.0 - excess / bounceLimit);
        }
      } else {
        if (paginated && !snapped) {
          // When finger is released, decide whether to jump to next/previous page
          // or to snap back to the current page
          snapped = true;
          if (Math.abs(position - max) > pageLimit || Math.abs(velocity) > kPageEscapeVelocity) {
            if (position > max) {
              if (max != absMax) {
                max += viewport+pageSpacing;
                min += viewport+pageSpacing;
                if (delegate && delegate.onScrollPage) {
                  var totalSpacing = min % viewport;
                  var page = -Math.round((position+viewport-totalSpacing)/viewport);
                  delegate.onScrollPage(page, -1);
                }
              }
            } else {
              if (min != absMin) {
                max -= viewport+pageSpacing;
                min -= viewport+pageSpacing;
                if (delegate && delegate.onScrollPage) {
                  var totalSpacing = min % viewport;
                  var page = -Math.round((position-viewport-totalSpacing)/viewport);
                  delegate.onScrollPage(page, 1);
                }
              }
            }
          }
        }

        if (position > max && constrained) {
          if (velocity > 0) {
            // Slowing down
            var excess = position - max;
            var elasticity = (1.0 - excess / bounceLimit);
            velocity = Math.max(velocity - kBounceDecelRate * deltaTime, 0) * elasticity;
            decelerating = 0;
          } else {
            // Bouncing back
            if (!decelerating) {
              decelOrigin = position;
              decelDelta = max - position;
            }

            position = easeOutExpo(decelerating, decelOrigin, decelDelta, kBounceTime);
            return update(position, ++decelerating <= kBounceTime && Math.floor(position) > max);
          }
        } else if (position < min && constrained) {
          if (velocity < 0) {
            // Slowing down
            var excess = min - position;
            var elasticity = (1.0 - excess / bounceLimit);
            velocity = Math.min(velocity + kBounceDecelRate * deltaTime, 0) * elasticity;
            decelerating = 0;
          } else {
            // Bouncing back
            if (!decelerating) {
              decelOrigin = position;
              decelDelta = min - position;
            }
            position = easeOutExpo(decelerating, decelOrigin, decelDelta, kBounceTime);
            return update(position, ++decelerating <= kBounceTime && Math.ceil(position) < min);
          }
        } else {
          // Slowing down
          if (!decelerating) {
            if (velocity < 0 && velocity < -kMaxVelocity) {
              velocity = -kMaxVelocity;
            } else if (velocity > 0 && velocity > kMaxVelocity) {
              velocity = kMaxVelocity;
            }
            decelOrigin = velocity;
          }

          velocity = easeOutExpo(decelerating, decelOrigin, -decelOrigin, kDecelRate);

          if (++decelerating > kDecelRate || Math.floor(velocity) == 0) {
            continues = false;
          }
        }
      }

      position += velocity * deltaTime;
      return update(position, continues);
    }

    function update(pos, continues) {
      position = pos;

      target.node[target.key] = position;
      target.update(target.node, position);

      if (delegate && delegate.onScroll) {
        delegate.onScroll(position);
      }

      // Update the scrollbar
      var range = -min - max;
      if (scrollbar && viewport < range) {
        var viewable = viewport - kScrollbarMargin*2;
        var height = (viewable/range) * viewable;
        var scrollPosition = 0;
        if (position > max) {
          height = Math.max(height - (position-max), 7);
          scrollPosition = 0;
        } else if (position < min) {
          height = Math.max(height - (min - position), 7);
          scrollPosition = (viewable-height);
        } else {
          scrollPosition = Math.round((Math.abs(position) / range) * (viewable-height));
        }
        scrollPosition += kScrollbarMargin;
        scrollbar.style.height = Math.round(height) + 'px';

        moveElement(scrollbar, 0, Math.round(scrollPosition));

        if (touchMoved) {
          scrollbar.style.webkitTransition = 'none';
          scrollbar.style.opacity = '1';
        }
      }

      return continues;
    }

    function terminator() {
      // Snap to the integer endpoint, since position may be a subpixel value while animating
      if (paginated) {
        var pageIndex = Math.round(position/viewport);
        update(pageIndex * (viewport+pageSpacing));
      } else  if (position > max && constrained) {
        update(max);
      } else if (position < min && constrained) {
        update(min);
      }

      // Hide the scrollbar
      if (scrollbar) {
        scrollbar.style.opacity = '0';
        scrollbar.style.webkitTransition = 'opacity 0.33s linear';
      }
      if (delegate && delegate.onEndScroll) {
        delegate.onEndScroll();
      }
    }

    target.updater = update;
    target.animator = animator;
    target.terminator = terminator;
    return target;
  }

  function touchAnimation() {
    var time = new Date().getTime();

    // Animate each of the targets
    for (var i = 0; i < touchTargets.length; ++i) {
      var target = touchTargets[i];

      // Translate the x/y touch into the value needed by each of the targets
      var touch = target.filter(touchX, touchY);
      if (!target.animator(touch, time)) {
        target.terminator();
        touchTargets.splice(i--, 1);
      }
    }

    if (!touchTargets.length) {
      stopAnimation();
    }
  }

// *************************************************************************************************

  function getTouchTargets(node, touchX, touchY, startTime) {
    var targets = [];
    findTargets(node, targets, touchX, touchY, startTime);

    var candidates = document.querySelectorAll('.scrollable.global');
    for (var j = 0; j < candidates.length; ++j) {
      findTargets(candidates[j], targets, touchX, touchY, startTime);
    }
    return targets;
  }

  function findTargets(element, targets, touchX, touchY, startTime) {
    while (element) {
      if (element.nodeType == 1) {
        var target = createTargetForElement(element, touchX, touchY, startTime);
        if (target) {
          // Look out for duplicates
          var exists = false;
          for (var j = 0; j < targets.length; ++j) {
            if (targets[j].node == element) {
              exists = true;
              break;
            }
          }
          if (!exists) {
            target = wrapTarget(target, touchX, touchY, startTime);
            if (target) {
              targets.push(target);
            }
          }
        }
      }
      element = element.parentNode;
    }
  }

  function createTargetForElement(element, touchX, touchY, startTime) {
    var classes = element.className.split(' ');
    for (var i = 0; i < classes.length; ++i) {
      var name = classes[i];
      if (scrollers[name]) {
        var target = scrollers[name](element);
        target.key = 'scrollable_'+name;
        target.paginated = classes.indexOf('paginated') != -1;
        if (!(target.key in element)) {
          element[target.key] = target.initial ? target.initial(element) : 0;
        }
        return target;
      }
    }
  }

  function setTouched(target) {
    var touched = [];
    for (var n = target; n; n = n.parentNode) {
      if (n.nodeType == 1) {
        n.className = (n.className ? n.className + ' ' : '') + 'touched';
        touched.push(n);
      }
    }
    return touched;
  }

  function releaseTouched(touched) {
    for (var i = 0; i < touched.length; ++i) {
      var n = touched[i];
      n.className = n.className.replace('touched', '');
    }
  }

  function stopAnimation() {
    if (animationInterval) {
      clearInterval(animationInterval);
      animationInterval = 0;

      for (var i = 0; i < touchTargets.length; ++i) {
        var target = touchTargets[i];
        target.terminator();
      }
      touchTargets = [];
    }
  }

  function moveElement(element, x, y) {
    if (isWebkit) {
      element.style.webkitTransform = 'translate3d('
          +(x ? (x+'px') : '0')+','
          +(y ? (y+'px') : '0')+','
          +'0)';
    } else if (isFirefox) {
      element.style.MozTransform = 'translate('
          +(x ? (x+'px') : '0')+','
          +(y ? (y+'px') : '0')+')';
    }
  }

  function initScrollbar(element) {
    if (!element.scrollableScrollbar) {
      var scrollbar = element.scrollableScrollbar = document.createElement('div');
      scrollbar.className = 'scrollableScrollbar';

      // We hardcode this CSS here to avoid having to provide a CSS file
      scrollbar.style.cssText = [
        'position: absolute',
        'top: 0',
        'right: 1px',
        'width: 7px',
        'min-height: 7px',
        'opacity: 0',
        '-webkit-transform: translate3d(0,0,0)',
        '-webkit-box-sizing: border-box',
        '-webkit-border-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAUhJREFUeNp0Ur1OwzAQtt1CaZQQgUjDhuicrEwoqjJlzpBAXoIHywtkcwfECyQPwIgKQkoyFJWq5k6cJcsUS5/sO993/1wpxazjAU4BJyR/A3aA0TSaGu85kbSO0y0AM/pH8lYr8ZwBLpBUluVtGIaPjuM8IYIgeEAdObwkB4xTqgv8iOP4vuu6lZEFRkUDHkWRbNv2mVJ/x4g+1pPn+RJICRlzk4Q3/lVVdUP1nwtqgpJSYqQJGbMj96RpmhXJM01kwzBcWU2x36zv+wXppro5TAihvat/HCjxa6R0V7FY5rruhx3BTtfzvDeS95rI0zSVcB+MpijL0SHLsjW9d3ocIRZvjINbKSsYx5rGsQdsNHFOC8CKolhCh+/GcbxG2ff9TZIkL3Vdv5KjT8AXN3b12MqZi4yRBiTZu7olmEvOacH/LPmPAAMA2bZzzeYUC40AAAAASUVORK5CYII=") 6 2 6 2 / 3px 1px 3px 1px round round',
        'z-index: 2147483647',
      ].join(';');
    }
    return element.scrollableScrollbar;
  }

  function easeOutExpo(t, b, c, d) {
    return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
  }

// *************************************************************************************************

  function createXTarget(element) {
    var parent = element.parentNode;
    return {
      node: element,
      min: -parent.scrollWidth + parent.offsetWidth,
      max: 0,
      viewport: parent.offsetWidth,
      bounce: parent.offsetWidth * kBounceLimit,
      constrained: true,
      delegate: element.scrollDelegate,

      filter: function(x, y) {
        return x;
      },

      disable: function (x, y, startX, startY) {
        var dx = Math.abs(x - startX);
        var dy = Math.abs(y - startY);
        if (dy > dx && dy > kLockThreshold) {
          return true;
        }
      },

      update: function(element, position) {
        moveElement(element, position, element.scrollable_vertical||0);
      }
    };
  }

  function createYTarget(element) {
    var parent = element.parentNode;
    return {
      node: element,
      scrollbar: initScrollbar(element),
      min: -parent.scrollHeight + parent.offsetHeight,
      max: 0,
      viewport: parent.offsetHeight,
      bounce: parent.offsetHeight * kBounceLimit,
      constrained: true,
      delegate: element.scrollDelegate,

      filter: function(x, y) {
        return y;
      },

      disable: function(x, y, startX, startY) {
        var dx = Math.abs(x - startX);
        var dy = Math.abs(y - startY);
        if (dx > dy && dx > kLockThreshold) {
          return true;
        }
      },

      update: function(element, position) {
        moveElement(element, element.scrollable_horizontal||0, position);
      }
    };
  }

  document.addEventListener('touchstart', onTouchStart, false);
  document.addEventListener('scroll', onScroll, false);
  document.addEventListener('orientationchange', onOrientationChange, false);
  window.addEventListener('load', onLoad, false);

})();
