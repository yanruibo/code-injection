

setTimeout(function(){
	document.location.href = "app/index.html";
},1000);



                var GOOG_FIXURL_LANG = (navigator.language || '').slice(0,2),GOOG_FIXURL_SITE = location.host;
            




















   
  



(function() {

  window.wwwApp = angular.module('wwwApp', ['ngSanitize']).config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactViewCtrl',
        showNavBar: true,
        showBoardItems: true,
        showBackButton: true
      }).when('/domain', {
        templateUrl: 'views/domains.html',
        controller: 'DomainListCtrl',
        showNavBar: true,
        showBoardItems: true
      }).when('/domain/:domainId', {
        templateUrl: 'views/domain.html',
        controller: 'DomainViewCtrl',
        showNavBar: true,
        showBoardItems: true,
        showBackButton: true,
        backLocation: function(navHistory) {
          if (_.isEmpty(navHistory)) {
            return "/domain";
          } else {
            return navHistory.length - 1;
          }
        }
      }).when('/domain/:domainId/project/:projectId', {
        templateUrl: 'views/project.html',
        controller: 'ProjectViewCtrl',
        showBackButton: true,
        backLocation: function(navHistory, $routeParams) {
          if (_.isEmpty(navHistory)) {
            return "/domain/" + $routeParams.domainId;
          } else {
            return navHistory.length - 1;
          }
        },
        showNavBar: false
      }).when('/domain/:domainId/project/:projectId/asset/:assetId', {
        templateUrl: 'views/project.html',
        controller: 'ProjectViewCtrl',
        showBackButton: true,
        backLocation: function(navHistory, $routeParams) {
          var index;
          index = _.findLastIndex(navHistory, function(nav) {
            return !nav.match(RegExp("\\/domain\\/" + $routeParams.domainId + "\\/project\\/" + $routeParams.projectId));
          });
          if (index === -1) {
            return "/domain/" + $routeParams.domainId;
          } else {
            return index;
          }
        },
        showNavBar: false
      }).when('/my-library', {
        templateUrl: 'views/my-library.html',
        controller: 'MyLibraryViewCtrl',
        showBackButton: true,
        backLocation: function(navHistory) {
          if (_.isEmpty(navHistory)) {
            return "/domain";
          } else {
            return navHistory.length - 1;
          }
        },
        showNavBar: false
      }).when('/my-library/asset/:assetId', {
        templateUrl: 'views/my-library.html',
        controller: 'MyLibraryViewCtrl',
        showBackButton: true,
        backLocation: function(navHistory, $routeParams) {
          var index;
          index = _.findLastIndex(navHistory, function(nav) {
            return !nav.match(/\/my-library/);
          });
          if (index === -1) {
            return "/domain";
          } else {
            return index;
          }
        },
        showNavBar: false
      }).when('/blog', {
        templateUrl: 'views/blog.html',
        showNavBar: true,
        showBoardItems: true
      }).when('/researcher', {
        templateUrl: 'views/researchers.html',
        controller: 'ResearcherListCtrl',
        showNavBar: true,
        showBoardItems: true,
        showBackButton: true,
        reloadOnSearch: false,
        backLocation: function(navHistory, $routeParams) {
          var index;
          index = _.findLastIndex(navHistory, function(nav) {
            return !nav.match(/\/researcher/);
          });
          if (index === -1) {
            return '/domains';
          } else {
            return index;
          }
        }
      }).when('/events', {
        templateUrl: 'views/events.html',
        controller: 'EventListCtrl',
        showNavBar: true,
        showBoardItems: true,
        showBackButton: false
      }).when('/video-library', {
        templateUrl: 'views/videos.html',
        controller: 'VideoListCtrl',
        showNavBar: true,
        showBoardItems: false,
        showBackButton: false,
        reloadOnSearch: false
      }).otherwise({
        redirectTo: '/domain'
      });
    }
  ]);

  wwwApp.factory('lefReset', [
    '$window', 'leadingedgeforum', 'lefStars', 'assetStore', function($window, leadingedgeforum, lefStars, assetStore) {
      return function() {
        lefStars.clear();
        assetStore.clear();
        return $window.localStorage.clear();
      };
    }
  ]);

  _.mixin({
    findLastKey: function(collection, iterator) {
      var lastKey;
      lastKey = void 0;
      _.each(collection, function(value, key) {
        if (iterator(value)) {
          return lastKey = key;
        }
      });
      return lastKey;
    },
    findLastIndex: function(collection, iterator) {
      var lastKey;
      lastKey = _.findLastKey(collection, iterator);
      if (_.isUndefined(lastKey)) {
        return -1;
      } else {
        return lastKey;
      }
    }
  });

}).call(this);




(function() {
  var clearLastDirectionCommand, lastDirectionCommand, onTransitionEnd,
    __slice = [].slice;

  onTransitionEnd = function() {
    var $element, args, callback, namespace;
    $element = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    if (args.length === 1) {
      namespace = '';
      callback = args[0];
    } else if (args.length > 1) {
      namespace = args[0];
      callback = args[1];
    }
    return angular.forEach(['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'otransitionend', 'transitionend'], function(eventName) {
      return $element.on("" + eventName + namespace, callback);
    });
  };

  onTransitionEnd.one = function() {
    var $element, args, callback, namespace;
    $element = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    if (args.length === 1) {
      namespace = '';
      callback = args[0];
    } else if (args.length > 1) {
      namespace = args[0];
      callback = args[1];
    }
    return angular.forEach(['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'otransitionend', 'transitionend'], function(eventName) {
      return $element.one("" + eventName + namespace, callback);
    });
  };

  onTransitionEnd.off = function($element, namespace) {
    if (namespace == null) {
      namespace = '';
    }
    return angular.forEach(['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'otransitionend', 'transitionend'], function(eventName) {
      return $element.off("" + eventName + namespace);
    });
  };

  wwwApp.value('onTransitionEnd', onTransitionEnd);

  lastDirectionCommand = null;

  clearLastDirectionCommand = _.debounce(function() {
    return lastDirectionCommand = null;
  }, 1);

  wwwApp.directive('tnBack', [
    'bindTap', function(bindTap) {
      return {
        priority: 999,
        link: function($scope, $element, $attr) {
          return bindTap($element, function() {
            var goBackward;
            goBackward = true;
            if ($attr.tnBack !== '') {
              goBackward = $scope.$eval($attr.tnBack);
            }
            return lastDirectionCommand = goBackward ? 'backward' : 'forward';
          });
        }
      };
    }
  ]);

  wwwApp.directive('tnForward', [
    'bindTap', function(bindTap) {
      return {
        priority: 999,
        link: function($scope, $element, $attr) {
          return bindTap($element, function() {
            var goForward;
            goForward = true;
            if ($attr.tnForward !== '') {
              goForward = $scope.$eval($attr.tnForward);
            }
            return lastDirectionCommand = goForward ? 'forward' : 'backward';
          });
        }
      };
    }
  ]);

  wwwApp.directive('tnShow', [
    '$timeout', 'onTransitionEnd', function($timeout, onTransitionEnd) {
      var ALL_CLASSES;
      ALL_CLASSES = 'tn-show tn-hide tn-show-forward tn-show-backward tn-hide-forward tn-hide-backward tn-show-forward-start tn-show-backward-start tn-hide-forward-start tn-hide-backward-start';
      return function($scope, $element, $attr) {
        return $scope.$watch($attr.tnShow, function(value) {
          var direction;
          direction = lastDirectionCommand;
          clearLastDirectionCommand();
          if (!direction) {
            $element.css('display', value ? '' : 'none');
            return;
          }
          onTransitionEnd.off($element, '.tnShow');
          if (value) {
            $element.css('display', '');
            $element.removeClass(ALL_CLASSES);
            $element.addClass("tn-show-" + direction + "-start");
            return $timeout(function() {
              $element.removeClass("tn-show-" + direction + "-start");
              return $element.addClass("tn-show tn-show-" + direction);
            });
          } else {
            $element.removeClass(ALL_CLASSES);
            $element.addClass("tn-hide-" + direction + "-start");
            return $timeout(function() {
              $element.removeClass("tn-hide-" + direction + "-start");
              $element.addClass("tn-hide tn-hide-" + direction);
              return onTransitionEnd.one($element, '.tnShow', function() {
                return $element.css('display', 'none');
              });
            });
          }
        });
      };
    }
  ]);

  wwwApp.directive('tnView', [
    '$timeout', '$route', '$compile', '$controller', '$location', '$window', 'onTransitionEnd', function($timeout, $route, $compile, $controller, $location, $window, onTransitionEnd) {
      var ALL_CLASSES;
      ALL_CLASSES = [];
      angular.forEach(['show', 'hide'], function(what) {
        ALL_CLASSES.push("tn-view-" + what);
        return angular.forEach(['forward', 'backward'], function(direction) {
          return ALL_CLASSES.push("tn-view-" + what + "-" + direction + " tn-view-" + what + "-" + direction + "-start'");
        });
      });
      ALL_CLASSES = ALL_CLASSES.join(' ');
      return {
        restrict: 'ECA',
        terminal: true,
        link: function($parentScope, $parentElement, $attr) {
          var currentView, direction, insertView, makeView, removeView, update;
          currentView = null;
          direction = null;
          makeView = function(routeData) {
            var $element, $scope, $tempContainer, controller, link, locals, view;
            view = {};
            locals = routeData.locals;
            $tempContainer = $('<div/>');
            $tempContainer.html(locals.$template);
            $element = $tempContainer.contents();
            $scope = locals.$scope = $parentScope.$new();
            link = $compile($element);
            if (routeData.controller) {
              controller = $controller(routeData.controller, locals);
              $element.data('$ngControllerController', controller);
            }
            link($scope);
            view.$element = $element;
            view.$scope = $scope;
            return view;
          };
          insertView = function(view) {
            $parentElement.append(view.$element);
            view.$scope.$emit('$viewContentLoaded');
            view.$element.removeClass(ALL_CLASSES);
            if (direction) {
              view.$element.addClass("tn-view-show-" + direction + "-start");
              view.$element.attr('tn-in-progress', true);
              return $timeout(function() {
                view.$element.removeClass("tn-view-show-" + direction + "-start");
                view.$element.addClass("tn-view-show tn-view-show-" + direction);
                return onTransitionEnd.one(view.$element, function() {
                  view.$element.attr('tn-in-progress', null);
                  return view.$element.trigger('viewInPlace');
                });
              });
            } else {
              return view.$element.addClass('tn-view-show');
            }
          };
          removeView = function(view) {
            var remove;
            if (!view) {
              return;
            }
            remove = function() {
              view.$element.remove();
              view.$scope.$destroy();
              return $parentScope.$emit('previousViewRemoved');
            };
            view.$element.triggerHandler('transition-hide-start');
            if (!direction) {
              return remove();
            } else {
              view.$element.removeClass(ALL_CLASSES);
              view.$element.addClass("tn-view-hide-" + direction + "-start");
              return $timeout(function() {
                view.$element.removeClass("tn-view-hide-" + direction + "-start");
                view.$element.addClass("tn-view-hide tn-view-hide-" + direction);
                return onTransitionEnd(view.$element, remove);
              });
            }
          };
          update = function() {
            var newView, _ref, _ref1;
            direction = lastDirectionCommand;
            clearLastDirectionCommand();
            if ((_ref = $route.current) != null ? (_ref1 = _ref.locals) != null ? _ref1.$template : void 0 : void 0) {
              newView = makeView($route.current);
              insertView(newView);
              removeView(currentView);
              return currentView = newView;
            }
          };
          $parentScope.$on('$routeChangeSuccess', update);
          return update();
        }
      };
    }
  ]);

}).call(this);


(function() {

  wwwApp.directive('loadRetry', function() {
    return {
      templateUrl: 'views/load-retry.html',
      restrict: 'A',
      replace: true,
      transclude: true,
      scope: true,
      link: function($scope, $element, $attr) {
        return $attr.$observe('loadRetry', function(name) {
          return $scope.$watch(name, function(item) {
            return $scope.item = item;
          });
        });
      }
    };
  });

}).call(this);


(function() {

  wwwApp.directive('cachedImage', [
    'localImageCache', function(localImageCache) {
      return {
        template: '<img/>',
        restrict: 'E',
        replace: true,
        link: function($scope, $element, $attr) {
          return $attr.$observe('url', function(url) {
            $element.attr('src', $attr.placeholder);
            return localImageCache(url).then(function(src) {
              return $element.attr('src', src);
            }, function() {
              return $element.attr('src', url);
            });
          });
        }
      };
    }
  ]);

}).call(this);


(function() {

  wwwApp.directive('pdfViewerAssetStar', [
    '$timeout', '$parse', function($timeout, $parse) {
      return {
        restrict: 'A',
        link: function($scope, $element, $attr) {
          var fn;
          fn = $parse($attr['changed']);
          return $scope.$watch($attr['pdfViewerAssetStar'], function(selected) {
            window["assetStarButtonPressed"] = function() {
              return $scope.$apply(function() {
                return fn($scope);
              });
            };
            return $timeout(function() {
              var frame, id, offset, _ref;
              offset = $element.offset();
              frame = {
                x: offset.left + ($element.innerWidth() - $element.width()) / 2 + $element.width() - 40,
                y: offset.top + ($element.innerHeight() - $element.height()) / 2
              };
              if ((_ref = window.cordova) != null ? _ref.exec : void 0) {
                id = function() {};
                cordova.exec(id, id, "AssetStar", "show", [!!selected, frame]);
                return $element.parents().one('$destroy transition-hide-start', function() {
                  return cordova.exec(id, id, "AssetStar", "hide", []);
                });
              }
            });
          });
        }
      };
    }
  ]);

}).call(this);


(function() {
  var hasTouchSupport, tapSensitivity,
    __slice = [].slice;

  tapSensitivity = 50;

  hasTouchSupport = function() {
    return document.createTouch != null;
  };

  wwwApp.value('bindTap', function() {
    var $element, args, handler, selector;
    $element = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    if (args.length === 2) {
      selector = args[0];
      handler = args[1];
    } else {
      selector = '';
      handler = args[0];
    }
    if (!hasTouchSupport()) {
      return $element.on('click', selector, function(event) {
        return handler.apply(this, [event]);
      });
    } else {
      return $element.on('touchstart', selector, function(event) {
        var $tapped, endHandler, finish, hasScrollParents, moveHandler, scrollHandler, startPosition, stop, stopped;
        $tapped = $(this);
        hasScrollParents = $tapped.parents('[scrollable]').length > 0;
        stopped = false;
        startPosition = [event.originalEvent.touches[0].clientX, event.originalEvent.touches[0].clientY];
        moveHandler = function(event) {
          var position;
          position = [event.originalEvent.touches[0].clientX, event.originalEvent.touches[0].clientY];
          if (Math.abs(position[0] - startPosition[0]) > tapSensitivity || Math.abs(position[1] - startPosition[1]) > tapSensitivity) {
            return stop();
          }
        };
        scrollHandler = function(event) {
          return stop();
        };
        finish = function() {
          if (stopped) {
            return;
          }
          stop();
          return handler.apply(this, [event]);
        };
        endHandler = function(event) {
          event.preventDefault();
          if (hasScrollParents) {
            return setTimeout(finish, 0);
          } else {
            return finish();
          }
        };
        stop = function() {
          stopped = true;
          $tapped.off('touchmove', moveHandler);
          $(document).off('touchmove', moveHandler);
          $tapped.off('touchend', endHandler);
          return $tapped.parents('[scrollable]').off('scroll', scrollHandler);
        };
        $(document).on('touchmove', moveHandler);
        $tapped.on('touchmove', moveHandler);
        $tapped.one('touchend', endHandler);
        return $tapped.parents('[scrollable]').on('scroll', scrollHandler);
      });
    }
  });

  wwwApp.directive('tapHref', [
    '$rootScope', '$location', 'bindTap', function($rootScope, $location, bindTap) {
      return function($scope, $element, $attr) {
        return bindTap($element, function(event) {
          event.preventDefault();
          return $scope.$apply(function() {
            return $location.url($attr['tapHref'].toString());
          });
        });
      };
    }
  ]);

  wwwApp.directive('tap', [
    '$parse', 'bindTap', function($parse, bindTap) {
      return function($scope, $element, $attr) {
        var apply, fn;
        fn = $parse($attr['tap']);
        apply = function(event) {
          return $scope.$apply(function() {
            return fn($scope, {
              $event: event
            });
          });
        };
        return bindTap($element, apply);
      };
    }
  ]);

}).call(this);


(function() {

$.Isotope.prototype._masonryReset = _.wrap($.Isotope.prototype._masonryReset, function(parentFn) {
  this.offset = {
    left: parseInt( ( this.element.css('padding-left') || 0 ), 10 ),
    top: parseInt( ( this.element.css('padding-top') || 0 ), 10 )
  };
  parentFn.apply(this, []);
});

})();

(function() {

  wwwApp.directive('mailTo', [
    'bindTap', 'analytics', function(bindTap, analytics) {
      return function($scope, $element, $attr) {
        return bindTap($element, function(event) {
          var id, mailTo, message, parts, _ref;
          mailTo = $attr.mailTo;
          $element.attr('href', mailTo);
          if ((_ref = window.cordova) != null ? _ref.exec : void 0) {
            event.preventDefault();
            id = function() {};
            parts = mailTo.split(/(mailto:)|\?|\&/g);
            message = {};
            _.chain(parts).filter(function(part) {
              return !!part && part !== 'mailto:' && part !== '';
            }).each(function(part) {
              var key, value, values;
              values = part.split(/\=/g);
              if (values.length === 1) {
                key = "to";
                value = values[0];
              } else if (values.length > 1) {
                key = values[0];
                value = values[1];
              }
              value = value.split(/,/g);
              value = _.chain(value).filter(function(item) {
                return !!item && item !== '';
              }).map(function(item) {
                return item = decodeURIComponent(item);
              }).value();
              if (key === 'subject') {
                return message[key] = value[0];
              } else {
                return message[key] = value;
              }
            });
            analytics.event('mailTo', 'send', "" + mailTo);
            return cordova.exec(id, id, "MailCompose", "send", [message]);
          }
        });
      };
    }
  ]);

}).call(this);


(function() {

  wwwApp.directive('pdfViewer', [
    '$timeout', '$parse', function($timeout, $parse) {
      return {
        restrict: 'A',
        link: function($scope, $element, attr) {
          var errorFn;
          errorFn = $parse(attr.pdfError);
          return attr.$observe('pdfViewer', function(url) {
            var placeViewer;
            if (!url) {
              return;
            }
            placeViewer = function() {
              var id, offset, viewerBounds, _ref;
              offset = $element.offset();
              viewerBounds = {
                x: offset.left + ($element.innerWidth() - $element.width()) / 2,
                y: offset.top + ($element.innerHeight() - $element.height()) / 2,
                width: $element.width(),
                height: $element.height()
              };
              if ((_ref = window.cordova) != null ? _ref.exec : void 0) {
                id = function() {};
                cordova.exec(id, function() {
                  return $scope.$apply(function() {
                    return errorFn($scope);
                  });
                }, "PDFViewer", "show", [viewerBounds, url]);
                return $element.parents().one('$destroy transition-hide-start', function() {
                  return cordova.exec(id, id, "PDFViewer", "hide", []);
                });
              } else {
                return $element.append('<object data="' + url + '" type="application/pdf" width="' + viewerBounds.width + '" height="' + viewerBounds.height + '"/>');
              }
            };
            if ($element.parents('[tn-in-progress]').length > 0) {
              return $element.parents('[tn-view]').one('viewInPlace', placeViewer);
            } else {
              return $timeout(placeViewer);
            }
          });
        }
      };
    }
  ]);

}).call(this);


(function() {

  wwwApp.directive('pinToPreviousElement', function() {
    return {
      restrict: 'A',
      link: function(scope, $element, attr) {
        return scope.$watch(function() {
          var $previous;
          $previous = $element.prev();
          return $element.css({
            top: (parseInt($previous.position().top, 10) + $previous.outerHeight()) + 'px'
          });
        });
      }
    };
  });

  wwwApp.directive('isotope', [
    'bindTap', function(bindTap) {
      return {
        restrict: 'A',
        link: function($scope, $element, $attr) {
          var lastHtml;
          lastHtml = null;
          return $scope.$on('isotopeLastChildReady', function() {
            var relayout, scrollToChild;
            $element.isotope({
              animationEngine: 'css',
              itemSelector: '.isotope-item-included',
              itemPositionDataEnabled: true,
              containerStyle: {
                overflow: ''
              }
            });
            lastHtml = $element.parent().html();
            relayout = setInterval(function() {
              var html;
              html = $element.parent().html();
              if (html !== lastHtml) {
                lastHtml = html;
                return $element.isotope('reLayout', function() {
                  return $element.trigger('isotope-relayout');
                });
              }
            }, 400);
            bindTap($element, '[isotope-tap-triggers-relayout]', function() {
              return setTimeout(function() {
                return $element.isotope('reLayout', function() {
                  return $element.trigger('isotope-relayout');
                });
              }, 10);
            });
            scrollToChild = function(index) {
              var $child, $scrollParent, containsChild, scrollTo, scrollToFinal;
              if (index !== 0 && !index) {
                return;
              }
              index = parseInt(index);
              $child = $element.children().eq(index);
              $scrollParent = $element.parents($attr.isotopeScrollParent).eq(0);
              containsChild = function() {
                var top, viewportLower, viewportUpper, _ref;
                top = (_ref = $child.data('isotope-item-position')) != null ? _ref.y : void 0;
                if (_.isUndefined(top)) {
                  return false;
                }
                viewportLower = $scrollParent.scrollTop();
                viewportUpper = $scrollParent.scrollTop() + $scrollParent.height() - $child.outerHeight();
                return (viewportLower < top && top < viewportUpper);
              };
              scrollTo = function(immediate) {
                var top, _ref;
                if (!containsChild()) {
                  top = (_ref = $child.data('isotope-item-position')) != null ? _ref.y : void 0;
                  if (_.isUndefined(top)) {
                    return false;
                  }
                  if ($scrollParent.children().height() < top) {
                    return;
                  }
                  return $scrollParent.scrollTop(top);
                }
              };
              scrollToFinal = _.once(function() {
                return scrollTo();
              });
              setTimeout(function() {
                return scrollTo();
              }, 200);
              $element.one('isotope-relayout', scrollToFinal);
              return setTimeout(scrollToFinal, 600);
            };
            $attr.$observe('isotopeScrollContainChildIndex', scrollToChild);
            scrollToChild($attr.isotopeScrollContainChildIndex);
            return $element.on('destroy', function() {
              return clearInterval(relayout);
            });
          });
        }
      };
    }
  ]);

  wwwApp.directive('isotopeChild', function() {
    return {
      restrict: 'A',
      link: function($scope, $element, $attr) {
        if ($scope.$last) {
          return $scope.$emit('isotopeLastChildReady');
        }
      }
    };
  });

}).call(this);


(function() {
  var modalVersion, openUrlVersion;

  modalVersion = function() {
    return {
      restrict: 'E',
      replace: true,
      template: "<div id=\"video-modal\" class=\"video-modal modal hide\"\n	 modal-show-when-fulfilled=\"video\"\n	 modal-on-hide=\"onHide()\">\n	<div class=\"modal-body\">\n		<div class=\"close-video\" modal-hide-on-tap></div>\n		<div class=\"video-player\">\n			<h1>{{video.snippet.title}}</h1>\n			<iframe id=\"player\" type=\"text/html\"\n					width=\"640\" height=\"390\"\n					src=\"http://www.youtube.com/embed/{{video.contentDetails.videoId}}?enablejsapi=1&origin=http://example.com\"\n					frameborder=\"0\"></iframe>\n		</div>\n	</div>\n</div>",
      scope: {
        video: '=',
        onHide: '&'
      }
    };
  };

  openUrlVersion = [
    'inAppBrowser', function(inAppBrowser) {
      return {
        restrict: 'E',
        scope: {
          video: '='
        },
        link: function($scope, $element, $attrs) {
          return $scope.$watch('video', function(video) {
            if (!(video != null)) {
              return;
            }
            return inAppBrowser("http://www.youtube.com/embed/" + video.contentDetails.videoId);
          });
        }
      };
    }
  ];

  wwwApp.directive('youtubeVideo', modalVersion);

}).call(this);


(function() {

  wwwApp.directive('modalShowWhenFulfilled', [
    '$parse', 'bindTap', function($parse, bindTap) {
      return {
        restrict: 'A',
        link: function($scope, $element, $attr) {
          var hideFn;
          hideFn = $parse($attr['modalOnHide']);
          return $scope.$watch($attr.modalShowWhenFulfilled, function(value) {
            var promise, showIt;
            promise = $scope[$attr.modalShowWhenFulfilled];
            showIt = function() {
              var $parent;
              $parent = $element.parent();
              $element.appendTo('body');
              $element.modal();
              bindTap($element, '[modal-hide-on-tap]', function() {
                return $element.modal('hide');
              });
              return $element.one('hide', function() {
                return $scope.$apply(function() {
                  $element.appendTo($parent);
                  return hideFn($scope);
                });
              });
            };
            if ((promise != null ? promise.then : void 0) != null) {
              return promise.then(showIt);
            } else if (promise != null) {
              return showIt();
            }
          });
        }
      };
    }
  ]);

}).call(this);


(function() {

  wwwApp.directive('inAppBrowserHref', [
    'inAppBrowser', 'bindTap', function(inAppBrowser, bindTap) {
      return {
        restrict: 'A',
        link: function($scope, $element, $attr) {
          return bindTap($element, function(event) {
            if (!event.originalEvent.defaultPrevented) {
              return inAppBrowser($attr['inAppBrowserHref']);
            }
          });
        }
      };
    }
  ]);

  wwwApp.directive('hrefToInAppBrowser', [
    'inAppBrowser', function(inAppBrowser) {
      return {
        restrict: 'A',
        link: function($scope, $element, $attr) {
          return $element.on('click', '[href]', function(event) {
            var $link;
            $link = $(this);
            event.preventDefault();
            return inAppBrowser($link.attr('href'));
          });
        }
      };
    }
  ]);

  wwwApp.directive('hrefToInAppBrowserViaInterceptor', [
    'inAppBrowser', function(inAppBrowser) {
      return {
        restrict: 'A',
        link: function($scope, $element, $attr) {
          return $element.on('click', '[href]', function(event) {
            var $link;
            $link = $(this);
            event.preventDefault();
            return $scope.$apply(function() {
              var fn, href, text;
              fn = $scope[$attr['hrefToInAppBrowserViaInterceptor']];
              href = $link.attr('href');
              text = $link.text();
              if (!fn(href, text)) {
                return inAppBrowser(href);
              }
            });
          });
        }
      };
    }
  ]);

}).call(this);


(function() {
  var __slice = [].slice;

  document.addEventListener('deviceready', function() {
    var id, _ref;
    if (typeof navigator !== "undefined" && navigator !== null) {
      if ((_ref = navigator.splashscreen) != null) {
        _ref.hide();
      }
    }
    if (typeof cordova !== "undefined" && cordova !== null ? cordova.exec : void 0) {
      id = function() {};
      return cordova.exec(id, id, "GoogleAnalytics", "sendScreenView", ['/domain']);
    }
  });

  window.genericAlert = function() {
    var args, message, _ref, _ref1;
    message = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    if (typeof navigator !== "undefined" && navigator !== null ? (_ref = navigator.notification) != null ? _ref.alert : void 0 : void 0) {
      return (_ref1 = navigator.notification).alert.apply(_ref1, [message].concat(__slice.call(args)));
    } else {
      return alert(message);
    }
  };

  window.genericConfirm = function() {
    var args, cb, message, _ref, _ref1;
    message = arguments[0], cb = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
    if (typeof navigator !== "undefined" && navigator !== null ? (_ref = navigator.notification) != null ? _ref.confirm : void 0 : void 0) {
      return (_ref1 = navigator.notification).confirm.apply(_ref1, [message, cb].concat(__slice.call(args)));
    } else {
      if (confirm(message)) {
        return setTimeout(function() {
          return cb(2);
        }, 0);
      } else {
        return setTimeout(function() {
          return cb(1);
        }, 0);
      }
    }
  };

  wwwApp.controller('AppContainerCtrl', [
    '$rootScope', '$routeParams', '$scope', '$route', '$location', '$timeout', 'leadingedgeforum', 'lefAuthentication', 'analytics', function($rootScope, $routeParams, $scope, $route, $location, $timeout, leadingedgeforum, lefAuthentication, analytics) {
      var backLocationDefault, backLocationFunction, currentLocation, navHistory;
      navHistory = [];
      currentLocation = null;
      $scope.backLocation = null;
      $scope.showBackButton = true;
      $scope.showNavBar = true;
      $scope.showBoardItems = false;
      $scope.wasFromShowNavBar = false;
      backLocationDefault = function(navHistory) {
        return navHistory.length - 1;
      };
      backLocationFunction = null;
      $scope.$on('$locationChangeStart', function() {
        if (currentLocation) {
          navHistory.push(currentLocation);
        }
        currentLocation = $location.url();
        return analytics.screenView(currentLocation);
      });
      $scope.$on('$routeChangeSuccess', function() {
        $scope.previousShowNavBar = $scope.showNavBar;
        $scope.previousShowBoardItems = $scope.showBoardItems;
        $scope.showBackButton = $route.current.showBackButton;
        if (!$route.current.showBackButton) {
          navHistory.length = 0;
        }
        $scope.showNavBar = $route.current.showNavBar;
        backLocationFunction = $route.current.backLocation || backLocationDefault;
        $scope.showBoardItems = !!$route.current.showBoardItems;
        return $scope.routeBase = $location.path().split('/')[1];
      });
      window.pdfViewerFullScreenEvent = function(fullscreen) {
        return $timeout(function() {
          return $scope.pdfViewerFullscreen = !!fullscreen;
        });
      };
      $scope.goBack = function() {
        var destination, location;
        destination = null;
        location = backLocationFunction(navHistory, $routeParams, $location.search());
        if (_.isString(location)) {
          navHistory.length = 0;
          destination = location;
        } else {
          navHistory.length = location + 1;
          destination = navHistory.pop();
        }
        currentLocation = null;
        return $location.url(destination);
      };
      return $scope.loadMyLibrary = function() {
        return $location.url('/my-library');
      };
    }
  ]);

  wwwApp.controller('UserProfileCtrl', [
    '$scope', 'lefAuthentication', 'lefReset', function($scope, lefAuthentication, lefReset) {
      lefAuthentication.on('authenticated', function(user) {
        return $scope.user = user;
      });
      return $scope.logout = function() {
        lefAuthentication.logout();
        return lefReset();
      };
    }
  ]);

  wwwApp.controller('LoginScreenCtrl', [
    '$scope', 'lefAuthentication', function($scope, lefAuthentication) {
      $scope.authenticationState = 'unauthenticated';
      $scope.lastAuthenticationError = null;
      $scope.username = null;
      $scope.password = null;
      lefAuthentication.on('authenticating', function() {
        $scope.authenticationState = 'authenticating';
        $scope.lastAuthenticationError = null;
        return $('*').blur();
      });
      lefAuthentication.on('authenticated', function() {
        $scope.authenticationState = 'authenticated';
        $scope.lastAuthenticationError = null;
        return $scope.password = null;
      });
      lefAuthentication.on('unauthenticated', function(reason) {
        $scope.authenticationState = 'unauthenticated';
        $scope.lastAuthenticationError = reason;
        return $scope.password = null;
      });
      $scope.showResetPassword = function() {
        $scope.authenticationState = 'must-reset-password';
        return $scope.passwordResetError = null;
      };
      $scope.showLogin = function() {
        return $scope.authenticationState = 'unauthenticated';
      };
      $scope.authenticate = function(username, password) {
        return lefAuthentication.authenticate({
          username: username,
          password: password
        });
      };
      $scope.resetPassword = function(username) {
        $scope.authenticationState = 'resetting-password';
        return lefAuthentication.sendResetRequest(username).then(function() {
          $scope.passwordResetError = null;
          return $scope.authenticationState = 'password-reset-sent';
        }, function(reason) {
          $scope.authenticationState = 'must-reset-password';
          return $scope.passwordResetError = reason;
        });
      };
      return lefAuthentication.authenticateWithStoredCredentials();
    }
  ]);

  wwwApp.controller('ResearcherListCtrl', [
    '$scope', '$location', '$routeParams', 'leadingedgeforum', 'lefCheckLink', function($scope, $location, $routeParams, leadingedgeforum, lefCheckLink) {
      var setSelectedResearcher;
      $scope.researchers = leadingedgeforum.Researcher.queryTopResearchers();
      $scope.hasPosition = function(researcher) {
        return researcher.position !== "";
      };
      setSelectedResearcher = function() {
        var searchParams;
        searchParams = $location.search();
        if (searchParams.id) {
          $scope.selectedResearcherId = parseInt(searchParams.id);
          $scope.selectedResearcher = leadingedgeforum.Researcher.get(searchParams.id);
          return $scope.researchers.then(function(researchers) {
            return _.chain(researchers).filter($scope.hasPosition).each(function(researcher, index) {
              if (researcher.id === $scope.selectedResearcherId) {
                return $scope.selectedResearcherIndex = index;
              }
            });
          });
        } else {
          $scope.selectedResearcherId = void 0;
          $scope.selectedResearcher = void 0;
          return $scope.selectedResearcherIndex = 0;
        }
      };
      $scope.viewResearcher = function(researcher) {
        if ($scope.selectedResearcherId === researcher.id) {
          return $location.search({});
        } else {
          return $location.search({
            id: researcher.id
          });
        }
      };
      $scope.$on('$locationChangeStart', function() {
        return setSelectedResearcher();
      });
      setSelectedResearcher();
      $scope.isSelected = function(researcher) {
        return researcher && researcher.id === $scope.selectedResearcherId;
      };
      return $scope.checkLink = lefCheckLink;
    }
  ]);

  wwwApp.controller('ContactViewCtrl', [
    '$scope', '$location', '$routeParams', 'leadingedgeforum', function($scope, $location, $routeParams, leadingedgeforum) {
      $scope.regions = leadingedgeforum.Contact.query();
      $scope.activeRegion = null;
      $scope.activeRegionName = null;
      $scope.isActive = function(regionName) {
        return regionName === $scope.activeRegionName;
      };
      return $scope.toggleActive = function(regionName) {
        if ($scope.isActive(regionName)) {
          $scope.activeRegionName = null;
          return $scope.activeRegion = null;
        } else {
          $scope.activeRegionName = regionName;
          return $scope.regions.then(function(regions) {
            return $scope.activeRegion = _.findWhere(regions, {
              name: regionName
            });
          });
        }
      };
    }
  ]);

  wwwApp.controller('DomainListCtrl', [
    '$scope', '$location', '$routeParams', 'leadingedgeforum', function($scope, $location, $routeParams, leadingedgeforum) {
      $scope.domains = leadingedgeforum.Domain.query();
      $scope.domainColours = leadingedgeforum.domainColours;
      $scope.viewDomain = function(domain) {
        return $location.url('/domain/' + domain.id);
      };
      return $scope.viewBlog = function(domain) {
        return $location.url('/blog');
      };
    }
  ]);

  wwwApp.controller('DomainViewCtrl', [
    '$scope', '$location', '$routeParams', 'leadingedgeforum', function($scope, $location, $routeParams, leadingedgeforum) {
      $scope.domainColours = leadingedgeforum.domainColours;
      $scope.domainId = $routeParams.domainId;
      $scope.domain = leadingedgeforum.Domain.get($routeParams.domainId);
      return $scope.viewProject = function(project) {
        return $location.url('/domain/' + $routeParams.domainId + '/project/' + project.id);
      };
    }
  ]);

  wwwApp.controller('ProjectViewCtrl', [
    '$scope', '$location', '$routeParams', 'lefStars', 'assetStore', 'leadingedgeforum', 'lefCheckLink', function($scope, $location, $routeParams, lefStars, assetStore, leadingedgeforum, lefCheckLink) {
      $scope.project = leadingedgeforum.Project.get($routeParams.domainId, $routeParams.projectId);
      $scope.checkLink = lefCheckLink;
      if ($routeParams.assetId) {
        $scope.subTemplate = 'views/project-asset.html';
        $scope.asset = leadingedgeforum.Asset.get(parseInt($routeParams.assetId, 10));
        $scope.pdfViewerError = function() {
          return $scope.asset.then(function() {
            return $scope.assetDownload.hadError('Error showing PDF. Please retry.');
          });
        };
        $scope.asset.then(function(asset) {
          return $scope.assetDownload = assetStore.download(asset);
        });
      } else {
        $scope.subTemplate = 'views/project-description.html';
      }
      $scope.viewAsset = function(asset) {
        return $scope.project.then(function(project) {
          return $location.url('/domain/' + project.domain.id + '/project/' + project.id + '/asset/' + asset.id);
        });
      };
      return $scope.lefStars = lefStars;
    }
  ]);

  wwwApp.controller('MyLibraryViewCtrl', [
    '$scope', '$location', '$routeParams', 'lefStars', 'assetStore', 'leadingedgeforum', function($scope, $location, $routeParams, lefStars, assetStore, leadingedgeforum) {
      if ($routeParams.assetId) {
        $scope.subTemplate = 'views/my-library-asset.html';
        $scope.activeAsset = leadingedgeforum.Asset.get(parseInt($routeParams.assetId, 10));
        $scope.pdfViewerError = function() {
          return $scope.activeAsset.then(function() {
            return $scope.assetDownload.hadError('Error showing PDF. Please retry.');
          });
        };
        $scope.activeAsset.then(function(asset) {
          return $scope.assetDownload = assetStore.download(asset);
        });
      }
      $scope.lefStars = lefStars;
      $scope.sortedAssets = [];
      $scope.$watch('lefStars.starredAssets.length', function() {
        $scope.sortedAssets = [];
        console.log("Detected starred assets length change");
        return angular.forEach($scope.lefStars.starredAssets, function(assetId) {
          return leadingedgeforum.Asset.get(assetId).then(function(asset) {
            return $scope.sortedAssets = _.sortBy($scope.sortedAssets.concat(asset), function(asset) {
              return asset.project.id;
            });
          });
        });
      });
      return $scope.viewAsset = function(asset) {
        return $location.url('/my-library/asset/' + asset.id);
      };
    }
  ]);

  wwwApp.controller('EventListCtrl', [
    '$scope', '$location', '$q', 'leadingedgeforum', 'inAppBrowser', 'calendar', function($scope, $location, $q, leadingedgeforum, inAppBrowser, calendar) {
      var getCalendarEvent, monthNames, savedEvents, savingEvents;
      $scope.events = leadingedgeforum.Event.query();
      savedEvents = [];
      savingEvents = [];
      getCalendarEvent = function(event) {
        return {
          title: "Leading Edge Forum: " + event.title,
          startDate: event.when,
          endDate: event.ends
        };
      };
      $scope.events.then(function(events) {
        return angular.forEach(events, function(event) {
          return calendar.findEvent(getCalendarEvent(event)).then(function() {
            return savedEvents.push(event.id);
          });
        });
      });
      $scope.saveEvent = function(event) {
        if ($scope.saveState(event) === 'unsaved') {
          savingEvents.push(event.id);
          return calendar.addEvent(getCalendarEvent(event)).then(function() {
            savingEvents = _.without(savingEvents, event.id);
            savedEvents.push(event.id);
            if (!event.registrationAvailable) {
              return genericAlert("The event was added to your default calendar.\n\nTo find out more details (including how to register,) please visit the LEF website.", null, "Event added to calendar", "Close");
            } else {
              return genericConfirm("Don't forget to register for the event on the LEF website. Would you like to do it now?", function(buttonPressed) {
                if (buttonPressed === 2) {
                  return inAppBrowser("http://lef.csc.com/events/" + event.id + "#register");
                }
              }, "Event added to calendar", "Register Later,Learn More");
            }
          }, function() {
            return savingEvents = _.without(savingEvents, event.id);
          });
        }
      };
      $scope.saveState = function(event) {
        if (_.contains(savingEvents, event.id)) {
          return 'saving';
        } else if (_.contains(savedEvents, event.id)) {
          return 'saved';
        }
        return 'unsaved';
      };
      monthNames = {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December'
      };
      $scope.$watch('events.length', function() {
        return $scope.events.then(function(events) {
          return $scope.eventsByMonth = _.chain(events).groupBy(function(event) {
            var _ref;
            return parseInt((_ref = event.when.split(/\//)) != null ? _ref[1] : void 0);
          }).map(function(events, monthNumber) {
            return {
              monthNumber: parseInt(monthNumber, 10),
              events: events
            };
          }).sortBy('monthNumber').map(function(month) {
            return {
              monthName: monthNames[month.monthNumber],
              events: _.sortBy(month.events, 'when')
            };
          }).value();
        });
      });
      moment.lang('en', {
        relativeTime: {
          future: "in %s",
          past: "%s ago",
          s: "seconds",
          m: "1 minute",
          mm: "%d minutes",
          h: "1 hour",
          hh: "%d hours",
          d: "1 day",
          dd: "%d days",
          M: "1 month",
          MM: "%d months",
          y: "1 year",
          yy: "%d years"
        }
      });
      $scope.formatDuration = function(dateString1, dateString2) {
        return moment(dateString1).from(dateString2, true);
      };
      return $scope.formatMonth = function(date) {
        var month, parts;
        if (!((date != null ? date.split : void 0) != null)) {
          return date;
        }
        parts = date.split(/[T-]/);
        month = monthNames[parseInt(parts[1].replace(/^0+/, ''))];
        return "" + month + " " + parts[2];
      };
    }
  ]);

  wwwApp.controller('VideoListCtrl', [
    '$scope', '$location', '$timeout', 'leadingedgeforum', function($scope, $location, $timeout, leadingedgeforum) {
      var setVideo;
      $scope.playlist = leadingedgeforum.Video.query();
      setVideo = function() {
        var searchParams;
        searchParams = $location.search();
        if (searchParams.videoId) {
          $scope.video = null;
          return $timeout(function() {
            return $scope.video = leadingedgeforum.Video.get(searchParams.videoId);
          });
        } else {
          return $scope.video = void 0;
        }
      };
      $scope.$on('$locationChangeStart', function() {
        return setVideo();
      });
      setVideo();
      $scope.formatPublishedAt = function(date) {
        return date.substr(0, 10);
      };
      return $scope.viewVideo = function(video) {
        if (!video) {
          return $location.search({});
        } else {
          return $location.search({
            videoId: video.id
          });
        }
      };
    }
  ]);

  wwwApp.filter('pluck', function() {
    return function(input, name) {
      return _.pluck(input, name);
    };
  });

  wwwApp.filter('join', function() {
    return function(input, separator) {
      return input.join(separator);
    };
  });

  wwwApp.filter('format', function() {
    return function(input, expression) {
      return typeof expression === "function" ? expression(input) : void 0;
    };
  });

  wwwApp.filter('groupBy', function() {
    return function(input, expression) {
      return _.groupBy(input, expression);
    };
  });

}).call(this);



/*
Provides a factory function that generates a hierarchically organised structure of defers.
*/


(function() {
  var __slice = [].slice;

  wwwApp.factory('modelStore', [
    '$q', function($q) {
      return function() {
        var query, store;
        query = $q.defer();
        store = {
          query: function() {
            return query;
          },
          items: {},
          all: [],
          get: function() {
            var args, currentLevel, id, _i, _len, _ref;
            args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            currentLevel = store.items;
            for (_i = 0, _len = args.length; _i < _len; _i++) {
              id = args[_i];
              if ((_ref = currentLevel[id]) == null) {
                currentLevel[id] = {};
              }
              currentLevel = currentLevel[id];
            }
            if (!currentLevel.defer) {
              currentLevel.defer = $q.defer();
              currentLevel.defer.promise.then(function(result) {
                return store.all.push(result);
              });
            }
            return currentLevel.defer;
          },
          "public": function() {
            return {
              query: function() {
                return store.query().promise;
              },
              get: function() {
                var args;
                args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
                return store.get.apply(store, args).promise;
              },
              all: function() {
                return store.all;
              }
            };
          }
        };
        return store;
      };
    }
  ]);

}).call(this);


(function() {

  wwwApp.factory('calendar', [
    '$q', '$timeout', 'analytics', function($q, $timeout, analytics) {
      return {
        addEvent: function(eventDetails) {
          var deferred;
          deferred = $q.defer();
          if (typeof cordova !== "undefined" && cordova !== null ? cordova.exec : void 0) {
            analytics.event('calendar', 'add', eventDetails.title);
            cordova.exec(function() {
              return $timeout(function() {
                return deferred.resolve();
              });
            }, function() {
              return $timeout(function() {
                return deferred.reject();
              });
            }, "CalendarPlugin", "addEvent", [eventDetails]);
          } else {
            deferred.resolve();
          }
          return deferred.promise;
        },
        findEvent: function(eventDetails) {
          var deferred;
          deferred = $q.defer();
          if (typeof cordova !== "undefined" && cordova !== null ? cordova.exec : void 0) {
            cordova.exec(function(eventIds) {
              return $timeout(function() {
                if (eventIds.length > 0) {
                  return deferred.resolve(eventIds[0]);
                } else {
                  return deferred.reject();
                }
              });
            }, function() {
              return $timeout(function() {
                return deferred.reject();
              });
            }, "CalendarPlugin", "findEvents", [eventDetails]);
          } else {
            deferred.reject();
          }
          return deferred.promise;
        }
      };
    }
  ]);

}).call(this);


(function() {

  wwwApp.factory('analytics', [
    '$window', function($window) {
      return {
        screenView: function(screenName) {
          var id, _ref;
          if ((_ref = $window.cordova) != null ? _ref.exec : void 0) {
            id = function() {};
            return $window.cordova.exec(id, id, "GoogleAnalytics", "sendScreenView", [screenName]);
          }
        },
        event: function(eventCategory, eventName, eventLabel, eventValue) {
          var id, _ref;
          if ((_ref = $window.cordova) != null ? _ref.exec : void 0) {
            id = function() {};
            return $window.cordova.exec(id, id, "GoogleAnalytics", "sendEvent", [eventCategory, eventName, eventLabel, parseInt(eventValue, 10)]);
          }
        },
        username: function(username) {
          var id, _ref;
          if ((_ref = $window.cordova) != null ? _ref.exec : void 0) {
            id = function() {};
            return $window.cordova.exec(id, id, "GoogleAnalytics", "setUsername", [username]);
          }
        }
      };
    }
  ]);

}).call(this);


(function() {

  wwwApp.factory('youtube', [
    '$http', '$window', '$q', function($http, $window, $q) {
      var playlistPromises;
      playlistPromises = {};
      return {
        playlist: function(playlistId) {
          var getPage, videos;
          if (playlistPromises[playlistId]) {
            return playlistPromises[playlistId];
          }
          videos = [];
          getPage = function(pageToken) {
            return $http.get("https://www.googleapis.com/youtube/v3/playlistItems", {
              params: {
                part: "id,snippet,contentDetails",
                playlistId: playlistId,
                maxResults: 50,
                key: "AIzaSyCuOFqrnRwzrUY59rpRoKaEEw7UBid-8uo",
                pageToken: pageToken
              }
            }).then(function(result) {
              videos = videos.concat(result.data.items);
              if (result.data.nextPageToken) {
                return getPage(result.data.nextPageToken);
              } else {
                return videos;
              }
            });
          };
          playlistPromises[playlistId] = getPage();
          return playlistPromises[playlistId];
        }
      };
    }
  ]);

}).call(this);


(function() {
  var __slice = [].slice;

  wwwApp.factory('httpPipeline', [
    '$http', '$q', function($http, $q) {
      var dequeueNext, enqueueRequest, httpPipeline, limit, queue, running;
      limit = 7;
      running = 0;
      queue = [];
      dequeueNext = function() {
        var httpCall, request;
        if (running >= limit || queue.length === 0) {
          return;
        }
        running++;
        request = queue.shift();
        httpCall = request.method ? $http[request.method] : $http;
        return httpCall.apply(null, request.args).then(function() {
          var args, _ref;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          running--;
          (_ref = request.deferred).resolve.apply(_ref, args);
          return dequeueNext();
        }, function() {
          var args, _ref;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          running--;
          (_ref = request.deferred).reject.apply(_ref, args);
          return dequeueNext();
        });
      };
      enqueueRequest = function(method, args) {
        var deferred;
        deferred = $q.defer();
        queue.push({
          method: method,
          deferred: deferred,
          args: args
        });
        dequeueNext();
        return deferred.promise;
      };
      httpPipeline = function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return enqueueRequest(null, args);
      };
      angular.forEach(['get', 'head', 'post', 'put', 'delete', 'jsonp'], function(method) {
        return httpPipeline[method] = function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          return enqueueRequest(method, args);
        };
      });
      httpPipeline.setLimit = function(newLimit) {
        limit = newLimit;
        return dequeueNext();
      };
      return httpPipeline;
    }
  ]);

}).call(this);


(function() {
  var assert, mergeArray;

  mergeArray = function(originalArray, newArray) {
    var merged;
    merged = [];
    angular.forEach(newArray, function(newObj) {
      angular.forEach(originalArray, function(existingObj) {
        if (existingObj.id === newObj.id) {
          angular.extend(existingObj, newObj);
          newObj = existingObj;
          return false;
        }
      });
      return merged.push(newObj);
    });
    originalArray.length = 0;
    return angular.forEach(merged, function(obj) {
      return originalArray.push(obj);
    });
  };

  assert = function(a, message) {
    if (!a) {
      throw new Error("" + message + ": must be truthy: " + a);
    }
  };

  wwwApp.factory('nestedModel', [
    function() {
      var createModel;
      createModel = function($request, modelSpec) {
        var $processList, attachRetryMethod, contains, events, get, inferEndpoint, mergeNewData, modelContains, onEvent, query, queryList, trigger, updateContainedModels, _ref;
        events = {
          query: [],
          get: []
        };
        modelContains = {};
        queryList = [];
        if ((_ref = modelSpec.suffix) == null) {
          modelSpec.suffix = '';
        }
        queryList.retry = function(allowCache) {
          if (allowCache == null) {
            allowCache = true;
          }
          if (queryList.loadState === 'failed') {
            queryList.loadState = null;
          }
          return query(allowCache);
        };
        trigger = function(name, data) {
          var _ref1, _ref2;
          if (!((_ref1 = data.$hasTriggered) != null ? _ref1[name] : void 0)) {
            if ((_ref2 = data.$hasTriggered) == null) {
              data.$hasTriggered = {};
            }
            data.$hasTriggered[name] = true;
            return angular.forEach(events[name], function(fn) {
              return fn(data);
            });
          }
        };
        inferEndpoint = function(data) {
          if (modelSpec.subPath) {
            return "" + data[modelSpec.parentReference].endpoint + modelSpec.subPath + "/" + data.id;
          } else {
            return "" + modelSpec.path + "/" + data.id;
          }
        };
        updateContainedModels = function(data, allowCache) {
          if (allowCache == null) {
            allowCache = true;
          }
          return angular.forEach(modelContains, function(childModel, childReference) {
            if (childModel.$spec.parentReference) {
              angular.forEach(data[childReference], function(childData) {
                return childData[childModel.$spec.parentReference] = data;
              });
            }
            return data[childReference] = childModel.$processList(data[childReference], allowCache);
          });
        };
        attachRetryMethod = function(data) {
          if (data.retry) {
            return;
          }
          return data.retry = function(allowCache) {
            if (allowCache == null) {
              allowCache = true;
            }
            if (data.loadState === 'failed') {
              data.loadState = null;
            }
            return get(data, allowCache);
          };
        };
        /*
                Goes through a list of items provided by a parent model and links
                them up with any existing items
        */

        $processList = function(dataList, allowCache) {
          if (allowCache == null) {
            allowCache = true;
          }
          return _.map(dataList, function(data) {
            var _base, _name, _ref1;
            data.endpoint = inferEndpoint(data);
            if (modelSpec.itemStore) {
              if ((_ref1 = (_base = modelSpec.itemStore)[_name = data.id]) == null) {
                _base[_name] = data;
              }
              data = modelSpec.itemStore[data.id];
            }
            trigger('get', data);
            if (modelSpec.getAfterQuery !== false) {
              get(data, allowCache);
            }
            return data;
          });
        };
        /*
                Attach an event listener to the model.
        */

        onEvent = function(event, fn) {
          events[event].push(fn);
          return this;
        };
        /*
                Creates a new model that can be found at data[key] of the
                parent module instances.
        */

        contains = function(key, childModel) {
          if (!childModel.$spec) {
            childModel = createModel($request, childModel);
          }
          modelContains[key] = childModel;
          return childModel;
        };
        /*
                Request the list of items using the query URL.
                Immediately returns a list which it will later fill with data.
        */

        query = function(allowCache) {
          if (allowCache == null) {
            allowCache = true;
          }
          assert(modelSpec.path, "Model must have path in order to query");
          if (queryList.$querying) {
            return queryList;
          }
          queryList.$querying = true;
          $request("" + modelSpec.path + modelSpec.suffix, allowCache, function(resultList, cacheInvalidated) {
            if (cacheInvalidated == null) {
              cacheInvalidated = false;
            }
            allowCache = !cacheInvalidated && allowCache;
            mergeArray(queryList, resultList);
            queryList.loadState = 'loaded';
            trigger('query', queryList);
            angular.forEach(queryList, function(data) {
              data.endpoint = inferEndpoint(data);
              return trigger('get', data);
            });
            if (modelSpec.getAfterQuery !== false) {
              return angular.forEach(queryList, function(data) {
                return get(data, allowCache);
              });
            }
          }).then(function() {
            return queryList.$querying = false;
          }, function() {
            queryList.$querying = false;
            queryList.loadState = 'failed';
            return trigger('query', queryList);
          });
          return queryList;
        };
        mergeNewData = function(data, newData) {
          var childItems;
          childItems = {};
          angular.forEach(modelContains, function(childModel, childReference) {
            return childItems[childReference] = data[childReference];
          });
          angular.extend(data, newData);
          return angular.forEach(childItems, function(childData, childReference) {
            var newChildData;
            newChildData = data[childReference];
            if (childData == null) {
              childData = [];
            }
            mergeArray(childData, newChildData);
            return data[childReference] = childData;
          });
        };
        /*
                Given a basic data object that at least contains an id, fill it in by
                requesting its endpoint URL.
        */

        get = function(data, allowCache) {
          if (allowCache == null) {
            allowCache = true;
          }
          if (data.$getting) {
            return;
          }
          data.$getting = true;
          data.endpoint = inferEndpoint(data);
          attachRetryMethod(data);
          return $request("" + data.endpoint + modelSpec.suffix, allowCache, function(result, cacheInvalidated) {
            if (cacheInvalidated == null) {
              cacheInvalidated = false;
            }
            allowCache = !cacheInvalidated && allowCache;
            mergeNewData(data, result);
            updateContainedModels(data, allowCache);
            data.loadState = 'loaded';
            return trigger('get', data);
          }).then(function() {
            return data.$getting = false;
          }, function() {
            data.$getting = false;
            data.loadState = 'failed';
            return trigger('get', data);
          });
        };
        return {
          $spec: modelSpec,
          $processList: $processList,
          on: onEvent,
          contains: contains,
          query: query,
          get: get
        };
      };
      return createModel;
    }
  ]);

}).call(this);


(function() {

  wwwApp.factory('localImageCache', [
    '$window', '$q', '$timeout', function($window, $q, $timeout) {
      var imagePromises;
      imagePromises = {};
      return function(url) {
        var $img, defer;
        if (imagePromises[url]) {
          return imagePromises[url];
        }
        defer = $q.defer();
        if ($window.localStorage["localImageCache:" + url]) {
          defer.resolve($window.localStorage["localImageCache:" + url]);
        } else {
          $img = $('<img>').attr('src', url).on('load', function() {
            var canvas, ctx, dataUrl, height, width;
            try {
              width = $img.get(0).width;
              height = $img.get(0).height;
              canvas = $("<canvas width=\"" + width + "\" height=\"" + height + "\"/>").get(0);
              ctx = canvas.getContext('2d');
              ctx.drawImage($img.get(0), 0, 0);
              dataUrl = canvas.toDataURL('image/png');
              $window.localStorage["localImageCache:" + url] = dataUrl;
              return $timeout(function() {
                return defer.resolve(dataUrl);
              });
            } catch (e) {
              return defer.reject('security error');
            }
          }).on('error, abort', function() {
            return $timeout(function() {
              return defer.reject('aborted');
            });
          });
        }
        return defer.promise;
      };
    }
  ]);

}).call(this);


(function() {

  wwwApp.factory('lefStars', [
    '$window', '$q', 'assetStore', 'analytics', function($window, $q, assetStore, analytics) {
      var addAsset, clear, isStarredAsset, removeAsset, starredAssets, toggleAsset, updateStorage;
      starredAssets = [];
      if ($window.localStorage['lefStars:starredAssets']) {
        starredAssets = JSON.parse($window.localStorage['lefStars:starredAssets']);
      }
      updateStorage = function() {
        return $window.localStorage['lefStars:starredAssets'] = JSON.stringify(starredAssets);
      };
      addAsset = function(asset) {
        if (!isStarredAsset(asset)) {
          analytics.event('stars', 'starAsset', asset.name, asset.id);
          starredAssets.push(asset.id);
          assetStore.store(asset).then(_.identity, function() {
            genericAlert("We were unable to star " + asset.name + "; this usually means you don't have access to the internet. Please try again later.", null, "Error", "Close");
            return removeAsset(asset);
          });
          return updateStorage();
        }
      };
      removeAsset = function(asset) {
        var index;
        index = starredAssets.indexOf(asset.id);
        if (index !== -1) {
          analytics.event('stars', 'unstarAsset', asset.name, asset.id);
          starredAssets.splice(index, 1);
          assetStore.remove(asset);
          return updateStorage();
        }
      };
      toggleAsset = function(asset) {
        if (isStarredAsset(asset)) {
          return removeAsset(asset);
        } else {
          return addAsset(asset);
        }
      };
      isStarredAsset = function(asset) {
        return starredAssets.indexOf(asset.id) !== -1;
      };
      clear = function() {
        starredAssets.length = 0;
        return updateStorage();
      };
      return {
        addAsset: addAsset,
        removeAsset: removeAsset,
        toggleAsset: toggleAsset,
        isStarredAsset: isStarredAsset,
        clear: clear,
        starredAssets: starredAssets
      };
    }
  ]);

}).call(this);


(function() {

  wwwApp.factory('inAppBrowser', [
    '$window', 'analytics', function($window, analytics) {
      return function(url) {
        analytics.event('inAppBrowser', 'openUrl', url);
        return $window.open(url, '_blank', 'location=yes');
      };
    }
  ]);

}).call(this);


(function() {
  var __slice = [].slice;

  wwwApp.value('fileApi', window);

  wwwApp.factory('assetStoreBackend', [
    '$q', '$timeout', 'fileApi', function($q, $timeout, fileApi) {
      var clearDownloaded, clearStored, copyFromStored, copyToStored, downloadFile, existingDownloads, getDownloadPath, getDownloadedFile, getFile, getPersistentFs, getStoredFile, getStoredPath, getTemporaryFs, persistentFsPromise, qFn, qFnBind, removeDirectoryIfExists, removeDownloaded, removeStored, requestAsset, temporaryFsPromise;
      qFn = function() {
        var args, fn;
        fn = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        return qFnBind.apply(null, [fn, null].concat(__slice.call(args)));
      };
      qFnBind = function() {
        var args, d, fn, obj;
        fn = arguments[0], obj = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
        d = $q.defer();
        _.bind.apply(_, [fn, obj].concat(__slice.call(args)))(function() {
          var successArgs;
          successArgs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          return $timeout(function() {
            return d.resolve.apply(d, successArgs);
          });
        }, function() {
          var failureArgs;
          failureArgs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          return $timeout(function() {
            return d.reject.apply(d, failureArgs);
          });
        });
        return d.promise;
      };
      persistentFsPromise = null;
      temporaryFsPromise = null;
      getTemporaryFs = function() {
        if (temporaryFsPromise) {
          return temporaryFsPromise;
        }
        temporaryFsPromise = qFn(fileApi.requestFileSystem, fileApi.LocalFileSystem.TEMPORARY, 0);
        return temporaryFsPromise;
      };
      getPersistentFs = function() {
        if (persistentFsPromise) {
          return persistentFsPromise;
        }
        persistentFsPromise = qFn(fileApi.requestFileSystem, fileApi.LocalFileSystem.PERSISTENT, 0);
        return persistentFsPromise;
      };
      getDownloadPath = function(asset) {
        return "downloaded_assets/" + asset.id + ".pdf";
      };
      getStoredPath = function(asset) {
        return "stored_assets/" + asset.id + ".pdf";
      };
      getFile = function(fs, path) {
        return qFnBind(fs.root.getFile, fs.root, path, {
          create: false
        });
      };
      removeDirectoryIfExists = function(fs, path) {
        return qFnBind(fs.root.getDirectory, fs.root, path, {
          create: false
        }).then(function(directoryEntry) {
          return qFnBind(directoryEntry.removeRecursively, directoryEntry);
        }, function(error) {
          if (error.code === fileApi.FileError.NOT_FOUND_ERR) {
            return $q.when(true);
          }
          return error;
        });
      };
      getDownloadedFile = function(asset) {
        return getTemporaryFs().then(function(temporaryFs) {
          return getFile(temporaryFs, getDownloadPath(asset));
        });
      };
      getStoredFile = function(asset) {
        return getPersistentFs().then(function(persistentFs) {
          return getFile(persistentFs, getStoredPath(asset));
        });
      };
      existingDownloads = {};
      downloadFile = function(asset, reportProgress) {
        var downloadedEntry, fileTransfer, promise;
        if (!(existingDownloads[asset.id] != null)) {
          fileTransfer = new fileApi.FileTransfer();
          downloadedEntry = null;
          promise = getTemporaryFs().then(function(temporaryFs) {
            return qFnBind(fileTransfer.download, fileTransfer, asset.downloadUrl, "" + temporaryFs.root.fullPath + "/" + (getDownloadPath(asset)));
          }).then(function(fileEntry) {
            downloadedEntry = fileEntry;
            return qFnBind(downloadedEntry.file, downloadedEntry);
          }).then(function(file) {
            var d, fileHeader, fileReader;
            fileHeader = file.slice(0, 4);
            fileReader = new fileApi.FileReader();
            d = $q.defer();
            fileReader.onloadend = function() {
              var args;
              args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
              return $timeout(function() {
                return d.resolve.apply(d, args);
              });
            };
            fileReader.readAsText(fileHeader);
            return d.promise;
          }).then(function(event) {
            if (event.target.result !== '%PDF') {
              return $q.reject('File is not a PDF');
            }
            return downloadedEntry;
          });
          if (reportProgress != null) {
            fileTransfer.onprogress = function(progressEvent) {
              return $timeout(function() {
                var percentComplete, progressCallback, _i, _len, _ref, _results;
                percentComplete = parseInt(100 * progressEvent.loaded / progressEvent.total);
                _ref = promise.progressCallbacks;
                _results = [];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                  progressCallback = _ref[_i];
                  _results.push(progressCallback(percentComplete));
                }
                return _results;
              });
            };
          }
          promise.progressCallbacks = [];
          promise.then(function() {
            return delete existingDownloads[asset.id];
          }, function() {
            return delete existingDownloads[asset.id];
          });
          existingDownloads[asset.id] = promise;
        }
        existingDownloads[asset.id].progressCallbacks.push(reportProgress);
        return existingDownloads[asset.id];
      };
      copyFromStored = function(asset, storedFile) {
        return getTemporaryFs().then(function(temporaryFs) {
          return qFnBind(temporaryFs.root.getDirectory, temporaryFs.root, "downloaded_assets", {
            create: true
          });
        }).then(function(directoryEntry) {
          return qFnBind(storedFile.copyTo, storedFile, directoryEntry, null);
        });
      };
      copyToStored = function(asset, downloadedFile) {
        return removeStored(asset).then(function() {
          return getPersistentFs();
        }).then(function(persistentFs) {
          return qFnBind(persistentFs.root.getDirectory, persistentFs.root, "stored_assets", {
            create: true
          });
        }).then(function(directoryEntry) {
          return qFnBind(downloadedFile.copyTo, downloadedFile, directoryEntry, null);
        });
      };
      removeStored = function(asset) {
        return getStoredFile(asset).then(function(storedFile) {
          return qFnBind(storedFile.remove, storedFile);
        }, function(error) {
          if (error.code === fileApi.FileError.NOT_FOUND_ERR) {
            return $q.when(true);
          }
          return error;
        });
      };
      removeDownloaded = function(asset) {
        return getDownloadedFile(asset).then(function(downloadedFile) {
          return qFnBind(downloadedFile.remove, downloadedFile);
        }, function(error) {
          if (error.code === fileApi.FileError.NOT_FOUND_ERR) {
            return $q.when(true);
          }
          return error;
        });
      };
      requestAsset = function(asset, reportProgress) {
        var doRequest;
        doRequest = function() {
          return getDownloadedFile(asset).then(null, function() {
            return getStoredFile(asset).then(function(storedFile) {
              return copyFromStored(asset, storedFile);
            }, function() {
              return downloadFile(asset, reportProgress);
            });
          });
        };
        if (asset.forceDownload) {
          return $q.all([removeStored(asset), removeDownloaded(asset)]).then(doRequest);
        } else {
          return doRequest();
        }
      };
      clearDownloaded = function() {
        return getTemporaryFs().then(function(temporaryFs) {
          return removeDirectoryIfExists(temporaryFs, 'downloaded_assets');
        });
      };
      clearStored = function() {
        return getPersistentFs().then(function(persistentFs) {
          return removeDirectoryIfExists(persistentFs, 'stored_assets');
        });
      };
      return {
        requestAsset: function(asset, reportProgress) {
          return requestAsset(asset, reportProgress).then(function(file) {
            return "file://" + (encodeURI(file.fullPath));
          }, function(error) {
            return 'Error downloading document';
          });
        },
        storeAsset: function(asset) {
          return requestAsset(asset).then(function(file) {
            return copyToStored(asset, file);
          });
        },
        removeStoredAsset: function(asset) {
          return removeStored(asset);
        },
        clear: function() {
          return $q.all([clearStored(), clearDownloaded()]);
        }
      };
    }
  ]);

  wwwApp.factory('assetStore', [
    '$q', '$timeout', '$injector', 'assetStoreBackend', function($q, $timeout, $injector, assetStoreBackend) {
      var nop;
      nop = function() {};
      return {
        download: function(asset) {
          var lefStars, result;
          result = {
            error: null
          };
          lefStars = $injector.get('lefStars');
          result.hadError = function(errorString) {
            result.state = 'error';
            return result.error = errorString;
          };
          result.retry = function(options) {
            var deferred;
            if (options == null) {
              options = {
                forceDownload: false
              };
            }
            deferred = $q.defer();
            result.url = deferred.promise;
            result.state = 'downloading';
            result.percentComplete = 0;
            result.error = null;
            if (typeof cordova !== "undefined" && cordova !== null ? cordova.exec : void 0) {
              return assetStoreBackend.requestAsset(angular.extend({}, asset, {
                forceDownload: !!options.forceDownload,
                storeAsset: lefStars.isStarredAsset(asset)
              }), function(percentComplete) {
                return result.percentComplete = percentComplete;
              }).then(function(path) {
                result.state = 'downloaded';
                return deferred.resolve(path);
              }, function(errorString) {
                return result.hadError(errorString);
              });
            } else {
              result.state = 'downloaded';
              result.percentComplete = 100;
              return deferred.resolve(asset.downloadUrl);
            }
          };
          result.retry();
          return result;
        },
        store: function(asset) {
          var result;
          if (typeof cordova !== "undefined" && cordova !== null ? cordova.exec : void 0) {
            return assetStoreBackend.storeAsset(asset);
          } else {
            result = $q.defer();
            result.resolve(asset.downloadUrl);
            return result.promise;
          }
        },
        remove: function(asset) {
          if (typeof cordova !== "undefined" && cordova !== null ? cordova.exec : void 0) {
            return assetStoreBackend.removeStoredAsset(asset);
          }
        },
        clear: function() {
          if (typeof cordova !== "undefined" && cordova !== null ? cordova.exec : void 0) {
            return assetStoreBackend.clear();
          }
        }
      };
    }
  ]);

}).call(this);


(function() {
  var API_PREFIX, CONTACT_API_ENDPOINT, PASSTHROUGH_API_PREFIX, editDistance,
    __slice = [].slice;

  API_PREFIX = 'https://service.leadingedgeforum.com';

  PASSTHROUGH_API_PREFIX = 'http://sleepy-fortress-6400.herokuapp.com/api';

  CONTACT_API_ENDPOINT = "" + PASSTHROUGH_API_PREFIX + "/contact";

  editDistance = function(a, b) {
    var i, j, matrix, _i, _j, _k, _l, _ref, _ref1, _ref2, _ref3;
    if (a.length === 0) {
      return b.length;
    }
    if (b.length === 0) {
      return a.length;
    }
    matrix = [];
    for (i = _i = 0, _ref = b.length; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      matrix[i] = [i];
    }
    for (j = _j = 0, _ref1 = a.length; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
      matrix[0][j] = j;
    }
    for (i = _k = 1, _ref2 = b.length; 1 <= _ref2 ? _k <= _ref2 : _k >= _ref2; i = 1 <= _ref2 ? ++_k : --_k) {
      for (j = _l = 1, _ref3 = a.length; 1 <= _ref3 ? _l <= _ref3 : _l >= _ref3; j = 1 <= _ref3 ? ++_l : --_l) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
        }
      }
    }
    return matrix[b.length][a.length];
  };

  wwwApp.factory('lefCheckLink', [
    '$rootScope', '$location', 'leadingedgeforum', function($rootScope, $location, leadingedgeforum) {
      return function(link, linkText) {
        var match, project;
        match = link.match(/^http:\/\/lef\.csc\.com\/publications\/(\d+)$/);
        if (!match) {
          match = link.match(/^http:\/\/www\.leadingedgeforum\.com\/publications\/(\d+)$/);
        }
        if (!match) {
          match = link.match(/^http:\/\/lef\.csc\.com\/library\/publicationdetail\.aspx\?id=(\d+)$/);
        }
        if (match) {
          project = leadingedgeforum.Project.guessProjectFromPublicationAndTitle(match[1], linkText);
          if (project) {
            $location.url("/domain/" + project.domain.id + "/project/" + project.id);
            return true;
          }
        }
        match = link.match(/^http:\/\/lef\.csc\.com\/projects\/(\d+)$/);
        if (!match) {
          match = link.match(/^http:\/\/www\.leadingedgeforum\.com\/projects\/(\d+)$/);
        }
        if (match) {
          leadingedgeforum.Project.get(match[1]).then(function(project) {
            return $location.url("/domain/" + project.domain.id + "/project/" + project.id);
          });
          return true;
        }
        return false;
      };
    }
  ]);

  wwwApp.factory('leadingedgeforum', [
    '$http', '$window', '$rootScope', '$q', '$timeout', 'modelStore', 'nestedModel', 'lefAuthentication', 'youtube', function($http, $window, $rootScope, $q, $timeout, modelStore, nestedModel, lefAuthentication, youtube) {
      var assetModel, assetStore, contactModel, contactStore, domainModel, domainStore, eventModel, eventStore, everSatisfiedFromCache, get, pastProjectModel, projectItems, projectModel, projectPublicStore, projectStore, researcherModel, researcherPublicStore, researcherStore, retryPeriod, topResearcherIds, videoStore;
      $http.defaults.headers.common['X-Requested-With'] = null;
      everSatisfiedFromCache = {};
      get = function(url, allowCache, cb) {
        if (allowCache && $window.localStorage["apiCache:" + url]) {
          everSatisfiedFromCache[url] = true;
          $rootScope.$evalAsync(function() {
            return cb(JSON.parse($window.localStorage["apiCache:" + url]), false);
          });
        }
        return lefAuthentication.authenticatedGet(url).then(function(result) {
          var resultString;
          resultString = JSON.stringify(result.data);
          if ($window.localStorage["apiCache:" + url] !== resultString) {
            $window.localStorage["apiCache:" + url] = resultString;
            return cb(result.data, true);
          }
        }, function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          if (!everSatisfiedFromCache[url]) {
            return $q.reject.apply($q, args);
          } else {
            return $q.defer().resolve();
          }
        });
      };
      domainStore = modelStore();
      projectStore = modelStore();
      assetStore = modelStore();
      researcherStore = modelStore();
      eventStore = modelStore();
      videoStore = modelStore();
      contactStore = modelStore();
      domainModel = nestedModel(get, {
        path: "" + API_PREFIX + "/domain"
      }).on('query', function(domains) {
        return domainStore.query().resolve(domains);
      }).on('get', function(domain) {
        return domainStore.get(domain.id).resolve(domain);
      });
      projectItems = {};
      projectModel = domainModel.contains('projects', {
        subPath: "/project",
        parentReference: "domain",
        itemStore: projectItems
      }).on('get', function(project) {
        project.active = true;
        projectStore.get(project.domain.id, project.id).resolve(project);
        return projectStore.get(project.id).resolve(project);
      });
      pastProjectModel = domainModel.contains('past_projects', {
        subPath: "/project",
        parentReference: "domain",
        itemStore: projectItems
      }).on('get', function(project) {
        project.active = false;
        projectStore.get(project.domain.id, project.id).resolve(project);
        return projectStore.get(project.id).resolve(project);
      });
      assetModel = nestedModel(get, {
        path: "" + API_PREFIX + "/asset",
        parentReference: "project",
        itemStore: {}
      }).on('get', function(asset) {
        asset.downloadUrl = "http://www.leadingedgeforum.com/va.php?asset=" + asset.id;
        return assetStore.get(asset.id).resolve(asset);
      });
      pastProjectModel.contains('assets', assetModel);
      projectModel.contains('assets', assetModel);
      researcherModel = nestedModel(get, {
        path: "" + API_PREFIX + "/researchers",
        itemStore: {}
      }).on('query', function(researchers) {
        return researcherStore.query().resolve(researchers);
      }).on('get', function(researcher) {
        return researcherStore.get(researcher.id).resolve(researcher);
      });
      projectModel.contains('researchers', researcherModel);
      pastProjectModel.contains('researchers', researcherModel);
      eventModel = nestedModel(get, {
        path: "" + API_PREFIX + "/events/forthcoming",
        itemStore: {},
        getAfterQuery: false
      }).on('query', function(events) {
        return eventStore.query().resolve(events);
      }).on('get', function(event) {
        return eventStore.get(event.id).resolve(event);
      });
      contactModel = nestedModel(get, {
        path: CONTACT_API_ENDPOINT,
        getAfterQuery: false
      }).on('query', function(contacts) {
        return contactStore.query().resolve(contacts);
      });
      lefAuthentication.on('authenticated', function(user) {
        domainModel.query();
        researcherModel.query();
        eventModel.query();
        contactModel.query();
        return youtube.playlist('UUAR7j3ZKfxFMxz9awI6vT_g').then(function(playlist) {
          playlist = _.sortBy(playlist, function(video) {
            return video.snippet.publishedAt;
          });
          playlist.reverse();
          videoStore.query().resolve(playlist);
          return angular.forEach(playlist, function(video) {
            return videoStore.get(video.id).resolve(video);
          });
        });
      });
      retryPeriod = 1000 * 60 * 5;
      _.each([domainStore, researcherStore, eventStore, contactStore], function(store) {
        return store.query().promise.then(function(items) {
          var retry;
          retry = function() {
            items.retry();
            return $timeout(retry, retryPeriod);
          };
          return $timeout(retry, retryPeriod);
        });
      });
      researcherPublicStore = researcherStore["public"]();
      topResearcherIds = [2193, 3764, 3401, 22, 23, 24, 38, 4189, 1608, 134, 1274];
      researcherPublicStore.queryTopResearchers = function() {
        return researcherPublicStore.query().then(function(researchers) {
          return _.filter(researchers, function(researcher) {
            return _.indexOf(topResearcherIds, researcher.id) !== -1;
          });
        });
      };
      projectPublicStore = projectStore["public"]();
      projectPublicStore.guessProjectFromPublicationAndTitle = function(publicationId, text) {
        publicationId = parseInt(publicationId, 10);
        return _.chain(projectItems).filter(function(project) {
          return !!_.findWhere(project.publications, {
            id: publicationId
          });
        }).map(function(project) {
          return {
            editDistance: editDistance(project.name.substr(0, text.length), text),
            project: project
          };
        }).min(function(item) {
          return item.editDistance;
        }).value().project;
      };
      return {
        Domain: domainStore["public"](),
        Project: projectPublicStore,
        Asset: assetStore["public"](),
        Researcher: researcherPublicStore,
        Event: eventStore["public"](),
        Video: videoStore["public"](),
        Contact: contactStore["public"](),
        domainColours: ['', 'strategy-domain', 'value-creation-domain', 'consumerization-domain', 'learning-from-web-domain', 'changing-nature-of-work-domain']
      };
    }
  ]);

  wwwApp.filter('assetImage', function() {
    return function(input) {
      var match;
      match = input != null ? input.match(/asset=(\d+)/) : void 0;
      if (match) {
        return "" + PASSTHROUGH_API_PREFIX + "/image-asset/" + match[1] + "/image.jpg";
      }
    };
  });

  wwwApp.filter('makeLefLinksAbsolute', function() {
    return function(input) {
      return input != null ? typeof input.replace === "function" ? input.replace(/href=['"]\/(.*?)['"]/g, "href='http://lef.csc.com/$1'") : void 0 : void 0;
    };
  });

  wwwApp.filter('formatLefDomainCopy', function() {
    return function(input) {
      return input.replace(/^<p><strong>(.*?)<\/strong>/, "<p><h3>$1</h3>");
    };
  });

  wwwApp.filter('extractTwitterHandle', function() {
    return function(input) {
      var match;
      if (!(input != null ? input.match : void 0)) {
        return input;
      }
      match = input.match(/^@(.*)$/);
      if (match) {
        return match[1];
      }
      match = input.match(/^http.*\/([a-zA-Z0-9]+?)$/);
      if (match) {
        return match[1];
      }
      return input;
    };
  });

}).call(this);


(function() {
  var deviceReady,
    __slice = [].slice;

  deviceReady = $.Deferred();

  document.addEventListener('deviceready', function() {
    return deviceReady.resolve(true);
  });

  wwwApp.factory('lefAuthentication', [
    'httpPipeline', '$rootScope', '$q', '$window', 'analytics', function(httpPipeline, $rootScope, $q, $window, analytics) {
      var API_PREFIX, authenticate, authenticateWithStoredCredentials, authenticated, authenticatedGet, authenticatingPromise, authenticationVerified, events, id, kc, logout, markAuthenticated, markUnauthenticated, markVerified, onEvent, resettingPromise, sendResetRequest, trigger;
      API_PREFIX = 'https://service.leadingedgeforum.com/';
      id = function() {};
      events = {
        authenticated: [],
        unauthenticated: [],
        authenticating: []
      };
      authenticated = false;
      authenticationVerified = false;
      authenticatingPromise = null;
      kc = cordova.require("cordova/plugin/keychain");
      onEvent = function(name, fn) {
        return events[name].push(fn);
      };
      trigger = function() {
        var args, name;
        name = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        return angular.forEach(events[name], function(fn) {
          return $rootScope.$evalAsync(function() {
            return fn.apply(null, args);
          });
        });
      };
      markAuthenticated = function(credentials) {
        if (!authenticated) {
          $window.localStorage['lef-last-login'] = JSON.stringify(new Date().valueOf());
          trigger('authenticated', credentials);
          return authenticated = true;
        }
      };
      markVerified = function(credentials) {
        markAuthenticated(credentials);
        analytics.username(credentials.username);
        kc.setForKey(id, id, 'username', 'LEFApi', credentials.username);
        kc.setForKey(id, id, 'password', 'LEFApi', credentials.password);
        return authenticationVerified = true;
      };
      markUnauthenticated = function(reason) {
        authenticated = false;
        authenticationVerified = false;
        kc.removeForKey(id, id, 'username', 'LEFApi');
        kc.removeForKey(id, id, 'password', 'LEFApi');
        delete $window.localStorage['lef-last-login'];
        trigger('unauthenticated', reason);
        return analytics.username('(unauthenticated)');
      };
      authenticate = function(credentials) {
        return deviceReady.then(function() {
          var params, _ref;
          if (authenticatingPromise) {
            return authenticatingPromise;
          }
          if (!authenticated) {
            trigger('authenticating', credentials);
          }
          if (credentials.email) {
            credentials.username = credentials.email;
            delete credentials.email;
          }
          params = {};
          if (((_ref = credentials.username) != null ? typeof _ref.indexOf === "function" ? _ref.indexOf('@') : void 0 : void 0) !== -1) {
            params.email = credentials.username;
          } else {
            params.user = credentials.username;
          }
          params.password = credentials.password;
          authenticatingPromise = httpPipeline.get("" + API_PREFIX + "/authenticate", {
            params: params
          }).then(function(result) {
            var _ref1;
            authenticatingPromise = null;
            if ((_ref1 = result.data) != null ? _ref1.authenticated : void 0) {
              markVerified(credentials);
              return credentials;
            } else {
              return $q.reject("Could not connect; error code " + result.status);
            }
          }, function(result) {
            authenticatingPromise = null;
            if (result.status === 403) {
              return $q.reject('Incorrect username or password');
            } else {
              return $q.reject("Could not connect; error code " + result.status);
            }
          });
          authenticatingPromise.then(null, function(reason) {
            if (reason.match(/Could not connect/) && authenticated) {

            } else {
              return markUnauthenticated(reason);
            }
          });
          return authenticatingPromise;
        });
      };
      authenticatedGet = function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        if (!authenticated) {
          return $q.reject('Not yet authenticated');
        }
        if (authenticatingPromise) {
          return authenticatingPromise.then(function() {
            return httpPipeline.get.apply(httpPipeline, args);
          });
        } else {
          return httpPipeline.get.apply(httpPipeline, args);
        }
      };
      authenticateWithStoredCredentials = function() {
        return deviceReady.then(function() {
          return kc.getForKey(function(username) {
            return kc.getForKey(function(password) {
              var credentials, lastLogin;
              lastLogin = $window.localStorage['lef-last-login'] && JSON.parse($window.localStorage['lef-last-login']);
              if (!lastLogin || lastLogin < (new Date()).valueOf() - 14 * 24 * 60 * 60 * 1000) {
                kc.removeForKey(id, id, 'username', 'LEFApi');
                return kc.removeForKey(id, id, 'password', 'LEFApi');
              } else {
                credentials = {
                  username: username,
                  password: password
                };
                trigger('authenticating', credentials);
                markAuthenticated(credentials);
                return authenticate(credentials);
              }
            }, id, 'password', 'LEFApi');
          }, id, 'username', 'LEFApi');
        });
      };
      logout = function() {
        return markUnauthenticated();
      };
      resettingPromise = null;
      sendResetRequest = function(username) {
        var endpoint;
        if (resettingPromise) {
          return resettingPromise;
        }
        if ((username != null ? typeof username.indexOf === "function" ? username.indexOf('@') : void 0 : void 0) !== -1) {
          endpoint = '/reset-email';
        } else {
          endpoint = '/reset-user';
        }
        resettingPromise = httpPipeline.get("" + API_PREFIX + endpoint + "/" + username).then(function(result) {
          var _ref, _ref1;
          resettingPromise = null;
          if ((_ref = result.data) != null ? (_ref1 = _ref[0]) != null ? _ref1.match(/error/) : void 0 : void 0) {
            return $q.reject('Username or email not recognised');
          } else {
            return $q.defer().resolve('Reset email sent');
          }
        }, function(result) {
          resettingPromise = null;
          return $q.reject("Could not connect; error code " + result.status);
        });
        return resettingPromise;
      };
      return {
        on: onEvent,
        authenticate: authenticate,
        logout: logout,
        sendResetRequest: sendResetRequest,
        authenticatedGet: authenticatedGet,
        authenticated: function() {
          return authenticated;
        },
        authenticateWithStoredCredentials: authenticateWithStoredCredentials
      };
    }
  ]);

}).call(this);
















// Generated by CoffeeScript 1.3.3
(function() {

  document.addEventListener('deviceready', function() {
    var htmlReporter, jasmineEnv, spec, _ref;
    if (typeof navigator !== "undefined" && navigator !== null) {
      if ((_ref = navigator.splashscreen) != null) {
        _ref.hide();
      }
    }
    jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;
    htmlReporter = new jasmine.HtmlReporter();
    jasmineEnv.addReporter(htmlReporter);
    jasmineEnv.specFilter = spec = function() {
      return htmlReporter.specFilter(spec);
    };
    return jasmineEnv.execute();
  });

}).call(this);










describe("Player", function() {
  var player;
  var song;

  beforeEach(function() {
    player = new Player();
    song = new Song();
  });

  it("should be able to play a Song", function() {
    player.play(song);
    expect(player.currentlyPlayingSong).toEqual(song);

    //demonstrates use of custom matcher
    expect(player).toBePlaying(song);
  });

  describe("when song has been paused", function() {
    beforeEach(function() {
      player.play(song);
      player.pause();
    });

    it("should indicate that the song is currently paused", function() {
      expect(player.isPlaying).toBeFalsy();

      // demonstrates use of 'not' with a custom matcher
      expect(player).not.toBePlaying(song);
    });

    it("should be possible to resume", function() {
      player.resume();
      expect(player.isPlaying).toBeTruthy();
      expect(player.currentlyPlayingSong).toEqual(song);
    });
  });

  // demonstrates use of spies to intercept and test method calls
  it("tells the current song if the user has made it a favorite", function() {
    spyOn(song, 'persistFavoriteStatus');

    player.play(song);
    player.makeFavorite();

    expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  });

  //demonstrates use of expected exceptions
  describe("#resume", function() {
    it("should throw an exception if song is already playing", function() {
      player.play(song);

      expect(function() {
        player.resume();
      }).toThrow("song is already playing");
    });
  });
});

beforeEach(function() {
  this.addMatchers({
    toBePlaying: function(expectedSong) {
      var player = this.actual;
      return player.currentlyPlayingSong === expectedSong && 
             player.isPlaying;
    }
  });
});

